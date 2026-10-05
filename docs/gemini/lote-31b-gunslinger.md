# Encargo: Lote 31b (Gunslinger) de la app "Mi turno"

"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el formato de
abajo, lo que se pide, usando **solo el texto en inglés que viene al final**: material de la comunidad (Mage Hand Press, 2024 (reglas 2024)), no oficial de
Wizards. Esta es la parte 2 de 2 de este material. Otra persona revisa y aplica tu respuesta con un script, así que el formato tiene que
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

[Página 18]
Light

When you take the Attack action on your turn and attack
with a Light weapon, you can make one extra attack
as a Bonus Action later on the same turn. That extra
attack must be made with a different Light weapon, and
you don’t add your ability modifier to the extra attack’s
damage unless that modifier is negative.

Range

A Range weapon has a range in parentheses after the
Ammunition, Blaster, or Thrown property. The range
lists two numbers. The first is the weapon’s normal
range in feet, and the second is the weapon’s long range.
When attacking a target beyond normal range, you have
Disadvantage on the attack roll. You can’t attack a target
beyond the long range.

Recoil*

After you make an attack with this weapon, you can’t
make ranged attacks beyond the weapon’s normal range
until the end of the current turn.

Reload*

This weapon can be used to make a number of attacks
before it must be reloaded. If you are proficient with the
weapon, reloading it takes an action or a Bonus Action;
otherwise, reloading it takes an action.

normal range. Each creature within the Sphere makes
a Dexterity saving throw (DC 8 plus your Strength or
Dexterity modifier and your Proficiency Bonus). On a
failed save, a creature takes the weapon’s damage, but
don’t add your ability modifier to that damage unless that
modifier is negative. On a successful save, a creature takes
half as much damage. You can create an explosion only
once per turn.

Jolt*

If you hit a creature with this weapon, the creature can’t
make Opportunity Attacks until the start of its next turn.

Mounted*

You can take a Bonus Action to mount this weapon in
a fixed position until the end of your turn. A damage
value in parentheses appears with this property. While
mounted, the weapon deals that damage when used to
make a ranged attack, and the weapon can’t be moved.

Overheat*

If you hit a target with this weapon, you can overcharge
the weapon. If you do so, the target takes extra damage
of the weapon’s type equal to your Proficiency Bonus.
The weapon then Overheats. An Overheated weapon
can’t be used again to make an attack until the end of
your next turn.

Two-Handed

Push

Mastery Properties

Sap

A Two-Handed weapon requires two hands when you
attack with it.
Each weapon has a mastery property, which is usable only
by a character who has a feature, such as Weapon Mastery,
that unlocks the property for the character. The properties
used in this book are defined below. New mastery
properties are marked with an asterisk (*).

Automatic*

When you make an attack with this weapon, you can
choose to make two attacks instead. These attacks
are always made with Disadvantage, regardless of
circumstance. You can’t replace these attacks. If this
weapon has the Ammunition property, these attacks use
twice the normal amount of ammunition.

If you hit a creature with this weapon, you can push the
creature up to 10 feet straight away from yourself if it is
Large or smaller.
If you hit a creature with this weapon, that creature has
Disadvantage on its next attack roll before the start of
your next turn.

Scatter*

Being within 5 feet of an enemy doesn’t impose
Disadvantage on your ranged attack rolls with this weapon.

Sighted*

Attacking at long range with this weapon doesn’t impose
Disadvantage on your attack rolls. When you hit a creature
with an attack using this weapon at long range, you can
reroll any of the damage dice and must use the new roll.

Slow

Bludgeon*

You can treat this weapon as a Melee weapon with the
Finesse property. When you hit a creature with a melee
attack using this weapon, it deals Bludgeoning damage
equal to 1d6 plus the ability modifier used for the attack
roll, or 1d8 if the weapon is used with two hands to make
the attack.

If you hit a creature with this weapon and deal damage
to it, you can reduce its Speed by 10 feet until the start
of your next turn. If the creature is hit more than once
by weapons that have this property, the Speed reduction
doesn’t exceed 10 feet.

Explode*

If you hit a creature with this weapon and deal damage to
the creature, you have Advantage on your next attack roll
against that creature before the end of your next turn.

When you take the Attack action, you can replace one
of your attacks with an explosion from this weapon’s
projectile. This explosion is a 5-foot-radius Sphere
centered on a point you choose within the weapon’s

Vex

15
Mage Hand Press

[Página 19]
Renaissance Firearms
Name

Damage

Properties

Mastery Weight

Cost

Martial Ranged Weapons
Blunderbuss

1d12 Piercing

Ammunition (Range 20/60; Shot), Heavy, Loading,
Two-Handed

Scatter

15 lb.

750 GP

Musket

1d12 Piercing

Ammunition (Range 40/120; Bullet), Loading,
Two-Handed

Slow

10 lb.

500 GP

Pistol

1d10 Piercing

Ammunition (Range 30/90; Bullet), Loading

Vex

3 lb.

250 GP

Properties

Mastery

Weight

Cost

Industrial Age Firearms
Name

Damage

Simple Ranged Weapons
Double-Barrel
Shotgun

2d6 Piercing Ammunition (Range 20/60; Shell), Firearm, Recoil,
Reload (2), Two-Handed

Scatter

8 lb.

175 GP

Hunting Rifle

2d6 Piercing Ammunition (Range 80/320; Bullet), Firearm,
Reload (4), Two-Handed

Sighted

8 lb.

150 GP

Parlor Gun

2d4 Piercing Ammunition (Range 30/120; Bullet), Firearm, Light,
Reload (2)

Vex

1 lb.

75 GP

Revolver

2d6 Piercing Ammunition (Range 30/120; Bullet), Firearm,
Recoil, Reload (6)

Slow

3 lb.

125 GP

Martial Ranged Weapons
Cannon

2d8 Fire

Gatling Gun
Magnum

Ammunition (Range 100/400; Cannonball),
Firearm, Heavy, Loading, Two-Handed

Explode

225 lb. 1,500 GP

2d6 Piercing Ammunition (Range 60/240; Bullet), Firearm,
Heavy, Reload (40), Two-Handed

Automatic

125 lb.

750 GP

2d8 Piercing Ammunition (Range 30/120, Bullet), Firearm,
Heavy, Recoil, Reload (6)

Slow

6 lb.

600 GP

Weight

Cost

Modern Firearms
Name

Damage

Properties

Mastery

Ammunition (Range 30/120; Flare), Firearm, Loading

Slow

1 lb.

100 GP

Vex

3 lb.

125 GP

300 GP

Simple Ranged Weapons
Flare Gun

2d6 Fire

Handgun

2d4 Piercing Ammunition (Range 30/120; Bullet), Firearm, Light,
Reload (10)

Martial Ranged Weapons
Assault Rifle

2d6 Piercing Ammunition (Range 80/320; Bullet), Firearm, Reload
(20), Two-Handed

Automatic

7 lb.

Grenade
Launcher

2d8 Fire

Ammunition (40/160; Grenade), Firearm, Loading,
Two-Handed

Explode

10 lb. 1,000 GP

Pump
Shotgun

2d8 Piercing Ammunition (Range 20/60, Shell), Firearm, Heavy,
Recoil, Reload (8), Two-Handed

Scatter

7 lb.

550 GP

Sniper Rifle

2d8 Piercing Ammunition (Range 100/400, Bullet), Firearm, Heavy,
Loading, Two-Handed

Sighted

8 lb.

450 GP

Automatic

6 lb.

250 GP

Submachine 2d4 Piercing Ammunition (20/60; Bullet), Firearm, Light,
Gun
Reload (16)

16
Complete Gunslinger

[Página 20]
Futuristic Firearms
Name

Damage

Properties

Mastery Weight

Cost

Antimatter Pistol 2d4 Necrotic

Blaster (Range 30/120), Firearm, Light

Vex

2 lb. 100 GP

Avia-Ra Sunstaff

2d6 Radiant

Blaster (Range 80/320), Firearm, Two-Handed

Bludgeon

6 lb. 250 GP

Bolt Caster

2d6 Force

Blaster (Range 30/120), Cooldown, Firearm

Push

5 lb. 150 GP

Ion Cannon

2d6 Radiant

Blaster (Range 20/60), Firearm, Recoil, Two-Handed Scatter

Phaser

2d4 Lightning Blaster (Range 30/120), Firearm, Light

Simple Ranged Weapons

Standard Carbine 2d6 Radiant

6 lb. 275 GP

Jolt

2 lb. 100 GP

Blaster (Range 80/320), Firearm, Two-Handed

Slow

7 lb.

Automatic

4 lb. 400 GP

175 GP

Martial Ranged Weapons
Antimatter
Carbine

2d6 Necrotic

Blaster (Range 80/320), Firearm, Two-Handed

Blitz Cannon

2d8 Radiant

Blaster (Range 20/60), Firearm, Recoil, Two-Handed Scatter

7 lb. 650 GP

Concussion Rifle 2d8 Force

Blaster (Range 90/360), Firearm, Heavy, Recoil,
Two-Handed

Sighted

8 lb. 550 GP

Dueling Laser

2d6 Radiant

Blaster (Range 30/120), Cooldown, Firearm, Light

Slow

3 lb. 350 GP

Magnus

2d8 Radiant

Blaster (Range 30/120), Cooldown, Firearm, Heavy Overheat

6 lb. 700 GP

Plasma Launcher 2d8 Fire

Blaster (Range 80/320), Cooldown, Firearm, TwoHanded

Explode

8 lb. 750 GP

REC Gun

2d6 Radiant

Blaster (Range 100/400), Firearm, Heavy, TwoHanded

Mounted
(2d8)

40 lb. 600 GP

Repeater

2d6 Radiant

Blaster (Range 60/240), Firearm

Vex

3 lb. 300 GP

Swarm Pistol

2d4 Radiant

Blaster (Range 20/60), Firearm, Light

Automatic

2 lb. 350 GP

17
Mage Hand Press

[Página 21]
Weapon Descriptions
Many of the weapons on the Firearm tables, such as
Muskets, Revolvers, and Double-Barrel Shotguns, are
common fixtures in action movies and the real world.
Some of the less obvious firearms and all of the futuristic
blasters are detailed below.
Antimatter Carbine. A more lethal model of the
Standard Carbine, this rifle can automatically fire bolts of
antimatter with surprising accuracy.
Antimatter Pistol. A compact, antimatter-firing
companion to the Antimatter Carbine, the Antimatter
Pistol is an essential close-quarters backup.
Avia-Ra Sunstaff. This long staff, forked at its end
near a prominent gemstone, is a blaster in its own right.
When used in expert hands, the Sunstaff can bludgeon,
trip, and strike foes as a Quarterstaff, only to be squeezed
in both hands to fire a burst of hot plasma
Blitz Cannon. With its imposing rectangular muzzle,
this brutalist weapon has a clear right and wrong end.
Pulling its trigger unleashes a torrent of lightning bolts in
a wide, imprecise spray, making it extremely dangerous at
point-blank range.
Bolt Caster. An early but reliable blaster design that
resembles a crossbow, the Bolt Caster issues single shots
of plasma with a long cooldown between shots.
Cannon. Smoothbore, muzzleloading Cannons
are common fixtures on pirate ships and defensive
fortifications, capable of splintering wood and reducing
stone to gravel with a thunderous boom. Larger siege
weapons of this type exist, and require entire teams of
operators to position, load, and fire.
Concussion Rifle. A series of arcane capacitors
run the length of this rifle, terminating in a thick
condenser that compresses its blast into a precise burst. A
Concussion Rifle is especially deadly at long ranges, and
its damage bypasses most energetically-resistant armor.
Dueling Laser. A pistol intended for honorable, oneon-one duels, the Dueling Laser fires a blinding streak of
light and promptly overheats. Spacers favor a Dueling Laser
in their offhand for an infrequent but powerful retort.
Ion Cannon. The Ion Cannon fires a bright, diffuse
cone, rendering it deadly up close. Between shots, it
makes a quiet zipping noise, as the arcane battery charges
the ion cell for another blast.
Magnus. This impressive handgun weighs almost
twice that of a Repeater. Its infamous heft, recoil, and
stopping power make it a favorite of spacers that accept no
compromises.
Parlor Gun. The smallest usable firearm, a Parlor Gun
can be tucked into a stocking or hidden down a sleeve for
two barrels of point-blank fire.

Phaser. Phasers aren’t designed for effectiveness so
much as portability and non-lethality. These blasters are
often issued to peace-keepers and emissaries that require
personal defense but have no intent to kill.
Pistol. The earliest type of one-handed firearm, a
Pistol operates as a miniature Musket, loading and firing a
single heavy projectile with deadly results.
Plasma Launcher. This short tube launches an orb
of superheated plasma in an arc. On contact, the ball of
plasma pops like a balloon, exploding in a dazzling fireball
of sparks.
REC Gun. The Revolving Exothermic Cannon (or
REC gun, for short) operates on the same principle as a
conventional blaster, with an arcane battery hooked up
to an aperture barrel and so forth, but mounts several
blasters on a revolving cylinder and fires each in rapid
succession. A tripod mount keeps the blaster stable
despite its heft and shocking recoil.
Repeater. The quintessential handheld blaster,
the Repeater is a staple on the Galactic Frontier. Solid,
reliable, and packing just enough firepower to bring down
an assailant, nearly every explorer worth their salt has one
of these blasters strapped to their hip.
Standard Carbine. As its name might suggest, the
Standard Carbine is the standard-issue blaster for all
Hegemony and Coalition troops, which makes it one of
the most pervasive weapons in the ‘Verse. Spacers of all
stripes employ it for its compact size and superb accuracy.
Swarm Pistol. This handheld blaster, styled much like
a Repeater, has a wickedly fast automatic fire, capable of
spewing dozens of rays in seconds. Dexterous users might
even find it possible to use one in each hand for a dazzling
spectacle of plasma bolts.

Firearm Ammunition
Ammunition is required by a weapon that has the
Ammunition property. A weapon’s description
specifies the type of ammunition used by the weapon.
The following Ammunition table lists new types of
ammunition used by firearms and the amount you get
when you buy them.
Firearm ammunition is destroyed upon use.
Type

Amount

Weight

Cost

Bullets

10

1 ½ lb.

3 GP

Cannonballs 5

10 lb.

25 GP

Flares

5

5 lb.

5 GP

Grenades

5

3 lb.

25 GP

Shells

10

1 ½ lb.

5 GP

Shot

10

2 lb.

1 GP

18
Complete Gunslinger

[Página 22]
New Feats

This section offers a collection of new feats, which are
special features not tied to a character class. A feat
represents a talent or an area of expertise that gives
a character special capabilities. It embodies training,
experience, and abilities beyond what a class provides.

Blaster Master

General Feat (Prerequisite: Level 4+, Dexterity 13+)
You gain the following benefits:
Ability Score Increase. Increase your Dexterity score
by 1, to a maximum of 20.
Blaster Roulette. If you roll the same number of two
damage dice for a weapon with the Firearm property, you
deal bonus damage equal to that number. You can only
add this bonus damage once per turn.
Ignore Cooldown. You ignore the Cooldown property
of weapons.
Run and Gun. When you take the Dash or Disengage
action, you can make a ranged attack using a weapon as a
Bonus Action.

Iron Hero

General Feat (Prerequisite: Level 4+)
You gain the following benefits.
Ability Score Increase. Increase your Strength or
Dexterity score by 1, to a maximum of 20.
Underdog’s Resolve. When you are attacked by a
creature that has a CR higher than your character level,
you gain a +2 bonus to your Armor Class for that attack.
Vengeful Strike. You have Advantage on attack rolls
against any creature that has reduced one of your allies to
0 Hit Points since the end of your last turn.
Heroic Intervention. When an enemy you can
see takes a Legendary Action, you can take a Reaction
to intercede, preventing the Legendary Action from
happening. You can take this Reaction a number of times
equal to your Proficiency Bonus and regain all expended
uses when you finish a Short or Long Rest

Marksman’s Luck

General Feat (Prerequisite: Level 4+, Dexterity 13+)
You gain the following benefits.
Ability Score Increase. Increase your Dexterity score
by 1, to a maximum of 20.
Flip Die. Once per turn, when you roll for damage
with a Ranged weapon, you can flip one of the damage
dice over and use the number on the bottom. You can’t
use this ability on d4s. Note that for a balanced die, the
top and bottom numbers add up to one more than the
die’s largest number.
Enhanced Critical. When you score a Critical Hit
with a Ranged weapon, the target’s Speed is 0 until the end
of its next turn.

Gun-Mage Adept

General Feat (Prerequisites: Level 4+, Spellcasting or Pact
Magic Feature)
You gain the following benefits.
Ability Score Increase. Increase your Dexterity by 1,
to a maximum of 20.
Ranged Weapon Proficiency. You gain proficiency
with Ranged Martial weapons.
Cantrip. You learn the Finger Guns cantrip.
Expanded Spell List. The following spells are added to
your spell list: Antiballistics Field, Ballistic Smite, Conjure
Cannonball, Conjure Cover, Jam Weapon, Jethro’s Instant
Reload, and Perforating Shot.
Spells Prepared. Choose a number of spells equal
to your Proficiency Bonus from among those in the
Expanded Spell List benefit. You always have these
spells prepared. Whenever you gain a new level, you can
replace one of these spells with a different spell from the
Expanded Spell List.

19
Mage Hand Press

[Página 23]
New Spells

Choose Acid, Cold, Fire, Lightning, Poison, or Thunder
damage. The target hit by the attack takes an extra 2d6
damage of the chosen type. The triggering attack can
deal the chosen damage type or its normal damage type
(your choice).
Using a Higher-Level Spell Slot. The damage
increases by 1d6 for each spell slot level above 1.

Spell Descriptions

Concealed Shot

This section contains the descriptions of spells that
are new and available to all classes. The class spell lists
detailed with each spell include other classes from Mage
Hand Press, including the Necromancer, Martyr, and
Investigator.
New spells are presented in alphabetical order.

Antiballistics Field

Level 6 Abjuration (Cleric, Necromancer, Wizard)
Casting Time: Action
Range: Self
Components: V, S, M (a pinch of wet gunpowder)
Duration: Concentration, up to 10 minutes

A 40-foot Emanation extends from you, disrupting
projectiles and causing Ranged weapons to malfunction.
Within the Emanation, whenever a Ranged weapon is
used for an attack, the weapon immediately malfunctions
and the attack is lost. A malfunctioning weapon can’t
be used to make an attack until a creature takes the
Utilize action to fix the weapon malfunction. Ranged
attacks using weapons whose projectiles pass through the
Emanation have Disadvantage and deal only half damage
on a hit.

Ballistic Smite

Level 1 Evocation (Paladin)
Casting Time: Bonus Action, which you take
immediately after hitting a creature with a Ranged
weapon
Range: Self
Components: V
Duration: Instantaneous

Illusion Cantrip (Bard, Druid, Necromancer, Sorcerer,
Warlock, Warmage, Wizard)
Casting Time: Action
Range: Touch
Components: S, M (a Ranged weapon)
Duration: 1 minute

A Ranged weapon you touch is made supernaturally
subtle. For the duration, when you make a ranged attack
using the weapon, the weapon or ammunition you’re
using becomes invisible while in flight and the weapon
becomes silent. If the weapon produces smoke or light,
the spell suppresses these effects. The weapon or projectile
you’re using becomes visible again after the attack hits
or misses. If you are hidden and the target is 80 feet or
further from you, the attack doesn’t reveal your location.

Conjure Cannonball

Level 3 Conjuration (Sorcerer, Wizard)
Casting Time: Action
Range: 600 feet
Components: V, S, M (a small replica cannon)
Duration: Instantaneous

You summon a cannonball, mid-flight and at full velocity,
which explodes on impact. Make a ranged spell attack roll
against a target you can see within range. On a hit, the target
takes 5d10 Bludgeoning damage and an explosion extends
from it in a 5-foot Emanation. Each creature other than the
target within the Emanation makes a Dexterity saving throw,
taking half as much damage as the target on a failed save.
Using a Higher-Level Spell Slot. The damage
increases by 1d10 for each slot level above 3.

20
Complete Gunslinger

[Página 24]
Jam Weapon

Level 2 Transmutation (Bard, Witch, Wizard)

Conjure Cover

Level 1 Conjuration (Druid, Investigator, Paladin, Sorcerer,
Wizard)
Casting Time: Bonus Action
Range: 10 feet
Components: V, S, M (a duck figurine)
Duration: Concentration, up to 1 hour

You conjure a low cobblestone wall along the ground at
a point you can see within range. The wall is 18 inches
thick and is composed of three 5-foot-long, 3-foot-high
segments. Each segment must be contiguous with at least
one other segment.
A Medium creature that hunkers behind the wall
has Half Cover, and a Small creature that hunkers behind
it has Three-Quarters Cover. The wall can be leapt over
without spending any additional movement.
Each segment has AC 10 and 30 hit points. Reducing
a segment of the wall to 0 hit points causes it to crumble,
destroying it. The wall disappears when all the segments
are destroyed or the spell ends.

Finger Guns

Evocation Cantrip (Bard, Sorcerer, Warmage, Wizard)
Casting Time: Bonus Action
Range: Self
Components: V, S
Duration: 1 minute

You extend your forefinger and thumb, a dangerous
gesture mimicking a gun. For the duration, your hand
counts as a Simple Ranged weapon with a range of 60/240
feet and the Slow mastery property. You can use your
spellcasting ability instead of Dexterity for the attack rolls
of this weapon. On a hit, the weapon deals 2d6 Force
damage and doesn’t add your ability modifier to damage.
Cantrip Upgrade. The weapon’s normal range
increases by 30 feet and its long range increases by 120
feet when you reach levels 5 (90/360 feet), 11 (120/480
feet), and 17 (150/600 feet).

Casting Time: Reaction, which you take when a
creature you can see within range makes an attack
using a Ranged weapon
Range: 60 feet
Components: V, S, M (a pinch of wet gunpowder)
Duration: Instantaneous

The weapon you target suffers a malfunction and the
attack fails. A malfunctioning weapon can’t be used to
make an attack until a creature takes the Utilize action to
fix the weapon malfunction.

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

Perforating Shot

Level 1 Evocation (Martyr, Paladin, Ranger)
Casting Time: Bonus Action, which you take
immediately after hitting or missing with a ranged
attack using a weapon
Range: Self
Components: V
Duration: Instantaneous

As your attack hits or misses the target, the weapon
or ammunition transforms into a 5-foot-wide Line of
magical energy that extends out to the weapon’s normal
range. The Line includes the attack’s original target.
Each creature within the Line makes a Dexterity saving
throw, taking Force damage equal to the weapon’s normal
damage on a failed save or half as much damage on a
successful one.
Using a Higher-Level Spell Slot. The weapon’s damage
increases by 1d8 for each slot level above 1.

21
Mage Hand Press

[Página 25]
Cross-Compatible
Subclasses

The Complete Captain, Complete Gunslinger, and Complete
Vagabond are designed with a suite of commonalities
that allow their subclasses to be cross-compatible with
one another. Certain Captain subclasses can be played in
the Gunslinger or Vagabond, and vice-versa! Consult the
following rules to play a cross-compatible subclass for any
of these classes.

Compatibility
Only subclasses with the same set of core features are
cross-compatible. The following table outlines which
subclasses can move are combatible with which classes,
and details any mechanical changes necessary for
compatibility.
Note that cross-compatible subclasses might be
stronger or weaker than other subclasses.
The GM decides if a subclass should be crosscompatible in your campaign.

Complete Captain
Subclass

Compatible With

Notes

Daggermark

Gunslinger, Vagabond

Level 10: Evasion (Gunslinger). You have Advantage on Dexterity saving
throws.

Demon Brand

—

—

Dragon Banner

Gunslinger, Vagabond

Level 6: Martial Recovery. Replace “all of your expended Battle Dice”
with “three of your expended Battle Dice.”
Level 14: Coup de Grâce [Maneuver] (Vagabond). You learn the Coup
de Grâce maneuver. If you already know it, you learn a different maneuver
of your choice.

Eagle Banner

Gunslinger, Vagabond

—

Holy Icon

—

—

Jolly Roger

Gunslinger, Vagabond

Level 10: Dirty Tactics. The Flank benefit applies to any ally, instead of
your Cohort.

Lion Banner

—

—

Siegeball Jersey Gunslinger, Vagabond

Level 6: Game Plan. Replace “When you use your Blitz feature, you can
direct your Cohort or an ally within 60 feet of yourself” with “When you
take the Attack action, you can replace one of your attacks with directing
an ally within 60 feet of yourself”.

Skull Banner

—

—

Star-Spangled
Banner

Gunslinger, Vagabond

Level 3: Shield Fighter (Gunslinger). You gain proficiency with Shields.
Level 3: Second Amendment (Vagabond). You gain the ability to use
the mastery property of one additional kind of weapon.
Level 6: Extra Attack. Replaced with the following: You have Advantage
on weapon attacks rolls during the first round of combat.

Star Wolf

—

—

Tower Banner

Vagabond

Level 10: Mettle (Vagabond). You have Advantage on Constitution
saving throws.

Yellow Sign

Gunslinger, Vagabond

Level 10: Frenzied Blitz. Replace with “You can give a creature that has
the Frenzied condition Advantage or Disadvantage on its attack rolls.”

22
Complete Gunslinger

[Página 26]
Complete Gunslinger
Subclass

Compatible With

Notes

Big Game Hunter Captain, Vagabond

—

Deadeye

Captain, Vagabond

—

Grenadier

Vagabond

Level 10: Take Cover. Replace “Evasion” with “Mettle.”

Gun Tank

Vagabond

Level 10: Bulletproof. Replace “Bite the Bullet” with “Dig Deep.”

Gun-Ko Master

Captain, Vagabond

—

High Roller

Captain, Vagabond

Level 10: Risk Taker (Captain). Replace “Maverick Spirit and Skin of Your
Teeth” with “Born Leader and Morale Boost”. Also replace “d6” with “d4”.
Level 10: Risk Taker (Vagabond). Replace “Maverick Spirit and Skin of
Your Teeth” with “Dig Deep and Knack”.

Laserist

Captain, Vagabond

—

Musketeer

Vagabond

Level 3: Infantry Training. Remove Martial Weapons and Melee Mastery
benefits.
Level 6: Morale Boost. Replace “Bite the Bullet” with “Dig Deep.”

Pistolero

Captain, Vagabond

Level 6: Disarm. Remove reference to Gut Shot. This feature triggers
whenever you score a Critical Hit.

Secret Agent

Captain, Vagabond

—

Space Cowboy

Vagabond

—

Spellslinger

Captain, Vagabond

Level 6: Spellshot (Captain). Replace with: your Finger Guns deal 2d10
Force damage.
Level 10: Counter-Mage. In the Antimagic Shot benefit, remove reference
to Gut Shot. This benefit triggers whenever you score a Critical Hit.

Trick Shot

Captain, Vagabond

Level 10: Deft Deflection [Maneuver]. Replace with: When an enemy you
can see hits a creature with a ranged attack roll, you can take a Reaction
and expend one Battle Die to attempt to intercept the attack. You must be
holding a Ranged weapon and the creature must be within your weapon’s
range to use this maneuver. Subtract the Battle Die from the attack roll,
potentially causing it to miss.

White Hat

Captain, Vagabond

—

Basic Modifications
Some small modifications need to be made for every
cross-compatible subclass.
Name Changes. Substitute the class name for the new
class wherever it appears, including references to your
level in the class.
Battle and Risk Dice. “Battle Dice” become “Risk
Dice” when moving a subclass to the Gunslinger and
vice-versa.
Cohort. Ignore references to a Captain’s Cohort when
using a cross-compatible Captain subclass.
Vagabond Maneuvers. If a subclass gives you a
Maneuver that you already know, you learn a different
maneuver of your choice.

23
Mage Hand Press

[Página 27]
Complete Vagabond
Subclass

Compatible With

Notes

Adrenaline Junkie Captain, Gunslinger Level 3: Adrenaline (Captain). You can’t use an Adrenaline Battle Die with
the Rally maneuver.
Brigand

Captain, Gunslinger —

Experiment X

Captain, Gunslinger —

Feylost

Captain, Gunslinger —

Gourmand

Captain, Gunslinger Level 10: Quick Snack. At the start of each of your turns, you can expend
one of your Hit Point Dice, roll it, and regain a number of Hit Points equal
to the roll plus your Constitution modifier (minimum of 1 Hit Point). Once
you use this feature, you can’t use it again until you finish a Short or Long
Rest. You can also restore your use of it by expending one Battle Die (no
action required).

Houndmaster

Captain, Gunslinger Level 3: Faithful Hound (Captain). The Hound is your Cohort and uses
the rules in the Cohort feature. The Hound uses your Charisma modifier for
attack and damage rolls. The Hound also has the Martial Excellence trait.
Level 5: Martial Excellence. The hound has a +1 bonus to its attack and
damage rolls. This bonus increases to +2 at Captain level 9, and +3 at
Captain level 13.

Knight Errant

Captain, Gunslinger —

Mage Brand

Captain, Gunslinger —

Plague Doctor

Captain, Gunslinger —

Pugilist

Captain, Gunslinger —

Ronin

Captain, Gunslinger —

Troubadour

Captain, Gunslinger —

24
Complete Gunslinger

[Página 28]
Producers
Donelloth
Mkscorpio89
Star
Laura Chrismon
Tyler Kohlman
Chase Harris
Blayne Wilson
Kabe-kun
Austin Kavanagh
Shaun Sullivan
Zeke DeLeon
Rude Velez

Suzuki
Anvil
Hayley Nichols
Trey Steele
MorphManDude
GayCowboy
Jesse Smith
Sean Daugherty
Kevin Reynolds
Liam Jones
BillOneEye
Jesse Rosen

NecroJester
Jacob Otwell
Treix Nyte
lungfishwarrior
Zee Xorn
Trivik
Joan Mulberry
Darion Nutter
D Miranda
Joel Grote
Patrick Rooney
PucThePlayful

Mike Litkewitsch
George Tolley
Michael Davis
Kura Tenshi
Alexander Garcia
Joseph Blanc
Ryan MacDonald
Pandric
Kat Woehlert
Matthew Atkins
Eike Schultz
Marc-Antoine Côté

License
This material is being released under the Open Gaming License.
OPEN GAME LICENSE Version 1.0a
The following text is the property of Wizards of the Coast, Inc. and is Copyright 2000 Wizards of the Coast, Inc (“Wizards”). All Rights Reserved.
1. Definitions: (a)”Contributors” means the copyright and/or trademark owners who have contributed Open Game Content; (b)”Derivative Material” means copyrighted material
including derivative works and translations (including into other computer languages), potation, modification, correction, addition, extension, upgrade, improvement, compilation,
abridgment or other form in which an existing work may be recast, transformed or adapted; (c) “Distribute” means to reproduce, license, rent, lease, sell, broadcast, publicly display, transmit or otherwise distribute; (d)”Open Game Content” means the game mechanic and includes the methods, procedures, processes and routines to the extent such content
does not embody the Product Identity and is an enhancement over the prior art and any additional content clearly identified as Open Game Content by the Contributor, and means
any work co
vered by this License, including translations and derivative works under copyright law, but specifically excludes Product Identity. (e) “Product Identity” means product and product
line names, logos and identifying marks including trade dress; artifacts; creatures characters; stories, storylines, plots, thematic elements, dialogue, incidents, language, artwork,
symbols, designs, depictions, likenesses, formats, poses, concepts, themes and graphic, photographic and other visual or audio representations; names and descriptions of characters, spells, enchantments, personalities, teams, personas, likenesses and special abilities; places, locations, environments, creatures, equipment, magical or supernatural abilities or
effects, logos, symbols, or graphic designs; and any other trademark or registered trademark clearly identified as Product identity by the owner of the Product Identity, and which
specifically excludes the Open Game Content; (f) “Trademark” means the logos, names, mark, sign, motto, designs that are used by a Contributor to identify itself or its products
or the associated products contributed to the Open Game License by the Contributor (g) “Use”, “Used” or “Using” means to use, Distribute, copy, edit, format, modify, translate
and otherwise create Derivative Material of Open Game Content. (h) “You” or “Your” means the licensee in terms of this agreement. Not for resale. Permission granted to print or
photocopy this document for personal use only. System Reference Document 5.0 2
2. The License: This License applies to any Open Game Content that contains a notice indicating that the Open Game Content may only be Used under and in terms of this
License. You must affix such a notice to any Open Game Content that you Use. No terms may be added to or subtracted from this License except as described by the License itself.
No other terms or conditions may be applied to any Open Game Content distributed using this License.
3. Offer and Acceptance: By Using the Open Game Content You indicate Your acceptance of the terms of this License.
4. Grant and Consideration: In consideration for agreeing to use this License, the Contributors grant You a perpetual, worldwide, royalty-free, nonexclusive license with the exact
terms of this License to Use, the Open Game Content.
5. Representation of Authority to Contribute: If You are contributing original material as Open Game Content, You represent that Your Contributions are Your original creation and/
or You have sufficient rights to grant the rights conveyed by this License.
6. Notice of License Copyright: You must update the COPYRIGHT NOTICE portion of this License to include the exact text of the COPYRIGHT NOTICE of any Open Game
Content You are copying, modifying or distributing, and You must add the title, the copyright date, and the copyright holder’s name to the COPYRIGHT NOTICE of any original
Open Game Content you Distribute.
7. Use of Product Identity: You agree not to Use any Product Identity, including as an indication as to compatibility, except as expressly licensed in another, independent Agreement
with the owner of each element of that Product Identity. You agree not to indicate compatibility or co-adaptability with any Trademark or Registered Trademark in conjunction
with a work containing Open Game Content except as expressly licensed in another, independent Agreement with the owner of such Trademark or Registered Trademark. The use
of any Product Identity in Open Game Content does not constitute a challenge to the ownership of that Product Identity. The owner of any Product Identity used in Open Game
Content shall retain all rights, title and interest in and to that Product Identity.
8. Identification: If you distribute Open Game Content You must clearly indicate which portions of the work that you are distributing are Open Game Content.
9. Updating the License: Wizards or its designated Agents may publish updated versions of this License. You may use any authorized version of this License to copy, modify and
distribute any Open Game Content originally distributed under any version of this License.
10. Copy of this License: You MUST include a copy of this License with every copy of the Open Game Content You Distribute.
11. Use of Contributor Credits: You may not market or advertise the Open Game Content using the name of any Contributor unless You have written permission from the Contributor to do so.
12. Inability to Comply: If it is impossible for You to comply with any of the terms of this License with respect to some or all of the Open Game Content due to statute, judicial
order, or governmental regulation then You may not Use any Open Game Material so affected.
13. Termination: This License will terminate automatically if You fail to comply with all terms herein and fail to cure such breach within 30 days of becoming aware of the breach.
All sublicenses shall survive the termination of this License.
14. Reformation: If any provision of this License is held to be unenforceable, such provision shall be reformed only to the extent necessary to make it enforceable. 15. COPYRIGHT NOTICE
Open Game License v 1.0a Copyright 2000, Wizards of the Coast, Inc.
System Reference Document 5.0 Copyright 2016, Wizards of the Coast, Inc.;
Complete Gunslinger Copyright 2020, Mage Hand Press LLC; authors Michael Holik, Beniamin Ghita
END OF LICENSE
