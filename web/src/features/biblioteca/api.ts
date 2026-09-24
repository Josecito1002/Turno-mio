import { gql } from '@/shared/graphql/cliente';
import type { Biblioteca } from './domain/biblioteca';
import type { BibliotecaAnidada } from './domain/mapeo';

const RASGO = 'origen subclase subespecie orden nombre tipo texto nivel usos descanso extra';

export const QUERY_BIBLIOTECA = /* GraphQL */ `
  biblioteca {
    clases {
      id nombre esLib fuente dadoGolpe salvaciones numHabilidades habilidades armaduras armas competenciaArmas
      atributoConjuros tipoLanzador tablaEspacios tablaRecursos nivelesAsi nivelEstilo estilos maestrias hastaNivel extra
      subclases { clave nombre extra }
      rasgos { ${RASGO} }
    }
    especies {
      id nombre esLib fuente resumen velocidad vision etiquetaSub extra
      subespecies { clave nombre extra }
      rasgos { ${RASGO} }
    }
    trasfondos { id nombre esLib atributos habilidades herramientas doteId extra }
    dotes { id nombre tipo texto categoria nivelMin extra }
    conjuros { id nombre nivel tiempo alcance duracion concentracion ritual salvacion ataque dados descripcion extra clases }
    libExtra { tipo clave valor }
  }
`;
export type RespuestaBiblioteca = { biblioteca: BibliotecaAnidada };

/** Quita lo que no es contenido (p. ej. el PIN de las bibliotecas viejas). */
const limpia = (lib: Biblioteca) => { const { adminPin, ...resto } = lib as Biblioteca & { adminPin?: string }; void adminPin; return resto; };

export const guardarBiblioteca = (lib: Biblioteca) =>
  gql<{ guardarBiblioteca: boolean }>(`mutation ($lib: JSON!) { guardarBiblioteca(lib: $lib) }`, { lib: limpia(lib) });

export const aportarBiblioteca = (lib: Biblioteca) =>
  gql<{ aportarBiblioteca: number }>(`mutation ($lib: JSON!) { aportarBiblioteca(lib: $lib) }`, { lib: limpia(lib) });
