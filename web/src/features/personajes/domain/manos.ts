/* eslint-disable @typescript-eslint/no-explicit-any */
import { norm } from '@/shared/utils/texto';
import { ARMAS } from '@/features/reglas/data/equipo';

/** Qué lleva el personaje en cada mano: `a` la principal y `b` la otra (arma; el escudo se guarda en pj.escudo).
 *  Un arma a dos manos deja la otra libre; en la otra mano solo va un arma ligera (o cualquiera que no sea
 *  a dos manos con la dote Portador Dual). Si nunca se eligió, empuña la primera arma cuerpo a cuerpo. */
export const aDosManos = (k: string) => !!ARMAS[k]?.p.includes('dos manos');
export const portadorDual = (pj: any) => (pj.dotesExtra || []).concat(Object.values(pj.mejoras || {})).some((d: any) => /portador.dual/.test(norm(d?.nombre || d?.key || '')));

export function puedeIrEnLaOtra(pj: any, k: string, a: string) {
  const w = ARMAS[k]; if (!w || aDosManos(k) || (a && aDosManos(a))) return false;
  const q = (pj.armas || []).find(([x]: any) => x === k)?.[1] || 0;
  if (k === a && q < 2) return false;
  return w.p.includes('ligera') || portadorDual(pj);
}

export function manosDe(pj: any): { a: string; b: string } {
  const tiene = (k: string) => !!k && !!ARMAS[k] && (pj.armas || []).some(([x]: any) => x === k);
  if (!pj.manos) {
    const ks = (pj.armas || []).map(([k]: any) => k).filter((k: string) => ARMAS[k]);
    return { a: ks.find((k: string) => !ARMAS[k].dist) || ks[0] || '', b: '' };
  }
  const a = tiene(pj.manos.a) ? pj.manos.a : '';
  const b = tiene(pj.manos.b) && puedeIrEnLaOtra(pj, pj.manos.b, a) ? pj.manos.b : '';
  return { a, b };
}
