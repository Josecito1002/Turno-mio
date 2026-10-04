'use client';
import { useEffect, useId, useState } from 'react';
import { S, esInvitado } from '@/app-shell/estado';
import { vaciarPendientes } from '@/app-shell/almacen';
import { avisar } from '@/shared/ui/avisos';
import { confirmar } from '@/shared/ui/confirmar';
import { slug } from '@/shared/utils/texto';
import { Aviso, Boton, Casilla, Nota, claseCampo } from '@/shared/ui/kit';
import { crearEnlace, enlaceDe, quitarEnlace, type Enlace } from '../api';
import { cerrarAjeno, copiarAjeno } from '../acciones-compartir';
import { bajarArchivo } from '../acciones';
import { Ficha } from './ficha/Ficha';

const esperar = (ms: number) => new Promise(r => setTimeout(r, ms));
const urlDe = (token: string) => `${window.location.origin}/p/${token}`;

/** En el menú de la hoja: el enlace para compartir el personaje abierto. */
export function CompartirPersonaje({ id, nombre }: { id: string; nombre: string }) {
  const idUrl = useId();
  const [enlace, setEnlace] = useState<Enlace | null | undefined>(undefined);
  const [copiar, setCopiar] = useState(true);
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    enlaceDe(id).then(e => { setEnlace(e); if (e) setCopiar(e.permiteCopiar); }).catch((e: Error) => setError(e.message));
  }, [id]);

  const guardar = async (permite: boolean, nuevo = false) => {
    setOcupado(true); setError('');
    try {
      let e: Enlace;
      try { e = await crearEnlace(id, permite, nuevo); }
      catch (err) {
        // Un personaje recién creado puede no haber llegado al servidor: se envía ya y se reintenta una vez
        if (!/no se guard/i.test((err as Error).message)) throw err;
        vaciarPendientes(); await esperar(1500);
        e = await crearEnlace(id, permite, nuevo);
      }
      setEnlace(e); setCopiar(e.permiteCopiar);
      return e;
    } catch (err) { setError((err as Error).message); return null; }
    finally { setOcupado(false); }
  };

  const copiarAlPortapapeles = async (e: Enlace) => {
    try { await navigator.clipboard.writeText(urlDe(e.token)); avisar('Enlace copiado. Pégalo donde quieras compartirlo.'); }
    catch { avisar('No se pudo copiar solo: selecciona el enlace y cópialo.', 'aviso'); }
  };
  const crear = async () => { const e = await guardar(copiar); if (e) copiarAlPortapapeles(e); };
  const cambiarCopiar = (v: boolean) => { setCopiar(v); if (enlace) guardar(v); };
  const nuevo = async () => {
    if (!(await confirmar({ titulo: '¿Cambiar el enlace?', si: 'Cambiar enlace', texto: 'El enlace anterior deja de servir. Tendrás que pasar el nuevo.' }))) return;
    const e = await guardar(copiar, true); if (e) avisar('Enlace cambiado. El anterior ya no sirve.');
  };
  const desactivar = async () => {
    if (!(await confirmar({ titulo: '¿Desactivar el enlace?', si: 'Desactivar', peligro: true,
      texto: 'Quien lo tenga ya no podrá abrir la hoja. Las copias que ya se hayan hecho siguen siendo de quien las hizo.' }))) return;
    setOcupado(true);
    try { await quitarEnlace(id); setEnlace(null); avisar('Enlace desactivado.'); }
    catch (err) { setError((err as Error).message); }
    finally { setOcupado(false); }
  };

  if (esInvitado()) return <Nota className="m-0">Para compartir un enlace necesitas una cuenta. Mientras tanto, puedes usar «Descargar respaldo» y pasar el archivo.</Nota>;
  if (enlace === undefined && !error) return <Nota className="m-0">Cargando…</Nota>;

  return (
    <div className="grid gap-4">
      <Casilla checked={copiar} onChange={cambiarCopiar} disabled={ocupado}
        nota={copiar ? 'Quien abra el enlace puede ver la hoja y guardar una copia para él.' : 'Quien abra el enlace solo puede ver la hoja.'}>
        Permitir que hagan una copia
      </Casilla>
      {enlace ? (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor={idUrl} className="sr-only">Enlace de {nombre}</label>
            <input id={idUrl} type="text" readOnly value={urlDe(enlace.token)} onFocus={e => e.target.select()} className={`${claseCampo} min-w-56 flex-1 font-mono text-sm`} />
            <Boton variante="primario" onClick={() => copiarAlPortapapeles(enlace)}>Copiar enlace</Boton>
          </div>
          <div className="flex flex-wrap gap-2">
            <Boton tamano="sm" variante="fantasma" disabled={ocupado} onClick={nuevo}>Cambiar enlace</Boton>
            <Boton tamano="sm" variante="peligro" disabled={ocupado} onClick={desactivar}>Desactivar enlace</Boton>
          </div>
        </>
      ) : (
        <div><Boton variante="primario" disabled={ocupado} onClick={crear}>{ocupado ? 'Creando…' : 'Crear enlace'}</Boton></div>
      )}
      {error && <Aviso tipo="error" titulo="No se pudo">{error}</Aviso>}
      <Nota className="m-0">Cualquiera con el enlace puede abrirlo, aunque no tenga cuenta, y ve la hoja siempre al día. Una copia es independiente: lo que cambie en ella no toca tu personaje.</Nota>
    </div>
  );
}

/** La hoja de otra persona, sin poder tocarla, con la opción de copiarla si se permite. */
export function HojaAjena() {
  const a = S.ajeno;
  if (!a) return null;
  const nombre = a.pj.nombre || 'Sin nombre';
  const invitado = esInvitado();
  const volverLogin = typeof window !== 'undefined' ? encodeURIComponent(window.location.pathname) : '';
  return (
    <>
      <div className="sticky top-[var(--alto-cabecera,0px)] z-[6] flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-rule/60 bg-bg/95 px-4 py-2 backdrop-blur print:hidden lg:px-6">
        <Boton tamano="sm" variante="fantasma" onClick={cerrarAjeno}>← {a.volver === 'cuentas' ? 'Cuentas' : 'Mis personajes'}</Boton>
        <p id="titulo-vista" tabIndex={-1} className="m-0 flex-1 text-sm outline-none"><b>{nombre}</b> <span className="text-muted">· de {a.jugador} · solo lectura</span></p>
        {a.permiteCopiar && (
          <>
            <Boton tamano="sm" variante="fantasma" onClick={() => bajarArchivo(slug(nombre) + '.json', JSON.stringify(a.pj, null, 1))}>Descargar hoja</Boton>
            <Boton tamano="sm" variante="primario" onClick={copiarAjeno}>{invitado ? 'Guardar una copia aquí' : 'Copiar a mi cuenta'}</Boton>
          </>
        )}
      </div>
      {a.permiteCopiar && invitado && /^\/p\//.test(typeof window !== 'undefined' ? window.location.pathname : '') && (
        <p className="m-0 bg-surface-container-low px-4 py-2 text-sm text-on-surface-variant print:hidden lg:px-6">
          Sin cuenta, la copia se guarda solo en este navegador. <a href={`/login?volver=${volverLogin}`} className="font-bold text-primary underline">Inicia sesión</a> para copiarlo a tu cuenta.
        </p>
      )}
      <Ficha c={a.c} lectura />
    </>
  );
}
