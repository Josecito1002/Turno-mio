'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { Simbolo, cx } from './kit';

/** Aviso en pantalla completa, como el de subir de nivel. Amarillo si trata de una salvación, celeste si es algo con lo que
 *  se puede seguir (lo que se suma o la acción que sigue a un ataque que acertó). */
export const TONO_POPUP = {
  salvacion: { caja: 'bg-adi/20', icono: 'text-adi' },
  seguimiento: { caja: 'bg-rea/20', icono: 'text-rea' },
} as const;
export type TonoPopup = keyof typeof TONO_POPUP;

export function PopupGrande({ abierto, tono, icono, titulo, texto, children }: { abierto: boolean; tono: TonoPopup; icono?: string; titulo: ReactNode; texto?: ReactNode; children?: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current; if (!d) return;
    if (abierto && !d.open) d.showModal();
    if (!abierto && d.open) d.close();
  }, [abierto]);
  const t = TONO_POPUP[tono];
  return (
    <dialog ref={ref} aria-label="Aviso" onCancel={e => e.preventDefault()}
      className="m-0 h-dvh max-h-none w-screen max-w-none overflow-auto bg-bg p-0 text-ink backdrop:bg-black/70 print:hidden">
      {abierto && (
        <div className="mx-auto grid min-h-full max-w-xl content-center gap-4 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <div className={cx('rounded-3xl p-6 text-center', t.caja)}>
            <Simbolo n={icono || (tono === 'salvacion' ? 'shield' : 'bolt')} className={cx('text-6xl', t.icono)} />
            <h2 className="m-0 mt-2 font-serif text-3xl font-extrabold">{titulo}</h2>
            {texto && <p className="m-0 mt-2 text-lg">{texto}</p>}
          </div>
          {children}
        </div>
      )}
    </dialog>
  );
}
