/* Criaturas que acompañan al personaje (familiares y muertos vivientes), con sus estadísticas de la versión 2024
   (Manual del Jugador 2024, apéndice de criaturas, y Manual de Monstruos 2024). Los textos son propios.
   Cada acción con `atk` se tira como un ataque; `dmg` es la expresión de daño y `tipo` su tipo. */

export interface AccionCriatura { n: string; atk?: number; dmg?: string; tipo?: string; texto?: string }
export interface Criatura {
  n: string; tipo: string; ca: number; pg: string; pgMedia: number; vel: string;
  ab: { fue: number; des: number; con: number; int: number; sab: number; car: number };
  salv?: Record<string, number>; habs?: Record<string, number>; sentidos: string; inmune?: string; vulnerable?: string;
  rasgos?: [string, string][]; acciones: AccionCriatura[];
  /** De dónde sale: el conjuro que la crea */
  de: 'familiar' | 'muerto';
}

const bestia = 'Bestia diminuta (o celestial, feérica o infernal, a tu elección)';

export const CRIATURAS: Record<string, Criatura> = {
  murcielago: { n: 'Murciélago', tipo: bestia, ca: 12, pg: '1d4-1', pgMedia: 1, vel: '5 pies, volar 30 pies',
    ab: { fue: 2, des: 15, con: 8, int: 2, sab: 12, car: 4 }, sentidos: 'Vista ciega 60 pies; Percepción pasiva 11', de: 'familiar',
    acciones: [{ n: 'Mordisco', atk: 4, dmg: '1', tipo: 'perforante' }] },
  gato: { n: 'Gato', tipo: bestia, ca: 12, pg: '1d4', pgMedia: 2, vel: '40 pies, trepar 40 pies',
    ab: { fue: 3, des: 15, con: 10, int: 3, sab: 12, car: 7 }, habs: { Percepción: 3, Sigilo: 4 }, sentidos: 'Visión en la oscuridad 60 pies; Percepción pasiva 13', de: 'familiar',
    rasgos: [['Saltarín', 'Salta su distancia completa sin necesidad de carrerilla.']],
    acciones: [{ n: 'Arañazo', atk: 4, dmg: '1', tipo: 'cortante' }] },
  rana: { n: 'Rana', tipo: bestia, ca: 11, pg: '1d4-1', pgMedia: 1, vel: '20 pies, nadar 20 pies',
    ab: { fue: 1, des: 13, con: 8, int: 1, sab: 8, car: 3 }, habs: { Percepción: 1, Sigilo: 3 }, sentidos: 'Visión en la oscuridad 30 pies; Percepción pasiva 11', de: 'familiar',
    rasgos: [['Anfibia', 'Respira aire y agua.'], ['Salto sin carrerilla', 'Salta hasta 10 pies de largo y 5 de alto, con o sin carrerilla.']],
    acciones: [{ n: 'Mordisco', atk: 3, dmg: '1', tipo: 'perforante' }] },
  halcon: { n: 'Halcón', tipo: bestia, ca: 13, pg: '1d4-1', pgMedia: 1, vel: '10 pies, volar 60 pies',
    ab: { fue: 5, des: 16, con: 8, int: 2, sab: 14, car: 6 }, habs: { Percepción: 6 }, sentidos: 'Percepción pasiva 16', de: 'familiar',
    acciones: [{ n: 'Garras', atk: 5, dmg: '1', tipo: 'cortante' }] },
  lagarto: { n: 'Lagarto', tipo: bestia, ca: 10, pg: '1d4', pgMedia: 2, vel: '20 pies, trepar 20 pies',
    ab: { fue: 2, des: 11, con: 10, int: 1, sab: 8, car: 3 }, sentidos: 'Visión en la oscuridad 30 pies; Percepción pasiva 9', de: 'familiar',
    rasgos: [['Trepar como araña', 'Trepa por superficies difíciles, incluso bocabajo por el techo, sin pruebas.']],
    acciones: [{ n: 'Mordisco', atk: 2, dmg: '1', tipo: 'perforante' }] },
  pulpo: { n: 'Pulpo', tipo: bestia, ca: 12, pg: '1d4-1', pgMedia: 1, vel: '5 pies, nadar 30 pies',
    ab: { fue: 4, des: 15, con: 11, int: 3, sab: 10, car: 4 }, habs: { Percepción: 2, Sigilo: 6 }, sentidos: 'Visión en la oscuridad 30 pies; Percepción pasiva 12', de: 'familiar',
    rasgos: [['Respirar bajo el agua', 'Solo respira bajo el agua.'], ['Compresión', 'Pasa por un hueco de 1 pulgada sin gastar movimiento extra.']],
    acciones: [{ n: 'Tentáculos', atk: 4, dmg: '1', tipo: 'contundente' },
      { n: 'Nube de tinta (1 vez por descanso)', texto: 'Bajo el agua, con una reacción al recibir daño, suelta tinta en 5 pies alrededor (oscuridad total un minuto) y nada hasta su velocidad.' }] },
  buho: { n: 'Búho', tipo: bestia, ca: 11, pg: '1d4-1', pgMedia: 1, vel: '5 pies, volar 60 pies',
    ab: { fue: 3, des: 13, con: 8, int: 2, sab: 12, car: 7 }, habs: { Percepción: 5, Sigilo: 5 }, sentidos: 'Visión en la oscuridad 120 pies; Percepción pasiva 15', de: 'familiar',
    rasgos: [['Vuelo rasante', 'Al salir volando del alcance de un enemigo no provoca ataques de oportunidad.']],
    acciones: [{ n: 'Garras', atk: 3, dmg: '1', tipo: 'cortante' }] },
  rata: { n: 'Rata', tipo: bestia, ca: 10, pg: '1d4-1', pgMedia: 1, vel: '20 pies, trepar 20 pies',
    ab: { fue: 2, des: 11, con: 9, int: 2, sab: 10, car: 4 }, habs: { Percepción: 2 }, sentidos: 'Visión en la oscuridad 30 pies; Percepción pasiva 12', de: 'familiar',
    acciones: [{ n: 'Mordisco', atk: 2, dmg: '1', tipo: 'perforante' }] },
  cuervo: { n: 'Cuervo', tipo: bestia, ca: 12, pg: '1d4', pgMedia: 2, vel: '10 pies, volar 50 pies',
    ab: { fue: 2, des: 14, con: 10, int: 5, sab: 13, car: 6 }, habs: { Percepción: 3 }, sentidos: 'Percepción pasiva 13', de: 'familiar',
    rasgos: [['Imitación', 'Imita sonidos y voces que haya oído; quien lo escucha lo descubre con una prueba de Perspicacia (CD 10).']],
    acciones: [{ n: 'Pico', atk: 4, dmg: '1', tipo: 'perforante' }] },
  arana: { n: 'Araña', tipo: bestia, ca: 12, pg: '1d4-1', pgMedia: 1, vel: '20 pies, trepar 20 pies',
    ab: { fue: 2, des: 14, con: 8, int: 1, sab: 10, car: 2 }, habs: { Sigilo: 4 }, sentidos: 'Visión en la oscuridad 30 pies; Percepción pasiva 10', de: 'familiar',
    rasgos: [['Trepar como araña', 'Trepa por superficies difíciles, incluso bocabajo por el techo, sin pruebas.'], ['Andar por telarañas', 'Ignora las restricciones de movimiento de las telarañas y sabe dónde está quien las toca.']],
    acciones: [{ n: 'Mordisco', atk: 4, dmg: '1+1d4', tipo: 'perforante y veneno' }] },
  comadreja: { n: 'Comadreja', tipo: bestia, ca: 13, pg: '1d4-1', pgMedia: 1, vel: '30 pies, trepar 30 pies',
    ab: { fue: 3, des: 16, con: 8, int: 2, sab: 12, car: 3 }, habs: { Acrobacias: 5, Percepción: 3, Sigilo: 5 }, sentidos: 'Visión en la oscuridad 60 pies; Percepción pasiva 13', de: 'familiar',
    acciones: [{ n: 'Mordisco', atk: 5, dmg: '1', tipo: 'perforante' }] },

  esqueleto: { n: 'Esqueleto', tipo: 'Muerto viviente mediano', ca: 13, pg: '2d8+4', pgMedia: 13, vel: '30 pies',
    ab: { fue: 10, des: 16, con: 15, int: 6, sab: 8, car: 5 }, sentidos: 'Visión en la oscuridad 60 pies; Percepción pasiva 9', de: 'muerto',
    vulnerable: 'Contundente', inmune: 'Veneno; Agotamiento, Envenenado',
    acciones: [{ n: 'Espada corta', atk: 5, dmg: '1d6+3', tipo: 'perforante' }, { n: 'Arco corto (80/320 pies)', atk: 5, dmg: '1d6+3', tipo: 'perforante' }] },
  zombi: { n: 'Zombi', tipo: 'Muerto viviente mediano', ca: 8, pg: '2d8+6', pgMedia: 15, vel: '20 pies',
    ab: { fue: 13, des: 6, con: 16, int: 3, sab: 6, car: 5 }, salv: { sab: 0 }, sentidos: 'Visión en la oscuridad 60 pies; Percepción pasiva 8', de: 'muerto',
    inmune: 'Veneno; Agotamiento, Envenenado',
    rasgos: [['Aguante de muerto viviente', 'Si el daño lo deja a 0 PG, hace una salvación de CON (CD 5 + el daño recibido) salvo que el daño sea radiante o de un crítico; si la pasa, queda con 1 PG.']],
    acciones: [{ n: 'Golpe', atk: 3, dmg: '1d8+1', tipo: 'contundente' }] },
};

/** Qué criaturas puede tener el personaje según sus conjuros */
export const CRIATURAS_DE_CONJURO: Record<string, 'familiar' | 'muerto'> = { 'encontrar familiar': 'familiar', 'animar a los muertos': 'muerto' };
