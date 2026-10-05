/* Psion de Unearthed Arcana (Psion Update, 2025; lote 23): reglas, fuentes y descripciones. Los números salen de la tabla del PDF. */
/* eslint-disable */
// @ts-nocheck
const siempre = tabla => c => `Siempre preparados, sin contar en tu límite: ${tabla.filter(([n]) => c.lvl >= n).flatMap(([, s]) => s).join(', ')}.`;
const DADOS = [[4, 6], [4, 6], [4, 6], [4, 6], [6, 8], [6, 8], [6, 8], [6, 8], [8, 8], [8, 8], [8, 10], [8, 10], [10, 10], [10, 10], [10, 10], [10, 10], [12, 12], [12, 12], [12, 12], [12, 12]];
const TRUCOS = lvl => lvl >= 10 ? 4 : lvl >= 4 ? 3 : 2;
const PREPARADOS = [4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 17, 18, 18, 19, 20, 21, 22];
const dados = c => DADOS[Math.min(20, Math.max(1, c.lvl)) - 1];

export const reglas = [
  {de:/^psion$/, n:/^psionic energy dice$/, t:'pasiva',
    texto: c => `Tienes ${dados(c)[0]}d${dados(c)[1]} Psionic Energy Dice (${dados(c)[0]} dados de ${dados(c)[1]} caras). Con cada descanso largo recuperas todos; al terminar un descanso de una hora o menos (corto) recuperas uno. La CD de las salvaciones de tus rasgos de Psion es ${8 + c.pb + c.m.int}.`},
  {de:/^psion$/, n:/^spellcasting$/, t:'pasiva',
    efecto: c => { c.trucosReglas = TRUCOS(c.lvl); c.prepReglas = PREPARADOS[c.lvl - 1]; },
    texto: c => `Lanzas conjuros de Psion con INT (CD ${8 + c.pb + c.m.int}, ${c.pb + c.m.int >= 0 ? '+' : ''}${c.pb + c.m.int} al ataque). Conoces ${TRUCOS(c.lvl)} trucos de Psion y preparas ${PREPARADOS[c.lvl - 1]} conjuros de nivel 1 o más, de un nivel para el que tengas espacios; puedes cambiar uno al subir de nivel. Tus conjuros de Psion no necesitan componentes verbales ni materiales, salvo los materiales que se consumen o que tienen un costo.`},
  {de:/^metamorph \(playtest\)$/, n:/^metamorph spells$/, texto: siempre([[3,["Alterar el propio aspecto","Curar heridas","Infligir heridas","Restablecimiento menor"]],[5,["Aura de vitalidad","Acelerar"]],[7,["Polimorfar","Piel pétrea"]],[9,["Contagio","Curar heridas en masa"]]])},
  {de:/^psykinetic \(playtest\)$/, n:/^psykinetic spells$/, texto: siempre([[3,["Nube de dagas","Levitar","Escudo","Onda atronadora"]],[5,["Ralentizar","Telekinetic Crush"]],[7,["Esfera elástica de Otiluke","Moldear la piedra"]],[9,["Telequinesis","Muro de fuerza"]]])},
  {de:/^telepath \(playtest\)$/, n:/^telepath spells$/, texto: siempre([[3,["Perdición","Orden imperiosa","Detectar pensamientos","Clavo mental"]],[5,["Contrahechizo","Ralentizar"]],[7,["Compulsión","Confusión"]],[9,["Alterar los recuerdos","Presencia regia de Yolande"]]])},
];

export const clavesPlaytest: Record<string, string> = {
  metamorph: 'Unearthed Arcana Psion Update (2025)',
  psykinetic: 'Unearthed Arcana Psion Update (2025)',
  telepath: 'Unearthed Arcana Psion Update (2025)',
};

export const fuentes: Record<string, string> = {};

export const descripciones: Record<string, string> = {
  metamorph: 'Psions que moldean su propia carne y la de otros: armas orgánicas, extremidades elásticas y curación psíquica.',
  psykinetic: 'Psions de telequinesis bruta: aplastan, lanzan y desvían con la fuerza de su mente.',
  telepath: 'Psions que leen, confunden y protegen mentes: grandes tácticos del paisaje mental.',
};
