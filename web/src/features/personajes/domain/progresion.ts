/* eslint-disable @typescript-eslint/no-explicit-any */
/* Progresión en campaña: el DM da experiencia o hitos desde su mesa; con eso, el personaje «puede subir de nivel». */

/** Experiencia total para llegar a cada nivel (Manual del Jugador 2024): XP_NIVEL[n] es lo que pide el nivel n + 1. */
export const XP_NIVEL = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000];

/** XP que pide el siguiente nivel (null en el 20). */
export const xpSiguiente = (nivel: number): number | null => (nivel >= 1 && nivel < 20 ? XP_NIVEL[nivel] : null);

/** Solo en una hoja de campaña (el DM le dio XP o hitos): ¿ya le alcanza para subir? */
export function puedeSubir(pj: any): boolean {
  if (!pj || !(+pj.nivel < 20)) return false;
  if ((+pj.nivelesDados || 0) > 0) return true;
  const sig = xpSiguiente(+pj.nivel || 1);
  return !!pj.enCampana && pj.xp != null && sig != null && +pj.xp >= sig;
}
