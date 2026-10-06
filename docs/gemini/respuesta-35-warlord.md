=== A ===
```typescript
export const warlord = {
  nombre: "Señor de la Guerra (Warlord)",
  dado: "d8",
  sv: ["Sabiduría", "Carisma"],
  habN: 2,
  habs: ["Atletismo", "Engaño", "Historia", "Perspicacia", "Intimidación", "Investigación", "Persuasión"],
  arm: ["Armadura ligera", "Armadura media", "Escudos"],
  armas: ["Armas simples", "Ballesta de mano", "Arco largo", "Espada larga", "Estoque", "Cimitarra", "Espada corta"],
  equipo: "(a) cota de escamas o (b) armadura de cuero\n(a) un arma simple, (b) una espada larga o (c) un estoque\n(a) ballesta ligera y 20 virotes o (b) cinco jabalinas\n(a) un paquete de erudito o (b) un paquete de explorador\nUn set de juego de tu elección",
  rasgos: [
    {
      nombre: "Estilo de Liderazgo (Leadership Style)",
      t: "pasiva",
      texto: "A nivel 1, eliges el Estilo de Liderazgo de tu Señor de la Guerra, obteniendo los beneficios correspondientes y el modificador de Liderazgo:\n\n**Capitán (Captain)**\nLideras desde el frente con presencia. Usas Carisma como tu modificador de Liderazgo. También obtienes competencia en armadura pesada y tu elección entre Intimidación o Persuasión.\n\n**Mentor (Mentor)**\nAconsejas a otros con perspectivas sabias. Usas Sabiduría como tu modificador de Liderazgo. Además, siempre que una criatura a 15 pies o menos de ti falle un ataque o una prueba de característica, puedes usar tu reacción para tirar 1d4 y añadir el resultado a su tirada.\n\n**Estratega (Strategist)**\nGuías a otros con astucia e ingenio. Usas Inteligencia como tu modificador de Liderazgo, y cuando tiras iniciativa puedes cambiar de lugar en el orden de iniciativa con una criatura dispuesta.",
      n: 1
    },
    {
      nombre: "Palabra Inspiradora (Inspiring Word)",
      t: "adicional",
      texto: "A nivel 1, usas una acción adicional para gritar una palabra inspiradora a otra criatura que pueda oírte a 30 pies o menos. Esta gana puntos de golpe temporales iguales a 1d4 + tu modificador de Liderazgo.\n\nEn ciertos niveles, el dado que tiras para este rasgo aumenta para coincidir con la columna de Dado de Hazaña en la tabla del Señor de la Guerra.\n\nPuedes usar este rasgo el número de veces indicado en la columna de Palabra Inspiradora en la tabla del Señor de la Guerra. Recuperas todos los usos gastados cuando terminas un descanso corto o largo.",
      n: 1,
      usos: "tabla",
      reset: "corto"
    },
    {
      nombre: "Estilo de Lucha (Fighting Style)",
      t: "pasiva",
      texto: "A nivel 2, adoptas un Estilo de Lucha que refleje mejor tu entrenamiento. No puedes elegir un Estilo de Lucha más de una vez, incluso si un rasgo te permite elegir otro Estilo de Lucha. Siempre que ganes un nivel en esta clase, puedes cambiar tu Estilo de Lucha por otro Estilo de Lucha de tu elección (consulta las opciones elegibles).",
      n: 2
    },
    {
      nombre: "Hazañas Tácticas (Tactical Exploits)",
      t: "pasiva",
      texto: "Tu conocimiento de la guerra te permite emplear potentes estrategias en batalla. A nivel 2, aprendes a usar Hazañas Tácticas como se detalla a continuación:\n\n**Dados de Hazaña (Exploit Dice)**\nLa tabla del Señor de la Guerra muestra el número de Dados de Hazaña que tienes para realizar cualquier Hazaña Táctica que conozcas. Algunas Hazañas requieren que gastes estos Dados de Hazaña para usarlas. Solo puedes usar una Hazaña por ataque, prueba de característica o tirada de salvación. Recuperas todos los Dados de Hazaña gastados cuando terminas un descanso corto o largo.\n\nTus Dados de Hazaña comienzan como d4 y aumentan de tamaño a medida que ganas niveles de Señor de la Guerra, como se indica en la tabla del Señor de la Guerra.\n\n**Hazañas Conocidas (Exploits Known)**\nConoces dos Hazañas Tácticas de tu elección de la lista al final de la descripción de esta clase. La columna de Hazañas Conocidas de la tabla del Señor de la Guerra muestra cuándo aprendes más Hazañas. Para aprender una Hazaña debes cumplir con cualquier prerrequisito que pueda tener, como una Puntuación de Característica mínima o un cierto nivel de Señor de la Guerra.\n\nSiempre que ganes un nivel de Señor de la Guerra, puedes reemplazar una de las Hazañas que conoces por una Hazaña Táctica de tu elección.\n\n**Tiradas de Salvación**\nSi una de tus Hazañas Tácticas requiere que una criatura haga una tirada de salvación, la CD de salvación de tu Hazaña se calcula de la siguiente manera:\n**CD de salvación de Hazaña** = 8 + tu bono de competencia + tu modificador de Liderazgo",
      n: 2
    },
    {
      nombre: "Academia de Guerra (Academy of War)",
      t: "pasiva",
      texto: "A nivel 3, elige la Academia de Guerra que mejor represente a tu Señor de la Guerra. Tu Academia de Guerra te otorga rasgos a nivel 3, y nuevamente cuando alcanzas los niveles 6, 14 y 18 en esta clase.\n\n**Hazañas de Academia**\nAlgunas Academias de Guerra incluyen una lista de Hazañas que todos los Señores de la Guerra de la Academia aprenden a los niveles descritos. Estas Hazañas no cuentan para tu número total de Hazañas Conocidas y no se pueden reemplazar al ganar un nivel. Si no cumples sus prerrequisitos, las aprendes de todos modos.",
      n: 3
    },
    {
      nombre: "Ataque Adicional (Extra Attack)",
      t: "pasiva",
      texto: "A partir del nivel 5, cuando tomas la acción de Atacar, puedes atacar dos veces en lugar de una vez.",
      n: 5
    },
    {
      nombre: "Líder Valiente (Valiant Leader)",
      t: "pasiva",
      texto: "Has perfeccionado tu Estilo de Liderazgo con práctica y estudio. A partir del nivel 7, tu Estilo de Liderazgo te otorga mayores beneficios:\n\n**Capitán:** Las criaturas que tienen puntos de golpe temporales de tu Palabra Inspiradora o Hazañas Tácticas tienen ventaja en las tiradas de salvación para resistir las condiciones asustado y hechizado.\n\n**Mentor:** Cuando usas tu reacción de Mentor, su alcance es de 30 pies. Además, el bonificador aumenta para coincidir con una tirada del dado de la columna de Dado de Hazaña para tu nivel en la tabla del Señor de la Guerra.\n\n**Estratega:** Las criaturas que tienen puntos de golpe temporales de tu Palabra Inspiradora o tus Hazañas Tácticas tienen ventaja en las tiradas de iniciativa, siempre y cuando no estén sorprendidas o incapacitadas.",
      n: 7
    },
    {
      nombre: "Grito de Fomento (Rallying Cry)",
      t: "reaccion",
      texto: "Puedes alentar a tus aliados a encontrar el éxito donde de otro modo fallarían. A partir del nivel 9, cuando otra criatura que pueda verte u oírte a 30 pies o menos falla una tirada de salvación, puedes usar tu reacción para alentarla con un grito de fomento. La criatura repite inmediatamente su tirada de salvación y añade tu modificador de Liderazgo (mínimo +1) a su resultado.\n\nUna vez que usas este rasgo, debes terminar un descanso corto o largo antes de poder usarlo de nuevo. Ganas un uso adicional de este rasgo cuando alcanzas los niveles 13 y 17 en esta clase.",
      n: 9,
      usos: "1 al 9, 2 al 13, 3 al 17",
      reset: "corto"
    },
    {
      nombre: "Voluntad Inquebrantable (Unwavering Will)",
      t: "pasiva",
      texto: "Como líder, no te puedes permitir el lujo de sucumbir a tus instintos más básicos. A partir del nivel 10, tienes ventaja en las tiradas de salvación para evitar estar hechizado, asustado o aturdido.",
      n: 10
    },
    {
      nombre: "Superioridad Táctica (Tactical Superiority)",
      t: "pasiva",
      texto: "Tus habilidades de liderazgo eclipsan incluso a las de otros comandantes profesionales. A partir del nivel 11, cuando tiras iniciativa recuperas un uso tanto de Palabra Inspiradora como de Grito de Fomento.\n\nAdemás, el alcance de tu Palabra Inspiradora, Grito de Fomento y cualquier Hazaña Táctica que conozcas se duplica.",
      n: 11
    },
    {
      nombre: "Líder Exaltado (Exalted Leader)",
      t: "pasiva",
      texto: "Eres un verdadero maestro de tu Estilo de Liderazgo. A nivel 15, tu Estilo de Liderazgo te otorga los siguientes beneficios:\n\n**Capitán:** Puedes elegir como objetivo a criaturas que están a 0 puntos de golpe, pero no muertas, con Palabra Inspiradora, y recuperan puntos de golpe en lugar de los puntos de golpe temporales otorgados normalmente por Palabra Inspiradora.\n\n**Mentor:** Cuando usas Palabra Inspiradora en una criatura, terminas una de las siguientes condiciones que la esté afectando (tú eliges): aturdido, asustado, cegado, ensordecido, envenenado o hechizado.\n\n**Estratega:** Cuando usas Palabra Inspiradora en una criatura, esta puede moverse hasta su velocidad de caminar sin provocar ataques de oportunidad.",
      n: 15
    },
    {
      nombre: "Indómito (Dauntless)",
      t: "pasiva",
      texto: "Rivalizas con los grandes comandantes y conquistadores de leyenda. A nivel 20, puedes usar tu Palabra Inspiradora y Grito de Fomento un número ilimitado de veces. Además, siempre que uses Palabra Inspiradora, lo tratas como la tirada máxima posible.",
      n: 20
    }
  ]
};

export const academyOfChivalry = {
  n: 3,
  rasgos: [
    {
      nombre: "Caballero Ungido (Anointed Knight)",
      t: "pasiva",
      texto: "A nivel 3, has sido entrenado en las habilidades clásicas de la caballería. Ganas competencia con todas las armas marciales, un instrumento musical y en Historia, Interpretación o Religión a tu elección.",
      n: 3
    },
    {
      nombre: "Hazañas Caballerescas (Chivalric Exploits)",
      t: "pasiva",
      texto: "A nivel 3, aprendes ciertas Hazañas a niveles específicos:\n- **Nivel 3:** Orden de Ataque (Attack Order), Presencia Imponente (Commanding Presence)\n- **Nivel 5:** Mantener la Línea (Hold the Line), Orden Rejuvenecedora (Rejuvenating Order)\n- **Nivel 9:** Rescate Audaz (Daring Rescue)\n\nEstas no cuentan para tu número total de Hazañas Conocidas y no se pueden cambiar al ganar un nivel.",
      n: 3
    },
    {
      nombre: "Presencia Inspiradora (Inspiring Presence)",
      t: "reaccion",
      texto: "A nivel 3, tus éxitos motivan a tus aliados a tener éxito también. Cuando tienes éxito en una tirada de salvación, puedes usar tu reacción para fomentar a otra criatura sujeta al mismo efecto que pueda verte u oírte, y esta automáticamente tiene éxito en su tirada de salvación.\n\nPuedes alentar a criaturas adicionales como parte de esta reacción gastando un uso de Palabra Inspiradora por cada criatura adicional después de la primera.",
      n: 3
    },
    {
      nombre: "Liderar la Carga (Lead the Charge)",
      t: "adicional",
      texto: "A nivel 6, lideras mejor desde la primera línea. Cuando tomas la acción de Atacar en tu turno y realizas al menos un ataque cuerpo a cuerpo, puedes emitir una *Orden de Ataque* como acción adicional en ese turno.",
      n: 6
    },
    {
      nombre: "Llamas de Esperanza (Flames of Hope)",
      t: "accion",
      texto: "A nivel 14, como acción, puedes lanzar un grito que inflama los corazones de los aliados e inspira terror en tus enemigos. Las criaturas que puedan oírte a 30 pies o menos obtienen uno de los siguientes efectos:\n\n- **Criaturas amistosas:** Ganan puntos de golpe temporales iguales a una tirada de tu Dado de Hazaña + tu modificador de Liderazgo, y mientras duren, la criatura no puede ser asustada.\n- **Criaturas enemigas:** Deben tener éxito en una tirada de salvación de Sabiduría contra tu CD de Salvación de Hazaña o estarán asustadas de ti durante 1 minuto. Las criaturas asustadas pueden repetir esta tirada de salvación al final de cada uno de sus turnos y cada vez que reciben daño, terminando el efecto si tienen éxito.\n\nUna vez que usas este rasgo debes completar un descanso corto o largo antes de poder usarlo de nuevo.",
      n: 14,
      usos: 1,
      reset: "corto"
    },
    {
      nombre: "Paragón de Caballería (Paragon of Chivalry)",
      t: "pasiva",
      texto: "A nivel 18, te eriges como un ejemplo de virtud caballeresca, un faro brillante para aquellos que te siguen. Eres inmune a las condiciones asustado y hechizado, y las criaturas de tu elección a 30 pies o menos que puedan verte tienen ventaja en las tiradas de salvación para resistir y terminar las condiciones asustado y hechizado.",
      n: 18
    }
  ]
};

export const academyOfFerocity = {
  n: 3,
  rasgos: [
    {
      nombre: "Instintos Bestiales (Bestial Instincts)",
      t: "pasiva",
      texto: "A nivel 3, aprendes a rastrear y cazar tan bien como los grandes depredadores de la naturaleza. Ganas competencia con armas marciales y a tu elección entre Percepción o Supervivencia.\n\nAdemás, siempre que realices una prueba de Sabiduría (Supervivencia) o Sabiduría (Percepción) basada en tu sentido del olfato u oído, puedes tratar una tirada de 7 o menos en el d20 como un 8.",
      n: 3
    },
    {
      nombre: "Hazañas Feroces (Ferocious Exploits)",
      t: "pasiva",
      texto: "A nivel 3, aprendes ciertas Hazañas a niveles específicos:\n- **Nivel 3:** Instinto Astuto (Cunning Instinct), Orden de Maniobra (Maneuvering Order)\n- **Nivel 5:** Crescendo de Violencia (Crescendo of Violence), Carga Salvaje (Wild Charge)\n- **Nivel 9:** Tácticas de Manada (Pack Tactics)\n\nEstas no cuentan para tu número total de Hazañas Conocidas y no se pueden cambiar al ganar un nivel.",
      n: 3
    },
    {
      nombre: "Líder de la Manada (Packleader)",
      t: "adicional",
      texto: "A nivel 3, lideras a tus aliados en la caza. Como acción adicional, puedes marcar a una criatura que puedas ver a 30 pies o menos como tu Presa. Cualquier criatura a la que apuntes con una Palabra Inspiradora o una Hazaña Táctica tiene ventaja en el primer ataque que realice contra tu Presa antes del comienzo de tu siguiente turno.\n\nLa marca termina antes si tu Presa se reduce a 0 puntos de golpe, si marcas a otra criatura o si estás incapacitado.\n\nUna vez que marcas a una criatura como Presa, debes terminar un descanso corto o largo antes de poder marcar a otra. Si no te quedan usos, puedes gastar un Dado de Hazaña para marcar a otra criatura.",
      n: 3,
      usos: 1,
      reset: "corto"
    },
    {
      nombre: "Emboscada Primordial (Primal Ambush)",
      t: "pasiva",
      texto: "A nivel 6, tu manada caza como una sola. Tú y las criaturas de tu elección a 30 pies o menos tienen ventaja en las pruebas de Destreza (Sigilo) y pueden viajar sigilosamente mientras se mueven a un ritmo normal.\n\nAdemás, mientras tienes una criatura marcada como tu Presa, puedes emitir una *Orden de Maniobra* como acción adicional. Sin embargo, el objetivo debe terminar este movimiento más cerca de tu Presa.",
      n: 6
    },
    {
      nombre: "La Emoción de la Caza (Thrill of the Hunt)",
      t: "reaccion",
      texto: "A nivel 14, una caza exitosa aviva tu sed de sangre. Cuando tu Presa es reducida a 0 puntos de golpe puedes usar tu reacción para marcar a otra criatura, y obtienes uno de los siguientes beneficios:\n- Obtienes puntos de golpe temporales iguales a tu nivel de Señor de la Guerra.\n- Recuperas un uso gastado de Palabra Inspiradora.\n- Recuperas un Dado de Hazaña gastado.",
      n: 14
    },
    {
      nombre: "Depredador Supremo (Apex Predator)",
      t: "pasiva",
      texto: "A nivel 18, tu porte primordial vigoriza a tus compañeros de manada. Tu velocidad aumenta en 10 pies, y tus ataques con armas contra tu Presa infligen daño adicional igual a una tirada de tu Dado de Hazaña.\n\nAdemás, cualquier criatura a la que apuntes con una Palabra Inspiradora, Grito de Fomento o una de tus Hazañas Tácticas también obtiene los beneficios anteriores hasta el comienzo de tu siguiente turno.",
      n: 18
    }
  ]
};

export const academyOfSchemes = {
  n: 3,
  rasgos: [
    {
      nombre: "Golpe Bajo (Cheap Shot)",
      t: "pasiva",
      texto: "A nivel 3, no estás por encima de usar trucos deshonrosos para asegurar tu victoria. Una vez por turno, cuando impactas a una criatura con un ataque con arma, puedes obligarla a hacer una tirada de salvación de Destreza contra tu CD de Salvación de Hazaña además del daño de tu ataque.\n\nSi falla, la velocidad de la criatura se reduce a la mitad y no puede tomar reacciones hasta el inicio de tu siguiente turno, y en su siguiente turno solo puede tomar una acción o una acción adicional, pero no ambas.",
      n: 3
    },
    {
      nombre: "Talentos Ruines (Dastardly Talents)",
      t: "pasiva",
      texto: "A nivel 3, usarás cualquier método necesario para lograr tus objetivos. Ganas competencia en Engaño, Herramientas de Disfraz y Herramientas de Envenenador. Puedes realizar pruebas de Característica de Liderazgo (Engaño) en lugar de la prueba normal de Carisma (Engaño).",
      n: 3
    },
    {
      nombre: "Hazañas Tramposas (Scheming Exploits)",
      t: "pasiva",
      texto: "A nivel 3, aprendes ciertas Hazañas a niveles específicos:\n- **Nivel 3:** Orden Perspicaz (Insightful Order), Engaño Sutil (Subtle Con)\n- **Nivel 5:** Golpe Exponedor (Exposing Strike), Ataque Sorpresa (Surprise Attack)\n- **Nivel 9:** Gambito Peligroso (Perilous Gambit)\n\nEstas no cuentan para tu número total de Hazañas Conocidas y no se pueden cambiar al ganar un nivel.",
      n: 3
    },
    {
      nombre: "Enfoque Despiadado (Ruthless Focus)",
      t: "pasiva",
      texto: "A nivel 6, animas a los aliados a cazar a los débiles. Cualquier criatura a la que apuntes con una Palabra Inspiradora o una Hazaña Táctica puede añadir tu modificador de Liderazgo al primer ataque que haga contra una criatura que sufra los efectos de *Golpe Bajo* antes del inicio de tu siguiente turno.\n\nAdemás, siempre que uses una Hazaña Táctica como parte de tu acción, puedes tomar la acción de Destrabarse o Esconderse como acción adicional en ese turno.",
      n: 6
    },
    {
      nombre: "Tácticas Retorcidas (Devious Tactics)",
      t: "reaccion",
      texto: "A nivel 14, no tienes reparos en dejar a otros en peligro. Cuando una criatura que puedes ver te elige como objetivo de un ataque, puedes usar tu reacción para obligar a otra criatura a 5 pies o menos a hacer una tirada de salvación de Destreza contra tu CD de Salvación de Hazaña. Si falla, cambias de lugar con la criatura y esta se convierte en el objetivo del ataque que desencadenó la reacción. Una criatura puede elegir fallar esta tirada voluntariamente.",
      n: 14
    },
    {
      nombre: "Mente Inescrutable (Inscrutable Mind)",
      t: "pasiva",
      texto: "A nivel 18, tus pensamientos y sueños no pueden ser leídos por medios mágicos, a menos que lo permitas. Si una criatura intenta leer tu mente, puedes presentarle pensamientos y motivaciones falsas realizando una prueba de Característica de Liderazgo (Engaño).",
      n: 18
    },
    {
      nombre: "Marcado para la Muerte (Marked for Death)",
      t: "gratis",
      texto: "A nivel 18, persigues implacablemente la destrucción de tus enemigos. Cuando una criatura falla su tirada de salvación contra *Golpe Bajo*, puedes elegir marcar a la criatura para la muerte. El primer ataque que impacte a esa criatura antes del inicio de tu siguiente turno se convierte automáticamente en un golpe crítico.\n\nUna vez que marcas a una criatura para la muerte debes completar un descanso corto o largo antes de poder usar este rasgo de nuevo.",
      n: 18,
      usos: 1,
      reset: "corto"
    }
  ]
};

export const academyOfSkalds = {
  n: 3,
  rasgos: [
    {
      nombre: "Hazañas de Escaldo (Skaldic Exploits)",
      t: "pasiva",
      texto: "A nivel 3, aprendes ciertas Hazañas a niveles específicos:\n- **Nivel 3:** Presencia Imponente (Commanding Presence), Orden de Ataque (Attack Order)\n- **Nivel 5:** Orden Vivificante (Enlivening Order), Voluntad Heroica (Heroic Will)\n- **Nivel 9:** Levantar a los Caídos (Stand the Fallen)\n\nEstas no cuentan para tu número total de Hazañas Conocidas y no se pueden cambiar al ganar un nivel.",
      n: 3
    },
    {
      nombre: "Guerrero Poeta (Warrior Poet)",
      t: "pasiva",
      texto: "A nivel 3, combinas la habilidad marcial y el talento musical para inspirar a tus aliados. Ganas competencia en armas marciales, dos instrumentos musicales a tu elección y en Interpretación.\n\nTambién tienes ventaja en cualquier prueba de Carisma (Interpretación) que realices y que incorpore un arma marcial.",
      n: 3
    },
    {
      nombre: "Lanzamiento de Conjuros (Spellcasting)",
      t: "pasiva",
      texto: "A nivel 3, tu talento en poesía y música te permite producir conjuros, de manera muy parecida a como lo hace el Bardo.\n\n- **Espacios de Conjuro:** Tienes espacios para lanzar tus conjuros de Bardo de nivel 1 o superior. Recuperas los espacios gastados tras un descanso largo.\n- **Conjuros Conocidos:** Conoces tres conjuros de nivel 1 de la lista de conjuros de Bardo. La tabla te indica cuándo aprendes más. Al subir de nivel, puedes reemplazar un conjuro conocido por otro de la lista de Bardo.\n- **Foco de Lanzamiento:** Puedes usar cualquier instrumento musical en el que tengas competencia como foco de lanzamiento. Los Escaldos suelen usar instrumentos de una mano (como cuernos de guerra) mientras sostienen un arma en la otra.\n- **Característica para Lanzar Conjuros:** Usas tu modificador de Liderazgo para tus conjuros de Bardo.\n**CD de salvación** = 8 + tu bono de competencia + tu modificador de Liderazgo\n**Modificador de ataque** = tu bono de competencia + tu modificador de Liderazgo",
      n: 3
    },
    {
      nombre: "Carga Galante (Gallant Charge)",
      t: "gratis",
      texto: "A nivel 6, cuando tiras iniciativa, puedes gastar un uso de Palabra Inspiradora para organizar una carga heroica. Tú y cualquier criatura de tu elección a 15 pies o menos que pueda oírte obtienen una bonificación a sus tiradas de iniciativa igual a una tirada de tu Dado de Hazaña. No puedes usar este rasgo si estás sorprendido o incapacitado al tirar iniciativa.",
      n: 6
    },
    {
      nombre: "Canciones de Guerra y Paz (Songs of War & Peace)",
      t: "adicional",
      texto: "A nivel 6, tu música puede relajar e inspirar. Las criaturas que pasen un descanso corto contigo tienen ventaja en las tiradas de sus Dados de Golpe.\n\nAdemás, cuando usas tu acción para lanzar un conjuro de Bardo, puedes usar una acción adicional para emitir una *Orden Vivificante*.",
      n: 6
    },
    {
      nombre: "Canto de Guerra (Warsong)",
      t: "pasiva",
      texto: "A nivel 14, inspiras a tus compañeros a resistir y luchar contra todo pronóstico. Cuando apuntas a una criatura amistosa con una Palabra Inspiradora, un Grito de Fomento o una Hazaña Táctica, esta tiene ventaja en la primera tirada de salvación que haga antes del comienzo de tu siguiente turno.",
      n: 14
    },
    {
      nombre: "Escaldo de Leyenda (Skald of Legend)",
      t: "pasiva",
      texto: "A nivel 18, se dice que los Escaldos de leyenda eran capaces de cambiar el rumbo de las batallas más desesperadas. Cuando usas una Hazaña Táctica puedes otorgar a un objetivo puntos de golpe temporales iguales a tu modificador de Liderazgo (mínimo de 1 punto de golpe temporal).\n\nAdemás, cuando tomas la acción de Atacar en tu turno, puedes lanzar un conjuro de Bardo en lugar de uno de tus ataques con arma.",
      n: 18
    }
  ]
};

export const academyOfTactics = {
  n: 3,
  rasgos: [
    {
      nombre: "Tácticas Avanzadas (Advanced Tactics)",
      t: "pasiva",
      texto: "A nivel 3, tu habilidad para aprender y ejecutar estrategias en combate supera a la de la mayoría de comandantes e incluso a otros Señores de la Guerra entrenados.\n\n- **Hazañas:** Aprendes dos Hazañas Tácticas de grado 1 de tu elección de la lista al final de la clase. Estas no cuentan para tu límite. A nivel 5 aprendes dos Hazañas de grado 2, y a nivel 9 aprendes una Hazaña de grado 3.\n- **Dados de Hazaña:** Tu número total de Dados de Hazaña aumenta en 1, y todos tus Dados de Hazaña aumentan para convertirse en d6. A nivel 5 son d8, a nivel 11 son d10, y a nivel 17 son d12.",
      n: 3
    },
    {
      nombre: "El Arte de la Guerra (The Art of War)",
      t: "pasiva",
      texto: "A nivel 3, ganas competencia en Historia y con dos sets de juego de tu elección. Siempre que realices una prueba de característica con cualquiera de estas competencias, puedes duplicar tu bono de competencia.",
      n: 3
    },
    {
      nombre: "Ajustes Estratégicos (Strategic Adjustments)",
      t: "pasiva",
      texto: "A nivel 3, cuando completas un descanso largo, puedes reemplazar una Hazaña Táctica que conozcas actualmente por otra Hazaña de tu elección del mismo grado. Cuando alcanzas el nivel 6 en esta clase, puedes hacerlo siempre que termines un descanso corto o largo.",
      n: 3
    },
    {
      nombre: "Cerebro sobre Fuerza (Brains over Brawn)",
      t: "adicional",
      texto: "A nivel 6, si usas una Hazaña Táctica como tu acción, o usas una Hazaña Táctica en lugar de cada ataque que puedes realizar, puedes usar una acción adicional en ese turno para tomar la acción de Destrabarse, o para usar una Hazaña de Orden (como *Orden de Ataque*) que conozcas.",
      n: 6
    },
    {
      nombre: "Conoce a tu Enemigo (Know Your Enemy)",
      t: "accion",
      texto: "A nivel 6, evalúas el potencial de otros de un vistazo. Como acción, elige una criatura que puedas ver a 60 pies o menos. Aprendes si es tu igual, superior o inferior en una de las siguientes áreas: Clase de Armadura, Puntos de Golpe Actuales, Velocidad de Caminar, Puntuación de Inteligencia, Puntuación de Sabiduría, Puntuación de Carisma.\n\nUna vez que usas este rasgo en una criatura, no puedes usarlo para aprender nada sobre ella hasta que termines un descanso corto o largo.",
      n: 6
    },
    {
      nombre: "Estratega Dotado (Gifted Strategist)",
      t: "pasiva",
      texto: "A nivel 14, no puedes ser sorprendido mientras estés consciente, y cuando tiras iniciativa, obtienes una acción especial que puedes tomar al comienzo del combate antes de que cualquier otra criatura tenga oportunidad de actuar. Esta acción especial solo puede usarse para utilizar una Hazaña Táctica que conozcas o para tomar la acción de Preparar.",
      n: 14
    },
    {
      nombre: "Maestro Táctico (Master Tactician)",
      t: "pasiva",
      texto: "A nivel 18, tienes un plan en marcha para cada eventualidad. Aprendes la hazaña *Plan de Contingencia*, pero no cuenta contra tu número total de Hazañas Conocidas. Al final de un descanso largo, puedes usar *Plan de Contingencia* sin gastar un Dado de Hazaña para poner el plan en marcha. Solo puedes tener un único plan de contingencia activo en cualquier momento dado.",
      n: 18
    }
  ]
};

export const warlordOptions = {
  // Estilos de Lucha
  "estilo-lucha-tiro-con-arco": "Ganas un bonificador de +2 a las tiradas de ataque que hagas con armas a distancia.",
  "estilo-lucha-esgrima-clasica": "Mientras empuñas un arma sutil (finesse) y ninguna otra arma, ganas un bonificador de +2 a las tiradas de ataque con armas sutiles y un +1 a tu Clase de Armadura siempre y cuando no uses escudo.",
  "estilo-lucha-combate-defensivo": "Mientras lleves puesta una armadura o empuñes un escudo, ganas un bonificador de +1 a tu Clase de Armadura.",
  "estilo-lucha-duelo": "Cuando empuñas un arma cuerpo a cuerpo en una mano y ninguna otra arma, ganas un bonificador de +2 a las tiradas de daño con ella.",
  "estilo-lucha-guerrero-montado": "Mientras montas una montura controlada, tanto tú como tu montura ganan un bonificador de +1 a la Clase de Armadura, y puedes usar una acción adicional en cada uno de tus turnos para ordenarle a tu montura que haga un ataque o tome una acción de su bloque de estadísticas.",
  "estilo-lucha-protector": "Cuando una criatura que puedes ver te ataca a ti o a un objetivo a 5 pies o menos, puedes usar tu reacción para añadir tu bono de competencia a la Clase de Armadura del objetivo contra ese ataque. Debes estar empuñando un escudo o un arma cuerpo a cuerpo para obtener este beneficio.",
  "estilo-lucha-portaestandarte": "Cuando una criatura a 5 pies o menos ataca a otra criatura que puedes ver, puedes usar tu reacción para otorgarle ventaja en su tirada de ataque. Debes estar sosteniendo un estandarte o bandera en tu mano (y nada más) para usar esta reacción.",
  "estilo-lucha-arco-fuerte": "Puedes usar tu modificador de Fuerza, en lugar de tu Destreza, para las tiradas de ataque y daño con arcos largos y arcos cortos. Siempre que lo hagas, ganas un +1 a las tiradas de daño con esas armas.",
  "estilo-lucha-combate-versatil": "Mientras empuñas una única arma versátil y sin escudo, ganas un bonificador de +1 a tus tiradas de ataque con esa arma. Mientras lo haces, también puedes usar tu acción adicional para hacer un único ataque de agarre (grapple) o empujón (shove), o tomar la acción de Utilizar un Objeto.",

  // Hazañas Tácticas - Grado 1
  "hazana-tactica-orden-de-ataque": "Cuando tomas la acción de Atacar, puedes emitir esta Orden en lugar de un ataque, apuntando a otra criatura que pueda verte u oírte a 30 pies o menos. La próxima vez que esa criatura tome la acción de Atacar antes del inicio de tu siguiente turno, puede hacer un ataque con arma adicional como parte de su acción de Atacar.",
  "hazana-tactica-presencia-imponente": "Prerrequisitos: Carisma o Fuerza 11.\nSiempre que hagas una prueba de Carisma (Persuasión) o Carisma (Intimidación) puedes gastar un Dado de Hazaña, tirarlo y añadir el resultado a tu prueba de característica. Puedes hacerlo después de tirar el d20, pero antes de saber si tienes éxito.\nAdemás, siempre que fueras a hacer una prueba de Carisma (Intimidación), puedes hacer una prueba de Fuerza (Intimidación) en su lugar.",
  "hazana-tactica-instinto-astuto": "Prerrequisitos: Sabiduría 11.\nSiempre que hagas una prueba de Sabiduría (Percepción) o Sabiduría (Supervivencia) puedes gastar un Dado de Hazaña, tirarlo y añadir el resultado a tu prueba. Puedes hacerlo después de tirar, pero antes de saber si tienes éxito o fallas.",
  "hazana-tactica-orden-defensiva": "Cuando tomas la acción de Atacar, puedes emitir esta Orden en lugar de un ataque, apuntando a otra criatura a 30 pies o menos que pueda verte u oírte. Esa criatura gana los beneficios de la acción de Esquivar hasta el comienzo de su próximo turno.",
  "hazana-tactica-finta": "Como acción adicional, puedes gastar un Dado de Hazaña para hacer una finta, obligando a una criatura que puedas ver a 15 pies o menos a hacer una tirada de salvación de Sabiduría. Si falla, tienes ventaja en tus ataques contra ella hasta el final de tu turno actual.",
  "hazana-tactica-fortaleza-heroica": "Siempre que seas forzado a hacer una tirada de salvación de Fuerza, Destreza o Constitución, puedes gastar un Dado de Hazaña, tirarlo y añadir el resultado a tu tirada de salvación. Puedes hacerlo después de tirar el d20, pero antes de saber si tienes éxito.",
  "hazana-tactica-ojo-inquisitivo": "Prerrequisitos: Inteligencia o Sabiduría 11.\nCuando haces una prueba de Inteligencia (Investigación) o Sabiduría (Perspicacia) puedes gastar un Dado de Hazaña, tirarlo y añadir el resultado a la prueba de característica. Puedes hacerlo después de tirar el d20, pero antes de saber si tienes éxito.",
  "hazana-tactica-orden-perspicaz": "Cuando tomas la acción de Atacar, puedes emitir esta Orden en lugar de un ataque, apuntando a otra criatura a 30 pies o menos que pueda verte u oírte. La primera tirada de ataque que haga antes del comienzo de tu siguiente turno se realiza con ventaja.",
  "hazana-tactica-paso-ligero": "Prerrequisitos: Destreza 11.\nSiempre que hagas una prueba de Destreza (Acrobacias) o Destreza (Sigilo) puedes gastar un Dado de Hazaña, tirarlo y añadir el resultado a tu prueba de característica. Puedes hacerlo después de tirar el d20, pero antes de saber el resultado.",
  "hazana-tactica-orden-de-maniobra": "Cuando tomas la acción de Atacar, puedes emitir esta Orden en lugar de un ataque, apuntando a otra criatura a 30 pies o menos que pueda verte u oírte. Esa criatura puede usar su reacción para moverse hasta su velocidad sin provocar ataques de oportunidad.",
  "hazana-tactica-grito-amenazante": "Prerrequisitos: Carisma 11.\nComo acción adicional, puedes gastar un Dado de Hazaña y obligar a una criatura a 30 pies o menos que pueda verte u oírte a hacer una tirada de salvación de Sabiduría. Si falla, está asustada de ti hasta el final de tu próximo turno y debe usar su acción para moverse lo más lejos posible de ti sin hacerse daño.",
  "hazana-tactica-parada": "Prerrequisitos: Destreza 11.\nCuando una criatura que puedes ver te ataca con un ataque cuerpo a cuerpo, puedes usar tu reacción para gastar un Dado de Hazaña, tirarlo y añadirlo a tu Clase de Armadura contra el ataque. Debes estar sosteniendo un arma cuerpo a cuerpo o un escudo para usar esta Hazaña.\nA partir del nivel 5, si usas esta Hazaña y el ataque falla, puedes hacer un único ataque con arma cuerpo a cuerpo contra la criatura que te atacó como parte de la misma reacción.",
  "hazana-tactica-intuicion-rustica": "Prerrequisitos: Sabiduría 11.\nCuando haces una prueba de Inteligencia (Naturaleza), Sabiduría (Trato con Animales) o Sabiduría (Medicina) puedes gastar un Dado de Hazaña, tirarlo y añadir el resultado a la prueba. Puedes hacerlo después de tirar, pero antes de saber el resultado.",
  "hazana-tactica-recuerdo-erudito": "Prerrequisitos: Inteligencia 11.\nSiempre que hagas una prueba de Inteligencia (Arcano), Inteligencia (Historia) o Inteligencia (Religión) puedes gastar un Dado de Hazaña, tirarlo y añadir el resultado a la prueba. Puedes hacerlo después de tirar, pero antes de saber el resultado.",
  "hazana-tactica-orden-firme": "Cuando tomas la acción de Atacar, puedes emitir esta Orden en lugar de un ataque, apuntando a otra criatura a 30 pies o menos que pueda verte u oírte. Hasta el inicio de tu próximo turno, esa criatura puede añadir tu modificador de Liderazgo (mínimo de +1) a todas las tiradas de salvación de Fuerza, Destreza o Constitución.",
  "hazana-tactica-engano-sutil": "Prerrequisitos: Destreza o Carisma 11.\nCuando haces una prueba de Destreza (Juego de Manos), Carisma (Engaño) o Carisma (Interpretación) puedes gastar un Dado de Hazaña, tirarlo y añadirlo a tu prueba de característica. Puedes hacerlo después de tirar, pero antes de saber el resultado.",
  "hazana-tactica-orden-de-apoyo": "Cuando tomas la acción de Atacar, puedes emitir esta Orden en lugar de un ataque, apuntando a otra criatura a 30 pies o menos que pueda verte u oírte. Esa criatura puede tomar inmediatamente la acción de Ayudar, Esconderse, Buscar o Utilizar un Objeto.",

  // Hazañas Tácticas - Grado 2
  "hazana-tactica-crescendo-de-violencia": "Prerrequisito: Nivel 5.\nCuando otra criatura a 30 pies o menos que pueda verte u oírte logra un golpe crítico, puedes usar tu reacción para gastar Dados de Hazaña (hasta tu bono de competencia), tirarlos y otorgar a esa criatura un número de puntos de golpe temporales igual al total que tiraste + tu modificador de Liderazgo.\nLos puntos de golpe temporales de esta Hazaña duran 1 minuto y se disipan instantáneamente si la criatura es incapacitada.",
  "hazana-tactica-orden-vivificante": "Prerrequisito: Nivel 5.\nCuando tomas la acción de Atacar, puedes emitir esta Orden en lugar de un ataque, apuntando a otra criatura a 30 pies o menos que pueda verte u oírte. Hasta el comienzo de tu siguiente turno, la velocidad de la criatura aumenta una cantidad de pies igual a 5 veces tu modificador de Liderazgo (mínimo de 5 pies), y sus distancias de salto largo y alto se duplican.",
  "hazana-tactica-golpe-exponedor": "Prerrequisitos: Nivel 5.\nCuando impactas a una criatura con un ataque con arma, puedes gastar un Dado de Hazaña para debilitarla temporalmente. El primer ataque realizado contra esa criatura antes del comienzo de tu siguiente turno tiene ventaja, y si impacta, ese ataque inflige daño adicional igual a una tirada de tu Dado de Hazaña.",
  "hazana-tactica-voluntad-heroica": "Prerrequisito: Nivel 5.\nSiempre que seas forzado a hacer una tirada de salvación de Inteligencia, Sabiduría o Carisma puedes gastar un Dado de Hazaña, tirarlo y añadir el resultado a tu tirada de salvación. Puedes hacerlo después de tirar el d20, pero antes de saber si tienes éxito o fallas.",
  "hazana-tactica-mantener-la-linea": "Prerrequisito: Nivel 5, Fuerza 13.\nComo acción adicional, puedes gastar un Dado de Hazaña para afirmar tus pies. Tú y las criaturas de tu elección a 5 pies o menos que no estén incapacitadas pueden añadir tu modificador de Liderazgo a la Clase de Armadura y a todas las tiradas de salvación de Fuerza o Destreza.\nEstos beneficios no se acumulan con la cobertura, y terminan instantáneamente si sales de tu espacio o si quedas incapacitado.",
  "hazana-tactica-comando-intimidante": "Prerrequisito: Nivel 5, Carisma 13.\nComo acción adicional, puedes gastar un Dado de Hazaña para gritar un comando de una sola palabra a una criatura a 30 pies o menos que pueda oírte. Debe tener éxito en una tirada de salvación de Sabiduría, o se verá obligada a obedecer tu comando lo mejor que pueda en su siguiente turno a menos que sus acciones sean directamente perjudiciales para ella.",
  "hazana-tactica-orden-rejuvenecedora": "Prerrequisitos: Nivel 5.\nCuando tomas la acción de Atacar, puedes emitir esta Orden en lugar de un ataque, apuntando a otra criatura a 30 pies o menos que pueda verte u oírte. Esa criatura puede repetir instantáneamente una tirada de salvación para terminar una condición que la esté afectando actualmente.",
  "hazana-tactica-orden-resiliente": "Prerrequisito: Nivel 5.\nCuando tomas la acción de Atacar, puedes emitir esta Orden en lugar de un ataque, apuntando a otra criatura a 30 pies o menos que pueda verte u oírte. Hasta el comienzo de tu próximo turno, esa criatura añade tu modificador de Liderazgo (mínimo de +1) a todas las tiradas de salvación de Inteligencia, Sabiduría y Carisma.",
  "hazana-tactica-ataque-sorpresa": "Prerrequisito: Nivel 5, Inteligencia 13.\nComo acción, puedes gastar un Dado de Hazaña para ordenar a otra criatura a 30 pies o menos que pueda verte u oírte que realice instantáneamente un ataque con arma con ventaja. Si impacta, inflige daño adicional igual a una tirada de tu Dado de Hazaña.",
  "hazana-tactica-carga-salvaje": "Prerrequisito: Nivel 5.\nComo acción, puedes gastar un Dado de Hazaña y elegir a otra criatura a 30 pies o menos que pueda verte u oírte. La criatura puede moverse instantáneamente hasta su velocidad hacia una criatura hostil y hacer un ataque con arma cuerpo a cuerpo contra ella.\nSi impacta, inflige daño adicional igual a una tirada de tu Dado de Hazaña, y si el objetivo es igual a su tamaño o más pequeño, debe tener éxito en una tirada de salvación de Fuerza o quedar derribado.",

  // Hazañas Tácticas - Grado 3
  "hazana-tactica-rescate-audaz": "Prerrequisito: Nivel 9.\nCuando una criatura que puedes ver a 30 pies o menos es reducida a 0 puntos de golpe, puedes usar tu reacción para gastar un Dado de Hazaña y moverte hasta el doble de tu velocidad. Sin embargo, debes terminar este movimiento a 5 pies o menos de la criatura.\nLa criatura recupera instantáneamente puntos de golpe iguales a una tirada de tu Dado de Hazaña + tu nivel. También obtiene puntos de golpe temporales iguales a una tirada de tu Dado de Hazaña por cada ataque de oportunidad que provocaste moviéndote hacia el objetivo.",
  "hazana-tactica-discurso-inspirador": "Prerrequisitos: Nivel 9, Carisma 15.\nPuedes gastar un Dado de Hazaña y pasar 1 minuto dando un discurso inspirador a un número de criaturas que puedan oírte igual a 1 + tu modificador de Carisma. Al final del cual, los objetivos ganan puntos de golpe temporales iguales a tu nivel.\nMientras duren los puntos de golpe temporales de esta Hazaña, las criaturas tienen ventaja en las tiradas de salvación de Sabiduría.",
  "hazana-tactica-tacticas-de-manada": "Prerrequisitos: Nivel 9, Sabiduría 15.\nComo acción adicional, puedes gastar un Dado de Hazaña para señalar a tus aliados que luchen como una manada. Hasta el final de tu siguiente turno, las criaturas de tu elección a 30 pies o menos que puedan verte u oírte tienen ventaja en las tiradas de ataque, siempre y cuando una criatura aliada consciente esté a 5 pies o menos de su objetivo.\nPuedes usar una acción adicional en tu siguiente turno para extender los efectos de la Hazaña hasta el final de tu turno posterior a ese, aunque no necesitas gastar un Dado de Hazaña cuando lo haces.\nNo puedes mantener esta Hazaña más de 1 minuto.",
  "hazana-tactica-gambito-peligroso": "Prerrequisito: Nivel 9.\nComo acción adicional, puedes gastar un Dado de Hazaña para obligar a una criatura a 30 pies o menos a hacer una tirada de salvación de Sabiduría. Si falla, sufre los siguientes efectos durante el próximo minuto:\n- Tiene ventaja en cualquier tirada de ataque que haga contra ti, pero tiene desventaja en todas las demás tiradas de ataque.\n- Si se mueve debe terminar su movimiento más cerca de ti.\n- Cualquier criatura a la que apuntes con una Palabra Inspiradora o una Hazaña Táctica tiene ventaja en las tiradas de ataque contra esta criatura hasta el inicio de tu próximo turno.\nLa criatura puede repetir esta tirada de salvación al final de cada uno de sus turnos, terminando el efecto si tiene éxito. Este efecto termina instantáneamente si la criatura no puede verte u oírte.",
  "hazana-tactica-levantar-a-los-caidos": "Prerrequisitos: Nivel 9.\nComo acción en tu turno, puedes gastar Dados de Hazaña (hasta tu bono de competencia) y emitir un grito inspirador. Un número de criaturas igual a tu modificador de Liderazgo (mínimo de 1) a 30 pies o menos que puedan oírte recuperan una cantidad de puntos de golpe igual a una tirada de tu Dado de Hazaña por cada Dado que gastaste + tu modificador de Liderazgo.\nSi apuntas a una criatura viva con 0 puntos de golpe, no necesita oírte, pero gana 1 nivel de agotamiento.",
  "hazana-tactica-reposicionamiento-tactico": "Prerrequisito: Nivel 9, Inteligencia 15.\nComo acción, puedes gastar un Dado de Hazaña y dictar un curso de acción estratégico a un número de criaturas igual a tu modificador de Liderazgo (mínimo de 1) a 30 pies o menos que puedan verte u oírte. Las criaturas pueden usar su reacción para moverse hasta su velocidad sin provocar ataques de oportunidad.",
  "hazana-tactica-grito-de-guerra": "Prerrequisitos: Nivel 9, Carisma 15.\nComo acción, puedes gastar un Dado de Hazaña y emitir un poderoso grito, obligando a las criaturas de tu elección que puedan oírte en un cono adyacente de 30 pies a hacer una tirada de salvación de Sabiduría.\nSi fallan, sueltan lo que estén sosteniendo y están asustadas de ti durante 1 minuto. Si una criatura asustada termina su turno y no tiene línea de visión hacia ti, puede repetir la tirada de salvación, terminando el efecto si tiene éxito.",

  // Hazañas Tácticas - Grado 4
  "hazana-tactica-orden-heroica": "Prerrequisito: Nivel 13.\nCuando tomas la acción de Atacar, puedes emitir esta Orden en lugar de un ataque, apuntando a otra criatura a 30 pies o menos que pueda verte u oírte. Hasta el inicio de tu siguiente turno, esa criatura tiene ventaja en cada tirada de ataque, prueba de característica y tirada de salvación que haga y es resistente a todo el daño.",
  "hazana-tactica-orden-revitalizante": "Prerrequisito: Nivel 13.\nCuando tomas la acción de Atacar, puedes emitir esta Orden en lugar de un ataque, apuntando a una criatura a 30 pies o menos que haya muerto en el último minuto. Recupera puntos de golpe iguales a tu nivel + tu modificador de Liderazgo y puede levantarse.\nEsta Hazaña Táctica no puede devolverle la vida a una criatura que haya muerto de vejez, ni puede restaurar partes del cuerpo faltantes.",
  "hazana-tactica-victoria-repentina": "Prerrequisito: Nivel 13.\nComo acción, gastas un Dado de Hazaña e impulsas a un aliado a luchar como nunca antes. Otra criatura de tu elección a 30 pies o menos que pueda verte u oírte puede usar su reacción para moverse hasta su velocidad completa y tomar una única acción o acción adicional.",

  // Hazañas Tácticas - Grado 5
  "hazana-tactica-plan-de-contingencia": "Prerrequisitos: Nivel 17, Inteligencia 19.\nAl final de un descanso largo, puedes gastar uno de tus Dados de Hazaña para poner en marcha un plan de contingencia no revelado. Hasta que actives esta Hazaña nuevamente, no puedes recuperar este Dado de Hazaña. Solo puedes tener un plan de contingencia a la vez.\nComo acción, puedes revelar tu plan previamente no revelado (que inventas en el momento de revelarlo) y hacer una prueba de Inteligencia CD 20. Puedes añadir una habilidad (skill) que el DM considere apropiada para tu plan. Si tienes éxito, tus planes secretos y preparaciones surten efecto perfectamente tal como los describiste.\nEl costo para ejecutar tu plan no puede exceder el equivalente a 5,000 po, y los efectos no pueden exceder un conjuro de nivel 7.\nPor ejemplo, podrías revelar que secretamente compraste el pergamino de conjuro perfecto la última vez que estuviste en una ciudad, o que pagaste a una banda de mercenarios o un dirigible para que vengan a rescatarte.",
  "hazana-tactica-golpe-final": "Prerrequisito: Nivel 17.\nComo acción gastas un Dado de Hazaña y ordenas a tus aliados que ataquen a un enemigo de tu elección. Las criaturas de tu elección (hasta tu modificador de Liderazgo) a 30 pies o menos que puedan verte u oírte pueden tomar inmediatamente la acción de Atacar, o lanzar un conjuro de nivel 5 o inferior con un tiempo de lanzamiento de una acción.\nCualquier ataque o conjuro que una criatura lance como parte de esta Hazaña Táctica debe apuntar a la criatura que designes."
};
```

=== B ===
```json
{
  "tablas": {
    "clase": {
      "nombre": "Señor de la Guerra",
      "columnas": ["Nivel", "Bonificador de Competencia", "Rasgos", "Palabra Inspiradora", "Hazañas Conocidas", "Dado de Hazaña", "Dados de Hazaña"],
      "filas": [
        [1, 2, "Estilo de Liderazgo, Palabra Inspiradora", 3, "-", "-", "-"],
        [2, 2, "Estilo de Lucha, Hazañas Tácticas", 3, 2, "d4", 2],
        [3, 2, "Academia de Guerra", 3, 3, "d4", 2],
        [4, 2, "Mejora de Puntuación de Característica", 4, 3, "d4", 2],
        [5, 3, "Ataque Adicional", 4, 4, "d6", 3],
        [6, 3, "Rasgo de Academia", 4, 4, "d6", 3],
        [7, 3, "Líder Valiente", 4, 5, "d6", 3],
        [8, 3, "Mejora de Puntuación de Característica", 5, 5, "d6", 3],
        [9, 4, "Grito de Fomento (1)", 5, 6, "d6", 3],
        [10, 4, "Voluntad Inquebrantable", 5, 6, "d6", 3],
        [11, 4, "Superioridad Táctica", 5, 7, "d8", 4],
        [12, 4, "Mejora de Puntuación de Característica", 5, 7, "d8", 4],
        [13, 5, "Grito de Fomento (2)", 6, 8, "d8", 4],
        [14, 5, "Rasgo de Academia", 6, 8, "d8", 4],
        [15, 5, "Líder Exaltado", 6, 9, "d8", 4],
        [16, 5, "Mejora de Puntuación de Característica", 6, 9, "d8", 4],
        [17, 6, "Grito de Fomento (3)", 7, 10, "d10", 5],
        [18, 6, "Rasgo de Academia", 7, 10, "d10", 5],
        [19, 6, "Mejora de Puntuación de Característica", 7, 10, "d10", 5],
        [20, 6, "Indómito", 7, 10, "d10", 5]
      ]
    },
    "subclase_skald": {
      "nombre": "Lanzamiento de Conjuros de Escaldo",
      "columnas": ["Nivel", "Conjuros Conocidos", "Nivel 1", "Nivel 2", "Nivel 3", "Nivel 4"],
      "filas": [
        [3, 3, 2, "-", "-", "-"],
        [4, 4, 3, "-", "-", "-"],
        [5, 4, 3, "-", "-", "-"],
        [6, 4, 3, "-", "-", "-"],
        [7, 5, 4, 2, "-", "-"],
        [8, 6, 4, 2, "-", "-"],
        [9, 6, 4, 2, "-", "-"],
        [10, 7, 4, 3, "-", "-"],
        [11, 8, 4, 3, "-", "-"],
        [12, 8, 4, 3, "-", "-"],
        [13, 9, 4, 3, 2, "-"],
        [14, 10, 4, 3, 2, "-"],
        [15, 10, 4, 3, 2, "-"],
        [16, 11, 4, 3, 3, "-"],
        [17, 11, 4, 3, 3, "-"],
        [18, 11, 4, 3, 3, "-"],
        [19, 12, 4, 3, 3, 1],
        [20, 13, 4, 3, 3, 1]
      ]
    }
  }
}
```

=== C ===
```json
{
  "warlord": "Warlord (LaserLlama)",
  "academy-of-chivalry": "Warlord (LaserLlama)",
  "academy-of-ferocity": "Warlord (LaserLlama)",
  "academy-of-schemes": "Warlord (LaserLlama)",
  "academy-of-skalds": "Warlord (LaserLlama)",
  "academy-of-tactics": "Warlord (LaserLlama)"
}
```

=== D ===
```json
{
  "warlord": "Líder marcial estratega que potencia el verdadero potencial de sus aliados en el campo de batalla mediante órdenes y hazañas tácticas.",
  "academy-of-chivalry": "Nobles caballeros que inspiran desde el frente, manteniendo un estricto código de honor que aviva la esperanza en sus aliados y el terror en sus enemigos.",
  "academy-of-ferocity": "Líderes implacables que aplican instintos salvajes en sus tácticas de manada para dar caza a las presas de forma conjunta.",
  "academy-of-schemes": "Comandantes utilitarios que aseguran la victoria a cualquier costo mediante golpes bajos y tretas crueles sin remordimientos.",
  "academy-of-skalds": "Guerreros poetas que se sirven de su música y magia bárdica para infundir un valor extraordinario y cambiar las tornas del combate.",
  "academy-of-tactics": "Expertos calculadores educados formalmente que maximizan todo el potencial de sus compañeros ajustando sus estrategias ante cualquier eventualidad."
}
```

=== E ===
Dudas, cortes de texto o [NO CONFIRMADO]:
- No hubo cortes y el PDF se tradujo en su totalidad hasta la última Hazaña ("Final Strike").
- "Leadership Ability (Deception) checks" se ha traducido fielmente como "pruebas de Característica de Liderazgo (Engaño)", ya que la regla establece que se reemplaza el modificador clásico (Carisma) por el modificador de Liderazgo del jugador.
- La "Academy of Tactics" altera la progresión de los dados de hazaña de la tabla original de clase, cambiando la base y progresión a dados de mayor valor de forma local; se mantuvo dicho texto dentro de la subclase y la tabla principal intacta como viene en el manual.
- Las Hazañas Tácticas ("Tactical Exploits") y sus prerequisitos están formateadas como opciones elegibles para compatibilidad con el sistema de opciones, ya que el jugador escoge cuáles domina.