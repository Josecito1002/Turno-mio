=== A ===
export const INVESTIGATOR_CONJUROS_NUEVOS: Record<string, { nombre: string; nivel: number; escuela: string; tiempo: string; alcance: string; componentes: string; duracion: string; desc: string; ritual: boolean }> = {
  "after-image": {
    nombre: "Imagen Residual (PROPUESTA) (After Image)",
    nivel: 3,
    escuela: "Ilusión",
    tiempo: "1 acción",
    alcance: "A ti mismo",
    componentes: "V, S, M (un espejo de mano de plata con un valor de 50+ po)",
    duracion: "10 minutos",
    desc: "Creas un duplicado ilusorio de ti mismo que sigue cada uno de tus movimientos.[cite: 3] Cuando una criatura te impacta con una tirada de ataque mientras tu duplicado permanece, tira un d6.[cite: 3] Si sale un 3 o más, el impacto lo recibe el duplicado en tu lugar y este se destruye.[cite: 3] Por lo demás, el duplicado ignora cualquier otro daño o efecto.[cite: 3] El duplicado reaparece si te mueves 15 pies o más en tu turno o si tomas la acción de Esquivar.[cite: 3]\nUna criatura no se ve afectada por este conjuro si tiene la condición de Cegado, Visión Ciega o Visión Verdadera.[cite: 3]",
    ritual: true
  },
  "benign-dismemberment": {
    nombre: "Desmembramiento Benigno (PROPUESTA) (Benign Dismemberment)",
    nivel: 3,
    escuela: "Nigromancia",
    tiempo: "1 minuto o Ritual",
    alcance: "Toque",
    componentes: "V, S",
    duracion: "1 hora",
    desc: "Tocas a una criatura dispuesta, permitiendo que las partes de su cuerpo (dedos, extremidades e incluso su cabeza) sean separadas de su cuerpo de forma inofensiva durante la duración.[cite: 3] No recibe daño por tal desmembramiento, siempre y cuando la parte del cuerpo se retire rápidamente y deje un corte limpio.[cite: 3] La cabeza del objetivo permanece viva y consciente, y las partes conectadas a ella también permanecen vivas.[cite: 3] Todas las partes del cuerpo separadas se vuelven inanimadas, pero no comienzan a descomponerse durante la duración del conjuro.[cite: 3] Cualquiera de las partes del cuerpo separadas del objetivo que se retiren durante la duración de este conjuro puede sostenerse contra el muñón, lo que restaura instantáneamente la parte del cuerpo.[cite: 3]\nAl final de la duración, las partes del cuerpo separadas quedan separadas permanentemente.[cite: 3] El objetivo muere si sus órganos vitales no han sido vueltos a unir a su cabeza.[cite: 3]",
    ritual: true
  },
  "blood-print": {
    nombre: "Huella de Sangre (PROPUESTA) (Blood Print)",
    nivel: 1,
    escuela: "Nigromancia",
    tiempo: "1 acción o Ritual",
    alcance: "Toque",
    componentes: "V, S, M (una onza o más de sangre)",
    duracion: "Instantánea",
    desc: "Al tocarla, la sangre húmeda sobre una superficie se mueve y se reforma en un patrón de manchas carmesí.[cite: 3] Esta huella de sangre es única para la criatura particular a la que pertenece la sangre, pero puedes determinar el tipo de criatura (como Humano, Gnoll, Ciervo o Gigante de Fuego) examinando la forma general.[cite: 3] Una huella puede preservarse presionando una hoja de papel contra ella.[cite: 3] Si este conjuro se lanza dos veces, es posible emparejar muestras de sangre provenientes de la misma criatura.[cite: 3]",
    ritual: true
  },
  "clue": {
    nombre: "Pista (PROPUESTA) (Clue)",
    nivel: 1,
    escuela: "Adivinación",
    tiempo: "1 acción o Ritual",
    alcance: "Toque",
    componentes: "V, S, M (una lupa y una pipa)",
    duracion: "10 minutos",
    desc: "Cuando lanzas este conjuro, todas las huellas de pies y manos dentro de una Emanación de 30 pies originada en ti se resaltan y brillan débilmente durante la duración.[cite: 3] Al lanzar el conjuro, elige cualquier punto en el tiempo de hasta 10 días atrás.[cite: 3] Solo las huellas de pies y manos dejadas entre ese momento y el presente se resaltarán.[cite: 3] A cada criatura que deja huellas de pies y manos se le asigna un color único, pero por lo demás no son identificadas.[cite: 3] Cualquier criatura que se mueva o toque objetos dentro de la Emanación también dejará huellas de pies y manos coloridas, lo que podría revelar criaturas invisibles en el área.[cite: 3]",
    ritual: true
  },
  "consecrated-armor": {
    nombre: "Armadura Consagrada (PROPUESTA) (Consecrated Armor)",
    nivel: 1,
    escuela: "Abjuración",
    tiempo: "1 acción o Ritual",
    alcance: "A ti mismo",
    componentes: "V, S, M (una gota de aceite bendito)",
    duracion: "8 horas",
    desc: "Trazas un símbolo sagrado sobre ti mismo, creando una barrera invisible hasta que termina el conjuro.[cite: 3] Tu CA base se convierte en 12 más tu modificador de Destreza.[cite: 3] Si eres atacado por una Aberración, Feérico, Infernal o Muerto Viviente, añades tu modificador de aptitud mágica a tu CA contra ese ataque.[cite: 3] El conjuro termina antes si el objetivo se pone una armadura.[cite: 3]",
    ritual: true
  },
  "curse-ward": {
    nombre: "Custodia contra Maldiciones (PROPUESTA) (Curse Ward)",
    nivel: 2,
    escuela: "Abjuración",
    tiempo: "1 acción",
    alcance: "Toque",
    componentes: "V, S",
    duracion: "1 hora",
    desc: "Extiendes tu mano y tocas a una criatura dispuesta, levantando una barrera similar al humo a su alrededor.[cite: 3] Durante la duración, el objetivo tiene resistencia al daño necrótico y no puede ser maldecido ni poseído.[cite: 3] Además, su máximo de puntos de golpe no puede ser reducido.[cite: 3] Si el objetivo ya se encuentra bajo uno de estos efectos, el efecto se suprime hasta que termina el conjuro.[cite: 3]",
    ritual: false
  },
  "dire-warning": {
    nombre: "Advertencia Nefasta (PROPUESTA) (Dire Warning)",
    nivel: 4,
    escuela: "Adivinación",
    tiempo: "1 acción",
    alcance: "A ti mismo",
    componentes: "V, S",
    duracion: "Instantánea",
    desc: "Recibes un mensaje de hasta 6 palabras de ti mismo en el futuro, advirtiéndote de una amenaza crítica o señalándote un camino fructífero.[cite: 3] En algún momento en el futuro, una vez que hayas descubierto por qué enviaste el mensaje, debes realizar un ritual en el transcurso de 10 minutos (lo cual puede hacerse durante un descanso corto) para enviar el mensaje atrás en el tiempo a tu yo del pasado.[cite: 3]\nUna vez que lanzas este conjuro, no puedes volver a lanzarlo durante 7 días o hasta que realices este ritual.[cite: 3] Si lanzas este conjuro y no recibes ningún mensaje, indica que nunca completarás el ritual en el futuro, posiblemente debido a tu muerte u otro obstáculo.[cite: 3]",
    ritual: false
  },
  "game-of-fate": {
    nombre: "Juego del Destino (PROPUESTA) (Game of Fate)",
    nivel: 6,
    escuela: "Encantamiento",
    tiempo: "1 acción o Ritual",
    alcance: "60 pies",
    componentes: "V, S, M (un set de juego)",
    duracion: "1 hora",
    desc: "Obligas mágicamente a una criatura dentro del alcance que pueda escucharte y entenderte a participar en un juego no mágico con consecuencias vitales.[cite: 3] Una criatura no dispuesta puede hacer una tirada de salvación de Sabiduría para resistir este efecto.[cite: 3] Si falla, la criatura se ve obligada a unirse a ti en el juego.[cite: 3]\nEl perdedor del juego recibe 6d6 daño psíquico.[cite: 3] Si ningún jugador pierde o ha ganado para cuando termine la duración del conjuro, tanto tú como el objetivo reciben este daño.[cite: 3] Si tú o uno de tus aliados daña al objetivo, pierdes el juego automáticamente, y viceversa si el objetivo o uno de sus aliados te daña a ti.[cite: 3]\nAdemás, tú y la criatura objetivo pueden negociar por apuestas mayores.[cite: 3] Pueden apostar por un mayor daño psíquico (hasta un máximo de 12d6), propiedades o recompensas más esotéricas, como la concesión de un título nobiliario.[cite: 3] El conjuro revela si una criatura intenta apostar una propiedad que no posee.[cite: 3] Una apuesta se finaliza cuando tú y el objetivo acuerdan la apuesta, sellándola con un apretón de manos o un gesto similar.[cite: 3] La propiedad o moneda apostada en el juego es teletransportada al ganador a la conclusión del mismo.[cite: 3] El perdedor también queda mágicamente obligado a realizar cualquier acción (como conceder un título nobiliario) apostada como parte del trato.[cite: 3]\nPor último, ningún conjuro, efecto mágico o criatura aparte de ti y del objetivo puede influir en el resultado del juego.[cite: 3]",
    ritual: true
  },
  "invisibility-purge": {
    nombre: "Purga de Invisibilidad (PROPUESTA) (Invisibility Purge)",
    nivel: 4,
    escuela: "Abjuración",
    tiempo: "1 acción",
    alcance: "A ti mismo",
    componentes: "V, S, M (una pizca de plata en polvo)",
    duracion: "1 minuto",
    desc: "Una Emanación de 120 pies originada en ti interrumpe la invisibilidad.[cite: 3] Cada criatura dentro de la Emanación queda delineada con un aura mágica y no puede beneficiarse de la condición de Invisible.[cite: 3] Los objetos invisibles dentro de la Emanación se vuelven visibles.[cite: 3]",
    ritual: false
  },
  "jethros-instant-reload": {
    nombre: "Recarga Instantánea de Jethro (PROPUESTA) (Jethro's Instant Reload)",
    nivel: 2,
    escuela: "Conjuración",
    tiempo: "1 acción",
    alcance: "Toque",
    componentes: "V, S, M (un casquillo de bala percutido)",
    duracion: "8 horas",
    desc: "Un arma a distancia que tocas queda encantada para recargarse automáticamente.[cite: 3] Si el arma tiene la propiedad de Recarga (Cooldown), Munición (Loading) o Recargar (Reload), ignoras esa propiedad durante la duración.[cite: 3] Cuando se agota la munición del arma, la munición que llevas contigo se teletransporta al interior del arma.[cite: 3]",
    ritual: false
  },
  "memorize": {
    nombre: "Memorizar (PROPUESTA) (Memorize)",
    nivel: 1,
    escuela: "Encantamiento",
    tiempo: "1 acción o Ritual",
    alcance: "Toque",
    componentes: "V, S, M (una página de texto escrito y un trozo de hilo de plata con un valor de 10+ po, atado en un nudo, que el conjuro consume)",
    duracion: "Instantánea",
    desc: "Mientras lanzas este conjuro, tus ojos pasan sobre las palabras en una página, las cuales quedan grabadas en tu memoria.[cite: 3] Durante el próximo año, recordarás los detalles exactos de toda la información en la página.[cite: 3] Pasado ese tiempo, tienes ventaja en todas las pruebas de Inteligencia que hagas para recordar esta información.[cite: 3]",
    ritual: true
  },
  "nondescript": {
    nombre: "Inadvertido (PROPUESTA) (Nondescript)",
    nivel: 2,
    escuela: "Ilusión",
    tiempo: "1 acción",
    alcance: "A ti mismo",
    componentes: "V, S",
    duracion: "Concentración, hasta 10 minutos",
    desc: "Este conjuro te hace parecer poco notable para los demás, aunque no cambia tu apariencia real.[cite: 3] Durante la duración, una criatura que te vea o escuche es incapaz de recordar detalles específicos sobre ti, aunque puede recordar las acciones que tomaste o los eventos que ocurrieron a tu alrededor.[cite: 3]",
    ritual: false
  },
  "protect-threshold": {
    nombre: "Proteger Umbral (PROPUESTA) (Protect Threshold)",
    nivel: 2,
    escuela: "Abjuración",
    tiempo: "1 acción o Ritual",
    alcance: "Toque",
    componentes: "V, S, M (una onza de sal por cada pie del perímetro del portal custodiado)",
    duracion: "10 minutos",
    desc: "Trazando sellos arcanos a lo largo de su límite, puedes custodiar una puerta, ventana u otro portal para evitar la entrada.[cite: 3] Durante la duración, una criatura sobrenatural e invisible acecha el portal custodiado.[cite: 3] Cualquier criatura que intente pasar a través del portal debe hacer una tirada de salvación de Sabiduría o recibir 4d6 daño psíquico, o la mitad de ese daño si tiene éxito.[cite: 3]\n**A niveles superiores.** El daño aumenta en 1d6 por cada nivel de espacio de conjuro por encima de 2.[cite: 3]",
    ritual: true
  },
  "rumor": {
    nombre: "Rumor (PROPUESTA) (Rumor)",
    nivel: 1,
    escuela: "Encantamiento",
    tiempo: "1 acción",
    alcance: "A ti mismo",
    componentes: "V, S",
    duracion: "1 minuto",
    desc: "Esparces mágicamente un rumor de 10 palabras o menos en una Emanación de 100 pies centrada en ti.[cite: 3] Cualquier criatura dentro de la Emanación que se encuentre cerca de tres o más criaturas que compartan un idioma en común cree escuchar el rumor siendo repetido por alguien cercano.[cite: 3] Diferentes criaturas escuchan el rumor de diferentes personas, por lo que es imposible discernir un punto de origen concreto.[cite: 3] Generalmente, las criaturas no se volverán hostiles al escuchar incluso los rumores más crueles, pero escuchar un rumor puede afectar su actitud de manera positiva o negativa.[cite: 3]",
    ritual: false
  },
  "scrutinize-foe": {
    nombre: "Escrutar Enemigo (PROPUESTA) (Scrutinize Foe)",
    nivel: 4,
    escuela: "Adivinación",
    tiempo: "1 acción adicional",
    alcance: "60 pies",
    componentes: "V, S",
    duracion: "Instantánea",
    desc: "Disciernes detalles minuciosos sobre una criatura que puedas ver dentro del alcance.[cite: 3] Aprendes dos de las siguientes piezas de información a tu elección sobre el objetivo: su Clase de Armadura, Velocidades, Inmunidades (si las hay), Resistencias (si las hay), su puntuación de característica más alta, su puntuación de característica más baja, y encantamientos (lo que revela qué conjuros, si hay alguno, están afectando actualmente al objetivo).[cite: 3] El DM debe compartir contigo la información elegida.[cite: 3]",
    ritual: false
  },
  "seance": {
    nombre: "Sesión de Espiritismo (PROPUESTA) (Séance)",
    nivel: 3,
    escuela: "Nigromancia",
    tiempo: "10 minutos",
    alcance: "A ti mismo",
    componentes: "V, S, M (una bola de cristal, una baraja de cartas del tarot o una tabla ouija, y un incienso con un valor de 50+ po)",
    duracion: "1 minuto",
    desc: "Tú y tres o más criaturas dispuestas se toman de las manos para conjurar un espíritu del más allá y hacerle preguntas.[cite: 3] Describe o nombra a una criatura que te sea familiar.[cite: 3] Si el alma de la criatura es libre y está dispuesta, se manifiesta como un espectro fantasmal.[cite: 3] Este conjuro falla si el espíritu fue el objetivo de este mismo conjuro en los últimos 10 días.[cite: 3]\nHasta que el conjuro termine, puedes hacerle hasta tres preguntas al espectro.[cite: 3] El espectro solo sabe lo que sabía en vida, incluyendo los idiomas que hablaba.[cite: 3] Las respuestas suelen ser breves, crípticas o repetitivas, y el espectro no está bajo ninguna obligación de ofrecer una respuesta veraz si eres hostil hacia él o si te reconoce como un enemigo.[cite: 3] Existe un 5% de probabilidad de que este conjuro contacte con el espíritu equivocado, uno que responderá las preguntas de forma engañosa o ambigua.[cite: 3]",
    ritual: false
  },
  "transient-bulwark": {
    nombre: "Baluarte Transitorio (PROPUESTA) (Transient Bulwark)",
    nivel: 1,
    escuela: "Abjuración",
    tiempo: "1 acción o Ritual",
    alcance: "A ti mismo",
    componentes: "V, S, M (una perla con un valor de 10+ po, que el conjuro consume)",
    duracion: "8 horas",
    desc: "Un escudo frágil e invisible te protege durante la duración.[cite: 3] La próxima tirada de ataque en tu contra tiene un penalizador de -10, y el conjuro termina.[cite: 3]",
    ritual: true
  },
  "zero-gravity": {
    nombre: "Gravedad Cero (PROPUESTA) (Zero Gravity)",
    nivel: 4,
    escuela: "Transmutación",
    tiempo: "1 acción",
    alcance: "100 pies",
    componentes: "V, S, M (una magnetita y limaduras de hierro)",
    duracion: "Concentración, hasta 1 minuto",
    desc: "Este conjuro crea un entorno de gravedad cero dentro de una Esfera de 30 pies de radio, centrada en un punto que puedas ver dentro del alcance.[cite: 3]\nEn un entorno de gravedad cero, las criaturas y los objetos flotan en el aire hasta que son movidos.[cite: 3] Una criatura en gravedad cero solo puede moverse empujando o tirando de un objeto fijo o superficie a su alcance (como una pared o un techo), lo que le permite moverse como si estuviera trepando.[cite: 3] Por lo demás, su Velocidad es 0.[cite: 3] Una vez que una criatura u objeto se pone en movimiento, no puede detenerse hasta que choca con un obstáculo.[cite: 3] Una criatura continúa automáticamente su movimiento a la misma velocidad al comienzo de cada uno de sus turnos, y un objeto puesto en movimiento se mueve con la misma velocidad cada asalto después de ser movido.[cite: 3]\nLas criaturas y objetos en un área de gravedad cero no tienen peso, pero aun así pueden requerir una fuerza significativa para ser movidos.[cite: 3] Cuando el conjuro termina, los objetos y criaturas afectadas caen hacia abajo.[cite: 3]",
    ritual: false
  }
};

=== B ===
{
  "lista": {
    "1": [
      "Alarma",
      "Armadura Consagrada (PROPUESTA)",
      "Baluarte Transitorio (PROPUESTA)",
      "Comprensión idiomática",
      "Detectar el bien y el mal",
      "Detectar magia",
      "Detectar veneno y enfermedad",
      "Disco flotante",
      "Disfrazarse",
      "Encontrar familiar",
      "Escritura ilusoria",
      "Hablar con los animales",
      "Heroísmo",
      "Huella de Sangre (PROPUESTA)",
      "Identificar",
      "Memorizar (PROPUESTA)",
      "Nube de niebla",
      "Pista (PROPUESTA)",
      "Protección contra el bien y el mal",
      "Purificar comida y bebida",
      "Rumor (PROPUESTA)",
      "Sirviente invisible"
    ],
    "2": [
      "Apertura",
      "Augurio",
      "Aura mágica de arcanista",
      "Boca mágica",
      "Cerradura arcana",
      "Custodia contra Maldiciones (PROPUESTA)",
      "Inadvertido (PROPUESTA)",
      "Localizar animales o plantas",
      "Localizar objeto",
      "Mensajero animal",
      "Oscuridad",
      "Protección contra el veneno",
      "Proteger Umbral (PROPUESTA)",
      "Recarga Instantánea de Jethro (PROPUESTA)",
      "Reposo tranquilo",
      "Silencio",
      "Trepar por las paredes",
      "Ver lo invisible",
      "Visión en la oscuridad",
      "Zona de la verdad"
    ],
    "3": [
      "Clarividencia",
      "Círculo mágico",
      "Crear comida y agua",
      "Desmembramiento Benigno (PROPUESTA)",
      "Disipar magia",
      "Don de lenguas",
      "Fundirse con la piedra",
      "Hablar con las plantas",
      "Hablar con los muertos",
      "Imagen Residual (PROPUESTA)",
      "Indetectabilidad",
      "Luz del día",
      "Montura fantasmal",
      "Quitar maldición",
      "Recado",
      "Respiración acuática",
      "Sesión de Espiritismo (PROPUESTA)",
      "Transmisión de agua (Caminar sobre las aguas)",
      "Volar"
    ],
    "4": [
      "Advertencia Nefasta (PROPUESTA)",
      "Adivinación",
      "Cofre secreto",
      "Escrutar Enemigo (PROPUESTA)",
      "Gravedad Cero (PROPUESTA)",
      "Localizar criatura",
      "Ojo arcano",
      "Purga de Invisibilidad (PROPUESTA)",
      "Santuario privado"
    ],
    "5": [
      "Atadura planar",
      "Comulgar",
      "Comulgar con la naturaleza",
      "Conocimiento legendario",
      "Contactar con otro plano",
      "Geas",
      "Sueño",
      "Vínculo telepático"
    ],
    "6": [
      "Convocación instantánea",
      "Encontrar la senda",
      "Juego del Destino (PROPUESTA)",
      "Prohibición"
    ]
  },
  "rituales_extra": [
    "Armadura Consagrada (PROPUESTA)",
    "Pista (PROPUESTA)",
    "Detectar el bien y el mal",
    "Disfrazarse",
    "Nube de niebla",
    "Heroísmo",
    "Memorizar (PROPUESTA)",
    "Protección contra el bien y el mal",
    "Rumor (PROPUESTA)",
    "Hablar con los animales",
    "Baluarte Transitorio (PROPUESTA)",
    "Cerradura arcana",
    "Aura mágica de arcanista",
    "Augurio",
    "Custodia contra Maldiciones (PROPUESTA)",
    "Oscuridad",
    "Visión en la oscuridad",
    "Recarga Instantánea de Jethro (PROPUESTA)",
    "Apertura",
    "Localizar objeto",
    "Inadvertido (PROPUESTA)",
    "Protección contra el veneno",
    "Ver lo invisible",
    "Silencio",
    "Trepar por las paredes",
    "Zona de la verdad",
    "Imagen Residual (PROPUESTA)",
    "Clarividencia",
    "Crear comida y agua",
    "Luz del día",
    "Disipar magia",
    "Volar",
    "Círculo mágico",
    "Indetectabilidad",
    "Quitar maldición",
    "Sesión de Espiritismo (PROPUESTA)",
    "Recado",
    "Hablar con los muertos",
    "Hablar con las plantas",
    "Don de lenguas",
    "Ojo arcano",
    "Advertencia Nefasta (PROPUESTA)",
    "Purga de Invisibilidad (PROPUESTA)",
    "Localizar criatura",
    "Santuario privado",
    "Escrutar Enemigo (PROPUESTA)",
    "Cofre secreto",
    "Gravedad Cero (PROPUESTA)",
    "Sueño",
    "Geas",
    "Conocimiento legendario",
    "Atadura planar",
    "Vínculo telepático",
    "Encontrar la senda",
    "Prohibición",
    "Juego del Destino (PROPUESTA)"
  ]
}

=== C ===
export const OBJETOS: Record<string, ObjetoMagico> = {
  "aura-lenses": {
    nombre: "Lentes de Aura (Aura Lenses)",
    rareza: "Poco común",
    tipo: "Objeto maravilloso",
    sintonia: false,
    texto: "Un juego de estos grandes lentes de vidrio está contenido en un único estuche cilíndrico.[cite: 3] Cada uno tiene cuatro pulgadas de ancho, está tintado de un tono diferente y está asociado a una escuela de magia particular, como se muestra en la tabla inferior.[cite: 3] Cuando sostienes un lente frente a tu ojo y miras a través de él como acción adicional, el mundo parece estar tintado del color del lente, a excepción de las criaturas y objetos que se encuentran bajo el efecto de un conjuro de la escuela de magia asociada al lente, los cuales aparecen coloreados normalmente.[cite: 3] Un set completo (Raro) contiene los 8 lentes (uno para cada escuela), pero la mayoría se encuentran como un set incompleto (Poco común) que contiene solo 1d8 de ellos.[cite: 3]\n\n- Abjuración: Blanco\n- Conjuración: Azul\n- Adivinación: Amarillo\n- Encantamiento: Rosa\n- Evocación: Rojo\n- Ilusión: Púrpura\n- Nigromancia: Gris\n- Transmutación: Verde[cite: 3]"
  },
  "crimson-compass": {
    nombre: "Brújula Carmesí (Crimson Compass)",
    rareza: "Poco común",
    tipo: "Objeto maravilloso",
    sintonia: false,
    texto: "Como Acción Mágica, puedes insertar una gota de sangre en la esfera de esta brújula, que se orienta a sí misma actuando como una aguja.[cite: 3] La aguja apunta hacia la criatura a la que pertenece la sangre si está viva y en el mismo plano de existencia.[cite: 3] De lo contrario, la aguja gira descontroladamente.[cite: 3] La brújula no puede localizar a una criatura que se encuentre bajo los efectos del conjuro *Indetectabilidad*.[cite: 3] Puedes limpiar la sangre de la brújula usando una Acción Mágica.[cite: 3]"
  },
  "encyclopedia-sanguine": {
    nombre: "Enciclopedia Sanguínea (Encyclopedia Sanguine)",
    rareza: "Poco común",
    tipo: "Objeto maravilloso",
    sintonia: false,
    texto: "Este libro cataloga cientos de manchas de tinta ensangrentada.[cite: 3] Mientras sostienes este libro, puedes lanzar *Huella de Sangre* desde él.[cite: 3] Si consultas el libro como Acción Mágica, puedes determinar lo siguiente acerca de cualquier huella de este tipo: el tipo específico de criatura a la que pertenece la sangre (como un humano o un unicornio), su edad aproximada, sexo y su estado de salud (evaluado como pobre o saludable).[cite: 3]"
  },
  "fate-deck": {
    nombre: "Mazo del Destino (Fate Deck)",
    rareza: "Muy raro",
    tipo: "Objeto maravilloso",
    sintonia: false,
    texto: "Esta caja de cartas está entretejida con los hilos del destino.[cite: 3] Una baraja completa contiene un set de 52 cartas de juego, pero existen otras variaciones, incluyendo aquellas con diferentes números de cartas o sets de dados.[cite: 3]\nJugar a cualquier juego con la baraja lanza *Juego del Destino* (CD 17) desde ella.[cite: 3] La baraja no puede volver a lanzar este conjuro hasta el siguiente amanecer.[cite: 3]"
  },
  "grimoire-monstrum": {
    nombre: "Grimorio Monstrum (Grimoire Monstrum)",
    rareza: "Poco común",
    tipo: "Objeto maravilloso",
    sintonia: true,
    texto: "Mientras sostienes este libro de mitos y monstruos, tienes ventaja en las pruebas de Inteligencia que hagas relacionadas con monstruos, conjuros o saberes antiguos o secretos.[cite: 3]"
  },
  "dire-diary": {
    nombre: "Diario Nefasto (Dire Diary)",
    rareza: "Raro",
    tipo: "Objeto maravilloso",
    sintonia: true,
    texto: "Este diario contiene 50 páginas amarillentas.[cite: 3] Cuando te sintonizas con él, descubres que las páginas contienen tu propia caligrafía narrando eventos que aún no han sucedido.[cite: 3] Ninguna otra criatura puede sintonizarse con este diario a partir de ese momento.[cite: 3] Puedes usar el diario para lanzar *Advertencia Nefasta* desde él, llenando una página del diario con un mensaje del futuro de hasta 50 palabras.[cite: 3] El mensaje puede consistir en un boceto o diagrama en lugar de escritura, y suele ser vago o críptico para evitar paradojas.[cite: 3] El diario no puede volver a lanzar este conjuro durante 7 días.[cite: 3]"
  },
  "weapon-charms": {
    nombre: "Amuletos de Arma (Weapon Charms)",
    rareza: "Varía",
    tipo: "Objeto maravilloso",
    sintonia: true,
    texto: "Un Amuleto de Arma es un pequeño adorno fijado en un lazo de cuerda o cadena.[cite: 3] Puedes tomar una Acción Mágica para adherir el amuleto a un arma (usualmente en el pomo del arma) o para retirarlo de una.[cite: 3] Adherir un amuleto hace que el arma se convierta en un arma mágica que requiere sintonización.[cite: 3] Si el arma ya es mágica, debes sintonizarte con ella de nuevo para obtener los beneficios mágicos del amuleto.[cite: 3] Un arma solo puede tener un amuleto adherido a la vez.[cite: 3] Existen múltiples variedades de estos amuletos:\n\n- **Arrowhead (Punta de Flecha; Poco común):** Este amuleto dorado representa una punta de flecha de piedra.[cite: 3] Mientras esté adherido, tus ataques a distancia usando esta arma ignoran la cobertura media y la cobertura de tres cuartos.[cite: 3]\n- **Bat (Murciélago; Común):** Este amuleto de obsidiana se asemeja a un murciélago chillando.[cite: 3] Mientras esté adherido, el arma puede infligir daño necrótico en lugar de su tipo de daño normal (a tu elección).[cite: 3] Cuando infliges daño a una criatura con esta arma, el máximo de puntos de golpe del objetivo se reduce en una cantidad igual al daño necrótico recibido.[cite: 3] La criatura muere si este efecto reduce su máximo de puntos de golpe a 0.[cite: 3]\n- **Blade (Hoja; Poco común +1, Raro +2, Muy raro +3):** Este amuleto adamantino parece una espada larga en miniatura.[cite: 3] Mientras esté adherido, obtienes un bonificador a las tiradas de ataque y daño que hagas con esta arma mágica.[cite: 3] El bonificador se determina por la rareza del amuleto.[cite: 3] Si el arma ya otorga un bonificador (como una Espada Larga +2), tú eliges cuál usar; no puedes sumar más de uno.[cite: 3]\n- **Die (Dado; Poco común):** Este amuleto de plata representa un dado de seis caras.[cite: 3] Mientras esté adherido, el arma asesta impactos críticos más potentes.[cite: 3] Cuando logras un Impacto Crítico con esta arma, si sacas el número más alto en cualquier dado de daño, puedes tirar otro dado de ese mismo tipo y sumarlo al daño.[cite: 3] Puedes añadir un máximo de 10 dados a la tirada de daño del ataque de esta manera.[cite: 3]\n- **Flame (Llama; Raro):** Este amuleto de latón se asemeja a un fuego ardiente.[cite: 3] Mientras esté adherido, el arma inflige daño por fuego en lugar de su tipo de daño normal.[cite: 3] Cuando impactas a una criatura u objeto con esta arma, el objetivo comienza a Arder durante 1 minuto.[cite: 3] Si vuelves a impactar a un objetivo ardiente con esta arma, el daño que recibe al inicio de cada uno de sus turnos por estar ardiendo aumenta en un paso (d4 -> d6 -> d8 -> d10 -> d12, hasta un máximo de 1d12).[cite: 3]\n- **Ghost (Fantasma; Común):** Este amuleto de cristal está tallado en la forma de un espíritu etéreo.[cite: 3] Mientras esté adherido, el arma puede afectar a criaturas en el Plano Etéreo como si estuvieran en el Plano Material, y viceversa.[cite: 3]\n- **Hook (Anzuelo; Común):** Este amuleto de bronce tiene forma de anzuelo de pesca.[cite: 3] Mientras esté adherido, si el arma se encuentra en tu mismo plano de existencia, puedes tomar una acción adicional para teletransportarla a tu mano.[cite: 3]\n- **Lance (Lanza de Caballería; Poco común):** Este amuleto de cobre representa una lanza corta.[cite: 3] Mientras esté adherido, una vez en cada uno de tus turnos al hacer un ataque cuerpo a cuerpo con esta arma contra una criatura que puedas ver, puedes abalanzarte hasta 15 pies hacia tu objetivo antes de realizar el ataque.[cite: 3] Este movimiento no provoca Ataques de Oportunidad.[cite: 3] Puedes realizar este movimiento incluso si te hace viajar por el aire, aunque caerás después de hacer el ataque si no hay nada sosteniéndote en el aire.[cite: 3]\n- **Lightning Bolt (Relámpago; Raro):** Este amuleto de mitril representa un rayo salvaje.[cite: 3] Mientras esté adherido, el arma inflige daño por relámpago en lugar de su tipo de daño normal y hace 1d6 de daño por relámpago adicional al impactar.[cite: 3]\n- **Mirror (Espejo; Raro):** Este amuleto de platino brillante representa un elegante espejo de mano.[cite: 3] Solo puede adherirse a un arma con la propiedad Sutil (Light).[cite: 3] Mientras esté adherido, al desenvainar el arma, un duplicado espectral de ella aparece en tu otra mano.[cite: 3] Este duplicado espectral tiene estadísticas idénticas al arma original, incluyendo sus efectos mágicos, pero no incluye la munición.[cite: 3] Cuando el arma adherida o su duplicado espectral dejan de estar en tu mano, el duplicado se desvanece.[cite: 3]\n- **Prism (Prisma; Poco común):** Este amuleto de cristal es un prisma triangular perfecto.[cite: 3] Cuando te sintonizas a esta arma, elige daño por ácido, frío, fuego, relámpago, veneno o trueno.[cite: 3] El arma puede infligir el tipo de daño elegido o su tipo de daño normal (a tu elección).[cite: 3]\n- **Quiver (Carcaj; Poco común):** Este amuleto de cuarzo se asemeja a un carcaj rebosante de flechas.[cite: 3] Mientras esté adherido a un arma a distancia, esta ignora la propiedad Munición (Loading).[cite: 3] La munición que lleves encima se teletransporta directamente al interior del arma cuando es necesario.[cite: 3]\n- **Rock (Roca; Poco común):** Este amuleto de hierro parece un guijarro pulido.[cite: 3] Mientras esté adherido, el arma gana la propiedad de maestría Agotar (Sap) además de su propiedad de maestría normal.[cite: 3] Solo puedes usar una propiedad de maestría en cada ataque.[cite: 3] Puedes usar la propiedad de Agotar incluso si no tienes el rasgo de Maestría en Armas, y no cuenta en contra del número de armas que puedes usar con dicho rasgo.[cite: 3]"
  }
}

=== D ===
{
  "investigator": "Conjuros y objetos que potencian la resolución de misterios y la subyugación de lo sobrenatural."
}

=== E ===
* El documento en PDF (OCR) presentaba un error claro en el listado de conjuros del Investigator (Páginas 6 y 7): la lista de los conjuros de Nivel 6 se mezcló por error dentro del listado de los de Nivel 3. En el bloque JSON lo he reconstruido asignando cada conjuro a su nivel correspondiente (p.ej., *Find the Path* y *Game of Fate* son de Nivel 6 y los he movido a dicha sección).[cite: 3]
* Mantuve la convención estándar de traducir el rasgo de maestría de arma "Sap" como **Agotar** (PROPUESTA), conforme al vocabulario estandarizado proyectado para las reglas 2024.[cite: 3]
* Los *Weapon Charms* fueron agrupados bajo una sola entrada de objeto maravilloso con subvariantes.[cite: 3]
* Se identificaron todos los conjuros que poseían la etiqueta `(R)` en el documento base para añadirlos a la propiedad `rituales_extra`, tal como asume la lógica mecánica del Investigator.[cite: 3]