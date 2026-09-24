'use client';
import { useId, useState, type ReactNode } from 'react';
import { norm } from '@/shared/utils/texto';
import { claseCampo, cx, foco } from '@/shared/ui/kit';

export type Tarjeta = { key: string; q: string; node: ReactNode };

/** Cuadrícula de opciones con buscador. */
export function TarjetasBuscables({ que, items }: { que: string; items: Tarjeta[] }) {
  const [q, setQ] = useState('');
  const id = useId();
  const nq = norm(q);
  const vis = items.filter(it => !nq || it.q.includes(nq));
  return (
    <div>
      <label htmlFor={id} className="sr-only">Buscar {que}</label>
      <input id={id} type="search" placeholder={`Buscar ${que}…`} value={q} onChange={e => setQ(e.target.value)} className={cx(claseCampo, 'mb-3')} />
      <p aria-live="polite" className="sr-only">{nq ? `${vis.length} resultados` : ''}</p>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2 p-0">
        {vis.map(it => <li key={it.key} className="flex">{it.node}</li>)}
      </ul>
      {nq && !vis.length && <p className="text-sm text-muted">No hay {que} con “{q}”.</p>}
    </div>
  );
}

export function Tarjeta({ on, onClick, img, titulo, sub, clampSub }: { on: boolean; onClick: () => void; img?: string; titulo: string; sub: string; clampSub?: boolean; clase?: string }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick}
      className={cx('flex w-full cursor-pointer flex-col rounded-2xl bg-surface p-3 text-left ring-1 transition-shadow hover:shadow-md', foco,
        on ? 'ring-[2.5px] ring-ink' : 'ring-rule')}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {img && <img src={img} alt="" className="mb-2 aspect-square w-full rounded-xl bg-soft object-cover" />}
      <b className="flex items-center gap-1.5 font-serif text-[1.08rem] leading-tight">{on && <span aria-hidden="true">✓</span>}{titulo}</b>
      <span className={cx('mt-0.5 text-sm text-muted', clampSub && 'line-clamp-3')}>{sub}</span>
    </button>
  );
}
