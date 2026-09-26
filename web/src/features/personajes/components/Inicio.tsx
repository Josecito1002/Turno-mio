'use client';
import { S } from '@/app-shell/estado';
import { Boton, EncabezadoPagina, Tarjeta, cx, foco } from '@/shared/ui/kit';
import { FormaTipo } from '@/features/reglas/components/TipoAccion';
import { abrir, borrarPj, nuevo } from '../acciones';

const ECONOMIA: [string, string, string][] = [
  ['accion', 'Acción', 'Una por turno: atacar, lanzar un conjuro, correr.'],
  ['adicional', 'Acción adicional', 'Una por turno, solo si algo la usa.'],
  ['reaccion', 'Reacción', 'Una por ronda, incluso en el turno de otro.'],
];

export function Inicio() {
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
  return (
    <>
      <EncabezadoPagina id="titulo-vista" titulo="Tus personajes" subtitulo={`${S.list.length} personaje${S.list.length === 1 ? '' : 's'}. Toca uno para abrir su hoja.`}>
        <Boton variante="primario" onClick={nuevo}>+ Nuevo personaje</Boton>
      </EncabezadoPagina>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 p-0">
        {S.list.map(p => (
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
