/* Monje de la biblioteca puesto al día con su versión oficial más reciente (texto oficial de 5etools, redactado por
   Gemini y revisado con scripts/gemini/revisar.ts). Libros: Manual del Jugador (2024); Arcana Unleashed (2026); Fizban's Treasury of Dragons (2021); Tasha's Cauldron of Everything (2020); Xanathar's Guide to Everything (2017); Sword Coast Adventurer's Guide (2015).
   Lo aplica scripts/actualizar-clase.ts (opción "monje"). */

const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const MONJE_2024 = {
  rasgosAltos: [
    r(7, 'Evasión', 'pasiva', 'Cuando un efecto te permite hacer una salvación de Destreza para recibir la mitad del daño, en su lugar no recibes daño si tienes éxito, y solo la mitad si fallas. No funciona si estás incapacitado.'),
    r(9, 'Movimiento Acrobático', 'pasiva', 'Mientras no uses armadura ni escudo, puedes moverte a través de líquidos y superficies verticales durante tu turno sin caerte.'),
    r(10, 'Enfoque Elevado', 'pasiva', 'Tu Ráfaga de Golpes permite hacer tres ataques. Al usar Defensa Paciente con Puntos de Enfoque, ganas PG temporales (dos dados de Artes Marciales). Al usar Paso del Viento con Puntos de Enfoque, puedes llevar contigo a un aliado a 5 pies.'),
    r(10, 'Autorestauración', 'gratis', 'Al final de cada uno de tus turnos, puedes eliminar la condición de Hechizado, Asustado o Envenenado de ti mismo (sin requerir acción). Además, no comer ni beber ya no te causa Agotamiento.'),
    r(13, 'Desviar Energía', 'pasiva', 'Tu rasgo Desviar Ataques ahora funciona contra cualquier tipo de daño, no solo daño Contundente, Perforante o Cortante.'),
    r(14, 'Superviviente Disciplinado', 'pasiva', 'Obtienes competencia en todas las tiradas de salvación. Si fallas una tirada de salvación, puedes gastar 1 Punto de Enfoque para repetirla (debes usar el nuevo resultado).'),
    r(15, 'Enfoque Perfecto', 'pasiva', 'Al tirar Iniciativa, si no usas Metabolismo Asombroso y tienes 3 o menos Puntos de Enfoque, recuperas puntos hasta tener 4.'),
    r(18, 'Defensa Superior', 'gratis', 'Al inicio de tu turno, puedes gastar 3 Puntos de Enfoque para obtener resistencia a todo el daño (excepto daño de Fuerza) durante 1 minuto o hasta que quedes incapacitado.'),
    r(20, 'Cuerpo y Mente', 'pasiva', 'Tus puntuaciones de Destreza y Sabiduría aumentan en 4, hasta un máximo de 25.')
  ],
  subAltos: {
    sombra: [
      r(11, 'Paso de Sombra Mejorado', 'pasiva', 'Puedes gastar 1 Punto de Enfoque al usar Paso de Sombra para ignorar el requisito de estar en luz tenue u oscuridad. Además, puedes hacer un ataque sin armas inmediatamente después de teletransportarte como parte de la Acción Adicional.'),
      r(17, 'Manto de Sombras', 'accion', 'Como Acción Mágica en luz tenue u oscuridad, gastas 3 Puntos de Enfoque para cubrirte de sombras. Te vuelves Invisible, puedes atravesar criaturas como si fueran terreno difícil y usas Ráfaga de Golpes sin coste de Enfoque. Dura 1 minuto, hasta que quedes Incapacitado o hasta que termines tu turno en luz brillante.')
    ],
    manoabierta: [
      r(11, 'Paso Veloz', 'pasiva', 'Cuando tomas una Acción Adicional que no sea Paso del Viento, puedes usar Paso del Viento inmediatamente después.'),
      r(17, 'Palma Quiebra-almas', 'pasiva', 'Al impactar desarmado, puedes gastar 4 Puntos de Enfoque para imbuir vibraciones letales que duran días igual a tu nivel. Puedes usar tu acción (o renunciar a un ataque) para terminarlas: el objetivo hace salvación de CON, sufriendo 10d12 de daño de Fuerza si falla, o la mitad si salva.')
    ]
  },
  subclases: {
    'misericordia': {
      n: 'Guerrero de la Misericordia',
      rasgos: [
        r(3, 'Implementos de Misericordia', 'pasiva', 'Obtienes competencia en las habilidades de Perspicacia y Medicina, y con el Kit de herborista.'),
        r(3, 'Mano de Daño', 'pasiva', 'Una vez por turno, cuando golpeas con un ataque desarmado, puedes gastar 1 Punto de Enfoque para infligir daño Necrótico extra igual a un dado de Artes Marciales + SAB.'),
        r(3, 'Mano de Curación', 'accion', 'Como Acción Mágica, gastas 1 Punto de Enfoque para tocar y curar a una criatura un valor igual a un dado de Artes Marciales + SAB. Puedes sustituir uno de los golpes de tu Ráfaga de Golpes para usar esto sin gastar el punto de enfoque por la curación.'),
        r(6, 'Toque del Médico', 'pasiva', 'Tu Mano de Daño ahora aplica la condición de Envenenado hasta el fin de tu próximo turno. Tu Mano de Curación puede eliminar las condiciones de Ciego, Sordo, Paralizado, Envenenado o Aturdido.'),
        r(11, 'Ráfaga de Curación y Daño', 'pasiva', 'Puedes sustituir todos los golpes de Ráfaga de Golpes por Mano de Curación sin coste extra. Si haces daño, aplicas Mano de Daño gratis (1/turno).', { usos: 'max(1, SAB)', reset: 'largo' }),
        r(17, 'Mano de Misericordia Suprema', 'accion', 'Como Acción Mágica, gastas 5 Puntos de Enfoque para resucitar un cadáver (muerto hace menos de 24 horas). Recupera 4d10 + SAB Puntos de Golpe y revive sin condiciones negativas.', { usos: 1, reset: 'largo' })
      ]
    },
    'elementos': {
      n: 'Guerrero de los Elementos',
      rasgos: [
        r(3, 'Sintonía Elemental', 'gratis', 'Al inicio de tu turno, gastas 1 Punto de Enfoque para imbuirte de energía por 10 minutos. Tus golpes sin armas alcanzan 10 pies más y, al acertar, pueden hacer daño de Ácido, Frío, Fuego, Rayo o Trueno; si lo haces, el objetivo hace una salvación de FUE y, si falla, lo mueves hasta 10 pies hacia ti o lejos de ti. Termina antes si quedas Incapacitado. Además conoces el truco Elementalismo y lo lanzas con SAB.'),
        r(6, 'Explosión Elemental', 'accion', 'Como Acción Mágica, gastas 2 Puntos de Enfoque para detonar energía en una esfera de 20 pies de radio (hasta 120 pies de ti). Infliges 3 dados de Artes Marciales del daño elemental elegido (salvación DES para mitad de daño).'),
        r(11, 'Zancada de los Elementos', 'pasiva', 'Mientras tu Sintonía Elemental está activa, tienes velocidad de Vuelo y de Nado iguales a tu velocidad terrestre.'),
        r(17, 'Epítome Elemental', 'pasiva', 'En Sintonía Elemental ganas Resistencia a un daño elemental (cambiable al inicio de tu turno). Tu Paso del Viento aumenta tu velocidad en +20 pies y causa daño elemental pasivo (1 dado) al pasar junto a enemigos. Tus golpes sin armas hacen 1 dado de daño extra (1 vez por turno).')
      ]
    },
    'artes-misticas': {
      n: 'Guerrero de las Artes Místicas',
      rasgos: [
        r(3, 'Conjuros de las Artes Místicas', 'pasiva', 'Lanzas conjuros de la lista de Hechicero con SAB y puedes usar un foco arcano. Conoces dos trucos (se recomiendan Guardia de cuchillas y Tronar) y uno más en el nivel 10. Tienes espacios de conjuro según la tabla de la subclase y preparas conjuros de Hechicero de los niveles que tengas (al empezar, tres de nivel 1); al subir de nivel puedes cambiar un truco y un conjuro.'),
        r(6, 'Estilo de Lucha Místico', 'pasiva', 'Al tomar la acción de Atacar, puedes sustituir uno de tus golpes sin armas por el lanzamiento de un truco de Hechicero que requiera 1 Acción.'),
        r(6, 'Enfoque Místico', 'pasiva', 'Sin gastar acción, puedes gastar un espacio de conjuro para recuperar tantos Puntos de Enfoque como su nivel. Al terminar un descanso corto o usar Metabolismo Asombroso, puedes gastar Puntos de Enfoque para recuperar un espacio: nivel 1 por 2 puntos (monje 6), nivel 2 por 3 (monje 7), nivel 3 por 5 (monje 13) y nivel 4 por 6 (monje 19).'),
        r(11, 'Golpe Concentrado', 'pasiva', 'Cuando usas Golpe Aturdidor, pase o falle la salvación, el objetivo tiene Desventaja en las tiradas de salvación contra tus conjuros hasta el inicio de tu próximo turno.'),
        r(17, 'Estilo de Lucha Místico Mejorado', 'pasiva', 'Al usar Ráfaga de Golpes, puedes sustituir dos golpes desarmados por el lanzamiento de un conjuro de Hechicero de nivel 1 o 2 (que cueste 1 Acción), integrado en esa misma Acción Adicional.')
      ]
    },
    'dragon-ascendente': {
      n: 'Camino del Dragón Ascendente',
      rasgos: [
        r(3, 'Discípulo Dracónico', 'pasiva', 'Al dañar con un golpe sin armas puedes cambiar su tipo a Ácido, Frío, Fuego, Rayo o Veneno. Si fallas una prueba de CAR (Intimidación o Persuasión), con tu reacción puedes repetirla; cuando eso convierte un fallo en éxito, no vuelve a servir hasta un descanso largo. Además aprendes a hablar, leer y escribir dracónico u otro idioma.'),
        r(3, 'Aliento del Dragón', 'gratis', 'Al usar la acción Atacar, cambias uno de los ataques por un soplo en un cono de 20 pies o una línea de 30 pies de largo y 5 de ancho, de Ácido, Frío, Fuego, Rayo o Veneno. Quienes estén dentro hacen una salvación de DES contra tu CD de Enfoque: dos tiradas de tu dado de Artes Marciales (tres desde el nivel 11), o la mitad si la pasan. Sin usos, puedes gastar 2 Puntos de Enfoque.', { usos: 'pb', reset: 'largo' }),
        r(6, 'Alas Desplegadas', 'pasiva', 'Al usar Paso del Viento puedes sacar alas dracónicas espectrales que duran hasta el final de tu turno; mientras están, tienes velocidad de vuelo igual a tu velocidad.', { usos: 'pb', reset: 'largo' }),
        r(11, 'Aspecto del Wyrm', 'adicional', 'Con una acción adicional creas un aura de 10 pies durante 1 minuto con uno de estos efectos: Presencia Temible (al crearla, y con una acción adicional en tus turnos siguientes, una criatura del aura hace una salvación de SAB o queda Asustada de ti 1 minuto; repite la salvación al final de cada turno suyo) o Resistencia (tú y tus aliados en el aura resistís el tipo que elijas entre Ácido, Frío, Fuego, Rayo o Veneno). Para crearla otra vez antes del descanso largo, gasta 3 Puntos de Enfoque.', { usos: 1, reset: 'largo' }),
        r(17, 'Aspecto Ascendente', 'pasiva', 'Tienes vista ciega a 10 pies. Al usar Aliento del Dragón puedes gastar 1 Punto de Enfoque para que sea un cono de 60 pies o una línea de 90 pies y haga cuatro tiradas de tu dado de Artes Marciales. Al activar Aspecto del Wyrm, las criaturas que elijas en el aura hacen una salvación de DES o reciben 3d10 de daño del tipo que elijas entre Ácido, Frío, Fuego, Rayo o Veneno.')
      ]
    },
    'yo-astral': {
      n: 'Camino del Yo Astral',
      rasgos: [
        r(3, 'Brazos del Yo Astral', 'adicional', 'Con una acción adicional y 1 Punto de Enfoque invocas unos brazos espectrales durante 10 minutos; al aparecer, quienes elijas a 10 pies hacen una salvación de DES o reciben dos tiradas de tu dado de Artes Marciales de daño de fuerza. Mientras están, usas SAB en vez de FUE en pruebas y salvaciones de FUE, y puedes dar golpes sin armas con ellos con 5 pies más de alcance, usando SAB para el ataque y el daño, que es de fuerza.'),
        r(6, 'Rostro del Yo Astral', 'adicional', 'Con una acción adicional (o junto con los brazos) y 1 Punto de Enfoque, una máscara espectral te cubre la cara 10 minutos: ves con normalidad en la oscuridad, también la mágica, a 120 pies; tienes ventaja en Perspicacia e Intimidación, y puedes hacer que solo una criatura a 60 pies oiga lo que dices o que tu voz llegue a 600 pies.'),
        r(11, 'Cuerpo del Yo Astral', 'pasiva', 'Con los brazos y el rostro invocados, aparece también el cuerpo espectral, sin gastar acción. Mientras está, con tu reacción reduces el daño de Ácido, Frío, Fuego, Fuerza, Rayo o Trueno que recibes en 1d10 + SAB (mínimo 1), y una vez por turno, al acertar con los brazos, sumas tu dado de Artes Marciales al daño.'),
        r(17, 'Yo Astral Despierto', 'adicional', 'Con una acción adicional y 5 Puntos de Enfoque invocas brazos, rostro y cuerpo a la vez y los despiertas durante 10 minutos: +2 a la CA y, cuando uses Ataque Extra, puedes atacar tres veces si todos los ataques son con los brazos astrales.')
      ]
    },
    'maestro-borracho': {
      n: 'Camino del Maestro Borracho',
      rasgos: [
        r(3, 'Competencias Adicionales', 'pasiva', 'Ganas competencia en Interpretación y con los útiles de cervecero, si no la tenías.'),
        r(3, 'Técnica del Borracho', 'pasiva', 'Cada vez que usas Ráfaga de Golpes también ganas los efectos de Destrabarse y tu velocidad aumenta 10 pies hasta el final del turno.'),
        r(6, 'Vaivén Ebrio', 'reaccion', 'Levantarte del suelo te cuesta solo 5 pies de movimiento. Además, cuando una criatura falla un ataque cuerpo a cuerpo contra ti, puedes gastar 1 Punto de Enfoque y tu reacción para que ese ataque acierte a otra criatura que elijas a 5 pies de ti.'),
        r(11, 'Suerte del Borracho', 'gratis', 'Cuando haces una prueba, un ataque o una salvación con desventaja, puedes gastar 2 Puntos de Enfoque para quitarle la desventaja a esa tirada.'),
        r(17, 'Frenesí Ebrio', 'pasiva', 'Al usar Ráfaga de Golpes puedes hacer hasta tres ataques más con ella (cinco en total), siempre que cada ataque de la Ráfaga vaya contra una criatura distinta este turno.')
      ]
    },
    'kensei': {
      n: 'Camino del Kensei',
      rasgos: [
        r(3, 'Senda del Kensei', 'pasiva', 'Eliges dos tipos de arma como armas kensei: una cuerpo a cuerpo y otra a distancia, sencillas o marciales sin las propiedades pesada ni especial (el arco largo también vale). Eres competente con ellas y cuentan como armas de monje. Eliges una más en los niveles 6, 11 y 17. También ganas competencia con útiles de calígrafo o de pintor.'),
        r(3, 'Parada Ágil', 'pasiva', 'Si das un golpe sin armas como parte de la acción Atacar mientras sostienes un arma kensei cuerpo a cuerpo, ganas +2 a la CA hasta el inicio de tu próximo turno, mientras la sostengas y no estés Incapacitado.'),
        r(3, 'Disparo del Kensei', 'adicional', 'Con una acción adicional, hasta el final del turno tus ataques a distancia con un arma kensei hacen 1d4 de daño extra del tipo del arma.'),
        r(6, 'Uno con la Hoja', 'gratis', 'Tus armas kensei cuentan como mágicas para superar resistencias e inmunidades. Una vez por turno, al acertar con una, puedes gastar 1 Punto de Enfoque para sumar tu dado de Artes Marciales al daño.'),
        r(11, 'Afilar la Hoja', 'adicional', 'Con una acción adicional gastas hasta 3 Puntos de Enfoque y un arma kensei que tocas gana ese mismo bonificador al ataque y al daño durante 1 minuto o hasta que vuelvas a usarlo. No sirve con un arma mágica que ya tenga bonificador.'),
        r(17, 'Precisión Infalible', 'gratis', 'Una vez en cada uno de tus turnos, si fallas un ataque con un arma de monje, puedes repetir la tirada.')
      ]
    },
    'larga-muerte': {
      n: 'Camino de la Larga Muerte',
      rasgos: [
        r(3, 'Toque de la Muerte', 'pasiva', 'Cuando dejas a 0 PG a una criatura a 5 pies de ti, ganas PG temporales iguales a tu SAB más tu nivel de monje (mínimo 1).'),
        r(6, 'Hora de la Cosecha', 'accion', 'Como acción, cada criatura a 30 pies que pueda verte hace una salvación de SAB o queda Asustada de ti hasta el final de tu próximo turno.'),
        r(11, 'Dominio de la Muerte', 'gratis', 'Cuando caes a 0 PG, puedes gastar 1 Punto de Enfoque para quedarte con 1 PG en su lugar.'),
        r(17, 'Toque de la Larga Muerte', 'accion', 'Como acción tocas a una criatura a 5 pies y gastas de 1 a 10 Puntos de Enfoque. Hace una salvación de CON: recibe 2d10 de daño necrótico por cada punto gastado, o la mitad si la pasa.')
      ]
    },
    'alma-solar': {
      n: 'Camino del Alma Solar',
      rasgos: [
        r(3, 'Rayo Solar Radiante', 'accion', 'Ganas un ataque de conjuro a distancia (30 pies) que puedes usar en la acción Atacar, en cualquiera de sus ataques: sumas DES al ataque y al daño, el daño es radiante y usa tu dado de Artes Marciales. Si lo usas en la acción Atacar, puedes gastar 1 Punto de Enfoque para hacerlo dos veces más como acción adicional.'),
        r(6, 'Golpe de Arco Abrasador', 'adicional', 'Justo después de usar la acción Atacar, puedes gastar 2 Puntos de Enfoque para lanzar Manos ardientes como acción adicional. Cada punto extra lo sube un nivel, hasta gastar en total la mitad de tu nivel de monje.'),
        r(11, 'Estallido Solar Abrasador', 'accion', 'Como acción lanzas un orbe a un punto a 150 pies que estalla en una esfera de 20 pies de radio: cada criatura dentro hace una salvación de CON o recibe 2d6 de daño radiante (quien esté tras cobertura total opaca no la hace). Cada Punto de Enfoque que gastes, hasta 3, suma 2d6.'),
        r(17, 'Escudo Solar', 'reaccion', 'Das luz brillante en 30 pies y tenue en 30 más; con una acción adicional la apagas o la enciendes. Mientras brilla, cuando una criatura te acierta cuerpo a cuerpo, con tu reacción le haces 5 + SAB de daño radiante.')
      ]
    }
  }
};
