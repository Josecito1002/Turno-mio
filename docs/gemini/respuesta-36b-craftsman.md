=== A ===
export const thunderlordsGuild = {
  n: 3,
  rasgos: [
    {
      nombre: "Equipo de Señor del Trueno (Thunderlord Gear)",
      t: "fuera",
      texto: "En el nivel 3, fabricas dos piezas de equipo únicas: una célula de energía (power cell) y un par de guanteletes conductores (conduit gauntlets). Ambas son piezas de equipo complejas y costosas, que requieren largas horas de estudio y experimentación para ser creadas. Se asume que has estado trabajando en ellas en tu tiempo libre y que alcanzan su máxima funcionalidad al adoptar esta subclase.\n\nSi tu célula de energía se pierde o daña, puedes repararla o sustituirla durante un descanso largo con 100 po en materiales. Puedes reparar, sustituir o crear una copia de uno de tus guanteletes conductores durante un descanso largo con 150 po en materiales.\n\n**Puntos de Carga.** Tienes una reserva de puntos de carga que representan la energía eléctrica almacenada en tu célula de energía. Tu número máximo de puntos de carga es igual a la mitad de tu nivel de artesano, redondeado hacia arriba. Puedes gastar estos puntos para generar diversos efectos eléctricos a través de tus guanteletes. Recuperas todos los puntos de carga gastados al finalizar un descanso corto o largo.\n\n**Guanteletes Conductores.** Cada uno de tus guanteletes conductores es un arma a distancia exótica de obra maestra. Extraen su poder de tu célula de energía y no funcionan si se desconectan de ella. Mientras los llevas puestos, puedes manipular o sostener objetos con esas manos, aunque no puedes hacerlo y atacar con ellos al mismo tiempo. Puedes sumar tu modificador de Inteligencia en lugar de tu modificador de Destreza a las tiradas de ataque que realices con ellos.\n\n*Estadísticas:* Arma a Distancia Exótica. Coste 150 po, Peso 2 lb. Daño 2d6 relámpago. Propiedades: Blaster (40/120 pies), Ligera.",
      n: 3
    },
    {
      nombre: "Conducción (Conduction)",
      t: "especial",
      texto: "A partir del nivel 3, cuando impactas a una criatura con un ataque que inflige daño por relámpago en tu turno mientras llevas tus guanteletes conductores, puedes gastar uno o más puntos de carga para mejorar el ataque. Al hacerlo, suma tu modificador de Inteligencia a la tirada de daño del ataque y puedes aplicar uno de los siguientes efectos (ver Opciones Elegibles).",
      n: 3
    },
    {
      nombre: "Descarga (Shock)",
      t: "pasiva",
      texto: "En el nivel 3, mientras lleves puestos tus guanteletes conductores y tengas al menos un punto de carga sin gastar, puedes lanzar los trucos *agarre electrizante* (shocking grasp) y *perdonar la vida* (spare the dying). La Inteligencia es tu aptitud mágica para estos conjuros.",
      n: 3
    },
    {
      nombre: "Pararrayos (Lightning Rod)",
      t: "reaccion",
      texto: "A partir del nivel 7, mientras lleves tus guanteletes conductores, obtienes resistencia al daño por relámpago.\n\nAdemás, siempre que recibas daño por relámpago de una criatura hostil mientras lleves los guanteletes, puedes recuperar 2 puntos de carga gastados como reacción.",
      n: 7
    },
    {
      nombre: "Carga Estática (Static Charge)",
      t: "fuera",
      texto: "A partir del nivel 10, puedes pasar 10 minutos para almacenar una carga eléctrica en una armadura o arma, o hasta en 6 piezas de equipo si lo haces durante un descanso corto o largo.\n\n- **Armadura Cargada.** Al cargar una armadura, la primera vez que recibes daño de un ataque cuerpo a cuerpo, puedes usar tu reacción para gastar la carga, infligiendo 2d6 de daño por relámpago a la criatura que te golpeó.\n- **Arma Cargada.** Al cargar un arma, esta inflige 1d6 de daño por relámpago adicional al impactar, momento en el cual se gasta la carga.",
      n: 10
    },
    {
      nombre: "Alto Voltaje (High Voltage)",
      t: "adicional",
      texto: "A partir del nivel 14, mientras lleves tus guanteletes conductores, puedes gastar 5 puntos de carga para lanzar el conjuro *relámpago* (lightning bolt) sin gastar un espacio de conjuro. Este conjuro usa tu CD de Obra Maestra.\n\nAdemás, cuando infliges daño por relámpago a una criatura dos veces en tu turno, puedes usar tu acción adicional para infligirle 1d8 de daño por relámpago extra.",
      n: 14
    },
    {
      nombre: "Maestro Electricista (Master Electrician)",
      t: "pasiva",
      texto: "En el nivel 18, alcanzas la cúspide de tu oficio. Aprendes las propiedades Legendarias **Bobina (Coil)** y **Conductivo (Conductive)** (ver Opciones Elegibles).",
      n: 18
    }
  ]
};

export const trappersGuild = {
  n: 3,
  rasgos: [
    {
      nombre: "Sentido del Peligro (Danger Sense)",
      t: "pasiva",
      texto: "En el nivel 3, tu experiencia con trampas te da ventaja al escapar del peligro. Tienes ventaja en las tiradas de salvación de Destreza contra efectos que puedas ver, como trampas y conjuros. Para obtener este beneficio, no puedes estar cegado, ensordecido o incapacitado.",
      n: 3
    },
    {
      nombre: "Trampas (Traps)",
      t: "accion",
      texto: "Eres un experto en el diseño de trampas ingeniosas y letales. A partir del nivel 3, puedes fabricar y desplegar trampas usando tus herramientas de fabricación y una bolsa de piezas de trampero (engranajes, detonadores, resortes, etc.).\n\nPuedes desplegar un número de trampas igual a tu nivel de artesano sin coste, y recuperas todos los despliegues gastados al terminar un descanso largo. Puedes desarmar una trampa y recuperarla como acción o acción adicional. Si despliegas una trampa y la recuperas antes de tomar un descanso largo, no cuenta para el número de trampas que puedes desplegar.\n\nEn lugar de mejorar tus trampas de forma independiente, refinas la calidad de tus piezas usando la propiedad de Obra Maestra **Mejora de Trampa (Trap Upgrade)** (ver Opciones Elegibles).",
      n: 3
    },
    {
      nombre: "Trampas Inteligentes (Smart Traps)",
      t: "pasiva",
      texto: "A partir del nivel 7, las trampas que despliegas no se activan ni tienen como objetivo a las criaturas que tú elijas.",
      n: 7
    },
    {
      nombre: "Trampa Caza-bobos (Booby Trap)",
      t: "fuera",
      texto: "A partir del nivel 10, te tomas 10 minutos para ocultar una de tus trampas a un objetivo desprevenido. Una criatura puede detectar una trampa oculta usando su acción para hacer una prueba de Inteligencia (Investigación) o Sabiduría (Percepción) enfrentada a tu CD de técnica de fabricación, o teniendo una Percepción pasiva superior a esa CD. La primera vez que esta trampa se activa, inflige el doble del daño normal.",
      n: 10
    },
    {
      nombre: "Montaje Rápido (Rapid Setup)",
      t: "accion",
      texto: "En el nivel 14, puedes ensamblar un guantelete de trampas en un abrir y cerrar de ojos. Como acción, puedes desplegar tres trampas que tengan un tiempo de despliegue de 1 acción. Estas trampas no pueden activarse hasta el final de tu turno. Una vez que usas esta habilidad, no puedes volver a hacerlo hasta terminar un descanso largo.",
      n: 14,
      usos: "1",
      reset: "Largo"
    },
    {
      nombre: "Maestro Trampero (Master Trapsmith)",
      t: "pasiva",
      texto: "En el nivel 18, alcanzas la cúspide de tu oficio. Aprendes la técnica Legendaria **Arma de Emboscada (Ambush Weapon)** (ver Opciones Elegibles).",
      n: 18
    }
  ]
};

export const lote36bOptions = {
  "Conducción: Estallido (Burst)": "Cada criatura a 10 pies de la criatura que impactaste debe superar una tirada de salvación de Destreza contra tu CD de Obra Maestra o recibir daño por relámpago igual a la mitad del daño de la tirada original.",
  "Conducción: Cadena (Chain)": "Tu ataque hace que el relámpago salte a criaturas cercanas. Por cada 2 puntos de carga gastados, puedes realizar un único ataque de conjuro a distancia contra una criatura que puedas ver a 15 pies o menos de la criatura impactada. Este ataque inflige 1d8 + tu modificador de Inteligencia si impacta.",
  "Conducción: Destello (Flash)": "Puedes usar tu acción adicional para moverte hasta la mitad de tu velocidad de movimiento. Hacerlo no provoca ataques de oportunidad.",
  "Conducción: Impulso (Impulse)": "La criatura que impactaste es empujada 10 pies en dirección opuesta a ti por cada punto de carga gastado.",
  "Conducción: Sacudida (Jolt)": "La criatura que impactaste no puede usar reacciones hasta el inicio de tu próximo turno.",

  "Propiedad Legendaria: Bobina (Coil)": "Componentes: Armadura exótica de obra maestra. Instalas una bobina eléctrica en la espalda de tu armadura. Como acción adicional, puedes activar o desactivar la bobina, generando un campo de 10 pies de radio de energía eléctrica a tu alrededor. La primera vez que una criatura entra en esta área durante un turno o si empieza su turno ahí, debe hacer una TS de Destreza o recibir 2d6 de daño por relámpago. Una criatura dañada por esto no puede usar su reacción hasta el final de tu siguiente turno.",
  "Propiedad Legendaria: Conductivo (Conductive)": "Componentes: Guantelete conductor. Cuando usas la habilidad Conducción con esta arma, puedes añadir el efecto Aturdir si gastas 2 o más puntos de carga: el objetivo debe superar una TS de Constitución o quedar aturdido hasta el final de tu próximo turno.",

  "Propiedad Aprendiz: Mejora de Trampa (Trap Upgrade)": "Componentes: Piezas de trampero. Cualquier trampa que construyas usando estas piezas tiene un bonificador de +1 a sus tiradas de ataque y CD de salvación. Puedes aplicar esta propiedad varias veces, una en cada nivel de propiedades de Obra Maestra, aumentando el bonificador en +1 cada vez.",
  "Propiedad Legendaria: Arma de Emboscada (Ambush Weapon)": "Componentes: Arma exótica de obra maestra a Dos Manos. Integrando los resortes y engranajes a tu arma, siempre tienes una trampa de despliegue rápido a mano. Puedes usar tu acción para cargar cualquier trampa con un tiempo de despliegue de 1 acción en esta arma. Una vez cargada, la trampa puede desplegarse como acción adicional.",

  "Trampa: Torreta Automática (Auto-Turret)": "Despliegue: 1 acción. Alcance: 5 pies. Activador: 1 acción adicional. Apunta y dispara automáticamente un virote. Designas al objetivo (a 30 pies) como acción adicional. Ataque = prof + Int. Daño: 1d8 perforante. Contiene 10 municiones y se desactiva tras 1 minuto.",
  "Trampa: Barrera Desplegable (Deployable Barrier)": "Despliegue: 1 acción. Alcance: 5 pies. Activador: Ninguno. Barrera de 5 pies de ancho y 4 de alto. CA 8, 25 PG. Cobertura 3/4 para Medianos, cobertura total para Pequeños o inferiores. Varias pueden unirse.",
  "Trampa: Mina Terrestre (Landmine)": "Despliegue: 1 minuto. Alcance: 0 pies. Activador: Entrar en el área. Mina enterrada en cuadro de 5 pies. Criatura Pequeña o mayor que pise requiere TS Destreza. Falla: 1d10 daño (mitad si supera). Criaturas a 5 pies reciben mitad de daño en fallo. Detectable con Percepción vs CD. Daño: 2d10 (nv 5), 3d10 (nv 11), 4d10 (nv 17).",
  "Trampa: Trampa para Hombres (Man-Trap)": "Despliegue: 1 acción. Alcance: 0 pies. Activador: Entrar en el área. Trampa de caza en cuadro de 5 pies. TS Destreza o recibe 1d10 cortante y velocidad 0. Acción para prueba de Fuerza vs CD Obra Maestra para liberarse. Criaturas Enormes o mayores se mueven llevándosela. Daño: 2d10 (nv 5), 3d10 (nv 11), 4d10 (nv 17).",
  "Trampa: Alambre de Espino (Razor Wire)": "Despliegue: 1 acción. Alcance: 10 pies. Activador: Cruzar la línea. Hilo casi invisible entre 2 puntos. Detectable con Percepción vs CD Obra Maestra. TS Destreza al cruzarlo: 2d8 cortante si falla, mitad si supera.",
  "Trampa: Bomba a Control Remoto (Remote-Control Bomb)": "Despliegue: 1 acción. Alcance: 5 pies. Activador: Contacto. Constructo rodante. Acción adicional para moverlo 25 pies (ves desde su perspectiva). Explota al chocar: TS Destreza o 1d8 fuego (mitad si supera). Daño: 2d8 (nv 5), 3d8 (nv 11), 4d8 (nv 17).",
  "Trampa: Mina de Activación (Trigger Mine)": "Despliegue: 1 acción. Alcance: 30 pies. Activador: 1 acción adicional. Presionas el detonador y explotan todas a la vez. A 5 pies de una mina: TS Destreza o 1d8 fuego (mitad si supera). Daño: 2d8 (nv 5), 3d8 (nv 11), 4d8 (nv 17).",

  "Propiedad Aparato Aprendiz: Comodidades (Amenities)": "El interior es acogedor (manta, almohada). Puedes dormir en él sin efectos negativos.",
  "Propiedad Aparato Aprendiz: Arnés de Control (Control Harness)": "Mientras pilotas, no puedes ser desmontado contra tu voluntad.",
  "Propiedad Aparato Aprendiz: Asiento Eyectable (Ejector Seat)": "Sistema de emergencia. Salir del aparato no cuesta movimiento.",
  "Propiedad Aparato Aprendiz: Inyector de Elixir (Elixir Injector)": "Como acción, le das una poción al aparato, afectándole como si la bebiese.",
  "Propiedad Aparato Aprendiz: Amortiguadores Pesados (Heavy Shocks)": "Al recibir daño por caída, trata la altura como 50 pies menos.",
  "Propiedad Aparato Aprendiz: Armazón Telescópico (Telescopic Frame)": "Puede encogerse a tamaño Mediano cuando está vacío. No puede ser ocupado en ese tamaño.",
  "Propiedad Aparato Aprendiz: Pintura de Guerra (Warpaint)": "Mientras lo montas, sumas tu modificador de Inteligencia a las pruebas de Carisma (Intimidación).",
  "Propiedad Aparato Oficial: Servos Traseros (Stern Servos)": "La Fuerza del aparato aumenta en 3 (a 17).",
  "Propiedad Aparato Oficial: Servos Robustos (Sturdy Servos)": "La Constitución del aparato aumenta en 3 (a 17), subiendo los PG máximos en tu nivel.",
  "Propiedad Aparato Oficial: Servos Rápidos (Swift Servos)": "La Destreza del aparato aumenta en 3 (a 17).",
  "Propiedad Aparato Maestro: Compartimentos de Ettercap (Ettercap Compartments)": "Gana velocidad de escalada igual a su movimiento, y puede escalar techos y superficies verticales.",
  "Propiedad Aparato Maestro: Capa Orgánica (Organic Interlay)": "Su tipo sigue siendo constructo, pero puede recuperar PG con magia de curación.",
  "Propiedad Aparato Legendario: Vínculo Arcano (Arcana Tether)": "Cuando te afecte un conjuro que solo te tenga a ti como objetivo, puedes hacer que también afecte a tu aparato.",
  "Propiedad Aparato Legendario: Cubierta de Glasacero (Glasteel Cover)": "El jinete del aparato tiene cobertura total contra ataques del exterior.",

  "Propiedad Arma Aprendiz: Aerodinámica (Aerodynamic)": "Para armas Arrojadizas. El alcance arrojadizo se duplica, el dado de daño baja 1 grado.",
  "Propiedad Arma Aprendiz: Automática (Automatic)": "Gana la propiedad Automática, el dado de daño baja 1 grado. (Automática: al atacar en tu turno puedes optar por dar 2 ataques con desventaja obligatoria y doble gasto de munición).",
  "Propiedad Arma Aprendiz: Equilibrada (Balanced)": "Para arma marcial Pesada. Gana propiedad Equilibrada (las criaturas Pequeñas la usan sin desventaja).",
  "Propiedad Arma Aprendiz: Blaster": "Pierde Munición y Recarga (y sus bonos de daño). Gana Blaster y daño radiante. Si no era de fuego, el dado de daño sube 3 grados y pasa a 2 dados. (Blaster: Sin munición, no suma modificador de característica al daño).",
  "Propiedad Arma Aprendiz: Plegable (Collapsible)": "Ventaja en Sigilo para ocultarla plegada.",
  "Propiedad Arma Aprendiz: Elegante (Elegant)": "Para exótica Ligera. Gana Elegante, daño sube 1 grado. (Elegante: requiere Destreza 16+ para usar).",
  "Propiedad Arma Aprendiz: Exótica (Exotic)": "Arma marcial pasa a exótica, dado de daño sube 1 grado.",
  "Propiedad Arma Aprendiz: Cargador Ampliado (Extended Magazine)": "Arma con Recarga duplica su capacidad.",
  "Propiedad Arma Aprendiz: Sutil (Finesse)": "Arma cuerpo a cuerpo sin Dos manos obtiene Sutil.",
  "Propiedad Arma Aprendiz: Puño (Fist)": "Daño baja 1 grado. Los ataques cuentan como impactos desarmados.",
  "Propiedad Arma Aprendiz: Empuñadura Frontal (Foregrip)": "Gana propiedad Empuñadura frontal. (A dos manos duplica su alcance).",
  "Propiedad Arma Aprendiz: Pesada (Heavy)": "Gana propiedad Pesada, dado de daño sube 1 grado.",
  "Propiedad Arma Aprendiz: Ligera (Light)": "Gana propiedad Ligera, dado de daño baja 1 grado.",
  "Propiedad Arma Aprendiz: De Carga (Loading)": "Gana propiedad De carga. Dado de daño sube 1 grado.",
  "Propiedad Arma Aprendiz: Marcial (Martial)": "Arma simple pasa a marcial. Si es cuerpo a cuerpo, daño sube 1 grado. Si es distancia, alcance corto +20 pies, y largo +60 u 80 pies dependiendo de su multiplicador.",
  "Propiedad Arma Aprendiz: No Letal (Nonlethal)": "Puedes elegir dejar inconsciente en vez de matar al reducir a 0 PG.",
  "Propiedad Arma Aprendiz: Emparejada (Paired)": "Viene con un arma gemela idéntica. Puedes desenfundar/guardar ambas a la vez.",
  "Propiedad Arma Aprendiz: De Parada (Parrying)": "Si no llevas escudo, obtienes +1 CA contra ataques cuerpo a cuerpo. Solo te beneficias de un arma De parada.",
  "Propiedad Arma Aprendiz: Alcance (Reach)": "Para marcial Sutil o Dos manos. Gana Alcance, dado de daño baja 1 grado.",
  "Propiedad Arma Aprendiz: Retornable (Returning)": "Arma Ligera/Arrojadiza vuelve a tu mano al final de tu turno.",
  "Propiedad Arma Aprendiz: Recarga (Reload)": "Sustituye De carga, ganando Recarga (5) y bajando el daño 1 grado. Si tiene Montada, puede ganar Recarga (1, 2 acciones) y el daño sube 2 grados.",
  "Propiedad Arma Aprendiz: Dispersión (Scatter)": "Dado de daño baja 1 grado. Alcances se reducen a la mitad. Contra un objetivo a la mitad o menos de su nuevo alcance normal, el dado de daño sube 2 grados.",
  "Propiedad Arma Aprendiz: Con Mira (Sighted)": "Alcance se duplica. O bien gana Con Mira (desventaja a menos de 20 pies) o su dado de daño baja 1 grado.",
  "Propiedad Arma Aprendiz: Superpesada (Superheavy)": "Dado de daño sube 1 grado. Requiere Fuerza 16+ para usar con competencia.",
  "Propiedad Arma Aprendiz: Transformable (Switch)": "Combina dos armas exóticas. El daño de cada forma baja 1 grado. Cambiar de forma cuenta como desenfundar.",
  "Propiedad Arma Aprendiz: Tensión (Tension)": "Eliges usar Fuerza o Destreza (debes usar la misma) para ataque y daño a distancia.",
  "Propiedad Arma Aprendiz: Arrojadiza (Thrown)": "Gana propiedad Arrojadiza (20/60 pies).",
  "Propiedad Arma Aprendiz: Derribo (Trip)": "Al impactar, en lugar de daño, usas acción adicional para intentar empujar (caer derribado) con ventaja.",
  "Propiedad Arma Aprendiz: A Dos Manos (Two-Handed)": "Gana propiedad A dos manos, dado de daño sube 1 grado.",
  "Propiedad Arma Aprendiz: Variable (Variable)": "Blaster que permite cambiar daño (frío, fuego, relámpago, radiante, trueno o normal) como acción adicional.",
  "Propiedad Arma Aprendiz: Versátil (Versatile)": "Gana Versátil. Al usar a dos manos, el dado de daño sube 1 grado.",

  "Propiedad Arma Oficial: Brutal (Brutal)": "Inflige 2 dados extra de daño con un golpe crítico.",
  "Propiedad Arma Oficial: Contrapesada (Counterweighted)": "Para arma Dos manos exótica. Si tienes Fuerza 17+, la puedes usar a una mano.",
  "Propiedad Arma Oficial: Doble (Double)": "Al usar la acción Atacar, puedes hacer ataque extra como acción adicional sin sumar modificador al daño.",
  "Propiedad Arma Oficial: Explosiva (Explosive)": "Dado de daño baja 1 grado. Al impactar o dar a un espacio, explota en radio de 5 pies (TS Destreza vs CD Obra Maestra, mitad daño si supera).",
  "Propiedad Arma Oficial: Masiva (Massive)": "Para Superpesada. Dado de daño sube 2 grados. Solo puedes atacar una vez por turno con ella. Si pudieses atacar más de una vez, infliges 2 dados más de daño.",
  "Propiedad Arma Oficial: Montada (Mounted)": "Para Pesada. Dado de daño sube 2 grados. Acción para montar/desmontar (estática si montada). Para usar sin montar se requiere tamaño Mediano y Fuerza 15+.",
  "Propiedad Arma Oficial: Sobrecalentamiento (Overheat)": "Dado de daño sube 2 grados. Tras atacar, no puede usarse de nuevo hasta el fin de tu siguiente turno.",
  "Propiedad Arma Oficial: Precisión (Precision)": "Una vez por turno, inflige +1d6 daño si tienes ventaja en el ataque.",
  "Propiedad Arma Oficial: Estriada (Rifled)": "No tienes desventaja al disparar a alcance largo.",
  "Propiedad Arma Oficial: Cohete (Rocket)": "Dado de daño baja 1 grado. Una vez por turno, +1d4 daño al impactar.",
  "Propiedad Arma Oficial: Tiro Gemelo (Twinshot)": "Una vez por turno, tras atacar, puedes realizar otro ataque contra un objetivo distinto a 5 pies del original.",

  "Propiedad Arma Maestro: Adamantina (Adamantine)": "Dado de daño sube 2 grados, inflige el doble de daño a objetos.",
  "Propiedad Arma Maestro: Bendecida (Blessed)": "+1d6 radiante (+1d12 a infernales o muertos vivientes).",
  "Propiedad Arma Maestro: Maldita (Cursed)": "+1d6 necrótico (+1d12 a celestiales o féricos).",
  "Propiedad Arma Maestro: Golpe Mortal (Deadblow)": "+1d4 contundente. Empujas automáticamente al objetivo hasta 10 pies (Grande o inferior).",
  "Propiedad Arma Maestro: Rompetierras (Earthshatter)": "Para arma Masiva. Al impactar, el objetivo debe superar TS Fuerza o caer derribado.",
  "Propiedad Arma Maestro: Afilada (Keen)": "Para Elegante. Golpe crítico con 19 o 20.",
  "Propiedad Arma Maestro: Nociva (Noxious)": "+1d8 veneno.",
  "Propiedad Arma Maestro: Magnética (Magnetic)": "+1d4 relámpago. Bonificador +1d4 a la tirada de ataque contra criaturas con armadura o cuerpo de metal.",
  "Propiedad Arma Maestro: Mitral (Mithral)": "Dado de daño sube 2 grados. El arma pesa la mitad.",
  "Propiedad Arma Maestro: Primordial (Primordial)": "+1d6 fuego, relámpago, frío, ácido o trueno (a tu elección).",
  "Propiedad Arma Maestro: Resonante (Resonant)": "+1d4 psíquico (+1d10 en golpe crítico).",
  "Propiedad Arma Maestro: Dentada (Serrated)": "Si dañas a una criatura 2+ veces en un solo turno, recibe +1d12 cortante adicional.",

  "Propiedad Arma Legendario: Hendiente (Cleaving)": "En golpe crítico haces +4d6 cortante. Si sacas un 20 natural en el d20, tira otro d20. Si vuelve a ser 20, cercenas un miembro al objetivo.",
  "Propiedad Arma Legendario: Aplastante (Crushing)": "Cada impacto reduce la CA del objetivo en 1 (mínimo 10) hasta que este complete un descanso.",
  "Propiedad Arma Legendario: Mortífera (Deadly)": "Para arma de fuego/blaster. Sumas tu modificador de característica tanto a la tirada de ataque como a la de daño.",
  "Propiedad Arma Legendario: Penetrante (Penetrating)": "Ataca a todas las criaturas en una línea dentro del alcance normal; cada una debe superar TS Destreza o recibir el daño.",
  "Propiedad Arma Legendario: Buscadora (Seeking)": "Una vez por turno, si atacas sin desventaja y fallas, el ataque impacta automáticamente e inflige el daño mínimo.",
  "Propiedad Arma Legendario: Veloz (Swift)": "Para arma Elegante. Puedes hacer un ataque adicional como acción adicional. Combate con dos armas veloces da 2 ataques como acción adicional.",
  "Propiedad Arma Legendario: Amenazadora (Threatening)": "Ataques de oportunidad no consumen tu reacción.",

  "Propiedad Armadura Aprendiz: Con Tacos (Cleated)": "Reduce en 10 pies el movimiento forzado que recibas.",
  "Propiedad Armadura Aprendiz: De Escalada (Climbing)": "Velocidad de escalada igual a tu velocidad (requiere una mano libre).",
  "Propiedad Armadura Aprendiz: Cómoda (Comfortable)": "Puedes dormir con ella sin efectos perjudiciales.",
  "Propiedad Armadura Aprendiz: Ambiental (Environmental)": "Ignoras efectos dañinos por temperaturas de -100 F a 300 F (-73 C a 148 C).",
  "Propiedad Armadura Aprendiz: Exótica (Exotic)": "La armadura pasa a ser exótica y su CA aumenta en +1.",
  "Propiedad Armadura Aprendiz: Integrada (Integrated)": "Integras 1 arma (o 2 si no tienen Dos Manos). Desenvainar te la coloca en la mano, guardar la retrae. No puedes ser desarmado.",
  "Propiedad Armadura Aprendiz: De Placas (Plated)": "Media armadura: CA pasa a 18, pero no sumas bono de Destreza y tienes desventaja en Sigilo.",
  "Propiedad Armadura Aprendiz: De Cambio Rápido (Quick-Change)": "Ponerte o quitarte la armadura requiere solo 1 acción.",
  "Propiedad Armadura Aprendiz: Retráctil (Retractable)": "Escudo retráctil incorporado al guantelete. Poner o quitar como acción adicional.",
  "Propiedad Armadura Aprendiz: De Escamas (Scaled)": "Armadura ligera: CA aumenta en +3, pero el bono máximo de Destreza pasa a ser +2.",
  "Propiedad Armadura Aprendiz: Con Pinchos (Spiked)": "Armadura pesada. Criaturas agarradas o engullidas reciben daño perforante = 1d4 + mod Fuerza al inicio de tu turno.",
  "Propiedad Armadura Aprendiz: Tachonada (Studded)": "Armadura ligera: CA aumenta en +1.",

  "Propiedad Armadura Oficial: Adamantina (Adamantine)": "Armadura pesada. Los golpes críticos en tu contra se convierten en golpes normales.",
  "Propiedad Armadura Oficial: Arcana (Arcane)": "Concede 2 trucos de cualquier lista. Inteligencia es la característica de lanzamiento.",
  "Propiedad Armadura Oficial: De Buceo (Diving)": "Velocidad de nado igual a tu velocidad. Bolsa de aire de 1 hora (inmunidad a venenos inhalados; se rellena en descanso largo).",
  "Propiedad Armadura Oficial: Juggernaut": "Pesada exótica. Otorgas cobertura 3/4 en vez de media a criaturas a 5 pies de ti. Requiere Fuerza 18+.",
  "Propiedad Armadura Oficial: Magnética (Magnetic)": "Media/pesada. Acción adicional para activar bobina: si alguien a 5 pies es objetivo de ataque a distancia, tú pasas a ser el objetivo.",
  "Propiedad Armadura Oficial: De Maniobra (Maneuvering)": "Ligera/media. Ganchos de agarre. Reacción al caer o acción adicional para lanzarte a una ubicación visible que sostenga tu peso sin provocar ataques de oportunidad. Requiere Destreza 16+.",
  "Propiedad Armadura Oficial: Mitral (Mithral)": "Pesa la mitad, sin requisito de Fuerza, sin desventaja en Sigilo, bono máximo Destreza aumenta en +1 (si tiene límite). Media mitral se oculta bajo ropa normal.",
  "Propiedad Armadura Oficial: Resistencia (Resistance)": "Elige un tipo de daño (salvo psíquico). Obtienes resistencia a ese daño.",

  "Propiedad Armadura Maestro: De Camuflaje (Cloaking)": "Ligera exótica. Te permite lanzar el conjuro *invisibilidad* 1 vez por descanso corto o largo.",
  "Propiedad Armadura Maestro: De Relojería (Clockwork)": "Pesada exótica. Velocidad +10 pies, salto x3, ventaja en pruebas de Fuerza (Atletismo) excepto agarres.",
  "Propiedad Armadura Maestro: Escama de Dragón (Dragonscale)": "Media/pesada. Ventaja en TS contra Presencia Pavorosa y armas de aliento dracónicas. Resistencia a un tipo de daño según el dragón elegido (Negro/Cobre: Ácido; Azul/Bronce: Relámpago; Oropel/Oro/Rojo: Fuego; Verde: Veneno; Plata/Blanco: Frío).",
  "Propiedad Armadura Maestro: Fantasmal (Ghostly)": "Armadura exótica. Como acción adicional ganas los efectos de *etereidad* por 10 minutos (puedes activar/desactivar). Se recarga en descanso largo.",
  "Propiedad Armadura Maestro: Piel de Trol (Trollskin)": "Armadura exótica. Como acción adicional, recuperas 1d10 + mod Constitución puntos de golpe. 2 usos por descanso corto o largo.",
  "Propiedad Armadura Maestro: Alada (Winged)": "Ligera exótica. Alas extendibles como acción adicional; dan velocidad de vuelo igual a tu velocidad.",

  "Propiedad Armadura Legendario: Furiosa (Furious)": "Armadura exótica. Si te quedan la mitad o menos de tus PG, tienes resistencia a daño contundente, perforante y cortante.",
  "Propiedad Armadura Legendario: Gólem (Golem)": "Pesada exótica. Trata tu tamaño como si estuvieras bajo el efecto 'Agrandar' del conjuro *agrandar/reducir*.",
  "Propiedad Armadura Legendario: Hiper (Hyper)": "Ligera exótica. Velocidad +10 pies, ventaja en Iniciativa y puedes realizar la acción de Correr como acción adicional.",
  "Propiedad Armadura Legendario: Inmortal (Immortal)": "Media/pesada. Ventaja en TS de Muerte. Para determinar muerte instantánea por daño masivo, tus PG máximos aumentan en 50. Al sacar un 20 en la TS de Muerte, recuperas PG = nivel de artesano + Int.",
  "Propiedad Armadura Legendario: Sobreescudo (Overshield)": "Media exótica. Como acción adicional en tu turno, obtienes PG temporales = a la mitad de tu nivel de artesano.",
  "Propiedad Armadura Legendario: Guardia de Conjuros (Spellguard)": "Armadura exótica. Ventaja en tiradas de salvación contra conjuros."
};

=== B ===
{
  "thunderlords-guild": {
    "usos": "Math.ceil(level / 2)",
    "reset": "Corto o Largo"
  },
  "trappers-guild": {
    "usos": "level",
    "reset": "Largo"
  }
}

=== C ===
{
  "thunderlords-guild": "Craftsman (Valda's Spire of Secrets)",
  "trappers-guild": "Craftsman (Valda's Spire of Secrets)"
}

=== D ===
{
  "thunderlords-guild": "Embellecen la majestuosidad de la naturaleza para capturar relámpagos en una botella, usando electricidad y voltaje puro en sus armas.",
  "trappers-guild": "Expertos en diseñar letales e ingeniosos sistemas de trampas, asegurando áreas enteras para aniquilar intrusos a la distancia."
}

=== E ===
* **Traducción de Exclusiones y Terminología:** El término "Loading" se ha traducido como "De Carga" mientras que "Reload" se ha traducido como "Recarga (N)", a fin de preservar la distinción de la fuente (donde el primero restringe la cantidad de ataques permitidos a 1, mientras que el segundo define un límite de cargador numérico).
* **CD de Salvación de los Explosivos y Trampas:** La armería exótica hace referencia en general a tiradas de salvación fijas para su armamento de explosión (ej. Explosive tiene un DC de 14 por defecto en las armas y Minas), sin embargo, todas las trampas escalan usando el "Masterwork save DC" (CD de salvación de Obra Maestra). El "Explosive" de las Propiedades de Arma hace referencia a una TS Destreza de la "Masterwork save DC" como rige la instrucción del bonificador del Artesano, aunque el texto introductorio en las páginas mencionaba 14 por omisión. 
* **Opciones agrupadas:** Todos los constructos (Mecanauta), herramientas modulares y propiedades exóticas del texto se han mapeado en la variable de TS (para Opciones Elegibles) en la sección `lote36bOptions`. 
* **Armamento:** Los detalles tabulares y perfiles de armas exóticas base no requirieron estructuración en A porque el PDF los expone solo como referencias de costo y daño, mientras que las reglas mecánicas operan con las "Properties" propiamente trasladadas.