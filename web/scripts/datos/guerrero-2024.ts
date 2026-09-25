/* Guerrero de la biblioteca puesto al día con su versión oficial más reciente (texto oficial de 5etools, redactado por
   Gemini y revisado con scripts/gemini/revisar.ts). Libros: Arcana Unleashed (2026); Forgotten Realms: Heroes of Faerûn (2025); Manual del Jugador (2024).
   Lo aplica scripts/actualizar-clase.ts (opción "guerrero"). */

const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const GUERRERO_2024 = {
  rasgosAltos: [
    r(9, 'Indomable', 'gratis', 'Si fallas una tirada de salvación, puedes repetirla sumando tu nivel de Guerrero al resultado. Debes usar la nueva tirada.', { usos: 1, reset: 'largo' }),
    r(9, 'Maestro Táctico', 'pasiva', 'Cuando atacas con un arma cuya maestría puedes usar, puedes sustituir esa propiedad por Empujar, Mermar o Ralentizar para ese ataque.'),
    r(11, 'Dos Ataques Extras', 'pasiva', 'Puedes atacar tres veces en lugar de una cuando usas la acción de Atacar en tu turno.'),
    r(13, 'Ataques Estudiados', 'pasiva', 'Si haces una tirada de ataque contra una criatura y fallas, tienes Ventaja en tu siguiente tirada de ataque contra esa misma criatura antes de que termine tu siguiente turno.'),
    r(17, 'Oleada de Acción (Dos Usos)', 'gratis', 'Puedes usar tu Oleada de Acción dos veces entre descansos, pero solo una vez por turno.'),
    r(20, 'Tres Ataques Extras', 'pasiva', 'Puedes atacar cuatro veces en lugar de una cuando usas la acción de Atacar en tu turno.')
  ],
  subAltos: {},
  subclases: {
    'arquero-arcano': {
      n: 'Arquero Arcano',
      rasgos: [
        r(3, 'Saber del Arquero Arcano', 'pasiva', 'Obtienes competencia en las habilidades de Arcanos y Naturaleza. También aprendes el truco Saber druídico (Druidcraft) o Prestidigitación (Prestidigitation), usando Inteligencia.'),
        r(3, 'Disparo Arcano', 'gratis', 'Una vez por turno, cuando impactas con un arma a distancia que use munición, puedes aplicar uno de tus Disparos Arcanos aprendidos al ataque. La CD de salvación depende de tu Inteligencia.', { usos: 'max(1, INT)', reset: 'corto' }),
        r(7, 'Disparo Curvo', 'adicional', 'Cuando fallas una tirada de ataque a distancia con un arma con munición, puedes usar tu Acción Adicional para que la flecha rebote hacia un nuevo objetivo a 60 pies o menos del original.'),
        r(7, 'Munición Mágica', 'accion', 'Como Acción Mágica, encantas una flecha y la disparas a una superficie para oscurecer el área, abrir cerraduras no mágicas o crear una enredadera trepadora.', { usos: 1, reset: 'corto' }),
        r(10, 'Disparo Siempre Listo', 'pasiva', 'Cuando tiras Iniciativa, recuperas un uso gastado de tu Disparo Arcano.'),
        r(15, 'Teletransporte Indomable', 'pasiva', 'Cuando usas tu rasgo Indomable y superas la tirada de salvación, puedes teletransportarte hasta 60 pies a un espacio desocupado que puedas ver.'),
        r(18, 'Tirador Magistral', 'reaccion', 'Cuando un enemigo falla un ataque contra ti, puedes usar tu Reacción para moverte la mitad de tu velocidad sin provocar oportunidad y devolverle un ataque a distancia.')
      ]
    },
    'caballero-dragon-purpura': {
      n: 'Abanderado',
      rasgos: [
        r(3, 'Enviado Caballeresco', 'pasiva', 'Sabes cómo comportarte como embajador. Puedes lanzar Comprender idiomas como ritual usando Carisma, aprendes un idioma que puedes rotar cada descanso largo, y obtienes competencia en Perspicacia, Intimidación, Persuasión o Interpretación.'),
        r(3, 'Recuperación Grupal', 'gratis', 'Cuando usas tu Segundo Aliento, puedes elegir a aliados a 30 pies (hasta tu bono de Carisma). Cada uno recupera 1d4 + tu nivel de Guerrero en PG.', { usos: 1, reset: 'corto' }),
        r(7, 'Tácticas de Equipo', 'pasiva', 'Cuando usas Recuperación Grupal, los aliados sanados obtienen Ventaja en pruebas del dado d20 (D20 Tests) hasta el inicio de tu siguiente turno.'),
        r(10, 'Oleada Inspiradora', 'gratis', 'Cuando usas Oleada de Acción, aliados a 30 pies (hasta tu mod de Carisma) pueden usar su Reacción para moverse la mitad de su velocidad sin provocar ataques de oportunidad o hacer un ataque.'),
        r(15, 'Resistencia Compartida', 'reaccion', 'Cuando un aliado a 60 pies falla una salvación, puedes usar tu Reacción para gastar uno de tus usos de Indomable en él. El aliado repite la tirada sumando tu nivel de Guerrero.'),
        r(18, 'Comandante Inspirador', 'pasiva', 'El rango de Recuperación Grupal y Oleada Inspiradora aumenta a 60 pies. Eres inmune a estar Hechizado o Asustado.')
      ]
    },
    'maestro-batalla': {
      n: 'Maestro de Batalla',
      rasgos: [
        r(3, 'Superioridad en Combate', 'pasiva', 'Aprendes maniobras marciales que potencian tus ataques. Tienes 4 Dados de Superioridad (d8) que gastas para usarlas. La CD depende de Fuerza o Destreza (a tu elección).', { usos: 4, reset: 'corto' }),
        r(3, 'Estudiante de la Guerra', 'pasiva', 'Obtienes competencia con un tipo de Herramientas de Artesano y competencia en una habilidad de la lista inicial de Guerrero.'),
        r(7, 'Conoce a tu Enemigo', 'adicional', 'Como Acción Adicional, analizas a un enemigo a 30 pies para conocer sus Inmunidades, Resistencias y Vulnerabilidades. Puedes recuperar el uso gastando un Dado de Superioridad.', { usos: 1, reset: 'largo' }),
        r(10, 'Superioridad en Combate Mejorada', 'pasiva', 'Tus Dados de Superioridad pasan de ser d8 a d10.'),
        r(15, 'Implacable', 'pasiva', 'Una vez por turno, cuando usas una maniobra, puedes tirar 1d8 y usar ese resultado en lugar de gastar un Dado de Superioridad físico.'),
        r(18, 'Superioridad en Combate Definitiva', 'pasiva', 'Tus Dados de Superioridad pasan de ser d10 a d12.')
      ]
    },
    'campeon': {
      n: 'Campeón',
      rasgos: [
        r(3, 'Crítico Mejorado', 'pasiva', 'Tus ataques con arma y golpes desarmados logran un Impacto Crítico con un resultado de 19 o 20 en el d20.'),
        r(3, 'Atleta Notable', 'pasiva', 'Tienes Ventaja en tus tiradas de Iniciativa y en pruebas de Fuerza (Atletismo). Tras un crítico, puedes moverte la mitad de tu velocidad sin provocar oportunidad.'),
        r(7, 'Estilo de Combate Adicional', 'pasiva', 'Obtienes una dote de Estilo de Combate adicional de tu elección.'),
        r(10, 'Guerrero Heroico', 'pasiva', 'Si empiezas tu turno en combate sin Inspiración Heroica, te la otorgas a ti mismo automáticamente.'),
        r(15, 'Crítico Superior', 'pasiva', 'Tus ataques con arma y golpes desarmados ahora logran un Impacto Crítico con un resultado de 18, 19 o 20 en el d20.'),
        r(18, 'Superviviente', 'pasiva', 'Tienes Ventaja en salvaciones de muerte (y un 18-20 cuenta como un 20). Si empiezas el turno Ensangrentado y con al menos 1 PG, te curas 5 + mod de Constitución.')
      ]
    },
    'caballero-arcano': {
      n: 'Caballero Arcano',
      rasgos: [
        r(3, 'Lanzamiento de Conjuros', 'pasiva', 'Aprendes conjuros de la lista de Mago. Usas Inteligencia para el lanzamiento y puedes usar un Foco Arcano.'),
        r(3, 'Vínculo de Guerra', 'fuera', 'Te vinculas mágicamente con hasta dos armas a la vez. No pueden desarmarte, y como Acción Adicional puedes teletransportar una a tu mano si está en el mismo plano.'),
        r(7, 'Magia de Guerra', 'pasiva', 'Cuando tomas la Acción de Atacar en tu turno, puedes reemplazar uno de esos ataques por el lanzamiento de un truco de Mago.'),
        r(10, 'Golpe Sobrenatural', 'pasiva', 'Cuando golpeas a una criatura con un ataque de arma, esta tiene Desventaja en la siguiente tirada de salvación que haga contra uno de tus conjuros antes del fin de tu próximo turno.'),
        r(15, 'Carga Arcana', 'pasiva', 'Cuando usas Oleada de Acción, puedes teletransportarte hasta 30 pies a un espacio desocupado que puedas ver.'),
        r(18, 'Magia de Guerra Mejorada', 'pasiva', 'Cuando tomas la Acción de Atacar, puedes reemplazar dos de esos ataques por el lanzamiento de un conjuro de Mago de nivel 1 o 2 (que cueste 1 acción).')
      ]
    },
    'guerrero-psionico': {
      n: 'Guerrero Psiónico',
      rasgos: [
        r(3, 'Poder Psiónico', 'pasiva', 'Tienes una reserva de Dados de Energía Psiónica. Los usas para golpear más fuerte, proteger a aliados o mover objetos mágicamente.', { usos: 4, reset: 'largo' }),
        r(3, 'Campo Protector', 'reaccion', 'Cuando tú u otra criatura que veas a 30 pies recibe daño, gastas un dado como Reacción para reducir el daño en el dado + INT (mínimo 1).'),
        r(3, 'Golpe Psiónico', 'gratis', 'Una vez por turno, al acertar y dañar con un arma a un objetivo a 30 pies, gastas un dado para hacerle daño de fuerza extra igual al dado + INT.'),
        r(3, 'Movimiento Telequinético', 'accion', 'Como acción mágica mueves un objeto suelto Grande o menor, o a una criatura voluntaria, hasta 30 pies. Gratis una vez por descanso corto o largo, o gastando un dado psiónico.', { usos: 1, reset: 'corto' }),
        r(7, 'Salto Potenciado por Psi', 'adicional', 'Como Acción Adicional, ganas velocidad de Vuelo igual al doble de tu velocidad este turno. Gratis una vez por descanso o gastando un dado psiónico.', { usos: 1, reset: 'corto' }),
        r(7, 'Empujón Telequinético', 'gratis', 'Cuando haces daño con Golpe Psiónico, puedes forzar al objetivo a una salvación de FUE o derribarlo/empujarlo 10 pies.'),
        r(10, 'Mente Protegida', 'pasiva', 'Tienes resistencia al daño Psíquico. Si inicias tu turno Hechizado o Asustado, puedes gastar un dado psiónico (sin acción) para curarte el estado.'),
        r(15, 'Baluarte de Fuerza', 'adicional', 'Como Acción Adicional, das Cobertura Media por 1 minuto a varias criaturas a 30 pies (hasta mod. Inteligencia). Gratis 1 vez al día o gastando un dado psiónico.', { usos: 1, reset: 'largo' }),
        r(18, 'Maestro de la Telequinesis', 'pasiva', 'Siempre tienes Telequinesis. La lanzas sin componentes gratis una vez al día o gastando un dado psiónico. Mientras te concentras, puedes atacar como acción adicional.', { usos: 1, reset: 'largo' })
      ]
    }
  }
};
