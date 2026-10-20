import 'server-only';
import { crearDb, urlServidor, type DB } from './conectar';

/* La conexión se abre en la primera consulta, no al importar el módulo
   (así `next build` no intenta conectarse a la base). */
const g = globalThis as unknown as { __miturnoDb?: ReturnType<typeof crearDb> };
const conexion = () => g.__miturnoDb ?? (g.__miturnoDb = crearDb(urlServidor(process.env.DATABASE_URL)));

export const db = new Proxy({} as DB, {
  get(_, prop) {
    const real = conexion().db as unknown as Record<string | symbol, unknown>;
    const v = real[prop];
    return typeof v === 'function' ? (v as (...a: unknown[]) => unknown).bind(real) : v;
  },
});
/** Suelta las conexiones de esta instancia: la próxima consulta abre otras. Para cuando una se quedó colgada
    (por ejemplo un socket muerto después de que Vercel congeló la instancia) y todo lo que la usa espera para siempre. */
export function reiniciarConexion() {
  const vieja = g.__miturnoDb;
  g.__miturnoDb = undefined;
  vieja?.cerrar(0).catch(() => {});
}

export type { DB };
