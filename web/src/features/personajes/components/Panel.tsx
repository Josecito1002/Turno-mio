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

/** Saludos al entrar: se elige uno al azar. {n} es el nombre del jugador. */
const SALUDOS: string[] = [
  'Hola, {n}', '¡Bienvenido de vuelta, {n}!', 'La taberna te esperaba, {n}', '¿Listo para tirar, {n}?', 'Tu turno, {n}',
  'Saludos, aventurero {n}', '¡Que los dados te sonrían, {n}!', 'El grupo te estaba buscando, {n}', 'Otra jornada de aventura, {n}',
];

/** Personajes que dan el consejo del día; cada uno con su ícono y su forma de hablar. */
const QUIEN: [string, string, string][] = [
  ['El tabernero', 'sports_bar', 'Escucha, viajero:'], ['La archimaga Elara', 'auto_awesome', 'Aprendiz, recuerda:'],
  ['Un goblin muy listo', 'pest_control', '¡Eh, eh! Goblin sabe cosa:'], ['El viejo paladín', 'shield', 'Hazme caso, joven:'],
  ['La pícara Nyx', 'visibility_off', 'Te lo digo en voz baja:'], ['El bardo del camino', 'music_note', 'Como dice la canción:'],
  ['Tu DM', 'casino', 'Antes de que preguntes:'], ['Un dragón aburrido', 'local_fire_department', 'Hmm, mortal. Ten en cuenta:'],
];

/** Reglas y comentarios cortos (2024); se elige uno al azar en cada visita. */
const REGLAS: string[] = [
  'un <b>golpe crítico</b> duplica los dados de daño, no el bonificador.',
  'un <b>20 natural</b> en un ataque siempre acierta, y un 1 natural siempre falla.',
  'usar <b>Esquivar</b> hace que los ataques contra ti tengan desventaja hasta tu siguiente turno.',
  'puedes <b>moverte, actuar y seguir moviéndote</b>: el movimiento se puede partir antes y después de la acción.',
  'con <b>Preparar</b> guardas tu acción para usarla como reacción cuando pase lo que tú digas.',
  '<b>Destrabarse</b> evita los ataques de oportunidad durante el resto de tu turno.',
  'un <b>ataque de oportunidad</b> ocurre cuando un enemigo sale de tu alcance sin destrabarse; usa tu reacción.',
  '<b>Correr</b> te da movimiento extra igual a tu velocidad este turno.',
  'atacar a distancia con un enemigo a 1,5 m de ti te da <b>desventaja</b>.',
  'atacar a alguien que no te ve te da <b>ventaja</b>; si tú no lo ves, tienes desventaja.',
  'ventaja y desventaja <b>se cancelan</b>, sin importar cuántas fuentes tengas de cada una.',
  'la <b>media cobertura</b> da +2 a la CA y a las salvaciones de Destreza; la de tres cuartos, +5.',
  'puedes <b>Agarrar</b> o <b>Empujar</b> en lugar de uno de tus ataques: es un ataque sin armas en 2024.',
  'pelear con <b>dos armas ligeras</b> te deja atacar con la segunda como acción adicional.',
  'las <b>maestrías de armas</b> dan un efecto extra al golpear: Debilitar, Derribar, Empujar, Ralentizar…',
  'una criatura <b>Derribada</b> tiene desventaja al atacar, y tú ventaja si estás a 1,5 m.',
  'levantarse estando Derribado cuesta <b>la mitad de tu velocidad</b>.',
  'el terreno difícil cuesta <b>el doble de movimiento</b>; arrastrarse, también.',
  'la <b>iniciativa</b> en 2024 es una prueba de Destreza; si sorprendes a alguien, tira con desventaja.',
  'puedes <b>interactuar con un objeto gratis</b> en tu turno: desenvainar, abrir una puerta, recoger algo.',
  'con <b>Esconderse</b> (CD 15 de Destreza o Sigilo) quedas Invisible hasta que te descubran o hagas ruido.',
  '<b>Buscar</b> es una acción: sirve para encontrar criaturas escondidas u objetos.',
  '<b>Influir</b> es una acción en 2024: intentas convencer a alguien con Persuasión, Engaño o Intimidación.',
  '<b>Estudiar</b> es una acción: haces una prueba de Inteligencia para recordar o analizar algo.',
  'en 2024, <b>Ayudar</b> da ventaja en la siguiente prueba de un aliado si eres competente en esa habilidad.',
  'montar o desmontar cuesta <b>la mitad de tu velocidad</b>.',
  'si caes a 0 PG, un <b>20 natural</b> en la salvación contra muerte te devuelve a 1 PG.',
  'con <b>3 éxitos</b> en salvaciones contra muerte te estabilizas; con 3 fallos, mueres.',
  'recibir daño a 0 PG cuenta como <b>un fallo</b> en salvación contra muerte; un crítico, como dos.',
  'si el daño que te deja en 0 PG es igual o mayor que tus PG máximos, <b>mueres al instante</b>.',
  'una prueba de <b>Medicina CD 10</b> o un kit de sanador estabilizan a alguien a 0 PG.',
  'los <b>PG temporales</b> no se suman entre sí: te quedas con los que prefieras.',
  'un <b>descanso corto</b> dura una hora y te deja gastar dados de golpe para curarte.',
  'solo puedes beneficiarte de <b>un descanso largo cada 24 horas</b>.',
  'un <b>nivel de Agotamiento</b> resta 2 a tus pruebas de d20 por nivel; un descanso largo quita uno.',
  'la <b>Concentración</b> se pierde si recibes daño y fallas una salvación de CON (CD 10 o la mitad del daño).',
  'solo puedes mantener <b>un conjuro de Concentración</b> a la vez.',
  'los <b>rituales</b> se lanzan sin gastar espacio si tardas 10 minutos más.',
  'un conjuro con <b>componente material</b> con coste lo consume solo si el conjuro lo dice.',
  'un <b>foco mágico</b> reemplaza los componentes materiales que no tienen coste.',
  'los <b>trucos</b> mejoran solos al subir de nivel de personaje, no de clase.',
  'lanzar un conjuro con un <b>espacio de nivel mayor</b> suele hacerlo más fuerte: mira «con espacio mayor».',
  'la <b>CD de tus conjuros</b> es 8 + tu bono de competencia + tu modificador de lanzamiento.',
  'un brujo recupera sus <b>espacios de pacto</b> con un descanso corto.',
  'con <b>Inspiración heroica</b> puedes repetir cualquier tirada de d20 y quedarte con el nuevo resultado.',
  'en 2024 los humanos empiezan con <b>Inspiración heroica</b> cada vez que terminan un descanso largo.',
  'la <b>pericia</b> duplica tu bono de competencia en esa habilidad.',
  'tu <b>bono de competencia</b> sube a +3 en nivel 5, +4 en 9, +5 en 13 y +6 en 17.',
  'en 2024 los bonos a características vienen del <b>trasfondo</b>, no de la especie.',
  'cada trasfondo da una <b>dote de origen</b>: Alerta, Atacante salvaje, Sanador, Músico…',
  'la <b>percepción pasiva</b> es 10 + tu bono de Percepción: el DM la usa sin que tires.',
  'puedes <b>sintonizarte</b> con tres objetos mágicos como máximo.',
  'sintonizarse con un objeto requiere <b>un descanso corto</b> con él.',
  'una <b>poción de curación</b> se puede beber como acción adicional en 2024.',
  'caer cuesta <b>1d6 de daño por cada 3 m</b>, hasta 20d6.',
  'puedes contener la respiración <b>1 + tu modificador de CON minutos</b> (mínimo 30 segundos).',
  'con carrerilla, un salto largo llega a tantos <b>pies como tu puntuación de Fuerza</b> (unos 30 cm por punto).',
  'en 2024 solo puedes lanzar <b>un conjuro con espacio de conjuro por turno</b>; los trucos no cuentan.',
  'un <b>descanso largo</b> te devuelve todos los PG y todos tus dados de golpe.',
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
  const nombre = S.usuario && !esInvitado() ? S.usuario.nombre.trim() : '';
  // Un saludo, quién da el consejo y el consejo: al azar en cada visita (fijos mientras la pantalla está abierta)
  const [azar] = useState(() => [Math.random(), Math.random(), Math.random()]);
  const saludo = nombre ? SALUDOS[Math.floor(azar[0] * SALUDOS.length)].replace('{n}', nombre) : '¡Hola, aventurero!';
  const [quien, icono, entrada] = QUIEN[Math.floor(azar[1] * QUIEN.length)];
  const hoy = new Date();
  const fecha = hoy.toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' });
  const regla = REGLAS[Math.floor(azar[2] * REGLAS.length)];
  const consejo = (clase: string) => (
    <section aria-label="¿Sabías que…?" className={cx('flex gap-3 rounded-2xl bg-surface-container p-4 ring-1 ring-surface-container-highest sm:p-5', clase)}>
      <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-container-high"><Simbolo n={icono} className="text-headline-sm text-primary" /></span>
      <div className="min-w-0">
        <p className="m-0 text-label-caps uppercase tracking-wider text-secondary">¿Sabías que…? · {quien}</p>
        <p className="m-0 mt-1"><i className="text-on-surface-variant">{entrada}</i> <span dangerouslySetInnerHTML={{ __html: regla }} /></p>
      </div>
    </section>
  );

  return (
    <div className="flex flex-col gap-6 pb-6">
      <header>
        <p className="m-0 text-label-caps uppercase tracking-wider text-outline first-letter:uppercase">{fecha}</p>
        <h1 id="titulo-vista" tabIndex={-1} className="m-0 font-serif text-[clamp(2rem,6vw,2.75rem)] font-bold leading-tight outline-none [overflow-wrap:anywhere]">{saludo}</h1>
      </header>
      {consejo('lg:hidden')}

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

          {consejo('hidden lg:flex')}
        </div>
      </div>
    </div>
  );
}
