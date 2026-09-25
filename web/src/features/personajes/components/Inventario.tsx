/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, type ReactNode } from 'react';
import { S } from '@/app-shell/estado';
import { Boton, Campo, Lista, Nota, Seccion, Segmentado, claseCampo } from '@/shared/ui/kit';
import { Desplegable } from '@/shared/ui/desplegable';
import { ARMAS, ARMADURAS } from '@/features/reglas/data/equipo';
import { ElegirManos } from './Manos';
import { CampoArea } from './editor/campos';
import { MONEDAS, armadurasDe, bolsaDe, esPropia, puedeJuntar } from '../domain/inventario';
import { MAX_SINTONIA } from '../domain/magicos';
import { OBJETOS_MAGICOS, RAREZAS, type ObjetoMagico } from '@/features/reglas/data/objetos-magicos';
import { ORDEN_TIPOS, TIPOS } from '@/features/reglas/data/caracteristicas';
import { norm } from '@/shared/utils/texto';
import {
  agregarArma, agregarArmadura, agregarMagico, agregarObjeto, cambiarCantidadArma, cambiarCantidadArmadura, cambiarCantidadMagico, cambiarObjeto,
  juntarMonedas, moverMonedas, ponerArmadura, sintonizar,
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
          <Desplegable value={den} onChange={e => setDen(e.target.value)}>
            {MONEDAS.map(([k, nom]) => <option key={k} value={k}>{nom}</option>)}
          </Desplegable>
        </Campo>
        <Campo etiqueta="Cantidad" className="w-28">
          <input type="number" inputMode="numeric" min={1} value={n} onChange={e => setN(e.target.value)} className={claseCampo} />
        </Campo>
        <Boton onClick={() => mover(false)} disabled={!(+n > 0)}>Añadir</Boton>
        <Boton variante="primario" onClick={() => mover(true)} disabled={!(+n > 0)}>Gastar</Boton>
      </div>
      <div className="mt-3"><Boton onClick={juntarMonedas} disabled={!puedeJuntar(b)}>Juntar monedas</Boton></div>
      <Nota className="mt-2">Si no tienes suficientes de esa moneda, se cambia una mayor (o se juntan menores) y recibes el cambio. Juntar monedas cambia cada 10 de cobre por 1 de plata y cada 10 de plata por 1 de oro.</Nota>
    </>
  );
}

const TIPOS_OBJETO = ['maravilloso', 'arma', 'armadura', 'escudo', 'anillo', 'varita', 'vara', 'bastón', 'poción', 'pergamino'];
const Mayus = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** Qué da un objeto, en una línea: sintonización, bonos, cargas y conjuros. */
function resumenMagico(d: ObjetoMagico) {
  return [Mayus(d.tipo) + ', ' + d.rareza, d.sint && 'pide sintonización', d.cargas && `${d.cargas.max} cargas`,
    d.conjuros?.length && `conjuros: ${d.conjuros.map(s => s.n).join(', ')}`].filter(Boolean).join('. ') + '.';
}

/** Objetos mágicos: los oficiales con su descripción, o uno personalizado al final. */
function AgregarMagico() {
  const [buscar, setBuscar] = useState(''), [sel, setSel] = useState(''), [base, setBase] = useState('');
  const [f, setF] = useState<any>({ tipo: 'maravilloso', t: 'pasiva', reset: 'largo' });
  const cambiar = (k: string, v: any) => setF((x: any) => ({ ...x, [k]: v }));
  const q = norm(buscar.trim());
  const claves = Object.keys(OBJETOS_MAGICOS).filter(k => !q || norm(OBJETOS_MAGICOS[k].n).includes(q))
    .sort((a, b) => OBJETOS_MAGICOS[a].n.localeCompare(OBJETOS_MAGICOS[b].n, 'es'));
  const d: ObjetoMagico | null = sel === 'propio'
    ? { n: f.n || 'Objeto mágico', rareza: f.rareza || 'poco común', tipo: f.tipo, texto: f.texto || '', t: f.t, sint: !!f.sint,
        ...(f.tipo === 'arma' || f.tipo === 'armadura' ? { base: f.tipo } : f.tipo === 'escudo' ? { base: 'escudo' as const } : {}),
        ...(+f.bono ? { bono: +f.bono } : {}), ...(+f.bonoCA ? { bonoCA: +f.bonoCA } : {}), ...(+f.bonoSalv ? { bonoSalv: +f.bonoSalv } : {}),
        ...(+f.cargas ? { cargas: { max: +f.cargas, reset: f.reset } } : {}),
        ...(f.conjuros?.trim() ? { conjuros: f.conjuros.split(/[;\n]/).map((x: string) => x.trim()).filter(Boolean).map((x: string) => {
          const [n, coste] = x.split(':'); return { n: n.trim(), coste: (coste || 'según el objeto').trim() }; }) } : {}) }
    : OBJETOS_MAGICOS[sel] || null;
  const pideBase = d && (d.base === 'arma' || d.base === 'armadura');
  const listo = () => { setSel(''); setBase(''); setF({ tipo: 'maravilloso', t: 'pasiva', reset: 'largo' }); };
  const agregar = () => { if (!d) return; agregarMagico(sel === 'propio' ? '' : sel, sel === 'propio' ? d : undefined, base || undefined); listo(); };
  const campo = (k: string, etiqueta: string, props: any = {}) => (
    <Campo etiqueta={etiqueta}><input value={f[k] ?? ''} onChange={e => cambiar(k, e.target.value)} className={claseCampo} {...props} /></Campo>
  );
  return (
    <div className="flex flex-col gap-3">
      <Campo etiqueta="Buscar"><input type="search" value={buscar} onChange={e => setBuscar(e.target.value)} placeholder="Anillo, varita, capa…" className={claseCampo} /></Campo>
      <Campo etiqueta="Objeto mágico">
        <Desplegable value={sel} onChange={e => { setSel(e.target.value); setBase(''); }}>
          <option value="">Elige…</option>
          {RAREZAS.map(r => { const xs = claves.filter(k => OBJETOS_MAGICOS[k].rareza === r); return xs.length ? (
            <optgroup key={r} label={Mayus(r)}>{xs.map(k => <option key={k} value={k}>{OBJETOS_MAGICOS[k].n}</option>)}</optgroup>) : null; })}
          <option value="propio">Personalizado…</option>
        </Desplegable>
      </Campo>
      {sel === 'propio' && (
        <div className="grid gap-3 sm:grid-cols-2">
          {campo('n', 'Nombre')}
          <Campo etiqueta="Tipo">
            <Desplegable value={f.tipo} onChange={e => cambiar('tipo', e.target.value)}>
              {TIPOS_OBJETO.map(t => <option key={t} value={t}>{Mayus(t)}</option>)}
            </Desplegable>
          </Campo>
          <Campo etiqueta="Rareza">
            <Desplegable value={f.rareza || 'poco común'} onChange={e => cambiar('rareza', e.target.value)}>
              {RAREZAS.map(r => <option key={r} value={r}>{Mayus(r)}</option>)}
            </Desplegable>
          </Campo>
          <Campo etiqueta="Cómo se usa">
            <Desplegable value={f.t} onChange={e => cambiar('t', e.target.value)}>
              {ORDEN_TIPOS.map(t => <option key={t} value={t}>{TIPOS[t][0]}</option>)}
            </Desplegable>
          </Campo>
          {['arma', 'armadura', 'escudo'].includes(f.tipo)
            ? campo('bono', f.tipo === 'arma' ? 'Bono al ataque y al daño' : 'Bono a la CA', { type: 'number', inputMode: 'numeric', placeholder: '1' })
            : campo('bonoCA', 'Bono a la CA (opcional)', { type: 'number', inputMode: 'numeric' })}
          {campo('bonoSalv', 'Bono a las salvaciones (opcional)', { type: 'number', inputMode: 'numeric' })}
          {campo('cargas', 'Cargas (opcional)', { type: 'number', inputMode: 'numeric' })}
          {+f.cargas > 0 && (
            <Campo etiqueta="Se recargan con">
              <Desplegable value={f.reset} onChange={e => cambiar('reset', e.target.value)}>
                <option value="largo">Descanso largo (o al amanecer)</option><option value="corto">Descanso corto</option>
              </Desplegable>
            </Campo>
          )}
          <div className="sm:col-span-2">{campo('conjuros', 'Conjuros que da (opcional)', { placeholder: 'Bola de fuego: 1 carga; Luz: a voluntad' })}</div>
          <label className="flex min-h-11 items-center gap-2 sm:col-span-2"><input type="checkbox" checked={!!f.sint} onChange={e => cambiar('sint', e.target.checked)} className="size-5" />Pide sintonización</label>
          <div className="sm:col-span-2">
            <Campo etiqueta="Descripción"><textarea value={f.texto || ''} onChange={e => cambiar('texto', e.target.value)} rows={3} className={claseCampo} /></Campo>
          </div>
        </div>
      )}
      {d && sel !== 'propio' && (
        <div className="rounded-lg bg-soft p-3">
          <p className="m-0 font-bold">{d.n}</p>
          <p className="m-0 text-sm text-muted">{resumenMagico(d)}</p>
          <p className="mb-0 mt-2">{d.texto}</p>
        </div>
      )}
      {pideBase && (
        <Campo etiqueta={d!.base === 'arma' ? 'Qué arma es' : 'Qué armadura es'}>
          <Desplegable value={base} onChange={e => setBase(e.target.value)}>
            <option value="">Elige…</option>
            {d!.base === 'arma'
              ? Object.keys(ARMAS).filter(k => !esPropia(k)).map(k => <option key={k} value={k}>{ARMAS[k].n}</option>)
              : Object.keys(ARMADURAS).filter(k => !esPropia(k)).map(k => <option key={k} value={k}>{ARMADURAS[k].n}</option>)}
          </Desplegable>
        </Campo>
      )}
      <div><Boton variante="primario" disabled={!d || (!!pideBase && !base)} onClick={agregar}>Añadir objeto mágico</Boton></div>
    </div>
  );
}

/** Una fila del inventario: cantidad y nombre a la izquierda, y siempre a la derecha los botones − y + (en 0 se quita). */
function Fila({ q, nombre, detalle, menos, mas, extra, texto = typeof nombre === 'string' ? nombre : 'objeto' }:
  { q: number; nombre: ReactNode; detalle?: ReactNode; menos: () => void; mas: () => void; extra?: ReactNode; texto?: string }) {
  return (
    <li className="flex min-h-12 items-center gap-3 py-2">
      <div className="min-w-0 flex-1">
        {typeof nombre === 'string' && <><b className="font-serif">{q}</b> </>}{nombre}{detalle ? <> <span className="text-sm text-muted">{detalle}</span></> : null}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {extra}
        <Boton tamano="sm" onClick={menos} aria-label={q > 1 ? `Quitar uno: ${texto}` : `Quitar ${texto} del inventario`}>−</Boton>
        <Boton tamano="sm" onClick={mas} aria-label={`Agregar uno: ${texto}`}>+</Boton>
      </div>
    </li>
  );
}

/** Objetos mágicos que lleva: sintonizar y cuántos. */
function ListaMagicos({ c }: { c: any }) {
  if (!c.magicos?.length) return <p className="m-0 text-sm text-muted">No llevas objetos mágicos.</p>;
  return (
    <>
      <p className="mb-2 mt-0 text-sm">Sintonizados: <b>{c.sintonizados} de {MAX_SINTONIA}</b>. Los que piden sintonización solo funcionan sintonizados.</p>
      <Lista etiqueta="Objetos mágicos">
        {c.magicos.map(({ m, d, activo }: any) => (
          <Fila key={m.id} q={+m.q || 1} texto={d.n} menos={() => cambiarCantidadMagico(m.id, -1)} mas={() => cambiarCantidadMagico(m.id, 1)}
            nombre={
              <details>
                <summary className="cursor-pointer">
                  <b className="font-serif">{+m.q || 1}</b> {d.n}{m.arma && ARMAS[m.arma] ? ` (${ARMAS[m.arma].n})` : m.armadura && ARMADURAS[m.armadura] ? ` (${ARMADURAS[m.armadura].n})` : ''}{' '}
                  <span className="text-sm text-muted">{d.sint ? (m.sint ? 'Sintonizado' : 'Sin sintonizar: no funciona') : activo ? 'Activo' : ''}</span>
                </summary>
                <p className="mb-0 mt-1 text-sm text-muted">{resumenMagico(d)}</p>
                <p className="mb-0 mt-1">{d.texto}</p>
              </details>
            }
            extra={d.sint && <Boton tamano="sm" aria-pressed={!!m.sint} onClick={() => sintonizar(m.id)}>{m.sint ? 'Sintonizado' : 'Sintonizar'}</Boton>} />
        ))}
      </Lista>
    </>
  );
}

const PROPIEDADES = ['ligera', 'sutil', 'arrojadiza', 'versátil', 'dos manos', 'pesada', 'alcance', 'munición', 'recarga'];

/** Añadir un objeto: arma o armadura (estándar o personalizada) o un objeto cualquiera. */
function Agregar() {
  const [tipo, setTipo] = useState<'arma' | 'armadura' | 'magico' | 'otro'>('arma');
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
        opciones={[['arma', 'Arma'], ['armadura', 'Armadura'], ['magico', 'Objeto mágico'], ['otro', 'Misceláneo']]} />
      {tipo === 'magico' && <AgregarMagico />}
      {tipo === 'arma' && (
        <>
          <Campo etiqueta="Arma">
            <Desplegable value={sel} onChange={e => setSel(e.target.value)}>
              <option value="">Elige…</option>
              {Object.keys(ARMAS).filter(k => !esPropia(k)).map(k => <option key={k} value={k}>{ARMAS[k].n} ({ARMAS[k].d} {ARMAS[k].tipo})</option>)}
              <option value="propia">Personalizada…</option>
            </Desplegable>
          </Campo>
          {sel === 'propia' ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {campo('n', 'Nombre')}
              {campo('d', 'Dado de daño', { placeholder: '1d8' })}
              {campo('tipo', 'Tipo de daño', { placeholder: 'cortante' })}
              <Campo etiqueta="Categoría">
                <Desplegable value={f.cat || 'sencilla'} onChange={e => cambiar('cat', e.target.value)}>
                  <option value="sencilla">Sencilla</option><option value="marcial">Marcial</option>
                </Desplegable>
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
            <Desplegable value={sel} onChange={e => setSel(e.target.value)}>
              <option value="">Elige…</option>
              {Object.keys(ARMADURAS).filter(k => !esPropia(k)).map(k => <option key={k} value={k}>{ARMADURAS[k].n} ({ARMADURAS[k].cat}, CA {ARMADURAS[k].base})</option>)}
              <option value="escudo">Escudo (+2 CA)</option>
              <option value="propia">Personalizada…</option>
            </Desplegable>
          </Campo>
          {sel === 'propia' ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {campo('n', 'Nombre')}
              {campo('base', 'CA base', { type: 'number', inputMode: 'numeric', placeholder: '14' })}
              <Campo etiqueta="Tipo" ayuda="Ligera suma toda tu DES; media, hasta +2; pesada, nada.">
                <Desplegable value={f.cat || 'ligera'} onChange={e => cambiar('cat', e.target.value)}>
                  <option value="ligera">Ligera</option><option value="media">Media</option><option value="pesada">Pesada</option>
                </Desplegable>
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
  return (
    <div className="flex flex-col gap-4">
      <Seccion titulo="En las manos" descripcion="Solo las armas empuñadas salen en Atacar.">
        <ElegirManos pj={pj} c={c} />
      </Seccion>
      <Seccion titulo="Armadura puesta">
        <Campo etiqueta="Armadura" className="max-w-sm">
          <Desplegable value={c.armorKey || ''} onChange={e => ponerArmadura(e.target.value)}>
            <option value="">Sin armadura</option>
            {cuerpo.map(k => <option key={k} value={k}>{nombreArmadura(k)}{!c.compArm?.[ARMADURAS[k].cat] ? ' — sin competencia' : ''}</option>)}
          </Desplegable>
        </Campo>
        <p className="mb-0 mt-2">CA <b className="font-serif text-xl">{c.ac}</b>{c.armor?.sigilo ? '. Desventaja en Sigilo.' : '.'}</p>
      </Seccion>
      <Seccion titulo="Monedas"><Monedas pj={pj} /></Seccion>
      <Seccion titulo="Inventario">
        <Lista etiqueta="Armas">
          {c.armas.map((a: any) => (
            <Fila key={'a' + a.k} q={a.q} nombre={a.w.n} menos={() => cambiarCantidadArma(a.i, -1)} mas={() => cambiarCantidadArma(a.i, 1)}
              detalle={`${a.dmg}${a.w.p.length ? `, ${a.w.p.join(', ')}` : ''}. ${a.mano === 'principal' ? 'Mano principal' : a.mano === 'otra' ? 'Otra mano' : 'Guardada'}`} />
          ))}
          {armaduras.map(k => (
            <Fila key={'r' + k} q={+pj.cantArm?.[k] || 1} nombre={nombreArmadura(k)} menos={() => cambiarCantidadArmadura(k, -1)} mas={() => cambiarCantidadArmadura(k, 1)}
              detalle={k === 'escudo' ? (c.shield ? 'En la otra mano' : 'Guardado') : c.armorKey === k ? 'Puesta' : 'Guardada'} />
          ))}
          {(pj.objetos || []).map((o: any, i: number) => (
            <Fila key={'o' + i} q={o.q} nombre={o.n} menos={() => cambiarObjeto(i, -1)} mas={() => cambiarObjeto(i, 1)} />
          ))}
          {!c.armas.length && !armaduras.length && !(pj.objetos || []).length && <li className="py-2 text-sm text-muted">Todavía no llevas nada.</li>}
        </Lista>
      </Seccion>
      <Seccion titulo="Objetos mágicos"><ListaMagicos c={c} /></Seccion>
      <Seccion titulo="Añadir al inventario"><div className="rounded-2xl bg-surface p-4 ring-1 ring-rule/60"><Agregar /></div></Seccion>
      <Seccion titulo="Notas" descripcion="Lo que trajeron los kits iniciales y cualquier otra cosa que quieras anotar.">
        <CampoArea path="inventario" value={pj.inventario} rows={5} aria-label="Notas del inventario" />
      </Seccion>
    </div>
  );
}
