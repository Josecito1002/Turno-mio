import 'server-only';
import { GraphQLError, GraphQLScalarType, valueFromASTUntyped } from 'graphql';
import { createSchema } from 'graphql-yoga';
import type { DB } from '@/shared/db/cliente';

export type Contexto = { db: DB; usuario: { id: string; rol: string } | null };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Resolvers = Record<string, Record<string, any>>;
export type ModuloGraphQL = { typeDefs: string; resolvers: Resolvers };

export function requiereUsuario(ctx: Contexto) {
  if (!ctx.usuario) throw new GraphQLError('Inicia sesión para continuar.', { extensions: { code: 'UNAUTHENTICATED' } });
  return ctx.usuario;
}

const JSONScalar = new GraphQLScalarType({
  name: 'JSON',
  description: 'Cualquier valor JSON',
  serialize: v => v,
  parseValue: v => v,
  parseLiteral: ast => valueFromASTUntyped(ast),
});

const base = /* GraphQL */ `
  scalar JSON
  type Query { _ok: Boolean }
  type Mutation { _ok: Boolean }
`;

export function componerEsquema(modulos: ModuloGraphQL[]) {
  const resolvers: Resolvers = { JSON: JSONScalar as never, Query: {}, Mutation: {} };
  for (const m of modulos) for (const [tipo, campos] of Object.entries(m.resolvers)) resolvers[tipo] = { ...(resolvers[tipo] || {}), ...campos };
  return createSchema<Contexto>({ typeDefs: [base, ...modulos.map(m => m.typeDefs)], resolvers });
}
