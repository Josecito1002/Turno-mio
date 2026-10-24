import { norm } from '@/shared/utils/texto';

/** Lo que hace una reacción con el daño que te iba a llegar, leído de su texto:
 *  - `ca`: sube tu CA contra ese ataque (un número fijo o unos dados); si así ya no te acierta, no te pasa nada.
 *  - `mitad`: recibes la mitad (reducir a la mitad o tener resistencia a ese daño).
 *  - `reduce`: el daño baja en lo que salga en esos dados. */
export type EfectoReaccion =
  | { tipo: 'ca'; bono: number; dados?: undefined; luegoMitad?: boolean }
  | { tipo: 'ca'; bono?: undefined; dados: string; luegoMitad?: boolean }
  | { tipo: 'mitad' }
  | { tipo: 'reduce'; dados: string };

/** Lo que importa del personaje para leer la reacción: su bonificador de competencia y su modificador de Carisma. */
export type DatosReaccion = { pb: number; car: number };

const A_LA_CA = /(?:a (?:tu|su|la) ca\b|a la clase de armadura)/;
const DADOS = /(\d*d\d+(?:\s*[+-]\s*\d+)*)/;

export function efectoDeReaccion(texto: string, d: DatosReaccion): EfectoReaccion | null {
  const t = norm(texto).replace(/<[^>]+>|\*\*|__/g, '');
  // Después de sumar a la CA, si aun así acierta: resistencia (Guardián, 1d8 a la CA)
  const luegoMitad = /aun asi (?:te )?aciert[^.]*resistencia/.test(t) || undefined;
  // +5 a tu CA (Escudo), +2 a tu CA
  const fijo = /\+(\d+) a (?:tu|su|la) ca\b/.exec(t);
  if (fijo) return { tipo: 'ca', bono: +fijo[1], luegoMitad };
  if (A_LA_CA.test(t)) {
    // Tu bonificador de competencia (Duelista defensivo) o tu modificador de Carisma (mínimo +1)
    if (/\b(?:tu )?(?:pb|bonificador de competencia)\b[^.]*a (?:tu|su|la) ca/.test(t)) return { tipo: 'ca', bono: d.pb, luegoMitad };
    if (/mod(?:ificador)?\.? de (?:car|carisma)\b[^.]*a (?:tu|su|la) ca/.test(t)) return { tipo: 'ca', bono: Math.max(1, d.car), luegoMitad };
    const dados = new RegExp(`${DADOS.source}[^.]*?a (?:tu|su|la) ca\\b`).exec(t);
    if (dados) return { tipo: 'ca', dados: dados[1].replace(/\s+/g, ''), luegoMitad };
  }
  // Reduces el daño en 1d10 + 7 (Desviar ataques)
  const reduce = new RegExp(`reduc\\w* (?:el|ese|su) dano(?: recibido)? en ${DADOS.source}(?![^.]*\\b(?:fue|des|con|int|sab|car|nivel)\\b)`).exec(t);
  if (reduce) return { tipo: 'reduce', dados: reduce[1].replace(/\s+/g, '') };
  // Reduces el daño a la mitad (Esquiva asombrosa) o tienes resistencia a ese daño
  if (/(?:reduc\w* (?:el|ese|su) dano a la mitad|reduc\w* a la mitad (?:el|ese|su) dano|la mitad del dano|resistencia a (?:ese|todo el|ese tipo de) dano|le das resistencia a ese dano)/.test(t)) return { tipo: 'mitad' };
  return null;
}

/** Qué pasa con el ataque y su daño según la reacción, ya con los dados tirados (si los pedía).
 *  `ataque` es el total del d20 del atacante (99 si fue un 20 natural, que acierta siempre); `null` si no se sabe. */
export function resultadoReaccion(e: EfectoReaccion, dano: number, ca: number, ataque: number | null, tirada = 0):
  { falla: boolean; dano: number; caNueva?: number } | null {
  if (e.tipo === 'mitad') return { falla: false, dano: Math.floor(dano / 2) };
  if (e.tipo === 'reduce') return { falla: false, dano: Math.max(0, dano - Math.max(0, tirada)) };
  const caNueva = ca + (e.bono ?? tirada);
  if (ataque == null) return null;
  if (ataque < caNueva) return { falla: true, dano: 0, caNueva };
  return { falla: false, dano: e.luegoMitad ? Math.floor(dano / 2) : dano, caNueva };
}
