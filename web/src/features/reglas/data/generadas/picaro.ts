/* Pícaro: reglas, fuentes y descripciones generadas por scripts/gemini/revisar.ts a partir de la respuesta de Gemini
   (lote 16). Se pueden retocar a mano; lo que necesite más lógica va en reglas-revisadas.ts, que tiene prioridad. */
/* eslint-disable */
// @ts-nocheck
const elegidos = (c, id) => [].concat(c.pj?.elecciones?.[id] || []);
/* Conjuros siempre preparados: [nivel, nombres del catálogo] */
const siempre = tabla => c => `Siempre preparados, sin contar en tu límite: ${tabla.filter(([n]) => c.lvl >= n).flatMap(([, s]) => s).join(', ')}.`;

export const reglas = [
  {de:/^picaro$/, n:/^golpe de suerte$/, usos: c => 1, reset: "corto"},
  {de:/^embaucador arcano$/, n:/^ladron de conjuros$/, usos: c => 1, reset: "largo"},
  {de:/^fantasma$/, n:/^lamentos de la tumba$/, usos: c => Math.max(1, c.m.des), reset: "largo"},
  {de:/^fantasma$/, n:/^voz de la muerte$/, usos: c => 1, reset: "corto"},
  {de:/^fantasma$/, n:/^caminar fantasma$/, usos: c => 1, reset: "largo"},
  {de:/^vastago de los tres$/, n:/^sed de sangre$/, usos: c => Math.max(1, c.m.int), reset: "largo"},
  {de:/^vastago de los tres$/, n:/^lealtad temible$/,
    eleccion: [{id: "lealtad-tres", titulo: "Lealtad Temible", opciones: [
      {key: "bane", nombre: "Bane", desc: "Resistencia al daño psíquico y el truco Ilusión menor.", nivel: 3},
      {key: "bhaal", nombre: "Bhaal", desc: "Resistencia al daño de veneno y el truco Guardia de cuchillas.", nivel: 3},
      {key: "myrkul", nombre: "Myrkul", desc: "Resistencia al daño necrótico y el truco Toque helado.", nivel: 3}]}],
    opciones: [
      {nombre: "Bane", t: "pasiva", elegida: ["lealtad-tres", "bane"], si: c => elegidos(c, "lealtad-tres").includes("bane"), texto: () => "Resistencia al daño psíquico y el truco Ilusión menor."},
      {nombre: "Bhaal", t: "pasiva", elegida: ["lealtad-tres", "bhaal"], si: c => elegidos(c, "lealtad-tres").includes("bhaal"), texto: () => "Resistencia al daño de veneno y el truco Guardia de cuchillas."},
      {nombre: "Myrkul", t: "pasiva", elegida: ["lealtad-tres", "myrkul"], si: c => elegidos(c, "lealtad-tres").includes("myrkul"), texto: () => "Resistencia al daño necrótico y el truco Toque helado."}]},
  {de:/^cuchillo mental$/, n:/^velo psiquico$/, usos: c => 1, reset: "largo"},
  {de:/^cuchillo mental$/, n:/^desgarrar la mente$/, usos: c => 1, reset: "largo"},
  {de:/^inquisitivo$/, n:/^ojo infalible$/, usos: c => Math.max(1, c.m.sab), reset: "largo"},
  {de:/^espadachin$/, n:/^maestro duelista$/, usos: c => 1, reset: "corto"},
];

/* Para hacer a mano en reglas-revisadas.ts:
   - cuchillo-mental: Poder Psiónico (otro): dados 4/6/8/10/12 en los niveles 3/5/9/13/17, d6/d8/d10/d12 en 3/5/11/17; uno vuelve con descanso corto
   - cuchillo-mental: Hojas Psíquicas (otro): filas de ataque: 1d6 + DES psíquico, y 1d4 con la acción adicional
   - batidor: Superviviente (otro): competencia y pericia en Naturaleza y Supervivencia
   - batidor: Movilidad Superior (otro): velocidad +10
   - espadachin: Audacia Temeraria (otro): iniciativa + CAR */

/* Libro de cada subclase, por su nombre normalizado */
export const fuentes: Record<string, string> = {
  "embaucador arcano": "Manual del Jugador (2024)",
  "asesino": "Manual del Jugador (2024)",
  "fantasma": "Ravenloft: The Horrors Within (2026)",
  "vastago de los tres": "Forgotten Realms: Heroes of Faerûn (2025)",
  "cuchillo mental": "Manual del Jugador (2024)",
  "ladron": "Manual del Jugador (2024)",
  "inquisitivo": "Xanathar's Guide to Everything (2017)",
  "mente maestra": "Xanathar's Guide to Everything (2017)",
  "batidor": "Xanathar's Guide to Everything (2017)",
  "espadachin": "Xanathar's Guide to Everything (2017)"
};

export const descripciones: Record<string, string> = {
  "embaucador": "Pícaros que suman a su sigilo trucos de magia arcana: una mano invisible, ilusiones y hasta conjuros robados a otros lanzadores.",
  "asesino": "Especialistas en el veneno, el disfraz y la emboscada que eliminan a sus objetivos antes de que puedan reaccionar.",
  "fantasma": "Pícaros ligados a la muerte que roban recuerdos de las almas, toman forma espectral y hieren con lamentos necróticos.",
  "vastago-tres": "Agentes tocados por los Tres Muertos que saltan sobre los enemigos heridos para rematarlos y siembran el terror.",
  "cuchillo-mental": "Pícaros con poder psiónico que atacan con hojas de energía mental y se comunican por telepatía.",
  "ladron": "El aventurero clásico: trepa cualquier pared, usa objetos mágicos como nadie y actúa dos veces al empezar el combate.",
  "inquisitivo": "Investigadores que leen las mentiras y los gestos de los demás, encuentran lo oculto y castigan al enemigo que entienden.",
  "mente-maestra": "Espías y cortesanos para quienes las palabras y los secretos son armas: dirigen a sus aliados y engañan hasta a la magia.",
  "batidor": "Exploradores de la naturaleza que se adelantan al grupo, esquivan a los enemigos y preparan emboscadas.",
  "espadachin": "Duelistas elegantes y temerarios que pelean cuerpo a cuerpo con estilo, encantan a sus rivales y se escurren sin castigo."
};
