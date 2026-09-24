import { and, eq } from 'drizzle-orm';
import { requiereUsuario, type Contexto, type ModuloGraphQL } from '@/shared/graphql/servidor';
import { campanas } from './tablas';

const typeDefs = /* GraphQL */ `
  type Campana {
    id: ID!
    nombre: String!
    "La campaña completa: {id, nombre, pjs, monstruos, estado, combate}."
    datos: JSON!
    actualizadoEn: String!
  }
  extend type Query {
    campanas: [Campana!]!
  }
  extend type Mutation {
    guardarCampana(id: ID!, nombre: String!, datos: JSON!): Campana!
    borrarCampana(id: ID!): Boolean!
  }
`;

const iso = <T extends { actualizadoEn: Date }>(x: T) => ({ ...x, actualizadoEn: x.actualizadoEn.toISOString() });

export const mesaGraphQL: ModuloGraphQL = {
  typeDefs,
  resolvers: {
    Query: {
      campanas: async (_: unknown, __: unknown, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        return (await ctx.db.select().from(campanas).where(eq(campanas.usuarioId, u.id)).orderBy(campanas.creadoEn)).map(iso);
      },
    },
    Mutation: {
      guardarCampana: async (_: unknown, a: { id: string; nombre: string; datos: unknown }, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        const fila = { usuarioId: u.id, id: a.id, nombre: a.nombre, datos: a.datos, actualizadoEn: new Date() };
        const [c] = await ctx.db.insert(campanas).values(fila)
          .onConflictDoUpdate({ target: [campanas.usuarioId, campanas.id], set: { nombre: fila.nombre, datos: fila.datos, actualizadoEn: fila.actualizadoEn } })
          .returning();
        return iso(c);
      },
      borrarCampana: async (_: unknown, { id }: { id: string }, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        await ctx.db.delete(campanas).where(and(eq(campanas.usuarioId, u.id), eq(campanas.id, id)));
        return true;
      },
    },
  },
};
