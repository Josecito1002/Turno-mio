=== A ===

```ts
const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const PICARO_2024 = {
  rasgosAltos: [
    r(6, 'Pericia', 'pasiva', 'Eliges dos competencias en habilidades adicionales en las que no tengas Pericia y obtienes Pericia en ellas.'),
    r(7, 'Evasión', 'pasiva', 'Cuando superas una tirada de salvación de Destreza para recibir la mitad del daño, no recibes ningún daño, y si fallas, solo recibes la mitad. No funciona si estás Incapacitado.'),
    r(7, 'Talento Fiable', 'pasiva', 'Siempre que hagas una prueba de característica usando una habilidad o herramienta con la que seas competente, tratas cualquier resultado de 9 o menos en el d20 como un 10.'),
    r(11, 'Golpe Astuto Mejorado', 'pasiva', 'Puedes aplicar hasta dos efectos de Golpe Astuto a la vez cuando infliges daño de Ataque Furtivo, pagando el coste en dados de cada uno.'),
    r(14, 'Golpes Taimados', 'pasiva', 'Añades nuevas opciones a tu Golpe Astuto: Atontar (coste 2d6; limita al objetivo a solo moverse, actuar o acción adicional), Cegar (coste 3d6; Ciega hasta el fin de su turno) e Inconsciente (coste 6d6; lo deja Inconsciente 1 minuto o hasta recibir daño).'),
    r(15, 'Mente Resbaladiza', 'pasiva', 'Tu mente ágil se vuelve casi imposible de controlar. Obtienes competencia en las tiradas de salvación de Sabiduría y Carisma.'),
    r(18, 'Elusivo', 'pasiva', 'Ninguna tirada de ataque puede tener Ventaja contra ti, a menos que tengas la condición de Incapacitado.'),
    r(20, 'Golpe de Suerte', 'gratis', 'Si fallas una prueba de d20 (D20 Test), puedes convertir el resultado del dado en un 20 automático.', { usos: 1, reset: 'corto' })
  ],
  subAltos: {},
  subclases: {
    'embaucador': {
      n: 'Embaucador Arcano',
      rasgos: [
        r(3, 'Lanzamiento de Conjuros', 'pasiva', 'Aprendes a lanzar conjuros de la lista de Mago usando Inteligencia como característica de lanzamiento y un Foco Arcano. Conoces el truco Mano de mago más otros dos trucos de Mago, y preparas conjuros de nivel 1 o superior.'),
        r(3, 'Mano de Mago Prestidigitadora', 'adicional', 'Puedes lanzar Mano de mago como Acción Adicional y volver invisible la mano espectral. Además, controlas la mano como Acción Adicional y puedes usar a través de ella pruebas de Destreza (Juego de Manos).'),
        r(9, 'Emboscada Mágica', 'pasiva', 'Si tienes la condición de Invisible cuando lanzas un conjuro sobre una criatura, el objetivo tiene Desventaja en cualquier tirada de salvación que haga contra ese conjuro en ese mismo turno.'),
        r(13, 'Pícaro Versátil', 'pasiva', 'Puedes distraer objetivos con tu Mano de mago espectral. Cuando usas la opción de Tropiezo de tu Golpe Astuto en una criatura, puedes aplicar ese mismo efecto gratis a otra criatura a 5 pies de tu mano.'),
        r(17, 'Ladrón de Conjuros', 'reaccion', 'Cuando una criatura te toma como objetivo o área de un conjuro, usas tu Reacción para obligarla a salvar Inteligencia. Si falla, anulas el efecto contra ti y robas el conjuro durante 8 horas (ella no puede lanzarlo y tú lo tienes preparado).', { usos: 1, reset: 'largo' })
      ]
    },
    'asesino': {
      n: 'Asesino',
      rasgos: [
        r(3, 'Asesinar', 'pasiva', 'Tienes Ventaja en las tiradas de Iniciativa. En el primer asalto de combate, tienes Ventaja contra criaturas que no hayan actuado y tu Ataque Furtivo les causa daño adicional igual a tu nivel de Pícaro.'),
        r(3, 'Herramientas de Asesino', 'pasiva', 'Obtienes un kit de disfraz y un kit de envenenador, y adquieres competencia con ambos.'),
        r(9, 'Experiencia en Infiltración', 'pasiva', 'Puedes imitar la voz o caligrafía de otra persona tras estudiarla 1 hora. Además, tu velocidad ya no se reduce a 0 al usar Puntería Firme.'),
        r(13, 'Armas Envenenadas', 'pasiva', 'Cuando aplicas el efecto de Veneno de tu Golpe Astuto, el objetivo también sufre 2d6 de daño de Veneno si falla la salvación, ignorando cualquier Resistencia al veneno.'),
        r(17, 'Golpe Mortal', 'pasiva', 'Cuando aciertas tu Ataque Furtivo durante el primer asalto de combate, el objetivo debe superar una salvación de Constitución (CD 8 + DES + PB) o el daño de todo el ataque se duplica.')
      ]
    },
    'fantasma': {
      n: 'Fantasma',
      rasgos: [
        r(3, 'Lamentos de la Tumba', 'pasiva', 'Tras infligir daño de Ataque Furtivo, puedes elegir una segunda criatura a 30 pies de la primera. Tira la mitad de tus dados de Furtivo (redondeando arriba) e inflígele ese daño Necrótico.', { usos: 'max(1, DES)', reset: 'largo' }),
        r(3, 'Susurros de los Muertos', 'pasiva', 'Al terminar un Descanso Corto o Largo, un espíritu te comparte conocimiento y obtienes competencia en una habilidad o herramienta a tu elección hasta tu siguiente cambio.'),
        r(9, 'Fichas de Alma', 'reaccion', 'Obtienes dos fichas de alma (máximo 2; sube a 3 a nivel 13 y a 4 a nivel 17). Mientras tengas al menos una, tienes Ventaja en salvaciones de muerte y de Constitución. Puedes destruir una para usar Lamentos de la Tumba gratis, hacer preguntas a un alma, o lanzar Augurio (Augury) como acción mágica. Al morir alguien a 30 pies, ganas una ficha como Reacción.'),
        r(9, 'Voz de la Muerte', 'fuera', 'Puedes lanzar Hablar con los Muertos una vez por descanso corto o largo sin gastar espacio ni componentes, usando Destreza. Puedes elegir una de tus fichas de alma como objetivo en lugar de un cadáver.', { usos: 1, reset: 'corto' }),
        r(13, 'Caminar Fantasma', 'adicional', 'Como Acción Adicional, te vuelves espectral por 10 minutos: ganas velocidad de vuelo de 10 pies (puedes flotar), los ataques contra ti tienen Desventaja y puedes atravesar criaturas y objetos. Gratis una vez por descanso largo o destruyendo una ficha de alma.', { usos: 1, reset: 'largo' }),
        r(17, 'Amigo de la Muerte', 'pasiva', 'Cuando usas Lamentos de la Tumba, infliges el daño necrótico tanto al primer objetivo como al segundo. Además, al tirar Iniciativa ganas una ficha de alma de inmediato si no te quedaba ninguna.')
      ]
    },
    'vastago-tres': {
      n: 'Vástago de los Tres',
      rasgos: [
        r(3, 'Sed de Sangre', 'reaccion', 'Cuando un enemigo a 30 pies recibe daño y queda Ensangrentado sin morir, usas tu Reacción para teletransportarte a 5 pies de él y asestarle un ataque cuerpo a cuerpo de inmediato.', { usos: 'max(1, INT)', reset: 'largo' }),
        r(3, 'Lealtad Temible', 'pasiva', 'Te encomiendas a uno de los Tres Muertos tras cada descanso largo, ganando un truco (usa Inteligencia) y una Resistencia: Bane (daño Psíquico e Ilusión menor), Bhaal (daño de Veneno y Guardia de cuchillas) o Myrkul (daño Necrótico y Toque helado).'),
        r(9, 'Infundir Miedo', 'pasiva', 'Ganas una opción nueva de Golpe Astuto: Aterrorizar (coste 1d6; salvación de Sabiduría o queda Asustado por 1 minuto, dándote Ventaja en tus ataques contra él mientras dure el miedo).'),
        r(13, 'Aura de Malevolencia', 'pasiva', 'Cuando usas Sed de Sangre para teletransportarte, las criaturas que elijas a 10 pies del punto de origen o de destino sufren daño igual a tu INT, del mismo tipo de daño al que eres resistente por Lealtad Temible (ignora Resistencia).'),
        r(17, 'Terror Encarnado', 'pasiva', 'Recuperas un uso de Sed de Sangre tras un Descanso Corto. Además, al tirar el daño de tu Ataque Furtivo, tratas cualquier resultado de 1 o 2 en los dados como si fuera un 3.')
      ]
    },
    'cuchillo-mental': {
      n: 'Cuchillo Mental',
      rasgos: [
        r(3, 'Poder Psiónico', 'pasiva', 'Albergas Dados de Energía Psiónica que potencian tus habilidades. Dispones de dados para potenciar pruebas fallidas con competencias sin gastar el dado si no logras el éxito, y para enlazar mentes telepáticamente con tus aliados a 1 milla por horas.', { usos: 4, reset: 'largo' }),
        r(3, 'Hojas Psíquicas', 'pasiva', 'Al tomar la acción de Atacar o un Ataque de Oportunidad con la mano libre, manifiestas una hoja psíquica (1d6 psíquico, Sutil, Arrojadiza a 60 pies). Puedes hacer un segundo ataque con otra hoja psíquica (1d4) como Acción Adicional en tu turno.'),
        r(9, 'Hojas del Alma', 'pasiva', 'Si fallas un ataque con tu Hoja Psíquica, puedes tirar un dado de energía para sumarlo al ataque y forzar el impacto. Como Acción Adicional, puedes arrojar una hoja hasta 10 veces el resultado de un dado psiónico en pies y teletransportarte allí.'),
        r(13, 'Velo Psíquico', 'accion', 'Como Acción Mágica, te vuelves Invisible durante 1 hora (termina antes si infliges daño o fuerzas una salvación). Puedes usarlo una vez gratis al día o gastando un Dado de Energía Psiónica.', { usos: 1, reset: 'largo' }),
        r(17, 'Desgarrar la Mente', 'pasiva', 'Al infligir daño de Ataque Furtivo con tus Hojas Psíquicas, puedes forzar una salvación de Sabiduría (CD 8 + DES + PB) o el objetivo queda Aturdido por 1 minuto. Gratis una vez al día o gastando tres dados psiónicos.', { usos: 1, reset: 'largo' })
      ]
    },
    'ladron': {
      n: 'Ladrón',
      rasgos: [
        r(3, 'Manos Rápidas', 'adicional', 'Como Acción Adicional, puedes hacer pruebas de Destreza (Juego de Manos) para forzar cerraduras o robar, tomar la acción de Utilizar, o tomar la Acción Mágica para usar un objeto mágico que la requiera.'),
        r(3, 'Trabajo en Segundo Piso', 'pasiva', 'Obtienes una velocidad de trepar igual a tu velocidad terrestre, y puedes determinar tu distancia de salto usando tu Destreza en lugar de tu Fuerza.'),
        r(9, 'Sigilo Supremo', 'pasiva', 'Obtienes una opción para Golpe Astuto: Ataque Sigiloso (coste 1d6; atacar no termina tu condición de Invisible de la acción Esconderse si acabas tu turno tras Cobertura Tres Cuartos o Cobertura Total).'),
        r(13, 'Usar Objeto Mágico', 'pasiva', 'Puedes sintonizarte con hasta cuatro objetos mágicos a la vez. Al usar cargas de un objeto mágico, un resultado de 6 en 1d6 evita gastarlas. Puedes usar cualquier pergamino de conjuro (tirando Inteligencia/Arcanos CD 10 + nivel si es de nivel 2 o más).'),
        r(17, 'Reflejos de Ladrón', 'pasiva', 'Puedes tomar dos turnos completos durante el primer asalto de cualquier combate: el primero en tu Iniciativa regular y el segundo en tu Iniciativa menos 10.')
      ]
    }
  }
};

```

=== B ===

```json
[
  { "donde": "clase", "rasgo": "Golpe de Suerte", "tipo": "usos", "usos": "1", "reset": "corto" },
  { "donde": "embaucador", "rasgo": "Ladrón de Conjuros", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "embaucador", "rasgo": "Lanzamiento de Conjuros", "tipo": "conjuros", "por_nivel": { "3": [], "7": [], "13": [], "19": [] } },
  { "donde": "fantasma", "rasgo": "Lamentos de la Tumba", "tipo": "usos", "usos": "max(1, DES)", "reset": "largo" },
  { "donde": "fantasma", "rasgo": "Fichas de Alma", "tipo": "usos", "usos": "2; 3 desde nivel 13; 4 desde nivel 17", "reset": "largo" },
  { "donde": "fantasma", "rasgo": "Voz de la Muerte", "tipo": "usos", "usos": "1", "reset": "corto" },
  { "donde": "fantasma", "rasgo": "Caminar Fantasma", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "vastago-tres", "rasgo": "Sed de Sangre", "tipo": "usos", "usos": "max(1, INT)", "reset": "largo; corto desde nivel 17" },
  { "donde": "vastago-tres", "rasgo": "Lealtad Temible", "tipo": "eleccion", "id": "lealtad-tres", "cuantas": "1",
    "opciones": [
      { "key": "bane", "nombre": "Bane", "desc": "Resistencia a daño Psíquico y truco Ilusión menor.", "nivel": 3, "requiere": null },
      { "key": "bhaal", "nombre": "Bhaal", "desc": "Resistencia a daño de Veneno y truco Guardia de cuchillas.", "nivel": 3, "requiere": null },
      { "key": "myrkul", "nombre": "Myrkul", "desc": "Resistencia a daño Necrótico y truco Toque helado.", "nivel": 3, "requiere": null }
    ]
  },
  { "donde": "cuchillo-mental", "rasgo": "Poder Psiónico", "tipo": "usos", "usos": "4; 6 desde nivel 5; 8 desde nivel 9; 10 desde nivel 13; 12 desde nivel 17", "reset": "largo" },
  { "donde": "cuchillo-mental", "rasgo": "Poder Psiónico", "tipo": "dado", "dado": "1d6; 1d8 desde nivel 5; 1d10 desde nivel 11; 1d12 desde nivel 17" },
  { "donde": "cuchillo-mental", "rasgo": "Velo Psíquico", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "cuchillo-mental", "rasgo": "Desgarrar la Mente", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "ladron", "rasgo": "Usar Objeto Mágico", "tipo": "otro", "detalle": "Sintonización con hasta 4 objetos mágicos a la vez" }
]

```

=== C ===

```json
{
  "Embaucador Arcano": "Manual del Jugador (2024)",
  "Asesino": "Manual del Jugador (2024)",
  "Fantasma": "Ravenloft: The Horrors Within (2026)",
  "Vástago de los Tres": "Forgotten Realms: Heroes of Faerûn (2025)",
  "Cuchillo Mental": "Manual del Jugador (2024)",
  "Ladrón": "Manual del Jugador (2024)"
}

```

=== D ===

```json
{
  "embaucador": "Pícaros astutos que combinan el sigilo y el robo con trucos mágicos e ilusiones de la escuela de magia para confundir a sus presas.",
  "asesino": "Especialistas mortíferos en el veneno, la suplantación y el arte de la emboscada que eliminan a sus objetivos antes de que puedan reaccionar.",
  "fantasma": "Individuos vinculados al velo de la muerte que roban recuerdos de almas errantes, adoptan formas incorpóreas y desatan lamentos necróticos.",
  "vastago-tres": "Agentes oscuros tocados por los Tres Muertos que se teletransportan al instante hacia enemigos heridos para rematarlos con frialdad.",
  "cuchillo-mental": "Asesinos psíquicos que proyectan dagas de pura energía mental capaces de dañar la mente y teletransportarse a través del campo de batalla.",
  "ladron": "El clásico saqueador y aventurero veloz que escala cualquier superficie, usa objetos mágicos en combate y actúa dos veces en un parpadeo."
}

```

=== E ===

* **Pericia (Nivel 6):** En 2024 la clase base recibe su segunda selección de Pericia en nivel 6 (en la app solo figuraba la de nivel 1). Se añadió a `rasgosAltos`.
* **Golpe de Suerte (Nivel 20):** En 2024 ya no es por descanso largo exclusivamente; se recupera con Descanso Corto o Largo (`reset: 'corto'`), y convierte cualquier prueba de d20 en un 20 en vez de solo impactar o dar un 20 en habilidad.
* **Golpe Astuto (Nivel 5 integrado):** El texto oficial especifica que la CD de las salvaciones de Golpe Astuto es `8 + DES + PB`. La app tenía un valor fijo `CD 17` que debe corregirse dinámicamente.
* **Embaucador Arcano:** En 2024 se eliminó la restricción de escuelas clásicas (Ilusión y Encantamiento); ahora prepara cualquier conjuro de la lista de Mago. A nivel 13, *Pícaro Versátil* ya no da ventaja con la Mano de Mago como Acción Adicional, sino que duplica el efecto de Tropiezo de Golpe Astuto usando la mano espectral.
* **Asesino:** A nivel 3, el daño adicional de sorpresa en el primer asalto es exactamente igual a tu nivel de Pícaro (`Rogue level`). A nivel 9 se incluye *Puntería Móvil (Roving Aim)*, permitiendo no perder velocidad tras usar Puntería Firme. A nivel 13 recibe *Armas Envenenadas* (+2d6 veneno en Golpe Astuto), reemplazando al antiguo Impostor. A nivel 17 (*Golpe Mortal*), la CD de salvación es `8 + DES + PB`.
* **Fantasma:** Actualizado a la versión más reciente (*Ravenloft: The Horrors Within 2026*). *Lamentos de la Tumba* ahora tiene usos iguales a `max(1, DES)` (antes usaba PB). *Fichas de Alma* ahora escala en cantidad fija (2 a nivel 9, 3 a nivel 13, 4 a nivel 17), permite lanzar Augurio, y se añade el rasgo complementario *Voz de la Muerte* a nivel 9 (lanzar Hablar con los Muertos usando Destreza). A nivel 17 (*Amigo de la Muerte*), recupera una ficha de alma al tirar Iniciativa si no le quedaba ninguna.
* **Vástago de los Tres:** Actualizado a *Forgotten Realms: Heroes of Faerûn (2025)*. En nivel 3 se añade el selector *Lealtad Temible* con los Tres Muertos (Bane, Bhaal, Myrkul). A nivel 9 incorpora *Infundir Miedo* como opción de Golpe Astuto (Aterrorizar).
* **Cuchillo Mental:** A nivel 17, el rasgo de aturdimiento se llama *Desgarrar la Mente (Rend Mind)*, mientras que la invisibilidad (*Velo Psíquico*) pertenece formalmente al nivel 13.
* **Ladrón:** A nivel 3, *Manos Rápidas* permite realizar la Acción Mágica para activar objetos mágicos. A nivel 9 gana *Sigilo Supremo* integrado con Golpe Astuto (Ataque Sigiloso). A nivel 13 (*Usar Objeto Mágico*) permite una 4.ª sintonización, da probabilidad (1 en 1d6) de no consumir cargas y permite leer cualquier pergamino de conjuro.
* **Subclases no incluidas:** *Inquisitive*, *Mastermind*, *Scout* y *Swashbuckler* venían mencionadas en los encabezados pero carecían de texto oficial en el documento provisto; por lo tanto, no se generó código para ellas siguiendo la Regla 1.