=== A ===

```typescript
export const illrigger = {
  n: 1,
  dado: "d10",
  sv: ["Constitución", "Carisma"],
  habN: 2,
  habs: ["Arcano", "Atletismo", "Engaño", "Intimidación", "Investigación", "Perspicacia", "Persuasión", "Religión", "Sigilo"],
  arm: ["Armaduras ligeras", "Armaduras medias", "Escudos"],
  armas: ["Armas simples", "Armas marciales"],
  equipo: [
    "(a) dos armas marciales o (b) un arma marcial y un escudo",
    "(a) un camisote de mallas o (b) armadura de cuero, un arco largo y 20 flechas",
    "(a) un paquete de sacerdote o (b) un paquete de explorador de mazmorras",
    "5 jabalinas"
  ],
  rasgos: [
    {
      nombre: "Interdicción funesta (Baleful Interdict)",
      t: "adicional",
      texto: "Obtienes la aptitud de censurar a las criaturas con el poder del Infierno. Una vez en tu turno, puedes colocar un sello mágico en una criatura a 30 pies o menos de ti. Puedes colocar este sello cuando impactas a ese objetivo con un ataque con arma (no requiere acción), o puedes usar una acción adicional para colocar este sello en un objetivo que puedas ver dentro del alcance. Este sello dura 1 minuto o hasta que se queme.\nUna criatura con uno o más de tus sellos se denomina **criatura interdicta**. Los sellos que colocas son invisibles para otras criaturas, pero cuando puedes ver a una criatura interdicta, los sellos se te revelan como glifos brillantes en su cuerpo.\nSolo puedes colocar un número limitado de sellos antes de descansar, y recuperas todos los sellos cuando terminas un descanso corto o largo. El número de sellos que puedes colocar aumenta conforme ganas niveles de illrigger, como se indica en la columna Sellos de la tabla del Illrigger.\nSi una criatura interdicta muere, puedes usar una acción adicional en tu turno para mover todos los sellos colocados en ella a una nueva criatura que puedas ver a 30 pies o menos de ella. La duración de cada sello continúa transcurriendo cuando una criatura interdicta muere y el sello se mueve a una nueva.\n\n**Quemar sellos (Burning Seals).** Cuando una criatura interdicta que puedes ver a 30 pies o menos de ti recibe daño de cualquier fuente que no sea un sello quemado por un illrigger, puedes quemar cualquier cantidad de sellos que hayas colocado en ella para infligir 1d6 de daño de fuego o necrótico (tu elección) a esa criatura por cada sello quemado. Infliges este daño inmediatamente después del daño desencadenante. Quemar un sello no requiere ninguna acción de tu parte, pero no puedes hacerlo mientras estás incapacitado. Una vez que un sello se quema, desaparece inmediatamente.\nUna vez que alcanzas el nivel 5 en esta clase, tu conexión con tu archidiablo se fortalece. Cada sello quemado inflige 1d6 de daño adicional, para un total de 2d6. El daño de cada sello aumenta nuevamente en 1d6 cuando alcanzas el nivel 11 (total de 3d6) y el nivel 20 (total de 4d6).\n\n**CD de Interdicción.** Los rasgos de clase que ganas más adelante pueden añadir efectos adicionales a tu Interdicción funesta y obligar al objetivo a hacer una tirada de salvación. La CD para estos efectos se calcula así:\n\n**CD de salvación de interdicción** = 8 + tu bonificador por competencia + tu modificador por Carisma.",
      n: 1,
      usos: "ver tabla",
      reset: "corto"
    },
    {
      nombre: "Lengua bífida (Forked Tongue)",
      t: "fuera",
      texto: "Puedes hablar, leer y escribir instintivamente Infernal. Además, puedes hablar otros dos idiomas de tu elección, pero no puedes leerlos ni escribirlos. Cuando terminas un descanso largo, puedes recurrir al conocimiento de tu archidiablo para reemplazar uno de estos dos idiomas. Al hacerlo, elige otro idioma cuyo nombre conozcas; olvidas mágicamente el idioma anterior y obtienes el nuevo en su lugar. Una vez que reemplazas un idioma de esta manera, debes terminar un descanso largo antes de poder hacerlo de nuevo.\nA partir del nivel 9, este rasgo te otorga un idioma adicional, para un total de tres (además del Infernal). Además, obtienes ventaja en las pruebas de Sabiduría (Perspicacia) que hagas para averiguar las intenciones o la sinceridad de las criaturas.",
      n: 1
    },
    {
      nombre: "Maestría en combate (Combat Mastery)",
      t: "pasiva",
      texto: "Tu archidiablo te otorga una habilidad asombrosa en una forma de combate. Elige una opción de maestría en combate de illrigger.",
      n: 2
    },
    {
      nombre: "Interdicción (Interdiction)",
      t: "pasiva",
      texto: "Puedes infundir tus sellos con poder mágico infernal, mejorando sus efectos.\n**Dones de interdicción conocidos.** Aprendes un don de interdicción de tu elección. Conforme ganas niveles en esta clase, obtienes dones adicionales, como se muestra en la columna Dones de Interdicción de la tabla del Illrigger. Cada nuevo don debe ser de un nivel que puedas aprender.\nSiempre que ganas un nivel de illrigger, puedes elegir un don que conozcas y reemplazarlo por otro don que puedas aprender.\n**Usar dones de interdicción.** Algunos dones te permiten gastar sellos sin colocar para potenciar aptitudes, mientras que otros fortalecen todos tus sellos o te otorgan beneficios contra criaturas interdictas. Los dones que otorgan beneficios pasivos no requieren que gastes un sello. Todos los demás dones deben activarse en un turno (por ejemplo, gastando un sello). Solo puedes activar un don no pasivo por turno.",
      n: 2
    },
    {
      nombre: "Contrato diabólico (Diabolic Contract)",
      t: "pasiva",
      texto: "Firma un contrato diabólico con un archidiablo que te da la bienvenida a la Orden de la Desolación. Elige una subclase. Tu elección te otorga rasgos en los niveles 3, 7, 11 y 15.",
      n: 3
    },
    {
      nombre: "Invocar al Infierno (Invoke Hell)",
      t: "pasiva",
      texto: "Tu conexión diabólica te permite canalizar energía infernal para potenciar efectos mágicos. Tu contrato diabólico elegido te otorga dos opciones de Invocar al Infierno.\nCuando usas tu Invocar al Infierno, eliges qué opción usar. Debes terminar un descanso corto o largo para volver a usarlo. Si requiere tirada de salvación, la CD es igual a tu CD de salvación de interdicción.",
      n: 3,
      usos: "1",
      reset: "corto"
    },
    {
      nombre: "Conducto infernal (Infernal Conduit)",
      t: "accion",
      texto: "Puedes fortalecer a tus aliados a costa tuya, o drenar la fuerza vital de tus enemigos para tu propio beneficio. Tienes una reserva de dados de Conducto infernal, que son d10s (la cantidad aumenta según la tabla del Illrigger).\nComo acción, puedes tocar a otra criatura y gastar uno o más dados de tu reserva. El objetivo debe hacer una tirada de salvación de Constitución contra tu CD de interdicción (puede fallar voluntariamente). Tira los dados gastados y elige uno de los siguientes efectos:\n\n- **Vigorizar (Invigorate):** Si falla la salvación, el objetivo recupera puntos de golpe iguales al total sacado, y tú sufres daño necrótico igual a ese total. Si tiene éxito, el objetivo recupera la mitad, y tú sufres daño necrótico igual a ese total. Tenga éxito o falle, este daño necrótico no puede ser reducido de ninguna manera, y si te reduce a 0 puntos de golpe, caes inconsciente y quedas estabilizado.\n- **Devorar (Devour):** Si falla la salvación, el objetivo sufre daño necrótico igual al total sacado, y tú recuperas puntos de golpe iguales a ese total. Si tiene éxito, sufre la mitad del daño, y tú recuperas puntos de golpe iguales al daño que sufrió el objetivo. Tenga éxito o falle (o si eligió fallar), el daño necrótico no puede ser reducido de ninguna manera. A partir del nivel 11 en esta clase, el objetivo también sufre un nivel de Agotamiento si falla la salvación contra este efecto (máximo 3 niveles de Agotamiento combinados por rasgos de Conducto infernal).\n\nRecuperas todos los dados gastados cuando terminas un descanso largo.",
      n: 6,
      usos: "ver tabla",
      reset: "largo"
    },
    {
      nombre: "Precio de sangre (Blood Price)",
      t: "pasiva",
      texto: "Puedes fortalecer tus defensas a costa de tu vitalidad. Siempre que falles una tirada de salvación, puedes gastar uno de tus Dados de Golpe, tirarlo y sumar el número sacado al resultado de la salvación.",
      n: 10
    },
    {
      nombre: "Fuerza aterrorizante (Terrorizing Force)",
      t: "pasiva",
      texto: "Tus ataques se potencian con un poder devastador. Al obtener este rasgo, elige un tipo de daño: frío, fuego, necrótico o veneno. Cuando impactas con un ataque con arma, infliges 1d8 de daño adicional del tipo elegido. Puedes elegir un tipo de daño diferente cuando terminas un descanso largo.",
      n: 11
    },
    {
      nombre: "Interdicción superior (Superior Interdict)",
      t: "adicional",
      texto: "El daño de tus sellos ignora cualquier resistencia al daño que tenga el objetivo.\nAdemás, puedes usar una acción adicional para recuperar un sello si no te queda ninguno. Una vez que recuperas un sello de esta manera, no puedes volver a hacerlo hasta que termines un descanso largo.",
      n: 14,
      usos: "1",
      reset: "largo"
    },
    {
      nombre: "Majestad infernal (Infernal Majesty)",
      t: "adicional",
      texto: "Como acción adicional, canalizas el poder del Infierno, obteniendo los siguientes beneficios durante 10 minutos:\n- Obtienes resistencia al daño de fuego, frío y necrótico.\n- Aparecen alas en tu espalda, otorgándote una velocidad de vuelo de 60 pies.\n- Cuando usas tu Precio de sangre, puedes hacer que un enemigo que puedas ver a 10 pies o menos de ti sufra daño igual al número sacado en tu Dado de Golpe.\n- Cuando impactas con un ataque con arma, tu Fuerza aterrorizante inflige 2d8 de daño adicional en lugar de 1d8.\n\nDurante este tiempo, si mueres, puedes elegir que tu cuerpo desaparezca en un estallido de llamas, dejando atrás solo tu equipo. Si lo haces, tu cuerpo se reforma 1d6 días después en algún lugar del Infierno. Una vez que tu cuerpo se reforma, vuelves a la vida y recuperas todos tus puntos de golpe.\nUna vez que canalizas tu Majestad infernal, debes terminar un descanso largo antes de poder hacerlo de nuevo.",
      n: 17,
      usos: "1",
      reset: "largo"
    },
    {
      nombre: "Maestro del Infierno (Master of Hell)",
      t: "accion",
      texto: "Aprendes a abrir una falla hacia el Infierno y desatar su furia sobre tus enemigos. Como acción, puedes invocar una tormenta infernal centrada en un punto que puedas ver a 150 pies o menos de ti. Elige uno de los siguientes efectos, que llena una esfera de 50 pies de radio centrada en ese punto:\n- **Infierno (Inferno):** Llueve fuego infernal. Cada enemigo en el área debe hacer una salvación de Destreza. Si falla, sufre 5d10 de daño de fuego más 5d10 de daño necrótico y arde durante 1 minuto (mitad de daño y no arde si tiene éxito). Un objetivo que arde debe repetir la salvación al final de su turno, sufriendo 1d10 de fuego y 1d10 necrótico si falla, o terminando el efecto si tiene éxito. Este fuego no puede extinguirse por medios no mágicos.\n- **Pestilencia (Pestilence):** Un miasma envuelve el área. Cada enemigo debe hacer una salvación de Constitución. Si falla, sufre 5d10 de daño de veneno más 5d10 de daño necrótico y queda Envenenado durante 1 minuto (mitad de daño y no se envenena si tiene éxito).\n- **Oscuridad (Darkness):** Una tormenta amarga asalta el área. Cada enemigo debe hacer una salvación de Constitución, sufriendo 10d10 de daño de frío si falla (mitad si tiene éxito). Además, la penumbra persiste por 1 minuto, y cada enemigo dentro queda Cegado mientras permanezca en el área.\n\nUna vez que invocas una tormenta infernal, no puedes volver a hacerlo hasta terminar un descanso largo.",
      n: 20,
      usos: "1",
      reset: "largo"
    }
  ]
};

export const maestriaEnCombate = {
  "Bravuconería (Bravado)": "Mientras no lleves puesta ninguna armadura, tu Clase de Armadura es igual a 10 + tu modificador por Destreza + tu modificador por Carisma. Puedes usar un escudo y seguir obteniendo este beneficio.",
  "Brutal (Brutal)": "Cuando impactas a una criatura que no sea más de un tamaño mayor que el tuyo con un ataque que hagas con un arma cuerpo a cuerpo que estés empuñando a dos manos, puedes mover al objetivo 5 pies horizontalmente. Si lo deseas, puedes luego gastar movimiento para moverte al espacio que dejó.",
  "Inexorable (Inexorable)": "Obtienes un bonificador de +1 a las tiradas de salvación por cada criatura hostil a 5 pies o menos de ti, hasta un bonificador máximo de +5.",
  "Mentiras (Lies)": "Puedes elegir un tipo de arma cuerpo a cuerpo (ej. hacha de batalla, espadón). Cuando ataques con ese tipo de arma, puedes usar tu modificador por Carisma, en lugar de Fuerza o Destreza, para las tiradas de ataque y daño. Puedes elegir un nuevo tipo de arma al terminar un descanso largo.",
  "Ágil (Lissome)": "Cuando impactas a una criatura con un ataque con arma cuerpo a cuerpo, puedes gastar movimiento para moverte 5 pies sin provocar ataques de oportunidad.",
  "Sin trabas (Unfettered)": "Cuando usas tu Interdicción funesta para colocar o quemar un sello, su alcance es de 60 pies en lugar de 30 pies. Cuando obtienes el rasgo Conducto infernal a nivel 6, su alcance es de 30 pies en lugar de toque. Además, hacer un ataque a distancia a 5 pies de una criatura hostil no impone desventaja en la tirada."
};

export const architectOfRuin = {
  n: 3,
  rasgos: [
    {
      nombre: "Preceptos de la Ruina (Precepts of Ruin)",
      t: "pasiva",
      texto: "Los Arquitectos de la Ruina juran lealtad a Asmodeo. Estos preceptos les comprometen a destruir a los enemigos de Asmodeo comandando gran magia, causando miedo y sembrando desconfianza.\n- **El campo de batalla de la mente (The Battlefield of the Mind).** Para cuando mis ejércitos se encuentren con los tuyos, estarás lleno de terror y dudarás de tu propia fuerza.\n- **El secreto adecuado (The Proper Secret).** Una vez que conozco tus secretos, conozco tu debilidad.\n- **El conocimiento es poder (Knowledge Is Power).** El saber es tan poderoso como el acero. Estudio cada detalle sobre mi enemigo.\n- **La magia es mía para comandar (Magic Is Mine to Command).** Esgrimo las artes arcanas oscuras para manipular tus sentidos y fortalecer mi espada.",
      n: 3
    },
    {
      nombre: "Bendición de Asmodeo (Asmodeus's Blessing)",
      t: "pasiva",
      texto: "Obtienes competencia en una de las siguientes habilidades: Arcano, Historia, Naturaleza o Religión.\nAdemás, puedes leer y escribir los idiomas otorgados por tu rasgo Lengua bífida, en lugar de solo hablarlos.",
      n: 3
    },
    {
      nombre: "Lanzamiento de conjuros (Spellcasting)",
      t: "accion",
      texto: "Accedes a un pozo de magia profana para lanzar conjuros (ver tabla de Lanzamiento de conjuros del Architect of Ruin).\n**Trucos.** Conoces dos trucos de tu elección de la lista de conjuros del Architect of Ruin. Aprendes uno adicional a nivel 10.\n**Espacios de conjuro.** Recuperas todos los espacios gastados al terminar un descanso largo.\n**Conjuros conocidos.** Conoces tres conjuros de nivel 1 de tu lista. Aprendes más conforme subes de nivel según la tabla. Puedes reemplazar conjuros conocidos al subir de nivel en la clase.\n**Característica de lanzamiento.** Tu característica es Carisma.\n*CD de salvación de conjuros = 8 + bonificador por competencia + mod por Carisma*\n*Mod. de ataque de conjuros = bonificador por competencia + mod por Carisma*\n**Foco de lanzamiento.** Puedes usar un símbolo profano (ej. un amuleto) como foco.",
      n: 3
    },
    {
      nombre: "Invocar al Infierno (Invoke Hell)",
      t: "pasiva",
      texto: "Obtienes las siguientes dos opciones de Invocar al Infierno:\n- **Conjuro enervante (Enervating Spell).** Cuando infliges daño a una criatura con un conjuro de illrigger de nivel 1 o superior, puedes gastar un sello (no requiere acción) e imbuir el conjuro. El objetivo adquiere vulnerabilidad al daño de ese conjuro. Si tiene resistencia o inmunidad, esta se suprime y en su lugar tiene vulnerabilidad al daño.\n- **Hoja mágica (Spellblade).** Puedes usar una acción para hacer un ataque con arma cuerpo a cuerpo y a la vez lanzar un conjuro de illrigger que conozcas con tiempo de lanzamiento de una acción.",
      n: 3
    },
    {
      nombre: "Versatilidad infernal (Hellish Versatility)",
      t: "pasiva",
      texto: "Una vez en cada uno de tus turnos, puedes lanzar uno de tus trucos de illrigger en lugar de uno de tus ataques otorgados por tu rasgo Ataque adicional.",
      n: 7
    },
    {
      nombre: "Interdicción de Asmodeo (Asmodeus's Interdiction)",
      t: "pasiva",
      texto: "Aprendes dones adicionales en niveles indicados que no cuentan para el límite de dones conocidos.\n\n**Sellos axiomáticos (Axiomatic Seals) (Nivel 7; Pasiva).** Cuando quemas uno o más sellos para infligir daño, puedes activar este don (no requiere acción) para añadir tu modificador por Carisma (mínimo 1) a la tirada de daño de cada sello.\n**Rompeconjuros (Spellbreaker) (Nivel 13).** Cuando una criatura interdicta a 60 pies o menos de ti lanza un conjuro, puedes usar tu reacción para quemar uno o más sellos sobre ella. Al hacerlo, el sello quemado no inflige daño y en su lugar lanzas *contrahechizo (counterspell)* sobre ella sin gastar espacio. El nivel de tu conjuro aumenta en 1 por cada sello adicional quemado después del primero.\n**Mago infernal (Hell Mage) (Nivel 18; Pasiva).** Cuando tú o un aliado a 30 pies o menos superan una salvación contra un conjuro o efecto mágico enemigo, puedes colocar inmediatamente uno o más sellos en ese enemigo, hasta un número igual a tu bonificador por competencia.",
      n: 7
    },
    {
      nombre: "Someter (Submit)",
      t: "pasiva",
      texto: "Cuando lanzas un conjuro de illrigger, puedes quemar dos sellos sobre una criatura interdicta (no requiere acción) para imponerle desventaja en su tirada de salvación contra el conjuro.",
      n: 11
    },
    {
      nombre: "Transmogrificación vil (Vile Transmogrification)",
      t: "adicional",
      texto: "Descubres dos formas de usar la magia de Asmodeo:\n- **Recuperar sellos.** Como acción adicional, puedes gastar un espacio de conjuro para recuperar un número de sellos igual al nivel de ese espacio.\n- **Recuperar espacios de conjuros.** Como acción adicional, puedes gastar cualquier cantidad de sellos para recuperar un espacio de conjuro de un nivel igual a un tercio de esa cantidad (ej. 6 sellos = espacio de nivel 2).\n\nUna vez que usas uno de estos beneficios, no puedes usar ESE beneficio de nuevo hasta que termines un descanso largo.",
      n: 15,
      usos: "1",
      reset: "largo"
    }
  ]
};
```

=== B ===

```json
{
  "niveles": {
    "1": { "pb": 2, "sellos": 3, "dano_sello": "1d6", "dones": 0, "dados_conducto": 0 },
    "2": { "pb": 2, "sellos": 3, "dano_sello": "1d6", "dones": 1, "dados_conducto": 0 },
    "3": { "pb": 2, "sellos": 4, "dano_sello": "1d6", "dones": 1, "dados_conducto": 0 },
    "4": { "pb": 2, "sellos": 4, "dano_sello": "1d6", "dones": 1, "dados_conducto": 0 },
    "5": { "pb": 3, "sellos": 4, "dano_sello": "2d6", "dones": 1, "dados_conducto": 0 },
    "6": { "pb": 3, "sellos": 4, "dano_sello": "2d6", "dones": 1, "dados_conducto": 3 },
    "7": { "pb": 3, "sellos": 5, "dano_sello": "2d6", "dones": 2, "dados_conducto": 4 },
    "8": { "pb": 3, "sellos": 5, "dano_sello": "2d6", "dones": 2, "dados_conducto": 4 },
    "9": { "pb": 4, "sellos": 5, "dano_sello": "2d6", "dones": 2, "dados_conducto": 5 },
    "10": { "pb": 4, "sellos": 5, "dano_sello": "2d6", "dones": 2, "dados_conducto": 5 },
    "11": { "pb": 4, "sellos": 5, "dano_sello": "3d6", "dones": 2, "dados_conducto": 6 },
    "12": { "pb": 4, "sellos": 5, "dano_sello": "3d6", "dones": 2, "dados_conducto": 6 },
    "13": { "pb": 5, "sellos": 6, "dano_sello": "3d6", "dones": 3, "dados_conducto": 7 },
    "14": { "pb": 5, "sellos": 6, "dano_sello": "3d6", "dones": 3, "dados_conducto": 7 },
    "15": { "pb": 5, "sellos": 6, "dano_sello": "3d6", "dones": 3, "dados_conducto": 8 },
    "16": { "pb": 5, "sellos": 6, "dano_sello": "3d6", "dones": 3, "dados_conducto": 8 },
    "17": { "pb": 6, "sellos": 6, "dano_sello": "3d6", "dones": 3, "dados_conducto": 9 },
    "18": { "pb": 6, "sellos": 7, "dano_sello": "3d6", "dones": 4, "dados_conducto": 9 },
    "19": { "pb": 6, "sellos": 7, "dano_sello": "3d6", "dones": 4, "dados_conducto": 10 },
    "20": { "pb": 6, "sellos": 7, "dano_sello": "4d6", "dones": 4, "dados_conducto": 10 }
  },
  "architect-of-ruin-spells": {
    "3": { "cantrips": 2, "spells_known": 3, "slot_1": 2, "slot_2": 0, "slot_3": 0, "slot_4": 0 },
    "4": { "cantrips": 2, "spells_known": 4, "slot_1": 3, "slot_2": 0, "slot_3": 0, "slot_4": 0 },
    "5": { "cantrips": 2, "spells_known": 4, "slot_1": 3, "slot_2": 0, "slot_3": 0, "slot_4": 0 },
    "6": { "cantrips": 2, "spells_known": 4, "slot_1": 3, "slot_2": 0, "slot_3": 0, "slot_4": 0 },
    "7": { "cantrips": 2, "spells_known": 5, "slot_1": 4, "slot_2": 2, "slot_3": 0, "slot_4": 0 },
    "8": { "cantrips": 2, "spells_known": 6, "slot_1": 4, "slot_2": 2, "slot_3": 0, "slot_4": 0 },
    "9": { "cantrips": 2, "spells_known": 6, "slot_1": 4, "slot_2": 2, "slot_3": 0, "slot_4": 0 },
    "10": { "cantrips": 3, "spells_known": 7, "slot_1": 4, "slot_2": 3, "slot_3": 0, "slot_4": 0 },
    "11": { "cantrips": 3, "spells_known": 8, "slot_1": 4, "slot_2": 3, "slot_3": 0, "slot_4": 0 },
    "12": { "cantrips": 3, "spells_known": 8, "slot_1": 4, "slot_2": 3, "slot_3": 0, "slot_4": 0 },
    "13": { "cantrips": 3, "spells_known": 9, "slot_1": 4, "slot_2": 3, "slot_3": 2, "slot_4": 0 },
    "14": { "cantrips": 3, "spells_known": 10, "slot_1": 4, "slot_2": 3, "slot_3": 2, "slot_4": 0 },
    "15": { "cantrips": 3, "spells_known": 10, "slot_1": 4, "slot_2": 3, "slot_3": 2, "slot_4": 0 },
    "16": { "cantrips": 3, "spells_known": 11, "slot_1": 4, "slot_2": 3, "slot_3": 3, "slot_4": 0 },
    "17": { "cantrips": 3, "spells_known": 11, "slot_1": 4, "slot_2": 3, "slot_3": 3, "slot_4": 0 },
    "18": { "cantrips": 3, "spells_known": 11, "slot_1": 4, "slot_2": 3, "slot_3": 3, "slot_4": 0 },
    "19": { "cantrips": 3, "spells_known": 12, "slot_1": 4, "slot_2": 3, "slot_3": 3, "slot_4": 1 },
    "20": { "cantrips": 3, "spells_known": 13, "slot_1": 4, "slot_2": 3, "slot_3": 3, "slot_4": 1 }
  },
  "usos": {
    "baleful-interdict": {
      "formula": "tabla:sellos",
      "reinicio": "corto"
    },
    "invoke-hell": {
      "formula": "1",
      "reinicio": "corto"
    },
    "infernal-conduit": {
      "formula": "tabla:dados_conducto",
      "reinicio": "largo"
    },
    "superior-interdict-regain": {
      "formula": "1",
      "reinicio": "largo"
    },
    "infernal-majesty": {
      "formula": "1",
      "reinicio": "largo"
    },
    "master-of-hell": {
      "formula": "1",
      "reinicio": "largo"
    },
    "vile-transmogrification-seals": {
      "formula": "1",
      "reinicio": "largo"
    },
    "vile-transmogrification-slots": {
      "formula": "1",
      "reinicio": "largo"
    }
  }
}
```

=== C ===

```json
{
  "illrigger": "Illrigger Revised (MCDM)",
  "architect-of-ruin": "Illrigger Revised (MCDM)"
}
```

=== D ===

```json
{
  "illrigger": "Caballeros, asesinos y comandantes del terror del Infierno. Sirven a los archidiablos empleando sellos mágicos para dañar e invocar condenas sobre sus presas.",
  "architect-of-ruin": "Caballeros arcanos fríos y calculadores que sirven a Asmodeo, desplegando conjuros mágicos, acero y subterfugios para manipular e infundir el terror en la mente de sus adversarios."
}
```

=== E ===

* **Lista de Conjuros de Architect of Ruin:** No generé JSONs de cada conjuro de D&D básico (PHB) incluido en la lista de la página 20 del PDF de origen, ya que normalmente el sistema mapea estos desde su propia base de datos (Ej: *bane*, *burning hands*, *shield*, etc.). Los conjuros exclusivos y creados especialmente para la clase ya fueron traducidos y entregados en la respuesta del **Lote 32b**.
* **Lote 32c:** Fue omitido ya que contenía exclusivamente texto legal de la licencia OGL v1.0a sin reglas ni mecánicas de juego.
* **Separación de Lotes:** Al procesar Lote 32a, se cubre la clase base *Illrigger* y la subclase *Architect of Ruin*, completando todo el material proporcionado inicialmente junto con el Lote 32b anterior.