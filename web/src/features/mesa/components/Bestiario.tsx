/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { S, render } from '@/app-shell/estado';
import { Boton, Campo, Nota, Seccion, Tarjeta, claseCampo, cx, foco } from '@/shared/ui/kit';
import { modStr, norm, sign } from '@/shared/utils/texto';
import { BotonTirada } from '@/features/dados/components/BotonTirada';
import { PanelMedia } from '@/features/biblioteca/components/PanelMedia';
import { getLib } from '@/features/biblioteca/domain/biblioteca';
import { bestiarioCargado, buscarMonstruos, cargarBestiario, valorCr, type AccionMonstruo, type Monstruo } from '@/features/reglas/data/bestiario';

const AB: [string, string][] = [['fue', 'FUE'], ['des', 'DES'], ['con', 'CON'], ['int', 'INT'], ['sab', 'SAB'], ['car', 'CAR']];
const mod = (n: number) => Math.floor((n - 10) / 2);
const SALV: Record<string, string> = { fue: 'Fuerza', des: 'Destreza', con: 'Constitución', int: 'Inteligencia', sab: 'Sabiduría', car: 'Carisma' };

/** El catálogo del Manual (se carga la primera vez que se usa). */
export function useCatalogo() {
  const [cat, setCat] = useState(bestiarioCargado);
  useEffect(() => { if (!cat) cargarBestiario().then(setCat); }, [cat]);
  return cat;
}

/** Los monstruos de la campaña (de archivos de sesión) primero, luego los del Manual. */
export const todosLosMonstruos = (cp: any, cat: Record<string, Monstruo> | null): Record<string, Monstruo> => ({ ...(cat || {}), ...(cp?.bestiario || {}) });
export const monstruoDe = (cp: any, ref: string) => cp?.bestiario?.[ref] || bestiarioCargado()?.[ref] || null;

/** Descripción de un monstruo: la que escribió el administrador en la biblioteca, o la del lote. */
const descDe = (k: string, m: Monstruo) => getLib().desc?.['m:' + k] ?? m.texto ?? '';

function LineaAccion({ a, nombre }: { a: AccionMonstruo; nombre: string }) {
  const danos = a.dano || [];
  return (
    <div className="py-1.5">
      <b>{a.n}.</b>{' '}
      {a.atk != null && (
        <BotonTirada expr={`1d20${modStr(a.atk)}`} label={`${nombre}: ${a.n}`} dmg={danos.map(d => d.d).join('+') || undefined} dmgLabel={danos.map(d => d.tipo).join(' y ')}>
          {sign(a.atk)} al golpe
        </BotonTirada>
      )}
      {a.alcance && <span className="text-sm text-muted"> {a.atk != null ? 'alcance' : ''} {a.alcance}.</span>}
      {a.cd != null && <span> Salvación de {SALV[a.salv || ''] || a.salv || '—'} CD {a.cd}.</span>}
      {danos.length > 0 && <span> Daño: {danos.map((d, i) => (
        <span key={i}>{i ? ' + ' : ''}<BotonTirada estilo="libre" className="font-bold underline decoration-dotted" expr={d.d} label={`${nombre}: ${a.n} (${d.tipo})`}>{d.d}</BotonTirada> {d.tipo}</span>
      ))}.</span>}
      {a.t && <p className="m-0 mt-0.5 text-sm">{a.t}</p>}
    </div>
  );
}

function Grupo({ titulo, xs, nombre }: { titulo: string; xs?: AccionMonstruo[]; nombre: string }) {
  if (!xs?.length) return null;
  return (
    <div className="mt-3">
      <h4 className="m-0 border-b border-rule pb-1 font-serif text-lg font-bold">{titulo}</h4>
      {xs.map((a, i) => <LineaAccion key={i} a={a} nombre={nombre} />)}
    </div>
  );
}

/** El bloque de estadísticas de un monstruo, con su imagen y descripción (el administrador las edita). */
export function BloqueMonstruo({ k, m }: { k: string; m: Monstruo }) {
  const sinTexto = !m.propio && m.n === m.en && !m.texto;
  const linea = (t: string, v?: string) => v ? <p className="m-0"><b>{t}:</b> {v}</p> : null;
  return (
    <div>
      <PanelMedia k={'m:' + k} n={m.n + (m.n !== m.en ? ` (${m.en})` : '')} d={descDe(k, m)} />
      <Tarjeta className="text-[0.95rem]">
        <p className="m-0 italic text-muted">{[m.tam, m.tipo].filter(Boolean).join(' ')}{m.propio ? ' · de esta campaña' : ''}</p>
        <div className="mt-2 flex flex-wrap gap-x-4">
          <p className="m-0"><b>CA</b> {m.ca}</p>
          <p className="m-0"><b>PG</b> {m.pg}{m.pgF ? ` (${m.pgF})` : ''}</p>
          <p className="m-0"><b>Iniciativa</b> <BotonTirada expr={`1d20${modStr(m.ini)}`} label={`Iniciativa de ${m.n}`}>{sign(m.ini)}</BotonTirada></p>
          {m.vel && <p className="m-0"><b>Velocidad</b> {m.vel}</p>}
        </div>
        <ul className="m-0 mt-2 grid list-none grid-cols-6 gap-1 p-0 text-center">
          {AB.map(([a, t]) => (
            <li key={a}><BotonTirada estilo="bloque" className="py-1" expr={`1d20${modStr(mod((m.ab as any)[a]))}`} label={`${m.n}: prueba de ${SALV[a]}`}>
              <span className="block text-xs font-bold text-muted">{t}</span><span className="block font-bold">{(m.ab as any)[a]}</span><span className="block text-sm">{sign(mod((m.ab as any)[a]))}</span>
            </BotonTirada></li>
          ))}
        </ul>
        <div className="mt-2 grid gap-0.5">
          {linea('Salvaciones', m.salv && Object.entries(m.salv).map(([a, v]) => `${SALV[a] || a} ${sign(v)}`).join(', '))}
          {linea('Habilidades', m.habs && Object.entries(m.habs).map(([h, v]) => `${h} ${sign(v)}`).join(', '))}
          {linea('Vulnerable a', m.vuln)}{linea('Resistencias', m.resist)}{linea('Inmunidades', [m.inmune, m.condInmune].filter(Boolean).join('; '))}
          {linea('Sentidos', m.sentidos)}{linea('Idiomas', m.idiomas)}
          {linea('Desafío', `${m.cr} (${m.xp.toLocaleString('es')} PX; bono de competencia ${sign(m.pb)})`)}
        </div>
        <Grupo titulo="Rasgos" xs={m.rasgos} nombre={m.n} />
        <Grupo titulo="Acciones" xs={m.acciones} nombre={m.n} />
        {m.conjuros?.length ? (
          <div className="mt-3">
            <h4 className="m-0 border-b border-rule pb-1 font-serif text-lg font-bold">Conjuros</h4>
            {m.conjuros.map((c, i) => (
              <div key={i} className="py-1.5">
                <b>{c.n}</b> <span className="text-sm text-muted">({{ action: 'acción', bonus: 'acción adicional', reaction: 'reacción' }[c.como] || c.como}{c.cd ? `, CD ${c.cd}` : ''}{c.atk != null ? `, ataque ${sign(c.atk)}` : ''})</span>
                {c.lista.map((l, j) => <p key={j} className="m-0 text-sm">{l}</p>)}
              </div>
            ))}
          </div>
        ) : null}
        <Grupo titulo="Acciones adicionales" xs={m.adicionales} nombre={m.n} />
        <Grupo titulo="Reacciones" xs={m.reacciones} nombre={m.n} />
        <Grupo titulo="Acciones legendarias" xs={m.legendarias} nombre={m.n} />
        {sinTexto && <Nota className="mt-3">Los nombres y textos en español de este monstruo todavía no están cargados: por ahora salen las estadísticas con los nombres originales.</Nota>}
      </Tarjeta>
    </div>
  );
}

const RANGOS: [string, number, number][] = [['Todos', -1, 99], ['0 a 1', 0, 1], ['2 a 4', 2, 4], ['5 a 10', 5, 10], ['11 a 16', 11, 16], ['17 o más', 17, 99]];

/** Lista con buscador; al elegir uno se muestra su bloque. */
export function VistaBestiario({ cp }: { cp: any }) {
  const cat = useCatalogo(), [q, setQ] = useState(''), [rango, setRango] = useState(0);
  const todos = todosLosMonstruos(cp, cat);
  const sel = S.monstruoSel && todos[S.monstruoSel] ? S.monstruoSel : '';
  if (!cat) return <Nota className="mt-4">Cargando el bestiario…</Nota>;
  if (sel) return (
    <>
      <Boton variante="fantasma" className="mt-3" onClick={() => { S.monstruoSel = null; render(); }}>← Bestiario</Boton>
      <BloqueMonstruo k={sel} m={todos[sel]} />
    </>
  );
  const [, lo, hi] = RANGOS[rango];
  const lista = buscarMonstruos(todos, q, 400).filter(([, m]) => rango === 0 || (valorCr(m.cr) >= lo && valorCr(m.cr) <= hi + 0.99)).slice(0, 120);
  const propios = Object.keys(cp?.bestiario || {}).length;
  return (
    <Seccion titulo="Bestiario" descripcion={`${Object.keys(cat).length} monstruos del Manual de Monstruos 2025${propios ? ` y ${propios} de esta campaña` : ''}. Toca uno para ver su bloque y tirar sus ataques.`}>
      <div className="flex flex-wrap items-end gap-3">
        <Campo etiqueta="Buscar" className="min-w-60 flex-1"><input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Goblin, dragón rojo, Owlbear…" className={claseCampo} /></Campo>
        <Campo etiqueta="Desafío"><select value={rango} onChange={e => setRango(+e.target.value)} className={claseCampo}>{RANGOS.map(([t], i) => <option key={t} value={i}>{t}</option>)}</select></Campo>
      </div>
      <ul className="m-0 mt-3 grid list-none grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2 p-0">
        {lista.map(([k, m]) => (
          <li key={k} className="flex">
            <button type="button" onClick={() => { S.monstruoSel = k; render(); }}
              className={cx('flex w-full cursor-pointer flex-col rounded-xl bg-surface px-3 py-2 text-left ring-1 ring-rule/60 hover:bg-soft', foco)}>
              <b>{m.n}</b>
              <span className="text-sm text-muted">Desafío {m.cr} · CA {m.ca} · {m.pg} PG{m.propio ? ' · de la campaña' : ''}</span>
            </button>
          </li>
        ))}
      </ul>
      {!lista.length && <Nota className="mt-2">No hay monstruos con ese nombre.</Nota>}
    </Seccion>
  );
}

/** Buscador para agregar enemigos: al elegir uno se llama a `elegir` con su clave y sus datos. */
export function BuscadorEnemigo({ cp, elegir }: { cp: any; elegir: (k: string, m: Monstruo) => void }) {
  const cat = useCatalogo(), [q, setQ] = useState('');
  const t = norm(q).trim();
  const lista = t.length >= 2 ? buscarMonstruos(todosLosMonstruos(cp, cat), q, 8) : [];
  return (
    <div>
      <Campo etiqueta="Buscar en el bestiario" ayuda={cat ? 'Escribe al menos dos letras; al elegir uno se llenan CA, PG e iniciativa.' : 'Cargando el bestiario…'}>
        <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Goblin, esqueleto, ogro…" className={claseCampo} disabled={!cat} />
      </Campo>
      {lista.length > 0 && (
        <ul className="m-0 mt-1 grid list-none gap-1 p-0">
          {lista.map(([k, m]) => (
            <li key={k}><button type="button" onClick={() => { elegir(k, m); setQ(''); }}
              className={cx('w-full cursor-pointer rounded-lg bg-surface px-3 py-1.5 text-left ring-1 ring-rule/60 hover:bg-soft', foco)}>
              <b>{m.n}</b> <span className="text-sm text-muted">Desafío {m.cr} · CA {m.ca} · {m.pg} PG · iniciativa {sign(m.ini)}</span>
            </button></li>
          ))}
        </ul>
      )}
    </div>
  );
}
