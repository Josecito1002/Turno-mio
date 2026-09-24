/* Aplica las migraciones de ./drizzle a DATABASE_URL (Neon, Supabase o PGlite local). */
import { crearDb } from '../src/shared/db/conectar';

async function main() {
  const { migrar, cerrar } = crearDb();
  await migrar('./drizzle');
  await cerrar();
  console.log('Migraciones aplicadas.');
}
main().catch(e => { console.error(e); process.exit(1); });
