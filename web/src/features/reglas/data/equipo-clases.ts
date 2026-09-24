/* Equipo inicial de las clases, en su versión oficial más reciente: cada clase da a elegir uno de sus kits
   (el Guerrero tiene dos) o una cantidad de oro. Clave: la de la clase, sin "lib:".
   Fuentes: Manual del Jugador 2024; Artífice de Eberron: Forge of the Artificer (2025);
   Cazador de Sangre 2022 (Matt Mercer); The Pugilist Class 2024 (Benjamin Huffman). */

export type VarianteKit = {
  armadura?: string;            // clave de ARMADURAS
  escudo?: boolean;
  armas?: [string, number][];   // claves de ARMAS
  objetos: string[];            // van al inventario
  oro: number;
};
export type KitClase = {
  fuente: string;
  variantes: VarianteKit[];
  alternativa: number | { dados: string; n: number; caras: number; por: number }; // oro fijo, o tirada (4d4 × 10)
};

/* Paquetes del Manual del Jugador 2024, con su contenido para que quede en el inventario */
const P = {
  explorador: 'Paquete de explorador (mochila, petate, 2 frascos de aceite, raciones para 10 días, cuerda, yesquero, 10 antorchas, odre)',
  mazmorras: 'Paquete de explorador de mazmorras (mochila, abrojos, palanca, 2 frascos de aceite, raciones para 10 días, cuerda, yesquero, 10 antorchas, odre)',
  artista: 'Paquete de artista (mochila, petate, campana, linterna de ojo de buey, 3 disfraces, espejo, 8 frascos de aceite, raciones para 9 días, yesquero, odre)',
  sacerdote: 'Paquete de sacerdote (mochila, manta, agua bendita, lámpara, raciones para 7 días, túnica, yesquero)',
  erudito: 'Paquete de erudito (mochila, libro, tinta, pluma, lámpara, 10 frascos de aceite, 10 hojas de pergamino, yesquero)',
  ladron: 'Paquete de ladrón (mochila, bolitas de metal, campana, 10 velas, palanca, linterna sorda, 7 frascos de aceite, raciones para 5 días, cuerda, yesquero, odre)',
};
const PHB = 'Manual del Jugador 2024';
const ARTIFICE: KitClase = { fuente: 'Eberron: Forge of the Artificer (2025)', alternativa: 150,
  variantes: [{ armadura: 'tachonado', armas: [['daga', 1]], objetos: ['Herramientas de ladrón', 'Herramientas de manitas', P.mazmorras], oro: 16 }] };

export const EQUIPO_CLASES: Record<string, KitClase> = {
  artifice: ARTIFICE,
  arcanista: ARTIFICE,
  barbaro: { fuente: PHB, alternativa: 75, variantes: [{ armas: [['gran_hacha', 1], ['hacha_mano', 4]], objetos: [P.explorador], oro: 15 }] },
  bardo: { fuente: PHB, alternativa: 90, variantes: [{ armadura: 'cuero', armas: [['daga', 2]], objetos: ['Instrumento musical (a tu elección)', P.artista], oro: 19 }] },
  brujo: { fuente: PHB, alternativa: 100, variantes: [{ armadura: 'cuero', armas: [['hoz', 1], ['daga', 2]], objetos: ['Foco arcano (orbe)', 'Libro de saber oculto', P.erudito], oro: 15 }] },
  clerigo: { fuente: PHB, alternativa: 110, variantes: [{ armadura: 'camisote', escudo: true, armas: [['maza', 1]], objetos: ['Símbolo sagrado', P.sacerdote], oro: 7 }] },
  druida: { fuente: PHB, alternativa: 50, variantes: [{ armadura: 'cuero', escudo: true, armas: [['hoz', 1]], objetos: ['Foco druídico', 'Útiles de herborista', P.explorador], oro: 9 }] },
  explorador: { fuente: PHB, alternativa: 150, variantes: [{ armadura: 'tachonado', armas: [['cimitarra', 1], ['espada_corta', 1], ['arco_largo', 1]], objetos: ['Flechas (20)', 'Carcaj', 'Foco druídico (ramita de muérdago)', P.explorador], oro: 7 }] },
  guerrero: { fuente: PHB, alternativa: 155, variantes: [
    { armadura: 'mallas', armas: [['espadon', 1], ['mangual', 1], ['jabalina', 8]], objetos: [P.mazmorras], oro: 4 },
    { armadura: 'tachonado', armas: [['cimitarra', 1], ['espada_corta', 1], ['arco_largo', 1]], objetos: ['Flechas (20)', 'Carcaj', P.mazmorras], oro: 11 },
  ] },
  hechicero: { fuente: PHB, alternativa: 50, variantes: [{ armas: [['lanza', 1], ['daga', 2]], objetos: ['Foco arcano (cristal)', P.mazmorras], oro: 28 }] },
  mago: { fuente: PHB, alternativa: 55, variantes: [{ armas: [['daga', 2], ['baston', 1]], objetos: ['Foco arcano (el bastón)', 'Túnica', 'Libro de conjuros', P.erudito], oro: 5 }] },
  monje: { fuente: PHB, alternativa: 50, variantes: [{ armas: [['lanza', 1], ['daga', 5]], objetos: ['Herramientas de artesano o instrumento musical (el de tu competencia)', P.explorador], oro: 11 }] },
  paladin: { fuente: PHB, alternativa: 150, variantes: [{ armadura: 'mallas', escudo: true, armas: [['espada_larga', 1], ['jabalina', 6]], objetos: ['Símbolo sagrado', P.sacerdote], oro: 9 }] },
  picaro: { fuente: PHB, alternativa: 100, variantes: [{ armadura: 'cuero', armas: [['daga', 2], ['espada_corta', 1], ['arco_corto', 1]], objetos: ['Flechas (20)', 'Carcaj', 'Herramientas de ladrón', P.ladron], oro: 8 }] },
  'cazador-sangre': { fuente: 'Cazador de Sangre 2022 (Matt Mercer)', alternativa: { dados: '4d4 × 10', n: 4, caras: 4, por: 10 },
    variantes: [{ armadura: 'tachonado', armas: [['ballesta_ligera', 1]], objetos: ['Un arma marcial o dos sencillas, a tu elección (agrégalas en Armas)', 'Virotes (20)', 'Útiles de alquimista', P.explorador, 'Puedes cambiar el cuero tachonado por una cota de escamas'], oro: 0 }] },
  pugilista: { fuente: 'The Pugilist Class 2024 (Benjamin Huffman)', alternativa: 50,
    variantes: [{ armas: [['garrote', 1], ['hacha_mano', 1]], objetos: ['Juego (el de tu competencia)', P.mazmorras], oro: 31 }] },
};

export const kitClase = (key: string): KitClase | null => EQUIPO_CLASES[String(key || '').replace(/^lib:/, '')] || null;
