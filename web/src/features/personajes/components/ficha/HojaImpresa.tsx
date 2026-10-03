/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import type { ReactNode } from 'react';
import { cx } from '@/shared/ui/kit';
import { esc, norm, richT, sign } from '@/shared/utils/texto';
import { AB, SKILLS, TIPOS, ORDEN_TIPOS, abInfo } from '@/features/reglas/data/caracteristicas';
import { textoArmaduras, textoArmas } from '@/features/reglas/domain/competencias';
import { datosConjuro } from '../piezas';
import { MONEDAS, bolsaDe } from '../../domain/inventario';

/* La hoja en papel: solo se ve al imprimir (o guardar PDF). Tinta negra sobre blanco, compacta,
   con casillas para marcar a lápiz lo que se gasta en la partida. Nada interactivo. */

const metros = (pies: number) => `${String(Math.round(pies * 0.3 * 10) / 10).replace('.', ',')} m`;
/** Une frases con punto, sin duplicar el que ya traen. */
const frases = (xs: unknown[]) => xs.filter(Boolean).map(x => String(x).trim().replace(/\.+$/, '')).filter(Boolean).join('. ');
const html = (e: any) => ({ __html: e.raw ? richT(e.texto) : esc(e.texto) });

/** Casillas vacías para marcar a lápiz; las ya gastadas salen tachadas. */
function Casillas({ n, gastadas = 0, redondas }: { n: number; gastadas?: number; redondas?: boolean }) {
  return (
    <span className="inline-flex flex-wrap gap-[2pt] align-middle">
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className={cx('inline-grid size-[8pt] place-items-center border border-black text-[6pt] leading-none', redondas ? 'rounded-full' : 'rounded-[1pt]')}>
          {i < gastadas ? '✕' : ''}
        </span>
      ))}
    </span>
  );
}

/** Recuadro con título en versalitas. */
function Caja({ titulo, extra, className, children }: { titulo?: string; extra?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <section className={cx('break-inside-avoid rounded-[3pt] border border-black/70 px-[5pt] py-[4pt]', className)}>
      {titulo && (
        <h2 className="m-0 mb-[2pt] flex items-baseline justify-between gap-2 border-b border-black/30 pb-[1pt] font-sans text-[7pt] font-bold uppercase tracking-[0.08em]">
          <span>{titulo}</span>{extra && <span className="font-normal normal-case tracking-normal">{extra}</span>}
        </h2>
      )}
      {children}
    </section>
  );
}

/** Dato grande con su rótulo debajo (CA, iniciativa…). */
const Dato = ({ v, n, sub }: { v: ReactNode; n: string; sub?: ReactNode }) => (
  <div className="flex flex-col items-center justify-center rounded-[3pt] border border-black/70 px-[3pt] py-[3pt] text-center">
    <span className="font-serif text-[15pt] font-bold leading-none">{v}</span>
    <span className="mt-[2pt] text-[6.5pt] font-bold uppercase tracking-[0.06em]">{n}</span>
    {sub && <span className="text-[6.5pt] leading-tight text-black/70">{sub}</span>}
  </div>
);

/** Línea en blanco para escribir a mano. */
const Linea = ({ ancho = 'w-[30pt]' }: { ancho?: string }) => <span className={cx('inline-block border-b border-black align-bottom', ancho)}>&nbsp;</span>;

function Encabezado({ c }: { c: any }) {
  const pj = c.pj;
  const esp = pj.especie.key === 'custom' ? pj.especie.nombre : c.E ? c.E.n + (c.E.subs?.[c.esub] ? ` (${c.E.subs[c.esub].n})` : '') : '';
  const subN = c.SD ? c.SD.n : (pj.subclase === 'otra' && c.lvl >= c.subNivel ? pj.subclaseNombre : '');
  const clase = c.C ? `${c.C.n} ${c.lvl}${subN ? ` (${subN})` : ''}${c.chain ? ', Pacto de la Cadena' : ''}` : 'Sin clase';
  const tras = c.T ? (c.T.custom ? pj.trasfondo.nombre || 'Personalizado' : c.T.n) : '';
  const datos: [string, string][] = [['Clase y nivel', clase], ['Especie', esp || '—'], ['Trasfondo', tras || '—'], ['Alineamiento', pj.alineamiento || '—'], ['Jugador', pj.jugador || '']];
  return (
    <header className="flex items-end gap-[8pt] border-b-2 border-black pb-[4pt]">
      <div className="min-w-0 flex-1">
        <h1 className="m-0 font-serif text-[22pt] font-bold leading-tight [overflow-wrap:anywhere]">{pj.nombre || 'Sin nombre'}</h1>
        <dl className="m-0 mt-[2pt] grid grid-cols-5 gap-x-[6pt] text-[8pt]">
          {datos.map(([k, v]) => (
            <div key={k} className="min-w-0">
              <dd className="m-0 min-h-[10pt] border-b border-black/50 font-semibold">{v}</dd>
              <dt className="text-[6pt] uppercase tracking-[0.06em] text-black/70">{k}</dt>
            </div>
          ))}
        </dl>
      </div>
      <div className="flex shrink-0 flex-col items-center text-[6.5pt] font-bold uppercase">
        <Casillas n={1} gastadas={pj.inspiracion ? 1 : 0} />
        <span className="mt-[2pt]">Inspiración</span>
      </div>
    </header>
  );
}

function Vitales({ c }: { c: any }) {
  const pj = c.pj;
  const pg = c.recursos.find((r: any) => r.id === 'pg');
  const max = pg?.max ?? c.hpMax, actual = max - Math.min(pj.used?.pg || 0, max), temp = Math.max(0, +pj.pgTemp || 0);
  const dgUsados = Math.min(pj.used?.['dados-golpe'] || 0, c.lvl);
  const armadura = [c.armor?.n || 'Sin armadura', c.shield && 'escudo'].filter(Boolean).join(' y ');
  return (
    <div className="mt-[6pt] grid grid-cols-[repeat(5,minmax(0,1fr))_minmax(0,2.4fr)_minmax(0,1.6fr)] gap-[4pt]">
      <Dato v={c.ac} n="Clase de armadura" sub={armadura} />
      <Dato v={sign(c.init)} n="Iniciativa" />
      <Dato v={c.speed} n="Velocidad (pies)" sub={metros(c.speed)} />
      <Dato v={sign(c.pb)} n="Bono de competencia" />
      <Dato v={c.passive} n="Percepción pasiva" />
      <div className="rounded-[3pt] border border-black/70 px-[5pt] py-[3pt]">
        <div className="text-[6.5pt] font-bold uppercase tracking-[0.06em]">Puntos de golpe</div>
        <div className="mt-[2pt] grid grid-cols-3 gap-[4pt] text-center">
          <div><div className="font-serif text-[15pt] font-bold leading-none">{max}</div><div className="text-[6pt] uppercase">Máximo</div></div>
          <div><div className="min-h-[15pt] border-b border-black font-serif text-[12pt] leading-none">{actual !== max ? actual : ''}</div><div className="text-[6pt] uppercase">Actuales</div></div>
          <div><div className="min-h-[15pt] border-b border-black font-serif text-[12pt] leading-none">{temp || ''}</div><div className="text-[6pt] uppercase">Temporales</div></div>
        </div>
      </div>
      <div className="rounded-[3pt] border border-black/70 px-[5pt] py-[3pt] text-[7pt]">
        <div className="flex items-baseline justify-between gap-1"><b className="text-[6.5pt] uppercase tracking-[0.06em]">Dados de golpe</b><b>{c.lvl}d{c.die}</b></div>
        <div className="mt-[1pt]"><Casillas n={Math.min(c.lvl, 20)} gastadas={dgUsados} /></div>
        <div className="mt-[3pt] text-[6.5pt] font-bold uppercase tracking-[0.06em]">Salvaciones contra muerte</div>
        <div className="flex flex-wrap items-center gap-x-[6pt]">
          <span>Éxitos <Casillas n={3} redondas gastadas={Math.min(3, pj.used?.['muerte-exitos'] || 0)} /></span>
          <span>Fallos <Casillas n={3} redondas gastadas={Math.min(3, pj.used?.['muerte-fallos'] || 0)} /></span>
        </div>
      </div>
    </div>
  );
}

function Caracteristicas({ c }: { c: any }) {
  return (
    <div className="mt-[6pt] grid grid-cols-6 gap-[4pt]">
      {AB.map(([k, , , nm]) => {
        const prof = c.saveProf.includes(k);
        return (
          <div key={k} className="break-inside-avoid rounded-[3pt] border border-black/70 px-[3pt] py-[3pt] text-center">
            <div className="text-[6.5pt] font-bold uppercase tracking-[0.06em]">{nm}</div>
            <div className="font-serif text-[17pt] font-bold leading-tight">{sign(c.m[k])}</div>
            <div className="mx-auto w-fit rounded-full border border-black px-[5pt] text-[8pt] font-semibold">{c.sc[k]}</div>
            <div className="mt-[2pt] text-[7pt]">{prof ? '● ' : '○ '}Salvación <b>{sign(c.saves[k])}</b></div>
          </div>
        );
      })}
    </div>
  );
}

function Habilidades({ c }: { c: any }) {
  return (
    <Caja titulo="Habilidades" extra="● competente · ◆ pericia">
      <ul className="m-0 list-none p-0 text-[7.5pt] leading-[1.35]">
        {SKILLS.map(([n, a]) => {
          const k = norm(n), prof = !!c.skillProf[k], per = !!c.skillPer[k];
          return (
            <li key={n} className="flex items-baseline gap-[3pt]">
              <span className="w-[8pt] shrink-0 text-center">{per ? '◆' : prof ? '●' : '○'}</span>
              <span className="w-[16pt] shrink-0 text-right font-bold tabular-nums">{sign(c.skill[k])}</span>
              <span className={cx('min-w-0', prof && 'font-semibold')}>{n} <span className="text-[6pt] text-black/60">{a.toUpperCase()}</span></span>
            </li>
          );
        })}
      </ul>
    </Caja>
  );
}

function Sentidos({ c }: { c: any }) {
  const filas: [string, ReactNode][] = [
    ['Percepción pasiva', c.passive], ['Investigación pasiva', 10 + (c.skill['investigacion'] || 0)], ['Perspicacia pasiva', 10 + (c.skill['perspicacia'] || 0)],
  ];
  return (
    <Caja titulo="Sentidos">
      <dl className="m-0 text-[7.5pt] leading-[1.35]">
        {filas.map(([k, v]) => <div key={k} className="flex justify-between gap-2"><dt>{k}</dt><dd className="m-0 font-bold">{v}</dd></div>)}
        {c.vision > 0 && <div className="flex justify-between gap-2"><dt>Visión en la oscuridad</dt><dd className="m-0 font-bold">{c.vision} pies</dd></div>}
      </dl>
    </Caja>
  );
}

function Competencias({ c }: { c: any }) {
  const datos: [string, ReactNode][] = [
    ['Armaduras', textoArmaduras(c)], ['Armas', textoArmas(c)], ['Herramientas', c.herramientas.map((h: any) => h.que).join(', ') || '—'],
    ...(c.compFuentes.length ? [['De rasgos', c.compFuentes.map((f: any) => `${f.que} (${f.src})`).join(', ')] as [string, ReactNode]] : []),
    ['Dotes', c.dotes.map((d: any) => d.nombre).join(', ') || 'Ninguna'],
  ];
  if (c.isMonk) datos.push(['CD de Focus', c.dcFocus]);
  return (
    <Caja titulo="Competencias">
      <dl className="m-0 space-y-[2pt] text-[7.5pt] leading-[1.3]">
        {datos.map(([k, v]) => <div key={k}><dt className="inline font-bold">{k}: </dt><dd className="m-0 inline">{v}</dd></div>)}
      </dl>
    </Caja>
  );
}

function Ataques({ c }: { c: any }) {
  const sinArmas = { nombre: 'Golpe sin armas', atk: c.unarmed.atk, dmg: c.unarmed.dmg, notas: [`Agarrar o Empujar: CD ${c.grappleDC}`] };
  const filas = [...c.armas.filter((a: any) => a.mano), ...(c.naturales || []), sinArmas, ...c.armas.filter((a: any) => !a.mano).map((a: any) => ({ ...a, guardada: true }))];
  const ataques = c.pj?.clase === 'guerrero' ? (c.lvl >= 20 ? 4 : c.lvl >= 11 ? 3 : 2) : 2;
  return (
    <Caja titulo="Ataques" extra={c.extraAttack ? `Ataque Extra: ${ataques} ataques por acción de Atacar` : undefined}>
      <table className="w-full border-collapse text-[7.5pt] leading-[1.3]">
        <thead>
          <tr className="text-left text-[6pt] uppercase tracking-[0.06em]">
            <th className="pb-[1pt] pr-[4pt] font-bold">Arma</th><th className="pb-[1pt] pr-[4pt] font-bold">Ataque / CD</th><th className="pb-[1pt] pr-[4pt] font-bold">Daño</th><th className="pb-[1pt] pr-[4pt] font-bold">Notas</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((a: any, i: number) => {
            const notas = frases([a.w?.dist && 'A distancia', ...(a.notas || []), a.maestria, a.guardada && 'Guardada']);
            return (
              <tr key={i} className="break-inside-avoid border-t border-black/20 align-top">
                <td className="py-[1.5pt] pr-[4pt] font-semibold">{a.nombre}</td>
                <td className="whitespace-nowrap py-[1.5pt] pr-[4pt] font-bold">{a.cd != null ? `CD ${a.cd} ${a.salv || ''}` : sign(a.atk)}</td>
                <td className="py-[1.5pt] pr-[4pt]">{a.dmg}{a.v ? ` (a dos manos ${a.v.dmg})` : ''}</td>
                <td className="py-[1.5pt] text-[7pt]">{notas}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Caja>
  );
}

function Recursos({ c }: { c: any }) {
  const u = c.pj.used || {};
  const rs = c.recursos.filter((r: any) => r.id !== 'pg' && !/^slot\d/.test(r.id));
  if (!rs.length) return null;
  return (
    <Caja titulo="Recursos" extra="marca lo que gastas">
      <ul className="m-0 list-none space-y-[2pt] p-0 text-[7.5pt] leading-[1.3]">
        {rs.map((r: any) => {
          const nota = r.nota || (r.reset === 'corto' ? 'Vuelve con descanso corto' : 'Vuelve con descanso largo');
          const gastados = Math.min(u[r.id] || 0, r.max);
          return (
            <li key={r.id} className="flex flex-wrap items-center justify-between gap-x-[6pt]">
              <span><b>{r.nombre}</b> <span className="text-[6.5pt] text-black/70">{nota}</span></span>
              {r.max <= 20 ? <Casillas n={r.max} gastadas={gastados} /> : <span>Quedan <Linea /> de {r.max}</span>}
            </li>
          );
        })}
      </ul>
    </Caja>
  );
}

function Magia({ c }: { c: any }) {
  const sp = c.conjuros || [];
  const slots = c.recursos.filter((r: any) => /^slot\d/.test(r.id));
  if (!sp.length && !slots.length && !c.casterAb) return null;
  const ab = c.casterAb ? abInfo(c.casterAb)[2] : '';
  const orden = [...sp].sort((a: any, b: any) => (+a.nivel || 0) - (+b.nivel || 0));
  return (
    <Caja titulo={`Magia${ab ? ` · ${ab}` : ''}`} extra={c.casterAb ? <>CD de salvación <b>{c.dcSpell}</b> · Ataque de conjuro <b>{sign(c.atkSpell)}</b></> : undefined}>
      {slots.length > 0 && (
        <div className="mb-[3pt] flex flex-wrap gap-x-[10pt] gap-y-[2pt] text-[7.5pt]">
          {slots.map((r: any) => {
            const nivel = r.id.replace('slot', '');
            const titulo = !r.nombre || /^Espacios de nivel/.test(r.nombre) ? `Nivel ${nivel}` : r.nombre;
            return <span key={r.id} className="whitespace-nowrap"><b>{titulo}</b> <Casillas n={r.max} gastadas={Math.min(c.pj.used?.[r.id] || 0, r.max)} redondas /></span>;
          })}
        </div>
      )}
      {sp.length > 0 && (
        <table className="w-full border-collapse text-[7.5pt] leading-[1.3]">
          <thead>
            <tr className="text-left text-[6pt] uppercase tracking-[0.06em]">
              <th className="pb-[1pt] pr-[4pt] font-bold">Nv.</th><th className="pb-[1pt] pr-[4pt] font-bold">Conjuro</th><th className="pb-[1pt] pr-[4pt] font-bold">Tiempo</th><th className="pb-[1pt] pr-[4pt] font-bold">Alcance, duración y notas</th>
            </tr>
          </thead>
          <tbody>
            {orden.map((s: any, i: number) => {
              const d = datosConjuro(s, c), nv = +s.nivel || 0;
              const notas = frases([d.bits.slice(1).join(', '), d.meta, s.coste, d.dexpr && `Dados: ${d.dexpr}`, s.rasgo && `De ${s.rasgo}`]);
              return (
                <tr key={s.nombre + i} className="break-inside-avoid border-t border-black/20 align-top">
                  <td className="py-[1.5pt] pr-[4pt] font-bold">{nv === 0 ? 'T' : nv}</td>
                  <td className="py-[1.5pt] pr-[4pt] font-semibold">{s.nombre}</td>
                  <td className="whitespace-nowrap py-[1.5pt] pr-[4pt]">{TIPOS[s.tiempo || 'accion']?.[0]}</td>
                  <td className="py-[1.5pt] text-[7pt]">{notas}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Caja>
  );
}

/** Lo que puede hacer en su turno, por tipo de acción, y los rasgos pasivos. */
function Rasgos({ c }: { c: any }) {
  const grupos = ORDEN_TIPOS.map(t => [t, c.entries.filter((e: any) => e.t === t)] as const).filter(([, ents]) => ents.length);
  if (!grupos.length) return null;
  return (
    <div className="mt-[6pt] columns-2 gap-[6pt] [column-fill:balance]">
      {grupos.map(([t, ents]) => (
        <section key={t} className="mb-[6pt]">
          <h2 className="m-0 mb-[2pt] break-after-avoid border-b border-black pb-[1pt] font-serif text-[11pt] font-bold leading-tight">
            {t === 'pasiva' ? 'Rasgos de especie, clase y dotes' : TIPOS[t][0]}
            {TIPOS[t][1] && t !== 'pasiva' && <span className="block font-sans text-[6.5pt] font-normal leading-tight text-black/70">{TIPOS[t][1]}</span>}
          </h2>
          {ents.map((e: any, i: number) => (
            <article key={e.nombre + i} className="mb-[3pt] break-inside-avoid text-[7.5pt] leading-[1.3]">
              <b className="font-serif text-[9pt]">{e.nombre}</b>
              {e.coste && <span className="ml-[3pt] text-[6.5pt] font-bold uppercase">{e.coste}</span>}
              {e.roll && <span className="ml-[3pt] text-[7pt]">Ataque {e.roll[0].replace(/^1d20\s*/, '') || '+0'}{e.roll[1] ? `, daño ${e.roll[1]}` : ''}</span>}
              <span className="m-0 block" dangerouslySetInnerHTML={html(e)} />
              {e.src && <span className="block text-[6pt] uppercase tracking-[0.05em] text-black/60">{e.src}</span>}
            </article>
          ))}
        </section>
      ))}
    </div>
  );
}

function Equipo({ c }: { c: any }) {
  const pj = c.pj, b = bolsaDe(pj);
  const armas = c.armas.map((a: any) => a.nombre + (a.mano ? '' : ' (guardada)')).join(', ');
  const magicos = (c.magicos || []).map(({ m, d }: any) => `${+m.q > 1 ? m.q + ' ' : ''}${d.n}${d.sint ? (m.sint ? ' (sintonizado)' : ' (sin sintonizar)') : ''}`).join(', ');
  const objetos = (pj.objetos || []).map((o: any) => (+o.q > 1 ? o.q + ' ' : '') + o.n).join(', ');
  const datos: [string, ReactNode][] = [
    ['Armas', armas || '—'], ['Armadura', [c.armor?.n || 'Ninguna', c.shield && 'escudo'].filter(Boolean).join(' y ')],
    ...(magicos ? [['Objetos mágicos', magicos] as [string, ReactNode]] : []),
    ...(objetos ? [['Objetos', objetos] as [string, ReactNode]] : []),
    ...(pj.inventario ? [['Notas', <span key="n" dangerouslySetInnerHTML={{ __html: richT(pj.inventario) }} />] as [string, ReactNode]] : []),
  ];
  return (
    <Caja titulo="Equipo">
      <dl className="m-0 space-y-[2pt] text-[7.5pt] leading-[1.3]">
        {datos.map(([k, v]) => <div key={k}><dt className="inline font-bold">{k}: </dt><dd className="m-0 inline">{v}</dd></div>)}
      </dl>
      <div className="mt-[4pt] grid grid-cols-4 gap-[3pt] text-center text-[7pt]">
        {MONEDAS.map(([k, n]) => (
          <div key={k} className="rounded-[2pt] border border-black/50 py-[1pt]">
            <div className="min-h-[10pt] font-bold">{b[k] || ''}</div>
            <div className="text-[5.5pt] uppercase">{n}</div>
          </div>
        ))}
      </div>
    </Caja>
  );
}

function Criaturas({ c }: { c: any }) {
  if (!c.criaturas?.length) return null;
  return (
    <Caja titulo="Familiares y criaturas">
      <ul className="m-0 list-none p-0 text-[7.5pt] leading-[1.35]">
        {c.criaturas.map((x: any) => (
          <li key={x.id} className="flex justify-between gap-2">
            <b>{x.nombre}</b><span>{x.ca != null && <>CA <b>{x.ca}</b> · </>}PG máx. <b>{x.pgMax}</b> · actuales <Linea ancho="w-[20pt]" /></span>
          </li>
        ))}
      </ul>
    </Caja>
  );
}

export function HojaImpresa({ c }: { c: any }) {
  const pj = c.pj;
  return (
    <article className="hidden bg-white font-sans text-black [print-color-adjust:exact] print:block">
      <Encabezado c={c} />
      <Vitales c={c} />
      <Caracteristicas c={c} />
      <div className="mt-[6pt] grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-start gap-[6pt]">
        <div className="flex flex-col gap-[6pt]">
          <Habilidades c={c} />
          <Sentidos c={c} />
          <Competencias c={c} />
        </div>
        <div className="flex flex-col gap-[6pt]">
          <Ataques c={c} />
          <Recursos c={c} />
          <Magia c={c} />
          <Equipo c={c} />
          <Criaturas c={c} />
        </div>
      </div>
      <Rasgos c={c} />
      {pj.historia && (
        <Caja titulo="Historia" className="mt-[6pt]">
          <p className="m-0 text-[7.5pt] leading-[1.35]" dangerouslySetInnerHTML={{ __html: richT(pj.historia) }} />
        </Caja>
      )}
      <Caja titulo="Notas de la partida" className="mt-[6pt]">
        <div className="h-[90pt]" />
      </Caja>
    </article>
  );
}
