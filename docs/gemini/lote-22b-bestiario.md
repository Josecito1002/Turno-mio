# Encargo: Lote 22b (bestiario, desafío 1/4 a 1/2) de la app "Mi turno"

"Mi turno" es una app de D&D (reglas 2024) en español. Su Mesa del DM ya tiene las estadísticas de los monstruos del
Manual de Monstruos 2025 (CA, PG, ataques, daños, CD). Tu trabajo: poner en español, en el formato de abajo, el nombre de
cada monstruo, una descripción y el nombre y texto de cada rasgo y acción, usando **solo el texto oficial en inglés** que
viene al final. Otra persona aplica tu respuesta con un script, así que el formato tiene que ser exacto.

## Reglas

1. **Nombres**: el nombre oficial en español del Manual de Monstruos si lo conoces con seguridad (Goblin → "Goblin",
   Owlbear → "Oso lechuza"). Si no hay traducción oficial o no estás seguro, deja el nombre en **inglés** tal cual: no
   inventes nombres. Lo mismo para los rasgos y acciones con nombre propio.
2. **Textos propios en español**, nunca traducción literal: resume con tus palabras.
   - `texto` (descripción del monstruo): 2 a 4 frases sobre qué es, dónde vive y cómo se comporta, a partir de la
     descripción oficial. Si no hay descripción oficial, 1 o 2 frases a partir de sus rasgos.
   - Rasgos y acciones: 1 a 3 frases con lo que hace. **No repitas los números** que la app ya muestra (bono de ataque,
     alcance, daño, CD y salvación): di solo el efecto extra (derriba, agarra, envenena, recarga, cuántos ataques hace...).
3. Los nombres de conjuros, en español si conoces el oficial.
4. Si algo no se entiende, escríbelo igual con la marca [NO CONFIRMADO].
5. Responde **solo** con el bloque de código JSON, sin nada antes ni después.

## Formato de la respuesta

Un único bloque ```json con un objeto: clave = la clave del monstruo (la que va entre corchetes en el texto oficial,
p. ej. [goblin-warrior]). Dentro de `partes`, una entrada por cada rasgo y acción, con su nombre en inglés **exacto**
como clave (tal como aparece en el texto oficial, incluido "(Recarga 5–6)" si lo trae):

```json
{
  "goblin-warrior": {
    "n": "Guerrero goblin",
    "texto": "Descripción propia de 2 a 4 frases.",
    "partes": {
      "Scimitar": { "n": "Cimitarra", "t": "Si tenía ventaja en el ataque, hace 1d4 de daño cortante extra." },
      "Nimble Escape": { "n": "Huida ágil", "t": "Se retira o se esconde como acción adicional." }
    }
  }
}
```

Incluye **todos** los monstruos del texto oficial, sin saltarte ninguno.

## Texto oficial (fuente única): 60 monstruos

### [blink-dog] Blink Dog — desafío 1/4, Mediano Feérico
Descripción oficial: [Blink Dog] Elusive Feywild Canine [Habitat:] Forest, Planar (Feywild) [Treasure:] None Blink dogs glimmer with a magic that allows them to teleport, "blinking" from one spot to another. These dogs use this power to chase prey, baffle foes, and express joy. They're frequently found among Feywild folk, such as centaurs and pixies—often as members of rollicking hunts between worlds.
  - Bite: m 5, reach 5 ft. {@h}5 (1d4 + 3) Piercing damage.
  - Teleport (Recarga 4–6): The dog teleports up to 40 feet to an unoccupied space it can see.

### [boar] Boar — desafío 1/4, Mediano Bestia
  - Bloodied Fury: While Bloodied, the boar has Advantage on attack rolls.
  - Gore: m 3, reach 5 ft. {@h}4 (1d6 + 1) Piercing damage. If the target is a Medium or smaller creature and the boar moved 20+ feet straight toward it immediately before the hit, the target takes an extra 3 (1d6) Piercing damage and has the Prone condition.

### [bullywug-warrior] Bullywug Warrior — desafío 1/4, Mediano Feérico
  - Amphibious: The bullywug can breathe air and water.
  - Speak with Frogs and Toads: The bullywug can communicate simple concepts to frogs and toads when it speaks in Bullywug.
  - Insectile Rapier: m 4, reach 5 ft. {@h}6 (1d8 + 2) Piercing damage plus 2 (1d4) Poison damage.
  - Leap: The bullywug can jump up to 30 feet by spending 10 feet of movement.

### [constrictor-snake] Constrictor Snake — desafío 1/4, Grande Bestia
  - Bite: m 4, reach 5 ft. {@h}6 (1d8 + 2) Piercing damage.
  - Constrict: str 12, one Medium or smaller creature the snake can see within 5 feet. {@actSaveFail} 7 (3d4) Bludgeoning damage, and the target has the Grappled condition (escape 12).

### [draft-horse] Draft Horse — desafío 1/4, Grande Bestia
  - Hooves: m 6, reach 5 ft. {@h}6 (1d4 + 4) Bludgeoning damage.

### [dretch] Dretch — desafío 1/4, Pequeño Infernal
  - Rend: m 3, reach 5 ft. {@h}4 (1d6 + 1) Slashing damage.
  - Fetid Cloud (1/Day): con 11, each creature in a 10-foot Emanation originating from the dretch. {@actSaveFail} The target has the Poisoned condition until the end of its next turn. While Poisoned, the creature can take either an action or a Bonus Action on its turn, not both, and it can't take Reactions.

### [elk] Elk — desafío 1/4, Grande Bestia
  - Ram: m 5, reach 5 ft. {@h}6 (1d6 + 3) Bludgeoning damage. If the target is a Large or smaller creature and the elk moved 20+ feet straight toward it immediately before the hit, the target takes an extra 3 (1d6) Bludgeoning damage and has the Prone condition.

### [giant-badger] Giant Badger — desafío 1/4, Mediano Bestia
  - Bite: m 3, reach 5 ft. {@h}6 (2d4 + 1) Piercing damage.

### [giant-bat] Giant Bat — desafío 1/4, Grande Bestia
  - Bite: m 5, reach 5 ft. {@h}6 (1d6 + 3) Piercing damage.

### [giant-centipede] Giant Centipede — desafío 1/4, Pequeño Bestia
  - Bite: m 4, reach 5 ft. {@h}4 (1d4 + 2) Piercing damage, and the target has the Poisoned condition until the start of the centipede's next turn.

### [giant-frog] Giant Frog — desafío 1/4, Mediano Bestia
  - Amphibious: The frog can breathe air and water.
  - Standing Leap: The frog's Long Jump is up to 20 feet and its High Jump is up to 10 feet with or without a running start.
  - Bite: m 3, reach 5 ft. {@h}5 (1d6 + 2) Piercing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape 11).
  - Swallow: The frog swallows a Small or smaller target it is grappling. While swallowed, the target isn't Grappled but has the Blinded and Restrained conditions, and it has Total Cover against attacks and other effects outside the frog. While swallowing the target, the frog can't use Bite, and if the frog dies, the swallowed target is no longer Restrained and can escape from the corpse using 5 feet of movement, exiting with the Prone condition. At the end of the frog's next turn, the swallowed target takes 5 (2d4) Acid damage. If that damage doesn't kill it, the frog disgorges it, causing it to exit Prone.

### [giant-lizard] Giant Lizard — desafío 1/4, Grande Bestia
  - Spider Climb: The lizard can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - Bite: m 4, reach 5 ft. {@h}6 (1d8 + 2) Piercing damage.

### [giant-owl] Giant Owl — desafío 1/4, Grande Celestial
  - Flyby: The owl doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.
  - Talons: m 4, reach 5 ft. {@h}7 (1d10 + 2) Slashing damage.
  - Spellcasting (conjuros): The owl casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability: Detect Evil and Good Detect Magic Clairvoyance

### [giant-venomous-snake] Giant Venomous Snake — desafío 1/4, Mediano Bestia
  - Bite: m 6, reach 10 ft. {@h}6 (1d4 + 4) Piercing damage plus 4 (1d8) Poison damage.

### [giant-wolf-spider] Giant Wolf Spider — desafío 1/4, Mediano Bestia
  - Spider Climb: The spider can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - Bite: m 5, reach 5 ft. {@h}5 (1d4 + 3) Piercing damage plus 5 (2d4) Poison damage.

### [goblin-warrior] Goblin Warrior — desafío 1/4, Pequeño Feérico
  - Scimitar: m 4, reach 5 ft. {@h}5 (1d6 + 2) Slashing damage, plus 2 (1d4) Slashing damage if the attack roll had Advantage.
  - Shortbow: r 4, range 80/320 ft. {@h}5 (1d6 + 2) Piercing damage, plus 2 (1d4) Piercing damage if the attack roll had Advantage.
  - Nimble Escape: The goblin takes the Disengage or Hide action.

### [grimlock] Grimlock — desafío 1/4, Mediano Aberración
Descripción oficial: [Grimlock] Puppet of the Mind Flayer Menace [Habitat:] Underdark [Treasure:] None Grimlocks are victims of biological manipulation by mind flayers. To create grimlocks, illithids capture Humanoids, expose them to strange forms of Underdark radiation, and implant new directives into their brains. The process of creating a grimlock rends the creature's mind such that no semblance of the individual's former personality remains. Grimlocks have shallow depressions rather than eyes. A sixth sense allows grimlocks to perceive their surroundings. Psychic energies from their transformations linger in grimlocks' bodies, and they channel these eerie forces into their attacks. Roll on or choose a result from the Grimlock Tasks table to inspire how grimlocks serve illithids. Grimlock Tasks / 1 | Carving caves to serve as illithid outposts. / 2 | Hiding the threat of mind flayers beneath fake, purposefully crude dwellings. / 3 | Pretending to be helpful and luring travelers into false senses of security. / 4 | Raiding surface communities and tempting other creatures to pursue it into illithid traps. We thought we'd discovered a new people living deeper than we believed possible. The truth was something far worse.
  - Bone Cudgel: m 5, reach 5 ft. {@h}6 (1d6 + 3) Bludgeoning damage plus 2 (1d4) Psychic damage.

### [kenku] Kenku — desafío 1/4, Mediano Monstruosidad
Descripción oficial: [Kenku] Flightless, Noise-Mimicking Avian [Habitat:] Forest, Planar (Shadowfell), Urban [Treasure:] Implements, Individual Kenku are birdlike folk who once soared the skies and sang enchanted songs, but a curse stole their wings and transformed their voices. Now kenku slip through the shadows of cities and the Shadowfell, trying to recover what they've lost. To some, this means seeking an end to their curse; others search for magic or contraptions to enable them to fly and sing again. The curse affecting kenku allows them to vocally communicate only by mimicking sounds they've heard. Kenku can supernaturally re-create vast varieties of noises, from crying babies to running water and short phrases in others' voices. Cunning kenku use their mimicry to deceive foes, lure creatures into ambushes, and signal to allies.
  - Mimicry: The kenku can mimic any sounds it has heard, including voices. A creature that hears the sounds can tell they are imitations with a successful 14 Wisdom (Insight) check.
  - Shadow Blade: m,r 5, reach 5 ft. or range 60 ft. {@h}6 (1d6 + 3) Necrotic damage. {@hom}The blade magically returns to the kenku's hand immediately after a ranged attack.
  - Eldritch Lantern {@recharge 4} (conjuros): The kenku casts Faerie Fire, using Intelligence as the spellcasting ability (spell save 10).

### [kuo-toa] Kuo-toa — desafío 1/4, Mediano Aberración
  - Amphibious: The kuo-toa can breathe air and water.
  - Sunlight Sensitivity: While in sunlight, the kuo-toa has Disadvantage on ability checks and attack rolls.
  - Spear: m,r 3, reach 5 ft. or range 20/60 ft. {@h}5 (1d8 + 1) Piercing damage.
  - Sticky Net (1/Day): dex 10, one Large or smaller creature the kuo-toa can see within 15 feet. {@actSaveFail} The target has the Restrained condition until the net is destroyed (AC 10; HP 5; Immunity to Bludgeoning, Poison, and Psychic damage). A creature can take an action to make a 10 Strength (Athletics) check to free itself or another creature in a net within 5 feet, destroying the net on a success.
  - Sticky Shield: {@actTrigger} A creature misses the kuo-toa with a melee attack roll using a weapon. dstr 11, the triggering creature. {@actSaveFail} The attack's weapon sticks to the kuo-toa's shield. If the target doesn't let go of the weapon, the target has the Grappled condition while the weapon is stuck (escape 11). While stuck, the weapon can't be used. The target can take an action to make a 11 Strength (Athletics) check, freeing the weapon on a success.

### [modron-duodrone] Modron Duodrone — desafío 1/4, Mediano Constructo
  - Disintegration: If the modron dies, it disintegrates into dust, leaving behind anything it was wearing or carrying.
  - Multiattack: The modron makes two Clockwork Blade attacks.
  - Clockwork Blade: m,r 3, reach 5 ft. or range 30 ft. {@h}4 (1d6 + 1) Force damage. {@hom}The blade magically returns to the modron's hand immediately after a ranged attack.

### [mud-mephit] Mud Mephit — desafío 1/4, Pequeño Elemental
  - Death Burst: The mephit explodes when it dies. dex 11, each creature in a 5-foot Emanation originating from the mephit. {@actSaveFail} The target has the Restrained condition until the end of its next turn.
  - Slam: m 3, reach 5 ft. {@h}4 (1d6 + 1) Bludgeoning damage.
  - Mud Breath (Recarga 6): dex 11, one creature the mephit can see within 15 feet. {@actSaveFail} The target has the Restrained condition until the end of the mephit's next turn.

### [needle-blight] Needle Blight — desafío 1/4, Mediano Planta
  - Claw: m 3, reach 5 ft. {@h}6 (2d4 + 1) Slashing damage.
  - Needles: r 3, range 30/60 ft. {@h}6 (2d4 + 1) Piercing damage.

### [panther] Panther — desafío 1/4, Mediano Bestia
  - Rend: m 5, reach 5 ft. {@h}6 (1d6 + 3) Slashing damage.
  - Nimble Escape: The panther takes the Disengage or Hide action.

### [pixie] Pixie — desafío 1/4, Diminuto Feérico
  - Magic Resistance: The pixie has Advantage on saving throws against spells and other magical effects.
  - Faerie Dust: m,r 4, reach 5 ft. or range 60 ft. {@h}1 Radiant damage, and the target has the Charmed or Poisoned condition (pixie's choice) until the start of the pixie's next turn.
  - Spellcasting (conjuros): The pixie casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 12): Dancing Lights Druidcraft Invisibility (self only) Detect Thoughts Fly Sleep

### [priest-acolyte] Priest Acolyte — desafío 1/4, Pequeño o Mediano Humanoide
  - Mace: m 4, reach 5 ft. {@h}5 (1d6 + 2) Bludgeoning damage plus 2 (1d4) Radiant damage.
  - Radiant Flame: r 4, range 60 ft. {@h}7 (2d6) Radiant damage.
  - Spellcasting (conjuros): The priest casts one of the following spells, using Wisdom as the spellcasting ability: Light Thaumaturgy
  - Divine Aid (1/Day) (conjuros): The priest casts Bless, Healing Word, or Sanctuary, using the same spellcasting ability as Spellcasting. Bless Healing Word Sanctuary

### [pseudodragon] Pseudodragon — desafío 1/4, Diminuto Dragón
Descripción oficial: [Pseudodragon] Fickle, Pint-Sized Dragon [Habitat:] Coastal, Desert, Forest, Hill, Mountain, Urban [Treasure:] Arcana Pseudodragons dwell in scenic wildernesses, preferably where life is easy and prey is small and slow. There they behave like contented wyrms, creating tiny lairs amid ancient trees and rugged cliffs. They fill these lairs with shiny rocks, colorful shells, and unattended treasures that catch their attention, and they guard these hoards fiercely. Pseudodragons grow to the size of large house cats, and most have red-brown scales. Some have scales with other hues or patterns—markings distinct from those of their larger draconic cousins. Many magic-users attempt to befriend pseudodragons, hoping to enlist them as familiars. The creatures' intellect and resistance to magic make them excellent companions, and they're considered status symbols in some spellcasting circles. Many pseudodragons prefer the finer things in life. These diminutive dragons might be inclined to aid those who ply them with treats. Contrariwise, mages who don't properly pamper their pseudo dragon familiars might be abandoned without warning. Roll on or choose an option from the Pseudo dragon Treats table to inspire a pseudodragon's taste in gifts. Pseudodragon Treats / 1 | Flamboyant accessories it can wear. / 2 | Mementos from a lost friend or master. / 3 | Outlandish delicacies—like axe beak-egg omelets or mammoth-milk cheese. / 4 | The possessions of a sibling, rival, or master. / 5 | Shiny gifts, from gems to abalone shells. / 6 | Soft bedding and stuffed toys. / 7 | A specific cook's signature dessert. / 8 | Time-consuming beauty treatments. / 9 | To hear a bedtime story or favorite song. / 10 | Trophies and important-sounding titles. If you want to keep a pseudodragon happy, get used to thinking of yourself as its familiar.
  - Magic Resistance: The pseudodragon has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The pseudodragon makes two Bite attacks.
  - Bite: m 4, reach 5 ft. {@h}4 (1d4 + 2) Piercing damage.
  - Sting: con 12, one creature the pseudodragon can see within 5 feet. {@actSaveFail} 5 (2d4) Poison damage, and the target has the Poisoned condition for 1 hour. While Poisoned, the target also has the Unconscious condition, which ends early if the target takes damage or a creature within 5 feet of it takes an action to wake it.

### [pteranodon] Pteranodon — desafío 1/4, Mediano Bestia
  - Flyby: The pteranodon doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.
  - Bite: m 4, reach 5 ft. {@h}6 (1d8 + 2) Piercing damage.

### [riding-horse] Riding Horse — desafío 1/4, Grande Bestia
  - Hooves: m 5, reach 5 ft. {@h}7 (1d8 + 3) Bludgeoning damage.

### [skeleton] Skeleton — desafío 1/4, Mediano Muerto viviente
  - Shortsword: m 5, reach 5 ft. {@h}6 (1d6 + 3) Piercing damage.
  - Shortbow: r 5, range 80/320 ft. {@h}6 (1d6 + 3) Piercing damage.

### [smoke-mephit] Smoke Mephit — desafío 1/4, Pequeño Elemental
  - Death Burst: The mephit explodes when it dies. con 11, each creature in a 5-foot Emanation originating from the mephit. {@actSaveFail} The target has the Poisoned condition until the end of its next turn.
  - Claw: m 4, reach 5 ft. {@h}4 (1d4 + 2) Slashing damage.
  - Cinder Breath (Recarga 6): dex 11, one creature the mephit can see within 15 feet. {@actSaveFail} The target has the Blinded condition until the end of the mephit's next turn.

### [sprite] Sprite — desafío 1/4, Diminuto Feérico
Descripción oficial: [Sprite] Elusive Defender of Fey Realms [Habitat:] Forest, Planar (Feywild) [Treasure:] Armaments Sprites dwell in mystical forests touched by the magic of the Feywild, living peacefully with most other Fey and friends of nature. These foot-tall spirits of nature resemble elves with exaggerated, whimsical features and gossamer wings. Sprites can sense the innate goodness or wickedness of other creatures. Those that enter their realms with good intentions might be treated to tiny feasts and celebrations. The wicked face nasty tricks and bold ambushes at the hands of invisible sprite defenders. These woodland guardians enchant the arrows of their tiny bows with charming magic that can pierce the heart of the fiercest foe. Sprites oppose any creatures that seek to harm places of natural magic and beauty. This can put them into conflict with would-be settlers, monsters like ettercaps, and despoilers such as goblinoids and hags. They frequently aid other good creatures of the forest, including treants and unicorns, in defending their homes. The tree had a wee village nestled in its boughs, I swear. Next thing I knew, I was lyin' face-down in the dirt. My head was full of stars, an' when I stood up an' looked around, both the tree an' the wee village were gone.
  - Needle Sword: m 6, reach 5 ft. {@h}6 (1d4 + 4) Piercing damage.
  - Enchanting Bow: r 6, range 40/160 ft. {@h}1 Piercing damage, and the target has the Charmed condition until the start of the sprite's next turn.
  - Heart Sight: cha 10, one creature within 5 feet the sprite can see (Celestials, Fiends, and Undead automatically fail the save). {@actSaveFail} The sprite knows the target's emotions and alignment.
  - Invisibility (conjuros): The sprite casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability. Invisibility

### [steam-mephit] Steam Mephit — desafío 1/4, Pequeño Elemental
  - Blurred Form: Attack rolls against the mephit are made with Disadvantage unless the mephit has the Incapacitated condition.
  - Death Burst: The mephit explodes when it dies. dex 10, each creature in a 5-foot Emanation originating from the mephit. {@actSaveFail} 5 (2d4) Fire damage. {@actSaveSuccess} Half damage.
  - Claw: m 2, reach 5 ft. {@h}2 (1d4) Slashing damage plus 2 (1d4) Fire damage.
  - Steam Breath (Recarga 6): con 10, each creature in a 15-foot Cone. {@actSaveFail} 5 (2d4) Fire damage, and the target's Speed decreases by 10 feet until the end of the mephit's next turn. {@actSaveSuccess} Half damage only. {@actSaveSuccessOrFail} Being underwater doesn't grant Resistance to this Fire damage.

### [swarm-of-bats] Swarm of Bats — desafío 1/4, Grande Bestia
  - Swarm: The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny bat. The swarm can't regain Hit Points or gain Temporary Hit Points.
  - Bites: m 4, reach 5 ft. {@h}5 (2d4) Piercing damage, or 2 (1d4) Piercing damage if the swarm is Bloodied.

### [swarm-of-rats] Swarm of Rats — desafío 1/4, Mediano Bestia
  - Swarm: The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny rat. The swarm can't regain Hit Points or gain Temporary Hit Points.
  - Bites: m 2, reach 5 ft. {@h}5 (2d4) Piercing damage, or 2 (1d4) Piercing damage if the swarm is Bloodied.

### [swarm-of-ravens] Swarm of Ravens — desafío 1/4, Mediano Bestia
  - Swarm: The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny raven. The swarm can't regain Hit Points or gain Temporary Hit Points.
  - Beaks: m 4, reach 5 ft. {@h}5 (1d6 + 2) Piercing damage, or 2 (1d4) Piercing damage if the swarm is Bloodied.
  - Cacophony (Recarga 6): wis 10, one creature in the swarm's space. {@actSaveFail} The target has the Deafened condition until the start of the swarm's next turn. While Deafened, the target also has Disadvantage on ability checks and attack rolls.

### [troglodyte] Troglodyte — desafío 1/4, Mediano Monstruosidad
Descripción oficial: [Troglodyte] Reeking Subterranean Hunter [Habitat:] Underdark [Treasure:] Armaments With features similar to those of pale cave lizards, troglodytes stalk the Underdark in an endless hunt for food. Troglodytes consume almost anything, including bones, giant insects, and other subterranean dwellers. They prey on subterranean communities and those near entrances to the Underdark, stealing livestock and kidnapping residents. Troglodytes prefer to ambush prey and can change their scale color to blend in with their surroundings. They often climb along cavern walls or emerge from deep fissures to take their prey by surprise. Despite their stealthiness, these stalkers exude a distinctly repulsive stench. Descriptions of what troglodytes smell like span a spectrum as complex as it is vile. This reek nauseates many who smell it, but it can also warn of the presence of troglodytes before they strike. Smells fine to me.
  - Stench: con 12, any creature (other than a troglodyte) that starts its turn in a 5-foot Emanation originating from the troglodyte. {@actSaveFail} The target has the Poisoned condition until the start of its next turn. {@actSaveSuccess} The target is immune to the Stench of all troglodytes for 1 hour.
  - Sunlight Sensitivity: While in sunlight, the troglodyte has Disadvantage on ability checks and attack rolls.
  - Rend: m 4, reach 5 ft. {@h}5 (1d6 + 2) Slashing damage.

### [violet-fungus] Violet Fungus — desafío 1/4, Mediano Planta
  - Multiattack: The fungus makes two Rotting Touch attacks.
  - Rotting Touch: m 2, reach 10 ft. {@h}4 (1d8) Necrotic damage.

### [winged-kobold] Winged Kobold — desafío 1/4, Pequeño Dragón
  - Pack Tactics: The kobold has Advantage on an attack roll against a creature if at least one of the kobold's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - Sunlight Sensitivity: While in sunlight, the kobold has Disadvantage on ability checks and attack rolls.
  - Dragon-Tooth Blade: m 5, reach 5 ft. {@h}6 (1d6 + 3) Piercing damage.
  - Chromatic Spittle: r 5, range 30 ft. {@h}6 (1d6 + 3) damage of a type chosen by the kobold: Acid, Cold, Fire, Lightning, or Poison.

### [wolf] Wolf — desafío 1/4, Mediano Bestia
  - Pack Tactics: The wolf has Advantage on attack rolls against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - Bite: m 4, reach 5 ft. {@h}5 (1d6 + 2) Piercing damage. If the target is a Medium or smaller creature, it has the Prone condition.

### [zombie] Zombie — desafío 1/4, Mediano Muerto viviente
  - Undead Fortitude: If damage reduces the zombie to 0 Hit Points, it makes a Constitution saving throw (5 plus the damage taken) unless the damage is Radiant or from a Critical Hit. On a successful save, the zombie drops to 1 Hit Point instead.
  - Slam: m 3, reach 5 ft. {@h}5 (1d8 + 1) Bludgeoning damage.

### [ape] Ape — desafío 1/2, Mediano Bestia
  - Multiattack: The ape makes two Fist attacks.
  - Fist: m 5, reach 5 ft. {@h}5 (1d4 + 3) Bludgeoning damage.
  - Rock (Recarga 6): r 5, range 25/50 ft. {@h}10 (2d6 + 3) Bludgeoning damage.

### [black-bear] Black Bear — desafío 1/2, Mediano Bestia
  - Multiattack: The bear makes two Rend attacks.
  - Rend: m 4, reach 5 ft. {@h}5 (1d6 + 2) Slashing damage.

### [cockatrice] Cockatrice — desafío 1/2, Pequeño Monstruosidad
  - Petrifying Bite: m 3, reach 5 ft. {@h}3 (1d4 + 1) Piercing damage. If the target is a creature, it is subjected to the following effect. con 11. 1 The target has the Restrained condition. The target repeats the save at the end of its next turn if it is still Restrained, ending the effect on itself on a success. 2 The target has the Petrified condition, instead of the Restrained condition, for 24 hours.

### [crocodile] Crocodile — desafío 1/2, Grande Bestia
  - Hold Breath: The crocodile can hold its breath for 1 hour.
  - Bite: m 4, reach 5 ft. {@h}6 (1d8 + 2) Piercing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape 12). While Grappled, the target has the Restrained condition.

### [darkmantle] Darkmantle — desafío 1/2, Pequeño Aberración
Descripción oficial: [Darkmantle] Ceiling-Clinging Ambush Predator [Habitat:] Underdark [Treasure:] None Unnatural subterranean hunters, darkmantles veil themselves in magical shadows and use their bizarre anatomies to disguise themselves as stalactites. When prey passes below, lurking darkmantles drop and unfurl their webbed tentacles, attempting to blind, suffocate, or crush their victims. Darkmantles share similarities with piercers and ropers and often hunt near those monsters. Scholars have attempted to establish a shared origin or life cycle between those creatures, but their efforts are thwarted by those monsters' supernatural physiologies and deadly natures. Just assume there's no such thing as a stalactite.
  - Crush: m 5, reach 5 ft. {@h}6 (1d6 + 3) Bludgeoning damage, and the darkmantle attaches to the target. If the target is a Medium or smaller creature and the darkmantle had Advantage on the attack roll, it covers the target, which has the Blinded condition and is suffocating while the darkmantle is attached in this way. While attached to a target, the darkmantle can attack only the target but has Advantage on its attack rolls. Its Speed becomes 0, it can't benefit from any bonus to its Speed, and it moves with the target. A creature can take an action to try to detach the darkmantle from itself, doing so with a successful 13 Strength (Athletics) check. On its turn, the darkmantle can detach itself by using 5 feet of movement.
  - Darkness Aura (1/Day): Magical Darkness fills a 15-foot Emanation originating from the darkmantle. This effect lasts while the darkmantle maintains Concentration on it, up to 10 minutes. Darkvision can't penetrate this area, and no light can illuminate it.

### [dust-mephit] Dust Mephit — desafío 1/2, Pequeño Elemental
  - Death Burst: The mephit explodes when it dies. dex 10, each creature in a 5-foot Emanation originating from the mephit. {@actSaveFail} 5 (2d4) Bludgeoning damage. {@actSaveSuccess} Half damage.
  - Claw: m 4, reach 5 ft. {@h}4 (1d4 + 2) Slashing damage.
  - Blinding Breath (Recarga 6): dex 10, each creature in a 15-foot Cone. {@actSaveFail} The target has the Blinded condition until the end of the mephit's next turn.
  - Sleep (1/Day) (conjuros): The mephit casts the Sleep spell, requiring no spell components and using Charisma as the spellcasting ability (spell save 10). Sleep

### [gas-spore-fungus] Gas Spore Fungus — desafío 1/2, Grande Planta
  - Death Burst: The gas spore bursts when it dies. con 10, each creature in a 20-foot Emanation originating from the gas spore. {@actSaveFail} The target takes 10 (3d6) Poison damage and has the Poisoned condition for 1d12 hours. Unless the Poisoned condition is removed, the target dies at the end of that time and sprouts 2d4 Tiny Gas Spore Fungi (each with 1 Hit Point). After 2d6 days, they become Large and have 13 Hit Points.
  - Tendril: m 0, reach 5 ft. {@h}3 (1d6) Poison damage, and the target has the Poisoned condition until the end of its next turn.

### [giant-goat] Giant Goat — desafío 1/2, Grande Bestia
  - Ram: m 5, reach 5 ft. {@h}6 (1d6 + 3) Bludgeoning damage. If the target is a Large or smaller creature and the goat moved 20+ feet straight toward it immediately before the hit, the target takes an extra 5 (2d4) Bludgeoning damage and has the Prone condition.

### [giant-seahorse] Giant Seahorse — desafío 1/2, Grande Bestia
  - Water Breathing: The seahorse can breathe only underwater.
  - Ram: m 4, reach 5 ft. {@h}9 (2d6 + 2) Bludgeoning damage, or 11 (2d8 + 2) Bludgeoning damage if the seahorse moved 20+ feet straight toward the target immediately before the hit.
  - Bubble Dash: While underwater, the seahorse moves up to half its Swim Speed without provoking Opportunity Attacks.

### [giant-wasp] Giant Wasp — desafío 1/2, Mediano Bestia
  - Flyby: The wasp doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.
  - Sting: m 4, reach 5 ft. {@h}5 (1d6 + 2) Piercing damage plus 5 (2d4) Poison damage.

### [gnoll-warrior] Gnoll Warrior — desafío 1/2, Mediano Infernal
  - Rend: m 4, reach 5 ft. {@h}5 (1d6 + 2) Piercing damage.
  - Bone Bow: r 3, range 150/600 ft. {@h}6 (1d10 + 1) Piercing damage.
  - Rampage (1/Day): Immediately after dealing damage to a creature that is already Bloodied, the gnoll moves up to half its Speed, and it makes one Rend attack.

### [gray-ooze] Gray Ooze — desafío 1/2, Mediano Cieno
  - Amorphous: The ooze can move through a space as narrow as 1 inch without expending extra movement to do so.
  - Corrosive Form: Nonmagical ammunition is destroyed immediately after hitting the ooze and dealing any damage. Any nonmagical weapon takes a cumulative -1 penalty to attack rolls immediately after dealing damage to the ooze and coming into contact with it. The weapon is destroyed if the penalty reaches -5. The penalty can be removed by casting the Mending spell on the weapon. The ooze can eat through 2-inch-thick, nonmagical metal or wood in 1 round.
  - Pseudopod: m 3, reach 5 ft. {@h}10 (2d8 + 1) Acid damage. Nonmagical armor worn by the target takes a -1 penalty to the AC it offers. The armor is destroyed if the penalty reduces its AC to 10. The penalty can be removed by casting the Mending spell on the armor.

### [hobgoblin-warrior] Hobgoblin Warrior — desafío 1/2, Mediano Feérico
  - Pack Tactics: The hobgoblin has Advantage on an attack roll against a creature if at least one of the hobgoblin's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - Longsword: m 3, reach 5 ft. {@h}12 (2d10 + 1) Slashing damage.
  - Longbow: r 3, range 150/600 ft. {@h}5 (1d8 + 1) Piercing damage plus 7 (3d4) Poison damage.

### [ice-mephit] Ice Mephit — desafío 1/2, Pequeño Elemental
  - Death Burst: The mephit explodes when it dies. con 10, each creature in a 5-foot Emanation originating from the mephit. {@actSaveFail} 5 (2d4) Cold damage. {@actSaveSuccess} Half damage.
  - Claw: m 3, reach 5 ft. {@h}3 (1d4 + 1) Slashing damage plus 2 (1d4) Cold damage.
  - Frost Breath (Recarga 6): con 10, each creature in a 15-foot Cone. {@actSaveFail} 7 (3d4) Cold damage. {@actSaveSuccess} Half damage.
  - Fog Cloud (1/Day) (conjuros): The mephit casts Fog Cloud, requiring no spell components and using Charisma as the spellcasting ability. Fog Cloud

### [jackalwere] Jackalwere — desafío 1/2, Pequeño Infernal
Descripción oficial: [Jackalwere] Shape-Shifting Trickster of the Wilds [Habitat:] Desert, Grassland [Treasure:] Implements Indistinguishable from jackals in their natural form, jackalweres shape-shift to deceive others. These shape-shifters can take three forms: a jackal, a human, or a monstrous hybrid of the two. Jackalweres are easily mistaken for werewolves, but jackalweres aren't supernaturally afflicted—their jackal forms are their natural state. Jackalweres also possess magical gazes capable of putting foes to sleep, allowing jackalweres to play their tricks unimpeded or get the upper hand over threats. Jackalweres dwell in inhospitable wildernesses and pride themselves on their cleverness. They take offense at those who travel through their lands without leaving a gift of treasure or fresh game. Roll on or choose a result from the Jackalwere Tricks table to inspire how a jackalwere repays such slights. Jackalwere Tricks / 1 | Guiding them into wildernesses, then abandoning them. / 2 | Mapping a shortcut through a monster's lair. / 3 | Putting them to sleep, then stealing mounts or supplies. / 4 | Sharing the location of hidden treasure, which turns out to be sunlight on sand or water.
  - Pack Tactics: The jackalwere has Advantage on an attack roll against a creature if at least one of the jackalwere's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - Multiattack: The jackalwere makes two Rend or Slam attacks.
  - Rend (Jackal or Hybrid Form Only): m 4, reach 5 ft. {@h}5 (1d6 + 2) Piercing damage.
  - Slam (Human or Hybrid Form Only): m 4, reach 5 ft. {@h}4 (1d4 + 2) Bludgeoning damage.
  - Sleep Gaze (Recarga 5–6): wis 10, one creature the jackalwere can see within 30 feet (Constructs and Undead succeed automatically). {@actSaveFail} The target has the Unconscious condition for 10 minutes or until it takes damage or a creature within 5 feet of it takes an action to wake it. {@actSaveSuccess} The target is immune to this jackalwere's Sleep Gaze for 24 hours.
  - Shape-Shift: The jackalwere shape-shifts into a Medium human or a Medium jackal-humanoid hybrid, or it returns to its true form (that of a Small jackal). Other than its size, its game statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed.

### [magma-mephit] Magma Mephit — desafío 1/2, Pequeño Elemental
  - Death Burst: The mephit explodes when it dies. dex 11, each creature in a 5-foot Emanation originating from the mephit. {@actSaveFail} 7 (2d6) Fire damage. {@actSaveSuccess} Half damage.
  - Claw: m 3, reach 5 ft. {@h}3 (1d4 + 1) Slashing damage plus 3 (1d6) Fire damage.
  - Fire Breath (Recarga 6): dex 11, each creature in a 15-foot Cone. {@actSaveFail} 7 (2d6) Fire damage. {@actSaveSuccess} Half damage.

### [magmin] Magmin — desafío 1/2, Pequeño Elemental
Descripción oficial: [Magmin] Reckless Elemental Arsonist [Habitat:] Planar (Elemental Plane of Fire) [Treasure:] None Magmins divide all things into two categories: things that are on fire and things that should be on fire. With bodies of flame and magmatic rock, these halfling-size creatures delight in setting fires. They do so not out of malice but out of enthusiasm for primal fire. They don't consider that objects have value beyond kindling or that creatures can be harmed by flames. If such concepts are explained to them, they find the ideas difficult to grasp and don't remember them for long. Rather, they relish every opportunity to set flammable things alight, delighting in igniting paper, wooden structures, and explosives. Magmins are dangerous even in death, since they explode when they're destroyed, their flames igniting combustible materials nearby. Magmins might be conjured by magic-users to harry foes or might escape the Elemental Plane of Fire through portals or rifts that lead to other realms. They're attracted to places of intense heat, such as volcanoes and rivers of magma. If they can't find such favored conditions, magmins eagerly burn structures or start wildfires to entertain themselves.
  - Death Burst: The magmin explodes when it dies. dex 11, each creature in a 10-foot Emanation originating from the magmin. {@actSaveFail} 7 (2d6) Fire damage. {@actSaveSuccess} Half damage.
  - Touch: m 4, reach 5 ft. {@h}7 (2d4 + 2) Fire damage. If the target is a creature or a flammable object that isn't being worn or carried, it starts burning.
  - Ignited Illumination: The magmin sets itself ablaze or extinguishes its flames. While ablaze, the magmin sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet.

### [modron-tridrone] Modron Tridrone — desafío 1/2, Mediano Constructo
  - Disintegration: If the modron dies, it disintegrates into dust, leaving behind anything it was wearing or carrying.
  - Multiattack: The modron makes three Clockwork Spear attacks.
  - Clockwork Spear: m,r 3, reach 5 ft. or range 120 ft. {@h}4 (1d6 + 1) Force damage. {@hom}The spear magically returns to the modron's hand immediately after a ranged attack.

### [myconid-adult] Myconid Adult — desafío 1/2, Mediano Planta
  - Sun Sickness: While in sunlight, the myconid has Disadvantage on D20 Tests. The myconid dies if it spends more than 1 hour in sunlight.
  - Slam: m 2, reach 5 ft. {@h}4 (1d8) Bludgeoning damage plus 3 (1d6) Poison damage.
  - Pacifying Spores (1/Day): con 11, one creature the myconid can see within 10 feet. {@actSaveFail} The target has the Stunned condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.
  - Rapport Spores: The myconid expels spores in a 30-foot Emanation originating from itself. Creatures in that area with an Intelligence score of 2 or higher that aren't Constructs, Elementals, or Undead gain telepathy with a range of 30 feet for 1 hour.

### [performer] Performer — desafío 1/2, Pequeño o Mediano Humanoide
  - Shortsword: m 5, reach 5 ft. {@h}6 (1d6 + 3) Piercing damage.
  - Uncanny Dodge: {@actTrigger} The performer is hit by an attack roll. {@actResponse} The performer halves the damage (round down) it takes from that attack.
