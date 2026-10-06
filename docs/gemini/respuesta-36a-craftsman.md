export const craftsman = {
  n: 1,
  dado: "d10",
  sv: ["Inteligencia", "Constitución"],
  habN: 2,
  habs: ["Arcano", "Atletismo", "Historia", "Investigación", "Medicina", "Percepción", "Persuasión"],
  arm: ["Todas las armaduras", "escudos"],
  armas: ["Armas simples", "armas marciales"],
  equipo: [
    "Un juego de herramientas de artesano (craftsman's tools)",
    "Un escudo y (a) cota de malla o (b) armadura de escamas",
    "Una daga y (a) un martillo de guerra o (b) cualquier arma simple",
    "(a) una ballesta ligera y 20 virotes o (b) un arco corto y 20 flechas",
    "Un paquete de explorador y un kit con el que seas competente"
  ],
  rasgos: [
    {
      nombre: "Competencias Adicionales (Bonus Proficiencies)",
      t: "pasiva",
      texto: "A partir del nivel 1, eres competente con armas exóticas, armaduras y escudos exóticos. También eres competente con todos los juegos de herramientas de artesano.",
      n: 1
    },
    {
      nombre: "Herrería (Smithy)",
      t: "fuera",
      texto: "En el nivel 1, llevas un juego de herramientas de artesano (craftsman's tools), un kit combinado que cubre lo esencial de todas las herramientas de artesano y te permite añadir tu bonificador por competencia a cualquier cosa que fabriques. Pesa 20 libras y puede reemplazarse por 75 po.\n\nMientras usas estas herramientas para fabricar un objeto, puedes lograr el equivalente a un día de progreso de fabricación en las 8 horas que dura un descanso largo. Cada día, puedes fabricar objetos por un valor total de 50 po multiplicadas por tu nivel de artesano. Como es habitual, debes proporcionar materiales equivalentes a la mitad del valor de mercado de los objetos.",
      n: 1
    },
    {
      nombre: "Obra Maestra (Masterwork)",
      t: "fuera",
      texto: "En el nivel 2, empiezas a aprender las complejidades más profundas de la fabricación de armas y armaduras.\n\n**Equipo de Obra Maestra.** Como artesano, eres capaz de crear armas y armaduras de la máxima calidad; estas creaciones se conocen como objetos de Obra Maestra (Masterwork). Si gastas 100 po adicionales en materiales y 8 horas de trabajo al fabricar un arma o armadura, puedes crear una versión de obra maestra de ese objeto. Además, puedes gastar 100 po y 8 horas de tiempo para modificar un objeto existente y convertirlo en uno de obra maestra.\n\n**Bonificador de Obra Maestra.** A medida que ganas niveles en esta clase, los objetos de obra maestra que fabriques otorgarán un bonificador de Obra Maestra cuando los empuñe o lleve puestos una criatura competente. En el nivel 5, tus armas de obra maestra tienen un bonificador de +1 a las tiradas de ataque y daño, y tus armaduras de obra maestra tienen un bonificador de +1 a la CA. Este bonificador aumenta a +2 en el nivel 11 y a +3 en el nivel 17.\n\n**Propiedades de Obra Maestra.** Los objetos de obra maestra que fabriques se pueden alterar con propiedades de obra maestra, que son modificaciones avanzadas que te permiten crear armas y armaduras verdaderamente únicas. Las propiedades de obra maestra se dividen en 4 niveles: Aprendiz (nivel 2), Oficial (nivel 5, coste 200 po), Maestro (nivel 11, coste 400 po) y Legendario (nivel 17, coste 500 po). Puedes aplicar un número de propiedades de Aprendiz igual a tu modificador de Inteligencia + tu Bonificador de Obra Maestra (mínimo 1) a una pieza de equipo, y puedes aplicar una propiedad de Oficial, una de Maestro y una Legendaria a un objeto de obra maestra.\n\nCualquiera puede usar una versión de obra maestra de un arma o armadura si es competente con ella, pero una vez que una pieza de equipo de obra maestra ha sido modificada con una propiedad de Maestro o Legendaria, se ajusta a tus especificaciones exactas y solo tú puedes usarla de manera competente.\n\nPuedes aplicar cualquier número de propiedades de obra maestra a una sola pieza de equipo de obra maestra durante un período de 8 horas, lo cual se puede hacer a lo largo de un descanso largo. Cada propiedad añadida requiere un coste en materiales y solo puede ser realizada por artesanos del nivel adecuado. Puedes eliminar o reemplazar propiedades de obra maestra en un objeto en la misma cantidad de tiempo, aunque debes pagar el coste de las nuevas propiedades añadidas. No puedes eliminar una propiedad de un objeto si es un requisito previo para otra de las propiedades de dicho objeto.\n\nCuando aprendes un nuevo nivel de propiedades de obra maestra, puedes aplicar una propiedad de ese nivel a dos piezas de equipo de obra maestra sin coste alguno. Además, siempre que apliques una propiedad de obra maestra a un arma que inflige daño contundente, perforante o cortante, puedes cambiar su tipo de daño a contundente, perforante o cortante.\n\nLas armas y armaduras mágicas pueden convertirse en objetos de obra maestra; sin embargo, una vez modificadas con propiedades de obra maestra, no otorgan el bonificador de Obra Maestra a las tiradas de ataque, daño ni a la Clase de Armadura.\n\n**Característica de Fabricación.** La Inteligencia es tu característica principal en lo que respecta a la fabricación. Además, usas tu modificador de Inteligencia para establecer la CD de la tirada de salvación cuando un objeto que fabricas requiere una.\n\n**CD de Obra Maestra** = 8 + tu bonificador por competencia + tu modificador de Inteligencia.",
      n: 2
    },
    {
      nombre: "Cinturón de Herramientas (Tool Belt)",
      t: "accion",
      texto: "Mientras que otros aventureros pueden confiar en conjuros, suerte o fuerza bruta para resolver un problema, tú crees en tener siempre la herramienta adecuada a mano. A partir del nivel 2, puedes sacar una pieza de equipo no mágico de tu cinturón, delantal, mochila, carro o de dondequiera que guardes tus herramientas, incluso si no la tenías en tu inventario antes. El precio en po de este objeto no debe ser superior a 10 veces tu nivel de artesano. Los objetos recuperados de esta forma se pierden en tu inventario y desaparecen cuando realizas un descanso largo.",
      n: 2,
      usos: "Modificador de Inteligencia",
      reset: "Largo"
    },
    {
      nombre: "Gremio de Artesanos (Artisans' Guild)",
      t: "pasiva",
      texto: "En el nivel 3 te unes a un Gremio de Artesanos. Eliges uno y obtienes sus rasgos de nivel 3, además de beneficios adicionales en los niveles 7, 10, 14 y 18.",
      n: 3
    },
    {
      nombre: "Ataque Extra (Extra Attack)",
      t: "pasiva",
      texto: "A partir del nivel 5, puedes atacar dos veces, en lugar de una, siempre que realices la acción de Atacar en tu turno.",
      n: 5
    },
    {
      nombre: "Acero Plegado (Folded Steel)",
      t: "pasiva",
      texto: "En el nivel 6, descubres o creas nuevos procesos para hacer que tu equipo de obra maestra sea aún más fuerte que antes. Las armas de obra maestra fabricadas o modificadas por ti se consideran mágicas a efectos de superar las resistencias e inmunidades al daño.",
      n: 6
    },
    {
      nombre: "Modificaciones Rápidas (Rapid Modifications)",
      t: "accion",
      texto: "A partir del nivel 9, obtienes la capacidad de reconfigurar rápidamente tu equipo. Como acción, puedes reemplazar una propiedad de obra maestra en una sola pieza de equipo por cualquier otra propiedad de obra maestra del mismo nivel. No puedes reemplazar una propiedad que sea requisito previo para otra propiedad del arma, y el arma debe cumplir todos los requisitos previos de la nueva propiedad.",
      n: 9,
      usos: "Modificador de Inteligencia",
      reset: "Largo"
    },
    {
      nombre: "Golpe de Artesano (Craftsman's Strike)",
      t: "pasiva",
      texto: "Has aprendido a construir, pero también sabes cómo destruir. A partir del nivel 13, tus ataques con arma infligen el daño máximo contra objetos y 1d8 de daño adicional contra constructos.",
      n: 13
    },
    {
      nombre: "Cinturón de Herramientas Insólito (Uncanny Tool Belt)",
      t: "accion",
      texto: "Tienes un don para encontrar las cosas más útiles enterradas en tu carro. A partir del nivel 15, puedes sacar un único objeto mágico común o poco común de tu cinturón de herramientas. El objeto se pierde en tu inventario y desaparece cuando realizas un descanso largo.",
      n: 15,
      usos: "1",
      reset: "Largo"
    },
    {
      nombre: "Obra Magna (Magnum Opus)",
      t: "fuera",
      texto: "En el nivel 20, completas un objeto de una majestuosidad inigualable. Puedes retirarte a tu forja durante un período de 30 días; durante este tiempo, trabajas febrilmente. Al final de los 30 días, sales de tu forja llevando tu creación: un único objeto mágico de rareza muy rara o legendaria. Este objeto está ligado a tu propia alma: independientemente de su tipo, siempre se considera que estás sintonizado con él, y ninguna otra criatura puede sintonizarse con él mientras estés vivo. Este objeto no cuenta para tu límite máximo de objetos sintonizados, e ignoras todos los requisitos de sintonización del mismo. Mientras estés en el mismo plano de existencia que tu objeto, puedes invocarlo a tu mano o a tu cuerpo (según corresponda). Solo puedes crear una Obra Magna una vez.",
      n: 20
    }
  ]
};

export const armigersGuild = {
  n: 3,
  rasgos: [
    {
      nombre: "Maestro de Armaduras (Armor Master)",
      t: "pasiva",
      texto: "Al unirte a este gremio en el nivel 3, no solo aprendes a forjar armaduras poderosas, sino también a llevarlas con destreza. Obtienes un estilo de combate a elegir entre Defensa o Protección.",
      n: 3
    },
    {
      nombre: "Emblema Icónico (Iconic Emblem)",
      t: "pasiva",
      texto: "A partir del nivel 7, puedes blasonar tu armadura y tu escudo con un símbolo personal, uno que es conocido por muchos como representación de artesanía y valor. Una criatura que pueda verte puede identificarte con una prueba de Inteligencia CD 12. Además, siempre que un aliado que pueda verte realice una tirada de salvación en la que no sea competente, puede añadir la mitad de tu bonificador por competencia (redondeado hacia arriba) a la tirada.",
      n: 7
    },
    {
      nombre: "Ojo de Armígero (Armiger's Eye)",
      t: "fuera",
      texto: "A partir del nivel 10, puedes pasar 10 minutos para reforzar una armadura (o hasta 6 si lo haces durante un descanso corto o largo), que obtiene una de las siguientes propiedades a tu elección:\n\n- **Adamantina (Adamant):** Cuando una criatura que lleva esta armadura recibe daño, lo reduce en 1d8.\n- **De Bandas (Banded):** Una criatura que lleva esta armadura tiene un bonificador de +1 a la Clase de Armadura.\n\nEsta armadura conserva su refuerzo hasta que la criatura que la lleva sea impactada, momento en el cual dejará de estar fortificada.",
      n: 10
    },
    {
      nombre: "Muro de Hierro (Wall of Iron)",
      t: "adicional",
      texto: "A partir del nivel 14, como acción adicional, puedes obtener resistencia al daño contundente, perforante y cortante hasta el final de tu siguiente turno.",
      n: 14,
      usos: "1",
      reset: "Corto o Largo"
    },
    {
      nombre: "Maestro Forjador de Armaduras (Master Armorsmith)",
      t: "pasiva",
      texto: "En el nivel 18, alcanzas la cúspide de tu oficio. Aprendes la propiedad de obra maestra Legendaria **Blindaje Invencible (Invincible Plating)**, que puedes aplicar inmediatamente a una armadura de obra maestra.\n\n**Blindaje Invencible.** *Propiedad Legendaria (Armadura pesada exótica de obra maestra).* Aprendes a hacer tu acero casi indestructible frente a ciertos tipos de golpes. Elige entre daño contundente, perforante o cortante; mientras lleves esta armadura, eres inmune a ese tipo de daño.",
      n: 18
    }
  ]
};

export const bladeworkersGuild = {
  n: 3,
  rasgos: [
    {
      nombre: "Maestro de Armas (Weapon Master)",
      t: "pasiva",
      texto: "Al unirte a este gremio en el nivel 3, no solo forjas grandes armas, sino que también luchas con ellas. Obtienes un estilo de combate a elegir entre Arquería, Duelo, Combate con Armas a Dos Manos o Combate con Dos Armas.",
      n: 3
    },
    {
      nombre: "Hoja Cruel (Wicked Blade)",
      t: "pasiva",
      texto: "En el nivel 7, tus armas diabólicamente ingeniosas te han granjeado una reputación. Puedes añadir el doble de tu bonificador por competencia a las pruebas de Carisma (Intimidación) que realices empuñando una de tus armas de obra maestra.",
      n: 7
    },
    {
      nombre: "Piedra de Afilar Adamantina (Adamant Whetstone)",
      t: "fuera",
      texto: "A partir del nivel 10, puedes pasar 10 minutos para fortificar un arma (o hasta 6 si lo haces durante un descanso corto o largo), que obtiene una de las siguientes propiedades a tu elección:\n\n- **Afilada (Honed):** Esta arma tiene un bonificador de +2 a las tiradas de ataque.\n- **Amolada (Sharpened):** Esta arma inflige 1d8 de daño adicional al impactar.\n\nEl arma conserva esta fortificación hasta que impacte a un objetivo, tras lo cual dejará de estar fortificada.",
      n: 10
    },
    {
      nombre: "Golpe Hendiente (Sundering Strike)",
      t: "accion",
      texto: "A partir del nivel 14, puedes usar tu conocimiento sobre los puntos débiles de las armas y armaduras para inutilizarlas. Como acción en tu turno, puedes realizar un único ataque contra un enemigo, apuntando a su arma o armadura en un intento de henderla. Si impactas, esa criatura debe tener éxito en una tirada de salvación de Destreza contra la CD de tu Obra Maestra. Si falla, el objeto se rompe y queda inutilizado hasta que se repare.",
      n: 14,
      usos: "1",
      reset: "Corto o Largo"
    },
    {
      nombre: "Maestro Forjador de Armas (Master Weaponsmith)",
      t: "pasiva",
      texto: "En el nivel 18, alcanzas la cúspide de tu oficio. Aprendes la propiedad de obra maestra Legendaria **Devastadora (Devastating)**.\n\n**Devastadora.** *Propiedad Legendaria (Arma exótica de obra maestra).* Esta arma asesta un golpe crítico con una tirada de 18, 19 o 20.",
      n: 18
    }
  ]
};

export const calibaronsGuild = {
  n: 3,
  rasgos: [
    {
      nombre: "Estilo de Combate (Fighting Style)",
      t: "pasiva",
      texto: "En el nivel 3, adoptas un estilo de combate con armas de fuego particular como tu especialidad. Eliges entre Akimbo, Diana, Duelista o Escopetero.",
      n: 3
    },
    {
      nombre: "Carga Manual (Hand Load)",
      t: "fuera",
      texto: "A partir del nivel 7, siempre que tengas acceso a tus herramientas de artesano, puedes crear munición y explosivos sin coste alguno. A lo largo de un descanso largo, puedes crear 40 piezas de munición normal, 20 piezas de munición especial de cualquier tipo o 2 explosivos. A lo largo de un descanso corto, puedes crear 10 piezas de munición normal, 5 piezas de munición especial o 1 explosivo.",
      n: 7
    },
    {
      nombre: "Afinación Balística (Ballistic Tuning)",
      t: "fuera",
      texto: "A partir del nivel 10, puedes pasar 10 minutos para calibrar y reforzar un arma a distancia (o hasta 6 armas si lo haces durante un descanso corto o largo), que obtiene una de las siguientes propiedades a tu elección:\n\n- **Balística (Ballistic):** Esta arma inflige un dado de daño adicional al impactar.\n- **Calibrada (Calibrated):** Esta arma logra un golpe crítico con una tirada de 18 a 20.\n\nEsta arma conserva su fortificación hasta que impacte a un objetivo. Después, el arma deja de estar fortificada.",
      n: 10
    },
    {
      nombre: "Demoliciones Aplicadas (Applied Demolitions)",
      t: "pasiva",
      texto: "A partir del nivel 14, puedes sumar tu modificador de Inteligencia a la tirada de daño de cualquier explosivo que fabriques. Además, puedes aumentar o reducir el radio de explosión de cualquier explosivo que fabriques en hasta 5 pies.",
      n: 14
    },
    {
      nombre: "Maestro Armero (Master Gunsmith)",
      t: "pasiva",
      texto: "En el nivel 18, alcanzas la cúspide de tu oficio. Aprendes la propiedad de obra maestra Legendaria **Fuego a Ráfagas (Burst Fire)**.\n\n**Fuego a Ráfagas.** *Propiedad Legendaria (Arma de fuego exótica de obra maestra con la propiedad Automática).* Cuando realizas la acción de Atacar para hacer un ataque con esta arma de fuego, puedes usar tu acción adicional para hacer un único ataque adicional con ella.",
      n: 18
    }
  ]
};

export const clockworkersGuild = {
  n: 3,
  rasgos: [
    {
      nombre: "Constructos de Relojería (Clockwork Constructs)",
      t: "fuera",
      texto: "Al unirte a este gremio en el nivel 3, ensamblas dos sirvientes mecánicos. Puedes elegir un Bolter de Relojería (Clockwork Bolter) o un Macero de Relojería (Clockwork Macer) para cada uno de tus dos constructos, y puedes cambiar tu decisión cuando termines un descanso largo. Cada uno de tus constructos viene equipado con un arma de obra maestra instalada, que puedes modificar con propiedades de obra maestra. Tus constructos siempre son competentes con las armas instaladas.\n\n**Reparar tus Constructos.** Cuando realizas un descanso largo, puedes reparar tus constructos para que recuperen todos sus puntos de golpe. Se considera que siempre tienes suficiente chatarra y materiales para construir y reparar a tus constructos.\n\n**Dar órdenes a tus Constructos.** Tus constructos actúan en tu turno, aunque no realizan acciones a menos que se lo ordenes. Mientras tus constructos estén a menos de 500 pies de ti, puedes ordenarles mentalmente que se muevan a ubicaciones específicas (sin requerir acción) o usar tu acción para ordenar a todos tus constructos que ataquen. Además, puedes usar tu acción adicional para ordenar a uno de tus constructos que ataque; este constructo no suma ningún modificador de característica a su tirada de daño.\n\nTus constructos usan tu modificador de Inteligencia + tu bonificador por competencia en lugar de su bonificador de ataque normal, si este fuera mayor. Además, tus constructos añaden el doble de tu nivel a sus puntos de golpe máximos.\n\nLa conexión con tus constructos es agotadora y no puedes invocar mágicamente ni dar órdenes a ninguna otra criatura mientras tus constructos estén activos.\n\nA partir del nivel 5, puedes elegir construir un Guardián de Engranajes (Gear Guardian) en lugar de dos bolters o maceros de relojería.\n\n**Estadísticas del Bolter de Relojería:**\nConstructo Pequeño, sin alineamiento\nCA: 14 (armadura natural). PG: 28 (8d6). Vel: 25 pies.\nFUE 8 (-1), DES 13 (+1), CON 10 (+0), INT 1 (-5), SAB 3 (-4), CAR 1 (-5).\nInmunidades a condiciones: cegado, hechizado, ensordecido, asustado, paralizado, petrificado, envenenado.\nSentidos: visión ciega 120 pies (ciego más allá).\n**A dos manos.** Cuenta como si tuviera dos manos para empuñar su arma instalada (solo armas a distancia).\n*Acción: Ballesta Ligera (Ataque de Arma a Distancia, +3 impactar, 80/320 pies. Daño: 1d6+1 perforante).*\n\n**Estadísticas del Macero de Relojería:**\nConstructo Pequeño, sin alineamiento\nCA: 14 (armadura natural). PG: 28 (8d6). Vel: 25 pies.\nFUE 13 (+1), DES 8 (-1), CON 10 (+0), INT 1 (-5), SAB 3 (-4), CAR 1 (-5).\nInmunidades a condiciones: cegado, hechizado, ensordecido, asustado, paralizado, petrificado, envenenado.\nSentidos: visión ciega 60 pies (ciego más allá).\n**A una mano.** Cuenta como si tuviera una mano para empuñar su arma instalada (solo armas cuerpo a cuerpo).\n*Acción: Maza (Ataque de Arma Cuerpo a Cuerpo, +3 impactar, 5 pies. Daño: 1d6+1 contundente).*\n\n**Estadísticas del Guardián de Engranajes (Nivel 5):**\nConstructo Pequeño, sin alineamiento\nCA: 17 (armadura natural, escudo). PG: 60 (6d8+24). Vel: 25 pies.\nFUE 17 (+3), DES 11 (+0), CON 18 (+4), INT 7 (-2), SAB 5 (-3), CAR 1 (-5).\nInmunidades a condiciones: cegado, hechizado, ensordecido, asustado, paralizado, petrificado, envenenado.\nSentidos: visión ciega 120 pies (ciego más allá).\n**Escudo.** Lleva un escudo (incluido en la CA), que puede ponerse o quitarse como acción.\n**A dos manos.** Tiene dos manos para empuñar su arma instalada y el escudo.\n*Acción: Espada Larga (Ataque de Arma Cuerpo a Cuerpo, +6 impactar, 5 pies. Daño: 1d8+3 cortante, o 1d10+3 si se usa a dos manos).*.",
      n: 3
    },
    {
      nombre: "Desconexión Rápida (Quick-Detach)",
      t: "accion",
      texto: "A partir del nivel 7, puedes cambiar las armas instaladas en tus constructos de relojería sobre la marcha. Como acción, puedes extraer el arma instalada en uno de tus constructos que esté a 5 pies o menos de ti y sustituirla por un arma que estés sosteniendo.",
      n: 7
    },
    {
      nombre: "Relojería Reforzada (Reinforced Clockwork)",
      t: "fuera",
      texto: "A partir del nivel 10, puedes pasar 10 minutos para aplicar refuerzos adicionales a uno de tus constructos. La próxima vez que ese constructo reciba daño, reduce el daño recibido en 1d8.",
      n: 10
    },
    {
      nombre: "Ráfaga Mortal (Death Burst)",
      t: "pasiva",
      texto: "A partir del nivel 14, puedes integrar un interruptor de hombre muerto en cada uno de tus constructos: una bomba que detona cuando tu constructo sufre daños críticos. Cuando un constructo con esta bomba se reduce a 0 puntos de golpe, explota en un radio de 10 pies. Cada criatura dentro del área debe hacer una tirada de salvación de Destreza contra tu CD de Obra Maestra o recibir 6d6 de daño por fuego.",
      n: 14
    },
    {
      nombre: "Guardián Escudo (Shield Guardian)",
      t: "accion",
      texto: "A partir del nivel 18, has encajado el último perno en lo que probablemente será tu mayor creación mecánica: un Guardián Escudo (Shield Guardian). Mientras estés vivo, solo tú puedes llevar el amuleto del guardián; mientras lo lleves, no podrás comandar a ningún otro constructo. Como acción, puedes sustituir el arma de puño del guardián por cualquier arma de obra maestra instalada de tu elección.",
      n: 18
    }
  ]
};

export const filigristsGuild = {
  n: 3,
  rasgos: [
    {
      nombre: "Ornamentación (Ornamentation)",
      t: "fuera",
      texto: "Al ingresar en esta profesión en el nivel 3, aprendes a fabricar armaduras y armas que incorporan el embellecimiento no solo como opción estética, sino como mejora de sus capacidades. Si gastas 500 po y 8 horas de trabajo, puedes aplicar la propiedad **Ornamentada (Ornamented)** a un arma de obra maestra o la propiedad **Decorada (Decorated)** a una armadura de obra maestra.\n\n- **Decorada (Propiedad de Aprendiz - Armadura de obra maestra).** Como reacción cuando recibes el impacto de un ataque de una criatura que puedas ver, puedes obligar al atacante a que vuelva a tirar el ataque contra ti y sumar tu modificador de Inteligencia a tu CA. El atacante debe utilizar la nueva tirada.\n- **Ornamentada (Propiedad de Aprendiz - Arma de obra maestra).** Una vez por turno, cuando falles una tirada de ataque con esta arma, puedes volver a tirar el ataque sumando tu modificador de Inteligencia a la tirada. Debes usar el resultado de la nueva tirada.\n\nPuedes aplicar cada propiedad varias veces, una en cada nivel de propiedades de Obra Maestra. Puedes usar su habilidad una vez por cada vez que se haya aplicado la propiedad, recuperando todos los usos al terminar un descanso largo.",
      n: 3
    },
    {
      nombre: "Galas Formidables (Formidable Finery)",
      t: "pasiva",
      texto: "En el nivel 3, también aprendes a fabricar joyas hermosas y notablemente funcionales. Puedes designar una colección de anillos, collares, pulseras y otras joyas fabricadas por ti, por valor de al menos 1.000 po, como un conjunto de galas. Mientras lleves puestas tus galas, tu Clase de Armadura es igual a 10 + tu modificador de Destreza + 1 por cada 1.000 de oro que valgan tus galas (máximo +3). Tus galas se tratan como una armadura ligera exótica de obra maestra. Puedes seguir invirtiendo oro y joyas en tus galas, mejorando el bonificador que proporcionan a tu CA, gastando el oro necesario mientras trabajas en ellas a lo largo de un descanso largo.\n\nMientras lleves puestas tus galas, puedes usar tu modificador de Inteligencia en lugar de tu modificador de Carisma para las pruebas de Engaño, Intimidación y Persuasión.",
      n: 3
    },
    {
      nombre: "Galas Seductoras (Alluring Finery)",
      t: "accion",
      texto: "A partir del nivel 7, como acción, mientras llevas puestas tus galas, puedes forzar a una criatura que puedas ver a menos de 30 pies a realizar una tirada de salvación de Sabiduría, enfrentada a tu CD de Obra Maestra. Si falla, la criatura se siente atraída hacia ti, cautivada por tus gloriosos atuendos. Durante el siguiente minuto, tiene desventaja en las tiradas de ataque contra otras criaturas que no seas tú.\n\nEste efecto termina si atacas a cualquier otra criatura, si lanzas un conjuro que tenga como objetivo a una criatura hostil que no sea el objetivo inicial, si una criatura amistosa daña al objetivo o le lanza un conjuro dañino, o si terminas tu turno a más de 30 pies de él.",
      n: 7,
      usos: "Modificador de Inteligencia",
      reset: "Largo"
    },
    {
      nombre: "Magnificencia (Magnificence)",
      t: "fuera",
      texto: "Cuando alcanzas el nivel 10, puedes pasar 10 minutos puliendo una armadura o un arma hasta que brille (o hasta 6 si lo haces durante un descanso corto o largo). La pieza de equipo pulida adquiere la siguiente propiedad:\n\n**Brillante.** El objeto emite luz brillante en un radio de 20 pies y luz tenue en 20 pies adicionales. Brilla durante 8 horas, tras las cuales la luz se desvanece. Mientras el objeto emite luz, si la criatura que lo usa falla una tirada de salvación, puede usar su reacción para volver a tirar esa salvación; debe quedarse con la segunda tirada. Una vez que se usa esta capacidad, la luz del objeto se desvanece. Una criatura solo puede beneficiarse de esta habilidad una vez cada 24 horas.",
      n: 10
    },
    {
      nombre: "Defensas Deslumbrantes (Dazzling Defenses)",
      t: "adicional",
      texto: "En el nivel 14, tus armas brillan con los matices del arco iris de docenas de piedras preciosas. Cuando infliges daño a una criatura con un arma que tiene la propiedad Ornamentada, puedes usar tu acción adicional para distraer a la criatura, provocándole desventaja en la siguiente tirada de ataque o tirada de salvación que realice.",
      n: 14,
      usos: "1",
      reset: "Corto o Largo"
    },
    {
      nombre: "Maestro Filigranista (Master Filigrist)",
      t: "pasiva",
      texto: "En el nivel 18, alcanzas la cúspide de tu oficio. Aprendes la propiedad Legendaria **Real (Royal)**.\n\n**Real.** *Propiedad Legendaria (Armadura exótica de obra maestra).* Esta armadura, digna de un rey o un emperador, está revestida de oro y gemas brillantes. Mientras la lleves puesta, puedes añadir tu modificador de Inteligencia a todas las tiradas de salvación que realices.",
      n: 18
    }
  ]
};

export const forgemastersGuild = {
  n: 3,
  rasgos: [
    {
      nombre: "Armería Fogueada (Forgefired Armory)",
      t: "fuera",
      texto: "Al ingresar a esta profesión en el nivel 3, construyes un horno portátil y ponible que te permite calentar objetos que estés forjando sin necesidad de un taller o forja especialmente construidos. Este aparato es voluminoso, pero puede llevarse sobre la ropa o la armadura; ponértelo o quitártelo lleva 1 minuto. Se supone que has estado trabajando en él en tu tiempo libre y solo alcanza su funcionalidad completa al adoptar esta subclase.\n\nSi alguna vez pierdes tu horno o se destruye, puedes repararlo o sustituirlo durante un descanso largo usando materiales por valor de 100 po.\n\nMientras lleves puesto tu horno, las armas que empuñes pueden infligir daño por fuego en lugar de su tipo de daño habitual.",
      n: 3
    },
    {
      nombre: "Quemadura (Burn)",
      t: "adicional",
      texto: "En el nivel 3, mientras llevas puesto tu horno, puedes canalizar el calor de su fuego hacia tus golpes. Siempre que realices un ataque contra una criatura hostil, obtienes 1 punto de quemadura. Puedes almacenar hasta 3 puntos de quemadura al mismo tiempo; si llevas armadura pesada, puedes almacenar un número de puntos igual a la mitad de tu nivel de artesano (mínimo 3).\n\nSiempre que impactes a una criatura con un arma, si tienes 3 o más puntos de quemadura almacenados, puedes usar tu acción adicional para descargar todos los puntos, infligiendo 1d6 de daño por fuego adicional por cada punto descargado. Los puntos de quemadura no gastados se disipan después de 1 minuto, o al quitarte el horno.",
      n: 3
    },
    {
      nombre: "Iniciado Caballero de la Forja (Forgeknight Initiate)",
      t: "pasiva",
      texto: "También en el nivel 3, aprendes a usar el fuego de tu horno de formas más exóticas. Mientras lo llevas puesto, puedes lanzar los trucos *reparar* (mending) y *producir llama* (produce flame) a voluntad. La Inteligencia es tu característica para el lanzamiento de estos conjuros.",
      n: 3
    },
    {
      nombre: "Defensas Escaldantes (Scalding Defenses)",
      t: "pasiva",
      texto: "A partir del nivel 7, mientras lleves puesta una armadura pesada, obtienes resistencia al daño por fuego, y cualquier ataque que realices con un arma que inflige daño por fuego ignora la resistencia a este tipo de daño.\n\nAdemás, aprendes a forjar armas que pueden canalizar cantidades increíbles de calor. Puedes aplicar la propiedad **Calor (Heat)** a tus armas de obra maestra.\n\n**Calor.** *Propiedad de Oficial (Arma de obra maestra con la propiedad Dos manos).* Esta arma obtiene la propiedad Calor. Además, inflige daño por fuego en lugar de su tipo habitual y su dado de daño aumenta 1 grado.\nLa propiedad Calor hace que el arma gane un punto de calor cada vez que se usa para atacar, y pierde un punto al inicio de tu turno. Si acumula 3 puntos de calor, el arma se sobrecalienta y pierde todos sus puntos. Un arma sobrecalentada no puede usarse para realizar ataques hasta el final de tu siguiente turno.",
      n: 7
    },
    {
      nombre: "Corazón de la Forja (Heart of the Forge)",
      t: "accion",
      texto: "A partir del nivel 10, puedes introducir un número de armas cuerpo a cuerpo o piezas de munición en una forja activa o en tu propio horno, calentándolas hasta alcanzar temperaturas incandescentes. Las armas y la munición puestas en la forja deben ser de metal y permanecen al rojo vivo durante 10 minutos.\n\nPuedes calentar un arma o 2 piezas de munición en la forja como acción, o hasta 10 armas o 20 piezas de munición en el transcurso de un minuto. Un arma o pieza de munición calentada inflige daño por fuego en lugar de su tipo habitual y prende fuego a objetos inflamables con los que impacte (si no los llevan puestos ni los transportan).",
      n: 10
    },
    {
      nombre: "Fuegos de la Forja (Fires of the Forge)",
      t: "accion",
      texto: "En el nivel 14, aprendes a liberar el calor almacenado en tu equipo con efectos devastadores. Mientras llevas puesto el horno, si tienes 5 puntos de quemadura almacenados, puedes lanzar el conjuro *calentar metal* como acción sobre una criatura a 60 pies sin gastar espacio de conjuro. Alternativamente, si tienes 7 puntos almacenados, puedes lanzar *bola de fuego* como acción. La Inteligencia es tu aptitud mágica para ambos conjuros.",
      n: 14,
      usos: "1",
      reset: "Corto o Largo"
    },
    {
      nombre: "Maestro Caballero de la Forja (Master Forgeknight)",
      t: "pasiva",
      texto: "En el nivel 18, alcanzas la cúspide de tu oficio. Aprendes la propiedad Legendaria **Vinculado a la Forja (Forgebound)**.\n\n**Vinculado a la Forja.** *Propiedad Legendaria (Armadura pesada exótica de obra maestra).* Incorporas un horno en miniatura a esta armadura, junto con capas de materiales de dispersión de calor. Mientras la llevas puesta, eres inmune al daño por fuego y por frío, y puedes sobrevivir en temperaturas extremas (desde 150 °F hasta -100 °F) sin efectos perjudiciales. Además, cuando realizas la acción de Correr mientras la llevas, dejas un rastro de fuego. Este rastro tiene 5 pies de ancho y dura hasta el comienzo de tu próximo turno. Cualquier criatura que entre en el área por primera vez en su turno o empiece su turno allí recibe 1d8 + tu modificador de Inteligencia de daño por fuego.",
      n: 18
    }
  ]
};

export const luminariesGuild = {
  n: 3,
  rasgos: [
    {
      nombre: "Armamento de Luz Sólida (Hardlight Armament)",
      t: "fuera",
      texto: "A partir de que te unes a este gremio en el nivel 3, aprendes a forjar equipamiento duradero con luz sólida (hardlight) usando un proyector especial. Si el proyector se pierde o se destruye, puedes construir uno nuevo durante un descanso largo por 100 po.\n\nCon el proyector, puedes aplicar las siguientes propiedades de Aprendiz a tu equipo:\n\n- **Luz Sólida (Arma de obra maestra):** Se forja por completo de luz sólida, expandiéndose hasta formar un objeto sólido brillante cuando se desenvaina y condensándose en un chip de control cuando se guarda. No pesa nada, pero posee inercia. Su tipo de daño cambia a fuerza. Como interacción en tu turno, puedes desenvainar o guardar armas de luz sólida y ponerte o quitarte una armadura de luz sólida.\n- **Luz Sólida (Armadura de obra maestra):** Se construye totalmente de luz sólida reluciente, apareciendo a tu alrededor en un instante. No pesa nada y emite luz tenue en un radio de 10 pies. Como interacción en tu turno, puedes ponértela o quitártela, así como desenvainar o guardar cualquier arma de luz sólida que poseas.",
      n: 3
    },
    {
      nombre: "Forja de Luz (Lightforge)",
      t: "adicional",
      texto: "En el nivel 3, como acción adicional, forjas una armadura, un escudo, un juego de herramientas de artesano o cualquier arma cuerpo a cuerpo que inflija daño contundente, perforante o cortante, hecha por completo de luz sólida relampagueante. Las armas y armaduras creadas con esta habilidad pueden ser exóticas, pero no de obra maestra. Tras 10 minutos, este objeto se evapora por completo en forma de luz.",
      n: 3
    },
    {
      nombre: "Fortificaciones Fotónicas (Photonic Fortifications)",
      t: "accion",
      texto: "En el nivel 7, puedes usar una acción para levantar un muro defensivo de luz sólida. Elige un espacio a 15 pies o menos de ti. A partir de ese punto, aparecen un número de paneles translúcidos igual a tu modificador de Inteligencia, que se conectan para formar un muro continuo. Cada panel tiene 5 pies de ancho, 4 de alto y 1/4 de pulgada de grosor, y es lo bastante alto como para proporcionar cobertura media a cualquier criatura Mediana detrás de él. Las criaturas no pueden atravesar el muro, pero pueden saltarlo. El muro persiste durante 1 minuto o hasta que lo disipes en tu turno (no requiere acción).",
      n: 7,
      usos: "1",
      reset: "Corto o Largo"
    },
    {
      nombre: "Filo de Luz Sólida (Hardlight Edge)",
      t: "fuera",
      texto: "A partir del nivel 10, puedes pasar 10 minutos fortificando un arma con un recubrimiento de luz sólida brillante (o hasta 6 si lo haces durante un descanso corto o largo), obteniendo una de las siguientes propiedades:\n\n- **Filo de Fuerza:** El arma inflige daño de fuerza en lugar de su daño habitual y hace 1d4 de daño adicional al impactar.\n- **Filo Radiante:** El arma inflige daño radiante al impactar y su alcance aumenta en 5 pies.\n\nEl arma conserva su propiedad hasta que impacta a un objetivo, momento tras el cual pierde dicha propiedad.",
      n: 10
    },
    {
      nombre: "Cañón de Rayos (Beam Cannon)",
      t: "accion",
      texto: "A partir del nivel 14, como acción, puedes sobrecargar tu proyector de luz sólida para disparar un rayo en una línea de 100 pies de largo y 5 pies de ancho a partir de ti, en la dirección que elijas. Cada criatura en el área debe realizar una tirada de salvación de Destreza contra tu CD de conjuros. Una criatura sufre 8d6 de daño radiante, o la mitad si supera la salvación. El disparo deja un rastro supercaliente en el área que dura hasta el inicio de tu próximo turno. Una criatura que entra en el área por primera vez en su turno sufre 4d6 de daño por fuego. Los rayos prenden fuego a los objetos inflamables que no se lleven puestos ni transportados.",
      n: 14,
      usos: "1",
      reset: "Corto o Largo"
    },
    {
      nombre: "Maestro Luminaria (Master Luminary)",
      t: "pasiva",
      texto: "En el nivel 18 alcanzas la cúspide de tu oficio. Aprendes la técnica de fabricación Legendaria **Fotónico/Fotónica (Photonic)**:\n\n- **Fotónico (Arma exótica de obra maestra con Luz Sólida):** El arma está imbuida con luz sólida inestable, lo que aumenta su potencial dañino. Puede infligir daño radiante en lugar de su tipo de daño normal, e inflige 1d6 de daño de fuerza o radiante (a tu elección) adicional al impactar.\n- **Fotónica (Armadura exótica de obra maestra con Luz Sólida):** Está construida con luz sólida refinada, lo que la hace muy resistente a los daños. Otorga resistencia al daño radiante y de fuerza, y los ataques desarmados realizados mientras se lleva puesta infligen 1d4 de daño radiante o de fuerza (a tu elección) adicional.",
      n: 18
    }
  ]
};

export const maestersGuild = {
  n: 3,
  rasgos: [
    {
      nombre: "Anillo de Maestre (Maester's Ring)",
      t: "pasiva",
      texto: "Al adoptar esta profesión en el nivel 3, te forjas un pequeño objeto mágico conocido como Anillo de Maestre. Este anillo está sintonizado contigo, no cuenta para el límite de tus objetos sintonizados y, si se pierde, siempre volverá a tu dedo al siguiente amanecer.\n\nCuando creas este anillo, elige dos trucos de la lista de conjuros de Mago. Mientras llevas este anillo, puedes lanzar cualquiera de esos trucos, así como el truco *reparar* (mending). Tu anillo gana un truco adicional de tu elección en el nivel 10 y otro en el nivel 18. Tu característica de lanzamiento de conjuros para estos trucos es la Inteligencia.",
      n: 3
    },
    {
      nombre: "Herrería Arcana (Arcane Smithing)",
      t: "fuera",
      texto: "Al empezar en esta profesión en el nivel 3, aprendes un método más eficiente, aunque más extenuante, de encantar objetos mágicos. Al fabricar un objeto mágico, puedes hacerlo a un ritmo de 150 po por nivel de artesano al día, hasta alcanzar su valor de mercado.\n\nEncantar un objeto mágico a este ritmo es agotador: al terminar un descanso largo tras un día en el que hagas progreso a esta velocidad, sufres un nivel de agotamiento, que solo se puede eliminar completando un descanso largo.\n\nNo necesitas gastar espacios de conjuros ni conocer los hechizos requeridos para hacer el objeto, aunque debes tener un esquema y cumplir el nivel mínimo. Crear objetos que requieren sintonización es más difícil y requiere un nivel mayor: Común (nv 3), Poco común (nv 7), Raro (nv 11), Muy Raro (nv 17), Legendario (nv 20).",
      n: 3
    },
    {
      nombre: "Especialista en Sintonización (Attunement Specialist)",
      t: "pasiva",
      texto: "A partir del nivel 7, puedes sintonizarte con hasta 4 objetos mágicos a la vez, y puedes sintonizarte con cualquier objeto mágico incluso si no cumples los requisitos de sintonización. En el nivel 18, este número aumenta a 5 objetos.\n\nAdemás, puedes sintonizarte con un objeto mágico como una acción, y puedes usar pergaminos como si fueras un lanzador de conjuros que tiene dicho conjuro en su lista. Dado que no puedes lanzar conjuros, siempre debes realizar una prueba de aptitud mágica para lanzar un conjuro de un pergamino al usar esta habilidad.\n\nTambién tienes ventaja en todas las pruebas de Inteligencia (Arcano) para crear esquemas de objetos mágicos.",
      n: 7
    },
    {
      nombre: "Encantamiento Eficiente (Efficient Enchanting)",
      t: "fuera",
      texto: "En el nivel 10, aprendes a encantar pequeños lotes de objetos mágicos consumibles de uso regular con poco o ningún esfuerzo. Siempre que fabriques un objeto mágico consumible común, puedes crear en su lugar un lote de 1 + tu modificador de Inteligencia de ese objeto. Al fabricar un consumible poco común, creas dos en su lugar.",
      n: 10
    },
    {
      nombre: "Recarga Rápida (Rapid Recharge)",
      t: "accion",
      texto: "A partir del nivel 14, como acción en tu turno, puedes permitir que un objeto mágico que sostengas recupere un número de cargas igual a la cantidad que recupera normalmente al amanecer.",
      n: 14,
      usos: "1",
      reset: "Largo"
    },
    {
      nombre: "Maestro Forjador de Conjuros (Master Spellwright)",
      t: "pasiva",
      texto: "En el nivel 18, alcanzas la cúspide de tu oficio. Aprendes las propiedades Legendarias **Ardiente (Ardent)** y **Mística (Mystical)**.\n\n- **Ardiente (Armadura exótica de obra maestra):** Elige tres tipos de daño de esta lista: frío, fuego, fuerza, relámpago, necrótico, psíquico, radiante, trueno. Mientras la llevas puesta, tienes resistencia a esos tres tipos de daño.\n- **Mística (Arma exótica de obra maestra):** Si esta arma inflige un dado adicional de daño debido a su propiedad de Maestro, inflige en su lugar dos dados de daño adicional.",
      n: 18
    }
  ]
};

export const mechanautsGuild = {
  n: 3,
  rasgos: [
    {
      nombre: "Maravilla Mecánica (Mechanical Marvel)",
      t: "fuera",
      texto: "En el nivel 3, completas el armazón del Aparato de un Mecanauta, con amplio espacio para mejoras. Sus planos se basan en el Aparato del Cangrejo, pero puedes modelarlo para que parezca cualquier bestia o una figura humanoide. Tu aparato viene con dos armas de obra maestra instaladas. Aunque no puede llevar armadura, su cuerpo funciona como una armadura pesada exótica de obra maestra. El aparato es competente con las armas y la armadura corporal. Puedes aplicarle propiedades de armazón específicas de este gremio (listadas en apartados de propiedades).\n\n**Reparar el Aparato.** En un descanso largo, puedes reparar tu aparato al máximo de puntos de golpe. Se asume que siempre tienes materiales. Si lo pierdes, puedes construir uno nuevo por 400 po.\n\n**Pilotar el Aparato.** Actúa en tu turno, pero no toma acciones si no lo pilotas. A 500 pies, puedes ordenarle moverse (sin acción). Si estás a 5 pies, puedes entrar o salir usando la mitad de tu velocidad. Dentro, puedes usar tu acción para pilotarlo, haciendo que realice la acción de Atacar, Correr, Destrabarse o Esquivar. Solo tú puedes pilotarlo.\n\n**Estadísticas del Armazón de Mecanauta:**\nConstructo Grande, sin alineamiento\nCA: 13 + el mod de Int de su creador. PG: 30 (15 + 5 x tu nivel de artesano). Vel: 35 pies.\nFUE 14 (+2), DES 14 (+2), CON 14 (+2), INT 1 (-5), SAB 3 (-4), CAR 1 (-5)\nInmune a daño: Veneno, psíquico.\nInmune a condiciones: Cegado, hechizado, ensordecido, asustado, paralizado, petrificado, envenenado.\nSentidos: visión ciega 120 pies.\n**Controles de Cabina:** Cuando el piloto realiza la acción Atacar, puede renunciar a sus propios ataques para que el aparato realice ese número de ataques. Usa el mod de Int del jinete + su bonificador por competencia para los ataques.\n**Cobertura de Cabina:** Cualquier criatura dentro tiene cobertura de 3/4 desde fuera.\n**Doble a Dos Manos:** Tiene dos brazos mecánicos, y cada uno puede empuñar armas como si usara dos manos. Puede usar armas a distancia y cuerpo a cuerpo.\n*Acciones: Maza (Mano derecha e izquierda, Ataque de Arma Cuerpo a Cuerpo, +2 impactar, 5 pies. Daño: 2d6+2 contundente).*.",
      n: 3
    },
    {
      nombre: "Sintonización Artificial (Artificial Attunement)",
      t: "pasiva",
      texto: "En el nivel 7, has desarrollado un medio para fijar objetos mágicos a tu aparato, otorgándole sus beneficios místicos. Cuando te sintonizas a un objeto mágico, puedes elegir instalarlo en tu aparato. El objeto sigue ocupando uno de tus huecos de sintonización, pero otorga los beneficios al aparato. Al pilotarlo, puedes hacer que realice la acción de Usar un Objeto.",
      n: 7
    },
    {
      nombre: "Puesta a Punto (Tune-Up)",
      t: "fuera",
      texto: "A partir del nivel 10, puedes pasar 10 minutos afinando y apuntalando los mecanismos más delicados de tu aparato, lo que le otorga puntos de golpe temporales iguales a tu modificador de Inteligencia más tu bonificador por competencia.",
      n: 10
    },
    {
      nombre: "Chapuza (Jury-Rigging)",
      t: "adicional",
      texto: "En el nivel 14, mientras montas tu aparato, puedes usar una acción adicional para restaurar un número de puntos de golpe igual a 5 + tu modificador de Inteligencia al aparato. No puedes usar esta habilidad si tu aparato tiene más de la mitad de sus puntos de golpe máximos restantes.",
      n: 14
    },
    {
      nombre: "Maestro Mecánico (Master Mechanist)",
      t: "pasiva",
      texto: "En el nivel 18 alcanzas la cúspide de tu oficio. Aprendes la propiedad Legendaria **Protocolo de Ejecución (Execution Protocol)**.\n\n**Protocolo de Ejecución:** *Propiedad Legendaria (Aparato de Mecanauta).* Este aparato tiene ventaja en las tiradas de ataque contra criaturas que tengan menos de la mitad de sus puntos de golpe máximos restantes.",
      n: 18
    }
  ]
};

export const craftsmanOptions = {
  "Estilo de Combate: Defensa": "Mientras llevas puesta una armadura, obtienes un bonificador de +1 a la CA.",
  "Estilo de Combate: Protección": "Cuando una criatura que puedas ver ataque a un objetivo que no seas tú y que esté a 5 pies o menos de ti, puedes usar tu reacción para imponer desventaja en la tirada de ataque. Debes estar empuñando un escudo.",
  "Estilo de Combate: Arquería": "Obtienes un bonificador de +2 a las tiradas de ataque que realices con armas a distancia.",
  "Estilo de Combate: Duelo": "Cuando empuñes un arma cuerpo a cuerpo en una mano y ninguna otra arma, obtienes un bonificador de +2 a las tiradas de daño con esa arma.",
  "Estilo de Combate: Armas a Dos Manos": "Cuando obtienes un 1 o un 2 en un dado de daño para un ataque que realizas con un arma cuerpo a cuerpo que empuñas con ambas manos, puedes volver a tirar el dado y debes usar la nueva tirada, incluso si es un 1 o un 2. El arma debe tener la propiedad Dos manos o Versátil para obtener este beneficio.",
  "Estilo de Combate: Dos Armas": "Cuando participas en combate con dos armas, puedes sumar tu modificador de característica al daño del segundo ataque.",
  "Estilo de Combate: Akimbo": "Cuando participas en combate con dos armas con armas de fuego ligeras, no sufres un penalizador al daño del segundo ataque.",
  "Estilo de Combate: Diana": "Obtienes un bonificador de +2 a las tiradas de ataque a distancia que realices con armas de fuego. El arma debe tener la propiedad Mira (Sighted) o un alcance normal de 80 pies o más para obtener este efecto. Este efecto no se acumula con Arquería.",
  "Estilo de Combate: Duelista": "Mientras empuñes un arma de fuego en una mano y nada en la otra, si realizas un ataque con arma a distancia y superas la CA del objetivo por 5 o más, infliges un dado adicional de daño de arma. Solo puedes usar este rasgo una vez por ronda.",
  "Estilo de Combate: Escopetero": "Cuando impactas con un ataque de arma a distancia usando un arma de fuego que tenga la propiedad Dispersión (Scatter), puedes volver a tirar el dado de daño más bajo, y debes usar la nueva tirada, incluso si es peor."
};
```eof

```json:Lote_36a_Craftsman_B.json
{
  "craftsman-level-table": {
    "1": { "proficiencyBonus": 2, "features": ["Competencias Adicionales", "Herrería"] },
    "2": { "proficiencyBonus": 2, "features": ["Obra Maestra (Propiedades de Aprendiz)", "Cinturón de Herramientas"] },
    "3": { "proficiencyBonus": 2, "features": ["Gremio de Artesanos"] },
    "4": { "proficiencyBonus": 2, "features": ["Mejora de Puntuación de Característica"] },
    "5": { "proficiencyBonus": 3, "features": ["Ataque Extra", "Obra Maestra (Propiedades de Oficial)"] },
    "6": { "proficiencyBonus": 3, "features": ["Acero Plegado"] },
    "7": { "proficiencyBonus": 3, "features": ["Rasgo de Gremio"] },
    "8": { "proficiencyBonus": 3, "features": ["Mejora de Puntuación de Característica"] },
    "9": { "proficiencyBonus": 4, "features": ["Modificaciones Rápidas"] },
    "10": { "proficiencyBonus": 4, "features": ["Rasgo de Gremio"] },
    "11": { "proficiencyBonus": 4, "features": ["Obra Maestra (Propiedades de Maestro)"] },
    "12": { "proficiencyBonus": 4, "features": ["Mejora de Puntuación de Característica"] },
    "13": { "proficiencyBonus": 5, "features": ["Golpe de Artesano"] },
    "14": { "proficiencyBonus": 5, "features": ["Rasgo de Gremio"] },
    "15": { "proficiencyBonus": 5, "features": ["Cinturón de Herramientas Insólito"] },
    "16": { "proficiencyBonus": 5, "features": ["Mejora de Puntuación de Característica"] },
    "17": { "proficiencyBonus": 6, "features": ["Obra Maestra (Propiedades Legendarias)"] },
    "18": { "proficiencyBonus": 6, "features": ["Rasgo de Gremio"] },
    "19": { "proficiencyBonus": 6, "features": ["Mejora de Puntuación de Característica"] },
    "20": { "proficiencyBonus": 6, "features": ["Obra Magna"] }
  }
}
```eof

```json:Lote_36a_Craftsman_C.json
{
  "craftsman": "Craftsman (Valda's Spire of Secrets)",
  "armigers-guild": "Craftsman (Valda's Spire of Secrets)",
  "bladeworkers-guild": "Craftsman (Valda's Spire of Secrets)",
  "calibarons-guild": "Craftsman (Valda's Spire of Secrets)",
  "clockworkers-guild": "Craftsman (Valda's Spire of Secrets)",
  "filigrists-guild": "Craftsman (Valda's Spire of Secrets)",
  "forgemasters-guild": "Craftsman (Valda's Spire of Secrets)",
  "luminaries-guild": "Craftsman (Valda's Spire of Secrets)",
  "maesters-guild": "Craftsman (Valda's Spire of Secrets)",
  "mechanauts-guild": "Craftsman (Valda's Spire of Secrets)"
}
```eof

```json:Lote_36a_Craftsman_D.json
{
  "craftsman": "Crea armas de obra maestra, ingenios únicos e invenciones en el campo de batalla adaptando tus herramientas a cualquier problema.",
  "armigers-guild": "Artesanos devotos a la herrería de armaduras, con la firme convicción de que la placa correcta hace a un guerrero invencible.",
  "bladeworkers-guild": "Expertos en forjar y emplear espadas, arcos y otras armas marciales con maestría sin igual.",
  "calibarons-guild": "Pioneros en el desarrollo de la pólvora y armas de fuego, aplicando demolición con precisión de maestro armero.",
  "clockworkers-guild": "Ingenieros y relojeros que dan vida a constructos mecánicos acompañantes a través de engranajes y piezas móviles.",
  "filigrists-guild": "Joyeros y artistas de ascendencia férica que transforman armaduras en formidables atuendos lujosos.",
  "forgemasters-guild": "Llevan el corazón de su forja a la batalla. El calor candente de sus creaciones no solo da forma, sino que también destruye.",
  "luminaries-guild": "Proyectan el material definitivo, la 'luz sólida', creando sus propias defensas y armamento radiante de la nada.",
  "maesters-guild": "Canalizan su talento a través del uso metódico y masivo de magia, encantando objetos con extremada eficacia.",
  "mechanauts-guild": "Amos de la ingeniería mecatrónica; pilotan su propio tanque o meca de asalto totalmente personalizable."
}
```eof

```markdown:Lote_36a_Craftsman_E.md
### Notas sobre Traducción y Exclusiones:
- Todas las **Propiedades de Armas**, **Propiedades de Armaduras**, y las **Propiedades del Armazón de Mecanauta** mencionadas en las características pero que se listan "más adelante en este capítulo" (como las propiedades de Aprendiz, Oficial, Maestro, etc., para el armamento exótico del Mechanaut's Apparatus) pertenecen a partes posteriores del material (ej. Lote 36b) y, por lo tanto, no se han incluido en la respuesta tal y como dicta la directriz de traducir estrictamente la porción entregada.
- Las **Opciones Elegibles** incluyeron los diferentes Estilos de Combate presentados en los Gremios de Armígeros, Espaderos y Calibarones.
- Para las traducciones de las Estadísticas de los Constructos (Relojeros y Mecanautas), se han incorporado usando un formato amigable directo en el texto de su rasgo correspondiente para garantizar visibilidad al jugador en la aplicación.
```eof