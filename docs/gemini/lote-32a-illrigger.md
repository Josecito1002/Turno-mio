# Encargo: Lote 32a (Illrigger Revised) de la app "Mi turno"

"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el formato de
abajo, lo que se pide, usando **solo el texto en inglés que viene al final**: material de la comunidad (MCDM, Matt Colville (reglas 2014)), no oficial de
Wizards. Esta es la parte 1 de 3 de este material. Otra persona revisa y aplica tu respuesta con un script, así que el formato tiene que
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

[Página 1]


[Página 2]
Credits
Design Director: Matthew Colville
Lead Designer: Sadie Lowry
Designers: Lars Bakke, Mario Ortegón
Development: James Introcaso
Lead Editor: Laura Hirsbrunner
Editor: Joshua Yearsley
Fiction: Matthew Colville
Sensitivity Consultant: Basil Wright

Christopher Teale, Ckorsz, Clayton Graham/The Angry
Celt, Corrupted Chaos, Cory Muraglio, Dan B., Dan
Kesyer, Dard, Dave Rosser, David Mitolo/Vaddix, Desi
Gillespie, Emmi K., Eric Sawchak, Esteban “Eerie” Llap,
EvilDans, Flame Warp, ForgottenLands, Hal 9000,
Harry Morris, Hazel Margaris, InShortSight, IU, Jacob
McEwen, Jared “Jay” Busse, Jarrad/Potion Enthusiast,
Jay Tallsquall, Jennifer Kretchmer, Jermiah Monk/
Lyme, Joette, Jonathan Petillo, Joseph Carothers, Josh
Goodwin, Kai Bumpus, Kane Sweeney, Kristen FP, Kyle
Trammell/Willy_Trombone, LemonLupin, Lexie Bryan,
Lucas Chiesa, Luke M., Malyn Kuntz, Mariam Owrang,
Matt Holden, Matthew T., Megan J. Garry, Mr. Smith,
N3sting, Nasse Williams, Natalie Boles, Nathan Hidding/
Illidasi, Nicholas Renzetti, Omni, Phillip Ada, Prymal,
Raphael N., Rob Matthews, Robert G., Robert Sachse,
Ryan “nonrabbit” Green, Ryan Madden, rylog9,
Sami Khan, Sami N., Shannon Schlarf, Skye McLaren
Walton, Thomas “ThomBone” Hill, Tim Skiba, Tristan
Postley, Vindelstock, William Pfeiffer, Yima, Zachary
Paquette, Zero

Executive Art Director: Jason Hasenauer
Cover Illustration: Patrik Hell
Illustration and Design: Grace Cheung, Nick De Spain,
Patrik Hell, Jason Hasenauer
Graphic Design and Layout: Gordon McAlpin
Accessibility Consultant: Chris Hopper

MCDM Contractors
Community Coordinator: John Champion
Customer Support: Bobby McBride
QA Senior Tester: Spencer Hibnick
Testers: Nathan Clark, Cassandra “Dig” Crary, Alecson
de Lima Junior, James Dewar, Anna Guimarães,
Alex Hencinski

MCDM Productions

Come Chat with Us!

Lars Bakke: Development & Production
Jerod Bennett: Technology
Grace Cheung: Art
Matthew Colville: Writing & Design
Nick De Spain: Art & Outsource Management
Jason Hasenauer: Art & Art Direction
James Introcaso: Lead Game Designer

Join us on the MCDM Discord server, where
you can get involved in playtests and chat with others
about MCDM products like The Illrigger Revised.

MCDM.gg/discord

Product Identity: The following items are hereby identified as
Product Identity, as defined in the Open Game License version 1.0a,
Section 1(e), and are not Open Content: the Illrigger, Forked Tongue,
Infernal Conduit, Baleful Interdict, Hellsight, Diabolic Contract,
Painkiller, Telekinetic Seal, By the Throat, You Die on My Command,
Deathstrike, Shadowmaster, Flash of Brimstone, Magnus, “Orden, the
Mundane World,” memonek, ERN-F8, “Axiom, the Plane of Uttermost
Law,” Uluoria, “Primordius, the Sea of Eternal Change,” Soranis, Arcadia,
Zazamanc, “Alloy, the city at the Center of the Timescape,” Nuulus-Larr,
“the World Below, the Dark Under All,” Lady Dazran, Chronos Codex,
Cthrion Uroniziir, Time Ender, The Wyrm of the World’s End, and all
Trademarks, registered trademarks, proper names (including the names
of characters, place names, monsters, organizations, new spells, new
abilities, etc.), dialogue, plots, story elements, locations, characters,
artwork, graphics, sidebars, and trade dress. Elements that have
previously been designated as Open Game Content are not included
in this declaration.

Playtesters
Playtest Coordinators: Aaron Flavius West, AJ Metzger,
Daniel Lane, David Lucas, davidqshull, EagleRuler, Ethan
Dunning, Franklin H., Gina Devlin, Harley Kewish, Harper
Blair Stone, Jake Sargent/ArchmageMC37, James L., Janek
Dalkowski, Jarrad Tait, Jeanne Parker, Joel Russ, John
Champion, John Previtera/Previterror, Liam Kearney,
Madeleine Bray, Matthew Vansprang, Meg Hanna,
Morgan “Adys” Fenwick, Roman Penna, Shane Parker
Alpha Playtesters: 0XiDi, Aaron Pangilinan, Alaina
Rhodes, Alex Chapman, Alex FP, Alpacnologia,
Andre Haftevani, Andrea Aloisi, Anutham Suresh,
Arek O. S., B. Roulston, Ben Wilks, Big Bill Hell’s,
Bonnie MacDonald, Bryce Beggs, Campbell M., Cat,

The Illrigger Revised version 1
© 2023 MCDM Productions, LLC. All rights reserved.

2

[Página 3]
Table of Contents
Credits .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . 2
Introduction .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . 4
Fiction.  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . 6
The Illrigger Revised .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . 9
The Order of Desolation .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . 9
Creating an Illrigger. .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . 9
Class Features.  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . 11
Diabolic Contracts.  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . 15
Architect of Ruin .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . 17
Hellspeaker.  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . 22
Painkiller. .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . 23
Sanguine Knight. .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . 25
Shadowmaster. .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . 27
Interdict Boons.  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . 30
New Spells. .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . 32
Retainers. .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . 35
Items.  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . 38
Open Game License version 1.0a.  .  .  .  .  .  .  .  .  . 40

3

[Página 4]
H

Introduction
ey, everybody! James Introcaso here—

a gold-trimmed heel. Illriggers can be chaotic
or logical, evil or pragmatic, warmongering or
cunning, but they share a remarkable position
in the power struggles of the Seven Cities. Their
archdevils grant them terrible abilities and trust
that few others are given.
When players turn to the illrigger, they’re typ­
ically trying to fulfill a fantasy about that power–
to lead armies, assassinate foes, manipulate poli­
ticians, or command blood as they gain prom­inence
and infamy. Our team let that archetype—the
desire to gain and wield power—guide us during
the development process. The artists vividly
captured scenes and brought them to life. The
playtesters helped us ensure the fantasy feels right.
Laura Hirsbrunner worked magic on the words
to communicate that fantasy. And everything
is under the strong vision of Matt Colville and
James Introcaso, experts both in making a world
feel truly epic and fantastical.
But we can only bring the story partway. The
rest of an illrigger’s tale happens at the table as
the GM weaves nefarious plots around their party
members and builds on that fantasy.
I feel very lucky to be even a small part of those
stories I love so much—stories where you make a
promise you can never break, channel divine power
through your very being, or rise as a threatening
power player of Hell.
I hope the stories you tell are nefarious,
diabolical, and larger than life.

just kidding, it’s Sadie Lowry.
Many in the MCDM community know
my reputation for writing celestial-themed
projects. I wrote six ARCADIA articles!
There are memes about it! You can imagine my
amusement when James scheduled a Discord call
with me and broke the news: He wanted me to
be the project lead for the infernal, Hell-centered
revised illrigger. We had a good chuckle about that.
But I was thrilled to be involved in revising the
illrigger! Our goals were twofold. First, we would
bring the illrigger further in line with other fifth
edition classes, following groundwork laid by the
incredible Mario Ortegón. Second, we would
expand the class, adding two new subclasses (the
Hellspeaker and the Sanguine Knight), retainers,
and magic items.
I love working on extraplanar material–celestial
or otherwise. When players are drawn to other
planes, they’re looking for something larger than
life. They wander fey realms, looking for stories
where fairy tales are true, promises can’t be broken,
and mischief and whimsy are as dangerous as
violence and war. They walk the halls of the gods
searching for a calling, the magic to purge evil and
darkness, and a connection to a higher power.
In MCDM’s timescape, Hell is a place to rise
to power. Illriggers navigate politics and war­
mongering, infiltrate or obliterate flimsy mortal
hierarchies, and crush Goodness and Light under

Yours in vileness (for once),
Sadie Lowry
The Illrigger Revised Lead Designer

4

[Página 5]


[Página 6]
“Isn’t that the point?” Uluoria asked, flowing
upright from her perpetual crouch and standing
next to the memonek. “Why did we bother dying to
get that thing—” The protean hunter gestured at the
codex. “—if it didn’t have the answers?”
“It almost certainly does have the answers, but ...”
the first Soranis began.
“... it’s doubtful we have the right questions,”
the second Soranis finished. The only difference
between the original and his temporal doppelganger
was the trim of his long blue robes. ERN-F8 sighed.
“The codices were crafted by terran wizards. Elves
need no such tomes to master lore,” the first Soranis
explained.
“Time. Time is the key,” The second Soranis
added. “If this were a wode .... But here, cause
rules effect.”
“Even two of us,” the first Soranis said.
“We could spend many months studying this
tome and only learn a fraction of its secrets,”
the second Soranis said.
“Weeks surely,” the first one commented.
“Oh, you flatter us.” The second one bowed.
“I thought it worked, we saw it work,” Uluoria
said. “That’s why there’s ...” She gestured to the
second Soranis. “You’re from the future. Don’t
you know what we did? Did we win or lose?!” The
tension, the inaction, was going to tear the already
disparate group apart.
“In my future—” The second Soranis looked
from Uluoria to Lady F8. “—the Time Ender
slumbers still.”
“Wonderful,” Nuulus-Larr said, and the
dark elf fished out a piece of pickled mushroom
from a pouch.
“Wait.” Magnus held up a hand. He inhaled
slowly, a metallic smell tinged the air. “It’s starting,
get ready.”
“Finally.” Lady Dazran stopped pacing, but
stood on alert, fidgeting with the pommel of her
great sword.
The first Soranis closed the chronos codex and
Uluoria readied her bow.
A flash of light, and another portal opened.
It stood like a black mirror fringed with bright
blue crystals. There must have been a pressure
differential between the library at the top of the
tower and the world inside the portal, because

A fter a short battle,seven heroes from seven worlds
wait impatiently in the library at the top of the Tower
of Enchantment.
Magnus, human native of Orden, the Mundane
World. Priest.
ERN-F8, memonek native of Axiom, the Plane
of Uttermost Law. Paladin.
Uluoria, protean native of Primordius, the Sea of Eternal
Change. Ranger.
Soranis, and his temporal duplicate, True Elf native
of Arcadia. Wizard.
Zazamanc, fire dwarf native of Alloy, the City
at the Center of the Timescape. Fighter.
Nuulus-Larr, dark elf native of the World Below,
the Dark Under All. Thief.
Lady Dazran, human native of the Seven Cities of Hell.
Illrigger.

T

here wasn’t much left to do, except finishing
it. Except everything.
Lady Dazran paced while the dark elf
Larr fidgeted with a dagger and one Soranis
flipped through the chronos codex while the
other frowned and watched.
“I’m going to pull the spear out,” Magnus said
to ERN-F8. The memonek knight nodded and
braced herself.
Magnus’s muscles tensed; his sinews went taut
as he wrenched the sorcerous spear from Lady
Fate’s side. The living machine grunted and gritted
her teeth.
The spear came free and Magnus held it as he
watched the knight press her hand into her wounded
side and grimace.
“I guess it hurts,” the priest said.
“I am not an Inexorable,” the humanoid-knight
made of glass and ceramics and embossed brass
said. “I feel pain. And fear.”
“Almost human.” Magnus smiled.
“Are all healers in your world so insulting?”
Lady Dazran threw a glance at the two copies of
Soranis. “Well?” she demanded.
“This book is ...” The timeless elf wizard held the
tome open in one hand, pushed his long golden hair
back with the other. “If I had more time ...”

6

[Página 7]
air constantly rushed in, blowing their hair in the
sudden breeze.
“They did it,” Magnus breathed out with a sigh.
“The kids did it.”
“They live.” Zazamanc, the fire dwarf, growled,
impressed. “They live and their scheme succeeded.”
“They served their purpose,” Lady Dazran said
flatly. “Now it is our turn.” Ignoring the debate over
the codex, Lady Dazran turned to the group. “I will
lead,” she said.
“You think so?” Larr said with a sneer.
No one moved.
“Well?” Lady Dazran, Illrigger, asked. “Why
stand we here idle?”
Larr threw a warning glance at ERN-F8. It did
not go unnoticed or unheeded.
“Maybe someone stays behind,” the dark elf said.
“Keep someone in reserve,” Zazamanc agreed,
but there was a darkness to his tone.
“A reserve?” Lady Dazran asked. “Who?!”
“One of the Soranises, maybe,” the memonek
knight said. And then got round to it. Her gaze
rested on the hellknight. “You.”
“Me?! Don’t be a fool, you wouldn’t stand a ...”
She stopped. She was brash, headstrong, utterly
fearless. But she was not stupid. “What is this? When
have I given you cause to question my skill? Or is
this another crisis of conscience? ”
“It’s not your skill we question,” Lady Fate said.
“It’s your loyalty.”
She confronted the knight of Axiom. “Is that
what you fear? My loyalty? Hah!” She surveyed
the rest of the party. “Is that why we skulk in this
tower, in the shadows, out of sight, because you fear
a betrayal?” She sneered. “A dramatic betrayal in a
crucial moment?”
The second Soranis looked at his comrades.
Someone had to say it. “You serve Dispater.
A Lord of Hell. Who knows what you might do?
I don’t think ... none of us think you will betray us.
We just think ...”
Zazamanc finished it. “We think you could.”
“Betray you! Hahaha. You insects.” She took a
step back and surveyed the group. “You see loyalty
as the truth, the truth of a person. That one,” she
said, pointing to Magnus the prelate of Cavall, “is
loyal to Cavall. That is his loyalty, so that is his
character. This one—” She pointed to the dark elf.

“—serves only skill. That is his loyalty and so that is
his character.”
“I carry the seal of Dispater and thus you feel you
know my character. But I have served with you these
many weeks and what I have learned is that you
have learned nothing.”
She put her hand on her sword. “You know
nothing of loyalty or character. I will fight with
you, I will risk death and worse with you. I carry
Dispater’s seal, but I serve Hell. Hell is my world, as
real and vital to me as yours.
“Beyond this portal, none of us know what
we will find. I do not know what awaits. Only a
creature powerful enough to collapse the entire
timescape into one singular universe. What would
happen to my world then? Yours? You question my
loyalty when my world hangs in the balance?
“I do not fear what is beyond because we are
Heroes from Seven Worlds. Chosen by the gods!
By fate! Yet we sit here like mice and quarrel and
doubt and fear and that will be our undoing! We
face a god! A god of dragons! A god of time magics!”
She pointed to the portal. “And the only thing it
fears ... is us.”
Lady Fate considered for a moment, then
weighed in.
“If we do not work together, we lose.” The others
appreciated this sentiment. “I don’t think there’s
anyone here with your battlefield experience or,
frankly, your zeal for battle. I have no fear. Axiom
will follow Hell. What says Arcadia?”
The two true elves, standing a full head taller
than anyone else in the group, looked at each other,
and some unspoken thought passed between them.
Then they turned to face the group.
“We have seen Lady Dazran’s devotion to victory.
Arcadia has no doubts. We will follow Hell.”
“Quintessence?”
The fire dwarf warrior took a step forward.
“We of Alloy are no strangers to working with the
Seven Cities. Quintessence will follow Hell.”
Lady Fate turned to Magnus, the cleric. The only
other human besides Lady Dazran.
Magnus shrugged. “She got us this far,” he said.
“Hell leads. Orden will follow.”
“Primordius?”
The shapeshifting protean hunter flowed into a
new, more hideous form. “I like not this formality.

7

[Página 8]
She drew her sword, the massive blade forged
from a steel-devil’s rib.
“And Hell demands victory!”
She approached the portal. “Now. Ready
yourselves. Put doubt behind you. As long as I
am in front of you and the Time Ender before
me, we are facing victory. You will not fear death,
because so long as I live, you die only when I grant
permission, and today I am not that forgiving. Listen
for my voice. For when I call upon the Lord of War,
when I unleash the devastator, then you shall all
be servants of Hell. And Cthrion Uroniziir, Time
Ender, the Wyrm of the World’s End will find that
black crystal onyx and time magics are no match for
steel and spell ....”
Holding the massive steel-devil blade in her right
hand, she clenched her left hand into a fist and a
glowing, censorious seal manifested there.
“... and hellfire.”

I do not wish to be led like a thrazz on a leash. But
I like inaction even less. Therefore ... Primordius,
the Sea of Eternal Change, will follow Hell.”
ERN-F8 turned to the dark elf assassin.
“What says the World Below?” All eyes turned
to Nuulus Larr.
Outnumbered, and unwilling to press her point,
the dark elf outcast stood, pocketed her daggers and
drew her rapier and short-sword.
“I withdraw my earlier suspicion. Though I
reserve the right to say ‘I told you so.’” Lady Dazran
sneered. “The World Below, the Dark Under All,
will follow Hell.”
The group stood at attention. Lady Dazran
nodded. Lady Fate had always been the group’s
moral center, but none of them questioned who their
battlefield commander was.
“Then we will win,” the hell knight said. “If you
follow where I lead, we will win. If you strike where
my finger points, we will triumph. Where we walk,
death will follow and when the last drop of blood is
shed we seven will still be standing and they will be a
memory. Because I serve Hell.”

Lady Dazran, Illrigger, walked through
the portal, and the Heroes of Seven
Worlds followed.

8

[Página 9]
them their power. But the Order of Desolation
stands above the petty political squabbles dividing
the Seven Cities.
Members of the Order of Desolation, also known
as the Desolate, are expected to be intelligent,
resourceful, tactical, and manipulative. The order
was founded to give the archdevils capable agents
who could act independently across the timescape,
free from the direct control of their patron.
An illrigger has many powerful abilities
granted by their archdevil, but more precious is
their patron’s trust. Each illrigger is expected to
sow discord, pain, strife, deceit, and fear without
instruction or supervision. It’s not unusual,
therefore, for a Desolate to first rely on other order
members—regardless of which archdevil they
serve—before turning to an institution devoted
to their own archdevil.

Content Warning
This class contains a subclass called the Hellspeaker,
which has themes of mental manipulation and mind
control. In addition, the Sanguine Knight subclass
contains effects that manipulate another creature’s
blood. Lastly, illriggers are typically evil-aligned
characters—and even those who aren’t still serve evil
creatures with dark agendas.
We recommend using the MCDM Tabletop Safety
Toolkit and Checklist and adjusting as needed to ensure
everyone at your table is comfortable.

T

he archdevils who rule the Seven Cities of
Hell scheme endlessly. Each eternally plots
to bring the others to heel—to ascend to
the Throne of Hell, unite the Seven Cities
and every infernal being living there, and
lead an inexhaustible army of devils across the
timescape until all worlds burn.
These archdevils’ elite operatives are the
illriggers. Knights, assassins, mages, and terrorcommandos of Hell, illriggers command the
battlefield, disrupt enemy factions, and carry
out their archdevil’s infernal will.

Creating an Illrigger
To create an illrigger, consult the following
subsections, which give you hit points, proficiencies,
and starting equipment. Then look at the Illrigger
table to see which features you get at each level.
The descriptions of those features appear in the
“Class Features” section.

The Order of Desolation

Quick Build

You can make an illrigger quickly by following these
suggestions. First, put your highest ability score in
Strength (if you want to focus on melee weapons),
Dexterity (if you want to focus on archery or finesse
weapons), or Charisma (if you plan to choose the
Architect of Ruin subclass). Your second highest
ability score should be Constitution. Then, choose
the soldier or outlander background from the core
rules, or any background that gives proficiency in
skills such as Athletics, Deception, Intimidation,
or Persuasion.

Millennia ago, the rulers of Hell did something
remarkable: they cooperated. Together, they created
the Order of Desolation—knights sworn to serve
Hell first, their patron archdevil second.
Those accepted into the Order of Desolation
become comrades with every other illrigger,
regardless of which archdevil they serve. Each
archdevil has grand temples, underground fanes,
secret societies, and sinister cults, all with leaders
fanatically devoted to the archdevil who grants

9

[Página 10]
Hit Points

Equipment

Hit Dice: 1d10 per illrigger level
Hit Points at 1st Level: 10 + your Constitution
modifier
Hit Points at Higher Levels: 1d10 (or 6) + your
Constitution modifier per illrigger level after 1st

You start with the following equipment, in addition
to the equipment granted by your background:
• (a) two martial weapons or (b) one martial
weapon and a shield
• (a) chain shirt or (b) leather armor, a longbow,
and 20 arrows
• (a) a priest’s pack or (b) a dungeoneer’s pack
• five javelins
Alternatively, you can forgo this starting equipment
and the equipment granted by your background,
instead starting with 5d4 × 10 gp.

Proficiencies

Armor: Light armor, medium armor, shields
Weapons: Simple weapons, martial weapons
Tools: None
Saving Throws: Constitution, Charisma
Skills: Choose two from Arcana, Athletics,
Deception, Insight, Intimidation, Investigation,
Persuasion, Religion, Stealth

The Illrigger

Level
1st

Proficiency
Bonus
Features
+2
Baleful Interdict, Forked Tongue

Seal
Seals Damage
3
1d6

Interdict
Boons
—

Infernal
Conduit Dice
—

2nd

+2

Combat Mastery, Interdiction

3

1d6

1

—

3rd

+2

Diabolic Contract, Invoke Hell

4

1d6

1

—

4th

+2

Ability Score Improvement

4

1d6

1

—

5th

+3

Extra Attack

4

2d6

1

—

6th

+3

Infernal Conduit

4

2d6

1

3

7th

+3

Diabolic Contract feature

5

2d6

2

4

8th

+3

Ability Score Improvement

5

2d6

2

4

9th

+4

Forked Tongue improvement

5

2d6

2

5

10th

+4

Blood Price

5

2d6

2

5

11th

+4

5

3d6

2

6

12th

+4

Diabolic Contract feature, Infernal Conduit
improvement, Terrorizing Force
Ability Score Improvement

5

3d6

2

6

13th

+5

—

6

3d6

3

7

14th

+5

Superior Interdict

6

3d6

3

7

15th

+5

Diabolic Contract feature

6

3d6

3

8

16th

+5

Ability Score Improvement

6

3d6

3

8

17th

+6

Infernal Majesty

6

3d6

3

9

18th

+6

—

7

3d6

4

9

19th

+6

Ability Score Improvement

7

3d6

4

10

20th

+6

Master of Hell

7

4d6

4

10

10

[Página 11]
elapse when an interdicted creature dies and when
that seal is moved to a new creature.
Burning Seals. When an interdicted creature
you can see within 30 feet of you takes damage
from any source other than a seal burned by an
illrigger, you can burn any number of seals you
placed on them to deal 1d6 fire or necrotic damage
(your choice) to that creature per seal burned. You
deal this damage immediately after the triggering
damage. Burning a seal doesn’t require an action
from you, but you can’t do so while incapacitated.
Once a seal is burned, it immediately vanishes.
Once you reach 5th level in this class, your
connection to your archdevil strengthens. Each
burned seal deals an extra 1d6 damage, for a total
of 2d6. The damage of each seal increases again
by 1d6 when you reach 11th level (for a total of
3d6) and 20th level (for a total of 4d6) in this class,
as indicated in the Seal Damage column of the
Illrigger table.
Interdict Save. Class features you gain later
can add additional effects to your Baleful Interdict
and require your target to make a saving throw to
resist them. The saving throw DC for these effects
uses your interdict save DC, which is calculated
as follows:

Multiclassing and the Illrigger
If your group uses the optional rule on multiclassing
in the core rules, here’s what you need to know if you
choose illrigger as one of your classes.
Ability Score Minimum. As a multiclass character,
you must have at least a Charisma score of 13 and a
Strength or Dexterity score of 13 to take a level in
this class, or to take a level in another class if you are
already an illrigger.
Proficiencies Gained. If illrigger isn’t your initial
class, here are the proficiencies you gain when you
take your first level as an illrigger: light armor, medium
armor, shields, simple weapons, and martial weapons.
Spell Slots. If you multiclass and choose the
Architect of Ruin subclass, you determine your
available spell slots by adding half your illrigger
levels (rounded down) and otherwise following the
guidelines in the core rules.

Class Features
As an illrigger, you gain the following class features.

Baleful Interdict
1st-Level Illrigger Feature
You gain the ability to censure creatures with the
power of Hell. Once on your turn, you can place
a magical seal on a creature within 30 feet of you.
You can either place this seal when you hit that
target with a weapon attack (no action required),
or you can use a bonus action to place this seal on
a target you can see within range. This seal lasts
for 1 minute or until burned (see “Burning Seals”
below). A creature with one or more of your seals
is referred to as an interdicted creature. Seals you
place are invisible to other creatures, and when you
can see an interdicted creature, the seals appear to
you as glowing glyphs on the creature’s body.
You can only place a limited number of seals
before resting, and you regain all seals when you
finish a short or long rest. The number of seals you
can place increases as you gain illrigger levels, as
indicated in the Seals column of the Illrigger table.
If an interdicted creature dies, you can use a
bonus action on your turn to move all seals placed
on them to a new creature you can see within
30 feet of them. Each seal’s duration continues to

Interdict save DC = 8 + your proficiency bonus
+ your Charisma modifier

Forked Tongue
1st-Level Illrigger Feature
You can instinctively speak, read, and write
Infernal.
In addition, you can speak two other languages
of your choice, but you can’t read or write them.
When you finish a long rest, you can draw on your
archdevil’s knowledge to replace one of these two
languages. When you do, choose another language
whose name you know; you magically forget the
previous language and gain this new one instead.
Once you replace a language in this way, you must
finish a long rest before you can do so again.
Starting at 9th level, this feature grants you
another language, for a total of three (in addition
to Infernal). Furthermore, you gain advantage on
Wisdom (Insight) checks made to ascertain the
intentions or sincerity of creatures.

11

[Página 12]
Combat Mastery

Burn vs. Expend

2nd-Level Illrigger Feature
Your archdevil grants you uncanny skill in a certain
form of combat. Choose one of the following
illrigger combat masteries:
Bravado. While you are not wearing any armor,
your Armor Class equals 10 + your Dexterity
modifier + your Charisma modifier. You can use
a shield and still gain this benefit.
Brutal. When you hit a creature who is no more
than one size larger than you with an attack you
make with a melee weapon you are wielding
with two hands, you can move the target 5 feet
horizontally. If you choose, you can then spend
your movement to move into the space they left.
Inexorable. You gain a +1 bonus to saving throws
for each hostile creature within 5 feet of you, to
a maximum bonus of +5.
Lies. You can choose one type of melee weapon,
such as a battleaxe, greatsword, or spear. When
you attack with that type of weapon, you can use
your Charisma modifier, instead of Strength or
Dexterity, for the attack and damage rolls. You
can choose a new weapon type, which replaces
your previous choice, when you finish a long rest.
Lissome. When you hit a creature with a
melee weapon attack, you can spend your
movement to move 5 feet without provoking
opportunity attacks.
Unfettered. When you use your Baleful Interdict
to place or burn a seal, its range is 60 feet
instead of 30 feet. When you gain the Infernal
Conduit feature at 6th level, its range is 30 feet
instead of touch.
In addition, making a ranged attack while
within 5 feet of a hostile creature does not impose
disadvantage on the attack roll.

Burning a seal is part of the main gameplay loop of this
class. The illrigger places a seal by using a bonus action
or hitting a creature with an attack, then burns the
seal for additional damage (as described in the Baleful
Interdict class feature). Many interdict boons activate
when you burn a seal; these burned seals deal the
normal damage to the interdicted creature in addition
to any effects granted by the boon.
Other interdict boons instead require you to expend
a seal. In this case, the illrigger expends an unplaced
seal from their pool of available seals. This may require
using an action, bonus action, or reaction, but not
always (such as in the case of the Hellspeaker’s Charm
Enemy feature, where you can expend seals to increase
the number of targets).
Each active interdict boon details if any kind of action
is required to expend the seal and activate the boon’s
benefit. Part of the illrigger’s resource management is
maximizing efficiency between burned seals (and their
extra damage) and expended seals (and their unique
effects).

boons of your choice, as shown in the Interdict
Boons column of the Illrigger table. Each new boon
must be of a level you can learn. When you reach
7th level, for example, you learn one new boon of
2nd or 7th level.
Whenever you gain an illrigger level, you can
choose a boon you know and replace it with another
boon you can learn.
Using Interdict Boons. Some boons allow you
to expend unplaced seals to fuel abilities, while
others empower all your seals or grant you benefits
against interdicted creatures.
The boons that grant passive (or “always on”)
benefits, such as the 2nd-level Swift Retribution
boon, are marked with a “Passive” tag. You don’t
need to expend a seal or take an action to benefit
from the passive boons you know. All other boons,
such as the 2nd-level Abating Seal boon, must be
activated on a turn (for example, by expending a
seal). You can activate only one non-passive boon
per turn, regardless of how many you know.

Interdiction
2nd-Level Illrigger Feature
You can infuse your seals with hellish magical
power, enhancing their effects.
Interdict Boons Known. You learn one
interdict boon of your choice from the “Interdict
Boons” section at the end of the class’s description.
As you gain levels in this class, you gain additional

12

[Página 13]
Diabolic Contract

in your pool increase as you gain illrigger levels, as
shown in the Infernal Conduit Dice column of the
Illrigger table.
As an action, you can touch another creature and
spend one or more dice from your pool. The target
must make a Constitution saving throw against your
interdict save DC. A creature can willingly fail this
saving throw. Roll the spent dice and choose one of
the following effects:
Invigorate. On a failed save, the target regains
hit points equal to the total you rolled, and you
take necrotic damage equal to that total. On a
successful save, the target regains half as many

3rd-Level Illrigger Feature
You sign a diabolic contract with an archdevil
who welcomes you into the Order of Desolation.
Choose between the Architect of Ruin (Asmodeus),
Hellspeaker (Moloch), Painkiller (Dispater),
Sanguine Knight (Sutekh), or Shadowmaster
(Belial) as your archdevil. Each of these subclasses
is detailed after the class’s description. Your choice
grants you features at 3rd level and again at 7th,
11th, and 15th level.

Invoke Hell
3rd-Level Illrigger Feature
Your diabolic connection allows you to channel
infernal energy to empower magical effects. Your
chosen diabolic contract grants you two Invoke Hell
options and describes how to use each.
When you use your Invoke Hell, you choose
which option to use. You must then finish a short
or long rest to use your Invoke Hell again.
Some Invoke Hell effects require a saving throw.
When you use such an effect, the DC equals your
interdict save DC.

Painkiller

Ability Score Improvement
4th-Level Illrigger Feature
When you reach 4th level, and
again at 8th, 12th, 16th, and 19th
level, you can increase one ability score
of your choice by 2, or you can increase two ability
scores of your choice by 1. As normal, you can’t
increase an ability score above 20 using this feature.
Using the optional feats rule, you can
forgo taking this feature to take a feat of your
choice instead.

Extra Attack
5th-Level Illrigger Feature
You can attack twice, instead of once, whenever you
take the Attack action on your turn.

Infernal Conduit
6th-Level Illrigger Feature
You can strengthen your allies at the cost of
yourself—or drain your enemy’s life force
for your own gain. You have a pool of
Infernal Conduit dice, which are d10s.
The number of Infernal Conduit dice

13

[Página 14]
Infernal Majesty

hit points, and you take necrotic damage equal
to that total. Save or fail, this necrotic damage
can’t be reduced in any way, and if this damage
reduces you to 0 hit points, you fall unconscious
and are stabilized.
Devour. On a failed save, the target takes necrotic
damage equal to the total you rolled, and
you regain hit points equal to that total. On a
successful save, the target takes half as much
damage, and you regain hit points equal to the
damage the target took. Save or fail, or if the
target chose to fail their saving throw against
this effect, the necrotic damage can’t be reduced
in any way. When you reach 11th level in this
class, the target also gains a level of exhaustion
on a failed save against this effect. This level of
exhaustion can be reduced as normal, and a
creature can’t suffer more than three levels of
exhaustion combined from all illriggers’ Infernal
Conduit features.
You regain any spent Infernal Conduit dice when
you finish a long rest.

17th-Level Illrigger Feature
Your archdevil bestows on you the ability to don
a measure of their power. As a bonus action, you
channel the might of Hell, gaining the following
benefits for 10 minutes:
• You gain resistance to fire, cold, and necrotic
damage.
• Wings appear on your back, granting you a flight
speed of 60 feet.
• When you use your Blood Price, you can cause
an enemy you can see within 10 feet of you to
take damage equal to the number rolled on
your Hit Die.
• When you hit with a weapon attack, your
Terrorizing Force deals an extra 2d8 damage
instead of 1d8.
For the duration, if you die, you can choose to have
your body disappear in a burst of flame, leaving
behind only your equipment. If you do, your body
reforms 1d6 days later somewhere in Hell. Once
your body reforms, you return to life and regain all
of your hit points.
Once you channel your Infernal Majesty, you
must finish a long rest before you can do so again.

Blood Price
10th-Level Illrigger Feature
You can strengthen your defenses at the cost of your
vitality. Whenever you fail a saving throw, you can
spend one of your Hit Dice, rolling it and adding the
number rolled to the result of the save.

Master of Hell
20th-Level Illrigger Feature
You learn to tear open a rift to Hell and wreak
its fury on your enemies. As an action, you can
summon a hellstorm centered on a point you can see
within 150 feet of you. Choose one of the following
effects, which fills a 50-foot-radius sphere centered
on that point:
Inferno. Hellfire rains down on your foes. Each
enemy in that area must make a Dexterity saving
throw. On a failed save, a creature takes 5d10
fire damage plus 5d10 necrotic damage, and
they burn for 1 minute. On a successful save, a
creature takes half as much damage and does not
burn. A creature burning in this way must repeat
this saving throw at the end of their turn, taking
1d10 fire damage plus 1d10 necrotic damage on a
failed save, or ending the effect on themself on a
successful one. This hellfire can’t be extinguished
by nonmagical means.

Terrorizing Force
11th-Level Illrigger Feature
Your attacks are empowered with devastating
might. When you gain this feature, choose a
damage type: cold, fire, necrotic, or poison. When
you hit with a weapon attack, you deal an extra
1d8 damage of the chosen type. You can choose a
different damage type when you finish a long rest.

Superior Interdict
14th-Level Illrigger Feature
Damage from your seals ignores any damage
resistances the target has.
In addition, you can use a bonus action to regain
a seal if you have none remaining. Once you regain
a seal in this way, you can’t do so again until you
finish a long rest.

14

[Página 15]
Pestilence. A foul miasma swirls around your
foes. Each enemy in that area must make a
Constitution saving throw. On a failed save, a
creature takes 5d10 poison damage plus 5d10
necrotic damage and becomes poisoned for
1 minute. On a successful save, a creature takes
half as much damage and does not become
poisoned.
Darkness. A bitter storm assails your foes. Each
enemy in that area must make a Constitution
saving throw, taking 10d10 cold damage on
a failed save, or half as much damage on a
successful one. Additionally, the storm’s gloom
persists for 1 minute, and each enemy within that
area is blinded for the duration or until they leave
the area.
Once you summon a hellstorm, you must finish a
long rest before you can do so again.

Shadowmaster

Diabolic Contracts

Those who walk the path of Hell may gain the
powers of an illrigger purely through their own
devotion. No oath is necessary, no mentor—a
fledgling illrigger might not even be aware the
Order of Desolation exists. But true acceptance as a
Desolate means swearing an oath to a specific ruler
of Hell. This usually requires a senior member of the
order to perform an elaborate ritual, but a dedicated
illrigger might attract the attention of an archdevil
by doing deeds of great treachery on their own.
At some point on the illrigger’s journey, be it
through ritual or deed, they find themself face-toface with one of the rulers of the Seven Cities. When
they do, a contract must be signed in blood—usually
the knight’s own. This binds the itinerant knight to
the Order of Desolation and adds their name to the
Lists of Hell.
Though this experience can be intimidating,
the rulers of Hell are usually easy masters and
ask little from their chosen. The busy rulers of the
Seven Cities pay little heed to the daily lives of their
illriggers. Even breaches of precepts are overlooked;
as long as the knight sows discord and opposes
the Celestial Host, they successfully advance
Hell’s agenda.

15

[Página 16]


[Página 17]
Architect of Ruin

following skills of your choice: Arcana, History,
Nature, or Religion.
In addition, you can also read and write the
languages granted by your Forked Tongue, instead
of only speaking them.

Architects of Ruin are cool and calculating arcane
knights who serve Asmodeus, deploying spells, steel, and
subterfuge to win at any cost.
Asmodeus rules Acheron, the City of Fear. His
illriggers scour the timescape, collecting secrets and
spells designed to deceive and terrify his opponents.
The war he fights against the other archdevils is one
of deception and information.
His Architects of Ruin work to make Hell’s
enemies seem outnumbered and outmaneuvered.
These illriggers are skillful spellblades on the
battlefield, though some employ tactics such as
research, infiltration, and propaganda to play mind
games with their quarry. When an Architect of
Ruin finally confronts an enemy, the advantage is
theirs—they have studied, prepared, and gripped
fate within their gauntlet, forcing it to favor them.
They hungrily seek the dark arts to arm both
themselves and Asmodeus with the impossible.

Spellcasting
3rd-Level Architect of Ruin Feature
As an Architect of Ruin, you access a well of profane
magic to cast spells. See “Spellcasting” in the core
rules for the general rules of spellcasting.
Cantrips. You know two cantrips of your choice
from the Architect of Ruin spell list (presented at the
end of this subclass). You learn an additional cantrip
from this list at 10th level.
Spell Slots. The Architect of Ruin Spellcasting
table shows how many spell slots you have to cast
your illrigger spells of 1st level and higher. To cast
one of these spells, you must expend a slot of the
spell’s level or higher. You regain all expended spell
slots when you finish a long rest.
For example, if you know the 1st-level spell hellish
rebuke and have a 1st-level and a 2nd-level spell slot
available, you can cast hellish rebuke using either slot.
Spells Known of 1st Level and Higher. At 3rd
level, you know three 1st-level spells of your choice
from the Architect of Ruin spell list (presented at the
end of this subclass).
The Spells Known column of the Architect of
Ruin Spellcasting table shows when you learn more
illrigger spells of 1st level or higher. Each of these
spells must be of a level for which you have spell
slots. When you reach 7th level, for example, you
learn one new spell of 1st or 2nd level.
Whenever you gain a level in this class, you can
replace one of the illrigger spells you know with
another spell of your choice from the illrigger spell
list. The new spell must be of a level for which you
have spell slots.
Spellcasting Ability. Charisma is your
spellcasting ability for your spells, so you use
your Charisma whenever a spell refers to your
spellcasting ability. In addition, you use your
Charisma modifier when setting the saving throw
DC for a spell you cast and when making an attack
roll with one.

Precepts of Ruin

Architects of Ruin swear an oath to Asmodeus when
they join the Order of Desolation. These precepts
commit them to destroy Asmodeus’s enemies
by commanding great magic, causing fear, and
sowing distrust.
The Battlefield of the Mind. By the time my
armies meet yours, you’ll be filled with terror and
doubt your own strength. I won’t have to lift a finger
to defeat you.
The Proper Secret. Once I know your secrets,
I know your weakness.
Knowledge Is Power. Lore is as powerful as
steel. I learn every detail about my enemy and
anticipate their every move, checkmating them
before the game even begins.
Magic Is Mine to Command. Cunning is also
as powerful as steel. I wield the dark arcane arts to
manipulate your senses, weaken your resolve, and
strengthen my blade. Your soldiers will quake for
fear of what dark magics may next cloak my blade.

Asmodeus’s Blessing
3rd-Level Architect of Ruin Feature
When Asmodeus accepts you as an Architect
of Ruin, he grants you access to his infernal
knowledge. You gain proficiency in one of the

Spell save DC = 8 + your proficiency bonus
+ your Charisma modifier

17

[Página 18]
Spell attack modifier = your proficiency bonus
+ your Charisma modifier

Architect
of Ruin

Spellcasting Focus. You have an unholy
symbol, such as an amulet symbolizing your
archdevil, a fragment of a blasphemous
relic, or a glass orb holding a consecrated
drop of archdevil blood. You can use the
unholy symbol as a spellcasting focus
for your illrigger spells. You must have
a free hand to use the unholy symbol,
but it can be the same hand you use to
perform somatic components.

Invoke Hell
3rd-Level Architect of Ruin Feature
You gain the following two Invoke Hell options:
Enervating Spell. When you deal damage to
a creature with an illrigger spell of 1st level
or higher, you can expend a seal (no action
required) and imbue the spell with weakening

Architect of Ruin Spellcasting
Illrigger Cantrips Spells Spell Slots per Level
Level
Known Known 1st 2nd 3rd 4th
3rd

2

3

2

—

—

—

4th

2

4

3

—

—

—

5th

2

4

3

—

—

—

6th

2

4

3

—

—

—

7th

2

5

4

2

—

—

8th

2

6

4

2

—

—

9th

2

6

4

2

—

—

10th

3

7

4

3

—

—

11th

3

8

4

3

—

—

12th

3

8

4

3

—

—

13th

3

9

4

3

2

—

14th

3

10

4

3

2

—

15th

3

10

4

3

2

—

16th

3

11

4

3

3

—

17th

3

11

4

3

3

—

18th

3

11

4

3

3

—

19th

3

12

4

3

3

1

20th

3

13

4

3

3

1

18

[Página 19]
Vile Transmogrification

magic. The target has vulnerability to that spell’s
damage. If they normally have resistance or
immunity to the spell’s damage, that resistance
or immunity is suppressed for this spell, and the
target has vulnerability to the damage instead.
Spellblade. You can use an action to both make
a melee weapon attack and cast an illrigger spell
you know that has a casting time of one action.

15th-Level Architect of Ruin Feature
You uncover two new ways to employ Asmodeus’s
magic:
Regaining Seals. As a bonus action on your turn,
you can expend one spell slot to regain a number
of seals equal to that slot’s level.
Regaining Spell Slots. As a bonus action on your
turn, you can expend any number of seals to
regain a spell slot of a level equal to one-third that
number. For example, you can expend six seals to
regain a 2nd-level spell slot.
Once you use one of these benefits, you can’t use
that benefit again until you finish a long rest.

Hellish Versatility
7th-Level Architect of Ruin Feature
Once on each of your turns, you can cast one of
your illrigger cantrips in place of one of your attacks
granted by your Extra Attack feature.

Asmodeus’s Interdiction
7th-Level Architect of Ruin Feature
You learn the following additional interdict boons
at the noted illrigger levels. Once you learn an
interdict boon granted by this feature, you always
know it, and it doesn’t count against the number of
interdict boons you know.
Axiomatic Seals (7th Level; Passive).
Asmodeus’s secrets allow you to infuse your seals
with manifest power. When you burn one or more
seals to deal damage to a creature, you can activate
this boon (no action required) to add your Charisma
modifier (minimum of 1) to each seal’s damage roll.
Spellbreaker (13th Level). When an
interdicted creature you can see within 60 feet
of you casts a spell, you can use your reaction to
burn one or more of the seals on them. When you
do, burning the seal deals no damage, and instead
you cast counterspell on them without expending a
spell slot. Your spell’s level increases by 1 for every
additional seal you burn after the first.
Hell Mage (18th Level; Passive). When
you or an ally within 30 feet of you succeed on a
saving throw against a spell or other magical effect
imposed by an enemy, you can immediately place
one or more seals on that enemy, up to a number
equal to your proficiency bonus.

A Versatile Spellcaster
During this class’s development, we wanted to merge
the visions of our development team, playtesters, and
the MCDM audience on what the Architect of Ruin
should be. As a result, we revised this subclass many
(many) times. At one point in testing, the subclass had
the Pact Magic feature; this felt fun and thematic to
some, but limiting and frustrating to others. We tried
out several versions of the Spellcasting feature—a lessthan-third caster, a third-caster, and even a half-caster!
Many players wanted a sneaky illusionist with out-ofcombat utility, while others wanted a gish with spells
to empower combat.
We learned that half-casting made the subclass too
complex, while Pact Magic was too limiting. After much
iteration, trial, error, and oh-so-many playtests, we
settled on the final Architect of Ruin design. This thirdcaster illrigger provides enough spells to create options
without being overwhelming, and it gives the subclass
exactly what we wanted: flexibility.
No subclass is a perfect fit for every character, but
that’s why we offer so many of them! Manipulators and
charmers can turn to the Hellspeaker, assassins can
turn to the Shadowmaster, and so forth. Meanwhile,
the Architect of Ruin is intended to make way for
multiple play styles and support those who want a lot
of options. Players who want a gish can turn to spells
such as shield, blur, mirror image, and haste, while
players who want more out-of-combat tools can choose
spells such as disguise self, silent image, invisibility,
and enchantment spells.

Submit
11th-Level Architect of Ruin Feature
When you cast an illrigger spell you know, you can
burn two seals on an interdicted creature (no action
required) to impose disadvantage on their saving
throw against the spell.

19

[Página 20]
Architect of Ruin Spell List

Most of these spells are from the core game.
If the spell’s name is followed by an asterisk, the
spell is instead from the “New Spells” section
presented at the end of this class.

The following is the list of spells you consult when
you learn an Architect of Ruin spell. The list is
organized by spell level, not character level.

Cantrips

chill touch
dancing lights
fire bolt
hellfire*
message
minor illusion
ray of frost
shocking grasp
thaumaturgy
vengeful blade*
vicious mockery

1st Level

bane
burning hands
charm person
color spray
command
detect magic
disguise self
Hell’s lash*
hellish rebuke
shield
shield of faith
silent image

2nd Level

arcanist’s magic aura
augury
blur
darkness
detect thoughts
enthrall
heat metal
hold person
infernal challenge*
invisibility
lesser restoration
mirror image
ray of enfeeblement
scorching ray
silence
suggestion

3rd Level

bestow curse
dispel magic
fear
fly
haste
major image
mote of Hell*
phantom steed
remove curse
revivify
slow

20

4th Level

aura of desecration*
banishment
blight
compulsion
death ward
dimension door
dominate beast
greater invisibility
hallucinatory terrain
locate creature
maligned weapon*
phantasmal killer
wall of death*

[Página 21]
Hellspeaker

[Página 22]
Hellspeaker

Never Tell the Same Lie Twice. An overused
skill becomes too predictable. Keep moving, switch
targets, keep them guessing.

The charismatic and manipulative Hellspeakers serve
Moloch as they slip about the battlefield, coercing enemies
into becoming unwitting allies.

Moloch’s Blessing
3rd-Level Hellspeaker Feature
When Moloch accepts you as his illrigger, you gain
proficiency in the Persuasion or Deception skill (your
choice). If you already have proficiency in the skill
of your choice, your proficiency bonus is doubled for
any ability check you make with that skill.
In addition, your Forked Tongue feature grants
you an additional language (for a total of three at
3rd level and four at 9th level). Whenever you speak
in a language gained by this feature, your devilish
influence is subconsciously felt by creatures who can
hear and understand you, granting you advantage
on Charisma checks to influence those creatures.

Content Warning
This subclass has themes of mental manipulation and
mind control. Before choosing this subclass, please
ensure everyone at the table is comfortable exploring
these dark and harmful themes. And as always, we
encourage the ongoing use of safety tools throughout
your game.

Moloch rules Styx, the City of Lies, but his reach
extends far beyond it. Hell’s greatest politicians and
diplomats rise to prominence through Moloch’s
subtle manipulations. They follow him with great
loyalty, for they know they are nothing without
him—and thus his power echoes through all of Hell.
Moloch’s illriggers are silver-tongued enchanters,
lulling his foes to complacency with sorcery and
subterfuge until they wake and find themselves
under the command of the Order of Desolation.
These Hellspeakers train in the art known as the
Red Cant or Hell’s Cant. By understanding their
enemy and through weaving subtle sorceries into
normal speech, Hellspeakers can make their foes
feel, think, or do nearly anything to accelerate
Hell’s victory.
Across the timescape, Hellspeakers enjoy a
reputation as smiling rogues and swashbuckling
villains. An asset in any negotiation, Hellspeakers
know that in a world of lies, the truth can be as
potent a weapon as steel.

Charm Enemy
3rd-Level Hellspeaker Feature
When you use your bonus action to place a seal on
a Humanoid, you can attempt to charm them. The
target must succeed on a Charisma saving throw
or be charmed by you for 1 hour or until you or
your companions do anything harmful to them.
While charmed, the target regards you as a friendly
acquaintance. When the charmed condition ends,
the target knows they were charmed by you.
When you use this bonus action, you can
additionally burn one or more seals on one or more
other interdicted Humanoids within 30 feet of you,
attempting to charm those targets as well. After
taking damage from the burned seals, each of those
targets must succeed on a Charisma saving throw or
be under the same charmed effect.
You can use this feature a number of times equal
to your Charisma modifier (minimum of once),
and you regain all expended uses when you finish
a long rest.

Precepts of Deception

Hellspeakers swear an oath to Moloch when they
join the Order of Desolation. By following these
precepts, they infiltrate the farthest reaches of
power and manipulate all under their influence.
My Voice Is a Weapon. Even when my
enchantments fail, if my enemy can hear me,
they are mine.
Doubt Is Certainty. I need not convince my
enemy, only sow doubt and wait for it to bear fruit.
Trust Me. For each lie I utter, I tell the truth
tenfold. One who always lies says nothing.

Invoke Hell
3rd-Level Hellspeaker Feature
You gain the following two Invoke Hell options:
Honey-Sweet Blades. When you make a
weapon attack against an interdicted creature,
you can gain advantage on that attack (no
action required). If the attack hits, it becomes
a critical hit.

22
