/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { S } from '@/app-shell/estado';
import { esc, modStr, norm, richT, sign } from '@/shared/utils/texto';
import { TIPOS } from '@/features/reglas/data/caracteristicas';
import { BotonTirada, TextoConDados } from '@/features/dados/components/BotonTirada';
import { descansar, fijarPool, moverPool, moverRasgo, tocarPip } from '../acciones';

export const Shape = ({ t, className = '' }: { t: string; className?: string }) => <span className={`shape s-${t} ${className}`} aria-hidden="true" />;

function Mover({ e }: { e: any }) {
  const k = norm(e.nombre);
  return (
    <details className="mover"><summary>Mover</summary>
      <div className="mover-o"><span className="note">¿Dónde se usa?</span>
        {Object.entries(TIPOS).map(([t, [n]]) => (
          <button key={t} className={`cond${e.t === t ? ' on' : ''}`} onClick={() => moverRasgo(k, t)}><Shape t={t} /> {n}</button>
        ))}
        {e.t !== e.tAuto && <button className="cond" onClick={() => moverRasgo(k, '')}>Volver a como venía</button>}
      </div>
    </details>
  );
}

function Pips({ r, left, sm }: { r: any; left: number; sm?: boolean }) {
  return (
    <div className="pips">
      {Array.from({ length: r.max }, (_, i) => (
        <button key={i} className={`pip${sm ? ' sm' : ''}${i >= left ? ' used' : ''}`} onClick={() => tocarPip(r.id, i, r.max)} aria-label={`${r.nombre} ${i + 1}`} />
      ))}
    </div>
  );
}

function RecursoInline({ id }: { id: string }) {
  const r = S.c?.recursos.find((x: any) => x.id === id); if (!r || !S.pj) return null;
  const used = Math.min(S.pj.used?.[r.id] || 0, r.max), left = r.max - used;
  if (r.tipo === 'pool') return (
    <div className="res-in"><span className="note">Quedan</span>
      <button className="btn ghost small" onClick={() => moverPool(r.id, -1)} aria-label="Gastar 1">−</button><b>{left}</b><span className="note">/ {r.max}</span>
      <button className="btn ghost small" onClick={() => moverPool(r.id, 1)} aria-label="Recuperar 1">+</button>
    </div>
  );
  return <div className="res-in"><span className="note">{left} de {r.max}</span><Pips r={r} left={left} sm /></div>;
}

/** Un rasgo, acción o dote en la hoja. */
export function Entrada({ e }: { e: any }) {
  const body = e.raw ? richT(e.texto) : esc(e.texto);
  return (
    <article className={`ent t-${e.t}`}>
      <header><h3>{e.nombre}</h3>{e.coste && <span className="cost">{e.coste}</span>}</header>
      <TextoConDados html={body} label={e.nombre} />
      {e.roll && <p><BotonTirada expr={e.roll[0]} label={`${e.nombre}: ataque`} dmg={e.roll[1]} dmgLabel={`${e.nombre}: daño`}>Tirar ataque</BotonTirada></p>}
      {e.recurso && S.view === 'ficha' && <RecursoInline id={e.recurso} />}
      <div className="ent-pie">
        <p className="src">{e.src || ''}{e.revisada && <> <span className="rev">Regla revisada</span></>}</p>
        {S.view === 'ficha' && e.grupo && e.grupo !== 'reglas' && <Mover e={e} />}
      </div>
    </article>
  );
}

export function Ataque({ a }: { a: any }) {
  const n = a.w ? a.w.n : a.nombre;
  return (
    <div className="atk">
      <div className="atk-n">{a.nombre}</div>
      <div className="atk-h">
        <BotonTirada expr={`1d20${modStr(a.atk)}`} label={`${n}: ataque`} className="big" dmg={a.expr} dmgLabel={`${n}: daño`} min3={a.min3}>{sign(a.atk)}</BotonTirada>
        <small>al ataque</small>
      </div>
      <div className="atk-d">
        <BotonTirada expr={a.expr} label={`${n}: daño`} min3={a.min3}>{a.dmg}</BotonTirada>
        {a.v && <> <span className="note">o</span> <BotonTirada expr={a.v.expr} label={`${n}: daño a dos manos`} min3={a.min3}>{a.v.dmg} a dos manos</BotonTirada></>}
      </div>
      {(a.notas.length > 0 || a.maestria) && (
        <div className="atk-x">
          {a.notas.join('. ')}{a.notas.length ? '.' : ''}
          {a.maestria && <>{a.notas.length ? <br /> : null}Maestría {a.maestria}</>}
        </div>
      )}
    </div>
  );
}

export function ConjuroFila({ s, c }: { s: any; c: any }) {
  const nv = +s.nivel || 0, bits = [nv === 0 ? 'Truco' : `Nivel ${nv}`];
  let dados = s.dados || '';
  if (nv === 0 && dados && !s.noEscala && /^1d\d+$/.test(dados)) dados = dados.replace(/^1d/, (c.lvl >= 17 ? 4 : c.lvl >= 11 ? 3 : c.lvl >= 5 ? 2 : 1) + 'd');
  const dexpr = dados ? dados + (s.mod && c.mSpell ? modStr(c.mSpell) : '') : '';
  if (s.conc) bits.push('Concentración'); if (s.ritual) bits.push('Ritual');
  const meta = [s.alcance && `Alcance: ${s.alcance}`, s.dur].filter(Boolean).join('. ');
  const hayBotones = (s.ataque && c.atkSpell != null) || s.salv || dexpr;
  return (
    <div className="sp">
      <details><summary><span className="sp-n">{s.nombre}</span><span className="sp-k">{bits.join(', ')}</span></summary>
        <div className="sp-body">{meta && <p className="note">{meta}</p>}<TextoConDados html={richT(s.desc || '')} label={s.nombre} /></div>
      </details>
      {hayBotones && (
        <div className="sp-btns">
          {s.ataque && c.atkSpell != null && <BotonTirada expr={`1d20${modStr(c.atkSpell)}`} label={`${s.nombre}: ataque`} dmg={dexpr} dmgLabel={s.nombre}>{sign(c.atkSpell)} al ataque</BotonTirada>}
          {s.salv && <span className="tag">Salvación de {s.salv} CD {c.dcSpell ?? '?'}</span>}
          {dexpr && <BotonTirada expr={dexpr} label={s.nombre}>{dexpr.replace(/([+-])/g, ' $1 ')}{s.tipo ? ' ' + s.tipo : ''}</BotonTirada>}
        </div>
      )}
    </div>
  );
}

export function Recursos({ c }: { c: any }) {
  const u = S.pj.used || {};
  return (
    <section className="res" id="res"><h2>Recursos</h2>
      {c.recursos.map((r: any) => {
        const used = Math.min(u[r.id] || 0, r.max), left = r.max - used;
        const nota = r.nota || (r.reset === 'corto' ? 'Se recupera con descanso corto' : 'Se recupera con descanso largo');
        return (
          <div className="res-row" key={r.id}>
            <div className="res-n">{r.nombre}<small>{nota}</small></div>
            {r.tipo === 'pool' ? (
              <div className="pool">
                <button className="btn ghost small" onClick={() => moverPool(r.id, -1)} aria-label="Restar 1">−</button>
                <input key={left} type="number" inputMode="numeric" min={0} max={r.max} defaultValue={left} aria-label={r.nombre}
                  onBlur={ev => { if (+ev.target.value !== left) fijarPool(r.id, r.max, ev.target.value); }}
                  onKeyDown={ev => { if (ev.key === 'Enter') (ev.target as HTMLInputElement).blur(); }} />
                <span className="of">/ {r.max}</span>
                <button className="btn ghost small" onClick={() => moverPool(r.id, 1)} aria-label="Sumar 1">+</button>
              </div>
            ) : <Pips r={r} left={left} />}
          </div>
        );
      })}
      <div className="rests">
        <button className="btn ghost" onClick={() => descansar('corto')}>Descanso corto</button>
        <button className="btn ghost" onClick={() => descansar('largo')}>Descanso largo</button>
      </div>
    </section>
  );
}
