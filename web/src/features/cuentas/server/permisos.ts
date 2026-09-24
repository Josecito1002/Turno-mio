import 'server-only';
import { eq } from 'drizzle-orm';
import { GraphQLError } from 'graphql';
import { requiereUsuario, type Contexto } from '@/shared/graphql/servidor';
import { usuarios } from './tablas';

export const ROLES = ['jugador', 'dm', 'admin'] as const;
export type Rol = (typeof ROLES)[number];

/** Qué puede hacer cada rol. El admin puede todo lo del DM. */
export const puede = {
  usarMesa: (rol: string) => rol === 'dm' || rol === 'admin',
  editarBiblioteca: (rol: string) => rol === 'admin',
  administrarCuentas: (rol: string) => rol === 'admin',
};

/** Lee el rol desde la base (no del token), así un cambio de rol aplica al instante. */
export async function rolActual(ctx: Contexto) {
  const u = requiereUsuario(ctx);
  const [fila] = await ctx.db.select({ rol: usuarios.rol }).from(usuarios).where(eq(usuarios.id, u.id)).limit(1);
  if (!fila) throw new GraphQLError('Tu cuenta ya no existe.', { extensions: { code: 'UNAUTHENTICATED' } });
  return { ...u, rol: fila.rol };
}

export async function exigir(ctx: Contexto, permiso: keyof typeof puede, mensaje: string) {
  const u = await rolActual(ctx);
  if (!puede[permiso](u.rol)) throw new GraphQLError(mensaje, { extensions: { code: 'FORBIDDEN' } });
  return u;
}
