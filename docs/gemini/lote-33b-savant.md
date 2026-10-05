# Encargo: Lote 33b (Savant y Savant Expanded) de la app "Mi turno"

"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el formato de
abajo, lo que se pide, usando **solo el texto en inglés que viene al final**: material de la comunidad (LaserLlama (reglas 2014)), no oficial de
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
JSON `{ "clave": "Savant v5.6.1 (LaserLlama)" }` para la clase y cada subclase.
=== D ===
JSON `{ "clave": "1 o 2 frases que presenten la clase o subclase" }`.
=== E ===
Dudas, cortes de texto o [NO CONFIRMADO].

## Texto fuente (Savant v5.6.1 (LaserLlama))

[Página 5]
Scholarly Pursuits

Listed below are additional Scholarly Pursuits available to
a Savant that can be included with those in the base class:
Bushcraft

Prerequisites: 4th-level Savant
You can use your knowledge of nature to thrive in the wilds.
You gain proficiency in Nature, and you add your Intellect Die
to any Nature checks you make.
Over the course of 10 minutes, which can be during a short
or long rest, you can gather natural material and use a dagger
or handaxe to create one of the following objects: a club, 1d4
darts, a javelin, a net, 10 feet of rope, or a Bushcraft Snare.
As an action, you can set a Bushcraft Snare in an adjacent,
unoccupied, 5-foot space. The first Large or smaller creature
to move into the space must make a Dexterity saving throw
against your Intellect save DC or be Restrained by the Snare.
As an action, a creature can make a Strength check against
your Intellect save DC, escaping from the Snare on a success.
When the creature escapes, the Snare is destroyed.
Deduction

Prerequisites: 4th-level Savant
You are able to put together seemingly unconnected pieces of
information to discover hidden truths and mysteries. You gain
proficiency in Investigation, and you add your Intellect Die to
any Investigation checks you make.
When you designate a creature as your Focus, it remains
so until you choose to end it, or you designate another Focus.
Once between each long rest, you can ponder a Hunch you
have about your Focus, and ask the DM a question regarding
it that can be answered with a "yes", "no", or "unclear".
Equestrianism

Prerequisites: 4th-level Savant
You have learned to tend to horses and other trained mounts.
You gain proficiency in Animal Handling, and you add your
Intellect Die to any Animal Handling checks you make.
When you ride a trained mount, you gain certain benefits:
In combat, your mount acts during your turn.
When your mount makes an ability check, damage roll,
or saving throw, it can add your Intellect Die to its roll.
As a bonus action, you can command your mount to
attack, or to use another action in its stat block.
Finally, if you spend 8 hours training a friendly quadruped
creature and spend 50 gold on necessary training materials
and food, it is considered to be a trained mount for you.

First Aid

Prerequisites: 4th-level Savant
You have studied basic medicinal techniques to aid allies. You
gain proficiency in Medicine, and you add your Intellect Die
to any Medicine checks you make.
During a long rest, you can spend 1-hour using a Healer's
Kit to produce a number of potions of healing equal to your
Intelligence modifier (minimum of 1).
These potions of healing become useless after 24 hours.
Marksmanship

Prerequisites: 4th-level Savant
You bring your intellect to bear in the use of ranged weapons.
You gain proficiency in Sleight of Hand, and you can add your
Intellect Die to any Sleight of Hand checks you make.
You also gain proficiency with all martial ranged weapons,
and whenever you make a ranged weapon attack, you can use
your Intellect Die in place of the weapon's damage die.
Finally, if your setting includes firearms, and your Savant
has been exposed to the inner workings of such devices, they
are considered proficient with simple and martial firearms.
Mercantilism

Prerequisites: 4th-level Savant
You are an astute scholar of economics, trade routes, and the
marketplace. You gain proficiency in Insight, and you can add
your Intellect Die to any Insight checks you make.
Also, while trading with a creature whose Intelligence and
Wisdom are both lower than your Intelligence score, all items
you purchase from the creature cost 10 percent less, and any
items you sell are purchased for 10 percent more than usual.
Musicianship

Prerequisites: 4th-level Savant
You have talent for music and song. You gain proficiency in
Performance and with one Musical Instrument, and you add
your Intellect Die to any checks you make with these skills.
Also, when you play a Musical Instrument or perform for
a creature for 1 minute or longer, you have advantage on any
ability checks you make to interact socially with that creature
for 1 hour. This benefit instantly ends if you or your allies do
anything harmful to the creature or to its allies.
Polymath

Prerequisites: 4th-level Savant
You have a knack for picking up new skills, though you may
not be a master of them all. Choose two of your skill or tool
proficiencies. You can add your Intellect Die to any checks
you make with those proficiencies.

[Página 6]
Additional Disciplines

At 3rd level, a Savant gains the Academic Discipline feature.
The following Academic Disciplines are available to Savants,
along with those presented with the base Savant Class:
Aristocrat

Philosopher

Culinarian

Rune Scribe

Orator

Virtuoso

Aristocrat

Your genius was nourished by the lavish education of nobility.
You had access to every tutor, library, and lesson that a mortal
mind could dream of, and you took every advantage. You now
combine your great intellect with the generational reputation
of your name, leveraging both to become a master of politics.
Student of High Society

3rd-level Aristocrat Discipline feature
You gain proficiency in History, Persuasion, and in one set
of Artisan's Tools of your choice. You can add your Intellect
Die to all checks you make with these proficiencies.
Your elite education also grants you one of these Scholarly
Pursuits, even though you do not yet meet their prerequisites:
Equestrianism, Linguistics, Mercantilism, or Traditions.
Inherited Wealth

3rd-level Aristocrat Discipline feature
Your family name has a great fortune associated with
it, and as you rise in stature and influence, you are able
to draw on its great coffers. You gain 300 gold. This is a
one-time benefit, and you must withdraw it from a bank
or similar institution in a Settlement of appropriate size,
as determined by the DM.
Each time you gain a Savant level, you gain an additional
one-time sum of gold, which must be withdrawn in the same
way, equal to 100 times your current level in this class.
Uphold Reputation

3rd-level Aristocrat Discipline feature
Your family name comes with certain expectations that you
mustn't fail to meet. When you miss with an attack roll, or fail
an ability check or saving throw, you can choose to add your
Intellect Die to your result, possibly changing the outcome.
You can use this feature a number of times equal to your
Intelligence modifier (minimum of once). You regain one use
when you finish a short rest, and all uses after a long rest.
Aversion to Violence

7th-level Aristocrat Discipline feature
Your true value lies in your connections and wealth, not your
ability to take a hit. When a creature you can see targets you
with an attack or spell, you can use a reaction to immediately
switch places with a conscious and willing creature within 5
feet. It becomes the target of the attack or spell in your place.
When you use this reaction, you can choose to grant the
creature you switch places with a number of temporary hit
points equal to your Intellect Die.
You can grant the temporary hit points a number of times
equal to your Intelligence modifier (a minimum of once), and
you regain all uses when you finish a short or long rest.

Well Connected

13th-level Aristocrat Discipline feature
You can leverage your family name's generational reputation,
connections, and finances to arrange powerful favors. While
you are in a Settlement, you can spend 1 hour arranging such
a favor. The scope of such a favor cannot exceed the effects of
a 7th-level spell, and this favor's gold value cannot exceed 500
times your Savant level.
For example, you might secure a rare material component
for a spell, the service of an elite mercenary company, access
to a forbidden library, or the loyalty of your enemy's servant.
Once you arrange such a favor, you cannot do so again until
you finish a long rest. However, you cannot arrange a favor in
that same Settlement until 1d4 days have passed.
Ascendant House

18th-level Aristocrat Discipline feature
Your reputation exceeds that of kings and emperors. All who
hear your words must obey. You can use Aversion to Violence
to switch places with a conscious and willing creature within
15 feet of you, or a conscious and unwilling creature within 5
feet of you. Unwilling creatures must make a Wisdom saving
throw to resist the effect. You cannot target your attacker.
Finally, you regain all expended uses of Uphold Reputation
whenever you finish a short or long rest.

[Página 7]
Culinarian

The Savants known as Culinarians put their great intellects
to work in the science of food and drink. Ever the adventurer,
they leave their kitchens behind, venturing out into the world
in a lifelong search for new wondrous and exotic ingredients.
What strange and exciting recipes will you come to discover?
Student of Flavor

3rd-level Culinarian Discipline feature
You gain proficiency in Nature, Sleight of Hand, and Cook's
Utensils, and you can add your Intellect Die to all checks you
make with these proficiencies.
Your culinary training and advanced palate also grant you
the following benefits:
So long as you have access to Cook’s Utensils and edible
ingredients, any creature that expends a Hit Die to regain
hit points during a short rest with you also regains bonus
hit points equal to your Intellect Die.
Cook's Utensils count as simple melee weapons with the
Finesse property for you. On hit, they deal Bludgeoning,
Piercing, or Slashing damage (depending on the utensil)
equal to your Intellect Die.
Over the course of 1 minute, you can use Cook's Utensils
to determine if food or drink has been poisoned or altered
in any way, including by magic, as if by a detect poison &
disease spell. You do not need to taste it to do so.
Culinarian's Cook Book

3rd-level Culinarian Discipline feature
You are compiling a Cook Book which contains the
exotic Recipes you discover during your adventures:
Recipes Known. You know two Recipes of your
choice from the list at the end of this Discipline.
Adding a Recipe. As an action, you can use your
Cook's Utensils to harvest a Sample of a creature
that has died within the last minute.
Before the end of your next long rest, you must
spend 1 hour (which can be during a rest), using
Cook's Utensils and that Sample to experiment,
adding the Recipe from the end of this Discipline
which corresponds to the Sample's creature type
to your Cook Book.
Preparing a Morsel. At the end of each short or
long rest, you can use your Cook's Utensils to prepare
a number of Morsels equal to your Intelligence modifier.
Each Morsel you prepare has the properties of one Recipe
of your choice from your Cook Book.
You don't need Samples from a creature corresponding
to a Recipe to prepare a Morsel with that Recipe. Morsels
you prepare lose their potency at the end of the next short
or long rest as they become inedible and bland.
Serving Morsels. As an action, any creature can eat a
Morsel, or feed it to a willing creature within its reach. A
creature that eats a Morsel gains the benefits detailed in
the Recipe description. A creature can only benefit from
one Morsel at a time, and eating another Morsel instantly
ends any previous Morsel benefits.
Replacing a Cook Book. If your Cook Book is lost or
destroyed, you can spend 1 hour adding each of your old
Recipes to a new Cook Book from memory. You do not
need to rediscover any Recipes that were lost.

Cut Above

7th-level Culinarian Discipline feature
As an action, you can touch one of your Morsels with Cook's
Utensils and change it to a Morsel of another Recipe.
Also, when you use your action to eat or feed a Morsel to a
creature, you can make a weapon attack as a bonus action.
Improved Recipes

13th-level Culinarian Discipline feature
Your Recipes invigorate your allies along with their normal
benefits. A creature that eats one of your Morsels also gains
temporary hit points equal to your Savant level.
Master Culinarian

18th-level Culinarian Discipline feature
You are a master monster chef and can cook with anything,
anywhere. Over the course of 1 hour, which can be during a
short or long rest, you can use Cook's Utensils and any foods
to prepare a wondrous feast to feed yourself and a number of
other creatures equal to your Savant level.
If a creature spends 10 minutes eating its
meal, it is instantly cured of any poisons,
diseases, or any other hostile condition
that is effecting it, and for 24 hours, it
is immune to both the Frightened and
Poisoned conditions, and it adds your
Intellect Die to any ability checks or
saving throws it makes that use its
Wisdom or Constitution.

[Página 8]
Culinarian Creature Recipes

Viscous Morsel

Invigorating Morsel

Aerial Morsel

The following Recipes are available for Culinarian Savants to
learn. To learn a Recipe, you must use a Sample that matches
the creature type listed. If a Recipe has a prerequisite Savant
level, you can learn as soon as you meet the level prerequisite.
Sample: any Beast without a flying or swimming speed
The creature that eats this Morsel regains hit points equal
to your Intellect Die + your Intelligence modifier.
Limbering Morsel

Sample: any Beast with a flying speed
For 1 hour, the creature gains a bonus to its initiative rolls
equal to your Intelligence modifier (minimum of +1), and its
walking speed increases by 10 feet.
Monstrous Morsel

Sample: any Monstrosity of CR 1 or higher
For 1 hour, the creature gains the "Change Appearance" or
"Natural Weapons" benefit from the alter self spell.
Subterranean Morsel

Sample: any Beast with a burrowing speed
For 1 hour, the creature gains Darkvision out to 60 feet. If a
creature already has Darkvision, its radius grows by 30 feet.
Thalassic Morsel

Sample: any Beast with a swimming speed
For 1 hour, the creature gains a swimming speed equal to its
walking speed, and it can hold its breath for up to 10 minutes.
Verdant Morsel

Prerequisite: 7th-level Savant
Sample: any Ooze of CR 1 or higher
For 1 hour, when the creature takes Acid, Lightning, Poison,
or Slashing damage, it can reduce the damage by an amount
equal to your Intelligence modifier (minimum of 1 damage).
Prerequisite: 13th-level Savant
Sample: any Air Elemental of CR 1 or higher
For 1 hour, the creature can take the Dash action as a bonus
action on each turn, and it can hold its breath indefinitely.
Aqueous Morsel

Prerequisite: 13th-level Savant
Sample: any Water Elemental of CR 1 or higher
For 1 hour, the creature can breathe both air and water, gains
a swimming speed equal to its walking speed, and can use its
reaction to turn a critical hit into a normal hit.
Ignan Morsel

Prerequisite: 13th-level Savant
Sample: any Fire Elemental of CR 1 or higher
For 1 hour, the creature gains Resistance to Fire damage and
Immunity to both the Charmed and Frightened conditions.
Terran Morsel

Prerequisite: 13th-level Savant
Sample: any Earth Elemental of CR 1 or higher
For 1 hour, the creature gains Tremorsense out to a 15-foot
radius, and it gains Resistance to non-magical Bludgeoning,
Piercing, and Slashing damage.

Sample: any Plant of CR 1 or higher
The creature is instantly cured of the following conditions:
Blinded, Deafened, Paralyzed, Petrified, Poisoned, a reduction
to an ability score, or a reduction to its hit point maximum.

Celestial Morsel

Draconic Morsel

Infernal Morsel

Prerequisite: 7th-level Savant
Sample: any Dragon of CR 1 or higher
For 1 hour, the creature gains Resistance to the damage type
dealt by the Sample dragon's breath weapon attack.
You can create a unique Recipe in your Cook Book for each
different type of Dragon you have harvested a Sample from.
Psionic Morsel

Prerequisite: 7th-level Savant
Sample: any Aberration of CR 1 or higher
For 1 hour, the creature can communicate telepathically with
any creature within 30 feet. However, in order to respond to
you, a creature must be able to speak at least one language.
Titanic Morsel

Prerequisite: 7th-level Savant
Sample: any Giant of CR 1 or higher
For 1 hour, the creature grows in size to become the size of
the Sample giant. While it is enlarged, it must concentrate on
this effect as if it were concentrating on a spell. Moreover, the
creature gains a bonus to its ability checks and saving throws
that use its Strength equal to your Intelligence modifier.
You can create a unique Recipe in your Cook Book for each
different Giant you have harvested a Sample from.

Prerequisite: 18th-level Savant
Sample: any Celestial of CR 1 or higher
For 1 hour, the creature manifests a pair of ethereal angelic
wings which grant it a flying speed equal to its walking speed.
Prerequisite: 18th-level Savant
Sample: any Fiend of CR 1 or higher
For 1 hour, the creature has advantage on any saving throw
it is forced to make to resist a spell and other magical effects.
Sylvan Morsel

Prerequisite: 18th-level Savant
Sample: any Fey of CR 1 or higher
For 1 hour, the creature can use a bonus action on each turn
to teleport up to 30 feet to an unoccupied space it can see.
Creating your own Recipes
Part of the genius of a Culinarian is the creation of
custom signature Recipes. If you have an idea for a
Recipe based on a creature type that isn't included
here, work with your DM to design a suitable effect
based on the abilities of a creature of that type.
Whatever Recipe you design, its effects should
last for 1 hour and should be equal in power to the
other available Recipes that a Culinarian can add to
their Cook Book at that prerequisite level.

[Página 9]
Orator

Orators are true masters of linguistics and the
spoken word. These wordsmiths use nothing but
their wit and mastery of rhetoric to rebuff foes and
empower their allies. With utmost confidence, they
stride boldly into hostile situations, confident that
they can win anyone with their eloquence.
Unlike those who use their charm to cajole, Orators
embolden their allies and win over their enemies with
nothing but reasonable logic and convincing rhetoric.
Student of Logic

3rd-level Orator Discipline feature
You gain proficiency in both Deception and Persuasion, and
you add your Intellect Die to checks with both skills. You can
also use Intelligence, in place of Charisma, for Deception and
Persuasion checks.
Your mastery over words grants you the benefits below:
You master your choice of the Instruction, Riddles,
or Traditions Scholarly Pursuit, even if you do not
meet the normal level prerequisite for that Pursuit.
You learn to speak, read, and write a number of extra
languages equal to your Intelligence modifier.
Whenever you speak a language, you sound as if you
were a native speaker of that language.
Rhetorical Superiority

3rd-level Orator Discipline feature
Your mastery of various languages allows you to inspire,
dominate, and charm with words. You gain the rhetorical
abilities below, which can affect any creature, so long as
the target can both hear and understand you:
Convincing Conversation. If you spend at least 1 minute
talking with a creature that isn't Hostile toward you, you can
force it to unknowingly make a Wisdom saving throw. On a
failure, it is Charmed by you for 1 hour, or until you or your
allies do anything harmful to it or any of its allies.
You can only have one creature Charmed by this feature.
Charming another target ends this effect for all others.
Cutting Retort. When a creature you can see within 30
feet makes an attack, you can use your reaction to distract it
with a cutting remark. It must succeed on a Wisdom saving
throw or subtract your Intellect Die from its attack roll.
Once a creature succeeds on this Wisdom saving throw,
it is immune to the effects of this feature for 24 hours.
Invigorating Word. Immediately after another creature
that you can see within 30 feet takes damage, you can use
your reaction to grant it temporary hit points equal to your
Intellect Die.
Uplifting Remark. When another creature that you can
see within 30 feet fails an Intelligence, Wisdom, or Charisma
saving throw, you can use a reaction to allow it to roll again.
Iron Logic

7th-level Orator Discipline feature
Your masterful grasp of logic allows you to resist all but the
strongest mind-altering effects. You have advantage on any
saving throw you are forced to make to resist Enchantment
spells, and you are immune to the Charmed condition.
Moreover, when you use your Cutting Retort reaction, the
target takes Psychic damage equal to your Intellect Die.

Peerless Rhetoric

13th-level Orator Discipline feature
You can bend the masses to your will with your words. If you
speak to a group of creatures that can hear and understand
you for 1 minute, you can Inspire or Persuade a number of
creatures in that crowd equal to your Savant level, as detailed
below. You can use each of these abilities once between each
short or long rest:
Inspire. Creatures gain a number of temporary hit points
equal to your Savant level, and while they last, creatures have
advantage on saving throws to resist Enchantment spells and
gain Immunity to the Frightened condition.
Persuade. Creatures must make a Wisdom saving throw
or become Charmed by you for up to 24 hours as if by a mass
suggestion spell.
Master Orator

18th-level Orator Discipline feature
Your absolute mastery over the spoken word allows you to
bend all but the strongest creatures to your will. When you
force a creature to make a saving throw to resist one of your
Rhetorical Superiority abilities or Peerless Rhetoric, it has
disadvantage on the roll if both its Intelligence and Wisdom
scores are lower than your Intelligence score.

[Página 10]
Philosopher

Philosophy is considered by many to be the purest Discipline
a Savant can pursue. They expend their genius pondering the
deep questions of existence; the purpose of life, the nature of
the multiverse, and the relationships between mortal beings
and gods. Through the study of the multiverse, Philosophers
reach for perfect knowledge of the true nature of reality.
Student of Thought

3rd-level Philosopher Discipline feature
You gain proficiency in both Arcana and Religion, and you
add your Intellect Die to any checks with those skills.
Your grasp of reality also grants you the following benefits:
You add your Intellect Die to all checks to communicate
with creatures not native to the Material Plane.
You can learn the following Characteristics with Adroit
Analysis: current alignment, native plane of existence, or
its spellcasting ability and the level of its highest spell.
Words of Power

3rd-level Philosopher Discipline feature
In your study, you have learned to speak Words of Power that
were used to shape the multiverse. If your Focus is within 30
feet and can hear you, you can speak a Word of Power at it:
Confound. If your Focus makes an ability check or attack
roll, you can use a reaction to force it to make an Intelligence
saving throw. On a failure, it takes Psychic damage equal to
your Intellect Die and has disadvantage on that roll.
Disorient. As an action, you force your Focus to make a
Wisdom saving throw. On a failure, it takes Psychic damage
equal to your Intellect Die, and has disadvantage on the first
saving throw it makes before the start of your next turn.
Dread. As an action, you can force your Focus to make a
Wisdom saving throw. On a failure, it takes Psychic damage
equal to your Intellect Die, and it becomes Frightened of a
creature of your choice until the start of your next turn.
Halt. When your Focus attempts to move, you can use a
reaction to force it to make a Strength saving throw. On a
failure, it takes Psychic damage equal to your Intellect Die
and its speed is reduced to zero until the
start of your next turn.

Unwavering Focus

7th-level Philosopher Discipline feature
Your resolute sense of purpose bolsters your Words of Power.
You can speak Words of Power at any creature that can hear
you within 30 feet, not just your Focus.
Also, when a creature fails its saving throw against a Word
of Power, the number of Intellect Dice of Psychic damage it
takes increases to two. It increases again at certain Savant
levels: at 13th level (three), and finally at 18th level (four).
Supreme Understanding

13th-level Philosopher Discipline feature
Your ever-deepening understanding of the nature of reality
grants you knowledge of more potent Words of Power. You
learn the Words of Power below, which can only be used
against your Focus. You can speak each of these Words of
Power once between each short or long rest:
Enfeeble. As an action, you force your Focus to make an
Intelligence saving throw or take Psychic damage equal to
three Intellect Dice and become Stunned for 1 minute.
It can choose to repeat this saving throw at the end of each
of its turns. On a success, this effect ends, but on a failure, it
takes Psychic damage as if it failed the initial save again.
Shunt. As an action, you can force your Focus to make a
Charisma saving throw. On a failure, it takes Psychic damage
equal to three Intellect Dice and is shunted from your current
plane for up to 1 minute. If it is native to the current plane, it
is banished to a harmless demiplane. If it isn't native to the
current plane, it is banished to its native plane.
It can choose to repeat this saving throw at the end of each
of its turns. On a success, it returns to the space that it was
shunted from, or the closest unoccupied space. On a failure,
it takes Psychic damage as if it failed the initial save again.
Master Philosopher

18th-level Philosopher Discipline feature
Your willpower rivals that of the most powerful extraplanar
beings. You are always under the effects of a protection from
evil & good spell.
Finally, you learn the most powerful Words of Power. Once
per long rest, you can speak a Word of Power that replicates
the effects of either power word: heal or power word: kill.

[Página 11]
Rune Scribe

Legends say that rune magic is the most ancient arcane art to
have been mastered by mortals. Savants who dedicate their
lives to the study of these Runes are known as Rune Scribes.
They learn all they can about these ancient sigils that embody
the magic of creation. The magic of runes isn't widely known,
and its secrets are jealously guarded by those who master it.
Student of Runes

3rd-level Rune Scribe Discipline feature
You gain proficiency with Arcana, History, and Calligrapher's
Supplies, and you can add your Intellect Die to ability checks
you make with these skills.
You also learn to speak, read, and write two of the following
Runic Languages, which are used to inscribe the Runes you
learn: Draconic, Druidic, Dwarvish, Giant, or Primordial.
Rune Carving

3rd-level Rune Scribe Discipline feature
You have learned the artful and ancient magic of Runes.
Runes Known. You learn two Runes of your choice from
the list at the end of this Discipline description. If a Rune has
a Savant level prerequisite, you must meet it to learn it. When
you gain a Savant level, you can replace one Rune you
know with another Rune which you could learn.
You learn one additional Rune of your choice at
7th, 10th, 13th, and 18th level in this class.
Inscribing Runes. Over the course of 1 hour, you
can use Calligrapher's Supplies to inscribe a Rune
you know into a weapon, suit of armor, or an object
which can be worn or held, choosing which Runic
language the Rune is inscribed in. The creature
that bears the Runic object gains all of the
benefits of that Rune.
Each Rune that you know can only be
inscribed in one object at a time. If you
inscribe the Rune again, any previous
inscriptions of the Rune are dispelled.
Invoking Runes. If the bearer of the
Runic object speaks the language the
Rune is inscribed in, it can Invoke it.
Once a Rune has been Invoked, it can
not be Invoked again until the Rune
Scribe finishes a long rest, even if it
is inscribed in a different object.
Runic Casting. You ignore the
Single Minded restriction of Adroit
Analysis if you cast and concentrate
on spells from Runes. Your Runes use the
following when making a spell attack roll:
Runic attack modifier = your Proficiency
Bonus + your Intelligence modifier
Elder Magicks

7th-level Rune Scribe Discipline feature
Your Runic objects count as magical for as long as
the Rune is inscribed. Also, during the course of a
short rest, you can perform a short 10-minute ritual
to reawaken the magic of a Rune that has already been
Invoked for the day. Then, it can be Invoked one more
time before the end of your next long rest.

Runic Ward

13th-level Rune Scribe Discipline feature
Your Runes offer a measure of protection to those that bear
them. If a creature bearing at least one of your Runic objects
is forced to make a saving throw to resist the effects of a spell
or another magical effect, they gain a bonus to their roll equal
to your Intelligence modifier (medium of +1).
Moreover, each time you finish a long rest, you can replace
one Rune you know with another Rune of your choice.
Master Rune Scribe

18th-level Rune Scribe Discipline feature
You can draw on the magic of your Runes to protect yourself
in times of great need. When you are reduced to 0 hit points
but not killed outright, you can draw on the power of a Runic
object within 60 feet of you, instantly dispelling the Rune and
any of its effects, and you fall to 1 hit point instead of 0.

[Página 12]
Runes

Listed below are the Runes available to Rune Scribe Savants:
Rune of Enchantment

Item: a bracelet, diadem, necklace, or ring
Creatures treat the bearer one stage friendlier than normal.
For example, Indifferent creatures treat them as Friendly, or
Hostile creatures treat them Indifferently. This ends instantly
if the bearer attacks the creature.
Invoking this Rune. As an action, can cast either the calm
emotions, charm person or command spell, against a number
of creatures equal to the Rune Scribe's Intelligence modifier.
Rune of Evocation

Item: a simple or martial melee weapon
On inscription, choose Acid, Cold, Fire, Poison, or Lightning
damage. This weapon deals bonus damage of the chosen type
equal to your Intellect Die on hit.
Invoking this Rune. When the bearer deals damage with
this weapon, it causes the attack to deal additional damage of
the imbued damage type equal to three Intellect Dice.
Rune of Illusion

Item: a cloak, robe, or suit of armor
As an action, the bearer can change its physical appearance
to that of a creature it has seen before, so long as it has the
same arrangement of limbs. The bearer can determine the
specifics, including race, coloration, hair length, sex, height,
and weight, but it cannot change its size. This illusion does
not affect clothing, equipment, or game statistics.
The illusion can be detected with a successful Intelligence
(Investigation) check vs. the Rune Scribe's Intellect save DC.
Invoking this Rune As an action, the bearer turns invisible
for 10 minutes, or until they attack or force a saving throw.
Rune of Necromancy

Item: a belt, ring, or suit of armor
As a bonus action, the bearer can grant itself temporary hit
points equal to the Rune Scribe's Intelligence modifier.
Invoking this Rune. When the bearer is reduced to 0 hit
points, but not killed outright, it falls to 1 hit point instead.

Rune of Abjuration

Prerequisite: 7th level Savant
Item: a cloak, robe, shield, or suit of armor
Once per turn, the bearer can reduce the damage from a spell
or magical effect by the Rune Scribe's Intelligence modifier.
Invoking this Rune. When a creature within 30 feet of the
bearer casts a spell, the bearer can use a reaction to force the
spellcaster to make a Constitution saving throw. On a failure,
the triggering spell fails and has no effect.
Rune of Conjuration

Prerequisite: 7th-level Savant
Item: a belt, cloak, ring, or suit of armor
As an action, the bearer expends any amount of its remaining
movement speed to instantly teleport to an unoccupied space
it can see within that distance.
Invoking this Rune. As an action, the bearer can force two
creatures it can see within 60 feet to make a Charisma saving
throw. They can choose to fail. If both fail, they switch places.
Rune of Divination

Prerequisite: 13th-level Savant
Item: a wand, staff, robe, or spellcasting focus
The bearer can use the object as a Spellcasting Focus to cast
the comprehend languages, detect magic, and identify spells
as Rituals, without the normal material components.
Invoking this Rune. As an action, the bearer empowers its
vision for 1 hour, gaining Truesight out to a 120-foot radius.
Rune of Transmutation

Prerequisite: 13th-level Savant
Item: a bracelet, diadem, ring, or necklace
The bearer gains its choice of a 30-foot swimming speed, a
30-foot climbing speed, or has its walking speed increased by
10 feet. As a bonus action, the bearer can switch its current
benefit for another from the above list.
Invoking this Rune. As an action, the bearer transforms
itself into a Beast with a CR equal to the Rune Scribe level or
lower, but otherwise using the rules of the polymorph ll spell.
However, this transformation does not require concentration.

[Página 13]
Virtuoso

Bending their impressive intellect toward the study of music,
Virtuosos are known for the impressively complex music they
write and perform. These masterful composers know how to
manipulate the emotions of their listeners with themes, and,
with the right sequence of notes, they can fill a listener with
feelings of sorrow, anger, indifference, or absolute adoration.
Student of Music

3rd-level Virtuoso Discipline feature
You gain proficiency in Insight, Performance, and
three Musical Instruments of your choice. When
you make an ability check with these skills or any
Musical Instrument, you add your Intellect Die to
your roll. You can also use your Intelligence, in place
of Charisma, for Performance checks.
Moreover, if you spend 1 hour practicing with a Musical
Instrument, you gain proficiency with it. However, only one
Instrument can benefit from this feature at a time.
Wondrous Theme

3rd-level Virtuoso Discipline feature
You have composed powerful Themes that stir the hearts of
any creature who can hear them. As an action, you can begin
to play your Theme using a Musical Instrument that you are
proficient with. Your Theme continues until the start of your
next turn, unless you choose to end it (no action required).
It can be heard up to 120 feet away, but it only influences
creatures within 30 feet of you who can hear it.
On subsequent turns, you can use your bonus action to
continue the Theme, without interruption for another turn.
While performing your Theme, you can use your reaction to
alter its sound in the following ways:
Discordant Note. When a creature under the influence
of your Theme attacks another target you can see, you can
use a reaction to play this Note, and subtract your Intellect
Die from its attack roll, possibly causing it to miss.
Inspiring Tune. When a creature under the influence of
your Theme takes damage from a source you can see, you
can use a reaction to play this Tune, reducing the triggering
damage by your Intellect Die.
Raucous Assault. When a creature enters or starts its turn
under the influence of your Theme, you can use a reaction to
force it to make a Constitution saving throw. On a failure, it
takes Thunder damage equal to two Intellect Dice.
Uplifting Melody. When a creature under the influence of
your Theme makes a saving throw to resist being Charmed,
Frightened, Incapacitated, or Stunned, you can use a reaction
to play this Melody to have it automatically succeed.
Disarming Melody

7th-level Virtuoso Discipline feature
You weave threads of disarming music through your Theme.
When a creature under the influence of your Theme attacks
you, it must first make a Wisdom saving throw. On a failure, it
must attack another target of its choice within range. If there
isn't another target, its attack misses. Creatures that succeed
on this saving throw are immune to this effect for 24 hours.
In addition, whenever you use your action to begin your
Theme or your bonus action to continue the Theme, you can
force a creature under the influence of your Theme to make a
saving throw against Raucous Assault.

Empowered Theme

13th-level Virtuoso Discipline feature
The complexity and beauty of your Theme has increased.
Creatures within 60 feet of you are under the influence of
your Theme so long as they can hear it.
Also, when you use a Wondrous Theme reaction, you can
grant another creature under the influence of your Theme
temporary hit points equal to your Intelligence modifier.
Shrill Assault

13th-level Virtuoso Discipline feature
You can empower the music of your Theme to inflict auditory
pain upon your foes. The Thunder damage dealt by Raucous
Assault increases to three Intellect Dice. Moreover, whenever
a creature fails the saving throw, you can reduce the Thunder
damage by one Intellect Die to cause it to become Deafened
until the start of your next turn.
At 18th level, this damage increases to four Intellect Dice.
Master Virtuoso

18th-level Virtuoso Discipline feature
Your musical genius and the complexity of your compositions
grant your Theme supernatural qualities. All creatures within
range of your Theme are considered to be under its influence
even if they cannot hear or are Deafened.
Finally, once per short or long rest when you use an action
to begin your Theme, you can force creatures of your choice
under the influence of your Theme to make the saving throw
against Raucous Assault.

[Página 14]
Savant Expanded
A multitude of additional options for the Savant!
Includes Roleplaying Quirks, Feats, Magic Items,
Scholarly Pursuits, and six Academic Disciplines:
Aristocrat - Culinarian - Orator
Philosopher - Rune Scribe - Virtuoso
Version 5.6.1 - Created by /u/laserllama
Last Updated: September 6th, 2026
Artist Credits:
Covers - Lie Setiawan - Founder of Lat-Nam
Page 1 - Titus Lunter - Silverquill Campus
Page 2 - Justine Cruz - Kalain, Reclusive Painter
Page 3 - Gabi Vitoria - Artifact Collector
Page 4 - Matt Stewart - Research Desk
Page 5 - Justyna Gil, Ageless Innovator
Page 6 - Alix Branwyn - Cabaretti Caterer
Page 8 - Lake Hurwitz - Garrulous Sycophant
Page 9 - Eric Deschamps - Esteemed Speaker
Page 10 - Svetlin Velinov - Story Seeker
Page 11 - Svetlin Velinov - Graven Lore
Page 12 - Paul Canavan - Harmonic Prodigy
The original Savant Class can be found Here
Additional laserllama Homebrew content
can be found for free on GM Binder.
Support me on Patreon to unlock exclusive
Academic Disciplines for the Savant:
Engineer - Mechanist - Occultist
Tinker - Voyager
