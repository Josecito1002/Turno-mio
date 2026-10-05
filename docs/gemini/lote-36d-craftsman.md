# Encargo: Lote 36d (Craftsman Complete) de la app "Mi turno"

"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el formato de
abajo, lo que se pide, usando **solo el texto en inglés que viene al final**: material de la comunidad (Valda's Spire of Secrets (reglas 2014)), no oficial de
Wizards. Esta es la parte 4 de 5 de este material. Otra persona revisa y aplica tu respuesta con un script, así que el formato tiene que
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

[Página 45]
moved to a battlefield, placed in a spot on the ground or on
a movable tower, and fired from a fixed position.
Pump Shotgun. The ever-reliable pump-action shotgun
features a distinctive sliding grip on the front of the barrel
which can be ‘pumped’ to chamber a new round. The
simplicity of this design both improves reliability and
reduces cost, while allowing the shotgun to accept different
ammunition, such as nonlethal rounds.
Punching Dagger. This unique style of dagger consists
of one or more blades attached to an H-framed handle,
allowing a proficient user to augment his unarmed strikes.
Quadruple-Barreled Shotgun. Also called a doubledouble-barrel shotgun, this weapon has four large shotgun
barrels arranged at its business end. Though it takes time to
load, the four shells can be fired nearly all at once, making
it a weapon of surprising firepower.
Quickblade. A quickblade is almost identical to a
dagger, save for the hollow handle into which the blade can
be retracted, and the spring-trigger mechanism used when
deploying the blade.
REC Gun. The Revolving Exothermic Cannon (or REC
gun, for short) operates on the same principle as a
conventional blaster, with an arcane battery hooked up to
an aperture barrel and so forth, but mounts several blasters
on a revolving cylinder, each firing in rapid succession. It is
known for the rhythmic booms of its fire, and its ability to
fire almost indefinitely.
Repeater. The quintessential handheld blaster, the
repeater is a staple on the galactic frontier. Solid, reliable,
and packing just enough firepower to bring down an
assailant, nearly every explorer worth their salt has one of
these strapped to their hip.
Repulsor Gauntlet. Similar to a battlefist, but larger in
scale, this hulking gauntlet invariably throws its users offbalance. Concealed within it is an arcane battery from a
blaster, which the gauntlet channels into the knuckles to
augment its blows with layered forcefields.
Revolver. An iconic handgun, the revolver stores six
bullets in a rotating cylinder, which can be fired in rapid
succession. This weapon is favored by gunslingers for its
reliability and stopping-power.
Rifle Spear. As its name suggests, the metal haft of this
spear is also the barrel of a long rifle, which can be fired at
a moment's notice. The spear's tip is bifurcated, allowing
the bullet to pass through its center, so it's always unclear if
the wielder intends to stake their target or shoot them.
Ripsword. Perhaps one of the most brutal weapons ever
devised, the edge of this broad blade is lined with a toothed
chain, driven by a motor in the hilt. Instead of merely

cutting its target, the chain rips into it, grinding through
armor, flesh, and bone alike.
Rocket Fist. This robotic gauntlet can be launched from
its user's hand to fly autonomously using thrusters in its
base. The fist not only strikes its target, but it also pilots
itself back and lands on the hand it originated from.
Rocket Launcher. This long tube accepts an explosive,
unguided rocket in its front end and ejects exhaust out the
back. For all intents and purposes, it is the most firepower a
single person can command with the pull of a trigger,
delivering a massive explosion on impact.
Sai. An extremely distinctive weapon, the sai is a long
dagger with a pair of forked prongs protruding from its hilt.
Usually employed in pairs, sais excel at disarming enemies,
trapping their weapons, and blocking attacks.
Saw Launcher. Forgoing traditional ammunition for a
more overtly terrifying alternative, the saw launcher is
equipped with a drum magazine of circular buzzsaws,
which it can fire with surprising speed. It might not be as
efficient as a traditional firearm, but launching saws is
more about making a show of combat than its execution.
Sawed-Off Shotgun. This variant of a double-barrel
shotgun has dramatically shortened barrels, increasing the
weapon’s spread to make it deadlier in close-combat. The
reduced range ruins this weapon for hunting but transforms
it into an ad-hoc trench gun, suitable for urban warfare.
Shotfist. This reinforced gauntlet has two shotgun
barrels mounted on the back of the hand, which can fired
by closing a fist an pressing a concealed trigger
mechanism.
Singularity Emitter. Less a blaster in the conventional
sense, and more a stripped-down Dark Matter engine
designed to rip a contained hole in the universe, the
singularity emitter is a singularly destructive weapon. After
being fired, however, the weapon must cool down, venting
exceptional amounts of heat to maintain a stable Dark
Matter core.
Skathári Warclub. True to their nature, skathári
warriors prefer simple, straightforward weapons, such as
their traditional warclubs. These clubs are fitted with at
least one large spike, making them exceptionally useful for
punching through invertebrate shells and exoskeletons, as
well as discouraging huge predators.
Sniper Rifle. An instrument of ranged precision, the
sniper rifle can take lives from distant, nearly invisible
ranges. Expert snipers learn to use natural camouflage and
wait for the perfect moment to strike.
Spiked Chain. A spiked chain is a 10-foot length of
chain with a pair of wickedly sharp weighted barbs at either

43
magehandpress.com

[Página 46]
end. Designed to be a fluid, fast moving weapon, it offers
amazing flexibility in combat.
Splitstaff. This metal quarterstaff splits in half with a
gesture, dividing into a pair of fighting sticks.
Spring Fist. This contraption amounts to spring-loaded
boxing glove, equally good for slapstick gags and punching
someone in the face from ten feet away.
Standard Carbine. As its name might suggest, the
standard carbine is the standard-issue blaster for all
Hegemony and Coalition troops, which by default makes it
one of the most pervasive weapons in the galaxy. Some
soldiers praise the weapon's accuracy and durability, while
others decry its difficult-to-control automatic fire, but on
the battlefield, there's no questioning this weapon's
efficacy.
Submachine Gun. More compact than an assault rifle,
and firing lighter, easier to control rounds, the submachine
gun is an effective close-quarters alternative to larger
automatic weapons. Its limited range makes it best suited to
urban warfare and precision operations where the distance
to the target is known in advance.
Swarm Launcher. Even larger than a rocket launcher, a
swarm launcher utilizes a special type of canister round
containing 6 to 9 micro-missiles; this large mass of
explosions makes this weapon even more deadly at closer
ranges, where multiple warheads can potentially strike a
single target.
Swarm Pistol. This handheld blaster, styled much like a
repeater, has a wickedly fast automatic fire, capable of
spewing dozens of rays in seconds. The most dexterous
users might even find it possible to use one in each hand.
Thermal Lance. When a button on this metal tube is
pressed, a persistent foot-long, blue stream of flame erupts
from its end, scorching those it touches. Though this tool
was fashioned for mining asteroids for precious minerals, it
has become a favorite (albeit eccentric) choice of weapon
for avia-ra warriors.
Titan Maul. A titan maul is an exceptionally large
hammer, well-suited to the heavy builds of giants and
the largest races of humanoids.
Tonfa. A variation on the simple club, a tonfa is a
length of wood or metal with a handle set at a right
angle roughly three-quarters up its length. Often used
in pairs, tonfa are supremely useful as both offensive and
defensive weapons.
Trench Gun. A pump shotgun with a shortened barrel,
this gun was designed for the trenches of a bitter war,
whose close-quarters combat claimed the lives of millions.
Trident. This weapon consists of a long wooden or
metal shaft and bears a head with three sharpened points. It

44
magehandpress.com

has strong ties to the sea due to its use in fishing, and
association with gods of the sea and aquatic races.
Twinbow. Though seemingly over-designed, this
complicated-looking compound bow has a specially built
double-channel for nocking two arrows, one atop the other;
this design allows two arrows to be fired from the bow
accurately at the same time.
Warpike. Similar to a glaive, a warpike is a heavy
polearm with a pair of weighted blades at one end, one
longer than the other. The warpike counts as a polearm.
Whipsword. A complicated and flashy device, the
whipsword is a series of razor-sharp bladed segments
running along an elastic cable which is attached to a sword
pommel. When swung, the segments expand to the length
of a whip, before contracting with a interlocking clatter
back into a sword.
Wrenchinator. Though different models exist, the most
common by far is the Wrenchinator 9000, a tool used by
ship-mechanics the ‘verse-over. This incredible,
oversized wrench can fasten bolts, loosen bolts, and
clobber people over the head.
Zweihänder. Larger even
than a greatsword, a
zweihänder is a massive
sword with an almost axelength haft. It is nearly
impossible to wield even
in two hands, unless the
wielder is exceptionally
strong and well-trained.

[Página 47]
Exotic Armor and Shields
Armor

Cost

Armor Class (AC)

Strength

Stealth

Weight

500 gp

13 + Dex modifier

―

―

15 lb.

1,500 gp

16 + Dex modifier (max 2)

―

Disadvantage

50 lb.

Battle Plate

2,000 gp

19

16

Disadvantage

75 lb.

Mountain Plate

3,000 gp

20

Special

Disadvantage

100 lb.

Exotic Light Armor
Hardened Leather

Exotic Medium Armor
Hero Plate

Exotic Heavy Armor

Exotic Shields
Tower Shield

100 gp

+2/Special

16

Disadvantage

15 lb.

Wall Shield

150 gp

+2/Special

18

Disadvantage

20 lb.

Armor
The most profoundly devastating weapons are worth
nothing in battle if their wielders are left unprotected.
Thankfully, innovative craftsmen have constructed armor
just as devious and twice as sturdy as the most dangerous
exotic weapons.

Armor Descriptions
The following suits of armor and shields are listed in
alphabetical order:
Battle Plate. Sturdier than even full plate, battle plate
consists of a full suit of interlocking plates with a layer of
thick hide and chain underneath.
Hardened Leather. While similar to leather armor,
hardened leather adds an additional layer of lacquer,
hardening the leather to an almost iron-like
strength.

Hero Plate. Though not substantially heavier or more
cumbersome than half plate, hero plate is certainly more
impressive: large pauldrons, a winged helmet, and
decorative flair adds to the armor’s prominence, as well as
its protection.
Mountain Plate. Almost too heavy and cumbersome to
wear, even for the mightiest warriors, mountain plate
consists of inch-thick plate armor with a bolted-on helmet,
gauntlets, and boots. Donning this armor takes nearly 15
minutes and requires latching several heavy-duty clamps
and latches. Mountain plate requires an 18 Strength to
wear, cannot be worn by creatures smaller than Medium
size, and reduces your walking speed by 10 feet, regardless
of your Strength score.
Tower Shield. Substantially larger than a conventional
shield, a tower shield is a generally rectangular plank of
thick wood or metal tall enough to provide cover for the
full body. While wielding this shield, you gain a +1 bonus
to Dexterity saving throws.
Wall Shield. Even larger than a tower shield, a wall
shield is a massive, door-sized shield with a set of imposing
spikes on the bottom edge, which serve to anchor the shield
to the ground. As an action, you can slam the shield
down and brace yourself behind it. While anchored
this way, the shield ceases to grant you a bonus to
AC and instead provides you with three-quarters
cover. Your movement speed becomes 0 while
the shield is planted this way and removing the
shield from the ground requires an action.

45
magehandpress.com

[Página 48]
Ammunition
Craftsmen and warriors of all stripes are always looking for
an edge on the battlefield. While arrows and bullets
certainly do much to put one group of warriors over
another, there’s always a bit more that can be pulled out of
a given bow or gun, and, with the right application of a
little alchemy and a lot of luck, a simple rifle can take
down a castle wall.
Entries on the following Standard Ammunition table are
considered conventional projectiles (even though some
belong to exotic weapons), because they are of the type
usually fired by their weapons. Exotic ammunition, by
contrast, are special projectiles used in place of normal
ammunition to achieve special effects.

Standard Ammunition
Ammunition

Cost

Weight

Arrows (20)

1 gp

1 lb.

Ballista Bolt

1 gp

2 lb.

Blowgun Needles (50)

1 gp

1 lb.

Bullets (10)

2 gp

1 lb.

Cannonball

10 gp

10 lb.

Crossbow Bolts (20)

1 gp

1½ lb.

Greatarrow

1 gp

2 lb.

Grenade

5 gp

3 lb.

Rocket

20 gp

6 lb.

Saw

10 gp

3 lb.

Shells (10)

5 gp

2 lb.

Sling Bullet (20)

4 cp

1½ lb.

Exotic Ammunition
While standard bullets and arrows will get the job done in
most cases, sometimes you need something a little more
special. Exotic ammunition allows a skilled user to alter
their weapon on the fly; many warriors often carry an array
of magazines or quivers filled with a diverse collection of
special purpose ammo.
When a ranged weapon is loaded with exotic
ammunition, the properties of that weapon change in the
following ways, as indicated on the Exotic Ammunition
table:
Damage. The weapon’s damage or damage type
changes or increases to that shown on the table. If an
ammunition type has a “―” in the damage column, the
damage of that weapon does not change.
Properties. The weapon gains the listed properties for
any attacks made with that type of ammunition.

Ammunition Properties
Exotic ammunition can apply the following weapon
properties when they are used for an attack:
Explosive. When this weapon’s projectile hits a target, it
explodes in a 5-foot radius. The projectile can be fired at an
unoccupied space within its range. Each creature other than
the target within the blast radius must succeed on a
Dexterity saving throw, taking half the damage rolled on a
failed save or no damage on a successful one.
Marking. Whenever you hit a creature with marking
ammunition, the brightly colored paint inside the round
makes the target easier to see and track. Until the target
uses its action to wipe the paint off, creatures have

46
magehandpress.com

advantage on Wisdom (Perception) checks made to see the
creature and on Wisdom (Survival) checks made to track
the creature.
Misfire. When you roll a 1 on the d20 for an attack roll
with this weapon, it jams. A jammed weapon can't be used
to make an attack until a creature uses its action to clear the
weapon malfunction.
Nonlethal. When you reduce a creature to 0 hit points
using this weapon, you can choose to knock the creature
out, rendering it unconscious, rather than deal a killing
blow.
Scatter. A weapon loaded with scatter ammunition has
its normal and long ranges halved. You deal an additional
+2 damage to targets within half of the weapon’s new
normal range. Scatter ammunition is treated as normal
ammunition when loaded into a weapon that already has
the Scatter property.
Tracing. A tracing round contains a mote of
phosphorous, causing it to glow brightly when exposed to
large amounts of light, such as muzzle flash. When you hit
a creature with tracing ammunition, for the next minute you
do not have disadvantage on attacks against that creature
because of nonmagical darkness or heavily obscured
conditions.

Ammunition Descriptions
The following types of exotic ammunition, which are listed
in alphabetical order, can be used by characters of any class
with an appropriate ranged weapon.

[Página 49]
Ammunition, Blessed. Blessed ammunition is made of
blessed silver or gold, etched in holy symbols, infused with
holy water or sanctified salt, or is otherwise blessed in
some way. Weapons loaded with blessed ammunition deal
radiant damage instead of their normal damage type.
Ammunition, Cursed. Cursed ammunition is infused
with the blood of demons, carved with unholy runes, cast of
metals from the lower planes, or is otherwise profaned in
some way. Weapons loaded with cursed ammunition deal
necrotic damage instead of their normal damage type.
Ammunition, Elemental. Elemental ammunition is a
catch-all term for arrows, bullets, shells, and grenades that
deal special types of damage. When one of these pieces of
ammunition is fired by the appropriate weapon, the attack
deals the listed damage type instead of its normal damage
type.
Ammunition, Silver. Silver ammunition is plated in or
cast from silver, allowing it to bypass the damage
resistance of certain creatures.
Arrow, Flight. These arrows are made of a hollow,
lightweight wood, with lead weights positioned throughout
to boost impact and stability. Whenever you make an attack
with a flight arrow, the bow’s range for this attack doubles.
Arrow, Haymaker. A haymaker arrow is an abnormally
heavy and lopsided arrow, with a large, padded, bulbous
business end (commonly designed to look like a fist or
boxing glove). You have disadvantage on all attacks made
with haymaker arrows. When you hit a creature with a
haymaker arrow, the creature must succeed on a DC 12
Constitution saving throw or be stunned for one round.
Arrow, Noxious. The tips of these arrows hold a tiny
vial of noxious chemicals that explodes into a cloud on
impact. When a creature is struck by a noxious arrow, it
must succeed on a DC 12 Constitution saving throw or be
poisoned for 1 minute. The target can make a new saving
throw at the end of each of its rounds, ending the effect on
a success.
Arrow, Poison. The tips of these arrows are coated in a
potent contact poison. When a creature is struck by a
poison arrow, it must succeed on a DC 12 Constitution
saving throw or fall asleep for 1 minute. Creatures that are
immune to being poisoned automatically succeed on this
saving throw. The target wakes up if it takes damage.
Another creature can use an action to attempt to wake the
target, allowing the target to repeat its saving throw,
waking up on a success.
Arrow, Tangle. The tip of this arrow has been replaced
by a vial of a thick, tan paste. When this arrow strikes a
creature, the vial breaks, spreading the paste over the

Exotic Ammunition
Ammunition

Cost Damage

Properties

2 gp ―

Special

Haymaker (10)

200 gp ―

Nonlethal,
special

Noxious (10)

100 gp ―

Special

Poison (10)

200 gp ―

Special

Tangle (10)

100 gp ―

Nonlethal,
special

150 gp +1

Misfire

Arrows/Bolts
Flight (10)

Bullets
High-Power (10)
Rubber (10)

2 gp Bludgeoning

Nonlethal

Shotshell (10)

5 gp ―

Scatter

Tracer (10)

3 gp ―

Tracing

Grenades
Concussion
Grenade (10)

770 gp 1d8 thunder Special

Fang (10)

1,550 go 2d10
piercing

Special

Flare (10)

300 gp 1d6 fire

Special

Goblin Gas (10)

1,550 gp Special

Special

Dragon’s Breath,
Blue (10)

350 gp Lightning

Special

Dragon’s Breath,
Red (10)

350 gp Fire

Special

Dragon’s Breath,
White (10)

350 gp Cold

Special

Flechette (10)

25 gp ―

Special

Slug (10)

5 gp ―

Special

Blessed

+2 gp Radiant

―

Cursed

+2 gp Necrotic

―

Elemental, Acid

+1 gp Acid

―

Elemental, Cold

+1 gp Cold

―

Elemental, Fire

+1 gp Fire

―

Elemental,
Lightning

+1 gp Lightning

―

Elemental,
Thunder

+2 gp Thunder

―

Explosive

+20 gp Fire

Misfire,
explosive

Shells

General Ammunition

Paint

1/10 0 damage
price

Marking

Silver

+1 sp ―

―

47
magehandpress.com

[Página 50]
Explosives
Explosive

Cost Damage

Area

Saving Throw

Weight

Bombs

2 sp 1d10 fire

5-foot radius

DC 11 Dexterity

1 lb.

Finesse, special, thrown
(range 30/60)

Bottled Lightning

75 gp 1d8 lightning

―

―

1 lb.

Thrown (range 20/40)

Concussion
Grenade

75 gp 1d8 thunder

10-foot radius

DC 12 Dexterity

2 lb.

Thrown (range 20/40)

Dynamite

75 gp 3d6 fire

5-foot radius

DC 12 Dexterity

1 lb.

Light, special, thrown (20/60)

Fang Grenade

150 gp 2d10 piercing 5-foot radius

DC 12 Dexterity

1 lb.

Light, special, thrown (20/60)

Flare

25 gp 1d6 fire

―

―

1 lb.

Light, special

Flashbang

5 sp ―

5-foot radius

―

1 lb.

Light, special, thrown (20/60)

Gnome Rocket

10 gp 1d4 fire

5-foot radius

DC 12 Dexterity

1/2 lb. Special

Goblin Gas

150 gp Special

10-foot radius

DC 12 Constitution

1 lb.

creature and reducing its speed to 0. The creature can use a
bonus action to attempt a DC 12 Strength (Athletics) check,
breaking free from the paste on a success. If it does not
break free after one minute, the paste dries and flakes away.
Grenades, Various. Most types of explosive can be
modified to be fired from a grenade launcher. A grenade
listed on the Exotic Ammunition table is identical to the
explosive listed on Explosives table, except that is must be
fired with a grenade launcher, using the weapon’s range
instead of its own range.
Shell, Red Dragon’s Breath. This shell is stuffed with
alchemical reagents instead of shot, which causes the gun
to belch flame in a cone when fired. This cone’s length is
equal to half the weapon’s normal range, or 15 feet,
whichever is shorter. Each creature caught in this area
makes a DC 12 Dexterity saving throw, taking fire damage
equal to the weapon’s damage dice on a failed save. Other
versions of these shells exist, namely White Dragon’s
Breath (which deals cold damage) and Blue Dragon’s
Breath (which deals lightning damage).
Shell, Flechette. This shell is packed with small,
sharpened needles or darts, designed to stick into the target
and inflict maximum pain and discomfort, instead of shot.
A creature that is hit by a flechette shell has disadvantage
on Strength and Dexterity ability checks until the darts are
removed as an action. This shell has no effect on constructs
and undead.
Shell, Slug. This shell is loaded with a solid chunk of
metal instead of shot. Whenever you make an attack with a
slug, the weapon loses the Scatter property for this attack,
but its normal and long ranges double.

48
magehandpress.com

Properties

Special

Explosives
Swords, bows, axes, and guns are all well enough, but
sometimes when you need something completely and
utterly destroyed, there is no substitute for a good
explosive. These weapons come in a wide variety of types,
from classic sticks of dynamite, to disorienting flashbangs,
to illuminating flares.

Explosive Descriptions
The following explosives are listed in alphabetical order.
Bomb. When a bomb hits a target, it explodes in a 5-foot
radius and is destroyed. The bomb can be thrown at an
unoccupied space within its range. Each creature other than
the target within the blast radius must succeed on a DC 11
Dexterity saving throw, taking half the damage rolled on a
failed save or no damage on a successful one.

[Página 51]
Additionally, as a bonus action, you can empty some of
the bomb's explosive material to permanently remove the
blast radius from this bomb, dealing damage only to the
bomb’s target.
Bottled Lightning. This glass canister is filled with a
constantly surging bolt of magic lightning and sheds bright
light in a 10-foot radius, and dim light for an additional 10
feet.
As an action, you can throw this canister up to 20 feet,
breaking it on impact. Make a ranged attack against a
creature or object, treating the bottled lightning as an
improvised weapon. On a hit, the target takes 1d8 lightning
damage.
Concussion Grenade. This spherical device, dotted with
blinking lights, explodes in a wave of concussive force. As
an action, you can throw this grenade up to 20 feet,
detonating a moment after impact. Make a ranged attack
against a creature or object, treating the grenade as an
improvised weapon. On a hit, the target takes 1d8 thunder
damage and is deafened until the beginning of your next
turn. Additionally, each creature within 10 feet of the target
must make a DC 12 Dexterity saving throw or also take this
damage and be deafened for the same duration.
Dynamite. As an action, a creature can light a single
stick of dynamite and throw it at a creature or space within
range. A creature struck by a sine stick or bundle of
dynamite takes 1d4 bludgeoning damage, and each creature
within 5 feet of that creature or space must succeed on a
DC 12 Dexterity saving throw or take 3d6 thunder damage,
or half as much on a successful save. A character can bind
additional sticks together, with each stick increasing the
explosion damage by 1d6 (to a maximum of 10d6) and the
blast radius by 5 feet (to a maximum of 20 feet).
Fang Grenade. Fang grenades are small,
metallic containers of explosives filled with
shrapnel and attached to a timed fuse. As an
action, a creature can pull the
fuse on a fang grenade and
throw it at a creature or at a
space within range. A creature
hit by a fang grenade takes
1d6 bludgeoning damage, and
each creature within 5 feet of
that creature or space must
succeed on a DC 12 Dexterity
saving throw or take 2d10 piercing
damage, or half as much on a
successful save.
Flare. Not an explosive in the
conventional sense, a flare is similar

to a brightly burning torch. A character can ignite a flare as
a bonus action, causing it to shed bright light in a 30-foot
radius and dim light in a 60-foot radius for up to 30
minutes. Due to their construction, flares can be ignited
with no form of fire or spark nearby, and can burn in nearly
any environment, including underwater. Flares burn at
extremely high temperatures, dealing 1d6 damage to a
creature that is struck by one.
Flashbang. Each creature within 5 feet of the
flashbang’s point of impact can't take reactions until the
start of its next turn.
Gnome Rocket. Gnome rockets aren’t often viewed as
weapons, though they can certainly be used to inflict harm.
A gnome rocket is a small bundle of shaped explosives
attached to the end of a stick. As an action, a character can
light the fuse of a gnome rocket, sending it flying up to 120
feet away. When it reaches this distance, it explodes into a
bright flash of colorful sparks, dealing 1d6 fire damage to
any creature within 5 feet of it that fails a DC 12 Dexterity
saving throw.
Goblin Gas. The substance known as goblin gas is a
highly effective tool for dealing with large crowds of weak
creatures, hence the name. A vial of unused goblin gas
looks like a vial sickly green liquid. As an action, a
character can throw the vial at a spot within 60 feet,
shattering it on impact with the ground. Once exposed to
air, the gas quickly spreads, creating a 10-foot radius cloud
of gas that lasts for up to 1 minute. Any creature which is
caught in this area initially or ends their turn in the cloud
must succeed on a DC 12 Constitution check or be
poisoned until the end of its next turn.

49
magehandpress.com

[Página 52]
Chapter 3:
Advanced
Crafting Rules
Though most of the items and gear a character uses over
the course of his or her career are either bought or found,
there often comes a time when an item must be built. It is in
these instances where the craftsman (or any skilled worker,
for that matter) truly shines.
Crafting an item requires three things:
• Access to the relevant tools
• Proficiency in the relevant toolset
• Access to appropriate materials totaling half of the
item’s market value
With these things, you can start crafting the item in
question, making progress over time. Progress is measured
in gp value, so valuable items generally take longer to craft.
Crafting is not limited merely to mundane weapons and
armor or adventuring gear: alchemical concoctions, art, and
magical items all can be crafted with the right skill and
tools.
Except where noted below, a character can maintain a
modest lifestyle at no additional cost, or a comfortable
lifestyle at half the usual cost, while they are crafting items.

Crafting
Mundane Items
For each day you spend crafting a mundane item, you can
make 5 gp worth of items or 5 gp of progress towards a
larger item. The process consumes an amount of raw
materials equal to half the value of what is produced.

Alchemy and Herbalism
The products made by alchemists, brewers, cooks and
Herbalists are typically produced in batches, with extended
periods of waiting in during the activity. For this reason,
progress is made at twice the normal rate (10 gp per day for
mundane items; 50 gp per day for magic items), and up to
five consumable items can be made in parallel if they are of
the same type. You do not need to split the progress; all
five items are crafted at the increased rate. These products
often require specific ingredients, which might be difficult
to obtain in some situations.

50
magehandpress.com

Artistic Compositions
Not all creations are physical items. Indeed, musical
instruments and painter’s supplies are iconic among the
many and varied tools of creation. Thus, a character who is
proficient with artistic tools can spend time ‘crafting’ an
original composition; for example, scripting a play,
arranging a symphony, or curating a display of visual art.
Unlike physical crafting, these compositions have no
intrinsic value; they cannot be sold in a shop. Likewise,
they require (almost) no material input. In order to gauge
the amount of labor required to put together an artistic
composition, refer to the table below. No materials are
expended during these works, but the would-be artist must
support themselves out of their own pocket while
composing—they cannot gain any discount on the price of
a modest or comfortable lifestyle.

Compositions
Composition Quality

Value

Ordinary

40 gp

Compelling

120 gp

Exceptional

400 gp

Masterful

1,000 gp

Legendary

2,000 gp

[Página 53]
Magic Item Crafting
Rarity

Minimum Level

Value
(Consumable)

Value
(Permanent)

Spell Slots
Expended

Schematic DC

Common

3rd

50 gp

100 gp

1

18

Uncommon

3rd

100 gp

500 gp

5

21

Rare

6th

500 gp

5,000 gp

50

24

Very rare

11th

5,000 gp

50,000 gp

500

27

Legendary

17th

50,000 gp

500,000 gp

5,000

30

Crafting
Magic Items
Compared to crafting mundane items, crafting a magic item
is a complicated and exhausting process. Not only does it
require time, materials and skills, but it also demands an
artisan with magical power and a detailed schematic.
Crafting a magic item takes place at a rate of 25 gp per day.
As shown on the Magic Items Crafting table below, you
must be of a high enough level to craft certain types of
magic items, and you must be able to cast at least one spell
of 1st level or higher. If an item duplicates the effects of a
specific spell, you must know that spell and expend spell
slots equal to that spell’s level a number of times over the
course of crafting the item as specified in the table below.
Any material components required for the spell must be
present for the duration of the crafting and if they are
consumed, the cost must be paid for every spell slot that is
expended (unless the item can only reproduce the spell a
fixed number of times, as with a Spell Scroll, in which case
the material cost is only paid that many times).
Value. A magical version of a mundane item whose
base cost is greater than 100 gp (such as plate armor)
should add the mundane cost of the item to the magic item
value for its rarity. Thus, a set of adamantine plate mail (an
uncommon magic item) would have a value of 2,000 gp.

Schematics
Creating of a magical item requires a detailed schematic of
the item in question (the sole exception is the common
potion of healing, which can be crafted without a
schematic); most often, these are found as part of ancient
libraries, in the custody of magical colleges, or in the
personal collections of high-level wizards. GMs are
strongly encouraged to include schematics as part of
treasure hoards if using these rules in their game. A
spellcaster who learns a schematic can maintain a copy of

that schematic in their spellbook or ritual book (if they have
one) or in a separate, dedicated schematic book.
You can attempt to craft a magic item without a
schematic or design new schematics whole cloth; doing so
requires an Intelligence (Arcana) check at the beginning of
the item’s creation process with a DC determined by the
item’s rarity, as shown on the Magic Item Crafting table
above. Success allows you craft the item as normal; failure
wastes that day’s progress and 1/10th of the consumable
materials required. Once you successfully create a
schematic for a magic item, that schematic is added to your
book.

Crafting
Constructs
Constructs are even more complex than magical items and
are thus even more challenging to create. To have given life
to a golem or shield guardian is truly the mark of the master
artisan.
In order to create a construct, you must possess the
following:
• Tools (refer to Common Constructs table for
examples),
• An appropriate manual (see below),
• Material components (equal to 25,000 gp + 5,000 gp ×
the construct’s CR)
• Time (equal to 5 × the construct’s CR days, minimum
1), and
• The ability to cast spells. Your caster level must be
equal to or greater than the construct’s CR.
Furthermore, building a construct requires total and
undivided attention. You must spend the requisite time
working without interruption, with the manual in hand for
the entire duration. You cannot do anything else while
working on a construct, and if you pause or suspend the
construction for any reason, any progress you have made is
lost and all of the material components are wasted.

51
magehandpress.com

[Página 54]
Construct Manuals

Common Constructs

Construct
CR
Cost
Time
Tools
Prior to starting work, you must write or obtain
Animated Armor
1
30,000 gp
5 days
Smith’s tools
a manual, which contains the blueprints for
Clay Golem
9
70,000 gp
45 days
Potter’s tools
how to assemble your construct and the
Flesh
Golem
5
50,000
gp
25
days
Leatherworker’s tools
incantations to bring it to life. A manual can
Flying Sword
1/4
26,250 gp
1 day
Smith’s tools
only be used once; the final incantation
Homunculus
0
25,000
gp
1
day
Potter’s tools
involves burning the tome and scattering its
Iron Golem
16 105,000 gp 80 days
Smith’s tools
ashes onto the construct.
The nature of the construct is determined by Shield Guardian
7
60,000 gp
35 days
Smith’s tools
the manual that created it; if you wish to create
Stone Golem
10
75,000 gp 50 days
Mason’s tools
a custom creature, you must determine its game
statistics when the manual is written.
In general, a construct manual should be treated like any
other consumable magic item, with the rarity determined by
You can repair any construct you have made by spending
the CR of the construct, as shown in the following table:
time working on it using the appropriate tools. For each
hour you spend, the construct can roll one hit die and regain
Construct CR
Rarity
that number of hit points. This does not deplete its pool of
0 to 3
Uncommon
hit dice.
4 to 6
Rare

Repairing Constructs

7 to 10

Very Rare

11+

Legendary

If someone tries to read a construct manual without
meeting the caster level prerequisite, they immediately take
6d6 psychic
damage.

Modifying Constructs

Once built, constructs can be modified in many ways. In
general, the GM will have to determine appropriate costs
and timeframes for this type of modification, since it is
impossible to predict what kinds of modifications a player
might want to make.
As a guideline, anything that affects the CR calculation
should cost more as an ‘aftermarket’ modification than it
would have to include in the original design, to reflect the
additional flexibility that such changes grant. For example:
• Changing an iron golem’s sword to a warhammer
(damage dice unchanged) should take 2.5 days and cost
2,500 gp.
• Adding armor plating to increase AC by 2 should take
5 days and cost 5,000 gp.
• Fitting hidden needles that add 4d8 poison
damage to an iron golem’s fists should take 10 days
and cost 10,000 gp.

Increasing
Productivity
Sometimes, 5 gp of progress per day is simply not
fast enough. Urgent orders or emergency situations
may call for accelerated work, which can be
achieved in several ways.

52
magehandpress.com

[Página 55]
Working Together
Multiple characters can collaborate on a single item to
make faster progress. Each worker must have their own set
of tools, though they may (indeed, must) share a workplace
and any fixed tools or machinery that come with it. For
example, a pair of smiths working together will share the
same forge and furnace but must bring their own hammers
and tongs.
Having an additional, proficient person assist you in
crafting an item doubles your output for that day. You can
work with another non-proficient person effectively,
however your output is only 1.5 times more than normal.
To have someone assist you effectively, you must share a
language with them or be accompanied by an interpreter.

Overtime
You can commit more than the normal 8 hours per day of
work to an item. If you do so, you can work up to 12 hours
for the day, completing as much work as you would have in
1.5 full days of work. At the end, you must make a
Constitution saving throw as if you had made a forced
march. Hirelings and staff can work up to 4 hours of
overtime, but you must pay them at double their normal
rate, so the full 12 hours’ work costs the same as two
normal, 8-hour days.

Crafting while
Adventuring
Savvy adventurers don't just craft new equipment during
downtime; they find free hours nearly every day on their
travels to labor on their personal projects. If you want to
continue a crafting project while adventuring and you have
the proper equipment to do so, you can break a normal 8
hours of work into smaller increments and continue to
work, albeit at a slower rate.
If you can find 4 hours a day to spend crafting new
equipment, you finish one day of crafting for every two
days you spend adventuring. If you can only find 2 hours a
day to spend crafting new equipment (which can be done
instead of taking two short rests,) you finish one day of
crafting for every four days you spend adventuring.

Shortcuts
Most items can be made without necessarily following all
of the usual steps. Doing so, however, puts the quality of
the item at risk and could potentially result in the entire
project being scrapped. If you wish to take a shortcut, the

total value of the item (both in terms of crafting it and
selling it) is reduced by 25%.
Once the item is complete, you must then make an
ability check using whichever ability score governs the
specific tool set you are using to craft that item (as
specified in the Tools of the Trade section). The DC for this
check depends on the type of item being made: DC 15 for
simple items, DC 20 for complex items, and DC 25 for
original designs and magic items. If you succeed, the
shortcut results in no negative consequences (except for the
reduced resale value of the item). If the check is failed by a
margin of 5 or less, the item functions, but is defective. The
GM determines the impact of this defect; they can roll on
the table below or choose a defect of their own devising. If
the check is failed by 6 or more, the item does not function,
and the time and materials spent making it are wasted.
d6 Defect
1

Ability checks made while using the item have
disadvantage.

2

Whenever the item is used, roll a d10. On a 1, the
item breaks.

3

Attack and damage rolls made with the item suffer
a -1 penalty, or any AC bonus granted by it is
reduced by 1.

4

The item makes an awful noise whenever it is
used.

5

The item weighs twice as much as it should and
cannot be used by Small creatures.

6

The item is toxic or otherwise harmful to its user.

Variant Rule:
Faster Crafting
In general, the crafting process is lengthy and laborious,
and an average adventurer can produce far less equipment
in their downtime than they actually require. For this
reason, the GM can decide to double the rate at which all
crafting takes place. For example, a character could craft
mundane items at a rate of 10 gp each day, instead than 5,
and craft magic items at a rate of 50 gp each day, instead of
25.

Variant Rule:
Crafting without Gold
To craft an item without providing gold pieces for the
resources required, double the amount of crafting time
required. This represents the amount of time necessary to
craft a copy of the item, which is sold to cover the
expenses.

53
magehandpress.com

[Página 56]
Artist’s Touch
The true power of the artisan lies in their ability to make
any object they desire, which lends them a huge amount of
flexibility in adventuring scenarios and gives their player a
great opportunity to flex their creative muscles. The
following sections contain details on some of the more
involved elements of item-making, for those who wish to
explore them.

Repairing & Altering
As a rule, broken, tainted, damaged, or incomplete items
are worth half of their normal value (so a broken, secondhand sword is worth a quarter of its listed value). Likewise,
a craftsperson can repair a broken item by working on it
until they have made an amount of progress equal to half of
the full value. They must expend materials as usual
(material value equals half of progress value), but if any
rare or unusual materials would be required to make the
item new, it can be assumed that they are already present in
the broken item.
The same rule can be applied to alteration or
modification of items (such as refitting a suit of armor).

Adding Flourishes
A skilled crafter does not spend their entire life
mechanistically producing identical objects with no style or
individuality. Flourishes allow artisans to add some
personality to their creations without redesigning objects
from the ground up.
When you create an item, either mundane or magical,
using tools with which you are proficient, you can add any
number of flourishes (though each one can only be added
once). Each flourish increases the value of the item by 25%
of its base worth—so two flourishes would increase the
value by 50%. This affects the construction time, material
costs and resale value. Note that you can’t add a flourish
and take a shortcut on the same item.
You can choose from the following flourishes:
Customizable. The object is made from interchangeable
parts that make it easier to retool. The cost in time and
materials to repair or alter the item (as described above) is
halved.
False Appearance. The object convincingly looks like a
different of a similar size. A successful Intelligence
(Investigation) check (DC equals 8 + your Intelligence
modifier + your proficiency bonus) reveals the item’s nature.

54
magehandpress.com

Finely Decorated. The object’s resale value increases
by 50% (after any other modifiers have been applied).
Flame Retardant. The object is resistant to fire damage
and does not catch fire when it is caught in an explosion or
fiery spell.
Heavy Duty. The object has twice the amount of hit
points it would normally have.
Lightweight. The object weighs half as much as it
normally would.
Portable. The object can be folded, collapsed, or
telescoped so that it fits into a space half as long in all
dimensions. Thus, a ten-foot pole could telescope down to
a five-foot pole.
Waterproof. The object is not damaged by water, and
cannot rust.

Designing your own Items
Half of the fun of being able to make things is being able to
create original items to your own design. Such items cannot
be found in shops and often require a significant investment
of time and resources, but can be tailored to suit specific
adventuring situations, enabling you to solve problems that
might otherwise be intractable.
If you want to design your own item, you will need to
work with the GM to ensure that it fits into the game, and
so that they can adjudicate mechanical aspects, such as
material costs and damage output. It is recommended that
such discussions are done outside of the normal game time,
as they could slow down progress for other players.
When designing a unique magical item, it is reasonable
to assume that the first example will be a prototype.
Progress on a prototype is always made at half speed, and
there is a risk that the item will not perform exactly as
intended. Upon completion of the prototype, roll on the
table below to determine what (if any) flaws it suffers.
d8 Defect
1-3 No flaw; item works as intended.
4

It required more materials than expected; pay half
the material cost of the item again.

5

It is fragile; whenever the item is used, roll a d10.
On a 1, the item breaks.

6

It is not aesthetically pleasing; its resale value is
reduced to 0.

7

It does not work properly; any attempt to use it has
disadvantage.

8

It is dangerous; users take 2d6 damage of an
appropriate type whenever they use it.

[Página 57]
Tools of
the Trade

they make within their area of specialty. Since most
crafting does not require any ability checks, they also gain
the following benefits:

All crafting activities require some kind of tool. This
section details which items can be made with which tools,
as well as clarifying which ability scores govern which
types of tools and activities.

• They can spend their downtime working as a private
tutor in a field in which they are proficient. This
enables them to support a comfortable lifestyle without
having to pay the 2 gp cost, or a wealthy lifestyle at
half the usual expense. At the GM’s discretion, this
activity can allow the character to build relationships
with other craftspeople.

Tool Proficiency
A character can create items even if they are not proficient
in the relevant tools. However, crafting without proficiency
imposes a number of drawbacks on the amateur artisan, as
explained below. For items that do not require any
specialist tools (such as Spell Scrolls), it is assumed that all
characters are proficient in their creation (as long as they
satisfy the other requirements, such as being a spellcaster of
the appropriate level).

Amateur Crafters
Non-proficient crafters suffer the following restrictions
when they set about creating items:
Complex Projects. When attempting to make a complex
item (as detailed on the Tools and Products table), a nonproficient crafter has their rate of progress slowed by 50%.
All magic items are complex, except for potions of healing.
No Original Designs. If you do not have proficiency
with the right tools, you can’t attempt to make any kind of
original design or magic item. This includes reverseengineering of existing non-standard designs. You also
cannot add flourishes.
Amateurish Work. Products made by amateurs do not
meet the standards that would be expected of a
professional. If you try to sell products you have
made using tools that you did not have proficiency in
(even if you later acquire the proficiency), they are
worth only half of the normal value. Furthermore,
you can’t perform the ‘practicing a profession’
downtime activity unless you are proficient in the
relevant set of tools to the profession you would like to
practice.

• Their crafting speed is doubled.

Tools and Products
The Tools and Products table describes all the standard tool
proficiencies that are available to player characters. It also
defines which specialist trades are included in the available
tool proficiencies, what products they can make, and what
other equipment they might need to work.
Note that if an object would appear to require the efforts
of multiple trades, it can be assumed that the component
parts are included in the material costs. For example, a
blacksmith would buy finished shafts when making
polearms.

Ability Checks
Tool proficiencies can be used in a number of scenarios.
Intelligence (Tool) checks will be called for when a
character attempts to recall information about a profession,
and Intelligence also governs a character’s ability to design
new items. Strength or Dexterity (Vehicle) checks can be
used when attempting to control a vehicle.
When a character actually tries to use a set of tools to
create an item, any ability checks will be made using
the tool’s governing ability, as listed in the tables.

Expertise
Some characters go beyond ordinary proficiency,
demonstrating extraordinary skills that allow them to
craft objects better and faster than other tradespeople.
This is represented by Expertise, which can be
acquired through class features and feats.
As per the standard rules, an expert adds double
their proficiency bonus to any ability (tool) check

55
magehandpress.com

[Página 58]
Tools and Products
Tool

Cost

Alchemist’s Supplies

50 gp

Bowyer’s Tools

Weight Simple Products

Complex Products

Ability

8 lb. Acid, artificial poisons,
inks, and dyes

Alchemist’s fire, holy water, magical
potions

Intelligence

15 gp

7 lb. Light crossbows,
shortbows

Crossbows, hand and heavy
crossbows, longbows, magical bows

Dexterity

Brewer’s Supplies
(includes vintners)

20 gp

9 lb. Beers, wines, spirits

Artisanal beers, fine wines

Intelligence
or Wisdom

Calligrapher’s
Supplies (includes
scribes)

10 gp

5 lb. Official documents (local)

Bank notes, illuminated manuscripts,
insurance documents, official
documents (regional)

Dexterity

Carpenter’s Tools
(includes coopers)

8 gp

6 lb. Clubs, doors and furniture, Fortifications, luxury furniture,
greatclubs, tool shafts,
musical instruments, siege weapons,
and handles, shields
wands, wooden armor

Dexterity

Cartographer’s Tools

15 gp

6 lb. Maps

Official maps, surveys

Dexterity

Cobbler’s Tools

5 gp

5 lb. Footwear

Luxury and magical footwear

Dexterity

Cook’s Utensils

1 gp

8 lb. Foodstuffs

Exotic and fine foods, any food made
using sugar

Wisdom or
Charisma

Fletcher’s Tools

10 gp

5 lb. Arrows, bolts

Magical arrows and bolts

Dexterity

Glassblower’s Tools

30 gp

5 lb. Bottles, bulbs,
lampshades, vases

Glass art, high-precision alchemy
tools

Dexterity

Herbalism Kit

5 gp

3 lb. Antitoxins, incense, inks
and dyes, natural poisons,

Magical potions, perfumes

Wisdom

Jeweler’s Tools

25 gp

2 lb. Cut gems, jewelry

Fine jewelry

Dexterity

Leatherworker’s Tools

5 gp

5 lb. Bags, clothing, leather
armor, pouches, whips

Magical leather armor, flesh golems

Dexterity

Mason’s Tools
(includes brickmakers
and stonecarvers)

10 gp

8 lb. Furniture, stone blocks,
stone maces and mauls

Bridges, buildings, fortifications,
Strength
other stone weapons, sculptures, and
statues

Painter’s Supplies

10 gp

5 lb. Drawings, reproductions

Original paintings

Dexterity or
Charisma

Poisoner’s Kit

50 gp

2 lb. —

Poisons

Intelligence

Potter’s Tools

10 gp

3 lb. Simple pots and vases

Fine pottery, homunculi, objets d’art

Dexterity

potions of healing

Ropemaker’s Tools

5 gp

3 lb. Hempen rope

Silken rope, string, splicing

Dexterity

Smith’s Tools
(includes weapon and
armor smiths)

20 gp

8 lb. Chains, furniture, nails,
simple metal weapons,
shields

Luxury furniture, machine
components, metal armor, metal
martial weapons, rods

Strength

Tailor’s Tools

10 gp

4 lb. Clothing

Fine clothing

Dexterity

Tinker’s Tools

50 gp

10 lb. —

Clockwork devices, fine machine
components, navigator’s tools

Dexterity

Weaver’s Tools

1 gp

5 lb. —

Cloth, yarn

Dexterity

Woodcarver’s Tools

1 gp

5 lb. Simple carvings in wood
or bone

Bone armor, fine carvings, objets
d’art

Dexterity

56
magehandpress.com

[Página 59]
Skills as Tools
Some crafting trades do not require any physical tools, but
are, for the purposes of this supplement, nonetheless
considered to be governed by tool proficiencies. They are
listed in the Skills as Tools table. Note that these
proficiencies have no governing abilities; you cannot make
tool checks with them.

Skills as Tools
Tool

Cost

Weight Simple Products

Complex Products

Fixed Equipment

Engineering

—

— —

Large projects

Cranes/hoists, forges, sawmills

Metallurgy

—

— Copper

Other metals, alloys

Furnaces, smelters

Vehicles (Land)

—

— Carts, sledges

Complex land vehicles (siege
engines, wagons, etc.)

—

Vehicles (Water)

—

— Rafts

Complex water vehicles (boats,
ships, submersibles)

Drydocks

Variant: Future Tools
Campaigns set in renaissance or modern-style worlds will
feature a number of tools and professions that are not
present in the standard, medieval fantasy setting. Examples
of such tools are listed below.

In addition to these new tools, post-medieval settings
may feature improved methods and equipment to the
benefit of older trades. For example, furnaces and smelters
may be more efficient, or new alchemical recipes may be
available.

Tools and Products
Tool

Cost

Weight Simple Products

Complex Products

Ability

10 lb. —

Firearms

Dexterity

Renaissance Tools
Gunsmith’s Tools

50 gp

Lens-Grinding Tools

30 gp

15 lb. —

Glasses, lenses, mirrors, telescopes

Dexterity

Printer’s Tools

10 gp

10 lb. Flyers, leaflets

Artistic prints, books, newspapers

Intelligence

Vehicles (Air)

—

Air vehicles (balloons, dirigibles, gliders)

—

— —

Modern Tools
Chemist’s Tools

100 gp

8 lb. Mineral salts,
petrochemical
fractions

Exotic and designer chemicals,
pharmaceuticals

Intelligence

Electrician’s Tools

100 gp

20 lb. Basic circuits,
connectors

Electronic devices, power systems

Dexterity

Mechanic’s Tools

100 gp

25 lb. —

Components, machines, piping systems,
structures

Dexterity

Software Tools

50 gp

— —

Computer programs and viruses, digital art

Intelligence

Futuristic Tools
Bio-Engineering Tools 200 gp

15 lb. Bacteria colonies,
skin grafts

Bio-machinery, neural networks, symbiotic
enhancements

Intelligence

Nanofabrication
Tools

500 gp

25 lb. Any simple
physical object

Any physical object

Intelligence

Vehicles (Space)

—

Space vehicles

—

— —

57
magehandpress.com
