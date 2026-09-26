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

/** Quita lo que no es contenido (p. ej. el PIN de las bibliotecas viejas) y las imágenes, que van de a una con guardarExtras. */
const limpia = (lib: Biblioteca) => {
  const { adminPin, img, imgOrig, imgCrop, ...resto } = lib as Biblioteca & { adminPin?: string };
  void adminPin; void img; void imgOrig; void imgCrop;
  return resto;
};

export const guardarBiblioteca = (lib: Biblioteca) =>
  gql<{ guardarBiblioteca: boolean }>(`mutation ($lib: JSON!) { guardarBiblioteca(lib: $lib) }`, { lib: limpia(lib) });

export const aportarBiblioteca = (lib: Biblioteca) =>
  gql<{ aportarBiblioteca: number }>(`mutation ($lib: JSON!) { aportarBiblioteca(lib: $lib) }`, { lib: limpia(lib) });

export type CambioExtra = { tipo: 'desc' | 'img' | 'imgOrig' | 'imgCrop' | 'tipos'; clave: string; valor: unknown };
/** Guarda o borra (valor null) imágenes y descripciones sueltas (administrador). */
export const guardarExtras = (cambios: CambioExtra[]) =>
  gql<{ guardarExtras: number }>(`mutation ($cambios: [CambioExtra!]!) { guardarExtras(cambios: $cambios) }`, { cambios });

/** La imagen sin recortar de una especie o clase (la biblioteca no la trae, para que cargue rápido). */
export const leerImagenOriginal = (clave: string) =>
  gql<{ extraBiblioteca: string | null }>(`query ($clave: String!) { extraBiblioteca(tipo: "imgOrig", clave: $clave) }`, { clave }).then(d => d.extraBiblioteca);
