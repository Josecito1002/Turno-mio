'use client';
import { useId } from 'react';
import { Boton, cx } from '@/shared/ui/kit';
import { avisar } from '@/shared/ui/avisos';
import { partesTirada, textoTirada } from '../domain/dados';
import { useDados } from './Bandeja';

/** Lo que vale la tirada con lo que escribió el jugador: el dado (o la suma de los dados) más el número fijo. */
export function totalTirada(expr: string, valor: string, crit = false) {
  if (valor.trim() === '') return null;
  return Math.round(+valor || 0) + partesTirada(expr, crit).mod;
}

/** Un paso de tirada explicado: qué dados tirar, dónde escribir lo que salió (solo los dados: el número fijo
 *  se suma solo) y el total. También deja tirarlos en la app. `ataque`: el valor es el d20 natural. */
export function CampoTirada({ tipo, expr, valor, alCambiar, etiqueta, crit, adv = 0, unaVez, bloqueado, alTirar, claseInput, nota, desglose, tipoDano, mas = [], sinCritico }: {
  tipo: 'ataque' | 'dano'; expr: string; valor: string; alCambiar: (v: string) => void; etiqueta: string;
  crit?: boolean; adv?: number; claseInput?: string; nota?: string;
  /** De dónde sale el número fijo ("3 FUE + 2 competencia") y el tipo de daño */
  desglose?: string; tipoDano?: string;
  /** Otros dados que se suman a esta tirada (Bendición, Castigo divino), cada uno con su resultado si ya se escribió */
  mas?: { dados: string; por: string; valor: number | null; signo?: number }[];
  /** Una salvación: el 20 y el 1 naturales no aciertan ni fallan solos */
  sinCritico?: boolean;
  /** El jugador tira en la app una sola vez: después el valor queda fijo */
  unaVez?: boolean; bloqueado?: boolean; alTirar?: () => void;
}) {
  const tirar = useDados(), id = useId();
  const { dados, mod } = partesTirada(expr, crit);
  const que = tipo === 'ataque' && adv ? `2d20${mod ? ` ${mod > 0 ? '+' : '−'} ${Math.abs(mod)}` : ''}` : textoTirada(dados, mod);
  const base = totalTirada(expr, valor, crit);
  const total = base == null ? null : base + mas.reduce((t, x) => t + (x.signo ?? 1) * (x.valor ?? 0), 0);
  const nat = tipo === 'ataque' && !sinCritico && valor !== '' ? Math.round(+valor) : null;
  const virtual = () => {
    alTirar?.();
    tirar(expr, etiqueta, { noRepeat: true, ...(adv ? { adv } : {}), ...(crit ? { crit: true } : {}) })
      .then(r => alCambiar(String(tipo === 'ataque' ? r.nat ?? r.total - r.consts : r.total - r.consts)))
      .catch(e => avisar(`No se pudo tirar: ${(e as Error).message}`, 'error'));
  };
  return (
    <div className="grid gap-1.5">
      <p className="m-0 text-base">
        Tira <b className="whitespace-nowrap">{que}</b>{desglose && mod ? <span className="text-muted"> ({desglose})</span> : null}{tipoDano ? <> de daño {tipoDano}</> : null}
        {mas.map(x => <span key={x.por}> {(x.signo ?? 1) < 0 ? '−' : '+'} <b className="whitespace-nowrap">{x.dados}</b> por {x.por}</span>)}
        {tipo === 'ataque' && adv ? <span className="text-muted">{adv > 0 ? ' (con ventaja: quédate con el d20 más alto)' : ' (con desventaja: quédate con el d20 más bajo)'}</span> : null}
        {crit && tipo === 'dano' ? <span className="text-muted"> (crítico: el doble de dados)</span> : null}
      </p>
      <label htmlFor={id} className="text-sm text-muted">
        {tipo === 'ataque' ? 'Escribe solo lo que salió en el d20' : mod ? `Escribe la suma de los dados (${dados})` : 'Escribe la suma de los dados'}
        {mod ? <>, sin el {mod > 0 ? '+' : '−'}{Math.abs(mod)}: <b>se suma solo</b></> : null}
      </label>
      <div className="flex flex-wrap items-center gap-2">
        <input id={id} type="number" inputMode="numeric" min={tipo === 'ataque' ? 1 : 0} max={tipo === 'ataque' ? 20 : undefined}
          placeholder={tipo === 'ataque' ? 'd20' : 'Dados'} value={valor} readOnly={bloqueado}
          onChange={e => alCambiar(e.target.value)} className={cx(claseInput, 'w-28! text-center text-lg font-bold')} />
        {!(unaVez && (bloqueado || valor !== '')) && <Boton tamano="sm" onClick={virtual}>{valor === '' ? 'O tíralos en la app' : 'Tirar en la app'}</Boton>}
        {total != null && (
          <span className="text-base">
            {mod || mas.length ? <>{Math.round(+valor || 0)}{mod ? ` ${mod > 0 ? '+' : '−'} ${Math.abs(mod)}` : ''}{mas.map(x => ` ${(x.signo ?? 1) < 0 ? '−' : '+'} ${x.valor ?? '?'}`).join('')} = </> : 'Total: '}<b className="font-serif text-2xl">{tipo === 'dano' ? Math.max(0, total) : total}</b>
          </span>
        )}
      </div>
      {nat === 20 && <p className="m-0 text-sm font-bold text-adi">¡20 natural! Acierta seguro y es crítico: el daño tira el doble de dados.</p>}
      {nat === 1 && <p className="m-0 text-sm font-bold text-acc">1 natural: falla seguro.</p>}
      {nota && total != null && nat !== 1 && nat !== 20 && <p className="m-0 text-sm text-muted">{nota}</p>}
      {bloqueado && <p className="m-0 text-xs text-muted">Tirada hecha en la app: no se puede repetir.</p>}
    </div>
  );
}
