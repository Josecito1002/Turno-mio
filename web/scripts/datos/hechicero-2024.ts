/* Hechicero de la biblioteca puesto al día con su versión oficial más reciente (texto oficial de 5etools, redactado por
   Gemini y revisado con scripts/gemini/revisar.ts). Libros: Manual del Jugador (2024); Xanathar's Guide to Everything (2017); Dragonlance: Shadow of the Dragon Queen (2022); Ravenloft: The Horrors Within (2026); Forgotten Realms: Heroes of Faerûn (2025).
   Lo aplica scripts/actualizar-clase.ts (opción "hechicero"). */

const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const HECHICERO_2024 = {
  rasgosAltos: [
    r(10, 'Metamagia adicional', 'pasiva', 'Aprendes dos opciones de Metamagia más (el selector de Metamagia ya las cuenta).'),
    r(17, 'Metamagia adicional', 'pasiva', 'Aprendes otras dos opciones de Metamagia (el selector de Metamagia ya las cuenta).'),
    r(7, 'Hechicería Encarnada', 'gratis', 'Si te quedas sin usos de Hechicería Innata, puedes activarla gastando 2 puntos de hechicería. Además, mientras esté activa, puedes aplicar hasta dos opciones de Metamagia en cada conjuro que lances.'),
    r(20, 'Apoteosis Arcana', 'pasiva', 'Mientras tu Hechicería Innata esté activa, puedes usar una opción de Metamagia en cada uno de tus turnos sin gastar puntos de hechicería.')
  ],
  subAltos: {
    draconico: [
      r(6, 'Afinidad Elemental', 'pasiva', 'Tu magia se sintoniza con el tipo de daño asociado a los dragones que elegiste. Obtienes resistencia a ese daño, y sumas tu modificador de Carisma al daño de un conjuro que cause daño de ese tipo.'),
      r(14, 'Alas de Dragón', 'adicional', 'Como Acción Adicional, te brotan alas de dragón que duran 1 hora y te otorgan 60 pies de velocidad de vuelo. Una vez gratis por descanso largo, o pagando 3 puntos de hechicería.', { usos: 1, reset: 'largo' }),
      r(18, 'Compañero Dragón', 'pasiva', 'Siempre puedes lanzar Invocar dragón sin componentes materiales. Tienes un lanzamiento gratis al día y puedes quitarle el requerimiento de concentración para que dure 1 minuto.', { usos: 1, reset: 'largo' })
    ],
    salvaje: [
      r(6, 'Doblegar la Suerte', 'reaccion', 'Usando tu magia salvaje, puedes torcer el destino. Cuando veas a otra criatura lanzar un d20 para una prueba, puedes gastar 1 punto de hechicería y usar tu reacción para sumarle o restarle 1d4 a su tirada.'),
      r(14, 'Caos Controlado', 'pasiva', 'Ganas un poco de control sobre tus oleadas de magia salvaje. Siempre que tengas que tirar en la tabla de Oleada de Magia Salvaje, tiras dos veces y eliges el resultado que prefieras.'),
      r(18, 'Oleada Domada', 'pasiva', 'Justo después de lanzar un conjuro con espacio, en lugar de tirar dados, puedes simplemente elegir qué efecto de la tabla de Magia Salvaje quieres que ocurra (salvo el 97-00).', { usos: 1, reset: 'largo' })
    ]
  },
  subclases: {
    'aberrante': {
      n: 'Hechicería Aberrante',
      rasgos: [
        r(3, 'Conjuros Psiónicos', 'pasiva', 'El contacto con fuerzas alienígenas te otorga conjuros preparados adicionales en los niveles 3, 5, 7 y 9.'),
        r(3, 'Habla Telepática', 'adicional', 'Como Acción Adicional, conectas tu mente a la de una criatura a 30 pies. Pueden hablar mentalmente mientras estén a una distancia en millas igual a tu CAR. Dura minutos igual a tu nivel de Hechicero.'),
        r(6, 'Hechicería Psiónica', 'pasiva', 'Puedes lanzar tus Conjuros Psiónicos usando puntos de hechicería iguales al nivel del conjuro en lugar de espacios. Si lo haces, el conjuro no requerirá componentes verbales, somáticos ni materiales (salvo que se consuman o tengan coste).'),
        r(6, 'Defensas Psíquicas', 'pasiva', 'Obtienes resistencia al daño Psíquico y ventaja en salvaciones contra ser Hechizado o Asustado.'),
        r(14, 'Revelación Carnal', 'adicional', 'Como Acción Adicional, gastas 1 punto de hechicería por cada mutación que quieras adoptar por 10 minutos: respiración acuática/nado, vuelo, visión de lo invisible, o cuerpo viscoso para pasar por huecos diminutos sin ser apresado.'),
        r(18, 'Implosión Deformadora', 'accion', 'Como Acción Mágica, te teletransportas 120 pies. Donde estabas, estalla una anomalía (30 pies de radio) que fuerza salvación de FUE: atrae al centro e inflige 3d10 daño de Fuerza (mitad si salvan). Gratis 1 vez por descanso largo o pagando 5 puntos.', { usos: 1, reset: 'largo' })
      ]
    },
    'reloj': {
      n: 'Hechicería del Reloj',
      rasgos: [
        r(3, 'Conjuros del Reloj', 'pasiva', 'El orden de Mechanus te otorga conjuros preparados de protección e invocación matemática en los niveles 3, 5, 7 y 9.'),
        r(3, 'Restaurar el Equilibrio', 'reaccion', 'Cuando una criatura a 60 pies o menos va a tirar un d20 con Ventaja o Desventaja, usas tu Reacción para anular ambas. Puedes hacerlo una cantidad de veces igual a tu Carisma.', { usos: 'max(1, CAR)', reset: 'largo' }),
        r(6, 'Baluarte de la Ley', 'accion', 'Como Acción Mágica, gastas 1 a 5 puntos de hechicería para dar a alguien a 30 pies un escudo (1d8 por cada punto gastado). Al recibir daño, puede gastar esos d8s para reducir el golpe. Dura hasta que descanses o lo uses de nuevo.'),
        r(14, 'Trance de Orden', 'adicional', 'Como Acción Adicional, entras en trance por 1 minuto. Los ataques en tu contra no tienen Ventaja y tratas cualquier tirada de 9 o menos en el d20 como un 10. Gratis 1 vez por descanso o pagando 5 puntos.', { usos: 1, reset: 'largo' }),
        r(18, 'Cavatina del Reloj', 'accion', 'Como Acción Mágica, invocas espíritus en un cubo de 30 pies. Reparten hasta 100 PG, reparan objetos y disipan conjuros de nivel 6 o inferior. Gratis 1 vez por descanso largo o pagando 7 puntos.', { usos: 1, reset: 'largo' })
      ]
    },
    'alma-divina': {
      n: 'Alma Divina',
      rasgos: [
        r(3, 'Magia Divina', 'pasiva', 'Cuando aprendes o cambias un truco o conjuro de hechicero, puedes tomarlo también de la lista de clérigo. Eliges una afinidad y aprendes un conjuro extra: bien, Curar heridas; mal, Infligir heridas; ley, Bendecir; caos, Perdición; neutralidad, Protección contra el bien y el mal.'),
        r(3, 'Favorecido por los Dioses', 'gratis', 'Si fallas una salvación o una tirada de ataque, tiras 2d4 y lo sumas al resultado, lo que puede cambiarlo. Una vez por descanso corto o largo.', { usos: 1, reset: 'corto' }),
        r(6, 'Curación Potenciada', 'pasiva', 'Si tú o un aliado a 5 pies tiran dados para curarse con un conjuro, puedes gastar 1 punto de hechicería para repetir cualquier cantidad de esos dados. (Una vez por turno)'),
        r(14, 'Alas de Otro Mundo', 'adicional', 'Como Acción Adicional, invocas alas espectrales de tu espalda (según tu afinidad divina) que te dan una velocidad de vuelo de 30 pies. Duran hasta que las desestimes o caigas incapacitado.'),
        r(18, 'Recuperación Sobrenatural', 'adicional', 'Como Acción Adicional, si tienes menos de la mitad de tus Puntos de Golpe, puedes curarte una cantidad igual a la mitad de tus PG máximos.', { usos: 1, reset: 'largo' })
      ]
    },
    'lunar': {
      n: 'Hechicería Lunar',
      rasgos: [
        r(3, 'Encarnación Lunar', 'fuera', 'Al terminar un descanso largo eliges la fase de tu magia: luna llena, luna nueva o luna creciente. Mientras estés en esa fase, puedes lanzar una vez su conjuro de nivel 1 sin gastar espacio; vuelve con un descanso largo.', { usos: 1, reset: 'largo' }),
        r(3, 'Conjuros Lunares', 'pasiva', 'Aprendes los conjuros de las tres fases lunares en los niveles 3, 5, 7 y 9; no cuentan en tu límite.'),
        r(3, 'Fuego Lunar', 'pasiva', 'Aprendes el truco Llama sagrada, que no cuenta en tu límite. Al lanzarlo puedes elegir un objetivo, o dos que estén a 5 pies o menos uno del otro.'),
        r(6, 'Favores Lunares', 'pasiva', 'Al usar Metamagia en escuelas afines a tu fase lunar actual, su coste se reduce en 1 punto (mínimo 0) un número de veces igual a tu competencia por descanso largo.', { usos: 'pb', reset: 'largo' }),
        r(6, 'Fases Menguantes', 'adicional', 'Puedes cambiar de fase lunar gastando 1 punto de hechicería como Acción Adicional. Puedes lanzar el conjuro de nivel 1 asociado a tu fase actual gratis una vez al día.'),
        r(14, 'Empoderamiento Lunar', 'pasiva', 'Recibes bonificaciones basadas en tu fase actual: Luna Llena (Luz brillante, Ventaja en Investigar y Percibir), Luna Nueva (Ventaja en Sigilo, oponentes tienen Desventaja si estás a oscuras) y Cuarto Creciente (Resistencia necrótica y radiante).'),
        r(18, 'Fenómeno Lunar', 'adicional', 'Como Acción Adicional o cuando cambias de fase usando Fases Menguantes, puedes usar una poderosa habilidad explosiva para deslumbrar y curar (Llena), inmovilizar y hacerte invisible (Nueva) o teletransportarte con resistencia al daño (Creciente).', { usos: 1, reset: 'largo' })
      ]
    },
    'hechiceria-sombras': {
      n: 'Hechicería de las Sombras',
      rasgos: [
        r(3, 'Conjuros de las Sombras', 'pasiva', 'El Páramo Sombrío te otorga conjuros preparados para el sigilo, la ceguera y los horrores en los niveles 3, 5, 7 y 9.'),
        r(3, 'Poder de las Sombras', 'pasiva', 'Tienes visión en la oscuridad a 120 pies y vista ciega a 10 pies, y ves con normalidad dentro de la Oscuridad que crean tus conjuros. Si fueras a caer a 0 PG sin morir en el acto, puedes hacer una salvación de Carisma (CD 5 + el daño recibido): si la superas, tus PG quedan en tu modificador de Carisma + tu nivel de hechicero. Una vez por descanso largo.', { usos: 1, reset: 'largo' }),
        r(6, 'Bestias de Mal Agüero', 'adicional', 'Gastas 3 puntos de hechicería para lanzar Invocar bestia como acción adicional, sin espacio, sin tenerlo preparado y sin componentes materiales. La bestia es de sombra, y los enemigos a 5 pies de ella tienen desventaja en las salvaciones contra tus conjuros. Puedes lanzarlo sin concentración: entonces dura 1 minuto y termina si lo vuelves a lanzar.'),
        r(14, 'Paso Sombrío', 'adicional', 'Mientras estás en luz tenue u oscuridad, puedes usar una Acción Adicional para teletransportarte 120 pies a otro espacio que también esté poco iluminado o a oscuras.'),
        r(18, 'Forma Umbría', 'pasiva', 'Cuando activas Hechicería Innata, puedes volverte una sombra viviente. Tienes resistencia a todo el daño (excepto Radiante y Fuerza) y puedes atravesar materia (recibiendo daño si terminas dentro). Gratis una vez, o gastando 6 puntos.', { usos: 1, reset: 'largo' })
      ]
    },
    'fuego-conjuro': {
      n: 'Fuego de Conjuro',
      rasgos: [
        r(3, 'Conjuros de Fuego de Conjuro', 'pasiva', 'El acceso a la Urdimbre te otorga conjuros de fuego y restauración curativa en los niveles 3, 5, 7 y 9.'),
        r(3, 'Estallido de Fuego de Conjuro', 'pasiva', 'Una vez por turno, cuando gastas Puntos de Hechicería en tu turno, desencadenas un efecto: tú o un aliado a 30 pies ganan 1d4 + CAR de Puntos de Golpe temporales, o un enemigo a 30 pies recibe 1d4 daño Fuego/Radiante.'),
        r(6, 'Absorber Conjuros', 'pasiva', 'Siempre tienes preparado Contrahechizo. Cada vez que alguien falla su tirada para resistir tu Contrahechizo, recuperas 1d4 puntos de hechicería.'),
        r(14, 'Fuego de Conjuro Perfeccionado', 'pasiva', 'Sumas tu nivel de Hechicero a los PG temporales que das con el Estallido, y su daño aumenta a 1d8.'),
        r(18, 'Corona de Fuego de Conjuro', 'pasiva', 'Al usar Hechicería Innata, puedes potenciarla. Ganas vuelo de 60 pies, esquivas totalmente hechizos al pasar su tirada (o recibes solo mitad si fallas), y puedes gastar Dados de Golpe para bloquear daño recibido. Gratis una vez, o pagando 5 puntos.', { usos: 1, reset: 'largo' })
      ]
    },
    'tormenta': {
      n: 'Hechicería de la Tormenta',
      rasgos: [
        r(3, 'Hablante del Viento', 'pasiva', 'Hablas, lees y escribes primordial, y entiendes sus dialectos: acuano, aurano, ígneo y terrano.'),
        r(3, 'Magia Tempestuosa', 'adicional', 'Justo antes o después de lanzar un conjuro de nivel 1 o más, puedes usar una acción adicional para volar hasta 10 pies rodeado de ráfagas, sin provocar ataques de oportunidad.'),
        r(6, 'Corazón de la Tormenta', 'pasiva', 'Ganas resistencia al daño de relámpago y trueno. Cuando lanzas un conjuro de relámpago o trueno de nivel 1 o más, infliges daño de ese tipo (mitad de tu nivel) a enemigos a 10 pies.'),
        r(6, 'Guía de la Tormenta', 'accion', 'Puedes detener la lluvia a 20 pies de ti como acción y redirigir el viento a 100 pies como Acción Adicional.'),
        r(14, 'Furia de la Tormenta', 'reaccion', 'Como reacción al ser atacado cuerpo a cuerpo, infliges daño de relámpago igual a tu nivel al agresor e intentas empujarlo 20 pies (salvación FUE).'),
        r(18, 'Alma del Viento', 'accion', 'Obtienes inmunidad al daño por relámpago y trueno. Tienes velocidad de vuelo 60 pies. Una vez por descanso corto/largo, puedes reducir tu vuelo a 30 pies para dar 30 pies de vuelo a todo tu equipo por 1 hora.', { usos: 1, reset: 'corto' })
      ]
    }
  }
};
