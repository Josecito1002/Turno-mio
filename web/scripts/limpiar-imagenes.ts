/* Borra de la biblioteca las imágenes antiguas de clase y subclase (ver imagenes-antiguas.ts). También lo hace
   scripts/despliegue.ts al publicar en producción.
   Uso: npm run db:limpiar-imagenes            → solo lista lo que borraría
        npm run db:limpiar-imagenes -- --aplicar → borra */
import { crearDb } from '../src/shared/db/conectar';
import { limpiarImagenesAntiguas } from './imagenes-antiguas';

async function main() {
  const aplicar = process.argv.includes('--aplicar');
  const { db, cerrar } = crearDb();
  const filas = await limpiarImagenesAntiguas(db, aplicar);
  console.log(`${aplicar ? 'Borradas' : 'A borrar'}: ${filas.length} entradas`);
  for (const f of filas) console.log(`  ${f.tipo.padEnd(8)} ${f.clave}`);
  if (!aplicar) console.log('\nNo se borró nada. Para borrar: npm run db:limpiar-imagenes -- --aplicar');
  await cerrar();
}
main().catch(e => { console.error(e); process.exit(1); });
