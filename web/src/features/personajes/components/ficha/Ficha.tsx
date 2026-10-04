/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Fragment, createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { S, render } from '@/app-shell/estado';
import { esc, modStr, norm, richT, sign } from '@/shared/utils/texto';
import { Aviso, Boton, Dialogo, Simbolo, cx, foco } from '@/shared/ui/kit';
import { avisar } from '@/shared/ui/avisos';
import { AB, SKILLS, TIPOS, ORDEN_TIPOS, abInfo } from '@/features/reglas/data/caracteristicas';
import { COMUNES } from '@/features/reglas/data/comunes';
import { textoArmaduras, textoArmas } from '@/features/reglas/domain/competencias';
import { EtiquetaTipo, FormaTipo } from '@/features/reglas/components/TipoAccion';
import { BotonTirada, TextoConDados } from '@/features/dados/components/BotonTirada';
import { useDados } from '@/features/dados/components/Bandeja';
import { Entrada, LanzarConjuro, Mover, datosConjuro } from '../piezas';
import { fijarPool, irAPaso, moverPool, setVal, tocarPip } from '../../acciones';
import { desglose } from '../../domain/calculo';
import { usosDeRecurso, type UsoRecurso } from '../../domain/usos-recurso';
import { extrasAtaque } from '../../domain/lanzar';
import { MONEDAS, bolsaDe } from '../../domain/inventario';
import { Inventario } from '../Inventario';
import { Criaturas } from './Criaturas';
import { Herramienta } from './Herramientas';
import { HojaImpresa } from './HojaImpresa';
import { Imagen } from '@/shared/ui/imagen';
import { getLib } from '@/features/biblioteca/domain/biblioteca';
import { achicarImagen } from '@/features/biblioteca/components/PanelMedia';
import { imagenDeClase, imagenesParaElegir, leerClaveOrigen } from '@/features/biblioteca/domain/imagenes-origen';

/** Solo lectura: la hoja de un jugador vista desde la mesa del DM. Se ve todo, pero nada se puede cambiar ni gastar
    (las acciones de la hoja trabajan sobre el personaje abierto, que no es este). */
const Lectura = createContext(false);
const useLectura = () => useContext(Lectura);

export const PASO_N: Record<string, string> = { especie: 'Especie', clase: 'Clase', trasfondo: 'Trasfondo', stats: 'Características', habs: 'Habilidades', equipo: 'Equipo', conjuros: 'Conjuros', rasgos: 'Rasgos propios', detalles: 'Detalles' };

/* De dónde sale el bono de una habilidad: la característica y la competencia (doble con pericia, o la mitad con Polivalente) */
function desgloseHabilidad(c: any, k: string, a: string) {
  const bardo = c.pj?.clase === 'bardo' && c.lvl >= 2 && !c.skillProf[k] ? Math.floor(c.pb / 2) : 0;
  return desglose([[c.m[a], a.toUpperCase()], [c.skillProf[k] ? c.pb * (c.skillPer[k] ? 2 : 1) : bardo,
    c.skillPer[k] ? 'competencia ×2 (pericia)' : c.skillProf[k] ? 'competencia' : 'Polivalente']]);
}

/* Números editables sin las flechas del navegador */
const SIN_FLECHAS = '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';
const alSoltarEnter = (e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') e.currentTarget.blur(); };
const metros = (pies: number) => `${String(Math.round(pies * 0.3 * 10) / 10).replace('.', ',')} m`;

/** Encabezado pequeño de tarjeta: ícono dorado + etiqueta en versalitas. */
const Rotulo = ({ icono, children, extra }: { icono: string; children: ReactNode; extra?: ReactNode }) => (
  <div className="mb-2 flex items-center justify-between gap-2">
    <h2 className="m-0 flex items-center gap-1 font-sans text-label-caps uppercase tracking-wider text-outline">
      <Simbolo n={icono} className="text-body-md text-primary" />{children}
    </h2>
    {extra}
  </div>
);

/** Desplegable con el aspecto de la ficha (versalitas pequeñas, fondo hundido). */
function Desplegable({ titulo, nota, children }: { titulo: string; nota?: string; children: ReactNode }) {
  return (
    <details className="group rounded-lg bg-surface-container-lowest/60">
      <summary className={cx('flex min-h-11 cursor-pointer list-none flex-wrap items-center gap-x-2 rounded-lg px-3 py-2 [&::-webkit-details-marker]:hidden', foco)}>
        <Simbolo n="chevron_right" className="text-body-lg text-outline transition-transform group-open:rotate-90" />
        <span className="text-label-caps uppercase tracking-wider text-on-surface-variant">{titulo}</span>
        {nota && <span className="text-body-sm text-outline">{nota}</span>}
      </summary>
      <div className="px-3 pb-3">{children}</div>
    </details>
  );
}

/* ===================== Cabecera: identidad ===================== */
/** Imagen del personaje: la que subió el jugador o, si no, una del set de su clase (con su especie si la hay). */
export function imagenPersonaje(c: any): { src: string; propia: boolean } {
  const pj = c.pj;
  if (pj.imagen) return { src: pj.imagen, propia: true };
  const LIB = getLib();
  // Una de la biblioteca que eligió el jugador (si ya no existe, vuelve la automática)
  if (pj.imagenClave && LIB.img?.[pj.imagenClave]) return { src: String(LIB.img[pj.imagenClave]), propia: true };
  const k = imagenDeClase(LIB.img, { especie: pj.especie?.key, sub: pj.especie?.sub, clase: pj.clase, subclase: c.SD?.key || '' }, pj.id || '');
  return { src: k ? String(LIB.img?.[k]) : '', propia: false };
}

/** El jugador sube su imagen; se guarda achicada dentro de la hoja. */
async function subirImagenPj(f: File) {
  try { setVal('imagen', await achicarImagen(f, 512, 0.85)); }
  catch { avisar('No se pudo leer esa imagen.', 'error'); }
}

function Identidad({ c }: { c: any }) {
  const pj = c.pj, lectura = useLectura();
  const esp = pj.especie.key === 'custom' ? pj.especie.nombre : c.E ? c.E.n + (c.E.subs?.[c.esub] ? ` (${c.E.subs[c.esub].n})` : '') : '';
  const subN = c.SD ? c.SD.n : (pj.subclase === 'otra' && c.lvl >= c.subNivel ? pj.subclaseNombre : '');
  const linea = c.C ? `${c.C.n}${subN ? ` (${subN})` : ''}${c.chain ? ', Pacto de la Cadena' : ''} • Nivel ${c.lvl}` : 'Sin clase todavía';
  const insp = !!pj.inspiracion;
  const inicial = (pj.nombre || '?').trim().charAt(0).toUpperCase();
  const retrato = imagenPersonaje(c);
  const [eligiendo, setEligiendo] = useState(false), [menuImagen, setMenuImagen] = useState(false);
  const archivo = useRef<HTMLInputElement>(null);
  const opciones = eligiendo ? imagenesParaElegir(getLib().img, { especie: pj.especie?.key, sub: pj.especie?.sub, clase: pj.clase }) : [];
  const elegir = (k: string) => { setVal('imagen', ''); setVal('imagenClave', k); setEligiendo(false); };
  return (
    <div className="flex flex-col items-center gap-5 rounded-lg bg-surface-container-low p-5 shadow-xl sm:flex-row sm:items-start">
      <Dialogo abierto={menuImagen} onCerrar={() => setMenuImagen(false)} titulo="Imagen del personaje">
        <div className="flex flex-col gap-2">
          <Boton onClick={() => { setMenuImagen(false); archivo.current?.click(); }}><Simbolo n="smartphone" className="text-body-lg" />Galería del teléfono</Boton>
          {!!pj.especie?.key && <Boton onClick={() => { setMenuImagen(false); setEligiendo(true); }}><Simbolo n="photo_library" className="text-body-lg" />Galería de la app</Boton>}
        </div>
      </Dialogo>
      <Dialogo abierto={eligiendo} onCerrar={() => setEligiendo(false)} titulo="Elegir imagen" ancho="lg"
        descripcion={opciones.length ? 'Solo imágenes de su especie' + (opciones.some(k => leerClaveOrigen(k)?.clase === pj.clase) ? ' y de su clase.' : ' (no hay de su clase).') : undefined}>
        {opciones.length ? (
          <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-3">
            {opciones.map(k => (
              <li key={k}>
                <button type="button" onClick={() => elegir(k)} aria-label={`Usar esta imagen${pj.imagenClave === k ? ' (la actual)' : ''}`} aria-pressed={pj.imagenClave === k}
                  className={cx('block w-full cursor-pointer overflow-hidden rounded-lg p-1 ring-2', foco, pj.imagenClave === k ? 'ring-primary' : 'ring-transparent hover:ring-outline')}>
                  <Imagen src={String(getLib().img![k])} alt="" className="aspect-square w-full rounded bg-surface-container-high object-cover object-top" />
                </button>
              </li>
            ))}
          </ul>
        ) : <p className="m-0 text-on-surface-variant">La biblioteca todavía no tiene imágenes de su especie. Puedes subir una propia con el botón de la cámara.</p>}
      </Dialogo>
      <div className="relative shrink-0">
        <div className="size-28 overflow-hidden rounded-lg bg-linear-to-b from-primary-container via-outline-variant to-surface-container-lowest p-1 shadow-[0_0_24px_rgba(212,175,55,0.2)] sm:size-32">
          {retrato.src
            ? <Imagen src={retrato.src} alt={`Imagen de ${pj.nombre || 'el personaje'}`} className="size-full rounded bg-surface-container-high object-cover object-top" />
            : <div aria-hidden="true" className="grid size-full place-items-center rounded bg-linear-to-br from-surface-container-high to-surface-container-lowest">
                <span className="font-serif text-6xl font-bold text-primary">{inicial}</span>
              </div>}
        </div>
        {!lectura && (
          <div className="absolute -left-2 -top-2">
            <button type="button" title="Cambiar la imagen" onClick={() => setMenuImagen(true)} aria-haspopup="dialog"
              className={cx('grid size-8 cursor-pointer place-items-center rounded-full bg-surface-container-highest text-primary shadow', foco)}>
              <Simbolo n="photo_camera" className="text-body-md" />
              <span className="sr-only">Cambiar la imagen del personaje</span>
            </button>
            <input ref={archivo} type="file" accept="image/*" className="sr-only" tabIndex={-1} aria-hidden="true"
              onChange={e => { const f = e.target.files?.[0]; if (f) { setVal('imagenClave', ''); subirImagenPj(f); } e.target.value = ''; }} />
          </div>
        )}
        {lectura ? (
          <span title={insp ? 'Tiene inspiración heroica' : 'Sin inspiración heroica'}
            className={cx('absolute -bottom-2 -right-2 flex items-center gap-1 rounded-full bg-surface-container-highest px-2 py-1 shadow-[0_0_12px_rgba(212,175,55,0.4)]', !insp && 'opacity-40')}>
            <Simbolo n="auto_awesome" relleno={insp} className="text-body-md text-primary" />
            <span className="text-label-caps uppercase tracking-widest text-primary">{insp ? 'Inspirado' : 'Sin inspiración'}</span>
          </span>
        ) : (
          <button type="button" aria-pressed={insp} onClick={() => setVal('inspiracion', !insp)} title="Inspiración heroica (toca para cambiar)"
            className={cx('absolute -bottom-2 -right-2 flex cursor-pointer items-center gap-1 rounded-full bg-surface-container-highest px-2 py-1 shadow-[0_0_12px_rgba(212,175,55,0.4)] transition-transform hover:scale-105', foco, !insp && 'opacity-40')}>
            <Simbolo n="auto_awesome" relleno={insp} className="text-body-md text-primary" />
            <span className="text-label-caps uppercase tracking-widest text-primary">Inspirado</span>
          </button>
        )}
      </div>
      <div className="flex h-full min-w-0 flex-col justify-between text-center sm:text-left">
        <div>
          {(esp || pj.alineamiento) && (
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              {esp && <span className="rounded-xs bg-surface-container-high px-2 py-1 text-label-caps uppercase tracking-wider text-secondary">{esp}</span>}
              {pj.alineamiento && <span className="rounded-xs bg-surface-container-high px-2 py-1 text-label-caps uppercase tracking-wider text-outline">{pj.alineamiento}</span>}
            </div>
          )}
          <h1 id="titulo-vista" tabIndex={-1} className="mb-0 mt-1 font-serif text-headline-xl-mobile tracking-wide text-primary outline-none [overflow-wrap:anywhere] sm:text-headline-xl">{pj.nombre || 'Sin nombre'}</h1>
          <p className="m-0 font-serif text-headline-sm italic text-on-surface-variant">{linea}</p>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          <div className="flex items-center gap-1 rounded bg-surface-container-lowest px-3 py-1 shadow-inner">
            <span className="text-label-caps uppercase text-outline">Bono comp.</span>
            <span className="text-stat-modifier font-bold text-primary">{sign(c.pb)}</span>
          </div>
          <div className="flex items-center gap-1 rounded bg-surface-container-lowest px-3 py-1 shadow-inner">
            <span className="text-label-caps uppercase text-outline">Velocidad</span>
            <span className="text-body-lg font-semibold text-on-surface">{metros(c.speed)} <span className="text-body-sm text-outline">({c.speed} pies)</span></span>
          </div>
          <div className="flex items-center gap-1 rounded bg-surface-container-lowest px-3 py-1 shadow-inner">
            <span className="text-label-caps uppercase text-outline">Iniciativa</span>
            <BotonTirada estilo="libre" expr={`1d20${modStr(c.init)}`} label="Iniciativa" mods={desglose(c.initPartes || [])} ariaLabel={`Tirar iniciativa, ${sign(c.init)}`}
              className="flex items-center gap-0.5 rounded text-stat-modifier text-secondary transition-colors hover:text-primary">
              {sign(c.init)}<Simbolo n="casino" className="text-body-sm" />
            </BotonTirada>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== Cabecera: CA, PG, dados de golpe ===================== */
/** Tres casillas de salvación contra muerte; marcar una deja marcadas las anteriores. */
function Salvaciones({ clave, n, acento, nombre }: { clave: string; n: number; acento: string; nombre: string }) {
  const lectura = useLectura();
  return (
    <div className="flex gap-1.5">
      {[0, 1, 2].map(i => (
        <input key={i} type="checkbox" checked={i < n} disabled={lectura} aria-label={`${nombre} ${i + 1}`} title={`${nombre} ${i + 1}`}
          onChange={() => setVal(`used.${clave}`, i < n ? i : i + 1)} className={cx('size-3.5 rounded-sm', lectura ? 'cursor-default' : 'cursor-pointer', acento)} />
      ))}
    </div>
  );
}

function Vitales({ c }: { c: any }) {
  const pj = c.pj, tirar = useDados(), lectura = useLectura();
  const pg = c.recursos.find((r: any) => r.id === 'pg');
  const max = pg?.max ?? c.hpMax, actual = max - Math.min(pj.used?.pg || 0, max);
  const temp = Math.max(0, +pj.pgTemp || 0);
  const pct = max ? (actual / max) * 100 : 0;
  const barra = pct <= 25 ? 'bg-error' : pct <= 50 ? 'bg-primary-fixed-dim' : 'bg-linear-to-r from-primary-container to-primary';
  // El daño se lleva primero los puntos temporales
  const danar = (n: number) => {
    const t = Math.min(temp, n);
    if (t) setVal('pgTemp', temp - t);
    if (n - t && pg) moverPool('pg', -(n - t));
  };
  const curar = (n: number) => { if (pg) moverPool('pg', n); };
  const armadura = [c.armor?.n || 'Sin armadura', c.shield && 'Escudo'].filter(Boolean).join(' & ');

  const dgUsados = Math.min(pj.used?.['dados-golpe'] || 0, c.lvl), dgQuedan = c.lvl - dgUsados;
  const gastarDado = async () => {
    if (!dgQuedan) return avisar('No te quedan dados de golpe: vuelven con un descanso largo.', 'aviso');
    setVal('used.dados-golpe', dgUsados + 1);
    const r = await tirar(`1d${c.die}${modStr(c.m.con)}`, 'Dado de golpe', { mods: desglose([[c.m.con, 'CON']]) }).catch(() => null);
    if (r && r.total > 0) curar(r.total);
  };
  const exitos = Math.min(3, pj.used?.['muerte-exitos'] || 0), fallos = Math.min(3, pj.used?.['muerte-fallos'] || 0);

  return (
    <div className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-4">
      {/* Armadura */}
      <div className="relative flex flex-col items-center justify-between overflow-hidden rounded-lg bg-surface-container-low p-3 text-center shadow-lg">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary-container/10 via-transparent to-transparent" />
        <div className="flex items-center gap-1 text-outline">
          <Simbolo n="shield" className="text-headline-sm text-primary" />
          <span className="whitespace-nowrap text-label-caps uppercase tracking-wide">Armadura (CA)</span>
        </div>
        <div className="my-1 text-stat-display tracking-tight text-on-surface">{c.ac}</div>
        <span className="text-body-sm text-on-surface-variant">{armadura}</span>
      </div>

      {/* Puntos de golpe */}
      <div className="col-span-2 flex flex-col justify-between rounded-lg bg-surface-container-low p-3 shadow-lg">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-outline">
            <Simbolo n="favorite" className="text-headline-sm text-error" />
            <span className="text-label-caps uppercase tracking-wider">Puntos de golpe (PG)</span>
          </div>
          {lectura ? (
            <span className="flex items-center gap-1 text-label-caps uppercase text-secondary">
              Temp: <span className="rounded bg-surface-container-lowest px-1 text-body-md font-bold text-secondary-fixed-dim">{temp}</span>
            </span>
          ) : (
            <label className="flex items-center gap-1 text-label-caps uppercase text-secondary">
              Temp:
              <input key={temp} type="number" inputMode="numeric" min={0} defaultValue={temp || ''} placeholder="0" aria-label="Puntos de golpe temporales"
                onBlur={e => { const v = Math.max(0, parseInt(e.target.value) || 0); if (v !== temp) setVal('pgTemp', v); }} onKeyDown={alSoltarEnter}
                className={cx('w-10 rounded bg-surface-container-lowest px-1 text-center text-body-md font-bold text-secondary-fixed-dim placeholder:text-outline', SIN_FLECHAS, foco)} />
            </label>
          )}
        </div>
        <div className="my-1 flex flex-wrap items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-1">
            {lectura ? <span className="text-stat-display text-primary">{actual}</span> : (
              <input key={actual} type="number" inputMode="numeric" min={0} max={max} defaultValue={actual} aria-label={`Puntos de golpe actuales (de ${max})`}
                onBlur={e => { if (+e.target.value !== actual) fijarPool('pg', max, e.target.value); }} onKeyDown={alSoltarEnter}
                style={{ width: `${String(actual).length + 0.6}ch` }}
                className={cx('rounded bg-transparent text-stat-display text-primary hover:bg-surface-container-lowest focus:bg-surface-container-lowest', SIN_FLECHAS, foco)} />
            )}
            <span className="whitespace-nowrap text-body-lg text-outline">/ {max} máx.</span>
          </div>
          <div className={cx('flex items-center gap-1', lectura && 'hidden')}>
            {[-5, -1, 1, 5].map(n => (
              <button key={n} type="button" onClick={() => (n < 0 ? danar(-n) : curar(n))}
                aria-label={n < 0 ? `Recibir ${-n} de daño` : `Curar ${n}`}
                className={cx('min-h-7 min-w-7 cursor-pointer rounded bg-surface-container-high px-1.5 py-1 text-body-sm font-bold shadow-sm transition-all', foco,
                  n < 0 ? 'text-error hover:bg-error-container hover:text-on-error-container' : 'text-primary hover:bg-primary-container hover:text-on-primary-container')}>
                {n > 0 ? `+${n}` : n}
              </button>
            ))}
          </div>
        </div>
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-surface-container-lowest p-0.5 shadow-inner">
          <div className={cx('h-full rounded-full transition-all duration-300', barra)} style={{ width: `${Math.max(pct, actual > 0 ? 3 : 0)}%` }} />
        </div>
      </div>

      {/* Dados de golpe y salvaciones contra muerte */}
      <div className="col-span-2 flex flex-col justify-between rounded-lg bg-surface-container-low p-3 shadow-lg md:col-span-1">
        <div>
          <div className="flex items-center justify-between text-outline">
            <span className="text-label-caps uppercase tracking-wider">Dados golpe</span>
            <span className="text-label-caps text-secondary">{c.lvl}d{c.die}</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="font-serif text-headline-sm text-on-surface">{dgQuedan} / {c.lvl}</span>
            {!lectura && (
              <button type="button" onClick={gastarDado} title="Gastar un dado de golpe: tira y te cura" aria-label={`Gastar un dado de golpe (1d${c.die}${modStr(c.m.con)}), quedan ${dgQuedan}`}
                className={cx('grid size-8 cursor-pointer place-items-center rounded bg-surface-container-high text-primary transition-all hover:bg-primary hover:text-on-primary', foco)}>
                <Simbolo n="healing" className="text-body-md" />
              </button>
            )}
          </div>
        </div>
        <div className="mt-1 rounded-lg bg-surface-container-lowest/50 p-1">
          <div className="flex items-center justify-between text-label-caps uppercase text-outline">
            <span>Éxitos</span><Salvaciones clave="muerte-exitos" n={exitos} acento="accent-primary" nombre="Éxito" />
          </div>
          <div className="mt-1 flex items-center justify-between text-label-caps uppercase text-outline">
            <span>Fallos</span><Salvaciones clave="muerte-fallos" n={fallos} acento="accent-error" nombre="Fallo" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== Franja de características ===================== */
const ICONO_AB: Record<string, string> = { fue: 'fitness_center', des: 'bolt', con: 'shield', int: 'auto_stories', sab: 'visibility', car: 'theater_comedy' };

function Caracteristicas({ c }: { c: any }) {
  return (
    <section aria-label="Características" className="w-full bg-surface-dim px-4 py-5 shadow-inner lg:px-6">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {AB.map(([k, , ab, nm]) => {
          const prof = c.saveProf.includes(k);
          // Dorado si salva con competencia, azul si el modificador suma, neutro si no
          const tono = prof ? 'primary' : c.m[k] > 0 ? 'secondary' : 'neutro';
          return (
            <div key={k} className="group relative flex flex-col items-center overflow-hidden rounded-lg bg-surface-container p-3 text-center shadow-md transition-all hover:bg-surface-container-high">
              <div className="flex w-full items-center justify-between text-outline">
                <span className="text-label-caps uppercase tracking-widest text-on-surface-variant">{nm}</span>
                <Simbolo n={ICONO_AB[k]} className={cx('text-body-sm', tono === 'primary' ? 'text-primary' : tono === 'secondary' ? 'text-secondary' : 'text-outline')} />
              </div>
              <div className="my-1 text-stat-display text-on-surface">{c.sc[k]}</div>
              <BotonTirada estilo="libre" expr={`1d20${modStr(c.m[k])}`} label={`Prueba de ${nm}`} mods={desglose([[c.m[k], ab]])} ariaLabel={`Prueba de ${nm} (${c.sc[k]}), ${sign(c.m[k])}`}
                className={cx('flex w-full items-center justify-center gap-1 rounded bg-surface-container-lowest px-2 py-1 shadow-inner transition-all',
                  tono === 'primary' ? 'text-primary hover:bg-primary-container hover:text-on-primary-container'
                    : tono === 'secondary' ? 'text-secondary hover:bg-secondary-container hover:text-on-secondary-container'
                      : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface')}>
                <span className="text-stat-modifier font-bold">{sign(c.m[k])}</span>
                <Simbolo n="casino" className="text-body-sm" />
              </BotonTirada>
              <div className="mt-1 flex w-full items-center justify-between text-label-caps text-outline">
                <span className={cx(prof && 'text-primary-fixed-dim')}>Salvación:</span>
                <BotonTirada estilo="libre" expr={`1d20${modStr(c.saves[k])}`} label={`Salvación de ${nm}`}
                  mods={desglose([[c.m[k], ab], [prof ? c.pb : 0, 'competencia']])}
                  ariaLabel={`Salvación de ${nm}, ${sign(c.saves[k])}${prof ? ', competente' : ''}`}
                  className="rounded font-bold text-on-surface transition-colors hover:text-primary">
                  {sign(c.saves[k])}{prof ? ' ★' : ''}
                </BotonTirada>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ===================== Columna izquierda ===================== */
function SentidosPasivos({ c }: { c: any }) {
  const filas: [string, number][] = [
    ['Percepción pasiva', c.passive],
    ['Investigación pasiva', 10 + (c.skill['investigacion'] || 0)],
    ['Perspicacia pasiva', 10 + (c.skill['perspicacia'] || 0)],
  ];
  return (
    <div className="rounded-lg bg-surface-container-low p-3 shadow-lg">
      <Rotulo icono="explore">Sentidos pasivos</Rotulo>
      <div className="space-y-1">
        {filas.map(([n, v], i) => (
          <div key={n} className="flex items-center justify-between rounded-xs bg-surface-container-lowest p-1">
            <span className="text-body-sm text-on-surface-variant">{n}</span>
            <span className={cx('text-label-md font-bold', i === 0 ? 'text-primary' : 'text-on-surface')}>{v}</span>
          </div>
        ))}
      </div>
      {c.vision > 0 && (
        <div className="mt-3 border-t border-surface-container-high/40 pt-1">
          <span className="text-label-caps uppercase text-outline">Sentidos especiales</span>
          <div className="mt-1 flex flex-wrap gap-1">
            <span className="rounded-full bg-surface-container-high px-2 py-0.5 text-body-sm text-secondary">Visión en la oscuridad {c.vision} pies</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Habilidades({ c }: { c: any }) {
  return (
    <div className="rounded-lg bg-surface-container-low p-3 shadow-lg">
      <Rotulo icono="format_list_bulleted" extra={<span className="text-label-caps text-outline">★ = competente</span>}>Habilidades</Rotulo>
      <ul className="m-0 list-none space-y-1 p-0">
        {SKILLS.map(([n, a]) => {
          const k = norm(n), prof = !!c.skillProf[k], per = !!c.skillPer[k];
          const acento = per ? 'text-secondary' : 'text-primary';
          return (
            <li key={n}>
              <BotonTirada estilo="libre" expr={`1d20${modStr(c.skill[k])}`} label={n} mods={desgloseHabilidad(c, k, a)}
                ariaLabel={`${n}${prof ? ', competente' : ''}${per ? ', con pericia' : ''}: ${sign(c.skill[k])}`}
                className={cx('group flex w-full items-center justify-between rounded-xs p-1 text-left transition-colors hover:bg-surface-container', prof && 'bg-surface-container-lowest/60')}>
                <span className="flex min-w-0 items-center gap-1">
                  <span aria-hidden="true" className={cx('size-2 shrink-0 rounded-full', prof ? (per ? 'bg-secondary shadow-[0_0_6px_rgba(123,208,255,0.6)]' : 'bg-primary shadow-[0_0_6px_rgba(212,175,55,0.6)]') : 'bg-surface-container-highest')} />
                  <span className={cx('text-body-sm transition-colors', prof ? `font-semibold ${acento}` : 'text-on-surface group-hover:text-primary')}>
                    {n}{per ? ' (pericia)' : ''} <span className="text-label-caps text-outline">({a.toUpperCase()})</span>
                  </span>
                </span>
                <span className={cx('text-label-md tabular-nums', prof ? `font-bold ${acento}` : 'text-outline group-hover:text-on-surface')}>
                  {sign(c.skill[k])}{prof ? ' ★' : ''}
                </span>
              </BotonTirada>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Competencias({ c }: { c: any }) {
  const pj = c.pj, tb = pj.trasfondo, T = c.T;
  const datos: [string, ReactNode][] = [
    ['Armaduras', textoArmaduras(c)], ['Armas', textoArmas(c)], ['Herramientas', c.herramientas.map((h: any) => h.que).join(', ') || '—'],
    ...(c.compFuentes.length ? [['Competencias de rasgos', c.compFuentes.map((f: any) => `${f.que} (${f.src})`).join(', ')] as [string, ReactNode]] : []),
    ['Trasfondo', T ? (T.custom ? tb.nombre || 'Personalizado' : T.n) : '—'],
    ['Dotes', c.dotes.map((d: any) => d.nombre).join(', ') || 'Ninguna'],
  ];
  if (c.isMonk) datos.push(['CD de Focus', c.dcFocus]);
  if (pj.oro) datos.push(['Oro', `${pj.oro} po`]);
  return (
    <>
      <div className="rounded-lg bg-surface-container-low p-3 shadow-lg">
        <Rotulo icono="school">Competencias</Rotulo>
        <dl className="m-0 space-y-2">
          {datos.map(([k, v]) => (
            <div key={k}><dt className="text-label-caps uppercase text-outline">{k}</dt><dd className="m-0 text-body-sm text-on-surface">{v}</dd></div>
          ))}
        </dl>
      </div>
      {pj.historia && (
        <div className="rounded-lg bg-surface-container-low p-3 shadow-lg">
          <Rotulo icono="history_edu">Historia</Rotulo>
          <p className="m-0 text-body-sm text-on-surface-variant" dangerouslySetInnerHTML={{ __html: richT(pj.historia) }} />
        </div>
      )}
    </>
  );
}

/* ===================== Columna central ===================== */
/** Recursos de clase y rasgos (Oleada de Acción, Tomar Aliento, Ki…); los PG y los espacios de conjuro van en su tarjeta. */
function RecursosClase({ c }: { c: any }) {
  const u = c.pj.used || {}, lectura = useLectura();
  const rs = c.recursos.filter((r: any) => r.id !== 'pg' && !/^slot\d/.test(r.id));
  if (!rs.length) return null;
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {rs.map((r: any, i: number) => {
        const used = Math.min(u[r.id] || 0, r.max), left = r.max - used, azul = i % 2 === 1;
        const nota = r.nota || (r.reset === 'corto' ? 'Vuelve con descanso corto' : 'Vuelve con descanso largo');
        return (
          <div key={r.id} className="flex flex-col gap-2 rounded-lg bg-surface-container-low p-3 shadow-lg">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className={cx('grid size-10 shrink-0 place-items-center rounded bg-surface-container-highest', azul ? 'text-secondary' : 'text-primary')}>
                <Simbolo n={azul ? 'air' : 'flash_on'} className="text-headline-sm" />
              </div>
              <div className="min-w-0">
                <span className="block text-label-caps uppercase text-outline">{nota}</span>
                <h3 className="m-0 font-serif text-headline-sm text-on-surface">{r.nombre}</h3>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              {lectura ? (
                <span className={cx('rounded px-3 py-1 text-label-md font-bold', left
                  ? (azul ? 'bg-secondary-container text-on-secondary-container' : 'bg-primary-container text-on-primary-container')
                  : 'bg-surface-container-highest text-outline opacity-60')}>
                  {left} / {r.max} {left ? 'disp.' : 'gastado'}
                </span>
              ) : r.tipo === 'pool' ? (
                <label className="flex items-baseline gap-1 text-body-sm text-outline">
                  <input key={left} type="number" inputMode="numeric" min={0} max={r.max} defaultValue={left} aria-label={`${r.nombre}: quedan (de ${r.max})`}
                    onBlur={e => { if (+e.target.value !== left) fijarPool(r.id, r.max, e.target.value); }} onKeyDown={alSoltarEnter}
                    className={cx('w-12 rounded bg-surface-container-lowest px-1 py-1 text-center text-stat-modifier font-bold text-primary shadow-inner', SIN_FLECHAS, foco)} />
                  / {r.max}
                </label>
              ) : (
                <>
                  {used > 0 && (
                    <button type="button" onClick={() => moverPool(r.id, 1)} aria-label={`Recuperar 1 de ${r.nombre}`} title="Recuperar uno"
                      className={cx('grid size-8 cursor-pointer place-items-center rounded text-outline hover:bg-surface-container-high hover:text-on-surface', foco)}>
                      <Simbolo n="undo" className="text-body-md" />
                    </button>
                  )}
                  <button type="button" disabled={!left} onClick={() => moverPool(r.id, -1)} aria-label={`Gastar 1 de ${r.nombre}: quedan ${left} de ${r.max}`}
                    className={cx('rounded px-3 py-1 text-label-md font-bold shadow-sm transition-all', foco,
                      left ? (azul ? 'cursor-pointer bg-secondary-container text-on-secondary-container hover:brightness-110' : 'cursor-pointer bg-primary-container text-on-primary-container hover:brightness-110')
                        : 'bg-surface-container-highest text-outline opacity-60')}>
                    {left ? `${left} / ${r.max} disp.` : `0 / ${r.max} gastado`}
                  </button>
                </>
              )}
            </div>
          </div>
          <ParaQueSirve c={c} r={r} />
          </div>
        );
      })}
    </div>
  );
}

/** Letra pequeña bajo un recurso: para qué sirve y, al tocarla, lo que lo usa, por tipo de acción y por nombre.
 *  Cada nombre abre un popup con su detalle (como el de subir de nivel). */
function ParaQueSirve({ c, r }: { c: any; r: any }) {
  const [abierto, setAbierto] = useState<UsoRecurso | null>(null);
  const { para, usos } = usosDeRecurso(c, r);
  if (!para && !usos.length) return null;
  const cuantos = usos.length ? `${usos.length} ${usos.length === 1 ? 'cosa lo usa' : 'cosas lo usan'}` : '';
  const tipos = [...new Set(usos.map(u => (u.t && TIPOS[u.t] ? u.t : 'pasiva')))];
  const f = abierto?.fuente, d = abierto?.conjuro && f ? datosConjuro(f, c) : null;
  const texto = !f ? '' : abierto?.conjuro ? String(f.desc || '').trim() : String(f.texto || '');
  return (
    <>
      <details className="group rounded bg-surface-container-lowest/60">
        <summary className={cx('flex min-h-9 cursor-pointer list-none items-start gap-1 rounded px-2 py-1.5 [&::-webkit-details-marker]:hidden', foco)}>
          <Simbolo n="chevron_right" className="mt-px text-body-md text-outline transition-transform group-open:rotate-90" />
          <span className="min-w-0 flex-1 text-body-sm text-on-surface-variant">
            {para || 'Para qué sirve'}
            {cuantos && <span className="whitespace-nowrap text-primary"> · {cuantos}</span>}
          </span>
        </summary>
        {usos.length > 0 && (
          <div className="space-y-2 px-3 pb-3 pt-1">
            {tipos.map(t => (
              <div key={t}>
                <EtiquetaTipo t={t} />
                <ul className="m-0 mt-1 flex list-none flex-wrap gap-1 p-0">
                  {usos.filter(u => (u.t && TIPOS[u.t] ? u.t : 'pasiva') === t).map(u => (
                    <li key={u.nombre}>
                      <button type="button" onClick={() => setAbierto(u)} aria-haspopup="dialog"
                        className={cx('min-h-9 cursor-pointer rounded bg-surface-container px-2 py-1 text-body-sm font-semibold text-on-surface hover:bg-surface-container-high', foco)}>{u.nombre}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </details>
      <Dialogo abierto={!!abierto} onCerrar={() => setAbierto(null)} titulo={abierto?.nombre || ''}
        descripcion={abierto && <span className="inline-flex flex-wrap items-center gap-x-2">{abierto.t && TIPOS[abierto.t] && <EtiquetaTipo t={abierto.t} />}{abierto.coste && <span>{abierto.coste}</span>}</span>}>
        {abierto && (
          <div className="space-y-2 text-body-md text-on-surface-variant">
            {d?.meta && <p className="m-0 text-outline">{d.meta}</p>}
            {texto && <p className="m-0" dangerouslySetInnerHTML={{ __html: f?.raw || abierto.conjuro ? richT(texto) : esc(texto) }} />}
            {d?.origen && <p className="m-0">{d.origen}.</p>}
            {abierto.src && <p className="m-0 text-label-caps uppercase text-outline">De {abierto.src}</p>}
            <p className="m-0 text-label-caps uppercase text-outline">Gasta de: {r.nombre}</p>
          </div>
        )}
      </Dialogo>
    </>
  );
}

function FilaArsenal({ a, c }: { a: any; c: any }) {
  const lectura = useLectura();
  const n = a.w ? a.w.n : a.nombre, dist = !!a.w?.dist;
  const icono = dist ? 'adjust' : a.w ? 'colorize' : 'sports_martial_arts';
  const txt = dist ? 'text-secondary' : 'text-primary';
  const maestria = a.maestria ? String(a.maestria).split(':')[0] : '';
  const desc = [dist ? 'A distancia' : 'Cuerpo a cuerpo', a.dmg, ...(a.notas || [])].filter(Boolean).join(' • ');
  return (
    <div className="flex flex-col justify-between gap-3 rounded-lg bg-surface-container p-3 shadow-md transition-all hover:bg-surface-container-high sm:flex-row sm:items-center">
      <div className="flex min-w-0 items-start gap-3">
        <div className={cx('grid size-12 shrink-0 place-items-center rounded-lg bg-surface-container-lowest shadow-inner', txt)}>
          <Simbolo n={icono} className="text-headline-md" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1">
            <h3 className="m-0 font-serif text-headline-sm text-on-surface">{a.nombre}</h3>
            {maestria && <span className="rounded-xs bg-primary-container/20 px-1 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">{maestria}</span>}
          </div>
          <p className="m-0 mt-0.5 text-body-sm text-outline">{desc}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 text-label-caps text-on-surface-variant">
            {a.cd != null
              ? <span>Salvación: <strong className={txt}>CD {a.cd} de {a.salv}</strong></span>
              : <span>Modificador: <strong className={txt}>{sign(a.atk)} impacto</strong></span>}
            {a.v && <span>Versátil ({a.v.dmg})</span>}
          </div>
          {a.maestria && <p className="m-0 mt-1 text-body-sm text-on-surface-variant"><b className="text-on-surface">Maestría</b> {a.maestria}</p>}
        </div>
      </div>
      <div className="flex shrink-0 gap-1 sm:flex-col">
        {a.cd == null && (
          <BotonTirada estilo="libre" expr={`1d20${modStr(a.atk)}`} label={`${n}: ataque`} dmg={a.expr} dmgLabel={`${n}: daño`} min3={a.min3}
            extras={lectura ? undefined : extrasAtaque(c, a)} mods={a.atkDesg} dmgMods={a.dmgDesg} ariaLabel={`Tirar ataque con ${n}, ${sign(a.atk)}`}
            className={cx('flex flex-1 items-center justify-center gap-1 rounded bg-surface-container-lowest px-3 py-2 text-label-md font-bold shadow-inner transition-all sm:flex-none',
              dist ? 'text-secondary hover:bg-secondary hover:text-on-secondary' : 'text-primary hover:bg-primary hover:text-on-primary')}>
            <Simbolo n={dist ? 'gps_fixed' : 'sports_martial_arts'} className="text-body-md" />{dist ? 'Disparar' : 'Tirar ataque'}
          </BotonTirada>
        )}
        <BotonTirada estilo="libre" expr={a.expr} label={`${n}: daño`} min3={a.min3} gasta={lectura ? undefined : a.gasta} mods={a.dmgDesg} ariaLabel={`Tirar daño de ${n}: ${a.dmg}`}
          className="flex-1 rounded bg-surface-container-high px-3 py-1 text-center text-body-sm text-on-surface-variant transition-all hover:bg-surface-container-highest hover:text-on-surface sm:flex-none">
          Tirar daño
        </BotonTirada>
        {a.v && (
          <BotonTirada estilo="libre" expr={a.v.expr} label={`${n}: daño a dos manos`} min3={a.min3} mods={a.dmgDesg}
            className="flex-1 rounded bg-surface-container-high px-3 py-1 text-center text-body-sm text-on-surface-variant transition-all hover:bg-surface-container-highest hover:text-on-surface sm:flex-none">
            A dos manos
          </BotonTirada>
        )}
      </div>
    </div>
  );
}

function Arsenal({ c }: { c: any }) {
  const armas = [...c.armas.filter((a: any) => a.mano), ...(c.naturales || [])];
  const guardadas = c.armas.filter((a: any) => !a.mano);
  const sinArmas = { nombre: 'Golpe sin armas', atk: c.unarmed.atk, expr: c.unarmed.expr, dmg: c.unarmed.dmg, atkDesg: c.unarmed.atkDesg, dmgDesg: c.unarmed.dmgDesg, notas: [`También puede Agarrar o Empujar (CD ${c.grappleDC})`] };
  const ataques = c.pj?.clase === 'guerrero' ? (c.lvl >= 20 ? 4 : c.lvl >= 11 ? 3 : 2) : 2;
  return (
    <section aria-labelledby="titulo-arsenal" className="flex flex-col gap-3 rounded-lg bg-surface-container-low p-5 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <Simbolo n="swords" className="text-headline-sm text-primary" />
          <h2 id="titulo-arsenal" className="m-0 font-serif text-headline-md text-primary">Arsenal de combate</h2>
        </div>
        {c.extraAttack && <span className="rounded bg-surface-container-high px-2 py-1 text-label-caps uppercase text-secondary">Ataque extra ({ataques} ataques/turno)</span>}
      </div>
      {armas.map((a: any, i: number) => <FilaArsenal key={(a.i ?? 'n') + '-' + i} a={a} c={c} />)}
      <FilaArsenal a={sinArmas} c={c} />
      {guardadas.length > 0 && (
        <Desplegable titulo="Armas guardadas" nota="Sacar una es interactuar con un objeto. Cambia lo que empuñas en Equipo.">
          <div className="flex flex-col gap-3">{guardadas.map((a: any) => <FilaArsenal key={'g' + a.i} a={a} c={c} />)}</div>
        </Desplegable>
      )}
    </section>
  );
}

function TiradorRapido() {
  const tirar = useDados();
  return (
    <div className="rounded-lg bg-surface-container-low p-3 shadow-lg">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-1 text-label-caps uppercase tracking-wider text-outline">
          <Simbolo n="casino" className="text-body-md text-primary" />Tirador rápido de dados
        </span>
        <span className="text-body-sm text-outline">Toca para lanzar sin modificador</span>
      </div>
      <div className="grid grid-cols-4 gap-1 sm:grid-cols-7">
        {[4, 6, 8, 10, 12, 20, 100].map(n => (
          <button key={n} type="button" onClick={() => tirar(`1d${n}`, `d${n}`, { neutral: true })} aria-label={`Tirar un d${n}`}
            className={cx('flex cursor-pointer flex-col items-center rounded-xs py-2 transition-all hover:bg-primary hover:text-on-primary', foco,
              n === 20 ? 'bg-surface-container-high text-primary shadow-md' : 'bg-surface-container text-outline')}>
            <span className="text-body-sm uppercase">d{n}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/** Lo demás que puedes hacer en tu turno (rasgos por tipo de acción); los ataques y los conjuros tienen su propia tarjeta. */
function OtrasAcciones({ c }: { c: any }) {
  const lectura = useLectura();
  // Familiares y criaturas van justo debajo de Acción adicional (aunque esa sección no tenga nada)
  const hayCriaturas = lectura ? !!c.criaturas?.length : !!((c.criaturasPuede || []).length || c.criaturas?.length);
  const criaturas = hayCriaturas && (lectura ? <CriaturasLectura key="criaturas" c={c} /> : (
    <div key="criaturas" className="rounded-lg bg-surface-container-low p-5 shadow-lg [&>section]:mt-0"><Criaturas c={c} /></div>
  ));
  return (
    <>
      {ORDEN_TIPOS.filter(t => t !== 'pasiva').map(t => {
        const ents = c.entries.filter((e: any) => e.t === t), com = COMUNES[t] || [];
        const extra = t === 'adicional' ? criaturas : null;
        if (!ents.length && !com.length) return <Fragment key={t}>{extra}</Fragment>;
        return (
          <Fragment key={t}>
            <section aria-labelledby={`sec-${t}`} className="rounded-lg bg-surface-container-low p-5 shadow-lg">
              <div className="flex items-center gap-2">
                <FormaTipo t={t} className="size-4" />
                <h2 id={`sec-${t}`} className="m-0 font-serif text-headline-md text-on-surface">{TIPOS[t][0]}</h2>
              </div>
              {TIPOS[t][1] && <p className="mb-2 ml-6 mt-0.5 text-body-sm text-outline">{TIPOS[t][1]}</p>}
              {ents.map((e: any, i: number) => <Entrada key={i} e={e} />)}
              {com.length > 0 && (
                <Desplegable titulo={t === 'accion' ? 'Acciones que cualquiera puede hacer' : 'Para cualquier personaje'}>
                  {com.map(([n, f]: [string, (c: any) => string]) => <Entrada key={n} e={{ t, nombre: n, texto: f(c), src: 'Reglas básicas' }} />)}
                </Desplegable>
              )}
            </section>
            {extra}
          </Fragment>
        );
      })}
    </>
  );
}

/* ===================== Columna derecha ===================== */
function Ranuras({ r, c }: { r: any; c: any }) {
  const lectura = useLectura();
  const used = Math.min(c.pj.used?.[r.id] || 0, r.max), quedan = r.max - used;
  const nivel = r.id.replace('slot', '');
  const titulo = !r.nombre || /^Espacios de nivel/.test(r.nombre) ? `Ranuras nivel ${nivel}` : r.nombre;
  return (
    <div className="rounded-lg bg-surface-container p-3 shadow-inner">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-label-caps uppercase tracking-wider text-outline">{titulo}</span>
        <span className="text-label-caps text-secondary">{quedan} / {r.max} disponibles</span>
      </div>
      <div role="group" aria-label={`${titulo}: quedan ${quedan} de ${r.max}`} className="flex flex-wrap items-center gap-2">
        {Array.from({ length: r.max }, (_, i) => {
          const libre = i < quedan;
          if (lectura) return (
            <span key={i} aria-hidden="true" className={cx('flex h-10 min-w-10 flex-1 items-center justify-center rounded',
              libre ? 'bg-secondary-container text-on-secondary-container shadow-[0_0_12px_rgba(0,166,224,0.4)]' : 'bg-surface-container-lowest text-outline opacity-50 shadow-inner')}>
              <Simbolo n={libre ? 'diamond' : 'radio_button_unchecked'} className="text-body-md" />
            </span>
          );
          return (
            <button key={i} type="button" aria-pressed={!libre} onClick={() => tocarPip(r.id, i, r.max)}
              aria-label={`${titulo}, ranura ${i + 1}: ${libre ? 'disponible, toca para gastarla' : 'gastada, toca para recuperarla'}`}
              className={cx('flex h-10 min-w-10 flex-1 cursor-pointer items-center justify-center rounded transition-all hover:scale-105', foco,
                libre ? 'bg-secondary-container text-on-secondary-container shadow-[0_0_12px_rgba(0,166,224,0.4)]' : 'bg-surface-container-lowest text-outline opacity-50 shadow-inner')}>
              <Simbolo n={libre ? 'diamond' : 'radio_button_unchecked'} className="text-body-md" />
            </button>
          );
        })}
      </div>
      <div className="mt-2"><ParaQueSirve c={c} r={r} /></div>
    </div>
  );
}

function FilaConjuro({ s, c }: { s: any; c: any }) {
  const lectura = useLectura();
  const d = datosConjuro(s, c);
  const meta = [TIPOS[s.tiempo || 'accion']?.[0], d.bits.join(', '), s.coste].filter(Boolean).join(' • ');
  const primero = String(s.desc || '').trim().split(/\n\s*\n/)[0];
  return (
    <li className="flex items-start gap-1 rounded-xs bg-surface-container-lowest">
      <details className="group min-w-0 flex-1">
        <summary className={cx('flex cursor-pointer list-none flex-col p-1 pl-2 [&::-webkit-details-marker]:hidden', foco)}>
          <span className="text-body-sm font-semibold text-on-surface">{s.nombre}</span>
          <span className="text-label-caps text-outline">{meta}</span>
        </summary>
        <div className="space-y-1 px-2 pb-2 text-body-sm text-on-surface-variant">
          {d.meta && <p className="m-0 text-outline">{d.meta}</p>}
          {primero && <p className="m-0" dangerouslySetInnerHTML={{ __html: richT(primero) }} />}
          {d.origen && <p className="m-0">{d.origen}.</p>}
          {s.rasgo && <p className="m-0 text-label-caps text-outline">De {s.rasgo}</p>}
        </div>
      </details>
      {!lectura && <LanzarConjuro s={s} c={c} d={d} compacto />}
    </li>
  );
}

function Magia({ c }: { c: any }) {
  const lectura = useLectura();
  const sp = c.conjuros || [];
  const slots = c.recursos.filter((r: any) => /^slot\d/.test(r.id));
  if (!sp.length && !slots.length && !c.casterAb) return null;
  const ab = c.casterAb ? abInfo(c.casterAb)[2] : '';
  const orden = [...sp].sort((a: any, b: any) => (+a.nivel || 0) - (+b.nivel || 0));
  return (
    <section aria-labelledby="titulo-magia" className="flex flex-col gap-3 rounded-lg bg-surface-container-low p-3 shadow-lg">
      <div className="flex items-start justify-between gap-2">
        <h2 id="titulo-magia" className="m-0 flex items-center gap-1 font-serif text-headline-sm text-secondary">
          <Simbolo n="auto_awesome" className="text-body-lg" />Magia{ab ? ` (${ab})` : ''}
        </h2>
        {c.casterAb && (
          <div className="flex flex-col items-end gap-0.5 text-label-caps text-outline">
            <span>CD salvación: <strong className="text-body-md text-on-surface">{c.dcSpell}</strong></span>
            <span className="flex items-center gap-1">Ataque:
              <BotonTirada estilo="libre" expr={`1d20${modStr(c.atkSpell)}`} label="Ataque de conjuro" mods={desglose([[c.mSpell, c.casterAb.toUpperCase()], [c.pb, 'competencia']])}
                className="rounded text-body-md font-bold text-on-surface hover:text-primary">{sign(c.atkSpell)}</BotonTirada>
            </span>
          </div>
        )}
      </div>
      {slots.map((r: any) => <Ranuras key={r.id} r={r} c={c} />)}
      {sp.length ? (
        <div className="space-y-1">
          <span className="text-label-caps uppercase text-outline">Conjuros preparados</span>
          <ul className="m-0 list-none space-y-1 p-0">{orden.map((s: any, i: number) => <FilaConjuro key={s.nombre + i} s={s} c={c} />)}</ul>
        </div>
      ) : (
        <div className="rounded-xs bg-surface-container-lowest p-2 text-body-sm text-on-surface-variant">
          Sin conjuros todavía.{!lectura && <> <button type="button" onClick={() => irAPaso('conjuros')} className={cx('cursor-pointer font-bold text-primary underline', foco)}>Elegir conjuros</button></>}
        </div>
      )}
    </section>
  );
}

function Rasgos({ c }: { c: any }) {
  const lectura = useLectura();
  const ents = c.entries.filter((e: any) => e.t === 'pasiva');
  if (!ents.length) return null;
  return (
    <section className="flex flex-col gap-3 rounded-lg bg-surface-container-low p-3 shadow-lg">
      <Rotulo icono="bookmark">Rasgos de especie y clase</Rotulo>
      <div className="space-y-2">
        {ents.map((e: any, i: number) => (
          <div key={e.nombre + i} className="rounded-xs bg-surface-container p-2">
            <span className={cx('block text-body-md font-semibold', i === 0 ? 'text-primary' : 'text-on-surface')}>{e.nombre}</span>
            <TextoConDados html={e.raw ? richT(e.texto) : esc(e.texto)} label={e.nombre} className="m-0 mt-0.5 text-body-sm text-on-surface-variant" />
            <div className="mt-1 flex justify-start empty:hidden"><Herramienta e={e} /></div>
            <div className="flex flex-wrap items-center justify-between gap-x-2">
              {e.src && <span className="text-label-caps text-outline">{e.src}</span>}
              {!lectura && e.grupo && e.grupo !== 'reglas' && <Mover e={e} />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ===================== Solo lectura (mesa del DM) ===================== */
/** Familiares y criaturas del jugador, sin su hoja interactiva. */
function CriaturasLectura({ c }: { c: any }) {
  return (
    <section className="rounded-lg bg-surface-container-low p-5 shadow-lg">
      <h2 className="m-0 font-serif text-headline-md text-on-surface">Familiares y criaturas</h2>
      <ul className="m-0 mt-2 list-none space-y-1 p-0">
        {c.criaturas.map((x: any) => (
          <li key={x.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xs bg-surface-container-lowest p-2 text-body-sm">
            <b className="font-serif text-body-lg text-on-surface">{x.nombre}</b>
            <span className="text-on-surface-variant">{x.ca != null && <>CA <b className="text-on-surface">{x.ca}</b> · </>}PG <b className="text-on-surface">{x.pg}</b> / {x.pgMax}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Lo que lleva: armas, armadura, objetos mágicos, objetos y monedas (el inventario editable es del jugador). */
function EquipoLectura({ c }: { c: any }) {
  const pj = c.pj, b = bolsaDe(pj);
  const fila = (k: string, v: ReactNode) => <div key={k}><dt className="text-label-caps uppercase text-outline">{k}</dt><dd className="m-0 text-body-sm text-on-surface">{v}</dd></div>;
  const armas = c.armas.map((a: any) => a.nombre + (a.mano ? '' : ' (guardada)')).join(', ');
  const magicos = (c.magicos || []).map(({ m, d }: any) => `${+m.q > 1 ? m.q + ' ' : ''}${d.n}${d.sint ? (m.sint ? ' (sintonizado)' : ' (sin sintonizar)') : ''}`).join(', ');
  const objetos = (pj.objetos || []).map((o: any) => (+o.q > 1 ? o.q + ' ' : '') + o.n).join(', ');
  return (
    <div className="rounded-lg bg-surface-container-low p-3 shadow-lg">
      <Rotulo icono="backpack">Equipo</Rotulo>
      <dl className="m-0 space-y-2">
        {fila('Armas', armas || '—')}
        {fila('Armadura', [c.armor?.n || 'Ninguna', c.shield && 'escudo'].filter(Boolean).join(' y '))}
        {magicos && fila('Objetos mágicos', magicos)}
        {objetos && fila('Objetos', objetos)}
        {pj.inventario && fila('Notas de inventario', <span dangerouslySetInnerHTML={{ __html: richT(pj.inventario) }} />)}
        {fila('Monedas', MONEDAS.filter(([k]) => b[k]).map(([k, n]) => `${b[k]} ${n.toLowerCase()}`).join(', ') || 'Ninguna')}
      </dl>
    </div>
  );
}

function Avisos({ c }: { c: any }) {
  if (!c.avisos.length) return <Aviso tipo="info" titulo="Todo en orden">No falta nada por elegir.</Aviso>;
  return (
    <>
      {c.avisos.map((a: any, i: number) => (
        <Aviso key={i} tipo={a.nivel === 'info' ? 'info' : 'aviso'} titulo={a.t}
          accion={a.paso && <Boton tamano="sm" onClick={() => irAPaso(a.paso)}>Ir a {PASO_N[a.paso]}</Boton>}>{a.txt}</Aviso>
      ))}
    </>
  );
}

/* ===================== Ficha ===================== */
/** La hoja del personaje. Con `lectura`, la de un jugador vista desde la mesa del DM: todo visible, nada editable. */
export function Ficha({ c, lectura = false }: { c: any; lectura?: boolean }) {
  const cerrarDialogo = () => { S.dialogo = ''; render(); };
  // La hoja de solo lectura se puede duplicar desde el menú: el menú la encuentra aquí
  useEffect(() => {
    if (!lectura) return;
    S.hojaLectura = c.pj;
    return () => { if (S.hojaLectura === c.pj) S.hojaLectura = null; };
  }, [lectura, c.pj]);
  return (
    <Lectura.Provider value={lectura}>
      {/* Al imprimir sale la hoja de papel en lugar de la interactiva */}
      <HojaImpresa c={c} />
      <div className="print:hidden">
      {/* Identidad y vitales */}
      <section aria-label="Personaje" className="w-full bg-surface-container-lowest px-4 py-5 lg:px-6">
        <div className="mx-auto flex max-w-[1600px] flex-col items-stretch justify-between gap-5 xl:flex-row">
          <Identidad c={c} />
          <Vitales c={c} />
        </div>
      </section>

      <Caracteristicas c={c} />

      {/* Tablero de 3 columnas */}
      <div className="mx-auto w-full max-w-[1600px] px-4 py-8 lg:px-6">
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-3">
            <SentidosPasivos c={c} />
            <Habilidades c={c} />
            <Competencias c={c} />
            {lectura && <EquipoLectura c={c} />}
          </div>
          <div className="flex flex-col gap-5 lg:col-span-6">
            <RecursosClase c={c} />
            <Arsenal c={c} />
            <TiradorRapido />
            <OtrasAcciones c={c} />
          </div>
          <div className="flex flex-col gap-5 lg:col-span-3">
            <Magia c={c} />
            <Rasgos c={c} />
          </div>
        </div>
      </div>
      </div>

      {!lectura && (
        <>
          <Dialogo abierto={S.dialogo === 'equipo'} onCerrar={cerrarDialogo} titulo="Equipo" ancho="lg">
            <Inventario c={c} />
          </Dialogo>
          <Dialogo abierto={S.dialogo === 'revisar'} onCerrar={cerrarDialogo} titulo="Revisar">
            <Avisos c={c} />
          </Dialogo>
        </>
      )}
    </Lectura.Provider>
  );
}
