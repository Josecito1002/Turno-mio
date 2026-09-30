/* Borra de la biblioteca las imágenes que no son del set nuevo de origen (clave "o|..."): las de especies, subrazas,
   clases, subclases y demás (tipos img, imgOrig e imgCrop de lib_extra). No toca descripciones ni otros datos.
   Uso: npm run db:limpiar-imagenes            → solo lista lo que borraría
        npm run db:limpiar-imagenes -- --aplicar → borra */
import { and, inArray, notLike, sql } from 'drizzle-orm';
import { crearDb } from '../src/shared/db/conectar';
import { libExtra } from '../src/features/biblioteca/server/tablas';
import { TIPOS_MEDIA } from '../src/features/biblioteca/domain/mapeo';

async function main() {
  const aplicar = process.argv.includes('--aplicar');
  const { db, cerrar } = crearDb();
  const borrar = and(inArray(libExtra.tipo, [...TIPOS_MEDIA]), notLike(libExtra.clave, 'o|%'));
  const filas = await db.select({ tipo: libExtra.tipo, clave: libExtra.clave }).from(libExtra).where(borrar);
  const [{ n: quedan }] = await db.select({ n: sql<number>`count(*)::int` }).from(libExtra).where(and(inArray(libExtra.tipo, ['img']), sql`${libExtra.clave} like 'o|%'`));
  const grupos = new Map<string, number>();
  for (const f of filas) { const g = `${f.tipo} ${f.clave.includes(':') ? f.clave.split(':')[0] + ':' : '(otras)'}`; grupos.set(g, (grupos.get(g) || 0) + 1); }
  console.log(`A borrar: ${filas.length} entradas`);
  for (const [g, n] of [...grupos].sort()) console.log(`  ${g.padEnd(20)} ${n}`);
  console.log(`Imágenes del set nuevo que se conservan: ${quedan}`);
  if (!aplicar) console.log('\nNo se borró nada. Para borrar: npm run db:limpiar-imagenes -- --aplicar');
  else { await db.delete(libExtra).where(borrar); console.log(`\nBorradas ${filas.length} entradas.`); }
  await cerrar();
}
main().catch(e => { console.error(e); process.exit(1); });
