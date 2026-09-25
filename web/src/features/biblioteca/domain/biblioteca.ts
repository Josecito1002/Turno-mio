/* eslint-disable @typescript-eslint/no-explicit-any */
import { norm } from '@/shared/utils/texto';
import { CLASES } from '@/features/reglas/data/clases';
import { ESPECIES, BESTIAS_COLADAS } from '@/features/reglas/data/especies';
import { TRASFONDOS } from '@/features/reglas/data/trasfondos';
import { DOTES } from '@/features/reglas/data/dotes';
import { SUBCLASES } from '@/features/reglas/data/subclases';
import { CATALOGO } from '@/features/reglas/data/conjuros';
import { DESC_ESPECIES, DESC_CLASES, DESC_SUBCLASES } from '@/features/reglas/data/descripciones';
import { claseBase } from '@/features/reglas/domain/restricciones';

/** Contenido extra compartido por todos (clases, especies, etc. que no vienen en las reglas base). */
export type Biblioteca = {
  clases: Record<string, any>;
  especies: Record<string, any>;
  trasfondos: Record<string, any>;
  dotes: Record<string, any>;
  conjuros: Record<string, any>;
  desc?: Record<string, string>;
  img?: Record<string, string>;
  imgOrig?: Record<string, string>;
  imgCrop?: Record<string, { zoom: number; cx: number; cy: number }>;
  tipos?: Record<string, string>;
};

export const bibliotecaVacia = (): Biblioteca => ({ clases: {}, especies: {}, trasfondos: {}, dotes: {}, conjuros: {}, desc: {}, img: {} });

/* La biblioteca vive en memoria en el cliente, como en la versión original: el cálculo de la hoja la consulta directamente. */
let LIB: Biblioteca = bibliotecaVacia();
export const getLib = () => LIB;
export function setLib(lib: Partial<Biblioteca>) { LIB = { ...bibliotecaVacia(), ...lib } as Biblioteca; }

export const todosConjuros = (): any[] => {
  const vistos = new Set(CATALOGO.map((s: any) => norm(s.nombre)));
  return [...CATALOGO, ...Object.values(LIB.conjuros || {}).filter((s: any) => !vistos.has(norm(s.nombre)))];
};
export const getE = (pj: any, k: string) => ESPECIES[k] || LIB.especies[k] || pj?.contenido?.especies?.[k] || null;
export const getC = (pj: any, k: string) => CLASES[k] || (LIB.clases[k]?.dado ? LIB.clases[k] : null) || pj?.contenido?.clases?.[k] || null;
export const getT = (pj: any, k: string) => TRASFONDOS[k] || LIB.trasfondos[k] || pj?.contenido?.trasfondos?.[k] || null;
export const getD = (pj: any, k: string) => DOTES[k] || LIB.dotes[k] || pj?.contenido?.dotes?.[k] || null;

/* Subclases de biblioteca de una clase. Para una clase base incluye también las de las clases de
   biblioteca que derivan de ella: el Artífice importado como "Arcanista (Artífice)" guarda ahí las suyas. */
export function subclasesLib(clase: string): Record<string, any> {
  const derivadas = CLASES[clase]
    ? Object.entries(LIB.clases).filter(([k, v]) => k !== clase && !CLASES[k] && v?.n && claseBase(k, v) === clase)
    : [];
  return Object.assign({}, ...derivadas.map(([, v]) => v.subclases || {}), LIB.clases[clase]?.subclases || {});
}

export function getSubs(pj: any, clase: string): any[] {
  const out = SUBCLASES.filter((s: any) => s.clase === clase);
  // Primero las de la biblioteca, en su orden; después las que solo trae el personaje (copiadas al compartirlo).
  // Así la subclase elegida no salta al primer lugar de la lista.
  const lib = subclasesLib(clase);
  const delPj = Object.fromEntries(Object.entries(pj?.contenido?.subclases || {})
    .filter(([k, s]: any) => s.clase === clase && !lib[k.replace(/^lib:/, '')]).map(([k, s]) => [k.replace(/^lib:/, ''), s]));
  const libS = { ...lib, ...delPj };
  Object.entries(libS).forEach(([k, s]: [string, any]) => out.push({ key: 'lib:' + k, clase, n: s.n, hasta: 20, lib: true, rasgos: s.rasgos || [] }));
  return out;
}
export function allDotes(): Record<string, any> { return { ...DOTES, ...LIB.dotes }; }

/* Nivel en que la clase elige subclase: 3 en las de 2024; en las de biblioteca, el nivel más común en que empiezan sus subclases */
export function subNivel(pj: any, clase: string) {
  if (CLASES[clase]) return 3;
  const inicios = getSubs(pj, clase).filter(s => s.key !== 'cadena' && s.rasgos?.length).map(s => Math.min(...s.rasgos.map((r: any) => +r.n || 3)));
  if (!inicios.length) return 3;
  const cuenta: Record<number, number> = {};
  inicios.forEach(n => (cuenta[n] = (cuenta[n] || 0) + 1));
  return Math.max(1, +Object.entries(cuenta).sort((x, y) => y[1] - x[1] || +x[0] - +y[0])[0][0]);
}
export const getAltos = (pj: any, k: string) => LIB.clases[k]?.rasgosAltos || pj?.contenido?.altos?.[k]?.rasgos || null;
export const getSubAltos = (pj: any, k: string, sk: string) => LIB.clases[k]?.subAltos?.[sk] || pj?.contenido?.altos?.[k]?.subs?.[sk] || null;

export const descEspecie = (k: string) => LIB.desc?.[k] ?? DESC_ESPECIES[String(k).replace(/^lib:/, '')] ?? '';
export const descClase = (k: string) => LIB.desc?.['c:' + k] ?? DESC_CLASES[String(k).replace(/^lib:/, '')] ?? '';
export const descSubclase = (k: string) => LIB.desc?.['s:' + k] ?? DESC_SUBCLASES[String(k).replace(/^lib:/, '')] ?? '';

export function limpiarBestias() {
  const fuera: string[] = [];
  BESTIAS_COLADAS.forEach((k: string) => { if (LIB.especies[k]) { fuera.push(LIB.especies[k].n); delete LIB.especies[k]; } });
  return fuera;
}

/* Mete en la biblioteca el contenido de un personaje o de un paquete */
export function mezclarContenido(ct: any): string[] {
  const nuevo: string[] = [];
  if (!ct) return nuevo;
  Object.entries(ct.especies || {}).forEach(([k, v]: any) => { if (!LIB.especies[k]) { LIB.especies[k] = v; nuevo.push(`especie ${v.n}`); } });
  Object.entries(ct.trasfondos || {}).forEach(([k, v]: any) => { if (!LIB.trasfondos[k]) { LIB.trasfondos[k] = v; nuevo.push(`trasfondo ${v.n}`); } });
  Object.entries(ct.dotes || {}).forEach(([k, v]: any) => { if (!LIB.dotes[k]) { LIB.dotes[k] = v; nuevo.push(`dote ${v.n}`); } });
  LIB.desc = LIB.desc || {}; LIB.img = LIB.img || {};
  Object.entries(ct.imgCrop || {}).forEach(([k, v]: any) => { LIB.imgCrop = LIB.imgCrop || {}; if (!LIB.imgCrop[k]) LIB.imgCrop[k] = v; });
  Object.entries(ct.desc || {}).forEach(([k, v]: any) => { if (LIB.desc![k] == null) LIB.desc![k] = v; });
  Object.entries(ct.img || {}).forEach(([k, v]: any) => { if (!LIB.img![k]) { LIB.img![k] = v; nuevo.push('imagen ' + k); } });
  Object.entries(ct.tipos || {}).forEach(([k, v]: any) => { LIB.tipos = LIB.tipos || {}; if (!LIB.tipos[k]) LIB.tipos[k] = v; });
  LIB.conjuros = LIB.conjuros || {};
  Object.entries(ct.conjuros || {}).forEach(([k, v]: any) => { if (!LIB.conjuros[k]) { LIB.conjuros[k] = v; nuevo.push(`conjuro ${v.nombre}`); } });
  Object.entries(ct.clases || {}).forEach(([k, v]: any) => {
    const cur = (LIB.clases[k] = LIB.clases[k] || { subclases: {} });
    if (v.dado && !cur.dado) { Object.assign(cur, { ...v, subclases: cur.subclases }); nuevo.push(`clase ${v.n}`); }
    Object.entries(v.subclases || {}).forEach(([sk, s]: any) => { if (!cur.subclases[sk]) { cur.subclases[sk] = s; nuevo.push(`subclase ${s.n}`); } });
    if (v.rasgosAltos && !cur.rasgosAltos) cur.rasgosAltos = v.rasgosAltos;
    Object.entries(v.subAltos || {}).forEach(([sk, r]) => { cur.subAltos = cur.subAltos || {}; if (!cur.subAltos[sk]) cur.subAltos[sk] = r; });
  });
  Object.entries(ct.altos || {}).forEach(([k, a]: any) => {
    const cur = (LIB.clases[k] = LIB.clases[k] || { subclases: {} });
    if (a.rasgos && !cur.rasgosAltos) cur.rasgosAltos = a.rasgos;
    Object.entries(a.subs || {}).forEach(([sk, r]) => { cur.subAltos = cur.subAltos || {}; if (!cur.subAltos[sk]) cur.subAltos[sk] = r; });
  });
  Object.entries(ct.subclases || {}).forEach(([k, s]: any) => {
    const cur = (LIB.clases[s.clase] = LIB.clases[s.clase] || { subclases: {} });
    const sk = k.replace(/^lib:/, '');
    if (!cur.subclases[sk]) { cur.subclases[sk] = { n: s.n, rasgos: s.rasgos }; nuevo.push(`subclase ${s.n}`); }
  });
  return nuevo;
}

/** Entradas de la biblioteca sin las que repiten el nombre de una de las reglas base (salvo la que ya está elegida). */
export function sinRepetidas(lib: Record<string, any>, base: Record<string, any>, elegida?: string): [string, any][] {
  const nombres = new Set(Object.values(base).map((x: any) => norm(x.n)));
  return Object.entries(lib).filter(([k, v]) => k === elegida || !nombres.has(norm(v?.n)));
}

/* Clases para elegir: las de las reglas y las de biblioteca. Una clase de reglas que solo es un esbozo y tiene
   su versión completa en la biblioteca (el Artífice, importado como "Arcanista (Artífice)") sale una sola vez:
   la de biblioteca, con el nombre de la clase base. La de reglas solo queda si el personaje ya la tiene. */
export function clasesParaElegir(elegida?: string): [string, any][] {
  const lib = sinRepetidas(LIB.clases, CLASES, elegida).filter(([k, x]) => x?.dado && !CLASES[k]);
  const reemplazo: Record<string, string> = {};
  for (const [k, x] of lib) { const b = claseBase(k, x); if (b && b !== k && !reemplazo[b]) reemplazo[b] = k; }
  const base = Object.entries(CLASES).filter(([k]) => !reemplazo[k] || k === elegida);
  return [...base, ...lib.map(([k, x]): [string, any] => {
    const b = Object.keys(reemplazo).find(bk => reemplazo[bk] === k);
    return b && b !== elegida ? [k, { ...x, n: CLASES[b].n }] : [k, x];
  })];
}
