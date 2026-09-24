import 'server-only';
import { crearDb, type DB } from './conectar';

/* La conexión se abre en la primera consulta, no al importar el módulo
   (así `next build` no intenta conectarse a la base). */
const g = globalThis as unknown as { __miturnoDb?: ReturnType<typeof crearDb> };
const conexion = () => g.__miturnoDb ?? (g.__miturnoDb = crearDb());

export const db = new Proxy({} as DB, {
  get(_, prop) {
    const real = conexion().db as unknown as Record<string | symbol, unknown>;
    const v = real[prop];
    return typeof v === 'function' ? (v as (...a: unknown[]) => unknown).bind(real) : v;
  },
});
export type { DB };
