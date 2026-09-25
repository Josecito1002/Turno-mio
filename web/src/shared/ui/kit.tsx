'use client';
/*
 * Kit de interfaz de Mi turno (Tailwind). Reglas comunes:
 * - Áreas táctiles de al menos 44 px (min-h-11) y foco visible en todo lo interactivo.
 * - Los colores salen de los tokens del tema (bg, surface, soft, ink, muted, rule, acc, adi, rea, gol, pas, warn).
 * - Nada depende solo del color: los estados llevan texto o atributos ARIA.
 */
import {
  cloneElement, isValidElement, useEffect, useId, useRef, type ReactElement, type ButtonHTMLAttributes, type HTMLAttributes, type KeyboardEvent, type ReactNode,
} from 'react';

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');

export const foco = 'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-rea';
export const claseCampo = cx(
  'min-h-11 w-full rounded-xl border border-rule bg-surface px-3 text-base text-ink placeholder:text-muted/80',
  'disabled:opacity-60', foco,
);

/* ---------- Botones ---------- */
type Variante = 'primario' | 'secundario' | 'fantasma' | 'peligro';
const VARIANTE: Record<Variante, string> = {
  primario: 'bg-ink text-bg hover:bg-ink/90 shadow-sm',
  secundario: 'bg-surface text-ink ring-1 ring-inset ring-rule hover:bg-soft',
  fantasma: 'bg-transparent text-ink hover:bg-soft',
  peligro: 'bg-surface text-acc ring-1 ring-inset ring-acc/50 hover:bg-acc hover:text-bg',
};
export function Boton({ variante = 'secundario', tamano = 'md', className, type = 'button', ...p }:
  ButtonHTMLAttributes<HTMLButtonElement> & { variante?: Variante; tamano?: 'md' | 'sm' }) {
  return (
    <button type={type} {...p} className={cx(
      'inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-bold transition-colors',
      'disabled:cursor-not-allowed disabled:opacity-50',
      tamano === 'md' ? 'min-h-11 px-4 text-[0.95rem]' : 'min-h-11 px-3 text-sm sm:min-h-9',
      VARIANTE[variante], foco, className,
    )} />
  );
}

/* ---------- Estructura ---------- */
export function Tarjeta({ className, as: Tag = 'div', ...p }: HTMLAttributes<HTMLElement> & { as?: 'div' | 'section' | 'article' | 'li' }) {
  return <Tag {...p} className={cx('rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-rule/60', className)} />;
}

export function EncabezadoPagina({ titulo, subtitulo, children, id }: { titulo: ReactNode; subtitulo?: ReactNode; children?: ReactNode; id?: string }) {
  return (
    <header className="pb-4 pt-2">
      <h1 id={id} tabIndex={-1} className="m-0 font-serif text-[clamp(2rem,8vw,3rem)] font-extrabold leading-[1.05] outline-none [overflow-wrap:anywhere]">{titulo}</h1>
      {subtitulo && <p className="mb-0 mt-2 max-w-prose text-muted">{subtitulo}</p>}
      {children && <div className="mt-4 flex flex-wrap gap-2">{children}</div>}
    </header>
  );
}

export function Seccion({ titulo, descripcion, children, className, acciones, nivel = 2 }:
  { titulo: ReactNode; descripcion?: ReactNode; children?: ReactNode; className?: string; acciones?: ReactNode; nivel?: 2 | 3 }) {
  const H = nivel === 2 ? 'h2' : 'h3';
  return (
    <section className={cx('mt-8', className)}>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <H className={cx('m-0 font-serif font-bold', nivel === 2 ? 'text-2xl' : 'text-xl')}>{titulo}</H>
          {descripcion && <p className="mb-0 mt-1 text-sm text-muted">{descripcion}</p>}
        </div>
        {acciones}
      </div>
      {children}
    </section>
  );
}

/** Lista con separadores, para filas simples. */
export function Lista({ children, className, etiqueta }: { children: ReactNode; className?: string; etiqueta?: string }) {
  return <ul aria-label={etiqueta} className={cx('m-0 list-none divide-y divide-soft rounded-2xl bg-surface px-4 py-1 ring-1 ring-rule/60', className)}>{children}</ul>;
}
export function Fila({ children, className }: { children: ReactNode; className?: string }) {
  return <li className={cx('flex min-h-12 flex-wrap items-center justify-between gap-x-3 gap-y-1 py-2', className)}>{children}</li>;
}

export function Nota({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx('my-2 text-sm text-muted', className)}>{children}</p>;
}

export function Vacio({ titulo, children }: { titulo: string; children?: ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-rule p-6 text-center">
      <p className="m-0 font-serif text-lg font-bold">{titulo}</p>
      {children && <div className="mt-2 text-sm text-muted">{children}</div>}
    </div>
  );
}

/* ---------- Avisos ---------- */
export function Aviso({ tipo = 'aviso', titulo, children, accion }: { tipo?: 'aviso' | 'info' | 'error'; titulo: ReactNode; children?: ReactNode; accion?: ReactNode }) {
  const borde = tipo === 'info' ? 'border-muted' : tipo === 'error' ? 'border-acc' : 'border-warn';
  return (
    <div role={tipo === 'error' ? 'alert' : undefined} className={cx('my-2 rounded-xl border-l-4 bg-surface px-4 py-3 ring-1 ring-rule/60', borde)}>
      <p className="m-0 font-serif text-[1.05rem] font-bold">{tipo === 'aviso' ? 'Falta: ' : ''}{titulo}</p>
      {children && <div className="mt-1 text-[0.95rem]">{children}</div>}
      {accion && <div className="mt-2">{accion}</div>}
    </div>
  );
}

export function Insignia({ children, tono = 'warn', etiqueta }: { children: ReactNode; tono?: 'warn' | 'ink' | 'pas'; etiqueta?: string }) {
  const c = tono === 'ink' ? 'bg-ink text-bg' : tono === 'pas' ? 'bg-pas text-bg' : 'bg-warn text-bg';
  return <span aria-label={etiqueta} className={cx('inline-flex min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-extrabold leading-6', c)}>{children}</span>;
}

/* ---------- Formularios ---------- */
/** Etiqueta + control asociados por id (el nombre accesible es solo la etiqueta) y ayuda con aria-describedby. */
export function Campo({ etiqueta, ayuda, children, className }: { etiqueta: ReactNode; ayuda?: ReactNode; children: ReactElement; className?: string }) {
  const auto = useId();
  const props = (isValidElement(children) ? children.props : {}) as { id?: string };
  const id = props.id || auto, idAyuda = `${id}-ayuda`;
  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<{ id?: string; 'aria-describedby'?: string }>, { id, 'aria-describedby': ayuda ? idAyuda : undefined })
    : children;
  return (
    <div className={cx('flex min-w-0 flex-col gap-1.5', className)}>
      <label htmlFor={id} className="font-bold">{etiqueta}</label>
      {control}
      {ayuda && <span id={idAyuda} className="text-sm text-muted">{ayuda}</span>}
    </div>
  );
}

export function Casilla({ checked, onChange, children, disabled, nota }: { checked: boolean; onChange: (v: boolean, el: HTMLInputElement) => void; children: ReactNode; disabled?: boolean; nota?: ReactNode }) {
  return (
    <label className={cx('flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-1', disabled && 'cursor-not-allowed text-muted')}>
      <input type="checkbox" className={cx('size-5 shrink-0 accent-ink', foco)} checked={checked} disabled={disabled} onChange={e => onChange(e.target.checked, e.target)} />
      <span>{children}{nota && <span className="ml-1 text-sm text-muted">{nota}</span>}</span>
    </label>
  );
}

/** Grupo de opciones excluyentes con botones (aria-pressed). */
export function Segmentado<T extends string>({ opciones, valor, onCambiar, etiqueta }: { opciones: [T, string][]; valor: T; onCambiar: (v: T) => void; etiqueta: string }) {
  return (
    <div role="group" aria-label={etiqueta} className="flex flex-wrap gap-2">
      {opciones.map(([k, n]) => (
        <button key={k} type="button" aria-pressed={valor === k} onClick={() => onCambiar(k)}
          className={cx('min-h-11 cursor-pointer rounded-full px-4 font-bold ring-1 ring-inset transition-colors', foco,
            valor === k ? 'bg-ink text-bg ring-ink' : 'bg-surface text-ink ring-rule hover:bg-soft')}>{n}</button>
      ))}
    </div>
  );
}

/* ---------- Pestañas (patrón ARIA: flechas, Inicio y Fin) ---------- */
export function Pestanas({ items, activa, onCambiar, etiqueta, idBase }:
  { items: { id: string; texto: ReactNode; insignia?: ReactNode }[]; activa: string; onCambiar: (id: string) => void; etiqueta: string; idBase: string }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const mover = (e: KeyboardEvent, i: number) => {
    const n = items.length;
    const j = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
    if (j < 0) return;
    e.preventDefault(); onCambiar(items[j].id); refs.current[j]?.focus();
  };
  // Centra la pestaña activa moviendo solo la barra: scrollIntoView también movía la página en el teléfono, y como
  // `items` es nuevo en cada render, pasaba con cualquier botón
  const barra = useRef<HTMLDivElement>(null), idx = items.findIndex(t => t.id === activa);
  useEffect(() => {
    const b = barra.current, el = refs.current[idx]; if (!b || !el) return;
    b.scrollTo({ left: el.offsetLeft - (b.clientWidth - el.clientWidth) / 2 });
  }, [idx]);
  return (
    <div ref={barra} role="tablist" aria-label={etiqueta}
      className="sticky top-[var(--alto-cabecera,0px)] z-10 -mx-4 flex gap-1 overflow-x-auto border-b border-rule bg-bg px-4 py-2 backdrop-blur [scrollbar-width:none] print:hidden">
      {items.map((t, i) => {
        const sel = t.id === activa;
        return (
          <button key={t.id} ref={el => { refs.current[i] = el; }} role="tab" type="button" id={`${idBase}-tab-${t.id}`} aria-selected={sel}
            aria-controls={`${idBase}-panel`} tabIndex={sel ? 0 : -1} onClick={() => onCambiar(t.id)} onKeyDown={e => mover(e, i)}
            className={cx('inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-4 font-bold transition-colors', foco,
              sel ? 'bg-ink text-bg' : 'text-muted hover:bg-soft hover:text-ink')}>
            {t.texto}{t.insignia}
          </button>
        );
      })}
    </div>
  );
}
export function PanelPestana({ idBase, activa, children }: { idBase: string; activa: string; children: ReactNode }) {
  return <div role="tabpanel" id={`${idBase}-panel`} aria-labelledby={`${idBase}-tab-${activa}`} tabIndex={0} className="pt-2 outline-none">{children}</div>;
}

/* ---------- Diálogo modal nativo (atrapa el foco y cierra con Escape) ---------- */
export function Dialogo({ abierto, onCerrar, titulo, descripcion, children, ancho = 'md', abajo }:
  { abierto: boolean; onCerrar: () => void; titulo: ReactNode; descripcion?: ReactNode; children: ReactNode; ancho?: 'md' | 'lg'; abajo?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  const idT = useId(), idD = useId();
  useEffect(() => {
    const d = ref.current; if (!d) return;
    if (abierto && !d.open) d.showModal();
    if (!abierto && d.open) d.close();
  }, [abierto]);
  return (
    <dialog ref={ref} aria-labelledby={idT} aria-describedby={descripcion ? idD : undefined}
      onCancel={e => { e.preventDefault(); onCerrar(); }}
      onClick={e => { if (e.target === ref.current) onCerrar(); }}
      className={cx(
        'max-h-[90dvh] w-[min(100vw-1.5rem,32rem)] overflow-auto bg-surface p-0 text-ink shadow-2xl backdrop:bg-black/50 print:hidden',
        ancho === 'lg' && 'w-[min(100vw-1.5rem,44rem)]',
        abajo ? 'mx-auto mb-0 mt-auto rounded-t-3xl' : 'm-auto rounded-3xl',
      )}>
      <div className="p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id={idT} className="m-0 font-serif text-2xl font-extrabold leading-tight">{titulo}</h2>
            {descripcion && <p id={idD} className="mb-0 mt-1 text-sm text-muted">{descripcion}</p>}
          </div>
          <button type="button" onClick={onCerrar} aria-label="Cerrar"
            className={cx('grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-2xl text-muted hover:bg-soft', foco)}>×</button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </dialog>
  );
}

/* ---------- Contadores ---------- */
/** Botones de uso (pips). Cada uno dice si está disponible o gastado. */
export function Puntos({ nombre, max, usados, onTocar, pequeno }: { nombre: string; max: number; usados: number; onTocar: (i: number) => void; pequeno?: boolean }) {
  const quedan = max - usados;
  return (
    <div role="group" aria-label={`${nombre}: quedan ${quedan} de ${max}`} className="flex flex-wrap gap-1">
      {Array.from({ length: max }, (_, i) => {
        const libre = i < quedan;
        return (
          <button key={i} type="button" onClick={() => onTocar(i)} aria-pressed={!libre}
            aria-label={`${nombre} ${i + 1} de ${max}: ${libre ? 'disponible, toca para gastarlo' : 'gastado, toca para recuperarlo'}`}
            className={cx('grid size-11 cursor-pointer place-items-center rounded-full', foco)}>
            <span aria-hidden="true" className={cx('block rounded-full border-[2.5px] border-ink', pequeno ? 'size-5' : 'size-7', libre ? 'bg-ink' : 'bg-transparent')} />
          </button>
        );
      })}
    </div>
  );
}

/** Contador con − y +, y el número editable. */
export function Contador({ nombre, valor, max, onCambiar, onFijar }: { nombre: string; valor: number; max: number; onCambiar: (d: number) => void; onFijar?: (v: string) => void }) {
  return (
    <div className="flex items-center gap-1.5">
      <Boton tamano="sm" onClick={() => onCambiar(-1)} aria-label={`Gastar 1 de ${nombre}`} disabled={valor <= 0}>−</Boton>
      {onFijar ? (
        <input key={valor} type="number" inputMode="numeric" min={0} max={max} defaultValue={valor} aria-label={`${nombre}, quedan (de ${max})`}
          onBlur={e => { if (+e.target.value !== valor) onFijar(e.target.value); }}
          onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
          className={cx(claseCampo, 'w-20! text-center font-serif text-lg font-bold')} />
      ) : <b className="min-w-10 text-center font-serif text-xl" aria-live="polite">{valor}</b>}
      <span className="text-sm text-muted">/ {max}</span>
      <Boton tamano="sm" onClick={() => onCambiar(1)} aria-label={`Recuperar 1 de ${nombre}`} disabled={valor >= max}>+</Boton>
    </div>
  );
}

/** Sección plegable accesible (details/summary). */
export function Plegable({ titulo, children, abierto, onToggle, className, nota }: { titulo: ReactNode; children: ReactNode; abierto?: boolean; onToggle?: (open: boolean) => void; className?: string; nota?: ReactNode }) {
  return (
    <details open={abierto} onToggle={e => onToggle?.((e.target as HTMLDetailsElement).open)}
      className={cx('group my-2 rounded-2xl bg-soft/70 ring-1 ring-rule/50', className)}>
      <summary className={cx('flex min-h-12 cursor-pointer list-none items-center gap-2 rounded-2xl px-4 font-bold [&::-webkit-details-marker]:hidden', foco)}>
        <span aria-hidden="true" className="text-muted transition-transform group-open:rotate-90">▸</span>
        <span className="flex-1">{titulo}</span>
        {nota && <span className="text-sm font-normal text-muted">{nota}</span>}
      </summary>
      <div className="px-4 pb-4">{children}</div>
    </details>
  );
}
