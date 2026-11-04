'use client';
/* Portada de los sorteos: crear una sala nueva o entrar a una con su código. */
import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { avisar } from '@/shared/ui/avisos';
import { Boton, Campo, Tarjeta, claseCampo, Simbolo } from '@/shared/ui/kit';
import { crearSala, guardarNombre, guardarSecreto, miNombre, miVisitante } from '../api';
import { LARGO_CODIGO, LARGO_NOMBRE, normalizarCodigo } from '../domain/sorteo';

export function EntrarSorteo({ nombreCuenta }: { nombreCuenta?: string }) {
  const router = useRouter();
  const [quien, setQuien] = useState('');
  const [sala, setSala] = useState('');
  const [codigo, setCodigo] = useState('');
  const [creando, setCreando] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setQuien(miNombre() || nombreCuenta || ''); }, [nombreCuenta]);

  const crear = async (e: FormEvent) => {
    e.preventDefault();
    const n = quien.trim();
    if (!n) return;
    setCreando(true);
    try {
      guardarNombre(n);
      const r = await crearSala({ visitante: miVisitante(), quien: n }, sala.trim() || undefined);
      guardarSecreto(r.codigo, r.secreto);
      router.push('/sorteo/' + r.codigo);
    } catch (err) {
      avisar((err as Error).message || 'No se pudo crear la sala', 'error');
      setCreando(false);
    }
  };
  const unirse = (e: FormEvent) => {
    e.preventDefault();
    const c = normalizarCodigo(codigo);
    if (c.length === LARGO_CODIGO) router.push('/sorteo/' + c);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Tarjeta as="section">
        <form onSubmit={crear} className="flex flex-col gap-4">
          <h2 className="m-0 font-serif text-2xl font-extrabold">Crear una sala</h2>
          <Campo etiqueta="Tu nombre">
            <input className={claseCampo} value={quien} maxLength={LARGO_NOMBRE} onChange={e => setQuien(e.target.value)} />
          </Campo>
          <Campo etiqueta="Nombre de la sala (opcional)" ayuda="Por ejemplo «¿Quién trae las pizzas?»">
            <input className={claseCampo} value={sala} maxLength={LARGO_NOMBRE} onChange={e => setSala(e.target.value)} />
          </Campo>
          <Boton type="submit" variante="primario" disabled={creando || !quien.trim()}>
            <Simbolo n="add" className="text-[20px]" />{creando ? 'Creando…' : 'Crear sala'}
          </Boton>
        </form>
      </Tarjeta>
      <Tarjeta as="section">
        <form onSubmit={unirse} className="flex flex-col gap-4">
          <h2 className="m-0 font-serif text-2xl font-extrabold">Entrar con un código</h2>
          <Campo etiqueta="Código de la sala" ayuda="Son 6 letras y números. También puedes abrir el enlace que te pasaron.">
            <input className={claseCampo + ' uppercase tracking-widest'} value={codigo} maxLength={12} autoCapitalize="characters"
              onChange={e => setCodigo(e.target.value)} />
          </Campo>
          <Boton type="submit" disabled={normalizarCodigo(codigo).length !== LARGO_CODIGO}>Entrar</Boton>
        </form>
      </Tarjeta>
    </div>
  );
}
