/* Imágenes antiguas de clase y subclase (claves "c:..." y "s:..." de lib_extra, tipos img, imgOrig e imgCrop).
   El menú de clases ya solo usa las del set de especie y clase ("o|..."), así que estas sobran.
   Las descripciones y las imágenes de especies y subrazas no se tocan. */
import { and, inArray, like, or } from 'drizzle-orm';
import type { crearDb } from '../src/shared/db/conectar';
import { libExtra } from '../src/features/biblioteca/server/tablas';
import { TIPOS_MEDIA } from '../src/features/biblioteca/domain/mapeo';

type Db = ReturnType<typeof crearDb>['db'];
const antiguas = and(inArray(libExtra.tipo, [...TIPOS_MEDIA]), or(like(libExtra.clave, 'c:%'), like(libExtra.clave, 's:%')));

/** Devuelve las entradas antiguas y, si `borrar`, las borra */
export async function limpiarImagenesAntiguas(db: Db, borrar: boolean) {
  const filas = await db.select({ tipo: libExtra.tipo, clave: libExtra.clave }).from(libExtra).where(antiguas);
  if (borrar && filas.length) await db.delete(libExtra).where(antiguas);
  return filas;
}
