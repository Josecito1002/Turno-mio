'use client';
import { useEffect, useRef } from 'react';
import { S, render, useRender, irArriba } from './estado';
import { cargarTodo, vaciarPendientes, almacen } from './almacen';
import { leerArchivos } from './importar';
import { BandejaDados } from '@/features/dados/components/Bandeja';
import { compute } from '@/features/personajes/domain/calculo';
import { reparar } from '@/features/personajes/domain/modelo';
import { Ficha } from '@/features/personajes/components/ficha/Ficha';
import { SubidaNivel } from '@/features/personajes/components/ficha/SubidaNivel';
import { Editor } from '@/features/personajes/components/editor/Editor';
import { Inicio } from '@/features/personajes/components/Inicio';
import { BibliotecaVista } from '@/features/biblioteca/components/BibliotecaVista';
import { MesaVista } from '@/features/mesa/components/MesaVista';
import { cerrarSesion } from '@/features/cuentas/server/acciones';

function Vista({ elegirArchivos, importarHojas }: { elegirArchivos: () => void; importarHojas: () => void }) {
  if (S.view === 'mesa') return <MesaVista importarHojas={importarHojas} />;
  if (S.view === 'lib') return <BibliotecaVista elegirArchivos={elegirArchivos} />;
  if (!S.pj || S.view === 'home') { S.view = 'home'; return <Inicio elegirArchivos={elegirArchivos} />; }
  const c = (S.c = compute(S.pj));
  return S.view === 'editor' ? <Editor c={c} /> : <Ficha c={c} />;
}

function BarraDerecha() {
  const ir = (v: 'home' | 'ficha' | 'editor') => { S.view = v; if (v === 'ficha') S.tab = 'turno'; if (v === 'editor') S.step = S.step || 'especie'; render(); irArriba(); };
  if (S.view === 'mesa') return <button className="btn ghost" onClick={() => ir('home')}>Inicio</button>;
  if (S.view === 'lib') return <button className="btn ghost" onClick={() => ir('home')}>Volver</button>;
  if (!S.pj || S.view === 'home') return null;
  return S.view === 'ficha'
    ? <button className="btn ghost" onClick={() => ir('editor')}>Editar</button>
    : <button className="btn" onClick={() => ir('ficha')}>Ver la hoja</button>;
}

export function MiTurnoApp() {
  useRender();
  const fileIn = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let vivo = true;
    cargarTodo().then(({ usuario, lista }) => {
      if (!vivo) return;
      S.usuario = usuario; S.list = lista;
      const last = usuario?.ultimoPj;
      if (last && S.list.some(p => p.id === last)) { const p = almacen.pj(last); if (p) { S.pj = reparar(p); S.view = 'ficha'; } }
      S.cargando = false; render();
    }).catch((e: Error) => { S.error = e.message; S.cargando = false; render(); });

    const vaciar = () => vaciarPendientes();
    const oculta = () => { if (document.visibilityState === 'hidden') vaciarPendientes(); };
    const sobre = (e: DragEvent) => e.preventDefault();
    const soltar = (e: DragEvent) => { e.preventDefault(); leerArchivos(e.dataTransfer?.files); };
    window.addEventListener('pagehide', vaciar);
    document.addEventListener('visibilitychange', oculta);
    document.body.addEventListener('dragover', sobre);
    document.body.addEventListener('drop', soltar);
    return () => {
      vivo = false;
      window.removeEventListener('pagehide', vaciar);
      document.removeEventListener('visibilitychange', oculta);
      document.body.removeEventListener('dragover', sobre);
      document.body.removeEventListener('drop', soltar);
    };
  }, []);

  const elegirArchivos = () => fileIn.current?.click();
  const importarHojas = () => { S.importCamp = S.camp; fileIn.current?.click(); };

  return (
    <BandejaDados>
      <div className="wrap">
        <div className="bar">
          <button className="brand" disabled={S.cargando} onClick={() => { S.view = 'home'; render(); irArriba(); }}>Mi turno</button>
          <span id="barR"><BarraDerecha /></span>
          {S.usuario && (
            <form action={cerrarSesion} className="no-print flex items-center gap-2">
              <span className="note" title={S.usuario.email}>{S.usuario.nombre}{S.usuario.rol === 'admin' ? ' (admin)' : ''}</span>
              <button className="btn ghost small" type="submit">Salir</button>
            </form>
          )}
        </div>
        <input ref={fileIn} type="file" className="sr" aria-label="Archivos JSON" multiple accept="application/json,.json"
          onChange={e => { leerArchivos(e.target.files); e.target.value = ''; }} />
        <main id="app">
          {S.cargando ? <p className="note" style={{ marginTop: 28 }}>Cargando tu mesa…</p>
            : S.error ? <div className="warn" style={{ marginTop: 28 }}><b>No se pudo cargar</b>{S.error}</div>
            : <Vista elegirArchivos={elegirArchivos} importarHojas={importarHojas} />}
        </main>
      </div>
      <SubidaNivel />
    </BandejaDados>
  );
}
