# Lote Beastheart y Compañeros Mascotas - Completo

=== A ===
```typescript
export const beastheart: Record<string, any> = {
  n: "Beastheart",
  dado: "d8",
  sv: ["Fuerza", "Sabiduría"],
  habN: 3,
  habs: ["Trato con Animales", "Atletismo", "Intimidación", "Naturaleza", "Percepción", "Sigilo", "Supervivencia"],
  arm: ["Armaduras Ligeras", "Armaduras Medias", "Escudos"],
  armas: ["Armas Simples", "Hacha de Batalla", "Gran Hacha", "Arco Largo", "Red", "Cimitarra", "Espada Corta"],
  equipo: [
    "Armadura de pieles; o armadura de cuero, arco largo y 20 flechas",
    "Un arma marcial y un escudo; o dos armas marciales",
    "Dos hachas de mano o cualquier arma simple",
    "Un paquete de explorador de mazmorras o un paquete de explorador"
  ],
  rasgos: [
    {
      nombre: "Compañero",
      t: "fuera",
      texto: "Obtienes un compañero criatura que te acompaña. En combate, comparte turno contigo y actúa durante el tuyo. Puede moverse y usar su reacción de forma independiente, pero solo realiza la acción de Esquivar, Correr o Retirarse salvo que uses una acción adicional para ordenarle otra acción (debe poder verte o escucharte). Si estás incapacitado o el compañero entra en frenesí, actúa por su cuenta.\n\nSi el compañero ha perdido puntos de golpe o está muerto, puedes pasar 1 minuto meditando sobre su espíritu. El compañero recupera todos sus puntos de golpe y vuelve a la vida si estaba muerto, y tú ganas un nivel de Agotamiento. Tras un descanso largo, puedes vincularte con un nuevo compañero; el anterior se marcha.",
      n: 1
    },
    {
      nombre: "Idioma Natural",
      t: "pasiva",
      texto: "Puedes comunicarte verbalmente y comprender a tu compañero, así como a todas las Bestias y Monstruosidades para transmitir o recibir ideas simples. Al hablar con ellos usando este rasgo, puedes usar pruebas de Sabiduría (Trato con Animales) en lugar de pruebas de Carisma para influenciarlos.",
      n: 1
    },
    {
      nombre: "Proezas Primigenias",
      t: "pasiva",
      texto: "Aprendes a canalizar la furia de tu compañero en actos extraordinarios consumiendo su Ferocidad. Aprendes tres proezas de tu elección (ver opciones). Aprendes dos adicionales a nivel 10 y 17. Puedes cambiar una proeza que conozcas por otra cada vez que subes un nivel en esta clase.\n\nPara usar una proeza, tu compañero debe estar a 60 pies o menos de ti y tener suficiente ferocidad. No puedes usar proezas si tu compañero está en frenesí.\n\n**CD de tus proezas** = 8 + tu bonificador por competencia + tu modificador de Sabiduría.",
      n: 2
    },
    {
      nombre: "Ferocidad Superior",
      t: "pasiva",
      texto: "Siempre que tu compañero use una acción de ferocidad que requiera que una criatura haga una tirada de salvación o prueba de característica, puede usar tu CD de proezas en lugar de la suya normal.",
      n: 2
    },
    {
      nombre: "Vínculo de Compañero",
      t: "pasiva",
      texto: "Eliges un vínculo especializado que compartes con tu compañero: Ferocious, Hunter, Infernal, Primordial o Protector. Te otorga rasgos a nivel 3, 7, 11 y 15.",
      n: 3
    },
    {
      nombre: "Cuidador Maestro",
      t: "pasiva",
      texto: "Obtienes competencia en la habilidad Trato con Animales. Si ya eres competente, tu bonificador por competencia se duplica para cualquier prueba que hagas con ella.",
      n: 3
    },
    {
      nombre: "Mejora de Característica",
      t: "pasiva",
      texto: "Aumentas una puntuación de característica en 2 o dos en 1. Niveles 4, 8, 12, 16 y 19.",
      n: 4
    },
    {
      nombre: "Más allá del Instinto",
      t: "pasiva",
      texto: "Tú y tu compañero obtienen los siguientes beneficios:\n- Cuando tu compañero gana ferocidad al inicio de tu turno, gana 1 adicional (3 adicionales a nivel 10, 5 a nivel 15).\n- Tu compañero obtiene competencia en tiradas de salvación de una característica de tu elección (otra a nivel 10 y 15).\n- Tu compañero obtiene competencia en una habilidad a elegir entre Acrobacias, Atletismo, Intimidación, Investigación (usa Sab), Percepción, Interpretación (usa Fue o Des), Juego de Manos, Sigilo o Supervivencia (otra a nivel 10 y 15).",
      n: 5
    },
    {
      nombre: "Ataque Distintivo Mejorado",
      t: "pasiva",
      texto: "Cuando tu compañero impacta con su ataque distintivo, inflige 1 dado de daño adicional del arma (2 dados a nivel 11, 3 a nivel 17).\nAdemás, el daño de los ataques y acciones de ferocidad de tu compañero se consideran mágicos para superar resistencias e inmunidades.",
      n: 5
    },
    {
      nombre: "Compañero Fiel",
      t: "pasiva",
      texto: "Ya no necesitas usar tu acción adicional para darle órdenes a tu compañero. Mientras no estés incapacitado, puedes dirigirlo sin requerir ninguna acción.\nAdemás, cuando entra en frenesí y no estás incapacitado (y él puede verte o escucharte), tú eliges hacia dónde se mueve y a quién ataca en lugar de que lo haga al azar o al más cercano.",
      n: 6
    },
    {
      nombre: "Ferocidad Rejuvenecedora",
      t: "adicional",
      texto: "Puedes usar una acción adicional para gastar cualquier cantidad de ferocidad de tu compañero; este recupera tantos puntos de golpe como la ferocidad gastada. Usos: modificador de Sabiduría por descanso largo.",
      n: 6,
      usos: "Sab",
      reset: "largo"
    },
    {
      nombre: "Golpe Primigenio",
      t: "pasiva",
      texto: "Una vez en cada uno de tus turnos, cuando impactas a una criatura con un ataque de arma, puedes hacer que reciba 1d8 de daño adicional de un tipo elegido entre ácido, frío, fuego, relámpago, veneno o trueno (eliges el tipo al obtener el rasgo y puedes cambiarlo al subir de nivel en la clase).\nA nivel 14, el daño aumenta a 2d8.",
      n: 8
    },
    {
      nombre: "Conexión Mística",
      t: "adicional",
      texto: "Ganas un talento basado en tu tipo de compañero. (Por ejemplo, volar, piel de piedra, respirar bajo el agua, etc.). Ver reglas completas según el monstruo elegido.",
      n: 9
    },
    {
      nombre: "Leal hasta el final",
      t: "pasiva",
      texto: "Ni tú ni tu compañero pueden ser asustados o hechizados.",
      n: 13
    },
    {
      nombre: "Sentidos Agudos",
      t: "adicional",
      texto: "Tienes ventaja en las pruebas de Sabiduría (Percepción) que dependan del oído, la vista o el olfato. Además, puedes usar la acción de Buscar como acción adicional.",
      n: 14
    },
    {
      nombre: "Invocar a la Naturaleza",
      t: "accion",
      texto: "Llamas a una horda de criaturas que ocupa un cubo de 30 pies a 120 pies de ti, durante 1 minuto. Puedes mover el enjambre 30 pies como acción adicional. Los enemigos que inicien su turno ahí deben superar una salvación de Sabiduría (contra tu CD de proezas) o tener desventaja en tiradas de ataque, salvación y pruebas de característica, y un -5 a su Percepción pasiva, hasta el inicio de su próximo turno. 1 uso por descanso corto o largo.",
      n: 18,
      usos: 1,
      reset: "corto"
    },
    {
      nombre: "Amistad Inquebrantable",
      t: "pasiva",
      texto: "Mientras tengas al menos 1 punto de golpe y tu compañero te oiga/vea:\n- Superas automáticamente las pruebas de Trato con Animales para evitar que entre en frenesí.\n- Si tu compañero se reduce a 0 PG sin morir instantáneamente, se queda a 1 PG.\n- Al tirar iniciativa, tu compañero gana 1d10 de ferocidad.",
      n: 20
    }
  ]
};

export const subclasesBeastheart: Record<string, any> = {
  "ferocious-bond": {
    n: "Ferocious Bond",
    rasgos: [
      { nombre: "Carga Frenética", t: "reaccion", texto: "Cuando tu compañero entra en frenesí, puedes usar tu reacción para moverte tu velocidad y realizar un ataque con arma cuerpo a cuerpo al final del movimiento.", n: 3 },
      { nombre: "Furia del Sabio", t: "pasiva", texto: "Obtienes competencia en Intimidación. Además, tus pruebas de Carisma (Intimidación) reciben un bonificador igual a tu modificador de Sabiduría.", n: 3 },
      { nombre: "Frenesí Vigorizante", t: "pasiva", texto: "Cuando tu compañero termina su frenesí, su ferocidad se reduce a 4 en lugar de a 0.", n: 7 },
      { nombre: "Frenesí Furioso", t: "pasiva", texto: "Cuando tu compañero impacta a un enemigo con un ataque distintivo durante el frenesí, inflige daño adicional igual a su ferocidad total (en lugar de la mitad).\nAdemás, sus ataques a 5 pies de ti durante el frenesí tienen ventaja. Si atacas a un enemigo a 5 pies de tu compañero tras usar Carga Frenética, tienes ventaja.", n: 11 },
      { nombre: "Frenesí Vigorizado", t: "pasiva", texto: "Cuando tu compañero impacta durante el frenesí, o cuando tú impactas con el ataque de Carga Frenética, el objetivo queda cegado, ensordecido o asustado (tu elección) hasta el final de su siguiente turno.", n: 15 }
    ]
  },
  "hunter-bond": {
    n: "Hunter Bond",
    rasgos: [
      { nombre: "Presa Elegida", t: "gratis", texto: "Al inicio de tu turno, si tu compañero gana ferocidad y no entra en frenesí, puedes gastar 4 de ferocidad para marcar a una criatura a 90 pies por 1 minuto. Cuando tú o tu compañero le impactan con un arma o le hacen daño con una acción de ferocidad, recibe 1d6 de daño adicional.", n: 3 },
      { nombre: "Instintos de Cazador", t: "pasiva", texto: "Obtienes competencia y pericia en Supervivencia. Puedes usar Supervivencia en lugar de Perspicacia para leer intenciones o detectar mentiras.", n: 3 },
      { nombre: "Guarda Primigenia", t: "accion", texto: "Pones una trampa invisible en el suelo en un área de 10x10 pies a 30 pies de ti (dura 8h). Si una criatura entra, debe hacer una salvación de Constitución (CD de tus proezas); si falla, recibe 4d8 de daño de fuerza y queda cegada por 1 minuto (mitad de daño y no se ciega si supera). Recibes una alarma mental si estás a 1 milla. Usos: mod de Sabiduría por descanso largo.", n: 7, usos: "Sab", reset: "largo" },
      { nombre: "Sigilo Sincronizado", t: "reaccion", texto: "Cuando tú o tu compañero usan la acción de Esconderse, el otro puede usar su reacción para Esconderse también. Además, tienes ventaja al esconderte si estás a 5 pies de él.", n: 11 },
      { nombre: "Cazadores Invisibles", t: "accion", texto: "Tú y tu compañero se vuelven invisibles durante 10 minutos y no pueden ser rastreados mágicamente. Cualquiera puede terminarlo en sí mismo como acción adicional. 1 uso por descanso largo.", n: 15, usos: 1, reset: "largo" }
    ]
  },
  "infernal-bond": {
    n: "Infernal Bond",
    rasgos: [
      { nombre: "Entendimiento Infernal", t: "pasiva", texto: "Hablas, lees y escribes Infernal. Además, obtienes competencia en Arcano o Religión.", n: 3 },
      { nombre: "Proezas Infernales", t: "pasiva", texto: "Ganas una Proeza Infernal de nivel 3. A nivel 11 ganas otra. Puedes intercambiarlas al subir de nivel.", n: 3 },
      { nombre: "Encantador del Infierno", t: "accion", texto: "Tu compañero usa magia de encantamiento. Una criatura a 30 pies que pueda verlos debe hacer una salvación de Sabiduría (con ventaja si están peleando). Si falla, queda hechizada por ti y tu compañero durante 10 minutos. Al terminar, no recuerda haber estado hechizada. Usos: mod de Sabiduría por descanso largo.", n: 7, usos: "Sab", reset: "largo" },
      { nombre: "Rasgos Demoníacos", t: "pasiva", texto: "Tu compañero se vuelve infernal. Eliges un rasgo: Piel con púas (hace 1d10 de daño al ser atacado o agarrado a 5 pies), Inmunidades (inmune a fuego, veneno y condición envenenado), Armas de Fuego (su ataque distintivo hace 1d6 de daño de fuego extra), o Alas (velocidad de vuelo de 40 pies). Puedes cambiarlo cada descanso largo.", n: 11 },
      { nombre: "Forma Infernal", t: "adicional", texto: "Gastas 6 de ferocidad para transformar a tu compañero en infernal por 1 minuto: Es un Corcel infernal, gana resistencia al daño contundente, perforante y cortante, y ventaja en salvaciones contra hechizos mágicos.", n: 15 }
    ]
  },
  "primordial-bond": {
    n: "Primordial Bond",
    rasgos: [
      { nombre: "Proezas de Naturaleza", t: "pasiva", texto: "Obtienes una Proeza de Naturaleza. A nivel 11 ganas otra. Puedes intercambiarlas al subir de nivel.", n: 3 },
      { nombre: "Entendimiento Primordial", t: "pasiva", texto: "Hablas, lees y escribes Primordial y Silvano. Además ganas competencia en Naturaleza.", n: 3 },
      { nombre: "Tierra Aliada", t: "pasiva", texto: "El suelo a 10 pies de tu compañero es terreno difícil para sus enemigos, siempre que tenga al menos 1 de ferocidad.", n: 7 },
      { nombre: "Estampida de Espíritus", t: "pasiva", texto: "Cuando tu compañero entra en frenesí, cada criatura de tu elección a 30 pies del compañero recibe daño de fuerza igual a la ferocidad de este.", n: 11 },
      { nombre: "Clima Aliado", t: "pasiva", texto: "Si tu compañero tiene al menos 1 de ferocidad y es impactado por un ataque a 5 pies, el atacante debe superar una salvación de Fuerza (o caer derribado) o una salvación de Destreza (o recibir daño de relámpago igual a la ferocidad de tu compañero).", n: 15 }
    ]
  },
  "protector-bond": {
    n: "Protector Bond",
    rasgos: [
      { nombre: "Vitalidad de Bestia", t: "pasiva", texto: "Tu máximo de puntos de golpe aumenta en 3, y aumenta en 1 cada vez que subes un nivel en esta clase.", n: 3 },
      { nombre: "Falange de Manada", t: "pasiva", texto: "Cuando tú y tu compañero no están incapacitados y ambos están a 5 pies de una criatura, esa criatura tiene desventaja en tiradas de ataque contra cualquier objetivo que no sean tú o tu compañero.", n: 3 },
      { nombre: "Piel Engrosada", t: "pasiva", texto: "La CA de tu compañero aumenta en +2.", n: 7 },
      { nombre: "Compañero Centinela", t: "reaccion", texto: "Cuando una criatura a 5 pies de tu compañero ataca a alguien que no sean ustedes dos, puedes gastar 2 de ferocidad para que tu compañero use su reacción y haga un ataque distintivo contra el atacante.", n: 11 },
      { nombre: "Protector Inmortal", t: "pasiva", texto: "Si puedes ver a tu compañero al caer a 0 PG, puedes gastar 2 de ferocidad para quedar a 1 PG. El coste aumenta en 2 cada vez que lo usas (se reinicia a 2 al completar un descanso corto o largo).", n: 15 }
    ]
  }
};

export const opcionesBeastheart: Record<string, string> = {
  "Proeza Primigenia: Aid Us, Friend (Ayúdanos, Amigo)": "[Niv. 2, 3 Ferocidad, Acción de Atacar]. Antes o después de tu ataque, tu compañero puede usar la acción de Ayudar como acción adicional.",
  "Proeza Primigenia: Bring Them Down (Derríbalos)": "[Niv. 2, 4 Ferocidad, Reacción]. Cuando tu compañero impacta con su ataque distintivo, el objetivo debe superar una salvación de Fuerza o caer derribado.",
  "Proeza Primigenia: Drag Them (Arrástralos)": "[Niv. 2, 4 Ferocidad, Reacción]. Cuando tu compañero impacta a un objetivo Grande o menor que está en el suelo, el objetivo debe hacer una salvación de Fuerza. Si falla, el compañero se mueve la mitad de su velocidad tirando del objetivo.",
  "Proeza Primigenia: Feral Reflexes (Reflejos Ferales)": "[Niv. 2, 2 Ferocidad, Reacción]. Cuando tú o tu compañero son atacados, aumentas en +2 la CA contra ese ataque.",
  "Proeza Primigenia: Hurricane Blow (Golpe de Huracán)": "[Niv. 2, 3 Ferocidad, Acción de Atacar]. El primer impacto de arma en tu turno empuja al objetivo hasta 10 pies lejos de ti.",
  "Proeza Primigenia: No Escape (Sin Escape)": "[Niv. 2, 1+ Ferocidad, Gratis]. Al inicio del turno, gasta hasta tu modificador de Sabiduría en ferocidad. Tu velocidad o la de tu compañero aumenta en 5 pies por cada punto gastado hasta el inicio de tu próximo turno.",
  "Proeza Primigenia: Primal Pounce (Abalanzamiento Primigenio)": "[Niv. 2, 3 Ferocidad, Reacción]. Cuando tu compañero impacta, el objetivo debe fallar una salvación de Destreza o quedar agarrado [Grappled].",
  "Proeza Primigenia: Quick Hide (Esconderse Rápido)": "[Niv. 2, 2 Ferocidad, Acción de Atacar]. Tras tu primer impacto, tu compañero puede usar Esconderse como reacción.",
  "Proeza Primigenia: Thrash (Zarandeo)": "[Niv. 2, 4 Ferocidad, Reacción]. Cuando tu compañero impacta a una criatura Grande o menor, el objetivo hace salvación de Sabiduría. Si falla, el objetivo tiene desventaja en sus ataques y los ataques contra él tienen ventaja hasta el inicio de tu próximo turno."
};

export const objetosMagicosBeastheart: Record<string, any> = {
  "Armor of the Caregiver": {
    nombre: "Armor of the Caregiver (Armadura del Cuidador)",
    rareza: "Rara",
    tipo: "Armadura (Ligera, Media o Pesada)",
    sintonia: true,
    texto: "Mientras llevas esta armadura tienes un +1 a la CA. Cuando recibes daño de tu compañero mientras este está en frenesí [Rampage], solo recibes la mitad del daño, y el próximo ataque que hagas antes del final de tu siguiente turno inflige 2d6 de daño adicional si impacta."
  },
  "Badge of Battle": {
    nombre: "Badge of Battle (Insignia de Batalla)",
    rareza: "Poco común (+1), Rara (+2), o Muy rara (+3)",
    tipo: "Objeto maravilloso",
    sintonia: false,
    texto: "Llevarla otorga un bonificador a las tiradas de ataque y daño hechas con impactos desarmados y armas naturales. Los ataques se consideran mágicos."
  },
  "Badge of Ruin": {
    nombre: "Badge of Ruin (Insignia de Ruina)",
    rareza: "Poco común (+1), Rara (+2), o Muy rara (+3)",
    tipo: "Objeto maravilloso",
    sintonia: true,
    texto: "Brilla cuando tu compañero gana ferocidad en combate. Si el compañero está sintonizado, la CD de sus acciones de ferocidad aumenta según la rareza. Si tú estás sintonizado, la CD de tus proezas aumenta según la rareza."
  },
  "Companion Ball": {
    nombre: "Companion Ball (Bola de Compañero)",
    rareza: "Poco común",
    tipo: "Objeto maravilloso",
    sintonia: false,
    texto: "Mientras sostienes esta bola de hierro de 3 pulgadas y tu compañero está a 30 pies y no en frenesí, puedes usar una acción para decir la palabra de mando y transportarlo dentro a un espacio extradimensional cómodo. Allí no necesita comer ni beber, y puede hacer descansos. Solo alberga a uno. Como acción, dices la palabra y lo liberas a un espacio libre a 30 pies."
  }
};

export const companerosMascotas: Record<string, any> = {
  "basilisk-companion": {
    nombre: "Basilisk Companion (Compañero Basilisco)",
    tipo: "Monstruosidad Mediana, Sin alineamiento",
    ca: "15 + PB (armadura natural)",
    pg: "7 + (7 x nivel del cuidador)",
    dg: "1d8 por nivel del cuidador",
    vel: "30 pies",
    fue: 16, des: 10, con: 15, int: 5, sab: 12, car: 10,
    sv: "Con +2 + PB",
    habs: "Atletismo +3 + PB, Supervivencia +1 + PB",
    sentidos: "Visión en la oscuridad 60 pies, Percepción pasiva 11",
    rasgos: [
      { nombre: "Ataque Distintivo: Mordisco", t: "accion", texto: "Ataque de Arma Cuerpo a Cuerpo: +3 + PB a impactar, alcance 5 pies, un objetivo. Impacto: 1d6 + PB de daño perforante." },
      { nombre: "Nivel 1: Saliva Venenosa (2 Ferocidad)", t: "accion", texto: "El basilisco hace un ataque distintivo. Si impacta, inflige daño adicional igual a tu PB, y una criatura que el basilisco elija a 5 pies de él (distinta al objetivo) recibe daño de veneno igual a tu PB." },
      { nombre: "Nivel 3: Mirada Venenosa (5 Ferocidad)", t: "accion", texto: "Elige hasta tres criaturas que pueda ver a 15 pies. Cada una debe superar una salvación de Constitución CD 10 + PB o quedar envenenada hasta el inicio del siguiente turno del basilisco." },
      { nombre: "Nivel 5: Mirada Petrificante Menor (8 Ferocidad)", t: "accion", texto: "Elige una criatura a 30 pies, la cual debe hacer una salvación de Constitución CD 10 + PB. Si falla, empieza a convertirse en piedra y queda apresada. Debe repetir la salvación al final de su siguiente turno. Con éxito, el efecto termina. Si falla, queda petrificada por 1 hora o hasta ser curada por un Restablecimiento Menor." },
      { nombre: "Mirada Pesada", t: "reaccion", texto: "Cuando el cuidador impacta a una criatura que puede ver al basilisco, este puede obligarla a hacer una salvación de Constitución CD 10 + PB. Si falla, no puede hacer ataques de oportunidad y su velocidad se reduce en 10 pies hasta el inicio de su próximo turno." }
    ]
  },
  "blood-hawk-companion": {
    nombre: "Blood Hawk Companion (Compañero Halcón Sangriento)",
    tipo: "Bestia Pequeña, Sin alineamiento",
    ca: "13 + PB (armadura natural)",
    pg: "6 + (6 x nivel del cuidador)",
    dg: "1d8 por nivel del cuidador",
    vel: "10 pies, volar 60 pies",
    fue: 8, des: 16, con: 12, int: 5, sab: 14, car: 10,
    sv: "Des +3 + PB, Sab +2 + PB",
    habs: "Percepción +2 + PB",
    sentidos: "Percepción pasiva 12 + PB",
    rasgos: [
      { nombre: "Vista Aguda", t: "pasiva", texto: "Tiene ventaja en pruebas de Sabiduría (Percepción) que dependan de la vista." },
      { nombre: "Ataque Distintivo: Pico", t: "accion", texto: "Ataque de Arma Cuerpo a Cuerpo: +3 + PB a impactar, alcance 5 pies, un objetivo. Impacto: 1d6 + PB de daño perforante." },
      { nombre: "Nivel 1: Ataque Distractor (2 Ferocidad)", t: "accion", texto: "Hace un ataque distintivo. Si impacta, el próximo ataque contra ese objetivo antes del inicio del siguiente turno del halcón tiene ventaja." },
      { nombre: "Nivel 3: Ataque en Picado (5 Ferocidad)", t: "accion", texto: "Se mueve su velocidad sin provocar ataques de oportunidad. Durante o al final de este movimiento, hace un ataque distintivo. Si impacta, el objetivo debe superar una salvación de Fuerza CD 10 + PB o dejar caer un objeto que sostenga." },
      { nombre: "Nivel 5: Tormenta de Garras (8 Ferocidad)", t: "accion", texto: "Se mueve sin provocar ataques de oportunidad y elige a 1 objetivo a 5 pies que debe hacer una salvación de Destreza CD 10 + PB. Si falla, recibe PBd10 de daño cortante y queda cegado hasta el final del siguiente turno del halcón. Con éxito, recibe la mitad del daño y no es cegado." },
      { nombre: "Interponerse en Picado (1/Descanso Largo)", t: "reaccion", texto: "Si está a 30 pies de su cuidador y este es impactado por un ataque, el halcón puede moverse su velocidad sin provocar ataques de oportunidad. Si termina a 5 pies de él, el halcón recibe el ataque en su lugar y el daño se reduce a la mitad." }
    ]
  },
  "bulette-companion": {
    nombre: "Bulette Companion (Compañero Bulette)",
    tipo: "Monstruosidad Grande, Sin alineamiento",
    ca: "15 + PB (armadura natural)",
    pg: "7 + (7 x nivel del cuidador)",
    dg: "1d8 por nivel del cuidador",
    vel: "30 pies, excavar 30 pies",
    fue: 16, des: 10, con: 15, int: 5, sab: 8, car: 8,
    sv: "Con +2 + PB",
    habs: "Percepción -1 + PB",
    sentidos: "Visión en la oscuridad 60 pies, sentido de la vibración 30 pies, Percepción pasiva 9 + PB",
    rasgos: [
      { nombre: "Protección Acorazada", t: "pasiva", texto: "El cuidador puede montar al bulette mientras este excava sin sufrir daño ni asfixia." },
      { nombre: "Ataque Distintivo: Mordisco", t: "accion", texto: "Ataque de Arma Cuerpo a Cuerpo: +3 + PB a impactar, alcance 5 pies, un objetivo. Impacto: 1d6 + PB de daño perforante." },
      { nombre: "Nivel 1: Ataque Violento (2 Ferocidad)", t: "accion", texto: "Hace un ataque distintivo. Si impacta, inflige PB daño adicional y el bulette puede mover al objetivo 5 pies en cualquier dirección." },
      { nombre: "Nivel 3: Zancadilla Subterránea (5 Ferocidad)", t: "accion", texto: "Mueve la mitad de su velocidad de excavación sin provocar ataques de oportunidad. Cada criatura en el suelo por debajo de la cual se mueva debe superar una salvación de Destreza CD 10 + PB o caer derribada." },
      { nombre: "Nivel 5: Salto Mortal (8 Ferocidad)", t: "accion", texto: "Salta hasta 30 pies. Si cae en un espacio con criaturas, cada una debe hacer una salvación de Fuerza CD 10 + PB. Si falla, recibe PBd6 de daño contundente y cae derribada. Con éxito, recibe la mitad del daño, no cae derribada y es empujada 5 pies fuera del espacio. Si no hay espacio, cae derribada en la casilla del bulette." }
    ]
  },
  "deinonychus-companion": {
    nombre: "Deinonychus Companion (Compañero Deinonychus)",
    tipo: "Bestia Mediana, Sin alineamiento",
    ca: "13 + PB (armadura natural)",
    pg: "7 + (7 x nivel del cuidador)",
    dg: "1d8 por nivel del cuidador",
    vel: "40 pies",
    fue: 15, des: 16, con: 14, int: 5, sab: 12, car: 8,
    sv: "Fue +2 + PB, Des +3 + PB",
    habs: "Percepción +1 + PB, Sigilo +3 + PB",
    sentidos: "Percepción pasiva 11 + PB",
    rasgos: [
      { nombre: "Ataque Distintivo: Mordisco", t: "accion", texto: "Ataque de Arma Cuerpo a Cuerpo: +3 + PB a impactar, alcance 5 pies, un objetivo. Impacto: 1d6 + PB de daño perforante." },
      { nombre: "Nivel 1: Ataque Abrumador (2 Ferocidad)", t: "accion", texto: "Hace un ataque distintivo. Si impacta, inflige PB de daño extra y el objetivo no puede tomar reacciones hasta el inicio del siguiente turno del deinonychus." },
      { nombre: "Nivel 3: Chica Lista (5 Ferocidad)", t: "accion", texto: "Toma la acción de Esconderse y luego hace un ataque distintivo, o viceversa. Si impacta, derriba al objetivo. Puede moverse entre la acción y el ataque sin negar el intento de sigilo." },
      { nombre: "Nivel 5: Manténlos a Raya (8 Ferocidad)", t: "accion", texto: "Salta a una criatura a 5 pies, la cual hace una salvación de Destreza CD 10 + PB. Si falla, recibe PBd12 de daño cortante, cae derribada y queda agarrada (Escape CD 10 + PB). La criatura derribada no puede levantarse hasta dejar de estar agarrada. El agarre termina si ataca o usa este rasgo contra otro objetivo." },
      { nombre: "Parte de la Manada (1/Descanso Largo)", t: "adicional", texto: "Si su cuidador a 5 pies está hechizado, asustado o aturdido, el deinonychus puede terminar una de esas condiciones en él." }
    ]
  },
  "dragon-wyrmling-companion": {
    nombre: "Dragon Wyrmling Companion (Compañero Cría de Dragón)",
    tipo: "Dragón Mediano, Sin alineamiento",
    ca: "15 + PB (armadura natural)",
    pg: "7 + (7 x nivel del cuidador)",
    dg: "1d8 por nivel del cuidador",
    vel: "30 pies, volar 30 pies",
    fue: 16, des: 10, con: 15, int: 5, sab: 10, car: 12,
    sv: "Sab +0 + PB",
    habs: "Percepción +0 + PB",
    sentidos: "Visión en la oscuridad 60 pies, Percepción pasiva 10 + PB",
    rasgos: [
      { nombre: "Linaje Dracónico", t: "pasiva", texto: "Elige su linaje: Negro/Cobre (Ácido, Línea 5x30, Salv. Des), Plata/Blanco (Frío, Cono 15, Salv. Con), Oropel (Fuego, Línea 5x30, Salv. Des), Oro/Rojo (Fuego, Cono 15, Salv. Des), Azul/Bronce (Relámpago, Línea 5x30, Salv. Des), Verde (Veneno, Cono 15, Salv. Con)." },
      { nombre: "Resistencia Compartida", t: "pasiva", texto: "El cuidador tiene resistencia al tipo de daño del linaje y no recibe daño del Aliento de Dragón del compañero." },
      { nombre: "Ataque Distintivo: Mordisco", t: "accion", texto: "Ataque de Arma Cuerpo a Cuerpo: +3 + PB a impactar, alcance 5 pies, un objetivo. Impacto: 1d6 + PB de daño perforante." },
      { nombre: "Nivel 1: Aliento Escupido (2 Ferocidad)", t: "accion", texto: "Ataque distintivo pero a distancia (30/60 pies). Si impacta, inflige PB de daño extra y todo el daño del ataque es del tipo del linaje." },
      { nombre: "Nivel 3: Presencia Pavorosa (5 Ferocidad)", t: "accion", texto: "Criaturas elegidas a 10 pies hacen salvación de Sabiduría CD 10 + PB o quedan asustadas por 1 min. Repiten salvación al final de sus turnos. Inmunidad 24h tras éxito." },
      { nombre: "Nivel 5: Aliento de Dragón (8 Ferocidad)", t: "accion", texto: "Exhala energía en el área de su linaje. Salvación CD 10 + PB. Falla: PBd6 daño del linaje. Éxito: Mitad de daño." }
    ]
  },
  "earth-elemental-companion": {
    nombre: "Earth Elemental Companion (Compañero Elemental de Tierra)",
    tipo: "Elemental Grande, Sin alineamiento",
    ca: "15 + PB (armadura natural)",
    pg: "7 + (7 x nivel del cuidador)",
    dg: "1d8 por nivel del cuidador",
    vel: "30 pies, excavar 30 pies",
    fue: 16, des: 8, con: 15, int: 5, sab: 10, car: 8,
    sv: "Con +2 + PB",
    habs: "Atletismo +3 + PB",
    sentidos: "Visión en la oscuridad 60 pies, sentido de la vibración 30 pies, Percepción pasiva 10",
    rasgos: [
      { nombre: "Inmunidades", t: "pasiva", texto: "Inmune a daño de veneno. Inmune a las condiciones petrificado y envenenado." },
      { nombre: "Deslizamiento Terrestre", t: "pasiva", texto: "Excava por tierra/roca no trabajada sin perturbar el entorno. No se puede montar mientras hace esto." },
      { nombre: "Ataque Distintivo: Golpe", t: "accion", texto: "Ataque de Arma Cuerpo a Cuerpo: +3 + PB a impactar, alcance 5 pies, un objetivo. Impacto: 1d6 + PB de daño contundente." },
      { nombre: "Nivel 1: Ataque Extensible (2 Ferocidad)", t: "accion", texto: "Hace un ataque distintivo con alcance de 10 pies. Si impacta, inflige PB de daño extra y atrae al objetivo 5 pies." },
      { nombre: "Nivel 3: Sacudida de Tierra (5 Ferocidad)", t: "accion", texto: "Golpea el suelo. Criaturas a 10 pies deben superar salvación de Destreza CD 10 + PB o caer derribadas. Su cuidador la supera automáticamente." },
      { nombre: "Nivel 5: Transmutar Suelo (8 Ferocidad)", t: "accion", texto: "Área de 10x10 pies a 30 pies. Criaturas ahí hacen salvación de Fuerza CD 10 + PB. Si fallan, se hunden y quedan apresadas. Pueden liberarse con una acción haciendo prueba de Fuerza (Atletismo) CD 10 + PB." },
      { nombre: "Arrójame", t: "adicional", texto: "Si su cuidador está a 5 pies, lo arroja 5 x PB pies en cualquier dirección. El cuidador puede negar cualquier daño de caída con una salvación de Destreza CD 15." }
    ]
  },
  "gelatinous-cube-companion": {
    nombre: "Gelatinous Cube Companion (Compañero Cubo Gelatinoso)",
    tipo: "Limo Grande, Sin alineamiento",
    ca: "11 + PB (armadura natural)",
    pg: "8 + (8 x nivel del cuidador)",
    dg: "1d8 por nivel del cuidador",
    vel: "30 pies",
    fue: 16, des: 8, con: 16, int: 5, sab: 10, car: 8,
    sv: "Con +3 + PB",
    habs: "Sigilo -1 + PB",
    sentidos: "Vista ciega 60 pies (ciego más allá de este radio), Percepción pasiva 10",
    rasgos: [
      { nombre: "Inmunidades", t: "pasiva", texto: "Inmune a daño de ácido. Inmune a condiciones: cegado, ensordecido, derribado." },
      { nombre: "Forma Fluida", t: "pasiva", texto: "El cuidador puede entrar a su espacio sin ser engullido y puede atacar a criaturas engullidas sin dañar al cubo." },
      { nombre: "Transparente", t: "pasiva", texto: "Requiere prueba de Sabiduría (Percepción) CD 10 + PB para detectarlo si no se ha movido o atacado. Si alguien entra sin saberlo, recibe 3 (1d6) de daño de ácido y no avanza." },
      { nombre: "Ataque Distintivo: Pseudópodo", t: "accion", texto: "Ataque de Arma Cuerpo a Cuerpo: +3 + PB a impactar, alcance 5 pies, un objetivo. Impacto: 1d6 + PB de daño de ácido." },
      { nombre: "Nivel 1: Ácido Ardiente (2 Ferocidad)", t: "accion", texto: "Hace un ataque distintivo con alcance de 10 pies. Si impacta, inflige PB daño extra y el objetivo no puede recuperar PG hasta el inicio del próximo turno del cuidador." },
      { nombre: "Nivel 3: Lluvia de Limo (5 Ferocidad)", t: "accion", texto: "Gira velozmente. Criaturas a 5 pies hacen salvación de Destreza CD 10 + PB o reciben 1d6 de daño de ácido y su velocidad baja a 0 hasta el próximo turno del cubo. El cuidador supera automáticamente." },
      { nombre: "Nivel 5: Engullir (8 Ferocidad)", t: "accion", texto: "Intenta absorber criatura Grande o menor a 5 pies. Salvación de Destreza CD 10 + PB. Falla: recibe PBd6 de ácido, entra al cubo y queda Engullida. Éxito: mitad de daño, no se mueve. La criatura engullida está apresada, cegada, no respira, y recibe PBd6 de daño de ácido al inicio de turnos del cubo. Escape con acción de prueba de Fuerza CD 10 + PB." }
    ]
  },
  "giant-spider-companion": {
    nombre: "Giant Spider Companion (Compañero Araña Gigante)",
    tipo: "Bestia Grande, Sin alineamiento",
    ca: "13 + PB (armadura natural)",
    pg: "6 + (6 x nivel del cuidador)",
    dg: "1d8 por nivel del cuidador",
    vel: "30 pies, escalar 30 pies",
    fue: 15, des: 16, con: 12, int: 5, sab: 10, car: 8,
    sv: "Fue +2 + PB, Des +3 + PB",
    habs: "Sigilo +3 + PB",
    sentidos: "Visión en la oscuridad 60 pies, Percepción pasiva 10",
    rasgos: [
      { nombre: "Movimiento Arácnido", t: "pasiva", texto: "Trepar cual arácnido (escalar por techos y terreno difícil). Sentido de telaraña e inmunidad a la restricción de telarañas." },
      { nombre: "Ataque Distintivo: Mordisco", t: "accion", texto: "Ataque de Arma Cuerpo a Cuerpo: +3 + PB a impactar, alcance 5 pies, un objetivo. Impacto: 1d6 + PB de daño perforante." },
      { nombre: "Nivel 1: Ataque Desestabilizador (2 Ferocidad)", t: "accion", texto: "Hace un ataque distintivo. Si impacta, el objetivo tiene desventaja en su próxima tirada de ataque antes del inicio del siguiente turno de la araña." },
      { nombre: "Nivel 3: Telaraña (5 Ferocidad)", t: "accion", texto: "Dispara telaraña a 60 pies. El objetivo hace salvación de Destreza CD 10 + PB o queda apresado. Puede usar su acción para liberarse con prueba de Fuerza CD 10 + PB." },
      { nombre: "Nivel 5: Frenesí de Mordiscos (8 Ferocidad)", t: "accion", texto: "Hace ataques distintivos contra una cantidad de criaturas igual a PB a 5 pies de ella. Impacto: quedan envenenadas hasta el final de su siguiente turno." },
      { nombre: "Material Pegajoso (1/Descanso Largo)", t: "adicional", texto: "Cubre los pies de su cuidador a 5 pies con adhesivo. Por 10 minutos gana velocidad de escalada igual a su caminata y puede andar por paredes y techos dejando sus manos libres." }
    ]
  },
  "giant-toad-companion": {
    nombre: "Giant Toad Companion (Compañero Sapo Gigante)",
    tipo: "Bestia Grande, Sin alineamiento",
    ca: "13 + PB (armadura natural)",
    pg: "7 + (7 x nivel del cuidador)",
    dg: "1d8 por nivel del cuidador",
    vel: "30 pies, nadar 30 pies",
    fue: 16, des: 12, con: 15, int: 5, sab: 10, car: 10,
    sv: "Fue +3 + PB, Con +2 + PB",
    habs: "Atletismo +3 + PB, Percepción +0 + PB",
    sentidos: "Visión en la oscuridad 30 pies, Percepción pasiva 10 + PB",
    rasgos: [
      { nombre: "Anfibio y Salto", t: "pasiva", texto: "Puede respirar agua o aire. Salta hasta 20 pies de largo y 10 de alto con o sin carrerilla." },
      { nombre: "Ataque Distintivo: Mordisco", t: "accion", texto: "Ataque de Arma Cuerpo a Cuerpo: +3 + PB a impactar, alcance 5 pies, un objetivo. Impacto: 1d6 + PB de daño contundente." },
      { nombre: "Nivel 1: Ataque Extensible (2 Ferocidad)", t: "accion", texto: "Usa su lengua para atacar con 10 pies de alcance. Si impacta, hace PB de daño extra y atrae al objetivo 5 pies hacia él." },
      { nombre: "Nivel 3: Comida Rápida (5 Ferocidad)", t: "accion", texto: "Hace un ataque distintivo. Si impacta, el sapo salta hasta 20 pies sin provocar ataques de oportunidad y si el objetivo es Grande o menor, se lo lleva consigo." },
      { nombre: "Nivel 5: Tragar (8 Ferocidad)", t: "accion", texto: "Intenta tragar criatura Mediana o menor a 5 pies. Salvación de Destreza CD 10 + PB. Falla: PBd6 contundente y es Tragado. Tragado: cegado, apresado, cobertura total, y recibe PBd6 ácido al inicio de los turnos del sapo. Si el sapo recibe daño, debe hacer una salvación de Constitución (CD 10 o la mitad del daño) o regurgita a la criatura y esta cae derribada." },
      { nombre: "Piel Psicodélica (1/Descanso Largo)", t: "adicional", texto: "Cubre con toxinas el arma del cuidador a 5 pies por 1 hora. Quien reciba daño con esa arma hace salvación de Constitución CD 10 + PB o queda envenenado por 1 min (repite salvación al final de su turno)." }
    ]
  },
  "giant-weasel-companion": {
    nombre: "Giant Weasel Companion (Compañero Comadreja Gigante)",
    tipo: "Bestia Mediana, Sin alineamiento",
    ca: "13 + PB (armadura natural)",
    pg: "7 + (7 x nivel del cuidador)",
    dg: "1d8 por nivel del cuidador",
    vel: "40 pies",
    fue: 12, des: 16, con: 14, int: 5, sab: 12, car: 10,
    sv: "Fue +1 + PB, Des +3 + PB",
    habs: "Acrobacias +3 + PB, Percepción +1 + PB, Sigilo +3 + PB",
    sentidos: "Visión en la oscuridad 60 pies, Percepción pasiva 11 + PB",
    rasgos: [
      { nombre: "Olfato, Oído y Tesoro", t: "pasiva", texto: "Ventaja en Percepción de oído y olfato. Percibe el olor de metales preciosos y gemas a 10 pies." },
      { nombre: "Ataque Distintivo: Mordisco", t: "accion", texto: "Ataque de Arma Cuerpo a Cuerpo: +3 + PB a impactar, alcance 5 pies, un objetivo. Impacto: 1d6 + PB de daño perforante." },
      { nombre: "Nivel 1: Ataque Abrumador (2 Ferocidad)", t: "accion", texto: "Hace un ataque distintivo. Si impacta, hace PB de daño extra y el objetivo no puede usar reacciones hasta el inicio del próximo turno de la comadreja." },
      { nombre: "Nivel 3: Asegurar Bocado (5 Ferocidad)", t: "accion", texto: "Hace un ataque distintivo. Si impacta, el objetivo queda agarrado (Escape CD 10 + PB). Mientras está agarrado, está apresado y la comadreja no puede morder a otro." },
      { nombre: "Nivel 5: Frenesí de Mordiscos (8 Ferocidad)", t: "accion", texto: "Hace ataques distintivos contra una cantidad de criaturas a 5 pies igual a PB. Si impacta, la criatura es derribada." }
    ]
  },
  "hell-hound-companion": {
    nombre: "Hell Hound Companion (Compañero Sabueso Infernal)",
    tipo: "Infernal Mediano, Sin alineamiento",
    ca: "13 + PB (armadura natural)",
    pg: "7 + (7 x nivel del cuidador)",
    dg: "1d8 por nivel del cuidador",
    vel: "50 pies",
    fue: 16, des: 12, con: 14, int: 6, sab: 12, car: 8,
    sv: "Con +2 + PB",
    habs: "Percepción +1 + PB",
    sentidos: "Visión en la oscuridad 60 pies, Percepción pasiva 11 + PB",
    rasgos: [
      { nombre: "Inmunidades y Sentidos", t: "pasiva", texto: "Inmune a daño de fuego. Ventaja en Percepción basada en oído u olfato." },
      { nombre: "Consultar al Infierno (1/Descanso Largo)", t: "pasiva", texto: "El cuidador le pregunta sobre el resultado de un curso de acción en los próximos 30 minutos. Tras 1 minuto, el sabueso ladra: 1 ladrido=buenos resultados, 2=malos, 3=ambos, 0=nada en particular." },
      { nombre: "Ataque Distintivo: Mordisco", t: "accion", texto: "Ataque de Arma Cuerpo a Cuerpo: +3 + PB a impactar, alcance 5 pies, un objetivo. Impacto: 1d6 + PB de daño perforante." },
      { nombre: "Nivel 1: Saliva de Lava (2 Ferocidad)", t: "accion", texto: "Hace un ataque distintivo. Si impacta, inflige PB de daño extra y otra criatura a 5 pies recibe daño de fuego igual a PB." },
      { nombre: "Nivel 3: Carga Brutal (5 Ferocidad)", t: "accion", texto: "Se mueve su velocidad sin provocar ataques de oportunidad y hace su ataque distintivo durante o al final del movimiento." },
      { nombre: "Nivel 5: Aliento de Fuego (8 Ferocidad)", t: "accion", texto: "Exhala fuego en un cono de 15 pies. Salvación de Destreza CD 10 + PB o reciben PBd6 de fuego (la mitad si tienen éxito)." }
    ]
  },
  "mimic-companion": {
    nombre: "Mimic Companion (Compañero Mímico)",
    tipo: "Monstruosidad Mediana (Cambiaformas), Sin alineamiento",
    ca: "13 + PB (armadura natural)",
    pg: "7 + (7 x nivel del cuidador)",
    dg: "1d8 por nivel del cuidador",
    vel: "30 pies",
    fue: 16, des: 12, con: 15, int: 5, sab: 12, car: 8,
    sv: "Des +1 + PB",
    habs: "Sigilo +1 + PB",
    sentidos: "Visión en la oscuridad 60 pies, Percepción pasiva 11",
    rasgos: [
      { nombre: "Inmunidades y Cambiaformas", t: "pasiva", texto: "Inmune a daño de ácido y condición derribado. Como acción se transforma en un objeto o su verdadera forma. En forma de objeto, es indistinguible (Falsa Apariencia)." },
      { nombre: "Ataque Distintivo: Mordisco", t: "accion", texto: "Ataque de Arma Cuerpo a Cuerpo: +3 + PB a impactar, alcance 5 pies, un objetivo. Impacto: 1d6 + PB de daño perforante." },
      { nombre: "Nivel 1: Ataque Distractor (2 Ferocidad)", t: "accion", texto: "Hace un ataque distintivo. Si impacta, el próximo ataque contra el objetivo antes del inicio del turno del mímico tiene ventaja." },
      { nombre: "Nivel 3: Pseudópodos Adhesivos (5 Ferocidad)", t: "accion", texto: "Intenta tocar criaturas elegidas a 5 pies. Hacen salvación de Destreza CD 10 + PB o quedan agarradas (Escape CD 10 + PB)." },
      { nombre: "Nivel 5: Soy Tú (8 Ferocidad)", t: "accion", texto: "Se polimorfa en una criatura Grande o menor a 5 pies hasta su próximo turno. Le hace un ataque distintivo a esa criatura y la obliga a hacer una salvación de Sabiduría CD 10 + PB. Si falla, el objetivo tiene desventaja en ataques y salvaciones, y los ataques contra él tienen ventaja hasta el próximo turno del mímico." },
      { nombre: "Compañero Vestible", t: "adicional", texto: "Mientras esté a 5 pies, envuelve el cuerpo del cuidador como ropa. Le da ventaja en Sigilo y le permite cambiar su apariencia estética a voluntad. Todo ataque y daño que afecte al cuidador afecta a ambos por igual. Se lo quita revertiendo la forma (acción adicional)." }
    ]
  },
  "owlbear-companion": {
    nombre: "Owlbear Companion (Compañero Oso Lechuza)",
    tipo: "Monstruosidad Grande, Sin alineamiento",
    ca: "13 + PB (armadura natural)",
    pg: "7 + (7 x nivel del cuidador)",
    dg: "1d8 por nivel del cuidador",
    vel: "40 pies",
    fue: 16, des: 12, con: 15, int: 5, sab: 12, car: 10,
    sv: "Fue +3 + PB, Con +2 + PB",
    habs: "Atletismo +3 + PB, Percepción +1 + PB",
    sentidos: "Visión en la oscuridad 60 pies, Percepción pasiva 11 + PB",
    rasgos: [
      { nombre: "Vista y Olfato Agudos", t: "pasiva", texto: "Ventaja en pruebas de Sabiduría (Percepción) basadas en la vista o el olfato." },
      { nombre: "Ataque Distintivo: Garras", t: "accion", texto: "Ataque de Arma Cuerpo a Cuerpo: +3 + PB a impactar, alcance 5 pies, un objetivo. Impacto: 1d6 + PB de daño cortante." },
      { nombre: "Nivel 1: Ataque Violento (2 Ferocidad)", t: "accion", texto: "Hace un ataque distintivo. Si impacta, hace PB de daño extra y empuja al objetivo 5 pies en cualquier dirección." },
      { nombre: "Nivel 3: Owlie Oop (5 Ferocidad)", t: "accion", texto: "Salta hasta 20 pies sin provocar ataques de oportunidad. Al caer, criaturas a 5 pies hacen salvación de Fuerza CD 10 + PB o caen derribadas." },
      { nombre: "Nivel 5: Abrazo de Oso (8 Ferocidad)", t: "accion", texto: "Criatura a 5 pies hace salvación de Destreza CD 10 + PB. Falla: PBd10 contundente, queda agarrada y apresada (Escape CD 10 + PB). Éxito: Mitad de daño y no es agarrada." },
      { nombre: "Da un ululato (1/Descanso Largo)", t: "adicional", texto: "Emite un grito de batalla que otorga 5 x PB puntos de golpe temporales a su cuidador." }
    ]
  },
  "sporeling-companion": {
    nombre: "Sporeling Companion (Compañero Sporeling)",
    tipo: "Planta Pequeña, Sin alineamiento",
    ca: "13 + PB (armadura natural)",
    pg: "7 + (7 x nivel del cuidador)",
    dg: "1d8 por nivel del cuidador",
    vel: "30 pies",
    fue: 8, des: 16, con: 15, int: 5, sab: 12, car: 12,
    sv: "Con +2 + PB",
    habs: "Percepción +1 + PB",
    sentidos: "Visión en la oscuridad 60 pies, Percepción pasiva 11 + PB",
    rasgos: [
      { nombre: "Inmunidades y Falsa Apariencia", t: "pasiva", texto: "Inmune a daño de ácido y veneno, y a la condición envenenado. Mientras esté inmóvil, parece un hongo inofensivo." },
      { nombre: "Ataque Distintivo: Tos Corrupta", t: "accion", texto: "Ataque de Arma Cuerpo a Cuerpo: +3 + PB a impactar, alcance 5 pies, un objetivo. Impacto: 1d6 + PB de daño de ácido." },
      { nombre: "Nivel 1: Ataque Desestabilizador (2 Ferocidad)", t: "accion", texto: "Hace un ataque distintivo. Si impacta, el objetivo tiene desventaja en su próxima tirada de ataque antes del siguiente turno del Sporeling." },
      { nombre: "Nivel 3: Estallido de Esporas (5 Ferocidad)", t: "accion", texto: "Criaturas elegidas a 5 pies hacen salvación de Constitución CD 10 + PB o quedan envenenadas hasta el inicio del próximo turno del Sporeling." },
      { nombre: "Nivel 5: Esporas Alucinógenas (8 Ferocidad)", t: "accion", texto: "Enemigos a 10 pies hacen salvación de Sabiduría CD 10 + PB. Si fallan, el Sporeling decide si el objetivo usa su reacción para hacer un ataque cuerpo a cuerpo contra una criatura cercana al azar, o si cae derribado." },
      { nombre: "Esporas Vigorizantes (1/Descanso Largo)", t: "adicional", texto: "Si su cuidador está a 30 pies, este obtiene ventaja en todas sus tiradas de salvación por 1 minuto." }
    ]
  },
  "worg-companion": {
    nombre: "Worg Companion (Compañero Huargo)",
    tipo: "Monstruosidad Grande, Sin alineamiento",
    ca: "13 + PB (armadura natural)",
    pg: "7 + (7 x nivel del cuidador)",
    dg: "1d8 por nivel del cuidador",
    vel: "50 pies",
    fue: 16, des: 15, con: 14, int: 7, sab: 12, car: 10,
    sv: "Fue +3 + PB, Des +2 + PB",
    habs: "Percepción +1 + PB",
    sentidos: "Visión en la oscuridad 60 pies, Percepción pasiva 11 + PB",
    rasgos: [
      { nombre: "Moverse como uno", t: "pasiva", texto: "Mientras su cuidador lo esté montando, los ataques de oportunidad contra ambos tienen desventaja. Montar cuesta 5 pies de movimiento." },
      { nombre: "Ataque Distintivo: Mordisco", t: "accion", texto: "Ataque de Arma Cuerpo a Cuerpo: +3 + PB a impactar, alcance 5 pies, un objetivo. Impacto: 1d6 + PB de daño perforante." },
      { nombre: "Nivel 1: Ataque Abrumador (2 Ferocidad)", t: "accion", texto: "Hace un ataque distintivo. Si impacta, inflige PB de daño extra y el objetivo no puede tomar reacciones hasta el inicio del próximo turno del huargo." },
      { nombre: "Nivel 3: Carga Brutal (5 Ferocidad)", t: "accion", texto: "Mueve su velocidad sin provocar ataques de oportunidad y hace su ataque distintivo durante o al final del movimiento." },
      { nombre: "Nivel 5: Frenesí de Mordiscos (8 Ferocidad)", t: "accion", texto: "Hace ataques distintivos a una cantidad de criaturas a 5 pies igual a PB. Impacto: las criaturas caen derribadas." }
    ]
  }
};
```

=== B ===
```json
{
  "tablas": {
    "beastheart": {
      "Proezas Primigenias": [0, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 7, 7, 7, 7],
      "Mejora de Ataque Distintivo": ["-", "-", "-", "-", "1 dado", "1 dado", "1 dado", "1 dado", "1 dado", "1 dado", "2 dados", "2 dados", "2 dados", "2 dados", "2 dados", "2 dados", "3 dados", "3 dados", "3 dados", "3 dados"],
      "Golpe Primigenio": ["-", "-", "-", "-", "-", "-", "-", "1d8", "1d8", "1d8", "1d8", "1d8", "1d8", "2d8", "2d8", "2d8", "2d8", "2d8", "2d8", "2d8"]
    }
  },
  "usos": {
    "beastheart-ferocidad-rejuvenecedora": {
      "cantidad": "sab",
      "reinicio": "largo"
    },
    "beastheart-invocar-naturaleza": {
      "cantidad": 1,
      "reinicio": "corto"
    }
  },
  "opciones": {}
}
```

=== C ===
```json
{
  "beastheart": "Beastheart (MCDM)",
  "ferocious-bond": "Beastheart (MCDM)",
  "hunter-bond": "Beastheart (MCDM)",
  "infernal-bond": "Beastheart (MCDM)",
  "primordial-bond": "Beastheart (MCDM)",
  "protector-bond": "Beastheart (MCDM)",
  "basilisk-companion": "Beastheart Companion (MCDM)",
  "blood-hawk-companion": "Beastheart Companion (MCDM)",
  "bulette-companion": "Beastheart Companion (MCDM)",
  "deinonychus-companion": "Beastheart Companion (MCDM)",
  "dragon-wyrmling-companion": "Beastheart Companion (MCDM)",
  "earth-elemental-companion": "Beastheart Companion (MCDM)",
  "gelatinous-cube-companion": "Beastheart Companion (MCDM)",
  "giant-spider-companion": "Beastheart Companion (MCDM)",
  "giant-toad-companion": "Beastheart Companion (MCDM)",
  "giant-weasel-companion": "Beastheart Companion (MCDM)",
  "hell-hound-companion": "Beastheart Companion (MCDM)",
  "mimic-companion": "Beastheart Companion (MCDM)",
  "owlbear-companion": "Beastheart Companion (MCDM)",
  "sporeling-companion": "Beastheart Companion (MCDM)",
  "worg-companion": "Beastheart Companion (MCDM)"
}
```

=== D ===
```json
{
  "beastheart": "Un aventurero feroz que forma un vínculo místico y de supervivencia inquebrantable con una criatura salvaje o monstruosa.",
  "ferocious-bond": "Tu compañero y tú se dejan llevar por el instinto salvaje, desatando una furia brutal y sanguinaria en combate.",
  "hunter-bond": "Un dúo sigiloso que acecha a sus presas en silencio, coordinando emboscadas con trampas de fuerza y ataques a distancia.",
  "infernal-bond": "Canalizas el poder de los Nueve Infiernos a través de la furia de tu compañero, con fuego infernal, engaños y teletransporte.",
  "primordial-bond": "Tu vínculo con la naturaleza te permite controlar elementos primigenios y desatar el caos climático junto a tu compañero.",
  "protector-bond": "Para ustedes, la manada es lo primero. Usan tácticas defensivas formidables para protegerse mutuamente y al grupo.",
  "basilisk-companion": "Un reptil letal con una mirada tóxica y petrificante.",
  "blood-hawk-companion": "Un ave de presa voraz que protege los cielos e intercepta ataques.",
  "bulette-companion": "Una bestia de asalto blindada capaz de navegar la tierra cual escualo.",
  "deinonychus-companion": "Una astuta e implacable cazadora jurásica de emboscada rápida.",
  "dragon-wyrmling-companion": "Una cría elemental feroz armada con aliento dracónico devastador.",
  "earth-elemental-companion": "Un centinela rocoso con la tenacidad pura del plano de la tierra.",
  "gelatinous-cube-companion": "Un limo mortal sigiloso capaz de engullir y corroer por completo a sus presas.",
  "giant-spider-companion": "Una experta tejedora que embosca y ralentiza con veneno y telarañas.",
  "giant-toad-companion": "Un anfibio gigante psicodélico que salta grandes distancias para devorar a su presa entera.",
  "giant-weasel-companion": "Un roedor masivo ultra perceptivo con un poderoso agarre.",
  "hell-hound-companion": "Un sabueso infernal ignífugo capaz de escupir magma ardiente.",
  "mimic-companion": "Una monstruosidad cambiaformas que puede engañar el entorno o blindar a su dueño.",
  "owlbear-companion": "Una bestia indomable con la ferocidad de un oso y las garras de un ave gigante.",
  "sporeling-companion": "Una criatura fúngica caminante dotada de toxinas paralizantes y alucinógenas.",
  "worg-companion": "Un enorme cánido salvaje que se mimetiza con su jinete para cargas letales."
}
```
