import { gql } from '@/shared/graphql/cliente';

export const QUERY_PERSONAJES = /* GraphQL */ `personajes { id nombre resumen datos }`;
export type PersonajeServidor = { id: string; nombre: string; resumen: string | null; datos: Record<string, unknown> };

export const guardarPersonaje = (p: { id: string; nombre: string; resumen: string; datos: unknown }, keepalive = false) =>
  gql(`mutation ($id: ID!, $nombre: String!, $resumen: String, $datos: JSON!) { guardarPersonaje(id: $id, nombre: $nombre, resumen: $resumen, datos: $datos) { id } }`, p, { keepalive });

export const borrarPersonaje = (id: string) => gql(`mutation ($id: ID!) { borrarPersonaje(id: $id) }`, { id });

export const marcarUltimo = (id: string | null) => gql(`mutation ($id: ID) { marcarUltimo(id: $id) }`, { id });

/* ---- Enlace para compartir, y personajes de otras cuentas (administrador) ---- */
export type PersonajeAjeno = { usuarioId: string; jugador: string; id: string; nombre: string; resumen: string | null; actualizadoEn: string };
export type RefPersonaje = { usuarioId: string; id: string };
export type Enlace = { token: string };
export type PersonajeEnlazado = { nombre: string; jugador: string; datos: Record<string, unknown>; actualizadoEn: string };
const AJENO = 'usuarioId jugador id nombre resumen actualizadoEn';

export const enlaceDe = (id: string) => gql<{ enlaceDe: Enlace | null }>(`query ($id: ID!) { enlaceDe(id: $id) { token } }`, { id }).then(d => d.enlaceDe);
export const crearEnlace = (id: string, nuevo = false) =>
  gql<{ crearEnlace: Enlace }>(`mutation ($id: ID!, $n: Boolean) { crearEnlace(id: $id, nuevo: $n) { token } }`, { id, n: nuevo }).then(d => d.crearEnlace);
export const quitarEnlace = (id: string) => gql(`mutation ($id: ID!) { quitarEnlace(id: $id) }`, { id });
/** No hace falta cuenta. */
export const personajePorEnlace = (token: string) =>
  gql<{ personajePorEnlace: PersonajeEnlazado | null }>(`query ($t: String!) { personajePorEnlace(token: $t) { nombre jugador datos actualizadoEn } }`, { t: token }).then(d => d.personajePorEnlace);
/** Solo administradores. */
export const personajeAjeno = (r: RefPersonaje) =>
  gql<{ personajeAjeno: PersonajeServidor | null }>(`query ($usuarioId: ID!, $id: ID!) { personajeAjeno(usuarioId: $usuarioId, id: $id) { id nombre resumen datos } }`, r).then(d => d.personajeAjeno);

/** Borra varios personajes; los de otras cuentas, solo un administrador. Devuelve cuántos se borraron. */
export const borrarPersonajes = (refs: RefPersonaje[]) =>
  gql<{ borrarPersonajes: number }>(`mutation ($refs: [RefPersonaje!]!) { borrarPersonajes(refs: $refs) }`, { refs }).then(d => d.borrarPersonajes);
/** Solo administradores. */
export const personajesDeJugadores = (buscar: string) =>
  gql<{ personajesDeJugadores: PersonajeAjeno[] }>(`query ($buscar: String) { personajesDeJugadores(buscar: $buscar) { ${AJENO} } }`, { buscar }).then(d => d.personajesDeJugadores);
