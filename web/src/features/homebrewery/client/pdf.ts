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

/** Abre una ventana ya (si no, el navegador la bloquea por llegar tarde) y la llena cuando el contenido esté listo. */
export function ventanaNueva(): { mostrar: (html: string) => void; cerrar: () => void } | null {
  const w = window.open('', '_blank');
  if (!w) return null;
  w.document.write('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><p style="font:18px system-ui;padding:24px">Preparando…</p>');
  return {
    mostrar: (html) => {
      const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
      try {
        w.location.href = url;
      } catch {
        // algunos navegadores del móvil no dejan llevar la ventana a un blob: se escribe dentro
        w.document.open(); w.document.write(html); w.document.close();
      }
      setTimeout(() => URL.revokeObjectURL(url), 120_000);
    },
    cerrar: () => w.close(),
  };
}
