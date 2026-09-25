/* eslint-disable @typescript-eslint/no-explicit-any */
import { ARMAS, ARMADURAS } from '@/features/reglas/data/equipo';

/* ---------- Armas y armaduras personalizadas ----------
   Se guardan en el personaje (pj.armasPropias, pj.armadurasPropias) con claves 'x:…' y se registran en las
   tablas para que el cálculo las trate como cualquier otra. Las listas de "estándar" las filtran con esPropia. */
export const esPropia = (k: string) => k.startsWith('x:');
export function registrarPropias(pj: any) {
  for (const [k, w] of Object.entries<any>(pj.armasPropias || {})) ARMAS[k] = { al: [], p: [], ...w };
  for (const [k, a] of Object.entries<any>(pj.armadurasPropias || {})) ARMADURAS[k] = { al: [], ...a };
}
export const nuevaClave = () => 'x:' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);

/** Armaduras que tiene: las guardadas, la puesta y el escudo si lo lleva (así valen los kits y los personajes viejos). */
export function armadurasDe(pj: any): string[] {
  const out = [...(pj.armaduras || [])];
  if (pj.armadura && pj.armadura !== 'ninguna' && !out.includes(pj.armadura)) out.unshift(pj.armadura);
  if (pj.escudo && !out.includes('escudo')) out.push('escudo');
  return out.filter(k => k === 'escudo' || ARMADURAS[k]);
}

/* ---------- Monedas ----------
   El oro sigue en pj.oro (lo usan los kits); platino, plata y cobre en pj.monedas. */
export const MONEDAS: [string, string, number, string][] = [
  ['pt', 'Platino', 1000, '#d9dde3'], ['po', 'Oro', 100, '#d4a93c'], ['pp', 'Plata', 10, '#a7adb4'], ['pc', 'Cobre', 1, '#b87333'],
];
export type Bolsa = Record<string, number>;
export const bolsaDe = (pj: any): Bolsa => ({ pt: +pj.monedas?.pt || 0, po: +pj.oro || 0, pp: +pj.monedas?.pp || 0, pc: +pj.monedas?.pc || 0 });
export function guardarBolsa(pj: any, b: Bolsa) { pj.oro = b.po; pj.monedas = { pt: b.pt, pp: b.pp, pc: b.pc }; }
const valor = Object.fromEntries(MONEDAS.map(([k, , v]) => [k, v]));
const totalCobre = (b: Bolsa) => MONEDAS.reduce((s, [k, , v]) => s + (b[k] || 0) * v, 0);

/** Da `cobre` de cambio en monedas menores que `limite`, de la mayor a la menor. */
function darCambio(b: Bolsa, cobre: number, limite: number) {
  for (const [k, , v] of MONEDAS) if (v < limite && cobre >= v) { b[k] += Math.floor(cobre / v); cobre %= v; }
}

/** Paga `n` monedas de `den`. Usa primero esa moneda; si no alcanza, cambia una mayor (de la más chica a la más
    grande) y recibe el cambio; si tampoco hay, junta monedas menores. Devuelve la bolsa nueva o null si no alcanza. */
export function pagar(bolsa: Bolsa, den: string, n: number): Bolsa | null {
  const b = { ...bolsa }; let falta = n * valor[den];
  if (n <= 0) return b;
  if (totalCobre(b) < falta) return null;
  const usa = Math.min(b[den], n); b[den] -= usa; falta -= usa * valor[den];
  // Monedas mayores, de la más chica a la más grande
  for (const [k, , v] of [...MONEDAS].reverse()) {
    if (v <= valor[den]) continue;
    while (falta > 0 && b[k] > 0) { b[k]--; if (v >= falta) { darCambio(b, v - falta, v); falta = 0; } else falta -= v; }
  }
  // Monedas menores: primero lo exacto, después se cambia una para cubrir el resto
  for (const [k, , v] of MONEDAS) {
    if (v >= valor[den] || falta <= 0) continue;
    const t = Math.min(b[k], Math.floor(falta / v)); b[k] -= t; falta -= t * v;
  }
  for (const [k, , v] of [...MONEDAS].reverse()) {
    if (v >= valor[den] || falta <= 0 || !b[k]) continue;
    b[k]--; darCambio(b, v - falta, v); falta = 0;
  }
  return falta > 0 ? null : b;
}

/** El paso Equipo del editor es para la creación: a nivel 1, mientras falten los kits iniciales.
    Después, el equipo se maneja en la pestaña Equipo de la hoja. */
export function pasoEquipoEnEditor(pj: any, c: any, kitClase: (k: string) => any, kitTrasfondo: (k: string, T: any) => any) {
  if (c.lvl > 1) return false;
  if (!c.C || !c.T) return true;
  return !((pj.inicial || !kitClase(pj.clase)) && (pj.trasfondo?.equipo || !kitTrasfondo(pj.trasfondo?.key, c.T)));
}
