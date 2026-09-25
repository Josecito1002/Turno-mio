/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Campo, Nota } from '@/shared/ui/kit';
import { Desplegable } from '@/shared/ui/desplegable';
import { ARMAS } from '@/features/reglas/data/equipo';
import { aDosManos, puedeIrEnLaOtra } from '../domain/manos';
import { armadurasDe } from '../domain/inventario';
import { setMano } from '../acciones';

/** Qué lleva en cada mano. Solo las armas empuñadas salen en Atacar; el escudo cuenta si va en la otra mano. */
export function ElegirManos({ pj, c }: { pj: any; c: any }) {
  const { a, b } = c.manos;
  const ks: string[] = (pj.armas || []).map(([k]: any) => k).filter((k: string) => ARMAS[k]);
  const dos = !!a && aDosManos(a);
  const otras = ks.filter(k => puedeIrEnLaOtra(pj, k, a));
  const escudo = armadurasDe(pj).includes('escudo');
  const otra = pj.escudo && !dos && !b ? 'escudo' : b;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Campo etiqueta="Mano principal">
        <Desplegable value={a} onChange={e => setMano('a', e.target.value)}>
          <option value="">Nada</option>
          {ks.map(k => <option key={k} value={k}>{ARMAS[k].n}{aDosManos(k) ? ' (a dos manos)' : ''}</option>)}
        </Desplegable>
      </Campo>
      <Campo etiqueta="Otra mano">
        <Desplegable value={dos ? '' : otra} onChange={e => setMano('b', e.target.value)} disabled={dos}>
          <option value="">Nada</option>
          {escudo && <option value="escudo">Escudo (+2 CA){!c.compArm?.escudo ? ' — sin competencia' : ''}</option>}
          {otras.map(k => <option key={k} value={k}>{ARMAS[k].n}</option>)}
        </Desplegable>
      </Campo>
      <Nota className="sm:col-span-2">
        {dos ? `${ARMAS[a].n} se usa a dos manos: la otra mano queda ocupada.`
          : 'En la otra mano solo va un arma ligera (con Portador Dual, cualquiera que no sea a dos manos). Las demás armas las llevas guardadas: sacarlas es interactuar con un objeto.'}
      </Nota>
    </div>
  );
}
