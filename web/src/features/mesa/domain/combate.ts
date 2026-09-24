/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { S } from '@/app-shell/estado';
import { almacen } from '@/app-shell/almacen';
import { reparar, resumen } from '@/features/personajes/domain/modelo';
import { compute } from '@/features/personajes/domain/calculo';

export const CONDICIONES = ['Agarrado', 'Apresado', 'Asustado', 'Aturdido', 'Cegado', 'Derribado', 'Ensordecido', 'Envenenado', 'Hechizado', 'Incapacitado', 'Inconsciente', 'Invisible', 'Paralizado', 'Petrificado', 'Agotamiento', 'Concentrado'];

export const camps = (): any[] => almacen.campanas() || [];
export const campActual = () => camps().find(x => x.id === S.camp) || null;
export const guardarCamp = (cp: any) => almacen.guardarCampana(cp);
export function cargarPj(id: string) { const p = almacen.pj(id); return p ? reparar(p) : null; }

export function combatiente(k: string, cp: any): any {
  if (k.startsWith('pj:')) {
    const pj = cargarPj(k.slice(3)); if (!pj) return null;
    const c = compute(pj), usado = Math.min(pj.used?.pg || 0, c.hpMax);
    return { k, tipo: 'pj', nombre: pj.nombre || 'Sin nombre', ca: c.ac, pgMax: c.hpMax, pg: c.hpMax - usado, bono: c.init, c, pj };
  }
  const m = (cp.monstruos || []).find((x: any) => x.id === k.slice(2));
  return m ? { k, tipo: 'm', nombre: m.nombre, ca: m.ca, pgMax: m.pgMax, pg: m.pg, bono: m.bono, m } : null;
}

export function cambiarPg(cp: any, k: string, delta: number) {
  if (k.startsWith('pj:')) {
    const pj = cargarPj(k.slice(3)); if (!pj) return;
    const c = compute(pj); pj.used = pj.used || {};
    pj.used.pg = Math.min(c.hpMax, Math.max(0, (pj.used.pg || 0) - delta));
    almacen.guardarPj(pj, resumen(pj));
    if (S.pj?.id === pj.id) S.pj.used.pg = pj.used.pg;
    if (c.hpMax - pj.used.pg > 0) { const e = cp.estado?.[k]; if (e) e.muerte = { e: 0, f: 0 }; }
  } else {
    const m = cp.monstruos.find((x: any) => x.id === k.slice(2)); if (m) m.pg = Math.min(m.pgMax, Math.max(0, m.pg + delta));
  }
}

export const estadoDe = (cp: any, k: string) => { cp.estado = cp.estado || {}; return (cp.estado[k] = cp.estado[k] || { cond: [], muerte: { e: 0, f: 0 } }); };

export function ordenar(cp: any) {
  const cur = cp.combate.orden[cp.combate.turno]?.k;
  cp.combate.orden.sort((a: any, b: any) => b.init - a.init || b.bono - a.bono);
  const i = cp.combate.orden.findIndex((o: any) => o.k === cur); cp.combate.turno = i >= 0 ? i : 0;
}
