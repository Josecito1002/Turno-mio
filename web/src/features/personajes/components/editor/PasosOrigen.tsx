/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { render } from '@/app-shell/estado';
import { norm } from '@/shared/utils/texto';
import { Campo, Nota, Seccion } from '@/shared/ui/kit';
import { ALL_AB, SKILLS, abInfo } from '@/features/reglas/data/caracteristicas';
import { ESPECIES } from '@/features/reglas/data/especies';
import { CLASES } from '@/features/reglas/data/clases';
import { TRASFONDOS } from '@/features/reglas/data/trasfondos';
import { ESTILOS } from '@/features/reglas/data/estilos';
import { esDoteOrigen } from '@/features/reglas/domain/restricciones';
import { getLib, getSubs, getT, allDotes, descEspecie, descClase, sinRepetidas } from '@/features/biblioteca/domain/biblioteca';
import { PanelMedia } from '@/features/biblioteca/components/PanelMedia';
import { Entrada } from '../piezas';
import { savePj } from '../../acciones';
import { TarjetasBuscables, Tarjeta } from './Tarjetas';
import { AbSel, Casilla, CampoNumero, CampoTexto, Selector } from './campos';

/* ---------- Especie ---------- */
export function PasoEspecie({ pj, c }: { pj: any; c: any }) {
  const E = c.E, LIB = getLib();
  const elegir = (k: string) => { pj.especie = { ...pj.especie, key: k, sub: '' }; savePj(); render(); };
  const lista: [string, any][] = [...Object.entries(ESPECIES).filter(([k]) => k !== 'custom'), ...sinRepetidas(LIB.especies, ESPECIES, pj.especie.key), ['custom', ESPECIES.custom]];
  const items = lista.map(([k, e]) => {
    const d = k === 'custom' ? e.r : (descEspecie(k) || (e.lib ? 'De la biblioteca' : e.r));
    return { key: k, q: norm(e.n + ' ' + d), node: <Tarjeta on={pj.especie.key === k} onClick={() => elegir(k)} img={LIB.img?.[k]} titulo={e.n} sub={d} clampSub /> };
  });
  const ents = c.entries.filter((e: any) => e.grupo === 'especie');
  return (
    <>
      {E && pj.especie.key !== 'custom' && <PanelMedia k={pj.especie.key} n={E.n} d={descEspecie(pj.especie.key)} />}
      {E?.subs && (
        <Campo etiqueta={E.subL} className="max-w-sm">
          <Selector path="especie.sub" value={pj.especie.sub}>
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
      {ents.length > 0 && <Seccion titulo="Rasgos de tu especie">{ents.map((e: any, i: number) => <Entrada key={i} e={e} />)}</Seccion>}
      <Seccion titulo={E ? 'Cambiar de especie' : 'Elige tu especie'}><TarjetasBuscables que="especie" items={items} /></Seccion>
    </>
  );
}

/* ---------- Clase ---------- */
export function PasoClase({ pj, c }: { pj: any; c: any }) {
  const C = c.C, LIB = getLib();
  const elegir = (k: string) => {
    if (pj.clase !== k) Object.assign(pj, { clase: k, subclase: '', estilo: '', habClase: [], pericia: [], maestrias: [], pactoCadena: false, inicial: false });
    savePj(); render();
  };
  const lista: [string, any][] = [...Object.entries(CLASES), ...sinRepetidas(LIB.clases, CLASES, pj.clase).filter(([, x]) => x.dado)];
  const items = lista.map(([k, x]) => {
    const sub = `d${x.dado}, ${x.lanz ? 'conjuros con ' + abInfo(x.lanz)[2] : 'sin conjuros'}${x.lib ? ', de la biblioteca' : ''}`;
    return { key: k, q: norm(x.n + ' ' + descClase(k)), node: <Tarjeta on={pj.clase === k} onClick={() => elegir(k)} img={LIB.img?.['c:' + k]} titulo={x.n} sub={sub} /> };
  });
  const tarjetas = <Seccion titulo={C ? 'Cambiar de clase' : 'Elige tu clase'} descripcion={C ? 'Cambiar de clase borra las habilidades, pericias y maestrías que elegiste.' : undefined}><TarjetasBuscables que="clase" items={items} /></Seccion>;
  if (!C) return tarjetas;
  const subs = getSubs(pj, pj.clase).filter(s => s.key !== 'cadena');
  return (
    <>
      <PanelMedia k={'c:' + pj.clase} n={C.n} d={descClase(pj.clase)} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Campo etiqueta="Nivel">
          <Selector path="nivel" value={+pj.nivel} num>{Array.from({ length: 20 }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}</Selector>
        </Campo>
        {c.lvl >= c.subNivel ? (
          <Campo etiqueta="Subclase">
            <Selector path="subclase" value={pj.subclase}>
              <option value="">Elige…</option>
              {subs.map(s => <option key={s.key} value={s.key}>{s.n}{s.lib ? ' (biblioteca)' : ''}</option>)}
              <option value="otra">Otra (escribe su nombre)</option>
            </Selector>
          </Campo>
        ) : subs.length > 0 && <Nota className="self-end">La subclase se elige a nivel {c.subNivel}.</Nota>}
        {pj.subclase === 'otra' && c.lvl >= c.subNivel && (
          <Campo etiqueta="Nombre de la subclase" ayuda="Sus rasgos van en Rasgos propios."><CampoTexto path="subclaseNombre" value={pj.subclaseNombre} /></Campo>
        )}
        {C.estilo && c.lvl >= C.estilo && (
          <Campo etiqueta="Estilo de combate">
            <Selector path="estilo" value={pj.estilo}>
              <option value="">Elige…</option>
              {C.estilos.map((k: string) => <option key={k} value={k}>{ESTILOS[k][0]}</option>)}
            </Selector>
          </Campo>
        )}
      </div>
      {pj.clase === 'brujo' && <Casilla path="pactoCadena" checked={pj.pactoCadena}>Tiene la invocación Pacto de la Cadena</Casilla>}
      <Seccion titulo={`Rasgos hasta nivel ${c.lvl}`}>
        {c.entries.filter((e: any) => e.grupo === 'clase' || e.grupo === 'sub').map((e: any, i: number) => <Entrada key={i} e={e} />)}
      </Seccion>
      {tarjetas}
    </>
  );
}

/* ---------- Trasfondo ---------- */
export function PasoTrasfondo({ pj, c }: { pj: any; c: any }) {
  const T = c.T, tb = pj.trasfondo, LIB = getLib();
  const elegir = (k: string) => {
    const t = getT(pj, k);
    pj.trasfondo = { key: k, modo: '21', a: '', b: '', nombre: '', abs: ['', '', ''], habs: ['', ''], dote: t.dote || '', herr: t.herr || '' };
    savePj(); render();
  };
  const lista: [string, any][] = [...Object.entries(TRASFONDOS).filter(([, t]) => !t.custom), ...sinRepetidas(LIB.trasfondos, TRASFONDOS, tb.key), ['custom', TRASFONDOS.custom]];
  const items = lista.map(([k, t]) => {
    const sub = t.custom ? 'Arma el tuyo' : t.habs.join(' y ') + (t.lib ? ', biblioteca' : '');
    return { key: k, q: norm(t.n + ' ' + sub), node: <Tarjeta on={tb.key === k} onClick={() => elegir(k)} titulo={t.n} sub={sub} /> };
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
      {tarjetas}
    </>
  );
}

