/* Explorador de la biblioteca puesto al día con su versión oficial más reciente (texto oficial de 5etools, redactado por
   Gemini y revisado con scripts/gemini/revisar.ts). Libros: Manual del Jugador (2024); Ravenloft: The Horrors Within (2026); Forgotten Realms: Heroes of Faerûn (2025).
   Lo aplica scripts/actualizar-clase.ts (opción "explorador"). */

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
        r(3, 'Ira de lo Salvaje', 'adicional', 'Como Acción Adicional, gastas un uso de Enemigo Predilecto (un lanzamiento gratis de Marca del cazador) para tomar una forma espantosa durante 1 minuto. Ganas +1 a la CA (+2 desde nivel 11), puedes hacer un ataque de oportunidad a quien, a 5 pies, te dañe a ti o a un aliado, y al transformarte y al inicio de cada turno las criaturas que elijas a 10 pies hacen una salvación de Sabiduría o quedan Asustadas.'),
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
