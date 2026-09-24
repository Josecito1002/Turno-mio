/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { S, render } from '@/app-shell/estado';
import { avisar } from '@/shared/ui/avisos';
import { norm, richT, sign } from '@/shared/utils/texto';
import { AB, ALIN_OPC, TIPOS, abInfo } from '@/features/reglas/data/caracteristicas';
import { TIEMPO_N } from '@/features/reglas/data/conjuros';
import { todosConjuros } from '@/features/biblioteca/domain/biblioteca';
import { Shape } from '../piezas';
import { confirmarNoLanzador, leerRasgo, savePj } from '../../acciones';
import { CampoArea, CampoTexto, Selector } from './campos';

function quitarConjuro(i: number) { S.pj.conjuros.splice(i, 1); savePj(); render(); }

function TarjetaConjuro({ s, c, pj }: { s: any; c: any; pj: any }) {
  const cls = pj.clase, nv = +s.nivel || 0;
  const tiene = pj.conjuros.findIndex((x: any) => norm(x.nombre) === norm(s.nombre));
  const deSuLista = !c.C?.lanz || (s.clases || []).includes(cls) || (c.C.lib && !todosConjuros().some(x => (x.clases || []).includes(cls)));
  const fuera = !deSuLista || (nv > 0 && nv > c.nivelMax);
  const lleno = nv === 0 ? (c.trucosMax != null && c.trucosUsados >= c.trucosMax) : (c.prepMax != null && c.prepUsados >= c.prepMax);
  const bits = [nv === 0 ? 'Truco' : `Nivel ${nv}`, TIEMPO_N[s.tiempo] || 'Acción'];
  if (s.conc) bits.push('Concentración'); if (s.ritual) bits.push('Ritual');
  const efecto = [s.ataque && 'Tirada de ataque', s.salv && `Salvación de ${s.salv}`, s.dados && `${s.dados}${s.tipo ? ' ' + s.tipo : ''}`, s.alcance && `Alcance: ${s.alcance}`].filter(Boolean).join('. ');
  const agregar = () => {
    if (!confirmarNoLanzador()) return;
    pj.conjuros.push({ ...s, extra: fuera }); savePj(); render(); avisar(`${s.nombre} agregado.`);
  };
  return (
    <div className={`spc${tiene >= 0 ? ' mine' : ''}`}>
      <details><summary><span className="sp-n">{s.nombre}</span><span className="sp-k">{bits.join(', ')}</span></summary>
        <div className="sp-body">{efecto && <p className="note">{efecto}.</p>}<p dangerouslySetInnerHTML={{ __html: richT(s.desc || 'Sin descripción.') }} /></div>
      </details>
      {tiene >= 0 ? <button className="btn ghost small" onClick={() => quitarConjuro(tiene)}>Quitar</button>
        : lleno && !fuera ? <button className="btn ghost small" disabled>Sin cupo</button>
        : <button className="btn small" onClick={agregar}>{fuera ? 'Agregar aparte' : 'Agregar'}</button>}
    </div>
  );
}

export function PasoConjuros({ pj, c }: { pj: any; c: any }) {
  const [q, setQ] = useState('');
  const C = c.C, nq = norm(q);
  const todos = todosConjuros();
  const conLista = todos.some(s => (s.clases || []).includes(pj.clase));
  const visibles = todos.filter(s => S.spTodos || !C?.lanz || ((conLista ? (s.clases || []).includes(pj.clase) : true) && (!+s.nivel || +s.nivel <= c.nivelMax)));
  const niveles = [...new Set<number>(visibles.map(s => +s.nivel || 0))].sort((x, y) => x - y);
  const val = (id: string) => (document.getElementById(id) as HTMLInputElement | null)?.value || '';
  const chk = (id: string) => !!(document.getElementById(id) as HTMLInputElement | null)?.checked;
  const agregarPropio = () => {
    const n = val('cjN').trim(); if (!n) { avisar('Ponle nombre al conjuro.', 'aviso'); return; }
    if (!confirmarNoLanzador()) return;
    pj.conjuros.push({ nombre: n, nivel: +val('cjNv'), tiempo: val('cjT'), salv: val('cjS'), dados: val('cjD').replace(/\s/g, ''), ataque: chk('cjAt'), mod: chk('cjM'), conc: chk('cjC'), extra: chk('cjE'), alcance: val('cjA'), desc: val('cjX') });
    savePj(); render(); avisar(`${n} agregado.`);
  };
  return (
    <>
      {C?.lanz ? (
        <>
          <div className="stats" style={{ gridTemplateColumns: 'repeat(3,1fr)', marginTop: 18 }}>
            <div className="stat"><b>{c.trucosUsados}{c.trucosMax != null ? ' / ' + c.trucosMax : ''}</b><span>Trucos</span></div>
            <div className="stat"><b>{c.prepUsados}{c.prepMax != null ? ' / ' + c.prepMax : ''}</b><span>Preparados</span></div>
            <div className="stat"><b>{c.nivelMax || '—'}</b><span>Nivel máximo</span></div>
          </div>
          <p className="note">Los <b>trucos</b> se lanzan cuando quieras, sin gastar nada. Los <b>conjuros preparados</b> son los que puedes lanzar gastando un espacio de conjuro{pj.clase === 'brujo' ? ' de pacto' : ''}; al terminar un descanso largo puedes cambiarlos. Tu CD es {c.dcSpell} y tu ataque de conjuro {sign(c.atkSpell)}, con {abInfo(c.casterAb)[3]}.</p>
          {c.siempre.size > 0 && <p className="note">Los de tu subclase ya vienen preparados y no cuentan en el límite.</p>}
        </>
      ) : <p className="note" style={{ marginTop: 18 }}>Tu clase no lanza conjuros. Puedes agregar los que te den tu especie o tus dotes; no cuentan en ningún límite.</p>}
      <h2 className="plain">{C?.lanz && !S.spTodos ? `Conjuros de ${C.n.toLowerCase()} que puedes elegir` : 'Todos los conjuros'}</h2>
      <div className="form">
        <input type="search" placeholder="Buscar por nombre" aria-label="Buscar conjuro" value={q} onChange={e => setQ(e.target.value)} />
        {C?.lanz && !C.lib && (
          <label className="check"><input type="checkbox" checked={S.spTodos} onChange={e => { S.spTodos = e.target.checked; render(); }} />Ver también los de otras clases (para dotes o especie; no cuentan en el límite)</label>
        )}
      </div>
      {niveles.map(n => {
        const lista = visibles.filter(s => (+s.nivel || 0) === n).sort((x, y) => x.nombre.localeCompare(y.nombre));
        const filtrada = nq ? lista.filter(s => norm(s.nombre).includes(nq)) : lista;
        if (nq && !filtrada.length) return null;
        const mios = lista.filter(s => pj.conjuros.some((x: any) => norm(x.nombre) === norm(s.nombre))).length;
        return (
          <details key={n} className="more spg" open={nq ? true : !!S.spOpen[n]}
            onToggle={e => { if (!nq) S.spOpen[n] = (e.target as HTMLDetailsElement).open; }}>
            <summary>{n === 0 ? 'Trucos' : `Nivel ${n}`} <span className="note">{lista.length} conjuros{mios ? `, ${mios} elegido${mios > 1 ? 's' : ''}` : ''}</span></summary>
            <div className="sp-list t-pasiva">{filtrada.map(s => <TarjetaConjuro key={s.nombre} s={s} c={c} pj={pj} />)}</div>
          </details>
        );
      })}
      {!visibles.length && <p className="note">No hay conjuros para mostrar.</p>}
      <details className="more"><summary>Escribir un conjuro que no aparece</summary>
        <div className="form" key={pj.conjuros.length}>
          <label>Nombre<input type="text" id="cjN" /></label>
          <div className="row">
            <label>Nivel<select id="cjNv">{Array.from({ length: 10 }, (_, i) => <option key={i} value={i}>{i === 0 ? 'Truco' : i}</option>)}</select></label>
            <label>Se lanza con<select id="cjT">{Object.entries(TIEMPO_N).map(([k, n]) => <option key={k} value={k}>{n}</option>)}</select></label>
          </div>
          <div className="row">
            <label>Salvación<select id="cjS"><option value="">Ninguna</option>{AB.map(a => <option key={a[0]}>{a[2]}</option>)}</select></label>
            <label>Dados (ej. 2d6)<input type="text" id="cjD" placeholder="2d6" /></label>
          </div>
          <label className="check"><input type="checkbox" id="cjAt" />Necesita tirada de ataque</label>
          <label className="check"><input type="checkbox" id="cjM" />Suma tu modificador a los dados</label>
          <label className="check"><input type="checkbox" id="cjC" />Concentración</label>
          <label className="check"><input type="checkbox" id="cjE" />No cuenta en el límite (viene de una dote, especie u objeto)</label>
          <label>Alcance<input type="text" id="cjA" /></label>
          <label>Qué hace<textarea id="cjX" rows={3} /></label>
          <button className="btn" onClick={agregarPropio}>Agregar conjuro</button>
        </div>
      </details>
      <h2 className="plain">Conjuros de {pj.nombre || 'tu personaje'}</h2>
      <div className="list">
        {pj.conjuros.length ? pj.conjuros.map((s: any, i: number) => (
          <div className="li" key={i}>
            <span>{s.nombre} <span className="note">{+s.nivel ? 'nivel ' + s.nivel : 'truco'}{c.esExtra(s) ? ', no cuenta en el límite' : ''}</span></span>
            <button className="btn ghost small" onClick={() => quitarConjuro(i)}>Quitar</button>
          </div>
        )) : <div className="li"><span className="note">Ninguno todavía.</span></div>}
      </div>
    </>
  );
}

/** Formulario de rasgo (ids con prefijo, se leen con leerRasgo). */
export function RasgoForm({ p }: { p: string }) {
  return (
    <>
      <label>Nombre del rasgo<input type="text" id={`${p}N`} /></label>
      <div className="row">
        <label>Se usa como<select id={`${p}T`}>{Object.entries(TIPOS).map(([k, [n]]) => <option key={k} value={k}>{n}</option>)}</select></label>
        <label>Desde nivel<input type="number" id={`${p}Nv`} defaultValue={1} min={1} max={20} /></label>
      </div>
      <div className="row">
        <label>Usos<select id={`${p}U`}><option value="0">Sin límite</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="pb">Igual a la competencia</option></select></label>
        <label>Se recupera con<select id={`${p}R`}><option value="largo">Descanso largo</option><option value="corto">Descanso corto</option></select></label>
      </div>
      <label>Qué hace<textarea id={`${p}X`} rows={3} placeholder="Ejemplo: Recuperas 1d8 + 2 PG." /></label>
      <p className="note">Si escribes dados, como 1d8 + 2, se podrán tirar desde la hoja.</p>
    </>
  );
}

export function PasoRasgos({ pj }: { pj: any }) {
  const agregar = () => { const r = leerRasgo('r'); if (!r) return; pj.rasgosExtra.push(r); savePj(); render(); avisar(`${r.nombre} agregado.`); };
  return (
    <>
      <p style={{ marginTop: 18 }}>Aquí van las habilidades extra de tu personaje que la app no trae: invocaciones de brujo, poderes de objetos mágicos o regalos de tu DM.</p>
      <div className="list">
        {pj.rasgosExtra.length ? pj.rasgosExtra.map((r: any, i: number) => (
          <div className="li" key={i}>
            <span><Shape t={r.t || 'pasiva'} /> {r.nombre} <span className="note">{TIPOS[r.t || 'pasiva'][0]}{+r.n > 1 ? `, desde nivel ${r.n}` : ''}</span></span>
            <button className="btn ghost small" onClick={() => { pj.rasgosExtra.splice(i, 1); savePj(); render(); }}>Quitar</button>
          </div>
        )) : <div className="li"><span className="note">Ninguno todavía.</span></div>}
      </div>
      <h2 className="plain">Agregar rasgo</h2>
      <div className="form" key={pj.rasgosExtra.length}><RasgoForm p="r" /><button className="btn" onClick={agregar}>Agregar rasgo</button></div>
    </>
  );
}

export function PasoDetalles({ pj }: { pj: any }) {
  return (
    <div className="form" style={{ marginTop: 18 }}>
      <label>Nombre del personaje<CampoTexto path="nombre" value={pj.nombre} /></label>
      <label>Jugador<CampoTexto path="jugador" value={pj.jugador} /></label>
      <label>Alineamiento
        <Selector path="alineamiento" value={pj.alineamiento}><option value="">Elige…</option>{ALIN_OPC.map(a => <option key={a} value={a}>{a}</option>)}</Selector>
      </label>
      <label>Historia<CampoArea path="historia" value={pj.historia} rows={6} /></label>
    </div>
  );
}
