export const INVESTIGATOR_SUBCLASES: Record<string, { n: string; rasgos: any[] }> = {
  "antiquarian": {
    n: "Antiquarian",
    rasgos: [
      {
        nombre: "Artifact Hoarder (Acumulador de Artefactos)",
        t: "pasiva",
        texto: "Obtienes un uso adicional de tus Amuletos (Trinkets) antes de un descanso largo.",
        n: 3,
        usos: 1,
        reset: "largo"
      },
      {
        nombre: "Trinkets (Amuletos)",
        t: "varios",
        texto: "Puedes usar los siguientes amuletos:\n- **Hateful Arrowhead (Punta de Flecha Odiosa):** Puedes lanzar *Rayo de debilitamiento* o *Rayo abrasador* sin usar un espacio de conjuro ni componentes.\n- **Warped Prism (Prisma Distorsionado):** Puedes lanzar *Contorno borroso* o *Escudo* sin usar un espacio de conjuro ni componentes.\n- **Razortooth Bandages (Vendas de Dientes Cuchilla):** Puedes lanzar *Curar heridas* o *Causar heridas* sin usar un espacio de conjuro ni componentes. Al restaurar puntos de golpe o infligir daño usando uno de estos conjuros con este amuleto, puedes añadir tu nivel de Investigator a la curación o al daño infligido.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Arcane Relics (Reliquias Arcanas)",
        t: "varios",
        texto: "Has asegurado un puñado de reliquias de valor incalculable con encantamientos raros y delicados. Una vez que usas una de las siguientes reliquias, no puedes volver a usar este rasgo hasta que termines un descanso corto o largo.\n- **Antediluvian Dynamo (Dínamo Antediluviana):** Puedes lanzar *Bola de fuego* o *Relámpago* sin usar un espacio de conjuro ni componentes.\n- **Lich’s Deathmask (Máscara Mortuoria de Liche):** Puedes lanzar *Contraconjuro* o *Disipar magia* sin usar un espacio de conjuro ni componentes.\n- **Mortal Coil (Espiral Mortal):** Puedes lanzar *Animar a los muertos* o *Revivir* sin usar un espacio de conjuro ni componentes. Cuando lanzas *Animar a los muertos* usando esta reliquia, todos los muertos vivientes anteriores creados con ella se reducen a polvo.",
        n: 6,
        usos: 1,
        reset: "corto"
      },
      {
        nombre: "Magic Item Collection (Colección de Objetos Mágicos)",
        t: "pasiva",
        texto: "Cuando terminas un descanso largo, puedes producir mágicamente un objeto mágico. Al hacerlo, todos los objetos mágicos creados previamente por este rasgo se desvanecen. Si un objeto mágico que produces requiere sintonización, puedes sintonizarte con él en el instante en que lo produces. Puedes producir los siguientes objetos mágicos: una *Alfombra voladora*, una *Capa del murciélago*, una *Lengua de fuego*, unos *Guanteletes de fuerza de ogro*, una *Fortaleza instantánea*, un *Anillo de regeneración*, un *Anillo de telequinesis*, una *Espada solar* o una *Varita de las maravillas*.",
        n: 10,
        usos: 1,
        reset: "largo"
      },
      {
        nombre: "Soul Jar (Tarro de Alma)",
        t: "varios",
        texto: "Has asegurado la joya de la corona de tu colección: el tarro de alma de un liche, o \"filacteria\". Este objeto mágico siempre está sintonizado contigo y no cuenta para tu límite total de objetos mágicos sintonizados. Recupera 1d4 + 1 cargas gastadas diariamente al amanecer. Mientras llevas el tarro de alma, puedes gastar una o más cargas para usar las siguientes habilidades:\n- **Temporary Hit Points (Puntos de Golpe Temporales):** Puedes gastar 1 carga como acción adicional para ganar puntos de golpe temporales iguales a tu nivel de Investigator.\n- **Trinket Recharge (Recarga de Amuleto):** Puedes gastar 1 carga como acción adicional para recuperar un uso gastado de tus Amuletos (Trinkets).\n- **Undead Fortitude (Fortaleza de Muerto Viviente):** Cuando te reducen a 0 puntos de golpe y no mueres en el acto, puedes gastar 2 cargas para quedarte a 1 punto de golpe en su lugar. Puedes usar este beneficio solo una vez por turno.\n- **Draining Touch (Toque Drenante):** Como Acción Mágica, puedes gastar 3 cargas para hacer un ataque de conjuro cuerpo a cuerpo. Si impacta, el objetivo recibe 8d8 daño necrótico y tú recuperas puntos de golpe iguales al daño necrótico infligido. Si el ataque de conjuro falla, estas cargas no se gastan.",
        n: 14,
        usos: 5,
        reset: "largo"
      }
    ]
  },
  "archivist": {
    n: "Archivist",
    rasgos: [
      {
        nombre: "Trinkets (Amuletos)",
        t: "pasiva",
        texto: "Puedes usar los siguientes amuletos:\n- **Aura Lenses (Lentes de Aura):** Puedes lanzar *Detectar magia* sin usar un espacio de conjuro ni componentes.\n- **Mnemonic Script (Escritura Mnemónica):** Puedes lanzar *Memorizar* (Memorize) sin usar un espacio de conjuro ni componentes.\n- **Tongue Stone (Piedra de Lenguas):** Puedes lanzar *Comprensión idiomática* sin usar un espacio de conjuro ni componentes.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Thesis (Tesis)",
        t: "pasiva",
        texto: "Obtienes acceso a ciertos conjuros asociados con tu tesis. Elige una de las áreas temáticas para tu tesis (Corpus, Mentis, Mortis u Oculus). Añades los conjuros listados para tu nivel de Investigator a tu grimorio de forma gratuita. Estos conjuros cuentan como conjuros de Investigator para ti y los tratas como si tuvieran la etiqueta de Ritual.\nCada vez que ganas un nivel de Investigator, puedes reemplazar tu tesis por otra. Los conjuros en tu grimorio correspondientes a tu tesis son mágicamente reemplazados por los de la nueva tesis para tu nivel.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Erudite Spell (Conjuro Erudito)",
        t: "gratis",
        texto: "Cuando lanzas un conjuro que obliga a una criatura a hacer una tirada de salvación, puedes darle a un objetivo del conjuro desventaja en las salvaciones contra ese conjuro.\nUna vez que usas este rasgo, no puedes volver a usarlo hasta que termines un descanso corto o largo. También puedes recuperar su uso gastando un uso de tu Encantamiento Apresurado (Rushed Incantation) (sin requerir acción).",
        n: 6,
        usos: 1,
        reset: "corto"
      },
      {
        nombre: "Encyclopedic Expertise (Pericia Enciclopédica)",
        t: "pasiva",
        texto: "Puedes identificar cualquier efecto arcano de memoria. Siempre que veas o escuches lanzar un conjuro, o investigues un efecto mágico, puedes identificar el conjuro que se lanzó, el objeto mágico responsable o la criatura que produjo el efecto sin necesidad de una prueba de característica. Este rasgo falla al identificar conjuros, objetos mágicos y criaturas que sean completamente únicos o que de otro modo no estén registrados en textos arcanos.",
        n: 10,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Eidetic Memory (Memoria Eidética)",
        t: "varios",
        texto: "Puedes duplicar sin esfuerzo los conjuros que ves o escuchas, otorgándote los siguientes beneficios:\n- **Ritual Recall (Recuerdo de Ritual):** Si ves o escuchas lanzar un conjuro de Investigator, a partir de entonces puedes copiarlo en tu grimorio.\n- **Spell Duplication (Duplicación de Conjuros):** Cuando ves o escuchas lanzar un conjuro de nivel 5 o inferior, puedes fijar el conjuro en tu mente. En el transcurso del siguiente minuto, puedes gastar un uso de tu Encantamiento Apresurado (Rushed Incantation) para lanzar el conjuro sin usar un espacio de conjuro. Una vez que usas este beneficio para lanzar un conjuro, no puedes volver a hacerlo hasta que termines un descanso largo.",
        n: 14,
        usos: 1,
        reset: "largo"
      }
    ]
  },
  "conspiracy-theorist": {
    n: "Conspiracy Theorist",
    rasgos: [
      {
        nombre: "Paranoid Instincts (Instintos Paranoicos)",
        t: "pasiva",
        texto: "Tienes ventaja en las tiradas de Iniciativa.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Trinkets (Amuletos)",
        t: "adicional",
        texto: "Puedes usar los siguientes amuletos:\n- **Masonic Charm (Amuleto Masónico):** Como acción adicional, adhieres este amuleto a un arma que estés sosteniendo. Al hacerlo, elige un número del 10 al 19. Durante 1 minuto, tus ataques con esa arma logran un Impacto Crítico si sacas ese número o un 20 en el d20.\n- **Three-Headed Coin (Moneda de Tres Cabezas):** Te otorgas ventaja en una prueba de d20 (D20 Test) antes de tirar el d20.\n- **Unfathomable Metal (Metal Incomprensible):** Como acción adicional, revelas este amuleto a una criatura a 5 pies de ti. Al inicio de cada uno de sus turnos durante 1 minuto, el objetivo recibe 2d6 daño radiante y luego debe hacer una tirada de salvación de Constitución. Si falla, el efecto continúa. Si tiene éxito, el efecto termina.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Prepper (Preparacionista)",
        t: "pasiva",
        texto: "Cuando tomas la acción de Preparar (Ready), tienes ventaja en las pruebas de d20 que hagas para la reacción. Solo puedes usar este rasgo cuando el desencadenante es en respuesta a la acción o movimiento de otra criatura después del final de tu turno.",
        n: 6,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Connect the Dots (Atando Cabos)",
        t: "fuera",
        texto: "Cuando terminas un descanso corto o largo, elige una habilidad. Ganas competencia en esa habilidad si te faltaba, y pericia (Expertise) con ella. Esta competencia y pericia duran hasta que uses este rasgo para elegir una habilidad diferente.",
        n: 10,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Off the Grid (Fuera del Radar)",
        t: "varios",
        texto: "Tu capacidad para evitar a otros te otorga los siguientes beneficios:\n- **Escape Plan (Plan de Escape):** Siempre que recibas daño, puedes usar una reacción para tener la condición de Invisible hasta el inicio de tu próximo turno.\n- **Nondetection (Indetectabilidad):** Puedes lanzar *Indetectabilidad* sobre ti mismo sin usar un espacio de conjuro.",
        n: 14,
        usos: 0,
        reset: "ninguno"
      }
    ]
  },
  "containment-specialist": {
    n: "Containment Specialist",
    rasgos: [
      {
        nombre: "Cover Story (Historia de Coartada)",
        t: "gratis",
        texto: "Cuando fallas una prueba de Carisma (Engaño) o una criatura te pilla en una mentira, puedes volver a intentar la prueba para tranquilizar al oyente con otra mentira rápida. Si tienes éxito, el oyente te cree. Una vez que usas este beneficio, no puedes volver a usarlo hasta que termines un descanso corto o largo.",
        n: 3,
        usos: 1,
        reset: "corto"
      },
      {
        nombre: "Trinkets (Amuletos)",
        t: "adicional",
        texto: "Puedes usar los siguientes amuletos:\n- **Antibell (Anticampana):** Como acción adicional, puedes lanzar *Silencio* sin usar un espacio de conjuro ni componentes.\n- **Black Bag (Bolsa Negra):** Como acción adicional, puedes activar tu Bolsa Negra, un objeto vinculado a numerosos espacios extradimensionales, durante 1 minuto. Mientras la bolsa está activa, puedes tomar la acción de Utilizar (Utilize) para colocar un objeto en la bolsa o recuperar uno de ella. Cualquier objeto colocado dentro de la bolsa se almacena en su propio espacio extradimensional, el cual está inundado por un *Campo antimagia*. La boca de la bolsa tiene 2 pies de diámetro. Puede contener hasta 12 objetos, cada uno pesando no más de 50 libras, y pesa tanto como el objeto más pesado almacenado en su interior. Cuando recuperas un objeto de la bolsa, siempre agarras el objeto que pretendías.\n- **Cinnabar Compass (Brújula de Cinabrio):** Como acción adicional, puedes lanzar *Localizar objeto* sin usar un espacio de conjuro ni componentes.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Arcane Disruption (Disrupción Arcana)",
        t: "pasiva",
        texto: "Cuando usas tu rasgo Explotar Debilidad (Exploit Weakness) y el objetivo tiene el rasgo de Resistencia Mágica, ese rasgo no funciona hasta el inicio de tu próximo turno.",
        n: 6,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Nothing to See Here (Aquí no hay nada que ver)",
        t: "accion",
        texto: "Con un destello cegador, puedes sobrescribir los recuerdos de quienes te rodean. Puedes lanzar *Modificar recuerdo* como acción apuntando a hasta 3 criaturas dentro del alcance sin usar un espacio de conjuro ni componentes. Debes modificar los recuerdos de cada criatura afectada por el conjuro de la misma manera. Una vez que usas este rasgo, no puedes volver a hacerlo hasta que termines un descanso largo.",
        n: 10,
        usos: 1,
        reset: "largo"
      },
      {
        nombre: "Containment Dimension (Dimensión de Contención)",
        t: "accion",
        texto: "Puedes aprovechar un poderoso procedimiento de cuarentena para mantener a otros a salvo de artefactos peligrosos. Como Acción Mágica, puedes crear una dimensión de bolsillo que es un duplicado exacto de tu entorno en el momento en que usas este rasgo —completa con duplicados de todas las estructuras y objetos no mágicos en ella— y transportar a las criaturas que elijas dentro de su área a la dimensión. Tú decides el área exacta de la dimensión duplicada, siempre y cuando su espacio total quepa dentro de un cubo de 150 pies.\nMientras estés en la dimensión de bolsillo, solo puedes afectar y ser afectado por otras criaturas en esa dimensión. No puedes ver criaturas ni objetos fuera de la dimensión de bolsillo. Los objetos sacados de la dimensión de bolsillo desaparecen al salir de ella.\nSi una criatura sale de los límites de la dimensión de bolsillo, aparece en el espacio correspondiente en el plano que dejó. Si aparece en un espacio ocupado, es empujada al espacio desocupado más cercano y recibe 4d6 daño por fuerza.\nLa dimensión de bolsillo dura 10 minutos, y termina antes si tienes la condición de Incapacitado, si la dimensión no contiene criaturas, o si la disipas (no requiere acción). Cuando la dimensión de bolsillo termina, todas las criaturas y objetos son devueltos al plano que dejaron en sus ubicaciones correspondientes.",
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
        nombre: "Uncanny Hunch (Corazonada Inquietante)",
        t: "pasiva",
        texto: "Siempre que hagas una prueba de Inteligencia o una prueba de Sabiduría (Perspicacia), puedes ganar un bonificador a la prueba igual a tu nivel de Investigator.",
        n: 3,
        usos: 0,
        reset: "largo"
      },
      {
        nombre: "Trinkets (Amuletos)",
        t: "varios",
        texto: "Puedes usar los siguientes amuletos:\n- **Fogstone Periapt (Periapto de Piedra de Niebla):** Puedes lanzar *Paso brumoso* sin usar un espacio de conjuro ni componentes.\n- **Glass Medallion (Medallón de Cristal):** Como acción adicional, puedes lanzar *Invisibilidad* sobre ti mismo sin usar un espacio de conjuro ni componentes.\n- **Skeleton’s Key (Llave de Esqueleto):** Como acción adicional, puedes lanzar *Apertura* sin usar un espacio de conjuro ni componentes. Cuando lanzas el conjuro usando este amuleto, su lanzamiento es silencioso.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Predictive Intuition (Intuición Predictiva)",
        t: "adicional",
        texto: "Como acción adicional, puedes examinar los movimientos de una criatura que puedas ver a 30 pies de ti. Hasta el inicio de tu próximo turno, puedes añadir 1d6 a las tiradas de ataque que hagas contra el objetivo, y el objetivo resta 1d6 de todas sus tiradas de ataque contra ti. Una vez que usas esta acción adicional sobre un objetivo, no puedes volver a usarla sobre ese mismo objetivo hasta que termines un descanso corto o largo.",
        n: 6,
        usos: 1,
        reset: "corto"
      },
      {
        nombre: "Interrogator’s Instinct (Instinto de Interrogador)",
        t: "pasiva",
        texto: "Tu experiencia como detective te otorga los siguientes beneficios:\n- **Enchantment Detection (Detección de Encantamientos):** Disciernes si una criatura está maldita, poseída o tiene las condiciones de Hechizado o Asustado.\n- **Illusion Detection (Detección de Ilusiones):** Tienes ventaja en cualquier prueba de característica que hagas para discernir una ilusión.\n- **Lie Detection (Detección de Mentiras):** Tienes ventaja en cualquier prueba de característica que hagas para determinar si estás escuchando una mentira deliberada.",
        n: 10,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Power of Deduction (Poder de Deducción)",
        t: "pasiva",
        texto: "Puedes usar tu Intuición Predictiva (Predictive Intuition) sobre un objetivo un número ilimitado de veces.",
        n: 14,
        usos: 0,
        reset: "ninguno"
      }
    ]
  },
  "exterminator": {
    n: "Exterminator",
    rasgos: [
      {
        nombre: "Silvered Shield (Escudo Plateado)",
        t: "pasiva",
        texto: "Tu experiencia en la caza de monstruos te otorga los siguientes beneficios:\n- **Armor Training (Entrenamiento con Armaduras):** Tienes entrenamiento con armaduras medias y escudos.\n- **Intelligent Defense (Defensa Inteligente):** Mientras lleves puesta una armadura media, puedes añadir tu Inteligencia, en lugar de tu Destreza, a tu Clase de Armadura.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Trinkets (Amuletos)",
        t: "varios",
        texto: "Puedes usar los siguientes amuletos:\n- **Consecrated Whetstone (Piedra de Afilar Consagrada):** Como acción adicional, puedes lanzar *Arma mágica* una vez sin usar un espacio de conjuro ni componentes.\n- **Gilded Dragon Scale (Escama de Dragón Dorada):** Como acción adicional, elige daño por ácido, frío, fuego, fuerza, relámpago, veneno o trueno. Ganas resistencia al tipo de daño elegido durante 1 minuto.\n- **Mimic-Tooth Necklace (Collar de Diente de Mímico):** Cuando impactas a una criatura con un ataque de arma, puedes tomar una acción adicional para infligir 2d8 daño por ácido adicional a la criatura.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Monster Slayer (Asesino de Monstruos)",
        t: "adicional",
        texto: "Como acción adicional, puedes hacer un ataque con un arma o un impacto sin armas.",
        n: 6,
        usos: 0,
        reset: "corto"
      },
      {
        nombre: "Silvered Edge (Filo Plateado)",
        t: "pasiva",
        texto: "Tu pericia para matar monstruos te otorga los siguientes beneficios:\n- **Flexible Mastery (Maestría Flexible):** Cuando atacas con un arma cuya propiedad de maestría puedes usar, puedes reemplazar esa propiedad con la propiedad de Agotar (Sap) o Vejar (Vex) para ese ataque.\n- **Supernatural Strikes (Golpes Sobrenaturales):** Siempre que inflijas daño con un arma, esta puede infligir daño por fuerza (a tu elección) en lugar de su tipo de daño normal.",
        n: 10,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Killer Instinct (Instinto Asesino)",
        t: "pasiva",
        texto: "Puedes usar tu Explotar Debilidad (Exploit Weakness) dos veces en tu turno, pero no puedes usarlo contra el mismo objetivo más de una vez.",
        n: 14,
        usos: 0,
        reset: "ninguno"
      }
    ]
  },
  "infernum": {
    n: "Infernum",
    rasgos: [
      {
        nombre: "Fiendish Familiar (Familiar Infernal)",
        t: "pasiva",
        texto: "Tus amos infernales te han asignado un infernal menor para supervisarte y ayudarte. Añades *Encontrar familiar* a tu grimorio de forma gratuita. Puedes usar Encantamiento Apresurado (Rushed Incantation) para lanzar el conjuro sin gastar un uso del rasgo, y no necesitas leer de tu grimorio para lanzarlo. El conjuro mejora de las siguientes maneras cuando lo lanzas:\n- **Fiendish Options (Opciones Infernales):** Solo puedes elegir las siguientes opciones para tu familiar: Diablillo (Imp), Cuásit (Quasit) o Pseudodragón. Un pseudodragón invocado con este conjuro sabe hablar Común y es de tipo Infernal.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      }
    ]
  }
};