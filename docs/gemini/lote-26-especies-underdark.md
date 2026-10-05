# Encargo: Lote 26 (especies del Underdark) de la app "Mi turno"

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
Las 5 especies de Underdark Options 2: **Deep Imaskari, Drider, Illithidkin, Kuo-toa y Myconid**, con todos sus rasgos (tamaño, velocidad, rasgos y las elecciones que ofrezcan). Ninguna trae linajes; si alguna ofrece opciones a elegir, ponlas como elección en B.

## Formato de la respuesta
=== A ===
TypeScript `export const ESPECIES_PLAYTEST = { 'clave': { n: 'Nombre', t: 'Mediano', vel: 30, rasgos: [ { nombre, texto } ] } }` con 1 a 4 frases propias por rasgo.
=== B ===
JSON de lo que se calcula o elige (velocidades, resistencias, usos con `pb`, elecciones).
=== C ===
JSON `{ "clave": "Unearthed Arcana Underdark Options 2 (2026)" }`.
=== D ===
JSON `{ "clave": "1 o 2 frases que presenten la especie" }`.
=== E ===
Dudas o [NO CONFIRMADO].


## Texto oficial (fuente única)

### Documento: Underdark Options 2 (2026)

UNEARTHED ARCANA 2026

UNDERDARK OPTIONS 2
This playtest document is part of a series of
Unearthed Arcana articles that present material
designed for upcoming products. The material here
uses the rules in the Player’s Handbook.

WHAT’S INSIDE
This document presents three new subclasses:
• Cleric (Freedom Domain)
• Druid (Circle of Spores)
• Sorcerer (Faerzress Sorcery)
This document also includes five new species.

CONTENT WARNING
This material contains descriptions of body horror
and mind control that some readers might find
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

SUBCLASSES
This section presents the following subclasses:
Freedom Domain, Circle of Spores, and Faerzress
Sorcery.

FREEDOM DOMAIN (CLERIC)
Spread Liberty and Break Chains
The Freedom Domain provides magic of liberation,
movement, and free thought. Clerics use this magic
to inspire hope among the oppressed, to help
prisoners break free from their cages, and to lead
revolutions in which toiling laborers throw off the
chains of oppressive rule.
Gods of freedom embody free will, choice, and
rebellion against tyrannical regimes or stifling
traditions. These deities protect everyone’s right to
determine their own destiny. In the Underdark,
Eilistraee and Sehanine Moonbow both stand for
freedom. Surface dwellers devoted to the cause of
freedom might worship Ilmater or Meilikki instead.

THE MEANING OF FREEDOM
“Freedom” means different things to different
people; when Clerics of the Freedom Domain gather,
they often debate which aspect of freedom is most
important. You can roll on or choose a result from
the Foremost Freedom table to inspire your
character’s stance toward freedom.

FOREMOST FREEDOM
1d6
1
2
3
4
5
6

The Most Important Freedom Is …
Freedom from starvation and poverty.
Freedom to choose your own path in life.
Freedom from tyranny and oppression.
Freedom to control your body and mind.
Freedom from nature’s physical laws.
Freedom from all moral codes.

LEVEL 3: FREEDOM DOMAIN SPELLS
Your connection to this divine domain ensures you
always have certain spells ready. When you reach a
Cleric level specified in the Freedom Domain Spells
table, you thereafter always have the listed spells
prepared.

FREEDOM DOMAIN SPELLS
Cleric Level
3
5
7
9

Prepared Spells
Expeditious Retreat, Jump, Knock,
Misty Step
Fly, Gaseous Form
Dimension Door, Freedom of
Movement
Passwall, Tree Stride

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

1

LEVEL 3: INVOKE LIBERTY
As a Magic Action, you present your Holy Symbol
and expend a use of your Channel Divinity. Each
allied creature within a 30-foot Emanation
originating from you can end one of the following
conditions on itself (its choice): Frightened,
Grappled, Paralyzed, or Restrained. The creature can
then use its Reaction to move up to its Speed
without provoking Opportunity Attacks.
When you reach Cleric level 9, the list of
conditions your allies can choose to end expands to
include Charmed and Petrified.

LEVEL 3: UNENCUMBERED GRACE
While you aren’t wearing armor, your base Armor
Class equals 10 plus your Dexterity and Wisdom
modifiers. You can use a Shield and still gain this
benefit.
In addition, you gain Proficiency in Acrobatics. If
you already have Proficiency in Acrobatics, you gain
Expertise in it instead.

LEVEL 6: UNSTOPPABLE
You mystical connection to freedom allows you to
swiftly navigate obstacles. Your movement is
unaffected by Difficult Terrain.
In addition, you gain proficiency in Dexterity
saving throws. If you already have this proficiency,
you instead gain proficiency with one saving throw
in which you lack it.

LEVEL 17: AVATAR OF FREEDOM
As a Bonus Action, you can manifest a 30-foot
Emanation that surrounds you for 10 minutes. It
ends early if you dismiss it (no action required) or
have the Incapacitated condition. This Emanation
has the following effects:
• Whenever an ally enters the Emanation for the
first time on a turn or starts its turn there, the
ally’s Speed increases by 30 feet until the end of
the ally’s next turn.
• The movement of allies within the Emanation is
unaffected by Difficult Terrain.
• Allies within the Emanation have Advantage on
Dexterity checks.

CIRCLE OF SPORES (DRUID)
Steward the Cycle of Life, Death, and Decay
Druids of the Circle of Spores find beauty in decay.
They revere the ability of mold and other fungi to
grow from and transform lifeless material. These
Druids believe that life and death are parts of a
grand cycle, where each stage feeds into the next.
Druids of the Circle of Spores also see undeath as a
part of this grand cycle so long as it’s temporary. But
all things must eventually decompose to make room
for new life. Undead that seek to replace all life with
undeath or that try to avoid passing to a final rest
violate the cycle and must be thwarted.

DESIGN NOTES: CIRCLE OF SPORES UPDATES
Here are the main updates in this subclass since its
appearance in Tasha’s Cauldron of Everything (2020):
Halo of Spores. Halo of Spores is an Emanation that
grants telepathy. It also has a lesser effect on
creatures that succeed on their saving throws,
instead of having no effect.
Symbiotic Entity. Empowering your spores with
Symbiotic Entity uses a Bonus Action (like Wild
Shape).
Fungal Infestation. When you raise zombies with
Fungal Infestation, you can grant them some of your
Temporary Hit Points (since you get a lot of those!).
Explosive Burst. Explosive Burst is a new feature
(replacing Spreading Spores) that causes your
zombies to explode when they die, spreading spores
around them and dealing damage to enemies.
Fungal Body. Fungal Body now allows you to tap into
the mycelial network you’ve cultivated to control
your body if you have the Unconscious condition.

FUNGAL SYMBIOSIS
Druids of this circle develop a symbiotic relationship
with a special type of fungal spore. In exchange for
the spores’ propagation, they protect the druid and
empower their magic. You can roll on or choose a
result from the Spore Druid Origins table to inspire
your first encounter with your spores.

Once you use this ability, you can’t do so again
until you finish a Short or Long Rest.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

2

SPORE DRUID ORIGINS
1d6

You First Encountered Your Spores When
…
You ingested a mushroom you definitely
should not have.
You searched a rotting corpse and inhaled
the burst of gas spores that erupted from
its chest.
An aging archdruid passed their spores—
and their duty to propagate said spores—
on to you.
You participated in a myconid melding
ceremony.
You died, and a powerful myconid
sovereign took pity and reanimated you.
Psilofyr the Spore Lord visited your dreams
to waken your abilities.

1
2

3

4
5
6

LEVEL 3: CIRCLE SPELLS
When you reach a Druid level specified in the Circle
of Spores Spells table, you thereafter always have
the listed spells prepared.

CIRCLE OF SPORES SPELLS
Druid Level
3
5
7
9

Prepared Spells
Blindness/Deafness, Charm Person,
Chill Touch
Animate Dead
Confusion
Contagion

LEVEL 3: HALO OF SPORES
Invisible spores fill a 10-foot Emanation originating
from you, providing you with a telepathic link to
those who step inside. You have telepathy with a
range of 10 feet. If you already have telepathy, your
range increases by 10 feet.
Additionally, when a creature you can see moves
into your Emanation or starts its turn there, you can
use your Reaction to infect the creature with your
spores. The target makes a Constitution saving
throw against your spell save DC. On a failed save,
the target takes 1d4 Necrotic damage. On a success,
the target has Disadvantage on its next attack roll
before the end of its turn.
The Necrotic damage increases to 1d6 at 6th level,
1d8 at 10th level, and 1d10 at 14th level.

LEVEL 3: SYMBIOTIC ENTITY
As a Bonus Action, you can expend a use of your
Wild Shape feature to waken your spores, rather
than for shape-shifting. When you waken your
spores, you gain a number of Temporary Hit Points
equal to four times your Druid level. This awakening

lasts for 10 minutes. It ends early if you dismiss it
(no action required), have the Incapacitated
condition, or use this feature again. While your
spores are awakened, you gain the following
benefits.
Deadly Halo. When you deal your Halo of Spores
damage, roll the damage die a second time and add
the number rolled to the total.
Entropic Empowerment. Once per turn, you can
deal an extra 1d6 Necrotic damage to a target you hit
with a melee attack roll using a weapon or an
Unarmed Strike.

LEVEL 6: FUNGAL INFESTATION
Your spores can infest a corpse and animate it. If a
Beast or Humanoid that is Small or Medium dies
within 10 feet of you, you can take a Reaction to
reanimate it, causing it to stand up immediately with
1 Hit Point. If your Symbiotic Entity feature is active,
you can transfer any number of Temporary Hit
Points you have to your reanimated creature as part
of this Reaction.
The creature uses the Zombie stat block in the
Player’s Handbook. It remains animate for 1 hour, at
which time it dies. The animation ends early if you
end it as a Bonus Action or if the zombie drops to 0
Hit Points.
The zombie is an ally to you and your allies. In
combat, the zombie shares your Initiative count, but
it takes its turn immediately after yours. It obeys
your mental commands (no action required by you).
If you don’t issue any, it takes the Dodge action and
uses its movement to avoid danger.
You can use this feature a number of times equal
to your Wisdom modifier (minimum of once), and
you regain all expended uses of it when you finish a
Long Rest.

LEVEL 10: EXPLOSIVE BURST
When an Undead creature you created dies, it
explodes in a burst of spores. Each creature you
choose within 10 feet of the dead creature makes a
Constitution saving throw against your spell save
DC, taking 2d8 Necrotic damage on a failure or half
as much on a success.

LEVEL 14: FUNGAL BODY
You have Immunity to the Blinded, Deafened,
Frightened, and Poisoned conditions. Any Critical Hit
against you counts as a normal hit instead, unless
you have the Incapacitated condition.
Additionally, if you have the Unconscious
condition, your spores take over your body’s motor
functions to steer you to safety. The Unconscious
condition doesn’t make your Speed 0. On your turn,
your spores direct your movement, keeping you
near allies and away from danger.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

3

FAERZRESS SORCERY

LEVEL 3: FAERZRESS SPELLS

Wield the Weird Radiation of the Underdark.

When you reach a Sorcerer level specified in the
Faerzress Spells table, you thereafter always have
the listed spells prepared.

You have been mutated by faerzress, the uncanny
radiation Lolth used to shape the Underdark eons
ago. Perhaps you or one of your ancestors was born
within a region of the Underdark saturated by
faerzress, or you spent many years in such a place.
Regardless, your body has now adapted to
faerzress, which sizzles within your body like fluid
electricity. Your senses penetrate the magical static
faerzress creates, and you can find pathways
through faerzress that allow you to scry and
teleport. You are unhindered by faerzress’s
detrimental effects, and you can throw faerzress at
enemies or fill entire chambers with lingering
radiation.

FAERZRESS EFFECTS
Faerzress is a magical radiation that shapes and
protects the Underdark. Faerzress has a number of
magical effects, including the following:
• Creatures within an area affected by faerzress
automatically succeed on saving throws against
Divination effects. Magical sensors and invisible
eyes, such as those created by the Clairvoyance
and Arcane Eye spells, can’t enter an area
affected by faerzress.
• A creature teleporting a distance of 1 mile or more
can’t teleport into or out of an area affected by
faerzress.
• An area affected by faerzress is illuminated by Dim
Light, but creatures using Darkvision within
such an area see in color and have Advantage on
Wisdom (Perception) checks relying on sight.

FAERZRESS SIDE EFFECTS
Exposure to faerzress has mutated you, and you
continue to emit trace amounts of this weird,
invisible, magical radiation. This can have
unpredictable effects on the environment or on
creatures near you. You can roll on or choose a
result from the Faerzress Side Effects table to inspire
your character.

FAERZRESS SIDE EFFECTS
1d6
1
2
3
4
5
6

FAERZRESS SPELLS
Sorcerer Level
3
5
7
9

Prepared Spells
Faerie Fire, Magic Weapon, Misty
Step, Witch Bolt
Nondetection, Sending
Arcane Eye, Stone Shape
Passwall, Scrying

LEVEL 3: FAERZRESS ZONE
As a Magic action, you can spend 3 Sorcery Points to
fill an area within 120 feet of you and no larger than
a 40-foot Cube with faerzress. The faerzress lasts for
24 hours and has the effects in “Faerzress Effects”
above. If you fill the same area with faerzress every
day for 365 days, the faerzress becomes permanent.

LEVEL 3: IMMUNITY TO FAERZRESS
You ignore the detrimental effects of faerzress (see
“Faerzress Effects”).
Creatures within an area affected by faerzress
don’t automatically succeed on saving throws
against your Divination spells. Magical sensors and
invisible eyes created by spells you cast—such as
Clairovoyance and Arcane Eye—can enter an area
affected by faerzress.
When you teleport yourself or other creatures, the
teleporting creatures can teleport into or out of an
area affected by faerzress regardless of the distance
teleported.

LEVEL 6: FAERZRESS AFFINITY
You gain Resistance to Lightning damage. You also
gain Darkvision with a range of 60 feet. If you
already have Darkvision, its range increases by 30
feet. Unlike with ordinary Darkvision, you discern
color in Darkness.
In addition, you have Advantage on Wisdom
(Perception) checks to see in Dim Light or Darkness.
Finally, your Immunity to Faerzress feature also
applies to allies within 30 feet of you.

You Emit Faerzress Radiation That …
Curdles milk and sours wine.
Causes anxiety in animals.
Stimulates the growth of Underdark plants.
Tints colors toward blue and violet.
Sometimes gives you a splitting headache.
Can be heard as a faint, high-pitched
buzzing noise.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

4

LEVEL 14: FAERZRESS SPELL
When one or more creatures fails a saving throw
against a spell you cast, you can spend 1 Sorcery
Point to lace one target that failed the save with
faerzress. The target is subject to the following
effects for 1 minute:
• The creature can’t teleport.
• The creature can’t cast Divination spells.
• The creature has Disadvantage on saving throws
against Divination spells.

LEVEL 14: FAERZRESS STEP
You always have the Teleport spell prepared and can
cast it once without expending a spell slot. You
regain the ability to cast the spell in this way when
you finish a Long Rest.
In addition, whenever you roll on the
Teleportation Outcome table, you can choose any
outcome available for your familiarity.

LEVEL 18: FAERZRESS FORM
When you use your Innate Sorcery, you can turn
yourself into pure faerzress energy. While in this
form, you retain your general shape, personality, and
memories, as well as the ability to speak; any
equipment you’re wearing or carrying doesn’t
transform with you, but you can continue using that
equipment while in this form. Your game statistics
remain the same, apart from the following changes:
Condition Immunities. You have Immunity to the
Grappled, Paralyzed, Petrified, Poisoned, Prone,
and Restrained conditions.
Damage Resistances. You have Resistance to every
damage type except Force and Psychic.
Movement. You have a Fly Speed equal to your
Speed and can hover. You can move through other
creatures and objects as if they were Difficult
Terrain, but you take 5 (1d10) Force damage if
you end your turn inside an object.
You revert to your true form after 1 minute, if you
choose to end the transformation (no action
required), or if you die.
Once you have used this ability, you can’t do so
again until you finish a Long Rest or spend 7 Sorcery
Points (no action required) to restore your use of it.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

5

SPECIES
This section presents five new species.

DEEP IMASKARI
Millennia ago, remnants of the human empire of
Imaskar fled into the bowels of the Underdark and
sealed themselves away. To survive in total
darkness, they harnessed the power of Unlight to
create their Great Seal, which acts as a synthetic sun.
Their descendants, the deep imaskari, have spent
millennia basking in that sun’s radiation and are
now infused with its magic.
Deep imaskari’s bodies have been warped by
Unlight exposure. Colorless, glowing crystals
protrude from their skin. Their eyes are a piercing
golden-white, and their hair is often black, white, or
gray. Deep imaskari live as long as humans do.

A
DEEP IMASKARI TRAITS
Creature Type: Humanoid
Size: Medium (about 4–6 feet tall) or Small (about 2–4
feet tall), chosen when you select this species
Speed: 30 feet
As a Deep Imaskari, you have these special traits.
Photoresistant. You have Resistance to Radiant
damage.
Resourceful. You gain Heroic Inspiration
whenever you finish a Long Rest.
Unluminescent. As an action, you can will the
crystals protruding from your body to glow with
Unlight. You shed Bright Light in a 5-foot radius until
you use an action to stop the effect. Your crystals
stop glowing if you die or have the Unconscious
condition.
Aura of Unlight. When you reach character level
3, you can use a Bonus Action to create an Aura of
Unlight that sheds Bright Light in a 10-foot
Emanation originating from you.
Choose one of the options below each time you
create the aura; the aura lasts for 1 minute or until
you end it (no action required), and once you create
this aura, you can’t do so again until you finish a
Long Rest:
Abjuring Unlight. You and your allies in the aura
gain a bonus to AC equal to half your Proficiency
Bonus (round down).
Brilliant Unlight. Creatures other than your allies
that start their turn within the Emanation must
succeed on a Constitution saving throw (DC 8 plus
your Charisma modifier and Proficiency Bonus) or
have the Blinded condition until the end of your
next turn.

Corrupting Unlight. When you deal damage to a
creature with an attack or a spell, you can change
the damage type to Radiant. Additionally, you can
roll one of your unexpended Hit Point Dice and
deal extra Radiant damage equal to the number
rolled. That die is then expended.

DRIDER
Skulking through Underdark caverns on their eight
legs, driders bear the Spider Queen’s curse. Each has
the head and torso of a drow but the body of a giant
spider. Some driders have additional spider-like
features, such as eight eyes or small fangs.
Driders are powerful hunters, capable of climbing
along webs and walls, creating webs, and shooting
caustic acid. Driders live as long as elves do, around
750 years.

A
DRIDER TRAITS
Creature Type: Monstrosity
Size: Medium (about 6–8 feet tall)
Speed: 30 feet
As a Drider, you have these special traits.
Arachnid Build. You count as one size larger
when determining your carrying capacity.
Darkvision. You have Darkvision with a range of
120 feet.
Spells of the Spider Queen. You know the Dancing
Lights cantrip. When you reach character level 3, you
always have the Faerie Fire spell prepared. When
you reach character level 5, you always have the
Web spell prepared. You can cast each of these spells
once without a spell slot. Once you cast either of
these spells with this trait, you can’t cast that spell
with it again until you finish a Long Rest. You can
also cast these spells using any spell slots you have
of the appropriate level.
Intelligence, Wisdom, or Charisma is your
spellcasting ability for the spells you cast with this
trait (choose the ability when you select this
species).
Spider Climb. You have a Climb Speed equal to
your Speed. When you reach character level 3, you
can move up, down, and across vertical surfaces and
along ceilings while leaving your hands free.
Web Walker. You ignore movement restrictions
caused by webs, and you know the location of any
other creature in contact with the same web.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

6

ILLITHIDKIN

KUO-TOA

Illithidkin are the wretched byproduct of mind flayer
experimentation on humanoid test subjects. These
hybrid creatures are bipedal and retain some of the
features of their original form, but they also bear
some features of a mind flayer—purple skin,
wriggling tentacles, and a fledgling psionic aptitude.
An illithidkin typically has the same life
expectancy as their original species , but in some
cases the transformation adds years or even decades
to—or subtracts as much from—that life expectancy.

Kuo-toa’s origins are hotly debated, even among
kuo-toa themselves. They claim their empires once
ruled both land and sea on multiple worlds, though
they disagree on what brought their empires to their
knees and drove many kuo-toa into the Underdark.
Kuo-toa therefore resent all forces that could have
ended this empire: civilizations that walk in the
light, natural disasters, and any god that leaves their
prayers unanswered.
Kuo-toa are fishlike humanoids with slimy bodies
and scales that change color with extreme emotions,
such as anger or terror. They often smell of rotting
fish, an exquisite scent they magnify with fine
perfumes of their own creation. They have a life
expectancy of about 60 years.

A
ILLITHIDKIN TRAITS
Creature Type: Humanoid
Size: Medium (about 5–6 feet tall) or Small (about 2–4
feet tall), chosen when you select this species
Speed: 30 feet
As an Illithidkin, you have these special traits.
Darkvision. You have Darkvision with a range of
120 feet.
Psionic Aptitude. You know the Mage Hand
cantrip, and you can make the spectral hand
Invisible. When you reach character level 3, you
always have the Command spell prepared. When you
reach character level 5, you always have the Levitate
spell prepared. You can cast each of these spells once
without a spell slot. Once you cast either of these
spells with this trait, you can’t cast that spell with it
again until you finish a Long Rest. You can also cast
the spell using any spell slots you have of the
appropriate level.
Intelligence, Wisdom, or Charisma is your
spellcasting ability for the spells you cast with this
trait (choose the ability when you select this
species).
Sharpened Mind. You have Resistance to Psychic
damage. You also have Advantage on saving throws
you make to avoid or end the Charmed condition.
Telepathy. You have telepathy with a range of 30
feet.

MYSTERIOUS DEITIES
Most knowledge of the full kuo-toa pantheon has
been lost to time. Kuo-toa can’t agree on the names
of these deities, what forms they take, or what these
deities desire. Without a central religious authority,
some archpriests invent new idols based on the
omens they read. They often lead their villages to
venerate krakens, aboleths, or demon lords as the
avatars of deities or as deities in their own right.
Devotion to such beings often results in the kua-toa’s
prolonged servitude to a malevolent power or to
their outright ruin.
To placate their deities, kuo-toa assemble bizarre
idols with mismatched pieces inspired by crabs, eels,
shrimp, or kuo-toa, often adorned with masses of
writhing tentacles. Through a process only a few
kuo-toa understand, these idols draw the attention
of supernatural powers. Sometimes, they even come
to life.

A
KUO-TOA TRAITS
Creature Type: Humanoid
Size: Medium (about 5–6 feet tall)
Speed: 30 feet
As a Kuo-toa, you have these special traits.
Amphibious. You can breathe both air and water.
Additionally, you have a Swim speed equal to your
Speed.
Slippery. You have advantage on saving throws to
avoid or end the Grappled and Restrained
conditions.
Deific Manifestation. You always have the Find
Familiar spell prepared and can cast it without
material components. You can cast it once without a
spell slot, and you regain the ability to cast it in this
way when you finish a Long Rest.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

7

When you cast the spell, you choose one of the
normal forms for your familiar or one of the
following special forms: Homunculus or Myconid
Sprout. The familiar’s creature type is Celestial.
Additionally, your familiar’s form is a divine blend
of multiple creatures. When you cast this spell,
choose a second form from the available options.
Your familiar gains one action, Reaction, or trait
from that second form.

MYCONID
Myconids are bipedal fungal folk who live in closeknit, insular circles. Like mushrooms, they come in
many different shapes, sizes, and colors. Some
myconids whose circles have had contact with other
civilizations have developed features resembling
those of other species, such as mouths for speaking
or bright-colored caps and ruffles that look like
clothing.
Myconids have relatively short lifespans. They
might live a 25 years before returning to the soil to
fertilize the next generation of their circle.

A
MYCONID TRAITS
Creature Type: Plant
Size: Medium (about 4–7 feet tall) or Small (about 2–4
feet tall), chosen when you select this species
Speed: 30 feet
As a Myconid, you have these special traits.
Darkvision. You have Darkvision with a range of
120 feet.
Telepathy. You have telepathy with a range of 30
feet.
Rapport Spores. As an action, you expel spores in
a 30-foot Emanation originating from yourself.
Creatures in the area with an Intelligence score of 2
or higher that aren’t Constructs, Elementals, or
Undead gain telepathy within a range of 30 feet for 1
hour. Once you use this trait, you can’t do so again
until you finish a Long Rest.
Skill Meld. When you finish a Long Rest, you can
perform a melding ritual to share knowledge and
experiences. When you do so, choose up to six allies
(which can include yourself) within 30 feet of
yourself to partake in the ritual and a skill
proficiency that at least one participant has
proficiency in. The chosen creatures each have
proficiency in that skill until they finish a Long Rest.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

8


