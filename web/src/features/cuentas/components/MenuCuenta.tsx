'use client';
import { useEffect, useRef, useState } from 'react';
import { Dialogo, cx, foco } from '@/shared/ui/kit';
import { cerrarSesion } from '../server/acciones';
import { CambiarContrasena } from './CambiarContrasena';

/** El nombre de la cabecera: al tocarlo abre un menú pequeño con cambiar la contraseña y salir. */
export function MenuCuenta({ nombre, email, rol }: { nombre: string; email?: string; rol: string }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const [clave, setClave] = useState(false);
  // Se cierra al tocar fuera o con Escape
  useEffect(() => {
    const fuera = (e: MouseEvent) => { const d = ref.current; if (d?.open && !d.contains(e.target as Node)) d.open = false; };
    const esc = (e: KeyboardEvent) => { const d = ref.current; if (e.key === 'Escape' && d?.open) { d.open = false; d.querySelector('summary')?.focus(); } };
    document.addEventListener('click', fuera); document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('click', fuera); document.removeEventListener('keydown', esc); };
  }, []);
  const item = cx('flex min-h-11 w-full cursor-pointer items-center rounded-lg px-3 text-left text-sm font-bold text-ink hover:bg-soft sm:min-h-9', foco);
  return (
    <>
      <details ref={ref} className="relative">
        <summary aria-label={`Tu cuenta: ${nombre}`} className={cx('flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-xl px-2 text-sm text-muted hover:bg-soft hover:text-ink sm:min-h-9 [&::-webkit-details-marker]:hidden', foco)}>
          <span className="max-w-28 truncate sm:max-w-40">{nombre}</span>
          <span className="rounded-full bg-soft px-2 py-0.5 text-xs font-bold text-ink">{rol}</span>
          <span aria-hidden="true" className="text-xs">▾</span>
        </summary>
        <div className="absolute right-0 z-30 mt-1 w-56 rounded-xl bg-surface p-1.5 shadow-lg ring-1 ring-rule">
          {email && <p className="m-0 truncate px-3 py-1.5 text-xs text-muted" title={email}>{email}</p>}
          <button type="button" className={item} onClick={() => { if (ref.current) ref.current.open = false; setClave(true); }}>Cambiar mi contraseña</button>
          <form action={cerrarSesion}><button type="submit" className={item}>Salir</button></form>
        </div>
      </details>
      <Dialogo abierto={clave} onCerrar={() => setClave(false)} titulo="Cambiar mi contraseña"
        descripcion="Si el administrador te dio una contraseña temporal, cámbiala aquí.">
        <CambiarContrasena alTerminar={() => setClave(false)} />
      </Dialogo>
    </>
  );
}
