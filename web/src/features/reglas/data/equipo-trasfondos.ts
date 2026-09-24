/* Equipo inicial de los trasfondos. En las reglas de 2024 cada trasfondo da a elegir entre
   (A) su kit (armas, objetos y algo de oro) o (B) 50 po. Clave: la del trasfondo, sin "lib:".
   Fuentes, siempre la versión oficial más reciente: PHB 2024, Eberron: Forge of the Artificer (2025),
   Heroes of Faerûn (2025), Ravenloft (RHW) y Sword Coast (SCAG, que es de 2015 y no trae opción B).
   Los marcados como `sugerido` no tienen versión oficial: su kit sigue el valor de los de 2024. */

export type KitTrasfondo = {
  fuente: string;
  armas?: [string, number][];   // claves de ARMAS
  objetos: string[];            // van al inventario
  oro: number;                  // po del kit A
  alternativa?: number | null;  // po de la opción B (null si la fuente no la tiene)
  sugerido?: boolean;
};

const PHB = 'Manual del Jugador 2024', EFA = 'Eberron: Forge of the Artificer', FR = 'Heroes of Faerûn', RV = 'Ravenloft', SC = 'Sword Coast (2015)';
const k = (fuente: string, objetos: string[], oro: number, armas?: [string, number][], extra: Partial<KitTrasfondo> = {}): KitTrasfondo =>
  ({ fuente, objetos, oro, armas, alternativa: 50, ...extra });

/* Manual del Jugador 2024 */
const ACOLITO = k(PHB, ['Útiles de calígrafo', 'Libro de oraciones', 'Símbolo sagrado', 'Pergamino (10 hojas)', 'Túnica'], 8);
const ARTESANO = k(PHB, ['Herramientas de artesano (las de tu trasfondo)', 'Bolsa (2)', 'Ropa de viaje'], 32);
const ARTISTA = k(PHB, ['Instrumento musical (a tu elección)', 'Disfraz (2)', 'Espejo', 'Perfume', 'Ropa de viaje'], 11);
const CHARLATAN = k(PHB, ['Útiles de falsificación', 'Disfraz', 'Ropa fina'], 15);
const CRIMINAL = k(PHB, ['Herramientas de ladrón', 'Palanca', 'Bolsa (2)', 'Ropa de viaje'], 16, [['daga', 2]]);
const ERMITANO = k(PHB, ['Útiles de herborista', 'Petate', 'Libro de filosofía', 'Lámpara', 'Aceite (3 frascos)', 'Ropa de viaje'], 16, [['baston', 1]]);
const ESCRIBA = k(PHB, ['Útiles de calígrafo', 'Ropa fina', 'Lámpara', 'Aceite (3 frascos)', 'Pergamino (12 hojas)'], 23);
const GRANJERO = k(PHB, ['Herramientas de carpintero', 'Útiles de sanador', 'Olla de hierro', 'Pala', 'Ropa de viaje'], 30, [['hoz', 1]]);
const GUARDIA = k(PHB, ['Virotes (20)', 'Juego (a tu elección)', 'Linterna sorda', 'Grilletes', 'Carcaj', 'Ropa de viaje'], 12, [['lanza', 1], ['ballesta_ligera', 1]]);
const GUIA = k(PHB, ['Flechas (20)', 'Herramientas de cartógrafo', 'Petate', 'Carcaj', 'Tienda de campaña', 'Ropa de viaje'], 3, [['arco_corto', 1]]);
const MARINERO = k(PHB, ['Herramientas de navegante', 'Cuerda', 'Ropa de viaje'], 20, [['daga', 1]]);
const MERCADER = k(PHB, ['Herramientas de navegante', 'Bolsa (2)', 'Ropa de viaje'], 22);
const NOBLE = k(PHB, ['Juego (a tu elección)', 'Ropa fina', 'Perfume'], 29);
const SABIO = k(PHB, ['Útiles de calígrafo', 'Libro de historia', 'Pergamino (8 hojas)', 'Túnica'], 8, [['baston', 1]]);
const SOLDADO = k(PHB, ['Flechas (20)', 'Juego (a tu elección)', 'Útiles de sanador', 'Carcaj', 'Ropa de viaje'], 14, [['lanza', 1], ['arco_corto', 1]]);
const VIAJERO = k(PHB, ['Herramientas de ladrón', 'Juego (a tu elección)', 'Petate', 'Bolsa (2)', 'Ropa de viaje'], 16, [['daga', 2]]);
const ARQUEOLOGO = k(EFA, ['Herramientas de cartógrafo', 'Linterna de ojo de buey', 'Mapa', 'Estuche para mapas o pergaminos', 'Pala', 'Tienda de campaña', 'Ropa de viaje'], 17);

export const EQUIPO_TRASFONDOS: Record<string, KitTrasfondo> = {
  acolito: ACOLITO, artesano: ARTESANO, artista: ARTISTA, charlatan: CHARLATAN, criminal: CRIMINAL, ermitano: ERMITANO, escriba: ESCRIBA,
  granjero: GRANJERO, guardia: GUARDIA, guia: GUIA, marinero: MARINERO, mercader: MERCADER, noble: NOBLE, sabio: SABIO, soldado: SOLDADO, vagabundo: VIAJERO, viajero: VIAJERO,
  // Biblioteca: los mismos trasfondos de 2024 con otro nombre, y sus variantes de Barovia (sin versión oficial propia: usan el kit del trasfondo base)
  animador: ARTISTA, campesino: GRANJERO, comerciante: MERCADER, erudito: SABIO,
  'acolito-bv': ACOLITO, 'animador-bv': ARTISTA, 'artesano-bv': ARTESANO, 'charlatan-bv': CHARLATAN, 'criminal-bv': CRIMINAL, 'ermitano-bv': ERMITANO,
  'escriba-bv': ESCRIBA, 'soldado-bv': SOLDADO, 'guardia-bv': GUARDIA, 'guia-bv': GUIA, 'marinero-bv': MARINERO, 'noble-bv': NOBLE,
  // Eberron: Forge of the Artificer
  'heredero-aberrante': k(EFA, ['Útiles de disfraz', 'Disfraz', 'Ropa de viaje'], 16, [['daga', 1]]),
  arqueologo: ARQUEOLOGO,
  inquisidor: k(EFA, ['Herramientas de ladrón', 'Linterna de ojo de buey', 'Palanca', 'Aceite (10 frascos)', 'Ropa de viaje'], 10),
  'agente-casa': k(EFA, ['Herramientas de artesano (las de tu trasfondo)', 'Ropa fina'], 20),
  'heredero-casa-cannith': k(EFA, ['Herramientas de artesano (las de tu trasfondo)', 'Palanca', 'Ropa fina', 'Bolsa (2)'], 17),
  'heredero-casa-deneith': k(EFA, ['Flechas (20)', 'Juego (a tu elección)', 'Ropa fina', 'Útiles de sanador', 'Carcaj'], 1, [['lanza', 1], ['arco_corto', 1]]),
  'heredero-casa-ghallanda': k(EFA, ['Utensilios de cocinero', 'Ropa fina', 'Olla de hierro', 'Lámpara', 'Aceite (5 frascos)', 'Perfume'], 26),
  'heredero-casa-jorasco': k(EFA, ['Útiles de herborista', 'Ropa fina', 'Útiles de sanador'], 25),
  'heredero-casa-kundarak': k(EFA, ['Herramientas de ladrón', 'Ropa fina'], 10),
  'heredero-casa-lyrandar': k(EFA, ['Herramientas de navegante', 'Ropa fina'], 10),
  'heredero-casa-medani': k(EFA, ['Útiles de disfraz', 'Ropa fina'], 10),
  'heredero-casa-orien': k(EFA, ['Herramientas de cartógrafo', 'Ropa fina', 'Mapa', 'Estuche para mapas o pergaminos'], 18),
  'heredero-casa-phiarlan': k(EFA, ['Útiles de disfraz', 'Ropa fina'], 10),
  'heredero-casa-sivis': k(EFA, ['Útiles de calígrafo', 'Ropa fina', 'Tinta', 'Pluma (5)', 'Papel (30 hojas)', 'Pergamino (9 hojas)'], 8),
  'heredero-casa-tharashk': k(EFA, ['Juego (a tu elección)', 'Equipo de escalador', 'Ropa fina', 'Trampa de caza', 'Grilletes'], 2),
  'heredero-casa-thuranni': k(EFA, ['Instrumento musical (a tu elección)', 'Disfraz', 'Ropa fina'], 13),
  'heredero-casa-vadalis': k(EFA, ['Útiles de herborista', 'Ropa fina', 'Red'], 29),
  // Ravenloft
  investigador: k(RV, ['Útiles de disfraz', 'Grilletes', 'Pala', 'Ropa de viaje', 'Vial (3)'], 16),
  atormentado: k(RV, ['Juego (a tu elección)', 'Palanca', 'Agua bendita (1 frasco)', 'Espejo', 'Aceite (2 frascos)', 'Silbato de señales', 'Yesquero', 'Ropa de viaje', 'Antorcha (5)', 'Odre'], 14),
  // Heroes of Faerûn
  'cultista-dragon': k(FR, ['Útiles de calígrafo', 'Botella de cristal', 'Lámpara', 'Grilletes', 'Aceite (5 frascos)', 'Bolsa (2)', 'Túnica', 'Cuerda'], 30, [['daga', 1]]),
  'exiliado-sombras': k(FR, ['Herramientas de ladrón', 'Abrojos', 'Disfraz', 'Garfio', 'Pitones de hierro', 'Espejo', 'Bolsa (2)', 'Cuerda', 'Ropa de viaje'], 3, [['daga', 2]]),
  'mercenario-red': k(FR, ['Útiles de falsificación', 'Ropa fina', 'Linterna sorda', 'Aceite (3 frascos)', 'Bolsa (2)', 'Cordel', 'Yesquero'], 11, [['garrote', 1], ['daga', 1]]),
  'habitante-magia-muerta': k(FR, ['Herramientas de peletero', 'Petate', 'Manta', 'Útiles de sanador', 'Pértiga', 'Raciones (9 días)', 'Tienda de campaña', 'Yesquero', 'Antorcha (5)', 'Ropa de viaje', 'Odre'], 32, [['gran_clava', 1]]),
  'mercenario-puno-fuego': k(FR, ['Herramientas de herrero', 'Ropa fina', 'Grilletes', 'Ariete portátil'], 4, [['maza', 1]]),
  'pescador-hielo': k(FR, ['Herramientas de tallista', 'Cesta', 'Polea y aparejo', 'Cadena', 'Trampa de caza', 'Red', 'Pértiga', 'Raciones (9 días)', 'Ropa de viaje'], 32),
  'saqueador-tumbas': k(FR, ['Herramientas de albañil', 'Mochila', 'Petate', 'Palanca', 'Escalera', 'Pértiga', 'Bolsa (2)', 'Cuerda', 'Cordel', 'Yesquero', 'Antorcha (5)', 'Ropa de viaje', 'Odre'], 26, [['daga', 1], ['martillo_ligero', 1]]),
  'guardian-mitos': k(FR, ['Herramientas de joyero', 'Perfume', 'Bolsa', 'Túnica', 'Pala', 'Cordel', 'Odre'], 16, [['baston', 1]]),
  'escudero-dragon-plata': k(FR, ['Herramientas de navegante', 'Ropa fina'], 9, [['lanza', 1]]),
  'peregrino-pozo': k(FR, ['Útiles de pintor', 'Petate', 'Campana', 'Bolsa', 'Túnica', 'Cordel', 'Ropa de viaje', 'Odre'], 38, [['baston', 1]]),
  'agente-arpistas': k(FR, ['Útiles de disfraz', 'Petate', 'Disfraz', 'Garfio', 'Cuerda', 'Ropa de viaje'], 14),
  // Sword Coast (2015): no hay versión más nueva; solo kit, sin opción de 50 po
  'artesano-clan': k(SC, ['Herramientas de artesano (las de tu trasfondo)', 'Cincel con la marca de tu clan', 'Ropa de viaje', 'Gema (10 po)', 'Bolsa'], 5, undefined, { alternativa: null }),
  'cazarrecompensas-urbano': k(SC, ['Ropa adecuada a tu oficio', 'Bolsa'], 20, undefined, { alternativa: null }),
  cortesano: k(SC, ['Ropa fina', 'Bolsa'], 5, undefined, { alternativa: null }),
  'erudito-enclaustrado': k(SC, ['Túnica de tu claustro', 'Pluma, tinta y pergamino doblado', 'Navaja pequeña', 'Libro prestado sobre lo que estudias', 'Bolsa'], 10, undefined, { alternativa: null }),
  'forastero-errante': k(SC, ['Ropa de viaje', 'Instrumento musical o juego (a tu elección)', 'Mapas toscos de tu tierra', 'Joya pequeña al estilo de tu tierra (10 po)', 'Bolsa'], 5, undefined, { alternativa: null }),
  heredero: k(SC, ['Tu herencia (un objeto de valor, a decidir con tu DM)', 'Juego o instrumento musical (a tu elección)', 'Ropa de viaje', 'Bolsa'], 15, undefined, { alternativa: null }),
  'mercenario-veterano': k(SC, ['Uniforme de tu compañía', 'Insignia de tu rango', 'Juego (a tu elección)', 'Bolsa'], 10, undefined, { alternativa: null }),
  // Sin versión oficial: kit sugerido con el valor de los de 2024
  'arqueologo-ruinas': { ...ARQUEOLOGO, fuente: 'Sugerido (como el Arqueólogo de Eberron)', sugerido: true },
  cultista: k('Sugerido', ['Útiles de disfraz', 'Túnica con capucha', 'Símbolo de tu culto', 'Vela (5)'], 20, [['daga', 1]], { sugerido: true }),
  'alma-perdida': k('Sugerido', ['Petate', 'Manta', 'Raciones (3 días)', 'Yesquero', 'Odre', 'Ropa de viaje'], 25, [['baston', 1]], { sugerido: true }),
  'devorador-pecados': k('Sugerido', ['Útiles de calígrafo', 'Útiles de sanador', 'Símbolo sagrado', 'Pergamino (5 hojas)', 'Túnica'], 12, undefined, { sugerido: true }),
  'heredero-maldito': k('Sugerido', ['Útiles de falsificación', 'Ropa fina', 'Anillo con el sello de tu familia', 'Diario'], 15, undefined, { sugerido: true }),
  'artifice-infernal': k('Sugerido', ['Herramientas de artesano (a tu elección)', 'Palanca', 'Bolsa (2)', 'Ropa de viaje'], 25, undefined, { sugerido: true }),
  'tocado-diablo': k('Sugerido', ['Herramientas de soplador de vidrio', 'Ropa fina', 'Perfume', 'Espejo'], 20, undefined, { sugerido: true }),
  'gladiador-fuego-infernal': k('Sugerido', ['Herramientas de herrero', 'Disfraz (atuendo de arena)', 'Red', 'Útiles de sanador'], 10, [['lanza', 1]], { sugerido: true }),
  'agente-vinculado-pacto': k('Sugerido', ['Útiles de falsificación', 'Ropa fina', 'Pergamino (5 hojas)', 'Bolsa (2)'], 14, [['daga', 1]], { sugerido: true }),
  'artista-torturado': k('Sugerido', ['Instrumento musical (a tu elección)', 'Disfraz (2)', 'Espejo', 'Ropa de viaje'], 11, undefined, { sugerido: true }),
  'noble-condenado': k('Sugerido', ['Ropa fina', 'Anillo con el sello de tu familia', 'Perfume'], 29, undefined, { sugerido: true }),
  'erudito-vinculado-alma': k('Sugerido', ['Útiles de calígrafo', 'Libro', 'Pergamino (8 hojas)', 'Túnica'], 8, [['baston', 1]], { sugerido: true }),
};

/** Kit del trasfondo: el que traiga el propio trasfondo (si algún día la biblioteca lo guarda) o el de esta tabla. */
export const kitTrasfondo = (key: string, T?: { equipo?: KitTrasfondo }): KitTrasfondo | null =>
  T?.equipo || EQUIPO_TRASFONDOS[String(key || '').replace(/^lib:/, '')] || null;
