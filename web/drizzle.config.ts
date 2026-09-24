import { defineConfig } from 'drizzle-kit';

// Solo genera el SQL de las migraciones (npm run db:generar); se aplican con npm run db:migrar,
// que funciona igual contra Neon/Supabase o contra PGlite local.
export default defineConfig({
  schema: './src/shared/db/esquema.ts',
  out: './drizzle',
  dialect: 'postgresql',
});
