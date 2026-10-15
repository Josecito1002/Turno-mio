import { gql } from '@/shared/graphql/cliente';

export type Cuenta = { id: string; email: string; nombre: string; rol: string; creadoEn: string };

export const listarCuentas = () => gql<{ cuentas: Cuenta[] }>(`{ cuentas { id email nombre rol creadoEn } }`).then(d => d.cuentas);

export const cambiarRol = (id: string, rol: string) =>
  gql<{ cambiarRol: Cuenta }>(`mutation ($id: ID!, $rol: String!) { cambiarRol(id: $id, rol: $rol) { id email nombre rol creadoEn } }`, { id, rol }).then(d => d.cambiarRol);

/** Solo administradores: devuelve la contraseña temporal (se muestra una sola vez). */
export const restablecerContrasena = (id: string) =>
  gql<{ restablecerContrasena: string }>(`mutation ($id: ID!) { restablecerContrasena(id: $id) }`, { id }).then(d => d.restablecerContrasena);

export const cambiarContrasena = (actual: string, nueva: string) =>
  gql<{ cambiarContrasena: boolean }>(`mutation ($actual: String!, $nueva: String!) { cambiarContrasena(actual: $actual, nueva: $nueva) }`, { actual, nueva });

/** Cambia el nombre de jugador propio; devuelve el nombre como quedó guardado. */
export const cambiarNombre = (nombre: string) =>
  gql<{ cambiarNombre: { nombre: string } }>(`mutation ($nombre: String!) { cambiarNombre(nombre: $nombre) { nombre } }`, { nombre }).then(d => d.cambiarNombre.nombre);
