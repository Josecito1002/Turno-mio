/* Explorador: reglas, fuentes y descripciones generadas por scripts/gemini/revisar.ts a partir de la respuesta de Gemini
   (lote 10). Se pueden retocar a mano; lo que necesite más lógica va en reglas-revisadas.ts, que tiene prioridad. */
/* eslint-disable */
// @ts-nocheck
const elegidos = (c, id) => [].concat(c.pj?.elecciones?.[id] || []);
/* Conjuros siempre preparados: [nivel, nombres del catálogo] */
const siempre = tabla => c => `Siempre preparados, sin contar en tu límite: ${tabla.filter(([n]) => c.lvl >= n).flatMap(([, s]) => s).join(', ')}.`;

export const reglas = [
  {de:/^explorador$/, n:/^incansable$/, usos: c => Math.max(1, c.m.sab), reset: "largo"},
  {de:/^explorador$/, n:/^velo de la naturaleza$/, usos: c => Math.max(1, c.m.sab), reset: "largo"},
  {de:/^maestro de bestias$/, n:/^companero primigenio$/,
    eleccion: [{id: "tipo-bestia", titulo: "Compañero Primigenio", opciones: [
      {key: "bestia-tierra", nombre: "Bestia de Tierra", desc: "Espíritu con forma terrestre.", nivel: 3},
      {key: "bestia-mar", nombre: "Bestia de Mar", desc: "Espíritu con forma acuática.", nivel: 3},
      {key: "bestia-cielo", nombre: "Bestia de Cielo", desc: "Espíritu con forma voladora.", nivel: 3}]}],
    opciones: [
      {nombre: "Bestia de Tierra", t: "pasiva", elegida: ["tipo-bestia", "bestia-tierra"], si: c => elegidos(c, "tipo-bestia").includes("bestia-tierra"), texto: () => "Espíritu con forma terrestre."},
      {nombre: "Bestia de Mar", t: "pasiva", elegida: ["tipo-bestia", "bestia-mar"], si: c => elegidos(c, "tipo-bestia").includes("bestia-mar"), texto: () => "Espíritu con forma acuática."},
      {nombre: "Bestia de Cielo", t: "pasiva", elegida: ["tipo-bestia", "bestia-cielo"], si: c => elegidos(c, "tipo-bestia").includes("bestia-cielo"), texto: () => "Espíritu con forma voladora."}]},
  {de:/^caminante de las hadas$/, n:/^conjuros del caminante de las hadas$/, texto: siempre([[3,["Hechizar persona"]],[5,["Paso brumoso"]],[9,["Invocar feérico"]],[13,["Puerta dimensional"]],[17,["Engañar"]]])},
  {de:/^caminante de las hadas$/, n:/^glamour de otro mundo$/,
    eleccion: [{id: "habilidad-hadas", titulo: "Glamour de Otro Mundo", opciones: [
      {key: "hadas-engano", nombre: "Engaño", desc: "Competencia en Engaño.", nivel: 3},
      {key: "hadas-interpretacion", nombre: "Interpretación", desc: "Competencia en Interpretación.", nivel: 3},
      {key: "hadas-persuasion", nombre: "Persuasión", desc: "Competencia en Persuasión.", nivel: 3}]}],
    opciones: [
      {nombre: "Engaño", t: "pasiva", elegida: ["habilidad-hadas", "hadas-engano"], si: c => elegidos(c, "habilidad-hadas").includes("hadas-engano"), texto: () => "Competencia en Engaño."},
      {nombre: "Interpretación", t: "pasiva", elegida: ["habilidad-hadas", "hadas-interpretacion"], si: c => elegidos(c, "habilidad-hadas").includes("hadas-interpretacion"), texto: () => "Competencia en Interpretación."},
      {nombre: "Persuasión", t: "pasiva", elegida: ["habilidad-hadas", "hadas-persuasion"], si: c => elegidos(c, "habilidad-hadas").includes("hadas-persuasion"), texto: () => "Competencia en Persuasión."}]},
  {de:/^caminante de las hadas$/, n:/^caminante nebuloso$/, usos: c => Math.max(1, c.m.sab), reset: "largo"},
  {de:/^acechador de las sombras$/, n:/^conjuros del acechador de las sombras$/, texto: siempre([[3,["Disfrazarse"]],[5,["Truco de la cuerda"]],[9,["Miedo"]],[13,["Invisibilidad mejorada"]],[17,["Apariencia"]]])},
  {de:/^acechador de las sombras$/, n:/^emboscador temible$/, usos: c => Math.max(1, c.m.sab), reset: "largo"},
  {de:/^guardian hueco$/, n:/^conjuros del guardian hueco$/, texto: siempre([[3,["Castigo furioso"]],[5,["Alterar el propio aspecto"]],[9,["Corcel fantasma"]],[13,["Dominar bestia"]],[17,["Golpe de Viento Acerado"]]])},
  {de:/^cazador$/, n:/^presa del cazador$/,
    eleccion: [{id: "presa-cazador", titulo: "Presa del Cazador", opciones: [
      {key: "asesino-colosos", nombre: "Asesino de Colosos", desc: "+1d8 daño si el objetivo ya está herido (1/turno).", nivel: 3},
      {key: "rompehordas", nombre: "Rompehordas", desc: "Puedes hacer un ataque extra a otro enemigo cercano a tu objetivo original.", nivel: 3}]}],
    opciones: [
      {nombre: "Asesino de Colosos", t: "pasiva", elegida: ["presa-cazador", "asesino-colosos"], si: c => elegidos(c, "presa-cazador").includes("asesino-colosos"), texto: () => "+1d8 daño si el objetivo ya está herido (1/turno)."},
      {nombre: "Rompehordas", t: "pasiva", elegida: ["presa-cazador", "rompehordas"], si: c => elegidos(c, "presa-cazador").includes("rompehordas"), texto: () => "Puedes hacer un ataque extra a otro enemigo cercano a tu objetivo original."}]},
  {de:/^cazador$/, n:/^tacticas defensivas$/,
    eleccion: [{id: "defensa-cazador", titulo: "Tácticas Defensivas", opciones: [
      {key: "escapar-horda", nombre: "Escapar de la Horda", desc: "Ataques de oportunidad en tu contra tienen Desventaja.", nivel: 7},
      {key: "defensa-multiataque", nombre: "Defensa contra Multiataques", desc: "Cuando te golpean, el enemigo tiene Desventaja en todos sus ataques restantes contra ti este turno.", nivel: 7}]}],
    opciones: [
      {nombre: "Escapar de la Horda", t: "pasiva", elegida: ["defensa-cazador", "escapar-horda"], si: c => elegidos(c, "defensa-cazador").includes("escapar-horda"), texto: () => "Ataques de oportunidad en tu contra tienen Desventaja."},
      {nombre: "Defensa contra Multiataques", t: "pasiva", elegida: ["defensa-cazador", "defensa-multiataque"], si: c => elegidos(c, "defensa-cazador").includes("defensa-multiataque"), texto: () => "Cuando te golpean, el enemigo tiene Desventaja en todos sus ataques restantes contra ti este turno."}]},
  {de:/^caminante del invierno$/, n:/^conjuros del caminante del invierno$/, texto: siempre([[3,["Cuchillo de hielo"]],[5,["Inmovilizar persona"]],[9,["Levantar maldición"]],[13,["Tormenta de hielo"]],[17,["Cono de frío"]]])},
  {de:/^caminante del invierno$/, n:/^alma fortalecedora$/, usos: c => 1, reset: "largo"},
  {de:/^caminante del invierno$/, n:/^retribucion helada$/, usos: c => Math.max(1, c.m.sab), reset: "largo"},
];

/* Para hacer a mano en reglas-revisadas.ts:
   - clase: Incansable (pg): 1d8 + SAB
   - clase: Cazador de Enemigos (dado): {"donde":"clase","rasgo":"Cazador de Enemigos","tipo":"dado","dado":"1d10"}
   - hadas: Golpes Pavorosos (daño): {"donde":"hadas","rasgo":"Golpes Pavorosos","tipo":"daño","daño":"1d4; 1d6 desde nivel 11"}
   - sombras: Emboscador Temible (daño): {"donde":"sombras","rasgo":"Emboscador Temible","tipo":"daño","daño":"2d6; 2d8 desde nivel 11"}
   - sombras: Vista Umbría (vision): Visión en la oscuridad 60 pies (o suma 60 pies a la actual)
   - guardian-hueco: Poder Hambriento (daño): {"donde":"guardian-hueco","rasgo":"Poder Hambriento","tipo":"daño","daño":"1d10 + SAB"}
   - caminante-invierno: Explorador Gélido (daño): {"donde":"caminante-invierno","rasgo":"Explorador Gélido","tipo":"daño","daño":"1d4; 1d6 desde nivel 11"}
   - caminante-invierno: Escarcha del Cazador (pg): 1d10 + nivel */

/* Libro de cada subclase, por su nombre normalizado */
export const fuentes: Record<string, string> = {
  "maestro de bestias": "Manual del Jugador (2024)",
  "caminante de las hadas": "Manual del Jugador (2024)",
  "acechador de las sombras": "Manual del Jugador (2024)",
  "guardian hueco": "Ravenloft: The Horrors Within (2026)",
  "cazador": "Manual del Jugador (2024)",
  "caminante del invierno": "Forgotten Realms: Heroes of Faerûn (2025)"
};

export const descripciones: Record<string, string> = {
  "bestias": "Forjan un poderoso vínculo primordial con el espíritu de una bestia mágica que lucha codo a codo junto a ellos.",
  "hadas": "Canalizan la magia del mundo de las hadas, usando engaños, ilusiones, y ataques psíquicos para atemorizar a sus enemigos.",
  "sombras": "Maestros de la oscuridad que operan de manera invisible en las sombras, emboscando brutalmente a los enemigos en el primer turno.",
  "guardian-hueco": "Asumen transformaciones aterradoras potenciadas por horrores antiguos, devorando y aterrorizando a sus oponentes.",
  "cazador": "Especialistas en cazar presas difíciles: eligen tácticas para rematar a enemigos heridos o golpear a varios a la vez, y aprenden a defenderse de grupos.",
  "caminante-invierno": "Sobrevivientes glaciales que utilizan hielo mágico y frío penetrante para congelar y ralentizar a sus presas."
};
