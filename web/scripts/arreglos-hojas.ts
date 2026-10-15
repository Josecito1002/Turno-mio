/* Arreglos puntuales en hojas de jugadores que el administrador pidió (desde la nube no hay acceso a la base, así que
   se aplican al publicar, desde scripts/despliegue.ts). Cada arreglo comprueba que la hoja siga con el error antes de
   tocarla, así que repetirlo no hace nada. Cuando ya se aplicaron, se pueden quitar de la lista. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { and, eq, sql } from 'drizzle-orm';
import { personajes } from '../src/features/personajes/server/tablas';

type Arreglo = { usuarioId: string; id: string; que: string; aplicar: (pj: any) => boolean };

/* Campaña «El precio de los deseos», revisada el 2026-10-15 (pedido de Jose) */
export const ARREGLOS: Arreglo[] = [
  { usuarioId: '17e56129-9d47-4105-a242-8d92fe0cc351', id: 'pj-mut0wna6bmo', que: 'Tharik Vorn: equipa la cota de mallas de su equipo inicial',
    aplicar: pj => { if (pj.armadura !== 'ninguna' || pj.kits?.clase?.armadura !== 'mallas') return false; pj.armadura = 'mallas'; return true; } },
  { usuarioId: '74efd7f2-ea62-4c96-bcb5-0a1d9e091c96', id: 'pj-musywbgi31r', que: 'Cornifer: quita el rasgo vacío "Nose"',
    aplicar: pj => {
      const antes = (pj.rasgosExtra || []).length;
      pj.rasgosExtra = (pj.rasgosExtra || []).filter((r: any) => !(r.nombre === 'Nose' && !String(r.texto || '').trim()));
      return pj.rasgosExtra.length !== antes;
    } },
  { usuarioId: '0ee25c38-431b-4fc4-a798-5067219a8903', id: 'pj-mut0w43bjhe', que: 'Dayan Ravencroft: Explosión Agonizante vuelve a ser pasiva',
    aplicar: pj => { if (!pj.tipos || !('explosion agonizante' in pj.tipos)) return false; delete pj.tipos['explosion agonizante']; return true; } },
];

export async function aplicarArreglos(db: any, escribir: boolean) {
  const hechos: string[] = [];
  for (const a of ARREGLOS) {
    const [fila] = await db.select({ datos: personajes.datos }).from(personajes)
      .where(and(eq(personajes.usuarioId, a.usuarioId), eq(personajes.id, a.id))).limit(1);
    if (!fila) continue;
    const pj = structuredClone(fila.datos);
    if (!a.aplicar(pj)) continue;
    hechos.push(a.que);
    if (escribir) await db.update(personajes).set({ datos: pj, actualizadoEn: sql`now()` })
      .where(and(eq(personajes.usuarioId, a.usuarioId), eq(personajes.id, a.id)));
  }
  return hechos;
}
