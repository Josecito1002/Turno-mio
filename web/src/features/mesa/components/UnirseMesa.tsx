'use client';
import { useCallback, useEffect, useId, useState, type FormEvent } from 'react';
import { S, esInvitado, render } from '@/app-shell/estado';
import { entrarCombate } from '@/features/personajes/acciones';
import { abrirCompanero } from '@/features/personajes/acciones-compartir';
import { vaciarPendientes } from '@/app-shell/almacen';
import { avisar } from '@/shared/ui/avisos';
import { confirmar } from '@/shared/ui/confirmar';
import { Aviso, Boton, EncabezadoPagina, Campo, Fila, Lista, Nota, PanelPestana, Pestanas, Seccion, Tarjeta, claseCampo, cx } from '@/shared/ui/kit';
import { compute } from '@/features/personajes/domain/calculo';
import { reparar } from '@/features/personajes/domain/modelo';
import { AB, SKILLS } from '@/features/reglas/data/caracteristicas';
import { norm, sign } from '@/shared/utils/texto';
import { companerosMesa, hojaCompaneroMesa, misMesas, salirMesa, unirseMesa, type CompaneroMesa, type MesaUnida } from '../api';

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
              <span className="flex gap-2">
                <Boton tamano="sm" variante="primario" onClick={() => entrarCombate(m)}>Combate</Boton>
                <Boton tamano="sm" variante="peligro" onClick={() => salir(m)}>Salir</Boton>
              </span>
            </Fila>
          ))}
        </Lista>
      )}
    </Seccion>
  );
}

type Campana = { dmId: string; campanaId: string; mesa: string; dm: string; descripcion?: string | null; imagen?: string | null; activo?: boolean | null; mios: MesaUnida[] };

/** Agrupa las mesas por campaña; primero la que tiene un combate en marcha y luego las más recientes. */
function campanasDe(mesas: MesaUnida[]): Campana[] {
  const por = new Map<string, Campana>();
  for (const m of mesas) {
    const k = `${m.dmId}|${m.campanaId}`, c = por.get(k);
    if (c) c.mios.push(m); else por.set(k, { dmId: m.dmId, campanaId: m.campanaId, mesa: m.mesa, dm: m.dm, descripcion: m.descripcion, imagen: m.imagen, activo: m.activo, mios: [m] });
  }
  return [...por.values()].reverse().sort((a, b) => Number(!!b.activo) - Number(!!a.activo));
}

/** Un resumen muy corto de un personaje de la campaña: estadísticas, salvaciones y habilidades (no es la hoja completa). */
function ResumenPersonaje({ dmId, campanaId, personajeId }: { dmId: string; campanaId: string; personajeId: string }) {
  const [c, setC] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState('');
  useEffect(() => {
    let vivo = true;
    hojaCompaneroMesa(dmId, campanaId, personajeId).then(d => { if (vivo) { if (d) setC(compute(reparar(JSON.parse(JSON.stringify(d))))); else setError('Ese personaje ya no está disponible.'); } }, (e: Error) => { if (vivo) setError(e.message); });
    return () => { vivo = false; };
  }, [dmId, campanaId, personajeId]);
  if (error) return <p className="m-0 basis-full text-sm text-error">{error}</p>;
  if (!c) return <p className="m-0 basis-full text-sm text-muted">Cargando…</p>;
  const stats: [string | number, string][] = [
    [c.ac, 'CA'], [c.hpMax, 'PG máx.'], [sign(c.init), 'Iniciativa'], [c.speed, 'Pies'], [sign(c.pb), 'Competencia'], [c.passive, 'Percep. pasiva'],
    ...(c.dcSpell ? [[c.dcSpell, 'CD conjuros'] as [number, string]] : []),
  ];
  return (
    <div className="grid basis-full gap-2 rounded-lg bg-surface-container-low p-2">
      <dl className="m-0 grid grid-cols-4 gap-1.5">
        {stats.map(([x, t]) => <div key={t} className="flex flex-col-reverse rounded bg-surface-container px-1 py-1 text-center"><dt className="text-[0.65rem] text-muted">{t}</dt><dd className="m-0 font-serif text-lg font-extrabold">{x}</dd></div>)}
      </dl>
      <ul className="m-0 grid list-none grid-cols-3 gap-1.5 p-0 text-center text-sm">
        {AB.map(([k, , corto]) => (
          <li key={k} className="rounded bg-surface-container px-1 py-1"><b>{corto}</b> {sign(c.m[k])}<span className="block text-[0.65rem] text-muted">Salv. {sign(c.saves[k])}{c.saveProf.includes(k) ? ' ★' : ''}</span></li>
        ))}
      </ul>
      <ul className="m-0 grid list-none grid-cols-2 gap-x-3 gap-y-0.5 p-0 text-sm" aria-label="Habilidades">
        {SKILLS.map(([n]) => {
          const k = norm(n);
          return <li key={n} className={cx('flex justify-between', c.skillProf[k] ? 'font-bold' : 'text-muted')}><span>{c.skillProf[k] ? '★ ' : ''}{n}</span><span>{sign(c.skill[k])}</span></li>;
        })}
      </ul>
    </div>
  );
}

function FilaCompanero({ c, p, mio }: { c: Campana; p: CompaneroMesa; mio: boolean }) {
  const [abierto, setAbierto] = useState(false);
  // Tu personaje va primero y su resumen siempre está abierto
  const ver = mio || abierto;
  return (
    <Fila className="flex-col items-stretch! gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span><b className="font-serif">{p.nombre}</b> <span className="text-sm text-muted">{p.resumen || ''}</span>{mio && <span className="ml-2 rounded bg-primary-container px-1.5 py-0.5 text-xs font-bold text-on-primary-container">Tu personaje</span>}</span>
        <span className="flex gap-2">
          {!mio && <Boton tamano="sm" aria-expanded={abierto} onClick={() => setAbierto(a => !a)}>{abierto ? 'Ocultar resumen' : 'Resumen'}</Boton>}
          <Boton tamano="sm" variante="primario" onClick={() => abrirCompanero(c.dmId, c.campanaId, p.personajeId, p.jugador)}>Ver hoja</Boton>
        </span>
      </div>
      {ver && <ResumenPersonaje dmId={c.dmId} campanaId={c.campanaId} personajeId={p.personajeId} />}
    </Fila>
  );
}

const imagenOk = (u?: string | null) => (u && /^https:\/\//i.test(u) ? u : '');

function CampanaAbierta({ c }: { c: Campana }) {
  const [comp, setComp] = useState<CompaneroMesa[] | null>(null);
  const [error, setError] = useState('');
  useEffect(() => { companerosMesa(c.dmId, c.campanaId).then(setComp, (e: Error) => setError(e.message)); }, [c.dmId, c.campanaId]);
  const img = imagenOk(c.imagen);
  const tab = S.campJTab;
  const esMio = (p: CompaneroMesa) => c.mios.some(m => m.personajeId === p.personajeId);
  return (
    <>
      <EncabezadoPagina id="titulo-vista" titulo={c.mesa} subtitulo={`DM: ${c.dm}`}>
        <Boton variante="fantasma" onClick={() => { S.campJ = null; render(); }}>← Todas las campañas</Boton>
      </EncabezadoPagina>
      {img && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={img} alt="" className="mb-3 max-h-48 w-full rounded-xl object-cover" />
      )}
      {c.descripcion && <p className="mb-3 mt-0 whitespace-pre-line text-muted">{c.descripcion}</p>}
      <Pestanas idBase="campj" etiqueta="Secciones de la campaña" activa={tab} onCambiar={k => { S.campJTab = k as 'personajes' | 'combate'; render(); }}
        items={[{ id: 'personajes', texto: 'Personajes' }, { id: 'combate', texto: c.activo ? 'Combate · en marcha' : 'Combate' }]} />
      <PanelPestana idBase="campj" activa={tab}>
        {tab === 'personajes' ? (
          <>
            {error && <Aviso tipo="error" titulo="No se pudieron cargar los personajes">{error}</Aviso>}
            {comp && comp.length > 0 && (
              <Lista etiqueta="Personajes de la campaña" className="mt-3">
                {[...comp].sort((x, y) => Number(esMio(y)) - Number(esMio(x))).map(p => <FilaCompanero key={p.personajeId + p.jugador} c={c} p={p} mio={esMio(p)} />)}
              </Lista>
            )}
            {!comp && !error && <Nota className="mt-3">Cargando…</Nota>}
          </>
        ) : (
          <div className="mt-3 grid gap-3">
            <p className="m-0 text-muted">{c.activo ? 'Tu DM tiene un combate en marcha.' : 'Cuando tu DM empiece un combate, aquí entras con tu personaje.'}</p>
            <Lista etiqueta="Entrar al combate con">
              {c.mios.map(m => (
                <Fila key={m.personajeId}>
                  <span><b className="font-serif">{m.personaje}</b></span>
                  <Boton tamano="sm" variante="primario" onClick={() => entrarCombate(m)}>Entrar al combate</Boton>
                </Fila>
              ))}
            </Lista>
          </div>
        )}
      </PanelPestana>
    </>
  );
}

/** La pestaña Campañas de un jugador: las campañas de sus DM (la que tiene combate primero), unirse con el código y entrar a una. */
export function MesaJugadorVista() {
  const [mesas, setMesas] = useState<MesaUnida[] | null>(null);
  const [error, setError] = useState('');
  const leer = useCallback(() => misMesas().then(m => { setMesas(m); setError(''); }).catch((e: Error) => setError(e.message)), []);
  useEffect(() => { leer(); }, [leer]);
  const camps = campanasDe(mesas || []);
  const abierta = S.campJ ? camps.find(c => c.dmId === S.campJ!.dmId && c.campanaId === S.campJ!.campanaId) : null;
  if (abierta) return <CampanaAbierta c={abierta} />;
  return (
    <>
      <EncabezadoPagina id="titulo-vista" titulo="Campañas" subtitulo="Las campañas de tus DM: ahí ves a los personajes y juegas el combate, sincronizado con tu DM." />
      {error && <Aviso tipo="error" titulo="No se pudieron cargar tus campañas" accion={<Boton tamano="sm" onClick={() => leer()}>Reintentar</Boton>}>{error}</Aviso>}
      {mesas && !camps.length && <Nota>Todavía no estás en ninguna campaña. Únete con el código que te dé tu DM.</Nota>}
      {camps.length > 0 && (
        <ul className="m-0 grid list-none gap-3 p-0">
          {camps.map(c => {
            const img = imagenOk(c.imagen);
            return (
              <li key={c.dmId + c.campanaId}>
                <Tarjeta className={cx(c.activo && 'border-l-4 border-green-400')}>
                  {img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img} alt="" className="mb-3 max-h-40 w-full rounded-xl object-cover" />
                  )}
                  <h2 className="m-0 font-serif text-xl font-bold">{c.mesa}{c.activo && <span className="ml-2 text-sm font-semibold text-green-400">Combate en marcha</span>}</h2>
                  <p className="m-0 text-sm text-muted">DM: {c.dm} · con {c.mios.map(m => m.personaje).join(', ')}</p>
                  {c.descripcion && <p className="mb-0 mt-2 whitespace-pre-line text-muted">{c.descripcion}</p>}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Boton variante="primario" onClick={() => { S.campJ = { dmId: c.dmId, campanaId: c.campanaId }; S.campJTab = 'personajes'; render(); }}>Ver campaña</Boton>
                    <Boton variante="peligro" tamano="sm" onClick={async () => { for (const m of c.mios) await salirDe(m, leer); }}>Salir</Boton>
                  </div>
                </Tarjeta>
              </li>
            );
          })}
        </ul>
      )}
      <Seccion titulo="Unirme a una campaña" descripcion="Con el código que te dé tu DM: verá tu hoja al día mientras juegan. Tu hoja sigue siendo tuya.">
        <Tarjeta><UnirseMesa alUnirse={() => leer()} /></Tarjeta>
      </Seccion>
    </>
  );
}

async function salirDe(m: MesaUnida, despues: () => void) {
  if (!(await confirmar({ titulo: `¿Sacar a ${m.personaje} de «${m.mesa}»?`, texto: 'Tu DM dejará de ver su hoja. Puedes volver a unirte con el código.', si: 'Salir de la campaña' }))) return;
  try { await salirMesa(m); avisar(`${m.personaje} ya no está en «${m.mesa}».`); despues(); }
  catch (e) { avisar(`No se pudo salir: ${(e as Error).message}`, 'error'); }
}
