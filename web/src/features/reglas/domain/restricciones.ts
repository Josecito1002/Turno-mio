/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * Qué puede elegir cada clase (reglas 2024). La interfaz solo ofrece lo que le corresponde
 * al personaje; lo que ya tenía se sigue mostrando para poder quitarlo.
 */
import { norm } from '@/shared/utils/texto';
import { SKILLS } from '../data/caracteristicas';
import { CLASES } from '../data/clases';
import { DOTES } from '../data/dotes';

/* ---------- Habilidades ---------- */
/** Corrige nombres de habilidad que vienen mal escritos de otras fuentes ("Arcano" -> "Arcanos"). */
export function nombreHabilidad(h: string) {
  const n = norm(h);
  return (SKILLS.find(s => norm(s[0]) === n) || SKILLS.find(s => norm(s[0]).startsWith(n) || n.startsWith(norm(s[0]))) || [h])[0];
}
export function habilidadesDeClase(C: any): string[] {
  if (!C) return [];
  if (C.habs === 'todas') return SKILLS.map(s => s[0]);
  return [...new Set<string>((C.habs || []).map(nombreHabilidad))];
}

/* ---------- Armaduras ---------- */
export type CompArmadura = { ligera: boolean; media: boolean; pesada: boolean; escudo: boolean };
export function competenciaArmadura(C: any): CompArmadura {
  const t = norm(C?.arm || '');
  if (!C) return { ligera: true, media: true, pesada: true, escudo: true };
  const todas = /\btodas\b/.test(t);
  return { ligera: todas || /ligera/.test(t), media: todas || /media/.test(t), pesada: todas || /pesada/.test(t), escudo: /escudo/.test(t) };
}
/* Armas: la competencia real del personaje (clase + rasgos) está en competencias.ts */

/* ---------- Conjuros ---------- */
/** Clase base de la que deriva una clase de biblioteca por su nombre ("Artífice" -> artifice), o null. */
export function claseBase(claseKey: string, C: any): string | null {
  if (CLASES[claseKey]) return claseKey;
  const n = norm(C?.n);
  if (!n) return null;
  return Object.keys(CLASES).find(k => n.includes(norm(CLASES[k].n)) || (CLASES[k].al || []).some((a: string) => n.includes(norm(a)))) || null;
}

/** Lista de conjuros que usa la clase: la suya, o la de la clase base de la que deriva. */
export function listaDeConjuros(claseKey: string, C: any): string | null {
  if (!C?.lanz) return null;
  return claseBase(claseKey, C) || claseKey;
}
export const conjuroDeLaLista = (s: any, lista: string | null) => !!lista && (s.clases || []).includes(lista);

/* ---------- Dotes ---------- */
/** La biblioteca importada mezcla equipo (packs, herramientas, instrumentos) con dotes: solo estas categorías son dotes. */
const CATEGORIAS_DOTE = new Set(['', 'origen', 'general', 'epica', 'marca de dragon', 'wild talent', 'ceremorphosis']);
/** La categoría sin la etiqueta "(Playtest)" de las dotes de Unearthed Arcana. */
const categoriaDote = (d: any) => norm(d?.cat || '').replace(/\s*\(playtest\)$/, '');
export const esDote = (d: any) => !!d && CATEGORIAS_DOTE.has(categoriaDote(d));
/** Dotes de origen: las de las reglas y las marcas de dragón. */
export const esDoteOrigen = (k: string, d: any) => !!DOTES[k] || ['origen', 'marca de dragon'].includes(categoriaDote(d));
/** Dotes para una mejora de característica: generales y de origen; las épicas desde nivel 19. */
export const esDoteMejora = (k: string, d: any, nivel: number) => esDote(d) && (d.nivelMin || 1) <= nivel && !/estilo/.test(norm(d.cat || ''));
