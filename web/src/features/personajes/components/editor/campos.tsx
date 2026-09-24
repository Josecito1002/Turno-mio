/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useRef, type ReactNode, type InputHTMLAttributes } from 'react';
import { abInfo } from '@/features/reglas/data/caracteristicas';
import { setVal } from '../../acciones';

/** Escucha el evento `change` nativo (al salir del campo o con Enter), igual que la versión original. */
function useCambio<T extends HTMLInputElement | HTMLTextAreaElement>(fn: (el: T) => void) {
  const ref = useRef<T>(null), f = useRef(fn);
  useEffect(() => { f.current = fn; });
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const h = () => f.current(el);
    el.addEventListener('change', h);
    return () => el.removeEventListener('change', h);
  }, []);
  return ref;
}

type Base = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange'>;

export function CampoTexto({ path, value, ...rest }: Base & { path: string; value: any }) {
  const ref = useCambio<HTMLInputElement>(el => setVal(path, el.value));
  return <input key={String(value ?? '')} ref={ref} type="text" defaultValue={value ?? ''} {...rest} />;
}

export function CampoNumero({ path, value, ...rest }: Base & { path: string; value: any }) {
  const ref = useCambio<HTMLInputElement>(el => setVal(path, +el.value));
  return <input key={String(value ?? '')} ref={ref} type="number" inputMode="numeric" defaultValue={value ?? ''} {...rest} />;
}

export function CampoArea({ path, value, rows = 3, placeholder }: { path: string; value: any; rows?: number; placeholder?: string }) {
  const ref = useCambio<HTMLTextAreaElement>(el => setVal(path, el.value));
  return <textarea key={String(value ?? '')} ref={ref} rows={rows} placeholder={placeholder} defaultValue={value ?? ''} />;
}

export function Selector({ path, value, num, children, ...rest }: { path: string; value: any; num?: boolean; children: ReactNode; 'aria-label'?: string }) {
  return <select value={value ?? ''} onChange={e => setVal(path, num ? +e.target.value : e.target.value)} {...rest}>{children}</select>;
}

export function Casilla({ path, checked, children }: { path: string; checked: boolean; children: ReactNode }) {
  return <label className="check"><input type="checkbox" checked={!!checked} onChange={e => setVal(path, e.target.checked)} />{children}</label>;
}

/** Selector de característica (abSel). */
export function AbSel({ path, value, opts, vacia = 'Elige…' }: { path: string; value: any; opts: string[]; vacia?: string }) {
  return (
    <Selector path={path} value={value}>
      <option value="">{vacia}</option>
      {opts.map(k => <option key={k} value={k}>{abInfo(k)[3]}</option>)}
    </Selector>
  );
}
