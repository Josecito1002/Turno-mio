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

/** Actualiza en caliente los PG de un jugador unido al recibir un evento de WebSocket/SSE. */
export function actualizarPgUnido(campId: string, info: {
  jugadorId: string;
  personajeId: string;
  pgUsados?: number;
  pgTemp?: number;
  muerteExitos?: number;
  muerteFallos?: number;
  actualizadoEn?: string;
}) {
  if (unidosCamp !== campId) return;
  const k = claveUnido(info);
  const u = unidos.get(k);
  if (!u) return;

  u.datos = u.datos || {};
  u.datos.used = u.datos.used || {};
  if (info.pgUsados != null) u.datos.used.pg = info.pgUsados;
  if (info.pgTemp != null) u.datos.pgTemp = info.pgTemp;
  if (info.muerteExitos != null) u.datos.used['muerte-exitos'] = info.muerteExitos;
  if (info.muerteFallos != null) u.datos.used['muerte-fallos'] = info.muerteFallos;
  if (info.actualizadoEn) u.actualizadoEn = info.actualizadoEn;

  if (u.calc?.pj) {
    u.calc.pj.used = u.calc.pj.used || {};
    if (info.pgUsados != null) u.calc.pj.used.pg = info.pgUsados;
    if (info.pgTemp != null) u.calc.pj.pgTemp = info.pgTemp;
    if (info.muerteExitos != null) u.calc.pj.used['muerte-exitos'] = info.muerteExitos;
    if (info.muerteFallos != null) u.calc.pj.used['muerte-fallos'] = info.muerteFallos;
  } else {
    delete u.calc;
  }
}

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
  // Un compañero que actúa en el turno de su dueño toma su iniciativa y va justo después de él
  const de = (o: any) => (o.con ? cp.combate.orden.find((x: any) => x.k === o.con) : null) || o;
  cp.combate.orden.forEach((o: any) => { if (o.con && de(o) !== o) o.init = de(o).init; });
  cp.combate.orden.sort((a: any, b: any) => b.init - a.init || de(b).bono - de(a).bono || (de(a).k < de(b).k ? -1 : de(a).k > de(b).k ? 1 : 0) || (a.con ? 1 : 0) - (b.con ? 1 : 0));
  const i = cp.combate.orden.findIndex((o: any) => o.k === cur); cp.combate.turno = i >= 0 ? i : 0;
}

/** Las bestias, mascotas y criaturas del personaje `k` entran solas al combate: las que actúan en su turno (compañeros de
    clase, criaturas invocadas) toman su iniciativa y van justo después; el familiar tira la suya. Se crean como aliados. */
export function sumarCompaneros(cp: any, k: string, tirar: (n: number) => number) {
  const x = combatiente(k, cp); if (!x?.c?.criaturas?.length) return;
  const dueno = cp.combate.orden.find((o: any) => o.k === k);
  for (const cr of x.c.criaturas) {
    if (cr.pg <= 0) continue;
    const id = `al-${k.replace(/[^a-z0-9]/gi, '')}-${cr.id}`;
    if (!(cp.monstruos || []).some((m: any) => m.id === id)) cp.monstruos.push({ id, nombre: `${cr.nombre} (de ${x.nombre})`, ca: cr.ca, pgMax: cr.pgMax, pg: cr.pg, bono: 0, aliado: true });
    if (cp.combate.orden.some((o: any) => o.k === 'm:' + id)) continue;
    const propia = cr.de === 'familiar', bono = propia ? Math.floor(((cr.ab?.des ?? 10) - 10) / 2) : 0;
    const m = cp.monstruos.find((y: any) => y.id === id); m.bono = bono;
    cp.combate.orden.push(propia || !dueno ? { k: 'm:' + id, init: tirar(20) + bono, bono } : { k: 'm:' + id, init: dueno.init, bono: dueno.bono, con: k });
  }
}
