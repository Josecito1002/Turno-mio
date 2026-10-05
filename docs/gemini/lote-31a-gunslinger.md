# Encargo: Lote 31a (Gunslinger) de la app "Mi turno"

"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el formato de
abajo, lo que se pide, usando **solo el texto en inglés que viene al final**: material de la comunidad (Mage Hand Press, 2024 (reglas 2024)), no oficial de
Wizards. Esta es la parte 1 de 2 de este material. Otra persona revisa y aplica tu respuesta con un script, así que el formato tiene que
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
JSON `{ "clave": "Gunslinger (Mage Hand Press, 2024)" }` para la clase y cada subclase.
=== D ===
JSON `{ "clave": "1 o 2 frases que presenten la clase o subclase" }`.
=== E ===
Dudas, cortes de texto o [NO CONFIRMADO].

## Texto fuente (Gunslinger (Mage Hand Press, 2024))

[Página 1]
COMPLETE
GUNSLINGER

The Definitive
Gritty, Risk-Taking Class
by Mage Hand Press

[Página 2]
Credits
Designers Michael Holik, Beniamin Ghita
Cover Illustrator Martin Kirby-Jackson
Graphic Designer Michael Holik
Interior Illustrations Martin Kirby-Jackson,
Lucas Ferreira CM

On the Cover
Martin Kirby-Jackson illustrates a gunslinger
enjoying their favorite vices: a strong whiskey,
freshly-rolled cigarette, and the aftermath of a
shootout.
Disclaimer: Rolling Critical Hits has been linked to
the following conditions: swollen ego, gambling
addiction, head-explode-itus, and DM fever.

Mage Hand Press, and their associated logos
are trademarks of Mage Hand Press LLC
® 2020 Mage Hand Press LLC.
All Rights Reserved.
Product Identity: The following items are hereby identified as Product Identity, as defined in the Open
Game License version 1.0a, Section 1(e), and are not Open Content: All trademarks, registered trademarks, proper names (characters, deities, etc.), dialogue, plots, storylines, locations, characters,
artwork, and trade dress. (Elements that have previously been designated as Open Game Content or
are in the public domain are not included in this declaration.)
Open Content: Except for material designated as Product Identity (see above), the game mechanics
of this Mage Hand Press game product are Open Game Content, as defined in the Open Gaming License version 1.0a Section 1(d). No portion of this work other than the material designated as Open
Game Content may be reproduced in any form without written permission.
Complete Gunslinger is published by Mage Hand Press LLC under the Open Game License version
1.0a. Copyright 2020 Mage Hand Press LLC. All Rights Reserved
MAGE HAND PRESS
507 S Pennsylvania Ave. Belleville IL, 62220
www.magehandpress.com

[Página 3]
Table of Contents
Gunslinger.........................................................................................................................................................1
Gunslinger Class Features	������������������������������������������������������������������������������������������������������������������������1
Maneuver Options	�������������������������������������������������������������������������������������������������������������������������������������� 3
Gunslinger Subclasses.................................................................................................................................... 4
Big Game Hunter	����������������������������������������������������������������������������������������������������������������������������������������� 4
Deadeye	����������������������������������������������������������������������������������������������������������������������������������������������������������5
Grenadier	������������������������������������������������������������������������������������������������������������������������������������������������������5
Gun Tank	������������������������������������������������������������������������������������������������������������������������������������������������������� 6
Gun-Ko Master	�������������������������������������������������������������������������������������������������������������������������������������������� 7
High Roller	������������������������������������������������������������������������������������������������������������������������������������������������� 7
Laserist	��������������������������������������������������������������������������������������������������������������������������������������������������������� 8
Musketeer	����������������������������������������������������������������������������������������������������������������������������������������������������� 8
Pistolero	������������������������������������������������������������������������������������������������������������������������������������������������������ 9
Secret Agent	������������������������������������������������������������������������������������������������������������������������������������������������ 9
Space Cowboy	��������������������������������������������������������������������������������������������������������������������������������������������� 10
Spellslinger	����������������������������������������������������������������������������������������������������������������������������������������������� 10
Trick Shot	����������������������������������������������������������������������������������������������������������������������������������������������������12
White Hat	���������������������������������������������������������������������������������������������������������������������������������������������������� 13
Firearms.............................................................................................................................................................14
Firearm Eras	������������������������������������������������������������������������������������������������������������������������������������������������14
Weapon Properties	�������������������������������������������������������������������������������������������������������������������������������������14
Mastery Properties	������������������������������������������������������������������������������������������������������������������������������������ 15
Weapon Descriptions	��������������������������������������������������������������������������������������������������������������������������������18
Firearm Ammunition	���������������������������������������������������������������������������������������������������������������������������������18
New Feats.......................................................................................................................................................... 19
New Spells........................................................................................................................................................ 20
Cross-Compatible Subclasses....................................................................................................................... 22

[Página 4]
Gunslinger

Core Gunslinger Traits
Primary Ability

Dexterity

Hit Point Die

D8 per Gunslinger level

Saving Throw
Proficiencies

Dexterity and Charisma

Skill Proficiencies

Choose 2: Acrobatics,
Animal Handling, Athletics,
Deception, Insight,
Intimidation, Perception,
Persuasion, Sleight of Hand,
and Stealth

Weapon Proficiencies Simple weapons and Martial
Ranged weapons
Armor Training

Light armor

Starting Equipment

Choose A or B: (A) Leather
Armor, 2 Daggers, Revolver,
50 Bullets, Explorer’s Pack,
and 11 GP; or (B) 175 GP

Risk is in a Gunslinger’s blood. They are bold renegades,
bucking tradition and forging a new path with dangerous
and inelegant firearms. Gunslingers are infamous for
surviving by their wits and relying on split-second timing
and a considerable amount of luck to survive.

Guts and Gunpowder
Black powder isn’t for the faint of heart. Its thunderous
applause is volatile and imprecise—a barely controlled
explosion directed at an enemy. Only the truly fearless
seek to master it. But Gunslingers have nerves of steel,
hurling death from their guns in a roaring cacophony.
Adapted for shootouts, gunslingers are mobile and daring,
knowing that life or death hangs on snap decision-making
and one’s own mettle.

Dangerous Outsiders
A Gunslinger’s explosive lifestyle lends well to wandering
and adventuring. Gunslingers often shoot first and ask
questions later, an attitude which earns them few friends
and bountiful enemies. In their travels, most gunslingers
are secretive and take great lengths to go unnoticed, lest
they be spotted by old foes with scores to settle.

Gunslinger Class Features

Becoming a Gunslinger…

As a Gunslinger, you gain the following class features
when you reach the specified Gunslinger levels. These
features are listed in the Gunslinger Features table.

As a Level 1 Character

Level 1: Fighting Style

• Gain all of the traits in the Core Gunslinger Traits table.
• Gain the Gunslinger’s level 1 features, which are listed
in the Gunslinger Features table.

As a Multiclass Character

• Gain the following traits from the Core Gunslinger
Traits table: Hit Point Die, and proficiency with
Martial Ranged weapons.
• Gain the Gunslinger’s level 1 features, which are listed
in the Gunslinger Features table.

You gain a Fighting Style feat of your choice. If you choose
a feat, such as Great Weapon Fighting, that requires you
to hold a Melee weapon in one or two hands, you can use
that feat with Ranged weapons.
Whenever you gain a Gunslinger level, you can replace
the feat you chose with a different Fighting Style feat.

Level 1: Quick Draw

You’re adept at drawing and firing before others have time
to react, granting you the following benefits.

1
Mage Hand Press

[Página 5]
Gunslinger Features
Level

Proficiency
Bonus
Features

Risk Weapon
Dice Mastery

Risk Dice. You have four Risk Dice, which are
d8s. A Risk Die is expended when you use it. You
regain all expended Risk Dice when you finish a
Short or Long Rest. Your Risk Die changes and more
Risk Dice become available as shown on the Risk
Dice column of the Gunslinger Features table.
Maneuvers. You can expend Risk Dice to
perform maneuvers. Your maneuver options are
detailed later in the class description.
Saving Throws. If a maneuver requires a saving
throw, the DC equals 8 plus your Dexterity modifier
and Proficiency Bonus.

1

+2

Fighting Style, Quick Draw,
Weapon Mastery

—

2

2

+2

Critical Shot, Risk

4d8

2

3

+2

Gunslinger Subclass

4d8

2

4

+2

Ability Score Improvement

4d8

3

5

+3

Extra Attack, Gut Shot

4d8

3

6

+3

Subclass feature

5d8

3

7

+3

Evasion

5d8

3

8

+3

Ability Score Improvement

5d8

3

9

+4

Critical Shot

5d8

3

10

+4

Subclass feature

5d10

4

You gain a Gunslinger subclass of your choice. A
subclass is a specialization that grants you features at
certain Gunslinger levels. For the rest of your career,
you gain each of your subclass’s features that are of
your Gunslinger level or lower.

11

+4

Overkill

5d10

4

12

+4

Ability Score Improvement 5d10

4

Level 4: Ability Score Improvement

13

+5

Cheat Death

5d10

4

14

+5

Subclass feature

6d10

4

15

+5

Dire Gambit

6d10

4

16

+5

Ability Score Improvement 6d10

4

17

+6

Critical Shot

6d10

4

You can attack twice instead of once whenever you
take the Attack action on your turn.

18

+6

Deft Maneuver

6d12

4

Level 5: Gut Shot

19

+6

Epic Boon

6d12

4

20

+6

Headshot

6d12

4

Initiative. You have Advantage on Initiative rolls.
Double Draw. You can draw or stow two weapons
that lack the Two-Handed property when you would
normally be able to draw or stow only one.

Level 1: Weapon Mastery

Your training with weapons allows you to use the mastery
properties of two kinds of Simple or Martial Ranged
weapons of your choice. Whenever you finish a Long Rest,
you can practice weapon drills and change one of those
weapon choices.
When you reach certain Gunslinger levels, you gain
the ability to use the mastery properties of more kinds of
weapons, as shown in the Weapon Mastery column of the
Gunslinger Features table.

Level 2: Critical Shot

Your attack rolls with Ranged weapons can score a
Critical Hit on a roll of 19 or 20 on the d20.
At Gunslinger level 9, your attack rolls with
Ranged weapons score a Critical Hit on a roll of 18–20.
At Gunslinger level 17, they score a Critical Hit on a
roll of 17–20.

Level 2: Risk

You can perform incredible feats of daring fueled by
special dice called Risk Dice.

Level 3: Gunslinger Subclass

You gain the Ability Score Improvement feat or
another feat of your choice for which you qualify.
You gain this feature again at Gunslinger levels 8, 12,
and 16.

Level 5: Extra Attack

Whenever you score a Critical Hit against a Large
or smaller creature with a ranged attack using a
weapon, the projectile lodges itself in the target. For
1 minute or until the target replaces one of its attacks
with dislodging the projectile, its Speed is halved and
it has Disadvantage on attack rolls.

Level 7: Evasion

When you’re subjected to an effect that allows you to
make a Dexterity saving throw to take only half damage,
you instead take no damage if you succeed on the saving
throw and only half damage if you fail.
You don’t benefit from this feature if you have the
Incapacitated condition.

Level 11: Overkill

When you deal damage with a Ranged weapon that
doesn’t add your ability modifier to the roll, you add your
ability modifier nonetheless. If you already add your
modifier to the damage roll, the target takes an extra 1d8
damage of the weapon’s type.
Note that weapons that have the Firearm property
don’t add your ability modifier to damage rolls.

Level 13: Cheat Death

When you are reduced to 0 Hit Points and not killed
outright, you can drop to 1 Hit Point instead, and you regain
a number of Hit Points equal to your Gunslinger level.
Once you use this feature, you can’t use it again until
you finish a Short or Long Rest.

2
Complete Gunslinger

[Página 6]
Level 15: Dire Gambit

Whenever you roll Initiative or score a Critical Hit, you
regain one expended Risk Die.

Level 18: Deft Maneuver

You gain a special additional Bonus Action that you can
take once on each of your turns. You can take this special
Bonus Action only to use a maneuver.

Level 19: Epic Boon

You gain an Epic Boon feat or another feat of your choice
for which you qualify. Boon of Irresistible Offense is
recommended.

Level 20: Headshot

When you score a Critical Hit against a creature using a
Ranged weapon, you can choose for it to be a Headshot. If
the creature has less than 100 Hit Points, it dies. Otherwise,
it takes an extra 10d10 damage of the weapon’s type.
Once you use this feature, you can’t use it again until
you finish a Short or Long Rest. You can also restore your
use of it by expending three Risk Dice (no action required).

Blindfire

You can take a Bonus Action and expend one Risk Die to
gain Blindsight with a range of 30 feet until the end of the
current turn.

Dodge Roll

You can expend one Risk Die as a Bonus Action to move
up to 15 feet and reload any Ranged weapon you are
holding. This movement doesn’t provoke Opportunity
Attacks and is unaffected by Difficult Terrain.

Grazing Shot

When you miss with a ranged attack roll using a weapon,
you can expend one Risk Die (no action required) to deal
damage to that creature equal to a roll of the die plus your
Dexterity modifier (minimum of 1). This damage is the
same type dealt by the weapon, and the damage can be
increased only by increasing the ability modifier. You can
only use this maneuver once per turn.

Maverick Spirit

The maneuvers are presented in alphabetical order.

When you fail an Intelligence, Wisdom, or Charisma
ability check or saving throw, you can expend one Risk
Die to add it to the roll, potentially turning it into a
success. You can only use this maneuver once per turn.

Bite the Bullet

Skin of Your Teeth

Maneuver Options
As a Bonus Action, you can expend one Risk Die to gain
Temporary Hit Points equal to the number rolled on the
die plus your Gunslinger level.

When a creature you can see hits you with an attack roll,
you can take a Reaction and expend one Risk Die to
dodge out of harm’s way. Roll the die and add the number
rolled to your AC against this attack, potentially causing it
to miss.

Gunslinger Subclasses
Name

Description

Big Game Hunter

Hunt colossal game with even bigger guns

Deadeye

A precise, eagle-eyed marksman

Grenadier

Uses explosive munitions to solve basically every problem

Gun Tank

Lugs around heavy mounted firearms

Gun-Ko Master

A martial artist who uses the gun as a total weapon

High Roller

Gambles with their life and fortune; no risk is too high

Laserist

Tinkerer specializing in high-tech blaster weapons

Musketeer

A musket-and-rapier-wielding soldier of honor and courage

Pistolero

Fires six-shooters from the hip at incredible speed

Secret Agent

A covert agent with a license to kill

Space Cowboy

A hot shot futuristic gunslinger

Spellslinger

Fires spells as well as bullets in deadly bombardments

Trick Shot

Ricochets bullets to hit targets from any angle

White Hat

A law-abiding protector of the weak that never blinks in the face of danger

3
Mage Hand Press

[Página 7]
Gunslinger Subclasses
A Gunslinger subclass is a specialization that grants you
features at certain levels, as specified in the subclass.

Big Game Hunter
Fire a Colossal Elephant Gun
Armed with the largest guns possible, Big Game Hunters
aim to bring down dangerous titans—such as dinosaurs,
hydras, and giant beasts—before they can endanger
smaller folk. Quarry as small as owlbears or as intelligent
as giants are ill-suited to such as hunter’s sensibilities, for
they revel most in the conquest of titans and the smell of
their Elephant Guns glowing red hot.

Level 3: Elephant Gun

You gain a weapon of staggering proportions: an Elephant
Gun. Only you have proficiency with this weapon. The
Elephant Gun is a ranged weapon with the following traits:
Weapon Category: Martial Ranged
Damage on a Hit: 2d8 Piercing
Properties: Ammunition (range 80/320; Bullet), Firearm,
Heavy, High Caliber, Two-Handed
Mastery: Slow (you can use this property, and it doesn’t
count against the number of properties you can use
with Weapon Mastery)

Replacing an Elephant Gun. If your Elephant Gun
is lost, you can build a new one over the course of a Long
Rest using materials worth 100+ GP.
High Caliber. The Elephant Gun has the special High
Caliber property. You can only make one attack with this
weapon when you take the Attack action, and only as the
first attack you make on your turn. Once you make an
attack with this weapon, you can’t make any attacks until
the start of your next turn.
As you reach certain Gunslinger levels, the Elephant
Gun’s damage changes, as shown on the following table.

Elephant Gun
Gunslinger Level

Damage

3

2d8

5

4d10

11

5d10

17

6d10

Level 6: Tracker

You excel at trailing your quarry, granting you the
following benefits.
Footprint Identification. By examining the footprints
left behind by a creature as a Study action, you can
determine without an ability check the specific kind of
creature that left it, how long ago it left the footprints, the
creature’s size, and whether the creature was missing any
of its Hit Points when it left the footprints.
Survival Expertise. You gain proficiency in the
Survival skill and you gain Expertise with that skill.

Level 10: Legendary Shot

When a creature you can see within 80 feet of you takes
a Legendary Action, you can take a Reaction to make an
attack against it using your Elephant Gun. You can make
this attack even if you’ve already made an attack using
your Elephant Gun on your turn. On a hit, the Legendary
Action is lost.
Once you use this feature, you can’t do so again until
you finish a Short or Long Rest.

Level 14: Exotic Caliber

You can take a Bonus Action to chamber your Elephant
Gun with one of the following types of ammunition. Once
you use this feature, you can’t use it again until you finish
a Short or Long Rest. You can also restore your use of it by
expending two Risk Dice (no action required).
Buck Shot. You load your Elephant Gun with dozens
of lead pellets that scatter the next time the gun is fired.
The attack becomes a 30-foot Cone. Each creature in
the area makes a Dexterity saving throw against your
Maneuver save DC, taking the Elephant Gun’s damage on
a failed save, or half as much damage on a successful one.
Explosive Shot. You load your Elephant Gun with
a projectile that explodes the next time the gun is fired.
The attack becomes an explosion. Choose a point you can
see within 80 feet of you. Each creature within a 10-footradius Sphere makes a Dexterity saving throw against
your Maneuver save DC, taking Fire damage equal to the
damage of your Elephant Gun on a failed save, or half as
much damage on a successful one.
Piercing Shot. You load your Elephant Gun with a
conical projectile that penetrates through its target the
next time the gun is fired. The attack becomes a 5-foot
wide, 80-foot-long Line. Each creature in the area makes
a Dexterity saving throw against your Maneuver save DC,
taking the Elephant Gun’s damage on a failed save, or half
as much damage on a successful one.

Level 3: Broad Side of a Barn

You don’t have Disadvantage on attack rolls against Large
or larger targets as a result of attacking at long range.

4
Complete Gunslinger

[Página 8]
Level 10: Reposition

Deadeye
Shoot with Bullseye Precision
A well-placed bullet is more powerful than a sword, arrow,
or spell. Indeed, you believe that every violent conflict
should sound like a single loud crack followed by a long
silence. Such shots demand perfection, even at range, for
when they are done right, they are as deadly for the target
as they are stupendous for the audience.

Level 3: Eagle Eye [Maneuver]

Once per turn when you miss with a ranged attack roll,
you can expend one Risk Die and add it to the attack roll,
potentially causing the attack to hit.

Level 3: Sharpshooter’s Stance

You have trained to fire from a stable Prone position,
granting the following conditions.
Fire While Prone. You don’t have Disadvantage on
ranged attack rolls as a result of the Prone condition.
Quick Stand. When you have the Prone condition,
you can right yourself and thereby end the condition with
only 5 feet of movement.

Level 6: Concealed Position

You excel at firing from concealment, granting you the
following benefits.
Camouflage. You can take the Hide action even if you
aren’t Heavily Obscured or behind Three-Quarters Cover
or Total Cover, as long as you have the Prone condition.
The Invisible condition of this Hide action ends if you
don’t have the Prone condition.
Sniper’s Nest. If you make an attack roll while hidden
and the roll misses, making the attack roll doesn’t reveal
your location.

Whenever a creature misses you with an attack roll,
you can take a Reaction to end the Prone condition on
yourself and move up to half your Speed.

Level 14: Focused Shot

When you take the Attack action, you can choose to make
only one ranged attack roll using a weapon to make a
Focused Shot. You have Advantage on this attack roll and,
on a hit, score a Critical Hit.

Grenadier
Blow Up Anything in Your Way
You believe that virtually all problems can be solved with
the careful application of high-explosives, and will go to
great lengths to prove this thesis. Demolitions are your
expertise, and anything that can cause explosions at long
range is your instrument. If you must, you can make do
with an ordinary gun, but it’s simply not as satisfying as
blowing your enemies into smithereens.

Level 3: Explosive Shot

When you make a ranged attack using a weapon whose
mastery property you can use, you can replace that
property with the Explode property for that attack. The
damage of this attack is Fire instead of the weapon’s
normal damage type.

Level 3: Heavy Ordnance [Maneuver]

Whenever you use a weapon’s Explode property, you can
take a Bonus Action and expend one Risk Die to increase
the explosion’s radius to a 10-foot-radius Sphere. Add the
Risk Die to the damage roll.

5
Mage Hand Press

[Página 9]
Level 6: Configurable Blast

When you use a weapon’s Explode property, you can
choose one of the following benefits for that attack.
Demolition Blast. The explosion deals double damage
to objects and ignores the damage threshold of objects.
Elemental Blast. You cause the explosion to deal
Acid, Cold, Lightning, or Thunder damage rather than its
normal damage type.
Incendiary Blast. Flammable objects in the area of the
explosion that aren’t being worn or carried start burning.

Level 10: Take Cover

Each creature you choose gains the benefits of your
Evasion feature while it is within 5 feet of you.

Level 14: Clusterbomb

When you use a weapon’s Explode property, you can fire
a Clusterbomb. The explosion is a 20-foot-radius Sphere.
On a failed save, a creature takes 10d6 Fire damage, or
half as much damage on a successful save. This damage
ignores Resistance. A Huge or smaller creature that takes
damage from the Clusterbomb has the Prone condition.
Once you use this feature, you can’t use it again until
you finish a Short or Long Rest. You can also restore your
use of it by expending four Risk Dice (no action required).

Gun Tank
Be Huge and Wield Huge Guns
Be bigger, be badder, and be tougher, and no one will
stand in your way. You are a living siege engine, a titan of
muscle, brandishing weapons most people are incapable
of lifting. Armed with these devastating firearms, you
wade into the field of battle, bombarding and destroying
those foolish enough to oppose you.

Level 3: Heavy Gunner

You can lug around massive guns and shrug off incoming
bullets, granting you the following benefits.
Armor Training. You gain training with Medium and
Heavy armor.
Strong Attacks. You can use Strength, rather than
Dexterity, for attack and damage rolls using Ranged
weapons. You can also add your Strength, instead of
Dexterity, to your Maneuver save DC.

Level 3: Walking Turret

Your experience with mounted weapons grants you the
following benefits.
Mounted Arsenal. While you are holding a Ranged
weapon whose mastery property you can use, you can use
the Mounted mastery property with that weapon. While
a weapon is mounted in a fixed position, its damage dice
increase by one step (d4 → d6 → d8 → d10 → d12, to a
maximum of d12s).
Move While Mounted. You can move a weapon
with the Mounted mastery property that is in a fixed
position. While moving with such a weapon, every foot of
movement costs 1 extra foot.

Level 6: Thick-Skulled

You have Advantage on saving throws you make to avoid
or end the Charmed, Frightened, and Stunned conditions.

Level 10: Bulletproof

When you use your Bite the Bullet maneuver, you have
Resistance to Bludgeoning, Piercing, and Slashing damage
until the end of your next turn.

Level 14: Gatling Shot

Once on each of your turns, when you hit an enemy with a
ranged attack using a weapon, you can make another attack
with the weapon against the same target. This attack is
always made with Disadvantage, regardless of circumstance.
If this attack hits, you can make another attack against the
same target. You can repeat this attack until you miss or
make a total of five attacks against the target.

6
Complete Gunslinger

[Página 10]
Gun-Ko Master

High Roller

Wield Your Gun as a Total Weapon

Gamble with Life and Death

The ancient art of gun-ko is passed through generations
of Gunslingers who study the gun as a perfect weapon
and meditate on its intricacies. This path is not for the
impatient or the faint of heart, but those who practice
diligently can transform the gun into an extension of
themselves, striking and shooting with mesmerizing speed.

Fortune is a fickle thing—unless you’re a High Roller.
These Gunslingers are master card sharps and dice
throwers that mix their love of risk with their talent for
gunplay. High Rollers push their luck until it runs out,
then push harder. Why settle for a win when you could
bet it all and win big?

Level 3: Close-Quarters Shooting

Level 3: Poker Face

Being within 5 feet of an enemy doesn’t impose
Disadvantage on your attack rolls with Ranged weapons.

Level 3: Gun-Ko

You learn the immortal art of gun-ko, which grants you
the following benefits.
Bludgeon with Anything. When you attack with a
Ranged weapon whose mastery property you can use, you
can replace that property with the Bludgeon property for
that attack.
Bonus Action Strike. When you make a ranged attack
roll with a weapon against an enemy within 5 feet of you,
you can make a melee attack using the Bludgeon property
of that weapon as a Bonus Action.

Level 6: Lightning Disarm [Maneuver]
If a creature within 5 feet of you is holding a weapon,
you can expend one Risk Die as a Bonus Action
to attempt to take it. The target must succeed on a
Dexterity saving throw or you take the weapon from it
after a series of rapid movements. You must have a free
hand to use this maneuver.

Level 6: Wall Dash [Maneuver]

You can expend one Risk Die to take the Dash action
as a Bonus Action. Until the end of your turn, you have
a Climb Speed equal to your Speed and you can move
across vertical surfaces while leaving your hands free.

You gain proficiency with all Gaming Sets and in one of
the following skills of your choice: Deception, Insight, or
Perception.

Level 3: Liar’s Dice [Maneuver]

When you make a damage roll with a Ranged weapon,
you can expend one Risk Die as a Bonus Action and
declare it to be a hidden roll. Roll the damage in secret
and declare any total you wish. The GM has the option
to call your bluff, in which case you reveal the damage
dice you rolled. This has different consequences based on
whether or not you lied.
The GM Calls Your Bluff; You Lied. The damage you
deal is halved.
The GM Calls Your Bluff; You Told the Truth. The
damage you deal is doubled.
The GM Doesn’t Call Your Bluff. Use the total
damage you declared, even if you rolled a different total.

Level 6: Risky Business

Once per turn when you make an attack roll against an
enemy and the roll doesn’t have Disadvantage, you can
choose to make the roll with Disadvantage. When you do,
you regain one expended Risk Die.

Level 10: Predictive Dodge

Your reflexes are honed enough to dodge incoming
bullets. You can take a Bonus Action to choose one
creature that you can see within 30 feet of you. Until the
start of your next turn, you gain the benefits of the Dodge
action against the target’s ranged attack rolls and its effects
that force you to make a Dexterity saving throw.

Level 14: Flash Assault

As a Bonus Action, you can make one ranged attack
with a weapon and one melee attack using the Bludgeon
property of that weapon. You can move between these
attacks. If you hit a Large or smaller creature with both
attacks, it has the Prone condition.
Once you use this feature, you can’t use it again until
you finish a Short or Long Rest. You can also restore
your use of it by expending two Risk Dice (no action
required).

7
Mage Hand Press

[Página 11]
Level 10: Risk Taker

You can use your Maverick Spirit and Skin of Your Teeth
maneuvers without expending a Risk Die. When you do
so, roll a d6 instead of a Risk Die.

Level 14: Double or Nothing

When you score a Critical Hit using a Ranged weapon,
you can gamble for a higher result. Roll a d20. If the roll
is a 10 or higher, roll all of the attack’s damage dice four
times and add them together, instead of only two times
as normal for a Critical Hit. If you roll a 9 or lower on the
d20, the Critical Hit becomes a normal hit.

Laserist
Master High-Tech Blaster Weapons
Gunslinging, as you well understand, is more science
than art, especially when using cutting-edge blaster
technology. As a Laserist, you’re interested in maximizing
blaster output while minimizing survivors, iterating and
customizing your blasters to create the perfect weapon.

Level 3: Beam Shot [Maneuver]

When you take the Attack action using a weapon that
has the Blaster property, you can expend one Risk Die
as a Bonus Action to replace one of your attacks with a
penetrating laser shot. This attack becomes a 5-foot-wide
Line that extends out to the weapon’s normal range. Each
creature in the Line makes a Dexterity saving throw.
On a failed save, a creature takes damage equal to the
weapon’s normal damage plus the Risk Die, or half as
much on a successful one. The damage is the same type
dealt by the weapon.

Level 3: Multi-Mode Blaster

You can spend 1 minute integrating two weapons with
the Blaster property into a single chassis, granting you a
supremely flexible weapon. You can only have one MultiMode Blaster at a time. Whenever you make an attack
with the blaster, you choose which of the two integrated
weapons you use for that attack.

Level 6: Charge Shot

When you take the Attack action, you can replace one of
your attacks with charging a weapon that has the Blaster
property that you are holding. Until the start of your next
turn, the weapon is charging and can’t be used to make
an attack. Afterwards, the weapon is charged until the
end of the turn. When you make an attack with a charged
weapon, it deals two extra dice of damage on a hit.

Level 10: Energetic Shield [Maneuver]

You have installed a sophisticated electromagnetic device
on your person. As a Reaction in response to taking Cold,
Fire, Lighting, Necrotic, Radiant, or Thunder damage,
you can expend one Risk Die to gain Resistance to this
damage until the start of your next turn, including against
the triggering damage.

Level 14: Refraction Shot

Whenever you hit a creature with a ranged attack using a
weapon that has the Blaster property, you can cause the
blaster bolt to deflect off the target to a second creature
you can see within 30 feet of the original target. The target
takes damage of the weapon’s type equal to your Dexterity
modifier (minimum of 1).

Musketeer
Lead Your Allies with Blades and Bullets
You believe that camaraderie and glory go hand-in-hand,
that you and your allies are undefeatable as long as you
stand together. As a Musketeer, you have trained with
blades and firearms in tandem so that you might battle
shoulder-to-shoulder alongside your allies. Your place
isn’t taking shots from afar, but charging into the fray such
that you might all succeed or fail as one.

Level 3: Infantry Training

You have received training in warfare that mixes firearms
with conventional weapons, granting you the following
benefits.
Martial Weapons. You gain proficiency with all
Martial weapons instead of only Martial Ranged weapons.
Melee Mastery. You can choose Melee weapons in
addition to Ranged weapons when you select weapons for
your Weapon Mastery.
Ignore Loading. You ignore the Loading property of
the Blunderbuss, Pistol, and Musket. If you’re holding one
of them, you can load a piece of ammunition into it even
if you lack a free hand.
Bayonets. You have proficiency with Bayonets.
A Bayonet is a special Dagger that can be attached or
detached from any Ranged weapon with the Two-Handed
property as a Utilize action. While attached, you can treat
the Ranged weapon as a Melee weapon with the Finesse
property. When you hit a creature with a melee attack
using the Bayonet, it deals Piercing damage equal to 1d8
plus the ability modifier used for the attack roll.

Level 3: Skirmish [Maneuver]

When you make an attack using a weapon, you can
expend one Risk Die as a Bonus Action to make an attack
using a weapon later on the same turn. One attack must
be a melee attack roll and the other must be a ranged
attack roll.

Level 6: Morale Boost

When you use the Bite the Bullet maneuver, choose up to
5 allies you can see within 30 feet of yourself. Each chosen
ally gains Temporary Hit Points equal to one roll of your
Risk Die plus half your Gunslinger level (round down).

Level 10: Mobile Tactics

When you hit a creature with an attack, the target can’t
make Opportunity Attacks against you until the start of its
next turn.

Level 14: All for One

Whenever an ally within 10 feet of you is hit by an attack
roll, you can take a Reaction to make a ranged attack
using a weapon against the attacker.

8
Complete Gunslinger

[Página 12]
Pistolero
Fire Six-Shooters with Incredible Speed
Bullets are power, and you have long believed that more
bullets equal more power. Your expertise is in delivering
a hail of deadly fire to pulverize your enemies. Not every
bullet needs to be accurate to make a difference.

Level 3: Close-Quarters Shooting

Being within 5 feet of an enemy doesn’t impose
Disadvantage on your attack rolls with Ranged weapons.

Level 3: Fan the Hammer [Maneuver]

When you take the Attack action with a Ranged weapon
that doesn’t have the Two-Handed property, you can
expend one Risk Die as a Bonus Action to make two
additional ranged attacks with that weapon. These
additional attacks always have Disadvantage, regardless
of circumstance. You can’t use the Automatic mastery
property with these attacks, and you must have a free
hand to use this maneuver.

Level 6: Disarm

When you score a Critical Hit and trigger your Gut Shot
feature against a creature, you can disarm the target
instead of lodging a projectile in it. The target drops one
object of your choice that it’s holding, with the object
landing in a space of your choice up to 15 feet away from
the target.

Level 10: Showdown [Maneuver]

When you roll Initiative, you can expend one Risk Die to
draw a Ranged weapon and make an attack using it. Add
the Risk Die to the damage roll. On a hit, the target has
Disadvantage on attack rolls against creatures other than
you on the first round of combat.

Level 14: Bullet Time

Once on each of your turns when you make a ranged
attack using a weapon, you can gain Advantage on the roll.

Secret Agent
Engage in Espionage and Assassination
Knowledge is power. The best way to defeat your enemies
is by stealing what they know and replacing it with
misinformation. To that end, you have been trained in
the ways of covert warfare, giving you a broad range of
abilities to complement your fearsome gunnery skills.

Level 3: Operative Training

Your covert training grants you the following benefits:
Concealed Shot. You learn the Concealed Shot
cantrip. Intelligence, Wisdom, or Charisma is your
spellcasting ability for this cantrip (choose when you
select this subclass).
Operative Tools. You gain a Disguise Kit and Thieves’
Tools, and you have proficiency with them.
Skill Proficiencies. You gain proficiency in two of
these skills of your choice: Deception, Investigation,
Persuasion, Sleight of Hand, or Stealth.

Level 3: Parting Shot [Maneuver]

When you take the Dash, Disengage, or Dodge action on
your turn, you can expend one Risk Die to make a ranged
attack using a weapon as a Bonus Action. Add the Risk
Die to the damage roll on a hit.

Level 6: Fieldcraft

Your experience in the field grants you the following
benefits.
Quick Change. Using a Disguise Kit, you can create a
Costume and don it as a Bonus Action.
Slick Talker. Whenever you make a Charisma
(Deception) or Charisma (Persuasion) check, you can
treat a d20 roll of 9 or lower as a 10.

Level 10: Exit Strategy

When you take damage, you can take a Reaction to evade
further harm. You have the Invisible condition until the
start of your next turn, and you can immediately move up
to 10 feet.
Once you use this feature, you can’t use it again until
you finish a Short or Long Rest. You can also restore your
use of it by expending one Risk Die (no action required).

9
Mage Hand Press

[Página 13]
Level 14: License to Kill

Whenever you deal damage with a Ranged weapon, you can
expend either one or two Risk Dice and add them to the
damage roll. If you roll the highest number on a Risk Die,
you can roll the die again and add it to the damage without
expending it, rolling again if it is the highest number again,
and so on. The maximum number of Risk Dice you can add
to the damage equals your Proficiency Bonus.

Space Cowboy
Overheat Your Customized Blaster
Nothing matters to you more than freedom. With a blaster
on your hip and the wide-open sky to explore, you no
longer have to answer to anyone. The perils of the final
frontier tend to attract gamblers and risk-takers, be they
unscrupulous smugglers, bloodthirsty bounty hunters, or
big damn heroes.

Level 3: Hot Shot

When you attack with a Ranged weapon whose mastery
property you can use, you can replace that property with
the Overheat property for that attack.

Level 3: Gun with a Name

Over a Long Rest, you can customize one of your Ranged
weapons, causing it to become a Named Weapon. You can
have only one Named Weapon at a time. This weapon has
the following benefits.
Extended Barrel. The normal and long ranges of the
Named Weapon double.
Magnetic Mount. The quantum electromagnet
installed on the Named Weapon allows you to use a Bonus
Action to pull the weapon to your open hand if it is within
60 feet of you and isn’t being carried. You can’t be disarmed
of the weapon unless you have the Incapacitated condition.
Reinforced Frame. The Named Weapon gains the
Bludgeon mastery property in addition to its normal
mastery property, though you can only use one mastery
property on each attack. This property doesn’t count against
the number of weapons you can use with Weapon Mastery.

Blaster Mods
The benefits of the Gun with a Name feature are
Blaster Mods, attachments for weapons in the Dark
Matter setting by Mage Hand Press. These Blaster
Mods don’t count against the number of mods you
can install on the Named Weapon.

Level 6: Power Slide

When you use the Dodge Roll maneuver, you have
Advantage on the next attack you make before the end of
your turn.

Level 10: Lucky Dodge

Whenever you are hit by an attack roll, you can roll a
d6 (no action required). On a 6, the attack misses you
automatically.

Level 14: Red Line

When you use the Overheat mastery property, the
Overheated weapon can be used again at the start of your
next turn.

Spellslinger
Complement Your Gunslinging with Arcana
Magic and guns aren’t so different—arcane power is like
gunpowder, a spell is like a bullet, and you are like a gun,
directing your spells with precision at unfortunate targets.
Spellslingers mix the disciplines of gunplay and spellcasting,
sometimes loading arcane charges with your shots and
firing bullets enhanced with lighting, frost, or flame.

Level 3: Spellcasting

You complement your bullets with the ability to cast spells.
Cantrips. You know two cantrips of your choice
from the Wizard spell list (see that class’s section for its
list). Fire Bolt and Message are recommended. Whenever
you gain a Gunslinger level, you can replace one of these
cantrips with another cantrip of your choice from the
Wizard spell list.
When you reach Gunslinger level 10, you learn
another Wizard cantrip of your choice.
Spell Slots. The Spellslinger Spellcasting table shows
how many spell slots you have to cast your level 1+ spells.
You regain all expended slots when you finish a Long Rest.
Prepared Spells of Level 1+. You prepare the list of level
1+ spells that are available for you to cast with this feature.
To start, choose three level 1 spells from the Wizard spell
list. Chromatic Orb, Jump, and Shield are recommended.
The number of spells on your list increases as you gain
Gunslinger levels, as shown in the Prepared Spells column
of the Spellslinger Spellcasting table. Whenever that
number increases, choose additional spells from the Wizard
spell list until the number of spells on your list matches the
number on the table. The chosen spells must be of a level
for which you have spell slots. For example, if you’re a
level 7 Gunslinger, your list of prepared spells can include
five Wizard spells of levels 1 and 2 in any combination.
Changing your Prepared Spells. Whenever you gain
a Gunslinger level, you can replace one spell on your list
with another Wizard spell for which you have spell slots.
Spellcasting Ability. Intelligence is your spellcasting
ability for your Wizard spells.
Spellcasting Focus. You can use an Arcane Focus
or a Ranged weapon as a Spellcasting Focus for your
Wizard spells.

10
Complete Gunslinger

[Página 14]
Spellslinger Spellcasting
Gunslinger Prepared —Spell Slots per Spell Level—
Level
Spells
1
2
3
4
3

3

2

—

—

—

4

4

3

—

—

—

5

4

3

—

—

—

6

4

3

—

—

—

7

5

4

2

—

—

8

6

4

2

—

—

9

6

4

2

—

—

10

7

4

3

—

—

11

8

4

3

—

—

12

8

4

3

—

—

13

9

4

3

2

—

14

10

4

3

2

—

15

10

4

3

2

—

16

11

4

3

3

—

17

11

4

3

3

—

18

11

4

3

3

—

19

12

4

3

3

1

20

13

4

3

3

1

can’t cast spells or take the Magic action. Additionally, the
target has Disadvantage on Constitution saving throws it
makes to maintain Concentration.
Inured to Magic. When you fail a saving throw
against a spell or magical effect, you can take a Reaction
to roll 1d6 and add it to the roll, potentially turning the
failure into a success.

Level 14: Magic Bullet [Maneuver]

When you make a spell attack roll, you can expend one
Risk Die as a Bonus Action to substitute the spell attack
with a ranged attack using a weapon. Add the Risk Die
to the attack roll. On a hit, the attack deals the weapon’s
normal damage, in addition to the effects of the spell
attack roll.

Level 3: Bang, You’re Dead!

You can use magic in place of guns.
Finger Guns. You learn the Finger Guns cantrip. See
the New Spells section for details.
Arcane Shot. When you hit a target with a Finger
Guns attack, you can expend one Risk Die as a Bonus
Action and add it to the damage roll.

Level 6: Spellshot

When you take the Attack action on your turn, you can
replace one of the attacks with a casting of one
of
your Wizard cantrips that has a casting time
of an action.

Level 10: Counter-Mage

Your experience in combating spellcasters
grants you the following benefits.
Abjuration-Breaker. Whenever you
make a ranged attack roll, you temporarily
disrupt protective magic affecting the target. For the
duration of the attack, the effects of spells targeting the
creature, such as Mage Armor, as well as the properties
and powers of magic items worn or carried by the
creature, are suppressed and don’t function. The target
of the attack can’t take a Reaction to cast spells such
as Shield in response to the attack or damage.
Antimagic Shot. When you score a Critical Hit
and the target is affected by your Gut Shot feature,
it also impedes the target’s ability to cast spells.
While the projectile is lodged in the target, it

11
Mage Hand Press

[Página 15]
Trick Shot
Ricochet Bullets from Every Angle
Accuracy means different things to different people. For
you, true accuracy isn’t necessarily in hitting a target on
the first shot, but might include hitting the mark after the
bullet bounces around a dozen times. Your attacks are just
as dangerous if they miss, or even after hitting their mark,
as others’ are while they’re still in the air.

Level 3: Creative Trajectory

You can make your projectiles travel in unexpected ways.
Your ranged attacks with weapons ignore Half Cover and
Three-Quarters Cover.

Level 3: Ricochet [Maneuver]

When you miss with a ranged attack using a weapon, you
can take a Bonus Action and expend one Risk Die to reroll
the attack and add the Risk Die to the roll. You must use
the new roll.

Level 6: Fancy Gunplay

Your flashy weapon tricks grant you the following benefits.
Gun Spinning. Once per turn when you make a
Charisma (Performance) check or a Dexterity (Sleight
of Hand) check using one of your Ranged weapons, you
can roll a Risk Die and add it to the ability check without
expending it.
Speed Loader. On your turn, you can reload a weapon
with the Reload property without taking an action or
Bonus Action.

Level 10: Deft Deflection [Maneuver]

You can shoot projectiles out of the air. When an ally within
30 feet of you is hit by an attack, you can take a Reaction
and expend one Risk Die to grant that ally the benefit of
the Skin of Your Teeth maneuver against that attack. You
must be holding a Ranged weapon to use this maneuver.

Level 14: Pinball Shot

Once on each of your turns when you hit a creature
with a ranged attack using a weapon, you can deflect the
projectile at additional targets. Choose a different target
within 30 feet of the first and make an attack roll against
it. On a hit, you can repeat this attack against a new
target within 30 feet until you miss or make a total of five
attacks. You can’t target the same creature with more than
one attack each time you use this feature.
Once you use this feature, you can’t use it again until
you finish a Short or Long Rest. You can also restore your
use of it by expending two Risk Dice (no action required).

12
Complete Gunslinger

[Página 16]
White Hat
Protect Your Allies and Uphold the Law
Some Gunslingers live by a code and expect others to
do the same. These Gunslingers, known as White Hats,
sometimes serve as officers of the law but never hesitate to
do what’s right when the law says otherwise. Despite their
affinity for deadly weapons, White Hats prefer to keep their
friends safe and subdue their enemies nonviolently—a
preference their enemies don’t often oblige.

Level 3: Lay Down the Law [Maneuver]

You can take a Bonus Action and expend one Risk
Die to keep an eye out for dangers that threaten your
companions. Choose an ally that you can see within 60
feet of you. That ally gains Temporary Hit Points equal to
the number rolled on the Risk Die. Until the start of your
next turn, if the ally is hit by an attack, you can take a
Reaction to make a ranged attack using a weapon against
the attacker.

Level 3: Steely-Eyed Aura

An aura of stoic confidence radiates from you in a 10-foot
Emanantion. You and allies within the Emanantion have
Advantage on saving throws made to avoid or end the
Frightened condition. The aura is inactive while you have
the Incapacitated condition.

Level 6: Reach for the Skies

When you score a Critical Hit against a creature, you call
for the target to surrender instead of lodging a projectile
in it. The target must succeed on a Wisdom saving throw
against your Maneuver save DC or have the Frightened
and Incapacitated conditions for 1 minute. These
conditions end early if the creature takes any damage, if
you have the Incapacitated condition, or if you die. The
creature can repeat the Wisdom saving throw at the end
of each of its turns, ending the conditions on itself on a
success.

Level 10: Long Arm of the Law

Once per turn when you hit a Large or smaller creature
with a ranged attack using a weapon, you can hobble the
target. The creature can’t move on its next turn unless it
first takes the Disengage action.

Level 14: Gold Star Hero

Though gunslinging heroism, you gain the following
benefits.
Improved Aura. The range of your Steely-Eyed Aura
feature increases to 30 feet.
Iron-Clad Law. When you use your Lay Down the Law
maneuver, the ally has Resistance to Bludgeoning, Piercing,
and Slashing damage until the start of your next turn.
Stunned Surrender. When a creature fails its saving
throw against your Reach for the Skies feature, it has the
Stunned condition instead of the Incapacitated condition.

13
Mage Hand Press

[Página 17]
Firearms

Black powder represents a paradigm shift in the art of
warfare, fueling everything from powerful siege weapons
to concealable, handheld guns. In many campaign
settings, firearms supplant the traditional scheme of
weapons, forcing arrows, swords, and battleaxes into
obsolescence. They might even be commonplace, a staple
tool for hunting and defense.
Futuristic firearms, powered by arcane energy or
extremely advanced science, are called blasters, and
fire a pulse of energy or condensed plasma instead of
conventional projectiles. Blasters are considered firearms
as well.

Firearm Eras
Firearms have evolved dramatically throughout
history, and will continue to evolve into the far future.
Therefore, in addition to being organized into Simple
and Martial weapons, the following firearms are
organized into eras, the periods of time in which they
might be encountered. Some firearms might appear
in multiple eras, especially if the story demands an
unusual weapon, but many are best suited to campaign
settings that echo their level of technology.
The GM determines which era or eras of weapons are
in the campaign.

Renaissance Firearms

Renaissance-era firearms, such as Pistols and Muskets, are
weapons that have taken the first steps away from cannons
and into portable rifles, making them the progenitors of
all modern firearms. Weapons from this era use musket
balls and loose black powder, and are therefore slow to
reload. Importantly, these weapons exist comfortably in
many fantasy settings alongside bows, swords, and axes,
especially where pirates are at play.

Industrial Age Firearms

Industrial Age firearms, such as Revolvers and DoubleBarrel Shotguns, stem from advancements in machinery
and assembly lines, granting them more interchangeable
parts and cartridge-based bullets. These guns lack the
assembly-line consistency of modern firearms, but laid
down the bedrock for designs that haven’t changed much
since: a classic six-shot Revolver is as timeless as it is
effective. While the heyday of Industrial Age firearms was
in the Wild West, their simple and reliable construction
means they are still commonplace in the modern day.

Modern Firearms

Modern firearms have embraced automatic fire,
ammunition magazines, and lighter caliber bullets (which
can travel at much higher speeds). For these guns, form
begets function: weapons are designed for a specific role,
such as Sniper Rifles for long range and Pump Shotguns
for close quarters. Moreover, weapons that enjoyed
success in the Wild West, such as the Double-Barrel
Shotgun, can still be found in use today.

Futuristic Firearms

Futuristic firearms—known as blasters—still resemble
Handguns, Pump Shotguns, and Assault Rifles, but have
only tenuous connections to their functionality. Blasters
are powered by rechargeable arcane batteries (or power
cells) and produce bursts of plasma instead of bullets.
While these weapons never need to be reloaded, they are
prone to overheating and sometimes require extended
recharge periods.

Weapon Properties
Here are definitions of the properties in the Properties
column of the Firearm tables. New properties are marked
with an asterisk (*).

Ammunition

You can use a weapon that has the Ammunition property
to make a ranged attack only if you have ammunition to
fire from it. The type of ammunition required is specified
with the weapon’s range. Each attack expends one piece
of ammunition. Drawing the ammunition is part of
the attack (you need a free hand to load a one-handed
weapon). After a fight, you can spend 1 minute to recover
half the ammunition (round down) you used in the fight;
the rest is lost.

Blaster*

A weapon with the Blaster property is a Ranged weapon
that requires no ammunition. This property counts as the
Ammunition property.

Cooldown*

Because this weapon requires cooldown time between
uses, you can only fire it once when you use an action,
Bonus Action, or Reaction to fire it, regardless of the
number of attacks you normally make. This property
counts as the Loading property.

Finesse

When making an attack with a Finesse weapon, use your
choice of your Strength or Dexterity modifier for the
attack and damage rolls. You must use the same modifier
for both rolls.

Firearm*

You don’t add your ability modifier to the weapon’s
damage, unless otherwise stated. Firearm ammunition is
destroyed upon use.

Heavy

You have Disadvantage on attack rolls with a Heavy
weapon if it’s a Melee weapon and your Strength score
isn’t at least 13 or if it’s a Ranged weapon and your
Dexterity score isn’t at least 13.

14
Complete Gunslinger
