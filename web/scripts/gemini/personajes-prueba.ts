/* Personajes de prueba para revisar un lote en la app, en la cuenta 1@1.com (o --correo). Van marcados con
   `prueba: true` y el nombre empieza por "Prueba ·", para no tocar nada más.
   Dos formas de usarlo:
   - Con acceso a la base (en la PC):
       npm run prueba:crear -- druida                     uno por subclase, en nivel 20
       npm run prueba:crear -- druida --nivel 6           uno por subclase, en nivel 6
       npm run prueba:crear -- druida circulo-luna:6 :7   solo esos (clave de subclase:nivel; ":7" = sin subclase)
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

/** Los datos del personaje de prueba, con un id fijo para que la misma petición no se duplique. */
export function personajePrueba(p: Pedido, lib: any) {
  const C = (CLASES as any)[p.clase];
  if (!C) throw new Error(`Clase desconocida: ${p.clase}. Hay: ${Object.keys(CLASES).join(', ')}`);
  const subs = subclasesDe(p.clase, lib);
  const k = p.subclase ? (subs[p.subclase] ? p.subclase : 'lib:' + p.subclase) : '';
  if (k && !subs[k]) throw new Error(`Subclase desconocida: ${p.subclase}. Hay: ${Object.keys(subs).join(', ')}`);
  const conSub = !!k && p.nivel >= 3;
  const pj: any = nuevoPj();
  pj.id = `prueba-${p.clase}-${(k || 'base').replace(/^lib:/, '')}-${p.nivel}`;
  Object.assign(pj, { clase: p.clase, nivel: p.nivel, subclase: conSub ? k : '', subclaseNombre: conSub ? subs[k] : '', prueba: true, jugador: 'Prueba' });
  pj.nombre = `Prueba · ${C.n} ${p.nivel}${conSub ? ' · ' + subs[k] : ''}`;
  pj.especie = { ...pj.especie, key: 'humano', nombre: 'Humano', vel: 30 };
  // 16 en la característica de lanzar conjuros (o la primera salvación), 14 en CON, 12 en el resto
  pj.gen.metodo = 'manual';
  pj.gen.manual = { fue: 12, des: 12, con: 14, int: 12, sab: 12, car: 12, [C.lanz || C.sv?.[0] || 'fue']: 16 };
  return { id: pj.id, nombre: pj.nombre, resumen: `${C.n} ${p.nivel}`, datos: pj };
}

/** Deja la cuenta con exactamente los personajes de prueba pedidos (los demás de prueba se borran). */
export async function sincronizarPrueba(db: any, correo: string, pedidos: Pedido[], lib: any, borrarOtros = true) {
  const [u] = await db.select({ id: usuarios.id }).from(usuarios).where(eq(usuarios.email, correo));
  if (!u) throw new Error(`No hay ninguna cuenta con el correo ${correo}.`);
  const deseados = pedidos.map(p => personajePrueba(p, lib));
  const ids = new Set(deseados.map(d => d.id));
  const deUsuario = and(eq(personajes.usuarioId, u.id), sql`${personajes.datos}->>'prueba' = 'true'`);
  const existentes: { id: string; nombre: string }[] = await db.select({ id: personajes.id, nombre: personajes.nombre }).from(personajes).where(deUsuario);
  const borrar = borrarOtros ? existentes.filter(e => !ids.has(e.id)) : [];
  for (const e of borrar) await db.delete(personajes).where(and(eq(personajes.usuarioId, u.id), eq(personajes.id, e.id)));
  const ya = new Set(existentes.map(e => e.id));
  const nuevos = deseados.filter(d => !ya.has(d.id));
  for (const d of nuevos) await db.insert(personajes).values({ usuarioId: u.id, ...d });
  return { creados: nuevos.map(d => d.nombre), borrados: borrar.map(e => e.nombre) };
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
