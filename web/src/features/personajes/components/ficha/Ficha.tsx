/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import type { ReactNode } from 'react';
import { S, render, irArriba } from '@/app-shell/estado';
import { modStr, norm, richT, sign, slug } from '@/shared/utils/texto';
import { Aviso, Boton, EncabezadoPagina, Insignia, Lista, PanelPestana, Pestanas, Plegable, Seccion, Tarjeta, cx } from '@/shared/ui/kit';
import { AB, SKILLS, TIPOS, ORDEN_TIPOS, abInfo } from '@/features/reglas/data/caracteristicas';
import { COMUNES } from '@/features/reglas/data/comunes';
import { textoArmaduras, textoArmas } from '@/features/reglas/domain/competencias';
import { FormaTipo } from '@/features/reglas/components/TipoAccion';
import { BotonTirada } from '@/features/dados/components/BotonTirada';
import { Ataque, ConjuroFila, ConjuroTarjeta, Entrada, Recursos } from '../piezas';
import { abrirSubida, bajarArchivo, bajarNivel, borrarPj, irAPaso } from '../../acciones';

export const PASO_N: Record<string, string> = { especie: 'Especie', clase: 'Clase', trasfondo: 'Trasfondo', stats: 'Características', habs: 'Habilidades', equipo: 'Equipo', conjuros: 'Conjuros', rasgos: 'Rasgos propios', detalles: 'Detalles' };

function Stat({ valor, etiqueta, children }: { valor?: ReactNode; etiqueta: string; children?: ReactNode }) {
  return (
    <div className="flex min-h-20 flex-col items-center justify-center bg-surface px-1 py-2 text-center">
      {children ?? <><b className="font-serif text-3xl font-extrabold leading-none">{valor}</b><span className="mt-1 text-xs text-muted">{etiqueta}</span></>}
    </div>
  );
}

function Turno({ c }: { c: any }) {
  const sp = c.conjuros || [];
  return (
    <>
      <Recursos c={c} />
      <p className="mt-3 text-sm text-muted">Toca cualquier número con fondo para tirarlo.</p>
      {ORDEN_TIPOS.map(t => {
        const ents = c.entries.filter((e: any) => e.t === t), sps = sp.filter((s: any) => (s.tiempo || 'accion') === t), com = COMUNES[t] || [];
        if (!ents.length && !sps.length && !com.length && t !== 'accion') return null;
        const un = { nombre: 'Golpe sin armas', atk: c.unarmed.atk, expr: c.unarmed.expr, dmg: c.unarmed.dmg, notas: [`También puede Agarrar o Empujar (CD ${c.grappleDC})`] };
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
                  {c.armas.map((a: any) => <Ataque key={'w' + a.i} a={a} />)}
                  {(c.naturales || []).map((a: any, i: number) => <Ataque key={'n' + i} a={a} />)}
                  <Ataque a={un} />
                </ul>
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

function Hoja({ c }: { c: any }) {
  const pj = S.pj, tb = pj.trasfondo, T = c.T;
  const exportar = () => bajarArchivo(slug(pj.nombre || 'personaje') + '.json', JSON.stringify(pj, null, 1));
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
      <Seccion titulo="Características" descripcion="Toca una para hacer una prueba; debajo, su salvación (● si eres competente).">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {AB.map(([k, , ab, nm]) => (
            <Tarjeta key={k} className="flex flex-col items-stretch gap-1 p-2 text-center">
              <BotonTirada expr={`1d20${modStr(c.m[k])}`} label={`Prueba de ${nm}`} estilo="bloque" className="py-1" ariaLabel={`Prueba de ${nm} (${c.sc[k]}), ${sign(c.m[k])}`}>
                <span className="block text-xs text-muted">{ab} {c.sc[k]}</span>
                <b className="block font-serif text-3xl font-extrabold leading-tight">{sign(c.m[k])}</b>
              </BotonTirada>
              <BotonTirada expr={`1d20${modStr(c.saves[k])}`} label={`Salvación de ${nm}`} className="text-sm"
                ariaLabel={`Salvación de ${nm}, ${sign(c.saves[k])}${c.saveProf.includes(k) ? ', competente' : ''}`}>
                Salv. {sign(c.saves[k])}{c.saveProf.includes(k) ? ' ●' : ''}
              </BotonTirada>
            </Tarjeta>
          ))}
        </div>
      </Seccion>
      <Seccion titulo="Habilidades" descripcion="● competente. Toca una para tirarla.">
        <Lista>
          {SKILLS.map(([n, a]) => {
            const k = norm(n);
            return (
              <li key={n}>
                <BotonTirada expr={`1d20${modStr(c.skill[k])}`} label={n} estilo="bloque" className="flex min-h-12 items-center justify-between px-1 text-left"
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
      <Seccion titulo="Datos">
        <Tarjeta><dl className="m-0 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {datos.map(([k, v]) => <div key={k}><dt className="text-sm font-bold text-muted">{k}</dt><dd className="m-0">{v}</dd></div>)}
        </dl></Tarjeta>
      </Seccion>
      {pj.inventario && <Seccion titulo="Inventario"><Tarjeta><p className="m-0" dangerouslySetInnerHTML={{ __html: richT(pj.inventario) }} /></Tarjeta></Seccion>}
      {pj.historia && <Seccion titulo="Historia"><Tarjeta><p className="m-0" dangerouslySetInnerHTML={{ __html: richT(pj.historia) }} /></Tarjeta></Seccion>}
      <div className="mt-8 flex flex-wrap gap-2 print:hidden">
        <Boton variante="primario" onClick={() => { S.view = 'editor'; S.step = S.step || 'especie'; render(); irArriba(); }}>Editar personaje</Boton>
        <Boton onClick={() => window.print()}>Imprimir o guardar PDF</Boton>
        <Boton onClick={exportar}>Descargar respaldo</Boton>
        <Boton variante="peligro" onClick={borrarPj}>Borrar personaje</Boton>
      </div>
    </>
  );
}

function ConjurosTab({ c }: { c: any }) {
  const sp = c.conjuros || [];
  const cab = c.casterAb && (
    <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-rule ring-1 ring-rule">
      <Stat valor={c.dcSpell} etiqueta="CD de conjuros" />
      <Stat etiqueta="Ataque">
        <BotonTirada expr={`1d20${modStr(c.atkSpell)}`} label="Ataque de conjuro" estilo="bloque" className="py-1">
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
  const esp = pj.especie.key === 'custom' ? pj.especie.nombre : c.E ? c.E.n + (c.E.subs?.[c.esub] ? ` (${c.E.subs[c.esub].n})` : '') : '';
  const subN = c.SD ? c.SD.n : (pj.subclase === 'otra' && c.lvl >= c.subNivel ? pj.subclaseNombre : '');
  const who = `${esp || 'Sin especie'}. ${c.C ? `${c.C.n} de nivel ${c.lvl}` : 'Sin clase'}${subN ? `, ${subN}` : ''}${c.chain ? ', Pacto de la Cadena' : ''}.`;
  const nAv = c.avisos.filter((a: any) => a.nivel === 'aviso').length;
  const tabs = [
    { id: 'turno', texto: 'En tu turno' }, { id: 'hoja', texto: 'Hoja' }, { id: 'conjuros', texto: 'Conjuros' },
    { id: 'revisar', texto: 'Revisar', insignia: nAv > 0 ? <Insignia etiqueta={`${nAv} cosas por elegir`}>{nAv}</Insignia> : undefined },
  ];
  return (
    <>
      <EncabezadoPagina id="titulo-vista" titulo={pj.nombre || 'Sin nombre'} subtitulo={who}>
        {c.C && c.lvl < 20 && <Boton variante="primario" onClick={abrirSubida}>Subir a nivel {c.lvl + 1}</Boton>}
        {c.C && c.lvl > 1 && <Boton onClick={bajarNivel}>Bajar a nivel {c.lvl - 1}</Boton>}
      </EncabezadoPagina>
      <div className="mb-4 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-rule ring-1 ring-rule sm:grid-cols-6">
        <Stat valor={c.ac} etiqueta="CA" />
        <Stat valor={c.hpMax} etiqueta="PG máximos" />
        <Stat etiqueta="Iniciativa">
          <BotonTirada expr={`1d20${modStr(c.init)}`} label="Iniciativa" estilo="bloque" className="h-full py-2" ariaLabel={`Tirar iniciativa, ${sign(c.init)}`}>
            <b className="block font-serif text-3xl font-extrabold leading-none underline decoration-dotted decoration-2 underline-offset-4">{sign(c.init)}</b>
            <span className="mt-1 block text-xs text-muted">Iniciativa</span>
          </BotonTirada>
        </Stat>
        <Stat valor={c.speed} etiqueta={`Pies (${Math.floor(c.speed / 5)} casillas)`} />
        <Stat valor={sign(c.pb)} etiqueta="Competencia" />
        <Stat valor={c.passive} etiqueta="Percepción pasiva" />
      </div>
      <Pestanas idBase="ficha" etiqueta="Secciones de la hoja" items={tabs} activa={S.tab} onCambiar={id => { S.tab = id; render(); }} />
      <PanelPestana idBase="ficha" activa={S.tab}>
        {S.tab === 'turno' && <Turno c={c} />}
        {S.tab === 'hoja' && <Hoja c={c} />}
        {S.tab === 'conjuros' && <ConjurosTab c={c} />}
        {S.tab === 'revisar' && <Avisos c={c} />}
      </PanelPestana>
      <div className="hidden print:block">
        {S.tab !== 'turno' && <Turno c={c} />}
        {S.tab !== 'hoja' && <Hoja c={c} />}
        {S.tab !== 'conjuros' && <ConjurosTab c={c} />}
      </div>
    </>
  );
}
