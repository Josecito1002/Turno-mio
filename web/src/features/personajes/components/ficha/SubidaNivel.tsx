/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { S } from '@/app-shell/estado';
import { sign } from '@/shared/utils/texto';
import { TIPOS } from '@/features/reglas/data/caracteristicas';
import { useDados } from '@/features/dados/components/Bandeja';
import { compute } from '../../domain/calculo';
import { Shape } from '../piezas';
import { CampoNumero } from '../editor/campos';
import { cerrarSubida, confirmarSubida, deshacerSubida, irAPaso, pgPromedio, tirarPg } from '../../acciones';

const PEND = /subclase|estilo|mejora|pericia|conjuro|truco|maestr/;
const normT = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

function Elegir({ c }: { c: any }) {
  const subN = c.SD ? c.SD.n : '';
  return (
    <>
      <header className="modal-h"><span className="lvl-badge">{c.lvl}</span><div><h2>Subir de nivel</h2><p className="note">{S.pj.nombre || 'Tu personaje'}, nivel {c.lvl} de 20</p></div></header>
      <p>Elige qué clase gana el nivel:</p>
      <button className="opcion" onClick={confirmarSubida}><b>{c.C?.n || 'Clase'}{subN ? `, ${subN}` : ''}</b><span>Nivel {c.lvl} → {c.lvl + 1}</span></button>
      <div className="modal-f"><button className="btn ghost" onClick={cerrarSubida}>Cancelar</button></div>
    </>
  );
}

function Hecho({ c, s }: { c: any; s: any }) {
  const tirar = useDados();
  const pj = S.pj, i = c.lvl - 2, die = c.die, con = c.m.con;
  const delta = c.hpMax - s.hpAntes, v = pj.pgTiradas?.[i];
  let base: number, modo: string;
  if (pj.pgModo === 'maximo') { base = die; modo = 'max'; }
  else if (pj.pgModo === 'tiradas' && v) { base = v; modo = 'tirada'; }
  else { base = die / 2 + 1; modo = 'prom'; }
  const extra = delta - Math.max(1, base + con);
  const desglose = `${modo === 'max' ? 'Máximo del dado' : modo === 'tirada' ? 'Tirada' : 'Promedio'} ${base} ${con >= 0 ? '+' : '−'} ${Math.abs(con)} de CON${extra > 0 ? ` + ${extra} de rasgos` : ''}`;
  const grupos: [string, string][] = [['clase', `Rasgos de ${c.C?.n || 'clase'}`], ['sub', c.SD ? `Rasgos de ${c.SD.n}` : 'Rasgos de subclase'], ['especie', 'De tu especie'], ['dote', 'De tus dotes'], ['extra', 'Rasgos propios']];
  const lista = grupos.map(([g, t]) => {
    const xs = s.nuevos.filter((n: any) => n.grupo === g);
    return xs.length ? (
      <div className="gan-g" key={g}><span className="note">{t}</span>
        <ul>{xs.map((n: any, k: number) => (
          <li key={k}><b>{n.nombre}</b>
            {n.t && <> <span className={`tchip t-${n.t}`}><Shape t={n.t} />{TIPOS[n.t][0]}</span></>}
            {n.texto && <span>{String(n.texto).split(/(?<=[.;])\s+/)[0]}</span>}
          </li>
        ))}</ul>
      </div>
    ) : null;
  }).filter(Boolean);
  const pend = c.avisos.filter((a: any) => PEND.test(normT(a.t)));
  return (
    <>
      <header className="modal-h"><span className="lvl-badge up">{c.lvl}</span>
        <div><h2>¡Subiste a nivel {c.lvl}!</h2><p className="note">{c.C?.n || ''}: nivel {c.lvl - 1} → {c.lvl}{c.pb > s.pbAntes ? `. Tu competencia sube a ${sign(c.pb)}` : ''}</p></div>
      </header>
      <section className="gan"><h3>Puntos de golpe</h3>
        <p className="gan-big">+{delta} <span className="note">ahora tienes {c.hpMax} máximos</span></p><p className="note">{desglose}</p>
        <div className="pg-opc">
          <button className={`segb${modo === 'prom' ? ' on' : ''}`} onClick={pgPromedio}>Promedio ({die / 2 + 1})</button>
          <button className={`segb${modo === 'tirada' ? ' on' : ''}`} onClick={() => tirarPg(tirar, i)}>{modo === 'tirada' ? 'Volver a tirar' : `Tirar d${die}`}</button>
          <label className="pg-mano">A mano<CampoNumero path={`pgTiradas.${i}`} value={modo === 'tirada' ? v : ''} min={1} max={die} placeholder="—" aria-label="Resultado de tu dado" /></label>
        </div>
      </section>
      <section className="gan"><h3>Rasgos nuevos</h3>{lista.length ? lista : <p className="note">Este nivel no trae rasgos nuevos cargados.</p>}</section>
      {pend.length > 0 && (
        <section className="gan"><h3>Te toca elegir</h3>
          <div className="row">{pend.map((a: any, k: number) => <button key={k} className="btn small" onClick={() => irAPaso(a.paso || 'clase')}>{a.t}</button>)}</div>
        </section>
      )}
      <div className="modal-f"><button className="btn ghost" onClick={deshacerSubida}>Deshacer</button><button className="btn" onClick={cerrarSubida}>Ver la hoja</button></div>
    </>
  );
}

/** Modal de subida de nivel (fase 'elegir' y fase 'hecho'). */
export function SubidaNivel() {
  const s = S.subida;
  if (!s || !S.pj || s.id !== S.pj.id || (S.view !== 'ficha' && S.view !== 'editor')) return null;
  const c = compute(S.pj);
  return (
    <>
      <div className="modal-back" />
      <section className="modal" role="dialog" aria-modal="true" aria-label="Subida de nivel">
        {s.fase === 'elegir' ? <Elegir c={c} /> : <Hecho c={c} s={s} />}
      </section>
    </>
  );
}
