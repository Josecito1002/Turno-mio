# Encargo: Lote 30d (Investigator, conjuros y objetos mágicos) de la app "Mi turno"

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
La lista de conjuros del Investigator (marcando cuáles cuentan como ritual), la descripción de **todos los conjuros nuevos** de la sección Spells y los **objetos mágicos nuevos** (incluidos los que van ligados a las subclases, que aparecen sueltos en las páginas de subclases: están en el texto de este lote si son de las páginas 19 a 25).

## Formato de la respuesta
=== A ===
TypeScript: `export const INVESTIGATOR_CONJUROS_NUEVOS: Record<string, { nombre, nivel, escuela, tiempo, alcance, componentes, duracion, desc, ritual }>` (clave en minúsculas y guiones) para los conjuros que NO existen en el Manual del Jugador 2024, con la descripción completa y los "a niveles superiores".
=== B ===
JSON `{ "lista": { "1": ["Conjuro", ...], "2": [...], ... }, "rituales_extra": ["Conjuro", ...] }` con la lista del Investigator por nivel (nombres de conjuro en español).
=== C ===
TypeScript `export const OBJETOS = {...}` con la forma de `ObjetoMagico` de la app (mira OBJETOS_MAGICOS_GENERADOS): nombre, rareza, tipo, sintonía, texto completo con cifras.
=== D ===
JSON `{ "investigator": "1 o 2 frases" }` (solo si aporta algo; si no, `{}`).
=== E ===
Dudas o [NO CONFIRMADO].

## Texto fuente (Investigator, Mage Hand Press, 2024)

(Las páginas 7 y 8 mezclan el final de los rasgos de clase —ignóralos— con la **Investigator Spell List**, que es lo que se pide. Los objetos de subclase que aparecen sueltos en las páginas de subclases se piden aparte si ves que faltan: anótalo en E.)

Level 11: Improved Finisher

When you take the Attack action on your turn, you
can use your Finisher on a creature that isn’t Bloodied,
dealing only an extra 1d8 damage to the target.
At Investigator level 17, this damage increases to 2d8.

Spell

School

Alarm

Abjuration

R

Blood Print*

Necromancy

R

Level 13: Enigma Arcane

Clue*

Divination

(R)

Comprehend Languages

Divination

R

Consecrated Armor*

Abjuration

(R)

Detect Evil and Good

Divination

C, (R)

Detect Magic

Divination

C, R

Detect Poison and Disease Divination

C, R

Disguise Self

Illusion

(R)

Find Familiar

Conjuration

C, R, M

Floating Disc

Conjuration

R

Fog Cloud

Conjuration

C, (R)

Heroism

Enchantment

C, (R)

Identify

Divination

R, M

Illusory Script

Illusion

R, M

Memorize*

Enchantment

(R), M

You have Advantage on saving throws against spells and
other magical effects unless you have the Incapacitated
condition.

Protection from Evil and
Good

Abjuration

C, (R), M

Level 19: Epic Boon

Purify Food and Drink

Transmutation

R

Rumor*

Enchantment

(R)

Speak with Animals

Divination

(R)

Transient Bulwark*

Abjuration

(R), M

Unseen Servant

Conjuration

R

You learn a secret that unlocks potent arcane magic.
You gain the ability to cast a level 7 spell, and discover
additional secrets when you reach certain Investigator
levels.
Level 7 Spell. You can cast one of the following spells
without a spell slot and regain the ability to do so when
you finish a Long Rest: Mirage Arcane, Plane Shift, Reverse
Gravity, Sequester, or Teleport.
Level 8 Spell. At Investigator level 15, you can also
cast one of the following spells without a spell slot and
regain the ability to do so when you finish a Long Rest:
Antimagic Field, Glibness, Maze, or Mind Blank.
Level 9 Spell. At Investigator level 17, you can also
cast one of the following spells without a spell slot and
regain the ability to do so when you finish a Long Rest:
Astral Projection, Gate, or Weird.

Level 18: Supernatural Resolve

You gain an Epic Boon feat or another feat of your choice
for which you qualify.

Level 20: Spellbinder

Choose 5 Investigator spells in your grimoire of levels
1–3 that have a casting time of an action or Bonus Action.
You can use Rushed Incantation to cast the chosen spells
without expending a use of the feature, and you don’t
need to read from your grimoire to cast them.
Whenever you finish a Long Rest, you can replace
one of those spells with another spell in your grimoire.

Investigator Spell List
This section presents the Investigator spell list. The
spells are organized by spell level and then alphabetized,
and each spell’s school of magic is listed. New spells are
marked with an asterisk (*). In the Special column, C
means the spell requires Concentration, R means it’s
a Ritual, (R) means you treat the spell as if it has the
Ritual tag, and M means it requires a specific Material
component.

6

Level 1 Investigator Spells
Special

Level 2 Investigator Spells
Spell

School

Animal Messenger

Enchantment

R

Arcane Lock

Abjuration

(R), M

Arcanist’s Magic Aura

Illusion

(R)

Augury

Divination

(R), M

Curse Ward*

Abjuration

(R)

Darkness

Evocation

C, (R)

Darkvision

Transmutation

(R)

Gentle Repose

Necromancy

R, (M)

Jethro’s Instant Reload*

Conjuration

(R)

Knock

Transmutation

(R)

Locate Animals or Plants

Divination

R

Locate Object

Divination

C, (R)

Magic Mouth

Illusion

R, M

Nondescript*

Illusion

C, (R)

Complete Investigator

Special

Protection from Poison

Abjuration

(R)

Level 5 Investigator Spells

Protect Threshold*

Abjuration

R

Spell

School

Special

Divination

R

See Invisibility

Divination

(R)

Commune

Silence

Illusion

C, (R)

Commune with Nature

Divination

R

Spider Climb

Transmutation

C, (R)

Contact Other Plane

Divination

R

Zone of Truth

Enchantment

(R)

Dream

Illusion

(R)

Geas

Enchantment

(R)

Legend Lore

Divination

(R), M

Level 3 Investigator Spells
Spell

School

Special

Planar Binding

Abjuration

(R), M

After Image*

Illusion

(R), M

Telepathic Bond

Divination

(R)

Benign Dismemberment* Necromancy

R

Level 6 Investigator Spells

Clairvoyance

Divination

C, (R), M

Create Food and Water

Conjuration

(R)

Spell

School

Special

Daylight

Evocation

(R)

Find the Path

Divination

C, (R), M

Dispel Magic

Abjuration

(R)

Forbiddance

Abjuration

(R), M

Fly

Transmutation

C, (R)

Game of Fate*

Enchantment

(R)

Magic Circle

Abjuration

(R), M

Instant Summons

Conjuration

R, M

Meld into Stone

Transmutation

Nondetection

Abjuration

Phantom Steed

Illusion

R

Remove Curse

Abjuration

(R)

Séance*

Necromancy

(R)

Sending

Divination

(R)

Speak with Dead

Necromancy

(R)

Speak with Plants

Transmutation

(R)

Tongues

Divination

(R)

Water Breathing

Transmutation

R

Water Walk

Transmutation

R

R
(R), M

Level 4 Investigator Spells
Spell

School

Special

Arcane Eye

Divination

C, (R)

Dire Warning*

Divination

(R)

Divination

Divination

R, M

Invisibility Purge*

Illusion

(R)

Locate Creature

Divination

C, (R)

Private Sanctum

Abjuration

(R)

Scrutinize Foe*

Divination

(R)

Secret Chest

Conjuration

(R), M

Zero Gravity*

Transmutation

C, (R)

Mage Hand Press

7

[... páginas 19 a 25 ...]

Spells

This section contains the descriptions of spells that are
new and available to the Investigator. The class spell lists
detailed with each spell include other classes from Mage
Hand Press, including the Necromancer, Martyr, and
Witch.

Spell Descriptions
New spells are presented in alphabetical order.

After Image

Level 3 Illusion (Investigator, Ranger, Sorcerer,
Warlock, Wizard)
Casting Time: Action
Range: Self
Components: V, S, M (a silver hand mirror worth 50+ GP)
Duration: 10 minutes

You create an illusory duplicate of yourself which follows
your every movement. When a creature hits you with
an attack roll while your duplicate remains, roll a d6. If
it rolls a 3 or higher, the duplicate is hit instead of you
and the duplicate is destroyed. The duplicate otherwise
ignores all other damage and effects. The duplicate
reappears if you move 15 feet or more on your turn or
take the Dodge action.
A creature is unaffected by this spell if it has the
Blinded condition, Blindsight, or Truesight.

Benign Dismemberment

Level 3 Necromancy (Investigator, Necromancer,
Witch, Wizard)
Casting Time: 1 minute or Ritual
Range: Touch
Components: V, S
Duration: 1 hour

Blood Print

Level 1 Necromancy (Bard, Cleric, Druid, Investigator,
Martyr, Paladin, Ranger, Necromancer, Sorcerer, Witch,
Wizard)
Casting Time: Action or Ritual
Range: Touch
Components: V, S, M (an ounce or more of blood)
Duration: Instantaneous

At your touch, wet blood on a surface shifts and reforms
into a pattern of crimson blotches. This blood print is
unique to the particular creature to whom the blood
belongs, but you can determine the creature’s kind (such
as Human, Gnoll, Deer, or Fire Giant) by examining the
general shape. A print can be preserved by pressing a
sheet of paper against it. If this spell is cast twice, it is
possible to match blood samples originating from the
same creature.

Clue

Level 1 Divination (Bard, Cleric, Druid, Investigator,
Paladin, Ranger, Witch, Wizard)
Casting Time: Action or Ritual
Range: Touch
Components: V, S, M (a magnifying glass and pipe)
Duration: 10 minutes

When you cast this spell, all footprints and fingerprints
within a 30-foot Emanation originating from you become
highlighted and glow faintly for the duration. When you
cast the spell, choose any point in time up to 10 days ago.
Only footprints and fingerprints left between that time
and the present will be highlighted. Each creature that
leaves footprints and fingerprints is assigned a unique
color, but are not otherwise identified. Any creature that
moves or touches objects within the Emanation will also
leave colorful footprints and fingerprints, which might
reveal invisible creatures in the area.

You touch a willing creature, allowing its body parts
(fingers, limbs, and even its head) to be harmlessly
severed from its body for the duration. It takes no
damage from such dismemberment, as long as the body
part is removed swiftly and leaves a clean cut. The target’s
head remains alive and conscious, and parts connected
to it also remain alive. All severed body parts become
inanimate, but don’t begin decomposition for the spell’s
duration. Any of the target’s severed body parts that are
removed during this spell’s duration can be held back to
the stump, which instantly restores the body part.
At the end of the duration, severed body parts
become permanently severed. The target dies if vital
organs have not been reattached to its head.

18

Complete Investigator

Consecrated Armor

Game of Fate

Casting Time: Action or Ritual
Range: Self
Components: V, S, M (a drop of blessed oil)
Duration: 8 hours

Casting Time: Action or Ritual
Range: 60 feet
Components: V, S, M (a gaming set)
Duration: 1 hour

You trace a holy symbol on yourself, creating an invisible
barrier until the spell ends. Your base AC becomes 12
plus your Dexterity modifier. If you are attacked by
an Aberration, Fey, Fiend, or Undead, you add your
spellcasting ability modifier to your AC against that
attack. The spell ends early if the target dons armor.

You magically compel a creature within range that can
hear and understand you to a nonmagical game with vital
consequences. An unwilling creature can make a Wisdom
saving throw to resist this effect. On a failed save, the
creature is compelled to join you in the game.
The loser of the game takes 6d6 Psychic damage. If no
player loses or has won by the end of the spell’s duration,
both you and the target take this damage. If you or one of
your allies harms the target, you forfeit the game, and vice
versa if the target or one of its allies harms you.
Additionally, you and the target creature can
negotiate for greater stakes. You can wager for higher
Psychic damage (up to a maximum of 12d6), property, or
more esoteric rewards, such as bestowal of a noble title.
The spell reveals if a creature attempts to bet property it
doesn’t own. A bet is finalized when you and the target
agree on the bet, solidifying the bet with a handshake or
similar gesture. Property or currency bet on the game is
teleported to the winner at the game’s conclusion. The
loser is also magically compelled to take any action (such
as bestowing a noble title) wagered as part of a bet.
Lastly, no spell, magical effect, or creature other than
you and the target can influence the game’s outcome.

Level 1 Abjuration (Cleric, Investigator)

Curse Ward

Level 2 Abjuration (Cleric, Investigator, Martyr, Paladin,
Warlock, Witch, Wizard)
Casting Time: Action
Range: Touch
Components: V, S
Duration: 1 hour

You reach out your hand and touch a willing creature,
raising a smoke-like barrier around it. For the duration,
the target has Resistance to Necrotic damage and can’t be
cursed or possessed. Additionally, its Hit Point maximum
can’t be reduced. If the target is already under one of
these effects, the effect is suppressed until the spell ends.

Dire Warning

Level 4 Divination (Cleric, Investigator, Necromancer,
Wizard)
Casting Time: Action
Range: Self
Components: V, S
Duration: Instantaneous

You receive a message of up to 6 words from yourself in
the future, warning you of a critical threat or pointing
you toward a fruitful avenue. At some point in the future,
once you have learned why you sent the message, you
must perform a ritual over the course of 10 minutes,
which can be done during a Short Rest, to deliver the
message back in time to your past self.
Once you cast this spell, you can’t cast it again for 7
days or until you perform this ritual. If you cast this spell
and receive no message, it indicates that you will never
complete the ritual in the future, possibly owing to your
death or another hindrance.

Level 6 Enchantment (Bard, Investigator, Wizard)

Invisibility Purge

Level 4 Abjuration (Bard, Investigator, Sorcerer, Witch,
Wizard)
Casting Time: Action
Range: Self
Components: V, S, M (a pinch of powdered silver)
Duration: 1 minute

A 120-foot Emanation originating from you disrupts
invisibility. Each creature within the Emanation is
outlined with a magical aura and can’t benefit from
the Invisible condition. Invisible objects within the
Emanation are rendered visible.

Jethro’s Instant Reload

Level 2 Conjuration (Bard, Investigator, Ranger, Wizard)
Casting Time: Action
Range: Touch
Components: V, S, M (a spent bullet casing)
Duration: 8 hours

One Ranged weapon you touch becomes enchanted
to reload itself automatically. If the weapon has the
Cooldown, Loading, or Reload property, you ignore
the property for the duration. When the weapon’s
ammunition is depleted, ammunition you are carrying
teleports into the weapon.

Mage Hand Press

19

Memorize

Level 1 Enchantment (Bard, Cleric, Investigator,
Necromancer, Wizard)
Casting Time: Action or Ritual
Range: Touch
Components: V, S, M (a page of written
text and a length of silver string worth
10+ GP, tied in a knot, which the spell
consumes)
Duration: Instantaneous

While casting this spell, your eyes pass over
the words on a page, which are committed
to your memory. For the next year, you
remember the exact details of all information
on the page. After that time, you have
advantage on all Intelligence checks you
make to recall this information.

Nondescript

Level 2 Illusion (Bard, Investigator,
Necromancer, Sorcerer, Witch, Wizard)
Casting Time: Action
Range: Self
Components: V, S
Duration: Concentration, up to 10 minutes

This spell makes you seem unremarkable to
others, though it doesn’t change your actual
appearance. For the duration, a creature that
sees or hears you is unable to recall specific
details about you, though it can remember
actions you took or events that transpired
around you.

Protect Threshold

Level 2 Abjuration (Investigator, Necromancer, Sorcerer,
Witch, Wizard)
Casting Time: Action or Ritual
Range: Touch
Components: V, S, M (an ounce of salt for each foot
of the warded portal’s perimeter)
Duration: 10 minutes

Tracing arcane sigils along its boundary, you can ward
a doorway, window, or other portal from entry. For the
duration, an invisible eldritch creature stalks the warded
portal. Any creature that attempts to pass through the
portal makes a Wisdom saving throw or take 4d6 Psychic
damage, or half as much on a successful save.
Using a Higher-Level Spell Slot. The damage
increases by 1d6 for each spell slot level above 2.

Rumor

Level 1 Enchantment (Bard, Investigator, Witch, Wizard)
Casting Time: Action
Range: Self
Components: V, S
Duration: 1 minute

20

You magically spread a rumor of 10 words or less in a
100-foot Emanation centered on you. Any creature within
the Emanation that is near three or more other creatures
that share a common language believes that they hear
the rumor being repeated by someone nearby. Different
creatures hear the rumor from different people, so a
concrete origin point is impossible to discern. Generally,
creatures won’t become Hostile upon hearing even the
most vicious rumors, but hearing a rumor can affect their
attitude positively or negatively.

Scrutinize Foe

Level 4 Divination (Cleric, Investigator, Necromancer,
Wizard)
Casting Time: Bonus Action
Range: 60 feet
Components: V, S
Duration: Instantaneous

You discern minute details concerning one creature you
can see within range. You learn two of the following
pieces of information of your choice about the target: its
Armor Class, Speeds, Immunities (if any), Resistances
(if any), highest ability score, lowest ability score, and
enchantments (which reveals which spells, if any, are
currently affecting the target). The GM must share with
you the chosen information.

Complete Investigator

Séance

Zero Gravity

Casting Time: 10 minutes
Range: Self
Components: V, S, M (a crystal ball, deck of tarot
cards, or ouija board, and incense worth 50+ GP)
Duration: 1 minute

Casting Time: Action
Range: 100 feet
Components: V, S, M (a lodestone and iron filings)
Duration: Concentration, up to 1 minute

Level 3 Necromancy (Investigator, Necromancer, Witch)

You and three or more willing creatures lock hands
to conjure a spirit from the afterlife to answer your
questions. Describe or name a creature that is familiar to
you. If the creature’s soul is free and willing, it manifests
as a ghostly specter. This spell fails if the spirit was the
target of this spell within the last 10 days.
Until the spell ends, you can ask up to three
questions of the specter. The specter knows only what it
knew in life, including the languages it knew. Answers
are usually brief, cryptic, or repetitive, and the specter is
under no compulsion to offer a truthful answer if you are
hostile to it or it recognizes you as an enemy. There is a
5% chance that this spell contacts the wrong spirit, one
which will answer questions untruthfully or ambiguously.

Transient Bulwark

Level 1 Abjuration (Investigator, Martyr, Wizard)
Casting Time: Action or Ritual
Range: Self
Components: V, S, M (a pearl worth 10+ GP, which
the spell consumes)
Duration: 8 hours

Level 4 Transmutation (Druid, Investigator, Sorcerer,
Wizard)

This spell creates a zero gravity environment within a
30-foot radius Sphere, centered on a point you can see
within range.
In a zero gravity environment, creatures and objects
hang in the air until they are moved. A creature in zero
gravity can move only by pushing or pulling against a
fixed object or surface within reach (such as a wall or a
ceiling), which allows it to move as if it were climbing.
Its Speed is otherwise 0. Once a creature or object is
set into motion, it can’t stop moving until it collides
with an obstacle. A creature automatically continues its
movement at the same speed at the start of each of its
turns, and an object set in motion moves with the same
speed each round after it was moved.
Creatures and objects in an area of zero gravity have
no weight, but still may require significant force to move.
When the spell ends, affected objects and creatures fall
downward.

A fragile, invisible shield protects you for the duration.
The next attack roll against you has a −10 penalty to hit,
and the spell ends.

Mage Hand Press

21

New Magic Items

Investigators, monster-hunters, and other adventurers
may find the following magic items life-saving. Magic
items are presented in alphabetical order.

Aura Lenses

Wondrous items, Uncommon (Incomplete) or
Rare (Complete)
A set of these large glass lenses is contained in a single
cylindrical case. Each is four inches across, tinted in a
different hue, and associated with a particular school of
magic, as shown on the following table. When you hold
a lens up to your eye and look through it as a Bonus
Action, the world appears to be tinted in the lens’s
color, except for creatures and objects that are under
the effect of a spell from the lens’s associated school of
magic, which appear normally colored. A complete set
of Aura Lenses contains 8 lenses, each associated with a
school of magic, but most are found as an incomplete set,
containing only 1d8 of them.

22

School of Magic

Spells

Abjuration

White

Conjuration

Blue

Divination

Yellow

Enchantment

Pink

Evocation

Red

Illusion

Purple

Necromancy

Grey

Transmutation

Green

Crimson Compass

Wondrous Item, Uncommon
As a Magic action, you can insert a drop of blood into
the face of this compass, which orients itself as a needle.
The needle points to the creature to whom the blood
belongs if it is alive and on the same plane of existence.
Otherwise, the needle swings wildly. The compass can’t
locate a creature under the effects of the Nondetection
spell. You can remove the blood from the compass as a
Magic action.

Encyclopedia Sanguine
Wondrous Item, Uncommon

This book catalogs many hundreds of bloody ink blots.
While holding the book, you can cast Blood Print from
it. If you consult the book as a Magic action, you can
determine the following about any such print: the specific
kind of creature to which the blood belongs (such as a
human or a unicorn), its approximate age, sex, and its
health (assessed as poor or healthy).

Fate Deck

Wondrous Item, Very Rare
This box of cards is interwoven with the threads of fate.
A full deck contains a set of 52 playing cards, but other
variations exist, including those with different numbers of
cards and sets of dice.
Playing any game with the deck casts Game of Fate
(DC 17) from it. The deck can’t cast this spell again until
the next dawn.

Complete Investigator

Grimoire Monstrum

Wondrous Item, Uncommon (Requires Attunement)
While holding this book of myths and monsters, you have
Advantage on Intelligence checks you make related to
monsters, spells, or secret or ancient lore.

Dire Diary

Wondrous Item, Rare (Requires Attunement)
This diary contains 50 yellowed pages. When you
attune to it, you find that the pages contain your own
handwriting about events yet to come. No other creature
can thereafter attune to the diary. You can use the journal
to cast Dire Warning from it, filling one page of the diary
with a message from the future of up to 50 words. The
message may consist of a sketch or diagram, instead of
writing, and is usually vague or cryptic in order to avoid
paradoxes. The diary can’t cast this spell again for 7 days.

Weapon Charms

Wondrous Item, Varies (Requires Attunement)
A Weapon Charm is a small ornament fixed on a loop of
string or chain. You can take a Magic action to attach the
charm to a weapon, usually on the weapon’s pommel, or
remove it from one. Attaching a charm causes the weapon
to become a magic weapon that requires attunement. If
the weapon is already magical, you must attune to it again
to gain the charm’s magical benefits, which are listed in
the charm’s description. A weapon can only have one
attached charm at a time.
Arrowhead (Uncommon). This golden charm depicts
a stone arrowhead. While attached to a weapon, your
ranged attacks using it ignore Half Cover and ThreeQuarters Cover.
Bat (Common). This obsidian charm resembles a
shrieking bat. While attached to a weapon, it can deal
your choice of Necrotic damage or its normal damage
type. When you deal damage to a creature with this
weapon, the target’s Hit Point maximum is reduced by an
amount equal to the Necrotic damage it took. The creature
dies if this effect reduces its Hit Point maximum to 0.
Blade (Uncommon +1, Rare +2, Very Rare +3). This
adamantine charm resembles a miniature longsword.
While attached to a weapon, you have a bonus to attack
and damage rolls made with this magic weapon. The
bonus is determined by the battery’s rarity. If the weapon
already gains such a bonus, like a +2 Longsword, you
choose which bonus to use; you can’t use more than one.
Die (Uncommon). This silver charm depicts a sixsided die. While attached to a weapon, it deals more
potent critical hits. When you score a Critical Hit with
this weapon, if you roll the highest number on any
damage die, you can roll another of that die and add it
to the damage. You can add a maximum of 10 dice to the
attack’s damage roll in this way.

Mage Hand Press

Flame (Rare). This brass charm resembles a burning
fire. While attached to a weapon, it deals Fire damage
instead of its normal damage type. When you hit a
creature or object with this weapon, it begins Burning
for 1 minute. If you hit a burning target again with this
weapon, the damage the burning target takes at the start
of each of its turns increases by one step (d4 → d6 → d8 →
d10 → d12, to a maximum of 1d12).
Ghost (Common). This crystal charm is carved into
the shape of a wispy spirit. While attached to a weapon, it
can affect creatures on the Ethereal Plane as if they were
on the Material Plane, and vice versa.
Hook (Common). This bronze charm is shaped like a
fishing hook. While attached to a weapon, if the weapon
is on the same plane of existence as yourself, you can take
a Bonus Action to teleport it to your hand.
Lance (Uncommon). This copper charm depicts a
short lance. While attached to a weapon, once on each of
your turns when you make a melee attack roll with this
weapon against a creature you can see, you can lunge up
to 15 feet toward your target before making the attack.
This movement doesn’t provoke Opportunity Attacks.
You can perform this movement even if it causes you to
travel through the air, though you fall after making the
attack if you have nothing holding you aloft.
Lightning Bolt (Rare). This mithral charm depicts a
wild lightning bolt. While attached to a weapon, it deals
Lightning damage instead of its normal damage type and
deals an extra 1d6 Lightning damage on a hit.
Mirror (Rare). This shiny platinum charm depicts an
elegant hand mirror. This charm can only be attached to
a weapon with the Light property. While attached, when
you draw the weapon, a spectral duplicate of the weapon
appears in your other hand. This spectral duplicate has
identical statistics to the original weapon, including its
magical effects, but doesn’t include ammunition. When
the attached weapon or its spectral duplicate leaves your
hand, the duplicate vanishes.
Prism (Uncommon). This glass charm is a perfect
triangular prism. When you attune to this weapon,
choose Acid, Cold, Fire, Lightning, Poison, or Thunder
damage. The weapon can deal the chosen damage type or
the weapon’s normal damage type (your choice).
Quiver (Uncommon). This quartz charm resembles a
quiver bristling with arrows. While attached to a weapon,
it ignores the Loading property. Ammunition you are
carrying teleports into the weapon when needed.
Rock (Uncommon). This iron charm looks like a
shiny pebble. While attached to a weapon, the weapon
gains the Sap mastery property in addition to its normal
mastery property. You can only use one mastery property
on each attack. You can use the Sap property even if you
don’t have the Weapon Mastery feature, and it doesn’t
count against the number of weapons you can use with
that feature.

23

Producers
That Guy
Random Muffin
Ben Fogle
Billy Votta
DemolitionDX
Donelloth
man not
Mkscorpio89
Laura Chrismon
Tyler Kohlman
Chase Harris
Blayne Wilson
Kabe-kun
Austin Kavanagh
Shaun Sullivan
Zeke DeLeon
Suzuki
Anvil

Hayley Nichols
Trey Steele
TheProteanGeek
GayCowboy
Jesse Smith
Sean Daugherty
Kevin Reynolds
Liam Jones
BillOneEye
Jesse Rosen
BadChilii
Jacob Otwell
Treix Nyte
lungfishwarrior
Zee Xorn
Trivik
Darion Nutter
D Miranda

Joel Grote
Patrick Rooney
PucThePlayful
Mike Litkewitsch
George Tolley
Michael Davis
Kura Tenshi
Graeme Disley
Joseph Blanc
Ryan MacDonald
Pandric
Kat Woehlert
Attackins
DJ
Eike Schultz
Marc-Antoine Côté
