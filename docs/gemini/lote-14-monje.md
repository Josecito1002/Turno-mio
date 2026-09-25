# Encargo: Lote 14 (Monje) de la app "Mi turno"

"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el formato
de abajo, la clase **Monje** y todas sus subclases, usando **solo el texto oficial en inglés que viene al final** de
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

export const MONJE_2024 = {
  // Rasgos de la clase de nivel 7 a 20 (sin "Ability Score Improvement", "Epic Boon" ni "Subclass Feature")
  rasgosAltos: [
    r(9, 'Nombre del rasgo', 'accion', 'Texto propio.', { usos: 1, reset: 'largo' }),  // usos/reset solo si son un número fijo
  ],
  // Rasgos de nivel 6 en adelante de las subclases integradas en la app (claves: sombra, manoabierta)
  subAltos: {
    sombra: [ r(6, '...', 'pasiva', '...') ],
    manoabierta: [ r(6, '...', 'pasiva', '...') ],
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
nuevas). Si algo de lo integrado en la app (clase de nivel 1 a 6, o los primeros niveles de las subclases integradas)
está mal según el texto oficial, di cuál y cómo debería quedar.

## Lo que tiene hoy la app

### Clase Monje, niveles 1 a 6 (integrados)
- Nivel 1 · Artes Marciales [pasiva]: Tus golpes sin armas y armas de monje pueden usar DES en vez de FUE, también para la CD de Agarrar y Empujar. Tu dado de Artes Marciales es d12.
- Nivel 1 · Defensa sin Armadura [pasiva]: Sin armadura ni escudo, tu CA es 10 + DES + SAB = 16.
- Nivel 1 · Golpe sin armas extra [adicional]: Si usaste la acción Atacar con golpe sin armas o arma de monje: otro golpe sin armas, −NaN al ataque, undefined.
- Nivel 2 · Ráfaga de Golpes [adicional]: Dos golpes sin armas: −NaN al ataque, undefined cada uno.
- Nivel 2 · Defensa Paciente [adicional]: Gratis: Destrabarse. Con 1 Focus: Destrabarse y Esquivar.
- Nivel 2 · Paso del Viento [adicional]: Gratis: Correr. Con 1 Focus: Destrabarse y Correr, y tu salto se duplica este turno.
- Nivel 2 · Metabolismo Asombroso [gratis]: Al tirar iniciativa recuperas todo tu Focus y 1d12 + 20 PG.
- Nivel 2 · Movimiento sin Armadura [pasiva]: Sin armadura ni escudo tu velocidad aumenta (ya sumado).
- Nivel 3 · Desviar Ataques [reaccion]: Cuando te golpea un ataque contundente, cortante o perforante, reduces el daño en 1d10 + 23. Si queda en 0, con 1 Focus lo devuelves: salvación de DES CD 15 o recibe 2d12 + 3.
- Nivel 4 · Caída Lenta [reaccion]: Al caer, reduces el daño en 100.
- Nivel 5 · Ataque Extra [pasiva]: Cuando usas la acción Atacar, atacas dos veces.
- Nivel 5 · Golpe Aturdidor [gratis]: Una vez por turno, al golpear con arma de monje o sin armas: salvación de CON CD 15. Si falla, queda Aturdido hasta tu próximo turno; si la pasa, su velocidad se reduce a la mitad y el siguiente ataque contra él tiene ventaja.
- Nivel 6 · Golpes Potenciados [pasiva]: Tus golpes sin armas pueden hacer daño de fuerza.

### Rasgos de nivel alto de la clase
- Nivel 10 · Autorestauración [accion]: Al final de tu turno, puedes eliminar condiciones de encantado, asustado o envenenado sin gastar acción. Inmune a veneno.
- Nivel 15 · Disciplina Perfecta [pasiva]: Si al iniciar turno tienes menos de 4 Focus, recuperas hasta tener 4.
- Nivel 18 · Defensa Superior [pasiva]: Gasta 3 Focus para ganar Resistencia a todo el daño excepto Fuerza por 1 minuto.
- Nivel 20 · Desafiar a la Muerte [pasiva]: Si caes a 0 PG, puedes gastar 4 Focus para evitarlo y quedarte con 4 dados de artes marciales de vida.
- Nivel 14 · Alma Diamantina [pasiva]: Competencia en todas las tiradas de salvación.

### Guerrero de la Sombra (integrada, clave `sombra`)
- Nivel 3 · Oscuridad (Artes de la Sombra) [accion]: Lanzas Oscuridad sin componentes (concentración). Tú ves dentro y cada turno puedes moverla hasta 60 pies.
- Nivel 3 · Figuras Sombrías [accion]: Conoces Ilusión menor y la lanzas con SAB (CD 15).
- Nivel 3 · Visión en la oscuridad [pasiva]: Ves en la oscuridad a 60 pies, o 60 más si ya tenías.
- Nivel 6 · Paso de Sombra [adicional]: En luz tenue u oscuridad, te teletransportas hasta 60 pies a otra zona oscura y tienes ventaja en tu siguiente ataque cuerpo a cuerpo este turno.
- Nivel 11 · Manto de Sombras [pasiva]: Invisibilidad en luz tenue u oscuridad.
- Nivel 17 · Oportunista [reaccion]: Ataque de reacción cuando alguien golpea a una criatura cerca de ti.

### Guerrero de la Mano Abierta (integrada, clave `manoabierta`)
- Nivel 3 · Técnica de la Mano Abierta [gratis]: Cada golpe de Ráfaga de Golpes elige: no puede hacer ataques de oportunidad; salvación de FUE CD 15 o lo empujas 15 pies; o salvación de DES CD 15 o queda Derribado.
- Nivel 6 · Integridad del Cuerpo [adicional]: Recuperas 1d12 + 3 PG.
- Nivel 11 · Tranquilidad [pasiva]: Efecto de Santuario constante tras descanso largo.
- Nivel 17 · Palma Quiebra-almas [pasiva]: Vibraciones letales que pueden reducir a 0 PG (Salvación CON).

### Camino de los Elementos (clave `elementos`)
- Nivel 3 · Sintonía Elemental [pasiva]: Tus ataques alcanzan 10 pies más e infligen daño de Fuego, Frío, Rayo o Ácido.
- Nivel 6 · Explosión Ambiental [pasiva]: Creas efectos de área (empujes de aire, explosiones de fuego) usando Ki.
- Nivel 10 · Zancada Ágil [pasiva]: Velocidad de vuelo y nado temporal mientras usas tus poderes.
- Nivel 14 · Avatar de los Elementos [pasiva]: Ganas resistencia a daños elementales y tus ataques son devastadores.

### Camino de la Misericordia (clave `misericordia`)
- Nivel 3 · Mano de la Curación [pasiva]: Gasta Ki para curar a alguien con un toque.
- Nivel 3 · Mano del Daño [pasiva]: Gasta Ki para infligir daño necrótico extra en un ataque.
- Nivel 6 · Toque del Médico [pasiva]: Tus curaciones eliminan condiciones (ciego, sordo, paralizado, etc.).
- Nivel 17 · Mano de la Misericordia Suprema [pasiva]: Puedes resucitar a los muertos con un toque y gasto de Ki.

## Texto oficial (fuente única)

### Clase Monje (Manual del Jugador 2024)
- Nivel 1 · Martial Arts: Your practice of martial arts gives you mastery of combat styles that use your Unarmed Strike and Monk weapons, which are the following: Simple Melee Weapons Martial Melee Weapons that have the Light property You gain the following benefits while you are unarmed or wielding only Monk weapons and you aren't wearing armor or wielding a Shield. [Bonus Unarmed Strike] You can make an Unarmed Strike as a Bonus Action. [Martial Arts Die] You can roll 1d6 in place of the normal damage of your Unarmed Strike or Monk weapons. This die changes as you gain Monk levels, as shown in the Martial Arts column of the Monk Features table. [Dexterous Attacks] You can use your Dexterity modifier instead of your Strength modifier for the attack and damage rolls of your Unarmed Strikes and Monk weapons. In addition, when you use the Grapple or Shove option of your Unarmed Strike, you can use your Dexterity modifier instead of your Strength modifier to determine the save DC.
- Nivel 1 · Unarmored Defense: While you aren't wearing armor or wielding a Shield, your base Armor Class equals 10 plus your Dexterity and Wisdom modifiers.
- Nivel 2 · Monk's Focus: Your focus and martial training allow you to harness a well of extraordinary energy within yourself. This energy is represented by Focus Points. Your Monk level determines the number of points you have, as shown in the Focus Points column of the Monk Features table. You can expend these points to enhance or fuel certain Monk features. You start knowing three such features: Flurry of Blows, Patient Defense, and Step of the Wind, each of which is detailed below. When you expend a Focus Point, it is unavailable until you finish a Short or Long Rest, at the end of which you regain all your expended points. Some features that use Focus Points require your target to make a saving throw. The save DC equals 8 plus your Wisdom modifier and Proficiency Bonus. [Flurry of Blows] You can expend 1 Focus Point to make two Unarmed Strikes as a Bonus Action. [Patient Defense] You can take the Disengage action as a Bonus Action. Alternatively, you can expend 1 Focus Point to take both the Disengage and the Dodge actions as a Bonus Action. [Step of the Wind] You can take the Dash action as a Bonus Action. Alternatively, you can expend 1 Focus Point to take both the Disengage and Dash actions as a Bonus Action, and your jump distance is doubled for the turn.
- Nivel 2 · Unarmored Movement: Your speed increases by 10 feet while you aren't wearing armor or wielding a Shield. This bonus increases when you reach certain Monk levels, as shown on the Monk Features table.
- Nivel 2 · Uncanny Metabolism: When you roll Initiative, you can regain all expended Focus Points. When you do so, roll your Martial Arts die, and regain a number of Hit Points equal to your Monk level plus the number rolled. Once you use this feature, you can't use it again until you finish a Long Rest.
- Nivel 3 · Deflect Attacks: When an attack roll hits you and its damage includes Bludgeoning, Piercing, or Slashing damage, you can take a Reaction to reduce the attack's total damage against you. The reduction equals 1d10 plus your Dexterity modifier and Monk level. If you reduce the damage to 0, you can expend 1 Focus Point to redirect some of the attack's force. If you do so, choose a creature you can see within 5 feet of yourself if the attack was a melee attack or a creature you can see within 60 feet of yourself that isn't behind Total Cover if the attack was a ranged attack. That creature must succeed on a Dexterity saving throw or take damage equal to two rolls of your Martial Arts die plus your Dexterity modifier. The damage is the same type dealt by the attack.
- Nivel 3 · Monk Subclass: You gain a Monk subclass of your choice. A subclass is a specialization that grants you features at certain Monk levels. For the rest of your career, you gain each of your subclass's features that are of your Monk level or lower.
- Nivel 4 · Ability Score Improvement: You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Monk levels 8, 12, and 16.
- Nivel 4 · Slow Fall: You can take a Reaction when you fall to reduce any damage you take from the fall by an amount equal to five times your Monk level.
- Nivel 5 · Extra Attack: You can attack twice instead of once whenever you take the Attack action on your turn.
- Nivel 5 · Stunning Strike: Once per turn when you hit a creature with a Monk weapon or an Unarmed Strike, you can expend 1 Focus Point to attempt a stunning strike. The target must make a Constitution saving throw. On a failed save, the target has the Stunned condition until the start of your next turn. On a successful save, the target's Speed is halved until the start of your next turn, and the next attack roll made against the target before then has Advantage.
- Nivel 6 · Empowered Strikes: Whenever you deal damage with your Unarmed Strike, it can deal your choice of Force damage or its normal damage type.
- Nivel 6 · Subclass Feature: You gain a feature from your Monk subclass.
- Nivel 7 · Evasion: When you're subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw and only half damage if you fail. You don't benefit from this feature if you have the Incapacitated condition.
- Nivel 8 · Ability Score Improvement: You gain the Ability Score Improvement feat or another feat of your choice for which you qualify.
- Nivel 9 · Acrobatic Movement: While you aren't wearing armor or wielding a Shield, you gain the ability to move along vertical surfaces and across liquids on your turn without falling during the movement.
- Nivel 10 · Heightened Focus: Your Flurry of Blows, Patient Defense, and Step of the Wind gain the following benefits. [Flurry of Blows] You can expend 1 Focus Point to use Flurry of Blows and make three Unarmed Strikes with it instead of two. [Patient Defense] When you expend a Focus Point to use Patient Defense, you gain a number of Temporary Hit Points equal to two rolls of your Martial Arts die. [Step of the Wind] When you expend a Focus Point to use Step of the Wind, you can choose a willing creature within 5 feet of yourself that is Large or smaller. You move the creature with you until the end of your turn. The creature's movement doesn't provoke Opportunity Attacks.
- Nivel 10 · Self-Restoration: Through sheer force of will, you can remove one of the following conditions from yourself at the end of each of your turns: Charmed, Frightened, or Poisoned. In addition, forgoing food and drink doesn't give you levels of Exhaustion.
- Nivel 11 · Subclass Feature: You gain a feature from your Monk subclass.
- Nivel 12 · Ability Score Improvement: You gain the Ability Score Improvement feat or another feat of your choice for which you qualify.
- Nivel 13 · Deflect Energy: You can now use your Deflect Attacks feature against attacks that deal any damage type, not just Bludgeoning, Piercing, or Slashing.
- Nivel 14 · Disciplined Survivor: Your physical and mental discipline grant you proficiency in all saving throws. Additionally, whenever you make a saving throw and fail, you can expend 1 Focus Point to reroll it, and you must use the new roll.
- Nivel 15 · Perfect Focus: When you roll Initiative and don't use Uncanny Metabolism, you regain expended Focus Points until you have 4 if you have 3 or fewer.
- Nivel 16 · Ability Score Improvement: You gain the Ability Score Improvement feat or another feat of your choice for which you qualify.
- Nivel 17 · Subclass Feature: You gain a feature from your Monk subclass.
- Nivel 18 · Superior Defense: At the start of your turn, you can expend 3 Focus Points to bolster yourself against harm for 1 minute or until you have the Incapacitated condition. During that time, you have Resistance to all damage except Force damage.
- Nivel 19 · Epic Boon: You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Irresistible Offense is recommended.
- Nivel 20 · Body and Mind: You have developed your body and mind to new heights. Your Dexterity and Wisdom scores increase by 4, to a maximum of 25.

### Warrior of Mercy — Manual del Jugador (2024)
- Nivel 3 · Warrior of Mercy: Manipulate Forces of Life and Death Warriors of Mercy manipulate the life force of others. These Monks are wandering physicians, but they bring a swift end to their enemies. They often wear masks, presenting themselves as faceless bringers of life and death. [Hand of Harm] Once per turn when you hit a creature with an Unarmed Strike and deal damage, you can expend 1 Focus Point to deal extra Necrotic damage equal to one roll of your Martial Arts die plus your Wisdom modifier. [Hand of Healing] As a Magic action, you can expend 1 Focus Point to touch a creature and restore a number of Hit Points equal to a roll of your Martial Arts die plus your Wisdom modifier. When you use your Flurry of Blows, you can replace one of the Unarmed Strikes with a use of this feature without expending a Focus Point for the healing. [Implements of Mercy] You gain proficiency in the Insight and Medicine skills and proficiency with the Herbalism Kit.
- Nivel 6 · Physician's Touch: Your Hand of Harm and Hand of Healing improve, as detailed below. [Hand of Harm] When you use Hand of Harm on a creature, you can also give that creature the Poisoned condition until the end of your next turn. [Hand of Healing] When you use Hand of Healing, you can also end one of the following conditions on the creature you heal: Blinded, Deafened, Paralyzed, Poisoned, or Stunned.
- Nivel 11 · Flurry of Healing and Harm: When you use Flurry of Blows, you can replace each of the Unarmed Strikes with a use of Hand of Healing without expending Focus Points for the healing. In addition, when you make an Unarmed Strike with Flurry of Blows and deal damage, you can use Hand of Harm with that strike without expending a Focus Point for Hand of Harm. You can still use Hand of Harm only once per turn. You can use these benefits a total number of times equal to your Wisdom modifier (minimum of once). You regain all expended uses when you finish a Long Rest.
- Nivel 17 · Hand of Ultimate Mercy: Your mastery of life energy opens the door to the ultimate mercy. As a Magic action, you can touch the corpse of a creature that died within the past 24 hours and expend 5 Focus Points. The creature then returns to life with a number of Hit Points equal to 4d10 plus your Wisdom modifier. If the creature died with any of the following conditions, the creature revives with the conditions removed: Blinded, Deafened, Paralyzed, Poisoned, and Stunned. Once you use this feature, you can't use it again until you finish a Long Rest.

### Warrior of Shadow — Manual del Jugador (2024)
- Nivel 3 · Warrior of Shadow: Harness Shadow Power for Stealth and Subterfuge Warriors of Shadow practice stealth and subterfuge, harnessing the power of the Shadowfell. They are at home in darkness, able to draw gloom around themselves to hide, leap from shadow to shadow, and take on a wraithlike form. [Shadow Arts] You have learned to draw on the power of the Shadowfell, gaining the following benefits. [Darkness] You can expend 1 Focus Point to cast the Darkness spell without spell components. You can see within the spell's area when you cast it with this feature. While the spell persists, you can move its area of Darkness to a space within 60 feet of yourself at the start of each of your turns. [Darkvision] You gain Darkvision with a range of 60 feet. If you already have Darkvision, its range increases by 60 feet. [Shadowy Figments] You know the Minor Illusion spell. Wisdom is your spellcasting ability for it.
- Nivel 6 · Shadow Step: While entirely within Dim Light or Darkness, you can use a Bonus Action to teleport up to 60 feet to an unoccupied space you can see that is also in Dim Light or Darkness. You then have Advantage on the next melee attack you make before the end of the current turn.
- Nivel 11 · Improved Shadow Step: You can draw on your Shadowfell connection to empower your teleportation. When you use your Shadow Step, you can expend 1 Focus Point to remove the requirement that you must start and end in Dim Light or Darkness for that use of the feature. As part of this Bonus Action, you can make an Unarmed Strike immediately after you teleport.
- Nivel 17 · Cloak of Shadows: As a Magic action while entirely within Dim Light or Darkness, you can expend 3 Focus Points to shroud yourself with shadows for 1 minute, until you have the Incapacitated condition, or until you end your turn in Bright Light. While shrouded by these shadows, you gain the following benefits. [Invisibility] You have the Invisible condition. [Partially Incorporeal] You can move through occupied spaces as if they were Difficult Terrain. If you end your turn in such a space, you are shunted to the last unoccupied space you were in. [Shadow Flurry] You can use your Flurry of Blows without expending any Focus Points.

### Warrior of the Elements — Manual del Jugador (2024)
- Nivel 3 · Warrior of the Elements: Wield Strikes and Bursts of Elemental Power Warriors of the Elements tap into the power of the Elemental Planes. Harnessing their supernatural focus, these Monks momentarily tame the energy of the Elemental Chaos to empower themselves in and out of battle. [Elemental Attunement] At the start of your turn, you can expend 1 Focus Point to imbue yourself with elemental energy. The energy lasts for 10 minutes or until you have the Incapacitated condition. You gain the following benefits while this feature is active. [Reach] When you make an Unarmed Strike, your reach is 10 feet greater than normal, as elemental energy extends from you. [Elemental Strikes] Whenever you hit with your Unarmed Strike, you can cause it to deal your choice of Acid, Cold, Fire, Lightning, or Thunder damage rather than its normal damage type. When you deal one of these types with it, you can also force the target to make a Strength saving throw. On a failed save, you can move the target up to 10 feet toward or away from you, as elemental energy swirls around it. [Manipulate Elements] You know the Elementalism spell. Wisdom is your spellcasting ability for it.
- Nivel 6 · Elemental Burst: As a Magic action, you can expend 2 Focus Points to cause elemental energy to burst in a 20-foot-radius Sphere centered on a point within 120 feet of yourself. Choose a damage type: Acid, Cold, Fire, Lightning, or Thunder. Each creature in the Sphere must make a Dexterity saving throw. On a failed save, a creature takes damage of the chosen type equal to three rolls of your Martial Arts die. On a successful save, a creature takes half as much damage.
- Nivel 11 · Stride of the Elements: While your Elemental Attunement is active, you also have a Fly Speed and a Swim Speed equal to your Speed.
- Nivel 17 · Elemental Epitome: While your Elemental Attunement is active, you also gain the following benefits. [Damage Resistance] You gain Resistance to one of the following damage types of your choice: Acid, Cold, Fire, Lightning, or Thunder. At the start of each of your turns, you can change this choice. [Destructive Stride] When you use your Step of the Wind, your Speed increases by 20 feet until the end of the turn. For that duration, any creature of your choice takes damage equal to one roll of your Martial Arts die when you enter a space within 5 feet of it. The damage type is your choice of Acid, Cold, Fire, Lightning, or Thunder. A creature can take this damage only once per turn. [Empowered Strikes] Once on each of your turns, you can deal extra damage to a target equal to one roll of your Martial Arts die when you hit it with an Unarmed Strike. The extra damage is the same type dealt by that strike.

### Warrior of the Mystic Arts — Arcana Unleashed (2026)
- Nivel 3 · Warrior of the Mystic Arts: Weave Martial and Mystic Arts Warriors of the Mystic Arts wield magic to supplement their martial skill. They harness mystical focus to enhance their magical and physical abilities. [Spellcasting] You have learned to cast spells. See the Player's Handbook for the rules on spellcasting. The information below details how you use those rules as a Warrior of the Mystic Arts. [Cantrips] You know two cantrips of your choice from the Sorcerer spell list. Blade Ward and Thunderclap are recommended. Whenever you gain a Monk level, you can replace one of these cantrips with another cantrip of your choice from the Sorcerer spell list. When you reach Monk level 10, you learn another Sorcerer cantrip of your choice. [Spell Slots] The Warrior of the Mystic Arts Spellcasting table shows how many spell slots you have to cast your level 1+ spells. You regain all expended slots when you finish a Long Rest. [Prepared Spells of Level 1+] You prepare the list of level 1+ spells that are available for you to cast with this feature. To start, choose three level 1 spells from the Sorcerer spell list. Jump, Magic Missile, and Shield are recommended. The number of spells on your list increases as you gain Monk levels, as shown in the Prepared Spells column of the Warrior of the Mystic Arts Spellcasting table. Whenever that number increases, choose additional spells from the Sorcerer spell list until the number of spells on your list matches the number on the table. The chosen spells must be of a level for which you have spell slots. For example, if you're a level 7 Monk, your list of prepared spells can include five Sorcerer spells of levels 1 and 2 in any combination. [Changing Your Prepared Spells] Whenever you gain a Monk level, you can replace one spell on your list with another Sorcerer spell for which you have spell slots. [Spellcasting Ability] Wisdom is your spellcasting ability for your Sorcerer spells. [Spellcasting Focus] You can use an Arcane Focus as a Spellcasting Focus for your Sorcerer spells. [Multiclassing] If you multiclass and have the Spellcasting feature from more than one class, add one third of your Monk levels (round down) to determine your available spell slots.
- Nivel 6 · Mystic Fighting Style: When you take the Attack action on your turn, you can replace one Unarmed Strike with a casting of one of your Sorcerer cantrips that has a casting time of an action.
- Nivel 6 · Mystic Focus: You keep your magical power and martial focus in perfect balance, allowing you to convert spell slots into Focus Points, or convert Focus Points into spell slots. [Converting Spell Slots to Focus Points] You can expend a spell slot to regain a number of expended Focus Points equal to the slot's level (no action required). [Recovering Spell Slots] When you finish a Short Rest or use Uncanny Metabolism, you can transform unexpended Focus Points to recover one expended spell slot. The Recovering Spell Slots table shows the cost of recovering a spell slot of a given level, and it lists the minimum Monk level you must be to recover a slot. You can recover a spell slot no higher than level 4. Recovering Spell Slots / Spell Slot Level | Focus Point Cost | Min. Monk Level / 1 | 2 | 6 / 2 | 3 | 7 / 3 | 5 | 13 / 4 | 6 | 19
- Nivel 11 · Focused Strike: When you use your Stunning Strike, whether the target succeeds or fails on the saving throw, the target has Disadvantage on saving throws against your spells until the start of your next turn.
- Nivel 17 · Improved Mystic Fighting Style: When you use Flurry of Blows, you can replace two of the Unarmed Strikes with a casting of one of your level 1 or 2 Sorcerer spells that has a casting time of an action, and you cast it as part of the same Bonus Action you use to activate Flurry of Blows.

### Warrior of the Open Hand — Manual del Jugador (2024)
- Nivel 3 · Warrior of the Open Hand: Master Unarmed Combat Techniques Warriors of the Open Hand are masters of unarmed combat. They learn techniques to push and trip their opponents and manipulate their own energy to protect themselves from harm. [Open Hand Technique] Whenever you hit a creature with an attack granted by your Flurry of Blows, you can impose one of the following effects on that target. [Addle] The target can't make Opportunity Attacks until the start of its next turn. [Push] The target must succeed on a Strength saving throw or be pushed up to 15 feet away from you. [Topple] The target must succeed on a Dexterity saving throw or have the Prone condition.
- Nivel 6 · Wholeness of Body: You gain the ability to heal yourself. As a Bonus Action, you can roll your Martial Arts die. You regain a number of Hit Points equal to the number rolled plus your Wisdom modifier (minimum of 1 Hit Point regained). You can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a Long Rest.
- Nivel 11 · Fleet Step: When you take a Bonus Action other than Step of the Wind, you can also use Step of the Wind immediately after that Bonus Action.
- Nivel 17 · Quivering Palm: You gain the ability to set up lethal vibrations in someone's body. When you hit a creature with an Unarmed Strike, you can expend 4 Focus Points to start these imperceptible vibrations, which last for a number of days equal to your Monk level. The vibrations are harmless unless you take an action to end them. Alternatively, when you take the Attack action on your turn, you can forgo one of the attacks to end the vibrations. To end them, you and the target must be on the same plane of existence. When you end them, the target must make a Constitution saving throw, taking 10d12 Force damage on a failed save or half as much damage on a successful one. You can have only one creature under the effect of this feature at a time. You can end the vibrations harmlessly (no action required).

### Way of the Ascendant Dragon — Fizban's Treasury of Dragons (2021)


### Way of the Astral Self — Tasha's Cauldron of Everything (2020)


### Way of the Drunken Master — Xanathar's Guide to Everything (2017)


### Way of the Four Elements — Manual del Jugador (2014)


### Way of the Kensei — Xanathar's Guide to Everything (2017)


### Way of the Long Death — Sword Coast Adventurer's Guide (2015)


### Way of the Sun Soul — Xanathar's Guide to Everything (2017)


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
