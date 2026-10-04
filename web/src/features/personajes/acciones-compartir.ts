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

function mostrarAjeno(datos: unknown, jugador: string, volver: Vista, permiteCopiar: boolean) {
  const pj = reparar(JSON.parse(JSON.stringify(datos)));
  S.ajeno = { jugador, pj, c: compute(pj), volver, permiteCopiar };
  S.view = 'ajeno'; S.dialogo = ''; render(); irArriba();
}

/** Administrador: abre en solo lectura la hoja de otra cuenta. */
export async function abrirAjeno(r: RefPersonaje & { jugador: string }, volver: Vista) {
  try {
    const p = await personajeAjeno({ usuarioId: r.usuarioId, id: r.id });
    if (!p) { avisar('Ese personaje ya no existe.', 'error'); return; }
    mostrarAjeno(p.datos, r.jugador, volver, true);
  } catch (e) { avisar(`No se pudo abrir: ${(e as Error).message}`, 'error'); }
}

/** Abre el personaje de un enlace compartido (con o sin cuenta). */
export async function abrirEnlace(token: string) {
  try {
    const p = await personajePorEnlace(token);
    if (!p) { avisar('Ese enlace ya no sirve: su dueño lo desactivó o borró el personaje.', 'error'); return; }
    mostrarAjeno(p.datos, p.jugador, 'home', p.permiteCopiar);
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

/** Guarda una copia independiente (otro id) entre tus personajes y la abre. */
export function copiarAjeno() {
  const a = S.ajeno; if (!a) return;
  const pj = structuredClone(a.pj);
  pj.id = nuevoPj().id;
  salirDelEnlace();
  S.ajeno = null; S.pj = pj; pj.used = pj.used || {};
  savePj();
  abrir(pj.id);
  avisar(`${pj.nombre || 'El personaje'} se copió ${esInvitado() ? 'en este navegador' : 'a tu cuenta'}. Esta copia es tuya: los cambios no tocan el original.`);
}
