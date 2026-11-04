/* Salas de sorteo: tiradas de dados, moneda y ruleta que ven en vivo todos los que entran con el enlace.
   Aquí solo lo que no depende de la base: el azar, los límites y quién cuenta como conectado. */
import { parseRoll } from '@/features/dados/domain/dados';

export type TipoTirada = 'dados' | 'moneda' | 'ruleta';
export type GrupoDados = { d: number; s: number; vals: number[] };
export type Tirada = {
  id: string;
  /** Nombre de quien tiró */
  por: string;
  tipo: TipoTirada;
  ts: number;
  /** dados */
  expr?: string; grupos?: GrupoDados[]; fijo?: number; total?: number;
  /** moneda */
  cara?: boolean;
  /** ruleta: las opciones tal como estaban al girar y las que salieron (índices, en orden) */
  opciones?: string[]; ganadores?: number[];
};
export type ConfigSala = { todosTiran: boolean; opciones: string[]; hostId: string };
export type Presente = { id: string; nombre: string; host: boolean; conectado: boolean };
export type Sala = { codigo: string; nombre: string; config: ConfigSala; tiradas: Tirada[]; presentes: Presente[] };

export const MAX_TIRADAS = 30;
export const MAX_OPCIONES = 40;
export const LARGO_OPCION = 60;
export const LARGO_NOMBRE = 40;
/** Cada cuánto pregunta la página (con la pestaña a la vista). La base es pequeña: no bajar mucho de esto. */
export const CADA_MS = 2500;
/** Sin latido en este tiempo, la persona sale como desconectada */
export const CONECTADO_MS = 9000;
/** Pasado este tiempo deja de aparecer en la lista */
export const OLVIDAR_MS = 10 * 60_000;

/* Sin letras ni números que se confunden al dictarlos (O/0, I/1/L) */
const ALFABETO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
export const LARGO_CODIGO = 6;
export const nuevoCodigo = (azar: Azar) => Array.from({ length: LARGO_CODIGO }, () => ALFABETO[azar(ALFABETO.length) - 1]).join('');
export const normalizarCodigo = (s: string) => String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

/** Un número de 1 a n. En el servidor sale de node:crypto; en las pruebas, de una lista fija. */
export type Azar = (n: number) => number;

export const limpiarNombre = (s: unknown, porDefecto = 'Anónimo') =>
  String(s ?? '').replace(/\s+/g, ' ').trim().slice(0, LARGO_NOMBRE) || porDefecto;

export function limpiarOpciones(lista: unknown): string[] {
  if (!Array.isArray(lista)) return [];
  return lista.map(o => String(o ?? '').replace(/\s+/g, ' ').trim().slice(0, LARGO_OPCION)).filter(Boolean).slice(0, MAX_OPCIONES);
}

export class ErrorSorteo extends Error {}

/** "2d6+1", "d20", "4d6-1d4+2". Hasta 50 dados en total y de 2 a 1000 caras. */
export function tirarDados(expr: string, azar: Azar): Pick<Tirada, 'expr' | 'grupos' | 'fijo' | 'total'> {
  const limpia = String(expr || '').replace(/\s+/g, '').toLowerCase().slice(0, 40);
  if (!limpia || !/^[+-]?(\d*d\d+|\d+)([+-](\d*d\d+|\d+))*$/.test(limpia)) throw new ErrorSorteo('Escribe la tirada como 1d20, 2d6+3 o 4d6.');
  const terminos = parseRoll(limpia);
  const grupos: GrupoDados[] = [];
  let fijo = 0, nDados = 0;
  for (const t of terminos) {
    if ('k' in t) { fijo += t.k; continue; }
    if (t.d < 2 || t.d > 1000) throw new ErrorSorteo('Los dados van de 2 a 1000 caras.');
    nDados += t.n;
    if (t.n < 1 || nDados > 50) throw new ErrorSorteo('Como mucho 50 dados por tirada.');
    grupos.push({ d: t.d, s: t.s, vals: Array.from({ length: t.n }, () => azar(t.d)) });
  }
  if (!grupos.length) throw new ErrorSorteo('Falta al menos un dado (por ejemplo 1d20).');
  const total = grupos.reduce((s, g) => s + g.s * g.vals.reduce((a, v) => a + v, 0), 0) + fijo;
  return { expr: limpia, grupos, fijo, total };
}

export const tirarMoneda = (azar: Azar): Pick<Tirada, 'cara'> => ({ cara: azar(2) === 1 });

/** Gira la ruleta: `cuantos` ganadores distintos, en el orden en que salen. */
export function girarRuleta(opciones: string[], cuantos: number, azar: Azar): Pick<Tirada, 'opciones' | 'ganadores'> {
  const ops = limpiarOpciones(opciones);
  if (ops.length < 2) throw new ErrorSorteo('La ruleta necesita al menos dos opciones.');
  const n = Math.max(1, Math.min(Math.floor(cuantos) || 1, ops.length));
  const quedan = ops.map((_, i) => i), ganadores: number[] = [];
  for (let k = 0; k < n; k++) ganadores.push(quedan.splice(azar(quedan.length) - 1, 1)[0]);
  return { opciones: ops, ganadores };
}

/** Quién puede tirar: el anfitrión siempre; los demás solo si él lo permite. */
export const puedeTirar = (config: ConfigSala, esHost: boolean) => esHost || config.todosTiran;

type Latido = { n: string; v: number };
/** La lista de presentes, con el anfitrión primero y luego los conectados. */
export function presentes(presencia: Record<string, Latido>, hostId: string, ahora: number): Presente[] {
  return Object.entries(presencia || {})
    .filter(([, p]) => ahora - p.v < OLVIDAR_MS)
    .map(([id, p]) => ({ id, nombre: p.n, host: id === hostId, conectado: ahora - p.v < CONECTADO_MS }))
    .sort((a, b) => Number(b.host) - Number(a.host) || Number(b.conectado) - Number(a.conectado) || a.nombre.localeCompare(b.nombre, 'es'));
}

/** El texto corto de una tirada, para el historial y para lectores de pantalla. */
export function textoTirada(t: Tirada): string {
  if (t.tipo === 'moneda') return t.cara ? 'Cara' : 'Cruz';
  if (t.tipo === 'ruleta') return (t.ganadores || []).map(i => t.opciones?.[i] ?? '?').join(', ');
  const dados = (t.grupos || []).map(g => `${g.s < 0 ? '−' : ''}[${g.vals.join(', ')}]`).join(' ');
  return `${t.total} ${dados}${t.fijo ? ` ${t.fijo > 0 ? '+' : '−'}${Math.abs(t.fijo)}` : ''}`;
}
