/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { S } from '@/app-shell/estado';
import { Boton, Simbolo, claseCampo, cx } from '@/shared/ui/kit';
import { avisar } from '@/shared/ui/avisos';
import { modStr, norm } from '@/shared/utils/texto';
import { AB } from '@/features/reglas/data/caracteristicas';
import { CampoTirada, totalTirada } from '@/features/dados/components/CampoTirada';
import { responderSalvacionMesa } from '@/features/mesa/api';
import { aplicarEfecto, avisosGrandes, type AvisoGrande } from './ordenes-dm';
import { setVal } from '../../acciones';
import { textoDuracion } from '@/features/mesa/domain/duracion';
import { concentracionActual, terminarConcentracion, ventajaConcentracion } from './concentracion';

const nombreAb = (k: string) => AB.find(([x]) => x === k)?.[3] || k.toUpperCase();
const abrevAb = (k: string) => AB.find(([x]) => x === k)?.[2] || k.toUpperCase();

/** Lo que le pasa al personaje en combate, en grande y de a uno: daño o curación recibidos, una salvación que debe
 *  tirar y lo que le cuenta su DM. */
export function AvisosGrandes() {
  const lista = useSyncExternalStore(avisosGrandes.suscribir, avisosGrandes.lista, avisosGrandes.lista);
  const a = lista[0];
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current; if (!d) return;
    if (a && !d.open) d.showModal();
    if (!a && d.open) d.close();
  }, [a]);
  return (
    <dialog ref={ref} aria-label="Aviso del combate" onCancel={e => e.preventDefault()}
      className="m-0 h-dvh max-h-none w-screen max-w-none overflow-auto bg-bg p-0 text-ink backdrop:bg-black/70 print:hidden">
      {a && <div className="mx-auto grid min-h-full max-w-xl content-center gap-4 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        {a.tipo === 'salvacion' ? <Salvacion key={a.id} a={a} /> : a.tipo === 'concentracion' ? <Concentracion key={a.id} a={a} /> : a.tipo === 'efecto' ? <Efecto a={a} /> : <Aviso a={a} />}
        {lista.length > 1 && <p className="m-0 text-center text-sm text-muted">Hay {lista.length - 1} aviso{lista.length > 2 ? 's' : ''} más después de este.</p>}
      </div>}
    </dialog>
  );
}

function Efecto({ a }: { a: Extract<AvisoGrande, { tipo: 'efecto' }> }) {
  const o = a.o, n = Math.max(0, Math.round(o.dano || 0));
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

function Aviso({ a }: { a: Extract<AvisoGrande, { tipo: 'aviso' }> }) {
  return (
    <>
      <div className="rounded-3xl bg-soft p-6 text-center">
        <Simbolo n="campaign" className="text-6xl text-adi" />
        <h2 className="m-0 mt-2 font-serif text-3xl font-extrabold">{a.o.nota}</h2>
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
  const bendicion = (S.pj?.efectos || []).some((e: any) => /^(bendicion|bendecid)/.test(norm(e.nombre || '')));
  const [nat, setNat] = useState(''), [bend, setBend] = useState(''), [ocupado, setOcupado] = useState(false);
  const expr = `1d20${modStr(mod)}`;
  const base = totalTirada(expr, nat), total = base == null ? null : base + (bendicion && bend !== '' ? Math.round(+bend || 0) : 0);
  const supera = total != null && total >= cd;
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
    } else if (final || cond) aplicarEfecto({ ...o, tipo: 'efecto', dano: final, condicion: cond }, false, a.mesa);
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
      <div className="rounded-3xl bg-gol/20 p-6 text-center">
        <Simbolo n="shield" className="text-6xl text-gol" />
        <h2 className="m-0 mt-2 font-serif text-3xl font-extrabold">{libra ? `Termina tu turno: repite la salvación contra ${o.condicion}` : 'Debes hacer una tirada de salvación'}</h2>
        <p className="m-0 mt-2 font-serif text-4xl font-extrabold">{nombreAb(salv)} CD {cd}</p>
        <p className="m-0 mt-2 text-lg">{o.de || 'Tu DM'}{o.nota ? `: ${o.nota}` : ''}</p>
        <p className="m-0 mt-2 text-sm text-muted">{siFalla ? `Si fallas, ${siFalla}. ` : ''}Si la superas, {siSupera}.{o.repite && !libra && o.condicion ? ` Si quedas ${o.condicion}, repites la salvación al final de cada turno tuyo.` : ''}</p>
      </div>
      <div className="grid gap-3 rounded-2xl bg-surface p-4">
        <CampoTirada tipo="ataque" expr={expr} valor={nat} alCambiar={setNat} etiqueta={`Salvación de ${nombreAb(salv)} (CD ${cd})`} sinCritico
          desglose={`tu salvación de ${abrevAb(salv)}`} claseInput={claseCampo}
          mas={bendicion ? [{ dados: '1d4', por: 'Bendición', valor: bend === '' ? null : Math.round(+bend || 0) }] : []} />
        {bendicion && <CampoTirada tipo="dano" expr="1d4" valor={bend} alCambiar={setBend} etiqueta="Bendición" claseInput={claseCampo} />}
        {total != null && <p className={cx('m-0 text-center font-serif text-2xl font-extrabold', supera ? 'text-pas' : 'text-acc')}>{total} contra CD {cd}: {supera ? '¡La superas!' : 'Fallas'}</p>}
        <Boton variante="primario" className="min-h-14 text-lg" disabled={total == null || ocupado} onClick={confirmar}>
          {total == null ? 'Escribe primero lo que salió' : 'Confirmar y avisar a tu DM'}
        </Boton>
      </div>
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
      <p className="m-0 rounded-3xl bg-soft p-6 text-center text-lg">Ya no te estabas concentrando en nada.</p>
      <Boton variante="primario" className="min-h-14 text-lg" onClick={() => avisosGrandes.quitar(a.id)}>Entendido</Boton>
    </>
  );
  return (
    <>
      <div className="rounded-3xl bg-gol/20 p-6 text-center">
        <Simbolo n="psychology" className="text-6xl text-gol" />
        <h2 className="m-0 mt-2 font-serif text-3xl font-extrabold">¿Mantienes la concentración?</h2>
        <p className="m-0 mt-2 font-serif text-4xl font-extrabold">Constitución CD {a.cd}</p>
        <p className="m-0 mt-2 text-lg">Te concentras en {conc.nombre} y recibiste {a.dano} de daño.</p>
        <p className="m-0 mt-2 text-sm text-muted">Si fallas, {conc.nombre} se acaba para todos los que lo tenían.</p>
      </div>
      <div className="grid gap-3 rounded-2xl bg-surface p-4">
        <CampoTirada tipo="ataque" expr={expr} valor={nat} alCambiar={setNat} etiqueta={`Concentración (CD ${a.cd})`} sinCritico adv={ventaja ? 1 : 0}
          desglose="tu salvación de CON" claseInput={claseCampo}
          mas={bendicion ? [{ dados: '1d4', por: 'Bendición', valor: bend === '' ? null : Math.round(+bend || 0) }] : []} />
        {ventaja && <p className="m-0 text-sm text-muted">Tienes ventaja por {ventaja}.</p>}
        {bendicion && <CampoTirada tipo="dano" expr="1d4" valor={bend} alCambiar={setBend} etiqueta="Bendición" claseInput={claseCampo} />}
        {total != null && <p className={cx('m-0 text-center font-serif text-2xl font-extrabold', supera ? 'text-pas' : 'text-acc')}>{total} contra CD {a.cd}: {supera ? 'la mantienes' : 'la pierdes'}</p>}
        <Boton variante="primario" className="min-h-14 text-lg" disabled={total == null} onClick={confirmar}>
          {total == null ? 'Escribe primero lo que salió' : 'Confirmar'}
        </Boton>
      </div>
    </>
  );
}
