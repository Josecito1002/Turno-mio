=== A ===

```ts
const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const HECHICERO_2024 = {
  rasgosAltos: [
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
        r(3, 'Magia Divina', 'pasiva', 'Conoces conjuros divinos basados en tu afinidad de alineamiento.'),
        r(6, 'Curación Potenciada', 'pasiva', 'Si tú o un aliado a 5 pies tiran dados para curarse con un conjuro, puedes gastar 1 punto de hechicería para repetir cualquier cantidad de esos dados. (Una vez por turno)'),
        r(14, 'Alas de Otro Mundo', 'adicional', 'Como Acción Adicional, invocas alas espectrales de tu espalda (según tu afinidad divina) que te dan una velocidad de vuelo de 30 pies. Duran hasta que las desestimes o caigas incapacitado.'),
        r(18, 'Recuperación Sobrenatural', 'adicional', 'Como Acción Adicional, si tienes menos de la mitad de tus Puntos de Golpe, puedes curarte una cantidad igual a la mitad de tus PG máximos.', { usos: 1, reset: 'largo' })
      ]
    },
    'lunar': {
      n: 'Hechicería Lunar',
      rasgos: [
        r(3, 'Encarnación Lunar', 'pasiva', 'Conoces conjuros adicionales y cambias tu magia en función de la fase de la luna (Llena, Nueva o Creciente).'),
        r(6, 'Favores Lunares', 'pasiva', 'Al usar Metamagia en escuelas afines a tu fase lunar actual, su coste se reduce en 1 punto (mínimo 0) un número de veces igual a tu competencia por descanso largo.', { usos: 'pb', reset: 'largo' }),
        r(6, 'Fases Menguantes', 'adicional', 'Puedes cambiar de fase lunar gastando 1 punto de hechicería como Acción Adicional. Puedes lanzar el conjuro de nivel 1 asociado a tu fase actual gratis una vez al día.'),
        r(14, 'Empoderamiento Lunar', 'pasiva', 'Recibes bonificaciones basadas en tu fase actual: Luna Llena (Luz brillante, Ventaja en Investigar y Percibir), Luna Nueva (Ventaja en Sigilo, oponentes tienen Desventaja si estás a oscuras) y Cuarto Creciente (Resistencia necrótica y radiante).'),
        r(18, 'Fenómeno Lunar', 'adicional', 'Como Acción Adicional o cuando cambias de fase usando Fases Menguantes, puedes usar una poderosa habilidad explosiva para deslumbrar y curar (Llena), inmovilizar y hacerte invisible (Nueva) o teletransportarte con resistencia al daño (Creciente).', { usos: 1, reset: 'largo' })
      ]
    },
    'sombras': {
      n: 'Hechicería de las Sombras',
      rasgos: [
        r(3, 'Conjuros de las Sombras', 'pasiva', 'El Páramo Sombrío te otorga conjuros preparados para el sigilo, la ceguera y los horrores en los niveles 3, 5, 7 y 9.'),
        r(3, 'Poder de las Sombras', 'pasiva', 'Tienes Visión en la oscuridad 120 pies, Visión Ciega 10 pies y puedes ver a través de los hechizos de Oscuridad que lances. Si tus PG caen a 0, puedes salvar Carisma para quedar a 1 PG (más CAR y Nivel).', { usos: 1, reset: 'largo' }),
        r(6, 'Bestias de Mal Agüero', 'adicional', 'Como Acción Adicional, puedes gastar 3 puntos de hechicería para lanzar Invocar bestia (Summon Beast) [NO ESTÁ EN LA APP] como una bestia de sombra; enemigos adyacentes a ella tienen Desventaja contra tus hechizos. Puedes lanzarlo sin concentración por 1 minuto.'),
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
        r(3, 'Magia de la Tormenta', 'pasiva', 'El trueno y el viento impulsan tu magia y movimiento.'),
        r(6, 'Corazón de la Tormenta', 'pasiva', 'Ganas resistencia al daño de relámpago y trueno. Cuando lanzas un conjuro de relámpago o trueno de nivel 1 o más, infliges daño de ese tipo (mitad de tu nivel) a enemigos a 10 pies.'),
        r(6, 'Guía de la Tormenta', 'accion', 'Puedes detener la lluvia a 20 pies de ti como acción y redirigir el viento a 100 pies como Acción Adicional.'),
        r(14, 'Furia de la Tormenta', 'reaccion', 'Como reacción al ser atacado cuerpo a cuerpo, infliges daño de relámpago igual a tu nivel al agresor e intentas empujarlo 20 pies (salvación FUE).'),
        r(18, 'Alma del Viento', 'accion', 'Obtienes inmunidad al daño por relámpago y trueno. Tienes velocidad de vuelo 60 pies. Una vez por descanso corto/largo, puedes reducir tu vuelo a 30 pies para dar 30 pies de vuelo a todo tu equipo por 1 hora.', { usos: 1, reset: 'corto' })
      ]
    }
  }
};

```

=== B ===

```json
[
  { "donde": "clase", "rasgo": "Hechicería Encarnada", "tipo": "otro", "detalle": "Permite activar Hechicería Innata por 2 puntos de hechicería" },
  { "donde": "clase", "rasgo": "Metamagia", "tipo": "eleccion", "id": "metamagia-opciones", "cuantas": "2; 4 desde nivel 10; 6 desde nivel 17",
    "opciones": [
      { "key": "met-cuidadoso", "nombre": "Conjuro Cuidadoso", "desc": "Gasta 1 PH para que aliados (hasta mod CAR) pasen automáticamente la salvación y reciban 0 daño.", "nivel": 2, "requiere": null },
      { "key": "met-distante", "nombre": "Conjuro Distante", "desc": "Gasta 1 PH para duplicar el alcance, o volver de 30 pies un conjuro de toque.", "nivel": 2, "requiere": null },
      { "key": "met-potenciado", "nombre": "Conjuro Potenciado", "desc": "Gasta 1 PH para repetir dados de daño (hasta mod CAR). Puede combinarse.", "nivel": 2, "requiere": null },
      { "key": "met-extendido", "nombre": "Conjuro Extendido", "desc": "Gasta 1 PH para duplicar la duración (máximo 24h) y darte ventaja en mantener concentración.", "nivel": 2, "requiere": null },
      { "key": "met-intensificado", "nombre": "Conjuro Intensificado", "desc": "Gasta 2 PH para dar Desventaja en la salvación a un objetivo.", "nivel": 2, "requiere": null },
      { "key": "met-acelerado", "nombre": "Conjuro Acelerado", "desc": "Gasta 2 PH para que un conjuro de 1 Acción cueste 1 Acción Adicional.", "nivel": 2, "requiere": null },
      { "key": "met-buscador", "nombre": "Conjuro Buscador", "desc": "Gasta 1 PH para repetir una tirada de ataque fallada. Puede combinarse.", "nivel": 2, "requiere": null },
      { "key": "met-sutil", "nombre": "Conjuro Sutil", "desc": "Gasta 1 PH para lanzar sin componentes verbales/somáticos ni materiales sin coste.", "nivel": 2, "requiere": null },
      { "key": "met-transmutado", "nombre": "Conjuro Transmutado", "desc": "Gasta 1 PH para cambiar un tipo de daño elemental al lanzarlo.", "nivel": 2, "requiere": null },
      { "key": "met-duplicado", "nombre": "Conjuro Duplicado", "desc": "Gasta 1 PH para que un conjuro capaz de escalarse afecte a un objetivo extra como si usaras un espacio de +1 nivel.", "nivel": 2, "requiere": null }
    ]
  },
  { "donde": "draconico", "rasgo": "Conjuros dracónicos", "tipo": "conjuros", "por_nivel": { "3": ["Alterar el propio aspecto", "Orbe cromático", "Orden imperiosa", "Aliento de Dragón"], "5": ["Miedo", "Volar"], "7": ["Ojo arcano", "Hechizar monstruo"], "9": ["Conocer las leyendas", "Invocar dragón"] } },
  { "donde": "aberrante", "rasgo": "Conjuros Psiónicos", "tipo": "conjuros", "por_nivel": { "3": ["Brazos de Hadar", "Calmar emociones", "Detectar pensamientos", "Susurros discordantes", "Fragmento Mental"], "5": ["Hambre de Hadar", "Enviar mensaje (NO ESTÁ EN LA APP)"], "7": ["Tentáculos negros de Evard", "Invocar aberración"], "9": ["Enlace telepático de Rary", "Telequinesis"] } },
  { "donde": "aberrante", "rasgo": "Implosión Deformadora", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "reloj", "rasgo": "Conjuros del Reloj", "tipo": "conjuros", "por_nivel": { "3": ["Auxilio", "Alarma", "Restablecimiento menor", "Protección contra el bien y el mal"], "5": ["Disipar magia", "Protección contra energía"], "7": ["Libertad de movimiento", "Invocar autómata"], "9": ["Restablecimiento mayor", "Muro de fuerza"] } },
  { "donde": "reloj", "rasgo": "Restaurar el Equilibrio", "tipo": "usos", "usos": "max(1, CAR)", "reset": "largo" },
  { "donde": "alma-divina", "rasgo": "Recuperación Sobrenatural", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "lunar", "rasgo": "Favores Lunares", "tipo": "usos", "usos": "pb", "reset": "largo" },
  { "donde": "sombras", "rasgo": "Conjuros de las Sombras", "tipo": "conjuros", "por_nivel": { "3": ["Perdición", "Oscuridad", "Infligir heridas", "Pasar sin rastro"], "5": ["Hambre de Hadar", "Antidetección (NO ESTÁ EN LA APP)"], "7": ["Invisibilidad mejorada", "Asesino fantasmal"], "9": ["Contagio", "Creación"] } },
  { "donde": "fuego-conjuro", "rasgo": "Conjuros de Fuego de Conjuro", "tipo": "conjuros", "por_nivel": { "3": ["Curar heridas", "Rayo guía", "Restablecimiento menor", "Rayo abrasador"], "5": ["Aura de vitalidad", "Disipar magia"], "7": ["Escudo de fuego", "Muro de fuego"], "9": ["Restablecimiento mayor", "Golpe Flamígero"] } },
  { "donde": "fuego-conjuro", "rasgo": "Corona de Fuego de Conjuro", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "tormenta", "rasgo": "Alma del Viento", "tipo": "usos", "usos": "1", "reset": "corto" }
]

```

=== C ===

```json
{
  "Hechicería Aberrante": "Manual del Jugador (2024)",
  "Hechicería del Reloj": "Manual del Jugador (2024)",
  "Alma Divina": "Xanathar's Guide to Everything (2017)",
  "Hechicería Dracónica": "Manual del Jugador (2024)",
  "Hechicería Lunar": "Dragonlance: Shadow of the Dragon Queen (2022)",
  "Hechicería de las Sombras": "Ravenloft: The Horrors Within (2026)",
  "Fuego de Conjuro": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Hechicería de la Tormenta": "Xanathar's Guide to Everything (2017)",
  "Magia Salvaje": "Manual del Jugador (2024)"
}

```

=== D ===

```json
{
  "aberrante": "Mágicos que despertaron poderes telepáticos y psiónicos a través de entidades alienígenas o del Lejano Reino, controlando mentes y alterando cuerpos.",
  "reloj": "Conductos de la energía cósmica de Mechanus, protegen a sus aliados mediante escudos matemáticos y aseguran el equilibrio anulando la suerte del caos.",
  "alma-divina": "Vasijas mortales de poder divino. Poseen magia curativa e invocar alas celestiales.",
  "draconico": "Herederos del poder latente de los dragones, resisten daños elementales y escupen magia de destrucción y terror.",
  "lunar": "Hechiceros versátiles cuyas aptitudes mutan de acuerdo a las fases lunares: Luz y purificación con Llena, Sombras y veneno con Nueva.",
  "sombras": "Sobrevivientes imbuidos con la energía nigromántica del Páramo Sombrío, controlando oscuridad, bestias de sombra y evitando la muerte.",
  "fuego-conjuro": "Canalizadores del fuego primordial, curan o queman a quienes los rodean y absorben magia ajena contrarrestándola.",
  "tormenta": "Conectados a la esencia del clima, usan magia elemental ruidosa para golpear a varios y volar desatando la tormenta.",
  "salvaje": "Conductos inestables de magia cruda, propensos a invocar efectos mágicos azarosos, absurdos o devastadores que desafían toda regla."
}

```

=== E ===

* **Hechicería Innata (Clase base 2024):** Este rasgo reemplazó a muchas reglas pasivas y mecánicas extra de ediciones anteriores. Como su duración es sólo de 1 minuto, ahora influye en Nivel 7 y Nivel 20 (donde antes esos niveles daban mejoras directas a Puntos de Hechicería). Los efectos de la app a Nivel 7 y 20 se han rescrito a la versión oficial.
* **Metamagia (Nivel 2):** Se han extraído todas las Metamagias como opciones "eleccion" en Mecánicas (el formato que usa la app) y se corrigió el Nivel de obtención de la tercer metamagia para la app: a Nivel 10 da otras dos, y en 17 las últimas dos. (El texto oficial dicta reemplazar el rasgo de nivel 10). Se cambiaron nombres a las metamagias y los costes y efectos a la versión 2024.
* **Dracónico (Integrada):** Los conjuros siempre preparados dracónicos que tenía la app eran diferentes a los del Manual 2024. Los corregí en las Mecánicas de Conjuros. A nivel 14, las *Alas de Dragón* ya no son permanentes; son una acción adicional que dura 1 hora y se recarga con puntos. El Nivel 18 *Compañero Dragón* es un rasgo totalmente nuevo, reemplazando *Presencia Dracónica*.
* **Magia Salvaje (Integrada):** "Doblegar la Suerte" (nivel 6) fue cambiado en 2024: ahora se hace la alteración de tiradas con el uso de un solo punto de hechicería en lugar de dos. A Nivel 18 ahora el rasgo otorga "Oleada Domada" (Tamed Surge) en lugar de "Spell Bombardment".
* **Hechicería Aberrante & del Reloj:** Se reemplazó el texto del libro "Tasha's" por el "Manual del Jugador 2024", ya que estas dos subclases se integraron en el manual base con ligeras alteraciones para adaptarse a "Hechicería Innata".
* **Nombres de conjuros:** Traducidos cuidadosamente a la terminología de "Conjuros de la app". Para el Aberrante (Sending) y las Sombras (Nondetection / Summon Beast) marqué explícitamente "NO ESTÁ EN LA APP" porque la app carecía de sus correspondencias exactas en su base de datos.
* **Subclase Fuego de Conjuro:** El rasgo de Nivel 18 hace referencia explícita a la "Hechicería Innata" de la clase de 2024, indicando que es material de la revisión. El daño a los PG Temporales cambia su estructura y lo asimilé a las variables de la app.