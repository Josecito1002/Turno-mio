import { gql } from '@/shared/graphql/cliente';

export type Cuenta = { id: string; email: string; nombre: string; rol: string; creadoEn: string };

export const listarCuentas = () => gql<{ cuentas: Cuenta[] }>(`{ cuentas { id email nombre rol creadoEn } }`).then(d => d.cuentas);

export const cambiarRol = (id: string, rol: string) =>
  gql<{ cambiarRol: Cuenta }>(`mutation ($id: ID!, $rol: String!) { cambiarRol(id: $id, rol: $rol) { id email nombre rol creadoEn } }`, { id, rol }).then(d => d.cambiarRol);
