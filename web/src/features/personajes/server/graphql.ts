import { and, eq } from 'drizzle-orm';
import { requiereUsuario, type Contexto, type ModuloGraphQL } from '@/shared/graphql/servidor';
import { personajes } from './tablas';
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
    },
  },
};

