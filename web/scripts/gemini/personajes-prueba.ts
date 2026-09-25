/* Personajes de prueba para revisar un lote en la app, en la cuenta 1@1.com (o --correo). Van marcados con
   `prueba: true` y el nombre empieza por "Prueba ·", para no tocar nada más.
   Dos formas de usarlo:
   - Con acceso a la base (en la PC):
       npm run prueba:crear -- druida                     uno por subclase, en nivel 20
       npm run prueba:crear -- druida --nivel 6           uno por subclase, en nivel 6
       npm run prueba:crear -- druida circulo-luna:6 :7   solo esos (clave de subclase:nivel; ":7" = la primera subclase)
       npm run prueba:borrar                              borra todos los de prueba de la cuenta
   - Sin acceso a la base (sesión en la nube): se anotan en scripts/datos/personajes-prueba.json y Vercel los crea o
     borra al publicar (scripts/despliegue.ts):
       npm run prueba:pedir -- druida circulo-luna:6      agrega esos a la lista
       npm run prueba:quitar                              vacía la lista (se borran en la próxima publicación) */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { and, eq, sql } from 'drizzle-orm';
import { crearDb } from '../../src/shared/db/conectar';
import { usuarios } from '../../src/features/cuentas/server/tablas';
import { personajes } from '../../src/features/personajes/server/tablas';
import { nuevoPj } from '../../src/features/personajes/domain/modelo';
import { CLASES } from '../../src/features/reglas/data/clases';
import { SUBCLASES } from '../../src/features/reglas/data/subclases';
import { TRASFONDOS } from '../../src/features/reglas/data/trasfondos';
import { SKILLS } from '../../src/features/reglas/data/caracteristicas';
import { ARMAS, ARMADURAS } from '../../src/features/reglas/data/equipo';
import { kitClase } from '../../src/features/reglas/data/equipo-clases';
import { kitTrasfondo } from '../../src/features/reglas/data/equipo-trasfondos';
import { periciaN } from '../../src/features/reglas/data/clases';
import { setLib, getC, todosConjuros } from '../../src/features/biblioteca/domain/biblioteca';
import { compute } from '../../src/features/personajes/domain/calculo';
import { competenteArma } from '../../src/features/reglas/domain/competencias';
import { conjuroDeLaLista, listaDeConjuros } from '../../src/features/reglas/domain/restricciones';
import { norm } from '../../src/shared/utils/texto';

/* Sube cuando cambie cómo se arma un personaje de prueba: al publicar se rehacen los que tengan otra versión */
export const PRUEBA_VERSION = 2;

export const LISTA = 'scripts/datos/personajes-prueba.json';
export type Pedido = { clase: string; subclase: string; nivel: number };
export const leerLista = (): { correo: string; personajes: Pedido[] } =>
  existsSync(LISTA) ? JSON.parse(readFileSync(LISTA, 'utf8')) : { correo: '1@1.com', personajes: [] };

/* Subclases de una clase: las integradas por su clave y las de la biblioteca como "lib:<clave>" */
function subclasesDe(clase: string, lib: any): Record<string, string> {
  return {
    ...Object.fromEntries(SUBCLASES.filter((s: any) => s.clase === clase && s.key !== 'cadena').map((s: any) => [s.key, s.n])),
    ...Object.fromEntries(Object.entries<any>(lib.clases?.[clase]?.subclases || {}).map(([k, s]) => ['lib:' + k, s.n])),
  };
}

/* La característica principal: la de lanzar conjuros; DES en las clases y subclases de destreza; si no, la primera salvación */
function principal(clase: string, C: any, nombreSub: string): string {
  if (C.lanz) return C.lanz;
  if (/arquero|embaucador/i.test(nombreSub)) return 'des';
  if (/caballero arcano|artes m[ií]sticas/i.test(nombreSub)) return 'int';
  if (['monje', 'picaro', 'explorador'].includes(clase)) return 'des';
  return C.sv?.[0] || 'fue';
}

/* Lo que agrega un kit (igual que al tomarlo en el editor), anotado en pj.kits para poder quitarlo */
function agregarKit(pj: any, tipo: 'clase' | 'trasfondo', titulo: string, v: any) {
  const ap: any = { armas: v.armas || [], bloque: `${titulo}:\n${(v.objetos || []).map((o: string) => `- ${o}`).join('\n')}`, oro: v.oro || 0 };
  (ap.armas as [string, number][]).forEach(([k, q]) => { const ex = pj.armas.find((a: any) => a[0] === k); if (ex) ex[1] += q; else pj.armas.push([k, q]); });
  if (v.armadura) { ap.armadura = v.armadura; ap.armaduraAntes = pj.armadura; pj.armadura = v.armadura; }
  if (v.escudo) { ap.escudo = true; ap.escudoAntes = !!pj.escudo; pj.escudo = true; }
  pj.inventario = [pj.inventario, ap.bloque].filter(Boolean).join('\n\n');
  pj.oro = (+pj.oro || 0) + ap.oro;
  pj.kits = { ...(pj.kits || {}), [tipo]: ap };
}

/** Rellena todo lo que se elige al crear y al subir de nivel, para que el personaje de prueba no quede a medias:
 *  trasfondo, dote y habilidad del humano, mejoras, habilidades, pericias, estilo, maestrías, equipo, elecciones de
 *  rasgos y conjuros. Donde hay que elegir, toma la primera opción que sirva. */
function completar(pj: any, pr: string) {
  const C = getC(pj, pj.clase);
  // Trasfondo que sube la característica principal (+2) y, si puede, CON (+1)
  const [tk, T] = Object.entries<any>(TRASFONDOS).find(([, t]) => t.ab?.includes(pr) && t.ab.includes('con'))
    || Object.entries<any>(TRASFONDOS).find(([, t]) => t.ab?.includes(pr))!;
  const b = T.ab.includes('con') && pr !== 'con' ? 'con' : T.ab.find((k: string) => k !== pr);
  Object.assign(pj.trasfondo, { key: tk, modo: '21', a: pr, b, nombre: T.n, dote: T.dote, habs: [...T.habs], herr: T.herr });
  pj.doteHumano = T.dote === 'duro' ? 'alerta' : 'duro';
  // Mejoras: la principal hasta 20, luego CON y luego el resto
  const val: Record<string, number> = { ...pj.gen.manual };
  val[pr] += 2; val[b] += 1;
  const orden = [pr, 'con', ...['des', 'sab', 'fue', 'car', 'int'].filter(k => k !== pr && k !== 'con')];
  for (const L of (C.asi || [4, 8, 12, 16, 19, ...(pj.clase === 'guerrero' ? [6, 14] : pj.clase === 'picaro' ? [10] : [])]).filter((n: number) => n <= pj.nivel)) {
    const una = orden.find(k => val[k] <= 18);
    if (una) { pj.mejoras[L] = { modo: 'una', a: una }; val[una] += 2; continue; }
    const [x, y] = orden.filter(k => val[k] < 20);
    if (x && y) { pj.mejoras[L] = { modo: 'dos', a: x, b: y }; val[x]++; val[y]++; } else pj.mejoras[L] = { modo: 'dote', key: 'duro' };
  }
  // Habilidades: las de la clase que no dé el trasfondo, y una más del humano
  const todas = SKILLS.map(s => s[0]), bg = T.habs.map(norm);
  const deClase = (C.habs === 'todas' || !Array.isArray(C.habs) ? todas : C.habs).filter((h: string) => !bg.includes(norm(h)));
  pj.habClase = deClase.slice(0, C.habN || 0);
  pj.habExtra = [todas.find(h => !bg.includes(norm(h)) && !pj.habClase.includes(h))];
  if (C.estilo && pj.nivel >= C.estilo) {
    const est: string[] = C.estilos || [];
    pj.estilo = (pr === 'des' && est.includes('arqueria') ? 'arqueria' : est.includes('defensa') ? 'defensa' : est[0]) || '';
  }
  // Equipo: el kit de la clase (el del arco en el guerrero de DES) y el del trasfondo
  const kit = kitClase(pj.clase);
  if (kit) {
    const i = pr === 'des' && kit.variantes.length > 1 ? 1 : 0, v = kit.variantes[i];
    agregarKit(pj, 'clase', `De la clase (${C.n})`, v); pj.inicial = String.fromCharCode(65 + i);
    // La FUE que pide la armadura del kit, para no perder velocidad
    const fueMin = (ARMADURAS as any)[v.armadura || '']?.fue || 0;
    if (pj.gen.manual.fue < fueMin) pj.gen.manual.fue = fueMin;
  }
  const kt = kitTrasfondo(tk, T);
  if (kt) { agregarKit(pj, 'trasfondo', `Del trasfondo (${T.n})`, kt); pj.trasfondo.equipo = 'A'; }
  // Elecciones de rasgos: pueden abrir otras nuevas, así que se repite hasta que no falte ninguna
  pj.elecciones = pj.elecciones || {};
  for (let i = 0; i < 6; i++) {
    const c = compute(pj);
    const faltan = (c.elecciones || []).filter((e: any) => e.multi ? e.valor.length < e.max : !e.valor);
    if (!faltan.length) break;
    for (const e of faltan) {
      const libres = e.opciones.map((o: any) => o.key).filter((k: string) => !(e.valor || []).includes?.(k));
      pj.elecciones[e.id] = e.multi ? [...e.valor, ...libres].slice(0, e.max) : libres[0] || '';
    }
  }
  let c = compute(pj);
  // Pericias entre las habilidades competentes, y maestrías empezando por las armas que lleva
  const pn = periciaN(pj.clase, c.lvl);
  if (pn) pj.pericia = todas.filter(h => c.skillProf[norm(h)]).slice(0, pn);
  if (C.maestrias) {
    const vale = (k: string) => !k.startsWith('x:') && ARMAS[k]?.ma && competenteArma(c, k) && !(pj.clase === 'barbaro' && ARMAS[k].dist);
    const lleva = pj.armas.map((a: any) => a[0]).sort((x: string, y: string) => pr === 'des' ? +!!ARMAS[y]?.dist - +!!ARMAS[x]?.dist : 0);
    pj.maestrias = [...new Set([...lleva, ...Object.keys(ARMAS)])].filter(vale).slice(0, C.maestrias);
  }
  // Conjuros: los trucos y preparados que le tocan, repartidos entre los niveles que puede lanzar
  c = compute(pj);
  const lista = listaDeConjuros(pj.clase, c.C) || c.listaSub;
  if (lista) {
    const tiene = new Set([...pj.conjuros.map((s: any) => norm(s.nombre)), ...c.siempre]);
    const de = todosConjuros().filter((s: any) => conjuroDeLaLista(s, lista) && !tiene.has(norm(s.nombre)));
    const trucos = de.filter((s: any) => !+s.nivel).slice(0, Math.max(0, (c.trucosMax || 0) - c.trucosUsados));
    const porNivel = Array.from({ length: c.nivelMax || 0 }, (_, i) => de.filter((s: any) => +s.nivel === i + 1));
    const prep: any[] = [];
    for (let i = 0, falta = Math.max(0, (c.prepMax || 0) - c.prepUsados); prep.length < falta && porNivel.some(l => l.length); i++) {
      const s = porNivel[i % porNivel.length].shift();
      if (s) prep.push(s);
    }
    pj.conjuros.push(...[...trucos, ...prep].map((s: any) => ({ ...s, extra: false })));
  }
}

/** Los datos del personaje de prueba, con un id fijo para que la misma petición no se duplique. */
export function personajePrueba(p: Pedido, lib: any) {
  setLib(lib);
  const C = (CLASES as any)[p.clase] || getC({}, p.clase);
  if (!C) throw new Error(`Clase desconocida: ${p.clase}. Hay: ${Object.keys(CLASES).join(', ')}`);
  const subs = subclasesDe(p.clase, lib);
  const k = p.subclase ? (subs[p.subclase] ? p.subclase : 'lib:' + p.subclase) : '';
  if (k && !subs[k]) throw new Error(`Subclase desconocida: ${p.subclase}. Hay: ${Object.keys(subs).join(', ')}`);
  // Sin subclase pedida, desde el nivel 3 lleva la primera, para que no quede nada sin elegir
  const conSub = p.nivel >= 3 && Object.keys(subs).length > 0;
  const ks = k || Object.keys(subs)[0];
  const pj: any = nuevoPj();
  pj.id = `prueba-${p.clase}-${(k || 'base').replace(/^lib:/, '')}-${p.nivel}`;
  Object.assign(pj, { clase: p.clase, nivel: p.nivel, subclase: conSub ? ks : '', subclaseNombre: conSub ? subs[ks] : '', prueba: true, pruebaVersion: PRUEBA_VERSION, jugador: 'Prueba' });
  pj.nombre = `Prueba · ${C.n} ${p.nivel}${conSub ? ' · ' + subs[ks] : ''}`;
  pj.especie = { ...pj.especie, key: 'humano', nombre: 'Humano', vel: 30 };
  // 16 en la característica principal, 14 en CON, 12 en el resto (antes del trasfondo y las mejoras)
  const pr = principal(p.clase, C, conSub ? subs[ks] : '');
  pj.gen.metodo = 'manual';
  pj.gen.manual = { fue: 12, des: 12, con: 14, int: 12, sab: 12, car: 12, [pr]: 16 };
  completar(pj, pr);
  return { id: pj.id, nombre: pj.nombre, resumen: `${C.n} ${p.nivel}, Humano`, datos: pj };
}

/** Deja la cuenta con exactamente los personajes de prueba pedidos (los demás de prueba se borran). */
export async function sincronizarPrueba(db: any, correo: string, pedidos: Pedido[], lib: any, borrarOtros = true) {
  const [u] = await db.select({ id: usuarios.id }).from(usuarios).where(eq(usuarios.email, correo));
  if (!u) throw new Error(`No hay ninguna cuenta con el correo ${correo}.`);
  const deseados = pedidos.map(p => personajePrueba(p, lib));
  const ids = new Set(deseados.map(d => d.id));
  const deUsuario = and(eq(personajes.usuarioId, u.id), sql`${personajes.datos}->>'prueba' = 'true'`);
  const existentes: { id: string; nombre: string; version: string | null }[] = await db.select({ id: personajes.id, nombre: personajes.nombre, version: sql<string | null>`${personajes.datos}->>'pruebaVersion'` }).from(personajes).where(deUsuario);
  const borrar = borrarOtros ? existentes.filter(e => !ids.has(e.id)) : [];
  for (const e of borrar) await db.delete(personajes).where(and(eq(personajes.usuarioId, u.id), eq(personajes.id, e.id)));
  const ya = new Map(existentes.map(e => [e.id, e]));
  const nuevos = deseados.filter(d => !ya.has(d.id));
  for (const d of nuevos) await db.insert(personajes).values({ usuarioId: u.id, ...d });
  // Los que se armaron con otra versión del script se rehacen (se pierde lo que se haya tocado en ellos)
  const viejos = deseados.filter(d => ya.has(d.id) && ya.get(d.id)!.version !== String(PRUEBA_VERSION));
  for (const d of viejos) await db.update(personajes).set({ nombre: d.nombre, resumen: d.resumen, datos: d.datos, actualizadoEn: new Date() }).where(and(eq(personajes.usuarioId, u.id), eq(personajes.id, d.id)));
  return { creados: nuevos.map(d => d.nombre), rehechos: viejos.map(d => d.nombre), borrados: borrar.map(e => e.nombre) };
}

/* "circulo-luna:6" → { subclase, nivel }; ":7" = sin subclase; sin lista, uno por subclase */
function pedidosDe(clase: string, textos: string[], nivel: number, lib: any): Pedido[] {
  if (textos.length) return textos.map(t => { const [k, n] = t.split(':'); return { clase, subclase: k || '', nivel: +n || nivel }; });
  return Object.keys(subclasesDe(clase, lib)).map(k => ({ clase, subclase: k.replace(/^lib:/, ''), nivel }));
}

async function main() {
  const args = process.argv.slice(2);
  const opt = (k: string) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
  const libres = args.filter((a, i) => !a.startsWith('--') && !['--correo', '--nivel'].includes(args[i - 1] || ''));
  const lib = JSON.parse(readFileSync('../biblioteca-mi-turno.json', 'utf8'));
  const [clase, ...textos] = libres;

  if (args.includes('--lista')) {
    const l = leerLista();
    if (opt('--correo')) l.correo = opt('--correo')!;
    if (args.includes('--borrar')) l.personajes = [];
    else {
      const nuevos = pedidosDe(clase, textos, +(opt('--nivel') || 20), lib);
      nuevos.forEach(p => personajePrueba(p, lib)); // valida clase y subclase
      l.personajes = [...l.personajes.filter(p => !nuevos.some(n => JSON.stringify(n) === JSON.stringify(p))), ...nuevos];
    }
    writeFileSync(LISTA, JSON.stringify(l, null, 2) + '\n');
    console.log(`${LISTA}: ${l.personajes.length} personaje(s) de prueba para ${l.correo}. Se aplican al publicar en Vercel (commit y push a main).`);
    return;
  }

  const { db, cerrar } = crearDb();
  try {
    const correo = opt('--correo') || '1@1.com';
    if (args.includes('--borrar')) {
      const r = await sincronizarPrueba(db, correo, [], lib);
      console.log(`Borrados ${r.borrados.length} personaje(s) de prueba de ${correo}.`);
      return;
    }
    const r = await sincronizarPrueba(db, correo, pedidosDe(clase, textos, +(opt('--nivel') || 20), lib), lib, false);
    r.creados.forEach(n => console.log('Creado: ' + n));
    console.log(`\n${r.creados.length} personaje(s) nuevos en la cuenta ${correo}. Para borrarlos: npm run prueba:borrar`);
  } finally {
    await cerrar();
  }
}

if (process.argv[1]?.replace(/\\/g, '/').endsWith('gemini/personajes-prueba.ts')) main().catch(e => { console.error(e.message); process.exitCode = 1; });
