/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { S, render, esAdmin, irArriba } from '@/app-shell/estado';
import { almacen, guardarLib } from '@/app-shell/almacen';
import { avisar } from '@/shared/ui/avisos';
import { norm, setPath } from '@/shared/utils/texto';
import { TIPOS } from '@/features/reglas/data/caracteristicas';
import { getC, getLib } from '@/features/biblioteca/domain/biblioteca';
import type { OpcionesTirada, Resultado } from '@/features/dados/domain/dados';
import { nuevoPj, reparar, resumen, asegurarTiradas } from './domain/modelo';
import { compute, puedeLanzar } from './domain/calculo';
import { snapshot } from './domain/importar-personaje';

export type Tirar = (expr: string, label: string, o?: OpcionesTirada) => Promise<Resultado>;

export function savePj() {
  if (!S.pj) return;
  snapshot(S.pj);
  const sub = resumen(S.pj);
  almacen.guardarPj(S.pj, sub);
  const e = S.list.find(p => p.id === S.pj.id), info = { id: S.pj.id, name: S.pj.nombre || 'Sin nombre', sub };
  if (e) Object.assign(e, info); else S.list.push(info);
  almacen.ultimo(S.pj.id);
}

export function abrir(id: string, view: 'ficha' | 'editor' = 'ficha') {
  const p = almacen.pj(id); if (!p) return;
  S.pj = reparar(p); S.view = view; S.tab = 'turno'; S.sel = null;
  almacen.ultimo(id);
  render(); irArriba();
}

export function nuevo() { S.pj = nuevoPj(); savePj(); S.view = 'editor'; S.step = 'especie'; render(); irArriba(); }

export function setVal(path: string, v: any) {
  const pj = S.pj;
  setPath(pj, path, v);
  if (path === 'nivel') pj.nivel = +v;
  if (/^mejoras\.\d+\.modo$/.test(path)) { const L = path.split('.')[1]; pj.mejoras[L] = { modo: v }; }
  if (path === 'trasfondo.a' && pj.trasfondo.b === v) pj.trasfondo.b = '';
  if (/^pgTiradas\.\d+$/.test(path)) {
    asegurarTiradas(pj);
    const i = +path.split('.')[1], die = getC(pj, pj.clase)?.dado || 8;
    pj.pgTiradas[i] = v ? Math.min(die, Math.max(1, Math.round(v))) : null;
  }
  savePj(); render();
}

/* ---- Recursos ---- */
export function tocarPip(id: string, i: number, max: number) {
  const pj = S.pj, used = Math.min(pj.used[id] || 0, max), left = max - used;
  pj.used[id] = i < left ? used + 1 : Math.max(0, used - 1);
  savePj(); render();
}
export function moverPool(id: string, d: number) {
  const pj = S.pj, r = S.c.recursos.find((r: any) => r.id === id);
  const used = Math.min(pj.used[r.id] || 0, r.max);
  pj.used[r.id] = Math.min(r.max, Math.max(0, used - d));
  savePj(); render();
}
export function fijarPool(id: string, max: number, valor: string) {
  const v = Math.min(max, Math.max(0, parseInt(valor) || 0));
  S.pj.used[id] = max - v; savePj(); render();
}
export function descansar(tipo: 'corto' | 'largo') {
  const pj = S.pj, largo = tipo === 'largo';
  S.c.recursos.forEach((r: any) => {
    if (largo || r.reset === 'corto') pj.used[r.id] = 0;
    else if (r.reset === 'corto1') pj.used[r.id] = Math.max(0, (pj.used[r.id] || 0) - 1);
  });
  savePj(); render();
  avisar(largo ? 'Descanso largo: todo recuperado.' : 'Descanso corto aplicado.');
}

/** Cambia en qué tipo de acción aparece un rasgo. El administrador lo cambia para todos. */
export function moverRasgo(k: string, t: string) {
  const pj = S.pj, global = esAdmin(), LIB = getLib();
  const dest = global ? (LIB.tipos = LIB.tipos || {}) : (pj.tipos = pj.tipos || {});
  if (t) dest[k] = t; else { delete dest[k]; if (pj.tipos) delete pj.tipos[k]; }
  if (global) guardarLib(true);
  savePj(); render();
  avisar(t ? `Movido a ${TIPOS[t][0]}${global ? ' para todos los personajes' : ''}.` : 'Restaurado.');
}

/* ---- Niveles ---- */
export function abrirSubida() { if (S.pj.nivel < 20) { S.subida = { id: S.pj.id, fase: 'elegir' }; render(); } }
export function confirmarSubida() {
  const pj = S.pj, antes = compute(pj), L = pj.nivel + 1;
  pj.nivel = L; if (pj.pgModo === 'tiradas') pj.pgTiradas[L - 2] = null;
  const desp = compute(pj), vistos = new Set(antes.entries.map((e: any) => e.nombre + '|' + e.texto));
  S.subida = {
    id: pj.id, fase: 'hecho', nivel: L, hpAntes: antes.hpMax, pbAntes: antes.pb,
    nuevos: desp.entries.filter((e: any) => e.grupo !== 'reglas' && !vistos.has(e.nombre + '|' + e.texto)).map((e: any) => ({ nombre: e.nombre, grupo: e.grupo, src: e.src, texto: e.texto, t: e.t })),
  };
  savePj(); S.view = 'ficha'; S.tab = 'turno'; render(); irArriba();
}
export function pgPromedio() {
  const pj = S.pj, i = pj.nivel - 2;
  if (pj.pgModo === 'maximo') asegurarTiradas(pj);
  if (pj.pgModo === 'tiradas') pj.pgTiradas[i] = null;
  savePj(); render();
}
export function deshacerSubida() {
  const pj = S.pj;
  if (pj.nivel > 1) { pj.nivel--; S.subida = null; savePj(); render(); avisar(`Volvió a nivel ${pj.nivel}.`, 'info'); }
}
export function cerrarSubida() { S.subida = null; render(); }
export function bajarNivel() {
  const pj = S.pj;
  if (pj.nivel > 1 && confirm(`¿Bajar a ${pj.nombre || 'este personaje'} a nivel ${pj.nivel - 1}? Se quita la tirada de PG de este nivel; lo que elegiste en niveles altos se guarda por si vuelve a subir.`)) {
    pj.pgTiradas[pj.nivel - 2] = null; pj.nivel--; S.subida = null; savePj(); render(); avisar(`Ahora es nivel ${pj.nivel}.`, 'info');
  }
}
export function tirarPg(tirar: Tirar, i: number) {
  const pj = S.pj;
  asegurarTiradas(pj);
  tirar(`1d${S.c.die}`, `PG del nivel ${i + 2}`, { neutral: true, noRepeat: true }).then(r => { pj.pgTiradas[i] = r.total; savePj(); render(); });
}
export function irAPaso(paso: string) { S.subida = null; S.view = 'editor'; S.step = paso; render(); irArriba(); }

/* ---- Conjuros y rasgos ---- */
export function confirmarNoLanzador() {
  if (puedeLanzar(S.c)) return true;
  return confirm(`${S.pj.nombre || 'Tu personaje'} no lanza conjuros por su clase ni por su especie. Agrégalo solo si se lo dio una dote, un objeto o tu DM. ¿Agregarlo de todas formas?`);
}
export function leerRasgo(p: string) {
  const v = (id: string) => (document.getElementById(p + id) as HTMLInputElement | null)?.value || '';
  const n = v('N').trim(); if (!n) { avisar('Ponle nombre al rasgo.', 'aviso'); return null; }
  const u = v('U');
  return { nombre: n, t: v('T'), manual: true, n: +v('Nv') || 1, usos: u === 'pb' ? 'pb' : +u, reset: v('R'), texto: v('X') };
}

/* ---- Archivo ---- */
export function bajarArchivo(nombre: string, texto: string) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([texto], { type: 'application/json' }));
  a.download = nombre; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}
export function borrarPj() {
  const pj = S.pj;
  if (!confirm(`¿Quitar a ${pj.nombre || 'este personaje'} de tu cuenta?`)) return;
  almacen.borrarPj(pj.id); S.list = S.list.filter(p => p.id !== pj.id); almacen.ultimo(null);
  S.pj = null; S.view = 'home'; render();
}

export const claveRasgo = (nombre: string) => norm(nombre);
