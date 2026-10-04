/* eslint-disable @typescript-eslint/no-explicit-any */
/* "Info sesión": el archivo que prepara el creador de campañas para una sesión. Trae los combates con sus enemigos y,
   para los que no están en el bestiario de la app, sus datos. Al importarlo, la campaña queda con una pestaña por
   combate (cp.encuentros) y los monstruos nuevos en su bestiario propio (cp.bestiario).
   Formatos: JSON (tipo "miturno-sesion") o CSV con columnas combate, enemigo, cantidad, ca, pg, iniciativa, cr, notas.
   El formato completo está en docs/info-sesion.md. */
import { norm } from '@/shared/utils/texto';
import type { Monstruo } from '@/features/reglas/data/bestiario';

export type EnemigoEncuentro = { ref: string; nombre: string; cantidad: number };
export type Encuentro = { id: string; nombre: string; notas?: string; enemigos: EnemigoEncuentro[] };
export type Sesion = { nombre: string; notas?: string; encuentros: Encuentro[]; monstruos: Record<string, Monstruo>; sinDatos: string[] };

export const claveMonstruo = (s: string) => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'monstruo';

/** Busca un monstruo por clave, nombre en español o nombre en inglés (sin mayúsculas ni acentos). */
export function encontrarMonstruo(nombre: string, ...catalogos: Record<string, Monstruo>[]): string {
  const t = norm(nombre).trim(), k = claveMonstruo(nombre);
  for (const cat of catalogos) {
    if (cat[k]) return k;
    const hit = Object.entries(cat).find(([, m]) => norm(m.n).trim() === t || norm(m.en).trim() === t);
    if (hit) return hit[0];
  }
  return '';
}

const num = (v: any, def: number) => (v === '' || v == null || isNaN(+v) ? def : +v);

/** Completa un monstruo propio con lo mínimo para que el combate y el bloque funcionen. */
export function monstruoPropio(d: any): Monstruo {
  const ab = { fue: 10, des: 10, con: 10, int: 10, sab: 10, car: 10, ...(d.ab || {}) };
  const accs = (xs: any) => (Array.isArray(xs) ? xs : []).map((a: any) => ({ ...a, n: a.n || a.nombre || 'Acción', en: a.en || a.n || a.nombre || 'Acción', t: a.t || a.texto }));
  return {
    ...d,
    n: d.n || d.nombre || 'Enemigo', en: d.en || d.n || d.nombre || 'Enemigo', tam: d.tam || '', tipo: d.tipo || '',
    ca: num(d.ca, 12), pg: num(d.pg, 10), pgF: d.pgF || '', vel: d.vel || '', ab,
    sentidos: d.sentidos || '', cr: String(d.cr ?? '?'), xp: num(d.xp, 0), pb: num(d.pb, 2),
    ini: num(d.ini ?? d.iniciativa, Math.floor((ab.des - 10) / 2)),
    rasgos: accs(d.rasgos), acciones: accs(d.acciones), adicionales: accs(d.adicionales), reacciones: accs(d.reacciones), legendarias: accs(d.legendarias),
    texto: d.texto || d.descripcion || d.notas || undefined, propio: true,
  } as Monstruo;
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
  const nuevos: Record<string, Monstruo> = {}, sinDatos: string[] = [];
  const buscar = (n: string) => encontrarMonstruo(n, nuevos, propios, catalogo);
  /** La clave del enemigo; si no existe en ningún bestiario, se crea uno propio con lo que traiga la fila */
  const resolver = (nombre: string, datos: any): string => {
    const k = buscar(nombre);
    if (k && !datos?.forzar) return k;
    const clave = claveMonstruo(nombre);
    if (!datos || (datos.ca == null && datos.pg == null && !datos.acciones)) sinDatos.push(nombre);
    nuevos[clave] = monstruoPropio({ n: nombre, ...(datos || {}) });
    return clave;
  };
  const id = (i: number) => `e-${Date.now().toString(36)}-${i}`;
  const base = nombreArchivo.replace(/\.[^.]+$/, '');

  if (texto.trim().startsWith('{')) {
    const d = JSON.parse(texto);
    for (const [k, m] of Object.entries<any>(d.monstruos || {})) nuevos[claveMonstruo(k)] = monstruoPropio(m);
    const encuentros = (d.combates || d.encuentros || []).map((c: any, i: number) => ({
      id: id(i), nombre: c.nombre || `Combate ${i + 1}`, ...(c.notas ? { notas: c.notas } : {}),
      enemigos: (c.enemigos || []).map((e: any) => {
        const nombre = e.monstruo || e.nombre || 'Enemigo';
        const datos = e.datos || (e.ca != null || e.pg != null ? { ca: e.ca, pg: e.pg, ini: e.iniciativa ?? e.ini, cr: e.cr } : null);
        return { ref: resolver(nombre, datos), nombre: e.alias || (e.monstruo && e.nombre) || '', cantidad: Math.max(1, num(e.cantidad, 1)) };
      }),
    }));
    return { nombre: d.sesion || d.nombre || base, notas: d.notas, encuentros, monstruos: nuevos, sinDatos };
  }

  const filas = leerCsv(texto), porCombate = new Map<string, EnemigoEncuentro[]>(), notas = new Map<string, string>();
  for (const f of filas) {
    const nombre = f.enemigo || f.monstruo || f.nombre; if (!nombre) continue;
    const combate = f.combate || f.encuentro || 'Combate 1';
    const datos = f.ca || f.pg ? { ca: f.ca, pg: f.pg, ini: f.iniciativa, cr: f.cr || undefined, texto: f.notas || undefined } : null;
    if (!porCombate.has(combate)) porCombate.set(combate, []);
    porCombate.get(combate)!.push({ ref: resolver(nombre, datos), nombre: '', cantidad: Math.max(1, num(f.cantidad, 1)) });
    if (f.notas && !datos) notas.set(combate, [notas.get(combate), f.notas].filter(Boolean).join(' '));
  }
  const encuentros = [...porCombate].map(([nombre, enemigos], i) => ({ id: id(i), nombre, ...(notas.get(nombre) ? { notas: notas.get(nombre) } : {}), enemigos }));
  return { nombre: base, encuentros, monstruos: nuevos, sinDatos };
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
