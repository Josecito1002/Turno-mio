/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { gql } from '@/shared/graphql/cliente';
import { avisar } from '@/shared/ui/avisos';
import { getLib, setLib, limpiarBestias } from '@/features/biblioteca/domain/biblioteca';
import { filasALib } from '@/features/biblioteca/domain/mapeo';
import { QUERY_BIBLIOTECA, aportarBiblioteca, guardarBiblioteca, type RespuestaBiblioteca } from '@/features/biblioteca/api';
import { QUERY_PERSONAJES, borrarPersonaje, guardarPersonaje, marcarUltimo, type PersonajeServidor } from '@/features/personajes/api';
import { QUERY_CAMPANAS, borrarCampana, guardarCampana, type CampanaServidor } from '@/features/mesa/api';
import { puedeUsarMesa, type Usuario } from './estado';

/*
 * Reemplaza a localStorage. Todo se carga una vez al entrar y queda en memoria, así la app
 * sigue leyendo de forma síncrona como antes (la mesa del DM abre varias hojas a la vez).
 * Cada escritura se manda al servidor en segundo plano, agrupando los cambios seguidos.
 */
const copia = <T,>(x: T): T => (x == null ? x : JSON.parse(JSON.stringify(x)));
const mem = { pjs: new Map<string, any>(), campanas: [] as any[] };

type Pendiente = { t: ReturnType<typeof setTimeout>; enviar: (keepalive: boolean) => Promise<unknown> };
const pendientes = new Map<string, Pendiente>();
let fallos = 0;
function programar(clave: string, enviar: Pendiente['enviar'], ms = 700) {
  const p = pendientes.get(clave);
  if (p) clearTimeout(p.t);
  pendientes.set(clave, { enviar, t: setTimeout(() => ejecutar(clave, false), ms) });
}
function ejecutar(clave: string, keepalive: boolean) {
  const p = pendientes.get(clave); if (!p) return;
  clearTimeout(p.t); pendientes.delete(clave);
  p.enviar(keepalive).then(() => { fallos = 0; }).catch((e: Error) => {
    if (fallos++ === 0) avisar(`No se pudo guardar en el servidor: ${e.message}`, 'error');
  });
}
/** Envía ya todo lo pendiente (al cerrar u ocultar la pestaña). */
export function vaciarPendientes() { [...pendientes.keys()].forEach(k => ejecutar(k, true)); }

export type Carga = { usuario: Usuario | null; lista: { id: string; name: string; sub: string }[] };

export async function cargarTodo(): Promise<Carga> {
  const d = await gql<RespuestaBiblioteca & { yo: Usuario | null; personajes: PersonajeServidor[] }>(
    `{ yo { id email nombre rol ultimoPj } ${QUERY_BIBLIOTECA} ${QUERY_PERSONAJES} }`);
  setLib(filasALib(d.biblioteca));
  if (limpiarBestias().length && d.yo?.rol === 'admin') guardarLib(true);
  mem.pjs = new Map(d.personajes.map(p => [p.id, p.datos]));
  // Las campañas solo existen para DM y administradores (el servidor rechaza a los demás).
  mem.campanas = d.yo && puedeUsarMesa(d.yo.rol)
    ? (await gql<{ campanas: CampanaServidor[] }>(`{ ${QUERY_CAMPANAS} }`)).campanas.map(c => c.datos)
    : [];
  return { usuario: d.yo, lista: d.personajes.map(p => ({ id: p.id, name: p.nombre, sub: p.resumen || '' })) };
}

export const almacen = {
  pj(id: string) { return copia(mem.pjs.get(id)) ?? null; },
  guardarPj(pj: any, resumen: string) {
    mem.pjs.set(pj.id, copia(pj));
    const datos = copia(pj);
    programar('pj:' + pj.id, k => guardarPersonaje({ id: pj.id, nombre: pj.nombre || 'Sin nombre', resumen, datos }, k));
  },
  borrarPj(id: string) {
    mem.pjs.delete(id);
    const p = pendientes.get('pj:' + id); if (p) { clearTimeout(p.t); pendientes.delete('pj:' + id); }
    borrarPersonaje(id).catch((e: Error) => avisar(`No se pudo borrar en el servidor: ${e.message}`, 'error'));
  },
  ultimo(id: string | null) { programar('ultimo', () => marcarUltimo(id), 1500); },

  campanas() { return copia(mem.campanas); },
  guardarCampana(cp: any) {
    const i = mem.campanas.findIndex(x => x.id === cp.id);
    if (i >= 0) mem.campanas[i] = copia(cp); else mem.campanas.push(copia(cp));
    const datos = copia(cp);
    programar('camp:' + cp.id, k => guardarCampana({ id: cp.id, nombre: cp.nombre, datos }, k));
  },
  borrarCampana(id: string) {
    mem.campanas = mem.campanas.filter(x => x.id !== id);
    const p = pendientes.get('camp:' + id); if (p) { clearTimeout(p.t); pendientes.delete('camp:' + id); }
    borrarCampana(id).catch((e: Error) => avisar(`No se pudo borrar en el servidor: ${e.message}`, 'error'));
  },
};

/** Guarda la biblioteca: el administrador la reemplaza; los demás solo aportan lo nuevo que importaron. */
export function guardarLib(admin: boolean) {
  const lib = copia(getLib());
  programar('lib', () => (admin ? guardarBiblioteca(lib) : aportarBiblioteca(lib)), 900);
}
