/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useSyncExternalStore } from 'react';

export const nuevoDraft = () => ({ id: Date.now(), abierto: '', esp: { n: '', vel: 30, vision: 0, rasgos: [] as any[] }, sub: { clase: '', n: '', rasgos: [] as any[] } });

export type Usuario = { id: string; email: string; nombre: string; rol: string; ultimoPj: string | null };
export type Vista = 'home' | 'ficha' | 'editor' | 'lib' | 'mesa' | 'cuentas';

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
  sel: null as number | null,
  draft: nuevoDraft(),
  subida: null as any,
  crop: null as any,
  spTodos: false,
  spOpen: {} as Record<string, boolean>,
  camp: null as string | null,
  mtab: 'grupo',
  importCamp: null as string | null,
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
export const irArriba = () => window.scrollTo(0, 0);
