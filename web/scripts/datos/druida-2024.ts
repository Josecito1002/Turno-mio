/* Druida de la biblioteca puesto al día con su versión oficial más reciente (texto oficial de 5etools, redactado por
   Gemini y revisado con scripts/gemini/revisar.ts). Libros: Manual del Jugador (2024); Xanathar's Guide to Everything (2017); Tasha's Cauldron of Everything (2020).
   Lo aplica scripts/actualizar-clase.ts (opción "druida"). */

const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const DRUIDA_2024 = {
  rasgosAltos: [
    r(7, 'Furia Elemental', 'pasiva', 'Eliges cómo te potencian los elementos: Golpe Primigenio (una vez por turno, 1d8 de daño de frío, fuego, relámpago o trueno extra al acertar con un arma o un ataque de bestia) o Lanzamiento Potente (sumas tu modificador de Sabiduría al daño de tus trucos de druida).'),
    r(15, 'Furia Elemental Mejorada', 'pasiva', 'Tu opción de Furia Elemental mejora: el daño extra de Golpe Primigenio pasa a 2d8, y con Lanzamiento Potente tus trucos de druida con alcance de 10 pies o más ganan 300 pies de alcance.'),
    r(18, 'Conjuros de Bestia', 'pasiva', 'Puedes lanzar conjuros en Forma Salvaje, salvo los que tengan componentes materiales con coste indicado o que se consuman.'),
    r(20, 'Archidruida', 'gratis', 'Al tirar iniciativa sin usos de Forma Salvaje, recuperas uno. Una vez por descanso largo, puedes convertir usos de Forma Salvaje en un espacio de conjuro (cada uso vale 2 niveles). Además, envejeces 1 año por cada 10.'),
  ],
  subAltos: {
  },
  subclases: {
    'circulo-tierra': {
      n: 'Círculo de la Tierra',
      rasgos: [
        r(3, 'Conjuros del Círculo de la Tierra', 'pasiva', 'Al terminar cada descanso largo eliges un tipo de tierra (árida, polar, templada o tropical) y tienes preparados sus conjuros; la lista se amplía en los niveles 3, 5, 7 y 9.'),
        r(3, 'Ayuda de la Tierra', 'accion', 'Gastas un uso de Forma Salvaje para hacer brotar flores y espinas en una esfera de 10 pies a 60 pies: las criaturas que elijas hacen una salvación de Constitución o reciben daño necrótico (mitad si superan), y una criatura de la zona recupera PG.'),
        r(6, 'Recuperación Natural', 'fuera', 'Una vez por descanso largo, al terminar un descanso corto recuperas espacios de conjuro cuyos niveles sumen hasta la mitad de tu nivel de druida (redondeando hacia arriba, ninguno de nivel 6+). Además, una vez por descanso largo lanzas gratis uno de tus conjuros de círculo de nivel 1 o más.', { usos: 1, reset: 'largo' }),
        r(10, 'Protección de la Naturaleza', 'pasiva', 'Eres inmune a la condición de envenenado y tienes resistencia a un tipo de daño según tu tierra actual: fuego (árida), frío (polar), relámpago (templada) o veneno (tropical).'),
        r(14, 'Santuario de la Naturaleza', 'accion', 'Gastas un uso de Forma Salvaje para crear árboles y enredaderas espectrales en un cubo de 15 pies a 120 pies durante 1 minuto. Tú y tus aliados tenéis cobertura media dentro, y tus aliados ganan la resistencia de tu Protección de la Naturaleza. Puedes mover el cubo 60 pies con una acción adicional.'),
      ],
    },
    'circulo-luna': {
      n: 'Círculo de la Luna',
      rasgos: [
        r(3, 'Conjuros del Círculo de la Luna', 'pasiva', 'Tienes siempre preparados los conjuros del círculo, que se amplían en los niveles 3, 5, 7 y 9, y puedes lanzarlos en Forma Salvaje.'),
        r(3, 'Formas del Círculo', 'pasiva', 'En Forma Salvaje puedes adoptar bestias de VD hasta un tercio de tu nivel de druida, tu CA es 13 + Sabiduría si es mayor que la de la bestia, y ganas PG temporales iguales a tres veces tu nivel de druida.'),
        r(6, 'Formas del Círculo Mejoradas', 'pasiva', 'En Forma Salvaje, cada ataque puede hacer su daño normal o radiante (eliges al acertar), y sumas tu modificador de Sabiduría a tus salvaciones de Constitución.'),
        r(10, 'Paso de Luz Lunar', 'adicional', 'Te teletransportas hasta 30 pies a un espacio que veas y tienes ventaja en tu siguiente ataque de este turno. Puedes recuperar usos gastando un espacio de nivel 2 o más por cada uno.'),
        r(14, 'Forma Lunar', 'pasiva', 'Una vez por turno, un ataque de tu Forma Salvaje que acierte hace 2d10 de daño radiante extra. Además, al usar Paso de Luz Lunar puedes llevarte a una criatura voluntaria que esté a 10 pies de ti.'),
      ],
    },
    'circulo-mar': {
      n: 'Círculo del Mar',
      rasgos: [
        r(3, 'Conjuros del Círculo del Mar', 'pasiva', 'Tienes siempre preparados los conjuros del círculo, que se amplían en los niveles 3, 5, 7 y 9.'),
        r(3, 'Ira del Mar', 'adicional', 'Gastas un uso de Forma Salvaje para rodearte durante 10 minutos de una emanación de espuma marina de 5 pies. Al crearla, y con una acción adicional en turnos siguientes, eliges una criatura dentro: si falla una salvación de Constitución recibe daño de frío y, si es Grande o menor, la empujas hasta 15 pies.'),
        r(6, 'Afinidad Acuática', 'pasiva', 'La emanación de Ira del Mar crece a 10 pies y ganas velocidad de nado igual a tu velocidad.'),
        r(10, 'Hijo de la Tormenta', 'pasiva', 'Mientras Ira del Mar esté activa, tienes velocidad de vuelo igual a tu velocidad y resistencia al daño de frío, relámpago y trueno.'),
        r(14, 'Don Oceánico', 'pasiva', 'Puedes crear la emanación de Ira del Mar alrededor de una criatura voluntaria a 60 pies en vez de ti (usa tu CD y tu Sabiduría), o alrededor de ambos gastando dos usos de Forma Salvaje.'),
      ],
    },
    'circulo-estrellas': {
      n: 'Círculo de las Estrellas',
      rasgos: [
        r(3, 'Mapa Estelar', 'pasiva', 'Tienes una carta estelar que sirve de foco. Mientras la sostienes tienes preparados Guía y Rayo guía, y puedes lanzar Rayo guía sin gastar espacio varias veces por descanso largo. Si la pierdes, la rehaces con un ritual de 1 hora.'),
        r(3, 'Forma Estelar', 'adicional', 'Gastas un uso de Forma Salvaje para brillar con forma estelar durante 10 minutos y eliges constelación: Arquero (ataque de conjuro a distancia de 1d8 + Sabiduría radiante con acción adicional), Cáliz (al curar con un espacio, tú u otro a 30 pies recuperáis 1d8 + Sabiduría) o Dragón (en pruebas de INT y SAB y salvaciones de concentración, un 9 o menos en el d20 cuenta como 10).'),
        r(6, 'Augurio Cósmico', 'reaccion', 'Tras cada descanso largo tiras un dado: si sale par (Bienaventuranza) puedes sumar 1d6 a la prueba d20 de una criatura a 30 pies; si sale impar (Aflicción), restárselo.'),
        r(10, 'Constelaciones Titilantes', 'pasiva', 'El 1d8 de Arquero y Cáliz pasa a 2d8, con Dragón ganas vuelo de 20 pies y puedes flotar, y al inicio de cada turno en forma estelar puedes cambiar de constelación.'),
        r(14, 'Lleno de Estrellas', 'pasiva', 'En forma estelar te vuelves en parte incorpóreo y tienes resistencia al daño contundente, cortante y perforante.'),
      ],
    },
    'circulo-suenos': {
      n: 'Círculo de los Sueños',
      rasgos: [
        r(3, 'Bálsamo de la Corte Estival', 'adicional', 'Tienes una reserva de d6 igual a tu nivel de druida. Con una acción adicional gastas hasta la mitad de tu nivel en dados para curar a una criatura a 120 pies, que además gana 1 PG temporal por dado.'),
        r(6, 'Hogar de Luz Lunar y Sombra', 'fuera', 'Al descansar creas una esfera de 30 pies: quienes estén dentro tienen +5 en Sigilo y Percepción, y la luz de fuegos dentro no se ve desde fuera.'),
        r(10, 'Senderos Ocultos', 'adicional', 'Con una acción adicional te teletransportas hasta 60 pies, o con una acción teletransportas hasta 30 pies a una criatura voluntaria que toques.'),
        r(14, 'Caminante de los Sueños', 'fuera', 'Una vez por descanso largo, al terminar un descanso corto lanzas sin espacio Ensueño, Escudriñar o Círculo de teletransportación, ligados al lugar de tu último descanso largo.', { usos: 1, reset: 'largo' }),
      ],
    },
    'circulo-pastor': {
      n: 'Círculo del Pastor',
      rasgos: [
        r(3, 'Habla del Bosque', 'pasiva', 'Aprendes silvano, y las bestias entienden lo que dices y tú interpretas sus ruidos y gestos.'),
        r(3, 'Tótem Espiritual', 'adicional', 'Invocas un espíritu a 60 pies con un aura de 30 pies durante 1 minuto: Oso (PG temporales y ventaja en Fuerza), Halcón (con tu reacción das ventaja a un ataque) o Unicornio (ventaja para detectar criaturas y curas extra).', { usos: 1, reset: 'corto' }),
        r(6, 'Invocador Poderoso', 'pasiva', 'Las bestias y hadas que invocas ganan 2 PG por cada Dado de Golpe y sus armas naturales cuentan como mágicas.'),
        r(10, 'Espíritu Guardián', 'pasiva', 'Las bestias y hadas que invoques que terminen su turno en el aura de tu tótem recuperan PG iguales a la mitad de tu nivel de druida.'),
        r(14, 'Invocación Fiel', 'gratis', 'Si caes a 0 PG o quedas incapacitado contra tu voluntad, lanzas Conjurar animales como si fuera de nivel 9 para que te protejan.', { usos: 1, reset: 'largo' }),
      ],
    },
    'circulo-esporas': {
      n: 'Círculo de las Esporas',
      rasgos: [
        r(3, 'Conjuros del Círculo de las Esporas', 'pasiva', 'Aprendes el truco Toque helado y tienes siempre preparados los conjuros del círculo, que se amplían en los niveles 3, 5, 7 y 9.'),
        r(3, 'Halo de Esporas', 'reaccion', 'Cuando una criatura que ves se mueve a 10 pies de ti o empieza allí su turno, puedes hacer que salve Constitución o reciba daño necrótico.'),
        r(3, 'Entidad Simbiótica', 'accion', 'Gastas un uso de Forma Salvaje para ganar PG temporales durante 10 minutos. Mientras los tengas, el dado del Halo se duplica y tus ataques cuerpo a cuerpo hacen 1d6 necrótico extra.'),
        r(6, 'Infestación Fúngica', 'reaccion', 'Cuando una bestia o humanoide Pequeño o Mediano muere a 10 pies de ti, lo alzas como zombi con 1 PG durante 1 hora.'),
        r(10, 'Esporas Esparcidas', 'adicional', 'Con Entidad Simbiótica activa, lanzas tus esporas a un cubo de 10 pies a 30 pies de ti durante 1 minuto, que usa el daño de tu Halo en lugar de tu reacción.'),
        r(14, 'Cuerpo Fúngico', 'pasiva', 'No puedes quedar cegado, ensordecido, asustado ni envenenado, y los críticos contra ti cuentan como golpes normales salvo que estés incapacitado.'),
      ],
    },
    'circulo-fuego': {
      n: 'Círculo del Fuego Salvaje',
      rasgos: [
        r(3, 'Conjuros del Círculo del Fuego Salvaje', 'pasiva', 'Tienes siempre preparados los conjuros del círculo, que se amplían en los niveles 3, 5, 7 y 9.'),
        r(3, 'Invocar Espíritu de Fuego Salvaje', 'accion', 'Gastas un uso de Forma Salvaje para invocar un espíritu de fuego a 30 pies; al aparecer, las criaturas a 10 pies salvan Destreza o reciben 2d6 de fuego. Actúa con tu iniciativa y lo mandas con acción adicional.'),
        r(6, 'Vínculo Potenciado', 'pasiva', 'Con el espíritu invocado, tus conjuros que curan o hacen daño de fuego suman 1d8, y puedes lanzar conjuros de alcance distinto a personal como si salieran del espíritu.'),
        r(10, 'Llamas Cauterizantes', 'reaccion', 'Cuando una criatura muere a 30 pies de ti o de tu espíritu, deja una llama durante 1 minuto; si otra criatura entra en ese espacio, puedes curarla o dañarla por 2d10 + Sabiduría.'),
        r(14, 'Resurgir Llameante', 'gratis', 'Si caes a 0 PG con el espíritu a 120 pies, el espíritu se consume y tú recuperas la mitad de tus PG y te levantas.', { usos: 1, reset: 'largo' }),
      ],
    },
  },
};
