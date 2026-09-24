import { TIPOS } from '../data/caracteristicas';

/* Cada tipo de acción tiene color y forma propios (la forma ayuda a quien no distingue colores). */
export const COLOR_TIPO: Record<string, { texto: string; borde: string; fondo: string }> = {
  accion: { texto: 'text-acc', borde: 'border-acc', fondo: 'bg-acc' },
  adicional: { texto: 'text-adi', borde: 'border-adi', fondo: 'bg-adi' },
  reaccion: { texto: 'text-rea', borde: 'border-rea', fondo: 'bg-rea' },
  gratis: { texto: 'text-gol', borde: 'border-gol', fondo: 'bg-gol' },
  pasiva: { texto: 'text-pas', borde: 'border-pas', fondo: 'bg-pas' },
  fuera: { texto: 'text-muted', borde: 'border-muted', fondo: 'bg-muted' },
};

export function FormaTipo({ t, className = 'size-3.5' }: { t: string; className?: string }) {
  const c = COLOR_TIPO[t] || COLOR_TIPO.pasiva;
  const forma: Record<string, string> = {
    accion: `rounded-full ${c.fondo}`,
    adicional: `${c.fondo} [clip-path:polygon(50%_0,100%_100%,0_100%)]`,
    reaccion: `${c.fondo} rotate-45 scale-[.8]`,
    gratis: `rounded-full border-[2.5px] ${c.borde}`,
    pasiva: `${c.fondo} !h-[5px] rounded-sm`,
    fuera: `border-[2.5px] ${c.borde}`,
  };
  return <span aria-hidden="true" className={`inline-block shrink-0 ${className} ${forma[t] || forma.pasiva}`} />;
}

/** Forma + nombre del tipo ("Acción adicional"). */
export function EtiquetaTipo({ t, className = '' }: { t: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${COLOR_TIPO[t]?.texto || ''} ${className}`}>
      <FormaTipo t={t} className="size-2.5" />{TIPOS[t]?.[0] || t}
    </span>
  );
}
