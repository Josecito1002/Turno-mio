=== A ===
```typescript
export const INVESTIGATOR_2024 = {
  n: "Investigator",
  dado: 8,
  sv: ["Destreza", "Inteligencia"],
  habN: 3,
  habs: [
    "Conocimiento Arcano", "Atletismo", "Engaño", "Historia", 
    "Perspicacia", "Intimidación", "Investigación", "Medicina", 
    "Naturaleza", "Percepción", "Persuasión", "Sigilo", 
    "Juego de Manos", "Religión"
  ],
  arm: ["Ligera"],
  armas: ["Simples", "Marciales"],
  equipo: "Elige A o B: (A) Armadura de cuero, 2 dagas, estoque, ballesta pesada, 20 virotes, estuche para virotes de ballesta, paquete de explorador de mazmorras y 17 po; o (B) 120 po.",
  rasgos: [
    {
      n: 1,
      t: "pasiva",
      texto: "**Ritualista (Ritualist)**\nHas aprendido a lanzar rituales para superar amenazas sobrenaturales.\n**Grimorio (Grimoire).** Tus rituales están registrados en un grimorio, un objeto Diminuto que pesa 3 libras y contiene 100 páginas. Tú determinas el aspecto y los materiales del grimorio.\nEl grimorio comienza con cuatro conjuros de Investigator de nivel 1 de tu elección. Se recomiendan *Detectar magia*, *Heroísmo*, *Memorizar (Memorize)* y *Baluarte transitorio (Transient Bulwark) (PROPUESTA)*.\nCada vez que ganas un nivel de Investigator, puedes añadir dos conjuros de Investigator de tu elección a tu grimorio. La columna \"Nivel de Ritual\" (Ritual Level) en la tabla del Investigator muestra el nivel máximo de conjuro que puedes añadir a tu grimorio.\n**Lanzamiento de rituales.** Puedes lanzar cualquier conjuro como un ritual si ese conjuro tiene la etiqueta de Ritual y está en tu grimorio. Debes leer del libro para lanzar un conjuro de esta manera. No puedes lanzar conjuros que estén en tu grimorio excepto como rituales, a menos que los hayas aprendido por otros medios.\n**Ampliar y reemplazar un grimorio.** Los conjuros que añades a tu grimorio representan tu investigación sobre lo oculto y las amenazas sobrenaturales, pero podrías encontrar otros conjuros durante tus aventuras que puedes añadir a tu grimorio.\n- *Copiar un conjuro en el grimorio:* Cuando encuentras un conjuro de Investigator de nivel 1+, puedes copiarlo en tu grimorio si es de un nivel elegible y si tienes tiempo para copiarlo. Por cada nivel del conjuro, la transcripción toma 2 horas y cuesta 50 po.\n- *Copiar el grimorio:* Puedes copiar un conjuro de tu grimorio a otro libro. Esto es como copiar un conjuro nuevo en tu grimorio pero más rápido, ya que ya sabes cómo lanzar el conjuro. Solo necesitas gastar 1 hora y 10 po por cada nivel del conjuro copiado.\nSi pierdes tu grimorio, puedes recordar de memoria un número de conjuros igual a tu nivel de Investigator y usar el mismo procedimiento para transcribir los conjuros en un nuevo grimorio. Rellenar el resto del nuevo libro requiere que encuentres nuevos conjuros para hacerlo. Por esta razón, muchos Investigators guardan un grimorio de respaldo.\n**Rituales adicionales.** Puedes tratar conjuros específicos como si tuvieran la etiqueta de Ritual, lo que te permite añadirlos a tu grimorio y lanzarlos como rituales. Estos conjuros están marcados en la lista de conjuros del Investigator.\n**Aptitud mágica.** La Inteligencia es tu aptitud mágica para tus conjuros de Investigator."
    },
    {
      n: 1,
      t: "pasiva",
      texto: "**Maestría en Armas (Weapon Mastery)**\nTu entrenamiento con armas te permite usar las propiedades de maestría de dos tipos de armas de tu elección con las que tengas competencia, como los estoques y las ballestas pesadas.\nCada vez que terminas un descanso largo, puedes cambiar los tipos de armas que elegiste."
    },
    {
      n: 2,
      t: "pasiva",
      texto: "**Pericia (Expertise)**\nGanas Pericia en dos competencias en habilidades de tu elección. Se recomiendan Conocimiento Arcano e Investigación si tienes competencia en ellas."
    },
    {
      n: 2,
      t: "pasiva",
      texto: "**Golpe de Gracia (Finisher)**\nUna vez por turno, cuando infliges daño con un arma a una criatura que está Malherida, puedes infligir 1d8 de daño adicional al objetivo. El daño es del mismo tipo que el daño infligido por el arma.\nEste daño aumenta a medida que ganas niveles de Investigator, como se muestra en la columna \"Golpe de Gracia\" de la tabla."
    },
    {
      n: 2,
      t: "adicional",
      texto: "**Conjuro Apresurado (Rushed Incantation) (PROPUESTA)**\nPuedes realizar apresuradamente cualquier conjuro en tu grimorio que tenga un tiempo de lanzamiento de una acción o acción adicional, lanzando el conjuro como una acción adicional. Puedes lanzarlo sin componentes Materiales a menos que los componentes tengan un coste de 100 po o más especificado por el conjuro.\nPuedes usar este rasgo 3 veces. Recuperas uno de sus usos gastados cuando terminas un descanso corto, y recuperas todos los usos gastados cuando terminas un descanso largo. Ganas usos adicionales cuando alcanzas ciertos niveles de Investigator, como se muestra en la columna correspondiente de la tabla."
    },
    {
      n: 3,
      t: "pasiva",
      texto: "**Subclase de Investigator (Investigator Subclass)**\nObtienes una subclase de Investigator de tu elección. Una subclase es una especialización que te otorga rasgos en ciertos niveles de Investigator. Por el resto de tu carrera, obtienes cada uno de los rasgos de tu subclase que sean de tu nivel de Investigator o inferior."
    },
    {
      n: 3,
      t: "pasiva",
      texto: "**Amuletos (Trinkets)**\nTu subclase te otorga un número de amuletos sobrenaturales para ayudarte a derrotar amenazas sobrenaturales y desentrañar misterios. Puedes usar este rasgo 2 veces, activando una de tus opciones de amuleto cada vez que lo usas. Recuperas uno de sus usos gastados cuando terminas un descanso corto, y recuperas todos los usos gastados cuando terminas un descanso largo. Ganas usos adicionales cuando alcanzas ciertos niveles de Investigator, como se muestra en la columna \"Amuletos\" de la tabla."
    },
    {
      n: 4,
      t: "pasiva",
      texto: "**Mejora de Característica (Ability Score Improvement)**\nObtienes la dote Mejora de Característica u otra dote de tu elección para la cual cumplas los requisitos. Obtienes este rasgo de nuevo en los niveles 8, 12 y 16 de Investigator."
    },
    {
      n: 5,
      t: "pasiva",
      texto: "**Explotar Debilidad (Exploit Weakness)**\nUna vez por turno, cuando infliges daño a una criatura con un ataque usando un arma, puedes apuntar a donde la criatura es más vulnerable para obtener los siguientes beneficios.\n**Vulnerabilidad al daño.** Elige un tipo de daño infligido por el ataque. El objetivo tiene Vulnerabilidad al tipo de daño elegido para este ataque. La Vulnerabilidad otorgada por este rasgo no duplica el daño adicional de conjuros (como *Marca del cazador*) o de rasgos de otras clases (como el Ataque furtivo del Pícaro). La Vulnerabilidad no se aplica a este ataque si el objetivo tiene Inmunidad al tipo de daño elegido.\n**Interrumpir resistencia.** Si el objetivo tiene Resistencia a uno o más tipos de daño, pierde estas Resistencias hasta el inicio de tu próximo turno, incluso contra el daño del ataque desencadenante."
    },
    {
      n: 7,
      t: "adicional",
      texto: "**Amuletos Sagrados (Holy Trinkets)**\nMantienes una amplia variedad de Símbolos Sagrados y objetos bendecidos contigo, incluso si no eres particularmente piadoso. Puedes usar los siguientes amuletos (gastando un uso de tus Amuletos para hacerlo).\n- **Amuleto de Protección (Amulet of Warding).** Como acción adicional, colocas una guarda divina sobre una criatura de tu elección a menos de 60 pies de ti. Hasta el inicio de tu próximo turno, la criatura guardada obtiene una bonificación a la CA y a las tiradas de salvación igual a tu modificador por Inteligencia (mínimo de +1).\n- **Anj Restaurador (Restorative Ankh).** Como acción adicional, una criatura de tu elección a menos de 60 pies de ti recupera Puntos de Golpe iguales a tu nivel de Investigator más tu modificador por Inteligencia.\n- **Runa de Destierro (Rune of Banishment).** Como acción adicional, elige una criatura que puedas ver a menos de 60 pies de ti. La criatura debe tener éxito en una tirada de salvación de Carisma contra tu CD de salvación de conjuros o será desterrada a un lugar inofensivo en el Plano Etéreo. Mientras está desterrada, el objetivo tiene la condición de Incapacitado y su Velocidad es 0. Al inicio de tu próximo turno, la criatura reaparece en el espacio que dejó o en el espacio desocupado más cercano si ese espacio está ocupado."
    },
    {
      n: 8,
      t: "pasiva",
      texto: "**Mejora de Característica (Ability Score Improvement)**\nObtienes la dote Mejora de Característica u otra dote de tu elección para la cual cumplas los requisitos."
    },
    {
      n: 9,
      t: "pasiva",
      texto: "**Pericia (Expertise)**\nGanas Pericia en dos de tus competencias en habilidades adicionales de tu elección."
    },
    {
      n: 11,
      t: "pasiva",
      texto: "**Golpe de Gracia Mejorado (Improved Finisher)**\nCuando realizas la acción de Atacar en tu turno, puedes usar tu Golpe de Gracia en una criatura que no esté Malherida, infligiendo solo 1d8 de daño adicional al objetivo."
    },
    {
      n: 12,
      t: "pasiva",
      texto: "**Mejora de Característica (Ability Score Improvement)**\nObtienes la dote Mejora de Característica u otra dote de tu elección para la cual cumplas los requisitos."
    },
    {
      n: 13,
      t: "pasiva",
      texto: "**Enigma Arcano (Enigma Arcane)**\nAprendes un secreto que desbloquea magia arcana potente. Obtienes la capacidad de lanzar un conjuro de nivel 7, y descubres secretos adicionales cuando alcanzas ciertos niveles de Investigator.\n**Conjuro de nivel 7.** Puedes lanzar uno de los siguientes conjuros sin usar un espacio de conjuro y recuperas la capacidad de hacerlo cuando terminas un descanso largo: *Espejismo arcano*, *Desplazamiento entre planos*, *Invertir gravedad*, *Secuestrar* o *Teletransportar*."
    },
    {
      n: 15,
      t: "pasiva",
      texto: "**Enigma Arcano (Enigma Arcane)**\n**Conjuro de nivel 8.** Puedes lanzar uno de los siguientes conjuros sin usar un espacio de conjuro y recuperas la capacidad de hacerlo cuando terminas un descanso largo: *Campo antimagia*, *Labia*, *Laberinto* o *Mente en blanco*."
    },
    {
      n: 16,
      t: "pasiva",
      texto: "**Mejora de Característica (Ability Score Improvement)**\nObtienes la dote Mejora de Característica u otra dote de tu elección para la cual cumplas los requisitos."
    },
    {
      n: 17,
      t: "pasiva",
      texto: "**Enigma Arcano (Enigma Arcane)**\n**Conjuro de nivel 9.** Puedes lanzar uno de los siguientes conjuros sin usar un espacio de conjuro y recuperas la capacidad de hacerlo cuando terminas un descanso largo: *Proyección astral*, *Puerta* o *Asesino fantasmal*."
    },
    {
      n: 17,
      t: "pasiva",
      texto: "**Golpe de Gracia Mejorado (Improved Finisher)**\nEl daño que infliges al usar Golpe de Gracia en una criatura que no está Malherida aumenta a 2d8."
    },
    {
      n: 18,
      t: "pasiva",
      texto: "**Resolución Sobrenatural (Supernatural Resolve)**\nTienes ventaja en las tiradas de salvación contra conjuros y otros efectos mágicos a menos que tengas la condición de Incapacitado."
    },
    {
      n: 19,
      t: "pasiva",
      texto: "**Don Épico (Epic Boon)**\nObtienes una dote de Don Épico u otra dote de tu elección para la cual cumplas los requisitos."
    },
    {
      n: 20,
      t: "pasiva",
      texto: "**Enlazahechizos (Spellbinder) (PROPUESTA)**\nElige 5 conjuros de Investigator en tu grimorio de niveles 1 a 3 que tengan un tiempo de lanzamiento de una acción o acción adicional. Puedes usar Conjuro Apresurado para lanzar los conjuros elegidos sin gastar un uso del rasgo, y no necesitas leer de tu grimorio para lanzarlos.\nCada vez que terminas un descanso largo, puedes reemplazar uno de esos conjuros con otro conjuro en tu grimorio."
    }
  ]
};
```

=== B ===
```json
{
  "progresion": [
    { "nivel": 1, "ritualLevel": 1, "rushedIncantation": 0, "finisher": null, "trinkets": 0 },
    { "nivel": 2, "ritualLevel": 1, "rushedIncantation": 3, "finisher": "1d8", "trinkets": 0 },
    { "nivel": 3, "ritualLevel": 2, "rushedIncantation": 4, "finisher": "1d8", "trinkets": 2 },
    { "nivel": 4, "ritualLevel": 2, "rushedIncantation": 4, "finisher": "1d8", "trinkets": 2 },
    { "nivel": 5, "ritualLevel": 3, "rushedIncantation": 5, "finisher": "1d8", "trinkets": 3 },
    { "nivel": 6, "ritualLevel": 3, "rushedIncantation": 5, "finisher": "1d8", "trinkets": 3 },
    { "nivel": 7, "ritualLevel": 4, "rushedIncantation": 6, "finisher": "1d8", "trinkets": 3 },
    { "nivel": 8, "ritualLevel": 4, "rushedIncantation": 6, "finisher": "1d8", "trinkets": 3 },
    { "nivel": 9, "ritualLevel": 5, "rushedIncantation": 7, "finisher": "1d8", "trinkets": 4 },
    { "nivel": 10, "ritualLevel": 5, "rushedIncantation": 7, "finisher": "1d8", "trinkets": 4 },
    { "nivel": 11, "ritualLevel": 6, "rushedIncantation": 7, "finisher": "2d8", "trinkets": 4 },
    { "nivel": 12, "ritualLevel": 6, "rushedIncantation": 8, "finisher": "2d8", "trinkets": 4 },
    { "nivel": 13, "ritualLevel": 6, "rushedIncantation": 8, "finisher": "2d8", "trinkets": 5 },
    { "nivel": 14, "ritualLevel": 6, "rushedIncantation": 8, "finisher": "2d8", "trinkets": 5 },
    { "nivel": 15, "ritualLevel": 6, "rushedIncantation": 9, "finisher": "2d8", "trinkets": 5 },
    { "nivel": 16, "ritualLevel": 6, "rushedIncantation": 9, "finisher": "2d8", "trinkets": 5 },
    { "nivel": 17, "ritualLevel": 6, "rushedIncantation": 9, "finisher": "3d8", "trinkets": 6 },
    { "nivel": 18, "ritualLevel": 6, "rushedIncantation": 10, "finisher": "3d8", "trinkets": 6 },
    { "nivel": 19, "ritualLevel": 6, "rushedIncantation": 10, "finisher": "3d8", "trinkets": 6 },
    { "nivel": 20, "ritualLevel": 6, "rushedIncantation": 10, "finisher": "3d8", "trinkets": 6 }
  ],
  "usos": {
    "rushedIncantation": "Se recupera 1 uso al terminar un descanso corto, y todos los usos al terminar un descanso largo.",
    "trinkets": "Se recupera 1 uso al terminar un descanso corto, y todos los usos al terminar un descanso largo."
  },
  "capacidadGrimorio": "[NO CONFIRMADO] El texto indica que el grimorio contiene 100 páginas, pero no especifica la cantidad de páginas que ocupa cada conjuro por nivel (a diferencia del Mago que usa 1 página por nivel). Por tanto, el número exacto de conjuros que caben en él físicamente es ambiguo."
}
```

=== C ===
```json
{
  "investigator": "Investigator (Mage Hand Press, 2024)"
}
```

=== D ===
```json
{
  "investigator": "Cazadores de monstruos y detectives de lo paranormal, los Investigadores usan una mezcla de magia prohibida a través de rituales, conocimiento de debilidades y su grimorio especializado para erradicar amenazas sobrenaturales."
}
```

=== E ===
**Dudas o [NO CONFIRMADO]:**
1. **Páginas del Grimorio:** A diferencia del manual base donde se detalla que un conjuro ocupa 1 página por nivel del conjuro, las reglas del Investigator mencionan las 100 páginas del libro, el tiempo y el coste por nivel (2 horas y 50 po), pero no afirman de forma explícita si el consumo de páginas sigue la misma regla. Lo dejé como [NO CONFIRMADO] en el JSON B por rigor literal.
2. **Weird:** Traduje el conjuro *Weird* (nivel 9) como *Asesino fantasmal*, siguiendo su traducción oficial histórica en D&D 5e español.
3. Propuestas de nombres marcadas para las mecánicas exclusivas: "Rushed Incantation" -> Conjuro Apresurado, "Spellbinder" -> Enlazahechizos, "Transient Bulwark" -> Baluarte transitorio.