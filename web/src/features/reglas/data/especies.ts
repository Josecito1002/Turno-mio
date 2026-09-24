/* eslint-disable */
// @ts-nocheck -- datos portados tal cual de index.html
import { fmtMod } from '@/shared/utils/texto';

export const ESPECIES: Record<string, any> = {
  aasimar:{n:'Aasimar', r:'Resistencia radiante y necrótica, manos curativas', vel:30, vision:60, rasgos:[
    {t:'pasiva',nombre:'Resistencia Celestial',texto:()=>'Resistencia al daño necrótico y radiante.'},
    {t:'accion',nombre:'Manos Curativas',usos:1,texto:c=>`Tocas a una criatura y tiras ${c.pb}d4: recupera esa cantidad de PG.`},
    {t:'accion',nombre:'Portador de Luz',texto:()=>'Conoces el truco Luz (usa CAR).'},
    {n:3,t:'adicional',nombre:'Revelación Celestial',usos:1,texto:c=>`Te transformas 1 minuto y eliges: Alas celestiales (vuelas a tu velocidad), Radiancia interior (al final de cada turno, criaturas a 10 pies reciben ${c.pb} radiante) o Mortaja necrótica (criaturas a 10 pies, salvación de CAR CD ${8+c.m.car+c.pb} o Asustadas). Una vez por turno sumas ${c.pb} de daño radiante o necrótico a un ataque o conjuro.`},
  ]},
  draconido:{n:'Dracónido', al:['dragonborn'], r:'Arma de aliento y resistencia', vel:30, vision:60, subL:'Ascendencia',
    subs:{azul:{n:'Azul',dmg:'relámpago'},blanco:{n:'Blanco',dmg:'frío'},bronce:{n:'Bronce',dmg:'relámpago'},cobre:{n:'Cobre',dmg:'ácido'},laton:{n:'Latón',dmg:'fuego'},negro:{n:'Negro',dmg:'ácido'},oro:{n:'Oro',dmg:'fuego'},plata:{n:'Plata',dmg:'frío'},rojo:{n:'Rojo',dmg:'fuego'},verde:{n:'Verde',dmg:'veneno'}},
    rasgos:[
    {t:'gratis',nombre:'Arma de Aliento',usos:'pb',texto:c=>`Sustituye uno de tus ataques de la acción Atacar: cono de 15 pies o línea de 30. Salvación de DES CD ${8+c.m.con+c.pb}: ${c.tl>=17?4:c.tl>=11?3:c.tl>=5?2:1}d10 de ${c.subDmg}, la mitad si la pasa.`},
    {t:'pasiva',nombre:'Resistencia Dracónica',texto:c=>`Resistencia al daño de ${c.subDmg}.`},
    {n:5,t:'adicional',nombre:'Vuelo Dracónico',usos:1,texto:()=>'Alas espectrales durante 10 minutos: vuelas a tu velocidad.'},
  ]},
  enano:{n:'Enano', al:['dwarf'], r:'Visión de 120 pies y más PG', vel:30, vision:120, hpNivel:1, rasgos:[
    {t:'pasiva',nombre:'Resiliencia Enana',texto:()=>'Resistencia al veneno y ventaja en salvaciones contra quedar Envenenado.'},
    {t:'pasiva',nombre:'Dureza Enana',texto:c=>`+${c.tl} PG máximos (1 por nivel, ya sumado).`},
    {t:'adicional',nombre:'Conocimiento de la Piedra',usos:'pb',texto:()=>'Durante 10 minutos sientes vibraciones a 60 pies mientras estés sobre piedra.'},
  ]},
  elfo:{n:'Elfo', al:['elf'], r:'Trance y ascendencia feérica', vel:30, vision:60, subL:'Linaje', velSub:{silvano:35}, visionSub:{drow:120},
    subs:{drow:{n:'Drow'},alto:{n:'Alto elfo'},silvano:{n:'Elfo silvano'}}, rasgos:[
    {t:'pasiva',nombre:'Linaje Élfico',texto:c=>({drow:'Visión en la oscuridad de 120 pies y el truco Luces danzantes; a nivel 3 Fuego feérico y a nivel 5 Oscuridad, una vez al día cada uno sin espacio.',alto:'El truco Prestidigitación; a nivel 3 Detectar magia y a nivel 5 Paso brumoso, una vez al día cada uno sin espacio.',silvano:'Velocidad 35 y el truco Druidismo; a nivel 3 Zancada prodigiosa y a nivel 5 Pasar sin rastro, una vez al día cada uno sin espacio.'}[c.esub] || 'Elige tu linaje.')},
    {t:'pasiva',nombre:'Ascendencia Feérica',texto:()=>'Ventaja en salvaciones contra quedar Hechizado.'},
    {t:'pasiva',nombre:'Sentidos Agudos',texto:()=>'Competencia en Perspicacia, Percepción o Supervivencia (elígela en Habilidades).'},
    {t:'pasiva',nombre:'Trance',texto:()=>'Tu descanso largo son 4 horas de trance.'},
  ]},
  gnomo:{n:'Gnomo', al:['gnome'], r:'Ventaja en salvaciones mentales', vel:30, vision:60, subL:'Linaje', subs:{bosque:{n:'Gnomo del bosque'},roca:{n:'Gnomo de las rocas'}}, rasgos:[
    {t:'pasiva',nombre:'Astucia Gnoma',texto:()=>'Ventaja en salvaciones de INT, SAB y CAR.'},
    {t:'pasiva',nombre:'Linaje Gnomo',texto:c=>({bosque:`Conoces Ilusión menor y lanzas Hablar con los animales ${c.pb} veces por descanso largo sin espacio.`,roca:'Conoces Remendar y Prestidigitación, y fabricas pequeños aparatos mecánicos.'}[c.esub] || 'Elige tu linaje.')},
  ]},
  goliat:{n:'Goliat', al:['goliath'], r:'Velocidad 35 y herencia de gigante', vel:35, subL:'Herencia',
    subs:{nubes:{n:'Gigante de las nubes',al:['nuboso','nube','cloud']},fuego:{n:'Gigante de fuego',al:['fire']},escarcha:{n:'Gigante de escarcha',al:['frost','hielo']},colinas:{n:'Gigante de las colinas',al:['colina','hill']},piedra:{n:'Gigante de piedra',al:['stone']},tormenta:{n:'Gigante de las tormentas',al:['storm']}},
    rasgos:[
    {sub:'nubes',t:'adicional',nombre:'Salto de las Nubes',usos:'pb',texto:()=>'Te teletransportas hasta 30 pies a un espacio libre que veas.'},
    {sub:'fuego',t:'gratis',nombre:'Quemadura de Fuego',usos:'pb',texto:()=>'Al golpear con una tirada de ataque, sumas 1d10 de fuego.'},
    {sub:'escarcha',t:'gratis',nombre:'Frío de Escarcha',usos:'pb',texto:()=>'Al golpear con una tirada de ataque, sumas 1d6 de frío y su velocidad baja 10 pies hasta tu próximo turno.'},
    {sub:'colinas',t:'gratis',nombre:'Caída de las Colinas',usos:'pb',texto:()=>'Al golpear y dañar a una criatura Grande o menor con una tirada de ataque, la dejas Derribada.'},
    {sub:'piedra',t:'reaccion',nombre:'Aguante de Piedra',usos:'pb',texto:c=>`Al recibir daño, lo reduces en 1d12${fmtMod(c.m.con)}.`},
    {sub:'tormenta',t:'reaccion',nombre:'Trueno de Tormenta',usos:'pb',texto:()=>'Cuando una criatura a 60 pies te hace daño, recibe 1d8 de trueno.'},
    {t:'pasiva',nombre:'Complexión Poderosa',texto:()=>'Ventaja para terminar la condición Agarrado y cuentas como un tamaño más para cargar.'},
    {n:5,t:'adicional',nombre:'Forma Grande',usos:1,texto:()=>'Te vuelves Grande 10 minutos: ventaja en pruebas de FUE y +10 pies de velocidad.'},
  ]},
  mediano:{n:'Mediano', al:['halfling'], r:'Suerte y valentía', vel:30, rasgos:[
    {t:'pasiva',nombre:'Valiente',texto:()=>'Ventaja en salvaciones contra quedar Asustado.'},
    {t:'pasiva',nombre:'Agilidad Mediana',texto:()=>'Puedes pasar por el espacio de criaturas más grandes que tú.'},
    {t:'gratis',nombre:'Suerte',texto:()=>'Si sacas 1 en el d20 de una prueba d20, repites la tirada.'},
    {t:'pasiva',nombre:'Sigilo Natural',texto:()=>'Puedes Esconderte detrás de una criatura al menos un tamaño más grande que tú.'},
  ]},
  humano:{n:'Humano', al:['human'], r:'Una habilidad y una dote extra', vel:30, rasgos:[
    {t:'pasiva',nombre:'Ingenioso',texto:()=>'Ganas Inspiración heroica al terminar cada descanso largo.'},
    {t:'pasiva',nombre:'Hábil',texto:()=>'Competencia en una habilidad a tu elección (elígela en Habilidades).'},
    {t:'pasiva',nombre:'Versátil',texto:()=>'Una dote de origen más (elígela en Trasfondo).'},
  ]},
  orco:{n:'Orco', al:['orc'], r:'Adrenalina y aguante incansable', vel:30, vision:120, rasgos:[
    {t:'adicional',nombre:'Descarga de Adrenalina',usos:'pb',reset:'corto',texto:c=>`Usas la acción Correr y ganas ${c.pb} PG temporales.`},
    {t:'gratis',nombre:'Aguante Incansable',usos:1,texto:()=>'Cuando caes a 0 PG sin morir en el acto, te quedas a 1 PG.'},
  ]},
  tiefling:{n:'Tiefling', al:['tiflin'], r:'Legado infernal y trucos', vel:30, vision:60, subL:'Legado', subs:{abisal:{n:'Abisal'},ctonico:{n:'Ctónico'},infernal:{n:'Infernal'}}, rasgos:[
    {t:'pasiva',nombre:'Legado Infernal',texto:c=>({abisal:'Resistencia al veneno y el truco Rociada venenosa; a nivel 3 Rayo nauseabundo y a nivel 5 Inmovilizar persona.',ctonico:'Resistencia al necrótico y el truco Toque helado; a nivel 3 Falsa vida y a nivel 5 Rayo debilitador.',infernal:'Resistencia al fuego y el truco Rayo de fuego; a nivel 3 Reprensión infernal y a nivel 5 Oscuridad.'}[c.esub] || 'Elige tu legado.')+(c.esub?' Los de nivel 3 y 5 los lanzas una vez al día sin espacio.':'')},
    {t:'pasiva',nombre:'Presencia de Otro Mundo',texto:()=>'Conoces el truco Taumaturgia.'},
  ]},
  custom:{n:'Personalizada', r:'Para especies de tu mundo', vel:30, rasgos:[]},
};

/* Criaturas del bestiario que versiones anteriores metían como especies */
export const BESTIAS_COLADAS: any[] = ["lib:buho", "lib:murcielago", "lib:gato", "lib:arana", "lib:rata", "lib:cuervo", "lib:lobo", "lib:pantera", "lib:oso-negro", "lib:oso-pardo", "lib:lobo-huargo", "lib:arana-gigante", "lib:tigre", "lib:aguila-gigante", "lib:hiena-gigante", "lib:pulpo-gigante", "lib:sapo-gigante", "lib:caballo-de-guerra", "lib:caballo-de-monta", "lib:mastin", "lib:diablillo", "lib:pseudodragon", "lib:jabali", "lib:tejon-gigante", "lib:cocodrilo", "lib:serpiente-constrictora", "lib:serpiente-venenosa", "lib:leon", "lib:mula", "lib:halcon", "lib:elemental-aire", "lib:elemental-tierra", "lib:elemental-fuego", "lib:elemental-agua", "lib:bestia-tierra-primigenia", "lib:bestia-aire-primigenia", "lib:bestia-mar-primigenia", "lib:quasit", "lib:duende"];
