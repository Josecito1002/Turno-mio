/* Subclases de prueba de Unearthed Arcana 2025 y 2026 que faltaban (lotes 23 a 28 de Gemini): Apocalyptic, Arcane Subclasses,
   Mystic, Villainous Options (y Revisited) y Underdark Options. Etiqueta Playtest: no son oficiales todavía.
   Los nombres propios sin traducción oficial se dejan en inglés. Las usa `npm run db:actualizar-clase -- playtest`. */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const PLAYTEST_2026: Record<string, Record<string, { n: string; rasgos: any[] }>> = {
 "monje": {
  "tattooed-warrior": {
   "n": "Guerrero Tatuado",
   "rasgos": [
    {
     "nombre": "Tatuajes Mágicos",
     "t": "pasiva",
     "texto": "Obtienes los tatuajes mágicos descritos en otros rasgos de esta subclase. Los tatuajes aparecen en tu cuerpo donde desees. El daño o las lesiones no merman el funcionamiento de tus tatuajes mágicos. Un tatuaje mágico puede verse como una marca, escarificación, una marca de nacimiento, patrones de escamas o cualquier otra alteración cosmética. Si el efecto de un tatuaje requiere una tirada de salvación, la CD es igual a 8 más tu modificador de Sabiduría más tu bonificador por competencia. Tu aptitud mágica para los conjuros otorgados por un tatuaje es Sabiduría. Cada vez que terminas un descanso largo, puedes remodelar uno de tus tatuajes mágicos, cambiando la opción que elegiste de una lista a otra opción de la misma lista.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Tatuajes de Bestia",
     "t": "pasiva",
     "texto": "Obtienes dos tatuajes de animales. Eliges dos tatuajes de las siguientes opciones. Bat: Conoces el truco Luces danzantes. También obtienes sentido ciego con un alcance de 10 pies. Butterfly: Conoces el truco Luz. Cuando haces un salto de altura, puedes usar tu modificador de Destreza en lugar de tu modificador de Fuerza para determinar qué tan alto puedes saltar. Crane: Conoces el truco Orientación. Cuando fallas a una criatura con un ataque otorgado por tu Ráfaga de golpes, tienes ventaja en tu próxima tirada de ataque contra esa criatura antes del final de tu siguiente turno. Horse: Conoces el truco Mensaje. Cuando gastas 1 Punto de Enfoque para usar Paso del viento, tu velocidad aumenta en 10 pies hasta el inicio de tu siguiente turno. Tortoise: Conoces el truco Perdonar la vida. Cuando gastas 1 Punto de Enfoque para usar Defensa paciente, tienes un bonificador de +1 a la CA hasta el inicio de tu siguiente turno.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Tatuaje Celestial",
     "t": "pasiva",
     "texto": "Obtienes un tatuaje mágico adicional que representa un fenómeno celestial. Elige un tatuaje de las siguientes opciones. Comet: Cuando tomas la acción de Buscar, puedes gastar 1 Punto de Enfoque para tirar tu dado de Artes Marciales y sumar el número sacado a la prueba de Sabiduría. Eclipse: Cuando tomas la acción de Esconderse, puedes gastar 1 Punto de Enfoque para tirar tu dado de Artes Marciales y sumar el número sacado a la prueba de Destreza (Sigilo). Sunburst: Cuando tomas la acción de Estudiar, puedes gastar 1 Punto de Enfoque para tirar tu dado de Artes Marciales y sumar el número sacado a la prueba de Inteligencia.",
     "n": 6,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Tatuaje de la Naturaleza",
     "t": "pasiva",
     "texto": "Obtienes un tatuaje mágico adicional que representa un rasgo natural. Elige un tatuaje de las siguientes opciones. Sea Storm: Obtienes resistencia a uno de los siguientes tipos de daño de tu elección: frío, relámpago o trueno. Cada vez que terminas un descanso corto o largo, o usas tu rasgo Metabolismo asombroso, puedes cambiar esta elección. Volcano: Obtienes resistencia a uno de los siguientes tipos de daño de tu elección: ácido, fuego o veneno. Cada vez que terminas un descanso corto o largo, o usas tu rasgo Metabolismo asombroso, puedes cambiar esta elección.",
     "n": 11,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Tatuaje de Monstruo",
     "t": "pasiva",
     "texto": "Obtienes un tatuaje mágico que representa a una criatura poderosa. Elige un tatuaje de las siguientes opciones. Beholder: Al inicio de tu turno, puedes gastar 1 Punto de Enfoque para obtener una velocidad de vuelo igual a tu velocidad durante 10 minutos. Mientras tengas esta velocidad de vuelo, puedes flotar. Además, como acción mágica, puedes gastar 1 Punto de Enfoque para disparar cuatro rayos desde tus ojos. Puedes dispararlos a un objetivo que puedas ver a no más de 120 pies o a varios. Haz un ataque de conjuro a distancia por cada rayo, usando Sabiduría como tu aptitud mágica. Si impacta, el ataque inflige daño de fuerza igual a una tirada de tu dado de Artes Marciales más tu modificador de Sabiduría. Chromatic Dragon: Cuando tomas la acción de Atacar en tu turno, puedes gastar 1 Punto de Enfoque para reemplazar uno de tus ataques con una exhalación de energía mágica en un cono de 30 pies. Elige un tipo de daño: ácido, frío, fuego, relámpago o veneno. Cada criatura en esa área hace una tirada de salvación de Destreza. Si falla la salvación, una criatura recibe daño del tipo elegido igual a dos tiradas de tu dado de Artes Marciales más tu modificador de Sabiduría. Si tiene éxito en la salvación, una criatura recibe solo la mitad de ese daño. Displacer Beast: Cuando gastas un Punto de Enfoque para usar Ráfaga de golpes o Paso del viento, puedes gastar 1 Punto de Enfoque para lanzar el conjuro Reflejos como parte de esa acción adicional. Troll: Al inicio de cada uno de tus turnos, recuperas puntos de golpe iguales a 5 más tu modificador de Sabiduría si estás malherido y tienes al menos 1 punto de golpe. Cualquier parte del cuerpo cercenada vuelve a crecer después de que terminas un descanso corto o largo.",
     "n": 17,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    }
   ]
  },
  "warrior-of-venom": {
   "n": "Guerrero del Veneno",
   "rasgos": [
    {
     "nombre": "Arsenal Potente",
     "t": "pasiva",
     "texto": "Obtienes un Kit de envenenador (Poisoner's Kit) y tienes competencia con él. Puedes crear un Veneno Básico durante 1 día (8 horas de trabajo). Además, cada vez que infliges daño de veneno con un rasgo de Monje o un arma de Monje, puedes cambiar ese tipo de daño a daño de ácido.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Envenenar Arma",
     "t": "gratis",
     "texto": "Al inicio de tu turno, puedes gastar 1 Punto de Concentración para aplicar una toxina producida por tu sangre a un arma de Monje que sostengas. Una criatura que reciba daño de esa arma queda sometida a uno de los siguientes efectos de toxina (eliges al aplicar la toxina). Slowing Toxin reduce su Velocidad a la mitad, evita que tome Reacciones, y solo puede tomar una acción o una Acción adicional en su turno (no ambas) hasta el inicio de tu próximo turno. Venom inflige daño de veneno al objetivo igual a dos tiradas de tu dado de Artes Marciales. La toxina retiene su potencia durante 1 minuto o hasta que una criatura reciba daño del arma.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Toque Tóxico",
     "t": "accion",
     "texto": "Como Acción mágica, puedes gastar 1 Punto de Concentración para aplicar una potente toxina a una criatura que toques. El objetivo hace una tirada de salvación de Constitución; si falla, tiene la condición Envenenado durante 1 minuto. Mientras esté Envenenado, se ve afectado por un efecto de tu elección. Intoxicant hace que tenga la condición Hechizado por la duración o hasta que tú o tus aliados le infrinjáis daño. Sedative lo hace caer dormido con la condición Inconsciente (otra criatura puede usar una acción para sacudirlo y despertarlo). Truth Serum impide que comunique una mentira a sabiendas por la duración.",
     "n": 6,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Refinador de Toxinas",
     "t": "pasiva",
     "texto": "Tu cuerpo puede filtrar el veneno. Ganas Inmunidad al daño de veneno. Cada vez que seas sometido a daño de veneno, tus opciones de Envenenar Arma infligen cada una daño de veneno adicional igual a una tirada de tu dado de Artes Marciales, y no puedes volver a ganar este beneficio hasta el final de tu próximo turno. Además, cada vez que ingieras un veneno, recuperas una cantidad de Puntos de Golpe igual a una tirada de tu dado de Artes Marciales.",
     "n": 11,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Sangre Tóxica",
     "t": "pasiva",
     "texto": "Cada vez que una criatura te impacte con una tirada de ataque cuerpo a cuerpo, el atacante recibe 1d6 de daño de veneno. Si estás Malherido (Bloodied), el atacante recibe en su lugar daño de veneno igual a una tirada de tu dado de Artes Marciales.",
     "n": 11,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Aliento Alucinógeno",
     "t": "accion",
     "texto": "Cuando tomas la acción de Atacar en tu turno, puedes gastar 2 Puntos de Concentración y reemplazar uno de tus ataques con una exhalación de vapores alucinógenos hacia una criatura que puedas ver a 30 pies. El objetivo hace una tirada de salvación de Constitución. Si falla, recibe daño de veneno igual a tres tiradas de tu dado de Artes Marciales y tiene la condición Asustado durante 1 minuto o hasta que reciba daño. Mientras está Asustado, el objetivo usa la acción Correr (Dash) y se aleja de ti por la ruta más segura en cada uno de sus turnos a menos que no haya dónde moverse. En una salvación exitosa, una criatura solo recibe la mitad del daño.",
     "n": 17,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    }
   ]
  }
 },
 "druida": {
  "circle-of-preservation": {
   "n": "Círculo de la Preservación",
   "rasgos": [
    {
     "nombre": "Conjuros de Círculo de la Preservación",
     "t": "pasiva",
     "texto": "Cuando alcanzas un nivel de druida especificado, de ahí en adelante siempre tienes preparados los siguientes conjuros. Nivel 3: Bendecir, Restablecimiento menor, Protección contra el veneno y Santuario. Nivel 5: Faro de esperanza y Crecimiento vegetal. Nivel 7: Aura de vida y Custodia contra la muerte. Nivel 9: Restablecimiento mayor y Consagrar.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Tierra Preservada",
     "t": "adicional",
     "texto": "Como acción adicional, puedes gastar un uso de tu Forma Salvaje para llenar un cubo de 15 pies originado en un punto en el suelo que puedas ver a 120 pies de ti con energía revitalizante. El efecto dura 1 minuto, o hasta que tengas la condición de incapacitado, estés a más de 120 pies de distancia del cubo, o mueras. Cada vez que una criatura (incluyéndote a ti) termina su turno en el cubo, puedes otorgarle uno de los siguientes beneficios. Bolster: La criatura obtiene puntos de golpe temporales iguales a 1d4 más tu nivel de druida. Purify: Terminas un efecto en la criatura que le cause la condición de asustado o envenenado. Además, vegetación no mágica nativa de la región brota en el suelo dentro del cubo. Esta vegetación desaparece cuando el efecto termina. Como acción adicional en turnos posteriores, puedes mover el cubo hasta 30 pies a otra área en el suelo a no más de 120 pies de ti.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Estudiante de la Preservación",
     "t": "pasiva",
     "texto": "Tus estudios te otorgan los siguientes beneficios. Frugal Casting: Cuando lanzas un conjuro de druida, puedes lanzarlo sin componentes materiales, excepto los componentes materiales que sean consumidos por el conjuro o que tengan un costo especificado en el conjuro. Además, cada vez que lanzas un conjuro de druida que requiere un componente material que es consumido por el conjuro, hay un 10 por ciento de probabilidad de que el componente no se consuma como parte de ese lanzamiento. Tool Proficiency: Obtienes competencia con un tipo de Herramientas de artesano de tu elección.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Preservación Mejorada",
     "t": "pasiva",
     "texto": "Tu Tierra Preservada se vuelve más poderosa de las siguientes maneras. Fortify Protectors: Mientras estén dentro del cubo creado por tu Tierra Preservada, tú y tus aliados obtienen un bonificador a las tiradas de salvación de Constitución igual a tu modificador de Sabiduría (mínimo de +1). Reject Desecrators: Cada vez que el cubo creado por tu Tierra Preservada entra en el espacio de un enemigo y cada vez que un enemigo entra en el cubo o termina su turno allí, ese enemigo hace una tirada de salvación de Sabiduría contra tu CD de salvación de conjuros. Si falla la salvación, el enemigo recibe 2d10 de daño radiante, y su velocidad se reduce a la mitad hasta el final de su siguiente turno conforme nuevos brotes se elevan para entorpecerlo. Si tiene éxito en la salvación, el enemigo sufre solo la mitad del daño. Un enemigo hace esta salvación solo una vez por turno.",
     "n": 6,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Restauración Facilitada",
     "t": "accion",
     "texto": "Puedes lanzar Restablecimiento menor o Restablecimiento mayor sin gastar un espacio de conjuro ni requerir componentes de conjuro. Puedes usar este rasgo para lanzar un conjuro de esta forma una cantidad de veces igual a tu modificador de Sabiduría (mínimo de una vez), y recuperas todos los usos gastados cuando terminas un descanso largo.",
     "n": 10,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Tierra Sacrosanta",
     "t": "reaccion",
     "texto": "El tamaño del cubo creado por tu Tierra Preservada aumenta a un cubo de 30 pies. Además, cuando una criatura que puedes ver en el área de tu Tierra Preservada es impactada por una tirada de ataque, puedes tomar una reacción para reducir a la mitad el daño de ese ataque contra la criatura.",
     "n": 14,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    }
   ]
  },
  "circle-of-the-titan": {
   "n": "Círculo del Titán",
   "rasgos": [
    {
     "nombre": "Conjuros de Círculo del Titán",
     "t": "pasiva",
     "texto": "Cuando alcanzas niveles específicos de Druida, siempre tienes preparados los siguientes conjuros: Agrandar o reducir, Taumaturgia y Onda atronadora a nivel 3; Miedo a nivel 5; Escudo de fuego a nivel 7; y Onda destructiva a nivel 9. Puedes lanzar estos conjuros mientras estás en tu Forma de Titán (Forma de Titán).",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Forma de Titán",
     "t": "accion",
     "texto": "Cuando usas Forma Salvaje, puedes adoptar una Forma de Titán (Forma de Titán), eligiendo entre los bloques de Behemoth, Leviathan e Insectoid. Puedes permanecer en esta forma por 10 minutos, en lugar de un número de horas. Cada forma gana beneficios adicionales en niveles especificados, y aplicas los rasgos de tus formas de Bestia a tu Forma de Titán. Determinas libremente su aspecto. Bloque Behemoth: Tamaño Grande, Enorme (nivel 10+) o Gargantuesco (nivel 14+); tu Tipo de Criatura y Alineamiento no cambian; CA 13 + Sabiduría; Puntos de Golpe temporales iguales a 4 veces tu nivel de Druida; Velocidad 40 pies, Trepar 40 pies; Fuerza y Destreza iguales a Sabiduría (las demás sin cambios); Visión en la oscuridad 60 pies; Rasgo Siege Monster (doble daño a objetos y estructuras). Acciones: Multiattack (Nivel 5+) haces dos ataques de Rend. Rend: Ataque de conjuro cuerpo a cuerpo, alcance 10 pies, Impacto: 1d8 + Sabiduría de daño cortante (aumenta a 2d8 en nivel 6, y 3d8 en nivel 12). Incandescent Breath: Gastas un espacio de conjuro nivel 1+; Salvación de Destreza contra tu CD en línea de 5x60 pies, Fallo: 2d10 de daño radiante por nivel del espacio gastado, Éxito: mitad de daño. Acción adicional Rampager (Nivel 10+): Gastas un espacio nivel 1+ y te mueves hasta la mitad de tu Velocidad sin provocar ataques de oportunidad; al entrar en el espacio de un enemigo que es al menos dos tamaños menor que tú por primera vez en un turno, hace salvación de Fuerza contra tu CD, Fallo: queda Derribado (si ya estaba Derribado, recibe 1d10 de daño contundente por nivel del espacio). Bloque Leviathan: Igual base, pero Velocidad 40 pies, Nadar 40 pies; rasgo Anfibio (puedes respirar aire y agua); su Rend hace daño contundente. Bloque Insectoid: Igual base, pero Velocidad 40 pies, Volar 40 pies (Nivel 10+); rasgo Flyby (Nivel 10+, no provocas ataque de oportunidad al salir del alcance de un enemigo volando); su Rend hace daño perforante. Acción Energizing Pollen: Gastas un espacio nivel 1+, te mueves hasta la mitad de tu Velocidad sin provocar ataques de oportunidad emitiendo polen curativo; al moverte a 5 pies de otra criatura durante este movimiento, puedes restaurarle una cantidad de Puntos de Golpe igual a 2d6 por nivel del espacio (una criatura solo puede recibir esta curación una vez por turno). Acción adicional Toxic Deluge (Nivel 10+): Gastas un espacio nivel 1+, emitiendo un miasma tóxico; salvación de Constitución contra tu CD en Emanación de 10 pies, Fallo: 2d4 de daño de veneno por nivel del espacio y el objetivo tiene la condición Envenenado hasta el inicio de tu próximo turno.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Impacto Terrible",
     "t": "pasiva",
     "texto": "Tu Forma de Titán trae mayor devastación. Elemental Rend: Cada vez que impactes con el ataque Rend de tu Forma de Titán, puedes hacer que inflija tu elección de daño de ácido, frío, fuego, relámpago o trueno en lugar de su tipo normal. Shock Wave: Una vez por turno, inmediatamente después de moverte al menos la mitad de tu Velocidad, puedes crear una onda de choque en una Emanación de 10 pies originada en ti. Cada criatura en la Emanación debe superar una tirada de salvación de Constitución contra tu CD de conjuros o quedar con la condición Derribado.",
     "n": 6,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Estrago Primordial",
     "t": "pasiva",
     "texto": "El poder indómito surge en ti. Huge Size: Puedes elegir ser de tamaño Enorme al asumir tu Forma de Titán si estás en un espacio lo suficientemente grande. Toughened Hide: Inmediatamente después de asumir una Forma de Titán Enorme o más grande, puedes gastar un espacio de conjuro de nivel 1+. Durante la duración de la forma, obtienes un bonificador a tu CA igual a la mitad del nivel del espacio gastado (redondeando hacia arriba). Above It All: Mientras eres Enorme o más grande en tu Forma de Titán, el Terreno Difícil causado por nieve densa, hielo, escombros o maleza no te cuesta movimiento adicional.",
     "n": 10,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Apetito Monstruoso",
     "t": "pasiva",
     "texto": "Tu transformación encarna el vasto tamaño y terror. Gargantuan Size: Puedes elegir ser de tamaño Gargantuesco al asumir tu Forma de Titán si el espacio lo permite. Grappling Rend: Una vez por turno, mientras seas Enorme o mayor y golpees a una criatura con el Rend de tu Forma de Titán, puedes aplicarle la condición Apresado (la CD de escape equivale a tu CD de conjuros). Solo puedes tener a un objetivo apresado de esta manera a la vez. Swallow: Como Acción adicional mientras eres Gargantuesco, elige una criatura Grande o más pequeña Apresada por ti. El objetivo hace una tirada de salvación de Fuerza contra tu CD. Si falla, te tragas al objetivo y la condición Apresado termina en él. Una criatura tragada tiene las condiciones Cegado y Apresado, tiene Cobertura Total contra ataques y efectos fuera de tu estómago, y recibe daño de ácido al inicio de cada uno de tus turnos. Tira una cantidad de d12s igual a tu modificador de Sabiduría para este daño. El número de criaturas que puedes tener tragadas a la vez es igual a tu modificador de Sabiduría (mínimo de una). Debes mantener la Concentración para retener a las criaturas tragadas en tu estómago. Si pierdes la Concentración o dejas tu Forma de Titán, regurgitas a todas las criaturas tragadas, cada una de las cuales cae en un espacio a menos de 10 pies de ti y tiene la condición Derribado.",
     "n": 14,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    }
   ]
  },
  "esporas-playtest": {
   "n": "Círculo de las Esporas (Playtest 2026)",
   "rasgos": [
    {
     "nombre": "Conjuros del Círculo",
     "t": "pasiva",
     "texto": "Tu círculo te otorga ciertos conjuros que siempre tienes preparados al llegar a los niveles 3, 5, 7 y 9 de druida.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Halo de Esporas",
     "t": "reaccion",
     "texto": "Esporas invisibles llenan una emanación de 10 pies originada en ti, dándote telepatía a 10 pies de alcance. Cuando una criatura que ves se mueve dentro de tu emanación o empieza su turno allí, puedes usar tu reacción para infectarla. Hace una salvación de Constitución contra tu CD; si falla, recibe 1d4 de daño necrótico (aumenta a 1d6 a nivel 6, 1d8 a nivel 10 y 1d10 a nivel 14). Si tiene éxito, tiene desventaja en su próxima tirada de ataque antes del final de su turno.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Entidad Simbiótica",
     "t": "adicional",
     "texto": "Como acción adicional, puedes gastar un uso de tu Forma Salvaje para despertar tus esporas. Obtienes puntos de golpe temporales iguales a cuatro veces tu nivel de druida por 10 minutos (termina antes si lo descartas, estás Incapacitado o lo usas de nuevo). Mientras tus esporas están despiertas, puedes tirar el dado de daño de Halo de Esporas una segunda vez para sumarlo al total (Deadly Halo), y una vez por turno infliges 1d6 de daño necrótico extra con un ataque cuerpo a cuerpo (arma o impacto sin armas).",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Infestación Fúngica",
     "t": "reaccion",
     "texto": "Si una Bestia o Humanoide Pequeño o Mediano muere a menos de 10 pies, usas tu reacción para reanimarlo con 1 punto de golpe. Si Entidad Simbiótica está activa, puedes transferir tus puntos de golpe temporales a él. Usa el bloque del Zombi, se anima por 1 hora y luego muere (o si lo terminas como acción adicional o cae a 0 puntos de golpe). Actúa justo después de tu turno y obedece órdenes mentales; sin órdenes, Esquiva y evita peligro. Tienes usos iguales a tu modificador de Sabiduría (mínimo 1) por descanso largo.",
     "n": 6,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Estallido Explosivo",
     "t": "pasiva",
     "texto": "Cuando una criatura Muerta Viviente creada por ti muere, explota. Cada criatura de tu elección a menos de 10 pies hace una salvación de Constitución contra tu CD de conjuros, recibiendo 2d8 de daño necrótico si falla, o la mitad si tiene éxito.",
     "n": 10,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Cuerpo Fúngico",
     "t": "pasiva",
     "texto": "Tienes inmunidad a las condiciones Cegado, Sordo, Asustado y Envenenado. Todo golpe crítico contra ti cuenta como normal, a menos que tengas la condición Incapacitado. Si tienes la condición Inconsciente (la cual no reduce tu velocidad a 0), tus esporas controlan tu movimiento en tu turno manteniéndote cerca de aliados y lejos del peligro.",
     "n": 14,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    }
   ]
  }
 },
 "guerrero": {
  "gladiator": {
   "n": "Gladiador",
   "rasgos": [
    {
     "nombre": "Brutalidad",
     "t": "gratis",
     "texto": "Una vez por turno, cuando impactas a una criatura con una tirada de ataque usando un arma cuerpo a cuerpo, puedes añadir uno de los siguientes efectos de Brutalidad de tu elección. Puedes hacer esto un número de veces igual a tu modificador de Carisma (mínimo de una vez), y recuperas todos los usos gastados cuando terminas un descanso corto o largo. Bleed: Puedes activar la propiedad de maestría Sap además de una propiedad de maestría diferente que estés usando con esa arma, y el objetivo recibe daño adicional igual a tu modificador de Carisma (mínimo de 1 de daño). El tipo del daño adicional es el mismo tipo que el del arma. Bluff: Puedes activar la propiedad de maestría Vex además de una propiedad de maestría diferente que estés usando con esa arma, y tienes ventaja en la próxima tirada de salvación que hagas antes del final de tu siguiente turno. Stumble: Puedes activar la propiedad de maestría Topple además de una propiedad de maestría diferente que estés usando con esa arma, y en su próximo turno, el objetivo solo puede tomar una acción o una acción adicional, no ambas.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Teatralidad de Combate",
     "t": "pasiva",
     "texto": "Obtienes los siguientes beneficios. Athletic Flair: Cada vez que haces una prueba de Destreza (Acrobacias) o Fuerza (Atletismo), obtienes un bonificador a la prueba igual a tu modificador de Carisma (mínimo de +1). Bonus Proficiency: Obtienes competencia en una de estas habilidades de tu elección: Acrobacias, Atletismo, Engaño, Intimidación o Interpretación.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Parada con Floritura",
     "t": "reaccion",
     "texto": "Cuando un enemigo te impacta con una tirada de ataque cuerpo a cuerpo, puedes tomar una reacción para sumar tu modificador de Carisma (mínimo de +1) a tu CA contra el ataque, lo que potencialmente causa que el ataque falle. Flourish Counter: Si esta reacción hace que el ataque falle, puedes tomar represalias con un poderoso contraataque como parte de la misma reacción. Haz una tirada de ataque con un arma cuerpo a cuerpo contra la criatura desencadenante. Si este ataque impacta, puedes usar uno de tus efectos de Brutalidad en el objetivo sin gastar un uso de ese rasgo. Una vez que este contraataque impacta, no puedes usar este rasgo para hacer otro contraataque hasta que termines un descanso largo. También puedes restaurar tu uso de este contraataque gastando un uso de Nuevas energías (no requiere acción).",
     "n": 7,
     "manual": true,
     "usos": 1,
     "reset": "largo"
    },
    {
     "nombre": "Brutalidades Audaces",
     "t": "pasiva",
     "texto": "Los siguientes efectos se añaden a tus opciones de Brutalidad. Rive: Puedes activar la propiedad de maestría Cleave además de una propiedad de maestría diferente que estés usando con esa arma, y puedes sumar tu modificador de aptitud al daño del ataque adicional realizado como parte de la activación de esa propiedad. Rush: Puedes activar la propiedad de maestría Push además de una propiedad de maestría diferente que estés usando con esa arma, y puedes moverte inmediatamente hasta tu velocidad sin provocar ataques de oportunidad. Stagger: Puedes activar la propiedad de maestría Slow además de una propiedad de maestría diferente que estés usando con esa arma, y el objetivo tiene desventaja en la próxima tirada de salvación que haga antes del final de su siguiente turno.",
     "n": 10,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Resurgir Brutal",
     "t": "pasiva",
     "texto": "Cada vez que usas tu rasgo Nuevas energías para recuperar puntos de golpe, recuperas un uso gastado de Brutalidad. También recuperas un uso gastado de Brutalidad cada vez que usas tu Acción súbita.",
     "n": 15,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Mutilar",
     "t": "gratis",
     "texto": "Cuando impactas a una criatura malherida con una tirada de ataque, puedes intentar herirla críticamente. El objetivo hace una tirada de salvación de Constitución (CD 8 más tu modificador de Carisma y tu bonificador por competencia). Si falla la salvación, el objetivo sufre los siguientes efectos. Maimed: Si el objetivo toma la acción de Atacar, solo puede hacer un ataque. Sluggish: La velocidad del objetivo se reduce a la mitad y tiene un penalizador de -2 a su Clase de Armadura. Estos efectos duran hasta que el objetivo recupere puntos de golpe. Una vez que un objetivo falla su tirada de salvación contra este rasgo, no puedes usarlo de nuevo hasta que termines un descanso largo.",
     "n": 18,
     "manual": true,
     "usos": 1,
     "reset": "largo"
    }
   ]
  },
  "hell-knight": {
   "n": "Caballero Infernal",
   "rasgos": [
    {
     "nombre": "Don Diabólico",
     "t": "pasiva",
     "texto": "Devil's Sight: Puedes ver normalmente en Luz Tenue y Oscuridad (tanto mágica como no mágica) a menos de 120 pies de ti. Devil's Talents: Conoces Infernal, el idioma de los diablos (si ya lo conoces, aprendes otro idioma a tu elección). Además, ganas competencia en una de las siguientes habilidades a tu elección: Engaño, Interpretación o Juego de Manos.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Arma Forjada en el Infierno",
     "t": "pasiva",
     "texto": "Cuando usas la acción de Atacar, puedes imbuir de fuego infernal cada arma que sostengas, transformándola en un arma forjada en el infierno (Arma Forjada en el Infierno). Permanece transformada hasta que uses este rasgo de nuevo, tengas la condición Inconsciente, el arma esté a más de 5 pies de ti por 1 minuto o más, o termines el efecto antes (sin requerir acción). Mientras empuñas esta arma, emite Luz Tenue en un radio de 5 pies, y cada vez que infliges daño con el arma, puede infligir daño de frío, fuego o necrótico (o su daño normal), a tu elección al momento de imbuir el arma.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Herida Infernal",
     "t": "pasiva",
     "texto": "Tienes un Dado de Herida Infernal (Herida Infernal Die), que es 1d6. Cuando impactas a una criatura con tu Arma Forjada en el Infierno, puedes infligir daño adicional igual a una tirada de tu dado (del mismo tipo que elegiste al imbuir el arma). También le provocas al objetivo una herida infernal si no tiene una. Mientras esté herido de esta forma, el objetivo recibe daño del tipo elegido igual a una tirada de tu dado al inicio de cada uno de sus turnos. La herida dura 1 minuto, hasta que el objetivo recupere Puntos de Golpe, o hasta que el objetivo (u otra criatura a 5 pies de él) use una acción para restañar la herida. Puedes usar este rasgo una cantidad de veces igual a tu modificador de Constitución (mínimo de una vez), y recuperas los usos al terminar un Descanso Corto o Largo.",
     "n": 3,
     "manual": true,
     "usos": "max(1, CON)",
     "reset": "corto"
    },
    {
     "nombre": "Heridas Avanzadas",
     "t": "pasiva",
     "texto": "Cuando tiras tu Dado de Herida Infernal, puedes aplicar uno de los siguientes efectos (solo una vez hasta el inicio de tu próximo turno). Si sacas un 6, el efecto tiene una bonificación de Devil's Luck. Purulence of Minauros: Pus cáustico brota; cada enemigo en una Emanación de 5 pies centrada en el objetivo recibe daño de ácido igual a tu modificador de Constitución y el objetivo queda Envenenado hasta el final de su próximo turno. Devil's Luck: Los que reciben daño de ácido sufren un penalizador de -1 a su CA hasta el final de tu próximo turno. Rupture of Cania: El objetivo recibe daño de fuerza igual a tu mod. de Constitución. Devil's Luck: El objetivo resta 1d6 a su próxima tirada de salvación antes del final de tu próximo turno. Stygian Gangrene: El objetivo recibe daño de frío igual a tu mod. de Constitución y no puede tomar Reacciones hasta el inicio de su próximo turno. Devil's Luck: La Velocidad del objetivo se reduce a la mitad hasta el final de su próximo turno.",
     "n": 7,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Equipo Infernal",
     "t": "pasiva",
     "texto": "Infernal Resilience: Al terminar un Descanso Corto o Largo, elige daño de frío, fuego o necrótico. Mientras lleves armadura Pesada o empuñes un Escudo, tienes Resistencia a ese daño hasta que elijas uno diferente con este rasgo. Unholy Power: Cuando tiras tu Dado de Herida Infernal, puedes tratar un resultado de 1 como un 6.",
     "n": 7,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Oleada de Fuego Infernal",
     "t": "pasiva",
     "texto": "Cuando usas tu Acción Súbita (Action Surge) mientras empuñas tu Arma Forjada en el Infierno, emanas fuego infernal en una Emanación de 20 pies originada en ti que dura hasta el final de tu próximo turno. Cada vez que una criatura que sufre una herida infernal comienza su turno dentro de la Emanación, recibe daño igual a dos tiradas de tu Dado de Herida Infernal en lugar de una.",
     "n": 10,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Desgracia del Diablo",
     "t": "reaccion",
     "texto": "Cuando una criatura con una herida infernal te impacta con una tirada de ataque, puedes usar una Reacción para tirar tu Dado de Herida Infernal y reducir el daño recibido en esa cantidad. Si sacas un 6, tira el dado de nuevo (hasta un máximo de tres tiradas en total) y reduce el daño por el total sumado. Además, si el ataque es un Impacto Crítico, se convierte en un impacto normal.",
     "n": 15,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Trato Infernal",
     "t": "pasiva",
     "texto": "Si sacas un 6 en tu Dado de Herida Infernal tres o más veces antes del inicio de tu próximo turno, ganas Inspiración Heroica. Puedes usar esta Inspiración de la siguiente forma: Si una criatura que ves a 120 pies de ti tira un d20 para una Prueba de d20 (D20 Test), puedes gastar tu Inspiración Heroica para forzarla a repetir la tirada. Si el resultado hace que el objetivo tenga éxito, tú recuperas un uso gastado de Indomable (Indomitable) o Nuevas Energías (Second Wind) a tu elección. Si falla, tú pierdes Puntos de Golpe iguales a 3d6 más tu nivel de Guerrero.",
     "n": 18,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    }
   ]
  }
 },
 "hechicero": {
  "defiled-sorcery": {
   "n": "Hechicería Profanada",
   "rasgos": [
    {
     "nombre": "Conjuros de Hechicería Profanada",
     "t": "pasiva",
     "texto": "Siempre que alcanzas un nivel de hechicero especificado en la tabla de conjuros de Defiler, de ahí en adelante siempre tienes preparados los conjuros listados. Nivel 3: Ceguera/sordera, Infligir heridas, Rayo de debilitamiento y Rayo de enfermedad. Nivel 5: Maldición y Toque vampírico. Nivel 7: Marchitar y Terreno alucinatorio. Nivel 9: Caparazón antivida y Contagio.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Profanar y Potenciar",
     "t": "gratis",
     "texto": "Una vez por turno, cuando tiras el daño de un conjuro que lanzas usando un espacio de conjuro, puedes desviar tu energía vital hacia el conjuro y potenciarlo. Tira un número de tus Dados de Golpe no gastados, hasta un número igual a la mitad del nivel del espacio de conjuro gastado (redondeando hacia arriba, mínimo de un dado), y añade el total sacado a una tirada de daño del conjuro. Esos Dados de Golpe se gastan entonces. Life Steal: En lugar de extraer de tu propia fuerza vital al usar este rasgo, puedes intentar robar vida a otra criatura que puedas ver a 30 pies de ti. Esa criatura hace una tirada de salvación de Constitución contra tu CD de salvación de conjuros; las criaturas que tienen inmunidad a la condición de fatiga superan automáticamente la salvación. Si falla la salvación, en lugar de tirar tus Dados de Golpe, tira un número de los Dados de Golpe no gastados de la criatura, hasta un número igual a la mitad del nivel del espacio gastado (redondeando hacia abajo, mínimo de un dado); luego añades ese total sacado a una tirada de daño del conjuro, y esos Dados de Golpe se gastan para la criatura. Una vez que una criatura falla su salvación contra Life Steal, no puedes usar Life Steal de nuevo hasta que termines un descanso largo, a menos que gastes 3 Puntos de Hechicería (no requiere acción) para restaurar tu uso de él.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Lanzador Corrupto",
     "t": "adicional",
     "texto": "Obtienes los siguientes beneficios. Defiler's Ward: Cuando tomas una acción adicional para transformar Puntos de Hechicería en un espacio de conjuro, puedes envolver tu cuerpo en una red protectora de energía profanadora. Tira un número de d6 igual al nivel del espacio de conjuro creado. Obtienes puntos de golpe temporales iguales al total sacado. Si una criatura te impacta con una tirada de ataque cuerpo a cuerpo mientras tienes puntos de golpe temporales, la criatura recibe daño necrótico o de veneno (tu elección) igual a tu modificador de Carisma. Strengthened Rot: El daño infligido por tus conjuros de hechicero y tus rasgos de hechicero ignora la resistencia al daño necrótico y de veneno.",
     "n": 6,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Aura Marchitante",
     "t": "pasiva",
     "texto": "Cuando usas tu rasgo Hechicería innata, un aura de magia profanadora llena una emanación de 15 pies originada en ti mientras tu Hechicería innata esté activa, otorgándote los siguientes beneficios adicionales. Defiling Shroud: Cuando un enemigo dentro del aura te impacta con una tirada de ataque, puedes reducir el daño total de ese ataque contra ti. La reducción es igual a tu modificador de Carisma. Essence Siphon: Cuando un enemigo muere dentro del aura, recuperas 1d4 Puntos de Hechicería. Una vez que usas este beneficio, no puedes recuperar Puntos de Hechicería de esta manera hasta que uses Hechicería innata de nuevo.",
     "n": 14,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Profanador Superior",
     "t": "pasiva",
     "texto": "Obtienes los siguientes beneficios. Fouled Soul: Tienes inmunidad a las condiciones de envenenado y fatiga. Furthered Defilement: El tamaño de tu Aura Marchitante aumenta a una emanación de 30 pies. Además, los enemigos no pueden recuperar puntos de golpe mientras estén en tu aura.",
     "n": 18,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    }
   ]
  },
  "demonic-sorcery": {
   "n": "Hechicería Demoníaca",
   "rasgos": [
    {
     "nombre": "Conjuros de Hechicería Demoníaca",
     "t": "pasiva",
     "texto": "Cuando alcanzas niveles específicos de Hechicero, siempre tienes preparados los siguientes conjuros: Perdición, Susurros disonantes, Crecimiento de púas y Telaraña a nivel 3; Lanzar maldición y Disipar magia a nivel 5; Insecto gigante y Terreno alucinatorio a nivel 7; Contactar con otro plano y Modificar memoria a nivel 9.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Ruptura Abisal",
     "t": "adicional",
     "texto": "Cuando usas tu Hechicería Innata (Innate Sorcery), creas una ruptura hacia el Abismo que llena una Esfera de 10 pies de radio centrada en un punto que puedas ver a 30 pies de ti. Al activar tu Hechicería Innata y como Acción adicional mientras esté activa, puedes elegir una de las opciones debajo. Mientras la ruptura persista, puedes mover el centro de la Esfera a un punto que puedas ver a 30 pies de ti al inicio de cada uno de tus turnos. Demonic Lash: Haz un ataque de conjuro cuerpo a cuerpo contra un objetivo a 5 pies de la ruptura. Si impacta, el objetivo recibe 1d8 de daño cortante y, si es de tamaño Grande o menor, puedes tirar de él hasta 10 pies hacia el centro de la Esfera. Terrifying Screams: Cada criatura en la ruptura debe superar una tirada de salvación de Sabiduría contra tu CD de conjuros o recibir 1d4 de daño psíquico.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Reino Abisal",
     "t": "accion",
     "texto": "Cuando gastas al menos 1 Punto de Hechicería como parte de una Acción mágica o una Acción adicional en tu turno, puedes arrastrar influencia del Abismo. Al hacerlo, creas una Emanación de 10 pies centrada en ti, o llenas la Esfera de tu Ruptura Abisal con magia de una de las capas del Abismo (CD equivale a tu CD de conjuros). Gaping Maw's Frenzy: Designa una dirección horizontal; cada criatura en el área que falle una tirada de salvación de Carisma debe usar todo su movimiento posible para moverse en esa dirección al inicio de su próximo turno por la ruta más segura. Maze of Azzatar: Salvación de Inteligencia; si falla, ganas los beneficios de la condición Invisible contra el objetivo hasta el inicio de tu próximo turno. Slime Pits' Haze: Salvación de Constitución; si falla, el objetivo tiene la condición Hechizado o Envenenado (tú eliges) hasta el inicio de tu próximo turno.",
     "n": 6,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Conducto Abisal",
     "t": "pasiva",
     "texto": "Rupture Expansion: El tamaño de tu Ruptura Abisal ahora es una Esfera de 30 pies de radio, y el área es Terreno Difícil para tus enemigos. Fiendish Servant: Siempre tienes preparado el conjuro Invocar infernal (Summon Fiend). Cuando lanzas el conjuro, puedes modificarlo para que no requiera Concentración. Al hacerlo, la duración del conjuro se vuelve 1 minuto para ese lanzamiento, y debes elegir Demonio al invocar al infernal. Además, el infernal tiene Ventaja en tiradas de ataque mientras esté dentro de tu Ruptura Abisal.",
     "n": 14,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Explosión Abisal",
     "t": "accion",
     "texto": "Como Acción mágica, llenas una Esfera de 30 pies de radio con una explosión de energía abisal. Cada criatura en la Esfera hace una tirada de salvación de Constitución contra tu CD. Si falla, una criatura recibe 8d6 de daño de fuerza (si no es un Infernal) y tiene la condición Incapacitado hasta el inicio de tu próximo turno. Una vez que usas este rasgo, no puedes volver a usarlo hasta que termines un Descanso Largo, a menos que gastes 7 Puntos de Hechicería (sin requerir acción) para restaurar su uso.",
     "n": 18,
     "manual": true,
     "usos": 1,
     "reset": "largo"
    }
   ]
  },
  "faerzress-sorcery": {
   "n": "Hechicería de Faerzress",
   "rasgos": [
    {
     "nombre": "Conjuros de Faerzress",
     "t": "pasiva",
     "texto": "Siempre tienes ciertos conjuros preparados tras alcanzar los niveles 3, 5, 7 y 9 de hechicero.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Zona de Faerzress",
     "t": "accion",
     "texto": "Como acción de Magia, gastas 3 Puntos de Hechicería para llenar un área a menos de 120 pies de ti (no mayor a un cubo de 40 pies) con faerzress por 24 horas. Las criaturas allí superan automáticamente las salvaciones contra Adivinación, los sensores/ojos mágicos no entran, y no se puede teletransportar a 1 milla o más desde o hacia allí. Está tenuemente iluminado, pero quienes tienen visión en la oscuridad ven en color y tienen ventaja en Percepción visual. El efecto se vuelve permanente tras 365 días consecutivos.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Inmunidad a Faerzress",
     "t": "pasiva",
     "texto": "Ignoras los efectos perjudiciales del faerzress. Las criaturas en el área afectada no superan automáticamente tus conjuros de Adivinación, tus sensores mágicos pueden entrar y los teletransportes de tus criaturas ignoran la restricción de distancia de faerzress.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Afinidad con Faerzress",
     "t": "pasiva",
     "texto": "Obtienes resistencia al daño por relámpago. También obtienes visión en la oscuridad a 60 pies (aumenta 30 pies si ya la tenías) y puedes distinguir colores en la oscuridad. Tienes ventaja en pruebas de Percepción visual en luz tenue o en la oscuridad. Además, tu Inmunidad a Faerzress se aplica a aliados a menos de 30 pies de ti.",
     "n": 6,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Conjuro de Faerzress",
     "t": "gratis",
     "texto": "Cuando criaturas fallan una salvación contra tu conjuro, puedes gastar 1 Punto de Hechicería para impregnar con faerzress a un objetivo que falló. Durante 1 minuto: no puede teletransportarse, no puede lanzar conjuros de Adivinación y tiene desventaja en salvaciones contra Adivinación.",
     "n": 14,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Paso de Faerzress",
     "t": "pasiva",
     "texto": "Siempre tienes Teletransportar preparado y puedes lanzarlo una vez sin espacio de conjuro por descanso largo. Además, al tirar en la tabla de resultados de teletransportación, eliges el resultado que quieras de los disponibles en tu nivel de familiaridad.",
     "n": 14,
     "manual": true,
     "usos": 1,
     "reset": "largo"
    },
    {
     "nombre": "Forma de Faerzress",
     "t": "pasiva",
     "texto": "Al usar tu Hechicería Innata, te vuelves pura energía faerzress. Conservas tu forma, recuerdos, habla y equipo. Ganas inmunidad a las condiciones Agarrado, Paralizado, Petrificado, Envenenado, Derribado y Apresado, y resistencia a todo daño menos fuerza y psíquico. Ganas velocidad de vuelo igual a tu velocidad y flotas. Puedes moverte por criaturas y objetos (como terreno difícil), pero recibes 1d10 de daño de fuerza si terminas el turno dentro de un objeto. Termina tras 1 minuto, al morir o si lo descartas. Un uso por descanso largo o gastando 7 Puntos de Hechicería.",
     "n": 18,
     "manual": true,
     "usos": 1,
     "reset": "largo"
    }
   ]
  },
  "ancestral-sorcery": {
   "n": "Hechicería Ancestral",
   "rasgos": [
    {
     "n": 3,
     "nombre": "Conjuros de Hechicería Ancestral",
     "t": "pasiva",
     "texto": "A los niveles 3, 5, 7 y 9 amplías tu lista de conjuros preparados con los conjuros de esta subclase.",
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "n": 3,
     "nombre": "Saber del Ancestro",
     "t": "pasiva",
     "texto": "Cuando haces una prueba de Inteligencia, obtienes un bonificador a la prueba igual a tu modificador de Carisma (mínimo de +1). También ganas competencia en una de estas habilidades a tu elección: Arcanos, Historia, Investigación, Naturaleza o Religión.",
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "n": 3,
     "nombre": "Semblante del Ancestro",
     "t": "pasiva",
     "texto": "Eliges la forma de tu ancestro, ya sea su apariencia en vida o una criatura simbólica. Mientras tu rasgo Hechicería Innata está activo, esta forma aparece en una neblina espectral a tu alrededor y tienes Ventaja en cualquier prueba de característica que hagas como parte de la acción de Influenciar.",
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "n": 6,
     "nombre": "Disrupción de Conjuros Superior",
     "t": "pasiva",
     "texto": "Siempre tienes preparados Contraconjuro y Disipar magia. Mientras tu rasgo Hechicería Innata está activo, puedes lanzar cada conjuro sin gastar un espacio de conjuro. Si lanzas Contraconjuro de esta manera, el objetivo tiene Desventaja en su tirada de salvación de Constitución. Si lanzas Disipar magia de esta manera, tienes Ventaja en tus pruebas de característica para terminar conjuros activos. Una vez que lanzas cualquiera de los conjuros sin espacio, debes terminar un Descanso Largo antes de poder volver a lanzarlo de esta forma.",
     "manual": true,
     "usos": 1,
     "reset": "largo"
    },
    {
     "n": 14,
     "nombre": "Lanzador Firme",
     "t": "pasiva",
     "texto": "Recibir daño no puede romper tu Concentración en conjuros de Hechicero.",
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "n": 14,
     "nombre": "Majestad Ancestral",
     "t": "pasiva",
     "texto": "Mientras tu rasgo Hechicería Innata está activo, estás rodeado por un aura mágica en una Emanación de 5 pies. Siempre que una criatura que puedas ver entre a la Emanación o termine su turno allí, puedes obligarla a hacer una tirada de salvación de Carisma. Si falla, el objetivo sufre la condición de Derribado o Asustado hasta el final de tu próximo turno, a tu elección. Una criatura hace esta salvación solo una vez por turno.",
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "n": 18,
     "nombre": "Custodia del Ancestro",
     "t": "pasiva",
     "texto": "Mientras tu rasgo Hechicería Innata está activo, tienes Ventaja en tiradas de salvación contra conjuros. Una vez durante cada uso de Hechicería Innata, cuando fallas una tirada de salvación contra un conjuro, puedes elegir tener éxito en su lugar.",
     "manual": true,
     "usos": 0,
     "reset": "largo"
    }
   ]
  }
 },
 "brujo": {
  "sorcerer-king-patron": {
   "n": "Patrón Rey Hechicero",
   "rasgos": [
    {
     "nombre": "Conjuros de Patrón Rey Hechicero",
     "t": "pasiva",
     "texto": "La magia de tu patrón asegura que siempre tengas ciertos conjuros listos; siempre que alcanzas un nivel de brujo especificado, de ahí en adelante siempre tienes los conjuros listados preparados. Nivel 3: Orden, Duelo compelido, Inmovilizar persona, Mind Spike y Castigo iracundo. Nivel 5: Miedo y Recado. Nivel 7: Compulsión y Castigo asombroso. Nivel 9: Dominar persona y Estática sináptica. Psionic Casting: Cuando lanzas un conjuro de la lista de Sorcerer-King Spells, puedes hacerlo sin componentes verbales o componentes materiales, excepto los componentes materiales que sean consumidos por el conjuro o que tengan un costo especificado en el conjuro.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Heraldo del Tirano",
     "t": "adicional",
     "texto": "Obtienes los siguientes beneficios. Intimidating Presence: Obtienes competencia en la habilidad de Intimidación si no la tienes ya. También tienes pericia en Intimidación. Voice of Tyranny: Puedes lanzar Orden como una acción adicional sin gastar un espacio de conjuro. Puedes hacerlo un número de veces igual a tu modificador de Carisma (mínimo de una vez), y recuperas todos los usos gastados cuando terminas un descanso largo.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Edicto Decisivo",
     "t": "gratis",
     "texto": "Cuando lanzas un conjuro usando un espacio de conjuro de Magia del Pacto, puedes causar que poder profano estalle en una emanación de 30 pies originada en ti. Por cada criatura que puedas ver en la emanación, elige uno de los siguientes efectos. Marshal: La criatura tiene ventaja en las tiradas de ataque hasta el final de su siguiente turno. Oppress: La criatura debe superar una tirada de salvación de Sabiduría contra tu CD de salvación de conjuros o tener la condición de asustado hasta el final de su siguiente turno. Una vez que usas este rasgo, no puedes hacerlo de nuevo hasta que termines un descanso corto o largo. También recuperas el uso de este rasgo cuando usas tu rasgo Astucia mágica.",
     "n": 6,
     "manual": true,
     "usos": 1,
     "reset": "corto"
    },
    {
     "nombre": "Reprensión Vengativa",
     "t": "reaccion",
     "texto": "Cuando un enemigo te impacta con una tirada de ataque, puedes tomar una reacción para forzar al enemigo a volver a tirar el d20, y el enemigo debe usar la nueva tirada. Si esta reacción convierte la tirada de ataque en un fallo, la criatura desencadenante recibe daño psíquico igual a tu nivel de brujo. Puedes usar este rasgo un número de veces igual a tu modificador de Carisma (mínimo de una vez), y recuperas todos los usos gastados cuando terminas un descanso largo.",
     "n": 10,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Tiranía Absoluta",
     "t": "pasiva",
     "texto": "Cada vez que lanzas Orden, puedes seleccionar a una criatura adicional dentro del alcance del conjuro. Además, una criatura asustada por ti falla automáticamente su tirada de salvación contra cualquier conjuro de Orden que lances.",
     "n": 14,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    }
   ]
  },
  "primordial-patron": {
   "n": "Patrón Primordial",
   "rasgos": [
    {
     "nombre": "Conjuros de Patrón Primordial",
     "t": "pasiva",
     "texto": "Eliges un elemento: Aire (daño de trueno), Tierra (daño de ácido), Fuego (daño de fuego) o Agua (daño de frío). Puedes cambiar tu elemento elegido (y tu patrón) siempre que ganes un nivel. La magia de tu patrón asegura que siempre tengas preparados los conjuros primordiales, junto con los conjuros de tu elemento, cuando alcances los niveles de Brujo especificados. Nivel 3 Primordiales: Orbe cromático, Visión en la oscuridad (Aire: Caída de pluma, Hacer añicos; Tierra: Enmarañar, Apertura; Fuego: Manos ardientes, Calentar metal; Agua: Alterar el propio aspecto, Cuchillo de hielo). Nivel 5 Primordiales: Arma elemental (Aire: Volar; Tierra: Crecimiento vegetal; Fuego: Bola de fuego; Agua: Caminar por el agua). Nivel 7 Primordiales: Invocar elemental (el elemento del espíritu coincide con tu elemento elegido) (Aire: Libertad de movimiento; Tierra: Esfera vitriólica; Fuego: Muro de fuego; Agua: Controlar el agua). Nivel 9 Primordiales: Comulgar con la naturaleza (Aire: Impacto del viento de acero; Tierra: Muro de piedra; Fuego: Descarga flamígera; Agua: Cono de frío).",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Nodo Elemental",
     "t": "accion",
     "texto": "Como Acción mágica, puedes crear una Esfera de magia elemental de 5 pies de radio centrada en un punto que puedas ver a 60 pies de ti (su magia se parece a tu elemento elegido). En turnos posteriores, puedes tomar una Acción adicional para mover el nodo hasta 30 pies. Cuando aparece el nodo, cada criatura excepto tú en el nodo hace una salvación de Destreza contra tu CD de conjuros; si falla, recibe 1d6 de daño del tipo de tu elemento, o la mitad de daño si tiene éxito. Una criatura también hace esta salvación cuando el nodo entra en su espacio, cuando entra en el nodo o termina su turno allí (solo una vez por turno). El nodo dura 1 minuto, hasta que lo descartes (sin acción) o uses este rasgo de nuevo. Una vez usado, no puedes volver a hacerlo hasta terminar un Descanso Corto o Largo a menos que gastes un espacio de conjuro de Magia del Pacto (sin acción) para restaurarlo. El daño aumenta a 2d6 (nivel 6) y 3d6 (nivel 14).",
     "n": 3,
     "manual": true,
     "usos": 1,
     "reset": "corto"
    },
    {
     "nombre": "Refugio Elemental",
     "t": "pasiva",
     "texto": "Elemental Protection: Mientras estés dentro de tu nodo, tienes un bonificador a la CA igual a tu modificador de Carisma (mínimo de 1). Elemental Teleport: Como Acción adicional, puedes teletransportarte dentro de tu nodo o al espacio desocupado más cercano a menos de 5 pies de él. Puedes usar este beneficio una cantidad de veces igual a tu mod. de Carisma (mínimo de una), y recuperas los usos al terminar un Descanso Largo.",
     "n": 6,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Protección Ancestral",
     "t": "pasiva",
     "texto": "Elemental Fortitude: Tienes Resistencia al tipo de daño de tu elemento elegido. Además, mientras estás dentro de tu Nodo Elemental, tienes Inmunidad a ese tipo de daño. Node Improvement: Tu Nodo Elemental es ahora una Esfera de 10 pies de radio.",
     "n": 10,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Presagio Elemental",
     "t": "pasiva",
     "texto": "Elemental Vortex: Cada vez que gastes un espacio de conjuro de Magia del Pacto mientras estás dentro de tu Nodo Elemental, puedes intentar arrastrar a una criatura hacia el nodo. Una criatura que elijas a 30 pies del nodo debe superar una tirada de salvación de Fuerza o ser arrastrada hasta 15 pies hacia el centro. Node Improvement: Tu Nodo Elemental ahora dura hasta 1 hora. Primordial Herald: Mientras estés dentro del área de tu nodo, puedes lanzar el conjuro Aliado planar (Planar Ally) sin gastar un espacio de conjuro; al lanzarlo así, pronuncias el nombre de tu patrón. Una vez que usas este beneficio, no puedes volver a hacerlo hasta que termines 2d4 Descansos Largos.",
     "n": 14,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    }
   ]
  }
 },
 "paladin": {
  "oath-of-the-spellguard": {
   "n": "Juramento del Guardián de Conjuros",
   "rasgos": [
    {
     "nombre": "Conjuros de Juramento del Guardián de Conjuros",
     "t": "pasiva",
     "texto": "La magia de tu juramento asegura que siempre tengas ciertos conjuros preparados. Cuando alcanzas los niveles de Paladín especificados, siempre tienes preparados los conjuros listados: Detectar magia y Escudo (nivel 3), Ver lo invisible y Silencio (nivel 5), Contrahechizo y Disipar magia (nivel 9), Libertad de movimiento y Esfera elástica de Otiluke (nivel 13), Círculo de poder y Santificar (nivel 17).",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Vínculo de Guardián",
     "t": "accion",
     "texto": "Como Acción mágica, puedes gastar un uso de tu Canalizar Divinidad para forjar un vínculo divino con una criatura voluntaria a 5 pies de ti. El vínculo dura 1 hora o hasta que tengas la condición Inconsciente. Durante esta duración, mientras la criatura vinculada esté a tu alcance y sea impactada por una tirada de ataque, puedes usar una Reacción para añadir tu modificador de Carisma (mínimo de +1) a la CA de esa criatura, lo que podría hacer que el ataque falle. Puedes terminar tu vínculo divino en cualquier momento (no requiere acción). Si ya tienes un vínculo divino cuando forjas uno nuevo, el vínculo anterior termina.",
     "n": 3,
     "manual": true,
     "usos": 1,
     "reset": "corto"
    },
    {
     "nombre": "Golpe del Guardián de Conjuros",
     "t": "reaccion",
     "texto": "Cuando ves a una criatura a tu alcance lanzar un conjuro con componentes verbales, somáticos o materiales, puedes usar una Reacción para hacer un ataque cuerpo a cuerpo con un arma o un Ataque Desarmado contra esa criatura.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Aura de Concentración",
     "t": "pasiva",
     "texto": "Tu aura de protección fomenta la concentración mental. Tú y tus aliados tenéis Ventaja en las tiradas de salvación de Constitución para mantener la Concentración mientras estéis en tu Aura de Protección.",
     "n": 7,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Hoja Rompe-Conjuros",
     "t": "pasiva",
     "texto": "Inmediatamente después de impactar a una criatura con tu Golpe del Guardián de Conjuros, puedes lanzar Contrahechizo como parte de la misma Reacción. Cuando lanzas Contrahechizo con un espacio de conjuro, ese espacio no se gasta si el conjuro falla en detener un conjuro.",
     "n": 15,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Guardián de Conjuros Eterno",
     "t": "adicional",
     "texto": "Como Acción adicional, puedes potenciar tu Aura de Protección, otorgando los siguientes beneficios durante 1 minuto o hasta que los termines (no requiere acción). Bodyguard: Mientras el objetivo de tu Vínculo de Guardián esté en el aura, esa criatura tiene Resistencia a todo el daño. Protection from Magic: Tú y tus aliados en el aura tenéis Ventaja en las tiradas de salvación contra conjuros. Spell Ward: Las tiradas de ataque de conjuro contra ti y tus aliados en el aura tienen Desventaja. Una vez que usas este rasgo, no puedes volver a usarlo hasta que termines un Descanso Largo, a menos que restaures su uso gastando un espacio de conjuro de nivel 5 (no requiere acción).",
     "n": 20,
     "manual": true,
     "usos": 1,
     "reset": "largo"
    }
   ]
  }
 },
 "picaro": {
  "magic-stealer": {
   "n": "Ladrón de Magia",
   "rasgos": [
    {
     "nombre": "Drenar Magia",
     "t": "accion",
     "texto": "Como Acción mágica, puedes tocar a una criatura voluntaria y terminar un conjuro activo de nivel 1 o 2 en ella; la criatura recupera inmediatamente un espacio de conjuro gastado de nivel 2 o inferior (a elección del objetivo). Una vez que usas este rasgo, no puedes volver a hacerlo hasta que termines un Descanso Corto o Largo.",
     "n": 3,
     "manual": true,
     "usos": 1,
     "reset": "corto"
    },
    {
     "nombre": "Potenciar Ataque Furtivo",
     "t": "reaccion",
     "texto": "Inmediatamente después de que una criatura que puedas ver a 30 pies de ti lance un conjuro de nivel 1 o superior, puedes usar una Reacción para absorber energía mágica del conjuro. Cuando lo haces, hasta el final de tu próximo turno, la próxima vez que impactes con tu Ataque Furtivo (Sneak Attack) infliges daño de fuerza adicional. Para determinar el daño adicional, tira una cantidad de d6s igual al nivel del conjuro y súmalos. Puedes usar esta Reacción una cantidad de veces igual a tu modificador de Inteligencia (mínimo una vez), y recuperas todos los usos gastados cuando terminas un Descanso Largo.",
     "n": 3,
     "manual": true,
     "usos": "max(1, INT)",
     "reset": "largo"
    },
    {
     "nombre": "Sabotaje Mágico",
     "t": "pasiva",
     "texto": "Obtienes las siguientes opciones de Golpe Astuto (Cunning Strike). Spell Susceptibility (Coste: 2d6): El objetivo tiene Desventaja en la próxima tirada de salvación que haga contra un conjuro hasta el inicio de tu próximo turno. Disrupt Spell (Coste: 3d6): La agudeza mágica del objetivo se interrumpe hasta el inicio de tu próximo turno. Cada vez que el objetivo lance un conjuro durante ese tiempo, debe superar una tirada de salvación de Inteligencia o el conjuro se disipa sin efecto, y la acción, Acción adicional o Reacción usada para lanzarlo se desperdicia. Si ese conjuro fue lanzado con un espacio de conjuro, el espacio no se gasta. Steal Resistance (Coste: 2d6): Elige un tipo de daño. Si el objetivo tiene Resistencia a ese tipo de daño, hasta el inicio de tu próximo turno, el objetivo pierde esa Resistencia y tú ganas Resistencia a ese tipo de daño.",
     "n": 9,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Drenar Magia Mejorado",
     "t": "pasiva",
     "texto": "Ahora puedes usar Drenar Magia como Acción adicional. Además, cuando usas Drenar Magia, puedes terminar un conjuro activo de nivel 1, nivel 2 o nivel 3 en el objetivo, y el objetivo recupera un espacio de conjuro gastado de nivel 3 o inferior (a elección del objetivo).",
     "n": 13,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Sudario Oculto",
     "t": "pasiva",
     "texto": "Cada vez que terminas un Descanso Largo, puedes lanzar el conjuro Indetectabilidad (Nondetection), usando Inteligencia como tu aptitud mágica. Cuando lo haces, solo puedes tenerte a ti mismo como objetivo, y la duración aumenta a 24 horas.",
     "n": 13,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Implosión Sobrenatural",
     "t": "pasiva",
     "texto": "Cuando usas Potenciar Ataque Furtivo, puedes obligar al objetivo a hacer una tirada de salvación de Constitución (CD 8 + tu modificador de Destreza + tu Bonificador por Competencia). Si falla la salvación, el conjuro se disipa sin efecto, y el objetivo tiene la condición Aturdido hasta el inicio de su próximo turno.",
     "n": 17,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    }
   ]
  },
  "house-agent": {
   "n": "Agente de Casa",
   "rasgos": [
    {
     "nombre": "Insignia de Casa",
     "t": "pasiva",
     "texto": "Obtienes una ficha mágica que te marca como agente de tu patrocinador y te permite lanzar los conjuros de este arquetipo usando Carisma como aptitud de conjuración. Si la pierdes, tu casa te entrega una nueva al terminar un descanso largo.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Conjuros de Agente de Casa",
     "t": "pasiva",
     "texto": "A través de tu Insignia de Casa, aprendes el truco Amistad y el conjuro Encontrar familiar (lanzable solo como ritual; tu patrocinador da el material y debe ser forma de Araña). A niveles 3, 5 y 9 aprendes conjuros adicionales; puedes lanzar cada uno de estos conjuros usando tu insignia una vez por descanso largo.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Presencia Encantadora",
     "t": "adicional",
     "texto": "Puedes realizar la acción de Influenciar como acción adicional. Además, eliges obtener competencia en una de las siguientes habilidades: Engaño, Intimidación, Interpretación o Persuasión.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Puñalada Trapera",
     "t": "pasiva",
     "texto": "Tienes ventaja en las tiradas de ataque contra criaturas a menos de 5 pies de ti que sean amistosas hacia ti o tengan la condición Hechizado. Añades \"Stunning Betrayal\" a tu Golpe Astuto (Coste: 4d6): si tu objetivo era amistoso hacia ti o estaba Hechizado al impactarlo, obtiene la condición Aturdido hasta el inicio de tu próximo turno.",
     "n": 9,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Lengua de Plata",
     "t": "pasiva",
     "texto": "La actitud hostil de una criatura no impone desventaja en tus pruebas de Carisma para influenciar a esa criatura.",
     "n": 13,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Compañero de Infiltración",
     "t": "pasiva",
     "texto": "El familiar que obtienes mediante Encontrar familiar obtiene visión en la oscuridad con un alcance de 120 pies y visión verdadera con un alcance de 30 pies. Además, cuando lanzas el conjuro o terminas un descanso corto o largo mientras tienes un familiar, puedes otorgarle puntos de golpe temporales iguales a tu nivel de pícaro.",
     "n": 13,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Manipulador Sutil",
     "t": "adicional",
     "texto": "Añades \"Confound\" a tu Golpe Astuto (Coste: 5d6): el objetivo hace una salvación de Sabiduría contra tu CD de conjuros o queda Hechizado por 1 minuto (puede repetir la salvación cada vez que reciba daño). Además, puedes lanzar Amistad como acción adicional, y el objetivo ya no supera la salvación automáticamente si no es humanoide o si luchas contra él. Finalmente, cuando un conjuro tuyo que otorga la condición Hechizado termina, el objetivo no sabe que lo hechizaste.",
     "n": 17,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    }
   ]
  }
 },
 "barbaro": {
  "path-of-lament": {
   "n": "Senda del Lamento",
   "rasgos": [
    {
     "nombre": "Lamento de la Banshee",
     "t": "adicional",
     "texto": "Cuando activas tu Furia (Rage) o como una Acción adicional mientras tu Furia esté activa, puedes emitir un gemido lúgubre. Cada criatura de tu elección en una Emanación de 30 pies centrada en ti hace una tirada de salvación de Constitución (CD 8 + tu mod. de Constitución + tu Bonificador por Competencia). Si falla, recibe daño psíquico y queda con la condición Sordo por 1 minuto. Si tiene éxito, solo recibe la mitad del daño. Para determinar el daño psíquico, tira una cantidad de d12s igual a tu bonificador de Daño de Furia y súmalos. Puedes usar esto una cantidad de veces igual a tu mod. de Constitución (mínimo de una vez) y recuperas los usos al terminar un Descanso Largo. También puedes recuperar todos los usos gastando un uso de tu Furia (sin requerir acción).",
     "n": 3,
     "manual": true,
     "usos": "max(1, CON)",
     "reset": "largo"
    },
    {
     "nombre": "Comunión con los Muertos",
     "t": "fuera",
     "texto": "Puedes lanzar el conjuro Hablar con los muertos (Speak with Dead), pero solo como un Ritual. Sabiduría es tu aptitud mágica para este conjuro.",
     "n": 6,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Golpe Horripilante",
     "t": "pasiva",
     "texto": "Una vez por turno, cuando impactas a una criatura con una tirada de ataque basada en Fuerza mientras tu Furia esté activa, puedes intentar horrorizar al objetivo. El objetivo debe superar una tirada de salvación de Sabiduría (CD 8 + tu modificador de Constitución + tu Bonificador por Competencia) o tener la condición Asustado hasta el inicio de tu próximo turno.",
     "n": 6,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Angustia Sobrenatural",
     "t": "pasiva",
     "texto": "Deathly Wail: Si un objetivo falla su tirada de salvación contra tu Lamento de la Banshee y tiene Puntos de Golpe iguales al doble de tu nivel de Bárbaro o menos, cae a 0 Puntos de Golpe en lugar de recibir daño. Impenetrable Sorrow: No puedes ser poseído. Resistance: Tienes Resistencia al daño de frío y necrótico mientras tu Furia esté activa.",
     "n": 10,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Forma de Pesar",
     "t": "pasiva",
     "texto": "Cuando activas tu Furia, puedes empoderarte con la no muerte, ganando los siguientes beneficios durante 1 minuto o hasta que caigas a 0 Puntos de Golpe. Una vez que usas este rasgo, no puedes volver a hacerlo hasta terminar un Descanso Largo. Immunities: Tienes Inmunidad a las condiciones Hechizado y Asustado (si tienes alguna al empoderarte, la condición termina en ti) y no puedes ganar niveles de Fatiga. Life-Draining Strike: Cuando una criatura falla su salvación contra tu Golpe Horripilante, la criatura recibe 2d10 de daño necrótico y tú recuperas Puntos de Golpe iguales al daño necrótico infligido. Undead: Tu Tipo de Criatura es Muerto Viviente (Undead).",
     "n": 14,
     "manual": true,
     "usos": 1,
     "reset": "largo"
    }
   ]
  },
  "path-of-unlight": {
   "n": "Senda de Unlight",
   "rasgos": [
    {
     "nombre": "Furia Radiante",
     "t": "pasiva",
     "texto": "La energía de Unlight alimenta tu Furia. Si una criatura te impacta con una tirada de ataque cuerpo a cuerpo mientras tu Furia está activa, la criatura recibe daño radiante igual a tu bonificador de Daño de Furia. Además, mientras tu Furia está activa, emites luz brillante en un radio de 20 pies.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Revelación de Unlight",
     "t": "pasiva",
     "texto": "Obtienes competencia en la habilidad Percepción, si no la tenías ya, y obtienes Pericia en esa habilidad. Mientras tu Furia está activa, tienes visión ciega con un alcance igual al de la luz brillante que proporciona tu Furia Radiante.",
     "n": 6,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Unlight Contagioso",
     "t": "pasiva",
     "texto": "El daño que infliges con tu Golpe Brutal (Brutal Strike) puede ser radiante o de su tipo habitual a tu elección. Añades \"Radiant Infection\" a tus opciones de Golpe Brutal: el objetivo queda infectado por Unlight durante 1 minuto. Mientras está infectado, emite luz brillante en un radio de 10 pies y recibe 1d6 de daño radiante al inicio de cada uno de sus turnos. El objetivo hace una tirada de salvación de Constitución (CD 8 + tu modificador de Fuerza + tu Bonificador por Competencia) al final de cada uno de sus turnos, terminando el efecto en sí mismo si tiene éxito.",
     "n": 10,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Heraldo de Unlight",
     "t": "pasiva",
     "texto": "Tienes resistencia al daño radiante.",
     "n": 10,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Furia Brillante",
     "t": "adicional",
     "texto": "El aura de tu Unlight se fortalece: emites luz brillante en un radio de 30 pies mientras tu Furia está activa. Como acción adicional, desatas un brillo cegador y cada criatura de tu elección a menos de 30 pies hace una tirada de salvación de Constitución (CD 8 + tu modificador de Fuerza + tu Bonificador por Competencia). Si falla, la criatura recibe 1d12 de daño radiante y obtiene la condición Cegado hasta el final de tu próximo turno; si tiene éxito, solo recibe la mitad del daño. Una vez que usas este rasgo, no puedes volver a hacerlo hasta terminar un descanso largo, a menos que gastes un uso de tu Furia (sin requerir acción) para recuperarlo.",
     "n": 14,
     "manual": true,
     "usos": 1,
     "reset": "largo"
    }
   ]
  }
 },
 "mago": {
  "imaskarcanist": {
   "n": "Imaskarcanista",
   "rasgos": [
    {
     "nombre": "Adepto de Unlight",
     "t": "pasiva",
     "texto": "Cuando lanzas un conjuro que inflige daño de ácido, frío, fuego, relámpago o trueno, puedes cambiar ese tipo de daño a radiante. Además, la luz tenue creada por tus conjuros es luz brillante en su lugar.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Vigorización de Unlight",
     "t": "adicional",
     "texto": "Como acción adicional, eliges a una criatura voluntaria a menos de 30 pies y tiras uno o dos de tus Dados de Golpe, los cuales se gastan. El objetivo obtiene puntos de golpe temporales iguales al total obtenido más tu modificador de Inteligencia. Mientras tenga estos puntos, tiene ventaja en pruebas de Fuerza y emite luz brillante en un radio de 10 pies.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Restauración de Unlight",
     "t": "adicional",
     "texto": "Como acción adicional, eliges a una criatura a menos de 30 pies de ti y tiras uno o dos de tus Dados de Golpe, que se gastan. El objetivo recupera puntos de golpe iguales al total y emite luz brillante en un radio de 10 pies hasta el final de su próximo turno. Si gastaste dos dados, puedes elegir no curar puntos de golpe y en su lugar terminar una de las siguientes condiciones en el objetivo: Cegado, Sordo, Paralizado o Envenenado.",
     "n": 6,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Secretos del Imaskar Profundo",
     "t": "accion",
     "texto": "Puedes sintonizarte con un objeto mágico como acción de Magia (una vez por descanso largo). Tus conjuros ignoran la resistencia al daño radiante y tú obtienes resistencia a ese daño. Siempre tienes Glifo custodio preparado y puedes lanzarlo una vez sin espacio de conjuro al nivel de tu espacio más alto de mago, sin componentes materiales (recuperas el uso tras un descanso largo); si lo haces, cualquier glifo previo creado así se rompe.",
     "n": 10,
     "manual": true,
     "usos": 1,
     "reset": "largo"
    },
    {
     "nombre": "Perdición de Unlight",
     "t": "reaccion",
     "texto": "Cuando una criatura recibe daño radiante de tu conjuro, puedes usar tu reacción para maldecirla. Hace una salvación de Constitución contra tu CD de conjuros; si falla, emite luz brillante a 20 pies, los ataques en su contra tienen ventaja, recibe daño radiante igual a tu nivel al inicio de sus turnos y tiene ventaja en Fuerza y ataques cuerpo a cuerpo. Puede repetir la salvación si impacta cuerpo a cuerpo a otra criatura. Si cae a 0 puntos de golpe, explota: tiras d8s iguales a la mitad de tu nivel y las criaturas a 10 pies reciben ese daño radiante. Un uso por descanso largo o gastando un espacio de nivel 6+.",
     "n": 14,
     "manual": true,
     "usos": 1,
     "reset": "largo"
    }
   ]
  }
 },
 "clerigo": {
  "freedom-domain": {
   "n": "Dominio de la Libertad",
   "rasgos": [
    {
     "nombre": "Conjuros de Dominio",
     "t": "pasiva",
     "texto": "Tu conexión con el dominio garantiza que siempre tengas preparados ciertos conjuros al alcanzar los niveles 3, 5, 7 y 9 de clérigo.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Invocar Libertad",
     "t": "accion",
     "texto": "Como acción de Magia, gastas un uso de Canalizar Divinidad para que cada aliado en una emanación de 30 pies originada en ti pueda terminar una de las siguientes condiciones en sí mismo: Asustado, Agarrado, Paralizado o Apresado (a nivel 9 añade Hechizado y Petrificado). La criatura puede entonces usar su reacción para moverse hasta su velocidad sin provocar ataques de oportunidad.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Gracia sin Trabas",
     "t": "pasiva",
     "texto": "Mientras no llevas armadura, tu Clase de Armadura base es 10 + tu modificador de Destreza + tu modificador de Sabiduría (puedes usar un escudo y mantener el beneficio). Obtienes competencia en Acrobacias, o Pericia si ya la tenías.",
     "n": 3,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Imparable",
     "t": "pasiva",
     "texto": "Tu movimiento no se ve afectado por terreno difícil. Además, obtienes competencia en tiradas de salvación de Destreza, o en otra si ya eras competente en esta.",
     "n": 6,
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "nombre": "Avatar de la Libertad",
     "t": "adicional",
     "texto": "Como acción adicional, manifiestas una emanación de 30 pies que te rodea por 10 minutos (termina si la descartas o tienes la condición Incapacitado). Un aliado que entra por primera vez en un turno o empieza su turno allí gana 30 pies de velocidad hasta el final de su próximo turno. Además, el movimiento de los aliados en la emanación no se ve afectado por terreno difícil y tienen ventaja en pruebas de Destreza. Un uso por descanso corto o largo.",
     "n": 17,
     "manual": true,
     "usos": 1,
     "reset": "corto"
    }
   ]
  },
  "pestilence-domain": {
   "n": "Dominio de la Pestilencia",
   "rasgos": [
    {
     "n": 3,
     "nombre": "Conjuros de Dominio de la Pestilencia",
     "t": "pasiva",
     "texto": "A los niveles 3, 5, 7 y 9 amplías tu lista de conjuros preparados con los conjuros de esta subclase.",
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "n": 3,
     "nombre": "Tejedor de Plaga",
     "t": "pasiva",
     "texto": "Obtienes Resistencia al daño necrótico y de veneno, y no puedes ser infectado por contagios mágicos. Además, el daño de tus conjuros y rasgos de clérigo ignora la Resistencia al daño necrótico y de veneno. Cuando lanzas un conjuro o usas un rasgo de clérigo que inflige daño necrótico o de veneno, puedes cambiar ese daño por el otro tipo.",
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "n": 3,
     "nombre": "Bendición de la Peste",
     "t": "accion",
     "texto": "Como acción Mágica, puedes presentar tu Símbolo Sagrado y gastar un uso de Canalizar Divinidad para manifestar una Emanación de 5 pies de plaga marchita a tu alrededor o de una criatura voluntaria que toques, con una duración de 1 minuto. Termina antes si la descartas (sin acción), la manifiestas de nuevo o tienes la condición de Incapacitado. Cada criatura de tu elección que comience su turno en la Emanación debe superar una tirada de salvación de Constitución contra tu CD de salvación de conjuros o ganar 1 nivel de Agotamiento. Esto no puede aumentar el nivel de Agotamiento de una criatura por encima de tu modificador de Sabiduría, con un mínimo de 1. La plaga manifiesta un síntoma específico (elige o tira 1d6): 1) es drenado de todo color, quedando en grises monocromáticos; 2) suelta escamas metálicas color óxido y cruje al moverse; 3) secreta mucosidad maloliente; 4) está rodeado por una nube de insectos zumbantes; 5) le brotan hongos u otro follaje de su carne; 6) está cubierto de pústulas brillantes.",
     "manual": true,
     "usos": 0,
     "reset": "largo"
    },
    {
     "n": 6,
     "nombre": "Estallido Virulento",
     "t": "reaccion",
     "texto": "Cuando un enemigo a 60 pies o menos de ti es reducido a 0 Puntos de Golpe, puedes usar tu Reacción para que una plaga estalle en una Emanación de 10 pies desde el enemigo; si este tenía al menos 1 nivel de Agotamiento, la Emanación aumenta a 20 pies. Cada criatura de tu elección dentro de la Emanación hace una tirada de salvación de Constitución contra tu CD de conjuros. Si falla, sufre un efecto a tu elección: Putrid Shock (tiene la condición de Incapacitado hasta el final de su próximo turno y su Velocidad es 0 mientras esté Incapacitado) o Toxic Infection (recibe 3d6 de daño necrótico o de veneno, a tu elección).",
     "manual": true,
     "usos": "max(1, SAB)",
     "reset": "largo"
    },
    {
     "n": 17,
     "nombre": "Forma de Alimaña",
     "t": "adicional",
     "texto": "Como Acción Adicional, puedes transformarte en un enjambre Mediano de plagas Diminutas (como cucarachas, gusanos o ratas). Mantienes tu forma general, personalidad, recuerdos, capacidad de hablar y el equipo utilizable. Ganas Inmunidad a estar Apresado, Paralizado, Derribado y Sujeto, y Resistencia al daño Contundente, Perforante y Cortante. Puedes entrar y ocupar el espacio de otra criatura y viceversa, posees Velocidad de escalada igual a tu Velocidad, y puedes escalar superficies difíciles (incluyendo techos) sin prueba de característica. Al entrar en el espacio de un enemigo, o si este entra o termina su turno en el tuyo, recibe daño igual a tu modificador de Sabiduría (necrótico, perforante o de veneno, a tu elección) solo una vez por turno. Vuelves a tu forma verdadera tras 10 minutos, si decides terminarlo (sin acción), estás Incapacitado o mueres. Tras usarlo, debes terminar un Descanso Largo o gastar un espacio de conjuro de nivel 5+ (sin acción) para restaurar su uso.",
     "manual": true,
     "usos": 1,
     "reset": "largo"
    }
   ]
  }
 }
};

/* Subclase del Psion, para cuando la clase exista en la biblioteca */
export const PSION_SUBCLASES_2026: Record<string, { n: string; rasgos: any[] }> = {
 "psi-warper": {
  "n": "Deformador Psi",
  "rasgos": [
   {
    "n": 3,
    "nombre": "Conjuros de Deformador Psi",
    "t": "pasiva",
    "texto": "A los niveles 3, 5, 7 y 9 amplías tu lista de conjuros preparados con los conjuros de esta subclase.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "n": 3,
    "nombre": "Teletransportación",
    "t": "pasiva",
    "texto": "Puedes lanzar Paso brumoso sin gastar un espacio de conjuro, y debes terminar un Descanso Largo antes de poder lanzarlo de esta manera de nuevo. También puedes recuperar su uso gastando un Dado de Energía Psiónica (sin requerir acción).",
    "manual": true,
    "usos": 1,
    "reset": "largo"
   },
   {
    "n": 3,
    "nombre": "Propulsión Deformante",
    "t": "pasiva",
    "texto": "Cuando un objetivo falla su tirada de salvación contra tu Telekinetic Propel, en lugar de empujarlo, puedes teletransportarlo a un espacio desocupado que puedas ver a 30 pies o menos de ti que esté en posición horizontal respecto a ti.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "n": 6,
    "nombre": "Deformar el Espacio",
    "t": "pasiva",
    "texto": "Cuando lanzas Hacer añicos, puedes gastar un Dado de Energía Psiónica para modificar el conjuro y que el radio de su Esfera pase a ser de 20 pies. Además, las criaturas que fallan la tirada de salvación contra el conjuro son atraídas en línea recta hacia el centro de la Esfera y terminan en el espacio desocupado más cercano al centro.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "n": 10,
    "nombre": "Blanco Falaz",
    "t": "reaccion",
    "texto": "Cuando una criatura que puedes ver hace una tirada de ataque contra ti, puedes usar una Reacción para gastar un Dado de Energía Psiónica y elegir a una criatura voluntaria que puedas ver a 30 pies o menos de ti que no tenga la condición de Incapacitado. Tú y la criatura voluntaria se teletransportan, intercambiando lugares. La criatura se convierte entonces en el objetivo de la tirada de ataque.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "n": 14,
    "nombre": "Teletransportación Masiva",
    "t": "accion",
    "texto": "Como acción Mágica, gastas cuatro Dados de Energía Psiónica y eliges criaturas Enormes o más pequeñas a 30 pies o menos de ti, hasta un número de criaturas igual a tu modificador de Inteligencia (mínimo una criatura). Cada criatura elegida es teletransportada a un espacio desocupado que puedas ver a 150 pies o menos de ti. Una criatura involuntaria que supere una tirada de salvación de Sabiduría contra tu CD de salvación de conjuros no se ve afectada.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   }
  ]
 }
};
