/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { S, render } from '@/app-shell/estado';
import { modStr, norm, richT, sign, slug } from '@/shared/utils/texto';
import { AB, SKILLS, TIPOS, ORDEN_TIPOS, abInfo } from '@/features/reglas/data/caracteristicas';
import { COMUNES } from '@/features/reglas/data/comunes';
import { BotonTirada } from '@/features/dados/components/BotonTirada';
import { Ataque, ConjuroFila, Entrada, Recursos, Shape } from '../piezas';
import { abrirSubida, bajarArchivo, bajarNivel, borrarPj, irAPaso } from '../../acciones';

export const PASO_N: Record<string, string> = { especie: 'Especie', clase: 'Clase', trasfondo: 'Trasfondo', stats: 'Características', habs: 'Habilidades', equipo: 'Equipo', conjuros: 'Conjuros', rasgos: 'Rasgos propios', detalles: 'Detalles' };

function Turno({ c }: { c: any }) {
  const sp = S.pj.conjuros || [];
  return (
    <>
      <Recursos c={c} />
      <p className="note tip">Toca cualquier número con fondo para tirarlo.</p>
      {ORDEN_TIPOS.map(t => {
        const ents = c.entries.filter((e: any) => e.t === t), sps = sp.filter((s: any) => (s.tiempo || 'accion') === t), com = COMUNES[t] || [];
        if (!ents.length && !sps.length && !com.length && t !== 'accion') return null;
        const un = { nombre: 'Golpe sin armas', atk: c.unarmed.atk, expr: c.unarmed.expr, dmg: c.unarmed.dmg, notas: [`También puede Agarrar o Empujar (CD ${c.grappleDC})`] };
        return (
          <section key={t} className={`sec t-${t}`}>
            <div className="sec-h"><Shape t={t} /><h2>{TIPOS[t][0]}</h2></div>
            {TIPOS[t][1] && <p className="sec-d">{TIPOS[t][1]}</p>}
            {t === 'accion' && (
              <div className="atks">
                <div className="atks-h">Con la acción Atacar{c.extraAttack ? ' haces dos ataques' : ''}</div>
                {c.armas.map((a: any) => <Ataque key={'w' + a.i} a={a} />)}
                {(c.naturales || []).map((a: any, i: number) => <Ataque key={'n' + i} a={a} />)}
                <Ataque a={un} />
              </div>
            )}
            {ents.map((e: any, i: number) => <Entrada key={i} e={e} />)}
            {sps.length > 0 && <div className="sp-list">{sps.map((s: any, i: number) => <ConjuroFila key={i} s={s} c={c} />)}</div>}
            {com.length > 0 && (
              <details className="more"><summary>{t === 'accion' ? 'Acciones que cualquiera puede hacer' : 'Para cualquier personaje'}</summary>
                {com.map(([n, f]: [string, (c: any) => string]) => <Entrada key={n} e={{ t, nombre: n, texto: f(c), src: 'Reglas básicas' }} />)}
              </details>
            )}
          </section>
        );
      })}
    </>
  );
}

function Hoja({ c }: { c: any }) {
  const pj = S.pj, tb = pj.trasfondo, T = c.T;
  const exportar = () => bajarArchivo(slug(pj.nombre || 'personaje') + '.json', JSON.stringify(pj, null, 1));
  return (
    <>
      <h2 className="plain">Características</h2>
      <div className="grid6">
        {AB.map(([k, , ab, nm]) => (
          <div className="ab" key={k}>
            <BotonTirada expr={`1d20${modStr(c.m[k])}`} label={`Prueba de ${nm}`} className="abtn"><span>{ab} {c.sc[k]}</span><b>{sign(c.m[k])}</b></BotonTirada>
            <BotonTirada expr={`1d20${modStr(c.saves[k])}`} label={`Salvación de ${nm}`} className="svbtn">Salv. {sign(c.saves[k])}{c.saveProf.includes(k) ? ' ●' : ''}</BotonTirada>
          </div>
        ))}
      </div>
      <h2 className="plain">Habilidades</h2>
      <div className="list">
        {SKILLS.map(([n, a]) => {
          const k = norm(n);
          return (
            <BotonTirada key={n} expr={`1d20${modStr(c.skill[k])}`} label={n} className="li">
              <span><span className={`dot${c.skillProf[k] ? '' : ' off'}`} />{n}{c.skillPer[k] ? ' (pericia)' : ''} <span className="note">{a.toUpperCase()}</span></span>
              <b>{sign(c.skill[k])}</b>
            </BotonTirada>
          );
        })}
      </div>
      <div className="row"><BotonTirada expr="1d20" label="Salvación contra muerte" className="wide">Salvación contra muerte</BotonTirada></div>
      <h2 className="plain">Datos</h2>
      <div className="list"><dl className="kv">
        <div><dt>Armaduras: </dt><dd>{c.C?.arm || '—'}</dd></div>
        <div><dt>Armas: </dt><dd>{c.C?.armas || '—'}</dd></div>
        <div><dt>Herramientas: </dt><dd>{(T ? (T.custom ? tb.herr : T.herr) : '—') || '—'}</dd></div>
        <div><dt>Trasfondo: </dt><dd>{T ? (T.custom ? tb.nombre || 'Personalizado' : T.n) : '—'}</dd></div>
        <div><dt>Visión en la oscuridad: </dt><dd>{c.vision ? c.vision + ' pies' : 'no'}</dd></div>
        <div><dt>Alineamiento: </dt><dd>{pj.alineamiento || '—'}</dd></div>
        <div><dt>Dotes: </dt><dd>{c.dotes.map((d: any) => d.nombre).join(', ') || 'ninguna'}</dd></div>
        {c.casterAb && <div><dt>Conjuros: </dt><dd>CD {c.dcSpell}, {sign(c.atkSpell)} al ataque</dd></div>}
        {c.isMonk && <div><dt>CD de Focus: </dt><dd>{c.dcFocus}</dd></div>}
        {!!pj.oro && <div><dt>Oro: </dt><dd>{pj.oro}</dd></div>}
      </dl></div>
      {pj.inventario && <><h2 className="plain">Inventario</h2><div className="list"><p dangerouslySetInnerHTML={{ __html: richT(pj.inventario) }} /></div></>}
      {pj.historia && <><h2 className="plain">Historia</h2><div className="list"><p dangerouslySetInnerHTML={{ __html: richT(pj.historia) }} /></div></>}
      <div className="row no-print" style={{ marginTop: 22 }}>
        <button className="btn" onClick={() => { S.view = 'editor'; S.step = S.step || 'especie'; render(); window.scrollTo(0, 0); }}>Editar personaje</button>
        <button className="btn ghost" onClick={() => window.print()}>Imprimir o PDF</button>
        <button className="btn ghost" onClick={exportar}>Guardar respaldo</button>
        <button className="btn ghost" onClick={borrarPj}>Quitar de mi cuenta</button>
      </div>
    </>
  );
}

function ConjurosTab({ c }: { c: any }) {
  const sp = S.pj.conjuros || [];
  const cab = c.casterAb && (
    <div className="stats" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
      <div className="stat"><b>{c.dcSpell}</b><span>CD</span></div>
      <div className="stat"><BotonTirada expr={`1d20${modStr(c.atkSpell)}`} label="Ataque de conjuro" className="statb"><b>{sign(c.atkSpell)}</b><span>Ataque</span></BotonTirada></div>
      <div className="stat"><b>{abInfo(c.casterAb)[2]}</b><span>Característica</span></div>
    </div>
  );
  if (!sp.length) return <>{cab}<p className="note" style={{ marginTop: 18 }}>No hay conjuros. Agrégalos en Editar, paso Conjuros.</p></>;
  const niveles = [...new Set<number>(sp.map((s: any) => +s.nivel || 0))].sort((a, b) => a - b);
  return (
    <>
      {cab}
      {niveles.map(n => (
        <div key={n}>
          <h2 className="plain">{n === 0 ? 'Trucos' : `Nivel ${n}`}</h2>
          <div className="sp-list t-pasiva">{sp.filter((s: any) => (+s.nivel || 0) === n).map((s: any, i: number) => <ConjuroFila key={i} s={s} c={c} />)}</div>
        </div>
      ))}
    </>
  );
}

function Avisos({ c }: { c: any }) {
  if (!c.avisos.length) return <p className="note" style={{ marginTop: 18 }}>Todo en orden.</p>;
  return (
    <>
      {c.avisos.map((a: any, i: number) => (
        <div key={i} className={`warn${a.nivel === 'info' ? ' info' : ''}`}>
          <b>{a.t}</b>{a.txt}
          {a.paso && <><br /><button className="btn ghost small" onClick={() => irAPaso(a.paso)}>Ir a {PASO_N[a.paso]}</button></>}
        </div>
      ))}
    </>
  );
}

export function Ficha({ c }: { c: any }) {
  const pj = S.pj;
  const esp = pj.especie.key === 'custom' ? pj.especie.nombre : c.E ? c.E.n + (c.E.subs?.[c.esub] ? ` (${c.E.subs[c.esub].n})` : '') : '';
  const subN = c.SD ? c.SD.n : (pj.subclase === 'otra' && c.lvl >= c.subNivel ? pj.subclaseNombre : '');
  const who = `${esp || 'Sin especie'}. ${c.C ? `${c.C.n} de nivel ${c.lvl}` : 'Sin clase'}${subN ? `, ${subN}` : ''}${c.chain ? ', Pacto de la Cadena' : ''}.`;
  const nAv = c.avisos.filter((a: any) => a.nivel === 'aviso').length;
  const tabs: [string, string][] = [['turno', 'En tu turno'], ['hoja', 'Hoja'], ['conjuros', 'Conjuros'], ['revisar', 'Revisar']];
  const panel = (k: string, node: React.ReactNode) => <div className={`panel${S.tab === k ? ' on' : ''}`} data-panel={k}>{node}</div>;
  return (
    <>
      <section className="hero">
        <h1>{pj.nombre || 'Sin nombre'}</h1>
        <p className="who">{who}</p>
        <div className="stats">
          <div className="stat"><b>{c.ac}</b><span>CA</span></div>
          <div className="stat"><b>{c.hpMax}</b><span>PG máx.</span></div>
          <div className="stat"><BotonTirada expr={`1d20${modStr(c.init)}`} label="Iniciativa" className="statb"><b>{sign(c.init)}</b><span>Iniciativa</span></BotonTirada></div>
          <div className="stat"><b>{c.speed}</b><span>Pies ({Math.floor(c.speed / 5)} casillas)</span></div>
          <div className="stat"><b>{sign(c.pb)}</b><span>Competencia</span></div>
          <div className="stat"><b>{c.passive}</b><span>Percepción pasiva</span></div>
        </div>
        {c.C && (
          <div className="row no-print">
            {c.lvl < 20 && <button className="btn" onClick={abrirSubida}>Subir a nivel {c.lvl + 1}</button>}
            {c.lvl > 1 && <button className="btn ghost" onClick={bajarNivel}>Bajar a nivel {c.lvl - 1}</button>}
          </div>
        )}
      </section>
      <nav className="tabs" role="tablist">
        {tabs.map(([k, n]) => (
          <button key={k} className="tab" role="tab" aria-selected={S.tab === k} onClick={() => { S.tab = k; render(); }}>
            {n}{k === 'revisar' && nAv > 0 && <span className="badge">{nAv}</span>}
          </button>
        ))}
      </nav>
      {panel('turno', <Turno c={c} />)}
      {panel('hoja', <Hoja c={c} />)}
      {panel('conjuros', <ConjurosTab c={c} />)}
      {panel('revisar', <Avisos c={c} />)}
    </>
  );
}
