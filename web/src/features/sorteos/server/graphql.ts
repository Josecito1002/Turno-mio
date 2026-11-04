import 'server-only';
import { randomBytes, randomInt, randomUUID, timingSafeEqual } from 'node:crypto';
import { eq, lt, sql } from 'drizzle-orm';
import { GraphQLError } from 'graphql';
import type { Contexto, ModuloGraphQL } from '@/shared/graphql/servidor';
import { salasSorteo } from './tablas';
import {
  ErrorSorteo, MAX_TIRADAS, OLVIDAR_MS, girarRuleta, limpiarNombre, limpiarOpciones, normalizarCodigo, nuevoCodigo, presentes,
  puedeTirar, tirarDados, tirarMoneda, type Azar, type ConfigSala, type Sala, type TipoTirada, type Tirada,
} from '../domain/sorteo';

/* Salas de sorteo. No piden cuenta: se entra con el enlace. En Vercel no hay tiempo real entre instancias, así que cada
   página manda un latido cada pocos segundos (latidoSorteo), que a la vez marca a la persona como conectada y le
   devuelve la sala con las últimas tiradas. El azar sale siempre del servidor, para que nadie pueda arreglar un sorteo. */

const azar: Azar = n => randomInt(n) + 1;
const SIN_SALA = 'Esa sala no existe o ya se cerró.';
const err = (m: string, code = 'SORTEO') => new GraphQLError(m, { extensions: { code } });
const mismoSecreto = (a: string, b: string) => {
  const x = Buffer.from(a || ''), y = Buffer.from(b || '');
  return x.length === y.length && timingSafeEqual(x, y);
};
const idVisitante = (s: unknown) => {
  const id = String(s || '').slice(0, 64);
  if (!/^[\w-]{8,64}$/.test(id)) throw err('Falta el identificador de esta pestaña.');
  return id;
};

const typeDefs = /* GraphQL */ `
  "Una sala de sorteo, tal como la ve quien está dentro."
  type SalaSorteo {
    codigo: String!
    nombre: String!
    "{todosTiran, opciones, hostId}"
    config: JSON!
    "Las últimas tiradas, la más nueva primero."
    tiradas: JSON!
    "[{id, nombre, host, conectado}]"
    presentes: JSON!
  }
  type SalaCreada { codigo: String!, secreto: String! }
  extend type Mutation {
    "Crea una sala. El secreto se guarda en el navegador de quien la crea: con él la administra."
    crearSalaSorteo(nombre: String, visitante: String!, quien: String!): SalaCreada!
    "Marca a esta pestaña como conectada y devuelve la sala."
    latidoSorteo(codigo: String!, visitante: String!, quien: String!): SalaSorteo!
    "Tira dados (expr), una moneda o la ruleta (cuantos ganadores) y devuelve la sala con el resultado."
    tirarSorteo(codigo: String!, visitante: String!, quien: String!, secreto: String, tipo: String!, expr: String, cuantos: Int): SalaSorteo!
    "Anfitrión: el nombre de la sala, las opciones de la ruleta y si los demás pueden tirar."
    configurarSorteo(codigo: String!, secreto: String!, nombre: String, todosTiran: Boolean, opciones: [String!]): SalaSorteo!
  }
`;

type Fila = typeof salasSorteo.$inferSelect;
const comoSala = (f: Fila, ahora = Date.now()): Sala => {
  const config = f.config as ConfigSala;
  return {
    codigo: f.codigo, nombre: f.nombre, config,
    tiradas: f.tiradas as Tirada[],
    presentes: presentes(f.presencia as Record<string, { n: string; v: number }>, config.hostId, ahora),
  };
};

/** Anota el latido y, de paso, quita a quien lleva mucho sin aparecer. Todo en una sola sentencia (sin carreras). */
async function latir(ctx: Contexto, codigo: string, visitante: string, quien: string) {
  const ahora = Date.now();
  const vigentes = sql`coalesce((select jsonb_object_agg(k, v) from jsonb_each(${salasSorteo.presencia}) e(k, v)
    where (v->>'v')::bigint > ${ahora - OLVIDAR_MS}), '{}'::jsonb)`;
  const [f] = await ctx.db.update(salasSorteo)
    .set({ presencia: sql`${vigentes} || jsonb_build_object(${visitante}::text, jsonb_build_object('n', ${quien}::text, 'v', ${ahora}::bigint))` })
    .where(eq(salasSorteo.codigo, codigo)).returning();
  if (!f) throw err(SIN_SALA, 'NO_EXISTE');
  return comoSala(f, ahora);
}

export const sorteosGraphQL: ModuloGraphQL = {
  typeDefs,
  resolvers: {
    Mutation: {
      async crearSalaSorteo(_: unknown, a: { nombre?: string; visitante: string; quien: string }, ctx: Contexto) {
        const visitante = idVisitante(a.visitante), quien = limpiarNombre(a.quien);
        // Limpieza de paso: las salas sin uso en una semana se borran
        await ctx.db.delete(salasSorteo).where(lt(salasSorteo.actualizadoEn, new Date(Date.now() - 7 * 86_400_000)));
        const secreto = randomBytes(18).toString('base64url');
        const config: ConfigSala = { todosTiran: false, opciones: [], hostId: visitante };
        for (let intento = 0; intento < 5; intento++) {
          const codigo = nuevoCodigo(azar);
          const [f] = await ctx.db.insert(salasSorteo).values({
            codigo, secreto, config, nombre: limpiarNombre(a.nombre, `Sorteo de ${quien}`),
            presencia: { [visitante]: { n: quien, v: Date.now() } },
          }).onConflictDoNothing().returning({ codigo: salasSorteo.codigo });
          if (f) return { codigo: f.codigo, secreto };
        }
        throw err('No se pudo crear la sala. Vuelve a intentarlo.');
      },

      latidoSorteo: (_: unknown, a: { codigo: string; visitante: string; quien: string }, ctx: Contexto) =>
        latir(ctx, normalizarCodigo(a.codigo), idVisitante(a.visitante), limpiarNombre(a.quien)),

      async tirarSorteo(_: unknown, a: { codigo: string; visitante: string; quien: string; secreto?: string; tipo: string; expr?: string; cuantos?: number }, ctx: Contexto) {
        const codigo = normalizarCodigo(a.codigo), visitante = idVisitante(a.visitante), quien = limpiarNombre(a.quien);
        const [f] = await ctx.db.select().from(salasSorteo).where(eq(salasSorteo.codigo, codigo));
        if (!f) throw err(SIN_SALA, 'NO_EXISTE');
        const config = f.config as ConfigSala;
        if (!puedeTirar(config, mismoSecreto(a.secreto || '', f.secreto))) throw err('En esta sala solo tira quien la creó.');
        const tipo = a.tipo as TipoTirada;
        let resultado: Partial<Tirada>;
        try {
          if (tipo === 'dados') resultado = tirarDados(a.expr || '', azar);
          else if (tipo === 'moneda') resultado = tirarMoneda(azar);
          else if (tipo === 'ruleta') resultado = girarRuleta(config.opciones, a.cuantos ?? 1, azar);
          else throw new ErrorSorteo('Tipo de tirada desconocido.');
        } catch (e) {
          if (e instanceof ErrorSorteo) throw err(e.message);
          throw e;
        }
        const tirada: Tirada = { id: randomUUID(), por: quien, tipo, ts: Date.now(), ...resultado };
        // Se agrega al principio y se dejan las últimas MAX_TIRADAS, en la misma sentencia (dos tiradas a la vez no se pisan)
        const lista = sql`${JSON.stringify([tirada])}::jsonb || ${salasSorteo.tiradas}`;
        await ctx.db.update(salasSorteo).set({
          tiradas: sql`coalesce((select jsonb_agg(t order by n) from jsonb_array_elements(${lista}) with ordinality x(t, n) where n <= ${MAX_TIRADAS}), '[]'::jsonb)`,
          actualizadoEn: new Date(),
        }).where(eq(salasSorteo.codigo, codigo));
        return latir(ctx, codigo, visitante, quien);
      },

      async configurarSorteo(_: unknown, a: { codigo: string; secreto: string; nombre?: string | null; todosTiran?: boolean | null; opciones?: string[] | null }, ctx: Contexto) {
        const codigo = normalizarCodigo(a.codigo);
        const [f] = await ctx.db.select().from(salasSorteo).where(eq(salasSorteo.codigo, codigo));
        if (!f) throw err(SIN_SALA, 'NO_EXISTE');
        if (!mismoSecreto(a.secreto, f.secreto)) throw err('Solo quien creó la sala puede cambiarla.');
        const config = { ...(f.config as ConfigSala) };
        if (a.todosTiran != null) config.todosTiran = a.todosTiran;
        if (a.opciones != null) config.opciones = limpiarOpciones(a.opciones);
        const [g] = await ctx.db.update(salasSorteo).set({
          config, actualizadoEn: new Date(),
          ...(a.nombre != null ? { nombre: limpiarNombre(a.nombre, f.nombre) } : {}),
        }).where(eq(salasSorteo.codigo, codigo)).returning();
        return comoSala(g);
      },
    },
  },
};
