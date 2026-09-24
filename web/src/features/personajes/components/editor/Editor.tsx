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

const PASOS = Object.keys(PASO_N);
const irPaso = (k: string) => { S.step = k; S.sel = null; render(); irArriba(); };

export function Editor({ c }: { c: any }) {
  const pj = S.pj, i = PASOS.indexOf(S.step);
  const pend = new Set(c.avisos.filter((a: any) => a.nivel === 'aviso').map((a: any) => a.paso));
  const pasos: Record<string, ReactNode> = {
    especie: <PasoEspecie pj={pj} c={c} />, clase: <PasoClase pj={pj} c={c} />, trasfondo: <PasoTrasfondo pj={pj} c={c} />,
    stats: <PasoStats pj={pj} c={c} />, habs: <PasoHabs pj={pj} c={c} />, equipo: <PasoEquipo pj={pj} c={c} />,
    conjuros: <PasoConjuros pj={pj} c={c} />, rasgos: <PasoRasgos pj={pj} />, detalles: <PasoDetalles pj={pj} />,
  };
  return (
    <>
      <EncabezadoPagina id="titulo-vista" titulo={pj.nombre || 'Nuevo personaje'} subtitulo={<>{resumen(pj)}. <span className="whitespace-nowrap">Los cambios se guardan solos.</span></>} />
      <Pestanas idBase="editor" etiqueta="Pasos para crear el personaje" activa={S.step} onCambiar={irPaso}
        items={PASOS.map((k, n) => ({ id: k, texto: <><span className="text-xs">{n + 1}.</span> {PASO_N[k]}</>, insignia: pend.has(k) ? <Insignia etiqueta="(falta algo)">!</Insignia> : undefined }))} />
      <PanelPestana idBase="editor" activa={S.step}>
        <div key={S.step} className="pb-4">{pasos[S.step]}</div>
      </PanelPestana>
      <nav aria-label="Navegación entre pasos"
        className="sticky bottom-[var(--alto-nav-inferior,0px)] z-10 -mx-4 mt-6 flex items-center justify-between gap-2 border-t border-rule bg-bg px-4 py-3 backdrop-blur print:hidden">
        {i > 0 ? <Boton onClick={() => irPaso(PASOS[i - 1])}>← {PASO_N[PASOS[i - 1]]}</Boton> : <span />}
        <span className="text-sm text-muted" aria-hidden="true">{i + 1} de {PASOS.length}</span>
        {i < PASOS.length - 1
          ? <Boton variante="primario" onClick={() => irPaso(PASOS[i + 1])}>{PASO_N[PASOS[i + 1]]} →</Boton>
          : <Boton variante="primario" onClick={() => { S.view = 'ficha'; S.tab = 'turno'; render(); irArriba(); }}>Ver la hoja</Boton>}
      </nav>
    </>
  );
}
