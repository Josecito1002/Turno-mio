/* Lo que se imprime de una guía, sacado solo y maquetado: los documentos «para entregar a los jugadores» para
   recortar, los mapas a hoja completa y, para el DM, las estadísticas y la hoja de control.
   Los documentos y los mapas salen tanto de la guía en Markdown (`> **PARA ENTREGAR A LOS JUGADORES · Título**`)
   como del .txt de Homebrewery (`{{descriptive,entregar`); las secciones del DM, solo del Markdown. */

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

export type Mapa = { titulo: string; url: string; nota: string };
/** Un apéndice para el DM, con su Markdown tal cual. */
export type SeccionDm = { titulo: string; md: string };
export type Imprimibles = { docs: Entregable[]; mapas: Mapa[]; dm: SeccionDm[] };

type Apendice = { titulo: string; lineas: string[] };

/** Los capítulos «Apéndice …» de la guía (`## Apéndice` en el Markdown, `# Apéndice` en el .txt). */
function apendices(texto: string): Apendice[] {
  const out: Apendice[] = [];
  let cur: Apendice | null = null;
  let nivel = 0;
  for (const l of texto.replace(/\r\n?/g, '\n').split('\n')) {
    const h = /^(#{1,2})\s+(.*)$/.exec(l);
    if (h && (!cur || h[1].length <= nivel)) {
      cur = /^Ap[ée]ndice\b/i.test(h[2]) ? { titulo: h[2].trim(), lineas: [] } : null;
      nivel = h[1].length;
      if (cur) out.push(cur);
      continue;
    }
    cur?.lineas.push(l);
  }
  return out;
}

/** Los mapas del apéndice de mapas, uno por imagen; el título es el del apartado y, si hay varias, su pie. */
export function extraerMapas(texto: string): Mapa[] {
  const ap = apendices(texto).find((a) => /mapas/i.test(a.titulo));
  if (!ap) return [];
  const out: Mapa[] = [];
  let seccion = '';
  let ultimo: Mapa | null = null;
  for (const l of ap.lineas) {
    const t = l.trim();
    const h = /^#{3,6}\s+(.*)$/.exec(t);
    if (h) { seccion = h[1].trim(); ultimo = null; continue; }
    const img = /^!\[([^\]]*)\]\(([^)\s]+)\)/.exec(t);
    if (img) {
      const pie = img[1].trim().replace(/\.$/, '');
      ultimo = { titulo: [seccion, pie].filter(Boolean).join(' · ') || 'Mapa', url: img[2], nota: '' };
      out.push(ultimo);
      continue;
    }
    // la leyenda que va justo debajo del mapa (no los párrafos sueltos ni el código de Homebrewery)
    if (ultimo && t && !/^[{}\\|<]/.test(t) && !t.startsWith('{{')) ultimo.nota = [ultimo.nota, t.replace(/^\*(.*)\*$/, '$1')].filter(Boolean).join(' ');
  }
  return out;
}

/** Las estadísticas y la hoja de control (con el reloj o el contador de la sesión): solo del Markdown. */
export function extraerSeccionesDm(texto: string): SeccionDm[] {
  if (texto.includes('{{frontCover}}')) return [];
  return apendices(texto)
    .filter((a) => /estad[íi]sticas|control/i.test(a.titulo))
    .map((a) => ({ titulo: a.titulo.replace(/^Ap[ée]ndice\s+\w+\s*:\s*/i, ''), md: a.lineas.join('\n').trim() }))
    .filter((a) => a.md);
}

export function extraerImprimibles(texto: string): Imprimibles {
  // si la guía junta los documentos en su apéndice, se imprimen esos: en las escenas a veces van a trozos o resumidos
  const ap = apendices(texto).find((a) => /documentos/i.test(a.titulo));
  const delApendice = ap ? extraerEntregables(ap.lineas.join('\n')) : [];
  return { docs: delApendice.length ? delApendice : extraerEntregables(texto), mapas: extraerMapas(texto), dm: extraerSeccionesDm(texto) };
}

export const cuantosImprimibles = (x: Imprimibles) => x.docs.length + x.mapas.length + (x.dm.length ? 1 : 0);

const html = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Negrita y cursiva de Markdown a HTML, quitando los escapes de Homebrewery. */
export function enLinea(s: string): string {
  let t = html(s.replace(/\\([\\{}^*_[\]#>|~:.+-])/g, (_, c: string) => `\u0000${c.charCodeAt(0)}\u0000`));
  t = t.replace(/\*\*\*(.+?)\*\*\*/g, '<b><i>$1</i></b>').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>');
  return t.replace(/\u0000(\d+)\u0000/g, (_, n: string) => html(String.fromCharCode(Number(n))));
}

const celdas = (l: string) => l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());

/** Markdown sencillo de las guías a HTML: títulos, párrafos, listas, tablas, recuadros (`> **ETIQUETA · Título**`) y
    la fila de casillas de un reloj (`**1 2 3 … 10**`). Las imágenes se quitan: en la mesa no hacen falta. */
export function mdAHtml(md: string): string {
  const ls = md.replace(/\r\n?/g, '\n').split('\n');
  const out: string[] = [];
  for (let i = 0; i < ls.length; i++) {
    const t = ls[i].trim();
    if (!t || /^!\[/.test(t) || t === '___' || t === '---') continue;
    const h = /^(#{1,6})\s+(.*)$/.exec(t);
    if (h) { out.push(`<h${Math.min(h[1].length + 1, 6)}>${enLinea(h[2])}</h${Math.min(h[1].length + 1, 6)}>`); continue; }
    const reloj = /^\*\*((?:\d+\s+)+\d+)\*\*$/.exec(t);
    if (reloj) { out.push(`<div class="reloj">${reloj[1].split(/\s+/).map((n) => `<span>${n}</span>`).join('')}</div>`); continue; }
    if (t.startsWith('|')) {
      const filas: string[] = [];
      while (i < ls.length && ls[i].trim().startsWith('|')) filas.push(ls[i++].trim());
      i--;
      const sep = filas.length > 1 && /^\|?\s*:?-{2,}/.test(filas[1]);
      const cab = sep ? celdas(filas[0]) : [];
      const cuerpo = (sep ? filas.slice(2) : filas).map(celdas);
      out.push(`<table>${cab.length ? `<thead><tr>${cab.map((c) => `<th>${enLinea(c)}</th>`).join('')}</tr></thead>` : ''}<tbody>${cuerpo.map((r) => `<tr>${r.map((c) => `<td>${enLinea(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
      continue;
    }
    if (t.startsWith('>')) {
      const dentro: string[] = [];
      while (i < ls.length && ls[i].trim().startsWith('>')) dentro.push(ls[i++].trim().replace(/^>\s?/, ''));
      i--;
      const cab = /^\*\*([^*]+?)\*\*$/.exec(dentro[0] || '');
      const [etq, tit] = cab ? (cab[1].includes(' · ') ? cab[1].split(' · ') : ['', cab[1]]) : ['', ''];
      const cuerpo = (cab ? dentro.slice(1) : dentro).filter(Boolean).map((p) => `<p>${enLinea(p)}</p>`).join('');
      out.push(`<div class="caja">${etq ? `<p class="etq">${enLinea(etq)}</p>` : ''}${tit ? `<p class="tit">${enLinea(tit)}</p>` : ''}${cuerpo}</div>`);
      continue;
    }
    if (/^[-*]\s/.test(t)) {
      const items: string[] = [];
      while (i < ls.length && /^[-*]\s/.test(ls[i].trim())) items.push(ls[i++].trim().replace(/^[-*]\s+/, ''));
      i--;
      out.push(`<ul>${items.map((x) => `<li>${enLinea(x)}</li>`).join('')}</ul>`);
      continue;
    }
    const par = [t];
    while (i + 1 < ls.length && ls[i + 1].trim() && !/^(#|\||>|[-*]\s|!\[)/.test(ls[i + 1].trim())) par.push(ls[++i].trim());
    out.push(`<p>${enLinea(par.join(' '))}</p>`);
  }
  return out.join('\n');
}

/** Cada bestia del apéndice de estadísticas en su bloque, para que no se parta entre columnas ni páginas. */
function bloquesDm(s: SeccionDm): string {
  if (!/estad[íi]sticas/i.test(s.titulo)) return `<div class="control">${mdAHtml(s.md)}</div>`;
  const trozos = s.md.split(/\n(?=###\s)/);
  const intro = trozos[0].startsWith('###') ? '' : trozos.shift()!;
  return `${intro ? `<div class="intro">${mdAHtml(intro)}</div>` : ''}<div class="bestias">${trozos.map((t) => `<div class="bestia">${mdAHtml(t)}</div>`).join('\n')}</div>`;
}

/** Página para imprimir: cada documento en su pergamino con línea de corte (el título va fuera, solo para el DM),
    cada mapa en su hoja (apaisada si el mapa lo es), y al final las páginas del DM. */
export function paginaImprimibles(titulo: string, x: Imprimibles | Entregable[], origen: string): string {
  const { docs, mapas, dm } = Array.isArray(x) ? { docs: x, mapas: [] as Mapa[], dm: [] as SeccionDm[] } : x;
  const fuente = (n: string, f: string, extra = '') =>
    `@font-face{font-family:'${n}';src:url('${origen}/homebrewery/fonts/5e/${f}.woff2') format('woff2');${extra}}`;
  const tarjetas = docs.map((d) => `<section class="doc">
  ${d.titulo ? `<p class="nombre">${html(d.titulo)}</p>` : ''}
  <div class="hoja">${d.parrafos.map((p) => `<p>${enLinea(p)}</p>`).join('\n')}</div>
</section>`).join('\n');
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${html(titulo)} · imprimibles</title>
<style>
${fuente('Bookinsanity', 'Bookinsanity')}
${fuente('Bookinsanity', 'Bookinsanity Italic', 'font-style:italic;')}
${fuente('Bookinsanity', 'Bookinsanity Bold', 'font-weight:bold;')}
${fuente('Bookinsanity', 'Bookinsanity Bold Italic', 'font-weight:bold;font-style:italic;')}
${fuente('MrEaves', 'Mr Eaves Small Caps')}
${fuente('ScalySans', 'Scaly Sans')}
${fuente('ScalySans', 'Scaly Sans Italic', 'font-style:italic;')}
${fuente('ScalySans', 'Scaly Sans Bold', 'font-weight:bold;')}
${fuente('ScalySans', 'Scaly Sans Bold Italic', 'font-weight:bold;font-style:italic;')}
@page { size: letter; margin: 1.2cm; }
@page mapa { size: letter portrait; margin: 0.8cm; }
@page mapah { size: letter landscape; margin: 0.8cm; }
* { box-sizing: border-box; }
body { margin: 0; background: #e9e4da; color: #1f1a14; font-family: Bookinsanity, Georgia, serif; }
.barra { position: sticky; top: 0; display: flex; gap: 12px; align-items: center; justify-content: space-between;
  padding: 10px 16px; background: #58180d; color: #fff; font-family: MrEaves, Georgia, serif; font-size: 18px; }
.barra button { font: inherit; font-size: 16px; padding: 6px 14px; border: 0; border-radius: 6px; background: #fff; color: #58180d; cursor: pointer; }
main { max-width: 19cm; margin: 0 auto; padding: 16px; }
.doc { break-inside: avoid; page-break-inside: avoid; margin: 0 0 0.9cm; }
.nombre { margin: 0 0 4px; font-family: MrEaves, Georgia, serif; font-size: 13px; letter-spacing: .04em; color: #6d6455; }
.hoja { padding: 1.1cm 1.3cm; border: 1px dashed #8a7d68; font-size: 15px; line-height: 1.45;
  background: #f4ead2 url('${origen}/homebrewery/assets/parchmentBackground.jpg') center / cover;
  -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.hoja p { margin: 0 0 .55em; }
.hoja p:last-child { margin-bottom: 0; }
.vacio { font-family: Georgia, serif; color: #6d6455; }
h2.parte { font-family: MrEaves, Georgia, serif; color: #58180d; font-size: 26px; margin: 1.2cm 0 .4cm; border-bottom: 2px solid #c9ad6a; }
/* cada mapa en su hoja, apaisada si el mapa lo es (la clase la pone el script al cargar la imagen) */
.mapa { page: mapa; break-before: page; break-after: page; break-inside: avoid; text-align: center; margin: 0 0 1cm; }
.mapa.h { page: mapah; }
.mapa img { display: block; margin: 0 auto; max-width: 100%; max-height: 24.6cm; object-fit: contain; }
.mapa.h img { max-height: 18.4cm; }
.mapa p { margin: .2cm 0 0; font-family: MrEaves, Georgia, serif; font-size: 13px; color: #6d6455; }
.dm { break-before: page; font-family: ScalySans, Georgia, sans-serif; font-size: 12.5px; line-height: 1.3; }
.dm h2 { font-family: MrEaves, Georgia, serif; color: #58180d; font-size: 24px; margin: 0 0 .3cm; border-bottom: 2px solid #c9ad6a; }
.dm h3 { font-family: MrEaves, Georgia, serif; color: #58180d; font-size: 19px; margin: .1cm 0 .05cm; }
.dm h4 { font-family: MrEaves, Georgia, serif; color: #58180d; font-size: 15px; margin: .25cm 0 .05cm; border-bottom: 1px solid #58180d; }
.dm h5, .dm h6 { font-size: 13px; margin: .2cm 0 .05cm; }
.dm p { margin: 0 0 .3em; }
.dm table { width: 100%; border-collapse: collapse; margin: .15cm 0 .3cm; }
.dm th, .dm td { padding: 2px 5px; text-align: left; vertical-align: top; }
.dm tbody tr:nth-child(odd) { background: #e0e5c1; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.bestia { margin: 0 0 .5cm; padding: .25cm .35cm; background: #fdf1dc;
  border-top: 4px solid #e69a28; border-bottom: 4px solid #e69a28; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.bestia table th, .bestia table td { text-align: center; }
.dm table, .dm h3, .dm h4 { break-inside: avoid; break-after: avoid; }
.bestia tbody tr:nth-child(odd) { background: none; }
.caja { break-inside: avoid; margin: .2cm 0 .3cm; padding: .2cm .3cm; background: #e0e5c1; border-left: 3px solid #58180d;
  -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.caja .etq { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #6b5a45; margin: 0; }
.caja .tit { font-weight: bold; margin: 0 0 .1cm; }
.control td:first-child:only-child { height: .95cm; }
.reloj { display: flex; gap: 6px; margin: .2cm 0 .3cm; }
.reloj span { flex: 1; height: 1.4cm; border: 2px solid #1f1a14; border-radius: 4px; padding: 2px 4px; font-weight: bold; font-size: 11px; }
@media print { body { background: none; } .barra { display: none; } main { padding: 0; max-width: none; } h2.parte { margin-top: 0; }
  .mapa { margin: 0; } }
</style></head><body>
<div class="barra"><span>${html(titulo)}: ${[
    docs.length && `${docs.length} documento${docs.length === 1 ? '' : 's'} para recortar`,
    mapas.length && `${mapas.length} mapa${mapas.length === 1 ? '' : 's'}`,
    dm.length && 'las páginas del DM',
  ].filter(Boolean).join(', ')}</span><button onclick="print()">Imprimir</button></div>
<main>${docs.length ? `<div class="docs"><h2 class="parte">Para los jugadores</h2>${tarjetas}</div>` : ''}
${mapas.map((m) => `<section class="mapa"><img src="${html(m.url)}" alt="${html(m.titulo)}"><p><b>${html(m.titulo)}</b>${m.nota ? ` · ${enLinea(m.nota)}` : ''}</p></section>`).join('\n')}
${dm.map((d) => `<section class="dm"><h2>${html(d.titulo)}</h2>${bloquesDm(d)}</section>`).join('\n')}
${docs.length || mapas.length || dm.length ? '' : '<p class="vacio">Esta guía no tiene nada para imprimir.</p>'}</main>
<script>
// los mapas apaisados van en una hoja girada
document.querySelectorAll('.mapa img').forEach(function (i) {
  i.loading = 'eager';
  var mira = function () { if (i.naturalWidth > i.naturalHeight) i.closest('.mapa').classList.add('h'); };
  if (i.complete) mira(); else i.addEventListener('load', mira);
});
</script>
</body></html>`;
}
