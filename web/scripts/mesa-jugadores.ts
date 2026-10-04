/* Resumen de los personajes de los jugadores unidos a una mesa (campaña de un DM), para el DM.
     npm run mesa:jugadores -- "El precio de los deseos"                  todos los jugadores de esa mesa
     npm run mesa:jugadores -- "precio" --desde 2026-10-03                solo los que se unieron desde esa fecha
     npm run mesa:jugadores -- "precio" --archivo mesa.md                 además lo guarda en un archivo
   El nombre de la mesa se busca sin distinguir mayúsculas ni acentos, y basta con una parte. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileSync, writeFileSync } from 'node:fs';
import { and, eq } from 'drizzle-orm';
import { crearDb } from '../src/shared/db/conectar';
import { usuarios } from '../src/features/cuentas/server/tablas';
import { personajes } from '../src/features/personajes/server/tablas';
import { campanas, mesaJugadores } from '../src/features/mesa/server/tablas';
import { reparar } from '../src/features/personajes/domain/modelo';
import { compute } from '../src/features/personajes/domain/calculo';
import { setLib } from '../src/features/biblioteca/domain/biblioteca';
import { resumenMesa, type PersonajeExportado } from '../src/features/mesa/domain/exportar';
import { norm } from '../src/shared/utils/texto';

function calcular(datos: any, jugador: string, unidoEn: Date, actualizadoEn: Date): PersonajeExportado {
  let c: any = null;
  try { c = compute(reparar(structuredClone(datos))); } catch (e: any) { console.error(`${datos?.nombre}: ${e.message}`); }
  return { datos, c, jugador, origen: 'unido', unidoEn: unidoEn.toISOString(), actualizadoEn: actualizadoEn.toISOString() };
}

async function main() {
  const args = process.argv.slice(2);
  const opt = (k: string) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
  const buscado = args.filter((a, i) => !a.startsWith('--') && !['--desde', '--archivo'].includes(args[i - 1] || '')).join(' ');
  if (!buscado) throw new Error('Falta el nombre de la mesa: npm run mesa:jugadores -- "El precio de los deseos"');
  const desde = opt('--desde') ? new Date(opt('--desde')!) : null;
  setLib(JSON.parse(readFileSync('../biblioteca-mi-turno.json', 'utf8')));

  const { db, cerrar } = crearDb();
  try {
    const mesas = (await db.select({ dmId: campanas.usuarioId, id: campanas.id, nombre: campanas.nombre, dm: usuarios.nombre })
      .from(campanas).innerJoin(usuarios, eq(usuarios.id, campanas.usuarioId)))
      .filter(m => norm(m.nombre).includes(norm(buscado)));
    if (!mesas.length) throw new Error(`No hay ninguna mesa cuyo nombre contenga "${buscado}".`);
    const salida: string[] = [];
    for (const mesa of mesas) {
      let filas = await db.select({ unidoEn: mesaJugadores.unidoEn, jugador: usuarios.nombre, datos: personajes.datos, actualizadoEn: personajes.actualizadoEn })
        .from(mesaJugadores)
        .innerJoin(personajes, and(eq(personajes.usuarioId, mesaJugadores.jugadorId), eq(personajes.id, mesaJugadores.personajeId)))
        .innerJoin(usuarios, eq(usuarios.id, mesaJugadores.jugadorId))
        .where(and(eq(mesaJugadores.dmId, mesa.dmId), eq(mesaJugadores.campanaId, mesa.id)))
        .orderBy(mesaJugadores.unidoEn);
      if (desde) filas = filas.filter(f => f.unidoEn >= desde);
      const lista = filas.map(f => calcular(f.datos, f.jugador, f.unidoEn, f.actualizadoEn));
      salida.push(resumenMesa(mesa.nombre, lista, `DM: ${mesa.dm}${desde ? `, unidos desde ${opt('--desde')}` : ''}`));
    }
    const texto = salida.join('\n');
    console.log(texto);
    if (opt('--archivo')) { writeFileSync(opt('--archivo')!, texto + '\n'); console.log(`\nGuardado en ${opt('--archivo')}`); }
  } finally {
    await cerrar();
  }
}

if (process.argv[1]?.replace(/\\/g, '/').endsWith('scripts/mesa-jugadores.ts')) main().catch(e => { console.error(e.message); process.exitCode = 1; });
