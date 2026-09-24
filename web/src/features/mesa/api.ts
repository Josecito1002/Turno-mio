import { gql } from '@/shared/graphql/cliente';

export const QUERY_CAMPANAS = /* GraphQL */ `campanas { id nombre datos }`;
export type CampanaServidor = { id: string; nombre: string; datos: Record<string, unknown> };

export const guardarCampana = (c: { id: string; nombre: string; datos: unknown }, keepalive = false) =>
  gql(`mutation ($id: ID!, $nombre: String!, $datos: JSON!) { guardarCampana(id: $id, nombre: $nombre, datos: $datos) { id } }`, c, { keepalive });

export const borrarCampana = (id: string) => gql(`mutation ($id: ID!) { borrarCampana(id: $id) }`, { id });
