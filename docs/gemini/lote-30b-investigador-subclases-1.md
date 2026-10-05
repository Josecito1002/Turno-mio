# Encargo: Lote 30b (Investigator, subclases 1 a 7 (Antiquarian a Exterminator... Infernum)) de la app "Mi turno"

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
Las subclases **Antiquarian, Archivist, Conspiracy Theorist, Containment Specialist, Detective, Exterminator e Infernum**, con todos sus rasgos (el texto empieza con la introducción a las subclases; las páginas traen también objetos mágicos que se piden en el lote 30d: ignóralos aquí).

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

Investigator Subclasses
An Investigator subclass is a specialization that grants
you features at certain levels, as specified in the subclass.

Antiquarian
Wield a Museum’s Worth of Powerful Arcane Trinkets
Festooned with magical trinkets from every corner of
the globe, Antiquarians have a tool for every occasion:
silver arrowheads for lycanthropes, heartwood stakes
for vampires, blessed relics for fiends, and so on. As they
expand their collections from piles of trinkets to veritable
museums, they become adept historians and arcanists,
familiar with the stories of every magic item in their care,
as well as how to use them in dire situations.

Level 3: Artifact Hoarder

You gain one additional use of your Trinkets before a
Long Rest.

Level 3: Trinkets

You can use the following trinkets.
Hateful Arrowhead. You can cast Ray of Enfeeblement
or Scorching Ray spell without a spell slot or components.
Warped Prism. You can cast Blur or Shield without a
spell slot or components.
Razortooth Bandages. You can cast Cure Wounds or
Inflict Wounds without a spell slot or components. When
you restore Hit Points or deal damage using one of these
spells using this trinket, you can add your Investigator
level to the healing or damage dealt.

Level 6: Arcane Relics

You’ve secured a handful of priceless relics with rare and
delicate enchantments. Once you use one of the following
relics, you can’t use this feature again until you finish a
Short or Long Rest.
Antediluvian Dynamo. You can cast Fireball or
Lightning Bolt without a spell slot or components.
Lich’s Deathmask. You can cast Counterspell or
Dispel Magic without a spell slot or components.
Mortal Coil. You can cast Animate Dead or Revivify
without a spell slot or components. When you cast
Animate Dead using this relic, all previous Undead
created using this relic crumble into dust.

Level 10: Magic Item Collection

When you finish a Long Rest, you can magically produce
a magic item. When you do so, all magic items previously
created by this feature vanish. If a magic item you
produce requires Attunement, you can attune yourself
to it the instant you produce it. You can produce the
following magic items: a Carpet of Flying, a Cloak of the
Bat, a Flame Tongue, Gauntlets of Ogre Power, an Instant
Fortress, a Ring of Regeneration, a Ring of Telekinesis, a
Sun Blade, or a Wand of Wonder.

Level 14: Soul Jar

You’ve secured the crown jewel of your collection: a lich’s
soul jar, or “phylactery.” Though the original owner’s soul
has been expelled from this accursed artifact, it retains
many of its magical properties.

Investigator Subclasses

8

Name

Description

Antiquarian

Festooned with powerful magical trinkets of all shapes and sizes

Archivist

A scholar who collects scraps of ancient lore

Conspiracy Theorist

Believes that every conspiracy theory is real, and is correct too often

Containment Specialist

Tracks down and contains hazardous arcana

Detective

Chases down clues and unravels crimes with their impressive intellect

Exterminator

Hunts down vampires, lycanthropes, and beasts that stalk the night

Infernum

Struck an infernal deal for trinkets and knowledge

Inquisitor

An agent of the church that performs exorcisms and roots out heresy

Kid Sleuth

Solves mysteries alongside their talking animal sidekick

Medium

Foretells events of the future using a magical connection to the dead

Occulstist

A magician borrowing spells from wizards and warlocks

Spy

Infiltrates with perfect disguises and unmatched charm

Time Operative

Manipulates time itself to best foes and solve mysteries

Complete Investigator

This magic item is always attuned to you and doesn’t
count against your total number of attuned magic items.
It has 5 charges and regains 1d4 + 1 expended charges
daily at dawn. While wearing the soul jar, you can expend
one or more charges to use the following abilities.
Temporary Hit Points. You can expend 1 charge as a
Bonus Action to gain Temporary Hit Points equal to your
Investigator level.
Trinket Recharge. You can expend 1 charge as
a Bonus Action to regain one expended use of your
Trinkets.
Undead Fortitude. When you are reduced to 0 Hit
Points and not killed outright, you can expend 2 charges
to drop to 1 Hit Point instead. You can use this benefit
only once per turn.
Draining Touch. As a Magic action, you can expend
3 charges to make a melee spell attack. On a hit, the target
takes 8d8 Necrotic damage and you regain Hit Points
equal to the Necrotic damage dealt. If the spell attack
misses, these charges aren’t expended.

Archivist
Expand Your Rituals Through Ancient Lore
Though most Investigators fill their grimoires with hardwon knowledge borne from encounters with supernatural
threats, some prefer to do bookkeeping instead. Such
Archivists seek to accumulate knowledge, more so than
trinkets, by spending untold hours digging through
disparate tomes of occult secrets and compiling them into
encyclopedic texts. Through their research, Archivists
become academic masters of the arcane and priceless
reservoirs of obscure knowledge.

Corpus
Investigator
Level
3

Alter Self, Jump

5

Gaseous Form

7

Fabricate

9

Passwall

Mentis
Investigator Level Spells

Level 3: Trinkets

You can use the following trinkets.
Aura Lenses. You can cast Detect Magic without a
spell slot or components.
Mnemonic Script. You can cast Memorize without a
spell slot or components.
Tongue Stone. You can cast Comprehend Languages
without a spell slot or components.

Level 3: Thesis

You gain access to certain spells associated with your
thesis. Choose one of the following subject areas for your
thesis: Corpus, Mentis, Mortis, or Oculus. Consult the
table below that corresponds to the chosen thesis; you add
the listed spells for your Investigator level to your grimoire
for free. The listed spells count as Investigator spells for
you and you treat them if they have the Ritual tag.
Whenever you gain an Investigator level, you can
replace your thesis with another one. The spells in your
grimoire corresponding to your thesis are magically
replaced with those of the new thesis for your Investigator
level.

Mage Hand Press

Spells

3

Charm Person, Zone of Truth

5

Major Image

7

Hallucinatory Terrain

9

Dream

Mortis
Investigator Level Spells
3

False Life, Gentle Repose

5

Speak with Dead

7

Death Ward

9

Antilife Shell

Oculus
Investigator Level Spells
3

Identify, Detect Thoughts

5

Sending

7

Locate Creature

9

Scrying

9

Level 6: Erudite Spell

When you cast a spell that forces a creature to make
a saving throw, you can give one target of the spell
Disadvantage on saves against the spell.
Once you use this feature, you can’t use it again until
you finish a Short or Long Rest. You can also restore your
use of it by expending a use of your Rushed Incantation
(no action required).

Level 10: Encyclopedic Expertise

You can identify any arcane effect from memory.
Whenever you see or hear a spell being cast or investigate
a magical effect, you can identify the spell that was cast,
the magic item responsible, or the creature that produced
the effect without an ability check. This feature fails to
identify spells, magic items, and creatures that are utterly
unique or are otherwise not recorded in arcane texts.

Level 14: Eidetic Memory

You can effortlessly duplicate spells you see or hear,
granting you the following benefits.
Ritual Recall. If you see or hear an Investigator spell
being cast, you can thereafter copy it into your grimoire.
Spell Duplication. When you see or hear a spell of
level 5 or lower being cast, you can fix the spell in your
mind. Within the next minute, you can expend a use of
your Rushed Incantation to cast the spell without a spell
slot. Once you use this benefit to cast a spell, you can’t do
so again until you finish a Long Rest.

Conspiracy Theorist

10

It’s hard to tell who They even are, apart from the fact
that They’re massively influential and have deep pockets.
They have agents everywhere, watching and waiting.
What are their goals? What are they working so hard to
keep secret? You can’t be totally sure, but you have a few
good theories.

Level 3: Paranoid Instincts
You have Advantage on Initiative rolls.

Level 3: Trinkets

You can use the following trinkets.
Masonic Charm. As a Bonus Action, you attach this
charm to a weapon you are holding. When you do so,
choose a number from 10–19. For 1 minute, your attacks
using the weapon score a Critical Hit on a roll of that
number or a 20 on the d20.
Three-Headed Coin. You give yourself Advantage on
one D20 Test before you roll the d20.
Unfathomable Metal. As a Bonus Action, you reveal
this trinket to a creature within 5 feet of you. At the
start of each of its turns for 1 minute, the target takes
2d6 Radiant damage and then makes a Constitution
saving throw. On a failed save, the effect continues. On a
successful save, the effect ends.

Level 6: Prepper

When you take the Ready action, you have Advantage on
D20 Tests you make for the Reaction. You can only use
this feature when the trigger is in response to another
creature’s action or movement after the end of your turn.

Unravel Far-Reaching, Incredulous Conspiracies

Level 10: Connect the Dots

The world is full of stuff that doesn’t add up. A natural
disaster strikes and they talk about theoretical weather
patterns. People forget days at a time and they say some
medical jargon about their brains. And nobody seems to
notice the folks dressed in black who lurk behind every
corner. It’s one big coincidence after another. But when
you ask the right questions and pull on the right threads,
you start uncovering the biggest mysteries: the ones They
don’t want you to know about.

Level 14: Off the Grid

When you finish a Short or Long Rest, choose one skill.
You gain proficiency in that skill if you lacked it and
Expertise with it. This proficiency and Expertise lasts
until you use this feature to choose a different skill.
Your ability to avoid others grants you the following
benefits.
Escape Plan. Whenever you take damage, you can
take a Reaction to have the Invisible condition until the
start of your next turn.
Nondetection. You can cast Nondetection on yourself
without a spell slot.

Complete Investigator

Containment Specialist
Contain and Conceal Anomalous Magic Artifacts
Though the study of magic is diverse and wonderous, it
contains mysteries better left unexplored. Such topics in
magic are seldom studied, for their very existence poses
an existential threat to the multiverse itself: chronomancy,
protomancy, and quantumancy are among the few graced
with names at all. When a sinister (or merely curious)
arcanist pulls on one of these threads of knowledge,
they open a Pandora’s box of unpredictable effects. The
results are usually catastrophic. Such dangerous arcana
leaves lasting scars on people and objects, metaphysical
reverberations of the terrible secrets at their source.
As their title implies, Containment Specialists are
tasked with tracking, isolating, and containing exotic
magic and its artifacts. Their job is hazardous and
challenging, but is of critical importance to the multiverse
at large. Containment Specialists often coordinate in
clandestine groups to triangulate new threats and ensure
isolated ones remain indefinitely contained. With some
luck, these organizations can remain obscure footnotes
for generations, further sheltering their secrets from
curious eyes.

Level 3: Cover Story

When you fail a Charisma (Deception) check or a creature
catches you in a lie, you can reattempt the check to
reassure the listener with another quick lie. On a success,
the listener believes you. Once you use this benefit, you
can’t use it again until you finish a Short or Long Rest.

Level 3: Trinkets

You can use the following trinkets.
Antibell. As a Bonus Action, you can cast Silence
without a spell slot or components.
Black Bag. As a Bonus Action, you can activate your
Black Bag, an item linked to numerous extradimensional
spaces, for 1 minute. While the bag is active, you can take
a Utilize action to place an item in the bag or retrieve one
from the bag. Any item placed within the bag is stored in
its own extradimensional space, which is suffused by an
Antimagic Field. The bag’s mouth is 2 feet in diameter. It
can hold up to 12 items, each weighing no more than 50
pounds, and weighs as much as the heaviest object stored
within it. When you retrieve an item from the bag, you
always grab the item you intended.
Cinnabar Compass. As a Bonus Action, you can cast
Locate Object without using a spell slot or components.

Level 6: Arcane Disruption

When you use your Exploit Weakness and the target has
the Magic Resistance trait, that trait doesn’t function until
the start of your next turn.

Mage Hand Press

Level 10: Nothing to See Here

With a blinding flash, you can overwrite the memories
of those around you. You can cast Modify Memory as an
action targeting up to 3 creatures within range without a
spell slot or components. You must modify the memories
of each creature affected by the spell in the same way.
Once you use this feature, you can’t do so again until
you finish a Long Rest.

Level 14: Containment Dimension

You can leverage a powerful quarantine procedure to
keep others safe from dangerous artifacts. As a Magic
action, you can create a pocket dimension that is an exact
duplicate of your surroundings at the moment you use
this feature—complete with duplicates of all the structures
and nonmagical items therein—and transport creatures
you choose within its area to the dimension. You decide
the exact area of the duplicate dimension, as long as its
total space fits within a 150-foot Cube.
While in the pocket dimension, you can only affect
and be affected by other creatures in that dimension.
You can’t see creatures and objects outside the pocket
dimension. Objects taken from the pocket dimension
vanish upon leaving it.
If a creature leaves the bounds of the pocket
dimension it appears in the corresponding space on
the plane it left. If it appears in an occupied space, it is
shunted to the nearest unoccupied space and takes 4d6
Force damage.
The pocket dimension lasts for 10 minutes, and ends
early if you have the Incapacitated condition, the pocket
dimension contains no creatures, or you dismiss it (no
action required). When the pocket dimension ends, all
creatures and objects are returned to the plane they left in
their corresponding locations.
Once you use this feature to create a pocket
dimension, you can’t do so until you finish a Long Rest.

Detective
Chase Down Clues and Crack the Mystery
Prowling at the edge of darkness, Detectives chase down
clues and pull on threads to unravel conspiracies that
bring darkness into the world. Sometimes, this requires
that you infiltrate a cult’s secret meetings, other times it
calls on you to reconstruct a person’s last moments at a
murder scene. No matter what the mystery, however, you
know that there is always an explanation.

Level 3: Uncanny Hunch

Whenever you make an Intelligence check or a Wisdom
(Insight) check, you can gain a bonus to the check equal
to your Investigator level.
You can use this feature a number of times equal to
your Intelligence modifier (minimum of once), and you
regain all expended uses when you finish a Long Rest.

11

Level 3: Trinkets

You can use the following trinkets.
Fogstone Periapt. You can cast Misty Step without a
spell slot or components.
Glass Medallion. As a Bonus Action, you can cast
Invisibility on yourself without a spell slot or components.
Skeleton’s Key. As a Bonus Action, you can cast
Knock without a spell slot or components. When you cast
the spell using this trinket, its casting is silent.

Level 6: Predictive Intuition

As a Bonus Action, you can examine the movements of a
creature you can see within 30 feet of yourself. Until the
start of your next turn, you can add 1d6 to attack rolls
you make against the target, and the target subtracts 1d6
from all its attack rolls against you. Once you use this
Bonus Action on a target, you can’t use it on that target
again until you finish a Short or Long Rest.

Level 10: Interrogator’s Instinct

Your sleuthing experience grants you the following
benefits.
Enchantment Detection. You discern if a creature
is cursed, possessed, or has the Charmed or Frightened
conditions.
Illusion Detection. You have Advantage on any
ability check you make to discern an illusion.
Lie Detection. You have Advantage on any ability
check you make to determine if you hear a deliberate lie.

Level 14: Power of Deduction

You can use your Predictive Intuition on a target an
unlimited number of times.

Exterminator
Slay Vampires, Werewolves, and Other Terrible Creatures
An Exterminator suffers no monster to live. Trained in
the art of slaying Aberrations, Fiends, and Undead, you
stand against evil where others falter, and draw your
blade before others recognize a threat. Grand schemes
and plots are less important than retribution against
monsters which stalk the night, and your thirst for such
retribution is unquenchable. There is always another
werewolf to be slain, another vampire to be staked,
another demon to be banished; people rarely thank you,
but you find satisfaction enough in your work.

Level 3: Silvered Shield

Your monster hunting experience grants you the
following benefits.
Armor Training. You have training with Medium
armor and Shields.
Intelligent Defense. While wearing Medium armor,
you can add your Intelligence, instead of Dexterity, to
your Armor Class.

12

Level 3: Trinkets

You can use the following trinkets.
Consecrated Whetstone. As a Bonus Action, you can
cast Magic Weapon once without a spell slot or components.
Gilded Dragon Scale. As a Bonus Action, choose
Acid, Cold, Fire, Force, Lightning, Poison, or Thunder
damage. You gain Resistance to the chosen damage type
for 1 minute.
Mimic-Tooth Necklace. When you hit a creature with
an attack using a weapon, you can take a Bonus Action to
deal an extra 2d8 Acid damage to the creature.

Level 6: Monster Slayer

As a Bonus Action, you can make one attack with a
weapon or an Unarmed Strike. You can use this feature
a number of times equal to your Intelligence modifier
(minimum of once). You regain all expended uses when
you finish a Short or Long Rest.

Level 10: Silvered Edge

Your monster-killing expertise grants you the following
benefits.
Flexible Mastery. When you attack with a weapon
whose mastery property you can use, you can replace that
property with the Sap or Vex property for that attack.
Supernatural Strikes. Whenever you deal damage
with a weapon, it can deal your choice of Force damage or
its normal damage type.

Level 14: Killer Instinct

You can use your Exploit Weakness twice on your turn,
but can’t use it against the same target more than once.

Infernum
Bargain with Fiends for Infernal Powers
The Infernum are Investigators in league with Fiends,
either willingly to pursue nefarious ends or unwillingly
as the result of an infernal bargain. Each is given a set of
enigmatic goals and a fiendish overseer (often an Imp),
then left entirely to their own devices. Many search and
scrounge for a solution to their fiendish bargain or opt
for malicious compliance, delivering upon their infernal
directives while undermining their broader schemes.
Others, however, revel in their dark alliance, gleefully
hoping to climb the fiendish ranks.

Level 3: Fiendish Familiar

Your infernal masters have assigned a lesser fiend to
supervise and assist you. You add Find Familiar to your
grimoire for free. You can use Rushed Incantation to cast
the spell without expending a use of the feature, and you
don’t need to read from your grimoire to cast it. The spell
is improved in the following ways when you cast it.
Fiendish Options. You can choose only the
following options for your familiar: Imp, Quasit, or
Pseudodragon. A pseudodragon summoned with this
spell knows Common and is a Fiend.

Complete Investigator
