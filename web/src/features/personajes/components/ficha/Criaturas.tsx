/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useId, useState } from 'react';
import { modOf, modStr, sign } from '@/shared/utils/texto';
import { Boton, Contador, claseCampo, cx } from '@/shared/ui/kit';
import { AB } from '@/features/reglas/data/caracteristicas';
import { BotonTirada } from '@/features/dados/components/BotonTirada';
import { agregarCriatura, pgCriatura, quitarCriatura } from '../../acciones';

const REGLA: Record<string, string> = {
  familiar: 'Tira su propia iniciativa y sigue tus órdenes, pero no puede atacar (salvo con el Pacto de la Cadena). Mientras esté a 100 pies, os comunicáis por telepatía; con una acción adicional ves y oyes por sus sentidos, y con su reacción entrega un conjuro de toque que lances. Solo puedes tener un familiar.',
  muerto: 'Con una acción adicional le das órdenes mentales a todas las que tengas a 60 pies o menos. Sin órdenes, solo se defiende. Obedece durante 24 horas; vuelve a lanzar el conjuro antes de que pasen para mantenerla.',
};

/** Familiares y muertos vivientes del personaje: una mini hoja de cada uno y un selector para agregar más. */
export function Criaturas({ c }: { c: any }) {
  const id = useId();
  const [elegida, setElegida] = useState('');
  const puede = c.criaturasPuede || [];
  if (!puede.length && !c.criaturas?.length) return null;
  const tieneFamiliar = c.criaturas.some((x: any) => x.de === 'familiar');
  const grupos: [string, any[]][] = [['Familiar', puede.filter((x: any) => x.de === 'familiar')], ['Muertos vivientes', puede.filter((x: any) => x.de === 'muerto')]];
  const agregar = () => { const x = puede.find((y: any) => y.key === elegida); if (x) agregarCriatura(x.key, x.n); setElegida(''); };
  return (
    <section aria-labelledby="sec-criaturas" className="mt-8">
      <h2 id="sec-criaturas" className="m-0 font-serif text-2xl font-bold">Familiares y criaturas</h2>
      <p className="mb-2 mt-0.5 text-sm text-muted">Las que creaste con tus conjuros, con su propia hoja. Toca cualquier número con fondo para tirarlo.</p>
      {c.criaturas.map((x: any) => <HojaCriatura key={x.id} x={x} />)}
      {puede.length > 0 && (
        <div className="mt-3 flex flex-wrap items-end gap-2">
          <label htmlFor={id} className="sr-only">Criatura para agregar</label>
          <select id={id} value={elegida} onChange={e => setElegida(e.target.value)} className={cx(claseCampo, 'w-auto! min-w-48')}>
            <option value="">Agregar una criatura…</option>
            {grupos.filter(([, xs]) => xs.length).map(([g, xs]) => (
              <optgroup key={g} label={g}>
                {xs.map((x: any) => <option key={x.key} value={x.key} disabled={x.de === 'familiar' && tieneFamiliar}>{x.n}</option>)}
              </optgroup>
            ))}
          </select>
          <Boton variante="primario" disabled={!elegida} onClick={agregar}>Agregar</Boton>
        </div>
      )}
    </section>
  );
}

function HojaCriatura({ x }: { x: any }) {
  const bono = (v: number) => sign(v);
  return (
    <article className="my-2 rounded-2xl border-l-4 border-rule bg-surface px-4 py-3 shadow-sm ring-1 ring-rule/50 break-inside-avoid">
      <header className="flex flex-wrap items-baseline justify-between gap-x-3">
        <h3 className="m-0 font-serif text-lg font-bold leading-snug">{x.nombre}</h3>
        <span className="text-sm text-muted">{x.tipo}</span>
      </header>
      <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2">
        <span><b className="font-serif text-2xl">{x.ca}</b> <small className="text-muted">CA</small></span>
        <span className="flex items-center gap-2">
          <small className="text-muted">PG</small>
          <Contador nombre={`PG de ${x.nombre}`} valor={x.pg} max={x.pgMax} onCambiar={d => pgCriatura(x.id, d, x.pgMax)}
            onFijar={v => pgCriatura(x.id, (+v || 0) - x.pg, x.pgMax)} />
        </span>
        <span className="text-sm"><small className="text-muted">Velocidad</small> {x.vel}</span>
      </div>
      <ul className="m-0 mt-3 grid list-none grid-cols-6 gap-1 p-0 text-center">
        {AB.map(([k, , ab, nm]) => {
          const m = modOf(x.ab[k]);
          return (
            <li key={k}>
              <BotonTirada expr={`1d20${modStr(m)}`} label={`${x.nombre}: prueba de ${nm}`} estilo="bloque" className="w-full py-1"
                ariaLabel={`Prueba de ${nm} de ${x.nombre}, ${bono(m)}`}>
                <span className="block text-xs text-muted">{ab} {x.ab[k]}</span>
                <b className="block font-serif text-lg leading-tight">{bono(m)}</b>
              </BotonTirada>
            </li>
          );
        })}
      </ul>
      <div className="mt-2 flex flex-wrap gap-2 text-sm">
        {Object.entries(x.salv || {}).map(([k, v]: [string, any]) => (
          <BotonTirada key={k} expr={`1d20${modStr(v)}`} label={`${x.nombre}: salvación de ${k.toUpperCase()}`}>Salv. {k.toUpperCase()} {bono(v)}</BotonTirada>
        ))}
        {Object.entries(x.habs || {}).map(([h, v]: [string, any]) => (
          <BotonTirada key={h} expr={`1d20${modStr(v)}`} label={`${x.nombre}: ${h}`}>{h} {bono(v)}</BotonTirada>
        ))}
      </div>
      <p className="mb-0 mt-2 text-sm text-muted">
        {[x.sentidos, x.vulnerable && `Vulnerable: ${x.vulnerable}`, x.inmune && `Inmune: ${x.inmune}`].filter(Boolean).join('. ')}.
      </p>
      {(x.rasgos || []).map(([n, t]: [string, string]) => <p key={n} className="mb-0 mt-1"><b>{n}.</b> {t}</p>)}
      {x.acciones.length > 0 && (
        <ul className="m-0 mt-1 list-none divide-y divide-soft p-0">
          {x.acciones.map((a: any) => a.atk == null
            ? <li key={a.n} className="py-2"><b>{a.n}.</b> {a.texto}</li>
            : (
              <li key={a.n} className="grid grid-cols-[1fr_auto] items-center gap-x-3 py-2">
                <div>
                  <p className="m-0 font-serif font-bold">{a.n}</p>
                  <BotonTirada expr={a.expr} label={`${x.nombre}, ${a.n}: daño`} mods={a.dmgDesg} className="mt-1 text-sm">{a.dmgTxt}</BotonTirada>
                </div>
                <div className="flex flex-col items-center">
                  <BotonTirada expr={`1d20${modStr(a.atk)}`} label={`${x.nombre}, ${a.n}: ataque`} estilo="grande" dmg={a.expr} dmgLabel={`${x.nombre}, ${a.n}: daño`} dmgMods={a.dmgDesg}
                    ariaLabel={`Tirar ataque de ${x.nombre} con ${a.n}, ${bono(a.atk)}`}>{bono(a.atk)}</BotonTirada>
                  <small className="mt-0.5 text-xs text-muted" aria-hidden="true">al ataque</small>
                </div>
              </li>
            ))}
        </ul>
      )}
      {x.nota && <p className="mb-0 mt-1 text-sm">{x.nota}.</p>}
      <p className="mb-0 mt-2 text-sm text-muted">{REGLA[x.de]}</p>
      <div className="mt-2 flex justify-end">
        <Boton tamano="sm" variante="fantasma" onClick={() => quitarCriatura(x.id)} aria-label={`Quitar a ${x.nombre}`}>Quitar</Boton>
      </div>
    </article>
  );
}
