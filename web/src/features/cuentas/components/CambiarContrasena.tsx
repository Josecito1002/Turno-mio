'use client';
import { useId, useState } from 'react';
import { avisar } from '@/shared/ui/avisos';
import { Boton, Campo, Plegable, claseCampo } from '@/shared/ui/kit';
import { cambiarContrasena } from '../api';

/** Cambiar la contraseña propia (por ejemplo, después de que el administrador la restableció). */
export function CambiarContrasena() {
  const id = useId();
  const [enviando, setEnviando] = useState(false);
  const [clave, setClave] = useState(0); // cambiarla vacía los campos
  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const actual = String(fd.get('actual') || ''), nueva = String(fd.get('nueva') || ''), otra = String(fd.get('otra') || '');
    if (nueva !== otra) { avisar('Las dos contraseñas nuevas no coinciden.', 'aviso'); return; }
    setEnviando(true);
    try { await cambiarContrasena(actual, nueva); avisar('Contraseña cambiada.'); setClave(k => k + 1); }
    catch (err) { avisar((err as Error).message, 'error'); }
    finally { setEnviando(false); }
  };
  return (
    <Plegable titulo="Cambiar mi contraseña" className="mt-8">
      <form key={clave} onSubmit={enviar} className="grid gap-3 px-4 pb-4 sm:grid-cols-3">
        <Campo etiqueta="Contraseña actual"><input id={id + 'a'} name="actual" type="password" autoComplete="current-password" required className={claseCampo} /></Campo>
        <Campo etiqueta="Nueva (mínimo 8)"><input id={id + 'n'} name="nueva" type="password" autoComplete="new-password" minLength={8} required className={claseCampo} /></Campo>
        <Campo etiqueta="Repite la nueva"><input id={id + 'o'} name="otra" type="password" autoComplete="new-password" minLength={8} required className={claseCampo} /></Campo>
        <div className="sm:col-span-3"><Boton type="submit" variante="primario" disabled={enviando}>{enviando ? 'Un momento…' : 'Cambiar contraseña'}</Boton></div>
      </form>
    </Plegable>
  );
}
