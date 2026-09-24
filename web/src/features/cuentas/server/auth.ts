import NextAuth, { type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '@/shared/db/cliente';
import { usuarios } from './tablas';

declare module 'next-auth' {
  interface Session { user: { id: string; rol: string } & DefaultSession['user'] }
  interface User { rol?: string }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  trustHost: true,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async c => {
        const email = String(c?.email || '').trim().toLowerCase(), password = String(c?.password || '');
        if (!email || !password) return null;
        const [u] = await db.select().from(usuarios).where(eq(usuarios.email, email)).limit(1);
        if (!u || !(await bcrypt.compare(password, u.hash))) return null;
        return { id: u.id, email: u.email, name: u.nombre, rol: u.rol };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) { token.id = user.id; token.rol = user.rol; }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.rol = (token.rol as string) || 'jugador';
      return session;
    },
  },
});
