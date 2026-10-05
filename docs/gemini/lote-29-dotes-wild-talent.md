# Encargo: Lote 27 (dotes de playtest 2026) de la app "Mi turno"

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
Las dotes de la categoría **Wild Talent** del documento The Psion (mayo de 2025): Atmokinesis, Biokinesis, Clairsentience, Cryokinesis,
Empath, Mind Whisperer, Psi Trickster, Psykineticist y Pyrokinesis. El texto dice "ten new feats" pero solo trae nueve: no inventes
la que falta. Todas tienen el requisito "no tener otra dote Wild Talent" (ponlo en `requiere`) y algunas ganan conjuros al nivel de
personaje 3 o superior: describe cada nivel y cada conjuro completo. Los conjuros se nombran como en la app (español oficial); los
trucos y conjuros que no existan, en inglés con (NUEVO). La categoría (`cat`) es "Wild Talent" y `nivelMin` es 1 salvo que el texto
pida otro nivel.

## Formato de la respuesta
=== A ===
TypeScript `DOTES_NUEVAS` (clave → `{ n, t, cat, nivelMin, texto }`; cat: Wild Talent) con texto propio en español.
=== B ===
JSON de mecánicas (usos, elecciones, requisitos entre las dotes de Ceremorphosis) con "donde" = clave de la dote.
=== C ===
JSON `{ "clave": "Unearthed Arcana <documento> (2026)" }`.
=== D ===
JSON `{ "clave": "1 frase propia que presente la dote" }`.
=== E ===
Dudas o [NO CONFIRMADO].



## Texto oficial (fuente única)

### Documento: The Psion (2025), sección Feats

(4d10).

FEATS
This section presents ten new feats.

WILD TALENT FEATS
These feats are in the Wild Talent category.

ATMOKINESIS
Wild Talent Feat (Prerequisite: Can’t Have Another
Wild Talent Feat)
You gain the following benefits.
Lightning Jolt. Once per turn when you cast a
spell or hit with an attack roll and deal Bludgeoning,
Piercing, Slashing, or Psychic damage, you can
change the damage type to Lightning damage.

©2025 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use. V1.1

11

Psionic Talent. You know the Shocking Grasp
cantrip. You also always have the Fog Cloud spell
prepared. You can cast it once without a spell slot,
and you regain the ability to cast it in that way when
you finish a Long Rest. You can also cast it using any
spell slots you have of the appropriate level. When
you cast these spells, they require no Verbal or
Material components, and Intelligence, Wisdom, or
Charisma is your spellcasting ability for them
(choose when you select this feat).
When you reach character level 3, you also always
have the Gust of Wind spell prepared and can cast it
the same way.

BIOKINESIS
Wild Talent Feat (Prerequisite: Can’t Have Another
Wild Talent Feat)
You gain the following benefits.
Bend Life Energy. When a spell you cast restores
Hit Points to a creature, you can roll 1d4 and add the
number rolled to the total Hit Points restored. You
can use this benefit a number of times equal to your
Proficiency Bonus, and you regain all expended uses
when you finish a Long Rest.
Psionic Talent. You know the Spare the Dying
cantrip. You also always have the Healing Word spell
prepared. You can cast it once without a spell slot,
and you regain the ability to cast it in that way when
you finish a Long Rest. You can also cast it using any
spell slots you have of the appropriate level. When
you cast these spells, they require no Verbal or
Material components, and Intelligence, Wisdom, or
Charisma is your spellcasting ability for them
(choose when you select this feat).
When you reach character level 3, you also always
have the Arcane Vigor spell prepared and can cast it
the same way.

CLAIRSENTIENCE
Wild Talent Feat (Prerequisite: Can’t Have Another
Wild Talent Feat)
You gain the following benefits.
Minor Foreknowledge. When you take the Search
action, you can give yourself Advantage on any
ability check made as part of that action. You can use
this benefit a number of times equal to your
Proficiency Bonus, and you regain all expended uses
when you finish a Long Rest.
Psionic Talent. You know the Guidance cantrip.
You also always have the Detect Evil and Good spell
prepared. You can cast it once without a spell slot,
and you regain the ability to cast it in that way when
you finish a Long Rest. You can also cast it using any
spell slots you have of the appropriate level. When
you cast these spells, they require no Verbal or
Material components, and Intelligence, Wisdom, or

Charisma is your spellcasting ability for these spells
(choose when you select this feat).
When you reach character level 3, you also always
have the See Invisibility spell prepared and can cast
it the same way.

CRYOKINESIS
Wild Talent Feat (Prerequisite: Can’t Have Another
Wild Talent Feat)
You gain the following benefits.
Ice Manipulation. Once per turn when you cast a
spell or hit with an attack roll and deal Bludgeoning,
Piercing, Slashing, or Psychic damage, you can
change the damage type to Cold damage.
Psionic Talent. You know the Ray of Frost cantrip.
You also always have the Armor of Agathys and Ice
Knife spells prepared. You can cast each spell once
without a spell slot, and you regain the ability to cast
it in that way when you finish a Long Rest. You can
also cast these spells using any spell slots you have.
When you cast these spells, they require no Verbal
or Material components, and Intelligence, Wisdom,
or Charisma is your spellcasting ability for them
(choose when you select this feat).

EMPATH
Wild Talent Feat (Prerequisite: Can’t Have Another
Wild Talent Feat)
You gain the following benefits.
Emotional Sense. When you take the Influence
action, you can give yourself Advantage on any
ability check made as part of that action. You can use
this benefit a number of times equal to your
Proficiency Bonus, and you regain all expended uses
when you finish a Long Rest.
Psionic Talent. You always have the Charm Person
spell prepared. You can cast it once without a spell
slot, and you regain the ability to cast it in that way
when you finish a Long Rest. You can also cast it
using any spell slots you have of the appropriate
level. When you cast the spell, it requires no Verbal
components, and Intelligence, Wisdom, or Charisma
is your spellcasting ability for this spell (choose
when you select this feat).
When you reach character level 3, you also always
have the Calm Emotions spell prepared and can cast
it the same way.

©2025 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use. V1.1

12

FLESH MORPHER
Wild Talent Feat (Prerequisite: Can’t Have Another
Wild Talent Feat)
You gain the following benefits.
Flexible Flesh. When you make a Dexterity
(Acrobatics or Sleight of Hand) check, you gain a
bonus equal to your Intelligence modifier (minimum
of +1). You can use this benefit a number of times
equal to your Proficiency Bonus, and you regain all
expended uses when you finish a Long Rest.
Psionic Talent. You always have the Longstrider
spell prepared. You can cast it once without a spell
slot, and you regain the ability to cast it in that way
when you finish a Long Rest. You can also cast it
using any spell slots you have of the appropriate
level. When you cast the spell, it requires no Verbal
components, and Intelligence, Wisdom, or Charisma
is your spellcasting ability for this spell (choose
when you select this feat).
When you reach character level 3, you also always
have the Alter Self spell prepared and can cast it the
same way.

MIND WHISPERER
Wild Talent Feat (Prerequisite: Can’t Have Another
Wild Talent Feat)
You gain the following benefits.
Limited Telepathy. As a Magic action, choose one
creature you can see within 120 feet of yourself. You
form a telepathic connection to that creature. For 1
hour, you and the chosen creature can communicate
telepathically with each other while within 120 feet
of each other. To understand each other, you each
must mentally use a language the other knows.
Once you use this benefit, you can’t do so again
until you finish a Short or Long Rest.
Psionic Talent. You know the Mind Sliver cantrip.
You also always have the Dissonant Whispers spell
prepared. You can cast it once without a spell slot,
and you regain the ability to cast it in that way when
you finish a Long Rest. You can also cast it using any
spell slots you have. When you cast these spells, they
require no Verbal or Material components, and
Intelligence, Wisdom, or Charisma is your
spellcasting ability for them (choose when you select
this feat).

PSI TRICKSTER
Wild Talent Feat (Prerequisite: Can’t Have Another
Wild Talent Feat)
You gain the following benefits.
Cunning Mind. When you make a Charisma
(Deception or Persuasion) check, you gain a bonus
equal to your Intelligence modifier (minimum bonus
of +1). You can use this benefit a number of times

equal to your Proficiency Bonus, and you regain all
expended uses when you finish a Long Rest.
Psionic Talent. You know the Minor Illusion
cantrip. You also always have the Disguise Self spell
prepared. You can cast it once without a spell slot,
and you regain the ability to cast it in that way when
you finish a Long Rest. You can also cast it using any
spell slots you have. When you cast these spells, they
require no Verbal or Material components, and
Intelligence, Wisdom, or Charisma is your
spellcasting ability for them (choose when you select
this feat).

PSYKINETICIST
Wild Talent Feat (Prerequisite: Can’t Have Another
Wild Talent Feat)
You gain the following benefits.
Psi Boost. When you take the Dash action, you can
increase your Speed by 10 feet until the start of your
next turn. You can do this a number of times equal to
your Proficiency Bonus, and you regain all expended
uses when you finish a Long Rest.
Psionic Talent. You know the Telekinetic Fling
cantrip (included in this UA). You also always have
the Thunderwave spell prepared. You can cast it once
without a spell slot, and you regain the ability to cast
it in that way when you finish a Long Rest. You can
also cast it using any spell slots you have. When you
cast these spells, they require no Verbal
components, and Intelligence, Wisdom, or Charisma
is your spellcasting ability for them (choose when
you select this feat).

PYROKINESIS
Wild Talent Feat (Prerequisite: Can’t Have Another
Wild Talent Feat)
You gain the following benefits.
Firestarter. Once per turn when you cast a spell
or hit with an attack roll and deal Bludgeoning,
Piercing, Slashing, or Psychic damage, you can
change the damage type to Fire damage.
Psionic Talent. You know the Produce Flame
cantrip. You also always have the Burning Hands
spell prepared. You can cast it once without a spell
slot, and you regain the ability to cast it in that way
when you finish a Long Rest. You can also cast it
using any spell slots you have of the appropriate
level. When you cast these spells, they require no
Verbal or Material components, and Intelligence,
Wisdom, or Charisma is your spellcasting ability for
them (choose when you select this feat).
When you reach character level 3, you also always
have the Scorching Ray spell prepared and can cast it
the same way.

©2025 Wizards of the Coast LLC. Permission granted to print and photocopy this page for personal use. V1.1

13

