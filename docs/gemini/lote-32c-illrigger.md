# Encargo: Lote 32c (Illrigger Revised) de la app "Mi turno"

"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el formato de
abajo, lo que se pide, usando **solo el texto en inglés que viene al final**: material de la comunidad (MCDM, Matt Colville (reglas 2014)), no oficial de
Wizards. Esta es la parte 3 de 3 de este material. Otra persona revisa y aplica tu respuesta con un script, así que el formato tiene que
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

[Página 40]
Open Game License version 1.0a
Open Game Content: The game mechanics described in this
MCDM manual are Open Game Content under the Open Game
License 1.0a section 1(d), unless such content is MCDM’s Product
Identity. No portion of this work other than the material designated
as Open Game Content may be reproduced in any form without
written permission.
The following text is the property of Wizards of the Coast, Inc.
and is Copyright 2000 Wizards of the Coast, Inc (“Wizards”).
All Rights Reserved.
1. Definitions: (a)”Contributors” means the copyright and/or
trademark owners who have contributed Open Game Content;
(b)”Derivative Material” means copyrighted material including
derivative works and translations (including into other computer
languages), potation, modification, correction, addition, extension,
upgrade, improvement, compilation, abridgment or other form in
which an existing work may be recast, transformed or adapted; (c)
“Distribute” means to reproduce, license, rent, lease, sell, broadcast,
publicly display, transmit or otherwise distribute; (d) “Open Game
Content” means the game mechanic and includes the methods,
procedures, processes and routines to the extent such content
does not embody the Product Identity and is an enhancement
over the prior art and any additional content clearly identified
as Open Game Content by the Contributor, and means any work
covered by this License, including translations and derivative
works under copyright law, but specifically excludes Product
Identity. (e) “Product Identity” means product and product
line names, logos and identifying marks including trade dress;
artifacts; creatures characters; stories, storylines, plots, thematic
elements, dialogue, incidents, language, artwork, symbols, designs,
depictions, likenesses, formats, poses, concepts, themes and
graphic, photographic and other visual or audio representations;
names and descriptions of characters, spells, enchantments,
personalities, teams, personas, likenesses and special abilities;
places, locations, environments, creatures, equipment, magical
or supernatural abilities or effects, logos, symbols, or graphic
designs; and any other trademark or registered trademark clearly
identified as Product identity by the owner of the Product Identity,
and which specifically excludes the Open Game Content; (f)
“Trademark” means the logos, names, mark, sign, motto, designs
that are used by a Contributor to identify itself or its products or
the associated products contributed to the Open Game License
by the Contributor (g) “Use”, “Used” or “Using” means to use,
Distribute, copy, edit, format, modify, translate and otherwise
create Derivative Material of Open Game Content. (h) “You” or
“Your” means the licensee in terms of this agreement.
2. The License: This License applies to any Open Game Content
that contains a notice indicating that the Open Game Content may
only be Used under and in terms of this License. You must affix such
a notice to any Open Game Content that you Use. No terms may
be added to or subtracted from this License except as described
by the License itself. No other terms or conditions may be applied
to any Open Game Content distributed using this License.
3. Offer and Acceptance: By Using the Open Game Content You
indicate Your acceptance of the terms of this License.
4. Grant and Consideration: In consideration for agreeing to use
this License, the Contributors grant You a perpetual, worldwide,
royalty-free, non-exclusive license with the exact terms of this
License to Use, the Open Game Content.
5. Representation of Authority to Contribute: If You
are contributing original material as Open Game Content,

You represent that Your Contributions are Your original creation
and/or You have sufficient rights to grant the rights conveyed
by this License.
6. Notice of License Copyright: You must update the
COPYRIGHT NOTICE portion of this License to include the exact
text of the COPYRIGHT NOTICE of any Open Game Content
You are copying, modifying or distributing, and You must add
the title, the copyright date, and the copyright holder’s name to
the COPYRIGHT NOTICE of any original Open Game Content
you Distribute.
7. Use of Product Identity: You agree not to Use any Product
Identity, including as an indication as to compatibility, except as
expressly licensed in another, independent Agreement with the
owner of each element of that Product Identity. You agree not
to indicate compatibility or co-adaptability with any Trademark
or Registered Trademark in conjunction with a work containing
Open Game Content except as expressly licensed in another,
independent Agreement with the owner of such Trademark or
Registered Trademark. The use of any Product Identity in Open
Game Content does not constitute a challenge to the ownership
of that Product Identity. The owner of any Product Identity used in
Open Game Content shall retain all rights, title and interest in and
to that Product Identity.
8. Identification: If you distribute Open Game Content You must
clearly indicate which portions of the work that you are distributing
are Open Game Content.
9. Updating the License: Wizards or its designated Agents
may publish updated versions of this License. You may use any
authorized version of this License to copy, modify and distribute
any Open Game Content originally distributed under any version
of this License.
10. Copy of this License: You MUST include a copy of this License
with every copy of the Open Game Content You Distribute.
11. Use of Contributor Credits: You may not market or advertise
the Open Game Content using the name of any Contributor unless
You have written permission from the Contributor to do so.
12. Inability to Comply: If it is impossible for You to comply
with any of the terms of this License with respect to some or
all of the Open Game Content due to statute, judicial order, or
governmental regulation then You may not Use any Open Game
Material so affected.
13. Termination: This License will terminate automatically if You
fail to comply with all terms herein and fail to cure such breach
within 30 days of becoming aware of the breach. All sublicenses
shall survive the termination of this License.
14. Reformation: If any provision of this License is held to be
unenforceable, such provision shall be reformed only to the extent
necessary to make it enforceable.
15. COPYRIGHT NOTICE
Open Game License v 1.0a Copyright 2000, Wizards of
the Coast, Inc.
System Reference Document Copyright 2000-2003, Wizards of the
Coast, Inc.; Authors Jonathan Tweet, Monte Cook, Skip Williams,
Rich Baker, Andy Collins, David Noonan, Rich Redman, Bruce R.
Cordell, John D. Rateliff, Thomas Reid, James Wyatt, based on
original material by E. Gary Gygax and Dave Arneson.
All other content © 2023 MCDM Productions.
Authors: Sadie Lowry, Mathew Colville, Lars Bakke, Mario Ortegón

40
