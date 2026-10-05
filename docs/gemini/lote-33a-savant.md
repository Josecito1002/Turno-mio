# Encargo: Lote 33a (Savant y Savant Expanded) de la app "Mi turno"

"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el formato de
abajo, lo que se pide, usando **solo el texto en inglés que viene al final**: material de la comunidad (LaserLlama (reglas 2014)), no oficial de
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
JSON `{ "clave": "Savant v5.6.1 (LaserLlama)" }` para la clase y cada subclase.
=== D ===
JSON `{ "clave": "1 o 2 frases que presenten la clase o subclase" }`.
=== E ===
Dudas, cortes de texto o [NO CONFIRMADO].

## Texto fuente (Savant v5.6.1 (LaserLlama))

[Página 1]
The Savant

[Página 2]
The
Savant

An elf cleaned her glasses
with the corner of her cloak as
the dust settled. The emperor had
paid her a large sum to locate this
forgotten place, and after months of
pouring over ancient maps, she had
pieced together the once-lost location
of the primeval temple. Now, she had
a decision to make. If she reported the
location of the temple to her benefactor,
it would be ruthlessly stripped of valuables.
But, if she kept the location to herself, she
could preserve the ancient knowledge
contained within. For a savant, knowledge
is more precious than any sum of gold.
An aging human warrior silently assessed the
soldiers under his command. They were exhausted
and almost out of supplies. It was the tenth night of a
brutal siege, and the graying commander knew that no
reinforcements were coming to their rescue. He was too
old to be of much use in battle, but if his soldiers followed his
orders without any hesitation, they might have a chance of
survival. He stood up, and for what could very well be his final
time, drew his weathered sword from its scabbard.
A young dwarf bent over his unconscious comrade in the
midst of battle, his hands shook as he examined his brother's
wounds. His clan had spent a small fortune sending him to
study at the finest university in the land. All the hours spent in
lectures and libraries, all for this moment. He thought back to
his lessons and began to dress his brother's wounds.
The characters described above are just some examples of
the adventuring intellectuals known as Savants. Armed with
only their wit, they aid their allies and outwit their enemies.

Magnificent Minds

There are many wonderfully intelligent people in the world,
but few are true Savants. Born with the innate desire to learn
anything they can, and the potential for genius-level intellect,
Savants spend their lives learning anything that those around
them are willing to teach. Often recognizable at an early age,
a Savant's unquenchable hunger for knowledge draws them
to the great libraries, universities, and other places of higher
learning. They are willing to go to any lengths to unlock the
secrets of the world, often turning to lives of adventure. For
a Savant, no price is too steep for the promise of discovery.

Intense Focus

Savants are hyper-focused on their chosen area of study and
often become obsessed with learning all they can about their
specialty. In their quest for discovery, Savants are willing to
set aside any conviction, political, religious, or otherwise, to
acquire the information they seek. To them, their desire for
knowledge is more important than loyalty to any ideology.
Often at great personal cost, Savants will not stop their
research until they have made a revolutionary discovery in
their area of study. It is not unusual to encounter one such
scholar far from the safety of a university and its libraries.

Creating
Your Savant

When creating a Savant, consider their upbringing and the
level of their formal education. Were they a star pupil at the
finest university gold could buy? Or, were they a child of the
streets, fighting for every scrap of knowledge that they could
get their hands on? Maybe their mind was trained from birth
to be the perfect analytical tool for a noble house or family.
Also, consider why your Savant would rely on only their
intellect rather than use their gifts in pursuit of the arcane or
in the service of a higher power. Are they cursed to never be
able to produce even the most mundane spell? Or, have they
sworn never to rely on the magic that destroyed their family?
Finally, why did your Savant become an adventurer rather
than live the life of an academic? Have they advanced beyond
normal study and look forward to the endless discoveries of
adventure? Or, have they always been a student of the world?
Multiclassing and the Savant
If your group uses the optional multiclassing rule,
here is everything you need to know if you choose
to take at least one level in the Savant class.
Ability Score Minimum. As a multiclass character,
you must have a minimum Intelligence score of 13
in order to take a level as a Savant, or to take a level
in another class if you are already a Savant.
Proficiencies Gained. If Savant is not your initial
class, here are the proficiencies you gain when you
take your first Savant level: light armor, one skill of
your choice from the Savant skill list, and one set
of artisan's tools of your choice.

[Página 3]
Class Features
Hit Points

Hit Dice: 1d8 per Savant level.
Hit Points at 1st Level: 8 + your Constitution modifier
Hit Points at Higher Levels: 1d8 (or 5) + your Constitution
modifier per Savant level after 1st

The Savant

Intellect
Die

Level

PB

Features

1st

+2

Adroit Analysis,
Analytical Defense

d4

Armor: Light armor
Weapons: Simple weapons, rapiers, shortswords, whips
Tools: One set of Artisan's Tools of your choice
Saving Throws: Intelligence, Wisdom
Skills: Choose two from Arcana, History, Investigation,
Insight, Medicine, Nature, Persuasion, or Religion

2nd

+2

Potent Observation,
Scholarly Pursuits

d4

3rd

+2

Academic Discipline

d4

4th

+2

Ability Score Improvement

d4

5th

+3

Calculated Fourish,
Swift Reflexes (2)

d6

6th

+3

Sharp Mind

d6

As a Savant, you start with the following equipment, along
with the equipment granted to you by your Background:
(a) a simple weapon of your choice or (b) a shortsword.
(a) a light crossbow and 20 bolts or (b) two daggers.
a set of Artisan's Tools, leather armor, and scholar's pack.

7th

+3

Discipline Feature

d6

8th

+3

Ability Score Improvement

d6

9th

+4

Keen Awareness

d8

10th

+4

Unrivaled Genius

d8

11th

+4

Swift Reflexes (3)

d8

12th

+4

Ability Score Improvement

d8

13th

+5

Discipline Feature

d10

14th

+5

Unyielding Will

d10

15th

+5

Flawless Analysis

d10

16th

+5

Ability Score Improvement

d10

17th

+6

Swift Reflexes (4)

d12

18th

+6

Discipline Feature

d12

19th

+6

Ability Score Improvement

d12

20th

+6

Incomparable Intellect

d12

Proficiencies

Starting Equipment

Quick Build

You can make a Savant quickly by using these suggestions.
First, make Intelligence your highest ability score, followed
by your Dexterity. Second, choose the Noble Background.

Adroit Analysis

Starting at 1st level, you can use your bonus action to take the
Help or Search action, or make an Intelligence ability check.
When you take the Search action, you can study a creature
that you can see within 60 feet, designating it as your Focus,
learning one of the following Characteristics of your choice:
Armor Class

Highest Ability Score

All Special Senses

Lowest Ability Score

Resistances, Immunities,
& Vulnerabilities

One Trait or Action
from its stat block

It remains your Focus for 1 minute, but it ends early if you
are Incapacitated, or you use this feature on another creature.
For the duraiton, you gain the benefits and limitations below:
Intellect Die

Your genius is represented by your Intellect Die, a d4. When a
feature uses your Intellect Die, always roll the Die. If you ever
add more than one Intellect Die to a roll, roll all your Intellect
Dice, but only apply the highest result to your roll.
At certain levels, the size of your Intellect Die increases, as
shown in the Intellect Die column of the Savant class table.
Saving Throws

If one of your features requires your Focus to make a saving
throw, the save DC is calculated using your Intelligence:
Intellect save DC = 8 + your Proficiency Bonus
+ your Intelligence modifier
Predictive Dodge

So long as you can see your Focus, it has disadvantage on all
attacks, both weapon and spell, that it makes against you.

Single Minded

While you have a Focus, you cannot cast or concentrate on
spells, or use other features that require your concentration.
Studied Strike

Whenever you make a weapon attack against your Focus, you
can use your Intelligence for your attack and damage rolls.
Once per turn when hit your Focus with an attack, you deal
bonus damage equal to your Intellect Die. You can forgo this
damage to learn another Characteristic from the table above.

Analytical Defense

Also at 1st level, your predictive capabilities aid your defense.
So long as you are not wearing armor or a shield, your Armor
Class equals 10 + your Dexterity and Intelligence modifiers.

Potent Observation

Starting at 2nd level, you can quickly inform your allies of the
insights you gain. When another creature within 30 feet that
can hear and understand you, deals damage to your Focus, or
makes an ability check using a tool or skill you are proficient
in, you can use a reaction to add your Intellect Die to its roll.

[Página 4]
Scholarly Pursuits

You are always expanding your knowledge base. At 2nd level,
you master one Scholarly Pursuit from the end of this class.
You master one additional Scholarly Pursuit of your choice
when you reach 5th, 11th, and 17th level in this class.

Academic Discipline

At 3rd level, pick an Academic Discipline from the list below
that best represents the knowledge and study of your Savant:
Archaeologist

Naturalist

Investigator

Physician

Mentor

Tactician

Your Discipline grants you features at 3rd, 7th, 13th, and
18th level. All Discipline features use your Intellect save DC.

Ability Score Improvement

At 4th level, and again at 8th, 12th, 16th, and 19th levels, you
can increase one ability score by 2, or two ability scores by 1.
You can't use this feature to increase an ability score over 20.

Calculated Flourish

You are always ready to dodge deadly blows. Beginning at 5th
level, when you are hit by an attack you can see, you can use a
reaction to add your Intellect Die to your Armor Class against
that attack, possibly turning a hit into a miss.

Swift Reflexes

The speed that you observe and react to your surroundings is
incredible. At 5th level, you can take up to two reactions each
round, but can never use more than one reaction per trigger.
When you reach certain Savant levels, you gain additional
reactions per round: at 11th level (3) and at 17th level (4).

Sharp Mind

Your genius is truly wondrous. Beginning at 6th level, you add
your Intellect Die to all Intelligence, Wisdom, and Charisma
saving throws, so long as you are not Incapacitated.
Also, you can now use Potent Observation when a creature
in range of the feature is forced to make a saving throw.

Keen Awareness

You are always prepared for danger. Beginning at 9th level, so
long as you aren't Incapacitated, you cannot be Surprised, and
you can add your Intelligence modifier to initiative rolls.

Unrivaled Genius

Your intellect has risen to near-supernatural heights. At 10th
level, the features listed below improve in the following ways:
Potent Observation

You can use Potent Observation any time another creature in
range deals damage to any target, not just your Focus. If used
against your Focus, you add two Intellect Dice to the damage.
Calculated Flourish

When you use Calculated Flourish and the attack misses, you
can either move up to 10 feet without provoking opportunity
attacks, or make a single weapon attack against your attacker.

Unyielding Will

At 14th level, you gain proficiency in Charisma saving throws.
You also have advantage on saving throws that your Focus
forces you to make, and any saving throws you make to resist
or end the Charmed and Frightened conditions.

Flawless Analysis

At 15th level, you learn to flawlessly predict your Focus's next
move and inform your allies. As an action, you can force your
Focus to make an Intelligence saving throw. On a failure, the
following effects take place until the start of your next turn:
Your Focus has disadvantage on all ability checks, attack
rolls, and saving throws, so long as it remains your Focus.
Creatures of your choice within 30 feet have advantage on
any saving throw your Focus forces them to make.
Once you attempt to use Flawless Analysis on a Focus, you
can't use it on that creature again until you finish a long rest.

Incomparable Intellect

At 20th level, you realize your true potential. Your Intelligence
score increases by 4, up to a maximum of 24. Also, if you roll
an Intellect Die and roll lower than your Intelligence modifier,
you can replace the roll with your Intelligence modifier.

[Página 5]
Scholarly Pursuits

Listed below are the Scholarly Pursuits available to a Savant.
To learn a Scholarly Pursuit, you must meet its prerequisites:
Instruction

Your studies have made you an exceptional teacher. Over the
course of 1 hour, which can be during a rest, you can grant a
number of creatures (up to your Savant level), of Intelligence
8 or higher, proficinecy with a single skill, tool, or weapon that
you are proficient in, or the ability to speak and understand
one language you know. Creatures you instruct must be able
to hear and understand you for the duration of the hour.
The knowledge lasts until the creature finishes a long rest.
Perfect Recall

You can recall picture-perfect details from anything that you
commit to memory. If you spend at least 1 minute observing
an object or creature, you can perfectly recall any observable
information about it at any point in the future.
For example, you could memorize a map, one page from a
book, a mysterious inscription, or a creature's appearance.
Quick Study

You learn exceptionally fast. Over the course of 1 hour, which
can be during a short or long rest, you can gain proficiency in
a skill or tool, or learn a language. You must have an example,
such as a manual or another creature, to learn from, and this
knowledge lasts until you use this feature again.
You can also take the Search action when you roll initiative,
so long as you are not Surprised or Incapacitated.
Astrology

Prerequisites: 4th-level Savant
You are a disciple of heavenly bodies and use this knowledge
to twist fate. You gain proficiency in Arcana, and you can add
your Intellect Die to any Arcana checks you make.
During each long rest that you can see the night sky, roll a
d20 and record the number. Once before the end of your next
long rest, you can choose to use that roll in place of a d20 for
an ability check, attack roll, or saving throw, before you roll.
Falconry

Prerequisites: 4th-level Savant
You can train birds of prey for scouting and combat. You gain
proficiency in Perception, and you can add your Intellect Die
to any Perception checks you make.
You also gain a trained Falcon that uses the following rules:
Statistics. The Falcon uses the Hawk stat block, but it has
an Intelligence score of 8. You can communicate simple ideas
with one another using only gestures and sounds.
Combat. The Falcon is unwaveringly loyal and acts during
your turn in combat. It can move and its reaction on its own,
but it only takes the Dodge action unless you use your bonus
action to command it to take an action from its stat block, or
another action. If you are Incapacitated, your Falcon can act
on its own, and will defend you to the best of its abilities.
Death. If your Falcon falls to 0 hit points, it makes death
saving throws as a player character would. Should it die, your
unique skills allow you to track and train another Falcon over
the course of an 8-hour period using 5 gold worth of bait, so
long as such a creature can reasonably be found in the area.

Linguistics

Prerequisites: 4th-level Savant
You are a student of language and the spoken word. You gain
proficiency in Persuasion, and you can add your Intellect Die
to any Persuasion checks you make.
You also learn to speak, read, and write a number of bonus
languages equal to your Intelligence modifier (minimum of 1).
If your Intelligence modifier increases (or decreases) this also
increases (or decreases) the bonus languages that you know.
Physical Fitness

Prerequisites: 4th-level Savant
You know that the key to a healthy mind is a healthy body. You
gain proficiency in either Athletics or Acrobatics, and you can
add your Intellect Die to ability checks with that skill. You also
gain a climb or swim speed equal to your walking speed.
You can master this Scholarly Pursuit twice. However, you
must choose different skills and movement speeds each time.
Riddles

Prerequisites: 4th-level Savant
You have spent many hours learning to speak in both riddles
and rhymes. You gain proficiency in Deception, and you can
add your Intellect Die to any Deception checks you make.
When you speak, you can choose to speak in Riddles. You
appear to be speaking normally, but you can include hidden
messages laced in your rhyming words.
Over the course of 1 hour, which can be during a short or
long rest, you can teach another creature with an Intelligence
of 8 (or higher) to understand the secret messages contained
in your Riddles. If its Intelligence is 11 (or higher) it can reply
to you with similar encoded riddles and rhymes.
Secrets & Whispers

Prerequisites: 4th-level Savant
You know the right places to eavesdrop and just where to go
for information. You gain proficiency in Stealth, and you can
add your Intellect Die to any Stealth checks you make.
Whenever you spend a long rest in a Settlement, you can
spend 1-hour gathering local rumors to learn of a significant,
even secret, event which occurred there within the last week.
Theology

Prerequisites: 4th-level Savant
You are a dedicated scholar of various holy texts and sacred
rites. You gain proficiency in Religion, you can speak, read,
and write Celestial, and you can add your Intellect Die to all
Religion checks you make.
Also, once between each short or long rest, you can draw
on this knowledge to perform a 10 minute Ritual and impart
the benefits of one of the following spells: bless, ceremony,
detect evil & good, or protection from evil & good. You need
not expend a spell slot or the normal material components.
Traditions

Prerequisites: 4th-level Savant
You are a student of culture, politics, and traditions. You gain
proficiency in History, and you can add your Intellect Die to
any History checks you make.
If you can incorporate your knowledge of local traditions,
customs, or manners when interacting with a local creature,
you can make History checks in place of Charisma checks.

[Página 6]
Academic Disciplines

Choose an Academic Discipline from the list below that
represents the unique genius and skills of your Savant:
Archaeologist

Naturalist

Investigator

Physician

Mentor

Tactician

Archaeologist

Specializing in the study of lost civilizations, ancient
ruins, and uncharted lands, Archaeologists bring the
light of discovery to the dark and deadly places of the
world. Doing their best to uncover the wisdom of ages
past, they tend to feel kinship with the civilizations they
study and go to great lengths not to offend their memory.
Student of Archaeology

3rd-level Archaeologist Discipline feature
You gain proficiency in both History and Investigation,
and you add your Intellect Die to checks with both skills.
Time spent exploring ancient places has given you a knack
for navigating their dangers, granting you the following skills:
You learn to speak, read, and write two extra languages
of your choice, often archaic or forgotten tongues.
Any time you make an ability check related to a trap, you
add your Intellect Die to the result of your roll.
If you spend at least 1 minute examining an object, you
can ascertain its value, origin, and age. If it has magical
properties, you learn them as if by the identify spell.
Eye for Antiquity

3rd-level Archaeologist Discipline feature
Your knowledge of ancient civilizations allows you to unlock
their lost technologies. During a long rest in a Settlement or
dungeon, you can spend 1 hour studying antiques or debris to
unearth one Curio. The Curio is a Tiny magical item with the
properties of a Common magical item, of your choice. Curios
always use Intelligence as their Spellcasting Ability, and you
ignore the Single Minded restriction of Adroit Analysis when
you cast and concentrate on spells produced by Curios.
Due to their age, you must spend 1 hour during each long
rest maintaining Curios, or they revert to mundane items. If a
Curio was expendable (like a spell scroll), it regains its magic
during this hour. You can maintain a number of Curios equal
to your Intelligence modifier (a minimum of one).
Adventuring Academic

7th-level Archaeologist Discipline feature
Your ability to navigate deadly ruins in search of knowledge is
without peer. Whenever you make a saving throw to avoid the
effects of a trap, you add your Intellect Die to your roll.
You also gain a climb speed equal to your walking speed.

Ancient Insights

7th-level Archaeologist Discipline feature
You have advanced in your understanding of ancient
technologies. You ignore all class, race, and alignment
restrictions for the attunement and use of magic items,
scrolls, and potions.
In addition, when you use Eye for Antiquity to unearth a
Curio, you can unearth Curios with properties of Common
or Uncommon magic items, following all other rules.
Lore Master

13th-level Archaeologist Discipline feature
You study every detail of every myth, legend, and folk tale you
come across. When you observe a person, place, or object for
at least 10 minutes, you mystically recall information about it
as if it were the target of a legend lore spell.
The target of this feature does not need to be of legendary
importance in order for you to gain information. However, if
there is no relevant lore about the target, you learn nothing.
Unearthed Arcana

13th-level Archaeologist Discipline feature
You are an unparalleled expert with ancient magical devices.
You can use your Intellect save DC for your magic item saving
throws unless the magic item's innate DC is higher.
Moreover, each time you finish a short or long rest, you can
cause one Curio you touch to regain expended Charges or its
uses equal to your Intelligence modifier (a minimum of 1).
Master Archaeologist

Obscure Rule: Duplicate Proficiency
If a character gains proficiency in the same tool,
skill, or language from two different sources, they
instead gain another proficiency of the same kind.

18th-level Archaeologist Discipline feature
Exposure to the magic of the ancient world has given you an
innate resilience to its effects. You gain Resistance to damage
from spells, magic items, and magical traps.
Finally, you can have a single Curio with the properties of a
Rare magic item.

[Página 7]
Rough & Tumble

3rd-level Investigator Discipline feature
You have gained unsavory skills working in the underbelly of
civilization. Your unarmed strikes deal Bludgeoning damage
equal to your Intellect Die + your Strength modifier on hit,
and whenever you take the Attack action, you can make an
unarmed strike as a bonus action on that turn.
Once per turn, when you hit your Focus with an unarmed
strike, you can forgo the bonus damage of Studied Strike to
force it to make a Dexterity saving throw. On a failure, it is
Blinded, Deafened, or can't speak until the start of your next
turn; or if it is Large or smaller, you can knock it Prone.
Illicit Contacts

7th-level Investigator Discipline feature
You are deeply familiar with the criminal elements of
society. While communicating in Thieves' Cant, you
add your Intellect Die to any ability checks you make
to influence others who understand Thieves' Cant.
You also master the Secrets & Whispers Scholarly
Pursuit. If you have already learned it, you can instead
learn your choice of either Perfect Recall or Traditions.
Underhanded Brawler

Investigator

Masters at unraveling mysteries, conspiracies, and secrets of
all kinds, Investigators possess an uncanny ability to read the
intent of others. They often dedicate their genius to thwarting
any who deceive the innocent and take advantage of common
trust. Their considerable intellect and eye for the truth stand
in the way of thieves, shapeshifters, and corrupt politicians.
Student of Truth

3rd-level Investigator Discipline feature
You gain proficiency in Insight and Investigation, and you can
add your Intellect Die to your checks with both skills. You can
also use Intelligence, in place of Wisdom, for your Insight and
Perception checks, including passive checks.
Your intuitive nature also grants you the following benefits:
When you take the Search action, you gain information as
if you spent a full minute searching instead of one action.
You learn to speak, read, and decode messages in Thieves'
Cant, the language of the criminal underworld.
For every minute you spend speaking with your Focus, you
can learn one of its Ideals, Traits, Bonds, or Flaws.

7th-level Investigator Discipline feature
You learned to fight in back alleys, where the only thing
that matters is who is left standing at the end of a scrap.
You gain the following underhanded benefits:
Cunning Flourish. When you use Calculated Flourish
and the attack misses, you can force your attacker to
make a Dexterity saving throw against your Rough
& Tumble feature as part of the same reaction.
Discombobulate. If your Focus fails its saving throw
against Rough & Tumble you can apply two of the
of the normal effects instead of one. For example,
you can cause your Focus to be both Blinded and
Deafened, or cause it to be Blinded and unable to
speak until the start of your next turn.
Slippery Combatant. When a creature you can see
makes a weapon or spell attack against you, you can
use your reaction to designate the attacker as your Focus,
imposing disadvantage on the triggering attack roll.
Piercing Gaze

13th-level Investigator Discipline feature
You see through the most intricate deception and conspiracy.
You are always aware if your Focus is lying, and you instantly
detect the presence of visual Illusions and Shapeshifters that
are within your line of sight. However, this does not allow you
to see through either of those effects.
In addition, when your Focus fails its saving throw against
Rough & Tumble, you can forgo all normal effects to cause it
to be Stunned until the start of your next turn instead.
Master Investigator

18th-level Investigator Discipline feature
Your sense for the truth rivals immortals. You gain Truesight
out to a 30-foot radius. Within this radius, you detect hidden
doors and traps, and you are aware if creatures are lying.
Last, when you hit your Focus with an attack or use Potent
Observation against your Focus, you can cause that attack to
become an automatic critical hit. Once you do so, you must
finish a short or long rest before you can do so again.

[Página 8]
Mentor

While most Savants use their vast intellect in pursuit of their
chosen discipline, Mentors use their gifts in service of others.
Most often, they are past their prime and looking to pass their
knowledge to the next generation. Whether community elder,
retired adventurer, or someone with knowledge beyond their
years, Mentors are ready to gently guide those around them.
Student of Life

3rd-level Mentor Discipline feature
You gain proficiency in History, Insight, and a set of Artisan's
Tools of your choice, and you add your Intellect Die to checks
with these proficiencies. You can also use your Intelligence,
in place of Wisdom, for Insight checks.
Your lived experiences also grant you the benefits below:
You master the Instruction Scholarly Pursuit. If you have
mastered this Pursuit, you instead master Quick Study.
Whenever you roll a 1 on an Intellect Die, you can reroll
your Intellect Die, but you must keep the new roll.
You can take the Help action to aid another creature
within 10 feet of you in attacking your Focus.
Astute Advice

3rd-level Mentor Discipline feature
You know just what to say to help others learn from failures.
When another creature within 30 feet that can both hear and
understand you fails an ability check, attack roll, or a saving
throw, you can use a reaction to have it re-roll its d20.
You can use this reaction a number of times equal to your
Intelligence modifier (minimum of once). You regain one use
when you finish a short rest, and all uses after a long rest.
Calm Demeanor

7th-level Mentor Discipline feature
You are able to keep your composure in the chaos of battle. If
you end your turn without dealing damage or forcing another
creature to make a saving throw, you can gain temporary hit
points equal to your Intelligence modifier (minimum of 1).

Soothing Presence

7th-level Mentor Discipline feature
Your calming presence allows others to truly relax. Creatures
that complete a short rest with you have advantage on any Hit
Die rolls they make to regain hit points.
Wondrous Advice

13th-level Mentor Discipline feature
Your insightful observations carry your allies to new heights.
When you use Astute Advice, you can choose for the creature
to either add your Intellect Die to the new result of its roll, or
to gain temporary hit points equal to your Intellect Die. You
can choose the benefit after you see its new roll.
In addition, you now regain all uses of Astute Advice when
you complete a short or long rest, and when you roll initiative,
you regain a single expended use of Astute Advice.
Mystical Intuition

13th-level Mentor Discipline feature
Your life experience and extraordinary intuition can give you
mystical insights into the world around you. You can spend 1
minute meditating on a question you have, or a question that
another creature has asked you. You then mystically intuit the
answer to the question as if you had cast the commune spell.
However, unlike commune, you can only intuit an answer if it
is known to another mortal.
Once you gain an answer to a question using this feature,
you must finish a long rest before you can do so again.
Master Mentor

18th-level Mentor Discipline feature
Your advice is legendary and your very presence helps allies
live up to their true potential. Creatures of your choice, other
than yourself, who can hear you within 15 feet can add your
Intelligence modifier (minimum of +1) to any ability checks
and saving throws they make.
Finally, each time you finish a short or long rest, you gain
the benefits of your Mystical Intuition feature.

[Página 9]
Naturalist

The Naturalist's classroom begins at the edges of civilization.
Scholars of the wild, they will go to great lengths to preserve
nature as it exists, free from civilization. A true Naturalist is
both conservationist and expert at predicting weather, caring
for wild animals, identifying toxic and medicinal plants, and
guiding others safely through uncharted wilds of the world.
Student of Nature

3rd-level Naturalist Discipline feature
You gain proficiency in both Animal Handling and Nature,
and you can add your Intellect Die to your checks with both
skills. You can also use Intelligence, in place of Wisdom for
your Animal Handling and Survival checks.
Your knowledge of the wilds allows you to mark creatures
as your Focus by studying signs of their passing, like tracks or
markings, even when you cannot see the creature.
Naturalist's Journal

3rd-level Naturalist Discipline feature
You compile your research on fantastical flora and fauna in a
Naturalist's Journal. During the course of a short or long rest,
you can spend 1 hour detailing your current Environment, or
a specific Beast, Plant, or Monstrosity (like a Griffon or Bear),
that was your Focus within the past 24 hours. You gain these
benefits against creatures and Environments in your Journal:
You have advantage on related Intelligence checks.
When you make a weapon attack against a Focus
detailed in your Journal, you can forgo your Studied
Strike bonus damage to add your Intellect Die
to your attack roll.
In a detailed Environment, you
and those travelling with you
can ignore non-magical difficult
terrain, and you cannot get lost.

Call of the Wild

7th-level Naturalist Discipline feature
Drawing upon eons of understanding, you can bend the wild
creatures to your will. As an action, you can force a creature
within 30 feet that is also detailed in your Journal to make a
Charisma saving throw. Creatures of a CR equal to half your
Savant level, or higher, automatically succeed. On a failure, it
is Charmed by you and uses these rules for the duration:
Control. The creature is Friendly to you and your allies. As
a bonus action, you can issue a verbal command, which it will
do its best to obey on its next turn. When it is not carrying out
a command, it will defend itself to the best of its abilities.
Morale. If the creature takes damage, it repeats its saving
throw at the start of its next turn. On a success, it is no longer
Charmed. If it makes this saving throw you can use a reaction
to subtract one Intellect Die from its roll, if it can hear you.
Duration. If the creature does not escape sooner, the effect
ends if you become Unconscious, you free it with a command,
or you attempt to use this feature on another creature.
Once a creature succeeds on any saving throw against this
feature, it is immune to its effects until it finishes a long rest.
Advanced Studies

13th-level Naturalist Discipline feature
Your knowledge of the wild does not stop with the mundane.
You can detail Dragons, Giants, Oozes, and Undead in your
Journal. Your Journal also grants additional benefits:
You gain Focus benefits against all detailed creatures.
While in a detailed Environment, you and those travelling
with you ignore magical difficult terrain and make saving
throws to resist environmental effects with advantage.
Master Naturalist

18th-level Naturalist Discipline feature
Your natural knowledge surpasses all others. You can
detail any non-Humanoid creature in your Journal,
and you have advantage on attack rolls against all
creatures detailed in your Journal.
Finally, Call of the Wild only ends when you
willingly free the creature, you use it on another
creature, or you or the Charmed creature dies.

[Página 10]
Physician

Physicians use their considerable intellect to heal the
sick and tend the wounded. They spend their lives
studying the anatomy and biology of mortals,
and use this knowledge to keep their
allies in top condition and cripple
foes. Using this medical training,
they offer aid to those that do not
have access to the luxury of divine
magic or other healing spells.
Student of Medicine

3rd-level Physician Discipline feature
You gain proficiency in Medicine and Sleight of
Hand, and you add your Intellect Die to checks
with both skills. You can also use Intelligence, in
place of Wisdom, for Medicine checks.
Your studies also grant you the benefits below:
For each minute you spend examining
your Focus, you can identify one disease,
poison, or curse currently afflicting it.
When you hit your Focus with a weapon
attack, you can forgo the Studied Strike
bonus damage to reduce its speed by
10 feet until the start of your next turn.
Over the course of 1 hour, which can be during a
short or long rest, you can hold a Healer's Kit to
restore a number of its expended uses equal to
your Intelligence modifier (minimum of 1).
Combat Medic

3rd-level Physician Discipline feature
You have studied to administer medicinal aid in the field.
You gain the Combat Medic actions below, which you can
only use on other creatures. When you use a Combat Medic
action, you can expend one use of a Healer's Kit to treat any
Intellect Dice rolled as the maximum possible result:
Adrenaline Jolt. You touch a creature that has a disease,
or is Blinded, Charmed, Deafened, Frightened, or Poisoned,
and it can immediately repeat its saving throw to end that
effect with a bonus equal to your Intellect Die.
Dress Wounds. You touch a creature that is below its hit
point maximum, and it gains temporary hit points equal to
your Intellect Die. These temporary hit points can't exceed
the number of hit points the creature is missing.
Healing Surge. One creature you touch can immediately
expend one of its Hit Dice to regain hit points equal to that
Hit Die + its Constitution modifier + your Intellect Die.
If you use this ability on a living creature at 0 hit points, it
is instantly Stabilized even if it does not expend a Hit Die.
Field Doctor

7th-level Physician Discipline feature
You can easily navigate the chaos of battle to administer aid.
Whenever you take a Combat Medic action, you can use your
bonus action to Dash, Disengage, or make a weapon attack.
Steady Hands

7th-level Physician Discipline feature
Your confidence in your medical capabilities has grown. You
can use Combat Medic actions on yourself, so long as you are
not Blinded, Incapacitated, Paralyzed, or Restrained.

Medical Expertise

13th-level Physician Discipline feature
Your techniques push allies to their physical limit. When you
use a Combat Medic action, you can empower it, granting it
the corresponding bonus below. You can do so a number of
times equal to your Intelligence modifier (minimum of once),
and you regain all uses when you finish a short or long rest:
Adrenaline Jolt. You instantly end one of these conditions:
Blinded, Charmed, Deafened, Frightened, Paralyzed, Petrified,
Poisoned, Stunned, one level of Exhaustion, one reduction to
an ability score, or one reduction to its maximum hit points.
Dress Wounds. You can either reattach one severed limb
or digit, or grant the target temporary hit points equal to the
difference between its current and maximum hit points.
Healing Surge. You can use this feature on a creature that
has died within the past minute, and it can spend one Hit Die
to return to life with hit points from your Healing Surge. This
feature cannot restore missing body parts, and cannot return
a creature to life that dies of old age.
Master Physician

18th-level Physician Discipline feature
Your knowledge of anatomy allows you to perform legendary
feats of medicine. When a creature you are touching expends
a Hit Die to regain hit points, it treats it as the maximum roll.
This includes any Hit Dice spent during short rests, and Hit
Dice spent as part of your Healing Surge action.

[Página 11]
Tactician

Every successful monarch, conqueror, and revolutionary has
a master Tactician responsible for their victory. These shrewd
leaders remain always one step ahead of foes and have a plan
for every outcome. Alone, a Tactician is not a threat, but with
powerful allies, they become a formidable fighting force.
Student of War

3rd-level Tactician Discipline feature
You gain proficiency in History, Persuasion, and two Gaming
Sets of your choice, and you can add your Intellect Die to any
ability checks you make with these proficiencies.
Your study of warfare also grants you the benefits below:
You gain proficiency in medium armor, shields, and all
martial weapons that do not have the Heavy property.
You can use your Intelligence, in place of Dexterity to
calculate your Armor Class in light and medium armor.
You can use Potent Observation on initiative rolls.
Tactical Command

3rd-level Tactician Discipline feature
You can use your knowledge of tactics to direct your allies on
the battlefield. You learn to use the following Orders. To issue
an Order, take the Attack action, then forgo an attack to issue
an Order to another creature that can see or hear you within
30 feet. You can forgo any number of attacks to issue Orders:
Attack Order. If this creature takes the Attack
action before the beginning of your next turn,
it makes one additional attack as part of that
Attack action.
Defensive Order. The creature gains the
benefits of the Dodge action until the start
of your next turn.
Maneuvering Order. As a reaction, this
creature can move up to its speed without
provoking opportunity attacks.
Support Order. This creature can take the
Help, Hide, Search, or Use an Object action.

Advanced Tactics

7th-level Tactician Discipline feature
Your continued study of the art of war grants you knowledge
of the following additional Orders, which use the same rules:
Enlivening Order. On the creature's next turn, it gains the
benefits of the Dash action, and it has advantage on Strength
and Dexterity checks.
Rejuvenating Order. The creature can immediately repeat
one saving throw to end one condition currently affecting it.
Strategic Superiority

7th-level Tactician Discipline feature
You can attack twice, instead of once, whenever you take the
Attack action on your turn. Moreover, if you use your action to
Dash, Dodge, or Disengage, you can make a single attack or
issue an Order as a bonus action on that turn.
Tactical Genius

13th-level Tactician Discipline feature
Your genius allows you to control the flow of each battle from
the outset. When you roll Initiative, you can issue one Order
before any creatures have a chance to act.
Also, when another creature that can hear you attacks your
Focus, you can use Potent Observation on its attack roll. You
can do so after it rolls, but before you know if its attack hits.
Master Tactician

18th-level Tactician Discipline feature
Your words inspire heroism in your allies. Any time you issue
an Order to a creature, you can grant it temporary hit points
equal to your Intelligence modifier (minimum of 1).
Finally, you learn the following legendary Orders. These
Orders can only be issued once each per short or long rest:
Heroic Order. Until the beginning of your next turn, the
creature has Resistance to all damage, and it has advantage
on all ability checks, attack rolls, and saving throws.
Revitalizing Order. You issue this Order to a creature that
died in the past minute. It immediately stands up and regains
hit points equal to your level + your Intelligence modifier.
This Order cannot revive creatures that die of old age.

[Página 12]
The Savant
A brilliant new class for the world's greatest
roleplaying game. Includes six genius Academic
Disciplines: Archaeologist, Investigator, Mentor,
Naturalist, Physician, and Tactician!
Version 5.6.1 - Created by /u/laserllama
Last Updated: September 6th, 2026
Artist Credits:
Cover - Sara Winters - Compulsive Research
Page 1 - Eelis Kyttanen - Weatherlight Stalwart
Page 3 - Mitchell Malloy - Frantic Search
Page 5 - Anna Steinbauer - Seek the Wilds
Page 6 - Lucas Graciano - Marchesa's Infiltrator
Page 7 - Lucas Graciano - Borderland Explorer
Page 8 - Wei Guan - Mentor of the Meek
Page 9 - Bram Sels - Valiant Rescuer
Page 10 - Howard Lyon - Star Pupil
Back - Adam Paquette - Jace's Sanctum
Additional laserllama Homebrew content
can be found for free on GM Binder.
Support me on Patreon for access to
five exclusive Academic Disciplines:
Engineer - Mechanist - Occultist
Tinker - Voyager
Check out the Savant: Expanded for a multitude
of additional Feats, Magic Items, Scholarly
Pursuits, and four Academic Disciplines!

[Página 1]
The Savant Expanded

[Página 2]
The Savant
Class: Expanded

The Savant is an Intelligence-based, non-magical class that
focuses on gathering information and supporting their allies.
Provided here are a multitude of additional Savant options:
Personality & Quirks. Use these roleplaying tables to
randomly determine your Savant's quirks and personality;
take what you like, or use the options here for inspiration
Scholarly Feats. It is no secret that Intelligence is the
ability score with the least useful and synergistic options for
Feats. The Feats presented here look to solve that problem!
Magic Items. Enhance your loot with a variety of magic
items of all rarities designed specifically for the Savant.
Additional Scholarly Pursuits. Also included are eight
additional Scholarly Pursuits for your Savant to master.
Additional Academic Disciplines. Finally, included here
are six bonus Academic Disciplines for Savants: Artistocrat,
Culinarian, Orator, Philosopher, Rune Scribe, and Virtuoso!

Personality & Quirks

Eccentricities

Often, with great intellect and intense mental focus comes
some strange habits. A Savant's eccentricities are usually the
result of them spending too much time on their field of study.
d6

Eccentricity

1

You assume that every person you talk to cares
about the minutiae of your area of expertise.

2

You have a really bad habit of only speaking
in the technical jargon of your field.

3

You don't understand children.

4

When someone doesn't understand something,
you just haven't explained it enough times.

5

You take diligent notes on everything
even when it isn't socially appropriate.

6

You are so dedicated to your field of study that
you find yourself explaining things to your foes.

Having trouble creating a personality for your Savant, or just
looking for inspiration? Choose an Obsession, Eccentricity,
and Irrational Fear from the tables presented here.

Good Luck Charms

Obsessions

d6

Lucky Trinket

1

You refuse to place your faith in a single deity
so you carry a multitude of holy symbols.

In their desire to answer every question, Savants can develop
obsessions. These inexplicable questions and phenomena
gnaw at a Savant until they find the answers that they seek.

Often, despite their intellect, Savants develop attachments to
mundane charms, objects, or clothing they perceive as lucky.

d4

Obsession

2

Your father was a farmer who paid for your
education. You wear his hat in his memory.

1

You discovered a strange script in the margin
of a book. The best scholars cannot identify it.

3

Despite its ineffectiveness, you carry a
whip to impress and intimidate others.

2

As a child you saw a majestic golden bird fly
across the sky that left a rainbow in its wake.

4

You carry a scroll of insane ramblings.
One day you will figure out its meaning.

3

Your father charged you to find the legendary,
and most likely fictional, chalice of Bahamut.

5

You wear a pair of crystal spectacles
even though you have perfect vision.

4

You use the word "inconceivable" all the time
even though you aren't exactly sure what it means

6

You never leave home without a copy of
your mentor's thesis on owlbear anatomy.

[Página 3]
Irrational Fears

Despite their impressive minds, Savants tend to develop fears
that anyone with common sense would find totally irrational.
d6

Irrational Fear

1

You are convinced you contracted a minor form
of lycanthropy from a dog that bit you as a child.

2

Lifelong Learner

You never stop learning. You gain all the benefits below that
correspond to your current Intelligence modifier and lower.
If your Intelligence modifier changes, the benefits you gain
from this Feat also increase (or decrease) with your modifier:
Modifier

Benefit

You will do literally anything to
avoid interacting with fire magic.

+1

You learn to speak, read, and write one
additional language of your choice.

3

You always make sure to sleep with a silver
coin in your hand to ward off night hags.

+2

You gain proficiency with one set
of Artisan's Tools of your choice.

4

You hate snakes and snake-like creatures.

+3

You gain proficiency in one skill of your choice.

5

You are so afraid of undead that the sight
of them causes you to vomit.

+4

For one skill proficiency of your choice, you
treat a roll of 7 or lower on the d20 as an 8.

6

You give out code words to your allies so
they can prove they aren't doppelgangers.

+5

Whenever you are forced to make a Wisdom
saving throw, you can choose to make an
Intelligence saving throw instead.

Scholarly Feats

If your group uses the optional rule for Feats, the following
Feats are available alongside those in the Player's Handbook:
Classical Artist

Your great intellect has allowed you to master what many
would consider the fine arts. You gain the following benefits:
Ability Score Increase. Increase either your Intelligence
or Dexterity score by 1, up to a maximum of 20.
Classically Trained. You gain proficiency in Mason's Tools
and Painter's Supplies. Whenever you make an ability check
with either Tool, you treat a d20 roll of 9 or lower as a 10.
Eye for Value. You have advantage on all ability checks to
asses they value of paintings, sculptures, and other art.
Fine Art. You can use Mason's Tools or Painter's Supplies
and appropriate materials to create a work of Fine Art.
For each 8-hour workday you spend working on it,
the value of your Fine Art increases by 10 gold.
Helpful Insights

You always seem to have helpful advice for
any situation. You gain the benefits below:
Ability Score Increase. You increase your
Intelligence or Wisdom score by 1, up to
a maximum of 20.
Quick Advice. You can use the Help
action as a bonus action on your turn.
Words of Wisdom. When you use
the Help action to give advantage
on an ability check with a skill or
tool you are proficient with, the
target treats a d20 roll of 7 or
lower as an 8.

Mental Acuity

Your mind is a wonderful thing, capable of bursts of insight
and mental fortitude. You gain the following benefits:
Ability Score Increase. Increase your Intelligence score
by 1, up to a maximum of 20.
Well Read. You gain proficiency with two of these skills:
Arcana, History, Investigation, Medicine, Nature, or Religion.
Wondrous Memory. Choose two skills from the list above;
they need not be the skills you gained proficiency in with this
Feat. Any time you make an ability check with either skill, you
can treat a d20 roll of 7 or lower as an 8.
Scholar of Lore

You have spent time learning everything there is to know
about a specific area of study. You gain the following benefits:
Ability Score Increase. Increase your Intelligence score
by 1, up to a maximum of 20.
Scholarly Pursuit. You master a Scholarly Pursuit of your
choice from those available to the Savant. If the Pursuit has
a Savant level prerequisite, you can learn it if your total level
meets the prerequisite level for that Scholarly Pursuit.
Intellect Die. If the Scholarly Pursuit requires an Intellect
Die, always use a d4, unless
yours is already higher.

[Página 4]
Living Quill

Wondrous item, common
This fanciful quill looks to be made from the feather
of a bird of mysterious origin. As an action, you can
speak the Quill's command word and touch the Quill
to a piece of paper or parchment. As long as the Quill
can hear you, it transcribes your words exactly. The
Quill transcribes for 1 hour, but it stops sooner if you
speak its command word again.
Monocle of the Linguist

Wondrous item, uncommon (requires attunement)
This elegantly constructed single eyeglass allows
you to read and understand all writing you view
through it as if it were your native tongue.
Ring of Lost Lore

Ring, rare (requires attunement)
This bronze ring is etched with hieroglyphics
from a forgotten civilization. It has 3 Charges,
and it regains 1 expended Charge daily, at dawn.
While you wear this ring, you can expend 1
Charge and focus your thoughts on one object or
creature you can see to instantly learn one piece
of significant, forgotten, or secret knowledge
about it, so long as such information exists.
Staff of the Headmaster

Magic Items

Consider adding the following scholarly magic items to your
game, particularly if one of your players is playing a Savant.
Blade of the Scribe

Weapon (rapier), rare (requires attunement by a Savant)
The handle of this elegant rapier is fashioned from silver and
steel, and the hollow blade is filled with ink. It bears an Elvish
inscription that, when translated, reads "The pen is mightier
than the sword, but this is mightier still". You gain a +1 bonus
to both attack and damage rolls with this magic weapon.
This magic rapier has 4 Charges. When you hit a target
with this weapon, you can expend 1 Charge to release a blast
of ink. The target must succeed on a DC 15 Dexterity saving
throw or be Blinded for 1 minute. This effect ends early if the
creature uses its action to wipe the ink from its eyes.
This magic rapier regains 1d4 Charges daily, at dawn.
Doctoral Robes

Wondrous item, legendary (requires attunement by a Savant)
These luxurious robes were fashioned by a long-forgotten
empire for the headmaster of an academy of higher learning.
While attuned to the robes, you gain the following benefits:
So long as you are not wearing any armor, your Armor
Class is equal to 15 + your Intelligence modifier.
When you are forced to make a saving throw, you gain a
bonus to your roll equal to your Intelligence modifier.
When another creature that can hear you within 30 feet
makes an ability check, you can use your reaction to add
your Intelligence modifier to the result of its roll.

Staff, very rare (requires attunement by a Savant)
This staff was once a symbol of the headmaster at an
imperial academy. The staff can be wielded as a magic
quarterstaff that grants a +2 bonus to attack and damage
rolls made with it. When holding it, you have a +2 bonus to
any ability checks that use your Intelligence or Wisdom.
Moreover, you can use an action to plunge this staff into the
ground, producing the effect of private sanctum within a 30foot radius of that point. The area within the spell appears as
an ornate study in addition to the normal effects of the spell.
Once you use the staff to cast private sanctum in this way,
the staff cannot do so again until the following dawn.
Tome of Everlasting Genius

Wondrous item, very rare (requires attunement by a Savant)
This elegantly made ageless tome has been passed down by
generations of geniuses, each adding more information to its
pages. This tome contains 1d4 +1 entries from those listed
below. You can roll randomly, or the DM can choose them.
For each entry in the tome, you gain proficiency in the skill
that corresponds with the genius who wrote the entry, and an
additional +5 bonus to any checks you make with that skill.
Genius (Proficiency)

Genius (Proficiency)

Actor (Performance)

Psychologist (Insight)

Astronomer (Nature)

Surgeon (Medicine)

Cultist (Deception)

Researcher (Investigation)

Linguist (Persuasion)

Ritualist (Arcana)

Magistrate (History)

Theologian (Religion)

Once you are attuned to this tome for a year and a day, you
add your own entry to the tome, detailing your area of study,
choosing one relevant skill that you are proficient in to add.
