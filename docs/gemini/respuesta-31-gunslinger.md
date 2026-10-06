=== A ===

```
export const gunslinger = {
  n: "Gunslinger",
  dado: "d8",
  sv: ["dexterity", "charisma"],
  habN: 2,
  habs: ["Acrobatics", "Animal Handling", "Athletics", "Deception", "Insight", "Intimidation", "Perception", "Persuasion", "Sleight of Hand", "Stealth"],
  arm: ["light"],
  armas: ["simple", "martial-ranged"],
  equipo: "Elige A o B: (A) Armadura de Cuero, 2 Dagas, Revólver, 50 Balas, Paquete de Explorador y 11 po; o (B) 175 po",
  rasgos: [
    {
      nombre: "Estilo de Combate",
      t: "pasiva",
      texto: "Obtienes una dote de Estilo de Combate (Fighting Style) de tu elección. Si eliges una dote, como Combate con Armas a Dos Manos (Great Weapon Fighting), que requiere que sostengas un arma cuerpo a cuerpo en una o dos manos, puedes usar esa dote con armas a distancia.\nCada vez que ganes un nivel de Gunslinger, puedes reemplazar la dote que elegiste por una dote de Estilo de Combate diferente.",
      n: 1
    },
    {
      nombre: "Desenfunde Rápido",
      t: "pasiva",
      texto: "Eres experto en desenfundar y disparar antes de que otros tengan tiempo de reaccionar, lo que te otorga los siguientes beneficios:\n- **Iniciativa.** Tienes ventaja en las tiradas de Iniciativa.\n- **Doble Desenfunde.** Puedes desenfundar o guardar dos armas que carecen de la propiedad Dos Manos (Two-Handed) cuando normalmente solo podrías desenfundar o guardar una.",
      n: 1
    },
    {
      nombre: "Maestría con Armas",
      t: "pasiva",
      texto: "Tu entrenamiento con armas te permite usar las propiedades de maestría de dos tipos de armas simples o marciales a distancia de tu elección. Siempre que termines un descanso largo, puedes practicar rutinas de armas y cambiar una de esas opciones de armas.\nAlcanzar ciertos niveles en esta clase te permite usar las propiedades de maestría de más tipos de armas, según la tabla de la clase.",
      n: 1
    },
    {
      nombre: "Disparo Crítico",
      t: "pasiva",
      texto: "Tus tiradas de ataque con armas a distancia logran un impacto crítico con un resultado de 19 o 20 en el d20.\nEn el nivel 9, tus tiradas de ataque con armas a distancia logran un impacto crítico con un resultado de 18-20.\nEn el nivel 17, logran un impacto crítico con un resultado de 17-20.",
      n: 2
    },
    {
      nombre: "Riesgo",
      t: "pasiva",
      texto: "Puedes realizar hazañas increíbles de audacia impulsadas por dados especiales llamados Dados de Riesgo.\n- **Dados de Riesgo.** Tienes cuatro Dados de Riesgo, que son d8s. Un Dado de Riesgo se gasta cuando lo usas. Recuperas todos los Dados de Riesgo gastados al terminar un descanso corto o largo. Tu Dado de Riesgo cambia y obtienes más dados conforme subes de nivel.\n- **Maniobras.** Puedes gastar Dados de Riesgo para realizar maniobras. Tus opciones de maniobra están detalladas como rasgos de clase.\n- **Tiradas de Salvación.** Si una maniobra requiere una tirada de salvación, la CD equivale a 8 + tu modificador de Destreza + tu bonificador por competencia.",
      n: 2,
      usos: "4",
      reset: "corto"
    },
    {
      nombre: "Maniobra: Tragar Saliva (Bite the Bullet)",
      t: "adicional",
      texto: "Como acción adicional, puedes gastar un Dado de Riesgo para ganar Puntos de Golpe Temporales iguales al número sacado en el dado más tu nivel de Gunslinger.",
      n: 2
    },
    {
      nombre: "Maniobra: Fuego a Ciegas (Blindfire)",
      t: "adicional",
      texto: "Puedes usar una acción adicional y gastar un Dado de Riesgo para obtener sentido ciego (Blindsight) con un alcance de 30 pies hasta el final del turno actual.",
      n: 2
    },
    {
      nombre: "Maniobra: Rodar para Esquivar (Dodge Roll)",
      t: "adicional",
      texto: "Puedes gastar un Dado de Riesgo como acción adicional para moverte hasta 15 pies y recargar cualquier arma a distancia que estés sosteniendo. Este movimiento no provoca ataques de oportunidad y no se ve afectado por terreno difícil.",
      n: 2
    },
    {
      nombre: "Maniobra: Disparo de Rozón (Grazing Shot)",
      t: "gratis",
      texto: "Cuando fallas un ataque a distancia con un arma, puedes gastar un Dado de Riesgo (sin requerir acción) para infligir daño a esa criatura igual a una tirada del dado más tu modificador de Destreza (mínimo 1). Este daño es del mismo tipo que el del arma, y solo se puede aumentar incrementando el modificador de característica. Solo puedes usar esta maniobra una vez por turno.",
      n: 2
    },
    {
      nombre: "Maniobra: Espíritu Inconformista (Maverick Spirit)",
      t: "pasiva",
      texto: "Cuando fallas una prueba de característica o tirada de salvación de Inteligencia, Sabiduría o Carisma, puedes gastar un Dado de Riesgo para sumarlo a la tirada, lo que podría convertirla en un éxito. Solo puedes usar esta maniobra una vez por turno.",
      n: 2
    },
    {
      nombre: "Maniobra: Por los Pelos (Skin of Your Teeth)",
      t: "reaccion",
      texto: "Cuando una criatura que puedas ver te impacta con una tirada de ataque, puedes usar tu reacción y gastar un Dado de Riesgo para apartarte del peligro. Tira el dado y suma el número obtenido a tu CA contra este ataque, lo que podría hacer que falle.",
      n: 2
    },
    {
      nombre: "Subclase de Gunslinger",
      t: "pasiva",
      texto: "Obtienes una subclase de Gunslinger de tu elección. Una subclase es una especialización que te otorga rasgos en ciertos niveles.",
      n: 3
    },
    {
      nombre: "Ataque Adicional",
      t: "pasiva",
      texto: "Puedes atacar dos veces en lugar de una siempre que realices la acción de Atacar en tu turno.",
      n: 5
    },
    {
      nombre: "Tiro en las Tripas (Gut Shot)",
      t: "pasiva",
      texto: "Siempre que logres un impacto crítico contra una criatura Grande o más pequeña con un ataque a distancia usando un arma, el proyectil se aloja en el objetivo. Durante 1 minuto o hasta que el objetivo reemplace uno de sus ataques para extraer el proyectil, su Velocidad se reduce a la mitad y tiene desventaja en sus tiradas de ataque.",
      n: 5
    },
    {
      nombre: "Evasión",
      t: "pasiva",
      texto: "Cuando te ves sometido a un efecto que te permite hacer una tirada de salvación de Destreza para sufrir solo la mitad del daño, en su lugar no sufres ningún daño si tienes éxito en la tirada y solo la mitad del daño si fallas.\nNo te beneficias de este rasgo si tienes la condición de Incapacitado.",
      n: 7
    },
    {
      nombre: "Exceso de Daño (Overkill)",
      t: "pasiva",
      texto: "Cuando infliges daño con un arma a distancia que no suma tu modificador de característica a la tirada, agregas tu modificador de todos modos. Si ya sumas tu modificador a la tirada de daño, el objetivo recibe 1d8 de daño adicional del tipo del arma.\nTen en cuenta que las armas que tienen la propiedad Arma de Fuego (Firearm) no suman tu modificador de característica a las tiradas de daño.",
      n: 11
    },
    {
      nombre: "Engañar a la Muerte (Cheat Death)",
      t: "pasiva",
      texto: "Cuando te reduces a 0 Puntos de Golpe y no mueres en el acto, puedes caer a 1 Punto de Golpe en su lugar, y recuperas una cantidad de Puntos de Golpe igual a tu nivel de Gunslinger.\nUna vez que usas este rasgo, no puedes volver a usarlo hasta terminar un descanso corto o largo.",
      n: 13,
      usos: "1",
      reset: "corto"
    },
    {
      nombre: "Gambito Atroz (Dire Gambit)",
      t: "pasiva",
      texto: "Siempre que tires Iniciativa o logres un impacto crítico, recuperas un Dado de Riesgo gastado.",
      n: 15
    },
    {
      nombre: "Maniobra Hábil (Deft Maneuver)",
      t: "pasiva",
      texto: "Obtienes una acción adicional especial que puedes realizar una vez en cada uno de tus turnos. Solo puedes usar esta acción adicional especial para utilizar una maniobra.",
      n: 18
    },
    {
      nombre: "Tiro en la Cabeza (Headshot)",
      t: "pasiva",
      texto: "Cuando logras un impacto crítico contra una criatura usando un arma a distancia, puedes elegir que sea un Tiro en la Cabeza. Si la criatura tiene menos de 100 Puntos de Golpe, muere. De lo contrario, recibe 10d10 de daño adicional del tipo del arma.\nUna vez que usas este rasgo, no puedes volver a usarlo hasta terminar un descanso corto o largo. También puedes restaurar su uso gastando tres Dados de Riesgo (sin requerir acción).",
      n: 20,
      usos: "1",
      reset: "corto"
    }
  ]
};

export const big_game_hunter = {
  n: "Big Game Hunter",
  rasgos: [
    {
      nombre: "El Lado Ancho de un Granero (Broad Side of a Barn)",
      t: "pasiva",
      texto: "No tienes desventaja en las tiradas de ataque contra objetivos Grandes o mayores como resultado de atacar a largo alcance.",
      n: 3
    },
    {
      nombre: "Arma para Elefantes (Elephant Gun)",
      t: "pasiva",
      texto: "Obtienes un arma de proporciones asombrosas: un Arma para Elefantes. Solo tú tienes competencia con esta arma. Es un arma a distancia con los siguientes rasgos:\n- **Categoría:** Marcial a Distancia\n- **Daño:** 2d8 Perforante\n- **Propiedades:** Munición (alcance 80/320; Bala), Arma de Fuego (Firearm), Pesada, Alto Calibre (High Caliber), Dos Manos\n- **Maestría:** Ralentizar (Slow) (puedes usar esta propiedad y no cuenta para el límite de propiedades de maestría que conoces).\n\n**Alto Calibre:** Solo puedes hacer un ataque con esta arma cuando realizas la acción de Atacar, y solo como el primer ataque de tu turno. Una vez atacas con ella, no puedes hacer ataques hasta el inicio de tu siguiente turno.\n\n**Reemplazar el arma:** Si se pierde, puedes construir otra durante un descanso largo usando 100+ po en materiales.\n\nEl daño aumenta a 4d10 a nivel 5, 5d10 a nivel 11 y 6d10 a nivel 17.",
      n: 3
    },
    {
      nombre: "Rastreador (Tracker)",
      t: "pasiva",
      texto: "Al examinar huellas como acción de Estudiar (Study), puedes determinar sin prueba de característica la especie exacta que las dejó, hace cuánto tiempo, su tamaño y si le faltaban Puntos de Golpe en ese momento.\nObtienes competencia en Supervivencia y Pericia en esa habilidad.",
      n: 6
    },
    {
      nombre: "Disparo Legendario (Legendary Shot)",
      t: "reaccion",
      texto: "Cuando una criatura que puedes ver a 80 pies de ti realiza una Acción Legendaria, puedes usar tu reacción para hacerle un ataque con tu Arma para Elefantes, incluso si ya habías atacado con ella en tu turno. Si impactas, la Acción Legendaria se pierde.\nUna vez que usas este rasgo, no puedes volver a usarlo hasta terminar un descanso corto o largo.",
      n: 10,
      usos: "1",
      reset: "corto"
    },
    {
      nombre: "Calibre Exótico (Exotic Caliber)",
      t: "adicional",
      texto: "Puedes usar una acción adicional para cargar tu Arma para Elefantes con uno de los siguientes tipos de munición. Usas este rasgo 1 vez por descanso corto o largo, o gastando dos Dados de Riesgo.\n- **Tiro de Perdigones (Buck Shot):** El ataque se vuelve un cono de 30 pies. Salvación Destreza o daño del arma (mitad si tiene éxito).\n- **Tiro Explosivo (Explosive Shot):** Elige un punto a 80 pies. Esfera de 10 pies. Salvación Destreza o daño de Fuego igual al del arma (mitad si tiene éxito).\n- **Tiro Perforante (Piercing Shot):** Línea de 5 por 80 pies. Salvación Destreza o daño del arma (mitad si tiene éxito).",
      n: 14,
      usos: "1",
      reset: "corto"
    }
  ]
};

export const deadeye = {
  n: "Deadeye",
  rasgos: [
    {
      nombre: "Maniobra: Ojo de Águila (Eagle Eye)",
      t: "gratis",
      texto: "Una vez por turno, cuando fallas una tirada de ataque a distancia, puedes gastar un Dado de Riesgo y sumarlo a la tirada de ataque, lo que podría convertirlo en un éxito.",
      n: 3
    },
    {
      nombre: "Postura de Tirador (Sharpshooter's Stance)",
      t: "pasiva",
      texto: "- **Disparar Tumbado:** No tienes desventaja en ataques a distancia como resultado de tener la condición de Tumbado (Prone).\n- **Levantarse Rápido:** Cuando estás Tumbado, puedes levantarte (terminando la condición) gastando solo 5 pies de movimiento.",
      n: 3
    },
    {
      nombre: "Posición Oculta (Concealed Position)",
      t: "pasiva",
      texto: "- **Camuflaje:** Puedes realizar la acción de Esconderte aunque no estés muy oscurecido ni tras cobertura de tres cuartos o total, siempre que tengas la condición de Tumbado. La condición Invisible de esta acción termina si dejas de estar Tumbado.\n- **Nido de Francotirador:** Si realizas un ataque mientras estás oculto y fallas, el ataque no revela tu ubicación.",
      n: 6
    },
    {
      nombre: "Reposicionamiento (Reposition)",
      t: "reaccion",
      texto: "Siempre que una criatura falle un ataque contra ti, puedes usar tu reacción para terminar tu condición de Tumbado y moverte hasta la mitad de tu Velocidad.",
      n: 10
    },
    {
      nombre: "Disparo Concentrado (Focused Shot)",
      t: "pasiva",
      texto: "Cuando realizas la acción de Atacar, puedes elegir realizar un único ataque a distancia con un arma para hacer un Disparo Concentrado. Tienes ventaja en este ataque y, si impactas, se considera un impacto crítico.",
      n: 14
    }
  ]
};

export const grenadier = {
  n: "Grenadier",
  rasgos: [
    {
      nombre: "Disparo Explosivo (Explosive Shot)",
      t: "pasiva",
      texto: "Cuando realizas un ataque a distancia usando un arma cuya maestría conoces, puedes reemplazar su propiedad por la propiedad Estallido (Explode) para ese ataque. El daño de este ataque es de Fuego en lugar del tipo de daño normal del arma.",
      n: 3
    },
    {
      nombre: "Maniobra: Artillería Pesada (Heavy Ordnance)",
      t: "adicional",
      texto: "Siempre que uses la propiedad Estallido de un arma, puedes usar una acción adicional y gastar un Dado de Riesgo para aumentar el radio de la explosión a una esfera de 10 pies. Suma el Dado de Riesgo a la tirada de daño.",
      n: 3
    },
    {
      nombre: "Explosión Configurable (Configurable Blast)",
      t: "pasiva",
      texto: "Cuando uses la propiedad Estallido, puedes elegir uno de los siguientes beneficios para ese ataque:\n- **Explosión de Demolición:** La explosión causa el doble de daño a objetos e ignora su umbral de daño.\n- **Explosión Elemental:** Haces que la explosión cause daño de Ácido, Frío, Relámpago o Trueno en lugar de su daño normal.\n- **Explosión Incendiaria:** Los objetos inflamables en el área que no estén siendo vestidos o llevados comienzan a arder.",
      n: 6
    },
    {
      nombre: "Ponerse a Cubierto (Take Cover)",
      t: "pasiva",
      texto: "Las criaturas que elijas ganan los beneficios de tu rasgo Evasión mientras estén a 5 pies de ti.",
      n: 10
    },
    {
      nombre: "Bomba de Racimo (Clusterbomb)",
      t: "pasiva",
      texto: "Cuando usas la propiedad Estallido, puedes disparar una Bomba de Racimo. La explosión es una esfera de 20 pies. Toda criatura sufre 10d6 de daño de Fuego si falla la salvación (la mitad si tiene éxito). Este daño ignora la Resistencia. Las criaturas Enormes o menores que reciban daño caen Tumbadas.\nUna vez que usas este rasgo, no puedes usarlo hasta terminar un descanso corto o largo, o gastando cuatro Dados de Riesgo.",
      n: 14,
      usos: "1",
      reset: "corto"
    }
  ]
};

export const gun_tank = {
  n: "Gun Tank",
  rasgos: [
    {
      nombre: "Artillero Pesado (Heavy Gunner)",
      t: "pasiva",
      texto: "Obtienes entrenamiento con armaduras Medias y Pesadas. Puedes usar tu Fuerza, en lugar de Destreza, para las tiradas de ataque y daño con armas a distancia. También puedes usar tu Fuerza para la CD de tus maniobras.",
      n: 3
    },
    {
      nombre: "Torreta Andante (Walking Turret)",
      t: "pasiva",
      texto: "Mientras sostienes un arma a distancia cuya maestría conoces, puedes usar la propiedad de maestría Montada (Mounted) con ella. Mientras un arma está montada en posición fija, su dado de daño aumenta un paso (d4 -> d6 -> d8 -> d10 -> d12, máximo d12).\nPuedes moverte con un arma Montada fija. Al hacerlo, cada pie de movimiento te cuesta 1 pie extra.",
      n: 3
    },
    {
      nombre: "Cráneo Grueso (Thick-Skulled)",
      t: "pasiva",
      texto: "Tienes ventaja en las tiradas de salvación para evitar o terminar las condiciones de Hechizado, Asustado y Aturdido.",
      n: 6
    },
    {
      nombre: "A Prueba de Balas (Bulletproof)",
      t: "pasiva",
      texto: "Cuando usas tu maniobra Tragar Saliva (Bite the Bullet), obtienes Resistencia al daño Contundente, Perforante y Cortante hasta el final de tu siguiente turno.",
      n: 10
    },
    {
      nombre: "Disparo de Ametralladora (Gatling Shot)",
      t: "pasiva",
      texto: "Una vez en cada uno de tus turnos, cuando impactas a un enemigo con un ataque a distancia con un arma, puedes realizar otro ataque con la misma arma al mismo objetivo. Este ataque siempre se hace con Desventaja. Si impacta, puedes realizar otro ataque. Puedes repetir esto hasta que falles o hagas un total de cinco ataques contra el objetivo.",
      n: 14
    }
  ]
};

export const gun_ko_master = {
  n: "Gun-Ko Master",
  rasgos: [
    {
      nombre: "Disparo a Quemarropa (Close-Quarters Shooting)",
      t: "pasiva",
      texto: "Estar a 5 pies de un enemigo no impone desventaja en tus tiradas de ataque con armas a distancia.",
      n: 3
    },
    {
      nombre: "Gun-Ko",
      t: "adicional",
      texto: "Cuando atacas con un arma a distancia cuya maestría conoces, puedes reemplazarla por la propiedad Contundente (Bludgeon) para ese ataque.\nCuando realizas un ataque a distancia contra un enemigo a 5 pies de ti, puedes usar una acción adicional para realizar un ataque cuerpo a cuerpo usando la propiedad Contundente de esa arma.",
      n: 3
    },
    {
      nombre: "Maniobra: Desarme Relámpago (Lightning Disarm)",
      t: "adicional",
      texto: "Si una criatura a 5 pies sostiene un arma, puedes gastar un Dado de Riesgo como acción adicional para intentar quitársela. El objetivo debe superar una salvación de Destreza o le arrebatas el arma. Debes tener una mano libre.",
      n: 6
    },
    {
      nombre: "Maniobra: Carrera por la Pared (Wall Dash)",
      t: "adicional",
      texto: "Puedes gastar un Dado de Riesgo para usar la acción de Correr (Dash) como acción adicional. Hasta el final de tu turno, tienes una Velocidad de Escalada igual a tu Velocidad y puedes moverte por superficies verticales dejando tus manos libres.",
      n: 6
    },
    {
      nombre: "Esquiva Predictiva (Predictive Dodge)",
      t: "adicional",
      texto: "Puedes usar una acción adicional para elegir a una criatura que puedas ver a 30 pies. Hasta el inicio de tu siguiente turno, obtienes los beneficios de la acción de Esquivar (Dodge) contra los ataques a distancia de esa criatura y contra sus efectos que te obliguen a hacer salvaciones de Destreza.",
      n: 10
    },
    {
      nombre: "Asalto Relámpago (Flash Assault)",
      t: "adicional",
      texto: "Como acción adicional, puedes hacer un ataque a distancia con un arma y un ataque cuerpo a cuerpo usando la propiedad Contundente de esa arma. Puedes moverte entre estos ataques. Si impactas a una criatura Grande o menor con ambos, cae Tumbada.\nUna vez que usas este rasgo, no puedes usarlo de nuevo hasta terminar un descanso corto o largo, o gastando dos Dados de Riesgo.",
      n: 14,
      usos: "1",
      reset: "corto"
    }
  ]
};

export const high_roller = {
  n: "High Roller",
  rasgos: [
    {
      nombre: "Cara de Póquer (Poker Face)",
      t: "pasiva",
      texto: "Obtienes competencia con todos los Juegos de Mesa (Gaming Sets) y en una habilidad de tu elección: Engaño, Perspicacia o Percepción.",
      n: 3
    },
    {
      nombre: "Maniobra: Dados Mentiroso (Liar's Dice)",
      t: "adicional",
      texto: "Cuando haces una tirada de daño a distancia, puedes gastar un Dado de Riesgo como acción adicional y declararla como una tirada oculta. Tira el daño en secreto y declara el total que quieras. El DM puede cuestionar si mientes y revelar los dados:\n- **Cuestiona y Mentiste:** El daño se reduce a la mitad.\n- **Cuestiona y Dijiste la Verdad:** El daño se duplica.\n- **No Cuestiona:** Usa el daño que declaraste, aunque no sea el real.",
      n: 3
    },
    {
      nombre: "Negocio Arriesgado (Risky Business)",
      t: "pasiva",
      texto: "Una vez por turno, cuando haces una tirada de ataque contra un enemigo que no tiene desventaja, puedes elegir hacerla con desventaja. Al hacerlo, recuperas un Dado de Riesgo gastado.",
      n: 6
    },
    {
      nombre: "Amante del Riesgo (Risk Taker)",
      t: "pasiva",
      texto: "Puedes usar tus maniobras Espíritu Inconformista y Por los Pelos sin gastar un Dado de Riesgo. Cuando lo haces, tira un d6 en lugar del Dado de Riesgo para resolver el efecto.",
      n: 10
    },
    {
      nombre: "Doble o Nada (Double or Nothing)",
      t: "pasiva",
      texto: "Cuando logras un impacto crítico con un arma a distancia, puedes apostar. Tira un d20. Con 10 o más, tira los dados de daño del ataque cuatro veces en lugar de las dos normales. Con 9 o menos, el crítico se convierte en un impacto normal.",
      n: 14
    }
  ]
};

export const laserist = {
  n: "Laserist",
  rasgos: [
    {
      nombre: "Maniobra: Disparo de Rayo (Beam Shot)",
      t: "adicional",
      texto: "Cuando realizas la acción de Atacar usando un arma con la propiedad Bláster, puedes gastar un Dado de Riesgo como acción adicional para reemplazar uno de tus ataques por un disparo penetrante. Este ataque se vuelve una línea de 5 pies hasta el alcance normal del arma. Cada criatura debe superar una salvación de Destreza o sufrir el daño normal del arma más el Dado de Riesgo (mitad si tiene éxito).",
      n: 3
    },
    {
      nombre: "Bláster Multimodo (Multi-Mode Blaster)",
      t: "fuera",
      texto: "Puedes pasar 1 minuto integrando dos armas con la propiedad Bláster en un mismo armazón. Solo puedes tener uno a la vez. Siempre que ataques, eliges cuál de las dos armas integradas usar para ese ataque.",
      n: 3
    },
    {
      nombre: "Disparo Cargado (Charge Shot)",
      t: "pasiva",
      texto: "Al realizar la acción de Atacar, puedes reemplazar uno de los ataques para cargar un arma Bláster. No puede usarse hasta el inicio de tu siguiente turno. Después, está cargada hasta el final de ese turno. Al impactar con el arma cargada, inflige dos dados extra de daño.",
      n: 6
    },
    {
      nombre: "Maniobra: Escudo Energético (Energetic Shield)",
      t: "reaccion",
      texto: "Como reacción al sufrir daño de Frío, Fuego, Relámpago, Necrótico, Radiante o Trueno, puedes gastar un Dado de Riesgo para ganar Resistencia a ese daño hasta el inicio de tu siguiente turno.",
      n: 10
    },
    {
      nombre: "Disparo de Refracción (Refraction Shot)",
      t: "pasiva",
      texto: "Siempre que impactes a una criatura con un Bláster, puedes hacer que el disparo rebote hacia una segunda criatura a 30 pies. El objetivo recibe daño del tipo del arma igual a tu modificador de Destreza (mínimo 1).",
      n: 14
    }
  ]
};

export const musketeer = {
  n: "Musketeer",
  rasgos: [
    {
      nombre: "Entrenamiento de Infantería (Infantry Training)",
      t: "pasiva",
      texto: "Obtienes los siguientes beneficios:\n- **Armas Marciales:** Competencia con todas las armas marciales.\n- **Maestría Cuerpo a Cuerpo:** Puedes elegir armas cuerpo a cuerpo para tu Maestría con Armas.\n- **Ignorar Recarga:** Ignoras la propiedad de Recarga (Loading) del Trabuco, Pistola y Mosquete. Puedes recargarlas aunque no tengas una mano libre.\n- **Bayonetas:** Competencia con Bayonetas. Una bayoneta es una Daga especial que puedes acoplar o quitar de cualquier arma a distancia de Dos Manos con una acción de Utilizar. Acoplada, cuenta como arma cuerpo a cuerpo con propiedad Sutil (Finesse). Inflige 1d8 Perforante más tu modificador.",
      n: 3
    },
    {
      nombre: "Maniobra: Escaramuza (Skirmish)",
      t: "adicional",
      texto: "Cuando haces un ataque con un arma, puedes gastar un Dado de Riesgo como acción adicional para realizar otro ataque. Un ataque debe ser cuerpo a cuerpo y el otro a distancia en ese turno.",
      n: 3
    },
    {
      nombre: "Aumento de Moral (Morale Boost)",
      t: "pasiva",
      texto: "Cuando usas Tragar Saliva, elige hasta 5 aliados a 30 pies de ti. Cada uno obtiene Puntos de Golpe Temporales iguales a una tirada de tu Dado de Riesgo más la mitad de tu nivel de Gunslinger (redondeando hacia abajo).",
      n: 6
    },
    {
      nombre: "Tácticas Móviles (Mobile Tactics)",
      t: "pasiva",
      texto: "Cuando impactas a una criatura con un ataque, el objetivo no puede hacerte ataques de oportunidad hasta el inicio de su siguiente turno.",
      n: 10
    },
    {
      nombre: "Todos para Uno (All for One)",
      t: "reaccion",
      texto: "Siempre que un aliado a 10 pies de ti reciba un impacto de un ataque, puedes usar tu reacción para hacer un ataque a distancia con un arma contra el atacante.",
      n: 14
    }
  ]
};

export const pistolero = {
  n: "Pistolero",
  rasgos: [
    {
      nombre: "Disparo a Quemarropa (Close-Quarters Shooting)",
      t: "pasiva",
      texto: "Estar a 5 pies de un enemigo no impone desventaja en tus tiradas de ataque con armas a distancia.",
      n: 3
    },
    {
      nombre: "Maniobra: Abanicar el Martillo (Fan the Hammer)",
      t: "adicional",
      texto: "Cuando realizas la acción de Atacar con un arma a distancia que no tenga la propiedad de Dos Manos, puedes gastar un Dado de Riesgo como acción adicional para hacer dos ataques extra con esa arma. Estos ataques tienen Desventaja independientemente de las circunstancias. No puedes usar la maestría Automática con ellos, y necesitas una mano libre.",
      n: 3
    },
    {
      nombre: "Desarmar (Disarm)",
      t: "pasiva",
      texto: "Cuando logras un impacto crítico y activas Tiro en las Tripas contra una criatura, puedes desarmarla en lugar de alojar un proyectil. El objetivo deja caer un objeto que sostenga, cayendo en un espacio de tu elección a 15 pies.",
      n: 6
    },
    {
      nombre: "Maniobra: Duelo (Showdown)",
      t: "gratis",
      texto: "Cuando tiras Iniciativa, puedes gastar un Dado de Riesgo para desenfundar un arma a distancia y atacarla. Suma el Dado al daño. Si impactas, el objetivo tiene Desventaja contra cualquier criatura que no seas tú durante la primera ronda de combate.",
      n: 10
    },
    {
      nombre: "Tiempo Bala (Bullet Time)",
      t: "pasiva",
      texto: "Una vez en cada uno de tus turnos, al hacer un ataque a distancia con un arma, puedes obtener ventaja en la tirada.",
      n: 14
    }
  ]
};

export const secret_agent = {
  n: "Secret Agent",
  rasgos: [
    {
      nombre: "Entrenamiento Operativo (Operative Training)",
      t: "pasiva",
      texto: "- **Disparo Oculto:** Aprendes el truco Disparo Oculto (Concealed Shot). Inteligencia, Sabiduría o Carisma es tu aptitud mágica (elige una al escoger esta subclase).\n- **Herramientas de Operativo:** Competencia con Kit de Disfraz y Herramientas de Ladrón.\n- **Habilidades:** Competencia en dos a elegir: Engaño, Investigación, Persuasión, Juego de Manos o Sigilo.",
      n: 3
    },
    {
      nombre: "Maniobra: Disparo de Despedida (Parting Shot)",
      t: "adicional",
      texto: "Cuando realizas la acción de Correr, Destrabarse o Esquivar, puedes gastar un Dado de Riesgo para hacer un ataque a distancia como acción adicional. Suma el Dado al daño si impactas.",
      n: 3
    },
    {
      nombre: "Habilidades de Terreno (Fieldcraft)",
      t: "adicional",
      texto: "- **Cambio Rápido:** Con un kit de disfraz, puedes crear un Traje y ponértelo como acción adicional.\n- **Hablador Astuto:** Siempre que hagas una prueba de Carisma (Engaño) o Carisma (Persuasión), puedes tratar las tiradas de d20 de 9 o menos como un 10.",
      n: 6
    },
    {
      nombre: "Estrategia de Salida (Exit Strategy)",
      t: "reaccion",
      texto: "Cuando recibes daño, puedes usar tu reacción para volverte Invisible hasta el inicio de tu siguiente turno, y puedes moverte inmediatamente hasta 10 pies.\nUsas esto una vez por descanso corto o largo, o gastando un Dado de Riesgo.",
      n: 10,
      usos: "1",
      reset: "corto"
    },
    {
      nombre: "Licencia para Matar (License to Kill)",
      t: "pasiva",
      texto: "Siempre que infliges daño a distancia, puedes gastar uno o dos Dados de Riesgo y sumarlos al daño. Si tiras el número máximo en el dado, puedes tirarlo de nuevo y sumarlo sin gastarlo (y repetir si vuelve a salir el máximo). El límite de Dados de Riesgo que puedes añadir al daño iguala tu Bonificador por Competencia.",
      n: 14
    }
  ]
};

export const space_cowboy = {
  n: "Space Cowboy",
  rasgos: [
    {
      nombre: "Disparo Caliente (Hot Shot)",
      t: "pasiva",
      texto: "Cuando atacas con un arma a distancia cuya maestría conoces, puedes reemplazarla por la propiedad Sobrecalentamiento (Overheat).",
      n: 3
    },
    {
      nombre: "Arma con Nombre (Gun with a Name)",
      t: "fuera",
      texto: "En un descanso largo, puedes personalizar un arma a distancia para convertirla en tu Arma con Nombre (solo 1 a la vez), obteniendo las siguientes mejoras de bláster (Mods):\n- **Cañón Extendido:** El alcance normal y largo del arma se duplican.\n- **Montura Magnética:** Con una acción adicional, puedes atraer el arma a tu mano si está a 60 pies y nadie la porta. No pueden desarmarte a menos que estés Incapacitado.\n- **Marco Reforzado:** El arma obtiene la maestría Contundente además de la suya (solo usas 1 a la vez por ataque).",
      n: 3
    },
    {
      nombre: "Deslizamiento de Poder (Power Slide)",
      t: "pasiva",
      texto: "Cuando usas la maniobra Rodar para Esquivar, tienes ventaja en el próximo ataque que realices antes del final de tu turno.",
      n: 6
    },
    {
      nombre: "Esquiva Afortunada (Lucky Dodge)",
      t: "gratis",
      texto: "Siempre que recibas un impacto, puedes tirar 1d6. Con un 6, el ataque falla automáticamente.",
      n: 10
    },
    {
      nombre: "Línea Roja (Red Line)",
      t: "pasiva",
      texto: "Cuando usas la maestría de Sobrecalentamiento, el arma sobrecalentada puede volver a usarse al inicio de tu próximo turno.",
      n: 14
    }
  ]
};

export const spellslinger = {
  n: "Spellslinger",
  rasgos: [
    {
      nombre: "Lanzamiento de Conjuros (Spellcasting)",
      t: "pasiva",
      texto: "Lanzas conjuros de Mago usando Inteligencia. Usas armas a distancia o Foco Arcano como foco.\nConoces dos trucos de Mago (uno más a nivel 10).\nTienes espacios de conjuro de 1/3 de lanzador y preparas conjuros de Mago en cada descanso largo según tus niveles.\nPuedes cambiar conjuros preparados al subir de nivel en esta clase.",
      n: 3
    },
    {
      nombre: "¡Bang, Estás Muerto! (Bang, You're Dead!)",
      t: "adicional",
      texto: "Aprendes el truco Pistolas de Dedos (Finger Guns). Cuando impactas con él, puedes gastar un Dado de Riesgo como acción adicional y sumarlo al daño.",
      n: 3
    },
    {
      nombre: "Disparo de Conjuro (Spellshot)",
      t: "pasiva",
      texto: "Cuando usas la acción de Atacar en tu turno, puedes reemplazar uno de los ataques por el lanzamiento de un truco de Mago de 1 acción.",
      n: 6
    },
    {
      nombre: "Contramago (Counter-Mage)",
      t: "reaccion",
      texto: "Obtienes:\n- **Rompedor de Abjuraciones:** Al atacar a distancia, suprimes temporalmente magia defensiva sobre el objetivo (como Armadura de Mago) e impide que use reacciones para lanzar Escudo.\n- **Disparo Antimagia:** Si tu Tiro en las Tripas (Gut Shot) se activa con un crítico, el proyectil le impide conjurar o realizar la acción de Magia, y le da desventaja en salvaciones de Constitución para Concentración.\n- **Inmunidad a Magia:** Al fallar salvación contra conjuros, puedes usar reacción para tirar 1d6 y sumarlo, pudiendo lograr un éxito.",
      n: 10
    },
    {
      nombre: "Maniobra: Bala Mágica (Magic Bullet)",
      t: "adicional",
      texto: "Cuando haces una tirada de ataque de conjuro, puedes gastar un Dado de Riesgo como acción adicional para sustituirla por un ataque a distancia con un arma. Suma el Dado a la tirada. Si impactas, infliges el daño del arma sumado a los efectos del conjuro.",
      n: 14
    }
  ]
};

export const trick_shot = {
  n: "Trick Shot",
  rasgos: [
    {
      nombre: "Trayectoria Creativa (Creative Trajectory)",
      t: "pasiva",
      texto: "Tus ataques a distancia con armas ignoran la cobertura media y tres cuartos.",
      n: 3
    },
    {
      nombre: "Maniobra: Rebote (Ricochet)",
      t: "adicional",
      texto: "Cuando fallas un ataque a distancia, puedes usar una acción adicional y gastar un Dado de Riesgo para volver a tirarlo y sumar el Dado. Debes usar la nueva tirada.",
      n: 3
    },
    {
      nombre: "Juego de Armas Elegante (Fancy Gunplay)",
      t: "pasiva",
      texto: "Una vez por turno al hacer una prueba de Actuación o Juego de Manos con un arma a distancia, puedes tirar un Dado de Riesgo y sumarlo gratis.\nPuedes recargar armas con la propiedad Recarga (Reload) sin gastar acción ni acción adicional.",
      n: 6
    },
    {
      nombre: "Maniobra: Desvío Hábil (Deft Deflection)",
      t: "reaccion",
      texto: "Cuando un aliado a 30 pies es impactado, puedes usar tu reacción y gastar un Dado de Riesgo para otorgarle el beneficio de tu maniobra Por los Pelos contra ese ataque. Debes sostener un arma a distancia.",
      n: 10
    },
    {
      nombre: "Disparo de Pinball (Pinball Shot)",
      t: "pasiva",
      texto: "Una vez en cada turno, si impactas a una criatura con arma a distancia, puedes rebotarlo hacia otro objetivo diferente a 30 pies haciendo una tirada de ataque. Si impactas, repites contra un nuevo objetivo a 30 pies hasta fallar o hacer un máximo de 5 ataques. No puedes apuntar al mismo objetivo más de una vez.\n1 uso por descanso corto o largo, o gastando 2 Dados de Riesgo.",
      n: 14,
      usos: "1",
      reset: "corto"
    }
  ]
};

export const white_hat = {
  n: "White Hat",
  rasgos: [
    {
      nombre: "Maniobra: Imponer la Ley (Lay Down the Law)",
      t: "adicional",
      texto: "Puedes gastar un Dado de Riesgo como acción adicional para elegir un aliado a 60 pies. Gana Puntos de Golpe Temporales iguales a lo sacado en el dado. Hasta el inicio de tu siguiente turno, si el aliado es impactado, puedes usar tu reacción para atacar a distancia al agresor.",
      n: 3
    },
    {
      nombre: "Aura de Mirada Férrea (Steely-Eyed Aura)",
      t: "pasiva",
      texto: "Emanas un aura de 10 pies. Tú y los aliados en ella tienen ventaja en las salvaciones contra la condición de Asustado. El aura se inactiva si estás Incapacitado.",
      n: 3
    },
    {
      nombre: "Manos Arriba (Reach for the Skies)",
      t: "pasiva",
      texto: "Al hacer un crítico, en lugar de alojar la bala, le exiges que se rinda. El objetivo debe superar salvación de Sabiduría o sufre las condiciones Asustado e Incapacitado durante 1 minuto. Terminan si recibe daño, si te Incapacitan o si mueres. Puede repetir la salvación cada final de turno.",
      n: 6
    },
    {
      nombre: "El Largo Brazo de la Ley (Long Arm of the Law)",
      t: "pasiva",
      texto: "Una vez por turno, al impactar a distancia a una criatura Grande o menor, el objetivo no puede moverse en su siguiente turno a menos que realice primero la acción de Destrabarse.",
      n: 10
    },
    {
      nombre: "Héroe con Estrella de Oro (Gold Star Hero)",
      t: "pasiva",
      texto: "Mejora del Aura a 30 pies.\nAl usar Imponer la Ley, el aliado recibe Resistencia al daño Contundente, Perforante y Cortante hasta el inicio de tu próximo turno.\nSi alguien falla la salvación de Manos Arriba, sufre la condición Aturdido (Stunned) en lugar de Incapacitado.",
      n: 14
    }
  ]
};

export const reglas_armas_fuego = {
  nombre: "Reglas Generales de Armas de Fuego (Opcional)",
  t: "pasiva",
  texto: "Eras de armas de fuego: Renacimiento, Edad Industrial, Moderna y Futurista (Blásters).\n**Propiedades especiales:**\n- **Munición (Ammunition):** Tras un combate puedes gastar 1 minuto para recuperar la mitad de la munición gastada.\n- **Bláster (Blaster):** Arma a distancia que no necesita munición (cuenta como propiedad Munición).\n- **Enfriamiento (Cooldown):** Solo puedes disparar 1 vez al usar tu acción, acción adicional o reacción para dispararla, sin importar la cantidad de ataques normales que tengas (cuenta como propiedad Recarga [Loading]).\n- **Sutil (Finesse):** Puedes elegir usar Fuerza o Destreza.\n- **Arma de fuego (Firearm):** No sumas tu modificador de característica al daño, a menos que se indique lo contrario. La munición de fuego se destruye tras su uso.\n- **Retroceso (Recoil):** Después de atacar, no puedes hacer ataques a distancia más allá del alcance normal hasta el final de tu turno actual.\n- **Recargar (Reload):** Puede hacer X ataques antes de recargar. Si tienes competencia, requiere 1 Acción o Acción Adicional. Sin ella, requiere 1 Acción."
};

export const propiedades_maestrias_armas = {
  n: "Propiedades y Maestrías de Armas de Fuego",
  rasgos: [
    {
      nombre: "Propiedades Específicas de Armas",
      t: "pasiva",
      texto: "- **Ligera (Light):** Cuando realizas la acción de Atacar en tu turno y atacas con un arma Ligera, puedes hacer un ataque extra como acción adicional más tarde en el mismo turno. Ese ataque extra debe hacerse con un arma Ligera diferente, y no sumas tu modificador de característica al daño del ataque extra a menos que el modificador sea negativo.\n- **Alcance (Range):** El arma tiene un alcance entre paréntesis tras su propiedad. El primer número es el alcance normal en pies, y el segundo es el alcance largo. Atacar a un objetivo más allá del alcance normal impone desventaja. No puedes atacar más allá del alcance largo.\n- **Retroceso (Recoil):** Tras hacer un ataque con esta arma, no puedes hacer ataques a distancia más allá del alcance normal del arma hasta el final del turno actual.\n- **Recarga (Reload):** El arma se puede usar para hacer un número determinado de ataques antes de tener que recargarla. Si eres competente con el arma, recargarla requiere una acción o una acción adicional; de lo contrario, requiere una acción.\n- **Dos Manos (Two-Handed):** Requiere dos manos para atacar con ella."
    },
    {
      nombre: "Propiedades de Maestría",
      t: "pasiva",
      texto: "Cada arma tiene una propiedad de maestría utilizable solo por personajes con un rasgo, como Maestría con Armas (Weapon Mastery), que la desbloquee.\n- **Automática (Automatic):** Al hacer un ataque con esta arma, puedes elegir hacer dos ataques en su lugar. Estos ataques siempre se hacen con Desventaja, independientemente de las circunstancias. No puedes reemplazar estos ataques. Si el arma usa Munición, estos ataques consumen el doble de munición normal.\n- **Contundente (Bludgeon):** Puedes tratar esta arma como un arma cuerpo a cuerpo con la propiedad Sutil (Finesse). Al impactar a una criatura con un ataque cuerpo a cuerpo usando esta arma, inflige daño Contundente igual a 1d6 más el modificador de característica usado, o 1d8 si se usan las dos manos para el ataque.\n- **Estallido (Explode):** Al realizar la acción de Atacar, puedes reemplazar uno de tus ataques por una explosión del proyectil. Es una Esfera de 5 pies centrada en un punto que elijas dentro del alcance normal del arma. Cada criatura en la Esfera hace una salvación de Destreza (CD 8 + tu modificador de Fuerza o Destreza + tu Bonificador por Competencia). Si falla, sufre el daño del arma (sin sumar el modificador de característica a menos que sea negativo). Si tiene éxito, sufre la mitad de daño. Solo puedes crear una explosión una vez por turno.\n- **Sacudida (PROPUESTA) (Jolt):** Si impactas a una criatura con esta arma, la criatura no puede hacer Ataques de Oportunidad hasta el inicio de su próximo turno.\n- **Montada (Mounted):** Puedes usar una acción adicional para montar esta arma en una posición fija hasta el final de tu turno. Un valor de daño entre paréntesis aparece con esta propiedad. Mientras está montada, el arma inflige ese daño al hacer un ataque a distancia y no se puede mover.\n- **Sobrecalentamiento (Overheat):** Si impactas a un objetivo con esta arma, puedes sobrecargarla. Si lo haces, el objetivo sufre daño adicional del tipo del arma igual a tu Bonificador por Competencia. Luego, el arma se Sobrecalienta. Un arma Sobrecalentada no puede usarse para atacar de nuevo hasta el final de tu próximo turno.\n- **Empujar (Push):** Si impactas a una criatura Grande o menor, puedes empujarla hasta 10 pies en línea recta alejándola de ti.\n- **Debilitar (Sap):** Si impactas a una criatura, esta tiene desventaja en su próxima tirada de ataque antes del inicio de tu siguiente turno.\n- **Dispersión (PROPUESTA) (Scatter):** Estar a 5 pies de un enemigo no impone desventaja en tus tiradas de ataque a distancia con esta arma.\n- **Con Mira (PROPUESTA) (Sighted):** Atacar a largo alcance no impone desventaja en tus ataques. Al impactar a una criatura a largo alcance, puedes volver a tirar cualquiera de los dados de daño y debes usar el nuevo resultado.\n- **Ralentizar (Slow):** Si impactas y dañas a una criatura, puedes reducir su Velocidad en 10 pies hasta el inicio de tu próximo turno. Si es impactada por más de un arma con esta propiedad, la reducción no excede los 10 pies.\n- **Vejar (Vex):** Si impactas y dañas a una criatura, tienes ventaja en tu próximo ataque contra ella antes del final de tu siguiente turno."
    }
  ]
};

export const dotes_gunslinger = {
  "blaster-master": {
    nombre: "Maestro de los Blásteres (PROPUESTA) (Blaster Master)",
    requisito: "Nivel 4+, Destreza 13+",
    texto: "Obtienes los siguientes beneficios:\n- **Aumento de Puntuación de Característica:** Aumentas tu puntuación de Destreza en 1, hasta un máximo de 20.\n- **Ruleta de Bláster:** Si sacas el mismo número en dos dados de daño para un arma con la propiedad Arma de Fuego (Firearm), infliges daño adicional igual a ese número. Solo puedes añadir este daño adicional una vez por turno.\n- **Ignorar Enfriamiento:** Ignoras la propiedad Enfriamiento (Cooldown) de las armas.\n- **Correr y Disparar:** Cuando realizas la acción de Correr (Dash) o Destrabarse (Disengage), puedes hacer un ataque a distancia usando un arma como acción adicional."
  },
  "iron-hero": {
    nombre: "Héroe de Hierro (PROPUESTA) (Iron Hero)",
    requisito: "Nivel 4+",
    texto: "Obtienes los siguientes beneficios:\n- **Aumento de Puntuación de Característica:** Aumentas tu puntuación de Fuerza o Destreza en 1, hasta un máximo de 20.\n- **Resolución del Desvalido:** Cuando eres atacado por una criatura con un VD mayor que tu nivel de personaje, obtienes un bonificador de +2 a tu Clase de Armadura para ese ataque.\n- **Golpe Vengativo:** Tienes ventaja en las tiradas de ataque contra cualquier criatura que haya reducido a uno de tus aliados a 0 Puntos de Golpe desde el final de tu último turno.\n- **Intervención Heroica:** Cuando un enemigo que puedes ver realiza una Acción Legendaria, puedes usar tu reacción para interceder y evitar que la Acción Legendaria ocurra. Puedes usar esta reacción un número de veces igual a tu Bonificador por Competencia y recuperas todos los usos gastados al terminar un descanso corto o largo."
  },
  "marksmans-luck": {
    nombre: "Suerte de Tirador (PROPUESTA) (Marksman's Luck)",
    requisito: "Nivel 4+, Destreza 13+",
    texto: "Obtienes los siguientes beneficios:\n- **Aumento de Puntuación de Característica:** Aumentas tu puntuación de Destreza en 1, hasta un máximo de 20.\n- **Voltear Dado:** Una vez por turno, al tirar el daño con un arma a distancia, puedes voltear uno de los dados de daño y usar el número de la parte inferior. No puedes usar esta habilidad en los d4. (Nota: en un dado equilibrado, los números superior e inferior suman uno más que el número máximo del dado).\n- **Crítico Mejorado:** Al lograr un impacto crítico con un arma a distancia, la Velocidad del objetivo se reduce a 0 hasta el final de su siguiente turno."
  },
  "gun-mage-adept": {
    nombre: "Adepto Mago Armado (PROPUESTA) (Gun-Mage Adept)",
    requisito: "Nivel 4+, Rasgo de Lanzamiento de Conjuros o Magia del Pacto",
    texto: "Obtienes los siguientes beneficios:\n- **Aumento de Puntuación de Característica:** Aumentas tu puntuación de Destreza en 1, hasta un máximo de 20.\n- **Competencia con Arma a Distancia:** Obtienes competencia con armas Marciales a distancia.\n- **Truco:** Aprendes el truco Pistolas de Dedos (Finger Guns).\n- **Lista de Conjuros Expandida:** Se añaden los siguientes conjuros a tu lista de conjuros: Campo Antibalístico (Antiballistics Field), Castigo Balístico (Ballistic Smite), Conjurar Bala de Cañón (Conjure Cannonball), Conjurar Cobertura (Conjure Cover), Atascar Arma (Jam Weapon), Recarga Instantánea de Jethro (Jethro's Instant Reload) y Disparo Perforante (Perforating Shot).\n- **Conjuros Preparados:** Eliges un número de conjuros igual a tu Bonificador por Competencia de entre los de la Lista de Conjuros Expandida. Siempre los tienes preparados. Al subir de nivel, puedes reemplazar uno de estos conjuros por otro diferente de la lista expandida."
  }
};

export const conjuros_gunslinger = [
  {
    nombre: "Campo Antibalístico (PROPUESTA) (Antiballistics Field)",
    nivel: 6,
    escuela: "Abjuration",
    tiempo: "1 acción",
    alcance: "Personal (Emanación de 40 pies)",
    componentes: "V, S, M (una pizca de pólvora mojada)",
    duracion: "Concentración, hasta 10 minutos",
    desc: "Una Emanación de 40 pies se extiende desde ti, interrumpiendo proyectiles y causando que las armas a distancia fallen. Dentro de la Emanación, siempre que se use un arma a distancia para un ataque, el arma sufre un fallo inmediato y el ataque se pierde. Un arma que ha fallado no puede usarse para realizar un ataque hasta que una criatura realice la acción de Utilizar para arreglar el fallo. Los ataques a distancia que usen armas cuyos proyectiles pasen a través de la Emanación tienen desventaja y solo infligen la mitad de daño si impactan.",
    clases: ["Cleric", "Necromancer", "Wizard"]
  },
  {
    nombre: "Castigo Balístico (PROPUESTA) (Ballistic Smite)",
    nivel: 1,
    escuela: "Evocation",
    tiempo: "1 acción adicional, que realizas inmediatamente después de impactar a una criatura con un arma a distancia",
    alcance: "Personal",
    componentes: "V",
    duracion: "Instantánea",
    desc: "Elige daño de Ácido, Frío, Fuego, Relámpago, Veneno o Trueno. El objetivo impactado por el ataque recibe 2d6 de daño adicional del tipo elegido. El ataque desencadenante puede infligir el tipo de daño elegido o su tipo de daño normal (a tu elección).\n**En niveles superiores:** El daño aumenta en 1d6 por cada nivel de espacio de conjuro por encima de 1.",
    clases: ["Paladin"]
  },
  {
    nombre: "Disparo Oculto (PROPUESTA) (Concealed Shot)",
    nivel: 0,
    escuela: "Illusion",
    tiempo: "1 acción",
    alcance: "Toque",
    componentes: "S, M (un arma a distancia)",
    duracion: "1 minuto",
    desc: "Un arma a distancia que tocas se vuelve sobrenaturalmente sutil. Durante la duración, al realizar un ataque a distancia con ella, el arma o la munición se vuelve invisible durante el vuelo y el arma se vuelve silenciosa. Si produce humo o luz, el conjuro los suprime. El arma o proyectil vuelve a ser visible tras impactar o fallar. Si estás escondido y el objetivo está a 80 pies o más de ti, el ataque no revela tu ubicación.",
    clases: ["Bard", "Druid", "Necromancer", "Sorcerer", "Warlock", "Warmage", "Wizard"]
  },
  {
    nombre: "Conjurar Bala de Cañón (PROPUESTA) (Conjure Cannonball)",
    nivel: 3,
    escuela: "Conjuration",
    tiempo: "1 acción",
    alcance: "600 pies",
    componentes: "V, S, M (un cañón de réplica pequeño)",
    duracion: "Instantánea",
    desc: "Invocas una bala de cañón, en pleno vuelo y a máxima velocidad, que explota al impactar. Realiza un ataque de conjuro a distancia contra un objetivo que puedas ver dentro del alcance. Si impacta, el objetivo sufre 5d10 de daño Contundente y una explosión se extiende desde él en una Emanación de 5 pies. Toda criatura en la Emanación (salvo el objetivo) hace una salvación de Destreza, sufriendo la mitad del daño en caso de fallar.\n**En niveles superiores:** El daño aumenta en 1d10 por cada nivel de espacio por encima de 3.",
    clases: ["Sorcerer", "Wizard"]
  },
  {
    nombre: "Conjurar Cobertura (PROPUESTA) (Conjure Cover)",
    nivel: 1,
    escuela: "Conjuration",
    tiempo: "1 acción adicional",
    alcance: "10 pies",
    componentes: "V, S, M (una estatuilla de un pato)",
    duracion: "Concentración, hasta 1 hora",
    desc: "Invocas un muro bajo de adoquines a lo largo del suelo en un punto que puedas ver dentro del alcance. El muro tiene 18 pulgadas de grosor y consta de tres segmentos de 5 pies de largo y 3 pies de alto. Cada segmento debe ser contiguo a al menos otro segmento.\nUna criatura Mediana que se agache tras el muro tiene Cobertura Media, y una criatura Pequeña tiene Cobertura de Tres Cuartos. Se puede saltar por encima del muro sin gastar movimiento adicional.\nCada segmento tiene CA 10 y 30 puntos de golpe. Reducir un segmento a 0 puntos de golpe hace que se desmorone y se destruya. El muro desaparece cuando todos los segmentos son destruidos o el conjuro termina.",
    clases: ["Druid", "Investigator", "Paladin", "Sorcerer", "Wizard"]
  },
  {
    nombre: "Pistolas de Dedos (PROPUESTA) (Finger Guns)",
    nivel: 0,
    escuela: "Evocation",
    tiempo: "1 acción adicional",
    alcance: "Personal",
    componentes: "V, S",
    duracion: "1 minuto",
    desc: "Extiendes tu dedo índice y pulgar, en un gesto peligroso que imita un arma. Durante la duración, tu mano cuenta como un arma Simple a Distancia con un alcance de 60/240 pies y la maestría Ralentizar (Slow). Puedes usar tu aptitud mágica en lugar de Destreza para las tiradas de ataque de esta arma. Si impacta, el arma inflige 2d6 de daño de Fuerza y no suma tu modificador de característica al daño.\n**Mejora de Truco:** El alcance normal del arma aumenta en 30 pies y su alcance largo en 120 pies cuando alcanzas los niveles 5 (90/360 pies), 11 (120/480 pies) y 17 (150/600 pies).",
    clases: ["Bard", "Sorcerer", "Warmage", "Wizard"]
  },
  {
    nombre: "Atascar Arma (PROPUESTA) (Jam Weapon)",
    nivel: 2,
    escuela: "Transmutation",
    tiempo: "1 reacción, que realizas cuando una criatura que puedes ver a tu alcance realiza un ataque con un arma a distancia",
    alcance: "60 pies",
    componentes: "V, S, M (una pizca de pólvora mojada)",
    duracion: "Instantánea",
    desc: "El arma que seleccionas sufre un fallo y el ataque se pierde. Un arma que ha fallado no puede usarse para realizar un ataque hasta que una criatura realice la acción de Utilizar para arreglar el fallo.",
    clases: ["Bard", "Witch", "Wizard"]
  },
  {
    nombre: "Recarga Instantánea de Jethro (PROPUESTA) (Jethro's Instant Reload)",
    nivel: 2,
    escuela: "Conjuration",
    tiempo: "1 acción",
    alcance: "Toque",
    componentes: "V, S, M (un casquillo de bala gastado)",
    duracion: "8 horas",
    desc: "Un arma a distancia que tocas queda encantada para recargarse automáticamente. Si el arma tiene las propiedades Enfriamiento, Recarga o Loading, ignoras la propiedad durante la duración. Cuando se agota la munición del arma, la munición que lleves encima se teletransporta dentro del arma.",
    clases: ["Bard", "Investigator", "Ranger", "Wizard"]
  },
  {
    nombre: "Disparo Perforante (PROPUESTA) (Perforating Shot)",
    nivel: 1,
    escuela: "Evocation",
    tiempo: "1 acción adicional, que realizas inmediatamente después de impactar o fallar un ataque a distancia con un arma",
    alcance: "Personal",
    componentes: "V",
    duracion: "Instantánea",
    desc: "En cuanto tu ataque impacta o falla, el arma o la munición se transforma en una Línea de energía mágica de 5 pies de ancho que se extiende hasta el alcance normal del arma. La Línea incluye al objetivo original del ataque. Toda criatura en la Línea realiza una salvación de Destreza, sufriendo daño de Fuerza igual al daño normal del arma si falla, o la mitad si tiene éxito.\n**En niveles superiores:** El daño del arma aumenta en 1d8 por cada nivel de espacio de conjuro por encima de 1.",
    clases: ["Martyr", "Paladin", "Ranger"]
  }
];

export const reglas_subclases_cruzadas = {
  n: "Reglas de Compatibilidad de Subclases (Gunslinger, Captain, Vagabond)",
  rasgos: [
    {
      nombre: "Modificaciones Básicas",
      t: "pasiva",
      texto: "Ciertas subclases son compatibles entre Complete Captain, Complete Gunslinger y Complete Vagabond.\n- **Nombres:** Sustituye el nombre de la clase por la nueva clase, incluyendo referencias a tu nivel.\n- **Dados de Riesgo/Batalla:** 'Dados de Batalla' se convierten en 'Dados de Riesgo' al pasar al Gunslinger (y viceversa).\n- **Compañero (Cohort):** Ignora las referencias al Compañero del Captain.\n- **Maniobras:** Si una subclase te otorga una Maniobra que ya conoces, aprendes una diferente de tu elección."
    },
    {
      nombre: "Subclases Cruzadas Hacia Gunslinger",
      t: "pasiva",
      texto: "Las siguientes subclases externas se pueden jugar en el Gunslinger con las adaptaciones indicadas:\n- **Daggermark (Captain):** Nivel 10 - Tienes ventaja en salvaciones de Destreza.\n- **Dragon Banner (Captain):** Nivel 6 - Reemplaza 'todos tus Dados de Batalla' por 'tres de tus Dados de Batalla'.\n- **Jolly Roger (Captain):** Nivel 10 - El beneficio Flanquear aplica a cualquier aliado en lugar de tu Compañero.\n- **Siegeball Jersey (Captain):** Nivel 6 - Al atacar, reemplaza un ataque para dirigir a un aliado a 60 pies.\n- **Star-Spangled Banner (Captain):** Nivel 3 - Ganas competencia con Escudos. Nivel 6 - Tienes ventaja en ataques de armas durante la primera ronda de combate.\n- **Yellow Sign (Captain):** Nivel 10 - Puedes dar a una criatura Frenética ventaja o desventaja en ataques.\n- **Adrenaline Junkie (Vagabond):** Nivel 3 - No puedes usar un dado con la maniobra Reagrupar.\n- **Brigand, Experiment X, Feylost (Vagabond):** Sin cambios.\n- **Gourmand (Vagabond):** Nivel 10 - Gasta Dado de Golpe al inicio del turno para curar (1/descanso o gastando Dado de Riesgo).\n- **Houndmaster (Vagabond):** Nivel 3 - El Sabueso actúa como el Compañero del Captain, ataca con Carisma. Nivel 5 - Bono de +1 al daño y ataque (aumenta a +2 en nivel 9 y +3 en nivel 13).\n- **Knight Errant, Mage Brand, Plague Doctor, Pugilist, Ronin, Troubadour (Vagabond):** Sin cambios."
    }
  ]
};

```

=== B ===

```
{
  "tabla": {
    "Risk Dice": ["4d8", "4d8", "4d8", "4d8", "4d8", "5d8", "5d8", "5d8", "5d8", "5d10", "5d10", "5d10", "5d10", "6d10", "6d10", "6d10", "6d10", "6d12", "6d12", "6d12"],
    "Weapon Mastery": [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
  },
  "usos": {
    "Risk": { "formula": "@table.risk_dice.count", "reset": "corto" },
    "Cheat Death": { "formula": "1", "reset": "corto" },
    "Headshot": { "formula": "1", "reset": "corto" },
    "Legendary Shot": { "formula": "1", "reset": "corto" },
    "Exotic Caliber": { "formula": "1", "reset": "corto" },
    "Clusterbomb": { "formula": "1", "reset": "corto" },
    "Flash Assault": { "formula": "1", "reset": "corto" },
    "Exit Strategy": { "formula": "1", "reset": "corto" },
    "Pinball Shot": { "formula": "1", "reset": "corto" }
  },
  "conjuros": {
    "spellslinger": {
      "slots": {
        "1": [0,0,2,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
        "2": [0,0,0,0,0,0,2,2,2,3,3,3,3,3,3,3,3,3,3,3],
        "3": [0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,3,3,3,3,3],
        "4": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1]
      },
      "preparados": [0,0,3,4,4,4,5,6,6,7,8,8,9,10,10,11,11,11,12,13]
    }
  },
  "listas_de_eleccion": {
    "dotes_adicionales": [
      "blaster-master",
      "iron-hero",
      "marksmans-luck",
      "gun-mage-adept"
    ]
  }
}

```

=== C ===

```
{
  "gunslinger": "Gunslinger (Mage Hand Press, 2024)",
  "big-game-hunter": "Gunslinger: Big Game Hunter (Mage Hand Press, 2024)",
  "deadeye": "Gunslinger: Deadeye (Mage Hand Press, 2024)",
  "grenadier": "Gunslinger: Grenadier (Mage Hand Press, 2024)",
  "gun-tank": "Gunslinger: Gun Tank (Mage Hand Press, 2024)",
  "gun-ko-master": "Gunslinger: Gun-Ko Master (Mage Hand Press, 2024)",
  "high-roller": "Gunslinger: High Roller (Mage Hand Press, 2024)",
  "laserist": "Gunslinger: Laserist (Mage Hand Press, 2024)",
  "musketeer": "Gunslinger: Musketeer (Mage Hand Press, 2024)",
  "pistolero": "Gunslinger: Pistolero (Mage Hand Press, 2024)",
  "secret-agent": "Gunslinger: Secret Agent (Mage Hand Press, 2024)",
  "space-cowboy": "Gunslinger: Space Cowboy (Mage Hand Press, 2024)",
  "spellslinger": "Gunslinger: Spellslinger (Mage Hand Press, 2024)",
  "trick-shot": "Gunslinger: Trick Shot (Mage Hand Press, 2024)",
  "white-hat": "Gunslinger: White Hat (Mage Hand Press, 2024)",
  "conjuros": "Gunslinger - New Spells (Mage Hand Press, 2024)",
  "dotes": "Gunslinger - New Feats (Mage Hand Press, 2024)"
}

```

=== D ===

```
{
  "gunslinger": "Renegados atrevidos que desafían la tradición, confiando en sus reflejos, suerte y ruidosas armas de fuego.",
  "big-game-hunter": "Cazadores implacables que usan enormes y destructivas armas de fuego para derribar bestias titánicas.",
  "deadeye": "Francotiradores precisos de ágil puntería que buscan el disparo perfecto y letal a gran distancia.",
  "grenadier": "Amantes de la demolición que resuelven todos sus problemas con municiones de alta explosividad.",
  "gun-tank": "Artilleros corpulentos que operan grandes cañones montados como si fueran máquinas de asedio humanas.",
  "gun-ko-master": "Artistas marciales que empuñan el arma de fuego con gracia, usándola en distancias cortas como una extensión de su cuerpo.",
  "high-roller": "Apostadores temerarios que se juegan la vida en los combates, apostando todo al azar para obtener la máxima letalidad.",
  "laserist": "Tiradores tecnológicos que modifican blásteres de energía pura para maximizar su mortífero potencial científico.",
  "musketeer": "Soldados honorables y valientes que combinan tácticas de choque cuerpo a cuerpo con armas blancas y de fuego junto a sus aliados.",
  "pistolero": "Pistoleros veloces que desatan lluvias letales de balas disparando desde la cadera en un abrir y cerrar de ojos.",
  "secret-agent": "Espías encubiertos especializados en guerra clandestina, disfraces, escape y asesinatos estratégicos.",
  "space-cowboy": "Cazarrecompensas libres y rebeldes que dominan blásteres altamente modificados llevados hasta el punto del sobrecalentamiento.",
  "spellslinger": "Combatientes mágicos que disparan balas impregnadas de energía arcana fusionando pólvora y hechicería.",
  "trick-shot": "Acróbatas de las balas que logran ángulos imposibles haciendo rebotar sus proyectiles entre múltiples enemigos.",
  "white-hat": "Protectores virtuosos con una inquebrantable moral que obligan pacíficamente a sus enemigos a rendirse ante la ley.",
  "blaster-master": "Ignoras el enfriamiento de los blásteres y disparas mientras corres.",
  "iron-hero": "Resistes en desventaja e interrumpes acciones legendarias del enemigo.",
  "marksmans-luck": "Inmovilizas a tus enemigos con críticos y mejoras los dados de daño a distancia.",
  "gun-mage-adept": "Ganas trucos, competencia a distancia y conjuros arcanos expandidos."
}

```

=== E ===
Todo consolidado de los lotes 31a y 31b, adaptado sin cortes ni omisiones usando los detalles del PDF final. Las propiedades de maestría, dotes, conjuros completos (con la terminología de Acción de Utilizar ajustada a reglas 2024), y subclases se han reunido exitosamente.