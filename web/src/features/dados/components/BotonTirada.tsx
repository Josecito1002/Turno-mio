import type { ReactNode } from 'react';
import { esc } from '@/shared/utils/texto';
import { cx, foco } from '@/shared/ui/kit';

type Estilo = 'chip' | 'grande' | 'bloque';
const ESTILO: Record<Estilo, string> = {
  // El color del texto va en cada estilo: si la base llevara text-inherit, le ganaría a text-bg del estilo grande
  chip: 'min-h-11 rounded-lg bg-soft px-2.5 font-bold text-inherit hover:bg-rule/70 sm:min-h-9',
  grande: 'min-h-12 rounded-xl bg-ink px-3 font-serif text-2xl font-extrabold text-bg hover:bg-ink/90',
  bloque: 'w-full rounded-xl text-inherit hover:bg-soft',
};

type Props = {
  expr: string; label: string; children: ReactNode; estilo?: Estilo; className?: string;
  dmg?: string; dmgLabel?: string; min3?: boolean; ariaLabel?: string;
};

/** Botón que tira dados al tocarlo (lo atiende la bandeja de dados por delegación de eventos). */
export function BotonTirada({ expr, label, children, estilo = 'chip', className, dmg, dmgLabel, min3, ariaLabel }: Props) {
  return (
    <button type="button" data-roll={expr} data-label={label} aria-label={ariaLabel ?? `Tirar ${label}: ${expr.replace('1d20', 'd20 ')}`}
      data-dmg={dmg || undefined} data-dmglabel={dmg ? dmgLabel : undefined} data-min3={min3 ? '1' : undefined}
      className={cx('cursor-pointer transition-colors', ESTILO[estilo], foco, className)}>
      {children}
    </button>
  );
}

const INLINE = 'cursor-pointer rounded-md bg-soft px-1 font-bold shadow-[inset_0_-2px_0_var(--rea)] hover:bg-rule/70 focus-visible:outline-3 focus-visible:outline-rea';

/** Convierte los dados escritos en un texto HTML (1d8 + 2) en botones que se pueden tirar. */
export function linkDice(html: string, label: string) {
  return html.replace(/(\d+)d(\d+)((?:\s*(?:\+|−|-)\s*\d+)?)(?![\d])/g, (m0, n, d, mod) => {
    const expr = `${n}d${d}${mod.replace(/\s/g, '').replace('−', '-')}`;
    return `<button type="button" class="${INLINE}" data-roll="${esc(expr)}" data-label="${esc(label)}" aria-label="Tirar ${esc(expr)} (${esc(label)})">${m0}</button>`;
  });
}

/** Texto enriquecido (ya escapado) con dados tirables. */
export function TextoConDados({ html, label, as: Tag = 'p', className }: { html: string; label: string; as?: 'p' | 'span' | 'div'; className?: string }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: linkDice(html, label) }} />;
}
