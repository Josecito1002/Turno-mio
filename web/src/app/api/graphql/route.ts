import { createYoga, maskError } from 'graphql-yoga';
import { GraphQLError } from 'graphql';
import { db } from '@/shared/db/cliente';
import { componerEsquema } from '@/shared/graphql/servidor';
import { auth } from '@/features/cuentas/server/auth';
import { cuentasGraphQL } from '@/features/cuentas/server/graphql';
import { bibliotecaGraphQL } from '@/features/biblioteca/server/graphql';
import { personajesGraphQL } from '@/features/personajes/server/graphql';
import { mesaGraphQL } from '@/features/mesa/server/graphql';

/** Junta los mensajes del error y de sus causas (drizzle envuelve el error de postgres en "Failed query: ..."). */
function mensajes(e: unknown): string {
  const out: string[] = [];
  for (let x = e, i = 0; x && i < 6; i++) {
    const err = x as { message?: string; originalError?: unknown; cause?: unknown };
    if (err.message) out.push(err.message);
    x = err.originalError ?? err.cause;
  }
  return out.join(' | ');
}

/* Los errores que no son de la app salen como "Unexpected error." y no dicen nada. Los de la base y la sesión, que
   son los que pasan en producción, se explican en español; los demás quedan ocultos igual que antes. */
const explicar: typeof maskError = (error, message, isDev) => {
  const todo = mensajes(error);
  const conCodigo = (texto: string, code: string) => new GraphQLError(texto, { extensions: { code } });
  if (/max ?clients|EMAXCONN|too many (clients|connections)|remaining connection slots|CONNECT_TIMEOUT|ECONNRESET|ECONNREFUSED|ETIMEDOUT|Connection terminated|write CONNECTION_/i.test(todo)) {
    console.error('[graphql] base ocupada:', todo);
    return conCodigo('La base de datos está ocupada en este momento. Vuelve a intentarlo en unos segundos.', 'BASE_OCUPADA');
  }
  if (/MissingSecret/i.test(todo)) {
    console.error('[graphql] falta AUTH_SECRET:', todo);
    return conCodigo('Al servidor le falta la variable AUTH_SECRET (configúrala en Vercel y vuelve a publicar).', 'CONFIGURACION');
  }
  const r = maskError(error, message, isDev);
  if (r !== error) console.error('[graphql] error inesperado:', todo);
  return r;
};

const yoga = createYoga({
  schema: componerEsquema([cuentasGraphQL, bibliotecaGraphQL, personajesGraphQL, mesaGraphQL]),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
  graphiql: process.env.NODE_ENV !== 'production',
  maskedErrors: { maskError: explicar },
  context: async () => {
    const s = await auth();
    return { db, usuario: s?.user?.id ? { id: s.user.id, rol: s.user.rol } : null };
  },
});

export async function GET(request: Request) { return yoga.handleRequest(request, {}); }
export async function POST(request: Request) { return yoga.handleRequest(request, {}); }
