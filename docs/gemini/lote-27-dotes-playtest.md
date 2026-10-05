# Encargo: Lote 27 (dotes de playtest 2026) de la app "Mi turno"

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
Solo las dotes: las **dotes de origen** y los **Epic Boons** de Villainous Options Update, y el **Path of Ceremorphosis** (camino de dotes encadenadas, con sus variables) de Underdark Options. No incluyas subclases ni especies.

## Formato de la respuesta
=== A ===
TypeScript `DOTES_NUEVAS` (clave → `{ n, t, cat, nivelMin, texto }`; cat: Origen, Épica o Ceremorphosis) con texto propio en español.
=== B ===
JSON de mecánicas (usos, elecciones, requisitos entre las dotes de Ceremorphosis) con "donde" = clave de la dote.
=== C ===
JSON `{ "clave": "Unearthed Arcana <documento> (2026)" }`.
=== D ===
JSON `{ "clave": "1 frase propia que presente la dote" }`.
=== E ===
Dudas o [NO CONFIRMADO].


## Texto oficial (fuente única)

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



### Documento: Underdark Options (2026)

UNEARTHED ARCANA 2026

UNDERDARK OPTIONS
This playtest document is part of a series of
Unearthed Arcana articles that present material
designed for upcoming products. The material here
uses the rules in the Player’s Handbook.

WHAT’S INSIDE
This document presents three new subclasses:
• Barbarian (Path of Unlight)
• Rogue (House Agent)
• Wizard (Imaskarcanist)
This document also includes a new transformative
path of feats: the Path of Ceremorphosis.

CONTENT WARNING
This material contains descriptions of body horror,
damage to the eyes and brain, ingested parasites,
and the idea that you are slowly losing control of
yourself. Some readers might find this content
disturbing.

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
use a short adventure from the Dungeon Master’s
Guide or a source like Dragon Delves.
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

SUBCLASSES
This section presents the following subclasses: Path
of Unlight, House Agent, and Imaskarcanist.

WHAT IS UNLIGHT?
The city of Deep Imaskar, home to the descendants of
the ancient Imaskari empire, lies in one of the lowest
levels of the Underdark. The Deep Imaskari wield a
magical force known as Unlight, taught to them by
Imaskarcana, sentient grimoires penned by ancient
wizard-kings of the lost Imaskari empire.
The Deep Imaskari used Unlight to create the Great
Seal, a magical symbol that protects and illuminates
their city while nourishing crops that allow the Deep
Imaskari to survive in the Underdark. But Unlight can
also be used to corrupt and destroy, burning creatures
from within until they die in a fiery explosion of
brilliant light.

PATH OF UNLIGHT
Unleash your inner light as blazing fury
Barbarians infused with the power of Unlight
embrace uncontrollable magic in exchange for
incredible physical prowess. The Unlight burning
inside them illuminates the darkness while burning
and blinding the barbarian’s enemies.
Most barbarians on this path were first exposed to
Unlight in the Underdark. The Deep Imaskari grant
Unlight to chosen warriors who lead their army
against the upper regions of the Underdark, and
some of these soldiers have fled to pursue lives of
their own. But the magic of Unlight is contagious and
spreads in unpredictable ways. It infects people only
briefly exposed to it and occasionally manifests in
individuals who have never been to the Underdark.

UNLIGHT MANIFESTATION
Barbarians on the Path of Unlight manifest the
radiant energy of Unlight when they rage, but this
energy can take many forms. You can roll on or
choose a result from the Unlight Manifestation table
to inspire the form your Radiant Rage takes.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

1

UNLIGHT MANIFESTATION
1d6
1
2
3
4
5
6

Your Unlight Manifests As …
White light blazing from your eyes and
mouth.
Complex arcane symbols of light etched
onto your body.
A cyclone of bright light that whirls around
you.
Cracks in your flesh that reveal burning
light within.
A ghostly form made of light that hovers
above you.
Pale fire that dances on the tip of your
weapon.

LEVEL 3: RADIANT RAGE
The Unlight coursing through you fuels your Rage. If
a creature hits you with a melee attack roll while
your Rage is active, the creature takes Radiant
damage equal to your Rage Damage bonus.
Additionally, while your Rage is active, you shed
Bright Light in a 20-foot radius.

LEVEL 6: UNLIGHT REVELATION
You have proficiency in the Perception skill, if you
lack it. You also gain Expertise in that skill.
While your rage is active, you have Blindsight with
a range equal to that of the Bright Light provided by
your Radiant Rage.

LEVEL 10: INFECTIOUS UNLIGHT
Damage you deal with Brutal Strike can be Radiant
or the usual type (your choice). The following effect
is now among your Brutal Strike options.
Radiant Infection. The target becomes infected
with Unlight for 1 minute. While infected, it sheds
Bright Light in a 10-foot radius. Additionally, at the
start of each of its turns, the target takes 1d6
Radiant damage. The target makes a Constitution
saving throw (DC 8 plus your Strength modifier and
Proficiency Bonus) at the end of each of its turns,
ending the effect on itself on a success.

damage and has the Blinded condition until the end
of your next turn. On a successful save, a creature
takes half damage only.
Once you use this feature, you can’t use it again
until you finish a Long Rest unless you expend a use
of your Rage (no action required) to restore your use
of it.

HOUSE AGENT (ROGUE)
Outwit Your Foes with Charm and Subterfuge
The drow houses of Menzoberranzan conspire
against each other in a great game of status and
sabotage that expands far beyond the city’s limits.
When a house needs a specialized tool to further its
interests without arousing suspicion, it calls in a
house agent.
Using the tools and training of their sponsor, a
house agent is a master infiltrator, capable of
insinuating themself into their target’s life and
striking while their target’s back is turned.

LOYALTY TEST
Each house agent is required to prove their loyalty
before their sponsor allows them into the inner
circles of the organization. You can roll on or choose
a result from the House Agent Origins table to
inspire the incident that made you a full-fledged
member of your house.

HOUSE AGENT ORIGINS
1d6
1
2
3

4
5
6

You Proved Your Loyalty By …
Taking the fall for another person’s
crime and serving their jail sentence.
Assassinating a powerful political figure.
Renouncing all personal ties and worldly
possessions and adopting a new
identity.
Uncovering an incriminating secret
about a member of another house.
Withstanding a torturous interrogation
without divulging house secrets.
Sacrificing a family member for the
benefit of your sponsor.

LEVEL 10: HARBINGER OF UNLIGHT
You have Resistance to Radiant damage.

LEVEL 14: BRILLIANT RAGE
The aura of your Unlight is bolstered. While your
Rage is active, you shed Bright Light in a 30-foot
radius.
As a Bonus Action, you unleash blinding brilliance.
When you do, each creature of your choice within 30
feet of you makes a Constitution saving throw (DC 8
plus your Strength modifier and Proficiency Bonus).
On a failed save, a creature takes 1d12 Radiant

USING OTHER SPONSORS
Though this Rogue is designed to work with the
backing of a drow house of Menzoberranzan, a House
Agent might instead have the backing of another large
group. They could belong to a duergar clan, a religious
order, or a faction such as Bregan D’Aerthe or the
Zhentarim. Or your Rogue could have had multiple
sponsors—perhaps they first worked for a drow house,
then defected to serve another cause.

©2019 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

2

LEVEL 3: HOUSE INSIGNIA

LEVEL 13: SILVER TONGUE

You gain a magical token in the form of a brooch or
coin that marks you as an agent of your sponsor and
that bears their heraldry. While you have this
insignia, you can cast certain spells with it. Charisma
is your spellcasting ability for spells you cast with
your insignia.
Cantrips. You learn the Friends cantrip.
Find Familiar. You can cast the Find Familiar spell
but only as a Ritual. Your sponsor provides the
Material component for your first casting of this
spell. You must choose the Spider form for your
familiar.
Insignia Spells. When you reach a level specified
in the Insignia Spells table, you learn the listed
spells. Once you cast a spell using your insignia, you
can’t cast that spell again until you finish a Long
Rest.

A creature’s Hostile attitude doesn’t impose
Disadvantage on your Charisma checks to influence
that creature.

INSIGNIA SPELLS
Rogue Level
3
5
9

Prepared Spells
Charm Person
Suggestion
Hypnotic Pattern

Losing Your Insignia. If you lose your insignia,
your house finds a way to deliver you a new one,
whether it is via a courier, a magical familiar,
teleportation magic, or some other method. Your
new insignia is delivered to you when you finish a
Long Rest.

LEVEL 3: CHARMING PRESENCE
You can take the Influence action as a Bonus Action.
Additionally, choose one of the following skills:
Deception, Intimidation, Performance, or
Persuasion. You have proficiency in that skill.

LEVEL 9: BACKSTAB
You have Advantage on attack rolls against creatures
within 5 feet of you that are Friendly to you or have
the Charmed Condition. You also gain the following
Cunning Strike option.
Stunning Betrayal (Cost: 4d6). If your target was
Friendly to you or had the Charmed condition when
you hit it, the target has the Stunned condition until
the start of your next turn.

LEVEL 17: SUBTLE MANIPULATOR
You gain the following Cunning Strike option.
Confound (5d6). The target must succeed on a
Wisdom saving throw with a DC equal to your
spellcasting DC or have the Charmed condition for 1
minute. The target can repeat the save when it takes
any damage, ending the effect on itself on a success.
Additionally, you can cast the Friends spell as a
Bonus Action. The target no longer automatically
succeeds on the saving throw if it isn’t a Humanoid
or if you’re fighting it.
Finally, when a spell you cast that gives a target
the Charmed condition ends, the target doesn’t know
it was Charmed by you.

IMASKARCANIST (WIZARD)
Master the Secrets of Unlight and the Artifacts of
Ancient Imaskar
Imaskarcanists have learned the ancient secrets of
Deep Imaskar, a once-human society living in the
deepest depths of the Underdark. Through these
eldritch arts—taught to the Deep Imaskari by
sentient artifacts called the Imaskarcana—they have
mastered the power of Unlight, a brilliant,
destructive, and infectious energy that can be used
to both heal and destroy. With this power, the Deep
Imaskari have launched a war of conquest to bring
light to every corner of the Underdark. Each
Imaskarcanist must decide for themself whether to
aid the conquering army or use their power against
it and preserve the comforting darkness of the world
below.

LEARNING THE SECRETS OF UNLIGHT
Unlight is a rare form of magic known to very few.
You can roll on or choose a result from the Secrets of
Unlight table to inspire how your character learned
about this secret magic.

LEVEL 13: INFILTRATION PARTNER
The familiar you have through the Find Familiar
spell gains Darkvision with a range of 120 feet and
Truesight with a range of 30 feet.
Additionally, when you cast the Find Familiar spell
or finish a Short or Long Rest while you have a
familiar, you can grant your familiar Temporary Hit
Points equal to your Rogue level.

©2019 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

3

SECRETS OF UNLIGHT
1d6
1

2
3
4

5

6

You Learned About Unlight When …
You were taught by a refugee from Deep
Imaskar who brought this knowledge to the
surface world.
You heard whispers in your dreams in a
language you inexplicably understood.
You discovered written records left behind
by a long-dead Imaskari wizard.
You were apprenticed to a Deep Imaskari
wizard in the depths of the Underdark, but
you escaped.
You heard rumors of this power from
Underdark refugees, then pieced its secrets
together through laborious research.
A mind flayer gave you notes salvaged from
a Deep Imaskari whose brain the creature
had eaten.

LEVEL 3: UNLIGHT ADEPT
You know how to weave Unlight into your damaging
spells. When you cast a spell that deals Acid, Cold,
Fire, Lightning, or Thunder damage, you can change
that damage type to Radiant.
In addition, Dim Light created by spells you cast is
Bright Light instead.

LEVEL 3: UNLIGHT INVIGORATION
You can imbue creatures with Unlight drawn from
your own energy, making them stronger and fiercer.
As a Bonus action, choose a willing creature you can
see within 30 feet of you and roll one or two of your
Hit Point Dice. Those dice are then expended. The
target gains Temporary Hit Points equal to the total
rolled plus your Intelligence modifier, and until the
target has no Temporary Hit Points, it has Advantage
on Strength checks and sheds Bright Light in a 10foot radius.

LEVEL 6: UNLIGHT RESTORATION
You can wield the restorative effects of Unlight to
heal injuries and remove harmful effects. As a Bonus
action, choose a creature you can see within 30 feet
of you and roll one or two of your Hit Point Dice.
Those dice are then expended. The target regains Hit
Points equal to the total rolled and sheds Bright
Light in a 10-foot radius until the end of its next
turn.
If you expended two Hit Point Dice, you can
choose to end one of the following conditions on the
target: Blinded, Deafened, Paralyzed, or Poisoned. If
you do, the target does not regain Hit Points.

LEVEL 10: SECRETS OF DEEP IMASKAR
Your research into the secrets of the Imaskarcana
grants you the following benefits.
Imaskarcana Lore. You can attune yourself to a
magic item as a Magic action. Once you use this
feature, you can’t do so again until you finish a Long
Rest.
Piercing Unlight. Your spells ignore Resistance to
Radiant damage.
Unlight Resilience. You gain Resistance to Radiant
damage.
Imaskar Seals. You always have the Glyph of
Warding spell prepared and can cast it once without
a spell slot. When you cast the spell in this way, you
don’t need Material components, you cast the spell
as if using a spell slot equal to the highest Wizard
spell slot you have. Any previous glyph you created
in this way is broken, and its spell ends without
being triggered. You regain the ability to cast Glyph
of Warding in this way when you finish a Long Rest.

LEVEL 14: DOOM OF UNLIGHT
You can curse your enemies with corrosive Unlight,
and the only escape from the curse is physical
violence or an explosive death.
When a creature takes Radiant damage from a
spell you cast, you can take a Reaction to curse that
creature with Unlight. The creature makes a
Constitution save against your spell save DC. On a
failure, the creature is cursed. Until the curse ends,
the target suffers the following effects:
• The target emits Bright Light in a 20-foot radius.
• Attack rolls against the target have Advantage.
• At the start of each of the target’s turns, it takes
Radiant damage equal to your character level.
• The target has Advantage on Strength checks and
melee attack rolls.
• If the target hits another creature with a melee
attack roll, the target can repeat the Constitution
save, ending this curse on a success.
• If the target is reduced to 0 Hit Points, it explodes.
Roll a number of d8s equal to half your
character level. Creatures in a 10-foot
Emanation centered on the target take Radiant
damage equal to the total rolled.
Once you have attempted to curse a creature using
this feature, you can’t do so again until you finish a
Long Rest or until you expend a level 6+ spell slot
(no action required).

©2019 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

4

PATH OF CEREMORPHOSIS
Ceremorphosis is the process by which mind flayers
create more mind flayers. They incubate their
tadpole young in the tank that houses their colony’s
elder brain. When a tadpole is ready, they insert it
into the body of a suitable host. During the
transformative period that ensues, the host gains
access to psychic powers even before the new
illithid’s more monstrous parts begin to develop.
The best hosts are typically humanoids capable of
great physical, mental, and magical feats—in other
words, adventurers.

FROM TADPOLE TO TRANSFORMATION
Ceremorphosis is typically a parasitic relationship in
which a tadpole eats the mind of its host and takes
over the host’s body. The resulting mind flayer
retains the memories of its host but is an entirely
different creature with its own thoughts and
motivations. This mind flayer is subject to the will of
an elder brain, a powerful leader of a mind flayer
colony.
Ceremorphosis usually occurs quickly, but your
path to becoming a mind flayer is different from
traditional methods. As you take feats along this
path, imagine what you might look like at every
stage of this process. Your skin could turn a deeper
violet with each feat you take, or your eyes might
change color and shape.
Something prevents you from giving yourself over
to the whims of the elder brain. Roll on or choose
from the Ceremorphosis Variables table to inspire
what protects you from this foul influence.

CEREMORPHOSIS VARIABLES
1d6
1
2
3
4
5

6

You’re Protected from the Elder Brain
By …
A blessing from your deity, given
unconditionally.
The interference of an archdevil you’ve
sold your soul to.
The elder brain’s desire to see what
happens if a host retains its autonomy.
A one-of-a-kind helm that the Society of
Brilliance infused with Abjuration magic.
A mind and personality so awful that
they deter the elder brain from
interacting with you.
The interference of another elder brain
vying for control over your mind.

ELDER BRAIN CONTROL
Roleplaying the relationship between a burgeoning
mind flayer and an elder brain can be a fun part of this
path, but it requires a conversation with your DM.
Whatever you decide, make sure both you and the DM
agree on the terms of the relationship. Some topics
you might discuss include the following:
• How does the elder brain communicate with your
character—through words, images, or impulses?
• Is the elder brain open about its true nature, or does
it pretend to be the character’s deity or trusted ally?
• What are the consequences for your character if
they defy the elder brain’s orders?
• What, if anything, can the elder brain force your
character to do? How does your character resist?

PATH OF CEREMORPHOSIS FEATS
The following Path of Ceremorphosis feats represent
one path a character can take to become a mind
flayer. To complete the Path of Ceremorphosis, begin
by taking the Tadpole Host feat, followed by any
other Path of Ceremorphosis feat you choose.
Finally, when you reach level 12 or higher, take the
Full Ceremorphosis feat.

TADPOLE HOST
Path of Ceremorphosis Feat (Prerequisite: Level 4+)
You begin a symbiotic relationship with the mind
flayer tadpole in your body. You gain the following
benefits.
Ability Score Increase. Increase your Intelligence
by 1, to a maximum of 20.
Mind Sliver. You learn the Mind Sliver cantrip.
Intelligence is your spellcasting ability for this spell.
Psionic Power. The wellspring of psionic energy
provided to you by your tadpole is represented by
Psionic Energy Dice, which fuel the powers you have
from this feat path.
You have a number of Psionic Energy Dice equal to
your Proficiency Bonus. When you take this feat,
your Psionic Energy Die is a d6. The die changes
when you take feats along the Path of
Ceremorphosis.
Any features in this feat path that use a Psionic
Energy Die use only the dice from this feat path.
Some of your features expend Psionic Energy Dice,
as specified in a feature’s description, and you can’t
use a feature if it requires you to use a die when all
your Psionic Energy Dice are expended.
You regain all expended Psionic Energy Dice when
you finish a Long Rest.

©2019 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

5

Psionic Overload. Whenever you deal Psychic
damage, you can expend a Psionic Energy Die to roll
the die and deal extra Psychic damage equal to the
number rolled.

ILLITHID THRALLMAKER
Path of Ceremorphosis Feat (Prerequisite: Tadpole
Host Feat)
You have honed your psionic ability to become a
master manipulator. You gain the following benefits.
Ability Score Increase. Increase your Intelligence
or Charisma score by 1, to a maximum of 20.
Psionic Energy Dice. The Psionic Energy Dice
granted to you by this feat path become d8s.
Telepathy. You have Telepathy with a range of 10
feet. If you already have Telepathy, your range
increases by 10 feet.
Persuasive Presence. You always have the Charm
Person spell prepared. Intelligence is your
spellcasting ability for this spell. You can cast it
without expending a spell slot by expending a
Psionic Energy Die. You can also cast the spell using
any spell slots you have. When you expend a Psionic
Energy Die to cast the spell, roll the expended die.
One target of the spell subtracts half the number
rolled (round up) from its saving throw against the
spell.

TADPOLE’S SAFEGUARD
Path of Ceremorphosis Feat (Tadpole Host Feat)
Your tadpole has a vested interest in protecting its
shell while it incubates. You gain the following
benefits.
Ability Score Increase. Increase your Constitution
or Intelligence score by 1, to a maximum of 20.
Psionic Energy Dice. The Psionic Energy Dice
granted to you by this feat path become d8s.
Telepathy. You have Telepathy with a range of 10
feet. If you already have Telepathy, your range
increases by 10 feet.
Warding Backlash. You always have the Shield
spell prepared. Intelligence is your spellcasting
ability for this spell. You can cast it without
expending a spell slot by expending a Psionic Energy
Die. You can also cast the spell using any spell slots
you have. When you expend a Psionic Energy Die to
cast the spell and cause the triggering attack to miss,
roll the expended die. The attacker takes Psychic
damage equal to the number rolled.

ULITHARID’S MIGHT
Path of Ceremorphosis Feat (Prerequisite: Tadpole
Host Feat)
The tadpole you ingested is mutating you into an
ulitharid, a rare type of illithid that boasts great
physical strength and mental power, as well as two
additional tentacles.
Ability Score Increase. Increase your Strength,
Dexterity, or Constitution score by 1, to a maximum
of 20.
Psionic Energy Dice. The Psionic Energy Dice
granted to you by this feat path become d8s.
Telepathy. You have telepathy with a range of 10
feet. If you already have telepathy, the range
increases by 10 feet.
Extended Tentacles. Two long tentacles sprout
from around your mouth. You can use these
tentacles to make an Unarmed Strike. When you’re
using these tentacles, your reach increases by 5 feet.

FULL CEREMORPHOSIS
Path of Ceremorphosis Feat (Prerequisite: Level 12+,
at Least Two Path of Ceremorphosis Feats)
You grow four tentacles around your mouth, your
head elongates, and your skin becomes purple and
slick with mucus. Your transformation into a mind
flayer is complete. You gain the following benefits.
Ability Score Increase. Increase your Intelligence
score by 1, to a maximum of 20.
Psionic Energy Dice. The Psionic Energy Dice
granted to you by this feat path become d10s. If they
are already d10s, they instead become d12s.
Aberration. Your creature type is Aberration.
Illithid Specialization. You excel at a particular
illithid talent. Choose one of the following benefits:
Brain-Seeking Tentacles. When you hit a creature
with an Unarmed Strike as part of the Attack
action on your turn, you can use both the Damage
and the Grapple option. You can expend a Psionic
Energy Die when you use this benefit to roll the
expended die. The target takes extra Psychic
damage equal to the number rolled plus your
Intelligence modifier, and it subtracts half the
number rolled (round up) from its saving throw to
avoid gaining the Grappled condition. If the target
is reduced to 0 Hit Points as a result of this benefit,
the Psionic Energy Die isn’t expended. You can use
this benefit only once per turn.
Mind Flayer Spells. You always have the Detect
Thoughts, Levitate, and Mind Blast spells prepared.
Intelligence is your spellcasting ability for these
spells. You can cast these spells without expending
a spell slot by expending a Psionic Energy Die. You
can also cast these spells using any spell slots you
have of an appropriate level.

©2019 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

6

Repeatable. You can take this feat more than
once, but you must choose a different option for
Illithid Specialization each time.

MIND BLAST
The Full Ceremorphosis feat grants the Mind Blast
spell, provided here:

MIND BLAST
Level 6 Evocation (Psion)
Casting Time: Action
Range: Self
Components: S
Duration: Instantaneous
You unleash a concussive burst of psionic energy. Each
creature in a 60-foot Cone originating from you makes
an Intelligence saving throw. On a failed save, the
creature takes 6d8 Psychic damage and has the
Stunned condition until the start of your next turn. On
a successful save, the creature takes half as much
damage only.
Using a Higher-Level Spell Slot. The damage
increases by 1d8 for each spell slot level above 6.

©2019 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

7


