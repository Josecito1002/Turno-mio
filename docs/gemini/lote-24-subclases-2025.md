# Encargo: Lote 24 (subclases de playtest 2025) de la app "Mi turno"

"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el formato de
abajo, lo que se pide, usando **solo el texto oficial en inglés que viene al final** (material de playtest, Unearthed Arcana).
Otra persona revisa y aplica tu respuesta con un script, así que el formato tiene que ser exacto.

## Reglas
1. **Textos propios en español**, de 1 a 4 frases por rasgo; no traduzcas literal, resume con tus palabras.
2. **Nombres: si no hay traducción oficial confirmada al español, deja el nombre en inglés** (clases, subclases, rasgos,
   dotes, especies, conjuros nuevos). No inventes nombres en español.
3. Conjuros ya existentes: usa el nombre oficial en español del Manual del Jugador 2024; los nuevos, en inglés (NUEVO).
4. Tipos de acción para `t`: accion, adicional, reaccion, gratis (sin acción), pasiva, fuera (fuera de combate o ritual).
5. Si algo no se entiende en el texto, escríbelo igual con la marca [NO CONFIRMADO].
6. Responde solo con las partes pedidas, cada una con su marcador en una línea (`=== A ===`, `=== B ===`...).

## Ajustes a las reglas (prioridad sobre lo anterior)

1. **No resumas.** Cada rasgo debe conservar TODAS las reglas del texto oficial: cada opción, cada condición, cada excepción
   y cada limitación. Si el rasgo tiene varias opciones (por ejemplo tatuajes, formas, brutalidades), descríbelas todas, una
   por una. Largo no es problema: usa las frases que hagan falta.
2. **Cifras siempre.** Copia exactos los dados, distancias, duraciones, CD, usos y niveles ("2d6", "30 pies", "1 minuto").
   Prohibido escribir "enorme daño", "cierto daño" o similares: si el texto oficial da un número o una fórmula, va en tu texto.
   Si no puedes confirmar una cifra, escribe [NO CONFIRMADO] en vez de inventarla.
3. **Español de D&D.** Redacta todo el texto en español con la terminología oficial de D&D 5e en español (Manual del Jugador
   2024 / ediciones anteriores): "acción adicional", "tirada de salvación", "espacio de conjuro", "Dado de Golpe", "puntos de
   golpe temporales", "ventaja/desventaja", condiciones (Asustado, Hechizado, Derribado...), tipos de daño (necrótico, psíquico,
   de fuerza...), "Puntos de Hechicería", "Furia", "Forma Salvaje", "Canalizar Divinidad", etc. Los conjuros que ya existen
   llevan su nombre oficial en español. Redacta con tus palabras (no copies la traducción de ningún libro), pero completo.
4. **Nombres propios nuevos** (subclases, rasgos, dotes, especies, conjuros nuevos): si NO conoces una traducción oficial
   confirmada, déjalos en inglés. Si propones una traducción, márcala (PROPUESTA) y deja el original entre paréntesis.
5. **Respuesta completa y válida.** Usa el formato de las partes A a E con sus marcadores, sin `[cite: n]` ni notas de
   fuente dentro de los textos. Claves de clase en español como en la app: barbaro, bardo, brujo, clerigo, druida, explorador,
   guerrero, hechicero, mago, monje, paladin, picaro. No cortes la respuesta: si es muy larga, termina una parte y avisa
   en qué parte quedaste para continuar cuando te escriba "continúa".

## Qué se pide
Solo estas subclases, que la app no tiene: **Tattooed Warrior (Monk)** y **Ancestral Sorcery (Sorcerer)** del documento Arcane Subclasses; y **Circle of Preservation (Druid)**, **Gladiator (Fighter)**, **Defiled Sorcery (Sorcerer)** y **Sorcerer-King Patron (Warlock)** de Apocalyptic Subclasses. Ignora las demás subclases de esos documentos (Arcana Domain, Arcane Archer, Conjurer, Enchanter, Necromancer, Transmuter): ya están en la app.

## Formato de la respuesta
=== A ===
Código TypeScript con esta forma, una entrada por subclase (clave en minúsculas-con-guiones, rasgos con TODOS sus niveles):
```ts
const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });
export const PLAYTEST_NUEVAS = {
  clase: { 'clave': { n: 'Nombre', rasgos: [ r(3, 'Rasgo', 'pasiva', 'Texto propio.', { usos: 1, reset: 'largo' }) ] } },
};
```
Conjuros siempre preparados: un rasgo "Conjuros de <subclase>" cuyo texto diga en qué niveles se amplían; la lista va en B.
=== B ===
JSON con lo que la app calcula o deja elegir (fórmulas con `nivel`, `pb`, `FUE DES CON INT SAB CAR`, `CD`, `max(a, b)`):
```json
[ { "donde": "clave-subclase", "rasgo": "Nombre", "tipo": "usos | conjuros | eleccion | otro", "usos": "max(1, SAB)", "reset": "largo | corto", "por_nivel": {"3": ["Conjuro"]}, "detalle": "..." } ]
```
=== C ===
JSON `{ "clave": "Unearthed Arcana <nombre del documento> (año)" }`.
=== D ===
JSON `{ "clave": "1 o 2 frases propias que presenten la subclase" }`.
=== E ===
Lista breve de dudas o cosas [NO CONFIRMADO].


## Texto oficial (fuente única)

### Documento: Arcane Subclasses Update (2025)

UNEARTHED ARCANA 2025

ARCANE UPDATES
This playtest document is part of a series of
Unearthed Arcana articles that present material
designed for upcoming products. The material
here uses the rules in the 2024 Player’s
Handbook.

SUBCLASSES

WHAT’S INSIDE

ARCANE ARCHER (FIGHTER)

This document presents six subclasses revised
after their last appearance in Unearthed Arcana:
Arcane Archer (Fighter), Monk (Tattooed
Warrior), Conjurer (Wizard), Enchanter
(Wizard), Necromancer (Wizard), and
Transmuter (Wizard).

Deploy Magical Effects Through Enchanted
Ammunition

THIS IS PLAYTEST MATERIAL
This article is presented for playtesting and
feedback. The options here are experimental and
in draft form. They aren’t officially part of the
game. Your feedback will help determine whether
we adopt it as official.
How to Playtest This UA. We invite you to try
out this material in play. To play with this material,
you may either incorporate it into your campaign
or run one or more special playtest sessions. For
such a session, you may create an adventure of
your own or use a short adventure from a source
like Quests from the Infinite Staircase.
Power Level. The character options you read
here might be more or less powerful than options
in the 2024 Player’s Handbook. If a design survives
playtesting, we adjust its power to the desirable
level before publication. This means an option
could be more or less powerful in its final form.
Feedback. The best way for you to give us
feedback on this material is in the survey we’ll
release on D&D Beyond. If we make this material
official, it will be refined based on your feedback,
and then it will appear in a D&D book.
Providing feedback on this document is one way
you can help shape the future of D&D!

This section presents the following subclasses:
Arcane Archer, Tattooed Warrior, Conjurer,
Enchanter, Necromancer, and Transmuter.

An Arcane Archer studies a unique elven method
of archery that weaves magic into attacks to
produce supernatural effects. The first Arcane
Archers stood watch over their communities and
used magic-infused arrows to defeat monsters
and invaders. Over the centuries, other species
have learned this method of blending magical
aptitude with archery. These archers have
broadened this method’s application to ranged
weapons of many kinds and to aspects of
adventuring life outside of combat.

DESIGN NOTE: ARCANE ARCHER UPDATES
Here are the main updates in this subclass since its
last appearance in Unearthed Arcana:
• Curving Shot has been revised to use the same
ammunition but a new attack roll.
• Magical Ammunition is a new feature that
grants magical effects to your ammunition that
can be used outside of combat.
• Ever-Ready Shot is now available at a later level
but always regains one expended Arcane Shot
Die.
• Arcane Burst is a new feature that grants an
additional effect to Indomitable.
• Masterful Shots has been redesigned and now
allows you to reposition and attack.

©2025 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

1

LEVEL 3: ARCANE ARCHER LORE

You learn magical theory and secrets of nature,
granting you the following benefits.
Cantrip. You know either the Druidcraft or
Prestidigitation cantrip. Intelligence is your
spellcasting ability for it.
Skills. You gain proficiency in the Arcana and
Nature skills. If you already have one of these
proficiencies, you instead gain proficiency in a
different skill of your choice (or with two other
skills if you have both).

LEVEL 3: ARCANE SHOT
You learn to unleash special magical effects with
your shots.
Arcane Shot Options. You learn two Arcane
Shot options of your choice from the “Arcane
Shot Options” section later in this subclass’s
description.
You learn an additional Arcane Shot option of
your choice when you reach Fighter levels 7, 10,
15, and 18. Each time you learn a new Arcane
Shot option, you can also replace one option you
know with a different one.
Using Arcane Shot. Once per turn when you
make a ranged attack using a weapon with the
Ammunition property, you can apply one of your
Arcane Shot options to that attack. You decide to
use the option when you hit a creature and deal
damage to it unless the option doesn’t involve an
attack roll.
You can use this feature a number of times
equal to your Intelligence modifier (minimum of
once). You regain all expended uses when you
finish a Short or Long Rest.
Arcane Shot Die. Arcane Shot options refer to
your Arcane Shot Die. Your Arcane Shot Die is a
d6.
Saving Throws. If an Arcane Shot option
requires a saving throw, the DC equals 8 plus
your Intelligence modifier and Proficiency
Bonus.
At Higher Levels. Your Arcane Shot Die
changes when you reach certain Fighter levels.
The die becomes a d8 at level 10, a d10 at level
15, and a d12 at level 18.
LEVEL 7: CURVING SHOT

You learn how to direct an errant shot toward a
new target. If you make an attack roll with a
weapon with the Ammunition property and
miss, you can cause the shot to ricochet toward a
new target as a Bonus Action immediately after

the attack misses. The new target must be a
creature you can see within the weapon’s range
and within 60 feet of the attack’s original target.
Make an attack roll against the new target.

LEVEL 7: MAGICAL AMMUNITION

You learn to imbue your ammunition with
magical properties. As a Magic action, you can
imbue a piece of nonmagical ammunition with
one of the following magical properties and fire
it at a solid surface you can see within the
weapon’s range. On a hit, the ammunition’s effect
activates, and the ammunition attaches to the
surface it hit for the duration of the effect; when
the effect ends, the ammunition is destroyed.
Once you use this feature, you can’t do so again
until you finish a Short or Long Rest. You can
also restore your use of this feature by
expending a use of your Second Wind (no action
required).
Darkening Shot. Magical shadows fill a 15foot Emanation originating from the ammunition
for 1 minute. Nonmagical flames in the
Emanation are extinguished, and creatures in the
Emanation have a –5 penalty to Wisdom
(Perception) checks and Passive Perception.
Unlocking Shot. A burst of magic fills a 15-foot
Emanation originating from the ammunition. A
loud knock, audible up to 300 feet away, also
emits from the ammunition. Any object in the
Emanation that is held shut by a mundane lock
or that is stuck or barred becomes unlocked,
unstuck, or unbarred. If the object has multiple
locks, only one of them is unlocked.
Vine Shot. A 60-foot-long vine grows from the
ammunition. You and other creatures can then
climb it. The vine withers away after 10 minutes.

LEVEL 10: EVER-READY SHOT
When you roll Initiative, you can regain one
expended use of Arcane Shot.
LEVEL 15: ARCANE BURST
You can push creatures away from you with your
arcane mastery. When you use Indomitable, each
creature of your choice in a 10-foot Emanation
originating from you must succeed on a Strength
saving throw against your Arcane Shot DC or be
pushed up to 20 feet straight away from you.

©2025 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

2

LEVEL 18: MASTERFUL SHOTS

You employ agility in your sharpshooting When
a creature you can see misses you with an attack
roll, you can take a Reaction to move up to half
your Speed away from the attacker without
provoking Opportunity Attacks. You can then
make a ranged attack roll against the attacker as
part of this Reaction if the attacker is within the
weapon’s range.

ARCANE SHOT OPTIONS

The Arcane Shot options are presented here in
alphabetical order.
Banishing Shot. Your ammunition temporarily
sequesters your target in a harmless demiplane.
The creature you hit takes additional Psychic
damage equal to one roll of your Arcane Shot Die
and must succeed on a Charisma saving throw or
be banished. While banished, the creature has
the Incapacitated condition and a Speed of 0. At
the end of its next turn, the target reappears in
the space it left or, if that space is occupied, in
the nearest unoccupied space.
Beguiling Shot. Your ammunition beguiles
your target. The creature you hit takes additional
Psychic damage equal to two rolls of your Arcane
Shot Die and must succeed on a Wisdom saving
throw or have the Charmed condition until the
start of your next turn, treating either you or one
of your allies within 30 feet of the target (your
choice) as the charmer. The Charmed condition
ends early if the charmer attacks the target,
deals damage to it, or forces it to make a saving
throw.
Bursting Shot. You imbue your ammunition
with explosive force energy. Immediately after
you deal damage to the creature, your target and
each creature within a 10-foot Emanation
originating from the target take Force damage
equal to two rolls of your Arcane Shot Die.
Enfeebling Shot. Your ammunition saps your
target’s strength. The creature you hit takes
additional Necrotic damage equal to two rolls of
your Arcane Shot Die. The target must also
succeed on a Constitution saving throw or have
the Poisoned condition until the end of its next
turn. Whenever a target Poisoned in this way
hits with an attack roll, it subtracts an amount
equal to one roll of your Arcane Shot Die from
the total damage of that attack.
Grasping Shot. Your ammunition creates
clutching brambles around your target. The
creature you hit takes additional Slashing

damage equal to one roll of your Arcane Shot Die
and must succeed on a Strength saving throw or
have the Restrained condition for 1 minute or
until you use this option again. The target or a
creature within reach of it can take an action to
make a Strength (Athletics) check against your
Arcane Shot DC, removing the brambles and
ending the Restrained condition on the target on
a successful check.
Piercing Shot. You give your ammunition an
ethereal quality. When you use this option, you
don’t make an attack roll for the attack. Instead,
the ammunition shoots forward in a 30-foot Line
that is 1 foot wide, originating from you, then
vanishes. The Line ignores cover, as the
ammunition phases through solid objects. Each
creature in the Line must make a Dexterity
saving throw. On a failed save, a creature takes
damage as if it were hit plus additional Piercing
damage equal to two rolls of your Arcane Shot
Die. On a successful save, a creature takes half as
much damage.
Seeking Shot. Your ammunition can seek out a
target. When you use this option, you don’t make
an attack roll for the attack. Instead, choose one
creature you have seen in the last minute. The
ammunition flies toward that creature, moving
around corners if necessary and ignoring Half
Cover and Three-Quarters Cover. If the target is
within your weapon’s long range, the target
must make a Dexterity saving throw. On a failed
save, the target takes damage as if it were hit
plus additional Force damage equal to two rolls
of your Arcane Shot Die, and you learn the
target’s current location. On a successful save,
the target takes half as much damage only. If the
target is beyond your weapon’s long range, the
ammunition disappears after traveling as far as
it can.
Shadow Shot. Your ammunition occludes your
foe’s vision with shadows. The creature you hit
takes additional Psychic damage equal to one
roll of your Arcane Shot Die, and it must succeed
on a Wisdom saving throw or have the Blinded
condition until the end of its next turn.

©2025 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

3

TATTOOED WARRIOR (MONK)
Enhance Martial Arts with Your Magic Tattoos
Drawing from body-marking traditions from
across the multiverse, Tattooed Warriors can use
arcane power imbued in their magic tattoos.
These Monks gain tattoos as they grow in martial
prowess and insight. Tattooed Warriors can
reshape their tattoos to access a suite of physical
and magical effects.

DESIGN NOTE: TATTOOED WARRIOR UPDATES
Here are the main updates in this subclass since its
last appearance in Unearthed Arcana:
• The Tattooed Warrior has been redesigned. With
some exceptions, the tattoos now focus on
additional abilities instead of spells.
• Beast Tattoos still grant a cantrip, but now each
option provides a benefit that isn’t tied to a level
1 spell.
• Celestial Tattoo has been redesigned to provide
uses of Focus Points outside of combat.
• Nature Tattoo has been condensed to provide
Damage Resistance to a small suite of choices
that can change.
• Monster Tattoos has been redesigned with new
options.

LEVEL 3: MAGIC TATTOOS

You gain the magic tattoos described by other
features of this subclass. The tattoos appear on
your body wherever you wish. Damage or injury
doesn’t impair your magic tattoos’ function. A
magic tattoo can look like a brand, scarification,
a birthmark, patterns of scales, or any other
cosmetic alteration.
If a tattoo’s effect requires a saving throw, the
DC equals 8 plus your Wisdom modifier plus
your Proficiency Bonus. Your spellcasting ability
for spells granted by a tattoo is Wisdom.
Whenever you finish a Long Rest, you can
reshape one of your magic tattoos, changing the
option you chose from one list to another option
on the same list.

LEVEL 3: BEAST TATTOOS

Dexterity modifier instead of your Strength
modifier to determine how high you can jump.
Crane. You know the Guidance cantrip. When
you miss a creature with an attack granted by
your Flurry of Blows, you have Advantage on
your next attack roll against that creature before
the end of your next turn.
Horse. You know the Message cantrip. When
you expend 1 Focus Point to use Step of the
Wind, your Speed increases by 10 feet until the
start of your next turn.
Tortoise. You know the Spare the Dying
cantrip. When you expend 1 Focus Point to use
Patient Defense, you have a +1 bonus to AC until
the start of your next turn.

LEVEL 6: CELESTIAL TATTOO
You gain an additional magic tattoo depicting a
celestial phenomenon. Choose a tattoo from the
following options.
Comet. When you take the Search action, you
can expend 1 Focus Point to roll your Martial
Arts die and add the number rolled to the
Wisdom check.
Eclipse. When you take the Hide action, you
can expend 1 Focus Point to roll your Martial
Arts die and add the number rolled to the
Dexterity (Stealth) check.
Sunburst. When you take the Study action, you
can expend 1 Focus Point to roll your Martial
Arts die and add the number rolled to the
Intelligence check.
LEVEL 11: NATURE TATTOO
You gain an additional magic tattoo depicting a
natural feature. Choose a tattoo from the
following options.
Sea Storm. You gain Resistance to one of the
following damage types of your choice: Cold,
Lightning, or Thunder. Whenever you finish a
Short or Long Rest, or use your Uncanny
Metabolism feature, you can change this choice.
Volcano. You gain Resistance to one of the
following damage types of your choice: Acid,
Fire, or Poison. Whenever you finish a Short or
Long Rest, or use your Uncanny Metabolism
feature, you can change this choice.

You gain two animal tattoos. Choose two tattoos
from the following options.
Bat. You know the Dancing Lights cantrip. You
also gain Blindsight with a range of 10 feet.
Butterfly. You know the Light cantrip. When
you make a High Jump, you can use your

©2025 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

4

LEVEL 17: MONSTER TATTOO

You gain a magic tattoo depicting a mighty
creature. Choose a tattoo from the following
options.
Beholder. At the start of your turn, you can
expend 1 Focus Point to gain a Fly Speed equal to
your Speed for 10 minutes. While you have this
Fly Speed, you can hover.
Additionally, as a Magic action, you can expend
1 Focus Point to fire four rays from your eyes.
You can fire them at one target you can see
within 120 feet or at several. Make a ranged spell
attack for each ray, using Wisdom as your
spellcasting ability. On a hit, the attack deals
Force damage equal to one roll of your Martial
Arts die plus your Wisdom modifier.
Chromatic Dragon. When you take the Attack
action on your turn, you can expend 1 Focus
Point to replace one of your attacks with an
exhalation of magical energy in a 30-foot Cone.
Choose a damage type: Acid, Cold, Fire,
Lightning, or Poison. Each creature in that area
makes a Dexterity saving throw. On a failed save,
a creature takes damage of the chosen type equal
to two rolls of your Martial Arts die plus your
Wisdom modifier. On a successful save, a
creature takes half as much damage.
Displacer Beast. When you expend a Focus
Point to use Flurry of Blows or Step of the Wind,
you can expend 1 Focus Point to cast the Mirror
Image spell as part of that Bonus Action.
Troll. At the start of each of your turns, you
regain Hit Points equal to 5 plus your Wisdom
modifier if you are Bloodied and have at least 1
Hit Point. Any severed body part regrows after
you finish a Short or Long Rest.

CONJURER (WIZARD)
Step Across Space and Call Creatures from Thin
Air
You consider distance and matter to be flexible
guidelines rather than physical laws. Conjurers
harness the power of magic that moves
creatures instantly through space and summons
creatures to fight on their behalf.

DESIGN NOTE: CONJURER UPDATES
Here are the main updates in this subclass since its
appearance in Unearthed Arcana:
• Benign Transposition is now a Bonus Action and
can be used more often.
• Durable Summons now gives the summoned
creature Resistance to multiple damage types
while it has Temporary Hit Points.
• Splintered Summons is a new feature that allows
you to summon a second creature when you cast
one of the summoning spells listed.

LEVEL 3: BENIGN TRANSPOSITION
As a Bonus Action, you teleport up to 30 feet to
an unoccupied space that you can see.
Alternatively, you can choose a space within
range that is occupied by a Medium or smaller
creature. If that creature is willing, you both
teleport, swapping places.
You can use this feature a number of times
equal to your Intelligence modifier (minimum of
once), and you regain all expended uses when
you finish a Long Rest.
LEVEL 3: CONJURATION SAVANT
Choose two Wizard spells from the Conjuration
school, each of which must be no higher than
level 2, and add them to your spellbook for free.
In addition, whenever you gain access to a new
level of spell slots in this class, you can add one
Wizard spell from the Conjuration school to your
spellbook for free. The chosen spell must be of a
level for which you have spell slots.
LEVEL 6: DISTANT TRANSPOSITION
The range of your Benign Transposition feature
increases to 60 feet. Additionally, you now
regain all expended uses of it when you finish a
Short or Long Rest.

©2025 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

5

LEVEL 6: DURABLE SUMMONS
When you cast a Conjuration spell to summon or
create a creature using a spell slot, that creature
gains Temporary Hit Points equal to twice your
Wizard level when it first appears. While it has
these Temporary Hit Points, the creature has
Resistance to every damage type except Force,
Necrotic, Psychic, and Radiant.

ENCHANTER (WIZARD)

LEVEL 10: FOCUSED CONJURATION

DESIGN NOTE: ENCHANTER UPDATES

Taking damage can’t break your Concentration
on Conjuration spells.

Here are the main updates in this subclass since its
appearance in the 2014 Player’s Handbook:

LEVEL 14: SPLINTERED SUMMONS

• Hypnotic Presence replaces Vexing Movement
and has been redesigned to use Concentration,
freeing up your actions on subsequent turns.
• Split Enchantment is available at an earlier level.
• Instinctive Charm returns and is redesigned to
turn a hit against you into a miss, with the
potential to redirect the attack at a new target.
• Alter Memories returns and has been
redesigned to allow Modify Memory to target
multiple creatures.

When you cast Summon Aberration, Summon
Construct, Summon Dragon, Summon Elemental,
or Summon Fey using a spell slot, you can modify
the spell to summon two creatures with the spell
instead of one. Each creature is of the same kind,
uses the stat block and rules denoted by the
spell, and manifests in a different unoccupied
space of your choice within the spell’s range, but
the summoned creatures’ Hit Points are halved.
If you lose Concentration on the spell, both
creatures disappear.
Once you use this feature to modify a spell in
this way, you must finish a Long Rest before you
do so again. You can also restore your use of it by
expending a level 5+ spell slot (no action
required).

Entrance and Beguile Others
Your magic clouds or captivates minds. Some
Enchanters use their abilities to encourage peace
and soften cruelty, while others use their mindaltering magic for selfish ends. Many Enchanters
fall somewhere in between.

LEVEL 3: ENCHANTING CONVERSATIONALIST

You gain proficiency in one of the following skills
of your choice: Deception, Intimidation, or
Persuasion.
In addition, when you make an ability check
with the chosen skill, you gain a bonus to the
check equal to your Intelligence modifier
(minimum of +1).

LEVEL 3: ENCHANTMENT SAVANT
Choose two Wizard spells from the Enchantment
school, each of which must be no higher than
level 2, and add them to your spellbook for free.
In addition, whenever you gain access to a new
level of spell slots in this class, you can add one
Wizard spell from the Enchantment school to
your spellbook for free. The chosen spell must be
of a level for which you have spell slots.
LEVEL 3: HYPNOTIC PRESENCE
Your charming words and enchanting gaze can
enthrall another creature. As a Magic action,
choose one creature that you can see within 10
feet of yourself. If the target can see or hear you,
it must succeed on a Wisdom saving throw
against your spell save DC or have the Charmed
condition for 1 minute or until your
Concentration ends, the target is more than 10
feet away from you, the target can neither see
©2025 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

6

nor hear you, or the target takes damage. While
Charmed in this way, the target has the
Incapacitated condition and a Speed of 0.
Once you use this feature, you can’t do so again
until you finish a Long Rest. You can also restore
your use of it by expending a level 1+ spell slot
(no action required).

LEVEL 6: SPLIT ENCHANTMENT

When you cast an Enchantment spell, such as
Charm Person, that can be cast with a higherlevel spell slot to target an additional creature,
you can increase the spell’s effective level by 1.
You can use this feature a number of times
equal to your Intelligence modifier and regain all
expended uses when you finish a Long Rest.

LEVEL 10: INSTINCTIVE CHARM
When a creature within 30 feet of you that you
can see hits you with an attack roll, you can take
a Reaction to force the attacker to make a
Wisdom saving throw against your spell save DC.
On a failed save, the attack misses instead, and if
there is another creature within range of the
attack other than the attacker, the attacker
targets that creature with the triggering attack,
using the same attack roll. If multiple creatures
are within the attack’s range, you choose which
one to target.
Once you use this Reaction, you can’t do so
again until you finish a Long Rest. You can also
restore your use of it by casting an Enchantment
spell with a spell slot.
LEVEL 14: ALTER MEMORIES

You can reliably enchant creatures and alter
their memories. You always have the Modify
Memory spell prepared. When you cast the spell,
you can target a second creature with it if that
creature is within range of the spell.

NECROMANCER (WIZARD)
Command the Powers of Death and Undeath
You explore the cosmic forces of life, death, and
undeath. As a Necromancer, you learn to
manipulate the energy that animates all
creatures. As you progress, you learn to use
magic to drain the life force from a creature and
transform its vital energy into magical power.
Many see Necromancers as menacing or
villainous, though not all Necromancers are evil.
Nevertheless, the manipulation of life and death
is considered taboo in many societies.

DESIGN NOTE: NECROMANCER UPDATES
Here are the main updates in this subclass since its
last appearance in Unearthed Arcana:
• Necromancy Spellbook now lets you use the
Find Familiar spell to summon a Skeleton or
Zombie, and Grim Harvest now restores Hit
Points to an Undead creature of your choice.
• Undead Thralls has been redesigned to use the
Animate Dead spell and provides additional
bonuses.
• Harvest Undead (formerly Undead Secrets) has
been redesigned to restore Hit Points to you
when you destroy an Undead creature you
control.
• Death’s Master now allows you to create bursts
of necrotic energy when an Undead is reduced to
0 Hit Points.

LEVEL 3: NECROMANCY SAVANT
Choose two Wizard spells from the Necromancy
school, each of which must be no higher than
level 2, and add them to your spellbook for free.
In addition, whenever you gain access to a new
level of spell slots in this class, you can add one
Wizard spell from the Necromancy school to
your spellbook for free. The chosen spell must be
of a level for which you have spell slots.

©2025 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

7

LEVEL 3: NECROMANCY SPELLBOOK

The necromantic secrets in your spellbook grant
you additional powers. You gain the following
benefits.
Necrotic Resistance. You have Resistance to
Necrotic damage.
Grim Harvest. When you cast a Necromancy
spell using a spell slot, you can choose an
Undead creature you can see within 60 feet of
yourself to regain a number of Hit Points equal
to the level of the spell slot expended plus your
Wizard level.
Undead Familiar. The Find Familiar spell
appears in your spellbook. When you cast the
spell, you choose one of the normal forms for
your familiar or one of the following special
forms: Skeleton or Zombie (see appendix B of
the Player’s Handbook for the familiar’s stat
block).

LEVEL 6: GRAVE POWER

You have discovered more necromantic insights
and inscribed them in your spellbook. While
holding your spellbook, you gain the following
benefits.
Grave Resilience. When you use Arcane
Recovery, your Exhaustion level, if any,
decreases by 1.
Overwhelming Necrosis. Damage from your
Wizard spells and Wizard features ignores
Resistance to Necrotic damage.

LEVEL 6: UNDEAD THRALLS

You always have Animate Dead prepared and can
cast it once without expending a spell slot.
Whenever you start casting the spell, you can
modify it so that the spell’s effective level is
increased by 1.
In addition, whenever you cast a Necromancy
spell using a spell slot that creates or summons
an Undead, the Undead gains the benefits below.
Undead Fortitude. The Undead’s Hit Point
maximum and current Hit points increase by a
number equal to the level of the spell slot used
plus your Intelligence modifier for the duration
of the spell.
Withering Strike. Whenever the Undead hits a
creature with an attack roll, the Undead deals
extra Necrotic damage equal to your Intelligence
modifier (minimum of 1 Necrotic damage).

LEVEL 10: HARVEST UNDEAD
You have learned more secrets about the
nuances of life and death. Immediately after you
become Bloodied but aren’t killed outright from
taking damage, you can take a Reaction to reduce
an Undead creature under your control that you
can see to 0 Hit Points. You then immediately
regain a number of Hit Points equal to your
Wizard level.
LEVEL 14: DEATH’S MASTER

Abstruse rituals within your spellbook allow you
mastery over forces of death. While holding your
spellbook, you gain the following benefits.
Bolster Undead. As a Bonus Action, choose
any number of Undead you have created or
summoned with a Necromancy spell that are
within 60 feet of you. Those Undead each gain
Temporary Hit Points equal to your Wizard level.
Once an Undead gains Temporary Hit Points
from this feature, it can’t gain them in this way
again for the next 24 hours.
Extinguish Undead. When an Undead creature
you can see is reduced to 0 Hit Points, you can
cause it to explode with necrotic energy. Roll a
number of d6s equal to half the creature’s
unexpended Hit Dice (round up, minimum of
1d6) and add them together. Each creature in a
10-foot Emanation originating from the Undead
makes a Dexterity saving throw. On a failed save,
a target takes Necrotic damage equal to the
number rolled and can’t take Reactions until the
start of its next turn. On a successful save, a
target takes half as much damage only. When
you use this feature to explode an Undead
creature you don’t control, you must take a
Reaction and expend a level 5+ spell slot to do
so.

©2025 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

8

DESIGN NOTE: TRANSMUTER UPDATES

one of the following benefits, which you choose
when you create the stone. You can change the
stone’s benefit when you cast a Transmutation
spell using a spell slot.
Darkvision. The bearer gains Darkvision with
a range of 60 feet or increases the range of its
Darkvision by 60 feet.
Speed. The bearer’s Speed increases by 10
feet.
Resistance. The bearer gains Resistance to
Acid, Cold, Fire, Lightning, Poison, or Thunder
damage (your choice each time you choose this
benefit).

Here are the main updates in this subclass since its
last appearance in Unearthed Arcana:

LEVEL 3: WONDROUS ALTERATION

TRANSMUTER (WIZARD)
Transform Energy and Matter
You study spells that modify energy and matter.
To you, the world is not a fixed thing, but
eminently mutable. Your magic gives you the
tools to become a smith at reality’s forge.
Some Transmuters are tinkerers and
pranksters. Others pursue their magical studies
with deadly seriousness, seeking the power
make and destroy worlds.

• Transmuter’s Stone now gives the bearer
proficiency in Constitution saving throws in
addition to another benefit. The stone can now
also be used as a Spellcasting Focus.
• Wondrous Alteration replaces Wondrous
Enhancement and grants benefits to the Alter
Self spell.
• Empowered Transmutation replaces Twinned
Transmutation and applies to any Transmutation
spell that can be cast with a higher-level spell
slot.
• Potent Stone now grants additional options for
the transmutation stone.
• Shapechanger returns, allows the Wizard to
modify the Polymorph spell when casting it on
themself.
• Master Transmuter now allows you to prevent
the stone’s destruction by expending a spell slot.

LEVEL 3: TRANSMUTATION SAVANT

Choose two Wizard spells from the
Transmutation school, each of which must be no
higher than level 2, and add them to your
spellbook for free.
In addition, whenever you gain access to a new
level of spell slots in this class, you can add one
Wizard spell from the Transmutation school to
your spellbook for free. The chosen spell must be
of a level for which you have spell slots.

LEVEL 3: TRANSMUTER’S STONE
When you finish a Long Rest, you can create a
magic stone that lasts until you use this feature
again. The stone is a Tiny object, and you can use
it as a Spellcasting Focus for your Wizard spells.
A creature with the stone in its possession gains
proficiency in Constitution saving throws and

You always have the Alter Self spell prepared and
can cast it once without expending a spell slot.
You regain the ability to cast it in this way when
you finish a Long Rest.
While under the effects of Alter Self, you gain
an additional benefit for each of its options.
Aquatic Adaptation. While underwater, you
can take the Dash action as a Bonus Action.
Change Appearance. You have Advantage on
Charisma (Deception) checks.
Natural Weapons. The damage of your new
growth increases to 2d6 damage of the type
associated with the growth. You also have
Advantage on Constitution saving throws to
maintain Concentration.

LEVEL 6: EMPOWERED TRANSMUTATION

When you cast a Transmutation spell that
doesn’t deal damage, such as Fly or Magical
Weapon, using a spell slot, you can treat the spell
as if it were cast using a spell slot 1 level above
the slot expended.
You can use this feature a number of times
equal to your Intelligence modifier (minimum of
once), and you regain all expended uses when
you finish a Long Rest.

LEVEL 10: POTENT STONE
Your Transmuter’s Stone is more versatile.
When you create your Transmuter’s Stone, you
can choose up to two benefits. You can choose
each option other than Resistance only once. If
you choose Resistance twice, you must choose
different damage types. You can change either or
both benefits when you cast a Transmutation
spell using a spell slot.
In addition, the following are now among your
benefit options for Transmuter’s Stone.

©2025 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

9

Mighty Build. The bearer has Advantage on
Strength saving throws. The bearer also counts
as one size larger when determining its carrying
capacity.
Tremorsense. The bearer gains Tremorsense
with a range of 30 feet.

LEVEL 10: SHAPECHANGER
You always have the Polymorph spell prepared
and can cast it once without expending a spell
slot. You regain the ability to cast it in this way
when you finish a Long Rest.
In addition, when you target yourself with the
spell, you can modify the spell to gain the
benefits below. Once you modify the spell using
this feature, you can’t do so again until you finish
a Long Rest.
Game Statistics. You retain your personality,
memories, and ability to speak. You also retain
your Intelligence, Wisdom, and Charisma scores;
class features; languages; and feats.
Transmute Spells. You can cast
Transmutation spells while shape-shifted, except
for any spell with a Material component that has
a cost specified or is consumed by the spell.

Restore Life. You cast the Raise Dead spell
without expending a spell slot, using the stone in
place of the required Material components.
Restore Youth. You touch one willing creature
as part of this Magic action, and the target’s
Exhaustion level, if any, decreases to 0 and it
permanently appears 3d10 years younger, to a
minimum of young adulthood.

LEVEL 14: MASTER TRANSMUTER
While you carry your Transmuter’s Stone, you
can take a Magic action to consume the reserve
of transmutation magic stored inside and choose
one of the following benefits. After you use your
Transmuter’s Stone in this way, the stone
crumbles to dust. You can prevent the stone
from crumbling by expending a level 5+ spell slot
as part of the Magic action you take using this
feature.
Major Transformation. You can transmute
one nonmagical object—no larger than a 10-foot
Cube or eight connected 5-foot Cubes—into
another nonmagical object of similar size and
mass and of equal or lesser value. You must
spend 10 minutes handling the object to
transform it.
Panacea. You touch a creature as part of this
Magic action, and the target regains a number of
Hit Points equal to half its Hit Point maximum
(round down). The target is cured of all magical
contagions, and any curses affecting the target
are lifted, including the target’s Attunement to a
cursed item. If the target has the Poisoned or
Petrified conditions, those conditions end.

©2025 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

10



### Documento: Apocalyptic Subclasses (2025)

UNEARTHED ARCANA 2025

APOCALYPTIC SUBCLASSES
This playtest document is part of a series of
Unearthed Arcana articles that present material
designed for upcoming products. The material here
uses the rules in the 2024 Player’s Handbook.

WHAT’S INSIDE
This document presents four new subclasses for the
Druid (Circle of Preservation), Fighter (Gladiator),
Sorcerer (Defiled Sorcery), and Warlock (SorcererKing Patron).

SUBCLASSES
The following section presents the following
subclasses: Circle of Preservation, Gladiator, Defiled
Sorcery, and Sorcerer-King Patron.
These subclasses are presented starting on the
following page.

THIS IS PLAYTEST MATERIAL
This article is presented for playtesting and feedback.
The options here are experimental and in draft form.
They aren’t officially part of the game. Your feedback
will help determine whether we adopt it as official.
How to Playtest This UA. We invite you to try out
this material in play. To play with this material, you
may either incorporate it into your campaign or run
one or more special playtest sessions. For such a
session, you may create an adventure of your own or
use a short adventure from a source like Quests from
the Infinite Staircase.
Power Level. The character options you read here
might be more or less powerful than options in the
2024 Player’s Handbook. If a design survives
playtesting, we adjust its power to the desirable level
before publication. This means an option could be
more or less powerful in its final form.
Feedback. The best way for you to give us feedback
on this material is in the survey we’ll release on D&D
Beyond. If we make this material official, it will be
refined based on your feedback, and then it will appear
in a D&D book.
Providing feedback on this document is one way you
can help shape the future of D&D!

1
©2025 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

CIRCLE OF PRESERVATION (DRUID)
Safeguard Nature and Heal the World
Druids of the Circle of Preservation work tirelessly
to conserve natural resources and restore places
once ruined by greed and exploitation. Through a
combination of conservation and restorative magic,
Druids of this order shield and spread life across the
land. The most powerful members of this order can
return vitality to barren fields, transforming
wastelands into thriving wildernesses once more.

LEVEL 3: CIRCLE OF PRESERVATION SPELLS
When you reach a Druid level specified in the Circle
of Preservation Spells table, you thereafter always
have the listed spells prepared.

CIRCLE OF PRESERVATION SPELLS
Druid
Level
3
5
7
9

Spells
Bless, Lesser Restoration, Protection
from Poison, Sanctuary
Beacon of Hope, Plant Growth
Aura of Life, Death Ward
Greater Restoration, Hallow

Material components that are consumed by the spell
or that have a cost specified in the spell.
Additionally, whenever you cast a Druid spell that
requires a Material component that is consumed by
the spell, there is a 10 percent chance that the
component isn’t consumed as part of that casting.
Tool Proficiency. You gain proficiency with one
type of Artisan’s Tools of your choice.

LEVEL 6: IMPROVED PRESERVATION
Your Preserved Land becomes more powerful in the
following ways.
Fortify Protectors. While inside the Cube created
by your Preserved Land, you and your allies gain a
bonus to Constitution saving throws equal to your
Wisdom modifier (minimum of +1).
Reject Desecrators. Whenever the Cube created
by your Preserved Land enters an enemy’s space
and whenever an enemy enters the Cube or ends its
turn there, that enemy makes a Wisdom saving
throw against your spell save DC. On a failed save,
the enemy takes 2d10 Radiant damage, and its
Speed is halved until the end of its next turn as new
growth rises to hinder it. On a successful save, the
enemy takes half as much damage only. An enemy
makes this save only once per turn.

LEVEL 3: PRESERVED LAND

LEVEL 10: FACILITATED RESTORATION

As a Bonus Action, you can expend a use of your
Wild Shape to fill a 15-foot Cube originating from a
point on the ground you can see within 120 feet of
yourself with revitalizing energy. The effect lasts for
1 minute or until you have the Incapacitated
condition, are more than 120 feet away from the
Cube, or die.
Whenever a creature (including you) ends its turn
in the Cube, you can grant the creature one of the
following benefits:

You can cast Lesser Restoration or Greater
Restoration without expending a spell slot or
requiring spell components. You can use this feature
to cast a spell in this way a number of times equal to
your Wisdom modifier (minimum of once), and you
regain all expended uses when you finish a Long
Rest.

Bolster. The creature gains Temporary Hit Points
equal to 1d4 plus your Druid level.
Purify. You end one effect on the creature causing it
to have the Frightened or Poisoned condition.

LEVEL 14: SACROSANCT LAND
The size of the Cube created by your Preserved Land
increases to a 30-foot Cube.
In addition, when a creature you can see in the
area of your Preserved Land is hit by an attack roll,
you can take a Reaction to halve that attack’s
damage against the creature.

In addition, nonmagical vegetation native to the
region sprouts on ground within the Cube. This
vegetation disappears when the effect ends.
As a Bonus Action on subsequent turns, you can
move the Cube up to 30 feet to another area on the
ground within 120 feet of yourself.

LEVEL 3: STUDENT OF PRESERVATION
Your studies have improved your understanding of
the order and resilience of nature, granting you the
following benefits.
Frugal Casting. When you cast a Druid spell, you
can cast it without Material components, except

©2025 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

2

Gladiators are just as much performers as they are
warriors. Whether brawling in underground fighting
rings or fighting for survival in bloodstained arenas,
a Gladiator combines martial skill with theatrics to
awe and intimidate their audiences.

attack roll with a Melee weapon against the
triggering creature. If this attack hits, you can use
one of your Brutality effects on the target without
expending a use of that feature.
Once this counterattack hits, you can’t use this
feature to make another counterattack until you
finish a Long Rest. You can also restore your use of
this counterattack by expending a use of Second
Wind (no action required).

LEVEL 3: BRUTALITY

LEVEL 10: BOLDER BRUTALITIES

GLADIATOR (FIGHTER)
Master Brutality and Blood Sport

Shaped by the intensity of the arena, you’ve learned
to execute brutal martial moves. Once per turn,
when you hit a creature with an attack roll using a
Melee weapon, you can add one of the following
Brutality effects of your choice. You can do this a
number of times equal to your Charisma modifier
(minimum of once), and you regain all expended
uses when you finish a Short or Long Rest.
Bleed. You can activate the Sap mastery property
in addition to a different mastery property you’re
using with that weapon, and the target takes extra
damage equal to your Charisma modifier (minimum
of 1 damage). The extra damage’s type is the same
type as the weapon’s type.
Bluff. You can activate the Vex mastery property
in addition to a different mastery property you’re
using with that weapon, and you have Advantage on
the next saving throw you make before the end of
your next turn.
Stumble. You can activate the Topple mastery
property in addition to a different mastery property
you’re using with that weapon, and on its next turn,
the target can take only an action or a Bonus Action,
not both.

Your brutal martial prowess has improved. The
following effects are added to your Brutality options.
Rive. You can activate the Cleave mastery
property in addition to a different mastery property
you’re using with that weapon, and you can add your
ability modifier to the damage of the additional
attack made as part of that property’s activation.
Rush. You can activate the Push mastery property
in addition to a different mastery property you’re
using with that weapon, and you can immediately
move up to your Speed without provoking
Opportunity Attacks.
Stagger. You can activate the Slow mastery
property in addition to a different mastery property
you’re using with that weapon, and the target has
Disadvantage on the next saving throw it makes
before the end of your next turn.

LEVEL 3: COMBAT THEATRICS

LEVEL 18: MUTILATE

You’ve honed your combat skills to entertain,
devastating opponents and dazzling onlookers. You
gain the following benefits.
Athletic Flair. Whenever you make a Dexterity
(Acrobatics) or Strength (Athletics) check, you gain a
bonus to the check equal to your Charisma modifier
(minimum of +1).
Bonus Proficiency. You gain proficiency in one of
these skills of your choice: Acrobatics, Athletics,
Deception, Intimidation, or Performance.

When you hit a Bloodied creature with an attack roll,
you can attempt to critically injure it. The target
makes a Constitution saving throw (DC 8 plus your
Charisma modifier and Proficiency Bonus). On a
failed save, the target suffers the following effects:

LEVEL 7: FLOURISH PARRY
You’ve learned to stylishly counter blows from your
opponents. When an enemy hits you with a melee
attack roll, you can take a Reaction to add your
Charisma modifier (minimum of +1) to your AC
against the attack, potentially causing the attack to
miss.
Flourish Counter. If this Reaction causes the
attack to miss, you can retaliate with a powerful
counterattack as part of the same Reaction. Make an

LEVEL 15: BRUTAL RESURGENCE
Whenever you use your Second Wind to regain Hit
Points, you regain an expended use of Brutality. You
also regain an expended use of Brutality whenever
you use your Action Surge.

Maimed. If the target takes the Attack action, it can
make only one attack.
Sluggish. The target’s Speed is halved, and it has a
−2 penalty to its Armor Class.
These effects last until the target regains Hit Points.
Once a target fails its saving throw against this
feature, you can’t use it again until you finish a Long
Rest.

©2025 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

3

DEFILED SORCERY (SORCERER)

LEVEL 3: DEFILER SPELLS

Siphon Life into Catastrophic Spells

Whenever you reach a Sorcerer level specified in the
Defiler Spells table, you thereafter always have the
listed spells prepared.

Your innate power siphons life essence from the
surrounding world. At your command, creatures
grow sick and plants wither to husks. You draw
power from the corruption of life itself, draining
vitality to fuel destructive magic.

LEVEL 3: DEFILE AND EMPOWER
Once per turn when you roll damage for a spell you
cast using a spell slot, you can siphon your life
energy into the spell and empower it. Roll a number
of your unexpended Hit Point Dice, up to a number
equal to half the level of spell slot expended (round
up, minimum of one die), and add the total rolled to
one damage roll of the spell. Those Hit Point Dice are
then expended.
Life Steal. Instead of drawing on your own life
force when you use this feature, you can try to steal
life from another creature you can see within 30 feet
of yourself. That creature makes a Constitution
saving throw against your spell save DC; creatures
that have Immunity to the Exhaustion condition
automatically succeed on the save. On a failed save,
in place of rolling your Hit Point Dice, roll a number
of the creature’s unexpended Hit Point Dice, up to a
number equal to half the level of slot expended
(round down, minimum of one die); you then add
that total rolled to one damage roll of the spell, and
those Hit Point Dice are expended for the creature.
Once a creature fails its save against Life Steal, you
can’t use Life Steal again until you finish a Long Rest
unless you expend 3 Sorcery Points (no action
required) to restore your use of it.

DESIGN NOTE: HIT POINT DICE
Monsters, like player characters, have Hit Point Dice.
The size and number of a monster’s Hit Dice are
typically denoted in the monster’s stat block as part of
the parenthetical after the monster’s average Hit
Points. Any creature—both characters and monsters—
can expend Hit Dice during a Short Rest to regain Hit
Points.
When a monster is first encountered, assume that it
hasn’t expended any of its Hit Dice.

DEFILER SPELLS
Sorcerer
Level
3
5
7
9

Spells
Blindness/Deafness, Inflict Wounds, Ray
of Enfeeblement, Ray of Sickness
Bestow Curse, Vampiric Touch
Blight, Hallucinatory Terrain
Antilife Shell, Contagion

LEVEL 6: CORRUPTED CASTER
You learn further ways to tap into the corrupting
magic within yourself, granting you the following
benefits.
Defiler’s Ward. When you take a Bonus Action to
transform Sorcery Points into a spell slot, you can
wreathe your body in a protective web of defiling
energy. Roll a number of d6s equal to the level of
spell slot created. You gain Temporary Hit Points
equal to the total rolled.
If a creature hits you with a melee attack roll while
you have Temporary Hit Points, the creature takes
Necrotic or Poison damage (your choice) equal to
your Charisma modifier.
Strengthened Rot. Damage dealt by your Sorcerer
spells and Sorcerer features ignores Resistance to
Necrotic and Poison damage.

LEVEL 14: WITHERING AURA
When you use your Innate Sorcery, an aura of
defiling magic fills a 15-foot Emanation originating
from you while your Innate Sorcery is active,
granting you the following additional benefits.
Defiling Shroud. When an enemy within the aura
hits you with an attack roll, you can reduce that
attack’s total damage against you. The reduction
equals your Charisma modifier.
Essence Siphon. When an enemy dies within the
aura, you regain 1d4 Sorcery Points. Once you use
this benefit, you can’t regain Sorcery Points in this
way until you use Innate Sorcery again.

LEVEL 18: SUPERIOR DEFILER
You’ve perfected your ability to control and channel
defiling magic, granting you the following benefits.
Fouled Soul. You have Immunity to the Poisoned
and Exhaustion conditions.
Furthered Defilement. The size of your Withering
Aura increases to a 30-foot Emanation. In addition,
enemies can’t regain Hit Points while in your aura.

©2025 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

4

SORCERER-KING PATRON
Herald Tyrannical Might of Monstrous Rulers
Your pact draws from the power of a monstrous,
tyrannical force akin to a demigod or an
overwhelmingly powerful magic-user. Through your
pact, you herald this tyrant’s interests in the world,
channeling their influence and mind-bending,
psionic power.

LEVEL 3: SORCERER-KING SPELLS
The magic of your patron ensures you always have
certain spells ready; whenever you reach a Warlock
level specified in the Sorcerer-King Spells table, you
thereafter always have the listed spells prepared.
Psionic Casting. When you cast a spell from the
Sorcerer-King Spells table, you can do so without
Verbal or Material components, except Material
components that are consumed by the spell or that
have a cost specified in the spell.

SORCERER-KING SPELLS
Warlock
Level
3
5
7
9

Spells

Once you use this feature, you can’t do so again until
you finish a Short or Long Rest. You also regain use
of this feature when you use Magical Cunning.

LEVEL 10: VINDICTIVE REBUKE
You learn to rebuff those who challenge you or the
might of your patron. When an enemy hits you with
an attack roll, you can take a Reaction to force the
enemy to reroll the d20, and the enemy must use the
new roll. If this Reaction turns the attack roll into a
miss, the triggering creature takes Psychic damage
equal to your Warlock level.
You can use this feature a number of times equal
to your Charisma modifier (minimum of once), and
you regain all expended uses when you finish a Long
Rest.

LEVEL 14: ABSOLUTE TYRANNY
You wield your patron’s tyrannical might with
absolute conviction. Whenever you cast Command,
you can target one additional creature within the
spell’s range. Additionally, a creature Frightened by
you automatically fails its saving throw against any
Command you cast.

Command, Compelled Duel, Hold
Person, Mind Spike, Wrathful Smite
Fear, Sending
Compulsion, Staggering Smite
Dominate Person, Synaptic Static

LEVEL 3: TYRANT’S HERALD
You gain the following benefits.
Intimidating Presence. You gain proficiency in
the Intimidation skill if you don’t already have it.
You also have Expertise in Intimidation.
Voice of Tyranny. You can cast Command as a
Bonus Action without expending a spell slot. You can
do so a number of times equal to your Charisma
modifier (minimum of once), and you regain all
expended uses when you finish a Long Rest.

LEVEL 6: DECISIVE EDICT
Your patron’s power surges through you, allowing
you to rally your allies and subjugate your enemies.
When you cast a spell using a Pact Magic spell slot,
you can cause profane power to erupt in a 30-foot
Emanation originating from you. For each creature
you can see in the Emanation, choose one of the
following effects:
Marshal. The creature has Advantage on attack rolls
until the end of its next turn.
Oppress. The creature must succeed on a Wisdom
saving throw against your spell save DC or have
the Frightened condition until the end of its next
turn.

©2025 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

5


