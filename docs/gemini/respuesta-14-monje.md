=== A ===

```ts
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
      r(6, 'Paso de Sombra', 'adicional', 'Mientras estás en luz tenue u oscuridad, puedes teletransportarte hasta 60 pies a otro espacio que también esté poco iluminado o a oscuras. Tras hacerlo, tienes Ventaja en tu próximo ataque cuerpo a cuerpo este turno.'),
      r(11, 'Paso de Sombra Mejorado', 'pasiva', 'Puedes gastar 1 Punto de Enfoque al usar Paso de Sombra para ignorar el requisito de estar en luz tenue u oscuridad. Además, puedes hacer un ataque sin armas inmediatamente después de teletransportarte como parte de la Acción Adicional.'),
      r(17, 'Manto de Sombras', 'accion', 'Como Acción Mágica en luz tenue u oscuridad, gastas 3 Puntos de Enfoque para cubrirte de sombras. Te vuelves Invisible, puedes atravesar criaturas como si fueran terreno difícil y usas Ráfaga de Golpes sin coste de Enfoque. Dura 1 minuto o hasta acabar tu turno bajo luz brillante.')
    ],
    manoabierta: [
      r(6, 'Integridad del Cuerpo', 'adicional', 'Como Acción Adicional, tiras un dado de Artes Marciales y recuperas Puntos de Golpe iguales al resultado más tu modificador de Sabiduría (mínimo 1).', { usos: 'max(1, SAB)', reset: 'largo' }),
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
        r(3, 'Sintonía Elemental', 'gratis', 'Al inicio de tu turno, gastas 1 Punto de Enfoque para imbuirte de energía por 10 minutos. Tus golpes sin armas ganan +10 pies de alcance, infligen daño Ácido, Frío, Fuego, Rayo o Trueno y forzan una salvación de FUE (o mueves al objetivo 10 pies). Aprendes el truco Elementalismo (NO ESTÁ EN LA APP).'),
        r(6, 'Explosión Elemental', 'accion', 'Como Acción Mágica, gastas 2 Puntos de Enfoque para detonar energía en una esfera de 20 pies de radio (hasta 120 pies de ti). Infliges 3 dados de Artes Marciales del daño elemental elegido (salvación DES para mitad de daño).'),
        r(11, 'Zancada de los Elementos', 'pasiva', 'Mientras tu Sintonía Elemental está activa, tienes velocidad de Vuelo y de Nado iguales a tu velocidad terrestre.'),
        r(17, 'Epítome Elemental', 'pasiva', 'En Sintonía Elemental ganas Resistencia a un daño elemental (cambiable al inicio de tu turno). Tu Paso del Viento aumenta tu velocidad en +20 pies y causa daño elemental pasivo (1 dado) al pasar junto a enemigos. Tus golpes sin armas hacen 1 dado de daño extra (1 vez por turno).')
      ]
    },
    'artes-misticas': {
      n: 'Guerrero de las Artes Místicas',
      rasgos: [
        r(3, 'Conjuros de las Artes Místicas', 'pasiva', 'Obtienes la habilidad de lanzar conjuros de Hechicero usando Sabiduría. Conoces dos trucos (como Guardia de cuchillas o Tronar) y usas tus niveles para ganar espacios de magia para conjuros de nivel 1 o superior.'),
        r(6, 'Estilo de Lucha Místico', 'pasiva', 'Al tomar la acción de Atacar, puedes sustituir uno de tus golpes sin armas por el lanzamiento de un truco de Hechicero que requiera 1 Acción.'),
        r(6, 'Enfoque Místico', 'pasiva', 'Puedes recuperar Puntos de Enfoque gastando un espacio de conjuro (igual a su nivel). También puedes gastar Puntos de Enfoque (al descansar corto o usar Metabolismo Asombroso) para recuperar espacios gastados.'),
        r(11, 'Golpe Concentrado', 'pasiva', 'Cuando usas Golpe Aturdidor, pase o falle la salvación, el objetivo tiene Desventaja en las tiradas de salvación contra tus conjuros hasta el inicio de tu próximo turno.'),
        r(17, 'Estilo de Lucha Místico Mejorado', 'pasiva', 'Al usar Ráfaga de Golpes, puedes sustituir dos golpes desarmados por el lanzamiento de un conjuro de Hechicero de nivel 1 o 2 (que cueste 1 Acción), integrado en esa misma Acción Adicional.')
      ]
    }
  }
};

```

=== B ===

```json
[
  { "donde": "clase", "rasgo": "Cuerpo y Mente", "tipo": "otro", "detalle": "Destreza y Sabiduría aumentan en 4, hasta un máximo de 25" },
  { "donde": "manoabierta", "rasgo": "Integridad del Cuerpo", "tipo": "usos", "usos": "max(1, SAB)", "reset": "largo" },
  { "donde": "misericordia", "rasgo": "Ráfaga de Curación y Daño", "tipo": "usos", "usos": "max(1, SAB)", "reset": "largo" },
  { "donde": "misericordia", "rasgo": "Mano de Misericordia Suprema", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "artes-misticas", "rasgo": "Conjuros de las Artes Místicas", "tipo": "conjuros", "por_nivel": { "3": [], "7": [], "13": [], "19": [] } },
  { "donde": "elementos", "rasgo": "Sintonía Elemental", "tipo": "daño", "daño": "Ácido, Frío, Fuego, Rayo o Trueno" }
]

```

=== C ===

```json
{
  "Guerrero de la Misericordia": "Manual del Jugador (2024)",
  "Guerrero de la Sombra": "Manual del Jugador (2024)",
  "Guerrero de los Elementos": "Manual del Jugador (2024)",
  "Guerrero de las Artes Místicas": "Arcana Unleashed (2026)",
  "Guerrero de la Mano Abierta": "Manual del Jugador (2024)"
}

```

=== D ===

```json
{
  "manoabierta": "Maestros del combate sin armas, derriban, empujan y neutralizan a sus enemigos mientras curan su propio cuerpo con ki.",
  "sombra": "Espías y asesinos de la noche que moldean las sombras para teletransportarse y golpear desde la invisibilidad.",
  "misericordia": "Médicos errantes enmascarados capaces de curar con un toque benévolo o provocar un dolor letal mediante golpes necróticos.",
  "elementos": "Canalizadores del Caos Elemental que alargan sus golpes y desatan destructivas explosiones de fuego, hielo y relámpago.",
  "artes-misticas": "Expertos que entrelazan artes marciales y hechicería, disparando trucos y canalizando espacios de conjuros a través de sus golpes."
}

```

=== E ===

* **Puntos de Ki:** El recurso central de la clase ha sido renombrado a **Puntos de Enfoque (Focus Points)** en las reglas de 2024.
* **Artes Marciales (Nivel 1):** El dado de daño base ha sido mejorado; ahora inicia en 1d6 (antes 1d4). El rasgo ahora dictamina explícitamente que la CD de las opciones Agarrar (Grapple) y Empujar (Shove) usa el modificador de Destreza.
* **Metabolismo Asombroso (Nivel 2):** Rasgo nuevo que permite recuperar todos los Puntos de Enfoque y una pequeña cura (nivel + dado) al tirar Iniciativa una vez al día.
* **Desviar Ataques (Nivel 3):** Este rasgo reemplaza a *Desviar Proyectiles*. Es uno de los mayores bufos del Monje: ahora reduce el daño de *cualquier* ataque que contenga daño Contundente, Cortante o Perforante (incluso si es un golpe de espada cuerpo a cuerpo), y te permite redirigir la fuerza a enemigos adyacentes o lejanos.
* **Golpe Aturdidor (Nivel 5):** Ya no aturde totalmente sin un efecto secundario en un éxito de la salvación; ahora, si la criatura supera la salvación de CON, su velocidad se reduce a la mitad y el próximo ataque contra ella tiene Ventaja.
* **Guerrero de la Mano Abierta:** Su rasgo nivel 6 (Integridad del Cuerpo) es ahora una Acción Adicional que puedes usar múltiples veces al día (según tu Sabiduría), en lugar de una sola acción masiva de cura al día. Su rasgo nivel 11 (antes Santuario permanente) cambió a **Paso Veloz**.
* **Guerrero de la Sombra:** El nivel 11 ahora te permite teletransportarte desde luz brillante usando Enfoque. El nivel 17 otorga una invisibilidad e incorporeidad duraderas en lugar de dar solo un ataque de oportunidad extra ("Oportunista" fue eliminado).
* **Subclases Mencionadas sin Texto:** Se omitieron *Ascendant Dragon*, *Astral Self*, *Drunken Master*, *Four Elements* (reescrita como Guerrero de los Elementos), *Kensei*, *Long Death* y *Sun Soul* porque el documento entregado no incluyó sus textos de reglas descriptivos (siguiendo la directriz de crear solo las subclases del texto provisto).