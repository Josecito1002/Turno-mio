=== A ===

```ts
const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const PALADIN_2024 = {
  rasgosAltos: [
    r(9, 'Abjurar Enemigos', 'accion', 'Como acción mágica y con un uso de Canalizar Divinidad, alzas tu símbolo sagrado o tu arma ante tantas criaturas como tu mod. de CAR (mínimo 1) a 60 pies. Las que fallen una salvación de SAB quedan Asustadas 1 minuto o hasta recibir daño, y mientras tanto en su turno solo pueden moverse, o usar su acción, o su acción adicional.'),
    r(10, 'Aura de Valor', 'pasiva', 'Tú y tus aliados sois inmunes a la condición Asustado mientras estéis en tu Aura de Protección. Un aliado que entra al aura ya asustado ignora esa condición mientras siga dentro.'),
    r(11, 'Golpes Radiantes', 'pasiva', 'Cuando aciertas una tirada de ataque con un arma cuerpo a cuerpo o un golpe sin armas, el objetivo recibe 1d8 de daño radiante extra.'),
    r(14, 'Toque Restaurador', 'adicional', 'Al usar Imposición de Manos también puedes quitarle al objetivo Cegado, Hechizado, Ensordecido, Asustado, Paralizado o Aturdido. Cada condición cuesta 5 puntos de la reserva, que no curan PG.'),
    r(18, 'Expansión del Aura', 'pasiva', 'Tu Aura de Protección pasa a ser una emanación de 30 pies.')
  ],
  subAltos: {
    devocion: [
      r(7, 'Aura de Devoción', 'pasiva', 'Tú y tus aliados sois inmunes a la condición Hechizado mientras estéis en tu Aura de Protección. Un aliado que entra al aura ya hechizado ignora esa condición mientras siga dentro.'),
      r(15, 'Castigo Protector', 'pasiva', 'Cada vez que lanzas Castigo divino, tú y tus aliados en tu Aura de Protección tenéis media cobertura (+2 a la CA y a las salvaciones de DES) hasta el inicio de tu siguiente turno.'),
      r(20, 'Halo Sagrado', 'adicional', 'Como acción adicional llenas tu Aura de Protección de poder sagrado durante 10 minutos: ventaja en las salvaciones contra conjuros de infernales y muertos vivientes, el aura da luz solar brillante, y cada enemigo que empieza su turno en ella recibe daño radiante igual a tu mod. de CAR + tu bonificador de competencia. Una vez por descanso largo, o gastando un espacio de nivel 5.', { usos: 1, reset: 'largo' })
    ],
    gloria: [
      r(7, 'Aura de Presteza', 'pasiva', 'Tu velocidad aumenta 10 pies. Además, cuando un aliado entra en tu Aura de Protección por primera vez en un turno o empieza su turno en ella, su velocidad aumenta 10 pies hasta el final de su siguiente turno.'),
      r(15, 'Defensa Gloriosa', 'reaccion', 'Cuando a ti o a una criatura que ves a 10 pies os aciertan con una tirada de ataque, usas tu reacción para sumar tu mod. de CAR (mínimo +1) a su CA contra ese ataque. Si así falla, puedes atacar con un arma al atacante si está a tu alcance, como parte de la misma reacción.', { usos: 'max(1, CAR)', reset: 'largo' }),
      r(20, 'Leyenda Viviente', 'adicional', 'Como acción adicional, durante 10 minutos: ventaja en todas las pruebas de CAR; una vez en cada uno de tus turnos, si fallas un ataque con arma o golpe sin armas, puedes hacer que acierte; y si fallas una salvación, puedes repetirla con tu reacción. Una vez por descanso largo, o gastando un espacio de nivel 5.', { usos: 1, reset: 'largo' })
    ],
    antiguos: [
      r(7, 'Aura de Protección Arcana', 'pasiva', 'Tú y tus aliados tenéis resistencia al daño necrótico, psíquico y radiante mientras estéis en tu Aura de Protección.'),
      r(15, 'Centinela Imperecedero', 'pasiva', 'Si caes a 0 PG sin morir en el acto, puedes quedarte a 1 PG y recuperar PG iguales al triple de tu nivel de paladín. Una vez por descanso largo. Además, la magia no puede envejecerte y dejas de envejecer a la vista.', { usos: 1, reset: 'largo' }),
      r(20, 'Campeón Antiguo', 'adicional', 'Como acción adicional llenas tu Aura de Protección de poder primigenio durante 1 minuto: los enemigos en ella tienen desventaja en las salvaciones contra tus conjuros y tu Canalizar Divinidad, recuperas 10 PG al inicio de cada uno de tus turnos, y los conjuros de paladín que se lanzan con una acción los puedes lanzar con una acción adicional. Una vez por descanso largo, o gastando un espacio de nivel 5.', { usos: 1, reset: 'largo' })
    ],
    venganza: [
      r(7, 'Vengador Implacable', 'gratis', 'Cuando aciertas a una criatura con un ataque de oportunidad, puedes dejar su velocidad en 0 hasta el final del turno y moverte hasta la mitad de tu velocidad como parte de esa misma reacción, sin provocar ataques de oportunidad.'),
      r(15, 'Alma de Venganza', 'reaccion', 'Justo después de que la criatura bajo tu Voto de Enemistad haga una tirada de ataque, acierte o falle, puedes usar tu reacción para hacerle un ataque cuerpo a cuerpo si está a tu alcance.'),
      r(20, 'Ángel Vengador', 'adicional', 'Como acción adicional, durante 10 minutos te salen alas espectrales (vuelo 60 pies, puedes flotar) y cada enemigo que empieza su turno en tu Aura de Protección hace una salvación de SAB o queda Asustado 1 minuto o hasta recibir daño; las tiradas de ataque contra esa criatura asustada tienen ventaja. Una vez por descanso largo, o gastando un espacio de nivel 5.', { usos: 1, reset: 'largo' })
    ]
  },
  subclases: {
    'conquista': {
      n: 'Juramento de Conquista',
      rasgos: [
        r(3, 'Conjuros de Conquista', 'pasiva', 'Siempre tienes preparados los conjuros del juramento, que se amplían en los niveles 3, 5, 9, 13 y 17.'),
        r(3, 'Presencia Conquistadora', 'accion', 'Como acción mágica y con un uso de Canalizar Divinidad, las criaturas que elijas a 30 pies que te vean hacen una salvación de SAB o quedan Asustadas de ti 1 minuto. Repiten la salvación al final de cada turno suyo.'),
        r(3, 'Golpe Guiado', 'gratis', 'Cuando haces una tirada de ataque, después de verla pero antes de saber si acierta, puedes gastar un uso de Canalizar Divinidad para sumarle +10.'),
        r(7, 'Aura de Conquista', 'pasiva', 'Mientras no estés Incapacitado, una criatura Asustada de ti que esté a 10 pies (30 desde el nivel 18) tiene velocidad 0, y si empieza su turno ahí recibe daño psíquico igual a la mitad de tu nivel de paladín.'),
        r(15, 'Réplica Desdeñosa', 'pasiva', 'Mientras no estés Incapacitado, toda criatura que te acierte con un ataque recibe daño psíquico igual a tu mod. de CAR (mínimo 1).'),
        r(20, 'Conquistador Invencible', 'accion', 'Como acción mágica te vuelves un avatar de la conquista durante 1 minuto: resistencia a todo el daño, un ataque más cuando usas la acción Atacar, y tus ataques con arma cuerpo a cuerpo son crítico con 19 o 20. Una vez por descanso largo.', { usos: 1, reset: 'largo' })
      ]
    },
    'redencion': {
      n: 'Juramento de Redención',
      rasgos: [
        r(3, 'Conjuros de Redención', 'pasiva', 'Siempre tienes preparados los conjuros del juramento, que se amplían en los niveles 3, 5, 9, 13 y 17.'),
        r(3, 'Emisario de Paz', 'adicional', 'Como acción adicional y con un uso de Canalizar Divinidad, te das +5 a las pruebas de Carisma (Persuasión) durante 10 minutos.'),
        r(3, 'Reprender a los Violentos', 'reaccion', 'Justo después de que un atacante a 30 pies haga daño con un ataque a otra criatura, gastas un uso de Canalizar Divinidad y tu reacción: el atacante hace una salvación de SAB y recibe daño radiante igual al que acaba de hacer, o la mitad si la supera.'),
        r(7, 'Aura del Guardián', 'reaccion', 'Cuando una criatura a 10 pies (30 desde el nivel 18) recibe daño, puedes usar tu reacción para recibir tú ese daño en su lugar. No te pasan otros efectos del ataque y ese daño no se puede reducir de ninguna forma.'),
        r(15, 'Espíritu Protector', 'pasiva', 'Si terminas tu turno en combate con menos de la mitad de tus PG y no estás Incapacitado, recuperas 1d6 + la mitad de tu nivel de paladín en PG.'),
        r(20, 'Emisario de la Redención', 'pasiva', 'Tienes resistencia a todo el daño que te hagan otras criaturas, y quien te acierte con un ataque recibe daño radiante igual a la mitad del daño que te hizo. Si atacas a una criatura, le lanzas un conjuro o le haces daño de otra forma, estos beneficios no sirven contra ella hasta tu siguiente descanso largo.')
      ]
    },
    'corona': {
      n: 'Juramento de la Corona',
      rasgos: [
        r(3, 'Conjuros de la Corona', 'pasiva', 'Siempre tienes preparados los conjuros del juramento, que se amplían en los niveles 3, 5, 9, 13 y 17.'),
        r(3, 'Desafío del Campeón', 'adicional', 'Como acción adicional y con un uso de Canalizar Divinidad, las criaturas que elijas a 30 pies que veas hacen una salvación de SAB; si fallan, no pueden alejarse voluntariamente a más de 30 pies de ti. Termina si quedas Incapacitado o mueres, o si la criatura acaba a más de 30 pies.'),
        r(3, 'Cambiar las Tornas', 'adicional', 'Como acción adicional y con un uso de Canalizar Divinidad, cada criatura que elijas a 30 pies que te oiga y tenga la mitad de sus PG o menos recupera 1d6 + tu mod. de CAR (mínimo 1) PG.'),
        r(7, 'Lealtad Divina', 'reaccion', 'Cuando una criatura a 5 pies de ti recibe daño, puedes usar tu reacción para recibirlo tú en su lugar. Ese daño no se puede reducir ni evitar de ninguna forma.'),
        r(15, 'Espíritu Inquebrantable', 'pasiva', 'Tienes ventaja en las salvaciones para no quedar Paralizado ni Aturdido.'),
        r(20, 'Campeón Exaltado', 'accion', 'Como acción, durante 1 hora: resistencia al daño contundente, cortante y perforante de armas no mágicas; tus aliados a 30 pies tienen ventaja en las salvaciones contra la muerte; y tú y tus aliados a 30 pies tenéis ventaja en las salvaciones de SAB. Termina antes si quedas Incapacitado o mueres. Una vez por descanso largo.', { usos: 1, reset: 'largo' })
      ]
    },
    'genios-nobles': {
      n: 'Juramento de los Genios Nobles',
      rasgos: [
        r(3, 'Conjuros del Genio', 'pasiva', 'Siempre tienes preparados los conjuros del juramento, que se amplían en los niveles 3, 5, 9, 13 y 17.'),
        r(3, 'Esplendor del Genio', 'pasiva', 'Sin armadura, tu CA base es 10 + tu mod. de DES + tu mod. de CAR, y puedes usar escudo. Además ganas competencia en una de estas habilidades: Acrobacias, Intimidación, Interpretación o Persuasión.'),
        r(3, 'Castigo Elemental', 'gratis', 'Justo después de lanzar Castigo divino, puedes gastar un uso de Canalizar Divinidad para uno de estos efectos. Dao: el objetivo queda Agarrado (escapa con tu CD de conjuros) y Apresado mientras siga agarrado. Djinn: te teletransportas 30 pies y hasta el final de tu siguiente turno resistes el daño contundente, cortante y perforante, y eres inmune a Agarrado, Derribado y Apresado. Efreet: el objetivo recibe 2d4 de fuego extra y otra criatura que veas a 30 pies también 2d4 de fuego. Marid: el objetivo y quienes elijas a 10 pies hacen una salvación de FUE contra tu CD o son empujados 15 pies y quedan Derribados.'),
        r(7, 'Aura de Escudo Elemental', 'pasiva', 'Eliges ácido, frío, fuego, relámpago o trueno: tú y tus aliados tenéis resistencia a ese daño en tu Aura de Protección. Al inicio de cada uno de tus turnos puedes cambiar el tipo, sin gastar acción.'),
        r(15, 'Reprimenda Elemental', 'reaccion', 'Cuando te aciertan con una tirada de ataque, usas tu reacción para recibir la mitad del daño (redondeando hacia abajo). El atacante hace una salvación de DES contra tu CD de conjuros: si falla recibe 2d10 + tu mod. de CAR de daño de ácido, frío, fuego, relámpago o trueno (tú eliges), y la mitad si la supera.', { usos: 'max(1, CAR)', reset: 'largo' }),
        r(20, 'Vástago Noble', 'adicional', 'Como acción adicional, durante 10 minutos: vuelo de 60 pies (puedes flotar), y cuando tú o un aliado en tu Aura de Protección fallan una prueba de d20, puedes usar tu reacción para que la supere. Una vez por descanso largo, o gastando un espacio de nivel 5.', { usos: 1, reset: 'largo' })
      ]
    },
    'vigilantes': {
      n: 'Juramento de los Vigilantes',
      rasgos: [
        r(3, 'Conjuros de los Vigilantes', 'pasiva', 'Siempre tienes preparados los conjuros del juramento, que se amplían en los niveles 3, 5, 9, 13 y 17.'),
        r(3, 'Voluntad del Vigilante', 'accion', 'Como acción mágica y con un uso de Canalizar Divinidad, eliges tantas criaturas que veas a 30 pies como tu mod. de CAR (mínimo 1): durante 1 minuto, ellas y tú tenéis ventaja en las salvaciones de INT, SAB y CAR.'),
        r(3, 'Abjurar lo Extraplanar', 'accion', 'Como acción mágica y con un uso de Canalizar Divinidad, cada aberración, celestial, elemental, feérico o infernal a 30 pies que te oiga hace una salvación de SAB. Si falla, queda expulsada 1 minuto o hasta recibir daño: huye de ti, no puede acabar su movimiento a 30 pies de ti y solo puede Correr o intentar liberarse (o Esquivar si no tiene adónde ir).'),
        r(7, 'Aura del Centinela', 'pasiva', 'Mientras no estés Incapacitado, tú y las criaturas que elijas a 10 pies (30 desde el nivel 18) sumáis tu bonificador de competencia a la iniciativa.'),
        r(15, 'Reprimenda Vigilante', 'reaccion', 'Cuando tú o una criatura que ves a 30 pies superáis una salvación de INT, SAB o CAR, puedes usar tu reacción para hacer 2d8 + tu mod. de CAR de daño de fuerza a quien la provocó.'),
        r(20, 'Baluarte Mortal', 'adicional', 'Como acción adicional, durante 1 minuto: visión verdadera a 120 pies, ventaja en los ataques contra aberraciones, celestiales, elementales, feéricos e infernales, y cuando aciertas y haces daño con un ataque puedes obligar al objetivo a una salvación de CAR contra tu CD: si falla y no está en su plano natal, vuelve a él. Una vez por descanso largo, o gastando un espacio de nivel 5.', { usos: 1, reset: 'largo' })
      ]
    },
    'rompejuramentos-dmg': {
      n: 'Rompejuramentos',
      rasgos: [
        r(3, 'Conjuros del Rompejuramentos', 'pasiva', 'Siempre tienes preparados los conjuros del juramento roto, que se amplían en los niveles 3, 5, 9, 13 y 17.'),
        r(3, 'Controlar Muertos Vivientes', 'accion', 'Como acción y con un uso de Canalizar Divinidad, un muerto viviente que veas a 30 pies hace una salvación de SAB o te obedece durante 24 horas, o hasta que vuelvas a usar esta opción. No afecta a los que tengan un valor de desafío igual o mayor que tu nivel de paladín.'),
        r(3, 'Aspecto Temible', 'accion', 'Como acción y con un uso de Canalizar Divinidad, las criaturas que elijas a 30 pies que te vean hacen una salvación de SAB o quedan Asustadas de ti 1 minuto; si alguna termina su turno a más de 30 pies de ti, repite la salvación.'),
        r(7, 'Aura de Odio', 'pasiva', 'Tú y los infernales y muertos vivientes a 10 pies de ti (30 desde el nivel 18) sumáis tu mod. de CAR (mínimo +1) al daño con armas cuerpo a cuerpo. Nadie recibe este beneficio de más de un paladín a la vez.'),
        r(15, 'Resistencia Sobrenatural', 'pasiva', 'Resistencia al daño contundente, cortante y perforante de armas no mágicas.'),
        r(20, 'Señor del Pavor', 'accion', 'Como acción te rodea durante 1 minuto un aura de penumbra de 30 pies: la luz brillante pasa a tenue, los enemigos Asustados de ti que empiezan su turno en ella reciben 4d10 psíquico, y quienes dependen de la vista atacan con desventaja a ti y a quienes elijas dentro. Mientras dure, con una acción adicional las sombras atacan a una criatura. Una vez por descanso largo.'),
      ]
    }
  }
};

```

=== B ===

```json
[
  { "donde": "clase", "rasgo": "Golpes Radiantes", "tipo": "daño", "daño": "1d8 Radiante" },
  { "donde": "devocion", "rasgo": "Halo Sagrado", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "gloria", "rasgo": "Defensa Gloriosa", "tipo": "usos", "usos": "max(1, CAR)", "reset": "largo" },
  { "donde": "gloria", "rasgo": "Leyenda Viviente", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "antiguos", "rasgo": "Centinela Imperecedero", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "antiguos", "rasgo": "Campeón Antiguo", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "venganza", "rasgo": "Ángel Vengador", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "conquista", "rasgo": "Conjuros de Conquista", "tipo": "conjuros", "por_nivel": { "3": ["Armadura de Agathys", "Orden imperiosa"], "5": ["Inmovilizar persona", "Arma espiritual"], "9": ["Imponer maldición", "Miedo"], "13": ["Dominar bestia", "Piel pétrea"], "17": ["Nube aniquiladora", "Dominar persona"] } },
  { "donde": "conquista", "rasgo": "Conquistador Invencible", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "redencion", "rasgo": "Conjuros de Redención", "tipo": "conjuros", "por_nivel": { "3": ["Santuario", "Dormir"], "5": ["Calmar emociones", "Inmovilizar persona"], "9": ["Contrahechizo", "Patrón hipnótico"], "13": ["Esfera elástica de Otiluke", "Piel pétrea"], "17": ["Inmovilizar monstruo", "Muro de fuerza"] } },
  { "donde": "corona", "rasgo": "Conjuros de la Corona", "tipo": "conjuros", "por_nivel": { "3": ["Orden imperiosa", "Duelo forzado"], "5": ["Vínculo protector", "Zona de la verdad"], "9": ["Aura de vitalidad", "Espíritus guardianes"], "13": ["Destierro", "Guardián de la Fe"], "17": ["Círculo de poder", "Geas"] } },
  { "donde": "corona", "rasgo": "Campeón Exaltado", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "genios-nobles", "rasgo": "Conjuros del Genio", "tipo": "conjuros", "por_nivel": { "3": ["Orbe cromático", "Elementalismo", "Castigo atronador"], "5": ["Imagen múltiple", "Fuerza fantasmal"], "9": ["Volar", "Forma Gaseosa"], "13": ["Conjurar elementales menores", "Invocar elemental"], "17": ["Castigo desterrador", "Contactar con otro plano"] } },
  { "donde": "genios-nobles", "rasgo": "Esplendor del Genio", "tipo": "ca", "detalle": "sin armadura, 10 + DES + CAR (con escudo); competencia en Acrobacias, Intimidación, Interpretación o Persuasión" },
  { "donde": "genios-nobles", "rasgo": "Reprimenda Elemental", "tipo": "usos", "usos": "max(1, CAR)", "reset": "largo" },
  { "donde": "genios-nobles", "rasgo": "Vástago Noble", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "vigilantes", "rasgo": "Conjuros de los Vigilantes", "tipo": "conjuros", "por_nivel": { "3": ["Alarma", "Detectar magia"], "5": ["Rayo de luna", "Ver lo invisible"], "9": ["Contrahechizo", "Indetectable"], "13": ["Aura de pureza", "Destierro"], "17": ["Inmovilizar monstruo", "Escudriñar"] } },
  { "donde": "vigilantes", "rasgo": "Baluarte Mortal", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "rompejuramentos-dmg", "rasgo": "Conjuros del Rompejuramentos", "tipo": "conjuros", "por_nivel": { "3": ["Reprensión infernal", "Infligir heridas"], "5": ["Corona de la locura", "Oscuridad"], "9": ["Animar a los muertos", "Imponer maldición"], "13": ["Marchitar", "Confusión"], "17": ["Contagio", "Dominar persona"] } },
  { "donde": "rompejuramentos-dmg", "rasgo": "Señor del Pavor", "tipo": "usos", "usos": "1", "reset": "largo" }
]

```

=== C ===

```json
{
  "devocion": "Manual del Jugador (2024)",
  "gloria": "Manual del Jugador (2024)",
  "antiguos": "Manual del Jugador (2024)",
  "venganza": "Manual del Jugador (2024)",
  "conquista": "Xanathar's Guide to Everything (2017)",
  "redencion": "Xanathar's Guide to Everything (2017)",
  "corona": "Sword Coast Adventurer's Guide (2015)",
  "genios-nobles": "Forgotten Realms: Heroes of Faerûn (2025)",
  "vigilantes": "Tasha's Cauldron of Everything (2020)",
  "rompejuramentos-dmg": "Guía del Dungeon Master (2014)"
}

```

=== D ===

```json
{
  "devocion": "El caballero de armadura brillante clásico, enfocado en purificar maldad, brillar con luz divina y sanar a los aliados.",
  "gloria": "Héroes impulsados por el atletismo y el orgullo, dotan de velocidad y vigor asombroso a su equipo para aplastar a la oposición.",
  "antiguos": "Guardianes de la luz y el bosque, repelen el daño mágico y atrapan enemigos con la fuerza latente de la naturaleza.",
  "venganza": "Cazadores implacables que juran destruir a un enemigo por encima de todo, persiguiéndolos y apabullándolos con el poder de su venganza.",
  "conquista": "Caballeros que buscan aplastar al enemigo hasta quebrar su voluntad: siembran miedo y castigan a quien se les resiste.",
  "redencion": "Paladines que usan la violencia solo como último recurso: calman, protegen a otros con su propio cuerpo y devuelven el daño a los violentos.",
  "corona": "Guardianes de la ley y la civilización, leales a su señor: retan a los enemigos a pelear con ellos y levantan a sus aliados heridos.",
  "genios-nobles": "Paladines exóticos con poderes elementales; no visten armadura y canalizan fuego, hielo, roca o viento al golpear y castigar.",
  "vigilantes": "Centinelas contra las amenazas de otros planos: siempre alerta, protegen la mente de sus aliados y devuelven a su plano a los intrusos.",
  "rompejuramentos-dmg": "Paladines que rompieron su juramento para servir a una ambición oscura: dominan a los muertos vivientes, siembran el pavor y refuerzan a sus aliados infernales."
}

```

=== E ===

* **Ahuyentar Enemigos (Nivel 9):** Reemplaza y generaliza los rasgos antiguos de subclases como "Turn the Unholy". Ahora es una habilidad base del Paladín a Nivel 9 (Abjure Foes) que gasta Canalizar Divinidad para Asustar (y limitar acciones) a criaturas enemigas, sin importar el tipo.
* **Canalizar Divinidad (Nivel 3):** Los Paladines ahora obtienen dos usos de base a Nivel 3.
* **Castigo Divino (Nivel 2):** Se indica que el Paladín tiene *Castigo Divino (Divine Smite)* siempre preparado como un conjuro y puede lanzarlo sin gastar espacio una vez por Descanso Largo. Es un cambio mayor de reglas 2024 respecto a su funcionamiento pasivo, pero al depender de conjuro ahora cuesta Acción Adicional.
* **Devocion:** Nivel 15 (*Smite of Protection*) cambió completamente: ya no es "Protección contra el bien y el mal" pasivo, ahora provee Cobertura Media en el aura al usar Castigo Divino. *Arma Sagrada* ahora se activa como parte de la Acción de Atacar, no como Acción completa.
* **Antiguos:** Nivel 7 (*Aura de Resistencia*) antes reducía el daño de conjuros a la mitad; ahora dicta específicamente Resistencia al daño Necrótico, Psíquico y Radiante, no daño "de conjuros".
* **Venganza:** Nivel 7 (*Vengador Implacable*) ya no te mueve ignorando Oportunidad simplemente; ahora también reduce a 0 la velocidad del enemigo al impactarle en Oportunidad. *Voto de Enemistad* ahora puede ser transferido si matas al objetivo y no requiere Acción Bonus pura, es parte de la Acción de Atacar.
* **Restaurar Puntos a Nivel 20:** Todas las transformaciones de Nivel 20 para las subclases 2024 y 2025 ahora pueden ser reactivadas después del primer uso pagando un espacio de conjuro de Nivel 5.
* **Traducciones de Conjuros:** "Beacon of Hope" (Faro de esperanza) y "Guardian of Faith" (Guardián de la fe) no figuran en la lista de Conjuros de la App, los marqué con (NO ESTÁ EN LA APP). "Acelerar" por "Haste" está OK, "Golpe Apresador" por "Ensnaring Strike" también, basándome en el listado exacto de tu App.
* **Subclases no incluidas:** "Oath of Conquest", "Oath of Redemption", "Oath of the Crown", "Oath of the Watchers" y "Oathbreaker" solo figuraban con títulos y referencias de libros pero no se proporcionó el texto con sus reglas, por lo tanto fueron omitidas en JSON y Typescript (regla 1).
* **Revisión de Claude:** el encargo original no traía el texto de Conquista, Redención, Corona y Vigilantes; Claude las escribió desde el texto oficial del encargo regenerado. Las subclases integradas (Devoción, Gloria, Antiguos, Venganza) iban repetidas en `subclases`: se quitaron y sus conjuros hasta el nivel 17 se pusieron a mano en `subclases.ts`. Abjurar Enemigos no tiene usos propios (gasta Canalizar Divinidad). Rompejuramentos: la versión oficial es la de la Guía del Dungeon Master 2014 (clave rompejuramentos-dmg, escrita por Claude en la revisión de completitud); la de prueba (UA 2025) se conserva aparte con su clave.
