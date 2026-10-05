/* Imágenes de una especie con una clase y subclase (el set de ilustraciones del grupo).
   Se guardan como las demás imágenes de la biblioteca (`LIB.img`, tabla lib_extra) con la clave
   "o|especie|subraza|clase|subclase|género"; la subraza y la subclase pueden ir vacías. */
import { ESPECIES } from '@/features/reglas/data/especies';
import { clasesParaElegir, getLib, getSubs, sinRepetidas } from './biblioteca';

export type Genero = 'm' | 'f' | '';
export type Origen = { especie: string; sub: string; clase: string; subclase: string; genero: Genero };

export const PREFIJO_ORIGEN = 'o|';
export const claveOrigen = (o: Origen) => PREFIJO_ORIGEN + [o.especie, o.sub, o.clase, o.subclase, o.genero].join('|');
export function leerClaveOrigen(k: string): Origen | null {
  if (!k.startsWith(PREFIJO_ORIGEN)) return null;
  const p = k.slice(PREFIJO_ORIGEN.length).split('|');
  if (p.length !== 5) return null;
  return { especie: p[0], sub: p[1], clase: p[2], subclase: p[3], genero: p[4] as Genero };
}

/** "Dracónido (Negro)" → "draconido-negro"; con `sinParentesis`, "Cambiante (Shifter)" → "cambiante" */
export const slugNombre = (s: unknown, sinParentesis = false) => String(s ?? '')
  .replace(sinParentesis ? /\([^)]*\)/g : /$^/, ' ')
  .toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const variantes = (n: unknown, k?: string) => new Set([slugNombre(n), slugNombre(n, true), ...(k ? [slugNombre(k.replace(/^lib:/, ''))] : [])].filter(Boolean));

/** Lo que se puede reconocer en un nombre de archivo: especies con sus subrazas, y clases con sus subclases */
export type Catalogo = {
  especies: [string, { n: string; subs?: Record<string, { n: string }> | null }][];
  clases: [string, { n: string; subs: { key: string; n: string }[] }][];
};

/** Las especies y clases que se pueden elegir al crear un personaje */
export function catalogoActual(): Catalogo {
  const LIB = getLib();
  const especies = [...Object.entries(ESPECIES).filter(([k]) => k !== 'custom'), ...sinRepetidas(LIB.especies, ESPECIES, '')] as Catalogo['especies'];
  const clases = clasesParaElegir().map(([k, c]) => [k, { n: c.n, subs: getSubs(null, k).filter(s => s.key !== 'cadena').map(s => ({ key: s.key, n: s.n })) }]) as Catalogo['clases'];
  return { especies, clases };
}

/** Nombres con que puede empezar un archivo → especie y subraza. "elfo-alto", "alto-elfo" y "elfo-drow" valen. */
function origenes(cat: Catalogo) {
  const m = new Map<string, { especie: string; sub: string }>();
  const poner = (v: string, x: { especie: string; sub: string }) => { if (v && !m.has(v)) m.set(v, x); };
  for (const [k, e] of cat.especies) {
    const E = variantes(e.n, k);
    E.forEach(v => poner(v, { especie: k, sub: '' }));
    for (const [s, x] of Object.entries(e.subs || {})) {
      const S = variantes(x.n, s), base = slugNombre(e.n, true).split('-');
      // Sin las palabras de la especie: "Alto Elfo" → "alto"
      const cortas = [...S].map(v => v.split('-').filter(w => !base.includes(w)).join('-')).filter(Boolean);
      for (const sv of [...S, ...cortas]) { E.forEach(ev => poner(`${ev}-${sv}`, { especie: k, sub: s })); }
      S.forEach(v => poner(v, { especie: k, sub: s }));
    }
  }
  return m;
}

const GENEROS: Record<string, Genero> = { masculino: 'm', hombre: 'm', macho: 'm', femenino: 'f', mujer: 'f', hembra: 'f' };

/** Reconoce "draconido-bronce-brujo-el-filo-maldito-femenino.jpg". La subclase y el género pueden faltar.
    Devuelve null si no encuentra especie y clase. */
export function reconocerArchivo(nombre: string, cat: Catalogo): Origen | null {
  const partes = slugNombre(nombre.replace(/\.[a-z0-9]+$/i, '')).split('-');
  const genero = GENEROS[partes[partes.length - 1]] ?? '';
  if (genero) partes.pop();
  const resto = partes.join('-'), orig = origenes(cat);
  let mejor: Origen | null = null, largo = -1;
  for (const [ck, c] of cat.clases) {
    const finales: [string, string][] = [];
    for (const cv of variantes(c.n, ck)) {
      finales.push([`-${cv}`, '']);
      for (const s of c.subs) for (const sv of variantes(s.n, s.key)) finales.push([`-${cv}-${sv}`, s.key]);
    }
    for (const [fin, sub] of finales) {
      if (fin.length <= largo || !resto.endsWith(fin)) continue;
      const o = orig.get(resto.slice(0, -fin.length));
      if (o) { mejor = { ...o, clase: ck, subclase: sub, genero }; largo = fin.length; }
    }
  }
  return mejor;
}

/** Claves de imagen para una especie y clase (y subclase, si se da), una por subraza y subclase. Con subraza elegida, solo las de esa
    subraza (si no hay, ninguna); mientras no se elija, las de la especie con cualquier subraza. Sin subclase valen todas las de la clase;
    con varias claves (dos subclases con el mismo nombre), cualquiera. */
export function imagenesOrigen(img: Record<string, unknown> | undefined, q: { especie: string; sub?: string; clase: string; subclase?: string | string[] }): string[] {
  if (!img || !q.especie || !q.clase) return [];
  const subs = q.subclase ? [q.subclase].flat() : null;
  const todas = Object.keys(img).filter(k => {
    const o = leerClaveOrigen(k);
    return !!o && img[k] && o.especie === q.especie && o.clase === q.clase && (!subs || subs.includes(o.subclase));
  });
  const elegibles = q.sub ? todas.filter(k => leerClaveOrigen(k)!.sub === q.sub) : todas;
  // El género se guarda pero todavía no se usa: una sola imagen por subraza y subclase
  const una = new Map<string, string>();
  for (const k of elegibles.sort()) { const o = leerClaveOrigen(k)!; const c = `${o.sub}|${o.subclase}`; if (!una.has(c)) una.set(c, k); }
  return [...una.values()];
}

/** Una clave por cada combinación distinta (subraza, clase, subclase) que cumpla `filtro`; el género todavía no se usa. */
function unaPorCombinacion(img: Record<string, unknown> | undefined, filtro: (o: Origen) => boolean): string[] {
  const una = new Map<string, string>();
  for (const k of Object.keys(img || {}).sort()) {
    const o = leerClaveOrigen(k);
    if (!o || !img![k] || !filtro(o)) continue;
    const c = `${o.especie}|${o.sub}|${o.clase}|${o.subclase}`;
    if (!una.has(c)) una.set(c, k);
  }
  return [...una.values()];
}

/** Claves de imagen del set de una especie con cualquier clase (para el rotor de la especie). */
export const imagenesDeEspecie = (img: Record<string, unknown> | undefined, especie: string) =>
  unaPorCombinacion(img, o => o.especie === especie);

/** Claves de imagen del set de una subraza con cualquier clase (para su tarjeta y su cuadro). */
export const imagenesDeSubraza = (img: Record<string, unknown> | undefined, especie: string, sub: string) =>
  unaPorCombinacion(img, o => o.especie === especie && o.sub === sub);

/** Imagen por defecto de un personaje: la de su especie con su clase y subclase; si no hay, la de su especie con otra clase;
    si tampoco, la de su clase y subclase con cualquier especie, y por último cualquiera de su clase. Siempre la misma para el mismo personaje (según `semilla`). */
export function imagenDeClase(img: Record<string, unknown> | undefined, q: { especie?: string; sub?: string; clase: string; subclase?: string }, semilla = '') {
  if (!img || !q.clase) return '';
  const opciones = [
    q.especie ? imagenesOrigen(img, { especie: q.especie, sub: q.sub, clase: q.clase, subclase: q.subclase || undefined }) : [],
    q.especie ? imagenesOrigen(img, { especie: q.especie, clase: q.clase }) : [],
    // Si no hay de esa clase, mejor un personaje de su misma especie (de otra clase) que uno de otra especie
    q.especie && q.sub ? unaPorCombinacion(img, o => o.especie === q.especie && o.sub === q.sub) : [],
    q.especie ? imagenesDeEspecie(img, q.especie) : [],
    q.subclase ? unaPorCombinacion(img, o => o.clase === q.clase && o.subclase === q.subclase) : [],
    unaPorCombinacion(img, o => o.clase === q.clase),
  ].find(l => l.length);
  if (!opciones) return '';
  let h = 0; for (const ch of semilla) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return opciones[h % opciones.length];
}

/** Imágenes que se le ofrecen a un personaje para elegir: solo de su especie (y su linaje, si ya lo tiene). Si hay de su clase,
    solo esas (de cualquiera de sus subclases); si no hay, las de otras clases de su misma especie. */
export function imagenesParaElegir(img: Record<string, unknown> | undefined, q: { especie?: string; sub?: string; clase?: string }): string[] {
  if (!img || !q.especie) return [];
  const deEspecie = Object.keys(img).filter(k => {
    const o = leerClaveOrigen(k);
    return !!o && !!img[k] && o.especie === q.especie && (!q.sub || o.sub === q.sub);
  }).sort();
  const deClase = q.clase ? deEspecie.filter(k => leerClaveOrigen(k)!.clase === q.clase) : [];
  return deClase.length ? deClase : deEspecie;
}
