/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { S, render } from '@/app-shell/estado';
import { avisar } from '@/shared/ui/avisos';
import { norm, sign } from '@/shared/utils/texto';
import { AB, ALL_AB, COMPRA, ESTANDAR, SKILLS, TIPOS } from '@/features/reglas/data/caracteristicas';
import { ARMAS, ARMADURAS, MAESTRIAS } from '@/features/reglas/data/equipo';
import { periciaN } from '@/features/reglas/data/clases';
import { allDotes, getC } from '@/features/biblioteca/domain/biblioteca';
import { useDados } from '@/features/dados/components/Bandeja';
import { savePj, tirarPg } from '../../acciones';
import { AbSel, Casilla, CampoArea, CampoNumero, CampoTexto, Selector } from './campos';

/* ---------- Características ---------- */
export function PasoStats({ pj, c }: { pj: any; c: any }) {
  const tirar = useDados();
  const g = pj.gen;
  const tirarUna = () => {
    if (g.valores.length >= 6) return Promise.resolve();
    return tirar('4d6', `Característica ${g.valores.length + 1} de 6`, { keep: 3, neutral: true, noRepeat: true }).then(r => {
      g.valores.push(r.total); g.dados = g.dados || []; g.dados.push(r.groups[0].vals); savePj(); render();
    });
  };
  const metodo = (m: string) => {
    if (g.metodo !== m) {
      g.metodo = m; g.asig = {}; S.sel = null;
      if (m === 'estandar') { g.valores = [...ESTANDAR]; g.dados = []; }
      if (m === 'tirar') { g.valores = []; g.dados = []; }
    }
    savePj(); render();
  };
  const tocarSlot = (k: string) => {
    if (S.sel != null) { for (const x in g.asig) if (g.asig[x] === S.sel) delete g.asig[x]; g.asig[k] = S.sel; S.sel = null; }
    else if (g.asig[k] != null) delete g.asig[k];
    savePj(); render();
  };
  const comprar = (k: string, d: number) => { const v = g.compra[k] + d; if (v >= 8 && v <= 15) { g.compra[k] = v; savePj(); render(); } };
  const faltan = 6 - g.valores.length;
  const gasto = AB.reduce((s, [k]) => s + (COMPRA[g.compra[k]] || 0), 0);
  return (
    <>
      <h2 className="plain">Cómo generas las características</h2>
      <div className="seg">
        {[['tirar', 'Tirar dados'], ['estandar', 'Arreglo estándar'], ['compra', 'Compra de puntos'], ['manual', 'A mano']].map(([k, n]) => (
          <button key={k} className={`segb${g.metodo === k ? ' on' : ''}`} onClick={() => metodo(k)}>{n}</button>
        ))}
      </div>
      {g.metodo === 'tirar' && (
        <>
          <p className="note">Cada tirada es 4d6 y se descarta el dado más bajo.</p>
          <div className="row">
            {faltan > 0 && <>
              <button className="btn" onClick={tirarUna}>Tirar 4d6</button>
              <button className="btn ghost" onClick={async () => { while (pj.gen.valores.length < 6) await tirarUna(); }}>Tirar {faltan === 6 ? 'las seis' : `las ${faltan} que faltan`}</button>
            </>}
            {g.valores.length > 0 && <button className="btn ghost" onClick={() => { g.valores = []; g.dados = []; g.asig = {}; S.sel = null; savePj(); render(); }}>Volver a tirar todo</button>}
          </div>
        </>
      )}
      {(g.metodo === 'tirar' || g.metodo === 'estandar') && g.valores.length > 0 && (
        <>
          <p className="note">Toca un número y después la característica donde lo quieres.</p>
          <div className="chips">
            {g.valores.map((v: number, i: number) => {
              const k = Object.keys(g.asig).find(x => g.asig[x] === i);
              return (
                <button key={i} className={`chip${S.sel === i ? ' sel' : ''}${k ? ' used' : ''}`} onClick={() => { S.sel = S.sel === i ? null : i; render(); }}>
                  <b>{v}</b>{g.dados?.[i] && <small>{g.dados[i].join(' ')}</small>}{k && <small>en {AB.find(a => a[0] === k)![2]}</small>}
                </button>
              );
            })}
          </div>
          <div className="grid6">
            {AB.map(([k, , ab]) => (
              <button key={k} className={`slot${g.asig[k] != null ? ' full' : ''}${S.sel != null ? ' ready' : ''}`} onClick={() => tocarSlot(k)}>
                <span>{ab}</span><b>{g.asig[k] != null ? g.valores[g.asig[k]] : '—'}</b>
              </button>
            ))}
          </div>
        </>
      )}
      {g.metodo === 'compra' && (
        <>
          <p className="note">Te quedan <b>{27 - gasto}</b> de 27 puntos. Cada característica va de 8 a 15.</p>
          <div className="list">{AB.map(([k, , , nm]) => (
            <div className="li" key={k}><span>{nm}</span>
              <span className="pool"><button className="btn ghost small" onClick={() => comprar(k, -1)}>−</button><b>{g.compra[k]}</b><button className="btn ghost small" onClick={() => comprar(k, 1)}>+</button></span>
            </div>
          ))}</div>
        </>
      )}
      {g.metodo === 'manual' && (
        <div className="fix">{AB.map(([k, , ab]) => <label key={k}>{ab}<CampoNumero path={`gen.manual.${k}`} value={g.manual[k]} min={1} max={30} /></label>)}</div>
      )}
      <h2 className="plain">Resultado</h2>
      <div className="list">{AB.map(([k, , , nm]) => (
        <div className="li" key={k}><span>{nm}</span><span>{c.base[k]}{c.bono[k] ? ` + ${c.bono[k]}` : ''} = <b>{c.sc[k]}</b> ({sign(c.m[k])})</span></div>
      ))}</div>
      {c.asiLv.length > 0 && (
        <>
          <h2 className="plain">Mejoras por nivel</h2>
          {c.asiLv.map((L: number) => {
            const mj = pj.mejoras[L] || {};
            const ds = Object.entries(allDotes()).filter(([, d]) => (d.nivelMin || 1) <= c.lvl && !/estilo/.test(norm(d.cat || ''))).sort((x, y) => x[1].n.localeCompare(y[1].n));
            const D = mj.key && mj.key !== 'otra' ? allDotes()[mj.key] : null;
            return (
              <div className="mj" key={L}><b>Nivel {L}</b>
                <div className="form">
                  <Selector path={`mejoras.${L}.modo`} value={mj.modo}>
                    <option value="">Elige…</option><option value="una">+2 a una característica</option><option value="dos">+1 a dos características</option><option value="dote">Una dote</option>
                  </Selector>
                  {mj.modo === 'una' && <AbSel path={`mejoras.${L}.a`} value={mj.a} opts={ALL_AB} />}
                  {mj.modo === 'dos' && <div className="row"><AbSel path={`mejoras.${L}.a`} value={mj.a} opts={ALL_AB} /><AbSel path={`mejoras.${L}.b`} value={mj.b} opts={ALL_AB} /></div>}
                  {mj.modo === 'dote' && (
                    <>
                      <Selector path={`mejoras.${L}.key`} value={mj.key}>
                        <option value="">Elige la dote…</option>
                        {ds.map(([k, d]) => <option key={k} value={k}>{d.n}{d.cat ? ` (${d.cat})` : ''}</option>)}
                        <option value="otra">Otra (escribirla)</option>
                      </Selector>
                      {D && <p className="note">{typeof D.texto === 'function' ? D.texto(c) : D.texto}</p>}
                      {mj.key === 'otra' && <>
                        <CampoTexto path={`mejoras.${L}.nombre`} value={mj.nombre || ''} placeholder="Nombre de la dote" />
                        <Selector path={`mejoras.${L}.t`} value={mj.t || 'pasiva'}>{Object.entries(TIPOS).map(([k, [n]]) => <option key={k} value={k}>{n}</option>)}</Selector>
                        <CampoArea path={`mejoras.${L}.texto`} value={mj.texto || ''} placeholder="Qué hace" />
                      </>}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </>
      )}
      {c.C && (
        <>
          <h2 className="plain">Puntos de golpe</h2>
          <div className="form">
            <Selector path="pgModo" value={pj.pgModo}>
              <option value="promedio">Promedio del dado</option><option value="tiradas">Tirar el dado en cada nivel</option><option value="maximo">Máximo del dado en cada nivel</option>
            </Selector>
          </div>
          {pj.pgModo === 'tiradas' && (
            <>
              <div className="list">
                <div className="li"><span>Nivel 1</span><b>{c.C.dado} (máximo)</b></div>
                {Array.from({ length: c.lvl - 1 }, (_, i) => (
                  <div className="li" key={i}><span>Nivel {i + 2}</span>
                    <span className="pool">
                      <CampoNumero path={`pgTiradas.${i}`} value={pj.pgTiradas[i] ?? ''} min={1} max={c.C.dado} placeholder={String(c.C.dado / 2 + 1)} aria-label={`PG del nivel ${i + 2}`} />
                      <button className="btn small" onClick={() => tirarPg(tirar, i)}>{pj.pgTiradas[i] ? 'Otra vez' : `Tirar d${c.C.dado}`}</button>
                    </span>
                  </div>
                ))}
              </div>
              <p className="note">Escribe el resultado si tiras con dado físico. Vacío cuenta el promedio.</p>
            </>
          )}
          <p className="note">PG máximos: <b>{c.hpMax}</b>, sumando CON en cada nivel.</p>
        </>
      )}
    </>
  );
}

/* ---------- Habilidades ---------- */
function Checks({ field, list, sel, max, disabled = new Set(), nota = {} }: { field: string; list: string[]; sel: string[]; max: number; disabled?: Set<string>; nota?: Record<string, string> }) {
  const toggle = (v: string, el: HTMLInputElement) => {
    const pj = S.pj, arr = (pj[field] = pj[field] || []);
    if (arr.includes(v)) arr.splice(arr.indexOf(v), 1);
    else if (arr.length < max) arr.push(v);
    else { avisar(`Solo puedes elegir ${max}.`, 'aviso'); el.checked = false; return; }
    savePj(); render();
  };
  return (
    <div className="checks">
      {list.map(n => {
        const on = sel.includes(n), dis = disabled.has(n);
        return (
          <label key={n} className={`check${dis ? ' dim' : ''}`}>
            <input type="checkbox" checked={on || dis} disabled={dis} onChange={e => toggle(n, e.target)} />{n}{nota[n] && <> <span className="note">{nota[n]}</span></>}
          </label>
        );
      })}
    </div>
  );
}

export function PasoHabs({ pj, c }: { pj: any; c: any }) {
  const C = c.C; if (!C) return <p className="note" style={{ marginTop: 18 }}>Primero elige clase.</p>;
  const bg = new Set<string>(c.bgHabs);
  const lista: string[] = C.habs === 'todas' ? SKILLS.map(s => s[0]) : C.habs;
  const razones: string[] = [];
  if (pj.especie.key === 'humano') razones.push('1 por Hábil (humano)');
  if (pj.especie.key === 'elfo') razones.push('1 por Sentidos Agudos: Perspicacia, Percepción o Supervivencia');
  const nh = 3 * c.dotes.filter((d: any) => d.key === 'habil').length; if (nh) razones.push(`${nh} por la dote Hábil`);
  if (pj.clase === 'barbaro' && c.lvl >= 3) razones.push('1 por Conocimiento Primordial');
  const extraN = (pj.especie.key === 'humano' ? 1 : 0) + (pj.especie.key === 'elfo' ? 1 : 0) + nh + (pj.clase === 'barbaro' && c.lvl >= 3 ? 1 : 0);
  const pn = periciaN(pj.clase, c.lvl);
  return (
    <>
      <p style={{ marginTop: 18 }}>Del trasfondo: <b>{c.bgHabs.join(' y ') || '—'}</b>.</p>
      <h2 className="plain">Elige {C.habN} de {C.n.toLowerCase()}</h2>
      <Checks field="habClase" list={lista} sel={pj.habClase} max={C.habN} disabled={bg} />
      {(extraN > 0 || pj.habExtra.length > 0) && (
        <>
          <h2 className="plain">Habilidades extra</h2>
          <p className="note">{razones.join('; ') || 'Dadas por tu DM'}.</p>
          <Checks field="habExtra" list={SKILLS.map(s => s[0])} sel={pj.habExtra} max={Math.max(extraN, pj.habExtra.length)} disabled={new Set([...bg, ...pj.habClase])} />
        </>
      )}
      {pn > 0 && (
        <>
          <h2 className="plain">Pericia ({pn})</h2>
          <p className="note">Doble bonificador de competencia.</p>
          <Checks field="pericia" list={SKILLS.map(s => s[0]).filter(n => c.skillProf[norm(n)])} sel={pj.pericia} max={pn} />
        </>
      )}
    </>
  );
}

/* ---------- Equipo ---------- */
export function PasoEquipo({ pj, c }: { pj: any; c: any }) {
  const C = c.C;
  const cambiarQ = (i: number, d: number) => { const a = pj.armas[i]; a[1] += d; if (a[1] <= 0) pj.armas.splice(i, 1); savePj(); render(); };
  const agregar = () => {
    const k = (document.getElementById('addW') as HTMLSelectElement).value, ex = pj.armas.find((a: any) => a[0] === k);
    if (ex) ex[1]++; else pj.armas.push([k, 1]);
    savePj(); render(); avisar(`${ARMAS[k].n} agregada.`);
  };
  const inicial = () => {
    const eq = getC(pj, pj.clase).equipo;
    eq.armas.forEach(([k, q]: [string, number]) => { const ex = pj.armas.find((a: any) => a[0] === k); if (ex) ex[1] += q; else pj.armas.push([k, q]); });
    if (eq.armadura) pj.armadura = eq.armadura; if (eq.escudo) pj.escudo = true;
    pj.inicial = true; savePj(); render(); avisar('Equipo inicial agregado.');
  };
  const maestria = (k: string, el: HTMLInputElement) => {
    const arr = pj.maestrias, max = getC(pj, pj.clase)?.maestrias || 0;
    if (arr.includes(k)) arr.splice(arr.indexOf(k), 1);
    else if (arr.length < max) arr.push(k);
    else { avisar(`Solo puedes elegir ${max}.`, 'aviso'); el.checked = false; return; }
    savePj(); render();
  };
  const tiene = [...new Set<string>(pj.armas.map((a: any) => a[0]))];
  const resto = Object.keys(ARMAS).filter(k => !tiene.includes(k));
  const cb = (k: string) => (
    <label key={k} className="check"><input type="checkbox" checked={pj.maestrias.includes(k)} onChange={e => maestria(k, e.target)} />{ARMAS[k].n} <span className="note">{MAESTRIAS[ARMAS[k].ma][0]}</span></label>
  );
  return (
    <>
      <h2 className="plain">Armadura</h2>
      <div className="form">
        <Selector path="armadura" value={c.armorKey ? pj.armadura : 'ninguna'}>
          <option value="ninguna">Sin armadura</option>
          {Object.entries(ARMADURAS).map(([k, a]) => <option key={k} value={k}>{a.n} ({a.base}{a.max === 0 ? '' : a.max ? ' + DES máx. 2' : ' + DES'})</option>)}
        </Selector>
        <Casilla path="escudo" checked={pj.escudo}>Escudo (+2)</Casilla>
      </div>
      <p className="note">CA resultante: {c.ac}.{c.armor?.sigilo ? ' Desventaja en Sigilo.' : ''} Competencia: {C?.arm || '—'}.</p>
      <h2 className="plain">Armas</h2>
      <div className="list">
        {c.armas.length ? c.armas.map((a: any) => (
          <div className="li" key={a.i}><span>{a.nombre}</span>
            <span className="pool"><button className="btn ghost small" onClick={() => cambiarQ(a.i, -1)} aria-label="Quitar una">−</button><button className="btn ghost small" onClick={() => cambiarQ(a.i, 1)} aria-label="Agregar una">+</button></span>
          </div>
        )) : <div className="li"><span className="note">Todavía no hay armas.</span></div>}
      </div>
      <div className="row">
        <select id="addW">{Object.entries(ARMAS).map(([k, w]) => <option key={k} value={k}>{w.n} ({w.d} {w.tipo})</option>)}</select>
        <button className="btn" onClick={agregar}>Agregar</button>
      </div>
      {C?.equipo && !pj.inicial && <div className="row"><button className="btn ghost" onClick={inicial}>Equipo inicial: {C.equipo.txt}</button></div>}
      {C?.maestrias > 0 && (
        <>
          <h2 className="plain">Maestría con armas ({pj.maestrias.length} de {C.maestrias})</h2>
          {tiene.length > 0 && <div className="checks">{tiene.map(cb)}</div>}
          <details className="more"><summary>Otras armas</summary><div className="checks">{resto.map(cb)}</div></details>
        </>
      )}
      <h2 className="plain">Lo demás</h2>
      <div className="form">
        <label>Oro<CampoNumero path="oro" value={pj.oro || 0} /></label>
        <label>Inventario<CampoArea path="inventario" value={pj.inventario} rows={4} /></label>
      </div>
    </>
  );
}
