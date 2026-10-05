/* La clase Psion de Unearthed Arcana (Psion Update, octubre de 2025; lote 23 de Gemini), con sus tres subclases y el Psi Warper de
   The Psion (2025). Material Playtest, no oficial todavía. Los nombres propios sin traducción oficial quedan en inglés.
   Las tablas de energía, trucos, preparados y espacios salen del PDF. Lo aplica `npm run db:actualizar-clase -- psion`. */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const PSION_2025: any = {
 "n": "Psion",
 "lib": true,
 "src": "Unearthed Arcana Psion Update (2025)",
 "dado": 6,
 "sv": [
  "int",
  "sab"
 ],
 "habN": 2,
 "habs": [
  "Arcanos",
  "Perspicacia",
  "Intimidación",
  "Investigación",
  "Medicina",
  "Percepción",
  "Persuasión"
 ],
 "arm": "Ninguna",
 "armas": "Armas sencillas",
 "w": {
  "simple": 1,
  "martial": 0,
  "light": 0,
  "finesseLight": 0
 },
 "lanz": "int",
 "caster": "tabla",
 "slotsTabla": [
  [
   2,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0
  ],
  [
   3,
   0,
   0,
   0,
   0,
   0,
   0,
   0,
   0
  ],
  [
   4,
   2,
   0,
   0,
   0,
   0,
   0,
   0,
   0
  ],
  [
   4,
   3,
   0,
   0,
   0,
   0,
   0,
   0,
   0
  ],
  [
   4,
   3,
   2,
   0,
   0,
   0,
   0,
   0,
   0
  ],
  [
   4,
   3,
   3,
   0,
   0,
   0,
   0,
   0,
   0
  ],
  [
   4,
   3,
   3,
   1,
   0,
   0,
   0,
   0,
   0
  ],
  [
   4,
   3,
   3,
   2,
   0,
   0,
   0,
   0,
   0
  ],
  [
   4,
   3,
   3,
   3,
   1,
   0,
   0,
   0,
   0
  ],
  [
   4,
   3,
   3,
   3,
   2,
   0,
   0,
   0,
   0
  ],
  [
   4,
   3,
   3,
   3,
   2,
   1,
   0,
   0,
   0
  ],
  [
   4,
   3,
   3,
   3,
   2,
   1,
   0,
   0,
   0
  ],
  [
   4,
   3,
   3,
   3,
   2,
   1,
   1,
   0,
   0
  ],
  [
   4,
   3,
   3,
   3,
   2,
   1,
   1,
   0,
   0
  ],
  [
   4,
   3,
   3,
   3,
   2,
   1,
   1,
   1,
   0
  ],
  [
   4,
   3,
   3,
   3,
   2,
   1,
   1,
   1,
   0
  ],
  [
   4,
   3,
   3,
   3,
   2,
   1,
   1,
   1,
   1
  ],
  [
   4,
   3,
   3,
   3,
   3,
   1,
   1,
   1,
   1
  ],
  [
   4,
   3,
   3,
   3,
   3,
   2,
   1,
   1,
   1
  ],
  [
   4,
   3,
   3,
   3,
   3,
   2,
   2,
   1,
   1
  ]
 ],
 "recursosTabla": [
  {
   "psionic_energy_dice": 4
  },
  {
   "psionic_energy_dice": 4
  },
  {
   "psionic_energy_dice": 4
  },
  {
   "psionic_energy_dice": 4
  },
  {
   "psionic_energy_dice": 6
  },
  {
   "psionic_energy_dice": 6
  },
  {
   "psionic_energy_dice": 6
  },
  {
   "psionic_energy_dice": 6
  },
  {
   "psionic_energy_dice": 8
  },
  {
   "psionic_energy_dice": 8
  },
  {
   "psionic_energy_dice": 8
  },
  {
   "psionic_energy_dice": 8
  },
  {
   "psionic_energy_dice": 10
  },
  {
   "psionic_energy_dice": 10
  },
  {
   "psionic_energy_dice": 10
  },
  {
   "psionic_energy_dice": 10
  },
  {
   "psionic_energy_dice": 12
  },
  {
   "psionic_energy_dice": 12
  },
  {
   "psionic_energy_dice": 12
  },
  {
   "psionic_energy_dice": 12
  }
 ],
 "asi": [
  4,
  8,
  12,
  16,
  19
 ],
 "estilo": 0,
 "estilos": [],
 "maestrias": 0,
 "hasta": 0,
 "rasgos": [
  {
   "nombre": "Psionic Power",
   "t": "adicional",
   "texto": "Albergas un manantial de energía psiónica dentro de ti. Esta energía está representada por tus Psionic Energy Dice. Tu nivel de Psion determina el tamaño del dado y la cantidad de Psionic Energy Dice que tienes, como se muestra en la columna Energy Dice de la tabla de características del Psion. Tus Psionic Energy Dice se usan para mejorar o alimentar ciertos rasgos de Psion. Comienzas con dos de esos rasgos: Telekinetic Propel y Telepathic Connection. Algunos de tus poderes gastan los Psionic Energy Dice, como se especifica en la descripción de cada poder, y no puedes usar un poder si este requiere que gastes un dado cuando todos tus Psionic Energy Dice están gastados. Recuperas un Psionic Energy Die gastado cuando terminas un descanso corto, y recuperas todos ellos cuando terminas un descanso largo. Algunos rasgos que usan Psionic Energy Dice requieren que tu objetivo haga una tirada de salvación. La CD de la salvación equivale a la CD de salvación de conjuros de tu rasgo Spellcasting. Telekinetic Propel. Como acción adicional, eliges una criatura Grande o más pequeña que no seas tú y que puedas ver a 30 pies o menos de ti. Al hacerlo, el objetivo debe tener éxito en una tirada de salvación de Fuerza o ser movido 5 pies en línea recta hacia ti o alejándose de ti. Alternativamente, puedes tirar un Psionic Energy Die cuando tomas esta acción adicional, y la distancia movida es igual a 5 veces el número obtenido. El dado se gasta únicamente si el objetivo falla la tirada de salvación. Telepathic Connection. Tienes telepatía con un alcance de 30 pies. Como acción adicional, puedes tirar un Psionic Energy Die. Durante la siguiente hora, el alcance de tu telepatía aumenta un número de pies igual a 10 veces el número obtenido. La primera vez que usas esta acción adicional después de cada descanso largo, no gastas el Psionic Energy Die. Todas las demás veces que usas este rasgo, gastas el dado.",
   "n": 1,
   "manual": true,
   "usos": 0,
   "reset": "largo"
  },
  {
   "nombre": "Psionic Energy Dice",
   "t": "pasiva",
   "texto": "Tienes Psionic Energy Dice según tu nivel (tabla del Psion). Con cada descanso largo recuperas todos; al terminar un descanso de una hora o menos (corto) recuperas uno.",
   "n": 1,
   "manual": true,
   "usos": 0,
   "reset": "largo"
  },
  {
   "nombre": "Spellcasting",
   "t": "pasiva",
   "texto": "Has aprendido cómo canalizar energía mágica utilizando el poder de tu mente. Cantrips. Conoces dos trucos de Psion a tu elección. Cada vez que ganas un nivel de Psion, puedes reemplazar uno de tus trucos de este rasgo con otro truco de Psion a tu elección. Cuando alcanzas los niveles de Psion 4 y 10, aprendes otro truco de Psion a tu elección. Spell Slots. Tienes espacios de conjuro para lanzar tus conjuros de nivel 1 y superior. Recuperas todos los espacios de conjuro gastados cuando terminas un descanso largo. Prepared Spells of Level 1+. Preparas la lista de conjuros de nivel 1 o superior que están disponibles para ser lanzados con este rasgo. Para empezar, eliges cuatro conjuros de Psion de nivel 1. El número de conjuros en tu lista aumenta conforme ganas niveles de Psion. Cada vez que ese número aumenta, eliges conjuros adicionales de Psion hasta que el número de conjuros en tu lista coincida con el número en la tabla. Los conjuros elegidos deben ser de un nivel para el cual tengas espacios de conjuro. Si otro rasgo de Psion te da conjuros que siempre tienes preparados, esos no cuentan contra el número de conjuros que puedes preparar con este rasgo, pero por lo demás cuentan como conjuros de Psion para ti. Changing Your Prepared Spells. Cada vez que ganas un nivel de Psion, puedes reemplazar un conjuro en tu lista por otro conjuro de Psion de un nivel elegible. Spellcasting Ability. La Inteligencia es tu aptitud mágica para tus conjuros de Psion. Psionic Spellcasting. Cuando lanzas un conjuro de Psion, ese conjuro no requiere un componente Verbal o Material, incluso si el conjuro incluye 'V' o 'M' en su entrada de 'Componentes', a excepción de componentes Materiales que son consumidos por el conjuro o que tienen un costo especificado en el conjuro.",
   "n": 1,
   "manual": true,
   "usos": 0,
   "reset": "largo"
  },
  {
   "nombre": "Subtle Telekinesis",
   "t": "pasiva",
   "texto": "Conoces el truco Mano de mago. Puedes lanzarlo sin componentes somáticos, y puedes hacer que la mano espectral sea Invisible cuando la lanzas.",
   "n": 1,
   "manual": true,
   "usos": 0,
   "reset": "largo"
  },
  {
   "nombre": "Psionic Discipline",
   "t": "pasiva",
   "texto": "Aprendes técnicas psiónicas adicionales que se alimentan de tus Psionic Energy Dice. Obtienes dos disciplinas a tu elección. Solo puedes usar una Disciplina cada turno y solo una vez por turno, a menos que se indique lo contrario en alguna de esas opciones. Cada vez que ganas un nivel de Psion, puedes reemplazar una de tus opciones de Psionic Discipline por otra que no conozcas. Obtienes una opción adicional en los niveles de Psion 5, 10, 13 y 17.\n\nOpciones de Psionic Discipline:\nBiofeedback: Cuando lanzas un conjuro de Psion de la escuela de Nigromancia o Transmutación, puedes gastar un número de Psionic Energy Dice hasta tu modificador de Inteligencia, tirarlos y ganar un número de Puntos de Golpe Temporales igual al número total obtenido más tu modificador de Inteligencia (mínimo de uno).\nBolstering Precognition: Cuando lanzas un conjuro de Psion de la escuela de Abjuración o Adivinación, puedes gastar un Psionic Energy Die. Tira el dado y elige una criatura que puedas ver a 60 pies o menos (que puedes ser tú mismo). Hasta el final de tu próximo turno, la criatura gana una bonificación a la siguiente Prueba de d20 que haga igual al número obtenido.\nDestructive Thoughts: Cuando lanzas un conjuro de Psion de la escuela de Conjuración o Evocación que fuerza a una criatura que puedes ver a hacer una tirada de salvación contra el conjuro, puedes gastar un número de Psionic Energy Dice hasta tu modificador de Inteligencia, y tirarlos. La criatura recibe daño psíquico igual al número total obtenido más tu modificador de Inteligencia (mínimo de uno), independientemente del resultado de la tirada de salvación.\nDevilish Tongue: Cuando tomas la acción de Influencia, puedes tirar un Psionic Energy Die y sumar el número obtenido a la prueba de característica. Si esto causa que tengas éxito en la prueba de característica, el dado se gasta.\nExpanded Awareness: Cuando tomas la acción de Buscar, puedes tirar un Psionic Energy Die y sumar el número obtenido a la prueba de característica. Si esto causa que tengas éxito en la prueba de característica, el dado se gasta.\nId Insinuation: Cuando lanzas un conjuro de Psion de la escuela de Encantamiento o Ilusión que fuerza a una criatura a hacer una tirada de salvación, puedes gastar un Psionic Energy Dice y tirarlo. Un objetivo del conjuro que puedas ver resta la mitad del número obtenido (redondeando hacia arriba) de su tirada de salvación contra el conjuro.\nInerrant Aim: Cuando haces una tirada de ataque contra una criatura y fallas, puedes tirar un Psionic Energy Die y sumar el número obtenido a la tirada de ataque. Si esto causa que el ataque impacte, el dado se gasta.\nObservant Mind: Cuando tomas la acción de Estudiar, puedes tirar un Psionic Energy Die y sumar el número obtenido a la prueba de característica. Si esto causa que tengas éxito en la prueba de característica, el dado se gasta.\nPsionic Backlash: Inmediatamente después de que una criatura que puedes ver te impacta con una tirada de ataque, puedes tomar una reacción para gastar un Psionic Energy Die, tirarlo, y reducir el daño que recibes del ataque una cantidad igual a dos veces el número obtenido más tu modificador de Inteligencia (mínimo de dos). Además, puedes forzar al atacante a hacer una tirada de salvación de Sabiduría. En una salvación fallida, el objetivo recibe daño psíquico igual a la cantidad de daño que redujiste.\nPsionic Guards: Al inicio de tu turno, puedes gastar un Psionic Energy Die. Hasta el inicio de tu próximo turno, tienes Inmunidad a las condiciones Hechizado y Asustado y ventaja en las tiradas de salvación de Inteligencia. Si estás Hechizado o Asustado cuando usas esta disciplina, la condición termina en ti. Cuando usas Psionic Guards, también puedes usar una Psionic Discipline diferente este turno.\nSharpened Mind: Al inicio de tu turno, puedes gastar un Psionic Energy Die para afilar tu psiónica destructiva. Tira el dado y registra el número obtenido. Ganas los siguientes beneficios por 1 minuto o hasta que tengas la condición de Incapacitado: Bypassing Psionics. El daño de tus ataques con armas, conjuros de Psion y rasgos de Psion ignora la resistencia al daño psíquico. Attack Mode. Una vez por turno, cuando infliges daño psíquico a una o más criaturas, puedes reemplazar el número obtenido en uno de los dados de daño por el número registrado cuando activaste esta Psionic Discipline. Cuando usas Sharpened Mind, también puedes usar una Psionic Discipline diferente este turno.",
   "n": 2,
   "manual": true,
   "usos": 0,
   "reset": "largo"
  },
  {
   "nombre": "Psion Subclass",
   "t": "pasiva",
   "texto": "Obtienes una subclase de Psion a tu elección. Las subclases Metamorph, Psykinetic y Telepath se detallan en la descripción de la clase. Una subclase es una especialización que te otorga rasgos en ciertos niveles de Psion. Por el resto de tu carrera, ganas cada uno de los rasgos de tu subclase que sean de tu nivel de Psion o menor.",
   "n": 3,
   "manual": true,
   "usos": 0,
   "reset": "largo"
  },
  {
   "nombre": "Ability Score Improvement",
   "t": "pasiva",
   "texto": "Ganas la dote de Mejora de Puntuación de Característica u otra dote de tu elección para la cual cumplas los requisitos. Ganas este rasgo de nuevo en los niveles de Psion 8, 12 y 16.",
   "n": 4,
   "manual": true,
   "usos": 0,
   "reset": "largo"
  },
  {
   "nombre": "Psionic Restoration",
   "t": "fuera",
   "texto": "Puedes realizar una meditación que enfoca la mente durante 1 minuto. Al final de la misma, recuperas tus Psionic Energy Dice gastados. Una vez que usas este rasgo, no puedes volver a hacerlo hasta que termines un descanso largo.",
   "n": 5,
   "manual": true,
   "usos": 0,
   "reset": "largo"
  },
  {
   "nombre": "Psionic Surge",
   "t": "gratis",
   "texto": "Puedes forzar tus poderes psiónicos utilizando tu fuerza vital. Después de tirar uno o más Psionic Energy Dice, puedes gastar uno de tus Dados de Golpe y tratar cualquier resultado de 1, 2 o 3 en esos Psionic Energy Dice como si fuera un 4.",
   "n": 7,
   "manual": true,
   "usos": 0,
   "reset": "largo"
  },
  {
   "nombre": "Psionic Reserves",
   "t": "pasiva",
   "texto": "Cuando tiras Iniciativa, recuperas usos gastados de tus Psionic Energy Dice hasta que tengas cuatro en caso de tener menos que eso.",
   "n": 18,
   "manual": true,
   "usos": 0,
   "reset": "largo"
  },
  {
   "nombre": "Epic Boon",
   "t": "pasiva",
   "texto": "Ganas una dote de Don épico u otra dote de tu elección para la que cumplas los requisitos.",
   "n": 19,
   "manual": true,
   "usos": 0,
   "reset": "largo"
  },
  {
   "nombre": "Enkindled Life Force",
   "t": "gratis",
   "texto": "Quemas tu fuerza vital para lograr psiónica superior. Una vez por turno, cuando tiras uno o más Psionic Energy Dice para un rasgo de Psion o una Psionic Discipline, puedes gastar uno o dos de tus Dados de Golpe. Por cada Dado de Golpe gastado, tiras un Psionic Energy Die adicional y sumas los números obtenidos al total. Esta tirada no gasta el Psionic Energy Die.",
   "n": 20,
   "manual": true,
   "usos": 0,
   "reset": "largo"
  }
 ],
 "subclases": {
  "metamorph": {
   "n": "Metamorph",
   "rasgos": [
    {
     "nombre": "Metamorph Spells",
     "t": "pasiva",
     "texto": "Cuando alcanzas un nivel de Psion especificado en la tabla de Metamorph Spells, de ahí en adelante siempre tienes los conjuros listados preparados: Alterar el propio aspecto, Curar heridas, Infligir heridas y Restablecimiento menor (Nivel 3); Aura de vitalidad y Acelerar (Nivel 5); Polimorfar y Piel pétrea (Nivel 7); Contagio y Curar heridas en masa (Nivel 9).",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Mutable Form",
     "t": "adicional",
     "texto": "Como acción adicional, puedes gastar un Psionic Energy Die para estirar psiónicamente tus extremidades durante 1 minuto. Tira el Psionic Energy Die gastado y gana una cantidad de Puntos de Golpe Temporales igual al número obtenido más tu modificador de Inteligencia (mínimo de 1 Punto de Golpe Temporal). Además, ganas los siguientes beneficios mientras este rasgo está activo: Alcance. Tu alcance aumenta en 5 pies. Velocidad. Tu Velocidad aumenta en 5 pies. Toque. Cuando lanzas un conjuro que tiene un alcance de Toque y un tiempo de lanzamiento de una acción, puedes hacer que el alcance del conjuro sea de 10 pies.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Organic Weapons",
     "t": "accion",
     "texto": "Puedes dar forma a tus extremidades como armas. Como acción mágica, puedes reformar tu mano libre en una de las siguientes armas orgánicas: Bone Blade, Flesh Maul o Viscera Launcher. Cuando tomas la acción de Atacar, puedes usar este rasgo antes de hacer la tirada de ataque. Tu extremidad retiene la forma del arma orgánica hasta que tomas una acción mágica para cambiarla a otra arma orgánica, hasta que tienes la condición de Inconsciente, o hasta que regresas la extremidad a su forma anterior (no requiere acción). Siempre que ataques con el arma, puedes usar tu modificador de Inteligencia para las tiradas de ataque y daño en lugar de usar Fuerza o Destreza. Bone Blade. Una hoja hecha de hueso brota de tu antebrazo o se extiende desde tu mano. La hoja cuenta como un arma cuerpo a cuerpo simple con la propiedad Sutil, y causa 1d8 de daño perforante en un impacto. Tienes ventaja en la tirada de ataque que haces con la hoja si al menos uno de tus aliados está a 5 pies o menos del objetivo y el aliado no tiene la condición de Incapacitado. Flesh Maul. Tu puño y antebrazo se fusionan en una masa endurecida de carne y hueso. El mazo cuenta como un arma cuerpo a cuerpo simple y causa 1d10 de daño contundente en un impacto. Una criatura golpeada por el mazo tiene desventaja en la siguiente tirada de salvación de Fuerza o Constitución que haga antes del comienzo de su próximo turno. Viscera Launcher. Tu mano y antebrazo se transforman en una ballesta hecha de músculo y tendón que dispara virotes de bilis. El lanzador cuenta como un arma a distancia simple con un alcance normal de 30 pies y un alcance largo de 90 pies, y causa 1d6 de daño de ácido en un impacto. Una vez en cada uno de tus turnos cuando impactas a una criatura con una tirada de ataque usando el lanzador, puedes infligir 1d6 extra de daño de ácido al objetivo.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Extra Attack",
     "t": "pasiva",
     "texto": "Puedes atacar dos veces en lugar de una siempre que tomes la acción de Atacar en tu turno. Además, puedes lanzar uno de tus trucos de Psion que tenga un tiempo de lanzamiento de una acción en lugar de uno de esos ataques.",
     "n": 6,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Flesh Weaver",
     "t": "gratis",
     "texto": "Cuando usas Mutable Form, puedes gastar un Psionic Energy Die adicional para ganar los siguientes beneficios mientras el rasgo está activo: Organic Defense. Ganas un bonificador de +2 a la CA. Empowered Healing. Cuando lanzas un conjuro con un espacio de conjuro que restaura Puntos de Golpe a una o más criaturas, puedes gastar un Psionic Energy Die, tirarlo, y sumar el número obtenido a la cantidad de Puntos de Golpe recuperados.",
     "n": 6,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Improved Mutable Form",
     "t": "pasiva",
     "texto": "Cuando usas Mutable Form, la duración aumenta a 10 minutos y ganas uno de los siguientes beneficios de tu elección, cuyos efectos duran hasta que Mutable Form termine: Stony Epidermis. Tienes ventaja en las tiradas de salvación de Constitución para mantener la concentración. Además, elige uno de los siguientes tipos de daño: ácido, contundente, frío, fuego, relámpago, perforante, veneno, cortante o trueno. Ganas resistencia al tipo de daño elegido. Superior Stride. Mientras no llevas puesta armadura, puedes tomar la acción de Correr como acción adicional, y tienes una Velocidad de Escalada y una Velocidad de Nado iguales a tu Velocidad. Unnatural Flexibility. Ganas un bonificador de +1 a la CA, y tu cuerpo, junto con cualquier equipo que lleves puesto o cargado, se vuelve maleable. Puedes moverte a través de cualquier espacio tan estrecho como 1 pulgada, y puedes gastar 5 pies de movimiento para escapar de ataduras no mágicas o terminar la condición de Agarrado.",
     "n": 10,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Life-Bending Weapons",
     "t": "pasiva",
     "texto": "Tu arma queda envuelta en energía negativa, e irradias energía psiónica curativa de vida. Cuando impactas a un objetivo con una tirada de ataque usando tu Organic Weapon, tira un Psionic Energy Die. El objetivo recibe daño necrótico extra igual al número obtenido. Esta tirada no gasta el dado. Alternativamente, cuando impactas a una criatura con tu Organic Weapon, puedes decidir gastar un Psionic Energy Die y tirarlo. El objetivo recibe daño necrótico extra igual a la tirada, y cada criatura de tu elección en una Emanación de 30 pies originada en ti recupera Puntos de Golpe iguales al número obtenido más tu modificador de Inteligencia. Una vez que usas este rasgo, no puedes hacerlo de nuevo hasta el inicio de tu próximo turno.",
     "n": 14,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    }
   ]
  },
  "psykinetic": {
   "n": "Psykinetic",
   "rasgos": [
    {
     "nombre": "Psykinetic Spells",
     "t": "pasiva",
     "texto": "Cuando alcanzas un nivel de Psion especificado en la tabla de Psykinetic Spells, de ahí en adelante siempre tienes los conjuros listados preparados: Nube de dagas, Levitar, Escudo y Onda atronadora (Nivel 3); Lentitud y Telekinetic Crush (Nivel 5); Esfera elástica de Otiluke y Dar forma a la piedra (Nivel 7); Telequinesis y Muro de fuerza (Nivel 9).",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Stronger Telekinesis",
     "t": "pasiva",
     "texto": "Cuando lanzas Mano de mago, su alcance aumenta en 30 pies cuando lo lanzas, y la mano puede cargar hasta 20 libras.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Telekinetic Techniques",
     "t": "pasiva",
     "texto": "Cuando usas Telekinetic Propel, puedes tirar 1d4 y usar el número obtenido en lugar de gastar un Psionic Energy Die. Además, cuando un objetivo falla la tirada de salvación contra tu Telekinetic Propel, puedes imponerle uno de los siguientes efectos a ese objetivo: Boost. La Velocidad del objetivo aumenta en 10 pies hasta el inicio de tu próximo turno. Disorient. El objetivo no puede hacer Ataques de Oportunidad hasta el inicio de su próximo turno. Telekinetic Bolt. El objetivo recibe daño de fuerza igual al número obtenido en el Psionic Energy Die.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Destructive Trance",
     "t": "gratis",
     "texto": "Al inicio de tu turno, puedes gastar un Psionic Energy Die para entrar en un estado destructivo. Durante los próximos 10 minutos, ganas una Velocidad de Vuelo de 20 pies y puedes flotar, y cuando lanzas un conjuro de Psion que gasta un espacio de conjuro, puedes tirar tu Psionic Energy Die y sumar el número obtenido a una tirada de daño de ese conjuro. Esta tirada no gasta el Psionic Energy Die.",
     "n": 6,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Rebounding Field",
     "t": "reaccion",
     "texto": "Cuando lanzas Escudo en respuesta a ser impactado por una tirada de ataque y haces que el ataque desencadenante falle, puedes gastar un Psionic Energy Die para lanzar la fuerza de vuelta al atacante. El atacante hace una tirada de salvación de Destreza. Tira un Psionic Energy Die. En una salvación fallida, el atacante recibe daño de fuerza igual a la cantidad obtenida más tu modificador de Inteligencia. En una salvación exitosa, el atacante recibe solo la mitad de ese daño. Independientemente de si el objetivo falla o tiene éxito en la tirada de salvación, tú ganas Puntos de Golpe Temporales iguales a la cantidad de daño infligido.",
     "n": 6,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Enhanced Telekinetic Crush",
     "t": "gratis",
     "texto": "Cuando lanzas Telekinetic Crush, puedes gastar un Psionic Energy Die para modificar el conjuro de forma que, ya sea que una criatura falle o tenga éxito en la tirada de salvación contra el conjuro, su Velocidad se reduce a la mitad hasta el inicio de tu próximo turno. Además, puedes tirar el Psionic Energy Die gastado y sumar el número obtenido a una tirada de daño del conjuro.",
     "n": 10,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Heightened Telekinesis",
     "t": "pasiva",
     "texto": "Puedes lanzar Telequinesis sin gastar un espacio de conjuro gastando en su lugar cuatro Psionic Energy Dice. Cuando lanzas Telequinesis sin gastar un espacio de conjuro usando este rasgo, puedes modificar el conjuro para que no requiera Concentración. Si lo haces, la duración del conjuro se convierte en 1 minuto para ese lanzamiento, y puedes hacer objetivo a criaturas y objetos Gargantuescos.",
     "n": 14,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    }
   ]
  },
  "telepath": {
   "n": "Telepath",
   "rasgos": [
    {
     "nombre": "Mind Infiltrator",
     "t": "pasiva",
     "texto": "Cuando lanzas Detectar pensamientos, puedes gastar un Psionic Energy Die para modificar el conjuro de manera que no requiera componentes de conjuro o Concentración. Además, cuando usas el efecto de Leer Pensamientos del conjuro, el objetivo no sabe que estás sondeando su mente si falla la tirada de salvación de Sabiduría.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Telepath Spells",
     "t": "pasiva",
     "texto": "Cuando alcanzas un nivel de Psion especificado en la tabla de Telepath Spells, de ahí en adelante siempre tienes los conjuros listados preparados: Perdición, Orden imperiosa, Detectar pensamientos y Mind Spike (Nivel 3); Contrahechizo y Lentitud (Nivel 5); Compulsión y Confusión (Nivel 7); Modificar memoria y Yolande's Regal Presence (Nivel 9).",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Telepathic Distraction",
     "t": "reaccion",
     "texto": "Cuando una criatura que puedes ver dentro del alcance de tu telepatía impacta con una tirada de ataque, puedes tomar una reacción para tirar un Psionic Energy Die y restar el número obtenido de la tirada de ataque, causando potencialmente que el ataque falle. El dado se gasta únicamente si el objetivo falla el ataque.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Bulwark Mind",
     "t": "gratis",
     "texto": "Al inicio de tu turno, puedes gastar un Psionic Energy Die para fortalecer tu mente y entrar en un estado fortificado. Durante los próximos 10 minutos, tienes resistencia al daño psíquico; y siempre que hagas una tirada de salvación de Inteligencia, Sabiduría o Carisma, añades una tirada de tu Psionic Energy Die a la salvación. Tirar el Psionic Energy Die no lo gasta. No puedes usar este beneficio si tienes la condición de Incapacitado.",
     "n": 6,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Potent Thoughts",
     "t": "pasiva",
     "texto": "Tienes telepatía con un alcance de 60 pies. Además, sumas tu modificador de Inteligencia al daño que infliges con cualquier truco de Psion.",
     "n": 6,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Telepathic Bolstering",
     "t": "reaccion",
     "texto": "Cuando tú o una criatura que puedes ver dentro del alcance de tu telepatía falla una prueba de característica o falla con una tirada de ataque, puedes tomar una reacción para gastar un Psionic Energy Die. Tira el dado y suma el número obtenido al d20, pudiendo potencialmente convertir una prueba fallida en un éxito o un fallo en un impacto. El Psionic Energy Die solo se gasta si la prueba tiene éxito o si el ataque impacta.",
     "n": 10,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Scramble Minds",
     "t": "pasiva",
     "texto": "Puedes lanzar Confusión sin gastar un espacio de conjuro gastando en su lugar cuatro Psionic Energy Dice. Cuando lanzas Confusión sin un espacio de conjuro usando este rasgo, puedes modificar el conjuro para que el radio de la Esfera del conjuro se convierta en 30 pies y puedes elegir a una criatura que puedas ver en el área del conjuro para que tenga éxito automáticamente en su tirada de salvación contra el conjuro. Además, cuando una criatura bajo el efecto del conjuro comienza su turno, tú eliges su comportamiento de la tabla para ese turno en lugar de que la criatura tire para determinar su comportamiento.",
     "n": 14,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    }
   ]
  },
  "psi-warper": {
   "n": "Psi Warper",
   "rasgos": [
    {
     "n": 3,
     "nombre": "Conjuros de Psi Warper",
     "t": "pasiva",
     "texto": "A los niveles 3, 5, 7 y 9 amplías tu lista de conjuros preparados con los conjuros de esta subclase.",
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "n": 3,
     "nombre": "Teleportation",
     "t": "pasiva",
     "texto": "Puedes lanzar Paso brumoso sin gastar un espacio de conjuro, y debes terminar un Descanso Largo antes de poder lanzarlo de esta manera de nuevo. También puedes recuperar su uso gastando un Dado de Energía Psiónica (sin requerir acción).",
     "manual": true,
     "usos": 1,
     "reset": "largo"
    },
    {
     "n": 3,
     "nombre": "Warp Propel",
     "t": "pasiva",
     "texto": "Cuando un objetivo falla su tirada de salvación contra tu Telekinetic Propel, en lugar de empujarlo, puedes teletransportarlo a un espacio desocupado que puedas ver a 30 pies o menos de ti que esté en posición horizontal respecto a ti.",
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "n": 6,
     "nombre": "Warp Space",
     "t": "pasiva",
     "texto": "Cuando lanzas Hacer añicos, puedes gastar un Dado de Energía Psiónica para modificar el conjuro y que el radio de su Esfera pase a ser de 20 pies. Además, las criaturas que fallan la tirada de salvación contra el conjuro son atraídas en línea recta hacia [NO CONFIRMADO].",
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "n": 10,
     "nombre": "Duplicitous Target",
     "t": "reaccion",
     "texto": "Cuando una criatura que puedes ver hace una tirada de ataque contra ti, puedes usar una Reacción para gastar un Dado de Energía Psiónica y elegir a una criatura voluntaria que puedas ver a 30 pies o menos de ti que no tenga la condición de Incapacitado. Tú y la criatura voluntaria se teletransportan, intercambiando lugares. La criatura se convierte entonces en el objetivo de la tirada de ataque.",
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "n": 14,
     "nombre": "Mass Teleportation",
     "t": "accion",
     "texto": "Como acción Mágica, gastas cuatro Dados de Energía Psiónica y eliges criaturas Enormes o más pequeñas a 30 pies o menos de ti, hasta un número de criaturas igual a tu modificador de Inteligencia (mínimo una criatura). Cada criatura elegida es teletransportada a un espacio desocupado que puedas ver a 150 pies o menos de ti. Una criatura involuntaria que supere una tirada de salvación de Sabiduría contra tu CD de salvación de conjuros no se ve afectada.",
     "manual": true,
     "usos": 0,
     "reset": "largo"
    }
   ]
  }
 }
};

/* Conjuros nuevos de la lista del Psion (los que no estaban en la biblioteca) */
export const PSION_CONJUROS_NUEVOS: Record<string, any> = {
 "bleeding-darkness": {
  "nombre": "Bleeding Darkness",
  "nivel": 3,
  "tiempo": "accion",
  "alcance": "60 pies",
  "dur": "Concentración, hasta 1 minuto",
  "conc": true,
  "ritual": false,
  "salv": "CON",
  "ataque": false,
  "dados": "",
  "desc": "Componentes: V, S, M (un vial de tinta rara con un valor de 50+ PO). Creas un vacío de tinta en una Esfera de 10 pies de radio en un punto que puedas ver por encima de ti dentro del alcance. Cuando lanzas el conjuro, una Oscuridad mágica se derrama de la esfera, llenando un Cilindro de 10 pies de radio y 40 pies de alto originado desde la Esfera hasta el inicio de tu próximo turno. El Cilindro es Terreno Difícil, y ninguna luz (mágica o de otro tipo) puede iluminar el área. Cuando la Oscuridad aparece, cada criatura en el área debe tener éxito en una tirada de salvación de Constitución o recibir 3d8 de daño de frío y tener la condición Cegado hasta el final de su próximo turno. Una criatura también hace esta salvación cuando entra al área del conjuro por primera vez en un turno o termina su turno allí. Una criatura hace esta salvación solo una vez por turno. Hasta que el conjuro termine, puedes tomar una acción mágica para mover la Esfera hasta 20 pies horizontalmente y causar que la Esfera derrame Oscuridad mágica hasta el inicio de tu próximo turno. Usando un espacio de conjuro de nivel superior. El daño aumenta en 1d8 por cada nivel de espacio de conjuro por encima de 3.",
  "clases": [
   "lib:psion",
   "brujo",
   "mago"
  ]
 },
 "ectoplasmic-trail": {
  "nombre": "Ectoplasmic Trail",
  "nivel": 2,
  "tiempo": "adicional",
  "alcance": "Personal",
  "dur": "Instantánea",
  "conc": false,
  "ritual": false,
  "salv": "",
  "ataque": false,
  "dados": "",
  "desc": "Componentes: V, S. Te envuelves en espíritus que dejan ectoplasma a tu paso hasta el final de tu turno. Mientras estás envuelto, puedes moverte a través de espacios ocupados como si fueran Terreno Difícil, y el movimiento no provoca Ataques de Oportunidad. Si terminas tu turno en tal espacio, eres empujado al último espacio desocupado en el que estuviste. Mientras estás envuelto, siempre que entras en el espacio de una criatura, la criatura queda cubierta de ectoplasma hasta el final de tu próximo turno. Una criatura cubierta de ectoplasma tiene su Velocidad reducida en 10 pies y recibe 2d8 de daño necrótico al inicio de su turno. Una criatura solo puede ser cubierta de ectoplasma una vez durante un turno. Usando un espacio de conjuro de nivel superior. Mientras estás envuelto, tu Velocidad aumenta en 10 pies por cada nivel de espacio de conjuro por encima de 2.",
  "clases": [
   "lib:psion",
   "brujo"
  ]
 },
 "ego-whip": {
  "nombre": "Ego Whip",
  "nivel": 2,
  "tiempo": "reaccion",
  "alcance": "120 pies",
  "dur": "Instantánea",
  "conc": false,
  "ritual": false,
  "salv": "CAR",
  "ataque": false,
  "dados": "",
  "desc": "Componentes: V. La criatura hace una tirada de salvación de Carisma. En una salvación fallida, el objetivo debe restar 1d8 de la prueba de característica o tirada de salvación.",
  "clases": [
   "lib:psion"
  ]
 },
 "enemies-abound": {
  "nombre": "Enemies Abound",
  "nivel": 3,
  "tiempo": "accion",
  "alcance": "120 pies",
  "dur": "Concentración, hasta 1 minuto",
  "conc": true,
  "ritual": false,
  "salv": "INT",
  "ataque": false,
  "dados": "",
  "desc": "Componentes: V, S. Elige una criatura que puedas ver dentro del alcance. El objetivo debe tener éxito en una tirada de salvación de Inteligencia o tener la condición de Asustado por la duración. Mientras esté Asustado, el objetivo pierde la capacidad de distinguir a un amigo de un enemigo y se ve afectado de las siguientes maneras: El objetivo considera a todas las criaturas que puede ver como enemigos; siempre que el objetivo elija a una criatura distinta a él mismo para un ataque, conjuro u otra habilidad, debe elegir al azar de entre las criaturas que puede ver dentro del alcance de ese ataque, conjuro u otra habilidad; el objetivo debe hacer un Ataque de Oportunidad cada vez que sea capaz de hacerlo. Cada vez que el objetivo recibe daño, hace otra tirada de salvación de Inteligencia. En una salvación exitosa, el conjuro termina.",
  "clases": [
   "bardo",
   "lib:psion",
   "hechicero",
   "brujo",
   "mago"
  ]
 },
 "intellect-fortress": {
  "nombre": "Intellect Fortress",
  "nivel": 3,
  "tiempo": "accion",
  "alcance": "30 pies",
  "dur": "Concentración, hasta 1 hora",
  "conc": true,
  "ritual": false,
  "salv": "INT",
  "ataque": false,
  "dados": "",
  "desc": "Componentes: V. Por la duración, una criatura voluntaria que puedas ver dentro del alcance tiene resistencia al daño psíquico, así como ventaja en tiradas de salvación de Inteligencia, Sabiduría y Carisma. Usando un espacio de conjuro de nivel superior. Puedes hacer objetivo a una criatura adicional por cada nivel de espacio de conjuro por encima de 3.",
  "clases": [
   "artifice",
   "bardo",
   "lib:psion",
   "hechicero",
   "brujo",
   "mago"
  ]
 },
 "life-inversion-field": {
  "nombre": "Life Inversion Field",
  "nivel": 4,
  "tiempo": "accion",
  "alcance": "Personal",
  "dur": "Concentración, hasta 1 minuto",
  "conc": true,
  "ritual": false,
  "salv": "CON",
  "ataque": false,
  "dados": "",
  "desc": "Componentes: V, S. Un aura irradia de ti en una Emanación de 30 pies por la duración. Cuando creas el aura, recuperas 4d8 Puntos de Golpe. Siempre que recuperas Puntos de Golpe, puedes elegir a una criatura que puedas ver en el aura y forzarla a hacer una tirada de salvación de Constitución. En una salvación fallida, la criatura recibe daño necrótico igual a la mitad de la cantidad de Puntos de Golpe que recuperaste (redondeando hacia arriba). Una criatura hace esta salvación solo una vez por turno. Usando un espacio de conjuro de nivel superior. La curación aumenta en 1d8 por cada nivel de espacio de conjuro por encima de 4.",
  "clases": [
   "clerigo",
   "lib:psion",
   "hechicero"
  ]
 },
 "life-siphon": {
  "nombre": "Life Siphon",
  "nivel": 1,
  "tiempo": "accion",
  "alcance": "120 pies",
  "dur": "Instantánea",
  "conc": false,
  "ritual": false,
  "salv": "",
  "ataque": true,
  "dados": "",
  "desc": "Componentes: S. Disparas un orbe de energía psiónica alimentado por tu fuerza vital hacia una criatura que puedas ver dentro del alcance. Haz una tirada de ataque de conjuro a distancia contra el objetivo. En un impacto, el objetivo recibe 1d10 de daño psíquico y puedes gastar un Dado de Golpe para aumentar el daño en 1d10. Usando un espacio de conjuro de nivel superior. El daño aumenta en 1d10 y el número de Dados de Golpe que puedes gastar aumenta en uno por cada nivel de espacio de conjuro por encima de 1.",
  "clases": [
   "lib:psion"
  ]
 },
 "mental-prison": {
  "nombre": "Mental Prison",
  "nivel": 6,
  "tiempo": "accion",
  "alcance": "60 pies",
  "dur": "Concentración, hasta 1 minuto",
  "conc": true,
  "ritual": false,
  "salv": "INT",
  "ataque": false,
  "dados": "",
  "desc": "Componentes: S. Intentas vincular a una criatura dentro de una celda ilusoria que solo ella percibe. Una criatura que puedas ver dentro del alcance debe tener éxito en una tirada de salvación de Inteligencia o recibir 8d10 de daño psíquico y tener la condición de Hechizado por la duración. En una salvación exitosa, el objetivo recibe solo la mitad del daño y el conjuro termina. Mientras esté Hechizado, el objetivo tiene la condición de Apresado y percibe el área alrededor de su espacio como peligrosa para sí mismo en alguna forma que tú crees. Podrías causar que el objetivo se perciba rodeado por fuego, cuchillas flotantes, o fauces horribles llenas de dientes goteantes. Cualquiera que sea la forma que tome la ilusión, el objetivo no puede ver ni escuchar nada más allá de ella. Si el objetivo es movido fuera de la ilusión, hace un ataque cuerpo a cuerpo a través de ella, o pasa cualquier parte de su cuerpo a través de ella, el objetivo recibe 5d10 de daño psíquico y el conjuro termina.",
  "clases": [
   "bardo",
   "lib:psion",
   "hechicero",
   "mago"
  ]
 },
 "psionic-blast": {
  "nombre": "Psionic Blast",
  "nivel": 6,
  "tiempo": "accion",
  "alcance": "Personal",
  "dur": "Instantánea",
  "conc": false,
  "ritual": false,
  "salv": "INT",
  "ataque": false,
  "dados": "",
  "desc": "Componentes: V, S, M. Desatas un estallido conmocionante de energía psiónica. Cada criatura en un Cono de 60 pies originado en ti hace una tirada de salvación de Inteligencia. En una salvación fallida, la criatura recibe 6d8 de daño psíquico y tiene la condición de Aturdido hasta el inicio de tu próximo turno. En una salvación exitosa, la criatura recibe solo la mitad de ese daño. Usando un espacio de conjuro de nivel superior. El daño aumenta en 1d8 por cada nivel de espacio de conjuro por encima de 6.",
  "clases": [
   "lib:psion",
   "mago"
  ]
 },
 "psychic-scream": {
  "nombre": "Psychic Scream",
  "nivel": 9,
  "tiempo": "accion",
  "alcance": "90 pies",
  "dur": "Instantánea",
  "conc": false,
  "ritual": false,
  "salv": "INT",
  "ataque": false,
  "dados": "",
  "desc": "Componentes: S. Desatas el poder de tu mente para destruir el intelecto de hasta diez criaturas de tu elección que puedas ver dentro del alcance. Las criaturas que tienen una puntuación de Inteligencia de 2 o menor no se ven afectadas. Cada objetivo debe hacer una tirada de salvación de Inteligencia. En una salvación fallida, el objetivo recibe 14d6 de daño psíquico y tiene la condición de Aturdido. En una salvación exitosa, el objetivo recibe solo la mitad de ese daño. Si el objetivo se reduce a 0 Puntos de Golpe por este daño, su cabeza explota si tiene una. Al final de cada uno de sus turnos, el objetivo Aturdido repite la salvación, terminando la condición en sí mismo en un éxito.",
  "clases": [
   "bardo",
   "lib:psion",
   "hechicero",
   "brujo"
  ]
 },
 "raulothim-s-psychic-lance": {
  "nombre": "Raulothim’s Psychic Lance",
  "nivel": 4,
  "tiempo": "accion",
  "alcance": "120 pies",
  "dur": "Instantánea",
  "conc": false,
  "ritual": false,
  "salv": "INT",
  "ataque": false,
  "dados": "",
  "desc": "Componentes: V. Desatas una lanza brillante de poder psíquico desde tu frente hacia una criatura que puedas ver dentro del alcance. Alternativamente, puedes pronunciar el nombre de una criatura (un seudónimo, título o apodo no funciona). Si el objetivo nombrado está dentro del alcance, se convierte en el objetivo del conjuro incluso si no puedes verlo. Si el objetivo nombrado no está dentro del alcance o usas un nombre no válido, la lanza se disipa sin efecto. El objetivo debe hacer una tirada de salvación de Inteligencia. En una salvación fallida, el objetivo recibe 7d6 de daño psíquico y tiene la condición de Incapacitado hasta el inicio de tu próximo turno. En una salvación exitosa, el objetivo recibe solo la mitad de ese daño. Usando un espacio de conjuro de nivel superior. El daño aumenta en 1d6 por cada nivel de espacio de conjuro por encima de 4.",
  "clases": [
   "bardo",
   "lib:psion",
   "hechicero",
   "brujo",
   "mago"
  ]
 },
 "summon-astral-entity": {
  "nombre": "Summon Astral Entity",
  "nivel": 3,
  "tiempo": "accion",
  "alcance": "90 pies",
  "dur": "Concentración, hasta 1 hora",
  "conc": true,
  "ritual": false,
  "salv": "",
  "ataque": false,
  "dados": "",
  "desc": "Componentes: V, S, M (una gema o cristal con valor de 300+ PO). Llamas al espíritu de una entidad psiónica. Se manifiesta en un espacio desocupado que puedas ver dentro del alcance y usa el bloque de estadísticas Psionic Spirit. Cuando lanzas el conjuro, elige Crystal Entity, Ectoplasmic Entity o Ghostly Entity. La criatura se asemeja a una entidad astral de ese tipo, lo que determina ciertos detalles en su bloque de estadísticas. La criatura desaparece cuando se reduce a 0 Puntos de Golpe o cuando el conjuro termina. La criatura es un aliado para ti y tus aliados. En combate, la criatura comparte tu cuenta de Iniciativa, pero toma su turno inmediatamente después del tuyo. Obedece tus comandos verbales (no requiere acción por tu parte). Si no emites ninguno, toma la acción de Esquivar y usa su movimiento para evitar peligros. Usando un espacio de conjuro de nivel superior. Usa el nivel del espacio de conjuro para el nivel del conjuro en el bloque de estadísticas. Psionic Spirit: Aberración Mediana, Neutral. CA: 11 + nivel del conjuro + 2 (solo Crystal Entity). Puntos de Golpe: 40 + 10 por cada nivel de conjuro por encima de 3. Velocidad: 30 pies; Vuelo 30 pies (solo Ghostly Entity). FUE 16 (+3), DES 12 (+1), CON 11 (+0), INT 16 (+3), SAB 12 (+1), CAR 10 (+0). Inmunidades: Daño Psíquico. Sentidos: Visión en la Oscuridad 60 pies; Percepción Pasiva 11. Lenguajes: Habla Profunda, Telepatía 60 pies. Traits: Incorporeal Passage (solo Ectoplasmic y Ghostly Entity). El espíritu puede moverse a través de otras criaturas y objetos como si fueran Terreno Difícil. Si el espíritu termina su turno en tal espacio, es empujado al espacio desocupado más cercano y recibe 1d10 de daño de fuerza por cada 5 pies viajados. Acciones: Multiattack. El espíritu hace un número de ataques igual a la mitad del nivel de este conjuro (redondeando hacia abajo). Crystal Strike (solo Crystal Entity). Tirada de Ataque Cuerpo a Cuerpo: Bonificador igual a tu modificador de ataque de conjuro, alcance 5 pies. Impacto: 1d10 + 3 + el nivel del conjuro de daño perforante. Ectoplasmic Splash (solo Ectoplasmic Entity). Tirada de Ataque a Distancia: Bonificador igual a tu modificador de ataque de conjuro, alcance 30 pies. Impacto: 1d6 + 3 + el nivel del conjuro de daño psíquico. Impacto o Fallo: Cada criatura en una Emanación de 5 pies originada en e incluyendo al objetivo tiene su Velocidad reducida en 5 pies hasta el final de su próximo turno. Ephemeral Ray (solo Ghostly Entity). Tirada de Ataque a Distancia: Bonificador igual a tu modificador de ataque de conjuro, alcance 120 pies. Impacto: 1d8 + 3 + el nivel del conjuro de daño psíquico. Reacciones: Shard Swarm (solo Crystal Entity). Desencadenante: El espíritu es impactado por una tirada de ataque cuerpo a cuerpo. Respuesta: El espíritu reduce a la mitad el daño (redondeando hacia abajo) que recibe de ese ataque. El espíritu luego puede teletransportarse a un espacio desocupado que pueda ver a 30 pies o menos de sí mismo.",
  "clases": [
   "lib:psion",
   "hechicero",
   "brujo",
   "mago"
  ]
 },
 "tasha-s-mind-whip": {
  "nombre": "Tasha’s Mind Whip",
  "nivel": 2,
  "tiempo": "accion",
  "alcance": "90 pies",
  "dur": "Instantánea",
  "conc": false,
  "ritual": false,
  "salv": "INT",
  "ataque": false,
  "dados": "",
  "desc": "Componentes: V. Azotas psíquicamente a una criatura que puedas ver dentro del alcance. El objetivo debe hacer una tirada de salvación de Inteligencia. En una salvación fallida, el objetivo recibe 3d6 de daño psíquico y no puede hacer Ataques de Oportunidad hasta el final de su próximo turno. En su próximo turno, debe elegir si obtiene un movimiento, una acción o una acción adicional; solo obtiene uno de los tres. En una salvación exitosa, el objetivo recibe solo la mitad del daño. Usando un espacio de conjuro de nivel superior. Puedes hacer objetivo a una criatura adicional por cada nivel de espacio de conjuro por encima de 2.",
  "clases": [
   "lib:psion",
   "hechicero",
   "mago"
  ]
 },
 "telekinetic-crush": {
  "nombre": "Telekinetic Crush",
  "nivel": 3,
  "tiempo": "accion",
  "alcance": "120 pies",
  "dur": "Instantánea",
  "conc": false,
  "ritual": false,
  "salv": "FUE",
  "ataque": false,
  "dados": "",
  "desc": "Componentes: V. Creas un campo de fuerza telequinética aplastante en un Cubo de 30 pies dentro del alcance. Cada criatura en el área hace una tirada de salvación de Fuerza. En una salvación fallida, el objetivo recibe 5d6 de daño de fuerza y tiene la condición de Derribado. En una salvación exitosa, el objetivo recibe solo la mitad de ese daño. Usando un espacio de conjuro de nivel superior. El daño aumenta en 1d6 por cada nivel de espacio de conjuro por encima de 3.",
  "clases": [
   "lib:psion",
   "hechicero",
   "brujo"
  ]
 },
 "telekinetic-fling": {
  "nombre": "Telekinetic Fling",
  "nivel": 0,
  "tiempo": "accion",
  "alcance": "60 pies",
  "dur": "Instantánea",
  "conc": false,
  "ritual": false,
  "salv": "",
  "ataque": true,
  "dados": "",
  "desc": "Componentes: S. Elige un objeto no mágico que pese de 1 a 5 libras dentro de un radio de 10 pies de ti que no esté siendo vestido ni transportado para envolverlo en energía psiónica y dispararlo a una criatura dentro del alcance. Haz una tirada de ataque de conjuro a distancia contra el objetivo. En un impacto, el objetivo recibe 1d10 de daño de fuerza. En un impacto o fallo, el objeto cae al suelo sin sufrir daños. Cantrip Upgrade. El daño aumenta en 1d10 cuando alcanzas los niveles 5 (2d10), 11 (3d10) y 17 (4d10).",
  "clases": [
   "lib:psion"
  ]
 },
 "thought-form": {
  "nombre": "Thought Form",
  "nivel": 6,
  "tiempo": "adicional",
  "alcance": "Personal",
  "dur": "Concentración, hasta 1 minuto",
  "conc": true,
  "ritual": false,
  "salv": "",
  "ataque": false,
  "dados": "",
  "desc": "Componentes: V, M (materia cerebral en un recipiente con un valor de 500+ PO). Te transformas brevemente en un espíritu psiónico. Ganas los siguientes beneficios hasta que el conjuro termina: Ghostly Form. Tienes Inmunidad al daño de Veneno y Psíquico, y tienes Inmunidad a la condición de Agotamiento. Incorporeal Movement. Tienes una Velocidad de Vuelo de 60 pies y puedes flotar. Puedes moverte a través de espacios ocupados como si fueran Terreno Difícil. Si terminas tu turno en tal espacio, recibes 1d10 de daño de fuerza. Si el conjuro termina en dicho espacio, eres empujado al último espacio desocupado en el que estuviste. Psionic Recharge. Como una acción mágica, puedes tocar a una criatura (que puedes ser tú mismo) y tirar 1d6. La criatura recupera un espacio de conjuro gastado, cuyo nivel es igual a la mitad del número obtenido (redondeando hacia arriba) o menor. Una vez que una criatura recupera un espacio de conjuro con este conjuro, esa criatura no puede volver a hacerlo hasta terminar un descanso largo.",
  "clases": [
   "lib:psion"
  ]
 }
};

/* Lista de conjuros del Psion (nombres como están en la biblioteca): se les agrega la clase lib:psion */
export const PSION_LISTA: string[] = [
 "Abrir",
 "Agrandar/Reducir",
 "Alterar los recuerdos",
 "Amistad",
 "Animar objetos",
 "Antipatía/Simpatía",
 "Apariencia",
 "Armadura de mago",
 "Asesino fantasmal",
 "Baile irresistible de Otto",
 "Barrera de cuchillas",
 "Bleeding Darkness",
 "Boca mágica",
 "Calentar metal",
 "Calmar emociones",
 "Cambiar de forma",
 "Campo antimagia",
 "Caída de pluma",
 "Clarividencia",
 "Clavo mental",
 "Comprender idiomas",
 "Compulsión",
 "Confusión",
 "Conocer las leyendas",
 "Contactar con otro plano",
 "Corona de la locura",
 "Círculo de teletransportación",
 "Desintegrar",
 "Despertar",
 "Desplazamiento entre planos",
 "Destierro",
 "Detectar magia",
 "Detectar pensamientos",
 "Disco flotante de Tenser",
 "Disipar magia",
 "Dominar monstruo",
 "Dominar persona",
 "Don de lenguas",
 "Dormir",
 "Ectoplasmic Trail",
 "Ego Whip",
 "Embelesar",
 "Encantar animal",
 "Encontrar el camino",
 "Enemies Abound",
 "Engañar",
 "Enlace telepático de Rary",
 "Ensueño",
 "Escudo",
 "Escudriñar",
 "Espejismo arcano",
 "Estática Sináptica",
 "Excursión etérea",
 "Fragmento Mental",
 "Fuerza fantasmal",
 "Geas",
 "Golpe certero",
 "Guardia de cuchillas",
 "Hablar con los Animales",
 "Hacer añicos",
 "Hechizar monstruo",
 "Hechizar persona",
 "Identificar",
 "Ilusión menor",
 "Ilusión programada",
 "Imagen mayor",
 "Imagen múltiple",
 "Imagen silenciosa",
 "Imponer maldición",
 "Indetectable",
 "Inmovilizar monstruo",
 "Inmovilizar persona",
 "Intellect Fortress",
 "Invertir la gravedad",
 "Invisibilidad",
 "Invisibilidad mejorada",
 "Invocar aberración",
 "Jaula de fuerza",
 "Laberinto",
 "Labia",
 "Levitar",
 "Libertad de movimiento",
 "Life Inversion Field",
 "Life Siphon",
 "Localizar animales o plantas",
 "Localizar criatura",
 "Localizar objeto",
 "Luces danzantes",
 "Luz",
 "Mal de ojo",
 "Mano de mago",
 "Marchitamiento horrendo de Abi-Dalzim",
 "Mensaje",
 "Mensajero animal",
 "Mental Prison",
 "Mente en blanco",
 "Miedo",
 "Mover la tierra",
 "Ojo arcano",
 "Onda atronadora",
 "Orden imperiosa",
 "Palabra de poder: aturdir",
 "Palabra de poder: fortalecer",
 "Palabra de poder: matar",
 "Palabra de poder: sanar",
 "Parar el tiempo",
 "Patrón hipnótico",
 "Polimorfar",
 "Potenciar característica",
 "Presciencia",
 "Prestidigitación",
 "Proyección astral",
 "Proyectar imagen",
 "Psionic Blast",
 "Psychic Scream",
 "Puerta dimensional",
 "Raulothim’s Psychic Lance",
 "Recado",
 "Remendar",
 "Risa horrible de Tasha",
 "Salto",
 "Santuario",
 "Silencio",
 "Sordera/Ceguera",
 "Sugestión",
 "Sugestión en masa",
 "Summon Astral Entity",
 "Susurros discordantes",
 "Tasha’s Mind Whip",
 "Telekinetic Crush",
 "Telekinetic Fling",
 "Telepatía",
 "Telequinesis",
 "Teletransporte",
 "Terreno alucinatorio",
 "Terror abyecto",
 "Thought Form",
 "Ver invisibilidad",
 "Visión veraz",
 "Volar",
 "Zancada prodigiosa",
 "Zona de la verdad"
];
