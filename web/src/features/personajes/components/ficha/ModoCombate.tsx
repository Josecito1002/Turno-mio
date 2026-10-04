/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useRef, useState } from 'react';
import { S, render } from '@/app-shell/estado';
import { Boton, Dialogo, Simbolo, cx, foco } from '@/shared/ui/kit';
import { TIPOS } from '@/features/reglas/data/caracteristicas';
import { COMUNES } from '@/features/reglas/data/comunes';
import { FormaTipo } from '@/features/reglas/components/TipoAccion';
import { CONDICIONES } from '@/features/mesa/domain/combate';
import { avisar } from '@/shared/ui/avisos';
import { combateMesa, enviarGolpeMesa, gastarAccionMesa, type CombateVivo, type EconomiaRonda, type TipoAccionRonda } from '@/features/mesa/api';
import { EFECTO_CONDICION } from '@/features/mesa/domain/condiciones';
import { Entrada, datosConjuro } from '../piezas';
import { bonosPara } from '../../domain/lanzar';
import { UsoAccion, type Uso } from './UsoAccion';
import { FilaArsenal, FilaConjuro, Ranuras, RecursosClase } from './Ficha';

const TIPOS_BOTON: TipoAccionRonda[] = ['accion', 'adicional', 'reaccion'];

/** Lo que se puede hacer con cada tipo de acción: ataques, rasgos, conjuros y las acciones que cualquiera tiene.
 *  Cada opción tiene su botón «Usar»: abre la confirmación con lo que hace y a quién afecta. */
function OpcionesDeTipo({ c, t, usar }: { c: any; t: TipoAccionRonda; usar: (u: Uso) => void }) {
  const armas = t === 'accion' ? [...c.armas.filter((a: any) => a.mano), ...(c.naturales || [])] : [];
  const ents = c.entries.filter((e: any) => e.t === t);
  const conjuros = (c.conjuros || []).filter((s: any) => (s.tiempo || 'accion') === t);
  const com = COMUNES[t] || [];
  const boton = (u: Uso) => <Boton tamano="sm" variante="primario" className="mt-1" onClick={() => usar(u)}>Usar {u.nombre}</Boton>;
  const deArma = (a: any): Uso => ({ tipo: t, nombre: a.nombre, texto: [a.dmg, ...(a.notas || [])].filter(Boolean).join('. ') || 'Ataque', ...(a.cd == null ? { atk: a.atk } : { salv: a.salv, cd: a.cd }), dexpr: a.expr, afecta: true });
  const deConjuro = (s: any): Uso => {
    const d = datosConjuro(s, c), salv = s.salv ? String(s.salv).toUpperCase() : undefined;
    return { tipo: t, nombre: s.nombre, coste: s.coste || (+s.nivel ? `Nivel ${s.nivel}` : 'Truco'), texto: String(s.desc || '').trim(), raw: true, ...(s.ataque && d.atk != null ? { atk: d.atk } : {}), ...(salv ? { salv, cd: d.cd } : {}), dexpr: d.dexpr || undefined, afecta: !!(s.ataque || salv || s.dados),
      ...(+s.nivel > 0 ? { conjuro: { nivel: +s.nivel, rasgo: s.recurso, ritual: !!s.ritual, desc: s.desc, base: d.dexpr, bono: d.dexpr ? bonosPara(c, s).reduce((x: number, b: any) => x + (+b.valor || 0), 0) : 0 } } : {}) };
  };
  return (
    <div className="space-y-3">
      {armas.length > 0 && (
        <div className="space-y-2"><span className="text-label-caps uppercase text-outline">Ataques</span>
          {armas.map((a: any, i: number) => <div key={a.nombre + i}><FilaArsenal a={a} c={c} />{boton(deArma(a))}</div>)}</div>
      )}
      {ents.length > 0 && <div><span className="text-label-caps uppercase text-outline">Rasgos</span>
        {ents.map((e: any, i: number) => <div key={i}><Entrada e={e} />{boton({ tipo: t, nombre: e.nombre, coste: e.coste, texto: e.texto || '', raw: !!e.raw, afecta: false })}</div>)}</div>}
      {conjuros.length > 0 && (
        <div className="space-y-1"><span className="text-label-caps uppercase text-outline">Conjuros</span>
          <ul className="m-0 list-none space-y-2 p-0">{conjuros.map((s: any, i: number) => <li key={s.nombre + i}><FilaConjuro s={s} c={c} />{boton(deConjuro(s))}</li>)}</ul></div>
      )}
      {com.length > 0 && (
        <div><span className="text-label-caps uppercase text-outline">Las que cualquiera puede hacer</span>
          {com.map(([n, f]: [string, (c: any) => string]) => <div key={n}><Entrada e={{ t, nombre: n, texto: f(c), src: 'Reglas básicas' }} />{boton({ tipo: t, nombre: n, texto: f(c), afecta: n === 'Atacar' })}</div>)}</div>
      )}
    </div>
  );
}

/** Mandar daño (y una condición) a un enemigo: el DM lo aplica en su Mesa. */
function GolpeAEnemigo({ enemigos, mesa }: { enemigos: { k: string; nombre: string }[]; mesa: { dmId: string; campanaId: string; personajeId: string } }) {
  const [objetivo, setObjetivo] = useState(''), [dano, setDano] = useState(''), [cond, setCond] = useState(''), [nota, setNota] = useState(''), [ocupado, setOcupado] = useState(false);
  const elegido = enemigos.some(e => e.k === objetivo) ? objetivo : enemigos[0]?.k || '';
  if (!enemigos.length) return <p className="m-0 rounded-lg bg-surface-container-low p-3 text-body-sm text-outline">No hay enemigos en el combate todavía.</p>;
  const campo = 'min-h-11 w-full rounded bg-surface-container-lowest px-2 text-body-md text-on-surface';
  const enviar = async () => {
    const n = Math.max(0, Math.round(+dano || 0));
    if (!n && !cond) { avisar('Pon el daño o una condición.', 'error'); return; }
    setOcupado(true);
    try {
      await enviarGolpeMesa(mesa, { objetivo: elegido, dano: n, ...(cond ? { condicion: cond } : {}), ...(nota.trim() ? { nota: nota.trim() } : {}) });
      avisar(`Enviado a ${enemigos.find(e => e.k === elegido)?.nombre}: ${n} de daño${cond ? `, ${cond}` : ''}. Tu DM lo aplica.`);
      setDano(''); setCond(''); setNota('');
    } catch (e) { avisar(`No se pudo enviar: ${(e as Error).message}`, 'error'); }
    finally { setOcupado(false); }
  };
  return (
    <div className="grid gap-2 rounded-lg bg-surface-container-low p-3 shadow-md">
      <span className="text-label-caps uppercase text-outline">Aplicar a un enemigo</span>
      <select aria-label="Enemigo" value={elegido} onChange={e => setObjetivo(e.target.value)} className={campo}>{enemigos.map(e => <option key={e.k} value={e.k}>{e.nombre}</option>)}</select>
      <div className="grid grid-cols-2 gap-2">
        <input aria-label="Daño" type="number" inputMode="numeric" min={0} placeholder="Daño total" value={dano} onChange={e => setDano(e.target.value)} className={campo} />
        <select aria-label="Condición" value={cond} onChange={e => setCond(e.target.value)} className={campo}><option value="">Sin condición</option>{CONDICIONES.map(n => <option key={n}>{n}</option>)}</select>
      </div>
      <input aria-label="Con qué" type="text" maxLength={80} placeholder="Con qué (opcional): Bola de fuego" value={nota} onChange={e => setNota(e.target.value)} className={campo} />
      <Boton variante="primario" disabled={ocupado} onClick={enviar}>Aplicar</Boton>
    </div>
  );
}

/** Pantalla de combate del jugador: solo su personaje, con acción, acción adicional y reacción sincronizadas con el DM. */
export function ModoCombate({ c }: { c: any }) {
  const m = S.combateMesa!, { dmId, campanaId, personajeId } = m;
  const [viv, setViv] = useState<CombateVivo>(null);
  const [eco, setEco] = useState<EconomiaRonda>({});
  const [abierto, setAbierto] = useState<TipoAccionRonda | null>(null);
  const [uso, setUso] = useState<Uso | null>(null);
  const [error, setError] = useState('');
  const toques = useRef<Partial<Record<TipoAccionRonda, number>>>({});

  useEffect(() => {
    let vivo = true;
    const ref = { dmId, campanaId, personajeId };
    const leer = () => combateMesa(ref).then(d => {
      if (!vivo) return;
      setViv(d); setError('');
      const e = d?.economia?.[personajeId] || {};
      // Un toque reciente manda sobre lo que devuelva el servidor, para que el botón no parpadee
      setEco(prev => {
        const sig: EconomiaRonda = { ...e };
        for (const t of TIPOS_BOTON) if (Date.now() - (toques.current[t] || 0) < 3000) sig[t] = prev[t];
        return sig;
      });
    }).catch((err: Error) => { if (vivo) setError(err.message); });
    leer();
    const id = setInterval(leer, 2000);
    return () => { vivo = false; clearInterval(id); };
  }, [dmId, campanaId, personajeId]);

  const gastar = (t: TipoAccionRonda, gastado: boolean) => {
    toques.current[t] = Date.now();
    setEco(p => ({ ...p, [t]: gastado }));
    gastarAccionMesa(m, t, gastado).catch((e: Error) => { setError(e.message); setEco(p => ({ ...p, [t]: !gastado })); });
  };

  const activo = !!viv?.activo, turnoDe = viv?.orden?.[viv.turno || 0];
  const mias = viv?.orden?.find(o => o.pid === personajeId)?.cond || [];
  const esMiTurno = !!turnoDe && turnoDe.pid === m.personajeId;
  const salir = () => { S.combateMesa = null; S.combateHoja = false; render(); };
  const enemigos = (viv?.orden || []).filter(o => o.tipo === 'm');
  const ranuras = c.recursos.filter((r: any) => /^slot\d/.test(r.id));

  return (
    <div className="mx-auto grid max-w-3xl gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-surface-container-low p-3 shadow-lg">
        <div className="min-w-0">
          <h2 className="m-0 font-serif text-headline-md text-on-surface">{c.pj.nombre || 'Personaje'}</h2>
          <p className="m-0 text-body-sm text-outline">Mesa «{m.mesa}» · DM {m.dm}</p>
        </div>
        <div className="flex gap-2">
          <Boton tamano="sm" onClick={() => { S.combateHoja = true; render(); }}>Ver hoja completa</Boton>
          <Boton tamano="sm" variante="peligro" onClick={salir}>Salir del combate</Boton>
        </div>
      </div>

      <div className={cx('rounded-lg p-3 text-center shadow-lg', esMiTurno ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-low text-on-surface')}>
        {activo ? (
          <>
            <p className="m-0 font-serif text-headline-sm">Ronda {viv?.ronda || 1}</p>
            <p className="m-0 text-body-md">{esMiTurno ? '¡Es tu turno!' : turnoDe ? `Turno de ${turnoDe.nombre}` : ''}</p>
          </>
        ) : <p className="m-0 text-body-md text-on-surface-variant">El DM todavía no ha empezado el combate. Esta pantalla se actualizará sola.</p>}
        {error && <p className="m-0 mt-1 text-body-sm text-error">No se pudo sincronizar: {error}</p>}
      </div>

      {mias.length > 0 && (
        <div className="grid gap-1 rounded-lg bg-error-container/30 p-3 shadow-lg" aria-label="Tus condiciones">
          {mias.map(n => (
            <p key={n} className="m-0 text-body-sm text-on-surface"><b className="text-error">{n}.</b> {EFECTO_CONDICION[n] || ''}{n === 'Derribado' && esMiTurno ? ' (Es tu turno: lo notarás al moverte.)' : ''}</p>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2" role="group" aria-label="Tu turno">
        {TIPOS_BOTON.map(t => {
          const gastada = !!eco[t];
          return (
            <button key={t} type="button" onClick={() => setAbierto(t)} aria-haspopup="dialog"
              className={cx('flex min-h-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg p-2 text-center shadow-md transition-all', foco,
                gastada ? 'bg-surface-container-lowest text-outline opacity-60' : 'bg-primary-container text-on-primary-container hover:brightness-110')}>
              <FormaTipo t={t} className="size-5" />
              <span className="font-serif text-body-lg font-bold">{TIPOS[t][0]}</span>
              <span className="text-label-caps uppercase">{gastada ? 'Gastada' : 'Disponible'}</span>
            </button>
          );
        })}
      </div>

      {(ranuras.length > 0 || c.recursos.some((r: any) => r.id !== 'pg' && !/^slot\d/.test(r.id))) && (
        <section className="grid gap-3" aria-label="Recursos">
          <h3 className="m-0 flex items-center gap-1 font-serif text-headline-sm text-secondary"><Simbolo n="auto_awesome" className="text-body-lg" />Recursos</h3>
          {ranuras.map((r: any) => <Ranuras key={r.id} r={r} c={c} />)}
          <RecursosClase c={c} />
        </section>
      )}

      <Dialogo abierto={!!abierto} onCerrar={() => setAbierto(null)} titulo={abierto ? TIPOS[abierto][0] : ''} ancho="lg"
        descripcion={abierto ? TIPOS[abierto][1] : undefined}>
        {abierto && (
          <div className="space-y-3">
            <Boton variante={eco[abierto] ? 'secundario' : 'primario'} onClick={() => gastar(abierto, !eco[abierto])}>
              {eco[abierto] ? 'Recuperar (me equivoqué)' : `Marcar ${TIPOS[abierto][0].toLowerCase()} como gastada`}
            </Boton>
            <details className="rounded-lg bg-surface-container-low"><summary className="min-h-11 cursor-pointer list-none px-3 py-2 text-body-sm text-outline">Aplicar daño a un enemigo a mano</summary><div className="p-2"><GolpeAEnemigo enemigos={enemigos} mesa={{ dmId, campanaId, personajeId }} /></div></details>
            <OpcionesDeTipo c={c} t={abierto} usar={u => { setAbierto(null); setUso(u); }} />
          </div>
        )}
      </Dialogo>

      <UsoAccion c={c} uso={uso} enemigos={enemigos} mesa={{ dmId, campanaId, personajeId }} yaGastada={!!(uso && eco[uso.tipo])} alCerrar={() => setUso(null)}
        alUsar={t => { toques.current[t] = Date.now(); setEco(p => ({ ...p, [t]: true })); }} />
    </div>
  );
}
