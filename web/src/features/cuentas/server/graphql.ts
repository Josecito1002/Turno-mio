import { asc, eq, and, ne, count } from 'drizzle-orm';
import { GraphQLError } from 'graphql';
import { requiereUsuario, type Contexto, type ModuloGraphQL } from '@/shared/graphql/servidor';
import { usuarios } from './tablas';
import { ROLES, exigir, rolActual } from './permisos';
import bcrypt from 'bcryptjs';
import { randomInt } from 'node:crypto';

/** 10 caracteres fáciles de dictar (sin 0/O ni 1/l/I). */
function contrasenaTemporal() {
  const letras = 'abcdefghjkmnpqrstuvwxyz23456789';
  return Array.from({ length: 10 }, () => letras[randomInt(letras.length)]).join('');
}

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
    "Solo administradores: pone una contraseña temporal y la devuelve (una sola vez) para pasársela a esa persona."
    restablecerContrasena(id: ID!): String!
    "Cambia la contraseña propia; pide la actual."
    cambiarContrasena(actual: String!, nueva: String!): Boolean!
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
      restablecerContrasena: async (_: unknown, { id }: { id: string }, ctx: Contexto) => {
        await exigir(ctx, 'administrarCuentas', 'Solo el administrador restablece contraseñas.');
        const temporal = contrasenaTemporal();
        const [c] = await ctx.db.update(usuarios).set({ hash: await bcrypt.hash(temporal, 10) }).where(eq(usuarios.id, id)).returning({ id: usuarios.id });
        if (!c) throw new GraphQLError('Esa cuenta no existe.', { extensions: { code: 'NOT_FOUND' } });
        return temporal;
      },
      cambiarContrasena: async (_: unknown, { actual, nueva }: { actual: string; nueva: string }, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        if (nueva.length < 8) throw new GraphQLError('La contraseña nueva necesita al menos 8 caracteres.', { extensions: { code: 'BAD_USER_INPUT' } });
        const [fila] = await ctx.db.select({ hash: usuarios.hash }).from(usuarios).where(eq(usuarios.id, u.id)).limit(1);
        if (!fila || !(await bcrypt.compare(actual, fila.hash))) throw new GraphQLError('La contraseña actual no es correcta.', { extensions: { code: 'BAD_USER_INPUT' } });
        await ctx.db.update(usuarios).set({ hash: await bcrypt.hash(nueva, 10) }).where(eq(usuarios.id, u.id));
        return true;
      },
    },
  },
};
