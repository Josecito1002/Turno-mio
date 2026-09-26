/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, type ReactNode } from 'react';
import { S, render, irArriba } from '@/app-shell/estado';
import { modStr, norm, richT, sign, slug } from '@/shared/utils/texto';
import { Aviso, Boton, Dialogo, Insignia, Lista, Plegable, Seccion, Tarjeta, cx, foco } from '@/shared/ui/kit';
import { AB, SKILLS, TIPOS, ORDEN_TIPOS, abInfo } from '@/features/reglas/data/caracteristicas';
import { COMUNES } from '@/features/reglas/data/comunes';
import { textoArmaduras, textoArmas } from '@/features/reglas/domain/competencias';
import { FormaTipo } from '@/features/reglas/components/TipoAccion';
import { BotonTirada } from '@/features/dados/components/BotonTirada';
import { useDados } from '@/features/dados/components/Bandeja';
import { Ataque, ConjuroFila, ConjuroTarjeta, Entrada, Recursos } from '../piezas';
import { abrirSubida, bajarArchivo, bajarNivel, borrarPj, irAPaso, moverPool, fijarPool } from '../../acciones';
import { desglose } from '../../domain/calculo';

/* De dónde sale el bono de una habilidad: la característica y la competencia (doble con pericia, o la mitad con Polivalente) */
function desgloseHabilidad(c: any, k: string, a: string) {
  const bardo = c.pj?.clase === 'bardo' && c.lvl >= 2 && !c.skillProf[k] ? Math.floor(c.pb / 2) : 0;
  return desglose([[c.m[a], a.toUpperCase()], [c.skillProf[k] ? c.pb * (c.skillPer[k] ? 2 : 1) : bardo,
    c.skillPer[k] ? 'competencia ×2 (pericia)' : c.skillProf[k] ? 'competencia' : 'Polivalente']]);
}
import { faltaParaSubir } from '../../domain/pendientes';
import { avisar } from '@/shared/ui/avisos';
import { Inventario } from '../Inventario';

export const PASO_N: Record<string, string> = { especie: 'Especie', clase: 'Clase', trasfondo: 'Trasfondo', stats: 'Características', habs: 'Habilidades', equipo: 'Equipo', conjuros: 'Conjuros', rasgos: 'Rasgos propios', detalles: 'Detalles' };

/* ---------- Íconos pequeños de la ficha (decorativos) ---------- */
const IconoV = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"><path d={d} /></svg>
);
const D_ESCUDO = 'M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z';
const D_CORAZON = 'M12 20.5s-7-4.3-9.2-8.7C1.2 8.4 2.4 5 6 5c2 0 3.7 1.2 6 3.6C14.3 6.2 16 5 18 5c3.6 0 4.8 3.4 3.2 6.8-2.2 4.4-9.2 8.7-9.2 8.7z';
const D_MENU = 'M4 6h16M4 12h16M4 18h16';

/** Una tarjeta de estadística vital, con ícono opcional. */
function Vital({ etiqueta, icono, className, children }: { etiqueta: string; icono?: string; className?: string; children: ReactNode }) {
  return (
    <div className={cx('flex flex-col items-center justify-center gap-1 rounded-2xl bg-surface p-3 text-center shadow-sm ring-1 ring-rule/60', className)}>
      <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-muted">
        {icono && <IconoV d={icono} />}{etiqueta}
      </span>
      {children}
    </div>
  );
}

/** Puntos de golpe con pasos rápidos (−5/−1/+1/+5), número editable y barra de vida. */
function TarjetaPG({ pg, usados }: { pg: { id: string; max: number }; usados: number }) {
  const left = pg.max - usados, frac = pg.max > 0 ? left / pg.max : 0;
  const barra = frac <= 0.25 ? 'bg-acc' : frac <= 0.5 ? 'bg-warn' : 'bg-adi';
  return (
    <Vital etiqueta="Puntos de golpe" icono={D_CORAZON} className="col-span-3 sm:col-span-2">
      <div className="flex items-center gap-1.5">
        <Boton tamano="sm" onClick={() => moverPool(pg.id, -5)} aria-label="−5 puntos de golpe">−5</Boton>
        <Boton tamano="sm" onClick={() => moverPool(pg.id, -1)} aria-label="−1 punto de golpe">−1</Boton>
        <input key={left} type="number" inputMode="numeric" min={0} max={pg.max} defaultValue={left} aria-label={`Puntos de golpe, quedan (de ${pg.max})`}
          onBlur={e => { if (+e.target.value !== left) fijarPool(pg.id, pg.max, e.target.value); }}
          onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
          className="w-16 rounded-lg border border-rule bg-bg px-1 py-1 text-center font-serif text-2xl font-extrabold text-ink" />
        <Boton tamano="sm" onClick={() => moverPool(pg.id, 1)} aria-label="+1 punto de golpe">+1</Boton>
        <Boton tamano="sm" onClick={() => moverPool(pg.id, 5)} aria-label="+5 puntos de golpe">+5</Boton>
      </div>
      <span className="text-xs text-muted">de {pg.max}</span>
      <div className="h-2 w-full overflow-hidden rounded-full bg-soft">
        <div className={cx('h-full rounded-full transition-all duration-300', barra)} style={{ width: `${Math.max(4, frac * 100)}%` }} />
      </div>
    </Vital>
  );
}

function Stat({ valor, etiqueta, children }: { valor?: ReactNode; etiqueta: string; children?: ReactNode }) {
  return (
    <div className="flex min-h-20 flex-col items-center justify-center bg-surface px-1 py-2 text-center">
      {children ?? <><b className="font-serif text-3xl font-extrabold leading-none">{valor}</b><span className="mt-1 text-xs text-muted">{etiqueta}</span></>}
    </div>
  );
}

function Turno({ c, tipos = ORDEN_TIPOS, principal }: { c: any; tipos?: string[]; principal?: boolean }) {
  const sp = c.conjuros || [];
  return (
    <>
      {principal && <Recursos c={c} />}
      {principal && <p className="mt-3 text-sm text-muted">Toca cualquier número con fondo para tirarlo.</p>}
      {tipos.map(t => {
        const ents = c.entries.filter((e: any) => e.t === t), sps = sp.filter((s: any) => (s.tiempo || 'accion') === t), com = COMUNES[t] || [];
        if (!ents.length && !sps.length && !com.length && t !== 'accion') return null;
        const un = { nombre: 'Golpe sin armas', atk: c.unarmed.atk, expr: c.unarmed.expr, dmg: c.unarmed.dmg, atkDesg: c.unarmed.atkDesg, dmgDesg: c.unarmed.dmgDesg, notas: [`También puede Agarrar o Empujar (CD ${c.grappleDC})`] };
        return (
          <section key={t} aria-labelledby={`sec-${t}`} className="mt-8">
            <div className="flex items-center gap-2.5">
              <FormaTipo t={t} className="size-4" />
              <h2 id={`sec-${t}`} className="m-0 font-serif text-2xl font-bold">{TIPOS[t][0]}</h2>
            </div>
            {TIPOS[t][1] && <p className="mb-2 ml-7 mt-0.5 text-sm text-muted">{TIPOS[t][1]}</p>}
            {t === 'accion' && (
              <Tarjeta className="border-l-4 border-acc px-4 py-1">
                <p className="m-0 pt-2 text-sm text-muted">Con la acción Atacar{c.extraAttack ? ' haces dos ataques' : ''}</p>
                <ul className="m-0 list-none divide-y divide-soft p-0">
                  {c.armas.filter((a: any) => a.mano).map((a: any) => <Ataque key={'w' + a.i} a={a} />)}
                  {(c.naturales || []).map((a: any, i: number) => <Ataque key={'n' + i} a={a} />)}
                  <Ataque a={un} />
                </ul>
                {c.armas.some((a: any) => !a.mano) && (
                  <Plegable titulo="Armas guardadas" nota="Sacar una es interactuar con un objeto. Cambia lo que empuñas en Equipo.">
                    <ul className="m-0 list-none divide-y divide-soft px-4 pb-2">
                      {c.armas.filter((a: any) => !a.mano).map((a: any) => <Ataque key={'g' + a.i} a={a} />)}
                    </ul>
                  </Plegable>
                )}
              </Tarjeta>
            )}
            {ents.map((e: any, i: number) => <Entrada key={i} e={e} />)}
            {sps.map((s: any, i: number) => <ConjuroTarjeta key={'s' + i} s={s} c={c} t={t} />)}
            {com.length > 0 && (
              <Plegable titulo={t === 'accion' ? 'Acciones que cualquiera puede hacer' : 'Para cualquier personaje'}>
                {com.map(([n, f]: [string, (c: any) => string]) => <Entrada key={n} e={{ t, nombre: n, texto: f(c), src: 'Reglas básicas' }} />)}
              </Plegable>
            )}
          </section>
        );
      })}
    </>
  );
}

/** Tarjeta de dados sueltos, para tiradas que no dependen del personaje. */
function TiradorRapido() {
  const tirar = useDados();
  return (
    <Tarjeta>
      <h2 className="m-0 mb-2 font-serif text-lg font-bold">Tirador rápido de dados</h2>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {[4, 6, 8, 10, 12, 20].map(n => (
          <button key={n} type="button" onClick={() => tirar(`1d${n}`, `d${n}`, { neutral: true })}
            className={cx('min-h-11 cursor-pointer rounded-xl bg-soft font-serif text-lg font-bold hover:bg-rule/60', foco)}>
            d{n}
          </button>
        ))}
      </div>
    </Tarjeta>
  );
}

function Caracteristicas({ c }: { c: any }) {
  return (
    <Seccion titulo="Características" descripcion="Toca una para hacer una prueba; debajo, su salvación (● si eres competente).">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {AB.map(([k, , ab, nm]) => (
          <Tarjeta key={k} className="flex flex-col items-stretch gap-1 p-2 text-center">
            <BotonTirada expr={`1d20${modStr(c.m[k])}`} label={`Prueba de ${nm}`} mods={desglose([[c.m[k], ab]])} estilo="bloque" className="py-1" ariaLabel={`Prueba de ${nm} (${c.sc[k]}), ${sign(c.m[k])}`}>
              <span className="block text-xs text-muted">{ab} {c.sc[k]}</span>
              <b className="block font-serif text-3xl font-extrabold leading-tight">{sign(c.m[k])}</b>
            </BotonTirada>
            <BotonTirada expr={`1d20${modStr(c.saves[k])}`} label={`Salvación de ${nm}`} className="text-sm"
              mods={desglose([[c.m[k], ab], [c.saveProf.includes(k) ? c.pb : 0, 'competencia']])}
              ariaLabel={`Salvación de ${nm}, ${sign(c.saves[k])}${c.saveProf.includes(k) ? ', competente' : ''}`}>
              Salv. {sign(c.saves[k])}{c.saveProf.includes(k) ? ' ●' : ''}
            </BotonTirada>
          </Tarjeta>
        ))}
      </div>
    </Seccion>
  );
}

function SentidosPasivos({ c }: { c: any }) {
  const inv = 10 + (c.skill['investigacion'] || 0), per = 10 + (c.skill['perspicacia'] || 0);
  return (
    <Tarjeta>
      <h2 className="m-0 mb-2 font-serif text-lg font-bold">Sentidos pasivos</h2>
      <dl className="m-0 flex flex-col gap-1.5 text-sm">
        {[['Percepción', c.passive], ['Investigación', inv], ['Intuición', per]].map(([n, v]) => (
          <div key={n as string} className="flex items-center justify-between rounded-lg bg-soft/60 px-2 py-1.5">
            <dt className="text-muted">{n}</dt><dd className="m-0 font-serif text-lg font-bold">{v}</dd>
          </div>
        ))}
      </dl>
    </Tarjeta>
  );
}

function Habilidades({ c }: { c: any }) {
  return (
    <Seccion titulo="Habilidades" descripcion="● competente. Toca una para tirarla.">
      <Lista>
        {SKILLS.map(([n, a]) => {
          const k = norm(n);
          return (
            <li key={n}>
              <BotonTirada expr={`1d20${modStr(c.skill[k])}`} label={n} mods={desgloseHabilidad(c, k, a)} estilo="bloque" className="flex min-h-12 items-center justify-between px-1 text-left"
                ariaLabel={`${n}${c.skillProf[k] ? ', competente' : ''}${c.skillPer[k] ? ', con pericia' : ''}: ${sign(c.skill[k])}`}>
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className={cx('size-2.5 rounded-full', c.skillProf[k] ? 'bg-ink' : 'ring-[1.5px] ring-inset ring-rule')} />
                  {n}{c.skillPer[k] ? ' (pericia)' : ''} <span className="text-xs text-muted">{a.toUpperCase()}</span>
                </span>
                <b className="font-serif text-lg tabular-nums">{sign(c.skill[k])}</b>
              </BotonTirada>
            </li>
          );
        })}
      </Lista>
      <div className="mt-3"><BotonTirada expr="1d20" label="Salvación contra muerte" className="px-4">Salvación contra muerte</BotonTirada></div>
    </Seccion>
  );
}

function DatosSeccion({ c }: { c: any }) {
  const pj = S.pj, tb = pj.trasfondo, T = c.T;
  const datos: [string, ReactNode][] = [
    ['Armaduras', textoArmaduras(c)], ['Armas', textoArmas(c)], ['Herramientas', c.herramientas.map((h: any) => h.que).join(', ') || '—'],
    ...(c.compFuentes.length ? [['Competencias de rasgos', c.compFuentes.map((f: any) => `${f.que} (${f.src})`).join(', ')] as [string, ReactNode]] : []),
    ['Trasfondo', T ? (T.custom ? tb.nombre || 'Personalizado' : T.n) : '—'], ['Visión en la oscuridad', c.vision ? c.vision + ' pies' : 'No'],
    ['Alineamiento', pj.alineamiento || '—'], ['Dotes', c.dotes.map((d: any) => d.nombre).join(', ') || 'Ninguna'],
  ];
  if (c.casterAb) datos.push(['Conjuros', `CD ${c.dcSpell}, ${sign(c.atkSpell)} al ataque`]);
  if (c.isMonk) datos.push(['CD de Focus', c.dcFocus]);
  if (pj.oro) datos.push(['Oro', pj.oro]);
  return (
    <>
      <Seccion titulo="Datos">
        <Tarjeta><dl className="m-0 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {datos.map(([k, v]) => <div key={k}><dt className="text-sm font-bold text-muted">{k}</dt><dd className="m-0">{v}</dd></div>)}
        </dl></Tarjeta>
      </Seccion>
      {pj.historia && <Seccion titulo="Historia"><Tarjeta><p className="m-0" dangerouslySetInnerHTML={{ __html: richT(pj.historia) }} /></Tarjeta></Seccion>}
    </>
  );
}

function ConjurosTab({ c }: { c: any }) {
  const sp = c.conjuros || [];
  const cab = c.casterAb && (
    <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-rule ring-1 ring-rule">
      <Stat valor={c.dcSpell} etiqueta="CD de conjuros" />
      <Stat etiqueta="Ataque">
        <BotonTirada expr={`1d20${modStr(c.atkSpell)}`} label="Ataque de conjuro" mods={desglose([[c.mSpell, c.casterAb.toUpperCase()], [c.pb, 'competencia']])} estilo="bloque" className="py-1">
          <b className="block font-serif text-3xl font-extrabold leading-none underline decoration-dotted decoration-2 underline-offset-4">{sign(c.atkSpell)}</b>
          <span className="mt-1 block text-xs text-muted">Ataque</span>
        </BotonTirada>
      </Stat>
      <Stat valor={abInfo(c.casterAb)[2]} etiqueta="Característica" />
    </div>
  );
  if (!sp.length) return <>{cab}<Aviso tipo="info" titulo="Sin conjuros" accion={<Boton onClick={() => irAPaso('conjuros')}>Elegir conjuros</Boton>}>Agrégalos en el paso Conjuros del editor.</Aviso></>;
  const niveles = [...new Set<number>(sp.map((s: any) => +s.nivel || 0))].sort((a, b) => a - b);
  return (
    <>
      {cab}
      {niveles.map(n => (
        <Seccion key={n} titulo={n === 0 ? 'Trucos' : `Nivel ${n}`}>
          <Lista>{sp.filter((s: any) => (+s.nivel || 0) === n).map((s: any, i: number) => <ConjuroFila key={i} s={s} c={c} />)}</Lista>
        </Seccion>
      ))}
    </>
  );
}

function Avisos({ c }: { c: any }) {
  if (!c.avisos.length) return <Aviso tipo="info" titulo="Todo en orden">No falta nada por elegir.</Aviso>;
  return (
    <>
      {c.avisos.map((a: any, i: number) => (
        <Aviso key={i} tipo={a.nivel === 'info' ? 'info' : 'aviso'} titulo={a.t}
          accion={a.paso && <Boton tamano="sm" onClick={() => irAPaso(a.paso)}>Ir a {PASO_N[a.paso]}</Boton>}>{a.txt}</Aviso>
      ))}
    </>
  );
}

export function Ficha({ c }: { c: any }) {
  const pj = S.pj;
  const [menu, setMenu] = useState(false);
  // Algunas acciones fuera de React (irAPaso) piden abrir Equipo directamente al llegar a la ficha
  const [verEquipo, setVerEquipo] = useState(() => { const abrir = S.tab === 'equipo'; S.tab = 'turno'; return abrir; });
  const [verRevisar, setVerRevisar] = useState(false);
  const esp = pj.especie.key === 'custom' ? pj.especie.nombre : c.E ? c.E.n + (c.E.subs?.[c.esub] ? ` (${c.E.subs[c.esub].n})` : '') : '';
  const subN = c.SD ? c.SD.n : (pj.subclase === 'otra' && c.lvl >= c.subNivel ? pj.subclaseNombre : '');
  const who = `${esp || 'Sin especie'}. ${c.C ? `${c.C.n} de nivel ${c.lvl}` : 'Sin clase'}${subN ? `, ${subN}` : ''}${c.chain ? ', Pacto de la Cadena' : ''}.`;
  const nAv = c.avisos.filter((a: any) => a.nivel === 'aviso').length;
  const falta = faltaParaSubir(c);
  const pg = c.recursos.find((r: any) => r.id === 'pg');
  const usedPg = Math.min(pj.used?.pg || 0, pg?.max || 0);
  // Con algo pendiente, el botón explica qué falta y lleva a Revisar
  const subir = () => {
    if (!falta.length) return abrirSubida();
    avisar(`No puedes subir de nivel: tienes elecciones pendientes (${falta.map((a: any) => a.t.toLowerCase()).join(', ')}). Míralas en Revisar.`, 'aviso');
    setVerRevisar(true);
  };
  const exportar = () => bajarArchivo(slug(pj.nombre || 'personaje') + '.json', JSON.stringify(pj, null, 1));
  const editar = () => { setMenu(false); S.view = 'editor'; S.step = S.step || 'especie'; render(); irArriba(); };
  return (
    <>
      {/* ---------- Identidad + vitales ---------- */}
      <div className="relative rounded-2xl bg-surface p-4 shadow-xl ring-1 ring-rule/60 sm:p-5">
        <button type="button" onClick={() => setMenu(true)} aria-label="Más opciones de la ficha"
          className={cx('absolute right-3 top-3 grid size-11 cursor-pointer place-items-center rounded-full text-muted hover:bg-soft hover:text-ink print:hidden', foco)}>
          <IconoV d={D_MENU} />
        </button>
        <div className="flex flex-col gap-4 pr-12 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="min-w-0 lg:shrink-0 lg:basis-96">
            {(esp || pj.alineamiento) && (
              <div className="mb-1 flex flex-wrap gap-1.5">
                {esp && <span className="rounded-full bg-soft px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-muted">{esp}</span>}
                {pj.alineamiento && <span className="rounded-full bg-soft px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-muted">{pj.alineamiento}</span>}
              </div>
            )}
            <h1 id="titulo-vista" tabIndex={-1} className="m-0 font-serif text-[clamp(1.75rem,6vw,2.5rem)] font-extrabold leading-tight text-adi outline-none [overflow-wrap:anywhere]">{pj.nombre || 'Sin nombre'}</h1>
            <p className="mb-0 mt-1 italic text-muted">{who}</p>
            <div className="mt-3 flex flex-wrap gap-2 print:hidden">
              {c.C && c.lvl < 20 && <Boton variante="primario" tamano="sm" onClick={subir} aria-disabled={falta.length > 0} className={falta.length ? 'opacity-60' : undefined}>Subir a nivel {c.lvl + 1}</Boton>}
              {c.C && c.lvl > 1 && <Boton tamano="sm" onClick={bajarNivel}>Bajar a nivel {c.lvl - 1}</Boton>}
            </div>
            {c.C && c.lvl < 20 && falta.length > 0 && (
              <p className="mb-0 mt-2 text-sm text-muted">Para subir de nivel falta elegir: {falta.map((a: any) => a.t.toLowerCase()).join(', ')}.</p>
            )}
          </div>
          <div className="grid min-w-0 grid-cols-3 gap-2 sm:grid-cols-6 lg:flex-1 lg:max-w-3xl">
            <Vital etiqueta="CA" icono={D_ESCUDO}><b className="font-serif text-3xl font-extrabold leading-none">{c.ac}</b></Vital>
            {pg ? <TarjetaPG pg={pg} usados={usedPg} /> : (
              <Vital etiqueta="Puntos de golpe" icono={D_CORAZON} className="col-span-3 sm:col-span-2"><b className="font-serif text-3xl font-extrabold leading-none">{c.hpMax}</b></Vital>
            )}
            <Vital etiqueta="Iniciativa">
              <BotonTirada expr={`1d20${modStr(c.init)}`} label="Iniciativa" mods={desglose(c.initPartes || [])} estilo="bloque" ariaLabel={`Tirar iniciativa, ${sign(c.init)}`}>
                <b className="block font-serif text-3xl font-extrabold leading-none underline decoration-dotted decoration-2 underline-offset-4">{sign(c.init)}</b>
              </BotonTirada>
            </Vital>
            <Vital etiqueta={`Pies (${Math.floor(c.speed / 5)} c.)`}><b className="font-serif text-3xl font-extrabold leading-none">{c.speed}</b></Vital>
            <Vital etiqueta="Competencia"><b className="font-serif text-3xl font-extrabold leading-none">{sign(c.pb)}</b></Vital>
          </div>
        </div>
      </div>

      {/* ---------- Características (fila de 6) ---------- */}
      <Caracteristicas c={c} />

      {/* ---------- Tablero de 3 columnas ---------- */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <div className="flex flex-col gap-6 lg:col-span-3">
          <SentidosPasivos c={c} />
          <Habilidades c={c} />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-6">
          <Turno c={c} tipos={ORDEN_TIPOS.filter(t => t !== 'pasiva')} principal />
          <TiradorRapido />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-3">
          <Seccion titulo="Conjuros"><ConjurosTab c={c} /></Seccion>
          <Turno c={c} tipos={['pasiva']} />
        </div>
      </div>

      <DatosSeccion c={c} />

      {/* ---------- Menú de opciones (esquina) ---------- */}
      <Dialogo abierto={menu} onCerrar={() => setMenu(false)} titulo="Más opciones" abajo>
        <ul className="m-0 grid list-none gap-2 p-0">
          <li><Boton className="w-full justify-between" onClick={() => { setMenu(false); setVerEquipo(true); }}>Equipo</Boton></li>
          <li><Boton className="w-full justify-between" onClick={() => { setMenu(false); setVerRevisar(true); }}>
            Revisar {nAv > 0 && <Insignia etiqueta={`${nAv} cosas por elegir`}>{nAv}</Insignia>}
          </Boton></li>
          <li><Boton className="w-full justify-start" onClick={editar}>Editar personaje</Boton></li>
          <li><Boton className="w-full justify-start" onClick={() => { setMenu(false); window.print(); }}>Imprimir o guardar PDF</Boton></li>
          <li><Boton className="w-full justify-start" onClick={() => { setMenu(false); exportar(); }}>Descargar respaldo</Boton></li>
          <li><Boton variante="peligro" className="w-full justify-start" onClick={() => { setMenu(false); borrarPj(); }}>Borrar personaje</Boton></li>
        </ul>
      </Dialogo>

      <Dialogo abierto={verEquipo} onCerrar={() => setVerEquipo(false)} titulo="Equipo" ancho="lg">
        <Inventario c={c} />
      </Dialogo>

      <Dialogo abierto={verRevisar} onCerrar={() => setVerRevisar(false)} titulo="Revisar">
        <Avisos c={c} />
      </Dialogo>

      <div className="hidden print:block">
        <Turno c={c} principal />
        <ConjurosTab c={c} />
      </div>
    </>
  );
}
