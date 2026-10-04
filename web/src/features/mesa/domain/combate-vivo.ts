/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { combatiente } from './combate';
import { fijarCombateVivo } from '../api';

/* El DM publica el combate para que sus jugadores lo vean en su teléfono. Solo se envía cuando algo cambió, y la nueva ronda
   (o un combate que empieza) devuelve a todos su acción, adicional y reacción. */
const publicados = new Map<string, { firma: string; ronda: number; activo: boolean }>();
let cola: Promise<unknown> = Promise.resolve();

/** Lo que ven los jugadores del combate de la campaña `cp`. */
export function datosVivos(cp: any) {
  const cb = cp.combate || {};
  const orden = (cb.orden || []).map((o: any) => {
    const x = combatiente(o.k, cp);
    return x ? { k: o.k, nombre: x.nombre, tipo: x.tipo, pid: o.k.startsWith('jm:') ? o.k.split(':')[2] : undefined, cond: [...(cp.estado?.[o.k]?.cond || [])] } : null;
  }).filter(Boolean);
  return { activo: !!cb.activo, ronda: cb.ronda || 1, turno: cb.turno || 0, orden };
}

export function publicarCombate(cp: any) {
  const datos = datosVivos(cp), firma = JSON.stringify(datos), antes = publicados.get(cp.id);
  // Sin combate y sin nada publicado antes, no hay nada que contar
  if (!antes && !datos.activo) { publicados.set(cp.id, { firma, ronda: datos.ronda, activo: false }); return; }
  if (antes?.firma === firma) return;
  // Sin una publicación previa (recién abierta la página) no se reinicia nada: se respeta lo que ya gastaron
  const reiniciar = !!antes && (antes.ronda !== datos.ronda || antes.activo !== datos.activo);
  publicados.set(cp.id, { firma, ronda: datos.ronda, activo: datos.activo });
  cola = cola.then(() => fijarCombateVivo(cp.id, datos, reiniciar)).catch(() => { publicados.delete(cp.id); });
}
