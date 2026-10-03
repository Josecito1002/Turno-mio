'use client';
import { useCallback, useEffect, useId, useState, type FormEvent } from 'react';
import { S, esInvitado } from '@/app-shell/estado';
import { vaciarPendientes } from '@/app-shell/almacen';
import { avisar } from '@/shared/ui/avisos';
import { confirmar } from '@/shared/ui/confirmar';
import { Aviso, Boton, Campo, Fila, Lista, Seccion, Tarjeta, claseCampo, cx } from '@/shared/ui/kit';
import { misMesas, salirMesa, unirseMesa, type MesaUnida } from '../api';

const esperar = (ms: number) => new Promise(r => setTimeout(r, ms));

/** Une un personaje a la mesa de un DM con el código que este le dio. Sin `personajeId`, el jugador elige cuál. */
export function UnirseMesa({ personajeId, alUnirse }: { personajeId?: string; alUnirse?: (m: MesaUnida) => void }) {
  const id = useId();
  const [codigo, setCodigo] = useState('');
  const [pj, setPj] = useState(personajeId || S.list[0]?.id || '');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const limpio = codigo.toUpperCase().replace(/[^A-Z0-9]/g, '');

  const unir = async (e: FormEvent) => {
    e.preventDefault();
    if (limpio.length !== 6 || !pj) return;
    setEnviando(true); setError('');
    try {
      let m: MesaUnida;
      try { m = await unirseMesa(limpio, pj); }
      catch (err) {
        // Un personaje recién creado puede no haber llegado al servidor: se envía ya y se reintenta una vez
        if (!/no se guard/i.test((err as Error).message)) throw err;
        vaciarPendientes(); await esperar(1500);
        m = await unirseMesa(limpio, pj);
      }
      avisar(`${m.personaje} se unió a la mesa «${m.mesa}» de ${m.dm}. Tu DM ya puede ver tu hoja.`);
      setCodigo('');
      alUnirse?.(m);
    } catch (err) { setError((err as Error).message); }
    finally { setEnviando(false); }
  };

  return (
    <form onSubmit={unir} className="grid gap-3">
      <div className="flex flex-wrap items-end gap-3">
        <Campo etiqueta="Código de la mesa" ayuda="6 letras y números; te lo da tu DM." className="w-48">
          <input id={id + 'c'} type="text" value={codigo} onChange={e => setCodigo(e.target.value)} autoComplete="off" autoCapitalize="characters" spellCheck={false}
            maxLength={9} placeholder="ABC234" className={cx(claseCampo, 'font-mono text-lg uppercase tracking-[0.2em]')} />
        </Campo>
        {!personajeId && (
          <Campo etiqueta="Con qué personaje" className="min-w-48 flex-1">
            <select id={id + 'p'} value={pj} onChange={e => setPj(e.target.value)} className={claseCampo}>
              {S.list.map(p => <option key={p.id} value={p.id}>{p.name}{p.sub ? ` (${p.sub})` : ''}</option>)}
            </select>
          </Campo>
        )}
        <Boton type="submit" variante="primario" disabled={enviando || limpio.length !== 6 || !pj}>{enviando ? 'Uniendo…' : 'Unirme a la mesa'}</Boton>
      </div>
      {error && <Aviso tipo="error" titulo="No se pudo unir">{error}</Aviso>}
    </form>
  );
}

/** En la lista de personajes: unirse a una mesa y ver (o dejar) las mesas a las que ya se unió. */
export function MesasDelJugador() {
  const [mesas, setMesas] = useState<MesaUnida[] | null>(null);
  const [error, setError] = useState('');
  const leer = useCallback(() => misMesas().then(m => { setMesas(m); setError(''); }).catch((e: Error) => setError(e.message)), []);
  useEffect(() => { if (!esInvitado()) leer(); }, [leer]);

  if (esInvitado()) return (
    <Seccion titulo="Mesas de juego">
      <p className="m-0 text-muted">Para unirte a la mesa de tu DM necesitas una cuenta: así tu DM ve tu hoja siempre al día. <a href="/registro" className="font-bold text-ink underline">Crear cuenta</a></p>
    </Seccion>
  );

  const salir = async (m: MesaUnida) => {
    if (!(await confirmar({ titulo: `¿Sacar a ${m.personaje} de «${m.mesa}»?`, texto: 'Tu DM dejará de ver su hoja. Puedes volver a unirte con el código.', si: 'Salir de la mesa' }))) return;
    try { await salirMesa(m); avisar(`${m.personaje} ya no está en «${m.mesa}».`); leer(); }
    catch (e) { avisar(`No se pudo salir: ${(e as Error).message}`, 'error'); }
  };

  return (
    <Seccion titulo="Mesas de juego" descripcion="Únete a la mesa de tu DM con el código que te dé: verá tu hoja al día mientras juegan. Tu hoja sigue siendo tuya.">
      <Tarjeta><UnirseMesa alUnirse={() => leer()} /></Tarjeta>
      {error && <Aviso tipo="error" titulo="No se pudieron cargar tus mesas" accion={<Boton tamano="sm" onClick={() => leer()}>Reintentar</Boton>}>{error}</Aviso>}
      {mesas && mesas.length > 0 && (
        <Lista etiqueta="Mesas en las que estás" className="mt-3">
          {mesas.map(m => (
            <Fila key={`${m.dmId}|${m.campanaId}|${m.personajeId}`}>
              <span><b className="font-serif">{m.mesa}</b> <span className="text-sm text-muted">DM: {m.dm} · con {m.personaje}</span></span>
              <Boton tamano="sm" variante="peligro" onClick={() => salir(m)}>Salir</Boton>
            </Fila>
          ))}
        </Lista>
      )}
    </Seccion>
  );
}
