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
import { AB, SKILLS } from '../src/features/reglas/data/caracteristicas';
import { ARMAS } from '../src/features/reglas/data/equipo';
import { norm } from '../src/shared/utils/texto';

const signo = (n: number) => (n >= 0 ? '+' : '') + n;
const lista = (xs: string[]) => xs.filter(Boolean).join(', ') || '—';

/** El resumen de un personaje en Markdown, con lo que el motor calcula (igual que la hoja). */
export function resumenPersonaje(datos: any, jugador: string, unidoEn: Date) {
  const pj = reparar(structuredClone(datos));
  let c: any = null, error = '';
  try { c = compute(pj); } catch (e: any) { error = e.message; }
  const E = c?.E, sub = pj.especie?.sub;
  const especie = pj.especie?.key === 'custom' ? pj.especie.nombre : E?.n || pj.especie?.key || '—';
  const linaje = sub ? E?.subs?.[sub]?.n || sub : '';
  const clase = c?.C?.n || pj.clase || '—';
  const subclase = c?.SD?.n || pj.subclaseNombre || '';
  const trasfondo = pj.trasfondo?.key === 'custom' ? pj.trasfondo.nombre : c?.T?.n || pj.trasfondo?.nombre || pj.trasfondo?.key || '—';
  const fila = { jugador, personaje: pj.nombre || 'Sin nombre', especie: especie + (linaje ? ` (${linaje})` : ''), clase: `${clase} ${pj.nivel}`, subclase: subclase || '—' };
  const l: string[] = [`### ${fila.personaje} (${jugador})`, ''];
  l.push(`- **Unido a la mesa:** ${unidoEn.toISOString().slice(0, 16).replace('T', ' ')} UTC`);
  if (pj.jugador) l.push(`- **Jugador (en la hoja):** ${pj.jugador}`);
  l.push(`- **Especie:** ${fila.especie}`, `- **Clase:** ${fila.clase}${subclase ? ` · ${subclase}` : ''}`, `- **Trasfondo:** ${trasfondo}`);
  if (pj.alineamiento) l.push(`- **Alineamiento:** ${pj.alineamiento}`);
  if (!c) { l.push(`- **No se pudo calcular la hoja:** ${error}`, ''); return { fila, md: l.join('\n') }; }
  l.push(`- **Características:** ${AB.map(([k, , ab]) => `${ab} ${c.sc[k]} (${signo(c.m[k])})`).join(' · ')}`);
  l.push(`- **CA** ${c.ac} · **PG máx.** ${c.hpMax} · **Velocidad** ${c.speed} pies · **Iniciativa** ${signo(c.init)} · **Percepción pasiva** ${c.passive} · **Bono de competencia** ${signo(c.pb)}`);
  l.push(`- **Salvaciones competentes:** ${lista(AB.filter(([k]) => c.saveProf.includes(k)).map(([k, , ab]) => `${ab} ${signo(c.saves[k])}`))}`);
  l.push(`- **Habilidades competentes:** ${lista(SKILLS.filter(([n]) => c.skillProf[norm(n)]).map(([n]) => `${n} ${signo(c.skill[norm(n)])}${c.skillPer[norm(n)] ? ' (pericia)' : ''}`))}`);
  if (c.casterAb) l.push(`- **Conjuros:** CD ${c.dcSpell}, ataque ${signo(c.atkSpell)}`);
  l.push(`- **Dotes:** ${lista(c.dotes.map((d: any) => d.nombre))}`);
  l.push(`- **Armadura:** ${c.armor?.n || 'ninguna'}${c.shield ? ' y escudo' : ''}`);
  l.push(`- **Armas:** ${lista((pj.armas || []).map(([k, q]: [string, number]) => (ARMAS as any)[k]?.n ? `${(ARMAS as any)[k].n}${q > 1 ? ` ×${q}` : ''}` : ''))}`);
  if ((c.conjuros || []).length) l.push(`- **Conjuros conocidos o preparados:** ${lista(c.conjuros.map((s: any) => s.nombre))}`);
  l.push('');
  return { fila, md: l.join('\n') };
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
      let filas = await db.select({ unidoEn: mesaJugadores.unidoEn, jugador: usuarios.nombre, datos: personajes.datos })
        .from(mesaJugadores)
        .innerJoin(personajes, and(eq(personajes.usuarioId, mesaJugadores.jugadorId), eq(personajes.id, mesaJugadores.personajeId)))
        .innerJoin(usuarios, eq(usuarios.id, mesaJugadores.jugadorId))
        .where(and(eq(mesaJugadores.dmId, mesa.dmId), eq(mesaJugadores.campanaId, mesa.id)))
        .orderBy(mesaJugadores.unidoEn);
      if (desde) filas = filas.filter(f => f.unidoEn >= desde);
      const res = filas.map(f => resumenPersonaje(f.datos, f.jugador, f.unidoEn));
      salida.push(`## ${mesa.nombre} (DM: ${mesa.dm}): ${res.length} jugador(es)${desde ? ` desde ${opt('--desde')}` : ''}`, '',
        '| Jugador | Personaje | Especie | Clase y nivel | Subclase |', '|---|---|---|---|---|',
        ...res.map(({ fila: f }) => `| ${f.jugador} | ${f.personaje} | ${f.especie} | ${f.clase} | ${f.subclase} |`), '',
        ...res.map(r => r.md));
    }
    const texto = salida.join('\n');
    console.log(texto);
    if (opt('--archivo')) { writeFileSync(opt('--archivo')!, texto + '\n'); console.log(`\nGuardado en ${opt('--archivo')}`); }
  } finally {
    await cerrar();
  }
}

if (process.argv[1]?.replace(/\\/g, '/').endsWith('scripts/mesa-jugadores.ts')) main().catch(e => { console.error(e.message); process.exitCode = 1; });
