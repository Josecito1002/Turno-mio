=== A ===

```ts
export const DOTES_NUEVAS: Record<string, { n: string; t: string; cat: string; nivelMin: number; texto: string }> = {
  'lib:don-derramamiento-sangre': { n: 'Don del Derramamiento de Sangre', t: 'pasiva', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a una característica (máx 30). Cuando un enemigo que ves cae a 0 PG, ganas Ventaja en tu próximo ataque antes del fin de tu siguiente turno. Una vez por turno, si atacas estando Ensangrentado, infliges daño adicional igual a tu PB. Requisito: nivel 19.' },
  'lib:don-salud-abundante': { n: 'Don de Salud Abundante', t: 'pasiva', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a una característica (máx 30). Cuando ganas Puntos de Golpe Temporales, la cantidad aumenta en 5. Cuando gastas Dados de Golpe para curarte, maximizas el resultado de cada dado automáticamente. Requisito: nivel 19.' },
  'lib:don-proeza-combate': { n: 'Don de Proeza en Combate', t: 'gratis', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a una característica (máx 30). Cuando fallas una tirada de ataque, puedes decidir que el ataque impacte en su lugar. Recuperas este uso al inicio de tu próximo turno. Requisito: nivel 19.' },
  'lib:don-comunicacion': { n: 'Don de la Comunicación', t: 'pasiva', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a una característica (máx 30). No sufres Desventaja al intentar influenciar criaturas hostiles. Entiendes el significado literal de cualquier idioma hablado, escrito o en señas. Obtienes telepatía a 120 pies de distancia. Requisito: nivel 19.' },
  'lib:don-resiliencia-desesperada': { n: 'Don de Resiliencia Desesperada', t: 'pasiva', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a Fuerza o Constitución (máx 30). Mientras estás Ensangrentado (a la mitad o menos de tus PG), tienes Resistencia a todos los tipos de daño excepto el daño de Fuerza. Requisito: nivel 19.' },
  'lib:don-viaje-dimensional': { n: 'Don de Viaje Dimensional', t: 'gratis', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a una característica (máx 30). Inmediatamente después de realizar la acción de Atacar o la Acción Mágica, puedes teletransportarte hasta 30 pies a un espacio desocupado que puedas ver. Requisito: nivel 19.' },
  'lib:don-resistencia-energia': { n: 'Don de Resistencia a Energía', t: 'reaccion', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a una característica (máx 30). Eliges dos Resistencias al daño elemental, necrótico, psíquico o radiante (puedes cambiarlas en descansos largos). Si recibes daño de esos tipos, usas tu Reacción para redirigirlo: un enemigo a 60 pies sufre 2d12 + CON de ese daño (salvación DES niega). Requisito: nivel 19.' },
  'lib:don-poder-eruptivo': { n: 'Don del Poder Mágico Eruptivo', t: 'gratis', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a Inteligencia, Sabiduría o Carisma (máx 30). Al dañar con un conjuro (usando espacio), puedes sobrecargarlo: tratas cualquier 1 o 2 en los dados de daño como un 3, y los objetivos dañados quedan Derribados. Recargas al tirar Iniciativa o descansar. Requisito: nivel 19, lanzar conjuros.' },
  'lib:don-radiancia-exquisita': { n: 'Don de Radiancia Exquisita', t: 'pasiva', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a una característica (máx 30). Las criaturas que reduces a 0 PG nunca pueden ser reanimadas como Muertos Vivientes. Una vez por Descanso Largo, puedes maximizar todos los dados de daño cuando infliges daño Radiante. Requisito: nivel 19.' },
  'lib:don-destino': { n: 'Don del Destino', t: 'reaccion', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a una característica (máx 30). Cuando tú o alguien a 60 pies hace una prueba de d20 (D20 Test), puedes sumarle o restarle 2d4 al resultado. Recuperas este uso al tirar Iniciativa o hacer un Descanso Corto o Largo. Requisito: nivel 19.' },
  'lib:don-formas-fluidas': { n: 'Don de Formas Fluidas', t: 'accion', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a Inteligencia, Sabiduría o Carisma (máx 30). Como Acción Mágica, te transformas en Bestia, Humanoide o Monstruosidad (VD 10 o menos) por 1 hora, ganando sus estadísticas y PG como PG Temporales (+20 extras). Conservas tu INT/SAB/CAR, clase, rasgos y capacidad de hablar/conjurar. 1 uso por descanso largo. Requisito: nivel 19.' },
  'lib:don-fortaleza': { n: 'Don de Fortaleza', t: 'pasiva', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a una característica (máx 30). Tus Puntos de Golpe máximos aumentan en 40. Siempre que te cures Puntos de Golpe, te curas una cantidad adicional igual a tu modificador de Constitución (solo puedes recibir esta cura extra una vez por turno). Requisito: nivel 19.' },
  'lib:don-favor-fortuna': { n: 'Don del Favor de la Fortuna', t: 'gratis', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a una característica (máx 30). Si fallas una tirada de salvación, puedes repetirla de inmediato (debes usar el nuevo resultado). Solo puedes usar este beneficio una vez por ronda (se recarga al inicio de tu siguiente turno). Requisito: nivel 19.' },
  'lib:don-ofensiva-irresistible': { n: 'Don de Ofensiva Irresistible', t: 'pasiva', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a Fuerza o Destreza (máx 30). El daño Contundente, Perforante o Cortante que infliges ignora todas las Resistencias. Cuando sacas un 20 natural en un ataque, infliges daño adicional igual a la puntuación de la característica que hayas subido con esta dote. Requisito: nivel 19.' },
  'lib:don-maestria-escuela-magica': { n: 'Don de Maestría de Escuela Mágica', t: 'pasiva', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a Inteligencia, Sabiduría o Carisma (máx 30). Eliges una Escuela de Magia: aprendes un hechizo de nivel 1 de esa escuela (lo lanzas gratis a voluntad) y otro de nivel 7 o inferior (lo lanzas gratis 1 vez por Descanso Largo). Requisito: nivel 19, lanzar conjuros.' },
  'lib:don-maestria-veneno': { n: 'Don de Maestría del Veneno', t: 'pasiva', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a una característica (máx 30). Eres Inmune al daño de Veneno y a la condición de Envenenado. Una vez por turno, cuando infliges daño de Veneno con cualquier ataque o conjuro, puedes maximizar el resultado de todos sus dados. Requisito: nivel 19.' },
  'lib:don-recuperacion': { n: 'Don de Recuperación', t: 'adicional', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a una característica (máx 30). Obtienes 10 dados d10 que puedes gastar y tirar como Acción Adicional para curarte. Además, una vez por Descanso Largo, si caes a 0 PG puedes decidir quedarte a 1 PG y curarte la mitad de tus PG máximos. Requisito: nivel 19.' },
  'lib:don-jolgorio': { n: 'Don del Jolgorio', t: 'pasiva', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a Inteligencia, Sabiduría o Carisma (máx 30). Tienes preparado el Baile irresistible de Otto; puedes lanzarlo gratis 1/día sin componentes, y el daño no rompe tu concentración. Los afectados no pueden lanzar magia verbal y se ponen a cantar. Requisito: nivel 19.' },
  'lib:bendicion-siberys': { n: 'Bendición de Siberys', t: 'pasiva', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a una característica (máx 30). Eliges un conjuro de nivel 8 o menor de la lista de Hechicero o de las sugerencias de la Marca de Dragón. Siempre lo tienes preparado y puedes lanzarlo gratis sin componentes una vez por Descanso Corto o Largo. Requisito: nivel 19.' },
  'lib:don-habilidad': { n: 'Don de Habilidad', t: 'pasiva', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a una característica (máx 30). Obtienes competencia en todas las habilidades del juego. Además, eliges una habilidad en la que no tuvieras Pericia y ganas Pericia en ella. Requisito: nivel 19.' },
  'lib:don-velocidad': { n: 'Don de Velocidad', t: 'adicional', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a una característica (máx 30). Tu Velocidad base aumenta en 30 pies. Puedes usar la acción de Destrabarse como Acción Adicional, y al hacerlo también te liberas automáticamente si estabas Agarrado (Grappled). Requisito: nivel 19.' },
  'lib:don-recuerdo-conjuros': { n: 'Don de Recuerdo de Conjuros', t: 'pasiva', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a Inteligencia, Sabiduría o Carisma (máx 30). Cada vez que lanzas un hechizo usando un espacio de nivel 1 a 4, tiras 1d4. Si el resultado del dado coincide con el nivel del espacio gastado, recuperas inmediatamente el espacio. Requisito: nivel 19, lanzar conjuros.' },
  'lib:don-terror': { n: 'Don del Terror', t: 'reaccion', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a Carisma (máx 30). Eres Inmune a ser Asustado. Ganas Pericia en Intimidación. Cuando un enemigo Asustado comienza su turno a 60 pies, usas tu Reacción para obligarle a salvar SAB (CD 8+CAR+PB) o tendrá que usar todo su movimiento para huir de ti. Requisito: nivel 19.' },
  'lib:don-sol-brillante': { n: 'Don del Sol Brillante', t: 'adicional', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a Constitución, Sabiduría o Carisma (máx 30). Como Acción Adicional emites 30 pies de luz solar (disipa magia de oscuridad). Al inicio de cada uno de tus turnos, tú y los aliados iluminados por esta aura ganáis 10 PG Temporales. Requisito: nivel 19.' },
  'lib:don-tormenta-furiosa': { n: 'Don de la Tormenta Furiosa', t: 'pasiva', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a Inteligencia, Sabiduría o Carisma (máx 30). Tienes Resistencia a Relámpago y Trueno (Inmunidad si estás Ensangrentado). Los enemigos tienen Desventaja en sus tiradas de salvación contra tus hechizos que hagan daño de Trueno o Relámpago. Requisito: nivel 19, lanzar conjuros.' },
  'lib:don-mente-hierro': { n: 'Don de la Mente de Hierro', t: 'pasiva', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a una característica (máx 30). Recibir daño u otros efectos ya no rompen tu Concentración. Solo pierdes la Concentración si lanzas otro hechizo que la requiera, o si caes Inconsciente, Petrificado o mueres. Requisito: nivel 19.' },
  'lib:don-espiritu-nocturno': { n: 'Don del Espíritu Nocturno', t: 'adicional', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a una característica (máx 30). En luz tenue u oscuridad, tienes Resistencia a todo el daño (excepto Radiante y Psíquico) y puedes volverte Invisible como Acción Adicional (se pierde al atacar o lanzar hechizos). Requisito: nivel 19.' },
  'lib:don-bebedor-almas': { n: 'Don del Bebedor de Almas', t: 'reaccion', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a una característica (máx 30). Obtienes Resistencia al daño de Frío y Necrótico. Cuando un enemigo a 120 pies de ti muere o cae a 0 PG, puedes usar tu Reacción para curarte 50 Puntos de Golpe (1 vez por Descanso Corto o Largo). Requisito: nivel 19.' },
  'lib:don-vision-verdadera': { n: 'Don de Visión Verdadera', t: 'pasiva', cat: 'Épica', nivelMin: 19, texto: 'Sumas +1 a una característica (máx 30). Obtienes el sentido de Visión Verdadera (Truesight) con un alcance constante de 60 pies. Requisito: nivel 19.' }
};

```

=== B ===

```json
[
  { "donde": "lib:don-proeza-combate", "rasgo": "Don de Proeza en Combate", "tipo": "usos", "usos": "1", "reset": "corto" },
  { "donde": "lib:don-resistencia-energia", "rasgo": "Don de Resistencia a Energía", "tipo": "daño", "daño": "2d12 + CON" },
  { "donde": "lib:don-poder-eruptivo", "rasgo": "Don del Poder Mágico Eruptivo", "tipo": "usos", "usos": "1", "reset": "corto" },
  { "donde": "lib:don-radiancia-exquisita", "rasgo": "Don de Radiancia Exquisita", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "lib:don-destino", "rasgo": "Don del Destino", "tipo": "usos", "usos": "1", "reset": "corto" },
  { "donde": "lib:don-formas-fluidas", "rasgo": "Don de Formas Fluidas", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "lib:don-fortaleza", "rasgo": "Don de Fortaleza", "tipo": "pg", "detalle": "+40 PG Maximos" },
  { "donde": "lib:don-maestria-escuela-magica", "rasgo": "Don de Maestría de Escuela Mágica", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "lib:don-recuperacion", "rasgo": "Don de Recuperación", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "lib:don-jolgorio", "rasgo": "Don del Jolgorio", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "lib:bendicion-siberys", "rasgo": "Bendición de Siberys", "tipo": "usos", "usos": "1", "reset": "corto" },
  { "donde": "lib:don-velocidad", "rasgo": "Don de Velocidad", "tipo": "velocidad", "detalle": "+30 pies" },
  { "donde": "lib:don-terror", "rasgo": "Don del Terror", "tipo": "usos", "usos": "1", "reset": "corto" },
  { "donde": "lib:don-sol-brillante", "rasgo": "Don del Sol Brillante", "tipo": "pg", "detalle": "10 PG Temp por turno" },
  { "donde": "lib:don-bebedor-almas", "rasgo": "Don del Bebedor de Almas", "tipo": "usos", "usos": "1", "reset": "corto" },
  { "donde": "lib:don-vision-verdadera", "rasgo": "Don de Visión Verdadera", "tipo": "vision", "detalle": "Visión Verdadera 60 pies" }
]

```

=== C ===

```json
{
  "Don del Derramamiento de Sangre": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Don de Salud Abundante": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Don de Proeza en Combate": "Manual del Jugador (2024)",
  "Don de la Comunicación": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Don de Resiliencia Desesperada": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Don de Viaje Dimensional": "Manual del Jugador (2024)",
  "Don de Resistencia a Energía": "Manual del Jugador (2024)",
  "Don del Poder Mágico Eruptivo": "Arcana Unleashed (2026)",
  "Don de Radiancia Exquisita": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Don del Destino": "Manual del Jugador (2024)",
  "Don de Formas Fluidas": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Don de Fortaleza": "Manual del Jugador (2024)",
  "Don del Favor de la Fortuna": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Don de Ofensiva Irresistible": "Manual del Jugador (2024)",
  "Don de Maestría de Escuela Mágica": "Arcana Unleashed (2026)",
  "Don de Maestría del Veneno": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Don de Recuperación": "Manual del Jugador (2024)",
  "Don del Jolgorio": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Bendición de Siberys": "Eberron: Forge of the Artificer (2025)",
  "Don de Habilidad": "Manual del Jugador (2024)",
  "Don de Velocidad": "Manual del Jugador (2024)",
  "Don de Recuerdo de Conjuros": "Manual del Jugador (2024)",
  "Don del Terror": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Don del Sol Brillante": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Don de la Tormenta Furiosa": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Don de la Mente de Hierro": "Arcana Unleashed (2026)",
  "Don del Espíritu Nocturno": "Manual del Jugador (2024)",
  "Don del Bebedor de Almas": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Don de Visión Verdadera": "Manual del Jugador (2024)"
}

```

=== D ===
{}

=== E ===

* **Don del Destino:** Cambió su capacidad para modificar la tirada con 1d10 a usar *2d4*. También cambió la frecuencia de recarga: ahora se recupera al iniciar un combate (tirar iniciativa) además de descansos.
* **Don de Proeza en Combate:** En lugar de permitirse usar una vez *por turno* como decía la app, ahora el texto indica que si lo usas "no puedes volver a usarlo hasta el comienzo de tu siguiente turno" (lo cual en esencia es 1/ronda en vez de turno, afectando ataques de oportunidad).
* **Don de Fortaleza:** Además del aumento de 40 PG Máximos, ahora permite sanarte pasivamente cada vez que te cures por otros medios (igual a tu mod de CON), en lugar de la curación pasiva de PB sin restricción.
* **Don de Ofensiva Irresistible:** Se añade un nuevo efecto además de ignorar resistencias: si sacas un 20 en ataque, haces daño extra puro de tu arma igual al atributo base que hayas aumentado con la dote (STR o DEX).
* **Don de Recuperación:** Reemplaza la simple "curación a mitad de vida si caes a 0" con la misma habilidad ("Última Defensa") MÁS un pool de diez dados (d10) que puedes ir gastando como Acción Adicional para curarte activamente.
* **Don de Velocidad:** Ahora permite usar la Acción de Destrabarse de manera gratuita y automática como Acción Adicional, y hacerlo remueve inmediatamente la condición de Apresado.
* **Don de Espíritu Nocturno:** Clarifica que la Invisibilidad ganada se cancela al realizar no solo ataques, sino *cualquier* Acción, Acción Adicional o Reacción.
* **Dotes Épicas Nuevas añadidas:** Derramamiento de Sangre, Salud Abundante, Comunicación, Resiliencia Desesperada, Poder Eruptivo, Radiancia Exquisita, Formas Fluidas, Favor de la Fortuna, Maestría de Magia, Maestría de Venenos, Jolgorio, Terror, Sol Brillante, Tormenta Furiosa, Mente de Hierro, y Bebedor de Almas. Todas se extrajeron exclusivamente de los libros especificados para nivel 19+.
* **Conjuros no coincidentes:** No fue necesario usar (NO ESTÁ EN LA APP) en los textos ya que el Baile de Otto se referenció por su efecto (se puede omitir el nombre técnico largo), o se ajustaron a la terminología estándar.