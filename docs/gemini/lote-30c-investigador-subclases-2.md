# Encargo: Lote 30c (Investigator, subclases 8 a 13 (Inquisitor a Time Operative)) de la app "Mi turno"

"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el formato de
abajo, lo que se pide, usando **solo el texto en inglés que viene al final**: la clase **Investigator** de Mage Hand Press
(versión 2024, material de la comunidad, no oficial de Wizards). Otra persona revisa y aplica tu respuesta con un script, así que el
formato tiene que ser exacto. También puedes ayudarte del PDF "Investigator Class Overview 2024" si te lo adjuntan.

## Reglas
1. **No resumas.** Cada rasgo conserva TODAS las reglas: cada opción, condición, excepción y limitación. Largo no es problema.
2. **Cifras siempre.** Dados, distancias, duraciones, CD, usos y niveles exactos ("2d8", "30 pies", "1 minuto"). Si no puedes
   confirmar una cifra, escribe [NO CONFIRMADO] en vez de inventarla.
3. **Español de D&D** con la terminología del Manual del Jugador 2024 en español ("acción adicional", "tirada de salvación",
   "Dado de Golpe", "ventaja/desventaja", condiciones, tipos de daño…). Redacta con tus palabras, sin copiar traducciones de libros.
4. **Nombres:** traduce los que tengan traducción evidente o conocida (Finisher → Golpe de Gracia, Trinkets → Amuletos, etc.; si propones
   una, márcala (PROPUESTA) y deja el original entre paréntesis). Deja en inglés los nombres propios y de lore sin traducción conocida.
   Conjuros que ya existen: su nombre oficial en español del Manual del Jugador 2024; los nuevos de esta clase: traducción
   evidente con el original entre paréntesis, o el inglés si no lo es.
5. Tipos de acción para `t`: accion, adicional, reaccion, gratis (sin acción), pasiva, fuera (fuera de combate o ritual).
6. Sin `[cite: n]` ni notas de fuente dentro de los textos. No cortes la respuesta: si es larga, termina una parte y avisa en
   cuál quedaste para continuar cuando te escriba "continúa".
7. Responde solo con las partes pedidas, cada una con su marcador en una línea (`=== A ===`, `=== B ===`…).

## Qué se pide
Las subclases **Inquisitor, Kid Sleuth, Medium, Occultist, Spy y Time Operative**, con todos sus rasgos (los objetos mágicos que aparezcan se piden en el lote 30d: ignóralos aquí).

## Formato de la respuesta
=== A ===
TypeScript: `export const INVESTIGATOR_SUBCLASES: Record<string, { n: string; rasgos: any[] }>` con una clave en minúsculas y guiones por subclase y, en cada una, `rasgos: [{ nombre, t, texto, n (nivel), usos, reset }]` (reset: "corto", "largo" o "ninguno"; usos 0 si es solo texto; si los usos dependen del nivel o de un modificador, ponlo en B).
=== B ===
JSON de lo que se calcula o se elige: usos con fórmula, conjuros siempre preparados por nivel (tablas de cada subclase) con los nombres de conjuro en español, y las opciones a elegir (por ejemplo la "tesis" del Archivist). Formato: `[{ "donde": "clave-subclase", "rasgo": "nombre", "tipo": "usos|conjuros|eleccion", "usos": "...", "reset": "...", "por_nivel": {"3": ["..."]}, "detalle": "..." }]`.
=== C ===
JSON `{ "clave": "Investigator (Mage Hand Press, 2024)" }` para cada subclase.
=== D ===
JSON `{ "clave": "1 o 2 frases que presenten la subclase" }`.
=== E ===
Dudas o [NO CONFIRMADO].

## Texto fuente (Investigator, Mage Hand Press, 2024)

Spiteful Distraction. As a Bonus Action, you can
command the familiar to disrupt an enemy within 5 feet
of it. The target has Disadvantage on the next attack roll it
makes before the start of your next turn.

Level 3: Trinkets

You can use the following trinkets.
Demon’s Eye. As a Bonus Action, you gain the
ability to see normally in Dim Light and Darkness—both
magical and nonmagical—within 120 feet of yourself for
1 minute.
Diabolical Barb. You can cast Hellish Rebuke without
a spell slot or components.
Hexagram Pendant. You can cast Hex without a spell
slot or components.

Level 6: Infernal Bargain

When you finish a Long Rest, you can strike one of the
following bargains with your infernal masters. You can
also discuss new bargains with your GM. The bargain
lasts until you finish a Long Rest.
Blindsight and Blindness. You have Blindsight with a
range of 30 feet. Beyond this range, you have the Blinded
condition.
Damage and Actions. Once on each of your turns,
you can choose to take Necrotic damage equal to twice
your Investigator level to take an additional action. This
action can only be used to take only the Attack (one
attack only), Dash, Disengage, Hide, or Utilize action.
Resistance and Vulnerability. Choose two of the
following damage types: Acid, Cold, Fire, Lightning,
Poison, Psychic, and Thunder. You have Resistance to the
chosen damage types. The GM chooses another type from
the list; you have Vulnerability to that damage type.

Inquisitor
Drive Out Fiends and Root out Heresy
The church has long been the first line of defense against
the tide of impending darkness. Yet, the clergy’s stubborn
devotion to righteousness impedes them where it counts:
you must sometimes be willing to do evil to counter evil.
That’s where the inquisition comes in.
As a righteous Inquisitor, you are tasked with rooting
out heresy, exorcising demons, and stamping out any sign
of the occult, and you are offered clemency for any action
you take in the defense of the greater good. You may
investigate anyone or anything you deem to be in line
with the forces of evil, for you alone are a holy blade in
the dark, the arbiter of your church.

Level 3: Exorcist’s Doctrines

Your training as an inquisitor grants you the following
benefits.
Consecrated Armor. You add Consecrated Armor to
your grimoire for free. When you cast it, your base AC
becomes 13 plus your Dexterity modifier.
Dogma. Whenever you make an Intelligence
(Religion) check, you can treat a d20 roll of 9 or lower
as a 10.

Level 10: Binding Contract

You add Geas to your grimoire for free. When you cast
the spell using this feature, you can modify its casting
to draft a binding contract. Instead of giving a verbal
command, you write a legal contract that can contain
up to 10 commands and conditions. You can include
clauses that end the spell early or extend its duration to a
maximum of 90 days. Instead of targeting a creature that
you can see within range, the spell targets any creature
that signs the contract within the duration.
A creature that willingly signs the contract as a
Utilize action automatically fails its saving throw against
the spell, whether or not the creature understands the
nature of the contract.

Level 14: Fiendish Transformation

You can take a Magic action to shape-shift your Fiendish
Familiar into one of the following forms: Barbed Devil,
Incubus, Succubus, or Vrock. It remains transformed for
1 minute or until you end it (no action required). While
transformed, your familiar can attack.
Once you use this feature, you can’t do so again until
you finish a Long Rest.

Mage Hand Press

13

Level 3: Trinkets

You can use the following trinkets.
Alabaster Balm. As a Bonus Action, you can cast
Lesser Restoration without a spell slot or components.
Hallowed Chalice. As a Bonus Action, you can
enchant a container, such as a cup, that you touch to
produce a flask of Holy Water. You can produce one such
flask when you use this trinket. For the next hour, you
can use a Bonus Action to produce another flask of Holy
Water, until you have created a total of five flasks. Once
created, these flasks and Holy Water vanish after 1 hour.
Reliquary of Doubt. As a Bonus Action, you can
cast Detect Thoughts without a spell slot or components.
When you cast the spell using this trinket, you can only
detect thoughts associated with negative emotions, such
as guilt, apprehension, regret, or melancholy.

Level 3: Trinkets

Once on each of your turns when you hit a creature with
an attack roll using a weapon, you can cause the target
to take an extra 1d8 Necrotic or Radiant damage (your
choice).

You can use the following trinkets.
Bag of Traps. As a Bonus Action, you can magically
produce and take the Utilize action to use one of the
following items: Ball Bearings, Caltrops, Chain, Hunting
Trap, Manacles, or Oil (which you can only use to douse
a space). If the item requires a saving throw, it uses your
Investigator spell save DC. For the next minute, you can
use a Bonus Action to produce and use another such
item, until you have created a total of five items. Once
created, these items vanish after 1 hour.
Dooby Snack. As a Bonus Action, you produce
a tasty treat that lasts for 1 hour. A creature can use
a Bonus Action to eat this treat to gain a number of
Temporary Hit Points equal to your Intelligence modifier
(minimum of 1). Until the start of its next turn, the
creature has Advantage on the next D20 Test it makes.
Magnifying Glass. As a Bonus Action, you can cast
Clue without a spell slot or components. Additionally,
when you cast this spell using this trinket, you can
determine each type of creature that leaves footprints or
fingerprints.

Level 10: Rote Piety

Level 3: Animal Sidekick

Level 6: Divine Strike

You can use your Holy Relics three times without
expending a use of your Trinkets. You regain these uses
when you finish a Long Rest.

Level 14: Excommunication

As a Bonus Action, you can emblazon a mark of
condemnation upon a creature you can see within 60 feet
of you. The target must succeed on a Wisdom saving throw
or be marked for 1 minute. While marked, the target takes
6d6 Radiant damage at the start of each of its turns, can’t
regain Hit Points, and can’t have Advantage on D20 Tests.
A marked target can repeat its saving throw at the end of
each of its turns, ending the effect on itself on a success.
Once you mark a creature using this feature, you
can’t use it again until you finish a Long Rest. You can
also restore your use of it by expending a use of your
Rushed Incantation (no action required).

Kid Sleuth
Solve Mysteries with Your Talking Animal Sidekick
Though Kid Sleuths are not all literally youths, they are
all amateur detectives with a knack for solving tricky
crimes. Assisted by their ubiquitous animal sidekicks, Kid
Sleuths will happily dive into the details of a grim crime
scene to emerge with a handful of clues and a lead on the
bad guy. These sleuths generally prefer to run away from
trouble, rather than engage head-on, since mysteries only
get harder to solve with more dead bodies, but they are
more than capable of defending themselves if backed into
a corner.

You gain a Kid Sleuth’s constant companion: a talking
animal sidekick. You add Find Familiar to your grimoire
for free. You can use Rushed Incantation to cast the spell
without expending a use of the feature, and you don’t
need to read from your grimoire to cast it. The spell is
improved in the following ways when you cast it.
Expanded Options. You can choose one of the
normal forms for your familiar or one of the following
special forms: Goat, Mastiff, or Weasel.
Awakened. The animal gains an Intelligence of 10
and the ability to speak one language you know.
Skillful. Your familiar gains proficiency in any
combination of two skills or tools of your choice. You can
change this selection when you summon your familiar.

Level 6: Split Up, Gang

When you use your Exploit Weakness, you can
immediately move up to half your Speed without
provoking Opportunity Attacks. Alternatively, you can
choose one ally you can see within 30 feet of you who can
see or hear you. The ally can take a Reaction to move up
to half its Speed without provoking Opportunity Attacks.

Level 10: Cunning Companion

When your familiar takes the Dash, Disengage, or Hide
action, you gain the benefits of that action on your next
turn. You must be Heavily Obscured or behind ThreeQuarters Cover or Total cover, and you must be out of
any enemy’s line of sight to gain the benefits of the Hide
action.

Level 14: Meddling Kids

Whenever an enemy within 30 feet of yourself makes
an attack roll against one of your allies, you can take a
Reaction to impose Disadvantage on that roll.

14

Complete Investigator

Medium

Occultist

Foretell the Future and Commune with the Dead

Command Arcane Pact Magic

As conduits between the living and dead, Mediums offer
an essential glimpse past the veil of mortality. Using
their auguries, seances, and divinations, Mediums can
retrieve morsels of information from the afterlife to settle
debts between the living or dead, and to assist ongoing
investigations. This information, however cryptic, can
point an interested party toward clues or evidence that
only the deceased are able to provide.

Vampires, demons, lycanthropes, and Aberrations all
have one thing in common: they are all magical threats,
best combated through magical means. To meet these
foes on a level playing field, Occultists indulge in
arcana, filling their grimoires with magical secrets and
mastering a handful of spells. Occultists are the most
likely Investigators to cavort with Warlocks, borrow tricks
from Wizards and magicians, and dabble in dark magic to
defeat their foes.

Level 3: Fortelling

Whenever you finish a Long Rest, roll two d20s and
record the numbers rolled. You can replace any D20 Test
made by you or a creature that you can see with one of
these foretelling rolls. You must choose to do so before
the roll, and you can replace a roll in this way only once
per turn.
Each foretelling roll can be used only once. When you
finish a Long Rest, you lose any unused foretelling rolls.

Level 3: Trinkets

Level 3: Trinkets

Level 3: Pact Magic

You can use the following trinkets.
Dead Ringer. You can ring this bell to cast Speak with
Dead without a spell slot or components. When you cast
the spell using this trinket, you can ask the corpse only
one question.
Heptagonal Spectacles. As a Bonus Action, you
can cast See Invisibility once without a spell slot or
components.
Lucent Mirror. As a Bonus Action, you can partially
phase into the Ethereal Plane for 1 minute or until you
dismiss it (no action required). You have a Fly Speed of 10
feet and can move through occupied spaces as if they were
Difficult Terrain. If you end your turn in such a space, you
are shunted to the last unoccupied space you were in.

Level 6: Foretold Demise

Once per turn when you deal damage with a weapon, you
can replace one of the damage dice with a foretelling roll.

Level 10: Whispers from Beyond

As a Magic action, you can receive a hint from beyond.
The GM gives a one-word hint pertaining to your best
course of action, a fruitful line of inquiry, or some other
useful direction.
Once you use this feature, you can’t use it again until
you finish a Long Rest. You can also restore your use of it
by expending a use of your Rushed Incantation (no action
required).

Level 14: Third Eye

You can take a Bonus Action to cast True Seeing without
a spell slot or components. When you cast the spell with
this feature, you have Advantage on the first attack you
make on each of your turns for the duration of this spell.
Once you use this feature, you can’t do so again until
you finish a Long Rest.

Mage Hand Press

You can use the following trinkets.
Cold Iron Pendant. You can cast Detect Evil and
Good without a spell slot or components.
Dead Mist Vial. You can cast Fog Cloud without a
spell slot or components.
Engraved Lens. You can cast Identify without a spell
slot or components.
You augment your investigative skills with complex magic.
Cantrips. You know two Warlock cantrips of
your choice. Eldritch Blast and Minor Illusion are
recommended. Whenever you gain an Investigator level,
you can replace one of your cantrips from this feature
with another Warlock cantrip of your choice.
When you reach Investigator level 10, you learn
another Warlock cantrip of your choice.
Spell Slots. The Occultist Spellcasting table shows how
many spell slots you have to cast your Warlock spells of
levels 1–4. The table also shows the level of those slots, all
of which are the same level. You regain all expended Pact
Magic spell slots when you finish a Short or Long Rest.
Prepared Spells of Level 1+. You prepare the list
of level 1+ spells that are available for you to cast with
this feature. To start, choose two level 1 Warlock spells.
Charm Person and Hex are recommended.
The number of spells on your list increases as you
gain Investigator levels, as shown in the Prepared Spells
column of the Occultist Spellcasting table. Whenever that
number increases, choose additional Warlock spells until
the number of spells on your list matches the number in
the table. The chosen spells must be of a level no higher
than what’s shown in the table’s Slot Level column for
your level.
Changing Your Prepared Spells. Whenever you gain
an Investigator level, you can replace one spell on your
list with another Warlock spell of an eligible level.
Spellcasting Ability. Intelligence is the spellcasting
ability for your Warlock spells.
Spellcasting Focus. You can use an Arcane Focus as a
Spellcasting Focus for your Warlock spells.

15

Occultist Spellcasting

Spy

Investigator
Level

Prepared
Spells

Spell
Slots

Slot
Level

3

3

1

1

4

4

1

1

5

4

2

1

6

4

2

1

7

5

2

2

8

6

2

2

9

6

2

2

Infiltration, disguise, and lying through their teeth: these
are the principal skills of a Spy. A talented Spy rarely
needs to draw a dagger to silence someone, for their
honeyed words and agreeable disposition are all that is
needed to draw out someone’s secrets. Of course, when
they do strike, it is decisive and without warning. Such
skills are invaluable for governments and organizations
of all types, used for stealing confidential information,
sabotage, monitoring persons of interest, and everything
in between.

10

7

2

2

Level 3: Bravado

11

7

2

2

12

8

2

2

13

9

2

3

14

10

2

3

15

10

2

3

16

11

2

3

17

11

2

3

18

11

2

3

19

12

2

4

20

13

2

4

Infiltrate, Assassinate, and Lie with Aplomb

Your infectious confidence gives you a bonus to your
Charisma (Deception and Persuasion) checks equal to
your Intelligence modifier (minimum of +1).

Level 6: Eldritch Ruin

You can cast one of your Warlock cantrips as a Bonus
Action. You can use this feature a number of times equal
to your Intelligence modifier (minimum of once). You
regain all expended uses when you finish a Long Rest.

Level 10: Eyes of Another World

Magical perception grants you the following benefits.
See Invisibility. You see creatures and objects that
have the Invisible condition. You can also see into the
Ethereal Plane. Creatures and objects there appear ghostly.
Sense Spellcasters. You can sense if a creature you
can see has the ability to cast spells.
Discern Otherworldly Origins. You can determine
if a creature you can see is an Aberration, Celestial,
Elemental, Fey, or Fiend. You can also determine
the creature’s plane of origin, if it is native to a
different plane of existence than the one you’re on.

Level 14: Maleficium

When you use your Exploit Weakness, you can
cast Bestow Curse on the target as a Bonus Action
without a spell slot or components.
Once a creature fails a saving throw against this
spell, you can’t use this feature again until you finish
a Short or Long Rest. You can also restore your use of
it by expending a use of your Rushed Incantation (no
action required).

16

Complete Investigator

Level 3: Trinkets

You can use the following trinkets.
Glass Dust. As a Bonus Action, you can throw
this pouch at a point you can see within 10 feet of you,
filling a 5-foot-radius Sphere centered on that point with
glittering dust until the start of your next turn. A creature
that enters the Sphere for the first time on a turn or ends
its turn there has the Invisible condition. This condition
ends early for a creature that leaves the Sphere, makes an
attack roll, deals damage, or casts a spell.
Horn-Rimmed Glasses. As a Bonus Action, you can
cast Disguise Self without a spell slot or components.
Martini Glass. As a Bonus Action, you can cast
Charm Person without a spell slot or components.

Level 6: Cloak and Dagger

When you deal damage during the first round of combat,
you can deal extra Force damage to the target if the target
hasn’t taken a turn yet or if you have Advantage on the
attack roll against the target. The Force damage equals
your Investigator level.

Level 10: Body Double

As a Magic action, you can assume the identity of a
Humanoid or a corpse of a Humanoid that you touch
that has been dead for no longer than 24 hours. An
illusion causes your appearance to perfectly match the
target, including clothing, armor, weapons, and other
belongings. If the target is a corpse, you resemble the
Humanoid as it appeared in life. Additionally, the corpse,
its blood, clothing, and other physical evidence of its
death, become magically invisible for 8 hours.
To discern that you are disguised, a creature must
take the Study action to inspect your appearance and
succeed on an Intelligence (Investigation) check against
your spell save DC.
Once you use this feature, you can’t use it again until
you finish a Short or Long Rest. You can also restore your
use of it by expending a use of your Rushed Incantation
(no action required).

Level 14: Glib

You can cast Glibness without a Material component. You
can also cast it once without a spell slot, and you regain
the ability to cast it in this way when you finish a Long
Rest. For the spell’s duration, you can take the Influence
action as a Bonus Action.

Time Operative
Manipulate Time to Solve Mysteries
Time Operatives are agents from the future bestowed
with a series of cryptic goals and a well of chronomantic
magic. Some operatives hail from far-off utopias or
crumbling apocalypses, while others simply receive a
message across space and time and dedicate themselves to
its mission. To prevent paradoxes, these Time Operatives
receive only the barest clues pertaining to their mission.
They know only the gravity of the situation, and that it is
inherent upon them to change the course of history.

Level 3: Borrowed Time

Once on each of your turns, you can take an additional
action. This action can only be used to take only the
Attack (one attack only), Dash, Disengage, Hide, or
Utilize action.
You can use this feature twice, and regain all
expended uses when you finish a Long Rest.

Level 3: Trinkets

You can use the following trinkets.
Blank Tablet. As a Magic action, you touch a
creature and end one condition on it: Blinded, Deafened,
Paralyzed, or Poisoned. You can’t remove a condition that
a creature has had for longer than 1 minute.
Quicksilver Emblem. As a Bonus Action, you can
cast Longstrider without a spell slot or components.
Weightless Sphere. You can cast Feather Fall without
a spell slot or components.

Level 6: Rewind

When you make a D20 Test and fail, you can take a Bonus
Action to rewind time to the moment before the attempt.
Reroll the D20 Test and you must use the new roll.
You can use this feature a number of times equal
to your Intelligence modifier (minimum of once). You
regain all expended uses when you finish a Long Rest.

Level 10: Echo of Yesterday

You can take the Magic action to cast your senses up to 24
hours back in time at your current location. You can see
and hear this location as if you were there, but the past
appears dreamlike and shadowy. While perceiving the
past, you can look in any direction, but you can’t move or
speak. This glimpse into the past lasts for 10 minutes, but
it ends early if you dismiss it (no action required).

Level 14: Steal Time

When you finish a Short Rest or reduce an enemy to 0 Hit
Points, you regain a use of your Borrowed Time.

Mage Hand Press

17
