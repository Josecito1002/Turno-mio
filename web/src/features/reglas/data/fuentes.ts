/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * De dónde sale cada clase, subclase, especie y trasfondo, para una etiqueta pequeña en las tarjetas:
 *   5.5e 2024: Manual del Jugador 2024 (reglas básicas).
 *   D&D Beyond: otros libros oficiales (y el Cazador de Sangre, que publica D&D Beyond).
 *   Homebrew: contenido no oficial.
 *   Playtest: material de prueba oficial (Unearthed Arcana), que todavía no está en un libro.
 * Los trasfondos de la biblioteca se contrastaron con la lista oficial de 5etools (24/09/2026).
 */
import { norm } from '@/shared/utils/texto';
import { CLASES } from './clases';
import { ESPECIES } from './especies';
import { TRASFONDOS } from './trasfondos';
import { FUENTES_GENERADAS } from './generadas';

export type TipoFuente = 'basicas' | 'dndbeyond' | 'homebrew' | 'playtest';
export type Fuente = { tipo: TipoFuente; libro?: string };
export const ETIQUETA_FUENTE: Record<TipoFuente, string> = { basicas: '5.5e 2024', dndbeyond: 'D&D Beyond', homebrew: 'Homebrew', playtest: 'Playtest' };

const PHB: Fuente = { tipo: 'basicas', libro: 'Manual del Jugador 2024' };
const dndb = (libro: string): Fuente => ({ tipo: 'dndbeyond', libro });
const HOMEBREW: Fuente = { tipo: 'homebrew', libro: 'Contenido no oficial' };
const playtest = (libro: string): Fuente => ({ tipo: 'playtest', libro });

/* ---------- Clases ---------- */
const CLASES_LIB: Record<string, Fuente> = {
  artifice: dndb('Eberron: Forge of the Artificer (2025)'),
  'lib:arcanista': dndb('Eberron: Forge of the Artificer (2025)'),
  'lib:cazador-sangre': dndb('Blood Hunter, de Matt Mercer (D&D Beyond)'),
  'lib:pugilista': { tipo: 'homebrew', libro: 'The Pugilist Class, de Benjamin Huffman' },
};
export function fuenteClase(k: string): Fuente {
  return CLASES_LIB[k] || (CLASES[k] ? PHB : HOMEBREW);
}

/* ---------- Subclases ---------- */
/* Las del Manual del Jugador 2024 que vienen en la biblioteca (las demás del manual están en las reglas) */
const SUBCLASES_PHB = new Set([
  'senda del berserker', 'senda del corazon salvaje', 'senda del arbol del mundo', 'senda del fanatico',
  'colegio del conocimiento', 'colegio del valor', 'colegio del glamour', 'colegio de la danza',
  'dominio de la vida', 'dominio de la luz', 'dominio del engano', 'dominio de la guerra',
  'circulo de la tierra', 'circulo de la luna', 'circulo del mar', 'circulo de las estrellas',
  'cazador', 'maestro de bestias', 'caminante de las hadas', 'acechador de las sombras',
  'campeon', 'maestro de batalla', 'caballero arcano', 'guerrero psionico',
  'hechiceria aberrante', 'alma del reloj',
  'escuela de abjuracion', 'escuela de adivinacion', 'escuela de evocacion', 'escuela de ilusion',
  'camino de los elementos', 'camino de la misericordia',
  'embaucador arcano', 'asesino', 'cuchillo mental', 'ladron',
]);
/* De otros libros oficiales */
const SUBCLASES_DNDB: Record<string, string> = {
  'colegio de la luna': 'Forgotten Realms: Heroes of Faerûn (2025)',
  'colegio de los espiritus': "Van Richten's Guide to Ravenloft",
  'el no muerto': 'Ravenloft: The Horrors Within (2026)',
  'el vestigio': 'Arcana Unleashed (2026)',
  'el filo maldito': "Xanathar's Guide to Everything",
  'el genio': "Tasha's Cauldron of Everything",
  'el insondable': "Tasha's Cauldron of Everything",
  'el inmortal': "Sword Coast Adventurer's Guide",
  'dominio del conocimiento': 'Forgotten Realms: Heroes of Faerûn (2025)',
  'dominio arcano': 'Arcana Unleashed (2026)',
  'dominio de la tempestad': 'Manual del Jugador 2014',
  'dominio de la naturaleza': 'Manual del Jugador 2014',
  'dominio de la forja': "Xanathar's Guide to Everything",
  'dominio del orden': "Tasha's Cauldron of Everything",
  'dominio de la paz': "Tasha's Cauldron of Everything",
  'dominio del crepusculo': "Tasha's Cauldron of Everything",
  'dominio de la muerte': 'Guía del Dungeon Master 2014',
  'dominio de la tumba': 'Ravenloft: The Horrors Within (2026)',
  'caminante del invierno': 'Forgotten Realms: Heroes of Faerûn (2025)',
  'caballero del dragon purpura': 'Forgotten Realms: Heroes of Faerûn (2025)',
  'hechiceria de fuego de conjuro': 'Forgotten Realms: Heroes of Faerûn (2025)',
  'hechiceria de las sombras': "Xanathar's Guide to Everything",
  'cantor de la hoja': 'Forgotten Realms: Heroes of Faerûn (2025)',
  'escuela de conjuracion': 'Manual del Jugador 2014',
  'escuela de encantamiento': 'Manual del Jugador 2014',
  'escuela de necromancia': 'Manual del Jugador 2014',
  'escuela de transmutacion': 'Manual del Jugador 2014',
  'juramento de los genios nobles': 'Forgotten Realms: Heroes of Faerûn (2025)',
  'fantasma': "Tasha's Cauldron of Everything",
  'vastago de los tres': 'Forgotten Realms: Heroes of Faerûn (2025)',
  'inquisitivo': "Xanathar's Guide to Everything",
};
/* Material de prueba de Unearthed Arcana (web/scripts/datos/playtest-2025.ts) */
const UA_2025 = 'Unearthed Arcana 2025: Subclasses Update';
const SUBCLASES_PLAYTEST: Record<string, string> = {
  'senda del guardian espiritual': UA_2025, 'senda del heraldo de la tormenta': UA_2025, 'caballero (playtest)': UA_2025,
  'guerrero de la embriaguez': UA_2025, 'rompejuramentos': UA_2025,
};
/** s: subclase como la da getSubs (lib: si viene de la biblioteca); clase: clave de la clase. */
export function fuenteSubclase(s: { n: string; lib?: boolean }, clase: string): Fuente {
  const deClase = fuenteClase(clase);
  if (deClase.tipo !== 'basicas') return deClase; // las de Artífice, Cazador de Sangre y Pugilista van con su clase
  if (!s.lib) return PHB;
  const n = norm(s.n);
  if (SUBCLASES_PLAYTEST[n]) return playtest(SUBCLASES_PLAYTEST[n]);
  const g = FUENTES_GENERADAS[n]; // de los lotes hechos con Gemini
  if (g) return /Manual del Jugador.*2024/.test(g) ? PHB : dndb(g);
  if (SUBCLASES_DNDB[n]) return dndb(SUBCLASES_DNDB[n]);
  return SUBCLASES_PHB.has(n) ? PHB : HOMEBREW;
}

/* ---------- Especies ---------- */
export function fuenteEspecie(k: string, E: any): Fuente {
  if (ESPECIES[k] && k !== 'custom') return PHB;
  const src = String(E?.src || '');
  if (!src || /sin versi[oó]n oficial|creada/i.test(src)) return HOMEBREW;
  return dndb(src);
}

/* ---------- Trasfondos ---------- */
/* Los del manual que la biblioteca trae con otro nombre (Animador = Artista, Viajero = Vagabundo) */
const TRASFONDOS_PHB = new Set(['animador', 'mercader', 'sabio', 'marinero', 'escriba', 'viajero']);
const TRASFONDOS_DNDB: [RegExp, string][] = [
  [/^heredero de la casa |^agente de la casa$|^heredero aberrante$|^arqueologo$|^inquisidor$/, 'Eberron: Forge of the Artificer (2025)'],
  [/^cultista del dragon$|^mercenario de la red$|^habitante de la magia muerta$|^mercenario del puno de fuego$|^pescador de hielo$|^saqueador de tumbas$|^guardian de los mitos$|^escudero del dragon|^peregrino del pozo$|^agente de los arpistas$|^exiliado de las sombras$/, 'Forgotten Realms: Heroes of Faerûn (2025)'],
  [/^artesano del clan$|^cazarrecompensas urbano$|^cortesano$|^erudito enclaustrado$|^forastero errante$|^heredero$|^mercenario veterano$/, 'Sword Coast Adventurer\'s Guide'],
  [/^atormentado$|^investigador$/, "Van Richten's Guide to Ravenloft"],
];
export function fuenteTrasfondo(k: string, T: any): Fuente {
  if (TRASFONDOS[k] && !T?.custom) return PHB;
  const n = norm(T?.n || '');
  if (TRASFONDOS_PHB.has(n)) return PHB;
  const m = TRASFONDOS_DNDB.find(([re]) => re.test(n));
  return m ? dndb(m[1]) : HOMEBREW;
}
