'use client';
import { useEffect, useRef, useState } from 'react';
import { S, render, esAdmin } from '@/app-shell/estado';
import { guardarLib } from '@/app-shell/almacen';
import { avisar } from '@/shared/ui/avisos';
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

/** Recorte cuadrado: se arrastra la imagen y se ajusta el zoom. */
function Recorte() {
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const [B, setB] = useState(0);
  const [, forzar] = useState(0);
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
  return (
    <div className="crop">
      <div className="crop-box" ref={box}
        onPointerDown={e => { e.preventDefault(); e.currentTarget.setPointerCapture?.(e.pointerId); drag.current = { x: e.clientX, y: e.clientY }; }}
        onPointerMove={e => {
          if (!drag.current || !s) return;
          c.cx -= (e.clientX - drag.current.x) / (c.w * s); c.cy -= (e.clientY - drag.current.y) / (c.h * s);
          drag.current = { x: e.clientX, y: e.clientY }; forzar(n => n + 1);
        }}
        onPointerUp={() => { drag.current = null; }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.src} alt="" draggable={false} style={estilo} />
      </div>
      <label className="crop-z">Zoom<input type="range" min={1} max={4} step={0.01} defaultValue={c.zoom} onInput={e => { c.zoom = +(e.target as HTMLInputElement).value; forzar(n => n + 1); }} /></label>
      <p className="note">Arrastra la imagen para elegir qué parte se ve.</p>
      <div className="row"><button className="btn small" onClick={guardarCrop}>Guardar</button><button className="btn ghost small" onClick={() => { S.crop = null; render(); }}>Cancelar</button></div>
    </div>
  );
}

/** Imagen y descripción de una especie o clase; el administrador las edita. */
export function PanelMedia({ k, n, d }: { k: string; n: string; d: string }) {
  const LIB = getLib(), img = LIB.img?.[k], editando = S.crop && S.crop.k === k;
  return (
    <section className="esp-info">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {editando ? <Recorte /> : img ? <img className="foto" src={img} alt={n} /> : null}
      <div className="info">
        <h2 className="plain" style={{ marginTop: 0 }}>{n}</h2>
        {d ? <p>{d}</p> : <p className="note">Sin descripción todavía.</p>}
        {esAdmin() && !editando && (
          <details className="more"><summary>Editar descripción o imagen</summary>
            <div className="form">
              <label>Descripción corta
                <textarea key={d} rows={3} defaultValue={d} onBlur={e => {
                  if (e.target.value.trim() === d) return;
                  LIB.desc = LIB.desc || {}; LIB.desc[k] = e.target.value.trim(); guardarLib(true); render();
                }} />
              </label>
              <div className="row">
                <label className="btn ghost small">{img ? 'Cambiar imagen' : 'Agregar imagen'}
                  <input type="file" accept="image/*" className="sr" onChange={e => { const f = e.target.files?.[0]; if (f) empezarCrop(k, f).catch(() => avisar('No se pudo leer esa imagen.', 'error')); e.target.value = ''; }} />
                </label>
                {LIB.imgOrig?.[k] && <button className="btn ghost small" onClick={() => empezarCrop(k).catch(() => avisar('No se pudo abrir la imagen.', 'error'))}>Ajustar recorte</button>}
                {img && <button className="btn ghost small" onClick={() => { delete LIB.img![k]; if (LIB.imgOrig) delete LIB.imgOrig[k]; if (LIB.imgCrop) delete LIB.imgCrop[k]; guardarLib(true); render(); }}>Quitar imagen</button>}
              </div>
              <p className="note">Se guardan en la Biblioteca, compartida con todos los usuarios.</p>
            </div>
          </details>
        )}
      </div>
    </section>
  );
}
