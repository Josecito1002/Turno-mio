'use client';
import { useState, type ReactNode } from 'react';
import { norm } from '@/shared/utils/texto';

export type Tarjeta = { key: string; q: string; node: ReactNode };

/** Cuadrícula de tarjetas con buscador (antes .cardq + data-q). */
export function TarjetasBuscables({ que, items }: { que: string; items: Tarjeta[] }) {
  const [q, setQ] = useState('');
  const nq = norm(q);
  return (
    <>
      <input type="search" className="cardq" placeholder={`Buscar ${que}`} aria-label={`Buscar ${que}`} value={q} onChange={e => setQ(e.target.value)} />
      <div className="cards">{items.filter(it => !nq || it.q.includes(nq)).map(it => <span key={it.key} style={{ display: 'contents' }}>{it.node}</span>)}</div>
    </>
  );
}

export function Tarjeta({ on, onClick, img, titulo, sub, clampSub, clase = '' }: { on: boolean; onClick: () => void; img?: string; titulo: string; sub: string; clampSub?: boolean; clase?: string }) {
  return (
    <button className={`card ${clase}${on ? ' on' : ''}`} onClick={onClick}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {img && <img src={img} alt="" />}
      <b>{titulo}</b><span className={clampSub ? 'd' : undefined}>{sub}</span>
    </button>
  );
}
