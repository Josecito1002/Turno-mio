/* Mago: reglas, fuentes y descripciones generadas por scripts/gemini/revisar.ts a partir de la respuesta de Gemini
   (lote 13). Se pueden retocar a mano; lo que necesite más lógica va en reglas-revisadas.ts, que tiene prioridad. */
/* eslint-disable */
// @ts-nocheck
const elegidos = (c, id) => [].concat(c.pj?.elecciones?.[id] || []);
/* Conjuros siempre preparados: [nivel, nombres del catálogo] */
const siempre = tabla => c => `Siempre preparados, sin contar en tu límite: ${tabla.filter(([n]) => c.lvl >= n).flatMap(([, s]) => s).join(', ')}.`;

export const reglas = [
  {de:/^abjurador$/, n:/^capa arcana$/, usos: c => 1, reset: "largo"},
  {de:/^cantor de la hoja$/, n:/^canto de la hoja$/, usos: c => Math.max(1, c.m.int), reset: "largo"},
  {de:/^conjurador$/, n:/^transposicion benigna$/, usos: c => Math.max(1, c.m.int), reset: "largo"},
  {de:/^conjurador$/, n:/^invocacion astillada$/, usos: c => 1, reset: "largo"},
  {de:/^adivino$/, n:/^el tercer ojo$/, usos: c => 1, reset: "corto"},
  {de:/^encantador$/, n:/^conversador encantador$/,
    eleccion: [{id: "encantamiento-habilidades", titulo: "Conversador Encantador", opciones: [
      {key: "encant-engano", nombre: "Engaño", desc: "Competencia en Engaño y sumas INT.", nivel: 3},
      {key: "encant-intimidacion", nombre: "Intimidación", desc: "Competencia en Intimidación y sumas INT.", nivel: 3},
      {key: "encant-persuasion", nombre: "Persuasión", desc: "Competencia en Persuasión y sumas INT.", nivel: 3}]}],
    opciones: [
      {nombre: "Engaño", t: "pasiva", elegida: ["encantamiento-habilidades", "encant-engano"], si: c => elegidos(c, "encantamiento-habilidades").includes("encant-engano"), texto: () => "Competencia en Engaño y sumas INT."},
      {nombre: "Intimidación", t: "pasiva", elegida: ["encantamiento-habilidades", "encant-intimidacion"], si: c => elegidos(c, "encantamiento-habilidades").includes("encant-intimidacion"), texto: () => "Competencia en Intimidación y sumas INT."},
      {nombre: "Persuasión", t: "pasiva", elegida: ["encantamiento-habilidades", "encant-persuasion"], si: c => elegidos(c, "encantamiento-habilidades").includes("encant-persuasion"), texto: () => "Competencia en Persuasión y sumas INT."}]},
  {de:/^encantador$/, n:/^presencia hipnotica$/, usos: c => Math.max(1, c.m.int), reset: "largo"},
  {de:/^encantador$/, n:/^encantamiento dividido$/, usos: c => Math.max(1, c.m.int), reset: "largo"},
  {de:/^encantador$/, n:/^encanto instintivo$/, usos: c => 1, reset: "largo"},
  {de:/^ilusionista$/, n:/^criaturas fantasmales$/, usos: c => 1, reset: "largo"},
  {de:/^ilusionista$/, n:/^yo ilusorio$/, usos: c => 1, reset: "corto"},
  {de:/^nigromante$/, n:/^siervos muertos vivientes$/, usos: c => 1, reset: "largo"},
  {de:/^transmutador$/, n:/^alteracion maravillosa$/, usos: c => 1, reset: "largo"},
  {de:/^transmutador$/, n:/^transmutacion potenciada$/, usos: c => Math.max(1, c.m.int), reset: "largo"},
  {de:/^transmutador$/, n:/^cambiaformas$/, usos: c => 1, reset: "largo"},
  {de:/^magia de cronurgia$/, n:/^cambio cronico$/, usos: c => 2, reset: "largo"},
  {de:/^orden de escribas$/, n:/^libro de conjuros despierto$/, usos: c => 1, reset: "largo"},
  {de:/^magia de cronurgia$/, n:/^estasis momentanea$/, usos: c => Math.max(1, c.m.int), reset: "largo"},
  {de:/^magia de cronurgia$/, n:/^suspension arcana$/, usos: c => 1, reset: "corto"},
  {de:/^magia de graviturgia$/, n:/^atraccion violenta$/, usos: c => Math.max(1, c.m.int), reset: "largo"},
  {de:/^orden de escribas$/, n:/^mente manifiesta$/, usos: 'pb', reset: "largo"},
  {de:/^orden de escribas$/, n:/^uno con la palabra$/, usos: c => 1, reset: "largo"},
];

/* Para hacer a mano en reglas-revisadas.ts:
   - abjuracion: Capa Arcana (pg): (2 * nivel) + INT
   - cantor-hoja: Canto de la Hoja (ca): INT (mínimo +1)
   - evocacion: Evocación Potenciada (daño): {"donde":"evocacion","rasgo":"Evocación Potenciada","tipo":"daño","daño":"INT"}
   - necromancia: Siervos Muertos Vivientes (daño): {"donde":"necromancia","rasgo":"Siervos Muertos Vivientes","tipo":"daño","daño":"INT Necrótico"}
   - necromancia: Amo de la Muerte (pg): nivel
   - magia-guerra: Manto Desviador (daño): {"donde":"magia-guerra","rasgo":"Manto Desviador","tipo":"daño","daño":"nivel/2 Fuerza"} */

/* Libro de cada subclase, por su nombre normalizado */
export const fuentes: Record<string, string> = {
  "abjurador": "Manual del Jugador (2024)",
  "cantor de la hoja": "Forgotten Realms: Heroes of Faerûn (2025)",
  "magia de cronurgia": "Explorer's Guide to Wildemount (2020)",
  "conjurador": "Arcana Unleashed (2026)",
  "adivino": "Manual del Jugador (2024)",
  "encantador": "Arcana Unleashed (2026)",
  "evocador": "Manual del Jugador (2024)",
  "magia de graviturgia": "Explorer's Guide to Wildemount (2020)",
  "ilusionista": "Manual del Jugador (2024)",
  "nigromante": "Arcana Unleashed (2026)",
  "orden de escribas": "Tasha's Cauldron of Everything (2020)",
  "transmutador": "Arcana Unleashed (2026)",
  "magia de guerra": "Xanathar's Guide to Everything (2017)"
};

export const descripciones: Record<string, string> = {
  "abjuracion": "Especialistas en conjuros defensivos capaces de sellar portales, desintegrar hechizos enemigos e invocar escudos arcanos indestructibles.",
  "cantor-hoja": "Tradición élfica de hechiceros espadachines que bailan al son de un canto mágico para volverse intocables en el combate cuerpo a cuerpo.",
  "conjuracion": "Burlan la física usando agujeros de gusano y portales para teletransportarse y convocar espíritus masivos desde otros planos de existencia.",
  "adivinacion": "Videntes y oráculos que estudian los secretos del pasado y futuro, torciendo el destino mediante la imposición de visiones cósmicas en los dados.",
  "encantamiento": "Maestros del control mental, embelesan al enemigo con la palabra y pueden secuestrar su memoria e instintos más profundos.",
  "evocacion": "Artilleros pesados de la magia que moldean la energía elemental y destruyen ciudades con explosiones colosales sin dañar a sus aliados.",
  "ilusion": "Manipulan la percepción creando fantasías realistas, clones engañosos y engañando los sentidos al punto de volver la imaginación tangible.",
  "necromancia": "Amos del ciclo vital, reaniman cadáveres para formar ejércitos eternos, resisten el daño decrépito y extraen su vida al destruir al enemigo.",
  "transmutacion": "Alquimistas que experimentan con la materia y la metamorfosis de la carne, creando curas milagrosas o desatando poder alterando armas aliadas.",
  "magia-cronurgia": "Expertos en congelar el tiempo que encapsulan hechizos en objetos esféricos y deshacen un éxito enemigo en un fracaso.",
  "magia-graviturgia": "Manipuladores de densidad que imponen campos gravitacionales colosales, aplastando enemigos al suelo y aumentando el peso de armas aliadas.",
  "escribas": "Ratones de biblioteca que despiertan la conciencia de su libro de conjuros, el cual actúa de mensajero y escudo sacrificial mágico.",
  "magia-guerra": "Tácticos curtidos que defienden y absorben energía de la disipación para potenciar la fuerza atronadora de su próximo golpe."
};
