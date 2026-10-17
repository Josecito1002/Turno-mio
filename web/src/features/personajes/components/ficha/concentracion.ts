/* eslint-disable @typescript-eslint/no-explicit-any */
import { S } from '@/app-shell/estado';
import { avisar } from '@/shared/ui/avisos';
import { terminarConcentracionMesa } from '@/features/mesa/api';
import type { Hasta } from '@/features/mesa/domain/duracion';
import { setVal } from '../../acciones';

/* La concentración del personaje: un solo conjuro a la vez. Lo que ese conjuro dejó en otros (Bendición en tres
   aliados, Inmovilizar persona en un enemigo) lleva su id y se acaba en todas las pantallas cuando se pierde. */
type Mesa = { dmId: string; campanaId: string; personajeId: string };
export type Concentracion = { id: string; nombre: string; rondas?: number; hasta?: Hasta };

/** Condiciones que dejan Incapacitado, y con eso se pierde la concentración. */
export const INCAPACITANTES = ['Incapacitado', 'Aturdido', 'Paralizado', 'Petrificado', 'Inconsciente'];
/** CD de la salvación de Constitución para mantenerla al recibir daño: 10 o la mitad del daño, la mayor (máximo 30). */
export const cdConcentracion = (dano: number) => Math.min(30, Math.max(10, Math.floor(dano / 2)));

export const concentracionActual = (): Concentracion | null => S.pj?.concentracion || null;

/** Empieza a concentrarse en `nombre` y devuelve el id que llevan sus efectos. */
export function empezarConcentracion(mesa: Mesa, nombre: string, dura?: { rondas: number; hasta?: Hasta } | null): string {
  const id = `${mesa.personajeId}-${Date.now().toString(36)}`;
  setVal('concentracion', { id, nombre, ...(dura ? { rondas: dura.rondas, ...(dura.hasta ? { hasta: dura.hasta } : {}) } : {}) });
  return id;
}

/** Quita de esta hoja los efectos que dependían de esa concentración; devuelve sus nombres. */
export function quitarEfectosDe(conc: string): string[] {
  const ef: any[] = S.pj?.efectos || [], fuera = ef.filter(e => e.conc === conc);
  if (fuera.length) setVal('efectos', ef.filter(e => e.conc !== conc));
  return fuera.map(e => e.nombre);
}

/** Deja de concentrarse: se acaba lo que dependía de eso en esta hoja y en las de los demás (y en la mesa del DM). */
export async function terminarConcentracion(mesa: Mesa | null, motivo: string) {
  const x = concentracionActual(); if (!x) return;
  setVal('concentracion', null);
  quitarEfectosDe(x.id);
  avisar(`Dejas de concentrarte en ${x.nombre}${motivo ? ` (${motivo})` : ''}.`);
  if (!mesa) return;
  try { await terminarConcentracionMesa(mesa, x.id, x.nombre); }
  catch (e) { avisar(`Tu DM no se enteró de que dejaste ${x.nombre}: ${(e as Error).message}. Díselo en voz alta.`, 'error'); }
}

/** Ventaja en la salvación para mantenerla (Mente Sobrenatural, Lanzador de guerra), con el nombre de lo que la da. */
export function ventajaConcentracion(c: any): string {
  const txt = (x: any) => String(typeof x === 'function' ? (() => { try { return x(c); } catch { return ''; } })() : x || '');
  const e = (c?.entries || []).find((e: any) => /ventaja[^.]*(?:mantener|conservar) (?:la |tu )?concentraci/i.test(txt(e.texto)));
  return e?.nombre || '';
}
