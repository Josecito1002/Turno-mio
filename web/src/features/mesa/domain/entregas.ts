/* Objetos que el DM da a un personaje desde la mesa. El servidor los guarda en la campaña (combateVivo.entregas)
   y la hoja del jugador los mete en su inventario la próxima vez que esté abierta; luego los da por recibidos. */

/** Un objeto mágico del catálogo (`k`) o personalizado (`def`), con el arma o armadura que lo lleva si hace falta. */
export type ObjetoEntregado =
  | { tipo: 'objeto'; n: string; q: number; t?: string }
  | { tipo: 'magico'; k?: string; def?: Record<string, unknown>; base?: string }
  | { tipo: 'arma'; k: string }
  | { tipo: 'armadura'; k: string }
  /** El DM corrige el inventario: quita `q` de un objeto por nombre, quita un arma por clave o cambia el oro */
  | { tipo: 'quitar'; n: string; q: number }
  | { tipo: 'quitarArma'; k: string }
  | { tipo: 'oro'; d: number };

export type Entrega = { id: string; personajeId: string; objeto: ObjetoEntregado; de: string; ts: string };

/** Cuántas entregas sin recoger se guardan como mucho en una campaña. */
export const MAX_ENTREGAS = 100;

const clave = (x: unknown) => (typeof x === 'string' && /^[\w-]{1,60}$/.test(x) ? x : null);
const texto = (x: unknown, max: number) => (typeof x === 'string' ? x.trim().slice(0, max) : '');

/** Lo que manda el DM, limpio y acotado; null si no es un objeto válido. */
export function validarObjeto(o: unknown): ObjetoEntregado | null {
  if (!o || typeof o !== 'object') return null;
  const x = o as Record<string, unknown>;
  if (x.tipo === 'objeto') {
    const n = texto(x.n, 80); if (!n) return null;
    const q = Math.floor(Number(x.q) || 1);
    const t = texto(x.t, 600);
    return { tipo: 'objeto', n, q: Math.min(Math.max(q, 1), 999), ...(t ? { t } : {}) };
  }
  if (x.tipo === 'arma' || x.tipo === 'armadura') { const k = clave(x.k); return k ? { tipo: x.tipo, k } : null; }
  if (x.tipo === 'quitar') { const n = texto(x.n, 80); const q = Math.floor(Number(x.q) || 1); return n ? { tipo: 'quitar', n, q: Math.min(Math.max(q, 1), 999) } : null; }
  if (x.tipo === 'quitarArma') { const k = texto(x.k, 80); return k ? { tipo: 'quitarArma', k } : null; }
  if (x.tipo === 'oro') { const d = Math.trunc(Number(x.d) || 0); return d ? { tipo: 'oro', d: Math.min(Math.max(d, -100000), 100000) } : null; }
  if (x.tipo === 'magico') {
    const k = clave(x.k), base = clave(x.base);
    if (k) return { tipo: 'magico', k, ...(base ? { base } : {}) };
    if (x.def && typeof x.def === 'object' && JSON.stringify(x.def).length <= 3000 && texto((x.def as Record<string, unknown>).n, 80))
      return { tipo: 'magico', def: x.def as Record<string, unknown>, ...(base ? { base } : {}) };
  }
  return null;
}
