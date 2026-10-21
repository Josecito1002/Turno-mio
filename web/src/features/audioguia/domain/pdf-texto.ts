/* Las líneas de un PDF de guía → Markdown aproximado para el lector. Los títulos salen del tamaño de la letra: lo más
   grande es capítulo, lo siguiente sección, y las líneas tipo «A3. Comedor» son zonas. Se quitan los números de página
   y las cabeceras que se repiten en cada hoja. Con el .md se oye mejor: el PDF no dice dónde acaba cada recuadro. */

export type Linea = { texto: string; alto: number; y: number; pagina: number };

const redondear = (n: number) => Math.round(n * 2) / 2;

export function lineasAMarkdown(lineas: Linea[]): string {
  // lo que se repite en muchas páginas es cabecera o pie
  const veces = new Map<string, Set<number>>();
  for (const l of lineas) {
    const k = l.texto.trim().replace(/\d+/g, '#');
    if (!veces.has(k)) veces.set(k, new Set());
    veces.get(k)!.add(l.pagina);
  }
  const paginas = new Set(lineas.map((l) => l.pagina)).size;
  // las cabeceras y los pies van en letra más pequeña que el texto
  const letras = new Map<number, number>();
  for (const l of lineas) letras.set(redondear(l.alto), (letras.get(redondear(l.alto)) || 0) + l.texto.length);
  const normal = [...letras.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || 10;
  const repetida = (l: Linea) => paginas >= 4 && redondear(l.alto) < normal && (veces.get(l.texto.trim().replace(/\d+/g, '#'))?.size || 0) >= paginas * 0.3;
  const utiles = lineas.filter((l) => /\p{L}/u.test(l.texto) && !repetida(l));

  // tamaño de la letra del texto normal: el que más letras tiene
  const porTam = new Map<number, number>();
  const paginasDe = new Map<number, Set<number>>();
  /** la línea más larga de cada tamaño: si es de una o dos letras, son capitulares, no títulos */
  const largo = new Map<number, number>();
  for (const l of utiles) {
    const t = redondear(l.alto);
    largo.set(t, Math.max(largo.get(t) || 0, l.texto.trim().length));
    porTam.set(t, (porTam.get(t) || 0) + l.texto.length);
    if (!paginasDe.has(t)) paginasDe.set(t, new Set());
    paginasDe.get(t)!.add(l.pagina);
  }
  const cuerpo = [...porTam.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || 10;
  // los tamaños que solo salen en la portada son del título de la guía
  const enPortada = (t: number) => [...(paginasDe.get(t) || [])].every((p) => p === 1);
  const titulos = [...porTam.keys()].filter((t) => t >= cuerpo * 1.25 && !enPortada(t) && (largo.get(t) || 0) > 2).sort((a, b) => b - a);
  const nivelDe = (alto: number) => {
    const t = redondear(alto);
    if (t >= cuerpo * 1.25 && enPortada(t)) return 1;
    const i = titulos.indexOf(t);
    return i < 0 ? 0 : Math.min(i + 2, 4);
  };

  const out: string[] = [];
  let parrafo = '';
  let anterior: Linea | null = null;
  /** el último título escrito, para juntarle la segunda línea si el título ocupa dos */
  let ultimoTitulo = null as { i: number; n: number; l: Linea } | null;
  let hayTitulo = false;
  let enIndice = false;
  /** letra capitular: va pegada al principio del párrafo siguiente */
  let capitular = '';
  const soltar = () => { if (parrafo.trim()) out.push(parrafo.trim(), ''); parrafo = ''; };
  const titulo = (n: number, t: string, l: Linea) => {
    soltar();
    anterior = null;
    const u = ultimoTitulo;
    if (u && u.n === n && u.l.pagina === l.pagina && Math.abs(u.l.y - l.y) < l.alto * 1.8 && out.length === u.i + 2) {
      out[u.i] += ` ${t}`;
      u.l = l;
      return;
    }
    out.push(`${'#'.repeat(n)} ${t}`, '');
    ultimoTitulo = { i: out.length - 2, n, l };
  };
  for (const l of utiles) {
    const t = oracion(l.texto.replace(/\s+/g, ' ').trim());
    const n = nivelDe(l.alto);
    if (t.length <= 2 && redondear(l.alto) >= cuerpo * 1.25) { capitular = t; continue; }
    if (n === 1) {
      if (!hayTitulo) { titulo(1, t, l); hayTitulo = true; }
      else if (ultimoTitulo?.n === 1) titulo(1, t, l);
      continue;
    }
    if (n) {
      enIndice = /^[íi]ndice$/i.test(t);
      if (!enIndice) titulo(n, t, l);
      continue;
    }
    if (enIndice) continue;
    if (/^[A-Z]\d{1,2}[a-z]?\.\s+\S/.test(t) && t.length < 60) {
      titulo(4, t, l);
      continue;
    }
    ultimoTitulo = null;
    // los rótulos de recuadro (LEER EN VOZ ALTA · …) se leen como frase normal
    if (t.length > 3 && t === l.texto.replace(/\s+/g, ' ').trim().toUpperCase() && /\p{Lu}{3}/u.test(t)) {
      soltar();
      out.push(`${oracion(t)}.`, '');
      anterior = null;
      continue;
    }
    const salto = anterior && anterior.pagina === l.pagina && Math.abs(anterior.y - l.y) > l.alto * 1.9;
    if (salto || /^[•·▪❖-]\s/.test(t)) soltar();
    const limpio = capitular + t.replace(/^[•▪❖]\s*/, '');
    capitular = '';
    if (parrafo.endsWith('-') && /^\p{Ll}/u.test(limpio)) parrafo = parrafo.slice(0, -1) + limpio;
    else parrafo += (parrafo ? ' ' : '') + limpio;
    anterior = l;
  }
  soltar();
  return out.join('\n');
}

/** «ANTES DE JUGAR» → «Antes de jugar»; lo que no va todo en mayúsculas se deja igual. */
function oracion(t: string): string {
  if (t !== t.toUpperCase() || !/\p{Lu}{3}/u.test(t)) return t;
  const m = t.toLowerCase();
  return (m.charAt(0).toUpperCase() + m.slice(1)).replace(/^(Ap[ée]ndice) (\p{L})\b/u, (_, a: string, l: string) => `${a} ${l.toUpperCase()}`);
}
