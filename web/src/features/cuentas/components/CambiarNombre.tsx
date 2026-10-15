'use client';
import { useId, useState } from 'react';
import { avisar } from '@/shared/ui/avisos';
import { Boton, Campo, claseCampo } from '@/shared/ui/kit';
import { S, render } from '@/app-shell/estado';
import { cambiarNombre } from '../api';
import { ponerJugador } from '@/features/personajes/acciones';

/** El nombre de jugador de la cuenta: sale en las mesas y se pone solo en el campo Jugador de tus hojas. Va en el menú. */
export function CambiarNombre({ alTerminar }: { alTerminar?: () => void }) {
  const id = useId();
  const [enviando, setEnviando] = useState(false);
  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nombre = String(new FormData(e.currentTarget).get('nombre') || '');
    setEnviando(true);
    try {
      const nuevo = await cambiarNombre(nombre);
      if (S.usuario) S.usuario.nombre = nuevo;
      ponerJugador();
      avisar('Nombre cambiado.');
      render();
      alTerminar?.();
    }
    catch (err) { avisar((err as Error).message, 'error'); }
    finally { setEnviando(false); }
  };
  return (
    <form onSubmit={enviar} className="grid gap-3">
      <Campo etiqueta="Nombre de jugador"><input id={id} name="nombre" defaultValue={S.usuario?.nombre || ''} autoComplete="nickname" minLength={2} maxLength={40} required className={claseCampo} /></Campo>
      <div className="flex justify-end"><Boton type="submit" variante="primario" disabled={enviando}>{enviando ? 'Un momento…' : 'Guardar nombre'}</Boton></div>
    </form>
  );
}
