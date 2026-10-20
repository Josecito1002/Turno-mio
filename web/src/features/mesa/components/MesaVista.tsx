/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { S, render, irArriba } from '@/app-shell/estado';
import { almacen } from '@/app-shell/almacen';
import { avisar } from '@/shared/ui/avisos';
import { confirmar } from '@/shared/ui/confirmar';
import { modStr, norm, sign, slug } from '@/shared/utils/texto';
import { PopupGrande, PopupTarjeta } from '@/shared/ui/PopupGrande';
import { Aviso, Boton, Campo, Dialogo, EncabezadoPagina, Fila, Lista, Nota, PanelPestana, Pestanas, Plegable, Seccion, Simbolo, Tarjeta, claseCampo, cx, foco } from '@/shared/ui/kit';
import { useDados } from '@/features/dados/components/Bandeja';
import { BotonTirada } from '@/features/dados/components/BotonTirada';
import { CampoTirada, totalTirada } from '@/features/dados/components/CampoTirada';
import { partesTirada, rnd } from '@/features/dados/domain/dados';
import { resumen } from '@/features/personajes/domain/modelo';
import { abrir, bajarArchivo } from '@/features/personajes/acciones';
import { Ficha } from '@/features/personajes/components/ficha/Ficha';
import { OpcionesDeTipo } from '@/features/personajes/components/ficha/ModoCombate';
import type { Extra } from '@/features/personajes/domain/lanzar';
import { gruposExtras, type Uso } from '@/features/personajes/components/ficha/UsoAccion';
import { CONDICIONES, actualizarPgUnido, cambiarPg, campActual, camps, claveUnido, combatiente, estadoDe, fijarUnidos, guardarCamp, ordenar, sumarCompaneros, unidosCargados, unidosDe } from '../domain/combate';
import { codigoMesa, guardarCampana, jugadoresMesa, quitarDeMesa } from '../api';
import { conectarMesaRealtime } from '../realtime-cliente';
import { publicarCombate } from '../domain/combate-vivo';
import { avisarJugadorDm, combateVivoDm, confirmarGolpes, enviarEfectoDm, enviarOrdenDm, fijarAccionDm, pedirSalvacionDm, quitarPeticiones, quitarRespuestas, resolverSalvacion, terminarConcentracionDm, type CombateVivo, type EconomiaRonda, type Golpe, type Peticion, type RespuestaSalvacion, type Salvacion, type TipoAccionRonda } from '../api';
import { datosMesa, resumenMesa, type PersonajeExportado } from '../domain/exportar';
import { contraObjetivo, efectoSalvacion, fallaSola, incapacidad, repiteSalvacion } from '../domain/condiciones';
import { hastaDe, quitarConcentracion, quitarCondicion, repeticionesDe, textoRestante, vencerCondiciones, type Hasta, type Repite } from '../domain/duracion';
import { combatesOrigen, conservarVinculos, danosDe, enemigosDe, leerSesion, marcarRegresados, origenesDe, puedenVolver, regresanA, sobrevivientesDe, type Encuentro } from '../domain/sesion';
import { cargarBestiario } from '@/features/reglas/data/bestiario';
import { BloqueMonstruo, BuscadorEnemigo, VistaBestiario, monstruoDe, useCatalogo } from './Bestiario';
import { SubirHomebrewery } from '@/features/homebrewery/components/SubirHomebrewery';
import { DarObjeto } from './DarObjeto';

const val = (id: string) => (document.getElementById(id) as HTMLInputElement | null)?.value || '';
/** Cada acción trabaja sobre una copia fresca de la campaña, la guarda y redibuja. */
/* Historial para deshacer (solo del DM, solo en esta pantalla): una copia de lo que cambia en el combate antes de cada cambio */
const PARTES_HISTORIAL = ['estado', 'combate', 'monstruos', 'pjs'] as const;
const historial = new Map<string, string[]>();
const copiaCombate = (cp: any) => JSON.stringify(Object.fromEntries(PARTES_HISTORIAL.map(p => [p, cp[p] ?? null])));

function conCamp(fn: (cp: any) => void | false) {
  const cp = campActual(); if (!cp) return;
  // Lo que se ve en pantalla ya no cuenta a quien dejó la campaña: el turno que se guarda debe ser el mismo
  if (cp.combate?.activo && cp.combate.orden) quitarDelOrdenLosQueNoEstan(cp.combate, cp);
  const antes = copiaCombate(cp);
  if (fn(cp) === false) return;
  if (copiaCombate(cp) !== antes) { const h = historial.get(cp.id) || []; h.push(antes); historial.set(cp.id, h.slice(-40)); }
  guardarCamp(cp); publicarCombate(cp); render();
}
/** Lo que pertenece a un combatiente dentro de una copia del historial. */
const parteDe = (d: any, k: string) => JSON.stringify([d.estado?.[k] ?? null, k.startsWith('m:') ? (d.monstruos || []).find((m: any) => 'm:' + m.id === k) ?? null : null]);
/** Deshace el último cambio del combate; con `k`, solo el último que tocó a ese combatiente. */
function deshacer(k?: string) {
  const cp = campActual(); if (!cp) return;
  const h = historial.get(cp.id) || [];
  const actual = JSON.parse(copiaCombate(cp));
  let i = h.length - 1;
  if (k) while (i >= 0 && parteDe(JSON.parse(h[i]), k) === parteDe(actual, k)) i--;
  if (i < 0) { avisar('No hay nada que deshacer.'); return; }
  const d = JSON.parse(h[i]);
  if (!k) { for (const p of PARTES_HISTORIAL) cp[p] = d[p]; h.splice(i); }
  else {
    cp.estado = cp.estado || {};
    if (d.estado?.[k]) cp.estado[k] = d.estado[k]; else delete cp.estado[k];
    if (k.startsWith('m:')) { const m = (d.monstruos || []).find((x: any) => 'm:' + x.id === k), j = cp.monstruos.findIndex((x: any) => 'm:' + x.id === k); if (m && j >= 0) cp.monstruos[j] = m; }
    h.splice(i, 1);
  }
  guardarCamp(cp); publicarCombate(cp); render();
}
const hayQueDeshacer = (id: string) => (historial.get(id) || []).length > 0;

function Condiciones({ cp, k, nombre }: { cp: any; k: string; nombre: string }) {
  const e = estadoDe(cp, k);
  const alternar = (n: string) => {
    const propia = n === 'Concentrado' && e.cond.includes(n) ? e.concPropia : null;
    conCamp(c => {
      const x = estadoDe(c, k); if (x.hasta?.[n]) delete x.hasta[n];
      x.cond = x.cond.includes(n) ? x.cond.filter((y: string) => y !== n) : [...x.cond, n];
      // Si deja de concentrarse, se acaba lo que había dejado su conjuro
      if (x.repite?.[n] && !x.cond.includes(n)) delete x.repite[n];
      if (propia) { delete x.concPropia; acabarConcentracion(c, propia.id, nombre, propia.nombre); }
    });
    if (propia) terminarConcentracionDm(cp.id, propia.id, nombre, propia.nombre).catch(() => avisar('Los jugadores no se enteraron: díselo en voz alta.', 'error'));
  };
  const chip = (n: string, on: boolean) => (
    <button key={n} type="button" aria-pressed={on} onClick={() => alternar(n)}
      className={cx('min-h-11 cursor-pointer rounded-full px-3 text-sm font-bold sm:min-h-8', foco, on ? 'bg-gol text-bg' : 'bg-soft hover:bg-rule/70')}>
      {n}{on && <span aria-hidden="true"> ×</span>}
    </button>
  );
  return (
    <div className="mt-2">
      {e.cond.length > 0 && <div role="group" aria-label={`Condiciones de ${nombre}`} className="flex flex-wrap gap-1.5">{e.cond.map((n: string) => chip(n, true))}</div>}
      {e.cond.length > 0 && (
        <div className="mt-1 grid gap-1">
          {e.cond.map((n: string) => (
            <label key={n} className="flex items-center gap-2 text-xs text-muted">
              <span className="w-24 shrink-0 font-bold">{n}</span>
              <input type="text" maxLength={60} defaultValue={e.dur?.[n] || ''} placeholder="Hasta cuándo (1 minuto, fin de su turno…)" aria-label={`Duración de ${n} en ${nombre}`}
                onBlur={ev => { const v = ev.target.value.trim(); if (v !== (e.dur?.[n] || '')) conCamp(c => { const x = estadoDe(c, k); x.dur = { ...(x.dur || {}), [n]: v }; }); }}
                className={cx('min-h-9 w-full rounded-lg border border-rule bg-surface px-2 text-sm text-ink', foco)} />
            </label>
          ))}
        </div>
      )}
      {k.startsWith('jm:') && (
        <label className="mt-1 flex items-center gap-2 text-xs text-muted">
          <span className="w-24 shrink-0 font-bold">Sus ataques</span>
          <select value={e.ven || ''} aria-label={`Ventaja o desventaja de ${nombre}`} onChange={ev => conCamp(c => { estadoDe(c, k).ven = ev.target.value; })}
            className={cx('min-h-9 w-full rounded-lg border border-rule bg-surface px-2 text-sm text-ink', foco)}>
            <option value="">Normales</option><option value="v">Con ventaja</option><option value="d">Con desventaja</option>
          </select>
        </label>
      )}
      <div className="flex flex-wrap items-center gap-x-3">
        <details className="mt-1">
          <summary className={cx('inline-flex min-h-11 cursor-pointer list-none items-center gap-1 rounded-lg bg-soft px-3 text-sm font-bold text-ink ring-1 ring-inset ring-muted/60 hover:bg-rule/60 sm:min-h-9 [&::-webkit-details-marker]:hidden', foco)}>+ Agregar condición</summary>
          <div className="mt-1 flex flex-wrap gap-1.5">{CONDICIONES.filter(n => !e.cond.includes(n)).map(n => chip(n, false))}</div>
        </details>
        {hayQueDeshacer(cp.id) && <button type="button" onClick={() => deshacer(k)} className={cx('min-h-11 cursor-pointer rounded-lg px-1 text-sm text-muted hover:text-ink sm:min-h-8', foco)}>↶ Deshacer lo último de {nombre}</button>}
      </div>
      <RasgosCondicionales cp={cp} k={k} />
    </div>
  );
}

const CONDICIONAL = /\b(si|mientras|cuando|if|while|when)\b|pack tactics|ventaja/i;
/** Rasgos de un enemigo que dependen de una condición (como las tácticas de manada): una casilla dice si se cumple. */
function RasgosCondicionales({ cp, k }: { cp: any; k: string }) {
  const cat = useCatalogo(), mon = k.startsWith('m:') ? cp.monstruos.find((m: any) => 'm:' + m.id === k) : null;
  const ficha = mon?.ref && (cat || cp.bestiario?.[mon.ref]) ? monstruoDe(cp, mon.ref) : null;
  const rasgos = (ficha?.rasgos || []).filter((r: any) => CONDICIONAL.test(`${r.en || ''} ${r.t || ''}`));
  if (!rasgos.length) return null;
  const e = estadoDe(cp, k), activos: Record<string, boolean> = e.rasgos || {};
  const poner = (n: string, v: boolean) => conCamp(c => { const x = estadoDe(c, k); x.rasgos = { ...(x.rasgos || {}), [n]: v }; });
  return (
    <div className="mt-2 grid gap-1">
      {rasgos.map((r: any) => (
        <label key={r.en || r.n} className={cx('flex min-h-11 cursor-pointer items-start gap-2 rounded-lg p-2 text-sm', activos[r.en || r.n] ? 'bg-gol/20' : 'bg-soft')}>
          <input type="checkbox" checked={!!activos[r.en || r.n]} onChange={ev => poner(r.en || r.n, ev.target.checked)} className="mt-1 size-4" />
          <span><b>{r.n}</b>: {activos[r.en || r.n] ? <b className="text-gol">se cumple, el efecto está activo.</b> : <span className="text-muted">marca si se cumple.</span>}{r.t ? <span className="block text-muted">{r.t}</span> : null}</span>
        </label>
      ))}
    </div>
  );
}

function PuntosGolpe({ cp, x }: { cp: any; x: any }) {
  const id = useId();
  const pct = x.pgMax ? Math.max(0, Math.min(100, Math.round(100 * x.pg / x.pgMax))) : 0;
  // Los PG de un personaje unido los lleva su jugador en su hoja: el daño o la curación del DM se le manda y su hoja lo
  // aplica (el daño primero a los temporales) la próxima vez que mire la mesa, en segundos si la tiene abierta
  if (x.tipo === 'jug') {
    const temp = x.pj.pgTemp || 0;
    const mandar = async (cura: boolean) => {
      const v = Math.min(999, parseInt(val(id)) || 0);
      if (v <= 0) { avisar('Escribe cuántos PG.', 'aviso'); document.getElementById(id)?.focus(); return; }
      try {
        await enviarEfectoDm(cp.id, x.u.personajeId, { de: 'Tu DM', dano: v, cura });
        const campo = document.getElementById(id) as HTMLInputElement | null; if (campo) campo.value = '';
        avisar(`${cura ? `Curación de ${v} PG` : `${v} de daño`} enviado a ${x.nombre}: se aplica en su hoja${cura || !temp ? '' : ' (primero a los temporales)'} en cuanto la tenga abierta.`);
      } catch (e) { avisar(`No se pudo enviar: ${(e as Error).message}`, 'error'); }
    };
    return (
      <div className="mt-2">
        <div role="meter" aria-label={`Puntos de golpe de ${x.nombre}`} aria-valuemin={0} aria-valuemax={x.pgMax} aria-valuenow={x.pg} aria-valuetext={`${x.pg} de ${x.pgMax}`}
          className="h-2 overflow-hidden rounded-full bg-soft">
          <span className={cx('block h-full transition-[width,background-color] duration-300 ease-out', pct <= 25 ? 'bg-acc' : pct <= 50 ? 'bg-adi' : 'bg-pas')} style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span><b className="font-serif text-2xl">{x.pg}</b> <span className="text-sm text-muted">/ {x.pgMax} PG{temp ? ` · +${temp} temporales` : ''}</span></span>
          <label htmlFor={id} className="sr-only">Cantidad de PG para {x.nombre}</label>
          <input id={id} type="number" inputMode="numeric" min={1} max={999} placeholder="PG" className={cx(claseCampo, 'w-20!')}
            onKeyDown={e => { if (e.key === 'Enter') void mandar(false); }} />
          <Boton tamano="sm" variante="primario" onClick={() => mandar(false)}>Daño</Boton>
          <Boton tamano="sm" onClick={() => mandar(true)}>Curar</Boton>
        </div>
      </div>
    );
  }
  const aplicar = (d: 'dano' | 'cura') => {
    const v = parseInt(val(id)) || 0; if (!v) { avisar('Escribe cuántos PG.', 'aviso'); document.getElementById(id)?.focus(); return; }
    conCamp(cp => cambiarPg(cp, x.k, d === 'dano' ? -v : v));
  };
  return (
    <div className="mt-2">
      <div role="meter" aria-label={`Puntos de golpe de ${x.nombre}`} aria-valuemin={0} aria-valuemax={x.pgMax} aria-valuenow={x.pg} aria-valuetext={`${x.pg} de ${x.pgMax}`}
        className="h-2 overflow-hidden rounded-full bg-soft">
        <span className={cx('block h-full transition-[width,background-color] duration-300 ease-out', pct <= 25 ? 'bg-acc' : pct <= 50 ? 'bg-adi' : 'bg-pas')} style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span><b className="font-serif text-2xl">{x.pg}</b> <span className="text-sm text-muted">/ {x.pgMax} PG</span></span>
        <label htmlFor={id} className="sr-only">Cantidad de PG para {x.nombre}</label>
        <input key={x.pg} id={id} type="number" inputMode="numeric" min={0} placeholder="PG" className={cx(claseCampo, 'w-20!')}
          onKeyDown={e => { if (e.key === 'Enter') aplicar('dano'); }} />
        <Boton tamano="sm" variante="primario" onClick={() => aplicar('dano')}>Daño</Boton>
        <Boton tamano="sm" onClick={() => aplicar('cura')}>Curar</Boton>
      </div>
    </div>
  );
}

function Muerte({ cp, x }: { cp: any; x: any }) {
  if (x.tipo === 'jug' && x.pg <= 0) {
    const e = Math.min(3, x.pj.used?.['muerte-exitos'] || 0), f = Math.min(3, x.pj.used?.['muerte-fallos'] || 0);
    return <p className="m-0 mt-2 rounded-xl bg-soft p-2 text-sm"><b>A 0 PG.</b> Salvaciones contra muerte (las marca el jugador): {e} éxito{e === 1 ? '' : 's'}, {f} fallo{f === 1 ? '' : 's'}.</p>;
  }
  if (x.tipo !== 'pj' || x.pg > 0) return null;
  const m = estadoDe(cp, x.k).muerte;
  const tocar = (t: 'e' | 'f', i: number) => conCamp(c => { const mm = estadoDe(c, x.k).muerte; mm[t] = i < mm[t] ? i : i + 1; });
  const pips = (t: 'e' | 'f', n: number) => (
    <div role="group" aria-label={`${t === 'e' ? 'Éxitos' : 'Fallos'}: ${n} de 3`} className="flex">
      {Array.from({ length: 3 }, (_, i) => (
        <button key={i} type="button" aria-pressed={i < n} onClick={() => tocar(t, i)} aria-label={`${t === 'e' ? 'Éxito' : 'Fallo'} ${i + 1}`}
          className={cx('grid size-11 cursor-pointer place-items-center rounded-full', foco)}>
          <span aria-hidden="true" className={cx('size-5 rounded-full border-[2.5px]', t === 'f' ? 'border-acc' : 'border-ink', i < n && (t === 'f' ? 'bg-acc' : 'bg-ink'))} />
        </button>
      ))}
    </div>
  );
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl bg-soft p-2 text-sm">
      <b>A 0 PG.</b><span>Éxitos</span>{pips('e', m.e)}<span>Fallos</span>{pips('f', m.f)}
      <BotonTirada expr="1d20" label={`Salvación contra muerte de ${x.nombre}`}>Tirar salvación</BotonTirada>
    </div>
  );
}

/** CA, pasivas, iniciativa, velocidad y CD de conjuros: lo que el DM consulta a cada rato. */
function Pasivas({ x }: { x: any }) {
  const c = x.c;
  const stats: [string | number, string][] = [
    [x.ca, 'CA'], [c.passive, 'Percepción pasiva'], [10 + c.skill.perspicacia, 'Perspicacia pasiva'], [10 + c.skill.investigacion, 'Investigación pasiva'],
    [sign(c.init), 'Iniciativa'], [c.speed, 'Pies'], ...(c.dcSpell ? [[c.dcSpell, 'CD conjuros'] as [number, string]] : []),
  ];
  return (
    <dl className="m-0 mt-3 grid grid-cols-3 gap-1.5">
      {stats.map(([v, n]) => <div key={n} className="flex flex-col-reverse rounded-lg bg-soft px-1 py-1.5 text-center"><dt className="text-[0.7rem] text-muted">{n}</dt><dd className="m-0 font-serif text-xl font-extrabold">{v}</dd></div>)}
    </dl>
  );
}

const hora = (iso: string) => new Date(iso).toLocaleString('es', { dateStyle: 'short', timeStyle: 'short' });
const verHoja = (k: string) => { S.hojaMesa = k; render(); irArriba(); };

function TarjetaJugador({ cp, x, alQuitar }: { cp: any; x: any; alQuitar: () => void }) {
  const subN = x.c.SD ? x.c.SD.n : '';
  const quitar = async () => {
    if (!(await confirmar({ titulo: `¿Quitar a ${x.nombre} de la mesa?`, texto: `Dejarás de ver su hoja. ${x.jugador} puede volver a unirse con el código.`, si: 'Quitar de la mesa', peligro: true }))) return;
    try {
      await quitarDeMesa(cp.id, x.u.jugadorId, x.u.personajeId);
      conCamp(c => { c.combate.orden = (c.combate.orden || []).filter((o: any) => o.k !== x.k); if (c.estado) delete c.estado[x.k]; });
      avisar(`${x.nombre} ya no está en la mesa.`); alQuitar();
    } catch (e) { avisar(`No se pudo quitar: ${(e as Error).message}`, 'error'); }
  };
  return (
    <Tarjeta as="li" className="border-l-4 border-pas">
      <header className="flex items-start justify-between gap-2">
        <div className="min-w-0"><h3 className="m-0 font-serif text-xl font-bold">{x.nombre}</h3>
          <p className="m-0 text-sm text-muted">{resumen(x.pj)}{subN ? `, ${subN}` : ''}. Juega {x.jugador}</p></div>
        <Boton tamano="sm" variante="primario" className="shrink-0 whitespace-nowrap" onClick={() => verHoja(x.k)} aria-label={`Ver la hoja de ${x.nombre}`}>Ver hoja</Boton>
      </header>
      <Pasivas x={x} />
      <PuntosGolpe cp={cp} x={x} /><Muerte cp={cp} x={x} /><Condiciones cp={cp} k={x.k} nombre={x.nombre} />
      <DarObjeto campId={cp.id} personajeId={x.u.personajeId} nombre={x.nombre} />
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-muted">Hoja actualizada {hora(x.u.actualizadoEn)}</span>
        <Boton tamano="sm" variante="fantasma" onClick={quitar}>Quitar de la mesa</Boton>
      </div>
    </Tarjeta>
  );
}

/** Los personajes que los jugadores unieron con el código; se sincronizan en tiempo real por WebSocket/SSE y de respaldo cada 15 s. */
function useUnidos(campId: string) {
  const [estado, setEstado] = useState({ cargando: true, error: '', enVivo: false, transporte: '' as 'ws' | 'sse' | '' });
  // Si ya hay hojas en pantalla, un fallo suelto de la lectura periódica no se muestra: solo si se repite
  const fallos = useRef(0);
  const leer = useCallback(() => jugadoresMesa(campId).then(
    l => { fallos.current = 0; fijarUnidos(campId, l); almacen.fijarInfoMesa(campId, { unidos: l.length }); setEstado(prev => ({ ...prev, cargando: false, error: '' })); render(); },
    (e: Error) => { const mostrar = ++fallos.current >= 2; setEstado(prev => mostrar || prev.cargando ? { ...prev, cargando: false, error: e.message } : prev); }), [campId]);

  useEffect(() => {
    leer();
    // Conexión en tiempo real (WebSocket nativo con fallback a SSE)
    const cancelarRealtime = conectarMesaRealtime(campId, evento => {
      if (evento.tipo === 'cambio_pg') {
        actualizarPgUnido(campId, evento);
        render();
      } else if (evento.tipo === 'recargar') {
        leer();
      }
    }, (conectado, transporte) => {
      setEstado(prev => ({ ...prev, enVivo: conectado, transporte: conectado ? transporte : '' }));
    });

    const t = setInterval(() => { if (document.visibilityState === 'visible') leer(); }, 15000);
    const alVolver = () => { if (document.visibilityState === 'visible') leer(); };
    document.addEventListener('visibilitychange', alVolver);
    return () => {
      cancelarRealtime();
      clearInterval(t);
      document.removeEventListener('visibilitychange', alVolver);
    };
  }, [campId, leer]);

  return { ...estado, leer };
}

/** Reduce una foto de la galería a un JPEG de a lo sumo 960 px, para guardarla dentro de la campaña. */
function reducirImagen(f: File): Promise<string> {
  return new Promise((ok, mal) => {
    const url = URL.createObjectURL(f), im = new Image();
    im.onload = () => {
      const r = Math.min(1, 960 / Math.max(im.width, im.height)), cv = document.createElement('canvas');
      cv.width = Math.round(im.width * r); cv.height = Math.round(im.height * r);
      const g = cv.getContext('2d'); if (!g) { URL.revokeObjectURL(url); mal(new Error('sin lienzo')); return; }
      g.drawImage(im, 0, 0, cv.width, cv.height); URL.revokeObjectURL(url);
      ok(cv.toDataURL('image/jpeg', 0.8));
    };
    im.onerror = () => { URL.revokeObjectURL(url); mal(new Error('imagen no válida')); };
    im.src = url;
  });
}

/** Descripción y portada de la campaña: lo que ven los jugadores en su lista de campañas. */
function PortadaCampana({ cp }: { cp: any }) {
  return (
    <Tarjeta className="mt-4">
      <h2 className="m-0 font-serif text-xl font-bold">Descripción y portada</h2>
      <p className="m-0 mt-1 text-sm text-muted">Lo que ven tus jugadores en su pestaña Campañas. Ambas son opcionales.</p>
      <div className="mt-3 grid gap-3">
        <Campo etiqueta="Descripción">
          <textarea key={cp.id + 'd'} defaultValue={cp.descripcion || ''} rows={3} maxLength={600} placeholder="De qué trata la campaña, cuándo se juega…" className={claseCampo}
            onBlur={e => { const v = e.target.value.trim(); if (v !== (cp.descripcion || '')) conCamp(c => { c.descripcion = v; }); }} />
        </Campo>
        <Campo etiqueta="Imagen (enlace)" ayuda="O la dirección de una imagen en internet (https://…).">
          <input key={cp.id + 'i' + (cp.imagen || '').length} type="url" defaultValue={/^https:/i.test(cp.imagen || '') ? cp.imagen : ''} maxLength={500} placeholder="https://…" className={claseCampo}
            onBlur={e => { const v = e.target.value.trim(); if (v && !/^https:\/\//i.test(v)) { avisar('El enlace debe empezar con https://', 'aviso'); return; } if (v && v !== (cp.imagen || '')) conCamp(c => { c.imagen = v; }); }} />
        </Campo>
        <Campo etiqueta="Imagen (de tu dispositivo)" ayuda="Elige una foto de tu galería; se reduce sola.">
          <input type="file" accept="image/*" className={claseCampo} onChange={e => {
            const f = e.target.files?.[0]; e.target.value = '';
            if (!f) return;
            reducirImagen(f).then(url => { conCamp(c => { c.imagen = url; }); avisar('Imagen cargada.'); }, () => avisar('No se pudo leer esa imagen.', 'error'));
          }} />
        </Campo>
        {cp.imagen && <Boton tamano="sm" variante="fantasma" onClick={() => conCamp(c => { c.imagen = ''; })}>Quitar imagen</Boton>}
        {cp.imagen && /^(https:\/\/|data:image\/)/i.test(cp.imagen) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cp.imagen} alt="" className="max-h-40 w-full rounded-xl object-cover" />
        )}
      </div>
    </Tarjeta>
  );
}

function CodigoMesa({ campId }: { campId: string }) {
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');
  const [ocupado, setOcupado] = useState(true);
  const pedir = useCallback((nuevo: boolean) => {
    const una = () => codigoMesa(campId, nuevo);
    return una()
      .catch(e => {
        // Una campaña recién creada puede no haber llegado al servidor: se guarda ya y se reintenta
        const cp = campActual(); if (!cp || cp.id !== campId) throw e;
        return guardarCampana({ id: cp.id, nombre: cp.nombre, datos: JSON.parse(JSON.stringify(cp)) }).then(una);
      })
      .then(k => { setCodigo(k); setError(''); almacen.fijarInfoMesa(campId, { codigo: k }); if (nuevo) avisar('Código nuevo listo. El anterior ya no sirve.'); }, (e: Error) => setError(e.message))
      .finally(() => setOcupado(false));
  }, [campId]);
  useEffect(() => { pedir(false); }, [pedir]);
  const reintentar = () => { setOcupado(true); pedir(false); };
  const copiar = () => navigator.clipboard.writeText(codigo).then(() => avisar('Código copiado.'), () => avisar('No se pudo copiar; díctalo a tus jugadores.', 'aviso'));
  const cambiar = async () => {
    if (await confirmar({ titulo: '¿Cambiar el código de la mesa?', texto: 'El código actual deja de servir. Los personajes que ya se unieron siguen en la mesa.', si: 'Cambiar código' })) { setOcupado(true); pedir(true); }
  };
  return (
    <Tarjeta className="mt-4">
      <h2 className="m-0 font-serif text-xl font-bold">Código de la mesa</h2>
      <p className="m-0 mt-1 text-sm text-muted">Dáselo a tus jugadores: lo escriben en su lista de personajes (Mesas de juego) y aquí verás sus hojas al día.</p>
      {error ? <Aviso tipo="error" titulo="No se pudo obtener el código" accion={<Boton tamano="sm" onClick={reintentar} disabled={ocupado}>Reintentar</Boton>}>{error}</Aviso> : (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <output aria-live="polite" aria-label="Código de la mesa" className="min-w-[8ch] rounded-xl bg-soft px-4 py-2 text-center font-mono text-3xl font-bold tracking-[0.25em]">{codigo || '······'}</output>
          <Boton onClick={copiar} disabled={!codigo || ocupado}>Copiar</Boton>
          <Boton variante="fantasma" onClick={cambiar} disabled={!codigo || ocupado}>Cambiar código</Boton>
        </div>
      )}
    </Tarjeta>
  );
}

/** La hoja completa de un jugador unido, tal como la ve él pero sin poder tocarla. */
function HojaJugador({ cp, k }: { cp: any; k: string }) {
  const x = combatiente(k, cp);
  const volver = () => { S.hojaMesa = null; render(); irArriba(); };
  if (!x) return (
    <>
      <EncabezadoPagina id="titulo-vista" titulo="Hoja no disponible" subtitulo="Ese personaje ya no está en la mesa, o todavía se está cargando." />
      <Boton onClick={volver}>← Volver a la mesa</Boton>
    </>
  );
  return (
    <>
      <div className="sticky top-[var(--alto-cabecera,0px)] z-[6] print:hidden flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-rule/60 bg-bg/95 px-4 py-2 backdrop-blur lg:px-6">
        <Boton tamano="sm" variante="fantasma" onClick={volver}>← {cp.nombre}</Boton>
        {/* En el teléfono los datos van en su propia línea, debajo de los dos botones (antes quedaban apretados y desalineados) */}
        <p className="order-last m-0 w-full text-sm sm:order-none sm:w-auto sm:flex-1"><b>{x.nombre}</b> <span className="text-muted">· juega {x.jugador} · solo lectura · actualizada {hora(x.u.actualizadoEn)}</span></p>
        <Boton tamano="sm" variante="fantasma" className="ml-auto sm:ml-0" onClick={() => bajarArchivo(slug(x.nombre) + '.json', JSON.stringify(x.u.datos, null, 1))}>Descargar hoja</Boton>
      </div>
      <Ficha c={x.c} lectura />
    </>
  );
}

function TarjetaPj({ cp, x }: { cp: any; x: any }) {
  const c = x.c, pj = x.pj, subN = c.SD ? c.SD.n : '';
  return (
    <Tarjeta as="li" className="border-l-4 border-rea">
      <header className="flex items-start justify-between gap-2">
        <div><h3 className="m-0 font-serif text-xl font-bold">{x.nombre}</h3>
          <p className="m-0 text-sm text-muted">{resumen(pj)}{subN ? `, ${subN}` : ''}{pj.jugador ? `. Juega ${pj.jugador}` : ''}</p></div>
        <Boton tamano="sm" onClick={() => abrir(pj.id)} aria-label={`Abrir la hoja de ${x.nombre}`}>Hoja</Boton>
      </header>
      <Pasivas x={x} />
      <PuntosGolpe cp={cp} x={x} /><Muerte cp={cp} x={x} /><Condiciones cp={cp} k={x.k} nombre={x.nombre} />
      <Boton tamano="sm" variante="fantasma" className="mt-2" onClick={() => conCamp(c2 => { c2.pjs = c2.pjs.filter((i: string) => i !== pj.id); c2.combate.orden = (c2.combate.orden || []).filter((o: any) => o.k !== 'pj:' + pj.id); })}>Sacar de la campaña</Boton>
    </Tarjeta>
  );
}

function FormEnemigos({ abierto, cp }: { abierto: boolean; cp: any }) {
  const id = useId(), f = (k: string) => id + k;
  // El monstruo del bestiario elegido (si después se cambia el nombre a mano, deja de contar)
  const [elegido, setElegido] = useState<{ k: string; n: string } | null>(null);
  const poner = (k: string, v: string | number) => { const el = document.getElementById(f(k)) as HTMLInputElement | null; if (el) el.value = String(v); };
  const deBestiario = (k: string, m: any) => { poner('N', m.n); poner('CA', m.ca); poner('PG', m.pg); poner('B', m.ini); setElegido({ k, n: m.n }); };
  const agregar = () => {
    const n = val(f('N')).trim() || 'Enemigo', q = Math.min(20, Math.max(1, +val(f('Q')) || 1)), pg = Math.max(1, +val(f('PG')) || 1);
    const ca = +val(f('CA')) || 10, bono = +val(f('B')) || 0, ref = elegido && elegido.n === n ? elegido.k : undefined;
    setElegido(null);
    conCamp(c => {
      for (let i = 0; i < q; i++) {
        const m = { id: Date.now().toString(36) + i, nombre: q > 1 ? `${n} ${i + 1}` : n, ca, pgMax: pg, pg, bono, ...(ref ? { ref } : {}) };
        c.monstruos.push(m);
        if (c.combate.activo) c.combate.orden.push({ k: 'm:' + m.id, init: rnd(20) + m.bono, bono: m.bono });
      }
      if (c.combate.activo) ordenar(c);
    });
    avisar(`${q > 1 ? q + ' enemigos agregados' : n + ' agregado'}.`);
  };
  return (
    <Plegable titulo="Agregar enemigos" abierto={abierto}>
      <div className="grid gap-3" key={cp.monstruos.length}>
        <BuscadorEnemigo cp={cp} elegir={deBestiario} />
        <Campo etiqueta="Nombre"><input id={f('N')} type="text" placeholder="Goblin" className={claseCampo} /></Campo>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Campo etiqueta="CA"><input id={f('CA')} type="number" defaultValue={13} className={claseCampo} /></Campo>
          <Campo etiqueta="PG"><input id={f('PG')} type="number" defaultValue={7} className={claseCampo} /></Campo>
          <Campo etiqueta="Bono de iniciativa"><input id={f('B')} type="number" defaultValue={2} className={claseCampo} /></Campo>
          <Campo etiqueta="Cuántos"><input id={f('Q')} type="number" defaultValue={1} min={1} max={20} className={claseCampo} /></Campo>
        </div>
        <Boton variante="primario" className="justify-self-start" onClick={agregar}>Agregar</Boton>
      </div>
    </Plegable>
  );
}

/** El bloque de estadísticas de un enemigo del bestiario, plegado dentro de su fila o su tarjeta de combate. */
function VerBloque({ cp, r, nombre }: { cp: any; r: string; nombre: string }) {
  const cat = useCatalogo(), m = cat || cp.bestiario?.[r] ? monstruoDe(cp, r) : null;
  return (
    <Plegable titulo={`Bloque de ${nombre}`} className="w-full">
      {m ? <BloqueMonstruo k={r} m={m} /> : <Nota>{cat ? 'Ese monstruo ya no está en el bestiario.' : 'Cargando el bestiario…'}</Nota>}
    </Plegable>
  );
}

/** Al terminar un combate de la sesión, guarda en él los enemigos que quedaron vivos (con sus PG), por si vuelven en otro. */
function guardarSobrevivientes(c: any) {
  const e = c.combate?.activo && (c.encuentros || []).find((x: any) => x.id === c.encuentroActual);
  if (e) e.sobrevivientes = sobrevivientesDe([...c.monstruos, ...(c.huidos || [])]);
  delete c.huidos;
}

/** Quienes entran al combate al empezarlo: el grupo, los jugadores unidos y los enemigos. */
const participantes = (c: any) => [...c.pjs.map((id: string) => 'pj:' + id), ...unidosDe(c.id).map(claveUnido), ...c.monstruos.map((m: any) => 'm:' + m.id)].map(k => combatiente(k, c)).filter(Boolean);

/** Empieza el combate con las iniciativas que escribió el DM (`fijas`, por clave); las que faltan se tiran solas. */
function iniciarCombate(c: any, fijas: Record<string, number> = {}) {
  const orden = participantes(c).map((x: any) => ({ k: x.k, init: fijas[x.k] ?? rnd(20) + x.bono, bono: x.bono }));
  c.combate = { activo: true, ronda: 1, turno: 0, orden }; delete c.huidos;
  for (const o of [...orden]) if (!o.k.startsWith('m:')) sumarCompaneros(c, o.k, rnd);
  ordenar(c); c.combate.turno = 0;
}

/** Activa un combate de la sesión: pone sus enemigos y abre la pantalla de iniciativas. Si hay otro en curso, lo termina antes (con
    `sumar`, en cambio, los enemigos entran al combate en curso con su propia iniciativa). */
async function activarEncuentro(cp: any, e: Encuentro, sumar = false) {
  if (cp.combate.activo && !sumar && !(await confirmar({ titulo: `¿Empezar ${e.nombre}?`, si: 'Terminar y empezar este',
    texto: `Hay un combate en curso (ronda ${cp.combate.ronda}). Se termina, se quitan sus enemigos y pasas a tirar las iniciativas de este.` }))) return;
  conCamp(c => {
    // Los que vuelven de otro combate de la sesión entran con los PG que tenían al terminarlo
    if (!sumar) guardarSobrevivientes(c);
    const nuevos = [...enemigosDe(e, r => monstruoDe(c, r)), ...regresanA(e, c.encuentros || [])];
    // Los que volvieron ya no vuelven también en otro combate de la cadena (si sobreviven a este, se anotan en este)
    marcarRegresados(e, c.encuentros || []);
    if (sumar && c.combate.activo) {
      c.monstruos.push(...nuevos);
      for (const m of nuevos) c.combate.orden.push({ k: 'm:' + m.id, init: rnd(20) + m.bono, bono: m.bono });
      ordenar(c);
    } else { c.monstruos = nuevos; c.combate = { activo: false, ronda: 1, turno: 0, orden: [] }; }
    c.encuentroActual = e.id;
  });
  // Lo primero de un combate nuevo es la pantalla para tirar o escribir las iniciativas
  if (!sumar) S.iniPendiente = cp.id;
  S.mtab = 'combate'; render(); irArriba();
  if (sumar) avisar(`${e.nombre}: enemigos sumados al combate.`);
}

/** Un combate preparado de la sesión, con su botón para activarlo. */
function TarjetaEncuentro({ cp, e }: { cp: any; e: Encuentro }) {
  const cat = useCatalogo();
  const enCurso = cp.combate.activo && cp.encuentroActual === e.id;
  const quitar = async () => {
    if (!(await confirmar({ titulo: `¿Quitar ${e.nombre}?`, texto: 'Solo se quita de la sesión; el combate en curso no cambia.', si: 'Quitar', peligro: true }))) return;
    conCamp(c => { c.encuentros = (c.encuentros || []).filter((x: any) => x.id !== e.id); });
  };
  const nombreDe = (x: any) => x.nombre || (cat && monstruoDe(cp, x.ref)?.n) || x.ref;
  const otros: Encuentro[] = (cp.encuentros || []).filter((x: Encuentro) => x.id !== e.id);
  const origenes = combatesOrigen(e, otros), elegidos = new Set(origenes.map(x => x.id));
  const vincular = (nombre: string, si: boolean) => conCamp(c => {
    const x = (c.encuentros || []).find((y: any) => y.id === e.id); if (!x) return false;
    const lista = origenesDe(x.vuelvenDe).filter(n => norm(n) !== norm(nombre));
    if (si) lista.push(nombre);
    if (lista.length) x.vuelvenDe = lista; else delete x.vuelvenDe;
  });
  const quitarVuelve = (deId: string, m: any) => conCamp(c => { const x = (c.encuentros || []).find((y: any) => y.id === deId); if (!x?.sobrevivientes) return false; x.sobrevivientes = x.sobrevivientes.filter((y: any) => y !== m && !(y.nombre === m.nombre && y.pg === m.pg && !y.volvioEn)); });
  return (
    <Tarjeta as="li" className={cx('border-l-4', enCurso ? 'border-pas' : 'border-acc')}>
      <h3 className="m-0 font-serif text-lg font-bold leading-snug">{e.nombre}</h3>
      {enCurso && <span className="mt-1 inline-block rounded-full bg-soft px-2 py-0.5 text-xs font-bold">En curso · ronda {cp.combate.ronda}</span>}
      <p className="m-0 mt-1 text-sm text-muted">{e.enemigos.map(x => `${x.cantidad > 1 ? `${x.cantidad} × ` : ''}${nombreDe(x)}`).join(', ') || 'Sin enemigos'}</p>
      {origenes.map(de => { const v = puedenVolver(de, e); return (
        <p key={de.id} className="m-0 mt-1 text-sm">{v.length ? <>Vuelven de {de.nombre}: <b>{v.map(m => `${m.nombre} (${m.pg}/${m.pgMax} PG)`).join(', ')}</b></> : <span className="text-muted">De {de.nombre}: nadie todavía (se anotan al terminar ese combate).</span>}</p>
      ); })}
      <div className="mt-3 flex flex-wrap gap-2">
        {!enCurso && <Boton variante="primario" className="grow sm:grow-0" disabled={!cat} onClick={() => activarEncuentro(cp, e)}>{cat ? 'Activar combate' : 'Cargando…'}</Boton>}
        {enCurso && <Boton variante="primario" onClick={() => { S.mtab = 'combate'; render(); irArriba(); }}>Ir al combate</Boton>}
        {cp.combate.activo && !enCurso && <Boton disabled={!cat} onClick={() => activarEncuentro(cp, e, true)}>Sumar al combate en curso</Boton>}
      </div>
      {otros.length > 0 && (
        <Plegable titulo="Enemigos que vuelven de otro combate" className="mt-2">
          <p className="m-0 text-sm text-muted">Marca uno o varios. Los que quedan vivos al terminar esos combates, o que quitaste vivos durante ellos (huyeron, desaparecieron o no los encontraron), entran a este con los PG que tenían. Si alguien ya volvió en otro combate, no entra dos veces.</p>
          <fieldset className="m-0 mt-2 grid gap-1 border-0 p-0">
            <legend className="sr-only">Combates de los que vuelven</legend>
            {otros.map(x => (
              <label key={x.id} className="flex min-h-11 cursor-pointer items-center gap-2 sm:min-h-8">
                <input type="checkbox" checked={elegidos.has(x.id)} onChange={ev => vincular(x.nombre, ev.target.checked)} className="size-5 accent-current" />
                <span>{x.nombre}</span>
              </label>
            ))}
          </fieldset>
          {origenes.map(de => { const v = puedenVolver(de, e); return v.length > 0 && (
            <ul key={de.id} aria-label={`Vuelven de ${de.nombre}`} className="m-0 mt-2 grid list-none gap-1 p-0">
              {v.map((m, i) => (
                <li key={i} className="flex flex-wrap items-center justify-between gap-2"><span>{m.nombre} <span className="text-sm text-muted">CA {m.ca}, {m.pg}/{m.pgMax} PG, de {de.nombre}</span></span>
                  <Boton tamano="sm" variante="fantasma" onClick={() => quitarVuelve(de.id, m)} aria-label={`No vuelve ${m.nombre}`}>No vuelve</Boton></li>
              ))}
            </ul>
          ); })}
        </Plegable>
      )}
      {e.notas && <Plegable titulo="Notas del combate" className="mt-2"><p className="m-0 whitespace-pre-line">{e.notas}</p></Plegable>}
      <Plegable titulo="Enemigos" className="mt-1">
        <ul className="m-0 grid list-none gap-2 p-0">
          {e.enemigos.map((x, i) => {
            const m = cat ? monstruoDe(cp, x.ref) : null;
            return (
              <li key={i}>
                <b>{x.cantidad > 1 ? `${x.cantidad} × ` : ''}{nombreDe(x)}</b>
                {m && <span className="block text-sm text-muted">Desafío {m.cr} · CA {m.ca} · {m.pg} PG · iniciativa {sign(m.ini)}{m.propio ? ' · de esta campaña' : ''}</span>}
                {m && <Plegable titulo="Ver bloque"><BloqueMonstruo k={x.ref} m={m} /></Plegable>}
              </li>
            );
          })}
        </ul>
      </Plegable>
      <Boton tamano="sm" variante="fantasma" className="mt-2" onClick={quitar}>Quitar de la sesión</Boton>
    </Tarjeta>
  );
}

/** La pestaña Sesión: los combates del archivo «Info sesión», cada uno con su botón para activarlo, y el importador. */
function VistaSesion({ cp }: { cp: any }) {
  const encuentros: Encuentro[] = cp.encuentros || [];
  return (
    <>
      {cp.sesion?.nombre && <h2 className="mb-0 mt-4 font-serif text-2xl font-bold">{cp.sesion.nombre}</h2>}
      {cp.sesion?.notas && <Plegable titulo="Notas de la sesión" className="mt-2"><p className="m-0 whitespace-pre-line">{cp.sesion.notas}</p></Plegable>}
      {encuentros.length
        ? <ul className="m-0 mt-3 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-3 p-0">{encuentros.map(e => <TarjetaEncuentro key={e.id} cp={cp} e={e} />)}</ul>
        : <Nota className="mt-3">Todavía no hay combates preparados. Importa el archivo «Info sesión» y aparecen aquí, cada uno con su botón para activarlo.</Nota>}
      <ImportarSesion cp={cp} />
    </>
  );
}

/** Importar "Info sesión N" (JSON o CSV): crea una pestaña por combate y guarda los monstruos nuevos en la campaña. */
function ImportarSesion({ cp }: { cp: any }) {
  const id = useId();
  const leer = async (f: File) => {
    try {
      const [texto, cat] = await Promise.all([f.text(), cargarBestiario()]);
      const s = leerSesion(texto, f.name, cat, cp.bestiario || {});
      if (!s.encuentros.length) { avisar('El archivo no trae ningún combate.', 'aviso'); return; }
      conCamp(c => {
        c.bestiario = { ...(c.bestiario || {}), ...s.monstruos };
        // Un combate con el mismo nombre se reemplaza (volver a importar la sesión la actualiza)
        const nombres = new Set(s.encuentros.map(e => norm(e.nombre)));
        c.encuentros = [...(c.encuentros || []).filter((e: any) => !nombres.has(norm(e.nombre))), ...conservarVinculos(s.encuentros, c.encuentros || [])];
        c.sesion = { nombre: s.nombre, ...(s.notas ? { notas: s.notas } : {}), importadaEn: new Date().toISOString() };
      });
      S.mtab = 'sesion'; render(); irArriba();
      const nuevos = Object.keys(s.monstruos).length;
      avisar(`${s.nombre}: ${s.encuentros.length} combate${s.encuentros.length === 1 ? '' : 's'}${nuevos ? `, ${nuevos} monstruo${nuevos === 1 ? '' : 's'} nuevo${nuevos === 1 ? '' : 's'}` : ''}.${s.sinDatos.length ? ` Sin datos (quedan con CA 12 y 10 PG): ${s.sinDatos.join(', ')}.` : ''}`, s.sinDatos.length ? 'aviso' : undefined);
    } catch (e) { avisar(`No se pudo leer el archivo: ${(e as Error).message}`, 'error'); }
  };
  return (
    <Seccion titulo="Importar sesión">
      <Nota>Importa el archivo «Info sesión» del creador de campañas (JSON o CSV): sus combates aparecen arriba, y los enemigos que no están en el bestiario se guardan en esta campaña. Un combate con el mismo nombre se reemplaza.</Nota>
      <label htmlFor={id} className={cx('inline-flex min-h-11 cursor-pointer items-center rounded-xl bg-surface px-4 font-bold ring-1 ring-inset ring-rule hover:bg-soft focus-within:outline-3 focus-within:outline-rea')}>
        Importar info de sesión
        <input id={id} type="file" accept=".json,.csv,application/json,text/csv" className="sr-only" onChange={e => { const f = e.target.files?.[0]; if (f) leer(f); e.target.value = ''; }} />
      </label>
      {cp.sesion?.notas && <Plegable titulo={`Notas de ${cp.sesion.nombre}`}><p className="m-0 whitespace-pre-line">{cp.sesion.notas}</p></Plegable>}
    </Seccion>
  );
}

/** Lo que gastaron los jugadores en esta ronda (acción, adicional y reacción), al día cada 2 s mientras haya combate. */
/** Golpes ya aplicados en esta pantalla: la lista del servidor tarda un rato en vaciarse y no deben contarse dos veces. */
const golpesAplicados = new Set<string>();
/** Golpes de los que ya se avisó con un mensaje (para no avisar dos veces). */
const golpesAvisados = new Set<string>();
/** Concentraciones que ya se perdieron: lo que llegue después con ellas no se aplica. */
const concTerminadas = new Set<string>();
/** Pone una condición; si trae duración, se quita sola cuando termina, y si depende de una concentración, al perderla. */
function ponerCondicion(c: any, k: string, cond: string, hasta?: Hasta, conc?: string, repite?: Repite) {
  if (conc && concTerminadas.has(conc)) return;
  const e = estadoDe(c, k);
  if (!e.cond.includes(cond)) e.cond.push(cond);
  if (repite) e.repite = { ...(e.repite || {}), [cond]: repite };
  if (hasta) { e.hasta = { ...(e.hasta || {}), [cond]: hasta }; e.dur = { ...(e.dur || {}), [cond]: textoRestante(hasta, c.combate) }; }
  if (conc) e.conc = { ...(e.conc || {}), [cond]: conc };
}
/** El id de una concentración nueva de `k` (lo llevan sus efectos). */
const idConcentracion = (k: string) => `${k.replace(/[^\w-]/g, '-')}-${Date.now().toString(36)}`;
/** El modificador de salvación de alguien del combate, si se sabe (enemigo con bloque o personaje con hoja). */
function modSalvDe(cp: any, k: string, salv: string): number | null {
  const y = combatiente(k, cp); if (!y) return null;
  if (y.c?.saves) return y.c.saves[salv] ?? null;
  const f = y.m?.ref ? monstruoDe(cp, y.m.ref) : null;
  return f ? f.salv?.[salv] ?? Math.floor((((f.ab as any)?.[salv] ?? 10) - 10) / 2) : null;
}
/** Una salvación de un enemigo o de un personaje del DM repetida al terminar su turno. */
type Repeticion = { id: string; campId: string; k: string; cond: string } & Repite;
/** Se libra o no de la condición que lo tenía; quien se la puso se entera. */
function resolverRepeticion(r: Repeticion, supero: boolean) {
  const cp = campActual(), nombre = (cp && combatiente(r.k, cp)?.nombre) || 'El objetivo';
  if (supero) conCamp(c => { quitarCondicion(estadoDe(c, r.k), r.cond); });
  else render();
  avisar(supero ? `${nombre} se libra de ${r.cond}.` : `${nombre} sigue ${r.cond}.`);
  if (r.pid) avisarJugadorDm(r.campId, r.pid, `${nombre} ${supero ? `superó la salvación y se libra de ${r.cond}` : `falló la salvación y sigue ${r.cond}`}.`).catch(() => {});
}
/** Salvaciones que tira el DM (las de sus enemigos y sus personajes): salen de a una en una ventana amarilla que no deja
    seguir hasta resolverla. A un jugador unido le sale en su pantalla y aquí solo llega su resultado. */
type PedidoSalv = { id: string; campId: string; k: string; salv: string; cd: number; titulo: string; detalle: string; resolver: (supero: boolean) => void };
let pedidosSalv: PedidoSalv[] = [], nPedido = 0;
/** Sin id, cada pedido es uno nuevo; con id, no se pide dos veces lo mismo. */
function pedirSalvDm({ id, ...p }: Omit<PedidoSalv, 'id'> & { id?: string }) {
  const clave = id || `ps-${++nPedido}`;
  if (pedidosSalv.some(x => x.id === clave)) return;
  pedidosSalv = [...pedidosSalv, { id: clave, ...p }]; render();
}
function cerrarPedido(id: string) { pedidosSalv = pedidosSalv.filter(x => x.id !== id); render(); }
/** La ventana con la salvación que toca: las pedidas en esta pantalla y las que piden los jugadores a los enemigos. */
function PopupSalvacion({ cp, salvs }: { cp: any; salvs: Salvacion[] }) {
  const enCombate = new Set((cp.combate?.orden || []).map((o: any) => o.k));
  const deJugadores: PedidoSalv[] = salvs.flatMap(s => s.objetivos.filter(k => k.startsWith('m:') && enCombate.has(k) && !salvacionesResueltas.has(`${s.id}|${k}`)).map(k => {
    const nombre = combatiente(k, cp)?.nombre || 'El enemigo', salv = CLAVE_SALV[s.salv] || s.salv.toLowerCase();
    return { id: `${s.id}|${k}`, campId: cp.id, k, salv, cd: s.cd, titulo: `${nombre} debe hacer una salvación de ${NOMBRE_SALV[salv] || s.salv} CD ${s.cd}`,
      detalle: `(${s.nota ? `${s.nota}, de ` : ''}${s.de}) ${queLePasa(s.dano, s.mitad, s.condicion)}`, resolver: (supero: boolean) => resolverSalv(cp.id, s, k, supero) };
  }));
  const lista = [...pedidosSalv.filter(p => p.campId === cp.id), ...deJugadores], p = lista[0];
  return (
    <PopupTarjeta abierto={!!p} tono="salvacion" etiqueta="Tirada de salvación">
      {p && <PedidoSalvacion key={p.id} cp={cp} p={p} />}
      {lista.length > 1 && <p className="m-0 text-center text-sm text-muted">Hay {lista.length - 1} salvaci{lista.length > 2 ? 'ones' : 'ón'} más después de esta.</p>}
    </PopupTarjeta>
  );
}
/** Lo que pasa si falla o la supera, en una frase. */
function queLePasa(dano: number, mitad: boolean, condicion?: string | null) {
  const t = [dano ? `si falla, ${dano} de daño${mitad ? `; si la supera, ${Math.floor(dano / 2)}` : '; si la supera, nada'}` : '', condicion ? `si falla queda ${condicion}` : ''].filter(Boolean).join(', ');
  return t ? `${t[0].toUpperCase()}${t.slice(1)}.` : '';
}
function PedidoSalvacion({ cp, p }: { cp: any; p: PedidoSalv }) {
  const [nat, setNat] = useState('');
  const nombre = combatiente(p.k, cp)?.nombre || 'El objetivo', mod = modSalvDe(cp, p.k, p.salv), ns = NOMBRE_SALV[p.salv] || p.salv;
  const sola = fallaSola(cp.estado?.[p.k]?.cond, p.salv);
  const expr = `1d20${mod != null ? modStr(mod) : ''}`, total = totalTirada(expr, nat), supera = total != null && total >= p.cd;
  const hecho = (supero: boolean) => { cerrarPedido(p.id); p.resolver(supero); };
  return (
    <>
      <div>
        <h2 className="m-0 font-serif text-xl font-extrabold"><Simbolo n="shield" className="text-adi" /> {p.titulo}</h2>
        {p.detalle && <p className="m-0 mt-1">{p.detalle}</p>}
      </div>
      {sola ? <>
        <p className="m-0 font-bold text-acc">{nombre} está {sola}: la falla sin tirar.</p>
        <Boton variante="primario" className="min-h-12" onClick={() => hecho(false)}>Confirmar que la falla</Boton>
      </> : <>
        <CampoTirada tipo="ataque" expr={expr} valor={nat} alCambiar={setNat} etiqueta={`Salvación de ${ns} de ${nombre} (CD ${p.cd})`} sinCritico
          desglose={`su salvación de ${ns}`} claseInput={claseCampo} />
        {mod == null && <p className="m-0 text-sm text-muted">No se sabe su bonificador de salvación: súmalo tú o marca abajo si la superó.</p>}
        {total != null && <p className={cx('m-0 font-serif text-xl font-extrabold', supera ? 'text-pas' : 'text-acc')}>{total} contra CD {p.cd}: {supera ? 'la supera' : 'la falla'}</p>}
        <Boton variante="primario" className="min-h-12" disabled={total == null} onClick={() => hecho(supera)}>{total == null ? 'Escribe lo que salió en el d20' : 'Confirmar y aplicar'}</Boton>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted">O márcalo sin escribir el dado:</span>
          <Boton tamano="sm" onClick={() => hecho(true)}>Superó</Boton>
          <Boton tamano="sm" onClick={() => hecho(false)}>Falló</Boton>
        </div>
      </>}
    </>
  );
}
/** Un enemigo concentrado que recibe daño hace una salvación de Constitución para no perderla. */
function avisoConcentracion(c: any, k: string, dano: number, nombre: string) {
  if (dano > 0 && estadoDe(c, k).cond.includes('Concentrado'))
    avisar(`${nombre} está concentrado: salvación de Constitución CD ${Math.min(30, Math.max(10, Math.floor(dano / 2)))}. Si falla, quítale «Concentrado».`, 'aviso');
}
/** Se acaba lo que dependía de esa concentración, en esta mesa (las hojas de los jugadores se enteran por su lado). */
function acabarConcentracion(c: any, conc: string, quien: string, que: string) {
  concTerminadas.add(conc);
  const fin = quitarConcentracion(c.estado, conc, k => combatiente(k, c)?.nombre || k);
  if (fin.length) avisar(`${quien} dejó de concentrarse en ${que}: se acabó ${fin.join('; ')}.`);
  return fin.length > 0;
}
/** Aplica un golpe de un jugador al objetivo (daño, curación y condición) y avisa al servidor para vaciarlo de la lista. */
function aplicarGolpe(campId: string, g: Golpe) {
  if (golpesAplicados.has(g.id)) return;
  golpesAplicados.add(g.id);
  conCamp(c => {
    if (c.id !== campId) return false;
    const m = c.monstruos.find((x: any) => 'm:' + x.id === g.objetivo);
    const pjDm = !m && g.objetivo.startsWith('pj:') ? combatiente(g.objetivo, c) : null;
    const quien = m?.nombre || pjDm?.nombre;
    if (m) m.pg = Math.min(m.pgMax, Math.max(0, m.pg + (g.cura ? g.dano : -g.dano)));
    else if (pjDm) cambiarPg(c, g.objetivo, g.cura ? g.dano : -g.dano);
    if (quien && g.condicion) ponerCondicion(c, g.objetivo, g.condicion, g.hasta, g.conc);
    if (quien && !g.cura) avisoConcentracion(c, g.objetivo, g.dano, quien);
    const hecho = g.dano ? (g.cura ? `${g.dano} de curación` : `${g.dano} de daño`) : '';
    avisar(quien ? `${[hecho, g.condicion].filter(Boolean).join(', ')} aplicado a ${quien}.` : `${g.de} actuó sobre alguien que ya no está.`);
  });
  confirmarGolpes(campId, [g.id]).catch(() => {});
}
function descartarGolpe(campId: string, g: Golpe) {
  golpesAplicados.add(g.id);
  render();
  confirmarGolpes(campId, [g.id]).catch(() => {});
}

const peticionesResueltas = new Set<string>();
const NIVELES_INFO: [string, string][] = [['', 'No saben nada'], ['b', 'Lo básico (tamaño y tipo)'], ['d', 'También debilidades']];
/** Lo que los jugadores saben de un enemigo y sus peticiones: el DM decide cuánto se revela. */
function InfoParaJugadores({ cp, x, peticiones }: { cp: any; x: any; peticiones: Peticion[] }) {
  const nivel: string = cp.estado?.[x.k]?.rev || '';
  const fijar = (n: string) => conCamp(c => { const e = estadoDe(c, x.k); if ((e.rev || '') === n) return false; e.rev = n; });
  const mias = peticiones.filter(q => q.objetivo === x.k && !peticionesResueltas.has(q.id));
  const resolver = (q: Peticion, n: string) => {
    peticionesResueltas.add(q.id);
    if (n) fijar(n);
    else render();
    quitarPeticiones(cp.id, [q.id]).catch(() => {});
    avisar(n ? `${q.de} ya sabe ${n === 'd' ? 'lo básico y las debilidades' : 'lo básico'} de ${x.nombre}.` : 'Petición rechazada.');
  };
  return (
    <div className="mt-2">
      {mias.map(q => (
        <div key={q.id} className="mb-2 rounded-xl bg-adi/20 p-2 text-sm" aria-live="polite">
          <p className="m-0"><b>{q.de}</b> quiere saber qué sabe de <b>{x.nombre}</b>.</p>
          <div className="mt-1 flex flex-wrap gap-2">
            <Boton tamano="sm" variante="primario" onClick={() => resolver(q, 'b')}>Lo básico</Boton>
            <Boton tamano="sm" onClick={() => resolver(q, 'd')}>Con debilidades</Boton>
            <Boton tamano="sm" variante="fantasma" onClick={() => resolver(q, '')}>Rechazar</Boton>
          </div>
        </div>
      ))}
      <label className="flex flex-wrap items-center gap-2 text-sm text-muted">Lo que saben los jugadores
        <select value={nivel} onChange={e => fijar(e.target.value)} className={cx(claseCampo, 'w-auto!')}>
          {NIVELES_INFO.map(([v, n]) => <option key={v} value={v}>{n}</option>)}
        </select>
      </label>
    </div>
  );
}

/** Lo que los jugadores hicieron sobre este combatiente: el DM lo aplica o lo descarta con un botón. */
function GolpesPendientes({ cp, k, nombre, golpes }: { cp: any; k: string; nombre: string; golpes: Golpe[] }) {
  const mios = golpes.filter(g => g.objetivo === k && !golpesAplicados.has(g.id));
  if (!mios.length) return null;
  return (
    <div className="mt-2 grid gap-2" aria-live="polite">
      {mios.map(g => (
        <div key={g.id} className="rounded-xl bg-acc/15 p-2 text-sm">
          <p className="m-0"><b>{g.de}</b>{g.nota ? ` (${g.nota})` : ''} {g.dano ? <>{g.cura ? 'cura' : 'hace'} <b>{g.dano}</b>{g.cura ? ' PG' : ' de daño'}</> : 'actúa'}{g.condicion ? <> y deja <b>{g.condicion}</b></> : ''} a <b>{nombre}</b>.{g.bono ? <span className="text-muted"> {g.bono}</span> : null}</p>
          <div className="mt-1 flex flex-wrap gap-2">
            <Boton tamano="sm" variante="primario" onClick={() => aplicarGolpe(cp.id, g)}>Aplicar</Boton>
            <Boton tamano="sm" onClick={() => descartarGolpe(cp.id, g)}>Descartar</Boton>
          </div>
        </div>
      ))}
    </div>
  );
}

type VivoDm = { eco: Record<string, EconomiaRonda>; salvs: Salvacion[]; golpes: Golpe[]; peticiones: Peticion[]; ultimas: NonNullable<CombateVivo>['ultimas']; respuestas: RespuestaSalvacion[] };
/** Descanso o inspiración para los jugadores unidos (a uno solo si se da su personaje). */
async function mandarOrden(campId: string, tipo: 'corto' | 'largo' | 'inspiracion', personajeId?: string) {
  const nombre = { corto: 'Descanso corto', largo: 'Descanso largo', inspiracion: 'Inspiración' }[tipo];
  if (tipo !== 'inspiracion' && !(await confirmar({ titulo: `¿${nombre} para todos los jugadores?`, texto: 'Cada hoja recupera lo que corresponde cuando su jugador la tenga abierta (en menos de un minuto).', si: nombre }))) return;
  try { await enviarOrdenDm(campId, tipo, personajeId); avisar(`${nombre} enviado${personajeId ? '' : ' a todos'}.`); }
  catch (e) { avisar(`No se pudo enviar: ${(e as Error).message}`, 'error'); }
}

function useEconomiaVivo(campId: string, activo: boolean): VivoDm {
  const [vivo, setVivo] = useState<VivoDm>({ eco: {}, salvs: [], golpes: [], peticiones: [], ultimas: {}, respuestas: [] });
  useEffect(() => {
    if (!activo) return;
    let sigue = true;
    const leer = () => combateVivoDm(campId).then(v => {
      if (!sigue) return;
      const golpes = v?.golpes || [];
      setVivo({ eco: v?.economia || {}, salvs: v?.salvaciones || [], golpes, peticiones: v?.peticiones || [], ultimas: v?.ultimas || {}, respuestas: v?.respuestas || [] });
      // La condición que le quedó a un jugador al fallar la salvación que le pediste también se anota en su tarjeta
      for (const r of v?.respuestas || []) if (!respuestasVistas.has(r.id)) {
        respuestasVistas.add(r.id);
        if (r.condicion) conCamp(c => {
          const o = (c.combate.orden || []).find((x: any) => combatiente(x.k, c)?.u?.personajeId === r.pid); if (!o) return false;
          const e = estadoDe(c, o.k), tiene = e.cond.includes(r.condicion);
          // Superó la salvación que repite al final de su turno: se libra
          if (r.supero) { if (!tiene) return false; quitarCondicion(e, r.condicion!); return; }
          if (tiene && !r.repite) return false;
          ponerCondicion(c, o.k, r.condicion!, r.hasta, r.conc, r.repite && r.salv && r.cd ? { salv: r.salv, cd: r.cd, de: r.de } : undefined);
        });
      }
      // Alguien perdió la concentración: se quita lo que dependía de ella
      for (const o of v?.ordenes || []) if (o.tipo === 'finConc' && o.conc && !concTerminadas.has(o.conc)) {
        const conc = o.conc;
        conCamp(c => { if (!acabarConcentracion(c, conc, o.de || 'Alguien', o.nota || 'su conjuro')) return false; });
      }
      for (const q of v?.peticiones || []) if (!golpesAvisados.has(q.id) && !peticionesResueltas.has(q.id)) {
        golpesAvisados.add(q.id);
        const cp = campActual(), obj = cp && combatiente(q.objetivo, cp);
        avisar(`${q.de} pide saber de ${obj?.nombre || 'un enemigo'}. Respóndele en su tarjeta.`);
      }
      // Aviso al llegar algo nuevo; se aplica con el botón de la tarjeta del objetivo
      for (const g of golpes) if (!golpesAvisados.has(g.id) && !golpesAplicados.has(g.id)) {
        golpesAvisados.add(g.id);
        const cp = campActual(), obj = cp && combatiente(g.objetivo, cp);
        avisar(`${g.de}${g.nota ? ` (${g.nota})` : ''} actuó sobre ${obj?.nombre || 'alguien'}. Aplícalo en su tarjeta.`);
      }
    }, () => {});
    leer();
    const t = setInterval(() => { if (document.visibilityState === 'visible') leer(); }, 2000);
    return () => { sigue = false; clearInterval(t); };
  }, [campId, activo]);
  return vivo;
}

/** Respuestas de salvación de los jugadores ya vistas (para anotar su condición una sola vez) y las que el DM ya cerró. */
const respuestasVistas = new Set<string>(), respuestasCerradas = new Set<string>();
/** Lo que respondieron los jugadores a las salvaciones que les pediste: un aviso amarillo de a uno, hasta que lo des por visto. */
function RespuestasSalvacion({ campId, respuestas }: { campId: string; respuestas: RespuestaSalvacion[] }) {
  const [, setN] = useState(0);
  const cerrar = (r: RespuestaSalvacion) => { respuestasCerradas.add(r.id); setN(n => n + 1); quitarRespuestas(campId, [r.id]).catch(() => {}); };
  const lista = respuestas.filter(r => !respuestasCerradas.has(r.id)), r = lista[0];
  return (
    <PopupGrande abierto={!!r} tono="salvacion" titulo={r ? (r.evito ? `${r.de} evitó el ataque` : `${r.de} ${r.supero ? 'superó' : 'falló'} la salvación`) : ''} texto={r ? (r.evito ? 'Su reacción hizo fallar el ataque: no hace la salvación.' : `Sacó ${r.total}.`) : undefined}>
      {r && <>
        <p className="m-0 text-center text-lg">{r.evito ? 'No recibe daño ni la condición' : r.supero && r.condicion ? `Se libra de ${r.condicion}` : [r.dano ? `Recibió ${r.dano} de daño` : r.supero ? 'No le pasa nada' : '', r.condicion ? `queda ${r.condicion}` : ''].filter(Boolean).join(' y ') || 'Ya se aplicó en su hoja'}.</p>
        {lista.length > 1 && <p className="m-0 text-center text-sm text-muted">Hay {lista.length - 1} aviso{lista.length > 2 ? 's' : ''} más después de este.</p>}
        <Boton variante="primario" className="min-h-14 text-lg" onClick={() => cerrar(r)}>Entendido</Boton>
      </>}
    </PopupGrande>
  );
}

/** Salvaciones ya resueltas en esta pantalla (la lista del servidor tarda un rato en vaciarse). */
const salvacionesResueltas = new Set<string>();
/** El DM dice si el enemigo superó o falló la salvación: se aplica el daño (completo, mitad o nada) y la condición. */
function resolverSalv(campId: string, s: Salvacion, k: string, supero: boolean) {
  const clave = `${s.id}|${k}`;
  if (salvacionesResueltas.has(clave)) return;
  salvacionesResueltas.add(clave);
  conCamp(c => {
    const m = c.monstruos.find((x: any) => 'm:' + x.id === k);
    if (!m) return false;
    const dano = supero ? (s.mitad ? Math.floor(s.dano / 2) : 0) : s.dano;
    m.pg = Math.max(0, m.pg - dano);
    if (!supero && s.condicion) ponerCondicion(c, k, s.condicion, s.hasta, s.conc, s.repite ? { salv: s.salv.toLowerCase(), cd: s.cd, de: s.de, ...(s.pid ? { pid: s.pid } : {}) } : undefined);
    avisoConcentracion(c, k, dano, m.nombre);
    avisar(`${m.nombre} ${supero ? 'superó' : 'falló'} la salvación de ${s.salv}${dano ? `: ${dano} de daño` : ''}${!supero && s.condicion ? `, ${s.condicion}` : ''}.`);
  });
  resolverSalvacion(campId, s.id, k).catch(() => {});
  // Quien la pidió se entera en su pantalla
  const m = campActual()?.monstruos.find((x: any) => 'm:' + x.id === k);
  if (s.pid) avisarJugadorDm(campId, s.pid, `${m?.nombre || 'El enemigo'} ${supero ? 'superó' : 'falló'} la salvación de ${s.salv}${s.nota ? ` contra tu ${s.nota}` : ''}${supero ? (s.mitad && s.dano ? ': recibe la mitad del daño' : '') : s.condicion ? `: queda ${s.condicion}` : ''}.`).catch(() => {});
}

const CLAVE_SALV: Record<string, string> = { FUE: 'fue', DES: 'des', CON: 'con', INT: 'int', SAB: 'sab', CAR: 'car' };
const NOMBRE_SALV: Record<string, string> = { fue: 'Fuerza', des: 'Destreza', con: 'Constitución', int: 'Inteligencia', sab: 'Sabiduría', car: 'Carisma' };

const ETIQUETAS_ACCION: [TipoAccionRonda, string][] = [['accion', 'Acción'], ['adicional', 'Adicional'], ['reaccion', 'Reacción']];
/** Las tres acciones de la ronda: tachadas las que ya gastó. El DM las marca o las recupera tocándolas
 *  (para quien no usa la app, y para los enemigos). */
function AccionesRonda({ cp, x, campId, clave, eco, nombre }: { cp: any; x: any; campId: string; clave: string; eco: EconomiaRonda | undefined; nombre: string }) {
  const cat = useCatalogo(), [abierto, setAbierto] = useState<TipoAccionRonda | null>(null), [igual, setIgual] = useState(false);
  const ficha = x.tipo === 'm' && x.m?.ref && (cat || cp.bestiario?.[x.m.ref]) ? monstruoDe(cp, x.m.ref) : null;
  // Los personajes (de los jugadores o del DM) usan su hoja, como en el teléfono
  const hoja = x.tipo !== 'm' && x.c ? x.c : null;
  const [local, setLocal] = useState<Partial<Record<TipoAccionRonda, { v: boolean; t: number }>>>({});
  const tocar = (t: TipoAccionRonda, gastado: boolean) => {
    setLocal(p => ({ ...p, [t]: { v: gastado, t: Date.now() } }));
    fijarAccionDm(campId, clave, t, gastado).catch((e: Error) => { avisar(`No se pudo marcar: ${e.message}`, 'error'); setLocal(p => { const { [t]: _x, ...resto } = p; void _x; return resto; }); });
  };
  // Lo tocado hace un momento manda hasta que el servidor lo devuelva igual
  const ahora = (t: TipoAccionRonda) => { const l = local[t]; return l && Date.now() - l.t < 3000 ? l.v : eco?.[t]; };
  const incap = incapacidad(cp.estado?.[x.k]?.cond);
  const abre = !!ficha || !!hoja;
  const cerrar = () => { setAbierto(null); setIgual(false); };
  return (
    <>
      <p className="m-0 mt-1 flex flex-wrap gap-1" aria-label={`Acciones de ${nombre} en esta ronda`}>
        {ETIQUETAS_ACCION.map(([t, n]) => {
          const gastada = !!ahora(t);
          return (
            <button key={t} type="button" aria-haspopup={abre ? 'dialog' : undefined} aria-pressed={abre ? undefined : gastada}
              onClick={() => abre ? setAbierto(t) : tocar(t, !gastada)}
              title={abre ? 'Toca para ver qué puede hacer' : gastada ? 'Toca para recuperarla' : 'Toca para marcarla como gastada'}
              className={cx('min-h-9 cursor-pointer rounded-full px-3 text-xs font-bold', foco, gastada ? 'bg-soft text-muted line-through' : incap ? 'bg-acc/15 text-acc' : 'bg-pas/20 text-pas')}>
              {n}{gastada ? ' · gastada' : incap ? ` · ${incap.cond.toLowerCase()}` : ''}
            </button>
          );
        })}
      </p>
      <Dialogo abierto={!!abierto} onCerrar={cerrar} titulo={abierto ? `${ETIQUETAS_ACCION.find(([t]) => t === abierto)![1]} de ${nombre}` : ''} ancho="lg"
        descripcion={abierto && ahora(abierto) ? 'Ya la gastó esta ronda.' : undefined}>
        {abierto && (incap && !igual ? (
          <div className="grid gap-3">
            <Aviso tipo="aviso" titulo={`${nombre} está ${incap.cond}: no puede actuar`}>{incap.porque}</Aviso>
            <div className="flex flex-wrap gap-2">
              <Boton variante="primario" onClick={cerrar}>Entendido</Boton>
              <Boton onClick={() => setIgual(true)}>Actuar igual (lo decides tú)</Boton>
            </div>
          </div>
        ) : ficha ? <AccionesMonstruo cp={cp} x={x} ficha={ficha} tipo={abierto} gastada={!!ahora(abierto)} marcar={g => tocar(abierto, g)} alTerminar={cerrar} alSeguir={setAbierto} />
          : <AccionesPersonaje cp={cp} x={x} tipo={abierto} gastada={!!ahora(abierto)} marcar={g => tocar(abierto, g)} alTerminar={cerrar} alSeguir={setAbierto} />)}
      </Dialogo>
    </>
  );
}

/** Lo que el personaje puede hacer, como en su teléfono: el DM elige y lo tira por él (ataque contra la CA, daño y salvaciones).
 *  Los espacios y usos que gaste los descuenta el jugador en su hoja. */
function AccionesPersonaje({ cp, x, tipo, gastada, marcar, alTerminar, alSeguir }: { cp: any; x: any; tipo: TipoAccionRonda; gastada: boolean; marcar: (g: boolean) => void; alTerminar?: () => void; alSeguir?: (t: TipoAccionRonda) => void }) {
  const [elegido, setElegido] = useState<Uso | null>(null), [usando, setUsando] = useState<any>(null);
  if (usando) return (
    <div className="grid gap-2">
      <Boton variante="fantasma" className="justify-self-start" onClick={() => setUsando(null)}>← Elegir otra cosa</Boton>
      <AccionesMonstruo cp={cp} x={x} ficha={{ acciones: [usando], adicionales: [usando], reacciones: [usando] }} tipo={tipo} gastada={gastada} marcar={marcar} alTerminar={alTerminar} alSeguir={alSeguir} />
    </div>
  );
  const usar = () => {
    if (!elegido) return;
    const a = accionDeUso(elegido);
    if (a.atk != null || a.cd != null || a.dano) { setUsando(a); return; }
    if (!gastada) marcar(true);
    avisar(`${x.nombre}: ${elegido.nombre}. Si deja algo en otro, aplícalo en su tarjeta.`);
    setElegido(null);
  };
  return (
    <div className="grid gap-3">
      <OpcionesDeTipo c={x.c} t={tipo} elegido={elegido} elegir={setElegido} marcas={[]} quitarMarca={() => {}} />
      <p className="m-0 text-sm text-muted">Los espacios de conjuro y usos que gaste los descuenta {x.tipo === 'jug' ? 'su jugador en su hoja' : 'su hoja'}.</p>
      <div className="sticky bottom-0 flex flex-wrap gap-2 bg-bg/95 py-2">
        <Boton variante="primario" className="flex-1" disabled={!elegido} onClick={usar}>{elegido ? `Usar ${elegido.nombre}` : 'Toca una opción para elegirla'}</Boton>
        <Boton onClick={() => marcar(!gastada)}>{gastada ? 'Recuperar' : 'Solo marcarla gastada'}</Boton>
      </div>
    </div>
  );
}
/** Lo que eligió en su hoja, como una acción de bloque: ataque, salvación y daño. */
function accionDeUso(u: Uso) {
  const t = u.raw ? u.texto.replace(/<[^>]+>|\*\*|__/g, '') : u.texto, d = u.dexpr || u.conjuro?.base;
  return { n: u.nombre, t, ...(u.atk != null ? { atk: u.atk } : {}), ...(u.salv && u.cd ? { salv: u.salv.toLowerCase(), cd: u.cd } : {}),
    ...(d ? { dano: [{ d: d.replace(/\s+/g, ''), tipo: u.tipoDano || '' }] } : {}), ...(u.golpes && u.golpes > 1 ? { golpes: u.golpes } : {}), ...(u.extras?.length ? { extras: u.extras } : {}) } as { n: string; t: string; atk?: number; salv?: string; cd?: number; dano?: { d: string; tipo: string }[]; golpes?: number; extras?: Uso['extras'] };
}

/** Las acciones del bloque de un enemigo o compañero para el tipo elegido: el DM escoge objetivo, tira (en la app o con sus dados) y aplica el daño. */
function AccionesMonstruo({ cp, x, ficha, tipo, gastada, marcar, alTerminar, alSeguir }: { cp: any; x: any; ficha: any; tipo: TipoAccionRonda; gastada: boolean; marcar: (g: boolean) => void; alTerminar?: () => void; alSeguir?: (t: TipoAccionRonda) => void }) {
  const [obj, setObj] = useState('');
  // Terminó de hacer todo lo que pedía la acción: la ventana se cierra sola cuando no queda nada por resolver
  const [listo, setListo] = useState(false), [seguir, setSeguir] = useState<Extra[]>([]), [descartado, setDescartado] = useState(false);
  // Los daños como lista aunque un archivo de sesión viejo los haya guardado como texto
  const lista = (({ accion: ficha.acciones, adicional: ficha.adicionales, reaccion: ficha.reacciones }[tipo] || []) as any[]).map(a => ({ ...a, dano: danosDe(a.dano) }));
  const blancos = (cp.combate.orden || []).map((o: any) => combatiente(o.k, cp)).filter((y: any) => y && y.k !== x.k);
  /** Salvación que debe hacer el objetivo: tras acertar (la parálisis de las garras) o en lugar del ataque (con el daño
      ya tirado, que entra entero, a la mitad o nada según la supere). */
  type Pend = { a: any; k: string; nombre: string; dano: number; cd: number; salv: string; condicion?: string; mitad: boolean };
  /** Aplica el daño a un objetivo: a un jugador unido le llega a su hoja (con la condición, si la hay). */
  const aplicar = async (k: string, nombre: string, dano: number, a: any, condicion?: string, repite?: Repite) => {
    const y = combatiente(k, campActual() || cp);
    if (!y || !(dano || condicion)) return;
    const tipoDano = dano ? (a.dano || []).map((d: any) => d.tipo).filter(Boolean).join(', ') : '';
    const dura = condicion ? duracionDe(a, k) : null;
    if (y.tipo === 'jug') await enviarEfectoDm(cp.id, y.u.personajeId, { de: x.nombre, dano, nota: a.n, ...(condicion ? { condicion } : {}), ...(tipoDano ? { tipoDano } : {}), ...(dura?.extras || {}) });
    conCamp(c => {
      if (y.tipo !== 'jug' && dano) cambiarPg(c, k, -dano);
      if (condicion) ponerCondicion(c, k, condicion, dura?.hasta, dura?.conc, repite);
      if (y.tipo !== 'jug') avisoConcentracion(c, k, dano, nombre);
    });
    avisar(`${x.nombre}: ${nombre}${dano ? ` recibe ${dano} de daño` : ''}${dano && condicion ? ' y' : ''}${condicion ? ` queda ${condicion}` : ''}${y.tipo === 'jug' ? '. Le llega a su hoja.' : '.'}`);
  };
  /** Cuánto dura la condición que deja la acción (según su texto) y, si pide concentración, el enemigo se concentra en ella. */
  const duracionDe = (a: any, objetivo: string) => {
    const c0 = campActual() || cp, h = hastaDe(a.t || '', c0.combate, x.k, objetivo);
    let conc: string | undefined;
    if (/concentraci/i.test(a.t || '')) {
      const e = estadoDe(c0, x.k);
      // Una sola concentración: la nueva reemplaza a la anterior
      if (e.concPropia?.nombre !== a.n) {
        const antes = e.concPropia;
        conc = idConcentracion(x.k);
        conCamp(c => {
          const ee = estadoDe(c, x.k);
          if (antes) acabarConcentracion(c, antes.id, x.nombre, antes.nombre);
          ee.concPropia = { id: conc, nombre: a.n };
          ponerCondicion(c, x.k, 'Concentrado', h?.hasta);
        });
        if (antes) terminarConcentracionDm(cp.id, antes.id, x.nombre, antes.nombre).catch(() => {});
      } else conc = e.concPropia.id;
    }
    const extras = { ...(h ? { rondas: h.rondas, hastaRonda: h.hasta.ronda, hastaK: h.hasta.k } : {}), ...(conc ? { conc } : {}) };
    return { hasta: h?.hasta, conc, extras };
  };
  /** Pide la salvación: a un jugador unido le sale en su pantalla (y a ti solo te llega si la superó); la de un enemigo o
      un personaje tuyo te sale a ti en la ventana amarilla, para que la tires. */
  const pedir = async (p: Pend) => {
    if (combatiente(p.k, campActual() || cp)?.tipo === 'jug') { await mandarSalv(p); return; }
    pedirSalvDm({ campId: cp.id, k: p.k, salv: p.salv, cd: p.cd,
      titulo: `${p.nombre} debe hacer una salvación de ${NOMBRE_SALV[p.salv] || p.salv} CD ${p.cd}`,
      detalle: `(${p.a.n}, de ${x.nombre}) ${queLePasa(p.dano, p.mitad, p.condicion)}`, resolver: supero => { void resolver(p, supero); } });
  };
  /** El daño ya tirado (a mano o en la app): con salvación en lugar del ataque, primero se pide la salvación;
      tras un ataque que acierta, entra entero y después llega la salvación de su condición. */
  const danar = async (a: any, dano: number, k: string = obj) => {
    const y = blancos.find((b: any) => b.k === k);
    if (!y) { avisar('Elige primero el objetivo.', 'aviso'); return false; }
    const ef = efectoSalvacion(a);
    try {
      let p: Pend | null = null;
      if (ef && a.atk == null) p = { a, k: y.k, nombre: y.nombre, dano, ...ef };
      else {
        await aplicar(y.k, y.nombre, dano, a);
        if (ef) p = { a, k: y.k, nombre: y.nombre, dano: 0, ...ef, mitad: false };
      }
      if (!gastada) marcar(true);
      if (p) await pedir(p);
      return true;
    } catch (e) { avisar(`No se pudo aplicar: ${(e as Error).message}`, 'error'); return false; }
  };
  /** Una acción que solo pide salvación (sin daño): la condición entra si la falla. */
  const pedirSalv = async (a: any) => {
    const ef = efectoSalvacion(a), y = blancos.find((b: any) => b.k === obj);
    if (!y) { avisar('Elige primero el objetivo.', 'aviso'); return; }
    if (!ef) return;
    if (!gastada) marcar(true);
    try { await pedir({ a, k: y.k, nombre: y.nombre, dano: 0, ...ef }); setListo(true); }
    catch (e) { avisar(`No se pudo enviar: ${(e as Error).message}`, 'error'); }
  };
  const resolver = async (p: Pend, supero: boolean) => {
    const dano = supero ? (p.mitad ? Math.floor(p.dano / 2) : 0) : p.dano;
    try {
      const repite = !supero && p.condicion && repiteSalvacion(p.a.t || '') ? { salv: p.salv, cd: p.cd, de: x.nombre } : undefined;
      await aplicar(p.k, p.nombre, dano, p.a, supero ? undefined : p.condicion, repite);
      if (supero && !dano) avisar(`${p.nombre} superó la salvación de ${p.a.n}.`);
    } catch (e) { avisar(`No se pudo aplicar: ${(e as Error).message}`, 'error'); }
  };
  /** A un jugador unido le sale la salvación en su pantalla; él la tira, se aplica en su hoja y su resultado llega aquí. */
  const mandarSalv = async (p: Pend) => {
    const y = combatiente(p.k, cp); if (y?.tipo !== 'jug') return;
    const dura = p.condicion ? duracionDe(p.a, p.k) : null;
    await pedirSalvacionDm(cp.id, y.u.personajeId, { de: x.nombre, salv: p.salv, cd: p.cd, dano: p.dano, mitad: p.mitad, ...(p.condicion ? { condicion: p.condicion } : {}), nota: p.a.n, ...(dura?.extras || {}), ...(p.condicion && repiteSalvacion(p.a.t || '') ? { repite: true } : {}) });
    avisar(`A ${p.nombre} le salió la salvación en su pantalla. Te llega su resultado.`);
  };
  // Al terminar: si el ataque acertó y hay otro con el que seguir (acción adicional), un aviso celeste; si no, la ventana se cierra sola
  const sigue = listo && seguir.length > 0 && !!alSeguir && !descartado;
  useEffect(() => { if (listo && !(seguir.length && alSeguir)) alTerminar?.(); }, [listo]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="mt-2 rounded-xl bg-soft p-2 text-sm">
      <PopupGrande abierto={sigue} tono="seguimiento" titulo={`¡${x.nombre} acertó!`} texto="Puede seguir con:">
        <ul className="m-0 grid list-none gap-2 p-0">
          {seguir.map(e => <li key={e.nombre} className="rounded-2xl bg-surface p-4 ring-1 ring-rea"><b>{e.nombre}</b><span className="block text-sm text-muted">Otro ataque ({e.atk}{e.expr ? `, ${e.expr}` : ''}) con su acción adicional.</span></li>)}
        </ul>
        <Boton variante="primario" className="min-h-14 text-lg" onClick={() => { setDescartado(true); alSeguir?.('adicional'); }}>Ir a Acción adicional</Boton>
        <Boton className="min-h-14 text-lg" onClick={() => { setDescartado(true); alTerminar?.(); }}>Terminar sin seguir</Boton>
      </PopupGrande>
      <div className="flex flex-wrap items-center gap-2">
        <label className="font-bold" htmlFor={`obj-${x.k}`}>Objetivo</label>
        <select id={`obj-${x.k}`} value={obj} onChange={e => setObj(e.target.value)} className={cx(claseCampo, 'w-auto! min-w-40')}>
          <option value="">Elige…</option>
          {blancos.map((y: any) => <option key={y.k} value={y.k}>{y.nombre} (CA {y.ca})</option>)}
        </select>
        <Boton tamano="sm" onClick={() => marcar(!gastada)}>{gastada ? 'Recuperar' : 'Marcar gastada'}</Boton>
      </div>
      {lista.length ? lista.map((a, i) => <AccionMonstruo key={`${x.k}-${tipo}-${i}`} a={a} x={x} blancos={blancos} obj={obj} danar={danar} pedirSalv={pedirSalv} alListo={s => { setSeguir(s); setListo(true); }} />)
        : <p className="m-0 mt-2 text-muted">No tiene acciones de este tipo en su bloque.</p>}
    </div>
  );
}

/** Una acción del bloque. Si tiene varios ataques (dos rayos, Ataque Extra), cada uno se hace por separado con su objetivo. */
function AccionMonstruo({ x, a, blancos, obj, danar, pedirSalv, alListo }: { x: any; a: any; blancos: any[]; obj: string; danar: (a: any, dano: number, k?: string) => Promise<boolean>; pedirSalv: (a: any) => void; alListo: (seguir: Extra[]) => void }) {
  const n = Math.max(1, +a.golpes || 1), [hechos, setHechos] = useState<boolean[]>(() => Array(n).fill(false)), seguir = useRef<Extra[]>([]);
  const dexpr = (a.dano || []).map((d: any) => d.d).join('+');
  const atkExpr = a.atk != null ? `1d20${modStr(a.atk)}` : '';
  useEffect(() => { if (hechos.every(Boolean)) alListo(seguir.current); }, [hechos]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="mt-2 grid gap-2 border-t border-rule pt-2">
      <div>
        <b>{a.n}.</b> {a.atk != null && <span>{sign(a.atk)} al golpe. </span>}{a.cd != null && <span>Salvación de {a.salv} CD {a.cd}. </span>}
        {a.dano?.length ? <span>Daño: {a.dano.map((d: any) => `${d.d} ${d.tipo}`).join(' + ')}. </span> : null}
        {n > 1 && <span>{n} {a.atk != null ? 'ataques' : 'golpes'}, cada uno con su objetivo. </span>}
        {a.t && <p className="m-0 mt-0.5 text-muted">{a.t}</p>}
      </div>
      {!dexpr && !atkExpr && efectoSalvacion(a) && <Boton tamano="sm" variante="primario" className="justify-self-start" onClick={() => pedirSalv(a)}>Pedir salvación</Boton>}
      {(dexpr || atkExpr) && Array.from({ length: n }, (_, i) => (
        <GolpeAccion key={i} i={i} n={n} x={x} a={a} blancos={blancos} obj={obj} hecho={hechos[i]} danar={danar}
          alHecho={s => { if (s?.length) seguir.current = s; setHechos(h => h.map((v, j) => (j === i ? true : v))); }} />
      ))}
    </div>
  );
}

/** Un ataque (o el daño de una acción): objetivo, el d20 (natural, el bono se suma solo) contra su CA, lo que se suma al acertar y el daño. */
function GolpeAccion({ i, n, x, a, blancos, obj, hecho, danar, alHecho }: { i: number; n: number; x: any; a: any; blancos: any[]; obj: string; hecho: boolean; danar: (a: any, dano: number, k?: string) => Promise<boolean>; alHecho: (seguir?: Extra[]) => void }) {
  const [k, setK] = useState<string | null>(null), [nat, setNat] = useState(''), [dados, setDados] = useState(''), [advElegida, setAdv] = useState<number | null>(null), [cerca, setCerca] = useState(true);
  const [sel, setSel] = useState<Record<string, string>>({}), [valX, setValX] = useState<Record<string, string>>({});
  const kElegido = k ?? obj, elegido = blancos.find((y: any) => y.k === kElegido);
  const nombreGolpe = n > 1 ? `${a.atk != null ? 'Ataque' : 'Golpe'} ${i + 1} de ${n}` : '';
  const atkExpr = a.atk != null ? `1d20${modStr(a.atk)}` : '';
  // Contra alguien paralizado (o inconsciente, aturdido…) se ataca con ventaja, y a 5 pies el golpe es crítico
  const contra = contraObjetivo(elegido ? (campActual()?.estado?.[elegido.k]?.cond || []) : []);
  const adv = advElegida ?? (contra.ventaja ? 1 : 0);
  const critico = nat === '20' || (!!contra.critCerca && cerca && nat !== '' && nat !== '1');
  const dexpr = (a.dano || []).map((d: any) => d.d).join('+');
  const conDados = !!dexpr && partesTirada(dexpr).conDados;
  const total = atkExpr ? totalTirada(atkExpr, nat) : null;
  const acierta = total == null || !elegido ? null : nat === '20' || (nat !== '1' && total >= elegido.ca);
  // Lo que se suma al acertar (Castigo divino, Frío de Escarcha…): una opción por grupo, con sus dados
  const grupos = gruposExtras(a.extras || []);
  const extras = grupos.map(g => g.opciones.find(o => o.nombre === sel[g.base])).filter(Boolean) as Extra[];
  const extraDano = nat === '1' ? 0 : extras.reduce((t, e) => t + Math.max(0, totalTirada(e.expr, valX[e.nombre] || '', !!acierta && critico) ?? 0), 0);
  const base = !dexpr ? null : conDados ? totalTirada(dexpr, dados, !!acierta && critico) : partesTirada(dexpr).mod;
  const dano = base == null ? null : base + extraDano;
  const salvPrimero = a.atk == null && !!efectoSalvacion(a);
  const aplicar = async (cuanto: number) => {
    const conExtras = extras.length ? { ...a, n: `${a.n} + ${extras.map(e => e.nombre).join(' y ')}` } : a;
    if (await danar(conExtras, cuanto, kElegido)) {
      if (extras.length) avisar(`Descuenta ${extras.map(e => e.nombre).join(' y ')} en la hoja de ${x.nombre}.`);
      alHecho((a.extras || []).filter((e: Extra) => e.atk));
    }
  };
  // Al acertar, un aviso celeste con lo que se puede sumar al daño (una vez por ataque, cuando el d20 ya quedó escrito)
  const sumables = grupos.filter(g => !sel[g.base]);
  const [visto, setVisto] = useState(false), [estable, setEstable] = useState(false);
  useEffect(() => { if (acierta !== true) return; const t = setTimeout(() => setEstable(true), 900); return () => { clearTimeout(t); setEstable(false); }; }, [acierta, nat]);
  if (hecho) return <p className="m-0 rounded-lg bg-surface p-2 font-bold text-pas">{nombreGolpe ? `${nombreGolpe}: ` : ''}listo{elegido ? ` (${elegido.nombre})` : ''}.</p>;
  return (
    <div className="grid gap-2 rounded-lg bg-surface p-2">
      <PopupGrande abierto={estable && !visto && sumables.length > 0} tono="seguimiento" titulo="¡Acertó!" texto={`${x.nombre} puede sumarle al daño${elegido ? ` contra ${elegido.nombre}` : ''}:`}>
        <ul className="m-0 grid list-none gap-2 p-0">
          {sumables.map(g => (
            <li key={g.base} className="rounded-2xl bg-surface p-4 ring-1 ring-rea">
              <b>{g.base}</b><span className="block text-sm text-muted">{g.opciones[0].expr} de daño extra{g.t === 'adicional' ? ' · gasta su acción adicional' : g.t === 'pasiva' ? ' · pasiva' : ''}.</span>
              <Boton variante="primario" className="mt-2 min-h-12" onClick={() => { setSel(y => ({ ...y, [g.base]: g.opciones[0].nombre })); setVisto(true); }}>Sumarlo</Boton>
            </li>
          ))}
        </ul>
        <Boton className="min-h-14 text-lg" onClick={() => setVisto(true)}>Seguir sin sumar</Boton>
      </PopupGrande>
      {nombreGolpe && <p className="m-0 font-serif text-lg font-extrabold">{nombreGolpe}</p>}
      {n > 1 && (
        <label className="flex flex-wrap items-center gap-2 font-bold">Objetivo
          <select value={kElegido} onChange={e => setK(e.target.value)} className={cx(claseCampo, 'min-h-9! w-auto! min-w-40')}>
            <option value="">Elige…</option>
            {blancos.map((y: any) => <option key={y.k} value={y.k}>{y.nombre} (CA {y.ca})</option>)}
          </select>
        </label>
      )}
      {atkExpr && (
        <div className="grid gap-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-muted">1. Ataque</span>
            <select aria-label={`Ventaja en ${a.n}`} value={adv} onChange={e => setAdv(+e.target.value)} className={cx(claseCampo, 'min-h-9! w-auto! text-sm')}>
              <option value={0}>Normal</option><option value={1}>Con ventaja</option><option value={-1}>Con desventaja</option>
            </select>
          </div>
          {contra.ventaja && <p className="m-0 text-sm font-bold text-adi">{elegido?.nombre} está {contra.ventaja}: el ataque va con ventaja.</p>}
          {contra.critCerca && (
            <label className="flex min-h-9 items-center gap-2 text-sm"><input type="checkbox" checked={cerca} onChange={e => setCerca(e.target.checked)} className="size-4" />
              Ataca a 5 pies o menos: si acierta, es crítico</label>
          )}
          <CampoTirada tipo="ataque" expr={atkExpr} valor={nat} alCambiar={setNat} adv={adv} claseInput={claseCampo}
            etiqueta={`${x.nombre}: ${a.n}${nombreGolpe ? ` (${nombreGolpe.toLowerCase()})` : ''}${elegido ? ` contra ${elegido.nombre} (CA ${elegido.ca})` : ''}`} />
          {total != null && (elegido
            ? <p className={cx('m-0 font-bold', acierta ? 'text-pas' : 'text-acc')}>{total} contra CA {elegido.ca}: {acierta ? (critico ? 'acierta con crítico' : 'acierta') : 'falla, no hace daño'}.</p>
            : <p className="m-0 text-muted">Elige el objetivo para saber si acierta.</p>)}
          {acierta === false && <Boton tamano="sm" className="justify-self-start" onClick={() => alHecho()}>{n > 1 ? 'Falló: pasar al siguiente' : 'Falló: terminar'}</Boton>}
        </div>
      )}
      {dexpr && acierta !== false && (
        <div className="grid gap-1">
          <span className="text-xs font-bold uppercase tracking-wide text-muted">{atkExpr ? '2. Daño' : a.cd != null ? 'Daño (si falla la salvación)' : 'Daño'}</span>
          {atkExpr && grupos.length > 0 && acierta && (
            <div className="grid gap-1 rounded-lg bg-soft p-2">
              <span className="font-bold">Puedes sumarle al acertar</span>
              {grupos.map(g => (
                <label key={g.base} className="grid gap-1 text-sm">
                  <span>{g.base}{g.t === 'adicional' ? ' (gasta su acción adicional)' : g.t === 'pasiva' ? ' (pasiva)' : ''}</span>
                  <select value={sel[g.base] || ''} onChange={e => setSel(y => ({ ...y, [g.base]: e.target.value }))} className={cx(claseCampo, 'min-h-9! text-sm')}>
                    <option value="">No</option>
                    {g.opciones.map(o => <option key={o.nombre} value={o.nombre}>{o.nombre === g.base ? 'Sí' : o.nombre.slice(g.base.length + 1)}: {o.expr}{o.requiere === 'ventaja' ? ' (con ventaja o un aliado junto al objetivo)' : ''}</option>)}
                  </select>
                </label>
              ))}
            </div>
          )}
          {conDados
            ? <CampoTirada tipo="dano" expr={dexpr} valor={dados} alCambiar={setDados} crit={!!acierta && critico} claseInput={claseCampo} etiqueta={`${x.nombre}: ${a.n} (daño${elegido ? ` a ${elegido.nombre}` : ''})`} />
            : <p className="m-0">Daño fijo: <b>{base}</b>.</p>}
          {extras.map(e => (
            <div key={e.nombre} className="grid gap-1 border-l-2 border-gol pl-2">
              <span className="font-bold">{e.nombre}</span>
              <CampoTirada tipo="dano" expr={e.expr} valor={valX[e.nombre] || ''} alCambiar={v => setValX(y => ({ ...y, [e.nombre]: v }))} crit={!!acierta && critico} claseInput={claseCampo} etiqueta={`${e.nombre} (${a.n})`} />
            </div>
          ))}
          {dano != null && (
            <div className="flex flex-wrap gap-2">
              <Boton tamano="sm" variante="primario" onClick={() => aplicar(Math.max(0, dano))}>
                {salvPrimero ? `Pedir salvación (${Math.max(0, dano)} de daño si falla)` : `Aplicar ${Math.max(0, dano)} de daño${elegido ? ` a ${elegido.nombre}` : ''}`}
              </Boton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** Lo primero al empezar un combate: la iniciativa de cada uno, escrita a mano o tirada en la app. */
function TirarIniciativas({ cp }: { cp: any }) {
  const tirar = useDados();
  const lista = participantes(cp);
  const [vals, setVals] = useState<Record<string, string>>({});
  const poner = (k: string, v: string) => setVals(x => ({ ...x, [k]: v }));
  const faltan = lista.filter((x: any) => (vals[x.k] ?? '') === '');
  const tirarFaltan = () => setVals(x => ({ ...x, ...Object.fromEntries(faltan.map((y: any) => [y.k, String(rnd(20) + y.bono)])) }));
  const empezar = () => {
    const fijas = Object.fromEntries(Object.entries(vals).filter(([, v]) => v.trim() !== '').map(([k, v]) => [k, Math.round(+v || 0)]));
    conCamp(c => { iniciarCombate(c, fijas); });
    S.iniPendiente = null; render(); irArriba();
    avisar(faltan.length ? `Combate empezado. ${faltan.length === 1 ? 'Una iniciativa vacía se tiró sola' : `${faltan.length} iniciativas vacías se tiraron solas`}.` : 'Combate empezado.');
  };
  const cancelar = () => { S.iniPendiente = null; render(); };
  return (
    <Seccion titulo="Tirar iniciativas" descripcion="Escribe el total de cada uno (el d20 más su bono) o tócale el d20 para tirarlo en la app. Las que dejes vacías se tiran solas al empezar.">
      <Lista etiqueta="Iniciativas">
        {lista.length ? lista.map((x: any) => (
          <Fila key={x.k}>
            <span className="min-w-0 flex-1">
              <b className="block">{x.nombre}</b>
              <span className="text-sm text-muted">{x.tipo === 'm' ? (x.m.aliado ? 'Compañero' : 'Enemigo') : 'Jugador'} · tira 1d20 {x.bono < 0 ? '−' : '+'} {Math.abs(x.bono)}</span>
            </span>
            <span className="flex items-center gap-2">
              <label className="sr-only" htmlFor={`ini0-${x.k}`}>Iniciativa de {x.nombre}</label>
              <input id={`ini0-${x.k}`} type="number" inputMode="numeric" placeholder="Total" value={vals[x.k] ?? ''} onChange={e => poner(x.k, e.target.value)}
                className={cx(claseCampo, 'w-20! px-1 text-center font-serif text-xl font-bold')} />
              <Boton tamano="sm" aria-label={`Tirar iniciativa de ${x.nombre}`}
                onClick={() => tirar(`1d20${modStr(x.bono)}`, `Iniciativa de ${x.nombre}`, { noRepeat: true }).then(r => poner(x.k, String(r.total)))}>
                <Simbolo n="casino" />d20
              </Boton>
            </span>
          </Fila>
        )) : <Fila><span className="text-sm text-muted">No hay nadie en el combate todavía.</span></Fila>}
      </Lista>
      <div className="mt-4 flex flex-wrap gap-2">
        <Boton variante="primario" disabled={!lista.length} onClick={empezar}>Empezar combate</Boton>
        {faltan.length > 0 && <Boton onClick={tirarFaltan}>Tirar las que faltan ({faltan.length})</Boton>}
        <Boton variante="fantasma" onClick={cancelar}>Cancelar</Boton>
      </div>
    </Seccion>
  );
}

function Combate({ cp, grupo }: { cp: any; grupo: any[] }) {
  const tirar = useDados();
  const cb = cp.combate;
  const vivo = useEconomiaVivo(cp.id, !!cb.activo), economia = vivo.eco;
  /** Quita un enemigo del combate. Con `huyo`, en un combate de la sesión queda anotado con sus PG por si vuelve en otro. */
  const quitarMon = (id: string, huyo = false) => conCamp(c => {
    const m = c.monstruos.find((x: any) => x.id === id);
    if (huyo && m && c.combate.activo && c.encuentroActual && m.pg > 0 && !m.aliado) c.huidos = [...(c.huidos || []), m];
    c.monstruos = c.monstruos.filter((x: any) => x.id !== id); c.combate.orden = (c.combate.orden || []).filter((o: any) => o.k !== 'm:' + id);
  });
  if (!cb.activo) {
    if (S.iniPendiente === cp.id) return <TirarIniciativas cp={cp} />;
    const empezar = () => {
      conCamp(c => { c.encuentroActual = null; });
      S.iniPendiente = cp.id; render(); irArriba();
    };
    return (
      <>
        <p className="mt-2">Al empezar, escribes la iniciativa de cada uno o la tiras en la app, y el orden se arma solo. Después puedes corregir cualquier valor.</p>
        <Seccion titulo="Enemigos">
          <Lista>{cp.monstruos.length ? cp.monstruos.map((m: any) => (
            <Fila key={m.id}><span>{m.nombre} <span className="text-sm text-muted">CA {m.ca}, {m.pg}/{m.pgMax} PG, iniciativa {sign(m.bono)}</span></span>
              <Boton tamano="sm" onClick={() => quitarMon(m.id)} aria-label={`Quitar ${m.nombre}`}>Quitar</Boton>
              {m.ref && <VerBloque cp={cp} r={m.ref} nombre={m.nombre} />}</Fila>
          )) : <Fila><span className="text-sm text-muted">Sin enemigos todavía.</span></Fila>}</Lista>
          <FormEnemigos abierto cp={cp} />
        </Seccion>
        <Boton variante="primario" className="mt-4" disabled={!(grupo.length || unidosDe(cp.id).length || cp.monstruos.length)} onClick={empezar}>Empezar combate</Boton>
      </>
    );
  }
  quitarDelOrdenLosQueNoEstan(cb, cp);
  const actual = cb.orden[cb.turno];
  // Jugadores que se unieron con el código después de tirar iniciativa, o que el DM sacó del combate
  const nuevos = [...cp.pjs.map((id: string) => 'pj:' + id), ...unidosDe(cp.id).map(claveUnido)].filter(k => !cb.orden.some((o: any) => o.k === k) && combatiente(k, cp));
  /** Saca a un jugador del orden de iniciativa; sigue en la campaña y puede volver con «Sumar». */
  const sacarJugador = async (x: any) => {
    if (!(await confirmar({ titulo: `¿Quitar a ${x.nombre} del combate?`, texto: 'Sigue en la campaña; puedes volver a sumarlo con el botón de arriba.', si: 'Quitar del combate' }))) return;
    conCamp(c => { c.combate.orden = c.combate.orden.filter((o: any) => o.k !== x.k); });
    avisar(`${x.nombre} salió del combate.`);
  };
  const sumarNuevos = () => conCamp(c => {
    for (const k of nuevos) { const x = combatiente(k, c); if (x) { c.combate.orden.push({ k, init: rnd(20) + x.bono, bono: x.bono }); sumarCompaneros(c, k, rnd); } }
    ordenar(c);
  });
  /** Antes de pasar de turno, quien termina el suyo repite las salvaciones que lo libran de una condición: si las tira el
      DM, la ventana amarilla no deja seguir hasta resolverlas, y después el turno pasa solo. */
  const siguiente = () => {
    const termina = cb.orden[cb.turno]?.k, y = termina ? combatiente(termina, cp) : null;
    const reps = y && y.tipo !== 'jug' ? repeticionesDe(cp.estado?.[termina]) : [];
    if (!reps.length) { avanzar(); return; }
    let quedan = reps.length;
    for (const { cond, r } of reps) {
      const ns = NOMBRE_SALV[r.salv] || r.salv;
      pedirSalvDm({ id: `${cp.id}|${cb.ronda}|${cb.turno}|${termina}|${cond}`, campId: cp.id, k: termina, salv: r.salv, cd: r.cd,
        titulo: `${y.nombre} termina su turno: repite la salvación de ${ns} CD ${r.cd}`, detalle: `Si la supera, se libra de ${cond} (${r.de}).`,
        resolver: supero => { resolverRepeticion({ id: cond, campId: cp.id, k: termina, cond, ...r }, supero); if (--quedan === 0) avanzar(); } });
    }
  };
  const avanzar = () => {
    let pendientes: { k: string; cond: string; r: Repite }[] = [];
    conCamp(c => {
      const b = c.combate; if (!b.orden.length) return false;
      // Un jugador unido que termina su turno repite en su pantalla las salvaciones que lo libran de una condición
      const termina = b.orden[b.turno]?.k;
      if (termina && combatiente(termina, c)?.tipo === 'jug') pendientes = repeticionesDe(c.estado?.[termina]).map(x => ({ k: termina, ...x }));
      b.turno++; if (b.turno >= b.orden.length) { b.turno = 0; b.ronda++; }
      // Las condiciones con duración se descuentan solas y se quitan al terminar
      for (const e of Object.values(c.estado || {}) as any[]) for (const [n, h] of Object.entries(e?.hasta || {})) if (e.dur) e.dur[n] = textoRestante(h as Hasta, b);
      const fin = vencerCondiciones(c.estado, b, k => combatiente(k, c)?.nombre || k);
      if (fin.length) avisar(`Se acabó: ${fin.join('; ')}.`);
      // Si la condición se acabó sola en este mismo paso, ya no hay nada que repetir
      pendientes = pendientes.filter(p => c.estado?.[p.k]?.cond?.includes(p.cond));
      // A quien le toca y no puede actuar (paralizado, inconsciente…) pierde el turno
      const empieza = b.orden[b.turno]?.k, incap = empieza ? incapacidad(c.estado?.[empieza]?.cond) : null;
      if (incap) avisar(`${combatiente(empieza, c)?.nombre || 'Le toca a alguien que'} está ${incap.cond}: pierde el turno. ${incap.porque}`, 'aviso');
    });
    for (const p of pendientes) {
      const y = combatiente(p.k, campActual() || cp); if (y?.tipo !== 'jug') continue;
      pedirSalvacionDm(cp.id, y.u.personajeId, { de: p.r.de, salv: p.r.salv, cd: p.r.cd, dano: 0, mitad: false, condicion: p.cond, nota: `librarte de ${p.cond}`, librarse: true })
        .then(() => avisar(`${y.nombre} repite su salvación contra ${p.cond} en su pantalla.`)).catch(e => avisar(`No se pudo pedir la salvación a ${y.nombre}: ${(e as Error).message}`, 'error'));
    }
  };
  const terminar = async () => {
    const quitar = cp.monstruos.length > 0 && await confirmar({ titulo: '¿Quitar también a los enemigos?', texto: 'El combate termina igual; puedes dejarlos para el siguiente.', si: 'Quitarlos', no: 'Dejarlos' });
    conCamp(c => { guardarSobrevivientes(c); c.combate = { activo: false, ronda: 1, turno: 0, orden: [] }; if (quitar) c.monstruos = []; });
  };
  const fijarInit = (k: string, v: number) => conCamp(c => { const o = c.combate.orden.find((o: any) => o.k === k); if (!o) return false; o.init = v; ordenar(c); });
  return (
    <>
      <div className="sticky top-[calc(var(--alto-cabecera,0px)+3.75rem)] z-[5] -mx-4 mt-2 flex flex-wrap items-center gap-2 bg-bg px-4 py-2 backdrop-blur">
        <p className="m-0 flex-1" aria-live="polite">Ronda {cb.ronda}. Turno de <b>{(actual && combatiente(actual.k, cp)?.nombre) || '—'}</b>.</p>
        {nuevos.length > 0 && <Boton onClick={sumarNuevos}>Sumar {nuevos.length === 1 ? `a ${combatiente(nuevos[0], cp)?.nombre}` : `a ${nuevos.length} jugadores`}</Boton>}
        {hayQueDeshacer(cp.id) && <Boton onClick={() => deshacer()}>↶ Deshacer</Boton>}
        <details className="w-full">
          <summary className={cx('inline-flex min-h-11 cursor-pointer list-none items-center gap-1 rounded-lg bg-soft px-3 text-sm font-bold text-ink ring-1 ring-inset ring-muted/60 hover:bg-rule/60 sm:min-h-9 [&::-webkit-details-marker]:hidden', foco)}><Simbolo n="bedtime" />Descansos e inspiración</summary>
          <div className="mt-1 flex flex-wrap gap-2">
            <Boton tamano="sm" onClick={() => mandarOrden(cp.id, 'corto')}>Descanso corto</Boton>
            <Boton tamano="sm" onClick={() => mandarOrden(cp.id, 'largo')}>Descanso largo</Boton>
            <Boton tamano="sm" onClick={() => mandarOrden(cp.id, 'inspiracion')}>Inspiración a todos</Boton>
          </div>
          <p className="m-0 mt-1 text-xs text-muted">Cada hoja lo aplica sola cuando su jugador la tiene abierta.</p>
        </details>
        <Boton variante="primario" onClick={siguiente}>Siguiente turno</Boton>
        <Boton onClick={terminar}>Terminar combate</Boton>
      </div>
      <RespuestasSalvacion campId={cp.id} respuestas={vivo.respuestas} />
      <PopupSalvacion cp={cp} salvs={vivo.salvs} />
      {vivo.golpes.filter(g => !golpesAplicados.has(g.id) && !combatiente(g.objetivo, cp)).map(g => (
        <Aviso key={g.id} tipo="aviso" titulo={`${g.de} actuó sobre alguien que ya no está`} accion={<Boton tamano="sm" onClick={() => descartarGolpe(cp.id, g)}>Descartar</Boton>}>{g.nota || 'Sin detalle.'}</Aviso>
      ))}
      <ol className="m-0 mt-2 grid list-none gap-2 p-0" aria-label="Orden de iniciativa">
        {cb.orden.map((o: any, i: number) => {
          const x = combatiente(o.k, cp); if (!x) return null;
          const caido = x.pg <= 0, esTurno = i === cb.turno;
          return (
            <Tarjeta as="li" key={o.k} aria-current={esTurno ? 'step' : undefined}
              className={cx('border-l-4', x.tipo === 'm' ? 'border-acc' : 'border-rea', esTurno && 'ring-[3px]! ring-adi!', caido && 'opacity-60')}>
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-1">
                  <label className="sr-only" htmlFor={`ini-${o.k}`}>Iniciativa de {x.nombre}</label>
                  <input id={`ini-${o.k}`} key={o.init} type="number" defaultValue={o.init} className={cx(claseCampo, 'w-16! px-1 text-center font-serif text-xl font-bold')}
                    onBlur={e => { if (+e.target.value !== o.init) fijarInit(o.k, +e.target.value || 0); }} onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }} />
                  <button type="button" aria-label={`Tirar iniciativa de ${x.nombre}`} onClick={() => tirar(`1d20${modStr(x.bono)}`, `Iniciativa de ${x.nombre}`, { noRepeat: true }).then(r => fijarInit(o.k, r.total))}
                    className={cx('min-h-9 cursor-pointer rounded-lg bg-soft px-2 text-sm font-bold hover:bg-rule/70', foco)}>d20</button>
                </div>
                <div className="min-w-0 flex-1">
                  {esTurno && <span className="mb-0.5 inline-block rounded-full bg-adi px-2 text-xs font-extrabold text-bg">Turno actual</span>}
                  <b className="block font-serif text-lg">{x.nombre}</b>
                  <span className="block text-sm text-muted">CA {x.ca}{x.tipo === 'm' ? (x.m.aliado ? ', compañero' : ', enemigo') : `, percepción pasiva ${x.c.passive}`}{x.tipo === 'jug' ? `, juega ${x.jugador}` : ''}{caido ? ', caído' : ''}</span>
                </div>
                {x.tipo !== 'm' ? <div className="flex flex-wrap justify-end gap-2">
                  {x.tipo === 'pj' ? <Boton tamano="sm" onClick={() => abrir(x.pj.id)}>Hoja</Boton>
                    : <Boton tamano="sm" onClick={() => verHoja(x.k)} aria-label={`Ver la hoja de ${x.nombre}`}>Hoja</Boton>}
                  <Boton tamano="sm" onClick={() => sacarJugador(x)} aria-label={`Quitar a ${x.nombre} del combate`}>Quitar</Boton>
                </div>
                  : <div className="flex flex-wrap justify-end gap-2">
                      {cp.encuentroActual && !x.m.aliado && !caido && <Boton tamano="sm" onClick={() => { quitarMon(x.m.id, true); avisar(`${x.nombre} huyó con ${x.m.pg} PG: volverá así en el combate que lo traiga.`); }}
                        aria-label={`${x.nombre} huyó`}>Huyó</Boton>}
                      <Boton tamano="sm" onClick={() => quitarMon(x.m.id)} aria-label={`Quitar ${x.nombre}`}>Quitar</Boton>
                    </div>}
              </div>
              <AccionesRonda cp={cp} x={x} campId={cp.id} clave={x.tipo === 'jug' ? x.u.personajeId : x.k} nombre={x.nombre} eco={economia[x.tipo === 'jug' ? x.u.personajeId : x.k]} />
              {x.tipo === 'jug' && <Boton tamano="sm" className="mt-1" onClick={() => mandarOrden(cp.id, 'inspiracion', x.u.personajeId)}>Dar inspiración a {x.nombre}</Boton>}
              {x.tipo === 'jug' && vivo.ultimas?.[x.u.personajeId] && <p className="m-0 mt-1 rounded-xl bg-soft p-2 text-sm"><b>Última acción:</b> {vivo.ultimas[x.u.personajeId].nombre}{vivo.ultimas[x.u.personajeId].resumen ? ` · ${vivo.ultimas[x.u.personajeId].resumen}` : ''}</p>}
              <GolpesPendientes cp={cp} k={x.k} nombre={x.nombre} golpes={vivo.golpes} />
              {x.tipo === 'm' && !x.m.aliado && <InfoParaJugadores cp={cp} x={x} peticiones={vivo.peticiones} />}
              {x.tipo === 'jug' && <details className="mt-1"><summary className={cx('inline-flex min-h-11 cursor-pointer list-none items-center gap-1 rounded-lg bg-soft px-3 text-sm font-bold text-ink ring-1 ring-inset ring-muted/60 hover:bg-rule/60 sm:min-h-9 [&::-webkit-details-marker]:hidden', foco)}><Simbolo n="description" />Hoja resumida</summary><Pasivas x={x} /></details>}
              <PuntosGolpe cp={cp} x={x} /><Muerte cp={cp} x={x} /><Condiciones cp={cp} k={x.k} nombre={x.nombre} />
              {x.tipo === 'm' && x.m.ref && <VerBloque cp={cp} r={x.m.ref} nombre={x.nombre} />}
            </Tarjeta>
          );
        })}
      </ol>
      <FormEnemigos abierto={false} cp={cp} />
    </>
  );
}

/* Cambios de campaña y de la vista: fuera de los componentes, que solo los llaman */
/** El combate solo lista a quienes siguen en la campaña. */
function quitarDelOrdenLosQueNoEstan(cb: any, cp: any) {
  // Mientras no se lean los jugadores unidos no se sabe si siguen: se conservan
  const sigue = (o: any) => (o.k.startsWith('jm:') && !unidosCargados(cp.id)) || !!combatiente(o.k, cp);
  // El turno sigue en la misma persona (o pasa a la siguiente si la que actuaba ya no está)
  const antes = cb.orden.slice(0, cb.turno).filter(sigue).length;
  cb.orden = cb.orden.filter(sigue);
  cb.turno = antes < cb.orden.length ? antes : 0;
}
/** La campaña abierta, con sus valores por defecto; null si no hay (o ya no existe). */
function campanaAbierta() {
  const cp = S.camp ? campActual() : null;
  if (!cp) { S.camp = null; return null; }
  cp.combate = cp.combate || { activo: false, ronda: 1, turno: 0, orden: [] }; cp.monstruos = cp.monstruos || [];
  return cp;
}
const mismoNombre = (a: string, b: string) => norm(a).trim() === norm(b).trim();
/** Los ids de campaña son "c-" + la hora de creación en base 36. */
function creadaEl(id: string) {
  const t = parseInt(String(id).replace(/^c-/, ''), 36);
  return t > 1.5e12 && t < 4e12 ? new Date(t).toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
}
function crearCampana(n: string) {
  if (!n) { avisar('Ponle nombre a la campaña.', 'aviso'); return; }
  // Dos mesas con el mismo nombre se confunden en la lista (y los jugadores quedan en la otra)
  if (camps().some(x => mismoNombre(x.nombre, n))) { avisar(`Ya tienes una campaña llamada «${n}». Ábrela desde la lista o ponle otro nombre a la nueva.`, 'aviso'); return; }
  const nueva = { id: 'c-' + Date.now().toString(36), nombre: n, pjs: [], monstruos: [], estado: {}, combate: { activo: false, ronda: 1, turno: 0, orden: [] } };
  guardarCamp(nueva); S.camp = nueva.id; S.mtab = 'grupo'; render();
}
function abrirCampana(id: string | null) { S.camp = id; S.hojaMesa = null; if (id) S.mtab = 'grupo'; render(); irArriba(); }
async function borrarCampana(cp: any) {
  if (!(await confirmar({ titulo: `¿Borrar la campaña ${cp.nombre}?`, texto: 'Los personajes no se borran.', si: 'Borrar campaña', peligro: true }))) return;
  almacen.borrarCampana(cp.id); S.camp = null; render(); avisar('Campaña borrada.');
}

export function MesaVista({ importarHojas }: { importarHojas: () => void }) {
  const idNueva = useId();
  const l = camps();
  const cp = campanaAbierta();
  if (!cp) {
    const crear = () => crearCampana(val(idNueva).trim());
    return (
      <>
        <EncabezadoPagina id="titulo-vista" titulo="Mesa del DM" subtitulo="Junta las hojas de tu grupo en una campaña para ver PG, CA y pasivas de un vistazo, y llevar el combate: iniciativa, daño y condiciones." />
        {l.length > 0 && (
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 p-0">
            {l.map(cp => {
              const info = almacen.infoMesa(cp.id), copias = cp.pjs.length;
              // Con dos campañas del mismo nombre, la fecha de creación es lo que las distingue
              const repetida = l.some(o => o.id !== cp.id && mismoNombre(o.nombre, cp.nombre));
              const detalle = [
                `${info.unidos} jugador${info.unidos === 1 ? '' : 'es'} unido${info.unidos === 1 ? '' : 's'}`,
                copias ? `${copias} copia${copias === 1 ? '' : 's'}` : '',
                cp.combate?.activo ? 'en combate' : '',
              ].filter(Boolean).join(' · ');
              return (
                <li key={cp.id} className="flex">
                  <button type="button" onClick={() => abrirCampana(cp.id)}
                    className={cx('flex min-h-24 w-full cursor-pointer flex-col justify-center gap-0.5 rounded-2xl bg-surface p-4 text-left shadow-sm ring-1 ring-rule/60 hover:shadow-md', foco)}>
                    <b className="font-serif text-xl">{cp.nombre}</b>
                    <span className="text-sm text-muted">{detalle}</span>
                    {(info.codigo || repetida) && (
                      <span className="text-sm text-muted">
                        {info.codigo && <>Código <span className="font-mono font-bold tracking-wider text-ink">{info.codigo}</span></>}
                        {info.codigo && repetida && creadaEl(cp.id) ? ' · ' : ''}{repetida && creadaEl(cp.id) ? `creada el ${creadaEl(cp.id)}` : ''}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <Seccion titulo="Nueva campaña">
          <div className="flex flex-wrap items-end gap-2" key={l.length}>
            <Campo etiqueta="Nombre" className="min-w-60 flex-1"><input id={idNueva} type="text" placeholder="La Costa Rota" className={claseCampo} onKeyDown={e => { if (e.key === 'Enter') crear(); }} /></Campo>
            <Boton variante="primario" onClick={crear}>Crear campaña</Boton>
          </div>
        </Seccion>
        <SubirHomebrewery />
      </>
    );
  }
  return <Campana key={cp.id} cp={cp} importarHojas={importarHojas} />;
}

/** Lo que se exporta de la mesa: primero los jugadores unidos con el código, luego las copias del DM. */
function paraExportar(unidos: any[], grupo: any[]): PersonajeExportado[] {
  return [
    ...unidos.map(x => ({ datos: x.u.datos, c: x.c, jugador: x.jugador, origen: 'unido' as const, actualizadoEn: x.u.actualizadoEn })),
    ...grupo.map(x => ({ datos: x.pj, c: x.c, jugador: x.pj.jugador || '', origen: 'copia' as const })),
  ];
}

function Exportar({ cp, unidos, grupo }: { cp: any; unidos: any[]; grupo: any[] }) {
  const base = slug(cp.nombre || 'mesa');
  /* Los jugadores unidos se vuelven a leer al exportar: si la lista todavía no había llegado (o falló), el archivo
     salía sin sus hojas y sin avisar */
  const bajar = async (fn: (l: PersonajeExportado[]) => void) => {
    let actuales = unidos;
    try {
      fijarUnidos(cp.id, await jugadoresMesa(cp.id));
      actuales = unidosDe(cp.id).map(u => combatiente(claveUnido(u), cp)).filter(Boolean);
    } catch (e) {
      if (!unidosCargados(cp.id)) { avisar(`No se pudieron leer las hojas de los jugadores: ${(e as Error).message}. Inténtalo de nuevo.`, 'error'); return; }
    }
    fn(paraExportar(actuales, grupo));
  };
  return (
    <Seccion titulo="Exportar">
      <Nota>Descarga la mesa con las hojas de todos los personajes tal como están ahora. El resumen se lee en cualquier editor de texto; los datos completos sirven de respaldo.</Nota>
      <div className="flex flex-wrap gap-2">
        <Boton onClick={() => bajar(l => bajarArchivo(base + '-resumen.md', resumenMesa(cp.nombre, l) + '\n', 'text/markdown'))}>Descargar resumen</Boton>
        <Boton variante="fantasma" onClick={() => bajar(l => bajarArchivo(base + '.json', JSON.stringify(datosMesa(cp, l), null, 1)))}>Descargar datos completos</Boton>
      </div>
    </Seccion>
  );
}

function Campana({ cp, importarHojas }: { cp: any; importarHojas: () => void }) {
  const mesa = useUnidos(cp.id);
  if (S.hojaMesa) return <HojaJugador cp={cp} k={S.hojaMesa} />;
  const unidos = unidosDe(cp.id).map(u => combatiente(claveUnido(u), cp)).filter(Boolean);
  const grupo = cp.pjs.map((id: string) => combatiente('pj:' + id, cp)).filter(Boolean);
  const total = grupo.length + unidos.length;
  const fuera = S.list.filter(p => !cp.pjs.includes(p.id));
  const encuentros: Encuentro[] = cp.encuentros || [];
  // Las pestañas viejas de cada combate ('enc-…') ahora son la pestaña Sesión
  const mtab = S.mtab?.startsWith('enc-') ? 'sesion' : ['bestiario', 'combate', 'sesion'].includes(S.mtab) ? S.mtab : 'grupo';
  const agregar = () => {
    const id = val('campAddSel');
    if (!id) { avisar('Elige un personaje.', 'aviso'); return; }
    conCamp(c => { if (!c.pjs.includes(id)) c.pjs.push(id); });
    avisar(`${S.list.find(p => p.id === id)?.name || 'Personaje'} agregado a la campaña.`);
  };
  const borrar = () => borrarCampana(cp);
  return (
    <>
      <EncabezadoPagina id="titulo-vista" titulo={cp.nombre} subtitulo={`${total} personaje${total === 1 ? '' : 's'}${unidos.length ? `, ${unidos.length} unido${unidos.length === 1 ? '' : 's'} con el código` : ''}. Condiciones e iniciativa quedan guardadas en la campaña.`}>
        <Boton variante="fantasma" onClick={() => abrirCampana(null)}>← Todas las campañas</Boton>
      </EncabezadoPagina>
      <Pestanas idBase="mesa" etiqueta="Secciones de la campaña" activa={mtab} onCambiar={k => { S.mtab = k; render(); }}
        items={[{ id: 'grupo', texto: 'Grupo' }, { id: 'sesion', texto: encuentros.length ? `Sesión · ${encuentros.length}` : 'Sesión' },
          { id: 'combate', texto: cp.combate.activo ? `Combate · ronda ${cp.combate.ronda}` : 'Combate' }, { id: 'bestiario', texto: 'Bestiario' }]} />
      <PanelPestana idBase="mesa" activa={mtab}>
        {mtab === 'grupo' ? (
          <>
            <CodigoMesa campId={cp.id} />
            <PortadaCampana cp={cp} />
            <div className="mb-0 mt-6 flex flex-wrap items-baseline justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="m-0 font-serif text-2xl font-bold">Jugadores en la mesa</h2>
                {mesa.enVivo && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 ring-1 ring-inset ring-emerald-500/20" title={`Sincronización en vivo activa vía ${mesa.transporte.toUpperCase()}`}>
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    En vivo ({mesa.transporte.toUpperCase()})
                  </span>
                )}
              </div>
              <Boton tamano="sm" variante="fantasma" onClick={() => mesa.leer()}>Actualizar</Boton>
            </div>
            {mesa.error && <Aviso tipo="error" titulo="No se pudieron leer las hojas de los jugadores" accion={<Boton tamano="sm" onClick={() => mesa.leer()}>Reintentar</Boton>}>{mesa.error}</Aviso>}
            {unidos.length
              ? <ul className="m-0 mt-2 grid list-none grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3 p-0">{unidos.map((x: any) => <TarjetaJugador key={x.k} cp={cp} x={x} alQuitar={() => mesa.leer()} />)}</ul>
              : !mesa.error && <Nota className="mt-2">{mesa.cargando ? 'Buscando jugadores…' : 'Nadie se ha unido todavía. Cuando un jugador escriba el código, su personaje aparece aquí solo.'}</Nota>}
            {unidos.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Boton tamano="sm" onClick={() => mandarOrden(cp.id, 'corto')}>Descanso corto para todos</Boton>
                <Boton tamano="sm" onClick={() => mandarOrden(cp.id, 'largo')}>Descanso largo para todos</Boton>
                <Boton tamano="sm" onClick={() => mandarOrden(cp.id, 'inspiracion')}>Inspiración a todos</Boton>
              </div>
            )}
            <h2 className="mb-0 mt-6 font-serif text-2xl font-bold">Tus copias de personajes</h2>
            {grupo.length
              ? <ul className="m-0 mt-2 grid list-none grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3 p-0">{grupo.map((x: any) => <TarjetaPj key={x.k} cp={cp} x={x} />)}</ul>
              : <Nota className="mt-2">Personajes guardados en tu cuenta (PNJ, o respaldos importados). Para jugadores con cuenta es mejor el código de arriba.</Nota>}
            <Seccion titulo="Agregar personajes">
              {fuera.length > 0 ? (
                <div className="flex flex-wrap items-end gap-2" key={cp.pjs.length}>
                  <Campo etiqueta="Tus personajes que no están en la campaña" className="min-w-60 flex-1">
                    <select id="campAddSel" defaultValue="" className={claseCampo}>
                      <option value="" disabled>Elige un personaje…</option>
                      {fuera.map(p => <option key={p.id} value={p.id}>{p.name}{p.sub ? ` (${p.sub})` : ''}</option>)}
                    </select>
                  </Campo>
                  <Boton variante="primario" onClick={agregar}>Agregar</Boton>
                </div>
              ) : <Nota>Todos tus personajes ya están en esta campaña.</Nota>}
              <Nota className="mt-4">Pide a cada jugador su respaldo (en su hoja: Descargar respaldo) e impórtalo aquí; se agrega solo a la campaña.</Nota>
              <Boton onClick={importarHojas}>Importar hojas de jugadores</Boton>
            </Seccion>
            <Exportar cp={cp} unidos={unidos} grupo={grupo} />
            <Seccion titulo="Zona de cuidado"><Boton variante="peligro" onClick={borrar}>Borrar campaña</Boton></Seccion>
          </>
        ) : mtab === 'bestiario' ? <VistaBestiario cp={cp} /> : mtab === 'sesion' ? <VistaSesion cp={cp} /> : <Combate cp={cp} grupo={grupo} />}
      </PanelPestana>
    </>
  );
}
