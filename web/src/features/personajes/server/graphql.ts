import { and, eq } from 'drizzle-orm';
import { requiereUsuario, type Contexto, type ModuloGraphQL } from '@/shared/graphql/servidor';
import { personajes } from './tablas';

const typeDefs = /* GraphQL */ `
  type Personaje {
    id: ID!
    nombre: String!
    resumen: String
    "El personaje completo, tal como lo usa la web (v2)."
    datos: JSON!
    actualizadoEn: String!
  }
  type PersonajeResumen { id: ID!, nombre: String!, resumen: String, actualizadoEn: String! }

  extend type Query {
    "Todos los personajes del usuario, completos, en orden de creación."
    personajes: [Personaje!]!
    personaje(id: ID!): Personaje
  }
  extend type Mutation {
    guardarPersonaje(id: ID!, nombre: String!, resumen: String, datos: JSON!): PersonajeResumen!
    borrarPersonaje(id: ID!): Boolean!
  }
`;

const iso = <T extends { actualizadoEn: Date }>(x: T) => ({ ...x, actualizadoEn: x.actualizadoEn.toISOString() });

export const personajesGraphQL: ModuloGraphQL = {
  typeDefs,
  resolvers: {
    Query: {
      personajes: async (_: unknown, __: unknown, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        const filas = await ctx.db.select().from(personajes).where(eq(personajes.usuarioId, u.id)).orderBy(personajes.creadoEn);
        return filas.map(iso);
      },
      personaje: async (_: unknown, { id }: { id: string }, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        const [p] = await ctx.db.select().from(personajes).where(and(eq(personajes.usuarioId, u.id), eq(personajes.id, id))).limit(1);
        return p ? iso(p) : null;
      },
    },
    Mutation: {
      guardarPersonaje: async (_: unknown, a: { id: string; nombre: string; resumen?: string; datos: unknown }, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        const fila = { usuarioId: u.id, id: a.id, nombre: a.nombre || 'Sin nombre', resumen: a.resumen ?? null, datos: a.datos, actualizadoEn: new Date() };
        const [p] = await ctx.db.insert(personajes).values(fila)
          .onConflictDoUpdate({ target: [personajes.usuarioId, personajes.id], set: { nombre: fila.nombre, resumen: fila.resumen, datos: fila.datos, actualizadoEn: fila.actualizadoEn } })
          .returning({ id: personajes.id, nombre: personajes.nombre, resumen: personajes.resumen, actualizadoEn: personajes.actualizadoEn });
        return iso(p);
      },
      borrarPersonaje: async (_: unknown, { id }: { id: string }, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        await ctx.db.delete(personajes).where(and(eq(personajes.usuarioId, u.id), eq(personajes.id, id)));
        return true;
      },
    },
  },
};

