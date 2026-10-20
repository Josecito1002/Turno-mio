/* eslint-disable @typescript-eslint/no-explicit-any */
import { compute } from './calculo';
import { reparar } from './modelo';

export type Vitales = { pg: number; pgMax: number; temp: number; ca: number };

/** PG (actuales, máximos y temporales) y CA de un personaje guardado, para su tarjeta en la lista. Null si no tiene clase o no se puede calcular. */
export function vitalesDe(datos: any): Vitales | null {
  if (!datos?.clase) return null;
  try {
    const c = compute(reparar(datos));
    const max = c.recursos?.find((r: any) => r.id === 'pg')?.max ?? c.hpMax;
    return { pg: max - Math.min(c.pj.used?.pg || 0, max), pgMax: max, temp: Math.max(0, +c.pj.pgTemp || 0), ca: c.ac };
  } catch { return null; }
}
