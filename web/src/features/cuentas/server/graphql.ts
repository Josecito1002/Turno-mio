import { asc, eq, and, ne, count } from 'drizzle-orm';
import { GraphQLError } from 'graphql';
import { requiereUsuario, type Contexto, type ModuloGraphQL } from '@/shared/graphql/servidor';
import { usuarios } from './tablas';
import { ROLES, exigir, rolActual } from './permisos';

const typeDefs = /* GraphQL */ `
  type Usuario {
    id: ID!
    email: String!
    nombre: String!
    "jugador | dm | admin"
    rol: String!
    ultimoPj: String
  }
  type Cuenta { id: ID!, email: String!, nombre: String!, rol: String!, creadoEn: String! }
  extend type Query {
    yo: Usuario
    "Solo administradores."
    cuentas: [Cuenta!]!
  }
  extend type Mutation {
    "Recuerda el último personaje abierto para volver a él al entrar."
    marcarUltimo(id: ID): Boolean!
    "Solo administradores: jugador, dm o admin."
    cambiarRol(id: ID!, rol: String!): Cuenta!
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
      cuentas: async (_: unknown, __: unknown, ctx: Contexto) => {
        await exigir(ctx, 'administrarCuentas', 'Solo el administrador ve las cuentas.');
        const filas = await ctx.db.select({ id: usuarios.id, email: usuarios.email, nombre: usuarios.nombre, rol: usuarios.rol, creadoEn: usuarios.creadoEn }).from(usuarios).orderBy(asc(usuarios.creadoEn));
        return filas.map(f => ({ ...f, creadoEn: f.creadoEn.toISOString() }));
      },
    },
    Mutation: {
      marcarUltimo: async (_: unknown, { id }: { id?: string | null }, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        await ctx.db.update(usuarios).set({ ultimoPj: id ?? null }).where(eq(usuarios.id, u.id));
        return true;
      },
      cambiarRol: async (_: unknown, { id, rol }: { id: string; rol: string }, ctx: Contexto) => {
        const yo = await exigir(ctx, 'administrarCuentas', 'Solo el administrador cambia roles.');
        if (!(ROLES as readonly string[]).includes(rol)) throw new GraphQLError('Rol desconocido.', { extensions: { code: 'BAD_USER_INPUT' } });
        await rolActual(ctx);
        if (rol !== 'admin') {
          // Que nunca se quede la app sin administrador.
          const [{ n }] = await ctx.db.select({ n: count() }).from(usuarios).where(and(eq(usuarios.rol, 'admin'), ne(usuarios.id, id)));
          if (n === 0) throw new GraphQLError(id === yo.id ? 'Eres el único administrador: nombra a otro antes de dejar el rol.' : 'Tiene que quedar al menos un administrador.', { extensions: { code: 'BAD_USER_INPUT' } });
        }
        const [c] = await ctx.db.update(usuarios).set({ rol }).where(eq(usuarios.id, id))
          .returning({ id: usuarios.id, email: usuarios.email, nombre: usuarios.nombre, rol: usuarios.rol, creadoEn: usuarios.creadoEn });
        if (!c) throw new GraphQLError('Esa cuenta no existe.', { extensions: { code: 'NOT_FOUND' } });
        return { ...c, creadoEn: c.creadoEn.toISOString() };
      },
    },
  },
};
