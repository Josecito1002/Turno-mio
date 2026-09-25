/* eslint-disable */
// @ts-nocheck -- datos portados tal cual de index.html
import { sign, fmtMod } from '@/shared/utils/texto';

/* Conjuros de patrón siempre preparados (Manual del Jugador 2024): [nivel de brujo, nombres como están en el catálogo] */
const conjurosPatron = tabla => c => `Siempre preparados: ${tabla.filter(([n]) => c.lvl >= n).flatMap(([, s]) => s).join(', ')}.`;

export const SUBCLASES: any[] = [
  {key:'sombra', clase:'monje', n:'Guerrero de la Sombra', match:/sombra|shadow/, hasta:6, rasgos:[
    {n:3,t:'accion',nombre:'Oscuridad (Artes de la Sombra)',coste:'1 Focus',texto:()=>'Lanzas Oscuridad sin componentes (concentración). Tú ves dentro y cada turno puedes moverla hasta 60 pies.'},
    {n:3,t:'accion',nombre:'Figuras Sombrías',texto:c=>`Conoces Ilusión menor y la lanzas con SAB (CD ${c.dcFocus}).`},
    {n:3,t:'pasiva',nombre:'Visión en la oscuridad',texto:()=>'Ves en la oscuridad a 60 pies, o 60 más si ya tenías.'},
    {n:6,t:'adicional',nombre:'Paso de Sombra',texto:()=>'En luz tenue u oscuridad, te teletransportas hasta 60 pies a otra zona oscura y tienes ventaja en tu siguiente ataque cuerpo a cuerpo este turno.'},
  ]},
  {key:'manoabierta', clase:'monje', n:'Guerrero de la Mano Abierta', match:/mano abierta|open hand/, hasta:6, recursos:c=>[c.lvl>=6&&{id:'integ',nombre:'Integridad del Cuerpo',max:Math.max(1,c.m.sab),reset:'largo'}], rasgos:[
    {n:3,t:'gratis',nombre:'Técnica de la Mano Abierta',texto:c=>`Cada golpe de Ráfaga de Golpes elige: no puede hacer ataques de oportunidad; salvación de FUE CD ${c.dcFocus} o lo empujas 15 pies; o salvación de DES CD ${c.dcFocus} o queda Derribado.`},
    {n:6,t:'adicional',nombre:'Integridad del Cuerpo',texto:c=>`Recuperas 1d${c.md}${fmtMod(Math.max(1,c.m.sab))} PG.`},
  ]},
  {key:'devocion', clase:'paladin', n:'Juramento de Devoción', match:/devocion|entrega|devotion/, hasta:6, rasgos:[
    {n:3,t:'gratis',nombre:'Arma Sagrada',coste:'1 Canalizar',texto:c=>`Al usar la acción Atacar, imbuyes un arma cuerpo a cuerpo 10 minutos: ${sign(Math.max(1,c.m.car))} al ataque con ella, puede hacer daño radiante y da luz a 20 pies.`},
    {n:3,t:'pasiva',nombre:'Conjuros del juramento',texto:c=>`Siempre preparados: Protección contra el bien y el mal, Escudo de fe${c.lvl>=5?', Ayuda, Zona de verdad':''}.`},
  ]},
  {key:'gloria', clase:'paladin', n:'Juramento de la Gloria', match:/gloria|glory/, hasta:6, rasgos:[
    {n:3,t:'adicional',nombre:'Atleta Inigualable',coste:'1 Canalizar',texto:()=>'1 hora: ventaja en Atletismo y Acrobacias, y tus saltos aumentan 10 pies.'},
    {n:3,t:'gratis',nombre:'Castigo Inspirador',coste:'1 Canalizar',texto:c=>`Justo después de lanzar Castigo Divino, repartes 2d8 + ${c.lvl} PG temporales entre criaturas a 30 pies.`},
    {n:3,t:'pasiva',nombre:'Conjuros del juramento',texto:c=>`Siempre preparados: Rayo guía, Heroísmo${c.lvl>=5?', Mejorar característica, Arma mágica':''}.`},
  ]},
  {key:'antiguos', clase:'paladin', n:'Juramento de los Antiguos', match:/antiguos|ancients/, hasta:6, rasgos:[
    {n:3,t:'accion',nombre:'Ira de la Naturaleza',coste:'1 Canalizar',texto:c=>`Criaturas que elijas a 15 pies: salvación de FUE CD ${c.dcSpell} o Apresadas 1 minuto (repiten al final de sus turnos).`},
    {n:3,t:'pasiva',nombre:'Conjuros del juramento',texto:c=>`Siempre preparados: Hablar con los animales, Golpe atrapador${c.lvl>=5?', Rayo de luna, Paso brumoso':''}.`},
  ]},
  {key:'venganza', clase:'paladin', n:'Juramento de Venganza', match:/venganza|vengeance/, hasta:6, rasgos:[
    {n:3,t:'gratis',nombre:'Voto de Enemistad',coste:'1 Canalizar',texto:()=>'Al usar la acción Atacar, eliges una criatura a 30 pies: ventaja en tus ataques contra ella durante 1 minuto.'},
    {n:3,t:'pasiva',nombre:'Conjuros del juramento',texto:c=>`Siempre preparados: Perdición, Marca del cazador${c.lvl>=5?', Inmovilizar persona, Paso brumoso':''}.`},
  ]},
  {key:'cadena', clase:'brujo', n:'Pacto de la Cadena', match:/cadena|chain/, hasta:20, rasgos:[
    {n:1,t:'accion',nombre:'Pacto de la Cadena',texto:()=>'Lanzas Encontrar familiar como acción mágica sin espacio. Formas especiales: diablillo, pseudodragón, quasit, esqueleto, renacuajo de slaad, esfinge de las maravillas, duendecillo o serpiente venenosa.'},
    {n:1,t:'gratis',nombre:'Ataque del familiar',texto:()=>'Al usar la acción Atacar, puedes renunciar a uno de tus ataques para que tu familiar ataque con su reacción.'},
  ]},
  {key:'infernal', clase:'brujo', n:'Patrón Infernal', match:/infernal|diablo|demonio|fiend/, hasta:5, rasgos:[
    {n:3,t:'gratis',nombre:'Bendición del Oscuro',texto:c=>`Cuando reduces a 0 PG a un enemigo (o alguien lo hace a 10 pies de ti), ganas ${Math.max(1,c.m.car+c.lvl)} PG temporales.`},
    {n:3,t:'pasiva',nombre:'Conjuros del patrón',texto:conjurosPatron([[3,['Manos ardientes','Orden imperiosa','Rayo abrasador','Sugestión']],[5,['Bola de fuego','Nube apestosa']],[7,['Escudo de fuego','Muro de fuego']],[9,['Geas','Plaga de insectos']]])},
  ]},
  {key:'archihada', clase:'brujo', n:'Patrón Archihada', match:/archi|feeri|hada|archfey/, hasta:5, recursos:c=>[c.lvl>=3&&{id:'pasos',nombre:'Pasos Feéricos',max:Math.max(1,c.m.car),reset:'largo'}], rasgos:[
    {n:3,t:'adicional',nombre:'Pasos Feéricos',coste:'1 uso',texto:c=>`Lanzas Paso brumoso sin espacio y eliges: tú o alguien a 10 pies gana 1d10 PG temporales, o criaturas a 5 pies de donde saliste hacen salvación de SAB CD ${c.dcSpell} o tienen desventaja atacando a otros que no seas tú.`},
    {n:3,t:'pasiva',nombre:'Conjuros del patrón',texto:conjurosPatron([[3,['Calmar emociones','Fuego feérico','Paso brumoso','Fuerza fantasmal','Dormir']],[5,['Parpadeo','Crecimiento vegetal']],[7,['Dominar bestia','Invisibilidad mejorada']],[9,['Dominar persona','Apariencia']]])},
  ]},
  {key:'celestial', clase:'brujo', n:'Patrón Celestial', match:/celestial/, hasta:5, recursos:c=>[c.lvl>=3&&{id:'luz',nombre:'Luz Sanadora (d6)',max:1+c.lvl,reset:'largo',tipo:'pool'}], rasgos:[
    {n:3,t:'adicional',nombre:'Luz Sanadora',texto:c=>`Gastas hasta ${Math.max(1,c.m.car)} d6 de tu reserva para curar a una criatura a 60 pies.`},
    {n:3,t:'pasiva',nombre:'Conjuros del patrón',texto:conjurosPatron([[3,['Luz','Llama sagrada','Ayuda','Curar heridas','Rayo guía','Restablecimiento menor']],[5,['Luz del día','Revivir']],[7,['Guardián de la Fe','Muro de fuego']],[9,['Restablecimiento mayor','Invocar celestial']]])},
  ]},
  {key:'primigenio', clase:'brujo', n:'Patrón Gran Antiguo', match:/primigenio|gran antiguo|old one/, hasta:5, rasgos:[
    {n:3,t:'adicional',nombre:'Mente Despierta',texto:c=>`Vínculo telepático con una criatura que veas a 30 pies durante ${c.lvl} minutos.`},
    {n:3,t:'pasiva',nombre:'Conjuros del patrón',texto:conjurosPatron([[3,['Detectar pensamientos','Susurros discordantes','Fuerza fantasmal','Risa horrible de Tasha']],[5,['Clarividencia','Hambre de Hadar']],[7,['Confusión','Invocar aberración']],[9,['Alterar los recuerdos','Telequinesis']]])},
    {n:3,t:'pasiva',nombre:'Conjuros psíquicos',texto:()=>'Tus conjuros de brujo con daño pueden hacerlo psíquico, y los de encantamiento e ilusión no necesitan componentes verbales ni somáticos.'},
  ]},
  {key:'draconico', clase:'hechicero', n:'Hechicería Dracónica', match:/draco|dragon/, hasta:6, hp:c=>c.lvl, ca:c=>!c.armor?10+c.m.des+c.m.car:null, rasgos:[
    {n:3,t:'pasiva',nombre:'Resiliencia Dracónica',texto:c=>`+${c.lvl} PG máximos y, sin armadura, CA 10 + DES + CAR = ${10+c.m.des+c.m.car} (ya sumado).`},
    {n:3,t:'pasiva',nombre:'Conjuros dracónicos',texto:c=>`Siempre preparados: Alterar el propio aspecto, Orbe cromático, Orden imperiosa, Aliento de Dragón${c.lvl>=5?', Miedo, Volar':''}${c.lvl>=7?', Ojo arcano, Hechizar monstruo':''}${c.lvl>=9?', Conocer las leyendas, Invocar dragón':''}.`},
    {n:6,t:'pasiva',nombre:'Afinidad Elemental',texto:c=>`Eliges ácido, frío, fuego, relámpago o veneno: resistencia a ese daño y +${Math.max(0,c.m.car)} al daño de ese tipo en tus conjuros.`},
  ]},
  {key:'salvaje', clase:'hechicero', n:'Magia Salvaje', match:/salvaje|wild/, hasta:6, recursos:c=>[c.lvl>=3&&{id:'mareas',nombre:'Mareas del Caos',max:1,reset:'largo'}], rasgos:[
    {n:3,t:'gratis',nombre:'Oleada de Magia Salvaje',texto:()=>'Una vez por turno, al lanzar un conjuro de hechicero con espacio, tira 1d20; con 20 tira en la tabla de Oleada.'},
    {n:3,t:'gratis',nombre:'Mareas del Caos',coste:'1 por descanso largo',texto:()=>'Te das ventaja en una prueba d20.'},
    {n:6,t:'reaccion',nombre:'Doblegar la Suerte',coste:'1 punto de hechicería',texto:()=>'Cuando alguien que ves hace una prueba d20, tiras 1d4 y lo sumas o restas.'},
  ]},
];
