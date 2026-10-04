'use client';
import { useCallback, useEffect, useId, useState, type FormEvent } from 'react';
import { S, esInvitado } from '@/app-shell/estado';
import { vaciarPendientes } from '@/app-shell/almacen';
import { avisar } from '@/shared/ui/avisos';
import { confirmar } from '@/shared/ui/confirmar';
import { slug } from '@/shared/utils/texto';
import { Aviso, Boton, Campo, Fila, Lista, Nota, Seccion, claseCampo } from '@/shared/ui/kit';
import { compartidoCon, compartidosConmigo, compartirPersonaje, dejarDeCompartir, descartarCompartido, type PersonajeAjeno } from '../api';
import { abrirAjeno, cerrarAjeno, copiarAjeno } from '../acciones-compartir';
import { bajarArchivo } from '../acciones';
import { Ficha } from './ficha/Ficha';

const esperar = (ms: number) => new Promise(r => setTimeout(r, ms));

/** En el menú de la hoja: compartir el personaje abierto con otra cuenta, y ver o quitar con quién está compartido. */
export function CompartirPersonaje({ id, nombre }: { id: string; nombre: string }) {
  const idCampo = useId();
  const [con, setCon] = useState('');
  const [lista, setLista] = useState<{ id: string; nombre: string }[] | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const leer = useCallback(() => compartidoCon(id).then(setLista).catch(() => setLista([])), [id]);
  useEffect(() => { leer(); }, [leer]);

  const compartir = async (e: FormEvent) => {
    e.preventDefault();
    if (!con.trim()) return;
    setEnviando(true); setError('');
    try {
      let otra;
      try { otra = await compartirPersonaje(id, con); }
      catch (err) {
        // Un personaje recién creado puede no haber llegado al servidor: se envía ya y se reintenta una vez
        if (!/no se guard/i.test((err as Error).message)) throw err;
        vaciarPendientes(); await esperar(1500);
        otra = await compartirPersonaje(id, con);
      }
      avisar(`${nombre} quedó compartido con ${otra.nombre}. Lo verá en su lista de personajes y podrá copiarlo.`);
      setCon(''); leer();
    } catch (err) { setError((err as Error).message); }
    finally { setEnviando(false); }
  };

  const quitar = async (c: { id: string; nombre: string }) => {
    try { await dejarDeCompartir(id, c.id); avisar(`${c.nombre} ya no ve a ${nombre}. Si ya lo había copiado, su copia sigue siendo suya.`); leer(); }
    catch (err) { avisar(`No se pudo quitar: ${(err as Error).message}`, 'error'); }
  };

  return (
    <div className="grid gap-4">
      <form onSubmit={compartir} className="flex flex-wrap items-end gap-3">
        <Campo etiqueta="Nombre o correo del otro jugador" ayuda="El nombre tiene que ser exacto, como aparece en su cuenta." className="min-w-56 flex-1">
          <input id={idCampo} type="text" value={con} onChange={e => setCon(e.target.value)} autoComplete="off" className={claseCampo} />
        </Campo>
        <Boton type="submit" variante="primario" disabled={enviando || !con.trim()}>{enviando ? 'Compartiendo…' : 'Compartir'}</Boton>
      </form>
      {error && <Aviso tipo="error" titulo="No se pudo compartir">{error}</Aviso>}
      {lista && lista.length > 0 && (
        <div>
          <p className="m-0 mb-1 text-sm font-bold">Compartido con</p>
          <Lista etiqueta={`Con quién está compartido ${nombre}`}>
            {lista.map(c => (
              <Fila key={c.id}>
                <span>{c.nombre}</span>
                <Boton tamano="sm" variante="fantasma" onClick={() => quitar(c)} aria-label={`Dejar de compartir con ${c.nombre}`}>Dejar de compartir</Boton>
              </Fila>
            ))}
          </Lista>
        </div>
      )}
      <Nota className="m-0">La otra persona ve la hoja tal como está ahora y puede copiarla a su cuenta. Su copia es independiente: lo que cambie no toca tu personaje.</Nota>
    </div>
  );
}

/** En la lista de personajes: los que otros jugadores compartieron contigo. */
export function CompartidosConmigo() {
  const [lista, setLista] = useState<PersonajeAjeno[] | null>(null);
  const [ocupado, setOcupado] = useState('');
  const leer = useCallback(() => compartidosConmigo().then(setLista).catch(() => setLista([])), []);
  useEffect(() => { if (!esInvitado()) leer(); }, [leer]);
  if (esInvitado() || !lista?.length) return null;

  const copiar = async (p: PersonajeAjeno) => { setOcupado(p.id); await copiarAjeno(p); setOcupado(''); };
  const descartar = async (p: PersonajeAjeno) => {
    if (!(await confirmar({ titulo: `¿Quitar a ${p.nombre} de tu lista?`, si: 'Quitar',
      texto: `Deja de aparecer aquí. El personaje sigue siendo de ${p.jugador}, y si ya lo copiaste, tu copia no cambia.` }))) return;
    try { await descartarCompartido(p); leer(); } catch (e) { avisar(`No se pudo quitar: ${(e as Error).message}`, 'error'); }
  };

  return (
    <Seccion titulo="Compartidos contigo" descripcion="Personajes que otros jugadores te compartieron. Puedes ver su hoja o copiarlos a tu cuenta.">
      <Lista etiqueta="Personajes compartidos contigo">
        {lista.map(p => (
          <Fila key={`${p.usuarioId}:${p.id}`}>
            <span className="min-w-0">
              <b className="block">{p.nombre}</b>
              <span className="block text-sm text-muted">{p.resumen || 'Sin clase todavía'} · de {p.jugador}</span>
            </span>
            <span className="flex flex-wrap justify-end gap-2">
              <Boton tamano="sm" onClick={() => abrirAjeno(p, 'home')} aria-label={`Ver la hoja de ${p.nombre}`}>Ver hoja</Boton>
              <Boton tamano="sm" variante="primario" disabled={ocupado === p.id} onClick={() => copiar(p)} aria-label={`Copiar a ${p.nombre} a tu cuenta`}>
                {ocupado === p.id ? 'Copiando…' : 'Copiar a mi cuenta'}
              </Boton>
              <Boton tamano="sm" variante="fantasma" onClick={() => descartar(p)} aria-label={`Quitar a ${p.nombre} de tu lista`}>Quitar</Boton>
            </span>
          </Fila>
        ))}
      </Lista>
    </Seccion>
  );
}

/** La hoja de otra cuenta, sin poder tocarla, con la opción de copiarla. */
export function HojaAjena() {
  const a = S.ajeno;
  const [copiando, setCopiando] = useState(false);
  if (!a) return null;
  const nombre = a.pj.nombre || 'Sin nombre';
  const copiar = async () => { setCopiando(true); if (!(await copiarAjeno(a))) setCopiando(false); };
  return (
    <>
      <div className="sticky top-[var(--alto-cabecera,0px)] z-[6] flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-rule/60 bg-bg/95 px-4 py-2 backdrop-blur print:hidden lg:px-6">
        <Boton tamano="sm" variante="fantasma" onClick={cerrarAjeno}>← Volver</Boton>
        <p id="titulo-vista" tabIndex={-1} className="m-0 flex-1 text-sm outline-none"><b>{nombre}</b> <span className="text-muted">· de {a.jugador} · solo lectura</span></p>
        <Boton tamano="sm" variante="fantasma" onClick={() => bajarArchivo(slug(nombre) + '.json', JSON.stringify(a.pj, null, 1))}>Descargar hoja</Boton>
        <Boton tamano="sm" variante="primario" disabled={copiando} onClick={copiar}>{copiando ? 'Copiando…' : 'Copiar a mi cuenta'}</Boton>
      </div>
      <Ficha c={a.c} lectura />
    </>
  );
}
