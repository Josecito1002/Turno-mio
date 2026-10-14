import { drizzle as drizzlePg } from 'drizzle-orm/postgres-js';
import { drizzle as drizzleLite } from 'drizzle-orm/pglite';
import { migrate as migratePg } from 'drizzle-orm/postgres-js/migrator';
import { migrate as migrateLite } from 'drizzle-orm/pglite/migrator';
import { PGlite } from '@electric-sql/pglite';
import postgres from 'postgres';
import { mkdirSync } from 'node:fs';
import * as esquema from './esquema';

export type DB = ReturnType<typeof drizzlePg<typeof esquema>>;

/*
 * DATABASE_URL:
 *   postgres://...    -> Neon / Supabase / cualquier Postgres (postgres.js)
 *   pglite:./.data/pg -> Postgres embebido en una carpeta local, para desarrollo sin servidor
 */
export function crearDb(url = process.env.DATABASE_URL || 'pglite:./.data/pg') {
  if (url.startsWith('pglite:')) {
    const dir = url.slice('pglite:'.length);
    mkdirSync(dir, { recursive: true });
    const cliente = new PGlite(dir);
    const db = drizzleLite(cliente, { schema: esquema });
    return { db: db as unknown as DB, migrar: (carpeta: string) => migrateLite(db, { migrationsFolder: carpeta }), cerrar: () => cliente.close() };
  }
  // Con Supabase usar el pooler en modo sesión (5432). prepare:false sirve también para Neon y poolers.
  // El modo sesión del plan gratuito admite pocas conexiones (15): en Vercel cada función abre las suyas,
  // así que ahí se usa una sola por función y se suelta a los 5 s sin uso (cada imagen de la biblioteca abre una
  // función aparte: si la guardan 20 s, al entrar con muchas imágenes se acaban las 15). Fuera de Vercel, 5 y 20 s.
  const enVercel = !!process.env.VERCEL;
  const cliente = postgres(url, { prepare: false, max: enVercel ? 1 : 5, idle_timeout: enVercel ? 5 : 20, connect_timeout: 15 });
  const db = drizzlePg(cliente, { schema: esquema });
  return { db, migrar: (carpeta: string) => migratePg(db, { migrationsFolder: carpeta }), cerrar: () => cliente.end() };
}
