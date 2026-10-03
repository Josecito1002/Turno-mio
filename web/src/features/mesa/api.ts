import { gql } from '@/shared/graphql/cliente';

export const QUERY_CAMPANAS = /* GraphQL */ `campanas { id nombre datos }`;
export type CampanaServidor = { id: string; nombre: string; datos: Record<string, unknown> };

export const guardarCampana = (c: { id: string; nombre: string; datos: unknown }, keepalive = false) =>
  gql(`mutation ($id: ID!, $nombre: String!, $datos: JSON!) { guardarCampana(id: $id, nombre: $nombre, datos: $datos) { id } }`, c, { keepalive });

export const borrarCampana = (id: string) => gql(`mutation ($id: ID!) { borrarCampana(id: $id) }`, { id });

/* ---- Código de mesa: el DM lo comparte y los jugadores unen sus personajes ---- */
export type PersonajeEnMesa = { jugadorId: string; jugador: string; personajeId: string; nombre: string; resumen: string | null; datos: Record<string, unknown>; actualizadoEn: string };
export type MesaUnida = { dmId: string; campanaId: string; mesa: string; dm: string; personajeId: string; personaje: string };
const CAMPOS_MESA = 'dmId campanaId mesa dm personajeId personaje';

export const codigoMesa = (campanaId: string, nuevo = false) =>
  gql<{ codigoMesa: string }>(`mutation ($campanaId: ID!, $nuevo: Boolean) { codigoMesa(campanaId: $campanaId, nuevo: $nuevo) }`, { campanaId, nuevo })
    .then(d => d.codigoMesa);

export const jugadoresMesa = (campanaId: string) =>
  gql<{ jugadoresMesa: PersonajeEnMesa[] }>(`query ($campanaId: ID!) { jugadoresMesa(campanaId: $campanaId) { jugadorId jugador personajeId nombre resumen datos actualizadoEn } }`, { campanaId })
    .then(d => d.jugadoresMesa);

export const quitarDeMesa = (campanaId: string, jugadorId: string, personajeId: string) =>
  gql(`mutation ($campanaId: ID!, $jugadorId: ID!, $personajeId: ID!) { quitarDeMesa(campanaId: $campanaId, jugadorId: $jugadorId, personajeId: $personajeId) }`, { campanaId, jugadorId, personajeId });

export const unirseMesa = (codigo: string, personajeId: string) =>
  gql<{ unirseMesa: MesaUnida }>(`mutation ($codigo: String!, $personajeId: ID!) { unirseMesa(codigo: $codigo, personajeId: $personajeId) { ${CAMPOS_MESA} } }`, { codigo, personajeId })
    .then(d => d.unirseMesa);

export const misMesas = () => gql<{ misMesas: MesaUnida[] }>(`{ misMesas { ${CAMPOS_MESA} } }`).then(d => d.misMesas);

export const salirMesa = (m: { dmId: string; campanaId: string; personajeId: string }) =>
  gql(`mutation ($dmId: ID!, $campanaId: ID!, $personajeId: ID!) { salirMesa(dmId: $dmId, campanaId: $campanaId, personajeId: $personajeId) }`, m);
