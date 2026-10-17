/* Duración de los efectos en combate, contada en rondas: 1 minuto son 10 rondas. Un efecto termina al empezar el turno
   de quien lo causó en la ronda en que se cumple (así "1 minuto" dura exactamente 10 turnos suyos). */

/** Hasta cuándo dura: termina al empezar el turno de `k` en la ronda `ronda`. */
export type Hasta = { ronda: number; k: string };
type Combate = { ronda?: number; turno?: number; orden?: { k: string }[] };

const NUM: Record<string, number> = { un: 1, una: 1, uno: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10 };
/** Cuántas rondas dura según su texto ("1 minuto", "hasta 10 minutos", "hasta el final de tu siguiente turno"), o null si no lo dice
 *  o es instantáneo. Lo que dura más de una hora no se cuenta en combate. */
export function rondasDe(texto: string): number | null {
  const t = String(texto || '').toLowerCase();
  if (/(final|fin|inicio|comienzo) de (tu|su) (siguiente|pr[oó]ximo) turno/.test(t)) return 1;
  const m = /(\d+|un|una|uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez)\s+(ronda|turno|minuto|hora)s?\b/.exec(t);
  if (!m) return null;
  const n = /^\d+$/.test(m[1]) ? +m[1] : NUM[m[1]];
  const r = m[2] === 'minuto' ? n * 10 : m[2] === 'hora' ? n * 600 : n;
  return r > 0 && r <= 600 ? r : null;
}

/** El momento en que termina un efecto que dura `rondas`, puesto ahora por `k`. */
export const hastaDesde = (rondas: number, ronda: number, k: string): Hasta => ({ ronda: ronda + rondas, k });

/** Rondas que le quedan (0: termina al empezar el turno de quien lo causó en esta ronda); null si ya terminó. */
export function rondasRestantes(h: Hasta, cb: Combate): number | null {
  const ronda = cb.ronda || 1, orden = cb.orden || [];
  const i = orden.findIndex(o => o.k === h.k), turno = cb.turno || 0;
  // Si quien lo causó ya no está en el combate, termina al pasar su ronda
  const llego = i < 0 ? ronda > h.ronda : ronda > h.ronda || (ronda === h.ronda && turno >= i);
  return llego ? null : h.ronda - ronda;
}

/** "quedan 9 rondas", "última ronda", o "terminó". */
export function textoRestante(h: Hasta, cb: Combate): string {
  const r = rondasRestantes(h, cb);
  return r == null ? 'terminó' : r === 0 ? 'última ronda' : `quedan ${r} ronda${r === 1 ? '' : 's'}`;
}

/** "1 minuto (10 rondas)" para avisar cuánto dura. */
export const textoDuracion = (rondas: number) =>
  rondas % 600 === 0 ? `${rondas / 600} hora${rondas === 600 ? '' : 's'}` : rondas % 10 === 0 ? `${rondas / 10} minuto${rondas === 10 ? '' : 's'} (${rondas} rondas)` : `${rondas} ronda${rondas === 1 ? '' : 's'}`;

/** Quita del estado de cada combatiente las condiciones con duración que ya terminaron; devuelve "Nombre: condición" de cada una. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function vencerCondiciones(estado: Record<string, any>, cb: Combate, nombre: (k: string) => string = k => k): string[] {
  const fin: string[] = [];
  for (const [k, e] of Object.entries(estado || {})) {
    if (!e?.hasta) continue;
    for (const [cond, h] of Object.entries(e.hasta as Record<string, Hasta>)) {
      if (rondasRestantes(h, cb) != null) continue;
      e.cond = (e.cond || []).filter((x: string) => x !== cond);
      delete e.hasta[cond];
      if (e.dur) delete e.dur[cond];
      fin.push(`${nombre(k)}: ${cond}`);
    }
  }
  return fin;
}
