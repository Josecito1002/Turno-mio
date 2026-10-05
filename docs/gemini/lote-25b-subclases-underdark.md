# Encargo: Lote 25b (subclases de playtest 2026: Underdark) de la app "Mi turno"

"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el formato de
abajo, lo que se pide, usando **solo el texto oficial en inglés que viene al final** (material de playtest, Unearthed Arcana).
Otra persona revisa y aplica tu respuesta con un script, así que el formato tiene que ser exacto.

## Reglas
1. **Textos propios en español**, de 1 a 4 frases por rasgo; no traduzcas literal, resume con tus palabras.
2. **Nombres: si no hay traducción oficial confirmada al español, deja el nombre en inglés** (clases, subclases, rasgos,
   dotes, especies, conjuros nuevos). No inventes nombres en español.
3. Conjuros ya existentes: usa el nombre oficial en español del Manual del Jugador 2024; los nuevos, en inglés (NUEVO).
4. Tipos de acción para `t`: accion, adicional, reaccion, gratis (sin acción), pasiva, fuera (fuera de combate o ritual).
5. Si algo no se entiende en el texto, escríbelo igual con la marca [NO CONFIRMADO].
6. Responde solo con las partes pedidas, cada una con su marcador en una línea (`=== A ===`, `=== B ===`...).

## Ajustes a las reglas (prioridad sobre lo anterior)

1. **No resumas.** Cada rasgo debe conservar TODAS las reglas del texto oficial: cada opción, cada condición, cada excepción
   y cada limitación. Si el rasgo tiene varias opciones (por ejemplo tatuajes, formas, brutalidades), descríbelas todas, una
   por una. Largo no es problema: usa las frases que hagan falta.
2. **Cifras siempre.** Copia exactos los dados, distancias, duraciones, CD, usos y niveles ("2d6", "30 pies", "1 minuto").
   Prohibido escribir "enorme daño", "cierto daño" o similares: si el texto oficial da un número o una fórmula, va en tu texto.
   Si no puedes confirmar una cifra, escribe [NO CONFIRMADO] en vez de inventarla.
3. **Español de D&D.** Redacta todo el texto en español con la terminología oficial de D&D 5e en español (Manual del Jugador
   2024 / ediciones anteriores): "acción adicional", "tirada de salvación", "espacio de conjuro", "Dado de Golpe", "puntos de
   golpe temporales", "ventaja/desventaja", condiciones (Asustado, Hechizado, Derribado...), tipos de daño (necrótico, psíquico,
   de fuerza...), "Puntos de Hechicería", "Furia", "Forma Salvaje", "Canalizar Divinidad", etc. Los conjuros que ya existen
   llevan su nombre oficial en español. Redacta con tus palabras (no copies la traducción de ningún libro), pero completo.
4. **Nombres propios nuevos** (subclases, rasgos, dotes, especies, conjuros nuevos): si NO conoces una traducción oficial
   confirmada, déjalos en inglés. Si propones una traducción, márcala (PROPUESTA) y deja el original entre paréntesis.
5. **Respuesta completa y válida.** Usa el formato de las partes A a E con sus marcadores, sin `[cite: n]` ni notas de
   fuente dentro de los textos. Claves de clase en español como en la app: barbaro, bardo, brujo, clerigo, druida, explorador,
   guerrero, hechicero, mago, monje, paladin, picaro. No cortes la respuesta: si es muy larga, termina una parte y avisa
   en qué parte quedaste para continuar cuando te escriba "continúa".

## Qué se pide
Las 6 subclases: **Path of Unlight (Barbarian)**, **House Agent (Rogue)**, **Imaskarcanist (Wizard)** de Underdark Options; **Freedom Domain (Cleric)**, **Circle of Spores (Druid)** (versión nueva de playtest: clave `esporas-playtest`, convive con la oficial) y **Faerzress Sorcery (Sorcerer)** de Underdark Options 2. No incluyas especies ni dotes (van en otros lotes).

## Formato de la respuesta
=== A ===
Código TypeScript con esta forma, una entrada por subclase (clave en minúsculas-con-guiones, rasgos con TODOS sus niveles):
```ts
const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });
export const PLAYTEST_NUEVAS = {
  clase: { 'clave': { n: 'Nombre', rasgos: [ r(3, 'Rasgo', 'pasiva', 'Texto propio.', { usos: 1, reset: 'largo' }) ] } },
};
```
Conjuros siempre preparados: un rasgo "Conjuros de <subclase>" cuyo texto diga en qué niveles se amplían; la lista va en B.
=== B ===
JSON con lo que la app calcula o deja elegir (fórmulas con `nivel`, `pb`, `FUE DES CON INT SAB CAR`, `CD`, `max(a, b)`):
```json
[ { "donde": "clave-subclase", "rasgo": "Nombre", "tipo": "usos | conjuros | eleccion | otro", "usos": "max(1, SAB)", "reset": "largo | corto", "por_nivel": {"3": ["Conjuro"]}, "detalle": "..." } ]
```
=== C ===
JSON `{ "clave": "Unearthed Arcana <nombre del documento> (año)" }`.
=== D ===
JSON `{ "clave": "1 o 2 frases propias que presenten la subclase" }`.
=== E ===
Lista breve de dudas o cosas [NO CONFIRMADO].


## Texto oficial (fuente única)

### Documento: Underdark Options (2026)

UNEARTHED ARCANA 2026

UNDERDARK OPTIONS
This playtest document is part of a series of
Unearthed Arcana articles that present material
designed for upcoming products. The material here
uses the rules in the Player’s Handbook.

WHAT’S INSIDE
This document presents three new subclasses:
• Barbarian (Path of Unlight)
• Rogue (House Agent)
• Wizard (Imaskarcanist)
This document also includes a new transformative
path of feats: the Path of Ceremorphosis.

CONTENT WARNING
This material contains descriptions of body horror,
damage to the eyes and brain, ingested parasites,
and the idea that you are slowly losing control of
yourself. Some readers might find this content
disturbing.

THIS IS PLAYTEST MATERIAL
This article is presented for playtesting and feedback.
The options here are experimental and in draft form.
They aren’t officially part of the game. Your feedback
will help determine whether we adopt it as official.
How to Playtest This UA. We invite you to try out
this material in play. To play with this material, you
may either incorporate it into your campaign or run
one or more special playtest sessions. For such a
session, you may create an adventure of your own or
use a short adventure from the Dungeon Master’s
Guide or a source like Dragon Delves.
Power Level. The character options you read here
might be more or less powerful than options in the
Player’s Handbook. If a design survives playtesting, we
adjust its power to the desirable level before
publication. This means an option could be more or
less powerful in its final form.
Feedback. The best way for you to give us feedback
on this material is in the survey we’ll release on D&D
Beyond. If we make this material official, it will be
refined based on your feedback, and then it will appear
in a D&D book.
Providing feedback on this document is one way you
can help shape the future of D&D!

SUBCLASSES
This section presents the following subclasses: Path
of Unlight, House Agent, and Imaskarcanist.

WHAT IS UNLIGHT?
The city of Deep Imaskar, home to the descendants of
the ancient Imaskari empire, lies in one of the lowest
levels of the Underdark. The Deep Imaskari wield a
magical force known as Unlight, taught to them by
Imaskarcana, sentient grimoires penned by ancient
wizard-kings of the lost Imaskari empire.
The Deep Imaskari used Unlight to create the Great
Seal, a magical symbol that protects and illuminates
their city while nourishing crops that allow the Deep
Imaskari to survive in the Underdark. But Unlight can
also be used to corrupt and destroy, burning creatures
from within until they die in a fiery explosion of
brilliant light.

PATH OF UNLIGHT
Unleash your inner light as blazing fury
Barbarians infused with the power of Unlight
embrace uncontrollable magic in exchange for
incredible physical prowess. The Unlight burning
inside them illuminates the darkness while burning
and blinding the barbarian’s enemies.
Most barbarians on this path were first exposed to
Unlight in the Underdark. The Deep Imaskari grant
Unlight to chosen warriors who lead their army
against the upper regions of the Underdark, and
some of these soldiers have fled to pursue lives of
their own. But the magic of Unlight is contagious and
spreads in unpredictable ways. It infects people only
briefly exposed to it and occasionally manifests in
individuals who have never been to the Underdark.

UNLIGHT MANIFESTATION
Barbarians on the Path of Unlight manifest the
radiant energy of Unlight when they rage, but this
energy can take many forms. You can roll on or
choose a result from the Unlight Manifestation table
to inspire the form your Radiant Rage takes.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

1

UNLIGHT MANIFESTATION
1d6
1
2
3
4
5
6

Your Unlight Manifests As …
White light blazing from your eyes and
mouth.
Complex arcane symbols of light etched
onto your body.
A cyclone of bright light that whirls around
you.
Cracks in your flesh that reveal burning
light within.
A ghostly form made of light that hovers
above you.
Pale fire that dances on the tip of your
weapon.

LEVEL 3: RADIANT RAGE
The Unlight coursing through you fuels your Rage. If
a creature hits you with a melee attack roll while
your Rage is active, the creature takes Radiant
damage equal to your Rage Damage bonus.
Additionally, while your Rage is active, you shed
Bright Light in a 20-foot radius.

LEVEL 6: UNLIGHT REVELATION
You have proficiency in the Perception skill, if you
lack it. You also gain Expertise in that skill.
While your rage is active, you have Blindsight with
a range equal to that of the Bright Light provided by
your Radiant Rage.

LEVEL 10: INFECTIOUS UNLIGHT
Damage you deal with Brutal Strike can be Radiant
or the usual type (your choice). The following effect
is now among your Brutal Strike options.
Radiant Infection. The target becomes infected
with Unlight for 1 minute. While infected, it sheds
Bright Light in a 10-foot radius. Additionally, at the
start of each of its turns, the target takes 1d6
Radiant damage. The target makes a Constitution
saving throw (DC 8 plus your Strength modifier and
Proficiency Bonus) at the end of each of its turns,
ending the effect on itself on a success.

damage and has the Blinded condition until the end
of your next turn. On a successful save, a creature
takes half damage only.
Once you use this feature, you can’t use it again
until you finish a Long Rest unless you expend a use
of your Rage (no action required) to restore your use
of it.

HOUSE AGENT (ROGUE)
Outwit Your Foes with Charm and Subterfuge
The drow houses of Menzoberranzan conspire
against each other in a great game of status and
sabotage that expands far beyond the city’s limits.
When a house needs a specialized tool to further its
interests without arousing suspicion, it calls in a
house agent.
Using the tools and training of their sponsor, a
house agent is a master infiltrator, capable of
insinuating themself into their target’s life and
striking while their target’s back is turned.

LOYALTY TEST
Each house agent is required to prove their loyalty
before their sponsor allows them into the inner
circles of the organization. You can roll on or choose
a result from the House Agent Origins table to
inspire the incident that made you a full-fledged
member of your house.

HOUSE AGENT ORIGINS
1d6
1
2
3

4
5
6

You Proved Your Loyalty By …
Taking the fall for another person’s
crime and serving their jail sentence.
Assassinating a powerful political figure.
Renouncing all personal ties and worldly
possessions and adopting a new
identity.
Uncovering an incriminating secret
about a member of another house.
Withstanding a torturous interrogation
without divulging house secrets.
Sacrificing a family member for the
benefit of your sponsor.

LEVEL 10: HARBINGER OF UNLIGHT
You have Resistance to Radiant damage.

LEVEL 14: BRILLIANT RAGE
The aura of your Unlight is bolstered. While your
Rage is active, you shed Bright Light in a 30-foot
radius.
As a Bonus Action, you unleash blinding brilliance.
When you do, each creature of your choice within 30
feet of you makes a Constitution saving throw (DC 8
plus your Strength modifier and Proficiency Bonus).
On a failed save, a creature takes 1d12 Radiant

USING OTHER SPONSORS
Though this Rogue is designed to work with the
backing of a drow house of Menzoberranzan, a House
Agent might instead have the backing of another large
group. They could belong to a duergar clan, a religious
order, or a faction such as Bregan D’Aerthe or the
Zhentarim. Or your Rogue could have had multiple
sponsors—perhaps they first worked for a drow house,
then defected to serve another cause.

©2019 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

2

LEVEL 3: HOUSE INSIGNIA

LEVEL 13: SILVER TONGUE

You gain a magical token in the form of a brooch or
coin that marks you as an agent of your sponsor and
that bears their heraldry. While you have this
insignia, you can cast certain spells with it. Charisma
is your spellcasting ability for spells you cast with
your insignia.
Cantrips. You learn the Friends cantrip.
Find Familiar. You can cast the Find Familiar spell
but only as a Ritual. Your sponsor provides the
Material component for your first casting of this
spell. You must choose the Spider form for your
familiar.
Insignia Spells. When you reach a level specified
in the Insignia Spells table, you learn the listed
spells. Once you cast a spell using your insignia, you
can’t cast that spell again until you finish a Long
Rest.

A creature’s Hostile attitude doesn’t impose
Disadvantage on your Charisma checks to influence
that creature.

INSIGNIA SPELLS
Rogue Level
3
5
9

Prepared Spells
Charm Person
Suggestion
Hypnotic Pattern

Losing Your Insignia. If you lose your insignia,
your house finds a way to deliver you a new one,
whether it is via a courier, a magical familiar,
teleportation magic, or some other method. Your
new insignia is delivered to you when you finish a
Long Rest.

LEVEL 3: CHARMING PRESENCE
You can take the Influence action as a Bonus Action.
Additionally, choose one of the following skills:
Deception, Intimidation, Performance, or
Persuasion. You have proficiency in that skill.

LEVEL 9: BACKSTAB
You have Advantage on attack rolls against creatures
within 5 feet of you that are Friendly to you or have
the Charmed Condition. You also gain the following
Cunning Strike option.
Stunning Betrayal (Cost: 4d6). If your target was
Friendly to you or had the Charmed condition when
you hit it, the target has the Stunned condition until
the start of your next turn.

LEVEL 17: SUBTLE MANIPULATOR
You gain the following Cunning Strike option.
Confound (5d6). The target must succeed on a
Wisdom saving throw with a DC equal to your
spellcasting DC or have the Charmed condition for 1
minute. The target can repeat the save when it takes
any damage, ending the effect on itself on a success.
Additionally, you can cast the Friends spell as a
Bonus Action. The target no longer automatically
succeeds on the saving throw if it isn’t a Humanoid
or if you’re fighting it.
Finally, when a spell you cast that gives a target
the Charmed condition ends, the target doesn’t know
it was Charmed by you.

IMASKARCANIST (WIZARD)
Master the Secrets of Unlight and the Artifacts of
Ancient Imaskar
Imaskarcanists have learned the ancient secrets of
Deep Imaskar, a once-human society living in the
deepest depths of the Underdark. Through these
eldritch arts—taught to the Deep Imaskari by
sentient artifacts called the Imaskarcana—they have
mastered the power of Unlight, a brilliant,
destructive, and infectious energy that can be used
to both heal and destroy. With this power, the Deep
Imaskari have launched a war of conquest to bring
light to every corner of the Underdark. Each
Imaskarcanist must decide for themself whether to
aid the conquering army or use their power against
it and preserve the comforting darkness of the world
below.

LEARNING THE SECRETS OF UNLIGHT
Unlight is a rare form of magic known to very few.
You can roll on or choose a result from the Secrets of
Unlight table to inspire how your character learned
about this secret magic.

LEVEL 13: INFILTRATION PARTNER
The familiar you have through the Find Familiar
spell gains Darkvision with a range of 120 feet and
Truesight with a range of 30 feet.
Additionally, when you cast the Find Familiar spell
or finish a Short or Long Rest while you have a
familiar, you can grant your familiar Temporary Hit
Points equal to your Rogue level.

©2019 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

3

SECRETS OF UNLIGHT
1d6
1

2
3
4

5

6

You Learned About Unlight When …
You were taught by a refugee from Deep
Imaskar who brought this knowledge to the
surface world.
You heard whispers in your dreams in a
language you inexplicably understood.
You discovered written records left behind
by a long-dead Imaskari wizard.
You were apprenticed to a Deep Imaskari
wizard in the depths of the Underdark, but
you escaped.
You heard rumors of this power from
Underdark refugees, then pieced its secrets
together through laborious research.
A mind flayer gave you notes salvaged from
a Deep Imaskari whose brain the creature
had eaten.

LEVEL 3: UNLIGHT ADEPT
You know how to weave Unlight into your damaging
spells. When you cast a spell that deals Acid, Cold,
Fire, Lightning, or Thunder damage, you can change
that damage type to Radiant.
In addition, Dim Light created by spells you cast is
Bright Light instead.

LEVEL 3: UNLIGHT INVIGORATION
You can imbue creatures with Unlight drawn from
your own energy, making them stronger and fiercer.
As a Bonus action, choose a willing creature you can
see within 30 feet of you and roll one or two of your
Hit Point Dice. Those dice are then expended. The
target gains Temporary Hit Points equal to the total
rolled plus your Intelligence modifier, and until the
target has no Temporary Hit Points, it has Advantage
on Strength checks and sheds Bright Light in a 10foot radius.

LEVEL 6: UNLIGHT RESTORATION
You can wield the restorative effects of Unlight to
heal injuries and remove harmful effects. As a Bonus
action, choose a creature you can see within 30 feet
of you and roll one or two of your Hit Point Dice.
Those dice are then expended. The target regains Hit
Points equal to the total rolled and sheds Bright
Light in a 10-foot radius until the end of its next
turn.
If you expended two Hit Point Dice, you can
choose to end one of the following conditions on the
target: Blinded, Deafened, Paralyzed, or Poisoned. If
you do, the target does not regain Hit Points.

LEVEL 10: SECRETS OF DEEP IMASKAR
Your research into the secrets of the Imaskarcana
grants you the following benefits.
Imaskarcana Lore. You can attune yourself to a
magic item as a Magic action. Once you use this
feature, you can’t do so again until you finish a Long
Rest.
Piercing Unlight. Your spells ignore Resistance to
Radiant damage.
Unlight Resilience. You gain Resistance to Radiant
damage.
Imaskar Seals. You always have the Glyph of
Warding spell prepared and can cast it once without
a spell slot. When you cast the spell in this way, you
don’t need Material components, you cast the spell
as if using a spell slot equal to the highest Wizard
spell slot you have. Any previous glyph you created
in this way is broken, and its spell ends without
being triggered. You regain the ability to cast Glyph
of Warding in this way when you finish a Long Rest.

LEVEL 14: DOOM OF UNLIGHT
You can curse your enemies with corrosive Unlight,
and the only escape from the curse is physical
violence or an explosive death.
When a creature takes Radiant damage from a
spell you cast, you can take a Reaction to curse that
creature with Unlight. The creature makes a
Constitution save against your spell save DC. On a
failure, the creature is cursed. Until the curse ends,
the target suffers the following effects:
• The target emits Bright Light in a 20-foot radius.
• Attack rolls against the target have Advantage.
• At the start of each of the target’s turns, it takes
Radiant damage equal to your character level.
• The target has Advantage on Strength checks and
melee attack rolls.
• If the target hits another creature with a melee
attack roll, the target can repeat the Constitution
save, ending this curse on a success.
• If the target is reduced to 0 Hit Points, it explodes.
Roll a number of d8s equal to half your
character level. Creatures in a 10-foot
Emanation centered on the target take Radiant
damage equal to the total rolled.
Once you have attempted to curse a creature using
this feature, you can’t do so again until you finish a
Long Rest or until you expend a level 6+ spell slot
(no action required).

©2019 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

4

PATH OF CEREMORPHOSIS
Ceremorphosis is the process by which mind flayers
create more mind flayers. They incubate their
tadpole young in the tank that houses their colony’s
elder brain. When a tadpole is ready, they insert it
into the body of a suitable host. During the
transformative period that ensues, the host gains
access to psychic powers even before the new
illithid’s more monstrous parts begin to develop.
The best hosts are typically humanoids capable of
great physical, mental, and magical feats—in other
words, adventurers.

FROM TADPOLE TO TRANSFORMATION
Ceremorphosis is typically a parasitic relationship in
which a tadpole eats the mind of its host and takes
over the host’s body. The resulting mind flayer
retains the memories of its host but is an entirely
different creature with its own thoughts and
motivations. This mind flayer is subject to the will of
an elder brain, a powerful leader of a mind flayer
colony.
Ceremorphosis usually occurs quickly, but your
path to becoming a mind flayer is different from
traditional methods. As you take feats along this
path, imagine what you might look like at every
stage of this process. Your skin could turn a deeper
violet with each feat you take, or your eyes might
change color and shape.
Something prevents you from giving yourself over
to the whims of the elder brain. Roll on or choose
from the Ceremorphosis Variables table to inspire
what protects you from this foul influence.

CEREMORPHOSIS VARIABLES
1d6
1
2
3
4
5

6

You’re Protected from the Elder Brain
By …
A blessing from your deity, given
unconditionally.
The interference of an archdevil you’ve
sold your soul to.
The elder brain’s desire to see what
happens if a host retains its autonomy.
A one-of-a-kind helm that the Society of
Brilliance infused with Abjuration magic.
A mind and personality so awful that
they deter the elder brain from
interacting with you.
The interference of another elder brain
vying for control over your mind.

ELDER BRAIN CONTROL
Roleplaying the relationship between a burgeoning
mind flayer and an elder brain can be a fun part of this
path, but it requires a conversation with your DM.
Whatever you decide, make sure both you and the DM
agree on the terms of the relationship. Some topics
you might discuss include the following:
• How does the elder brain communicate with your
character—through words, images, or impulses?
• Is the elder brain open about its true nature, or does
it pretend to be the character’s deity or trusted ally?
• What are the consequences for your character if
they defy the elder brain’s orders?
• What, if anything, can the elder brain force your
character to do? How does your character resist?

PATH OF CEREMORPHOSIS FEATS
The following Path of Ceremorphosis feats represent
one path a character can take to become a mind
flayer. To complete the Path of Ceremorphosis, begin
by taking the Tadpole Host feat, followed by any
other Path of Ceremorphosis feat you choose.
Finally, when you reach level 12 or higher, take the
Full Ceremorphosis feat.

TADPOLE HOST
Path of Ceremorphosis Feat (Prerequisite: Level 4+)
You begin a symbiotic relationship with the mind
flayer tadpole in your body. You gain the following
benefits.
Ability Score Increase. Increase your Intelligence
by 1, to a maximum of 20.
Mind Sliver. You learn the Mind Sliver cantrip.
Intelligence is your spellcasting ability for this spell.
Psionic Power. The wellspring of psionic energy
provided to you by your tadpole is represented by
Psionic Energy Dice, which fuel the powers you have
from this feat path.
You have a number of Psionic Energy Dice equal to
your Proficiency Bonus. When you take this feat,
your Psionic Energy Die is a d6. The die changes
when you take feats along the Path of
Ceremorphosis.
Any features in this feat path that use a Psionic
Energy Die use only the dice from this feat path.
Some of your features expend Psionic Energy Dice,
as specified in a feature’s description, and you can’t
use a feature if it requires you to use a die when all
your Psionic Energy Dice are expended.
You regain all expended Psionic Energy Dice when
you finish a Long Rest.

©2019 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

5

Psionic Overload. Whenever you deal Psychic
damage, you can expend a Psionic Energy Die to roll
the die and deal extra Psychic damage equal to the
number rolled.

ILLITHID THRALLMAKER
Path of Ceremorphosis Feat (Prerequisite: Tadpole
Host Feat)
You have honed your psionic ability to become a
master manipulator. You gain the following benefits.
Ability Score Increase. Increase your Intelligence
or Charisma score by 1, to a maximum of 20.
Psionic Energy Dice. The Psionic Energy Dice
granted to you by this feat path become d8s.
Telepathy. You have Telepathy with a range of 10
feet. If you already have Telepathy, your range
increases by 10 feet.
Persuasive Presence. You always have the Charm
Person spell prepared. Intelligence is your
spellcasting ability for this spell. You can cast it
without expending a spell slot by expending a
Psionic Energy Die. You can also cast the spell using
any spell slots you have. When you expend a Psionic
Energy Die to cast the spell, roll the expended die.
One target of the spell subtracts half the number
rolled (round up) from its saving throw against the
spell.

TADPOLE’S SAFEGUARD
Path of Ceremorphosis Feat (Tadpole Host Feat)
Your tadpole has a vested interest in protecting its
shell while it incubates. You gain the following
benefits.
Ability Score Increase. Increase your Constitution
or Intelligence score by 1, to a maximum of 20.
Psionic Energy Dice. The Psionic Energy Dice
granted to you by this feat path become d8s.
Telepathy. You have Telepathy with a range of 10
feet. If you already have Telepathy, your range
increases by 10 feet.
Warding Backlash. You always have the Shield
spell prepared. Intelligence is your spellcasting
ability for this spell. You can cast it without
expending a spell slot by expending a Psionic Energy
Die. You can also cast the spell using any spell slots
you have. When you expend a Psionic Energy Die to
cast the spell and cause the triggering attack to miss,
roll the expended die. The attacker takes Psychic
damage equal to the number rolled.

ULITHARID’S MIGHT
Path of Ceremorphosis Feat (Prerequisite: Tadpole
Host Feat)
The tadpole you ingested is mutating you into an
ulitharid, a rare type of illithid that boasts great
physical strength and mental power, as well as two
additional tentacles.
Ability Score Increase. Increase your Strength,
Dexterity, or Constitution score by 1, to a maximum
of 20.
Psionic Energy Dice. The Psionic Energy Dice
granted to you by this feat path become d8s.
Telepathy. You have telepathy with a range of 10
feet. If you already have telepathy, the range
increases by 10 feet.
Extended Tentacles. Two long tentacles sprout
from around your mouth. You can use these
tentacles to make an Unarmed Strike. When you’re
using these tentacles, your reach increases by 5 feet.

FULL CEREMORPHOSIS
Path of Ceremorphosis Feat (Prerequisite: Level 12+,
at Least Two Path of Ceremorphosis Feats)
You grow four tentacles around your mouth, your
head elongates, and your skin becomes purple and
slick with mucus. Your transformation into a mind
flayer is complete. You gain the following benefits.
Ability Score Increase. Increase your Intelligence
score by 1, to a maximum of 20.
Psionic Energy Dice. The Psionic Energy Dice
granted to you by this feat path become d10s. If they
are already d10s, they instead become d12s.
Aberration. Your creature type is Aberration.
Illithid Specialization. You excel at a particular
illithid talent. Choose one of the following benefits:
Brain-Seeking Tentacles. When you hit a creature
with an Unarmed Strike as part of the Attack
action on your turn, you can use both the Damage
and the Grapple option. You can expend a Psionic
Energy Die when you use this benefit to roll the
expended die. The target takes extra Psychic
damage equal to the number rolled plus your
Intelligence modifier, and it subtracts half the
number rolled (round up) from its saving throw to
avoid gaining the Grappled condition. If the target
is reduced to 0 Hit Points as a result of this benefit,
the Psionic Energy Die isn’t expended. You can use
this benefit only once per turn.
Mind Flayer Spells. You always have the Detect
Thoughts, Levitate, and Mind Blast spells prepared.
Intelligence is your spellcasting ability for these
spells. You can cast these spells without expending
a spell slot by expending a Psionic Energy Die. You
can also cast these spells using any spell slots you
have of an appropriate level.

©2019 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

6

Repeatable. You can take this feat more than
once, but you must choose a different option for
Illithid Specialization each time.

MIND BLAST
The Full Ceremorphosis feat grants the Mind Blast
spell, provided here:

MIND BLAST
Level 6 Evocation (Psion)
Casting Time: Action
Range: Self
Components: S
Duration: Instantaneous
You unleash a concussive burst of psionic energy. Each
creature in a 60-foot Cone originating from you makes
an Intelligence saving throw. On a failed save, the
creature takes 6d8 Psychic damage and has the
Stunned condition until the start of your next turn. On
a successful save, the creature takes half as much
damage only.
Using a Higher-Level Spell Slot. The damage
increases by 1d8 for each spell slot level above 6.

©2019 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

7



### Documento: Underdark Options 2 (2026)

UNEARTHED ARCANA 2026

UNDERDARK OPTIONS 2
This playtest document is part of a series of
Unearthed Arcana articles that present material
designed for upcoming products. The material here
uses the rules in the Player’s Handbook.

WHAT’S INSIDE
This document presents three new subclasses:
• Cleric (Freedom Domain)
• Druid (Circle of Spores)
• Sorcerer (Faerzress Sorcery)
This document also includes five new species.

CONTENT WARNING
This material contains descriptions of body horror
and mind control that some readers might find
disturbing.

THIS IS PLAYTEST MATERIAL
This article is presented for playtesting and feedback.
The options here are experimental and in draft form.
They aren’t officially part of the game. Your feedback
will help determine whether we adopt it as official.
How to Playtest This UA. We invite you to try out
this material in play. To play with this material, you
may either incorporate it into your campaign or run
one or more special playtest sessions. For such a
session, you may create an adventure of your own or
use a short adventure from a source like Dragon
Delves.
Power Level. The character options you read here
might be more or less powerful than options in the
Player’s Handbook. If a design survives playtesting, we
adjust its power to the desirable level before
publication. This means an option could be more or
less powerful in its final form.
Feedback. The best way for you to give us feedback
on this material is in the survey we’ll release on D&D
Beyond. If we make this material official, it will be
refined based on your feedback, and then it will appear
in a D&D book.
Providing feedback on this document is one way you
can help shape the future of D&D!

SUBCLASSES
This section presents the following subclasses:
Freedom Domain, Circle of Spores, and Faerzress
Sorcery.

FREEDOM DOMAIN (CLERIC)
Spread Liberty and Break Chains
The Freedom Domain provides magic of liberation,
movement, and free thought. Clerics use this magic
to inspire hope among the oppressed, to help
prisoners break free from their cages, and to lead
revolutions in which toiling laborers throw off the
chains of oppressive rule.
Gods of freedom embody free will, choice, and
rebellion against tyrannical regimes or stifling
traditions. These deities protect everyone’s right to
determine their own destiny. In the Underdark,
Eilistraee and Sehanine Moonbow both stand for
freedom. Surface dwellers devoted to the cause of
freedom might worship Ilmater or Meilikki instead.

THE MEANING OF FREEDOM
“Freedom” means different things to different
people; when Clerics of the Freedom Domain gather,
they often debate which aspect of freedom is most
important. You can roll on or choose a result from
the Foremost Freedom table to inspire your
character’s stance toward freedom.

FOREMOST FREEDOM
1d6
1
2
3
4
5
6

The Most Important Freedom Is …
Freedom from starvation and poverty.
Freedom to choose your own path in life.
Freedom from tyranny and oppression.
Freedom to control your body and mind.
Freedom from nature’s physical laws.
Freedom from all moral codes.

LEVEL 3: FREEDOM DOMAIN SPELLS
Your connection to this divine domain ensures you
always have certain spells ready. When you reach a
Cleric level specified in the Freedom Domain Spells
table, you thereafter always have the listed spells
prepared.

FREEDOM DOMAIN SPELLS
Cleric Level
3
5
7
9

Prepared Spells
Expeditious Retreat, Jump, Knock,
Misty Step
Fly, Gaseous Form
Dimension Door, Freedom of
Movement
Passwall, Tree Stride

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

1

LEVEL 3: INVOKE LIBERTY
As a Magic Action, you present your Holy Symbol
and expend a use of your Channel Divinity. Each
allied creature within a 30-foot Emanation
originating from you can end one of the following
conditions on itself (its choice): Frightened,
Grappled, Paralyzed, or Restrained. The creature can
then use its Reaction to move up to its Speed
without provoking Opportunity Attacks.
When you reach Cleric level 9, the list of
conditions your allies can choose to end expands to
include Charmed and Petrified.

LEVEL 3: UNENCUMBERED GRACE
While you aren’t wearing armor, your base Armor
Class equals 10 plus your Dexterity and Wisdom
modifiers. You can use a Shield and still gain this
benefit.
In addition, you gain Proficiency in Acrobatics. If
you already have Proficiency in Acrobatics, you gain
Expertise in it instead.

LEVEL 6: UNSTOPPABLE
You mystical connection to freedom allows you to
swiftly navigate obstacles. Your movement is
unaffected by Difficult Terrain.
In addition, you gain proficiency in Dexterity
saving throws. If you already have this proficiency,
you instead gain proficiency with one saving throw
in which you lack it.

LEVEL 17: AVATAR OF FREEDOM
As a Bonus Action, you can manifest a 30-foot
Emanation that surrounds you for 10 minutes. It
ends early if you dismiss it (no action required) or
have the Incapacitated condition. This Emanation
has the following effects:
• Whenever an ally enters the Emanation for the
first time on a turn or starts its turn there, the
ally’s Speed increases by 30 feet until the end of
the ally’s next turn.
• The movement of allies within the Emanation is
unaffected by Difficult Terrain.
• Allies within the Emanation have Advantage on
Dexterity checks.

CIRCLE OF SPORES (DRUID)
Steward the Cycle of Life, Death, and Decay
Druids of the Circle of Spores find beauty in decay.
They revere the ability of mold and other fungi to
grow from and transform lifeless material. These
Druids believe that life and death are parts of a
grand cycle, where each stage feeds into the next.
Druids of the Circle of Spores also see undeath as a
part of this grand cycle so long as it’s temporary. But
all things must eventually decompose to make room
for new life. Undead that seek to replace all life with
undeath or that try to avoid passing to a final rest
violate the cycle and must be thwarted.

DESIGN NOTES: CIRCLE OF SPORES UPDATES
Here are the main updates in this subclass since its
appearance in Tasha’s Cauldron of Everything (2020):
Halo of Spores. Halo of Spores is an Emanation that
grants telepathy. It also has a lesser effect on
creatures that succeed on their saving throws,
instead of having no effect.
Symbiotic Entity. Empowering your spores with
Symbiotic Entity uses a Bonus Action (like Wild
Shape).
Fungal Infestation. When you raise zombies with
Fungal Infestation, you can grant them some of your
Temporary Hit Points (since you get a lot of those!).
Explosive Burst. Explosive Burst is a new feature
(replacing Spreading Spores) that causes your
zombies to explode when they die, spreading spores
around them and dealing damage to enemies.
Fungal Body. Fungal Body now allows you to tap into
the mycelial network you’ve cultivated to control
your body if you have the Unconscious condition.

FUNGAL SYMBIOSIS
Druids of this circle develop a symbiotic relationship
with a special type of fungal spore. In exchange for
the spores’ propagation, they protect the druid and
empower their magic. You can roll on or choose a
result from the Spore Druid Origins table to inspire
your first encounter with your spores.

Once you use this ability, you can’t do so again
until you finish a Short or Long Rest.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

2

SPORE DRUID ORIGINS
1d6

You First Encountered Your Spores When
…
You ingested a mushroom you definitely
should not have.
You searched a rotting corpse and inhaled
the burst of gas spores that erupted from
its chest.
An aging archdruid passed their spores—
and their duty to propagate said spores—
on to you.
You participated in a myconid melding
ceremony.
You died, and a powerful myconid
sovereign took pity and reanimated you.
Psilofyr the Spore Lord visited your dreams
to waken your abilities.

1
2

3

4
5
6

LEVEL 3: CIRCLE SPELLS
When you reach a Druid level specified in the Circle
of Spores Spells table, you thereafter always have
the listed spells prepared.

CIRCLE OF SPORES SPELLS
Druid Level
3
5
7
9

Prepared Spells
Blindness/Deafness, Charm Person,
Chill Touch
Animate Dead
Confusion
Contagion

LEVEL 3: HALO OF SPORES
Invisible spores fill a 10-foot Emanation originating
from you, providing you with a telepathic link to
those who step inside. You have telepathy with a
range of 10 feet. If you already have telepathy, your
range increases by 10 feet.
Additionally, when a creature you can see moves
into your Emanation or starts its turn there, you can
use your Reaction to infect the creature with your
spores. The target makes a Constitution saving
throw against your spell save DC. On a failed save,
the target takes 1d4 Necrotic damage. On a success,
the target has Disadvantage on its next attack roll
before the end of its turn.
The Necrotic damage increases to 1d6 at 6th level,
1d8 at 10th level, and 1d10 at 14th level.

LEVEL 3: SYMBIOTIC ENTITY
As a Bonus Action, you can expend a use of your
Wild Shape feature to waken your spores, rather
than for shape-shifting. When you waken your
spores, you gain a number of Temporary Hit Points
equal to four times your Druid level. This awakening

lasts for 10 minutes. It ends early if you dismiss it
(no action required), have the Incapacitated
condition, or use this feature again. While your
spores are awakened, you gain the following
benefits.
Deadly Halo. When you deal your Halo of Spores
damage, roll the damage die a second time and add
the number rolled to the total.
Entropic Empowerment. Once per turn, you can
deal an extra 1d6 Necrotic damage to a target you hit
with a melee attack roll using a weapon or an
Unarmed Strike.

LEVEL 6: FUNGAL INFESTATION
Your spores can infest a corpse and animate it. If a
Beast or Humanoid that is Small or Medium dies
within 10 feet of you, you can take a Reaction to
reanimate it, causing it to stand up immediately with
1 Hit Point. If your Symbiotic Entity feature is active,
you can transfer any number of Temporary Hit
Points you have to your reanimated creature as part
of this Reaction.
The creature uses the Zombie stat block in the
Player’s Handbook. It remains animate for 1 hour, at
which time it dies. The animation ends early if you
end it as a Bonus Action or if the zombie drops to 0
Hit Points.
The zombie is an ally to you and your allies. In
combat, the zombie shares your Initiative count, but
it takes its turn immediately after yours. It obeys
your mental commands (no action required by you).
If you don’t issue any, it takes the Dodge action and
uses its movement to avoid danger.
You can use this feature a number of times equal
to your Wisdom modifier (minimum of once), and
you regain all expended uses of it when you finish a
Long Rest.

LEVEL 10: EXPLOSIVE BURST
When an Undead creature you created dies, it
explodes in a burst of spores. Each creature you
choose within 10 feet of the dead creature makes a
Constitution saving throw against your spell save
DC, taking 2d8 Necrotic damage on a failure or half
as much on a success.

LEVEL 14: FUNGAL BODY
You have Immunity to the Blinded, Deafened,
Frightened, and Poisoned conditions. Any Critical Hit
against you counts as a normal hit instead, unless
you have the Incapacitated condition.
Additionally, if you have the Unconscious
condition, your spores take over your body’s motor
functions to steer you to safety. The Unconscious
condition doesn’t make your Speed 0. On your turn,
your spores direct your movement, keeping you
near allies and away from danger.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

3

FAERZRESS SORCERY

LEVEL 3: FAERZRESS SPELLS

Wield the Weird Radiation of the Underdark.

When you reach a Sorcerer level specified in the
Faerzress Spells table, you thereafter always have
the listed spells prepared.

You have been mutated by faerzress, the uncanny
radiation Lolth used to shape the Underdark eons
ago. Perhaps you or one of your ancestors was born
within a region of the Underdark saturated by
faerzress, or you spent many years in such a place.
Regardless, your body has now adapted to
faerzress, which sizzles within your body like fluid
electricity. Your senses penetrate the magical static
faerzress creates, and you can find pathways
through faerzress that allow you to scry and
teleport. You are unhindered by faerzress’s
detrimental effects, and you can throw faerzress at
enemies or fill entire chambers with lingering
radiation.

FAERZRESS EFFECTS
Faerzress is a magical radiation that shapes and
protects the Underdark. Faerzress has a number of
magical effects, including the following:
• Creatures within an area affected by faerzress
automatically succeed on saving throws against
Divination effects. Magical sensors and invisible
eyes, such as those created by the Clairvoyance
and Arcane Eye spells, can’t enter an area
affected by faerzress.
• A creature teleporting a distance of 1 mile or more
can’t teleport into or out of an area affected by
faerzress.
• An area affected by faerzress is illuminated by Dim
Light, but creatures using Darkvision within
such an area see in color and have Advantage on
Wisdom (Perception) checks relying on sight.

FAERZRESS SIDE EFFECTS
Exposure to faerzress has mutated you, and you
continue to emit trace amounts of this weird,
invisible, magical radiation. This can have
unpredictable effects on the environment or on
creatures near you. You can roll on or choose a
result from the Faerzress Side Effects table to inspire
your character.

FAERZRESS SIDE EFFECTS
1d6
1
2
3
4
5
6

FAERZRESS SPELLS
Sorcerer Level
3
5
7
9

Prepared Spells
Faerie Fire, Magic Weapon, Misty
Step, Witch Bolt
Nondetection, Sending
Arcane Eye, Stone Shape
Passwall, Scrying

LEVEL 3: FAERZRESS ZONE
As a Magic action, you can spend 3 Sorcery Points to
fill an area within 120 feet of you and no larger than
a 40-foot Cube with faerzress. The faerzress lasts for
24 hours and has the effects in “Faerzress Effects”
above. If you fill the same area with faerzress every
day for 365 days, the faerzress becomes permanent.

LEVEL 3: IMMUNITY TO FAERZRESS
You ignore the detrimental effects of faerzress (see
“Faerzress Effects”).
Creatures within an area affected by faerzress
don’t automatically succeed on saving throws
against your Divination spells. Magical sensors and
invisible eyes created by spells you cast—such as
Clairovoyance and Arcane Eye—can enter an area
affected by faerzress.
When you teleport yourself or other creatures, the
teleporting creatures can teleport into or out of an
area affected by faerzress regardless of the distance
teleported.

LEVEL 6: FAERZRESS AFFINITY
You gain Resistance to Lightning damage. You also
gain Darkvision with a range of 60 feet. If you
already have Darkvision, its range increases by 30
feet. Unlike with ordinary Darkvision, you discern
color in Darkness.
In addition, you have Advantage on Wisdom
(Perception) checks to see in Dim Light or Darkness.
Finally, your Immunity to Faerzress feature also
applies to allies within 30 feet of you.

You Emit Faerzress Radiation That …
Curdles milk and sours wine.
Causes anxiety in animals.
Stimulates the growth of Underdark plants.
Tints colors toward blue and violet.
Sometimes gives you a splitting headache.
Can be heard as a faint, high-pitched
buzzing noise.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

4

LEVEL 14: FAERZRESS SPELL
When one or more creatures fails a saving throw
against a spell you cast, you can spend 1 Sorcery
Point to lace one target that failed the save with
faerzress. The target is subject to the following
effects for 1 minute:
• The creature can’t teleport.
• The creature can’t cast Divination spells.
• The creature has Disadvantage on saving throws
against Divination spells.

LEVEL 14: FAERZRESS STEP
You always have the Teleport spell prepared and can
cast it once without expending a spell slot. You
regain the ability to cast the spell in this way when
you finish a Long Rest.
In addition, whenever you roll on the
Teleportation Outcome table, you can choose any
outcome available for your familiarity.

LEVEL 18: FAERZRESS FORM
When you use your Innate Sorcery, you can turn
yourself into pure faerzress energy. While in this
form, you retain your general shape, personality, and
memories, as well as the ability to speak; any
equipment you’re wearing or carrying doesn’t
transform with you, but you can continue using that
equipment while in this form. Your game statistics
remain the same, apart from the following changes:
Condition Immunities. You have Immunity to the
Grappled, Paralyzed, Petrified, Poisoned, Prone,
and Restrained conditions.
Damage Resistances. You have Resistance to every
damage type except Force and Psychic.
Movement. You have a Fly Speed equal to your
Speed and can hover. You can move through other
creatures and objects as if they were Difficult
Terrain, but you take 5 (1d10) Force damage if
you end your turn inside an object.
You revert to your true form after 1 minute, if you
choose to end the transformation (no action
required), or if you die.
Once you have used this ability, you can’t do so
again until you finish a Long Rest or spend 7 Sorcery
Points (no action required) to restore your use of it.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

5

SPECIES
This section presents five new species.

DEEP IMASKARI
Millennia ago, remnants of the human empire of
Imaskar fled into the bowels of the Underdark and
sealed themselves away. To survive in total
darkness, they harnessed the power of Unlight to
create their Great Seal, which acts as a synthetic sun.
Their descendants, the deep imaskari, have spent
millennia basking in that sun’s radiation and are
now infused with its magic.
Deep imaskari’s bodies have been warped by
Unlight exposure. Colorless, glowing crystals
protrude from their skin. Their eyes are a piercing
golden-white, and their hair is often black, white, or
gray. Deep imaskari live as long as humans do.

A
DEEP IMASKARI TRAITS
Creature Type: Humanoid
Size: Medium (about 4–6 feet tall) or Small (about 2–4
feet tall), chosen when you select this species
Speed: 30 feet
As a Deep Imaskari, you have these special traits.
Photoresistant. You have Resistance to Radiant
damage.
Resourceful. You gain Heroic Inspiration
whenever you finish a Long Rest.
Unluminescent. As an action, you can will the
crystals protruding from your body to glow with
Unlight. You shed Bright Light in a 5-foot radius until
you use an action to stop the effect. Your crystals
stop glowing if you die or have the Unconscious
condition.
Aura of Unlight. When you reach character level
3, you can use a Bonus Action to create an Aura of
Unlight that sheds Bright Light in a 10-foot
Emanation originating from you.
Choose one of the options below each time you
create the aura; the aura lasts for 1 minute or until
you end it (no action required), and once you create
this aura, you can’t do so again until you finish a
Long Rest:
Abjuring Unlight. You and your allies in the aura
gain a bonus to AC equal to half your Proficiency
Bonus (round down).
Brilliant Unlight. Creatures other than your allies
that start their turn within the Emanation must
succeed on a Constitution saving throw (DC 8 plus
your Charisma modifier and Proficiency Bonus) or
have the Blinded condition until the end of your
next turn.

Corrupting Unlight. When you deal damage to a
creature with an attack or a spell, you can change
the damage type to Radiant. Additionally, you can
roll one of your unexpended Hit Point Dice and
deal extra Radiant damage equal to the number
rolled. That die is then expended.

DRIDER
Skulking through Underdark caverns on their eight
legs, driders bear the Spider Queen’s curse. Each has
the head and torso of a drow but the body of a giant
spider. Some driders have additional spider-like
features, such as eight eyes or small fangs.
Driders are powerful hunters, capable of climbing
along webs and walls, creating webs, and shooting
caustic acid. Driders live as long as elves do, around
750 years.

A
DRIDER TRAITS
Creature Type: Monstrosity
Size: Medium (about 6–8 feet tall)
Speed: 30 feet
As a Drider, you have these special traits.
Arachnid Build. You count as one size larger
when determining your carrying capacity.
Darkvision. You have Darkvision with a range of
120 feet.
Spells of the Spider Queen. You know the Dancing
Lights cantrip. When you reach character level 3, you
always have the Faerie Fire spell prepared. When
you reach character level 5, you always have the
Web spell prepared. You can cast each of these spells
once without a spell slot. Once you cast either of
these spells with this trait, you can’t cast that spell
with it again until you finish a Long Rest. You can
also cast these spells using any spell slots you have
of the appropriate level.
Intelligence, Wisdom, or Charisma is your
spellcasting ability for the spells you cast with this
trait (choose the ability when you select this
species).
Spider Climb. You have a Climb Speed equal to
your Speed. When you reach character level 3, you
can move up, down, and across vertical surfaces and
along ceilings while leaving your hands free.
Web Walker. You ignore movement restrictions
caused by webs, and you know the location of any
other creature in contact with the same web.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

6

ILLITHIDKIN

KUO-TOA

Illithidkin are the wretched byproduct of mind flayer
experimentation on humanoid test subjects. These
hybrid creatures are bipedal and retain some of the
features of their original form, but they also bear
some features of a mind flayer—purple skin,
wriggling tentacles, and a fledgling psionic aptitude.
An illithidkin typically has the same life
expectancy as their original species , but in some
cases the transformation adds years or even decades
to—or subtracts as much from—that life expectancy.

Kuo-toa’s origins are hotly debated, even among
kuo-toa themselves. They claim their empires once
ruled both land and sea on multiple worlds, though
they disagree on what brought their empires to their
knees and drove many kuo-toa into the Underdark.
Kuo-toa therefore resent all forces that could have
ended this empire: civilizations that walk in the
light, natural disasters, and any god that leaves their
prayers unanswered.
Kuo-toa are fishlike humanoids with slimy bodies
and scales that change color with extreme emotions,
such as anger or terror. They often smell of rotting
fish, an exquisite scent they magnify with fine
perfumes of their own creation. They have a life
expectancy of about 60 years.

A
ILLITHIDKIN TRAITS
Creature Type: Humanoid
Size: Medium (about 5–6 feet tall) or Small (about 2–4
feet tall), chosen when you select this species
Speed: 30 feet
As an Illithidkin, you have these special traits.
Darkvision. You have Darkvision with a range of
120 feet.
Psionic Aptitude. You know the Mage Hand
cantrip, and you can make the spectral hand
Invisible. When you reach character level 3, you
always have the Command spell prepared. When you
reach character level 5, you always have the Levitate
spell prepared. You can cast each of these spells once
without a spell slot. Once you cast either of these
spells with this trait, you can’t cast that spell with it
again until you finish a Long Rest. You can also cast
the spell using any spell slots you have of the
appropriate level.
Intelligence, Wisdom, or Charisma is your
spellcasting ability for the spells you cast with this
trait (choose the ability when you select this
species).
Sharpened Mind. You have Resistance to Psychic
damage. You also have Advantage on saving throws
you make to avoid or end the Charmed condition.
Telepathy. You have telepathy with a range of 30
feet.

MYSTERIOUS DEITIES
Most knowledge of the full kuo-toa pantheon has
been lost to time. Kuo-toa can’t agree on the names
of these deities, what forms they take, or what these
deities desire. Without a central religious authority,
some archpriests invent new idols based on the
omens they read. They often lead their villages to
venerate krakens, aboleths, or demon lords as the
avatars of deities or as deities in their own right.
Devotion to such beings often results in the kua-toa’s
prolonged servitude to a malevolent power or to
their outright ruin.
To placate their deities, kuo-toa assemble bizarre
idols with mismatched pieces inspired by crabs, eels,
shrimp, or kuo-toa, often adorned with masses of
writhing tentacles. Through a process only a few
kuo-toa understand, these idols draw the attention
of supernatural powers. Sometimes, they even come
to life.

A
KUO-TOA TRAITS
Creature Type: Humanoid
Size: Medium (about 5–6 feet tall)
Speed: 30 feet
As a Kuo-toa, you have these special traits.
Amphibious. You can breathe both air and water.
Additionally, you have a Swim speed equal to your
Speed.
Slippery. You have advantage on saving throws to
avoid or end the Grappled and Restrained
conditions.
Deific Manifestation. You always have the Find
Familiar spell prepared and can cast it without
material components. You can cast it once without a
spell slot, and you regain the ability to cast it in this
way when you finish a Long Rest.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

7

When you cast the spell, you choose one of the
normal forms for your familiar or one of the
following special forms: Homunculus or Myconid
Sprout. The familiar’s creature type is Celestial.
Additionally, your familiar’s form is a divine blend
of multiple creatures. When you cast this spell,
choose a second form from the available options.
Your familiar gains one action, Reaction, or trait
from that second form.

MYCONID
Myconids are bipedal fungal folk who live in closeknit, insular circles. Like mushrooms, they come in
many different shapes, sizes, and colors. Some
myconids whose circles have had contact with other
civilizations have developed features resembling
those of other species, such as mouths for speaking
or bright-colored caps and ruffles that look like
clothing.
Myconids have relatively short lifespans. They
might live a 25 years before returning to the soil to
fertilize the next generation of their circle.

A
MYCONID TRAITS
Creature Type: Plant
Size: Medium (about 4–7 feet tall) or Small (about 2–4
feet tall), chosen when you select this species
Speed: 30 feet
As a Myconid, you have these special traits.
Darkvision. You have Darkvision with a range of
120 feet.
Telepathy. You have telepathy with a range of 30
feet.
Rapport Spores. As an action, you expel spores in
a 30-foot Emanation originating from yourself.
Creatures in the area with an Intelligence score of 2
or higher that aren’t Constructs, Elementals, or
Undead gain telepathy within a range of 30 feet for 1
hour. Once you use this trait, you can’t do so again
until you finish a Long Rest.
Skill Meld. When you finish a Long Rest, you can
perform a melding ritual to share knowledge and
experiences. When you do so, choose up to six allies
(which can include yourself) within 30 feet of
yourself to partake in the ritual and a skill
proficiency that at least one participant has
proficiency in. The chosen creatures each have
proficiency in that skill until they finish a Long Rest.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

8


