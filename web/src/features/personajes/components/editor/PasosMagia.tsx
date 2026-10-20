/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useId, useState } from 'react';
import { S, render } from '@/app-shell/estado';
import { avisar } from '@/shared/ui/avisos';
import { norm, richT, sign } from '@/shared/utils/texto';
import { Aviso, Boton, Campo, Fila, Lista, Nota, Plegable, Seccion, Simbolo, claseCampo, cx, foco } from '@/shared/ui/kit';
import { Desplegable } from '@/shared/ui/desplegable';
import { AB, ALIN_OPC, TIPOS, abInfo } from '@/features/reglas/data/caracteristicas';
import { TIEMPO_N } from '@/features/reglas/data/conjuros';
import { conjuroDeLaLista, listaDeConjuros } from '@/features/reglas/domain/restricciones';
import { FormaTipo } from '@/features/reglas/components/TipoAccion';
import { todosConjuros } from '@/features/biblioteca/domain/biblioteca';
import { confirmarNoLanzador, leerRasgo, savePj, setVal } from '../../acciones';
import { CampoArea, CampoTexto } from './campos';

function quitarConjuro(i: number) { S.pj.conjuros.splice(i, 1); savePj(); render(); }

function TarjetaConjuro({ s, c, pj }: { s: any; c: any; pj: any }) {
  const nv = +s.nivel || 0;
  const tiene = pj.conjuros.findIndex((x: any) => norm(x.nombre) === norm(s.nombre));
  const lleno = nv === 0 ? (c.trucosMax != null && c.trucosUsados >= c.trucosMax) : (c.prepMax != null && c.prepUsados >= c.prepMax);
  const bits = [nv === 0 ? 'Truco' : `Nivel ${nv}`, TIEMPO_N[s.tiempo] || 'Acción'];
  if (s.conc) bits.push('Concentración'); if (s.ritual) bits.push('Ritual');
  const efecto = [s.ataque && 'Tirada de ataque', s.salv && `Salvación de ${s.salv}`, s.dados && `${s.dados}${s.tipo ? ' ' + s.tipo : ''}`, s.alcance && `Alcance: ${s.alcance}`].filter(Boolean).join('. ');
  const agregar = () => { pj.conjuros.push({ ...s, extra: false }); savePj(); render(); avisar(`${s.nombre} agregado.`); };
  return (
    <li className="grid grid-cols-[1fr_auto] items-start gap-2 py-1">
      <details className="group min-w-0">
        <summary className={cx('flex min-h-12 cursor-pointer list-none flex-col justify-center rounded-lg py-1 [&::-webkit-details-marker]:hidden', foco)}>
          <span className="font-serif text-[1.05rem] font-bold">
            <span aria-hidden="true" className="mr-1 inline-block text-muted transition-transform group-open:rotate-90">▸</span>
            {s.nombre}{(tiene >= 0 || c.siempre.has(norm(s.nombre))) && <span className="ml-1 text-pas" aria-label={tiene >= 0 ? '(ya lo tienes)' : '(siempre preparado por un rasgo)'}>✓</span>}
          </span>
          <span className="text-sm text-muted">{bits.join(', ')}</span>
        </summary>
        <div className="pb-2 pl-4 text-[0.95rem]">
          {efecto && <p className="m-0 text-sm text-muted">{efecto}.</p>}
          <p className="mb-0 mt-1" dangerouslySetInnerHTML={{ __html: richT(s.desc || 'Sin descripción.') }} />
        </div>
      </details>
      <div className="pt-1.5">
        {tiene >= 0 ? <Boton tamano="sm" onClick={() => quitarConjuro(tiene)} aria-label={`Quitar ${s.nombre}`}>Quitar</Boton>
          : c.siempre.has(norm(s.nombre)) ? <span className="inline-flex min-h-9 items-center px-1 text-sm text-muted">Ya preparado</span>
          : lleno ? <Boton tamano="sm" disabled aria-label={`${s.nombre}: sin cupo`}>Sin cupo</Boton>
          : <Boton tamano="sm" variante="primario" onClick={agregar} aria-label={`Agregar ${s.nombre}`}>Agregar</Boton>}
      </div>
    </li>
  );
}

function ConjuroPropio({ pj }: { pj: any }) {
  const id = useId();
  const val = (k: string) => (document.getElementById(id + k) as HTMLInputElement | null)?.value || '';
  const chk = (k: string) => !!(document.getElementById(id + k) as HTMLInputElement | null)?.checked;
  const agregar = async () => {
    const n = val('N').trim(); if (!n) { avisar('Ponle nombre al conjuro.', 'aviso'); return; }
    if (!(await confirmarNoLanzador())) return;
    pj.conjuros.push({ nombre: n, nivel: +val('Nv'), tiempo: val('T'), salv: val('S'), dados: val('D').replace(/\s/g, ''), ataque: chk('At'), mod: chk('M'), conc: chk('C'), extra: chk('E'), alcance: val('A'), desc: val('X') });
    savePj(); render(); avisar(`${n} agregado.`);
  };
  const f = (k: string) => id + k;
  return (
    <div className="grid gap-3" key={pj.conjuros.length}>
      <Campo etiqueta="Nombre"><input id={f('N')} type="text" className={claseCampo} /></Campo>
      <div className="grid gap-3 sm:grid-cols-2">
        <Campo etiqueta="Nivel"><Desplegable id={f('Nv')}>{Array.from({ length: 10 }, (_, i) => <option key={i} value={i}>{i === 0 ? 'Truco' : i}</option>)}</Desplegable></Campo>
        <Campo etiqueta="Se lanza con"><Desplegable id={f('T')}>{Object.entries(TIEMPO_N).map(([k, n]) => <option key={k} value={k}>{n}</option>)}</Desplegable></Campo>
        <Campo etiqueta="Salvación"><Desplegable id={f('S')}><option value="">Ninguna</option>{AB.map(a => <option key={a[0]}>{a[2]}</option>)}</Desplegable></Campo>
        <Campo etiqueta="Dados" ayuda="Por ejemplo 2d6"><input id={f('D')} type="text" className={claseCampo} /></Campo>
      </div>
      <div>
        {[['At', 'Necesita tirada de ataque'], ['M', 'Suma tu modificador a los dados'], ['C', 'Concentración'], ['E', 'No cuenta en el límite (viene de una dote, especie u objeto)']].map(([k, t]) => (
          <label key={k} className="flex min-h-11 cursor-pointer items-center gap-3"><input id={f(k)} type="checkbox" className={cx('size-5 accent-ink', foco)} />{t}</label>
        ))}
      </div>
      <Campo etiqueta="Alcance"><input id={f('A')} type="text" className={claseCampo} /></Campo>
      <Campo etiqueta="Qué hace"><textarea id={f('X')} rows={3} className={cx(claseCampo, 'py-2')} /></Campo>
      <Boton variante="primario" className="justify-self-start" onClick={agregar}>Agregar conjuro</Boton>
    </div>
  );
}

/** Trucos, preparados y nivel máximo, con el límite si la clase lo tiene. */
export function ContadoresConjuros({ c }: { c: any }) {
  return (
    <div className="mt-2 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-rule ring-1 ring-rule">
      {[[`${c.trucosUsados}${c.trucosMax != null ? ' / ' + c.trucosMax : ''}`, 'Trucos'], [`${c.prepUsados}${c.prepMax != null ? ' / ' + c.prepMax : ''}`, 'Preparados'], [c.nivelMax || '—', 'Nivel máximo']].map(([v, n]) => (
        <div key={n as string} className="bg-surface px-1 py-3 text-center"><b className="block font-serif text-2xl">{v}</b><span className="text-xs text-muted">{n}</span></div>
      ))}
    </div>
  );
}

/** Buscador de los conjuros de la lista de tu clase, hasta el nivel que puedes lanzar, agrupados por nivel. */
export function ListaConjuros({ pj, c }: { pj: any; c: any }) {
  const [q, setQ] = useState('');
  const [filtro, setFiltro] = useState('');
  const idQ = useId();
  const nq = norm(q);
  const pasa = (s: any) => {
    if (!filtro) return true;
    const d = norm(`${s.nombre} ${s.desc || ''}`);
    if (filtro === 'conc') return !!s.conc && s.conc !== 'False';
    if (filtro === 'ritual') return !!s.ritual && s.ritual !== 'False';
    if (filtro === 'cura') return /recupera|cura|puntos de golpe temporales/.test(d);
    if (filtro === 'dano') return (!!s.dados && !/recupera|cura/.test(d)) || (!!s.ataque && s.ataque !== 'False') || /dano/.test(d);
    if (filtro === 'apoyo') return /aliad|ventaja|suma|\+\d|bonificador/.test(d) && !/dano/.test(d);
    return true;
  };
  const FILTROS: [string, string][] = [['', 'Todos'], ['cura', 'Curación'], ['dano', 'Daño'], ['apoyo', 'Apoyo'], ['conc', 'Concentración'], ['ritual', 'Ritual']];
  // La lista de la clase, más las que abra una regla (Secretos Mágicos del bardo: clérigo, druida y mago)
  const listas = [listaDeConjuros(pj.clase, c.C) || c.listaSub, ...(c.listasExtra || [])].filter(Boolean) as string[];
  // Y los trucos de otra lista que da un estilo de combate (Guerrero bendito: clérigo; Guerrero druídico: druida)
  const trucosDe: string[] = c.listasTrucos || [];
  const visibles = listas.length || trucosDe.length ? todosConjuros().filter(s => (listas.some(l => conjuroDeLaLista(s, l)) && (!+s.nivel || +s.nivel <= c.nivelMax)) || (!+s.nivel && trucosDe.some(l => conjuroDeLaLista(s, l)))) : [];
  const niveles = [...new Set<number>(visibles.map(s => +s.nivel || 0))].sort((x, y) => x - y);
  return (
    <>
      <label htmlFor={idQ} className="sr-only">Buscar conjuro por nombre</label>
      <input id={idQ} type="search" placeholder="Buscar por nombre…" value={q} onChange={e => setQ(e.target.value)} className={cx(claseCampo, 'mb-2')} />
      <div role="group" aria-label="Filtrar conjuros" className="-mx-1 mb-3 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
        {FILTROS.map(([k, n]) => (
          <button key={k || 'todos'} type="button" aria-pressed={filtro === k} onClick={() => setFiltro(k)}
            className={cx('min-h-10 shrink-0 cursor-pointer whitespace-nowrap rounded-full px-4 text-body-md', foco,
              filtro === k ? 'bg-surface-container-highest font-semibold text-on-surface' : 'text-on-surface-variant ring-1 ring-surface-container-highest hover:text-on-surface')}>{n}</button>
        ))}
      </div>
      {niveles.map(n => {
        const todos = visibles.filter(s => (+s.nivel || 0) === n).sort((x, y) => x.nombre.localeCompare(y.nombre));
        const filtrada = todos.filter(s => (!nq || norm(s.nombre).includes(nq)) && pasa(s));
        if ((nq || filtro) && !filtrada.length) return null;
        const mios = todos.filter(s => pj.conjuros.some((x: any) => norm(x.nombre) === norm(s.nombre))).length;
        return (
          <Plegable key={n} titulo={n === 0 ? 'Trucos' : `Nivel ${n}`} nota={`${todos.length} conjuros${mios ? `, ${mios} elegido${mios > 1 ? 's' : ''}` : ''}`}
            abierto={nq || filtro ? true : !!S.spOpen[n]} onToggle={o => { if (!nq && !filtro) S.spOpen[n] = o; }}>
            <ul className="m-0 list-none divide-y divide-soft p-0">{filtrada.map(s => <TarjetaConjuro key={s.nombre} s={s} c={c} pj={pj} />)}</ul>
          </Plegable>
        );
      })}
      {!visibles.length && <Nota>No hay conjuros de tu lista en la biblioteca todavía.</Nota>}
    </>
  );
}

export function PasoConjuros({ pj, c }: { pj: any; c: any }) {
  const C = c.C;
  // Una subclase que lanza conjuros (Caballero Arcano, Embaucador Arcano, Artes Místicas) usa la lista de otra clase
  const lista = listaDeConjuros(pj.clase, C) || c.listaSub;
  const nombreLista = listaDeConjuros(pj.clase, C) ? C.n.toLowerCase() : c.listaSub;
  return (
    <>
      {lista ? (
        <>
          <ContadoresConjuros c={c} />
          <dl className="m-0 my-3 grid grid-cols-3 gap-2">
            {([['CD de conjuros', String(c.dcSpell)], ['Ataque de conjuro', sign(c.atkSpell)], ['Característica', abInfo(c.casterAb)[3]]] as [string, string][]).map(([e, v]) => (
              <div key={e} className="rounded-xl bg-surface-container px-3 py-2">
                <dt className="text-label-caps uppercase tracking-wider text-outline">{e}</dt>
                <dd className="m-0 font-serif text-headline-md font-bold text-secondary">{v}</dd>
              </div>
            ))}
          </dl>
          <Nota>Los <b>trucos</b> se lanzan cuando quieras. Los <b>conjuros preparados</b> gastan un espacio de conjuro{pj.clase === 'brujo' ? ' de pacto' : ''} y los cambias al terminar un descanso largo. Tu CD es {c.dcSpell} y tu ataque de conjuro {sign(c.atkSpell)}, con {abInfo(c.casterAb)[3]}.</Nota>
          {c.conjurosRasgo.length > 0 && <Nota>Los que te dan tus rasgos ya están en tu hoja y no cuentan en el límite.</Nota>}
        </>
      ) : <Aviso tipo="info" titulo="Tu clase no lanza conjuros">Los conjuros que te dan tu especie, tus dotes o tu subclase ya salen en tu hoja. Si uno te lo da otra cosa (un objeto, tu DM), escríbelo abajo; no cuenta en ningún límite.</Aviso>}

      {lista && (
        <Seccion titulo={`Conjuros de ${nombreLista}`} descripcion={`Solo los de tu lista${c.nivelMax ? `, hasta nivel ${c.nivelMax}` : ''}.`}>
          <ListaConjuros pj={pj} c={c} />
        </Seccion>
      )}

      {c.conjurosRasgo.length > 0 && (
        <Seccion titulo="Conjuros de tus rasgos" descripcion="Los dan tu especie, tus dotes, tu subclase o tus invocaciones. Ya están en tu hoja y no cuentan en el límite.">
          <Lista>
            {c.conjurosRasgo.map((s: any) => (
              <Fila key={s.nombre}>
                <span>{s.nombre} <span className="text-sm text-muted">{+s.nivel ? 'nivel ' + s.nivel : 'truco'}, de {s.rasgo}{s.nota ? `. ${s.nota}` : ''}</span></span>
              </Fila>
            ))}
          </Lista>
        </Seccion>
      )}

      <Seccion titulo={`Conjuros de ${pj.nombre || 'tu personaje'}`}>
        <Lista>
          {pj.conjuros.length ? pj.conjuros.map((s: any, i: number) => (
            <Fila key={i}>
              <span>{s.nombre} <span className="text-sm text-muted">{+s.nivel ? 'nivel ' + s.nivel : 'truco'}{c.esExtra(s) ? ', no cuenta en el límite' : ''}</span></span>
              <Boton tamano="sm" onClick={() => quitarConjuro(i)} aria-label={`Quitar ${s.nombre}`}>Quitar</Boton>
            </Fila>
          )) : <Fila><span className="text-sm text-muted">Ninguno todavía.</span></Fila>}
        </Lista>
      </Seccion>
      <Plegable titulo="Escribir un conjuro de una dote, especie u objeto" className="mt-6"><ConjuroPropio pj={pj} /></Plegable>
    </>
  );
}

/** Formulario de rasgo (ids con prefijo, se leen con leerRasgo). */
export function RasgoForm({ p }: { p: string }) {
  return (
    <div className="grid gap-3">
      <Campo etiqueta="Nombre del rasgo"><input type="text" id={`${p}N`} className={claseCampo} /></Campo>
      <div className="grid gap-3 sm:grid-cols-2">
        <Campo etiqueta="Se usa como"><Desplegable id={`${p}T`}>{Object.entries(TIPOS).map(([k, [n]]) => <option key={k} value={k}>{n}</option>)}</Desplegable></Campo>
        <Campo etiqueta="Desde nivel"><input type="number" id={`${p}Nv`} defaultValue={1} min={1} max={20} className={claseCampo} /></Campo>
        <Campo etiqueta="Usos"><Desplegable id={`${p}U`}><option value="0">Sin límite</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="pb">Igual a la competencia</option></Desplegable></Campo>
        <Campo etiqueta="Se recupera con"><Desplegable id={`${p}R`}><option value="largo">Descanso largo</option><option value="corto">Descanso corto</option></Desplegable></Campo>
      </div>
      <Campo etiqueta="Qué hace" ayuda="Si escribes dados, como 1d8 + 2, se podrán tirar desde la hoja.">
        <textarea id={`${p}X`} rows={3} placeholder="Ejemplo: Recuperas 1d8 + 2 PG." className={cx(claseCampo, 'py-2')} />
      </Campo>
    </div>
  );
}

/** Plantillas de rasgo propio: llenan el formulario y el jugador cambia lo que quiera. [ícono, nombre, tipo, usos, recarga, texto] */
const PLANTILLAS: [string, string, string, string, string, string][] = [
  ['card_giftcard', 'Regalo del DM', 'pasiva', '0', 'largo', 'Describe aquí lo que te dio tu DM y cuándo aplica.'],
  ['pets', 'Compañero animal', 'adicional', '0', 'largo', 'Tu compañero actúa en tu turno cuando le das una orden. Anota su CA, PG y ataque.'],
  ['shield_moon', 'Bendición o maldición', 'pasiva', '0', 'largo', 'Efecto que te dejó un ser poderoso: qué hace y cómo se quita.'],
  ['construction', 'Objeto especial', 'accion', '1', 'largo', 'Usas el objeto: describe qué pasa. Si tiene dados, escríbelos (ej. 2d6).'],
];
const usarPlantilla = (nombre: string, tipo: string, usos: string, reset: string, texto: string) => {
  const poner = (id: string, v: string) => { const el = document.getElementById('r' + id) as HTMLInputElement | null; if (el) el.value = v; };
  poner('N', nombre); poner('T', tipo); poner('U', usos); poner('R', reset); poner('X', texto);
  document.getElementById('rN')?.focus();
};

export function PasoRasgos({ pj }: { pj: any }) {
  const agregar = () => { const r = leerRasgo('r'); if (!r) return; pj.rasgosExtra.push(r); savePj(); render(); avisar(`${r.nombre} agregado.`); };
  return (
    <>
      <p className="m-0 mb-1 mt-2 text-label-caps uppercase tracking-wider text-outline">Tus rasgos ({pj.rasgosExtra.length})</p>
      <ul className="m-0 flex list-none flex-col gap-2 p-0" aria-label="Rasgos propios">
        {pj.rasgosExtra.length ? pj.rasgosExtra.map((r: any, i: number) => (
          <li key={i} className="flex items-start gap-3 rounded-xl bg-surface-container p-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-container-high"><Simbolo n="auto_fix_high" className="text-headline-sm text-primary" /></span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="flex flex-wrap items-center gap-2"><b>{r.nombre}</b>
                <span className="inline-flex items-center gap-1 text-body-sm text-on-surface-variant"><FormaTipo t={r.t || 'pasiva'} />{TIPOS[r.t || 'pasiva'][0]}{+r.n > 1 ? `, desde nivel ${r.n}` : ''}</span></span>
              {r.texto && <span className="line-clamp-2 text-body-md text-on-surface-variant">{r.texto}</span>}
            </span>
            <Boton tamano="sm" variante="fantasma" onClick={() => { pj.rasgosExtra.splice(i, 1); savePj(); render(); }} aria-label={`Quitar ${r.nombre}`}>Quitar</Boton>
          </li>
        )) : <li className="rounded-xl border border-dashed border-outline-variant p-4 text-center text-body-md text-on-surface-variant">Ninguno todavía. Es opcional: agrégalos solo si tu DM te dio algo especial.</li>}
      </ul>
      <div className="mt-5">
        <p className="m-0 mb-2 text-label-caps uppercase tracking-wider text-outline">Empieza rápido con una plantilla</p>
        <div className="flex flex-wrap gap-2">
          {PLANTILLAS.map(([icono, nombre, tipo, usos, reset, texto]) => (
            <button key={nombre} type="button" onClick={() => usarPlantilla(nombre, tipo, usos, reset, texto)}
              className={cx('inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg bg-surface-container px-3 text-body-md ring-1 ring-surface-container-highest hover:bg-surface-container-high', foco)}>
              <Simbolo n={icono} className="text-headline-sm text-primary" />{nombre}
            </button>
          ))}
        </div>
      </div>
      <Seccion titulo="Agregar un rasgo">
        <div key={pj.rasgosExtra.length}><RasgoForm p="r" /></div>
        <Boton variante="primario" className="mt-3" onClick={agregar}>Agregar rasgo</Boton>
      </Seccion>
    </>
  );
}

export function PasoDetalles({ pj }: { pj: any }) {
  return (
    <div className="mt-2 grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Campo etiqueta="Nombre del personaje"><CampoTexto path="nombre" value={pj.nombre} autoComplete="off" /></Campo>
        {S.usuario && S.usuario.rol !== 'invitado'
          ? <Campo etiqueta="Jugador" ayuda="Es tu nombre de jugador; se cambia en el menú, en Cuenta."><input value={S.usuario.nombre} readOnly className={claseCampo} /></Campo>
          : <Campo etiqueta="Jugador"><CampoTexto path="jugador" value={pj.jugador} autoComplete="off" /></Campo>}
      </div>
      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-1.5 font-bold">Alineamiento</legend>
        <div role="radiogroup" aria-label="Alineamiento" className="grid max-w-xl grid-cols-3 gap-1.5">
          {ALIN_OPC.map(a => {
            const on = pj.alineamiento === a;
            return (
              <button key={a} type="button" role="radio" aria-checked={on} onClick={() => setVal('alineamiento', on ? '' : a)}
                className={cx('min-h-11 cursor-pointer rounded-lg bg-surface-container-lowest px-2 text-body-md transition-colors', foco,
                  on ? 'font-semibold text-on-surface ring-2 ring-primary' : 'text-on-surface-variant ring-1 ring-surface-container-highest hover:text-on-surface')}>
                {a}
              </button>
            );
          })}
        </div>
      </fieldset>
      <Campo etiqueta="Historia"><CampoArea path="historia" value={pj.historia} rows={6} /></Campo>
    </div>
  );
}

