import { createYoga } from 'graphql-yoga';
import { db } from '@/shared/db/cliente';
import { componerEsquema } from '@/shared/graphql/servidor';
import { auth } from '@/features/cuentas/server/auth';
import { cuentasGraphQL } from '@/features/cuentas/server/graphql';
import { bibliotecaGraphQL } from '@/features/biblioteca/server/graphql';
import { personajesGraphQL } from '@/features/personajes/server/graphql';
import { mesaGraphQL } from '@/features/mesa/server/graphql';

const yoga = createYoga({
  schema: componerEsquema([cuentasGraphQL, bibliotecaGraphQL, personajesGraphQL, mesaGraphQL]),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
  graphiql: process.env.NODE_ENV !== 'production',
  context: async () => {
    const s = await auth();
    return { db, usuario: s?.user?.id ? { id: s.user.id, rol: s.user.rol } : null };
  },
});

export async function GET(request: Request) { return yoga.handleRequest(request, {}); }
export async function POST(request: Request) { return yoga.handleRequest(request, {}); }
