=== A ===
TypeScript

const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const EXPLORADOR_2024 = {
  rasgosAltos: [
    r(6, 'Errante', 'pasiva', 'Tu velocidad aumenta en 10 pies mientras no uses armadura pesada. Además, obtienes una velocidad de trepar y de nadar iguales a tu velocidad terrestre.'),
    r(9, 'Pericia', 'pasiva', 'Elige dos de tus competencias en habilidades en las que no tengas Pericia y obtienes Pericia en ellas.'),
    r(10, 'Incansable', 'accion', 'Como acción mágica, puedes obtener Puntos de Golpe temporales. Además, siempre que termines un Descanso Corto, tu nivel de Agotamiento (si tienes alguno) se reduce en 1.', { usos: 'max(1, SAB)', reset: 'largo' }),
    r(13, 'Cazador Implacable', 'pasiva', 'Recibir daño no puede romper tu Concentración en el conjuro Marca del cazador.'),
    r(14, 'Velo de la Naturaleza', 'adicional', 'Invocas espíritus naturales para ocultarte mágicamente. Como Acción Adicional, obtienes el estado Invisible hasta el final de tu siguiente turno.', { usos: 'max(1, SAB)', reset: 'largo' }),
    r(17, 'Cazador Preciso', 'pasiva', 'Tienes Ventaja en las tiradas de ataque contra la criatura que esté marcada actualmente por tu Marca del cazador.'),
    r(18, 'Sentidos Salvajes', 'pasiva', 'Tu conexión con las fuerzas de la naturaleza te otorga Visión ciega con un alcance de 30 pies.'),
    r(20, 'Cazador de Enemigos', 'pasiva', 'El dado de daño extra de tu conjuro Marca del cazador pasa de ser un d6 a ser un d10.')
  ],
  subAltos: {},
  subclases: {
    'bestias': {
      n: 'Maestro de Bestias',
      rasgos: [
        r(3, 'Compañero Primigenio', 'adicional', 'Invocas mágicamente una bestia primigenia (de tierra, mar o cielo) que te obedece y actúa en tu turno. Si no usas tu Acción Adicional o sacrificas uno de tus ataques para darle una orden, solo tomará la acción de Esquivar. Puedes revivirla o cambiarla gastando magia o tras un Descanso Largo.'),
        r(7, 'Entrenamiento Excepcional', 'pasiva', 'Cuando usas tu Acción Adicional para ordenarle a tu bestia que actúe, también puedes ordenarle que Corra, se Destrabe, Esquive o Ayude. Además, sus ataques pueden infligir daño de Fuerza en lugar de su tipo normal.'),
        r(11, 'Furia de Bestia', 'pasiva', 'Cuando ordenas a tu bestia usar su ataque, puede atacar dos veces. La primera vez en el turno que golpee a un objetivo bajo tu Marca del cazador, inflige daño extra de Fuerza igual al daño de tu Marca.'),
        r(15, 'Compartir Conjuros', 'pasiva', 'Cuando lanzas un conjuro que te tiene a ti como objetivo, también puedes hacer que afecte a tu bestia si está a 30 pies o menos de ti.')
      ]
    },
    'hadas': {
      n: 'Caminante de las Hadas',
      rasgos: [
        r(3, 'Conjuros del Caminante de las Hadas', 'pasiva', 'La magia de las hadas te otorga conjuros siempre preparados en los niveles 3, 5, 9, 13 y 17.'),
        r(3, 'Golpes Pavorosos', 'pasiva', 'Tus ataques canalizan magia que daña la mente. Una vez por turno, cuando golpeas a una criatura con un arma, infliges 1d4 de daño Psíquico adicional (aumenta a 1d6 a nivel 11).'),
        r(3, 'Glamour de Otro Mundo', 'pasiva', 'Ganas una bendición feérica y sumas tu modificador de Sabiduría a todas tus pruebas de Carisma. También obtienes competencia en Engaño, Interpretación o Persuasión.'),
        r(7, 'Giro Engañoso', 'reaccion', 'Tienes Ventaja para evitar o terminar estados de Hechizado o Asustado. Si alguien a 120 pies supera una salvación contra estos estados, puedes usar tu Reacción para forzar a otra criatura a hacer una salvación de Sabiduría o quedar Hechizada o Asustada por 1 minuto.'),
        r(11, 'Refuerzos Feéricos', 'pasiva', 'Puedes lanzar Invocar feérico sin componentes materiales y una vez sin gastar espacio de conjuro. Al lanzarlo, puedes elegir que dure 1 minuto sin requerir concentración.', { usos: 1, reset: 'largo' }),
        r(15, 'Caminante Nebuloso', 'adicional', 'Puedes lanzar Paso brumoso sin gastar espacio de conjuro un número de veces igual a tu SAB. Cuando lo haces, puedes llevar contigo a una criatura voluntaria a 5 pies de ti.', { usos: 'max(1, SAB)', reset: 'largo' })
      ]
    },
    'sombras': {
      n: 'Acechador de las Sombras',
      rasgos: [
        r(3, 'Conjuros del Acechador de las Sombras', 'pasiva', 'La magia oscura te otorga conjuros siempre preparados en los niveles 3, 5, 9, 13 y 17.'),
        r(3, 'Emboscador Temible', 'pasiva', 'Sumas tu Sabiduría a la Iniciativa y tu velocidad aumenta 10 pies en tu primer turno. Al impactar, puedes infligir 2d6 de daño Psíquico adicional (limitado a tus usos por descanso).', { usos: 'max(1, SAB)', reset: 'largo' }),
        r(3, 'Vista Umbría', 'pasiva', 'Obtienes Visión en la oscuridad a 60 pies (o la aumentas en 60 pies). Además, eres invisible para las criaturas que dependan de visión en la oscuridad para verte en la oscuridad total.'),
        r(7, 'Mente de Hierro', 'pasiva', 'Has perfeccionado tu resistencia contra poderes que alteran la mente. Obtienes competencia en tiradas de salvación de Sabiduría (o Inteligencia/Carisma si ya la tenías).'),
        r(11, 'Ráfaga del Acechador', 'pasiva', 'El daño psíquico de tu Emboscador Temible aumenta a 2d8. Al usarlo, también puedes elegir hacer un ataque adicional a otro enemigo a 5 pies o forzar a los enemigos cercanos al objetivo a hacer una salvación o asustarse.'),
        r(15, 'Evasión Sombría', 'reaccion', 'Cuando una criatura te ataque, puedes usar tu Reacción para imponerle Desventaja en la tirada. Acierte o falle, luego puedes teletransportarte hasta 30 pies a un lugar desocupado.')
      ]
    },
    'guardian-hueco': {
      n: 'Guardián Hueco',
      rasgos: [
        r(3, 'Conjuros del Guardián Hueco', 'pasiva', 'Los horrores antiguos te otorgan conjuros siempre preparados en los niveles 3, 5, 9, 13 y 17.'),
        r(3, 'Ira de lo Salvaje', 'adicional', 'Como Acción Adicional, gastas [NO CONFIRMADO] un uso de XPHB para transformarte por 1 minuto asumiendo una forma espantosa. Obtienes +1 a la CA (aumenta a +2 a nivel 11), ataques de oportunidad al recibir daño, y asustas a los enemigos a 10 pies al inicio de tus turnos.'),
        r(7, 'Poder Hambriento', 'pasiva', 'Sumas tu Sabiduría a las salvaciones de Constitución. Al estar transformado y Ensangrentado, curas 1d10 + SAB la primera vez que golpeas en el turno.'),
        r(11, 'Putrefacción y Violencia', 'pasiva', 'En tu forma espantosa, los enemigos asustados por tu aura no pueden curarse ni reaccionar. Además, al golpear puedes aplicar la maestría de armas de Ralentizar o Mermar junto con otra maestría.'),
        r(15, 'Poder Antiguo', 'pasiva', 'Eres inmune al Agotamiento. Infliges daño extra igual a tu SAB a criaturas asustadas. Si caes a 0 PG estando transformado, en su lugar te recuperas con PG iguales al doble de tu nivel de Explorador.', { usos: 1, reset: 'largo' })
      ]
    },
    'cazador': {
      n: 'Cazador',
      rasgos: [
        r(3, 'Presa del Cazador', 'pasiva', 'Eliges una táctica: Asesino de Colosos (daño extra a criaturas heridas) o Rompehordas (ataque extra a otro enemigo cercano). Puedes cambiar de táctica en cada Descanso Corto o Largo.'),
        r(3, 'Saber del Cazador', 'pasiva', 'Tu conexión con la naturaleza te revela los secretos de tu presa. Mientras una criatura esté marcada por tu Marca del cazador, conoces todas sus inmunidades, resistencias y vulnerabilidades.'),
        r(7, 'Tácticas Defensivas', 'pasiva', 'Eliges una defensa: Escapar de la Horda (desventaja en ataques de oportunidad contra ti) o Defensa Contra Multiataques (quien te golpee tiene desventaja en sus siguientes ataques este turno). Cambias de táctica al descansar.'),
        r(11, 'Presa del Cazador Superior', 'pasiva', 'Una vez por turno, cuando infliges daño a la criatura marcada por tu Marca del cazador, puedes aplicar también el daño extra del conjuro a una segunda criatura que puedas ver a 30 pies de la original.'),
        r(15, 'Defensa Superior del Cazador', 'reaccion', 'Cuando recibes daño, puedes usar tu Reacción para obtener Resistencia a ese daño y a cualquier otro del mismo tipo hasta el final de tu turno actual.')
      ]
    },
    'caminante-invierno': {
      n: 'Caminante del Invierno',
      rasgos: [
        r(3, 'Conjuros del Caminante del Invierno', 'pasiva', 'La hostilidad del frío te otorga conjuros siempre preparados en los niveles 3, 5, 9, 13 y 17.'),
        r(3, 'Explorador Gélido', 'pasiva', 'Tienes resistencia al frío y tus ataques/conjuros ignoran la resistencia al frío del enemigo. Además, una vez por turno al golpear, infliges 1d4 de daño de Frío adicional (aumenta a 1d6 a nivel 11).'),
        r(3, 'Escarcha del Cazador', 'pasiva', 'El hielo te protege. Cuando lanzas Marca del cazador, ganas 1d10 + nivel en Puntos de Golpe Temporales. La criatura marcada no puede usar la acción de Destrabarse.'),
        r(7, 'Alma Fortalecedora', 'accion', 'Como acción mágica, sanas a un número de criaturas igual a tu SAB. Cada una recupera 1d10 + nivel de Explorador en PG y tiene Ventaja en salvaciones contra el miedo por 1 hora.', { usos: 1, reset: 'largo' }),
        r(11, 'Retribución Helada', 'reaccion', 'Cuando te golpean, usas tu Reacción para forzar al atacante a una salvación de Sabiduría; si falla, queda Aturdido hasta el final de tu próximo turno y su velocidad es 0.', { usos: 'max(1, SAB)', reset: 'largo' }),
        r(15, 'Aparición Congelada', 'pasiva', 'Al lanzar Marca del cazador, adoptas una forma fantasmal nevada. Te vuelves inmune al daño de Frío, infliges daño pasivo a tu alrededor, eres inmune a ser Derribado, Agarrado o Apresado y puedes atravesar materia física.', { usos: 1, reset: 'largo' })
      ]
    }
  }
};

=== B ===
JSON

[
  { "donde": "clase", "rasgo": "Incansable", "tipo": "usos", "usos": "max(1, SAB)", "reset": "largo" },
  { "donde": "clase", "rasgo": "Incansable", "tipo": "pg", "detalle": "1d8 + SAB" },
  { "donde": "clase", "rasgo": "Velo de la Naturaleza", "tipo": "usos", "usos": "max(1, SAB)", "reset": "largo" },
  { "donde": "clase", "rasgo": "Cazador de Enemigos", "tipo": "dado", "dado": "1d10" },
  { "donde": "bestias", "rasgo": "Compañero Primigenio", "tipo": "eleccion", "id": "tipo-bestia", "cuantas": "1",
    "opciones": [
      { "key": "bestia-tierra", "nombre": "Bestia de Tierra", "desc": "Espíritu con forma terrestre.", "nivel": 3, "requiere": null },
      { "key": "bestia-mar", "nombre": "Bestia de Mar", "desc": "Espíritu con forma acuática.", "nivel": 3, "requiere": null },
      { "key": "bestia-cielo", "nombre": "Bestia de Cielo", "desc": "Espíritu con forma voladora.", "nivel": 3, "requiere": null }
    ]
  },
  { "donde": "hadas", "rasgo": "Conjuros del Caminante de las Hadas", "tipo": "conjuros", "por_nivel": { "3": ["Hechizar persona"], "5": ["Paso brumoso"], "9": ["Invocar feérico (NO ESTÁ EN LA APP)"], "13": ["Puerta dimensional"], "17": ["Engañar"] } },
  { "donde": "hadas", "rasgo": "Golpes Pavorosos", "tipo": "daño", "daño": "1d4; 1d6 desde nivel 11" },
  { "donde": "hadas", "rasgo": "Glamour de Otro Mundo", "tipo": "eleccion", "id": "habilidad-hadas", "cuantas": "1",
    "opciones": [
      { "key": "hadas-engano", "nombre": "Engaño", "desc": "Competencia en Engaño.", "nivel": 3, "requiere": null },
      { "key": "hadas-interpretacion", "nombre": "Interpretación", "desc": "Competencia en Interpretación.", "nivel": 3, "requiere": null },
      { "key": "hadas-persuasion", "nombre": "Persuasión", "desc": "Competencia en Persuasión.", "nivel": 3, "requiere": null }
    ]
  },
  { "donde": "hadas", "rasgo": "Caminante Nebuloso", "tipo": "usos", "usos": "max(1, SAB)", "reset": "largo" },
  { "donde": "sombras", "rasgo": "Conjuros del Acechador de las Sombras", "tipo": "conjuros", "por_nivel": { "3": ["Disfrazarse"], "5": ["Truco de la cuerda"], "9": ["Miedo"], "13": ["Invisibilidad mejorada"], "17": ["Apariencia"] } },
  { "donde": "sombras", "rasgo": "Emboscador Temible", "tipo": "usos", "usos": "max(1, SAB)", "reset": "largo" },
  { "donde": "sombras", "rasgo": "Emboscador Temible", "tipo": "daño", "daño": "2d6; 2d8 desde nivel 11" },
  { "donde": "sombras", "rasgo": "Vista Umbría", "tipo": "vision", "detalle": "Visión en la oscuridad 60 pies (o suma 60 pies a la actual)" },
  { "donde": "guardian-hueco", "rasgo": "Conjuros del Guardián Hueco", "tipo": "conjuros", "por_nivel": { "3": ["Castigo furioso"], "5": ["Alterar el propio aspecto"], "9": ["Corcel fantasma"], "13": ["Dominar bestia"], "17": ["Golpe de Viento Acerado"] } },
  { "donde": "guardian-hueco", "rasgo": "Poder Hambriento", "tipo": "daño", "daño": "1d10 + SAB" },
  { "donde": "cazador", "rasgo": "Presa del Cazador", "tipo": "eleccion", "id": "presa-cazador", "cuantas": "1",
    "opciones": [
      { "key": "asesino-colosos", "nombre": "Asesino de Colosos", "desc": "+1d8 daño si el objetivo ya está herido (1/turno).", "nivel": 3, "requiere": null },
      { "key": "rompehordas", "nombre": "Rompehordas", "desc": "Puedes hacer un ataque extra a otro enemigo cercano a tu objetivo original.", "nivel": 3, "requiere": null }
    ]
  },
  { "donde": "cazador", "rasgo": "Tácticas Defensivas", "tipo": "eleccion", "id": "defensa-cazador", "cuantas": "1",
    "opciones": [
      { "key": "escapar-horda", "nombre": "Escapar de la Horda", "desc": "Ataques de oportunidad en tu contra tienen Desventaja.", "nivel": 7, "requiere": null },
      { "key": "defensa-multiataque", "nombre": "Defensa contra Multiataques", "desc": "Cuando te golpean, el enemigo tiene Desventaja en todos sus ataques restantes contra ti este turno.", "nivel": 7, "requiere": null }
    ]
  },
  { "donde": "caminante-invierno", "rasgo": "Conjuros del Caminante del Invierno", "tipo": "conjuros", "por_nivel": { "3": ["Cuchillo de hielo"], "5": ["Inmovilizar persona"], "9": ["Levantar maldición"], "13": ["Tormenta de hielo"], "17": ["Cono de frío"] } },
  { "donde": "caminante-invierno", "rasgo": "Explorador Gélido", "tipo": "daño", "daño": "1d4; 1d6 desde nivel 11" },
  { "donde": "caminante-invierno", "rasgo": "Escarcha del Cazador", "tipo": "pg", "detalle": "1d10 + nivel" },
  { "donde": "caminante-invierno", "rasgo": "Alma Fortalecedora", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "caminante-invierno", "rasgo": "Retribución Helada", "tipo": "usos", "usos": "max(1, SAB)", "reset": "largo" }
]

=== C ===
JSON

{
  "Maestro de Bestias": "Manual del Jugador (2024)",
  "Caminante de las Hadas": "Manual del Jugador (2024)",
  "Acechador de las Sombras": "Manual del Jugador (2024)",
  "Guardián Hueco": "Ravenloft: The Horrors Within (2026)",
  "Cazador": "Manual del Jugador (2024)",
  "Caminante del Invierno": "Forgotten Realms: Heroes of Faerûn (2025)"
}

=== D ===
JSON

{
  "bestias": "Forjan un poderoso vínculo primordial con el espíritu de una bestia mágica que lucha codo a codo junto a ellos.",
  "hadas": "Canalizan la magia del mundo de las hadas, usando engaños, ilusiones, y ataques psíquicos para atemorizar a sus enemigos.",
  "sombras": "Maestros de la oscuridad que operan de manera invisible en las sombras, emboscando brutalmente a los enemigos en el primer turno.",
  "guardian-hueco": "Asumen transformaciones aterradoras potenciadas por horrores antiguos, devorando y aterrorizando a sus oponentes.",
  "cazador": "Especialistas en combate que emplean técnicas expertas para destruir gigantes, exterminar hordas y encontrar las debilidades del enemigo.",
  "caminante-invierno": "Sobrevivientes glaciales que utilizan hielo mágico y frío penetrante para congelar y ralentizar a sus presas."
}

=== E ===

    Errante (Nivel 6): Actualizado en la app: ya no da +10 incondicional, ahora aplica solo "mientras no uses armadura pesada".

    Incansable (Nivel 10): Se aclara que los usos son fijos por descanso Largo basados en tu mod de Sabiduría.

    Ocultarse a Plena Vista (Nivel 10): [ELIMINADO] Este rasgo fue removido completamente de la clase en las reglas de 2024 y ya no debe existir en la app.

    Velo de la Naturaleza (Nivel 14): Se le asignaron sus usos limitados basados en Sabiduría, algo que faltaba en la app actual.

    Marca del Cazador (Nivel 1): El texto que tiene la app actual incluye "ventaja en Percepción" en la descripción del rasgo, cuando en realidad eso es un efecto del propio conjuro. Además, la tabla oficial 2024 indica que tienes usos gratuitos por descanso Largo que escalan, lo cual no pude incluir en las mecánicas JSON porque el texto no facilitó la tabla numérica, pero debería revisarse.

    Cazador (Nivel 3, 11 y 15): La táctica Asesino de Gigantes fue eliminada en 2024; ahora solo están Asesino de Colosos y Rompehordas. Su Nivel 11 ya no da el conjuro Conjurar Descarga, sino la capacidad de propagar Marca del Cazador, y su Defensa de Nivel 15 pasó a ser una reacción para obtener resistencia a un tipo de daño.

    Acechador de las Sombras (Niveles 3, 7 y 11): El rasgo Nivel 3 (Emboscador Temible) ahora requiere usar usos limitados (SAB) para causar el daño extra y hace daño Psíquico (2d6 escalando a 2d8), en lugar de estar siempre activo el primer turno. Nivel 7 es ahora Mente de Hierro (salvaciones de Sabiduría). Nivel 11 fue rediseñado.

    Conjuros Modificados: He adaptado los nombres requeridos, señalando Invocar feérico (NO ESTÁ EN LA APP) porque no aparecía exactamente en la lista suministrada (Summon Fey). Asigné "Levantar maldición" para el Caminante del Invierno en vez de "Quitar Maldición".

    Subclases Mencionadas sin Texto: Las subclases Drakewarden, Horizon Walker, Monster Slayer, y Swarmkeeper estaban listadas en los títulos pero el documento entregado no incluyó sus textos descriptivos. Siguiendo la regla de no inventar y hacer "una subclase por cada subclase del texto oficial", no se generó JSON ni código TypeScript para ellas, pero sus referencias originales deben respetarse si se extraen posteriormente.

    Nota [NO CONFIRMADO]: En Guardián Hueco Nivel 3, el texto inglés indica "expend a use of XPHB", probablemente un error tipográfico del material original que refería a la Marca del Cazador u otro recurso; se transcribió literalmente como "[NO CONFIRMADO]".