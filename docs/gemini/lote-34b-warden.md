# Encargo: Lote 34b (Warden) de la app "Mi turno"

"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el formato de
abajo, lo que se pide, usando **solo el texto en inglés que viene al final**: material de la comunidad (Valda's Spire of Secrets (reglas 2014)), no oficial de
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
JSON `{ "clave": "Warden (Valda's Spire of Secrets)" }` para la clase y cada subclase.
=== D ===
JSON `{ "clave": "1 o 2 frases que presenten la clase o subclase" }`.
=== E ===
Dudas, cortes de texto o [NO CONFIRMADO].

## Texto fuente (Warden (Valda's Spire of Secrets))

[Página 19]
Thunderous Charge

Toxin Well

Casting Time: 1 action
Range: Self
Components: V, S
Duration: Instantaneous
Classes: Ranger, sorcerer, warden

Casting Time: 1 action
Range: Touch
Components: V, S, M (a vial of poison)
Duration: 1 hour
Classes: Bard, sorcerer, warden, wizard

A crackle of energy sparks around your feet as you step
forward, transforming you into a bolt of lightning. You
launch in a straight line up to 20 feet in a direction you
choose. If your trajectory would cause you to enter a space
occupied by a creature or solid object, you ricochet off of
it rather than moving through its space, and can choose
another direction to use your remaining movement granted
by this spell. The first time you ricochet off a creature
during this movement, it must make a Strength saving
throw, and on a failed save, takes 2d6 thunder damage and
is knocked prone.
At the end of your movement, a sudden boom of energy
causes a sonic wave to propagate in a 15-foot cone in the
direction you were last traveling, originating from in front
of you. Each creature within this area must succeed on a
Constitution saving throw or become deafened and pushed
10 feet away from you.
At Higher Levels. When you cast this spell using a slot of
3rd level or higher, the distance you can travel increases by
10 feet for each slot level above 2nd.

You touch a body of water no greater than 120 gallons,
causing it to become toxic and take on an oily, murky haze
as you infuse it with magical poison for the duration. This
water can be used on its own, or can be mixed with other
fluids (such as potions) in equal parts; the other fluid
keeps its original properties, and is additionally poisoned
according to the effects of this spell. The poisoned fluid
affects targets in the following ways.
Contact. When a creature starts its turn with any part of
its body, such as a limb or appendage, in contact with the
water, it must succeed on a Constitution saving throw or
become poisoned for 1 minute.
Dip. If you submerge an object, such as a weapon or piece
of cloth, in this liquid, it becomes infused with the magic
toxin. Any creature touched with the toxin-infused surface
within the next round must succeed on a Constitution
saving throw or become poisoned until the end of
its next turn.
Drink. When a creature drinks this water, it immediately
becomes poisoned and must make a Constitution saving
throw, taking 5d6 poison damage on a failed save or half as
much damage on a successful one.
Steam. If at least 10 gallons of this water are vaporized,
such as by being brought to a boil, the steam lingers as a
poisonous cloud for the duration. The size of the cloud
is a cylinder, 5 feet tall and with a 5-foot radius, centered
above the original source. When a creature starts its turn
in contact with this cloud, it must make a Constitution
saving throw. On a failed save, the creature spends its action
that turn retching and reeling. Creatures that don’t need to
breathe or are immune to poison automatically succeed on
this saving throw. A moderate wind (at least 10 miles per
hour) disperses the cloud after 4 rounds. A strong wind (at
least 20 miles per hour) disperses it after 1 round.

4th-level transmutation

Dennis Saputra

2nd-level evocation

[Página 20]
OGL License

The following items are designated Product Identity, as defined
in Section 1(e) of the Open Game License Version 1.0a, and are
subject to the Conditions set forth in Section 7 of the OGL, and
are not Open Content: All trademarks, registered trademarks,
proper names (characters, place names, named creatures, etc.),
dialogue, plots, relationships, story elements, locations, characters,
artwork, graphics, descriptions, and trade dress. (Elements that
have previously been designated as Open Game Content are not
included in this declaration.)
Open Game Content: The Open content in this document includes the names of spells, the names of racial categories, and the
names of abilities or features. No other portion of this work may
be reproduced in any form without permission
OPEN GAME License Version 1.0a
The following text is the property of Wizards of the Coast, LLC.
and is Copyright 2000 Wizards of the Coast, Inc (“Wizards”). All
Rights Reserved.
1. Definitions: (a)”Contributors” means the copyright and/or
trademark owners who have contributed Open Game Content;
(b)”Derivative Material” means copyrighted material including
derivative works and translations (including into other computer
languages), potation, modification, correction, addition, extension, upgrade, improvement, compilation, abridgment or other
form in which an existing work may be recast, transformed or
adapted; (c) “Distribute” means to reproduce, License, rent, lease,
sell, broadcast, publicly display, transmit or otherwise distribute; (d)”Open Game Content” means the game mechanic and
includes the methods, procedures, processes and routines to the
extent such content does not embody the Product Identity and
is an enhancement over the prior art and any additional content
clearly identified as Open Game Content by the Contributor, and
means any work covered by this License, including translations
and derivative works under copyright law, but specifically excludes
Product Identity. (e) “Product Identity” means product and product line names, logos and identifying marks including trade dress;
artifacts; creatures characters; stories, storylines, plots, thematic
elements, dialogue, incidents, language, artwork, symbols, designs,
depictions, likenesses, formats, poses, concepts, themes and
graphic, photographic and other visual or audio representations;
names and descriptions of characters, Spells, enchantments, personalities, teams, personas, likenesses and Special abilities; places,
locations, environments, creatures, Equipment, magical or supernatural Abilities or Effects, logos, symbols, or graphic designs; and
any other trademark or registered trademark clearly identified as
Product identity by the owner of the Product Identity, and which
specifically excludes the OPEN Game Content; (f) “Trademark”
means the logos, names, mark, sign, motto, designs that are used
by a Contributor to Identify itself or its products or the associated
products contributed to the Open Game License by the Contributor (g) “Use”, “Used” or “Using” means to use, Distribute, copy,
edit, format, modify, translate and otherwise create Derivative
Material of Open Game Content. (h) “You” or “Your” means the
licensee in terms of this agreement.
2. The License: This License applies to any Open Game Content
that contains a notice indicating that the Open Game Content
may only be Used under and in terms of this License. You must
affix such a notice to any Open Game Content that you Use. No
terms may be added to or subtracted from this License except
as described by the License itself. No other terms or Conditions
may be applied to any Open Game Content distributed using this
License.
3. Offer and Acceptance: By Using the Open Game Content You
indicate Your acceptance of the terms of this License.

4. Grant and Consideration: In consideration for agreeing to use
this License, the Contributors grant You a perpetual, worldwide,
royalty-free, nonexclusive License with the exact terms of this
License to Use, the Open Game Content.
5. Representation of Authority to Contribute: If You are contributing original material as Open Game Content, You represent that
Your Contributions are Your original Creation and/or You have
sufficient rights to grant the rights conveyed by this License.
6. Notice of License Copyright: You must update the COPYRIGHT NOTICE portion of this License to include the exact text
of the COPYRIGHT NOTICE of any Open Game Content You
are copying, modifying or distributing, and You must add the
title, the copyright date, and the copyright holder’s name to the
COPYRIGHT NOTICE of any original Open Game Content you
Distribute.
7. Use of Product Identity: You agree not to Use any Product
Identity, including as an indication as to compatibility, except as
expressly licensed in another, independent Agreement with the
owner of each element of that Product Identity. You agree not
to indicate compatibility or co-adaptability with any Trademark
or Registered Trademark in conjunction with a work containing
Open Game Content except as expressly licensed in another,
independent Agreement with the owner of such Trademark or
Registered Trademark. The use of any Product Identity in Open
Game Content does not constitute a Challenge to the ownership of
that Product Identity. The owner of any Product Identity used in
Open Game Content shall retain all rights, title and interest in and
to that Product Identity.
8. Identification: If you distribute Open Game Content You
must clearly indicate which portions of the work that you are
distributing are Open Game Content.
9. Updating the License: Wizards or its designated Agents
may publish updated versions of this License. You may use any
authorized version of this License to copy, modify and distribute
any Open Game Content originally distributed under any version
of this License.
10. Copy of this License: You MUST include a copy of this License with every copy of the Open Game Content You Distribute.
11. Use of Contributor Credits: You may not market or advertise the Open Game Content using the name of any Contributor
unless You have written permission from the Contributor to do so.
12. Inability to Comply: If it is impossible for You to comply
with any of the terms of this License with respect to some or all of
the Open Game Content due to statute, judicial order, or governmental regulation then You may not Use any Open Game Material
so affected.
13. Termination: This License will terminate automatically
if You fail to comply with all terms herein and fail to cure such
breach within 30 days of becoming aware of the breach. All sublicenses shall survive the termination of this License.
14. Reformation: If any provision of this License is held to be
unenforceable, such provision shall be reformed only to the extent
necessary to make it enforceable.
15. COPYRIGHT NOTICE Open Game License v 1.0a Copyright 2000, Wizards of the Coast, LLC. System Reference Document 5.1 Copyright 2016, Wizards of the Coast, LLC.; Authors
Mike Mearls, Jeremy Crawford, Chris Perkins, Rodney Thompson,
Peter Lee, James Wyatt, Robert J. Schwalb, Bruce R. Cordell, Chris
Sims, and Steve Townshend, based on original material by E. Gary
Gygax and Dave Arneson.
The Warden Class Copyright 2020, Vorpal Dice Press and Genuine Fantasy Press, LLC.
Compendium of Forgotten Secrets: Awakening Copyright 2018,
Genuine Fantasy Press, LLC.
Compendium of Sacred Mysteries: Resurrection Copyright
2020, Genuine Fantasy Press, LLC.
