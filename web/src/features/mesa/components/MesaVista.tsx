/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useId } from 'react';
import { S, render, irArriba } from '@/app-shell/estado';
import { almacen } from '@/app-shell/almacen';
import { avisar } from '@/shared/ui/avisos';
import { modStr, sign } from '@/shared/utils/texto';
import { Aviso, Boton, Campo, EncabezadoPagina, Fila, Lista, Nota, PanelPestana, Pestanas, Plegable, Seccion, Tarjeta, claseCampo, cx, foco } from '@/shared/ui/kit';
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

function Condiciones({ cp, k, nombre }: { cp: any; k: string; nombre: string }) {
  const e = estadoDe(cp, k);
  const alternar = (n: string) => conCamp(c => { const x = estadoDe(c, k); x.cond = x.cond.includes(n) ? x.cond.filter((y: string) => y !== n) : [...x.cond, n]; });
  const chip = (n: string, on: boolean) => (
    <button key={n} type="button" aria-pressed={on} onClick={() => alternar(n)}
      className={cx('min-h-11 cursor-pointer rounded-full px-3 text-sm font-bold sm:min-h-8', foco, on ? 'bg-gol text-bg' : 'bg-soft hover:bg-rule/70')}>
      {n}{on && <span aria-hidden="true"> ×</span>}
    </button>
  );
  return (
    <div className="mt-2">
      {e.cond.length > 0 && <div role="group" aria-label={`Condiciones de ${nombre}`} className="flex flex-wrap gap-1.5">{e.cond.map((n: string) => chip(n, true))}</div>}
      <details className="mt-1">
        <summary className={cx('inline-flex min-h-11 cursor-pointer list-none items-center rounded-lg px-1 text-sm text-muted hover:text-ink sm:min-h-8 [&::-webkit-details-marker]:hidden', foco)}>+ Agregar condición</summary>
        <div className="mt-1 flex flex-wrap gap-1.5">{CONDICIONES.filter(n => !e.cond.includes(n)).map(n => chip(n, false))}</div>
      </details>
    </div>
  );
}

function PuntosGolpe({ x }: { x: any }) {
  const id = useId();
  const pct = x.pgMax ? Math.max(0, Math.min(100, Math.round(100 * x.pg / x.pgMax))) : 0;
  const aplicar = (d: 'dano' | 'cura') => {
    const v = parseInt(val(id)) || 0; if (!v) { avisar('Escribe cuántos PG.', 'aviso'); document.getElementById(id)?.focus(); return; }
    conCamp(cp => cambiarPg(cp, x.k, d === 'dano' ? -v : v));
  };
  return (
    <div className="mt-2">
      <div role="meter" aria-label={`Puntos de golpe de ${x.nombre}`} aria-valuemin={0} aria-valuemax={x.pgMax} aria-valuenow={x.pg} aria-valuetext={`${x.pg} de ${x.pgMax}`}
        className="h-2 overflow-hidden rounded-full bg-soft">
        <span className={cx('block h-full', pct <= 25 ? 'bg-acc' : pct <= 50 ? 'bg-adi' : 'bg-pas')} style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span><b className="font-serif text-2xl">{x.pg}</b> <span className="text-sm text-muted">/ {x.pgMax} PG</span></span>
        <label htmlFor={id} className="sr-only">Cantidad de PG para {x.nombre}</label>
        <input key={x.pg} id={id} type="number" inputMode="numeric" min={0} placeholder="PG" className={cx(claseCampo, 'w-20!')}
          onKeyDown={e => { if (e.key === 'Enter') aplicar('dano'); }} />
        <Boton tamano="sm" variante="primario" onClick={() => aplicar('dano')}>Daño</Boton>
        <Boton tamano="sm" onClick={() => aplicar('cura')}>Curar</Boton>
      </div>
    </div>
  );
}

function Muerte({ cp, x }: { cp: any; x: any }) {
  if (x.tipo !== 'pj' || x.pg > 0) return null;
  const m = estadoDe(cp, x.k).muerte;
  const tocar = (t: 'e' | 'f', i: number) => conCamp(c => { const mm = estadoDe(c, x.k).muerte; mm[t] = i < mm[t] ? i : i + 1; });
  const pips = (t: 'e' | 'f', n: number) => (
    <div role="group" aria-label={`${t === 'e' ? 'Éxitos' : 'Fallos'}: ${n} de 3`} className="flex">
      {Array.from({ length: 3 }, (_, i) => (
        <button key={i} type="button" aria-pressed={i < n} onClick={() => tocar(t, i)} aria-label={`${t === 'e' ? 'Éxito' : 'Fallo'} ${i + 1}`}
          className={cx('grid size-11 cursor-pointer place-items-center rounded-full', foco)}>
          <span aria-hidden="true" className={cx('size-5 rounded-full border-[2.5px]', t === 'f' ? 'border-acc' : 'border-ink', i < n && (t === 'f' ? 'bg-acc' : 'bg-ink'))} />
        </button>
      ))}
    </div>
  );
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl bg-soft p-2 text-sm">
      <b>A 0 PG.</b><span>Éxitos</span>{pips('e', m.e)}<span>Fallos</span>{pips('f', m.f)}
      <BotonTirada expr="1d20" label={`Salvación contra muerte de ${x.nombre}`}>Tirar salvación</BotonTirada>
    </div>
  );
}

function TarjetaPj({ cp, x }: { cp: any; x: any }) {
  const c = x.c, pj = x.pj, subN = c.SD ? c.SD.n : '';
  const stats: [string | number, string][] = [
    [x.ca, 'CA'], [c.passive, 'Percepción pasiva'], [10 + c.skill.perspicacia, 'Perspicacia pasiva'], [10 + c.skill.investigacion, 'Investigación pasiva'],
    [sign(c.init), 'Iniciativa'], [c.speed, 'Pies'], ...(c.dcSpell ? [[c.dcSpell, 'CD conjuros'] as [number, string]] : []),
  ];
  return (
    <Tarjeta as="li" className="border-l-4 border-rea">
      <header className="flex items-start justify-between gap-2">
        <div><h3 className="m-0 font-serif text-xl font-bold">{x.nombre}</h3>
          <p className="m-0 text-sm text-muted">{resumen(pj)}{subN ? `, ${subN}` : ''}{pj.jugador ? `. Juega ${pj.jugador}` : ''}</p></div>
        <Boton tamano="sm" onClick={() => abrir(pj.id)} aria-label={`Abrir la hoja de ${x.nombre}`}>Hoja</Boton>
      </header>
      <dl className="m-0 mt-3 grid grid-cols-3 gap-1.5">
        {stats.map(([v, n]) => <div key={n} className="flex flex-col-reverse rounded-lg bg-soft px-1 py-1.5 text-center"><dt className="text-[0.7rem] text-muted">{n}</dt><dd className="m-0 font-serif text-xl font-extrabold">{v}</dd></div>)}
      </dl>
      <PuntosGolpe x={x} /><Muerte cp={cp} x={x} /><Condiciones cp={cp} k={x.k} nombre={x.nombre} />
      <Boton tamano="sm" variante="fantasma" className="mt-2" onClick={() => conCamp(c2 => { c2.pjs = c2.pjs.filter((i: string) => i !== pj.id); c2.combate.orden = (c2.combate.orden || []).filter((o: any) => o.k !== 'pj:' + pj.id); })}>Sacar de la campaña</Boton>
    </Tarjeta>
  );
}

function FormEnemigos({ abierto, cp }: { abierto: boolean; cp: any }) {
  const id = useId(), f = (k: string) => id + k;
  const agregar = () => {
    const n = val(f('N')).trim() || 'Enemigo', q = Math.min(20, Math.max(1, +val(f('Q')) || 1)), pg = Math.max(1, +val(f('PG')) || 1);
    const ca = +val(f('CA')) || 10, bono = +val(f('B')) || 0;
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
  return (
    <Plegable titulo="Agregar enemigos" abierto={abierto}>
      <div className="grid gap-3" key={cp.monstruos.length}>
        <Campo etiqueta="Nombre"><input id={f('N')} type="text" placeholder="Goblin" className={claseCampo} /></Campo>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Campo etiqueta="CA"><input id={f('CA')} type="number" defaultValue={13} className={claseCampo} /></Campo>
          <Campo etiqueta="PG"><input id={f('PG')} type="number" defaultValue={7} className={claseCampo} /></Campo>
          <Campo etiqueta="Bono de iniciativa"><input id={f('B')} type="number" defaultValue={2} className={claseCampo} /></Campo>
          <Campo etiqueta="Cuántos"><input id={f('Q')} type="number" defaultValue={1} min={1} max={20} className={claseCampo} /></Campo>
        </div>
        <Boton variante="primario" className="justify-self-start" onClick={agregar}>Agregar</Boton>
      </div>
    </Plegable>
  );
}

function Combate({ cp, grupo }: { cp: any; grupo: any[] }) {
  const tirar = useDados();
  const cb = cp.combate;
  const quitarMon = (id: string) => conCamp(c => { c.monstruos = c.monstruos.filter((m: any) => m.id !== id); c.combate.orden = (c.combate.orden || []).filter((o: any) => o.k !== 'm:' + id); });
  if (!cb.activo) {
    const empezar = () => {
      conCamp(c => {
        const orden = [...c.pjs.map((id: string) => 'pj:' + id), ...c.monstruos.map((m: any) => 'm:' + m.id)].map(k => combatiente(k, c)).filter(Boolean).map((x: any) => ({ k: x.k, init: rnd(20) + x.bono, bono: x.bono }));
        c.combate = { activo: true, ronda: 1, turno: 0, orden }; ordenar(c); c.combate.turno = 0;
      });
      irArriba(); avisar('Iniciativa tirada para todos.');
    };
    return (
      <>
        <p className="mt-2">Se tira iniciativa para el grupo y los enemigos, y se ordena sola. Después puedes corregir cualquier valor.</p>
        <Seccion titulo="Enemigos">
          <Lista>{cp.monstruos.length ? cp.monstruos.map((m: any) => (
            <Fila key={m.id}><span>{m.nombre} <span className="text-sm text-muted">CA {m.ca}, {m.pg}/{m.pgMax} PG, iniciativa {sign(m.bono)}</span></span>
              <Boton tamano="sm" onClick={() => quitarMon(m.id)} aria-label={`Quitar ${m.nombre}`}>Quitar</Boton></Fila>
          )) : <Fila><span className="text-sm text-muted">Sin enemigos todavía.</span></Fila>}</Lista>
          <FormEnemigos abierto cp={cp} />
        </Seccion>
        <Boton variante="primario" className="mt-4" disabled={!(grupo.length || cp.monstruos.length)} onClick={empezar}>Empezar combate</Boton>
      </>
    );
  }
  quitarDelOrdenLosQueNoEstan(cb, cp);
  const actual = cb.orden[cb.turno];
  const siguiente = () => conCamp(c => { const b = c.combate; if (!b.orden.length) return false; b.turno++; if (b.turno >= b.orden.length) { b.turno = 0; b.ronda++; } });
  const terminar = () => {
    const quitar = cp.monstruos.length && confirm('¿Quitar también a los enemigos?');
    conCamp(c => { c.combate = { activo: false, ronda: 1, turno: 0, orden: [] }; if (quitar) c.monstruos = []; });
  };
  const fijarInit = (k: string, v: number) => conCamp(c => { const o = c.combate.orden.find((o: any) => o.k === k); if (!o) return false; o.init = v; ordenar(c); });
  return (
    <>
      <div className="sticky top-[calc(var(--alto-cabecera,0px)+3.75rem)] z-[5] -mx-4 mt-2 flex flex-wrap items-center gap-2 bg-bg px-4 py-2 backdrop-blur">
        <p className="m-0 flex-1" aria-live="polite">Ronda {cb.ronda}. Turno de <b>{actual ? combatiente(actual.k, cp).nombre : '—'}</b>.</p>
        <Boton variante="primario" onClick={siguiente}>Siguiente turno</Boton>
        <Boton onClick={terminar}>Terminar combate</Boton>
      </div>
      <ol className="m-0 mt-2 grid list-none gap-2 p-0" aria-label="Orden de iniciativa">
        {cb.orden.map((o: any, i: number) => {
          const x = combatiente(o.k, cp), caido = x.pg <= 0, esTurno = i === cb.turno;
          return (
            <Tarjeta as="li" key={o.k} aria-current={esTurno ? 'step' : undefined}
              className={cx('border-l-4', x.tipo === 'm' ? 'border-acc' : 'border-rea', esTurno && 'ring-[3px]! ring-adi!', caido && 'opacity-60')}>
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-1">
                  <label className="sr-only" htmlFor={`ini-${o.k}`}>Iniciativa de {x.nombre}</label>
                  <input id={`ini-${o.k}`} key={o.init} type="number" defaultValue={o.init} className={cx(claseCampo, 'w-16! px-1 text-center font-serif text-xl font-bold')}
                    onBlur={e => { if (+e.target.value !== o.init) fijarInit(o.k, +e.target.value || 0); }} onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }} />
                  <button type="button" aria-label={`Tirar iniciativa de ${x.nombre}`} onClick={() => tirar(`1d20${modStr(x.bono)}`, `Iniciativa de ${x.nombre}`, { noRepeat: true }).then(r => fijarInit(o.k, r.total))}
                    className={cx('min-h-9 cursor-pointer rounded-lg bg-soft px-2 text-sm font-bold hover:bg-rule/70', foco)}>d20</button>
                </div>
                <div className="min-w-0 flex-1">
                  {esTurno && <span className="mb-0.5 inline-block rounded-full bg-adi px-2 text-xs font-extrabold text-bg">Turno actual</span>}
                  <b className="block font-serif text-lg">{x.nombre}</b>
                  <span className="block text-sm text-muted">CA {x.ca}{x.tipo === 'pj' ? `, percepción pasiva ${x.c.passive}` : ', enemigo'}{caido ? ', caído' : ''}</span>
                </div>
                {x.tipo === 'pj' ? <Boton tamano="sm" onClick={() => abrir(x.pj.id)}>Hoja</Boton> : <Boton tamano="sm" onClick={() => quitarMon(x.m.id)} aria-label={`Quitar ${x.nombre}`}>Quitar</Boton>}
              </div>
              <PuntosGolpe x={x} /><Muerte cp={cp} x={x} /><Condiciones cp={cp} k={x.k} nombre={x.nombre} />
            </Tarjeta>
          );
        })}
      </ol>
      <FormEnemigos abierto={false} cp={cp} />
    </>
  );
}

/* Cambios de campaña y de la vista: fuera de los componentes, que solo los llaman */
/** El combate solo lista a quienes siguen en la campaña. */
function quitarDelOrdenLosQueNoEstan(cb: any, cp: any) { cb.orden = cb.orden.filter((o: any) => combatiente(o.k, cp)); }
/** La campaña abierta, con sus valores por defecto; null si no hay (o ya no existe). */
function campanaAbierta() {
  const cp = S.camp ? campActual() : null;
  if (!cp) { S.camp = null; return null; }
  cp.combate = cp.combate || { activo: false, ronda: 1, turno: 0, orden: [] }; cp.monstruos = cp.monstruos || [];
  return cp;
}
function crearCampana(n: string) {
  if (!n) { avisar('Ponle nombre a la campaña.', 'aviso'); return; }
  const nueva = { id: 'c-' + Date.now().toString(36), nombre: n, pjs: [], monstruos: [], estado: {}, combate: { activo: false, ronda: 1, turno: 0, orden: [] } };
  guardarCamp(nueva); S.camp = nueva.id; S.mtab = 'grupo'; render();
}
function abrirCampana(id: string | null) { S.camp = id; if (id) S.mtab = 'grupo'; render(); irArriba(); }
function borrarCampana(cp: any) {
  if (!confirm(`¿Borrar la campaña ${cp.nombre}? Los personajes no se borran.`)) return;
  almacen.borrarCampana(cp.id); S.camp = null; render(); avisar('Campaña borrada.');
}

export function MesaVista({ importarHojas }: { importarHojas: () => void }) {
  const idNueva = useId();
  const l = camps();
  const cp = campanaAbierta();
  if (!cp) {
    const crear = () => crearCampana(val(idNueva).trim());
    return (
      <>
        <EncabezadoPagina id="titulo-vista" titulo="Mesa del DM" subtitulo="Junta las hojas de tu grupo en una campaña para ver PG, CA y pasivas de un vistazo, y llevar el combate: iniciativa, daño y condiciones." />
        {l.length > 0 && (
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 p-0">
            {l.map(cp => (
              <li key={cp.id} className="flex">
                <button type="button" onClick={() => abrirCampana(cp.id)}
                  className={cx('flex min-h-24 w-full cursor-pointer flex-col justify-center rounded-2xl bg-surface p-4 text-left shadow-sm ring-1 ring-rule/60 hover:shadow-md', foco)}>
                  <b className="font-serif text-xl">{cp.nombre}</b>
                  <span className="text-sm text-muted">{cp.pjs.length} personaje{cp.pjs.length === 1 ? '' : 's'}{cp.combate?.activo ? ', en combate' : ''}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        <Seccion titulo="Nueva campaña">
          <div className="flex flex-wrap items-end gap-2" key={l.length}>
            <Campo etiqueta="Nombre" className="min-w-60 flex-1"><input id={idNueva} type="text" placeholder="La Costa Rota" className={claseCampo} onKeyDown={e => { if (e.key === 'Enter') crear(); }} /></Campo>
            <Boton variante="primario" onClick={crear}>Crear campaña</Boton>
          </div>
        </Seccion>
      </>
    );
  }
  const grupo = cp.pjs.map((id: string) => combatiente('pj:' + id, cp)).filter(Boolean);
  const fuera = S.list.filter(p => !cp.pjs.includes(p.id));
  const mtab = S.mtab || 'grupo';
  const agregar = () => {
    const ids = [...document.querySelectorAll<HTMLInputElement>('#campAddList input:checked')].map(i => i.value);
    if (!ids.length) { avisar('Marca al menos un personaje.', 'aviso'); return; }
    conCamp(c => { c.pjs.push(...ids.filter(i => !c.pjs.includes(i))); });
  };
  const borrar = () => borrarCampana(cp);
  return (
    <>
      <EncabezadoPagina id="titulo-vista" titulo={cp.nombre} subtitulo={`${grupo.length} personaje${grupo.length === 1 ? '' : 's'}. Los cambios de PG y condiciones quedan en tus copias de las hojas.`}>
        <Boton variante="fantasma" onClick={() => abrirCampana(null)}>← Todas las campañas</Boton>
      </EncabezadoPagina>
      <Pestanas idBase="mesa" etiqueta="Secciones de la campaña" activa={mtab} onCambiar={k => { S.mtab = k; render(); }}
        items={[{ id: 'grupo', texto: 'Grupo' }, { id: 'combate', texto: cp.combate.activo ? `Combate · ronda ${cp.combate.ronda}` : 'Combate' }]} />
      <PanelPestana idBase="mesa" activa={mtab}>
        {mtab === 'grupo' ? (
          <>
            <h2 className="mb-0 mt-4 font-serif text-2xl font-bold">Personajes de la campaña</h2>
            {grupo.length
              ? <ul className="m-0 mt-2 grid list-none grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3 p-0">{grupo.map((x: any) => <TarjetaPj key={x.k} cp={cp} x={x} />)}</ul>
              : <Aviso tipo="info" titulo="Campaña vacía">Agrega personajes abajo o importa las hojas de tus jugadores.</Aviso>}
            <Seccion titulo="Agregar personajes">
              {fuera.length > 0 ? (
                <fieldset className="m-0 border-0 p-0">
                  <legend className="sr-only">Tus personajes que no están en la campaña</legend>
                  <div id="campAddList" key={cp.pjs.length} className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-x-3">
                    {fuera.map(p => (
                      <label key={p.id} className="flex min-h-11 cursor-pointer items-center gap-3">
                        <input type="checkbox" value={p.id} className={cx('size-5 accent-ink', foco)} />
                        <span>{p.name} <span className="text-sm text-muted">{p.sub || ''}</span></span>
                      </label>
                    ))}
                  </div>
                  <Boton variante="primario" className="mt-2" onClick={agregar}>Agregar seleccionados</Boton>
                </fieldset>
              ) : <Nota>Todos tus personajes ya están en esta campaña.</Nota>}
              <Nota className="mt-4">Pide a cada jugador su respaldo (en su hoja: Descargar respaldo) e impórtalo aquí; se agrega solo a la campaña.</Nota>
              <Boton onClick={importarHojas}>Importar hojas de jugadores</Boton>
            </Seccion>
            <Seccion titulo="Zona de cuidado"><Boton variante="peligro" onClick={borrar}>Borrar campaña</Boton></Seccion>
          </>
        ) : <Combate cp={cp} grupo={grupo} />}
      </PanelPestana>
    </>
  );
}
