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

/* ---- Personajes de jugadores unidos con el código de la mesa ----
   Viven en la cuenta del jugador: aquí solo hay la última copia leída del servidor (solo lectura).
   Clave en el combate y en cp.estado: "jm:<jugadorId>:<personajeId>". */
type Unido = { jugadorId: string; jugador: string; personajeId: string; nombre: string; resumen: string | null; datos: any; actualizadoEn: string; calc?: any };
let unidosCamp: string | null = null, unidos = new Map<string, Unido>();
export const claveUnido = (x: { jugadorId: string; personajeId: string }) => `jm:${x.jugadorId}:${x.personajeId}`;
export function fijarUnidos(campId: string, lista: Unido[]) {
  const antes = unidosCamp === campId ? unidos : new Map<string, Unido>();
  unidosCamp = campId;
  // Si la hoja no cambió desde la última lectura se reaprovecha el cálculo
  unidos = new Map(lista.map(x => { const k = claveUnido(x), v = antes.get(k); return [k, v && v.actualizadoEn === x.actualizadoEn ? v : x]; }));
}
export const unidoDe = (k: string) => unidos.get(k) || null;
/** Si ya se leyeron los unidos de esta campaña (antes de eso no se sabe quién está). */
export const unidosCargados = (campId: string) => unidosCamp === campId;
export const unidosDe = (campId: string) => (unidosCamp === campId ? [...unidos.values()] : []);

/** Personaje unido, calculado una vez por versión de su hoja. */
function calcUnido(u: Unido) {
  if (!u.calc) { const pj = reparar(JSON.parse(JSON.stringify(u.datos))); u.calc = { pj, c: compute(pj) }; }
  return u.calc;
}

export function combatiente(k: string, cp: any): any {
  if (k.startsWith('jm:')) {
    const u = unidosCamp === cp.id ? unidos.get(k) : null; if (!u) return null;
    const { pj, c } = calcUnido(u), usado = Math.min(pj.used?.pg || 0, c.hpMax);
    return { k, tipo: 'jug', nombre: pj.nombre || u.nombre, ca: c.ac, pgMax: c.hpMax, pg: c.hpMax - usado, bono: c.init, c, pj, jugador: u.jugador, u };
  }
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
