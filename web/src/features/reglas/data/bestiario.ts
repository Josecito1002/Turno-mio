/* Bestiario: los monstruos del Manual de Monstruos 2025 para la Mesa del DM.
   Las estadísticas salen de scripts/bestiario-base.ts (generadas/bestiario.ts); los nombres y textos en español, de los
   lotes de Gemini. El catálogo pesa: se carga aparte con cargarBestiario() solo cuando se usa. */
import { norm } from '@/shared/utils/texto';

export interface AccionMonstruo {
  /** Nombre en español (mientras no haya lote, el inglés) */
  n: string;
  /** Nombre original en inglés: sirve de clave para conservar las traducciones */
  en: string;
  /** Texto propio en español */
  t?: string;
  atk?: number; alcance?: string; dano?: { d: string; tipo: string }[];
  cd?: number; salv?: string;
}
export interface ConjurosMonstruo { n: string; en: string; como: string; ab: string; cd?: number; atk?: number; lista: string[] }
export interface Monstruo {
  n: string; en: string; tam: string; tipo: string;
  ca: number; pg: number; pgF: string; vel: string;
  ab: { fue: number; des: number; con: number; int: number; sab: number; car: number };
  salv?: Record<string, number>; habs?: Record<string, number>; sentidos: string; idiomas?: string;
  cr: string; xp: number; pb: number; ini: number;
  inmune?: string; resist?: string; vuln?: string; condInmune?: string;
  rasgos?: AccionMonstruo[]; acciones: AccionMonstruo[]; adicionales?: AccionMonstruo[]; reacciones?: AccionMonstruo[]; legendarias?: AccionMonstruo[];
  conjuros?: ConjurosMonstruo[];
  /** Descripción propia en español */
  texto?: string;
  entornos?: string[]; grupo?: string;
  /** Monstruo propio de una campaña (de un archivo de sesión), no del Manual */
  propio?: boolean;
}

let cache: Record<string, Monstruo> | null = null;
/** El catálogo completo (se descarga una vez). */
export async function cargarBestiario(): Promise<Record<string, Monstruo>> {
  if (!cache) cache = (await import('./generadas/bestiario')).BESTIARIO_GENERADO;
  return cache;
}
export const bestiarioCargado = () => cache;

export const valorCr = (cr: string) => cr.includes('/') ? 1 / +cr.split('/')[1] : +cr;

/** Busca por nombre en español o en inglés; sin texto, todos ordenados por nombre. */
export function buscarMonstruos(b: Record<string, Monstruo>, q: string, max = 50): [string, Monstruo][] {
  const t = norm(q).trim();
  const todos = Object.entries(b);
  const hits = t ? todos.filter(([, m]) => norm(m.n).includes(t) || norm(m.en).includes(t)) : todos;
  // Primero los que empiezan con lo buscado
  const empieza = (m: Monstruo) => (norm(m.n).startsWith(t) || norm(m.en).startsWith(t) ? 0 : 1);
  return hits.sort(([, a], [, b2]) => empieza(a) - empieza(b2) || a.n.localeCompare(b2.n, 'es')).slice(0, max);
}
