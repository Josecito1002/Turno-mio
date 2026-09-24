'use client';
import { useActionState, useEffect } from 'react';
import Link from 'next/link';
import { avisar } from '@/shared/ui/avisos';
import { iniciarSesion, registrarse, type EstadoForm } from '../server/acciones';

const campo = 'min-h-[42px] w-full rounded-lg border-[1.5px] border-rule bg-surface px-3 text-ink focus-visible:outline-3 focus-visible:outline-rea';

export function FormularioCuenta({ modo }: { modo: 'login' | 'registro' }) {
  const [estado, accion, enviando] = useActionState<EstadoForm, FormData>(modo === 'login' ? iniciarSesion : registrarse, undefined);
  useEffect(() => { if (estado?.error) avisar(estado.error, 'error'); }, [estado]);
  const registro = modo === 'registro';
  return (
    <main className="mx-auto flex min-h-dvh max-w-[420px] flex-col justify-center px-4 py-10">
      <p className="font-serif text-xl font-extrabold">Mi turno</p>
      <h1 className="mb-2 mt-1 font-serif text-4xl font-extrabold leading-none">{registro ? 'Crea tu cuenta' : 'Entra a tu mesa'}</h1>
      <p className="mb-6 text-muted">
        {registro
          ? 'Tus personajes y campañas quedan guardados en tu cuenta. La biblioteca de contenido es compartida con todo el grupo.'
          : 'Tus personajes, campañas y la biblioteca del grupo te esperan.'}
      </p>
      <form action={accion} className="flex flex-col gap-3 rounded-xl bg-surface p-5 shadow-sm">
        {registro && (
          <label className="flex flex-col gap-1 font-bold">Tu nombre
            <input name="nombre" autoComplete="name" required defaultValue={estado?.nombre} className={campo} />
          </label>
        )}
        <label className="flex flex-col gap-1 font-bold">Correo
          <input name="email" type="email" autoComplete="email" required defaultValue={estado?.email} className={campo} />
        </label>
        <label className="flex flex-col gap-1 font-bold">Contraseña
          <input name="password" type="password" autoComplete={registro ? 'new-password' : 'current-password'} minLength={registro ? 8 : undefined} required className={campo} />
        </label>
        {estado?.error && <p className="m-0 border-l-4 border-warn pl-3 text-sm" role="alert">{estado.error}</p>}
        <button type="submit" disabled={enviando}
          className="mt-2 min-h-[42px] cursor-pointer rounded-lg bg-ink px-4 font-bold text-bg disabled:cursor-not-allowed disabled:opacity-50">
          {enviando ? 'Un momento…' : registro ? 'Crear cuenta' : 'Entrar'}
        </button>
      </form>
      <p className="mt-5 text-center text-muted">
        {registro ? <>¿Ya tienes cuenta? <Link href="/login" className="font-bold text-ink">Entra</Link></>
          : <>¿Primera vez? <Link href="/registro" className="font-bold text-ink">Crea una cuenta</Link></>}
      </p>
    </main>
  );
}
