/* eslint-disable @typescript-eslint/no-explicit-any */
import { S } from '@/app-shell/estado';
import { avisar } from '@/shared/ui/avisos';
import type { OrdenDm } from '@/features/mesa/api';
import { descansar, moverPool, setVal } from '../../acciones';

/** Lo que otro jugador o el DM te hizo: daño (primero a los PG temporales), curación, y un efecto que queda a la vista hasta que lo quites. */
function aplicarEfecto(o: OrdenDm) {
  const pj = S.pj; if (!pj) return;
  const n = Math.max(0, Math.round(o.dano || 0));
  if (n && o.cura) moverPool('pg', n);
  else if (n) {
    const temp = Math.max(0, +pj.pgTemp || 0), t = Math.min(temp, n);
    if (t) setVal('pgTemp', temp - t);
    if (n - t) moverPool('pg', -(n - t));
  }
  if (o.condicion || o.bono) setVal('efectos', [...(pj.efectos || []).filter((x: any) => x.nombre !== (o.condicion || 'Efecto')), { nombre: o.condicion || 'Efecto', texto: o.bono || '', de: o.de || '' }]);
  avisar(`${o.de || 'Alguien'}${o.nota ? ` (${o.nota})` : ''}: ${n ? (o.cura ? `te cura ${n} PG` : `te hace ${n} de daño`) : ''}${o.condicion ? `${n ? ', ' : ''}${o.condicion}` : ''}.`);
}

/** Aplica a esta hoja los descansos y la inspiración que mandó el DM. Se recuerda cuáles ya se aplicaron (por personaje);
 *  la primera vez solo cuentan las de los últimos 10 minutos, para no repetir lo de otras sesiones. */
export function aplicarOrdenes(ordenes: OrdenDm[] | undefined, pid: string) {
  if (!ordenes?.length) return;
  const clave = 'mt-ordenes-' + pid;
  let vistos: string[] | null = null;
  try { const t = localStorage.getItem(clave); vistos = t ? JSON.parse(t) : null; } catch { /* sin almacenamiento: se aplican las recientes */ }
  const nuevas = ordenes.filter(o => (!o.personajeId || o.personajeId === pid) && (vistos ? !vistos.includes(o.id) : Date.now() - Date.parse(o.ts) < 600000));
  if (vistos && !nuevas.length) return;
  try { localStorage.setItem(clave, JSON.stringify([...(vistos || []), ...ordenes.map(o => o.id)].slice(-80))); } catch { /* idem */ }
  for (const o of nuevas) {
    if (o.tipo === 'inspiracion') { setVal('inspiracion', true); avisar('Tu DM te dio inspiración.'); }
    else if (o.tipo === 'efecto') aplicarEfecto(o);
    else descansar(o.tipo);
  }
}
