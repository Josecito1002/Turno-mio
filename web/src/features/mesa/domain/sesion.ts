/* eslint-disable @typescript-eslint/no-explicit-any */
/* "Info sesión": el archivo que prepara el creador de campañas para una sesión. Trae los combates con sus enemigos y,
   para los que no están en el bestiario de la app, sus datos. Al importarlo, la campaña queda con una pestaña por
   combate (cp.encuentros) y los monstruos nuevos en su bestiario propio (cp.bestiario).
   Formatos: JSON (tipo "miturno-sesion") o CSV con columnas combate, enemigo, cantidad, ca, pg, iniciativa, cr, notas.
   El formato completo está en docs/info-sesion.md. */
import { norm } from '@/shared/utils/texto';
import type { Monstruo } from '@/features/reglas/data/bestiario';

export type EnemigoEncuentro = { ref: string; nombre: string; cantidad: number };
/** Un enemigo que quedó vivo al terminar un combate de la sesión, con los PG que tenía. */
/** `volvioEn`: id del combate al que ya entró, para que no vuelva otra vez en otro. */
export type Sobreviviente = { nombre: string; ca: number; pgMax: number; pg: number; bono: number; ref?: string; volvioEn?: string };
/** `vuelvenDe`: nombres de los combates anteriores cuyos sobrevivientes entran a este (viene en el archivo o lo elige el
    DM en la app; los datos viejos lo tienen como un solo nombre). `sobrevivientes`: los que quedaron vivos la última vez
    que terminó este combate. */
export type Encuentro = { id: string; nombre: string; notas?: string; enemigos: EnemigoEncuentro[]; vuelvenDe?: string | string[]; sobrevivientes?: Sobreviviente[] };

/** Los nombres de los combates de los que vuelve `e`, sin repetir (acepta un nombre, una lista, o "A | B"). */
export const origenesDe = (v: unknown): string[] => {
  const lista = (Array.isArray(v) ? v : [v]).flatMap(x => typeof x === 'string' ? x.split('|') : []).map(x => x.trim()).filter(Boolean);
  return lista.filter((x, i) => lista.findIndex(y => norm(y) === norm(x)) === i);
};
export type Sesion = { nombre: string; notas?: string; encuentros: Encuentro[]; monstruos: Record<string, Monstruo>; sinDatos: string[] };

export const claveMonstruo = (s: string) => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'monstruo';

/** Busca un monstruo por clave, nombre en español o nombre en inglés (sin mayúsculas ni acentos). Con paréntesis
    ("Jefe goblin (Goblin Boss)") prueba también cada parte por separado. */
export function encontrarMonstruo(nombre: string, ...catalogos: Record<string, Monstruo>[]): string {
  const partes = [nombre, ...(nombre.match(/^(.*?)\(([^)]*)\)\s*$/)?.slice(1) || [])].map(x => x.trim()).filter(Boolean);
  for (const p of partes) {
    const t = norm(p).trim(), k = claveMonstruo(p);
    for (const cat of catalogos) {
      if (cat[k]) return k;
      const hit = Object.entries(cat).find(([, m]) => norm(m.n).trim() === t || norm(m.en).trim() === t);
      if (hit) return hit[0];
    }
  }
  return '';
}

/** Un número aunque venga como texto ("45 (7d8 + 14)", "16 (cota de malla)", "+5"); `def` si no trae ninguno. */
const num = (v: any, def: number) => {
  if (typeof v === 'number') return isNaN(v) ? def : v;
  const m = String(v ?? '').match(/^\s*([+-]?\d+)/);
  return m ? +m[1] : def;
};
/** El primer campo que venga con valor, entre varios nombres posibles (pg, hp, vida…). */
const campo = (d: any, ...ks: string[]) => { for (const k of ks) if (d?.[k] != null && d[k] !== '') return d[k]; return undefined; };

/** Los daños de una acción como lista: acepta la lista, un solo daño, o texto ("1d6+3 cortante + 1d4 fuego"). */
export function danosDe(v: any): { d: string; tipo: string }[] | undefined {
  if (v == null || v === '') return undefined;
  if (Array.isArray(v)) return v.flatMap(x => danosDe(x) || []);
  if (typeof v === 'object') return v.d || v.dado || v.dados ? [{ d: String(v.d || v.dado || v.dados).replace(/\s+/g, ''), tipo: String(v.tipo || '') }] : undefined;
  const xs = [...String(v).matchAll(/(\d+d\d+(?:\s*[+-]\s*\d+)?)\)?\s*(?:puntos\s+)?(?:de\s+)?(?:daño\s+)?(?:de\s+)?([a-záéíóúñ]+)?/gi)]
    .map(m => ({ d: m[1].replace(/\s+/g, ''), tipo: (m[2] || '').toLowerCase() }));
  return xs.length ? xs : undefined;
}

/** Una acción o rasgo del archivo, con los nombres de campo que use. Si solo trae texto, saca de él el ataque y los
    daños ("+5 al ataque … 7 (1d8 + 3) de daño cortante") para que se puedan tirar. */
function accionDe(a: any) {
  if (typeof a === 'string') a = { t: a };
  const n = a.n || a.nombre || 'Acción', t = a.t || a.texto || a.descripcion || undefined;
  const atkTxt = typeof t === 'string' && t.match(/([+-]\d+)\s*(?:al\s+(?:ataque|golpe|impacto)|para\s+(?:impactar|golpear)|to hit)/i);
  const atk = campo(a, 'atk', 'ataque', 'bono', 'bonificador');
  const dano = danosDe(campo(a, 'dano', 'daño', 'danos', 'daños')) || (typeof t === 'string' && /daño|damage/i.test(t) ? danosDe(t.match(/\(\d+d\d+[^)]*\)[^.;]*/g)?.join(' ') || '') : undefined);
  const cd = campo(a, 'cd', 'dc');
  return {
    ...a, n, en: a.en || n, ...(t ? { t } : {}),
    ...(atk != null && !isNaN(num(atk, NaN)) ? { atk: num(atk, 0) } : atkTxt ? { atk: +atkTxt[1] } : {}),
    ...(dano?.length ? { dano } : {}), ...(cd != null ? { cd: num(cd, 0) } : {}),
  };
}
/** Una lista de acciones del archivo: lista, o un objeto { nombre: texto }. */
const accionesDe = (xs: any) => Array.isArray(xs) ? xs.map(accionDe)
  : xs && typeof xs === 'object' ? Object.entries(xs).map(([n, v]) => accionDe(typeof v === 'object' ? { n, ...(v as object) } : { n, t: v })) : [];

const LISTAS = ['rasgos', 'acciones', 'adicionales', 'reacciones', 'legendarias'] as const;

/** Completa un monstruo propio con lo mínimo para que el combate y el bloque funcionen. Con `base` (el monstruo del
    bestiario que nombra), lo que el archivo no trae sale de la base: un bloque con solo "pg" no pierde la CA ni los ataques. */
export function monstruoPropio(d: any, base?: Monstruo | null): Monstruo {
  const ab = { fue: 10, des: 10, con: 10, int: 10, sab: 10, car: 10, ...(base?.ab || {}), ...(d.ab || {}) };
  const listas = Object.fromEntries(LISTAS.map(k => {
    const xs = accionesDe(d[k] ?? (k === 'adicionales' ? d.accionesAdicionales : undefined));
    return [k, xs.length ? xs : base?.[k] || []];
  }));
  const ca = campo(d, 'ca', 'ac', 'claseArmadura'), pg = campo(d, 'pg', 'hp', 'vida', 'puntosGolpe'), ini = campo(d, 'ini', 'iniciativa');
  return {
    ...(base || {}), ...d,
    n: d.n || d.nombre || base?.n || 'Enemigo', en: d.en || base?.en || d.n || d.nombre || 'Enemigo', tam: d.tam || base?.tam || '', tipo: d.tipo || base?.tipo || '',
    ca: num(ca, base?.ca ?? 12), pg: num(pg, base?.pg ?? 10), pgF: d.pgF || (typeof pg === 'string' && pg.match(/\d+d\d+[^)]*/)?.[0].trim()) || base?.pgF || '',
    vel: d.vel || base?.vel || '', ab,
    sentidos: d.sentidos || base?.sentidos || '', cr: String(d.cr ?? base?.cr ?? '?'), xp: num(d.xp, base?.xp ?? 0), pb: num(d.pb, base?.pb ?? 2),
    ini: num(ini, base?.ini ?? Math.floor((ab.des - 10) / 2)),
    ...listas,
    texto: d.texto || d.descripcion || d.notas || base?.texto || undefined, propio: true,
  } as Monstruo;
}

/** Los datos que trae un enemigo de un combate para cambiar o completar su monstruo (CA, PG, ataques…), o null. */
function datosEnemigo(e: any) {
  if (e.datos) return e.datos;
  const { monstruo: _m, nombre: _n, alias: _a, cantidad: _c, iniciativa, ...resto } = e; void _m; void _n; void _a; void _c;
  const d = { ...resto, ...(iniciativa != null ? { ini: iniciativa } : {}) };
  return ['ca', 'ac', 'pg', 'hp', 'vida', 'ini', ...LISTAS].some(k => d[k] != null && d[k] !== '') ? d : null;
}

/** CSV sencillo con comillas dobles; separa por coma o punto y coma (Excel en español usa ;). */
export function leerCsv(texto: string): Record<string, string>[] {
  const lineas = texto.replace(/^﻿/, '').split(/\r?\n/).filter(l => l.trim());
  if (!lineas.length) return [];
  const sep = (lineas[0].match(/;/g) || []).length > (lineas[0].match(/,/g) || []).length ? ';' : ',';
  const partir = (l: string) => {
    const out: string[] = []; let cur = '', q = false;
    for (let i = 0; i < l.length; i++) {
      const ch = l[i];
      if (q) { if (ch === '"' && l[i + 1] === '"') { cur += '"'; i++; } else if (ch === '"') q = false; else cur += ch; }
      else if (ch === '"') q = true; else if (ch === sep) { out.push(cur); cur = ''; } else cur += ch;
    }
    out.push(cur); return out.map(s => s.trim());
  };
  const cab = partir(lineas[0]).map(h => norm(h).replace(/[^a-z]/g, ''));
  return lineas.slice(1).map(l => { const v = partir(l); return Object.fromEntries(cab.map((h, i) => [h, v[i] ?? ''])); });
}


/** Lee el archivo (JSON o CSV) y arma la sesión, buscando cada enemigo en el bestiario de la app y en el de la campaña. */
export function leerSesion(texto: string, nombreArchivo: string, catalogo: Record<string, Monstruo>, propios: Record<string, Monstruo> = {}): Sesion {
  // `variantes`: monstruos cambiados por un enemigo de un combate; no se buscan por nombre (el original sigue siendo el original)
  const nuevos: Record<string, Monstruo> = {}, variantes: Record<string, Monstruo> = {}, sinDatos: string[] = [];
  const buscar = (n: string) => encontrarMonstruo(n, nuevos, propios, catalogo);
  /** La clave del enemigo. Si trae datos propios (CA, PG, ataques), queda una versión de la campaña: sobre el monstruo
      del bestiario si lo hay, o nueva si no existe en ninguno. */
  const resolver = (nombre: string, datos: any, alias = ''): string => {
    // Un bloque de `monstruos` con el nombre a mostrar ("Bandido de Varr") manda sobre el monstruo base que nombra
    const porAlias = alias && !datos ? encontrarMonstruo(alias, nuevos) || (variantes[claveMonstruo(alias)] ? claveMonstruo(alias) : '') : '';
    if (porAlias) return porAlias;
    const k = buscar(nombre);
    if (k && !datos) return k;
    const baseK = k || buscar(String(datos?.en || ''));
    const base = baseK ? nuevos[baseK] || propios[baseK] || catalogo[baseK] : null;
    if (!base && (!datos || (datos.ca == null && datos.pg == null && !datos.acciones))) sinDatos.push(nombre);
    const m = monstruoPropio({ ...(base ? {} : { n: nombre }), ...(datos || {}), ...(alias ? { n: alias } : {}) }, base);
    // Una variante con otra clave que el original para no pisarlo (salvo que ya sea propio de este archivo)
    let clave = claveMonstruo(alias || nombre);
    if (base && clave === baseK && !nuevos[clave]) clave = `${clave}-campana`;
    const usada = (c: string) => nuevos[c] || variantes[c];
    for (let i = 2; usada(clave) && JSON.stringify(usada(clave)) !== JSON.stringify(m); i++) clave = `${claveMonstruo(alias || nombre)}-${i}`;
    variantes[clave] = m;
    return clave;
  };
  const id = (i: number) => `e-${Date.now().toString(36)}-${i}`;
  const base = nombreArchivo.replace(/\.[^.]+$/, '');

  if (texto.trim().startsWith('{')) {
    const d = JSON.parse(texto);
    // Un bloque con el nombre de un monstruo del bestiario lo completa: lo que no trae sale del Manual
    for (const [k, m] of Object.entries<any>(d.monstruos || {})) {
      const bk = encontrarMonstruo(k, propios, catalogo) || encontrarMonstruo(String(m?.en || m?.n || m?.nombre || ''), propios, catalogo);
      nuevos[claveMonstruo(k)] = monstruoPropio({ ...(bk ? {} : { n: k }), ...m }, bk ? propios[bk] || catalogo[bk] : null);
    }
    const encuentros = (d.combates || d.encuentros || []).map((c: any, i: number) => ({
      id: id(i), nombre: c.nombre || `Combate ${i + 1}`, ...(c.notas ? { notas: c.notas } : {}),
      ...(origenesDe(c.vuelvenDe ?? c.vuelveDe ?? c.vuelven_de).length ? { vuelvenDe: origenesDe(c.vuelvenDe ?? c.vuelveDe ?? c.vuelven_de) } : {}),
      enemigos: (c.enemigos || []).map((e: any) => {
        const nombre = e.monstruo || e.nombre || 'Enemigo';
        const alias = e.alias || (e.monstruo && e.nombre) || '';
        return { ref: resolver(nombre, datosEnemigo(e), alias), nombre: alias, cantidad: Math.max(1, num(e.cantidad, 1)) };
      }),
    }));
    return { nombre: d.sesion || d.nombre || base, notas: d.notas, encuentros, monstruos: { ...nuevos, ...variantes }, sinDatos };
  }

  const filas = leerCsv(texto), porCombate = new Map<string, EnemigoEncuentro[]>(), notas = new Map<string, string>(), vuelven = new Map<string, string[]>();
  for (const f of filas) {
    const nombre = f.enemigo || f.monstruo || f.nombre; if (!nombre) continue;
    const combate = f.combate || f.encuentro || 'Combate 1';
    // Varias filas del combate pueden nombrar distintos combates, y una celda varios separados con |
    if (f.vuelvende || f.vuelvede) vuelven.set(combate, origenesDe([...(vuelven.get(combate) || []), f.vuelvende || f.vuelvede]));
    const datos = f.ca || f.pg ? { ca: f.ca, pg: f.pg, ini: f.iniciativa, cr: f.cr || undefined, texto: f.notas || undefined } : null;
    if (!porCombate.has(combate)) porCombate.set(combate, []);
    porCombate.get(combate)!.push({ ref: resolver(nombre, datos), nombre: '', cantidad: Math.max(1, num(f.cantidad, 1)) });
    if (f.notas && !datos) notas.set(combate, [notas.get(combate), f.notas].filter(Boolean).join(' '));
  }
  const encuentros = [...porCombate].map(([nombre, enemigos], i) => ({ id: id(i), nombre, ...(notas.get(nombre) ? { notas: notas.get(nombre) } : {}), ...(vuelven.get(nombre)?.length ? { vuelvenDe: vuelven.get(nombre) } : {}), enemigos }));
  return { nombre: base, encuentros, monstruos: { ...nuevos, ...variantes }, sinDatos };
}

/** Los enemigos de un encuentro, listos para el combate (uno por cada cantidad, numerados si son varios). */
export function enemigosDe(e: Encuentro, monstruo: (ref: string) => Monstruo | null) {
  const out: { id: string; nombre: string; ca: number; pgMax: number; pg: number; bono: number; ref: string }[] = [];
  e.enemigos.forEach((x, j) => {
    const m = monstruo(x.ref); if (!m) return;
    const n = x.nombre || m.n;
    for (let i = 0; i < x.cantidad; i++)
      out.push({ id: `${Date.now().toString(36)}-${j}-${i}`, nombre: x.cantidad > 1 ? `${n} ${i + 1}` : n, ca: m.ca, pgMax: m.pg, pg: m.pg, bono: m.ini, ref: x.ref });
  });
  return out;
}

/** Los enemigos vivos (no aliados) de un combate que termina, para que puedan volver en otro combate de la sesión. */
export const sobrevivientesDe = (monstruos: any[]): Sobreviviente[] => (monstruos || []).filter(m => !m.aliado && m.pg > 0)
  .map(m => ({ nombre: m.nombre, ca: m.ca, pgMax: m.pgMax, pg: m.pg, bono: m.bono, ...(m.ref ? { ref: m.ref } : {}) }));

/** Los combates de la sesión de los que vuelve `e`, en el orden en que los nombra. */
export const combatesOrigen = (e: Encuentro, encuentros: Encuentro[]) =>
  origenesDe(e.vuelvenDe).map(n => encuentros.find(x => x.id !== e.id && norm(x.nombre) === norm(n))).filter(Boolean) as Encuentro[];

/** Los sobrevivientes que pueden volver de un combate a `e`: no los que ya entraron a otro combate. */
export const puedenVolver = (de: Encuentro, e: Encuentro) => (de.sobrevivientes || []).filter(m => !m.volvioEn || m.volvioEn === e.id);

/** Los sobrevivientes de los combates de los que vuelve `e`, listos para el combate (con id nuevo, los PG que tenían y
    de dónde vienen). */
export function regresanA(e: Encuentro, encuentros: Encuentro[]) {
  return combatesOrigen(e, encuentros).flatMap((de, j) => puedenVolver(de, e).map((m, i) => {
    const { volvioEn: _v, ...resto } = m; void _v;
    return { ...resto, id: `${Date.now().toString(36)}-v${j}-${i}`, vieneDe: de.nombre };
  }));
}

/** Marca a los que entraron a `e` para que no vuelvan también en otro combate de la cadena. */
export function marcarRegresados(e: Encuentro, encuentros: Encuentro[]) {
  for (const de of combatesOrigen(e, encuentros)) for (const m of puedenVolver(de, e)) m.volvioEn = e.id;
}

/** Al volver a importar una sesión, los combates que se reemplazan conservan su vínculo y sus sobrevivientes. */
export function conservarVinculos(nuevos: Encuentro[], viejos: Encuentro[]) {
  return nuevos.map(e => {
    const v = viejos.find(x => norm(x.nombre) === norm(e.nombre));
    // El vínculo del archivo manda; si no trae, se conserva el que se eligió en la app
    return v ? { ...e, ...(!e.vuelvenDe && v.vuelvenDe ? { vuelvenDe: v.vuelvenDe } : {}), ...(v.sobrevivientes ? { sobrevivientes: v.sobrevivientes } : {}) } : e;
  });
}
