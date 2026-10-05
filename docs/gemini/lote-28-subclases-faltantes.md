# Encargo: Lote 24 (subclases de playtest 2025) de la app "Mi turno"

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
Solo estas 3 subclases, que la app no tiene: **Pestilence Domain (Cleric)**, **Ancestral Sorcery (Sorcerer)** y **Psi Warper (Psion)**.
No incluyas otras subclases de esos documentos. Psi Warper es de una versión anterior del Psion, pero usa solo Psionic Energy Dice y
se puede aplicar a la clase Psion actual (Psion Update, 2025): ponla bajo la clase `psion`. Usa la clave `psion` para esa clase y las
claves en español de la app para las demás (`clerigo`, `hechicero`).

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

### Documento: Villainous Options (2026), solo Pestilence Domain

PESTILENCE DOMAIN (CLERIC)
Foment Plague and Rot
Clerics of the Pestilence Domain harness
supernatural plague and decay to erode their
enemies’ vitality. Though common folk often regard
pestilence as a force of rampant destruction, Clerics
of this domain wield it with surgical precision.
The Pestilence Domain is associated with gods of
poison, disease, famine, and rot. These deities use
blighted crops, magical outbreaks, and swarms of
insects and vermin to motivate or punish mortals in
accordance with their doctrines. Their followers
include apothecaries, doctors, poisoners, and royal
tasters. Other followers might devote themselves to
a god of pestilence to spare their communities or
loved ones from plague.

LEVEL 3: BLIGHT WEAVER
You gain the following benefits.
Inoculated Soul. You have Resistance to Necrotic
and Poison damage, and you can’t be infected by
magical contagions.
Rot and Fester. Damage from your Cleric spells
and Cleric features ignores Resistance to Necrotic
and Poison damage. Additionally, when you cast a
Cleric spell or use a Cleric feature that deals either
Necrotic or Poison damage, you can change that
damage to the other type.

LEVEL 3: PESTILENCE DOMAIN SPELLS
Your connection to this divine domain ensures you
always have certain spells ready. When you reach a
Cleric level specified in the Pestilence Domain Spells
table, you thereafter always have the listed spells
prepared.

PESTILENCE DOMAIN SPELLS
Cleric Level
3

5
7
9

Prepared Spells
Detect Poison and Disease, Protection
from Poison, Ray of Enfeeblement,
Ray of Sickness
Stinking Cloud, Vampiric Touch
Blight, Giant Insect
Contagion, Insect Plague

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

1

LEVEL 3: PLAGUE BLESSING

LEVEL 17: VERMIN FORM

As a Magic action, you can present your Holy Symbol
and expend a use of Channel Divinity to manifest a 5foot Emanation of withering plague that surrounds
you or one willing creature you touch for 1 minute. It
ends early if you dismiss it (no action required),
manifest it again, or have the Incapacitated
condition.
Each creature of your choice that starts its turn in
the Emanation must succeed on a Constitution
saving throw against your spell save DC or gain 1
Exhaustion level. This feature can’t increase a
creature’s Exhaustion level higher than a level equal
to your Wisdom modifier (minimum of 1 Exhaustion
level). For example, if you have a Wisdom score of
16, this feature can’t increase a creature’s
Exhaustion level higher than 3.
The plague spread by this feature manifests with a
specific symptom. Choose it from the Plague
Symptoms table or determine it randomly.

As a Bonus Action, you can shape-shift into a
Medium swarm of Tiny pests, such as cockroaches,
maggots, or rats. While you’re in this form, you
retain your general shape, personality, memories,
and the ability to speak; any equipment you’re
wearing or carrying doesn’t transform with you, but
you can continue using that equipment while in this
form. Your game statistics remain the same, apart
from the following changes:

PLAGUE SYMPTOMS
1d6
1
2
3
4
5
6

While Infected, a Creature …
Is drained of all color, appearing in
monochromatic grays.
Sheds metallic, rust-hued flakes and creaks
while moving.
Secretes foul-smelling mucus.
Is surrounded by a cloud of buzzing insects.
Sprouts fungi or other foliage from its flesh.
Is covered in glowing pustules.

LEVEL 6: VIRULENT BURST
When an enemy within 60 feet of you is reduced to 0
Hit Points, you can take a Reaction to cause plague to
burst from that creature, spreading pestilence in a
10-foot Emanation originating from the enemy; if
the enemy had at least 1 Exhaustion level, the size of
the Emanation increases to 20 feet.
Each creature of your choice in the Emanation
makes a Constitution saving throw against your spell
save DC. On a failed save, a target suffers one of the
following effects:

Condition Immunities. You have Immunity to the
Grappled, Paralyzed, Prone, and Restrained
conditions.
Damage Resistances. You have Resistance to
Bludgeoning, Piercing, and Slashing damage.
Movement. You can enter and occupy another
creature’s space and vice versa. Additionally, you
have a Climb Speed equal to your Speed, and you
can climb difficult surfaces—including along
ceilings—without needing to make an ability
check.
Plague Bites. Whenever you enter an enemy’s
space, that creature takes damage equal to your
Wisdom modifier; the damage is Necrotic,
Piercing, or Poison (your choice). A creature also
takes this damage when it enters your space or
ends its turn there. A creature takes this damage
only once per turn.
You revert to your true form after 10 minutes, if you
choose to end the transformation (no action
required), if you have the Incapacitated condition, or
if you die.
Once you use this feature, you can’t use it again
until you finish a Long Rest unless you expend a
level 5+ spell slot (no action required) to restore
your use of it.

Putrid Shock. The target has the Incapacitated
condition until the end of its next turn. While
Incapacitated, the target’s Speed is 0.
Toxic Infection. The target takes 3d6 Necrotic or
Poison damage (your choice).
You can use this feature a number of times equal to
your Wisdom modifier (minimum of once), and you
regain all expended uses when you finish a Long
Rest.

©2026 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use.

2


### Documento: Arcane Subclasses (2025), solo Ancestral Sorcery

ANCESTRAL SORCERY (SORCERER)
Bear the Power of a Spellcasting Lineage
Your innate magic comes from a specific
ancestor who wielded such awesome magical
power that a fragment of their personality
guides you. This ancestor grants you guidance
and direction as you explore your innate magical
abilities. You might be the ancestor’s sole
surviving descendant, a reincarnation who bears
an eerie resemblance to your ancestor, or a
victim of a curse gained from handling your
ancestor’s personal effects.

LEVEL 3: ANCESTOR’S LORE
You use your force of personality to channel
your ancestor’s knowledge. When you make an
Intelligence check, you gain a bonus to the check
equal to your Charisma modifier (minimum of
+1).
You also gain proficiency in one of these skills
of your choice: Arcana, History, Investigation,
Nature, or Religion.
LEVEL 3: ANCESTRAL SPELLS

When you reach the Sorcerer level specified in
the Ancestral Spells table, you thereafter always
have the listed spells prepared.

LINEAGE SPELLS
Sorcerer Level
3

5
7
9

Spells
Command, Guidance, Locate
Object, Protection from Evil and
Good, Resistance, Spiritual Weapon
Magic Circle, Spirit Guardians
Divination, Locate Creature
Legend Lore, Yolande’s Regal
Presence

LEVEL 3: VISAGE OF THE ANCESTOR

Choose the form your ancestor takes, which
might resemble the ancestor in life or a symbolic
creature. While your Innate Sorcery feature is
active, this form appears in a spectral haze
around you, and you have Advantage on any
ability check you make as part of the Influence
action.

LEVEL 6: SUPERIOR SPELL DISRUPTION

Your ancestor’s spellcasting mastery aids you in
breaking spells. You always have Counterspell
and Dispel Magic prepared.

©2025 Wizards of the Coast LLC

5

While your Innate Sorcery feature is active,
you can cast each spell without expending a spell
slot. If you cast Counterspell in this way, the
target has Disadvantage on its Constitution
saving throw. If you cast Dispel Magic in this
way, you have Advantage on your ability checks
to end ongoing spells. Once you cast either spell
without a spell slot, you must finish a Long Rest
before you can cast the spell in this way again.

LEVEL 14: ANCESTRAL MAJESTY

Your ancestor’s visage evokes awe or dread.
While your Innate Sorcery feature is active, you
are surrounded by a magical aura in a 5-foot
Emanation. Whenever a creature you can see
enters the Emanation or ends its turn there, you
can force that creature to make a Charisma
saving throw. On a failed save, the target has the
Prone condition or has the Frightened condition
until the end of your next turn (your choice). A
creature makes this save only once per turn.

LEVEL 14: STEADY SPELLCASTER

Your deep connection with your ancestor
steadies you. Taking damage can’t break your
Concentration on Sorcerer spells.

LEVEL 18: ANCESTOR’S WARD

Your ancestor’s protection redirects harmful
magic away from you. While your Innate Sorcery
feature is active, you gain Advantage on saving
throws against spells. Once during your use of
Innate Sorcery, when you fail a saving throw
against a spell, you can choose to succeed
instead.


### Documento: The Psion (2025), solo Psi Warper

PSI WARPER
Warp Space with the Power of Your Mind
Psi Warpers tune their psionic powers to
manipulating the space between objects. Capable of
teleporting across the battlefield and creating
vacuums in space, a Psi Warper is never in one place
for too long.

LEVEL 3: PSI WARPER SPELLS
When you reach a Psion level specified in the Psi
Warper Spells table, you thereafter always have the
listed spells prepared.

PSI WARPER SPELLS
Psion Level
3
5
7
9

Spells
Expeditious Retreat, Feather Fall,
Misty Step, Shatter
Blink, Haste
Banishment, Dimension Door
Steel Wind Strike, Teleportation
Circle

LEVEL 3: TELEPORTATION
You can cast Misty Step without expending a spell
slot, and you must finish a Long Rest before you can
cast it in this way again. You can also restore your
use of it by expending one Psionic Energy Die (no
action required).

LEVEL 3: WARP PROPEL
When a target fails its saving throw against your
Telekinetic Propel, instead of pushing it, you can
teleport the target to an unoccupied space you can
see within 30 feet of you that is horizontal to you.

LEVEL 6: WARP SPACE
When you cast Shatter, you can expend one Psionic
Energy Die to modify the spell so that the radius of
the spell’s Sphere becomes 20 feet.
In addition, creatures that fail the saving throw
against the spell are pulled straight toward the

LEVEL 10: DUPLICITOUS TARGET
When a creature you can see makes an attack roll
against you, you can take a Reaction to expend one
Psionic Energy Die and choose a willing creature you
can see within 30 feet of yourself that doesn’t have
the Incapacitated condition. You and the willing
creature teleport, swapping places with each other.
The creature then becomes the target of the attack
roll.

LEVEL 14: MASS TELEPORTATION
As a Magic action, you expend four Psionic Energy
Dice and choose Huge or smaller creatures within 30
feet of yourself, up to a number of creatures equal to
your Intelligence modifier (minimum of one
creature). Each of the chosen creatures is teleported
to an unoccupied space you can see within 150 feet
of you. An unwilling creature that succeeds on a
Wisdom saving throw against your spell save DC is
unaffected.

