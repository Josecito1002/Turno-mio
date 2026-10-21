'use client';
import { useEffect, useState } from 'react';
import { Aviso, Boton, Campo, Nota, Plegable, Seccion, claseCampo, cx } from '@/shared/ui/kit';
import { guiaAGuion, minutos, type Guion } from '../domain/guion';
import { Reproductor, type Estado } from '../client/reproductor';
import { VOCES, type VozId } from '../client/voz';

const VELOCIDADES = [0.75, 1, 1.25, 1.5, 1.75, 2];
const TEMPORIZADOR = [0, 15, 30, 45, 60];

/** Lo que se recuerda en este celular: la voz, la velocidad y dónde se quedó en cada guía. */
const leer = (k: string) => { try { return localStorage.getItem(`audioguia:${k}`); } catch { return null; } };
const guardar = (k: string, v: string) => { try { localStorage.setItem(`audioguia:${k}`, v); } catch { /* sin almacenamiento */ } };

const vozGuardada = (): VozId => {
  const v = leer('voz');
  return VOCES.some((x) => x.id === v) ? (v as VozId) : 'es_MX-ald-medium';
};

/** Escuchar una guía de sesión como un pódcast: la voz lee la guía y se salta a cualquier capítulo o zona. */
export function EscucharGuia() {
  const [voz, setVoz] = useState<VozId>(vozGuardada);
  const [vel, setVel] = useState(() => Number(leer('velocidad')) || 1);
  const [guion, setGuion] = useState<Guion | null>(null);
  const [estado, setEstado] = useState<Estado | null>(null);
  const [cargando, setCargando] = useState('');
  const [error, setError] = useState('');
  const [minTemporizador, setMinTemporizador] = useState(0);
  const [r, setR] = useState<Reproductor | null>(null);

  // al cambiar de guía o salir de la página, se calla la anterior
  useEffect(() => () => r?.cerrar(), [r]);

  // dónde se quedó, para seguir ahí la próxima vez
  useEffect(() => {
    if (guion && estado) guardar(`pos:${guion.titulo}`, String(estado.pos));
  }, [guion, estado]);

  const elegir = async (f: File | undefined) => {
    if (!f) return;
    setError('');
    setR(null);
    setGuion(null);
    setEstado(null);
    try {
      let md: string;
      if (/\.pdf$/i.test(f.name) || f.type === 'application/pdf') {
        setCargando('Leyendo el PDF…');
        const { pdfAMarkdown } = await import('../client/pdf');
        md = await pdfAMarkdown(await f.arrayBuffer(), (n, t) => setCargando(`Leyendo el PDF: página ${n} de ${t}…`));
      } else md = await f.text();
      const g = guiaAGuion(md);
      if (!g.secciones.length) throw new Error('No encontré texto para leer en este archivo.');
      const nuevo = new Reproductor(g, voz, setEstado, Number(leer(`pos:${g.titulo}`)) || 0);
      nuevo.setVelocidad(vel);
      setR(nuevo);
      setGuion(g);
      setEstado(nuevo.e);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo leer el archivo.');
    } finally {
      setCargando('');
    }
  };

  const cambiarVoz = (v: VozId) => {
    setVoz(v);
    guardar('voz', v);
    r?.setVoz(v);
  };

  const cambiarVel = (v: number) => {
    setVel(v);
    guardar('velocidad', String(v));
    r?.setVelocidad(v);
  };

  const cambiarTemporizador = (m: number) => {
    setMinTemporizador(m);
    r?.temporizador(m);
  };

  const sec = r && estado ? r.seccionDe(estado.pos) : 0;
  const seccion = guion?.secciones[sec];
  const trozoActual = r && estado ? r.trozos[estado.pos]?.texto : '';
  const enSeccion = r && estado ? estado.pos - r.inicios[sec] + 1 : 0;
  const detalleVoz = VOCES.find((v) => v.id === voz)?.detalle;

  return (
    <Seccion titulo="Escuchar guías" descripcion="Elige la guía (.md o PDF) y escúchala como un pódcast para estudiarla antes de jugar. Sigue sonando con la pantalla apagada y recuerda dónde te quedaste.">
      <div className="grid gap-3">
        <Campo etiqueta="Guía (.md o PDF)" ayuda="El .md se oye mejor: con el PDF, la app adivina los títulos por el tamaño de la letra.">
          <input type="file" accept=".md,.markdown,.txt,.pdf,text/markdown,text/plain,application/pdf" className={claseCampo} disabled={!!cargando}
            onChange={(e) => { void elegir(e.target.files?.[0]); }} />
        </Campo>
        <Campo etiqueta="Voz" ayuda={detalleVoz}>
          <select className={claseCampo} value={voz} onChange={(e) => cambiarVoz(e.target.value as VozId)}>
            {VOCES.map((v) => <option key={v.id} value={v.id}>{v.nombre}</option>)}
          </select>
        </Campo>
        {cargando && <p role="status" className="m-0 text-sm font-bold">{cargando}</p>}
        {error && <Aviso tipo="error" titulo="No se pudo">{error}</Aviso>}

        {guion && r && estado && (
          <div className="grid gap-3 rounded-2xl bg-soft/70 p-4 ring-1 ring-rule/50">
            <span className="grid gap-0.5">
              <b className="[overflow-wrap:anywhere]">{guion.titulo}</b>
              <span className="text-sm text-muted">Unos {minutos(guion)} minutos a velocidad normal · {guion.secciones.length} partes</span>
            </span>

            <div className="grid gap-1">
              <span className="text-sm font-bold">{seccion?.titulo}</span>
              <p className="m-0 max-h-32 overflow-y-auto text-sm text-muted">{trozoActual}</p>
              <span className="text-xs text-muted">Parte {sec + 1} de {guion.secciones.length} · trozo {enSeccion} de {seccion?.trozos.length}</span>
            </div>

            {estado.ocupado && <p role="status" className="m-0 text-sm font-bold">{estado.ocupado}</p>}
            {estado.error && (
              <Aviso tipo="error" titulo="La voz falló" accion={voz !== 'celular' ? <Boton tamano="sm" onClick={() => cambiarVoz('celular')}>Usar la voz del celular</Boton> : undefined}>
                {estado.error}
              </Aviso>
            )}

            <div className="grid grid-cols-5 gap-2">
              <Boton tamano="sm" aria-label="Parte anterior" title="Parte anterior" onClick={() => r.seccion(-1)}>⏮</Boton>
              <Boton tamano="sm" aria-label="Trozo anterior" title="Trozo anterior" onClick={() => r.trozo(-1)}>↺</Boton>
              <Boton tamano="sm" variante="primario" aria-label={estado.sonando ? 'Pausa' : 'Escuchar'} onClick={() => (estado.sonando ? r.pausar() : r.tocar())}>
                {estado.sonando ? '⏸' : '▶'}
              </Boton>
              <Boton tamano="sm" aria-label="Trozo siguiente" title="Trozo siguiente" onClick={() => r.trozo(1)}>↻</Boton>
              <Boton tamano="sm" aria-label="Parte siguiente" title="Parte siguiente" onClick={() => r.seccion(1)}>⏭</Boton>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Campo etiqueta="Velocidad">
                <select className={claseCampo} value={vel} onChange={(e) => cambiarVel(Number(e.target.value))}>
                  {VELOCIDADES.map((v) => <option key={v} value={v}>{String(v).replace('.', ',')}×</option>)}
                </select>
              </Campo>
              <Campo etiqueta="Apagar en">
                <select className={claseCampo} value={minTemporizador} onChange={(e) => cambiarTemporizador(Number(e.target.value))}>
                  {TEMPORIZADOR.map((m) => <option key={m} value={m}>{m ? `${m} minutos` : 'No apagar'}</option>)}
                </select>
              </Campo>
            </div>

            <Plegable titulo="Índice" nota="toca para saltar">
              <ol className="m-0 grid list-none gap-0.5 p-0">
                {guion.secciones.map((s, i) => (
                  <li key={i}>
                    <button type="button" onClick={() => r.saltar(r.inicios[i])}
                      className={cx('min-h-10 w-full cursor-pointer rounded-lg px-2 py-1 text-left text-sm hover:bg-soft', i === sec && 'bg-ink text-bg hover:bg-ink',
                        s.nivel === 1 ? 'font-bold' : s.nivel === 2 ? 'pl-5' : 'pl-8 text-muted', i === sec && 'text-bg')}>
                      {s.titulo}
                    </button>
                  </li>
                ))}
              </ol>
            </Plegable>
            <Nota>Con los botones de música del celular (o de la pantalla bloqueada): siguiente y anterior saltan de parte. La voz Piper baja una sola vez y después funciona sin internet.</Nota>
          </div>
        )}
      </div>
    </Seccion>
  );
}
