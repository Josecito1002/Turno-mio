'use client';
/* El PDF de una guía sin pasar por Homebrewery: las páginas ya maquetadas se pintan con el mismo tema en una ventana
   nueva, y el navegador las guarda como PDF desde Imprimir (es lo que hace el botón «Get PDF» de Homebrewery). */

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function paginaPdf(brew: string, titulo: string): Promise<string> {
  const { hbfm } = await import('marked-hbfm');
  const paginas = brew.split(/^\\page$/m).map((t, i) =>
    `<div class="page" id="p${i + 1}"><div class="columnWrapper">${hbfm.render(t, i)}</div></div>`).join('\n');
  const o = location.origin;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=860">
<base href="${o}/"><title>${esc(titulo)}</title>
<link rel="stylesheet" href="${o}/homebrewery/tema.css">
<style>
@page { size: 215.9mm 279.4mm; margin: 0; }
html, body { margin: 0; background: #4a4a4a; }
.barra { position: sticky; top: 0; z-index: 10; display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: center; justify-content: center;
  padding: 10px 16px; background: #58180d; color: #fff; font: 16px/1.3 system-ui, sans-serif; }
.barra button { font: 600 16px system-ui, sans-serif; padding: 8px 18px; border: 0; border-radius: 8px; background: #fff; color: #58180d; cursor: pointer; }
.pages { padding: 20px 0; }
.pages > .page { margin: 0 auto 20px; box-shadow: 0 2px 14px #000; content-visibility: visible; }
@media print {
  html, body { background: none; }
  .barra { display: none; }
  .pages { padding: 0; }
  .pages > .page { margin: 0; box-shadow: none; break-after: page; }
}
</style></head><body>
<div class="barra"><span>Para el PDF: pulsa el botón y elige <b>Guardar como PDF</b>.</span><button onclick="print()">Guardar PDF</button></div>
<div class="pages">${paginas}</div>
<script>document.querySelectorAll('img').forEach(function (i) { i.loading = 'eager'; });</script>
</body></html>`;
}

/** Abre una ventana con el HTML ya listo. Se llama en el mismo toque del botón (si llega tarde, el navegador la
   bloquea) y el HTML se escribe dentro: en el móvil, llevar la ventana a un blob la dejaba en blanco, y si la ventana
   se abre antes de maquetar, la pestaña de la app queda detrás y el móvil la congela a medio maquetar. */
export function abrirVentana(html: string): boolean {
  const w = window.open('', '_blank');
  if (!w) return false;
  w.document.open();
  w.document.write(html);
  w.document.close();
  return true;
}
