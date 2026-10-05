# Encargo: Lote 32b (Illrigger Revised) de la app "Mi turno"

"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el formato de
abajo, lo que se pide, usando **solo el texto en inglés que viene al final**: material de la comunidad (MCDM, Matt Colville (reglas 2014)), no oficial de
Wizards. Esta es la parte 2 de 3 de este material. Otra persona revisa y aplica tu respuesta con un script, así que el formato tiene que
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
JSON `{ "clave": "Illrigger Revised (MCDM)" }` para la clase y cada subclase.
=== D ===
JSON `{ "clave": "1 o 2 frases que presenten la clase o subclase" }`.
=== E ===
Dudas, cortes de texto o [NO CONFIRMADO].

## Texto fuente (Illrigger Revised (MCDM))

[Página 23]
Turncoat. As an action, you wield your mani­
pulative tongue against your enemies. You
choose a number of enemy creatures up to your
proficiency bonus within 60 feet of you who
can hear you. Each target must succeed on a
Charisma saving throw or use their reaction to
make a weapon attack against a single target of
your choice. A creature affected by this feature
can’t attack themself.

illrigger level. If this attack misses or this saving
throw fails, the creature has disadvantage on the
next attack roll or saving throw they make. This
disadvantage can’t be canceled out with advantage
in any way. A creature can strike only one deal with
you at a time.
You can use this feature a number of times equal
to your proficiency bonus. You regain any expended
uses when you finish a long rest.

Moloch’s Interdiction

Quid Pro Quo

7th-Level Hellspeaker Feature
You learn the following additional interdict boons
at the noted illrigger levels. Once you learn an
interdict boon granted by this feature, you always
know it, and it doesn’t count against the number of
interdict boons you know.
Red Cant (7th Level). When you make a
Charisma check, you can expend a seal to treat a
d20 roll of 9 or lower as a 10.
Slippery Ploy (13th Level). When a creature
targets you with an attack, spell, or other magical
effect, you can place a seal on them as a reaction
and force the creature to make a Charisma saving
throw. On a failed save, the creature must choose a
new target or lose the attack or effect.
Incontrovertible (18th Level; Passive).
Interdicted creatures have disadvantage on Wisdom
and Charisma saving throws.
11th-Level Hellspeaker Feature
You and each creature of your choice within 10 feet
of you are immune to the charmed condition while
you are conscious.

15th-Level Hellspeaker Feature
You can whisper to the legions of Hell, ensnaring
enemies and calling allies. As an action, you can
attempt to banish a creature you can see within
30 feet of you. The target must succeed on a
Charisma saving throw. On a failed save, the target
is banished to the wastes of Hell for 1 minute, after
which they return to the unoccupied space nearest
to the one they left. A target banished in this way
can repeat the saving throw at the end of each of
their turns, ending the effect early on a success.
A creature who succeeds on a saving throw against
this effect becomes immune to your Quid Pro Quo
for 24 hours.
Additionally, when a target is banished in this
way, a devil jurist (from MCDM’s Flee, Mortals!)
or a horned devil (from the core rules) appears
in their place. This devil acts as an ally to you and
follows your commands until the banished creature
is no longer banished, at which time the devil
disappears.
Once you successfully banish a creature in this
way, you can’t use this feature again until you finish
a long rest.

Let’s Make a Deal

Painkiller

Intransigent

11th-Level Hellspeaker Feature
You can offer your allies a deal—at a price, of
course. As a bonus action, you choose one willing
ally within 60 feet of you who can hear you.
Once within the next 10 minutes, the creature
can choose to gain advantage on one attack roll
or saving throw they make and can add a bonus
equal to your proficiency bonus to the same roll.
If this attack hits or this saving throw succeeds, the
creature gains temporary hit points equal to your

The heavily armored death troopers of Hell, Painkillers
serve Dispater, leading from the front of every major
infernal battle.
Dispater rules Dis, the City of War. When Hell
invades another world, Dispater’s army does the
fighting and dying. His Painkillers are master
strategists who lead from the front, inspiring terror
and awe in their soldiers. The imperious Painkillers
are full of pride and hubris, and they often obsess
over their personal appearance.

23

[Página 24]
Invoke Hell

Though among the most chivalrous of the
illriggers, a Painkiller’s gallantry is twisted. They
accept and honor challenges to single combat, and
swiftly punish any who try to interfere—but if losing,
they don’t hesitate to cheat, and if winning, they
arrogantly toy with an enemy before finishing them.
In a moment of weakness or desperation, a ruler
in another world might see their army facing certain
defeat and call on Dispater. Ever eager to sow
strife and discord, Dispater often responds to these
pleas by sending a Painkiller to lead the desperate
ruler’s armies.

3rd-Level Painkiller Feature
You gain the following two Invoke Hell options:
Grand Strategist. You can order your allies
to follow your formation (no action required).
Choose one or more creatures within 60 feet
of you who can hear you, up to a number of
creatures equal to your proficiency bonus. Each
target can immediately move up to half their
speed without provoking opportunity attacks.
Punishment. When a creature damages you with
an attack, you can use your reaction to force
the attacker to make a Wisdom saving throw.
On a failed save, the attacker takes necrotic
damage equal to the damage they dealt you with
the triggering attack. On a successful save, the
attacker takes half as much damage.

Precepts of Pride

Dispater’s heavy shock troops must be effective
battlefield commanders and quickly dispatch
enemies. Painkillers follow precepts instructing
them to lead Hell’s armies and wage war against
Good across the timescape.
Lead from the Front. I charge in at the front
of every battle, inspiring my soldiers and terrifying
my enemies.
Commander. Wherever I go, I command.
I don’t take orders from those who don’t have the
will to lead.
Victory at Any Cost. I respect the enemy
leader and treat them honorably. But once swords
are drawn, I use every trick in my arsenal to win,
expecting them to do the same.
Soldiers Die. I care not for the lives of my
soldiers, for they are resources I spend to secure
my victory.

Dispater’s Interdiction
7th-Level Painkiller Feature
You learn the following additional interdict boons
at the noted illrigger levels. Once you learn an
interdict boon granted by this feature, you always
know it, and it doesn’t count against the number of
interdict boons you know.
Telekinetic Seal (7th Level). When a creature
you can see moves within 5 feet of you, you can use
your reaction to place a seal on them. When you do,
the target must succeed on a Wisdom saving throw
or be either pushed back 15 feet or knocked prone
(your choice).
By the Throat (13th Level). When you use a
bonus action to place or move a seal on a creature
who is no more than one size larger than you, they
must succeed on a Wisdom saving throw or be
restrained until the end of their next turn.
Dispater’s Supremacy (18th Level; Passive).
Your attacks against interdicted creatures score a
critical hit on a roll of 18 through 20.

Dispater’s Blessing
3rd-Level Painkiller Feature
When Dispater accepts you as his illrigger, you gain
proficiency with heavy armor.

Devastator
3rd-Level Painkiller Feature
As an action, you invoke the authority of Dispater.
You make a weapon attack and choose a number of
willing creatures up to your proficiency bonus who
you can see within 30 feet of you. Each creature you
choose can use a reaction to make a weapon attack
or cast a damage-dealing cantrip with a casting
time of 1 action.
Once you use this action, you can’t use it again
until you finish a short or long rest.

You Die on My Command!
11th-Level Painkiller Feature
When an ally within 30 feet of you who can hear
you drops to 0 hit points without being killed
outright, you can use your reaction to shout an
order at them, causing them to drop to 1 hit point
instead. Once you use this reaction, you can’t do so
again until you finish a short or long rest.

24

[Página 25]
Deathstrike
15th-Level Painkiller Feature
When you hit an interdicted creature with a melee
weapon attack, you can use your reaction to burn
one of the seals on them to turn the hit into a critical
hit. When you do, you also double the damage dice
you roll for the burned seal.
You can use this reaction a number of times
equal to your proficiency bonus, and you regain all
expended uses when you finish a long rest.

Sanguine Knight
The blood-knights of Hell, Sanguine Knights serve
Sutekh, Lord of Blood. Their sorceries drain their
enemies’ life force, pouring this stolen vitality into
infernal rituals to turn the tide of battle.
Content Warning
This subclass deals with manipulating another creature’s
blood. Before choosing this subclass, please ensure
everyone at your table is comfortable with this concept.
And as always, we encourage the ongoing use of safety
tools throughout your game.

Sutekh rules Naraka, the City of Blood. Recognized
as the greatest sorcerer in hell, he carries the title
of High Sanguinary and rules from the Temple
of Vitality. He is a master of blood magic, and
his inner circle of priests and wizards are the
Bloodliches, undead spellcasters whose corporeal
forms turned to ash centuries ago and whose bodies
are crafted from solid blood.
Sutekh’s illriggers all belong to a cult known as
the Chalice of Vitality. Knights of the Chalice drink
deeply of their enemies’ essence, draining it to power
their magics. Other members of the Order of
Desecration fear that the Sanguine Knights
seek more than Sutekh’s mere ascension to
the Throne of Hell; some whisper that the
Chalice secretly schemes to make Sutekh
a god. This would, of course, be treason.

Sanguine
Knight

Precepts of Blood

Sanguine Knights swear an oath to
Sutekh when they join the Order of
Desolation. These tenets swear them to
wield profane blood magic, commanding
loyalty and inflicting terror.

25

[Página 26]
Their Strength Is Their Weakness. I target
the strongest of my foes, for their vitality shall feed
my victory.
Sin Demands Suffering. Opposing me is
heresy. Before my enemies taste defeat, they must
pay for their unbelief with agony.
Loyalty Rewarded. My boons lead my allies
to depend on me—and on the bloodshed that
empowers me.
Mercy Is Power. In granting succor to my allies,
I prove how great my power is. Each time I restore
life, it serves as a reminder of how quickly I can
strip it away.

Vitalize. You can flood your allies with
invigorating vivacity (no action required). For
1 minute, each creature of your choice within
30 feet of you gains a bonus to ability checks equal
to your proficiency bonus.

Sutekh’s Interdiction
7th-Level Sanguine Knight Feature
You learn the following additional interdict boons
at the noted illrigger levels. Once you learn an
interdict boon granted by this feature, you always
know it, and it doesn’t count against the number of
interdict boons you know.
Foul Interchange (7th Level). As an action,
you choose a creature you can see within 30 feet of
you and expend a seal to end one of the following
conditions afflicting them: blinded, charmed,
dazed, deafened, frightened, paralyzed, or poisoned.
Another creature you can see within 60 feet of you
must succeed on a Constitution saving throw or
suffer that same condition until the end of your next
turn. If that creature is immune to the condition,
they don’t suffer the condition, but the condition
ends for the original creature.
Sanguine Gift (13th Level). When a creature
you can see within 30 feet of you regains hit points,
you can expend a seal (no action required) and the
creature regains additional hit points equal to your
illrigger level.
Blood for Blood (18th Level; Passive).
Whenever an ally takes damage from an interdicted
creature, that interdicted creature takes necrotic
damage equal to your proficiency bonus.

Exsanguinate
3rd-Level Sanguine Knight Feature
You can drain enemies to embolden your allies.
Whenever you burn one or more seals on a creature
who isn’t a Construct or Undead, you can choose
an ally you can see within 30 feet of you. That ally
gains temporary hit points equal to the damage
dealt by the seals to the interdicted creature.

Sutekh’s Blessing
3rd-Level Sanguine Knight Feature
When Sutekh accepts you as his illrigger, he grants
you access to his sacrilegious command of blood
and life. You gain proficiency in the Religion skill.
In addition, as an action, you can expand your
awareness of life around you. Until the end of your
next turn, you can sense creatures who have blood
within 120 feet of you without having to see them.
This ability can penetrate most barriers, but is
blocked by 1 foot of stone, 1 inch of common metal,
a thin sheet of lead, or 3 feet of wood or dirt. You
know the distance and direction of each creature,
as well as the creature’s type. You can use this
feature a number of times equal to your proficiency
bonus, and you regain all expended uses when you
finish a long rest.

Bloodstroke
11th-Level Sanguine Knight Feature
The magic that shields your allies now also saps
their enemies’ strength. When an ally who has
temporary hit points from your Exsanguinate
feature is hit by a melee attack, the attacker takes
cold, fire, or necrotic damage (your choice) equal
to your illrigger level.

Invoke Hell
3rd-Level Sanguine Knight Feature
You gain the following two Invoke Hell options:
Embolden Allies. As a bonus action, you restore
a total number of hit points equal to five times
your illrigger level, divided however you choose
between yourself and other creatures within
30 feet of you.

Haemal Exchange
15th-Level Sanguine Knight Feature
You have mastered the ability to enervate enemies
and endow allies. When an interdicted creature
within 60 feet of you makes an attack roll or saving

26

[Página 27]
Marked for Death

throw, you can use your reaction to burn one of the
seals on them and transfer their power. The target
must roll a d8 and subtract the number rolled from
the triggering attack roll or saving throw.
You then empower an ally within 30 feet of you.
The next time that ally makes an attack roll or
saving throw, they roll a d8 and add the number
rolled to the attack roll or saving throw.

3rd-Level Shadowmaster Feature
You are particularly skilled against foes you
mark for death. You have advantage on your first
attack against an interdicted creature on each of
your turns.

Strike from the Dark
3rd-Level Shadowmaster Feature
You understand the power of striking from
the shadows. Once per turn, when you hit an
interdicted creature with a melee weapon attack
and you have advantage on the attack roll, you can
roll a number of d4s equal to your proficiency bonus
and deal extra damage equal to the total you rolled.
This damage increases by 1d4 if the target is in dim
light or darkness.

Shadowmaster
The hidden assassins of Hell, Shadowmasters serve
Belial and excel at stealth and disguise.
Belial rules Gehennom, the City of Darkness. He
strives to rule Hell through poison, torture, and
assassination. His illriggers strike from the shadows
or use deception to earn high-ranking positions
close to powerful rulers. Many Shadowmasters run
networks of spies and assassins who have no idea of
the infernal provenance of their leader.
Shadowmasters are sworn not to reveal their
true allegiance, and if need be, they must take their
own lives to fulfill this oath. Many Shadowmasters
prepare elaborate plans for their own assassination
so that, should they risk discovery, their
assassination obscures the truth. Of course,
these killers never learn they were hired by their
deceased target.

Invoke Hell
3rd-Level Shadowmaster Feature
You gain the following two Invoke Hell options:
Master of Disguise. As an action, you can cast the
disguise self spell without expending a spell slot.
No Escape. As a bonus action, you can call on the
shadows to entrap a creature you can see within
30 feet of you. The target must make a Charisma
saving throw, made with disadvantage if they are
in dim light or darkness. On a failed save, the
target’s speed is halved and they can’t willingly
move more than 30 feet away from you. This
effect ends for the target if you are incapacitated
or die or if the target is more than 30 feet away
from you.

Precepts of Shadow

Shadowmasters swear an oath to Belial when
they join the Order of Desolation. These precepts
commit them to serve Belial’s foes as allies before
revealing themselves as enemies.
Plans Within Plans. My enemies must never
discover my true goals. If needed, I will sacrifice
myself to protect my schemes.
Positions of Power. I control everything from
the shadows by knowing who to deceive and where
to hide in plain sight.
Power in Patience. I study my enemy and
methodically build their trust. My loyalty must
be unquestionable so my inevitable betrayal is
unthinkable.
Hesitation Is Failure. Though I usually rely on
agents, when the opportunity presents itself, I can
unhesitatingly kill with efficiency and precision.

Belial’s Interdiction
7th-Level Shadowmaster Feature
You learn the following additional interdict boons
at the noted illrigger levels. Once you learn an
interdict boon granted by this feature, you always
know it, and it doesn’t count against the number of
interdict boons you know.
Veil of Lies (7th Level). As a bonus action, you
can expend a seal to become invisible for 10 minutes
or until you attack or cast a spell.
Hell’s Assassin (13th Level; Passive).
Whenever you roll a 1 or 2 on a die to determine the
damage of your seals or your weapon attacks against
interdicted creatures, you can reroll the die and
must use the new roll.

27

[Página 28]


[Página 29]
Dark Malediction (18th Level; Passive).
Interdicted creatures radiate darkness in a 10-foot
radius. Mundane sources of light can’t illuminate
this darkness, but creatures with darkvision can
see through it. If any of this darkness overlaps
with an area of light created by magic or psionics,
the overlapping area of darkness is illuminated by
the light.

Umbral Killer
11th-Level Shadowmaster Feature
Shadows are your companion, aiding you in your
exploits. You gain the following benefits:
• You gain darkvision out to 60 feet. If you already
have darkvision, its range increases by 60 feet.
• Your movement speed increases by 10 feet.
• You have advantage on Dexterity (Stealth) checks
made to hide. Whenever you make a Dexterity
saving throw to take only half damage from an
effect, you instead take no damage if you succeed
on the saving throw, and half damage if you fail.

The Power of Darkness
In testing, we found that many believed Dark
Malediction was intended to blind someone. While
this may certainly work on some enemies—or help
assassinate someone without being seen—the true
reason for this boon is so the Shadowmaster can
deal extra damage with their Strike from the Dark
and Doomed to the Shadows features. With Dark
Malediction, a Shadowmaster of 18th level or higher
deals 8d8 damage each turn against an interdicted
creature with their Strike from the Dark—not too
shabby!
As a bonus, this boon gives a creature disadvantage
on the saving throw for No Escape (an Invoke Hell
option), making it challenging for an assassination
target to escape.

Doomed to the Shadows
15th-Level Shadowmaster Feature
You have perfected your assassin’s strike. The
extra damage from your Strike from the Dark
feature increases to a number of d8s equal to your
proficiency bonus (instead of that number of d4s),
and you deal an extra 2d8 damage if the target
is in dim light or darkness (instead of an extra
1d4 damage).
In addition, when you deal damage using Strike
from the Dark, you can use your reaction to burn a
seal on the creature, causing them to be blinded for
1 minute instead of dealing the seal’s damage.

29

[Página 30]
Y

Interdict Boons

our Interdiction feature grants you access to
interdict boons, which are detailed below.
Some boons specify a minimum illrigger
level; the boons in the “7th-Level Interdict
Boons” section and the “13th-Level
Interdict Boons” section can’t be learned until you
are at least that level.

required). You conjure infernal chains to grasp the
target, forcing them to make a Strength saving
throw. On a failed save, you can either pull the
creature 10 feet toward you or cause them to be
grappled until the end of your next turn (escape
DC equal to your interdict save DC).
Conflagrant Channel. You can expend a seal
as a bonus action to teleport up to 60 feet to an
unoccupied space you can see.
Eyes of the Gate. As an action, you can expend
one or more seals to attempt to bind your awareness
to a creature you can see within 60 feet of you. The
target must make a Wisdom saving throw; they
can willingly fail this save. On a failed save, you
are bound to the target’s awareness for a number of
hours equal to the number of seals you expended,
or until you use this boon on another creature. For
the duration, while the target is within 300 feet of
you, you can use an action to see and hear through
their senses, gaining the benefit of any special senses
the target possesses, and you continue to do so until
you use your action to return to your normal senses.
While perceiving through the target’s senses, you
are deaf and blind with regard to your own senses.
Additionally, for the duration, you can place
seals, burn them, and use interdict boons as if you
were in the creature’s space, but doing so makes the
creature aware of this bond. An aware creature can
use their action to repeat the saving throw, ending
the effects of this boon on a success.
Shadow Shroud. You can expend a seal as
a bonus action to weave a mantle of semisolid
shadows around yourself or a creature you touch.
The target gains a +2 bonus to AC for 1 minute.
Unleash Hell. When you burn one or more
seals on an interdicted creature, you can use your
reaction to unleash an explosion of hellish energy
around them. Each creature of your choice within
5 feet of the target must make a Dexterity saving
throw. On a failed save, a creature takes the same
amount and type of damage as the seals dealt to the
interdicted creature. On a successful save, a creature
takes half as much damage.

2nd-Level Interdict Boons

You can choose from these boons when you gain the
Interdiction feature at 2nd level, or whenever you
gain a new boon.
Abating Seal. When a creature you can see
damages you or an ally within 30 feet of you,
you can expend a seal as a reaction to reduce the
damage taken by the target by an amount equal to
1d10 + half of your illrigger level (rounded down).
Bedevil. When you burn a seal on an interdicted
creature, you can activate this boon (no action
required). The target must subtract a number equal
to your proficiency bonus from the result of the
next saving throw they make before the end of their
next turn.
Soul Eater. When you burn a seal on an
interdicted creature, you can activate this boon (no
action required) to gain temporary hit points equal
to your illrigger level.
Styx’s Apathy. When you burn a seal on an
interdicted creature, you can use your reaction to
flood the target with an otherworldly chill. Until
the end of the target’s next turn, they can’t take
reactions.
Swift Retribution (Passive). When an
interdicted creature provokes an opportunity attack
from you, you can make that attack without using
your reaction, provided you’re not incapacitated.
Once you benefit from this boon, you can’t do so
again until the start of your next turn.

7th-Level Interdict Boons

When you reach 7th level, the following interdict
boons are added to your list of Interdiction options.
Acheron’s Chain. When you use a bonus
action to place or move a seal on a Large or smaller
creature, you can activate this boon (no action

30

[Página 31]
Vengeful Shot. When a creature makes a ranged
attack against you or an ally you can see within
30 feet of you, you can expend a seal as a reaction
to make a ranged weapon attack against the
attacker. If your attack hits, it deals extra damage
equal to half your illrigger level (rounded down).

point in their defenses. Until the end of your next
turn, the creature takes a penalty to AC equal to
your proficiency bonus.
Iron Gaol. As an action, you can touch a
creature and expend four seals to attempt to send
that creature to Hell. The target must succeed on a
Charisma saving throw or be pulled through a rift
into the prisons of your archfiend’s infernal city.
If the target is native to Hell, or if their level or
challenge rating is 4 or lower, they remain there and
must find their own way out. Otherwise, the target
remains in the prison for 1 minute, after which they
reappear in the space they left or in the nearest
unoccupied space available; this target can repeat
the saving throw at the end of each of their turns,
ending the effect early on a success.
Last Word. When you are reduced to 0 hit
points and have unplaced seals remaining, the
hellfire in you refuses to die. You can expend up
to 3 seals and release an explosion around you (no
action required). Roll 3d6 per seal expended. Each
creature of your choice within 30 feet of you must
make a Dexterity saving throw. On a failed save,
a creature takes fire damage equal to the total you
rolled. On a successful save, a creature takes half as
much damage. If this explosion damages at least one
creature, you regain a number of hit points equal to
the total you rolled.
Soul’s Doom. When you use a bonus action
to place or move a seal, you can scorch the seals
into the target’s soul. For 1 minute, whenever that
interdicted creature takes damage, they take extra
damage equal to your proficiency bonus.

13th-Level Interdict Boons

When you reach 13th level, the following interdict
boons are added to your list of Interdiction options.
Dis’s Onslaught (Passive). Each time you use a
bonus action to place or move a seal, you can make
one weapon attack as part of the same bonus action.
Flash of Brimstone. When you place or move a
seal, you can activate this boon (no action required)
to magically teleport to an unoccupied space you
can see within 5 feet of the target.
Hellish Frenzy. When you start your turn
within 30 feet of an interdicted creature, you can
expend a seal to become frenzied by the power
of Hell until the start of your next turn. While
frenzied, your movement speed is doubled, you have
a +2 bonus to your AC, and you can make an extra
weapon attack when you take the Attack action.
Hellsight. You can expend a seal as an action to
gain truesight out to 60 feet for 1 hour.
Impaling Shot. When you hit an interdicted
creature with a ranged weapon attack, you can
expend a seal as a bonus action to create a weak

31

[Página 32]
New Spells
The following spells are new and available to the
Architect of Ruin. If your GM agrees, these spells
are also available to the classes noted in each spell
description.

aura moves with you, centered on you. Whenever
creatures of your choice enter the area for the first
time on a turn or start their turn there, they must
make a Constitution saving throw. On a failed save,
a creature takes 4d6 necrotic damage and can’t
regain hit points until the start of their next turn.
On a successful save, a creature takes half as much
damage and suffers no other effect.

Aura of Desecration
4th-Level Abjuration
Casting Time: 1 action
Range: Self (30-foot radius)
Components: V
Duration: Concentration, up to 10 minutes
Classes: Cleric, paladin
Life-defiling energy radiates from you in an aura
with a 30-foot radius. Until the spell ends, the

Hell’s Lash
1st-Level Evocation
Casting Time: 1 action
Range: 30 feet
Components: V, S, M (the forked tongue of a
serpent)
Duration: Concentration, up to 1 minute
Classes: Sorcerer, warlock, wizard
You lash a whip of crimson energy at a creature you
can see within range, creating a conduit between
you and the target. The target must succeed on a
Constitution saving throw or take 4d4 fire damage
and be tethered. A tethered creature takes 2d4 fire
damage at the beginning of each of their turns.
A tethered creature can repeat the saving throw at
the end of each of their turns, ending the effect on
a success.
For the duration, if the target is an interdicted
creature, you can use your reaction to burn one
of your seals on the creature. When you do, the
creature makes their next saving throw to end this
spell with disadvantage.
At Higher Levels. When you cast this spell
using a spell slot of 2nd level or higher, the initial
damage increases by 2d4 for each slot level above
1st, and the subsequent damage increases by 1d4
for each slot level above 1st.

32

[Página 33]
Hellfire

You imbue a weapon you touch with an infernal
blessing. Until the spell ends, the weapon
extinguishes any mundane sources of light in a
30-foot radius. In addition, attacks made with the
weapon deal an extra 2d6 necrotic damage on a
hit. If the weapon isn’t already a magic weapon, it
becomes one for the duration.
As a bonus action on your turn while holding
this weapon, you can end the spell early and cause
the weapon to emit a burst of dark energy. Each
creature of your choice who you can see within
30 feet of you must make a Wisdom saving throw.
On a failed save, a creature takes 4d6 necrotic
damage and is frightened for 1 minute. On a
successful save, a creature takes half as much
damage and isn’t frightened. At the end of each
of their turns, a frightened creature can make a
Wisdom saving throw, ending the effect on themself
on a success.

Evocation Cantrip
Casting Time: 1 action
Range: 120 feet
Components: V, S
Duration: Instantaneous
Classes: Sorcerer, warlock, wizard
You create an eruption of smoldering hellfire
around a creature you can see within range. The
target must succeed on a Charisma saving throw or
take 1d4 fire damage plus 1d4 necrotic damage.
At Higher Levels. Both of the spell’s damage
types increase by 1d4 when you reach 5th level
(2d4 each), 11th level (3d4 each), and 17th level
(4d4 each).

Infernal Challenge
2nd-Level Enchantment
Casting Time: 1 bonus action
Range: 30 feet
Components: V
Duration: Concentration, up to 1 minute
Classes: Paladin
You offer a creature a compelling challenge. If
you have no allies within 5 feet of you, choose one
creature within range who can see and hear you.
They must succeed on a Charisma saving throw
or answer your challenge and fight you. For the
duration, you gain a +2 bonus to AC, the target has
disadvantage on attack rolls against creatures other
than you, and the first time the target tries to move
away from you on a turn, they must succeed on a
Charisma saving throw or their speed becomes 0
until the start of their next turn.
This spell ends if you end your turn more than
30 feet away from the target.

Mote of Hell
3rd-Level Conjuration
Casting Time: 1 action
Range: 150 feet
Components: V, S, M (a piece of sulfur)
Duration: Concentration, up to 1 minute
Classes: Sorcerer, warlock, wizard
You manifest a pocket of Hell. A 15-foot-radius
sphere of darkness, brimstone, and blasting heat
appears, centered on a point within range and
lasting for the duration. The cloud of hellfire echoes
with the cries of damned souls that can be heard by
creatures within 30 feet of it. No light, even magical
light, can illuminate the cloud, and any creatures
fully within that area are blinded.
The cloud warps the timescape, making the
cloud’s area difficult terrain. A creature who starts
their turn in that area takes 3d6 fire damage. A
creature who ends their turn in that area must
succeed on a Wisdom saving throw or take 3d6
psychic damage as the voices of the damned
crowd their mind.

Maligned Weapon
4th-Level Evocation
Casting Time: 1 bonus action
Range: Touch
Components: V, S
Duration: Concentration, up to 1 hour
Classes: Paladin

33

[Página 34]
Vengeful Blade

Wall of Death

Evocation Cantrip
Casting Time: 1 action
Range: Self (5-foot radius)
Components: S, M (a melee weapon worth at
least 1 gp)
Duration: Instantaneous
Classes: Sorcerer, warlock, wizard
You brandish the weapon used in the spell’s casting
and make a melee attack with it against one
creature within 5 feet of you. On a hit, the target
suffers the weapon attack’s normal effects and then
radiates a dark aura of energy until the start of your
next turn. If the target makes an attack or casts
a spell before then, the target takes 1d8 necrotic
damage and the spell ends.
This spell’s damage increases when you reach
certain levels. At 5th level, the melee attack deals
an extra 1d8 necrotic damage to the target on a
hit, and the damage the target takes for making
an attack or casting a spell increases to 2d8. Both
damage rolls increase by 1d8 at 11th level (2d8 and
3d8) and again at 17th level (3d8 and 4d8).

4th-Level Necromancy
Casting Time: 1 action
Range: 120 feet
Components: V, S, M (a chip of onyx)
Duration: Concentration, up to 1 minute
Classes: Druid, sorcerer, wizard
You create a wall of necrotic energy on a surface
within range. You can make a wall up to 60 feet
long, 20 feet high, and 1 foot thick, or can make a
ringed wall up to 20 feet in diameter, 20 feet high,
and 1 foot thick. The wall is opaque and lasts for the
duration. When the wall appears, each creature in
its area must make a Constitution saving throw. A
creature takes 4d8 necrotic damage on a failed save,
or half as much damage on a successful one.
One side of the wall, selected by you when you
cast this spell, deals 4d8 necrotic damage to each
creature who ends their turn within 10 feet of that
side or inside the wall. A creature takes the same
damage when they enter the wall for the first time
on a turn or end their turn there. The other side of
the wall deals no damage.
Whenever a creature takes damage from the
wall, you can use your reaction to gain temporary
hit points equal to the amount of damage dealt.

34

[Página 35]
Retainers
Rules for retainers appear in the “Retainers”
section of Flee, Mortals! Using those rules, you can
add the following illrigger retainers to your game.

Bloodletter
(Sanguine Knight)

Agent (Shadowmaster)

Armor Class 15 (medium armor)
Hit Points Eight times their level (number of d10 Hit Dice
equal to their level)
Speed 30 ft.

Medium Humanoid, Any Alignment

Medium Humanoid, Any Alignment

Armor Class 15 (medium armor)
Hit Points Seven times their level (number of d8 Hit Dice
equal to their level)
Speed 30 ft.
STR
10 (+0)

DEX
16 (+3)

CON
10 (+0)

INT
10 (+0)

WIS
10 (+0)

STR
16 (+3)

DEX
10 (+0)

CON
10 (+0)

INT
10 (+0)

WIS
10 (+0)

CHA
14 (+2)

Saving Throws +PB to all
Skills Intimidation +2 plus PB, Medicine +0 plus PB
Senses passive Perception 10
Languages Common, Infernal
Proficiency Bonus (PB) equals the mentor’s bonus

CHA
14 (+2)

Saving Throws +PB to all
Skills Acrobatics +3 plus PB, Deception +2 plus PB,
Perception +0 plus PB, Stealth +3 plus PB
Senses passive Perception 10 plus PB
Languages Common, Infernal
Proficiency Bonus (PB) equals the mentor’s bonus

Signature Attack (Halberd). Melee Weapon Attack:
+3 plus PB to hit, reach 10 ft., one target. Hit: 1d10 plus
PB slashing damage. Beginning at 7th level, the bloodletter
can make this attack twice, instead of once, when they take
the Attack action on their turn.

Signature Attack (Daggers). Melee Weapon Attack:
+3 plus PB to hit, reach 5 ft. or range 20/60 ft., one target.
Hit: 2d4 plus PB piercing damage. Beginning at 7th level,
the agent can make this attack twice, instead of once,
when they take the Attack action on their turn.

FEATURES
3rd Level: Exsanguinate (3/Day). As an action, the
bloodletter makes a signature attack, then grants an ally
they can see within 30 feet of them PBd6 temporary
hit points.

FEATURES
3rd Level: Shadow Gate (3/Day). As a bonus action,
the agent teleports up to 30 feet to an unoccupied space
they can see. The next time the agent hits a creature with
a signature attack before the end of their next turn, the
attack deals an extra PB piercing damage.

5th Level: Rubescent Protector (3/Day). When an
ally the bloodletter can see within 10 feet of them is hit
with an attack, the bloodletter can use their reaction
to redirect the attack to themself, potentially causing
the attack to miss. If the attacker is within 10 feet of the
bloodletter, the bloodletter can then make a signature
attack against the attacker.

5th Level: Dark Strike (3/Day). As an action, the agent
makes a signature attack, then places infernal seals on the
target. The next time the target is hit by an attack, the seals
burn darkly, dealing an extra PBd6 necrotic damage to
the target.

7th Level: Fuilech (3/Day). When the bloodletter hits
a creature with a signature attack, they can use their
reaction to siphon the creature’s vitality. For 1 minute,
the bloodletter empowers up to three creatures they can
see within 30 feet of them (potentially including themself),
granting those creatures a bonus to saving throws equal
to half the bloodletter’s PB.

7th Level: Seal Fate (1/Day). As an action, the agent
makes two signature attacks against a creature. If one or
both attacks hit, the target’s speed is reduced to 0 and
the target has disadvantage on attack rolls until the end
of the agent’s next turn.

35

[Página 36]
Deceiver (Architect of Ruin)

7th Level: Mote of Hell (1/Day). As an action, the
deceiver manifests a pocket of Hell, creating a 15-footradius sphere of brimstone and darkness centered on
a point within 150 feet of them. That area becomes
difficult terrain. A creature who starts their turn in that
area or enters it for the first time on a turn takes PBd6 fire
damage. A creature who ends their turn in that area must
succeed on a DC 10 plus PB Wisdom saving throw or take
PBd6 psychic damage from the screams of the damned
in their mind.

Medium Humanoid, Any Alignment

Armor Class 13 (light armor)
Hit Points Seven times their level (number of d8 Hit Dice
equal to their level)
Speed 30 ft.
STR
10 (+0)

DEX
12 (+1)

CON
10 (+0)

INT
12 (+1)

WIS
10 (+0)

CHA
16 (+3)

Saving Throws +PB to all
Skills Arcana +1 plus PB, Deception +3 plus PB,
Persuasion +3 plus PB
Senses passive Perception 10
Languages Common, Infernal
Proficiency Bonus (PB) equals the mentor’s bonus
Signature Attack (Hellfire). Melee or Ranged Spell
Attack: +3 plus PB to hit, reach 5 ft. or range 60 ft., one
target. Hit: 1d4 necrotic damage plus 1d4 fire damage.
Both of the spell’s damage types increase by 1d4 when
the deceiver reaches 5th level (2d4 each), 11th level
(3d4 each), and 17th level (4d4 each).

FEATURES
3rd Level: Hell’s Lash (3/Day). As an action, the
deceiver lashes a whip of crimson energy between them
and a creature they can see within 30 feet of them. The
target must succeed on a DC 10 plus PB Constitution
saving throw or take PBd4 fire damage and be tethered.
A tethered creature takes PBd4 damage at the
beginning of each of their turns. A tethered creature
can repeat the saving throw at the end of each of their
turns, ending the effect on a success.
5th Level: Armor of Deception (3/Day).
As an action, the deceiver weaves frightening
illusions around a creature they can see within
60 feet of them. The illusions last for 1 minute.
A creature who attacks the target while the
illusions are active must succeed on a DC 10 plus
PB Wisdom saving throw or take PBd6 psychic
damage and be frightened until the end of
their next turn. A creature who succeeds on
the saving throw is immune to this effect
for 24 hours.

36

[Página 37]
Schemer
(Hellspeaker)

Tyrant (Painkiller)
Medium Humanoid, Any Alignment

Medium Humanoid, Any Alignment

Armor Class 18 (heavy armor)
Hit Points Eight times their level (number of d10 Hit Dice
equal to their level)
Speed 30 ft.

Armor Class 13 (light armor)
Hit Points Seven times their level (number of d8 Hit Dice
equal to their level)
Speed 30 ft.
STR
10 (+0)

DEX
12 (+1)

CON
10 (+0)

INT
10 (+0)

WIS
12 (+1)

STR
16 (+3)

CHA
16 (+3)

DEX
10 (+0)

CON
10 (+0)

INT
10 (+0)

WIS
10 (+0)

CHA
14 (+2)

Saving Throws +PB to all
Skills Athletics +3 plus PB, Intimidation +2 plus PB
Senses passive Perception 10
Languages Common, Infernal
Proficiency Bonus (PB) equals the mentor’s bonus

Saving Throws +PB to all
Skills Deception +3 plus PB, Insight +1 plus PB,
Persuasion +3 plus PB
Senses passive Perception 11
Languages Common, Infernal
Proficiency Bonus (PB) equals the mentor’s bonus

Signature Attack (Longsword). Melee Weapon Attack:
+3 plus PB to hit, reach 5 ft., one target. Hit: 1d8 plus PB
slashing damage. Beginning at 7th level, the tyrant can
make this attack twice, instead of once, when they take
the Attack action on their turn.

Signature Attack (Daggers). Melee Weapon Attack:
+3 plus PB to hit, reach 5 ft., one target. Hit: 2d4 plus PB
damage. Beginning at 7th level, the schemer can make this
attack twice, instead of once, when they take the Attack
action on their turn.

FEATURES
3rd Level: Shift Ranks (3/Day). As an action, the tyrant
makes a signature attack and allows up to three allies
within 30 feet of them who can hear them to move up to
10 feet without provoking opportunity attacks (no action
required).

FEATURES
3rd Level: Quick Trick (3/Day). When a creature targets
the schemer or an ally within 30 feet of the schemer
with an attack, spell, or other magical effect, the schemer
can use their reaction to force that creature to make a
DC 10 plus PB Charisma saving throw. On a failed save,
the creature must choose a new target or lose the attack
or effect.

5th Level: Devastation (3/Day). As an action, the tyrant
makes a signature attack, and up to three allies within
30 feet of them who can hear them can use their reaction
to make one weapon attack.

5th Level: Promises and Lies (1/Day). As an action,
the schemer turns enemies into allies. Each creature
within 30 feet of the schemer who can hear them and
who understand Common or Infernal must succeed on a
DC 10 plus PB Charisma saving throw or be charmed by
the schemer for 1 minute. While charmed in this way, a
creature can’t willingly harm any of the schemer’s allies.
A creature can repeat the saving throw at the end of each
of their turns, ending the effect on themself on a success.

7th Level: Choke (1/Day). As an action, the tyrant makes
a signature attack; if the attack hits, the tyrant chokes the
target with infernal magic. The target is grappled (escape
DC 10 plus PB) and restrained until the grapple ends.

7th Level: Turncoat (3/Day). As an action, the schemer
chooses up to PB creatures they can see within 30 feet
of them. Each target must succeed on a DC 10 plus PB
Charisma saving throw or make an attack against their
nearest ally (no action required). A creature charmed by
the schemer automatically fails this saving throw.

37

[Página 38]
Items
The following new items are available for illrigger
player characters and NPCs.

“The weapon known as True Name is inseparable
from the history of the Seven Cities. Whenever two
devils entered into a deal with one another, the offeree
of the contract would seal their true name into its
ornamentations, then the blade would remain in the
possession of the offerer. Should the offeree fail to uphold
their end of the contract, the offerer would magically
learn the name from the blade, thus gaining power over
they who betrayed the sacred pact.
Is there, thus, any blade with more potential? It is
written that if an infernal soul could discover the true
name of the weapon itself, they could draw from it every
name sworn to it since the blade’s creation. Imagine the
power that individual would have over the Seven Cities.
Imagine the proud devils who could do naught but fall to
their knees.
I have sought the blade’s name for centuries. With
luck, when I find it, its bearer will not know the power
they wield, and it will be mine.”
— Infernal Chancellor Lazivos’s
personal writings

True Name
Weapon (Any), Uncommon, Rare, Very Rare, or
Legendary (Requires Attunement by an Illrigger)
This weapon is ornately decorated with elegant
details in brimstone and obsidian. It smells of iron
and incense. When you attune to this weapon, you
must whisper your true name to it. The name sears
across the weapon in Infernal runes, then fades.
The typical True Name, an uncommon item,
empowers an illrigger’s Baleful Interdict. Whenever
you roll an 18, 19, or 20 on your attack roll with
this weapon and place a seal on a creature as part
of the attack, you can place an additional seal on
that creature.
More powerful variants of True Name gain an
additional property depending on rarity:
Rare. You gain a +1 bonus to attack and damage
rolls made using the weapon, and the damage
dealt by your seals increases by 1d6.
Very Rare. You gain a +2 bonus to attack and
damage rolls made using the weapon, and the
damage dealt by your seals increases by 2d6.
In addition, when you reduce an enemy to 0 hit
points, you can choose to regain a seal (no action
required). Once you regain a seal in this way, you
can’t do so again until the following dusk.
Legendary. You gain a +3 bonus to attack and
damage rolls made using the weapon, and the
damage dealt by your seals increases by 3d6.
In addition, when you reduce an enemy to 0 hit
points, you can choose to regain two seals and
gain temporary hit points equal to your illrigger
level (no action required). Once you regain seals
and gain temporary hit points in this way, you
can’t do so again until the following dusk.

An Ancient True Name
Since the illrigger has many viable playstyles, True
Name’s shape and rarity are flexible, allowing the
GM to bestow a weapon that best fits the illrigger in
their party. We suggest tying this weapon into a greater
story, such as a power squabble in the Seven Cities,
a feud between two fiends, or even a devil trying to
learn your illrigger’s true name—in Hell, a devil’s true
name can be spoken aloud to aid in summoning the
fiend or to strip them of their power (see Flee, Mortals!
for these mechanics). Similar rules could apply to your
infernal illrigger, if you wish.
Once a character claims True Name, they might
quest to find its original name, thus learning the
true names of many fiends in the hells and gaining
great leverage. However, the weapon’s wielder will
undoubtedly encounter fiends who crave the weapon
for themselves—such as Infernal Chancellor Lazivos,
a chancellor in the Seven Cities whose agents collect
powerful relics to enable his election to the Court. You
can find his stat block and more information about him
in Flee, Mortals!

38

[Página 39]
Bloodsbane

Bloodsbane Effects
Ingredient
Effect

Potion, Very Rare
This oil is deceptively clear and smells faintly like
parchment, dried ink, and a touch of sulfur. To
unlock the oil’s power, an additional component
must be mixed in (as shown in the Bloodsbane
Effects table); this component may have already
been added, or the oil’s user can acquire an
unmixed oil and add the component as part of a
short or long rest. These components are difficult to
sense once diluted in the oil, and identifying this oil
may require a keen nose or additional research.
The oil can coat one slashing or piercing
weapon or up to 5 pieces of slashing or piercing
ammunition. Applying the oil in this way takes
1 minute, during which time a willing creature
must offer one drop of their blood, mixing it into
the oil to activate its magic.
A creature hit with a weapon or ammunition
coated in this oil must succeed on a DC 15
Constitution saving throw or suffer an effect
depending on the oil’s special component added.
In addition, if the creature fails the saving throw
and the blood in the oil came from an illrigger, the
creature has a seal placed on them by that illrigger.
This seal doesn’t count against the number of seals
granted by the illrigger’s Baleful Interdict feature.

Mentha
arvensis oil

The target is under the effects of the
zone of truth spell for 10 minutes.

Nightshade
oil

The target is paralyzed for 1 minute.

Bloodhound
fur

The creature who offered their blood
to the oil knows the direction and
distance to the target for 24 hours.

Rose oil

The target is under the effect of the
charm person spell for 1 hour. The
creature they are charmed by is the
creature who offered their blood to
the oil.

“Once you unlock the secrets of brewin’ Bloodsbane, set
up shop in Dis and Styx. The servants of Dispater and
Moloch can’t get enough of it, especially the floral stuff.
And I know a knight or a mage or two in Sutekh and
Asmodeus’s service who’ll pay no small sum for a bottle or
two with nightshade.
But if you share the means to make it with anyone,
the last thing you’ll smell will be parchment, sulfur, and
something sweet.”
— Arzarach, Seven Cities merchant

39
