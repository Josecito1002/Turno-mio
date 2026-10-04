/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useSyncExternalStore } from 'react';

export const nuevoDraft = () => ({ id: Date.now(), abierto: '', esp: { n: '', vel: 30, vision: 0, rasgos: [] as any[] }, sub: { clase: '', n: '', rasgos: [] as any[] } });

export type Usuario = { id: string; email: string; nombre: string; rol: string; ultimoPj: string | null };
export type Vista = 'home' | 'ficha' | 'editor' | 'lib' | 'mesa' | 'cuentas' | 'ajeno';

/* Estado de la interfaz, igual que el objeto S de la versión original.
   Se muta directamente y después se llama a render(). */
export const S = {
  cargando: true as boolean,
  error: '' as string,
  usuario: null as Usuario | null,
  list: [] as { id: string; name: string; sub: string }[],
  pj: null as any,
  c: null as any,
  view: 'home' as Vista,
  step: 'especie',
  tab: 'turno',
  /** Diálogo de la ficha abierto desde el menú de la barra superior ('equipo' | 'revisar' | ''). */
  dialogo: '' as string,
  sel: null as number | null,
  draft: nuevoDraft(),
  subida: null as any,
  crop: null as any,
  spTodos: false,
  spOpen: {} as Record<string, boolean>,
  camp: null as string | null,
  /** Mesa del DM: la hoja de jugador que se está mirando (clave jm:...), o null. */
  hojaMesa: null as string | null,
  mtab: 'grupo',
  /** Mesa del DM: el monstruo abierto en el bestiario (su clave), o null. */
  monstruoSel: null as string | null,
  importCamp: null as string | null,
  /** Hoja de otra cuenta abierta en solo lectura (por un enlace, o vista por un administrador), y adónde volver. */
  ajeno: null as null | { jugador: string; pj: any; c: any; volver: Vista },
};

let version = 0;
const oyentes = new Set<() => void>();
export function render() { version++; oyentes.forEach(f => f()); }
const suscribir = (f: () => void) => { oyentes.add(f); return () => { oyentes.delete(f); }; };
/** La raíz de la app se vuelve a dibujar cada vez que alguien llama a render(). */
export const useRender = () => useSyncExternalStore(suscribir, () => version, () => version);

/* Roles: jugador < dm < admin. El servidor vuelve a comprobarlos en cada operación. */
export const puedeUsarMesa = (rol?: string | null) => rol === 'dm' || rol === 'admin';
export const esAdmin = () => S.usuario?.rol === 'admin';
export const esDM = () => puedeUsarMesa(S.usuario?.rol);
/** Sin cuenta: los personajes se guardan solo en este navegador. */
export const esInvitado = () => S.usuario?.rol === 'invitado';
export const irArriba = () => window.scrollTo(0, 0);
