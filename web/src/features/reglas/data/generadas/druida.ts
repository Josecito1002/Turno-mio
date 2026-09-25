/* Druida: reglas, fuentes y descripciones generadas por scripts/gemini/revisar.ts a partir de la respuesta de Gemini
   (lote 9). Se pueden retocar a mano; lo que necesite más lógica va en reglas-revisadas.ts, que tiene prioridad. */
/* eslint-disable */
// @ts-nocheck
const elegidos = (c, id) => [].concat(c.pj?.elecciones?.[id] || []);
/* Conjuros siempre preparados: [nivel, nombres del catálogo] */
const siempre = tabla => c => `Siempre preparados, sin contar en tu límite: ${tabla.filter(([n]) => c.lvl >= n).flatMap(([, s]) => s).join(', ')}.`;

export const reglas = [
  {de:/^druida$/, n:/^furia elemental$/,
    eleccion: [{id: "furia-elemental", titulo: "Furia Elemental", opciones: [
      {key: "golpe-primigenio", nombre: "Golpe Primigenio", desc: "Una vez por turno, 1d8 de frío, fuego, relámpago o trueno extra con armas o ataques de bestia (2d8 desde nivel 15).", nivel: 7},
      {key: "lanzamiento-potente", nombre: "Lanzamiento Potente", desc: "Sumas Sabiduría al daño de tus trucos de druida (desde nivel 15, +300 pies de alcance).", nivel: 7}]}],
    opciones: [
      {nombre: "Golpe Primigenio", t: "pasiva", elegida: ["furia-elemental", "golpe-primigenio"], si: c => elegidos(c, "furia-elemental").includes("golpe-primigenio"), texto: () => "Una vez por turno, 1d8 de frío, fuego, relámpago o trueno extra con armas o ataques de bestia (2d8 desde nivel 15)."},
      {nombre: "Lanzamiento Potente", t: "pasiva", elegida: ["furia-elemental", "lanzamiento-potente"], si: c => elegidos(c, "furia-elemental").includes("lanzamiento-potente"), texto: () => "Sumas Sabiduría al daño de tus trucos de druida (desde nivel 15, +300 pies de alcance)."}]},
  {de:/^circulo de la tierra$/, n:/^conjuros del circulo de la tierra$/,
    eleccion: [{id: "tipo-tierra", titulo: "Conjuros del Círculo de la Tierra", opciones: [
      {key: "arida", nombre: "Tierra árida", desc: "Contorno borroso, Manos ardientes, Descarga de fuego; Bola de fuego (5); Marchitar (7); Muro de piedra (9). Resistencia al fuego.", nivel: 3},
      {key: "polar", nombre: "Tierra polar", desc: "Niebla, Inmovilizar persona, Rayo de escarcha; Tormenta de aguanieve (5); Tormenta de hielo (7); Cono de frío (9). Resistencia al frío.", nivel: 3},
      {key: "templada", nombre: "Tierra templada", desc: "Paso brumoso, Agarre electrizante, Dormir; Relámpago (5); Libertad de movimiento (7); Paso arbóreo (9). Resistencia al relámpago.", nivel: 3},
      {key: "tropical", nombre: "Tierra tropical", desc: "Salpicadura ácida, Rayo nauseabundo, Telaraña; Nube apestosa (5); Polimorfar (7); Plaga de insectos (9). Resistencia al veneno.", nivel: 3}]}],
    opciones: [
      {nombre: "Tierra árida", t: "pasiva", elegida: ["tipo-tierra", "arida"], si: c => elegidos(c, "tipo-tierra").includes("arida"), texto: () => "Contorno borroso, Manos ardientes, Descarga de fuego; Bola de fuego (5); Marchitar (7); Muro de piedra (9). Resistencia al fuego."},
      {nombre: "Tierra polar", t: "pasiva", elegida: ["tipo-tierra", "polar"], si: c => elegidos(c, "tipo-tierra").includes("polar"), texto: () => "Niebla, Inmovilizar persona, Rayo de escarcha; Tormenta de aguanieve (5); Tormenta de hielo (7); Cono de frío (9). Resistencia al frío."},
      {nombre: "Tierra templada", t: "pasiva", elegida: ["tipo-tierra", "templada"], si: c => elegidos(c, "tipo-tierra").includes("templada"), texto: () => "Paso brumoso, Agarre electrizante, Dormir; Relámpago (5); Libertad de movimiento (7); Paso arbóreo (9). Resistencia al relámpago."},
      {nombre: "Tierra tropical", t: "pasiva", elegida: ["tipo-tierra", "tropical"], si: c => elegidos(c, "tipo-tierra").includes("tropical"), texto: () => "Salpicadura ácida, Rayo nauseabundo, Telaraña; Nube apestosa (5); Polimorfar (7); Plaga de insectos (9). Resistencia al veneno."}]},
  {de:/^circulo de la luna$/, n:/^conjuros del circulo de la luna$/, texto: siempre([[3,["Curar heridas","Rayo de luna","Voluta estelar"]],[5,["Conjurar animales"]],[7,["Fuente de Luz Lunar"]],[9,["Curar heridas en masa"]]])},
  {de:/^circulo de la luna$/, n:/^paso de luz lunar$/, usos: c => Math.max(1, c.m.sab), reset: "largo"},
  {de:/^circulo del mar$/, n:/^conjuros del circulo del mar$/, texto: siempre([[3,["Niebla","Ráfaga de viento","Rayo de escarcha","Hacer añicos","Onda atronadora"]],[5,["Relámpago","Respirar bajo el agua"]],[7,["Controlar agua","Tormenta de hielo"]],[9,["Conjurar elemental","Inmovilizar monstruo"]]])},
  {de:/^circulo de las estrellas$/, n:/^mapa estelar$/, texto: siempre([[3,["Guía","Rayo guía"]]]), usos: c => Math.max(1, c.m.sab), reset: "largo"},
  {de:/^circulo de las estrellas$/, n:/^augurio cosmico$/, usos: c => Math.max(1, c.m.sab), reset: "largo"},
  {de:/^circulo de los suenos$/, n:/^balsamo de la corte estival$/, usos: c => c.lvl, reset: "largo"},
  {de:/^circulo de los suenos$/, n:/^senderos ocultos$/, usos: c => Math.max(1, c.m.sab), reset: "largo"},
  {de:/^circulo de las esporas$/, n:/^conjuros del circulo de las esporas$/, texto: siempre([[3,["Toque helado","Sordera/Ceguera","Dulce descanso"]],[5,["Animar a los muertos","Forma Gaseosa"]],[7,["Marchitar","Confusión"]],[9,["Nube aniquiladora","Contagio"]]])},
  {de:/^circulo de las esporas$/, n:/^infestacion fungica$/, usos: c => Math.max(1, c.m.sab), reset: "largo"},
  {de:/^circulo del fuego salvaje$/, n:/^conjuros del circulo del fuego salvaje$/, texto: siempre([[3,["Manos ardientes","Curar heridas","Esfera flamígera","Rayo abrasador"]],[5,["Revivir","Crecimiento vegetal"]],[7,["Aura de vida","Escudo de fuego"]],[9,["Golpe Flamígero","Curar heridas en masa"]]])},
  {de:/^circulo del fuego salvaje$/, n:/^llamas cauterizantes$/, usos: 'pb', reset: "largo"},
];

/* Para hacer a mano en reglas-revisadas.ts:
   - circulo-tierra: Ayuda de la Tierra (otro): 2d6 necrótico (salvación CON contra CD, mitad si supera) y cura 2d6 a una criatura; 3d6 desde nivel 10 y 4d6 desde nivel 14.
   - circulo-luna: Formas del Círculo (otro): En Forma Salvaje: VD máximo = nivel / 3 (redondeo abajo); CA = max(CA de la bestia, 13 + SAB); PG temporales = 3 * nivel.
   - circulo-mar: Ira del Mar (otro): Daño de frío = max(1, SAB) d6 con salvación CON contra CD; emanación de 5 pies (10 pies desde nivel 6).
   - circulo-estrellas: Forma Estelar (otro): Arquero: ataqueConjuro, 1d8 + SAB radiante; Cáliz: cura 1d8 + SAB; ambos 2d8 desde nivel 10.
   - circulo-suenos: Bálsamo de la Corte Estival (dado): {"donde":"circulo-suenos","rasgo":"Bálsamo de la Corte Estival","tipo":"dado","dado":"1d6"}
   - circulo-pastor: Tótem Espiritual (otro): Oso: PG temporales = 5 + nivel a cada aliado en el aura; Unicornio: los conjuros de curación con espacio curan nivel PG extra a cada criatura en el aura.
   - circulo-esporas: Halo de Esporas (daño): {"donde":"circulo-esporas","rasgo":"Halo de Esporas","tipo":"daño","daño":"1d4; 1d6 desde nivel 6; 1d8 desde nivel 10; 1d10 desde nivel 14"}
   - circulo-esporas: Entidad Simbiótica (otro): PG temporales = 4 * nivel. */

/* Libro de cada subclase, por su nombre normalizado */
export const fuentes: Record<string, string> = {
  "circulo de la tierra": "Manual del Jugador (2024)",
  "circulo de la luna": "Manual del Jugador (2024)",
  "circulo del mar": "Manual del Jugador (2024)",
  "circulo de las estrellas": "Manual del Jugador (2024)",
  "circulo de los suenos": "Xanathar's Guide to Everything (2017)",
  "circulo del pastor": "Xanathar's Guide to Everything (2017)",
  "circulo de las esporas": "Tasha's Cauldron of Everything (2020)",
  "circulo del fuego salvaje": "Tasha's Cauldron of Everything (2020)"
};

export const descripciones: Record<string, string> = {
  "circulo-tierra": "Druidas ligados a un tipo de tierra que cambian sus conjuros según el paisaje y curan o hieren con flores y espinas.",
  "circulo-luna": "Cambiaformas que luchan en Forma Salvaje con bestias más duras y se mueven entre destellos de luz lunar.",
  "circulo-mar": "Druidas de la marea y la tormenta que se rodean de espuma helada para golpear y empujar a sus enemigos.",
  "circulo-estrellas": "Astrólogos que leen presagios en un mapa estelar y adoptan una forma luminosa de arquero, cáliz o dragón.",
  "circulo-suenos": "Druidas unidos a la Corte Estival feérica que curan, protegen el descanso y viajan por caminos ocultos.",
  "circulo-pastor": "Protectores de bestias y hadas que invocan tótems espirituales y refuerzan a las criaturas que llaman.",
  "circulo-esporas": "Druidas del ciclo de muerte y descomposición que se rodean de esporas necróticas y alzan a los caídos.",
  "circulo-fuego": "Druidas de la llama que destruye y renueva, acompañados por un espíritu de fuego que quema y cura."
};
