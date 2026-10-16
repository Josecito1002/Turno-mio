/* Reparte los bloques de una guía en páginas de Homebrewery. No calcula alturas: se las pregunta a un «medidor» que
   pinta el Markdown con el mismo motor y el mismo tema que la web (en la app, un iframe oculto), así nada se sale. */
import type { Bloque, MetaGuia } from './guia';
import { ESTILO_GUIA } from './estilo';

/** Dónde cae cada elemento de la página: columna (0, 1, o -1 si va a lo ancho), arriba y abajo. */
export type Caja = { c0: number; c1: number; top: number; bottom: number } | null;
export type Medidor = {
  /** cuánto se sale de la página ese Markdown (0 si cabe) */
  sobra(md: string): Promise<number>;
  /** las cajas de cada elemento, y cuántas son de `prefijo` */
  cajas(md: string, prefijo: string): Promise<{ n: number; els: Caja[]; alto: number }>;
};

/** La ilustración de las tres velas que llevan de fondo las portadas de las guías (la misma de los .txt de Homebrewery). */
export const IMAGEN_PORTADA = 'https://raw.githubusercontent.com/Josecito1002/Turno-mio/homebrewery-imagenes/img/cover_ses2.jpeg';

const unir = (bl: Bloque[]) => bl.map((b) => b.md).join('\n\n');
const esTitulo = (b: Bloque) => b.kind === 'h' || b.kind === 'h1' || b.kind === 'deck';

type Particion = { parts: string[]; make: (a: string[], rest: string[]) => [Bloque, Bloque] };

/** Partir un párrafo por frases, una lista por líneas, un recuadro por párrafos o una tabla por filas. */
export function partir(b: Bloque): Particion | null {
  if (b.kind === 'p') {
    const raw = (b.md.match(/[^.!?»]+(?:[.!?»]+[*"»)]*\s*|$)/g) || []).filter((x) => x.trim());
    // no partir dentro de una negrita o cursiva: se juntan frases hasta que las marcas cuadren
    const s: string[] = [];
    let acc = '';
    for (const x of raw) {
      acc += x;
      if (((acc.replace(/\\\*/g, '').match(/\*/g) || []).length) % 2 === 0) { s.push(acc); acc = ''; }
    }
    if (acc) s.push(acc);
    if (s.length < 3) return null;
    return { parts: s, make: (a, rest) => [{ ...b, md: a.join('').trim() }, { ...b, md: rest.join('').trim(), cont: true }] };
  }
  if (b.kind === 'list') {
    const s = b.md.split('\n');
    if (s.length < 2) return null;
    return { parts: s, make: (a, rest) => [{ ...b, md: a.join('\n') }, { ...b, md: rest.join('\n') }] };
  }
  if (b.kind === 'box' && b.paras && b.paras.length >= 2) {
    const mk = (a: string[], head: boolean) => [b.open, ...(head && b.head ? [b.head] : []), a.join('\n\n')].join('\n') + '\n}}';
    return { parts: b.paras, make: (a, rest) => [{ ...b, md: mk(a, true), paras: a }, { ...b, md: mk(rest, false), head: '', paras: rest }] };
  }
  if (b.kind === 'table') {
    const lines = b.md.split('\n');
    const head = lines.slice(0, 2), rows = lines.slice(2);
    // una tabla corta no se parte: se pierde el contexto (una página que solo dice «d8»)
    if (rows.length < 8) return null;
    return { parts: rows, make: (a, rest) => [{ ...b, md: [...head, ...a].join('\n') }, { ...b, md: [...head, ...rest].join('\n') }] };
  }
  return null;
}

/** Devuelve el texto completo para Homebrewery: estilo, portada, índice y páginas con su pie. */
export async function paginar(bloquesIn: Bloque[], meta: MetaGuia, m: Medidor, progreso?: (paginas: number) => void): Promise<string> {
  const cabe = async (bl: Bloque[]) => (await m.sobra(unir(bl))) === 0;
  const blocks = bloquesIn.map((b) => ({ ...b }));
  const pages: Bloque[][] = [];
  let cur: Bloque[] = [];
  const nueva = () => { pages.push(cur); cur = []; progreso?.(pages.length); };

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.kind === 'h1' && cur.length) nueva();
    const tryBl = [...cur, b];
    if (await cabe(tryBl)) {
      // el bloque empieza arriba en la otra columna: ¿se queda un título huérfano o un hueco grande al pie?
      let k = cur.length;
      while (k > 0 && esTitulo(cur[k - 1])) k--;
      const L = await m.cajas(unir(tryBl), unir(cur.slice(0, k)));
      const primero = L.els[L.n];
      const deB = (await m.cajas(unir(tryBl), unir(cur))).n;
      const bEl = L.els[deB];
      if (primero && bEl && k < cur.length && k > 0 && primero.c0 === 0 && bEl.c0 === 1) {
        // título al pie de la columna 1 y su contenido arriba de la 2: el título pasa a la columna 2
        const conCol = [...cur.slice(0, k), { md: '\\column', kind: 'col' as const }, ...cur.slice(k), b];
        if (await cabe(conCol)) { cur = conCol; continue; }
      }
      const prev = deB > 0 ? L.els[deB - 1] : null;
      const sp = b.kind === 'box' ? partir(b) : null;
      if (sp && prev && bEl && prev.c1 === 0 && bEl.c0 === 1 && L.alto - prev.bottom > L.alto * 0.08 && k === cur.length) {
        // el recuadro saltó entero a la columna 2 dejando un hueco: se parte para llenarlo
        let lo = 0, hi = sp.parts.length - 1;
        while (lo < hi) {
          const mid = Math.ceil((lo + hi) / 2);
          const [a] = sp.make(sp.parts.slice(0, mid), sp.parts.slice(mid));
          const La = await m.cajas(unir([...cur, a]), unir(cur));
          const e = La.els[La.n];
          if (e && e.c1 === 0) lo = mid; else hi = mid - 1;
        }
        if (lo >= 1) {
          const [a, rest] = sp.make(sp.parts.slice(0, lo), sp.parts.slice(lo));
          cur.push(a);
          blocks.splice(i + 1, 0, rest);
          continue;
        }
      }
      cur = tryBl;
      continue;
    }
    // no cabe: si se puede partir, meter lo que quepa
    const sp = partir(b);
    if (sp && cur.length) {
      let lo = 0, hi = sp.parts.length - 1;
      while (lo < hi) {
        const mid = Math.ceil((lo + hi) / 2);
        const [a] = sp.make(sp.parts.slice(0, mid), sp.parts.slice(mid));
        if (await cabe([...cur, a])) lo = mid; else hi = mid - 1;
      }
      // de una tabla partida, al menos tres filas en cada lado
      if (b.kind === 'table') lo = Math.min(lo, sp.parts.length - 3);
      if (lo >= 2) {
        const [a, rest] = sp.make(sp.parts.slice(0, lo), sp.parts.slice(lo));
        cur.push(a);
        nueva();
        blocks.splice(i + 1, 0, rest);
        continue;
      }
    }
    if (!cur.length) {
      // ni sola en una página vacía: se parte o se deja como está
      if (sp) {
        let lo = 1, hi = sp.parts.length - 1;
        while (lo < hi) {
          const mid = Math.ceil((lo + hi) / 2);
          const [a] = sp.make(sp.parts.slice(0, mid), sp.parts.slice(mid));
          if (await cabe([a])) lo = mid; else hi = mid - 1;
        }
        const [a, rest] = sp.make(sp.parts.slice(0, lo), sp.parts.slice(lo));
        cur = [a];
        nueva();
        blocks.splice(i + 1, 0, rest);
        continue;
      }
      cur = [b];
      nueva();
      continue;
    }
    // los títulos sueltos al final de la página se van con lo que encabezan
    const carry: Bloque[] = [];
    while (cur.length && esTitulo(cur[cur.length - 1])) carry.unshift(cur.pop()!);
    if (!cur.length) { cur = [...carry, b]; nueva(); continue; }
    nueva();
    cur = carry;
    i--; // reintentar este bloque en la página nueva
  }
  if (cur.length) nueva();

  // ---- portada, índice y pie ----
  const limpio = (s: string) => s.replace(/[[\]{}]/g, '');
  const sesion = /Sesi[oó]n\s+(\d+)/i.exec(meta.subtitle);
  const cover = ['{{frontCover}}', '', `# ${limpio(meta.title)}`, `## ${limpio(meta.subtitle)}`, '___',
    ...(sesion ? ['', `{{banner CAMPAÑA · SESIÓN ${sesion[1]}}}`] : []),
    '', `![](${IMAGEN_PORTADA}){position:absolute,bottom:0,left:0,height:100%,width:100%,object-fit:cover}`].join('\n');
  const heads: { b: Bloque; n: number }[] = [];
  pages.forEach((pg, n) => pg.forEach((b) => { if ((b.kind === 'h1' || (b.kind === 'h' && b.level === 2)) && !b.cont) heads.push({ b, n }); }));
  const tocMd = (num: (n: number) => number) => {
    const lines = heads.map(({ b, n }) => {
      const t = limpio(b.text || '');
      const p = num(n);
      return b.kind === 'h1' ? `- ### [{{ ${t}}}{{ ${p}}}](#p${p})` : `  - #### [{{ ${t}}}{{ ${p}}}](#p${p})`;
    });
    return `{{toc,wide\n# Índice\n\n${lines.join('\n')}\n}}`.split('\n');
  };
  // el índice puede no caber en una página: se reparte por líneas (con números de dos cifras para medir)
  const tocPages: [number, number][] = [];
  if (heads.length) {
    const all = tocMd(() => 99), head = all.slice(0, 3), items = all.slice(3, -1);
    let start = 0;
    while (start < items.length) {
      let lo = start + 1, hi = items.length;
      while (lo < hi) {
        const mid = Math.ceil((lo + hi) / 2);
        if ((await m.sobra([...head, ...items.slice(start, mid), '}}'].join('\n'))) === 0) lo = mid; else hi = mid - 1;
      }
      tocPages.push([start, lo]);
      start = lo;
    }
  }
  const offset = 1 + tocPages.length;
  const tocAll = tocMd((n) => n + offset + 1);
  const tocHead = tocAll.slice(0, 3), tocItems = tocAll.slice(3, -1);
  const tocTexts = tocPages.map(([a, b], k) => [...(k ? ['{{toc,wide'] : tocHead), ...tocItems.slice(a, b), '}}'].join('\n'));
  const footer = `\n\n{{pageNumber,auto}}\n{{footnote ${limpio(meta.running.split(' · ').pop() || '')}}}`;
  return [
    `<style>\n${ESTILO_GUIA.trim()}\n</style>\n\n${cover}`,
    ...tocTexts.map((t) => `${t}${footer}`),
    ...pages.map((pg) => `${unir(pg)}${footer}`),
  ].join('\n\n\\page\n\n');
}
