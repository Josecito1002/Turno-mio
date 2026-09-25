/* Mago de la biblioteca puesto al día con su versión oficial más reciente (texto oficial de 5etools, redactado por
   Gemini y revisado con scripts/gemini/revisar.ts). Libros: Manual del Jugador (2024); Forgotten Realms: Heroes of Faerûn (2025); Explorer's Guide to Wildemount (2020); Arcana Unleashed (2026); Tasha's Cauldron of Everything (2020); Xanathar's Guide to Everything (2017).
   Lo aplica scripts/actualizar-clase.ts (opción "mago"). */

const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const MAGO_2024 = {
  rasgosAltos: [
    r(18, 'Dominio de Conjuros', 'pasiva', 'Eliges un conjuro de nivel 1 y otro de nivel 2 de tu libro de conjuros que requieran 1 Acción. Siempre los tienes preparados y puedes lanzarlos sin gastar espacio (al nivel más bajo). Cambias tu elección al descansar.'),
    r(20, 'Conjuros de Firma', 'pasiva', 'Eliges dos conjuros de nivel 3 de tu libro de conjuros. Siempre los tienes preparados y puedes lanzar cada uno una vez gratis al nivel 3 (recuperas los usos gratis tras un Descanso Corto o Largo).')
  ],
  subAltos: {},
  subclases: {
    'abjuracion': {
      n: 'Abjurador',
      rasgos: [
        r(3, 'Erudito de la Abjuración', 'pasiva', 'Añades gratis dos conjuros de Abjuración (máx. nivel 2) a tu libro. Además, cada vez que desbloqueas un nuevo nivel de conjuro, añades gratis otro conjuro de Abjuración.'),
        r(3, 'Capa Arcana', 'pasiva', 'Al lanzar un conjuro de Abjuración, te creas un escudo mágico con PG igual al doble de tu nivel + tu Inteligencia, que recibe daño en tu lugar. Recarga 2 PG por nivel de cada abjuración que lances. Máximo una creación por Descanso Largo.', { usos: 1, reset: 'largo' }),
        r(6, 'Capa Proyectada', 'reaccion', 'Cuando un aliado a 30 pies recibe daño, puedes usar tu Reacción para que tu Capa Arcana absorba el daño en lugar del aliado.'),
        r(10, 'Rompeconjuros', 'adicional', 'Siempre tienes preparados Contrahechizo y Disipar Magia, puedes lanzar Disipar Magia como Acción Adicional, y sumas tu Bono de Competencia a ambas tiradas. Si fallas en detener la magia, no gastas el espacio de conjuro.'),
        r(14, 'Resistencia a Conjuros', 'pasiva', 'Tienes Ventaja en las tiradas de salvación contra todos los conjuros y tienes Resistencia contra el daño provocado por cualquier conjuro.')
      ]
    },
    'cantor-hoja': {
      n: 'Cantor de la Hoja',
      rasgos: [
        r(3, 'Canto de la Hoja', 'adicional', 'Como Acción Adicional, entras en trance de batalla por 1 min (sin armadura media/pesada, escudos ni armas a 2 manos). Ganas CA igual a tu Inteligencia, +10 pies de velocidad, Ventaja en Acrobacias y usas Inteligencia en daño/ataque marcial y para mantener concentración.', { usos: 'max(1, INT)', reset: 'largo' }),
        r(3, 'Formación en Guerra y Canto', 'pasiva', 'Competencia con todas las armas marciales de una mano (las puedes usar como foco arcano). Competencia en Acrobacias, Atletismo, Interpretación o Persuasión.'),
        r(6, 'Ataque Extra', 'accion', 'Puedes atacar dos veces al usar la acción de Atacar en tu turno. Puedes sustituir uno de esos ataques por el lanzamiento de un truco de Mago (de 1 Acción).'),
        r(10, 'Canción de Defensa', 'reaccion', 'Mientras Canto de la Hoja está activo, al recibir daño puedes usar tu Reacción para gastar un espacio de conjuro y reducir el daño en (5 × nivel del espacio).'),
        r(14, 'Canción de Victoria', 'adicional', 'Después de lanzar un conjuro que cueste 1 Acción, puedes usar tu Acción Adicional para realizar un ataque con un arma cuerpo a cuerpo.')
      ]
    },
    'conjuracion': {
      n: 'Conjurador',
      rasgos: [
        r(3, 'Erudito de la Conjuración', 'pasiva', 'Añades gratis dos conjuros de Conjuración (máx. nivel 2) a tu libro. Además, cada vez que desbloqueas un nuevo nivel de conjuro, añades gratis otro conjuro de Conjuración.'),
        r(3, 'Transposición Benigna', 'adicional', 'Como Acción Adicional, puedes teletransportarte 30 pies. Alternativamente, puedes intercambiar lugares con un aliado voluntario a esa distancia.', { usos: 'max(1, INT)', reset: 'largo' }),
        r(6, 'Transposición Distante', 'pasiva', 'Tu Transposición Benigna ahora tiene 60 pies de alcance. Además, puedes recuperar usos de este rasgo gastando espacios de conjuro de nivel 3 o mayor.'),
        r(6, 'Invocaciones Duraderas', 'pasiva', 'Cuando conjuras a una criatura, aparece con Puntos de Golpe temporales iguales al doble de tu nivel de Mago. Mientras los tenga, tiene Resistencia a casi todos los daños (salvo Fuerza, Necrótico, Psíquico y Radiante).'),
        r(10, 'Conjuración Concentrada', 'pasiva', 'Recibir daño no puede romper tu concentración en ningún conjuro de Conjuración.'),
        r(14, 'Invocación Astillada', 'pasiva', 'Al lanzar conjuros como Invocar aberración, puedes modificarlo para invocar dos criaturas en lugar de una, aunque aparecen con la mitad de sus Puntos de Golpe (máximos y actuales).', { usos: 1, reset: 'largo' })
      ]
    },
    'adivinacion': {
      n: 'Adivino',
      rasgos: [
        r(3, 'Erudito de la Adivinación', 'pasiva', 'Añades gratis dos conjuros de Adivinación (máx. nivel 2) a tu libro. Además, cada vez que desbloqueas un nuevo nivel de conjuro, añades gratis otro conjuro de Adivinación.'),
        r(3, 'Portento', 'pasiva', 'Tras un Descanso Largo, tiras dos d20 y guardas los resultados. Puedes usar uno de esos resultados para reemplazar la tirada de un aliado o enemigo que puedas ver (antes de que lancen el dado).'),
        r(6, 'Adivino Experto', 'pasiva', 'Cuando lanzas un conjuro de Adivinación gastando un espacio de nivel 2 o superior, recuperas automáticamente un espacio de conjuro gastado (de un nivel inferior al que usaste, máximo de nivel 5).'),
        r(10, 'El Tercer Ojo', 'adicional', 'Como Acción Adicional hasta que descanses, obtienes un beneficio: Visión en la oscuridad a 120 pies, leer cualquier idioma, o puedes lanzar Ver invisibilidad gratis una vez.', { usos: 1, reset: 'corto' }),
        r(14, 'Portento Mayor', 'pasiva', 'Ahora lanzas y guardas tres d20 de Portento al terminar un Descanso Largo en lugar de dos.')
      ]
    },
    'encantamiento': {
      n: 'Encantador',
      rasgos: [
        r(3, 'Erudito del Encantamiento', 'pasiva', 'Añades gratis dos conjuros de Encantamiento (máx. nivel 2) a tu libro. Además, cada vez que desbloqueas un nuevo nivel de conjuro, añades gratis otro conjuro de Encantamiento.'),
        r(3, 'Conversador Encantador', 'pasiva', 'Obtienes competencia en Engaño, Intimidación o Persuasión, y sumas tu Inteligencia (mínimo +1) a la habilidad que hayas elegido.'),
        r(3, 'Presencia Hipnótica', 'accion', 'Como Acción Mágica, embelesas a una criatura a 10 pies (salvación SAB); si falla, queda Hechizada, incapacitada y con velocidad 0 por 1 min, o hasta que reciba daño.', { usos: 'max(1, INT)', reset: 'largo' }),
        r(6, 'Encantamiento Dividido', 'pasiva', 'Cuando gastas un espacio para lanzar un conjuro de Encantamiento que afecta a 1 criatura (como Hechizar persona) y lo usas de nivel superior, puedes sumar +1 al nivel efectivo (para afectar a otro).', { usos: 'max(1, INT)', reset: 'largo' }),
        r(10, 'Encanto Instintivo', 'reaccion', 'Cuando un enemigo te ataque a 30 pies, usas tu Reacción para forzar una salvación SAB. Si falla, el ataque falla y en su lugar ataca a otra criatura elegida por ti.', { usos: 1, reset: 'largo' }),
        r(14, 'Alterar Recuerdos', 'accion', 'Cuando hechizas a una criatura, esta no es consciente de que lo hiciste. Antes de que el efecto termine, puedes usar tu Acción Mágica para borrar (1 + INT) horas de memoria de la criatura (salvación INT).')
      ]
    },
    'evocacion': {
      n: 'Evocador',
      rasgos: [
        r(3, 'Erudito de la Evocación', 'pasiva', 'Añades gratis dos conjuros de Evocación (máx. nivel 2) a tu libro. Además, cada vez que desbloqueas un nuevo nivel de conjuro, añades gratis otro conjuro de Evocación.'),
        r(3, 'Truco Potente', 'pasiva', 'Cuando fallas el ataque con un truco, o si el enemigo pasa la tirada de salvación, el enemigo aún recibe la mitad del daño del truco, pero ignora cualquier efecto secundario.'),
        r(6, 'Esculpir Conjuros', 'pasiva', 'Cuando lanzas un conjuro de Evocación de área, puedes elegir un número de aliados (1 + nivel del conjuro). Éstos superan la salvación automáticamente y no reciben ningún daño del conjuro.'),
        r(10, 'Evocación Potenciada', 'pasiva', 'Siempre que lances un conjuro de Evocación, sumas tu Inteligencia a una tirada de daño del conjuro.'),
        r(14, 'Sobrecarga', 'pasiva', 'Cuando lanzas un conjuro de nivel 1 a 5, en lugar de tirar dados de daño, usas el daño máximo. El primer uso es gratis. Si repites esto antes de un descanso largo, recibes daño necrótico por cada nivel de conjuro (aumenta cada vez).')
      ]
    },
    'ilusion': {
      n: 'Ilusionista',
      rasgos: [
        r(3, 'Erudito de la Ilusión', 'pasiva', 'Añades gratis dos conjuros de Ilusión (máx. nivel 2) a tu libro. Además, cada vez que desbloqueas un nuevo nivel de conjuro, añades gratis otro conjuro de Ilusión.'),
        r(3, 'Ilusiones Mejoradas', 'pasiva', 'Lanzas ilusiones sin componentes verbales, y si su alcance es de más de 10 pies, este aumenta en 60 pies. Obtienes el truco Ilusión menor, puedes hacer que tenga sonido e imagen juntos, y lanzarlo como Acción Adicional.'),
        r(6, 'Criaturas Fantasmales', 'pasiva', 'Siempre tienes preparados Invocar bestia e Invocar feérico. Puedes lanzarlos como ilusiones espectrales gratis, pero la criatura tendrá la mitad de sus PG.', { usos: 1, reset: 'largo' }),
        r(10, 'Yo Ilusorio', 'reaccion', 'Cuando te vayan a golpear, usas tu Reacción para interponer un doble ilusorio. El ataque falla automáticamente y el doble se desvanece. Recuperas el uso tras un descanso o gastando un espacio de nivel 2 o superior.', { usos: 1, reset: 'corto' }),
        r(14, 'Realidad Ilusoria', 'adicional', 'Cuando lanzas un conjuro de Ilusión, puedes usar tu Acción Adicional para elegir un objeto inanimado creado por la ilusión y hacerlo físico/real por 1 minuto (no puede causar daño).')
      ]
    },
    'necromancia': {
      n: 'Nigromante',
      rasgos: [
        r(3, 'Erudito de la Necromancia', 'pasiva', 'Añades gratis dos conjuros de Necromancia (máx. nivel 2) a tu libro. Además, cada vez que desbloqueas un nuevo nivel de conjuro, añades gratis otro conjuro de Necromancia.'),
        r(3, 'Libro de Necromancia', 'pasiva', 'Tienes Resistencia al daño necrótico. Puedes lanzar Encontrar familiar para que sea un Esqueleto o Zombi tipo Muerto Viviente y usar tu ataque para que golpee él. Puedes curar muertos vivientes con la magia de tus conjuros gastados.'),
        r(6, 'Poder de la Tumba', 'pasiva', 'Al usar Recuperación Arcana, reduces en 1 tu nivel de Agotamiento. Todo el daño de tus conjuros ignora la Resistencia al daño necrótico.'),
        r(6, 'Siervos Muertos Vivientes', 'pasiva', 'Siempre preparas Animar a los muertos. Una vez gratis por día, al lanzarlo aumentas el nivel del conjuro en 1. Tus muertos vivientes ganan PG máximos (INT + mitad nivel) y daño adicional igual a tu INT.', { usos: 1, reset: 'largo' }),
        r(10, 'Cosechar a los Muertos', 'reaccion', 'Al quedar Ensangrentado, puedes destruir (a 0 PG) con una Reacción a uno de tus muertos vivientes para curarte Puntos de Golpe iguales a tu nivel de Mago.'),
        r(14, 'Amo de la Muerte', 'adicional', 'Como Acción Adicional, todos los muertos vivientes que hayas invocado obtienen PG temporales iguales a tu nivel de Mago (1/día). Además, puedes hacer estallar a un muerto viviente cuando muere causando daño de área (1d6 x mitad dados de golpe de criatura).')
      ]
    },
    'transmutacion': {
      n: 'Transmutador',
      rasgos: [
        r(3, 'Erudito de la Transmutación', 'pasiva', 'Añades gratis dos conjuros de Transmutación (máx. nivel 2) a tu libro. Además, cada vez que desbloqueas un nuevo nivel de conjuro, añades gratis otro conjuro de Transmutación.'),
        r(3, 'Piedra del Transmutador', 'pasiva', 'Al descansar, creas una Piedra que da competencia en salvaciones de Constitución y un beneficio: Visión nocturna 60 pies, Resistencia elemental, o +10 Velocidad. Cambias el beneficio al lanzar Transmutación.'),
        r(3, 'Alteración Maravillosa', 'pasiva', 'Siempre tienes Alterar el propio aspecto y puedes lanzarlo gratis 1 vez por día. Al usarlo, eres más ágil bajo el agua, tienes ventaja en Engaño y mejoras el daño y concentración (salvaciones CON) con armas naturales.', { usos: 1, reset: 'largo' }),
        r(6, 'Transmutación Potenciada', 'pasiva', 'Al lanzar un hechizo pasivo de Transmutación que no requiera salvación o ataque (como Volar), puedes aumentar su nivel efectivo en 1.', { usos: 'max(1, INT)', reset: 'largo' }),
        r(10, 'Piedra Potente', 'pasiva', 'Tu Piedra del Transmutador ahora puede otorgar dos beneficios en lugar de uno (y opciones nuevas: Ventaja FUE / Percepción de vibración a 30 pies).'),
        r(10, 'Cambiaformas', 'pasiva', 'Siempre tienes Polimorfar y puedes lanzarlo en ti mismo gratis 1 vez por día. Al hacerlo mantienes tus características de Mago, inteligencia e identidad, y puedes lanzar hechizos de transmutación puros.', { usos: 1, reset: 'largo' }),
        r(14, 'Maestro Transmutador', 'accion', 'Como Acción Mágica, destruyes la Piedra para: transformar algo permanentemente, curar todas las enfermedades y devolver PG (Panacea), revivir a un muerto (Restaurar Vida), o rejuvenecer mágicamente 3d10 años (Restaurar Juventud).')
      ]
    },
    'magia-cronurgia': {
      n: 'Magia de Cronurgia',
      rasgos: [
        r(3, 'Cambio Crónico', 'reaccion', 'Justo después de que tú o una criatura que veas a 30 pies haga una tirada de ataque, una prueba de característica o una tirada de salvación, usas tu Reacción para obligarla a repetir la tirada; se queda con el nuevo resultado. Lo decides tras ver la tirada, pero antes de saber si sale bien o mal.', { usos: 2, reset: 'largo' }),
        r(3, 'Conciencia Temporal', 'pasiva', 'Sumas tu modificador de Inteligencia a tus tiradas de iniciativa.'),
        r(6, 'Estasis Momentánea', 'accion', 'Como Acción, congelas temporalmente a una criatura Grande o menor a 60 pies (salvación CON). Queda incapacitada con velocidad 0 hasta el fin de tu próximo turno o hasta sufrir daño.', { usos: 'max(1, INT)', reset: 'largo' }),
        r(10, 'Suspensión Arcana', 'pasiva', 'Lanzas un conjuro de nivel 4 o inferior y lo congelas en una perla por 1 hora. Cualquier criatura que la sostenga puede usar su acción para liberar el conjuro, usando tus estadísticas mágicas.', { usos: 1, reset: 'corto' }),
        r(14, 'Futuro Convergente', 'reaccion', 'Ignoras los dados mágicamente. Como reacción ante cualquier tirada a 60 pies, puedes dictaminar que el resultado es el mínimo para tener éxito, o que falla por 1 punto. Sufres 1 nivel de Agotamiento al usarlo.')
      ]
    },
    'magia-graviturgia': {
      n: 'Magia de Graviturgia',
      rasgos: [
        r(3, 'Ajustar Densidad', 'accion', 'Como Acción, cambias el peso de un objeto o una criatura Grande o menor que veas a 30 pies: lo reduces a la mitad o lo duplicas durante 1 minuto (con Concentración, como un conjuro). A la mitad: +10 pies de Velocidad, salta el doble y tiene Desventaja en pruebas y salvaciones de Fuerza. Al doble: −10 pies de Velocidad y Ventaja en pruebas y salvaciones de Fuerza. Una criatura que no quiera puede evitarlo con una salvación de Fuerza. Desde el nivel 10 sirve para objetivos Enormes.'),
        r(6, 'Pozo Gravitatorio', 'pasiva', 'Cuando lanzas un conjuro sobre una criatura, puedes moverla 5 pies a una posición desocupada si pasa voluntariamente, si le aciertas con el ataque, o si falla la salvación.'),
        r(10, 'Atracción Violenta', 'reaccion', 'Cuando alguien a 60 pies acierta un ataque con arma, o sufre daño por caída, usas tu Reacción para aumentar la velocidad gravitatoria, infiriendo 1d10 o 2d10 de daño extra respectivamente.', { usos: 'max(1, INT)', reset: 'largo' }),
        r(14, 'Horizonte de Sucesos', 'accion', 'Como Acción, emites un campo gravitacional por 1 min (concentración). Enemigos que inician su turno a 30 pies hacen salvación de FUE: sufren 2d10 Fuerza y velocidad 0. Si pasan, cuesta el doble moverse.')
      ]
    },
    'escribas': {
      n: 'Orden de Escribas',
      rasgos: [
        r(3, 'Pluma de Mago', 'adicional', 'Como Acción Adicional creas una pluma mágica Diminuta en tu mano, del aspecto que quieras. Escribe sin tinta y en el color que elijas, borra lo que escribió con ella si la pasas encima (a 5 pies), y con ella copiar un conjuro a tu libro solo te toma 2 minutos por nivel del conjuro. Desaparece si creas otra o si mueres.'),
        r(3, 'Libro de Conjuros Despierto', 'pasiva', 'Tu libro de conjuros tiene conciencia propia. Te sirve de foco arcano. Al lanzar un conjuro de mago con un espacio, puedes cambiar su tipo de daño por el de otro conjuro de tu libro del mismo nivel. Además, una vez por Descanso Largo puedes lanzar como ritual un conjuro de tu libro con su tiempo de lanzamiento normal, en vez de sumarle los 10 minutos.', { usos: 1, reset: 'largo' }),
        r(6, 'Mente Manifiesta', 'adicional', 'Manifiestas el intelecto de tu libro como un espectro flotante a 60 pies. Escucha y ve telepáticamente para ti, y puedes originar hechizos desde su posición.', { usos: 'pb', reset: 'largo' }),
        r(10, 'Maestro Copista', 'fuera', 'Al descansar, fabricas gratis un pergamino de 1 Acción (niveles 1-2) desde tu libro; al lanzarlo funciona a un nivel superior. También reduces el costo para fabricar pergaminos normales a la mitad.'),
        r(14, 'Uno con la Palabra', 'pasiva', 'Ventaja en Arcanos. Si recibes daño mientras tu libro espectral está manifestado, puedes anular TODO el daño usando tu Reacción. Sacrificas temporalmente hechizos de tu libro según una tirada de 3d6 (recuperados 1d6 días después).', { usos: 1, reset: 'largo' })
      ]
    },
    'magia-guerra': {
      n: 'Magia de Guerra',
      rasgos: [
        r(3, 'Desvío Arcano', 'reaccion', 'Cuando te aciertan con un ataque o fallas una tirada de salvación, usas tu Reacción para sumar +2 a tu CA contra ese ataque o +4 a esa salvación. Después, hasta el final de tu siguiente turno, solo puedes lanzar trucos.'),
        r(3, 'Ingenio Táctico', 'pasiva', 'Sumas tu modificador de Inteligencia a tus tiradas de iniciativa.'),
        r(6, 'Oleada de Poder', 'pasiva', 'Almacenas energía. Ganas una "carga" al disipar o contrarrestar hechizos. Una vez por turno, gastas una carga para añadir la mitad de tu nivel de Mago al daño por Fuerza a un hechizo.'),
        r(10, 'Magia Duradera', 'pasiva', 'Mientras mantengas concentración en un conjuro, obtienes un bonificador de +2 a la CA y un +2 a todas las tiradas de salvación.'),
        r(14, 'Manto Desviador', 'pasiva', 'Al usar tu rasgo base de Defensa Arcana (reacción), emites relámpagos arcanos a 3 objetivos cercanos; reciben daño de Fuerza igual a la mitad de tu nivel.')
      ]
    }
  }
};
