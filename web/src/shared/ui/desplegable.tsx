'use client';
/*
 * Desplegable con el estilo de Mi turno, para usar en lugar de <select>.
 * El menú nativo de cada sistema (sobre todo en Android) no se puede estilizar y se ve como otra app; este dibuja su
 * propia lista con las tarjetas, bordes y colores del tema.
 *
 * Se escribe igual que un <select>: hijos <option> y <optgroup>, `value` o `defaultValue`, `onChange(e => e.target.value)`,
 * `disabled` e `id`. El botón guarda el valor en su atributo `value`, así que `document.getElementById(id).value` sigue
 * funcionando con los desplegables sin estado de React.
 *
 * Accesibilidad: patrón combobox de solo lectura (ARIA 1.2). El foco se queda en el botón y la opción activa se indica
 * con aria-activedescendant; flechas, Inicio, Fin, Re Pág, Av Pág, Enter, Espacio, Escape y búsqueda por letras.
 * La lista va en la capa superior (popover) para que no la recorten las tarjetas ni los diálogos.
 */
import {
  Children, isValidElement, useCallback, useEffect, useId, useLayoutEffect, useRef, useState,
  type KeyboardEvent, type ReactElement, type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { claseCampo, cx } from './kit';

type Opcion = { valor: string; texto: string; grupo?: string; disabled?: boolean };
type Valor = string | number | readonly string[] | undefined;

/** Texto plano de un nodo de React (las opciones se arman con cadenas y expresiones). */
function texto(n: ReactNode): string {
  if (n == null || typeof n === 'boolean') return '';
  if (typeof n === 'string' || typeof n === 'number' || typeof n === 'bigint') return String(n);
  if (Array.isArray(n)) return n.map(texto).join('');
  if (isValidElement(n)) return texto((n.props as { children?: ReactNode }).children);
  return '';
}

/** Recorre los hijos como lo haría un <select>: <option> sueltos y dentro de <optgroup>, también en fragmentos. */
function leerOpciones(hijos: ReactNode, grupo?: string, out: Opcion[] = []): Opcion[] {
  Children.forEach(hijos, h => {
    if (!isValidElement(h)) return;
    const el = h as ReactElement<{ value?: Valor; children?: ReactNode; label?: string; disabled?: boolean }>;
    if (el.type === 'option') {
      const t = texto(el.props.children);
      out.push({ valor: el.props.value === undefined ? t : String(el.props.value), texto: t, grupo, disabled: el.props.disabled });
    } else if (el.type === 'optgroup') {
      leerOpciones(el.props.children, el.props.label, out);
    } else {
      leerOpciones(el.props.children, grupo, out);
    }
  });
  return out;
}

const soportaPopover = () => typeof HTMLElement !== 'undefined' && 'showPopover' in HTMLElement.prototype;

export type PropsDesplegable = {
  children: ReactNode;
  value?: Valor;
  defaultValue?: Valor;
  onChange?: (e: { target: { value: string } }) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
};

export function Desplegable({ children, value, defaultValue, onChange, disabled, id, className, ...aria }: PropsDesplegable) {
  const opciones = leerOpciones(children);
  const controlado = value !== undefined;
  const [interno, setInterno] = useState(() => (defaultValue !== undefined ? String(defaultValue) : opciones.find(o => !o.disabled)?.valor ?? ''));
  const actual = controlado ? String(value) : interno;
  const iSel = opciones.findIndex(o => o.valor === actual);

  const [abierto, setAbierto] = useState(false);
  const [activa, setActiva] = useState(-1);
  const [pos, setPos] = useState<{ top: number; left: number; width: number; maxHeight: number } | null>(null);
  const boton = useRef<HTMLButtonElement>(null), lista = useRef<HTMLUListElement>(null);
  const busqueda = useRef({ t: '', hasta: 0 });
  const auto = useId(), idLista = `${auto}-lista`, idOpcion = (i: number) => `${auto}-op-${i}`;

  const habilitadas = opciones.map((o, i) => (o.disabled ? -1 : i)).filter(i => i >= 0);
  const abrir = () => { if (disabled || !opciones.length) return; setActiva(iSel >= 0 ? iSel : habilitadas[0] ?? -1); setPos(null); setAbierto(true); };
  const cerrar = useCallback(() => setAbierto(false), []);
  const elegir = (i: number) => {
    const o = opciones[i]; if (!o || o.disabled) return;
    setAbierto(false); boton.current?.focus();
    if (o.valor === actual) return;
    if (!controlado) setInterno(o.valor);
    onChange?.({ target: { value: o.valor } });
  };

  // Coloca la lista debajo del botón o, si no cabe, encima; con el ancho del botón.
  const colocar = useCallback(() => {
    const b = boton.current; if (!b) return;
    const r = b.getBoundingClientRect(), margen = 8, hueco = 6;
    const abajo = window.innerHeight - r.bottom - margen - hueco, arriba = r.top - margen - hueco;
    const alto = Math.min(lista.current?.scrollHeight ?? 320, 320);
    const haciaArriba = abajo < Math.min(alto, 200) && arriba > abajo;
    const maxHeight = Math.max(120, Math.min(320, haciaArriba ? arriba : abajo));
    const h = Math.min(alto, maxHeight);
    setPos({ top: haciaArriba ? r.top - hueco - h : r.bottom + hueco, left: r.left, width: r.width, maxHeight });
  }, []);

  useLayoutEffect(() => {
    if (!abierto) return;
    const l = lista.current;
    if (l && soportaPopover() && !l.matches(':popover-open')) l.showPopover();
    colocar();
  }, [abierto, colocar]);

  useEffect(() => {
    if (!abierto) return;
    const fuera = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!boton.current?.contains(t) && !lista.current?.contains(t)) cerrar();
    };
    document.addEventListener('pointerdown', fuera, true);
    window.addEventListener('resize', colocar);
    window.addEventListener('scroll', colocar, true);
    return () => {
      document.removeEventListener('pointerdown', fuera, true);
      window.removeEventListener('resize', colocar);
      window.removeEventListener('scroll', colocar, true);
    };
  }, [abierto, cerrar, colocar]);

  // Mantiene visible la opción activa al moverse con el teclado.
  useEffect(() => {
    if (abierto && activa >= 0 && pos) document.getElementById(idOpcion(activa))?.scrollIntoView({ block: 'nearest' });
  }, [abierto, activa, pos]); // eslint-disable-line react-hooks/exhaustive-deps

  const mover = (desde: number, paso: number) => {
    if (!habilitadas.length) return -1;
    const k = habilitadas.indexOf(desde);
    if (k < 0) return paso > 0 ? habilitadas[0] : habilitadas[habilitadas.length - 1];
    return habilitadas[Math.max(0, Math.min(habilitadas.length - 1, k + paso))];
  };

  const buscar = (letra: string, ahora: number) => {
    const b = busqueda.current;
    b.t = ahora < b.hasta ? b.t + letra.toLowerCase() : letra.toLowerCase(); b.hasta = ahora + 700;
    const base = abierto ? activa : iSel, n = opciones.length;
    const sinTildes = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
    const q = sinTildes(b.t);
    for (let d = b.t.length > 1 ? 0 : 1; d <= n; d++) {
      const i = (base + d + n) % n;
      if (!opciones[i].disabled && sinTildes(opciones[i].texto).startsWith(q)) return i;
    }
    return -1;
  };

  const teclas = (e: KeyboardEvent<HTMLButtonElement>) => {
    const k = e.key;
    if (!abierto) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' ', 'Home', 'End'].includes(k)) { e.preventDefault(); abrir(); return; }
      if (k.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const i = buscar(k, e.timeStamp); if (i >= 0) { e.preventDefault(); elegir(i); }
      }
      return;
    }
    const salto = 8;
    let j = -2;
    if (k === 'ArrowDown') j = mover(activa, 1);
    else if (k === 'ArrowUp') j = e.altKey ? activa : mover(activa, -1);
    else if (k === 'Home') j = habilitadas[0] ?? -1;
    else if (k === 'End') j = habilitadas[habilitadas.length - 1] ?? -1;
    else if (k === 'PageDown') j = mover(activa, salto);
    else if (k === 'PageUp') j = mover(activa, -salto);
    if (j !== -2) {
      e.preventDefault();
      if (k === 'ArrowUp' && e.altKey) { elegir(activa); return; }
      setActiva(j); return;
    }
    if (k === 'Enter' || k === ' ') { e.preventDefault(); elegir(activa); return; }
    // Escape también detiene el cierre del diálogo que contenga al desplegable
    if (k === 'Escape') { e.preventDefault(); e.stopPropagation(); cerrar(); return; }
    if (k === 'Tab') { cerrar(); return; }
    if (k.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const i = buscar(k, e.timeStamp); if (i >= 0) { e.preventDefault(); setActiva(i); }
    }
  };

  const listaUI = abierto && (
    <ul ref={lista} id={idLista} role="listbox" aria-labelledby={id} tabIndex={-1}
      {...(soportaPopover() ? { popover: 'manual' as const } : {})}
      onMouseDown={e => e.preventDefault()}
      style={pos ? { top: pos.top, left: pos.left, width: pos.width, maxHeight: pos.maxHeight } : { top: 0, left: 0, visibility: 'hidden' }}
      className={cx(
        'fixed inset-auto z-50 m-0 list-none overflow-y-auto overscroll-contain rounded-2xl border-0 bg-surface p-1.5 text-ink',
        'shadow-[0_12px_32px_-8px_rgb(0_0_0/0.45)] ring-1 ring-rule',
      )}>
      {opciones.map((o, i) => {
        const sel = i === iSel, act = i === activa;
        const titulo = o.grupo !== undefined && (i === 0 || opciones[i - 1].grupo !== o.grupo);
        return [
          titulo && (
            <li key={`g-${i}`} role="presentation" className={cx('px-3 pb-1 pt-2 font-serif text-sm font-bold text-muted', i > 0 && 'mt-1 border-t border-soft pt-3')}>{o.grupo}</li>
          ),
          <li key={i} id={idOpcion(i)} role="option" aria-selected={sel} aria-disabled={o.disabled || undefined}
            onPointerMove={() => !o.disabled && activa !== i && setActiva(i)}
            onClick={() => elegir(i)}
            className={cx(
              'flex min-h-11 items-center gap-3 rounded-xl px-3 py-1.5 leading-snug transition-colors',
              o.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
              act && !o.disabled && 'bg-soft',
              sel && 'font-bold',
              o.grupo !== undefined && 'pl-5',
            )}>
            <span className="min-w-0 flex-1 [overflow-wrap:anywhere]">{o.texto || ' '}</span>
            <svg aria-hidden="true" viewBox="0 0 20 20" className={cx('size-5 shrink-0 text-rea', !sel && 'invisible')}>
              <path d="M4.5 10.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </li>,
        ];
      })}
    </ul>
  );

  return (
    <>
      <button ref={boton} type="button" id={id} value={actual} disabled={disabled}
        role="combobox" aria-haspopup="listbox" aria-expanded={abierto} aria-controls={abierto ? idLista : undefined}
        aria-activedescendant={abierto && activa >= 0 ? idOpcion(activa) : undefined} {...aria}
        onClick={() => (abierto ? cerrar() : abrir())} onKeyDown={teclas} onBlur={e => { if (!lista.current?.contains(e.relatedTarget as Node)) cerrar(); }}
        className={cx(claseCampo, 'flex cursor-pointer items-center gap-2 text-left transition-colors hover:border-muted',
          'disabled:cursor-not-allowed disabled:hover:border-rule', abierto && 'border-rea', className)}>
        <span className="min-w-0 flex-1 truncate">{opciones[iSel]?.texto || ' '}</span>
        <svg aria-hidden="true" viewBox="0 0 20 20" className={cx('size-5 shrink-0 text-muted transition-transform', abierto && 'rotate-180')}>
          <path d="M5.5 8l4.5 4.5L14.5 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {listaUI && (soportaPopover() ? listaUI : createPortal(listaUI, document.body))}
    </>
  );
}
