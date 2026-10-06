=== A ===
```typescript
export const savantPursuitsExpanded = {
  "bushcraft": "Prerrequisitos: Erudito (Savant) de nivel 4.\nPuedes usar tu conocimiento de la naturaleza para prosperar en la naturaleza salvaje. Obtienes competencia en Naturaleza, y sumas tu Dado de Intelecto a cualquier prueba de Naturaleza que hagas.\nDurante el transcurso de 10 minutos, que puede ser durante un descanso corto o largo, puedes reunir materiales naturales y usar una daga o hacha de mano para crear uno de los siguientes objetos: un garrote, 1d4 dardos, una jabalina, una red, 10 pies de cuerda, o una Trampa de Supervivencia (Bushcraft Snare).\nComo acción, puedes colocar una Trampa de Supervivencia en un espacio adyacente desocupado de 5 pies. La primera criatura Grande o menor que se mueva a este espacio debe hacer una tirada de salvación de Destreza contra tu CD de salvación de Intelecto o quedar Apresada por la Trampa. Como acción, una criatura puede hacer una prueba de Fuerza contra tu CD de salvación de Intelecto, escapando de la Trampa si tiene éxito. Cuando la criatura escapa, la Trampa se destruye.",
  "deduction": "Prerrequisitos: Erudito (Savant) de nivel 4.\nEres capaz de juntar piezas de información aparentemente inconexas para descubrir verdades y misterios ocultos. Obtienes competencia en Investigación, y sumas tu Dado de Intelecto a cualquier prueba de Investigación que hagas.\nCuando designas a una criatura como tu Foco, se mantiene así hasta que elijas terminarlo o designes otro Foco. Una vez entre cada descanso largo, puedes reflexionar sobre una Corazonada (Hunch) que tengas sobre tu Foco y hacerle al DM una pregunta al respecto que pueda responderse con un \"sí\", \"no\" o \"no está claro\".",
  "equestrianism": "Prerrequisitos: Erudito (Savant) de nivel 4.\nHas aprendido a cuidar caballos y otras monturas entrenadas. Obtienes competencia en Trato con Animales, y sumas tu Dado de Intelecto a cualquier prueba de Trato con Animales que hagas.\nCuando cabalgas una montura entrenada, obtienes ciertos beneficios:\n- En combate, tu montura actúa durante tu turno.\n- Cuando tu montura hace una prueba de característica, tirada de daño o tirada de salvación, puede sumar tu Dado de Intelecto a su tirada.\n- Como acción adicional, puedes ordenar a tu montura que ataque, o que use otra acción de su bloque de estadísticas.\nFinalmente, si pasas 8 horas entrenando a una criatura cuadrúpeda amistosa y gastas 50 piezas de oro en materiales de entrenamiento y comida necesarios, se considera una montura entrenada para ti.",
  "first-aid": "Prerrequisitos: Erudito (Savant) de nivel 4.\nHas estudiado técnicas medicinales básicas para ayudar a los aliados. Obtienes competencia en Medicina, y sumas tu Dado de Intelecto a cualquier prueba de Medicina que hagas.\nDurante un descanso largo, puedes pasar 1 hora usando un Kit de Sanador para producir una cantidad de *pociones de curación* igual a tu modificador por Inteligencia (mínimo de 1). Estas *pociones de curación* se vuelven inútiles después de 24 horas.",
  "marksmanship": "Prerrequisitos: Erudito (Savant) de nivel 4.\nAplicas tu intelecto en el uso de armas a distancia. Obtienes competencia en Juego de Manos, y sumas tu Dado de Intelecto a cualquier prueba de Juego de Manos que hagas.\nTambién obtienes competencia con todas las armas marciales a distancia, y siempre que hagas un ataque con arma a distancia, puedes usar tu Dado de Intelecto en lugar del dado de daño del arma.\nFinalmente, si tu ambientación incluye armas de fuego, y tu Erudito (Savant) ha estado expuesto al funcionamiento interno de tales dispositivos, se le considera competente con armas de fuego simples y marciales.",
  "mercantilism": "Prerrequisitos: Erudito (Savant) de nivel 4.\nEres un astuto estudioso de la economía, las rutas comerciales y el mercado. Obtienes competencia en Perspicacia, y sumas tu Dado de Intelecto a cualquier prueba de Perspicacia que hagas.\nAdemás, mientras comercias con una criatura cuya Inteligencia y Sabiduría sean ambas menores que tu puntuación de Inteligencia, todos los objetos que le compres cuestan un 10 por ciento menos, y cualquier objeto que vendas se compra por un 10 por ciento más de lo habitual.",
  "musicianship": "Prerrequisitos: Erudito (Savant) de nivel 4.\nTienes talento para la música y el canto. Obtienes competencia en Interpretación y con un Instrumento Musical, y sumas tu Dado de Intelecto a cualquier prueba que hagas con estas habilidades.\nAdemás, cuando tocas un Instrumento Musical o actúas para una criatura durante 1 minuto o más, tienes ventaja en cualquier prueba de característica que hagas para interactuar socialmente con esa criatura durante 1 hora. Este beneficio termina al instante si tú o tus aliados hacen algo dañino a la criatura o a sus aliados.",
  "polymath": "Prerrequisitos: Erudito (Savant) de nivel 4.\nTienes facilidad para adquirir nuevas habilidades, aunque puede que no seas un maestro de todas ellas. Elige dos de tus competencias de habilidades o herramientas. Puedes sumar tu Dado de Intelecto a cualquier prueba que hagas con esas competencias."
};

export const culinarianRecipes = {
  "invigorating-morsel": "Requisito: Muestra de cualquier Bestia sin velocidad de vuelo o nado.\nLa criatura que se come este Bocado Vigorizante (Invigorating Morsel) recupera puntos de golpe iguales a tu Dado de Intelecto + tu modificador por Inteligencia.",
  "limbering-morsel": "Requisito: Muestra de cualquier Bestia con velocidad de vuelo.\nDurante 1 hora, la criatura gana un bonificador a sus tiradas de iniciativa igual a tu modificador por Inteligencia (mínimo de +1), y su velocidad al caminar aumenta en 10 pies al consumir este Bocado Ágil (Limbering Morsel).",
  "monstrous-morsel": "Requisito: Muestra de cualquier Monstruosidad de VD 1 o superior.\nDurante 1 hora, la criatura obtiene el beneficio \"Cambiar apariencia\" o \"Armas naturales\" del conjuro *alterar el propio aspecto (alter self)* tras comer este Bocado Monstruoso (Monstrous Morsel).",
  "subterranean-morsel": "Requisito: Muestra de cualquier Bestia con velocidad de excavación.\nDurante 1 hora, la criatura obtiene Visión en la Oscuridad a un radio de 60 pies. Si una criatura ya tiene Visión en la Oscuridad, su radio crece 30 pies al consumir este Bocado Subterráneo (Subterranean Morsel).",
  "thalassic-morsel": "Requisito: Muestra de cualquier Bestia con velocidad de nado.\nDurante 1 hora, la criatura obtiene una velocidad de nado igual a su velocidad al caminar, y puede contener la respiración hasta por 10 minutos al comer este Bocado Talásico (Thalassic Morsel).",
  "verdant-morsel": "Prerrequisito: Erudito de nivel 7. Requisito: Muestra de cualquier Planta de VD 1 o superior.\nLa criatura se cura instantáneamente de las siguientes condiciones: Cegado, Sordo, Paralizado, Petrificado, Envenenado, una reducción a una puntuación de característica, o una reducción a su máximo de puntos de golpe al consumir este Bocado Verdoso (Verdant Morsel).",
  "viscous-morsel": "Prerrequisito: Erudito de nivel 7. Requisito: Muestra de cualquier Cieno de VD 1 o superior.\nDurante 1 hora, cuando la criatura recibe daño por Ácido, Cortante, Relámpago o Veneno, puede reducir el daño en una cantidad igual a tu modificador por Inteligencia (mínimo de 1 de daño) tras comer este Bocado Viscoso (Viscous Morsel).",
  "draconic-morsel": "Prerrequisito: Erudito de nivel 7. Requisito: Muestra de cualquier Dragón de VD 1 o superior.\nDurante 1 hora, la criatura obtiene Resistencia al tipo de daño infligido por el ataque de arma de aliento del dragón de la Muestra. Puedes crear una Receta única en tu Libro de Cocina por cada tipo diferente de Dragón del que hayas recolectado una Muestra para este Bocado Dracónico (Draconic Morsel).",
  "psionic-morsel": "Prerrequisito: Erudito de nivel 7. Requisito: Muestra de cualquier Aberración de VD 1 o superior.\nDurante 1 hora, la criatura puede comunicarse telepáticamente con cualquier criatura a 30 pies o menos. Sin embargo, para responder, una criatura debe poder hablar al menos un idioma. Todo gracias a este Bocado Psiónico (Psionic Morsel).",
  "titanic-morsel": "Prerrequisito: Erudito de nivel 7. Requisito: Muestra de cualquier Gigante de VD 1 o superior.\nDurante 1 hora, la criatura crece en tamaño hasta alcanzar el tamaño del gigante de la Muestra al comer este Bocado Titánico (Titanic Morsel). Mientras está agrandada, debe concentrarse en este efecto como si se concentrara en un conjuro. Además, la criatura obtiene un bonificador a sus pruebas de característica y tiradas de salvación que usan su Fuerza igual a tu modificador por Inteligencia. Puedes crear una Receta única en tu Libro de Cocina por cada tipo diferente de Gigante del que hayas recolectado una Muestra.",
  "aerial-morsel": "Prerrequisito: Erudito de nivel 13. Requisito: Muestra de cualquier Elemental de Aire de VD 1 o superior.\nDurante 1 hora, la criatura puede usar la acción de Correr como acción adicional en cada turno, y puede contener la respiración indefinidamente tras comer este Bocado Aéreo (Aerial Morsel).",
  "aqueous-morsel": "Prerrequisito: Erudito de nivel 13. Requisito: Muestra de cualquier Elemental de Agua de VD 1 o superior.\nDurante 1 hora, la criatura puede respirar tanto aire como agua, obtiene una velocidad de nado igual a su velocidad al caminar, y puede usar su reacción para convertir un impacto crítico en un impacto normal al consumir este Bocado Acuoso (Aqueous Morsel).",
  "ignan-morsel": "Prerrequisito: Erudito de nivel 13. Requisito: Muestra de cualquier Elemental de Fuego de VD 1 o superior.\nDurante 1 hora, la criatura obtiene Resistencia al daño por Fuego e Inmunidad a las condiciones de Hechizado y Asustado tras comer este Bocado Ígneo (Ignan Morsel).",
  "terran-morsel": "Prerrequisito: Erudito de nivel 13. Requisito: Muestra de cualquier Elemental de Tierra de VD 1 o superior.\nDurante 1 hora, la criatura obtiene Sentido Sísmico a un radio de 15 pies, y obtiene Resistencia al daño Contundente, Cortante y Perforante no mágico al consumir este Bocado Terráqueo (Terran Morsel).",
  "celestial-morsel": "Prerrequisito: Erudito de nivel 18. Requisito: Muestra de cualquier Celestial de VD 1 o superior.\nDurante 1 hora, la criatura manifiesta un par de alas angelicales etéreas que le otorgan una velocidad de vuelo igual a su velocidad al caminar al comer este Bocado Celestial (Celestial Morsel).",
  "infernal-morsel": "Prerrequisito: Erudito de nivel 18. Requisito: Muestra de cualquier Infernal de VD 1 o superior.\nDurante 1 hora, la criatura tiene ventaja en cualquier tirada de salvación que se vea obligada a hacer para resistir un conjuro y otros efectos mágicos tras consumir este Bocado Infernal (Infernal Morsel).",
  "sylvan-morsel": "Prerrequisito: Erudito de nivel 18. Requisito: Muestra de cualquier Feérico de VD 1 o superior.\nDurante 1 hora, la criatura puede usar una acción adicional en cada turno para teletransportarse hasta 30 pies a un espacio desocupado que pueda ver gracias a este Bocado Silvano (Sylvan Morsel)."
};

export const runeScribeRunes = {
  "rune-of-enchantment": "Objeto: un brazalete, diadema, collar o anillo.\nLas criaturas tratan al portador de la Runa de Encantamiento (Rune of Enchantment) una etapa más amistosa de lo normal. Por ejemplo, criaturas Indiferentes lo tratan como Amistoso, o criaturas Hostiles lo tratan de manera Indiferente. Esto termina instantáneamente si el portador ataca a la criatura.\n**Invocar esta Runa (Acción).** Puede lanzar el conjuro *calmar emociones*, *hechizar persona* u *orden*, contra un número de criaturas igual al modificador por Inteligencia del Escriba de Runas.",
  "rune-of-evocation": "Objeto: un arma cuerpo a cuerpo simple o marcial.\nAl inscribir la Runa de Evocación (Rune of Evocation), elige daño por Ácido, Frío, Fuego, Relámpago o Veneno. Esta arma inflige daño adicional del tipo elegido igual a tu Dado de Intelecto al impactar.\n**Invocar esta Runa (Pasiva).** Cuando el portador inflige daño con esta arma, causa que el ataque inflija daño adicional del tipo de daño imbuido igual a tres Dados de Intelecto.",
  "rune-of-illusion": "Objeto: una capa, túnica o armadura.\nComo acción, el portador de la Runa de Ilusión (Rune of Illusion) puede cambiar su apariencia física a la de una criatura que haya visto antes, siempre que tenga la misma disposición de extremidades. El portador puede determinar los detalles, incluyendo raza, coloración, longitud del cabello, sexo, altura y peso, pero no puede cambiar su tamaño. Esta ilusión no afecta a la ropa, el equipo o las estadísticas de juego. La ilusión puede ser detectada con una prueba exitosa de Inteligencia (Investigación) contra la CD de salvación de Intelecto del Escriba de Runas.\n**Invocar esta Runa (Acción).** El portador se vuelve invisible por 10 minutos, o hasta que ataque o fuerce una tirada de salvación.",
  "rune-of-necromancy": "Objeto: un cinturón, anillo o armadura.\nComo acción adicional, el portador de la Runa de Nigromancia (Rune of Necromancy) puede otorgarse puntos de golpe temporales iguales al modificador por Inteligencia del Escriba de Runas.\n**Invocar esta Runa (Pasiva).** Cuando el portador se reduce a 0 puntos de golpe, pero no muere en el acto, cae a 1 punto de golpe en su lugar.",
  "rune-of-abjuration": "Prerrequisito: Erudito de nivel 7. Objeto: una capa, túnica, escudo o armadura.\nUna vez por turno, el portador de la Runa de Abjuración (Rune of Abjuration) puede reducir el daño de un conjuro o efecto mágico por una cantidad igual al modificador por Inteligencia del Escriba de Runas.\n**Invocar esta Runa (Reacción).** Cuando una criatura a 30 pies o menos del portador lanza un conjuro, el portador puede usar una reacción para forzar al conjurador a hacer una tirada de salvación de Constitución. Si falla, el conjuro desencadenante falla y no tiene efecto.",
  "rune-of-conjuration": "Prerrequisito: Erudito de nivel 7. Objeto: un cinturón, capa, anillo o armadura.\nComo acción, el portador de la Runa de Conjuración (Rune of Conjuration) gasta cualquier cantidad de su velocidad de movimiento restante para teletransportarse instantáneamente a un espacio desocupado que pueda ver dentro de esa distancia.\n**Invocar esta Runa (Acción).** El portador puede forzar a dos criaturas que pueda ver a 60 pies o menos a hacer una tirada de salvación de Carisma. Pueden elegir fallar. Si ambas fallan, intercambian lugares.",
  "rune-of-divination": "Prerrequisito: Erudito de nivel 13. Objeto: una varita, bastón, túnica o foco de conjuros.\nEl portador de la Runa de Adivinación (Rune of Divination) puede usar el objeto como un Foco de Conjuros para lanzar los conjuros *comprender idiomas*, *detectar magia* e *identificar* como Rituales, sin los componentes materiales normales.\n**Invocar esta Runa (Acción).** El portador potencia su visión durante 1 hora, obteniendo Visión Verdadera a un radio de 120 pies.",
  "rune-of-transmutation": "Prerrequisito: Erudito de nivel 13. Objeto: un brazalete, diadema, anillo o collar.\nEl portador de la Runa de Transmutación (Rune of Transmutation) obtiene su elección de una velocidad de nado de 30 pies, una velocidad de escalada de 30 pies, o que su velocidad al caminar aumente en 10 pies. Como acción adicional, el portador puede cambiar su beneficio actual por otro de la lista anterior.\n**Invocar esta Runa (Acción).** El portador se transforma en una Bestia con un VD igual o inferior al nivel del Escriba de Runas, pero utilizando de lo contrario las reglas del conjuro *polimorfar (polymorph)*. Sin embargo, esta transformación no requiere concentración."
};

export const aristocrat = {
  n: 3,
  rasgos: [
    {
      nombre: "Estudiante de la Alta Sociedad (Student of High Society)",
      t: "pasiva",
      texto: "Obtienes competencia en Historia, Persuasión, y en un set de Herramientas de Artesano de tu elección. Puedes sumar tu Dado de Intelecto a todas las pruebas que hagas con estas competencias.\n\nTu educación de élite también te otorga una de estas Búsquedas Eruditas (Scholarly Pursuits), aunque aún no cumplas sus prerrequisitos: Equitación, Lingüística, Mercantilismo o Tradiciones.",
      n: 3
    },
    {
      nombre: "Riqueza Heredada (Inherited Wealth)",
      t: "pasiva",
      texto: "El nombre de tu familia tiene una gran fortuna asociada, y a medida que aumentas en estatura e influencia, eres capaz de recurrir a sus grandes arcas. Obtienes 300 piezas de oro. Este es un beneficio que ocurre una sola vez, y debes retirarlo de un banco o institución similar en un asentamiento de tamaño adecuado, según determine el DM.\n\nCada vez que ganas un nivel de Erudito (Savant), obtienes una suma adicional de oro por única vez, que debe retirarse de la misma manera, igual a 100 veces tu nivel actual en esta clase.",
      n: 3
    },
    {
      nombre: "Mantener la Reputación (Uphold Reputation)",
      t: "pasiva",
      texto: "Tu apellido viene con ciertas expectativas que no debes dejar de cumplir. Cuando fallas en una tirada de ataque, prueba de característica o tirada de salvación, puedes elegir sumar tu Dado de Intelecto a tu resultado, posiblemente cambiando el desenlace.\n\nPuedes usar este rasgo una cantidad de veces igual a tu modificador por Inteligencia (mínimo de una vez). Recuperas un uso cuando terminas un descanso corto, y todos los usos después de un descanso largo.",
      n: 3,
      usos: "Modificador por Inteligencia",
      reset: "corto"
    },
    {
      nombre: "Aversión a la Violencia (Aversion to Violence)",
      t: "reaccion",
      texto: "Tu verdadero valor reside en tus conexiones y riqueza, no en tu habilidad para recibir un golpe. Cuando una criatura que puedes ver te elige como objetivo de un ataque o conjuro, puedes usar una reacción para cambiar de lugar inmediatamente con una criatura consciente y dispuesta a 5 pies o menos. Se convierte en el objetivo del ataque o conjuro en tu lugar.\n\nAl usar esta reacción, puedes elegir otorgar a la criatura con la que intercambias lugares un número de puntos de golpe temporales igual a tu Dado de Intelecto.\n\nPuedes otorgar los puntos de golpe temporales una cantidad de veces igual a tu modificador por Inteligencia (un mínimo de una vez), y recuperas todos los usos cuando terminas un descanso corto o largo.",
      n: 7,
      usos: "Modificador por Inteligencia",
      reset: "corto"
    },
    {
      nombre: "Bien Conectado (Well Connected)",
      t: "fuera",
      texto: "Puedes aprovechar la reputación generacional, conexiones y finanzas de tu apellido para organizar favores poderosos. Mientras estés en un asentamiento, puedes pasar 1 hora arreglando un favor así. El alcance de tal favor no puede exceder los efectos de un conjuro de nivel 7, y el valor en oro de este favor no puede exceder las 500 veces tu nivel de Erudito.\n\nPor ejemplo, podrías asegurar un componente material raro para un conjuro, el servicio de una compañía de mercenarios de élite, acceso a una biblioteca prohibida, o la lealtad del sirviente de tu enemigo.\n\nUna vez que organices un favor de este tipo, no puedes hacerlo de nuevo hasta que termines un descanso largo. Sin embargo, no puedes organizar un favor en ese mismo asentamiento hasta que hayan pasado 1d4 días.",
      n: 13,
      usos: "1",
      reset: "largo"
    },
    {
      nombre: "Casa Ascendente (Ascendant House)",
      t: "pasiva",
      texto: "Tu reputación supera la de reyes y emperadores. Todos los que escuchan tus palabras deben obedecer. Puedes usar tu Aversión a la Violencia para cambiar lugares con una criatura consciente y dispuesta a 15 pies o menos de ti, o con una criatura consciente que no esté dispuesta a 5 pies o menos. Las criaturas que no estén dispuestas deben hacer una tirada de salvación de Sabiduría para resistir el efecto. No puedes tener como objetivo a tu atacante.\n\nFinalmente, recuperas todos los usos gastados de Mantener la Reputación (Uphold Reputation) cada vez que terminas un descanso corto o largo.",
      n: 18
    }
  ]
};

export const culinarian = {
  n: 3,
  rasgos: [
    {
      nombre: "Estudiante del Sabor (Student of Flavor)",
      t: "pasiva",
      texto: "Obtienes competencia en Naturaleza, Juego de Manos y Utensilios de Cocinero, y puedes sumar tu Dado de Intelecto a todas las pruebas que hagas con estas competencias.\n\nTu entrenamiento culinario y paladar avanzado también te otorgan los siguientes beneficios:\n- Siempre que tengas acceso a Utensilios de Cocinero e ingredientes comestibles, cualquier criatura que gaste un Dado de Golpe para recuperar puntos de golpe durante un descanso corto contigo también recupera puntos de golpe adicionales iguales a tu Dado de Intelecto.\n- Los Utensilios de Cocinero cuentan como armas cuerpo a cuerpo simples con la propiedad Sutil para ti. Al impactar, infligen daño Contundente, Perforante o Cortante (dependiendo del utensilio) igual a tu Dado de Intelecto.\n- Durante el transcurso de 1 minuto, puedes usar Utensilios de Cocinero para determinar si la comida o bebida ha sido envenenada o alterada de alguna manera, incluso mediante magia, como por el conjuro *detectar veneno y enfermedad*. No necesitas probarlo para hacerlo.",
      n: 3
    },
    {
      nombre: "Libro de Cocina del Culinario (Culinarian's Cook Book)",
      t: "fuera",
      texto: "Estás recopilando un Libro de Cocina que contiene las Recetas exóticas que descubres en tus aventuras:\n\n**Recetas Conocidas.** Conoces dos Recetas de tu elección de la lista.\n**Añadir una Receta.** Como acción, puedes usar tus Utensilios de Cocinero para recolectar una Muestra de una criatura que haya muerto en el último minuto. Antes del final de tu próximo descanso largo, debes pasar 1 hora (que puede ser durante un descanso), usando los Utensilios de Cocinero y esa Muestra para experimentar, añadiendo la Receta que corresponde al tipo de criatura de la Muestra a tu Libro de Cocina.\n**Preparar un Bocado (Morsel).** Al final de cada descanso corto o largo, puedes usar tus Utensilios de Cocinero para preparar un número de Bocados igual a tu modificador por Inteligencia. Cada Bocado que preparas tiene las propiedades de una Receta de tu elección de tu Libro de Cocina. No necesitas Muestras de una criatura correspondiente a una Receta para preparar un Bocado con esa Receta. Los Bocados que prepares pierden su potencia al final del siguiente descanso corto o largo, ya que se vuelven incomibles e insípidos.\n**Servir Bocados.** Como acción, cualquier criatura puede comerse un Bocado, o dárselo de comer a una criatura dispuesta a su alcance. Una criatura que coma un Bocado obtiene los beneficios detallados en la descripción de la Receta. Una criatura solo puede beneficiarse de un Bocado a la vez, y comer otro Bocado termina instantáneamente los beneficios de cualquier Bocado anterior.\n**Reemplazar un Libro de Cocina.** Si tu Libro de Cocina se pierde o se destruye, puedes pasar 1 hora añadiendo cada una de tus antiguas Recetas a un nuevo Libro de Cocina de memoria. No necesitas redescubrir ninguna Receta perdida.",
      n: 3
    },
    {
      nombre: "Un Corte Superior (Cut Above)",
      t: "accion",
      texto: "Como acción, puedes tocar uno de tus Bocados con tus Utensilios de Cocinero y cambiarlo a un Bocado de otra Receta.\n\nAdemás, cuando uses tu acción para comer o dar de comer un Bocado a una criatura, puedes realizar un ataque de arma como acción adicional.",
      n: 7
    },
    {
      nombre: "Recetas Mejoradas (Improved Recipes)",
      t: "pasiva",
      texto: "Tus Recetas vigorizan a tus aliados junto con sus beneficios normales. Una criatura que coma uno de tus Bocados también obtiene puntos de golpe temporales iguales a tu nivel de Erudito (Savant).",
      n: 13
    },
    {
      nombre: "Maestro Culinario (Master Culinarian)",
      t: "fuera",
      texto: "Eres un maestro chef de monstruos y puedes cocinar con cualquier cosa, en cualquier lugar. Durante el transcurso de 1 hora, que puede ser durante un descanso corto o largo, puedes usar Utensilios de Cocinero y cualquier alimento para preparar un festín maravilloso para alimentarte a ti mismo y a un número de otras criaturas igual a tu nivel de Erudito.\n\nSi una criatura pasa 10 minutos comiendo su comida, se cura instantáneamente de cualquier veneno, enfermedad o cualquier otra condición hostil que le afecte, y durante 24 horas es inmune tanto a las condiciones de Asustado como Envenenado, y suma tu Dado de Intelecto a cualquier prueba de característica o tirada de salvación que haga usando su Sabiduría o Constitución.",
      n: 18
    }
  ]
};

export const orator = {
  n: 3,
  rasgos: [
    {
      nombre: "Estudiante de la Lógica (Student of Logic)",
      t: "pasiva",
      texto: "Obtienes competencia tanto en Engaño como en Persuasión, y sumas tu Dado de Intelecto a las pruebas con ambas habilidades. También puedes usar Inteligencia, en lugar de Carisma, para tus pruebas de Engaño y Persuasión.\n\nTu dominio sobre las palabras te otorga los siguientes beneficios:\n- Dominas a tu elección la Búsqueda Erudita de Instrucción, Acertijos o Tradiciones, incluso si no cumples con el prerrequisito de nivel normal para esa Búsqueda.\n- Aprendes a hablar, leer y escribir una cantidad de idiomas extra igual a tu modificador por Inteligencia.\n- Siempre que hables un idioma, suenas como si fueras un hablante nativo de dicho idioma.",
      n: 3
    },
    {
      nombre: "Superioridad Retórica (Rhetorical Superiority)",
      t: "pasiva",
      texto: "Tu dominio de varios idiomas te permite inspirar, dominar y hechizar con palabras. Obtienes las siguientes habilidades retóricas, que pueden afectar a cualquier criatura, siempre que el objetivo pueda escucharte y entenderte:\n\n**Conversación Convincente (Fuera de combate).** Si pasas al menos 1 minuto hablando con una criatura que no es Hostil hacia ti, puedes obligarla a que sin saberlo haga una tirada de salvación de Sabiduría. Si falla, queda Hechizada por ti durante 1 hora, o hasta que tú o tus aliados le hagan algo dañino a ella o a cualquiera de sus aliados. Solo puedes tener a una criatura Hechizada por este rasgo. Hechizar a otro objetivo termina este efecto para todos los demás.\n**Réplica Cortante (Reacción).** Cuando una criatura que puedas ver a 30 pies o menos realice un ataque, puedes usar tu reacción para distraerla con un comentario cortante. Debe superar una tirada de salvación de Sabiduría o restar tu Dado de Intelecto de su tirada de ataque. Una vez que una criatura tiene éxito en esta tirada de salvación de Sabiduría, es inmune a los efectos de este rasgo durante 24 horas.\n**Palabra Vigorizante (Reacción).** Inmediatamente después de que otra criatura que puedas ver a 30 pies o menos reciba daño, puedes usar tu reacción para otorgarle puntos de golpe temporales iguales a tu Dado de Intelecto.\n**Comentario Alentador (Reacción).** Cuando otra criatura que puedas ver a 30 pies o menos falle una tirada de salvación de Inteligencia, Sabiduría o Carisma, puedes usar una reacción para permitirle tirar de nuevo.",
      n: 3
    },
    {
      nombre: "Lógica de Hierro (Iron Logic)",
      t: "pasiva",
      texto: "Tu dominio magistral de la lógica te permite resistir todos excepto los efectos más fuertes que alteran la mente. Tienes ventaja en cualquier tirada de salvación que te veas obligado a hacer para resistir conjuros de Encantamiento, y eres inmune a la condición de Hechizado.\n\nAdemás, cuando usas tu reacción de Réplica Cortante, el objetivo recibe daño Psíquico igual a tu Dado de Intelecto.",
      n: 7
    },
    {
      nombre: "Retórica Inigualable (Peerless Rhetoric)",
      t: "fuera",
      texto: "Puedes doblegar a las masas a tu voluntad con tus palabras. Si hablas a un grupo de criaturas que puedan escucharte y entenderte durante 1 minuto, puedes Inspirar o Persuadir a una cantidad de criaturas en esa multitud igual a tu nivel de Erudito (Savant), como se detalla a continuación. Puedes usar cada una de estas habilidades una vez entre cada descanso corto o largo:\n\n**Inspirar.** Las criaturas ganan una cantidad de puntos de golpe temporales igual a tu nivel de Erudito, y mientras duren, las criaturas tienen ventaja en tiradas de salvación para resistir conjuros de Encantamiento y ganan Inmunidad a la condición de Asustado.\n**Persuadir.** Las criaturas deben hacer una tirada de salvación de Sabiduría o quedar Hechizadas por ti hasta por 24 horas como por el conjuro *sugestión en masa*.",
      n: 13,
      usos: "1 cada una",
      reset: "corto"
    },
    {
      nombre: "Maestro Orador (Master Orator)",
      t: "pasiva",
      texto: "Tu absoluto dominio sobre la palabra hablada te permite doblegar a todas las criaturas excepto a las más fuertes. Cuando obligas a una criatura a hacer una tirada de salvación para resistir una de tus habilidades de Superioridad Retórica o Retórica Inigualable, esta tiene desventaja en la tirada si tanto su puntuación de Inteligencia como la de Sabiduría son inferiores a tu puntuación de Inteligencia.",
      n: 18
    }
  ]
};

export const philosopher = {
  n: 3,
  rasgos: [
    {
      nombre: "Estudiante del Pensamiento (Student of Thought)",
      t: "pasiva",
      texto: "Obtienes competencia tanto en Arcano como en Religión, y sumas tu Dado de Intelecto a cualquier prueba con esas habilidades.\n\nTu comprensión de la realidad también te otorga los siguientes beneficios:\n- Sumas tu Dado de Intelecto a todas las pruebas para comunicarte con criaturas que no sean nativas del Plano Material.\n- Puedes aprender las siguientes Características con el Análisis Diestro (Adroit Analysis): alineamiento actual, plano de existencia nativo, o su aptitud mágica y el nivel de su conjuro más alto.",
      n: 3
    },
    {
      nombre: "Palabras de Poder (Words of Power)",
      t: "pasiva",
      texto: "En tu estudio, has aprendido a pronunciar Palabras de Poder que se usaron para dar forma al multiverso. Si tu Foco está a 30 pies o menos y puede oírte, puedes pronunciar una Palabra de Poder dirigida a él:\n\n**Confundir (Reacción).** Si tu Foco hace una prueba de característica o tirada de ataque, puedes usar una reacción para obligarlo a hacer una tirada de salvación de Inteligencia. Si falla, recibe daño Psíquico igual a tu Dado de Intelecto y tiene desventaja en esa tirada.\n**Desorientar (Acción).** Como acción, obligas a tu Foco a hacer una tirada de salvación de Sabiduría. Si falla, recibe daño Psíquico igual a tu Dado de Intelecto, y tiene desventaja en la primera tirada de salvación que haga antes del comienzo de tu próximo turno.\n**Pavor (Acción).** Como acción, puedes obligar a tu Foco a hacer una tirada de salvación de Sabiduría. Si falla, recibe daño Psíquico igual a tu Dado de Intelecto, y queda Asustado por una criatura de tu elección hasta el comienzo de tu próximo turno.\n**Alto (Reacción).** Cuando tu Foco intenta moverse, puedes usar una reacción para obligarlo a hacer una tirada de salvación de Fuerza. Si falla, recibe daño Psíquico igual a tu Dado de Intelecto y su velocidad se reduce a cero hasta el inicio de tu próximo turno.",
      n: 3
    },
    {
      nombre: "Foco Inquebrantable (Unwavering Focus)",
      t: "pasiva",
      texto: "Tu sentido resuelto de propósito refuerza tus Palabras de Poder. Puedes decir Palabras de Poder a cualquier criatura que pueda escucharte a 30 pies o menos, no solo a tu Foco.\n\nAdemás, cuando una criatura falla su tirada de salvación contra una Palabra de Poder, el número de Dados de Intelecto de daño Psíquico que recibe aumenta a dos. Vuelve a aumentar en ciertos niveles de Erudito: a nivel 13 (tres), y finalmente a nivel 18 (cuatro).",
      n: 7
    },
    {
      nombre: "Comprensión Suprema (Supreme Understanding)",
      t: "accion",
      texto: "Tu comprensión cada vez más profunda de la naturaleza de la realidad te otorga conocimiento de Palabras de Poder más potentes. Aprendes las Palabras de Poder a continuación, que solo pueden usarse contra tu Foco. Puedes decir cada una de estas Palabras de Poder una vez entre cada descanso corto o largo:\n\n**Debilitar (Enfeeble).** Como acción, obligas a tu Foco a hacer una tirada de salvación de Inteligencia o recibir daño Psíquico igual a tres Dados de Intelecto y quedar Aturdido por 1 minuto. Puede elegir repetir esta tirada de salvación al final de cada uno de sus turnos. Con un éxito, este efecto termina, pero si falla, recibe daño Psíquico como si volviera a fallar la salvación inicial.\n**Desplazar (Shunt).** Como acción, puedes obligar a tu Foco a hacer una tirada de salvación de Carisma. Si falla, recibe daño Psíquico igual a tres Dados de Intelecto y es desplazado de tu plano actual hasta por 1 minuto. Si es nativo del plano actual, es desterrado a un semiplano inofensivo. Si no es nativo del plano actual, es desterrado a su plano nativo. Puede elegir repetir esta tirada de salvación al final de cada uno de sus turnos. Con un éxito, regresa al espacio del que fue desplazado, o al espacio desocupado más cercano. Si falla, recibe daño Psíquico como si volviera a fallar la salvación inicial.",
      n: 13,
      usos: "1 cada una",
      reset: "corto"
    },
    {
      nombre: "Maestro Filósofo (Master Philosopher)",
      t: "pasiva",
      texto: "Tu fuerza de voluntad compite con la de los seres extraplanares más poderosos. Siempre estás bajo los efectos del conjuro *protección contra el bien y el mal*.\n\nFinalmente, aprendes la Palabra de Poder más poderosa. Una vez por descanso largo, puedes decir una Palabra de Poder que replica los efectos de *palabra de poder curación* o *palabra de poder mortal*.",
      n: 18,
      usos: "1",
      reset: "largo"
    }
  ]
};

export const runeScribe = {
  n: 3,
  rasgos: [
    {
      nombre: "Estudiante de Runas (Student of Runes)",
      t: "pasiva",
      texto: "Obtienes competencia con Arcano, Historia y Suministros de Calígrafo, y puedes sumar tu Dado de Intelecto a las pruebas de característica que hagas con estas habilidades.\n\nTambién aprendes a hablar, leer y escribir dos de los siguientes Idiomas Rúnicos, que se utilizan para inscribir las Runas que aprendes: Dracónico, Druídico, Enano, Gigante o Primordial.",
      n: 3
    },
    {
      nombre: "Talla de Runas (Rune Carving)",
      t: "fuera",
      texto: "Has aprendido el arte y la magia antigua de las Runas.\n\n**Runas Conocidas.** Aprendes dos Runas de tu elección de la lista al final de la descripción de esta Disciplina. Si una Runa tiene un prerrequisito de nivel de Erudito, debes cumplirlo para aprenderla. Cuando ganas un nivel de Erudito, puedes reemplazar una Runa que conozcas con otra Runa que pudieras aprender. Aprendes una Runa adicional de tu elección a nivel 7, 10, 13 y 18 en esta clase.\n**Inscribir Runas.** Durante el transcurso de 1 hora, puedes usar Suministros de Calígrafo para inscribir una Runa que conozcas en un arma, armadura, u objeto que pueda usarse o sostenerse, eligiendo en qué idioma Rúnico está inscrita la Runa. La criatura que porta el objeto Rúnico obtiene todos los beneficios de esa Runa. Cada Runa que conozcas solo puede estar inscrita en un objeto a la vez. Si inscribes la Runa de nuevo, cualquier inscripción anterior de la Runa se disipa.\n**Invocar Runas.** Si el portador del objeto Rúnico habla el idioma en el que está inscrita la Runa, puede Invocarla. Una vez que una Runa ha sido Invocada, no se puede Invocar de nuevo hasta que el Escriba de Runas termine un descanso largo, incluso si está inscrita en un objeto diferente.\n**Lanzamiento Rúnico.** Ignoras la restricción de Mentalidad Única (Single Minded) del Análisis Diestro al lanzar y concentrarte en conjuros de Runas. Tus Runas usan lo siguiente al hacer una tirada de ataque de conjuro:\nModificador de ataque rúnico = tu Bonificador de Competencia + tu modificador por Inteligencia.",
      n: 3
    },
    {
      nombre: "Magias Antiguas (Elder Magicks)",
      t: "fuera",
      texto: "Tus objetos Rúnicos cuentan como mágicos mientras la Runa esté inscrita. Además, durante el transcurso de un descanso corto, puedes realizar un ritual corto de 10 minutos para despertar la magia de una Runa que ya haya sido Invocada para el día. Luego, puede ser Invocada una vez más antes del final de tu próximo descanso largo.",
      n: 7
    },
    {
      nombre: "Custodia Rúnica (Runic Ward)",
      t: "pasiva",
      texto: "Tus Runas ofrecen una medida de protección a quienes las portan. Si una criatura que porta al menos uno de tus objetos Rúnicos se ve obligada a hacer una tirada de salvación para resistir los efectos de un conjuro u otro efecto mágico, obtiene un bonificador a su tirada igual a tu modificador por Inteligencia (mínimo de +1).\n\nAdemás, cada vez que terminas un descanso largo, puedes reemplazar una Runa que conozcas con otra Runa de tu elección.",
      n: 13
    },
    {
      nombre: "Maestro Escriba de Runas (Master Rune Scribe)",
      t: "gratis",
      texto: "Puedes recurrir a la magia de tus Runas para protegerte en momentos de gran necesidad. Cuando tus puntos de golpe se reducen a 0 pero no mueres en el acto, puedes extraer poder de un objeto Rúnico a 60 pies o menos de ti, disipando instantáneamente la Runa y cualquiera de sus efectos, y en su lugar caes a 1 punto de golpe.",
      n: 18
    }
  ]
};

export const virtuoso = {
  n: 3,
  rasgos: [
    {
      nombre: "Estudiante de Música (Student of Music)",
      t: "pasiva",
      texto: "Obtienes competencia en Perspicacia, Interpretación, y tres Instrumentos Musicales de tu elección. Cuando haces una prueba de característica con estas habilidades o cualquier Instrumento Musical, sumas tu Dado de Intelecto a tu tirada. También puedes usar tu Inteligencia, en lugar de Carisma, para pruebas de Interpretación.\n\nAdemás, si pasas 1 hora practicando con un Instrumento Musical, obtienes competencia con él. Sin embargo, solo un Instrumento puede beneficiarse de este rasgo a la vez.",
      n: 3
    },
    {
      nombre: "Tema Maravilloso (Wondrous Theme)",
      t: "accion",
      texto: "Has compuesto Temas poderosos que conmueven los corazones de cualquier criatura que pueda escucharlos. Como acción, puedes comenzar a tocar tu Tema usando un Instrumento Musical con el que seas competente. Tu Tema continúa hasta el inicio de tu próximo turno, a menos que decidas terminarlo (no requiere acción).\n\nPuede escucharse hasta a 120 pies de distancia, pero solo influye en criaturas a 30 pies o menos de ti que puedan escucharlo.\nEn turnos siguientes, puedes usar tu acción adicional para continuar el Tema sin interrupción por otro turno. Mientras tocas tu Tema, puedes usar tu reacción para alterar su sonido de las siguientes formas:\n\n- **Nota Discordante (Discordant Note).** Cuando una criatura bajo la influencia de tu Tema ataca a otro objetivo que puedas ver, puedes usar una reacción para tocar esta Nota, y restar tu Dado de Intelecto a su tirada de ataque, posiblemente causando que falle.\n- **Tonada Inspiradora (Inspiring Tune).** Cuando una criatura bajo la influencia de tu Tema recibe daño de una fuente que puedas ver, puedes usar una reacción para tocar esta Tonada, reduciendo el daño desencadenante por tu Dado de Intelecto.\n- **Asalto Estridente (Raucous Assault).** Cuando una criatura entra o comienza su turno bajo la influencia de tu Tema, puedes usar una reacción para obligarla a hacer una tirada de salvación de Constitución. Si falla, recibe daño por Trueno igual a dos Dados de Intelecto.\n- **Melodía Alentadora (Uplifting Melody).** Cuando una criatura bajo la influencia de tu Tema hace una tirada de salvación para resistir ser Hechizada, Asustada, Incapacitada o Aturdida, puedes usar una reacción para tocar esta Melodía y hacer que tenga éxito automáticamente.",
      n: 3
    },
    {
      nombre: "Melodía Desarmante (Disarming Melody)",
      t: "pasiva",
      texto: "Tejes hilos de música desarmante a través de tu Tema. Cuando una criatura bajo la influencia de tu Tema te ataca, primero debe hacer una tirada de salvación de Sabiduría. Si falla, debe atacar a otro objetivo de su elección dentro del alcance. Si no hay otro objetivo, su ataque falla. Las criaturas que tienen éxito en esta tirada de salvación son inmunes a este efecto durante 24 horas.\n\nAdemás, cada vez que uses tu acción para comenzar tu Tema o tu acción adicional para continuar el Tema, puedes forzar a una criatura bajo la influencia de tu Tema a hacer una tirada de salvación contra el Asalto Estridente (Raucous Assault).",
      n: 7
    },
    {
      nombre: "Tema Potenciado (Empowered Theme)",
      t: "pasiva",
      texto: "La complejidad y belleza de tu Tema ha aumentado. Las criaturas a 60 pies de ti están bajo la influencia de tu Tema mientras puedan oírlo.\n\nAdemás, cuando uses una reacción del Tema Maravilloso, puedes otorgar a otra criatura bajo la influencia de tu Tema puntos de golpe temporales iguales a tu modificador por Inteligencia.",
      n: 13
    },
    {
      nombre: "Asalto Estridente (Shrill Assault)",
      t: "pasiva",
      texto: "Puedes potenciar la música de tu Tema para infligir dolor auditivo a tus enemigos. El daño por Trueno infligido por el Asalto Estridente aumenta a tres Dados de Intelecto. Además, siempre que una criatura falle la tirada de salvación, puedes reducir el daño por Trueno en un Dado de Intelecto para que quede Sorda hasta el inicio de tu próximo turno.\n\nA nivel 18, este daño aumenta a cuatro Dados de Intelecto.",
      n: 13
    },
    {
      nombre: "Maestro Virtuoso (Master Virtuoso)",
      t: "pasiva",
      texto: "Tu genio musical y la complejidad de tus composiciones le otorgan a tu Tema cualidades sobrenaturales. Todas las criaturas dentro del alcance de tu Tema se consideran bajo su influencia incluso si no pueden oír o están Sordas.\n\nFinalmente, una vez por descanso corto o largo cuando usas una acción para comenzar tu Tema, puedes obligar a criaturas de tu elección bajo la influencia de tu Tema a hacer la tirada de salvación contra el Asalto Estridente.",
      n: 18,
      usos: "1",
      reset: "corto"
    }
  ]
};
```

=== B ===
```json
{
  "listas_eleccion": {
    "savant_pursuits_expanded": [
      "bushcraft",
      "deduction",
      "equestrianism",
      "first-aid",
      "marksmanship",
      "mercantilism",
      "musicianship",
      "polymath"
    ],
    "culinarian_recipes": [
      "invigorating-morsel",
      "limbering-morsel",
      "monstrous-morsel",
      "subterranean-morsel",
      "thalassic-morsel",
      "verdant-morsel",
      "viscous-morsel",
      "draconic-morsel",
      "psionic-morsel",
      "titanic-morsel",
      "aerial-morsel",
      "aqueous-morsel",
      "ignan-morsel",
      "terran-morsel",
      "celestial-morsel",
      "infernal-morsel",
      "sylvan-morsel"
    ],
    "rune_scribe_runes": [
      "rune-of-enchantment",
      "rune-of-evocation",
      "rune-of-illusion",
      "rune-of-necromancy",
      "rune-of-abjuration",
      "rune-of-conjuration",
      "rune-of-divination",
      "rune-of-transmutation"
    ]
  }
}
```

=== C ===
```json
{
  "aristocrat": "Savant v5.6.1 (LaserLlama)",
  "culinarian": "Savant v5.6.1 (LaserLlama)",
  "orator": "Savant v5.6.1 (LaserLlama)",
  "philosopher": "Savant v5.6.1 (LaserLlama)",
  "rune-scribe": "Savant v5.6.1 (LaserLlama)",
  "virtuoso": "Savant v5.6.1 (LaserLlama)"
}
```

=== D ===
```json
{
  "aristocrat": "Combinas tu gran intelecto con la reputación generacional de tu nombre, aprovechando ambos para convertirte en un maestro de la política y las conexiones sociales.",
  "culinarian": "Utilizas tu intelecto en la ciencia de la comida y la bebida, viajando por el mundo para descubrir nuevas y asombrosas recetas extraídas de bestias exóticas.",
  "orator": "Maestro de la lingüística y la palabra hablada, usas tu ingenio y dominio de la retórica para envalentonar a tus aliados y doblegar a tus enemigos mediante la lógica.",
  "philosopher": "Gastas tu genialidad reflexionando sobre las preguntas profundas de la existencia y la naturaleza del multiverso, aprendiendo palabras de poder de la creación.",
  "rune-scribe": "Dedicas tu vida al estudio del arte antiguo de las runas que encarnan la magia de la creación, protegiéndote a ti y a los tuyos con estos antiguos sigilos.",
  "virtuoso": "Compositor magistral que sabe cómo manipular las emociones de sus oyentes con temas complejos; con las notas correctas, infundes adoración, ira o desesperación."
}
```

=== E ===
```text
No se incluyen las Dotes, Rasgos de Personalidad, ni Objetos Mágicos del material "Savant Expanded" ya que el texto en la parte "Texto fuente (Savant v5.6.1 (LaserLlama))" solo proporcionaba los datos de las páginas 5 a 14 del manual que incluyen las Pursuits y Disciplinas de Clase.
- La Disciplina "Aristocrat" menciona las Búsquedas Eruditas "Traditions" e "Instruction", las cuales formaban parte del lote 33a original pero se aplican aquí.