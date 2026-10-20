/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { S, render, irArriba } from '@/app-shell/estado';
import { Boton, Simbolo, cx, foco } from '@/shared/ui/kit';
import { PASO_N } from '../ficha/Ficha';
import { PasoClase, PasoEspecie, PasoTrasfondo } from './PasosOrigen';
import { PasoEquipo, PasoHabs, PasoStats } from './PasosAtributos';
import { PasoConjuros, PasoDetalles, PasoRasgos } from './PasosMagia';

const TODOS = Object.keys(PASO_N);
const irPaso = (k: string) => { S.step = k; S.sel = null; render(); irArriba(); };

/** Ícono de cada paso (Material Symbols, como en la hoja) */
const ICONO: Record<string, string> = {
  especie: 'groups', clase: 'swords', trasfondo: 'history_edu', stats: 'fitness_center', habs: 'format_list_bulleted',
  equipo: 'backpack', conjuros: 'auto_awesome', rasgos: 'bookmark', detalles: 'badge',
};

/** Pregunta grande de cada paso: dice qué se decide aquí, en palabras de jugador */
const PREGUNTA: Record<string, [string, string]> = {
  especie: ['¿De qué especie es?', 'La especie da rasgos de nacimiento: cómo ve, qué tan rápido se mueve y algún don especial.'],
  clase: ['¿Qué clase será?', 'La clase define cómo pelea y qué magia usa.'],
  trasfondo: ['¿Qué hacía antes de aventurar?', 'El trasfondo le da habilidades, una dote de origen y su equipo inicial.'],
  stats: ['¿En qué es bueno?', 'Reparte las seis características. El modificador es lo que se suma a tus tiradas.'],
  habs: ['¿Qué sabe hacer bien?', 'Las habilidades en las que eres competente suman tu bono de competencia a la tirada.'],
  equipo: ['¿Con qué sale a la aventura?', 'Tu clase y tu trasfondo te dan un equipo inicial, o el oro para comprarlo a tu gusto.'],
  conjuros: ['¿Qué magia prepara?', 'Cada vez que lanzas un conjuro gastas un espacio; los espacios vuelven al descansar.'],
  rasgos: ['¿Tiene algo único?', 'Opcional: regalos del DM, rasgos de homebrew o algo de su historia. Aparecen en la hoja junto a los demás.'],
  detalles: ['¿Quién es en realidad?', 'Dale cara e historia. Solo el nombre es necesario; lo demás lo puedes llenar después.'],
};

/** Lo elegido en cada paso, para mostrarlo bajo su nombre en la lista */
function elegido(k: string, pj: any, c: any): string {
  if (k === 'especie') return c.E ? (pj.especie?.key === 'custom' ? pj.especie.nombre || c.E.n : c.E.n) : '';
  if (k === 'clase') return c.C ? `${c.C.n} ${c.lvl}` : '';
  if (k === 'trasfondo') return c.T?.n || pj.trasfondo?.nombre || '';
  return '';
}

function MarcaPaso({ n, estado }: { n: number; estado: 'actual' | 'listo' | 'falta' | 'pendiente' }) {
  if (estado === 'listo') return <Simbolo n="check_circle" className="text-headline-sm text-pas" />;
  if (estado === 'actual') return <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-body-sm font-bold text-on-primary">{n}</span>;
  if (estado === 'falta') return <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center rounded-full bg-warn text-body-sm font-bold text-bg">!</span>;
  return <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center rounded-full border-[1.5px] border-outline-variant text-label-md font-bold text-outline">{n}</span>;
}

export function Editor({ c }: { c: any }) {
  const pj = S.pj;
  const PASOS = TODOS;
  const paso = PASOS.includes(S.step) ? S.step : 'habs', i = PASOS.indexOf(paso);
  const pend = new Set(c.avisos.filter((a: any) => a.nivel === 'aviso').map((a: any) => a.paso));
  const pasos: Record<string, ReactNode> = {
    especie: <PasoEspecie pj={pj} c={c} />, clase: <PasoClase pj={pj} c={c} />, trasfondo: <PasoTrasfondo pj={pj} c={c} />,
    stats: <PasoStats pj={pj} c={c} />, habs: <PasoHabs pj={pj} c={c} />, equipo: <PasoEquipo pj={pj} c={c} />,
    conjuros: <PasoConjuros pj={pj} c={c} />, rasgos: <PasoRasgos pj={pj} />, detalles: <PasoDetalles pj={pj} />,
  };
  const estado = (k: string, n: number) => k === paso ? 'actual' : pend.has(k) ? 'falta' : n < i ? 'listo' : 'pendiente';
  const listos = PASOS.filter(k => !pend.has(k)).length;
  const faltaAqui = pend.has(paso);
  const [pregunta, ayuda] = PREGUNTA[paso] || [PASO_N[paso], ''];

  // En el teléfono, la ficha del paso actual se centra en la tira (moviendo solo la tira, no la página)
  const tira = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const t = tira.current, b = t?.querySelector<HTMLElement>('[aria-current="step"]');
    if (t && b) t.scrollLeft = b.offsetLeft - t.clientWidth / 2 + b.offsetWidth / 2;
  }, [paso]);

  return (
    <>
      {/* Teléfono: progreso y pasos como fichas que se deslizan */}
      <div className="lg:hidden">
        <div className="flex items-baseline justify-between gap-2 pt-2">
          <b className="font-serif text-headline-sm text-primary [overflow-wrap:anywhere]">{pj.nombre || 'Nuevo personaje'}</b>
          <span className="shrink-0 text-body-sm text-outline">Paso {i + 1} de {PASOS.length} · Guardado</span>
        </div>
        <div aria-hidden="true" className="mt-2 h-1 overflow-hidden rounded-full bg-surface-container-high">
          <div className="h-full bg-primary transition-all" style={{ width: `${((i + 1) / PASOS.length) * 100}%` }} />
        </div>
        <nav aria-label="Pasos para crear el personaje" className="-mx-4 mt-3">
          <ol ref={tira} className="m-0 flex list-none items-center gap-1.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
            {PASOS.map((k, n) => {
              const e = estado(k, n);
              return (
                <li key={k} className="shrink-0">
                  <button type="button" onClick={() => irPaso(k)} aria-current={e === 'actual' ? 'step' : undefined}
                    className={cx('inline-flex min-h-9 cursor-pointer items-center gap-1 whitespace-nowrap rounded-full px-3 text-body-md', foco,
                      e === 'actual' ? 'bg-primary font-bold text-on-primary' : 'bg-surface-container text-on-surface-variant',
                      e === 'listo' && 'text-on-surface', e === 'falta' && 'text-warn')}>
                    {e === 'listo' ? <Simbolo n="check" className="text-body-lg text-pas" /> : e === 'falta' ? '!' : `${n + 1}.`} {PASO_N[k]}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      <div className="grid items-start gap-7 lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* Escritorio: tarjeta del personaje y lista de pasos */}
        <nav aria-label="Pasos para crear el personaje" className="sticky top-[calc(var(--alto-cabecera,64px)+16px)] hidden flex-col gap-3 pt-4 lg:flex">
          <div className="rounded-xl bg-surface-container p-4">
            <p className="m-0 text-label-caps uppercase tracking-wider text-outline">Tu personaje</p>
            <b className="block font-serif text-headline-md text-primary [overflow-wrap:anywhere]">{pj.nombre || 'Nuevo personaje'}</b>
            <span className="text-body-md text-on-surface-variant">{[elegido('especie', pj, c), elegido('clase', pj, c), elegido('trasfondo', pj, c)].filter(Boolean).join(' · ') || 'Empieza por la especie'}</span>
            <div aria-hidden="true" className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-container-high">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(listos / PASOS.length) * 100}%` }} />
            </div>
            <p className="m-0 mt-1 text-body-sm text-outline">Paso {i + 1} de {PASOS.length} · <span className="text-pas">Se guarda solo</span></p>
          </div>
          <ol className="m-0 flex list-none flex-col gap-0.5 p-0">
            {PASOS.map((k, n) => {
              const e = estado(k, n), sub = elegido(k, pj, c);
              return (
                <li key={k}>
                  <button type="button" onClick={() => irPaso(k)} aria-current={e === 'actual' ? 'step' : undefined}
                    className={cx('flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-1.5 text-left transition-colors', foco,
                      e === 'actual' ? 'bg-surface-container-high text-on-surface' : 'text-on-surface-variant hover:bg-surface-container')}>
                    <MarcaPaso n={n + 1} estado={e} />
                    <span className="flex min-w-0 flex-1 flex-col leading-tight">
                      <span className={cx('text-body-lg', e === 'actual' ? 'font-bold' : e === 'listo' && 'text-on-surface')}>{PASO_N[k]}</span>
                      {e === 'falta' ? <span className="text-body-sm text-warn">Falta algo</span> : sub && <span className="truncate text-body-sm text-outline">{sub}</span>}
                    </span>
                    <Simbolo n={ICONO[k] || 'circle'} className="text-body-lg text-outline" />
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <section aria-labelledby="titulo-vista" className="min-w-0 pt-4">
          <p className="m-0 text-label-caps uppercase tracking-wider text-secondary">Paso {i + 1} · {PASO_N[paso]}</p>
          <h1 id="titulo-vista" tabIndex={-1} className="mb-1 mt-1 font-serif text-[clamp(1.9rem,6vw,2.6rem)] font-bold leading-tight outline-none">{pregunta}</h1>
          {ayuda && <p className="m-0 mb-4 max-w-prose text-on-surface-variant">{ayuda}</p>}
          <div key={paso} className="pb-4">{pasos[paso]}</div>
        </section>
      </div>

      {/* Fija sobre la barra de abajo: con `sticky` flotaba a media pantalla en los pasos cortos y dejaba un hueco al final */}
      <div aria-hidden="true" className="h-20 print:hidden" />
      <nav aria-label="Navegación entre pasos"
        className="fixed inset-x-0 bottom-[var(--alto-nav-inferior,0px)] z-10 border-t border-rule bg-surface-container-lowest/95 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-[1376px] items-center justify-between gap-2 px-4 py-3 lg:px-8">
          {i > 0 ? <Boton className="min-h-12 min-w-12 shrink-0" onClick={() => irPaso(PASOS[i - 1])} aria-label={`Volver a ${PASO_N[PASOS[i - 1]]}`}>← <span className="hidden sm:inline">{PASO_N[PASOS[i - 1]]}</span></Boton> : <span className="hidden sm:block" />}
          <span className="hidden text-center text-body-md text-on-surface-variant sm:block" aria-live="polite">
            Paso {i + 1} de {PASOS.length} · {faltaAqui ? <span className="text-warn">Falta algo en este paso</span> : paso === 'rasgos' ? 'Opcional' : <span className="text-pas">Listo</span>}
          </span>
          {i < PASOS.length - 1
            ? <Boton variante="primario" className="min-h-12 flex-1 sm:flex-none" onClick={() => irPaso(PASOS[i + 1])}>Siguiente: {PASO_N[PASOS[i + 1]]} →</Boton>
            : <Boton variante="primario" className="min-h-12 flex-1 sm:flex-none" onClick={() => { S.view = 'ficha'; S.tab = 'turno'; render(); irArriba(); }}>Ver la hoja →</Boton>}
        </div>
      </nav>
    </>
  );
}
