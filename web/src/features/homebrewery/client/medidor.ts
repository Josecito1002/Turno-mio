'use client';
/* Mide las páginas en el navegador: un iframe oculto con el tema 5e PHB de Homebrewery (public/homebrewery/tema.css)
   y el mismo motor de Markdown que usa la web (marked-hbfm). */
import { ESTILO_GUIA } from '../domain/estilo';
import type { Caja, Medidor } from '../domain/paginar';

const esperarImagenes = (raiz: ParentNode) => {
  const imgs = [...raiz.querySelectorAll('img')];
  imgs.forEach((im) => { im.loading = 'eager'; });
  return Promise.race([
    Promise.all(imgs.map((im) => (im.complete ? 0 : new Promise((r) => { im.onload = im.onerror = r; })))),
    new Promise((r) => setTimeout(r, 3000)),
  ]);
};

export async function crearMedidor(): Promise<Medidor & { cerrar: () => void }> {
  const { hbfm } = await import('marked-hbfm');
  const marco = document.createElement('iframe');
  marco.setAttribute('aria-hidden', 'true');
  marco.tabIndex = -1;
  marco.style.cssText = 'position:fixed;left:-12000px;top:0;width:1000px;height:1300px;border:0;pointer-events:none';
  const listo = new Promise<void>((r) => { marco.onload = () => r(); });
  marco.srcdoc = `<!doctype html><html><head><meta charset="utf-8"><base href="${location.origin}/">
<link rel="stylesheet" href="${location.origin}/homebrewery/tema.css"><style>${ESTILO_GUIA}</style>
<style>.page{content-visibility:visible!important}</style></head><body><div class="pages" id="pages"></div></body></html>`;
  document.body.appendChild(marco);
  await listo;
  const doc = marco.contentDocument!;
  const win = marco.contentWindow!;
  const pages = doc.getElementById('pages')!;

  async function pintar(md: string) {
    pages.innerHTML = `<div class="page" id="p1"><div class="columnWrapper">${hbfm.render(md, 0)}</div></div>`;
    await esperarImagenes(pages);
    await doc.fonts.ready;
    const pg = pages.firstElementChild as HTMLElement;
    const r = pg.getBoundingClientRect();
    const cs = win.getComputedStyle(pg);
    return {
      pg,
      left: r.left + parseFloat(cs.paddingLeft), right: r.right - parseFloat(cs.paddingRight),
      top: r.top + parseFloat(cs.paddingTop), bottom: r.bottom - parseFloat(cs.paddingBottom),
    };
  }
  const elementos = (pg: HTMLElement) => [...pg.querySelectorAll<HTMLElement>('.columnWrapper > *')]
    .filter((el) => el.tagName !== 'STYLE' && win.getComputedStyle(el).position !== 'absolute');

  return {
    async sobra(md) {
      const { pg, right, bottom } = await pintar(md);
      let peor = 0;
      for (const el of elementos(pg)) {
        for (const b of el.getClientRects()) {
          if (!b.height || !b.width) continue;
          // un recuadro asoma un poco por la derecha por su borde: solo cuenta si cae en una tercera columna
          if (b.left > right + 2 - 20) peor = Math.max(peor, 1000 + b.right - right);
          if (b.bottom > bottom + 2) peor = Math.max(peor, b.bottom - bottom - 2);
        }
      }
      return peor;
    },
    async cajas(md, prefijo) {
      const t = doc.createElement('template');
      t.innerHTML = hbfm.render(prefijo, 0);
      const n = [...t.content.children].filter((e) => e.tagName !== 'STYLE').length;
      const { pg, left, right, top, bottom } = await pintar(md);
      const mid = (left + right) / 2;
      const col = (b: DOMRect) => (b.width > (right - left) * 0.6 ? -1 : b.left > mid ? 1 : 0);
      const els: Caja[] = elementos(pg).map((el) => {
        const rs = [...el.getClientRects()].filter((b) => b.height > 0 && b.width > 0);
        if (!rs.length) return null;
        const f = rs[0], l = rs[rs.length - 1];
        return { c0: col(f), c1: col(l), top: f.top - top, bottom: l.bottom - top };
      });
      return { n, els, alto: bottom - top };
    },
    cerrar: () => marco.remove(),
  };
}
