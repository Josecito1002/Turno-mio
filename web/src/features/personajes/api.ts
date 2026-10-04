import { gql } from '@/shared/graphql/cliente';

export const QUERY_PERSONAJES = /* GraphQL */ `personajes { id nombre resumen datos }`;
export type PersonajeServidor = { id: string; nombre: string; resumen: string | null; datos: Record<string, unknown> };

export const guardarPersonaje = (p: { id: string; nombre: string; resumen: string; datos: unknown }, keepalive = false) =>
  gql(`mutation ($id: ID!, $nombre: String!, $resumen: String, $datos: JSON!) { guardarPersonaje(id: $id, nombre: $nombre, resumen: $resumen, datos: $datos) { id } }`, p, { keepalive });

export const borrarPersonaje = (id: string) => gql(`mutation ($id: ID!) { borrarPersonaje(id: $id) }`, { id });

export const marcarUltimo = (id: string | null) => gql(`mutation ($id: ID) { marcarUltimo(id: $id) }`, { id });

/* ---- Compartir y personajes de otras cuentas ---- */
export type PersonajeAjeno = { usuarioId: string; jugador: string; id: string; nombre: string; resumen: string | null; actualizadoEn: string };
export type RefPersonaje = { usuarioId: string; id: string };
const AJENO = 'usuarioId jugador id nombre resumen actualizadoEn';

export const compartidosConmigo = () => gql<{ compartidosConmigo: PersonajeAjeno[] }>(`{ compartidosConmigo { ${AJENO} } }`).then(d => d.compartidosConmigo);
export const compartidoCon = (id: string) =>
  gql<{ compartidoCon: { id: string; nombre: string }[] }>(`query ($id: ID!) { compartidoCon(id: $id) { id nombre } }`, { id }).then(d => d.compartidoCon);
export const compartirPersonaje = (id: string, con: string) =>
  gql<{ compartirPersonaje: { id: string; nombre: string } }>(`mutation ($id: ID!, $con: String!) { compartirPersonaje(id: $id, con: $con) { id nombre } }`, { id, con }).then(d => d.compartirPersonaje);
export const dejarDeCompartir = (id: string, conId: string) => gql(`mutation ($id: ID!, $conId: ID!) { dejarDeCompartir(id: $id, conId: $conId) }`, { id, conId });
export const descartarCompartido = (r: RefPersonaje) => gql(`mutation ($usuarioId: ID!, $id: ID!) { descartarCompartido(usuarioId: $usuarioId, id: $id) }`, r);
export const personajeAjeno = (r: RefPersonaje) =>
  gql<{ personajeAjeno: PersonajeServidor | null }>(`query ($usuarioId: ID!, $id: ID!) { personajeAjeno(usuarioId: $usuarioId, id: $id) { id nombre resumen datos } }`, r).then(d => d.personajeAjeno);
export const copiarPersonaje = (r: RefPersonaje) =>
  gql<{ copiarPersonaje: PersonajeServidor }>(`mutation ($usuarioId: ID!, $id: ID!) { copiarPersonaje(usuarioId: $usuarioId, id: $id) { id nombre resumen datos } }`, r).then(d => d.copiarPersonaje);

/** Borra varios personajes; los de otras cuentas, solo un administrador. Devuelve cuántos se borraron. */
export const borrarPersonajes = (refs: RefPersonaje[]) =>
  gql<{ borrarPersonajes: number }>(`mutation ($refs: [RefPersonaje!]!) { borrarPersonajes(refs: $refs) }`, { refs }).then(d => d.borrarPersonajes);
/** Solo administradores. */
export const personajesDeJugadores = (buscar: string) =>
  gql<{ personajesDeJugadores: PersonajeAjeno[] }>(`query ($buscar: String) { personajesDeJugadores(buscar: $buscar) { ${AJENO} } }`, { buscar }).then(d => d.personajesDeJugadores);
