'use client';
import { S, render, irArriba, type Vista } from '@/app-shell/estado';
import { almacen } from '@/app-shell/almacen';
import { avisar } from '@/shared/ui/avisos';
import { confirmar } from '@/shared/ui/confirmar';
import { reparar } from './domain/modelo';
import { compute } from './domain/calculo';
import { copiarPersonaje, personajeAjeno, type RefPersonaje } from './api';
import { abrir } from './acciones';

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

/** Abre en solo lectura la hoja de otra cuenta (compartida contigo, o vista por un administrador). */
export async function abrirAjeno(r: RefPersonaje & { jugador: string }, volver: Vista) {
  try {
    const p = await personajeAjeno({ usuarioId: r.usuarioId, id: r.id });
    if (!p) { avisar('Ese personaje ya no existe.', 'error'); return; }
    const pj = reparar(JSON.parse(JSON.stringify(p.datos)));
    S.ajeno = { usuarioId: r.usuarioId, id: r.id, jugador: r.jugador, pj, c: compute(pj), volver };
    S.view = 'ajeno'; S.dialogo = ''; render(); irArriba();
  } catch (e) { avisar(`No se pudo abrir: ${(e as Error).message}`, 'error'); }
}

export function cerrarAjeno() {
  S.view = S.ajeno?.volver || 'home'; S.ajeno = null;
  render(); irArriba();
}

/** Crea en tu cuenta una copia independiente y la abre. */
export async function copiarAjeno(r: RefPersonaje) {
  try {
    const p = await copiarPersonaje({ usuarioId: r.usuarioId, id: r.id });
    almacen.agregarGuardado(p);
    S.list = [...S.list, { id: p.id, name: p.nombre, sub: p.resumen || '' }];
    S.ajeno = null;
    abrir(p.id);
    avisar(`${p.nombre} se copió a tu cuenta. Esta copia es tuya: los cambios no tocan el original.`);
    return true;
  } catch (e) { avisar(`No se pudo copiar: ${(e as Error).message}`, 'error'); return false; }
}

