/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { S, render, esAdmin, irArriba } from './estado';
import { guardarLib } from './almacen';
import { avisar } from '@/shared/ui/avisos';
import { mezclarContenido, limpiarBestias } from '@/features/biblioteca/domain/biblioteca';
import { aprenderBuilder, aprenderPaquete } from '@/features/biblioteca/domain/aprender-builder';
import { convertBuilder } from '@/features/personajes/domain/importar-personaje';
import { reparar } from '@/features/personajes/domain/modelo';
import { savePj } from '@/features/personajes/acciones';
import { camps, guardarCamp } from '@/features/mesa/domain/combate';

function resumenNuevo(lista: string[]) {
  if (!lista.length) return '';
  const cuenta: Record<string, number> = {};
  lista.forEach(s => { const t = s.split(' ')[0]; cuenta[t] = (cuenta[t] || 0) + 1; });
  const pl: Record<string, string> = { clase: 'clases', subclase: 'subclases', especie: 'especies', trasfondo: 'trasfondos', dote: 'dotes', conjuro: 'conjuros', imagen: 'imágenes' };
  return ' A la biblioteca: ' + Object.entries(cuenta).map(([t, n]) => `${n} ${n > 1 ? pl[t] : t}`).join(', ') + '.';
}

function importar(text: string, archivo: string): { error?: boolean; lib?: boolean; pj?: any; nuevo?: string[] } {
  let d: any;
  try { d = JSON.parse(text); } catch { return { error: true }; }
  if (d && d.tipo === 'miturno-biblioteca') {
    const n = mezclarContenido(d), fuera = limpiarBestias();
    guardarLib(esAdmin());
    return { lib: true, nuevo: n.filter(s => !fuera.includes(s.replace(/^especie /, ''))) };
  }
  let pj: any, nuevo: string[] = [];
  if (!(d && (d.v === 2 || d.stats))) { const n = aprenderPaquete(d, archivo); if (n) { guardarLib(esAdmin()); return { lib: true, nuevo: n }; } }
  if (d && d.v === 2 && d.gen) { nuevo = mezclarContenido(d.contenido); pj = reparar(d); }
  else if (d && d.stats && (d.classes || d.class)) { nuevo = aprenderBuilder(d); pj = convertBuilder(d); }
  else return { error: true };
  guardarLib(esAdmin());
  S.pj = pj; pj.used = pj.used || {}; savePj();
  return { pj, nuevo };
}

/** Lee varios JSON: personajes (Mi turno o D&D Builder), bibliotecas o paquetes de datos. */
export async function leerArchivos(files: FileList | File[] | null | undefined) {
  const lista = [...(files || [])]; if (!lista.length) return;
  const nuevo: string[] = [], pjs: any[] = [];
  let errores = 0, libs = 0;
  for (const f of lista) {
    const text = await f.text().catch(() => null);
    const r = text == null ? { error: true } as const : importar(text, f.name);
    if (r?.error) errores++;
    else { nuevo.push(...(r.nuevo || [])); if (r.pj) pjs.push(r.pj); if (r.lib) libs++; }
  }
  if (S.importCamp && pjs.length) {
    const cp = camps().find(x => x.id === S.importCamp);
    if (cp) { pjs.forEach(p => { if (!cp.pjs.includes(p.id)) cp.pjs.push(p.id); }); guardarCamp(cp); }
    S.camp = S.importCamp; S.view = 'mesa'; S.mtab = 'grupo'; S.pj = pjs[pjs.length - 1];
  } else if (pjs.length) { S.pj = pjs[pjs.length - 1]; S.view = pjs.length === 1 ? 'ficha' : 'home'; S.tab = 'turno'; }
  else if (libs) S.view = 'lib';
  S.importCamp = null;
  render(); irArriba();
  const partes: string[] = [];
  if (pjs.length) partes.push(pjs.length === 1 ? `${pjs[0].nombre || 'Personaje'} importado.` : `${pjs.length} personajes importados.`);
  if (libs && !pjs.length) partes.push(nuevo.length ? 'Biblioteca actualizada.' : 'Esa biblioteca no trae nada nuevo.');
  if (nuevo.length) partes.push(resumenNuevo(nuevo).trim());
  if (errores) partes.push(`${errores} archivo${errores > 1 ? 's' : ''} no ${errores > 1 ? 'son' : 'es'} de personajes ni de contenido (armas, bestiario y similares se ignoran).`);
  avisar(partes.join(' '), errores && !pjs.length && !libs ? 'error' : 'exito');
}
