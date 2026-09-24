'use client';
import { useSyncExternalStore } from 'react';
import { Boton, Dialogo } from './kit';

/*
 * Confirmaciones con la interfaz de la app, en lugar del confirm() del navegador.
 * Uso: if (!(await confirmar({ titulo: '¿Quitar…?', texto: '…', si: 'Quitar', peligro: true }))) return;
 * <DialogoConfirmar /> va montado una sola vez en la app.
 */
type Pregunta = { titulo: string; texto?: string; si?: string; no?: string; peligro?: boolean };
type Pendiente = Pregunta & { responder: (v: boolean) => void };

let actual: Pendiente | null = null;
const oyentes = new Set<() => void>();
const avisarCambio = () => oyentes.forEach(f => f());

export function confirmar(p: Pregunta): Promise<boolean> {
  // Si ya había una pregunta abierta, se da por cancelada
  actual?.responder(false);
  return new Promise(resolve => {
    actual = { ...p, responder: v => { actual = null; avisarCambio(); resolve(v); } };
    avisarCambio();
  });
}

const suscribir = (f: () => void) => { oyentes.add(f); return () => { oyentes.delete(f); }; };
const leer = () => actual;

export function DialogoConfirmar() {
  const p = useSyncExternalStore(suscribir, leer, () => null);
  return (
    <Dialogo abierto={!!p} onCerrar={() => p?.responder(false)} titulo={p?.titulo || ''}>
      {p?.texto && <p className="m-0">{p.texto}</p>}
      <div className="mt-5 flex flex-wrap justify-end gap-2">
        <Boton onClick={() => p?.responder(false)}>{p?.no || 'Cancelar'}</Boton>
        <Boton variante={p?.peligro ? 'peligro' : 'primario'} onClick={() => p?.responder(true)}>{p?.si || 'Aceptar'}</Boton>
      </div>
    </Dialogo>
  );
}
