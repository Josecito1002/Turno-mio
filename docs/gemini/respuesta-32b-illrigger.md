=== A ===
```typescript
export const hellspeaker = {
  n: 3,
  rasgos: [
    {
      nombre: "Turncoat (Chaquetero)",
      t: "accion",
      texto: "Como acción, usas tu lengua manipuladora contra tus enemigos. Eliges un número de criaturas enemigas hasta tu bonificador por competencia a 60 pies o menos de ti que puedan escucharte. Cada objetivo debe superar una tirada de salvación de Carisma o usar su reacción para hacer un ataque con arma contra un único objetivo de tu elección. Una criatura afectada por este rasgo no puede atacarse a sí misma.\nSi este ataque falla o esta tirada de salvación falla, la criatura tiene desventaja en la siguiente tirada de ataque o tirada de salvación que haga. Esta desventaja no puede ser cancelada con ventaja de ninguna manera. Una criatura solo puede hacer un trato contigo a la vez.\nPuedes usar este rasgo un número de veces igual a tu bonificador por competencia. Recuperas todos los usos gastados cuando terminas un descanso largo.",
      n: 3,
      usos: "PB",
      reset: "largo"
    },
    {
      nombre: "Interdicción de Moloch (Moloch's Interdiction)",
      t: "pasiva",
      texto: "Aprendes los siguientes dones de interdicción adicionales en los niveles de illrigger indicados. Una vez que aprendes un don de interdicción otorgado por este rasgo, siempre lo conoces y no cuenta para el número de dones de interdicción que conoces.\n\n**Red Cant (Nivel 7).** Cuando haces una prueba de Carisma, puedes gastar un sello para tratar una tirada de d20 de 9 o menos como un 10.\n**Slippery Ploy (Nivel 13).** Cuando una criatura te elige como objetivo con un ataque, conjuro u otro efecto mágico, puedes colocarle un sello como reacción y obligar a la criatura a hacer una tirada de salvación de Carisma. Si falla la salvación, la criatura debe elegir un nuevo objetivo o perder el ataque o efecto.\n**Incontrovertible (Nivel 18; Pasiva).** Las criaturas interdictas tienen desventaja en las tiradas de salvación de Sabiduría y Carisma.",
      n: 7
    },
    {
      nombre: "Intransigente (Intransigent)",
      t: "pasiva",
      texto: "Tú y cada criatura de tu elección a 10 pies o menos de ti sois inmunes a la condición de Hechizado mientras estés consciente.",
      n: 11
    },
    {
      nombre: "Hagamos un trato (Let's Make a Deal)",
      t: "adicional",
      texto: "Puedes ofrecerles un trato a tus aliados, por un precio, por supuesto. Como acción adicional, eliges a un aliado voluntario a 60 pies o menos de ti que pueda escucharte. Una vez dentro de los siguientes 10 minutos, la criatura puede elegir obtener ventaja en una tirada de ataque o tirada de salvación que haga y puede sumar un bonificador igual a tu bonificador por competencia a la misma tirada. Si este ataque impacta o esta tirada de salvación tiene éxito, la criatura obtiene puntos de golpe temporales iguales a tu nivel de illrigger. Si este ataque falla o esta tirada de salvación falla, la criatura tiene desventaja en la siguiente tirada de ataque o tirada de salvación que haga. Esta desventaja no puede ser cancelada con ventaja de ninguna manera. Una criatura solo puede hacer un trato contigo a la vez.\nPuedes usar este rasgo un número de veces igual a tu bonificador por competencia. Recuperas todos los usos gastados cuando terminas un descanso largo.",
      n: 11,
      usos: "PB",
      reset: "largo"
    },
    {
      nombre: "Quid Pro Quo",
      t: "accion",
      texto: "Puedes susurrar a las legiones del Infierno, atrapando a enemigos y llamando a aliados. Como acción, puedes intentar desterrar a una criatura que puedas ver a 30 pies o menos de ti. El objetivo debe superar una tirada de salvación de Carisma. Si falla la salvación, el objetivo es desterrado a los yermos del Infierno por 1 minuto, tras lo cual regresa al espacio desocupado más cercano al que dejó. Un objetivo desterrado de esta manera puede repetir la tirada de salvación al final de cada uno de sus turnos, terminando el efecto de forma anticipada si tiene éxito.\nUna criatura que tiene éxito en una tirada de salvación contra este efecto se vuelve inmune a tu Quid Pro Quo durante 24 horas.\nAdemás, cuando un objetivo es desterrado de esta forma, un jurista diabólico (devil jurist) o un diablo cornudo (horned devil) aparece en su lugar. Este diablo actúa como un aliado tuyo y sigue tus órdenes hasta que la criatura desterrada deje de estarlo, momento en el cual el diablo desaparece.\nUna vez que destierras con éxito a una criatura de esta manera, no puedes usar este rasgo de nuevo hasta que termines un descanso largo.",
      n: 15,
      usos: "1",
      reset: "largo"
    }
  ]
};

export const painkiller = {
  n: 3,
  rasgos: [
    {
      nombre: "Preceptos del Orgullo (Precepts of Pride)",
      t: "pasiva",
      texto: "Las tropas de choque pesadas de Dispater deben ser comandantes eficaces en el campo de batalla y despachar rápidamente a los enemigos. Los Asesinos del Dolor (Painkillers) siguen preceptos que les instruyen para liderar a los ejércitos del Infierno y librar la guerra contra el Bien en todo el tiempo-espacio.\n- **Liderar desde el frente (Lead from the Front).** Cargo al frente en cada batalla, inspirando a mis soldados y aterrorizando a mis enemigos.\n- **Comandante (Commander).** A donde quiera que voy, yo mando. No recibo órdenes de aquellos que no tienen la voluntad de liderar.\n- **Victoria a cualquier precio (Victory at Any Cost).** Respeto al líder enemigo y lo trato con honor. Pero una vez que se desenvainan las espadas, uso cada truco de mi arsenal para ganar, esperando que ellos hagan lo mismo.\n- **Los soldados mueren (Soldiers Die).** No me importan las vidas de mis soldados, ya que son recursos que gasto para asegurar mi victoria.",
      n: 3
    },
    {
      nombre: "Bendición de Dispater (Dispater's Blessing)",
      t: "pasiva",
      texto: "Cuando Dispater te acepta como su illrigger, obtienes competencia con armaduras pesadas.",
      n: 3
    },
    {
      nombre: "Devastador (Devastator)",
      t: "accion",
      texto: "Como acción, invocas la autoridad de Dispater. Haces un ataque con arma y eliges un número de criaturas voluntarias hasta tu bonificador por competencia que puedas ver a 30 pies o menos de ti. Cada criatura que elijas puede usar una reacción para hacer un ataque con arma o lanzar un truco que inflija daño con un tiempo de lanzamiento de 1 acción.\nUna vez que usas esta acción, no puedes usarla de nuevo hasta que termines un descanso corto o largo.",
      n: 3,
      usos: "1",
      reset: "corto"
    },
    {
      nombre: "Invocar al Infierno (Invoke Hell)",
      t: "pasiva",
      texto: "Obtienes las siguientes dos opciones de Invocar al Infierno (Invoke Hell):\n- **Gran estratega (Grand Strategist).** Puedes ordenar a tus aliados que sigan tu formación (no requiere acción). Elige a una o más criaturas a 60 pies o menos de ti que puedan escucharte, hasta un número de criaturas igual a tu bonificador por competencia. Cada objetivo puede mover inmediatamente hasta la mitad de su velocidad sin provocar ataques de oportunidad.\n- **Castigo (Punishment).** Cuando una criatura te daña con un ataque, puedes usar tu reacción para obligar al atacante a hacer una tirada de salvación de Sabiduría. Si falla la salvación, el atacante sufre daño necrótico igual al daño que te infligió con el ataque desencadenante. Si tiene éxito en la salvación, el atacante sufre la mitad de daño.",
      n: 3
    },
    {
      nombre: "Interdicción de Dispater (Dispater's Interdiction)",
      t: "pasiva",
      texto: "Aprendes los siguientes dones de interdicción adicionales en los niveles de illrigger indicados. Una vez que aprendes un don de interdicción otorgado por este rasgo, siempre lo conoces y no cuenta para el número de dones de interdicción que conoces.\n\n**Sello telequinético (Telekinetic Seal) (Nivel 7).** Cuando una criatura que puedes ver se mueve a 5 pies o menos de ti, puedes usar tu reacción para colocarle un sello. Al hacerlo, el objetivo debe superar una tirada de salvación de Sabiduría o ser empujado 15 pies hacia atrás o ser derribado (tumbado) (a tu elección).\n**Por la garganta (By the Throat) (Nivel 13).** Cuando usas una acción adicional para colocar o mover un sello en una criatura que no es más de un tamaño mayor que el tuyo, debe superar una tirada de salvación de Sabiduría o quedar Apresada (restrained) hasta el final de su siguiente turno.\n**Supremacía de Dispater (Dispater's Supremacy) (Nivel 18; Pasiva).** Tus ataques contra criaturas interdictas asestan un golpe crítico con una tirada de 18 a 20.",
      n: 7
    },
    {
      nombre: "¡Mueres bajo mis órdenes! (You Die on My Command!)",
      t: "reaccion",
      texto: "Cuando un aliado a 30 pies o menos de ti que pueda escucharte cae a 0 puntos de golpe sin morir en el acto, puedes usar tu reacción para gritarle una orden, haciendo que caiga a 1 punto de golpe en su lugar. Una vez que usas esta reacción, no puedes volver a hacerlo hasta que termines un descanso corto o largo.",
      n: 11,
      usos: "1",
      reset: "corto"
    },
    {
      nombre: "Golpe mortal (Deathstrike)",
      t: "reaccion",
      texto: "Cuando impactas a una criatura interdicta con un ataque con arma cuerpo a cuerpo, puedes usar tu reacción para quemar uno de los sellos sobre ella para convertir el impacto en un golpe crítico. Al hacerlo, también duplicas los dados de daño que tiras para el sello quemado.\nPuedes usar esta reacción un número de veces igual a tu bonificador por competencia, y recuperas todos los usos gastados cuando terminas un descanso largo.",
      n: 15,
      usos: "PB",
      reset: "largo"
    }
  ]
};

export const sanguineKnight = {
  n: 3,
  rasgos: [
    {
      nombre: "Preceptos de la Sangre (Precepts of Blood)",
      t: "pasiva",
      texto: "Los Caballeros Sanguinos juran lealtad a Sutekh cuando se unen a la Orden de la Desolación. Estos dogmas les comprometen a esgrimir magia de sangre profana, comandar lealtad e infligir terror.\n- **Su fuerza es su debilidad (Their Strength Is Their Weakness).** Tomo como objetivo al más fuerte de mis enemigos, pues su vitalidad alimentará mi victoria.\n- **El pecado exige sufrimiento (Sin Demands Suffering).** Oponerse a mí es herejía. Antes de que mis enemigos saboreen la derrota, deben pagar por su incredulidad con agonía.\n- **Lealtad recompensada (Loyalty Rewarded).** Mis bendiciones llevan a mis aliados a depender de mí, y del derramamiento de sangre que me fortalece.\n- **La piedad es poder (Mercy Is Power).** Al conceder socorro a mis aliados, demuestro cuán grande es mi poder. Cada vez que restauro vida, sirve como recordatorio de lo rápido que puedo arrebatarla.",
      n: 3
    },
    {
      nombre: "Desangrar (Exsanguinate)",
      t: "pasiva",
      texto: "Puedes drenar a los enemigos para envalentonar a tus aliados. Siempre que quemes uno o más sellos en una criatura que no sea un Constructo o un Muerto viviente, puedes elegir a un aliado que puedas ver a 30 pies o menos de ti. Ese aliado obtiene puntos de golpe temporales iguales al daño infligido por los sellos a la criatura interdicta.",
      n: 3
    },
    {
      nombre: "Bendición de Sutekh (Sutekh's Blessing)",
      t: "accion",
      texto: "Cuando Sutekh te acepta como su illrigger, te otorga acceso a su sacrílego dominio de la sangre y la vida. Obtienes competencia en la habilidad Religión.\nAdemás, como acción, puedes expandir tu consciencia de la vida a tu alrededor. Hasta el final de tu siguiente turno, puedes sentir a las criaturas que tienen sangre a 120 pies o menos de ti sin tener que verlas. Esta aptitud puede penetrar la mayoría de las barreras, pero es bloqueada por 1 pie de piedra, 1 pulgada de metal común, una fina lámina de plomo, o 3 pies de madera o tierra. Conoces la distancia y la dirección de cada criatura, así como su tipo de criatura. Puedes usar este rasgo un número de veces igual a tu bonificador por competencia, y recuperas todos los usos gastados cuando terminas un descanso largo.",
      n: 3,
      usos: "PB",
      reset: "largo"
    },
    {
      nombre: "Invocar al Infierno (Invoke Hell)",
      t: "pasiva",
      texto: "Obtienes las siguientes dos opciones de Invocar al Infierno (Invoke Hell):\n- **Envalentonar aliados (Embolden Allies).** Como acción adicional, restauras un número total de puntos de golpe igual a cinco veces tu nivel de illrigger, divididos como elijas entre tú mismo y otras criaturas a 30 pies o menos de ti.\n- **Vitalizar (Vitalize).** Puedes inundar a tus aliados con una vivacidad estimulante (no requiere acción). Durante 1 minuto, cada criatura de tu elección a 30 pies o menos de ti obtiene un bonificador a las pruebas de característica igual a tu bonificador por competencia.",
      n: 3
    },
    {
      nombre: "Interdicción de Sutekh (Sutekh's Interdiction)",
      t: "pasiva",
      texto: "Aprendes los siguientes dones de interdicción adicionales en los niveles de illrigger indicados. Una vez que aprendes un don de interdicción otorgado por este rasgo, siempre lo conoces y no cuenta para el número de dones de interdicción que conoces.\n\n**Intercambio asqueroso (Foul Interchange) (Nivel 7).** Como acción, eliges a una criatura que puedas ver a 30 pies o menos de ti y gastas un sello para terminar con una de las siguientes condiciones que le aflijan: Cegado, Hechizado, Aturdido (dazed), Sordo, Asustado, Paralizado o Envenenado. Otra criatura que puedas ver a 60 pies o menos de ti debe superar una tirada de salvación de Constitución o sufrir esa misma condición hasta el final de tu siguiente turno. Si esa criatura es inmune a la condición, no la sufre, pero la condición termina para la criatura original.\n**Don sanguino (Sanguine Gift) (Nivel 13).** Cuando una criatura que puedas ver a 30 pies o menos de ti recupera puntos de golpe, puedes gastar un sello (no requiere acción) y la criatura recupera puntos de golpe adicionales iguales a tu nivel de illrigger.\n**Ojo por ojo (Blood for Blood) (Nivel 18; Pasiva).** Siempre que un aliado reciba daño de una criatura interdicta, esa criatura interdicta sufre daño necrótico igual a tu bonificador por competencia.",
      n: 7
    },
    {
      nombre: "Golpe de sangre (Bloodstroke)",
      t: "pasiva",
      texto: "La magia que protege a tus aliados ahora también drena la fuerza de sus enemigos. Cuando un aliado que tiene puntos de golpe temporales por tu rasgo Desangrar (Exsanguinate) es impactado por un ataque cuerpo a cuerpo, el atacante sufre daño de frío, fuego o necrótico (tu elección) igual a tu nivel de illrigger.",
      n: 11
    },
    {
      nombre: "Intercambio hemal (Haemal Exchange)",
      t: "reaccion",
      texto: "Has dominado la capacidad de enervar a los enemigos y dotar a los aliados. Cuando una criatura interdicta a 60 pies o menos de ti hace una tirada de ataque o una tirada de salvación, puedes usar tu reacción para quemar uno de los sellos sobre ella y transferir su poder. El objetivo debe tirar un d8 y restar el número sacado de la tirada de ataque o tirada de salvación desencadenante.\nLuego potencias a un aliado a 30 pies o menos de ti. La próxima vez que ese aliado haga una tirada de ataque o una tirada de salvación, tirará un d8 y sumará el número sacado a la tirada de ataque o tirada de salvación.",
      n: 15
    }
  ]
};

export const shadowmaster = {
  n: 3,
  rasgos: [
    {
      nombre: "Preceptos de las Sombras (Precepts of Shadow)",
      t: "pasiva",
      texto: "Los Maestros de las Sombras juran lealtad a Belial cuando se unen a la Orden de la Desolación. Estos preceptos les comprometen a servir a los enemigos de Belial como aliados antes de revelarse como enemigos.\n- **Planes dentro de planes (Plans Within Plans).** Mis enemigos nunca deben descubrir mis verdaderas metas. Si es necesario, me sacrificaré para proteger mis intrigas.\n- **Posiciones de poder (Positions of Power).** Lo controlo todo desde las sombras sabiendo a quién engañar y dónde esconderme a plena vista.\n- **El poder en la paciencia (Power in Patience).** Estudio a mi enemigo y metódicamente construyo su confianza. Mi lealtad debe ser incuestionable para que mi inevitable traición sea impensable.\n- **Dudar es fracasar (Hesitation Is Failure).** Aunque suelo depender de agentes, cuando se presenta la oportunidad, puedo matar sin dudarlo con eficiencia y precisión.",
      n: 3
    },
    {
      nombre: "Marcado para morir (Marked for Death)",
      t: "pasiva",
      texto: "Eres particularmente hábil contra los enemigos que marcas para morir. Tienes ventaja en tu primer ataque contra una criatura interdicta en cada uno de tus turnos.",
      n: 3
    },
    {
      nombre: "Golpe desde la oscuridad (Strike from the Dark)",
      t: "pasiva",
      texto: "Comprendes el poder de golpear desde las sombras. Una vez por turno, cuando impactas a una criatura interdicta con un ataque con arma cuerpo a cuerpo y tienes ventaja en la tirada de ataque, puedes tirar una cantidad de d4s igual a tu bonificador por competencia e infligir daño adicional igual al total que sacaste. Este daño aumenta en 1d4 si el objetivo está en luz tenue o en la oscuridad.",
      n: 3
    },
    {
      nombre: "Invocar al Infierno (Invoke Hell)",
      t: "pasiva",
      texto: "Obtienes las siguientes dos opciones de Invocar al Infierno (Invoke Hell):\n- **Maestro del disfraz (Master of Disguise).** Como acción, puedes lanzar el conjuro *disfrazarse* (disguise self) sin gastar un espacio de conjuro.\n- **Sin escapatoria (No Escape).** Como acción adicional, puedes recurrir a las sombras para atrapar a una criatura que puedas ver a 30 pies o menos de ti. El objetivo debe hacer una tirada de salvación de Carisma, que se hace con desventaja si está en luz tenue o en la oscuridad. Si falla la salvación, la velocidad del objetivo se reduce a la mitad y no puede moverse voluntariamente a más de 30 pies lejos de ti. Este efecto termina para el objetivo si estás incapacitado o mueres, o si el objetivo está a más de 30 pies de distancia de ti.",
      n: 3
    },
    {
      nombre: "Interdicción de Belial (Belial's Interdiction)",
      t: "pasiva",
      texto: "Aprendes los siguientes dones de interdicción adicionales en los niveles de illrigger indicados. Una vez que aprendes un don de interdicción otorgado por este rasgo, siempre lo conoces y no cuenta para el número de dones de interdicción que conoces.\n\n**Velo de mentiras (Veil of Lies) (Nivel 7).** Como acción adicional, puedes gastar un sello para volverte invisible durante 10 minutos o hasta que ataques o lances un conjuro.\n**Asesino del Infierno (Hell's Assassin) (Nivel 13; Pasiva).** Siempre que saques un 1 o un 2 en un dado para determinar el daño de tus sellos o de tus ataques con armas contra criaturas interdictas, puedes volver a tirar el dado y debes usar la nueva tirada.\n**Maldición oscura (Dark Malediction) (Nivel 18; Pasiva).** Las criaturas interdictas irradian oscuridad en un radio de 10 pies. Las fuentes de luz mundana no pueden iluminar esta oscuridad, pero las criaturas con visión en la oscuridad pueden ver a través de ella. Si parte de esta oscuridad se superpone con un área de luz creada por magia o psiónica, el área superpuesta de oscuridad es iluminada por la luz.",
      n: 7
    },
    {
      nombre: "Asesino umbrío (Umbral Killer)",
      t: "pasiva",
      texto: "Las sombras son tus compañeras, ayudándote en tus hazañas. Obtienes los siguientes beneficios:\n- Obtienes visión en la oscuridad a 60 pies. Si ya tienes visión en la oscuridad, su alcance aumenta en 60 pies.\n- Tu velocidad de movimiento aumenta en 10 pies.\n- Tienes ventaja en las pruebas de Destreza (Sigilo) que hagas para esconderte. Siempre que hagas una tirada de salvación de Destreza para sufrir solo la mitad de daño de un efecto, en su lugar no sufres ningún daño si tienes éxito en la tirada de salvación, y sufres la mitad de daño si fallas.",
      n: 11
    },
    {
      nombre: "Condenado a las sombras (Doomed to the Shadows)",
      t: "reaccion",
      texto: "Has perfeccionado tu golpe de asesino. El daño adicional de tu rasgo Golpe desde la oscuridad (Strike from the Dark) aumenta a un número de d8s igual a tu bonificador por competencia (en lugar de ese número de d4s), e infliges 2d8 de daño adicional si el objetivo está en luz tenue o en la oscuridad (en lugar de 1d4 de daño adicional).\nAdemás, cuando infliges daño usando Golpe desde la oscuridad, puedes usar tu reacción para quemar un sello en la criatura, causándole la condición de Cegado durante 1 minuto en lugar de infligir el daño del sello.",
      n: 15
    }
  ]
};

export const opcionesIllrigger = {
  "Sello atenuante (Abating Seal)": "Cuando una criatura que puedes ver te daña a ti o a un aliado a 30 pies o menos de ti, puedes gastar un sello como reacción para reducir el daño recibido por el objetivo en una cantidad igual a 1d10 + la mitad de tu nivel de illrigger (redondeado hacia abajo).",
  "Atormentar (Bedevil)": "Cuando quemas un sello en una criatura interdicta, puedes activar este don (no requiere acción). El objetivo debe restar un número igual a tu bonificador por competencia del resultado de la próxima tirada de salvación que haga antes del final de su siguiente turno.",
  "Devorador de almas (Soul Eater)": "Cuando quemas un sello en una criatura interdicta, puedes activar este don (no requiere acción) para obtener puntos de golpe temporales iguales a tu nivel de illrigger.",
  "Apatía de la Estigia (Styx's Apathy)": "Cuando quemas un sello en una criatura interdicta, puedes usar tu reacción para inundar al objetivo con un frío de otro mundo. Hasta el final del siguiente turno del objetivo, este no puede usar reacciones.",
  "Retribución rápida (Swift Retribution) [Pasiva]": "Cuando una criatura interdicta provoca un ataque de oportunidad tuyo, puedes hacer ese ataque sin usar tu reacción, siempre y cuando no estés incapacitado. Una vez que te beneficias de este don, no puedes volver a hacerlo hasta el comienzo de tu siguiente turno.",
  "Cadena de Aqueronte (Acheron's Chain)": "[Nivel 7] Cuando usas una acción adicional para colocar o mover un sello en una criatura Grande o más pequeña, puedes activar este don (no requiere acción). Conjuras cadenas infernales para que agarren al objetivo, obligándole a hacer una tirada de salvación de Fuerza. Si falla, puedes tirar de la criatura 10 pies hacia ti o hacer que quede Apresada (grappled) hasta el final de tu siguiente turno (CD de escape igual a tu CD de salvación de interdicción).",
  "Canal conflagrante (Conflagrant Channel)": "[Nivel 7] Puedes gastar un sello como acción adicional para teletransportarte hasta 60 pies a un espacio desocupado que puedas ver.",
  "Ojos de la Puerta (Eyes of the Gate)": "[Nivel 7] Como acción, puedes gastar uno o más sellos para intentar vincular tu consciencia a una criatura que puedas ver a 60 pies o menos de ti. El objetivo debe hacer una tirada de salvación de Sabiduría; puede fallar voluntariamente esta salvación. Si falla, quedas vinculado a la consciencia del objetivo durante un número de horas igual al número de sellos que gastaste, o hasta que uses este don en otra criatura. Durante este tiempo, mientras el objetivo esté a 300 pies o menos de ti, puedes usar una acción para ver y escuchar a través de sus sentidos, obteniendo el beneficio de cualquier sentido especial que posea el objetivo, y continúas haciéndolo hasta que uses tu acción para regresar a tus propios sentidos. Mientras percibes a través de los sentidos del objetivo, estás sordo y cegado con respecto a tus propios sentidos.\nAdemás, durante este tiempo, puedes colocar sellos, quemarlos y usar dones de interdicción como si estuvieras en el espacio de la criatura, pero hacerlo hace que la criatura sea consciente de este vínculo. Una criatura consciente puede usar su acción para repetir la tirada de salvación, terminando los efectos de este don si tiene éxito.",
  "Sudario de sombras (Shadow Shroud)": "[Nivel 7] Puedes gastar un sello como acción adicional para tejer un manto de sombras semisólidas alrededor de ti mismo o de una criatura que toques. El objetivo obtiene un bonificador de +2 a la CA durante 1 minuto.",
  "Desatar el infierno (Unleash Hell)": "[Nivel 7] Cuando quemas uno o más sellos en una criatura interdicta, puedes usar tu reacción para desatar una explosión de energía infernal a su alrededor. Cada criatura de tu elección a 5 pies o menos del objetivo debe hacer una tirada de salvación de Destreza. Si falla, una criatura sufre la misma cantidad y tipo de daño que los sellos infligieron a la criatura interdicta. Si tiene éxito, una criatura sufre la mitad de daño.",
  "Disparo vengativo (Vengeful Shot)": "[Nivel 7] Cuando una criatura hace un ataque a distancia contra ti o contra un aliado que puedas ver a 30 pies o menos de ti, puedes gastar un sello como reacción para hacer un ataque con arma a distancia contra el atacante. Si tu ataque impacta, inflige un daño adicional igual a la mitad de tu nivel de illrigger (redondeado hacia abajo).",
  "Embate de Dite (Dis's Onslaught) [Pasiva]": "[Nivel 13] Cada vez que usas una acción adicional para colocar o mover un sello, puedes hacer un ataque con arma como parte de la misma acción adicional.",
  "Destello de azufre (Flash of Brimstone)": "[Nivel 13] Cuando colocas o mueves un sello, puedes activar este don (no requiere acción) para teletransportarte mágicamente a un espacio desocupado que puedas ver a 5 pies o menos del objetivo.",
  "Frenesí infernal (Hellish Frenzy)": "[Nivel 13] Cuando comienzas tu turno a 30 pies o menos de una criatura interdicta, puedes gastar un sello para volverte frenético por el poder del Infierno hasta el comienzo de tu siguiente turno. Mientras estés frenético, tu velocidad de movimiento se duplica, tienes un bonificador de +2 a tu CA y puedes hacer un ataque con arma extra cuando tomas la acción de Atacar.",
  "Visión infernal (Hellsight)": "[Nivel 13] Puedes gastar un sello como acción para obtener visión verdadera a 60 pies durante 1 hora.",
  "Disparo empalador (Impaling Shot)": "[Nivel 13] Cuando impactas a una criatura interdicta con un ataque con arma a distancia, puedes gastar un sello como acción adicional para crear un punto débil en sus defensas. Hasta el final de tu siguiente turno, la criatura sufre un penalizador a su CA igual a tu bonificador por competencia.",
  "Cárcel de hierro (Iron Gaol)": "[Nivel 13] Como acción, puedes tocar a una criatura y gastar cuatro sellos para intentar enviar a esa criatura al Infierno. El objetivo debe superar una tirada de salvación de Carisma o ser arrastrado a través de una falla hacia las prisiones de la ciudad infernal de tu archidiablo. Si el objetivo es nativo del Infierno, o si su nivel o valor de desafío es de 4 o menos, permanece allí y debe encontrar su propia salida. De lo contrario, el objetivo permanece en la prisión durante 1 minuto, tras lo cual reaparece en el espacio que dejó o en el espacio desocupado disponible más cercano; este objetivo puede repetir la tirada de salvación al final de cada uno de sus turnos, terminando el efecto de forma anticipada si tiene éxito.",
  "Última palabra (Last Word)": "[Nivel 13] Cuando te reducen a 0 puntos de golpe y te quedan sellos sin colocar, el fuego infernal en ti se niega a morir. Puedes gastar hasta 3 sellos y liberar una explosión a tu alrededor (no requiere acción). Tira 3d6 por cada sello gastado. Cada criatura de tu elección a 30 pies o menos de ti debe hacer una tirada de salvación de Destreza. Si falla, la criatura sufre daño de fuego igual al total que sacaste. Si tiene éxito, una criatura sufre la mitad de daño. Si esta explosión daña al menos a una criatura, recuperas una cantidad de puntos de golpe igual al total que sacaste.",
  "Perdición del alma (Soul's Doom)": "[Nivel 13] Cuando usas una acción adicional para colocar o mover un sello, puedes grabar a fuego los sellos en el alma del objetivo. Durante 1 minuto, siempre que esa criatura interdicta reciba daño, sufre daño adicional igual a tu bonificador por competencia."
};

export const conjuros = [
  {
    nombre: "Aura de profanación (Aura of Desecration)",
    nivel: 4,
    escuela: "Abjuración",
    tiempo: "1 acción",
    alcance: "Personal (radio de 30 pies)",
    componentes: "V",
    duracion: "Concentración, hasta 10 minutos",
    desc: "Energía profanadora de vida irradia de ti en un aura con un radio de 30 pies. Hasta que el conjuro termine, el aura se mueve contigo, centrada en ti. Siempre que las criaturas de tu elección entren en el área por primera vez en un turno o comiencen su turno en ella, deben hacer una tirada de salvación de Constitución. Si fallan la salvación, una criatura sufre 4d6 de daño necrótico y no puede recuperar puntos de golpe hasta el comienzo de su siguiente turno. Si tiene éxito en la salvación, una criatura sufre la mitad de daño y no sufre ningún otro efecto.",
    clases: "Clérigo, paladín"
  },
  {
    nombre: "Látigo del infierno (Hell's Lash)",
    nivel: 1,
    escuela: "Evocación",
    tiempo: "1 acción",
    alcance: "30 pies",
    componentes: "V, S, M (la lengua bífida de una serpiente)",
    duracion: "Concentración, hasta 1 minuto",
    desc: "Azotas con un látigo de energía carmesí a una criatura que puedas ver dentro del alcance, creando un conducto entre tú y el objetivo. El objetivo debe superar una tirada de salvación de Constitución o sufrir 4d4 de daño de fuego y quedar atado. Una criatura atada sufre 2d4 de daño de fuego al comienzo de cada uno de sus turnos. Una criatura atada puede repetir la tirada de salvación al final de cada uno de sus turnos, terminando el efecto si tiene éxito.\nDurante la duración, si el objetivo es una criatura interdicta, puedes usar tu reacción para quemar uno de tus sellos sobre la criatura. Al hacerlo, la criatura hace su siguiente tirada de salvación para terminar este conjuro con desventaja.\n**A niveles superiores.** Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, el daño inicial aumenta en 2d4 por cada nivel de espacio por encima de 1, y el daño subsecuente aumenta en 1d4 por cada nivel de espacio por encima de 1.",
    clases: "Hechicero, brujo, mago"
  },
  {
    nombre: "Fuego infernal (Hellfire)",
    nivel: 0,
    escuela: "Evocación",
    tiempo: "1 acción",
    alcance: "120 pies",
    componentes: "V, S",
    duracion: "Instantánea",
    desc: "Creas una erupción de fuego infernal humeante alrededor de una criatura que puedas ver dentro del alcance. El objetivo debe superar una tirada de salvación de Carisma o sufrir 1d4 de daño de fuego más 1d4 de daño necrótico.\n**A niveles superiores.** Ambos tipos de daño del conjuro aumentan en 1d4 cuando alcanzas el nivel 5 (2d4 cada uno), nivel 11 (3d4 cada uno) y nivel 17 (4d4 cada uno).",
    clases: "Hechicero, brujo, mago"
  },
  {
    nombre: "Desafío infernal (Infernal Challenge)",
    nivel: 2,
    escuela: "Encantamiento",
    tiempo: "1 acción adicional",
    alcance: "30 pies",
    componentes: "V",
    duracion: "Concentración, hasta 1 minuto",
    desc: "Ofreces a una criatura un desafío irresistible. Si no tienes aliados a 5 pies o menos de ti, elige una criatura dentro del alcance que pueda verte y escucharte. Debe superar una tirada de salvación de Carisma o responder a tu desafío y pelear contigo. Durante la duración, obtienes un bonificador de +2 a la CA, el objetivo tiene desventaja en las tiradas de ataque contra criaturas que no sean tú, y la primera vez que el objetivo intente alejarse de ti en un turno, debe superar una tirada de salvación de Carisma o su velocidad se vuelve 0 hasta el comienzo de su siguiente turno.\nEste conjuro termina si terminas tu turno a más de 30 pies de distancia del objetivo.",
    clases: "Paladín"
  },
  {
    nombre: "Arma maligna (Maligned Weapon)",
    nivel: 4,
    escuela: "Evocación",
    tiempo: "1 acción adicional",
    alcance: "Toque",
    componentes: "V, S",
    duracion: "Concentración, hasta 1 hora",
    desc: "Imbuyes un arma que tocas con una bendición infernal. Hasta que el conjuro termine, el arma extingue cualquier fuente de luz mundana en un radio de 30 pies. Además, los ataques que se hagan con el arma infligen 2d6 de daño necrótico adicional al impactar. Si el arma no es ya un arma mágica, se convierte en una durante la duración.\nComo acción adicional en tu turno mientras sostienes esta arma, puedes terminar el conjuro de forma anticipada y hacer que el arma emita un estallido de energía oscura. Cada criatura de tu elección a la que puedas ver a 30 pies o menos de ti debe hacer una tirada de salvación de Sabiduría. Si falla la salvación, una criatura sufre 4d6 de daño necrótico y está asustada durante 1 minuto. Si tiene éxito en la salvación, una criatura sufre la mitad de daño y no está asustada. Al final de cada uno de sus turnos, una criatura asustada puede hacer una tirada de salvación de Sabiduría, terminando el efecto sobre sí misma si tiene éxito.",
    clases: "Paladín"
  },
  {
    nombre: "Mota del infierno (Mote of Hell)",
    nivel: 3,
    escuela: "Conjuración",
    tiempo: "1 acción",
    alcance: "150 pies",
    componentes: "V, S, M (un trozo de azufre)",
    duracion: "Concentración, hasta 1 minuto",
    desc: "Manifiestas un bolsillo del Infierno. Una esfera de oscuridad, azufre y calor abrasador de 15 pies de radio aparece, centrada en un punto dentro del alcance, y perdura durante la duración. La nube de fuego infernal resuena con los gritos de almas condenadas que pueden ser escuchados por criaturas a 30 pies o menos de ella. Ninguna luz, ni siquiera la luz mágica, puede iluminar la nube, y cualquier criatura completamente dentro de esa área queda Cegada.\nLa nube distorsiona el tiempo-espacio, haciendo que el área de la nube sea terreno difícil. Una criatura que comienza su turno en esa área sufre 3d6 de daño de fuego. Una criatura que termina su turno en esa área debe superar una tirada de salvación de Sabiduría o sufrir 3d6 de daño psíquico a medida que las voces de los condenados atestan su mente.",
    clases: "Hechicero, brujo, mago"
  },
  {
    nombre: "Hoja vengativa (Vengeful Blade)",
    nivel: 0,
    escuela: "Evocación",
    tiempo: "1 acción",
    alcance: "Personal (radio de 5 pies)",
    componentes: "S, M (un arma cuerpo a cuerpo que valga al menos 1 po)",
    duracion: "Instantánea",
    desc: "Blandes el arma utilizada en el lanzamiento del conjuro y haces un ataque cuerpo a cuerpo con ella contra una criatura a 5 pies o menos de ti. Al impactar, el objetivo sufre los efectos normales del ataque con el arma y luego irradia un aura oscura de energía hasta el comienzo de tu próximo turno. Si el objetivo hace un ataque o lanza un conjuro antes de ese momento, el objetivo sufre 1d8 de daño necrótico y el conjuro termina.\nEl daño de este conjuro aumenta cuando alcanzas ciertos niveles. En el nivel 5, el ataque cuerpo a cuerpo inflige 1d8 de daño necrótico adicional al objetivo al impactar, y el daño que el objetivo sufre por hacer un ataque o lanzar un conjuro aumenta a 2d8. Ambas tiradas de daño aumentan en 1d8 en el nivel 11 (2d8 y 3d8) y nuevamente en el nivel 17 (3d8 y 4d8).",
    clases: "Hechicero, brujo, mago"
  },
  {
    nombre: "Muro de la muerte (Wall of Death)",
    nivel: 4,
    escuela: "Nigromancia",
    tiempo: "1 acción",
    alcance: "120 pies",
    componentes: "V, S, M (una esquirla de ónice)",
    duracion: "Concentración, hasta 1 minuto",
    desc: "Creas un muro de energía necrótica sobre una superficie dentro del alcance. Puedes hacer un muro de hasta 60 pies de largo, 20 pies de alto y 1 pie de grosor, o puedes hacer un muro anillado de hasta 20 pies de diámetro, 20 pies de alto y 1 pie de grosor. El muro es opaco y dura durante la duración. Cuando aparece el muro, cada criatura en su área debe hacer una tirada de salvación de Constitución. Una criatura sufre 4d8 de daño necrótico si falla la salvación, o la mitad de daño si tiene éxito.\nUn lado del muro, seleccionado por ti cuando lanzas este conjuro, inflige 4d8 de daño necrótico a cada criatura que termine su turno a 10 pies o menos de ese lado o dentro del muro. Una criatura sufre el mismo daño cuando entra al muro por primera vez en un turno o termina su turno allí. El otro lado del muro no inflige ningún daño.\nSiempre que una criatura sufra daño del muro, puedes usar tu reacción para obtener puntos de golpe temporales iguales a la cantidad de daño infligido.",
    clases: "Druida, hechicero, mago"
  }
];

export const objetos = [
  {
    nombre: "Nombre Verdadero (True Name)",
    rareza: "Poco común, Rara, Muy Rara o Legendaria",
    tipo: "Arma (Cualquiera)",
    sintonia: "Requiere sintonización por un illrigger",
    texto: "Esta arma está decorada de manera ornamentada con elegantes detalles en azufre y obsidiana. Huele a hierro e incienso. Cuando te sintonizas con esta arma, debes susurrarle tu nombre verdadero. El nombre se marca al rojo vivo a lo largo del arma en runas infernales y luego se desvanece.\nEl típico *Nombre Verdadero*, un objeto poco común, potencia la Interdicción funesta (Baleful Interdict) de un illrigger. Siempre que saques un 18, 19 o 20 en tu tirada de ataque con esta arma y coloques un sello en una criatura como parte del ataque, puedes colocar un sello adicional en esa criatura.\nLas variantes más poderosas de *Nombre Verdadero* obtienen una propiedad adicional dependiendo de la rareza:\n- **Rara.** Obtienes un bonificador de +1 a las tiradas de ataque y daño hechas con el arma, y el daño infligido por tus sellos aumenta en 1d6.\n- **Muy Rara.** Obtienes un bonificador de +2 a las tiradas de ataque y daño hechas con el arma, y el daño infligido por tus sellos aumenta en 2d6. Además, cuando reduces a un enemigo a 0 puntos de golpe, puedes elegir recuperar un sello (no requiere acción). Una vez que recuperas un sello de esta manera, no puedes volver a hacerlo hasta el siguiente anochecer.\n- **Legendaria.** Obtienes un bonificador de +3 a las tiradas de ataque y daño hechas con el arma, y el daño infligido por tus sellos aumenta en 3d6. Además, cuando reduces a un enemigo a 0 puntos de golpe, puedes elegir recuperar dos sellos y obtener puntos de golpe temporales iguales a tu nivel de illrigger (no requiere acción). Una vez que recuperas sellos y obtienes puntos de golpe temporales de esta manera, no puedes volver a hacerlo hasta el siguiente anochecer."
  },
  {
    nombre: "Perdición de Sangre (Bloodsbane)",
    rareza: "Muy rara",
    tipo: "Poción",
    sintonia: "No",
    texto: "Este aceite es engañosamente claro y huele débilmente a pergamino, tinta seca y un toque de azufre. Para desbloquear el poder del aceite, se debe mezclar un componente adicional (como se muestra en la lista de Efectos de Perdición de Sangre); este componente puede haber sido añadido previamente, o el usuario del aceite puede adquirir un aceite sin mezclar y añadir el componente como parte de un descanso corto o largo. Estos componentes son difíciles de percibir una vez diluidos en el aceite, e identificar este aceite puede requerir un buen olfato o investigación adicional.\nEl aceite puede recubrir un arma cortante o perforante o hasta 5 piezas de munición cortante o perforante. Aplicar el aceite de esta manera toma 1 minuto, tiempo durante el cual una criatura voluntaria debe ofrecer una gota de su sangre, mezclándola en el aceite para activar su magia.\nUna criatura impactada por un arma o munición cubierta con este aceite debe superar una tirada de salvación de Constitución CD 15 o sufrir un efecto dependiendo del componente especial añadido al aceite. Además, si la criatura falla la tirada de salvación y la sangre en el aceite provino de un illrigger, la criatura tiene un sello colocado por ese illrigger. Este sello no cuenta para el número de sellos otorgados por el rasgo Interdicción funesta (Baleful Interdict) del illrigger.\n\n**Efectos de Perdición de Sangre:**\n- **Aceite de menta arvensis (Mentha arvensis oil):** El objetivo está bajo los efectos del conjuro *zona de verdad* durante 10 minutos.\n- **Aceite de belladona (Nightshade oil):** El objetivo queda Paralizado durante 1 minuto.\n- **Pelo de sabueso (Bloodhound fur):** La criatura que ofreció su sangre al aceite conoce la dirección y distancia hacia el objetivo durante 24 horas.\n- **Aceite de rosa (Rose oil):** El objetivo está bajo los efectos del conjuro *hechizar persona* durante 1 hora. La criatura por la cual está hechizado es la criatura que ofreció su sangre al aceite."
  }
];
```

=== B ===
```json
{
  "usos": {
    "turncoat": {
      "formula": "PB",
      "reinicio": "largo"
    },
    "lets-make-a-deal": {
      "formula": "PB",
      "reinicio": "largo"
    },
    "quid-pro-quo": {
      "formula": "1",
      "reinicio": "largo"
    },
    "devastator": {
      "formula": "1",
      "reinicio": "corto"
    },
    "you-die-on-my-command": {
      "formula": "1",
      "reinicio": "corto"
    },
    "deathstrike": {
      "formula": "PB",
      "reinicio": "largo"
    },
    "sutekhs-blessing": {
      "formula": "PB",
      "reinicio": "largo"
    }
  }
}
```

=== C ===
```json
{
  "hellspeaker": "Illrigger Revised (MCDM)",
  "painkiller": "Illrigger Revised (MCDM)",
  "sanguine-knight": "Illrigger Revised (MCDM)",
  "shadowmaster": "Illrigger Revised (MCDM)"
}
```

=== D ===
```json
{
  "hellspeaker": "Carismáticos y manipuladores, sirven a Moloch coaccionando a los enemigos para convertirlos en aliados involuntarios mediante palabras y engaños.",
  "painkiller": "Tropas de choque acorazadas de Dispater que lideran los frentes de batalla, empleando armaduras pesadas e infundiendo miedo y autoridad absolutos.",
  "sanguine-knight": "Caballeros de sangre al servicio de Sutekh. Su hechicería drena la fuerza vital del enemigo y fortalece rituales y a sus aliados en combate.",
  "shadowmaster": "Asesinos encubiertos de Belial, expertos en el sigilo, los disfraces, la paciencia táctica y en atacar desde la oscuridad con precisión letal."
}
```

=== E ===
- **Retainers (Secuaces):** He omitido la traducción de los *Retainers* (Agent, Bloodletter, Deceiver, Schemer, Tyrant) que aparecen en las páginas 35 a 37 del documento original, dado que se trata de bloques de estadísticas de monstruos y PNJs aliados destinados al uso del Director de Juego (utilizando reglas externas de Flee, Mortals!), no opciones mecánicas de jugador.
- **Turncoat (Hellspeaker):** El fragmento original comienza repentinamente con "Turncoat", que corresponde a la segunda opción de "Invoke Hell" de nivel 3 del *Hellspeaker*. Ya que no formaba parte directa de un nodo con título en este corte y tiene reglas de recuperación propias ("usos iguales a PB / descanso largo"), se tradujo y configuró como un rasgo activo base dentro de la subclase.