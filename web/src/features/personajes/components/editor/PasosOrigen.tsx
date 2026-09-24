/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { S, render } from '@/app-shell/estado';
import { norm } from '@/shared/utils/texto';
import { ALL_AB, SKILLS, abInfo } from '@/features/reglas/data/caracteristicas';
import { ESPECIES } from '@/features/reglas/data/especies';
import { CLASES } from '@/features/reglas/data/clases';
import { TRASFONDOS } from '@/features/reglas/data/trasfondos';
import { ESTILOS } from '@/features/reglas/data/estilos';
import { getLib, getSubs, getT, allDotes, descEspecie, descClase } from '@/features/biblioteca/domain/biblioteca';
import { PanelMedia } from '@/features/biblioteca/components/PanelMedia';
import { Entrada } from '../piezas';
import { savePj } from '../../acciones';
import { TarjetasBuscables, Tarjeta } from './Tarjetas';
import { AbSel, Casilla, CampoNumero, CampoTexto, Selector } from './campos';

/* ---------- Especie ---------- */
export function PasoEspecie({ pj, c }: { pj: any; c: any }) {
  const E = c.E, LIB = getLib();
  const elegir = (k: string) => { pj.especie = { ...pj.especie, key: k, sub: '' }; savePj(); render(); };
  const lista: [string, any][] = [...Object.entries(ESPECIES).filter(([k]) => k !== 'custom'), ...Object.entries(LIB.especies), ['custom', ESPECIES.custom]];
  const items = lista.map(([k, e]) => {
    const d = k === 'custom' ? e.r : (descEspecie(k) || (e.lib ? 'De tu biblioteca' : e.r));
    return { key: k, q: norm(e.n + ' ' + d), node: <Tarjeta clase="esp" on={pj.especie.key === k} onClick={() => elegir(k)} img={LIB.img?.[k]} titulo={e.n} sub={d} clampSub /> };
  });
  const ents = c.entries.filter((e: any) => e.grupo === 'especie');
  return (
    <>
      {E && pj.especie.key !== 'custom' && <PanelMedia k={pj.especie.key} n={E.n} d={descEspecie(pj.especie.key)} />}
      {E?.subs && (
        <div className="form"><label>{E.subL}
          <Selector path="especie.sub" value={pj.especie.sub}>
            <option value="">Elige…</option>
            {Object.entries<any>(E.subs).map(([k, s]) => <option key={k} value={k}>{s.n}{s.dmg ? ` (${s.dmg})` : ''}</option>)}
          </Selector>
        </label></div>
      )}
      {pj.especie.key === 'custom' && (
        <>
          <div className="form">
            <label>Nombre<CampoTexto path="especie.nombre" value={pj.especie.nombre} /></label>
            <label>Velocidad en pies<CampoNumero path="especie.vel" value={pj.especie.vel} /></label>
            <label>Visión en la oscuridad en pies (0 si no tiene)<CampoNumero path="especie.vision" value={pj.especie.vision || 0} /></label>
          </div>
          <p className="note">Sus rasgos los agregas en Rasgos propios.</p>
        </>
      )}
      {ents.length > 0 && <><h2 className="plain">Rasgos</h2>{ents.map((e: any, i: number) => <Entrada key={i} e={e} />)}</>}
      <h2 className="plain">{E ? 'Cambiar de especie' : 'Elige la especie'}</h2>
      <TarjetasBuscables que="especie" items={items} />
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
  const lista: [string, any][] = [...Object.entries(CLASES), ...Object.entries(LIB.clases).filter(([, x]) => x.dado)];
  const items = lista.map(([k, x]) => {
    const sub = `d${x.dado}, ${x.lanz ? 'conjuros con ' + abInfo(x.lanz)[2] : 'sin conjuros'}${x.lib ? ', de tu biblioteca' : ''}`;
    return { key: k, q: norm(x.n + ' ' + descClase(k)), node: <Tarjeta clase="esp" on={pj.clase === k} onClick={() => elegir(k)} img={LIB.img?.['c:' + k]} titulo={x.n} sub={sub} /> };
  });
  if (!C) return <><h2 className="plain">Clase</h2><TarjetasBuscables que="clase" items={items} /></>;
  const subs = getSubs(pj, pj.clase).filter(s => s.key !== 'cadena');
  return (
    <>
      <h2 className="plain">Clase</h2>
      <TarjetasBuscables que="clase" items={items} />
      <PanelMedia k={'c:' + pj.clase} n={C.n} d={descClase(pj.clase)} />
      <div className="form">
        <label>Nivel
          <Selector path="nivel" value={+pj.nivel} num>{Array.from({ length: 20 }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}</Selector>
        </label>
        {c.lvl >= c.subNivel && (
          <>
            <label>Subclase
              <Selector path="subclase" value={pj.subclase}>
                <option value="">Elige…</option>
                {subs.map(s => <option key={s.key} value={s.key}>{s.n}{s.lib ? ' (biblioteca)' : ''}</option>)}
                <option value="otra">Otra (escribe su nombre)</option>
              </Selector>
            </label>
            {pj.subclase === 'otra' && <label>Nombre de la subclase<CampoTexto path="subclaseNombre" value={pj.subclaseNombre} /></label>}
          </>
        )}
        {c.lvl < c.subNivel && subs.length > 0 && <p className="note">La subclase se elige a nivel {c.subNivel}.</p>}
        {pj.clase === 'brujo' && <Casilla path="pactoCadena" checked={pj.pactoCadena}>Tiene la invocación Pacto de la Cadena</Casilla>}
        {C.estilo && c.lvl >= C.estilo && (
          <label>Estilo de combate
            <Selector path="estilo" value={pj.estilo}>
              <option value="">Elige…</option>
              {C.estilos.map((k: string) => <option key={k} value={k}>{ESTILOS[k][0]}</option>)}
            </Selector>
          </label>
        )}
      </div>
      {pj.subclase === 'otra' && c.lvl >= c.subNivel && <p className="note">Agrega los rasgos de tu subclase en Rasgos propios.</p>}
      <h2 className="plain">Rasgos hasta nivel {c.lvl}</h2>
      {c.entries.filter((e: any) => e.grupo === 'clase' || e.grupo === 'sub').map((e: any, i: number) => <Entrada key={i} e={e} />)}
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
  const lista: [string, any][] = [...Object.entries(TRASFONDOS).filter(([, t]) => !t.custom), ...Object.entries(LIB.trasfondos), ['custom', TRASFONDOS.custom]];
  const items = lista.map(([k, t]) => {
    const sub = t.custom ? 'Arma el tuyo' : t.habs.join(' y ') + (t.lib ? ', biblioteca' : '');
    return { key: k, q: norm(t.n + ' ' + sub), node: <Tarjeta on={tb.key === k} onClick={() => elegir(k)} titulo={t.n} sub={sub} /> };
  });
  const cab = <><h2 className="plain">Trasfondo</h2><TarjetasBuscables que="trasfondo" items={items} /></>;
  if (!T) return cab;
  const abs: string[] = T.custom ? tb.abs : T.ab;
  const dotes = Object.entries(allDotes());
  const ds = c.entries.filter((e: any) => e.grupo === 'dote');
  return (
    <>
      {cab}
      <div className="form">
        {T.custom ? (
          <>
            <label>Nombre<CampoTexto path="trasfondo.nombre" value={tb.nombre} /></label>
            <label>Características que puede subir</label>
            <div className="row">{[0, 1, 2].map(i => <AbSel key={i} path={`trasfondo.abs.${i}`} value={tb.abs[i]} opts={ALL_AB} />)}</div>
            <label>Habilidades</label>
            <div className="row">{[0, 1].map(i => (
              <Selector key={i} path={`trasfondo.habs.${i}`} value={tb.habs[i]}>
                <option value="">Elige…</option>{SKILLS.map(([n]) => <option key={n} value={n}>{n}</option>)}
              </Selector>
            ))}</div>
            <label>Herramienta<CampoTexto path="trasfondo.herr" value={tb.herr} /></label>
          </>
        ) : <p>Habilidades: <b>{T.habs.join(' y ')}</b>. Herramienta: <b>{T.herr}</b>.</p>}
        <label>Cómo subes características
          <Selector path="trasfondo.modo" value={tb.modo !== '111' ? '21' : '111'}>
            <option value="21">+2 a una y +1 a otra</option><option value="111">+1 a las tres</option>
          </Selector>
        </label>
        {tb.modo !== '111' ? (
          <div className="row">
            <label>+2 a <AbSel path="trasfondo.a" value={tb.a} opts={abs.filter(Boolean)} /></label>
            <label>+1 a <AbSel path="trasfondo.b" value={tb.b} opts={abs.filter(k => k && k !== tb.a)} /></label>
          </div>
        ) : <p className="note">+1 a {abs.filter(Boolean).map(k => abInfo(k)[3]).join(', ') || 'las tres que elijas'}.</p>}
        <label>Dote de origen
          <Selector path="trasfondo.dote" value={tb.dote}>
            <option value="">Elige…</option>
            {dotes.map(([k, d]) => <option key={k} value={k}>{d.n}{!T.custom && T.dote === k ? ' (la de este trasfondo)' : ''}</option>)}
          </Selector>
        </label>
        {pj.especie.key === 'humano' && (
          <label>Dote extra por ser humano
            <Selector path="doteHumano" value={pj.doteHumano}>
              <option value="">Elige…</option>{dotes.map(([k, d]) => <option key={k} value={k}>{d.n}</option>)}
            </Selector>
          </label>
        )}
      </div>
      {ds.length > 0 && <><h2 className="plain">Dotes</h2>{ds.map((e: any, i: number) => <Entrada key={i} e={e} />)}</>}
    </>
  );
}
