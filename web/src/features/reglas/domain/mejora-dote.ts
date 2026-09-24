/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * El +1 a una característica que dan casi todas las dotes generales y épicas de 2024.
 * Se lee del texto de la dote: "Sumas +1 a Fuerza o Destreza.", "Sumas +1 a una característica (máx 30)."
 */
import { norm } from '@/shared/utils/texto';
import { ALL_AB } from '../data/caracteristicas';

const NOMBRES: Record<string, string> = {
  fuerza: 'fue', destreza: 'des', constitucion: 'con', inteligencia: 'int', sabiduria: 'sab', carisma: 'car',
  fue: 'fue', des: 'des', con: 'con', int: 'int', sab: 'sab', car: 'car',
};

export type MejoraDote = { opciones: string[]; max: number };

/** Características a las que la dote puede sumar +1 (y su máximo), o null si no da ninguna. */
export function mejoraDeDote(D: any): MejoraDote | null {
  if (!D || typeof D.texto !== 'string') return null;
  const original = D.texto.split(/(?<=\.)\s+/).find((f: string) => /\+\s?1\b/.test(f) && !/2 puntos|dos en 1/i.test(f));
  if (!original) return null;
  const frase = norm(original), max = /max\.? ?30/.test(frase) ? 30 : 20;
  if (/una caracteristica|\+1 caracteristica/.test(frase)) return { opciones: [...ALL_AB], max };
  // Nombres completos en cualquier forma; abreviaturas solo en mayúsculas ("con" también es una preposición)
  const nombres = [...(frase.match(/\b(fuerza|destreza|constitucion|inteligencia|sabiduria|carisma)\b/g) || []), ...(original.match(/\b(FUE|DES|CON|INT|SAB|CAR)\b/g) || []).map((a: string) => a.toLowerCase())];
  const opciones = [...new Set(nombres.map(n => NOMBRES[n]))];
  return opciones.length ? { opciones, max } : null;
}
