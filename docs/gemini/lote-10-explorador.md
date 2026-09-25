# Encargo: Lote 10 (Explorador) de la app "Mi turno"

"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el formato
de abajo, la clase **Explorador** y todas sus subclases, usando **solo el texto oficial en inglés que viene al final** de
este encargo. Ese texto ya es la versión más reciente de cada cosa y sus niveles ya están adaptados a 2024: no busques
otras versiones ni cambies niveles. Otra persona revisa y aplica tu respuesta con un script, así que el formato tiene
que ser exacto.

## Reglas

1. **Una subclase por cada subclase del texto oficial**, ni más ni menos. Si la app ya la tiene (lista "Lo que tiene
   hoy la app"), usa su misma clave; si es nueva, inventa una clave en minúsculas-con-guiones.
2. **Textos propios en español**, de 1 a 3 frases por rasgo, que expliquen qué hace para quien juega. No traduzcas
   literal: resume con tus palabras. Nombres: la traducción oficial al español si la conoces.
3. **Conjuros con el nombre exacto de la lista "Conjuros de la app"** (por ejemplo "Ayuda", no "Auxilio"). Si uno no
   está en la lista, pon tu traducción y detrás (NO ESTÁ EN LA APP).
4. Tipos de acción para `t`: accion, adicional (acción adicional), reaccion, gratis (sin acción, por ejemplo al acertar),
   pasiva, fuera (fuera de combate o ritual).
5. Si algo no se entiende en el texto oficial, escríbelo igual con la marca [NO CONFIRMADO].

## Formato de la respuesta

Responde **solo** con estas cinco partes, en este orden, cada una empezando con su marcador solo en una línea
(`=== A ===`, `=== B ===`...). Nada antes de la primera ni después de la última.

=== A ===
Código TypeScript, exactamente con esta forma:

```ts
const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const EXPLORADOR_2024 = {
  // Rasgos de la clase de nivel 6 a 20 (sin "Ability Score Improvement", "Epic Boon" ni "Subclass Feature")
  rasgosAltos: [
    r(9, 'Nombre del rasgo', 'accion', 'Texto propio.', { usos: 1, reset: 'largo' }),  // usos/reset solo si son un número fijo
  ],
  // Rasgos de nivel 6 en adelante de las subclases integradas en la app (claves: ninguna)
  subAltos: {
    // ninguna
  },
  // Todas las demás subclases, completas (todos sus niveles)
  subclases: {
    'clave': { n: 'Nombre en español', rasgos: [ r(3, '...', 'pasiva', '...') ] },
  },
};
```

Si una subclase tiene conjuros siempre preparados, van en un rasgo llamado "Conjuros del <nombre de la subclase>" cuyo
texto solo diga en qué niveles se amplían; la lista va en B.

=== B ===
JSON con lo que la app calcula o deja elegir. Fórmulas con: `nivel` (de la clase), `pb` (competencia),
`FUE DES CON INT SAB CAR` (modificadores), `CD`, `ataqueConjuro`, `max(a, b)`. "donde" es "clase" o la clave de la
subclase, y "rasgo" el nombre exacto que usaste en A.

```json
[
  { "donde": "clave", "rasgo": "Nombre", "tipo": "usos", "usos": "max(1, SAB)", "reset": "largo | corto | corto desde nivel 6" },
  { "donde": "clave", "rasgo": "Nombre", "tipo": "conjuros", "por_nivel": { "3": ["Bendecir"], "5": [], "7": [], "9": [] } },
  { "donde": "clave", "rasgo": "Nombre", "tipo": "eleccion", "id": "id-corto", "cuantas": "1 | 2; 3 desde nivel 10",
    "opciones": [ { "key": "id-corto", "nombre": "...", "desc": "1 frase propia", "nivel": 1, "requiere": null } ] },
  { "donde": "clave", "rasgo": "Nombre", "tipo": "otro", "detalle": "daños, CA, velocidad, resistencias... en una frase con su fórmula" }
]
```

=== C ===
JSON `{ "clave": "Libro (año)" }` con el libro de cada subclase, copiado del texto oficial.

=== D ===
JSON `{ "clave": "1 o 2 frases propias que presenten la subclase a quien no la conoce" }`.

=== E ===
Lista breve: qué difiere de lo que tiene hoy la app (rasgos que cambian de nivel, de tipo o de nombre, subclases
nuevas). Si algo de lo integrado en la app (clase de nivel 1 a 5, o los primeros niveles de las subclases integradas)
está mal según el texto oficial, di cuál y cómo debería quedar.

## Lo que tiene hoy la app

### Clase Explorador, niveles 1 a 5 (integrados)
- Nivel 1 · Marca del Cazador [adicional]: Siempre preparada (concentración, 1 hora): +1d6 de fuerza al golpear a la criatura marcada, y ventaja en Percepción o Supervivencia para encontrarla.
- Nivel 1 · Maestría con Armas [pasiva]: Usas la maestría de 2 tipos de armas (elígelas en Equipo). Puedes cambiarlas en cada descanso largo.
- Nivel 2 · Explorador Hábil [pasiva]: Pericia en una habilidad (elígela en Habilidades) y dos idiomas más.
- Nivel 5 · Ataque Extra [pasiva]: Cuando usas la acción Atacar, atacas dos veces.

### Rasgos de nivel alto de la clase
- Nivel 6 · Errante [pasiva]: Tu velocidad aumenta 10 pies. Ganas velocidad de Trepar y Nadar.
- Nivel 10 · Incansable [pasiva]: Acción para ganar PG temporales (1d8 + SAB). Reduce nivel de agotamiento en Descanso Corto.
- Nivel 14 · Velo de la Naturaleza [adicional]: Acción Adicional para volverte Invisible hasta el final de tu siguiente turno.
- Nivel 10 · Ocultarse a Plena Vista [pasiva]: Camuflaje que te da +10 a Sigilo si no te mueves.
- Nivel 20 · Cazador de Enemigos [pasiva]: El daño de tu Marca del Cazador aumenta de 1d6 a 1d10.

### Cazador (clave `cazador`)
- Nivel 3 · Presa del Cazador [reaccion]: Elige Coloso Matador (+1d8 daño), Asesino de Gigantes (reacción para atacar) o Cazador de Hordas (ataque extra a otro objetivo).
- Nivel 7 · Tácticas Defensivas [pasiva]: Evasión contra ataques de área o defensa contra multiataques.
- Nivel 11 · Multiataque del Cazador [pasiva]: Aprendes el conjuro Conjurar Descarga y puedes lanzarlo con espacios de menor nivel.
- Nivel 15 · Defensa Superior [pasiva]: Esquiva asombrosa o mantenerse en pie tras golpes fatales.

### Maestro de Bestias (clave `bestias`)
- Nivel 3 · Compañero del Explorador [pasiva]: Invocas un espíritu animal (Tierra, Mar o Aire) que actúa en tu turno.
- Nivel 7 · Entrenamiento Excepcional [pasiva]: Tu bestia puede hacer acciones adicionales y sus ataques son mágicos.
- Nivel 11 · Furia de Bestia [pasiva]: Tu compañero puede hacer dos ataques.
- Nivel 15 · Compartir Conjuros [pasiva]: Cuando te lanzas un conjuro, también afecta a tu bestia.

### Caminante de las Hadas (clave `hadas`)
- Nivel 3 · Ataque Pavoroso [pasiva]: +1d4 daño psíquico a tus ataques.
- Nivel 3 · Magia Feérica [pasiva]: Aprendes conjuros como Sonrisa de Tasha y Paso Brumoso.
- Nivel 7 · Giro Etéreo [pasiva]: Si alguien falla una salvación contra encanto/miedo cerca de ti, puedes intentar encantar a otro.
- Nivel 15 · Paso Nebuloso [pasiva]: Puedes teletransportarte y llevar aliados contigo varias veces al día.

### Acechador de las Sombras (clave `sombras`)
- Nivel 3 · Emboscador Temible [pasiva]: Sumas SAB a Iniciativa. +10 velocidad en primer turno. Puedes infligir daño extra (2d6?) en ataques varias veces al día.
- Nivel 3 · Vista Umbría [pasiva]: Visión en la oscuridad 60 pies. Eres invisible para criaturas que dependen de visión oscura.
- Nivel 7 · Mente de Hierro [pasiva]: Competencia en salvaciones de Sabiduría.
- Nivel 11 · Ráfaga del Acechador [pasiva]: Si fallas un ataque, puedes hacer otro inmediatamente.

### Caminante del Invierno (clave `caminante-invierno`)
- Nivel 3 · Explorador Gélido [gratis]: Obtienes los siguientes beneficios. Frío Mordiente: el daño de tus ataques con arma, conjuros de Explorador y rasgos de Explorador ignora la Resistencia al daño de Frío. Resistencia a la Escarcha: tienes Resistencia al daño de Frío. Golpes Polares: cuando golpeas a una criatura con una tirada de ataque usando un arma, puedes infligir 1d4 de daño de Frío adicional al objetivo, que solo puede recibir este daño adicional una vez por turno. Cuando alcanzas el nivel 11 de Explorador, este daño adicional aumenta a 1d6.
- Nivel 3 · Escarcha del Cazador [pasiva]: El hielo te cubre a ti y a tu presa, protegiéndote y obstaculizándola. Cuando lanzas Marca del Cazador, obtienes Puntos de Golpe temporales iguales a 1d10 + tu nivel de Explorador. Además, mientras una criatura esté marcada por tu Marca del Cazador, no puede usar la acción de Destrabarse.
- Nivel 3 · Conjuros del Caminante del Invierno [pasiva]: Cuando alcanzas un nivel de Explorador indicado en la tabla Conjuros del Caminante del Invierno, a partir de ese momento siempre tienes preparados los conjuros indicados. Nivel 3: Cuchillo de Hielo. Nivel 5: Inmovilizar Persona. Nivel 9: Quitar Maldición. Nivel 13: Tormenta de Hielo. Nivel 17: Cono de Frío.
- Nivel 7 · Alma Fortalecedora [accion]: Tu experiencia sobreviviendo entornos angustiosos te permite reforzar a tus aliados además de a ti mismo. Como acción Mágica, elige un número de criaturas que puedas ver igual a tu modificador de Sabiduría (mínimo una). Cada criatura elegida recupera Puntos de Golpe iguales a 1d10 + tu nivel de Explorador y tiene Ventaja en tiradas de salvación para evitar o terminar el estado Asustado durante 1 hora.
- Nivel 11 · Alma Congelada [pasiva]: Tu esencia se vuelve gélida, otorgándote los siguientes beneficios. Alma Helada: tienes Inmunidad al daño de Frío. Cuando adoptas esta forma por primera vez y al inicio de cada uno de tus turnos siguientes, cada criatura de tu elección en una emanación de 15 pies originada en ti recibe 2d4 de daño de Frío. Parcialmente Incorpóreo: tienes Inmunidad a los estados Agarrado, Derribado y Apresado. Puedes atravesar criaturas y objetos como si fueran Terreno Difícil, pero recibes 1d10 de daño de Fuerza si terminas tu turno dentro de una criatura o un objeto. Si la forma termina mientras estás dentro de una criatura u objeto, eres expulsado al espacio desocupado más cercano.

### Selectores que faltan en este lote
- [ ] **Cazador: Presa del Cazador y Tácticas Defensivas**: Asesino de Colosos o Rompehordas (nivel 3) y su defensa (nivel 7); se cambian en un descanso.
- [ ] **Maestro de Bestias: bestia primigenia**: de tierra, de mar o del cielo; cambia sus estadísticas y su ataque.

## Texto oficial (fuente única)

### Clase Explorador (Manual del Jugador 2024)
- Nivel 1 · Spellcasting: You have learned to channel the magical essence of nature to cast spells. See 7 for the rules on spellcasting. The information below details how you use those rules with Ranger spells, which appear in the Ranger spell list later in the class's description. [Spell Slots] The Ranger Features table shows how many spell slots you have to cast your level 1+ spells. You regain all expended slots when you finish a Long Rest. [Prepared Spells of Level 1+] You prepare the list of level 1+ spells that are available for you to cast with this feature. To start, choose two level 1 Ranger spells. Cure Wounds and Ensnaring Strike are recommended. The number of spells on your list increases as you gain Ranger levels, as shown in the Prepared Spells column of the Ranger Features table. Whenever that number increases, choose additional Ranger spells until the number of spells on your list matches the number in the Ranger Features table. The chosen spells must be of a level for which you have spell slots. For example, if you're a level 5 Ranger, your list of prepared spells can include six Ranger spells of level 1 or 2 in any combination. If another Ranger feature gives you spells that you always have prepared, those spells don't count against the number of spells you can prepare with this feature, but those spells otherwise count as Ranger spells for you. [Changing Your Prepared Spells] Whenever you finish a Long Rest, you can replace one spell on your list with another Ranger spell for which you have spell slots. [Spellcasting Ability] Wisdom is your spellcasting ability for your Ranger spells. [Spellcasting Focus] You can use a Druidic Focus as a Spellcasting Focus for your Ranger spells.
- Nivel 1 · Favored Enemy: You always have the Hunter's Mark spell prepared. You can cast it twice without expending a spell slot, and you regain all expended uses of this ability when you finish a Long Rest. The number of times you can cast the spell without a spell slot increases when you reach certain Ranger levels, as shown in the Favored Enemy column of the Ranger Features table.
- Nivel 1 · Weapon Mastery: Your training with weapons allows you to use the mastery properties of two kinds of weapons of your choice with which you have proficiency, such as Longbows and Shortswords. Whenever you finish a Long Rest, you can change the kinds of weapons you chose. For example, you could switch to using the mastery properties of Scimitars and Longswords.
- Nivel 2 · Deft Explorer: Thanks to your travels, you gain the following benefits. [Expertise] Choose one of your skill proficiencies with which you lack Expertise. You gain Expertise in that skill. [Languages] You know two languages of your choice from the language tables in 2.
- Nivel 2 · Fighting Style: You gain a Fighting Style feat of your choice. Instead of choosing one of those feats, you can choose the option below.
- Nivel 3 · Ranger Subclass: You gain a Ranger subclass of your choice. A subclass is a specialization that grants you features at certain Ranger levels. For the rest of your career, you gain each of your subclass's features that are of your Ranger level or lower.
- Nivel 4 · Ability Score Improvement: You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Ranger levels 8, 12, and 16.
- Nivel 5 · Extra Attack: You can attack twice instead of once whenever you take the Attack action on your turn.
- Nivel 6 · Roving: Your Speed increases by 10 feet while you aren't wearing Heavy armor. You also have a Climb Speed and a Swim Speed equal to your Speed.
- Nivel 7 · Subclass Feature: You gain a feature from your Ranger Subclass.
- Nivel 8 · Ability Score Improvement: You gain the Ability Score Improvement feat or another feat of your choice for which you qualify.
- Nivel 9 · Expertise: Choose two of your skill proficiencies with which you lack Expertise. You gain Expertise in those skills.
- Nivel 10 · Tireless: Primal forces now help fuel you on your journeys, granting you the following benefits. [Temporary Hit Points] As a Magic action, you can give yourself a number of Temporary Hit Points equal to 1d8 plus your Wisdom modifier (minimum of 1). You can use this action a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a Long Rest. [Decrease Exhaustion] Whenever you finish a Short Rest, your Exhaustion level, if any, decreases by 1.
- Nivel 11 · Subclass Feature: You gain a feature from your Ranger Subclass.
- Nivel 12 · Ability Score Improvement: You gain the Ability Score Improvement feat or another feat of your choice for which you qualify.
- Nivel 13 · Relentless Hunter: Taking damage can't break your Concentration on Hunter's Mark.
- Nivel 14 · Nature's Veil: You invoke spirits of nature to magically hide yourself. As a Bonus Action, you can give yourself the Invisible condition until the end of your next turn. You can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a Long Rest.
- Nivel 15 · Subclass Feature: You gain a feature from your Ranger Subclass.
- Nivel 16 · Ability Score Improvement: You gain the Ability Score Improvement feat or another feat of your choice for which you qualify.
- Nivel 17 · Precise Hunter: You have Advantage on attack rolls against the creature currently marked by your Hunter's Mark.
- Nivel 18 · Feral Senses: Your connection to the forces of nature grants you Blindsight with a range of 30 feet.
- Nivel 19 · Epic Boon: You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Dimensional Travel is recommended.
- Nivel 20 · Foe Slayer: The damage die of your Hunter's Mark is a d10 rather than a d6.

### Beast Master — Manual del Jugador (2024)
- Nivel 3 · Beast Master: Bond with a Primal Beast A Beast Master forms a mystical bond with a special animal, drawing on primal magic and a deep connection to the natural world. [Primal Companion] You magically summon a primal beast, which draws strength from your bond with nature. Choose its stat block: Beast of the Land, Beast of the Sea, or Beast of the Sky. You also determine the kind of animal it is, choosing a kind appropriate for the stat block. Whatever beast you choose, it bears primal markings indicating its supernatural origin. The beast is Friendly to you and your allies and obeys your commands. It vanishes if you die. [The Beast in Combat] In combat, the beast acts during your turn. It can move and use its Reaction on its own, but the only action it takes is the Dodge action unless you take a Bonus Action to command it to take an action in its stat block or some other action. You can also sacrifice one of your attacks when you take the Attack action to command the beast to take the Beast's Strike action. If you have the Incapacitated condition, the beast acts on its own and isn't limited to the Dodge action. [Restoring or Replacing the Beast] If the beast has died within the last hour, you can take a Magic action to touch it and expend a spell slot. The beast returns to life after 1 minute with all its Hit Points restored. Whenever you finish a Long Rest, you can summon a different primal beast, which appears in an unoccupied space within 5 feet of you. You choose its stat block and appearance. If you already have a beast from this feature, the old one vanishes when the new one appears.
- Nivel 7 · Exceptional Training: When you take a Bonus Action to command your Primal Companion beast to take an action, you can also command it to take the Dash, Disengage, Dodge, or Help action using its Bonus Action. In addition, whenever it hits with an attack roll and deals damage, it can deal your choice of Force damage or its normal damage type.
- Nivel 11 · Bestial Fury: When you command your Primal Companion beast to take the Beast's Strike action, the beast can use it twice. In addition, the first time each turn it hits a creature under the effect of your Hunter's Mark spell, the beast deals extra Force damage equal to the bonus damage of that spell.
- Nivel 15 · Share Spells: When you cast a spell targeting yourself, you can also affect your Primal Companion beast with the spell if the beast is within 30 feet of you.

### Drakewarden — Fizban's Treasury of Dragons (2021)


### Fey Wanderer — Manual del Jugador (2024)
- Nivel 3 · Fey Wanderer: Wield Fey Mirth and Fury A fey mystique surrounds you, thanks to the boon of an archfey or a location in the Feywild that transformed you. However you gained fey magic, you are now a Fey Wanderer. Your joyful laughter brightens the hearts of the downtrodden, and your martial prowess strikes terror in your foes, for great is the mirth of the fey and dreadful is their fury. [Dreadful Strikes] You can augment your weapon strikes with mind-scarring magic drawn from the murky hollows of the Feywild. When you hit a creature with a weapon, you can deal an extra 1d4 Psychic damage to the target, which can take this extra damage only once per turn. The extra damage increases to 1d6 when you reach Ranger level 11. [Fey Wanderer Spells] When you reach a Ranger level specified in the Fey Wanderer Spells table, you thereafter always have the listed spells prepared. Fey Wanderer Spells / Ranger Level | Spells / 3rd | Charm Person / 5th | Misty Step / 9th | Summon Fey / 13th | Dimension Door / 17th | Mislead You also possess a fey blessing. Choose it from the Feywild Gifts table or determine it randomly. Feywild Gifts / 1d6 | Gift / 1 | Illusory butterflies flutter around you while you take a Short or Long Rest. / 2 | Flowers bloom from your hair each dawn. / 3 | You faintly smell of cinnamon, lavender, nutmeg, or another comforting herb or spice. / 4 | Your shadow dances while no one is looking directly at it. / 5 | Horns or antlers sprout from your head. / 6 | Your skin and hair change color each dawn. [Otherworldly Glamour] Whenever you make a Charisma check, you gain a bonus to the check equal to your Wisdom modifier (minimum of +1). You also gain proficiency in one of these skills of your choice: Deception, Performance, or Persuasion.
- Nivel 7 · Beguiling Twist: The magic of the Feywild guards your mind. You have Advantage on saving throws to avoid or end the Charmed or Frightened condition. In addition, whenever you or a creature you can see within 120 feet of you succeeds on a saving throw to avoid or end the Charmed or Frightened condition, you can take a Reaction to force a different creature you can see within 120 feet of yourself to make a Wisdom save against your spell save DC. On a failed save, the target is Charmed or Frightened (your choice) for 1 minute. The target repeats the save at the end of each of its turns, ending the effect on itself on a success.
- Nivel 11 · Fey Reinforcements: You can cast Summon Fey without a Material component. You can also cast it once without a spell slot, and you regain the ability to cast it in this way when you finish a Long Rest. Whenever you start casting the spell, you can modify it so that it doesn't require Concentration. If you do so, the spell's duration becomes 1 minute for that casting.
- Nivel 15 · Misty Wanderer: You can cast Misty Step without expending a spell slot. You can do so a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a Long Rest. In addition, whenever you cast Misty Step, you can bring along one willing creature you can see within 5 feet of yourself. That creature teleports to an unoccupied space of your choice within 5 feet of your destination space.

### Gloom Stalker — Manual del Jugador (2024)
- Nivel 3 · Gloom Stalker: Draw on Shadow Magic to Fight Your Foes Gloom Stalkers are at home in the darkest places, wielding magic drawn from the Shadowfell to combat enemies that lurk in darkness. [Dread Ambusher] You have mastered the art of creating fearsome ambushes, granting you the following benefits. [Ambusher's Leap] At the start of your first turn of each combat, your Speed increases by 10 feet until the end of that turn. [Dreadful Strike] When you attack a creature and hit it with a weapon, you can deal an extra 2d6 Psychic damage. You can use this benefit only once per turn, you can use it a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a Long Rest. [Initiative Bonus] When you roll Initiative, you can add your Wisdom modifier to the roll. [Gloom Stalker Spells] When you reach a Ranger level specified in the Gloom Stalker Spells table, you thereafter always have the listed spells prepared. Gloom Stalker Spells / Ranger Level | Spells / 3rd | Disguise Self / 5th | Rope Trick / 9th | Fear / 13th | Greater Invisibility / 17th | Seeming [Umbral Sight] You gain Darkvision with a range of 60 feet. If you already have Darkvision when you gain this feature, its range increases by 60 feet. You are also adept at evading creatures that rely on Darkvision. While entirely in Darkness, you have the Invisible condition to any creature that relies on Darkvision to see you in that Darkness.
- Nivel 7 · Iron Mind: You have honed your ability to resist mind-altering powers. You gain proficiency in Wisdom saving throws. If you already have this proficiency, you instead gain proficiency in Intelligence or Charisma saving throws (your choice).
- Nivel 11 · Stalker's Flurry: The Psychic damage of your Dreadful Strike becomes 2d8. In addition, when you use the Dreadful Strike effect of your Dread Ambusher feature, you can cause one of the following additional effects. [Sudden Strike] You can make another attack with the same weapon against a different creature that is within 5 feet of the original target and that is within the weapon's range. [Mass Fear] The target and each creature within 10 feet of it must make a Wisdom saving throw against your spell save DC. On a failed save, a creature has the Frightened condition until the start of your next turn.
- Nivel 15 · Shadowy Dodge: When a creature makes an attack roll against you, you can take a Reaction to impose Disadvantage on that roll. Whether the attack hits or misses, you can then teleport up to 30 feet to an unoccupied space you can see.

### Hollow Warden — Ravenloft: The Horrors Within (2026)
- Nivel 3 · Hollow Warden: Draw on the Might of Ancient Wild Terrors Legends tell that the most ancient and bloodthirsty terrors lurk deep within the old places of the earth. Hollow Wardens venerate and draw power from such beings, transforming themselves into merciless and monstrous guardians that stalk jagged coastlines, steep mountain crags, and other dark and wild places. [Hollow Warden Spells] When you reach a Ranger level specified in the Hollow Warden Spells table, you thereafter always have the listed spell prepared. Hollow Warden Spells / Ranger Level | Spell / 3 | Wrathful Smite / 5 | Alter Self / 9 | Phantom Steed / 13 | Dominate Beast / 17 | Steel Wind Strike [Wrath of the Wild] You draw power from the strange and ancient horrors of the land, causing you to sprout unnatural growths, such as bloody antlers or putrid fangs, or causing your shadow to lengthen or twist around you. As a Bonus Action, you can expend a use of XPHB to transform into a ghastly form, gaining the following benefits for 1 minute or until you have the Incapacitated condition, die, or end the transformation (no action required). [Ancient Armor] You gain a +1 bonus to AC, as your body is wreathed in rotten bark and beastly bristles. This bonus increases to +2 when you reach Ranger level 11. [Prowling Retribution] Immediately after a creature you can see within 5 feet of yourself deals damage to you or one of your allies, you can make an Opportunity Attack against that creature. [Unnerving Aura] When you transform and at the start of each of your subsequent turns, each creature of your choice in a 10-foot Emanation originating from you makes a Wisdom saving throw against your spell save DC. On a failed save, a creature has the Frightened condition until the start of your next turn.
- Nivel 7 · Hungering Might: You gain a bonus to Constitution saving throws equal to your Wisdom modifier (minimum of +1). In addition, once per turn when you hit a creature with an attack roll while you are transformed using Wrath of the Wild, you regain a number of Hit Points equal to 1d10 plus your Wisdom modifier, provided you are Bloodied when you hit.
- Nivel 11 · Rot and Violence: Your dedication to wild eldritch beings alters you further. When transformed using Wrath of the Wild, you gain the following additional benefits. [Menacing Aura] When a creature fails its saving throw against your Unnerving Aura, it also can't regain Hit Points or take Reactions until the start of your next turn. [Strangling Roots] When you hit a creature with an attack roll using a weapon, you can activate the Sap or Slow mastery property in addition to a different mastery property you're using with that weapon.
- Nivel 15 · Ancient Might: You become wholly suffused with the wild's ancient and terrible power, granting you the following benefits. [Ominous Strikes] When you hit a creature that has the Frightened condition with an attack roll, that attack deals extra damage equal to your Wisdom modifier. [Persistent Wrath] If you're reduced to 0 Hit Points but not killed outright while transformed using Wrath of the Wild, you can surge with wild power. Your Hit Points instead change to a number equal to twice your Ranger level. Once you use this feature, you can't do so again until you finish a Long Rest. You can also expend a level 4+ spell slot (no action required) to restore your use of this feature. [Timeless] You have Immunity to the Exhaustion condition.

### Horizon Walker — Xanathar's Guide to Everything (2017)


### Hunter — Manual del Jugador (2024)
- Nivel 3 · Hunter: Protect Nature and People from Destruction You stalk prey in the wilds and elsewhere, using your abilities as a Hunter to protect nature and people everywhere from forces that would destroy them. [Hunter's Prey] You gain one of the following feature options of your choice. Whenever you finish a Short or Long Rest, you can replace the chosen option with the other one. [Colossus Slayer] Your tenacity can wear down even the most resilient foes. When you hit a creature with a weapon, the weapon deals an extra 1d8 damage to the target if it's missing any of its Hit Points. You can deal this extra damage only once per turn. [Horde Breaker] Once on each of your turns when you make an attack with a weapon, you can make another attack with the same weapon against a different creature that is within 5 feet of the original target, that is within the weapon's range, and that you haven't attacked this turn. [Hunter's Lore] You can call on the forces of nature to reveal certain strengths and weaknesses of your prey. While a creature is marked by your Hunter's Mark, you know whether that creature has any Immunities, Resistances, or Vulnerabilities, and if the creature has any, you know what they are.
- Nivel 7 · Defensive Tactics: You gain one of the following feature options of your choice. Whenever you finish a Short or Long Rest, you can replace the chosen option with the other one. [Escape the Horde] Opportunity Attacks have Disadvantage against you. [Multiattack Defense] When a creature hits you with an attack roll, that creature has Disadvantage on all other attack rolls against you this turn.
- Nivel 11 · Superior Hunter's Prey: Once per turn when you deal damage to a creature marked by your Hunter's Mark, you can also deal that spell's extra damage to a different creature that you can see within 30 feet of the first creature.
- Nivel 15 · Superior Hunter's Defense: When you take damage, you can take a Reaction to give yourself Resistance to that damage and any other damage of the same type until the end of the current turn.

### Monster Slayer — Xanathar's Guide to Everything (2017)


### Swarmkeeper — Tasha's Cauldron of Everything (2020)


### Winter Walker — Forgotten Realms: Heroes of Faerûn (2025)
- Nivel 3 · Winter Walker: Withstand the Horrors of Frigid Wastelands Winter Walkers hone their craft in the bleak and frozen wilds of places like Icewind Dale. These ruthless, rimed Rangers hunt monsters that haunt arctic wastelands, eventually becoming frigid terrors themselves. Winter Walkers are well versed in the phenomena of Icewind Dale, including the latent magic of fallen Netherese cities, endemic monsters like yetis and crag cats, and the rising threat of Underdark invaders. Due to their cold pragmatism, terrifying magic, and mastery of the region, Winter Walkers are regarded with equal parts respect and fear. Ten-Towns citizens say that Winter Walkers' frequent exposure to malignant entities gives them their fearsome powers. Many Reghed nomads, on the other hand, believe that nature spirits bestow on Winter Walkers a unique curse. [Frigid Explorer] You gain the following benefits. [Biting Cold] Damage from your weapon attacks, Ranger spells, and Ranger features ignores Resistance to Cold damage. [Frost Resistance] You have Resistance to Cold damage. [Polar Strikes] When you hit a creature with an attack roll using a weapon, you can deal an extra 1d4 Cold damage to the target, which can take this extra damage only once per turn. When you reach Ranger level 11, this extra damage increases to 1d6. [Hunter's Rime] Ice rimes you and your prey, protecting you and slowing them. When you cast Hunter's Mark, you gain Temporary Hit Points equal to 1d10 plus your Ranger level. Additionally, while a creature is marked by your Hunter's Mark, it can't take the Disengage action. [Winter Walker Spells] When you reach a Ranger level specified in the Winter Walker Spells table, you thereafter always have the listed spells prepared. Ranger Level | Spells / 3 | Ice Knife / 5 | Hold Person / 9 | Remove Curse / 13 | Ice Storm / 17 | Cone of Cold
- Nivel 7 · Fortifying Soul: Your experience surviving harrowing environments allows you to bolster your allies in addition to yourself. As a Magic action, choose a number of creatures you can see equal to your Wisdom modifier (minimum of one). Each chosen creature regains Hit Points equal to 1d10 plus your Ranger level and has Advantage on saving throws to avoid or end the Frightened condition for 1 hour. Once you use this feature, you can't use it again until you finish a Long Rest.
- Nivel 11 · Chilling Retribution: When a creature hits you with an attack roll, you can take a Reaction to force the creature to make a Wisdom saving throw against your spell save DC. On a failed save, the target has the Stunned condition until the end of your next turn. While the target is Stunned, its Speed is reduced to 0 feet. You can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a Long Rest.
- Nivel 15 · Frozen Haunt: When you cast Hunter's Mark, you can adopt a ghostly, snowy form. This form lasts until the spell ends, and while you are in this form, you gain the following benefits. Once you use this feature, you can't use it again until you finish a Long Rest unless you expend a level 4+ spell slot (no action required). [Frozen Soul] You have Immunity to Cold damage. When you first adopt this form and at the start of each of your subsequent turns, each creature of your choice in a 15-foot Emanation originating from you takes 2d4 Cold damage. [Partially Incorporeal] You have Immunity to the Grappled, Prone, and Restrained conditions. You can move through creatures and objects as if they were Difficult Terrain, but you take 1d10 Force damage if you end your turn inside a creature or an object. If the form ends while you are inside a creature or an object, you are shunted to the nearest unoccupied space.

## Conjuros de la app (usa estos nombres exactos)

- Trucos: Agarre electrizante, Amistad, Burla cruel, Burla dañina, Crear llama, Descarga de fuego, Descarga sobrenatural, Druidismo, Elementalismo, Estallido Mágico, Explosión sobrenatural, Fragmento Mental, Golpe certero, Guardia de cuchillas, Guía, Ilusión menor, Impacto certero, Látigo de espinas, Llama sagrada, Luces danzantes, Luz, Mano de mago, Mensaje, Palabra de resplandor, Perdonar a los moribundos, Piedad con los moribundos, Prestidigitación, Producir llama, Rayo de escarcha, Rayo de fuego, Remendar, Reparar, Resistencia, Rociada venenosa, Saber druídico, Salpicadura ácida, Shillelagh, Tañido por los muertos, Taumaturgia, Toque helado, Tronar, Voluta estelar
- Nivel 1: Alarma, Armadura de Agathys, Armadura de mago, Bendecir, Bendición, Brazos de Hadar, Buenas bayas, Caída de pluma, Castigo abrasador, Castigo atronador, Castigo divino, Castigo furioso, Comprender idiomas, Crear o destruir agua, Cuchillo de hielo, Curar heridas, Detectar el bien y el mal, Detectar magia, Detectar venenos y enfermedades, Disco flotante de Tenser, Disfrazarse, Dormir, Duelo forzado, Encantar animal, Encontrar familiar, Enmarañar, Entender idiomas, Escudo, Escudo de fe, Falsa vida, Favor Divino, Fuego feérico, Golpe Apresador, Grasa, Hablar con los Animales, Hechizar persona, Heroísmo, Identificar, Imagen silenciosa, Infligir heridas, Maleficio, Manos ardientes, Marca del cazador, Niebla, Nube de oscurecimiento, Ola atronadora, Onda atronadora, Orbe cromático, Orden imperiosa, Palabra curativa, Palabra de curación, Perdición, Protección contra el bien y el mal, Proyectil mágico, Purificar comida y bebida, Rayo de hechicería, Rayo guía, Rayo nauseabundo, Reprensión infernal, Represión infernal, Retirada expeditiva, Risa horrible de Tasha, Rociada de color, Saeta guía, Salto, Santuario, Sirviente invisible, Susurros discordantes, Texto ilusorio, Tormenta de espinas, Zancada prodigiosa
- Nivel 2: Abrir, Agrandar/Reducir, Aliento de Dragón, Alterar el propio aspecto, Arma espiritual, Arma mágica, Augurio, Aura mágica de Nystul, Auxilio, Ayuda, Boca mágica, Calentar metal, Calmar emociones, Castigo brillante, Cerradura arcana, Clavo mental, Contorno borroso, Cordón de flechas, Corona de la locura, Crecimiento de espinas, Crecimiento espinoso, Detectar pensamientos, Detectar trampas, Dulce descanso, Embelesar, Esfera de llamas, Esfera flamígera, Flecha Ácida de Melf, Fuerza fantasmal, Hacer añicos, Hallar corcel, Hoja de fuego, Imagen múltiple, Inmovilizar persona, Invisibilidad, Invocar bestia, Levitar, Llama permanente, Localizar animales o plantas, Localizar objeto, Mejorar característica, Mensajero animal, Nube de dagas, Oscuridad, Pasar sin rastro, Paso brumoso, Piel robliza, Plegaria de curación, Potenciar característica, Protección contra veneno, Ráfaga de viento, Rayo abrasador, Rayo de luna, Rayo debilitador, Restablecimiento menor, Sentidos de la bestia, Silencio, Sordera/Ceguera, Sugestión, Telaraña, Trepar cual arácnido, Truco de la cuerda, Ver invisibilidad, Ver lo invisible, Vigor arcano, Vínculo protector, Visión en la oscuridad, Zona de la verdad
- Nivel 3: Acelerar, Animar a los muertos, Arma elemental, Aura de vitalidad, Bola de fuego, Caminar sobre el agua, Castigo cegador, Círculo mágico, Clarividencia, Conjurar animales, Conjurar descarga de proyectiles, Contrahechizo, Corcel fantasma, Crear comida y agua, Crecimiento vegetal, Desplazamiento, Disipar magia, Don de lenguas, Espíritus guardianes, Fingir muerte, Flecha de relámpago, Forma Gaseosa, Fundirse con la Piedra, Glifo Custodio, Hablar con las Plantas, Hablar con los Muertos, Hambre de Hadar, Imagen mayor, Imponer maldición, Indetectable, Invocar feérico, Invocar muerto viviente, Levantar maldición, Llamar al relámpago, Luz del día, Manto del cruzado, Miedo, Muro de viento, Nube apestosa, Palabra curativa en masa, Palabra de curación en masa, Patrón hipnótico, Pequeña choza de Leomund, Protección contra energía, Ralentizar, Recado, Relámpago, Respirar bajo el agua, Revivir, Señal de esperanza, Terror, Toque vampírico, Tormenta de aguanieve, Volar
- Nivel 4: Adivinación, Asesino fantasmal, Aura de pureza, Aura de vida, Castigo abrumador, Cofre oculto de Leomund, Compulsión, Confusión, Conjurar elementales menores, Conjurar seres del bosque, Controlar agua, Destierro, Dominar bestia, Enredadera, Escudo de fuego, Esfera elástica de Otiluke, Esfera Vitriólica, Fabricar, Fuente de Luz Lunar, Guarda contra la Muerte, Guardián de la Fe, Hechizar monstruo, Insecto gigante, Invisibilidad mejorada, Invocar aberración, Invocar autómata, Invocar elemental, Libertad de movimiento, Localizar criatura, Marchitar, Mastín fiel de Mordenkainen, Moldear la piedra, Muro de fuego, Ojo arcano, Piel pétrea, Polimorfar, Puerta dimensional, Sanctasanctórum privado de Mordenkainen, Tentáculos negros de Evard, Terreno alucinatorio, Tormenta de hielo
- Nivel 5: Alterar los recuerdos, Alzar a los muertos, Animar objetos, Apariencia, Atadura planar, Caparazón antivida, Carcaj veloz, Castigo desterrador, Círculo de poder, Círculo de teletransportación, Comunión, Comunión con la naturaleza, Conjurar elemental, Conjurar lluvia de flechas, Cono de frío, Conocer las leyendas, Consagrar, Contactar con otro plano, Contagio, Creación, Curar heridas en masa, Despertar, Disipar el bien y el mal, Dominar persona, Engañar, Enlace telepático de Rary, Ensueño, Escudriñar, Estática Sináptica, Geas, Golpe de Viento Acerado, Golpe Flamígero, Inmovilizar monstruo, Invocar celestial, Invocar dragón, Mano de Bigby, Muro de fuerza, Muro de piedra, Nube aniquiladora, Ola destructora, Pasamuros, Paso arbóreo, Plaga de insectos, Presencia regia de Yolande, Reencarnar, Restablecimiento mayor, Telequinesis, Tormenta resplandeciente de Jallarzi
- Nivel 6: Aliado planar, Baile irresistible de Otto, Barrera de cuchillas, Caldero burbujeante de Tasha, Círculo de muerte, Conjurar feérico, Contingencia, Crear muerto viviente, Curar, Dañar, De la carne a la piedra, Desintegrar, Encontrar el camino, Esfera congelante de Otiluke, Festín de Héroes, Globo de Invulnerabilidad, Guardas y guardias, Ilusión programada, Invocación instantánea de Drawmij, Invocar infernal, Mal de ojo, Mover la tierra, Muro de espinas, Muro de hielo, Palabra de regreso, Prohibición, Puerta arcana, Rayo solar, Relámpago en cadena, Sugestión en masa, Urna mágica, Viajar con el viento, Viajar mediante plantas, Visión veraz
- Nivel 7: Bola de fuego de explosión retardada, Conjurar celestial, Dedo de la muerte, Desplazamiento entre planos, Espada de mordenkainen, Espejismo arcano, Excursión etérea, Invertir la gravedad, Jaula de fuerza, Mansión magnífica de mordenkainen, Palabra de poder: fortalecer, Palabra divina, Proyectar imagen, Recluir, Regenerar, Resurrección, Rociada prismática, Símbolo, Simulacro, Teletransporte, Tormenta de fuego
- Nivel 8: Antipatía/Simpatía, Aspectos animales, Aura sagrada, Campo antimagia, Clon, Controlar el clima, Dominar monstruo, Dragón ilusorio, Explosión Solar, Laberinto, Labia, Marchitamiento horrendo de Abi-Dalzim, Mente en blanco, Nube incendiaria, Ofuscación, Oscuridad enloquecedora, Palabra de poder: aturdir, Semiplano, Telepatía, Terremoto, Tsunami
- Nivel 9: Cambiar de forma, Cautiverio, Curar en masa, Deseo, Muro prismático, Palabra de poder: matar, Palabra de poder: sanar, Parar el tiempo, Polimorfar verdadero, Portal, Presciencia, Proyección astral, Resurrección verdadera, Terror abyecto, Tormenta de la venganza, Tormenta de meteoritos
