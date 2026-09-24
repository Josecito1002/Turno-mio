/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useRef, type ReactNode, type InputHTMLAttributes } from 'react';
import { claseCampo, cx, Casilla as CasillaKit } from '@/shared/ui/kit';
import { abInfo } from '@/features/reglas/data/caracteristicas';
import { setVal } from '../../acciones';

/** Guarda con el evento `change` nativo (al salir del campo o con Enter), sin redibujar en cada tecla. */
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

export function CampoTexto({ path, value, className, ...rest }: Base & { path: string; value: any }) {
  const ref = useCambio<HTMLInputElement>(el => setVal(path, el.value));
  return <input key={String(value ?? '')} ref={ref} type="text" defaultValue={value ?? ''} className={cx(claseCampo, className)} {...rest} />;
}

export function CampoNumero({ path, value, className, ...rest }: Base & { path: string; value: any }) {
  const ref = useCambio<HTMLInputElement>(el => setVal(path, +el.value));
  return <input key={String(value ?? '')} ref={ref} type="number" inputMode="numeric" defaultValue={value ?? ''} className={cx(claseCampo, className)} {...rest} />;
}

export function CampoArea({ path, value, rows = 3, placeholder, ...rest }: { path: string; value: any; rows?: number; placeholder?: string; id?: string; 'aria-label'?: string; 'aria-describedby'?: string }) {
  const ref = useCambio<HTMLTextAreaElement>(el => setVal(path, el.value));
  return <textarea key={String(value ?? '')} ref={ref} rows={rows} placeholder={placeholder} {...rest} defaultValue={value ?? ''} className={cx(claseCampo, 'py-2')} />;
}

export function Selector({ path, value, num, children, className, ...rest }: { path: string; value: any; num?: boolean; children: ReactNode; className?: string; id?: string; 'aria-label'?: string; 'aria-describedby'?: string }) {
  return <select value={value ?? ''} onChange={e => setVal(path, num ? +e.target.value : e.target.value)} className={cx(claseCampo, 'cursor-pointer', className)} {...rest}>{children}</select>;
}

export function Casilla({ path, checked, children }: { path: string; checked: boolean; children: ReactNode }) {
  return <CasillaKit checked={!!checked} onChange={v => setVal(path, v)}>{children}</CasillaKit>;
}

/** Selector de característica. */
export function AbSel({ path, value, opts, vacia = 'Elige…', ...rest }: { path: string; value: any; opts: string[]; vacia?: string; id?: string; 'aria-label'?: string; 'aria-describedby'?: string }) {
  return (
    <Selector path={path} value={value} {...rest}>
      <option value="">{vacia}</option>
      {opts.map(k => <option key={k} value={k}>{abInfo(k)[3]}</option>)}
    </Selector>
  );
}
