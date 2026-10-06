=== A ===
export const lote36eDotes = {
  "Maestría Exótica (Exotic Mastery)": {
    texto: "Tienes práctica en el uso de armaduras pesadas y exóticas, y obtienes los siguientes beneficios:\n\n- Incrementa tu puntuación de Fuerza o Destreza en 1, hasta un máximo de 20.[cite: 3]\n- Obtienes competencia con 4 piezas de equipo exótico de tu elección.[cite: 3]"
  },
  "Artesano Dotado (Gifted Artisan)": {
    texto: "**Prerrequisitos:** Inteligencia 15 o superior, competencia con las herramientas de herrero.[cite: 3]\n\nHas descubierto los secretos para forjar armas o armaduras maestras únicas.[cite: 3] Cuando creas un objeto nuevo, puedes aplicarle un número de propiedades de obra maestra de Aprendiz igual a tu modificador de Inteligencia.[cite: 3] No aplicas un bonificador de Obra Maestra a los objetos que fabricas, a menos que tengas el nivel de artesano requerido para hacerlo.[cite: 3] Eres competente en el uso de cualquier equipo no exótico que fabriques.[cite: 3]"
  },
  "Maestro Artesano (Master Artisan)": {
    texto: "**Prerrequisito:** Competencia en dos o más juegos de herramientas de artesano.[cite: 3]\n\nComo un verdadero veterano de tu oficio, has elevado la industria a la categoría de arte.[cite: 3] Obtienes los siguientes beneficios:\n\n- Elige dos herramientas con las que seas competente. Obtienes pericia con esas herramientas, lo que significa que tu bonificador por competencia se duplica para cualquier prueba de característica que realices usándolas.[cite: 3] Las herramientas que elijas deben ser unas que no se beneficien ya de un rasgo (como Pericia) que duplique tu bonificador por competencia.[cite: 3]\n- Puedes improvisar cualquier juego de herramientas de artesano con el que seas competente.[cite: 3]\n- Como acción, puedes intentar fabricar cualquier objeto simple que normalmente podría ser fabricado por alguien de tu profesión.[cite: 3] Realiza una prueba de herramientas con CD 15 usando la característica correspondiente a tus herramientas.[cite: 3] Si tienes éxito, creas el objeto y debes pagar cualquier coste de materiales que se requeriría normalmente.[cite: 3] Una vez que hayas usado esta habilidad, debes completar un descanso largo antes de poder usarla de nuevo.[cite: 3]"
  }
};

export const lote36eConjuros = [
  {
    nombre: "Glifo de Alarma (Alarm Glyph)",
    nivel: 2,
    escuela: "Abjuración",
    tiempo: "10 minutos",
    alcance: "Toque",
    componentes: "V, S, M (diamante en polvo por valor de 100 po, que el conjuro consume)",
    duracion: "Hasta que se disipe",
    desc: "Este conjuro, basado en los conjuros *alarma* y *glifo custodio*, se utiliza para disuadir robos activando una alarma cuando un objeto es retirado de un lugar.[cite: 3] Viene en dos versiones: una que se lanza sobre una abertura, y otra que se lanza sobre un objeto.[cite: 3]\n\n- **Abertura:** Pasas diez minutos inscribiendo glifos invisibles en una abertura como una puerta, portón, ventana o arco de no más de 10 pies cuadrados.[cite: 3] Siempre que un objeto que lleve un glifo de alarma pase a través del área protegida, produce el sonido de una campanilla de mano durante 10 segundos en un radio de 120 pies.[cite: 3] Lanzar el conjuro *abrir* sobre la abertura suprime el efecto durante 10 minutos.[cite: 3]\n- **Objeto:** Pasas diez minutos inscribiendo un glifo invisible en un objeto.[cite: 3] Este objeto activará ahora cualquier abertura con alarma a través de la cual pase.[cite: 3]\n\n**En niveles superiores:** Cuando lanzas la versión de abertura de este conjuro usando un espacio de conjuro de nivel 3 o superior, puedes almacenar un conjuro de nivel 2 o inferior (normalmente *inmovilizar persona*) dentro de él.[cite: 3] Este conjuro debe poder tener como objetivo a una criatura, objeto o área, y debes gastar el espacio de conjuro y los componentes del conjuro correspondientes al almacenar el conjuro.[cite: 3] Este conjuro almacenado se lanza y se gasta la primera vez que se activa la alarma.[cite: 3] Si el objeto desencadenante lo lleva puesto o lo transporta alguien, el conjuro almacenado tiene como objetivo a quien lo lleve o el lugar donde esté de pie.[cite: 3] Si no, tiene como objetivo directamente al objeto.[cite: 3] Una vez gastado, el conjuro almacenado se puede reactivar (o cambiar por un conjuro diferente) tocando el glifo y gastando otro espacio de conjuro y componentes.[cite: 3]",
    clases: ["Artífice", "Bardo", "Brujo", "Clérigo", "Druida", "Explorador", "Hechicero", "Mago", "Paladín"]
  },
  {
    nombre: "Disipar Alarma (Dispel Alarm)",
    nivel: 2,
    escuela: "Abjuración",
    tiempo: "1 acción",
    alcance: "Toque",
    componentes: "V, S",
    duracion: "Instantánea",
    desc: "Tocas un objeto.[cite: 3] Si hay un glifo de alarma o un conjuro de *alarma* en el objeto, el conjuro se disipa.[cite: 3] Este conjuro solo puede usarse en la versión de objeto del glifo de alarma; la versión de abertura solo puede verse afectada por *disipar magia*.[cite: 3]",
    clases: ["Artífice", "Bardo", "Brujo", "Clérigo", "Druida", "Explorador", "Hechicero", "Mago", "Paladín"]
  },
  {
    nombre: "Duplicar Objeto (Duplicate Object)",
    nivel: 4,
    escuela: "Conjuración",
    tiempo: "1 minuto",
    alcance: "30 pies",
    componentes: "V, S, M (un espejo de plata)",
    duracion: "Instantánea",
    desc: "Creas una copia exacta de un objeto no mágico y sin vida que puedas ver dentro del alcance (la copia también debe aparecer dentro del alcance del conjuro).[cite: 3] El objeto debe caber dentro de un cubo de 5 pies y tener un valor no superior a 25 po.[cite: 3] La copia es un objeto real, permanente e independiente que funciona exactamente como el original.[cite: 3] No puedes duplicar un objeto creado por este conjuro.[cite: 3]\n\nSi el objeto que deseas copiar se consideraría un 'objeto complejo', debes tener competencia en las herramientas necesarias para duplicarlo usando este conjuro.[cite: 3]\n\nMateriales como la adamantina, madera fría, mitral y madera de zurkh se consideran mágicos a efectos de este conjuro.[cite: 3]\n\n**En niveles superiores:** Cuando lanzas este conjuro usando un espacio de conjuro de nivel 5 o superior, los lados del cubo en el que debe caber el objeto aumentan en 5 pies por cada nivel de espacio por encima del 4º, hasta un máximo de un cubo de 20 pies.[cite: 3] Por tanto, al lanzarlo a nivel 5, podrías duplicar un objeto que quepa en un cubo de 10 pies.[cite: 3]",
    clases: ["Artífice", "Bardo", "Brujo", "Clérigo", "Druida", "Explorador", "Hechicero", "Mago", "Paladín"]
  },
  {
    nombre: "Manipular Relojería (Manipulate Clockwork)",
    nivel: 0,
    escuela: "Transmutación",
    tiempo: "1 acción",
    alcance: "30 pies",
    componentes: "V, S",
    duracion: "1 ronda",
    desc: "Efectúas un cambio menor en un objeto de relojería de tamaño Pequeño o inferior dentro del alcance y que puedas ver.[cite: 3] Ejemplos de cosas que podrías hacer incluyen:\n\n- Hacer que la máquina funcione más rápido o más lento, hasta el doble o la mitad de su velocidad normal.[cite: 3]\n- Cambiar la hora mostrada en un reloj mecánico.[cite: 3]\n- Pulsar un interruptor o cambiar una configuración.[cite: 3]\n- Arrancar o detener el dispositivo.[cite: 3]\n\nNo puedes dañar ni destruir una máquina usando este conjuro.[cite: 3]",
    clases: ["Artífice", "Bardo", "Brujo", "Clérigo", "Druida", "Explorador", "Hechicero", "Mago", "Paladín"]
  },
  {
    nombre: "Trabajador Hacendoso de Safiya (Safiya's Industrious Worker)",
    nivel: 1,
    escuela: "Transmutación",
    tiempo: "10 minutos",
    alcance: "Toque",
    componentes: "V, S, M (una barra de hierro)",
    duracion: "8 horas",
    desc: "Tocas a una criatura voluntaria.[cite: 3] Durante las próximas 8 horas, puede realizar tareas manuales con una velocidad excepcional.[cite: 3]\n\nCada hora que pase fabricando objetos bajo los efectos de este conjuro equivale a 4 horas de producción.[cite: 3] Esto puede combinarse con otros efectos; por ejemplo, un personaje con pericia usando este conjuro produciría el equivalente a 8 horas de trabajo por cada hora.[cite: 3] Este conjuro no puede aumentar la velocidad a la que el objetivo fabrica o encanta objetos mágicos.[cite: 3]\n\n**En niveles superiores:** Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, puedes tener como objetivo a una criatura adicional por cada nivel de espacio por encima del 1º.[cite: 3]",
    clases: ["Artífice", "Bardo", "Brujo", "Clérigo", "Druida", "Explorador", "Hechicero", "Mago", "Paladín"]
  },
  {
    nombre: "Contable Invisible (Unseen Accountant)",
    nivel: 2,
    escuela: "Conjuración",
    tiempo: "1 acción (ritual)",
    alcance: "60 pies",
    componentes: "V, S, M (un ábaco)",
    duracion: "8 horas",
    desc: "Este conjuro crea una fuerza invisible y sin forma que realiza tareas intelectuales a tus órdenes hasta que finaliza el conjuro.[cite: 3] El sirviente aparece en un espacio desocupado en el suelo dentro del alcance.[cite: 3] Tiene CA 10, 1 punto de golpe, una Inteligencia de 12, y no puede atacar.[cite: 3] Si sus puntos de golpe se reducen a 0, el conjuro finaliza.[cite: 3]\n\nUna vez en cada uno de tus turnos, como acción adicional, puedes ordenar mentalmente al sirviente que se mueva hasta 15 pies e interactúe con un objeto.[cite: 3] El contable puede realizar tareas intelectuales que podría hacer un empleado humano, como evaluar precios, actualizar cuentas, gestionar inventarios o calcular intereses.[cite: 3] Una vez le das la orden, el contable realiza la tarea lo mejor que puede hasta completarla, y luego espera tu próxima orden.[cite: 3] El contable no puede realizar trabajo físico y no es capaz de levantar ningún objeto más pesado que un frasco de tinta.[cite: 3]\n\nSi le ordenas al contable realizar una tarea que lo aleje a más de 300 pies de ti, el conjuro finaliza.[cite: 3]",
    clases: ["Artífice", "Bardo", "Brujo", "Clérigo", "Druida", "Explorador", "Hechicero", "Mago", "Paladín"]
  }
];

export const lote36eReglas = {
  "Aprender Nuevas Habilidades (Learning New Skills)": "Si un personaje realiza más de 8 horas de actividad en un día, incluida la actividad intelectual como aprender un oficio, está sujeto a tiradas de salvación de Constitución como si estuviera realizando una marcha forzada.[cite: 3]"
};

=== B ===
{
  "dotes": [
    "Maestría Exótica (Exotic Mastery)",
    "Artesano Dotado (Gifted Artisan)",
    "Maestro Artesano (Master Artisan)"
  ]
}

=== C ===
{
  "lote36e-options": "Craftsman (Valda's Spire of Secrets)"
}

=== D ===
{
  "lote36e-options": "Dotes y nuevos conjuros temáticos orientados a la forja, la protección de objetos y la invención."
}

=== E ===
- **Resolución de Formato:** Para evitar las "burbujas" negras separadas que interrumpían la lectura en la interfaz, se ha envuelto la totalidad de las secciones A, B, C, D y E dentro de un único bloque de código Markdown maestro.
- **Regla Variante (Aprendizaje de Nuevas Habilidades):** Se incluyó la regla mecánica específica sobre la fatiga al estudiar más de 8 horas al día[cite: 3], sin embargo se omitieron los textos de ambientación para el DM (tutores, gremios y recompensas) al no ser opciones directas de selección de clase.
- **Clases para los Conjuros:** El texto original indica literalmente "The following spells are available to all spellcasters" (Los siguientes conjuros están disponibles para todos los lanzadores de conjuros)[cite: 3]. Por ello, se incluyeron todas las clases de lanzadores de conjuros estándar en el parámetro `clases` de cada conjuro.
- **Citas Obligatorias (`[cite: 3]`):** Tal y como exigen las directrices del sistema, se han insertado las citas correspondientes al final de cada oración o dato extraído directamente del Source 3.