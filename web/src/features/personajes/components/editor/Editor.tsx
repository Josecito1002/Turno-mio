/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { S, render, irArriba } from '@/app-shell/estado';
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
  const pasos: Record<string, React.ReactNode> = {
    especie: <PasoEspecie pj={pj} c={c} />, clase: <PasoClase pj={pj} c={c} />, trasfondo: <PasoTrasfondo pj={pj} c={c} />,
    stats: <PasoStats pj={pj} c={c} />, habs: <PasoHabs pj={pj} c={c} />, equipo: <PasoEquipo pj={pj} c={c} />,
    conjuros: <PasoConjuros pj={pj} c={c} />, rasgos: <PasoRasgos pj={pj} />, detalles: <PasoDetalles pj={pj} />,
  };
  return (
    <>
      <section className="hero"><h1>{pj.nombre || 'Nuevo personaje'}</h1><p className="who">{resumen(pj)}. Los cambios se guardan solos.</p></section>
      <nav className="tabs">
        {PASOS.map(k => (
          <button key={k} className="tab" aria-selected={S.step === k} onClick={() => irPaso(k)}>{PASO_N[k]}{pend.has(k) && <span className="badge">!</span>}</button>
        ))}
      </nav>
      <div className="panel on" key={S.step}>{pasos[S.step]}</div>
      <div className="foot">
        {i > 0 ? <button className="btn ghost" onClick={() => irPaso(PASOS[i - 1])}>Anterior</button> : <span />}
        {i < PASOS.length - 1
          ? <button className="btn" onClick={() => irPaso(PASOS[i + 1])}>Siguiente</button>
          : <button className="btn" onClick={() => { S.view = 'ficha'; S.tab = 'turno'; render(); irArriba(); }}>Ver la hoja</button>}
      </div>
    </>
  );
}
