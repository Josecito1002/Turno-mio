/* Las fichas de objeto, del tamaño de una carta de Magic: las del apéndice «Fichas de objeto» de una guía y las del
   inventario de un personaje se maquetan igual. */

import { enLinea, html } from './texto';

export type Ficha = { titulo: string; imagen: string; tipo: string; parrafos: string[]; copias: number };

export const FUENTES_FICHAS =
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=EB+Garamond:ital,wght@0,400;0,700;1,400&display=swap">';

export const CSS_FICHAS = `/* fichas de objeto: 63 × 88 mm, como una carta de Magic, nueve por hoja carta */
.hojaf { page: fichas; break-before: page; width: 21.59cm; height: 27.94cm; margin: 0 auto; display: grid;
  grid-template-columns: repeat(3, 63mm); grid-auto-rows: 88mm; justify-content: center; align-content: center; }
.ficha { position: relative; display: flex; flex-direction: column; padding: 4mm 4.5mm; background: #ece5d8; border: .3mm dashed #bbb;
  -webkit-print-color-adjust: exact; print-color-adjust: exact; overflow: hidden; }
.ficha::before { content: ""; position: absolute; inset: 2.2mm; border: .35mm solid #6b5a48; border-radius: 3mm; pointer-events: none; }
.ficha .fn { margin: 1mm 0; text-align: center; font-family: Cinzel, MrEaves, Georgia, serif; font-weight: 700; font-size: 9.5pt;
  letter-spacing: .03em; color: #58180d; text-transform: uppercase; }
.ficha .fi { height: 30mm; display: flex; align-items: center; justify-content: center; }
.ficha .fi img { max-height: 30mm; max-width: 52mm; mix-blend-mode: multiply; }
.ficha .fs { height: 2mm; margin: 0 6mm 1mm; border-bottom: .3mm solid #b9a88f; }
.ficha .ft { margin: 1mm 0 1.5mm; text-align: center; font-family: 'EB Garamond', Georgia, serif; font-style: italic; font-size: 8pt; color: #4a3d30; }
.ficha .fx { font-family: 'EB Garamond', Georgia, serif; font-size: 8.3pt; line-height: 1.18; color: #231c15; }
.ficha .fx p { margin: 0 0 1.3mm; }
@media screen { .hojaf { margin-bottom: 16px; background: #fff; box-shadow: 0 1px 6px #0003; } main:has(.hojaf) { max-width: 23cm; } }`;

const ficha = (f: Ficha) => `<div class="ficha"><p class="fn">${enLinea(f.titulo)}</p>${
  f.imagen ? `<div class="fi"><img src="${html(f.imagen)}" alt=""></div>` : '<div class="fs"></div>'}${
  f.tipo ? `<p class="ft">${enLinea(f.tipo)}</p>` : ''}<div class="fx">${f.parrafos.map((p) => `<p>${enLinea(p)}</p>`).join('')}</div></div>`;

/** Las fichas en hojas de nueve, repitiendo cada una tantas veces como copias pida. */
export function hojasDeFichas(fichas: Ficha[]): string {
  const todas = fichas.flatMap((f) => Array.from({ length: Math.max(1, f.copias) }, () => f));
  const hojas: string[] = [];
  for (let i = 0; i < todas.length; i += 9) hojas.push(`<div class="hojaf">${todas.slice(i, i + 9).map(ficha).join('')}</div>`);
  return hojas.join('\n');
}
