/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { S, render, irArriba } from '@/app-shell/estado';
import { almacen } from '@/app-shell/almacen';
import { avisar } from '@/shared/ui/avisos';
import { modStr, sign } from '@/shared/utils/texto';
import { useDados } from '@/features/dados/components/Bandeja';
import { BotonTirada } from '@/features/dados/components/BotonTirada';
import { rnd } from '@/features/dados/domain/dados';
import { resumen } from '@/features/personajes/domain/modelo';
import { abrir } from '@/features/personajes/acciones';
import { CONDICIONES, cambiarPg, campActual, camps, combatiente, estadoDe, guardarCamp, ordenar } from '../domain/combate';

const val = (id: string) => (document.getElementById(id) as HTMLInputElement | null)?.value || '';
/** Cada acción trabaja sobre una copia fresca de la campaña, la guarda y redibuja. */
function conCamp(fn: (cp: any) => void | false) {
  const cp = campActual(); if (!cp) return;
  if (fn(cp) === false) return;
  guardarCamp(cp); render();
}

function Condiciones({ cp, k }: { cp: any; k: string }) {
  const e = estadoDe(cp, k);
  const alternar = (n: string) => conCamp(c => { const x = estadoDe(c, k); x.cond = x.cond.includes(n) ? x.cond.filter((y: string) => y !== n) : [...x.cond, n]; });
  return (
    <div className="conds">
      {e.cond.map((n: string) => <button key={n} className="cond on" title="Quitar" onClick={() => alternar(n)}>{n} ×</button>)}
      <details className="cond-add"><summary>+ Condición</summary>
        <div className="conds">{CONDICIONES.filter(n => !e.cond.includes(n)).map(n => <button key={n} className="cond" onClick={() => alternar(n)}>{n}</button>)}</div>
      </details>
    </div>
  );
}

function PuntosGolpe({ x }: { x: any }) {
  const pct = x.pgMax ? Math.max(0, Math.min(100, Math.round(100 * x.pg / x.pgMax))) : 0;
  const aplicar = (d: 'dano' | 'cura') => {
    const v = parseInt(val('amt-' + x.k)) || 0; if (!v) { avisar('Escribe cuánto.', 'aviso'); return; }
    conCamp(cp => cambiarPg(cp, x.k, d === 'dano' ? -v : v));
  };
  return (
    <>
      <div className="pgbar"><span style={{ width: `${pct}%` }} className={pct <= 25 ? 'baja' : pct <= 50 ? 'media' : ''} /></div>
      <div className="pgctl">
        <b>{x.pg}</b><span className="note">/ {x.pgMax} PG</span>
        <input key={x.pg} type="number" inputMode="numeric" min={0} placeholder="0" id={'amt-' + x.k} aria-label="Cantidad" />
        <button className="btn small" onClick={() => aplicar('dano')}>Daño</button>
        <button className="btn ghost small" onClick={() => aplicar('cura')}>Curar</button>
      </div>
    </>
  );
}

function Muerte({ cp, x }: { cp: any; x: any }) {
  if (x.tipo !== 'pj' || x.pg > 0) return null;
  const m = estadoDe(cp, x.k).muerte;
  const tocar = (t: 'e' | 'f', i: number) => conCamp(c => { const mm = estadoDe(c, x.k).muerte; mm[t] = i < mm[t] ? i : i + 1; });
  const pips = (t: 'e' | 'f', n: number) => Array.from({ length: 3 }, (_, i) => (
    <button key={i} className={`pip sm${i < n ? '' : ' used'}${t === 'f' ? ' f' : ''}`} onClick={() => tocar(t, i)} aria-label={`${t === 'e' ? 'Éxito' : 'Fallo'} ${i + 1}`} />
  ));
  return (
    <div className="muerte"><span>A 0 PG.</span><span>Éxitos</span><div className="pips">{pips('e', m.e)}</div><span>Fallos</span><div className="pips">{pips('f', m.f)}</div>
      <BotonTirada expr="1d20" label={`Salvación contra muerte de ${x.nombre}`} className="wide">Tirar</BotonTirada>
    </div>
  );
}

function TarjetaPj({ cp, x }: { cp: any; x: any }) {
  const c = x.c, pj = x.pj, subN = c.SD ? c.SD.n : '';
  return (
    <article className="mcard">
      <header>
        <div><h3>{x.nombre}</h3><p className="note">{resumen(pj)}{subN ? `, ${subN}` : ''}{pj.jugador ? `. Juega ${pj.jugador}` : ''}</p></div>
        <button className="btn ghost small" onClick={() => abrir(pj.id)}>Hoja</button>
      </header>
      <div className="mstats">
        <div><b>{x.ca}</b><span>CA</span></div><div><b>{c.passive}</b><span>Percepción pasiva</span></div>
        <div><b>{10 + c.skill.perspicacia}</b><span>Perspicacia pasiva</span></div><div><b>{10 + c.skill.investigacion}</b><span>Investigación pasiva</span></div>
        <div><b>{sign(c.init)}</b><span>Iniciativa</span></div><div><b>{c.speed}</b><span>Pies</span></div>
        {c.dcSpell && <div><b>{c.dcSpell}</b><span>CD conjuros</span></div>}
      </div>
      <PuntosGolpe x={x} /><Muerte cp={cp} x={x} /><Condiciones cp={cp} k={x.k} />
      <button className="btn ghost small quitar" onClick={() => conCamp(c2 => { c2.pjs = c2.pjs.filter((i: string) => i !== pj.id); c2.combate.orden = (c2.combate.orden || []).filter((o: any) => o.k !== 'pj:' + pj.id); })}>Sacar de la campaña</button>
    </article>
  );
}

export function MesaVista({ importarHojas }: { importarHojas: () => void }) {
  const tirar = useDados();
  const l = camps();
  if (!S.camp || !campActual()) {
    S.camp = null;
    const crear = () => {
      const n = val('campN').trim(); if (!n) { avisar('Ponle nombre a la campaña.', 'aviso'); return; }
      const nueva = { id: 'c-' + Date.now().toString(36), nombre: n, pjs: [], monstruos: [], estado: {}, combate: { activo: false, ronda: 1, turno: 0, orden: [] } };
      guardarCamp(nueva); S.camp = nueva.id; S.mtab = 'grupo'; render();
    };
    return (
      <>
        <section className="hero"><h1>Mesa del DM</h1><p className="who">Junta las hojas de tu grupo en una campaña para ver de un vistazo PG, CA y pasivas, y llevar el combate: iniciativa, daño y condiciones.</p></section>
        <div className="plist">{l.map(cp => (
          <button key={cp.id} className="card" onClick={() => { S.camp = cp.id; S.mtab = 'grupo'; render(); irArriba(); }}>
            <b>{cp.nombre}</b><span>{cp.pjs.length} personaje{cp.pjs.length === 1 ? '' : 's'}{cp.combate?.activo ? ', en combate' : ''}</span>
          </button>
        ))}</div>
        <div className="form" key={l.length}>
          <label>Nueva campaña<input type="text" id="campN" placeholder="Nombre de la campaña" /></label>
          <button className="btn" onClick={crear} style={{ alignSelf: 'flex-start' }}>Crear campaña</button>
        </div>
      </>
    );
  }
  const cp = campActual();
  cp.combate = cp.combate || { activo: false, ronda: 1, turno: 0, orden: [] }; cp.monstruos = cp.monstruos || [];
  const grupo = cp.pjs.map((id: string) => combatiente('pj:' + id, cp)).filter(Boolean);
  const fuera = S.list.filter(p => !cp.pjs.includes(p.id));
  const mtab = S.mtab || 'grupo';
  const cabecera = (
    <>
      <section className="hero"><h1>{cp.nombre}</h1><p className="who">{grupo.length} personaje{grupo.length === 1 ? '' : 's'}. Los cambios de PG y condiciones quedan en tus copias de las hojas; no llegan a las cuentas de los jugadores.</p></section>
      <nav className="tabs">{[['grupo', 'Grupo'], ['combate', cp.combate.activo ? `Combate, ronda ${cp.combate.ronda}` : 'Combate']].map(([k, n]) => (
        <button key={k} className="tab" aria-selected={mtab === k} onClick={() => { S.mtab = k; render(); }}>{n}</button>
      ))}</nav>
    </>
  );

  if (mtab === 'grupo') {
    const agregar = () => {
      const ids = [...document.querySelectorAll<HTMLInputElement>('#campAddList input:checked')].map(i => i.value);
      if (!ids.length) { avisar('Marca al menos uno.', 'aviso'); return; }
      conCamp(c => { c.pjs.push(...ids.filter(i => !c.pjs.includes(i))); });
    };
    const borrar = () => {
      if (!confirm(`¿Borrar la campaña ${cp.nombre}? Los personajes no se borran.`)) return;
      almacen.borrarCampana(cp.id); S.camp = null; render();
    };
    return (
      <>
        {cabecera}
        {grupo.length ? <div className="mgrid">{grupo.map((x: any) => <TarjetaPj key={x.k} cp={cp} x={x} />)}</div> : <p className="note" style={{ marginTop: 18 }}>Todavía no hay personajes en esta campaña.</p>}
        <h2 className="plain">Agregar personajes</h2>
        {fuera.length > 0 && <>
          <div className="checks" id="campAddList" key={cp.pjs.length}>
            {fuera.map(p => <label key={p.id} className="check"><input type="checkbox" value={p.id} />{p.name} <span className="note">{p.sub || ''}</span></label>)}
          </div>
          <button className="btn" onClick={agregar}>Agregar seleccionados</button>
        </>}
        <p className="note">Pide a cada jugador su respaldo (en su hoja: Guardar respaldo) e impórtalos aquí; se agregan solos a la campaña.</p>
        <button className="btn ghost" onClick={importarHojas}>Importar hojas de jugadores</button>
        <div className="row" style={{ marginTop: 28 }}><button className="btn ghost small" onClick={borrar}>Borrar campaña</button></div>
      </>
    );
  }

  // Combate
  const cb = cp.combate;
  const quitarMon = (id: string) => conCamp(c => { c.monstruos = c.monstruos.filter((m: any) => m.id !== id); c.combate.orden = (c.combate.orden || []).filter((o: any) => o.k !== 'm:' + id); });
  const agregarMon = () => {
    const n = val('monN').trim() || 'Enemigo', q = Math.min(20, Math.max(1, +val('monQ') || 1)), pg = Math.max(1, +val('monPG') || 1);
    const ca = +val('monCA') || 10, bono = +val('monB') || 0;
    conCamp(c => {
      for (let i = 0; i < q; i++) {
        const m = { id: Date.now().toString(36) + i, nombre: q > 1 ? `${n} ${i + 1}` : n, ca, pgMax: pg, pg, bono };
        c.monstruos.push(m);
        if (c.combate.activo) c.combate.orden.push({ k: 'm:' + m.id, init: rnd(20) + m.bono, bono: m.bono });
      }
      if (c.combate.activo) ordenar(c);
    });
    avisar(`${q > 1 ? q + ' enemigos agregados' : n + ' agregado'}.`);
  };
  const monForm = (
    <details className="more" open={!cb.activo}><summary>Agregar enemigos</summary>
      <div className="form" key={cp.monstruos.length}>
        <label>Nombre<input type="text" id="monN" placeholder="Goblin" /></label>
        <div className="row">
          <label>CA<input type="number" id="monCA" defaultValue={13} /></label>
          <label>PG<input type="number" id="monPG" defaultValue={7} /></label>
          <label>Bono de iniciativa<input type="number" id="monB" defaultValue={2} /></label>
          <label>Cuántos<input type="number" id="monQ" defaultValue={1} min={1} max={20} /></label>
        </div>
        <button className="btn" onClick={agregarMon} style={{ alignSelf: 'flex-start' }}>Agregar</button>
      </div>
    </details>
  );
  if (!cb.activo) {
    const empezar = () => conCamp(c => {
      const orden = [...c.pjs.map((id: string) => 'pj:' + id), ...c.monstruos.map((m: any) => 'm:' + m.id)].map(k => combatiente(k, c)).filter(Boolean).map((x: any) => ({ k: x.k, init: rnd(20) + x.bono, bono: x.bono }));
      c.combate = { activo: true, ronda: 1, turno: 0, orden }; ordenar(c); c.combate.turno = 0;
    });
    return (
      <>
        {cabecera}
        <p style={{ marginTop: 18 }}>Se tira iniciativa para todo el grupo y los enemigos, y se ordena solo. Después puedes corregir cualquier valor.</p>
        <div className="list">{cp.monstruos.length ? cp.monstruos.map((m: any) => (
          <div className="li" key={m.id}><span>{m.nombre} <span className="note">CA {m.ca}, {m.pg}/{m.pgMax} PG, iniciativa {sign(m.bono)}</span></span><button className="btn ghost small" onClick={() => quitarMon(m.id)}>Quitar</button></div>
        )) : <div className="li"><span className="note">Sin enemigos todavía.</span></div>}</div>
        {monForm}
        <div className="row"><button className="btn" disabled={!(grupo.length || cp.monstruos.length)} onClick={() => { empezar(); irArriba(); avisar('Iniciativa tirada para todos.'); }}>Empezar combate</button></div>
      </>
    );
  }
  cb.orden = cb.orden.filter((o: any) => combatiente(o.k, cp));
  const actual = cb.orden[cb.turno];
  const siguiente = () => conCamp(c => { const b = c.combate; if (!b.orden.length) return false; b.turno++; if (b.turno >= b.orden.length) { b.turno = 0; b.ronda++; } });
  const terminar = () => {
    const quitar = cp.monstruos.length && confirm('¿Quitar también a los enemigos?');
    conCamp(c => { c.combate = { activo: false, ronda: 1, turno: 0, orden: [] }; if (quitar) c.monstruos = []; });
  };
  const fijarInit = (k: string, v: number) => conCamp(c => { const o = c.combate.orden.find((o: any) => o.k === k); if (!o) return false; o.init = v; ordenar(c); });
  return (
    <>
      {cabecera}
      <div className="row" style={{ marginTop: 14 }}><button className="btn" onClick={siguiente}>Siguiente turno</button><button className="btn ghost" onClick={terminar}>Terminar combate</button></div>
      <p className="note">Turno de <b>{actual ? combatiente(actual.k, cp).nombre : '—'}</b>. Ronda {cb.ronda}.</p>
      <div className="orden">
        {cb.orden.map((o: any, i: number) => {
          const x = combatiente(o.k, cp), caido = x.pg <= 0;
          return (
            <article key={o.k} className={`mrow${i === cb.turno ? ' actual' : ''}${caido ? ' caido' : ''}${x.tipo === 'm' ? ' enemigo' : ''}`}>
              <div className="mrow-h">
                <div className="ini">
                  <input key={o.init} type="number" defaultValue={o.init} aria-label={`Iniciativa de ${x.nombre}`} onBlur={e => { if (+e.target.value !== o.init) fijarInit(o.k, +e.target.value || 0); }} onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }} />
                  <button className="rb" data-roll-manual="" onClick={() => tirar(`1d20${modStr(x.bono)}`, `Iniciativa de ${x.nombre}`, { noRepeat: true }).then(r => fijarInit(o.k, r.total))}>d20</button>
                </div>
                <div className="mrow-n"><b>{x.nombre}</b><span className="note">CA {x.ca}{x.tipo === 'pj' ? `, percepción pasiva ${x.c.passive}` : ''}</span></div>
                {x.tipo === 'pj' ? <button className="btn ghost small" onClick={() => abrir(x.pj.id)}>Hoja</button> : <button className="btn ghost small" onClick={() => quitarMon(x.m.id)}>Quitar</button>}
              </div>
              <PuntosGolpe x={x} /><Muerte cp={cp} x={x} /><Condiciones cp={cp} k={x.k} />
            </article>
          );
        })}
      </div>
      {monForm}
    </>
  );
}
