/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { S, render, irArriba, esDM, esInvitado } from '@/app-shell/estado';
import { almacen } from '@/app-shell/almacen';
import { Simbolo, cx, foco } from '@/shared/ui/kit';
import { useDados } from '@/features/dados/components/Bandeja';
import { camps } from '@/features/mesa/domain/combate';
import { misMesas, type MesaUnida } from '@/features/mesa/api';
import { abrir, descansar, nuevo } from '../acciones';
import { reparar } from '../domain/modelo';
import { compute } from '../domain/calculo';
import { PASO_N } from './ficha/Ficha';
import { vitalesDe } from '../domain/vitales';
import { puedeSubir } from '../domain/progresion';

/* Inicio con sesión: seguir con el último personaje, los demás, tus campañas (como DM y como jugador) y atajos. */

const REGLAS: string[] = [
  'En 2024, <b>Ayudar</b> da ventaja en la siguiente prueba de un aliado si eres competente en esa habilidad.',
  'Un <b>golpe crítico</b> duplica los dados de daño, no el bonificador.',
  'Con <b>Inspiración heroica</b> puedes repetir cualquier tirada de d20 y quedarte con el nuevo resultado.',
  'Si caes a 0 PG, cada <b>salvación contra muerte</b> con 20 natural te devuelve a 1 PG.',
  'La <b>Concentración</b> se pierde si recibes daño y fallas una salvación de CON (CD 10 o la mitad del daño).',
  'Con <b>Esconderse</b> (CD 15 de Destreza/Sigilo) ganas la condición Invisible hasta que te descubran o hagas ruido.',
  'Puedes interactuar con <b>un objeto gratis</b> en tu turno: desenvainar, abrir una puerta, recoger algo.',
];

const ir = (v: any, extra?: () => void) => { S.view = v; S.dialogo = ''; extra?.(); render(); irArriba(); };
const Caja = ({ titulo, icono, accion, children, className }: { titulo: string; icono: string; accion?: ReactNode; children: ReactNode; className?: string }) => (
  <section aria-label={titulo} className={cx('rounded-2xl bg-surface-container p-4 ring-1 ring-surface-container-highest sm:p-5', className)}>
    <div className="mb-3 flex items-center gap-2">
      <h2 className="m-0 flex flex-1 items-center gap-2 font-serif text-headline-md"><Simbolo n={icono} className="text-primary" />{titulo}</h2>
      {accion}
    </div>
    {children}
  </section>
);
const Enlace = ({ onClick, children }: { onClick: () => void; children: ReactNode }) => (
  <button type="button" onClick={onClick} className={cx('cursor-pointer rounded text-body-md font-semibold text-secondary hover:underline', foco)}>{children} →</button>
);

function SeguirJugando({ id }: { id: string }) {
  const datos = almacen.pj(id), p = S.list.find(x => x.id === id);
  if (!datos || !p) return null;
  const v = vitalesDe(datos), sube = puedeSubir(datos);
  const descansarAqui = () => { S.pj = reparar(datos); S.view = 'ficha'; render(); descansar('corto'); };
  return (
    <section aria-label="Seguir jugando" className="grid overflow-hidden rounded-2xl bg-surface-container ring-1 ring-surface-container-highest sm:grid-cols-[160px_1fr]">
      <div aria-hidden="true" className="hidden place-items-center border-r border-surface-container-highest bg-surface-container-high font-serif text-[4.5rem] font-bold text-primary sm:grid">
        {(p.name || '?').trim().charAt(0).toUpperCase()}
      </div>
      <div className="flex flex-col gap-3 p-4 sm:p-5">
        <div>
          <p className="m-0 text-label-caps uppercase tracking-wider text-secondary">Seguir jugando</p>
          <h2 className="m-0 font-serif text-headline-lg leading-tight">{p.name}</h2>
          <p className="m-0 font-serif italic text-on-surface-variant">{p.sub || 'Sin clase todavía'}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-body-md">
          {v && <span className="rounded-lg bg-surface-container-lowest px-2.5 py-1"><Simbolo n="favorite" className="text-body-lg text-error" /> <b>{v.pg}</b>/{v.pgMax}</span>}
          {v && <span className="rounded-lg bg-surface-container-lowest px-2.5 py-1"><Simbolo n="shield" className="text-body-lg text-primary" /> CA <b>{v.ca}</b></span>}
          {sube && <span className="rounded-lg bg-surface-container-lowest px-2.5 py-1 font-semibold text-warn"><Simbolo n="arrow_upward" className="text-body-lg" /> Puede subir a nivel {(+datos.nivel || 1) + 1}</span>}
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          <button type="button" onClick={() => abrir(id)} className={cx('inline-flex min-h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 font-bold text-on-primary hover:bg-primary-fixed-dim sm:flex-none', foco)}>
            Abrir hoja <Simbolo n="arrow_forward" />
          </button>
          {datos.clase && <button type="button" onClick={descansarAqui} className={cx('inline-flex min-h-12 cursor-pointer items-center rounded-xl px-4 font-semibold ring-1 ring-outline-variant hover:bg-surface-container-high', foco)}>Descansar</button>}
        </div>
      </div>
    </section>
  );
}

/** Abre el creador en el primer paso que le falta */
const seguir = (id: string, paso: string) => { abrir(id, 'editor'); S.step = paso; render(); };

/** Lo que quedó a medias: personajes con pasos sin terminar y campañas sin jugadores todavía. */
function AMedias() {
  const pjs = S.list.map(p => {
    const datos = almacen.pj(p.id); if (!datos) return null;
    let pendientes: { t: string; paso: string }[] = [];
    try { pendientes = (compute(reparar(datos)).avisos || []).filter((a: any) => a.nivel === 'aviso' && a.paso); } catch { /* hoja dañada: se omite */ }
    return pendientes.length ? { p, pendientes } : null;
  }).filter(Boolean) as { p: { id: string; name: string; sub: string }; pendientes: { t: string; paso: string }[] }[];
  const campanas = esDM() ? camps().filter(cp => !(cp.pjs || []).length && !almacen.infoMesa(cp.id).unidos) : [];
  if (!pjs.length && !campanas.length) return null;
  return (
    <section aria-label="Sigue donde te quedaste">
      <h2 className="m-0 mb-3 flex items-center gap-2 font-serif text-headline-md"><Simbolo n="pending_actions" className="text-warn" />Sigue donde te quedaste</h2>
      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {pjs.slice(0, 4).map(({ p, pendientes }) => {
          const pasos = [...new Set(pendientes.map(a => a.paso))];
          return (
            <li key={p.id} className="flex flex-wrap items-center gap-3 rounded-xl bg-surface-container px-4 py-3 border border-dashed border-outline-variant">
              <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-container-high"><Simbolo n="person_edit" className="text-warn" /></span>
              <span className="min-w-0 flex-1 leading-tight">
                <b className="block [overflow-wrap:anywhere]">{p.name || 'Personaje sin nombre'}</b>
                <span className="text-body-sm text-on-surface-variant">{p.sub || 'Sin clase todavía'} · <span className="text-warn">Falta: {pasos.map(k => (PASO_N[k] || k).toLowerCase()).join(', ')}</span></span>
              </span>
              <button type="button" onClick={() => seguir(p.id, pasos[0])}
                className={cx('min-h-11 shrink-0 cursor-pointer rounded-lg bg-surface-container-highest px-4 font-semibold hover:bg-surface-bright', foco)}>Seguir creándolo</button>
            </li>
          );
        })}
        {campanas.slice(0, 3).map(cp => (
          <li key={cp.id} className="flex flex-wrap items-center gap-3 rounded-xl bg-surface-container px-4 py-3 border border-dashed border-outline-variant">
            <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-container-high"><Simbolo n="group_add" className="text-warn" /></span>
            <span className="min-w-0 flex-1 leading-tight">
              <b className="block [overflow-wrap:anywhere]">{cp.nombre}</b>
              <span className="text-body-sm text-on-surface-variant">Campaña · <span className="text-warn">todavía sin jugadores</span></span>
            </span>
            <button type="button" onClick={() => ir('mesa', () => { S.camp = cp.id; S.mtab = 'grupo'; })}
              className={cx('min-h-11 shrink-0 cursor-pointer rounded-lg bg-surface-container-highest px-4 font-semibold hover:bg-surface-bright', foco)}>Invitar jugadores</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Panel() {
  const tirar = useDados();
  const [mesas, setMesas] = useState<MesaUnida[] | null>(null);
  useEffect(() => { if (!esInvitado()) misMesas().then(setMesas).catch(() => setMesas([])); }, []);
  // El último que abriste; si quedó a medio crear (sin clase), el primero que ya tenga clase
  const conClase = S.list.filter(p => p.sub);
  const ultimo = S.usuario?.ultimoPj && conClase.some(p => p.id === S.usuario!.ultimoPj) ? S.usuario!.ultimoPj : conClase[0]?.id || S.list[0]?.id || null;
  const otros = S.list.filter(p => p.id !== ultimo);
  const misCamps = esDM() ? camps() : [];
  const nombre = S.usuario && !esInvitado() && /\p{L}/u.test(S.usuario.nombre) ? S.usuario.nombre.split(' ')[0] : '';
  const hoy = new Date();
  const fecha = hoy.toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' });
  const regla = REGLAS[Math.floor(hoy.getTime() / 86400000) % REGLAS.length];

  return (
    <div className="flex flex-col gap-6 pb-6">
      <header>
        <p className="m-0 text-label-caps uppercase tracking-wider text-outline first-letter:uppercase">{fecha}</p>
        <h1 id="titulo-vista" tabIndex={-1} className="m-0 font-serif text-[clamp(2rem,6vw,2.75rem)] font-bold leading-tight outline-none">Hola{nombre ? `, ${nombre}` : ''}</h1>
      </header>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex min-w-0 flex-col gap-5">
          {ultimo ? <SeguirJugando id={ultimo} /> : (
            <section className="flex flex-col items-start gap-3 rounded-2xl bg-surface-container p-6 ring-1 ring-surface-container-highest">
              <h2 className="m-0 font-serif text-headline-lg">Empieza tu primer personaje</h2>
              <p className="m-0 text-on-surface-variant">El creador te lleva paso a paso con las reglas de 2024.</p>
              <button type="button" onClick={nuevo} className={cx('inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-xl bg-primary px-5 font-bold text-on-primary', foco)}>Crear mi personaje <Simbolo n="arrow_forward" /></button>
            </section>
          )}

          <AMedias />

          {ultimo && (
            <section aria-label="Tus personajes">
              <div className="mb-3 flex items-center gap-2">
                <h2 className="m-0 flex flex-1 items-center gap-2 font-serif text-headline-md"><Simbolo n="person" className="text-primary" />Tus personajes</h2>
                <Enlace onClick={() => ir('home')}>Ver {S.list.length === 1 ? 'el personaje' : `los ${S.list.length}`}</Enlace>
              </div>
              <ul className="-mx-4 m-0 flex list-none gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-[repeat(auto-fill,minmax(170px,1fr))] sm:overflow-visible sm:px-0">
                {otros.slice(0, 3).map(p => {
                  const v = vitalesDe(almacen.pj(p.id));
                  return (
                    <li key={p.id} className="w-44 shrink-0 sm:w-auto">
                      <button type="button" onClick={() => abrir(p.id)} className={cx('flex h-full w-full cursor-pointer flex-col gap-2 rounded-2xl bg-surface-container p-3.5 text-left ring-1 ring-surface-container-highest hover:bg-surface-container-high', foco)}>
                        <span className="flex items-start gap-2.5">
                          <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-container-high font-serif text-xl font-bold text-primary">{(p.name || '?').charAt(0).toUpperCase()}</span>
                          <b className="line-clamp-2 min-w-0 font-serif text-headline-sm leading-tight [overflow-wrap:anywhere]">{p.name}</b>
                        </span>
                        <span className="text-body-sm text-on-surface-variant">{p.sub || 'Sin clase todavía'}</span>
                        {v && <span className="text-body-sm text-on-surface-variant">PG <b className="text-on-surface">{v.pg}/{v.pgMax}</b> · CA <b className="text-on-surface">{v.ca}</b></span>}
                      </button>
                    </li>
                  );
                })}
                <li className="w-32 shrink-0 sm:w-auto">
                  <button type="button" onClick={nuevo} className={cx('flex h-full min-h-28 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border-[1.5px] border-dashed border-outline-variant font-semibold hover:bg-surface-container', foco)}>
                    <Simbolo n="person_add" className="text-headline-md text-primary" />Nuevo personaje
                  </button>
                </li>
              </ul>
            </section>
          )}
        </div>

        <div className="flex flex-col gap-5">
          {!esInvitado() && (
            <Caja titulo="Tus campañas" icono="groups" accion={<Enlace onClick={() => ir('mesaj')}>Ver todas</Enlace>}>
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {misCamps.slice(0, 3).map(cp => (
                  <li key={cp.id} className="flex items-center gap-3 rounded-xl bg-surface-container-lowest px-3.5 py-3">
                    <span aria-hidden="true" className={cx('size-2.5 shrink-0 rounded-full', cp.combate?.activo ? 'bg-error' : 'bg-pas')} />
                    <span className="min-w-0 flex-1 leading-tight"><b className="block truncate">{cp.nombre}</b>
                      <span className="text-body-sm text-on-surface-variant">DM{cp.combate?.activo ? <span className="text-error"> · en combate, ronda {cp.combate.ronda}</span> : ''}</span></span>
                    <button type="button" onClick={() => ir('mesa', () => { S.camp = cp.id; S.mtab = cp.combate?.activo ? 'combate' : 'grupo'; })}
                      className={cx('min-h-10 shrink-0 cursor-pointer rounded-lg bg-surface-container-highest px-3 text-body-md font-semibold', foco)}>Ir a la mesa</button>
                  </li>
                ))}
                {(mesas || []).slice(0, 3).map(m => (
                  <li key={m.dmId + m.campanaId + m.personajeId} className="flex items-center gap-3 rounded-xl bg-surface-container-lowest px-3.5 py-3">
                    <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-secondary" />
                    <span className="min-w-0 flex-1 leading-tight"><b className="block truncate">{m.mesa}</b>
                      <span className="text-body-sm text-on-surface-variant">Juegas con {m.personaje} · DM: {m.dm}</span></span>
                    <button type="button" onClick={() => ir('mesaj', () => { S.campJ = { dmId: m.dmId, campanaId: m.campanaId }; S.campJTab = 'personajes'; })}
                      className={cx('min-h-10 shrink-0 cursor-pointer rounded-lg bg-surface-container-highest px-3 text-body-md font-semibold', foco)}>Abrir</button>
                  </li>
                ))}
                {!misCamps.length && mesas && !mesas.length && <li className="text-body-md text-on-surface-variant">Todavía no estás en ninguna campaña.</li>}
                {mesas === null && !misCamps.length && <li className="text-body-md text-outline">Buscando tus campañas…</li>}
              </ul>
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={() => ir('mesaj')} className={cx('inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-dashed border-outline-variant text-body-md font-semibold hover:bg-surface-container-high', foco)}>
                  <Simbolo n="login" className="text-secondary" />Unirme con un código</button>
                {esDM() && <button type="button" onClick={() => ir('mesa', () => { S.camp = null; })} className={cx('inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-dashed border-outline-variant text-body-md font-semibold hover:bg-surface-container-high', foco)}>
                  <Simbolo n="add" className="text-primary" />Crear campaña</button>}
              </div>
            </Caja>
          )}

          <Caja titulo="Atajos" icono="bolt">
            <div className="grid grid-cols-2 gap-2">
              {([['casino', 'text-primary', 'Tirar d20', () => tirar('1d20', 'd20', { neutral: true })],
                ['menu_book', 'text-secondary', 'Biblioteca', () => ir('lib')],
                ...(esDM() ? [['swords', 'text-primary', 'Mesa del DM', () => ir('mesa', () => { S.camp = null; })]] : []),
                ['person', 'text-secondary', 'Personajes', () => ir('home')]] as [string, string, string, () => void][]).map(([i, c, t, f]) => (
                <button key={t} type="button" onClick={f} className={cx('flex min-h-18 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl bg-surface-container-lowest text-body-md font-semibold hover:bg-surface-container-high', foco)}>
                  <Simbolo n={i} className={cx('text-headline-md', c)} />{t}
                </button>
              ))}
            </div>
          </Caja>

          <section aria-label="Regla rápida" className="rounded-2xl bg-surface-container p-4 ring-1 ring-surface-container-highest sm:p-5">
            <p className="m-0 text-label-caps uppercase tracking-wider text-secondary">¿Sabías que…?</p>
            <p className="m-0 mt-1.5" dangerouslySetInnerHTML={{ __html: regla }} />
          </section>
        </div>
      </div>
    </div>
  );
}
