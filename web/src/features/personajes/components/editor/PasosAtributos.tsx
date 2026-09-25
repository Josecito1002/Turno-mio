/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { S, render } from '@/app-shell/estado';
import { avisar } from '@/shared/ui/avisos';
import { norm, sign } from '@/shared/utils/texto';
import { Aviso, Boton, Campo, Casilla as CasillaKit, Fila, Lista, Nota, Plegable, Seccion, Segmentado, Tarjeta, claseCampo, cx, foco } from '@/shared/ui/kit';
import { AB, ALL_AB, COMPRA, ESTANDAR, SKILLS, TIPOS, abInfo } from '@/features/reglas/data/caracteristicas';
import { ARMAS, ARMADURAS, MAESTRIAS } from '@/features/reglas/data/equipo';
import { periciaN } from '@/features/reglas/data/clases';
import { kitClase, type VarianteKit } from '@/features/reglas/data/equipo-clases';
import { esDoteMejora, habilidadesDeClase } from '@/features/reglas/domain/restricciones';
import { competenteArma, textoArmaduras, textoArmas } from '@/features/reglas/domain/competencias';
import { mejoraDeDote } from '@/features/reglas/domain/mejora-dote';
import { allDotes } from '@/features/biblioteca/domain/biblioteca';
import { useDados } from '@/features/dados/components/Bandeja';
import { quitarEquipoClase, savePj, tirarPg, tomarEquipoClase } from '../../acciones';
import { AbSel, CampoArea, CampoNumero, CampoTexto, Selector } from './campos';
import { EquipoTrasfondo } from './PasosOrigen';
import { ElegirElecciones } from './InfoSubclase';
import { ElegirManos } from '../Manos';

/* ---------- Características ---------- */
/* Las acciones cambian el personaje fuera del componente: el componente solo lee y las llama */
const guardar = () => { savePj(); render(); };
function anotarTirada(g: any, r: any) { g.valores.push(r.total); g.dados = g.dados || []; g.dados.push(r.groups[0].vals); guardar(); }
function cambiarMetodo(g: any, m: string) {
  if (g.metodo !== m) {
    g.metodo = m; g.asig = {}; S.sel = null;
    if (m === 'estandar') { g.valores = [...ESTANDAR]; g.dados = []; }
    if (m === 'tirar') { g.valores = []; g.dados = []; }
  }
  guardar();
}
function tocarSlot(g: any, k: string) {
  if (S.sel != null) { for (const x in g.asig) if (g.asig[x] === S.sel) delete g.asig[x]; g.asig[k] = S.sel; S.sel = null; }
  else if (g.asig[k] != null) delete g.asig[k];
  guardar();
}
function comprar(g: any, k: string, d: number) { const v = g.compra[k] + d; if (v >= 8 && v <= 15) { g.compra[k] = v; guardar(); } }
function reiniciarTiradas(g: any) { g.valores = []; g.dados = []; g.asig = {}; S.sel = null; guardar(); }
function elegirValor(i: number) { S.sel = S.sel === i ? null : i; render(); }

export function PasoStats({ pj, c }: { pj: any; c: any }) {
  const tirar = useDados();
  const g = pj.gen;
  const tirarUna = () => {
    if (g.valores.length >= 6) return Promise.resolve();
    return tirar('4d6', `Característica ${g.valores.length + 1} de 6`, { keep: 3, neutral: true, noRepeat: true }).then(r => anotarTirada(g, r));
  };
  const metodo = (m: string) => cambiarMetodo(g, m);
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
              {g.valores.length > 0 && <Boton variante="fantasma" onClick={() => reiniciarTiradas(g)}>Volver a tirar todo</Boton>}
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
                  <button key={i} type="button" aria-pressed={S.sel === i} onClick={() => elegirValor(i)}
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
                <button key={k} type="button" onClick={() => tocarSlot(g, k)}
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
                  <Boton tamano="sm" onClick={() => comprar(g, k, -1)} disabled={g.compra[k] <= 8} aria-label={`Bajar ${nm}`}>−</Boton>
                  <b className="w-8 text-center font-serif text-xl" aria-live="polite">{g.compra[k]}</b>
                  <Boton tamano="sm" onClick={() => comprar(g, k, 1)} disabled={g.compra[k] >= 15} aria-label={`Subir ${nm}`}>+</Boton>
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
            {c.asiLv.map((L: number) => <MejoraNivel key={L} pj={pj} c={c} L={L} />)}
          </div>
        </Seccion>
      )}
      {(c.elecciones || []).some((e: any) => e.grupo === 'dote') && (
        <Seccion titulo="Lo que eliges en tus dotes">
          <ElegirElecciones pj={pj} elecciones={c.elecciones.filter((e: any) => e.grupo === 'dote')} />
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

/** Mejora de un nivel: +2 a una característica, +1 a dos, o una dote. También se usa al subir de nivel. */
export function MejoraNivel({ pj, c, L, sinTitulo }: { pj: any; c: any; L: number; sinTitulo?: boolean }) {
  const mj = pj.mejoras[L] || {};
  const ds = Object.entries(allDotes()).filter(([k, d]) => esDoteMejora(k, d, c.lvl) || k === mj.key).sort((x, y) => x[1].n.localeCompare(y[1].n));
  const D = mj.key && mj.key !== 'otra' ? allDotes()[mj.key] : null;
  const md = mejoraDeDote(D);
  const cuerpo = (
    <>
      {!sinTitulo && <h3 className="m-0 font-serif text-lg font-bold">Nivel {L}</h3>}
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
      {md && (md.opciones.length > 1
        ? <div className="mt-2 max-w-xs"><AbSel path={`mejoras.${L}.sube`} value={md.opciones.includes(mj.sube) ? mj.sube : ''} opts={md.opciones} vacia="Elige la característica…" aria-label={`Característica que sube 1 con ${D.n}`} /></div>
        : <Nota>Suma +1 a {abInfo(md.opciones[0])[3]} (ya aplicado).</Nota>)}
      {D && <Nota>{typeof D.texto === 'function' ? D.texto(c) : D.texto}</Nota>}
      {mj.modo === 'dote' && mj.key === 'otra' && (
        <div className="mt-2 grid gap-2">
          <Campo etiqueta="Nombre de la dote"><CampoTexto path={`mejoras.${L}.nombre`} value={mj.nombre || ''} /></Campo>
          <Campo etiqueta="Se usa como"><Selector path={`mejoras.${L}.t`} value={mj.t || 'pasiva'}>{Object.entries(TIPOS).map(([k, [n]]) => <option key={k} value={k}>{n}</option>)}</Selector></Campo>
          <Campo etiqueta="Qué hace"><CampoArea path={`mejoras.${L}.texto`} value={mj.texto || ''} /></Campo>
        </div>
      )}
    </>
  );
  // Dentro del diálogo de subida ya va en su propia tarjeta con título
  return sinTitulo ? cuerpo : <Tarjeta as="section" aria-label={`Mejora de nivel ${L}`}>{cuerpo}</Tarjeta>;
}

/** Kits de la clase y su alternativa en oro. Se toma una vez; cambiar de clase lo vuelve a ofrecer. */
export function EquipoClase({ pj }: { pj: any }) {
  const kit = kitClase(pj.clase);
  if (!kit) return <Nota>Esta clase no trae equipo inicial. Agrega tus armas abajo y el resto en el inventario.</Nota>;
  const letra = (i: number) => String.fromCharCode(65 + i);
  const oro = typeof kit.alternativa === 'number' ? `${kit.alternativa} po` : `${kit.alternativa.dados} po (se tira al tomarlo)`;
  const describir = (v: VarianteKit) => [
    v.armadura && ARMADURAS[v.armadura]?.n, v.escudo && 'escudo',
    ...(v.armas || []).map(([k, q]) => `${ARMAS[k]?.n || k}${q > 1 ? ` (${q})` : ''}`), ...v.objetos,
  ].filter(Boolean).join(', ') + (v.oro ? ` y ${v.oro} po` : '');
  return (
    <div className="rounded-2xl bg-soft p-4 ring-1 ring-rule/60">
      {kit.variantes.map((v, i) => <p key={i} className="mb-1 mt-0"><b>Opción {letra(i)}:</b> {describir(v)}.</p>)}
      <p className="m-0"><b>Opción {letra(kit.variantes.length)}:</b> {oro} para comprar tu equipo.</p>
      <p className="mb-0 mt-1 text-xs text-muted">Fuente: {kit.fuente}.</p>
      {pj.inicial
        ? <div className="mt-3 flex flex-wrap items-center gap-3"><p className="m-0 font-bold text-pas">✓ Ya tomaste {typeof pj.inicial === 'string' ? `la opción ${pj.inicial}` : 'el equipo inicial'}.</p><Boton tamano="sm" variante="fantasma" onClick={quitarEquipoClase}>Quitar y elegir otra</Boton></div>
        : (
          <div className="mt-3 flex flex-wrap gap-2">
            {kit.variantes.map((_, i) => <Boton key={i} variante={i === 0 ? 'primario' : undefined} onClick={() => tomarEquipoClase(i)}>Tomar el kit {letra(i)}</Boton>)}
            <Boton onClick={() => tomarEquipoClase('oro')}>Tomar el oro ({letra(kit.variantes.length)})</Boton>
          </div>
        )}
    </div>
  );
}

/* ---------- Habilidades ---------- */
/** Marca o desmarca v en la lista pj[field], sin pasar de max. */
function alternarEn(field: string, v: string, max: number, el: HTMLInputElement) {
  const pj = S.pj, arr = (pj[field] = pj[field] || []);
  if (arr.includes(v)) arr.splice(arr.indexOf(v), 1);
  else if (arr.length < max) arr.push(v);
  else { avisar(`Solo puedes elegir ${max}.`, 'aviso'); el.checked = false; return; }
  guardar();
}

function Checks({ field, list, sel, max, disabled = new Set(), etiqueta }: { field: string; list: string[]; sel: string[]; max: number; disabled?: Set<string>; etiqueta: string }) {
  const toggle = (v: string, el: HTMLInputElement) => alternarEn(field, v, max, el);
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
  const ne = c.E?.habsElegir || 0; if (ne) razones.push(`${ne} por tu especie (${c.E.habsNota || c.E.n})`);
  const deRasgos = c.entries.filter((e: any) => e.habsElegir); deRasgos.forEach((e: any) => razones.push(`${e.habsElegir} por ${e.nombre}`));
  const nr = deRasgos.reduce((s: number, e: any) => s + e.habsElegir, 0);
  const extraN = (pj.especie.key === 'humano' ? 1 : 0) + (pj.especie.key === 'elfo' ? 1 : 0) + ne + nr + nh + (pj.clase === 'barbaro' && c.lvl >= 3 ? 1 : 0);
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
          <ElegirPericia pj={pj} c={c} />
        </Seccion>
      )}
    </>
  );
}

/** Casillas de pericia, entre las habilidades en que ya eres competente. */
export function ElegirPericia({ pj, c }: { pj: any; c: any }) {
  return <Checks field="pericia" list={SKILLS.map(s => s[0]).filter(n => c.skillProf[norm(n)])} sel={pj.pericia} max={periciaN(pj.clase, c.lvl)} etiqueta="Pericia" />;
}

/** Casillas de maestría con armas: primero las armas que llevas, el resto plegado. */
export function ElegirMaestrias({ pj, c }: { pj: any; c: any }) {
  const C = c.C;
  const maestria = (k: string, el: HTMLInputElement) => alternarEn('maestrias', k, C?.maestrias || 0, el);
  const tiene = [...new Set<string>(pj.armas.map((a: any) => a[0]))];
  const conMaestria = Object.keys(ARMAS).filter(k => competenteArma(c, k) && !(pj.clase === 'barbaro' && ARMAS[k].dist));
  const maestriaTiene = [...new Set([...tiene.filter(k => conMaestria.includes(k)), ...pj.maestrias])];
  const maestriaResto = conMaestria.filter(k => !maestriaTiene.includes(k));
  const cb = (k: string) => (
    <CasillaKit key={k} checked={pj.maestrias.includes(k)} onChange={(_, el) => maestria(k, el)} nota={MAESTRIAS[ARMAS[k].ma]?.[0]}>{ARMAS[k].n}</CasillaKit>
  );
  return (
    <>
      {maestriaTiene.length > 0 && <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-x-3">{maestriaTiene.map(cb)}</div>}
      {maestriaResto.length > 0 && <Plegable titulo="Otras armas">{<div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-x-3">{maestriaResto.map(cb)}</div>}</Plegable>}
    </>
  );
}

/* ---------- Equipo ---------- */
function cambiarCantidadArma(i: number, d: number) { const armas = S.pj.armas, a = armas[i]; a[1] += d; if (a[1] <= 0) armas.splice(i, 1); guardar(); }
function agregarArma(k: string) {
  if (!k) return;
  const armas = S.pj.armas, ex = armas.find((a: any) => a[0] === k);
  if (ex) ex[1]++; else armas.push([k, 1]);
  guardar(); avisar(`${ARMAS[k].n} agregada.`);
}
export function PasoEquipo({ pj, c }: { pj: any; c: any }) {
  const C = c.C;
  const cambiarQ = (i: number, d: number) => cambiarCantidadArma(i, d);
  const agregar = () => agregarArma((document.getElementById('addW') as HTMLSelectElement).value);
  // Competencias reales del personaje: las de la clase más las que dan especie, subclase y dotes
  const compArm = c.compArm;
  const armaduras = Object.keys(ARMADURAS).filter(k => compArm[ARMADURAS[k].cat]);
  const armaduraFuera = c.armorKey && !armaduras.includes(c.armorKey);
  const armasOk = Object.keys(ARMAS).filter(k => competenteArma(c, k));
  return (
    <>
      <Seccion titulo="Armadura" descripcion={`Eres competente con: ${textoArmaduras(c).toLowerCase()}.`}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Campo etiqueta="Armadura puesta">
            <Selector path="armadura" value={c.armorKey ? pj.armadura : 'ninguna'}>
              <option value="ninguna">Sin armadura</option>
              {[...armaduras, ...(armaduraFuera ? [c.armorKey] : [])].map(k => { const a = ARMADURAS[k]; return (
                <option key={k} value={k}>{a.n} ({a.base}{a.max === 0 ? '' : a.max ? ' + DES máx. 2' : ' + DES'}){armaduras.includes(k) ? '' : ' — sin competencia'}</option>
              ); })}
            </Selector>
          </Campo>
        </div>
        <p className="mb-0 mt-3">CA resultante: <b className="font-serif text-xl">{c.ac}</b>{c.armor?.sigilo ? '. Desventaja en Sigilo.' : '.'}</p>
      </Seccion>
      <Seccion titulo="Armas" descripcion={`Eres competente con: ${textoArmas(c).toLowerCase()}. Solo aparecen las armas con las que eres competente.`}>
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
        <h3 className="mb-2 mt-5 font-serif text-lg font-bold">En las manos</h3>
        <ElegirManos pj={pj} c={c} />
      </Seccion>
      {C?.maestrias > 0 && (
        <Seccion titulo={`Maestría con armas (${pj.maestrias.length} de ${C.maestrias})`} descripcion={pj.clase === 'barbaro' ? 'Solo armas cuerpo a cuerpo con las que eres competente.' : 'Solo armas con las que eres competente.'}>
          <ElegirMaestrias pj={pj} c={c} />
        </Seccion>
      )}
      {C && <Seccion titulo="Equipo de la clase"><EquipoClase pj={pj} /></Seccion>}
      {c.T && <Seccion titulo="Equipo del trasfondo"><EquipoTrasfondo pj={pj} /></Seccion>}
      <Seccion titulo="Lo demás">
        <div className="grid gap-3">
          <Campo etiqueta="Oro (po)" className="max-w-40"><CampoNumero path="oro" value={pj.oro || 0} min={0} /></Campo>
          <Campo etiqueta="Inventario"><CampoArea path="inventario" value={pj.inventario} rows={4} /></Campo>
        </div>
      </Seccion>
    </>
  );
}
