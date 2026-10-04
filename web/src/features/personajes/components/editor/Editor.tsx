/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import type { ReactNode } from 'react';
import { S, render, irArriba } from '@/app-shell/estado';
import { Boton, EncabezadoPagina, Insignia, PanelPestana, Pestanas } from '@/shared/ui/kit';
import { resumen } from '../../domain/modelo';
import { PASO_N } from '../ficha/Ficha';
import { PasoClase, PasoEspecie, PasoTrasfondo } from './PasosOrigen';
import { PasoEquipo, PasoHabs, PasoStats } from './PasosAtributos';
import { PasoConjuros, PasoDetalles, PasoRasgos } from './PasosMagia';

const TODOS = Object.keys(PASO_N);
const irPaso = (k: string) => { S.step = k; S.sel = null; render(); irArriba(); };

export function Editor({ c }: { c: any }) {
  const pj = S.pj;
  // El paso Equipo siempre está: ahí se toman los kits de la clase y del trasfondo
  const PASOS = TODOS;
  const paso = PASOS.includes(S.step) ? S.step : 'habs', i = PASOS.indexOf(paso);
  const pend = new Set(c.avisos.filter((a: any) => a.nivel === 'aviso').map((a: any) => a.paso));
  const pasos: Record<string, ReactNode> = {
    especie: <PasoEspecie pj={pj} c={c} />, clase: <PasoClase pj={pj} c={c} />, trasfondo: <PasoTrasfondo pj={pj} c={c} />,
    stats: <PasoStats pj={pj} c={c} />, habs: <PasoHabs pj={pj} c={c} />, equipo: <PasoEquipo pj={pj} c={c} />,
    conjuros: <PasoConjuros pj={pj} c={c} />, rasgos: <PasoRasgos pj={pj} />, detalles: <PasoDetalles pj={pj} />,
  };
  return (
    <>
      <EncabezadoPagina id="titulo-vista" titulo={pj.nombre || 'Nuevo personaje'} subtitulo={<>{resumen(pj)}. <span className="whitespace-nowrap">Los cambios se guardan solos.</span></>} />
      <Pestanas idBase="editor" etiqueta="Pasos para crear el personaje" activa={paso} onCambiar={irPaso}
        items={PASOS.map((k, n) => ({ id: k, texto: <><span className="text-xs">{n + 1}.</span> {PASO_N[k]}</>, insignia: pend.has(k) ? <Insignia etiqueta="(falta algo)">!</Insignia> : undefined }))} />
      <PanelPestana idBase="editor" activa={paso}>
        <div key={paso} className="pb-4">{pasos[paso]}</div>
      </PanelPestana>
      {/* Fija sobre la barra de abajo: con `sticky` flotaba a media pantalla en los pasos cortos y dejaba un hueco al final */}
      <div aria-hidden="true" className="h-20 print:hidden" />
      <nav aria-label="Navegación entre pasos"
        className="fixed inset-x-0 bottom-[var(--alto-nav-inferior,0px)] z-10 border-t border-rule bg-bg/95 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-3">
        {i > 0 ? <Boton onClick={() => irPaso(PASOS[i - 1])}>← {PASO_N[PASOS[i - 1]]}</Boton> : <span />}
        <span className="text-sm text-muted" aria-hidden="true">{i + 1} de {PASOS.length}</span>
        {i < PASOS.length - 1
          ? <Boton variante="primario" onClick={() => irPaso(PASOS[i + 1])}>{PASO_N[PASOS[i + 1]]} →</Boton>
          : <Boton variante="primario" onClick={() => { S.view = 'ficha'; S.tab = 'turno'; render(); irArriba(); }}>Ver la hoja</Boton>}
        </div>
      </nav>
    </>
  );
}
