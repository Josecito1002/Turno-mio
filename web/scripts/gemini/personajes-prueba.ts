/* Personajes de prueba para revisar un lote en la app: se crean en la cuenta 1@1.com (o --correo) y se borran después.
   Uso:
     npm run prueba:crear -- druida                     uno por subclase, en nivel 20
     npm run prueba:crear -- druida --nivel 6           uno por subclase, en nivel 6
     npm run prueba:crear -- druida circulo-luna:6 :7   solo esos (clave de subclase:nivel; ":7" = sin subclase)
     npm run prueba:borrar                              borra todos los de prueba de la cuenta
   Van marcados con `prueba: true` y el nombre empieza por "Prueba ·", para no tocar nada más. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileSync } from 'node:fs';
import { and, eq, sql } from 'drizzle-orm';
import { crearDb } from '../../src/shared/db/conectar';
import { usuarios } from '../../src/features/cuentas/server/tablas';
import { personajes } from '../../src/features/personajes/server/tablas';
import { nuevoPj } from '../../src/features/personajes/domain/modelo';
import { CLASES } from '../../src/features/reglas/data/clases';
import { SUBCLASES } from '../../src/features/reglas/data/subclases';

async function main() {
  const args = process.argv.slice(2);
  const opt = (k: string) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
  const correo = opt('--correo') || '1@1.com';
  const libres = args.filter((a, i) => !a.startsWith('--') && !['--correo', '--nivel'].includes(args[i - 1] || ''));
  const { db, cerrar } = crearDb();
  try {
    const [u] = await db.select({ id: usuarios.id }).from(usuarios).where(eq(usuarios.email, correo));
    if (!u) throw new Error(`No hay ninguna cuenta con el correo ${correo}.`);
    const deUsuario = and(eq(personajes.usuarioId, u.id), sql`${personajes.datos}->>'prueba' = 'true'`);

    if (args.includes('--borrar')) {
      const borrados = await db.delete(personajes).where(deUsuario).returning({ nombre: personajes.nombre });
      console.log(`Borrados ${borrados.length} personaje(s) de prueba de ${correo}.`);
      return;
    }

    const [clase, ...pedidos] = libres;
    const C = (CLASES as any)[clase];
    if (!C) throw new Error(`Clase: ${Object.keys(CLASES).join(', ')}`);
    const lib = JSON.parse(readFileSync('../biblioteca-mi-turno.json', 'utf8')).clases[clase] || {};
    const subs: Record<string, string> = {
      ...Object.fromEntries(SUBCLASES.filter((s: any) => s.clase === clase && s.key !== 'cadena').map((s: any) => [s.key, s.n])),
      ...Object.fromEntries(Object.entries<any>(lib.subclases || {}).map(([k, s]) => ['lib:' + k, s.n])),
    };
    const nivel = +(opt('--nivel') || 20);
    const lista: [string, number][] = pedidos.length
      ? pedidos.map(p => { const [k, n] = p.split(':'); return [k ? (subs[k] ? k : 'lib:' + k) : '', +n || nivel]; })
      : Object.keys(subs).map(k => [k, nivel]);
    for (const [k] of lista) if (k && !subs[k]) throw new Error(`Subclase desconocida: ${k}. Hay: ${Object.keys(subs).join(', ')}`);

    // Características: 16 en la de lanzar conjuros (o la primera salvación), 14 en CON, 12 en el resto
    const principal = C.lanz || C.sv?.[0] || 'fue';
    for (const [k, n] of lista) {
      const pj: any = nuevoPj();
      Object.assign(pj, { clase, nivel: n, subclase: n >= 3 ? k : '', subclaseNombre: n >= 3 ? subs[k] || '' : '', prueba: true, jugador: 'Prueba' });
      pj.nombre = `Prueba · ${C.n} ${n}${k && n >= 3 ? ' · ' + subs[k] : ''}`;
      pj.especie = { ...pj.especie, key: 'humano', nombre: 'Humano', vel: 30 };
      pj.gen.metodo = 'manual';
      pj.gen.manual = { fue: 12, des: 12, con: 14, int: 12, sab: 12, car: 12, [principal]: 16 };
      await db.insert(personajes).values({ usuarioId: u.id, id: pj.id, nombre: pj.nombre, resumen: `${C.n} ${n}`, datos: pj });
      console.log('Creado: ' + pj.nombre);
    }
    console.log(`\n${lista.length} personaje(s) en la cuenta ${correo}. Para borrarlos: npm run prueba:borrar`);
  } finally {
    await cerrar();
  }
}

main().catch(e => { console.error(e.message); process.exitCode = 1; });
