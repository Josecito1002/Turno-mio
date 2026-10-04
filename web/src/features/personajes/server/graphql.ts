import { and, asc, eq, ilike, or, sql } from 'drizzle-orm';
import { GraphQLError } from 'graphql';
import { randomBytes } from 'node:crypto';
import { requiereUsuario, type Contexto, type ModuloGraphQL } from '@/shared/graphql/servidor';
import { personajes, personajesCompartidos } from './tablas';
import { usuarios } from '@/features/cuentas/server/tablas';
import { exigir, puede, rolActual } from '@/features/cuentas/server/permisos';
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
  "Un personaje de otra cuenta: compartido contigo, o visto por un administrador."
  type PersonajeAjeno { usuarioId: ID!, jugador: String!, id: ID!, nombre: String!, resumen: String, actualizadoEn: String! }
  type CuentaBreve { id: ID!, nombre: String! }
  input RefPersonaje { usuarioId: ID!, id: ID! }

  extend type Query {
    "Todos los personajes del usuario, completos, en orden de creación."
    personajes: [Personaje!]!
    personaje(id: ID!): Personaje
    "Personajes que otros jugadores compartieron contigo."
    compartidosConmigo: [PersonajeAjeno!]!
    "Con quién compartiste uno de tus personajes."
    compartidoCon(id: ID!): [CuentaBreve!]!
    "La hoja completa de un personaje de otra cuenta: si te lo compartieron o si eres administrador."
    personajeAjeno(usuarioId: ID!, id: ID!): Personaje
    "Solo administradores: personajes de las cuentas cuyo nombre o correo contiene el texto (todos, si va vacío)."
    personajesDeJugadores(buscar: String): [PersonajeAjeno!]!
  }
  extend type Mutation {
    guardarPersonaje(id: ID!, nombre: String!, resumen: String, datos: JSON!): PersonajeResumen!
    borrarPersonaje(id: ID!): Boolean!
    "Borra varios personajes. Los de otras cuentas solo los puede borrar un administrador. Devuelve cuántos se borraron."
    borrarPersonajes(refs: [RefPersonaje!]!): Int!
    "Comparte uno de tus personajes con otra cuenta, buscada por su correo o por su nombre exacto."
    compartirPersonaje(id: ID!, con: String!): CuentaBreve!
    dejarDeCompartir(id: ID!, conId: ID!): Boolean!
    "Quita de tu lista un personaje que te compartieron (el original no cambia)."
    descartarCompartido(usuarioId: ID!, id: ID!): Boolean!
    "Crea en tu cuenta una copia independiente de un personaje compartido contigo (o de cualquiera, si eres administrador)."
    copiarPersonaje(usuarioId: ID!, id: ID!): Personaje!
  }
`;

const iso = <T extends { actualizadoEn: Date }>(x: T) => ({ ...x, actualizadoEn: x.actualizadoEn.toISOString() });
const error = (mensaje: string, code = 'BAD_USER_INPUT') => new GraphQLError(mensaje, { extensions: { code } });
const nuevoId = () => 'pj-' + Date.now().toString(36) + randomBytes(3).toString('hex');

const columnasAjeno = {
  usuarioId: personajes.usuarioId, jugador: usuarios.nombre, id: personajes.id,
  nombre: personajes.nombre, resumen: personajes.resumen, actualizadoEn: personajes.actualizadoEn,
};

/** Se puede ver (y copiar) un personaje ajeno si su dueño lo compartió contigo, o si eres administrador. */
async function puedeVerAjeno(ctx: Contexto, usuarioId: string, id: string) {
  const u = await rolActual(ctx);
  if (u.id === usuarioId || puede.administrarCuentas(u.rol)) return u;
  const [c] = await ctx.db.select({ id: personajesCompartidos.personajeId }).from(personajesCompartidos)
    .where(and(eq(personajesCompartidos.duenoId, usuarioId), eq(personajesCompartidos.personajeId, id), eq(personajesCompartidos.conId, u.id))).limit(1);
  if (!c) throw error('Ese personaje ya no está compartido contigo.', 'FORBIDDEN');
  return u;
}

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
      compartidosConmigo: async (_: unknown, __: unknown, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        const filas = await ctx.db.select(columnasAjeno).from(personajesCompartidos)
          .innerJoin(personajes, and(eq(personajes.usuarioId, personajesCompartidos.duenoId), eq(personajes.id, personajesCompartidos.personajeId)))
          .innerJoin(usuarios, eq(usuarios.id, personajes.usuarioId))
          .where(eq(personajesCompartidos.conId, u.id)).orderBy(asc(personajesCompartidos.compartidoEn));
        return filas.map(iso);
      },
      compartidoCon: async (_: unknown, { id }: { id: string }, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        return ctx.db.select({ id: usuarios.id, nombre: usuarios.nombre }).from(personajesCompartidos)
          .innerJoin(usuarios, eq(usuarios.id, personajesCompartidos.conId))
          .where(and(eq(personajesCompartidos.duenoId, u.id), eq(personajesCompartidos.personajeId, id))).orderBy(asc(usuarios.nombre));
      },
      personajeAjeno: async (_: unknown, { usuarioId, id }: { usuarioId: string; id: string }, ctx: Contexto) => {
        await puedeVerAjeno(ctx, usuarioId, id);
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
      compartirPersonaje: async (_: unknown, { id, con }: { id: string; con: string }, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        const texto = con.trim().toLowerCase();
        if (!texto) throw error('Escribe el nombre o el correo de la otra persona.');
        const [p] = await ctx.db.select({ id: personajes.id }).from(personajes).where(and(eq(personajes.usuarioId, u.id), eq(personajes.id, id))).limit(1);
        if (!p) throw error('Ese personaje todavía no se guardó en tu cuenta. Espera un momento y vuelve a intentarlo.');
        // Primero por correo (único); si no, por nombre exacto, que puede repetirse
        let cuentas = await ctx.db.select({ id: usuarios.id, nombre: usuarios.nombre }).from(usuarios).where(sql`lower(${usuarios.email}) = ${texto}`).limit(1);
        if (!cuentas.length) cuentas = await ctx.db.select({ id: usuarios.id, nombre: usuarios.nombre }).from(usuarios).where(sql`lower(trim(${usuarios.nombre})) = ${texto}`).limit(2);
        if (!cuentas.length) throw error(`No hay ninguna cuenta con el nombre o correo «${con.trim()}».`);
        if (cuentas.length > 1) throw error(`Hay varias cuentas llamadas «${con.trim()}». Usa su correo.`);
        const [otra] = cuentas;
        if (otra.id === u.id) throw error('Ese personaje ya es tuyo.');
        await ctx.db.insert(personajesCompartidos).values({ duenoId: u.id, personajeId: id, conId: otra.id }).onConflictDoNothing();
        return otra;
      },
      dejarDeCompartir: async (_: unknown, { id, conId }: { id: string; conId: string }, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        await ctx.db.delete(personajesCompartidos).where(and(eq(personajesCompartidos.duenoId, u.id), eq(personajesCompartidos.personajeId, id), eq(personajesCompartidos.conId, conId)));
        return true;
      },
      descartarCompartido: async (_: unknown, { usuarioId, id }: { usuarioId: string; id: string }, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        await ctx.db.delete(personajesCompartidos).where(and(eq(personajesCompartidos.duenoId, usuarioId), eq(personajesCompartidos.personajeId, id), eq(personajesCompartidos.conId, u.id)));
        return true;
      },
      copiarPersonaje: async (_: unknown, { usuarioId, id }: { usuarioId: string; id: string }, ctx: Contexto) => {
        const u = await puedeVerAjeno(ctx, usuarioId, id);
        const [orig] = await ctx.db.select().from(personajes).where(and(eq(personajes.usuarioId, usuarioId), eq(personajes.id, id))).limit(1);
        if (!orig) throw error('Ese personaje ya no existe.', 'NOT_FOUND');
        // Copia independiente: otro id, y sin relación con el original (cambios en uno no tocan el otro)
        const idNuevo = nuevoId();
        const datos = { ...(orig.datos as Record<string, unknown>), id: idNuevo };
        const [p] = await ctx.db.insert(personajes).values({ usuarioId: u.id, id: idNuevo, nombre: orig.nombre, resumen: orig.resumen, datos }).returning();
        return iso(p);
      },
    },
  },
};

