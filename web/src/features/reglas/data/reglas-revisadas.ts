// @ts-nocheck -- datos portados tal cual de index.html
/* eslint-disable */
import { modStr } from '@/shared/utils/texto';

export const dadoPug = c => c.lvl >= 17 ? '1d12' : c.lvl >= 11 ? '1d10' : c.lvl >= 5 ? '1d8' : '1d6';
export const moxieMax = c => (c.C?.recursosTabla?.[c.lvl - 1] || {}).moxie || 0;
export const cdPug = c => 8 + c.pb + c.m.fue;
export const golpeU = c => [`1d20${modStr(c.unarmed.atk)}`, c.unarmed.expr];

export const REGLAS: any[] = [
  /* ---------- Pugilista (versión de los textos de tu biblioteca) ---------- */
  {de:/pugilista/, n:/^pugilismo/, t:'pasiva', dado: dadoPug,
    texto: c => `Con armadura ligera o sin armadura, sin escudo, y peleando sin armas o con armas de pugilista (sencillas sin Dos manos, látigo e improvisadas), tus golpes sin armas hacen ${dadoPug(c)} en vez de su daño normal. Este dado sube a d8 en nivel 5, d10 en 11 y d12 en 17.`,
    opciones: [
      {nombre:'Golpe sin armas extra (Pugilismo)', t:'adicional', coste:'gratis', roll: golpeU,
        texto: c => `Si usaste Atacar con golpes sin armas o armas de pugilista, haces un golpe sin armas (${c.unarmed.dmg}) o intentas agarrar (CD ${c.grappleDC}).`},
    ]},
  {de:/pugilista/, n:/^menton de hierro/, t:'pasiva',
    texto: c => `Con armadura ligera o sin armadura y sin escudo, tu CA es 12 + CON (${12 + c.m.con}).`},
  {de:/pugilista/, n:/^determinacion/, t:'pasiva',
    texto: c => `Tienes ${moxieMax(c)} puntos de Moxie y los recuperas con un descanso corto o largo. Los gastas en ¡Alístate!, El Viejo Uno-Dos y Pegar y Moverse, que aparecen como acciones adicionales.`,
    opciones: [
      {nombre:'¡Alístate!', t:'adicional', coste:'1 Moxie', texto: c => `Te preparas para recibir golpes: ganas ${dadoPug(c)} + ${c.lvl + c.m.con} PG temporales, que se pierden al pasar 1 minuto.`},
      {nombre:'El Viejo Uno-Dos', t:'adicional', coste:'1 Moxie', roll: golpeU, texto: c => `Justo después de usar Atacar, haces dos golpes sin armas (${c.unarmed.dmg} cada uno).`},
      {nombre:'Pegar y Moverse', t:'adicional', coste:'1 Moxie', texto: c => `Empujas a una criatura (salvación de FUE o DES contra CD ${c.grappleDC}) o usas Correr.`},
    ]},
  {de:/pugilista/, n:/^listo para la calle/, t:'fuera'},
  {de:/pugilista/, n:/^ensangrentado pero invicto/, t:'reaccion', usos:1, reset:'corto',
    texto: c => `Cuando un daño te deja a la mitad de tus PG máximos o menos, ganas ${c.lvl + c.m.con} PG temporales y recuperas todos tus puntos de Moxie.`},
  {de:/pugilista/, n:/^escarbar profundo/, t:'adicional'},
  {de:/pugilista/, n:/^gancho devastador/, t:'gratis',
    texto: () => 'Antes de una tirada de ataque que no tenga desventaja, lo anuncias: todos tus ataques de este turno van con desventaja, pero los golpes sin armas o con armas de pugilista que acierten hacen el máximo en los dados.'},
  {de:/pugilista/, n:/^sacudetelo/, t:'accion'},
  {de:/pugilista/, n:/^agitador de masas/, t:'fuera'},
  {de:/pugilista/, n:/^espiritu de lucha/, t:'gratis', usos:1, reset:'largo'},

  /* Pura Mala Leche */
  {de:/mala leche/, n:/^saludo salado/, t:'adicional',
    texto: c => `Provocas a una criatura a 60 pies que te vea u oiga: salvación de SAB (CD ${cdPug(c)}). Si falla, recibe daño psíquico y tiene desventaja en los ataques que no sean contra ti hasta tu próximo turno.`},
  {de:/mala leche/, n:/^trucos sucios/, t:'pasiva',
    texto: c => `Tres trucos, cada uno una vez por descanso corto o largo. Si el objetivo falla la salvación (CD ${cdPug(c)}), recuperas 1 punto de Moxie.`,
    opciones: [
      {nombre:'Aplasta-talones', t:'gratis', usos:1, reset:'corto', texto: c => `Cuando haces daño con un golpe sin armas o arma de pugilista: salvación de DES (CD ${cdPug(c)}) o su velocidad se reduce a la mitad durante 1 minuto.`},
      {nombre:'Golpe bajo', t:'gratis', usos:1, reset:'corto', texto: c => `Cuando haces daño con un golpe sin armas o arma de pugilista: salvación de FUE (CD ${cdPug(c)}) o queda Derribado.`},
      {nombre:'Arena al bolsillo', t:'adicional', usos:1, reset:'corto', texto: c => `Una criatura a 5 pies: salvación de CON (CD ${cdPug(c)}) o queda Cegada hasta el final de su próximo turno.`},
    ]},
  {de:/mala leche/, n:/^viejo grosero/, t:'reaccion', coste:'1 Moxie'},

  /* La Dulce Ciencia */
  {de:/dulce ciencia/, n:/^cruzado/, t:'reaccion', coste:'2 Moxie'},
  {de:/dulce ciencia/, n:/^uno, dos, tres/, t:'gratis', coste:'1 Moxie'},
  {de:/dulce ciencia/, n:/^nocaut/, t:'gratis'},

  /* ---------- Especies de Monsters of the Multiverse ---------- */
  {de:/tabaxi/, n:/^agilidad felina/, t:'gratis',
    texto: () => 'Al moverte en tu turno durante un combate, puedes duplicar tu velocidad hasta el final del turno. No puedes volver a usarlo hasta un turno en el que te muevas 0 pies.'},
  {de:/tabaxi/, n:/^garras de gato/, t:'pasiva',
    texto: () => 'Velocidad de trepar igual a tu velocidad. Puedes hacer golpes sin armas con tus garras: al acertar hacen 1d6 + FUE de daño cortante en vez del contundente normal (aparecen en Ataques).'},
  {de:/kenku/, n:/^sabiduria kenku/, t:'gratis'},
  {de:/hobgoblin/, n:/^regalo de la parvada/, t:'gratis'},
  {de:/renacido/, n:/^conocimiento de vida pasada/, t:'gratis'},
  {de:/autognomo/, n:/^exito mecanico/, t:'gratis'},
  {de:/goblin/, n:/^furia de los pequenos/, t:'gratis'},
  {de:/bugbear/, n:/^ataque sorpresa/, t:'gratis'},
  {de:/minotauro/, n:/^embestida de cuernos/, t:'adicional'},
];
