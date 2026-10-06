/* Objetos mágicos (Guía del Dungeon Master 2024). Textos propios en español, nunca traducidos del libro.
   Campos: n nombre, rareza, tipo, sint (pide sintonización), texto, t (tipo de acción al usarlo; por defecto pasiva),
   base ('arma' | 'armadura' | 'escudo': se aplica sobre una que elijas) con bono (+N al ataque y daño, o a la CA),
   bonoCA, bonoSalv (a todas las salvaciones), bonoConj (ataque y CD de conjuros), danoExtra (daño que suma el arma, "2d6 fuego"), fija ({fue: 19}: la característica pasa a ese valor si es menor),
   cargas {max, reset, nota} y conjuros [{n, coste, cd?, atk?}] (coste en cargas o "1 vez al día").
   La lista completa llega con el lote 21 (objetos-magicos-generados.ts), que tiene prioridad sobre esta. */
import { OBJETOS_MAGICOS_GENERADOS } from './generadas/objetos-magicos';

export type ObjetoMagico = {
  n: string; rareza: string; tipo: string; sint?: boolean; texto: string; t?: string;
  base?: 'arma' | 'armadura' | 'escudo'; bono?: number; bonoCA?: number; bonoSalv?: number; bonoConj?: number; danoExtra?: string; fija?: Record<string, number>;
  cargas?: { max: number; reset?: string; nota?: string }; conjuros?: { n: string; coste: string; cd?: number; atk?: number }[];
};

const RAREZA_ARMA = ['poco común', 'rara', 'muy rara'], RAREZA_ARMADURA = ['rara', 'muy rara', 'legendaria'];
const variantes: Record<string, ObjetoMagico> = {};
[1, 2, 3].forEach(b => {
  variantes[`arma-${b}`] = { n: `Arma +${b}`, rareza: RAREZA_ARMA[b - 1], tipo: 'arma', base: 'arma', bono: b,
    texto: `Tienes +${b} a las tiradas de ataque y de daño con esta arma mágica.` };
  variantes[`armadura-${b}`] = { n: `Armadura +${b}`, rareza: RAREZA_ARMADURA[b - 1], tipo: 'armadura', base: 'armadura', bono: b,
    texto: `Mientras la llevas puesta, tu CA aumenta en ${b}.` };
  variantes[`escudo-${b}`] = { n: `Escudo +${b}`, rareza: RAREZA_ARMA[b - 1], tipo: 'escudo', base: 'escudo', bono: b,
    texto: `Mientras lo empuñas, tu CA aumenta en ${b}, además del +2 normal del escudo.` };
});

const BASE: Record<string, ObjetoMagico> = {
  ...variantes,
  'anillo-proteccion': { n: 'Anillo de Protección', rareza: 'rara', tipo: 'anillo', sint: true, bonoCA: 1, bonoSalv: 1,
    texto: 'Mientras lo llevas puesto, tienes +1 a la CA y a todas tus tiradas de salvación.' },
  'capa-proteccion': { n: 'Capa de Protección', rareza: 'poco común', tipo: 'maravilloso', sint: true, bonoCA: 1, bonoSalv: 1,
    texto: 'Mientras la llevas puesta, tienes +1 a la CA y a todas tus tiradas de salvación.' },
  'piedra-suerte': { n: 'Piedra de la Suerte', rareza: 'poco común', tipo: 'maravilloso', sint: true, bonoSalv: 1,
    texto: 'Mientras la llevas encima, sumas +1 a tus pruebas de característica y a tus tiradas de salvación.' },
  'pocion-curacion': { n: 'Poción de Curación', rareza: 'común', tipo: 'poción', t: 'adicional',
    texto: 'Al beberla (o dársela a alguien a tu alcance) recuperas 2d4 + 2 puntos de golpe.' },
  'pocion-curacion-mayor': { n: 'Poción de Curación Mayor', rareza: 'poco común', tipo: 'poción', t: 'adicional',
    texto: 'Al beberla recuperas 4d4 + 4 puntos de golpe.' },
  'pocion-curacion-superior': { n: 'Poción de Curación Superior', rareza: 'rara', tipo: 'poción', t: 'adicional',
    texto: 'Al beberla recuperas 8d4 + 8 puntos de golpe.' },
  'pocion-curacion-suprema': { n: 'Poción de Curación Suprema', rareza: 'muy rara', tipo: 'poción', t: 'adicional',
    texto: 'Al beberla recuperas 10d4 + 20 puntos de golpe.' },
  'bolsa-contencion': { n: 'Bolsa de Contención', rareza: 'poco común', tipo: 'maravilloso', t: 'fuera',
    texto: 'Por dentro es mucho más grande que por fuera: guarda hasta 500 libras en un espacio de 64 pies cúbicos, y siempre pesa lo mismo. Sacar un objeto de ella cuesta una acción.' },
  'botas-elficas': { n: 'Botas Élficas', rareza: 'poco común', tipo: 'maravilloso',
    texto: 'Tus pasos no hacen ruido, sobre cualquier superficie, y tienes ventaja en las pruebas de Destreza (Sigilo).' },
  'capa-elfica': { n: 'Capa Élfica', rareza: 'poco común', tipo: 'maravilloso', sint: true,
    texto: 'Con la capucha puesta, quienes intenten verte tienen desventaja en Sabiduría (Percepción) y tú tienes ventaja en Destreza (Sigilo).' },
  'gafas-noche': { n: 'Gafas de la Noche', rareza: 'poco común', tipo: 'maravilloso',
    texto: 'Mientras las llevas, tienes visión en la oscuridad a 60 pies; si ya la tenías, llega 60 pies más lejos.' },
  'sombrero-disfraz': { n: 'Sombrero del Disfraz', rareza: 'poco común', tipo: 'maravilloso', sint: true, t: 'accion',
    conjuros: [{ n: 'Disfrazarse', coste: 'a voluntad' }],
    texto: 'Mientras lo llevas, puedes lanzar Disfrazarse cuando quieras. El conjuro termina si te quitas el sombrero.' },
  'guanteletes-ogro': { n: 'Guanteletes de Fuerza de Ogro', rareza: 'poco común', tipo: 'maravilloso', sint: true, fija: { fue: 19 },
    texto: 'Tu Fuerza es 19 mientras los llevas (si ya era mayor, no cambia).' },
  'diadema-intelecto': { n: 'Diadema del Intelecto', rareza: 'poco común', tipo: 'maravilloso', sint: true, fija: { int: 19 },
    texto: 'Tu Inteligencia es 19 mientras la llevas (si ya era mayor, no cambia).' },
  'amuleto-salud': { n: 'Amuleto de Salud', rareza: 'rara', tipo: 'maravilloso', sint: true, fija: { con: 19 },
    texto: 'Tu Constitución es 19 mientras lo llevas (si ya era mayor, no cambia).' },
  'cinturon-gigante-colinas': { n: 'Cinturón de Fuerza de Gigante de las Colinas', rareza: 'rara', tipo: 'maravilloso', sint: true, fija: { fue: 21 },
    texto: 'Tu Fuerza es 21 mientras lo llevas (si ya era mayor, no cambia).' },
  'cinturon-gigante-escarcha': { n: 'Cinturón de Fuerza de Gigante de Escarcha', rareza: 'muy rara', tipo: 'maravilloso', sint: true, fija: { fue: 23 },
    texto: 'Tu Fuerza es 23 mientras lo llevas (si ya era mayor, no cambia).' },
  'cinturon-gigante-piedra': { n: 'Cinturón de Fuerza de Gigante de Piedra', rareza: 'muy rara', tipo: 'maravilloso', sint: true, fija: { fue: 23 },
    texto: 'Tu Fuerza es 23 mientras lo llevas (si ya era mayor, no cambia).' },
  'cinturon-gigante-fuego': { n: 'Cinturón de Fuerza de Gigante de Fuego', rareza: 'muy rara', tipo: 'maravilloso', sint: true, fija: { fue: 25 },
    texto: 'Tu Fuerza es 25 mientras lo llevas (si ya era mayor, no cambia).' },
  'cinturon-gigante-nubes': { n: 'Cinturón de Fuerza de Gigante de las Nubes', rareza: 'legendaria', tipo: 'maravilloso', sint: true, fija: { fue: 27 },
    texto: 'Tu Fuerza es 27 mientras lo llevas (si ya era mayor, no cambia).' },
  'cinturon-gigante-tormenta': { n: 'Cinturón de Fuerza de Gigante de las Tormentas', rareza: 'legendaria', tipo: 'maravilloso', sint: true, fija: { fue: 29 },
    texto: 'Tu Fuerza es 29 mientras lo llevas (si ya era mayor, no cambia).' },
  'varita-proyectiles': { n: 'Varita de Proyectiles Mágicos', rareza: 'poco común', tipo: 'varita', t: 'accion',
    cargas: { max: 7, reset: 'largo', nota: 'Recupera 1d6 + 1 cargas al amanecer' },
    conjuros: [{ n: 'Proyectil mágico', coste: '1 carga (+1 por cada nivel extra, hasta 3)' }],
    texto: 'Tiene 7 cargas. Gastas 1 para lanzar Proyectil mágico a nivel 1, y puedes gastar hasta 2 más para subirlo de nivel. Recupera 1d6 + 1 cargas al amanecer; si gastas la última, tira 1d20: con un 1 se deshace en cenizas.' },
  'varita-bolas-fuego': { n: 'Varita de Bolas de Fuego', rareza: 'rara', tipo: 'varita', sint: true, t: 'accion',
    cargas: { max: 7, reset: 'largo', nota: 'Recupera 1d6 + 1 cargas al amanecer' },
    conjuros: [{ n: 'Bola de fuego', coste: '1 carga (+1 por cada nivel extra, hasta 3)', cd: 15 }],
    texto: 'Pide sintonización de un lanzador de conjuros. Tiene 7 cargas: gastas 1 para lanzar Bola de fuego (CD 15) a nivel 3, y hasta 2 más para subirlo de nivel. Recupera 1d6 + 1 cargas al amanecer; si gastas la última, tira 1d20: con un 1 se destruye.' },
  /* Objetos de la Colección de Objetos Mágicos del Investigador Anticuario (textos propios; estadísticas por confirmar con el libro) */
  'alfombra-voladora': { n: 'Alfombra Voladora', rareza: 'muy rara', tipo: 'maravilloso', t: 'accion',
    texto: 'Una alfombra que vuela llevando a quien se suba, a la velocidad que le indicas con una acción. Cuanto más grande, más carga aguanta y más despacio va.' },
  'capa-murcielago': { n: 'Capa del Murciélago', rareza: 'rara', tipo: 'maravilloso', sint: true,
    texto: 'Mientras la llevas, tienes ventaja en las pruebas de Destreza (Sigilo). En luz tenue u oscuridad puedes agarrarla y volar a 40 pies, o colgarte del techo boca abajo.' },
  'lengua-fuego': { n: 'Lengua de Fuego', rareza: 'rara', tipo: 'arma', sint: true, base: 'arma', bono: 0, danoExtra: '2d6 fuego', t: 'adicional',
    texto: 'Con una acción adicional haces que el arma arda (o dejas de hacerlo). Mientras arde da luz y suma 2d6 de daño de fuego a cada impacto.' },
  'fortaleza-instantanea': { n: 'Fortaleza Instantánea', rareza: 'legendaria', tipo: 'maravilloso', t: 'accion',
    texto: 'Un cubito de metal. Con una acción lo plantas en el suelo y se despliega como una torre fortificada de piedra, con puerta, almenas y defensas; con otra acción vuelve a ser un cubo.' },
  'anillo-regeneracion': { n: 'Anillo de Regeneración', rareza: 'muy rara', tipo: 'anillo', sint: true,
    texto: 'Mientras lo llevas, recuperas 1d6 puntos de golpe cada 10 minutos si te queda al menos 1 PG, y los miembros cortados vuelven a crecer en un día.' },
  'anillo-telequinesia': { n: 'Anillo de Telequinesia', rareza: 'muy rara', tipo: 'anillo', sint: true, t: 'accion',
    texto: 'Mientras lo llevas, puedes lanzar Telequinesia a voluntad (CD de tu aptitud mágica), sin componentes y sin gastar espacio.' },
  'hoja-solar': { n: 'Hoja Solar', rareza: 'rara', tipo: 'arma', sint: true, base: 'arma', bono: 2, t: 'adicional',
    texto: 'Una empuñadura que, con una acción adicional, crea una hoja de luz radiante. Cuenta como espada larga con +2 al ataque y al daño; su daño es radiante y es especialmente dañina contra muertos vivientes. Ilumina como el sol cerca.' },
  'varita-maravillas': { n: 'Varita de las Maravillas', rareza: 'rara', tipo: 'varita', sint: true, t: 'accion',
    cargas: { max: 7, reset: 'largo', nota: 'Recupera 1d6 + 1 cargas al amanecer' },
    texto: 'Tiene 7 cargas. Gastas 1 para apuntarla y que ocurra un efecto mágico al azar (tira en la tabla de la varita). Recupera 1d6 + 1 cargas al amanecer; si gastas la última, tira 1d20: con un 1 se deshace.' }
};

export const OBJETOS_MAGICOS: Record<string, ObjetoMagico> = { ...BASE, ...OBJETOS_MAGICOS_GENERADOS };
export const RAREZAS = ['común', 'poco común', 'rara', 'muy rara', 'legendaria', 'artefacto'];
