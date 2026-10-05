# Encargo: Lote 36a (Craftsman Complete) de la app "Mi turno"

"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el formato de
abajo, lo que se pide, usando **solo el texto en inglés que viene al final**: material de la comunidad (Valda's Spire of Secrets (reglas 2014)), no oficial de
Wizards. Esta es la parte 1 de 5 de este material. Otra persona revisa y aplica tu respuesta con un script, así que el formato tiene que
ser exacto. Si te adjuntan el PDF, úsalo para confirmar tablas y datos que el texto traiga desordenados (viene en dos columnas).

## Reglas
1. **No resumas.** Cada rasgo, opción, conjuro, objeto o subclase conserva TODAS sus reglas: cada condición, excepción y limitación. Largo no es problema.
2. **Cifras siempre.** Dados, distancias, duraciones, CD, usos y niveles exactos ("2d8", "30 pies", "1 minuto"). Si no puedes confirmar una cifra, escribe [NO CONFIRMADO] en vez de inventarla.
3. **Español de D&D** con la terminología del Manual del Jugador 2024 en español ("acción adicional", "tirada de salvación", "Dado de Golpe", "ventaja/desventaja", condiciones, tipos de daño…). Redacta con tus palabras, sin copiar traducciones de libros.
4. **Nombres:** traduce los que tengan traducción evidente o conocida; si propones una, márcala (PROPUESTA) y deja el original entre paréntesis. Deja en inglés los nombres propios y de lore sin traducción conocida. Conjuros que ya existen: su nombre oficial en español del Manual del Jugador 2024; los nuevos: traducción evidente con el original entre paréntesis, o el inglés.
5. Tipos de acción para `t`: accion, adicional, reaccion, gratis (sin acción), pasiva, fuera (fuera de combate o ritual).
6. Sin `[cite: n]` ni notas de fuente dentro de los textos. Si la respuesta es larga, termina una parte y avisa en cuál quedaste para continuar cuando te escriba "continúa".
7. Responde solo con las partes pedidas, cada una con su marcador en una línea (`=== A ===`, `=== B ===`…).
8. Usa los términos de reglas 2024 cuando el original use reglas de 2014 solo si equivalen sin cambiar el efecto (por ejemplo "Acción de Magia"); no cambies cifras ni efectos. La adaptación a 2024 la hace quien revisa.

## Qué se pide
Todo lo que traiga este fragmento: rasgos de clase por nivel (si es la parte que trae la clase), subclases (con todos sus rasgos), opciones a elegir (estilos, maniobras, disciplinas, gremios, etc.), conjuros nuevos, objetos mágicos y dotes. Si el fragmento empieza o termina a mitad de algo, tradúcelo igual y márcalo en E.

## Formato de la respuesta
=== A ===
TypeScript con `export const ...` por cada cosa, igual que la Investigator/Psion de la app: la clase (`n, dado, sv, habN, habs, arm, armas, equipo, rasgos: [{ nombre, t, texto, n (nivel), usos, reset }]`), cada subclase (`clave-en-minusculas: { n, rasgos: [...] }`), opciones elegibles (`nombre: texto`), conjuros nuevos (`nombre, nivel, escuela, tiempo, alcance, componentes, duracion, desc, clases`) y objetos mágicos (`nombre, rareza, tipo, sintonia, texto`).
=== B ===
JSON de lo que se calcula: tabla por nivel, usos con fórmula y reinicio ("corto", "largo", "ninguno"), conjuros siempre preparados, listas de elección.
=== C ===
JSON `{ "clave": "Craftsman (Valda's Spire of Secrets)" }` para la clase y cada subclase.
=== D ===
JSON `{ "clave": "1 o 2 frases que presenten la clase o subclase" }`.
=== E ===
Dudas, cortes de texto o [NO CONFIRMADO].

## Texto fuente (Craftsman (Valda's Spire of Secrets))

[Página 1]


[Página 2]
Table of Contents
Chapter 1: Craftsman .......................................................................................................................................... 1
Class Features ................................................................................................................................................. 2
Artisans’ Guilds .............................................................................................................................................. 5
Masterwork Properties ...............................................................................................................................20
Weapon Properties .......................................................................................................................................20
Armor Properties ......................................................................................................................................... 26
Chapter 2: Exotic Arms and Armor ................................................................................................................ 30
Weapons.......................................................................................................................................................... 34
Armor .............................................................................................................................................................. 45
Ammunition ...................................................................................................................................................46
Explosives ....................................................................................................................................................... 48
Chapter 3: Advanced Crafting Rules ............................................................................................................. 50
Crafting Magic Items ................................................................................................................................... 51
Crafting Constructs .................................................................................................................................... 51
Increasing Productivity ............................................................................................................................. 52
Artist’s Touch ............................................................................................................................................... 54
Tools of the Trade ........................................................................................................................................55
Chapter 4: Additional Character Options .................................................................................................. 58
Feats ................................................................................................................................................................ 59
Spells ............................................................................................................................................................... 59

Product Identity: The following items are hereby identified as Product Identity, as defined in the Open Game License version 1.0a, Section 1(e), and are not
Open Content: All trademarks, registered trademarks, proper names (characters, deities, etc.), dialogue, plots, storylines, locations, characters, artwork, and
trade dress. (Elements that have previously been designated as Open Game Content or are in the public domain are not included in this declaration.)
Open Content: Except for material designated as Product Identity (see above), the game mechanics of this Mage Hand Press game product are Open Game
Content, as defined in the Open Gaming License version 1.0a Section 1(d). No portion of this work other than the material designated as Open Game
Content may be reproduced in any form without written permission.

Complete Craftsman is published by Mage Hand Press under the Open Game License version 1.0a. Copyright 2019 Mage Hand Press, LLC. All Rights
Reserved

[Página 3]
Chapter 1: Craftsman
A burly dwarf brings his hammer down on a glowing hunk
of steel, launching a shower of sparks into the air. Sweat
pours down his back, and his arms strain with each strike,
revealing thick cords of muscle, yet he does not tire. The
air resonates with the sound of metal impacting metal,
while the bright, hot piece of steel in his tongs begins to
take shape. Gradually, it flattens, widens, hardens, and
cools. He quenches the newly formed blade in an oil bath,
then sets his mind to preparations for polishing, sharpening,
and fitting the weapon with a handle and guard.
An elf threads a needle with an almost impossibly thin
metallic wire, preparing to set the stitches into a set of what
looks to be leather armor, but made of dragon's hide. She
checks the placement and attachment of the owlbear down
lining and ensures that her apprentice set the crystal studs
into the surface properly. Once satisfied, she sets about her
work in a flurry of dexterous stitches.
A gnome with an intricate set of goggles examines the
stock for his latest work, a portable ballista. He examines
the gearing and loading crank, ensures the tension on the
bowstring, and scans the bolt rail for imperfections. He
smiles, for he knows his work is without flaw.

Master of Craft

Creating a Craftsman
When you create your craftsman, the most important thing
to consider is your crafting expertise. Though all craftsmen
of adventuring stock can stitch leather armor, forge
weapons, and tinker with magic items, only those who
dedicate themselves to a single craft can attain legendary
works. Each type of craftsman, from the practical to the
wildly eccentric, have their place, but no craftsman can
specialize in everything.
Moreover, few craftsmen are self-taught. Most learn the
finer points of their craft under the tutelage of a master
artisan (whether or not their master was a craftsman, in the
conventional sense.) Did you study under a master, and if
so, what drove you to apprentice underneath them?
Lastly, consider how you view your work. Are you
pragmatic, viewing your creations as tools to serve a
purpose? Are you artistic, striving to craft pieces of
unrivalled beauty and perfection? Or are you experimental,
tinkering and building with wild
abandon to break new ground
and innovate on established
norms?

Artisans of all types are an integral part of every
culture: buildings must be erected, pots must be
set to the kiln, tools must be smithed. Despite
their pervasiveness, master craftsmen are still as
rare as they are prized. These artisans, creators,
and inventors can smith items of mythic quality,
and can solve most any problem simply by using
the right tool and the appropriate amount of force.

Secret of Steel
Adventuring craftsmen come in many varieties,
but nearly all leverage use their advanced
knowledge of metallurgy, smelting, and
construction to forge arms and armor rarely
seen, even by other adventurers. The smiths
test their schematics and designs themselves,
building prototypes and experimental gear
that can later be refined into
mass-production items.

1
magehandpress.com

[Página 4]
Proficiency
Level
Bonus

The Craftsman
Features

1st

+2

Bonus Proficiencies, Smithy

2nd

+2

Masterwork (Apprentice properties),
Tool Belt

3rd

+2

Guild

4th

+2

Ability Score Improvement

5th

+3

Extra Attack, Masterwork
(Journeyman properties)

6th

+3

Folded Steel

7th

+3

Guild feature

8th

+3

Ability Score Improvement

9th

+4

Rapid Modifications

10th

+4

Guild feature

11th

+4

Masterwork (Master properties)

12th

+4

Ability Score Improvement

13th

+5

Craftsman’s Strike

14th

+5

Guild feature

15th

+5

Uncanny Tool Belt

16th

+5

Ability Score Improvement

17th

+6

Masterwork (Legendary properties)

18th

+6

Guild feature

19th

+6

Ability Score Improvement

20th

+6

Magnum Opus

Quick Build
You can make a craftsman quickly by following these
suggestions. Make Intelligence your highest ability,
followed by Strength or Dexterity. Next, select Athletics
and Investigation as your skills.

Class Features
As a craftsman, you gain the following class features.

Hit Points
Hit Dice: 1d10 per craftsman level
Hit Points at 1st Level: 10 + your Constitution modifier
Hit Points at Higher Levels: 1d10 (or 6) + your
Constitution modifier per craftsman level after 1st

2
magehandpress.com

Proficiencies
Armor: All armor, shields
Weapons: Simple weapons, martial weapons
Saving Throws: Intelligence, Constitution
Skills: Two from: Arcana, Athletics, History, Investigation,
Medicine, Perception, and Persuasion

Equipment
You start with the following equipment, in addition to the
equipment granted to you by your background:
• A set of craftman’s tools
• A shield and (a) chain mail or (b) scale mail
• A dagger and (a) a warhammer or (b) any simple
weapon
• (a) a light crossbow and 20 bolts or (b) a shortbow and
20 arrows
• An explorer's pack and one kit you're proficient with

Bonus Proficiencies
Starting at 1st level, you are proficient with exotic
weapons, armor, and shields. You are also proficient with
all sets of artisan’s tools.

Smithy
At 1st level, you carry a set of craftsman’s tools, a
combined toolkit which covers the essentials of all artisan’s
tools and allows you to add your proficiency bonus to
anything you craft. It weighs 20 lb. and can be replaced for
75 gp.
While using these tools to craft an item, you can make a
day’s worth of progress towards crafting in the 8 hours
during a long rest. Each day, you can craft items worth a
total of 50 gp times your craftsman level. As normal, you
must provide material equal to half the items’ market value.

Masterwork
At 2nd level, you begin to learn the deeper intricacies of
weapon and armor craftsmanship.

Masterwork Equipment
As a craftsman, you are capable of creating weapons and
armor of the utmost quality; such creations are known as
Masterwork items. By spending an additional 100 gp in
materials and 8 hours of work when crafting a weapon or
suit of armor, you can create a masterwork version of that
item. In addition, you can spend 100 gp and 8 hours of time
to modify an existing item to be masterwork.

[Página 5]
Masterwork Properties

Magic weapons and armor can be made masterwork,
however, once modified with masterwork properties, they
do not grant a masterwork bonus to attack rolls, damage
rolls, or Armor Class.

Properties

Craftsman Level

Cost

Apprentice

2nd

—

Journeyman

5th

200 gp

Master

11th

400 gp

Crafting Ability

Legendary

17th

500 gp

Intelligence is your primary ability when it comes to
crafting. In addition, you use your Intelligence modifier
when setting the saving throw DC when an item that you
craft calls for one.

Masterwork Bonus
As you gain levels in this class, the masterwork items you
craft will grant a Masterwork bonus when wielded or worn
by a proficient creature. At 5th level, your masterwork
weapons have a +1 bonus on attack and damage rolls and
your masterwork suits of armor have a +1 bonus to AC.
This bonus increases to +2 at 11th level, +3 at 17th level.

Masterwork Properties
Masterwork items you craft can be modified with
masterwork properties, advanced modifications which
allow you to create truly unique weapons and armor.
Masterwork properties are separated into 4 levels:
Apprentice, Journeyman, Master, and Legendary. You can
apply a number of Apprentice properties equal to your
Intelligence modifier + your Masterwork Bonus (minimum
1) to a piece of gear, and can apply one each of
Journeyman, Master, and Legendary properties to a
masterwork item.
While anyone can use a masterwork version of a
weapon or suit of armor if they are proficient with it, once a
piece of masterwork gear has been modified with a Master
or Legendary property, it is then fitted to your exact
specifications and can only be used proficiently by you.
You can apply any number of masterwork properties to
a single piece of masterwork equipment over a period of 8
hours, which may be done over the course of a long rest.
Each added masterwork property requires a cost in
materials and can only be done by craftsmen of a high
enough level, as shown in the Masterwork Properties table.
You can remove or replace masterwork properties on an
item in the same amount of time, though you must still pay
the cost of newly added masterwork properties. You can’t
remove a property from an item that is a prerequisite for
another of the item's properties.
When you learn a new level of masterwork properties,
you can apply a property from that level to two pieces of
masterwork equipment at no cost. Additionally, whenever
you apply a masterwork property to a weapon that deals
bludgeoning, piercing, or slashing damage, you can change
that weapon’s damage type to bludgeoning, piercing, or
slashing.

Masterwork save DC = 8 + your proficiency bonus + your
Intelligence modifier

Tool Belt
While other adventurers may rely on spells, or luck, or
brute strength to solve a problem, you believe in always
having the right tool on hand. Starting at 2nd level, you can
use your action to retrieve a piece of nonmagical gear from
your belt, apron, pack, cart, or wherever you keep your
tools, even if you did not have it in your inventory before.
This item’s price in gp must be no higher than 10 times
your craftsman level. Items retrieved this way become lost
in your inventory and vanish you take a long rest. You can
use this ability a number of times equal to your Intelligence
modifier and regain all expended uses following a long rest.

Artisans’ Guild
At 3rd level, you join an Artisans’ Guild. Select one of the
Guilds from those listed below; you gain the 3rd level
ability of that guild. You gain an additional Guild ability at
7th, 10th, 14th and 18th level.

Ability Score Improvement
When you reach 4th level, and again at 8th, 12th, 16th, and
19th level, you can increase one ability score of your
choice by 2, or you can increase two ability scores of your
choice by 1. As normal, you can’t increase an ability score
above 20 using this feature.

Extra Attack
Beginning at 5th level, you can attack twice, instead of
once, whenever you take the Attack action on your turn.

Folded Steel
At 6th level, you discover or create new processes for
making your masterwork gear even stronger than before.
Masterwork weapons crafted or modified by you count as

3
magehandpress.com

[Página 6]
Crafting
The ability to forge and create items is central to
the craftsman. To craft an item, a character
requires three things: materials, tools, and time:
• In most cases, the raw materials for an item can
be obtained for 1/2 the item’s price. This cost
can fluctuate depending on the character's
current circumstances, contacts, or access to
natural resources.
• A set of the appropriate artisan’s tools and
proficiency in their use is generally all that is
required to craft an item, though occasionally
use of a larger shop is needed for more complex
items, and proper scaffolding and earth-moving
equipment is needed for building structures.
• The time required to craft an item is measured
against its market value. Normally, a character
makes progress toward crafting an item equal to
5 gp for each day of downtime, completing their
work when this amount exceeds the item’s price.
As a craftsman, you work more much faster, and
make progress equal to 50 gp × your craftsman
level each day.

magical for the purposes of overcoming damage resistance
and immunity.

Rapid Modifications
Starting at 9th level, you gain the ability to quickly
reconfigure your equipment. As an action, you
can replace a masterwork property on a
single piece of gear with any other
masterwork property of the same
level. You can’t replace a property
that is a prerequisite for another of
the weapon’s properties, and the weapon must meet all the
prerequisites for the new property. You can use this ability
a number of times equal to your Intelligence modifier, and
regain all expended uses when you finish a long rest.

Craftsman's Strike
You've learned how to build, but you also know how to
destroy. Starting at 13th level, your weapon attacks deal
maximum damage to objects, and an additional 1d8
damage to constructs.

Uncanny Tool Belt
You have a knack for finding the most useful things buried
away in your cart. Starting at 15th level, you can produce a
single common or uncommon magic item from your tool
belt. The item become lost in your inventory and vanish

4
magehandpress.com

when you a long rest. Once you use this ability, you can’t
use it again until you finish a long rest.

Magnum Opus
At 20th level, you complete an object of unparalleled
majesty. You can retreat into your forge for a period of 30
days; during this time, you are feverishly working. At the
end of the 30 days, you emerge from your forge, carrying
your creation: a single magic item of very rare or legendary
rarity. This item is tied to your very soul: regardless of
type, you are always considered attuned to it, and no other
creature can attune to it while you are alive. This item does
not count against your maximum number of attuned items,
and you ignore all attunement requirements for the item. As
long as you are on the same plane of existence as your
item, you can call it to your hand or onto your
body (as appropriate). You can only craft
a Magnum Opus once.

[Página 7]
Artisans’ Guilds
All master craftsmen individually learn the basics of
smithing, leatherworking, woodworking, and other
necessary disciplines on the path to mastery, either on their
own or under tutelage of another master artisan. However,
as they hone their skills, they invariably find themselves
drawn to gatherings of other like-minded craftsmen. These
groups, formalized as Guilds, provide a means for
craftsmen to compare notes and schematics, acquire
resources, and provide a means for craftsmen to ply their
trade.

Armigers’ Guild
The Armigers devote their skills to the art of armor
smithing, with the firm belief that the right plate in the right
place can make a warrior invincible.

Armor Master
You not only learn to forge powerful armor, but can wear it
with skill. At 3rd level, you gain one of the following
fighting styles:
Defense. While you are wearing armor, you gain a +1
bonus to AC.
Protection. When a creature you can see attacks a target
other than you that is within 5 feet of you, you can use your
reaction to impose disadvantage on the attack roll. You
must be wielding a shield.

Iconic Emblem
Starting at 7th level, you can emblazon your armor and
shield with a personal symbol, one that is known by many
to represent craftsmanship and valor. A creature that sees
you can identify you with a DC 12 Intelligence check.
Additionally, whenever an ally that can see you makes a
saving throw that they are not proficient in, they can add
half your proficiency bonus (rounded up) to the save.

Armiger’s Eye
Starting at 10th level, you can spend 10 minutes to
reinforce a suit of armor, or up to 6 following a short or
long rest, which gains one of the following properties of
your choice:
Adamant. When a creature wearing this armor takes
damage, it reduces the amount it takes by 1d8.
Banded. A creature wearing this armor has a +1 bonus
to armor class.
This armor retains its reinforcement until the creature
wearing it is hit, after which it is no longer fortified.

Wall of Iron
Starting at 14th level, as a bonus action, you can gain
resistance to bludgeoning, piercing, and slashing damage
until the end of your next turn. Once you use this ability,
can’t use it again until you finish a short or long rest.

Master Armorsmith
At 18th level, you reach the peak of your craft. You learn
the following Legendary masterwork property, which you
can immediately apply to a suit of masterwork armor:

Invincible Plating
Legendary Property
Components Suit of exotic masterwork armor
You learn how to make your steel nigh indestructible to
certain forms of strikes. Select either bludgeoning,
piercing, or slashing damage; while wearing this suit of
armor, you are immune to that type of damage.

Bladeworkers’ Guild
Blade and bow, axe and mace: these are the tools with
which the Bladeworkers try to change the world. They
believe that the right blade, in the right hand can make a
warrior unstoppable.

Weapon Master
You not only forge great weapons, you fight with them as
well. At 3rd level, you gain one of the following fighting
styles:
Archery. You gain a +2 bonus to attack rolls you make
with ranged weapons.
Dueling. When you are wielding a melee weapon in one
hand and no other weapons, you gain a +2 bonus to damage
rolls with that weapon.
Great Weapon Fighting. When you roll a 1 or 2 on a
damage die for an attack you make with a melee weapon
that you are wielding with two hands, you can reroll the die
and must use the new roll, even if the new roll is a 1 or a 2.
The weapon must have the Two-Handed or Versatile
property for you to gain this benefit.
Two-Weapon Fighting. When you engage in twoweapon fighting, you can add your ability modifier to the
damage of the second attack.

Wicked Blade
By 7th level, your fiendishly clever weapons have earned
you a reputation. You can add twice your proficiency bonus
to Charisma (Intimidation) checks you make using one of
your masterwork weapons.

5
magehandpress.com

[Página 8]
Adamant Whetstone
Starting at 10th level, you can spend 10 minutes to fortify a
weapon, or up to 6 following a short or long rest, which
gains one of the following properties of your choice:
Honed. This weapon has a +2 bonus on attack rolls.
Sharpened. This weapon deals an 1d8 additional
damage on a hit.
This weapon retains its fortification until it hits a target,
after which it is no longer fortified.

Sundering Strike
Starting at 14th level, you can use your knowledge of the
weak points of weapons and armor to render them useless.
As an action on your turn, you can make a single attack
against an enemy, targeting their weapon or armor in an
attempt to sunder it. If you hit, that creature must succeed
on a Dexterity saving throw against your Masterwork save
DC. On a failure, the item is broken, unusable until it is
fixed. Once you use this ability, you must finish a short or
long rest before you can do so again.

Master Weaponsmith
At 18th level, you reach the peak of your craft. You learn
the following Legendary Masterwork Property.

Devastating
Legendary property
Components Masterwork exotic weapon
This weapon scores a critical hit on a roll of 18, 19, or 20.

Calibarons’ Guild
The Calibarons know, better than most, that gunpowder is
the single greatest invention ever created by mortals. A
sword may let a skilled wielder lay a giant low and magic
may let the savvy and the blessed stand up to the gods, but
only a gun will let a common man put a dragon in its place.

Fighting Style
You adopt a particular style of gunfighting as your
specialty. Choose one of the following options. You can’t
take a Fighting Style option more than once, even if you
later get to choose again.
Akimbo. When you engage in two-weapon fighting with
firearms, you do not take a penalty to the damage of the
second attack.
Bullseye. You gain a +2 bonus to ranged attack rolls
you make using firearms. The weapon must have the
Sighted property or have a normal range of 80 feet or
longer to gain this effect. This effect does not stack with the
Archery fighting style.

6
magehandpress.com

Duelist. While you are wielding a firearm in one hand
and nothing in the other, if you make a ranged weapon
attack and exceed the target's AC by 5 or more, you deal an
additional die of weapon damage. You can only use this
ability once per round.
Shotgunner. When you hit with a ranged weapon attack
using a firearm that has the Scatter property, you can reroll
the lowest damage die, and you must use the new roll, even
if the new roll is worse than the original.

Hand Load
Starting at 7th level, so long as you have access to your
craftsman tools, you can create ammunition and explosives
at no cost. Over the course of a long rest, you can create 40
pieces of normal ammunition, 20 pieces of special
ammunition of any type, or 2 explosives. Over a short rest,
you can make 10 pieces of normal ammunition, 5 pieces of
special ammunition, or 1 explosive.

Ballistic Tuning
Starting at 10th level, you can spend 10 minutes to calibrate
and reinforce a ranged weapon, or up to 6 following a short
or long rest, which gains one of the following properties of
your choice:
Ballistic. This weapon deals an additional die of damage
on a hit.
Calibrated. This weapon deals a critical hit on a roll of
18-20.
This weapon retains its fortification until it hits a target.
The weapon is then no longer fortified.

Applied Demolitions
Starting at 14th level, you can add your Intelligence
modifier to the damage roll of any explosive you craft.
Additionally, you can increase or decrease the explosion
radius of any explosive you craft by up to 5 feet.

Master Gunsmith
At 18th level, you reach the peak of your craft. You learn
the following Legendary Masterwork Property:

Burst Fire
Legendary property
Components Masterwork exotic firearm with the
Automatic property
When you take the Attack action to make an attack with
this firearm, you can use your bonus action to make a
single additional attack with it.

[Página 9]
Clockworkers’ Guild
Masters of clockwork, the tinkers and gearsmiths of the
Clockworkers’ Guild study and perfect the art of fashioning
constructs. Their designs are as elegant as they are
functional, translating simple ticking movements through a
kaleidoscope of gears and pistons to create lifelike, even
seemingly intelligent, clockwork creatures. Nearly all
clockworkers are attended by a pair of their construct
servants, who serve a dual purpose as attentive assistants
and relentless bodyguards. Veteran clockworkers, however,
walk astride constructs taller than themselves, great geardriven golems of formidable strength.

Clockwork Bolter
Small construct, unaligned
Armor Class 14 (natural armor)
Hit Points 28 (8d6)
Speed 25 ft.
STR
8 (-1)

DEX
13 (+1)

CON
10 (+0)

INT
1 (-5)

WIS
3 (-4)

CHA
1 (-5)

Condition Immunities blinded, charmed, deafened,
frightened, paralyzed, petrified, poisoned
Senses blindsight 120 ft. (blind beyond this radius), passive
Perception 6
Languages ―
Challenge 1/8 (25 XP)
Two-Handed. The bolter counts as having two hands with
which to wield its installed weapon. The bolter can only use
ranged weapons.

ACTIONS
Light Crossbow. Ranged Weapon Attack: +3 to hit, range
80/320 ft., one target. Hit: 4 (1d6 + 1) piercing damage.

Clockwork Macer
Small construct, unaligned
Armor Class 14 (natural armor)
Hit Points 28 (8d6)
Speed 25 ft.
STR
13 (+1)

DEX
8 (-1)

CON
10 (+0)

INT
1 (-5)

WIS
3 (-4)

CHA
1 (-5)

Condition Immunities blinded, charmed, deafened,
frightened, paralyzed, petrified, poisoned
Senses blindsight 60 ft. (blind beyond this radius), passive
Perception 6
Languages ―
Challenge 1/8 (25 XP)
One-Handed. The macer counts as having one hand with
which to wield its installed weapon. The macer can only use
melee weapons.

ACTIONS
Mace. Melee Weapon Attack: +3 to hit, reach 5 ft., one target.
Hit: 4 (1d6 + 1) bludgeoning damage.

Clockwork Constructs
Starting when you join this guild at 3rd level, you assemble
two mechanical servants. You can choose a clockwork
bolter or a clockwork macer for each of your two
constructs, and can change your decision when you take a
long rest. Each of your constructs comes equipped with an
installed masterwork weapon, which you can modify with
masterwork properties. Your constructs are always
proficient with installed weapons.
Repairing your Constructs. When you take a long rest,
you can repair your constructs to their full hit points. You
are always considered to have enough scrap and material to
build and repair your constructs.
Commanding your Constructs. Your constructs act on
your turn, though they don't take actions unless you
command them to. While your constructs are within 500
feet of you, you can mentally command them to move to
specific locations (no action required) or use your action to
command all of your constructs to attack. Additionally, you
can use your bonus action to command one of your
constructs to attack; this construct does not add an ability
score to its damage roll.
Your constructs use your Intelligence modifier + your
proficiency bonus instead of their normal attack bonus, if it
would be higher. Additionally, your constructs add twice
your level to their maximum hit points.
The connection to your constructs is taxing, and you
cannot magically summon nor command any other
creatures while your constructs are active.
Starting at 5th level, you can choose to build a gear
guardian, instead of two clockwork bolters or clockwork
macers.

Quick-Detach
Starting at 7th level, you can switch which weapons are
installed into your clockwork constructs on the fly. As an
action, you can remove the weapon installed in one of your

7
magehandpress.com

[Página 10]
constructs within 5 feet of you and replace it with a weapon
you are holding.

Reinforced Clockwork
Starting at 10th level, you can spend 10 minutes to apply
additional reinforcement to one of your constructs. The
next time that construct takes damage, it reduces the
damage taken by 1d8.

Death Burst
Beginning at 14th level, you can integrate a dead man's
switch into each of your constructs: a bomb which
detonates when your construct is critically damaged. When
a construct with the bomb drops to 0 hit points, it detonates
in a 10-foot radius explosion. Each creature within the area
must make a Dexterity saving throw against your
Masterwork save DC or take 6d6 fire damage.

Shield Guardian
Beginning at 18th, you've driven the final bolt in what will
likely amount to your greatest mechanical creation: a shield
guardian. As long as you are alive, only you can wear the
guardian's amulet; while you are wearing it, you cannot
command any other constructs. As an action, you can
replace the guardian's fist weapon with any installed
masterwork weapon of your choice.

Gear Guardian
Small construct, unaligned
Armor Class 17 (natural armor, shield)
Hit Points 60 (6d8 + 24)
Speed 25 ft.
STR
17 (+3)

DEX
11 (+0)

CON
18 (+4)

INT
7 (-2)

WIS
5 (-3)

CHA
1 (-5)

Shield. The guardian carries a shield (included in the AC),
which it can don or doff as an action.
Two-Handed. The guardian has two hands with which to
wield its installed weapon and shield.

ACTIONS
Longsword. Melee Weapon Attack: +6 to hit, reach 5 ft., one
target. Hit: 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3)
slashing damage if used with two hands.

magehandpress.com

The master artisans of the great fey elf cities are some of
the most talented craftspeople anywhere in the multiverse.
While they could make anything, they generally prefer to
exhibit their incredible skills by fashioning decorative
items: jewelry, sculptures, and ornaments. The
masterpieces forged by a filigrist are treasures that will be
passed down in families for generations, jealously buried in
tombs, and unearthed centuries later, looking every bit as
magnificent.

Ornamentation
When you enter this profession at 3rd level, you learn to
craft armor and weapons that incorporate beautification not
only as an aesthetic choice, but as an enhancement to the
item’s capabilities. By spending 500 gold and 8 hours of
work, you can apply the Ornamented property to a
masterwork weapon or the Decorated property to a suit of
Masterwork armor.

Decorated
Apprentice property
Components Suit of masterwork armor
As a reaction when you are hit by an attack from a
creature you can see, you can cause the attacker to reroll
the attack against you and add your Intelligence modifier
to your AC. The attacker must use the new roll.
You can apply this property multiple times, once at
each level of Masterwork properties. You can use this
ability once for each time this property has been applied,
regaining all expended when you finish a long rest.

Ornamented

Condition Immunities blinded, charmed, deafened,
frightened, paralyzed, petrified, poisoned
Senses blindsight 120 ft. (blind beyond this radius), passive
Perception 7
Languages ―
Challenge 2 (450 XP)

8

Filigrist’s Guild

Apprentice property
Components Masterwork weapon
Once per turn when you make an attack roll with this
weapon and miss, you can reroll the attack, adding your
Intelligence modifier to the roll. You must use the new
roll.
You can apply this property multiple times, once at
each level of Masterwork properties. You can use this
ability once for each time this property has been applied,
regaining all expended when you finish a long rest.

Formidable Finery
At 3rd level, you also learn how to craft jewelry that is both
beautiful and remarkably functional. You can designate a
collection of rings, necklaces, bracelets, and other jewelry
you have crafted that is worth at least 1,000 gp as a suit of
finery. While wearing your finery, your Armor Class is

[Página 11]
equal to 10 + your Dexterity modifier + 1 per 1,000 gold
your finery is worth (maximum +3). Your finery is treated
as a suit of exotic masterwork light armor. You can
continue to invest gold and jewels into your finery,
improving the bonus it provides to your Armor Class, by
spending the gold necessary as you work on your finery
over a long rest.
While wearing your finery, you can use your
Intelligence modifier instead of your Charisma modifier for
Deception, Intimidation, and Persuasion checks.

Alluring Finery
Starting at 7th level, as an action, while wearing your
finery, you can force one creature that you can see within
30 feet of you to make a Wisdom saving throw, opposed by
your Masterwork save DC. On a failed save, the creature is
drawn to you, compelled by your glorious accoutrements.
For the next minute, it has disadvantage on attack rolls
against creatures other than you.
The effect ends if you attack any other creature, if you
cast a spell that targets a hostile creature other than the
target, if a creature friendly to you damages the target or
casts a harmful spell on it, or if you end your turn more
than 30 feet away from the target.
You can use this ability a number of times equal to your
Intelligence modifier, and regain all expended uses when
you finish a long rest.

Magnificence
When you reach 10th level, you can spend 10 minutes
polishing a suit of armor or a weapon until it sparkles, or up
to 6 following a short or long rest. The polished piece of
gear gains the following benefits:

Brilliant. The item sheds bright light in a 20-foot radius,
and dim light for an additional 20 feet. The item shines for
8 hours, after which the light fades. While the item is
shedding light, if the creature using that item fails on a
saving throw, it can use its reaction to reroll that saving
throw; it must take the second roll. Once this ability is
used, the item's light fades. A creature can only benefit
from this ability once every 24 hours.

Dazzling Defenses
At 14th level, your weapons shine with the rainbow hues of
dozens of gemstones. When you deal damage to a creature
with a weapon that has the Ornamented property, you can
use your bonus action to distract the creature, causing it to
have disadvantage on the next attack roll or saving throw it
makes.
Once you use this ability, you can’t use it again until
you finish a short or long rest.

Master Filigrist
At 18th level, you reach the peak of your craft. You learn
the following Legendary property:

Royal
Legendary property
Components Suit of exotic masterwork armor
This armor, fit for a king or emperor, is layered with
brilliant gold and gems. While wearing this armor, you
can add your Intelligence modifier to all saving throws
you make.

Forgemasters’ Guild
To a forgemaster, heat is not merely integral to forging,
curing, and welding gear, it is a weapon in its own right, for
the swing of a white-hot blade bites not only with steel, but
with flame. A forgemaster carries the intensity of a forge
with them, storing it in their armor and building it up in
their weapons, before unleashing it in a scorching blast.

Forgefired Armory
When you enter this profession at 3rd level, you construct a
portable, wearable furnace which allows you to heat objects
you are forging without the need for a specially-constructed
shop or forge. This apparatus is bulky, but can be worn
over clothing or armor; donning or doffing the gear takes 1
minute. When you gain this forge, you are assumed to have
been working on them in your spare time, only bringing it
to full functionality when you take this subclass.
If your furnace is ever lost or damaged, you can repair
or replace it over the course of a long rest with 100 gp of
materials.

9
magehandpress.com

[Página 12]
While wearing your furnace, weapons you
wield can deal fire damage instead of their
normal damage type.

Burn
At 3rd level, while wearing your furnace,
you can funnel the heat from its fire into
your strikes. Whenever you make an attack
against a hostile creature, you gain 1 burn
point. You can store up to 3 burn points at a
time; if you are wearing heavy armor, you can
instead store a number of burn points equal to
half your craftsman level (minimum 3).
Whenever you hit a creature with a weapon, if
you have 3 or more burn points stored, you can
use your bonus action to discharge all of your
stored burn points, dealing an additional 1d6 fire
damage for each burn point discharged.
Unspent burn points dissipate after 1 minute,
or when you remove your furnace.

Forgeknight Initiate
Also at 3rd level, you learn to use the
fires of your furnace in more exotic
ways. While wearing your furnace, you
can cast the mending and produce flame
cantrips at will. Intelligence is your spellcasting ability for
each of these spells.

Scalding Defenses
Beginning at 7th level, while you are wearing a suit of
heavy armor, you gain resistance to fire damage, and any
attack you make with a weapon that deals fire damage
ignores resistance to fire damage.
Additionally, you learn how to forge weapons that can
channel incredible amounts of heat. You can apply the Heat
property to your masterwork weapons:

Heat
Journeyman property
Components Masterwork weapon with the Two-Handed
property
This weapon gains the Heat property. Additionally, it
deals fire damage instead of its normal type. and its
damage die increases by 1 step.
Heat. This weapon gains a heat point whenever an
attack is made using it, and loses one heat point whenever
you begin your turn. If it gains 3 heat points, the weapon
overheats and loses all heat points. An overheated
weapon can't be used to make an attack again until the
end of your next turn.

10
magehandpress.com

Heart of the Forge
Starting at 10th level, you can you can plunge a number of
melee weapons or pieces of ammunition into an active
forge or your furnace, heating them to white-hot
temperatures. Weapons and ammunition placed in the forge
must be made of metal, and remain heated for 10 minutes.
You can heat one weapon or 2 pieces of ammunition in the
forge as an action, or up to 10 weapons or 20 pieces of
ammunition over the course of a minute. A heated weapon
or piece of ammunition deals fire damage instead of its
normal type and ignites flammable objects hit by it, if the
target is not being worn or carried.

Fires of the Forge
At 14th level, you learn to release the heat stored in your
gear to devastating effect. While wearing your furnace, if
you have 5 burn points stored, you can cast the spell heat
metal as an action, targeting a creature within 60 feet of
you, without using a spell slot. Alternatively, if you have 7
burn points stored, you can cast the spell fireball as an
action without using a spell slot. Intelligence is your
spellcasting ability for both of these spells.
Once you use this ability to cast either spell, you must
finish a short or long rest before you can do so again.

[Página 13]
Master Forgeknight
At 18th level, you reach the peak of your craft. You learn
the following Masterwork property:

Forgebound
Legendary property
Components Suit of exotic masterwork heavy armor
You build a miniature furnace into this suit of armor, as
well as layers of heat dispersing materials. While wearing
this armor, you gain immunity to fire damage and cold
damage, and can survive in extremely cold and hot
temperatures (from 150 degrees Fahrenheit down to -100
degrees Fahrenheit) with no ill effect.
Additionally, when you take the Dash action while
wearing this suit of armor, you leave a trail of fire in your
wake. This trail is 5 feet wide, and lasts until the start of
your next turn. Any creature that enters the area for the
first time on its turn or starts its turn in the area takes 1d8
+ your Intelligence modifier fire damage.

Luminaries’ Guild
Ill content to work with materials like steel, wood, or cloth,
craftsmen of the Luminaries’ Guild have developed tools to
shape light itself into their creations. Hardlight stands
among the most versatile materials ever to be discovered: it
is light, pliant, and strong, but best of all, it can be conjured
whole cloth into brilliant, glowing objects. Originally, its
use was limited to only arcanists, but with the invention of
the hardlight projector, nonmagical craftsmen can fashion
this material into weapons and armor that appear in the
blink of an eye.

Hardlight Armament
Starting when you join this guild at 3rd level, you learn to
forge lasting equipment out of hardlight using a special
device called a hardlight projector. If the projector is lost or
destroyed, you can construct a new one over a long rest for
100 gp.
Using the projector, you can apply the following
masterwork properties to your equipment:

Hardlight
Apprentice property
Components Masterwork weapon
This weapon is forged entirely from hardlight, expanding
into a brilliant solid object when drawn and condensing
again into a control chip when stored. This weapon
weighs nothing, but possesses a similar amount of inertia
when used. Its damage type changes to force. As an
interaction on your turn, draw or store any hardlight

weapons you possess and don or doff a suit of hardlight
armor.

Hardlight
Apprentice property
Components Suit of masterwork armor
This armor is constructed entirely from shimmering
hardlight, appearing about you in an instant when needed.
It weighs nothing and glows with dim light in a 10-foot
radius sphere. As an interaction on your turn, you can
don or doff this armor, and draw or store any hardlight
weapons you possess.

Lightforge
Also at 3rd level, as a bonus action, you forge a suit of
armor, a shield, a set of artisan tools, or any melee weapon
that deals bludgeoning, piercing, or slashing damage, made
entirely out of scintillating hardlight. Weapons and armor
created by this ability can be exotic, but can’t be
masterwork. After 10 minutes, this object evaporates
completely into light.

Photonic Fortifications
At 7th level, you can you can use an action to raise a
defense wall of hardlight. Select a space within 15 feet of
you. Starting from that point, a number of translucent
panels equal to your Intelligence modifier appear, which
connect to form one continuous wall. Each panel is 5 feet
wide, 4 feet tall, 1/4-inch-thick, and is tall enough to
provide half cover for any Medium creature behind it.
Creatures cannot move through the wall, though they can
jump over it. The wall persists for 1 minute or until you
dismiss it on your turn (no action required). Once you use
this ability, you can’t use it again until you finish a short or
long rest.

Hardlight Edge
Beginning at 10th level, you can spend 10 minutes to
fortify a weapon with a glittering hardlight coating, or up to
6 following a short or long rest, which gains one of the
following properties of your choice:
Force Edged. This weapon deals force damage on a hit
and deals an additional 1d4 damage on a hit.
Radiant Edged. This weapon deals radiant damage on a
hit and its reach increases by 5 feet.
This weapon retains its property until it hits a target,
after which it loses its property.

Beam Cannon
Starting at 14th level, as an action, you can overcharge your
hardlight projector to fire a beam in a 100-foot long, 5-foot

11
magehandpress.com

[Página 14]
wide line out from you in a direction you choose. Each
creature within that area must make a Dexterity saving
throw, opposed by your spell save DC. A creature takes
8d6 radiant damage, or half as much on a success. The blast
leaves behind a super-heated trail in the area of the line,
which remains until the start of your next turn. A creature
which enters the area for the first time on their turn takes
4d6 fire damage. The beams ignite flammable objects in the
area that aren't being worn or carried.
Once you use this ability, you can’t use it again until
you finish a short or long rest.

Master Luminary
At 18th level you reach the peak of your craft. You learn
the following Legendary crafting technique:

Photonic
Legendary property
Components Masterwork exotic weapon with the
Hardlight property
The weapon is infused with unstable hardlight, increasing
its damage potential. This weapon can deal radiant
damage instead of its normal damage type, and it deals an
additional 1d6 force or radiant damage on a hit (your
choice).

Photonic
Legendary property
Components Suit of exotic masterwork armor with the
Hardlight property
This armor is constructed from refined hardlight, making
it highly resistant to damage. This armor grants resistance
to radiant and force damage while worn, and unarmed
attacks made while worn deal an additional 1d4 radiant or
force damage (your choice).

Maesters’ Guild
While most seasoned spellcasters will enchant a handful of
magic items over the course of their careers, artisans
belonging to the Guild of Arcane Maesters seek to become
true masters of magic item creation. They rightly take
seriously the forging of such powerful relics: each creation
must be a masterwork in its own right to contain the potent
magic woven into them. Despite laboring for months or
even years to perfect their creations, seasoned maesters are
always seen to be laden with dozens of magic items,
attuned to a handful of rings, and carrying a wand of
fireballs, just in case.

12
magehandpress.com

Maester’s Ring
When you take this profession at 3rd level,
you forge yourself a small magic item known
as a Maester’s Ring. This ring is attuned to you,
doesn’t count against your number of attuned
items, and, if lost, will always return to your finger
on the following dawn.
When you craft this ring, select two cantrips from
the wizard spell list. While wearing this ring, you can
cast either of those cantrips, as well as the mending cantrip.
Your ring gains one additional cantrip of your choice at
10th level and at 18th level. Intelligence is your
spellcasting ability for these cantrips.

Arcane Smithing
When you begin this profession at 3rd level, you learn a
more efficient, though more strenuous, method of
enchanting magic items. When you craft a magic item, you
may do so at a rate of 150 gp per craftsman level per day,
continuing until you have reached the market value of the
item (see the Magic Item Crafting table, page 47).
Enchanting a magic item at this rate is a taxing process:
when you finish a long rest after any day that you make
progress towards completion of an item at this speed, you
take one level of exhaustion, which can only be removed
by completing a long rest.
When enchanting an item in this fashion, you do not
need to expend spell slots or know the specific spells
required to make the item in question, though you must still
have or create a schematic for that item and meet the
minimum level requirement. Moreover, creating items that
require attunement is far more difficult, requiring you to be
a higher level than normal to craft, as shown on the Maester
Crafting table.

Maester Crafting
Crafting
Level

Attunement
Level

Common

3rd

3rd

Uncommon

3rd

7th

Rarity

Rare

7th

11th

Very Rare

11th

17th

Legendary

17th

20th

[Página 15]
Starting at 7th level, you have advantage on all
Intelligence (Arcana) checks made to create magic item
schematics.

Attunement Specialist
Starting at 7th level, you can attune to 4 magic items at
once, and can attune to any magic item even if you don’t
meet the attunement requirements. At 18th level, this
number increases to 5 magic items.
Additionally, you can attune to a magic item which
requires attunement as an action, and can use any scroll as
if you were a spellcaster with that spell on your spell list.
Since you cannot cast spells, you must always make a
spellcasting check to cast a spell from a scroll when using
this ability.

Efficient Enchanting
At 10th level, you learn to enchant small batches of
regularly used consumable magic items with little to no
cost or effort. Whenever you craft a consumable common
magic item, you can instead create a batch of 1 + your
Intelligence modifier of that item. When you craft a
consumable uncommon magic item, you instead make two
of it.

Rapid Recharge
Starting at 14th level, as an action on your turn, you can
allow a magic item you are holding to regain a number of
charges equal to the amount it normally regains at dawn.
Once you use this ability, you cannot do so again until you
complete a long rest.

Master Spellwright
At 18th level, you reach the peak of your craft. You learn
the following Legendary crafting properties:

Ardent
Legendary property
Components Suit of masterwork exotic armor
Select three damage types from the following list: cold,
fire, force, lightning, necrotic, psychic, radiant, thunder.
While wearing this suit of armor, you gain resistance to
those three damage types.

Mystical
Legendary property
Components Exotic masterwork weapon
If this weapon deals an additional die of damage due to
its Master property, it deals two dice of additional
damage instead.

Mechanauts’ Guild
For centuries, the pinnacle of mechanized vehicles was the
apparatus of the crab, a singular device capable of
exploring inhospitable environments, from the sea floor to
lava-strewn volcanic fields. However, ambitious craftsmen
from the Mechanauts’ Guild have drawn up designs for a
new vehicle, mightier and more customizable than the old
apparatus. This device is a walking tank, equipped with
savage fists, scuttling legs, and climate control
enhancements, a vehicle to dwarf all others, a true feat of
engineering.

Mechanical Marvel
At 3rd level, you complete the frame of a Mechanaut's
Apparatus, with ample room for upgrades and
improvements. Its blueprints are based on the apparatus of
the crab, but you can model your apparatus to appear as
any beast or as a humanoid figure.
Your apparatus comes with two installed masterwork
weapons, which you can modify with masterwork
properties. Although your apparatus cannot wear armor, its
body functions as a suit of exotic masterwork heavy armor,
which can also be modified with masterwork properties.
Your apparatus is always proficient with its installed
weapons and body armor.
In addition to modifying its body and weapons, you can
apply unique masterwork properties to the frame of your
apparatus. These properties are listed later in this class
description.
Repairing the Apparatus. When you take a long rest,
you can repair your apparatus to full hit points. You are
always considered to have enough material to repair your
apparatus. If your apparatus is lost, you can build a new
one for 400 gp.
Piloting the Apparatus. Your apparatus acts on your
turn, though it doesn't take actions unless you are piloting
it. While your apparatus is within 500 feet of you, you can
mentally command it to move (no action required).
While the apparatus is within 5 feet of you, you can
enter it or exit it by using half your movement. While
inside the apparatus, you can use your action to pilot it,
causing the apparatus to take the Attack, Dash, Disengage,
or Dodge actions. Any creature can enter the apparatus, but
only you can pilot it.

Artificial Attunement
By 7th level, you’ve developed a means of affixing magic
items to your apparatus, granting it their mystical benefits.
When you attune to a magic item, you can choose to install
it into your apparatus. The item still takes up one of your

13
magehandpress.com

[Página 16]
Mechanaut’s Apparatus
Large construct, unaligned
Armor Class 13 + its creator’s Intelligence modifier
Hit Points 30 (15 + 5 × your craftsman level)
Speed 35 ft.
STR
14 (+2)

DEX
14 (+2)

CON
14 (+2)

INT
1 (-5)

WIS
3 (-4)

Tune-Up
CHA
1 (-5)

Damage Immunities poisoned, psychic
Condition Immunities blinded, charmed, deafened,
frightened, paralyzed, petrified, poisoned
Senses blindsight 120 ft. (blind beyond this radius), passive
Perception 6
Languages ―
Challenge ―
Cockpit Controls. When a creature piloting the apparatus
takes the Attack action, they can forgo any number of their
own attacks to command the apparatus to make the same
number of attacks. The apparatus uses the rider’s Intelligence
modifier + their proficiency bonus instead of its normal attack
bonus.
Cockpit Cover. Any creature inside the apparatus is granted
3/4 cover from outside attacks.
Double Two-Handed. The apparatus has two mechanical
arms, each of which can hold one installed weapon. Each
mechanical arm is powerful enough to wield weapons as if
with two hands. The apparatus can use both ranged and
melee weapons.

ACTIONS
Maul (right hand). Melee Weapon Attack: +2 to hit, reach 5
ft., one target. Hit: 9 (2d6 + 2) bludgeoning damage.
Maul (left hand). Melee Weapon Attack: +2 to hit, reach 5 ft.,
one target. Hit: 9 (2d6 + 2) bludgeoning damage.

14
magehandpress.com

attunement slots, but grants its benefits to your apparatus
instead of you. While piloting your apparatus, you can
cause it to take the Use an Object action.

Starting at 10th level, you can spend 10 minutes tuning and
shoring up your apparatus’s more delicate mechanisms,
granting it temporary hit points equal to your Intelligence
modifier plus your proficiency bonus.

Jury-Rigging
At 14th level, while riding your apparatus, you can use a
bonus action to restore a number of hit points equal to 5 +
your Intelligence modifier to the apparatus. You cannot use
this ability if your apparatus has more than half of its
maximum hit points remaining.

Master Mechanist
At 18th level, you reach the peak of your craft. You learn
the following Legendary property:

Execution Protocol
Legendary property
Components Mechanaut's Apparatus
This apparatus has advantage on attack rolls against
creatures that have fewer than half their maximum hit
points left.
