# Encargo: Lote 25a (subclases de playtest 2026: Mystic y Villainous) de la app "Mi turno"

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

## Qué se pide
Solo estas 8 subclases: **Oath of the Spellguard (Paladin)** y **Magic Stealer (Rogue)** del documento Mystic Subclasses (ignora Warrior of the Mystic Arts y Vestige Patron: ya están en la app); **Circle of the Titan (Druid)**, **Hell Knight (Fighter)** y **Demonic Sorcery (Sorcerer)** de Villainous Options Update (versión revisada, la más reciente); y **Path of Lament (Barbarian)**, **Warrior of Venom (Monk)** y **Primordial Patron (Warlock)** de Villainous Options 2. No incluyas las dotes (van en otro lote).

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

### Documento: Mystic Subclasses (2026)

UNEARTHED ARCANA 2026
MYSTIC SUBCLASSES
This playtest document is part of a series of
Unearthed Arcana articles that present material
designed for upcoming products. The material here
uses the rules in the 2024 Player’s Handbook.

WHAT’S INSIDE
This document presents four new subclasses:
• Monk (Warrior of the Mystic Arts)
• Paladin (Oath of the Spellguard)
• Rogue (Magic Stealer)
• Warlock (Vestige Patron)

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
use a short adventure from a source like Dragon
Delves.
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

WARRIOR OF THE MYSTIC ARTS (MONK)
Weave Martial and Mystic Arts
Warriors of the Mystic Arts wield magic to
supplement their martial skill. They harness their
supernatural focus to enhance their magical and
physical abilities.

LEVEL 3: SPELLCASTING
You have learned to cast spells. See the Player’s
Handbook for the rules on spellcasting. The
information below details how you use those rules
as a Warrior of the Mystic Arts.
Cantrips. You know two cantrips of your choice
from the Sorcerer spell list. Blade Ward and
Thunderclap are recommended. Whenever you gain
a Monk level, you can replace one of these cantrips
with another cantrip of your choice from the
Sorcerer spell list.
When you reach Monk level 10, you learn another
Sorcerer cantrip of your choice.
Spell Slots. The Warrior of the Mystic Arts
Spellcasting table shows how many spell slots you
have to cast your level 1+ spells. You regain all
expended slots when you finish a Long Rest.

WARRIOR OF THE MYSTIC ARTS SPELLCASTING
Monk
Level
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20

Prepared
Spells
3
4
4
4
5
6
6
7
8
8
9
10
10
11
11
11
12
13

—Spell Slots per Spell Level—
1
2
3
4
2
—
—
—
3
—
—
—
3
—
—
—
3
—
—
—
4
2
—
—
4
2
—
—
4
2
—
—
4
3
—
—
4
3
—
—
4
3
—
—
4
3
2
—
4
3
2
—
4
3
2
—
4
3
3
—
4
3
3
—
4
3
3
—
4
3
3
1
4
3
3
1

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

1

Prepared Spells of Level 1+. You prepare the list
of level 1+ spells that are available for you to cast
with this feature. To start, choose three level 1 spells
from the Sorcerer spell list. Jump, Magic Missile, and
Shield are recommended.
The number of spells on your list increases as you
gain Monk levels, as shown in the Prepared Spells
column of the Warrior of the Mystic Arts Spellcasting
table. Whenever that number increases, choose
additional spells from the Sorcerer spell list until the
number of spells on your list matches the number on
the table. The chosen spells must be of a level for
which you have spell slots. For example, if you’re a
level 7 Monk, your list of prepared spells can include
five Sorcerer spells of levels 1 and 2 in any
combination.
Changing Your Prepared Spells. Whenever you
gain a Monk level, you can replace one spell on your
list with another Sorcerer spell for which you have
spell slots.
Spellcasting Ability. Wisdom is your spellcasting
ability for your Sorcerer spells.
Spellcasting Focus. You can use an Arcane Focus
as a Spellcasting Focus for your Sorcerer spells.
Multiclassing. If you multiclass and have the
Spellcasting feature from more than one class, add
one third of your Monk levels (round down) to
determine your available spell slots.

LEVEL 6: MYSTIC FIGHTING STYLE
When you take the Attack action on your turn, you
can replace one of the attacks with a casting of one
of your Sorcerer cantrips that has a casting time of
an action.

LEVEL 11: CENTERED FOCUS
Whenever you expend a Focus Point to use Flurry of
Blows, Patient Defense, or Step of the Wind, you
have Advantage on any saving throw you make to
maintain Concentration until the start of your next
turn.

LEVEL 17: IMPROVED MYSTIC FIGHTING STYLE
When you take the Attack action on your turn, you
can replace two of the attacks with a casting of one
of your level 1 or 2 Sorcerer spells that has a casting
time of an action.

LEVEL 6: MYSTIC FOCUS
You keep your magical power and martial focus in
perfect balance, allowing you to convert spell slots
into Focus Points, or convert Focus Points into spell
slots.
Converting Spell Slots to Focus Points. You can
expend a spell slot to regain a number of expended
Focus Points equal to the slot’s level (no action
required).
Recovering Spell Slots. As a Bonus Action, you can
transform unexpended Focus Points to recover one
expended spell slot. The Recovering Spell Slots table
shows the cost of recovering a spell slot of a given
level, and it lists the minimum Monk level you must
be to recover a slot. You can recover a spell slot no
higher than level 4.

RECOVERING SPELL SLOTS
Spell Slot
Level
1
2
3
4

Focus Point Cost
2
3
5
6

Min. Monk
Level
6
7
13
19

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

2

OATH OF THE SPELLGUARD (PALADIN)
Protect Your Allies from Villainous Magic
Paladins who take the Oath of the Spellguard are
sworn to battle those who use magic to harm others.
They often serve as bodyguards to upstanding
mages, but their most important role is protecting
allies from devastating magical attacks. Those who
swear this oath ensure that villains who misuse
magic are brought to justice.
These paladins share the following tenets:
• Protect the innocent from wicked mages.
• Prevent magic from falling into villains’ hands.
• Protect mages who use magic honorably.

LEVEL 3: GUARDIAN BOND
As a Magic Action, you can expend one use of your
Channel Divinity to forge a divine bond with a
willing creature within 5 feet of yourself. The bond
lasts for 1 hour or until you have the Unconscious
condition. For the duration, while the bonded
creature is within your reach and is hit by an attack
roll, you can take a Reaction to add your Charisma
modifier (minimum of +1) to that creature’s AC,
possibly causing the attack to miss.
You can end your divine bond at any time (no
action required). If you already have a divine bond
when you forge a new one, the previous bond ends.

LEVEL 7: AURA OF CONCENTRATION
Your aura of protection fosters mental focus. You
and your allies have Advantage on Constitution
saving throws to maintain Concentration while in
your Aura of Protection.

LEVEL 15: SPELL-BREAKING BLADE
Immediately after you hit a creature with your
Spellguard Strike, you can cast Counterspell as part
of the same Reaction.
When you cast Counterspell with a spell slot, that
slot isn’t expended if the spell fails to stop a spell.

LEVEL 20: ETERNAL SPELLGUARD
As a Bonus Action, you can empower your Aura of
Protection, granting the benefits below for 1 minute
or until you end them (no action required). Once you
use this feature, you can’t use it again until you finish
a Long Rest. You can restore your use of this ability
by expending a level 5 spell slot (no action required).
Bodyguard. While the target of your Guardian
Bond is in the aura, that creature has Resistance to
all damage.
Protection from Magic. You and your allies in the
aura have Advantage on saving throws against
spells.
Spell Ward. Spell attack rolls against you and your
allies in the aura have Disadvantage.

LEVEL 3: OATH OF THE SPELLGUARD SPELLS
The magic of your oath ensures you always have
certain spells ready; when you reach a Paladin level
specified in the Oath of the Spellguard Spells table,
you thereafter always have the listed spells
prepared.

OATH OF THE SPELLGUARD SPELLS
Paladin Level
3
5
9
13
17

Spells
Detect Magic, Shield
See Invisibility, Silence
Counterspell, Dispel Magic
Freedom of Movement, Otiluke’s
Resilient Sphere
Circle of Power, Hallow

LEVEL 3: SPELLGUARD STRIKE
When you see a creature within your reach casting a
spell with Verbal, Somatic, or Material components,
you can take a Reaction to make a melee attack with
a weapon or an Unarmed Strike against that
creature.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

3

MAGIC STEALER (ROGUE)
Steal Magical Power to Empower Yourself
While ordinary thieves are cutting purses and
burgling homes, a Magic Stealer is after a much more
valuable prize: magic. The Magic Stealer preys on
spellcasters, repurposing their magic and eluding
divination spells to take magical power at the point
of a knife.

LEVEL 3: EMPOWER SNEAK ATTACK
Immediately after a creature you can see within 30
feet of you casts a level 1+ spell, you can take a
Reaction to absorb magical energy from the spell.
When you do so, until the end of your next turn, the
next time you hit with your Sneak Attack you deal
extra Force damage. To determine the extra damage,
roll a number of d6s equal to the spell’s level, and
add them together.
You can take this Reaction a number of times
equal to your Intelligence modifier (minimum of
once), and you regain all expended uses when you
finish a Long Rest.

LEVEL 13: OCCULT SHROUD
Whenever you finish a Long Rest, you can cast the
Nondetection spell, using Intelligence as your
spellcasting ability. When you do so, you can target
only yourself, and the duration increases to 24
hours.

LEVEL 13: IMPROVED DRAIN MAGIC
You can now use Drain Magic as a Bonus Action. In
addition, when you use Drain Magic, you can end one
ongoing level 1, level 2, or level 3 spell on the target,
and the target recovers one expended spell slot of
level 3 or lower (the target’s choice).

LEVEL 17: ELDRITCH IMPLOSION
When you use Empower Sneak Attack, you can force
the target to make a Constitution saving throw (DC 8
plus your Dexterity modifier and Proficiency Bonus).
On a failed save, the spell dissipates with no effect,
and the target has the Stunned condition until the
start of its next turn.

LEVEL 3: DRAIN MAGIC
You can drain power from ongoing spells to recharge
your allies’ magic. As a Magic Action, you can touch a
willing creature and end one ongoing level 1 or level
2 spell on it; the creature immediately recovers one
expended spell slot of level 2 or lower (the target’s
choice).
Once you use this feature, you can’t do so again
until you finish a Short or Long Rest.

LEVEL 9: MAGICAL SABOTAGE
You gain the following Cunning Strike options.
Spell Susceptibility (Cost: 2d6). The target has
Disadvantage on the next saving throw it makes
against a spell until the start of your next turn.
Disrupt Spell (Cost: 3d6). The target’s magical
acuity is disrupted until the start of your next turn.
Whenever the target casts a spell during that time, it
must succeed on an Intelligence saving throw or the
spell dissipates with no effect, and the action, Bonus
Action, or Reaction used to cast it is wasted. If that
spell was cast with a spell slot, the slot isn’t
expended.
Steal Resistance (Cost: 2d6). Choose one kind of
damage. If the target has Resistance to that kind of
damage, until the start of your next turn, the target
loses that Resistance and you gain Resistance to that
damage type.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

4

VESTIGE PATRON (WARLOCK)
Wield the Remnants of a Dying God’s Power
Your pact draws on the power of a dying god, a being
once worshipped by countless followers but now
abandoned and forgotten. This dying god, known as
a vestige, might have been benevolent, evil, or
strange and unknowable, but now it is driven to
regain its former power. The vestige needs your help
it is willing to share its remaining strength with you.

LEVEL 3: VESTIGE COMPANION
The vestige manifests, aiding you to do so and
drawing strength from your pact. It uses the Vestige
Companion stat block and is a Celestial, Fiend, or
Undead (choose when you gain this feature). You
determine what the vestige looks like, but regardless
of its form, the vestige bears features indicating its
supernatural origin. For example, you might decide
your vestige is an oversize floating skull etched with
sigils, a circle of glowing runes, or a constantly
shifting abstract shape. The vestige is Friendly to
you and your allies and obeys your commands. It
vanishes if you die.
The Vestige in Combat. In combat, the vestige
acts during your turn. It can move and use its
Reaction on its own, but the only action it takes is
the Dodge action unless you take a Bonus Action to
command it to take an action in its stat block or
some other action. You can also sacrifice one of your
attacks when you take the Attack action to command
the vestige to take the Vestige’s Strike action. If you
have the Incapacitated condition, the vestige acts on
its own and isn’t limited to the Dodge action.
Disappearance of the Vestige. When the vestige
drops to 0 Hit Points, it disappears. You can spend 1
minute performing a magic ceremony to manifest
the vestige again; it reappears with its maximum Hit
Points in an unoccupied space within 5 feet of you.
As a Magic action, you can temporarily dismiss the
vestige to a pocket dimension. As a Magic action
while it is temporarily dismissed, you can cause the
vestige to reappear in an unoccupied space within
30 feet of you. Whenever the vestige drops to 0 Hit
Points or disappears into the pocket dimension, it
leaves behind in its space anything it was wearing or
carrying.
Whenever you finish a Long Rest, you can
summon the vestige in a new form, which appears in
an unoccupied space within 5 feet of you. You
choose its appearance and whether it is a Celestial,
Fiend, or Undead. If the vestige is already manifested
from this feature, its form changes to the new one.

VESTIGE COMPANION
Small Celestial, Fiend, or Undead; Neutral
AC 13 + your Charisma modifier
HP 4 + four times your Warlock level (the vestige has a
number of Hit Dice [d6s] equal to your Warlock level)
Speed 5 Ft., Fly 30 ft. (hover)
MOD

SAVE

MOD

SAVE

MOD

SAVE

STR 1
−5 −5 DEX 14 +2 +2 CON 10 +0
INT 15 +2 +2 WIS 15 +2 +2 CHA 16 +3
Resistances Fire (Fiend only), Necrotic (Undead only),
Radiant (Celestial only)
Immunities Charmed, Frightened, Prone
Senses Darkvision 60 ft.; Passive Perception 11
Languages Speaks the languages you know
CR None (XP 0; PB equals your Proficiency Bonus)

+0
+3

TRAITS
Pact Bond. Add your Proficiency Bonus to any ability
check or saving throw the vestige makes.

ACTIONS
Vestige’s Strike. Melee or Ranged Attack Roll: Bonus
equals your spell attack modifier, reach 5 ft. or range 60
ft. Hit: 1d6 + 3 plus your Charisma modifier Fire (Fiend),
Necrotic (Undead), or Radiant (Celestial) damage.

BONUS ACTIONS
Divine Power (1/Day). Your vestige manifests a remnant
of its divine power in one of the following ways, based on
its form:
Cursed Invocation (Undead Only). The vestige places a
curse on a creature you can see within 30 feet of the
vestige for 1 minute. While cursed, the target has
Disadvantage on attack rolls against you and the
vestige.
Fiendish Swap (Fiend Only). If you and the vestige are
within 60 feet of each other, you both teleport,
swapping places.
Healing Touch (Celestial Only). The vestige touches
another creature. The target regains Hit Points equal to
2d8 plus your Charisma modifier and ends one
condition on it: Blinded, Deafened, or Poisoned.

LEVEL 3: VESTIGE SPELLS
The magic of your Vestige Companion ensures you
always have certain spells ready. Select one of the
following Cleric Domains: Life, Light, Trickery, or
War. The Domain Spells of your chosen Domain are
Warlock spells for you. When you reach a Warlock
level equal to a Cleric Level listed on the Domain
Spells table for the Domain you have chosen, you
thereafter always have the listed spells prepared.
For example, if you chose the War Domain for this
feature, when you reach Warlock level 3, you would
have the Guiding Bolt, Magic Weapon, Shield of Faith,
and Spiritual Weapon spells prepared.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

5

LEVEL 6: VESTIGE RECOVERY
Your Vestige Companion now regains its use of
Divine Power whenever you finish a Short or Long
Rest or when you use your Magical Cunning feature.

LEVEL 10: AURA OF POWER
Your Vestige Companion increases in magical
strength. As a Magic Action, you can cause the
vestige to manifest an aura in a 30-foot Emanation
that originates from the vestige. The aura lasts a
number of hours equal to your Charisma modifier or
until the vestige disappears or is temporarily
dismissed. You, the vestige, and your allies within
the aura gain Resistance to Fire, Necrotic, and
Radiant damage and have Immunity to the Charmed
and Frightened conditions. Once you manifest this
aura, you can’t do so again until you finish a Long
Rest.
In addition, when you drop to 0 Hit Points while
within the aura, you instead change your Hit Points
to a number equal to your Warlock level plus your
Charisma modifier. The vestige is then dismissed
into a pocket dimension and can’t return until you
finish a Long Rest.

LEVEL 14: SEMBLANCE OF LIFE
Your Vestige Companion continues to grow in
strength, and with your assistance, it can briefly
adopt a more powerful form. Depending on the
vestige’s type, you can cast one of the following
spells while the vestige is within 90 feet of you
without expending a spell slot or needing Material
components: Summon Celestial (Celestial vestige),
Summon Fiend (Fiend vestige), or Summon Undead
(Undead vestige). When you cast the spell with this
feature, the vestige becomes the summoned
creature. Its game statistics are replaced by the
summoned creature’s stat block, the spell’s level is
equal to half your Warlock level (round down;
maximum level 9), and the spell’s duration is 1
minute. When the spell ends, the vestige returns to
its previous form.
Once you have cast the spell in this way, you can’t
do so again until you finish a Long Rest.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

6



### Documento: Villainous Options Update (2026)

UNEARTHED ARCANA 2026

VILLAINOUS OPTIONS UPDATE
This playtest document is part of a series of
Unearthed Arcana articles that present material
designed for upcoming products. The material here
uses the rules in the Player’s Handbook.

SUBCLASSES

WHAT’S INSIDE

CIRCLE OF THE TITAN (DRUID)

This document presents revised versions of these
three subclasses, incorporating player feedback
from the initial playtest in which they appeared:

Wreak Colossal Havoc

This section presents the following subclasses: Circle
of the Titan, Hell Knight, and Demonic Sorcery.

This document also includes Origin feats and Epic
Boon feats.

When civilization violates the natural world—by
deforesting ancient groves, polluting sacred waters,
or hunting wildlife to the brink of extinction—
Druids of the Circle of the Titan intervene. Druids of
this order believe that for nature to thrive, society
must sometimes fall. To this end, they assume
towering, monstrous forms to mete out cataclysmic
retribution and forcibly restore the natural order.

CONTENT WARNING

LEVEL 3: CIRCLE OF THE TITAN SPELLS

• Druid (Circle of the Titan)
• Fighter (Hell Knight)
• Sorcerer (Demonic Sorcery)

This material contains descriptions of body horror,
disease, and insects that some readers might find
disturbing.

THIS IS PLAYTEST MATERIAL
This article is presented for playtesting and feedback.
The options here are experimental and in draft form.
They aren’t officially part of the game. Your feedback
will help determine whether we adopt them as official.
How to Playtest This UA. We invite you to try out
this material in play. To play with this material, you
may either incorporate it into your campaign or run
one or more special playtest sessions. For such a
session, you may create an adventure of your own or
use a short adventure from a source like Dragon
Delves.
Power Level. The character options you read here
might be more or less powerful than options in the
Player’s Handbook. If a design survives playtesting, we
adjust its power to the desirable level before
publication. This means an option could be more or
less powerful in its final form.
Feedback. The best way for you to give us feedback
on this material is in the survey we’ll release on D&D
Beyond. If we make this material official, it will be
refined based on your feedback, and then it will appear
in a D&D book.
Providing feedback on this document is one way you
can help shape the future of D&D!

When you reach a Druid level specified in the Circle
of the Titan Spells table, you thereafter always have
the listed spells prepared.
In addition, you can cast the spells from this
feature while you’re in your Titan Form.

CIRCLE OF THE TITAN SPELLS
Druid Level
3
5
7
9

Prepared Spells
Enlarge/Reduce, Thaumaturgy,
Thunderwave
Fear
Fire Shield
Destructive Wave

LEVEL 3: TITAN FORM
When you use Wild Shape, you can adopt a Titan
Form, choosing from the Behemoth, Leviathan, and
Insectoid stat blocks presented later in this
subclass’s description. You can stay in a Titan Form
for 10 minutes, instead of a number of hours.
Each Titan Form gains additional benefits when
you reach the specified Druid Levels, as noted in its
respective stat block. Features that apply to your
Beast forms also apply to your Titan Form.
You determine what your Titan Form looks like.
Roll on or choose from the Titan Appearance table to
inspire aspects of your form’s appearance.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

1

TITAN APPEARANCE
1d4
1

3

Reptilian
tail

Leviathan
Manytentacled
Translucent
and bloblike
Lampreylike mouth

4

Furry and
simian

Serpentine
body

2

Behemoth
Reflective
scales
Multiple
heads

Insectoid
Iridescent wings
Compound eyes

Chitinous horns
Bioluminescent
exoskeleton

LEVEL 6: DIRE IMPACT
Your Titan Form brings greater devastation, gaining
the following benefits.
Elemental Rend. Whenever you hit with your
Titan Form’s Rend attack, you can cause it to deal
your choice of Acid, Cold, Fire, Lightning, or Thunder
damage rather than its normal damage type.
Shock Wave. Once per turn, immediately after you
move at least half your Speed, you can create a shock
wave in a 10-foot Emanation originating from you.
Each creature in the Emanation must succeed on a
Constitution saving throw against your spell save DC
or have the Prone condition.

LEVEL 10: PRIMAL HAVOC
The unbridled power of nature surges within you,
granting you the following benefits.
Huge Size. You can choose to become Huge when
assuming your Titan Form if you’re in a big enough
space.
Toughened Hide. Immediately after you assume a
Huge or larger Titan Form, you can expend a level 1+
spell slot. For the duration of the form, you gain a
bonus to your AC equal to half the expended spell
slot’s level (round up).
Above It All. While you are Huge or larger in your
Titan Form, Difficult Terrain caused by heavy snow,
ice, rubble, or undergrowth doesn’t cost you extra
movement.

LEVEL 14: MONSTROUS APPETITE
Your transformation embodies the vast size and
terror of nature’s titans. You gain the following
benefits.
Gargantuan Size. You can choose to become
Gargantuan when assuming your Titan Form if
you’re in a big enough space.
Grappling Rend. Once per turn, while you are
Huge or larger and hit a creature with your Titan
Form’s Rend attack, you can give the target the
Grappled condition (escape DC equals your spell
save DC). You can have only one target grappled in
this way at a time.

Swallow. As a Bonus Action while you are
Gargantuan, choose one Large or smaller creature
Grappled by you. The target makes a Strength saving
throw against your spell save DC. On a failure, you
swallow the target, and the Grappled condition ends
on it. A swallowed creature has the Blinded and
Restrained conditions, has Total Cover against
attacks and other effects outside of your stomach,
and takes Acid damage at the start of each of your
turns. To determine this damage, roll a number of
d12s equal to your Wisdom modifier.
The number of creatures you can have swallowed
at a time equals your Wisdom modifier (minimum of
one creature). You must maintain Concentration to
hold swallowed creatures in your stomach. If you
lose Concentration or leave your Titan Form, you
regurgitate all swallowed creatures, each of which
falls in a space within 10 feet of you and has the
Prone condition.

BEHEMOTH
Large, Huge (Requires Druid Level 10+), or Gargantuan
(Requires Druid Level 14+); Your Creature Type and
Alignment Don’t Change
AC 13 + your Wisdom Modifier
Temp HP 4 times your Druid level
Speed 40 ft., Climb 40 ft.
Str., Dex. Your Strength and Dexterity scores are equal to
your Wisdom score.
Con., Int., Wis., Cha. Your Constitution, Intelligence,
Wisdom, and Charisma don’t change.
Senses Darkvision 60 ft.
Languages Your languages don’t change.
CR — (Your Proficiency Bonus doesn’t change.)

TRAITS
Siege Monster. You deal double damage to objects and
structures.

ACTIONS
Multiattack (Requires Druid Level 5+). You make two
Rend attacks.
Rend. Melee Attack Roll: Bonus equals your spell attack
modifier, reach 10 ft. Hit: 1d8 plus your Wisdom modifier
Slashing damage. This damage increases by 1d8 when you
reach Druid levels 6 (2d8) and 12 (3d8).
Incandescent Breath. You expend a level 1+ spell slot.
Dexterity Saving Throw: DC equals your spell save DC,
each creature in a 5-foot-wide, 60-foot-long Line. Failure:
2d10 Radiant damage per level of the spell slot expended.
Success: Half damage.

BONUS ACTIONS
Rampager (Requires Druid Level 10+). You expend a level
1+ spell slot and move up to half your Speed without
provoking Opportunity Attacks. When you enter the space

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

2

of an enemy that is at least two sizes smaller than you for
the first time on a turn, that creature is subjected to the
following effect. Strength Saving Throw: DC equals your
spell save DC. Failure: The target has the Prone condition.
If the target already has the Prone condition, it instead
takes 1d10 Bludgeoning damage per level of the spell slot
expended.

LEVIATHAN
Large, Huge (Requires Druid Level 10+), or Gargantuan
(Requires Druid Level 14+); Your Creature Type and
Alignment Don’t Change
AC 13 + your Wisdom Modifier
Temp HP 4 times your Druid level
Speed 40 ft., Swim 40 ft.
Str., Dex. Your Strength and Dexterity scores are equal to
your Wisdom score.
Con., Int., Wis., Cha. Your Constitution, Intelligence,
Wisdom, and Charisma don’t change.
Senses Darkvision 60 ft.
Languages Your languages don’t change.
CR — (Your Proficiency Bonus doesn’t change.)

TRAITS
Amphibious. You can breathe air and water.
Siege Monster. You deal double damage to objects and
structures.

ACTIONS
Multiattack (Requires Druid Level 5+). You make two
Rend attacks.
Rend. Melee Attack Roll: Bonus equals your spell attack
modifier, reach 10 ft. Hit: 1d8 plus your Wisdom modifier
Bludgeoning damage. This damage increases by 1d8 when
you reach Druid levels 6 (2d8) and 12 (3d8).

INSECTOID
Large, Huge (Requires Druid Level 10+), or Gargantuan
(Requires Druid Level 14+); Your Creature Type and
Alignment Don’t Change
AC 13 + your Wisdom Modifier
Temp HP 4 times your Druid level
Speed 40 ft., Fly 40 ft. (requires Druid Level 10+)
Str., Dex. Your Strength and Dexterity scores are equal to
your Wisdom score.
Con., Int., Wis., Cha. Your Constitution, Intelligence,
Wisdom, and Charisma don’t change.
Senses Darkvision 60 ft.
Languages Your languages don’t change.
CR — (Your Proficiency Bonus doesn’t change.)

TRAITS
Flyby (Requires Druid Level 10+). You don’t provoke an
Opportunity Attack when you fly out of an enemy’s reach.
Siege Monster. You deal double damage to objects and
structures.

ACTIONS
Multiattack (Requires Level 5+). You make two Rend
attacks.
Rend. Melee Attack Roll: Bonus equals your spell attack
modifier, reach 10 ft. Hit: 1d8 plus your Wisdom modifier
Piercing damage. This damage increases by 1d8 when you
reach Druid levels 6 (2d8) and 12 (3d8).
Energizing Pollen. You expend a level 1+ spell slot and can
move up to half your Speed without provoking
Opportunity attacks while emitting a cloud of healing
pollen. When you move within 5 feet of another creature
during this movement, you can restore a number of Hit
Points equal to 2d6 per level of the spell slot expended. A
creature can receive this healing only once per turn.

BONUS ACTIONS
Toxic Deluge (Requires Druid Level 10+). You expend a
level 1+ spell slot and emit a toxic miasma. Constitution
Saving Throw: DC equals your spell save DC, each creature
of your choice in a 10-foot Emanation originating from
yourself. Failure: 2d4 Poison damage per level of the spell
slot expended, and the target has the Poisoned condition
until the start of your next turn.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

3

HELL KNIGHT (FIGHTER)
Inflict Hellish Wounds and Damn Enemies
Hell Knights are the champions of archdevils and
other high-ranking fiends of the Nine Hells, such as
cambions and night hags. Armed with the techniques
of the Nine Hells’ fiercest warriors, Hell Knights
inflict infernal wounds and fight with the tenacity of
a devil.
Devils and other sinister figures employ Hell
Knights to enact their will across the multiverse.
Some Hell Knights are tasked with punishing
creatures that violate infernal contracts or flee their
consequences. Others act as interplanar bounty
hunters, hastening the journey of wicked souls to the
River Styx.
A Hell Knight’s relationship with the Nine Hells is
transactional. Archdevils see Hell Knights as an
investment, and Hell Knights benefit in turn. The
Hell Knight Pursuits table lists reasons why a Fighter
might become a Hell Knight.

HELL KNIGHT PURSUITS
1d6
1
2
3
4
5
6

You Became a Hell Knight Because You …
Desired treasures only the Nine Hells could
grant you.
Hungered for power beyond mortal bounds.
Made a wager with a devil—and lost.
Sacrificed your soul to spare someone else’s.
Sought vengeance on an adversary who
wronged you deeply.
Were fooled by fine print in an infernal
contract.

LEVEL 3: DIABOLICAL GIFT
As a soldier for the agents of the Nine Hells, you’ve
been given fiendish powers. You gain the following
benefits.
Devil’s Sight. You can see normally in Dim Light
and Darkness—both magical and nonmagical—
within 120 feet of yourself.
Devil’s Talents. You know Infernal, the language
of devils. If you already know Infernal, you learn
another language of your choice.
You also gain proficiency in one of these skills of
your choice: Deception, Performance, or Sleight of
Hand.

LEVEL 3: HELL-FORGED WEAPON
When you take the Attack action, you can imbue
each weapon that you are holding with hellfire,
transforming it into a Hell-Forged Weapon. It
remains transformed in this way until you use this
feature again, you have the Unconscious condition,
or the weapon is more than 5 feet away from you for

1 minute or more. You can also end this effect early
(no action required).
While you wield a Hell-Forged Weapon, it sheds
Dim Light in a 5-foot radius, and whenever you deal
damage with the weapon, it can deal your choice of
Cold, Fire, or Necrotic damage or its normal damage
type (choose when you imbue the weapon with
hellfire).

LEVEL 3: INFERNAL WOUND
Your Hell-Forged Weapon can inflict infernal
wounds.
Infernal Wound Die. You have an Infernal Wound
Die, which is a d6.
Inflicting Infernal Wounds. When you hit a
creature with your Hell-Forged Weapon, you can
deal extra damage equal to one roll of your Infernal
Wound Die. This extra damage is of the same type
you chose when you imbued the weapon with
hellfire. You also give the target an infernal wound if
it doesn’t already have one.
While wounded in this way, the target takes
damage of the chosen damage type equal to one roll
of your Infernal Wound Die at the start of each of its
turns. The wound lasts for 1 minute, until the target
regains Hit Points, or until the target or a creature
within 5 feet of the target takes an action to stanch
the wound.
You can use this feature a number of times equal
to your Constitution modifier (minimum of once).
You regain all expended uses when you finish a
Short or Long Rest.

LEVEL 7: ADVANCED WOUNDS
When you roll your Infernal Wound Die, you can
apply one of the following effects. If you roll a 6 on
the Infernal Wound Die, the effect you choose has an
additional Devil’s Luck effect. Once you use this
feature, you can’t do so again until the start of your
next turn.
Purulence of Minauros. Caustic pus erupts from
the wound. Each enemy in a 5-foot Emanation
originating from the target takes Acid damage equal
to your Constitution modifier, and the target has the
Poisoned condition until the end of its next turn.
Devil’s Luck: Each creature that takes Acid damage
from this effect has a –1 penalty to its AC until the
end of your next turn.
Rupture of Cania. The wound ruptures with a
spurt of arcane energy. The target takes Force
damage equal to your Constitution modifier. Devil’s
Luck: The target subtracts 1d6 from the next saving
throw it makes before the end of your next turn.
Stygian Gangrene. Infernal rime spreads from the
wound. The target takes Cold damage equal to your
Constitution modifier, and it can’t take Reactions
until the start of its next turn. Devil’s Luck: The
target’s Speed is halved until the end of its next turn.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

4

LEVEL 7: INFERNAL EQUIPMENT
Your armor and weapons embody infernal
armaments forged in the fires of Avernus, granting
you the following benefits.
Infernal Resilience. Whenever you finish a Short
or Long Rest, choose a damage type: Cold, Fire, or
Necrotic. While wearing Heavy armor or wielding a
Shield, you have Resistance to that damage type
until you choose a different one with this feature.
Unholy Power. When you roll your Infernal
Wound Die, you can treat a roll of 1 as a 6.

LEVEL 10: HELLFIRE SURGE
When you use your Action Surge while holding a
Hell-Forged Weapon, you erupt with hellfire in a 20foot Emanation originating from you that lasts until
the end of your next turn. Whenever a creature
suffering an infernal wound starts its turn within the
Emanation, it takes damage equal to two rolls of
your Infernal Wound Die instead of one.

LEVEL 15: DEVIL’S MISFORTUNE
When a creature with an infernal wound hits you
with an attack roll, you can take a Reaction to roll
your Infernal Wound Die and reduce the damage
taken by the number rolled. On a roll of 6, roll your
Infernal Wound Die again (to a maximum of three
rolls total), and reduce the damage taken by the total
rolled.
In addition, if the attack is a Critical Hit, it becomes
a normal hit.

LEVEL 18: INFERNAL BARGAIN
When you roll a 6 on your Infernal Wound Die three
or more times before the start of your next turn, you
gain Heroic Inspiration. You can use Heroic
Inspiration in the following way.
Infernal Inspiration. If a creature you can see
within 120 feet of you rolls a d20 for a D20 Test, you
can expend your Heroic Inspiration to force the
target to reroll the d20.
If the number rolled causes the target to succeed
on the D20 Test, you regain an expended use of
Indomitable or Second Wind (your choice). If the
number rolled causes the target to fail the D20 Test,
you lose Hit Points equal to 3d6 plus your Fighter
level.

DEMONIC SORCERY (SORCERER)
Summon the Powers of the Abyss
The corruptive magic of demons courses through
you, making you a conduit for the infinite layers of
the Abyss and their horrors. Your gift might stem
from distant demonic ancestry, a fated encounter
with a demon that cursed you, or a brush with the
dark hunger of the Abyss.
The Abyss is a plane of wickedness and disorder,
and this chaos echoes in your innate magic. Abyssal
energy erupts from you, warping your body and
surroundings in tandem with your sorcery.
These Abyssal eruptions manifest in strange and
gruesome ways. Roll on or choose from the Abyssal
Manifestations table to inspire how your connection
to the Abyss might manifest when you channel your
demonic power.

ABYSSAL MANIFESTATIONS
1d6
1
2
3
4
5
6

Manifestation
Abyssal fissures mar your flesh, revealing
windows into a vast demonic realm.
Insects writhe beneath your skin and escape
from your mouth, nose, and ears.
Sheets of scorched skin peel from your body.
Your flesh bubbles and froths like a toxic bog.
Your fingers or other extremities discolor as if
frostbitten.
You grow a second head. (This has no impact
on your game statistics.)

LEVEL 3: ABYSSAL RUPTURE
When you use Innate Sorcery, you create a rupture
into the Abyss, which fills a 10-foot-radius Sphere
centered on a point you can see within 30 feet of
yourself with Abyssal energy. When you activate
your Innate Sorcery and as a Bonus Action while
your Innate Sorcery is active, you can choose one of
the following options. While the rupture persists,
you can move the center of the Sphere to a point you
can see within 30 feet of yourself at the start of each
of your turns.
Demonic Lash. Make a melee spell attack against a
target within 5 feet of the rupture. On a hit, the
target takes 1d8 Slashing damage, and if it is Large
or smaller, you can pull it up to 10 feet toward the
center of the Sphere.
Terrifying Screams. Each creature in the rupture
must succeed on a Wisdom saving throw against
your spell save DC or take 1d4 Psychic damage.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

5

LEVEL 3: DEMONIC SPELLS
When you reach a Sorcerer level specified in the
Demonic Spells table, you thereafter always have the
listed spells prepared.

DEMONIC SPELLS
Sorcerer
Level
3
5
7
9

Spells
Bane, Dissonant Whispers, Spike Growth,
Web
Bestow Curse, Dispel Magic
Giant Insect, Hallucinatory Terrain
Contact Other Plane, Modify Memory

Sphere makes a Constitution saving throw against
your spell save DC. On a failed save, a creature takes
8d6 Force damage if it isn’t a Fiend, and it has the
Incapacitated condition until the start of your next
turn.
Once you use this feature, you can’t do so again
until you finish a Long Rest, unless you spend 7
Sorcery Points (no action required) to restore your
use of it.

LEVEL 6: ABYSSAL REALM
When you spend at least 1 Sorcery Point as part of a
Magic action or a Bonus Action on your turn, you can
pull influence from the Abyss. When you do, you
create a 10-foot Emanation originating from you, or
you fill the Sphere of your Abyssal Rupture with
magic from one of the following layers of the Abyss.
If an effect requires a saving throw, the DC equals
your spell save DC.
Gaping Maw’s Frenzy. Designate a direction that
is horizontal to you. Each creature in the area that
fails a Charisma saving throw must use as much of
its movement as possible to move in that direction at
the start of its next turn, taking the safest route.
Maze of Azzatar. Each creature in the area makes
an Intelligence saving throw. On a failed save, you
gain the benefits of the Invisible condition against
the target until the start of your next turn.
Slime Pits’ Haze. Each creature in the area makes
a Constitution saving throw. On a failed save, the
target has your choice of the Charmed or Poisoned
condition until the start of your next turn.

LEVEL 14: ABYSSAL CONDUIT
Your Abyssal powers reach their full potential. You
gain the following benefits.
Rupture Expansion. The size of your Abyssal
Rupture is now a 30-foot-radius Sphere, and the
area is Difficult Terrain for your enemies.
Fiendish Servant. You always have the Summon
Fiend spell prepared. When you cast the spell, you
can modify it so that it doesn’t require
Concentration. When you do so, the spell’s duration
becomes 1 minute for that casting, and you must
choose Demon when you summon the Fiend.
In addition, the Fiend has Advantage on attack
rolls while within your Abyssal Rupture.

LEVEL 18: ABYSSAL EXPLOSION
You unleash the chaos of the Abyss. As a Magic
action, you fill a 30-foot-radius Sphere with an
explosion of Abyssal energy. Each creature in the

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

6

FEATS

creature the Prone condition. You must have a free
hand to use this Reaction.

This section presents eight new feats.

EPIC BOON FEATS

ORIGIN FEATS

These feats are in the Epic Boon category.

These feats are in the Origin category.

BOON OF THE BANDIT KING

ATONER’S GRACE

Epic Boon Feat (Prerequisite: Level 19+)

Origin Feat

You gain the following benefits.
Ability Score Increase. Increase one ability score
of your choice by 1, to a maximum of 30.
Dastardly Charm. You have Advantage on
Dexterity (Sleight of Hand) checks to pick a pocket.
When you succeed on such a check, you can cause
the target of your theft to willingly part with the
item and have the Charmed condition for 1 minute
or until it takes damage. Once you use this benefit,
you can’t use it again until you finish a Short or Long
Rest.
Uncatchable. You don’t provoke Opportunity
Attacks when you move out of a creature’s reach.

You gain the following benefits.
Disarming Mien. A creature’s Hostile attitude
doesn’t impose Disadvantage on your Charisma
(Persuasion) checks to influence that creature.
Parley. When you take the Disengage or Influence
action, each creature of your choice within 5 feet of
you has Advantage on the next ability check or
saving throw it makes before the start of your next
turn.

RAISED BY CULTISTS
Origin Feat
You gain the following benefits.
Bloody Revelation. When you become Bloodied,
you can take a Reaction to gain Heroic Inspiration.
Communal Caster. When an ally within 5 feet of
you makes a Constitution saving throw to maintain
Concentration, you can take a Reaction to give your
ally Advantage on the save.

TRAPPER
Origin Feat
You gain the following benefits.
Eye for Detail. You have Advantage on any
Intelligence (Investigation) check you make as part
of the Study action.
Swift Tracker. You don’t have Disadvantage on
Wisdom (Perception or Survival) checks while
traveling at a Fast pace, and you have Advantage on
such checks while traveling at a Normal pace.
Trap Expert. You can take a Bonus Action, instead
of a Utilize action, to set a Hunting Trap. When you
set a Hunting Trap, you add your Proficiency Bonus
to the DC of the saving throw to avoid the trap and
the DC of the check to escape it.

UNDERHANDED
Origin Feat
You gain the following benefits.
Elusive. Immediately after you roll Initiative, you
can move up to 10 feet.
Fight Dirty. When a creature one size larger than
you or smaller makes an Opportunity Attack against
you and misses, you can take a Reaction to give that

BOON OF THE CLEANSED HEART
Epic Boon Feat (Prerequisite: Level 19+)
You gain the following benefits.
Ability Score Increase. Increase one ability score
of your choice by 1, to a maximum of 30.
Cleanse Heart. You can cast Dispel Evil and Good
without expending a spell slot. You can’t use the
spell’s Dismissal special function when you cast it in
this way.
Radiant Reflection. You have Immunity to
Necrotic damage. When you would be subjected to
Necrotic damage and don’t have the Incapacitated
condition, you can deal 2d8 Radiant damage to each
creature of your choice within a 10-foot Emanation
originating from yourself.

BOON OF THE HUNTER’S EYE
Epic Boon Feat (Prerequisite: Level 19+)
You gain the following benefits.
Ability Score Increase. Increase one ability score
of your choice by 1, to a maximum of 30.
Quick Capture. When you deal damage to a
creature you intend to knock out rather than kill, if
the target has 20 or fewer Hit Points after your
damage is dealt, the target is reduced to 0 Hit Points
instead.
Studied Hunter. When you roll Initiative, you can
choose a creature you can see; you know whether
that creature has any Immunities, Resistances, or
Vulnerabilities, and if the creature has any, you
know what they are.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

7

BOON OF UNWAVERING DEVOTION
Epic Boon Feat (Prerequisite: Level 19+)
You gain the following benefits.
Ability Score Increase. Increase one ability score
of your choice by 1, to a maximum of 30.
Possession Immunity. You automatically succeed
on saving throws to avoid or end possession.
See Through Illusions. Visual illusions appear
transparent to you, and you automatically succeed
on saving throws against them.
Undeniable Confidence. Immediately after a
creature you can see succeeds on a Wisdom saving
throw against an effect you created, you can take a
Reaction to force that creature to reroll the save, and
it must use the new roll. Once you use this benefit,
you can’t use it again until you roll Initiative or finish
a Short or Long Rest.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

8



### Documento: Villainous Options 2 (2026)

UNEARTHED ARCANA 2026

VILLAINOUS OPTIONS 2
This playtest document is part of a series of
Unearthed Arcana articles that present material
designed for upcoming products. The material here
uses the rules in the Player’s Handbook.

WHAT’S INSIDE
This document presents three new subclasses:
• Barbarian (Path of Lament)
• Monk (Warrior of Venom)
• Warlock (Primordial Patron)

THIS IS PLAYTEST MATERIAL
This article is presented for playtesting and feedback.
The options here are experimental and in draft form.
They aren’t officially part of the game. Your feedback
will help determine whether we adopt them as official.
How to Playtest This UA. We invite you to try out
this material in play. To play with this material, you
may either incorporate it into your campaign or run
one or more special playtest sessions. For such a
session, you may create an adventure of your own or
use a short adventure from a source like Dragon
Delves.
Power Level. The character options you read here
might be more or less powerful than options in the
Player’s Handbook. If a design survives playtesting, we
adjust its power to the desirable level before
publication. This means an option could be more or
less powerful in its final form.
Feedback. The best way for you to give us feedback
on this material is in the survey we’ll release on D&D
Beyond. If we make this material official, it will be
refined based on your feedback, and then it will appear
in a D&D book.
Providing feedback on this document is one way you
can help shape the future of D&D!

PATH OF LAMENT (BARBARIAN)
Transform Bitter Anguish into Supernatural Rage
Barbarians who walk the Path of Lament hone their
regrets into deadly weapons and channel their
deepest sorrows into rageful action. Propelled by
supernatural grief, their fury grants them gifts from
beyond the grave.
A Barbarian may choose the Path of Lament, but
more often the path is thrust on the Barbarian by
unhappy accident. At the heart of the Barbarian’s
rage are great trauma and unresolved grief—painful
emotions fueled by haunting memories that rise to
the surface during adrenaline-filled moments. You
can roll on or choose a result from the Path of
Lament Origins table to inspire the incident that
forms the root of your despair.

PATH OF LAMENT ORIGINS
1d6
1
2
3
4
5
6

Your Rage Stems from the Time …
A lost loved one rose as an undead monster.
Enemies slew your animal companion.
You (and you alone) escaped brutal captors.
You found your family’s charred remains.
Your decision led to a devastating shipwreck.
Your elders banished you from your home.

LEVEL 3: BANSHEE’S WAIL
When you activate your Rage or as a Bonus Action
while your Rage is active, you can let out a doleful
wail. Each creature of your choice in a 30-foot
Emanation originating from you makes a
Constitution saving throw (DC 8 plus your
Constitution modifier and Proficiency Bonus). On a
failed save, a creature takes Psychic damage and has
the Deafened condition for 1 minute. On a successful
save, a creature takes half as much damage only. To
determine the Psychic damage, roll a number of
d12s equal to your Rage Damage bonus, and add
them together.
You can use this feature a number of times equal
to your Constitution modifier (minimum of once).
You regain all expended uses when you finish a Long
Rest. You can also regain all uses by expending a use
of your Rage (no action required).

LEVEL 6: COMMUNE WITH THE DEAD
You can cast the Speak with Dead spell but only as a
Ritual. Wisdom is your spellcasting ability for it.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

v1.1

LEVEL 6: HORRIFYING STRIKE
Once per turn when you hit a creature with a
Strength-based attack roll while your Rage is active,
you can attempt to horrify the target. The target
must succeed on a Wisdom saving throw (DC 8 plus
your Constitution modifier and Proficiency Bonus)
or have the Frightened condition until the start of
your next turn.

LEVEL 10: OTHERWORLDLY ANGUISH
You draw power from a sorrow so deep it extends
beyond the boundaries of the realm of the living. You
gain the following benefits.
Deathly Wail. If a target fails its saving throw
against your Banshee’s Wail and it has Hit Points
equal to twice your Barbarian level or fewer, it drops
to 0 Hit Points instead of taking damage.
Impenetrable Sorrow. You can’t be possessed.
Resistance. You have Resistance to Cold and
Necrotic damage while your Rage is active.

LEVEL 14: SORROW FORM
When you activate your Rage, you can empower
yourself with undeath. You gain the benefits below
for 1 minute or until you drop to 0 Hit Points. Once
you use this feature, you can’t do so again until you
finish a Long Rest.
Immunities. You have Immunity to the Charmed
and Frightened conditions. If you’re Charmed or
Frightened when you empower yourself, the
condition ends on you. In addition, you can’t gain
Exhaustion levels.
Life-Draining Strike. When a creature fails its
saving throw against your Horrifying Strike, the
creature takes 2d10 Necrotic damage. You regain Hit
Points equal to the Necrotic damage dealt.
Undead. Your creature type is Undead.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

v1.1

WARRIOR OF VENOM (MONK)

LEVEL 11: TOXIN REFINER

Warriors of Venom pollute their internal reservoirs
of power to become poison incarnate. Through years
of focus and the study of poison in all its forms, these
Monks learn to harness their own toxicity to impair
and envenom foes. Contact with a Warrior of
Venom—even the slightest touch or a single drop of
blood—can be as deadly as a viper’s bite.

Your body can filter poison. You gain Immunity to
Poison damage. Whenever you are subjected to
Poison damage, your Envenom Weapon options each
deal extra Poison damage equal to one roll of your
Martial Arts die, and you can’t gain this benefit again
until the end of your next turn. In addition,
whenever you ingest a poison, you regain a number
of Hit Points equal to one roll of your Martial Arts
die.

LEVEL 3: ENVENOM WEAPON

LEVEL 11: TOXIC BLOOD

At the start of your turn, you can expend 1 Focus
Point to apply a toxin produced from your blood to
one Monk weapon that you’re holding. A creature
that takes damage from the weapon is subjected to
one of the following toxin effects (choose when you
apply the toxin):

Enemies draw your toxic blood at their own peril.
Whenever a creature hits you with a melee attack
roll, the attacker takes 1d6 Poison damage. If you are
Bloodied, the attacker instead takes Poison damage
equal to one roll of your Martial Arts die.

Slowing Toxin. Until the start of your next turn, the
target’s Speed is halved; it can’t take Reactions;
and it can take either an action or a Bonus Action
on its turn, not both.
Venom. The target takes Poison damage equal to
two rolls of your Martial Arts die.

When you take the Attack action on your turn, you
can expend 2 Focus Points and replace one of your
attacks with an exhalation of hallucinogenic vapors
at one creature you can see within 30 feet. The
target must make a Constitution saving throw. On a
failed save, the target takes Poison damage equal to
three rolls of your Martial Arts die and has the
Frightened condition for 1 minute or until the target
takes damage. While Frightened, the target takes the
Dash action and moves away from you by the safest
route on each of its turns unless there is nowhere to
move. On a successful save, a creature takes half as
much damage only.

Channel the Cauldron of Your Own Toxicity

The toxin retains potency for 1 minute or until a
creature takes damage from the weapon.

LEVEL 3: POTENT ARSENAL
You gain a Poisoner’s Kit, and you have proficiency
with it. When creating a Basic Poison, you can do so
over the course of 1 day (8 hours of work).
Additionally, whenever you deal Poison damage
with a Monk feature or a Monk weapon, you can
change that damage type to Acid.

LEVEL 17: HALLUCINOGENIC BREATH

LEVEL 6: TOXIC TOUCH
As a Magic action, you can expend 1 Focus Point to
apply a potent toxin to a creature you touch. The
target makes a Constitution saving throw. On a failed
save, the target has the Poisoned condition for 1
minute.
While Poisoned, the target is affected by one of the
following effects of your choice:
Intoxicant. The target has the Charmed condition
for the duration or until you or your allies deal
damage to the target.
Sedative. The creature falls asleep and has the
Unconscious condition for the duration. Another
creature can use an action to shake it awake and
remove the condition.
Truth Serum. The target can’t knowingly
communicate a lie for the duration.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

v1.1

PRIMORDIAL PATRON (WARLOCK)
Invoke Scions of Elemental Chaos
Your pact draws on the Inner Planes, the realms of
elemental forces and the building blocks of the
multiverse. Warlocks of this pact act as heralds of
ancient and destructive scions of air, earth, fire, and
water—such as the Elemental Evils. These Warlocks
prepare the way for their patrons’ eventual arrival
on the Material Plane by creating elemental nodes,
areas suffused with energy from the Elemental
Planes.
When you choose this subclass, choose an element
from the Primordial Patrons table, which suggests
potential patrons and determines the damage type
for certain subclass features.

When the node appears, each creature other than
you in the node makes a Dexterity saving throw
against your spell save DC, taking 1d6 damage of
your chosen element’s type on a failed save or half as
much damage on a successful one. A creature also
makes this save when the node moves into its space
and when it enters the node or ends its turn there. A
creature makes this save only once per turn.
The node lasts for 1 minute, until you dismiss it
(no action required), or until you use this feature to
create another node. Once you use this feature, you
can’t use it again until you complete a Short or Long
Rest unless you expend a Pact Magic spell slot (no
action required) to restore your use of it.
The node’s damage increases by 1d6 when you
reach Warlock levels 6 (2d6) and 14 (3d6).

LEVEL 3: ELEMENTAL SPELLS

PRIMORDIAL PATRONS
Element
Air
Earth
Fire

Example Patrons
Akadi, Yan-C-Bin
Ogrémoch, Grumbar
Imix, Kossuth, Zaaman
Rul

Damage Type
Thunder
Acid
Fire

Water

Istishia, Olhydra

Cold

The magic of your patron ensures you always have
certain spells ready; when you reach a Warlock level
specified in the Elemental Spells table, you
thereafter always have the listed primordial spells
prepared, along with the spells corresponding to
your chosen element.

LEVEL 6: ELEMENTAL HAVEN

The capricious nature of elemental alliances extends
to your pact. You can change your chosen element—
and your patron—whenever you gain a level.

LEVEL 3: ELEMENTAL NODE
As a Magic action, you can create a 5-foot-radius
Sphere of elemental magic centered on a point you
can see within 60 feet of yourself. The magic of this
elemental node resembles your chosen element. On
later turns, you can take a Bonus Action to move the
node up to 30 feet.

Your Elemental Node shields you from harm. You
gain the following benefits.
Elemental Protection. While you’re within your
node, you have a bonus to AC equal to your
Charisma modifier (minimum of 1).
Elemental Teleport. As a Bonus Action, you can
teleport into your node or the nearest unoccupied
space within 5 feet of it. You can use this benefit a
number of times equal to your Charisma modifier
(minimum of once), and you regain all expended
uses when you finish a Long Rest.

ELEMENTAL SPELLS
Warlock
Level

Primordial Spells

Air Spells

Earth Spells

3

Chromatic Orb, Darkvision

Feather Fall,
Shatter

Entangle, Knock Burning Hands,
Heat Metal

Alter Self, Ice
Knife

5

Elemental Weapon

Fly

Plant Growth

Fireball

Water Walk

7

Summon Elemental (the spirit’s Freedom of
element matches your chosen Movement
element)

Vitriolic Sphere

Wall of Fire

Control Water

9

Commune with Nature

Wall of Stone

Flame Strike

Cone of Cold

Steel Wind
Strike

Fire Spells

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

Water Spells

v1.1

LEVEL 10: PRIMEVAL PROTECTION
You gain the following benefits.
Elemental Fortitude. You have Resistance to your
chosen element’s damage type. Additionally, while
within your Elemental Node, you have Immunity to
that damage type.
Node Improvement. Your Elemental Node is now
a 10-foot-radius Sphere.

LEVEL 14: ELEMENTAL HARBINGER
Your Elemental Node can usher in the mightiest of
elementals, granting you the following benefits.
Elemental Vortex. Whenever you expend a Pact
Magic spell slot while you’re within your Elemental
Node, you can attempt to pull a creature into the
node. One creature you choose within 30 feet of the
node must succeed on a Strength saving throw or be
pulled up to 15 feet toward the node’s center.
Node Improvement. Your Elemental Node now
lasts for up to 1 hour.
Primordial Herald. While you’re within your
node’s area, you can cast the Planar Ally spell
without expending a spell slot. When you cast the
spell in this way, you speak the name of your patron.
Once you use this benefit, you can’t use it again until
you finish 2d4 Long Rests.

ELDRITCH INVOCATIONS
The following two Eldritch Invocations complement
the Primordial Patron.

ELEMENTAL OVERFLOW
Prerequisite: Level 5+ Warlock
Choose a damage type: Acid, Cold, Fire, Lightning, or
Thunder. Whenever you cast a spell that deals the
chosen damage type, you can cause elemental
energy to wreathe you until the end of your next
turn. For the duration, whenever a creature within 5
feet of you hits you with a melee attack roll, that
creature takes 1d4 damage of the chosen damage
type.
Repeatable. You can gain this invocation more
than once. Each time you do so, choose a different
damage type.

ELEMENTAL TRANSMUTATION
Prerequisite: Level 2+ Warlock
Choose a damage type: Acid, Cold, Fire, Lightning, or
Thunder. Once per turn, whenever you deal damage
of any of the above types, you can deal the chosen
damage type instead.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

v1.1


