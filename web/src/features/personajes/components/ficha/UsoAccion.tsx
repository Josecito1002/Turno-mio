/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { Boton, Dialogo } from '@/shared/ui/kit';
import { avisar } from '@/shared/ui/avisos';
import { esc, norm, richT } from '@/shared/utils/texto';
import { TIPOS } from '@/features/reglas/data/caracteristicas';
import { useDados } from '@/features/dados/components/Bandeja';
import { CONDICIONES } from '@/features/mesa/domain/combate';
import { gastarEspacio, gastarRecurso } from '../../acciones';
import { dadosAlLanzar, espaciosPara } from '../../domain/lanzar';
import { enviarGolpeMesa, enviarSalvacionMesa, usarAccionMesa, type TipoAccionRonda } from '@/features/mesa/api';

/** Algo que el jugador puede hacer con una acción: un ataque, un conjuro, un rasgo o una acción básica. */
export type Uso = {
  tipo: TipoAccionRonda; nombre: string; coste?: string;
  /** Qué hace, en texto (con formato si `raw`) */
  texto: string; raw?: boolean;
  /** Ataque con tirada: bono al impacto */
  atk?: number;
  /** Salvación que tiran los objetivos (FUE, DES…) y su CD */
  salv?: string; cd?: number;
  /** Los dados de daño, para tirar uno virtual si el jugador lo prefiere */
  dexpr?: string;
  /** Cuántos golpes o ataques hace de una vez (Uno-Dos: 2); cada uno se registra por separado y el daño se suma */
  golpes?: number;
  /** Si hace daño o impone algo a otros */
  afecta: boolean;
  /** Recurso que gasta al usarlo (un uso del rasgo) */
  gasta?: string;
  /** Conjuro de nivel 1 o más: se paga con un espacio (o con el rasgo que lo da, o como ritual) */
  conjuro?: { nivel: number; rasgo?: string; ritual?: boolean; desc: string; base: string; bono: number };
};

const AREA = /esfera|cubo|cono|l[ií]nea|cilindro|radio|[aá]rea|a tu alrededor|emanaci[oó]n/i;
const NO_IMPONIBLES = ['Concentrado', 'Agotamiento', 'Invisible', 'Inconsciente'];
/** Condiciones que el texto menciona (con su raíz, para "Apresado/a", "Derribado"…). */
export function condicionesEn(texto: string): string[] {
  const t = norm(texto);
  return CONDICIONES.filter(n => !NO_IMPONIBLES.includes(n) && t.includes(norm(n).slice(0, -1)));
}

/** Confirmar el uso de una acción: lee sus efectos, elige a quién afecta y, al confirmar, la gasta y se lo cuenta al DM. */
export function UsoAccion({ c, uso, enemigos, mesa, yaGastada, alCerrar, alUsar }: {
  c: any; uso: Uso | null; enemigos: { k: string; nombre: string }[]; mesa: { dmId: string; campanaId: string; personajeId: string };
  yaGastada: boolean; alCerrar: () => void; alUsar: (t: TipoAccionRonda) => void;
}) {
  return (
    <Dialogo abierto={!!uso} onCerrar={alCerrar} titulo={uso?.nombre || ''} ancho="lg"
      descripcion={uso ? `${TIPOS[uso.tipo][0]}${uso.coste ? ` · ${uso.coste}` : ''}` : undefined}>
      {uso && <Cuerpo key={uso.nombre + uso.tipo} c={c} uso={uso} enemigos={enemigos} mesa={mesa} yaGastada={yaGastada} alCerrar={alCerrar} alUsar={alUsar} />}
    </Dialogo>
  );
}

function Cuerpo({ c, uso, enemigos, mesa, yaGastada, alCerrar, alUsar }: { c: any; uso: Uso; enemigos: { k: string; nombre: string }[]; mesa: { dmId: string; campanaId: string; personajeId: string }; yaGastada: boolean; alCerrar: () => void; alUsar: (t: TipoAccionRonda) => void }) {
  const tirar = useDados();
  const area = !!uso.salv && AREA.test(uso.texto);
  const conds = condicionesEn(uso.texto);
  const [objetivos, setObjetivos] = useState<string[]>([]);
  const [dano, setDano] = useState('');
  const nGolpes = uso.golpes && uso.golpes > 1 ? uso.golpes : 1;
  const [danos, setDanos] = useState<string[]>(() => Array(nGolpes).fill(''));
  const [cond, setCond] = useState(uso.salv ? conds[0] || '' : '');
  const [ocupado, setOcupado] = useState(false);
  // Con qué se paga un conjuro de nivel: un espacio (de ese nivel o mayor), el rasgo que lo da o, si es ritual, sin gastar
  const cj = uso.conjuro;
  const espacios = cj ? espaciosPara(c, cj.nivel) : [];
  const rasgoRec = cj?.rasgo ? (c.recursos || []).find((r: any) => r.id === cj.rasgo) : null;
  const quedaRasgo = rasgoRec ? rasgoRec.max - Math.min(c.pj.used?.[rasgoRec.id] || 0, rasgoRec.max) : 0;
  const primero = espacios.find((e: any) => e.quedan > 0);
  const [via, setVia] = useState<string>(cj ? (rasgoRec && quedaRasgo ? 'rasgo' : primero ? 'slot' + primero.nivel : cj.ritual ? 'ritual' : '') : '');
  const nivelUsado = via.startsWith('slot') ? +via.slice(4) : cj?.nivel || 0;
  const dexpr = cj ? dadosAlLanzar(cj.base, cj.nivel, nivelUsado, cj.desc, cj.bono) || undefined : uso.dexpr;
  const recGasta = uso.gasta ? (c.recursos || []).find((r: any) => r.id === uso.gasta) : null;
  const quedaGasta = recGasta ? recGasta.max - Math.min(c.pj.used?.[recGasta.id] || 0, recGasta.max) : 0;
  const mitad = !!uso.salv && /mitad/i.test(uso.texto);
  const campo = 'min-h-11 w-full rounded bg-surface-container-lowest px-2 text-body-md text-on-surface';
  const alternar = (k: string) => setObjetivos(o => (uso.salv && area ? (o.includes(k) ? o.filter(x => x !== k) : [...o, k]) : o[0] === k ? [] : [k]));
  const nombres = objetivos.map(k => enemigos.find(e => e.k === k)?.nombre || '').filter(Boolean);
  const parcial = (x: string) => Math.max(0, Math.round(+x || 0));
  const n = nGolpes > 1 ? danos.reduce((t, x) => t + parcial(x), 0) : parcial(dano);
  const puesto = (i: number) => danos[i] !== '';

  const tirarDados = (i = -1) => {
    try { tirar(dexpr!, `${uso.nombre}: daño${i >= 0 ? ` (golpe ${i + 1})` : ''}`).then(r => (i >= 0 ? setDanos(d => d.map((x, j) => (j === i ? String(r.total) : x))) : setDano(String(r.total))), e => avisar(`No se pudo tirar: ${(e as Error).message}`, 'error')); }
    catch (e) { avisar(`No se pudo tirar: ${(e as Error).message}`, 'error'); }
  };

  const confirmar = async () => {
    if (cj && !via) { avisar('Elige con qué lo lanzas.', 'error'); return; }
    if (n && !objetivos.length) { avisar('Elige a quién le haces el daño.', 'error'); return; }
    // Primero se paga: si no queda con qué, no se hace nada
    if (via === 'rasgo' && rasgoRec && !gastarRecurso(rasgoRec.id)) return;
    if (uso.gasta && !gastarRecurso(uso.gasta)) return;
    if (via.startsWith('slot') && !gastarEspacio(nivelUsado)) return;
    setOcupado(true);
    try {
      const pago = via === 'rasgo' ? `con ${rasgoRec?.nombre}` : via.startsWith('slot') ? `con espacio de nivel ${nivelUsado}` : cj?.ritual ? 'como ritual' : '';
      const resumen = [pago, nombres.length ? `a ${nombres.join(', ')}` : '', n ? (nGolpes > 1 ? `${danos.map((x, i) => `golpe ${i + 1}: ${parcial(x)}`).join(' + ')} = ${n} de daño` : `${n} de daño`) : '', uso.salv && objetivos.length ? `salvación de ${uso.salv} CD ${uso.cd}` : '', cond].filter(Boolean).join(' · ');
      await usarAccionMesa(mesa, uso.tipo, uso.nombre, resumen);
      if (objetivos.length && (n || cond)) {
        if (uso.salv && uso.cd) await enviarSalvacionMesa(mesa, { objetivos, salv: uso.salv, cd: uso.cd, dano: n, mitad, ...(cond ? { condicion: cond } : {}), nota: uso.nombre });
        else for (const objetivo of objetivos) await enviarGolpeMesa(mesa, { objetivo, dano: n, ...(cond ? { condicion: cond } : {}), nota: uso.nombre });
      }
      alUsar(uso.tipo);
      avisar(`${uso.nombre}: listo${nGolpes > 1 ? `, ${danos.map(parcial).join(' + ')} = ${n} de daño` : ''}. ${objetivos.length && uso.salv ? 'Tu DM verá qué enemigos deben tirar la salvación.' : 'Tu DM ya lo ve.'}`);
      alCerrar();
    } catch (e) { avisar(`No se pudo confirmar: ${(e as Error).message}`, 'error'); }
    finally { setOcupado(false); }
  };

  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-surface-container-low p-3 text-body-md text-on-surface-variant">
        <span className="text-label-caps uppercase text-outline">Qué hace</span>
        <p className="m-0 mt-1" dangerouslySetInnerHTML={{ __html: uso.raw ? richT(uso.texto) : esc(uso.texto) }} />
        {uso.atk != null && <p className="m-0 mt-1 font-bold text-on-surface">Ataque: {uso.atk >= 0 ? '+' : ''}{uso.atk} al impacto</p>}
        {uso.salv && <p className="m-0 mt-1 font-bold text-on-surface">Los objetivos tiran salvación de {uso.salv} contra CD {uso.cd}</p>}
      </div>

      {recGasta && (
        <p className="m-0 rounded-lg bg-surface-container-low p-3 text-body-md text-on-surface">Gasta 1 de <b>{recGasta.nombre}</b>: <span className={quedaGasta ? '' : 'text-error'}>{quedaGasta ? `quedan ${quedaGasta}, te quedarían ${quedaGasta - 1}` : 'ya no te queda'}</span></p>
      )}

      {cj && (
        <div className="grid gap-2 rounded-lg bg-surface-container-low p-3">
          <span className="text-label-caps uppercase text-outline">¿Con qué lo lanzas? Se gasta al confirmar</span>
          {rasgoRec && <Opcion marcada={via === 'rasgo'} deshabilitada={!quedaRasgo} alElegir={() => setVia('rasgo')}>Con {rasgoRec.nombre} <small className="text-outline">quedan {quedaRasgo}</small></Opcion>}
          {espacios.map((e: any) => (
            <Opcion key={e.nivel} marcada={via === 'slot' + e.nivel} deshabilitada={!e.quedan} alElegir={() => setVia('slot' + e.nivel)}>
              {e.nombre} <small className="text-outline">{e.quedan ? `quedan ${e.quedan}, te quedarían ${e.quedan - 1}` : 'sin espacios'}</small>
            </Opcion>
          ))}
          {cj.ritual && <Opcion marcada={via === 'ritual'} alElegir={() => setVia('ritual')}>Como ritual (10 minutos más, sin espacio)</Opcion>}
          {!espacios.length && !rasgoRec && !cj.ritual && <p className="m-0 text-body-sm text-error">No tienes espacios de este nivel o más.</p>}
        </div>
      )}

      {uso.afecta && (
        <div className="grid gap-2 rounded-lg bg-surface-container-low p-3">
          <span className="text-label-caps uppercase text-outline">{area ? 'Quiénes están en el área' : uso.salv ? 'Objetivo' : 'Objetivo del ataque'}</span>
          {enemigos.length ? (
            <ul className="m-0 grid list-none gap-1 p-0">
              {enemigos.map(e => (
                <li key={e.k}>
                  <label className="flex min-h-11 cursor-pointer items-center gap-2 rounded bg-surface-container-lowest px-2 text-body-md text-on-surface">
                    <input type={area ? 'checkbox' : 'radio'} name="objetivo" checked={objetivos.includes(e.k)} onChange={() => alternar(e.k)} className="size-4" />{e.nombre}
                  </label>
                </li>
              ))}
            </ul>
          ) : <p className="m-0 text-body-sm text-outline">No hay enemigos en el combate.</p>}

          {!objetivos.length && enemigos.length > 0 && <p className="m-0 text-body-sm text-outline">Elige primero a quién; después ponemos el daño.</p>}
          {objetivos.length > 0 && (
            <>
          {nGolpes > 1 ? (
            <>
              <span className="mt-1 text-label-caps uppercase text-outline">Daño de cada golpe, uno por uno</span>
              {Array.from({ length: nGolpes }, (_, i) => (i === 0 || puesto(i - 1)) && (
                <div key={i} className="grid gap-2 rounded bg-surface-container-lowest p-2">
                  <span className="text-body-sm font-bold text-on-surface">{i === 0 ? 'Primer golpe' : i === 1 ? 'Segundo golpe' : `Golpe ${i + 1}`}</span>
                  <input aria-label={`Daño del golpe ${i + 1}`} type="number" inputMode="numeric" min={0} placeholder="El que sacaste con tus dados" value={danos[i]}
                    onChange={e => setDanos(d => d.map((x, j) => (j === i ? e.target.value : x)))} className={campo} />
                  {dexpr && <Boton variante="secundario" onClick={() => tirarDados(i)}>O tirar dados virtuales ({dexpr})</Boton>}
                </div>
              ))}
              {danos.some((x, i) => puesto(i)) && (
                <p className="m-0 rounded bg-surface-container-lowest p-2 text-body-md font-bold text-on-surface">
                  Registrado: {danos.filter((_, i) => puesto(i)).map((x, i) => `golpe ${i + 1}: ${parcial(x)}`).join(' + ')} = {n} de daño
                </p>
              )}
            </>
          ) : (
            <>
          <span className="mt-1 text-label-caps uppercase text-outline">Daño{mitad ? ' (si falla; mitad si supera la salvación)' : ''}</span>
          <input aria-label="Daño" type="number" inputMode="numeric" min={0} placeholder="El que sacaste con tus dados" value={dano} onChange={e => setDano(e.target.value)} className={campo} />
          {dexpr && <Boton variante="secundario" onClick={() => tirarDados()}>O tirar dados virtuales ({dexpr})</Boton>}
            </>
          )}
            </>
          )}

          {objetivos.length > 0 && (uso.salv || conds.length > 0) && (
            <>
              <span className="mt-1 text-label-caps uppercase text-outline">{uso.salv ? 'Condición si falla la salvación' : 'Condición que impone'}</span>
              <select aria-label="Condición" value={cond} onChange={e => setCond(e.target.value)} className={campo}>
                <option value="">Ninguna</option>
                {[...new Set([...conds, ...CONDICIONES])].map(c => <option key={c}>{c}</option>)}
              </select>
            </>
          )}
        </div>
      )}

      {yaGastada && <p className="m-0 text-body-sm text-error">Ya marcaste esta acción como gastada esta ronda.</p>}
      <Boton variante="primario" disabled={ocupado} onClick={confirmar}>Confirmar</Boton>
    </div>
  );
}

function Opcion({ marcada, deshabilitada, alElegir, children }: { marcada: boolean; deshabilitada?: boolean; alElegir: () => void; children: React.ReactNode }) {
  return (
    <label className={`flex min-h-11 items-center gap-2 rounded bg-surface-container-lowest px-2 text-body-md text-on-surface ${deshabilitada ? 'opacity-50' : 'cursor-pointer'}`}>
      <input type="radio" name="pago" disabled={deshabilitada} checked={marcada} onChange={alElegir} className="size-4" /><span>{children}</span>
    </label>
  );
}
