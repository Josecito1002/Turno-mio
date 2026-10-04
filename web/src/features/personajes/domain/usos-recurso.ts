/* eslint-disable @typescript-eslint/no-explicit-any */
import { norm } from '@/shared/utils/texto';

/** Algo de la hoja que gasta (o recupera) un recurso: un rasgo, una opción, un conjuro o un ataque. */
export type UsoRecurso = { nombre: string; t?: string; coste?: string; texto?: string; src?: string; conjuro?: boolean };

/* El texto de un rasgo, sin el formato de la biblioteca, cortado en su primera frase */
const primeraFrase = (t: unknown) => {
  const s = String(t ?? '').replace(/\*\*|__|[*_`#>]/g, '').replace(/\s+/g, ' ').trim();
  const f = s.split(/(?<=\.)\s+(?=[A-ZÁÉÍÓÚÑ¿¡])/)[0] || '';
  return f.length > 140 ? f.slice(0, 137).trimEnd() + '…' : f;
};
const nucleo = (n: string) => norm(n).replace(/\(.*?\)/g, '').trim();
const ESPACIO = /espacios? de (conjuro|pacto)|\b(1|un) espacio\b/;

/** Nivel de un recurso de espacios ("slot3", "Espacios de pacto (nivel 2)"); 0 si no lo es. */
export function nivelEspacios(c: any, r: any): number {
  if (/^slot\d/.test(r.id)) return +r.id.slice(4);
  if (r.id === 'pacto' || /^espacios? de pacto/.test(norm(r.nombre))) return +(norm(r.nombre).match(/nivel (\d)/)?.[1] || c.nivelMax || 0);
  return 0;
}

/**
 * Para qué sirve un recurso y qué de la hoja depende de él: los rasgos y opciones que lo gastan, los conjuros que da
 * (o que se lanzan con esos espacios) y los ataques que lo usan.
 */
export function usosDeRecurso(c: any, r: any): { para: string; usos: UsoRecurso[] } {
  const usos: UsoRecurso[] = [], vistos = new Set<string>();
  const sumar = (u: UsoRecurso) => { const k = norm(u.nombre); if (!vistos.has(k)) { vistos.add(k); usos.push(u); } };
  const deRasgo = (e: any): UsoRecurso => ({ nombre: e.nombre, t: e.t, coste: e.coste, texto: primeraFrase(e.texto), src: e.src });
  const deConjuro = (s: any): UsoRecurso => ({ nombre: s.nombre, t: s.tiempo || 'accion', coste: s.coste, texto: primeraFrase(s.desc), src: s.rasgo, conjuro: true });
  const nv = nivelEspacios(c, r);
  const entries = c.entries || [], conjuros = c.conjuros || [];

  // El rasgo que da el recurso (mismo nombre) va primero: su texto dice para qué sirve
  const propio = entries.find((e: any) => nucleo(e.nombre) === nucleo(r.nombre));
  const conjuroPropio = conjuros.find((s: any) => s.recurso === r.id && nucleo(s.nombre) === nucleo(r.nombre));
  if (propio) sumar(deRasgo(propio));
  entries.filter((e: any) => e.recurso === r.id).forEach((e: any) => sumar(deRasgo(e)));
  // Los espacios también los gastan los rasgos que lo dicen (Castigo Divino, Fuente de Inspiración, Astucia Mágica…)
  if (nv) entries.filter((e: any) => ESPACIO.test(norm(e.texto)) || ESPACIO.test(norm(e.coste))).forEach((e: any) => sumar(deRasgo(e)));
  conjuros.filter((s: any) => s.recurso === r.id).forEach((s: any) => sumar(deConjuro(s)));
  if (nv) conjuros.filter((s: any) => +s.nivel > 0 && +s.nivel <= nv)
    .sort((a: any, b: any) => +a.nivel - +b.nivel)
    .forEach((s: any) => sumar({ ...deConjuro(s), coste: `Conjuro de nivel ${s.nivel}` }));
  [...(c.naturales || []), ...(c.armas || [])].filter((a: any) => a.gasta === r.id)
    .forEach((a: any) => sumar({ nombre: a.nombre, t: 'accion', texto: primeraFrase((a.notas || []).join('. ')) }));

  let para = '';
  if (r.id === 'pacto' || (nv && /pacto/.test(norm(r.nombre)))) para = `Para lanzar tus conjuros de brujo; siempre se lanzan a nivel ${nv}.`;
  else if (nv) para = `Para lanzar conjuros de nivel ${nv}, o de menos nivel subidos a ${nv}.`;
  else if (conjuroPropio) para = `Lanzas ${conjuroPropio.nombre} sin gastar espacio de conjuro.`;
  else if (propio?.texto) para = primeraFrase(propio.texto);
  else if (usos[0]?.texto) para = usos[0].texto;
  return { para, usos };
}
