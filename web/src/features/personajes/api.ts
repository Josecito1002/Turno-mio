import { gql } from '@/shared/graphql/cliente';

export const QUERY_PERSONAJES = /* GraphQL */ `personajes { id nombre resumen datos }`;
export type PersonajeServidor = { id: string; nombre: string; resumen: string | null; datos: Record<string, unknown> };

export const guardarPersonaje = (p: { id: string; nombre: string; resumen: string; datos: unknown }, keepalive = false) =>
  gql(`mutation ($id: ID!, $nombre: String!, $resumen: String, $datos: JSON!) { guardarPersonaje(id: $id, nombre: $nombre, resumen: $resumen, datos: $datos) { id } }`, p, { keepalive });

export const borrarPersonaje = (id: string) => gql(`mutation ($id: ID!) { borrarPersonaje(id: $id) }`, { id });

export const marcarUltimo = (id: string | null) => gql(`mutation ($id: ID) { marcarUltimo(id: $id) }`, { id });
