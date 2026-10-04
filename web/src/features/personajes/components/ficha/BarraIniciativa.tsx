'use client';
import { useState } from 'react';
import { Boton, Dialogo, cx, foco } from '@/shared/ui/kit';
import { avisar } from '@/shared/ui/avisos';
import { pedirInfoMesa, type CombateVivo } from '@/features/mesa/api';

type Entrada = NonNullable<NonNullable<CombateVivo>['orden']>[number];
const ROTULO: Record<string, string> = { m: 'Enemigo', aliado: 'Aliado', pj: 'Personaje del DM', jug: 'Jugador' };

/** Orden de iniciativa en óvalos pequeños: el del turno con borde amarillo y un puntito morado si tiene efectos.
 *  Hasta que todos actúan en la primera ronda solo se ven quienes ya jugaron (y tú); el resto aparece como "?". */
export function BarraIniciativa({ viv, miPid, mesa }: { viv: NonNullable<CombateVivo>; miPid: string; mesa: { dmId: string; campanaId: string; personajeId: string } }) {
  const [abierto, setAbierto] = useState<Entrada | null>(null);
  const [pedidos, setPedidos] = useState<string[]>([]);
  const orden = viv.orden || [], turno = viv.turno || 0, primera = (viv.ronda || 1) <= 1;
  if (!viv.activo || !orden.length) return null;
  const conoce = (o: Entrada, i: number) => !primera || i <= turno || o.pid === miPid;
  const efectos = (o: Entrada) => (o.cond?.length || 0) > 0 || Object.keys(o.dur || {}).length > 0;
  const pedir = (o: Entrada) => {
    setPedidos(p => [...p, o.k]);
    pedirInfoMesa(mesa, o.k).then(() => avisar('Se lo pedí al DM. Si lo aprueba, lo verás aquí.'), (e: Error) => { setPedidos(p => p.filter(k => k !== o.k)); avisar(`No se pudo pedir: ${e.message}`, 'error'); });
  };
  const info = abierto?.info;
  return (
    <>
      <nav aria-label="Orden de iniciativa" className="sticky top-[var(--alto-cabecera,0px)] z-20 -mx-4 overflow-x-auto bg-surface/95 px-4 py-1.5 backdrop-blur [scrollbar-width:thin]">
        <ol className="m-0 flex w-max list-none items-center gap-1.5 p-0">
          {orden.map((o, i) => {
            const ve = conoce(o, i), turnoActual = i === turno;
            return (
              <li key={o.k} className="relative">
                <button type="button" disabled={!ve} onClick={() => setAbierto(o)} aria-current={turnoActual ? 'step' : undefined}
                  aria-label={ve ? `${o.nombre}${turnoActual ? ', turno actual' : ''}${efectos(o) ? ', con efectos' : ''}` : 'Combatiente por descubrir'}
                  className={cx('flex min-h-7 items-center rounded-full border px-2.5 text-[0.7rem] font-bold leading-none', foco,
                    turnoActual ? 'border-2 border-yellow-400 bg-yellow-400/15 text-on-surface' : 'border-outline-variant bg-surface-container-low text-on-surface-variant',
                    o.tipo === 'm' && ve && 'text-error', o.pid === miPid && 'text-primary', !ve && 'opacity-60')}>
                  {ve ? o.nombre : '?'}
                </button>
                {ve && efectos(o) && <span aria-hidden className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border border-surface bg-purple-500" />}
              </li>
            );
          })}
        </ol>
      </nav>
      <Dialogo abierto={!!abierto} onCerrar={() => setAbierto(null)} titulo={abierto?.nombre || ''} ancho="md" descripcion={abierto ? ROTULO[abierto.tipo] || '' : undefined}>
        {abierto && (
          <div className="space-y-2 text-body-md">
            {abierto.cond?.length ? <p className="m-0"><b>Estados:</b> {abierto.cond.map(c => abierto.dur?.[c] ? `${c} (${abierto.dur[c]})` : c).join(', ')}.</p> : <p className="m-0 text-on-surface-variant">Sin estados ni efectos a la vista.</p>}
            {abierto.tipo === 'm' && (info ? (
              <div className="rounded-lg bg-surface-container-low p-2">
                <p className="m-0"><b>CA {info.ca}</b>{info.tipo ? ` · ${info.tam ? info.tam + ' ' : ''}${info.tipo}` : ''}</p>
                {info.nivel === 'd' && (info.resist || info.vuln || info.inmune || info.condInmune
                  ? <ul className="m-0 mt-1 list-none p-0 text-body-sm">
                    {info.vuln && <li><b>Vulnerable:</b> {info.vuln}</li>}{info.resist && <li><b>Resiste:</b> {info.resist}</li>}
                    {info.inmune && <li><b>Inmune:</b> {info.inmune}</li>}{info.condInmune && <li><b>Inmune a condiciones:</b> {info.condInmune}</li>}
                  </ul> : <p className="m-0 mt-1 text-body-sm text-on-surface-variant">No tiene resistencias ni debilidades notables.</p>)}
              </div>
            ) : (
              <>
                <p className="m-0 text-on-surface-variant">No sabes nada de este enemigo todavía.</p>
                <Boton disabled={pedidos.includes(abierto.k)} onClick={() => pedir(abierto)}>{pedidos.includes(abierto.k) ? 'Pedido enviado al DM' : 'Pedir al DM lo que sé de él'}</Boton>
              </>
            ))}
          </div>
        )}
      </Dialogo>
    </>
  );
}
