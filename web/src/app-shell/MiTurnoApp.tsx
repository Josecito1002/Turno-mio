'use client';
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { S, render, useRender, irArriba, esAdmin, esDM, esInvitado, type Vista } from './estado';
import { cargarTodo, vaciarPendientes, almacen } from './almacen';
import { leerArchivos } from './importar';
import { Aviso, Boton, Dialogo, Insignia, Simbolo, cx, foco } from '@/shared/ui/kit';
import { avisar } from '@/shared/ui/avisos';
import { slug } from '@/shared/utils/texto';
import { BandejaDados, useDados } from '@/features/dados/components/Bandeja';
import { DialogoConfirmar } from '@/shared/ui/confirmar';
import { compute } from '@/features/personajes/domain/calculo';
import { reparar } from '@/features/personajes/domain/modelo';
import { faltaParaSubir } from '@/features/personajes/domain/pendientes';
import { getC } from '@/features/biblioteca/domain/biblioteca';
import { abrirSubida, bajarArchivo, bajarNivel, borrarPj, descansar, gastarRecurso, quedaRecurso } from '@/features/personajes/acciones';
import { Ficha } from '@/features/personajes/components/ficha/Ficha';
import { MesaJugadorVista } from '@/features/mesa/components/UnirseMesa';
import { ModoCombate } from '@/features/personajes/components/ficha/ModoCombate';
import { SubidaNivel } from '@/features/personajes/components/ficha/SubidaNivel';
import { Editor } from '@/features/personajes/components/editor/Editor';
import { Inicio } from '@/features/personajes/components/Inicio';
import { BibliotecaVista } from '@/features/biblioteca/components/BibliotecaVista';
import { MesaVista } from '@/features/mesa/components/MesaVista';
import { CuentasVista } from '@/features/cuentas/components/CuentasVista';
import { CambiarContrasena } from '@/features/cuentas/components/CambiarContrasena';
import { CompartirPersonaje, HojaAjena } from '@/features/personajes/components/Compartir';
import { abrirEnlace, duplicarPj, hojaParaDuplicar } from '@/features/personajes/acciones-compartir';
import { cerrarSesion } from '@/features/cuentas/server/acciones';

/* ---------- Íconos de la barra inferior (móvil) ---------- */
const Icono = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"><path d={d} /></svg>
);
const ICONOS: Record<string, string> = {
  home: 'M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2 8 12.7 4 8.8 9.5 8z',
  lib: 'M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zm0 0v16M8 7h7',
  mesa: 'M12 2l8 5v10l-8 5-8-5V7zm0 0v20M4 7l8 5 8-5',
  mesaj: 'M12 2l8 5v10l-8 5-8-5V7zm0 0v20M4 7l8 5 8-5',
  cuentas: 'M16 11a4 4 0 10-8 0 4 4 0 008 0zM4 21a8 8 0 0116 0',
};

type ItemNav = { vista: Vista; texto: string; activa: boolean };
function itemsNav(): ItemNav[] {
  const v = S.view;
  const items: ItemNav[] = [
    { vista: 'home', texto: 'Personajes', activa: v === 'home' || ((v === 'ficha' || v === 'editor') && !S.combateMesa) },
    { vista: 'lib', texto: 'Biblioteca', activa: v === 'lib' },
  ];
  if (esDM()) items.push({ vista: 'mesa', texto: 'Mesa del DM', activa: v === 'mesa' });
  // La mesa a la que te uniste con el código de tu DM: su combate está ahí
  if (!esInvitado()) items.push({ vista: 'mesaj', texto: 'Mi mesa', activa: v === 'mesaj' || (v === 'ficha' && !!S.combateMesa) });
  if (esAdmin()) items.push({ vista: 'cuentas', texto: 'Cuentas', activa: v === 'cuentas' });
  return items;
}
const ir = (v: Vista) => { S.view = v; S.dialogo = ''; S.hojaMesa = null; S.ajeno = null; S.combateMesa = null; S.combateHoja = false; if (v === 'mesa') S.camp = null; render(); irArriba(); };

const editar = () => { S.dialogo = ''; S.view = 'editor'; S.step = S.step || 'especie'; render(); irArriba(); };
const verHoja = () => { S.combateHoja = true; S.dialogo = ''; S.view = 'ficha'; S.tab = 'turno'; render(); irArriba(); };
const abrirDialogo = (d: string) => { S.view = 'ficha'; S.dialogo = d; render(); };
const marcarImportarEnCampana = () => { S.importCamp = S.camp; };

/** La vista que se puede mostrar. Las vistas por rol también se protegen aquí (el servidor ya las rechaza);
    sin personaje abierto se vuelve al inicio. Se ajusta fuera del componente, que solo la lee. */
function vistaPermitida(): Vista {
  if ((S.view === 'mesa' && !esDM()) || (S.view === 'cuentas' && !esAdmin()) || (S.view === 'ajeno' && !S.ajeno)) S.view = 'home';
  if (!['mesa', 'mesaj', 'lib', 'cuentas', 'ajeno'].includes(S.view) && (!S.pj || S.view === 'home')) S.view = 'home';
  return S.view;
}
/** Calcula el personaje abierto y lo deja en S.c para las acciones que lo necesitan. */
function calcularAbierto() { return (S.c = compute(S.pj)); }

function Vista({ elegirArchivos, importarHojas }: { elegirArchivos: () => void; importarHojas: () => void }) {
  const vista = vistaPermitida();
  if (vista === 'mesa') return <MesaVista importarHojas={importarHojas} />;
  if (vista === 'mesaj') return <MesaJugadorVista />;
  if (vista === 'lib') return <BibliotecaVista elegirArchivos={elegirArchivos} />;
  if (vista === 'cuentas') return <CuentasVista />;
  if (vista === 'ajeno') return <HojaAjena />;
  if (vista === 'home') return <Inicio />;
  const c = calcularAbierto();
  if (vista === 'ficha' && S.combateMesa && S.combateMesa.personajeId === S.pj.id) {
    if (!S.combateHoja) return <ModoCombate c={c} />;
    return (
      <>
        <div className="mb-3"><Boton variante="primario" onClick={() => { S.combateHoja = false; render(); irArriba(); }}>Volver al combate</Boton></div>
        <Ficha c={c} />
      </>
    );
  }
  return vista === 'editor' ? <Editor c={c} /> : <Ficha c={c} />;
}

const TITULOS: Record<string, string> = { home: 'Personajes', lib: 'Biblioteca', mesa: 'Mesa del DM', mesaj: 'Mi mesa', cuentas: 'Cuentas' };

/** La barra de abajo (móvil) publica su altura real en --alto-nav-inferior, con el borde y la zona segura del teléfono,
 *  para que lo que se pega sobre ella (la navegación entre pasos del editor) quede justo encima, sin hueco ni encimarse. */
function useAltoNavInferior(hay: boolean) {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const el = ref.current, raiz = document.documentElement;
    if (!hay || !el) { raiz.style.setProperty('--alto-nav-inferior', '0px'); return; }
    const ro = new ResizeObserver(() => raiz.style.setProperty('--alto-nav-inferior', `${el.offsetHeight}px`));
    ro.observe(el);
    return () => ro.disconnect();
  }, [hay]);
  return ref;
}

/** Cabecera fija; publica su altura en --alto-cabecera para que las pestañas se peguen debajo. */
function Cabecera({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver(() => document.documentElement.style.setProperty('--alto-cabecera', `${el.offsetHeight}px`));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <header ref={ref} className="sticky top-0 z-20 w-full bg-surface-container-lowest/90 pt-[env(safe-area-inset-top)] shadow-[0_4px_24px_rgba(0,0,0,0.6)] backdrop-blur-xl print:hidden">
      {children}
    </header>
  );
}

/* ---------- Menú lateral (hamburguesa) ---------- */
function Cajon({ abierto, onCerrar, children }: { abierto: boolean; onCerrar: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current; if (!d) return;
    if (abierto && !d.open) d.showModal();
    if (!abierto && d.open) d.close();
  }, [abierto]);
  return (
    <dialog ref={ref} aria-label="Menú" onCancel={e => { e.preventDefault(); onCerrar(); }} onClick={e => { if (e.target === ref.current) onCerrar(); }}
      className="m-0 ml-auto h-dvh max-h-dvh w-[min(22rem,100vw)] max-w-none overflow-y-auto bg-surface-container-low p-0 text-on-surface shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_1px_1px_rgba(212,175,55,0.3)] backdrop:bg-black/60 print:hidden">
      {children}
    </dialog>
  );
}

function ItemMenu({ icono, children, onClick, peligro, activo, extra }: { icono: string; children: ReactNode; onClick?: () => void; peligro?: boolean; activo?: boolean; extra?: ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-current={activo ? 'page' : undefined}
      className={cx('flex min-h-11 w-full cursor-pointer items-center gap-3 rounded px-3 text-left text-body-md transition-colors', foco,
        peligro ? 'text-error hover:bg-error-container/40'
          : activo ? 'bg-primary-container font-semibold text-on-primary-container'
            : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface')}>
      <Simbolo n={icono} className="text-[20px]" /><span className="flex-1">{children}</span>{extra}
    </button>
  );
}
const ICONO_SECCION: Record<string, string> = { home: 'groups', lib: 'auto_stories', mesa: 'swords', mesaj: 'groups', cuentas: 'manage_accounts' };
const TituloMenu = ({ children }: { children: ReactNode }) => <p className="m-0 px-3 pb-1 pt-4 text-label-caps uppercase tracking-wider text-outline">{children}</p>;

function MenuCompleto({ invitado, onCerrar, onClave, onCompartir }: { invitado: boolean; onCerrar: () => void; onClave: () => void; onCompartir: () => void }) {
  const hacer = (f: () => void) => () => { onCerrar(); f(); };
  const pj = S.pj, enFicha = S.view === 'ficha' && pj, enEditor = S.view === 'editor' && pj;
  const c = pj && (enFicha || enEditor) ? compute(pj) : null;
  const ajena = !enFicha && !enEditor ? hojaParaDuplicar() : null;
  const falta = c ? faltaParaSubir(c) : [];
  const nAv = c ? c.avisos.filter((a: { nivel: string }) => a.nivel === 'aviso').length : 0;
  const rol = S.usuario?.rol === 'admin' ? 'Admin' : S.usuario?.rol === 'dm' ? 'DM' : 'Jugador';
  const subir = () => {
    if (!falta.length) return abrirSubida();
    avisar(`No puedes subir de nivel: tienes elecciones pendientes (${falta.map((a: { t: string }) => a.t.toLowerCase()).join(', ')}). Míralas en Revisar.`, 'aviso');
    abrirDialogo('revisar');
  };
  // El diálogo se cierra antes de imprimir para que no salga en el papel
  const imprimir = () => { onCerrar(); setTimeout(() => window.print(), 50); };
  return (
    <div className="flex min-h-full flex-col p-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-between px-3 pt-2">
        <span className="font-serif text-headline-md text-primary">Mi turno</span>
        <button type="button" onClick={onCerrar} aria-label="Cerrar menú"
          className={cx('grid size-11 cursor-pointer place-items-center rounded text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface', foco)}>
          <Simbolo n="close" className="text-[22px]" />
        </button>
      </div>

      <TituloMenu>Secciones</TituloMenu>
      <nav aria-label="Secciones">
        {pj && <ItemMenu icono="person" activo={!!enFicha} onClick={hacer(verHoja)}>Hoja de personaje</ItemMenu>}
        {itemsNav().map(it => (
          <ItemMenu key={it.vista} icono={ICONO_SECCION[it.vista] || 'circle'}
            activo={it.vista === S.view} onClick={hacer(() => ir(it.vista))}>{it.texto}</ItemMenu>
        ))}
      </nav>

      {(enFicha || enEditor) && c && (
        <>
          <TituloMenu>{pj.nombre || 'Personaje'}</TituloMenu>
          {enEditor && <ItemMenu icono="description" onClick={hacer(verHoja)}>Listo</ItemMenu>}
          {enFicha && <ItemMenu icono="edit" onClick={hacer(editar)}>Editar personaje</ItemMenu>}
          {c.C && c.lvl < 20 && <ItemMenu icono="arrow_upward" onClick={hacer(subir)} extra={falta.length ? <span className="text-label-caps uppercase text-outline">Falta elegir</span> : undefined}>Subir a nivel {c.lvl + 1}</ItemMenu>}
          {c.C && c.lvl > 1 && <ItemMenu icono="arrow_downward" onClick={hacer(bajarNivel)}>Bajar a nivel {c.lvl - 1}</ItemMenu>}
          <ItemMenu icono="backpack" onClick={hacer(() => abrirDialogo('equipo'))}>Equipo e inventario</ItemMenu>
          <ItemMenu icono="checklist" onClick={hacer(() => abrirDialogo('revisar'))}
            extra={nAv > 0 ? <Insignia etiqueta={`${nAv} cosas por elegir`}>{nAv}</Insignia> : undefined}>Revisar</ItemMenu>
          <ItemMenu icono="print" onClick={imprimir}>Imprimir o guardar PDF</ItemMenu>
          <ItemMenu icono="content_copy" onClick={hacer(() => duplicarPj(pj))}>Duplicar personaje</ItemMenu>
          <ItemMenu icono="download" onClick={hacer(() => bajarArchivo(slug(pj.nombre || 'personaje') + '.json', JSON.stringify(pj, null, 1)))}>Descargar respaldo</ItemMenu>
          {!invitado && <ItemMenu icono="share" onClick={hacer(onCompartir)}>Compartir enlace</ItemMenu>}
          <ItemMenu icono="delete" peligro onClick={hacer(() => borrarPj())}>Borrar personaje</ItemMenu>
        </>
      )}

      {/* Una hoja ajena (enlace o mesa del DM): se puede duplicar en tu cuenta */}
      {!enFicha && !enEditor && ajena && (
        <>
          <TituloMenu>{ajena.nombre || 'Personaje'}</TituloMenu>
          <ItemMenu icono="content_copy" onClick={hacer(() => duplicarPj(ajena))}>{invitado ? 'Duplicar aquí' : 'Duplicar en mi cuenta'}</ItemMenu>
        </>
      )}

      <div className="mt-auto">
        <TituloMenu>Cuenta</TituloMenu>
        {S.usuario && invitado && (
          <>
            <p className="m-0 px-3 pb-2 text-body-sm text-on-surface-variant">Modo invitado: tus personajes se guardan solo en este navegador.</p>
            <a href="/registro" className={cx('flex min-h-11 items-center gap-3 rounded px-3 text-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface', foco)}>
              <Simbolo n="person_add" className="text-[20px]" />Crear cuenta
            </a>
          </>
        )}
        {S.usuario && !invitado && (
          <form action={cerrarSesion}>
            <p className="m-0 flex items-center gap-2 px-3 pb-2 text-body-sm text-on-surface-variant" title={S.usuario.email}>
              {S.usuario.nombre}<span className="rounded-full bg-surface-container-high px-2 py-0.5 text-label-caps uppercase text-on-surface">{rol}</span>
            </p>
            <ItemMenu icono="key" onClick={hacer(onClave)}>Cambiar mi contraseña</ItemMenu>
            <button type="submit" aria-label={`Cerrar sesión (${S.usuario.nombre})`}
              className={cx('flex min-h-11 w-full cursor-pointer items-center gap-3 rounded px-3 text-left text-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface', foco)}>
              <Simbolo n="logout" className="text-[20px]" />Cerrar sesión
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ---------- Barra superior (diseño "Grimorio & Espada") ---------- */
function BarraSuperior({ invitado }: { invitado: boolean }) {
  const tirar = useDados();
  const [menu, setMenu] = useState(false);
  const [clave, setClave] = useState(false);
  const [compartir, setCompartir] = useState(false);
  const pj = S.pj, conPj = !!pj && (S.view === 'ficha' || S.view === 'editor');
  const listo = !!S.usuario && !S.cargando;
  const clase = conPj ? getC(pj, pj.clase)?.n : '';
  // Píldoras: la hoja abierta primero, luego las secciones de la app y el inventario del personaje
  const pildoras: { id: string; texto: string; activa: boolean; accion: () => void }[] = listo ? [
    ...(pj ? [{ id: 'hoja', texto: 'Hoja de personaje', activa: S.view === 'ficha' || S.view === 'editor', accion: verHoja }] : []),
    ...itemsNav().map(it => ({ id: it.vista, texto: it.texto, activa: it.vista === S.view, accion: () => ir(it.vista) })),
    ...(pj ? [{ id: 'inv', texto: 'Inventario', activa: false, accion: () => abrirDialogo('equipo') }] : []),
  ] : [];
  return (
    <Cabecera>
      <div className="flex h-20 w-full items-center justify-between gap-5 px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-5">
          <button type="button" disabled={S.cargando} onClick={() => ir('home')} className={cx('flex shrink-0 cursor-pointer items-center gap-3 rounded text-left', foco)}>
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-linear-to-b from-primary-container to-on-primary-container shadow-[0_0_12px_rgba(212,175,55,0.35)] ring-1 ring-primary/40">
              <Simbolo n="auto_stories" relleno className="text-[20px] text-surface-container-lowest" />
            </span>
            <span className="flex flex-col">
              <span className="font-serif text-headline-md leading-none tracking-wide text-primary">Mi turno</span>
              <span className="mt-1 hidden text-label-caps uppercase tracking-wider text-outline sm:block">Compañero de D&amp;D 2024</span>
            </span>
          </button>
          {pildoras.length > 0 && (
            <nav aria-label="Principal" className="ml-3 hidden min-w-0 items-center gap-1 overflow-x-auto rounded-lg bg-surface-container-low p-1 [scrollbar-width:none] xl:flex">
              {pildoras.map(p => (
                <button key={p.id} type="button" aria-current={p.activa ? 'page' : undefined} onClick={p.accion}
                  className={cx('shrink-0 cursor-pointer whitespace-nowrap rounded px-3 py-2 text-body-md transition-all', foco,
                    p.activa ? 'bg-primary-container font-semibold text-on-primary-container shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface')}>
                  {p.texto}
                </button>
              ))}
            </nav>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button type="button" onClick={() => tirar('1d20', 'd20', { neutral: true })}
            className={cx('flex min-h-11 cursor-pointer items-center gap-2 rounded bg-surface-container-high px-3 text-primary shadow-[0_0_10px_rgba(212,175,55,0.2)] transition-all hover:bg-primary hover:text-on-primary', foco)}>
            <Simbolo n="casino" className="text-headline-sm" />
            <span className="hidden text-label-caps uppercase tracking-widest sm:inline">Tirar D20</span>
          </button>
          {S.view === 'ficha' && pj && (
            <div className="hidden items-center rounded bg-surface-container-low p-1 md:flex">
              <button type="button" onClick={() => descansar('corto')}
                className={cx('flex cursor-pointer items-center gap-1 rounded-xs px-3 py-1 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface', foco)}>
                <Simbolo n="hourglass_empty" className="text-body-md" />Descanso corto
              </button>
              <button type="button" onClick={() => descansar('largo')}
                className={cx('flex cursor-pointer items-center gap-1 rounded-xs px-3 py-1 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface', foco)}>
                <Simbolo n="bedtime" className="text-body-md" />Descanso largo
              </button>
            </div>
          )}
          {conPj && (
            <div className="flex items-center gap-3 pl-2">
              <div className="hidden flex-col text-right 2xl:flex">
                <span className="font-serif text-headline-sm leading-tight text-on-surface">{pj.nombre || 'Sin nombre'}</span>
                <span className="text-label-caps uppercase tracking-wider text-secondary">Nivel {pj.nivel}{clase ? ` • ${clase}` : ''}</span>
              </div>
              <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-surface-container-high font-serif text-body-lg font-bold text-primary shadow-[0_0_8px_rgba(212,175,55,0.3)] ring-2 ring-primary-container">
                {(pj.nombre || '?').trim().charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          {listo && (
            <button type="button" onClick={() => setMenu(true)} aria-label="Abrir menú" aria-haspopup="dialog"
              className={cx('grid size-11 cursor-pointer place-items-center rounded text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface', foco)}>
              <Simbolo n="menu" className="text-[26px]" />
            </button>
          )}
        </div>
      </div>
      <Cajon abierto={menu} onCerrar={() => setMenu(false)}>
        {menu && <MenuCompleto invitado={invitado} onCerrar={() => setMenu(false)} onClave={() => setClave(true)} onCompartir={() => setCompartir(true)} />}
      </Cajon>
      <Dialogo abierto={clave} onCerrar={() => setClave(false)} titulo="Cambiar mi contraseña"
        descripcion="Si el administrador te dio una contraseña temporal, cámbiala aquí.">
        <CambiarContrasena alTerminar={() => setClave(false)} />
      </Dialogo>
      <Dialogo abierto={compartir && !!pj} onCerrar={() => setCompartir(false)} titulo={`Compartir a ${pj?.nombre || 'este personaje'}`}
        descripcion="Crea un enlace y pásalo a quien quieras: por chat, por correo o donde sea.">
        {compartir && pj && <CompartirPersonaje id={pj.id} nombre={pj.nombre || 'Sin nombre'} />}
      </Dialogo>
    </Cabecera>
  );
}

/** invitado: sin cuenta; los personajes se guardan solo en este navegador. enlace: abre el personaje de un enlace compartido. */
export function MiTurnoApp({ invitado = false, enlace }: { invitado?: boolean; enlace?: string }) {
  useRender();
  const fileIn = useRef<HTMLInputElement>(null);
  const vistaPrevia = useRef('');

  useEffect(() => {
    let vivo = true;
    cargarTodo(invitado).then(({ usuario, lista }) => {
      if (!vivo) return;
      S.usuario = usuario; S.list = lista;
      const last = usuario?.ultimoPj;
      if (enlace) { S.cargando = false; render(); abrirEnlace(enlace); return; }
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
  }, [invitado, enlace]);

  // Al cambiar de pantalla: título de la pestaña del navegador y foco en el encabezado (teclado y lectores de pantalla).
  const clave = S.cargando ? 'cargando' : `${S.view}|${S.pj?.id || ''}|${S.camp || ''}|${S.ajeno?.pj?.id || ''}`;
  useEffect(() => {
    if (S.cargando) return;
    const nombre = S.view === 'ficha' || S.view === 'editor' ? S.pj?.nombre || 'Personaje' : S.view === 'ajeno' ? S.ajeno?.pj?.nombre || 'Personaje' : TITULOS[S.view] || 'Mi turno';
    document.title = `${nombre} · Mi turno`;
    if (vistaPrevia.current && vistaPrevia.current !== clave) document.getElementById('titulo-vista')?.focus({ preventScroll: true });
    vistaPrevia.current = clave;
  }, [clave]);

  const elegirArchivos = () => fileIn.current?.click();
  const importarHojas = () => { marcarImportarEnCampana(); fileIn.current?.click(); };
  const nav = S.usuario && !S.cargando ? itemsNav() : [];
  const navAbajo = useAltoNavInferior(nav.length > 0);
  // La ficha ocupa todo el ancho (como el diseño); el resto de pantallas sigue en una columna de lectura
  const ancha = !S.cargando && !S.error && ((S.view === 'ficha' && !!S.pj) || (S.view === 'mesa' && !!S.hojaMesa) || (S.view === 'ajeno' && !!S.ajeno));

  return (
    <BandejaDados gastar={gastarRecurso} quedan={quedaRecurso}>
      <a href="#contenido" className={cx('sr-only rounded-xl bg-ink px-4 py-3 font-bold text-bg focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50', foco)}>Saltar al contenido</a>
      <BarraSuperior invitado={invitado} />

      <input ref={fileIn} type="file" className="sr-only" tabIndex={-1} aria-hidden="true" multiple accept="application/json,.json"
        onChange={e => { leerArchivos(e.target.files); e.target.value = ''; }} />

      <main id="contenido" tabIndex={-1} className={cx('outline-none print:p-0', ancha ? 'w-full pb-28 md:pb-0' : 'mx-auto max-w-5xl px-4 pb-28 pt-2 md:pb-14')}>
        {S.cargando ? <p className="mt-10 text-center text-muted" role="status">Cargando tu mesa…</p>
          : S.error ? <Aviso tipo="error" titulo="No se pudo cargar" accion={<Boton onClick={() => location.reload()}>Reintentar</Boton>}>{S.error}</Aviso>
          : <>
            {invitado && (
              <div className={cx(ancha && 'px-4 pt-3 lg:px-6')}>
                <p className={cx('mb-2 mt-1 rounded-lg bg-surface-container-low px-4 py-2 text-body-md text-on-surface-variant print:hidden', ancha && 'mx-auto max-w-[1600px]')}>
                  <b className="text-on-surface">Modo invitado:</b> tus personajes se guardan solo en este navegador, no en la nube. Para no perderlos, usa «Descargar respaldo» en el menú o <a href="/registro" className="font-bold text-primary underline">crea una cuenta</a>.
                </p>
              </div>
            )}
            <Vista elegirArchivos={elegirArchivos} importarHojas={importarHojas} />
          </>}
      </main>

      <footer className="hidden w-full bg-surface-container-lowest py-5 md:block print:hidden">
        <div className="flex w-full flex-col items-center justify-between gap-3 px-6 text-body-sm text-on-surface-variant sm:flex-row">
          <div className="flex items-center gap-2"><span className="font-serif text-headline-sm text-primary">Mi turno</span><span>— Creador y hoja de D&amp;D 2024</span></div>
          <div className="flex items-center gap-5">
            <span className="text-label-caps uppercase text-outline">Reglas 5.5e (2024)</span>
            <span>{invitado ? 'Guardado en este navegador' : 'Guardado en tu cuenta'}</span>
          </div>
        </div>
      </footer>

      {nav.length > 0 && (
        <nav ref={navAbajo} aria-label="Principal (móvil)" className="fixed inset-x-0 bottom-0 z-20 border-t border-outline-variant/50 bg-surface-container-lowest/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden print:hidden">
          <ul className="m-0 grid list-none p-0" style={{ gridTemplateColumns: `repeat(${nav.length}, 1fr)` }}>
            {nav.map(it => (
              <li key={it.vista}>
                <button type="button" aria-current={it.activa ? 'page' : undefined} onClick={() => ir(it.vista)}
                  className={cx('flex min-h-16 w-full cursor-pointer flex-col items-center justify-center gap-0.5 text-xs font-bold', foco, it.activa ? 'text-primary' : 'text-outline')}>
                  <span className={cx('grid h-8 w-14 place-items-center rounded-full', it.activa && 'bg-surface-container-high')}><Icono d={ICONOS[it.vista]} /></span>
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
