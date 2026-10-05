# Encargo: Lote 36b (Craftsman Complete) de la app "Mi turno"

"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el formato de
abajo, lo que se pide, usando **solo el texto en inglés que viene al final**: material de la comunidad (Valda's Spire of Secrets (reglas 2014)), no oficial de
Wizards. Esta es la parte 2 de 5 de este material. Otra persona revisa y aplica tu respuesta con un script, así que el formato tiene que
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

[Página 17]
Apparatus Properties
The following apparatus properties are organized by
crafting level. While the properties applied to its armor and
weapons affect its combat effectiveness, the modifications
made directly to its frame determine its utility and support
capabilities.

Apprentice Properties
You can apply a number of Apprentice properties equal to
your Intelligence modifier + your Masterwork Bonus
(minimum 1) to your apparatus's frame.

Amenities
Apprentice property
Components Mechanaut's Apparatus
The interior of this apparatus is particularly cozy, perhaps
even including a warm blanket and pillow. You can sleep
while within this apparatus with no ill effects.

Control Harness
Apprentice property
Components Mechanaut's Apparatus
This apparatus features a set of straps and buckles to keep
its rider secured. While piloting this apparatus, you
cannot be dismounted against your will.

Ejector Seat
Apprentice property
Components Mechanaut's Apparatus
This apparatus comes equipped with an emergency
ejection system, allowing for quick escape. Exiting this
apparatus costs no movement.

Elixir Injector
Apprentice property
Components Mechanaut's Apparatus
A funnel in the cockpit allows riders to mix potions in
with this apparatus’s fuel. As an action, you can ‘feed’
your apparatus a potion, which affects the apparatus as if
it drank it.

Heavy Shocks
Apprentice property
Components Mechanaut's Apparatus
Sturdy suspension has been built into the legs of this
apparatus. Whenever this apparatus would take damage
from falling, it treats the height fallen as being up to 50
feet shorter.

Telescopic Frame
Apprentice property

Components Mechanaut's Apparatus
This apparatus can compress into a smaller construct
when not in use. While no one is inside the apparatus,
you can command it to collapse down to Medium size.
While reduced in this way, the apparatus cannot be
entered, even by a Small creature.

Warpaint
Apprentice property
Components Mechanaut's Apparatus
This apparatus has been decorated or designed in a
particularly intimidating way, striking fear into those who
face it. While riding this apparatus, you add your
Intelligence modifier to Intimidation (Charisma) checks.

Journeyman Properties
You can apply only one Journeyman property to your
apparatus's frame at a time.

Stern Servos
Journeyman property
Components Mechanaut's Apparatus
This apparatus’s Strength score increases by 3 (to 17).

Sturdy Servos
Journeyman property
Components Mechanaut's Apparatus
This apparatus’s Constitution score increases by 3 (to
17), increasing the frame’s maximum hit points by your
level.

Swift Servos
Journeyman property
Components Mechanaut's Apparatus
This apparatus’s Dexterity score increases by 3 (to 17).

Master Properties
You can apply only one Master property to your apparatus's
frame at a time.

Ettercap Compartments
Master property
Components Mechanaut's Apparatus
This apparatus has a spider-inspired material attached to
its mobility limbs, allowing it to scale steep surfaces. It
gains the ability to move up, down, and across vertical
surfaces and ceilings, in addition to a climb speed equal
to its movement speed.

Organic Interlay
Master property
Components Mechanaut's Apparatus

15
By: Crispian Thorne

magehandpress.com

[Página 18]
Through clever integration of an ironwood lining, this
apparatus is just organic enough to benefit from magical
restoration. While its creature type is still construct, this
apparatus can now regain hit points from the use of
healing spells such as cure wounds and healing word.

Legendary Properties
You can apply only one Legendary property to your
apparatus at a time.

Arcana Tether
Legendary property
Components Mechanaut's Apparatus
Small fittings, composed of etherite or similar mystical
minerals, bind the astral form of this apparatus to its
rider. When you are affected by a spell that targets only
you, you can choose for it to also affect your apparatus.

Charge Points. You have a number of charge points,
which represent the electrical energy stored within your
power cell. Your maximum number of charge points is
equal to half your craftsman level, rounded up. You can
spend these points to generate various electrical effects
through your conduit gauntlets. You regain all expended
charge points when you finish a short or long rest.
Conduit Gauntlets. Your conduit gauntlets are each
exotic masterwork weapons, with statistics shown above.
These draw power from your power cell, and do not
function if disconnected from it. While wearing them, you
can still manipulate or hold objects in those hands, though
you cannot do so and attack with them at the same time.
You can add your Intelligence modifier, instead of your
Dexterity modifier, to attack rolls you make with your
conduit gauntlets.

Conduction

Glasteel Cover
Legendary property
Components Mechanaut's Apparatus
By utilizing a transparent metal known as glasteel in its
cockpit, this apparatus affords incredible protection to its
rider, while still providing them with full vision of the
battlefield. Any creature riding this apparatus is granted
full cover from outside attacks.

Thunderlords’ Guild
From the earliest days of life, storms (and particularly,
lightning) have struck the creatures caught in them with
awe and terror. The Thunderlords, by contrast, draw wild
inspiration from the majesty of nature, and seek to, quite
literally, capture lightning in a bottle.

Thunderlord Gear
At 3rd level, you craft two unique pieces of gear: a power
cell and a pair of conduit gauntlets. These are both
complex, costly pieces of equipment, requiring long hours
of study and experimentation to create. When you gain
these items, you are assumed to have been working on
them in your spare time, only bringing them to full
functionality when you take this subclass.
If your power cell is ever lost or damaged, you can
repair or replace it over the course of a long rest with 100
gp of materials. You can repair, replace, or create a copy of
one of your conduit gauntlets over the course of a long rest
with 150 gp of materials.
Name

Starting at 3rd level, when you hit a creature with an attack
that deals lightning damage on your turn while wearing
your conduit gauntlets, you can spend one or more charge
points to enhance the power of the attack. When you do so,
add your Intelligence modifier to the damage roll of that
attack, and you can apply one of the following effects:
Burst. Each creature within 10 feet of the creature you
hit must succeed on a Dexterity saving throw against your
Masterwork save DC or take lightning damage equal to half
the damage rolled.
Chain. Your attack causes lightning to arc to nearby
creatures. For every 2 charge points spent, you can make a
single ranged spell attack against a creature you can see
within 15 feet of the creature you hit. This attack deals 1d8
+ your Intelligence modifier on a hit.
Flash. You can use your bonus action to move up to
half your movement speed. Doing so does not provoke
opportunity attacks.
Impulse. The creature you hit is shoved 10 feet for each
charge point spent directly away from you.
Jolt. The creature you hit cannot take reactions until the
start of your next turn.

Shock
At 3rd level, while you are wearing your conduit gauntlets
and have at least one unspent charge point, you can use the
cantrips shocking grasp and spare the dying. Intelligence is
your spellcasting modifier for these spells.
Cost

Weight Damage

Properties

Exotic Ranged Weapon
Conduit Gauntlets

16
magehandpress.com

150 gp

2 lb.

2d6 lightning Blaster (40/120), light

[Página 19]
Lightning Rod
Starting at 7th level, while you’re wearing your conduit
gauntlets, you gain resistance to lightning damage.
Additionally, whenever you take lightning damage from a
hostile creature while wearing your gauntlets, you can
regain 2 expended charge points as a reaction.

Static Charge
Starting at 10th level, you can spend 10 minutes to store an
electric charge in a suit of armor or weapon, or up to 6
pieces of gear if done over a short or long rest.
Charged Armor. When you use this ability to charge a
suit of armor, the first time you take damage from a melee
attack, you can use your reaction to expend the charge,
dealing 2d6 lightning damage to the creature that struck
you.
Charged Weapon. When you use this ability to charge a
weapon, the weapon deals 1d6 additional lightning damage
on a hit, expending the charge.

High Voltage
Starting at 14th level, while wearing your conduit
gauntlets, you can spend 5 charge points to cast the
spell lightning bolt without using a spell slot. This spell
uses your Masterwork save DC.
Additionally, when you deal lightning damage to a
creature twice on your turn, you can use your bonus action
to deal that creature an additional 1d8 lightning damage.

Master Electrician
At 18th level, you reach the peak of your craft. You learn
the following Legendary properties:

Coil
Legendary property
Components Suit of masterwork exotic armor
You fit an electrical coil to the back of your armor. As a
bonus action on your turn, you can activate or deactivate
the coil, generating a 10-foot radius field of electrical
energy around you. The first time a creature enters this
area during a turn or if it starts its turn there, it must make
a Dexterity saving throw or take 2d6 lightning damage. A
creature damaged by this ability can't use its reaction
until the end of your next turn.

Conductive
Legendary property
Components Conduit gauntlet
When you use your Conduction ability with this weapon,
you can add the following effect to the attack if you
spend 2 or more charge points:

Stun. The target must succeed on a Constitution
saving throw or be stunned until the end of your next
turn.

Trapper’s Guild
Craftsmen are no strangers to turrets, bombs, and
clockwork mechanisms, but the craftsmen of the Trapper’s
Guild raise this to a level of artistry. Given enough time
and resources, a trapsmith can veritably blanket a room in
dangerous implements, setting the stage to slay an intruder
in a half-dozen unique ways. While the traps do the dirty
work, the trapsmith is free to lounge about some distance
away, enjoying a cold beverage and dreaming up new,
dangerous designs.

17
magehandpress.com

[Página 20]
Danger Sense

Master Trapsmith

At 3rd level, your experience with traps gives you an edge
when escaping danger. You have advantage on Dexterity
saving throws against effects that you can see, such as traps
and spells. To gain this benefit, you can’t be blinded,
deafened, or incapacitated.

At 18th level, you reach the peak of your craft. You learn
the following crafting technique:

Traps
You are an expert in designing ingenious and lethal traps.
Starting at 3rd level, you can craft traps and deploy traps,
which are detailed in the Traps section below, using your
crafting tools and a bag of trapsmith’s parts. This bag of
gears, detonators, springs, and other mechanical equipment
contains many of the parts you need to construct traps.
You can deploy a number of traps equal to your
craftsman level at no cost, and regain all expended
deployments when you finish a long rest. You can disarm a
trap and recover it as an action or a bonus action. If you
deploy a trap and recover it before taking a long rest, it
does not count against the number of traps you can deploy.
Instead of improving your traps independently, you
instead refine the quality of your parts using the following
property:

Trap Upgrade
Apprentice property
Components Trapsmith's parts
Any trap you build using your trapsmith's parts has a +1
bonus to its attack rolls and save DC. You can apply this
property multiple times, once at each level of Masterwork
properties, further increasing the bonus by +1 each time.

Smart Traps
Starting at 7th level, traps you deploy do not trigger on or
target creatures you choose.

Booby Trap
Starting at 10th level, you take 10 minutes to conceal one
of your traps from an unsuspecting target. A creature can
detect a concealed trap by using its action to make an
Intelligence (Investigation) or Wisdom (Perception) check
(DC equals your crafting technique save DC), or by having
a passive Perception score higher than that DC. The first
time this trap activates, it deals twice the normal damage.

Rapid Setup
By 14th level, you can assemble a gauntlet of traps in the
blink of an eye. As an action, you can deploy three traps
which all have a deployment time of 1 action. These traps
can’t trigger until the end of your turn. Once you use this
ability, you can’t use it again until you finish a long rest.

18
magehandpress.com

Ambush Weapon
Legendary property
Components Exotic masterwork weapon with the TwoHanded property
By integrating the clever springs and clockwork of your
trapsmith parts into your weapon, you always have a
spare quick-deploy trap on hand. You can use your action
to load any trap with a deployment time of 1 action into
this weapon. Once loaded, the trap can be deployed as a
bonus action.

Traps
Trappers have a wide variety of dangerous armaments to
maim and disable their enemies. Generally, traps are
deployed by throwing them within range as an action and
activate on some sort of trigger. Unless otherwise specified,
a trap occupies the same space as a Tiny creature. If one of
your traps calls for a saving throw, it uses your masterwork
save DC.

Auto-Turret
Deployment Time: 1 action
Range: 5 feet
Trigger: 1 bonus action
This sophisticated device automatically lines up a crossbow
on a target, retracts the bowstring, and fires a bolt. You can
designate a target within 30 feet of the auto-turret by
speaking a coded instruction as a bonus action on your turn.
The turret then makes an attack roll (attack bonus equals
your proficiency bonus + your Intelligence modifier.) On a
hit, the turret deals 1d8 piercing damage. The turret carries
only 10 pieces of ammunition and deactivates
automatically 1 minute after first being triggered.

Deployable Barrier
Deployment Time: 1 action
Range: 5 feet
Trigger: None
Though not a trap in the conventional sense, a deployable
barrier is a simple, yet vital tool for survival in combat.
This barrier collapses to be easily carried and expands to be
5 feet wide and almost 4 feet tall, mounting securely into
the ground, when deployed. The barrier has AC 8 and 25
HP. A Medium creature that hunkers down behind it has

[Página 21]
three-quarters cover from the opposite side. Small and
smaller creatures have full cover behind the barrier.
Two or more of these barriers can be linked to create
larger walls consisting of 5-foot panels, each of which can
be independently targeted and destroyed.

Landmine
Deployment Time: 1 minute
Range: 0 feet
Trigger: Target moving within the trap’s area
You bury a landmine, an explosive with a pressure trigger,
which explodes when a creature steps on it. Once a
landmine is buried, it occupies a 5-foot-square area under
the ground. If a Small or larger creature steps in this area, it
and each creature within 5 feet of it must make a Dexterity
saving throw. On a failed save, the target takes 1d10
damage from the bomb, or half as much on a successful
save. Each creature within 5 feet of the target takes half
damage on a failed save. A landmine is destroyed when it is
triggered.
A creature can detect the presence of a buried landmine
with a Wisdom (Perception) check opposed by your
crafting technique save DC.
This damage of this trap increases as you gain higher
levels in this class. At 5th level, the damage increases to
2d10, at 11th level, the damage increases to 3d10, and at
17th level, the damage increases to 4d10.

Man-Trap
Deployment Time: 1 action
Range: 0 feet
Trigger: Target moving within the trap’s area
This oversized hunting trap, which is affixed to the ground
in an unoccupied 5-foot-square area, clamps down with
sharpened teeth onto the legs of an unfortunate creature that
steps into it. A target that steps into the trap must succeed
on a Dexterity saving throw or take 1d10 slashing damage
and stop moving. Until the target or another creature uses it
action to make a Strength check (DC equals your
Masterwork save DC) to free the target, it can't move.
Creatures of Huge size and larger can move normally,
ripping the trap from its mounting when they move.
This damage of this trap increases as you gain higher
levels in this class. At 5th level, the damage increases to
2d10, at 11th level, the damage increases to 3d10, and at
17th level, the damage increases to 4d10.

Razor Wire

Range: 10 feet
Trigger: Target moving through the wire's line
This immensely sharp wire is fired from a special device
that anchors its two ends in surfaces that you choose and
pulls the wire taught. When you deploy this trap, you
choose two locations within range as anchor points; the
wire occupies a line between those points.
This wire is thin and nearly invisible. A creature can
detect razor wire with a Wisdom (Perception) check
opposed by your Masterwork save DC. If a creature that
does not see the razor wire crosses its line, it must make a
Dexterity saving throw, taking 2d8 slashing damage on a
failed save, or half as much on a successful one.

Remote-Control Bomb
Deployment Time: 1 action
Range: 5 feet
Trigger: The bomb contacts a creature
You can use your action to deploy this rolling construct
bomb within 5 feet of you and you can use your bonus
action to remotely steer it using a second device. The
device moves up to 25 feet when you steer it, and you see
from the bomb's perspective when you do so. You can
control only 1 deployed remote-control bomb at a time.
If you steer this bomb into an obstacle, it explodes. The
target makes a Dexterity saving throw, taking 1d8 fire
damage on a failed save, or half as much on a successful
one.
The damage of this trap increases as you gain higher
levels in this class. At 5th level, the damage increases to
2d8, at 11th level, the damage increases to 3d8, and at 17th
level, the damage increases to 4d8.

Trigger Mine
Deployment Time: 1 action
Range: 30 feet
Trigger: 1 bonus action
These throwable mines detonate when you use your bonus
action to press a detonator. All trigger mines currently
deployed detonate at once when you do so. Each creature
within 5 feet of one or more bombs must make a Dexterity
saving throw. A creature takes 1d8 fire damage on a failed
save, or half as much on a successful one.
The damage of this trap increases as you gain higher
levels in this class. At 5th level, the damage increases to
2d8, at 11th level, the damage increases to 3d8, and at 17th
level, the damage increases to 4d8.

Deployment Time: 1 action

19
magehandpress.com

[Página 22]
Masterwork
Properties

Weapon Properties

Masterwork properties can be applied to any piece of
masterwork equipment, provided you can spare the time
and gold cost required to apply it. Each property entry
details the property’s level and the type of equipment it can
be applied to.
Unless otherwise noted, a piece of gear cannot have the
same property more than once; for example, you cannot
apply the Heavy property to a greatsword, or the Martial
property to a longbow.

The following weapon properties are organized by crafting
level. Generally, Apprentice properties can be used to
fashion nearly any type of simple, martial, or exotic
weapon, though some weapons might require one
Journeyman property as well. Master and Legendary
properties, by contrast, are used almost exclusively by
master craftsmen on their personal equipment.
Masterwork properties applied to ranged weapons apply
their effects to their ammunition, if applicable. If a property
requires a martial weapon, you can apply it to an exotic
weapon.

Damage Steps

Apprentice Properties

If a Masterwork Property increases or decreases a weapon’s
damage, it is moved up and down one step on the following
scale, down to a minimum of 1d4:

You can apply a number of Apprentice properties equal to
your Intelligence modifier + your Masterwork Bonus
(minimum 1) to a weapon.

1d4 → 1d6 → 1d8 → 1d10 → 1d12 or 2d6
Further increases add a +1 bonus to the weapon’s damage
roll.
If the weapon being modified has 2 damage dice (such
as a greatsword or a firearm), the scale is instead:
2d4 → 2d4 + 1 → 2d6 → 2d6 + 1 → 2d8 →
2d8 + 1 → 2d10 → 2d10 + 1 → 2d12

Aerodynamic
Apprentice property
Components Masterwork weapon with the Thrown
property
The thrown range of this weapon doubles and its damage
decreases by 1 step.

Automatic
Apprentice property
Components Masterwork ranged weapon with the
Ammunition property
This weapon gains the Automatic property and its damage
decreases by 1 step.
Automatic. When you make an attack with this weapon
on your turn, you can choose to make two attacks with
disadvantage instead. These attacks always have
disadvantage, regardless of circumstance. These attacks use
double the normal amount of ammunition.

Balanced
Apprentice property
Components Masterwork martial weapon with the Heavy
property
This weapon gains the Balanced property.
Balanced. This weapon is suitable for nimble, swift
combat, despite its size. A weapon with this property can
be wielded by Small creatures without disadvantage.

20
magehandpress.com

[Página 23]
Variant Damage Dice

Blaster
Apprentice property
Components Masterwork ranged weapon with the
Ammunition property
This weapon loses the Ammunition, Loading, and Reload
properties, as well as any damage die increases associated
with these properties. It gains the Blaster property and deals
radiant damage instead of its normal type. If this weapon
was not previously a firearm, its damage die increases by
three steps, and moves to two damage dice, if possible.
Blaster. A weapon with the Blaster property is a ranged
weapon that requires no ammunition. Blasters are
considered firearms for the purpose of class features and
abilities. Like firearms, you don’t add your ability score
modifier to blasters’ damage rolls.

Collapsible
Apprentice property
Components Masterwork weapon
This weapon gains the Collapsible property.
Collapsible. This weapon has hollowed out portions,
usually in the handle, allowing you to collapse it in on itself
for ease of storage and concealment. While stowed, you
have advantage on Dexterity (Stealth) checks made to
conceal this weapon.

Elegant
Apprentice property
Components Masterwork exotic weapon with the Light
property
This weapon gains the Elegant property and its damage
increases by one step.
Elegant. This weapon requires exceptional skill to use.
You must have a Dexterity score of 16 or higher to wield
an elegant weapon.

Exotic
Apprentice property
Components Masterwork martial weapon
This weapon becomes an exotic weapon and its damage
increases by 1 step.

Extended Magazine
Apprentice property
Components Masterwork martial weapon with the Reload
property
The Reload capacity of this weapon is doubled.

With the GM's permission, you can exchange your
exotic weapon's damage dice for an equivalent
variant. Sets of dice are equivalent when the sum
of the largest numbers of each set of dice are
equal. For example, you can replace a weapon that
deals 1d8 with 2d4 or a weapon that deals 2d12
with 4d6 or 3d8.

Finesse
Apprentice property
Components Masterwork melee weapon that does not have
the Two-Handed property
This weapon gains the Finesse property.

Fist
Apprentice property
Components Masterwork melee weapon that does not have
the Two-Handed or Versatile properties
This weapon gains the Fist property and its damage
decreases by 1 step.
Fist. Attacks made with this weapon are treated as
unarmed strikes.

Foregrip
Apprentice property
Components Masterwork weapon with the Reload
property that does not have the Two-Handed property
This weapon gains the Foregrip property.
Foregrip. This weapon can be used with one or two
hands. If used in two hands, its normal and long ranges
double.

Heavy
Apprentice property
Components Masterwork martial weapon with the TwoHanded property
This weapon gains the Heavy property and its damage die
increases by 1 step.

Light
Apprentice property
Components Masterwork weapon that does not have the
Two-Handed or Heavy properties
This weapon gains the Light property and its damage die
decreases by 1 step.

Loading
Apprentice property

21
magehandpress.com

[Página 24]
Components Masterwork ranged weapon with the
Ammunition property that does not have the Reload
property
This weapon gains the Loading property. Its damage die
increases by one step.

Martial
Apprentice property
Components Masterwork simple weapon
This weapon becomes a martial weapon. If the weapon is a
melee weapon, its damage increases by 1 step. If the
weapon is ranged, its short range increases by 20 feet and
its long range increases by 60 feet if the weapon’s long
range is three times its short range, or by 80 feet, if the
weapon’s long range is four times its short range. This
property can’t be applied to an exotic weapon.

Nonlethal
Apprentice property
Components Martial ranged weapon

Reach
Apprentice property
Components Masterwork martial melee weapon with the
Finesse or Two-Handed property
This weapon gains the Reach property and its damage die
decreases by 1 step.

Returning
Apprentice property
Components Masterwork melee weapon with the Light
and Thrown properties
This weapon gains the Returning property.
Returning. After being thrown, this weapon returns to
your hand at the end of your turn.

Reload
Apprentice property
Components Masterwork martial ranged weapon with the
Loading property

This weapon gains the Paired property.
Paired. This weapon comes with a twin weapon using
the same statistics. Ideal for two-weapon fighting, you can
draw or stow both weapons at the same time. If you lose
one of the paired weapons, the remaining weapon loses this
property. Removing this property breaks down the twin
weapon.

This weapon loses the Loading property as well as its
associated damage die increase, causing its damage die to
decrease by one step. The weapon gains the Reload (5)
property. If you apply the Reload property to a weapon
with the Mounted property, you can choose to give it the
Reload (1, 2 actions) property, and increase its damage by
two steps.
Removing this property causes the weapon to inherit the
Loading property instead.
Reload. This weapon can be used to make a number of
attacks before it must be reloaded. If you are not proficient
with the weapon, reloading it takes an action. If you are
proficient, you can reload it as a bonus action. Some
weapons require longer to reload, even if you have
proficiency, which is specified in the Reload property. If
reloading a weapon requires longer than one action, the
weapon can’t be used to make attacks until reloading is
finished.

Parrying

Scatter

This weapon gains the Nonlethal property.
Nonlethal. When you reduce a creature to 0 hit points
using this weapon, you can choose to knock the creature
out, rendering it unconscious, rather than deal a killing
blow.

Paired
Apprentice property
Components Masterwork martial weapon that has the
Light property

Apprentice property
Components Masterwork exotic melee weapon with the
Finesse property or Light property
This weapon gains the Parrying property.
Parrying. While wielding this weapon and not wielding
a shield, you gain a +1 to your AC against melee attacks.
You can only gain the benefit of one weapon with this
property at a time.

22
magehandpress.com

Apprentice property
Components Masterwork ranged weapon with the
Ammunition or Blaster property that does not have the
Sighted property
This weapon gains the Scatter property and its damage die
decreases by one step. The weapon’s normal and long
ranges are reduced by half, and the weapon’s damage die
increases by two steps when an attack with it is made
against a target within half of its normal range.

[Página 25]
Scatter. If you make an attack against a target that is
within half this weapon’s normal range, you deal the
damage value listed in parentheses instead of the weapon’s
normal damage dice.

Sighted
Apprentice property
Components Masterwork martial ranged weapon with the
Ammunition or Blaster property that does not have the
Scatter or Sighted property
This weapon’s range doubles and it either gains the Sighted
property or its damage die decreases by one step.
Sighted. This weapon has disadvantage on attack rolls
made against targets within 20 feet.

Superheavy

This weapon gains the Thrown property with a range of
(20/60).

Trip
Apprentice property
Components Masterwork martial melee weapon
This weapon gains the Trip property.
Trip. When you take the Attack action with this weapon
and hit a creature, instead of dealing damage, you can
immediately use a bonus action to attempt to shove that
creature prone. You have advantage on this shove attempt.

Two-Handed
Apprentice property
Components Masterwork weapon that does not have the
Finesse, Foregrip, Light, Thrown, or Versatile properties

Apprentice property
Components Masterwork exotic melee weapon with the
Heavy property

This weapon gains the Two-Handed property and its
damage die increases by 1 step.

This weapon gains the Superheavy property and its damage
increases by 1 step.
Superheavy. This weapon is unusually large for its
type. You must have a Strength score of 16 or higher to
proficiently wield a superheavy weapon.

Apprentice property
Components Masterwork exotic ranged weapon with the
Blaster property

Switch
Apprentice property
Components Two masterwork exotic weapons
You combine two weapons into a single unit, which has the
Switch property. The damage dice of each weapon form
decreases by one step.
Switch. This weapon has two forms. The damage and
properties of the second form are listed in parentheses. You
can swap between which weapon is being used as if you
were drawing a weapon.

Tension
Apprentice property
Components Masterwork exotic bow or crossbow that
does not have the Blaster property

Variable

This blaster has a variable power cell. As a bonus action,
you can change the damage type of the blaster to cold, fire,
lightning, radiant, thunder, or back to its normal damage
type.

Versatile
Apprentice property
Components Masterwork melee weapon that doesn’t have
the Foregrip or Two-Handed property
This weapon gains the Versatile property. While being
wielded in two hands, its damage die increases by 1 step.

Journeyman Properties
You can’t apply a Journeyman property to a weapon which
already has a property of this level.

Brutal

This weapon gains the Tension property.
Tension. When making a ranged weapon attack with a
tension weapon, you use your choice of your Strength or
Dexterity modifier for the attack and damage rolls. You
must use the same modifier for both rolls.

Journeyman property
Components Masterwork martial weapon

Thrown

Counterweighted

Apprentice property
Components Masterwork melee weapon that does not have
the Two-Handed property

This weapon gains the Brutal property.
Brutal. This weapon deals two additional dice of
damage on a critical hit.

Journeyman property
Components Masterwork exotic weapon with the TwoHanded property

23
magehandpress.com

[Página 26]
If your Strength score is 17 or higher, you can wield this
weapon in one hand.

while unmounted if held by a Medium or larger creature
with a Strength score of at least 15.

Double

Overheat

Journeyman property
Components Masterwork exotic melee weapon that does
not have the Heavy property

Journeyman property
Components Masterwork martial weapon with the Blaster
and Heavy properties

This weapon gains the Double property.
Double. This weapon has two damage-dealing ends.
When you use the Attack action and make an attack with
this weapon, you can use your bonus action to make an
additional attack with it; you do not add your ability
modifier to the damage roll of this attack.

This weapon gains the Overheat property and its damage
increases by 2 steps.
Overheat. Once you make an attack with this weapon, it
can't be used again to make an attack until the end of your
next turn.

Explosive
Journeyman property
Components Masterwork martial ranged weapon
This weapon gains the Explosive property and its damage
die decreases by one step.
Explosive. When this weapon’s projectile hits a target,
it explodes in a 5-foot radius. The projectile can be fired at
an unoccupied space within its range. Each creature other
than the target within the blast radius must succeed on a
Dexterity saving throw, taking half the damage rolled on a
failed save or no damage on a successful one.

Massive
Journeyman property
Components Masterwork exotic melee weapon with the
Superheavy property
This weapon gains the Massive property and its damage
increases by 2 steps.
Massive. Once you make an attack with this weapon,
you can't attack again until the beginning of your next turn.
If you would be able to attack more than once when you
take the Attack action on your turn, you deal an additional
two dice of damage when using this weapon.

Mounted
Journeyman property
Components Masterwork martial ranged weapon with the
Heavy property that does not have the Superheavy
property
This weapon gains the Mounted property and its damage
increases by 2 steps.
Mounted. This weapon is normally used while attached
to a tripod, vehicle, or other bracing mount. You can mount
or unmount this weapon as an action. While it is mounted,
it can't be moved. It can only be used to make an attack

24
magehandpress.com

Precision
Journeyman property
Components Masterwork exotic weapon with the Elegant
property
This weapon gains the Precision property.
Precision. Once per turn, you can deal an extra 1d6
damage to one creature you hit with this weapon if you
have advantage on the attack roll.

Rifled
Journeyman property
Components Masterwork ranged weapon with the
Ammunition or Blaster property
You do not have disadvantage on attacks made at long
range with this weapon.

Rocket
Journeyman property
Components Masterwork exotic weapon
This weapon gains the Rocket property and its damage die
decreases by one step.
Rocket. This weapon has a small propulsive engine
attached to it or its projectiles. Once per turn, when you hit
a creature with this weapon, you can deal an additional 1d4
damage to the target.

Twinshot
Journeyman property
Components Masterwork exotic ranged weapon
This weapon gains the Twinshot property.
Twinshot. Once on each of your turns when you make
an attack with this weapon, you can make another attack
with it against a different creature that is within 5 feet of
the original target and within range of the weapon.

[Página 27]
Master Properties
You can apply only one Master property to a weapon at a
time.

Adamantine
Master property
Components Masterwork exotic melee weapon with the
Versatile or Heavy property
This weapon’s damage die increases by two steps, and it
deals double damage to objects.

Blessed
Master property
Components Masterwork exotic weapon
This weapon deals an additional 1d6 radiant damage on a
hit. This additional damage increases to 1d12 radiant
damage if the target is a fiend or undead.

Cursed
Master property
Components Masterwork exotic weapon
This weapon deals an additional 1d6 necrotic damage on a
hit. This additional damage increases to 1d12 necrotic
damage if the target is a celestial or fey.

Deadblow
Master property
Components Masterwork exotic bludgeoning weapon

This weapon deals an
additional 1d8 poison damage
on a hit.

Magnetic
Master property
Components Masterwork exotic weapon
This weapon is highly magnetic and is attracted to metal.
This weapon deals an additional 1d4 lightning damage on a
hit. Additionally, you gain a 1d4 bonus on attack rolls with
this weapon against any creature that is wearing metal
armor or is primarily composed of metal, such as a
construct.

Mithral
Master property
Components Masterwork exotic melee weapon with the
Finesse property
This weapon’s damage die increases by 2 steps, and it
weighs half as much.

This weapon deals an additional 1d4 bludgeoning damage
on a hit, and you can automatically shove any creature of
Large size or smaller hit by it up to 10 feet away from you.

Primordial

Earthshatter

This weapon deals an additional 1d6 fire, lightning, cold,
acid, or thunder damage, your choice, on a hit.

Master property
Components Masterwork exotic weapon with the Massive
property
On a hit with this weapon, the target must make a Strength
saving throw or be knocked prone.

Keen
Master property
Components Masterwork exotic melee weapon with the
Elegant property
This weapon scores a critical hit on a roll of 19 or 20.

Noxious
Master property
Components Masterwork exotic weapon

Master property
Components Masterwork exotic weapon

Resonant
Master property
Components Masterwork exotic weapon
This weapon deals an additional 1d4 psychic damage on a
hit. This additional damage increases to 1d10 psychic
damage on a critical hit.

Serrated
Master property
Components Masterwork exotic weapon that deals
slashing damage
When a creature takes damage from serrated weapons twice
or more in a single turn, it takes an additional 1d12 slashing
damage.

25
magehandpress.com

[Página 28]
Legendary Properties
You can apply only one Legendary property to a weapon at
a time.

Cleaving
Legendary property
Components Masterwork exotic weapon that deals
slashing damage
When you Attack a creature with this weapon and score a
critical hit, that target takes an extra 4d6 slashing damage.
If you roll a 20 on the attack roll, roll another d20. If you
roll a 20, you lop off one of the target’s limbs, with the
effect of such loss determined by the GM. If the creature
has no limb to sever, you lop off a portion of its body
instead.

Crushing
Legendary property
Components Masterwork exotic weapon that deals
bludgeoning damage
Each time you hit a creature with this weapon, its AC is
reduced by 1, to a minimum of 10 AC. This effect lasts
until the affected creature completes a short or long rest.

Deadly
Legendary property
Components Masterwork exotic firearm or blaster
You can add your ability modifier to the attack and damage
rolls of attacks made with this weapon, instead of just
attack rolls.

Penetrating
Legendary property
Components Masterwork exotic ranged or thrown weapon
that deals piercing damage
This weapon’s shots pierce through its targets. When you
make an attack with this weapon, you can attack all
creatures in a straight line within
this weapon’s normal range;
each creature must succeed

26
magehandpress.com

on a Dexterity saving throw or take the weapon’s damage.

Seeking
Legendary property
Components Masterwork exotic weapon
Once per turn, when you make an Attack with this weapon
that does not have disadvantage and miss, you instead hit
the target and deal minimum damage.

Swift
Legendary property
Components Masterwork exotic melee weapon with the
Elegant property
This weapon can be used to attack blindingly fast. When
you use the Attack action and make an attack with this
weapon, you can use your bonus action to make an
additional attack. If you engage in two-weapon fighting
with two swift weapons, you can make two attacks, instead
of one, as a bonus action.

Threatening
Legendary property
Components Masterwork exotic melee weapon
When a creature provokes an opportunity attack from you,
you can use this weapon to make an attack against it
without using your reaction.

Armor Properties
The following armor properties are organized by crafting
level. Generally, exotic armor is made using the Exotic
property, while the other apprentice properties are used to
tailor a suit of armor to a craftsman’s personal tastes.
Higher level properties, by contrast, drastically alter suits of
armor to which they are applied.

Apprentice Properties
You can apply a number of Apprentice properties equal to
your Intelligence modifier + your Masterwork Bonus
(minimum 1) to a suit of armor.

[Página 29]
Cleated
Apprentice property
Components Suit of masterwork medium or heavy armor
While wearing this armor, when you would be
involuntarily moved by an effect, reduce that movement by
10 feet.

Climbing
Apprentice Property
Components Suit of masterwork light armor
This armor is outfitted with integrated climbing gear. While
wearing this armor, as long as you have one hand free, you
gain a climb speed equal to your movement speed.

Comfortable
Apprentice property
Components Suit of masterwork armor
You can sleep in this suit of armor with no ill effect.

Environmental
Apprentice property
Components Suit of masterwork armor
While wearing this suit of armor, you can ignore
detrimental effects of temperatures as low as -100 degrees
or as high as 300 degrees.

Exotic
Apprentice property
Components Suit of masterwork armor that isn’t exotic
This armor becomes exotic armor and gains a +1 to its AC.

Integrated
Apprentice Property
Components Suit of masterwork armor
You can integrate a weapon directly into your armor, or
you can integrate two weapons (one into each arm) if
neither has the Two-Handed property. When you draw an
integrated weapon, it snaps to your hand and you can’t be
disarmed of it. When you stow it, it retracts back into your
armor. You can switch which weapons are integrated over
the course of a long rest.

Plated
Apprentice property
Components Suit of masterwork medium armor
This armor gains a set of heavy, reinforced plates. The AC
provided by this armor increases to 18, though it now gains
no benefit from your Dexterity bonus. Additionally, you

have disadvantage on Dexterity (Stealth) checks made
while wearing it.

Quick-Change
Apprentice property
Components Suit of masterwork armor
You can don or doff this suit of armor as an action.

Retractable
Apprentice property
Components Suit of masterwork medium or heavy armor
One of the gauntlets on this suit of armor has a retractable
shield set into it. While wearing this armor, you can don or
doff this shield as a bonus action.

Scaled
Apprentice property
Components Suit of masterwork light armor
This armor is covered in heavy, hardened scales. The AC
provided by this armor increases by 3, but its maximum
Dexterity bonus becomes +2.

Spiked
Apprentice property
Components Suit of masterwork heavy armor
This suit of armor is bristling with spikes. While wearing
this armor, creatures who are in contact with you (either by
grappling you, being grappled by you, or having swallowed
you whole) take piercing damage equal to 1d4 + your
Strength modifier at the start of your turn.

Studded
Apprentice property
Components Suit of masterwork light armor
This armor is covered in hardened studs. The AC provided
by this armor increases by +1.

Journeyman Properties
You can apply only one Journeyman property to a suit of
armor at a time.

Adamantine
Journeyman property
Components Suit of masterwork heavy armor
This suit of armor is reinforced with adamantine, one of the
hardest substances in existence. While wearing it, any
critical hit against you becomes a normal hit.

Arcane
Journeyman property

27
magehandpress.com

[Página 30]
Components Suit of exotic masterwork armor
This armor is covered in arcane etchings. When you apply
this property to a suit of armor, choose two cantrips from
any spell list. While wearing this armor, you can cast those
cantrips. Intelligence is your spellcasting modifier for these
cantrips.

Diving
Journeyman property
Components Suit of exotic masterwork armor
This suit of armor is equipped with webbed fins, a mask,
and an air bladder containing 1 hour of breathable air.
While wearing it, you gain a swim speed equal to your
movement speed. Additionally, while breathing from the
air bladder, you can breathe normally underwater or in a
vacuum, and you ignore the effects of breathable poisons.
This bladder can be refilled over the course of a long rest.

Juggernaut
Journeyman property
Components Suit of exotic masterwork heavy armor
This suit of armor is fitted with massive plates and a heavy,
reinforced helmet. While wearing this armor, you count as
an obstacle providing three-quarters cover, instead of half
cover, for creatures that are within 5 feet of you. You must
have a Strength score of 18 or higher to proficiently wear
this armor.

Magnetic
Journeyman property
Components Suit of exotic masterwork medium or heavy
armor
This suit of armor is reinforced with lodestone and a small
coil containing an electric charge. As a bonus action, you
can activate this coil. When a creature within 5 feet of you
is targeted by a ranged weapon attack while this coil is
active, the attack targets you instead. You can deactivate
this coil as a bonus action.

Maneuvering
Journeyman property
Components Suit of exotic masterwork light or medium
armor
This armor contains a set of spring loaded, automatically
retracting grappling hooks, allowing you an incredible
amount of maneuverability. As a reaction when you fall, or
as a bonus action on your turn, you can project a grappling
hook at a target location you can see within your movement
speed. If the target location can hold your weight, you are
pulled there, expending movement normally. This

28
magehandpress.com

movement does not provoke opportunity attacks. You must
have a Dexterity score of 16 or higher to use this ability.

Mithral
Journeyman property
Components Suit of masterwork medium or heavy armor
This suit of armor is made of mithral, a light and flexible
metal that is as strong as steel. Armor made of mithral
weighs half as much as normal, has no Strength
requirement, does not impose disadvantage on Dexterity
(Stealth) checks, and increases its maximum Dexterity
bonus by 1 (if it is allowed one). Medium armor made of
mithral can easily be worn hidden under normal clothing.

Resistance
Journeyman property
Components Suit of masterwork armor
When you apply this property to a suit of armor, choose
any damage type other than psychic. While wearing this
armor, you gain resistance to that damage type.

Master Properties
You can apply only one Master property to a suit of armor
at a time.

Cloaking
Master property
Components Suit of exotic masterwork light armor
This armor can easily hide the wearer when needed. While
wearing this armor, you can cast the invisibility spell
without using a spell slot. Once you do so, you cannot do
so again until you complete a short or long rest.

Clockwork
Master property
Components Suit of exotic masterwork heavy armor
This suit of armor has dozens of clockwork mechanisms
integrated into it, granting you a number of benefits. While
wearing this armor, your movement speed increases by 10
feet, your jump distance triples, and you gain advantage on
Strength (Athletics) checks (other than grappling checks).

Dragonscale
Master property
Components Suit of exotic masterwork medium or heavy
armor
This armor is covered in dragonscales, teeth, and bones.
When you apply this property, choose a type of dragon
from the list below. While wearing this armor, you have
advantage on saving throws against the Frightful Presence

[Página 31]
and breath weapons of dragons, and you have resistance to
one damage type that is determined by the kind of dragon
you chose (shown below)

Furious

Dragon

While wearing this armor, if you have no more than half of
your hit points left, you have resistance to bludgeoning,
piercing, and slashing damage.

Resistance

Black

Acid

Blue

Lightning

Brass

Fire

Bronze

Lightning

Copper

Acid

Gold

Fire

Green

Poison

Red

Fire

Silver

Cold

White

Cold

Ghostly
Master property
Components Suit of exotic masterwork armor
This suit of armor is infused with ectoplasm. While
wearing this armor, you can use your bonus action to gain
the effects of the etherealness spell for up to 10 minutes,
and can use a bonus action again to deactivate it; you do
not need to use all 10 minutes consecutively. The armor
regains all expended time when you finish a long rest.

Trollskin
Master property
Components Suit of exotic masterwork armor

Legendary property
Components Suit of exotic masterwork armor

Golem
Legendary property
Components Suit of exotic masterwork heavy armor
This suit of armor is exceptionally large and powerful.
While wearing this armor, you are treated as if you were
under the effect of the “Enlarge” effect of the
enlarge/reduce spell.

Hyper
Legendary property
Components Suit of exotic masterwork light armor
This armor is designed to maximize the wearer’s speed.
While wearing this armor, your movement speed increases
by 10 feet, you gain advantage on initiative rolls, and you
can take the Dash action as a bonus action.

Immortal
Legendary property
Components Suit of exotic masterwork medium or heavy
armor

This suit of armor is made of or is lined with troll skin.
While wearing this armor, you can use a bonus action to
regain hit points equal to 1d10 + your Constitution
modifier. You can use this ability twice, regaining all
expended uses when you complete a short or long rest.

While wearing this suit of armor, you have advantage on
death saving throws, and your hit point maximum is treated
as 50 points higher for the purposes of determining if an
effect kills you from massive damage.
Additionally, while rolling death saving throws, if you
roll a 20 on the die, you regain a number of hit points equal
to your craftsman level + your Intelligence modifier.

Winged

Overshield

Master property
Components Suit of exotic masterwork light armor

Legendary property
Components Suit of exotic medium masterwork armor

This armor has a set of wings that can extend from a pack
set on the back of the suit, which you can do as a bonus
action. While wearing this armor with the wings extended,
you have a fly speed equal to your movement speed.

This suit of armor generates a field of force, protecting its
wearer from harm. As a bonus action on your turn, you can
gain temporary hit points equal to half your craftsman
level.

Legendary Properties

Spellguard

You can apply only one Legendary property to a suit of
armor at a time.

Legendary property
Components Suit of exotic masterwork armor
This armor is covered in protective sigils and charms.
While wearing this armor, you have advantage on saving
throws against spells.

29
magehandpress.com

[Página 32]
Chapter 2: Exotic Arms and Armor
Unconventional or experimental weapons and armor might
be found in the hands a warrior hailing from a far-off land,
in the ruins of an advanced civilization, or in the workshop
of a skilled, yet eccentric craftsman. Such exotic equipment
requires an incredible level of skill to wield or wear
properly, as they are often either unusually heavy, oddly

balanced, or bizarre in construction. As such, no class
(other than the craftsman) gains proficiency with any of the
exotic weapons and armor presented below. To gain
proficiency with exotic equipment, you must take the
Exotic Mastery feat, detailed at the end of this chapter.

Melee Weapons
Weapon

Cost

Damage

Weight

Properties

1 lb.

Finesse, light

Simple Melee Weapons
Antimatter Dagger

100 gp

1d4 necrotic

Ballistic Gloves

50 gp

1d4 force

1 lb.

Fist, light

Cestus

5 gp

1d4 bludgeoning

2 lb.

Fist, light

Claw Gauntlet

5 gp

1d4 slashing

2 lb.

Fist, light

Fishhook

1 gp

1d6 piercing

3 lb.

Versatile (1d8)

Hook Hand

25 gp

1d4 piercing

1 lb.

Finesse, light, special

Kama

1 gp

1d4 slashing

2 lb.

Finesse, light

Machete

5 sp

1d6 slashing

4 lb.

Special

Punching Dagger

5 gp

1d4 piercing

2 lb.

Fist, light

Sai

2 gp

1d4 piercing

2 lb.

Finesse, light

Skathári Warclub

10 gp

1d8 piercing

10 lb.

Two-handed

Tonfa

1 sp

1d4 bludgeoning

1 lb.

Light

Martial Melee Weapons
Arc Baton

150 gp

1d6 lightning

2 lb.

Special

Battlefist

75 gp

1d8 bludgeoning

3 lb.

Special

Bayonet

2 gp

1d4 piercing

1 lb.

Finesse, light, special

Cutlass

30 gp

1d8 slashing

2 lb.

Finesse

Estoc

15 gp

1d8 piercing

3 lb.

Versatile (1d10)

Gnomish Kneecapper

15 gp

2d6 bludgeoning

5 lb.

Balanced, heavy, two-handed

Harpoon

5 gp

1d8 piercing

4 lb.

Special, thrown (range 20/60)

Kopesh

25 gp

1d6 slashing

4 lb.

Finesse, light, trip

Katana

50 gp

1d8 slashing

3 lb.

Finesse, versatile (1d10)

Laser Sword

450 gp

1d8 radiant

3 lb.

Finesse, special, versatile (1d10)

Naginata

50 gp

1d10 slashing

5 lb.

Heavy, reach, two-handed

5 sp

Nunchaku

1d6 bludgeoning

1 lb.

Finesse, light

Photonic Lash

150 gp

1d4 radiant

2 lb.

Finesse, reach

Plasma Cutter

175 gp

1d10 slashing

10 lb.

Special, two-handed

Quickblade

20 gp

1d4 slashing

1 lb.

Collapsible, finesse, light, thrown (20/60)

Repulsor Gauntlet

150 gp

1d10 force

4 lb.

Heavy

Thermal Lance

150 gp

1d8 fire

6 lb.

Versatile (1d10)

Trident

15 gp

1d8 piercing

4 lb.

Thrown (range 20/60), versatile (1d10)

Wrenchinator

30 gp

1d12 bludgeoning

10 lb.

Heavy, two-handed

30
magehandpress.com
