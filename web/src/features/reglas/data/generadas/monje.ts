/* Monje: reglas, fuentes y descripciones generadas por scripts/gemini/revisar.ts a partir de la respuesta de Gemini
   (lote 14). Se pueden retocar a mano; lo que necesite más lógica va en reglas-revisadas.ts, que tiene prioridad. */
/* eslint-disable */
// @ts-nocheck
const elegidos = (c, id) => [].concat(c.pj?.elecciones?.[id] || []);
/* Conjuros siempre preparados: [nivel, nombres del catálogo] */
const siempre = tabla => c => `Siempre preparados, sin contar en tu límite: ${tabla.filter(([n]) => c.lvl >= n).flatMap(([, s]) => s).join(', ')}.`;

export const reglas = [
  {de:/^guerrero de la misericordia$/, n:/^rafaga de curacion y dano$/, usos: c => Math.max(1, c.m.sab), reset: "largo"},
  {de:/^guerrero de la misericordia$/, n:/^mano de misericordia suprema$/, usos: c => 1, reset: "largo"},
  {de:/^guerrero de las artes misticas$/, n:/^conjuros de las artes misticas$/, texto: siempre([])},
];

/* Para hacer a mano en reglas-revisadas.ts:
   - clase: Cuerpo y Mente (otro): Destreza y Sabiduría aumentan en 4, hasta un máximo de 25
   - elementos: Sintonía Elemental (daño): {"donde":"elementos","rasgo":"Sintonía Elemental","tipo":"daño","daño":"Ácido, Frío, Fuego, Rayo o Trueno"} */

/* Libro de cada subclase, por su nombre normalizado */
export const fuentes: Record<string, string> = {
  "guerrero de la misericordia": "Manual del Jugador (2024)",
  "guerrero de la sombra": "Manual del Jugador (2024)",
  "guerrero de los elementos": "Manual del Jugador (2024)",
  "guerrero de las artes misticas": "Arcana Unleashed (2026)",
  "guerrero de la mano abierta": "Manual del Jugador (2024)"
};

export const descripciones: Record<string, string> = {
  "manoabierta": "Maestros del combate sin armas, derriban, empujan y neutralizan a sus enemigos mientras curan su propio cuerpo con ki.",
  "sombra": "Espías y asesinos de la noche que moldean las sombras para teletransportarse y golpear desde la invisibilidad.",
  "misericordia": "Médicos errantes enmascarados capaces de curar con un toque benévolo o provocar un dolor letal mediante golpes necróticos.",
  "elementos": "Canalizadores del Caos Elemental que alargan sus golpes y desatan destructivas explosiones de fuego, hielo y relámpago.",
  "artes-misticas": "Expertos que entrelazan artes marciales y hechicería, disparando trucos y canalizando espacios de conjuros a través de sus golpes."
};
