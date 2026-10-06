=== A ===
export const warden: Clase = {
  nombre: "Warden",
  dado: "d10",
  sv: ["Sabiduría", "Fuerza"],
  habN: 2,
  habs: ["Trato con Animales", "Atletismo", "Conocimiento Arcano", "Intimidación", "Investigación", "Naturaleza", "Percepción", "Supervivencia"],
  arm: ["Armaduras ligeras", "armaduras medias", "escudos"],
  armas: ["Armas simples"],
  equipo: "Eliges entre (a) dos armas simples o un arma marcial (si tienes competencia), (b) armadura de cuero o cota de escamas, (c) un arco corto y 20 flechas o un escudo, y (d) un paquete de explorador y una bolsa de componentes. Alternativamente, puedes empezar con 5d4 x 10 po.",
  rasgos: [
    {
      nombre: "Disciplina de Combate (Combat Discipline)",
      t: "pasiva",
      texto: "Has completado tu entrenamiento en una especialidad de combate de tu elección: Guardian, Fanatic, Sage o Dragon Guard. Tu elección te otorga rasgos en el nivel 1, y nuevamente en los niveles 6, 10 y 14.",
      n: 1
    },
    {
      nombre: "Consciencia Natural (Natural Awareness)",
      t: "pasiva",
      texto: "Tienes ventaja en las pruebas de Sabiduría (Percepción) mientras te encuentres en un entorno natural (como un bosque o una cueva, pero no en una ciudad o calabozo). Además, puedes identificar de forma infalible si los fenómenos ambientales (como temblores, erupciones, flujos de magma, tormentas eléctricas y similares) son naturales o no naturales.\n\nA partir del nivel 18, también obtienes un bonificador a tus tiradas de iniciativa igual a tu modificador por Sabiduría. Cuando estás en un entorno completamente natural, obtienes ventaja en las tiradas de iniciativa.",
      n: 1
    },
    {
      nombre: "Poder Natural (Natural Power)",
      t: "pasiva",
      texto: "Extraes energía de un pozo de poder natural, canalizando los elementos en tus golpes utilizando dados especiales llamados dados de poder. Tienes 4 dados de poder d4 en el nivel 1. Tienes más dados y son de mayor tamaño a medida que subes de nivel.\n\nCuando impactas con un ataque de arma, puedes gastar un dado de poder para sumar el resultado a la tirada de daño del ataque. El tipo de daño de este daño adicional es ácido, contundente, frío, fuego, relámpago o trueno (a tu elección). Este daño es mágico.\n\nCuando terminas un descanso corto, recuperas un número de dados de poder igual a la mitad de tu cantidad total. Recuperas todos los dados de poder gastados cuando terminas un descanso largo.",
      n: 1
    },
    {
      nombre: "Glamour (Glamour)",
      t: "pasiva",
      texto: "Puedes crear un efecto sensorial elemental inofensivo que se origina en tu cuerpo. Por ejemplo, puede ser en forma de agua goteando de tus manos, un brillo ardiente en tus ojos, o tu piel luciendo moteada y terrosa.\n\nAdemás, al hacer una prueba de Carisma, puedes gastar un dado de poder, tirando el dado y sumando el resultado a tu prueba de característica.",
      n: 2
    },
    {
      nombre: "Magia de Origen (Source Magic)",
      t: "pasiva",
      texto: "Has desbloqueado tu afinidad innata con los elementos en forma de lanzamiento de conjuros. Obtienes espacios de conjuro del mismo nivel para lanzar tus conjuros de Warden, los cuales recuperas todos al finalizar un descanso corto o largo (funciona de forma idéntica a Magia de Pacto).\n\nConoces dos conjuros de nivel 1 de la lista de Warden. Aprendes más conjuros según tu nivel, de un nivel que no supere tu Nivel de Espacio de conjuro. Puedes reemplazar un conjuro que conoces al subir de nivel en esta clase.\n\n**Característica para el lanzamiento de conjuros:** Sabiduría.\n* CD de salvación de conjuros = 8 + tu bonificador por competencia + tu modificador por Sabiduría\n* Modificador de ataque de conjuros = tu bonificador por competencia + tu modificador por Sabiduría",
      n: 2
    },
    {
      nombre: "Elemento Primario (Prime Element)",
      t: "pasiva",
      texto: "Tu aplicación de tus habilidades elementales fomenta un camino especializado. Elige una de las siguientes opciones (esto también determina el beneficio de tu rasgo Escudo Elemental Primario a nivel 7):\n\n**Baluarte Terrenal (Earthen Bulwark):** Aprendes los trucos *arrojar (fling)*, *esculpir la tierra (sculpt earth)*, y *puño de piedra (stonefist)*. Siempre que uses tu rasgo Poder Natural para infligir daño contundente adicional, el objetivo debe tener éxito en una tirada de salvación de Fuerza contra tu CD de conjuros de Warden, o quedará apresado por el suelo a su alrededor. El objetivo puede usar una acción para intentar liberarse repitiendo esta salvación. Una criatura que esté volando actualmente o que de otro modo no esté a 5 pies del suelo tiene éxito automáticamente en esta salvación. Además, cuando una criatura se mueve a 5 pies o menos de ti, puedes usar tu reacción para gastar un dado de poder e intentar empujarla. Haz una prueba de Fuerza (Atletismo) enfrentada a la prueba de Fuerza (Atletismo) o Destreza (Acrobacias) del objetivo, sumando el resultado de tu dado de poder a tu tirada. Si ganas el enfrentamiento, empujas al objetivo 10 pies hacia atrás y su movimiento se vuelve 0 hasta el final de su turno.\n\n**Valentía Llameante (Flaming Bravery):** Aprendes los trucos *brasear (braise)*, *saeta de fuego* y *producir llama*. Siempre que uses Poder Natural para infligir daño de fuego adicional, el objetivo recibe esa misma cantidad de daño adicional al comienzo de su siguiente turno. Además, cuando una criatura hace una tirada de ataque contra ti, puedes usar tu reacción y gastar un dado de poder para sumar el número sacado a tu CA. Puedes hacer esto después de que ataque, pero antes de saber si acierta o falla. Si gastas este dado y el ataque falla, el atacante recibe daño de fuego igual a tu mod. por Sabiduría + el resultado de tu dado de poder.\n\n**Corrosión Pútrida (Putrid Corrosion):** Aprendes los trucos *salpicadura de ácido*, *fumigar (fumigate)* y *rociada venenosa*. Siempre que uses Poder Natural para infligir daño de ácido adicional, el objetivo no puede sumar su mod. por Fuerza o Destreza a sus tiradas de daño de arma hasta el final de su siguiente turno. Además, cuando lanzas un conjuro que provoca una salvación, puedes gastar un dado de poder para añadir un elemento corrosivo. Si una criatura falla su salvación contra tu conjuro, al principio de cada uno de sus turnos debe hacer una salvación de Constitución contra tu CD; si falla, recibe daño de ácido igual al resultado de tu dado de poder. Con un éxito, o tras 1 minuto, el efecto termina.\n\n**Frío Estoico (Stoic Chill):** Aprendes los trucos *lluvia helada (freezing rain)*, *deslizamiento glaciar (glacial slide)* y *rayo de escarcha*. Siempre que uses Poder Natural para infligir daño de frío adicional, el objetivo tiene desventaja en el siguiente ataque de arma que haga antes del comienzo de tu siguiente turno. Además, cuando haces una tirada de salvación, puedes usar tu reacción y gastar un dado de poder para sumarlo a la tirada (después de tirar pero antes del resultado). Si tienes éxito, todas las superficies en un radio de 10 pies de ti se cubren de hielo (terreno difícil). Al formarse el hielo, toda criatura (excepto tú) en el área debe superar una salvación de Destreza o quedar derribada (el efecto dura hasta el comienzo de tu siguiente turno).\n\n**Tormenta Implacable (Unrelenting Storm):** Aprendes los trucos *empapar (douse)*, *agarre electrizante* y *orbe de tormenta (storm orb)*. Siempre que uses Poder Natural para infligir daño de relámpago o trueno adicional, y el objetivo se mueva voluntariamente antes del comienzo de tu siguiente turno, puedes volver a tirar tu dado de poder, y el objetivo recibe daño de relámpago o trueno (tu elección) igual al resultado + tu mod. por Sabiduría. Además, cuando haces una tirada de ataque con un arma, puedes gastar un dado de poder y sumarlo al ataque (después de tirar pero antes del resultado). Si el ataque impacta, las demás criaturas a 5 pies de ti o del objetivo deben hacer una salvación de Constitución o ser empujadas 5 pies hacia atrás.",
      n: 3
    },
    {
      nombre: "Ataque Adicional (Extra Attack)",
      t: "pasiva",
      texto: "Puedes atacar dos veces, en lugar de una, cada vez que realizas la acción de Atacar en tu turno.",
      n: 5
    },
    {
      nombre: "Escudo Elemental Primario (Prime Elemental Shield)",
      t: "reaccion",
      texto: "Puedes usar tu reacción para producir uno de los siguientes efectos, determinado por tu elección de Elemento Primario a nivel 3:\n\n*   **Baluarte Terrenal:** Como reacción a que una criatura te haga un ataque a distancia o te provoque una tirada de salvación de Destreza, puedes levantar una nube de polvo y rocas, imponiendo desventaja en su ataque o dándote ventaja en tu tirada de salvación.\n*   **Valentía Llameante:** Como reacción, obtienes ventaja en una tirada de salvación o prueba de característica hecha para resistir ser apresado, derribado o movido contra tu voluntad.\n*   **Corrosión Pútrida:** Como reacción a que una criatura te impacte con un ataque cuerpo a cuerpo usando un arma de metal, puedes debilitarla. Cada vez que se use ese arma para atacar antes del final de tu siguiente turno, el ataque se hace con desventaja y no puede beneficiarse de ventaja de ninguna fuente.\n*   **Frío Estoico:** Como reacción a que una criatura te impacte con un ataque de arma cuerpo a cuerpo, puedes crear una gruesa barrera de hielo entre tú y el arma, reduciendo el daño en una cantidad igual a tu modificador por Sabiduría.\n*   **Tormenta Implacable:** Como reacción a que una criatura te impacte a ti o a un aliado a 5 pies de ti con un ataque de arma a distancia, puedes crear una ráfaga de aire que amortigua el impacto del proyectil, reduciendo el daño en una cantidad igual a tu modificador por Sabiduría.",
      n: 7
    },
    {
      nombre: "Sentido de la Naturaleza (Nature Sense)",
      t: "fuera",
      texto: "Puedes canalizar la naturaleza para extender tus sentidos. Pasas 1 minuto tocando una superficie natural y enfocándote en ella, tras lo cual cambias tu perspectiva como si tus sentidos se originaran desde cualquier punto de tu elección en esa superficie dentro de un rango de 100 pies. Puedes mantener este punto de vista por hasta 10 minutos si no te mueves, y puedes terminarlo en cualquier momento (no requiere acción). Estás cegado y ensordecido a tus propios sentidos mientras dure.",
      n: 10
    },
    {
      nombre: "Poder Natural Mejorado (Improved Natural Power)",
      t: "pasiva",
      texto: "Una vez en cada uno de tus turnos, cuando infliges daño a una criatura con un ataque de arma o un truco de Warden, puedes infligir 2d8 de daño adicional. El tipo de daño es ácido, contundente, frío, fuego, relámpago o trueno (a tu elección).",
      n: 11
    },
    {
      nombre: "Canalizar Poder (Channel Power)",
      t: "adicional",
      texto: "Puedes sacrificar cuatro dados de poder como acción adicional para recuperar un espacio de conjuro. Una vez que usas este rasgo, no puedes volver a hacerlo hasta terminar un descanso largo.",
      n: 15,
      usos: 1,
      reset: "largo"
    },
    {
      nombre: "Mejora de Consciencia Natural (Improved Natural Awareness)",
      t: "pasiva",
      texto: "Obtienes un bonificador a tus tiradas de iniciativa igual a tu modificador por Sabiduría. Cuando estás en un entorno completamente natural, obtienes ventaja en las tiradas de iniciativa.",
      n: 18
    },
    {
      nombre: "Maestro de los Elementos (Master of Elements)",
      t: "accion",
      texto: "Como acción, desatas un torrente de energía mágica en un radio de 30 pies centrado en ti. El área se infunde con magia primordial basándose en tu elemento primario. Durante 1 minuto, obtienes los siguientes beneficios:\n* Mientras estás dentro del área, siempre que gastas un dado de poder, el número de tus dados de poder disponibles no disminuye.\n* Tienes resistencia al daño contundente, ácido, frío, fuego, relámpago y trueno.\n* Como acción, puedes hacer que el área cobre vida y ataque. Haz un único ataque de arma contra cualquier cantidad de criaturas dentro del área, infligiendo daño a cada criatura que impactes.\n\nUna vez que usas este rasgo, no puedes volver a hacerlo hasta que termines un descanso largo.",
      n: 20,
      usos: 1,
      reset: "largo"
    }
  ]
};

export const guardian: Subclase = {
  n: 1,
  rasgos: [
    {
      nombre: "Entrenamiento de Combate (Combat Training)",
      t: "pasiva",
      texto: "Obtienes competencia en todas las armas marciales y armaduras pesadas. Además, eliges un Estilo de Combate entre: Tiro con Arco (Archery), Combate con Armas a Dos Manos (Great Weapon Fighting) o Protección (Protection).",
      n: 1
    },
    {
      nombre: "Fuerza de los Elementos (Strength of the Elements)",
      t: "pasiva",
      texto: "Cuando normalmente tirarías un dado de poder para infligir daño adicional a una criatura, puedes elegir tratar cualquier resultado menor que su máximo como su resultado máximo. Puedes hacer esto un número de veces igual a tu modificador por Sabiduría (mínimo una vez). Recuperas los usos al terminar un descanso corto o largo.",
      n: 6,
      usos: "Sab",
      reset: "corto"
    },
    {
      nombre: "Aura Protectora (Shielding Aura)",
      t: "reaccion",
      texto: "Si tú o una criatura que puedas ver a 30 pies de ti recibe daño de ácido, fuego, frío, relámpago o trueno, puedes usar tu reacción para reducir el daño a esa criatura a la mitad.",
      n: 10
    },
    {
      nombre: "Furia de la Naturaleza (Nature's Fury)",
      t: "pasiva",
      texto: "Cuando realizas un ataque de arma, puedes gastar un dado de poder para otorgarte ventaja en ese ataque. Por cada d20 que forme parte de la tirada de ataque que impactaría a la criatura, tiras ese dado de poder, infligiendo daño adicional igual al resultado. El tipo de daño es ácido, contundente, frío, fuego, relámpago o trueno (a tu elección).",
      n: 14
    }
  ]
};

export const fanatic: Subclase = {
  n: 1,
  rasgos: [
    {
      nombre: "Pugilista (Pugilist)",
      t: "pasiva",
      texto: "Renuncias a las armas para convertir tu cuerpo en una fuerza de la naturaleza. Obtienes los siguientes beneficios:\n* Puedes tirar un d4 en lugar del daño normal de tus impactos desarmados. Este dado cambia al mismo dado que tu Dado de Poder (d6 a nivel 5, d8 a nivel 11, d10 a nivel 17).\n* Puedes usar Sabiduría en lugar de Fuerza para las tiradas de ataque y daño de tus impactos desarmados.\n* Cuando tomas la acción de Atacar para realizar un impacto desarmado, puedes hacer otro impacto desarmado como acción adicional.",
      n: 1
    },
    {
      nombre: "Poder Preciso (Precise Power)",
      t: "pasiva",
      texto: "Cuando gastas un dado de poder para infligir daño adicional a una criatura con un impacto desarmado, puedes tirar el dado de poder una vez más y sumar el resultado al daño. Puedes hacer esto un número de veces igual a tu modificador por Sabiduría (mínimo una vez). Recuperas los usos al terminar un descanso largo.",
      n: 6,
      usos: "Sab",
      reset: "largo"
    },
    {
      nombre: "Postura de Extensión (Extension Stance)",
      t: "pasiva",
      texto: "Tu alcance con impactos desarmados aumenta a 15 pies cuando ambas manos están vacías. Cuando apresas a una única criatura, mientras permanezca a tu alcance, no necesitas usar tus manos para mantener el apresamiento, sino que la atas con puro poder elemental.\nCuando lanzas un conjuro con alcance de toque, para ti tiene un alcance de 15 pies.",
      n: 10
    },
    {
      nombre: "Elementos Explosivos (Exploding Elements)",
      t: "pasiva",
      texto: "Cuando gastas un dado de poder para infligir daño adicional en un ataque, puedes elegir que ese daño se inflija también a todas las criaturas a 5 pies de tu objetivo, excluyéndote a ti.",
      n: 14
    }
  ]
};

export const sage: Subclase = {
  n: 1,
  rasgos: [
    {
      nombre: "Potencial Innato (Innate Potential)",
      t: "pasiva",
      texto: "En tu siguiente turno después de infligir daño adicional en un ataque de arma con tu rasgo Poder Natural, puedes lanzar uno de los siguientes conjuros sin gastar espacio de conjuro ni requerir componentes: *manos ardientes*, *colmillos goteantes (dripping fangs)*, *enmarañar*, *sepultar (entomb)* u *onda atronadora*. Sabiduría es tu aptitud mágica para estos conjuros.",
      n: 1
    },
    {
      nombre: "Golpes Elementales (Elemental Strikes)",
      t: "adicional",
      texto: "Cuando usas una acción para lanzar un conjuro otorgado por tu rasgo Potencial Innato, puedes hacer un ataque de arma como acción adicional.",
      n: 6
    },
    {
      nombre: "Danza Primigenia (Primal Dance)",
      t: "reaccion",
      texto: "Como reacción cuando una criatura hostil se mueve a 15 pies o menos de ti, puedes moverte hasta tu velocidad sin provocar ataques de oportunidad.",
      n: 10
    },
    {
      nombre: "Dualidad (Duality)",
      t: "pasiva",
      texto: "Elige un segundo Elemento Primario (Prime Element). Obtienes los beneficios de ambos, y cuando un rasgo produzca un efecto basado en el elemento que has elegido, puedes decidir cuál de esos elementos manifestar.",
      n: 14
    }
  ]
};

export const dragonGuard: Subclase = {
  n: 1,
  rasgos: [
    {
      nombre: "Influencia Dracónica (Draconic Influence)",
      t: "pasiva",
      texto: "Elige un tipo de dragón (determinará tus rasgos de nivel 10 y 14). Obtienes competencia en la habilidad asociada (si no lo eres ya).",
      n: 1
    },
    {
      nombre: "Disparo de Dragón (Dragon Shot)",
      t: "pasiva",
      texto: "Cuando tomas la acción de Atacar, puedes expulsar una ráfaga de energía por la boca como parte de la misma acción. Es un ataque de conjuro a distancia con 60 pies de alcance que ignora cobertura media y hace 1d4 de daño del tipo asociado a tu dragón. Eres competente y usa Sabiduría para el ataque y el daño.",
      n: 1
    },
    {
      nombre: "Forma del Dragón (Forma of the Dragon)",
      t: "accion",
      texto: "Como acción, gastas dos dados de poder. Durante 1 minuto obtienes:\n* Tu cara se vuelve el hocico de un lagarto, dándote un ataque de mordisco (arma natural, inflige daño perforante igual a tu dado de poder). Si impactas, puedes usar una acción adicional para intentar apresar al objetivo con la boca. Mientras siga apresado así, puedes usar una acción adicional para infligirle daño perforante igual a tu dado de poder.\n* Te salen alas palmeadas, dándote velocidad de vuelo de 10 pies. Cuando un enemigo que puedes ver te hace un ataque a distancia, puedes usar tu reacción para aletear e imponerle desventaja.\n* Al usar tu Disparo de Dragón, tiras un dado de poder y sumas el resultado al daño.",
      n: 6
    },
    {
      nombre: "Protección Dracónica (Draconic Warding)",
      t: "pasiva",
      texto: "Tu piel adquiere el tono de tu dragón y se vuelve similar al cuero. El daño que recibes del tipo asociado a tu influencia dracónica se reduce en una cantidad igual a tu modificador por Sabiduría (mínimo 1).",
      n: 10
    },
    {
      nombre: "Furia de Dragones (Fury of Dragons)",
      t: "pasiva",
      texto: "Obtienes un rasgo según tu dragón:\n* **Negro:** Al dañar a una criatura sorprendida, tu dado de daño de arma y los dados de poder que gastes en ese ataque hacen el daño máximo.\n* **Azul:** Al atacar a alguien a 20 pies o más por encima o debajo de ti, haces daño adicional igual a tu dado de poder.\n* **Oropel (Brass):** Como acción adicional, exhalas gas noqueador en un cono de 15 pies. Deben superar una salvación de Constitución o quedar incapacitados hasta el comienzo de su siguiente turno.\n* **Bronce:** Como acción adicional, exhalas gas repulsivo en un cono de 15 pies. Deben superar una salvación de Constitución o se ven obligados a moverse la mitad de su velocidad lejos de ti.\n* **Cobre:** Como acción adicional, exhalas gas pesado en un cono de 15 pies. Deben superar una salvación de Constitución o no podrán usar las acciones de Correr o Retirarse hasta el final de su siguiente turno.\n* **Oro:** Como acción adicional, exhalas aire seco y caliente en un cono de 15 pies. Deben hacer salvación de Constitución; si fallan, solo hacen la mitad del daño con ataques de arma que usen Fuerza o Destreza hasta el final de su siguiente turno.\n* **Verde:** Como acción, estudias los movimientos de una criatura. Gastas un dado de poder y sumas el resultado a todas las tiradas de ataque contra ella hasta el final de tu siguiente turno.\n* **Rojo:** Al hacer daño de fuego a una criatura, puedes gastar un dado de poder y sumar el doble del resultado al daño.\n* **Plata:** Como acción adicional, exhalas gas embriagador en un cono de 15 pies. Deben superar una salvación de Constitución o quedar hechizados por ti hasta el final de su siguiente turno.\n* **Blanco:** Al hacer daño de frío a una criatura, puedes gastar un dado de poder y sumar el doble del resultado al daño.",
      n: 14
    }
  ]
};

export const opciones = {
  "Estilo de Combate Warden": [
    "Tiro con Arco (Archery): Obtienes un bonificador de +2 a las tiradas de ataque que hagas con armas a distancia.",
    "Combate con Armas a Dos Manos (Great Weapon Fighting): Cuando saques un 1 o un 2 en el dado de daño en un ataque que hagas con un arma cuerpo a cuerpo empuñada con ambas manos, puedes volver a tirar el dado y debes usar la nueva tirada. El arma debe tener la propiedad a dos manos o versátil.",
    "Protección (Protection): Cuando una criatura que puedas ver ataca a un objetivo que no seas tú y esté a 5 pies de ti, puedes usar tu reacción para imponer desventaja a la tirada de ataque. Debes llevar un escudo."
  ],
  "Influencia Dracónica": [
    "Negro (Black): Sigilo. Daño: Ácido.",
    "Azul (Blue): Engaño. Daño: Relámpago.",
    "Oropel (Brass): Persuasión. Daño: Fuego.",
    "Bronce (Bronze): Perspicacia. Daño: Relámpago.",
    "Cobre (Copper): Interpretación. Daño: Ácido.",
    "Oro (Gold): Perspicacia. Daño: Fuego.",
    "Verde (Green): Engaño. Daño: Veneno.",
    "Rojo (Red): Intimidación. Daño: Fuego.",
    "Plata (Silver): Historia. Daño: Frío.",
    "Blanco (White): Supervivencia. Daño: Frío."
  ]
};

export const conjuros = [
  {
    nombre: "Lluvia Ácida (Acid Rain)",
    nivel: 2,
    escuela: "Transmutación",
    tiempo: "1 acción",
    alcance: "120 pies",
    componentes: "V, S, M (un vial de ácido)",
    duracion: "Concentración, hasta 10 minutos",
    clases: ["Bardo", "Druida", "Warden", "Mago"],
    desc: "Aparece una nube acre en forma de cilindro de 10 pies de alto con 15 pies de radio, centrada en un punto que puedas ver a 100 pies directamente sobre ti. El conjuro falla si no puedes ver un punto en el aire (ej. si la habitación no puede acomodar la nube).\nCuando lanzas el conjuro, llueve ácido en el área inferior. Cada criatura debajo debe hacer una tirada de salvación de Destreza, recibiendo 2d12 de daño de ácido si falla, o la mitad si tiene éxito. En cada uno de tus turnos, puedes usar una acción para expulsar lluvia ácida de nuevo, y puedes usar una acción adicional para mover la nube hasta 15 pies.\nSi estás al aire libre en condiciones de lluvia, la lluvia natural debilita el ácido pero lo esparce: la nube tiene 30 pies de radio, pero el daño disminuye en 1d12.\n**A niveles superiores:** +1d12 por cada nivel de espacio superior a 2º."
  },
  {
    nombre: "Armadura de Hielo (Armor of Ice)",
    nivel: 2,
    escuela: "Abjuración",
    tiempo: "1 acción",
    alcance: "Personal",
    componentes: "V, S",
    duracion: "10 minutos",
    clases: ["Druida", "Hechicero", "Warden"],
    desc: "Tu cuerpo se envuelve en una gruesa capa de hielo, con protuberancias fractales que terminan en pinchos. Hasta que termine, tu CA no puede ser inferior a 15 sin importar qué armadura lleves, y tu velocidad se reduce en 10 pies. Cuando una criatura a 5 pies de ti te impacta con un ataque cuerpo a cuerpo, recibe 1d4 de daño perforante y 1d4 de frío.\nPuedes terminar el conjuro prematuramente como acción adicional."
  },
  {
    nombre: "Brasear (Braise)",
    nivel: 0,
    escuela: "Evocación",
    tiempo: "1 acción",
    alcance: "5 pies",
    componentes: "V, S",
    duracion: "Instantánea",
    clases: ["Hechicero", "Warden", "Mago"],
    desc: "Una chispa se enciende al chasquear los dedos, convirtiendo tu puño vacío en una llamarada. Haz un ataque de conjuro cuerpo a cuerpo contra una criatura a tu alcance. Si impactas, recibe 1d8 de daño de fuego. Si el objetivo lleva armadura de metal, recibe en su lugar 1d12 de daño de fuego.\nEl daño aumenta en un dado a nivel 5 (2d8 o 2d12), 11 (3d8 o 3d12) y 17 (4d8 o 4d12)."
  },
  {
    nombre: "Empapar (Douse)",
    nivel: 0,
    escuela: "Transmutación",
    tiempo: "1 acción",
    alcance: "30 pies",
    componentes: "V, S",
    duracion: "Instantánea",
    clases: ["Druida", "Hechicero", "Warden", "Mago"],
    desc: "Un chorro de agua surge de tu mano extendida, empapando a una criatura que puedas ver dentro del alcance. Haz un ataque de conjuro a distancia. Si impactas, el objetivo recibe 1d10 de daño de frío. Si estás al aire libre en condiciones de tormenta, el conjuro actúa como pararrayos, infligiendo 1d4 de daño de relámpago adicional.\nEl daño aumenta en un dado a nivel 5 (2d10 y 2d4), 11 (3d10 y 3d4) y 17 (4d10 y 4d4)."
  },
  {
    nombre: "Caída en Picada (Downdrop)",
    nivel: 2,
    escuela: "Transmutación",
    tiempo: "1 reacción, que tomas cuando una criatura voladora se mueve dentro del alcance",
    alcance: "30 pies",
    componentes: "V, S, M (una bolita de plomo)",
    duracion: "Concentración, hasta 1 minuto",
    clases: ["Bardo", "Druida", "Hechicero", "Warden (Fanatic)", "Mago"],
    desc: "Susurras una palabra de mando y una bolita de plomo se lanza hacia un enemigo volador. La criatura voladora debe hacer una tirada de salvación de Destreza. Si falla, el plomo se incrusta en su cuerpo, forzándolo a caer al suelo y reduciendo su velocidad de vuelo a 0 durante la duración."
  },
  {
    nombre: "Colmillos Goteantes (Dripping Fangs)",
    nivel: 1,
    escuela: "Transmutación",
    tiempo: "1 acción",
    alcance: "Toque",
    componentes: "V",
    duracion: "Instantánea",
    clases: ["Druida", "Hechicero", "Warden"],
    desc: "Sueltas un rugido bestial mientras a tu boca le crecen colmillos goteantes de saliva corrosiva. Haz un ataque de conjuro cuerpo a cuerpo contra una criatura a tu alcance. Si impactas, recibe 4d6 de daño de ácido. Si el objetivo está apresado o restringido, recibe 2d6 de daño adicional.\n**A niveles superiores:** +2d6 por cada nivel de espacio por encima de 1º."
  },
  {
    nombre: "Sepultar (Entomb)",
    nivel: 1,
    escuela: "Evocación",
    tiempo: "1 acción",
    alcance: "60 pies",
    componentes: "V, S, M (una onza de agua o hielo)",
    duracion: "Concentración, hasta 1 minuto",
    clases: ["Bardo", "Druida", "Hechicero", "Warden (Sage)"],
    desc: "Pones el agua en tus labios y soplas suavemente hacia una criatura dentro del alcance. Debe superar una salvación de Fuerza o ganar un nivel de sepultura:\n*   **Nivel 1:** Velocidad reducida a la mitad.\n*   **Nivel 2:** Velocidad reducida a 0.\n*   **Nivel 3+:** Incapacitado.\nMientras mantienes concentración, puedes usar una acción para intentar profundizar la congelación, forzando otra salvación de Fuerza o ganando otro nivel.\nSi una criatura recibe daño mientras está incapacitada por esto, el hielo se rompe, recibe 6d6 de daño de frío extra y pierde todos los niveles, terminando el conjuro inmediatamente.\nComo acción en su turno, la criatura puede intentar liberarse con una salvación de Fuerza; con éxito pierde 1 nivel. Si llega a 0 niveles, el conjuro termina."
  },
  {
    nombre: "Arrojar (Fling)",
    nivel: 0,
    escuela: "Encantamiento",
    tiempo: "1 acción",
    alcance: "60 pies",
    componentes: "V, S, M (un trozo de roca)",
    duracion: "Instantánea",
    clases: ["Bardo", "Druida", "Hechicero", "Warden", "Mago"],
    desc: "Encantas una pequeña roca y se la arrojas a una criatura. Haz un ataque de conjuro a distancia. Si impactas, recibe 1d6 de daño contundente. Además, la criatura se enfurece contigo hasta el principio de tu siguiente turno (la inmunidad a estar hechizado ignora esto). La primera tirada de ataque del objetivo contra ti mientras está enfurecido tiene ventaja. Si este ataque falla, puedes usar tu reacción para hacer un ataque de oportunidad contra ella.\nEl daño aumenta en 1d6 a nivel 5 (2d6), 11 (3d6) y 17 (4d6)."
  },
  {
    nombre: "Lluvia Helada (Freezing Rain)",
    nivel: 0,
    escuela: "Conjuración",
    tiempo: "1 acción",
    alcance: "30 pies",
    componentes: "V, S",
    duracion: "Instantánea",
    clases: ["Druida", "Hechicero", "Warden"],
    desc: "Una nube oscura empapa a la criatura con lluvia helada. Debe hacer una salvación de Constitución. Si falla, recibe 1d6 de daño de frío y no puede usar acciones adicionales hasta el final de su siguiente turno.\nEl daño aumenta en 1d6 a nivel 5 (2d6), 11 (3d6) y 17 (4d6)."
  },
  {
    nombre: "Fumigar (Fumigate)",
    nivel: 0,
    escuela: "Conjuración",
    tiempo: "1 acción",
    alcance: "30 pies",
    componentes: "V, S",
    duracion: "Concentración, hasta 1 minuto",
    clases: ["Druida", "Hechicero", "Warden", "Brujo", "Mago"],
    desc: "Una nube de gas nocivo de 5 pies de radio aparece en un punto. Toda criatura que empiece su turno dentro debe hacer una salvación de Constitución (1d10 daño de veneno si falla). Si empieza y termina su turno en la nube, debe hacer otra salvación de Constitución o quedar envenenada por 1 minuto (puede repetir la salvación al final de cada turno para terminar el efecto). En turnos siguientes, puedes usar una acción adicional para mover la nube 5 pies (10 pies a nivel 5, 15 pies a nivel 11, 20 pies a nivel 17)."
  },
  {
    nombre: "Deslizamiento Glaciar (Glacial Slide)",
    nivel: 0,
    escuela: "Transmutación",
    tiempo: "1 acción",
    alcance: "30 pies",
    componentes: "V, S",
    duracion: "Instantánea",
    clases: ["Druida", "Warden"],
    desc: "Una ola de aire frío baña un punto en el suelo, creando hielo resbaladizo. Toda criatura a 5 pies de este punto debe superar una salvación de Destreza o caer derribada."
  },
  {
    nombre: "Tierra Aferradora (Grasping Earth)",
    nivel: 2,
    escuela: "Conjuración",
    tiempo: "1 acción",
    alcance: "30 pies",
    componentes: "V, S",
    duracion: "Concentración, hasta 1 minuto",
    clases: ["Druida", "Explorador", "Hechicero", "Warden (Guardian)"],
    desc: "Un punto en el suelo se encanta. Si una criatura se mueve a 5 pies de este punto, puedes usar tu reacción para que el suelo la atrape. Debe hacer una salvación de Fuerza (con desventaja si estaba justo sobre el origen). Si falla, queda restringida y recibe 2d8 de daño contundente. Al principio de cada uno de sus turnos, puede hacer otra salvación para liberarse. En tu turno, puedes usar una acción para tirar de la criatura apresada, recibiendo otros 2d8 de daño contundente."
  },
  {
    nombre: "Rebote de Relámpago (Lightning Recoil)",
    nivel: 5,
    escuela: "Evocación",
    tiempo: "1 acción",
    alcance: "Personal",
    componentes: "V, S",
    duracion: "Concentración, hasta 1 minuto",
    clases: ["Druida", "Hechicero", "Warden", "Mago"],
    desc: "Una nube sobre ti te golpea con relámpagos inofensivos. Cada criatura que empiece su turno a 5 pies de ti, o se mueva ahí por primera vez en su turno, debe hacer una salvación de Constitución. Si falla, recibe 5d10 de daño de relámpago y queda aturdida hasta el final de su turno. Si tiene éxito, se vuelve inmune a este efecto durante 1 minuto."
  },
  {
    nombre: "Manifestar Elementos (Manifest Elements)",
    nivel: 3,
    escuela: "Evocación",
    tiempo: "1 acción",
    alcance: "Personal",
    componentes: "V, S",
    duracion: "Concentración, hasta 1 hora",
    clases: ["Explorador", "Hechicero", "Warden (Guardian)"],
    desc: "Irradias el poder de los elementos. Elige un daño: ácido, frío, fuego, relámpago o trueno. El primer ataque de arma de cada turno hace 1d8 extra de ese daño. Si sacas crítico, aplicas un efecto:\n*   **Ácido:** Se corroe y destruye una pieza de equipo metálico no mágico del objetivo.\n*   **Frío:** El objetivo se congela hasta el núcleo (incapacitado hasta el final de su siguiente turno).\n*   **Fuego:** Una ráfaga quema a otras dos criaturas a 10 pies (2d8 daño de fuego).\n*   **Relámpago:** Elige una criatura con metal a 20 pies; el relámpago salta y sufre el mismo daño de relámpago infligido.\n*   **Trueno:** Explosión sónica audible a 300 pies; el objetivo y las criaturas a 10 pies (excepto tú) caen derribadas."
  },
  {
    nombre: "Marca de la Naturaleza (Nature's Brand)",
    nivel: 1,
    escuela: "Evocación",
    tiempo: "1 acción adicional",
    alcance: "Personal",
    componentes: "V",
    duracion: "Concentración, hasta 1 minuto",
    clases: ["Warden (Guardian)"],
    desc: "Recubres tu arma con luz mágica. El próximo impacto con arma inflige 1d6 extra de ácido, frío, fuego, relámpago o trueno. El objetivo hace salvación de Sabiduría; si falla queda marcado con esa energía. Mientras dura, cada vez que el marcado reciba daño de ese tipo, recibe 1d6 extra y puede hacer otra salvación de Sabiduría para terminar el conjuro. Si el objetivo u otro a 5 pies gasta su acción frotando la marca, el conjuro termina.\n**A niveles superiores:** El daño inicial extra aumenta en +1d6 por nivel superior."
  },
  {
    nombre: "Reflejar Elementos (Reflect Elements)",
    nivel: 1,
    escuela: "Abjuración",
    tiempo: "1 reacción, al recibir daño de ácido, frío, fuego, relámpago o trueno",
    alcance: "Especial",
    componentes: "V, S",
    duracion: "Instantánea",
    clases: ["Hechicero", "Warden (Fanatic)", "Mago"],
    desc: "Absorbes el daño y lo metabolizas hacia el atacante. Haz un ataque de conjuro a distancia; si impactas, el daño es igual al daño desencadenante más 1d8 del mismo tipo.\n**A niveles superiores:** +1d8 de daño extra por nivel superior."
  },
  {
    nombre: "Esculpir la Tierra (Sculpt Earth)",
    nivel: 0,
    escuela: "Transmutación",
    tiempo: "1 acción o 1 reacción (al ver un ataque a distancia contra ti)",
    alcance: "30 pies",
    componentes: "S",
    duracion: "1 hora o Instantánea",
    clases: ["Druida", "Warden"],
    desc: "Das forma a tierra y rocas sueltas para crear un objeto inanimado en el suelo no mayor a un cubo de 5 pies (cualquier diseño). Cualquier ataque hacia él impacta automáticamente y lo destruye.\nSi lo lanzas como reacción, se esculpe deprisa y provee cobertura media contra el ataque desencadenante; impacte o falle el ataque, el objeto se desmorona de inmediato."
  },
  {
    nombre: "Corte de Aguanieve (Sleeting Slice)",
    nivel: 2,
    escuela: "Conjuración",
    tiempo: "1 acción",
    alcance: "Personal",
    componentes: "V, S",
    duracion: "Concentración, hasta 1 minuto",
    clases: ["Druida", "Explorador", "Hechicero", "Warden"],
    desc: "Extraes agua del aire formando una espada de hielo. Como acción en cada uno de tus turnos, puedes usar este arma para un ataque de conjuro cuerpo a cuerpo. Si impactas, se hace añicos, tu concentración termina y el objetivo recibe 1d6 cortante y 2d6 frío. Además, cada criatura a 5 pies del objetivo (excepto tú) debe superar una salvación de Destreza o recibir 1d6 perforante y 2d6 frío.\n**A niveles superiores:** El daño de frío inicial y el de la explosión aumenta 1d6 por cada nivel superior."
  },
  {
    nombre: "Puño de Piedra (Stonefist)",
    nivel: 0,
    escuela: "Evocación",
    tiempo: "1 acción",
    alcance: "5 pies",
    componentes: "V, S",
    duracion: "Instantánea",
    clases: ["Druida", "Warden"],
    desc: "Escombros forman un bloque en tu puño. Haz un ataque de conjuro cuerpo a cuerpo. Si impactas, hace 1d8 de daño contundente, y si el objetivo es de tu tamaño o menor, lo empujas hasta 10 pies.\nEl daño aumenta en +1d8 a nivel 5, 11 y 17."
  },
  {
    nombre: "Orbe de Tormenta (Storm Orb)",
    nivel: 0,
    escuela: "Conjuración",
    tiempo: "1 acción",
    alcance: "Personal",
    componentes: "V, S",
    duracion: "Concentración, hasta 1 minuto",
    clases: ["Druida", "Hechicero", "Warden", "Brujo", "Mago"],
    desc: "Aparece una nube de tormenta sobre ti. La primera vez que una criatura te haga daño con un ataque cuerpo a cuerpo, puedes usar tu reacción para infligirle 1d8 de daño de relámpago, terminando el conjuro.\nEl daño aumenta en +1d8 a nivel 5, 11 y 17."
  }
];

=== B ===
{
  "Warden": {
    "tablaNivel": {
      "powerDiceCantidad": [0, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8],
      "powerDieDado": ["", "d4", "d4", "d4", "d4", "d6", "d6", "d6", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10"],
      "spellsKnown": [0, 0, 2, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10],
      "spellSlots": [0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3],
      "slotLevel": [0, 0, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5]
    },
    "usos": {
      "natural_power": { "formula": "WardenLevelTable.powerDiceCantidad", "reset": "mitad_corto_todo_largo" },
      "channel_power": { "formula": "1", "reset": "largo" },
      "master_of_elements": { "formula": "1", "reset": "largo" }
    }
  },
  "Guardian": {
    "conjurosSiemprePreparados": [
      { "nivel": 2, "conjuros": ["nature's brand"] },
      { "nivel": 5, "conjuros": ["grasping earth"] },
      { "nivel": 9, "conjuros": ["manifest elements"] },
      { "nivel": 13, "conjuros": ["stoneskin"] }
    ],
    "usos": {
      "fuerza_de_los_elementos": { "formula": "Math.max(1, WIS_MOD)", "reset": "corto" }
    }
  },
  "Fanatic": {
    "conjurosSiemprePreparados": [
      { "nivel": 2, "conjuros": ["reflect elements"] },
      { "nivel": 5, "conjuros": ["downdrop"] },
      { "nivel": 9, "conjuros": ["haste"] },
      { "nivel": 13, "conjuros": ["fire shield"] }
    ],
    "usos": {
      "poder_preciso": { "formula": "Math.max(1, WIS_MOD)", "reset": "largo" }
    }
  },
  "Sage": {
    "conjurosSiemprePreparados": [
      { "nivel": 2, "conjuros": ["faerie fire"] },
      { "nivel": 5, "conjuros": ["moonbeam"] },
      { "nivel": 9, "conjuros": ["protection from energy"] },
      { "nivel": 13, "conjuros": ["polymorph"] }
    ]
  },
  "Dragon Guard": {
    "conjurosSiemprePreparados": [
      { "nivel": 2, "conjuros": ["command"] },
      { "nivel": 5, "conjuros": ["levitate"] },
      { "nivel": 9, "conjuros": ["fear"] },
      { "nivel": 13, "conjuros": ["polymorph"] }
    ]
  }
}

=== C ===
{
  "warden": "Warden (Valda's Spire of Secrets)",
  "guardian": "Warden (Valda's Spire of Secrets)",
  "fanatic": "Warden (Valda's Spire of Secrets)",
  "sage": "Warden (Valda's Spire of Secrets)",
  "dragon-guard": "Warden (Valda's Spire of Secrets)"
}

=== D ===
{
  "warden": "Un guerrero tenaz que domina la naturaleza mediante sus instintos, su destreza marcial y el poder innato de los elementos.",
  "guardian": "Maestros del combate que han perfeccionado el uso del acero y la armadura para canalizar su brutal afinidad elemental.",
  "fanatic": "Pugilistas desarmados que prescinden de armas, canalizando el furor de los elementos directamente a través de sus puños y cuerpos.",
  "sage": "Custodios altamente sintonizados con la magia primaria, capaces de invocar el poder en bruto de la naturaleza en cada golpe.",
  "dragon-guard": "Guardianes dedicados que extraen su poder de las imponentes habilidades y resistencia de los dragones primigenios."
}

=== E ===
Dudas y Notas:
* Se han adaptado las acciones y mecánicas al formato estricto y a los términos oficiales del D&D 2024.
* "Magia de Origen" (Source Magic) funciona exactamente como la Magia de Pacto de los brujos. Como aclara la caja de texto, un nivel 2 de Warden tiene espacios de Nivel 1. Los hechizos de las subclases (Spells) se obtienen en el Nivel 2 del Warden (el momento en que realmente gana acceso a los conjuros), en lugar de nivel 1. Se ha documentado así en la tabla conjurosSiemprePreparados.
* Algunas habilidades y conjuros como Entomb o Downdrop se han adaptado a un nombre descriptivo ("Sepultar" y "Caída en Picada", respectivamente) de manera natural al español para habilidades conjuradas y para evitar traducciones toscas.
* Los conjuros Thunderous Charge y Toxin Well no están presentes en esta entrega de TypeScript porque forman parte de las Páginas 19 y 20 que abordará el Lote 34b, como lo indica el corte de tu instrucción.