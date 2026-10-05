# Encargo: Lote 34a (Warden) de la app "Mi turno"

"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el formato de
abajo, lo que se pide, usando **solo el texto en inglés que viene al final**: material de la comunidad (Valda's Spire of Secrets (reglas 2014)), no oficial de
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
JSON `{ "clave": "Warden (Valda's Spire of Secrets)" }` para la clase y cada subclase.
=== D ===
JSON `{ "clave": "1 o 2 frases que presenten la clase o subclase" }`.
=== E ===
Dudas, cortes de texto o [NO CONFIRMADO].

## Texto fuente (Warden (Valda's Spire of Secrets))

[Página 1]


[Página 2]
WARDEN

[Página 3]
Contents

Warden........................................3
Class Features..............................................5

Disciplines...................................................9
Guardian...................................................................9
Fanatic..................................................................... 10

Sage......................................................................... 11
Dragon Guard......................................................... 12

Warden Spell List......................................13

Appendix - Spells......................................14
Acid Rain................................................................ 14
Armor of Ice............................................................ 14

Braise....................................................................... 14

Douse...................................................................... 14
Downdrop............................................................... 14

Credits

Lead Designer: Steve Fidler
Design Consultants: Andrew T. Ha (Leuku), Israel
Moreira, Laura Hirsbrunner, Nicolo Dela Merced,
William Hudson King
Editor: Laura Hirsbrunner
Layout and Graphic Design: Steve Fidler
Cover Art: Caio Santos
Interior Art: Matt Forsyth, Alozo Emata, nyothep,
warmtail, Lars Rune, Patrick Langwallner, Pete
Linforth, Bob Greyvenstein, Dennis Saputra, Pixabay,
Vecteezy, Adobe Stock
Additional Graphics: “5e Classes” cover graphic by
Nathanaël Roux
Some artwork © Louis Porter, Jr. Design,
used with permission. All rights reserved.

Dripping Fangs....................................................... 15

Elite Design Elements ©Rising Phoenix Games

Fling........................................................................ 15

Some artwork by www.critial-hit.biz

Entomb................................................................... 15
Freezing Rain.......................................................... 15
Fumigate.................................................................. 15
Glacial Slide............................................................ 15

Grasping Earth........................................................ 16

Lightning Recoil..................................................... 16
Manifest Elements.................................................. 16

Some artwork used under the CC0 license or Public Domain.

Special Thanks: My thanks go out to the many playtesters
over the years who have provided meaningful feedback
and championed the Warden class as a worthy addition
to their campaigns.

Nature’s Brand......................................................... 16

Reflect Elements..................................................... 17
Sculpt Earth............................................................ 17

Sleeting Slice........................................................... 17

Stonefist................................................................... 17
Storm Orb............................................................... 17
Thunderous Charge................................................. 18

Toxin Well............................................................... 18

OGL License.............................................19

2 The Warden Class

The Warden Class will be featured in the
Compendium of Sacred Mysteries: Resurrection
by Genuine Fantasy Press, LLC.
To download or purchase its highly successful predecessor,
the Compendium of Forgotten Secrets: Awakening, go to
www.genfantasypress.com

[Página 4]
Matt Forsyth

Warden
As his footfalls touch down upon the snow, it melts around

their cloven shape. He’s lived in the frozen embrace of the
north for so long, sustained by the fire burning inside of
him. His spear drags along the snow beside him as his pace
picks up. Dark eyes suddenly glowing with fierce amber
light, he enters a full running stride. His fallen prey lay still,
staining the snow in its wake. Unwanted guests will not
encroach upon his territory so long as he draws breath.
Thunder booms in the distance. The dark halls of
this ruined castle alight with each crack of lightning.
Crouching in the corner, the diminutive goblin cowers at
each bolt. The heavily armored adventurer steps through
the hallway, each step like an echo to the storm outside. As
he rounds the corner, the small goblin pounces onto his
back, unleashing electrified energy from his fingertips that
courses throughout the adventurer’s armor and brings him
to his knees. The goblin cocks his fist and plunges it into a
kink in the armor, knocking the man out cold.
Perched atop a rocky outcropping, a travel-worn elf
gestures with her hands and summons a cloud of fog,
sending it into the mountain pass with a gust of wind. Trolls
have taken up residence at the narrowest part of the pass,
claiming tolls from travelers. As the thick miasma envelops
them, the bewildered trolls look frantically for its source.
The rest of the party, awaiting this moment, descends
on the trolls and carves them in twain. Their employer
will be pleased.
No matter their duties, no matter their creed, a warden
has honed their skill in battle and attuned to their innate
elemental power into a force of nature. Each warden has a
different perspective on the natural order of things, but they
have in common a natural-born command of the elements
and an aptitude for adventuring.

The Force of Nature

Wardens all share an innate ability to command the
elements. Their durability and survival instincts lead most
wardens to specialize in formal combat to augment their
power. Beyond those similarities, each warden specializes
in a specific area of the battlefield. One might be a stalwart
defender in the vanguard, surrounded in wards of power
unleashing elemental strikes. Another, a skirmisher,
channeling the elements directly through their body and
imposing them on their opponents. A warden finds their
edge in combat through leveraging elemental power, giving
them a unique place among their allies.

[Página 5]
Warden Class Table
Level Prof. Bonus

Features

1st

+2

Combat Discipline, Natural Awareness, Natural Power

Power Die Spells Known Spell Slots
4 (d4)

—

—

Slot Level
—

2nd

+2

Glamour, Source Magic

4 (d4)

2

1

1st

3rd

+2

Prime Element

4 (d4)

2

1

1st

4th

+2

Ability Score Improvement

4 (d4)

2

1

1st

5th

+3

Extra Attack

5 (d6)

3

2

2nd

6th

+3

Combat Discipline Feature

5 (d6)

3

2

2nd

7th

+3

Prime Elemental Shield

5 (d6)

4

2

2nd

8th

+3

Ability Score Improvement

5 (d6)

4

2

2nd

9th

+4

—

6 (d6)

5

2

3rd

10th

+4

Combat Discipline Feature, Nature Sense

6 (d6)

5

2

3rd

11th

+4

Improved Natural Power

6 (d8)

6

2

3rd

12th

+4

Ability Score Improvement

6 (d8)

6

2

3rd

13th

+5

—

7 (d8)

7

3

4th

14th

+5

Combat Discipline Feature

7 (d8)

7

3

4th

15th

+5

Channel Power

7 (d8)

8

3

4th

16th

+5

Ability Score Improvement

7 (d8)

8

3

4th

17th

+6

—

8 (d10)

9

3

5th

18th

+6

Improved Natural Awareness

8 (d10)

9

3

5th

19th

+6

Ability Score Improvement

8 (d10)

10

3

5th

20th

+6

Master of Elements

8 (d10)

10

3

5th

Distant Cousins

Unlike a druid, a warden does not serve nature, but rather
commands nature to serve them. Their power does not
come from a lifetime of patience and practice, but springs
from their essence, raw and innate. They feel more at home
in the confine of cities than other naturalists, and often
find purpose within the civilized world as easily as on
the frontiers.
However, the work of a warden is never quite done.
They rarely, if ever, dedicate their entire life to the pursuit
of a single cause. Once their duty is fulfilled, they move on,
much like the seasons.

Elemental Awakening

Wardens are profoundly affected by the nature of their
elemental awakening, attuned to all elements and masterful
with one. Consider the circumstances of your awakening
when creating a warden. How might that connect you to
the world and its denizens?
d6

Elemental Awakening

1

When I was young, I found a cave outside of town. I
made this my secret hideout and spent all my free
time here. Little did I know it was a portal to one of the
Elemental Planes.

4

Legend tells how my long-ago ancestors immigrated from
an elemental plane.

5

One day, when I awoke, my eyes suddenly changed color.
At random times, they shift between red, blue, green,
white, and gray.

6

On each of my birthdays, year after year, a local natural
disaster occurs.

Place in the World

While a helpful warden is well-received in any community,
how they feel about being part of civilization varies.
Consider how you regard society and how you respond to
living in or visiting bustling city centers.
d6

Place in the World

1

You feel your powers ostracize you from society, and you
go to great lengths to keep them a secret.

2

Whenever you travel to new places, you wish to help the
disenfranchised.

3

Long ago, you were cornered for showing your powers
and had to use them to escape grave injury. You live with
anxiety that this will occur again one day.

4

You yearn to visit the cities of the elemental planes, and
feel that no mundane city can compare.

2

Nothing about my birth was typical. When I was born, my
body was covered in aspects of the elements (ash, water,
vines, etc.).

5

3

My hometown was founded on land once torn by war
between powerful mages, and the elemental residue has
tainted the land.

Being surrounded by worked stone makes you feel
unsettled, and you feel much more comfortable in druid
groves or camping in the wild.

6

You relish the opportunity to be part of society, as you
were sheltered from it in the past.

4 The Warden Class

[Página 6]
Creating a Warden

The most important aspect of a warden is their affinity to
the natural world and how they marry it to their martial
prowess. While a warden’s specific discipline is chosen at
1st level, their prime element doesn’t mature until 3rd. This
prime element affects your warden’s personality and the
flavor of combat, so plan by reading your features. Do you
thrum with a fiery core? Are your movements as still as
the snow atop a mountain? Or does the tenacity of a storm
rage within you?
Also decide what motivates you. Do you see yourself
taking up arms to defend your fellow adventurers?
Stalwartly defending your home? Or do you set yourself
out as a contract for hire—combating the enemies of your
employer as long as it coincides with your own pursuits to
cleanse nature?
Your duties can often conflict with the laws of
civilization, and most wardens’ alignments lean toward
chaotic good or neutral good. However, some are known
to pursue their duties more severely, walking a fine line
between good and evil.

Quick Build

You can make a warden quickly by following these
suggestions. First, put your highest ability score in Strength
or Dexterity to improve your martial presence. Then
make Wisdom or Constitution your next highest score,
depending on your place on the battlefield. Finally, choose
the outlander background.

Alonzo Emata

Optional Rule: Multiclassing

If your group uses the optional rule on multiclassing, here’s
what you need to know if you choose warden as one of
your classes.
Ability Score Minimum. As a multiclass character, you
must have a Strength or Dexterity score of 13 or higher,
as well as a Wisdom score of 13 or higher, to take a level
in this class, or to take a level in another class if you are
already a warden.
Proficiencies Gained. If warden isn’t your initial class,
here are the proficiencies you gain when you take your
first level as a warden: light armor, medium armor,
simple weapons.

Pact and Source Magic. If you gain the Pact Magic
feature from another class, your levels in that class combine
with your warden class level to determine what level your
spell slots are. Your number of spell slots is equal to the
number of slots you would receive in the higher of the two
classes, as indicated in the Pact and Source Magic Spell
Slots table. For example, if you are a 14th-level warden and
6th-level warlock, you are a 15th-level pact caster and you
have three spell slots that are 5th level.

Pact and Source Magic Spell Slots
Class Level

Slot Level

1st–2nd

1st

3rd–4th

2nd

5th–6th

3rd

7th–8th

4th

9th–20th

5th

Class Features

As a warden, you gain the following class features.

Hit Points

Hit Dice: 1d10 per warden level
Hit Points at 1st Level: 10 + your Constitution modifier
Hit Points at Higher Levels: 1d10 (or 6) + your
Constitution modifier per warden level after 1st

Proficiencies

Armor: Light armor, medium armor, shields
Weapons: Simple weapons
Tools: None
Saving Throws: Wisdom, Strength
Skills: Choose two from Animal Handling, Athletics,
Arcana, Intimidation, Investigation, Nature,
Perception, and Survival

Equipment

You start with the following equipment, in addition to the
equipment granted by your background:
• your choice of any two simple weapons or one martial
weapon (if proficient)
• your choice of leather armor or scale mail
• your choice of a shortbow and 20 arrows or a shield
• an explorer’s pack and a component pouch
If you forgo this starting equipment, as well as the items
offered by your background, you start with 5d4 x 10 gp to
buy your equipment.

[Página 7]
You’ve completed your training in a combat specialty of
your choice, detailed at the end of the class description.
Your choice of discipline grants you features at 1st level, and
again at 6th, 10th, and 14th level.

Natural Awareness

The time you’ve spent in nature learning your craft and
honing your skills has given you an acute sense of danger.
You have advantage on Wisdom (Perception) checks while
in a natural environment (such as a forest or a cave, but
not a city or dungeon). Also, you can unerringly identify
if environmental phenomena (such as tremors, eruptions,
magma flows, thunderstorms, and similar) are natural
or unnatural.
Starting at 18th level, you also gain a bonus to your
initiative rolls equal to your Wisdom modifier. When you
are in an entirely natural environment, you gain advantage
on initiative checks.

Natural Power

All wardens draw from a well of natural power, channeling
the elements into their strikes using special dice called
power dice. The Warden table shows how many power dice
you have, as well as what die size to roll when using them.
When you hit with a weapon attack, you can expend
a power die to add the result to the attack’s damage roll.
The damage type of the extra damage is acid, bludgeoning,
cold, fire, lightning, or thunder (your choice.) This
damage is magical.
When you finish a short rest, you regain a number of
power dice equal to half your total amount. You regain all
expended power dice when you finish a long rest.

Glamour

Starting at 2nd level, you can create a harmless elemental
sensory effect originating from your body. For example,
this may be in the form of water dripping from your
hands, a fiery glow in your eyes, or your skin appearing
mottled and earthen.
In addition, when making a Charisma check, you can
expend a power die, rolling the die and adding the result to
your ability check.

Source Magic

Also at 2nd level, you’ve unlocked your natural-born
affinity with the elements in the form of spellcasting. The
warden spell list is provided at the end of this section.

Spell Slots

The Warden table shows how many spell slots you have
to cast your spells of 1st level and higher. The table also
shows what the level of those slots is; all of your spell slots
are the same level. To cast one of your warden spells of 1st
level or higher, you must expend a spell slot. You regain all
expended spell slots when you finish a short or long rest.
For example, when you are 5th level, you have two
2nd-level spell slots. To cast the 1st-level spell thunderwave,
you must spend one of those slots, and you cast it as a
2nd-level spell.

Spells Known of 1st Level and Higher

At 2nd level, you know two 1st-level spells of your choice
from the warden spell list.
The Spells Known column of the Warden table shows
when you learn more warden spells of your choice of 1st
level and higher. A spell you choose must be of a level no
higher than what’s shown in the table’s Slot Level column
for your level. When you reach 9th level, for example,
you learn a new warden spell, which can be of 1st, 2nd,
or 3rd level.
Additionally, when you gain a level in this class, you can
choose one of your warden spells you know and replace it
with another spell from the warden spell list, which also
must be of a level for which you have spell slots.

Spellcasting Ability

Wisdom is your spellcasting ability for your warden spells,
so you use your Wisdom whenever a spell references your
spellcasting ability. In addition, you use your Wisdom
modifier when setting the saving throw DC for a warden
spell you cast and when making an attack roll with one.
Spell Save DC = 8 + your proficiency bonus + your
Wisdom modifier
Spell attack modifier = your proficiency bonus + your
Wisdom modifier

nyothep

Discipline

[Página 8]
Prime Element

At 3rd level, your application of your elemental abilities
encourages a specialized path. You gain one of the following
features of your choice, which also determines the benefit
you gain at 7th level.

Earthen Bulwark

You learn the fling*, sculpt earth*, and stonefist* cantrips.
Whenever you use your Natural Power feature to deal
extra bludgeoning damage, the target must succeed on a
Strength saving throw equal to your warden spell save DC,
or become grappled by the ground around it. The target
can use an action to attempt to break free by repeating this
saving throw, breaking free on a successful save. A creature
that is currently flying or is otherwise not within 5 feet of
the ground automatically succeeds on this saving throw.
Additionally, when a creature moves within 5 feet of
you, you can use your reaction to expend a power die and
attempt to shove them away. Make a Strength (Athletics)
check contested by the target’s Strength (Athletics) or
Dexterity (Acrobatics) check, adding the result of your
power die to your roll. If you win the contest, you push the
target back 10 feet and its movement becomes 0 until the
end of its turn.

Flaming Bravery

You learn the braise*, fire bolt, and produce flame cantrips.
Whenever you use your Natural Power feature to deal
extra fire damage, the target takes that same amount of
extra damage at the start of its next turn.
Additionally, when a creature makes an attack roll
against you, you can use your reaction and expend a power
die to add the number rolled to your AC. You can choose to
do this after the creature has rolled to attack, but before the
DM says whether the attack hits or misses. If you choose to
expend this die and the attack misses, the attacking creature
takes fire damage equal to your Wisdom modifier + the
result of your power die.

Stoic Chill

You learn the freezing rain*, glacial slide*, and ray of
frost cantrips.
Whenever you use your Natural Power feature to deal
extra cold damage, the target has disadvantage on the next
weapon attack it makes before the start of your next turn.
Additionally, when you make a saving throw, you can
use your reaction and expend a power die to add the result
to your save. You can choose to do this after you have rolled
the saving throw, but before the DM says whether the
roll succeeds or fails. If you succeed on the saving throw,
all surfaces in a 10-foot radius of you become covered
in enchanted ice, which is difficult terrain. When the ice
forms, any creature (other than you) in the area must
succeed on a Dexterity saving throw against your warden
spell save DC, or fall prone. This effect lasts until the start of
your next turn.

Unrelenting Storm

You learn the douse*, shocking grasp, and storm
orb* cantrips.
Whenever you use your Natural Power feature to
deal extra lightning or thunder damage, and the target
moves willingly before the start of your next turn, you can
reroll your power die, and the target takes lightning or
thunder damage (your choice) equal to the result + your
Wisdom modifier.
Additionally, when you make an attack roll with a
weapon attack, you can expend a power die and add that
number to your attack roll. You can make this choice after
you see the roll, but before the DM says whether the attack
hits or misses. If the attack hits, all other creatures within
5 feet of you or the target of your attack must make a
Constitution saving throw against your warden spell save
DC, being knocked back 5 feet on a failed save.

Putrid Corrosion

vecteezy

You learn the acid splash, fumigate*, and poison
spray cantrips.
Whenever you use your Natural Power feature to deal
extra acid damage, the target can’t add its Strength or
Dexterity modifier to weapon damage rolls it makes until
the end of its next turn.
Additionally, when you cast a spell that causes a creature
to make a saving throw, you can expend a power die and
add a corrosive element to that spell. If a creature fails
its saving throw against your spell, your corrosive magic
begins to permeate its body. At the beginning of each of its
turns, the creature must make a Constitution saving throw
against your warden spell save DC. On a failed save, the
creature takes acid damage equal to the result of your power
die. On a successful save, or after 1 minute, the effect ends.

The Warden Class

7

[Página 9]
Ability Score Improvement

Channel Power

Extra Attack

Master of Elements

Beginning at 5th level, you can attack twice, instead of once,
whenever you take the Attack action on your turn.

Prime Elemental Shield

At 7th level, you can use your reaction to produce one of
the following effects, determined by the Prime Element
option you chose at 3rd level.
Earthen Bulwark. As a reaction to a creature making
a ranged attack against you or causing you to make a
Dexterity saving throw, you can kick up a cloud of dust
and rocks, imposing disadvantage on its attack or granting
advantage on your saving throw.
Flaming Bravery. Your body flares with fiery energy
when others assault you. You can use your reaction to
grant yourself advantage on a saving throw or ability check
made to resist being grappled, knocked prone, or moved
against your will.
Putrid Corrosion. As a reaction to a creature hitting
you with a melee attack using a metal weapon, you can
weaken that weapon. Any time that weapon is used to make
an attack before the end of your next turn, that attack is
made with disadvantage and can’t benefit from advantage
from any source.
Stoic Chill. As a reaction to a creature hitting you with a
melee weapon attack, you can create a thick barrier of ice
between you and the weapon, reducing the damage dealt by
the attack by an amount equal to your Wisdom modifier.
Unrelenting Storm. As a reaction to a creature hitting you
or an ally within 5 feet of you with a ranged weapon attack,
you can create a buffet of air that dampens the impact of the
projectile, reducing the damage dealt by the attack by an
amount equal to your Wisdom modifier.

Nature Sense

Beginning at 10th level, you can channel nature to extend
your senses. You can spend 1 minute touching a natural
surface and focusing on it, after which you shift your
perspective as if your senses were originating from any
point of your choice on that surface within 100 feet of you.
You can maintain this vantage point for up to 10 minutes
if you don’t move, and can choose to end it at any time (no
action required). You are blinded and deafened to your own
senses for the duration.

Improved Natural Power

Starting at 11th level, your natural well of magical power
surges more readily. Once on each of your turns when you
deal damage to a creature with a weapon attack or warden
cantrip, you can deal an extra 2d8 damage. The damage
type of the extra damage is acid, bludgeoning, cold, fire,
lightning, or thunder (your choice).

8 The Warden Class

Starting at 15th level, your natural power can fuel
your spellcasting directly. As a bonus action, you can
sacrifice four power dice to regain a single spell slot.
Once you use this feature, you can’t do so again until you
finish a long rest.
At 20th level, your mastery of the elements has granted you
access to a form of pure power. As an action, you unleash
a torrent of magical energy in a 30-foot radius centered
on you. This area becomes infused with primal magic and
takes on an appearance based on your prime element. For 1
minute, you gain the following benefits:
• While you are within this area, whenever you expend a
power die, the number of power dice you have available
does not decrease.
• You have resistance to bludgeoning, acid, cold, fire,
lightning, and thunder damage.
• As an action, you can have the area itself come alive and
attack. Make a single weapon attack against any number
of creatures within the area, dealing damage against
each creature you hit.
Once you use this feature, you can’t do so again until you
finish a long rest.

warmtail

When you reach 4th level, and again at 8th, 12th, 16th, and
19th level, you can increase one ability score of your choice
by 2, or you can increase two ability scores of your choice
by 1. As normal, you can’t increase an ability score above 20
using this feature.

[Página 10]
Disciplines
All wardens are masters of combat and raw magic. Their

Strength of the Elements

Guardian

Shielding Aura

strength comes from their ability to harmonize both. To do
so, each warden focuses on a single area of combat to excel
in, learning spellcasting techniques that best complement
it. Your choice of discipline may define your role as an
adventurer, but as a warden, you will always be in tune with
the thrum of nature.
Your training has focused on utilizing martial weapons
to combat your foes and defend nature. By specializing in
weaponry, you’ve sharpened the edge of your resolve and
found balance between nature and steel.

Discipline Spells

You learn an additional spell when you reach certain levels
as a warden, as shown in the Guardian Spells table. The
spell counts as a warden spell for you, but it doesn’t count
against the number of warden spells you know.

Guardian Spells
Warden Level

Spell

2nd

nature’s brand*

5th

grasping earth*

9th

manifest elements*

13th

stone skin

Starting at 6th level, when you would normally roll a power
die to deal extra damage to a creature, you can choose to
treat a roll of anything less than its highest result as its
highest result.
You can do this a number of times equal to your
Wisdom modifier (a minimum of once). You regain all
expended uses when you finish a short or long rest.
Starting at 10th level, if you or a creature you can see within
30 feet of you takes acid, fire, cold, lightning, or thunder
damage, you can use your reaction to reduce the damage to
that creature by half.

Nature’s Fury

At 14th level, your mastery of combat enables you to tap
into your elemental affinity and strike true. When you
make a weapon attack, you can expend a power die to grant
yourself advantage on that attack. For each d20 that is part
of the attack roll that would hit the creature, you roll that
power die, dealing extra damage equal to the result. The
damage type of this extra damage is acid, bludgeoning,
cold, fire, lightning, or thunder (your choice.)

Combat Training

warmtail

Beginning when you choose this discipline at 1st level,
you’ve trained in a variety of styles suited to your tastes
and the needs of the situation. You gain proficiency in all
martial weapons and heavy armor. In addition, choose one
of the following fighting style options. You can’t take the
same fighting style option more than once, even if you get
to choose again.
Archery. You gain a +2 bonus to attack rolls you make
with ranged weapons.
Great Weapon Fighting. When you roll a 1 or 2 on a
damage die for an attack you make with a melee weapon
that you are wielding in two hands, you can reroll the
die and must use the new roll, even if the new roll is a 1
or 2. The weapon must have the two-handed or versatile
property for you to gain this benefit.
Protection. When a creature you can see attacks a target
other than you that is within 5 feet of you, you can use your
reaction to impose disadvantage on the attack roll. You
must be wielding a shield.

The Warden Class

9

[Página 11]
Pugilist

At 1st level, you’ve forgone all need for weapons, focusing
your training on turning your body into its own force of
nature. You gain the following benefits:
• You can roll a d4 in place of the normal damage of your
unarmed strikes. This die changes as you gain warden
levels, as shown in the Power Die column of the Warden
table.
• You can use Wisdom instead of Strength for the attack
and damage rolls of your unarmed strikes.
• When you take the Attack action to make an unarmed
strike, you can make another unarmed strike as a bonus
action.

Precise Power

Starting at 6th level, your discipline and patience enable
you to strike at the most opportune moment, exploiting
weaknesses in your opponent’s defenses. When you expend
a power die to deal extra damage to a creature with an
unarmed strike, you can roll the power die an extra time
and add its result to the damage.
You can do this a number of times equal to your
Wisdom modifier (a minimum of once). You regain all
expended uses when you finish a long rest.

You’ve decided that weapons are a hindrance and only serve
to block your connection to nature. The raw connection of
your body is all you need to wield your power freely.

Discipline Spells

You learn an additional spell when you reach certain levels
as a warden, as shown in the Fanatic Spells table. The spell
counts as a warden spell for you, but it doesn’t count against
the number of warden spells you know.

Fanatic Spells
Warden Level

Spell

2nd

reflect elements*

5th

downdrop*

9th

haste

13th

fire shield

10 The Warden Class

Extension Stance

Beginning at 10th level, you blend your martial skill with
the elements, extending your range of influence. Your reach
with unarmed strikes increases to 15 feet when both your
hands are empty. When you are grappling a single creature,
as long as it remains within reach, you do not need to use
your hands to maintain the grapple, instead binding it with
raw elemental power.
When you cast a spell with a range of touch, for you, it
has a range of 15 feet.

Exploding Elements

Starting at 14th level, the elements coursing through you
can be expelled as an explosive burst. When you expend
a power die to deal extra damage on an attack, you can
choose to have that damage dealt to all creatures within 5
feet of your target, excluding you.

warmtail

Fanatic

[Página 12]
Sage

You’ve always had a profound connection to elemental
power, and dedicate yourself entirely to honing your
innate abilities. Compared to other wardens, your ability to
command spells is unmatched.

Discipline Spells

You learn an additional spell when you reach certain levels
as a warden, as shown in the Sage Spells table. The spell
counts as a warden spell for you, but it doesn’t count against
the number of warden spells you know.

Sage Spells

Warden Level

Spell

2nd

faerie fire

5th

moonbeam

9th

protection from energy

13th

polymorph

Innate Potential

When you choose this discipline at 1st level, you can
harness magic more readily than other wardens. On your
next turn after dealing extra damage on a weapon attack
with your Natural Power feature, you can cast one of the
following spells without expending a spell slot or requiring
components: burning hands, dripping fangs*, entangle,
entomb*, or thunderwave. Wisdom is your spellcasting
modifier for these spells.

Elemental Strikes

Beginning at 6th level, when you use an action to cast a
spell granted by your Innate Potential feature, you can make
one weapon attack as a bonus action.

Primal Dance

Beginning at 10th level, you’ve learned to predict the
movements of your enemies through sensing disturbances
in the air around you. As a reaction when a hostile creature
moves within 15 feet of you, you can move up to your
speed without provoking opportunity attacks.

Duality

warmtail

Starting at 14th level, the ease with which you
manifest magic has allowed you time to master
another element. Choose a second prime
element from the Prime Element class feature.
You gain the benefits of both elements, and
when a feature produces an effect based on
the element you’ve chosen, you can pick
which of those elements to manifest.

[Página 13]
Draconic Influence

At 1st level, your latent natural power and the influence of
dragons unlocks power tied to a specific breed of dragon.
Choose one of the following dragon types. You gain
proficiency in the skill associated with that dragon type (if
you aren’t already proficient). The damage type associated
with each dragon determines the effects of features you gain
at 10th and 14th level.
Dragon
Black

Skill
Dexterity (Stealth)

Damage Type
Acid

Blue
Brass

Charisma (Deception)
Charisma (Persuasion)

Lightning
Fire

Bronze
Copper

Wisdom (Insight)
Charisma (Performance)

Lightning
Acid

Gold
Green

Wisdom (Insight)
Charisma (Deception)

Fire
Poison

Red
Silver

Charisma (Intimidation)
Intelligence (History)

Fire
Cold

White

Wisdom (Survival)

Cold

Dragon Shot

Beginning at 1st level, when you take the Attack action on
your turn, you can expel a blast of energy from your mouth
as part of the same action. This is a ranged spell attack with
a range of 60 feet that ignores half cover and deals 1d4
damage of the type associated with your draconic influence.
You are proficient with this attack, and it uses your Wisdom
modifier for attack and damage rolls.

Form of the Dragon

Starting at 6th level, your draconic influence can manifest
itself as physical adaptations. As an action, you can expend
two power dice to manifest this power. For the next minute,
you gain the following benefits:

The Dragon Guard is a unique group of wardens who spend
their lives dedicated to the protection and cultivation of
draconic ideals and culture. In their eyes, dragons are a
physical manifestation of the same power that innately
courses through a warden, and they wield it to honor their
revered dragons.

Dragon Guard Spells

You learn an additional spell when you reach certain levels
as a warden, as shown in the Dragon Guard Spells table.
The spell counts as a warden spell for you, but it doesn’t
count against the number of warden spells you know.

Dragon Guard Spells
Warden Level

Spell

2nd

command

5th

levitate

9th

fear

13th

polymorph

12 The Warden Class

Draconic Warding

Starting at 10th level, your draconic influence has mottled
your skin, which takes on the hue of your influence
and becomes leather-like. Damage you take of the type
associated with your draconic influence is reduced by an
amount equal to your Wisdom modifier (a minimum of 1).

warmtail

Dragon Guard

• Your face morphs into the muzzle of a giant lizard,
granting you a bite attack. This is a natural weapon that
uses your power die as its damage die and deals piercing
damage. If you hit with this attack, you can use a bonus
action to attempt to grapple the target with your mouth.
As long as a creature remains grappled this way, you
can use a bonus action to deal piercing damage equal to
your power die.
• You sprout webbed, bat-like wings from your back,
granting you a flying speed of 10 feet. In addition, when
a creature that you can see makes a ranged attack against
you, you can use your reaction to buffet the air with
your wings, imposing disadvantage on the attack roll.
• When you use your Dragon Shot feature, roll your
power die and add the result to the damage dealt.

[Página 14]
Fury of Dragons

Warden Spell List
1st-level

3rd-level

2nd-level

4th-level

burning hands
color spray
create or destroy water
detect poison and disease
entangle
entomb*
sleep
thunderwave

acid rain*
armor of ice*
continual flame
heat metal
invisibility
levitate
locate animals or plants
sleeting slice*
spike growth
thunderous charge*

call lightning
create food and water
daylight
fireball
meld into stone
plant growth
sleet storm
speak with plants

control water
dominate beast
stone shape
toxin well*
wall of fire

5th-level

cloudkill
cone of cold
flame strike
lightning recoil*
wall of stone

Spells marked with a * appear in the following appendix

lars rune

At 14th level, your draconic influence has taken a deep hold
of you, granting you a significant portion of the power of
a dragon. You gain the feature below associated with your
chosen draconic influence.
Black Dragon. When dealing damage to a creature that is
surprised, your weapon damage die and any power dice you
expend on that attack deal maximum damage.
Blue Dragon. When attacking a creature that is 20 or
more feet above or below you, you deal extra damage equal
to your power die.
Brass Dragon. As a bonus action, you can expel a breath
of knockout gas. Each creature within a 15-foot cone
must succeed on a Constitution saving throw against your
warden spell save DC or become incapacitated until the
start of its next turn.
Bronze Dragon. As a bonus action, you can expel a
breath of repulsive gas. Each creature within a 15-foot cone
must succeed on a Constitution saving throw against your
warden spell save DC or be compelled to immediately move
up to half its movement away from you.
Copper Dragon. As a bonus action, you can expel a
breath of heavy gas. Each creature within a 15-foot cone
must succeed on a Constitution saving throw against your
warden spell save DC or be unable to take the Dash or
Disengage actions until the end of its next turn.
Gold Dragon. As a bonus action, you can expel a breath
of dry, hot air. Each creature within a 15-foot cone must
make a Constitution saving throw against your warden spell
save DC. On a failed saving throw, it only deals half damage
with weapon attacks that use Strength or Dexterity until the
end of its next turn.
Green Dragon. As an action, you can study the
movements and patterns of a single creature. You can
expend a power die and add the result to all attack rolls you
make against that creature until the end of your next turn.
Red Dragon. When dealing fire damage to a creature,
you can expend a power die and add twice the result
to the damage.
Silver Dragon. As a bonus action, you can expel a breath
of intoxicating gas. Each creature within a 15-foot cone
must succeed on a Constitution saving throw against your
warden spell save DC or become charmed by you until the
end of its next turn.
White Dragon. When dealing cold damage to a creature,
you can expend a power die and add twice the result
to the damage.

The Warden Class

13

[Página 15]
Acid Rain

2nd-level transmutation
Casting Time: 1 action
Range: 120 feet
Components: V, S, M (a vial of acid)
Duration: Concentration, up to 10 minutes
Classes: Bard, druid, warden, wizard
An acrid cloud appears in the shape of a cylinder that
is 10 feet tall with a 15-foot radius, centered on a point
you can see 100 feet directly above you. The spell fails
if you can’t see a point in the air where the cloud could
appear (for example, if you are in a room that can’t
accommodate the cloud).
When you cast the spell, it pours acidic rain on the area
beneath it. Each creature below the cloud must make a
Dexterity saving throw, taking 2d12 acid damage on a failed
save, or half as much damage on a successful one. On each
of your turns after you cast this spell, you can use an action
to expel acidic rain in this way again, and you can use a
bonus action to move the cloud up to 15 feet.
If you are outdoors in rainy conditions when you cast
this spell, the natural rain weakens the effect of the acid but
spreads it over a larger radius. The cloud has a radius of 30
feet, but the spell’s damage decreases by 1d12.
At Higher Levels. When you cast this spell using a spell
slot of 3rd or higher level, the damage increases by 1d12 for
each slot level above 2nd.

Armor of Ice

2nd-level abjuration
Casting Time: 1 action
Range: Self
Components: V, S
Duration: 10 minutes
Classes: Druid, sorcerer, warden
Your body becomes encased in a thick layer of ice, with
fractal protrusions that extend outwards and end in sharp
spikes. Until the spell ends, your AC can’t be less than 15,
regardless of what kind of armor you are wearing, and your
speed is reduced by 10 feet. Whenever a creature within 5
feet of you hits you with a melee attack, it takes 1d4 piercing
and 1d4 cold damage.
You can end this spell early as a bonus action.

Braise

Evocation cantrip
Casting Time: 1 action
Range: 5 feet
Components: V, S
Duration: Instantaneous
Classes: Sorcerer, warden, wizard
A spark ignites as you snap your fingers, turning your
empty fist into a blaze of flame. Make a melee spell attack
against a creature within range. If the attack hits, the
creature takes 1d8 fire damage. If the target is wearing metal
armor, it instead takes 1d12 fire damage.
The spell’s damage increases by one die when you reach
5th level (2d8 or 2d12), 11th level (3d8 or 3d12), and 17th
level (4d8 or 4d12).

Douse

Transmutation cantrip
Casting Time: 1 action
Range: 30 feet
Components: V, S
Duration: Instantaneous
Classes: Druid, sorcerer, warden, wizard
A spout of water erupts from your outstretched hand,
dousing a creature you can see within range in water. Make
a ranged spell attack. On hit, the target takes 1d10 cold
damage. If you are outdoors in stormy conditions when
you cast this spell, the spell acts as a grounding rod for the
storm, dealing 1d4 extra lightning damage.
The spell’s damage increases by one die when you reach
5th level (2d10 and 2d4), 11th level (3d10 and 3d4), and
17th level (4d10 and 4d4).

Downdrop

2nd-level transmutation
Casting Time: 1 reaction, which you take when a flying
creature moves within the spell’s range.
Range: 30 feet
Components: V, S, M (a small ball of lead)
Duration: Concentration, up to 1 minute
Classes: Bard, druid, sorcerer, warden (Fanatic), wizard
You whisper a command word into a ball of lead and it
launches itself toward a flying foe. The flying creature must
make a Dexterity saving throw. On a failed save, the lead
embeds itself in the creature’s body, forcing it to the ground
and reducing its flying speed to 0 for the duration.

patrick langwallner

Appendix - Spells

[Página 16]
Dripping Fangs

1st-level transmutation
Casting Time: 1 action
Range: Touch
Components: V
Duration: Instantaneous
Classes: Druid, sorcerer, warden
You unleash a bestial roar as your mouth sprouts fangs
dripping in corrosive saliva. Make a melee spell attack
against a creature you can reach. On a hit, the target takes
4d6 acid damage. If the target is restrained or grappled, it
takes an extra 2d6 damage.
At Higher Levels. When you cast this spell using a spell
slot of 2nd or higher level, the damage increases by 2d6 for
each slot level above 1st.

Entomb

1st-level evocation
Casting Time: 1 action
Range: 60 feet
Components: V, S, M (an ounce of water or ice)
Duration: Concentration, up to 1 minute
Classes: Bard, druid, sorcerer, warden (Sage)
You place the water to your lips and blow gently toward
a creature within range. The target must succeed on a
Strength saving throw or gain one level of entombment. The
table below describes the effect at each level.
Level
1

Effect
Speed halved

2
3+

Speed reduced to 0
Incapacitated

While you maintain concentration on this spell, you can
use an action to attempt to deepen the freeze. Each time
you do, the target must succeed on another Strength saving
throw or gain one level of entombment.
When a creature takes damage while incapacitated by
this spell, the ice around them shatters, dealing an extra 6d6
cold damage to the creature and reducing its entombment
level to 0, ending the spell immediately.
As an action on the creature’s turn, it can attempt to
shake free of the effect by making a Strength saving throw.
On a successful save, it loses a level of entombment. If
the creature ever has no levels of entombment, the spell
immediately ends.

Fling

Enchantment cantrip
Casting Time: 1 action
Range: 60 feet
Components: V, S, M (a piece of rock)
Duration: Instantaneous
Classes: Bard, druid, sorcerer, warden, wizard
You enchant a small piece of rock and fling it at a creature
you can see within range. Make a ranged spell attack against
the target. On a hit, the target takes 1d6 bludgeoning

damage. In addition, this infuriating act causes the creature
to become enraged by you until the start of your next turn;
a creature that is immune to charm ignores this effect.
The target’s first attack roll against you while enraged has
advantage. If this enraged attack misses, you can use your
reaction to make an opportunity attack against the creature.
This spell’s damage increases by 1d6 when you reach 5th
level (2d6), 11th level (3d6), and 17th level (4d6).

Freezing Rain

Conjuration cantrip
Casting Time: 1 action
Range: 30 feet
Components: V, S
Duration: Instantaneous
Classes: Druid, sorcerer, warden
A dark cloud forms above a creature you can see within
range, dousing them with ice cold rain. The target must
make a Constitution saving throw. On a failed save, the
target takes 1d6 cold damage and can’t use a bonus action
until the end of its next turn.
This spell’s damage increases by 1d6 when you reach 5th
level (2d6), 11th level (3d6), and 17th level (4d6).

Fumigate

Conjuration cantrip
Casting Time: 1 action
Range: 30 feet
Components: V, S
Duration: Concentration, up to 1 minute
Classes: Druid, sorcerer, warden, warlock, wizard
A cloud of noxious gas forms in a 5-foot-radius sphere
centered on a point of your choice within range. Any
creature that starts its turn within this gas must make a
Constitution saving throw, taking 1d10 poison damage
on a failed save. A creature that both starts and ends a
turn within the area of the gas must make a Constitution
saving throw or become poisoned for 1 minute. A creature
poisoned this way can repeat the saving throw at the end of
each of its turns, ending the effect early on a successful one.
On each of your following turns, you can use a bonus
action to move this cloud 5 feet. The distance you can move
the cloud increases by 5 feet when you reach 5th level (10
feet), 11th level (15 feet), and 17th level (20 feet).

Glacial Slide

Transmutation cantrip
Casting Time: 1 action
Range: 30 feet
Components: V, S
Duration: Instantaneous
Classes: Druid, warden
A wave of cold air washes over a point on the ground that
you can see within range, creating slick ice. Every creature
within 5 feet of this point must succeed on a Dexterity
saving throw or be knocked prone.

The Warden Class

15

[Página 17]
Manifest Elements
3rd-level evocation

Casting Time: 1 action
Range: Self
Components: V, S
Duration: Concentration, up to 1 hour
Classes: Ranger, sorcerer, warden (Guardian)

2nd-level conjuration
Casting Time: 1 action
Range: 30 feet
Components: V, S
Duration: Concentration, up to 1 minute
Classes: Druid, ranger, sorcerer, warden (Guardian)
A point on the ground within range becomes enchanted
with conjuration magic, and subtly shifts and swirls. If a
creature moves within 5 feet of this point, you can use your
reaction to cause the ground to reach up and pull them
into it. The target must make a Strength saving throw, and
makes this save with disadvantage if it was directly on
top of the point the spell originated. On a failed save, the
creature is restrained and takes 2d8 bludgeoning damage.
At the start of each of its turns, the creature can make
another Strength saving throw to break free of the earth’s
grasp, ending the spell early on a success.
On your turn, you can use an action to pull a
restrained creature further in. The target takes another 2d8
bludgeoning damage.

Lightning Recoil
5th-level evocation

Casting Time: 1 action
Range: Self
Components: V, S
Duration: Concentration, up to 1 minute
Classes: Druid, sorcerer, warden, wizard
A cloud forms above you, striking you with harmless
lightning that builds up a charge within your body. Each
creature who starts its turn within 5 feet of you, or moves
to within 5 feet of you for the first time on its turn, must
make a Constitution saving throw. On a failed save, it takes
5d10 lightning damage and is stunned until the end of its
turn. On a successful save, it becomes immune to this effect
for 1 minute.

16 The Warden Class

Nature’s Brand
1st-level evocation

Casting Time: 1 bonus action
Range: Self
Components: V
Duration: Concentration, up to 1 minute
Classes: Warden (Guardian)
You coat your weapon in magical light. The next time you
hit a creature with a weapon attack during the duration,
the attack deals an extra 1d6 acid, cold, fire, lightning,
or thunder damage (your choice) and the target must
make a Wisdom saving throw. On a failed save, the target
is branded by that energy. For the duration, whenever
the branded creature takes damage of that type, it takes
1d6 extra damage and can make an additional Wisdom
saving throw, ending the spell on a success. If the target or
a creature within 5 feet of it uses its action to rub off the
brand, the spell ends early.
At Higher Levels. When you cast this spell using a spell
slot of 2nd level or higher, the initial extra damage dealt by
the attack increases by 1d6 for each slot level above 1st.

Pete Linforth

Grasping Earth

You begin to radiate the power of the elements. Choose one
damage type: acid, cold, fire, lightning, or thunder. For the
duration, the first weapon attack you make on each turn
deals an extra 1d8 of that damage type. In addition, if you
score a critical hit, you apply one of the following effects
depending on the damage type chosen.
Acid. One piece of nonmagical metal equipment that the
target is wearing or wielding immediately corrodes and falls
apart, rendering it useless.
Cold. The target becomes frozen to the core, and is
incapacitated until the end of its next turn.
Fire. A blast of heat erupts from the target, dealing 2d8
fire damage to up to two other creatures of your choice
within 10 feet of it.
Lightning. Choose one creature wearing metal within 20
feet of the target. The lightning arcs to them, causing this
creature to take lightning damage equal to the lightning
damage dealt to the original target.
Thunder. As your attack hits, a powerful sonic boom
erupts from the target that can be heard by any creature
within 300 feet. The target and all creatures within 10 feet of
it (excluding you) are knocked prone.

[Página 18]
Reflect Elements

Sleeting Slice

Casting Time: 1 reaction, which you take when you take
acid, cold, fire, lightning, or thunder damage.
Range: Special
Components: V, S
Duration: Instantaneous
Classes: Sorcerer, warden (Fanatic), wizard

Casting Time: 1 action
Range: Self
Components: V, S
Duration: Concentration, up to 1 minute
Classes: Druid, ranger, sorcerer, warden

1st-level abjuration

As your body absorbs the damage from the attack, you
metabolize the energy and sling it back at your attacker.
Make a ranged spell attack against the target. On a hit, it
takes damage equal to the triggering damage plus an extra
1d8 of the same type.
At Higher Levels. When you cast this spell using a spell
slot of 2nd level or higher, the extra damage dealt by the
attack increases by 1d8 for each slot level above 1st.

Sculpt Earth

Transmutation cantrip

Bob Greyvenstein

Casting Time: 1 action or a reaction (which you take
in response to a ranged attack you can see being
made against you)
Range: 30 feet
Components: S
Duration: 1 hour or instantaneous (see below)
Classes: Druid, warden
You can shift and shape loose dirt and rocks within range
to create an inanimate object on the ground no larger
than a 5-foot cube. This object can be any shape or design.
Any attack made against it automatically hits, causing it
to fall apart.
If you cast this spell as a reaction, the object is hastily
sculpted, and provides half cover against the triggering
attack. Whether the attack hits or misses, the object
crumbles immediately after.

2nd-level conjuration

You extract water from the air, forming a blade of snow and
ice frozen to your hand. When you cast this spell, and then
as an action on each of your turns until the spell ends, you
can use this weapon to make a melee spell attack against
a creature within 5 feet. On a hit, the blade shatters, your
concentration ends, and the target takes 1d6 slashing and
2d6 cold damage. In addition, each creature within 5 feet
of the target (excluding you) must succeed on a Dexterity
saving throw or take 1d6 piercing and 2d6 cold damage.
At Higher Levels. When you cast this spell using a spell
slot of 2nd level or higher, the cold damage dealt by the
initial attack and by the shards increases by 1d6 each.

Stonefist

Evocation cantrip
Casting Time: 1 action
Range: 5 feet
Components: V, S
Duration: Instantaneous
Classes: Druid, warden
Debris from the air gathers around your empty fist, forming
a stone block. Make a melee spell attack against a creature
within range. On a hit, the target takes 1d8 bludgeoning
damage, and if the target is your size or smaller, you push it
up to 10 feet away from you.
This spell’s damage increases by 1d8 when you reach 5th
level (2d8), 11th level (3d8), and 17th level (4d8).

Storm Orb

Conjuration cantrip
Casting Time: 1 action
Range: Self
Components: V, S
Duration: Concentration, up to 1 minute
Classes: Druid, sorcerer, warden, warlock, wizard
An ominous storm cloud materializes above your head.
The first time a creature deals damage to you with a melee
attack, you can use your reaction to deal 1d8 lightning
damage to that creature, and the spell ends.
This spell’s damage increases by 1d8 when you reach 5th
level (2d8), 11th level (3d8), and 17th level (4d8).
