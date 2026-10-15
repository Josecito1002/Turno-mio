/* Los documentos «para entregar a los jugadores» de una guía, sacados solos y maquetados para imprimir y recortar.
   Sirve tanto la guía en Markdown (`> **PARA ENTREGAR A LOS JUGADORES · Título**`) como el .txt de Homebrewery
   (`{{descriptive,entregar`). */

export type Entregable = { titulo: string; parrafos: string[] };

const ETIQUETA = 'PARA ENTREGAR A LOS JUGADORES';

function desdeMarkdown(texto: string): Entregable[] {
  const lineas = texto.replace(/\r\n?/g, '\n').split('\n');
  const out: Entregable[] = [];
  for (let i = 0; i < lineas.length; i++) {
    const m = /^>\s*\*\*PARA ENTREGAR A LOS JUGADORES(?:\s*·\s*(.*?))?\*\*\s*$/.exec(lineas[i]);
    if (!m) continue;
    const parrafos: string[] = [];
    while (i + 1 < lineas.length && lineas[i + 1].startsWith('>')) {
      const l = lineas[++i].replace(/^>\s?/, '').trim();
      if (l) parrafos.push(l);
    }
    out.push({ titulo: (m[1] || '').trim(), parrafos });
  }
  return out;
}

function desdeHomebrewery(texto: string): Entregable[] {
  const lineas = texto.replace(/\r\n?/g, '\n').split('\n');
  const out: Entregable[] = [];
  for (let i = 0; i < lineas.length; i++) {
    if (lineas[i].trim() !== '{{descriptive,entregar') continue;
    const cuerpo: string[] = [];
    while (i + 1 < lineas.length && lineas[i + 1].trim() !== '}}') cuerpo.push(lineas[++i]);
    let titulo = '', etiqueta = false;
    const resto: string[] = [];
    for (const l of cuerpo) {
      if (l.trim() === `{{lbl ${ETIQUETA}}}`) etiqueta = true;
      else if (/^#####\s/.test(l) && !titulo && !resto.join('').trim()) titulo = l.replace(/^#####\s+/, '').trim();
      else resto.push(l);
    }
    const parrafos = resto.join('\n').split(/\n\s*\n/).map((p) => p.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean);
    // la segunda mitad de un documento que se partió entre columnas no lleva etiqueta ni título
    if (!etiqueta && !titulo && out.length) out[out.length - 1].parrafos.push(...parrafos);
    else out.push({ titulo, parrafos });
  }
  return out;
}

export function extraerEntregables(texto: string): Entregable[] {
  const todos = texto.includes('{{descriptive,entregar') ? desdeHomebrewery(texto) : desdeMarkdown(texto);
  // la guía suele repetir cada documento: en su escena y en el apéndice; se imprime una vez, con título si alguna lo tiene
  const clave = (d: Entregable) => d.parrafos.join(' ').replace(/[^\p{L}\p{N}]+/gu, '').toLowerCase();
  const out: Entregable[] = [];
  for (const d of todos) {
    const igual = out.find((x) => clave(x) === clave(d));
    if (!igual) out.push(d);
    else if (!igual.titulo || (d.titulo && d.titulo.length < igual.titulo.length)) igual.titulo = d.titulo || igual.titulo;
  }
  return out;
}

const html = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Negrita y cursiva de Markdown a HTML, quitando los escapes de Homebrewery. */
export function enLinea(s: string): string {
  let t = html(s.replace(/\\([\\{}^*_[\]#>|~:.+-])/g, (_, c: string) => `\u0000${c.charCodeAt(0)}\u0000`));
  t = t.replace(/\*\*\*(.+?)\*\*\*/g, '<b><i>$1</i></b>').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>');
  return t.replace(/\u0000(\d+)\u0000/g, (_, n: string) => html(String.fromCharCode(Number(n))));
}

/** Página para imprimir: cada documento en su pergamino con línea de corte; el título va fuera, solo para el DM. */
export function paginaImprimibles(titulo: string, docs: Entregable[], origen: string): string {
  const fuente = (n: string, f: string, extra = '') =>
    `@font-face{font-family:'${n}';src:url('${origen}/homebrewery/fonts/5e/${f}.woff2') format('woff2');${extra}}`;
  const tarjetas = docs.map((d) => `<section class="doc">
  ${d.titulo ? `<p class="nombre">${html(d.titulo)}</p>` : ''}
  <div class="hoja">${d.parrafos.map((p) => `<p>${enLinea(p)}</p>`).join('\n')}</div>
</section>`).join('\n');
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${html(titulo)} · documentos para los jugadores</title>
<style>
${fuente('Bookinsanity', 'Bookinsanity')}
${fuente('Bookinsanity', 'Bookinsanity Italic', 'font-style:italic;')}
${fuente('Bookinsanity', 'Bookinsanity Bold', 'font-weight:bold;')}
${fuente('Bookinsanity', 'Bookinsanity Bold Italic', 'font-weight:bold;font-style:italic;')}
${fuente('MrEaves', 'Mr Eaves Small Caps')}
@page { size: letter; margin: 1.2cm; }
* { box-sizing: border-box; }
body { margin: 0; background: #e9e4da; color: #1f1a14; font-family: Bookinsanity, Georgia, serif; }
.barra { position: sticky; top: 0; display: flex; gap: 12px; align-items: center; justify-content: space-between;
  padding: 10px 16px; background: #58180d; color: #fff; font-family: MrEaves, Georgia, serif; font-size: 18px; }
.barra button { font: inherit; font-size: 16px; padding: 6px 14px; border: 0; border-radius: 6px; background: #fff; color: #58180d; cursor: pointer; }
main { max-width: 19cm; margin: 0 auto; padding: 16px; }
.doc { break-inside: avoid; page-break-inside: avoid; margin: 0 0 0.9cm; }
.nombre { margin: 0 0 4px; font-family: MrEaves, Georgia, serif; font-size: 13px; letter-spacing: .04em; color: #6d6455; }
.hoja { padding: 1.1cm 1.3cm; border: 1px dashed #8a7d68; font-size: 15px; line-height: 1.45;
  background: #f4ead2 url('https://homebrewery.naturalcrit.com/assets/parchmentBackground.jpg') center / cover;
  -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.hoja p { margin: 0 0 .55em; }
.hoja p:last-child { margin-bottom: 0; }
.vacio { font-family: Georgia, serif; color: #6d6455; }
@media print { body { background: none; } .barra { display: none; } main { padding: 0; max-width: none; } }
</style></head><body>
<div class="barra"><span>${html(titulo)}: ${docs.length} documento${docs.length === 1 ? '' : 's'} para recortar</span><button onclick="print()">Imprimir</button></div>
<main>${tarjetas || '<p class="vacio">Esta guía no tiene documentos para entregar.</p>'}</main>
</body></html>`;
}
