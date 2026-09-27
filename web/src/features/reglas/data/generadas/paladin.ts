/* Paladín: reglas, fuentes y descripciones generadas por scripts/gemini/revisar.ts a partir de la respuesta de Gemini
   (lote 15). Se pueden retocar a mano; lo que necesite más lógica va en reglas-revisadas.ts, que tiene prioridad. */
/* eslint-disable */
// @ts-nocheck
const elegidos = (c, id) => [].concat(c.pj?.elecciones?.[id] || []);
/* Conjuros siempre preparados: [nivel, nombres del catálogo] */
const siempre = tabla => c => `Siempre preparados, sin contar en tu límite: ${tabla.filter(([n]) => c.lvl >= n).flatMap(([, s]) => s).join(', ')}.`;

export const reglas = [
  {de:/^juramento de devocion$/, n:/^halo sagrado$/, usos: c => 1, reset: "largo"},
  {de:/^juramento de la gloria$/, n:/^defensa gloriosa$/, usos: c => Math.max(1, c.m.car), reset: "largo"},
  {de:/^juramento de la gloria$/, n:/^leyenda viviente$/, usos: c => 1, reset: "largo"},
  {de:/^juramento de los antiguos$/, n:/^centinela imperecedero$/, usos: c => 1, reset: "largo"},
  {de:/^juramento de los antiguos$/, n:/^campeon antiguo$/, usos: c => 1, reset: "largo"},
  {de:/^juramento de venganza$/, n:/^angel vengador$/, usos: c => 1, reset: "largo"},
  {de:/^juramento de conquista$/, n:/^conjuros de conquista$/, texto: siempre([[3,["Armadura de Agathys","Orden imperiosa"]],[5,["Inmovilizar persona","Arma espiritual"]],[9,["Imponer maldición","Miedo"]],[13,["Dominar bestia","Piel pétrea"]],[17,["Nube aniquiladora","Dominar persona"]]])},
  {de:/^juramento de conquista$/, n:/^conquistador invencible$/, usos: c => 1, reset: "largo"},
  {de:/^juramento de redencion$/, n:/^conjuros de redencion$/, texto: siempre([[3,["Santuario","Dormir"]],[5,["Calmar emociones","Inmovilizar persona"]],[9,["Contrahechizo","Patrón hipnótico"]],[13,["Esfera elástica de Otiluke","Piel pétrea"]],[17,["Inmovilizar monstruo","Muro de fuerza"]]])},
  {de:/^juramento de la corona$/, n:/^conjuros de la corona$/, texto: siempre([[3,["Orden imperiosa","Duelo forzado"]],[5,["Vínculo protector","Zona de la verdad"]],[9,["Aura de vitalidad","Espíritus guardianes"]],[13,["Destierro","Guardián de la Fe"]],[17,["Círculo de poder","Geas"]]])},
  {de:/^juramento de la corona$/, n:/^campeon exaltado$/, usos: c => 1, reset: "largo"},
  {de:/^juramento de los genios nobles$/, n:/^conjuros del genio$/, texto: siempre([[3,["Orbe cromático","Elementalismo","Castigo atronador"]],[5,["Imagen múltiple","Fuerza fantasmal"]],[9,["Volar","Forma Gaseosa"]],[13,["Conjurar elementales menores","Invocar elemental"]],[17,["Castigo desterrador","Contactar con otro plano"]]])},
  {de:/^juramento de los genios nobles$/, n:/^reprimenda elemental$/, usos: c => Math.max(1, c.m.car), reset: "largo"},
  {de:/^juramento de los genios nobles$/, n:/^vastago noble$/, usos: c => 1, reset: "largo"},
  {de:/^juramento de los vigilantes$/, n:/^conjuros de los vigilantes$/, texto: siempre([[3,["Alarma","Detectar magia"]],[5,["Rayo de luna","Ver lo invisible"]],[9,["Contrahechizo","Indetectable"]],[13,["Aura de pureza","Destierro"]],[17,["Inmovilizar monstruo","Escudriñar"]]])},
  {de:/^juramento de los vigilantes$/, n:/^baluarte mortal$/, usos: c => 1, reset: "largo"},
];

/* Para hacer a mano en reglas-revisadas.ts:
   - clase: Golpes Radiantes (daño): {"donde":"clase","rasgo":"Golpes Radiantes","tipo":"daño","daño":"1d8 Radiante"}
   - genios-nobles: Esplendor del Genio (ca): sin armadura, 10 + DES + CAR (con escudo); competencia en Acrobacias, Intimidación, Interpretación o Persuasión */

/* Libro de cada subclase, por su nombre normalizado */
export const fuentes: Record<string, string> = {
  "juramento de devocion": "Manual del Jugador (2024)",
  "juramento de la gloria": "Manual del Jugador (2024)",
  "juramento de los antiguos": "Manual del Jugador (2024)",
  "juramento de venganza": "Manual del Jugador (2024)",
  "juramento de conquista": "Xanathar's Guide to Everything (2017)",
  "juramento de redencion": "Xanathar's Guide to Everything (2017)",
  "juramento de la corona": "Sword Coast Adventurer's Guide (2015)",
  "juramento de los genios nobles": "Forgotten Realms: Heroes of Faerûn (2025)",
  "juramento de los vigilantes": "Tasha's Cauldron of Everything (2020)"
};

export const descripciones: Record<string, string> = {
  "devocion": "El caballero de armadura brillante clásico, enfocado en purificar maldad, brillar con luz divina y sanar a los aliados.",
  "gloria": "Héroes impulsados por el atletismo y el orgullo, dotan de velocidad y vigor asombroso a su equipo para aplastar a la oposición.",
  "antiguos": "Guardianes de la luz y el bosque, repelen el daño mágico y atrapan enemigos con la fuerza latente de la naturaleza.",
  "venganza": "Cazadores implacables que juran destruir a un enemigo por encima de todo, persiguiéndolos y apabullándolos con el poder de su venganza.",
  "conquista": "Caballeros que buscan aplastar al enemigo hasta quebrar su voluntad: siembran miedo y castigan a quien se les resiste.",
  "redencion": "Paladines que usan la violencia solo como último recurso: calman, protegen a otros con su propio cuerpo y devuelven el daño a los violentos.",
  "corona": "Guardianes de la ley y la civilización, leales a su señor: retan a los enemigos a pelear con ellos y levantan a sus aliados heridos.",
  "genios-nobles": "Paladines exóticos con poderes elementales; no visten armadura y canalizan fuego, hielo, roca o viento al golpear y castigar.",
  "vigilantes": "Centinelas contra las amenazas de otros planos: siempre alerta, protegen la mente de sus aliados y devuelven a su plano a los intrusos."
};
