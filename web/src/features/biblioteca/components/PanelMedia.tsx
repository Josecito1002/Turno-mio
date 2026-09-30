'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { S, render, esAdmin } from '@/app-shell/estado';
import { guardarLibExtras } from '@/app-shell/almacen';
import { avisar } from '@/shared/ui/avisos';
import { Boton, Plegable, Tarjeta, claseCampo, cx, foco } from '@/shared/ui/kit';
import { getLib } from '../domain/biblioteca';
import { leerImagenOriginal } from '../api';
import type { Fuente } from '@/features/reglas/data/fuentes';
import { EtiquetaFuente } from '@/features/personajes/components/editor/Tarjetas';
import { Imagen } from '@/shared/ui/imagen';
import { PREFIJO_ORIGEN } from '../domain/imagenes-origen';

function cargarImagen(src: string) {
  return new Promise<HTMLImageElement>((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = src; });
}
/** Copia un trozo de la imagen a un lienzo de w×h. Al achicar mucho, lo hace a la mitad cada vez y con suavizado alto:
    de un solo paso el navegador salta píxeles y la imagen queda pixelada. */
function dibujar(im: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, w: number, h: number) {
  let src: CanvasImageSource = im, x = sx, y = sy, cw = sw, ch = sh;
  while (cw / 2 >= w && ch / 2 >= h) {
    const paso = document.createElement('canvas');
    paso.width = Math.round(cw / 2); paso.height = Math.round(ch / 2);
    const g = paso.getContext('2d')!; g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
    g.drawImage(src, x, y, cw, ch, 0, 0, paso.width, paso.height);
    src = paso; x = 0; y = 0; cw = paso.width; ch = paso.height;
  }
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const g = cv.getContext('2d')!; g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
  g.drawImage(src, x, y, cw, ch, 0, 0, w, h);
  return cv;
}
export function achicarImagen(file: File, max = 320, calidad = 0.92) {
  return new Promise<string>((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => {
      const im = new Image();
      im.onload = () => {
        const s = Math.min(1, max / Math.max(im.width, im.height));
        res(dibujar(im, 0, 0, im.width, im.height, Math.round(im.width * s), Math.round(im.height * s)).toDataURL('image/jpeg', calidad));
      };
      im.onerror = rej; im.src = fr.result as string;
    };
    fr.onerror = rej; fr.readAsDataURL(file);
  });
}

/* Tamaños: la original se guarda hasta 2048 px (para volver a recortar) y el recorte en 1024 px, que se ve nítido
   en grande incluso en pantallas de móvil de alta densidad. */
const LADO_ORIGINAL = 2048, LADO_RECORTE = 1024;

async function empezarCrop(k: string, file?: File) {
  const LIB = getLib();
  // La biblioteca no trae las originales (pesan mucho): se piden al servidor la primera vez que se ajusta el recorte
  if (!file && !LIB.imgOrig?.[k]) {
    const orig = await leerImagenOriginal(k);
    if (!orig) throw new Error('sin original');
    (LIB.imgOrig = LIB.imgOrig || {})[k] = orig;
  }
  const src = file ? await achicarImagen(file, LADO_ORIGINAL) : LIB.imgOrig![k];
  const im = await cargarImagen(src), prev = !file && LIB.imgCrop?.[k];
  S.crop = { k, src, w: im.naturalWidth, h: im.naturalHeight, zoom: prev ? prev.zoom || 1 : 1, cx: prev ? prev.cx ?? 0.5 : 0.5, cy: prev ? prev.cy ?? 0.5 : 0.5 };
  render();
}
async function guardarCrop() {
  const c = S.crop, im = await cargarImagen(c.src), lado = Math.min(c.w, c.h) / c.zoom, N = LADO_RECORTE;
  const cv = dibujar(im, c.cx * c.w - lado / 2, c.cy * c.h - lado / 2, lado, lado, Math.min(N, Math.round(lado)), Math.min(N, Math.round(lado)));
  const LIB = getLib();
  LIB.img = LIB.img || {}; LIB.imgOrig = LIB.imgOrig || {}; LIB.imgCrop = LIB.imgCrop || {};
  const k = c.k, img = cv.toDataURL('image/jpeg', 0.92), recorte = { zoom: c.zoom, cx: c.cx, cy: c.cy };
  LIB.img[k] = img; LIB.imgOrig[k] = c.src; LIB.imgCrop[k] = recorte;
  S.crop = null; render();
  guardarLibExtras([{ tipo: 'img', clave: k, valor: img }, { tipo: 'imgOrig', clave: k, valor: c.src }, { tipo: 'imgCrop', clave: k, valor: recorte }])
    .then(() => avisar('Imagen guardada: ya la ven todos.'))
    .catch((e: Error) => avisar(`No se pudo guardar la imagen en el servidor: ${e.message}`, 'error'));
}

/* Cambios al recorte y a la biblioteca: fuera de los componentes, que solo los llaman */
/** Mantiene el recorte dentro de la imagen para un cuadro de lado B a escala s. */
function acotarCrop(B: number, s: number) {
  const c = S.crop, hx = B / (2 * s * c.w), hy = B / (2 * s * c.h);
  c.cx = Math.min(1 - hx, Math.max(hx, c.cx)); c.cy = Math.min(1 - hy, Math.max(hy, c.cy));
}
function moverCrop(dx: number, dy: number) { S.crop.cx += dx; S.crop.cy += dy; }
function zoomCrop(z: number) { S.crop.zoom = Math.min(4, Math.max(1, z)); }
function cancelarCrop() { S.crop = null; render(); }
function guardarDescripcion(k: string, texto: string) {
  const LIB = getLib(); LIB.desc = LIB.desc || {}; LIB.desc[k] = texto; render();
  guardarLibExtras([{ tipo: 'desc', clave: k, valor: texto }])
    .then(() => avisar('Descripción guardada.'))
    .catch((e: Error) => avisar(`No se pudo guardar la descripción: ${e.message}`, 'error'));
}
function quitarImagen(k: string) {
  const LIB = getLib();
  if (LIB.img) delete LIB.img[k]; if (LIB.imgOrig) delete LIB.imgOrig[k]; if (LIB.imgCrop) delete LIB.imgCrop[k];
  render();
  guardarLibExtras((['img', 'imgOrig', 'imgCrop'] as const).map(tipo => ({ tipo, clave: k, valor: null })))
    .catch((e: Error) => avisar(`No se pudo quitar la imagen en el servidor: ${e.message}`, 'error'));
}

/** Recorte cuadrado: se arrastra la imagen (o se mueve con las flechas) y se ajusta el zoom. */
function Recorte({ nombre }: { nombre: string }) {
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const [B, setB] = useState(0);
  const [, forzar] = useState(0);
  const idZoom = useId();
  useEffect(() => {
    const el = box.current; if (!el) return;
    const ro = new ResizeObserver(() => setB(el.clientWidth));
    ro.observe(el); setB(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  const c = S.crop;
  const s = B ? B / Math.min(c.w, c.h) * c.zoom : 0;
  if (s) acotarCrop(B, s);
  const estilo = s ? { width: c.w * s, height: c.h * s, left: B / 2 - c.cx * c.w * s, top: B / 2 - c.cy * c.h * s } : {};
  const teclas = (e: React.KeyboardEvent) => {
    const paso = 0.03, m: Record<string, [number, number]> = { ArrowLeft: [-paso, 0], ArrowRight: [paso, 0], ArrowUp: [0, -paso], ArrowDown: [0, paso] };
    if (m[e.key]) { e.preventDefault(); moverCrop(m[e.key][0], m[e.key][1]); forzar(n => n + 1); }
    if (e.key === '+' || e.key === '=') { zoomCrop(c.zoom + 0.1); forzar(n => n + 1); }
    if (e.key === '-') { zoomCrop(c.zoom - 0.1); forzar(n => n + 1); }
  };
  return (
    <div className="flex flex-col gap-2">
      <div ref={box} tabIndex={0} role="application" aria-label={`Recorte de la imagen de ${nombre}. Arrastra o usa las flechas para moverla; + y - para el zoom.`}
        onKeyDown={teclas}
        onPointerDown={e => { e.preventDefault(); e.currentTarget.setPointerCapture?.(e.pointerId); drag.current = { x: e.clientX, y: e.clientY }; }}
        onPointerMove={e => {
          if (!drag.current || !s) return;
          moverCrop(-(e.clientX - drag.current.x) / (c.w * s), -(e.clientY - drag.current.y) / (c.h * s));
          drag.current = { x: e.clientX, y: e.clientY }; forzar(n => n + 1);
        }}
        onPointerUp={() => { drag.current = null; }}
        className={cx('relative aspect-square w-[min(260px,72vw)] cursor-grab touch-none overflow-hidden rounded-2xl bg-soft ring-2 ring-rea active:cursor-grabbing', foco)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.src} alt="" draggable={false} style={estilo} className="pointer-events-none absolute max-w-none select-none" />
      </div>
      <label htmlFor={idZoom} className="flex items-center gap-2 text-sm">Zoom
        <input id={idZoom} type="range" min={1} max={4} step={0.01} value={c.zoom} className="flex-1 accent-ink"
          onChange={e => { zoomCrop(+e.target.value); forzar(n => n + 1); }} />
      </label>
      <div className="flex flex-wrap gap-2">
        <Boton variante="primario" tamano="sm" onClick={guardarCrop}>Guardar imagen</Boton>
        <Boton tamano="sm" onClick={cancelarCrop}>Cancelar</Boton>
      </div>
    </div>
  );
}

/** Lo que edita el administrador: la descripción y la imagen de una clave (especie, subraza o clase) */
function EditarMedia({ k, d, titulo }: { k: string; d: string; titulo: string }) {
  const LIB = getLib(), img = LIB.img?.[k], idArchivo = useId();
  return (
    <Plegable titulo={titulo} className="mt-3">
      <label className="flex flex-col gap-1.5 font-bold">Descripción corta
        <textarea key={d} rows={3} defaultValue={d} className={cx(claseCampo, 'py-2 font-normal')} onBlur={e => {
          if (e.target.value.trim() === d) return;
          guardarDescripcion(k, e.target.value.trim());
        }} />
      </label>
      <div className="mt-3 flex flex-wrap gap-2">
        <label htmlFor={idArchivo} className={cx('inline-flex min-h-11 cursor-pointer items-center rounded-xl bg-surface px-3 text-sm font-bold ring-1 ring-inset ring-rule hover:bg-soft focus-within:outline-3 focus-within:outline-rea')}>
          {img ? 'Cambiar imagen' : 'Agregar imagen'}
          <input id={idArchivo} type="file" accept="image/*" className="sr-only" onChange={e => { const f = e.target.files?.[0]; if (f) empezarCrop(k, f).catch(() => avisar('No se pudo leer esa imagen.', 'error')); e.target.value = ''; }} />
        </label>
        {img && (LIB.imgOrig?.[k] || LIB.imgCrop?.[k]) && <Boton tamano="sm" onClick={() => empezarCrop(k).catch(() => avisar('No se pudo abrir la imagen.', 'error'))}>Ajustar recorte</Boton>}
        {img && <Boton tamano="sm" variante="peligro" onClick={() => quitarImagen(k)}>Quitar imagen</Boton>}
      </div>
      <p className="mb-0 mt-2 text-sm text-muted">Se guardan en la biblioteca, compartida con todos.</p>
    </Plegable>
  );
}

type Sub = { k: string; n: string; d: string };
/** Imagen y descripción de una especie o clase; el administrador las edita.
    Con `sub` (la subraza elegida) el mismo cuadro muestra su nombre, su descripción, lo que da (`children`) y su imagen.
    Sin subraza elegida, `azar` son las claves de las subrazas: se muestra la imagen de una de ellas al azar. */
export function PanelMedia({ k, n, d, fuente, sub, azar, children }: { k: string; n: string; d: string; fuente?: Fuente; sub?: Sub; azar?: string[]; children?: React.ReactNode }) {
  const LIB = getLib(), editando = S.crop && (S.crop.k === k || S.crop.k === sub?.k);
  const [suerte] = useState(() => Math.random());
  const conImg = (azar || []).filter(x => LIB.img?.[x]);
  const deAzar = !sub && conImg.length ? conImg[Math.floor(suerte * conImg.length) % conImg.length] : '';
  const mostrada = (sub && LIB.img?.[sub.k]) || (deAzar && LIB.img![deAzar]) || LIB.img?.[k];
  // Las imágenes de especie con clase son retratos verticales: en el cuadro se ve la parte de arriba
  const retrato = !(sub && LIB.img?.[sub.k]) && deAzar.startsWith(PREFIJO_ORIGEN);
  return (
    <Tarjeta as="section" aria-label={`Sobre ${n}`} className="my-4 flex flex-wrap gap-4">
      {editando ? <Recorte nombre={S.crop.k === k ? n : sub!.n} /> : mostrada ? <Imagen className={cx('aspect-square w-full max-w-80 shrink-0 rounded-xl object-cover sm:w-60 md:w-72', retrato && 'object-top')} src={mostrada} alt={`Ilustración de ${sub ? sub.n : n}`} /> : null}
      <div className="min-w-56 flex-1">
        <h2 className="m-0 font-serif text-2xl font-bold">{n}{fuente && <EtiquetaFuente fuente={fuente} className="ml-2 align-middle" />}</h2>
        {d ? <p className="mb-0 mt-1">{d}</p> : <p className="mb-0 mt-1 text-sm text-muted">Sin descripción todavía.</p>}
        {sub && (
          <div className="mt-4 border-t border-rule pt-3">
            <h3 className="m-0 font-serif text-xl font-bold">{sub.n}</h3>
            {sub.d ? <p className="mb-0 mt-1">{sub.d}</p> : <p className="mb-0 mt-1 text-sm text-muted">Sin descripción todavía.</p>}
            {children}
          </div>
        )}
        {esAdmin() && !editando && <EditarMedia k={k} d={d} titulo="Editar descripción o imagen" />}
        {esAdmin() && !editando && sub && <EditarMedia k={sub.k} d={sub.d} titulo={`Editar descripción o imagen de ${sub.n}`} />}
      </div>
    </Tarjeta>
  );
}
