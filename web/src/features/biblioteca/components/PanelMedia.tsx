'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { S, render, esAdmin } from '@/app-shell/estado';
import { guardarLib } from '@/app-shell/almacen';
import { avisar } from '@/shared/ui/avisos';
import { Boton, Plegable, Tarjeta, claseCampo, cx, foco } from '@/shared/ui/kit';
import { getLib } from '../domain/biblioteca';

function cargarImagen(src: string) {
  return new Promise<HTMLImageElement>((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = src; });
}
function achicarImagen(file: File, max = 320) {
  return new Promise<string>((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => {
      const im = new Image();
      im.onload = () => {
        const s = Math.min(1, max / Math.max(im.width, im.height)), cv = document.createElement('canvas');
        cv.width = Math.round(im.width * s); cv.height = Math.round(im.height * s);
        cv.getContext('2d')!.drawImage(im, 0, 0, cv.width, cv.height);
        res(cv.toDataURL('image/jpeg', 0.8));
      };
      im.onerror = rej; im.src = fr.result as string;
    };
    fr.onerror = rej; fr.readAsDataURL(file);
  });
}

async function empezarCrop(k: string, file?: File) {
  const LIB = getLib();
  const src = file ? await achicarImagen(file, 640) : LIB.imgOrig![k];
  const im = await cargarImagen(src), prev = !file && LIB.imgCrop?.[k];
  S.crop = { k, src, w: im.naturalWidth, h: im.naturalHeight, zoom: prev ? prev.zoom || 1 : 1, cx: prev ? prev.cx ?? 0.5 : 0.5, cy: prev ? prev.cy ?? 0.5 : 0.5 };
  render();
}
async function guardarCrop() {
  const c = S.crop, im = await cargarImagen(c.src), lado = Math.min(c.w, c.h) / c.zoom, N = 320;
  const cv = document.createElement('canvas'); cv.width = N; cv.height = N;
  cv.getContext('2d')!.drawImage(im, c.cx * c.w - lado / 2, c.cy * c.h - lado / 2, lado, lado, 0, 0, N, N);
  const LIB = getLib();
  LIB.img = LIB.img || {}; LIB.imgOrig = LIB.imgOrig || {}; LIB.imgCrop = LIB.imgCrop || {};
  LIB.img[c.k] = cv.toDataURL('image/jpeg', 0.82); LIB.imgOrig[c.k] = c.src; LIB.imgCrop[c.k] = { zoom: c.zoom, cx: c.cx, cy: c.cy };
  S.crop = null; guardarLib(true); render(); avisar('Imagen guardada.');
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
  if (s) {
    const hx = B / (2 * s * c.w), hy = B / (2 * s * c.h);
    c.cx = Math.min(1 - hx, Math.max(hx, c.cx)); c.cy = Math.min(1 - hy, Math.max(hy, c.cy));
  }
  const estilo = s ? { width: c.w * s, height: c.h * s, left: B / 2 - c.cx * c.w * s, top: B / 2 - c.cy * c.h * s } : {};
  const teclas = (e: React.KeyboardEvent) => {
    const paso = 0.03, m: Record<string, [number, number]> = { ArrowLeft: [-paso, 0], ArrowRight: [paso, 0], ArrowUp: [0, -paso], ArrowDown: [0, paso] };
    if (m[e.key]) { e.preventDefault(); c.cx += m[e.key][0]; c.cy += m[e.key][1]; forzar(n => n + 1); }
    if (e.key === '+' || e.key === '=') { c.zoom = Math.min(4, c.zoom + 0.1); forzar(n => n + 1); }
    if (e.key === '-') { c.zoom = Math.max(1, c.zoom - 0.1); forzar(n => n + 1); }
  };
  return (
    <div className="flex flex-col gap-2">
      <div ref={box} tabIndex={0} role="application" aria-label={`Recorte de la imagen de ${nombre}. Arrastra o usa las flechas para moverla; + y - para el zoom.`}
        onKeyDown={teclas}
        onPointerDown={e => { e.preventDefault(); e.currentTarget.setPointerCapture?.(e.pointerId); drag.current = { x: e.clientX, y: e.clientY }; }}
        onPointerMove={e => {
          if (!drag.current || !s) return;
          c.cx -= (e.clientX - drag.current.x) / (c.w * s); c.cy -= (e.clientY - drag.current.y) / (c.h * s);
          drag.current = { x: e.clientX, y: e.clientY }; forzar(n => n + 1);
        }}
        onPointerUp={() => { drag.current = null; }}
        className={cx('relative aspect-square w-[min(260px,72vw)] cursor-grab touch-none overflow-hidden rounded-2xl bg-soft ring-2 ring-rea active:cursor-grabbing', foco)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.src} alt="" draggable={false} style={estilo} className="pointer-events-none absolute max-w-none select-none" />
      </div>
      <label htmlFor={idZoom} className="flex items-center gap-2 text-sm">Zoom
        <input id={idZoom} type="range" min={1} max={4} step={0.01} value={c.zoom} className="flex-1 accent-ink"
          onChange={e => { c.zoom = +e.target.value; forzar(n => n + 1); }} />
      </label>
      <div className="flex flex-wrap gap-2">
        <Boton variante="primario" tamano="sm" onClick={guardarCrop}>Guardar imagen</Boton>
        <Boton tamano="sm" onClick={() => { S.crop = null; render(); }}>Cancelar</Boton>
      </div>
    </div>
  );
}

/** Imagen y descripción de una especie o clase; el administrador las edita. */
export function PanelMedia({ k, n, d }: { k: string; n: string; d: string }) {
  const LIB = getLib(), img = LIB.img?.[k], editando = S.crop && S.crop.k === k;
  const idArchivo = useId();
  return (
    <Tarjeta as="section" aria-label={`Sobre ${n}`} className="my-4 flex flex-wrap gap-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {editando ? <Recorte nombre={n} /> : img ? <img className="size-32 shrink-0 rounded-xl object-cover sm:size-36" src={img} alt={`Ilustración de ${n}`} /> : null}
      <div className="min-w-56 flex-1">
        <h2 className="m-0 font-serif text-2xl font-bold">{n}</h2>
        {d ? <p className="mb-0 mt-1">{d}</p> : <p className="mb-0 mt-1 text-sm text-muted">Sin descripción todavía.</p>}
        {esAdmin() && !editando && (
          <Plegable titulo="Editar descripción o imagen" className="mt-3">
            <label className="flex flex-col gap-1.5 font-bold">Descripción corta
              <textarea key={d} rows={3} defaultValue={d} className={cx(claseCampo, 'py-2 font-normal')} onBlur={e => {
                if (e.target.value.trim() === d) return;
                LIB.desc = LIB.desc || {}; LIB.desc[k] = e.target.value.trim(); guardarLib(true); render(); avisar('Descripción guardada.');
              }} />
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
              <label htmlFor={idArchivo} className={cx('inline-flex min-h-11 cursor-pointer items-center rounded-xl bg-surface px-3 text-sm font-bold ring-1 ring-inset ring-rule hover:bg-soft focus-within:outline-3 focus-within:outline-rea')}>
                {img ? 'Cambiar imagen' : 'Agregar imagen'}
                <input id={idArchivo} type="file" accept="image/*" className="sr-only" onChange={e => { const f = e.target.files?.[0]; if (f) empezarCrop(k, f).catch(() => avisar('No se pudo leer esa imagen.', 'error')); e.target.value = ''; }} />
              </label>
              {LIB.imgOrig?.[k] && <Boton tamano="sm" onClick={() => empezarCrop(k).catch(() => avisar('No se pudo abrir la imagen.', 'error'))}>Ajustar recorte</Boton>}
              {img && <Boton tamano="sm" variante="peligro" onClick={() => { delete LIB.img![k]; if (LIB.imgOrig) delete LIB.imgOrig[k]; if (LIB.imgCrop) delete LIB.imgCrop[k]; guardarLib(true); render(); }}>Quitar imagen</Boton>}
            </div>
            <p className="mb-0 mt-2 text-sm text-muted">Se guardan en la biblioteca, compartida con todos.</p>
          </Plegable>
        )}
      </div>
    </Tarjeta>
  );
}
