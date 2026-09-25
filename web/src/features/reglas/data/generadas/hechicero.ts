/* Hechicero: reglas, fuentes y descripciones generadas por scripts/gemini/revisar.ts a partir de la respuesta de Gemini
   (lote 12). Se pueden retocar a mano; lo que necesite más lógica va en reglas-revisadas.ts, que tiene prioridad. */
/* eslint-disable */
// @ts-nocheck
const elegidos = (c, id) => [].concat(c.pj?.elecciones?.[id] || []);
/* Conjuros siempre preparados: [nivel, nombres del catálogo] */
const siempre = tabla => c => `Siempre preparados, sin contar en tu límite: ${tabla.filter(([n]) => c.lvl >= n).flatMap(([, s]) => s).join(', ')}.`;

export const reglas = [
  {de:/^hechicero$/, n:/^metamagia$/,
    eleccion: [{id: "metamagia-opciones", titulo: "Metamagia", max: c => c.lvl >= 17 ? 6 : c.lvl >= 10 ? 4 : 2, opciones: [
      {key: "met-cuidadoso", nombre: "Conjuro Cuidadoso", desc: "Gasta 1 PH para que aliados (hasta mod CAR) pasen automáticamente la salvación y reciban 0 daño.", nivel: 2},
      {key: "met-distante", nombre: "Conjuro Distante", desc: "Gasta 1 PH para duplicar el alcance, o volver de 30 pies un conjuro de toque.", nivel: 2},
      {key: "met-potenciado", nombre: "Conjuro Potenciado", desc: "Gasta 1 PH para repetir dados de daño (hasta mod CAR). Puede combinarse.", nivel: 2},
      {key: "met-extendido", nombre: "Conjuro Extendido", desc: "Gasta 1 PH para duplicar la duración (máximo 24h) y darte ventaja en mantener concentración.", nivel: 2},
      {key: "met-intensificado", nombre: "Conjuro Intensificado", desc: "Gasta 2 PH para dar Desventaja en la salvación a un objetivo.", nivel: 2},
      {key: "met-acelerado", nombre: "Conjuro Acelerado", desc: "Gasta 2 PH para que un conjuro de 1 Acción cueste 1 Acción Adicional.", nivel: 2},
      {key: "met-buscador", nombre: "Conjuro Buscador", desc: "Gasta 1 PH para repetir una tirada de ataque fallada. Puede combinarse.", nivel: 2},
      {key: "met-sutil", nombre: "Conjuro Sutil", desc: "Gasta 1 PH para lanzar sin componentes verbales/somáticos ni materiales sin coste.", nivel: 2},
      {key: "met-transmutado", nombre: "Conjuro Transmutado", desc: "Gasta 1 PH para cambiar un tipo de daño elemental al lanzarlo.", nivel: 2},
      {key: "met-duplicado", nombre: "Conjuro Duplicado", desc: "Gasta 1 PH para que un conjuro capaz de escalarse afecte a un objetivo extra como si usaras un espacio de +1 nivel.", nivel: 2}]}],
    opciones: [
      {nombre: "Conjuro Cuidadoso", t: "pasiva", elegida: ["metamagia-opciones", "met-cuidadoso"], si: c => elegidos(c, "metamagia-opciones").includes("met-cuidadoso"), texto: () => "Gasta 1 PH para que aliados (hasta mod CAR) pasen automáticamente la salvación y reciban 0 daño."},
      {nombre: "Conjuro Distante", t: "pasiva", elegida: ["metamagia-opciones", "met-distante"], si: c => elegidos(c, "metamagia-opciones").includes("met-distante"), texto: () => "Gasta 1 PH para duplicar el alcance, o volver de 30 pies un conjuro de toque."},
      {nombre: "Conjuro Potenciado", t: "pasiva", elegida: ["metamagia-opciones", "met-potenciado"], si: c => elegidos(c, "metamagia-opciones").includes("met-potenciado"), texto: () => "Gasta 1 PH para repetir dados de daño (hasta mod CAR). Puede combinarse."},
      {nombre: "Conjuro Extendido", t: "pasiva", elegida: ["metamagia-opciones", "met-extendido"], si: c => elegidos(c, "metamagia-opciones").includes("met-extendido"), texto: () => "Gasta 1 PH para duplicar la duración (máximo 24h) y darte ventaja en mantener concentración."},
      {nombre: "Conjuro Intensificado", t: "pasiva", elegida: ["metamagia-opciones", "met-intensificado"], si: c => elegidos(c, "metamagia-opciones").includes("met-intensificado"), texto: () => "Gasta 2 PH para dar Desventaja en la salvación a un objetivo."},
      {nombre: "Conjuro Acelerado", t: "pasiva", elegida: ["metamagia-opciones", "met-acelerado"], si: c => elegidos(c, "metamagia-opciones").includes("met-acelerado"), texto: () => "Gasta 2 PH para que un conjuro de 1 Acción cueste 1 Acción Adicional."},
      {nombre: "Conjuro Buscador", t: "pasiva", elegida: ["metamagia-opciones", "met-buscador"], si: c => elegidos(c, "metamagia-opciones").includes("met-buscador"), texto: () => "Gasta 1 PH para repetir una tirada de ataque fallada. Puede combinarse."},
      {nombre: "Conjuro Sutil", t: "pasiva", elegida: ["metamagia-opciones", "met-sutil"], si: c => elegidos(c, "metamagia-opciones").includes("met-sutil"), texto: () => "Gasta 1 PH para lanzar sin componentes verbales/somáticos ni materiales sin coste."},
      {nombre: "Conjuro Transmutado", t: "pasiva", elegida: ["metamagia-opciones", "met-transmutado"], si: c => elegidos(c, "metamagia-opciones").includes("met-transmutado"), texto: () => "Gasta 1 PH para cambiar un tipo de daño elemental al lanzarlo."},
      {nombre: "Conjuro Duplicado", t: "pasiva", elegida: ["metamagia-opciones", "met-duplicado"], si: c => elegidos(c, "metamagia-opciones").includes("met-duplicado"), texto: () => "Gasta 1 PH para que un conjuro capaz de escalarse afecte a un objetivo extra como si usaras un espacio de +1 nivel."}]},
  {de:/^hechiceria aberrante$/, n:/^conjuros psionicos$/, texto: siempre([[3,["Brazos de Hadar","Calmar emociones","Detectar pensamientos","Susurros discordantes","Fragmento Mental"]],[5,["Hambre de Hadar","Recado"]],[7,["Tentáculos negros de Evard","Invocar aberración"]],[9,["Enlace telepático de Rary","Telequinesis"]]])},
  {de:/^hechiceria aberrante$/, n:/^implosion deformadora$/, usos: c => 1, reset: "largo"},
  {de:/^hechiceria del reloj$/, n:/^conjuros del reloj$/, texto: siempre([[3,["Auxilio","Alarma","Restablecimiento menor","Protección contra el bien y el mal"]],[5,["Disipar magia","Protección contra energía"]],[7,["Libertad de movimiento","Invocar autómata"]],[9,["Restablecimiento mayor","Muro de fuerza"]]])},
  {de:/^hechiceria del reloj$/, n:/^restaurar el equilibrio$/, usos: c => Math.max(1, c.m.car), reset: "largo"},
  {de:/^alma divina$/, n:/^recuperacion sobrenatural$/, usos: c => 1, reset: "largo"},
  {de:/^hechiceria lunar$/, n:/^conjuros lunares$/, texto: siempre([[3,["Llama sagrada","Escudo","Rayo nauseabundo","Rociada de color","Restablecimiento menor","Sordera/Ceguera","Alterar el propio aspecto"]],[5,["Disipar magia","Toque vampírico","Corcel fantasma"]],[7,["Guarda contra la Muerte","Confusión","Terreno alucinatorio"]],[9,["Enlace telepático de Rary","Inmovilizar monstruo","Engañar"]]])},
  {de:/^hechiceria lunar$/, n:/^encarnacion lunar$/, usos: c => 1, reset: "largo"},
  {de:/^alma divina$/, n:/^favorecido por los dioses$/, usos: c => 1, reset: "corto"},
  {de:/^hechiceria lunar$/, n:/^favores lunares$/, usos: 'pb', reset: "largo"},
  {de:/^hechiceria de las sombras$/, n:/^conjuros de las sombras$/, texto: siempre([[3,["Perdición","Oscuridad","Infligir heridas","Pasar sin rastro"]],[5,["Hambre de Hadar","Indetectable"]],[7,["Invisibilidad mejorada","Asesino fantasmal"]],[9,["Contagio","Creación"]]])},
  {de:/^fuego de conjuro$/, n:/^conjuros de fuego de conjuro$/, texto: siempre([[3,["Curar heridas","Rayo guía","Restablecimiento menor","Rayo abrasador"]],[5,["Aura de vitalidad","Disipar magia"]],[6,["Contrahechizo"]],[7,["Escudo de fuego","Muro de fuego"]],[9,["Restablecimiento mayor","Golpe Flamígero"]]])},
  {de:/^fuego de conjuro$/, n:/^corona de fuego de conjuro$/, usos: c => 1, reset: "largo"},
  {de:/^hechiceria de la tormenta$/, n:/^alma del viento$/, usos: c => 1, reset: "corto"},
];

/* Libro de cada subclase, por su nombre normalizado */
export const fuentes: Record<string, string> = {
  "hechiceria aberrante": "Manual del Jugador (2024)",
  "hechiceria del reloj": "Manual del Jugador (2024)",
  "alma divina": "Xanathar's Guide to Everything (2017)",
  "hechiceria draconica": "Manual del Jugador (2024)",
  "hechiceria lunar": "Dragonlance: Shadow of the Dragon Queen (2022)",
  "hechiceria de las sombras": "Ravenloft: The Horrors Within (2026)",
  "fuego de conjuro": "Forgotten Realms: Heroes of Faerûn (2025)",
  "hechiceria de la tormenta": "Xanathar's Guide to Everything (2017)",
  "magia salvaje": "Manual del Jugador (2024)"
};

export const descripciones: Record<string, string> = {
  "aberrante": "Mágicos que despertaron poderes telepáticos y psiónicos a través de entidades alienígenas o del Lejano Reino, controlando mentes y alterando cuerpos.",
  "reloj": "Conductos de la energía cósmica de Mechanus, protegen a sus aliados mediante escudos matemáticos y aseguran el equilibrio anulando la suerte del caos.",
  "alma-divina": "Vasijas mortales de poder divino. Poseen magia curativa e invocar alas celestiales.",
  "draconico": "Herederos del poder latente de los dragones, resisten daños elementales y escupen magia de destrucción y terror.",
  "lunar": "Hechiceros versátiles cuyas aptitudes mutan de acuerdo a las fases lunares: Luz y purificación con Llena, Sombras y veneno con Nueva.",
  "hechiceria-sombras": "Sobrevivientes imbuidos con la energía nigromántica del Páramo Sombrío, controlando oscuridad, bestias de sombra y evitando la muerte.",
  "fuego-conjuro": "Canalizadores del fuego primordial, curan o queman a quienes los rodean y absorben magia ajena contrarrestándola.",
  "tormenta": "Conectados a la esencia del clima, usan magia elemental ruidosa para golpear a varios y volar desatando la tormenta.",
  "salvaje": "Conductos inestables de magia cruda, propensos a invocar efectos mágicos azarosos, absurdos o devastadores que desafían toda regla."
};
