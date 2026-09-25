=== A ===

```ts
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
    },
    'caballero': {
      n: 'Caballero',
      rasgos: [
        r(3, 'Competencia Adicional', 'pasiva', 'Ganas competencia en una de estas habilidades: Trato con Animales, Historia, Perspicacia, Interpretación o Persuasión. Si lo prefieres, aprendes un idioma.'),
        r(3, 'Nacido para la Silla', 'pasiva', 'Tienes ventaja en las salvaciones para no caerte de tu montura, y si caes 10 pies o menos aterrizas de pie (si no estás Incapacitado). Montar o desmontar te cuesta solo 5 pies de movimiento.'),
        r(3, 'Marca Inquebrantable', 'gratis', 'Al acertar un ataque cuerpo a cuerpo con arma, marcas a la criatura hasta el final de tu próximo turno. Si está a 5 pies de ti tiene desventaja al atacar a otros, y si daña a otro, en tu próximo turno puedes hacerle un ataque especial como acción adicional, con ventaja y daño extra igual a la mitad de tu nivel de guerrero.'),
        r(7, 'Maniobra de Protección', 'reaccion', 'Si a ti o a una criatura que veas a 5 pies la aciertan con un ataque y empuñas un arma cuerpo a cuerpo o un escudo, sumas 1d8 a su CA contra ese ataque; si aun así acierta, el objetivo tiene resistencia a ese daño.'),
        r(10, 'Mantener la Línea', 'pasiva', 'Las criaturas provocan tu ataque de oportunidad si se mueven 5 pies o más dentro de tu alcance, y si lo aciertas su velocidad baja a 0 hasta el final del turno.'),
        r(15, 'Carga Feroz', 'gratis', 'Una vez por turno, si te mueves al menos 10 pies en línea recta justo antes de acertar un ataque, el objetivo hace una salvación de FUE o queda Derribado.'),
        r(18, 'Defensor Vigilante', 'reaccion', 'En combate tienes una reacción especial en el turno de cada criatura salvo el tuyo, solo para hacer un ataque de oportunidad, y no en el mismo turno en que uses tu reacción normal.')
      ]
    },
    'caballero-eco': {
      n: 'Caballero del Eco',
      rasgos: [
        r(3, 'Manifestar Eco', 'adicional', 'Creas un eco tuyo a 15 pies: CA 14 + tu competencia, 1 PG e inmune a los estados. Lo mueves 30 pies por turno sin acción, puedes intercambiarte con él (acción adicional, 15 pies de movimiento), atacar desde su espacio y hacer ataques de oportunidad desde él. Desaparece si se aleja más de 30 pies al final de tu turno.'),
        r(3, 'Desatar Encarnación', 'gratis', 'Al usar la acción Atacar, haces un ataque cuerpo a cuerpo adicional desde la posición de tu eco.'),
        r(7, 'Avatar del Eco', 'accion', 'Ves y oyes a través de tu eco hasta 10 minutos, y mientras tanto puede estar hasta a 1000 pies de ti; tú quedas Cegado y Ensordecido.'),
        r(10, 'Mártir Sombrío', 'reaccion', 'Antes de que ataquen a una criatura que veas, teletransportas a tu eco a 5 pies de ella y el ataque va contra el eco.'),
        r(15, 'Reclamar Potencial', 'gratis', 'Cuando destruyen a tu eco con daño, ganas 2d6 + CON PG temporales si no tenías.'),
        r(18, 'Legión de Uno', 'pasiva', 'Puedes tener dos ecos a la vez y actuar desde cualquiera. Al tirar iniciativa sin usos de Desatar Encarnación, recuperas uno.')
      ]
    },
    'samurai': {
      n: 'Samurái',
      rasgos: [
        r(3, 'Competencia Adicional', 'pasiva', 'Ganas competencia en Historia, Perspicacia, Interpretación o Persuasión (a elegir), o aprendes un idioma.'),
        r(3, 'Espíritu de Lucha', 'adicional', 'Ganas ventaja en tus ataques con arma hasta el final del turno y PG temporales.'),
        r(7, 'Cortesano Elegante', 'pasiva', 'Sumas tu SAB a tus pruebas de Persuasión y ganas competencia en salvaciones de SAB (o de INT o CAR si ya la tenías).'),
        r(10, 'Espíritu Incansable', 'pasiva', 'Al tirar iniciativa sin usos de Espíritu de Lucha, recuperas uno.'),
        r(15, 'Golpe Rápido', 'pasiva', 'Una vez por turno, si tienes ventaja en un ataque de la acción Atacar, puedes renunciar a ella para hacer otro ataque con arma contra ese objetivo.'),
        r(18, 'Fuerza antes que la Muerte', 'reaccion', 'Si caes a 0 PG sin morir, retrasas quedar Inconsciente y haces un turno extra de inmediato. Al terminar, caes si sigues en 0 PG.')
      ]
    },
    'caballero-runico': {
      n: 'Caballero Rúnico',
      rasgos: [
        r(3, 'Competencias Adicionales', 'pasiva', 'Ganas competencia con herramientas de herrero y aprendes a hablar, leer y escribir gigante.'),
        r(3, 'Tallador de Runas', 'pasiva', 'Conoces runas de gigante y, al terminar un descanso largo, inscribes cada una en un objeto que lleves (arma, armadura, escudo o joya).'),
        r(3, 'Poder de Gigante', 'adicional', 'Durante 1 minuto creces a Grande, tienes ventaja en pruebas y salvaciones de FUE y, una vez por turno, un ataque con arma o golpe sin armas hace daño extra.'),
        r(7, 'Escudo Rúnico', 'reaccion', 'Cuando aciertan a otra criatura que veas a 60 pies, obligas al atacante a repetir la tirada y usar la nueva.'),
        r(10, 'Gran Estatura', 'pasiva', 'Creces 3d4 pulgadas y el daño extra de Poder de Gigante sube a 1d8.'),
        r(15, 'Maestro de las Runas', 'pasiva', 'Puedes invocar cada runa dos veces, y recuperas los usos con un descanso corto o largo.'),
        r(18, 'Coloso Rúnico', 'pasiva', 'El daño extra de Poder de Gigante sube a 1d10, y al usarlo puedes crecer a Enorme, con 5 pies más de alcance.')
      ]
    }
  }
};

```

=== B ===

```json
[
  { "donde": "clase", "rasgo": "Indomable", "tipo": "otro", "detalle": "Suma tu nivel de clase a la tirada" },
  { "donde": "maestro-batalla", "rasgo": "Superioridad en Combate", "tipo": "eleccion", "id": "maniobra", "cuantas": "3; 5 desde nivel 7; 7 desde nivel 10; 9 desde nivel 15",
    "opciones": [
      { "key": "emboscada", "nombre": "Emboscada", "desc": "Suma el dado a tiradas de Sigilo o Iniciativa.", "nivel": 3, "requiere": null },
      { "key": "cbo-posiciones", "nombre": "Cambio de Posiciones", "desc": "Te mueves e intercambias sitio con aliado; sumas dado a la CA de uno de los dos.", "nivel": 3, "requiere": null },
      { "key": "golpe-comandante", "nombre": "Golpe del Comandante", "desc": "Sustituyes un ataque para que un aliado use su reacción y ataque, sumando el dado al daño.", "nivel": 3, "requiere": null },
      { "key": "presencia-imp", "nombre": "Presencia Imponente", "desc": "Suma el dado a Intimidación, Persuasión o Interpretación.", "nivel": 3, "requiere": null },
      { "key": "ataque-desarmar", "nombre": "Ataque para Desarmar", "desc": "Suma daño y fuerza a soltar el arma (salvación FUE).", "nivel": 3, "requiere": null },
      { "key": "ataque-distraccion", "nombre": "Ataque de Distracción", "desc": "Suma daño y da ventaja al siguiente ataque de un aliado.", "nivel": 3, "requiere": null },
      { "key": "juego-piernas", "nombre": "Juego de Piernas Evasivo", "desc": "Acción adicional para Destrabarse y sumar dado a tu CA este turno.", "nivel": 3, "requiere": null },
      { "key": "finta", "nombre": "Ataque de Finta", "desc": "Acción adicional para tener ventaja y sumar daño en tu próximo ataque.", "nivel": 3, "requiere": null },
      { "key": "ataque-provocar", "nombre": "Ataque para Provocar", "desc": "Suma daño e impone desventaja contra aliados (salvación SAB).", "nivel": 3, "requiere": null },
      { "key": "ataque-arremetida", "nombre": "Ataque de Arremetida", "desc": "Acción adicional para Correr. Si te mueves, sumas daño al golpear.", "nivel": 3, "requiere": null },
      { "key": "ataque-maniobra", "nombre": "Ataque de Maniobra", "desc": "Suma daño y permite a un aliado moverse gratis (sin oportunidad) como reacción.", "nivel": 3, "requiere": null },
      { "key": "ataque-amenaza", "nombre": "Ataque Amenazante", "desc": "Suma daño e intenta Asustar al objetivo (salvación SAB).", "nivel": 3, "requiere": null },
      { "key": "parada", "nombre": "Parada", "desc": "Reacción al recibir daño cuerpo a cuerpo para reducirlo en dado + FUE/DES.", "nivel": 3, "requiere": null },
      { "key": "ataque-precision", "nombre": "Ataque de Precisión", "desc": "Suma el dado a una tirada de ataque que haya fallado.", "nivel": 3, "requiere": null },
      { "key": "ataque-empuje", "nombre": "Ataque de Empuje", "desc": "Suma daño y empuja 15 pies (salvación FUE).", "nivel": 3, "requiere": null },
      { "key": "reagrupar", "nombre": "Reagrupar", "desc": "Acción adicional para dar a un aliado PG Temporales (dado + mitad de tu nivel).", "nivel": 3, "requiere": null },
      { "key": "respuesta", "nombre": "Respuesta", "desc": "Reacción para atacar cuando te fallan en cuerpo a cuerpo; sumas el dado al daño.", "nivel": 3, "requiere": null },
      { "key": "ataque-barrido", "nombre": "Ataque de Barrido", "desc": "Al golpear, aplicas el daño del dado a un segundo enemigo adyacente.", "nivel": 3, "requiere": null },
      { "key": "eval-tactica", "nombre": "Evaluación Táctica", "desc": "Suma el dado a Historia, Investigación o Perspicacia.", "nivel": 3, "requiere": null },
      { "key": "ataque-derribo", "nombre": "Ataque de Derribo", "desc": "Suma daño y tira al objetivo al suelo (salvación FUE).", "nivel": 3, "requiere": null }
    ]
  },
  { "donde": "arquero-arcano", "rasgo": "Disparo Arcano", "tipo": "usos", "usos": "max(1, INT)", "reset": "corto" },
  { "donde": "arquero-arcano", "rasgo": "Disparo Arcano", "tipo": "dado", "dado": "1d6; 1d8 desde nivel 10; 1d10 desde nivel 15; 1d12 desde nivel 18" },
  { "donde": "arquero-arcano", "rasgo": "Munición Mágica", "tipo": "usos", "usos": "1", "reset": "corto" },
  { "donde": "caballero-dragon-purpura", "rasgo": "Recuperación Grupal", "tipo": "usos", "usos": "1", "reset": "corto" },
  { "donde": "caballero-dragon-purpura", "rasgo": "Recuperación Grupal", "tipo": "pg", "detalle": "1d4 + nivel" },
  { "donde": "maestro-batalla", "rasgo": "Superioridad en Combate", "tipo": "dado", "dado": "1d8; 1d10 desde nivel 10; 1d12 desde nivel 18" },
  { "donde": "maestro-batalla", "rasgo": "Conoce a tu Enemigo", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "campeon", "rasgo": "Superviviente", "tipo": "pg", "detalle": "5 + CON" },
  { "donde": "guerrero-psionico", "rasgo": "Poder Psiónico", "tipo": "dado", "dado": "1d6; 1d8 desde nivel 5; 1d10 desde nivel 11; 1d12 desde nivel 17" },
  { "donde": "guerrero-psionico", "rasgo": "Campo Protector", "tipo": "otro", "detalle": "Reduce el daño en dado + INT" },
  { "donde": "guerrero-psionico", "rasgo": "Golpe Psiónico", "tipo": "daño", "daño": "dado + INT Fuerza" },
  { "donde": "caballero", "rasgo": "Marca Inquebrantable", "tipo": "usos", "usos": "max(1, FUE)", "reset": "largo" },
  { "donde": "caballero", "rasgo": "Maniobra de Protección", "tipo": "usos", "usos": "max(1, CON)", "reset": "largo" },
  { "donde": "caballero-eco", "rasgo": "Desatar Encarnación", "tipo": "usos", "usos": "max(1, CON)", "reset": "largo" },
  { "donde": "caballero-eco", "rasgo": "Mártir Sombrío", "tipo": "usos", "usos": "1", "reset": "corto" },
  { "donde": "caballero-eco", "rasgo": "Reclamar Potencial", "tipo": "usos", "usos": "max(1, CON)", "reset": "largo" },
  { "donde": "samurai", "rasgo": "Fuerza antes que la Muerte", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "caballero-runico", "rasgo": "Escudo Rúnico", "tipo": "usos", "usos": "pb", "reset": "largo" }
]

```

=== C ===

```json
{
  "arquero-arcano": "Arcana Unleashed (2026)",
  "caballero-dragon-purpura": "Forgotten Realms: Heroes of Faerûn (2025)",
  "maestro-batalla": "Manual del Jugador (2024)",
  "campeon": "Manual del Jugador (2024)",
  "caballero-arcano": "Manual del Jugador (2024)",
  "guerrero-psionico": "Manual del Jugador (2024)",
  "caballero": "Xanathar's Guide to Everything (2017)",
  "caballero-eco": "Explorer's Guide to Wildemount (2020)",
  "samurai": "Xanathar's Guide to Everything (2017)",
  "caballero-runico": "Tasha's Cauldron of Everything (2020)"
}

```

=== D ===

```json
{
  "arquero-arcano": "Tiradores de élite que imbuyen sus flechas con efectos mágicos, usando secretos élficos para alterar el campo de batalla a distancia.",
  "caballero-dragon-purpura": "Líderes carismáticos y caballeros nobles que inspiran a sus aliados a luchar más duro y resistir los golpes mortales.",
  "maestro-batalla": "Estudiantes del arte de la guerra que usan maniobras precisas y dados de superioridad para desarmar, empujar o burlar al enemigo.",
  "campeon": "Guerreros centrados en la excelencia física: críticos más frecuentes, atletismo notable y una resistencia que los mantiene en pie.",
  "caballero-arcano": "Combatientes que estudian la magia de mago para completar sus armas: escudos arcanos, explosiones y teletransporte en plena batalla.",
  "guerrero-psionico": "Guerreros que han despertado el poder de su mente, usando telequinesis para volar, lanzar enemigos y proyectar barreras de fuerza.",
  "caballero": "Guardianes montados que marcan a sus enemigos y protegen a quien tienen cerca, sin dejar que nadie cruce su línea.",
  "caballero-eco": "Guerreros que invocan un eco de sí mismos desde otra línea temporal para atacar y moverse desde dos lugares a la vez.",
  "samurai": "Combatientes de espíritu indomable que se lanzan al ataque con una determinación que ni la muerte frena.",
  "caballero-runico": "Guerreros que tallan runas de gigante en su equipo para crecer en batalla y desatar la magia de fuego, escarcha, piedra y tormenta."
}

```

=== E ===

* **Indomable (Nivel 9):** Ha cambiado dramáticamente en 2024. Ya no tiras un d20 nuevo, sino que ahora repites la tirada pero *sumando tu nivel de Guerrero* como bono estático. Además, gana un uso a nivel 13 y otro al 17.
* **Ataques Estudiados (Nivel 13):** Es un rasgo nuevo de la clase base introducido en 2024.
* **Maestro Táctico (Nivel 9):** Rasgo nuevo de la clase base.
* **Campeón:** El rasgo Atleta Notable (7) ahora incluye Ventaja en Iniciativa y movimiento gratuito tras un crítico. Guerrero Heroico (10) es un rasgo totalmente nuevo, reemplaza a Estilo de Combate Adicional, el cual ahora se obtiene en el Nivel 7. En la app actual, el estilo extra estaba en el nivel 10, lo cual es incorrecto en las reglas de 2024.
* **Maestro de Batalla:** "Conoce a tu Enemigo" (7) ahora funciona como Acción Adicional (antes requería 1 minuto). "Implacable" (15) ahora te permite tirar 1d8 gratuito por turno en lugar de gastar un dado, en lugar de darte uno solo al tirar iniciativa.
* **Caballero Arcano:** "Magia de Guerra" (7 y 18) fue muy mejorado en 2024; ahora reemplazas un ataque físico por un truco de forma directa durante la acción Atacar, en lugar de castear un truco y luego atacar como Acción Adicional.
* **Caballero del Dragón Púrpura:** La subclase fue republicada como **Banneret** en 2025. Cambié el nombre en la interfaz de español ("Estandarte" para no arrastrar un nombre regional) y se modernizaron todas sus mecánicas.
* **Guerrero Psiónico:** Su tabla de progresión de dados y tamaños se actualizó según el bloque oficial, e incluí todos sus rasgos integrándolos en las mecánicas JSON.
* **Subclases agregadas después por Claude:** Caballero, Caballero del Eco, Samurái y Caballero Rúnico, a partir del texto oficial que el encargo había perdido (scripts/gemini/oficial.ts no seguía las copias `_copy` de 5etools).
* **Falta un selector en el Lote:** El texto de la app indicaba que *Caballero Arcano* restringe a Abjuración/Evocación. En 2024, el texto oficial eliminó la restricción de escuelas. Puedes elegir cualquier conjuro de la lista de Mago.
* **Truco listado:** Añadí `Saber druídico` porque estaba listado tal cual en "Conjuros de la app" a pesar de pedir "Druidcraft" el Arquero Arcano.