/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { S, render } from '@/app-shell/estado';
import { avisar } from '@/shared/ui/avisos';
import { norm, sign } from '@/shared/utils/texto';
import { Aviso, Boton, Campo, Casilla as CasillaKit, Fila, Lista, Nota, Plegable, Seccion, Segmentado, Tarjeta, claseCampo, cx, foco } from '@/shared/ui/kit';
import { AB, ALL_AB, COMPRA, ESTANDAR, SKILLS, TIPOS } from '@/features/reglas/data/caracteristicas';
import { ARMAS, ARMADURAS, MAESTRIAS } from '@/features/reglas/data/equipo';
import { periciaN } from '@/features/reglas/data/clases';
import { armadurasPermitidas, armasPermitidas, competenciaArmadura, esDoteMejora, habilidadesDeClase, maestriaPermitida } from '@/features/reglas/domain/restricciones';
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
  const nombreAb = (k: string) => AB.find(a => a[0] === k)![3];
  return (
    <>
      <Seccion titulo="Cómo generas las características">
        <Segmentado etiqueta="Método" valor={g.metodo} onCambiar={metodo}
          opciones={[['tirar', 'Tirar dados'], ['estandar', 'Arreglo estándar'], ['compra', 'Compra de puntos'], ['manual', 'A mano']]} />
        {g.metodo === 'tirar' && (
          <>
            <Nota>Cada tirada es 4d6 y se descarta el dado más bajo.</Nota>
            <div className="flex flex-wrap gap-2">
              {faltan > 0 && <>
                <Boton variante="primario" onClick={tirarUna}>Tirar 4d6</Boton>
                <Boton onClick={async () => { while (pj.gen.valores.length < 6) await tirarUna(); }}>Tirar {faltan === 6 ? 'las seis' : `las ${faltan} que faltan`}</Boton>
              </>}
              {g.valores.length > 0 && <Boton variante="fantasma" onClick={() => { g.valores = []; g.dados = []; g.asig = {}; S.sel = null; savePj(); render(); }}>Volver a tirar todo</Boton>}
            </div>
          </>
        )}
        {(g.metodo === 'tirar' || g.metodo === 'estandar') && g.valores.length > 0 && (
          <>
            <Nota className="mt-4">Toca un número y después la característica donde lo quieres.</Nota>
            <div role="group" aria-label="Valores para asignar" className="flex flex-wrap gap-2">
              {g.valores.map((v: number, i: number) => {
                const k = Object.keys(g.asig).find(x => g.asig[x] === i);
                return (
                  <button key={i} type="button" aria-pressed={S.sel === i} onClick={() => { S.sel = S.sel === i ? null : i; render(); }}
                    aria-label={`Valor ${v}${k ? `, asignado a ${nombreAb(k)}` : ''}${S.sel === i ? ', seleccionado' : ''}`}
                    className={cx('flex min-h-16 min-w-16 cursor-pointer flex-col items-center justify-center rounded-2xl px-2 ring-2', foco,
                      S.sel === i ? 'bg-rea text-bg ring-rea' : k ? 'bg-soft ring-rule border-dashed' : 'bg-surface ring-rule')}>
                    <b className="font-serif text-2xl leading-none">{v}</b>
                    {g.dados?.[i] && <small className="text-xs">{g.dados[i].join(' ')}</small>}
                    {k && <small className="text-xs">en {AB.find(a => a[0] === k)![2]}</small>}
                  </button>
                );
              })}
            </div>
            <div role="group" aria-label="Características" className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {AB.map(([k, , ab, nm]) => (
                <button key={k} type="button" onClick={() => tocarSlot(k)}
                  aria-label={`${nm}: ${g.asig[k] != null ? g.valores[g.asig[k]] : 'sin valor'}${S.sel != null ? '. Toca para asignar el valor elegido' : g.asig[k] != null ? '. Toca para quitarlo' : ''}`}
                  className={cx('min-h-20 cursor-pointer rounded-2xl bg-surface p-2 text-center', foco,
                    g.asig[k] != null ? 'ring-2 ring-ink' : 'border-2 border-dashed border-rule', S.sel != null && 'ring-2 ring-rea')}>
                  <span className="block text-sm text-muted">{ab}</span>
                  <b className="block font-serif text-3xl">{g.asig[k] != null ? g.valores[g.asig[k]] : '—'}</b>
                </button>
              ))}
            </div>
          </>
        )}
        {g.metodo === 'compra' && (
          <>
            <p aria-live="polite" className="my-3">Te quedan <b>{27 - gasto}</b> de 27 puntos. Cada característica va de 8 a 15.</p>
            <Lista>{AB.map(([k, , , nm]) => (
              <Fila key={k}><span>{nm}</span>
                <span className="flex items-center gap-2">
                  <Boton tamano="sm" onClick={() => comprar(k, -1)} disabled={g.compra[k] <= 8} aria-label={`Bajar ${nm}`}>−</Boton>
                  <b className="w-8 text-center font-serif text-xl" aria-live="polite">{g.compra[k]}</b>
                  <Boton tamano="sm" onClick={() => comprar(k, 1)} disabled={g.compra[k] >= 15} aria-label={`Subir ${nm}`}>+</Boton>
                </span>
              </Fila>
            ))}</Lista>
          </>
        )}
        {g.metodo === 'manual' && (
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {AB.map(([k, , ab]) => <Campo key={k} etiqueta={ab}><CampoNumero path={`gen.manual.${k}`} value={g.manual[k]} min={1} max={30} /></Campo>)}
          </div>
        )}
      </Seccion>
      <Seccion titulo="Resultado">
        <Lista>{AB.map(([k, , , nm]) => (
          <Fila key={k}><span>{nm}</span><span>{c.base[k]}{c.bono[k] ? ` + ${c.bono[k]}` : ''} = <b className="font-serif text-lg">{c.sc[k]}</b> ({sign(c.m[k])})</span></Fila>
        ))}</Lista>
      </Seccion>
      {c.asiLv.length > 0 && (
        <Seccion titulo="Mejoras por nivel" descripcion="+2 a una característica, +1 a dos, o una dote.">
          <div className="flex flex-col gap-3">
            {c.asiLv.map((L: number) => {
              const mj = pj.mejoras[L] || {};
              const ds = Object.entries(allDotes()).filter(([k, d]) => esDoteMejora(k, d, c.lvl) || k === mj.key).sort((x, y) => x[1].n.localeCompare(y[1].n));
              const D = mj.key && mj.key !== 'otra' ? allDotes()[mj.key] : null;
              return (
                <Tarjeta key={L} as="section" aria-label={`Mejora de nivel ${L}`}>
                  <h3 className="m-0 font-serif text-lg font-bold">Nivel {L}</h3>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <Selector path={`mejoras.${L}.modo`} value={mj.modo} aria-label={`Qué eliges en nivel ${L}`}>
                      <option value="">Elige…</option><option value="una">+2 a una característica</option><option value="dos">+1 a dos características</option><option value="dote">Una dote</option>
                    </Selector>
                    {mj.modo === 'una' && <AbSel path={`mejoras.${L}.a`} value={mj.a} opts={ALL_AB} aria-label="Característica que sube 2" />}
                    {mj.modo === 'dos' && <div className="grid grid-cols-2 gap-2"><AbSel path={`mejoras.${L}.a`} value={mj.a} opts={ALL_AB} aria-label="Primera característica" /><AbSel path={`mejoras.${L}.b`} value={mj.b} opts={ALL_AB} aria-label="Segunda característica" /></div>}
                    {mj.modo === 'dote' && (
                      <Selector path={`mejoras.${L}.key`} value={mj.key} aria-label="Dote">
                        <option value="">Elige la dote…</option>
                        {ds.map(([k, d]) => <option key={k} value={k}>{d.n}{d.cat ? ` (${d.cat})` : ''}</option>)}
                        <option value="otra">Otra (escribirla)</option>
                      </Selector>
                    )}
                  </div>
                  {D && <Nota>{typeof D.texto === 'function' ? D.texto(c) : D.texto}</Nota>}
                  {mj.modo === 'dote' && mj.key === 'otra' && (
                    <div className="mt-2 grid gap-2">
                      <Campo etiqueta="Nombre de la dote"><CampoTexto path={`mejoras.${L}.nombre`} value={mj.nombre || ''} /></Campo>
                      <Campo etiqueta="Se usa como"><Selector path={`mejoras.${L}.t`} value={mj.t || 'pasiva'}>{Object.entries(TIPOS).map(([k, [n]]) => <option key={k} value={k}>{n}</option>)}</Selector></Campo>
                      <Campo etiqueta="Qué hace"><CampoArea path={`mejoras.${L}.texto`} value={mj.texto || ''} /></Campo>
                    </div>
                  )}
                </Tarjeta>
              );
            })}
          </div>
        </Seccion>
      )}
      {c.C && (
        <Seccion titulo="Puntos de golpe" descripcion={`Dado de golpe d${c.C.dado}; se suma CON en cada nivel.`}>
          <Campo etiqueta="Cómo calcularlos" className="max-w-sm">
            <Selector path="pgModo" value={pj.pgModo}>
              <option value="promedio">Promedio del dado</option><option value="tiradas">Tirar el dado en cada nivel</option><option value="maximo">Máximo del dado en cada nivel</option>
            </Selector>
          </Campo>
          {pj.pgModo === 'tiradas' && (
            <>
              <Lista className="mt-3">
                <Fila><span>Nivel 1</span><b>{c.C.dado} (máximo)</b></Fila>
                {Array.from({ length: c.lvl - 1 }, (_, i) => (
                  <Fila key={i}><span>Nivel {i + 2}</span>
                    <span className="flex items-center gap-2">
                      <CampoNumero path={`pgTiradas.${i}`} value={pj.pgTiradas[i] ?? ''} min={1} max={c.C.dado} placeholder={String(c.C.dado / 2 + 1)} className="w-20!" aria-label={`PG del nivel ${i + 2}`} />
                      <Boton tamano="sm" onClick={() => tirarPg(tirar, i)}>{pj.pgTiradas[i] ? 'Otra vez' : `Tirar d${c.C.dado}`}</Boton>
                    </span>
                  </Fila>
                ))}
              </Lista>
              <Nota>Escribe el resultado si tiras con dado físico. Vacío cuenta el promedio.</Nota>
            </>
          )}
          <p className="mb-0 mt-3">PG máximos: <b className="font-serif text-xl">{c.hpMax}</b></p>
        </Seccion>
      )}
    </>
  );
}

/* ---------- Habilidades ---------- */
function Checks({ field, list, sel, max, disabled = new Set(), etiqueta }: { field: string; list: string[]; sel: string[]; max: number; disabled?: Set<string>; etiqueta: string }) {
  const toggle = (v: string, el: HTMLInputElement) => {
    const pj = S.pj, arr = (pj[field] = pj[field] || []);
    if (arr.includes(v)) arr.splice(arr.indexOf(v), 1);
    else if (arr.length < max) arr.push(v);
    else { avisar(`Solo puedes elegir ${max}.`, 'aviso'); el.checked = false; return; }
    savePj(); render();
  };
  const elegidas = sel.filter(s => list.includes(s)).length;
  return (
    <fieldset className="m-0 border-0 p-0">
      <legend className="sr-only">{etiqueta}</legend>
      <p aria-live="polite" className="m-0 text-sm text-muted">{elegidas} de {max} elegidas</p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-x-3">
        {list.map(n => (
          <CasillaKit key={n} checked={sel.includes(n) || disabled.has(n)} disabled={disabled.has(n)} onChange={(_, el) => toggle(n, el)}
            nota={disabled.has(n) ? '(ya la tienes)' : undefined}>{n}</CasillaKit>
        ))}
      </div>
    </fieldset>
  );
}

export function PasoHabs({ pj, c }: { pj: any; c: any }) {
  const C = c.C;
  if (!C) return <Aviso tipo="info" titulo="Primero elige clase">Las habilidades dependen de tu clase.</Aviso>;
  const bg = new Set<string>(c.bgHabs);
  const lista = habilidadesDeClase(C);
  const razones: string[] = [];
  if (pj.especie.key === 'humano') razones.push('1 por Hábil (humano)');
  if (pj.especie.key === 'elfo') razones.push('1 por Sentidos Agudos: Perspicacia, Percepción o Supervivencia');
  const nh = 3 * c.dotes.filter((d: any) => d.key === 'habil').length; if (nh) razones.push(`${nh} por la dote Hábil`);
  if (pj.clase === 'barbaro' && c.lvl >= 3) razones.push('1 por Conocimiento Primordial');
  const extraN = (pj.especie.key === 'humano' ? 1 : 0) + (pj.especie.key === 'elfo' ? 1 : 0) + nh + (pj.clase === 'barbaro' && c.lvl >= 3 ? 1 : 0);
  const pn = periciaN(pj.clase, c.lvl);
  return (
    <>
      <p className="mt-2">Del trasfondo ya tienes: <b>{c.bgHabs.join(' y ') || '—'}</b>.</p>
      <Seccion titulo={`Elige ${C.habN} de ${C.n.toLowerCase()}`} descripcion="Solo aparecen las habilidades de la lista de tu clase.">
        <Checks field="habClase" list={lista} sel={pj.habClase} max={C.habN} disabled={bg} etiqueta={`Habilidades de ${C.n}`} />
      </Seccion>
      {(extraN > 0 || pj.habExtra.length > 0) && (
        <Seccion titulo="Habilidades extra" descripcion={`${razones.join('; ') || 'Dadas por tu DM'}.`}>
          <Checks field="habExtra" list={SKILLS.map(s => s[0])} sel={pj.habExtra} max={Math.max(extraN, pj.habExtra.length)} disabled={new Set([...bg, ...pj.habClase])} etiqueta="Habilidades extra" />
        </Seccion>
      )}
      {pn > 0 && (
        <Seccion titulo={`Pericia (${pn})`} descripcion="Doble bonificador de competencia. Solo entre las habilidades en que eres competente.">
          <Checks field="pericia" list={SKILLS.map(s => s[0]).filter(n => c.skillProf[norm(n)])} sel={pj.pericia} max={pn} etiqueta="Pericia" />
        </Seccion>
      )}
    </>
  );
}

/* ---------- Equipo ---------- */
export function PasoEquipo({ pj, c }: { pj: any; c: any }) {
  const C = c.C;
  const cambiarQ = (i: number, d: number) => { const a = pj.armas[i]; a[1] += d; if (a[1] <= 0) pj.armas.splice(i, 1); savePj(); render(); };
  const agregar = () => {
    const k = (document.getElementById('addW') as HTMLSelectElement).value; if (!k) return;
    const ex = pj.armas.find((a: any) => a[0] === k);
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
  const compArm = competenciaArmadura(C);
  const armaduras = armadurasPermitidas(C);
  const armaduraFuera = c.armorKey && !armaduras.includes(c.armorKey);
  const armasOk = armasPermitidas(C);
  const tiene = [...new Set<string>(pj.armas.map((a: any) => a[0]))];
  const conMaestria = Object.keys(ARMAS).filter(k => maestriaPermitida(C, pj.clase, k));
  const maestriaTiene = [...new Set([...tiene.filter(k => conMaestria.includes(k)), ...pj.maestrias])];
  const maestriaResto = conMaestria.filter(k => !maestriaTiene.includes(k));
  const cb = (k: string) => (
    <CasillaKit key={k} checked={pj.maestrias.includes(k)} onChange={(_, el) => maestria(k, el)} nota={MAESTRIAS[ARMAS[k].ma]?.[0]}>{ARMAS[k].n}</CasillaKit>
  );
  return (
    <>
      <Seccion titulo="Armadura" descripcion={`Tu clase: ${C?.arm || '—'}.`}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Campo etiqueta="Armadura puesta">
            <Selector path="armadura" value={c.armorKey ? pj.armadura : 'ninguna'}>
              <option value="ninguna">Sin armadura</option>
              {[...armaduras, ...(armaduraFuera ? [c.armorKey] : [])].map(k => { const a = ARMADURAS[k]; return (
                <option key={k} value={k}>{a.n} ({a.base}{a.max === 0 ? '' : a.max ? ' + DES máx. 2' : ' + DES'}){armaduras.includes(k) ? '' : ' — sin competencia'}</option>
              ); })}
            </Selector>
          </Campo>
          {(compArm.escudo || pj.escudo) && <div className="self-end"><Casilla path="escudo" checked={pj.escudo}>Escudo (+2 CA){!compArm.escudo ? ' — sin competencia' : ''}</Casilla></div>}
        </div>
        <p className="mb-0 mt-3">CA resultante: <b className="font-serif text-xl">{c.ac}</b>{c.armor?.sigilo ? '. Desventaja en Sigilo.' : '.'}</p>
      </Seccion>
      <Seccion titulo="Armas" descripcion={`Tu clase: ${C?.armas || '—'}. Solo aparecen las armas con las que eres competente.`}>
        <Lista etiqueta="Tus armas">
          {c.armas.length ? c.armas.map((a: any) => (
            <Fila key={a.i}><span>{a.nombre}{a.notas.includes('Sin competencia') && <span className="ml-2 text-sm text-warn">sin competencia</span>}</span>
              <span className="flex gap-2">
                <Boton tamano="sm" onClick={() => cambiarQ(a.i, -1)} aria-label={`Quitar una ${a.w.n}`}>−</Boton>
                <Boton tamano="sm" onClick={() => cambiarQ(a.i, 1)} aria-label={`Agregar una ${a.w.n}`}>+</Boton>
              </span>
            </Fila>
          )) : <Fila><span className="text-sm text-muted">Todavía no hay armas.</span></Fila>}
        </Lista>
        <div className="mt-3 flex flex-wrap items-end gap-2">
          <label className="flex min-w-60 flex-1 flex-col gap-1.5 font-bold" htmlFor="addW">Agregar arma
            <select id="addW" className={cx(claseCampo, 'cursor-pointer')}>
              {armasOk.map(k => { const w = ARMAS[k]; return <option key={k} value={k}>{w.n} ({w.d} {w.tipo})</option>; })}
            </select>
          </label>
          <Boton variante="primario" onClick={agregar}>Agregar</Boton>
        </div>
        {C?.equipo && !pj.inicial && <Boton className="mt-3" onClick={inicial}>Agregar equipo inicial: {C.equipo.txt}</Boton>}
      </Seccion>
      {C?.maestrias > 0 && (
        <Seccion titulo={`Maestría con armas (${pj.maestrias.length} de ${C.maestrias})`} descripcion={pj.clase === 'barbaro' ? 'Solo armas cuerpo a cuerpo con las que eres competente.' : 'Solo armas con las que eres competente.'}>
          {maestriaTiene.length > 0 && <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-x-3">{maestriaTiene.map(cb)}</div>}
          {maestriaResto.length > 0 && <Plegable titulo="Otras armas">{<div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-x-3">{maestriaResto.map(cb)}</div>}</Plegable>}
        </Seccion>
      )}
      <Seccion titulo="Lo demás">
        <div className="grid gap-3">
          <Campo etiqueta="Oro (po)" className="max-w-40"><CampoNumero path="oro" value={pj.oro || 0} min={0} /></Campo>
          <Campo etiqueta="Inventario"><CampoArea path="inventario" value={pj.inventario} rows={4} /></Campo>
        </div>
      </Seccion>
    </>
  );
}
