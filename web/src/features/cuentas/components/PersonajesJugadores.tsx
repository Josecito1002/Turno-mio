'use client';
import { useEffect, useId, useState, type FormEvent } from 'react';
import { S, render } from '@/app-shell/estado';
import { almacen } from '@/app-shell/almacen';
import { avisar } from '@/shared/ui/avisos';
import { Aviso, Boton, Campo, Nota, Seccion, claseCampo, cx, foco } from '@/shared/ui/kit';
import { borrarPersonajes, personajesDeJugadores, type PersonajeAjeno } from '@/features/personajes/api';
import { abrirAjeno, confirmarBorrado } from '@/features/personajes/acciones-compartir';

const clave = (p: PersonajeAjeno) => `${p.usuarioId}:${p.id}`;
/** La última búsqueda, para encontrarla igual al volver de ver una hoja. */
let recordado: { texto: string; lista: PersonajeAjeno[] } | null = null;

/** Solo administradores: buscar a un jugador por nombre o correo, ver sus personajes y borrar varios a la vez. */
export function PersonajesJugadores({ buscarInicial }: { buscarInicial: { texto: string; n: number } }) {
  const idBuscar = useId();
  const [texto, setTexto] = useState(recordado?.texto ?? '');
  const [buscado, setBuscado] = useState<string | null>(recordado?.texto ?? null);
  const [lista, setListaEstado] = useState<PersonajeAjeno[] | null>(recordado?.lista ?? null);
  const setLista = (l: PersonajeAjeno[], q = buscado ?? '') => { recordado = { texto: q, lista: l }; setListaEstado(l); };
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [borrando, setBorrando] = useState(false);

  const buscar = async (q: string) => {
    setCargando(true); setError('');
    try { setLista(await personajesDeJugadores(q), q); setBuscado(q); setSel(new Set()); }
    catch (e) { setError((e as Error).message); }
    finally { setCargando(false); }
  };
  // «Ver personajes» en una cuenta busca a esa persona
  useEffect(() => {
    if (!buscarInicial.n) return;
    setTexto(buscarInicial.texto); buscar(buscarInicial.texto); // eslint-disable-line react-hooks/set-state-in-effect
  }, [buscarInicial]); // eslint-disable-line react-hooks/exhaustive-deps

  const enviar = (e: FormEvent) => { e.preventDefault(); buscar(texto.trim()); };
  const marcados = (lista || []).filter(p => sel.has(clave(p)));
  const todos = !!lista?.length && marcados.length === lista.length;
  const alternar = (k: string) => setSel(s => { const n = new Set(s); if (n.has(k)) n.delete(k); else n.add(k); return n; });

  const borrar = async () => {
    if (!marcados.length) return;
    const jugadores = new Set(marcados.map(p => p.jugador));
    const de = jugadores.size === 1 ? ` (de ${[...jugadores][0]})` : ` (de ${jugadores.size} jugadores)`;
    if (!(await confirmarBorrado(marcados.map(p => p.nombre), de))) return;
    setBorrando(true);
    try {
      const n = await borrarPersonajes(marcados.map(p => ({ usuarioId: p.usuarioId, id: p.id })));
      // Si entre ellos había personajes propios, se quitan también de la lista de inicio
      const propios = marcados.filter(p => p.usuarioId === S.usuario?.id).map(p => p.id);
      if (propios.length) {
        propios.forEach(id => almacen.olvidarPj(id));
        S.list = S.list.filter(p => !propios.includes(p.id));
        if (S.pj && propios.includes(S.pj.id)) { S.pj = null; almacen.ultimo(null); }
        render();
      }
      setLista((lista || []).filter(p => !sel.has(clave(p)))); setSel(new Set());
      avisar(n === 1 ? 'Personaje borrado.' : `${n} personajes borrados.`);
    } catch (e) { avisar(`No se pudieron borrar: ${(e as Error).message}`, 'error'); }
    finally { setBorrando(false); }
  };

  // Agrupados por jugador, en el orden en que llegan (ya vienen ordenados por nombre)
  const grupos = new Map<string, { jugador: string; pjs: PersonajeAjeno[] }>();
  for (const p of lista || []) {
    const g = grupos.get(p.usuarioId) || { jugador: p.jugador, pjs: [] };
    g.pjs.push(p); grupos.set(p.usuarioId, g);
  }

  return (
    <Seccion titulo="Personajes de los jugadores" descripcion="Busca a un jugador por su nombre o correo para ver todos sus personajes. Déjalo vacío para ver los de todos.">
      <form onSubmit={enviar} className="flex flex-wrap items-end gap-3">
        <Campo etiqueta="Jugador" className="min-w-56 flex-1">
          <input id={idBuscar} type="search" value={texto} onChange={e => setTexto(e.target.value)} autoComplete="off" placeholder="Nombre o correo" className={claseCampo} />
        </Campo>
        <Boton type="submit" variante="primario" disabled={cargando}>{cargando ? 'Buscando…' : 'Buscar'}</Boton>
      </form>
      {error && <div className="mt-3"><Aviso tipo="error" titulo="No se pudo buscar">{error}</Aviso></div>}
      {lista && (
        lista.length === 0 ? <Nota>{buscado ? `Ningún jugador con «${buscado}» en su nombre o correo tiene personajes.` : 'Nadie tiene personajes todavía.'}</Nota> : (
          <>
            <div role="toolbar" aria-label="Personajes seleccionados" className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl bg-surface-container-low px-4 py-2 ring-1 ring-rule/60">
              <span className="flex-1 text-sm" aria-live="polite">{lista.length} personaje{lista.length === 1 ? '' : 's'} de {grupos.size} jugador{grupos.size === 1 ? '' : 'es'}{marcados.length ? `, ${marcados.length} seleccionado${marcados.length === 1 ? '' : 's'}` : ''}</span>
              <Boton tamano="sm" onClick={() => setSel(todos ? new Set() : new Set(lista.map(clave)))}>{todos ? 'Quitar selección' : 'Seleccionar todos'}</Boton>
              <Boton tamano="sm" variante="peligro" disabled={!marcados.length || borrando} onClick={borrar}>{borrando ? 'Borrando…' : `Borrar${marcados.length ? ` (${marcados.length})` : ''}`}</Boton>
            </div>
            {[...grupos.entries()].map(([uid, g]) => {
              const todosJ = g.pjs.every(p => sel.has(clave(p)));
              const marcarJugador = () => setSel(s => { const n = new Set(s); g.pjs.forEach(p => (todosJ ? n.delete(clave(p)) : n.add(clave(p)))); return n; });
              return (
                <section key={uid} aria-label={`Personajes de ${g.jugador}`} className="mt-4">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="m-0 font-serif text-lg font-bold">{g.jugador}{uid === S.usuario?.id && <span className="ml-1 font-sans text-sm font-normal text-muted">(tú)</span>} <span className="font-sans text-sm font-normal text-muted">· {g.pjs.length} personaje{g.pjs.length === 1 ? '' : 's'}</span></h3>
                    <Boton tamano="sm" variante="fantasma" onClick={marcarJugador}>{todosJ ? 'Quitar los suyos' : 'Seleccionar los suyos'}</Boton>
                  </div>
                  <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 p-0">
                    {g.pjs.map(p => (
                      <li key={p.id} className={cx('flex items-start gap-3 rounded-2xl bg-surface p-3 shadow-sm ring-1', sel.has(clave(p)) ? 'ring-2 ring-primary' : 'ring-rule/60')}>
                        <input type="checkbox" checked={sel.has(clave(p))} onChange={() => alternar(clave(p))} aria-label={`Seleccionar a ${p.nombre}`} className={cx('mt-1 size-5 shrink-0 cursor-pointer accent-ink', foco)} />
                        <span className="flex min-w-0 flex-1 flex-col">
                          <b className="font-serif text-lg leading-tight">{p.nombre}</b>
                          <span className="text-sm text-muted">{p.resumen || 'Sin clase todavía'}</span>
                          <Boton tamano="sm" variante="fantasma" className="mt-2 self-start" onClick={() => abrirAjeno(p, 'cuentas')} aria-label={`Ver la hoja de ${p.nombre}`}>Ver hoja</Boton>
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </>
        )
      )}
    </Seccion>
  );
}
