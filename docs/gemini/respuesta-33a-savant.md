=== A ===

```typescript
export const savant = {
  n: "Erudito (Savant)",
  dado: "d8",
  sv: "Inteligencia, Sabiduría",
  habN: 2,
  habs: [
    "Arcano",
    "Historia",
    "Investigación",
    "Perspicacia",
    "Medicina",
    "Naturaleza",
    "Persuasión",
    "Religión"
  ],
  arm: "Armaduras ligeras",
  armas: "Armas simples, estoques, espadas cortas, látigos",
  equipo: "(a) un arma simple de tu elección o (b) una espada corta. (a) una ballesta ligera y 20 virotes o (b) dos dagas. Un set de Herramientas de Artesano, armadura de cuero y un paquete de erudito.",
  rasgos: [
    {
      nombre: "Análisis Diestro (Adroit Analysis)",
      t: "adicional",
      texto: "A partir del nivel 1, puedes usar tu acción adicional para realizar la acción de Ayudar o Buscar, o hacer una prueba de característica de Inteligencia.\n\nCuando realizas la acción de Buscar, puedes estudiar a una criatura que puedas ver a 60 pies o menos, designándola como tu Foco (Focus), aprendiendo una de las siguientes Características de tu elección:\n- Clase de Armadura\n- Puntuación de característica más alta\n- Todos los Sentidos Especiales\n- Puntuación de característica más baja\n- Resistencias, Inmunidades y Vulnerabilidades\n- Un Rasgo o Acción de su bloque de estadísticas\n\nSigue siendo tu Foco durante 1 minuto, pero termina antes si quedas Incapacitado o si usas este rasgo en otra criatura. Durante la duración, obtienes los beneficios y limitaciones a continuación:\n\n**Dado de Intelecto.** Tu genialidad está representada por tu Dado de Intelecto, un d4. Cuando un rasgo usa tu Dado de Intelecto, siempre tira el Dado. Si alguna vez sumas más de un Dado de Intelecto a una tirada, tira todos tus Dados de Intelecto, pero aplica solo el resultado más alto a tu tirada. En ciertos niveles, el tamaño de tu Dado de Intelecto aumenta, como se muestra en la columna Dado de Intelecto de la tabla de la clase.\n**Tiradas de Salvación.** Si uno de tus rasgos requiere que tu Foco haga una tirada de salvación, la CD de salvación se calcula usando tu Inteligencia (CD de salvación de Intelecto = 8 + tu Bonificador de Competencia + tu modificador por Inteligencia).\n**Esquiva Predictiva.** Mientras puedas ver a tu Foco, este tiene desventaja en todos los ataques, tanto de arma como de conjuro, que haga contra ti.\n**Mentalidad Única.** Mientras tengas un Foco, no puedes lanzar ni concentrarte en conjuros, ni usar otros rasgos que requieran tu concentración.\n**Golpe Estudiado.** Siempre que realices un ataque con arma contra tu Foco, puedes usar tu Inteligencia para tus tiradas de ataque y daño. Una vez por turno, cuando impactes a tu Foco con un ataque, infliges daño adicional igual a tu Dado de Intelecto. Puedes renunciar a este daño para aprender otra Característica de la lista anterior.",
      n: 1
    },
    {
      nombre: "Defensa Analítica (Analytical Defense)",
      t: "pasiva",
      texto: "También a nivel 1, tus capacidades predictivas ayudan a tu defensa. Mientras no lleves armadura ni escudo, tu Clase de Armadura es igual a 10 + tus modificadores por Destreza e Inteligencia.",
      n: 1
    },
    {
      nombre: "Observación Potente (Potent Observation)",
      t: "reaccion",
      texto: "A partir del nivel 2, puedes informar rápidamente a tus aliados de las deducciones que haces. Cuando otra criatura a 30 pies o menos que pueda escucharte y entenderte, inflija daño a tu Foco, o realice una prueba de característica usando una herramienta o habilidad en la que seas competente, puedes usar una reacción para sumar tu Dado de Intelecto a su tirada.",
      n: 2
    },
    {
      nombre: "Búsquedas Eruditas (Scholarly Pursuits)",
      t: "pasiva",
      texto: "Siempre estás ampliando tu base de conocimientos. A nivel 2, dominas una Búsqueda Erudita de tu elección. Dominas una Búsqueda Erudita adicional de tu elección cuando alcanzas el nivel 5, 11 y 17 en esta clase.",
      n: 2
    },
    {
      nombre: "Disciplina Académica (Academic Discipline)",
      t: "pasiva",
      texto: "A nivel 3, eliges una Disciplina Académica que represente mejor tu conocimiento y estudio. Tu Disciplina te otorga rasgos a nivel 3, 7, 13 y 18. Todos los rasgos de Disciplina usan tu CD de salvación de Intelecto.",
      n: 3
    },
    {
      nombre: "Mejora de Puntuación de Característica",
      t: "pasiva",
      texto: "Al nivel 4, y nuevamente a los niveles 8, 12, 16 y 19, puedes incrementar una puntuación de característica en 2, o dos puntuaciones de característica en 1. No puedes usar este rasgo para elevar una puntuación de característica por encima de 20.",
      n: 4
    },
    {
      nombre: "Floritura Calculada (Calculated Flourish)",
      t: "reaccion",
      texto: "Siempre estás listo para esquivar golpes mortales. A partir del nivel 5, cuando te impacta un ataque que puedas ver, puedes usar una reacción para sumar tu Dado de Intelecto a tu Clase de Armadura contra ese ataque, lo que posiblemente convierta un impacto en un fallo.",
      n: 5
    },
    {
      nombre: "Reflejos Rápidos (Swift Reflexes)",
      t: "pasiva",
      texto: "La velocidad a la que observas y reaccionas a tu entorno es increíble. A nivel 5, puedes realizar hasta dos reacciones cada asalto, pero nunca puedes usar más de una reacción por desencadenante. Obtienes reacciones adicionales por asalto en ciertos niveles: a nivel 11 (3) y a nivel 17 (4).",
      n: 5
    },
    {
      nombre: "Mente Aguda (Sharp Mind)",
      t: "pasiva",
      texto: "Tu genio es verdaderamente maravilloso. A partir del nivel 6, sumas tu Dado de Intelecto a todas las tiradas de salvación de Inteligencia, Sabiduría y Carisma, siempre y cuando no estés Incapacitado.\n\nAdemás, ahora puedes usar tu Observación Potente cuando una criatura en el rango del rasgo se vea obligada a realizar una tirada de salvación.",
      n: 6
    },
    {
      nombre: "Conciencia Perspicaz (Keen Awareness)",
      t: "pasiva",
      texto: "Siempre estás preparado para el peligro. A partir del nivel 9, siempre que no estés Incapacitado, no puedes ser Sorprendido, y puedes sumar tu modificador por Inteligencia a las tiradas de iniciativa.",
      n: 9
    },
    {
      nombre: "Genio Inigualable (Unrivaled Genius)",
      t: "pasiva",
      texto: "Tu intelecto ha alcanzado alturas casi sobrenaturales. A nivel 10, los rasgos a continuación mejoran de las siguientes maneras:\n\n**Observación Potente:** Puedes usar Observación Potente en cualquier momento en que otra criatura dentro del rango inflija daño a cualquier objetivo, no solo a tu Foco. Si se usa contra tu Foco, sumas dos Dados de Intelecto al daño.\n**Floritura Calculada:** Cuando usas Floritura Calculada y el ataque falla, puedes elegir moverte hasta 10 pies sin provocar ataques de oportunidad, o hacer un único ataque de arma contra tu atacante.",
      n: 10
    },
    {
      nombre: "Voluntad Inquebrantable (Unyielding Will)",
      t: "pasiva",
      texto: "A nivel 14, obtienes competencia en tiradas de salvación de Carisma. También tienes ventaja en las tiradas de salvación que tu Foco te obligue a hacer, y en cualquier tirada de salvación que hagas para resistir o terminar las condiciones de Hechizado y Asustado.",
      n: 14
    },
    {
      nombre: "Análisis Impecable (Flawless Analysis)",
      t: "accion",
      texto: "A nivel 15, aprendes a predecir sin fallas el próximo movimiento de tu Foco e informar a tus aliados. Como acción, puedes obligar a tu Foco a hacer una tirada de salvación de Inteligencia. Si falla, tienen lugar los siguientes efectos hasta el comienzo de tu próximo turno:\n- Tu Foco tiene desventaja en todas sus pruebas de característica, tiradas de ataque y tiradas de salvación, siempre que siga siendo tu Foco.\n- Las criaturas de tu elección a 30 pies o menos tienen ventaja en cualquier tirada de salvación que tu Foco las obligue a hacer.\n\nUna vez que intentes usar Análisis Impecable sobre un Foco, no puedes usarlo sobre esa criatura de nuevo hasta que termines un descanso largo.",
      n: 15,
      usos: "1 por criatura",
      reset: "largo"
    },
    {
      nombre: "Intelecto Incomparable (Incomparable Intellect)",
      t: "pasiva",
      texto: "A nivel 20, alcanzas tu verdadero potencial. Tu puntuación de Inteligencia aumenta en 4, hasta un máximo de 24. Además, si tiras un Dado de Intelecto y sacas menos que tu modificador por Inteligencia, puedes reemplazar la tirada por tu modificador por Inteligencia.",
      n: 20
    }
  ]
};

export const savantPursuits = {
  "instruction": "Tus estudios te han convertido en un maestro excepcional. Durante el transcurso de 1 hora, que puede ser durante un descanso, puedes otorgar a un número de criaturas (hasta tu nivel de Erudito), con Inteligencia 8 o superior, competencia con una sola habilidad, herramienta o arma con la que tú tengas competencia, o la capacidad de hablar y comprender un idioma que conozcas. Las criaturas que instruyas deben poder escucharte y entenderte durante la hora.\n\nEl conocimiento dura hasta que la criatura termina un descanso largo.",
  "perfect-recall": "Puedes recordar detalles fotográficos de cualquier cosa que encomiendes a tu memoria. Si pasas al menos 1 minuto observando un objeto o criatura, puedes recordar a la perfección cualquier información observable sobre este en cualquier momento futuro.\n\nPor ejemplo, podrías memorizar un mapa, una página de un libro, una inscripción misteriosa o la apariencia de una criatura.",
  "quick-study": "Aprendes excepcionalmente rápido. Durante el transcurso de 1 hora, que puede ser durante un descanso corto o largo, puedes obtener competencia en una habilidad o herramienta, o aprender un idioma. Debes tener un ejemplo, como un manual u otra criatura, de donde aprender, y este conocimiento dura hasta que vuelvas a usar este rasgo.\n\nTambién puedes realizar la acción de Buscar cuando tiras iniciativa, siempre que no estés Sorprendido o Incapacitado.",
  "astrology": "Prerrequisitos: Erudito (Savant) de nivel 4.\nEres un discípulo de los cuerpos celestes y usas este conocimiento para torcer el destino. Obtienes competencia en Arcano, y puedes sumar tu Dado de Intelecto a cualquier prueba de Arcano que hagas.\n\nDurante cada descanso largo en el que puedas ver el cielo nocturno, tira un d20 y anota el número. Una vez antes de que termine tu próximo descanso largo, puedes elegir usar esa tirada en lugar de un d20 para una prueba de característica, tirada de ataque o tirada de salvación, antes de tirar.",
  "falconry": "Prerrequisitos: Erudito (Savant) de nivel 4.\nPuedes entrenar aves de presa para exploración y combate. Obtienes competencia en Percepción, y puedes sumar tu Dado de Intelecto a cualquier prueba de Percepción que hagas.\n\nTambién obtienes un Halcón entrenado que utiliza las siguientes reglas:\n- **Estadísticas.** El Halcón usa el bloque de estadísticas del Halcón (Hawk), pero tiene una puntuación de Inteligencia de 8. Pueden comunicarse ideas simples entre ustedes usando solo gestos y sonidos.\n- **Combate.** El Halcón es inquebrantablemente leal y actúa durante tu turno en combate. Puede moverse y usar su reacción por sí solo, pero solo realiza la acción de Esquivar a menos que uses tu acción adicional para ordenarle que realice una acción de su bloque de estadísticas, u otra acción. Si estás Incapacitado, tu Halcón puede actuar por sí solo y te defenderá lo mejor que pueda.\n- **Muerte.** Si tu Halcón cae a 0 puntos de golpe, hace tiradas de salvación contra muerte como lo haría un personaje jugador. Si muriera, tus habilidades únicas te permiten rastrear y entrenar a otro Halcón en el transcurso de un período de 8 horas usando cebo por valor de 5 piezas de oro, siempre que tal criatura se pueda encontrar razonablemente en el área.",
  "linguistics": "Prerrequisitos: Erudito (Savant) de nivel 4.\nEres un estudiante del lenguaje y la palabra hablada. Obtienes competencia en Persuasión, y puedes sumar tu Dado de Intelecto a cualquier prueba de Persuasión que hagas.\n\nTambién aprendes a hablar, leer y escribir un número de idiomas adicionales igual a tu modificador por Inteligencia (mínimo de 1). Si tu modificador por Inteligencia aumenta (o disminuye), también aumentan (o disminuyen) los idiomas adicionales que conoces.",
  "physical-fitness": "Prerrequisitos: Erudito (Savant) de nivel 4.\nSabes que la clave de una mente sana es un cuerpo sano. Obtienes competencia ya sea en Atletismo o Acrobacias, y puedes sumar tu Dado de Intelecto a las pruebas de característica con esa habilidad. También obtienes una velocidad de escalada o nado igual a tu velocidad al caminar.\n\nPuedes dominar esta Búsqueda Erudita dos veces. Sin embargo, debes elegir habilidades y velocidades de movimiento diferentes cada vez.",
  "riddles": "Prerrequisitos: Erudito (Savant) de nivel 4.\nHas pasado muchas horas aprendiendo a hablar tanto en acertijos como en rimas. Obtienes competencia en Engaño, y puedes sumar tu Dado de Intelecto a cualquier prueba de Engaño que hagas.\n\nCuando hablas, puedes elegir hablar en Acertijos. Pareces estar hablando normalmente, pero puedes incluir mensajes ocultos entrelazados en tus palabras rimadas. Durante el transcurso de 1 hora, que puede ser en un descanso corto o largo, puedes enseñar a otra criatura con una Inteligencia de 8 (o superior) a comprender los mensajes secretos en tus Acertijos. Si su Inteligencia es 11 (o superior), puede responderte con acertijos y rimas codificadas similares.",
  "secrets-and-whispers": "Prerrequisitos: Erudito (Savant) de nivel 4.\nConoces los lugares correctos para escuchar a escondidas y justo adónde ir por información. Obtienes competencia en Sigilo, y puedes sumar tu Dado de Intelecto a cualquier prueba de Sigilo que hagas.\n\nSiempre que pases un descanso largo en un asentamiento, puedes pasar 1 hora recopilando rumores locales para enterarte de un evento significativo, incluso secreto, que haya ocurrido allí en la última semana.",
  "theology": "Prerrequisitos: Erudito (Savant) de nivel 4.\nEres un estudioso dedicado de varios textos sagrados y ritos consagrados. Obtienes competencia en Religión, puedes hablar, leer y escribir Celestial, y puedes sumar tu Dado de Intelecto a todas las pruebas de Religión que hagas.\n\nAdemás, una vez entre cada descanso corto o largo, puedes aprovechar este conocimiento para realizar un Ritual de 10 minutos e impartir los beneficios de uno de los siguientes conjuros: *bendición*, *ceremonia*, *detectar el bien y el mal* o *protección contra el bien y el mal*. No necesitas gastar un espacio de conjuro ni los componentes materiales normales.",
  "traditions": "Prerrequisitos: Erudito (Savant) de nivel 4.\nEres un estudioso de la cultura, la política y las tradiciones. Obtienes competencia en Historia, y puedes sumar tu Dado de Intelecto a cualquier prueba de Historia que hagas.\n\nSi puedes incorporar tu conocimiento sobre tradiciones, costumbres o modales locales al interactuar con una criatura de ese lugar, puedes hacer pruebas de Historia en lugar de pruebas de Carisma."
};

export const archaeologist = {
  n: 3,
  rasgos: [
    {
      nombre: "Estudiante de Arqueología (Student of Archaeology)",
      t: "pasiva",
      texto: "Obtienes competencia tanto en Historia como en Investigación, y sumas tu Dado de Intelecto a las pruebas con ambas habilidades.\n\nEl tiempo dedicado a explorar lugares antiguos te ha dado una habilidad especial para navegar por sus peligros, otorgándote las siguientes destrezas:\n- Aprendes a hablar, leer y escribir dos idiomas adicionales de tu elección, a menudo lenguas arcaicas o lenguas olvidadas.\n- Cada vez que hagas una prueba de característica relacionada con una trampa, sumas tu Dado de Intelecto al resultado de tu tirada.\n- Si pasas al menos 1 minuto examinando un objeto, puedes determinar su valor, origen y edad. Si tiene propiedades mágicas, las aprendes como si fuera por el conjuro *identificar*.",
      n: 3
    },
    {
      nombre: "Ojo para la Antigüedad (Eye for Antiquity)",
      t: "fuera",
      texto: "Tu conocimiento de las civilizaciones antiguas te permite desbloquear sus tecnologías perdidas. Durante un descanso largo en un asentamiento o mazmorra, puedes pasar 1 hora estudiando antigüedades o escombros para desenterrar una Curiosidad (Curio). La Curiosidad es un objeto mágico Diminuto con las propiedades de un objeto mágico Común, de tu elección. Las Curiosidades siempre usan la Inteligencia como su Aptitud Mágica, e ignoras la restricción de Mentalidad Única del Análisis Diestro cuando lanzas y te concentras en conjuros producidos por Curiosidades.\n\nDebido a su antigüedad, debes pasar 1 hora durante cada descanso largo manteniendo las Curiosidades, o volverán a ser objetos mundanos. Si una Curiosidad era consumible (como un pergamino de conjuros), recupera su magia durante esta hora. Puedes mantener un número de Curiosidades igual a tu modificador por Inteligencia (un mínimo de una).",
      n: 3
    },
    {
      nombre: "Académico Aventurero (Adventuring Academic)",
      t: "pasiva",
      texto: "Tu habilidad para navegar por ruinas mortales en busca de conocimiento no tiene parangón. Siempre que hagas una tirada de salvación para evitar los efectos de una trampa, sumas tu Dado de Intelecto a tu tirada.\n\nTambién obtienes una velocidad de escalada igual a tu velocidad al caminar.",
      n: 7
    },
    {
      nombre: "Conocimientos Antiguos (Ancient Insights)",
      t: "pasiva",
      texto: "Has avanzado en tu comprensión de las tecnologías antiguas. Ignoras todas las restricciones de clase, raza y alineamiento para la sintonización y uso de objetos mágicos, pergaminos y pociones.\n\nAdemás, cuando usas Ojo para la Antigüedad para desenterrar una Curiosidad, puedes desenterrar Curiosidades con propiedades de objetos mágicos Comunes o Poco Comunes, siguiendo todas las demás reglas.",
      n: 7
    },
    {
      nombre: "Maestro del Conocimiento (Lore Master)",
      t: "fuera",
      texto: "Estudias cada detalle de cada mito, leyenda y cuento popular con el que te cruzas. Cuando observas a una persona, lugar u objeto durante al menos 10 minutos, recuerdas místicamente información sobre él como si fuera el objetivo de un conjuro de *conocimiento legendario*.\n\nEl objetivo de este rasgo no necesita ser de importancia legendaria para que obtengas información. Sin embargo, si no hay conocimiento relevante sobre el objetivo, no aprendes nada.",
      n: 13
    },
    {
      nombre: "Arcanos Desenterrados (Unearthed Arcana)",
      t: "accion",
      texto: "Eres un experto sin igual en dispositivos mágicos antiguos. Puedes usar tu CD de salvación de Intelecto para las tiradas de salvación de tus objetos mágicos, a menos que la CD innata del objeto sea mayor.\n\nAdemás, cada vez que terminas un descanso corto o largo, puedes hacer que una Curiosidad que toques recupere Cargas gastadas o usos iguales a tu modificador por Inteligencia (un mínimo de 1).",
      n: 13,
      usos: "1",
      reset: "corto"
    },
    {
      nombre: "Maestro Arqueólogo (Master Archaeologist)",
      t: "pasiva",
      texto: "La exposición a la magia del mundo antiguo te ha dado una resistencia innata a sus efectos. Obtienes Resistencia al daño de conjuros, objetos mágicos y trampas mágicas.\n\nFinalmente, puedes tener una única Curiosidad con las propiedades de un objeto mágico Raro.",
      n: 18
    }
  ]
};

export const investigator = {
  n: 3,
  rasgos: [
    {
      nombre: "Estudiante de la Verdad (Student of Truth)",
      t: "pasiva",
      texto: "Obtienes competencia en Perspicacia e Investigación, y puedes sumar tu Dado de Intelecto a las pruebas con ambas habilidades. También puedes usar Inteligencia, en lugar de Sabiduría, para tus pruebas de Perspicacia y Percepción, incluidas las pruebas pasivas.\n\nTu naturaleza intuitiva también te otorga los siguientes beneficios:\n- Cuando realizas la acción de Buscar, obtienes información como si hubieras pasado un minuto completo buscando en lugar de una acción.\n- Aprendes a hablar, leer y decodificar mensajes en la Jerga de Ladrones, el lenguaje del submundo criminal.\n- Por cada minuto que pases hablando con tu Foco, puedes aprender uno de sus Ideales, Rasgos, Vínculos o Defectos.",
      n: 3
    },
    {
      nombre: "Áspero y Violento (Rough & Tumble)",
      t: "pasiva",
      texto: "Has adquirido habilidades poco recomendables trabajando en los bajos fondos de la civilización. Tus impactos desarmados infligen daño Contundente igual a tu Dado de Intelecto + tu modificador por Fuerza, y cada vez que realices la acción de Atacar, puedes hacer un ataque desarmado como acción adicional en ese turno.\n\nUna vez por turno, cuando impactas a tu Foco con un ataque desarmado, puedes renunciar al daño adicional de Golpe Estudiado para obligarlo a hacer una tirada de salvación de Destreza. Si falla, queda Cegado, Sordo o no puede hablar hasta el inicio de tu próximo turno; o si es de tamaño Grande o menor, puedes derribarlo y dejarlo Tumbado.",
      n: 3
    },
    {
      nombre: "Contactos Ilícitos (Illicit Contacts)",
      t: "pasiva",
      texto: "Estás profundamente familiarizado con los elementos criminales de la sociedad. Mientras te comunicas en la Jerga de Ladrones, sumas tu Dado de Intelecto a cualquier prueba de característica que hagas para influir a otros que comprendan la Jerga de Ladrones.\n\nTambién dominas la Búsqueda Erudita Secretos y Susurros. Si ya la has aprendido, en su lugar puedes aprender tu elección de Recuerdo Perfecto o Tradiciones.",
      n: 7
    },
    {
      nombre: "Luchador Desleal (Underhanded Brawler)",
      t: "pasiva",
      texto: "Aprendiste a pelear en callejones oscuros, donde lo único que importa es quién queda en pie al final de una pelea. Obtienes los siguientes beneficios deshonestos:\n\n- **Floritura Astuta (Cunning Flourish).** Cuando usas tu Floritura Calculada y el ataque falla, puedes obligar a tu atacante a hacer una tirada de salvación de Destreza contra tu rasgo de Áspero y Violento como parte de la misma reacción.\n- **Desconcertar (Discombobulate).** Si tu Foco falla su tirada de salvación contra Áspero y Violento, puedes aplicar dos de los efectos normales en lugar de uno. Por ejemplo, puedes hacer que tu Foco quede Cegado y Sordo, o que quede Cegado y sea incapaz de hablar hasta el comienzo de tu próximo turno.\n- **Combatiente Escurridizo (Slippery Combatant).** Cuando una criatura que puedes ver hace un ataque de arma o conjuro contra ti, puedes usar tu reacción para designar al atacante como tu Foco, imponiendo desventaja en la tirada de ataque desencadenante.",
      n: 7
    },
    {
      nombre: "Mirada Penetrante (Piercing Gaze)",
      t: "pasiva",
      texto: "Ves a través del engaño y la conspiración más intrincados. Siempre eres consciente de si tu Foco está mintiendo, y detectas instantáneamente la presencia de Ilusiones visuales y Cambiaformas que estén dentro de tu línea de visión. Sin embargo, esto no te permite ver a través de ninguno de esos efectos.\n\nAdemás, cuando tu Foco falla su tirada de salvación contra Áspero y Violento, puedes renunciar a todos los efectos normales para hacer que en su lugar quede Aturdido hasta el comienzo de tu próximo turno.",
      n: 13
    },
    {
      nombre: "Investigador Maestro (Master Investigator)",
      t: "pasiva",
      texto: "Tu sentido para la verdad rivaliza con el de los inmortales. Obtienes Visión Verdadera a un radio de 30 pies. Dentro de este radio, detectas puertas ocultas y trampas, y eres consciente de si las criaturas están mintiendo.\n\nPor último, cuando impactas a tu Foco con un ataque o usas la Observación Potente contra tu Foco, puedes hacer que ese ataque o tirada se convierta en un éxito crítico automático. Una vez que lo hagas, debes terminar un descanso corto o largo antes de poder hacerlo de nuevo.",
      n: 18,
      usos: "1",
      reset: "corto"
    }
  ]
};

export const mentor = {
  n: 3,
  rasgos: [
    {
      nombre: "Estudiante de la Vida (Student of Life)",
      t: "pasiva",
      texto: "Obtienes competencia en Historia, Perspicacia, y un set de Herramientas de Artesano de tu elección, y sumas tu Dado de Intelecto a las pruebas con estas competencias. También puedes usar tu Inteligencia, en lugar de Sabiduría, para las pruebas de Perspicacia.\n\nTus experiencias vividas también te otorgan los siguientes beneficios:\n- Dominas la Búsqueda Erudita Instrucción. Si ya la has dominado, en su lugar dominas Estudio Rápido (Quick Study).\n- Siempre que saques un 1 en tu Dado de Intelecto, puedes volver a tirar el Dado, pero debes quedarte con el nuevo resultado.\n- Puedes usar la acción de Ayudar para asistir a otra criatura a 10 pies o menos de ti para que ataque a tu Foco.",
      n: 3
    },
    {
      nombre: "Consejo Astuto (Astute Advice)",
      t: "reaccion",
      texto: "Sabes exactamente qué decir para ayudar a otros a aprender de sus fracasos. Cuando otra criatura a 30 pies o menos que pueda oírte y entenderte falla una prueba de característica, tirada de ataque o tirada de salvación, puedes usar una reacción para que vuelva a tirar su d20.\n\nPuedes usar esta reacción una cantidad de veces igual a tu modificador por Inteligencia (mínimo de una vez). Recuperas un uso cuando terminas un descanso corto, y todos los usos después de un descanso largo.",
      n: 3,
      usos: "Modificador por Inteligencia",
      reset: "corto"
    },
    {
      nombre: "Comportamiento Plácido (Calm Demeanor)",
      t: "gratis",
      texto: "Eres capaz de mantener la compostura en el caos de la batalla. Si terminas tu turno sin infligir daño ni obligar a otra criatura a hacer una tirada de salvación, puedes ganar puntos de golpe temporales iguales a tu modificador por Inteligencia (mínimo de 1).",
      n: 7
    },
    {
      nombre: "Presencia Calmante (Soothing Presence)",
      t: "pasiva",
      texto: "Tu presencia calmante permite que otros se relajen verdaderamente. Las criaturas que completan un descanso corto contigo tienen ventaja en cualquier tirada de Dado de Golpe que hagan para recuperar puntos de golpe.",
      n: 7
    },
    {
      nombre: "Consejo Maravilloso (Wondrous Advice)",
      t: "pasiva",
      texto: "Tus astutas observaciones elevan a tus aliados a nuevas alturas. Cuando usas Consejo Astuto, puedes elegir que la criatura sume tu Dado de Intelecto al nuevo resultado de su tirada, o que gane puntos de golpe temporales iguales a tu Dado de Intelecto. Puedes elegir el beneficio después de ver su nueva tirada.\n\nAdemás, ahora recuperas todos los usos de Consejo Astuto cuando completas un descanso corto o largo, y cuando tiras iniciativa, recuperas un uso gastado de Consejo Astuto.",
      n: 13
    },
    {
      nombre: "Intuición Mística (Mystical Intuition)",
      t: "fuera",
      texto: "Tu experiencia de vida y extraordinaria intuición pueden darte percepciones místicas sobre el mundo que te rodea. Puedes pasar 1 minuto meditando sobre una pregunta que tengas, o una pregunta que otra criatura te haya hecho. Luego intuyes místicamente la respuesta a la pregunta como si hubieras lanzado el conjuro *comulgar*. Sin embargo, a diferencia de *comulgar*, solo puedes intuir una respuesta si esta es conocida por otro mortal.\n\nUna vez que obtienes la respuesta a una pregunta usando este rasgo, debes terminar un descanso largo antes de poder hacerlo de nuevo.",
      n: 13,
      usos: "1",
      reset: "largo"
    },
    {
      nombre: "Maestro Mentor (Master Mentor)",
      t: "pasiva",
      texto: "Tus consejos son legendarios y tu sola presencia ayuda a tus aliados a alcanzar su verdadero potencial. Las criaturas de tu elección, excluyéndote a ti, que puedan oírte a 15 pies o menos pueden sumar tu modificador por Inteligencia (mínimo de +1) a cualquier prueba de característica y tirada de salvación que hagan.\n\nFinalmente, cada vez que terminas un descanso corto o largo, ganas los beneficios de tu rasgo Intuición Mística.",
      n: 18
    }
  ]
};

export const naturalist = {
  n: 3,
  rasgos: [
    {
      nombre: "Estudiante de la Naturaleza (Student of Nature)",
      t: "pasiva",
      texto: "Obtienes competencia tanto en Trato con Animales como en Naturaleza, y puedes sumar tu Dado de Intelecto a tus pruebas con ambas habilidades. También puedes usar Inteligencia, en lugar de Sabiduría, para tus pruebas de Trato con Animales y Supervivencia.\n\nTu conocimiento de las tierras salvajes te permite marcar criaturas como tu Foco al estudiar rastros de su paso, como huellas o marcas, incluso cuando no puedes ver a la criatura.",
      n: 3
    },
    {
      nombre: "Diario de Naturalista (Naturalist's Journal)",
      t: "fuera",
      texto: "Recopilas tu investigación sobre la flora y fauna fantástica en un Diario de Naturalista. Durante el transcurso de un descanso corto o largo, puedes pasar 1 hora detallando tu Entorno actual, o una Bestia, Planta o Monstruosidad específica (como un Grifo o un Oso) que haya sido tu Foco en las últimas 24 horas. Obtienes estos beneficios contra las criaturas y Entornos en tu Diario:\n- Tienes ventaja en las pruebas de Inteligencia relacionadas.\n- Cuando realizas un ataque de arma contra un Foco detallado en tu Diario, puedes renunciar al daño adicional de tu Golpe Estudiado para sumar tu Dado de Intelecto a tu tirada de ataque.\n- En un Entorno detallado, tú y quienes viajen contigo pueden ignorar el terreno difícil no mágico, y no pueden perderse.",
      n: 3
    },
    {
      nombre: "Llamado de lo Salvaje (Call of the Wild)",
      t: "accion",
      texto: "Aprovechando eones de comprensión, puedes doblegar a las criaturas salvajes a tu voluntad. Como acción, puedes obligar a una criatura a 30 pies o menos que también esté detallada en tu Diario a hacer una tirada de salvación de Carisma. Las criaturas con un VD igual a la mitad de tu nivel de Erudito, o superior, tienen éxito automáticamente. Si falla, queda Hechizada por ti y utiliza las siguientes reglas durante la duración:\n\n**Control.** La criatura es Amistosa hacia ti y tus aliados. Como acción adicional, puedes emitir una orden verbal, que hará todo lo posible por obedecer en su próximo turno. Cuando no esté llevando a cabo una orden, se defenderá lo mejor que pueda.\n**Moral.** Si la criatura recibe daño, repite su tirada de salvación al comienzo de su próximo turno. Con un éxito, ya no está Hechizada. Si hace esta tirada de salvación, puedes usar una reacción para restar un Dado de Intelecto de su tirada, si puede oírte.\n**Duración.** Si la criatura no escapa antes, el efecto termina si caes Inconsciente, si la liberas con una orden, o si intentas usar este rasgo en otra criatura.\nUna vez que una criatura tiene éxito en cualquier tirada de salvación contra este rasgo, es inmune a sus efectos hasta que termine un descanso largo.",
      n: 7
    },
    {
      nombre: "Estudios Avanzados (Advanced Studies)",
      t: "pasiva",
      texto: "Tu conocimiento de la naturaleza no se detiene en lo mundano. Puedes detallar Dragones, Gigantes, Cienos y No Muertos en tu Diario. Tu Diario también otorga beneficios adicionales:\n- Obtienes los beneficios de Foco contra todas las criaturas detalladas.\n- Mientras estés en un Entorno detallado, tú y quienes viajen contigo ignoran el terreno difícil mágico y hacen tiradas de salvación para resistir los efectos ambientales con ventaja.",
      n: 13
    },
    {
      nombre: "Maestro Naturalista (Master Naturalist)",
      t: "pasiva",
      texto: "Tu conocimiento natural supera a todos los demás. Puedes detallar cualquier criatura que no sea Humanoide en tu Diario, y tienes ventaja en las tiradas de ataque contra todas las criaturas detalladas en tu Diario.\n\nFinalmente, el Llamado de lo Salvaje solo termina cuando liberas voluntariamente a la criatura, lo usas en otra criatura, o tú o la criatura Hechizada mueren.",
      n: 18
    }
  ]
};

export const physician = {
  n: 3,
  rasgos: [
    {
      nombre: "Estudiante de Medicina (Student of Medicine)",
      t: "pasiva",
      texto: "Obtienes competencia en Medicina y Juego de Manos, y sumas tu Dado de Intelecto a las pruebas con ambas habilidades. También puedes usar Inteligencia, en lugar de Sabiduría, para las pruebas de Medicina.\n\nTus estudios también te otorgan los siguientes beneficios:\n- Por cada minuto que pases examinando a tu Foco, puedes identificar una enfermedad, veneno o maldición que le esté afectando actualmente.\n- Cuando impactas a tu Foco con un ataque de arma, puedes renunciar al daño adicional del Golpe Estudiado para reducir su velocidad en 10 pies hasta el comienzo de tu próximo turno.\n- Durante el transcurso de 1 hora, que puede ser durante un descanso corto o largo, puedes trabajar en un Kit de Sanador para restaurar un número de sus usos gastados igual a tu modificador por Inteligencia (mínimo de 1).",
      n: 3
    },
    {
      nombre: "Médico de Combate (Combat Medic)",
      t: "accion",
      texto: "Has estudiado cómo administrar primeros auxilios en el campo de batalla. Obtienes las siguientes acciones de Médico de Combate, que solo puedes usar en otras criaturas. Cuando usas una acción de Médico de Combate, puedes gastar un uso de un Kit de Sanador para tratar cualquier Dado de Intelecto tirado como el resultado máximo posible:\n\n**Sacudida de Adrenalina (Adrenaline Jolt).** Tocas a una criatura que tiene una enfermedad, o que está Cegada, Hechizada, Sorda, Asustada o Envenenada, y puede repetir inmediatamente su tirada de salvación para terminar ese efecto con un bonificador igual a tu Dado de Intelecto.\n**Vendar Heridas (Dress Wounds).** Tocas a una criatura que esté por debajo de su máximo de puntos de golpe, y gana puntos de golpe temporales iguales a tu Dado de Intelecto. Estos puntos de golpe temporales no pueden exceder el número de puntos de golpe que le faltan a la criatura.\n**Oleada de Curación (Healing Surge).** Una criatura que tocas puede gastar inmediatamente uno de sus Dados de Golpe para recuperar puntos de golpe iguales a la tirada del Dado de Golpe + su modificador por Constitución + tu Dado de Intelecto. Si usas esta habilidad en una criatura viva con 0 puntos de golpe, se Estabiliza instantáneamente, incluso si no gasta un Dado de Golpe.",
      n: 3
    },
    {
      nombre: "Doctor de Campo (Field Doctor)",
      t: "adicional",
      texto: "Puedes navegar fácilmente por el caos de la batalla para administrar ayuda. Siempre que realices una acción de Médico de Combate, puedes usar tu acción adicional para Correr, Destrabarte, o hacer un ataque de arma.",
      n: 7
    },
    {
      nombre: "Manos Firmes (Steady Hands)",
      t: "pasiva",
      texto: "Tu confianza en tus capacidades médicas ha crecido. Puedes usar las acciones de Médico de Combate sobre ti mismo, siempre y cuando no estés Cegado, Incapacitado, Paralizado o Apresado.",
      n: 7
    },
    {
      nombre: "Experiencia Médica (Medical Expertise)",
      t: "accion",
      texto: "Tus técnicas llevan a los aliados a su límite físico. Cuando usas una acción de Médico de Combate, puedes potenciarla, otorgándole el bonificador correspondiente a continuación. Puedes hacerlo un número de veces igual a tu modificador por Inteligencia (mínimo de una vez), y recuperas todos los usos cuando terminas un descanso corto o largo:\n\n**Sacudida de Adrenalina.** Terminas instantáneamente una de estas condiciones: Cegado, Hechizado, Sordo, Asustado, Paralizado, Petrificado, Envenenado, Aturdido, un nivel de Agotamiento, una reducción a una puntuación de característica, o una reducción a sus puntos de golpe máximos.\n**Vendar Heridas.** Puedes reconectar una extremidad o dígito seccionado, u otorgar al objetivo puntos de golpe temporales iguales a la diferencia entre sus puntos de golpe actuales y máximos.\n**Oleada de Curación.** Puedes usar este rasgo en una criatura que haya muerto en el último minuto, y esta puede gastar un Dado de Golpe para volver a la vida con los puntos de golpe de tu Oleada de Curación. Este rasgo no puede restaurar partes del cuerpo faltantes, y no puede devolver a la vida a una criatura que muere de vejez.",
      n: 13,
      usos: "Modificador por Inteligencia",
      reset: "corto"
    },
    {
      nombre: "Médico Maestro (Master Physician)",
      t: "pasiva",
      texto: "Tu conocimiento de anatomía te permite realizar proezas médicas legendarias. Cuando una criatura que estás tocando gasta un Dado de Golpe para recuperar puntos de golpe, lo trata como si sacara la tirada máxima. Esto incluye cualquier Dado de Golpe gastado durante descansos cortos, y los Dados de Golpe gastados como parte de tu acción de Oleada de Curación.",
      n: 18
    }
  ]
};

export const tactician = {
  n: 3,
  rasgos: [
    {
      nombre: "Estudiante de Guerra (Student of War)",
      t: "pasiva",
      texto: "Obtienes competencia en Historia, Persuasión, y dos Sets de Juego de tu elección, y puedes sumar tu Dado de Intelecto a cualquier prueba de característica que hagas con estas competencias.\n\nTu estudio de la guerra también te otorga los siguientes beneficios:\n- Obtienes competencia en armaduras medias, escudos y todas las armas marciales que no tengan la propiedad Pesada.\n- Puedes usar tu Inteligencia, en lugar de Destreza, para calcular tu Clase de Armadura cuando llevas armadura ligera o media.\n- Puedes usar Observación Potente en tiradas de iniciativa.",
      n: 3
    },
    {
      nombre: "Comando Táctico (Tactical Command)",
      t: "pasiva",
      texto: "Puedes usar tu conocimiento de tácticas para dirigir a tus aliados en el campo de batalla. Aprendes a usar las siguientes Órdenes. Para emitir una Orden, realiza la acción de Atacar y renuncia a un ataque para emitir una Orden a otra criatura que pueda verte o escucharte a 30 pies o menos. Puedes renunciar a cualquier cantidad de ataques para emitir Órdenes:\n\n**Orden de Ataque.** Si esta criatura realiza la acción de Atacar antes del comienzo de tu próximo turno, hace un ataque adicional como parte de esa acción de Atacar.\n**Orden Defensiva.** La criatura obtiene los beneficios de la acción de Esquivar hasta el inicio de tu próximo turno.\n**Orden de Maniobra.** Como reacción, esta criatura puede moverse hasta su velocidad sin provocar ataques de oportunidad.\n**Orden de Apoyo.** Esta criatura puede realizar la acción de Ayudar, Esconderse, Buscar o Usar un Objeto.",
      n: 3
    },
    {
      nombre: "Tácticas Avanzadas (Advanced Tactics)",
      t: "pasiva",
      texto: "Tu estudio continuo del arte de la guerra te otorga conocimiento de las siguientes Órdenes adicionales, que utilizan las mismas reglas:\n\n**Orden Vigorizante (Enlivening Order).** En el próximo turno de la criatura, obtiene los beneficios de la acción de Correr, y tiene ventaja en las pruebas de Fuerza y Destreza.\n**Orden de Rejuvenecimiento (Rejuvenating Order).** La criatura puede repetir inmediatamente una tirada de salvación para terminar una condición que le esté afectando actualmente.",
      n: 7
    },
    {
      nombre: "Superioridad Estratégica (Strategic Superiority)",
      t: "adicional",
      texto: "Puedes atacar dos veces, en lugar de una, cada vez que realizas la acción de Atacar en tu turno. Además, si usas tu acción para Correr, Esquivar o Destrabarte, puedes hacer un único ataque o emitir una Orden como acción adicional en ese turno.",
      n: 7
    },
    {
      nombre: "Genio Táctico (Tactical Genius)",
      t: "gratis",
      texto: "Tu genialidad te permite controlar el flujo de cada batalla desde el inicio. Cuando tiras Iniciativa, puedes emitir una Orden antes de que cualquier criatura tenga la oportunidad de actuar.\n\nAdemás, cuando otra criatura que pueda escucharte ataca a tu Foco, puedes usar Observación Potente en su tirada de ataque. Puedes hacerlo después de que tire, pero antes de saber si su ataque impacta.",
      n: 13
    },
    {
      nombre: "Maestro Táctico (Master Tactician)",
      t: "pasiva",
      texto: "Tus palabras inspiran heroísmo en tus aliados. Cada vez que emites una Orden a una criatura, puedes otorgarle puntos de golpe temporales iguales a tu modificador por Inteligencia (mínimo de 1).\n\nFinalmente, aprendes las siguientes Órdenes legendarias. Estas Órdenes solo pueden emitirse una vez cada una por descanso corto o largo:\n\n**Orden Heroica.** Hasta el comienzo de tu próximo turno, la criatura tiene Resistencia a todo el daño, y tiene ventaja en todas las pruebas de característica, tiradas de ataque y tiradas de salvación.\n**Orden Revitalizante.** Emites esta Orden a una criatura que murió en el último minuto. Se levanta inmediatamente y recupera puntos de golpe iguales a tu nivel + tu modificador por Inteligencia. Esta Orden no puede revivir a criaturas que mueran por vejez.",
      n: 18
    }
  ]
};

```

=== B ===

```json
{
  "tabla_clase": {
    "1": { "pb": 2, "rasgos": ["Adroit Analysis", "Analytical Defense"], "intellect_die": "d4" },
    "2": { "pb": 2, "rasgos": ["Potent Observation", "Scholarly Pursuits"], "intellect_die": "d4" },
    "3": { "pb": 2, "rasgos": ["Academic Discipline"], "intellect_die": "d4" },
    "4": { "pb": 2, "rasgos": ["Ability Score Improvement"], "intellect_die": "d4" },
    "5": { "pb": 3, "rasgos": ["Calculated Flourish", "Swift Reflexes (2)"], "intellect_die": "d6" },
    "6": { "pb": 3, "rasgos": ["Sharp Mind"], "intellect_die": "d6" },
    "7": { "pb": 3, "rasgos": ["Discipline Feature"], "intellect_die": "d6" },
    "8": { "pb": 3, "rasgos": ["Ability Score Improvement"], "intellect_die": "d6" },
    "9": { "pb": 4, "rasgos": ["Keen Awareness"], "intellect_die": "d8" },
    "10": { "pb": 4, "rasgos": ["Unrivaled Genius"], "intellect_die": "d8" },
    "11": { "pb": 4, "rasgos": ["Swift Reflexes (3)"], "intellect_die": "d8" },
    "12": { "pb": 4, "rasgos": ["Ability Score Improvement"], "intellect_die": "d8" },
    "13": { "pb": 5, "rasgos": ["Discipline Feature"], "intellect_die": "d10" },
    "14": { "pb": 5, "rasgos": ["Unyielding Will"], "intellect_die": "d10" },
    "15": { "pb": 5, "rasgos": ["Flawless Analysis"], "intellect_die": "d10" },
    "16": { "pb": 5, "rasgos": ["Ability Score Improvement"], "intellect_die": "d10" },
    "17": { "pb": 6, "rasgos": ["Swift Reflexes (4)"], "intellect_die": "d12" },
    "18": { "pb": 6, "rasgos": ["Discipline Feature"], "intellect_die": "d12" },
    "19": { "pb": 6, "rasgos": ["Ability Score Improvement"], "intellect_die": "d12" },
    "20": { "pb": 6, "rasgos": ["Incomparable Intellect"], "intellect_die": "d12" }
  },
  "calculos": {
    "intellect_save_dc": "8 + pb + int",
    "intellect_die": {
      "1": "d4", "5": "d6", "9": "d8", "13": "d10", "17": "d12"
    },
    "swift_reflexes_uses": {
      "5": 2, "11": 3, "17": 4
    }
  },
  "listas_eleccion": {
    "savant_pursuits": [
      "instruction",
      "perfect-recall",
      "quick-study",
      "astrology",
      "falconry",
      "linguistics",
      "physical-fitness",
      "riddles",
      "secrets-and-whispers",
      "theology",
      "traditions"
    ]
  }
}
```

=== C ===

```json
{
  "savant": "Savant v5.6.1 (LaserLlama)",
  "archaeologist": "Savant v5.6.1 (LaserLlama)",
  "investigator": "Savant v5.6.1 (LaserLlama)",
  "mentor": "Savant v5.6.1 (LaserLlama)",
  "naturalist": "Savant v5.6.1 (LaserLlama)",
  "physician": "Savant v5.6.1 (LaserLlama)",
  "tactician": "Savant v5.6.1 (LaserLlama)"
}
```

=== D ===

```json
{
  "savant": "Intelectuales aventureros conocidos como Eruditos. Armados solo con su ingenio, ayudan a sus aliados y superan tácticamente a sus enemigos en busca de descubrimientos.",
  "archaeologist": "Especialista en el estudio de civilizaciones perdidas, ruinas antiguas y tierras inexploradas, sacando a la luz la sabiduría de eras pasadas y desbloqueando sus tecnologías.",
  "investigator": "Maestro en desentrañar misterios, conspiraciones y secretos, posees una extraña habilidad para leer las intenciones de los demás y luchar en los bajos fondos.",
  "mentor": "Un individuo experimentado, como el sabio del pueblo o un aventurero retirado, dispuesto a guiar a quienes lo rodean con sabiduría y presencia tranquilizadora.",
  "naturalist": "Erudito de lo salvaje que domina tanto la conservación como la predicción de la naturaleza, capaz de guiar de forma segura y doblegar las bestias a su voluntad.",
  "physician": "Utilizas tu intelecto y conocimientos de anatomía para curar a los enfermos y atender a los heridos sin la necesidad del lujo de la magia divina.",
  "tactician": "Un astuto líder y estratega que permanece un paso adelante de sus enemigos, dirigiendo a sus aliados para convertirlos en una fuerza de combate formidable."
}
```

=== E ===

```text
- He traducido "Intellect Die" como "Dado de Intelecto" y "Focus" como "Foco".
- He traducido "Curio" en la subclase Archaeologist como "Curiosidad".
- La Búsqueda Erudita "Falconry" invoca al bloque de estadísticas del Halcón (Hawk), por lo cual lo adapté para que concuerde con D&D 2024.
- Se ha estructurado bajo un solo JSON con exportables para facilitar su inserción por el script del revisor.