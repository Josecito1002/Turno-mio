'use client';
import { useEffect } from 'react';
import { S } from '@/app-shell/estado';
import { combateMesa, entregasMesa, misMesas, recibirEntregas, type MesaUnida } from '@/features/mesa/api';
import { recibirObjeto } from '../acciones';
import { aplicarOrdenes } from './ficha/ordenes-dm';

/** Las mesas del jugador se piden una vez cada pocos minutos, no en cada vuelta. */
let mesas: { ts: number; lista: MesaUnida[] } | null = null;
const MESAS_MS = 5 * 60_000, CADA_MS = 30_000;
async function mesasDe(personajeId: string) {
  if (!mesas || Date.now() - mesas.ts > MESAS_MS) mesas = { ts: Date.now(), lista: await misMesas() };
  return mesas.lista.filter(m => m.personajeId === personajeId);
}

/** Mientras la hoja está abierta, mete en el inventario los objetos que le dio el DM desde la mesa y aplica el daño,
 *  la curación y los descansos que mandó (cada 30 s). En la pantalla de combate eso ya se mira cada 2 s. */
export function RecibirEntregas({ personajeId }: { personajeId: string }) {
  useEffect(() => {
    if (!S.usuario) return;
    let vivo = true, ocupado = false;
    const mirar = async () => {
      if (ocupado || document.hidden) return;
      ocupado = true;
      try {
        for (const m of await mesasDe(personajeId)) {
          const ref = { dmId: m.dmId, campanaId: m.campanaId, personajeId };
          if (S.combateMesa?.personajeId !== personajeId) {
            const viv = await combateMesa(ref);
            if (vivo && S.pj?.id === personajeId) aplicarOrdenes(viv?.ordenes, personajeId);
          }
          const nuevas = await entregasMesa(ref);
          // Si en medio cambió de hoja, se recogen la próxima vez que abra esta
          if (!vivo || !nuevas.length || S.pj?.id !== personajeId) continue;
          for (const e of nuevas) recibirObjeto(e.objeto);
          await recibirEntregas(ref, nuevas.map(e => e.id));
        }
      } catch { /* sin conexión: se vuelve a intentar en la siguiente vuelta */ }
      finally { ocupado = false; }
    };
    void mirar();
    const t = setInterval(mirar, CADA_MS);
    return () => { vivo = false; clearInterval(t); };
  }, [personajeId]);
  return null;
}
