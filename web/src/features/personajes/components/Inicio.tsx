'use client';
import { useState } from 'react';
import { S } from '@/app-shell/estado';
import { Boton, EncabezadoPagina, Tarjeta, cx, foco } from '@/shared/ui/kit';
import { FormaTipo } from '@/features/reglas/components/TipoAccion';
import { abrir, borrarPj, nuevo } from '../acciones';
import { borrarVarios } from '../acciones-compartir';

const ECONOMIA: [string, string, string][] = [
  ['accion', 'Acción', 'Una por turno: atacar, lanzar un conjuro, correr.'],
  ['adicional', 'Acción adicional', 'Una por turno, solo si algo la usa.'],
  ['reaccion', 'Reacción', 'Una por ronda, incluso en el turno de otro.'],
];

export function Inicio() {
  // Modo selección: marcar varios personajes (o todos) para borrarlos de una vez
  const [sel, setSel] = useState<Set<string> | null>(null);
  if (!S.list.length) return (
    <>
      <EncabezadoPagina id="titulo-vista" titulo="Tu personaje, turno por turno"
        subtitulo="Créalo paso a paso con las reglas de 2024, tira los dados desde la hoja y mira qué puedes hacer en cada turno.">
        <Boton variante="primario" onClick={nuevo}>Crear mi primer personaje</Boton>
      </EncabezadoPagina>
      <section aria-labelledby="titulo-economia" className="mt-6">
        <h2 id="titulo-economia" className="m-0 mb-3 font-serif text-xl font-bold">Lo que puedes hacer en tu turno</h2>
        <ul className="m-0 grid list-none gap-2 p-0 sm:grid-cols-3">
          {ECONOMIA.map(([t, n, d]) => (
            <Tarjeta as="li" key={t} className="flex items-start gap-3">
              <FormaTipo t={t} className="mt-1.5 size-3.5" /><span><b>{n}.</b> {d}</span>
            </Tarjeta>
          ))}
        </ul>
      </section>
    </>
  );
  const marcados = sel ? S.list.filter(p => sel.has(p.id)) : [];
  const todos = !!sel && marcados.length === S.list.length;
  const alternar = (id: string) => setSel(s => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const borrar = async () => { if (await borrarVarios(marcados.map(p => p.id))) setSel(null); };
  return (
    <>
      <EncabezadoPagina id="titulo-vista" titulo="Tus personajes" subtitulo={`${S.list.length} personaje${S.list.length === 1 ? '' : 's'}. ${sel ? 'Marca los que quieras borrar.' : 'Toca uno para abrir su hoja.'}`}>
        {sel ? <Boton onClick={() => setSel(null)}>Cancelar</Boton> : (
          <>
            {S.list.length > 1 && <Boton onClick={() => setSel(new Set())}>Seleccionar</Boton>}
            <Boton variante="primario" onClick={nuevo}>+ Nuevo personaje</Boton>
          </>
        )}
      </EncabezadoPagina>
      {sel && (
        <div role="toolbar" aria-label="Personajes seleccionados" className="sticky top-[var(--alto-cabecera,0px)] z-[6] mb-3 flex flex-wrap items-center gap-2 rounded-2xl bg-surface-container-low px-4 py-2 ring-1 ring-rule/60">
          <span className="flex-1 text-sm" aria-live="polite">{marcados.length} de {S.list.length} seleccionado{marcados.length === 1 ? '' : 's'}</span>
          <Boton tamano="sm" onClick={() => setSel(todos ? new Set() : new Set(S.list.map(p => p.id)))}>{todos ? 'Quitar selección' : 'Seleccionar todos'}</Boton>
          <Boton tamano="sm" variante="peligro" disabled={!marcados.length} onClick={borrar}>Borrar{marcados.length ? ` (${marcados.length})` : ''}</Boton>
        </div>
      )}
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 p-0">
        {S.list.map(p => sel ? (
          <li key={p.id}>
            <label className={cx('flex min-h-24 cursor-pointer items-start gap-3 rounded-2xl bg-surface p-4 shadow-sm ring-1 transition-shadow hover:shadow-md', sel.has(p.id) ? 'ring-2 ring-primary' : 'ring-rule/60')}>
              <input type="checkbox" checked={sel.has(p.id)} onChange={() => alternar(p.id)} className={cx('mt-1 size-5 shrink-0 accent-ink', foco)} />
              <span className="flex flex-col">
                <b className="font-serif text-xl leading-tight">{p.name}</b>
                <span className="mt-1 text-sm text-muted">{p.sub || 'Sin clase todavía'}</span>
              </span>
            </label>
          </li>
        ) : (
          <li key={p.id} className="flex flex-col rounded-2xl bg-surface shadow-sm ring-1 ring-rule/60 transition-shadow hover:shadow-md">
            <button type="button" onClick={() => abrir(p.id)}
              className={cx('flex min-h-24 w-full flex-1 cursor-pointer flex-col justify-center rounded-2xl p-4 pb-2 text-left', foco)}>
              <b className="font-serif text-xl leading-tight">{p.name}</b>
              <span className="mt-1 text-sm text-muted">{p.sub || 'Sin clase todavía'}</span>
            </button>
            <div className="flex justify-end px-3 pb-3">
              <Boton variante="peligro" tamano="sm" onClick={() => borrarPj(p.id)} aria-label={`Borrar a ${p.name}`}>Borrar</Boton>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
