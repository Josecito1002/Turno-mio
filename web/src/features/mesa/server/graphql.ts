import { randomInt } from 'node:crypto';
import { and, count, eq } from 'drizzle-orm';
import { GraphQLError } from 'graphql';
import { requiereUsuario, type Contexto, type ModuloGraphQL } from '@/shared/graphql/servidor';
import { exigir } from '@/features/cuentas/server/permisos';
import { usuarios } from '@/features/cuentas/server/tablas';
import { personajes } from '@/features/personajes/server/tablas';
import { campanas, mesaJugadores } from './tablas';

const SOLO_DM = 'La Mesa del DM es solo para cuentas de DM.';

/* Sin letras ni números que se confunden al dictarlos (O/0, I/1/L) */
const ALFABETO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789', LARGO = 6;
const nuevoCodigo = () => Array.from({ length: LARGO }, () => ALFABETO[randomInt(ALFABETO.length)]).join('');
/** Lo que escribe el jugador, en la forma en que se guarda: sin espacios ni guiones, en mayúsculas. */
export const normalizarCodigo = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]/g, '');
const esClaveRepetida = (e: unknown) => (e as { code?: string; cause?: { code?: string } })?.code === '23505'
  || (e as { cause?: { code?: string } })?.cause?.code === '23505';

const typeDefs = /* GraphQL */ `
  type Campana {
    id: ID!
    nombre: String!
    "La campaña completa: {id, nombre, pjs, monstruos, estado, combate}."
    datos: JSON!
    "Código para que los jugadores se unan (null si todavía no se pidió)."
    codigo: String
    "Cuántos personajes de jugadores se unieron con el código (solo en la lista de campañas)."
    unidos: Int
    actualizadoEn: String!
  }
  "Un personaje de un jugador unido a la mesa, tal como está ahora en su hoja."
  type PersonajeEnMesa {
    jugadorId: ID!
    jugador: String!
    personajeId: ID!
    nombre: String!
    resumen: String
    datos: JSON!
    actualizadoEn: String!
  }
  "Una mesa a la que el jugador unió uno de sus personajes."
  type MesaUnida {
    dmId: ID!
    campanaId: ID!
    mesa: String!
    dm: String!
    personajeId: ID!
    personaje: String!
  }
  extend type Query {
    campanas: [Campana!]!
    "DM: los personajes de jugadores unidos a una de sus mesas."
    jugadoresMesa(campanaId: ID!): [PersonajeEnMesa!]!
    "Jugador: las mesas a las que unió sus personajes."
    misMesas: [MesaUnida!]!
  }
  extend type Mutation {
    guardarCampana(id: ID!, nombre: String!, datos: JSON!): Campana!
    borrarCampana(id: ID!): Boolean!
    "DM: el código de la mesa; lo crea si no tiene, o lo cambia con nuevo: true (el anterior deja de servir)."
    codigoMesa(campanaId: ID!, nuevo: Boolean): String!
    "DM: saca de su mesa el personaje de un jugador."
    quitarDeMesa(campanaId: ID!, jugadorId: ID!, personajeId: ID!): Boolean!
    "Jugador: une uno de sus personajes a la mesa del código."
    unirseMesa(codigo: String!, personajeId: ID!): MesaUnida!
    "Jugador: saca su personaje de una mesa."
    salirMesa(dmId: ID!, campanaId: ID!, personajeId: ID!): Boolean!
  }
`;

const iso = <T extends { actualizadoEn: Date }>(x: T) => ({ ...x, actualizadoEn: x.actualizadoEn.toISOString() });

export const mesaGraphQL: ModuloGraphQL = {
  typeDefs,
  resolvers: {
    Query: {
      campanas: async (_: unknown, __: unknown, ctx: Contexto) => {
        const u = await exigir(ctx, 'usarMesa', SOLO_DM);
        const [lista, cuentas] = await Promise.all([
          ctx.db.select().from(campanas).where(eq(campanas.usuarioId, u.id)).orderBy(campanas.creadoEn),
          ctx.db.select({ campanaId: mesaJugadores.campanaId, n: count() }).from(mesaJugadores).where(eq(mesaJugadores.dmId, u.id)).groupBy(mesaJugadores.campanaId),
        ]);
        const unidos = new Map(cuentas.map(x => [x.campanaId, Number(x.n)]));
        return lista.map(c => ({ ...iso(c), unidos: unidos.get(c.id) || 0 }));
      },
      jugadoresMesa: async (_: unknown, { campanaId }: { campanaId: string }, ctx: Contexto) => {
        const u = await exigir(ctx, 'usarMesa', SOLO_DM);
        // Solo de mesas propias: el filtro por dm_id es lo que impide ver hojas ajenas
        const filas = await ctx.db.select({
          jugadorId: mesaJugadores.jugadorId, jugador: usuarios.nombre, personajeId: personajes.id,
          nombre: personajes.nombre, resumen: personajes.resumen, datos: personajes.datos, actualizadoEn: personajes.actualizadoEn,
        }).from(mesaJugadores)
          .innerJoin(personajes, and(eq(personajes.usuarioId, mesaJugadores.jugadorId), eq(personajes.id, mesaJugadores.personajeId)))
          .innerJoin(usuarios, eq(usuarios.id, mesaJugadores.jugadorId))
          .where(and(eq(mesaJugadores.dmId, u.id), eq(mesaJugadores.campanaId, campanaId)))
          .orderBy(mesaJugadores.unidoEn);
        return filas.map(iso);
      },
      misMesas: async (_: unknown, __: unknown, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        return ctx.db.select({
          dmId: mesaJugadores.dmId, campanaId: mesaJugadores.campanaId, mesa: campanas.nombre, dm: usuarios.nombre,
          personajeId: mesaJugadores.personajeId, personaje: personajes.nombre,
        }).from(mesaJugadores)
          .innerJoin(campanas, and(eq(campanas.usuarioId, mesaJugadores.dmId), eq(campanas.id, mesaJugadores.campanaId)))
          .innerJoin(usuarios, eq(usuarios.id, mesaJugadores.dmId))
          .innerJoin(personajes, and(eq(personajes.usuarioId, mesaJugadores.jugadorId), eq(personajes.id, mesaJugadores.personajeId)))
          .where(eq(mesaJugadores.jugadorId, u.id))
          .orderBy(mesaJugadores.unidoEn);
      },
    },
    Mutation: {
      guardarCampana: async (_: unknown, a: { id: string; nombre: string; datos: unknown }, ctx: Contexto) => {
        const u = await exigir(ctx, 'usarMesa', SOLO_DM);
        const fila = { usuarioId: u.id, id: a.id, nombre: a.nombre, datos: a.datos, actualizadoEn: new Date() };
        const [c] = await ctx.db.insert(campanas).values(fila)
          .onConflictDoUpdate({ target: [campanas.usuarioId, campanas.id], set: { nombre: fila.nombre, datos: fila.datos, actualizadoEn: fila.actualizadoEn } })
          .returning();
        return iso(c);
      },
      borrarCampana: async (_: unknown, { id }: { id: string }, ctx: Contexto) => {
        const u = await exigir(ctx, 'usarMesa', SOLO_DM);
        await ctx.db.delete(campanas).where(and(eq(campanas.usuarioId, u.id), eq(campanas.id, id)));
        return true;
      },
      codigoMesa: async (_: unknown, { campanaId, nuevo }: { campanaId: string; nuevo?: boolean }, ctx: Contexto) => {
        const u = await exigir(ctx, 'usarMesa', SOLO_DM);
        const donde = and(eq(campanas.usuarioId, u.id), eq(campanas.id, campanaId));
        const [c] = await ctx.db.select({ codigo: campanas.codigo }).from(campanas).where(donde).limit(1);
        if (!c) throw new GraphQLError('Esa campaña no existe (o todavía no se guardó). Intenta de nuevo en un momento.');
        if (c.codigo && !nuevo) return c.codigo;
        // Con 31^6 combinaciones un choque es rarísimo, pero si pasa se prueba otro
        for (let i = 0; i < 5; i++) {
          const codigo = nuevoCodigo();
          try {
            await ctx.db.update(campanas).set({ codigo }).where(donde);
            return codigo;
          } catch (e) { if (!esClaveRepetida(e)) throw e; }
        }
        throw new GraphQLError('No se pudo crear un código. Intenta de nuevo.');
      },
      quitarDeMesa: async (_: unknown, a: { campanaId: string; jugadorId: string; personajeId: string }, ctx: Contexto) => {
        const u = await exigir(ctx, 'usarMesa', SOLO_DM);
        await ctx.db.delete(mesaJugadores).where(and(eq(mesaJugadores.dmId, u.id), eq(mesaJugadores.campanaId, a.campanaId),
          eq(mesaJugadores.jugadorId, a.jugadorId), eq(mesaJugadores.personajeId, a.personajeId)));
        return true;
      },
      unirseMesa: async (_: unknown, a: { codigo: string; personajeId: string }, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        const codigo = normalizarCodigo(a.codigo);
        if (codigo.length !== LARGO) throw new GraphQLError(`El código tiene ${LARGO} letras y números.`);
        const [mesa] = await ctx.db.select({ dmId: campanas.usuarioId, campanaId: campanas.id, mesa: campanas.nombre, dm: usuarios.nombre })
          .from(campanas).innerJoin(usuarios, eq(usuarios.id, campanas.usuarioId)).where(eq(campanas.codigo, codigo)).limit(1);
        if (!mesa) throw new GraphQLError('No hay ninguna mesa con ese código. Revisa que esté bien escrito o pídele uno nuevo a tu DM.');
        const [pj] = await ctx.db.select({ nombre: personajes.nombre }).from(personajes)
          .where(and(eq(personajes.usuarioId, u.id), eq(personajes.id, a.personajeId))).limit(1);
        if (!pj) throw new GraphQLError('Ese personaje no es tuyo o todavía no se guardó.');
        await ctx.db.insert(mesaJugadores).values({ dmId: mesa.dmId, campanaId: mesa.campanaId, jugadorId: u.id, personajeId: a.personajeId })
          .onConflictDoNothing();
        return { ...mesa, personajeId: a.personajeId, personaje: pj.nombre };
      },
      salirMesa: async (_: unknown, a: { dmId: string; campanaId: string; personajeId: string }, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        await ctx.db.delete(mesaJugadores).where(and(eq(mesaJugadores.dmId, a.dmId), eq(mesaJugadores.campanaId, a.campanaId),
          eq(mesaJugadores.jugadorId, u.id), eq(mesaJugadores.personajeId, a.personajeId)));
        return true;
      },
    },
  },
};
