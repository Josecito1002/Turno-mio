import { and, asc, eq, ilike, or, sql } from 'drizzle-orm';
import { GraphQLError } from 'graphql';
import { randomBytes } from 'node:crypto';
import { requiereUsuario, type Contexto, type ModuloGraphQL } from '@/shared/graphql/servidor';
import { enlacesPersonaje, personajes } from './tablas';
import { usuarios } from '@/features/cuentas/server/tablas';
import { exigir } from '@/features/cuentas/server/permisos';
import { mesaJugadores } from '@/features/mesa/server/tablas';
import { transmitirMesa } from '@/features/mesa/server/realtime';

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
  "Un personaje de otra cuenta, visto por un administrador."
  type PersonajeAjeno { usuarioId: ID!, jugador: String!, id: ID!, nombre: String!, resumen: String, actualizadoEn: String! }
  type Enlace { token: String! }
  "Lo que ve quien abre el enlace de un personaje."
  type PersonajeEnlazado { nombre: String!, jugador: String!, datos: JSON!, actualizadoEn: String! }
  input RefPersonaje { usuarioId: ID!, id: ID! }

  extend type Query {
    "Todos los personajes del usuario, completos, en orden de creación."
    personajes: [Personaje!]!
    personaje(id: ID!): Personaje
    "El enlace para compartir uno de tus personajes, si lo creaste."
    enlaceDe(id: ID!): Enlace
    "Abre el enlace de un personaje. No hace falta cuenta."
    personajePorEnlace(token: String!): PersonajeEnlazado
    "Solo administradores: la hoja completa de un personaje de otra cuenta."
    personajeAjeno(usuarioId: ID!, id: ID!): Personaje
    "Solo administradores: personajes de las cuentas cuyo nombre o correo contiene el texto (todos, si va vacío)."
    personajesDeJugadores(buscar: String): [PersonajeAjeno!]!
  }
  extend type Mutation {
    guardarPersonaje(id: ID!, nombre: String!, resumen: String, datos: JSON!): PersonajeResumen!
    borrarPersonaje(id: ID!): Boolean!
    "Borra varios personajes. Los de otras cuentas solo los puede borrar un administrador. Devuelve cuántos se borraron."
    borrarPersonajes(refs: [RefPersonaje!]!): Int!
    "Crea (o actualiza) el enlace para compartir uno de tus personajes. nuevo: cambia el enlace y el anterior deja de servir."
    crearEnlace(id: ID!, nuevo: Boolean): Enlace!
    "El enlace deja de servir."
    quitarEnlace(id: ID!): Boolean!
  }
`;

const iso = <T extends { actualizadoEn: Date }>(x: T) => ({ ...x, actualizadoEn: x.actualizadoEn.toISOString() });
const error = (mensaje: string, code = 'BAD_USER_INPUT') => new GraphQLError(mensaje, { extensions: { code } });

const columnasAjeno = {
  usuarioId: personajes.usuarioId, jugador: usuarios.nombre, id: personajes.id,
  nombre: personajes.nombre, resumen: personajes.resumen, actualizadoEn: personajes.actualizadoEn,
};

const token = () => randomBytes(9).toString('base64url');

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
      enlaceDe: async (_: unknown, { id }: { id: string }, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        const [e] = await ctx.db.select({ token: enlacesPersonaje.token }).from(enlacesPersonaje)
          .where(and(eq(enlacesPersonaje.duenoId, u.id), eq(enlacesPersonaje.personajeId, id))).limit(1);
        return e || null;
      },
      personajePorEnlace: async (_: unknown, { token }: { token: string }, ctx: Contexto) => {
        const [p] = await ctx.db.select({ nombre: personajes.nombre, jugador: usuarios.nombre, datos: personajes.datos, actualizadoEn: personajes.actualizadoEn })
          .from(enlacesPersonaje)
          .innerJoin(personajes, and(eq(personajes.usuarioId, enlacesPersonaje.duenoId), eq(personajes.id, enlacesPersonaje.personajeId)))
          .innerJoin(usuarios, eq(usuarios.id, personajes.usuarioId))
          .where(eq(enlacesPersonaje.token, token)).limit(1);
        return p ? iso(p) : null;
      },
      personajeAjeno: async (_: unknown, { usuarioId, id }: { usuarioId: string; id: string }, ctx: Contexto) => {
        await exigir(ctx, 'administrarCuentas', 'Solo el administrador puede ver los personajes de otros jugadores.');
        const [p] = await ctx.db.select().from(personajes).where(and(eq(personajes.usuarioId, usuarioId), eq(personajes.id, id))).limit(1);
        return p ? iso(p) : null;
      },
      personajesDeJugadores: async (_: unknown, { buscar }: { buscar?: string | null }, ctx: Contexto) => {
        await exigir(ctx, 'administrarCuentas', 'Solo el administrador puede ver los personajes de otros jugadores.');
        const q = (buscar || '').trim().replace(/[\\%_]/g, m => '\\' + m);
        const filtro = q ? or(ilike(usuarios.nombre, `%${q}%`), ilike(usuarios.email, `%${q}%`)) : undefined;
        const filas = await ctx.db.select(columnasAjeno).from(personajes)
          .innerJoin(usuarios, eq(usuarios.id, personajes.usuarioId))
          .where(filtro).orderBy(asc(sql`lower(${usuarios.nombre})`), asc(personajes.creadoEn));
        return filas.map(iso);
      },
    },
    Mutation: {
      guardarPersonaje: async (_: unknown, a: { id: string; nombre: string; resumen?: string; datos: unknown }, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        const fila = { usuarioId: u.id, id: a.id, nombre: a.nombre || 'Sin nombre', resumen: a.resumen ?? null, datos: a.datos, actualizadoEn: new Date() };
        const [p] = await ctx.db.insert(personajes).values(fila)
          .onConflictDoUpdate({ target: [personajes.usuarioId, personajes.id], set: { nombre: fila.nombre, resumen: fila.resumen, datos: fila.datos, actualizadoEn: fila.actualizadoEn } })
          .returning({ id: personajes.id, nombre: personajes.nombre, resumen: personajes.resumen, actualizadoEn: personajes.actualizadoEn });

        // Notificar en tiempo real a las mesas del DM donde esté unido este personaje
        try {
          const mesas = await ctx.db.select({ campanaId: mesaJugadores.campanaId })
            .from(mesaJugadores).where(and(eq(mesaJugadores.jugadorId, u.id), eq(mesaJugadores.personajeId, a.id)));
          if (mesas.length > 0) {
            const d = a.datos as { used?: Record<string, unknown>; pgTemp?: unknown } | null;
            for (const m of mesas) {
              transmitirMesa(m.campanaId, {
                tipo: 'cambio_pg',
                campanaId: m.campanaId,
                jugadorId: u.id,
                personajeId: a.id,
                pgUsados: d?.used?.pg != null ? Number(d.used.pg) : undefined,
                pgTemp: d?.pgTemp != null ? Number(d.pgTemp) : undefined,
                muerteExitos: d?.used?.['muerte-exitos'] != null ? Number(d.used['muerte-exitos']) : undefined,
                muerteFallos: d?.used?.['muerte-fallos'] != null ? Number(d.used['muerte-fallos']) : undefined,
                actualizadoEn: p.actualizadoEn.toISOString(),
              });
            }
          }
        } catch (err) {
          console.error('Error al transmitir cambio de personaje a mesas:', err);
        }

        return iso(p);
      },
      borrarPersonaje: async (_: unknown, { id }: { id: string }, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        await ctx.db.delete(personajes).where(and(eq(personajes.usuarioId, u.id), eq(personajes.id, id)));
        return true;
      },
      borrarPersonajes: async (_: unknown, { refs }: { refs: { usuarioId: string; id: string }[] }, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        if (!refs.length) return 0;
        if (refs.some(r => r.usuarioId !== u.id)) await exigir(ctx, 'administrarCuentas', 'Solo el administrador puede borrar personajes de otros jugadores.');
        const borrados = await ctx.db.delete(personajes)
          .where(or(...refs.map(r => and(eq(personajes.usuarioId, r.usuarioId), eq(personajes.id, r.id)))))
          .returning({ id: personajes.id });
        return borrados.length;
      },
      crearEnlace: async (_: unknown, a: { id: string; nuevo?: boolean | null }, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        const [p] = await ctx.db.select({ id: personajes.id }).from(personajes).where(and(eq(personajes.usuarioId, u.id), eq(personajes.id, a.id))).limit(1);
        if (!p) throw error('Ese personaje todavía no se guardó en tu cuenta. Espera un momento y vuelve a intentarlo.');
        const [e] = await ctx.db.insert(enlacesPersonaje).values({ token: token(), duenoId: u.id, personajeId: a.id })
          .onConflictDoUpdate({ target: [enlacesPersonaje.duenoId, enlacesPersonaje.personajeId],
            set: a.nuevo ? { token: token(), creadoEn: new Date() } : { personajeId: a.id } })
          .returning({ token: enlacesPersonaje.token });
        return e;
      },
      quitarEnlace: async (_: unknown, { id }: { id: string }, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        await ctx.db.delete(enlacesPersonaje).where(and(eq(enlacesPersonaje.duenoId, u.id), eq(enlacesPersonaje.personajeId, id)));
        return true;
      },
    },
  },
};

