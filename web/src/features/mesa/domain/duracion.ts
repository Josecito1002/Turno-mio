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

/** Al empezar el próximo turno de `k` (el de esta ronda si todavía no le tocó). */
export function inicioTurno(k: string, cb: Combate): Hasta {
  const ronda = cb.ronda || 1, i = (cb.orden || []).findIndex(o => o.k === k);
  return { ronda: i > (cb.turno || 0) ? ronda : ronda + 1, k };
}
/** Al terminar el próximo turno de `k`, es decir, al empezar el turno de quien le sigue. */
export function finTurno(k: string, cb: Combate): Hasta {
  const orden = cb.orden || [], ronda = cb.ronda || 1, i = orden.findIndex(o => o.k === k);
  if (i < 0 || !orden.length) return { ronda: ronda + 1, k };
  const suTurno = i > (cb.turno || 0) ? ronda : ronda + 1, j = (i + 1) % orden.length;
  return { ronda: j === 0 ? suTurno + 1 : suTurno, k: orden[j].k };
}
/** Cuánto dura lo que dice el texto, puesto ahora por `autor` sobre `objetivo`: "1 minuto" son 10 rondas desde el turno
 *  de quien lo lanzó; "hasta el final de tu siguiente turno" termina con el turno de quien lo lanzó, y "de su siguiente
 *  turno", con el del objetivo. */
export function hastaDe(texto: string, cb: Combate, autor: string, objetivo?: string): { rondas: number; hasta: Hasta } | null {
  const t = String(texto || '').toLowerCase(), ronda = cb.ronda || 1;
  const m = /(final|fin|inicio|comienzo|principio) del? (?:(tu|su) )?(?:siguiente|pr[oó]ximo) turno(?: del? (?:la |el )?(objetivo|criatura))?/.exec(t);
  if (m) {
    const quien = (m[2] === 'su' || m[3]) && objetivo ? objetivo : autor;
    const hasta = /^(final|fin)$/.test(m[1]) ? finTurno(quien, cb) : inicioTurno(quien, cb);
    return { rondas: Math.max(1, hasta.ronda - ronda), hasta };
  }
  const rondas = rondasDe(t);
  return rondas ? { rondas, hasta: hastaDesde(rondas, ronda, autor) } : null;
}

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
      if (e.conc) delete e.conc[cond];
      if (e.repite) delete e.repite[cond];
      fin.push(`${nombre(k)}: ${cond}`);
    }
  }
  return fin;
}

/** Quita lo que dependía de la concentración `conc` (la de quien dejó de concentrarse); devuelve "Nombre: condición" de cada una. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function quitarConcentracion(estado: Record<string, any>, conc: string, nombre: (k: string) => string = k => k): string[] {
  const fin: string[] = [];
  for (const [k, e] of Object.entries(estado || {})) {
    for (const [cond, c] of Object.entries((e?.conc || {}) as Record<string, string>)) {
      if (c !== conc) continue;
      e.cond = (e.cond || []).filter((x: string) => x !== cond);
      delete e.conc[cond];
      if (e.hasta) delete e.hasta[cond];
      if (e.dur) delete e.dur[cond];
      if (e.repite) delete e.repite[cond];
      fin.push(`${nombre(k)}: ${cond}`);
    }
  }
  return fin;
}

/** Una condición de la que se puede librar repitiendo la salvación al final de cada uno de sus turnos. */
export type Repite = { salv: string; cd: number; de: string; pid?: string };
/** Las salvaciones que repite `k` al terminar su turno (solo de las condiciones que todavía tiene). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function repeticionesDe(e: any): { cond: string; r: Repite }[] {
  return Object.entries((e?.repite || {}) as Record<string, Repite>).filter(([cond]) => (e.cond || []).includes(cond)).map(([cond, r]) => ({ cond, r }));
}
/** Se libra de la condición: se quita con su duración, su concentración y su repetición. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function quitarCondicion(e: any, cond: string) {
  e.cond = (e.cond || []).filter((x: string) => x !== cond);
  for (const campo of ['hasta', 'dur', 'conc', 'repite']) if (e[campo]) delete e[campo][cond];
}
