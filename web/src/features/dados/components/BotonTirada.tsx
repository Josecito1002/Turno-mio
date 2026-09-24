import type { ReactNode } from 'react';
import { esc } from '@/shared/utils/texto';

type Props = {
  expr: string; label: string; className?: string; children: ReactNode;
  dmg?: string; dmgLabel?: string; min3?: boolean;
};

/** Botón que tira dados al tocarlo (lo atiende la BandejaDados por delegación). */
export function BotonTirada({ expr, label, className = '', children, dmg, dmgLabel, min3 }: Props) {
  return (
    <button className={`rb ${className}`} data-roll={expr} data-label={label}
      data-dmg={dmg || undefined} data-dmglabel={dmg ? dmgLabel : undefined} data-min3={min3 ? '1' : undefined}>
      {children}
    </button>
  );
}

/** Convierte los dados escritos en un texto HTML (1d8 + 2) en botones que se pueden tirar. */
export function linkDice(html: string, label: string) {
  return html.replace(/(\d+)d(\d+)((?:\s*(?:\+|−|-)\s*\d+)?)(?![\d])/g, (m0, n, d, mod) =>
    `<button class="rb inline" data-roll="${esc(`${n}d${d}${mod.replace(/\s/g, '').replace('−', '-')}`)}" data-label="${esc(label)}">${m0}</button>`);
}

/** Texto enriquecido (ya escapado) con dados tirables. */
export function TextoConDados({ html, label, as: Tag = 'p', className }: { html: string; label: string; as?: 'p' | 'span' | 'div'; className?: string }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: linkDice(html, label) }} />;
}
