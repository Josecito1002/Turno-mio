'use client';
import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { S, render, useRender, irArriba, esAdmin, esDM, type Vista } from './estado';
import { cargarTodo, vaciarPendientes, almacen } from './almacen';
import { leerArchivos } from './importar';
import { Aviso, Boton, cx, foco } from '@/shared/ui/kit';
import { BandejaDados } from '@/features/dados/components/Bandeja';
import { DialogoConfirmar } from '@/shared/ui/confirmar';
import { compute } from '@/features/personajes/domain/calculo';
import { reparar } from '@/features/personajes/domain/modelo';
import { Ficha } from '@/features/personajes/components/ficha/Ficha';
import { SubidaNivel } from '@/features/personajes/components/ficha/SubidaNivel';
import { Editor } from '@/features/personajes/components/editor/Editor';
import { Inicio } from '@/features/personajes/components/Inicio';
import { BibliotecaVista } from '@/features/biblioteca/components/BibliotecaVista';
import { MesaVista } from '@/features/mesa/components/MesaVista';
import { CuentasVista } from '@/features/cuentas/components/CuentasVista';
import { cerrarSesion } from '@/features/cuentas/server/acciones';

/* ---------- Íconos (decorativos) ---------- */
const Icono = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"><path d={d} /></svg>
);
const ICONOS: Record<string, string> = {
  home: 'M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2 8 12.7 4 8.8 9.5 8z',
  lib: 'M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zm0 0v16M8 7h7',
  mesa: 'M12 2l8 5v10l-8 5-8-5V7zm0 0v20M4 7l8 5 8-5',
  cuentas: 'M16 11a4 4 0 10-8 0 4 4 0 008 0zM4 21a8 8 0 0116 0',
};

type ItemNav = { vista: Vista; texto: string; activa: boolean };
function itemsNav(): ItemNav[] {
  const v = S.view;
  const items: ItemNav[] = [
    { vista: 'home', texto: 'Personajes', activa: v === 'home' || v === 'ficha' || v === 'editor' },
    { vista: 'lib', texto: 'Biblioteca', activa: v === 'lib' },
  ];
  if (esDM()) items.push({ vista: 'mesa', texto: 'Mesa del DM', activa: v === 'mesa' });
  if (esAdmin()) items.push({ vista: 'cuentas', texto: 'Cuentas', activa: v === 'cuentas' });
  return items;
}
const ir = (v: Vista) => { S.view = v; if (v === 'mesa') S.camp = null; render(); irArriba(); };

const editar = () => { S.view = 'editor'; S.step = S.step || 'especie'; render(); irArriba(); };
const verHoja = () => { S.view = 'ficha'; S.tab = 'turno'; render(); irArriba(); };
const marcarImportarEnCampana = () => { S.importCamp = S.camp; };

/** La vista que se puede mostrar. Las vistas por rol también se protegen aquí (el servidor ya las rechaza);
    sin personaje abierto se vuelve al inicio. Se ajusta fuera del componente, que solo la lee. */
function vistaPermitida(): Vista {
  if ((S.view === 'mesa' && !esDM()) || (S.view === 'cuentas' && !esAdmin())) S.view = 'home';
  if (!['mesa', 'lib', 'cuentas'].includes(S.view) && (!S.pj || S.view === 'home')) S.view = 'home';
  return S.view;
}
/** Calcula el personaje abierto y lo deja en S.c para las acciones que lo necesitan. */
function calcularAbierto() { return (S.c = compute(S.pj)); }

function Vista({ elegirArchivos, importarHojas }: { elegirArchivos: () => void; importarHojas: () => void }) {
  const vista = vistaPermitida();
  if (vista === 'mesa') return <MesaVista importarHojas={importarHojas} />;
  if (vista === 'lib') return <BibliotecaVista elegirArchivos={elegirArchivos} />;
  if (vista === 'cuentas') return <CuentasVista />;
  if (vista === 'home') return <Inicio />;
  const c = calcularAbierto();
  return vista === 'editor' ? <Editor c={c} /> : <Ficha c={c} />;
}

const TITULOS: Record<string, string> = { home: 'Personajes', lib: 'Biblioteca', mesa: 'Mesa del DM', cuentas: 'Cuentas' };

/** Cabecera fija; publica su altura en --alto-cabecera para que las pestañas se peguen debajo. */
function Cabecera({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver(() => document.documentElement.style.setProperty('--alto-cabecera', `${el.offsetHeight}px`));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return <header ref={ref} className="sticky top-0 z-20 border-b border-rule/70 bg-bg pt-[env(safe-area-inset-top)] backdrop-blur print:hidden">{children}</header>;
}

/** invitado: sin cuenta; los personajes se guardan solo en este navegador. */
export function MiTurnoApp({ invitado = false }: { invitado?: boolean }) {
  useRender();
  const fileIn = useRef<HTMLInputElement>(null);
  const vistaPrevia = useRef('');

  useEffect(() => {
    let vivo = true;
    cargarTodo(invitado).then(({ usuario, lista }) => {
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
  }, [invitado]);

  // Al cambiar de pantalla: título de la pestaña del navegador y foco en el encabezado (teclado y lectores de pantalla).
  const clave = S.cargando ? 'cargando' : `${S.view}|${S.pj?.id || ''}|${S.camp || ''}`;
  useEffect(() => {
    if (S.cargando) return;
    const nombre = S.view === 'ficha' || S.view === 'editor' ? S.pj?.nombre || 'Personaje' : TITULOS[S.view] || 'Mi turno';
    document.title = `${nombre} · Mi turno`;
    if (vistaPrevia.current && vistaPrevia.current !== clave) document.getElementById('titulo-vista')?.focus({ preventScroll: true });
    vistaPrevia.current = clave;
  }, [clave]);

  const elegirArchivos = () => fileIn.current?.click();
  const importarHojas = () => { marcarImportarEnCampana(); fileIn.current?.click(); };
  const nav = S.usuario && !S.cargando ? itemsNav() : [];
  const rol = S.usuario?.rol === 'admin' ? 'Admin' : S.usuario?.rol === 'dm' ? 'DM' : 'Jugador';

  return (
    <BandejaDados>
      <a href="#contenido" className={cx('sr-only rounded-xl bg-ink px-4 py-3 font-bold text-bg focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50', foco)}>Saltar al contenido</a>
      <Cabecera>
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2">
          <button type="button" disabled={S.cargando} onClick={() => ir('home')}
            className={cx('min-h-11 cursor-pointer rounded-lg px-1 font-serif text-xl font-extrabold text-ink', foco)}>Mi turno</button>
          {nav.length > 0 && (
            <nav aria-label="Principal" className="hidden flex-1 md:block">
              <ul className="m-0 flex list-none gap-1 p-0">
                {nav.map(it => (
                  <li key={it.vista}>
                    <button type="button" aria-current={it.activa ? 'page' : undefined} onClick={() => ir(it.vista)}
                      className={cx('min-h-11 cursor-pointer rounded-full px-4 font-bold transition-colors', foco, it.activa ? 'bg-ink text-bg' : 'text-muted hover:bg-soft hover:text-ink')}>
                      {it.texto}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div className="ml-auto flex items-center gap-2">
            {(S.view === 'ficha' || S.view === 'editor') && S.pj && (
              S.view === 'ficha'
                ? <Boton tamano="sm" onClick={editar}>Editar</Boton>
                : <Boton tamano="sm" variante="primario" onClick={verHoja}>Ver la hoja</Boton>
            )}
            {S.usuario && invitado && (
              <span className="flex items-center gap-2">
                <span className="hidden rounded-full bg-soft px-2 py-0.5 text-xs font-bold text-ink sm:inline">Invitado</span>
                <a href="/registro" className={cx('inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-bold text-ink hover:bg-soft sm:min-h-9', foco)}>Crear cuenta</a>
              </span>
            )}
            {S.usuario && !invitado && (
              <form action={cerrarSesion} className="flex items-center gap-2">
                <span className="hidden items-center gap-1.5 text-sm text-muted sm:flex" title={S.usuario.email}>
                  {S.usuario.nombre}<span className="rounded-full bg-soft px-2 py-0.5 text-xs font-bold text-ink">{rol}</span>
                </span>
                <Boton tamano="sm" variante="fantasma" type="submit" aria-label={`Cerrar sesión (${S.usuario.nombre})`}>Salir</Boton>
              </form>
            )}
          </div>
        </div>
      </Cabecera>

      <input ref={fileIn} type="file" className="sr-only" tabIndex={-1} aria-hidden="true" multiple accept="application/json,.json"
        onChange={e => { leerArchivos(e.target.files); e.target.value = ''; }} />

      <main id="contenido" tabIndex={-1} className="mx-auto max-w-5xl px-4 pb-28 pt-2 outline-none md:pb-14 print:p-0">
        {S.cargando ? <p className="mt-10 text-center text-muted" role="status">Cargando tu mesa…</p>
          : S.error ? <Aviso tipo="error" titulo="No se pudo cargar" accion={<Boton onClick={() => location.reload()}>Reintentar</Boton>}>{S.error}</Aviso>
          : <>
            {invitado && (
              <p className="mb-2 mt-1 rounded-xl bg-soft px-4 py-2 text-sm print:hidden">
                <b>Modo invitado:</b> tus personajes se guardan solo en este navegador, no en la nube. Para no perderlos, usa «Descargar respaldo» en la hoja o <a href="/registro" className="font-bold underline">crea una cuenta</a>.
              </p>
            )}
            <Vista elegirArchivos={elegirArchivos} importarHojas={importarHojas} />
          </>}
      </main>

      {nav.length > 0 && (
        <nav aria-label="Principal (móvil)" className="fixed inset-x-0 bottom-0 z-20 border-t border-rule bg-bg pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden print:hidden">
          <ul className="m-0 grid list-none p-0" style={{ gridTemplateColumns: `repeat(${nav.length}, 1fr)` }}>
            {nav.map(it => (
              <li key={it.vista}>
                <button type="button" aria-current={it.activa ? 'page' : undefined} onClick={() => ir(it.vista)}
                  className={cx('flex min-h-16 w-full cursor-pointer flex-col items-center justify-center gap-0.5 text-xs font-bold', foco, it.activa ? 'text-ink' : 'text-muted')}>
                  <span className={cx('grid h-8 w-14 place-items-center rounded-full', it.activa && 'bg-soft')}><Icono d={ICONOS[it.vista]} /></span>
                  {it.texto}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <SubidaNivel />
      <DialogoConfirmar />
    </BandejaDados>
  );
}
