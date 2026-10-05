# Encargo: Lote 36c (Craftsman Complete) de la app "Mi turno"

"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el formato de
abajo, lo que se pide, usando **solo el texto en inglés que viene al final**: material de la comunidad (Valda's Spire of Secrets (reglas 2014)), no oficial de
Wizards. Esta es la parte 3 de 5 de este material. Otra persona revisa y aplica tu respuesta con un script, así que el formato tiene que
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

[Página 33]
Melee Weapons Cont.
Weapon

Cost

Damage

Weight

Properties

Exotic Melee Weapons
Bastard Sword

150 gp

1d10 slashing

5 lb.

Versatile (1d12)

Blast Maul

160 gp

1d12 bludgeoning

18 lb.

Heavy, two-handed, rocket

Boomeraxe

160 gp

1d8 slashing

5 lb.

Light, returning, thrown (20/60), versatile (1d10)

Booster Sword

165 gp

1d8 slashing

8 lb.

Rocket, versatile (1d10)

Bowblade

215 gp

1d8 slashing

5 lb.

Versatile (1d10), switch (ranged 1d8 piercing;
ammunition (range 150/600), heavy, two-handed)

Canelash

167 gp

1d6 slashing

4 lb.

Finesse, reach, switch (melee 1d8 bludgeoning;
versatile (1d10))

Carver

185 gp

1d10 slashing

6 lb.

Brutal, heavy, reach, two-handed, switch (melee 1d8
slashing; brutal)

Chained Anchor

215 gp

2d8 bludgeoning

80 lb.

Heavy, massive, reach, superheavy, two-handed

Chainwhip

152 gp

1d6 bludgeoning

4 lb.

Finesse, light, reach, trip

Component Sword

220 gp

2d6 slashing

7 lb.

Heavy, two-handed, switch (melee 1d6 slashing;
finesse, light, paired)

Deckhammer

270 gp

1d12 bludgeoning

48 lb.

Heavy, special, superheavy, two-handed, switch (melee
1d8 slashing)

Dervish

175 gp

1d8 slashing

4 lb.

Double, finesse, light

Double-Sword

165 gp

1d10 slashing

6 lb.

Double, versatile (1d12)

Dwarven Waraxe

160 gp

1d10 slashing

6 lb.

Double, thrown (range 20/60), versatile (1d12)

Elven Foil

225 gp

1d10 piercing

1 lb.

Elegant, finesse, light, parrying

Gargoyle Axe

230 gp

2d8 slashing

20 lb.

Brutal, heavy, superheavy, two-handed

Greatspear

110 gp

1d10 piercing

5 lb.

Thrown (range 20/60), versatile (1d12)

Grim Scythe

200 gp

1d10 slashing

4 lb.

Elegant, finesse, light, precision, versatile (1d12)

Hinge Spear

205 gp

2d6 piercing

12 lb.

Heavy, two-handed, switch (melee 1d10 piercing;
double, two-handed)

Kusarigama

105 gp

1d10 slashing

4 lb.

Finesse, reach, trip, two-handed

1d4 piercing

8 lb.

Reach, special, two-handed

Mancatcher
Meteor Chain

175 gp

1d12 bludgeoning

14 lb.

Heavy, reach, trip, two-handed

Mountain Cleaver

250 gp

2d10 slashing

45 lb.

Heavy, massive, superheavy, two-handed

Parrying Dagger

100 gp

1d6 piercing

1 lb.

Finesse, light, parrying

Rifle Spear

225 gp

1d8 piercing

15 lb.

Versatile (1d10), switch (ranged firearm 2d8 piercing;
ammunition (range 40/120), two-handed)

Ripsword

200 gp

1d10 slashing

10 lb.

Brutal, versatile (1d12)

Rocket Fist

210 gp

1d4 bludgeoning

3 lb.

Fist, light, returning, rocket, thrown (range 40/120)

Shotfist

260 gp

1d6 bludgeoning

8 lb.

Fist, switch (ranged firearm 2d6 piercing; ammunition
(range 40/120), reload (2), scatter (2d8))

Spiked Chain

205 gp

1d10 piercing

6 lb.

Double, reach, trip, two-handed

Splitstaff

205 gp

1d8 bludgeoning

4 lb.

Finesse, versatile (1d10), switch (melee 1d6
bludgeoning; light, paired)

Spring Fist

150 gp

1d6 bludgeoning

3 lb.

Fist, reach

Titan Maul

230 gp

2d10 bludgeoning

20 lb.

Heavy, massive, superheavy, two-handed

Warpike

105 gp

1d12 piercing

15 lb.

Heavy, reach, two-handed

Whipsword

155 gp

1d8 slashing

4 lb.

Finesse, reach

Zweihander

200 gp

2d8 slashing

15 lb.

Heavy, superheavy, two-handed

31
magehandpress.com

[Página 34]
Ranged Weapons
Weapon

Cost Damage

Weight Ammo.

Properties

Simple Ranged Weapons
Bolas

3 gp ―

2 lb. ―

Special, thrown (range 20/60)

Boomerang

2 gp 1d4 bludgeoning 1/4 lb. ―

Light, returning, thrown (range 30/120)

Chakram

2 gp 1d4 slashing

1 lb. ―

Light, thrown (30/120)

200 gp 2d6 piercing

8 lb. Shells

Ammunition (range 40/120), reload (2), scatter
(2d8), two-handed

Flintlock

75 gp 2d6 piercing

6 lb. Bullets

Ammunition (range 40/120), dry, loading, misfire

Handgun

100 gp 2d4 piercing

3 lb. Bullets

Ammunition (range 40/120), light, reload (10)

Simple Firearms
Double-Barrel
Shotgun

Hunting Rifle

175 gp 2d6 piercing

8 lb. Bullets

Ammunition (range 80/240), reload (5), two-handed

Ion Cannon

250 gp 2d6 radiant

6 lb. ―

Blaster (range 30/90), scatter (2d8), two-handed

Machine Pistol

150 gp 2d4 piercing

5 lb. Bullets

Ammunition (range 20/60), automatic, foregrip,
light, reload (10)

Parlor Gun

75 gp 2d4 piercing

2 lb. Bullets

Ammunition (range 20/60), collapsible, light, reload
(1)

Phaser

75 gp 2d4 radiant

6 lb. ―

Blaster (range 60/180), light, nonlethal

Repeater

100 gp 2d6 radiant

3 lb. ―

Blaster (range 60/180)

Revolver

100 gp 2d6 piercing

3 lb. Bullets

Ammunition (range 40/120), reload (6)

Sawed-Off Shotgun

200 gp 2d6 piercing

6 lb. Shells

Ammunition (range 20/60), foregrip, reload (2),
scatter (2d8)

Standard Carbine

150 gp 2d6 radiant

7 lb. ―

Automatic, blaster (range 60/180), two-handed

Submachine Gun

200 gp 2d6 piercing

6 lb. Bullets

Ammunition (range 40/120), automatic, reload (16),
two-handed

Swarm Pistol

100 gp 2d4 radiant

2 lb. ―

Automatic, blaster (range 30/90), foregrip, light

Martial Ranged Weapons
Crossbow, Repeating

150 1d8 piercing
gp

22 lb. Bolts

Ammunition (range 120/480), heavy, reload (5), twohanded

Dagger, Throwing

1 gp 1d4 piercing

1/4 lb. ―

Finesse, light, thrown (range 40/120)

Martial Firearms
Assault Rifle

350 gp 2d6 piercing

7 lb. Bullets

Ammunition (range 60/180), automatic, reload (20),
two-handed

Blitz Cannon

800 gp 2d8 lightning

7 lb. ―

Blaster (range 10/30), heavy, scatter (2d10), twohanded

Blunderbuss

180 gp 2d8 piercing

8 lb. Shells

Ammunition (range 20/60), dry, heavy, loading,
misfire, scatter (2d10), two-handed

Concussion Rifle

800 gp 2d8 thunder

8 lb. ―

Blaster (range 160/480), heavy, sighted, two-handed

Diode Beam

2,000 gp 2d8 radiant

80 lb. ―

Blaster (range 80/240), heavy, mounted, special,
two-handed

Gatling Gun

3,000 gp 2d10 piercing

125 lb. Bullets

Ammunition (range 60/180), automatic, heavy,
mounted, reload (40, 2 actions), two-handed

Grenade Launcher

850 gp 2d8 fire

10 lb. Grenades Ammunition (range 60/180), explosive, heavy,
loading, two-handed

Harpoon Gun

250 gp 2d8 piercing

10 lb. Harpoon Ammunition (range 40/120), dry, loading, misfire,
special, two-handed

32
magehandpress.com

[Página 35]
Ranged Weapons Cont.
Weapon

Cost Damage

Weight Ammo.

Properties

Impactor Cannon

1,250 gp 2d10 force

12 lb. ―

Light Cannon

3,000 gp 2d10
bludgeoning

225 lb. Cannon- Ammunition (range 120/360), explosive, heavy,
balls
reload (1, 2 actions), mounted, two-handed

Light Machine Gun

1,000 gp 2d8 piercing

60 lb. Bullets

Ammunition (range 60/180), automatic, heavy,
reload (40, 2 actions), two-handed

Magnum

500 gp 2d8 piercing

6 lb. Bullets

Ammunition (range 40/120), heavy, reload (6)

Magnus Opum

800 gp 2d10 radiant

10 lb. ―

Blaster (range 60/180), heavy, overheat

Musket

175 gp 2d8 piercing

10 lb. Bullets

Ammunition (range 60/180), dry, loading, misfire,
two-handed

Pump Shotgun

200 gp 2d6 piercing

7 lb. Shells

Ammunition (range 40/120), reload (12), scatter
(2d8), two-handed

REC Gun

1,500 gp 2d8 radiant

120 lb. ―

Automatic, blaster (range 80/240), heavy, mounted,
two-handed

Rocket Launcher

1,250 gp 2d8 fire

20 lb. Rockets

Ammunition (range 60/180), explosive, heavy,
reload (1, 2 actions), two-handed

Singularity Emitter

2,500 gp 1d20 force

400 lb. ―

Blaster (range 80/240), heavy, overheat, special,
two-handed

Martial Firearms Cont.

Sniper Rifle

Blaster (range 20/60), heavy, overheat, scatter
(2d12), two-handed

500 gp 2d8 piercing

8 lb. Bullets

Ammunition (range 160/480), heavy, reload (4),
sighted, two-handed

5 sp 1d6 piercing

2 lb. Javelins

Ammunition (range 60/120), finesse

Exotic Ranged Weapons
Atlatl
Crossbow, Automatic

325 gp 1d8 piercing

25 lb. Bolts

Ammunition (range 100/400), automatic, heavy,
reload (10), two-handed

Crossbow, Axe

180 gp 1d10 piercing

22 lb. Bolts

Ammunition (range 100/400), heavy, loading, twohanded, switch (melee 2d6 slashing; heavy, twohanded)

Crossbow, Shotbow

325 gp 1d8 piercing

25 lb. Bolts

Ammunition (range 50/200), heavy, reload (5),
scatter (1d12), two-handed

Demolition Bow

200 gp 1d8 fire

4 lb. Arrows

Ammunition (range 150/600), explosive, heavy,
two-handed

Doomerang

230 gp 1d4 fire

1/2 lb. ―

Elegant, light, returning, rocket, thrown (range
50/200)

Dragon Greatbow

350 gp 1d12 piercing

10 lb. Greatarrows

Ammunition (range 300/1,200), heavy, mounted,
tension, two-handed

Goliath Sling

20 gp 1d6 bludgeoning

1 lb. Stones

Ammunition (range 50/200), brutal, versatile (1d8)

Greatbow

250 gp 1d10 piercing

8 lb. Greatarrows

Ammunition (range 150/600), heavy, tension, twohanded

Portable Ballista

1,500 gp 2d6 piercing

40 lb. Ballista
bolts

Ammunition (range 200/800), heavy, loading,
mounted, two-handed

Saw Launcher

275 gp 1d12 slashing

15 lb. Saws

Ammunition (range 40/160), brutal, heavy, loading,
two-handed

Twinbow

150 gp 1d10 piercing

3 lb. Arrows

Ammunition (range 150/600), heavy, twinshot, twohanded

33
magehandpress.com

[Página 36]
Ranged Weapons Cont.
Weapon

Cost Damage

Weight Ammo.

Properties

Anti-Material Rifle

650 gp 2d10 piercing

30 lb. Bullets

Ammunition (range 320/960), heavy, mounted,
reload (4), sighted, two-handed

Assault Shotgun

350 gp 2d6 piercing

10 lb. Shells

Ammunition (range 80/240), automatic, heavy,
reload (12), scatter (2d8), two-handed

Binary Gun

650 gp 2d6 radiant

6 lb. ―

Automatic, blaster (range 60/180), two-handed,
twinshot, switch (ranged blaster 2d4 radiant;
automatic, blaster (range 60/180) light, paired)

Breach Gun

350 gp 2d6 fire

7 lb. Shells

Ammunition (range 80/240), explosive, heavy,
reload (8), scatter (2d8), two-handed

Briefcase Gun

650 gp 2d8 piercing

6 lb. Bullets

Ammunition (range 160/480), collapsible, heavy,
reload (4), sighted, two-handed

Double Handgun

350 gp 2d6 piercing

5 lb. Bullets

Ammunition (range 40/120), reload (10), twinshot

Grenade Launcher,
Revolving

900 gp 2d8 fire

16 lb. Grenades

Ammunition (range 60/180), explosive, heavy,
reload (6), two-handed

Magnum, Explosive

1,250 gp 2d8 fire

8 lb. Bullets

Ammunition (range 40/120), explosive, heavy,
reload (4)

Magnum,
Manstopper

750 gp 2d10 piercing

8 lb. Bullets

Ammunition (range 40/120), heavy, reload (1)

18 lb. ―

Blaster (range 120/360), explosive, heavy, mounted,
two-handed

Exotic Firearms

Plasma Launcher

1,400 gp 2d10 fire

Quadruple-Barreled
Shotgun

300 gp 2d8 piercing

12 gp. Shells

Ammunition (range 40/120), heavy, reload (4),
scatter (2d10), two-handed

Swarm Launcher

1,750 gp 2d10 fire

22 lb. Rockets

Ammunition (range 30/90), explosive, heavy, reload
(1, 2 actions), scatter (2d12), two-handed

Trench Gun

350 gp 2d6 piercing

8 lb. Shells

Ammunition (range 40/120), reload (12), scatter (2d
8), twinshot, two-handed

Weapons
Weapons come in an endless variety of flavors and designs,
from the subtle quickblade, to the bombastic rocket
launcher. With patience and dedication, a skilled warrior
can master even the most unwieldy or exotic weapons,
especially if such a weapon would give him an edge in the
life or death game of combat. This section details new
types of weapons, their properties, and special rules
pertaining to their use.
A craftsman can build any exotic weapon if they can
apply all of the relevant properties to it.

Weapon Properties
Many weapons have special properties related to their use,
as shown in the Melee Weapons table and Ranged
Weapons table.

34
magehandpress.com

Ammunition. You can use a weapon that has the
Ammunition property to make a ranged attack only if you
have ammunition to fire from the weapon. Each time you
attack with the weapon, you expend one piece of
ammunition. Drawing the ammunition from a quiver, case,
or other container is part of the attack (you need a free hand
to load a one-handed weapon). At the end of the battle, you
can recover half your expended ammunition by taking a
minute to search the battlefield. If you use a weapon that
has the Ammunition property to make a melee attack, you
treat the weapon as an improvised weapon (see
“Improvised Weapons” later in the section). A sling must
be loaded to deal any damage when used in this way.
Automatic. When you make an attack with this weapon
on your turn, you can choose to make two attacks with
disadvantage instead. These attacks always have
disadvantage, regardless of circumstance. These attacks use
double the normal amount of ammunition.

[Página 37]
Balanced. This weapon is suitable for nimble, swift
combat, despite its size. A weapon with this property can
be wielded by Small creatures without disadvantage.
Blaster. A weapon with the Blaster property is a
ranged weapon that requires no ammunition. Blasters are
considered firearms for the purpose of class features and
abilities. Like firearms, you don’t add your ability score
modifier to blasters’ damage rolls.
Brutal. This weapon deals two additional dice of
damage on a critical hit.
Collapsible. This weapon has hollowed out portions,
usually in the handle, allowing you to collapse it in on itself
for ease of storage and concealment. While stowed, you
have advantage on Dexterity (Stealth) checks made to
conceal this weapon.
Double. This weapon has two damage-dealing ends.
When you use the Attack action and make an attack with
this weapon, you can use your bonus action to make an
additional attack with it; you do not add your ability
modifier to the damage roll of this attack.
Dry. If this weapon is ever submerged in water or
doused with a significant quantity of water, it jams. A
jammed weapon can't be used to make an attack until a
creature uses its action to clear the weapon malfunction.
Elegant. This weapon requires exceptional skill to use.
You must have a Dexterity score of 16 or higher to wield
an elegant weapon.
Explosive. When this weapon’s projectile hits a target, it
explodes in a 5-foot radius. The projectile can be fired at an
unoccupied space within its range. Each creature other than
the target within the blast radius must succeed on a DC 14
Dexterity saving throw, taking half the damage rolled on a
failed save or no damage on a successful one.
Finesse. When making an attack with a finesse weapon,
you use your choice of your Strength or Dexterity modifier
for the attack and damage rolls. You must use the same
modifier for both rolls.
Fist. Attacks made with this weapon are treated as
unarmed strikes.
Foregrip. This weapon can be used with one or two
hands. If used in two hands, its normal and long ranges
double.
Heavy. Small creatures have disadvantage on attack
rolls with heavy weapons. A heavy weapon’s size and bulk
make it too large for a Small creature to use effectively.
Light. A light weapon is small and easy to handle,
making it ideal for use when fighting with two weapons.
Loading. Because of the time required to load this
weapon, you can fire only one piece of ammunition from it

when you use an action, bonus action, or reaction to fire it,
regardless of the number of attacks you can normally make.
Massive. Once you make an attack with this weapon,
you can't attack again until the beginning of your next turn.
If you would be able to attack more than once when you
take the Attack action on your turn, you deal an additional
two dice of damage when using this weapon.
Misfire. When you roll a 1 on the d20 for an attack roll
with this weapon, it jams. A jammed weapon can't be used
to make an attack until a creature uses its action to clear the
weapon malfunction.
Mounted. This weapon is normally used while attached
to a tripod, vehicle, or other bracing mount. You can mount
or unmount this weapon as an action. While it is mounted,
it can't be moved. It can only be used to make an attack
while unmounted if held by a Medium or larger creature
with a Strength score of at least 15.
Nonlethal. When you reduce a creature to 0 hit points
using this weapon, you can choose to knock the creature
out, rendering it unconscious, rather than deal a killing
blow.
Overheat. Once you make an attack with this weapon, it
can't be used again to make an attack until the end of your
next turn.
Paired. This weapon comes with a twin weapon using
the same statistics. Ideal for two-weapon fighting, you can
draw or stow both weapons at the same time. If you lose
one of the paired weapons, the remaining weapon loses this
property.
Parrying. While wielding this weapon and not wielding
a shield, you gain a +1 to your AC against melee attacks.
You can only gain the benefit of one weapon with this
property at a time.
Precision. Once per turn, you can deal an extra 1d6
damage to one creature you hit with this weapon if you
have advantage on the attack roll.
Range. A weapon that can be used to make a ranged
attack has a range in parentheses after the Ammunition,
Blaster, or Thrown property. The range lists two numbers.
The first is the weapon’s normal range in feet, and the
second indicates the weapon’s long range. When attacking
a target beyond normal range, you have disadvantage on
the attack roll. You can’t attack a target beyond the
weapon’s long range.
Reach. This weapon adds 5 feet to your reach when you
attack with it, as well as when determining your reach for
opportunity attacks with it.
Reload. This weapon can be used to make a number of
attacks before it must be reloaded. If you are not proficient
with the weapon, reloading it takes an action. If you are

35
magehandpress.com

[Página 38]
proficient, you can reload it as a bonus action. Some
weapons require longer to reload, even if you have
proficiency, which is specified in the Reload property. If
reloading a weapon requires longer than one action, the
weapon can’t be used to make attacks until reloading is
finished.
Returning. After being thrown, this weapon returns to
your hand at the end of your turn.
Rocket. This weapon has a small propulsive engine
attached to it or its projectiles. Once per turn, when you hit
a creature with this weapon, you can deal an additional 1d4
damage to the target.
Scatter. If you make an attack against a target that is
within half this weapon’s normal range, you deal the
damage value listed in parentheses instead of the weapon’s
normal damage dice.
Sighted. This weapon has disadvantage on attack rolls
made against targets within 20 feet.
Special. A weapon with the special property has unusual
rules governing its use, explained in the weapon’s
description (see “Special Weapons” later in this section).
Superheavy. This weapon is unusually large for its type.
You must have a Strength score of 16 or higher to
proficiently wield a superheavy weapon.
Switch. This weapon has two forms. The damage and
properties of the second form are listed in parentheses. You
can swap between which weapon is being used as if you
were drawing a weapon.
Tension. When making a ranged weapon attack with a
tension weapon, you use your choice of your Strength or
Dexterity modifier for the attack and damage rolls. You
must use the same modifier for both rolls.
Thrown. If a weapon has the Thrown property, you can
throw the weapon to make a ranged attack. If the weapon is
a melee weapon, you use the same ability modifier for that
attack roll and damage roll that you would use for a melee
attack with the weapon. For example, if you throw a
handaxe, you use your Strength, but if you throw a dagger,
you can use either your Strength or your Dexterity, since
the dagger has the Finesse property.
Trip. When you take the Attack action with this weapon
and hit a creature, instead of dealing damage, you can
immediately use a bonus action to attempt to shove that
creature prone. You have advantage on this shove attempt.
Twinshot. Once on each of your turns when you make
an attack with this weapon, you can make another attack
with it against a different creature that is within 5 feet of
the original target and within range of the weapon.
Two-Handed. This weapon requires two hands when
you attack with it.

36
magehandpress.com

Versatile. This weapon can be used with one or two
hands. A damage value in parentheses appears with the
property—the damage when the weapon is used with two
hands to make a melee attack.

Special Weapons
Weapons with special properties are described here.
Arc Baton. When a creature is hit with this weapon, it
can't take reactions until the start of its next turn.
Battlefist. This weapon acts as an oversized, articulated
gauntlet. It can hold and manipulate objects, though you
can’t attack with your battlefist while you’re holding an
object with it.
Bayonet. This weapon can be mounted to any twohanded crossbow, blaster, or firearm or removed from it as
an action. While mounted, you can use the bayonet to make
a two-handed melee weapon attack, which deals 1d8
piercing damage on a hit.
Bolas. A creature hit by a bolas falls prone until it is
freed. A creature can use its action to make a DC 10
Strength check, freeing itself or another creature within its
reach on a success. Dealing 5 slashing damage to the bolas
(AC 10) also frees the creature without harming it, ending
the effect and destroying the bolas. You can only throw one
bolas on your turn.
Deckhammer. When you hit a creature with this
weapon, you can push it 5 feet away from you.
Diode Beam. As an action, this weapon can be fired
continuously in a beam, affecting a 100-foot long, 5-foot
wide line in a direction you choose. Each creature in the
line and each that enters its area must make a DC 15
Dexterity saving throw or take 4d6 radiant damage.
At the beginning of each of your subsequent turns, roll a
d20. On a 5 or lower, the weapon overheats and can’t be
fired until the end of your next turn. If you roll higher than
5, you can use your action to continue firing the beam and
can change the direction the line faces from you.
Harpoon. You can use an action to tie a rope to the end
of a harpoon before it is thrown. If a rope-tied harpoon hits
a target, you can hold fast to the rope, and use your action
to make an opposed Strength (Athletics) check against the
target to pull it up to 10 feet closer to you. You can also use
your reaction when the target moves to make an opposed
Strength (Athletics) check against it, preventing its
movement on a success. If you use your action to do
anything else, you lose your grip on the rope. If the target
has hands, it can remove the harpoon as an action.
Harpoon Gun. This weapon uses harpoons for
ammunition. You can use an action to tie a rope to the end
of a harpoon before it is fired. If a rope-tied harpoon hits a

[Página 39]
target, you can hold fast to the rope and use your action to
make an opposed Strength (Athletics) check against the
target to pull it up to 10 feet closer to you. You can also use
your reaction when the target moves to make an opposed
Strength (Athletics) check against it, preventing its
movement on a success. If you use your action to do
anything else, you lose your grip on the rope. If the target
has hands, it can remove the harpoon as an action.
Hook Hand. This is a one-handed weapon, usable only
if you are missing a hand, or have a special cuff designed to
fit over your hand. Any humanoid that is missing a hand
and wears a hook regularly has proficiency with this
weapon.
Laser Sword. Depending on this weapon’s construction,
it can deal force, necrotic, or radiant damage. Once the
weapon is created, this type of damage does not change.
Machete. This weapon deals double damage to plants
and creatures of the plant type.
Mancatcher. This weapon is used to immobilize
creatures at a distance. When you hit a creature of Large
size or smaller with this weapon, you can attempt to
grapple the creature, using your attack roll instead of a
Strength (Athletics) check, instead of dealing damage.
Plasma Cutter. This weapon ignores the damage
threshold of nonmagical objects that it cuts.
Singularity Emitter. When this weapon hits a target,
each creature within 10 feet of the target is pulled up to 5
feet toward it.

Firearms and Blasters
Black powder represents a paradigm shift in the art of
warfare, fueling everything from powerful siege weapons
to concealable, handheld guns. In many campaign settings,
firearms supplant the traditional scheme of weapons,
forcing arrows, swords, and battleaxes into obsolesce. They
might even be commonplace, a staple tool for hunting and
home defense.
Futuristic firearms, powered by arcane energy or
extremely advanced science, are called blasters, and fire a
pulse of energy or condensed plasma instead of
conventional projectiles. While blasters are commonplace
in many science-fiction settings, they might only make an
appearance in other settings only as wild, steampunk-esque
experiments, or in the remnants of a derelict, advanced
civilization.
Firearms follow slightly different rules to conventional
ranged weapons, and also generally use two or more
damage dice. Blasters are considered firearms and use these
rules as well.

Firearm Damage Rolls
Unlike other weapons, you don't add your ability modifier
to the damage roll of a firearm unless otherwise stated.

Two-Weapon Fighting
with Firearms
Unlike other ranged weapons, you can engage in twoweapon fighting with two light firearms. When you do so,
you subtract 2 from the damage roll of the bonus attack, to
a minimum of 1 damage.

Weapon Descriptions
Far beyond the conventional array of swords, axes, and
bows, craftsmen have devised a staggering variety of
weapons, from unassuming throwing daggers, to the
fantastically lethal mountain cleaver. Such weapons can be
crafted by craftsmen and wielded by anyone with
proficiency.
Anti-Material Rifle. A truly colossal sniper rifle, the
anti-material rifle is designed to punch holes in tanks and
other vehicles, as opposed to personnel.
Antimatter Dagger. Favored by assassins and
infiltrators, the antimatter dagger―little more than a
scaled-down laser sword―produces a short blade of
crackling energy. With some skill, this weapon can be
hidden up a sleeve, stashed in a belt, or secreted away in a
hidden compartment, to be revealed at the right moment for
a precision kill.
Arc Baton. The weighted end of this steel baton
contains a trio of crackling electrodes which send a surge of
electricity through any creature they touch.
Assault Rifle. Combining a high rate of fire with riflegrade ballistics, the assault rifle is a staple weapon for all
modern militaries. Nearly every nation produces their own
variant on this general design, but all share the basic traits
that make it such a flexible and formidable weapon.
Assault Shotgun. A fearsome cross-between an assault
rifle and a shotgun, the assault shotgun can unleash a fullyautomatic barrage of shot in close quarters.
Atlatl. The atlatl is a primitive, but effective spear
thrower, normally consisting of a simple piece of wood,
grooved to allow the spear to rest within it. By swinging the
atlatl, a user can hurl a spear with much greater speed and,
with practice, greater accuracy.
Ballistic Gloves. These gloves are designed with a
cylindrical grip in the palms, which strengths the fists and
charges the thunder cells on the knuckles. On a strike, the
gloves make a deafening impact, magnifying the kinetic
energy of the blow on the knuckle’s points.

37
magehandpress.com

[Página 40]
Monk Weapons
Many weapons forged by a craftsman might be
suitable as monk weapons, even though they are
not included specifically as monk weapons under
the guidelines in the SRD. As always, monk
weapons can’t have the Two-Handed or Heavy
properties; however, any weapon with the same
properties as a shortsword (such as nunchaku)
automatically qualify as monk weapons.
Furthermore, the GM can allow additional
monk weapons as appropriate to the campaign
setting. For example, a chakram might be suitable
as a monk weapon in some campaigns, whereas
an antimatter dagger might be suitable in others.

Bastard Sword. An oversized longsword, the bastard
sword approaches the greatsword in length, but is just light
enough to be used one-handed, if needed.
Battlefist. A mechanical, articulating gauntlet, this
weapon slips over a hand and mimics its movements. When
worn, a battlefist can deliver crushing blows on its own, but
is usually paired with another weapon, such as a blaster, to
be employed when enemies draw too near. This weapon is
especially favored by the vect, who can integrate one in
place of a hand to ensure a weapon is always nearby.
Bayonet. A conventional dagger designed to be
mounted below the barrel of a rifle to thrust at enemies, the
bayonet is indispensable when foes are close and reloading
simply isn’t an option.
Binary Gun. This pair of handheld
blasters can link together into an
automatic carbine, combining their
firepower into a double-stream of
blaster bolts.
Blast Maul. Only the dwarves would
conceive of a weapon so unwieldy as the
blast maul. As its name implies, it is very much a
conventional maul, but with a rocket thruster built
into the head to magnify its bludgeoning potential.
Blitz Cannon. With its imposing rectangular muzzle,
this brutalist blaster has a clear right and wrong-end to be
on. Pulling its trigger unleashes a torrent of lightning bolts
in a wide, imprecise spray, making it extremely dangerous
at point-blank range.
Blunderbuss. This distinctive short-range firearm
features a dramatically flared muzzle from which it fires
heavy-caliber shot in a wide spray. Most effective at close
range, the blunderbuss can be considered a precursor to the
modern shotgun.

38
magehandpress.com

Bolas. A pair of weights connected by a length of cord.
When swung about and thrown at a target’s legs, they can
entangle it, knocking it down for an easy kill.
Boomerang. A peculiarly curved piece of wood which,
when thrown, travels in a wide arc and returns to its
thrower.
Boomeraxe. This strange axe, with its bent handle and
matching, but reversed bottom head, will return to its
thrower after being launched with force.
Booster Sword. A series of small rockets set into the
blade of this longsword magnify its downward slash and
heat its cutting edge.
Bowblade. The sharpened limbs of this bow fold down
atop one another to form a wickedly curved blade.
Breach Gun. Engineered for urban warfare, this
weighty shotgun is fires explosive shells which can rip
apart doors, cover, and enemies alike.
Briefcase Gun. The signature weapon of assassins and
covert agents the world over, the briefcase gun is a sniper
rifle which can be disassembled into dozens of
components, stored into a nondescript briefcase, and
swiftly reassembled to carry out an assassination.
Canelash. Pressing the button on the head of this solid
cane causes it to loosen into dozens of segments, connected
by short lengths of specially-build razor chain. While
collapsed, the weapon appears as nothing more than a
weighty cane, but while transformed, it becomes a
like a whip.

[Página 41]
Carver. Looking much like a heavy, toothed meat
cleaver, the carver makes short work of soft foes. By
pulling the trigger mechanism on the handle, the spring
hinge unlocks, snapping the blade up and shifting the
balance of the weapon, allowing it to be wielded from
range as a greatsword.
Cestus. A cestus can take many shapes, but in all cases,
it is comprised of some sort of glove or hand wrapping
covered with metal, stone, bone, or some other hard, blunt
material, normally worn in pairs. Unarmed fighters often
use them simply to protect their hands, but they are also
useful for covering in special materials, such as silver or
alchemist's fire.
Chained Anchor. Crafted from a small anchor attached
to a 10-foot length of chain, this weapon is most effective
when wielded like a giant flail by someone with incredible
strength.
Chainwhip. This heavy whip is constructed from a
length of chain, rather than leather or cord, making it
heavier, but multiplying its impact.
Chakram. A chakram is a circular, aerodynamic metal
disc with a large hole at the center, looking like a flattened,
razor-sharp ring. While functional in melee combat, the
chakram is primarily a throwing weapon. Particularly
skilled users can direct the disc to ricochet after throwing,
returning back to their waiting grasp.
Claw Gauntlet. Claw gauntlets take two general forms:
either a gauntlet with one to three long, sharp claws
extending from the top of the arm to approximately one
foot past the end of the wearer's fist, or a glove/gauntlet
with sharp metal talons extending from the ends of the
fingertips. In either case, they serve to slice the wearer's
opponents to ribbons.
Component Sword. Adorned with a series of hinges and
locks, this overdesigned greatsword disassembles into a
pair of matching one-handed blades. Using it effectively
requires a user with considerable strength to use the
weapon as a greatsword, and impressive coordination to
wield the paired blades.
Concussion Rifle. A series of arcane capacitors run the
length of this blaster rifle, terminating in a thick condenser
that compresses its blast into a precise burst. A concussion
rifle is especially deadly at long ranges, and its damage
bypasses most emergently resistant armor.
Crossbow, Automatic. Much like a repeating crossbow,
the automatic variant has a large magazine of bolts, but also
implements an intricate system of gears and levers to
automatically fire the weapon when the trigger is held. This
makes the weapon much like an early assault rifle, with

similar concessions made to accuracy when fired
automatically.
Crossbow, Axe. The bows of this heavy crossbow are
mounted atop an imposing crescent axe head. Thanks to its
sturdy construction, the entire crossbow can be swung like
a greataxe, moments before a loaded bolt is fired.
Crossbow, Repeating. While not terribly different from
a standard heavy crossbow, a repeating crossbow holds a
number of bolts in a swappable box magazine on top of the
bolt rail and has a special loading mechanism that allows
the crossbow to be fired multiple times in quick succession.
Crossbow, Shotbow. As its name implies, a shotbow is
an amalgamation of a shotgun and a crossbow. Instead of
loading a single bolt, a shotbow loads several bolts in a
tight bundle, which it fires in a barrage from its short, wide
barrel.
Cutlass. The cutlass has a shorter, curved blade that
allows for it to be wielded effectively on the deck of a
crowded ship. The favored weapon of many pirates, this
weapon is often confused with the rapier, but whereas
rapiers swiftly jab, cutlasses rapidly cut and slice. Sabers
use the cutlass statistics, despite their longer blade.
Dagger, Throwing. Throwing daggers are shorter than
normal daggers, but weighted more evenly to be effective
throwing weapons. They come in many shapes and sizes,
but most are double-edged, so that they remain lethal, no
matter how they are thrown.
Deckhammer. While seeming to be nothing more than a
standard, if overly large maul, pressing the button located
on the bottom-third of the haft causes the handle to unlock,
deploying a cross guard and allowing you to draw the
straightsword hidden within.
Demolition Bow. This longbow is fitted to fire
exceptionally wide arrows—arrows with a generous
amount of dynamite packed into their shafts.
Dervish. With two scimitars affixed to either end of a
long haft, the dervish is a weapon that lends itself to fast,
fluid motion and mesmerizing combat styles.
Diode Beam. A scaled-down version of a starship's
cannon, the diode beam is best used as a mounted weapon.
Though it can be fired in accurate pulses, it's also possible
to lock the weapon's fire mode, creating a continuous
stream of deadly energy.
Doomerang. This wrought-iron contraption still
resembles a boomerang in shape, but with dozens of
components and wires complicating the outline. When
thrown, the doomerang sails toward its target, explodes on
impact, and then flies back to its thrower. It also produces
snacks when a button on its side is pressed.

39
magehandpress.com

[Página 42]
Double Handgun. The two barrels of a double handgun
can give the illusion that the weapon is a normal handgun
reflected in a mirror. Everything about this weapon, from
the magazine, to the firing pins, to the sights, are
duplicated, allowing two bullets to be fired with every pull
of the trigger.
Double-Barrel Shotgun. A classic design, which loads
two slugs or shells into separate barrels, the double-barrel
shotgun trades ammo capacity and range for reliability and
sheer firepower.
Double-Sword. A double-sword can take many forms,
but the most common is that of two longsword blades
attached to either end of a single handle. Fighting with such
a weapon grants the benefits of fighting with two swords,
with the power and control of a single weapon.
Dragon Greatbow. As its name implies, this colossal
bow was designed to hunt dragons, wyverns, and other
heavily-armored flying beasts. It towers over most of its
wielders and requires exceptional strength to draw, but
nearly all variants feature a long spike at the bottom or a
loop to place a foot in, allowing the weapon to effectively
be mounted on the ground.
Dwarven Waraxe. Useful for fighting in tunnels and
other closed spaces, a dwarven waraxe is a double weapon
with a heavy axe head at one end and a wickedly barbed
spike at the other.
Elven Foil. Much like a rapier, but with an almost
imperceptivity thin blade, the elven foil is the preferred
weapon for dexterous elven fencers and others who the
nimblest weapon possible.
Estoc. A straight, edgeless, but sharply pointed blade
that can be held in one or two hands, the estoc is best used
to penetrate the defenses of heavily-armored foes. In
profile, it looks much like a longsword, and in practice, it is
often used as a backup to one.
Fishhook. Carved from bone, or forged from iron, the
oversized fishhook can be an effective tool for fishing very
large sea creatures. Its heft and barbed spike make it an
effective weapon in combat as well.
Flintlock. The flintlock is a long pistol, which must be
reloaded after every shot. It is favored both for its easy
concealment and deadly blast, but because of its short range
and long reload time, it’s largely used as an adjunct to a
sword or other weapon.
Gargoyle Axe. This astoundingly heavy axe looks as
fearsome as it hits. A gargoyle axe consists of a thick,
metal-shod shaft topped with a wide, double-bladed axe
head. The heads of these axes are often cast into the shape
of a gargoyle, with the body and leering face in the center
and the wings forming the jagged blades.

40
magehandpress.com

Gatling Gun. A weapon infamous for its rate of fire, the
Gatling gun rotates its many barrels, which fire in
sequence, in order to manage the tremendous heat from
sustained automatic fire. This weapon is cumbersome,
easily recognizable, and utterly terrifying all at the same
time.
Gnomish Kneecapper. This steel hammer
counterweights its round head to allow small folks to use it
effectively. Though, as its name none too subtly suggests,
small folks will find they can only reach the lower half of
larger opponents. Therefore, this weapon has become
synonymous with unfair tactics: bludgeoned groins,
crushed toes, and smashed kneecaps.
Goliath Sling. While a normal sling can project small
stones with blinding speed, the goliath sling takes a
different approach: hurling weightier stones and bullets
slightly slower. Using this weapon requires more strength
and patience to master, but in a skilled slinger's hands, it
can fell the mightiest giants.
Greatbow. Though not much greater than a longbow, a
greatbow is quite a bit heavier and has a substantially
stronger pull, firing arrows as powerful as a heavy
crossbow.
Greatspear. While not overly long, a greatspear has a
heavy, weighted head that gives it greater puncturing power
and a cleverly designed counterweight that maintains its
ability to be thrown or wielded one-handed.
Grenade Launcher. This unusual, shoulder-fired
firearm features a relatively short and very wide barrel,
suitable for launching grenades. These grenades can have a
smoke or gas warhead, but optimally carry explosives.
Grenade Launcher, Revolving. This variant of the
grenade launcher fits its grenades in a revolving cylinder, in
much the same way that a revolver does, allowing up to six
shots before it must be reloaded.
Grim Scythe. This long, double-edged scythe dwarfs
nearly any wielder who uses it. Commanding its weight and
balance requires exceptional skill, but its lethality is
infamously unmatched in the right hands.
Handgun. Portable, reliable, and with a generous
magazine size, the handgun is an excellent firearm for selfdefense. Though it might struggle to contend with a
shotgun, rifle, or machine gun, the humble handgun is more
than sufficient for police officers and other security
personnel, and can be easily carried by soldiers as a backup
weapon.
Harpoon. A long steel or wooden shaft with a barbed
spear-like point. When used for whaling, this weapon
usually has a length of rope attached to it, to reel in the kill.

[Página 43]
Harpoon Gun. This unusual prototype firearm is
designed to fire entire harpoons instead of bullets. Harpoon
guns are intended to extend the range of a thrown harpoon
(to make whaling more profitable), but are just as deadly if
pointed anywhere else.
Hinge Spear. This double-spear has a locking hinge set
into its center, which, when pressed, folds the weapon in
half, bringing both ends of the spear to face the same
direction for devastating attacks.
Hook Hand. A hook attached to the arm through a
leather cuff and a series of straps, this tool is designed to
allow sailors with amputated hands to effectively to lift and
carry objects. However, in a scuffle, a large hook attached
at the end of an arm can also prove quite deadly.
Hunting Rifle. Designed for hunting big game, these
rifles are consistent and accurate, but new rounds must be
manually loaded with a bolt on the top of the gun, greatly
slowing their firing rate.
Impactor Cannon. The impactor cannon is a
cumbersome, intimidating blaster, designed with the
express intent of putting holes in armored things. This
weapon is infamous for its punishing recoil and long
overheat duration, which it makes up for in sheer
firepower.
Ion Cannon. The ion cannon always fires its bright,
energetic blast is a diffuse cone, making it far deadlier up
close. Between shots, it always makes a quiet zipping
noise, as the arcane battery charges the ion cell for another
blast.
Kama. A short, one-handed sickle often used in pairs,
the kama is surprisingly flexible weapon, which allows a
skilled user to attack, block incoming strikes, and disarm
opponents.
Katana. A katana is a roughly 3-foot long, single-edged
curved sword, with a cloth or leather-wrapped handle and a
circular hand guard known as a tsuba. The specialized
forging process used to make a katana results in a light,
flexible blade perfectly suited to one or two-handed use.
Due to the unique and difficult forging process involved
in crafting a katana, most are created by master smiths
commissioned by specific warriors for personal use. They
are often as much works of art as they are weapons,
displaying handle-wrappings with unique designs or handcarved tsuba. One common feature of all katana is the
lacquered, wooden scabbard known as a saya, which is
fitted specifically to its blade; apart from its sword, a saya
may be wielded as a club.
Kopesh. The kopesh is an oddly shaped sword, straightbladed from the pommel up until dramatically curving

Lances
Because the of the lance’s special property, it is
treated as having the Two-Handed property.

outward and ending in a hooked point, giving it a look
similar to a cross between an axe and a short sword. The
hooked backside of the weapon, though blunt, is an
extremely helpful tool when attempting to trip or drag a
foe.
Kusarigama. An adaptation of the kama or sickle, the
kusarigama has a roughly foot-long handle with a short,
curved, inwardly-edged blade set at a right angle on one
end; on the other end is a weighted length of chain,
anywhere from 5 to 9 feet in length. A skilled user is able
to use this entire length, slashing at his foes at a distance, or
entangling their feet with the chain.
Laser Sword. An elegant weapon, for a more
enlightened age, the laser sword consists of a metal hilt
which projects a fixed-length laser when activated. Its
weightless blade makes for an agile, deadly weapon
capable of cutting through many materials. The sword
could even stop a blaster bolt, but alas, one would need
precognition and superhuman reflexes to do so.
Light Cannon. This cannon is designed for field
infantry and is usually transported by horse-drawn cart.
Though light by cannon standards (since it’s used to blow
holes in people, rather than ships or fortifications), it is
extraordinarily heavy for a single individual.
Light Machine Gun. The light machine gun is among
the smallest firearms used for sustained suppressing fire.
Though similar in profile to an assault rifle, the light
machine gun traces its heritage and role in combat back to
the Gatling gun and other mounted machine guns.
Machete. A broad blade designed to be wielded
onehanded, the machete is intended to hack through
tropical underbrush, but, as many have discovered, there's
not much difference between the underbrush and a victim's
body.
Machine Pistol. Light, compact, and sporting a long
magazine of handgun bullets, machine pistols are
condensed packages capable of delivering a hail of gunfire,
even if held in one hand.
Magnum. Nothing is more commanding than a
magnum. This revolver is chambered for large-caliber
bullets, and firing it feels like directing an explosion at a
target while a mule attempts to kick the gun from your
hand. It’s weight and heft stand testament to the fact that it
is the most powerful handgun money can buy.

41
magehandpress.com

[Página 44]
One-Handed Heavy Weapons
Magnum revolvers and the repulsor gauntlet are
unique weapons, in that they are the only onehanded heavy weapons included on this list. In
fact, this violates one of the core assumptions of
weapon properties: that heavy weapons must
always be two-handed. As a result, if a one of these
weapons is modified by a craftsman, it
automatically inherits the Two-Handed property
(though its damage does not increase as a result.)

Magnum, Explosive. Arguably, the
only thing better than a magnum revolver is
one fitted to take explosive bullets.
Magnum, Manstopper. Chambering an even larger
round than a conventional magnum, this weapon is
obviously unsafe to use. But in the pursuit of condensing
the most amount of firepower into a single shot, gun
aficionados have crafted this weapon to skirt the fringes of
what's possible with a handgun.
Magnus Opum. This impressive handheld blaster,
almost twice the weight of a repeater, is infamous for its
heft, recoil, and stopping-power. Nevertheless, it is favored
by gunslingers that accept no compromises in their blasters.
Mancatcher. Less a weapon and more a peacekeeping
tool, an mancatcher is a large, pincer-shaped ring with
inward facing teeth mounted on the end of a 10-foot pole,
designed for grabbing a creature and sticking to any
clothing, fur, hair, or soft flesh.
Meteor Chain. Also called a meteor hammer, this
weapon consists of a long chain with a large metal weight
at the end. Hurling it in an arc or bringing it down from
above creates an impact unmatched by almost any other
weapon, but mastering the weapon's arc demands ample
talent and years of practice.
Mountain Cleaver. A truly monstrous weapon, the
mountain cleaver is less like a large axe and more like an
immense meat cleaver. Though very slow and supremely
unwieldy, the mountain cleaver is unmatched in its damage.
Musket. This long rifle was the most accurate firearm of
its day and was commonly carried by military men and
civilians alike, often with an affixed bayonet.
Naginata. Similar to a glaive, the naginata is a polearm
that resembles a katana, having a short, curved blade, a
long, wrapped handle, and a tsuba between the blade and
handle.
Nunchaku. Adapted from threshing tools, a set of
nunchaku consists of a pair of foot-long wooden or metal
sticks, connected with a short length of rope or chain.
While certainly dangerous and highly flexible in the hands

42
magehandpress.com

of a skilled wielder, nunchaku are notorious for inflicting
significant amount of pain to their own users if not properly
trained.
Parlor Gun. Owing its namesake to the locales of highstakes games of cards gone murderously awry, the parlor
gun is a very small, easily concealable firearm that can be
produced at a moment’s notice. It loads only one (and in
some variants two) bullets at a time, which might cripple it
in a lengthy firefight, but this seldom matters when coupled
with the element of surprise.
Parrying Dagger. A dagger with curved guard, often
used in place of a shield. Selecting a parrying dagger trades
passive defense for an active role of trapping the opponent's
weapon, deflecting it, and possibly disarming them.
Phaser. Phasers are not designed for effectiveness so
much as portability and non-lethality. These blasters are
often issued to peace-keepers and emissaries that require
personal defense but have no intent to kill others.
Photonic Lash. A wicked weapon favored by the elves,
the photonic lash produces a bright tendril of energy from
its metal hilt. The lash leaves painful, burning lacerations
on its victims, along with lasting scars, a telltale sign that
one has defied the whims of the high elves.
Plasma Cutter. Few things are as intimidating as the
huge, circular, white-hot blade of a plasma cutter. Though
an unwieldy tool, designed to carve up high-density metal
plates for ship hulls, it works equally well as a maiming
implement. The saw can easily remove careless fingers or
limbs in normal operation, but if used with lethal intent, it
could dissect someone cleanly from end to end.
Plasma Launcher. Designed for shipboard defense, a
plasma launcher fires a stream of superheated, explosive
plasma at its target. While unwieldy when removed from its
mounting, there is little that most space marines find more
frightening than staring down the barrel of a primed plasma
launcher.
Portable Ballista. Even larger and heavier than the
heavy crossbow, the portable ballista is designed to be
