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
      n: 'Estandarte',
      rasgos: [
        r(3, 'Enviado Caballeresco', 'pasiva', 'Sabes cómo comportarte como embajador. Puedes lanzar Comprender idiomas como ritual usando Carisma, aprendes un idioma que puedes rotar cada descanso largo, y obtienes competencia en Perspicacia, Intimidación, Persuasión o Interpretación.'),
        r(3, 'Recuperación Grupal', 'pasiva', 'Cuando usas tu Segundo Aliento, puedes elegir a aliados a 30 pies (hasta tu bono de Carisma). Cada uno recupera 1d4 + tu nivel de Guerrero en PG.', { usos: 1, reset: 'corto' }),
        r(7, 'Tácticas de Equipo', 'pasiva', 'Cuando usas Recuperación Grupal, los aliados sanados obtienen Ventaja en pruebas del dado d20 (D20 Tests) hasta el inicio de tu siguiente turno.'),
        r(10, 'Oleada Inspiradora', 'pasiva', 'Cuando usas Oleada de Acción, aliados a 30 pies (hasta tu mod de Carisma) pueden usar su Reacción para moverse la mitad de su velocidad sin oportunidad o hacer un ataque.'),
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
        r(3, 'Campo Protector', 'reaccion', 'Cuando alguien a 30 pies recibe daño, gastas un dado como Reacción para reducir el daño en (dado + INT).'),
        r(3, 'Golpe Psiónico', 'gratis', 'Una vez por turno al golpear a 30 pies, gastas un dado para infligir daño de Fuerza extra igual a (dado + INT).'),
        r(3, 'Movimiento Telequinético', 'accion', 'Mueves un objeto suelto Grande o menor, o a un aliado, hasta 30 pies. Gratis una vez por descanso, o gastando un dado psiónico.', { usos: 1, reset: 'corto' }),
        r(7, 'Salto Potenciado por Psi', 'adicional', 'Como Acción Adicional, ganas velocidad de Vuelo igual al doble de tu velocidad este turno. Gratis una vez por descanso o gastando un dado psiónico.', { usos: 1, reset: 'corto' }),
        r(7, 'Empujón Telequinético', 'gratis', 'Cuando haces daño con Golpe Psiónico, puedes forzar al objetivo a una salvación de FUE o derribarlo/empujarlo 10 pies.'),
        r(10, 'Mente Protegida', 'pasiva', 'Tienes resistencia al daño Psíquico. Si inicias tu turno Hechizado o Asustado, puedes gastar un dado psiónico (sin acción) para curarte el estado.'),
        r(15, 'Baluarte de Fuerza', 'adicional', 'Como Acción Adicional, das Cobertura Media por 1 minuto a varias criaturas a 30 pies (hasta mod. Inteligencia). Gratis 1 vez al día o gastando un dado psiónico.', { usos: 1, reset: 'largo' }),
        r(18, 'Maestro de la Telequinesis', 'pasiva', 'Siempre tienes Telequinesis. La lanzas sin componentes gratis una vez al día o gastando un dado psiónico. Mientras te concentras, puedes atacar como acción adicional.', { usos: 1, reset: 'largo' })
      ]
    }
  }
};

```

=== B ===

```json
[
  { "donde": "clase", "rasgo": "Indomable", "tipo": "usos", "usos": "1; 2 desde nivel 13; 3 desde nivel 17", "reset": "largo" },
  { "donde": "clase", "rasgo": "Indomable", "tipo": "otro", "detalle": "Suma tu nivel de clase a la tirada" },
  { "donde": "clase", "rasgo": "Maestro de Batalla (Maniobras)", "tipo": "eleccion", "id": "maniobra", "cuantas": "3; 5 desde nivel 7; 7 desde nivel 10; 9 desde nivel 15",
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
  { "donde": "maestro-batalla", "rasgo": "Superioridad en Combate", "tipo": "usos", "usos": "4; 5 desde nivel 7; 6 desde nivel 15", "reset": "corto" },
  { "donde": "maestro-batalla", "rasgo": "Superioridad en Combate", "tipo": "dado", "dado": "1d8; 1d10 desde nivel 10; 1d12 desde nivel 18" },
  { "donde": "maestro-batalla", "rasgo": "Conoce a tu Enemigo", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "campeon", "rasgo": "Superviviente", "tipo": "pg", "detalle": "5 + CON" },
  { "donde": "caballero-arcano", "rasgo": "Lanzamiento de Conjuros", "tipo": "conjuros", "por_nivel": { "3": [], "7": [], "13": [], "19": [] } },
  { "donde": "guerrero-psionico", "rasgo": "Poder Psiónico", "tipo": "usos", "usos": "4; 6 desde nivel 5; 8 desde nivel 9; 10 desde nivel 13; 12 desde nivel 17", "reset": "largo" },
  { "donde": "guerrero-psionico", "rasgo": "Poder Psiónico", "tipo": "dado", "dado": "1d6; 1d8 desde nivel 5; 1d10 desde nivel 11; 1d12 desde nivel 17" },
  { "donde": "guerrero-psionico", "rasgo": "Campo Protector", "tipo": "otro", "detalle": "Reduce el daño en dado + INT" },
  { "donde": "guerrero-psionico", "rasgo": "Golpe Psiónico", "tipo": "daño", "daño": "dado + INT Fuerza" }
]

```

=== C ===

```json
{
  "Arquero Arcano": "Arcana Unleashed (2026)",
  "Estandarte": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Maestro de Batalla": "Manual del Jugador (2024)",
  "Campeón": "Manual del Jugador (2024)",
  "Caballero Arcano": "Manual del Jugador (2024)",
  "Guerrero Psiónico": "Manual del Jugador (2024)"
}

```

=== D ===

```json
{
  "arquero-arcano": "Tiradores de élite que imbuyen sus flechas con efectos mágicos, usando secretos élficos para alterar el campo de batalla a distancia.",
  "caballero-dragon-purpura": "Líderes carismáticos y caballeros nobles que inspiran a sus aliados a luchar más duro y resistir los golpes mortales.",
  "maestro-batalla": "Estudiantes tácticos del combate cuerpo a cuerpo que usan maniobras precisas y dados de superioridad para desarmar, empujar o burlar al enemigo.",
  "campeon": "Gladiadores perfeccionistas enfocados enteramente en proezas físicas, resistencia bruta y golpes críticos devastadores.",
  "caballero-arcano": "Combatientes que mezclan el dominio de las armas pesadas con evocaciones mágicas, teletransporte táctico y escudos arcanos.",
  "guerrero-psionico": "Guerreros que han despertado el poder de su mente, usando telequinesis para volar, lanzar enemigos y proyectar barreras de fuerza."
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
* **Subclases no incluidas:** "Cavalier", "Echo Knight" y "Samurai" aparecieron en los títulos del documento original pero carecían de texto de reglas, por lo que no se generó código para ellas, acatando la regla 1.
* **Falta un selector en el Lote:** El texto de la app indicaba que *Caballero Arcano* restringe a Abjuración/Evocación. En 2024, el texto oficial eliminó la restricción de escuelas. Puedes elegir cualquier conjuro de la lista de Mago.
* **Truco listado:** Añadí `Saber druídico` porque estaba listado tal cual en "Conjuros de la app" a pesar de pedir "Druidcraft" el Arquero Arcano.