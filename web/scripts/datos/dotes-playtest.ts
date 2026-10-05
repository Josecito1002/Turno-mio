/* Dotes de prueba de Unearthed Arcana (lotes 27 y 29 de Gemini): dotes de origen y épicas de Villainous Options y Underdark,
   Ceremorphosis (Mind Flayer) y las diez Wild Talent de The Psion. Material Playtest, no oficial todavía.
   Las usa `npm run db:actualizar-clase -- dotes`, que las suma a la biblioteca sin quitar ninguna. */
export const DOTES_PLAYTEST: Record<string, { n: string; t: string; texto: string; cat: string; nivelMin: number }> = {
 "lib:atoners-grace": {
  "n": "Gracia del Penitente",
  "t": "pasiva",
  "texto": "Obtienes los siguientes beneficios:\n- Disarming Mien: La actitud hostil de una criatura no te impone desventaja en tus pruebas de Carisma (Persuasión) para influenciar a esa criatura.\n- Parley: Cuando realizas la acción de Destrabarse o Influenciar, cada criatura de tu elección a 5 pies de ti tiene ventaja en la próxima prueba de característica o tirada de salvación que haga antes del inicio de tu próximo turno.",
  "cat": "Origen (Playtest)",
  "nivelMin": 1
 },
 "lib:raised-by-cultists": {
  "n": "Criado por Cultistas",
  "t": "reaccion",
  "texto": "Obtienes los siguientes beneficios:\n- Bloody Revelation: Cuando obtienes la condición de Ensangrentado, puedes usar una reacción para obtener Inspiración Heroica.\n- Communal Caster: Cuando un aliado a 5 pies de ti hace una tirada de salvación de Constitución para mantener la concentración, puedes usar una reacción para darle ventaja en la salvación.",
  "cat": "Origen (Playtest)",
  "nivelMin": 1
 },
 "lib:trapper": {
  "n": "Trampero",
  "t": "adicional",
  "texto": "Obtienes los siguientes beneficios:\n- Eye for Detail: Tienes ventaja en cualquier prueba de Inteligencia (Investigación) que hagas como parte de la acción de Estudiar.\n- Swift Tracker: No tienes desventaja en las pruebas de Sabiduría (Percepción o Supervivencia) mientras viajas a un ritmo Rápido, y tienes ventaja en dichas pruebas mientras viajas a un ritmo Normal.\n- Trap Expert: Puedes usar una acción adicional, en lugar de la acción de Utilizar, para colocar una trampa de caza. Cuando colocas una trampa de caza, añades tu bonificador por competencia a la CD de la tirada de salvación para evitar la trampa y a la CD de la prueba para escapar de ella.",
  "cat": "Origen (Playtest)",
  "nivelMin": 1
 },
 "lib:underhanded": {
  "n": "Solapado",
  "t": "reaccion",
  "texto": "Obtienes los siguientes beneficios:\n- Elusive: Inmediatamente después de tirar iniciativa, puedes moverte hasta 10 pies.\n- Fight Dirty: Cuando una criatura de un tamaño mayor al tuyo o más pequeña hace un ataque de oportunidad contra ti y falla, puedes usar una reacción para darle a esa criatura la condición de Derribado. Debes tener una mano libre para usar esta reacción.",
  "cat": "Origen (Playtest)",
  "nivelMin": 1
 },
 "lib:boon-of-the-bandit-king": {
  "n": "Don del Rey Bandido",
  "t": "pasiva",
  "texto": "Obtienes los siguientes beneficios:\n- Aumento de Puntuación de Característica: Incrementa una puntuación de característica de tu elección en 1, hasta un máximo de 30.\n- Dastardly Charm: Tienes ventaja en las pruebas de Destreza (Juego de Manos) para robar un bolsillo. Cuando tienes éxito en dicha prueba, puedes hacer que el objetivo de tu robo se separe voluntariamente del objeto y tenga la condición de Hechizado durante 1 minuto o hasta que reciba daño. Una vez que usas este beneficio, no puedes volver a usarlo hasta que termines un descanso corto o largo.\n- Uncatchable: No provocas ataques de oportunidad cuando te mueves fuera del alcance de una criatura.",
  "cat": "Épica (Playtest)",
  "nivelMin": 19
 },
 "lib:boon-of-the-cleansed-heart": {
  "n": "Don del Corazón Purificado",
  "t": "pasiva",
  "texto": "Obtienes los siguientes beneficios:\n- Aumento de Puntuación de Característica: Incrementa una puntuación de característica de tu elección en 1, hasta un máximo de 30.\n- Cleanse Heart: Puedes lanzar el conjuro Disipar el bien y el mal sin gastar un espacio de conjuro. No puedes usar la función especial de Despido del conjuro cuando lo lanzas de esta manera.\n- Radiant Reflection: Tienes inmunidad al daño necrótico. Cuando vayas a ser sometido a daño necrótico y no tengas la condición de Incapacitado, puedes infligir 2d8 de daño radiante a cada criatura de tu elección dentro de una emanación de 10 pies originada en ti.",
  "cat": "Épica (Playtest)",
  "nivelMin": 19
 },
 "lib:boon-of-the-hunters-eye": {
  "n": "Don del Ojo del Cazador",
  "t": "pasiva",
  "texto": "Obtienes los siguientes beneficios:\n- Aumento de Puntuación de Característica: Incrementa una puntuación de característica de tu elección en 1, hasta un máximo de 30.\n- Quick Capture: Cuando infliges daño a una criatura con la intención de dejarla inconsciente en lugar de matarla, si el objetivo tiene 20 puntos de golpe o menos después de infligir el daño, el objetivo se reduce a 0 puntos de golpe en su lugar.\n- Studied Hunter: Cuando tiras iniciativa, puedes elegir a una criatura que puedas ver; sabes si esa criatura tiene alguna Inmunidad, Resistencia o Vulnerabilidad, y si tiene alguna, sabes cuáles son.",
  "cat": "Épica (Playtest)",
  "nivelMin": 19
 },
 "lib:boon-of-unwavering-devotion": {
  "n": "Don de la Devoción Inquebrantable",
  "t": "reaccion",
  "texto": "Obtienes los siguientes beneficios:\n- Aumento de Puntuación de Característica: Incrementa una puntuación de característica de tu elección en 1, hasta un máximo de 30.\n- Possession Immunity: Tienes éxito automáticamente en las tiradas de salvación para evitar o terminar una posesión.\n- See Through Illusions: Las ilusiones visuales te parecen transparentes, y tienes éxito automáticamente en las tiradas de salvación contra ellas.\n- Undeniable Confidence: Inmediatamente después de que una criatura que puedas ver tenga éxito en una tirada de salvación de Sabiduría contra un efecto que hayas creado, puedes usar una reacción para forzar a esa criatura a volver a tirar la salvación, y debe usar la nueva tirada. Una vez que usas este beneficio, no puedes volver a usarlo hasta que tires iniciativa o termines un descanso corto o largo.",
  "cat": "Épica (Playtest)",
  "nivelMin": 19
 },
 "lib:tadpole-host": {
  "n": "Anfitrión de Renacuajo",
  "t": "pasiva",
  "texto": "Comienzas una relación simbiótica con un renacuajo azotamentes en tu cuerpo. Obtienes los siguientes beneficios:\n- Aumento de Puntuación de Característica: Incrementa tu Inteligencia en 1, hasta un máximo de 20.\n- Mind Sliver: Aprendes el truco Mind Sliver. La Inteligencia es tu aptitud mágica para este conjuro.\n- Psionic Power: Tienes un número de Dados de Energía Psiónica igual a tu bonificador por competencia. Cuando tomas esta dote, tu Dado de Energía Psiónica es un d6. Este dado cambia cuando tomas otras dotes de la senda Path of Ceremorphosis. Las características de esta senda solo utilizan estos dados, y no puedes usarlas si ya los has gastado todos. Recuperas todos los dados gastados cuando terminas un descanso largo.\n- Psionic Overload: Siempre que inflijas daño psíquico, puedes gastar un Dado de Energía Psiónica para tirarlo e infligir daño psíquico adicional igual al número obtenido.",
  "cat": "Ceremorphosis (Playtest)",
  "nivelMin": 4
 },
 "lib:illithid-thrallmaker": {
  "n": "Esclavizador Illithid",
  "t": "pasiva",
  "texto": "Obtienes los siguientes beneficios:\n- Aumento de Puntuación de Característica: Incrementa tu Inteligencia o Carisma en 1, hasta un máximo de 20.\n- Psionic Energy Dice: Los Dados de Energía Psiónica de esta senda se convierten en d8s.\n- Telepathy: Tienes telepatía con un alcance de 10 pies. Si ya la tenías, tu alcance aumenta en 10 pies.\n- Persuasive Presence: Siempre tienes preparado el conjuro Hechizar persona, siendo Inteligencia tu aptitud mágica. Puedes lanzarlo sin gastar espacio de conjuro gastando un Dado de Energía Psiónica, o usando cualquier espacio que tengas. Cuando gastas el dado para lanzarlo, tíralo. Un objetivo resta la mitad del número obtenido (redondeando hacia arriba) de su tirada de salvación contra el conjuro.",
  "cat": "Ceremorphosis (Playtest)",
  "nivelMin": 4
 },
 "lib:tadpoles-safeguard": {
  "n": "Resguardo del Renacuajo",
  "t": "reaccion",
  "texto": "Obtienes los siguientes beneficios:\n- Aumento de Puntuación de Característica: Incrementa tu Constitución o Inteligencia en 1, hasta un máximo de 20.\n- Psionic Energy Dice: Los Dados de Energía Psiónica de esta senda se convierten en d8s.\n- Telepathy: Tienes telepatía con un alcance de 10 pies (o aumenta en 10 pies si ya tenías).\n- Warding Backlash: Siempre tienes preparado el conjuro Escudo, siendo Inteligencia tu aptitud mágica. Puedes lanzarlo gastando un Dado de Energía Psiónica (o usando un espacio de conjuro). Cuando gastas el dado y causas que el ataque desencadenante falle, tíralo. El atacante recibe daño psíquico igual al número obtenido.",
  "cat": "Ceremorphosis (Playtest)",
  "nivelMin": 4
 },
 "lib:ulitharids-might": {
  "n": "Poder del Ulitharid",
  "t": "pasiva",
  "texto": "Obtienes los siguientes beneficios:\n- Aumento de Puntuación de Característica: Incrementa tu Fuerza, Destreza o Constitución en 1, hasta un máximo de 20.\n- Psionic Energy Dice: Los Dados de Energía Psiónica de esta senda se convierten en d8s.\n- Telepathy: Tienes telepatía con un alcance de 10 pies (o aumenta en 10 pies si ya tenías).\n- Extended Tentacles: Brotan dos largos tentáculos alrededor de tu boca que puedes usar para hacer un Ataque Desarmado. Cuando los usas, tu alcance aumenta en 5 pies.",
  "cat": "Ceremorphosis (Playtest)",
  "nivelMin": 4
 },
 "lib:full-ceremorphosis": {
  "n": "Ceremorfosis Completa",
  "t": "accion",
  "texto": "Obtienes los siguientes beneficios:\n- Aumento de Puntuación de Característica: Incrementa tu Inteligencia en 1, hasta un máximo de 20.\n- Psionic Energy Dice: Tus Dados de Energía Psiónica se convierten en d10s (o d12s si ya eran d10s).\n- Aberration: Tu tipo de criatura es Aberración.\n- Illithid Specialization: Elige uno de los siguientes beneficios (puedes tomar esta dote varias veces eligiendo opciones distintas):\n  - Brain-Seeking Tentacles: Al impactar con un Ataque Desarmado como parte de la acción de Atacar, puedes usar tanto la opción de Daño como la de Agarrar. Puedes gastar un Dado de Energía Psiónica para que el objetivo reciba daño psíquico extra igual al número obtenido más tu modificador de Inteligencia, y el objetivo resta la mitad del número obtenido (hacia arriba) de su salvación contra el agarre. Si el objetivo cae a 0 puntos de golpe por esto, el dado no se gasta. 1/turno.\n  - Mind Flayer Spells: Siempre tienes preparados Detectar pensamientos, Levitar y Mind Blast (conjuro nuevo que, como acción en un cono de 60 pies, inflige 6d8 de daño psíquico y Aturdimiento con salvación fallida de Inteligencia). Inteligencia es tu aptitud mágica. Puedes lanzarlos sin espacio gastando un Dado de Energía Psiónica o usando espacios apropiados.",
  "cat": "Ceremorphosis (Playtest)",
  "nivelMin": 12
 },
 "lib:atmokinesis": {
  "n": "Atmoquinesis",
  "t": "pasiva",
  "texto": "Requisito: no tener otra dote Wild Talent.\nLightning Jolt. Una vez por turno, cuando lanzas un conjuro o impactas con una tirada de ataque y causas daño contundente, perforante, cortante o psíquico, puedes cambiar el tipo de daño a relámpago.\nPsionic Talent. Conoces el truco Agarre electrizante y siempre tienes preparado el conjuro Nube de niebla. Puedes lanzarlo una vez sin gastar un espacio de conjuro, recuperando este uso al terminar un descanso largo, o usando cualquier espacio de conjuro adecuado. Cuando alcanzas el nivel 3 de personaje, siempre tienes preparado Ráfaga de viento y puedes lanzarlo de la misma forma. Al lanzar estos conjuros no requieres componentes verbales ni materiales, y tu aptitud mágica para ellos es Inteligencia, Sabiduría o Carisma (eliges al seleccionar esta dote).",
  "cat": "Wild Talent (Playtest)",
  "nivelMin": 1
 },
 "lib:biokinesis": {
  "n": "Bioquinesis",
  "t": "pasiva",
  "texto": "Requisito: no tener otra dote Wild Talent.\nBend Life Energy. Cuando un conjuro que lanzas restaura puntos de golpe a una criatura, puedes tirar 1d4 y añadir el resultado al total de puntos de golpe restaurados. Puedes usar este beneficio un número de veces igual a tu bonificador por competencia, y recuperas todos los usos al terminar un descanso largo.\nPsionic Talent. Conoces el truco Perdonar la vida y siempre tienes preparado el conjuro Palabra curadora. Al nivel 3 de personaje, también tienes preparado siempre Arcane Vigor (NUEVO). Puedes lanzar cada uno una vez sin gastar un espacio de conjuro (recuperas el uso tras un descanso largo) o utilizando los espacios de conjuro del nivel adecuado que poseas. Al lanzarlos, no requieren componentes verbales ni materiales, y eliges Inteligencia, Sabiduría o Carisma como tu aptitud mágica para ellos al seleccionar esta dote.",
  "cat": "Wild Talent (Playtest)",
  "nivelMin": 1
 },
 "lib:clairsentience": {
  "n": "Clarisentencia",
  "t": "pasiva",
  "texto": "Requisito: no tener otra dote Wild Talent.\nMinor Foreknowledge. Cuando realizas la acción de Buscar, puedes otorgarte ventaja en cualquier prueba de característica realizada como parte de esa acción. Puedes usar este beneficio una cantidad de veces igual a tu bonificador por competencia, recuperando los usos gastados al finalizar un descanso largo.\nPsionic Talent. Conoces el truco Orientación y siempre tienes preparado el conjuro Detectar el bien y el mal. Al alcanzar el nivel 3 de personaje, siempre tienes preparado Ver lo invisible. Puedes lanzar cada uno una vez sin usar un espacio de conjuro, recuperando este uso tras un descanso largo, o utilizando espacios de conjuro de nivel adecuado. No requieren componentes verbales ni materiales, y tu aptitud mágica para estos conjuros es Inteligencia, Sabiduría o Carisma (eliges al seleccionar la dote).",
  "cat": "Wild Talent (Playtest)",
  "nivelMin": 1
 },
 "lib:cryokinesis": {
  "n": "Crioquinesis",
  "t": "pasiva",
  "texto": "Requisito: no tener otra dote Wild Talent.\nIce Manipulation. Una vez por turno, cuando lanzas un conjuro o impactas con una tirada de ataque y causas daño contundente, perforante, cortante o psíquico, puedes cambiar el tipo de daño a frío.\nPsionic Talent. Conoces el truco Rayo de escarcha y siempre tienes preparados los conjuros Armadura de Agathys y Cuchillo de hielo. Puedes lanzar cada uno de estos conjuros una vez sin gastar un espacio de conjuro, recuperando su uso al terminar un descanso largo, o empleando cualquier espacio de conjuro que tengas. Estos conjuros no requieren componentes verbales ni materiales, y eliges Inteligencia, Sabiduría o Carisma como tu aptitud mágica al obtener la dote.",
  "cat": "Wild Talent (Playtest)",
  "nivelMin": 1
 },
 "lib:empath": {
  "n": "Empata",
  "t": "pasiva",
  "texto": "Requisito: no tener otra dote Wild Talent.\nEmotional Sense. Cuando realizas la acción de Influenciar, puedes otorgarte ventaja en cualquier prueba de característica que hagas como parte de dicha acción. Puedes usar este beneficio un número de veces igual a tu bonificador por competencia, recuperando los usos gastados al terminar un descanso largo.\nPsionic Talent. Siempre tienes preparado el conjuro Hechizar persona, y al nivel 3 de personaje siempre tienes preparado Contener emociones. Puedes lanzar cada conjuro una vez sin espacio de conjuro (recuperando el uso tras un descanso largo) o empleando espacios de conjuro del nivel apropiado. Estos conjuros no requieren componentes verbales, y tu aptitud mágica para ellos es Inteligencia, Sabiduría o Carisma (eliges al adquirir esta dote).",
  "cat": "Wild Talent (Playtest)",
  "nivelMin": 1
 },
 "lib:flesh-morpher": {
  "n": "Transformador de Carne",
  "t": "pasiva",
  "texto": "Requisito: no tener otra dote Wild Talent.\nFlexible Flesh. Cuando realizas una prueba de Destreza (Acrobacias o Juego de manos), ganas un bonificador igual a tu modificador por Inteligencia (mínimo de +1). Puedes usar este beneficio una cantidad de veces igual a tu bonificador por competencia, y recuperas todos los usos tras un descanso largo.\nPsionic Talent. Siempre tienes preparado el conjuro Zancada prodigiosa, y al alcanzar el nivel 3 de personaje siempre tienes preparado Alterar el propio aspecto. Puedes lanzar cada conjuro una vez sin usar un espacio de conjuro, recuperando el uso al finalizar un descanso largo, o utilizando espacios de conjuro adecuados. Estos conjuros no requieren componentes verbales, y tu aptitud mágica es Inteligencia, Sabiduría o Carisma (eliges al seleccionar la dote).",
  "cat": "Wild Talent (Playtest)",
  "nivelMin": 1
 },
 "lib:mind-whisperer": {
  "n": "Susurrador Mental",
  "t": "accion",
  "texto": "Requisito: no tener otra dote Wild Talent.\nLimited Telepathy. Como acción mágica, eliges a una criatura que puedas ver a 120 pies o menos de ti para formar una conexión telepática durante 1 hora. Mientras estéis a 120 pies o menos el uno del otro, podéis comunicaros telepáticamente, debiendo usar mentalmente un idioma que el otro conozca para que podáis entenderos. Una vez que usas este beneficio, no puedes volver a hacerlo hasta terminar un descanso corto o largo.\nPsionic Talent. Conoces el truco Astilla mental y siempre tienes preparado Susurros discordantes. Puedes lanzarlo una vez sin gastar un espacio de conjuro (recuperas el uso al terminar un descanso largo) o empleando espacios de conjuro que poseas. No requieren componentes verbales ni materiales, y tu aptitud mágica es Inteligencia, Sabiduría o Carisma (eliges al obtener la dote).",
  "cat": "Wild Talent (Playtest)",
  "nivelMin": 1
 },
 "lib:psi-trickster": {
  "n": "Embaucador Psi",
  "t": "pasiva",
  "texto": "Requisito: no tener otra dote Wild Talent.\nCunning Mind. Cuando haces una prueba de Carisma (Engaño o Persuasión), obtienes un bonificador igual a tu modificador por Inteligencia (bonificador mínimo de +1). Puedes usar este beneficio un número de veces igual a tu bonificador por competencia, recuperando los usos gastados al terminar un descanso largo.\nPsionic Talent. Conoces el truco Ilusión menor y siempre tienes preparado el conjuro Disfrazarse. Puedes lanzarlo una vez sin gastar un espacio de conjuro, recuperando este uso al finalizar un descanso largo, o usando cualquier espacio de conjuro que tengas. Estos conjuros no requieren componentes verbales ni materiales, y eliges Inteligencia, Sabiduría o Carisma como tu aptitud mágica al seleccionar la dote.",
  "cat": "Wild Talent (Playtest)",
  "nivelMin": 1
 },
 "lib:psykineticist": {
  "n": "Psicoquinetista",
  "t": "pasiva",
  "texto": "Requisito: no tener otra dote Wild Talent.\nPsi Boost. Cuando realizas la acción de Correr, puedes aumentar tu Velocidad en 10 pies hasta el inicio de tu próximo turno. Puedes usar esto un número de veces igual a tu bonificador por competencia, y recuperas todos los usos gastados al terminar un descanso largo.\nPsionic Talent. Conoces el truco Telekinetic Fling (NUEVO) y siempre tienes preparado el conjuro Onda atronadora. Puedes lanzarlo una vez sin espacio de conjuro, recuperando su uso al terminar un descanso largo, o empleando cualquier espacio de conjuro que poseas. Al lanzarlos, no requieren componentes verbales, y tu aptitud mágica es Inteligencia, Sabiduría o Carisma (eliges al tomar esta dote).",
  "cat": "Wild Talent (Playtest)",
  "nivelMin": 1
 },
 "lib:pyrokinesis": {
  "n": "Piroquinesis",
  "t": "pasiva",
  "texto": "Requisito: no tener otra dote Wild Talent.\nFirestarter. Una vez por turno, cuando lanzas un conjuro o impactas con una tirada de ataque y causas daño contundente, perforante, cortante o psíquico, puedes cambiar el tipo de daño a fuego.\nPsionic Talent. Conoces el truco Producir llama y siempre tienes preparado el conjuro Manos ardientes. Al llegar al nivel 3 de personaje, también tienes preparado siempre Rayo abrasador. Puedes lanzar cada conjuro una vez sin usar un espacio de conjuro (recuperando el uso tras un descanso largo) o utilizando espacios de conjuro del nivel adecuado. Estos conjuros no requieren componentes verbales ni materiales, y tu aptitud mágica es Inteligencia, Sabiduría o Carisma (eliges al seleccionarla).",
  "cat": "Wild Talent (Playtest)",
  "nivelMin": 1
 }
};
