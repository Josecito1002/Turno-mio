'use client';
import { useState } from 'react';
import { Boton, Dialogo } from '@/shared/ui/kit';
import { avisar } from '@/shared/ui/avisos';
import { esc, norm, richT } from '@/shared/utils/texto';
import { TIPOS } from '@/features/reglas/data/caracteristicas';
import { useDados } from '@/features/dados/components/Bandeja';
import { CONDICIONES } from '@/features/mesa/domain/combate';
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
  /** Si hace daño o impone algo a otros */
  afecta: boolean;
};

const AREA = /esfera|cubo|cono|l[ií]nea|cilindro|radio|[aá]rea|a tu alrededor|emanaci[oó]n/i;
const NO_IMPONIBLES = ['Concentrado', 'Agotamiento', 'Invisible', 'Inconsciente'];
/** Condiciones que el texto menciona (con su raíz, para "Apresado/a", "Derribado"…). */
export function condicionesEn(texto: string): string[] {
  const t = norm(texto);
  return CONDICIONES.filter(n => !NO_IMPONIBLES.includes(n) && t.includes(norm(n).slice(0, -1)));
}

/** Confirmar el uso de una acción: lee sus efectos, elige a quién afecta y, al confirmar, la gasta y se lo cuenta al DM. */
export function UsoAccion({ uso, enemigos, mesa, yaGastada, alCerrar, alUsar }: {
  uso: Uso | null; enemigos: { k: string; nombre: string }[]; mesa: { dmId: string; campanaId: string; personajeId: string };
  yaGastada: boolean; alCerrar: () => void; alUsar: (t: TipoAccionRonda) => void;
}) {
  return (
    <Dialogo abierto={!!uso} onCerrar={alCerrar} titulo={uso?.nombre || ''} ancho="lg"
      descripcion={uso ? `${TIPOS[uso.tipo][0]}${uso.coste ? ` · ${uso.coste}` : ''}` : undefined}>
      {uso && <Cuerpo key={uso.nombre + uso.tipo} uso={uso} enemigos={enemigos} mesa={mesa} yaGastada={yaGastada} alCerrar={alCerrar} alUsar={alUsar} />}
    </Dialogo>
  );
}

function Cuerpo({ uso, enemigos, mesa, yaGastada, alCerrar, alUsar }: { uso: Uso; enemigos: { k: string; nombre: string }[]; mesa: { dmId: string; campanaId: string; personajeId: string }; yaGastada: boolean; alCerrar: () => void; alUsar: (t: TipoAccionRonda) => void }) {
  const tirar = useDados();
  const area = !!uso.salv && AREA.test(uso.texto);
  const conds = condicionesEn(uso.texto);
  const [objetivos, setObjetivos] = useState<string[]>([]);
  const [dano, setDano] = useState('');
  const [cond, setCond] = useState(uso.salv ? conds[0] || '' : '');
  const [ocupado, setOcupado] = useState(false);
  const mitad = !!uso.salv && /mitad/i.test(uso.texto);
  const campo = 'min-h-11 w-full rounded bg-surface-container-lowest px-2 text-body-md text-on-surface';
  const alternar = (k: string) => setObjetivos(o => (uso.salv && area ? (o.includes(k) ? o.filter(x => x !== k) : [...o, k]) : o[0] === k ? [] : [k]));
  const nombres = objetivos.map(k => enemigos.find(e => e.k === k)?.nombre || '').filter(Boolean);
  const n = Math.max(0, Math.round(+dano || 0));

  const tirarDados = () => tirar(uso.dexpr!, `${uso.nombre}: daño`).then(r => setDano(String(r.total)), () => {});

  const confirmar = async () => {
    setOcupado(true);
    try {
      const resumen = [nombres.length ? `a ${nombres.join(', ')}` : '', n ? `${n} de daño` : '', uso.salv && objetivos.length ? `salvación de ${uso.salv} CD ${uso.cd}` : '', cond].filter(Boolean).join(' · ');
      await usarAccionMesa(mesa, uso.tipo, uso.nombre, resumen);
      if (objetivos.length && (n || cond)) {
        if (uso.salv && uso.cd) await enviarSalvacionMesa(mesa, { objetivos, salv: uso.salv, cd: uso.cd, dano: n, mitad, ...(cond ? { condicion: cond } : {}), nota: uso.nombre });
        else for (const objetivo of objetivos) await enviarGolpeMesa(mesa, { objetivo, dano: n, ...(cond ? { condicion: cond } : {}), nota: uso.nombre });
      }
      alUsar(uso.tipo);
      avisar(`${uso.nombre}: listo. ${objetivos.length && uso.salv ? 'Tu DM verá qué enemigos deben tirar la salvación.' : 'Tu DM ya lo ve.'}`);
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

          <span className="mt-1 text-label-caps uppercase text-outline">Daño{mitad ? ' (si falla; mitad si supera la salvación)' : ''}</span>
          <input aria-label="Daño" type="number" inputMode="numeric" min={0} placeholder="El que sacaste con tus dados" value={dano} onChange={e => setDano(e.target.value)} className={campo} />
          {uso.dexpr && <button type="button" onClick={tirarDados} className="min-h-9 cursor-pointer text-left text-body-sm text-outline underline">O tirar dados virtuales ({uso.dexpr})</button>}

          {(uso.salv || conds.length > 0) && (
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
