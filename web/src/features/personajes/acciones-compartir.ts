/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { S, render, irArriba, esInvitado, type Vista } from '@/app-shell/estado';
import { almacen } from '@/app-shell/almacen';
import { avisar } from '@/shared/ui/avisos';
import { confirmar } from '@/shared/ui/confirmar';
import { nuevoPj, reparar } from './domain/modelo';
import { compute } from './domain/calculo';
import { personajeAjeno, personajePorEnlace, type RefPersonaje } from './api';
import { abrir, savePj } from './acciones';

/** "Ana, Bruno y 3 más": para confirmar sin una lista eterna. */
export function nombrarVarios(nombres: string[], max = 4) {
  const n = nombres.map(x => x || 'Sin nombre');
  if (n.length <= max) return n.length === 1 ? n[0] : `${n.slice(0, -1).join(', ')} y ${n[n.length - 1]}`;
  return `${n.slice(0, max).join(', ')} y ${n.length - max} más`;
}

/** Pide confirmación con los nombres. */
export const confirmarBorrado = (nombres: string[], extra = '') => confirmar({
  titulo: nombres.length === 1 ? `¿Borrar a ${nombres[0] || 'este personaje'}?` : `¿Borrar ${nombres.length} personajes?`,
  si: nombres.length === 1 ? 'Borrar personaje' : `Borrar ${nombres.length} personajes`, peligro: true,
  texto: `Se borra${nombres.length === 1 ? '' : 'n'} ${nombrarVarios(nombres)}${extra}. No se puede deshacer.`,
});

/** Borra varios personajes propios de la lista de inicio. Devuelve si se borraron. */
export async function borrarVarios(ids: string[]) {
  if (!ids.length) return false;
  const nombres = ids.map(id => S.list.find(p => p.id === id)?.name || 'Sin nombre');
  if (!(await confirmarBorrado(nombres))) return false;
  S.list = S.list.filter(p => !ids.includes(p.id));
  if (S.pj && ids.includes(S.pj.id)) { S.pj = null; almacen.ultimo(null); }
  render();
  try { await almacen.borrarVarios(ids); avisar(ids.length === 1 ? 'Personaje borrado.' : `${ids.length} personajes borrados.`); }
  catch (e) { avisar(`No se pudieron borrar en el servidor: ${(e as Error).message}`, 'error'); }
  return true;
}

function mostrarAjeno(datos: unknown, jugador: string, volver: Vista) {
  const pj = reparar(JSON.parse(JSON.stringify(datos)));
  S.ajeno = { jugador, pj, c: compute(pj), volver };
  S.view = 'ajeno'; S.dialogo = ''; render(); irArriba();
}

/** Administrador: abre en solo lectura la hoja de otra cuenta. */
export async function abrirAjeno(r: RefPersonaje & { jugador: string }, volver: Vista) {
  try {
    const p = await personajeAjeno({ usuarioId: r.usuarioId, id: r.id });
    if (!p) { avisar('Ese personaje ya no existe.', 'error'); return; }
    mostrarAjeno(p.datos, r.jugador, volver);
  } catch (e) { avisar(`No se pudo abrir: ${(e as Error).message}`, 'error'); }
}

/** Abre el personaje de un enlace compartido (con o sin cuenta). */
export async function abrirEnlace(token: string) {
  try {
    const p = await personajePorEnlace(token);
    if (!p) { avisar('Ese enlace ya no sirve: su dueño lo desactivó o borró el personaje.', 'error'); return; }
    mostrarAjeno(p.datos, p.jugador, 'home');
  } catch (e) { avisar(`No se pudo abrir el enlace: ${(e as Error).message}`, 'error'); }
}

/** Al salir de un enlace, la dirección vuelve a la de la app (así recargar no reabre el enlace). */
function salirDelEnlace() {
  if (window.location.pathname.startsWith('/p/')) window.history.replaceState(null, '', esInvitado() ? '/invitado' : '/');
}

export function cerrarAjeno() {
  salirDelEnlace();
  S.view = S.ajeno?.volver || 'home'; S.ajeno = null;
  render(); irArriba();
}

/** La hoja que se está viendo y se puede duplicar: la propia abierta, la de un enlace o la de un jugador en la mesa. */
export function hojaParaDuplicar(): any {
  if ((S.view === 'ficha' || S.view === 'editor') && S.pj) return S.pj;
  if (S.view === 'ajeno' && S.ajeno) return S.ajeno.pj;
  if (S.view === 'mesa' && S.hojaMesa) return S.hojaLectura;
  return null;
}

/** Guarda un duplicado independiente (otro id) entre tus personajes y lo abre. Si el original es tuyo, el nombre lleva "(copia)". */
export function duplicarPj(origen: any = hojaParaDuplicar()) {
  if (!origen) return;
  const propio = S.list.some(p => p.id === origen.id);
  const pj = structuredClone(origen);
  pj.id = nuevoPj().id;
  // El duplicado de un personaje de prueba es de verdad: que no lo borre prueba:quitar
  delete pj.prueba; delete pj.pruebaVersion;
  if (propio) pj.nombre = `${pj.nombre || 'Sin nombre'} (copia)`;
  salirDelEnlace();
  S.ajeno = null; S.hojaMesa = null; S.hojaLectura = null; S.pj = pj; pj.used = pj.used || {};
  savePj();
  abrir(pj.id);
  avisar(`${pj.nombre || 'El personaje'} se duplicó ${esInvitado() ? 'en este navegador' : 'en tu cuenta'}. Es independiente: los cambios no tocan el original.`);
}

export const copiarAjeno = () => duplicarPj(S.ajeno?.pj);
