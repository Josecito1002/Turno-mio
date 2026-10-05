# Encargo: Lote 30a (Investigator, clase) de la app "Mi turno"

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
La clase **Investigator** completa: rasgos de nivel 1 a 20, tabla de progresión (Ritual Level, Rushed Incantation, Finisher, Trinkets) y los datos básicos (dado de golpe, salvaciones, habilidades, competencias, equipo inicial). Incluye cómo funciona el grimorio y los rituales. No incluyas las subclases ni los conjuros (van en otros lotes).

## Formato de la respuesta
=== A ===
TypeScript: `export const INVESTIGATOR_2024 = { n, dado, sv, habN, habs, arm, armas, equipo, rasgos: [...] }` con la misma forma que PSION_2025 de la app (dado de golpe, salvaciones, habilidades a elegir, competencias, rasgos con su nivel `n`, `t`, `texto`).
=== B ===
JSON de lo que se calcula: tabla por nivel (Ritual Level, Rushed Incantation, Finisher, Trinkets), usos con su reinicio y cuántos conjuros/rituales caben en el grimorio.
=== C ===
JSON `{ "investigator": "Investigator (Mage Hand Press, 2024)" }`.
=== D ===
JSON `{ "investigator": "1 o 2 frases que presenten la clase" }`.
=== E ===
Dudas o [NO CONFIRMADO].

## Texto fuente (Investigator, Mage Hand Press, 2024)

(Las páginas 7 y 8 traen al final la lista de conjuros del Investigator: ignórala aquí, va en el lote 30d.)

Investigator
Core Investigator Traits
Primary Ability

Dexterity and Intelligence

Hit Point Die

D8 per Investigator level

Saving Throw
Proficiencies

Dexterity and Intelligence

Skill Proficiencies

Choose 3: Arcana, Athletics,
Deception, History, Insight,
Intimidation, Investigation,
Medicine, Nature,
Perception, Persuasion,
Stealth, Sleight of Hand, and
Religion

Weapon Proficiencies Simple and Martial weapons
Armor Training

Light armor

Starting Equipment

Choose A or B: (A) Leather
Armor, 2 Daggers, Rapier,
Heavy Crossbow, 20 Bolts,
Crossbow Bolt Case,
Dungeoneer’s Pack, and 17
GP; or (B) 120 GP

Exorcists and Occultists
To give themselves an edge against supernatural threats,
Investigators dabble in forbidden magic themselves.
Prepared Investigators keep a well-stocked grimoire
of rituals, incantations, and notes on the powers and
weaknesses of monsters—everything needed to level
the playing field. Even so, an Investigator’s occupation is
perilous. A grimoire might spell out a vampire’s fear of
sunlight and aversion to silver, but it does little to hinder
their fangs.

Becoming an Investigator…
As a Level 1 Character

• Gain all the traits in the Core Investigator Traits table.
• Gain the Investigator’s level 1 features, which are listed
in the Investigator Features table.

As a Multiclass Character

• Gain the following traits from the Core Investigator
Traits table: Hit Point Die, proficiency in one skill
of your choice from the Investigator’s skill list,
proficiency with Martial Weapons, and training with
Light Armor.
• Gain the Investigator’s level 1 features, which are listed
in the Investigator Features table

Supernatural detectives and monster slayers, Investigators
are always on the hunt for malevolent outsiders.
Whenever evil seeps into the world—be it Fiends,
Undead, or strange Aberrations from beyond the stars—
Investigators will be the first to locate them and banish
their foul corruption from the mortal plane.

Paranormal Investigators
There are forces more ancient than time, foes more
sinister than the foulest men, and beings more titanic
than gods. Investigators risk their lives and psyches to
protect the world from supernatural threats, unraveling
the mysteries of one werewolf or demonic cult at a time.
Their investigations are never ending, for victory only
delays doomsday another night.

Mage Hand Press

3

Investigator Features
Level

Proficiency
Bonus
Features

Rushed
Incantation

Finisher

Trinkets

1

+2

Ritualist, Weapon Mastery

1

—

—

—

2

+2

Expertise, Finisher, Rushed Incantation

1

3

1d8

—

3

+2

Investigator Subclass, Trinkets

2

4

1d8

2

4

+2

Ability Score Improvement

2

4

1d8

2

5

+3

Exploit Weakness

3

5

1d8

3

6

+3

Subclass feature

3

5

1d8

3

7

+3

Holy Trinkets

4

6

1d8

3

8

+3

Ability Score Improvement

4

6

1d8

3

9

+4

Expertise

5

7

1d8

4

10

+4

Subclass feature

5

7

1d8

4

11

+4

Improved Finisher

6

7

2d8

4

12

+4

Ability Score Improvement

6

8

2d8

4

13

+5

Enigma Arcane

6

8

2d8

5

14

+5

Subclass feature

6

8

2d8

5

15

+5

Enigma Arcane

6

9

2d8

5

16

+5

Ability Score Improvement

6

9

2d8

5

17

+6

Enigma Arcane, Improved Finisher

6

9

3d8

6

18

+6

Supernatural Resolve

6

10

3d8

6

19

+6

Epic Boon

6

10

3d8

6

20

+6

Spellbinder

6

10

3d8

6

Investigator Class Features
As an Investigator, you gain the following class features
when you reach the specified Investigator levels. These
features are listed in the Investigator Features table.

Level 1: Ritualist

You have learned to cast Rituals to overcome
supernatural threats.
Grimoire. Your Rituals are recorded in a grimoire, a
Tiny object that weighs 3 pounds and contains 100 pages.
You determine the grimoire’s appearance and materials.
The grimoire starts with four level 1 Investigator
spells of your choice. Detect Magic, Heroism, Memorize,
and Transient Bulwark are recommended.
Whenever you gain an Investigator level, you can add
two Investigator spells of your choice to your grimoire. The
Ritual Level column on the Investigator Feature table shows
the maximum level of a spell you can add to your grimoire.
Ritual Casting. You can cast any spell as a Ritual if that
spell has the Ritual tag and the spell is in your grimoire.
You must read from the book to cast a spell in this way.
You can’t cast spells that are in your grimoire except as
Rituals, unless you’ve learned them by other means.

4

Ritual
Level

Expanding and Replacing a Grimoire
The spells you add to your grimoire represent
research into occult and supernatural threats, but you
might find other spells during your adventures that
you can add to your grimoire.
Copying a Spell into the Grimoire. When you
find a level 1+ Investigator spell, you can copy it
into your grimoire if it’s of an eligible level and if you
have time to copy it. For each level of the spell, the
transcription takes 2 hours and costs 50 GP.
Copying the Grimoire. You can copy a spell
from your grimoire into another book. This is like
copying a new spell into your grimoire but faster,
since you already know how to cast the spell. You
need spend only 1 hour and 10 GP for each level of
the copied spell.
If you lose your grimoire, you can recall from
memory a number of spells equal to your Investigator
level and use the same procedure to transcribe the
spells into a new grimoire. Filling out the remainder
of the new book requires you to find new spells to
do so. For this reason, many Investigators keep a
backup grimoire.

Complete Investigator

Bonus Rituals. You can treat specific spells as if
they have the Ritual tag, allowing you to add them to
your grimoire and cast them as Rituals. These spells are
marked in the Investigator Spells list.
Spellcasting Ability. Intelligence is your spellcasting
ability for your Investigator spells.

Level 1: Weapon Mastery

Your training with weapons allows you to use the
mastery properties of two kinds of weapons of your
choice with which you have proficiency, such as Rapiers
and Heavy Crossbows.
Whenever you finish a Long Rest, you can change the
kinds of weapons you chose.

Level 2: Expertise

Level 4: Ability
Score Improvement

Level 2: Finisher

Level 5: Exploit Weakness

You gain Expertise in two of your skill proficiencies of
your choice. Arcana and Investigation are recommended
if you have proficiency in them.
At Investigator level 9, you gain Expertise in two
more of your skill proficiencies of your choice.
Once per turn when you deal damage with a weapon to
a creature that is Bloodied, you can deal an extra 1d8
damage to the target. The damage is the same type as the
damage dealt by the weapon.
This damage increases as you gain Investigator levels,
as shown in the Finisher column of the Investigator
Features table.

Level 2: Rushed Incantation

You can hastily perform any spell in your grimoire that
has a casting time of an action or Bonus Action, casting
the spell as a Bonus Action. You can cast it without
Material components unless the components have a cost
of 100+ GP specified by the spell.
You can use this feature three times. You regain one
of its expended uses when you finish a Short Rest, and
you regain all expended uses when you finish a Long
Rest. You gain additional uses when you reach certain
Investigator levels, as shown in the Rushed Incantation
column of the Investigator Features table.

Level 3: Investigator Subclass

You gain an Investigator subclass of your choice. A
subclass is a specialization that grants you features at
certain Investigator levels. For the rest of your career,
you gain each of your subclass’s features that are of your
Investigator level or lower.

Level 3: Trinkets

Your subclass grants you a number of supernatural
trinkets to aid you in defeating supernatural threats and
unraveling mysteries. You can use this feature twice,
activating one of your trinket options each time you use
it. You regain one of its expended uses when you finish a
Short Rest, and you regain all expended uses when you
finish a Long Rest. You gain additional uses when you
reach certain Investigator levels, as shown in the Trinkets
column of the Investigator Features table.

Mage Hand Press

You gain the Ability Score
Improvement feat or another feat of
your choice for which you qualify. You
gain this feature again at Investigator
levels 8, 12, and 16.
Once per turn when you deal damage to a creature with
an attack using a weapon, you can target the creature
where it is most vulnerable to gain the following benefits.
Damage Vulnerability. Choose one damage type
dealt by the attack. The target has Vulnerability to the
chosen damage type for this attack. Vulnerability from
this feature doesn’t double extra damage from spells (such
as Hunter’s Mark) or features from other classes (such as
the Rogue’s Sneak Attack). The Vulnerability doesn’t apply
to this attack if the target has Immunity to the chosen
damage type.
Disrupt Resistance. If the target has Resistance to
one or more damage types, it loses these Resistances until
the start of your next turn, including against the damage
of the triggering attack.

Level 7: Holy Trinkets

You keep a wide array of Holy Symbols and blessed items
on your person, even if you aren’t particularly pious. You
can use the following trinkets (expending a use of your
Trinkets to do so).
Amulet of Warding. As a Bonus Action, you place a
divine ward on a creature of your choice within 60 feet of
you. Until the start of your next turn, the warded creature
gains a bonus to AC and saving throws equal to your
Intelligence modifier (minimum of +1).
Restorative Ankh. As a Bonus Action, a creature of
your choice within 60 feet of you regains Hit Points equal
to your Investigator level plus your Intelligence modifier.
Rune of Banishment. As a Bonus Action, choose one
creature you can see within 60 feet of you. The creature
must succeed on a Charisma saving throw against your
spell save DC or be banished to a harmless location in
the Ethereal Plane. While banished, the target has the
Incapacitated condition and its Speed is 0. At the start
of your next turn, the creature reappears in the space it
left or in the nearest unoccupied space if that space is
occupied.

5

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
