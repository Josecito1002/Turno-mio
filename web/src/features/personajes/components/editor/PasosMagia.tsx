/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useId, useState } from 'react';
import { S, render } from '@/app-shell/estado';
import { avisar } from '@/shared/ui/avisos';
import { norm, richT, sign } from '@/shared/utils/texto';
import { Aviso, Boton, Campo, Fila, Lista, Nota, Plegable, Seccion, claseCampo, cx, foco } from '@/shared/ui/kit';
import { AB, ALIN_OPC, TIPOS, abInfo } from '@/features/reglas/data/caracteristicas';
import { TIEMPO_N } from '@/features/reglas/data/conjuros';
import { conjuroDeLaLista, listaDeConjuros } from '@/features/reglas/domain/restricciones';
import { FormaTipo } from '@/features/reglas/components/TipoAccion';
import { todosConjuros } from '@/features/biblioteca/domain/biblioteca';
import { confirmarNoLanzador, leerRasgo, savePj } from '../../acciones';
import { CampoArea, CampoTexto, Selector } from './campos';

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
            {s.nombre}{tiene >= 0 && <span className="ml-1 text-pas" aria-label="(elegido)">✓</span>}
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
  const agregar = () => {
    const n = val('N').trim(); if (!n) { avisar('Ponle nombre al conjuro.', 'aviso'); return; }
    if (!confirmarNoLanzador()) return;
    pj.conjuros.push({ nombre: n, nivel: +val('Nv'), tiempo: val('T'), salv: val('S'), dados: val('D').replace(/\s/g, ''), ataque: chk('At'), mod: chk('M'), conc: chk('C'), extra: chk('E'), alcance: val('A'), desc: val('X') });
    savePj(); render(); avisar(`${n} agregado.`);
  };
  const f = (k: string) => id + k;
  return (
    <div className="grid gap-3" key={pj.conjuros.length}>
      <Campo etiqueta="Nombre"><input id={f('N')} type="text" className={claseCampo} /></Campo>
      <div className="grid gap-3 sm:grid-cols-2">
        <Campo etiqueta="Nivel"><select id={f('Nv')} className={claseCampo}>{Array.from({ length: 10 }, (_, i) => <option key={i} value={i}>{i === 0 ? 'Truco' : i}</option>)}</select></Campo>
        <Campo etiqueta="Se lanza con"><select id={f('T')} className={claseCampo}>{Object.entries(TIEMPO_N).map(([k, n]) => <option key={k} value={k}>{n}</option>)}</select></Campo>
        <Campo etiqueta="Salvación"><select id={f('S')} className={claseCampo}><option value="">Ninguna</option>{AB.map(a => <option key={a[0]}>{a[2]}</option>)}</select></Campo>
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

export function PasoConjuros({ pj, c }: { pj: any; c: any }) {
  const [q, setQ] = useState('');
  const idQ = useId();
  const C = c.C, nq = norm(q);
  const lista = listaDeConjuros(pj.clase, C);
  // Solo los conjuros de la lista de su clase, hasta el nivel que puede lanzar.
  const visibles = lista ? todosConjuros().filter(s => conjuroDeLaLista(s, lista) && (!+s.nivel || +s.nivel <= c.nivelMax)) : [];
  const niveles = [...new Set<number>(visibles.map(s => +s.nivel || 0))].sort((x, y) => x - y);
  return (
    <>
      {C?.lanz ? (
        <>
          <div className="mt-2 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-rule ring-1 ring-rule">
            {[[`${c.trucosUsados}${c.trucosMax != null ? ' / ' + c.trucosMax : ''}`, 'Trucos'], [`${c.prepUsados}${c.prepMax != null ? ' / ' + c.prepMax : ''}`, 'Preparados'], [c.nivelMax || '—', 'Nivel máximo']].map(([v, n]) => (
              <div key={n as string} className="bg-surface px-1 py-3 text-center"><b className="block font-serif text-2xl">{v}</b><span className="text-xs text-muted">{n}</span></div>
            ))}
          </div>
          <Nota>Los <b>trucos</b> se lanzan cuando quieras. Los <b>conjuros preparados</b> gastan un espacio de conjuro{pj.clase === 'brujo' ? ' de pacto' : ''} y los cambias al terminar un descanso largo. Tu CD es {c.dcSpell} y tu ataque de conjuro {sign(c.atkSpell)}, con {abInfo(c.casterAb)[3]}.</Nota>
          {c.siempre.size > 0 && <Nota>Los de tu subclase ya vienen preparados y no cuentan en el límite.</Nota>}
        </>
      ) : <Aviso tipo="info" titulo="Tu clase no lanza conjuros">Si una dote, tu especie o un objeto te da un conjuro, escríbelo abajo; no cuenta en ningún límite.</Aviso>}

      {lista && (
        <Seccion titulo={`Conjuros de ${C.n.toLowerCase()}`} descripcion={`Solo los de tu lista${c.nivelMax ? `, hasta nivel ${c.nivelMax}` : ''}.`}>
          <label htmlFor={idQ} className="sr-only">Buscar conjuro por nombre</label>
          <input id={idQ} type="search" placeholder="Buscar por nombre…" value={q} onChange={e => setQ(e.target.value)} className={cx(claseCampo, 'mb-2')} />
          {niveles.map(n => {
            const todos = visibles.filter(s => (+s.nivel || 0) === n).sort((x, y) => x.nombre.localeCompare(y.nombre));
            const filtrada = nq ? todos.filter(s => norm(s.nombre).includes(nq)) : todos;
            if (nq && !filtrada.length) return null;
            const mios = todos.filter(s => pj.conjuros.some((x: any) => norm(x.nombre) === norm(s.nombre))).length;
            return (
              <Plegable key={n} titulo={n === 0 ? 'Trucos' : `Nivel ${n}`} nota={`${todos.length} conjuros${mios ? `, ${mios} elegido${mios > 1 ? 's' : ''}` : ''}`}
                abierto={nq ? true : !!S.spOpen[n]} onToggle={o => { if (!nq) S.spOpen[n] = o; }}>
                <ul className="m-0 list-none divide-y divide-soft p-0">{filtrada.map(s => <TarjetaConjuro key={s.nombre} s={s} c={c} pj={pj} />)}</ul>
              </Plegable>
            );
          })}
          {!visibles.length && <Nota>No hay conjuros de tu lista en la biblioteca todavía.</Nota>}
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
        <Campo etiqueta="Se usa como"><select id={`${p}T`} className={claseCampo}>{Object.entries(TIPOS).map(([k, [n]]) => <option key={k} value={k}>{n}</option>)}</select></Campo>
        <Campo etiqueta="Desde nivel"><input type="number" id={`${p}Nv`} defaultValue={1} min={1} max={20} className={claseCampo} /></Campo>
        <Campo etiqueta="Usos"><select id={`${p}U`} className={claseCampo}><option value="0">Sin límite</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="pb">Igual a la competencia</option></select></Campo>
        <Campo etiqueta="Se recupera con"><select id={`${p}R`} className={claseCampo}><option value="largo">Descanso largo</option><option value="corto">Descanso corto</option></select></Campo>
      </div>
      <Campo etiqueta="Qué hace" ayuda="Si escribes dados, como 1d8 + 2, se podrán tirar desde la hoja.">
        <textarea id={`${p}X`} rows={3} placeholder="Ejemplo: Recuperas 1d8 + 2 PG." className={cx(claseCampo, 'py-2')} />
      </Campo>
    </div>
  );
}

export function PasoRasgos({ pj }: { pj: any }) {
  const agregar = () => { const r = leerRasgo('r'); if (!r) return; pj.rasgosExtra.push(r); savePj(); render(); avisar(`${r.nombre} agregado.`); };
  return (
    <>
      <p className="mt-2">Habilidades de tu personaje que la app no trae: invocaciones de brujo, poderes de objetos mágicos o regalos de tu DM.</p>
      <Lista etiqueta="Rasgos propios">
        {pj.rasgosExtra.length ? pj.rasgosExtra.map((r: any, i: number) => (
          <Fila key={i}>
            <span className="flex items-center gap-2"><FormaTipo t={r.t || 'pasiva'} /> {r.nombre} <span className="text-sm text-muted">{TIPOS[r.t || 'pasiva'][0]}{+r.n > 1 ? `, desde nivel ${r.n}` : ''}</span></span>
            <Boton tamano="sm" onClick={() => { pj.rasgosExtra.splice(i, 1); savePj(); render(); }} aria-label={`Quitar ${r.nombre}`}>Quitar</Boton>
          </Fila>
        )) : <Fila><span className="text-sm text-muted">Ninguno todavía.</span></Fila>}
      </Lista>
      <Seccion titulo="Agregar rasgo">
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
        <Campo etiqueta="Jugador"><CampoTexto path="jugador" value={pj.jugador} autoComplete="off" /></Campo>
      </div>
      <Campo etiqueta="Alineamiento" className="max-w-sm">
        <Selector path="alineamiento" value={pj.alineamiento}><option value="">Elige…</option>{ALIN_OPC.map(a => <option key={a} value={a}>{a}</option>)}</Selector>
      </Campo>
      <Campo etiqueta="Historia"><CampoArea path="historia" value={pj.historia} rows={6} /></Campo>
    </div>
  );
}

