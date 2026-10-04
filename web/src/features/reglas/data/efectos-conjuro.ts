/* Conjuros y rasgos con efectos que siguen después de usarlos o que se dejan en otra criatura.
   Las claves son el nombre sin tildes ni mayúsculas (norm). Los textos están en palabras propias. */

/** Algo que el lanzador puede volver a hacer en sus siguientes turnos mientras dura el conjuro (Rayo de hechicería, Calentar metal…). */
export type Seguimiento = {
  nombre: string;
  /** Con qué tipo de acción se repite */
  en: 'accion' | 'adicional';
  /** Si se puede repetir en el mismo turno en que se lanza (Esfera de llamas) o solo desde el siguiente */
  desde: 'ya' | 'siguiente';
  texto: string;
  /** Dados del efecto al lanzarlo con el espacio más bajo; si no se dan, se usan los del propio conjuro */
  dado?: string;
  /** Dados que suma cada nivel de espacio por encima del base */
  porNivel?: string;
  nivelBase?: number;
  tipo: string;
  /** Pide elegir un objetivo al lanzarlo (la marca queda sobre él) */
  objetivo: boolean;
  /** El seguimiento es un ataque de conjuro, o una salvación */
  ataque?: boolean;
  salv?: string;
};

export const SEGUIMIENTOS: Record<string, Seguimiento> = {
  'rayo de hechiceria': { nombre: 'Rayo de hechicería', en: 'adicional', desde: 'siguiente', dado: '1d12', tipo: 'relámpago', objetivo: true,
    texto: 'Causas 1d12 de daño de relámpago a la criatura marcada a través de su marca, sin otro ataque.' },
  'calentar metal': { nombre: 'Calentar metal', en: 'adicional', desde: 'siguiente', dado: '2d8', porNivel: '1d8', nivelBase: 2, tipo: 'fuego', objetivo: false,
    texto: 'Vuelves a causar el daño de fuego a quien toque o lleve el objeto, si sigue dentro del alcance. Quien lo sostiene debe superar una salvación de CON o lo suelta; si no puede, tiene desventaja hasta su siguiente turno.' },
  'esfera de llamas': { nombre: 'Esfera de llamas', en: 'adicional', desde: 'ya', dado: '2d6', porNivel: '1d6', nivelBase: 2, tipo: 'fuego', objetivo: false, salv: 'DES',
    texto: 'Mueves la esfera hasta 30 pies haciéndola rodar. Si entra en el espacio de una criatura, esa criatura hace una salvación de DES: 2d6 de fuego si falla, la mitad si la supera.' },
  'espada de mordenkainen': { nombre: 'Espada de Mordenkainen', en: 'adicional', desde: 'siguiente', tipo: 'fuerza', objetivo: false, ataque: true,
    texto: 'Mueves la espada hasta 30 pies y repites el ataque de conjuro cuerpo a cuerpo contra el mismo objetivo u otro.' },
};

/** Un efecto que el conjuro o rasgo deja en otra criatura (se muestra en su pantalla): bonos, protecciones… */
export type EfectoAliado = { condicion: string; bono: string };

export const EFECTOS_ALIADO: Record<string, EfectoAliado> = {
  'bendicion': { condicion: 'Bendecido', bono: 'Suma 1d4 a cada tirada de ataque y de salvación mientras dure el conjuro (concentración, hasta 1 minuto).' },
  'vinculo protector': { condicion: 'Vínculo protector', bono: '+1 a la CA y a las salvaciones y resistencia a todo el daño mientras estés a 60 pies de quien lo lanzó; esa persona recibe el mismo daño que tú.' },
  'inspiracion bardica': { condicion: 'Inspirado por un bardo', bono: 'Puedes sumar un dado de Inspiración Bárdica a una prueba de característica, tirada de ataque o salvación (una vez, durante 1 hora).' },
};

/** Suma `n` veces `extra` a unos dados base del mismo tipo: 2d8 + 1 × 1d8 = 3d8. */
export function escalarDados(base: string, extra: string | undefined, n: number): string {
  if (!extra || n <= 0) return base;
  const a = /^(\d+)d(\d+)$/.exec(base), b = /^(\d+)d(\d+)$/.exec(extra);
  if (a && b && a[2] === b[2]) return `${+a[1] + n * +b[1]}d${a[2]}`;
  return b ? `${base}+${n * +b[1]}d${b[2]}` : `${base}+${extra}`;
}
