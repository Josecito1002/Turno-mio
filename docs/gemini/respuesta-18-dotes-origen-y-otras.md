=== A ===

```ts
export const DOTES_NUEVAS: Record<string, { n: string; t: string; cat: string; nivelMin: number; texto: string }> = {
  'lib:mejora-caracteristica': { n: 'Mejora de Característica', t: 'pasiva', cat: 'General', nivelMin: 4, texto: 'Aumentas una característica en 2 puntos, o dos características diferentes en 1 punto cada una. Esta dote no puede subir una puntuación por encima de 20. Puedes coger esta dote varias veces. Requisito: nivel 4.' },
  'lib:anatomia-aberrante': { n: 'Anatomía Aberrante', t: 'pasiva', cat: 'Don Oscuro', nivelMin: 1, texto: 'Puedes aguantar la respiración 1 hora, ganas Pericia en Percepción y Visión Ciega a 15 pies. Si sacas un 1 natural en una prueba d20, el influjo aberrante altera tu carne: debes superar una salvación de Constitución o quedarás Aturdido hasta el final de tu siguiente turno.' },
  'lib:marca-aberrante': { n: 'Marca Aberrante', t: 'reaccion', cat: 'Marca de Dragón', nivelMin: 1, texto: 'Sumas 1d4 a una salvación de CON fallida (1/día). Aprendes un truco y un conjuro de nv 1 de Hechicero (usas Constitución). Cuando lanzas ese conjuro de nv 1, puedes quemar un Dado de Golpe: si es par, ganas esa cantidad en Vida Temporal; si es impar, un enemigo a 30 pies sufre ese daño por Fuerza.' },
  'lib:artista-arcano': { n: 'Artista Arcano', t: 'pasiva', cat: 'Origen', nivelMin: 1, texto: 'Aprendes el truco Ilusión menor (usas INT, SAB o CAR). Cuando lanzas un conjuro de la escuela de Ilusión, puedes otorgar Inspiración Heroica a un aliado que te vea a 30 pies (1 vez por Descanso Largo).' },
  'lib:elocuencia-arcana': { n: 'Elocuencia Arcana', t: 'pasiva', cat: 'Origen', nivelMin: 1, texto: 'Aprendes el truco Burla cruel (usas INT, SAB o CAR). Cuando haces una prueba de Carisma usando Engaño, Intimidación o Persuasión, puedes tirar 1d4 adicional y sumarlo a tu resultado.' },
  'lib:infiltrador-arcano': { n: 'Infiltrador Arcano', t: 'adicional', cat: 'Origen', nivelMin: 1, texto: 'Aprendes el truco Amistad (usas INT, SAB o CAR). Tienes la capacidad de usar la acción de Esquivar como Acción Adicional una cantidad de veces igual a tu Bono de Competencia (recargas al completar un Descanso Largo).' },
  'lib:presagios-arcanos': { n: 'Presagios Arcanos', t: 'reaccion', cat: 'Origen', nivelMin: 1, texto: 'Aprendes el truco Guía (usas INT, SAB o CAR). Cuando tú o un aliado a 30 pies falláis una salvación, puedes usar tu Reacción para sumar 1d4 a la tirada e intentar convertirla en un éxito (usos iguales a PB al día).' },
  'lib:sobrecarga-arcana': { n: 'Sobrecarga Arcana', t: 'pasiva', cat: 'Origen', nivelMin: 1, texto: 'Aprendes el truco Descarga de fuego (usas INT, SAB o CAR). Cuando lanzas un conjuro de Evocación y causas daño, puedes sumar tu Bono de Competencia a una de las tiradas de daño del conjuro (1 vez por Descanso Largo).' },
  'lib:salvaguarda-arcana': { n: 'Salvaguarda Arcana', t: 'adicional', cat: 'Origen', nivelMin: 1, texto: 'Aprendes el truco Resistencia (usas INT, SAB o CAR) y puedes lanzarlo como Acción Adicional (PB usos/día). Además, al usar la acción de Ayudar en una prueba de habilidad de un aliado, le otorgas PG Temporales iguales a tu PB.' },
  'lib:enterrador-arcano': { n: 'Enterrador Arcano', t: 'pasiva', cat: 'Origen', nivelMin: 1, texto: 'Aprendes un truco de Necromancia de Clérigo o Mago (usas INT, SAB o CAR). Sumas 1d4 a tus pruebas de Historia o Medicina. Al usar Ayudar para estabilizar a alguien moribundo, ganas Inspiración Heroica (1/día).' },
  'lib:guerrero-arcano': { n: 'Guerrero Arcano', t: 'pasiva', cat: 'Estilo de Combate', nivelMin: 1, texto: 'Aprendes dos trucos de Mago (usas INT, SAB o CAR). Cada vez que subes de nivel, puedes sustituir uno de estos trucos por otro diferente de la lista de Mago. Requisito: rasgo Estilo de Combate.' },
  'lib:tiro-con-arco': { n: 'Tiro con Arco', t: 'pasiva', cat: 'Estilo de Combate', nivelMin: 1, texto: 'Obtienes un bonificador de +2 a las tiradas de ataque que realices con armas a distancia. Requisito: rasgo Estilo de Combate.' },
  'lib:guerrero-bendecido': { n: 'Guerrero Bendecido', t: 'pasiva', cat: 'Estilo de Combate', nivelMin: 2, texto: 'Aprendes dos trucos de Clérigo que cuentan como conjuros de Paladín para ti (usas Carisma). Cada vez que ganes un nivel de Paladín, puedes cambiar uno de ellos por otro de Clérigo. Requisito: rasgo Estilo de Combate de Paladín.' },
  'lib:lucha-aciegas': { n: 'Lucha a Ciegas', t: 'pasiva', cat: 'Estilo de Combate', nivelMin: 1, texto: 'Obtienes Visión Ciega con un alcance de 10 pies. Requisito: rasgo Estilo de Combate.' },
  'lib:iniciado-culto-dragon': { n: 'Iniciado del Culto del Dragón', t: 'accion', cat: 'Origen', nivelMin: 1, texto: 'Aprendes Dracónico (o un idioma nuevo si ya lo sabías). Como Acción Mágica, fuerzas a alguien a 30 pies a hacer salvación SAB o quedar Asustado 1 turno. Cuando logras asustar a alguien así, ganas Inspiración Heroica (1/descanso).' },
  'lib:defensa': { n: 'Defensa', t: 'pasiva', cat: 'Estilo de Combate', nivelMin: 1, texto: 'Mientras lleves puesta armadura ligera, media o pesada, obtienes un bonificador de +1 a tu Clase de Armadura. Requisito: rasgo Estilo de Combate.' },
  'lib:guerrero-druidico': { n: 'Guerrero Druídico', t: 'pasiva', cat: 'Estilo de Combate', nivelMin: 2, texto: 'Aprendes dos trucos de Druida que cuentan como conjuros de Explorador para ti (usas Sabiduría). Cada vez que ganes un nivel de Explorador, puedes cambiar uno de ellos por otro de Druida. Requisito: rasgo Estilo de Combate de Explorador.' },
  'lib:duelo': { n: 'Duelo', t: 'pasiva', cat: 'Estilo de Combate', nivelMin: 1, texto: 'Cuando empuñas un arma cuerpo a cuerpo en una mano y ninguna otra arma, obtienes un bonificador de +2 a las tiradas de daño con ella. Requisito: rasgo Estilo de Combate.' },
  'lib:alma-resonante': { n: 'Alma Resonante', t: 'pasiva', cat: 'Don Oscuro', nivelMin: 1, texto: 'Ganas competencia en 2 habilidades y un idioma. Además, eliges una habilidad en la que ya seas competente para ganar Pericia (puedes rotarla al descansar). Si sacas un 1 natural en un d20, tus recuerdos de vidas pasadas amenazan con Incapacitarte y reducir tu velocidad (salvación CON).' },
  'lib:principiante-enclave-esmeralda': { n: 'Principiante del Enclave Esmeralda', t: 'pasiva', cat: 'Origen', nivelMin: 1, texto: 'Tienes Ventaja al usar Influencia sobre Bestias. Siempre tienes Sentidos de la bestia preparado y lo puedes lanzar gratis 1/día (sin concentración si se usa así). Al usar Ayudar, puedes intercambiar posición con un aliado a 5 pies sin oportunidad.' },
  'lib:amigo-familiar': { n: 'Amigo Familiar', t: 'pasiva', cat: 'Origen', nivelMin: 1, texto: 'Tienes Encontrar familiar siempre preparado y puedes lanzarlo 1/día sin coste (usas INT, SAB o CAR). Sus PG máximos aumentan en el doble de tu nivel. Tienes Ventaja en pruebas de habilidad si tu familiar está a 5 pies (PB usos/día).' },
  'lib:susurros-reunidos': { n: 'Susurros Reunidos', t: 'reaccion', cat: 'Don Oscuro', nivelMin: 1, texto: 'Conoces Mensaje y siempre tienes Augurio preparado (1 uso gratis al día). Como Reacción al recibir un ataque, tu coro de voces te da un +PB a tu CA. Si sacas un 1 natural en un d20, el ensordecedor ruido espectral te obliga a salvar SAB o quedarás Ensordecido y en Desventaja.' },
  'lib:combate-armas-grandes': { n: 'Combate con Armas Grandes', t: 'pasiva', cat: 'Estilo de Combate', nivelMin: 1, texto: 'Al tirar el daño de un arma cuerpo a cuerpo (con propiedad A dos manos o Versátil) que estés empuñando a dos manos, tratas cualquier 1 o 2 en el dado de daño como si fuera un 3. Requisito: rasgo Estilo de Combate.' },
  'lib:agente-arpista': { n: 'Agente Arpista', t: 'pasiva', cat: 'Origen', nivelMin: 1, texto: 'Conoces la Jerga de ladrones y eres competente con un instrumento musical. Cuando usas la acción de Ayudar para apoyar un ataque aliado, el enemigo distraído puede estar hasta a 30 pies de distancia (si puede verte u oírte).' },
  'lib:intercepcion': { n: 'Intercepción', t: 'reaccion', cat: 'Estilo de Combate', nivelMin: 1, texto: 'Como Reacción cuando alguien ataca a una criatura a 5 pies de ti, reduces el daño de ese ataque en 1d10 + PB. Debes estar empuñando un Escudo o un arma Sencilla o Marcial. Requisito: rasgo Estilo de Combate.' },
  'lib:sombra-viviente': { n: 'Sombra Viviente', t: 'pasiva', cat: 'Don Oscuro', nivelMin: 1, texto: 'Aprendes Mano de mago sin componentes. Al hacer un ataque cuerpo a cuerpo, tu sombra te asiste permitiéndote aumentar tu alcance 10 pies (PB usos/día). Si sacas un 1 natural en un d20, tu sombra intentará controlarte (salvación SAB o actuará al azar un turno).' },
  'lib:agente-alianza-lores': { n: 'Agente de la Alianza de los Lores', t: 'pasiva', cat: 'Origen', nivelMin: 1, texto: 'Una vez por turno, cuando logras un Impacto Crítico, otorgas Inspiración Heroica a un aliado a 30 pies. Si un enemigo daña a un aliado a 5 pies de ti, tienes Ventaja en tu próximo ataque contra ese enemigo.' },
  'lib:marca-deteccion': { n: 'Marca de Detección', t: 'pasiva', cat: 'Marca de Dragón', nivelMin: 1, texto: 'Sumas 1d4 a Investigación o Perspicacia. Lanzas Detectar magia y Detectar venenos y enfermedades gratis 1/día. A nivel 3 lanzas Ver invisibilidad 1/día. Añade los conjuros de la Marca a tu lista de clase si lanzas magia.' },
  'lib:marca-hallazgo': { n: 'Marca de Hallazgo', t: 'pasiva', cat: 'Marca de Dragón', nivelMin: 1, texto: 'Sumas 1d4 a Percepción o Supervivencia. Lanzas Marca del cazador gratis 1/día. A nivel 3 lanzas Localizar objeto 1/día. Añade los conjuros de la Marca a tu lista de clase si lanzas magia.' },
  'lib:marca-manejo': { n: 'Marca de Manejo', t: 'pasiva', cat: 'Marca de Dragón', nivelMin: 1, texto: 'Sumas 1d4 a Naturaleza o Trato con animales. Lanzas Amistad con los animales y Hablar con los Animales gratis 1/día (a nivel 3 puedes afectar Monstruosidades de INT 3 o menos). Añade conjuros de Marca a tu lista.' },
  'lib:marca-curacion': { n: 'Marca de Curación', t: 'pasiva', cat: 'Marca de Dragón', nivelMin: 1, texto: 'Sumas 1d4 a Medicina o a pruebas con Kit de herborista. Lanzas Curar heridas gratis 1/día. A nivel 3 lanzas Restablecimiento menor 1/día. Añade los conjuros de la Marca a tu lista de clase.' },
  'lib:marca-hospitalidad': { n: 'Marca de Hospitalidad', t: 'pasiva', cat: 'Marca de Dragón', nivelMin: 1, texto: 'Sumas 1d4 a Persuasión o a Utensilios de cocina/Cervecería. Lanzas Purificar comida y bebida y Sirviente invisible 1/día. A nivel 3 lanzas Calmar emociones 1/día. Añade conjuros de Marca a tu lista.' },
  'lib:marca-creacion': { n: 'Marca de Creación', t: 'pasiva', cat: 'Marca de Dragón', nivelMin: 1, texto: 'Sumas 1d4 a Arcanos o Herramientas de artesano. Conoces Remendar. Lanzas Arma mágica gratis 1/día. Añade los conjuros de la Marca a tu lista de clase.' },
  'lib:marca-pasaje': { n: 'Marca de Pasaje', t: 'pasiva', cat: 'Marca de Dragón', nivelMin: 1, texto: 'Tu velocidad aumenta 5 pies. Sumas 1d4 a Atletismo o Acrobacias. Lanzas Paso brumoso gratis 1/día. Añade los conjuros de la Marca a tu lista de clase.' },
  'lib:marca-escritura': { n: 'Marca de Escritura', t: 'pasiva', cat: 'Marca de Dragón', nivelMin: 1, texto: 'Sumas 1d4 a Historia o Caligrafía. Conoces Mensaje y lanzas Comprender idiomas gratis 1/día. A nivel 3 lanzas Boca mágica 1/día. Añade conjuros de Marca a tu lista.' },
  'lib:marca-centinela': { n: 'Marca del Centinela', t: 'reaccion', cat: 'Marca de Dragón', nivelMin: 1, texto: 'Sumas 1d4 a Perspicacia o Percepción. Lanzas Escudo gratis 1/día. Como Reacción, puedes intercambiar lugar con un aliado a 5 pies para recibir tú un ataque dirigido a él (PB usos/día). Añade conjuros a tu lista.' },
  'lib:marca-sombra': { n: 'Marca de las Sombras', t: 'pasiva', cat: 'Marca de Dragón', nivelMin: 1, texto: 'Sumas 1d4 a Sigilo o Interpretación. Conoces Ilusión menor. Lanzas Invisibilidad gratis 1/día. Añade los conjuros de la Marca a tu lista de clase si lanzas conjuros.' },
  'lib:marca-tormenta': { n: 'Marca de la Tormenta', t: 'pasiva', cat: 'Marca de Dragón', nivelMin: 1, texto: 'Sumas 1d4 a Acrobacias o Herramientas de navegante. Tienes Resistencia al Rayo y conoces Tronar. A nivel 3 lanzas Ráfaga de viento gratis 1/día. Añade conjuros de Marca a tu lista.' },
  'lib:marca-proteccion': { n: 'Marca de Protección', t: 'pasiva', cat: 'Marca de Dragón', nivelMin: 1, texto: 'Sumas 1d4 a Investigación o Herramientas de ladrón. Lanzas Alarma y Armadura de mago gratis 1/día. A nivel 3 lanzas Cerradura arcana 1/día. Añade los conjuros de la Marca a tu lista.' },
  'lib:caminante-niebla': { n: 'Caminante de la Niebla', t: 'reaccion', cat: 'Don Oscuro', nivelMin: 1, texto: 'Viajas por las Nieblas guiado intuitivamente. Como Reacción al sufrir daño o fallar una salvación contra Apresado o Agarrado, puedes teletransportarte 15 pies (PB usos/día). Tu conexión con la Niebla te drena: al estar allí, sufres salvación de CON cada descanso corto para poder beneficiarte de él.' },
  'lib:saltador-portales': { n: 'Saltador de Portales', t: 'pasiva', cat: 'Origen', nivelMin: 1, texto: 'Ganas Resistencia a daño Necrótico, Psíquico o Radiante. Gastando 15 pies de tu velocidad de movimiento normal, puedes teletransportarte hasta a 15 pies de distancia. Puedes usarlo una vez por turno (máximo de usos igual a tu PB por día).' },
  'lib:proteccion': { n: 'Protección', t: 'reaccion', cat: 'Estilo de Combate', nivelMin: 1, texto: 'Si llevas un Escudo y atacan a un aliado a 5 pies, usas tu Reacción para dar Desventaja a ese y a todos los ataques contra el aliado hasta tu próximo turno. Requisito: rasgo Estilo de Combate.' },
  'lib:recluta-dragon-purpura': { n: 'Recluta del Dragón Púrpura', t: 'pasiva', cat: 'Origen', nivelMin: 1, texto: 'Obtienes competencia en Perspicacia, Interpretación o Persuasión. Al tirar Iniciativa (si no estás incapacitado), otorgas Inspiración Heroica a un número de aliados a 30 pies igual a tu Bono de Competencia (1 vez por Descanso Largo).' },
  'lib:segunda-piel': { n: 'Segunda Piel', t: 'pasiva', cat: 'Don Oscuro', nivelMin: 1, texto: 'Siempre tienes Alterar el propio aspecto preparado y puedes lanzarlo gratis 1/día (sin requerir concentración si lo lanzas así). Reaccionas a un catalizador (como la luna llena o la plata): al encontrarlo, si fallas una salvación de CAR, sufres una transformación forzada.' },
  'lib:ojo-agudo': { n: 'Ojo Agudo', t: 'pasiva', cat: 'Origen', nivelMin: 1, texto: 'Al tomar la acción de Buscar o Estudiar en combate, puedes otorgarte Ventaja en la prueba. Puedes usar esto una cantidad de veces igual a tu PB al día. Si fallas la prueba, el uso no se gasta.' },
  'lib:chispa-fuego-conjuro': { n: 'Chispa de Fuego de Conjuro', t: 'pasiva', cat: 'Origen', nivelMin: 1, texto: 'Una vez por turno, reduces el daño de una fuente de magia o hechizo en 1d4. Aprendes Llama sagrada y puedes usarla como Acción Adicional (PB usos/día).' },
  'lib:superviviente': { n: 'Superviviente', t: 'reaccion', cat: 'Origen', nivelMin: 1, texto: 'Al tirar Iniciativa, si sacas un 9 o menos puedes repetir el d20 y usar el nuevo resultado. Como Reacción al fallar una salvación contra ser Asustado o Hechizado, puedes sumar tu PB al resultado para forzar el éxito (1 vez al día).' },
  'lib:ser-simbiotico': { n: 'Ser Simbiótico', t: 'reaccion', cat: 'Don Oscuro', nivelMin: 1, texto: 'Ganas un idioma y competencia en una habilidad de INT, SAB o CAR. Como Reacción al fallar una salvación, puedes gastar y sumar 1 Dado de Golpe a la tirada (PB usos/día). Si sacas un 1 natural en un d20, el simbionte intentará Hechizarte (salvación CAR) para obligarte a seguir su voluntad.' },
  'lib:combate-armas-arrojadizas': { n: 'Combate con Armas Arrojadizas', t: 'pasiva', cat: 'Estilo de Combate', nivelMin: 1, texto: 'Cuando impactas con un ataque a distancia usando un arma que tenga la propiedad Arrojadiza, obtienes un bonificador de +2 a la tirada de daño. Requisito: rasgo Estilo de Combate.' },
  'lib:toque-muerte': { n: 'Toque de Muerte', t: 'pasiva', cat: 'Don Oscuro', nivelMin: 1, texto: 'Aprendes el truco Toque helado, el cual lanzas sin componentes y su daño ignora la resistencia al daño necrótico. Sin embargo, este aura oscura hace que tengas Desventaja en tus Tiradas de Salvación contra la muerte.' },
  'lib:anatomia-transmutada': { n: 'Anatomía Transmutada', t: 'reaccion', cat: 'Origen', nivelMin: 1, texto: 'Tu Velocidad base aumenta en 5 pies. Tienes Ventaja en salvaciones para resistir el cambio de forma forzado. Como Reacción al fallar una salvación de Constitución, sumas 1d4 para intentar superar la tirada (PB usos al día).' },
  'lib:combate-dos-armas': { n: 'Combate con Dos Armas', t: 'pasiva', cat: 'Estilo de Combate', nivelMin: 1, texto: 'Cuando haces un ataque adicional por usar armas que tengan la propiedad Ligera, puedes sumar tu modificador de característica al daño de ese ataque adicional. Requisito: rasgo Estilo de Combate.' },
  'lib:principiante-guantelete': { n: 'Principiante del Guantelete', t: 'reaccion', cat: 'Origen', nivelMin: 1, texto: 'Si usas la acción de Preparar, el próximo ataque que te hagan tiene Desventaja. Como Reacción, puedes evitar que un aliado a 5 pies sea movido en contra de su voluntad (siempre que el aliado esté consciente).' },
  'lib:combate-desarmado': { n: 'Combate Desarmado', t: 'pasiva', cat: 'Estilo de Combate', nivelMin: 1, texto: 'Tus golpes sin armas infligen 1d6 + Fuerza de daño Contundente (o 1d8 si tienes las dos manos libres). Al inicio de cada uno de tus turnos, puedes causar 1d4 de daño a un objetivo que tengas Agarrado. Requisito: rasgo Estilo de Combate.' },
  'lib:vigilantes': { n: 'Vigilantes', t: 'pasiva', cat: 'Don Oscuro', nivelMin: 1, texto: 'Tienes preparados Sentidos de la bestia y Hablar con los Animales (los lanzas gratis 1/día). Sumas 1d4 a tus pruebas de Buscar. Tienes Desventaja en salvaciones contra el conjuro Escudriñar. Un 1 natural en un d20 te inyecta paranoia: salvación SAB o sufres Desventaja en todas tus pruebas y ataques 1 minuto.' },
  'lib:rufian-zhentarim': { n: 'Rufián Zhentarim', t: 'pasiva', cat: 'Origen', nivelMin: 1, texto: 'Al tirar el daño de un Ataque de Oportunidad, puedes lanzar los dados dos veces y usar el resultado que prefieras. Si tienes Inspiración Heroica al tirar Iniciativa, puedes gastarla para dar Ventaja a todo tu grupo en sus tiradas de Iniciativa.' }
};

```

=== B ===

```json
[
  { "donde": "lib:marca-aberrante", "rasgo": "Marca Aberrante", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "lib:artista-arcano", "rasgo": "Artista Arcano", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "lib:infiltrador-arcano", "rasgo": "Infiltrador Arcano", "tipo": "usos", "usos": "pb", "reset": "largo" },
  { "donde": "lib:presagios-arcanos", "rasgo": "Presagios Arcanos", "tipo": "usos", "usos": "pb", "reset": "largo" },
  { "donde": "lib:sobrecarga-arcana", "rasgo": "Sobrecarga Arcana", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "lib:salvaguarda-arcana", "rasgo": "Salvaguarda Arcana", "tipo": "usos", "usos": "pb", "reset": "largo" },
  { "donde": "lib:enterrador-arcano", "rasgo": "Enterrador Arcano", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "lib:iniciado-culto-dragon", "rasgo": "Iniciado del Culto del Dragón", "tipo": "usos", "usos": "1", "reset": "corto" },
  { "donde": "lib:defensa", "rasgo": "Defensa", "tipo": "ca", "detalle": "+1 con armadura" },
  { "donde": "lib:duelo", "rasgo": "Duelo", "tipo": "daño", "daño": "+2 al daño de arma a 1 mano" },
  { "donde": "lib:principiante-enclave-esmeralda", "rasgo": "Principiante del Enclave Esmeralda", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "lib:amigo-familiar", "rasgo": "Amigo Familiar", "tipo": "usos", "usos": "pb", "reset": "largo" },
  { "donde": "lib:susurros-reunidos", "rasgo": "Susurros Reunidos", "tipo": "usos", "usos": "pb", "reset": "largo" },
  { "donde": "lib:intercepcion", "rasgo": "Intercepción", "tipo": "otro", "detalle": "Reduce el daño a un aliado en 1d10 + PB" },
  { "donde": "lib:sombra-viviente", "rasgo": "Sombra Viviente", "tipo": "usos", "usos": "pb", "reset": "largo" },
  { "donde": "lib:marca-deteccion", "rasgo": "Marca de Detección", "tipo": "conjuros", "por_nivel": { "1": ["Detectar el bien y el mal", "Identificar"], "2": ["Detectar pensamientos", "Detectar trampas"], "3": ["Clarividencia", "Antidetección (NO ESTÁ EN LA APP)"], "4": ["Ojo arcano", "Adivinación"], "5": ["Conocer las leyendas"] } },
  { "donde": "lib:marca-hallazgo", "rasgo": "Marca de Hallazgo", "tipo": "conjuros", "por_nivel": { "1": ["Fuego feérico", "Zancada prodigiosa"], "2": ["Localizar animales o plantas", "Clavo mental"], "3": ["Clarividencia", "Hablar con las Plantas"], "4": ["Adivinación", "Localizar criatura"], "5": ["Comunión con la naturaleza"] } },
  { "donde": "lib:marca-manejo", "rasgo": "Marca de Manejo", "tipo": "conjuros", "por_nivel": { "1": ["Orden imperiosa", "Encontrar familiar"], "2": ["Sentidos de la bestia", "Calmar emociones"], "3": ["Señal de esperanza", "Conjurar animales"], "4": ["Aura de vida", "Dominar bestia"], "5": ["Despertar"] } },
  { "donde": "lib:marca-curacion", "rasgo": "Marca de Curación", "tipo": "conjuros", "por_nivel": { "1": ["Falsa vida", "Palabra curativa"], "2": ["Vigor arcano", "Plegaria de curación"], "3": ["Aura de vitalidad", "Palabra curativa en masa"], "4": ["Aura de vida", "Aura de pureza"], "5": ["Restablecimiento mayor"] } },
  { "donde": "lib:marca-hospitalidad", "rasgo": "Marca de Hospitalidad", "tipo": "conjuros", "por_nivel": { "1": ["Buenas bayas", "Dormir"], "2": ["Auxilio", "Mejorar característica"], "3": ["Crear comida y agua", "Pequeña choza de Leomund"], "4": ["Aura de pureza", "Sanctasanctórum privado de Mordenkainen"], "5": ["Consagrar"] } },
  { "donde": "lib:marca-creacion", "rasgo": "Marca de Creación", "tipo": "conjuros", "por_nivel": { "1": ["Identificar", "Disco flotante de Tenser"], "2": ["Llama permanente", "Arma espiritual"], "3": ["Conjurar descarga de proyectiles", "Arma elemental"], "4": ["Fabricar", "Moldear la piedra"], "5": ["Creación"] } },
  { "donde": "lib:marca-pasaje", "rasgo": "Marca de Pasaje", "tipo": "conjuros", "por_nivel": { "1": ["Retirada expeditiva", "Salto"], "2": ["Hallar corcel", "Pasar sin rastro"], "3": ["Desplazamiento", "Corcel fantasma"], "4": ["Puerta dimensional", "Libertad de movimiento"], "5": ["Círculo de teletransportación"] } },
  { "donde": "lib:marca-escritura", "rasgo": "Marca de Escritura", "tipo": "conjuros", "por_nivel": { "1": ["Orden imperiosa", "Texto ilusorio"], "2": ["Mensajero animal", "Silencio"], "3": ["Recado", "Don de lenguas"], "4": ["Ojo arcano", "Confusión"], "5": ["Ensueño"] } },
  { "donde": "lib:marca-centinela", "rasgo": "Marca del Centinela", "tipo": "usos", "usos": "pb", "reset": "largo" },
  { "donde": "lib:marca-centinela", "rasgo": "Marca del Centinela", "tipo": "conjuros", "por_nivel": { "1": ["Duelo forzado", "Escudo de fe"], "2": ["Vínculo protector", "Zona de la verdad"], "3": ["Contrahechizo", "Protección contra energía"], "4": ["Guarda contra la Muerte", "Guardián de la Fe"], "5": ["Mano de Bigby"] } },
  { "donde": "lib:marca-sombra", "rasgo": "Marca de las Sombras", "tipo": "conjuros", "por_nivel": { "1": ["Disfrazarse", "Imagen silenciosa"], "2": ["Oscuridad", "Pasar sin rastro"], "3": ["Clarividencia", "Imagen mayor"], "4": ["Invisibilidad mejorada", "Terreno alucinatorio"], "5": ["Engañar"] } },
  { "donde": "lib:marca-tormenta", "rasgo": "Marca de la Tormenta", "tipo": "conjuros", "por_nivel": { "1": ["Caída de pluma", "Niebla"], "2": ["Levitar", "Hacer añicos"], "3": ["Tormenta de aguanieve", "Muro de viento"], "4": ["Conjurar elementales menores", "Controlar agua"], "5": ["Conjurar elemental"] } },
  { "donde": "lib:marca-proteccion", "rasgo": "Marca de Protección", "tipo": "conjuros", "por_nivel": { "1": ["Armadura de Agathys", "Santuario"], "2": ["Abrir", "Aura mágica de Nystul"], "3": ["Glifo Custodio", "Círculo mágico"], "4": ["Cofre oculto de Leomund", "Mastín fiel de Mordenkainen"], "5": ["Caparazón antivida"] } },
  { "donde": "lib:caminante-niebla", "rasgo": "Caminante de la Niebla", "tipo": "usos", "usos": "pb", "reset": "largo" },
  { "donde": "lib:saltador-portales", "rasgo": "Saltador de Portales", "tipo": "usos", "usos": "pb", "reset": "largo" },
  { "donde": "lib:recluta-dragon-purpura", "rasgo": "Recluta del Dragón Púrpura", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "lib:segunda-piel", "rasgo": "Segunda Piel", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "lib:ojo-agudo", "rasgo": "Ojo Agudo", "tipo": "usos", "usos": "pb", "reset": "largo" },
  { "donde": "lib:chispa-fuego-conjuro", "rasgo": "Chispa de Fuego de Conjuro", "tipo": "usos", "usos": "pb", "reset": "largo" },
  { "donde": "lib:superviviente", "rasgo": "Superviviente", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "lib:ser-simbiotico", "rasgo": "Ser Simbiótico", "tipo": "usos", "usos": "pb", "reset": "largo" },
  { "donde": "lib:combate-armas-arrojadizas", "rasgo": "Combate con Armas Arrojadizas", "tipo": "daño", "daño": "+2 con arma arrojadiza" },
  { "donde": "lib:anatomia-transmutada", "rasgo": "Anatomía Transmutada", "tipo": "usos", "usos": "pb", "reset": "largo" },
  { "donde": "lib:combate-desarmado", "rasgo": "Combate Desarmado", "tipo": "daño", "daño": "1d6 + FUE" }
]

```

=== C ===

```json
{
  "Mejora de Característica": "Manual del Jugador (2024)",
  "Anatomía Aberrante": "Ravenloft: The Horrors Within (2026)",
  "Marca Aberrante": "Eberron: Forge of the Artificer (2025)",
  "Artista Arcano": "Arcana Unleashed (2026)",
  "Elocuencia Arcana": "Arcana Unleashed (2026)",
  "Infiltrador Arcano": "Arcana Unleashed (2026)",
  "Presagios Arcanos": "Arcana Unleashed (2026)",
  "Sobrecarga Arcana": "Arcana Unleashed (2026)",
  "Salvaguarda Arcana": "Arcana Unleashed (2026)",
  "Enterrador Arcano": "Arcana Unleashed (2026)",
  "Guerrero Arcano": "Arcana Unleashed (2026)",
  "Tiro con Arco": "Manual del Jugador (2024)",
  "Guerrero Bendecido": "Manual del Jugador (2024)",
  "Lucha a Ciegas": "Manual del Jugador (2024)",
  "Iniciado del Culto del Dragón": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Defensa": "Manual del Jugador (2024)",
  "Guerrero Druídico": "Manual del Jugador (2024)",
  "Duelo": "Manual del Jugador (2024)",
  "Alma Resonante": "Ravenloft: The Horrors Within (2026)",
  "Principiante del Enclave Esmeralda": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Amigo Familiar": "Arcana Unleashed (2026)",
  "Susurros Reunidos": "Ravenloft: The Horrors Within (2026)",
  "Combate con Armas Grandes": "Manual del Jugador (2024)",
  "Agente Arpista": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Intercepción": "Manual del Jugador (2024)",
  "Sombra Viviente": "Ravenloft: The Horrors Within (2026)",
  "Agente de la Alianza de los Lores": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Marca de Detección": "Eberron: Forge of the Artificer (2025)",
  "Marca de Hallazgo": "Eberron: Forge of the Artificer (2025)",
  "Marca de Manejo": "Eberron: Forge of the Artificer (2025)",
  "Marca de Curación": "Eberron: Forge of the Artificer (2025)",
  "Marca de Hospitalidad": "Eberron: Forge of the Artificer (2025)",
  "Marca de Creación": "Eberron: Forge of the Artificer (2025)",
  "Marca de Pasaje": "Eberron: Forge of the Artificer (2025)",
  "Marca de Escritura": "Eberron: Forge of the Artificer (2025)",
  "Marca del Centinela": "Eberron: Forge of the Artificer (2025)",
  "Marca de las Sombras": "Eberron: Forge of the Artificer (2025)",
  "Marca de la Tormenta": "Eberron: Forge of the Artificer (2025)",
  "Marca de Protección": "Eberron: Forge of the Artificer (2025)",
  "Caminante de la Niebla": "Ravenloft: The Horrors Within (2026)",
  "Saltador de Portales": "Arcana Unleashed (2026)",
  "Protección": "Manual del Jugador (2024)",
  "Recluta del Dragón Púrpura": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Segunda Piel": "Ravenloft: The Horrors Within (2026)",
  "Ojo Agudo": "Ravenloft: The Horrors Within (2026)",
  "Chispa de Fuego de Conjuro": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Superviviente": "Ravenloft: The Horrors Within (2026)",
  "Ser Simbiótico": "Ravenloft: The Horrors Within (2026)",
  "Combate con Armas Arrojadizas": "Manual del Jugador (2024)",
  "Toque de Muerte": "Ravenloft: The Horrors Within (2026)",
  "Anatomía Transmutada": "Arcana Unleashed (2026)",
  "Combate con Dos Armas": "Manual del Jugador (2024)",
  "Principiante del Guantelete": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Combate Desarmado": "Manual del Jugador (2024)",
  "Vigilantes": "Ravenloft: The Horrors Within (2026)",
  "Rufián Zhentarim": "Forgotten Realms: Heroes of Faerûn (2025)"
}

```

=== D ===
{}

=== E ===

* **Dotes Integradas Excluidas:** Alerta, Artesano, Atacante Salvaje, Duro, Hábil, Iniciado en la Magia, Luchador de Taberna, Músico, Sanador, y Afortunado. Estas dotes han sido omitidas de la salida del código porque la app ya las trae integradas y la regla dictaminaba su exclusión.
* **Mejora de Característica (Ability Score Improvement):** Esta dote pertenece a la categoría General pero se incluye porque el texto del encargo contenía el JSON completo y no fue marcada como exclusión, catalogándola como General de Nivel 4 en vez de Origen.
* **Marca Aberrante (Aberrant Dragonmark):** El texto ha cambiado en D&D 2024. Su bonificación en salvaciones de CON ahora requiere el uso explícito de una Reacción. Además, al lanzar su conjuro gratuito se gastan y tiran Dados de Golpe para ganar vida temporal (si es par) o herir (si es impar), retirando el antiguo límite de daño igual a tu nivel.
* **Marca del Centinela (Mark of Sentinel):** El límite de intercambios diarios del rasgo centinela pasó a depender explícitamente del Bono de Competencia (PB).
* **Todas las Marcas de Dragón:** Han sido actualizadas a la revisión de *Eberron: Forge of the Artificer (2025)*, lo que conlleva la adición oficial y estructurada de sus listas expandidas de conjuros. He enlazado todos esos conjuros a sus nombres equivalentes exactos según los *Conjuros de la app*, indicando (NO ESTÁ EN LA APP) en los casos de Antidetección y Faro de esperanza/Señal de esperanza cuando no encajaban en los rangos de nombres de 1 a 5.
* **Combate con Armas Grandes (Great Weapon Fighting):** Ahora se define que el arma *debe* tener explícitamente las propiedades "A dos manos" o "Versátil" empuñándola con dos manos para aplicar el beneficio de tratar un 1 o 2 en daño como un 3.
* **Combate Desarmado (Unarmed Fighting):** Ya no especifica infligir 1d4 de daño gratis al objetivo agarrado "al impactarle", sino al comienzo de tu turno.
* **Pelea a dos armas y Arrojadizas:** Sus descripciones se clarificaron para referirse siempre al rasgo principal de Estilo de Combate.