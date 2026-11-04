import { gql } from '@/shared/graphql/cliente';
import type { Sala, TipoTirada } from './domain/sorteo';

const CAMPOS = 'codigo nombre config tiradas presentes';
export type Yo = { visitante: string; quien: string };

export const crearSala = (yo: Yo, nombre?: string) =>
  gql<{ crearSalaSorteo: { codigo: string; secreto: string } }>(
    `mutation ($nombre: String, $visitante: String!, $quien: String!) { crearSalaSorteo(nombre: $nombre, visitante: $visitante, quien: $quien) { codigo secreto } }`,
    { nombre, ...yo }).then(d => d.crearSalaSorteo);

export const latido = (codigo: string, yo: Yo) =>
  gql<{ latidoSorteo: Sala }>(`mutation ($codigo: String!, $visitante: String!, $quien: String!) { latidoSorteo(codigo: $codigo, visitante: $visitante, quien: $quien) { ${CAMPOS} } }`,
    { codigo, ...yo }).then(d => d.latidoSorteo);

export const tirar = (codigo: string, yo: Yo, secreto: string | null, tipo: TipoTirada, extra: { expr?: string; cuantos?: number } = {}) =>
  gql<{ tirarSorteo: Sala }>(`mutation ($codigo: String!, $visitante: String!, $quien: String!, $secreto: String, $tipo: String!, $expr: String, $cuantos: Int) {
    tirarSorteo(codigo: $codigo, visitante: $visitante, quien: $quien, secreto: $secreto, tipo: $tipo, expr: $expr, cuantos: $cuantos) { ${CAMPOS} } }`,
  { codigo, ...yo, secreto, tipo, ...extra }).then(d => d.tirarSorteo);

export const configurar = (codigo: string, secreto: string, cambios: { nombre?: string; todosTiran?: boolean; opciones?: string[] }) =>
  gql<{ configurarSorteo: Sala }>(`mutation ($codigo: String!, $secreto: String!, $nombre: String, $todosTiran: Boolean, $opciones: [String!]) {
    configurarSorteo(codigo: $codigo, secreto: $secreto, nombre: $nombre, todosTiran: $todosTiran, opciones: $opciones) { ${CAMPOS} } }`,
  { codigo, secreto, ...cambios }).then(d => d.configurarSorteo);

/* Lo que recuerda este navegador: quién eres, con qué nombre, y el secreto de las salas que creaste */
const leer = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const guardar = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento: dura lo que la pestaña */ } };

export function miVisitante() {
  let id = leer('sorteo:visitante');
  if (!id) { id = crypto.randomUUID(); guardar('sorteo:visitante', id); }
  return id;
}
export const miNombre = () => leer('sorteo:nombre') || '';
export const guardarNombre = (n: string) => guardar('sorteo:nombre', n);
export const secretoDe = (codigo: string) => leer('sorteo:secreto:' + codigo);
export const guardarSecreto = (codigo: string, s: string) => guardar('sorteo:secreto:' + codigo, s);
