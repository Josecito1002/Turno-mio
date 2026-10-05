# Encargo: Lote 36e (Craftsman Complete) de la app "Mi turno"

"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el formato de
abajo, lo que se pide, usando **solo el texto en inglés que viene al final**: material de la comunidad (Valda's Spire of Secrets (reglas 2014)), no oficial de
Wizards. Esta es la parte 5 de 5 de este material. Otra persona revisa y aplica tu respuesta con un script, así que el formato tiene que
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

[Página 60]
Chapter 4: Additional
Character Options
This chapter contains options for characters of all classes,
offering new ways of acquiring skills, bonus feats to assist
in constructing and using exotic weaponry, and some handy
spells for the arcanist-craftsman in the party.

Learning
New Skills
Many adventurers possess tool proficiencies from their
previous lives, before they embarked on their various
quests. There is always more to learn, however, and new
skills can be gained in a number of ways.

Trainers
The GM determines where and when training is available.
The options below illustrate some of the more common
methods of finding a trainer.

Private Tuition
It is often possible to find a master craftsperson who is
willing to teach their skills to a suitable pupil, for a price.
Under normal circumstances, a tool proficiency can be
gained after 2,000 hours of lessons; the standard price for
such a course would be around 250 gp.
The GM can decide that “crash courses” are available,
whereby a character could gain the skill in less time (often
at a higher cost), or that a character can learn more quickly
due to prior experience or a high Intelligence score.

Guilds and Apprenticeships
In some societies, trade knowledge, especially pertaining to
high-value trades such as masonry, carpentry, and smithing,
is kept a closely guarded secret. In these places, a character
might need to join a guild as an apprentice to learn the new
skill.
Joining a guild is usually difficult. It might involve
arcane rites, steep entrance fees, or the completion of
grueling trials. Once a person has joined the guild,
however, they tend to learn quickly, due to being
surrounded by skilled tradespeople and having access to the
resources (and in some cases, secrets) of the guild.

58
magehandpress.com

On the other hand, guilds may place demands on their
members, and can expel anyone who breaks their rules (for
where guilds are powerful, it is usually illegal to practice a
trade without a guild license.) An apprentice will usually
assist a more experienced member, who could become a
valuable ally or troublesome hindrance to an adventuring
party. As the character gains prestige within the guild, they
may rise through the ranks and be forced to take on
apprentices of their own.

As a Reward
Sometimes, finding an appropriate trainer is difficult. Skills
might be rare, or the existing masters may be unable or
unwilling to teach adventurers. It might be necessary to
prove to the trade master that you possess the skills and
work ethic to apprentice for them. In these cases, players
may have to seek training in unusual places, such as by
helping powerful NPCs or by tracking down lost
manuscripts.
This could be an opportunity for adventure. Perhaps the
only person who knows how to fly airships is a vicious sky
pirate who will only share his secrets with a fellow outlaw!
Perhaps, the key to learning a skill is to delve a dangerous
dungeon and return with its long-forgotten secrets.

Learning from Party Members
When a party spends several weeks or months travelling
together, it is possible that the characters will learn things
from each other. If a character with a tool proficiency
wishes to teach one of their companions, they can do so in
whatever free time their adventure permits.
When learning in this way, a student accrues hours in
the same way as they would when undergoing private
tuition. However, these hours must be otherwise free—you
cannot learn to work leather while travelling across
country, fighting monsters, or searching ruins. If a
character does more than 8 hours of activity in a day,
including intellectual activity like learning a trade, they are
subject to Constitution saving throws as if they were
conducting a forced march.

[Página 61]
Feats

New Spells

The following feats, which grant the ability to make and
use exotic weapons and armor, are available to characters
of all classes.

The following spells are available to all spellcasters.

Alarm Glyph
2nd-level abjuration

Exotic Mastery
You are practiced in wearing unwieldy and exotic armor,
and you gain the following benefits:
• Increase your Strength or Dexterity score by 1, to a
maximum of 20.
• You gain proficiency with 4 pieces of exotic gear of
your choice.

Gifted Artisan
Prerequisites: Intelligence 15 or higher, proficiency with
smith’s tools
You have discovered the secrets of forging unique,
masterwork weapons or armor. When you create a new
item, you can apply a number of Apprentice masterwork
properties to it equal to your Intelligence modifier. You
don’t apply a Masterwork bonus to items you craft, unless
you have the required craftsman level to do so. You can
proficiently use any non-exotic equipment you craft.

Master Artisan
Prerequisite: Proficiency in two or more sets of artisan’s
tools
As a true veteran of your craft, you have elevated industry
to an artform. You gain the following benefits:
• Choose two tools in which you have proficiency. You
gain expertise with those tools, which means your
proficiency bonus is doubled for any ability check you
make using them. The tools you choose must be ones
that aren’t already benefiting from a feature, such as
Expertise, that doubles your proficiency bonus.
• You can improvise any set of artisan’s tools with which
you are proficient.
• As an action, you can attempt to craft any simple item
that could normally be crafted by someone in your
profession. Make a DC 15 tool check using your tools’
governing ability. If successful, you create the item and
must pay any material costs that would normally be
required. Once you have used this ability, you must
complete a long rest before you can use it again.

Casting Time: 10 minutes
Range: Touch
Components: V, S, M (powdered diamond worth 100 gp,
which the spell consumes)
Duration: Until dispelled
This spell, based on the alarm and glyph of warding spells,
is used to discourage theft by triggering an alarm when an
item is removed from a location. It comes in two versions:
one that is cast on an aperture, and one that is cast on an
object.
Aperture. You spend ten minutes inscribing invisible
glyphs on an aperture such as a door, gate, window or
archway no larger than 10 square feet. Whenever an object
bearing an alarm glyph passes through the warded area, it
produces the sound of a hand bell for 10 seconds within
120 feet. Casting the knock spell on the aperture suppresses
the effect for 10 minutes.
Object. You spend ten minutes inscribing an invisible
glyph on an object. This object will now trigger any
alarmed apertures through which it passes.
At Higher Levels. When you cast the aperture version of
this spell using a spell slot of 3rd level or higher, you can
store one spell of 2nd level or lower (usually hold person)
inside it. This spell must target be capable of targeting a
creature, object, or area and you must expend the
appropriate spell slot and spell components when the spell
is stored. This stored spell is then cast and expended the
first time the alarm is triggered. If the triggering object is
being worn or carried, the stored spell targets whoever is
carrying it or the location where they are standing. If not, it
targets the object directly. Once it has been expended, the
stored spell can be reactivated (or changed to a different
spell) by touching the glyph and expending another spell
slot and spell components.

Dispel Alarm
2nd-level abjuration
Casting Time: 1 action
Range: Touch
Components: V, S
Duration: Instantaneous

59
magehandpress.com

[Página 62]
You touch an object. If there is an alarm glyph or alarm
spell on the object, the spell is dispelled. This spell can
only be used on the object version of the alarm glyph; the
aperture version can only be affected by dispel magic.

Duplicate Object
4th-level conjuration
Casting Time: 1 minute
Range: 30 feet
Components: V, S, M (a silver mirror)
Duration: Instantaneous
You create an exact copy of a nonmagical, non-living
object you can see within range (the copy must also appear
within the spell’s range.) The object must fit inside a 5-foot
cube and be worth no more than 25 gp. The copy is a real,
permanent, independent object that functions exactly like
the original. You can’t duplicate an object created by this
spell.
If the object you wish to copy would be considered a
‘complex item’ as noted in the Tools of the Trade section,
you must be proficient in the requisite tools to duplicate it
using this spell.
Materials such as adamantine, coldwood, mithral, and
zurkhwood count as magical for the purposes of this spell.
At Higher Levels. When you cast this spell using a spell
slot of 5th level or higher, the sides of the cube in which the
object must fit are increased by 5 feet for each slot level
above 4th, to a maximum of a 20-foot cube. Thus, when
cast at 5th level, you could duplicate an object that fits in a
10-foot cube.

Manipulate Clockwork
Transmutation cantrip
Casting Time: 1 action
Range: 30 feet
Components: V, S
Duration: 1 round
You effect a minor change in a Small or smaller clockwork
item within range that you can see. Examples of things you
could do include:
• Make the machine run faster or slower, up to double or
half of its normal speed.
• Change the time displayed on a mechanical clock.
• Flip a switch or change a setting.
• Start or stop the device.
You cannot damage or destroy a machine using this spell.

60
magehandpress.com

Safiya’s Industrious Worker
1st-level transmutation
Casting Time: 10 minutes
Range: Touch
Components: V, S, M (a bar of iron)
Duration: 8 hours
You touch a willing creature. For the next 8 hours, they can
perform manual tasks with exceptional speed.
Every hour spent crafting items under the influence of
this spell provides 4 hours’ worth of output. This can be
combined with other effects; for example, a character with
expertise using this spell would produce 8 hours’ worth of
work per hour. This spell cannot increase the speed at
which the target crafts or enchants magic items.
At Higher Levels. When you cast this spell using a spell
slot of 2nd level or higher, you can target one additional
creature for each slot level above 1st.

Unseen Accountant
2nd-level conjuration (ritual)
Casting Time: 1 action
Range: 60 feet
Components: V, S, M (an abacus)
Duration: 8 hours
This spell creates an invisible, shapeless force that
performs intellectual tasks at your command until the spell
ends. The servant springs into existence in an unoccupied
space on the ground within range. It has AC 10, 1 hit point,
an Intelligence of 12, and it can’t attack. If it drops to 0 hit
points, the spell ends.
Once on each of your turns as a bonus action, you can
mentally command the servant to move up to 15 feet and
interact with an object. The accountant can perform
intellectual tasks that a human clerk could do, such as
assaying prices, updating accounts, managing inventories,
or computing interest. Once you give the command, the
accountant performs the task to the best of its ability until it
completes the task, then waits for your next command. The
accountant can perform no physical labor and is not able to
lift any object heavier than a bottle of ink.
If you command the accountant to perform a task that
would move it more than 300 feet away from you, the spell
ends.

[Página 63]
Producers
Adam Ashworth

Eugen Batischev

John Hoffman

Not_A_Robot

SleepyD

Alexander Garcia

Fabhar

Jonathan Mello

Pandric

Spencer Houston

Antonio Garcia

Garrett Lloyd

Joseph Blanc

Patrick Rooney

Star-Lord Wright

Ariel Drissman

George Tolley

Joshua Cates

Paul Gibbs

Stephen Grote

Ashran Firebrand

Grand Moff Xela

Julien Therrien

Pedro Storti

Tavin Kastner

bolthawk

Justin Forkner

Pregnantandscared

Thantos

Braden Read

Guðmundur
Guðmundsson

Karson Oakes

Rasmi

The Mage Armory

brandon johnson

Illuminous_Knight

Ken Beimler

Robert Field

The Palm of Vecna

Brandon Martin

Izaac Ward

Ken de Jong

RUNEHAMMER

TheNthMaou

Charles Koeppel

James Belin

Krist

Ryan Heckathorn

Tom Clark

Chase B Patterson

James Davidson

Kristian Gilfillan

Ryan Patrick Nolan

TrondKF

Chris Mitchell

James Mitchell

Kura Tenshi

Ryan Russell

tyrell hayward

Daniel Lamoureux

Jamie

Kurt C Yost

Sam Brock

wanderer

Dannika Aikens

Jason Jones

LeBallisticPoet

Sasquatch

Xynth

Darion Nutter

Jesse Ott

Matthew Atkins

Sean Barrentine

Derek Miranda

Jesus Andujo

Michael Djangali

Seth Apple

Zackary D
Szechenyi

Douglas

Joe Shine

Michael Jeanes

Shadistro

Drew Hayes

Joel Grote

Mike Litkewitsch

SixAughtFive

Art Credits
Cover, Pg. 1, 10, 14 by Martin Kirby
Pg. 4 by Nyvinter
Pgs. 9, 12, 26, 42, 48, 57 by Lucas Ferreira CM
Pgs. 17, 20, 25, 38, 44, 45, 49, 50, 55 by Mariana Livraes
Pg. 52 by Jordy Knoop
All other art by Lucas Ferreira CM

[Página 64]
License
This material is being released under the Open Gaming License.
OPEN GAME LICENSE Version 1.0a
The following text is the property of Wizards of the Coast, Inc. and is Copyright 2000 Wizards of the Coast, Inc ("Wizards"). All Rights
Reserved.
1. Definitions: (a)"Contributors" means the copyright and/or trademark owners who have contributed Open Game Content; (b)"Derivative
Material" means copyrighted material including derivative works and translations (including into other computer languages), potation,
modification, correction, addition, extension, upgrade, improvement, compilation, abridgment or other form in which an existing work may be
recast, transformed or adapted; (c) "Distribute" means to reproduce, license, rent, lease, sell, broadcast, publicly display, transmit or otherwise
distribute; (d)"Open Game Content" means the game mechanic and includes the methods, procedures, processes and routines to the extent such
content does not embody the Product Identity and is an enhancement over the prior art and any additional content clearly identified as Open
Game Content by the Contributor, and means any work co
vered by this License, including translations and derivative works under copyright law, but specifically excludes Product Identity. (e) "Product
Identity" means product and product line names, logos and identifying marks including trade dress; artifacts; creatures characters; stories,
storylines, plots, thematic elements, dialogue, incidents, language, artwork, symbols, designs, depictions, likenesses, formats, poses, concepts,
themes and graphic, photographic and other visual or audio representations; names and descriptions of characters, spells, enchantments,
personalities, teams, personas, likenesses and special abilities; places, locations, environments, creatures, equipment, magical or supernatural
abilities or effects, logos, symbols, or graphic designs; and any other trademark or registered trademark clearly identified as Product identity by
the owner of the Product Identity, and which specifically excludes the Open Game Content; (f) "Trademark" means the logos, names, mark, sign,
motto, designs that are used by a Contributor to identify itself or its products or the associated products contributed to the Open Game License by
the Contributor (g) "Use", "Used" or "Using" means to use, Distribute, copy, edit, format, modify, translate and otherwise create Derivative
Material of Open Game Content. (h) "You" or "Your" means the licensee in terms of this agreement. Not for resale. Permission granted to print or
photocopy this document for personal use only. System Reference Document 5.0 2
2. The License: This License applies to any Open Game Content that contains a notice indicating that the Open Game Content may only be Used
under and in terms of this License. You must affix such a notice to any Open Game Content that you Use. No terms may be added to or
subtracted from this License except as described by the License itself. No other terms or conditions may be applied to any Open Game Content
distributed using this License.
3. Offer and Acceptance: By Using the Open Game Content You indicate Your acceptance of the terms of this License.
4. Grant and Consideration: In consideration for agreeing to use this License, the Contributors grant You a perpetual, worldwide, royalty-free,
nonexclusive license with the exact terms of this License to Use, the Open Game Content.
5. Representation of Authority to Contribute: If You are contributing original material as Open Game Content, You represent that Your
Contributions are Your original creation and/or You have sufficient rights to grant the rights conveyed by this License.
6. Notice of License Copyright: You must update the COPYRIGHT NOTICE portion of this License to include the exact text of the
COPYRIGHT NOTICE of any Open Game Content You are copying, modifying or distributing, and You must add the title, the copyright date,
and the copyright holder's name to the COPYRIGHT NOTICE of any original Open Game Content you Distribute.
7. Use of Product Identity: You agree not to Use any Product Identity, including as an indication as to compatibility, except as expressly licensed
in another, independent Agreement with the owner of each element of that Product Identity. You agree not to indicate compatibility or coadaptability with any Trademark or Registered Trademark in conjunction with a work containing Open Game Content except as expressly
licensed in another, independent Agreement with the owner of such Trademark or Registered Trademark. The use of any Product Identity in
Open Game Content does not constitute a challenge to the ownership of that Product Identity. The owner of any Product Identity used in Open
Game Content shall retain all rights, title and interest in and to that Product Identity.
8. Identification: If you distribute Open Game Content You must clearly indicate which portions of the work that you are distributing are Open
Game Content.
9. Updating the License: Wizards or its designated Agents may publish updated versions of this License. You may use any authorized version of
this License to copy, modify and distribute any Open Game Content originally distributed under any version of this License.
10. Copy of this License: You MUST include a copy of this License with every copy of the Open Game Content You Distribute.
11. Use of Contributor Credits: You may not market or advertise the Open Game Content using the name of any Contributor unless You have
written permission from the Contributor to do so.
12. Inability to Comply: If it is impossible for You to comply with any of the terms of this License with respect to some or all of the Open Game
Content due to statute, judicial order, or governmental regulation then You may not Use any Open Game Material so affected.
13. Termination: This License will terminate automatically if You fail to comply with all terms herein and fail to cure such breach within 30 days
of becoming aware of the breach. All sublicenses shall survive the termination of this License.
14. Reformation: If any provision of this License is held to be unenforceable, such provision shall be reformed only to the extent necessary to
make it enforceable. 15. COPYRIGHT NOTICE
Open Game License v 1.0a Copyright 2000, Wizards of the Coast, Inc.
System Reference Document 5.0 Copyright 2016, Wizards of the Coast, Inc.;
Complete Craftsman Copyright 2019, Mage Hand Press, LLC; authors Michael Holik, Jaron Mortimer, Benjamin Richardson, Matthew Pennell
END OF LICENSE
