/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useRef, useState } from 'react';
import { S, render, irArriba } from '@/app-shell/estado';
import { Boton, Dialogo, Simbolo, cx, foco } from '@/shared/ui/kit';
import { TIPOS } from '@/features/reglas/data/caracteristicas';
import { COMUNES } from '@/features/reglas/data/comunes';
import { FormaTipo } from '@/features/reglas/components/TipoAccion';
import { CONDICIONES } from '@/features/mesa/domain/combate';
import { avisar } from '@/shared/ui/avisos';
import { esc, norm, richT, sign } from '@/shared/utils/texto';
import { descansar, moverPool, setVal } from '../../acciones';
import { resumen } from '../../domain/modelo';
import { combateMesa, enviarGolpeMesa, gastarAccionMesa, type CombateVivo, type EconomiaRonda, type OrdenDm, type TipoAccionRonda } from '@/features/mesa/api';
import { EFECTO_CONDICION } from '@/features/mesa/domain/condiciones';
import { datosConjuro } from '../piezas';
import { ataquesPorAccion, bonosPara, golpesDeRasgo, restanteConjuro, restanteDe } from '../../domain/lanzar';
import { UsoAccion, type Marca, type Objetivo, type Uso } from './UsoAccion';
import { EFECTOS_ALIADO, SEGUIMIENTOS } from '@/features/reglas/data/efectos-conjuro';
import { BarraIniciativa } from './BarraIniciativa';
import { FilaArsenal, Ranuras, RecursosClase } from './Ficha';

const TIPOS_BOTON: TipoAccionRonda[] = ['accion', 'adicional', 'reaccion'];

/** Lo que otro jugador te hizo con una acción: daño (primero a los PG temporales), curación, y un efecto que queda a la vista hasta que lo quites. */
function aplicarEfecto(o: OrdenDm) {
  const pj = S.pj; if (!pj) return;
  const n = Math.max(0, Math.round(o.dano || 0));
  if (n && o.cura) moverPool('pg', n);
  else if (n) {
    const temp = Math.max(0, +pj.pgTemp || 0), t = Math.min(temp, n);
    if (t) setVal('pgTemp', temp - t);
    if (n - t) moverPool('pg', -(n - t));
  }
  if (o.condicion || o.bono) setVal('efectos', [...(pj.efectos || []).filter((x: any) => x.nombre !== (o.condicion || 'Efecto')), { nombre: o.condicion || 'Efecto', texto: o.bono || '', de: o.de || '' }]);
  avisar(`${o.de || 'Alguien'}${o.nota ? ` (${o.nota})` : ''}: ${n ? (o.cura ? `te cura ${n} PG` : `te hace ${n} de daño`) : ''}${o.condicion ? `${n ? ', ' : ''}${o.condicion}` : ''}.`);
}

/** Aplica a esta hoja los descansos y la inspiración que mandó el DM. Se recuerda cuáles ya se aplicaron (por personaje);
 *  la primera vez solo cuentan las de los últimos 10 minutos, para no repetir lo de otras sesiones. */
function aplicarOrdenes(ordenes: OrdenDm[] | undefined, pid: string) {
  if (!ordenes?.length) return;
  const clave = 'mt-ordenes-' + pid;
  let vistos: string[] | null = null;
  try { const t = localStorage.getItem(clave); vistos = t ? JSON.parse(t) : null; } catch { /* sin almacenamiento: se aplican las recientes */ }
  const nuevas = ordenes.filter(o => (!o.personajeId || o.personajeId === pid) && (vistos ? !vistos.includes(o.id) : Date.now() - Date.parse(o.ts) < 600000));
  if (vistos && !nuevas.length) return;
  try { localStorage.setItem(clave, JSON.stringify([...(vistos || []), ...ordenes.map(o => o.id)].slice(-80))); } catch { /* idem */ }
  for (const o of nuevas) {
    if (o.tipo === 'inspiracion') { setVal('inspiracion', true); avisar('Tu DM te dio inspiración.'); }
    else if (o.tipo === 'efecto') aplicarEfecto(o);
    else descansar(o.tipo);
  }
}

const mismo = (a: Uso | null, b: Uso) => !!a && a.tipo === b.tipo && a.nombre === b.nombre;
/** Una opción que se elige tocándola (borde verde); abajo hay un solo botón para usar la elegida. */
function Opcion({ uso, elegido, elegir, children }: { uso: Uso; elegido: Uso | null; elegir: (u: Uso) => void; children: React.ReactNode }) {
  const marcada = mismo(elegido, uso);
  return (
    <div role="radio" aria-checked={marcada} tabIndex={0} onClick={() => elegir(uso)}
      onKeyDown={e => { if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); elegir(uso); } }}
      className={cx('cursor-pointer rounded-xl border-2 p-0.5 transition-colors', foco, marcada ? 'border-green-400 bg-green-400/10' : 'border-transparent')}>
      {children}
    </div>
  );
}

/** Una opción de solo nombre: al tocarla se elige y se ve su descripción debajo. */
function OpcionNombre({ uso, elegido, elegir, sub, icono }: { uso: Uso; elegido: Uso | null; elegir: (u: Uso) => void; sub?: string; icono?: string }) {
  const marcada = mismo(elegido, uso);
  return (
    <Opcion uso={uso} elegido={elegido} elegir={elegir}>
      <div className="rounded-lg bg-surface-container-lowest px-3 py-2">
        <div className="flex items-center gap-2">
          {icono && <Simbolo n={icono} className="text-body-lg text-secondary" />}
          <span className="min-w-0 flex-1 text-body-md font-semibold text-on-surface">{uso.nombre}</span>
          {sub && <span className="shrink-0 text-label-caps text-outline">{sub}</span>}
        </div>
        {marcada && uso.texto && <p className="m-0 mt-2 border-t border-outline-variant/30 pt-2 text-body-sm text-on-surface-variant" dangerouslySetInnerHTML={{ __html: uso.raw ? richT(uso.texto) : esc(uso.texto) }} />}
      </div>
    </Opcion>
  );
}

/** Truco o hechizo con el mismo estilo de tarjeta que los ataques: icono, nombre, información; al elegirlo se ve su descripción. */
function FilaMagia({ s, c, uso, elegido, elegir }: { s: any; c: any; uso: Uso; elegido: Uso | null; elegir: (u: Uso) => void }) {
  const d = datosConjuro(s, c), truco = !(+s.nivel > 0), marcada = mismo(elegido, uso);
  const info = [d.bits.join(', '), d.meta, uso.coste && !truco ? uso.coste : ''].filter(Boolean).join(' • ');
  const salv = s.salv ? String(s.salv).toUpperCase() : '';
  return (
    <Opcion uso={uso} elegido={elegido} elegir={elegir}>
      <div className="flex items-start gap-3 rounded-lg bg-surface-container p-3 shadow-md">
        <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-surface-container-lowest text-secondary shadow-inner">
          <Simbolo n={truco ? 'auto_fix_high' : 'auto_stories'} className="text-headline-md" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="m-0 font-serif text-headline-sm text-on-surface">{s.nombre}</h3>
          <p className="m-0 mt-0.5 text-body-sm text-outline">{info}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 text-label-caps text-on-surface-variant">
            {s.ataque && d.atk != null && <span>Modificador: <strong className="text-secondary">{d.atk >= 0 ? '+' : ''}{d.atk} impacto</strong></span>}
            {salv && <span>Salvación: <strong className="text-secondary">CD {d.cd} de {salv}</strong></span>}
            {d.dexpr && <span>Daño: <strong className="text-secondary">{d.dexpr}{s.tipo ? ' ' + s.tipo : ''}</strong></span>}
          </div>
          {marcada && uso.texto && <p className="m-0 mt-2 border-t border-outline-variant/30 pt-2 text-body-sm text-on-surface-variant" dangerouslySetInnerHTML={{ __html: richT(uso.texto) }} />}
        </div>
        <Restante r={restanteConjuro(c, s)} />
      </div>
    </Opcion>
  );
}

/** Un menú plegable de opciones (la primera vez abierto el de la clase). */
function MenuAcciones({ titulo, abierto, hijos, children }: { titulo: string; abierto?: boolean; hijos: number; children: React.ReactNode }) {
  if (!hijos) return null;
  return (
    <details open={abierto} className="group rounded-lg bg-surface-container-low">
      <summary className={cx('flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-3 py-2', foco)}>
        <span className="font-serif text-body-lg font-bold text-on-surface">{titulo} <span className="text-body-sm font-normal text-outline">({hijos})</span></span>
        <Simbolo n="expand_more" className="text-body-lg text-outline transition-transform group-open:rotate-180" />
      </summary>
      <div className="space-y-2 px-2 pb-3">{children}</div>
    </details>
  );
}

/** Icono de un rasgo de clase según lo que hace (por palabras de su nombre y su texto). */
const ICONOS: [RegExp, string][] = [
  [/libre|persona|disfraz/, 'mascara-luchador'], [/pr[eé]parate|temporales|resistencia/, 'health_and_safety'], [/mover|correr|salto|paso|vuelo|velocidad/, 'directions_run'],
  [/rabia|furia|fuego|llama|ardien/, 'local_fire_department'], [/curar|sanar|imposici|restaur|recuper/, 'healing'], [/inspira|canci|m[uú]sica|bardo/, 'music_note'],
  [/forma salvaje|bestia|animal|compa[ñn]ero/, 'pets'], [/sombra|invisib|sigilo|ocult|furtiv|escond/, 'visibility_off'], [/escudo|defens|proteg|armadura|guardi/, 'shield'],
  [/veneno|toxic/, 'science'], [/c[oó]lera|castigo|golpe|ataque|ráfaga|rafaga/, 'swords'], [/\bver\b|sentido|percep|vista/, 'visibility'], [/canalizar|divin|sagrad|luz|radiante/, 'light_mode'],
  [/escarbar|determinaci|enfoque|concentra|\bmente\b/, 'psychology'], [/\bki\b|moxie|energ/, 'bolt'],
];
const iconoDe = (e: any) => { const t = norm(`${e.nombre}`) + ' ' + norm(String(e.texto || '').slice(0, 120)); for (const [r, i] of ICONOS) if (r.test(norm(e.nombre)) || r.test(t)) return i; return 'star'; };

/** Máscara de luchador (lucha libre): ojos y boca abiertos y una franja al centro. */
function MascaraLuchador({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cx('size-[1em]', className)} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.5c-4.2 0-7 3.2-7 8 0 5.3 2.3 9.6 7 11 4.7-1.4 7-5.7 7-11 0-4.8-2.8-8-7-8z" />
      <path d="M12 2.5v5.5M12 13.5v1.5" />
      <path d="M6.8 10.6c1.2-1.5 3.6-1.5 4.6.2-1 1.7-3.4 1.7-4.6-.2zM17.2 10.6c-1.2-1.5-3.6-1.5-4.6.2 1 1.7 3.4 1.7 4.6-.2z" />
      <path d="M9.2 17c1.7 1.2 3.9 1.2 5.6 0" />
    </svg>
  );
}

/** Rasgo de clase con el mismo estilo de tarjeta que los ataques; al elegirlo se ve su texto completo. */
function FilaRasgo({ e, c, uso, elegido, elegir }: { e: any; c: any; uso: Uso; elegido: Uso | null; elegir: (u: Uso) => void }) {
  const marcada = mismo(elegido, uso);
  const corta = String(e.texto || '').replace(/\*\*|__/g, '').split(/(?<=\.)\s/)[0];
  return (
    <Opcion uso={uso} elegido={elegido} elegir={elegir}>
      <div className="flex items-start gap-3 rounded-lg bg-surface-container p-3 shadow-md">
        <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-surface-container-lowest text-primary shadow-inner">{iconoDe(e) === 'mascara-luchador' ? <MascaraLuchador className="text-headline-md" /> : <Simbolo n={iconoDe(e)} className="text-headline-md" />}</div>
        <div className="min-w-0 flex-1">
          <h3 className="m-0 font-serif text-headline-sm text-on-surface">{e.nombre}</h3>
          <p className="m-0 mt-0.5 text-body-sm text-outline">{[e.coste, !marcada && corta].filter(Boolean).join(' • ')}</p>
          {marcada && uso.texto && <p className="m-0 mt-2 border-t border-outline-variant/30 pt-2 text-body-sm text-on-surface-variant" dangerouslySetInnerHTML={{ __html: uso.raw ? richT(uso.texto) : esc(uso.texto) }} />}
        </div>
        <Restante r={restanteDe(c, e.recurso)} />
      </div>
    </Opcion>
  );
}

/** Lo que te queda del recurso que gasta una opción (2/3 Moxie), a la derecha de su tarjeta. */
function Restante({ r }: { r: { quedan: number; max: number; nombre: string } | null }) {
  if (!r) return null;
  return (
    <div className={cx('shrink-0 self-center rounded-lg bg-surface-container-lowest px-2 py-1 text-center', r.quedan ? 'text-primary' : 'text-error')} aria-label={`Te quedan ${r.quedan} de ${r.max}: ${r.nombre}`}>
      <div className="font-serif text-headline-sm font-extrabold leading-none">{r.quedan}/{r.max}</div>
      <div className="max-w-24 truncate text-[0.65rem] uppercase text-outline">{r.nombre}</div>
    </div>
  );
}

/** Rasgos que dan más ataques con la acción Atacar solo mientras están activos. */
const CONDICIONALES = [
  { rasgo: 'Conquistador Invencible', texto: 'Conquistador Invencible activo: un ataque más con la acción Atacar', mas: 1 },
  { rasgo: 'Yo Astral Despierto', texto: 'Yo Astral Despierto activo y atacas solo con los brazos astrales: un ataque más', mas: 1 },
  { rasgo: 'Rompehordas', texto: 'Rompehordas: un ataque extra contra otro enemigo cercano a tu objetivo (una vez por turno)', mas: 1 },
];

/** Rasgos cuyo efecto pide renunciar a la ventaja del ataque (Golpe Brutal, maniobras del Maestro de Batalla). */
const RENUNCIA = /renuncia(s|r)? (a la|a tu) ventaja|renunciar a la ventaja/i;

const DE_MOVIMIENTO = new Set(['Correr', 'Destrabarse']);

/** Lo que se puede hacer con cada tipo de acción, en tres menús: de la clase (ataques, rasgos y conjuros), de movimiento y genéricas. */
function OpcionesDeTipo({ c, t, elegido, elegir, marcas, quitarMarca }: { c: any; t: TipoAccionRonda; elegido: Uso | null; elegir: (u: Uso) => void; marcas: any[]; quitarMarca: (id: string) => void }) {
  const armas = t === 'accion' ? [...c.armas.filter((a: any) => a.mano), ...(c.naturales || [])] : [];
  const sinArmas = t === 'accion' ? { puno: true, nombre: 'Golpe sin armas', atk: c.unarmed.atk, expr: c.unarmed.expr, dmg: c.unarmed.dmg, atkDesg: c.unarmed.atkDesg, dmgDesg: c.unarmed.dmgDesg, notas: [`También puede Agarrar o Empujar (CD ${c.grappleDC})`] } : null;
  const ents = c.entries.filter((e: any) => e.t === t);
  const conjuros = (c.conjuros || []).filter((s: any) => (s.tiempo || 'accion') === t);
  // «Atacar» ya está en los ataques de arriba; los demás van a movimiento o a genéricas
  const com = (COMUNES[t] || []).filter(([n]: [string]) => n !== 'Atacar');
  const mov = com.filter(([n]: [string]) => DE_MOVIMIENTO.has(n)), gen = com.filter(([n]: [string]) => !DE_MOVIMIENTO.has(n));
  // Al elegir un ataque se ve debajo qué hace
  const op = (u: Uso, hijo: React.ReactNode, k: string | number) => (
    <Opcion key={k} uso={u} elegido={elegido} elegir={elegir}>
      {hijo}
      {mismo(elegido, u) && u.texto && <p className="m-0 mx-2 mb-2 mt-1 rounded-lg bg-surface-container-lowest p-2 text-body-sm text-on-surface-variant" dangerouslySetInnerHTML={{ __html: u.raw ? richT(u.texto) : esc(u.texto) }} />}
    </Opcion>
  );
  const mias = marcas.filter((x: any) => x.en === t);
  const nAtaques = ataquesPorAccion(c);
  // Efectos que suman ataques solo mientras se cumplen: una casilla dice si valen ahora
  const puedeRenunciar = (c.entries || []).some((e: any) => RENUNCIA.test(String(typeof e.texto === 'function' ? '' : e.texto || '')) || /golpe brutal|maniobra/i.test(e.nombre || ''));
  const condicionales = t === 'accion' ? CONDICIONALES.filter(x => c.entries.some((e: any) => norm(e.nombre) === norm(x.rasgo))) : [];
  const deArma = (a: any): Uso => ({ tipo: t, nombre: a.nombre, ...(nAtaques > 1 && t === 'accion' ? { golpes: nAtaques } : {}), ...(condicionales.length ? { condiciones: condicionales } : {}), ...(puedeRenunciar ? { renuncia: true } : {}), texto: [a.w?.dist ? 'Ataque a distancia' : 'Ataque cuerpo a cuerpo', ...(nAtaques > 1 && t === 'accion' ? [`Con Ataque Extra haces ${nAtaques} ataques con la acción Atacar`] : []), a.dmg && `Daño: ${a.dmg}`, a.maestria && `Maestría: ${a.maestria}`, ...(a.notas || [])].filter(Boolean).join('. ') || 'Ataque', ...(a.cd == null ? { atk: a.atk } : { salv: a.salv, cd: a.cd }), dexpr: a.expr, afecta: true });
  // Un rasgo que ataca sin armas (Golpe sin armas extra) se ve como un ataque, con su puño
  const comoAtaque = (e: any) => !!e.roll?.[0];
  const deRasgo = (e: any): Uso => {
    // Un rasgo que ataca (Golpe sin armas extra, Ráfaga de golpes…) trae su tirada: se trata como un ataque
    const atk = e.roll?.[0] ? +(/([+-]\d+)\s*$/.exec(e.roll[0])?.[1] ?? 0) : undefined;
    const gasta = e.recurso && /^1 /.test(e.coste || '') ? e.recurso : undefined;
    // «Haces dos golpes…», Ráfaga de Golpes: cada uno se registra aparte
    const n = golpesDeRasgo(c, e), golpes = n > 1 ? n : undefined;
    // Un ataque más (Golpe Repentino) también apunta a un objetivo
    const ataca = atk != null || !!golpes || /\b(?:un|otro) ataque (?:más|adicional|extra)\b|\bhacer (?:un|otro) ataque\b/i.test(String(e.texto || ''));
    const efecto = EFECTOS_ALIADO[norm(e.nombre)], equipar = norm(e.nombre) === 'pacto del filo';
    return { tipo: t, nombre: e.nombre, coste: e.coste, texto: e.texto || '', raw: !!e.raw, ...(efecto ? { efecto } : {}), ...(equipar ? { equipar } : {}), ...(golpes ? { golpes } : {}), ...(atk != null ? { atk, dexpr: e.roll[1] } : {}), afecta: ataca || !!efecto, ...(gasta ? { gasta } : {}) };
  };
  const comoArma = (e: any) => ({ puno: /sin armas|golpe|pu[ñn]/i.test(`${e.nombre} ${e.texto}`), nombre: e.nombre, atk: +(/([+-]\d+)\s*$/.exec(e.roll[0])?.[1] ?? 0), expr: e.roll[1], dmg: String(e.roll[1]).replace(/\s/g, ''), notas: [] as string[] });
  const deConjuro = (s: any): Uso => {
    const d = datosConjuro(s, c), salv = s.salv ? String(s.salv).toUpperCase() : undefined;
    const sg = SEGUIMIENTOS[norm(s.nombre)], ef = EFECTOS_ALIADO[norm(s.nombre)];
    // Un conjuro que cura: devuelve puntos de golpe y no ataca ni pide salvación
    const cura = !s.ataque && !salv && /recuper\w* (?:\w+ ){0,3}puntos de golpe|recuper\w* \d+d\d+/i.test(String(s.desc || ''));
    return { tipo: t, nombre: s.nombre, coste: s.coste || (+s.nivel ? `Nivel ${s.nivel}` : 'Truco'), texto: String(s.desc || '').trim(), raw: true, ...(s.ataque && d.atk != null ? { atk: d.atk } : {}), ...(salv ? { salv, cd: d.cd } : {}), dexpr: ef ? undefined : d.dexpr || undefined, afecta: !!(s.ataque || salv || s.dados || ef || cura),
      ...(sg ? { marca: { id: norm(s.nombre).replace(/\s+/g, '-'), nombre: sg.nombre, texto: sg.texto, dexpr: sg.dado || d.dexpr || '', tipo: sg.tipo, en: sg.en, desde: sg.desde, objetivo: sg.objetivo,
        ...(sg.ataque && d.atk != null ? { atk: d.atk } : {}), ...(sg.salv ? { salv: sg.salv, cd: d.cd } : {}), ...(sg.porNivel ? { porNivel: sg.porNivel, nivelBase: sg.nivelBase } : {}) } as Marca } : {}),
      ...(ef ? { efecto: ef } : {}), ...(cura ? { cura: true } : {}),
      ...(+s.nivel > 0 ? { conjuro: { nivel: +s.nivel, rasgo: s.recurso, ritual: !!s.ritual, desc: s.desc, base: ef ? '' : d.dexpr, bono: d.dexpr && !ef ? bonosPara(c, s).reduce((x: number, b: any) => x + (+b.valor || 0), 0) : 0 } } : {}) };
  };
  const nom = (u: Uso, k: string | number, sub?: string, icono?: string) => <OpcionNombre key={k} uso={u} elegido={elegido} elegir={elegir} sub={sub} icono={icono} />;
  const trucos = conjuros.filter((x: any) => !(+x.nivel > 0)), hechizos = conjuros.filter((x: any) => +x.nivel > 0);
  const ataques = ents.filter(comoAtaque), otros = ents.filter((e: any) => !comoAtaque(e));
  const delaClase = armas.length + (sinArmas ? 1 : 0) + ataques.length;
  return (
    <div role="radiogroup" aria-label="Elige qué haces" className="space-y-2">
      <MenuAcciones titulo="Ataques" abierto hijos={delaClase}>
        {armas.map((a: any, i: number) => op(deArma(a), <FilaArsenal a={a} c={c} sinTirar />, 'a' + a.nombre + i))}
        {sinArmas && op(deArma(sinArmas), <FilaArsenal a={sinArmas} c={c} sinTirar />, 'sa')}
        {ataques.map((e: any, i: number) => {
          const fila = <FilaArsenal a={comoArma(e)} c={c} sinTirar />, r = restanteDe(c, e.recurso);
          return op(deRasgo(e), r ? <div className="flex items-center gap-2"><div className="min-w-0 flex-1">{fila}</div><Restante r={r} /></div> : fila, 'r' + i);
        })}
      </MenuAcciones>
      <MenuAcciones titulo="Trucos" abierto hijos={trucos.length}>
        {trucos.map((x: any, i: number) => <FilaMagia key={'t' + x.nombre + i} s={x} c={c} uso={deConjuro(x)} elegido={elegido} elegir={elegir} />)}
      </MenuAcciones>
      <MenuAcciones titulo="Hechizos" abierto hijos={hechizos.length}>
        {hechizos.map((x: any, i: number) => <FilaMagia key={'h' + x.nombre + i} s={x} c={c} uso={deConjuro(x)} elegido={elegido} elegir={elegir} />)}
      </MenuAcciones>
      <MenuAcciones titulo="Acciones de la clase" abierto hijos={otros.length}>
        {otros.map((e: any, i: number) => <FilaRasgo key={'o' + e.nombre + i} e={e} c={c} uso={deRasgo(e)} elegido={elegido} elegir={elegir} />)}
      </MenuAcciones>
      {mias.length > 0 && (
        <MenuAcciones titulo="Conjuros que siguen activos" abierto hijos={mias.length}>
          {mias.map((x: any) => (
            <div key={x.id} className="space-y-1">
              {nom({ tipo: t, nombre: `${x.nombre}: repetir${x.nombreObj ? ` (${x.nombreObj})` : ''}`, texto: x.texto, dexpr: x.dexpr || undefined, afecta: true,
                ...(x.atk != null ? { atk: x.atk } : {}), ...(x.salv ? { salv: x.salv, cd: x.cd } : {}) }, 'mk' + x.id, [x.dexpr, x.tipo].filter(Boolean).join(' de '), 'auto_fix_high')}
              <button type="button" onClick={() => quitarMarca(x.id)} className="min-h-11 cursor-pointer rounded px-2 text-body-sm text-outline underline">Ya no sigue activo (terminó o se liberó)</button>
            </div>
          ))}
        </MenuAcciones>
      )}
      <MenuAcciones titulo="Acciones de movimiento" hijos={mov.length}>
        {mov.map(([n, f]: [string, (c: any) => string]) => nom({ tipo: t, nombre: n, texto: f(c), afecta: false }, n))}
      </MenuAcciones>
      <MenuAcciones titulo="Acciones genéricas" hijos={gen.length}>
        {gen.map(([n, f]: [string, (c: any) => string]) => nom({ tipo: t, nombre: n, texto: f(c), afecta: false }, n))}
      </MenuAcciones>
    </div>
  );
}

/** La tarjeta resumida del personaje (como la que ve el DM): pasivas, PG con daño y curación directos, y los botones de la pantalla. */
function ResumenCombate({ c, m, conds, dur, ven, esMiTurno }: { c: any; m: { mesa: string; dm: string }; conds: string[]; dur: Record<string, string>; ven: '' | 'v' | 'd'; esMiTurno: boolean }) {
  const pj = c.pj, [n, setN] = useState('');
  const pg = c.recursos.find((r: any) => r.id === 'pg');
  const max = pg?.max ?? c.hpMax, actual = max - Math.min(pj.used?.pg || 0, max);
  const temp = Math.max(0, +pj.pgTemp || 0), pct = max ? (actual / max) * 100 : 0;
  const barra = pct <= 25 ? 'bg-error' : pct <= 50 ? 'bg-primary-fixed-dim' : 'bg-primary';
  const v = Math.max(0, Math.round(+n || 0));
  // El daño se lleva primero los puntos temporales
  const danar = (x: number) => {
    if (!x || !pg) return;
    const t = Math.min(temp, x);
    if (t) setVal('pgTemp', temp - t);
    if (x - t) moverPool('pg', -(x - t));
    setN('');
  };
  const curar = (x: number) => { if (x && pg) { moverPool('pg', x); setN(''); } };
  const stats: [string | number, string][] = [
    [c.ac, 'CA'], [c.passive, 'Percepción pasiva'], [10 + c.skill.perspicacia, 'Perspicacia pasiva'], [10 + c.skill.investigacion, 'Investigación pasiva'],
    [sign(c.init), 'Iniciativa'], [c.speed, 'Pies'], ...(c.dcSpell ? [[c.dcSpell, 'CD conjuros'] as [number, string]] : []),
  ];
  return (
    <section aria-label="Resumen del personaje" className="rounded-lg border-l-4 border-green-400 bg-surface-container-low p-3 shadow-lg">
      <header className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h2 className="m-0 font-serif text-headline-md text-on-surface">{c.pj.nombre || 'Personaje'}</h2>
          <p className="m-0 text-body-sm text-outline">{resumen(pj)}{c.SD ? `, ${c.SD.n}` : ''}</p>
          <p className="m-0 text-label-caps text-outline">Mesa «{m.mesa}» · DM {m.dm}</p>
        </div>
        <Boton tamano="sm" variante="primario" className="shrink-0 whitespace-nowrap" onClick={() => { S.combateHoja = true; render(); }}>Ver hoja</Boton>
      </header>
      <dl className="m-0 mt-3 grid grid-cols-3 gap-1.5">
        {stats.map(([x, t]) => <div key={t} className="flex flex-col-reverse rounded-lg bg-surface-container px-1 py-1.5 text-center"><dt className="text-[0.7rem] text-outline">{t}</dt><dd className="m-0 font-serif text-xl font-extrabold text-on-surface">{x}</dd></div>)}
      </dl>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-container"><div className={cx('h-full rounded-full transition-all', barra)} style={{ width: `${Math.max(0, Math.min(100, pct))}%` }} /></div>
      <p className="m-0 mt-2 text-body-md text-on-surface"><span className="font-serif text-headline-md font-extrabold">{actual}</span> / {max} PG{temp ? ` · +${temp} temporales` : ''}</p>
      {(conds.length > 0 || ven) && (
        <div className="mt-3 grid gap-1 rounded-lg bg-error-container/30 p-2" aria-label="Tus condiciones">
          {ven && <p className="m-0 text-body-sm text-on-surface"><b className={ven === 'v' ? 'text-green-400' : 'text-error'}>{ven === 'v' ? 'Ventaja' : 'Desventaja'} en tus ataques.</b> Lo puso tu DM.</p>}
          {conds.map(n => (
            <p key={n} className="m-0 text-body-sm text-on-surface"><b className="text-error">{n}.</b> {EFECTO_CONDICION[n] || ''}{n === 'Derribado' && esMiTurno ? ' (Es tu turno: lo notarás al moverte.)' : ''} <span className="text-outline">{dur[n] ? `Dura: ${dur[n]}.` : 'Dura hasta que tu DM la quite.'}</span></p>
          ))}
        </div>
      )}
      {(pj.efectos || []).length > 0 && (
        <div className="mt-3 grid gap-1 rounded-lg bg-primary-container/30 p-2" aria-label="Efectos que tienes">
          {(pj.efectos as any[]).map(x => (
            <p key={x.nombre} className="m-0 text-body-sm text-on-surface"><b className="text-primary">{x.nombre}</b>{x.de ? ` (de ${x.de})` : ''}. {x.texto}{' '}
              <button type="button" className="cursor-pointer text-outline underline" onClick={() => setVal('efectos', (pj.efectos as any[]).filter(y => y.nombre !== x.nombre))}>Quitar</button></p>
          ))}
        </div>
      )}
      <div className="mt-2 grid grid-cols-[1fr_auto_auto] gap-2">
        <input aria-label="Cantidad de puntos de golpe" type="number" inputMode="numeric" min={0} placeholder="Puntos" value={n} onChange={e => setN(e.target.value)}
          className="min-h-11 w-full rounded bg-surface-container-lowest px-2 text-body-md text-on-surface" />
        <Boton variante="peligro" disabled={!v} onClick={() => danar(v)}>Quitar</Boton>
        <Boton variante="secundario" disabled={!v} onClick={() => curar(v)}>Curar</Boton>
      </div>
    </section>
  );
}

/** Mandar daño (y una condición) a un enemigo: el DM lo aplica en su Mesa. */
function GolpeAEnemigo({ enemigos, mesa }: { enemigos: { k: string; nombre: string }[]; mesa: { dmId: string; campanaId: string; personajeId: string } }) {
  const [objetivo, setObjetivo] = useState(''), [dano, setDano] = useState(''), [cond, setCond] = useState(''), [nota, setNota] = useState(''), [ocupado, setOcupado] = useState(false);
  const elegido = enemigos.some(e => e.k === objetivo) ? objetivo : enemigos[0]?.k || '';
  if (!enemigos.length) return <p className="m-0 rounded-lg bg-surface-container-low p-3 text-body-sm text-outline">No hay enemigos en el combate todavía.</p>;
  const campo = 'min-h-11 w-full rounded bg-surface-container-lowest px-2 text-body-md text-on-surface';
  const enviar = async () => {
    const n = Math.max(0, Math.round(+dano || 0));
    if (!n && !cond) { avisar('Pon el daño o una condición.', 'error'); return; }
    setOcupado(true);
    try {
      await enviarGolpeMesa(mesa, { objetivo: elegido, dano: n, ...(cond ? { condicion: cond } : {}), ...(nota.trim() ? { nota: nota.trim() } : {}) });
      avisar(`Enviado a ${enemigos.find(e => e.k === elegido)?.nombre}: ${n} de daño${cond ? `, ${cond}` : ''}. Tu DM lo aplica.`);
      setDano(''); setCond(''); setNota('');
    } catch (e) { avisar(`No se pudo enviar: ${(e as Error).message}`, 'error'); }
    finally { setOcupado(false); }
  };
  return (
    <div className="grid gap-2 rounded-lg bg-surface-container-low p-3 shadow-md">
      <span className="text-label-caps uppercase text-outline">Aplicar a un enemigo</span>
      <select aria-label="Enemigo" value={elegido} onChange={e => setObjetivo(e.target.value)} className={campo}>{enemigos.map(e => <option key={e.k} value={e.k}>{e.nombre}</option>)}</select>
      <div className="grid grid-cols-2 gap-2">
        <input aria-label="Daño" type="number" inputMode="numeric" min={0} placeholder="Daño total" value={dano} onChange={e => setDano(e.target.value)} className={campo} />
        <select aria-label="Condición" value={cond} onChange={e => setCond(e.target.value)} className={campo}><option value="">Sin condición</option>{CONDICIONES.map(n => <option key={n}>{n}</option>)}</select>
      </div>
      <input aria-label="Con qué" type="text" maxLength={80} placeholder="Con qué (opcional): Bola de fuego" value={nota} onChange={e => setNota(e.target.value)} className={campo} />
      <Boton variante="primario" disabled={ocupado} onClick={enviar}>Aplicar</Boton>
    </div>
  );
}

/** Pantalla de combate del jugador: solo su personaje, con acción, acción adicional y reacción sincronizadas con el DM. */
export function ModoCombate({ c }: { c: any }) {
  const m = S.combateMesa!, { dmId, campanaId, personajeId } = m;
  const [viv, setViv] = useState<CombateVivo>(null);
  const [eco, setEco] = useState<EconomiaRonda>({});
  const [abierto, setAbierto] = useState<TipoAccionRonda | null>(null);
  const [uso, setUso] = useState<Uso | null>(null);
  const [elegido, setElegido] = useState<Uso | null>(null);
  const [error, setError] = useState('');
  const toques = useRef<Partial<Record<TipoAccionRonda, number>>>({});

  useEffect(() => {
    let vivo = true;
    const ref = { dmId, campanaId, personajeId };
    const leer = () => combateMesa(ref).then(d => {
      if (!vivo) return;
      setViv(d); setError('');
      aplicarOrdenes(d?.ordenes, personajeId);
      const e = d?.economia?.[personajeId] || {};
      // Un toque reciente manda sobre lo que devuelva el servidor, para que el botón no parpadee
      setEco(prev => {
        const sig: EconomiaRonda = { ...e };
        for (const t of TIPOS_BOTON) if (Date.now() - (toques.current[t] || 0) < 3000) sig[t] = prev[t];
        return sig;
      });
    }).catch((err: Error) => { if (vivo) setError(err.message); });
    leer();
    const id = setInterval(leer, 2000);
    return () => { vivo = false; clearInterval(id); };
  }, [dmId, campanaId, personajeId]);

  // Al terminar el combate se acaban las marcas
  const terminado = !!viv && !viv.activo;
  useEffect(() => { if (terminado && c.pj.marcas?.length) setVal('marcas', []); if (terminado && c.pj.efectos?.length) setVal('efectos', []); }, [terminado, c.pj.marcas?.length, c.pj.efectos?.length]);

  const gastar = (t: TipoAccionRonda, gastado: boolean) => {
    toques.current[t] = Date.now();
    setEco(p => ({ ...p, [t]: gastado }));
    gastarAccionMesa(m, t, gastado).catch((e: Error) => { setError(e.message); setEco(p => ({ ...p, [t]: !gastado })); });
  };

  const activo = !!viv?.activo, turnoDe = viv?.orden?.[viv.turno || 0];
  const yo = viv?.orden?.find(o => o.pid === personajeId), mias = yo?.cond || [];
  const esMiTurno = !!turnoDe && turnoDe.pid === m.personajeId;
  const enemigos = (viv?.orden || []).filter(o => o.tipo === 'm');
  // A quién se le puede hacer algo: enemigos primero y luego aliados (otros jugadores, mascotas y tú mismo)
  const objetivos: Objetivo[] = [...enemigos.map(o => ({ k: o.k, nombre: o.nombre })),
    ...(viv?.orden || []).filter(o => o.tipo !== 'm').map(o => ({ k: o.k, nombre: o.k === yo?.k ? `${o.nombre} (tú)` : o.nombre, aliado: true }))];
  const ranuras = c.recursos.filter((r: any) => /^slot\d/.test(r.id));
  // Las marcas que dejaste (Rayo de hechicería) dan su acción adicional desde la ronda siguiente a la que las pusiste
  const ronda = viv?.ronda || 1;
  const marcas = activo ? (c.pj.marcas || []).filter((x: any) => x.desde === 'ya' || ronda > x.ronda) : [];
  const marcar = (mk: any, objetivo: string, nombreObj: string) => { setVal('marcas', [...(c.pj.marcas || []).filter((x: any) => x.id !== mk.id), { ...mk, objetivo, nombreObj, ronda }]); };
  const quitarMarca = (id: string) => { setVal('marcas', (c.pj.marcas || []).filter((x: any) => x.id !== id)); };
  const volverACampana = () => { S.combateMesa = null; S.combateHoja = false; S.campJ = { dmId, campanaId }; S.campJTab = 'combate'; S.view = 'mesaj'; render(); irArriba(); };

  return (
    <div className="mx-auto grid max-w-3xl gap-4 pb-24">
      {viv && <BarraIniciativa viv={viv} miPid={personajeId} mesa={m} />}
      <ResumenCombate c={c} m={m} conds={mias} dur={yo?.dur || {}} ven={yo?.ven || ''} esMiTurno={esMiTurno} />

      {(ranuras.length > 0 || c.recursos.some((r: any) => r.id !== 'pg' && !/^slot\d/.test(r.id))) && (
        <section className="grid gap-3" aria-label="Recursos">
          <h3 className="m-0 flex items-center gap-1 font-serif text-headline-sm text-secondary"><Simbolo n="auto_awesome" className="text-body-lg" />Recursos</h3>
          {ranuras.map((r: any) => <Ranuras key={r.id} r={r} c={c} />)}
          <RecursosClase c={c} />
        </section>
      )}

      <div className={cx('rounded-lg p-3 text-center shadow-lg', esMiTurno ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-low text-on-surface')}>
        {activo ? (
          <>
            <p className="m-0 font-serif text-headline-sm">Ronda {viv?.ronda || 1}</p>
            <p className="m-0 text-body-md">{esMiTurno ? '¡Es tu turno!' : turnoDe ? `Turno de ${turnoDe.nombre}` : ''}</p>
          </>
        ) : <p className="m-0 text-body-md text-on-surface-variant">El DM todavía no ha empezado el combate. Esta pantalla se actualizará sola.</p>}
        {error && <p className="m-0 mt-1 text-body-sm text-error">No se pudo sincronizar: {error}</p>}
      </div>

      <div className="flex justify-center"><Boton variante="fantasma" onClick={volverACampana}>← Volver a la campaña</Boton></div>

      <nav aria-label="Tu turno" className="fixed inset-x-0 bottom-[var(--alto-nav-inferior,0px)] z-10 border-t border-rule bg-surface-container-low/95 backdrop-blur print:hidden">
        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-2 p-2" role="group">
          {TIPOS_BOTON.map(t => {
            const gastada = !!eco[t];
            return (
              <button key={t} type="button" onClick={() => { setElegido(null); setAbierto(t); }} aria-haspopup="dialog"
                className={cx('flex min-h-14 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-1.5 text-center transition-all', foco,
                  gastada ? 'bg-surface-container-lowest text-outline opacity-60' : 'bg-primary-container text-on-primary-container hover:brightness-110')}>
                <span className="flex items-center gap-1"><FormaTipo t={t} className="size-4" /><span className="text-body-sm font-bold leading-tight">{TIPOS[t][0]}</span></span>
                <span className="text-[0.65rem] uppercase tracking-wide">{gastada ? 'Gastada' : 'Disponible'}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <Dialogo abierto={!!abierto} onCerrar={() => setAbierto(null)} titulo={abierto ? TIPOS[abierto][0] : ''} ancho="lg"
        descripcion={abierto ? TIPOS[abierto][1] : undefined}>
        {abierto && (
          <div className="space-y-3">
            {eco[abierto] && <Boton variante="secundario" onClick={() => gastar(abierto, false)}>Recuperar {TIPOS[abierto][0].toLowerCase()} (me equivoqué)</Boton>}
            <details className="rounded-lg bg-surface-container-low"><summary className="min-h-11 cursor-pointer list-none px-3 py-2 text-body-sm text-outline">Aplicar daño a un enemigo a mano</summary><div className="p-2"><GolpeAEnemigo enemigos={enemigos} mesa={{ dmId, campanaId, personajeId }} /></div></details>
            <OpcionesDeTipo c={c} t={abierto} elegido={elegido?.tipo === abierto ? elegido : null} elegir={setElegido} marcas={marcas} quitarMarca={quitarMarca} />
            <div className="sticky bottom-0 -mx-1 flex flex-wrap gap-2 bg-surface-container-low/95 p-2 backdrop-blur">
              <Boton variante="primario" className="flex-1" disabled={!elegido || elegido.tipo !== abierto} onClick={() => { setUso(elegido); setAbierto(null); }}>
                {elegido && elegido.tipo === abierto ? `Usar ${elegido.nombre}` : 'Toca una opción para elegirla'}
              </Boton>
              {!eco[abierto] && <Boton onClick={() => gastar(abierto, true)}>Solo marcarla gastada</Boton>}
            </div>
          </div>
        )}
      </Dialogo>

      <UsoAccion c={c} uso={uso} ventaja={yo?.ven || ''} enemigos={objetivos} mesa={{ dmId, campanaId, personajeId }} yaGastada={!!(uso && eco[uso.tipo])} alCerrar={() => setUso(null)}
        alUsar={t => { toques.current[t] = Date.now(); setEco(p => ({ ...p, [t]: true })); }} alMarcar={marcar} />
    </div>
  );
}
