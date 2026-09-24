import { eq } from 'drizzle-orm';
import { GraphQLError } from 'graphql';
import { requiereUsuario, type Contexto, type ModuloGraphQL } from '@/shared/graphql/servidor';
import { usuarios } from '@/features/cuentas/server/tablas';
import { aportarBiblioteca, leerBiblioteca, reemplazarBiblioteca } from './repositorio';
import type { Biblioteca } from '../domain/biblioteca';

const typeDefs = /* GraphQL */ `
  type Rasgo {
    origen: String!
    subclase: String
    subespecie: String
    orden: Int!
    nombre: String!
    tipo: String!
    texto: String!
    nivel: Int
    usos: JSON
    descanso: String
    extra: JSON
  }
  type Subclase { clave: String!, nombre: String!, extra: JSON }
  type Clase {
    id: ID!
    nombre: String
    esLib: Boolean!
    fuente: String
    dadoGolpe: Int
    salvaciones: [String!]
    numHabilidades: Int
    habilidades: JSON
    armaduras: String
    armas: String
    competenciaArmas: JSON
    atributoConjuros: String
    tipoLanzador: String
    tablaEspacios: JSON
    tablaRecursos: JSON
    nivelesAsi: [Int!]
    nivelEstilo: Int
    estilos: [String!]
    maestrias: Int
    hastaNivel: Int
    extra: JSON
    subclases: [Subclase!]!
    rasgos: [Rasgo!]!
  }
  type Subespecie { clave: String!, nombre: String!, extra: JSON }
  type Especie {
    id: ID!
    nombre: String!
    esLib: Boolean!
    fuente: String
    resumen: String
    velocidad: Int!
    vision: Int!
    etiquetaSub: String
    extra: JSON
    subespecies: [Subespecie!]!
    rasgos: [Rasgo!]!
  }
  type Trasfondo { id: ID!, nombre: String!, esLib: Boolean!, atributos: [String!]!, habilidades: [String!]!, herramientas: String!, doteId: String, extra: JSON }
  type Dote { id: ID!, nombre: String!, tipo: String!, texto: String!, categoria: String!, nivelMin: Int!, extra: JSON }
  type Conjuro {
    id: ID!
    nombre: String!
    nivel: Int!
    tiempo: String!
    alcance: String!
    duracion: String!
    concentracion: Boolean!
    ritual: Boolean!
    salvacion: String!
    ataque: Boolean!
    dados: String!
    descripcion: String!
    extra: JSON
    clases: [String!]!
  }
  type LibExtra { tipo: String!, clave: String!, valor: JSON }
  type Biblioteca {
    clases: [Clase!]!
    especies: [Especie!]!
    trasfondos: [Trasfondo!]!
    dotes: [Dote!]!
    conjuros: [Conjuro!]!
    libExtra: [LibExtra!]!
  }

  extend type Query {
    "Todo el contenido compartido (clases, especies, trasfondos, dotes, conjuros e imágenes/descripciones)."
    biblioteca: Biblioteca!
  }
  extend type Mutation {
    "Solo administradores: deja la biblioteca exactamente igual a la enviada (formato LIB de la web)."
    guardarBiblioteca(lib: JSON!): Boolean!
    "Cualquier usuario: agrega lo que no exista todavía (lo que se aprende al importar). Devuelve cuántas filas nuevas hubo."
    aportarBiblioteca(lib: JSON!): Int!
  }
`;

export const bibliotecaGraphQL: ModuloGraphQL = {
  typeDefs,
  resolvers: {
    Query: {
      biblioteca: (_: unknown, __: unknown, ctx: Contexto) => { requiereUsuario(ctx); return leerBiblioteca(ctx.db); },
    },
    Mutation: {
      guardarBiblioteca: async (_: unknown, { lib }: { lib: Biblioteca }, ctx: Contexto) => {
        const u = requiereUsuario(ctx);
        const [fila] = await ctx.db.select({ rol: usuarios.rol }).from(usuarios).where(eq(usuarios.id, u.id)).limit(1);
        if (fila?.rol !== 'admin') throw new GraphQLError('Solo el administrador puede editar la biblioteca.', { extensions: { code: 'FORBIDDEN' } });
        await reemplazarBiblioteca(ctx.db, lib);
        return true;
      },
      aportarBiblioteca: (_: unknown, { lib }: { lib: Biblioteca }, ctx: Contexto) => { requiereUsuario(ctx); return aportarBiblioteca(ctx.db, lib); },
    },
  },
};
