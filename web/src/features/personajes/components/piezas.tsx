/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { S } from '@/app-shell/estado';
import { esc, modStr, norm, richT, sign } from '@/shared/utils/texto';
import { Boton, Contador, Puntos, cx, foco } from '@/shared/ui/kit';
import { TIPOS } from '@/features/reglas/data/caracteristicas';
import { COLOR_TIPO, FormaTipo } from '@/features/reglas/components/TipoAccion';
import { BotonTirada, TextoConDados } from '@/features/dados/components/BotonTirada';
import { descansar, fijarPool, moverPool, moverRasgo, tocarPip } from '../acciones';

/** Compatibilidad: forma del tipo de acción. */
export const Shape = ({ t }: { t: string; className?: string }) => <FormaTipo t={t} />;

function Mover({ e }: { e: any }) {
  const k = norm(e.nombre);
  return (
    <details className="group/m text-sm print:hidden">
      <summary className={cx('inline-flex min-h-11 cursor-pointer list-none items-center rounded-lg px-2 text-muted hover:text-ink sm:min-h-8 [&::-webkit-details-marker]:hidden', foco)}>
        Cambiar dónde aparece
      </summary>
      <div role="group" aria-label={`¿Dónde se usa ${e.nombre}?`} className="mt-2 flex flex-wrap gap-1.5">
        {Object.entries(TIPOS).map(([t, [n]]) => (
          <button key={t} type="button" aria-pressed={e.t === t} onClick={() => moverRasgo(k, t)}
            className={cx('inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full px-3 text-sm font-bold sm:min-h-9', foco,
              e.t === t ? 'bg-ink text-bg' : 'bg-soft hover:bg-rule/70')}>
            <FormaTipo t={t} className="size-2.5" />{n}
          </button>
        ))}
        {e.t !== e.tAuto && <Boton tamano="sm" variante="fantasma" onClick={() => moverRasgo(k, '')}>Volver a como venía</Boton>}
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
    <article className={cx('my-2 rounded-2xl border-l-4 bg-surface px-4 py-3 shadow-sm ring-1 ring-rule/50 break-inside-avoid', color.borde)}>
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
        <h3 className="m-0 font-serif text-lg font-bold leading-snug">{e.nombre}</h3>
        {e.coste && <span className={cx('text-sm font-bold', color.texto)}>{e.coste}</span>}
      </header>
      <TextoConDados html={body} label={e.nombre} className="mb-0 mt-1" />
      {e.roll && (
        <p className="mb-0 mt-2">
          <BotonTirada expr={e.roll[0]} label={`${e.nombre}: ataque`} dmg={e.roll[1]} dmgLabel={`${e.nombre}: daño`}>Tirar ataque</BotonTirada>
        </p>
      )}
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
          <BotonTirada expr={a.expr} label={`${n}: daño`} min3={a.min3} ariaLabel={`Tirar daño de ${n}: ${a.dmg}`}>{a.dmg}</BotonTirada>
          {a.v && <><span className="text-sm text-muted">o</span><BotonTirada expr={a.v.expr} label={`${n}: daño a dos manos`} min3={a.min3}>{a.v.dmg} a dos manos</BotonTirada></>}
        </div>
      </div>
      <div className="row-span-2 flex flex-col items-center justify-center">
        <BotonTirada expr={`1d20${modStr(a.atk)}`} label={`${n}: ataque`} estilo="grande" dmg={a.expr} dmgLabel={`${n}: daño`} min3={a.min3}
          ariaLabel={`Tirar ataque con ${n}, ${sign(a.atk)}`}>{sign(a.atk)}</BotonTirada>
        <small className="mt-0.5 text-xs text-muted" aria-hidden="true">al ataque</small>
      </div>
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
function datosConjuro(s: any, c: any) {
  const nv = +s.nivel || 0, bits = [nv === 0 ? 'Truco' : `Nivel ${nv}`];
  let dados = s.dados || '';
  if (nv === 0 && dados && !s.noEscala && /^1d\d+$/.test(dados)) dados = dados.replace(/^1d/, (c.lvl >= 17 ? 4 : c.lvl >= 11 ? 3 : c.lvl >= 5 ? 2 : 1) + 'd');
  const mSpell = s.cd != null ? s.cd - 8 - c.pb : c.mSpell;
  const dexpr = dados ? dados + (s.mod && mSpell ? modStr(mSpell) : '') : '';
  if (s.conc) bits.push('Concentración'); if (s.ritual) bits.push('Ritual');
  const meta = [s.alcance && `Alcance: ${s.alcance}`, s.dur].filter(Boolean).join('. ');
  // Cómo se lanza, si lo da un rasgo
  const origen = s.rasgo ? [s.nota, s.abNota && `Usa ${s.abNota}`].filter(Boolean).join('. ') : '';
  return { bits, dexpr, meta, origen, atk: s.atk ?? c.atkSpell, cd: s.cd ?? c.dcSpell };
}

function BotonesConjuro({ s, d }: { s: any; d: ReturnType<typeof datosConjuro> }) {
  if (!((s.ataque && d.atk != null) || s.salv || d.dexpr)) return null;
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      {s.ataque && d.atk != null && <BotonTirada expr={`1d20${modStr(d.atk)}`} label={`${s.nombre}: ataque`} dmg={d.dexpr} dmgLabel={s.nombre}>{sign(d.atk)} al ataque</BotonTirada>}
      {s.salv && <span className="rounded-lg px-2 py-1 text-sm font-bold ring-1 ring-inset ring-rule">Salvación de {s.salv} CD {d.cd ?? '?'}</span>}
      {d.dexpr && <BotonTirada expr={d.dexpr} label={s.nombre}>{d.dexpr.replace(/([+-])/g, ' $1 ')}{s.tipo ? ' ' + s.tipo : ''}</BotonTirada>}
    </div>
  );
}

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
          <TextoConDados html={richT(s.desc || '')} label={s.nombre} className="mb-0 mt-1" />
          {d.origen && <p className="mb-0 mt-1 text-sm">{d.origen}.</p>}
          {s.rasgo && <p className="m-0 text-xs text-muted">De {s.rasgo}</p>}
        </div>
      </details>
      <div className="pb-2"><BotonesConjuro s={s} d={d} /></div>
    </li>
  );
}

/** Conjuro en tu turno: la misma tarjeta que los rasgos, con su tipo de acción, sus usos y sus tiradas. */
export function ConjuroTarjeta({ s, c, t }: { s: any; c: any; t: string }) {
  const d = datosConjuro(s, c), color = COLOR_TIPO[t] || COLOR_TIPO.pasiva;
  return (
    <article className={cx('my-2 rounded-2xl border-l-4 bg-surface px-4 py-3 shadow-sm ring-1 ring-rule/50 break-inside-avoid', color.borde)}>
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
        <h3 className="m-0 font-serif text-lg font-bold leading-snug">{s.nombre}</h3>
        {s.coste && <span className={cx('text-sm font-bold', color.texto)}>{s.coste}</span>}
      </header>
      <p className="m-0 text-sm text-muted">{[d.bits.join(', '), d.meta].filter(Boolean).join('. ')}</p>
      <TextoConDados html={richT(s.desc || '')} label={s.nombre} className="mb-0 mt-1" />
      {d.origen && <p className="mb-0 mt-1">{d.origen}.</p>}
      <BotonesConjuro s={s} d={d} />
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
            <li key={r.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2">
              <div className="min-w-44 flex-1">{r.nombre}<small className="block text-xs text-muted">{nota}</small></div>
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
