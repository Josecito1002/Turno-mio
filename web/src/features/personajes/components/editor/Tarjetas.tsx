'use client';
import { useId, useState, type ReactNode } from 'react';
import { norm } from '@/shared/utils/texto';
import { Simbolo, cx, foco } from '@/shared/ui/kit';
import { ETIQUETA_FUENTE, type Fuente } from '@/features/reglas/data/fuentes';
import { Imagen } from '@/shared/ui/imagen';

export type Tarjeta = { key: string; q: string; node: ReactNode };

/** Cuadrícula de opciones con buscador. */
export function TarjetasBuscables({ que, items }: { que: string; items: Tarjeta[] }) {
  const [q, setQ] = useState('');
  const id = useId();
  const nq = norm(q);
  const vis = items.filter(it => !nq || it.q.includes(nq));
  return (
    <div>
      <label className="mb-4 flex min-h-11 items-center gap-2 rounded-lg bg-surface-container px-3 focus-within:ring-2 focus-within:ring-primary">
        <Simbolo n="search" className="text-headline-sm text-outline" />
        <span className="sr-only">Buscar {que}</span>
        <input id={id} type="search" placeholder={`Buscar ${que}…`} value={q} onChange={e => setQ(e.target.value)}
          className="min-w-0 flex-1 bg-transparent py-2 text-body-lg text-on-surface outline-none placeholder:text-outline" />
      </label>
      <p aria-live="polite" className="sr-only">{nq ? `${vis.length} resultados` : ''}</p>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3 p-0">
        {vis.map(it => <li key={it.key} className="flex">{it.node}</li>)}
      </ul>
      {nq && !vis.length && <p className="text-sm text-muted">No hay {que} con “{q}”.</p>}
    </div>
  );
}

/** `imgArriba`: la imagen es un retrato vertical; en el cuadro se ve su parte de arriba (la cara) */
export function Tarjeta({ on, onClick, img, imgArriba, titulo, sub, clampSub, fuente }: { on: boolean; onClick: () => void; img?: string; imgArriba?: boolean; titulo: string; sub: string; clampSub?: boolean; clase?: string; fuente?: Fuente }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick}
      className={cx('relative flex w-full cursor-pointer flex-col overflow-hidden rounded-xl bg-surface-container text-left transition-colors hover:bg-surface-container-high', foco,
        on ? 'ring-2 ring-primary' : 'ring-1 ring-surface-container-highest')}>
      {img && <Imagen src={img} className={cx('aspect-[4/3] w-full bg-surface-container-high object-cover', imgArriba && 'object-top')} />}
      {on && <span className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-surface-container-lowest/80"><Simbolo n="check_circle" relleno className="text-headline-sm text-primary" /></span>}
      <span className="flex flex-1 flex-col gap-1 p-3">
        <b className="font-serif text-headline-sm leading-tight">{titulo}<span className="sr-only">{on ? ' (elegida)' : ''}</span></b>
        {sub && <span className={cx('text-body-md text-on-surface-variant', clampSub && 'line-clamp-3')}>{sub}</span>}
        {fuente && <EtiquetaFuente fuente={fuente} className="mt-auto self-start pt-1" />}
      </span>
    </button>
  );
}

/** Etiqueta pequeña con el origen: 5.5e 2024 (celeste), D&D Beyond (rojo), Homebrew (naranja) o Playtest (verde); el libro va en el título al pasar el ratón. */
const COLOR_FUENTE: Record<Fuente['tipo'], string> = {
  basicas: 'text-f-2024 ring-f-2024/50', dndbeyond: 'text-f-dndb ring-f-dndb/50', homebrew: 'text-f-hb ring-f-hb/50', playtest: 'text-f-pt ring-f-pt/50',
};
export function EtiquetaFuente({ fuente, className }: { fuente: Fuente; className?: string }) {
  return (
    <span className={className}>
      <span title={fuente.libro} className={cx('inline-block rounded-full px-1.5 py-px text-[0.68rem] font-bold leading-tight ring-1',
        COLOR_FUENTE[fuente.tipo])}>
        {ETIQUETA_FUENTE[fuente.tipo]}
      </span>
    </span>
  );
}
