=== A ===

```
export const INVESTIGATOR_SUBCLASES: Record<string, { n: string; rasgos: any[] }> = {
  "antiquarian": {
    n: "Anticuario (Antiquarian)",
    rasgos: [
      {
        nombre: "Acumulador de Artefactos (Artifact Hoarder)",
        t: "pasiva",
        texto: "Ganas un uso adicional de tus Amuletos antes de un descanso largo.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Amuletos (Trinkets)",
        t: "pasiva",
        texto: "Puedes usar los siguientes amuletos.\n- **Punta de Flecha Odiosa (Hateful Arrowhead).** Puedes lanzar el conjuro *Rayo de debilitamiento* o *Rayo abrasador* sin usar un espacio de conjuro ni componentes.\n- **Prisma Deformado (Warped Prism).** Puedes lanzar *Contorno borroso* o *Escudo* sin usar un espacio de conjuro ni componentes.\n- **Vendas de Dientes de Navaja (Razortooth Bandages).** Puedes lanzar *Curar heridas* o *Infligir heridas* sin usar un espacio de conjuro ni componentes. Cuando restauras Puntos de Golpe o infliges daño usando uno de estos conjuros con este amuleto, puedes sumar tu nivel de Investigator a la curación o al daño infligido.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Reliquias Arcanas (Arcane Relics)",
        t: "pasiva",
        texto: "Has asegurado un puñado de reliquias de valor incalculable con encantamientos raros y delicados. Una vez que usas una de las siguientes reliquias, no puedes volver a usar este rasgo hasta que termines un descanso corto o largo.\n- **Dinamo Antediluviana (Antediluvian Dynamo).** Puedes lanzar *Bola de fuego* o *Relámpago* sin usar un espacio de conjuro ni componentes.\n- **Máscara Mortuoria de Liche (Lich’s Deathmask).** Puedes lanzar *Contraconjuro* o *Disipar magia* sin usar un espacio de conjuro ni componentes.\n- **Espiral Mortal (Mortal Coil).** Puedes lanzar *Animar a los muertos* o *Revivir* sin usar un espacio de conjuro ni componentes. Cuando lanzas *Animar a los muertos* usando esta reliquia, todos los Muertos Vivientes creados previamente usando esta reliquia se desmoronan y se convierten en polvo.",
        n: 6,
        usos: 1,
        reset: "corto"
      },
      {
        nombre: "Colección de Objetos Mágicos (Magic Item Collection)",
        t: "pasiva",
        texto: "Cuando terminas un descanso largo, puedes producir mágicamente un objeto mágico. Cuando lo haces, todos los objetos mágicos creados previamente por este rasgo se desvanecen. Si un objeto mágico que produces requiere sintonización, puedes sintonizarte con él en el instante en que lo produces. Puedes producir los siguientes objetos mágicos: una *Alfombra voladora*, una *Capa del murciélago*, una *Lengua de fuego*, unos *Guanteletes de fuerza de ogro*, una *Fortaleza instantánea*, un *Anillo de regeneración*, un *Anillo de telequinesia*, una *Hoja solar* o una *Varita de las maravillas*.",
        n: 10,
        usos: 1,
        reset: "largo"
      },
      {
        nombre: "Tarro de Almas (Soul Jar)",
        t: "pasiva",
        texto: "Has asegurado la joya de la corona de tu colección: el tarro de almas de un liche o \"filacteria\". Aunque el alma del propietario original ha sido expulsada de este artefacto maldito, conserva muchas de sus propiedades mágicas.\nEste objeto mágico está siempre sintonizado contigo y no cuenta para tu número total de objetos mágicos sintonizados. Tiene 5 cargas y recupera 1d4 + 1 cargas gastadas diariamente al amanecer. Mientras llevas puesto el tarro de almas, puedes gastar una o más cargas para usar las siguientes habilidades:\n- **Puntos de Golpe temporales.** Puedes gastar 1 carga como acción adicional para ganar Puntos de Golpe temporales iguales a tu nivel de Investigator.\n- **Recarga de Amuleto.** Puedes gastar 1 carga como acción adicional para recuperar un uso gastado de tus Amuletos.\n- **Fortaleza de Muerto Viviente.** Cuando te reducen a 0 Puntos de Golpe y no mueres en el acto, puedes gastar 2 cargas para quedarte con 1 Punto de Golpe en su lugar (sin acción requerida). Solo puedes usar este beneficio una vez por turno.\n- **Toque Drenante.** Como acción Mágica, puedes gastar 3 cargas para realizar un ataque de conjuro cuerpo a cuerpo. Si impactas, el objetivo recibe 8d8 de daño Necrótico y tú recuperas Puntos de Golpe iguales al daño Necrótico infligido. Si el ataque de conjuro falla, estas cargas no se gastan.",
        n: 14,
        usos: 5,
        reset: "largo"
      }
    ]
  },
  "archivist": {
    n: "Archivista (Archivist)",
    rasgos: [
      {
        nombre: "Amuletos (Trinkets)",
        t: "pasiva",
        texto: "Puedes usar los siguientes amuletos.\n- **Lentes de Aura (Aura Lenses).** Puedes lanzar *Detectar magia* sin usar un espacio de conjuro ni componentes.\n- **Escritura Mnemotécnica (Mnemonic Script).** Puedes lanzar *Memorizar (Memorize)* sin usar un espacio de conjuro ni componentes.\n- **Piedra de Lenguas (Tongue Stone).** Puedes lanzar *Comprensión idiomática* sin usar un espacio de conjuro ni componentes.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Tesis (Thesis)",
        t: "pasiva",
        texto: "Obtienes acceso a ciertos conjuros asociados con tu tesis. Elige una de las siguientes áreas temáticas para tu tesis: Corpus, Mentis, Mortis u Oculus. Consulta la tabla correspondiente a la tesis elegida; añades los conjuros listados para tu nivel de Investigator a tu grimorio de forma gratuita. Los conjuros listados cuentan como conjuros de Investigator para ti y los tratas como si tuvieran la etiqueta de Ritual.\nCada vez que ganas un nivel de Investigator, puedes reemplazar tu tesis por otra. Los conjuros en tu grimorio correspondientes a tu tesis son reemplazados mágicamente por los de la nueva tesis para tu nivel de Investigator.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Conjuro Erudito (Erudite Spell)",
        t: "pasiva",
        texto: "Cuando lanzas un conjuro que obliga a una criatura a hacer una tirada de salvación, puedes darle a un objetivo del conjuro Desventaja en las salvaciones contra el conjuro.\nUna vez que usas este rasgo, no puedes volver a usarlo hasta que termines un descanso corto o largo. También puedes restaurar tu uso del mismo gastando un uso de tu Conjuro Apresurado (sin requerir acción).",
        n: 6,
        usos: 1,
        reset: "corto"
      },
      {
        nombre: "Pericia Enciclopédica (Encyclopedic Expertise)",
        t: "pasiva",
        texto: "Puedes identificar cualquier efecto arcano de memoria. Cada vez que ves o escuchas cómo se lanza un conjuro o investigas un efecto mágico, puedes identificar el conjuro que se lanzó, el objeto mágico responsable o la criatura que produjo el efecto sin una prueba de característica. Este rasgo no logra identificar conjuros, objetos mágicos y criaturas que son completamente únicos o que de otro modo no están registrados en textos arcanos.",
        n: 10,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Memoria Eidética (Eidetic Memory)",
        t: "pasiva",
        texto: "Puedes duplicar sin esfuerzo los conjuros que ves o escuchas, otorgándote los siguientes beneficios.\n- **Recuerdo de Ritual.** Si ves o escuchas cómo se lanza un conjuro de Investigator, a partir de ese momento puedes copiarlo en tu grimorio.\n- **Duplicación de Conjuro.** Cuando ves o escuchas cómo se lanza un conjuro de nivel 5 o inferior, puedes fijar el conjuro en tu mente. En el siguiente minuto, puedes gastar un uso de tu Conjuro Apresurado para lanzar el conjuro sin un espacio de conjuro. Una vez que usas este beneficio para lanzar un conjuro, no puedes volver a hacerlo hasta que termines un descanso largo.",
        n: 14,
        usos: 1,
        reset: "largo"
      }
    ]
  },
  "conspiracy-theorist": {
    n: "Teórico de la Conspiración (Conspiracy Theorist)",
    rasgos: [
      {
        nombre: "Instintos Paranoicos (Paranoid Instincts)",
        t: "pasiva",
        texto: "Tienes ventaja en las tiradas de Iniciativa.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Amuletos (Trinkets)",
        t: "pasiva",
        texto: "Puedes usar los siguientes amuletos.\n- **Amuleto Masónico (Masonic Charm).** Como acción adicional, adhieres este amuleto a un arma que estés sosteniendo. Cuando lo haces, elige un número del 10 al 19. Durante 1 minuto, tus ataques usando el arma logran un Impacto Crítico con una tirada de ese número o un 20 en el d20.\n- **Moneda de Tres Caras (Three-Headed Coin).** Te otorgas a ti mismo Ventaja en una Prueba de d20 antes de tirar el d20.\n- **Metal Insondable (Unfathomable Metal).** Como acción adicional, revelas este amuleto a una criatura a menos de 5 pies de ti. Al inicio de cada uno de sus turnos durante 1 minuto, el objetivo recibe 2d6 de daño Radiante y luego hace una tirada de salvación de Constitución. En una salvación fallida, el efecto continúa. En una salvación exitosa, el efecto termina.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Preparacionista (Prepper)",
        t: "pasiva",
        texto: "Cuando realizas la acción Preparar, tienes Ventaja en las Pruebas de d20 que hagas para la Reacción. Solo puedes usar este rasgo cuando el desencadenante es en respuesta a la acción o movimiento de otra criatura después de que termine tu turno.",
        n: 6,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Atar Cabos (Connect the Dots)",
        t: "pasiva",
        texto: "Cuando terminas un descanso corto o largo, elige una habilidad. Obtienes competencia en esa habilidad si carecías de ella y Pericia con ella. Esta competencia y Pericia dura hasta que uses este rasgo para elegir una habilidad diferente.",
        n: 10,
        usos: 1,
        reset: "corto"
      },
      {
        nombre: "Fuera de la Red (Off the Grid)",
        t: "pasiva",
        texto: "Tu capacidad para evitar a otros te otorga los siguientes beneficios.\n- **Plan de Escape.** Cada vez que recibes daño, puedes usar tu Reacción para tener la condición de Invisible hasta el inicio de tu próximo turno.\n- **Indetectabilidad.** Puedes lanzar *Indetectabilidad* sobre ti mismo sin usar un espacio de conjuro.",
        n: 14,
        usos: 0,
        reset: "ninguno"
      }
    ]
  },
  "containment-specialist": {
    n: "Especialista en Contención (Containment Specialist)",
    rasgos: [
      {
        nombre: "Historia de Tapadera (Cover Story)",
        t: "pasiva",
        texto: "Cuando fallas una prueba de Carisma (Engaño) o una criatura te atrapa en una mentira, puedes volver a intentar la prueba para tranquilizar al oyente con otra mentira rápida. Si tienes éxito, el oyente te cree. Una vez que usas este beneficio, no puedes volver a usarlo hasta que termines un descanso corto o largo.",
        n: 3,
        usos: 1,
        reset: "corto"
      },
      {
        nombre: "Amuletos (Trinkets)",
        t: "pasiva",
        texto: "Puedes usar los siguientes amuletos.\n- **Anticampana (Antibell).** Como acción adicional, puedes lanzar *Silencio* sin usar un espacio de conjuro ni componentes.\n- **Bolsa Negra (Black Bag).** Como acción adicional, puedes activar tu Bolsa Negra, un objeto vinculado a numerosos espacios extradimensionales, durante 1 minuto. Mientras la bolsa está activa, puedes realizar una acción de Utilizar para colocar un objeto en la bolsa o recuperar uno de ella. Cualquier objeto colocado dentro de la bolsa se almacena en su propio espacio extradimensional, el cual está impregnado por un *Campo antimagia*. La boca de la bolsa tiene 2 pies de diámetro. Puede contener hasta 12 objetos, cada uno pesando no más de 50 libras, y pesa tanto como el objeto más pesado almacenado en su interior. Cuando recuperas un objeto de la bolsa, siempre agarras el objeto que pretendías.\n- **Brújula de Cinabrio (Cinnabar Compass).** Como acción adicional, puedes lanzar *Localizar objeto* sin usar un espacio de conjuro ni componentes.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Disrupción Arcana (Arcane Disruption)",
        t: "pasiva",
        texto: "Cuando usas tu rasgo de Explotar Debilidad y el objetivo tiene el rasgo de Resistencia Mágica, ese rasgo no funciona hasta el inicio de tu próximo turno.",
        n: 6,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Aquí no Hay Nada que Ver (Nothing to See Here)",
        t: "accion",
        texto: "Con un destello cegador, puedes sobrescribir los recuerdos de quienes te rodean. Puedes lanzar *Modificar memoria* como una acción apuntando a hasta 3 criaturas dentro del alcance sin usar un espacio de conjuro ni componentes. Debes modificar los recuerdos de cada criatura afectada por el conjuro de la misma manera.\nUna vez que usas este rasgo, no puedes volver a hacerlo hasta que termines un descanso largo.",
        n: 10,
        usos: 1,
        reset: "largo"
      },
      {
        nombre: "Dimensión de Contención (Containment Dimension)",
        t: "accion",
        texto: "Puedes aprovechar un poderoso procedimiento de cuarentena para mantener a otros a salvo de artefactos peligrosos. Como acción Mágica, puedes crear una dimensión de bolsillo que es un duplicado exacto de tu entorno en el momento en que usas este rasgo (completa con duplicados de todas las estructuras y objetos no mágicos que se encuentren allí) y transportar a las criaturas que elijas dentro de su área a esa dimensión. Tú decides el área exacta de la dimensión duplicada, siempre y cuando su espacio total encaje dentro de un Cubo de 150 pies.\nMientras estás en la dimensión de bolsillo, solo puedes afectar y ser afectado por otras criaturas en esa dimensión. No puedes ver a criaturas ni objetos fuera de la dimensión de bolsillo. Los objetos sacados de la dimensión de bolsillo se desvanecen al salir de ella.\nSi una criatura abandona los límites de la dimensión de bolsillo, aparece en el espacio correspondiente del plano que dejó. Si aparece en un espacio ocupado, es empujada al espacio desocupado más cercano y recibe 4d6 de daño de Fuerza.\nLa dimensión de bolsillo dura 10 minutos y termina prematuramente si tienes la condición de Incapacitado, si la dimensión no contiene criaturas o si la descartas (no requiere acción). Cuando la dimensión de bolsillo termina, todas las criaturas y objetos son devueltos al plano que dejaron en sus ubicaciones correspondientes.\nUna vez que usas este rasgo para crear una dimensión de bolsillo, no puedes volver a hacerlo hasta que termines un descanso largo.",
        n: 14,
        usos: 1,
        reset: "largo"
      }
    ]
  },
  "detective": {
    n: "Detective",
    rasgos: [
      {
        nombre: "Corazonada Asombrosa (Uncanny Hunch)",
        t: "pasiva",
        texto: "Cada vez que realizas una prueba de Inteligencia o una prueba de Sabiduría (Perspicacia), puedes ganar una bonificación a la prueba igual a tu nivel de Investigator.\nPuedes usar este rasgo un número de veces igual a tu modificador por Inteligencia (mínimo de una vez), y recuperas todos los usos gastados cuando terminas un descanso largo.",
        n: 3,
        usos: 0,
        reset: "largo"
      },
      {
        nombre: "Amuletos (Trinkets)",
        t: "pasiva",
        texto: "Puedes usar los siguientes amuletos.\n- **Periapto de Piedra de Niebla (Fogstone Periapt).** Puedes lanzar *Paso brumoso* sin usar un espacio de conjuro ni componentes.\n- **Medallón de Cristal (Glass Medallion).** Como acción adicional, puedes lanzar *Invisibilidad* sobre ti mismo sin usar un espacio de conjuro ni componentes.\n- **Llave de Esqueleto (Skeleton’s Key).** Como acción adicional, puedes lanzar *Apertura* sin usar un espacio de conjuro ni componentes. Cuando lanzas el conjuro usando este amuleto, su lanzamiento es silencioso.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Intuición Predictiva (Predictive Intuition)",
        t: "adicional",
        texto: "Como acción adicional, puedes examinar los movimientos de una criatura que puedas ver a menos de 30 pies de ti. Hasta el inicio de tu próximo turno, puedes sumar 1d6 a las tiradas de ataque que hagas contra el objetivo, y el objetivo resta 1d6 de todas sus tiradas de ataque contra ti. Una vez que usas esta acción adicional en un objetivo, no puedes volver a usarla en ese objetivo hasta que termines un descanso corto o largo.",
        n: 6,
        usos: 1,
        reset: "corto"
      },
      {
        nombre: "Instinto de Interrogador (Interrogator’s Instinct)",
        t: "pasiva",
        texto: "Tu experiencia como investigador te otorga los siguientes beneficios.\n- **Detección de Encantamientos.** Disciernes si una criatura está maldita, poseída o tiene las condiciones de Hechizado o Asustado.\n- **Detección de Ilusiones.** Tienes Ventaja en cualquier prueba de característica que hagas para discernir una ilusión.\n- **Detección de Mentiras.** Tienes Ventaja en cualquier prueba de característica que hagas para determinar si escuchas una mentira deliberada.",
        n: 10,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Poder de Deducción (Power of Deduction)",
        t: "pasiva",
        texto: "Puedes usar tu Intuición Predictiva en un objetivo un número ilimitado de veces.",
        n: 14,
        usos: 0,
        reset: "ninguno"
      }
    ]
  },
  "exterminator": {
    n: "Exterminador (Exterminator)",
    rasgos: [
      {
        nombre: "Escudo Plateado (Silvered Shield)",
        t: "pasiva",
        texto: "Tu experiencia en la caza de monstruos te otorga los siguientes beneficios.\n- **Entrenamiento con Armadura.** Tienes entrenamiento con armaduras medias y escudos.\n- **Defensa Inteligente.** Mientras llevas puesta una armadura media, puedes sumar tu Inteligencia, en lugar de tu Destreza, a tu Clase de Armadura.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Amuletos (Trinkets)",
        t: "pasiva",
        texto: "Puedes usar los siguientes amuletos.\n- **Piedra de Afilar Consagrada (Consecrated Whetstone).** Como acción adicional, puedes lanzar *Arma mágica* una vez sin usar un espacio de conjuro ni componentes.\n- **Escama de Dragón Dorada (Gilded Dragon Scale).** Como acción adicional, elige daño de Ácido, Frío, Fuego, Fuerza, Relámpago, Veneno o Trueno. Obtienes Resistencia al tipo de daño elegido durante 1 minuto.\n- **Collar de Dientes de Mímico (Mimic-Tooth Necklace).** Cuando impactas a una criatura con un ataque usando un arma, puedes usar una acción adicional para infligir 2d8 de daño de Ácido adicional a la criatura.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Cazador de Monstruos (Monster Slayer)",
        t: "adicional",
        texto: "Como acción adicional, puedes realizar un ataque con un arma o un Ataque Desarmado. Puedes usar este rasgo un número de veces igual a tu modificador por Inteligencia (mínimo de una vez). Recuperas todos los usos gastados cuando terminas un descanso corto o largo.",
        n: 6,
        usos: 0,
        reset: "corto"
      },
      {
        nombre: "Filo Plateado (Silvered Edge)",
        t: "pasiva",
        texto: "Tu destreza para matar monstruos te otorga los siguientes beneficios.\n- **Maestría Flexible.** Cuando atacas con un arma cuya propiedad de maestría puedes usar, puedes reemplazar esa propiedad por la propiedad Agotar (Sap) u Hostigar (Vex) para ese ataque.\n- **Golpes Sobrenaturales.** Cada vez que infliges daño con un arma, puede infligir tu elección de daño de Fuerza o su tipo de daño normal.",
        n: 10,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Instinto Asesino (Killer Instinct)",
        t: "pasiva",
        texto: "Puedes usar tu Explotar Debilidad dos veces en tu turno, pero no puedes usarlo contra el mismo objetivo más de una vez.",
        n: 14,
        usos: 0,
        reset: "ninguno"
      }
    ]
  },
  "infernum": {
    n: "Infernum (Infernum)",
    rasgos: [
      {
        nombre: "Familiar Infernal (Fiendish Familiar)",
        t: "pasiva",
        texto: "Tus amos infernales te han asignado un infernal menor para supervisarte y ayudarte. Añades *Encontrar familiar* a tu grimorio de forma gratuita. Puedes usar Conjuro Apresurado para lanzar el conjuro sin gastar un uso del rasgo, y no necesitas leer de tu grimorio para lanzarlo. El conjuro se mejora de las siguientes maneras cuando lo lanzas.\n- **Opciones Infernales.** Solo puedes elegir las siguientes opciones para tu familiar: Diablillo, Quasit o Pseudodragón. Un pseudodragón convocado con este conjuro sabe Habla Común y es un Infernal.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      }
    ]
  }
};

```

=== B ===

```
[
  { "donde": "antiquarian", "rasgo": "Acumulador de Artefactos", "tipo": "usos", "usos": "+1 uso al rasgo base de Amuletos", "reset": "ninguno", "detalle": "Otorga un uso adicional para la reserva total de Amuletos de la clase antes de un descanso largo." },
  { "donde": "antiquarian", "rasgo": "Tarro de Almas", "tipo": "usos", "usos": "5", "reset": "al amanecer", "detalle": "Recupera 1d4 + 1 cargas gastadas diariamente al amanecer." },
  { "donde": "archivist", "rasgo": "Tesis", "tipo": "eleccion", "usos": "1", "reset": "al subir de nivel", "por_nivel": {
      "3": ["Corpus", "Mentis", "Mortis", "Oculus"]
    }, "detalle": "Elige una tesis para añadir sus respectivos conjuros gratuitamente al grimorio. Se puede cambiar la tesis al subir de nivel." },
  { "donde": "archivist", "rasgo": "Tesis - Conjuros Corpus", "tipo": "conjuros", "usos": "", "reset": "", "por_nivel": {
      "3": ["Alterar el propio aspecto", "Saltar"],
      "5": ["Forma gaseosa"],
      "7": ["Fabricar"],
      "9": ["Pasamuros"]
    }, "detalle": "Añadidos gratuitamente al grimorio. Cuentan como conjuros de clase y tienen la etiqueta de Ritual." },
  { "donde": "archivist", "rasgo": "Tesis - Conjuros Mentis", "tipo": "conjuros", "usos": "", "reset": "", "por_nivel": {
      "3": ["Hechizar persona", "Zona de la verdad"],
      "5": ["Imagen mayor"],
      "7": ["Terreno alucinatorio"],
      "9": ["Sueño"]
    }, "detalle": "Añadidos gratuitamente al grimorio. Cuentan como conjuros de clase y tienen la etiqueta de Ritual." },
  { "donde": "archivist", "rasgo": "Tesis - Conjuros Mortis", "tipo": "conjuros", "usos": "", "reset": "", "por_nivel": {
      "3": ["Falsa vida", "Apacible descanso"],
      "5": ["Hablar con los muertos"],
      "7": ["Custodia contra la muerte"],
      "9": ["Caparazón antivida"]
    }, "detalle": "Añadidos gratuitamente al grimorio. Cuentan como conjuros de clase y tienen la etiqueta de Ritual." },
  { "donde": "archivist", "rasgo": "Tesis - Conjuros Oculus", "tipo": "conjuros", "usos": "", "reset": "", "por_nivel": {
      "3": ["Identificar", "Detectar pensamientos"],
      "5": ["Recado"],
      "7": ["Localizar criatura"],
      "9": ["Escrutar"]
    }, "detalle": "Añadidos gratuitamente al grimorio. Cuentan como conjuros de clase y tienen la etiqueta de Ritual." },
  { "donde": "detective", "rasgo": "Corazonada Asombrosa", "tipo": "usos", "usos": "Modificador de Inteligencia (mínimo 1)", "reset": "largo", "detalle": "Añade el nivel de Investigator a una prueba de Inteligencia o de Sabiduría (Perspicacia)." },
  { "donde": "detective", "rasgo": "Intuición Predictiva", "tipo": "usos", "usos": "1 por objetivo", "reset": "corto", "detalle": "Pasa a tener usos ilimitados al llegar al nivel 14 con 'Poder de Deducción'." },
  { "donde": "exterminator", "rasgo": "Cazador de Monstruos", "tipo": "usos", "usos": "Modificador de Inteligencia (mínimo 1)", "reset": "corto", "detalle": "Ataque adicional con un arma o desarmado como acción adicional." }
]

```

=== C ===

```
{
  "antiquarian": "Investigator (Mage Hand Press, 2024)",
  "archivist": "Investigator (Mage Hand Press, 2024)",
  "conspiracy-theorist": "Investigator (Mage Hand Press, 2024)",
  "containment-specialist": "Investigator (Mage Hand Press, 2024)",
  "detective": "Investigator (Mage Hand Press, 2024)",
  "exterminator": "Investigator (Mage Hand Press, 2024)",
  "infernum": "Investigator (Mage Hand Press, 2024)"
}

```

=== D ===

```
{
  "antiquarian": "Coleccionistas empedernidos que utilizan todo un museo de reliquias y baratijas arcanas para adaptarse a cualquier amenaza y encontrar la herramienta precisa en situaciones extremas.",
  "archivist": "Eruditos que prefieren los libros antes que las baratijas, se dedican a recopilar un conocimiento enciclopédico sobre magia arcana y dominan por completo los rituales de su grimorio.",
  "conspiracy-theorist": "Investigadores paranoicos convencidos de que toda teoría de conspiración es real, emplean instintos de supervivencia y habilidades de preparación táctica para destapar los mayores encubrimientos del mundo.",
  "containment-specialist": "Agentes encargados de rastrear, aislar y confinar en dimensiones de bolsillo artefactos y tipos de magia anómalos o catastróficos que la mayoría preferiría mantener ocultos.",
  "detective": "Sabuesos implacables de la deducción, persiguen pistas y exprimen su enorme intuición y dotes analíticas para desentrañar los crímenes y crípticos misterios que azotan las sombras.",
  "exterminator": "Cazadores dedicados en cuerpo y alma a exterminar aberraciones, muertos vivientes e infernales, esgrimiendo defensas preparadas y golpes especializados que acaban rápidamente con los monstruos nocturnos.",
  "infernum": "Detectives que, por voluntad propia o maldición, forjaron un oscuro pacto. Poseen habilidades vinculadas con los infiernos e incluso están atados al servicio de un familiar infernal."
}

```

=== E ===
**Dudas o \[NO CONFIRMADO\]:**

1. **Traducción de Conjuros Nuevos**: "Memorize" está como *Memorizar (Memorize)* tal como se estipuló al no tener traducción oficial directa. "Antilife Shell" es oficialmente *Caparazón antivida* en español 2024.

2. **Acción de Utilizar (Utilize Action) y Acción Mágica (Magic Action)**: Se han empleado los términos *Acción de Utilizar* y *Acción Mágica*, correspondientes al glosario de las Reglas 2024 de D&D en español.

3. **Subclase Infernum cortada**: El texto provisto para el *Infernum* termina abruptamente en el rasgo de nivel 3 (antes de concluir las otras subclases listadas). Traduje estrictamente lo que se proporcionó.

4. **Tarro de Almas (Soul Jar) de Anticuario**: Indica un reseteo de "daily at dawn" (diariamente al amanecer). D&D 2024 suele considerar esto como recarga al amanecer independientemente de los descansos, lo registré en el JSON `B` para la lógica del cálculo y dejé "largo" (que es el default del tipado de reinicios en D&D) en el TypeScript para compatibilidad con la app si el enumerado no admite "amanecer". Si "amanecer" está soportado, se puede cambiar `largo` por `amanecer`.

5. **Acción de la Fortaleza del Tarro de Almas**: "Cuando te reducen a 0 Puntos de Golpe... puedes gastar 2 cargas". En la redacción original no dice Reaction (Reacción), simplemente sucede. Se le ha asignado tipo `pasiva` (o `gratis` de facto) indicando en el texto "sin acción requerida", acatando la limitante de "una vez por turno".