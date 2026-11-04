/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { S } from '@/app-shell/estado';
import { Boton, Simbolo, claseCampo, cx } from '@/shared/ui/kit';
import { PopupTarjeta } from '@/shared/ui/PopupGrande';
import { avisar } from '@/shared/ui/avisos';
import { modStr, norm } from '@/shared/utils/texto';
import { AB } from '@/features/reglas/data/caracteristicas';
import { CampoTirada, totalTirada } from '@/features/dados/components/CampoTirada';
import { responderSalvacionMesa } from '@/features/mesa/api';
import { aplicarEfecto, avisosGrandes, condicionesMias, confirmarDano, reaccionesALaSalvacion, type AvisoGrande } from './ordenes-dm';
import { fallaSola } from '@/features/mesa/domain/condiciones';
import { setVal } from '../../acciones';
import { textoDuracion } from '@/features/mesa/domain/duracion';
import { concentracionActual, terminarConcentracion, ventajaConcentracion } from './concentracion';
import { resultadoReaccion } from '@/features/mesa/domain/reacciones';

const nombreAb = (k: string) => AB.find(([x]) => x === k)?.[3] || k.toUpperCase();
const abrevAb = (k: string) => AB.find(([x]) => x === k)?.[2] || k.toUpperCase();

/** Lo que le pasa al personaje en combate, en grande y de a uno: daño o curación recibidos, una salvación que debe
 *  tirar y lo que le cuenta su DM. */
export function AvisosGrandes() {
  const lista = useSyncExternalStore(avisosGrandes.suscribir, avisosGrandes.lista, avisosGrandes.lista);
  const a = lista[0];
  // Las salvaciones salen en una ventana chica con borde amarillo; lo demás, en pantalla completa
  const chica = a?.tipo === 'salvacion' || a?.tipo === 'concentracion', grande = a && !chica ? a : null;
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current; if (!d) return;
    if (grande && !d.open) d.showModal();
    if (!grande && d.open) d.close();
  }, [grande]);
  const mas = lista.length > 1 && <p className="m-0 text-center text-sm text-muted">Hay {lista.length - 1} aviso{lista.length > 2 ? 's' : ''} más después de este.</p>;
  return (
    <>
    <PopupTarjeta abierto={chica} tono="salvacion" etiqueta="Tirada de salvación">
      {a?.tipo === 'salvacion' ? <Salvacion key={a.id} a={a} /> : a?.tipo === 'concentracion' ? <Concentracion key={a.id} a={a} /> : null}
      {chica && mas}
    </PopupTarjeta>
    <dialog ref={ref} aria-label="Aviso del combate" onCancel={e => e.preventDefault()}
      className="m-0 h-dvh max-h-none w-screen max-w-none overflow-auto bg-bg p-0 text-ink backdrop:bg-black/70 print:hidden">
      {grande && <div className="mx-auto grid min-h-full max-w-xl content-center gap-4 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        {grande.tipo === 'seguimiento' ? <Seguimiento a={grande} /> : grande.tipo === 'efecto' ? <Efecto a={grande} /> : grande.tipo === 'aviso' ? <Aviso a={grande} /> : null}
        {mas}
      </div>}
    </dialog>
    </>
  );
}

/** Las reacciones que sirven ahora y el botón para ir a usarla antes de seguir (el aviso vuelve al terminar). */
function Reaccionar({ reacciones, antes }: { reacciones: { nombre: string; texto: string }[]; antes: string }) {
  const puede = avisosGrandes.puedeReaccionar();
  if (!reacciones.length && !puede) return null;
  return (
    <div className="rounded-2xl bg-surface p-4 ring-1 ring-adi">
      <p className="m-0 font-bold text-adi"><Simbolo n="bolt" /> {reacciones.length ? `${antes}, puedes reaccionar con:` : `${antes}, puedes usar tu reacción.`}</p>
      {reacciones.length > 0 && <ul className="m-0 mt-2 grid list-none gap-2 p-0">
        {reacciones.map(r => <li key={r.nombre}><b>{r.nombre}</b><span className="block text-sm text-muted">{r.texto}</span></li>)}
      </ul>}
      {puede
        ? <Boton className="mt-3 min-h-12 w-full" onClick={() => avisosGrandes.reaccionar()}><Simbolo n="bolt" /> Usar mi reacción primero</Boton>
        : <p className="m-0 mt-2 text-sm text-muted">Úsala desde el botón Reacción de tu pantalla de combate.</p>}
      {puede && <p className="m-0 mt-2 text-sm text-muted">Al terminar vuelves aquí.</p>}
    </div>
  );
}

/** Daño que todavía no se restó: primero puedes reaccionar, y después confirmas cuánto recibes (todo, otra cantidad o nada). */
function DanoPendiente({ a }: { a: Extract<AvisoGrande, { tipo: 'efecto' }> }) {
  const o = a.o, n = Math.max(0, Math.round(o.dano || 0));
  const [valor, setValor] = useState(String(n));
  const dano = Math.max(0, Math.round(+valor || 0));
  return (
    <>
      <div className="rounded-3xl bg-acc/20 p-6 text-center">
        <Simbolo n="heart_broken" className="text-6xl text-acc" />
        <h2 className="m-0 mt-2 font-serif text-4xl font-extrabold">Te van a hacer {n} de daño{o.tipoDano ? ` ${o.tipoDano}` : ''}</h2>
        <p className="m-0 mt-2 text-lg">{o.de || 'Alguien'}{o.nota ? `: ${o.nota}` : ''}</p>
        {o.condicion ? <p className="m-0 mt-2 text-lg font-bold">Y quedas {o.condicion}</p> : null}
        <p className="m-0 mt-2 text-sm text-muted">Todavía no se restó de tus PG.</p>
      </div>
      {a.reaccion ? <ConReaccion a={a} /> : <Reaccionar reacciones={a.reacciones} antes="Antes de recibirlo" />}
      <div className="grid gap-2 rounded-2xl bg-surface p-4">
        <label className="font-bold" htmlFor={`dano-${a.id}`}>Daño que recibes</label>
        <div className="flex flex-wrap gap-2">
          <input id={`dano-${a.id}`} type="number" inputMode="numeric" min={0} value={valor} onChange={e => setValor(e.target.value)} className={cx(claseCampo, 'w-28!')} />
          {n > 1 && <Boton onClick={() => setValor(String(Math.floor(n / 2)))}>La mitad ({Math.floor(n / 2)})</Boton>}
          {dano !== n && <Boton variante="fantasma" onClick={() => setValor(String(n))}>Todo ({n})</Boton>}
        </div>
        <p className="m-0 text-sm text-muted">Cámbialo si tu reacción lo redujo (Esquiva asombrosa: la mitad).</p>
      </div>
      <Boton variante="primario" className="min-h-14 text-lg" onClick={() => confirmarDano(a, dano)}>{dano ? `Recibir ${dano} de daño` : 'No recibo daño'}</Boton>
      {/* Un golpe que falla por la reacción (Escudo) no hace nada, tampoco la salvación que traía */}
      {!o.salv && <Boton className="min-h-12" onClick={() => confirmarDano(a, 0, true)}>Mi reacción hizo fallar el ataque</Boton>}
    </>
  );
}

/** Volvió de usar su reacción y falta algo para aplicarla sola: los dados que pide o saber si el ataque todavía acierta. */
function ConReaccion({ a }: { a: Extract<AvisoGrande, { tipo: 'efecto' }> }) {
  const r = a.reaccion!, e = r.efecto, n = Math.max(0, Math.round(a.o.dano || 0)), ataque = a.o.ataque ?? null, ca = +S.c?.ac || 10;
  const [tiro, setTiro] = useState('');
  const dados = e && e.tipo !== 'mitad' ? e.dados : undefined;
  const tirada = dados ? totalTirada(dados, tiro) : 0;
  const res = e && tirada != null ? resultadoReaccion(e, n, ca, ataque, tirada) : null;
  const caNueva = e?.tipo === 'ca' && tirada != null ? ca + (e.bono ?? tirada) : null;
  return (
    <div className="grid gap-3 rounded-2xl bg-surface p-4 ring-1 ring-adi">
      <p className="m-0 font-bold text-adi"><Simbolo n="bolt" /> Usaste {r.nombre}</p>
      {!e && <p className="m-0 text-sm text-muted">No sé qué hace con el daño: escribe abajo cuánto recibes.</p>}
      {dados && <CampoTirada tipo="dano" expr={dados} valor={tiro} alCambiar={setTiro} etiqueta={r.nombre} claseInput={claseCampo} />}
      {res && <Boton variante="primario" className="min-h-12" onClick={() => confirmarDano(a, res.dano, res.falla)}>
        {res.falla ? `CA ${res.caNueva} contra ${ataque}: el ataque falla` : `Recibir ${res.dano} de daño`}</Boton>}
      {/* Sin lo que sacó el ataque (el DM lo aplicó a mano), se pregunta si con la CA nueva todavía acierta */}
      {e?.tipo === 'ca' && ataque == null && caNueva != null && <>
        <p className="m-0">Tu CA sube a {caNueva}. ¿El ataque sacó menos de {caNueva}?</p>
        <div className="flex flex-wrap gap-2">
          <Boton variante="primario" className="min-h-12" onClick={() => confirmarDano(a, 0, true)}>Sí, falla</Boton>
          <Boton className="min-h-12" onClick={() => confirmarDano(a, e.luegoMitad ? Math.floor(n / 2) : n)}>No, acierta igual</Boton>
        </div>
      </>}
    </div>
  );
}

function Efecto({ a }: { a: Extract<AvisoGrande, { tipo: 'efecto' }> }) {
  const o = a.o, n = Math.max(0, Math.round(o.dano || 0));
  if (a.pendiente) return <DanoPendiente key={a.id} a={a} />;
  return (
    <>
      <div className={cx('rounded-3xl p-6 text-center', o.cura ? 'bg-pas/20' : n ? 'bg-acc/20' : 'bg-soft')}>
        <Simbolo n={o.cura ? 'healing' : n ? 'heart_broken' : 'info'} className={cx('text-6xl', o.cura ? 'text-pas' : n ? 'text-acc' : 'text-muted')} />
        <h2 className="m-0 mt-2 font-serif text-4xl font-extrabold">{o.cura ? `Te curan ${n} PG` : n ? `Recibes ${n} de daño${o.tipoDano ? ` ${o.tipoDano}` : ''}` : o.condicion || 'Te hacen algo'}</h2>
        <p className="m-0 mt-2 text-lg">{o.de || 'Alguien'}{o.nota ? `: ${o.nota}` : ''}</p>
        {o.condicion && (n || o.cura) ? <p className="m-0 mt-2 text-lg font-bold">Quedas {o.condicion}</p> : null}
        {o.bono && <p className="m-0 mt-2 text-muted">{o.bono}</p>}
        {o.rondas ? <p className="m-0 mt-2 text-lg font-bold">Dura {textoDuracion(o.rondas)}. Se descuenta sola en cada ronda.</p> : null}
        {n > 0 && !o.cura && <p className="m-0 mt-2 text-sm text-muted">Ya se restó de tus PG (primero de los temporales).</p>}
      </div>
      {a.reacciones.length > 0 && (
        <div className="rounded-2xl bg-surface p-4 ring-1 ring-adi">
          <p className="m-0 font-bold text-adi"><Simbolo n="bolt" /> Puedes reaccionar con:</p>
          <ul className="m-0 mt-2 grid list-none gap-2 p-0">
            {a.reacciones.map(r => <li key={r.nombre}><b>{r.nombre}</b><span className="block text-sm text-muted">{r.texto}</span></li>)}
          </ul>
          <p className="m-0 mt-2 text-sm text-muted">Si todavía tienes tu reacción, úsala desde el botón Reacción.</p>
        </div>
      )}
      <Boton variante="primario" className="min-h-14 text-lg" onClick={() => avisosGrandes.quitar(a.id)}>Entendido</Boton>
    </>
  );
}

/** Con qué se puede seguir después de acertar: celeste, con un botón por cada opción que se puede ir a usar. */
function Seguimiento({ a }: { a: Extract<AvisoGrande, { tipo: 'seguimiento' }> }) {
  return (
    <>
      <div className="rounded-3xl bg-rea/20 p-6 text-center">
        <Simbolo n="bolt" className="text-6xl text-rea" />
        <h2 className="m-0 mt-2 font-serif text-3xl font-extrabold">{a.titulo}</h2>
        <p className="m-0 mt-2 text-lg">{a.texto || 'Puedes seguir con:'}</p>
      </div>
      <ul className="m-0 grid list-none gap-2 p-0">
        {a.opciones.map(o => (
          <li key={o.nombre} className="rounded-2xl bg-surface p-4 ring-1 ring-rea">
            <b>{o.nombre}</b><span className="block text-sm text-muted">{o.texto}</span>
            {o.alIr && <Boton variante="primario" className="mt-2 min-h-12" onClick={() => { avisosGrandes.quitar(a.id); o.alIr!(); }}>{o.etiqueta || 'Ir a usarla'}</Boton>}
          </li>
        ))}
      </ul>
      <Boton className="min-h-14 text-lg" onClick={() => avisosGrandes.quitar(a.id)}>Seguir sin usarlas</Boton>
    </>
  );
}

function Aviso({ a }: { a: Extract<AvisoGrande, { tipo: 'aviso' }> }) {
  // El resultado de una salvación que pediste: amarillo, como las salvaciones
  const salv = /salvaci[oó]n/i.test(a.o.nota || '');
  return (
    <>
      <div className={cx('rounded-3xl p-6 text-center', salv ? 'bg-adi/20' : 'bg-soft')}>
        <Simbolo n={salv ? 'shield' : 'campaign'} className="text-6xl text-adi" />
        <h2 className="m-0 mt-2 font-serif text-3xl font-extrabold">{a.o.nota}</h2>
        {a.o.bono && <p className="m-0 mt-2 text-lg">{a.o.bono}</p>}
      </div>
      <Boton variante="primario" className="min-h-14 text-lg" onClick={() => avisosGrandes.quitar(a.id)}>Entendido</Boton>
    </>
  );
}

/** La salvación que pide el DM: primero escribir el d20 que salió (o tirarlo en la app), y al confirmar se aplica en la hoja
 *  lo que corresponda y el DM recibe el resultado. */
function Salvacion({ a }: { a: Extract<AvisoGrande, { tipo: 'salvacion' }> }) {
  const o = a.o, salv = String(o.salv || '').toLowerCase(), cd = o.cd || 10, dano = Math.max(0, o.dano || 0);
  const mod = S.c?.saves?.[salv] ?? 0;
  const reacciones = reaccionesALaSalvacion(S.c, dano, o.tipoDano);
  const bendicion = (S.pj?.efectos || []).some((e: any) => /^(bendicion|bendecid)/.test(norm(e.nombre || '')));
  const [nat, setNat] = useState(''), [bend, setBend] = useState(''), [ocupado, setOcupado] = useState(false);
  const expr = `1d20${modStr(mod)}`;
  // Paralizado, aturdido, inconsciente o petrificado: las de Fuerza y Destreza se fallan solas
  const sola = fallaSola(condicionesMias(), salv);
  const base = sola ? 0 : totalTirada(expr, nat), total = base == null ? null : base + (bendicion && bend !== '' && !sola ? Math.round(+bend || 0) : 0);
  const supera = !sola && total != null && total >= cd;
  // Repetirla al final de tu turno: si la superas, te libras de la condición
  const libra = !!o.librarse && !!o.condicion;
  const siFalla = libra ? `sigues ${o.condicion}` : [dano ? `${dano} de daño` : '', o.condicion ? `quedas ${o.condicion}` : ''].filter(Boolean).join(' y ');
  const siSupera = libra ? `te libras de ${o.condicion}` : dano && o.mitad ? `la mitad del daño (${Math.floor(dano / 2)})` : 'no te pasa nada';
  const confirmar = async () => {
    if (total == null) return;
    setOcupado(true);
    const final = libra ? 0 : supera ? (o.mitad ? Math.floor(dano / 2) : 0) : dano, cond = libra ? o.condicion! : supera ? null : o.condicion || null;
    if (libra) {
      if (supera) setVal('efectos', (S.pj?.efectos || []).filter((x: any) => x.nombre !== cond));
      avisar(supera ? `Te libras de ${cond}.` : `Sigues ${cond}: vuelves a tirar al final de tu próximo turno.`);
    // El daño espera a que confirmes, por si todavía quieres reaccionar (si ya gastaste la reacción, entra al momento)
    } else if (final || cond) aplicarEfecto({ ...o, id: `${o.id}-dano`, tipo: 'efecto', dano: final, condicion: cond }, !!final && avisosGrandes.quedaReaccion(), a.mesa);
    else avisar(`Superaste la salvación de ${nombreAb(salv)}.`);
    try {
      const dura = cond && !libra && o.rondas ? { rondas: o.rondas, ...(o.hasta ? { hastaRonda: o.hasta.ronda, hastaK: o.hasta.k } : {}), ...(o.conc ? { conc: o.conc } : {}) } : {};
      // Si la condición se puede quitar repitiendo la salvación, el DM sabe cuál y contra qué CD
      const repite = cond && (o.repite || libra) ? { repite: true, salv, cd } : {};
      if (a.mesa) await responderSalvacionMesa(a.mesa, { pedido: o.id, total, supero: supera, dano: final, ...(cond ? { condicion: cond } : {}), ...dura, ...repite });
    } catch (e) { avisar(`Tu DM no recibió el resultado: ${(e as Error).message}. Díselo en voz alta.`, 'error'); }
    setOcupado(false);
    avisosGrandes.quitar(a.id);
  };
  return (
    <>
      <div>
        <h2 className="m-0 font-serif text-xl font-extrabold"><Simbolo n="shield" className="text-adi" /> {libra ? `Termina tu turno: repite la salvación de ${nombreAb(salv)} CD ${cd}` : `Debes hacer una salvación de ${nombreAb(salv)} CD ${cd}`}</h2>
        <p className="m-0 mt-1">({o.nota && !libra ? `${o.nota}, ` : ''}{o.de || 'tu DM'}){' '}
          <span className="text-muted">{siFalla ? `Si fallas, ${siFalla}; si` : 'Si'} la superas, {siSupera}.{o.repite && !libra && o.condicion ? ` Si quedas ${o.condicion}, repites la salvación al final de cada turno tuyo.` : ''}</span></p>
        {!libra && dano > 0 && avisosGrandes.quedaReaccion() && <p className="m-0 mt-1 text-sm text-muted">El daño no se resta hasta que lo confirmes: si fallas, todavía puedes reaccionar antes.</p>}
      </div>
      {!libra && <Reaccionar reacciones={reacciones} antes="Antes de tirar" />}
      {sola ? (
        <div className="grid gap-3">
          <p className="m-0 font-bold text-acc">Estás {sola}: la fallas sin tirar.</p>
          <Boton variante="primario" className="min-h-12" disabled={ocupado} onClick={confirmar}>Confirmar y avisar a tu DM</Boton>
        </div>
      ) : <div className="grid gap-3">
        <CampoTirada tipo="ataque" expr={expr} valor={nat} alCambiar={setNat} etiqueta={`Salvación de ${nombreAb(salv)} (CD ${cd})`} sinCritico
          desglose={`tu salvación de ${abrevAb(salv)}`} claseInput={claseCampo}
          mas={bendicion ? [{ dados: '1d4', por: 'Bendición', valor: bend === '' ? null : Math.round(+bend || 0) }] : []} />
        {bendicion && <CampoTirada tipo="dano" expr="1d4" valor={bend} alCambiar={setBend} etiqueta="Bendición" claseInput={claseCampo} />}
        {total != null && <p className={cx('m-0 font-serif text-xl font-extrabold', supera ? 'text-pas' : 'text-acc')}>{total} contra CD {cd}: {supera ? '¡La superas!' : 'Fallas'}</p>}
        <Boton variante="primario" className="min-h-12" disabled={total == null || ocupado} onClick={confirmar}>
          {total == null ? 'Escribe primero lo que salió' : 'Confirmar y avisar a tu DM'}
        </Boton>
      </div>}
    </>
  );
}

/** Le hicieron daño mientras se concentraba: salvación de Constitución (CD 10 o la mitad del daño) para no perderla. */
function Concentracion({ a }: { a: Extract<AvisoGrande, { tipo: 'concentracion' }> }) {
  const conc = concentracionActual(), mod = S.c?.saves?.con ?? 0, ventaja = ventajaConcentracion(S.c);
  const bendicion = (S.pj?.efectos || []).some((e: any) => /^(bendicion|bendecid)/.test(norm(e.nombre || '')));
  const [nat, setNat] = useState(''), [bend, setBend] = useState('');
  const expr = `1d20${modStr(mod)}`;
  const base = totalTirada(expr, nat), total = base == null ? null : base + (bendicion && bend !== '' ? Math.round(+bend || 0) : 0);
  const supera = total != null && total >= a.cd;
  const confirmar = () => {
    if (total == null) return;
    if (supera) avisar(`Mantienes la concentración en ${conc?.nombre || 'tu conjuro'}.`);
    else void terminarConcentracion(a.mesa, 'fallaste la salvación');
    avisosGrandes.quitar(a.id);
  };
  if (!conc) return (
    <>
      <p className="m-0 text-lg">Ya no te estabas concentrando en nada.</p>
      <Boton variante="primario" className="min-h-12" onClick={() => avisosGrandes.quitar(a.id)}>Entendido</Boton>
    </>
  );
  return (
    <>
      <div>
        <h2 className="m-0 font-serif text-xl font-extrabold"><Simbolo n="psychology" className="text-adi" /> Debes hacer una salvación de Constitución CD {a.cd}</h2>
        <p className="m-0 mt-1">(Concentración en {conc.nombre}, recibiste {a.dano} de daño){' '}
          <span className="text-muted">Si fallas, {conc.nombre} se acaba para todos los que lo tenían.</span></p>
      </div>
      <div className="grid gap-3">
        <CampoTirada tipo="ataque" expr={expr} valor={nat} alCambiar={setNat} etiqueta={`Concentración (CD ${a.cd})`} sinCritico adv={ventaja ? 1 : 0}
          desglose="tu salvación de CON" claseInput={claseCampo}
          mas={bendicion ? [{ dados: '1d4', por: 'Bendición', valor: bend === '' ? null : Math.round(+bend || 0) }] : []} />
        {ventaja && <p className="m-0 text-sm text-muted">Tienes ventaja por {ventaja}.</p>}
        {bendicion && <CampoTirada tipo="dano" expr="1d4" valor={bend} alCambiar={setBend} etiqueta="Bendición" claseInput={claseCampo} />}
        {total != null && <p className={cx('m-0 font-serif text-xl font-extrabold', supera ? 'text-pas' : 'text-acc')}>{total} contra CD {a.cd}: {supera ? 'la mantienes' : 'la pierdes'}</p>}
        <Boton variante="primario" className="min-h-12" disabled={total == null} onClick={confirmar}>
          {total == null ? 'Escribe primero lo que salió' : 'Confirmar'}
        </Boton>
      </div>
    </>
  );
}
