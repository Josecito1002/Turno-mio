'use client';
/* Saca las líneas de texto de un PDF de guía (con su tamaño de letra) para pasarlas a Markdown. */

import { lineasAMarkdown, type Linea } from '../domain/pdf-texto';

const VERSION_PDFJS = '5.4.296';

export async function pdfAMarkdown(datos: ArrayBuffer, onPagina?: (n: number, total: number) => void): Promise<string> {
  const pdfjs = await import('pdfjs-dist');
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${VERSION_PDFJS}/build/pdf.worker.min.mjs`;
  const doc = await pdfjs.getDocument({ data: new Uint8Array(datos) }).promise;
  const lineas: Linea[] = [];
  for (let p = 1; p <= doc.numPages; p++) {
    onPagina?.(p, doc.numPages);
    const pag = await doc.getPage(p);
    const { items } = await pag.getTextContent();
    let actual: Linea | null = null;
    for (const it of items) {
      if (!('str' in it)) continue;
      const y = it.transform[5];
      const alto = Math.abs(it.transform[3]) || it.height;
      if (!actual || Math.abs(actual.y - y) > Math.max(2, alto * 0.5)) {
        if (actual && actual.texto.trim()) lineas.push(actual);
        actual = { texto: '', alto, y, pagina: p };
      }
      actual.texto += it.str;
      actual.alto = Math.max(actual.alto, alto);
      if (it.hasEOL) { if (actual.texto.trim()) lineas.push(actual); actual = null; }
    }
    if (actual && actual.texto.trim()) lineas.push(actual);
  }
  await doc.destroy();

  return lineasAMarkdown(lineas);
}
