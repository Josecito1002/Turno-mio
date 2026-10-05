# Encargo: Lote 35 (Warlord) de la app "Mi turno"

"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el formato de
abajo, lo que se pide, usando **solo el texto en inglés que viene al final**: material de la comunidad (LaserLlama (reglas 2014)), no oficial de
Wizards. Esta es la parte 1 de 1 de este material. Otra persona revisa y aplica tu respuesta con un script, así que el formato tiene que
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
JSON `{ "clave": "Warlord (LaserLlama)" }` para la clase y cada subclase.
=== D ===
JSON `{ "clave": "1 o 2 frases que presenten la clase o subclase" }`.
=== E ===
Dudas, cortes de texto o [NO CONFIRMADO].

## Texto fuente (Warlord (LaserLlama))

[Página 1]
The Warlord

[Página 2]
The Warlord

As the aging man
struggled to keep up
with his companions,
he started to regret his decision to
join the young adventurers. His days
of glory had long passed, but hearing
the poorly devised plan of the aspiring
heroes had rekindled something inside
his soul that he thought gone forever. The
old man couldn't use a sword like he used
to, but if his young companions took his
advice, they may yet be able to survive the
dangerous life an adventure for a few days.
The dwarven lord ordered his soldiers to
form ranks as the uncountable horde of horrors
poured forth from the tunnel ahead. He positioned
his platoon of elite warriors in the final tunnel before
the entrance of his clan's great city. His clan had delved
too greedily and they had freed something from the depths
below. The lord muttered a final prayer and prepared to lead
his men to their deaths, hopefully giving the rest of his clan
time to escape the unstoppable horde of monstrosities.
A lithe wood elf quietly led her hunting party through the
underbrush of the great wood. They had tracked their foe, a
great two-headed troll, for almost two days. As it rested in a
clearing, she gave the signal and her fellow hunters fanned
out around the beast, blending in with the natural landscape.
On her mark, the hunting party lunged forward with their
spears, and the troll was felled before it could react.
All of these warriors are considered Warlords, martial
leaders who use their knowledge of tactics and warfare to
empower their allies and thwart the plans of their foes.

Decisive Leaders

While Warlords are as varied as styles of leadership, they all
share one thing in common: a commitment to their decisions.
Once a true Warlord decides on a course of action, whether it
was their idea or not, they will see the plan through to its end.
These natural-born leaders stand as stalwart figures in the
face of danger and can rally their allies to overcome whatever
obstacles may stand between them and their goals. Though
they are not always formally appointed leaders, the presence
of a Warlord, both on and off the field of battle, can motivate
any who follow them to be the best version of themselves.

From Many, One

Alone, a Warlord is a minor threat, but with loyal companions
to organize and command, the greatest Warlords are capable
of toppling empires. Known for their keen use of tactics and
knowledge of warfare, a Warlord is able to draw out the true
potential of their allies. Leaders to their core, a Warlord will
make sure to understand the capabilities and weaknesses of
their allies so they can help them to reach their true potential.
These exceptional strategists are able to step back and
allow their allies to excel in combat. Though they are able to
hold their own in battle, a warlord's true strength lies in the
potent orders they issue to their allies. These insights push
their comrades from mundane warriors to true heroes.

Creating Your Warlord

When creating your Warlord, consider where they learned to
be a leader. Did they serve as the squire of a world-renowned
general? Were they the star pupil of their kingdom's military
academy? Or, did they slowly rise through the bloody ranks of
a band of mercenaries, learning to lead through necessity?
Also, consider why your Warlord would lead others rather
than improve their own individual martial skill. Do they see
value in teamwork and coordination? Does their age or some
other impairment prevent them from fighting on their own?
Have they always had a sharp mind and a knack for leading
others, maybe even from a young age?
Multiclassing and the Warlord
If your group uses the optional multiclassing rule,
here is everything you need to know if you choose
to take at least one level in the Warlord class.
Ability Score Minimum. As a multiclass character,
you must have at minimum a 13 in either Strength
or Dexterity, and in either Intelligence, Wisdom, or
Charisma in order to take a level in Warlord, or to
take a level in another class if you're a Warlord.
Proficiencies. If Warlord isn't your initial class,
here are the proficiencies you gain when you take
your first level in Warlord: light and medium armor,
shields, simple weapons, and one gaming set.
Exploits. If you learn Exploits from more than one
of your class, subclass, or other features, follow the
rules and table linked below to determine the total
number and size of your Exploit Dice, and the total
number of Exploits Known from each feature that
grants you Exploits: Alternate Martial Multiclassing.

[Página 3]
The Warlord

Inspiring
Word

Exploits
Known

Exploit
Die

Exploit
Dice

Leadership Style, Inspiring Word

3

─

─

─

+2

Fighting Style, Tactical Exploits

3

2

d4

2

3rd

+2

Academy of War

3

3

d4

2

4th

+2

Ability Score Improvement

4

3

d4

2

5th

+3

Extra Attack

4

4

d6

3

6th

+3

Academy Feature

4

4

d6

3

7th

+3

Valiant Leader

4

5

d6

3

8th

+3

Ability Score Improvement

5

5

d6

3

9th

+4

Rallying Cry (1)

5

6

d6

3

10th

+4

Unwavering Will

5

6

d6

3

11th

+4

Tactical Superiority

5

7

d8

4

12th

+4

Ability Score Improvement

5

7

d8

4

13th

+5

Rallying Cry (2)

6

8

d8

4

14th

+5

Academy Feature

6

8

d8

4

15th

+5

Exalted Leader

6

9

d8

4

16th

+5

Ability Score Improvement

6

9

d8

4

17th

+6

Rallying Cry (3)

7

10

d10

5

18th

+6

Academy Feature

7

10

d10

5

19th

+6

Ability Score Improvement

7

10

d10

5

20th

+6

Dauntless

7

10

d10

5

Level

PB

Class Features

1st

+2

2nd

Class Features
Hit Points

Hit Dice: 1d8 per Warlord level
Hit Points at 1st Level: 8 + your Constitution modifier.
Hit Points at Higher Levels: 1d8 (or 5) + your Constitution
modifier per Warlord level after 1st
Proficiencies

Armor: Light armor, medium armor, shields
Weapons: Simple weapons, hand crossbows, longbows,
longswords, rapiers, scimitars, and shortswords
Tools: One gaming set of your choice
Saving Throws: Wisdom, Charisma
Skills: Choose two from Athletics, Deception, History,
Insight, Intimidation, Investigation, and Persuasion
Equipment

As a Warlord, you start with the following equipment.
(a) scale mail or (b) leather armor
(a) a simple weapon, (b) a longsword, or (c) a rapier
(a) light crossbow and 20 bolts or (b) five javelins
(a) a scholar’s pack or (b) an explorer’s pack
Quick Build

You can make a Warlord quickly by using these suggestions.
First, make Dexterity or Strength your highest ability score,
followed by Charisma, Wisdom, or Intelligence, depending on
your Leadership Style. Second, take the Noble background.

Leadership Style

At 1st level, you choose the Leadership Style of your Warlord,
gaining the corresponding benefits and Leadership modifier:
Captain

You lead from the front with presence. You use Charisma as
your Leadership modifier. You also gain proficiency in heavy
armor and your choice of either Intimidation or Persuasion.
Mentor

You counsel others with wise insights. You use Wisdom as
your Leadership modifier. Also, whenever a creature within
15 feet misses with an attack or fails an ability check you can
use your reaction to roll a d4 and add the result to its roll.
Strategist

You guide others with cunning and wit. You use Intelligence
as your Leadership modifier, and when you roll initiative you
can switch places in initiative order with a willing creature.

Inspiring Word

At 1st level, you use a bonus action to shout an inspiring word
at another creature that can hear you within 30 feet. It gains
temporary hit points equal to 1d4 + your Leadership modifier.
At certain levels, the die you roll for this feature increases
to match the Exploit Die column on the Warlord table above.
You can use this feature the number of times indicated in
the Inspiring Word column on the Warlord table. You regain
all expended uses when you finish a short or long rest.

[Página 4]
Protector

When a creature you can see attacks you, or a target within 5
feet, you can use your reaction to add your proficiency bonus
to the target's Armor Class against that attack. You must be
wielding a shield or a melee weapon to gain this benefit.
Standard Bearer

When a creature within 5 feet attacks another creature you
can see, you can use a reaction to grant it advantage on its
attack roll. You must be holding a standard or banner in
your hand (and nothing else) to use this reaction.

v

Strongbow

You can use your Strength modifier, in place of
your Dexterity, for attack and damage rolls with
longbows and shortbows. Whenever you do, you
gain a +1 to damage rolls with those weapons.
Versatile Fighting

While wielding a single versatile weapon and no
shield, you gain a +1 bonus to your attack rolls
with that weapon. While doing so, you can also
use your bonus action to make a single grapple
or shove attack, or take the Use an Object action.

Tactical Exploits

Your knowledge of warfare allows you to employ
potent strategies in battle. At 2nd level, you learn
to use Tactical Exploits as detailed below:
Exploit Dice

Fighting Style

At 2nd level, you adopt a Fighting Style that best reflects your
training. You cannot select a Fighting Style more than once,
even if a feature allows you to select another Fighting Style.
Whenever you gain a level in this class, you can switch your
Fighting Style for another Fighting Style of your choice.
Archery

You gain a +2 bonus to attack rolls with ranged weapons.
Classical Swordplay

While wielding a finesse weapon and no other weapons, you
gain a +2 bonus to attack rolls with finesse weapons and a +1
to your Armor Class so long as you are not using a shield.
Defensive Fighting

So long as you are either wearing armor or wielding a shield,
you gain a +1 bonus to your Armor Class.
Dueling

When you are wielding a melee weapon in one hand and no
other weapons, you gain a +2 bonus to damage rolls with it.
Mounted Warrior

While you are riding a controlled mount, both you and your
mount gain a +1 bonus to your Armor Class, and you can use
a bonus action on each of your turns to command your mount
to make one attack or take one action from its stat block.

The Warlord table shows the number of Exploit Dice
you have to perform any Tactical Exploits you know.
Some Exploits require you to expend these Exploit
Dice in order to use them. You can only use one Exploit
per attack, ability check, or saving throw. You regain all
expended Exploit Dice when you finish a short or long rest.
Your Exploit Dice begin as d4s and increase in size as
you gain Warlord levels, as indicated in the Warlord table.
Exploits Known

You know two Tactical Exploits of your choice from the list at
the end of this class description. The Exploits Known column
of the Warlord table shows when you learn more Exploits. To
learn an Exploit you must meet any prerequisites it may have,
like a minimum Ability Score or a certain Warlord level.
Whenever you gain a Warlord level, you can replace one of
the Exploits you know with a Tactical Exploit of your choice.
Saving Throws

If one of your Tactical Exploits requires a creature to make a
saving throw, your Exploit save DC is calculated as follows:
Exploit save DC = 8 + your proficiency bonus
+ your Leadership modifier

Academy of War

At 3rd level, choose the Academy of War that best represents
your Warlord: the Academy of Chivalry, Ferocity, Schemes,
Skalds, or Tactics, each detailed at the end of this class.
Your Academy of War grants you features at 3rd level, and
again when you reach 6th, 14th, and 18th level in this class.

[Página 5]
Academy Exploits

Some Academies of War include a list of Exploits that all
Warlords in the Academy learn at the levels in its description.
These Exploits don't count against your total Exploits Known
and can't be replaced when you gain a level. If you do
not meet its prerequisites, you learn them regardless.

Ability Score Improvement

When you reach 4th level, and again at 8th, 12th, 16th,
and 19th level, you can increase one ability score of
your choice by 2, or any two ability scores of your
choice by 1. As normal, you can't increase one of
your ability scores above 20 using this feature.

Extra Attack

Starting at 5th level, when you take the Attack
action, you can attack twice instead of once.

Valiant Leader

You have honed your Leadership Style with
practice and study. Starting at 7th level, your
Leadership Style grants you further benefits:
Captain

Creatures that have temporary hit points from Inspiring
Word or Tactical Exploits have advantage on saving throws
to resist both the charmed and frightened conditions.
Mentor

When you use your Mentor reaction its range is 30 feet.
Also, the bonus increases to match one roll of the die in
the Exploit Die column for your level on the Warlord table.
Strategist

Creatures that have temporary hit points from your Inspiring
Word or your Tactical Exploits have advantage on initiative
rolls, so long as they are not surprised or incapacitated.

Rallying Cry

You can encourage allies to find success when they otherwise
would fail. Beginning at 9th level, when another creature that
can see or hear you within 30 feet fails a saving throw, you
can use your reaction to encourage it with a rallying cry. The
creature immediately re-rolls its saving throw and adds your
Leadership modifier (minimum of +1) to its result.
Once you use this feature you must finish a short or long
rest before you can use it again. You gain an additional use of
this feature when you reach 13th and 17th level in this class.

Unwavering Will

As a leader, you do not have the luxury of succumbing to your
base instincts. Beginning at 10th level, you have advantage on
saving throws to resist being charmed, frightened, or stunned.

Tactical Superiority

Your leadership skills eclipse even those of other professional
commanders. Starting at 11th level, when you roll in initiative
you regain one use of both Inspiring Word and Rallying Cry.
Also, the range of your Inspiring Word, Rallying Cry, and
any Tactical Exploits that you know are doubled.

Exalted Leader

You are a true master of your Leadership Style. At 15th level,
your Leadership Style grants you the benefits listed below:
Captain

You can target creatures that are at 0 hit points, but not dead,
with Inspiring Word, and they regain hit points in place of the
temporary hit points normally granted by Inspiring Word.
Mentor

When you use Inspiring Word on a creature you end one of
the following conditions currently affecting it (your choice):
blinded, charmed, deafened, frightened, poisoned, or stunned.
Strategist

When you use Inspiring Word on a creature it can move up
to its walking speed without provoking opportunity attacks.

Dauntless

You rival the great commanders and conquerors of legend. At
20th level, you can use your Inspiring Word and Rallying Cry
an unlimited number of times. Moreover, whenever you use
Inspiring Word you treat it as the maximum possible roll.

[Página 6]
Academy of War

Lead the Charge

Choose the Academy of War that best represents the tactical
training, philosophy, and leadership style of your Warlord: the
Academies of Chivalry, Ferocity, Schemes, Skalds, or Tactics.

6th-level Academy of Chivalry feature
You lead best from the front lines. When you take the Attack
action on your turn and make at least one melee attack, you
can issue an attack order as a bonus action on that turn.

Academy of Chivalry

Flames of Hope

Warlords that choose the Academy of Chivalry often hail from
the ranks of nobility and are almost always formal knights. As
leaders, they hold themselves and those who follow them to a
lofty code of conduct. These knights stand as beacons of fair
play, honor, and justice, both on and off the field of battle.
Anointed Knight

3rd-level Academy of Chivalry feature
You have been trained in the classical skills of knighthood.
You gain proficiency with all martial weapons, one musical
instrument, and in either History, Performance, or Religion.
Chivalric Exploits

3rd-level Academy of Chivalry feature
You learn certain Exploits at the Warlord levels noted in the
table below. They don't count against your total number of
Exploits Known and can't be switched upon gaining a level.
Warlord Level Exploit
3rd

attack order, commanding presence

5th

hold the line, rejuvenating order

9th

daring rescue

Inspiring Presence

3rd-level Academy of Chivalry feature
Your successes motivate allies to succeed in turn. When you
succeed on a saving throw, you can use your reaction to rally
another creature subjected to the same effect that can see or
hear you, and it automatically succeeds on its saving throw.
You can rally additional creatures
as part of this reaction by expending
one use of Inspiring Word for each
additional creature beyond the first.

14th-level Academy of Chivalry feature
As an action, you can let forth a cry that inflames the hearts
of allies and inspires terror in your foes. Creatures that can
hear you within 30 feet gain one of the following effects:
Friendly creatures gain temporary hit points equal to
one roll of your Exploit Die + your Leadership modifier,
and while they last the creature cannot be frightened.
Enemy creatures must succeed on a Wisdom saving
throw against your Exploit Save DC or be frightened of
you for 1 minute. Frightened creatures can repeat this
saving throw at the end of each of their turns and each
time they take damage, ending the effect on a success.
Once you use this feature you must complete a short or
long rest before you can use it again.
Paragon of Chivalry

18th-level Academy of Chivalry feature
You stand as an exemplar of chivalric virtue, a shining beacon
for those who follow you. You are immune to the frightened
and charmed conditions, and creatures of your choice within
30 feet that can see you have advantage on saving throws to
resist and end the charmed and frightened conditions.

Academy of Ferocity

The Warlords that hail from this Academy rarely study in
formal schools of war. In place of military theory,
their tactics are based on the instincts of wild
animals. These leaders are famous for
ruthless treatment of foes, but
would lay down their
life for any member
of their pack.

[Página 7]
Bestial Instincts

3rd-level Academy of Ferocity feature
You learn to track and hunt as well as the great predators of
the wilds. You gain proficiency with martial weapons and in
your choice of either Perception or Survival.
In addition, whenever you make a Wisdom (Survival) or a
Wisdom (Perception) check based on your sense of smell or
hearing, you can treat a roll of 7 or lower on the d20 as an 8.
Ferocious Exploits

3rd-level Academy of Ferocity feature
You learn certain Exploits at the Warlord levels noted in the
table below. They don't count against your total number of
Exploits Known and can't be switched upon gaining a level.

Thrill of the Hunt

14th-level Academy of Ferocity feature
A successful hunt stokes your blood lust. When your Prey is
reduced to 0 hit points you can use your reaction to mark
another creature, and you gain one of the following benefits:
You gain temporary hit points equal to your Warlord level.
You regain one expended use of Inspiring Word.
You regain one expended Exploit Die.
Apex Predator

3rd

cunning instinct, maneuvering order

5th

crescendo of violence, wild charge

18th-level Academy of Ferocity feature
Your primal bearing invigorates your pack mates. Your speed
increases by 10 feet, and your weapon attacks against your
Prey deal bonus damage equal to a roll of your Exploit Die.
Moreover, any creature you target with an Inspiring Word,
Rallying Cry, or one of your Tactical Exploits also gains the
benefits above until the beginning of your next turn.

9th

pack tactics

Academy of Schemes

Warlord Level Exploit

Packleader

3rd-level Academy of Ferocity feature
You lead your allies in the hunt. As a bonus action, you can
mark one creature you can see within 30 feet as your Prey.
Any creature you target with an Inspiring Word or a Tactical
Exploit has advantage on the first attack it makes against
your Prey before the beginning of your next turn.
The mark ends early if your Prey is reduced to 0 hit points,
if you mark another creature, or if you are incapacitated.
Once you mark a creature as Prey, you must finish a short
or long rest before you can mark another. If you have no uses
left, you can expend an Exploit Die to mark another creature.
Primal Ambush

6th-level Academy of Ferocity feature
Your pack hunts as one. You and creatures of your choice
within 30 feet have advantage on Dexterity (Stealth) checks
and can travel stealthily while moving at a normal pace.
Also, while you have a creature marked as your Prey, you
can issue a maneuvering order as a bonus action. However,
the target must end this movement closer to your Prey.

Warlords of the Academy of Schemes will secure their victory
at any cost. They do not care how they achieve their goals and
they will cheat, deceive, and sacrifice whatever they believe is
necessary to succeed. These ruthless utilitarians always have
a backup plan should things not work out as they predicted.
Cheap Shot

3rd-level Academy of Schemes feature
You are not above dishonorable tricks to secure your victory.
Once per turn when you hit a creature with a weapon attack,
you can force it to make a Dexterity saving throw against your
Exploit Save DC in addition to the damage of your attack.
On a failure, the creature's speed is halved and it can't take
reactions until the start of your next turn, and on its next turn
it can only take one action or one bonus action, but not both.
Dastardly Talents

3rd-level Academy of Schemes feature
You will use any method necessary to achieve your aims. You
gain proficiency in Deception, Disguise Kits, and Poisoner's
Kits. You can make Leadership Ability (Deception) checks in
place of the normal Charisma (Deception) check.

[Página 8]
Scheming Exploits

3rd-level Academy of Schemes feature
You learn certain Exploits at the Warlord levels noted in
the table below. They do not count against your number of
Exploits Known and can't be switched upon gaining a level.
Warlord Level Exploit
3rd

insightful order, subtle con

5th

exposing strike, surprise attack

9th

perilous gambit

Ruthless Focus

6th-level Academy of Schemes feature
You encourage allies to prey upon the weak. Any creature
you target with an Inspiring Word or a Tactical Exploit
can add your Leadership modifier to the first attack it
makes against a creature suffering from the effects
of Cheap Shot before the start of your next turn.
Also, whenever you use a Tactical Exploit as part of
your action, you can take the Disengage or Hide action
as a bonus action on that turn.
Devious Tactics

14th-level Academy of Schemes feature
You have no qualms about leaving others in danger. When
a creature you can see targets you with an attack, you can
use your reaction to force another creature within 5 feet to
make a Dexterity saving throw against your Exploit Save
DC. On a failed save, you switch places with the creature
and it becomes the target of the attack that triggered the
reaction. A creature can willingly fail this saving throw.
Inscrutable Mind

18th-level Academy of Schemes feature
Your thoughts and dreams cannot be read by magical
means, unless you allow it. If a creature attempts to read
your mind you can present false thoughts and motivations
by making a Leadership Ability (Deception) check.
Marked for Death

18th-level Academy of Schemes feature
You relentlessly pursue the destruction of your foes. When a
creature fails its saving throw against Cheap Shot, you can
choose to mark the creature for death. The first attack to hit
that creature before the beginning of your next turn becomes
an automatic critical hit.
Once you mark a creature for death you must complete a
short or long rest before you can use this feature again.
Scheming Adventurers
When playing a character with questionable morals
and motivations, like a Warlord of the Academy of
Schemes, it is important to remember that D&D is
a team game where cooperation is expected.
Masters of schemes leverage any advantages at
their disposal, including the abilities of their allies.
Make sure to include the other players in any plans
your Schemes Warlord may have. Remember that a
Warlord is nothing without allies to command!

Academy of Skalds

Warlords of the Academy of Skalds wield the power of music
and song to inspire their comrades. When they combine their
bardic magic with their understanding of strategy, they can
turn even an unskilled rabble into a heroic fighting force.
Skaldic Exploits

3rd-level Academy of Skalds feature
You learn certain Exploits at the Warlord levels noted in the
table below. They don't count against your total number of
Exploits Known and can't be switched upon gaining a level.
Warlord Level Exploit
3rd

commanding presence, attack order

5th

enlivening order, heroic will

9th

stand the fallen

Warrior Poet

3rd-level Academy of Skalds feature
You combine martial skill and musical talent to inspire your
allies. You gain proficiency in martial weapons, two musical
instruments of your choice, and in Performance.
You also have advantage on any Charisma (Performance)
checks you make that incorporate a martial weapon.

[Página 9]
Gallant Charge

6th-level Academy of Skalds feature
When you roll initiative, you can expend a use of
Inspiring Word to rally a heroic charge. You, and
any creatures of your choice within 15 feet that can
hear you gain a bonus to your initiative rolls equal to
one roll of your Exploit Die. You cannot use this feature
if you are surprised or incapacitated when rolling initiative.
Songs of War & Peace

6th-level Academy of Skalds feature
Your music can soothe and inspire. Creatures that spend a
short rest with you have advantage on their Hit Die rolls.
In addition, when you use your action to cast a Bard spell,
you can use a bonus action to issue an enlivening order.
Warsong

14th-level Academy of Skalds feature
You inspire your comrades to stand and fight against all odds.
When you target a friendly creature with an Inspiring Word, a
Rallying Cry, or Tactical Exploit, it has advantage on the first
saving throw it makes before the start of your next turn.
Skald of Legend

Spellcasting

3rd-level Academy of Skalds feature
Your talent in poetry and music allows you to produce spells,
much like the Bard does. You gain the following benefits:
Spell Slots. The Skald Spellcasting table shows how
many spell slots you have to cast your spells of 1st-level and
higher. To cast one of these spells, you must expend a slot of
the spell's level or higher. You regain all expended spell slots
when you finish a long rest. For example, if you know the
thunderwave spell and have both a 1st and a 2nd-level spell
slot, you can cast thunderwave using either spell slot.
Spells Known of 1st-Level and Higher. You know three
1st-level spells of your choice from the Bard spell list. The
Spells Known column of the Skald Spellcasting table shows
when you learn more Bard spells of your choice of 1st-level
or higher. Any Bard spell you learn through this feature must
be of a level for which you have spell slots.
When you gain a level, you can replace one of your Spells
Known with another spell from the Bard Spell List. The spell
must also be of a level for which you have spell slots.
Spellcasting Focus. You can use any musical instrument
you are proficient with as a spellcasting focus for your Bard
spells. Skalds are known for using one-handed instruments,
like war horns, while holding a weapon in their other hand.
Spellcasting Ability. You use your Leadership modifier
when setting the saving throw DC or making a spell attack
roll for any Bard spells you know through this feature.
Spell save DC = 8 + your proficiency bonus
+ your Leadership modifier
Spell attack modifier = your proficiency bonus
+ your Leadership modifier

18th-level Academy of Skalds feature
The Skalds of legend were said to be able to turn the tide of
the most desperate battles, fanning the flames of hope in all
who heard their Warsong. When you use a Tactical Exploit
you can grant one target temporary hit points equal to your
Leadership modifier (minimum of 1 temporary hit point).
Also, when you take the Attack action on your turn, you can
cast a Bard spell in place of one of your weapon attacks.
Skald Spellcasting
Warlord
Level

Spells
Known

1st
Level

2nd
Level

3rd
Level

4th
Level

3rd

3

2

—

—

—

4th

4

3

—

—

—

5th

4

3

─

—

—

6th

4

3

─

—

—

7th

5

4

2

—

—

8th

6

4

2

—

—

9th

6

4

2

—

—

10th

7

4

3

—

—

11th

8

4

3

—

—

12th

8

4

3

—

—

13th

9

4

3

2

—

14th

10

4

3

2

—

15th

10

4

3

2

—

16th

11

4

3

3

—

17th

11

4

3

3

—

18th

11

4

3

3

—

19th

12

4

3

3

1

20th

13

4

3

3

1

[Página 10]
Academy of Tactics

Warlords of this Academy most often come from the ranks of
formal organizations that serve the elite. Tacticians are highly
educated commanders and are known for their dedication to
those who follow them. Their understanding of how to best
utilize each of their allies' strengths and avoid weaknesses
makes them especially deadly opponents on the battlefield.
Advanced Tactics

3rd-level Academy of Tactics feature
Your ability to learn and execute strategies in combat exceeds
that of most commanders and even other trained Warlords.
You gain the following benefits to your Warlord features:
Exploits. You learn two 1st-degree Tactical Exploits of your
choice from the list at the end of this class. These Exploits do
not count against your total number of Exploits Known.
You learn additional Tactical Exploits following the same
rules at certain levels: at 5th level you learn two 2nd-degree
Exploits, and at 9th level you learn one 3rd-degree Exploit.
Exploit Dice. Your total number of Exploit Dice increases
by 1, and all of your Exploit Dice increase to become d6s.
At certain Warlord levels your Exploit Dice increase again;
at 5th level (d8), at 11th level (d10), and at 17th level (d12).
The Art of War

3rd-level Academy of Tactics feature
You have studied the great histories of warfare and combat.
You gain proficiency in History and with two gaming sets of
your choice. Whenever you make an ability check with any of
these proficiencies you can double your proficiency bonus.
Strategic Adjustments

3rd-level Academy of Tactics feature
You are constantly adapting to meet any challenge.
When you complete a long rest, you can replace one
Tactical Exploit you currently know with a Tactical
Exploit of your choice of the same degree.
When you reach 6th level in this class, you can
do so whenever you finish a short or long rest.

Brains over Brawn

6th-level Academy of Tactics feature
You wield your comrades as other warriors wield weapons.
If you use a Tactical Exploit as your action, or use a Tactical
Exploit in place of each attack you can make, you can use a
bonus action on that turn to take the Disengage action, or to
use one Order Exploit (such as attack order) that you know.
Know Your Enemy

6th-level Academy of Tactics feature
You evaluate the potential of others at a glance. As an action,
choose a creature you can see within 60 feet. You learn if it is
your equal, superior, or inferior in one of the following areas:
Armor Class

Intelligence Score

Current Hit Points

Wisdom Score

Walking Speed

Charisma Score

Once you use this feature on a creature you cannot use it
to learn anything about it until you finish a short or long rest.
Gifted Strategist

14th-level Academy of Tactics feature
You cannot be surprised while you are conscious, and when
you roll initiative, you gain a special action that you can take
at the start of combat before any other creature has a chance
to act. This special action can only be used to use a Tactical
Exploit you know or to take the Ready action.
Master Tactician

18th-level Academy of Tactics feature
You have a plan in place for every eventuality. You learn the
contingency plan Exploit, but it doesn't count against
your total number of Exploits Known. At the end of
a long rest, you can use contingency plan without
expending an Exploit Die to put the plan in place.
You can only have a single contingency plan in
place at any
one time.

[Página 11]
Tactical Exploits

Below are the Tactical Exploits available to Warlords. If an
Exploit has a prerequisite, like a minimum Ability Score or
your level, you can learn it when you meet the prerequisites.

1st-Degree Exploits

Tactical Exploits of the 1st-degree represent minor strategies
and techniques that can be learned by a Warlord of any level.
Attack Order

When you take the Attack action, you can issue this Order in
place of an attack, targeting another that can see or hear you
within 30 feet. The next time that creature takes the Attack
action before the start of your next turn, it can make one
additional weapon attack as part of its Attack action.
Commanding Presence

Prerequisites: Charisma or Strength of 11
Whenever you make a Charisma (Persuasion) or Charisma
(Intimidation) check you can expend one Exploit Die, roll it,
and add the result to your ability check. You can do so after
you roll the d20, but before you know if you succeed.
Also, whenever you would make a Charisma (Intimidation)
check, you can make a Strength (Intimidation) check instead.
Cunning Instinct

Prerequisites: Wisdom of 11
Whenever you make a Wisdom (Perception) or a Wisdom
(Survival) check you can expend one Exploit Die, roll it, and
add the result to your ability check. You can do so after you
roll the d20, but before you know if you succeed or fail.
Defensive Order

When you take the Attack action, you can issue this Order in
place of an attack, targeting another creature that can see or
hear you within 30 feet. That creature gains the benefits of
the Dodge action until the beginning of its next turn.

Lightstep

Prerequisites: Dexterity of 11
Whenever you make a Dexterity (Acrobatics) or a Dexterity
(Stealth) check you can expend one Exploit Die, roll it, and
add the result to your ability check. You can do so after you
roll the d20, but before you know if you succeed or fail.
Maneuvering Order

When you take the Attack action, you can issue this Order in
place of an attack, targeting another creature that can see or
hear you within 30 feet. That creature can use its reaction to
move up to its speed without provoking opportunity attacks.
Menacing Shout

Prerequisites: Charisma of 11
As a bonus action, you can expend one Exploit Die and force
one creature within 30 feet that can see or hear you to make
a Wisdom saving throw. On a failed save, it is frightened of
you until the end of your next turn and must use its action to
move as far away from you as possible without harming itself.
Parry

Prerequisites: Dexterity of 11
When a creature that you can see targets you with a melee
attack, you can use your reaction to expend one Exploit Die,
roll it, and add it to your Armor Class against the attack. You
must be holding a melee weapon or shield to use this Exploit.
Starting at 5th level, if you use this Exploit and the attack
misses, you can make a single melee weapon attack against
the creature that attacked you as part of the same reaction.
Rustic Intuition

Prerequisites: Wisdom of 11
When you make an Intelligence (Nature), Wisdom (Animal
Handling), or Wisdom (Medicine) check you can expend an
Exploit Die, roll it, and add the result to your ability check.
You can do so after you roll, but before you know the result.
Scholarly Recall

As a bonus action, you can expend one Exploit Die to feint,
forcing a creature that can see you within 15 feet to make a
Wisdom saving throw. On a failed save, you have advantage
on your attacks against it until the end of your current turn.

Prerequisites: Intelligence of 11
Whenever you make an Intelligence (Arcana), Intelligence
(History), or Intelligence (Religion) check you can expend an
Exploit Die, roll it, and add the result to your ability check.
You can do so after you roll, but before you know the result.

Heroic Fortitude

Steadfast Order

Feint

Whenever you are forced to make a Strength, Dexterity, or a
Constitution saving throw you can expend an Exploit Die, roll
it, and add the result to your saving throw. You can do so after
you roll the d20, but before you know if you succeed or fail.
Inquisitive Eye

Prerequisites: Intelligence or Wisdom of 11
When you make an Intelligence (Investigation) or a Wisdom
(Insight) check you can expend one Exploit Die, roll it, and
add the result to your ability check. You can do so after you
roll the d20, but before you know if you succeed or fail.
Insightful Order

When you take the Attack action, you can issue this Order in
place of an attack, targeting another creature that can see or
hear you within 30 feet. The first attack roll it makes before
the beginning of your next turn is made with advantage.

When you take the Attack action, you can issue this Order in
place of an attack, targeting another creature that can see or
hear you within 30 feet. Until the start of your next turn, that
creature can add your Leadership modifier (minimum of +1)
to all Strength, Dexterity, or Constitution saving throws.
Subtle Con

Prerequisites: Dexterity or Charisma of 11
When you make a Dexterity (Sleight of Hand), a Charisma
(Deception), or a Charisma (Performance) check you can
expend an Exploit Die, roll it, and add it to your ability check.
You can do so after you roll, but before you know the result.
Support Order

When you take the Attack action, you can issue this Order in
place of one attack, targeting another creature that can see or
hear you within 30 feet. That creature can immediately take
the Help, Hide, Search, or Use an Object action.

[Página 12]
2nd-Degree Exploits

Exploits of this degree represent the peak of tactical skill that
is achievable without a dedicated education in the art of war.
They can be learned by any Warlord of 5th level and higher.
Crescendo of Violence

Prerequisite: 5th level
When another creature that can see or hear you within 30
feet scores a critical hit, you can use your reaction to expend
Exploit Dice (up to your proficiency bonus), roll those dice,
and grant that creature a number of temporary hit points
equal to the total you rolled + your Leadership modifier.
Temporary hit points from this Exploit last for 1 minute
and are instantly dispelled if the creature is incapacitated.
Enlivening Order

Prerequisite: 5th level
When you take the Attack action, you can issue this Order in
place of an attack, targeting another creature that can see or
hear you within 30 feet. Until the beginning of your next turn,
the creature's speed increases by a number of feet equal to 5
times your Leadership modifier (minimum of 5 feet), and its
long and high jump distances are doubled.

Hold the Line

Prerequisite: 5th level, Strength of 13
As a bonus action, you can expend an Exploit Die to set your
feet. You and creatures of your choice within 5 feet that are
not incapacitated can add your Leadership modifier to your
Armor Class and to all Strength or Dexterity saving throws.
These benefits do not stack with cover, and they instantly
end if you leave your space or if you are incapacitated.
Intimidating Command

Prerequisite: 5th level, Charisma of 13
As a bonus action, you can expend an Exploit Die to shout a
one-word command at one creature that can hear you within
30 feet. It must succeed on a Wisdom saving throw, or it is
compelled to obey your command to the best of its ability on
its next turn unless its actions would be directly harmful to it.
Rejuvenating Order

Prerequisites: 5th level
When you take the Attack action, you can issue this Order in
place of an attack, targeting another creature that can see or
hear you within 30 feet. That creature can instantly repeat a
saving throw to end one condition currently affecting it.

Exposing Strike

Resilient Order

Heroic Will

Surprise Attack

Prerequisites: 5th level
When you hit a creature with a weapon attack, you can
expend an Exploit Die to weaken it temporarily. The first
attack made against that creature before the beginning of
your next turn has advantage, and on hit, that attack deals
additional damage equal to one roll of your Exploit Die.
Prerequisite: 5th level
Whenever you are forced to make an Intelligence, Wisdom,
or Charisma saving throw you can expend an Exploit Die, roll
it, and add the result to your saving throw. You can do so after
you roll the d20, but before you know if you succeed or fail.

Prerequisite: 5th level
When you take the Attack action, you can issue this Order in
place of an attack, targeting another creature that can see or
hear you within 30 feet. Until the start of your next turn, that
creature adds your Leadership modifier (minimum of +1) to
all Intelligence, Wisdom, and Charisma saving throws.
Prerequisite: 5th level, Intelligence of 13
As an action, you can expend one Exploit Die to command
another creature that can see or hear you within 30 feet to
instantly make one weapon attack with advantage. On hit, it
deals bonus damage equal to one roll of your Exploit Die.

[Página 13]
Wild Charge

Prerequisite: 5th level
As an action, you can expend one Exploit Die and choose
another creature that can see or hear you within 30 feet. The
creature can instantly move up to its speed toward a hostile
creature and make one melee weapon attack against it.
On hit, it deals additional damage equal to one roll of your
Exploit Die, and if the target is equal to its size or smaller, it
must succeed on a Strength saving throw or fall prone.

3rd-Degree Exploits

Exploits of this degree are masterful strategies that can only
be learned by Warlords of 9th level or higher. Each Exploit of
3rd-degree can only be used once per short or long rest.
Daring Rescue

Prerequisite: 9th level
When a creature you can see within 30 feet is reduced to 0
hit points, you can use your reaction to expend one Exploit
Die and move up to twice your speed. However, you must
end this movement within 5 feet of the creature.
The creature instantly regains hit points equal to one
roll of your Exploit Die + your level. It also gains temporary
hit points equal to one roll of your Exploit Die for each
opportunity attack you provoked moving to the target.
Inspirational Speech

Prerequisites: 9th level, Charisma of 15
You can expend one Exploit Die and spend 1 minute giving
an inspirational speech to a number of creatures that can
hear you equal to 1 + your Charisma modifier. At the end of
which, targets gain temporary hit points equal to your level.
While the temporary hit points from this Exploit last, the
creatures have advantage on Wisdom saving throws.
Pack Tactics

Prerequisites: 9th level, Wisdom of 15
As a bonus action, you can expend one Exploit Die to signal
your allies to fight as a pack. Until the end of your next turn,
creatures of your choice that can see or hear you within 30
feet have advantage on attack rolls, so long as a conscious
allied creature is within 5 feet of their target.
You can use a bonus action on your next turn to extend the
Exploit's effects to the end of your turn after that, though you
do not need to expend an Exploit Die when you do so.
You cannot maintain this Exploit longer than 1 minute.
Perilous Gambit

Prerequisite: 9th level
As a bonus action, you can expend one Exploit Die to force a
creature within 30 feet to make a Wisdom saving throw. On a
failed save, it suffers the following effects for the next minute:
It has advantage on any attack roll it makes against you,
but it has disadvantage on all other attack rolls.
If it moves it must end its movement closer to you.
Any creature that you target with an Inspiring Word or a
Tactical Exploit has advantage on attack rolls against this
creature until the beginning of your next turn.
The creature can repeat this saving throw at the end of
each of its turns, ending the effect on a success. This effect
instantly ends if the creature cannot see or hear you.

Stand the Fallen

Prerequisites: 9th level
As an action on your turn, you can expend Exploit Dice (up
to your proficiency bonus) and let forth an inspiring shout.
A number of creatures equal to your Leadership modifier
(minimum of 1) that can hear you within 30 feet regain a
number of hit points equal to one roll of your Exploit Die
for each Die you spent + your Leadership modifier.
If you target a living creature with 0 hit points, it doesn't
need to hear you, but it does gain 1 level of exhaustion.
Tactical Reposition

Prerequisite: 9th level, Intelligence of 15
As an action, you can expend one Exploit Die and dictate a
strategic course of action to a number of creatures equal to
your Leadership modifier (minimum of 1) within 30 feet that
can see or hear you. Creatures can use their reaction to move
up to their speed without provoking opportunity attacks.
War Cry

Prerequisites: 9th level, Charisma of 15
As an action, you can expend one Exploit Die and let forth a
mighty cry, forcing creatures of your choice that can hear you
in an adjacent 30-foot cone to make a Wisdom saving throw.
On a failed save, they drop whatever they are holding and are
frightened of you for 1 minute. If a frightened creature ends
its turn and does not have line of sight to you, it can repeat
the saving throw, ending the effect on a success.

[Página 14]
4th-Degree Exploits

Exploits of this degree are strategies only mastered by oncein-a-generation genius commanders. These Exploits can only
be learned by Warlords of 13th level or higher, and each
Exploit can only be used once per short or long rest.
Heroic Order

Prerequisite: 13th level
When you take the Attack action, you can issue this Order in
place of an attack, targeting another creature that can see or
hear you within 30 feet. Until the start of your next turn, that
creature has advantage on every attack roll, ability check, and
saving throw it makes and is resistant to all damage.
Revitalizing Order

Prerequisite: 13th level
When you take the Attack action, you can issue this Order in
place of an attack, targeting a creature within 30 feet that has
died within the last minute. It regains hit points equal to your
level + your Leadership modifier and can stand up.
This Tactical Exploit cannot return a creature to life that
has died of old age, nor can it restore missing body parts.
Victory Surge

Prerequisite: 13th level
As an action, you expend one Exploit Die and drive an ally to
fight as never before. Another creature of your choice within
30 feet that can see or hear you can use its reaction to move
up to its full speed and take a single action or bonus action.

5th-Degree Exploits

Exploits of this degree are near-supernatural feats of tactical
skill that rival those of deities of war. These Exploits can only
be learned by Warlords of 17th level or higher, and each 5thdegree Exploit you know can only be used once per long rest.
Contingency Plan

Prerequisites: 17th level, Intelligence of 19
At the end of a long rest, you can expend one of your Exploit
Dice to put an undisclosed contingency plan into place. Until
you activate this Exploit again you cannot regain this Exploit
Die. You can only have one contingency plan at a time.
As an action, you can reveal your previously undisclosed
plan (which you make up at the time of its reveal) and make a
DC 20 Intelligence check. You may add a skill the DM deems
appropriate to your plan. On a success, your secret plans and
preparations take effect perfectly as you described them.
The cost to execute your plan cannot exceed the equivalent
of 5,000 gp, and the effects cannot exceed a 7th-level spell.
For example, you may reveal that you secretly purchased
the perfect spell scroll last time you were in a town, or that
you paid a mercenary band or airship to come to your rescue.
Final Strike

Prerequisite: 17th level
As an action you expend one Exploit Die and order your allies
to strike at a foe of your choice. Creatures of your choice (up
your Leadership modifier) within 30 feet that can see or hear
you can immediately take the Attack action, or cast a spell of
5th-level or lower with a casting time of one action.
Any attacks or spell that a creature casts as part of this
Tactical Exploit must target the creature you designate.

[Página 15]
The Warlord
A Strategic New Class for the World's Greatest
Roleplaying Game. Lead allies to victory with 40
Tactical Exploits and five Academies of War:
Chivalry, Ferocity, Schemes, Skalds, or Tactics!
Version 3.0.1
Created by /u/laserllama
Artist Credits:
Covers - Bram Sels - Hero of Precinct One
Page 1 - Karl Kopinski - Cathars' Crusade
Page 3 - Chris Rallis - Prison Warden
Page 4 - Paolo Puggioni - The Knight
Page 5 - Howard Lyon - Crusade
Page 6 - Chris Rahn - Dire Overlord
Page 7 - T. Jacobson - Explorer Returned
Page 8 - G. Rutkowski - Blaring Recruiter
Page 9 - Cynthia Sheppard - Ampryn Tactician
Page 11 - Magali Villeneuve - Knight's Pledge
Page 12 - Johannes Voss - Tomik
Page 13 - Stephen Stark - Inspiring Leader
Additional Laserllama Homebrew content
can be found for free on GM Binder.
Like what you see? Support me on Patreon for
access to two exclusive Academies of War:
The Psionic Academy of Battleminds!
& The Terrifying Academy of Dreadlords!

[Página 16]
This document was lovingly created
using GM Binder.

WWW.GMBINDER.COM

If you would like to support the GM Binder developers,
consider joining our Patreon community.
