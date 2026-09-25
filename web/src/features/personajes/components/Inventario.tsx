/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { S } from '@/app-shell/estado';
import { Boton, Campo, Lista, Nota, Seccion, Segmentado, claseCampo, cx } from '@/shared/ui/kit';
import { ARMAS, ARMADURAS } from '@/features/reglas/data/equipo';
import { ElegirManos } from './Manos';
import { CampoArea } from './editor/campos';
import { MONEDAS, armadurasDe, bolsaDe, esPropia } from '../domain/inventario';
import {
  agregarArma, agregarArmadura, agregarObjeto, cambiarCantidadArma, cambiarObjeto, moverMonedas, ponerArmadura, quitarArma, quitarArmadura,
} from '../acciones';

const nombreArmadura = (k: string) => k === 'escudo' ? 'Escudo' : ARMADURAS[k]?.n || k;
const Moneda = ({ color }: { color: string }) => <span aria-hidden="true" className="inline-block size-4 shrink-0 rounded-full ring-1 ring-black/30" style={{ background: color }} />;

/** Monedas: cuántas de cada una, y sumar o gastar (al gastar se hace el cambio solo). */
function Monedas({ pj }: { pj: any }) {
  const b = bolsaDe(pj);
  const [den, setDen] = useState('po'), [n, setN] = useState('');
  const mover = (gastar: boolean) => { moverMonedas(den, +n, gastar); setN(''); };
  return (
    <>
      <ul aria-label="Tus monedas" className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0">
        {MONEDAS.map(([k, nom, , color]) => (
          <li key={k} className="flex items-center gap-2"><Moneda color={color} /><span className="text-sm text-muted">{nom}</span><b className="font-serif text-xl">{b[k]}</b></li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap items-end gap-2">
        <Campo etiqueta="Moneda" className="min-w-32">
          <select value={den} onChange={e => setDen(e.target.value)} className={cx(claseCampo, 'cursor-pointer')}>
            {MONEDAS.map(([k, nom]) => <option key={k} value={k}>{nom}</option>)}
          </select>
        </Campo>
        <Campo etiqueta="Cantidad" className="w-28">
          <input type="number" inputMode="numeric" min={1} value={n} onChange={e => setN(e.target.value)} className={claseCampo} />
        </Campo>
        <Boton onClick={() => mover(false)} disabled={!(+n > 0)}>Añadir</Boton>
        <Boton variante="primario" onClick={() => mover(true)} disabled={!(+n > 0)}>Gastar</Boton>
      </div>
      <Nota className="mt-2">Si no tienes suficientes de esa moneda, se cambia una mayor (o se juntan menores) y recibes el cambio.</Nota>
    </>
  );
}

const PROPIEDADES = ['ligera', 'sutil', 'arrojadiza', 'versátil', 'dos manos', 'pesada', 'alcance', 'munición', 'recarga'];

/** Añadir un objeto: arma o armadura (estándar o personalizada) o un objeto cualquiera. */
function Agregar() {
  const [tipo, setTipo] = useState<'arma' | 'armadura' | 'otro'>('arma');
  const [sel, setSel] = useState(''), [f, setF] = useState<any>({});
  const [obj, setObj] = useState(''), [q, setQ] = useState('1');
  const cambiar = (k: string, v: any) => setF((x: any) => ({ ...x, [k]: v }));
  const campo = (k: string, etiqueta: string, props: any = {}) => (
    <Campo etiqueta={etiqueta}><input value={f[k] ?? ''} onChange={e => cambiar(k, e.target.value)} className={claseCampo} {...props} /></Campo>
  );
  const listo = () => { setSel(''); setF({}); };
  const agregarPropiaArma = () => {
    const p: string[] = f.p || [];
    agregarArma('', { n: f.n || 'Arma personalizada', d: f.d || '1d6', tipo: f.tipo || 'contundente', cat: f.cat || 'sencilla', p,
      ...(p.includes('versátil') && f.v ? { v: f.v } : {}), ...(f.dist ? { dist: true } : {}), ...(f.r ? { r: f.r } : {}) });
    listo();
  };
  const agregarPropiaArmadura = () => {
    const cat = f.cat || 'ligera';
    agregarArmadura('', { n: f.n || 'Armadura personalizada', base: +f.base || 11, cat, ...(cat === 'media' ? { max: 2 } : cat === 'pesada' ? { max: 0 } : {}),
      ...(f.fue ? { fue: +f.fue } : {}), ...(f.sigilo ? { sigilo: true } : {}) });
    listo();
  };
  return (
    <div className="flex flex-col gap-3">
      <Segmentado etiqueta="Qué quieres añadir" valor={tipo} onCambiar={t => { setTipo(t); listo(); }}
        opciones={[['arma', 'Arma'], ['armadura', 'Armadura'], ['otro', 'Misceláneo']]} />
      {tipo === 'arma' && (
        <>
          <Campo etiqueta="Arma">
            <select value={sel} onChange={e => setSel(e.target.value)} className={cx(claseCampo, 'cursor-pointer')}>
              <option value="">Elige…</option>
              {Object.keys(ARMAS).filter(k => !esPropia(k)).map(k => <option key={k} value={k}>{ARMAS[k].n} ({ARMAS[k].d} {ARMAS[k].tipo})</option>)}
              <option value="propia">Personalizada…</option>
            </select>
          </Campo>
          {sel === 'propia' ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {campo('n', 'Nombre')}
              {campo('d', 'Dado de daño', { placeholder: '1d8' })}
              {campo('tipo', 'Tipo de daño', { placeholder: 'cortante' })}
              <Campo etiqueta="Categoría">
                <select value={f.cat || 'sencilla'} onChange={e => cambiar('cat', e.target.value)} className={cx(claseCampo, 'cursor-pointer')}>
                  <option value="sencilla">Sencilla</option><option value="marcial">Marcial</option>
                </select>
              </Campo>
              <fieldset className="m-0 border-0 p-0 sm:col-span-2"><legend className="mb-1.5 font-bold">Propiedades</legend>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {PROPIEDADES.map(p => (
                    <label key={p} className="flex min-h-11 items-center gap-2">
                      <input type="checkbox" checked={(f.p || []).includes(p)} onChange={e => cambiar('p', e.target.checked ? [...(f.p || []), p] : (f.p || []).filter((x: string) => x !== p))} className="size-5" />{p}
                    </label>
                  ))}
                  <label className="flex min-h-11 items-center gap-2"><input type="checkbox" checked={!!f.dist} onChange={e => cambiar('dist', e.target.checked)} className="size-5" />a distancia</label>
                </div>
              </fieldset>
              {(f.p || []).includes('versátil') && campo('v', 'Dado a dos manos', { placeholder: '1d10' })}
              {(f.dist || (f.p || []).includes('arrojadiza')) && campo('r', 'Alcance (pies)', { placeholder: '80/320' })}
              <div className="sm:col-span-2"><Boton variante="primario" onClick={agregarPropiaArma}>Añadir arma</Boton></div>
            </div>
          ) : <div><Boton variante="primario" disabled={!sel} onClick={() => { agregarArma(sel); listo(); }}>Añadir arma</Boton></div>}
        </>
      )}
      {tipo === 'armadura' && (
        <>
          <Campo etiqueta="Armadura">
            <select value={sel} onChange={e => setSel(e.target.value)} className={cx(claseCampo, 'cursor-pointer')}>
              <option value="">Elige…</option>
              {Object.keys(ARMADURAS).filter(k => !esPropia(k)).map(k => <option key={k} value={k}>{ARMADURAS[k].n} ({ARMADURAS[k].cat}, CA {ARMADURAS[k].base})</option>)}
              <option value="escudo">Escudo (+2 CA)</option>
              <option value="propia">Personalizada…</option>
            </select>
          </Campo>
          {sel === 'propia' ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {campo('n', 'Nombre')}
              {campo('base', 'CA base', { type: 'number', inputMode: 'numeric', placeholder: '14' })}
              <Campo etiqueta="Tipo" ayuda="Ligera suma toda tu DES; media, hasta +2; pesada, nada.">
                <select value={f.cat || 'ligera'} onChange={e => cambiar('cat', e.target.value)} className={cx(claseCampo, 'cursor-pointer')}>
                  <option value="ligera">Ligera</option><option value="media">Media</option><option value="pesada">Pesada</option>
                </select>
              </Campo>
              {campo('fue', 'Fuerza mínima (opcional)', { type: 'number', inputMode: 'numeric' })}
              <label className="flex min-h-11 items-center gap-2 sm:col-span-2"><input type="checkbox" checked={!!f.sigilo} onChange={e => cambiar('sigilo', e.target.checked)} className="size-5" />Desventaja en Sigilo</label>
              <div className="sm:col-span-2"><Boton variante="primario" onClick={agregarPropiaArmadura}>Añadir armadura</Boton></div>
            </div>
          ) : <div><Boton variante="primario" disabled={!sel} onClick={() => { agregarArmadura(sel); listo(); }}>Añadir armadura</Boton></div>}
        </>
      )}
      {tipo === 'otro' && (
        <div className="flex flex-wrap items-end gap-2">
          <Campo etiqueta="Objeto" className="min-w-52 flex-1"><input value={obj} onChange={e => setObj(e.target.value)} placeholder="Cuerda de cáñamo (50 pies)" className={claseCampo} /></Campo>
          <Campo etiqueta="Cantidad" className="w-24"><input type="number" inputMode="numeric" min={1} value={q} onChange={e => setQ(e.target.value)} className={claseCampo} /></Campo>
          <Boton variante="primario" disabled={!obj.trim()} onClick={() => { agregarObjeto(obj, Math.max(1, +q || 1)); setObj(''); setQ('1'); }}>Añadir</Boton>
        </div>
      )}
    </div>
  );
}

/** Pestaña Equipo de la hoja: manos, armadura puesta, monedas e inventario. */
export function Inventario({ c }: { c: any }) {
  const pj = S.pj;
  const armaduras = armadurasDe(pj), cuerpo = armaduras.filter(k => k !== 'escudo');
  const fila = 'flex min-h-12 flex-wrap items-center justify-between gap-x-3 gap-y-1 py-2';
  return (
    <div className="flex flex-col gap-4">
      <Seccion titulo="En las manos" descripcion="Solo las armas empuñadas salen en Atacar.">
        <ElegirManos pj={pj} c={c} />
      </Seccion>
      <Seccion titulo="Armadura puesta">
        <Campo etiqueta="Armadura" className="max-w-sm">
          <select value={c.armorKey || ''} onChange={e => ponerArmadura(e.target.value)} className={cx(claseCampo, 'cursor-pointer')}>
            <option value="">Sin armadura</option>
            {cuerpo.map(k => <option key={k} value={k}>{nombreArmadura(k)}{!c.compArm?.[ARMADURAS[k].cat] ? ' — sin competencia' : ''}</option>)}
          </select>
        </Campo>
        <p className="mb-0 mt-2">CA <b className="font-serif text-xl">{c.ac}</b>{c.armor?.sigilo ? '. Desventaja en Sigilo.' : '.'}</p>
      </Seccion>
      <Seccion titulo="Monedas"><Monedas pj={pj} /></Seccion>
      <Seccion titulo="Inventario">
        <Lista etiqueta="Armas">
          {c.armas.map((a: any) => (
            <li key={'a' + a.k} className={fila}>
              <span>{a.nombre} <span className="text-sm text-muted">{a.dmg}{a.w.p.length ? `, ${a.w.p.join(', ')}` : ''}. {a.mano === 'principal' ? 'Mano principal' : a.mano === 'otra' ? 'Otra mano' : 'Guardada'}</span></span>
              <span className="flex gap-2">
                <Boton tamano="sm" onClick={() => cambiarCantidadArma(a.i, -1)} aria-label={`Quitar una ${a.w.n}`}>−</Boton>
                <Boton tamano="sm" onClick={() => cambiarCantidadArma(a.i, 1)} aria-label={`Agregar una ${a.w.n}`}>+</Boton>
                {esPropia(a.k) && <Boton tamano="sm" variante="fantasma" onClick={() => quitarArma(a.k)}>Quitar</Boton>}
              </span>
            </li>
          ))}
          {armaduras.map(k => (
            <li key={'r' + k} className={fila}>
              <span>{nombreArmadura(k)} <span className="text-sm text-muted">{k === 'escudo' ? (c.shield ? 'En la otra mano' : 'Guardado') : c.armorKey === k ? 'Puesta' : 'Guardada'}</span></span>
              <Boton tamano="sm" variante="fantasma" onClick={() => quitarArmadura(k)}>Quitar</Boton>
            </li>
          ))}
          {(pj.objetos || []).map((o: any, i: number) => (
            <li key={'o' + i} className={fila}>
              <span>{o.n}{o.q > 1 ? ` (${o.q})` : ''}</span>
              <span className="flex gap-2">
                <Boton tamano="sm" onClick={() => cambiarObjeto(i, -1)} aria-label={`Quitar un ${o.n}`}>−</Boton>
                <Boton tamano="sm" onClick={() => cambiarObjeto(i, 1)} aria-label={`Agregar un ${o.n}`}>+</Boton>
              </span>
            </li>
          ))}
          {!c.armas.length && !armaduras.length && !(pj.objetos || []).length && <li className="py-2 text-sm text-muted">Todavía no llevas nada.</li>}
        </Lista>
      </Seccion>
      <Seccion titulo="Añadir al inventario"><Agregar /></Seccion>
      <Seccion titulo="Notas" descripcion="Lo que trajeron los kits iniciales y cualquier otra cosa que quieras anotar.">
        <CampoArea path="inventario" value={pj.inventario} rows={5} aria-label="Notas del inventario" />
      </Seccion>
    </div>
  );
}
