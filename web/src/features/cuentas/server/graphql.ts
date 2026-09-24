import { eq } from 'drizzle-orm';
import { requiereUsuario, type Contexto, type ModuloGraphQL } from '@/shared/graphql/servidor';
import { usuarios } from './tablas';

const typeDefs = /* GraphQL */ `
  type Usuario {
    id: ID!
    email: String!
    nombre: String!
    "admin | jugador"
    rol: String!
    ultimoPj: String
  }
  extend type Query {
    yo: Usuario
  }
  extend type Mutation {
    "Recuerda el último personaje abierto para volver a él al entrar."
    marcarUltimo(id: ID): Boolean!
  }
`;

export const cuentasGraphQL: ModuloGraphQL = {
  typeDefs,
  resolvers: {
    Query: {
      yo: async (_: unknown, __: unknown, ctx: Contexto) => {
        if (!ctx.usuario) return null;
        const [u] = await ctx.db.select({ id: usuarios.id, email: usuarios.email, nombre: usuarios.nombre, rol: usuarios.rol, ultimoPj: usuarios.ultimoPj })
          .from(usuarios).where(eq(usuarios.id, ctx.usuario.id)).limit(1);
        return u || null;
      },
    },
    Mutation: {
      marcarUltimo: async (_: unknown, { id }: { id?: string | null }, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        await ctx.db.update(usuarios).set({ ultimoPj: id ?? null }).where(eq(usuarios.id, u.id));
        return true;
      },
    },
  },
};
