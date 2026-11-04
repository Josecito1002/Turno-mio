'use client';
/* Una sala de sorteo: todos los que entran con el enlace ven las tiradas en vivo y quién está conectado.
   No hay tiempo real en el servidor (Vercel): cada CADA_MS la página manda un latido y recibe la sala. */
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ErrorGraphQL } from '@/shared/graphql/cliente';
import { avisar } from '@/shared/ui/avisos';
import { Boton, Campo, Casilla, Segmentado, Tarjeta, Vacio, claseCampo, cx, Simbolo } from '@/shared/ui/kit';
import { configurar, guardarNombre, latido, miNombre, miVisitante, secretoDe, tirar, type Yo } from '../api';
import { CADA_MS, LARGO_NOMBRE, MAX_OPCIONES, textoTirada, type Sala, type TipoTirada, type Tirada } from '../domain/sorteo';
import { DURACION, Dados, Moneda, Ruleta } from './Ruedas';

const DADOS_RAPIDOS = [4, 6, 8, 10, 12, 20, 100];
const ICONO: Record<TipoTirada, string> = { dados: 'casino', moneda: 'toll', ruleta: 'donut_large' };
const hora = (ts: number) => new Date(ts).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

export function SalaSorteo({ codigo, nombreCuenta }: { codigo: string; nombreCuenta?: string }) {
  const [yo, setYo] = useState<Yo | null>(null);
  const [secreto, setSecreto] = useState<string | null>(null);
  const [borrador, setBorrador] = useState('');
  const [listo, setListo] = useState(false);
  useEffect(() => {
    // El nombre y el identificador viven en este navegador (no hay cuenta que pedir)
    /* eslint-disable react-hooks/set-state-in-effect */
    const n = miNombre();
    setSecreto(secretoDe(codigo));
    if (n) setYo({ visitante: miVisitante(), quien: n });
    else setBorrador(nombreCuenta || '');
    setListo(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [codigo, nombreCuenta]);

  const entrar = (e: FormEvent) => {
    e.preventDefault();
    const n = borrador.trim().slice(0, LARGO_NOMBRE);
    if (!n) return;
    guardarNombre(n);
    setYo({ visitante: miVisitante(), quien: n });
  };

  if (!listo) return null;
  if (!yo) return (
    <Tarjeta className="mx-auto max-w-md">
      <form onSubmit={entrar} className="flex flex-col gap-4">
        <h1 className="m-0 font-serif text-2xl font-extrabold">Entrar a la sala {codigo}</h1>
        <Campo etiqueta="¿Cómo te llamas?" ayuda="Así te verán los demás en la sala.">
          <input className={claseCampo} value={borrador} maxLength={LARGO_NOMBRE} autoFocus onChange={e => setBorrador(e.target.value)} />
        </Campo>
        <Boton type="submit" variante="primario" disabled={!borrador.trim()}>Entrar</Boton>
      </form>
    </Tarjeta>
  );
  return <SalaEnVivo codigo={codigo} yo={yo} secreto={secreto} cambiarNombre={() => { setBorrador(yo.quien); setYo(null); }} />;
}

function SalaEnVivo({ codigo, yo, secreto, cambiarNombre }: { codigo: string; yo: Yo; secreto: string | null; cambiarNombre: () => void }) {
  const [sala, setSala] = useState<Sala | null>(null);
  const [noExiste, setNoExiste] = useState(false);
  const [sinRed, setSinRed] = useState(false);
  const [animando, setAnimando] = useState<string | null>(null);
  const [anuncio, setAnuncio] = useState('');
  const ultima = useRef<string | null | undefined>(undefined);
  const masNueva = useRef(0);
  const enCurso = useRef(false);
  const reloj = useRef<ReturnType<typeof setTimeout>>(undefined);

  /** Cada sala que llega: si trae una tirada nueva, se anima (para todos, también para quien tiró) */
  const recibir = useCallback((s: Sala) => {
    const t = s.tiradas[0];
    // Un latido que salió antes de tirar puede llegar después de la respuesta de la tirada: se descarta
    if ((t?.ts ?? 0) < masNueva.current) return;
    masNueva.current = t?.ts ?? 0;
    setSala(s); setSinRed(false);
    const id = t?.id ?? null;
    if (ultima.current !== undefined && id && id !== ultima.current) {
      setAnimando(id);
      clearTimeout(reloj.current);
      reloj.current = setTimeout(() => { setAnimando(null); setAnuncio(`${t.por}: ${textoTirada(t)}`); }, DURACION[t.tipo]);
    }
    ultima.current = id;
  }, []);

  useEffect(() => {
    let vivo = true;
    const tic = async () => {
      if (enCurso.current || document.visibilityState !== 'visible') return;
      enCurso.current = true;
      try { const s = await latido(codigo, yo); if (vivo) recibir(s); }
      catch (e) {
        if (!vivo) return;
        if (e instanceof ErrorGraphQL && e.code === 'NO_EXISTE') setNoExiste(true);
        else setSinRed(true);
      } finally { enCurso.current = false; }
    };
    void tic();
    const t = setInterval(tic, CADA_MS);
    const alVolver = () => { if (document.visibilityState === 'visible') void tic(); };
    document.addEventListener('visibilitychange', alVolver);
    return () => { vivo = false; clearInterval(t); document.removeEventListener('visibilitychange', alVolver); };
  }, [codigo, yo, recibir]);
  useEffect(() => () => clearTimeout(reloj.current), []);

  if (noExiste) return (
    <Vacio titulo="Esa sala no existe">
      Revisa el código o crea una nueva. <Link href="/sorteo" className="font-bold text-ink underline">Ir a sorteos</Link>
    </Vacio>
  );
  if (!sala) return <p className="text-center text-muted" role="status">Entrando a la sala…</p>;

  const esHost = !!secreto;
  const puede = esHost || sala.config.todosTiran;
  const actual = sala.tiradas[0];
  const copiar = async () => {
    try { await navigator.clipboard.writeText(location.href); avisar('Enlace copiado'); }
    catch { avisar('Copia el enlace de la barra del navegador', 'info'); }
  };

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="m-0 text-label-caps uppercase tracking-wider text-muted">Sala de sorteo · código <strong className="text-ink">{sala.codigo}</strong></p>
          <h1 className="m-0 font-serif text-[clamp(1.8rem,7vw,2.6rem)] font-extrabold leading-tight [overflow-wrap:anywhere]">{sala.nombre}</h1>
        </div>
        <Boton onClick={copiar}><Simbolo n="link" className="text-[20px]" />Copiar enlace</Boton>
      </header>

      {sinRed && <p role="status" className="m-0 rounded-xl bg-surface px-3 py-2 text-sm text-warn ring-1 ring-warn/50">Se perdió la conexión. Reintentando…</p>}

      <Presentes sala={sala} yo={yo} cambiarNombre={cambiarNombre} />

      {/* El escenario: la última tirada, grande, para todos */}
      <Tarjeta className="flex min-h-72 flex-col items-center justify-center gap-4 overflow-hidden py-6 text-center">
        {actual ? <Escenario t={actual} animar={animando === actual.id} /> : (
          <>
            <Simbolo n="casino" className="text-6xl text-muted" />
            <p className="m-0 text-muted">{puede ? 'Todavía nadie tiró. Elige abajo qué tirar.' : 'Esperando la primera tirada del anfitrión…'}</p>
          </>
        )}
      </Tarjeta>
      <p className="sr-only" aria-live="polite">{anuncio}</p>

      {puede
        ? <Controles sala={sala} yo={yo} secreto={secreto} ocupado={!!animando} recibir={recibir} />
        : <p className="m-0 text-center text-muted">Estás mirando. En esta sala solo tira quien la creó.</p>}

      {esHost && secreto && <Ajustes sala={sala} secreto={secreto} recibir={recibir} />}

      {sala.tiradas.length > 1 && <Historial tiradas={sala.tiradas.slice(1)} />}
    </div>
  );
}

function Presentes({ sala, yo, cambiarNombre }: { sala: Sala; yo: Yo; cambiarNombre: () => void }) {
  const conectados = sala.presentes.filter(p => p.conectado).length;
  return (
    <section aria-label="Quién está en la sala" className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-bold text-muted">{conectados} {conectados === 1 ? 'conectado' : 'conectados'}</span>
      {sala.presentes.map(p => (
        <span key={p.id} className={cx('inline-flex min-h-9 items-center gap-2 rounded-full px-3 text-sm ring-1 ring-inset',
          p.conectado ? 'bg-surface ring-pas/60' : 'bg-transparent text-muted ring-rule')}>
          <span aria-hidden="true" className={cx('size-2.5 rounded-full', p.conectado ? 'bg-pas shadow-[0_0_8px_var(--pas)]' : 'border border-muted')} />
          <span className="font-bold">{p.nombre}</span>
          {p.host && <span className="text-xs text-muted">anfitrión</span>}
          {p.id === yo.visitante && <button type="button" onClick={cambiarNombre} className="cursor-pointer text-xs text-muted underline">tú · cambiar</button>}
          <span className="sr-only">{p.conectado ? 'conectado' : 'desconectado'}</span>
        </span>
      ))}
    </section>
  );
}

function Escenario({ t, animar }: { t: Tirada; animar: boolean }) {
  const titulo = t.tipo === 'dados' ? t.expr : t.tipo === 'moneda' ? 'Moneda' : (t.ganadores?.length || 0) > 1 ? `Ruleta · ${t.ganadores!.length} ganadores` : 'Ruleta';
  const ganadores = (t.ganadores || []).map(i => t.opciones?.[i] ?? '?');
  return (
    <>
      <p className="m-0 text-sm text-muted"><strong className="text-ink">{t.por}</strong> · {titulo}</p>
      {t.tipo === 'ruleta' && <Ruleta opciones={t.opciones || []} ganador={t.ganadores?.[0] ?? null} id={t.id} animar={animar} />}
      {t.tipo === 'moneda' && <Moneda cara={!!t.cara} id={t.id} animar={animar} />}
      {t.tipo === 'dados' && <Dados t={t} animar={animar} />}
      <div className={cx('min-h-14 transition-opacity', animar ? 'opacity-0' : 'opacity-100')} aria-hidden={animar}>
        {t.tipo === 'dados' && <p className="dado-pop m-0 font-serif text-6xl font-extrabold">{t.total}</p>}
        {t.tipo === 'moneda' && <p className="m-0 font-serif text-5xl font-extrabold">{t.cara ? 'Cara' : 'Cruz'}</p>}
        {t.tipo === 'ruleta' && (
          <ol className={cx('m-0 list-none p-0 font-serif font-extrabold', ganadores.length > 1 ? 'text-2xl' : 'text-4xl')}>
            {ganadores.map((g, i) => <li key={i}>{ganadores.length > 1 && <span className="text-muted">{i + 1}.º </span>}{g}</li>)}
          </ol>
        )}
      </div>
    </>
  );
}

function Controles({ sala, yo, secreto, ocupado, recibir }: { sala: Sala; yo: Yo; secreto: string | null; ocupado: boolean; recibir: (s: Sala) => void }) {
  const [modo, setModo] = useState<TipoTirada>('dados');
  const [expr, setExpr] = useState('1d20');
  const [cuantos, setCuantos] = useState(1);
  const [tirando, setTirando] = useState(false);
  const lanzar = async (tipo: TipoTirada, extra: { expr?: string; cuantos?: number } = {}) => {
    setTirando(true);
    try { recibir(await tirar(sala.codigo, yo, secreto, tipo, extra)); }
    catch (e) { avisar((e as Error).message || 'No se pudo tirar', 'error'); }
    finally { setTirando(false); }
  };
  const bloqueado = tirando || ocupado;
  const ops = sala.config.opciones;
  return (
    <Tarjeta className="flex flex-col gap-4">
      <Segmentado etiqueta="Qué tirar" valor={modo} onCambiar={setModo}
        opciones={[['dados', 'Dados'], ['moneda', 'Moneda'], ['ruleta', 'Ruleta']]} />
      {modo === 'dados' && (
        <>
          <div className="flex flex-wrap gap-2">
            {DADOS_RAPIDOS.map(d => <Boton key={d} tamano="sm" disabled={bloqueado} onClick={() => { setExpr('1d' + d); void lanzar('dados', { expr: '1d' + d }); }}>d{d}</Boton>)}
          </div>
          <form className="flex flex-wrap items-end gap-2" onSubmit={e => { e.preventDefault(); void lanzar('dados', { expr }); }}>
            <Campo etiqueta="Tirada" ayuda="Por ejemplo 2d6+3, 4d6 o 1d100." className="min-w-40 flex-1">
              <input className={claseCampo} value={expr} maxLength={40} onChange={e => setExpr(e.target.value)} />
            </Campo>
            <Boton type="submit" variante="primario" disabled={bloqueado || !expr.trim()}><Simbolo n={ICONO.dados} className="text-[20px]" />Tirar</Boton>
          </form>
        </>
      )}
      {modo === 'moneda' && (
        <Boton variante="primario" disabled={bloqueado} onClick={() => void lanzar('moneda')} className="self-start">
          <Simbolo n={ICONO.moneda} className="text-[20px]" />Lanzar moneda
        </Boton>
      )}
      {modo === 'ruleta' && (
        ops.length < 2
          ? <p className="m-0 text-muted">{secreto ? 'Escribe las opciones de la ruleta en «Ajustes de la sala», más abajo.' : 'El anfitrión todavía no puso opciones en la ruleta.'}</p>
          : (
            <form className="flex flex-wrap items-end gap-2" onSubmit={e => { e.preventDefault(); void lanzar('ruleta', { cuantos }); }}>
              <p className="m-0 w-full text-sm text-muted">{ops.length} opciones: {ops.join(', ')}</p>
              <Campo etiqueta="Ganadores" ayuda="Distintos, en el orden en que salen." className="w-36">
                <input type="number" min={1} max={ops.length} className={claseCampo} value={cuantos}
                  onChange={e => setCuantos(Math.max(1, Math.min(ops.length, Number(e.target.value) || 1)))} />
              </Campo>
              <Boton type="submit" variante="primario" disabled={bloqueado}><Simbolo n={ICONO.ruleta} className="text-[20px]" />Girar la ruleta</Boton>
            </form>
          )
      )}
    </Tarjeta>
  );
}

function Ajustes({ sala, secreto, recibir }: { sala: Sala; secreto: string; recibir: (s: Sala) => void }) {
  const [nombre, setNombre] = useState(sala.nombre);
  const [texto, setTexto] = useState(sala.config.opciones.join('\n'));
  const [guardando, setGuardando] = useState(false);
  const guardar = async (cambios: Parameters<typeof configurar>[2], aviso?: string) => {
    setGuardando(true);
    try { recibir(await configurar(sala.codigo, secreto, cambios)); if (aviso) avisar(aviso); }
    catch (e) { avisar((e as Error).message || 'No se pudo guardar', 'error'); }
    finally { setGuardando(false); }
  };
  const lineas = texto.split('\n').map(s => s.trim()).filter(Boolean);
  return (
    <Tarjeta as="section" className="flex flex-col gap-4">
      <h2 className="m-0 font-serif text-xl font-extrabold">Ajustes de la sala</h2>
      <p className="m-0 text-sm text-muted">Solo tú los ves: eres quien creó la sala (desde este navegador).</p>
      <Casilla checked={sala.config.todosTiran} disabled={guardando} onChange={v => void guardar({ todosTiran: v })}
        nota="Si no, los demás solo miran.">Todos pueden tirar</Casilla>
      <form className="flex flex-col gap-2" onSubmit={e => { e.preventDefault(); void guardar({ opciones: lineas }, 'Ruleta guardada'); }}>
        <Campo etiqueta="Opciones de la ruleta" ayuda={`Una por línea, hasta ${MAX_OPCIONES}. Por ejemplo, los nombres de los jugadores o los premios.`}>
          <textarea className={cx(claseCampo, 'min-h-32 py-2')} value={texto} onChange={e => setTexto(e.target.value)} />
        </Campo>
        <Boton type="submit" disabled={guardando || lineas.join('\n') === sala.config.opciones.join('\n')} className="self-start">Guardar ruleta ({lineas.length})</Boton>
      </form>
      <form className="flex flex-wrap items-end gap-2" onSubmit={e => { e.preventDefault(); void guardar({ nombre }, 'Nombre guardado'); }}>
        <Campo etiqueta="Nombre de la sala" className="min-w-48 flex-1">
          <input className={claseCampo} value={nombre} maxLength={LARGO_NOMBRE} onChange={e => setNombre(e.target.value)} />
        </Campo>
        <Boton type="submit" disabled={guardando || !nombre.trim() || nombre.trim() === sala.nombre}>Guardar</Boton>
      </form>
    </Tarjeta>
  );
}

function Historial({ tiradas }: { tiradas: Tirada[] }) {
  return (
    <section aria-labelledby="historial-sorteo">
      <h2 id="historial-sorteo" className="mb-2 mt-0 font-serif text-xl font-extrabold">Tiradas anteriores</h2>
      <ol className="m-0 flex list-none flex-col gap-1 p-0">
        {tiradas.map(t => (
          <li key={t.id} className="flex flex-wrap items-baseline gap-x-3 rounded-lg bg-surface px-3 py-2 text-sm ring-1 ring-rule/60">
            <Simbolo n={ICONO[t.tipo]} className="self-center text-[18px] text-muted" />
            <span className="font-bold">{t.por}</span>
            <span className="text-muted">{t.tipo === 'dados' ? t.expr : t.tipo === 'moneda' ? 'moneda' : 'ruleta'}</span>
            <span className="flex-1 font-bold [overflow-wrap:anywhere]">{textoTirada(t)}</span>
            <time className="text-xs text-muted" dateTime={new Date(t.ts).toISOString()}>{hora(t.ts)}</time>
          </li>
        ))}
      </ol>
    </section>
  );
}
