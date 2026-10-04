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
import { descansar, setVal } from '../../acciones';
import { combateMesa, enviarGolpeMesa, gastarAccionMesa, type CombateVivo, type EconomiaRonda, type OrdenDm, type TipoAccionRonda } from '@/features/mesa/api';
import { EFECTO_CONDICION } from '@/features/mesa/domain/condiciones';
import { Entrada, datosConjuro } from '../piezas';
import { bonosPara } from '../../domain/lanzar';
import { UsoAccion, type Uso } from './UsoAccion';
import { FilaArsenal, FilaConjuro, Ranuras, RecursosClase } from './Ficha';

const TIPOS_BOTON: TipoAccionRonda[] = ['accion', 'adicional', 'reaccion'];

/** Aplica a esta hoja los descansos y la inspiración que mandó el DM. Se recuerda cuáles ya se aplicaron (por personaje);
 *  la primera vez solo cuentan las de los últimos 10 minutos, para no repetir lo de otras sesiones. */
function aplicarOrdenes(ordenes: OrdenDm[] | undefined, pid: string) {
  if (!ordenes?.length) return;
  const clave = 'mt-ordenes-' + pid;
  let vistos: string[] | null = null;
  try { const t = localStorage.getItem(clave); vistos = t ? JSON.parse(t) : null; } catch { /* sin almacenamiento: se aplican las recientes */ }
  const nuevas = ordenes.filter(o => (!o.personajeId || o.personajeId === pid) && (vistos ? !vistos.includes(o.id) : Date.now() - Date.parse(o.ts) < 600000));
  if (vistos && !nuevas.length) return;
  try { localStorage.setItem(clave, JSON.stringify([...(vistos || []), ...ordenes.map(o => o.id)].slice(-80))); } catch { /* idem */ }
  for (const o of nuevas) {
    if (o.tipo === 'inspiracion') { setVal('inspiracion', true); avisar('Tu DM te dio inspiración.'); }
    else descansar(o.tipo);
  }
}

const mismo = (a: Uso | null, b: Uso) => !!a && a.tipo === b.tipo && a.nombre === b.nombre;
/** Una opción que se elige tocándola (borde verde); abajo hay un solo botón para usar la elegida. */
function Opcion({ uso, elegido, elegir, children }: { uso: Uso; elegido: Uso | null; elegir: (u: Uso) => void; children: React.ReactNode }) {
  const marcada = mismo(elegido, uso);
  return (
    <div role="radio" aria-checked={marcada} tabIndex={0} onClick={() => elegir(uso)}
      onKeyDown={e => { if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); elegir(uso); } }}
      className={cx('cursor-pointer rounded-xl border-2 p-0.5 transition-colors', foco, marcada ? 'border-green-400 bg-green-400/10' : 'border-transparent')}>
      {children}
    </div>
  );
}

/** Lo que se puede hacer con cada tipo de acción: ataques, rasgos, conjuros y las acciones que cualquiera tiene. */
function OpcionesDeTipo({ c, t, elegido, elegir }: { c: any; t: TipoAccionRonda; elegido: Uso | null; elegir: (u: Uso) => void }) {
  const armas = t === 'accion' ? [...c.armas.filter((a: any) => a.mano), ...(c.naturales || [])] : [];
  const ents = c.entries.filter((e: any) => e.t === t);
  const conjuros = (c.conjuros || []).filter((s: any) => (s.tiempo || 'accion') === t);
  const com = COMUNES[t] || [];
  const op = (u: Uso, hijo: React.ReactNode, k: string | number) => <Opcion key={k} uso={u} elegido={elegido} elegir={elegir}>{hijo}</Opcion>;
  const deArma = (a: any): Uso => ({ tipo: t, nombre: a.nombre, texto: [a.dmg, ...(a.notas || [])].filter(Boolean).join('. ') || 'Ataque', ...(a.cd == null ? { atk: a.atk } : { salv: a.salv, cd: a.cd }), dexpr: a.expr, afecta: true });
  const deRasgo = (e: any): Uso => {
    // Un rasgo que ataca (Golpe sin armas extra, Ráfaga de golpes…) trae su tirada: se trata como un ataque
    const atk = e.roll?.[0] ? +(/([+-]\d+)\s*$/.exec(e.roll[0])?.[1] ?? 0) : undefined;
    const gasta = e.recurso && /^1 /.test(e.coste || '') ? e.recurso : undefined;
    return { tipo: t, nombre: e.nombre, coste: e.coste, texto: e.texto || '', raw: !!e.raw, ...(atk != null ? { atk, dexpr: e.roll[1] } : {}), afecta: atk != null, ...(gasta ? { gasta } : {}) };
  };
  const deConjuro = (s: any): Uso => {
    const d = datosConjuro(s, c), salv = s.salv ? String(s.salv).toUpperCase() : undefined;
    return { tipo: t, nombre: s.nombre, coste: s.coste || (+s.nivel ? `Nivel ${s.nivel}` : 'Truco'), texto: String(s.desc || '').trim(), raw: true, ...(s.ataque && d.atk != null ? { atk: d.atk } : {}), ...(salv ? { salv, cd: d.cd } : {}), dexpr: d.dexpr || undefined, afecta: !!(s.ataque || salv || s.dados),
      ...(+s.nivel > 0 ? { conjuro: { nivel: +s.nivel, rasgo: s.recurso, ritual: !!s.ritual, desc: s.desc, base: d.dexpr, bono: d.dexpr ? bonosPara(c, s).reduce((x: number, b: any) => x + (+b.valor || 0), 0) : 0 } } : {}) };
  };
  return (
    <div role="radiogroup" aria-label="Elige qué haces" className="space-y-3">
      {armas.length > 0 && (
        <div className="space-y-2"><span className="text-label-caps uppercase text-outline">Ataques</span>
          {armas.map((a: any, i: number) => op(deArma(a), <FilaArsenal a={a} c={c} />, a.nombre + i))}</div>
      )}
      {ents.length > 0 && <div><span className="text-label-caps uppercase text-outline">Rasgos</span>
        {ents.map((e: any, i: number) => op(deRasgo(e), <Entrada e={e} />, i))}</div>}
      {conjuros.length > 0 && (
        <div className="space-y-1"><span className="text-label-caps uppercase text-outline">Conjuros</span>
          <ul className="m-0 list-none space-y-2 p-0">{conjuros.map((s: any, i: number) => <li key={s.nombre + i}>{op(deConjuro(s), <FilaConjuro s={s} c={c} />, 0)}</li>)}</ul></div>
      )}
      {com.length > 0 && (
        <div><span className="text-label-caps uppercase text-outline">Las que cualquiera puede hacer</span>
          {com.map(([n, f]: [string, (c: any) => string]) => op({ tipo: t, nombre: n, texto: f(c), afecta: n === 'Atacar' }, <Entrada e={{ t, nombre: n, texto: f(c), src: 'Reglas básicas' }} />, n))}</div>
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
  const [elegido, setElegido] = useState<Uso | null>(null);
  const [error, setError] = useState('');
  const toques = useRef<Partial<Record<TipoAccionRonda, number>>>({});

  useEffect(() => {
    let vivo = true;
    const ref = { dmId, campanaId, personajeId };
    const leer = () => combateMesa(ref).then(d => {
      if (!vivo) return;
      setViv(d); setError('');
      aplicarOrdenes(d?.ordenes, personajeId);
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
  const salir = () => { S.combateMesa = null; S.combateHoja = false; S.view = 'mesaj'; render(); };
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
          <Boton tamano="sm" variante="peligro" onClick={salir}>Volver a la mesa</Boton>
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
            <button key={t} type="button" onClick={() => { setElegido(null); setAbierto(t); }} aria-haspopup="dialog"
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
            {eco[abierto] && <Boton variante="secundario" onClick={() => gastar(abierto, false)}>Recuperar {TIPOS[abierto][0].toLowerCase()} (me equivoqué)</Boton>}
            <details className="rounded-lg bg-surface-container-low"><summary className="min-h-11 cursor-pointer list-none px-3 py-2 text-body-sm text-outline">Aplicar daño a un enemigo a mano</summary><div className="p-2"><GolpeAEnemigo enemigos={enemigos} mesa={{ dmId, campanaId, personajeId }} /></div></details>
            <OpcionesDeTipo c={c} t={abierto} elegido={elegido?.tipo === abierto ? elegido : null} elegir={setElegido} />
            <div className="sticky bottom-0 -mx-1 flex flex-wrap gap-2 bg-surface-container-low/95 p-2 backdrop-blur">
              <Boton variante="primario" className="flex-1" disabled={!elegido || elegido.tipo !== abierto} onClick={() => { setUso(elegido); setAbierto(null); }}>
                {elegido && elegido.tipo === abierto ? `Usar ${elegido.nombre}` : 'Toca una opción para elegirla'}
              </Boton>
              {!eco[abierto] && <Boton onClick={() => gastar(abierto, true)}>Solo marcarla gastada</Boton>}
            </div>
          </div>
        )}
      </Dialogo>

      <UsoAccion c={c} uso={uso} enemigos={enemigos} mesa={{ dmId, campanaId, personajeId }} yaGastada={!!(uso && eco[uso.tipo])} alCerrar={() => setUso(null)}
        alUsar={t => { toques.current[t] = Date.now(); setEco(p => ({ ...p, [t]: true })); }} />
    </div>
  );
}
