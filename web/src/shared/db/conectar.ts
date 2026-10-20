import { drizzle as drizzlePg } from 'drizzle-orm/postgres-js';
import { drizzle as drizzleLite } from 'drizzle-orm/pglite';
import { migrate as migratePg } from 'drizzle-orm/postgres-js/migrator';
import { migrate as migrateLite } from 'drizzle-orm/pglite/migrator';
import { PGlite } from '@electric-sql/pglite';
import postgres from 'postgres';
import { mkdirSync } from 'node:fs';
import * as esquema from './esquema';

export type DB = ReturnType<typeof drizzlePg<typeof esquema>>;

/**
 * El pooler de Supabase atiende el mismo usuario y contraseña en dos puertos: 5432 (modo sesión) y 6543 (modo
 * transacción). En modo sesión cada conexión abierta ocupa una de las pocas del plan gratuito (15) mientras exista:
 * con la mesa en vivo (hojas y DM preguntando cada pocos segundos) Vercel abre varias instancias, se acaban y llega
 * «max clients reached». En modo transacción la conexión real solo se presta mientras dura cada consulta, así que
 * aguanta muchas más. La app en el servidor usa siempre el 6543; los scripts (migraciones, despliegue) siguen con la URL tal cual.
 */
export function urlServidor(url: string | undefined) {
  if (!url) return url;
  try {
    const u = new URL(url);
    if (/\.pooler\.supabase\.com$/i.test(u.hostname) && (u.port === '5432' || u.port === '')) { u.port = '6543'; return u.toString(); }
  } catch { /* no es una URL: se deja como está */ }
  return url;
}

/*
 * DATABASE_URL:
 *   postgres://...    -> Neon / Supabase / cualquier Postgres (postgres.js)
 *   pglite:./.data/pg -> Postgres embebido en una carpeta local, para desarrollo sin servidor
 */
/** La opción existe en postgres.js (src/index.js) aunque sus tipos no la declaren. */
const SIN_PIPELINE = { max_pipeline: 0 } as object;

export function crearDb(url = process.env.DATABASE_URL || 'pglite:./.data/pg') {
  if (url.startsWith('pglite:')) {
    const dir = url.slice('pglite:'.length);
    mkdirSync(dir, { recursive: true });
    const cliente = new PGlite(dir);
    const db = drizzleLite(cliente, { schema: esquema });
    return { db: db as unknown as DB, migrar: (carpeta: string) => migrateLite(db, { migrationsFolder: carpeta }), cerrar: () => cliente.close() };
  }
  // prepare:false sirve para Neon y para los poolers. En Vercel cada instancia de función abre sus conexiones: se
  // guardan pocas y se sueltan pronto para no acaparar el pooler. Fuera de Vercel, 5 y 20 s.
  // max_pipeline:0: postgres.js manda varias consultas seguidas por la misma conexión sin esperar la respuesta
  // (pipelining). El pooler de Supabase en modo transacción (6543) a veces no contesta las que van detrás, y la
  // petición se quedaba colgada (la biblioteca pide diez tablas a la vez con 2 conexiones). Así cada conexión lleva
  // una sola consulta a la vez y las demás esperan su turno.
  const enVercel = !!process.env.VERCEL;
  const cliente = postgres(url, { prepare: false, max: enVercel ? 2 : 5, idle_timeout: enVercel ? 5 : 20, connect_timeout: 15, ...SIN_PIPELINE });
  const db = drizzlePg(cliente, { schema: esquema });
  return { db, migrar: (carpeta: string) => migratePg(db, { migrationsFolder: carpeta }), cerrar: (segundos?: number) => cliente.end({ timeout: segundos }) };
}
