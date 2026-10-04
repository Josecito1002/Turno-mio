/* eslint-disable @typescript-eslint/no-explicit-any */
/* Exportar una mesa: los datos completos (JSON, sirve de respaldo y para importar las hojas) y un resumen legible
   (Markdown) con lo que el motor calcula de cada personaje, igual que la hoja. Lo usan la Mesa del DM y
   scripts/mesa-jugadores.ts. */
import { AB, SKILLS } from '@/features/reglas/data/caracteristicas';
import { ARMAS } from '@/features/reglas/data/equipo';
import { norm } from '@/shared/utils/texto';

/** Un personaje para exportar: la hoja guardada (`datos`), su cálculo (`c`, null si falló) y quién lo juega. */
export type PersonajeExportado = { datos: any; c: any; jugador: string; origen: 'unido' | 'copia'; unidoEn?: string; actualizadoEn?: string };

const signo = (n: number) => (n >= 0 ? '+' : '') + n;
const lista = (xs: string[]) => xs.filter(Boolean).join(', ') || '—';
const fecha = (iso?: string) => (iso ? new Date(iso).toISOString().slice(0, 16).replace('T', ' ') + ' UTC' : '');

/** Lo básico de un personaje, para la tabla del resumen. */
export function filaPersonaje(p: PersonajeExportado) {
  const pj = p.datos, c = p.c, E = c?.E, sub = pj.especie?.sub;
  const especie = pj.especie?.key === 'custom' ? pj.especie.nombre : E?.n || pj.especie?.key || '—';
  const linaje = sub ? E?.subs?.[sub]?.n || sub : '';
  return {
    jugador: p.jugador || pj.jugador || '—',
    personaje: pj.nombre || 'Sin nombre',
    especie: especie + (linaje ? ` (${linaje})` : ''),
    clase: `${c?.C?.n || pj.clase || '—'} ${pj.nivel}`,
    subclase: c?.SD?.n || pj.subclaseNombre || '—',
    trasfondo: pj.trasfondo?.key === 'custom' ? pj.trasfondo.nombre : c?.T?.n || pj.trasfondo?.nombre || pj.trasfondo?.key || '—',
  };
}

/** El resumen de un personaje en Markdown. */
export function resumenPersonaje(p: PersonajeExportado) {
  const pj = p.datos, c = p.c, f = filaPersonaje(p);
  const l: string[] = [`### ${f.personaje} (${f.jugador})`, ''];
  if (p.unidoEn) l.push(`- **Unido a la mesa:** ${fecha(p.unidoEn)}`);
  if (p.actualizadoEn) l.push(`- **Hoja actualizada:** ${fecha(p.actualizadoEn)}`);
  if (p.origen === 'copia') l.push('- **Copia guardada en la cuenta del DM**');
  if (pj.jugador && pj.jugador !== f.jugador) l.push(`- **Jugador (en la hoja):** ${pj.jugador}`);
  l.push(`- **Especie:** ${f.especie}`, `- **Clase:** ${f.clase}${f.subclase !== '—' ? ` · ${f.subclase}` : ''}`, `- **Trasfondo:** ${f.trasfondo}`);
  if (pj.alineamiento) l.push(`- **Alineamiento:** ${pj.alineamiento}`);
  if (!c) { l.push('- **No se pudo calcular la hoja.**', ''); return l.join('\n'); }
  l.push(`- **Características:** ${AB.map(([k, , ab]) => `${ab} ${c.sc[k]} (${signo(c.m[k])})`).join(' · ')}`);
  l.push(`- **CA** ${c.ac} · **PG máx.** ${c.hpMax} · **Velocidad** ${c.speed} pies · **Iniciativa** ${signo(c.init)} · **Percepción pasiva** ${c.passive} · **Bono de competencia** ${signo(c.pb)}`);
  l.push(`- **Salvaciones competentes:** ${lista(AB.filter(([k]) => c.saveProf.includes(k)).map(([k, , ab]) => `${ab} ${signo(c.saves[k])}`))}`);
  l.push(`- **Habilidades competentes:** ${lista(SKILLS.filter(([n]) => c.skillProf[norm(n)]).map(([n]) => `${n} ${signo(c.skill[norm(n)])}${c.skillPer[norm(n)] ? ' (pericia)' : ''}`))}`);
  if (c.casterAb) l.push(`- **Conjuros:** CD ${c.dcSpell}, ataque ${signo(c.atkSpell)}`);
  l.push(`- **Dotes:** ${lista((c.dotes || []).map((d: any) => d.nombre))}`);
  l.push(`- **Armadura:** ${c.armor?.n || 'ninguna'}${c.shield ? ' y escudo' : ''}`);
  l.push(`- **Armas:** ${lista((pj.armas || []).map(([k, q]: [string, number]) => (ARMAS as any)[k]?.n ? `${(ARMAS as any)[k].n}${q > 1 ? ` ×${q}` : ''}` : ''))}`);
  if ((c.conjuros || []).length) l.push(`- **Conjuros conocidos o preparados:** ${lista(c.conjuros.map((s: any) => s.nombre))}`);
  l.push('');
  return l.join('\n');
}

/** El resumen de toda la mesa en Markdown: una tabla y un bloque por personaje. */
export function resumenMesa(nombre: string, lista: PersonajeExportado[], subtitulo = '') {
  const filas = lista.map(filaPersonaje);
  return [`## ${nombre}${subtitulo ? ` (${subtitulo})` : ''}: ${lista.length} personaje${lista.length === 1 ? '' : 's'}`, '',
    '| Jugador | Personaje | Especie | Clase y nivel | Subclase |', '|---|---|---|---|---|',
    ...filas.map(f => `| ${f.jugador} | ${f.personaje} | ${f.especie} | ${f.clase} | ${f.subclase} |`), '',
    ...lista.map(resumenPersonaje)].join('\n');
}

/** Los datos completos de la mesa: la campaña y cada hoja tal como está guardada. */
export function datosMesa(campana: any, lista: PersonajeExportado[]) {
  return {
    tipo: 'miturno-mesa', v: 1, exportadoEn: new Date().toISOString(), campana,
    personajes: lista.map(p => ({ jugador: p.jugador, origen: p.origen, unidoEn: p.unidoEn, actualizadoEn: p.actualizadoEn, hoja: p.datos })),
  };
}
