/* Guerrero: reglas, fuentes y descripciones generadas por scripts/gemini/revisar.ts a partir de la respuesta de Gemini
   (lote 11). Se pueden retocar a mano; lo que necesite más lógica va en reglas-revisadas.ts, que tiene prioridad. */
/* eslint-disable */
// @ts-nocheck
const elegidos = (c, id) => [].concat(c.pj?.elecciones?.[id] || []);
/* Conjuros siempre preparados: [nivel, nombres del catálogo] */
const siempre = tabla => c => `Siempre preparados, sin contar en tu límite: ${tabla.filter(([n]) => c.lvl >= n).flatMap(([, s]) => s).join(', ')}.`;

export const reglas = [
  {de:/^maestro de batalla$/, n:/^superioridad en combate$/,
    eleccion: [{id: "maniobra", titulo: "Superioridad en Combate", max: c => c.lvl >= 15 ? 9 : c.lvl >= 10 ? 7 : c.lvl >= 7 ? 5 : 3, opciones: [
      {key: "emboscada", nombre: "Emboscada", desc: "Suma el dado a tiradas de Sigilo o Iniciativa.", nivel: 3},
      {key: "cbo-posiciones", nombre: "Cambio de Posiciones", desc: "Te mueves e intercambias sitio con aliado; sumas dado a la CA de uno de los dos.", nivel: 3},
      {key: "golpe-comandante", nombre: "Golpe del Comandante", desc: "Sustituyes un ataque para que un aliado use su reacción y ataque, sumando el dado al daño.", nivel: 3},
      {key: "presencia-imp", nombre: "Presencia Imponente", desc: "Suma el dado a Intimidación, Persuasión o Interpretación.", nivel: 3},
      {key: "ataque-desarmar", nombre: "Ataque para Desarmar", desc: "Suma daño y fuerza a soltar el arma (salvación FUE).", nivel: 3},
      {key: "ataque-distraccion", nombre: "Ataque de Distracción", desc: "Suma daño y da ventaja al siguiente ataque de un aliado.", nivel: 3},
      {key: "juego-piernas", nombre: "Juego de Piernas Evasivo", desc: "Acción adicional para Destrabarse y sumar dado a tu CA este turno.", nivel: 3},
      {key: "finta", nombre: "Ataque de Finta", desc: "Acción adicional para tener ventaja y sumar daño en tu próximo ataque.", nivel: 3},
      {key: "ataque-provocar", nombre: "Ataque para Provocar", desc: "Suma daño e impone desventaja contra aliados (salvación SAB).", nivel: 3},
      {key: "ataque-arremetida", nombre: "Ataque de Arremetida", desc: "Acción adicional para Correr. Si te mueves, sumas daño al golpear.", nivel: 3},
      {key: "ataque-maniobra", nombre: "Ataque de Maniobra", desc: "Suma daño y permite a un aliado moverse gratis (sin oportunidad) como reacción.", nivel: 3},
      {key: "ataque-amenaza", nombre: "Ataque Amenazante", desc: "Suma daño e intenta Asustar al objetivo (salvación SAB).", nivel: 3},
      {key: "parada", nombre: "Parada", desc: "Reacción al recibir daño cuerpo a cuerpo para reducirlo en dado + FUE/DES.", nivel: 3},
      {key: "ataque-precision", nombre: "Ataque de Precisión", desc: "Suma el dado a una tirada de ataque que haya fallado.", nivel: 3},
      {key: "ataque-empuje", nombre: "Ataque de Empuje", desc: "Suma daño y empuja 15 pies (salvación FUE).", nivel: 3},
      {key: "reagrupar", nombre: "Reagrupar", desc: "Acción adicional para dar a un aliado PG Temporales (dado + mitad de tu nivel).", nivel: 3},
      {key: "respuesta", nombre: "Respuesta", desc: "Reacción para atacar cuando te fallan en cuerpo a cuerpo; sumas el dado al daño.", nivel: 3},
      {key: "ataque-barrido", nombre: "Ataque de Barrido", desc: "Al golpear, aplicas el daño del dado a un segundo enemigo adyacente.", nivel: 3},
      {key: "eval-tactica", nombre: "Evaluación Táctica", desc: "Suma el dado a Historia, Investigación o Perspicacia.", nivel: 3},
      {key: "ataque-derribo", nombre: "Ataque de Derribo", desc: "Suma daño y tira al objetivo al suelo (salvación FUE).", nivel: 3}]}],
    opciones: [
      {nombre: "Emboscada", t: "pasiva", elegida: ["maniobra", "emboscada"], si: c => elegidos(c, "maniobra").includes("emboscada"), texto: () => "Suma el dado a tiradas de Sigilo o Iniciativa."},
      {nombre: "Cambio de Posiciones", t: "pasiva", elegida: ["maniobra", "cbo-posiciones"], si: c => elegidos(c, "maniobra").includes("cbo-posiciones"), texto: () => "Te mueves e intercambias sitio con aliado; sumas dado a la CA de uno de los dos."},
      {nombre: "Golpe del Comandante", t: "pasiva", elegida: ["maniobra", "golpe-comandante"], si: c => elegidos(c, "maniobra").includes("golpe-comandante"), texto: () => "Sustituyes un ataque para que un aliado use su reacción y ataque, sumando el dado al daño."},
      {nombre: "Presencia Imponente", t: "pasiva", elegida: ["maniobra", "presencia-imp"], si: c => elegidos(c, "maniobra").includes("presencia-imp"), texto: () => "Suma el dado a Intimidación, Persuasión o Interpretación."},
      {nombre: "Ataque para Desarmar", t: "pasiva", elegida: ["maniobra", "ataque-desarmar"], si: c => elegidos(c, "maniobra").includes("ataque-desarmar"), texto: () => "Suma daño y fuerza a soltar el arma (salvación FUE)."},
      {nombre: "Ataque de Distracción", t: "pasiva", elegida: ["maniobra", "ataque-distraccion"], si: c => elegidos(c, "maniobra").includes("ataque-distraccion"), texto: () => "Suma daño y da ventaja al siguiente ataque de un aliado."},
      {nombre: "Juego de Piernas Evasivo", t: "pasiva", elegida: ["maniobra", "juego-piernas"], si: c => elegidos(c, "maniobra").includes("juego-piernas"), texto: () => "Acción adicional para Destrabarse y sumar dado a tu CA este turno."},
      {nombre: "Ataque de Finta", t: "pasiva", elegida: ["maniobra", "finta"], si: c => elegidos(c, "maniobra").includes("finta"), texto: () => "Acción adicional para tener ventaja y sumar daño en tu próximo ataque."},
      {nombre: "Ataque para Provocar", t: "pasiva", elegida: ["maniobra", "ataque-provocar"], si: c => elegidos(c, "maniobra").includes("ataque-provocar"), texto: () => "Suma daño e impone desventaja contra aliados (salvación SAB)."},
      {nombre: "Ataque de Arremetida", t: "pasiva", elegida: ["maniobra", "ataque-arremetida"], si: c => elegidos(c, "maniobra").includes("ataque-arremetida"), texto: () => "Acción adicional para Correr. Si te mueves, sumas daño al golpear."},
      {nombre: "Ataque de Maniobra", t: "pasiva", elegida: ["maniobra", "ataque-maniobra"], si: c => elegidos(c, "maniobra").includes("ataque-maniobra"), texto: () => "Suma daño y permite a un aliado moverse gratis (sin oportunidad) como reacción."},
      {nombre: "Ataque Amenazante", t: "pasiva", elegida: ["maniobra", "ataque-amenaza"], si: c => elegidos(c, "maniobra").includes("ataque-amenaza"), texto: () => "Suma daño e intenta Asustar al objetivo (salvación SAB)."},
      {nombre: "Parada", t: "pasiva", elegida: ["maniobra", "parada"], si: c => elegidos(c, "maniobra").includes("parada"), texto: () => "Reacción al recibir daño cuerpo a cuerpo para reducirlo en dado + FUE/DES."},
      {nombre: "Ataque de Precisión", t: "pasiva", elegida: ["maniobra", "ataque-precision"], si: c => elegidos(c, "maniobra").includes("ataque-precision"), texto: () => "Suma el dado a una tirada de ataque que haya fallado."},
      {nombre: "Ataque de Empuje", t: "pasiva", elegida: ["maniobra", "ataque-empuje"], si: c => elegidos(c, "maniobra").includes("ataque-empuje"), texto: () => "Suma daño y empuja 15 pies (salvación FUE)."},
      {nombre: "Reagrupar", t: "pasiva", elegida: ["maniobra", "reagrupar"], si: c => elegidos(c, "maniobra").includes("reagrupar"), texto: () => "Acción adicional para dar a un aliado PG Temporales (dado + mitad de tu nivel)."},
      {nombre: "Respuesta", t: "pasiva", elegida: ["maniobra", "respuesta"], si: c => elegidos(c, "maniobra").includes("respuesta"), texto: () => "Reacción para atacar cuando te fallan en cuerpo a cuerpo; sumas el dado al daño."},
      {nombre: "Ataque de Barrido", t: "pasiva", elegida: ["maniobra", "ataque-barrido"], si: c => elegidos(c, "maniobra").includes("ataque-barrido"), texto: () => "Al golpear, aplicas el daño del dado a un segundo enemigo adyacente."},
      {nombre: "Evaluación Táctica", t: "pasiva", elegida: ["maniobra", "eval-tactica"], si: c => elegidos(c, "maniobra").includes("eval-tactica"), texto: () => "Suma el dado a Historia, Investigación o Perspicacia."},
      {nombre: "Ataque de Derribo", t: "pasiva", elegida: ["maniobra", "ataque-derribo"], si: c => elegidos(c, "maniobra").includes("ataque-derribo"), texto: () => "Suma daño y tira al objetivo al suelo (salvación FUE)."}]},
  {de:/^arquero arcano$/, n:/^disparo arcano$/, usos: c => Math.max(1, c.m.int), reset: "corto"},
  {de:/^arquero arcano$/, n:/^municion magica$/, usos: c => 1, reset: "corto"},
  {de:/^abanderado$/, n:/^recuperacion grupal$/, usos: c => 1, reset: "corto"},
  {de:/^maestro de batalla$/, n:/^conoce a tu enemigo$/, usos: c => 1, reset: "largo"},
  {de:/^caballero$/, n:/^marca inquebrantable$/, usos: c => Math.max(1, c.m.fue), reset: "largo"},
  {de:/^caballero$/, n:/^maniobra de proteccion$/, usos: c => Math.max(1, c.m.con), reset: "largo"},
  {de:/^caballero del eco$/, n:/^desatar encarnacion$/, usos: c => Math.max(1, c.m.con), reset: "largo"},
  {de:/^caballero del eco$/, n:/^martir sombrio$/, usos: c => 1, reset: "corto"},
  {de:/^caballero del eco$/, n:/^reclamar potencial$/, usos: c => Math.max(1, c.m.con), reset: "largo"},
  {de:/^samurai$/, n:/^fuerza antes que la muerte$/, usos: c => 1, reset: "largo"},
  {de:/^caballero runico$/, n:/^escudo runico$/, usos: 'pb', reset: "largo"},
];

/* Para hacer a mano en reglas-revisadas.ts:
   - clase: Indomable (otro): Suma tu nivel de clase a la tirada
   - arquero-arcano: Disparo Arcano (dado): {"donde":"arquero-arcano","rasgo":"Disparo Arcano","tipo":"dado","dado":"1d6; 1d8 desde nivel 10; 1d10 desde nivel 15; 1d12 desde nivel 18"}
   - caballero-dragon-purpura: Recuperación Grupal (pg): 1d4 + nivel
   - maestro-batalla: Superioridad en Combate (dado): {"donde":"maestro-batalla","rasgo":"Superioridad en Combate","tipo":"dado","dado":"1d8; 1d10 desde nivel 10; 1d12 desde nivel 18"}
   - campeon: Superviviente (pg): 5 + CON
   - guerrero-psionico: Poder Psiónico (dado): {"donde":"guerrero-psionico","rasgo":"Poder Psiónico","tipo":"dado","dado":"1d6; 1d8 desde nivel 5; 1d10 desde nivel 11; 1d12 desde nivel 17"}
   - guerrero-psionico: Campo Protector (otro): Reduce el daño en dado + INT
   - guerrero-psionico: Golpe Psiónico (daño): {"donde":"guerrero-psionico","rasgo":"Golpe Psiónico","tipo":"daño","daño":"dado + INT Fuerza"} */

/* Libro de cada subclase, por su nombre normalizado */
export const fuentes: Record<string, string> = {
  "arquero arcano": "Arcana Unleashed (2026)",
  "abanderado": "Forgotten Realms: Heroes of Faerûn (2025)",
  "maestro de batalla": "Manual del Jugador (2024)",
  "campeon": "Manual del Jugador (2024)",
  "caballero arcano": "Manual del Jugador (2024)",
  "guerrero psionico": "Manual del Jugador (2024)",
  "caballero": "Xanathar's Guide to Everything (2017)",
  "caballero del eco": "Explorer's Guide to Wildemount (2020)",
  "samurai": "Xanathar's Guide to Everything (2017)",
  "caballero runico": "Tasha's Cauldron of Everything (2020)"
};

export const descripciones: Record<string, string> = {
  "arquero-arcano": "Tiradores de élite que imbuyen sus flechas con efectos mágicos, usando secretos élficos para alterar el campo de batalla a distancia.",
  "caballero-dragon-purpura": "Líderes carismáticos y caballeros nobles que inspiran a sus aliados a luchar más duro y resistir los golpes mortales.",
  "maestro-batalla": "Estudiantes del arte de la guerra que usan maniobras precisas y dados de superioridad para desarmar, empujar o burlar al enemigo.",
  "campeon": "Guerreros centrados en la excelencia física: críticos más frecuentes, atletismo notable y una resistencia que los mantiene en pie.",
  "caballero-arcano": "Combatientes que estudian la magia de mago para completar sus armas: escudos arcanos, explosiones y teletransporte en plena batalla.",
  "guerrero-psionico": "Guerreros que han despertado el poder de su mente, usando telequinesis para volar, lanzar enemigos y proyectar barreras de fuerza.",
  "caballero": "Guardianes montados que marcan a sus enemigos y protegen a quien tienen cerca, sin dejar que nadie cruce su línea.",
  "caballero-eco": "Guerreros que invocan un eco de sí mismos desde otra línea temporal para atacar y moverse desde dos lugares a la vez.",
  "samurai": "Combatientes de espíritu indomable que se lanzan al ataque con una determinación que ni la muerte frena.",
  "caballero-runico": "Guerreros que tallan runas de gigante en su equipo para crecer en batalla y desatar la magia de fuego, escarcha, piedra y tormenta."
};
