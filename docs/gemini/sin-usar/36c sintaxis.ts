export const lote36eDotes = {
  "Maestría Exótica (Exotic Mastery)": {
    texto: `Tienes práctica en el uso de armaduras pesadas y exóticas, y obtienes los siguientes beneficios:

- Incrementa tu puntuación de Fuerza o Destreza en 1, hasta un máximo de 20.
- Obtienes competencia con 4 piezas de equipo exótico de tu elección.`
  },
  "Artesano Dotado (Gifted Artisan)": {
    texto: `**Prerrequisitos:** Inteligencia 15 o superior, competencia con las herramientas de herrero.

Has descubierto los secretos para forjar armas o armaduras maestras únicas. Cuando creas un objeto nuevo, puedes aplicarle un número de propiedades de obra maestra de Aprendiz igual a tu modificador de Inteligencia. No aplicas un bonificador de Obra Maestra a los objetos que fabricas, a menos que tengas el nivel de artesano requerido para hacerlo. Eres competente en el uso de cualquier equipo no exótico que fabriques.`
  },
  "Maestro Artesano (Master Artisan)": {
    texto: `**Prerrequisito:** Competencia en dos o más juegos de herramientas de artesano.

Como un verdadero veterano de tu oficio, has elevado la industria a la categoría de arte. Obtienes los siguientes beneficios:

- Elige dos herramientas con las que seas competente. Obtienes pericia con esas herramientas, lo que significa que tu bonificador por competencia se duplica para cualquier prueba de característica que realices usándolas. Las herramientas que elijas deben ser unas que no se beneficien ya de un rasgo (como Pericia) que duplique tu bonificador por competencia.
- Puedes improvisar cualquier juego de herramientas de artesano con el que seas competente.
- Como acción, puedes intentar fabricar cualquier objeto simple que normalmente podría ser fabricado por alguien de tu profesión. Realiza una prueba de herramientas con CD 15 usando la característica correspondiente a tus herramientas. Si tienes éxito, creas el objeto y debes pagar cualquier coste de materiales que se requeriría normalmente. Una vez que hayas usado esta habilidad, debes completar un descanso largo antes de poder usarla de nuevo.`
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
    desc: `Este conjuro, basado en los conjuros *alarma* y *glifo custodio*, se utiliza para disuadir robos activando una alarma cuando un objeto es retirado de un lugar. Viene en dos versiones: una que se lanza sobre una abertura, y otra que se lanza sobre un objeto.

- **Abertura:** Pasas diez minutos inscribiendo glifos invisibles en una abertura como una puerta, portón, ventana o arco de no más de 10 pies cuadrados. Siempre que un objeto que lleve un glifo de alarma pase a través del área protegida, produce el sonido de una campanilla de mano durante 10 segundos en un radio de 120 pies. Lanzar el conjuro *abrir* sobre la abertura suprime el efecto durante 10 minutos.
- **Objeto:** Pasas diez minutos inscribiendo un glifo invisible en un objeto. Este objeto activará ahora cualquier abertura con alarma a través de la cual pase.

**En niveles superiores:** Cuando lanzas la versión de abertura de este conjuro usando un espacio de conjuro de nivel 3 o superior, puedes almacenar un conjuro de nivel 2 o inferior (normalmente *inmovilizar persona*) dentro de él. Este conjuro debe poder tener como objetivo a una criatura, objeto o área, y debes gastar el espacio de conjuro y los componentes del conjuro correspondientes al almacenar el conjuro. Este conjuro almacenado se lanza y se gasta la primera vez que se activa la alarma. Si el objeto desencadenante lo lleva puesto o lo transporta alguien, el conjuro almacenado tiene como objetivo a quien lo lleve o el lugar donde esté de pie. Si no, tiene como objetivo directamente al objeto. Una vez gastado, el conjuro almacenado se puede reactivar (o cambiar por un conjuro diferente) tocando el glifo y gastando otro espacio de conjuro y componentes.`,
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
    desc: `Tocas un objeto. Si hay un glifo de alarma o un conjuro de *alarma* en el objeto, el conjuro se disipa. Este conjuro solo puede usarse en la versión de objeto del glifo de alarma; la versión de abertura solo puede verse afectada por *disipar magia*.`,
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
    desc: `Creas una copia exacta de un objeto no mágico y sin vida que puedas ver dentro del alcance (la copia también debe aparecer dentro del alcance del conjuro). El objeto debe caber dentro de un cubo de 5 pies y tener un valor no superior a 25 po. La copia es un objeto real, permanente e independiente que funciona exactamente como el original. No puedes duplicar un objeto creado por este conjuro.

Si el objeto que deseas copiar se consideraría un 'objeto complejo' (como se indica en las reglas de Herramientas del Oficio de artesanos), debes tener competencia en las herramientas necesarias para duplicarlo usando este conjuro.

Materiales como la adamantina, madera fría, mitral y madera de zurkh se consideran mágicos a efectos de este conjuro.

**En niveles superiores:** Cuando lanzas este conjuro usando un espacio de conjuro de nivel 5 o superior, los lados del cubo en el que debe caber el objeto aumentan en 5 pies por cada nivel de espacio por encima del 4º, hasta un máximo de un cubo de 20 pies. Por tanto, al lanzarlo a nivel 5, podrías duplicar un objeto que quepa en un cubo de 10 pies.`,
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
    desc: `Efectúas un cambio menor en un objeto de relojería de tamaño Pequeño o inferior dentro del alcance y que puedas ver. Ejemplos de cosas que podrías hacer incluyen:

- Hacer que la máquina funcione más rápido o más lento, hasta el doble o la mitad de su velocidad normal.
- Cambiar la hora mostrada en un reloj mecánico.
- Pulsar un interruptor o cambiar una configuración.
- Arrancar o detener el dispositivo.

No puedes dañar ni destruir una máquina usando este conjuro.`,
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
    desc: `Tocas a una criatura voluntaria. Durante las próximas 8 horas, puede realizar tareas manuales con una velocidad excepcional.

Cada hora que pase fabricando objetos bajo los efectos de este conjuro equivale a 4 horas de producción. Esto puede combinarse con otros efectos; por ejemplo, un personaje con pericia usando este conjuro produciría el equivalente a 8 horas de trabajo por cada hora. Este conjuro no puede aumentar la velocidad a la que el objetivo fabrica o encanta objetos mágicos.

**En niveles superiores:** Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, puedes tener como objetivo a una criatura adicional por cada nivel de espacio por encima del 1º.`,
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
    desc: `Este conjuro crea una fuerza invisible y sin forma que realiza tareas intelectuales a tus órdenes hasta que finaliza el conjuro. El sirviente aparece en un espacio desocupado en el suelo dentro del alcance. Tiene CA 10, 1 punto de golpe, una Inteligencia de 12, y no puede atacar. Si sus puntos de golpe se reducen a 0, el conjuro finaliza.

Una vez en cada uno de tus turnos, como acción adicional, puedes ordenar mentalmente al sirviente que se mueva hasta 15 pies e interactúe con un objeto. El contable puede realizar tareas intelectuales que podría hacer un empleado humano, como calcular precios, actualizar cuentas, gestionar inventarios o calcular intereses. Una vez le das la orden, el contable realiza la tarea lo mejor que puede hasta completarla, y luego espera tu próxima orden. El contable no puede realizar trabajo físico y no es capaz de levantar ningún objeto más pesado que un tintero de tinta.

Si le ordenas al contable realizar una tarea que lo aleje a más de 300 pies de ti, el conjuro finaliza.`,
    clases: ["Artífice", "Bardo", "Brujo", "Clérigo", "Druida", "Explorador", "Hechicero", "Mago", "Paladín"]
  }
];