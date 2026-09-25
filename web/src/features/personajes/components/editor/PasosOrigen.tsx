/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { S, render } from '@/app-shell/estado';
import { norm } from '@/shared/utils/texto';
import { Boton, Campo, Nota, Plegable, Seccion } from '@/shared/ui/kit';
import { ALL_AB, SKILLS, abInfo } from '@/features/reglas/data/caracteristicas';
import { ESPECIES } from '@/features/reglas/data/especies';
import { TRASFONDOS } from '@/features/reglas/data/trasfondos';
import { ESTILOS } from '@/features/reglas/data/estilos';
import { ARMAS } from '@/features/reglas/data/equipo';
import { kitTrasfondo } from '@/features/reglas/data/equipo-trasfondos';
import { esDoteOrigen } from '@/features/reglas/domain/restricciones';
import { fuenteClase, fuenteEspecie, fuenteSubclase, fuenteTrasfondo } from '@/features/reglas/data/fuentes';
import { getLib, getSubs, getT, allDotes, descEspecie, descClase, descSubclase, sinRepetidas, clasesParaElegir } from '@/features/biblioteca/domain/biblioteca';
import { PanelMedia } from '@/features/biblioteca/components/PanelMedia';
import { Entrada } from '../piezas';
import { quitarEquipoTrasfondo, savePj, setVal, tomarEquipoTrasfondo } from '../../acciones';
import { TarjetasBuscables, Tarjeta } from './Tarjetas';
import { ElegirElecciones, InfoSubclase } from './InfoSubclase';
import { faltaParaSubir } from '../../domain/pendientes';
import { AbSel, Casilla, CampoNumero, CampoTexto, Selector } from './campos';

/* Elegir especie, clase o trasfondo reinicia lo que dependía de la anterior. Cambian el personaje fuera del componente. */
function elegirEspecie(k: string) { const pj = S.pj; pj.especie = { ...pj.especie, key: k, sub: '' }; savePj(); render(); }
function elegirClase(k: string) {
  const pj = S.pj;
  if (pj.clase !== k) Object.assign(pj, { clase: k, subclase: '', estilo: '', habClase: [], pericia: [], maestrias: [], pactoCadena: false, inicial: false });
  savePj(); render();
}
function elegirTrasfondo(k: string) {
  const pj = S.pj, t = getT(pj, k);
  pj.trasfondo = { key: k, modo: '21', a: '', b: '', nombre: '', abs: ['', '', ''], habs: ['', ''], dote: t.dote || '', herr: t.herr || '' };
  savePj(); render();
}

/* ---------- Especie ---------- */
export function PasoEspecie({ pj, c }: { pj: any; c: any }) {
  const E = c.E, LIB = getLib();
  const elegir = (k: string) => elegirEspecie(k);
  const lista: [string, any][] = [...Object.entries(ESPECIES).filter(([k]) => k !== 'custom'), ...sinRepetidas(LIB.especies, ESPECIES, pj.especie.key), ['custom', ESPECIES.custom]];
  const items = lista.map(([k, e]) => {
    const d = k === 'custom' ? e.r : (descEspecie(k) || (e.lib ? '' : e.r));
    return { key: k, q: norm(e.n + ' ' + d), node: <Tarjeta on={pj.especie.key === k} onClick={() => elegir(k)} img={LIB.img?.[k]} titulo={e.n} sub={d} clampSub fuente={k === 'custom' ? undefined : fuenteEspecie(k, e)} /> };
  });
  const ents = c.entries.filter((e: any) => e.grupo === 'especie');
  return (
    <>
      {E && pj.especie.key !== 'custom' && <PanelMedia k={pj.especie.key} n={E.n} d={descEspecie(pj.especie.key)} fuente={fuenteEspecie(pj.especie.key, E)} />}
      {E?.subs && (
        <Campo etiqueta={E.subL} className="max-w-sm">
          <Selector path="especie.sub" value={pj.especie.sub} disabled={c.lvl > 1 && !!pj.especie.sub}>
            <option value="">Elige…</option>
            {Object.entries<any>(E.subs).map(([k, s]) => <option key={k} value={k}>{s.n}{s.dmg ? ` (${s.dmg})` : ''}</option>)}
          </Selector>
        </Campo>
      )}
      {pj.especie.key === 'custom' && (
        <div className="grid gap-3 sm:grid-cols-3">
          <Campo etiqueta="Nombre"><CampoTexto path="especie.nombre" value={pj.especie.nombre} /></Campo>
          <Campo etiqueta="Velocidad (pies)"><CampoNumero path="especie.vel" value={pj.especie.vel} /></Campo>
          <Campo etiqueta="Visión en la oscuridad (pies)" ayuda="0 si no tiene"><CampoNumero path="especie.vision" value={pj.especie.vision || 0} /></Campo>
          <Nota className="sm:col-span-3">Sus rasgos los agregas en Rasgos propios.</Nota>
        </div>
      )}
      <ElegirElecciones pj={pj} elecciones={(c.elecciones || []).filter((e: any) => e.grupo === 'especie')} />
      {ents.length > 0 && <Seccion titulo="Rasgos de tu especie">{ents.map((e: any, i: number) => <Entrada key={i} e={e} />)}</Seccion>}
      {E && c.lvl > 1
        ? <Nota>La especie se elige a nivel 1 y ya no se puede cambiar.</Nota>
        : <Seccion titulo={E ? 'Cambiar de especie' : 'Elige tu especie'}><TarjetasBuscables que="especie" items={items} /></Seccion>}
    </>
  );
}

/* ---------- Clase ---------- */
/** Tarjetas de subclase con su descripción; la elegida muestra qué da en cada nivel. También se usa al subir de nivel.
    Antes del nivel de subclase solo se pueden ver: tocar una tarjeta abre su vista previa sin elegirla. */
export function ElegirSubclase({ pj, c }: { pj: any; c: any }) {
  const subs = getSubs(pj, pj.clase).filter(s => s.key !== 'cadena');
  const puede = c.lvl >= c.subNivel;
  // Pasado su nivel, la subclase ya elegida queda fija: solo se ve su tarjeta y lo que da
  const fija = c.lvl > c.subNivel && !!pj.subclase;
  // La vista previa vale para el nivel en que se abrió: al cambiar de nivel se cierra
  const [vista, setVista] = useState({ k: '', lvl: 0 });
  const elegirSub = (k: string) => puede ? setVal('subclase', k) : setVista(v => ({ k: v.k === k && v.lvl === c.lvl ? '' : k, lvl: c.lvl }));
  const marcada = puede ? pj.subclase : (vista.lvl === c.lvl ? vista.k : '');
  const tarjetas = (on: (k: string) => boolean) => subs.map(s => {
    const d = descSubclase(s.key);
    return { key: s.key, q: norm(s.n + ' ' + d), node: <Tarjeta on={on(s.key)} onClick={() => elegirSub(s.key)} titulo={s.n} sub={d} clampSub fuente={fuenteSubclase(s, pj.clase)} /> };
  });
  // Antes de su nivel no se elige: las subclases quedan plegadas y solo se leen (ninguna se marca como elegida)
  if (!puede) return (
    <Plegable titulo={`Ver las subclases (se eligen a nivel ${c.subNivel})`}>
      <div className="px-4 pb-4">
        <Nota>Solo para leer: tocar una muestra qué da, pero no la elige.</Nota>
        <TarjetasBuscables que="subclase" items={tarjetas(() => false)} />
        {marcada && <InfoSubclase pj={pj} sk={marcada} lvl={c.lvl} soloVer />}
      </div>
    </Plegable>
  );
  if (fija) {
    const s = subs.find(x => x.key === pj.subclase);
    return (
      <>
        <div className="max-w-md">
          {s ? <Tarjeta on onClick={() => {}} titulo={s.n} sub={descSubclase(s.key)} clampSub fuente={fuenteSubclase(s, pj.clase)} />
            : <Tarjeta on onClick={() => {}} titulo={pj.subclaseNombre || 'Otra'} sub="Sus rasgos van en Rasgos propios." />}
        </div>
        <Nota>Se eligió a nivel {c.subNivel} y ya no se puede cambiar.</Nota>
        {s && <InfoSubclase pj={pj} sk={s.key} lvl={c.lvl} />}
      </>
    );
  }
  return (
    <>
      <TarjetasBuscables que="subclase" items={[
        ...tarjetas(k => marcada === k),
        { key: 'otra', q: 'otra', node: <Tarjeta on={pj.subclase === 'otra'} onClick={() => elegirSub('otra')} titulo="Otra" sub="Escribe su nombre; sus rasgos van en Rasgos propios." /> },
      ]} />
      {pj.subclase === 'otra' && (
        <Campo etiqueta="Nombre de la subclase" ayuda="Sus rasgos van en Rasgos propios."><CampoTexto path="subclaseNombre" value={pj.subclaseNombre} /></Campo>
      )}
      {marcada && marcada !== 'otra' && <InfoSubclase pj={pj} sk={marcada} lvl={c.lvl} />}
    </>
  );
}

export function ElegirEstilo({ pj, c }: { pj: any; c: any }) {
  // Pasado el nivel en que se elige, queda fijo
  if (pj.estilo && ESTILOS[pj.estilo] && c.lvl > c.C.estilo) return (
    <Campo etiqueta="Estilo de combate" ayuda={`Se eligió a nivel ${c.C.estilo}.`}><p className="m-0 min-h-11 content-center font-bold">{ESTILOS[pj.estilo][0]}</p></Campo>
  );
  return (
    <Campo etiqueta="Estilo de combate">
      <Selector path="estilo" value={pj.estilo}>
        <option value="">Elige…</option>
        {c.C.estilos.map((k: string) => <option key={k} value={k}>{ESTILOS[k][0]}</option>)}
      </Selector>
    </Campo>
  );
}

export function PasoClase({ pj, c }: { pj: any; c: any }) {
  const C = c.C, LIB = getLib();
  const elegir = (k: string) => elegirClase(k);
  const lista = clasesParaElegir(pj.clase);
  const items = lista.map(([k, x]) => {
    const sub = `d${x.dado}, ${x.lanz ? 'conjuros con ' + abInfo(x.lanz)[2] : 'sin conjuros'}`;
    return { key: k, q: norm(x.n + ' ' + descClase(k)), node: <Tarjeta on={pj.clase === k} onClick={() => elegir(k)} img={LIB.img?.['c:' + k]} titulo={x.n} sub={sub} fuente={fuenteClase(k)} /> };
  });
  const tarjetas = <Seccion titulo={C ? 'Cambiar de clase' : 'Elige tu clase'} descripcion={C ? 'Cambiar de clase borra las habilidades, pericias y maestrías que elegiste.' : undefined}><TarjetasBuscables que="clase" items={items} /></Seccion>;
  if (!C) return tarjetas;
  // Con algo pendiente no se puede subir de nivel (bajar sí)
  const falta = faltaParaSubir(c);
  return (
    <>
      <PanelMedia k={'c:' + pj.clase} n={C.n} d={descClase(pj.clase)} fuente={fuenteClase(pj.clase)} />
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Campo etiqueta="Nivel">
            <Selector path="nivel" value={+pj.nivel} num>{Array.from({ length: 20 }, (_, i) => <option key={i} value={i + 1} disabled={falta.length > 0 && i + 1 > c.lvl}>{i + 1}</option>)}</Selector>
          </Campo>
          {falta.length > 0 && c.lvl < 20 && <p className="m-0 mt-1 text-sm text-muted">Para subir de nivel falta elegir: {falta.map((a: any) => a.t.toLowerCase()).join(', ')}.</p>}
        </div>
        {C.estilo && c.lvl >= C.estilo && <ElegirEstilo pj={pj} c={c} />}
      </div>
      <ElegirElecciones pj={pj} elecciones={(c.elecciones || []).filter((e: any) => e.grupo === 'clase')} />
      {/* El Pacto de la Cadena ahora se elige como invocación; la casilla solo queda para quien ya la tenía marcada */}
      {pj.clase === 'brujo' && pj.pactoCadena && <Casilla path="pactoCadena" checked={pj.pactoCadena}>Pacto de la Cadena (casilla antigua: ahora elígelo en Invocaciones)</Casilla>}
      <Seccion titulo="Subclase" descripcion={c.lvl < c.subNivel ? `La eliges al llegar a nivel ${c.subNivel}.` : 'Toca una para ver qué da en cada nivel.'}>
        <ElegirSubclase pj={pj} c={c} />
      </Seccion>
      <Seccion titulo={`Rasgos hasta nivel ${c.lvl}`}>
        {c.entries.filter((e: any) => e.grupo === 'clase' || e.grupo === 'sub').map((e: any, i: number) => <Entrada key={i} e={e} />)}
      </Seccion>
      {c.lvl > 1 ? <Nota>La clase se elige a nivel 1 y ya no se puede cambiar.</Nota> : tarjetas}
    </>
  );
}

/* ---------- Trasfondo ---------- */
/** Kit del trasfondo (A) o su oro (B). Se toma una vez; también aparece en el paso Equipo. */
export function EquipoTrasfondo({ pj }: { pj: any }) {
  const T = getT(pj, pj.trasfondo?.key), kit = kitTrasfondo(pj.trasfondo?.key, T);
  if (!T || !kit) return <Nota>Este trasfondo no trae equipo. Anota el tuyo en el paso Equipo.</Nota>;
  const armas = (kit.armas || []).map(([k, q]) => `${ARMAS[k]?.n || k}${q > 1 ? ` (${q})` : ''}`);
  const tomado = pj.trasfondo.equipo;
  return (
    <div className="rounded-2xl bg-soft p-4 ring-1 ring-rule/60">
      <p className="m-0"><b>Opción A:</b> {[...armas, ...kit.objetos].join(', ')} y {kit.oro} po.</p>
      {kit.alternativa != null && <p className="mb-0 mt-1"><b>Opción B:</b> {kit.alternativa} po para comprar tu equipo.</p>}
      <p className="mb-0 mt-1 text-xs text-muted">{kit.sugerido ? 'Kit sugerido: este trasfondo no tiene versión oficial con equipo.' : `Fuente: ${kit.fuente}.`}</p>
      {tomado
        ? <div className="mt-3 flex flex-wrap items-center gap-3"><p className="m-0 font-bold text-pas">✓ Ya tomaste la opción {tomado}{tomado === 'A' ? ': las armas están en Equipo y lo demás en tu inventario.' : '.'}</p><Boton tamano="sm" variante="fantasma" onClick={quitarEquipoTrasfondo}>Quitar y elegir otra</Boton></div>
        : (
          <div className="mt-3 flex flex-wrap gap-2">
            <Boton variante="primario" onClick={() => tomarEquipoTrasfondo('A')}>Tomar el kit (A)</Boton>
            {kit.alternativa != null && <Boton onClick={() => tomarEquipoTrasfondo('B')}>Tomar {kit.alternativa} po (B)</Boton>}
          </div>
        )}
    </div>
  );
}

export function PasoTrasfondo({ pj, c }: { pj: any; c: any }) {
  const T = c.T, tb = pj.trasfondo, LIB = getLib();
  const elegir = (k: string) => elegirTrasfondo(k);
  const lista: [string, any][] = [...Object.entries(TRASFONDOS).filter(([, t]) => !t.custom), ...sinRepetidas(LIB.trasfondos, TRASFONDOS, tb.key), ['custom', TRASFONDOS.custom]];
  const items = lista.map(([k, t]) => {
    const sub = t.custom ? 'Arma el tuyo' : t.habs.join(' y ');
    return { key: k, q: norm(t.n + ' ' + sub), node: <Tarjeta on={tb.key === k} onClick={() => elegir(k)} titulo={t.n} sub={sub} fuente={t.custom ? undefined : fuenteTrasfondo(k, t)} /> };
  });
  const tarjetas = <Seccion titulo={T ? 'Cambiar de trasfondo' : 'Elige tu trasfondo'}><TarjetasBuscables que="trasfondo" items={items} /></Seccion>;
  if (!T) return tarjetas;
  const abs: string[] = T.custom ? tb.abs : T.ab;
  // Solo dotes de origen (y la que ya tenga elegida, para poder verla).
  const dotesOrigen = Object.entries(allDotes()).filter(([k, d]) => esDoteOrigen(k, d) || k === tb.dote || k === T.dote);
  const ds = c.entries.filter((e: any) => e.grupo === 'dote');
  return (
    <>
      <Seccion titulo={T.custom ? tb.nombre || 'Trasfondo personalizado' : T.n}>
        {T.custom ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <Campo etiqueta="Nombre"><CampoTexto path="trasfondo.nombre" value={tb.nombre} /></Campo>
            <Campo etiqueta="Herramienta"><CampoTexto path="trasfondo.herr" value={tb.herr} /></Campo>
            <fieldset className="m-0 border-0 p-0 sm:col-span-2"><legend className="mb-1.5 font-bold">Características que puede subir</legend>
              <div className="grid grid-cols-3 gap-2">{[0, 1, 2].map(i => <AbSel key={i} path={`trasfondo.abs.${i}`} value={tb.abs[i]} opts={ALL_AB} aria-label={`Característica ${i + 1}`} />)}</div>
            </fieldset>
            <fieldset className="m-0 border-0 p-0 sm:col-span-2"><legend className="mb-1.5 font-bold">Habilidades</legend>
              <div className="grid grid-cols-2 gap-2">{[0, 1].map(i => (
                <Selector key={i} path={`trasfondo.habs.${i}`} value={tb.habs[i]} aria-label={`Habilidad ${i + 1}`}>
                  <option value="">Elige…</option>{SKILLS.map(([n]) => <option key={n} value={n}>{n}</option>)}
                </Selector>
              ))}</div>
            </fieldset>
          </div>
        ) : <p className="m-0">Habilidades: <b>{T.habs.join(' y ')}</b>. Herramienta: <b>{T.herr}</b>.</p>}
      </Seccion>
      <Seccion titulo="Mejora de características" descripcion="En 2024 los bonificadores vienen del trasfondo.">
        <div className="grid gap-3 sm:grid-cols-3">
          <Campo etiqueta="Cómo repartirlas">
            <Selector path="trasfondo.modo" value={tb.modo !== '111' ? '21' : '111'}>
              <option value="21">+2 a una y +1 a otra</option><option value="111">+1 a las tres</option>
            </Selector>
          </Campo>
          {tb.modo !== '111' ? (
            <>
              <Campo etiqueta="+2 a"><AbSel path="trasfondo.a" value={tb.a} opts={abs.filter(Boolean)} /></Campo>
              <Campo etiqueta="+1 a"><AbSel path="trasfondo.b" value={tb.b} opts={abs.filter(k => k && k !== tb.a)} /></Campo>
            </>
          ) : <Nota className="self-end sm:col-span-2">+1 a {abs.filter(Boolean).map(k => abInfo(k)[3]).join(', ') || 'las tres que elijas'}.</Nota>}
        </div>
      </Seccion>
      <Seccion titulo="Equipo inicial" descripcion="El trasfondo te da su kit o el oro para comprar lo tuyo.">
        <EquipoTrasfondo pj={pj} />
      </Seccion>
      <Seccion titulo="Dotes de origen">
        <div className="grid gap-3 sm:grid-cols-2">
          <Campo etiqueta="Dote del trasfondo">
            <Selector path="trasfondo.dote" value={tb.dote}>
              <option value="">Elige…</option>
              {dotesOrigen.map(([k, d]) => <option key={k} value={k}>{d.n}{!T.custom && T.dote === k ? ' (la de este trasfondo)' : ''}</option>)}
            </Selector>
          </Campo>
          {pj.especie.key === 'humano' && (
            <Campo etiqueta="Dote extra por ser humano">
              <Selector path="doteHumano" value={pj.doteHumano}>
                <option value="">Elige…</option>{dotesOrigen.map(([k, d]) => <option key={k} value={k}>{d.n}</option>)}
              </Selector>
            </Campo>
          )}
        </div>
        {ds.map((e: any, i: number) => <Entrada key={i} e={e} />)}
      </Seccion>
      {c.lvl > 1 ? <Nota>El trasfondo se elige a nivel 1 y ya no se puede cambiar.</Nota> : tarjetas}
    </>
  );
}

