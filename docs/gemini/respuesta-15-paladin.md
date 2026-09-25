=== A ===

```ts
const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const PALADIN_2024 = {
  rasgosAltos: [
    r(9, 'Abjurar Enemigos', 'accion', 'Como Acción Mágica, gastas un uso de Canalizar Divinidad y tu símbolo sagrado para aterrar a un número de enemigos hasta tu mod de CAR (a 60 pies). Si fallan salvación SAB, quedan Asustados por 1 minuto o hasta recibir daño. Un objetivo asustado solo puede hacer una cosa por turno: moverse, actuar o usar acción adicional.', { usos: 1, reset: 'largo' }),
    r(10, 'Aura de Valor', 'pasiva', 'Mientras estés consciente, tú y los aliados dentro de tu Aura de Protección sois inmunes a la condición de Asustado. Si un aliado entra al aura ya asustado, el efecto se suspende mientras permanezca allí.'),
    r(11, 'Golpes Radiantes', 'pasiva', 'Tus ataques están bendecidos permanentemente. Cada vez que golpeas a un objetivo con un arma cuerpo a cuerpo o un golpe desarmado, infliges 1d8 de daño Radiante adicional.'),
    r(14, 'Toque Restaurador', 'adicional', 'Cuando usas Imposición de Manos, por cada 5 Puntos de Golpe que decidas NO curar, puedes eliminar una de las siguientes condiciones del objetivo: Cegado, Hechizado, Ensordecido, Asustado, Paralizado o Aturdido.'),
    r(18, 'Aura Expandida', 'pasiva', 'El alcance de tu Aura de Protección aumenta de 10 pies a 30 pies.')
  ],
  subAltos: {
    devocion: [
      r(7, 'Aura de Devoción', 'pasiva', 'Mientras estés consciente, tú y los aliados en tu Aura de Protección sois inmunes a la condición de Hechizado. Si un aliado entra al aura ya hechizado, el efecto se suspende mientras permanezca allí.'),
      r(15, 'Castigo de Protección', 'pasiva', 'Tu castigo mágico ahora irradia energía protectora. Cuando lanzas Castigo Divino, tú y todos tus aliados dentro de tu Aura de Protección obtenéis Cobertura Media (+2 CA y Salvaciones DES) hasta el inicio de tu próximo turno.'),
      r(20, 'Halo Sagrado', 'adicional', 'Como Acción Adicional, potencias tu aura por 10 minutos (1 uso gratis por Descanso Largo o gastando un espacio de nivel 5). Obtienes Ventaja en salvaciones contra Infernales y Muertos Vivientes, emites Luz Solar brillante, y los enemigos que comiencen su turno en el aura sufren daño Radiante igual a tu CAR + Bono de Competencia.', { usos: 1, reset: 'largo' })
    ],
    gloria: [
      r(7, 'Aura de Alacridad', 'pasiva', 'Tu velocidad de movimiento aumenta permanentemente en 10 pies. Además, cualquier aliado que entre a tu Aura de Protección o empiece su turno ahí, ve aumentada su velocidad en 10 pies hasta el final de su siguiente turno.'),
      r(15, 'Defensa Gloriosa', 'reaccion', 'Cuando un aliado (o tú) a 10 pies recibe un ataque, usas tu Reacción para sumarle tu CAR a la CA, lo que puede causar que falle. Si falla, puedes hacer un ataque de contraataque contra el agresor.', { usos: 'max(1, CAR)', reset: 'largo' }),
      r(20, 'Leyenda Viva', 'adicional', 'Como Acción Adicional, te empoderas por 10 minutos (1 uso gratis por Descanso Largo o gastando espacio de nivel 5). Tienes Ventaja en todas las pruebas de Carisma, puedes fallar un ataque por turno y decidir que acierta, y puedes usar una Reacción para repetir una tirada de salvación fallida.', { usos: 1, reset: 'largo' })
    ],
    antiguos: [
      r(7, 'Aura de Protección Mágica', 'pasiva', 'Tú y los aliados dentro de tu Aura de Protección tenéis Resistencia al daño Necrótico, Psíquico y Radiante.'),
      r(15, 'Centinela Inmortal', 'pasiva', 'Si vas a caer a 0 PG pero no mueres en el acto, te quedas a 1 PG y te curas el triple de tu nivel de Paladín. Una vez por Descanso Largo. Además, dejas de envejecer visualmente y la magia no te puede envejecer.', { usos: 1, reset: 'largo' }),
      r(20, 'Campeón Anciano', 'adicional', 'Como Acción Adicional, te empoderas por 1 minuto (1 uso gratis por Descanso Largo o gastando espacio de nivel 5). Los enemigos en tu aura tienen Desventaja contra tus hechizos/Canalizar Divinidad, regeneras 10 PG por turno, y cualquier conjuro tuyo que requiera una Acción puedes lanzarlo como Acción Adicional.', { usos: 1, reset: 'largo' })
    ],
    venganza: [
      r(7, 'Vengador Implacable', 'pasiva', 'Cuando aciertas un Ataque de Oportunidad, puedes reducir la velocidad del enemigo a 0 hasta que acabe el turno. Luego, como parte de esa misma reacción, te puedes mover la mitad de tu velocidad sin provocar ataques de oportunidad.'),
      r(15, 'Alma de Venganza', 'reaccion', 'Cuando la criatura afectada por tu Voto de Enemistad hace un ataque (acierte o falle), puedes usar tu Reacción para realizar un ataque cuerpo a cuerpo contra ella.'),
      r(20, 'Ángel Vengador', 'adicional', 'Como Acción Adicional, asumes una forma divina por 10 minutos (1 uso gratis por Descanso Largo o gastando espacio de nivel 5). Te crecen alas con 60 pies de Vuelo. Cualquier enemigo que empiece su turno en tu Aura queda Asustado por 1 minuto (salvación SAB); tú y tus aliados tenéis Ventaja atacando a criaturas asustadas así.', { usos: 1, reset: 'largo' })
    ]
  },
  subclases: {
    'devocion': {
      n: 'Juramento de Devoción',
      rasgos: [
        r(3, 'Conjuros de Devoción', 'pasiva', 'Obtienes conjuros siempre preparados enfocados en purificar y proteger en los niveles 3, 5, 9, 13 y 17.'),
        r(3, 'Arma Sagrada', 'accion', 'Al tomar la Acción de Atacar, puedes gastar tu Canalizar Divinidad para bendecir tu arma cuerpo a cuerpo por 10 min: emite luz, causa daño Radiante, y sumas tu modificador de Carisma a tus tiradas de ataque con ella.')
      ]
    },
    'gloria': {
      n: 'Juramento de la Gloria',
      rasgos: [
        r(3, 'Conjuros de Gloria', 'pasiva', 'Obtienes conjuros siempre preparados de empuje y mejora atlética en los niveles 3, 5, 9, 13 y 17.'),
        r(3, 'Castigo Inspirador', 'pasiva', 'Inmediatamente después de lanzar Castigo Divino, puedes gastar tu Canalizar Divinidad para otorgar PG temporales iguales a 2d8 + tu nivel de Paladín. Tú decides cómo los repartes entre criaturas a 30 pies de ti.'),
        r(3, 'Atleta Inigualable', 'adicional', 'Como Acción Adicional, gastas tu Canalizar Divinidad para potenciarte por 1 hora. Tienes Ventaja en Atletismo y Acrobacias, y tus saltos largos y de altura alcanzan 10 pies más.')
      ]
    },
    'antiguos': {
      n: 'Juramento de los Antiguos',
      rasgos: [
        r(3, 'Conjuros de los Antiguos', 'pasiva', 'Obtienes conjuros siempre preparados de naturaleza y control forestal en los niveles 3, 5, 9, 13 y 17.'),
        r(3, 'Ira de la Naturaleza', 'accion', 'Como Acción Mágica, gastas tu Canalizar Divinidad para invocar enredaderas espectrales. Todo enemigo a 15 pies hace salvación de FUE o queda Apresado durante 1 minuto (puede repetir la salvación al final de su turno).')
      ]
    },
    'venganza': {
      n: 'Juramento de Venganza',
      rasgos: [
        r(3, 'Conjuros de Venganza', 'pasiva', 'Obtienes conjuros siempre preparados de caza e inmovilización en los niveles 3, 5, 9, 13 y 17.'),
        r(3, 'Voto de Enemistad', 'accion', 'Al tomar la Acción de Atacar, gastas tu Canalizar Divinidad para elegir a un enemigo a 30 pies. Tienes Ventaja en todos tus ataques contra él durante 1 minuto. Si muere, puedes transferir gratis el Voto a otro enemigo a 30 pies.')
      ]
    },
    'genios-nobles': {
      n: 'Juramento de los Genios Nobles',
      rasgos: [
        r(3, 'Conjuros de Genio', 'pasiva', 'La majestuosidad de los Planos Elementales te otorga conjuros siempre preparados en los niveles 3, 5, 9, 13 y 17.'),
        r(3, 'Esplendor de Genio', 'pasiva', 'Si no usas armadura, tu CA es 10 + DES + CAR (puedes usar escudo). Obtienes competencia en Acrobacias, Intimidación, Interpretación o Persuasión.'),
        r(3, 'Castigo Elemental', 'pasiva', 'Al lanzar Castigo Divino, puedes gastar tu Canalizar Divinidad para un efecto extra según el Genio. Dao: Agarra y apresa. Djinn: Te teletransportas 30 pies y resistes daño físico. Efreeti: Daño de fuego adicional que salta a otro. Marid: Empuja y derriba enemigos cercanos.'),
        r(7, 'Aura de Escudo Elemental', 'pasiva', 'Tú y tus aliados tenéis Resistencia a un tipo de daño elemental en tu Aura de Protección. Al inicio de cada turno puedes rotar el tipo (Ácido, Frío, Fuego, Relámpago o Trueno).'),
        r(15, 'Reprimenda Elemental', 'reaccion', 'Cuando recibes daño de un ataque, usas tu Reacción para recibir solo la mitad del daño y exigir al atacante una salvación de DES; si falla, recibe 2d10 + CAR de daño elemental.', { usos: 'max(1, CAR)', reset: 'largo' }),
        r(20, 'Vástago Noble', 'adicional', 'Como Acción Adicional, te empoderas por 10 minutos (1 uso gratis por Descanso Largo o gastando espacio de nivel 5). Ganas Vuelo y puedes usar tu Reacción para garantizar un éxito automático cuando un aliado (o tú) falle una prueba d20 en tu aura.', { usos: 1, reset: 'largo' })
      ]
    }
  }
};

```

=== B ===

```json
[
  { "donde": "clase", "rasgo": "Abjurar Enemigos", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "clase", "rasgo": "Golpes Radiantes", "tipo": "daño", "daño": "1d8 Radiante" },
  { "donde": "devocion", "rasgo": "Conjuros de Devoción", "tipo": "conjuros", "por_nivel": { "3": ["Protección contra el bien y el mal", "Escudo de fe"], "5": ["Auxilio", "Zona de la verdad"], "9": ["Faro de esperanza (NO ESTÁ EN LA APP)", "Disipar magia"], "13": ["Libertad de movimiento", "Guardián de la fe (NO ESTÁ EN LA APP)"], "17": ["Comunión", "Golpe Flamígero"] } },
  { "donde": "devocion", "rasgo": "Halo Sagrado", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "gloria", "rasgo": "Conjuros de Gloria", "tipo": "conjuros", "por_nivel": { "3": ["Rayo guía", "Heroísmo"], "5": ["Mejorar característica", "Arma mágica"], "9": ["Acelerar", "Protección contra energía"], "13": ["Compulsión", "Libertad de movimiento"], "17": ["Conocer las leyendas", "Presencia regia de Yolande"] } },
  { "donde": "gloria", "rasgo": "Castigo Inspirador", "tipo": "pg", "detalle": "2d8 + nivel" },
  { "donde": "gloria", "rasgo": "Defensa Gloriosa", "tipo": "usos", "usos": "max(1, CAR)", "reset": "largo" },
  { "donde": "gloria", "rasgo": "Leyenda Viva", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "antiguos", "rasgo": "Conjuros de los Antiguos", "tipo": "conjuros", "por_nivel": { "3": ["Golpe Apresador", "Hablar con los Animales"], "5": ["Paso brumoso", "Rayo de luna"], "9": ["Crecimiento vegetal", "Protección contra energía"], "13": ["Tormenta de hielo", "Piel pétrea"], "17": ["Comunión con la naturaleza", "Paso arbóreo"] } },
  { "donde": "antiguos", "rasgo": "Centinela Inmortal", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "antiguos", "rasgo": "Campeón Anciano", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "venganza", "rasgo": "Conjuros de Venganza", "tipo": "conjuros", "por_nivel": { "3": ["Perdición", "Marca del cazador"], "5": ["Inmovilizar persona", "Paso brumoso"], "9": ["Acelerar", "Protección contra energía"], "13": ["Destierro", "Puerta dimensional"], "17": ["Inmovilizar monstruo", "Escudriñar"] } },
  { "donde": "venganza", "rasgo": "Ángel Vengador", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "genios-nobles", "rasgo": "Conjuros de Genio", "tipo": "conjuros", "por_nivel": { "3": ["Orbe cromático", "Elementalismo", "Castigo atronador"], "5": ["Imagen múltiple", "Fuerza fantasmal"], "9": ["Volar", "Forma Gaseosa"], "13": ["Conjurar elementales menores", "Invocar elemental"], "17": ["Castigo desterrador", "Contactar con otro plano"] } },
  { "donde": "genios-nobles", "rasgo": "Esplendor de Genio", "tipo": "ca", "detalle": "10 + DES + CAR" },
  { "donde": "genios-nobles", "rasgo": "Reprimenda Elemental", "tipo": "usos", "usos": "max(1, CAR)", "reset": "largo" },
  { "donde": "genios-nobles", "rasgo": "Reprimenda Elemental", "tipo": "daño", "daño": "2d10 + CAR" },
  { "donde": "genios-nobles", "rasgo": "Vástago Noble", "tipo": "usos", "usos": "1", "reset": "largo" }
]

```

=== C ===

```json
{
  "Juramento de Devoción": "Manual del Jugador (2024)",
  "Juramento de la Gloria": "Manual del Jugador (2024)",
  "Juramento de los Antiguos": "Manual del Jugador (2024)",
  "Juramento de Venganza": "Manual del Jugador (2024)",
  "Juramento de los Genios Nobles": "Forgotten Realms: Heroes of Faerûn (2025)"
}

```

=== D ===

```json
{
  "devocion": "El caballero de armadura brillante clásico, enfocado en purificar maldad, brillar con luz divina y sanar a los aliados.",
  "gloria": "Héroes impulsados por el atletismo y el orgullo, dotan de velocidad y vigor asombroso a su equipo para aplastar a la oposición.",
  "antiguos": "Guardianes de la luz y el bosque, repelen el daño mágico y atrapan enemigos con la fuerza latente de la naturaleza.",
  "venganza": "Cazadores implacables que juran destruir a un enemigo por encima de todo, persiguiéndolos y apabullándolos con el poder de su venganza.",
  "genios-nobles": "Paladines exóticos con poderes elementales; no visten armadura y canalizan fuego, hielo, roca o viento al golpear y castigar."
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