/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useRef, useState } from 'react';
import { S, render } from '@/app-shell/estado';
import { Boton, Dialogo, Simbolo, cx, foco } from '@/shared/ui/kit';
import { TIPOS } from '@/features/reglas/data/caracteristicas';
import { COMUNES } from '@/features/reglas/data/comunes';
import { FormaTipo } from '@/features/reglas/components/TipoAccion';
import { combateMesa, gastarAccionMesa, type CombateVivo, type EconomiaRonda, type TipoAccionRonda } from '@/features/mesa/api';
import { EFECTO_CONDICION } from '@/features/mesa/domain/condiciones';
import { Entrada } from '../piezas';
import { FilaArsenal, FilaConjuro, Ranuras, RecursosClase } from './Ficha';

const TIPOS_BOTON: TipoAccionRonda[] = ['accion', 'adicional', 'reaccion'];

/** Lo que se puede hacer con cada tipo de acción: ataques, rasgos, conjuros y las acciones que cualquiera tiene. */
function OpcionesDeTipo({ c, t }: { c: any; t: TipoAccionRonda }) {
  const armas = t === 'accion' ? [...c.armas.filter((a: any) => a.mano), ...(c.naturales || [])] : [];
  const ents = c.entries.filter((e: any) => e.t === t);
  const conjuros = (c.conjuros || []).filter((s: any) => (s.tiempo || 'accion') === t);
  const com = COMUNES[t] || [];
  return (
    <div className="space-y-3">
      {armas.length > 0 && (
        <div className="space-y-2"><span className="text-label-caps uppercase text-outline">Ataques</span>
          {armas.map((a: any, i: number) => <FilaArsenal key={a.nombre + i} a={a} c={c} />)}</div>
      )}
      {ents.length > 0 && <div><span className="text-label-caps uppercase text-outline">Rasgos</span>{ents.map((e: any, i: number) => <Entrada key={i} e={e} />)}</div>}
      {conjuros.length > 0 && (
        <div className="space-y-1"><span className="text-label-caps uppercase text-outline">Conjuros</span>
          <ul className="m-0 list-none space-y-1 p-0">{conjuros.map((s: any, i: number) => <FilaConjuro key={s.nombre + i} s={s} c={c} />)}</ul></div>
      )}
      {com.length > 0 && (
        <div><span className="text-label-caps uppercase text-outline">Las que cualquiera puede hacer</span>
          {com.map(([n, f]: [string, (c: any) => string]) => <Entrada key={n} e={{ t, nombre: n, texto: f(c), src: 'Reglas básicas' }} />)}</div>
      )}
    </div>
  );
}

/** Pantalla de combate del jugador: solo su personaje, con acción, acción adicional y reacción sincronizadas con el DM. */
export function ModoCombate({ c }: { c: any }) {
  const m = S.combateMesa!, { dmId, campanaId, personajeId } = m;
  const [viv, setViv] = useState<CombateVivo>(null);
  const [eco, setEco] = useState<EconomiaRonda>({});
  const [abierto, setAbierto] = useState<TipoAccionRonda | null>(null);
  const [error, setError] = useState('');
  const toques = useRef<Partial<Record<TipoAccionRonda, number>>>({});

  useEffect(() => {
    let vivo = true;
    const ref = { dmId, campanaId, personajeId };
    const leer = () => combateMesa(ref).then(d => {
      if (!vivo) return;
      setViv(d); setError('');
      const e = d?.economia?.[personajeId] || {};
      // Un toque reciente manda sobre lo que devuelva el servidor, para que el botón no parpadee
      setEco(prev => {
        const sig: EconomiaRonda = { ...e };
        for (const t of TIPOS_BOTON) if (Date.now() - (toques.current[t] || 0) < 3000) sig[t] = prev[t];
        return sig;
      });
    }).catch((err: Error) => { if (vivo) setError(err.message); });
    leer();
    const id = setInterval(leer, 2000);
    return () => { vivo = false; clearInterval(id); };
  }, [dmId, campanaId, personajeId]);

  const gastar = (t: TipoAccionRonda, gastado: boolean) => {
    toques.current[t] = Date.now();
    setEco(p => ({ ...p, [t]: gastado }));
    gastarAccionMesa(m, t, gastado).catch((e: Error) => { setError(e.message); setEco(p => ({ ...p, [t]: !gastado })); });
  };

  const activo = !!viv?.activo, turnoDe = viv?.orden?.[viv.turno || 0];
  const mias = viv?.orden?.find(o => o.pid === personajeId)?.cond || [];
  const esMiTurno = !!turnoDe && turnoDe.pid === m.personajeId;
  const salir = () => { S.combateMesa = null; S.combateHoja = false; render(); };
  const ranuras = c.recursos.filter((r: any) => /^slot\d/.test(r.id));

  return (
    <div className="mx-auto grid max-w-3xl gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-surface-container-low p-3 shadow-lg">
        <div className="min-w-0">
          <h2 className="m-0 font-serif text-headline-md text-on-surface">{c.pj.nombre || 'Personaje'}</h2>
          <p className="m-0 text-body-sm text-outline">Mesa «{m.mesa}» · DM {m.dm}</p>
        </div>
        <div className="flex gap-2">
          <Boton tamano="sm" onClick={() => { S.combateHoja = true; render(); }}>Ver hoja completa</Boton>
          <Boton tamano="sm" variante="peligro" onClick={salir}>Salir del combate</Boton>
        </div>
      </div>

      <div className={cx('rounded-lg p-3 text-center shadow-lg', esMiTurno ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-low text-on-surface')}>
        {activo ? (
          <>
            <p className="m-0 font-serif text-headline-sm">Ronda {viv?.ronda || 1}</p>
            <p className="m-0 text-body-md">{esMiTurno ? '¡Es tu turno!' : turnoDe ? `Turno de ${turnoDe.nombre}` : ''}</p>
          </>
        ) : <p className="m-0 text-body-md text-on-surface-variant">El DM todavía no ha empezado el combate. Esta pantalla se actualizará sola.</p>}
        {error && <p className="m-0 mt-1 text-body-sm text-error">No se pudo sincronizar: {error}</p>}
      </div>

      {mias.length > 0 && (
        <div className="grid gap-1 rounded-lg bg-error-container/30 p-3 shadow-lg" aria-label="Tus condiciones">
          {mias.map(n => (
            <p key={n} className="m-0 text-body-sm text-on-surface"><b className="text-error">{n}.</b> {EFECTO_CONDICION[n] || ''}{n === 'Derribado' && esMiTurno ? ' (Es tu turno: lo notarás al moverte.)' : ''}</p>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2" role="group" aria-label="Tu turno">
        {TIPOS_BOTON.map(t => {
          const gastada = !!eco[t];
          return (
            <button key={t} type="button" onClick={() => setAbierto(t)} aria-haspopup="dialog"
              className={cx('flex min-h-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg p-2 text-center shadow-md transition-all', foco,
                gastada ? 'bg-surface-container-lowest text-outline opacity-60' : 'bg-primary-container text-on-primary-container hover:brightness-110')}>
              <FormaTipo t={t} className="size-5" />
              <span className="font-serif text-body-lg font-bold">{TIPOS[t][0]}</span>
              <span className="text-label-caps uppercase">{gastada ? 'Gastada' : 'Disponible'}</span>
            </button>
          );
        })}
      </div>

      {(ranuras.length > 0 || c.recursos.some((r: any) => r.id !== 'pg' && !/^slot\d/.test(r.id))) && (
        <section className="grid gap-3" aria-label="Recursos">
          <h3 className="m-0 flex items-center gap-1 font-serif text-headline-sm text-secondary"><Simbolo n="auto_awesome" className="text-body-lg" />Recursos</h3>
          {ranuras.map((r: any) => <Ranuras key={r.id} r={r} c={c} />)}
          <RecursosClase c={c} />
        </section>
      )}

      <Dialogo abierto={!!abierto} onCerrar={() => setAbierto(null)} titulo={abierto ? TIPOS[abierto][0] : ''} ancho="lg"
        descripcion={abierto ? TIPOS[abierto][1] : undefined}>
        {abierto && (
          <div className="space-y-3">
            <Boton variante={eco[abierto] ? 'secundario' : 'primario'} onClick={() => gastar(abierto, !eco[abierto])}>
              {eco[abierto] ? 'Recuperar (me equivoqué)' : `Marcar ${TIPOS[abierto][0].toLowerCase()} como gastada`}
            </Boton>
            <OpcionesDeTipo c={c} t={abierto} />
          </div>
        )}
      </Dialogo>
    </div>
  );
}
