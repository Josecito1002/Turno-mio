/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { S } from '@/app-shell/estado';
import { esc, modStr, norm, richT, sign } from '@/shared/utils/texto';
import { Boton, Contador, Dialogo, Puntos, Simbolo, claseBotonGrande, claseCampo, cx, foco } from '@/shared/ui/kit';
import { TIPOS } from '@/features/reglas/data/caracteristicas';
import { CRIATURAS_DE_CONJURO } from '@/features/reglas/data/criaturas';
import { COLOR_TIPO, FormaTipo } from '@/features/reglas/components/TipoAccion';
import { BotonTirada, TextoConDados } from '@/features/dados/components/BotonTirada';
import { useState } from 'react';
import { useDados } from '@/features/dados/components/Bandeja';
import { avisar } from '@/shared/ui/avisos';
import { Herramienta, tieneHerramienta } from './ficha/Herramientas';
import { agregarCriatura, descansar, fijarPool, gastarEspacio, gastarRecurso, moverPool, moverRasgo, tocarPip } from '../acciones';
import { bonosPara, dadosAlLanzar, espaciosPara, extrasAtaque } from '../domain/lanzar';
import { desglose } from '../domain/calculo';

/** Compatibilidad: forma del tipo de acción. */
export const Shape = ({ t }: { t: string; className?: string }) => <FormaTipo t={t} />;

export function Mover({ e }: { e: any }) {
  const k = norm(e.nombre);
  // Al tocar una opción (aunque sea la actual) el menú se cierra
  const elegir = (ev: React.MouseEvent<HTMLElement>, t: string) => { ev.currentTarget.closest('details')?.removeAttribute('open'); moverRasgo(k, t); };
  return (
    <details className="group/m text-sm print:hidden">
      <summary className={cx('inline-flex min-h-11 cursor-pointer list-none items-center rounded-lg px-2 text-muted hover:text-ink sm:min-h-8 [&::-webkit-details-marker]:hidden', foco)}>
        Cambiar dónde aparece
      </summary>
      <div role="group" aria-label={`¿Dónde se usa ${e.nombre}?`} className="mt-2 flex flex-wrap gap-1.5">
        {Object.entries(TIPOS).map(([t, [n]]) => (
          <button key={t} type="button" aria-pressed={e.t === t} onClick={ev => elegir(ev, t)}
            className={cx('inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full px-3 text-sm font-bold sm:min-h-9', foco,
              e.t === t ? 'bg-ink text-bg' : 'bg-soft hover:bg-rule/70')}>
            <FormaTipo t={t} className="size-2.5" />{n}
          </button>
        ))}
        {e.t !== e.tAuto && <Boton tamano="sm" variante="fantasma" onClick={ev => elegir(ev, '')}>Volver a como venía</Boton>}
      </div>
    </details>
  );
}

function RecursoInline({ id }: { id: string }) {
  const r = S.c?.recursos.find((x: any) => x.id === id); if (!r || !S.pj) return null;
  const used = Math.min(S.pj.used?.[r.id] || 0, r.max), left = r.max - used;
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-soft pt-2">
      {r.tipo === 'pool'
        ? <Contador nombre={r.nombre} valor={left} max={r.max} onCambiar={d => moverPool(r.id, d)} />
        : <><span className="text-sm text-muted">Quedan {left} de {r.max}</span><Puntos nombre={r.nombre} max={r.max} usados={used} onTocar={i => tocarPip(r.id, i, r.max)} pequeno /></>}
    </div>
  );
}

/** Un rasgo, acción o dote en la hoja. */
export function Entrada({ e }: { e: any }) {
  const body = e.raw ? richT(e.texto) : esc(e.texto);
  const color = COLOR_TIPO[e.t] || COLOR_TIPO.pasiva;
  return (
    <article className={cx('my-2 rounded-lg border-l-4 bg-surface-container px-4 py-3 shadow-md break-inside-avoid', color.borde)}>
      <div className={cx((e.roll || tieneHerramienta(e)) && 'grid grid-cols-[1fr_auto] gap-x-3')}>
        <div>
          <header className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
            <h3 className="m-0 font-serif text-lg font-bold leading-snug">{e.nombre}</h3>
            {e.coste && <span className={cx('text-sm font-bold', color.texto)}>{e.coste}</span>}
          </header>
          <TextoConDados html={body} label={e.nombre} className="mb-0 mt-1" />
        </div>
        {/* El mismo botón grande que en Ataques: el bono al ataque, y el daño se tira desde la bandeja */}
        {e.roll && (() => { const b = e.roll[0].replace(/^1d20\s*/, '') || '+0'; return (
          <div className="flex flex-col items-center justify-center">
            <BotonTirada expr={e.roll[0]} label={`${e.nombre}: ataque`} dmg={e.roll[1]} dmgLabel={`${e.nombre}: daño`} estilo="grande"
              gasta={e.recurso && /^1 /.test(e.coste || '') ? e.recurso : undefined}
              {...(S.c && e.roll[0] === `1d20${modStr(S.c.unarmed.atk)}` && e.roll[1] === S.c.unarmed.expr ? { mods: S.c.unarmed.atkDesg, dmgMods: S.c.unarmed.dmgDesg } : {})}
              ariaLabel={`Tirar ataque de ${e.nombre}, ${b}`}>{b}</BotonTirada>
            <small className="mt-0.5 text-xs text-muted" aria-hidden="true">al ataque</small>
          </div>); })()}
        {!e.roll && <Herramienta e={e} />}
      </div>
      {e.recurso && S.view === 'ficha' && <RecursoInline id={e.recurso} />}
      <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
        <p className="m-0 text-xs text-muted">{e.src || ''}{e.revisada && <span className="ml-2 font-bold text-pas">Regla revisada</span>}</p>
        {S.view === 'ficha' && e.grupo && e.grupo !== 'reglas' && <Mover e={e} />}
      </div>
    </article>
  );
}

/** Fila de ataque: botón grande de ataque y daño. */
export function Ataque({ a }: { a: any }) {
  const n = a.w ? a.w.n : a.nombre;
  return (
    <li className="grid grid-cols-[1fr_auto] gap-x-3 py-3">
      <div>
        <p className="m-0 font-serif text-lg font-bold leading-snug">{a.nombre}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <BotonTirada expr={a.expr} label={`${n}: daño`} min3={a.min3} gasta={a.gasta} mods={a.dmgDesg} ariaLabel={`Tirar daño de ${n}: ${a.dmg}`}>{a.dmg}</BotonTirada>
          {a.v && <><span className="text-sm text-muted">o</span><BotonTirada expr={a.v.expr} label={`${n}: daño a dos manos`} min3={a.min3} mods={a.dmgDesg}>{a.v.dmg} a dos manos</BotonTirada></>}
        </div>
      </div>
      {a.cd != null ? (
        // Sin tirada de ataque: el objetivo hace una salvación
        <div className="row-span-2 flex flex-col items-center justify-center">
          <span className="font-serif text-2xl font-extrabold">CD {a.cd}</span>
          <small className="mt-0.5 text-xs text-muted">salvación de {a.salv}</small>
        </div>
      ) : <div className="row-span-2 flex flex-col items-center justify-center">
        <BotonTirada expr={`1d20${modStr(a.atk)}`} label={`${n}: ataque`} estilo="grande" dmg={a.expr} dmgLabel={`${n}: daño`} min3={a.min3} extras={S.c ? extrasAtaque(S.c, a) : undefined} mods={a.atkDesg} dmgMods={a.dmgDesg}
          ariaLabel={`Tirar ataque con ${n}, ${sign(a.atk)}`}>{sign(a.atk)}</BotonTirada>
        <small className="mt-0.5 text-xs text-muted" aria-hidden="true">al ataque</small>
      </div>}
      {(a.notas.length > 0 || a.maestria) && (
        <p className="col-span-1 m-0 mt-1 text-sm text-muted">
          {a.notas.join('. ')}{a.notas.length ? '.' : ''}
          {a.maestria && <>{a.notas.length ? <br /> : null}<b className="text-ink">Maestría</b> {a.maestria}</>}
        </p>
      )}
    </li>
  );
}

/** Lo que muestran las dos vistas de un conjuro: nivel y etiquetas, dados ya escalados, CD y ataque (los de un rasgo pueden usar otra característica). */
export function datosConjuro(s: any, c: any) {
  const nv = +s.nivel || 0, bits = [nv === 0 ? 'Truco' : `Nivel ${nv}`];
  let dados = s.dados || '';
  if (nv === 0 && dados && !s.noEscala && /^1d\d+$/.test(dados)) dados = dados.replace(/^1d/, (c.lvl >= 17 ? 4 : c.lvl >= 11 ? 3 : c.lvl >= 5 ? 2 : 1) + 'd');
  const mSpell = s.cd != null ? s.cd - 8 - c.pb : c.mSpell;
  const dexpr = dados ? dados + (s.mod && mSpell ? modStr(mSpell) : '') : '';
  if (s.conc) bits.push('Concentración'); if (s.ritual) bits.push('Ritual');
  const meta = [s.alcance && `Alcance: ${s.alcance}`, s.dur].filter(Boolean).join('. ');
  // Cómo se lanza, si lo da un rasgo
  const origen = s.rasgo ? [s.nota, s.abNota && `Usa ${s.abNota}`].filter(Boolean).join('. ') : '';
  const atk = s.atk ?? c.atkSpell, ab = s.abNota || String(c.casterAb || '').toUpperCase();
  return { bits, dexpr, meta, origen, atk, cd: s.cd ?? c.dcSpell, mSpell, ab, atkDesg: atk != null ? desglose([[atk - c.pb, ab], [c.pb, 'competencia']]) : '' };
}

/* Párrafos que ya resuelve el botón Lanzar (subir el conjuro de nivel, la mejora de los trucos): no se muestran */
const YA_EN_LANZAR = /^(con un espacio de (conjuro de )?nivel superior|usar un espacio de nivel superior|mejora de truco)/i;

/** Primer párrafo de la descripción; lo demás queda en "Más detalles". Los dados del texto no se tiran: para eso está Lanzar. */
function DescripcionCorta({ desc }: { desc?: string }) {
  const partes = (desc || '').trim().split(/\n\s*\n/).map(p => p.trim()).filter(p => p && !YA_EN_LANZAR.test(p));
  const [corta, ...resto] = partes;
  if (!corta) return null;
  return (
    <>
      <p className="mb-0 mt-1" dangerouslySetInnerHTML={{ __html: richT(corta) }} />
      {resto.length > 0 && (
        <details className="mt-1 text-[0.96rem]">
          <summary className={cx('inline-flex min-h-11 cursor-pointer list-none items-center rounded-lg text-sm font-bold text-muted hover:text-ink sm:min-h-8 [&::-webkit-details-marker]:hidden', foco)}>Más detalles</summary>
          <div className="mt-1" dangerouslySetInnerHTML={{ __html: richT(resto.join('\n\n')) }} />
        </details>
      )}
    </>
  );
}

/** Lanzar un conjuro. El botón dice lo que tiras (+5 al ataque, CD 13 de DES o sus dados). Un truco se tira al momento;
    uno de nivel 1 o más pregunta con qué espacio (o con el uso del rasgo que lo da), lo gasta y tira ya subido de nivel.
    Los bonos de rasgos que aplican (Evocación Potenciada) se suman solos. */
export function LanzarConjuro({ s, c, d, compacto }: { s: any; c: any; d: ReturnType<typeof datosConjuro>; compacto?: boolean }) {
  const tirar = useDados();
  const [abierto, setAbierto] = useState(false);
  const nv = +s.nivel || 0, bonos = bonosPara(c, s), bono = d.dexpr ? bonos.reduce((t: number, b: any) => t + (+b.valor || 0), 0) : 0;
  const ataque = s.ataque && d.atk != null;
  const esp = nv && S.pj ? espaciosPara(c, nv) : [];
  const rasgo = s.recurso ? c.recursos?.find((r: any) => r.id === s.recurso) : null;
  // Conjuros que crean criaturas: se elige cuál al lanzarlo y aparece en Familiares y criaturas
  const tipoCr = CRIATURAS_DE_CONJURO[norm(s.nombre)];
  const opcionesCr = tipoCr ? (c.criaturasPuede || []).filter((x: any) => x.de === tipoCr) : [];
  const [cr, setCr] = useState('');
  const crElegida = opcionesCr.find((x: any) => x.key === cr) || opcionesCr[0];
  // Siervos Muertos Vivientes: Animar a los muertos cuenta como de un nivel más
  const nivelMas = tipoCr === 'muerto' && c.entries.some((e: any) => /^siervos muertos vivientes$/.test(norm(e.nombre))) ? 1 : 0;
  const cuantas = (nivel: number) => tipoCr === 'muerto' ? 1 + 2 * Math.max(0, nivel + nivelMas - 3) : 1;
  const sinEspacio = tipoCr === 'familiar' && c.chain ? 'Sin espacio (Pacto de la Cadena)' : s.ritual ? 'Como ritual (10 minutos más, sin espacio)' : '';
  if (!ataque && !s.salv && !d.dexpr && !nv) return null;
  const tirarCon = (nivel: number) => {
    const expr = dadosAlLanzar(d.dexpr, nv, nivel, s.desc, bono);
    const label = nv && nivel > nv ? `${s.nombre} (nivel ${nivel})` : s.nombre;
    if (ataque) tirar(`1d20${modStr(d.atk)}`, `${label}: ataque`, { ...(expr ? { dmg: expr, dmgLabel: label, dmgMods: dmgMods(nivel) } : {}), mods: d.atkDesg });
    else if (expr) tirar(expr, label, { mods: dmgMods(nivel) });
    else if (!crElegida) avisar(`Lanzaste ${label}.`);
    if (crElegida) agregarCriatura(crElegida.key, crElegida.n, cuantas(nivel));
  };
  const gratis = () => { setAbierto(false); tirarCon(nv); };
  const conEspacio = (nivel: number) => { if (gastarEspacio(nivel)) { setAbierto(false); tirarCon(nivel); } };
  const conRasgo = () => { if (rasgo && gastarRecurso(rasgo.id)) { setAbierto(false); tirarCon(nv); } };
  const lanzar = () => (nv && S.pj ? setAbierto(true) : tirarCon(nv));
  // De dónde sale el número fijo del daño: la característica (si el conjuro la suma) y los bonos de rasgos
  function dmgMods(nivel: number) {
    const expr = dadosAlLanzar(d.dexpr, nv, nivel, s.desc, bono);
    return expr ? desglose([[s.mod ? d.mSpell : 0, d.ab], ...bonos.map((b: any): [number, string] => [+b.valor || 0, b.nombre])]) : '';
  }
  const etiqueta = ataque ? `${sign(d.atk)} al ataque` : s.salv ? `CD ${d.cd ?? '?'} de ${s.salv}` : d.dexpr ? dadosAlLanzar(d.dexpr, nv, nv, '', bono) + (s.tipo ? ' ' + s.tipo : '') : '';
  const dano = (ataque || s.salv) && d.dexpr ? `${dadosAlLanzar(d.dexpr, nv, nv, '', bono)}${s.tipo ? ' ' + s.tipo : ''}` : '';
  const dialogo = nv > 0 && (
        <Dialogo abierto={abierto} onCerrar={() => setAbierto(false)} titulo={`Lanzar ${s.nombre}`} descripcion="¿Con qué lo lanzas? Se gasta al elegirlo." abajo>
          {opcionesCr.length > 0 && (
            <label className="mb-3 flex flex-col gap-1 font-bold">
              {tipoCr === 'familiar' ? 'Forma del familiar' : 'Criatura'}
              <select value={crElegida?.key || ''} onChange={e => setCr(e.target.value)} className={claseCampo}>
                {opcionesCr.map((x: any) => <option key={x.key} value={x.key}>{x.n}{x.cadena ? ' (Pacto de la Cadena)' : ''}</option>)}
              </select>
              {tipoCr === 'muerto' && <span className="text-sm font-normal text-muted">Creas 1 con un espacio de nivel {3 - nivelMas} y 2 más por cada nivel por encima{nivelMas ? ' (Siervos Muertos Vivientes lo cuenta como de un nivel más)' : ''}.</span>}
              {tipoCr === 'familiar' && <span className="text-sm font-normal text-muted">Si ya tenías un familiar, este lo reemplaza.</span>}
            </label>
          )}
          <ul className="m-0 grid list-none gap-2 p-0">
            {sinEspacio && <li><Boton className="w-full justify-between" onClick={gratis}><span>{sinEspacio}</span></Boton></li>}
            {rasgo && (
              <li><Boton className="w-full justify-between" disabled={(S.pj.used?.[rasgo.id] || 0) >= rasgo.max} onClick={conRasgo}>
                <span>Con {rasgo.nombre}</span><span className="text-sm">quedan {rasgo.max - Math.min(S.pj.used?.[rasgo.id] || 0, rasgo.max)}</span>
              </Boton></li>
            )}
            {esp.map((e: any) => (
              <li key={e.nivel}>
                <Boton className="w-full justify-between" disabled={!e.quedan} onClick={() => conEspacio(e.nivel)}>
                  <span>{e.nombre}</span><span className="text-sm">{e.quedan ? `quedan ${e.quedan}` : 'sin espacios'}{d.dexpr ? `, ${dadosAlLanzar(d.dexpr, nv, e.nivel, s.desc, bono)}` : ''}{tipoCr === 'muerto' ? `, crea ${cuantas(e.nivel)}` : ''}</span>
                </Boton>
              </li>
            ))}
            {!esp.length && !rasgo && !sinEspacio && <li className="text-sm text-muted">No tienes espacios de este nivel o más.</li>}
          </ul>
        </Dialogo>
      );
  // Ataque o salvación: el mismo botón grande de Ataques, a la derecha de la tarjeta
  // Siempre el mismo botón grande de Ataques, a la derecha de la tarjeta: el bono al ataque, la CD, los dados o "Lanzar"
  // Versión compacta (lista de conjuros preparados): solo el ícono de lanzar
  if (compacto) return (
    <>
      <button type="button" onClick={lanzar} aria-label={`Lanzar ${s.nombre}${etiqueta ? ', ' + etiqueta : ''}`} title={etiqueta || 'Lanzar'}
        className={cx('grid size-11 shrink-0 cursor-pointer place-items-center rounded text-secondary transition-colors hover:text-primary sm:size-8 print:hidden', foco)}>
        <Simbolo n="electric_bolt" className="text-body-lg" />
      </button>
      {dialogo}
    </>
  );
  const grande = ataque ? sign(d.atk) : s.salv ? `CD ${d.cd ?? '?'}` : d.dexpr ? dadosAlLanzar(d.dexpr, nv, nv, '', bono) : 'Lanzar';
  const debajo = ataque ? 'al ataque' : s.salv ? `salvación de ${s.salv}` : d.dexpr ? (s.tipo || 'Lanzar') : '';
  return (
    <div className="flex flex-col items-center justify-center text-center print:hidden">
      <button type="button" onClick={lanzar} aria-label={`Lanzar ${s.nombre}${etiqueta ? ', ' + etiqueta : ''}`}
        className={claseBotonGrande}>
        {grande}
      </button>
      {debajo && <small className="mt-0.5 text-xs text-muted" aria-hidden="true">{debajo}</small>}
      {dano && <small className="text-xs text-muted">Daño {dano}</small>}
      {bonos.length > 0 && d.dexpr && <small className="max-w-32 text-xs text-muted">Incluye {bonos.map((b: any) => `${b.nombre} (${sign(+b.valor || 0)})`).join(', ')}</small>}
      {dialogo}
    </div>
  );
}
/** Si el conjuro tiene botón para lanzarlo (va en su propia columna, a la derecha) */
const botonGrande = (s: any, d: ReturnType<typeof datosConjuro>) => (s.ataque && d.atk != null) || !!s.salv || !!d.dexpr || +s.nivel > 0;

/** Conjuro en la pestaña Conjuros: fila plegable. */
export function ConjuroFila({ s, c }: { s: any; c: any }) {
  const d = datosConjuro(s, c);
  return (
    <li className="py-1">
      <details className="group">
        <summary className={cx('flex min-h-12 cursor-pointer list-none items-baseline justify-between gap-3 rounded-lg py-2 [&::-webkit-details-marker]:hidden', foco)}>
          <span className="font-serif text-[1.05rem] font-bold"><span aria-hidden="true" className="mr-1 inline-block text-muted transition-transform group-open:rotate-90">▸</span>{s.nombre}</span>
          <span className="text-right text-sm text-muted">{d.bits.join(', ')}{s.coste ? `, ${s.coste}` : ''}</span>
        </summary>
        <div className="pb-2 pl-4 text-[0.96rem]">
          {d.meta && <p className="m-0 text-sm text-muted">{d.meta}</p>}
          <DescripcionCorta desc={s.desc} />
          {d.origen && <p className="mb-0 mt-1 text-sm">{d.origen}.</p>}
          {s.rasgo && <p className="m-0 text-xs text-muted">De {s.rasgo}</p>}
          <Golpes s={s} />
        </div>
      </details>
      <div className={cx('pb-2', botonGrande(s, d) && 'flex justify-end')}><LanzarConjuro s={s} c={c} d={d} /></div>
    </li>
  );
}

/** Conjuros que atacan con tu arma (Golpe certero): una fila de ataque por arma empuñada */
function Golpes({ s }: { s: any }) {
  if (!s.golpes) return null;
  if (!s.golpes.length) return <p className="mb-0 mt-1 text-sm text-muted">Empuña un arma en el paso Equipo para ver su ataque.</p>;
  return <ul className="m-0 list-none divide-y divide-soft p-0">{s.golpes.map((a: any, i: number) => <Ataque key={i} a={a} />)}</ul>;
}

/** Conjuro en tu turno: la misma tarjeta que los rasgos, con su tipo de acción, sus usos y el botón Lanzar. */
export function ConjuroTarjeta({ s, c, t }: { s: any; c: any; t: string }) {
  const d = datosConjuro(s, c), color = COLOR_TIPO[t] || COLOR_TIPO.pasiva;
  return (
    <article className={cx('my-2 rounded-lg border-l-4 bg-surface-container px-4 py-3 shadow-md break-inside-avoid', color.borde)}>
      <div className={cx(botonGrande(s, d) && 'grid grid-cols-[1fr_auto] gap-x-3')}>
        <div>
          <header className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
            <h3 className="m-0 font-serif text-lg font-bold leading-snug">{s.nombre}</h3>
            {s.coste && <span className={cx('text-sm font-bold', color.texto)}>{s.coste}</span>}
          </header>
          <p className="m-0 text-sm text-muted">{[d.bits.join(', '), d.meta].filter(Boolean).join('. ')}</p>
          <DescripcionCorta desc={s.desc} />
          {d.origen && <p className="mb-0 mt-1">{d.origen}.</p>}
          {CRIATURAS_DE_CONJURO[norm(s.nombre)] && <p className="mb-0 mt-1 text-sm text-muted">Agrega lo que crees en Familiares y criaturas, debajo de Acción adicional: ahí está su hoja.</p>}
        </div>
        <LanzarConjuro s={s} c={c} d={d} />
      </div>
      <Golpes s={s} />
      {s.recurso && S.view === 'ficha' && <RecursoInline id={s.recurso} />}
      <p className="m-0 mt-1 text-xs text-muted">{s.rasgo ? `Conjuro de ${s.rasgo}` : 'Conjuro'}</p>
    </article>
  );
}

/** Todos los recursos del personaje, con descansos. */
export function Recursos({ c }: { c: any }) {
  const u = S.pj.used || {};
  return (
    <section aria-labelledby="titulo-recursos" className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-rule/60 print:hidden">
      <h2 id="titulo-recursos" className="m-0 font-serif text-xl font-bold">Recursos</h2>
      <ul className="m-0 mt-1 list-none divide-y divide-soft p-0">
        {c.recursos.map((r: any) => {
          const used = Math.min(u[r.id] || 0, r.max), left = r.max - used;
          const nota = r.nota || (r.reset === 'corto' ? 'Vuelve con descanso corto' : 'Vuelve con descanso largo');
          return (
            <li key={r.id} className="flex flex-col items-start gap-1 py-2">
              <div>{r.nombre}<small className="block text-xs text-muted">{nota}</small></div>
              {r.tipo === 'pool'
                ? <Contador nombre={r.nombre} valor={left} max={r.max} onCambiar={d => moverPool(r.id, d)} onFijar={v => fijarPool(r.id, r.max, v)} />
                : <Puntos nombre={r.nombre} max={r.max} usados={used} onTocar={i => tocarPip(r.id, i, r.max)} />}
            </li>
          );
        })}
      </ul>
      <div className="mt-3 flex flex-wrap gap-2">
        <Boton onClick={() => descansar('corto')}>Descanso corto</Boton>
        <Boton onClick={() => descansar('largo')}>Descanso largo</Boton>
      </div>
    </section>
  );
}
