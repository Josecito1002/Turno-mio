# Encargo: Lote 22d (bestiario, desafío 2 a 3) de la app "Mi turno"

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

### [bandit-captain] Bandit Captain — desafío 2, Pequeño o Mediano Humanoide
  - Multiattack: The bandit makes two attacks, using Scimitar and Pistol in any combination.
  - Scimitar: m 5, reach 5 ft. {@h}6 (1d6 + 3) Slashing damage.
  - Pistol: r 5, range 30/90 ft. {@h}8 (1d10 + 3) Piercing damage.
  - Parry: {@actTrigger} The bandit is hit by a melee attack roll while holding a weapon. {@actResponse} The bandit adds 2 to its AC against that attack, possibly causing it to miss.

### [berserker] Berserker — desafío 2, Pequeño o Mediano Humanoide
  - Bloodied Frenzy: While Bloodied, the berserker has Advantage on attack rolls and saving throws.
  - Greataxe: m 5, reach 5 ft. {@h}9 (1d12 + 3) Slashing damage.

### [black-dragon-wyrmling] Black Dragon Wyrmling — desafío 2, Mediano Dragón
  - Amphibious: The dragon can breathe air and water.
  - Multiattack: The dragon makes two Rend attacks.
  - Rend: m 4, reach 5 ft. {@h}5 (1d6 + 2) Slashing damage plus 2 (1d4) Acid damage.
  - Acid Breath (Recarga 5–6): dex 11, each creature in a 15-foot-long, 5-foot-wide Line. {@actSaveFail} 22 (5d8) Acid damage. {@actSaveSuccess} Half damage.

### [bronze-dragon-wyrmling] Bronze Dragon Wyrmling — desafío 2, Mediano Dragón
  - Amphibious: The dragon can breathe air and water.
  - Multiattack: The dragon makes two Rend attacks.
  - Rend: m 5, reach 5 ft. {@h}8 (1d10 + 3) Slashing damage.
  - Lightning Breath (Recarga 5–6): dex 12, each creature in a 40-foot-long, 5-foot-wide Line. {@actSaveFail} 16 (3d10) Lightning damage. {@actSaveSuccess} Half damage.
  - Repulsion Breath: str 12, each creature in a 30-foot Cone. {@actSaveFail} The target is pushed up to 30 feet straight away from the dragon and has the Prone condition.

### [bulette-pup] Bulette Pup — desafío 2, Mediano Monstruosidad
  - Bite: m 5, reach 5 ft. {@h}14 (2d10 + 3) Piercing damage.
  - Leap: The bulette jumps up to 30 feet by spending 10 feet of movement.

### [carrion-crawler] Carrion Crawler — desafío 2, Grande Monstruosidad
Descripción oficial: [Carrion Crawler] Catacomb-Scouring Necrophage [Habitat:] Underdark, Urban [Treasure:] None Ravenous corpse eaters, carrion crawlers gravitate toward places of slaughter and decay. In such charnel environs, they feast on the dead with no qualms about their meals' origins or freshness. Carrion crawlers have segmented bodies like gigantic cutworms. From beneath their multipart maws protrude eight thin, lashing tentacles. Creatures struck by these tentacles risk being paralyzed and consumed. Carrion crawlers scour sewers, battlefields, necropolises, and fetid wildernesses for corpses, clinging to ceilings to ambush smaller prey and to avoid competing hunters. They're drawn to light and the scent of blood, recognizing them as signs of food. These scavengers avoid ingesting inorganic material. Crypts with funeral armors sucked clean of their corpses and eerily pristine catacombs are signs of infestation by carrion crawlers.
  - Spider Climb: The carrion crawler can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - Multiattack: The carrion crawler uses Paralyzing Tentacles and makes one Bite attack.
  - Bite: m 4, reach 5 ft. {@h}7 (2d4 + 2) Piercing damage plus 3 (1d6) Poison damage.
  - Paralyzing Tentacles: con 12, one creature the carrion crawler can see within 10 feet. {@actSaveFail} The target has the Poisoned condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. While Poisoned, the target has the Paralyzed condition.

### [centaur-trooper] Centaur Trooper — desafío 2, Grande Feérico
  - Multiattack: The centaur makes two attacks, using Pike or Longbow in any combination.
  - Pike: m 6, reach 10 ft. {@h}9 (1d10 + 4) Piercing damage.
  - Longbow: r 4, range 150/600 ft. {@h}6 (1d8 + 2) Piercing damage.
  - Trampling Charge (Recarga 5–6): The centaur moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space the centaur enters is targeted once by the following effect. str 14. {@actSaveFail} 7 (1d6 + 4) Bludgeoning damage, and the target has the Prone condition.

### [cultist-fanatic] Cultist Fanatic — desafío 2, Pequeño o Mediano Humanoide
  - Pact Blade: m 4, reach 5 ft. {@h}6 (1d8 + 2) Slashing damage plus 7 (2d6) Necrotic damage.
  - Spellcasting (conjuros): The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save 12, 4 to hit with spell attacks): Light Thaumaturgy Hold Person Command
  - Spiritual Weapon (2/Day) (conjuros): The cultist casts the Spiritual Weapon spell, using the same spellcasting ability as Spellcasting. Spiritual Weapon

### [druid] Druid — desafío 2, Pequeño o Mediano Humanoide
Descripción oficial: [Druid] Steward and Sage of Nature [Habitat:] Any [Treasure:] Individual, Relics Druids use primal magic, traditional teachings, and bonds with animals and eldritch beings to guard the natural world and heal its ills. These magic-users might be recluses devoted to a particular land, or they might be part of a mystic organization. Roll on or choose a result from the Druidic Traditions table to inspire a druid's magical practices. Druid Traditions / 1 | An avenger who strikes against destructive civilizations and those who abuse nature. / 2 | A guide who aids travelers in navigating the realms of Beasts, Fey, or Plants. / 3 | A hermit who works alone to protect the lands, seas, or skies they call home. / 4 | A mender who travels the world healing natural, magical, or manufactured disasters. / 5 | Part of a loose organization that adheres to timeless rituals and guards natural secrets. / 6 | A warden who minds the underpinnings of reality and protects against extraplanar threats.
  - Multiattack: The druid makes two attacks, using Vine Staff or Verdant Wisp in any combination.
  - Vine Staff: m 5, reach 5 ft. {@h}7 (1d8 + 3) Bludgeoning damage plus 2 (1d4) Poison damage.
  - Verdant Wisp: r 5, range 90 ft. {@h}10 (3d6) Radiant damage.
  - Spellcasting (conjuros): The druid casts one of the following spells, using Wisdom as the spellcasting ability (spell save 13): Druidcraft Speak with Animals Entangle Thunderwave Animal Messenger Longstrider Moonbeam

### [ettercap] Ettercap — desafío 2, Mediano Monstruosidad
Descripción oficial: [Ettercap] Venomous Arachnid Abductor [Habitat:] Forest [Treasure:] Implements Spiderlike hunters, ettercaps lurk in forested depths and seek prey to drag into their web-choked lairs. These vicious predators have arachnid features and hunched, bipedal frames, and they're notorious for their venomous bites and ability to shoot out webs to entrap their victims. Ettercaps often hunt in small groups alongside giant spiders and mundane spider swarms. Ettercaps frequently overhunt their environment. Left unchecked, ettercaps might fill whole woodlands with their webs and the cocooned remains of past meals, which puts ettercaps in conflict with Fey. Spiteful ettercaps go out of their way to torment and feed on Fey; they prefer to menace those smaller than themselves, like pixies and sprites. They rarely devour other sapient creatures swiftly, preferring to cocoon their captives and terrorize them for days. Ettercaps avoid fire, which can quickly burn through their webs and the dead trees where they make their homes.
  - Spider Climb: The ettercap can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - Web Walker: The ettercap ignores movement restrictions caused by webs, and the ettercap knows the location of any other creature in contact with the same web.
  - Multiattack: The ettercap makes one Bite attack and one Claw attack.
  - Bite: m 4, reach 5 ft. {@h}5 (1d6 + 2) Piercing damage plus 2 (1d4) Poison damage, and the target has the Poisoned condition until the start of the ettercap's next turn.
  - Claw: m 4, reach 5 ft. {@h}7 (2d4 + 2) Slashing damage.
  - Web Strand (Recarga 5–6): dex 12, one Large or smaller creature the ettercap can see within 30 feet. {@actSaveFail} The target has the Restrained condition until the web is destroyed (AC 10; HP 5; Vulnerability to Fire damage; Immunity to Bludgeoning, Poison, and Psychic damage).
  - Reel: The ettercap pulls one creature within 30 feet of itself that is Restrained by its Web Strand up to 25 feet straight toward itself.

### [faerie-dragon-adult] Faerie Dragon Adult — desafío 2, Diminuto Dragón
  - Magic Resistance: The dragon has Advantage on saving throws against spells and other magical effects.
  - Bite: m 7, reach 5 ft. {@h}7 (1d4 + 5) Piercing damage plus 3 (1d6) Psychic damage.
  - Euphoria Breath (Recarga 5–6): wis 13, each creature in a 15-foot Cone. {@actSaveFail} The target has the Incapacitated condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. While Incapacitated, the target uses all its movement on each of its turns to move in a random direction.
  - Spellcasting (conjuros): The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 13): Dancing Lights Mage Hand Minor Illusion Hallucinatory Terrain Polymorph
  - Superior Invisibility (conjuros): The dragon casts Greater Invisibility on itself, requiring no spell components and using the same spellcasting ability as Spellcasting. Greater Invisibility

### [gargoyle] Gargoyle — desafío 2, Mediano Elemental
Descripción oficial: [Gargoyle] Sculpted Sentinel Hidden in Plain Sight [Habitat:] Underdark, Urban [Treasure:] Any Gargoyles are sculptures inhabited by elemental spirits. Wings and magic allow their heavy stone bodies to fly, and they often perch where they can blend in amid ornate architecture, rock formations, or mundane statues. Gargoyles usually serve the magic-users who conjured them into their bodies, but if left to their own devices, they might play cruel pranks and steal treasures to hoard in lofty lairs. Gargoyles have a variety of appearances. Roll on or choose a result from the Gargoyle Sculptures table to inspire how a gargoyle looks. Gargoyle Sculptures / 1 | Cherubic with perpetually smiling features. / 2 | Crudely hewed or naturally formed. / 3 | Damaged or marred by mismatched pieces. / 4 | Dragon-like with polished stone scales. / 5 | Gothically fiendish with horns and a tail. / 6 | Useful, like an ornate podium or a pillar. [Gargoyle Ambushes] Gargoyles seek to ambush foes or creatures that trespass on their territories. With no biological needs and supernatural patience, these monsters might wait unmoving for months, revealing themselves only when conditions are perfect to attack. They tend to lurk where statuary seems commonplace or where terrain obscures the shape and color of their bodies. Roll on or choose a result from the Gargoyle Camouflage table to inspire where a gargoyle sets up an ambush. Gargoyle Camouflage / 1 | Burls and bark on a giant tree. / 2 | Monuments in a graveyard or memorial. / 3 | Outcroppings on a cliff or rock formation / 4 | The petrified victims of a basilisk or medusa. / 5 | Reliefs on a sculpted gate or wall. / 6 | Rubble in a ruin or junkyard. / 7 | Stalactites or icicles on a cavern ceiling. / 8 | Statuary on a castle, mansion, or temple. Where evil passes in the Elemental Plane of Earth, it stains the rock and spoils the soil. Malice vanishes amid other elements, but in the dismal dark, the wicked shape it into nightmares.
  - Flyby: The gargoyle doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.
  - Multiattack: The gargoyle makes two Claw attacks.
  - Claw: m 4, reach 5 ft. {@h}7 (2d4 + 2) Slashing damage.

### [gelatinous-cube] Gelatinous Cube — desafío 2, Grande Cieno
Descripción oficial: [Gelatinous Cube] Dungeon-Scouring Block of Ooze [Habitat:] Underdark [Treasure:] Any Quivering masses of acidic goo, gelatinous cubes wobble through narrow caverns and dungeons, engulfing anything in their paths. These Oozes are naturally transparent, making them difficult to see while they're stationary. Creatures and objects that become stuck within these slimes are gradually dissolved. Undigested detritus sometimes floats within a gelatinous cube, hinting at its past meals. Roll on or choose a result from the Gelatinous Cube Debris table to inspire a gelatinous cube's contents. Gelatinous Cube Debris / 1 | Chest or recently trapped mimic. / 2 | Collection of bubbles or rocks resembling eyes. / 3 | Key to a nearby door or coffer. / 4 | Remarkable weapon in need of repair. / 5 | Skeleton belonging to a famous adventurer. / 6 | Tablet bearing a mysterious message.
  - Ooze Cube: The cube fills its entire space and is transparent. Other creatures can enter that space, but a creature that does so is subjected to the cube's Engulf and has Disadvantage on the saving throw. Creatures inside the cube have Total Cover, and the cube can hold one Large creature or up to four Medium or Small creatures inside itself at a time. As an action, a creature within 5 feet of the cube can pull a creature or an object out of the cube by succeeding on a 12 Strength (Athletics) check, and the puller takes 10 (3d6) Acid damage.
  - Transparent: Even when the cube is in plain sight, a creature must succeed on a 15 Wisdom (Perception) check to notice the cube if the creature hasn't witnessed the cube move or otherwise act.
  - Pseudopod: m 4, reach 5 ft. {@h}12 (3d6 + 2) Acid damage.
  - Engulf: The cube moves up to its Speed without provoking Opportunity Attacks. The cube can move through the spaces of Large or smaller creatures if it has room inside itself to contain them (see the Ooze Cube trait). dex 12, each creature whose space the cube enters for the first time during this move. {@actSaveFail} 10 (3d6) Acid damage, and the target is engulfed. An engulfed target is suffocating, can't cast spells with a Verbal component, has the Restrained condition, and takes 10 (3d6) Acid damage at the start of each of the cube's turns. When the cube moves, the engulfed target moves with it. An engulfed target can try to escape by taking an action to make a 12 Strength (Athletics) check. On a successful check, the target escapes and enters the nearest unoccupied space. {@actSaveSuccess} Half damage, and the target moves to an unoccupied space within 5 feet of the cube. If there is no unoccupied space, the target fails the save instead.

### [ghast] Ghast — desafío 2, Mediano Muerto viviente
  - Stench: con 10, any creature that starts its turn in a 5-foot Emanation originating from the ghast. {@actSaveFail} The target has the Poisoned condition until the start of its next turn. {@actSaveSuccess} The target is immune to this ghast's Stench for 24 hours.
  - Bite: m 5, reach 5 ft. {@h}7 (1d8 + 3) Piercing damage plus 9 (2d8) Necrotic damage.
  - Claw: m 5, reach 5 ft. {@h}10 (2d6 + 3) Slashing damage. If the target is a non-Undead creature, it is subjected to the following effect. con 10. {@actSaveFail} The target has the Paralyzed condition until the end of its next turn.

### [giant-boar] Giant Boar — desafío 2, Grande Bestia
  - Bloodied Fury: The boar has Advantage on melee attack rolls while it is Bloodied.
  - Gore: m 5, reach 5 ft. {@h}10 (2d6 + 3) Piercing damage. If the target is a Large or smaller creature and the boar moved 20+ feet straight toward it immediately before the hit, the target takes an extra 7 (2d6) Piercing damage and has the Prone condition.

### [giant-constrictor-snake] Giant Constrictor Snake — desafío 2, Enorme Bestia
  - Multiattack: The snake makes one Bite attack and uses Constrict.
  - Bite: m 6, reach 10 ft. {@h}11 (2d6 + 4) Piercing damage.
  - Constrict: str 14, one Large or smaller creature the snake can see within 10 feet. {@actSaveFail} 13 (2d8 + 4) Bludgeoning damage, and the target has the Grappled condition (escape 14).

### [giant-elk] Giant Elk — desafío 2, Enorme Celestial
  - Ram: m 6, reach 10 ft. {@h}11 (2d6 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage. If the target is a Huge or smaller creature and the elk moved 20+ feet straight toward it immediately before the hit, the target takes an extra 5 (2d4) Bludgeoning damage and has the Prone condition.

### [gibbering-mouther] Gibbering Mouther — desafío 2, Mediano Aberración
Descripción oficial: [Gibbering Mouther] Ravenous Chorus of Unreality [Habitat:] Underdark [Treasure:] None Gibbering mouthers endlessly feed on and regrow their own amoeboid bodies—amorphous heaps roiling with eyes, teeth, and strange organs. These mind-bending terrors sing and scream, laugh and cry with a cacophony of voices ranging from disturbingly unnatural to shockingly familiar. They exist only to feed and to unleash their disdain for reality, their many maws dripping with otherworldly spittle. Gibbering mouthers come into being in various unpleasant ways. Roll on or choose a result from the Gibbering Mouther Nascencies table to inspire what brought one of these horrors into being. Gibbering Mouther Nascencies / 1 | Another creature warped by dangerous magic. / 2 | The autonomous appendage of a chaotic deity, Far Realm entity, or star-spawn horror. / 3 | The experiment of an aberrant manipulator. / 4 | Part of the life cycle of some other Aberration. / 5 | A shape-shifter that lost control of its powers. / 6 | Someone cursed by a cult or vengeful deity. Alas, the Elder Elves made a fatal mistake. When the Dragon's Tear comet next returned, the Vast Gate—still keyed to the Far Realm of alien entities—linked to the comet and opened again. And what emerged, ululating profanities, sang unnameable hungers into an unguarded world.
  - Aberrant Ground: The ground in a 10-foot Emanation originating from the mouther is Difficult Terrain.
  - Gibbering: The mouther babbles incoherently while it doesn't have the Incapacitated condition. wis 10, any creature that starts its turn within 20 feet of the mouther while it is babbling. {@actSaveFail} The target rolls 1d8 to determine what it does during the current turn: [1-4] The target does nothing. [5-6] The target takes no action or Bonus Action and uses all its movement to move in a random direction. [7-8] The target makes a melee attack against a randomly determined creature within its reach or does nothing if it can't make such an attack.
  - Bite: m 2, reach 5 ft. {@h}7 (2d6) Piercing damage. If the target is a Medium or smaller creature, it has the Prone condition. The target dies if it is reduced to 0 Hit Points by this attack. Its body is then absorbed into the mouther, leaving only equipment behind.
  - Blinding Spittle (Recarga 5–6): dex 10, each creature in a 10-foot-radius Sphere centered on a point within 30 feet. {@actSaveFail} 7 (2d6) Radiant damage, and the target has the Blinded condition until the end of the mouther's next turn.

### [githzerai-monk] Githzerai Monk — desafío 2, Mediano Aberración
  - Multiattack: The githzerai makes two Psi Strike attacks.
  - Psi Strike: m 4, reach 5 ft. {@h}6 (1d8 + 2) Bludgeoning damage plus 9 (2d8) Psychic damage.
  - Spellcasting (conjuros): The githzerai casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability: Mage Hand (the hand is Invisible) See Invisibility
  - Psi-Powered Leap (2/Day) (conjuros): The githzerai casts Jump, requiring no spell components and using the same spellcasting ability as Spellcasting. Jump
  - Psionic Defense (2/Day) (conjuros): The githzerai casts Feather Fall or Shield in response to the spell's trigger, requiring no spell components and using the same spellcasting ability as Spellcasting. Feather Fall Shield

### [gnoll-pack-lord] Gnoll Pack Lord — desafío 2, Mediano Infernal
  - Multiattack: The gnoll makes two attacks, using Bone Whip or Bone Javelin in any combination, and it uses Incite Rampage if available.
  - Bone Whip: m 5, reach 10 ft. {@h}8 (2d4 + 3) Slashing damage.
  - Bone Javelin: r 5, range 30/120 ft. {@h}7 (1d8 + 3) Piercing damage.
  - Incite Rampage (Recarga 5–6): The gnoll targets another creature it can see within 60 feet of itself that has the Rampage Bonus Action. The target can take a Reaction to make one melee attack.
  - Rampage (2/Day): Immediately after dealing damage to a creature that is already Bloodied, the gnoll moves up to half its Speed, and it makes one Bone Whip attack.

### [green-dragon-wyrmling] Green Dragon Wyrmling — desafío 2, Mediano Dragón
  - Amphibious: The dragon can breathe air and water.
  - Multiattack: The dragon makes two Rend attacks.
  - Rend: m 4, reach 5 ft. {@h}7 (1d10 + 2) Slashing damage plus 3 (1d6) Poison damage.
  - Poison Breath (Recarga 5–6): con 11, each creature in a 15-foot Cone. {@actSaveFail} 21 (6d6) Poison damage. {@actSaveSuccess} Half damage.

### [grick] Grick — desafío 2, Mediano Aberración
  - Multiattack: The grick makes one Beak attack and one Tentacles attack.
  - Beak: m 4, reach 5 ft. {@h}9 (2d6 + 2) Piercing damage.
  - Tentacles: m 4, reach 5 ft. {@h}7 (1d10 + 2) Slashing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape 12) from all four tentacles.

### [griffon] Griffon — desafío 2, Grande Monstruosidad
Descripción oficial: [Griffon] Majestic Hunter of Land and Sky [Habitat:] Arctic, Coastal, Grassland, Hill, Mountain [Treasure:] None Griffons combine the features of raptors and big cats—most commonly eagles and lions—and possess the precision and ferocity of such predators. Rarer breeds of griffons have the features of condors and panthers, while others resemble hawks and tigers. Regardless of their appearances, griffons are often associated with royalty and are widely called the Masters of Animals. Countless tales surround griffons. Roll on or choose a result from the Griffon Tales table to inspire stories about them. Griffon Tales / 1 | Attack anything in the skies near their lairs. / 2 | Curse their killers. Those who slay a griffon face the enmity of all animals. / 3 | Lay eggs with remarkable healing properties. / 4 | Prefer the taste of horses over all other prey. / 5 | Serve the first creature they see after hatching. / 6 | Won't attack those with royal blood. People think we flew high over the city to avoid weather vanes and laundry lines and whatnot. Truth is, if the griffons smelled how much horse meat trotted just below, folks would have worse than joy-flying mages and stirges to worry about!
  - Multiattack: The griffon makes two Rend attacks.
  - Rend: m 6, reach 5 ft. {@h}8 (1d8 + 4) Piercing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape 14) from both of the griffon's front claws.

### [hunter-shark] Hunter Shark — desafío 2, Grande Bestia
  - Water Breathing: The shark can breathe only underwater.
  - Bite: m 6 (with Advantage if the target doesn't have all its Hit Points), reach 5 ft. {@h}14 (3d6 + 4) Piercing damage.

### [intellect-devourer] Intellect Devourer — desafío 2, Diminuto Aberración
Descripción oficial: [Intellect Devourer] Brain-Eating Body Thief [Habitat:] Underdark [Treasure:] None Intellect devourers serve their mind flayer creators by consuming other creatures' brains and puppetizing the mindless bodies. These quadrupedal brains seek to ambush sapient beings, then drain their thoughts until they're mindless. Then, if their victims are Humanoids, they enter the creatures' skulls. With access to the victims' knowledge and control of their bodies, intellect devourers use their perfect disguises to pass as the people they've replaced and further mind flayer plots. I know Durgan, and that wasn't Durgan. It was like something was wearing Durgan... like some sort of suit... a Durgan suit.
  - Detect Intelligence: The intellect devourer magically senses the location of any creature within 300 feet of itself that has an Intelligence score of 3 or higher, regardless of interposing barriers.
  - Multiattack: The intellect devourer makes one Claw attack and uses Devour Intellect.
  - Claw: m 4, reach 5 ft. {@h}7 (2d4 + 2) Slashing damage.
  - Devour Intellect: int 12, one creature the intellect devourer can see within 5 feet. {@actSaveFail} 11 (2d10) Psychic damage, and the target has the Stunned condition until the end of the intellect devourer's next turn.
  - Steal Body: int 12, one Small or Medium creature within 5 feet that has the Incapacitated condition, is a Humanoid or Beast, and has 10 Hit Points or fewer. {@actSaveFail} The intellect devourer possesses the target, consumes its brain, and teleports inside its skull. While there, the intellect devourer has Total Cover against attacks and other effects originating outside its host. The intellect devourer retains its Intelligence, Wisdom, and Charisma scores; its understanding of Deep Speech; its telepathy; and its Detect Intelligence trait. It otherwise adopts the target's game statistics. It knows everything the target knew, including spells and languages. If the host body dies, the intellect devourer must leave it. The intellect devourer is also forced out if the target regains its devoured brain by means of a Wish spell. By spending 5 feet of its movement, the intellect devourer can voluntarily leave the body, teleporting to the nearest unoccupied space within 5 feet of it. The body then dies unless its brain is restored before the end of the intellect devourer's next turn.

### [lizardfolk-geomancer] Lizardfolk Geomancer — desafío 2, Mediano Elemental
  - Multiattack: The lizardfolk makes two Earth Burst attacks.
  - Earth Burst: m,r 4, reach 5 ft. or range 60 ft. {@h}9 (2d6 + 2) Bludgeoning damage.
  - Hail of Stone (Recarga 5–6): con 12, each creature in a 20-foot-radius, 40-foot-high Cylinder centered on a point the lizardfolk can see within 60 feet. {@actSaveFail} 15 (6d4) Bludgeoning damage, and the target has the Prone condition. {@actSaveSuccess} Half damage only.
  - Spellcasting (conjuros): The lizardfolk casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save 12): Elementalism Meld into Stone Speak with Plants Spike Growth

### [mage-apprentice] Mage Apprentice — desafío 2, Pequeño o Mediano Humanoide
  - Arcane Burst: m,r 5, reach 5 ft. or range 120 ft. {@h}14 (2d10 + 3) Force damage.
  - Spellcasting (conjuros): The mage casts one of the following spells, using Intelligence as the spellcasting ability (spell save 13, 5 to hit with spell attacks): Mage Hand Prestidigitation Disguise Self Ice Knife Mage Armor (included in AC) Thunderwave

### [merrow] Merrow — desafío 2, Grande Monstruosidad
Descripción oficial: [Merrow] Ogreish Undersea Abductor [Habitat:] Coastal, Underwater [Treasure:] Any Vicious aquatic hunters, merrow combine the features of ogres with those of primeval, predatory fish. They lurk in coastal waters, hoping to snare unsuspecting prey by bursting from the water and grabbing their quarry or by skewering victims with deadly harpoons. These hunters then drag land dwellers back to dismal undersea lairs. Merrow often keep prisoners in their larders as future meals. Merrow raid coastal settlements and merfolk communities to steal weapons and treasure. This leads to conflicts between merfolk and merrow, but it also provokes misunderstandings with surface dwellers who blame merfolk for merrow attacks. Sages trace merrows' origins to aquatic ogres, depraved merfolk, and worse. Such broad theories reveal little about these monsters but overmuch of the dread lurking beyond our certain shores.
  - Amphibious: The merrow can breathe air and water.
  - Multiattack: The merrow makes two attacks, using Bite, Claw, or Harpoon in any combination.
  - Bite: m 6, reach 5 ft. {@h}6 (1d4 + 4) Piercing damage, and the target has the Poisoned condition until the end of the merrow's next turn.
  - Claw: m 6, reach 5 ft. {@h}9 (2d4 + 4) Slashing damage.
  - Harpoon: m,r 6, reach 5 ft. or range 20/60 ft. {@h}11 (2d6 + 4) Piercing damage. If the target is a Large or smaller creature, the merrow pulls the target up to 15 feet straight toward itself.

### [mimic] Mimic — desafío 2, Mediano Monstruosidad
Descripción oficial: [Mimic] Shape-Shifter Disguised as an Unassuming Object [Habitat:] Underdark, Urban [Treasure:] Any In their natural forms, mimics are little more than roaming stomachs, their blobby bodies covered with alien eyes and teeth. They can alter their color, texture, and dimensions to duplicate inanimate objects of their approximate size. Mimics use their disguises as both camouflage and bait. Once victims draw close, mimics strike, lashing out with their sticky pseudopods and toothy mouths. After consuming victims, mimics usually relocate, change form, and await their next meal. Use the following list to inspire mimics' shapes: Altar Bell Boulder Cauldron Chair Chandelier Chest Cot Door Floor mat Giant gemstone Gravestone Heap of leaves Keg Ladder Lectern Mannequin Mirror Obelisk Oversize cake Panel of levers Pile of bones Potted plant Row of books Sarcophagus Sculpture Ship's wheel Sign Stalagmite Stump Table Tapestry Taxidermy Throne Topiary Weapon rack
  - Adhesive (Object Form Only): The mimic adheres to anything that touches it. A Huge or smaller creature adhered to the mimic has the Grappled condition (escape 13). Ability checks made to escape this grapple have Disadvantage.
  - Bite: m 5 (with Advantage if the target is Grappled by the mimic), reach 5 ft. {@h}7 (1d8 + 3) Piercing damage—or 12 (2d8 + 3) Piercing damage if the target is Grappled by the mimic—plus 4 (1d8) Acid damage.
  - Pseudopod: m 5, reach 5 ft. {@h}7 (1d8 + 3) Bludgeoning damage plus 4 (1d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape 13). Ability checks made to escape this grapple have Disadvantage.
  - Shape-Shift: The mimic shape-shifts to resemble a Medium or Small object while retaining its game statistics, or it returns to its true blob form. Any equipment it is wearing or carrying isn't transformed.

### [minotaur-skeleton] Minotaur Skeleton — desafío 2, Grande Muerto viviente
  - Gore: m 6, reach 5 ft. {@h}11 (2d6 + 4) Piercing damage. If the target is a Large or smaller creature and the skeleton moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 (2d8) Piercing damage and has the Prone condition.
  - Slam: m 6, reach 5 ft. {@h}15 (2d10 + 4) Bludgeoning damage.

### [modron-pentadrone] Modron Pentadrone — desafío 2, Grande Constructo
  - Disintegration: If the modron dies, it disintegrates into dust, leaving behind anything it was wearing or carrying.
  - Multiattack: The modron makes five Slam attacks or five Electrical Discharge attacks.
  - Slam: m 4, reach 5 ft. {@h}5 (1d6 + 2) Force damage.
  - Electrical Discharge: r 4, range 120 ft. {@h}5 (1d6 + 2) Lightning damage.
  - Paralysis Gas (Recarga 5–6): Constitution Saving Throws: 11, each creature in a 30-foot Cone. {@actSaveFail} The target has the Paralyzed condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

### [myconid-sovereign] Myconid Sovereign — desafío 2, Grande Planta
  - Sun Sickness: While in sunlight, the myconid has Disadvantage on D20 Tests. The myconid dies if it spends more than 1 hour in sunlight.
  - Multiattack: The myconid makes one Slam attack and uses Pacifying Spores.
  - Slam: m 3, reach 5 ft. {@h}6 (2d4 + 1) Bludgeoning damage plus 5 (2d4) Poison damage.
  - Animating Spores (3/Day): The myconid releases spores at a Medium or Small corpse within 5 feet of it that wasn't a Construct or an Undead. In 24 hours, the corpse rises as a Myconid Spore Servant. The corpse stays animate for 1d4 + 1 weeks or until destroyed, and it can't be animated again in this way.
  - Pacifying Spores: con 12, one creature the myconid can see within 10 feet. {@actSaveFail} The target has the Stunned condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.
  - Rapport Spores: The myconid expels spores in a 30-foot Emanation originating from itself. Creatures in that area with an Intelligence score of 2 or higher that aren't Constructs, Elementals, or Undead gain telepathy with a range of 30 feet for 1 hour.

### [nothic] Nothic — desafío 2, Mediano Aberración
Descripción oficial: [Nothic] Witness to the Weird [Habitat:] Underdark [Treasure:] Arcana Consumed by their thirst for forbidden knowledge, nothics are cursed lore seekers transformed by secrets never meant to be known. The bodies of these former scholars are warped into otherworldly shapes, each with a head dominated by a gigantic, unblinking eye. Nothics remember nothing of their past lives and care only for their endless pursuit of hidden mysteries and uncanny truths. They seek revelations amid the rubble of forgotten ruins, and they use their supernatural sight to pierce magical deceptions, rot the flesh of enemies, and steal the secrets of those who interrupt their investigations. Some nothics seek to end the curse that warped them into their bizarre forms, but many are unaware of—or uninterested in—their transformation. Deeper. Deeper and Deeper. Deeper and creeper. Creeping they come. Up from the place that isn't a place. They come to feed. Feed on what I know. So I hide. I hide away. Away in the secret dark. Secret and dark, like all that I know I shouldn't know!
  - Multiattack: The nothic makes two Claw attacks.
  - Claw: m 5, reach 5 ft. {@h}8 (1d10 + 3) Slashing damage.
  - Rotting Gaze: con 13, one creature the nothic can see within 120 feet. {@actSaveFail} 17 (5d6) Necrotic damage. {@actSaveSuccess} Half damage.
  - Weird Insight (Recarga 6): wis 14, one creature the nothic can see within 120 feet. {@actSaveFail} The nothic magically learns one fact or secret about the target.

### [ochre-jelly] Ochre Jelly — desafío 2, Grande Cieno
Descripción oficial: [Ochre Jelly] Multiplying Amoeboid Hunter [Habitat:] Underdark [Treasure:] None Ochre jellies are giant, yellow-brown amoebas that digest organic creatures. They tirelessly hunt any prey smaller than themselves, oozing over, under, and around obstacles in their path. Once they overwhelm their quarry, these acidic slimes dissolve the flesh, hair, and scales of their prey, leaving behind clothing, equipment, treated leather, and bone. If damaged by lightning or a slashing weapon, an ochre jelly splits in two. These smaller jellies work together to consume foes, but afterward they move on to hunt independently. Both eventually grow into full-size jellies. What ochre jellies can't dissolve they leave behind. Roll on or choose a result from the Ochre Jelly Leftovers table to inspire such remains. Ochre Jelly Leftovers / 1 | A bone etched with a word or an eerie symbol. / 2 | Broken dragonborn or tiefling horns. / 3 | An ornate prosthetic limb. / 4 | The skeleton of an explorer's pet (perhaps a small dog, monkey, or parrot). / 5 | A skull with gold teeth worth 1d4 GP. / 6 | A spotless suit of metal armor.
  - Amorphous: The jelly can move through a space as narrow as 1 inch without expending extra movement to do so.
  - Spider Climb: The jelly can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - Pseudopod: m 4, reach 5 ft. {@h}12 (3d6 + 2) Acid damage.
  - Split: {@actTrigger} While the jelly is Large or Medium and has 10+ Hit Points, it becomes Bloodied or is subjected to Lightning or Slashing damage. {@actResponse} The jelly splits into two new Ochre Jellies. Each new jelly is one size smaller than the original jelly and acts on its Initiative. The original jelly's Hit Points are divided evenly between the new jellies (round down).

### [ogre] Ogre — desafío 2, Grande Gigante
  - Greatclub: m 6, reach 5 ft. {@h}13 (2d8 + 4) Bludgeoning damage.
  - Javelin: m,r 6, reach 5 ft. or range 30/120 ft. {@h}11 (2d6 + 4) Piercing damage.

### [ogre-zombie] Ogre Zombie — desafío 2, Grande Muerto viviente
  - Undead Fortitude: If damage reduces the zombie to 0 Hit Points, it makes a Constitution saving throw (5 plus the damage taken) unless the damage is Radiant or from a Critical Hit. On a successful save, the zombie drops to 1 Hit Point instead.
  - Slam: m 6, reach 5 ft. {@h}13 (2d8 + 4) Bludgeoning damage.

### [pegasus] Pegasus — desafío 2, Grande Celestial
Descripción oficial: [Pegasus] Elusive Winged Steed [Habitat:] Forest, Grassland, Hill, Planar (Upper Planes) [Treasure:] None Winged, sapient horses of noble bearing, pegasi are as majestic as they are elusive. Most avoid the affairs of other creatures, preferring to dwell amid idyllic pastures or floating islands, or on other planes of existence. Others serve deities of the Feywild and Upper Planes, aiding heroes in need. In rare cases, pegasi might befriend virtuous people and serve as their companions and steeds. Pegasi are hunted by servants of evil, leading many of these winged steeds to flee strangers on sight. Roll on or choose a result from the Pegasus Offerings table to inspire how one might show their good intentions to a wary pegasus. Pegasus Offerings / 1 | Bearing the gear of a hero the pegasus aided. / 2 | Offering magical fruit or holy spring water. / 3 | Singing a song in Celestial, Druidic, or Sylvan. / 4 | Wearing the garb of an ancient heroic order. Pegasi are the cherished steeds of our creator, Corellon. To see one is a blessing, but to ride one proves nothing less than the love of the gods.
  - Hooves: m 6, reach 5 ft. {@h}7 (1d6 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.

### [peryton] Peryton — desafío 2, Mediano Monstruosidad
Descripción oficial: [Peryton] Winged Heart Hunter [Habitat:] Hill, Mountain [Treasure:] Armaments Perytons are monstrous predators that hunt people—particularly humans and elves—in favor of all other prey. With the bodies of mighty avian scavengers and fanged, stag-like heads, perytons use ambush tactics to dive-bomb travelers. Strangely, the shadows they cast resemble humanoid silhouettes. This supernatural oddity lends credence to stories that perytons are cursed humans or elves, or that they arise from carrion birds that feed on the corpses of villains. Perytons tear out the hearts of those they slay, carrying the organs back to grisly lairs. This gives rise to numerous superstitions surrounding perytons. Roll on or choose a result from the Peryton Superstitions table to inspire why a peryton steals hearts. Peryton Superstitions / 1 | The hearts grant an evil wish. / 2 | It reverts to its original form. / 3 | A new peryton hatches from each heart. / 4 | A portal opens to the Lower Planes.
  - Flyby: The peryton doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.
  - Multiattack: The peryton makes one Gore attack and one Talons attack.
  - Gore: m 5, reach 5 ft. {@h}7 (1d8 + 3) Piercing damage. If the peryton moved 30+ feet straight toward the target immediately before the hit, the target takes an extra 9 (2d8) Piercing damage.
  - Talons: m 5, reach 5 ft. {@h}8 (2d4 + 3) Piercing damage. If the attack reduces a Humanoid target to 0 Hit Points, the peryton kills the target by removing its heart.

### [plesiosaurus] Plesiosaurus — desafío 2, Grande Bestia
  - Hold Breath: The plesiosaurus can hold its breath for 1 hour.
  - Bite: m 6, reach 10 ft. {@h}11 (2d6 + 4) Piercing damage.

### [polar-bear] Polar Bear — desafío 2, Grande Bestia
  - Multiattack: The bear makes two Rend attacks.
  - Rend: m 7, reach 5 ft. {@h}9 (1d8 + 5) Slashing damage.

### [poltergeist] Poltergeist — desafío 2, Pequeño o Mediano Muerto viviente
Descripción oficial: [Poltergeist] Malevolent or Mischievous Spirit [Habitat:] Underdark, Urban [Treasure:] Any Poltergeists are spirits that confuse and torment the living. While typically not visible, they sometimes appear as faded images of whoever they were in life. Some poltergeists don't realize they're dead and go through the motions of their past lives. Others are malicious beings or embodiments of fractured psyches that sow discord where they haunt. Poltergeists telekinetically move objects in the places they lurk. Roll on or choose a result from the Poltergeist Activities table to inspire how a poltergeist menaces the living. Poltergeist Activities / 1 | Keeps returning a discarded item. / 2 | Leaves footprints on vertical surfaces. / 3 | Makes noises like someone trapped in a wall. / 4 | Organizes a pack's contents across the floor. / 5 | Playfully puppets a corpse or doll. / 6 | Removes bedding while someone sleeps. / 7 | Sticks knives or weapons in the ceiling. / 8 | Uncannily stacks books, furniture, or utensils.
  - Incorporeal Movement: The poltergeist can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.
  - Multiattack: The poltergeist makes one Object Slam attack and uses Telekinetic Thrust.
  - Object Slam: m,r 4, reach 5 ft. or range 30 ft. {@h}7 (2d4 + 2) Bludgeoning damage.
  - Telekinetic Thrust: str 12, one creature the poltergeist can see within 30 feet. {@actSaveFail} 9 (2d6 + 2) Force damage, and the target is pushed up to 30 feet straight away from the poltergeist.
  - Vanish: The poltergeist gives itself the Invisible condition or ends that condition on itself.

### [priest] Priest — desafío 2, Pequeño o Mediano Humanoide
  - Multiattack: The priest makes two attacks, using Mace or Radiant Flame in any combination.
  - Mace: m 5, reach 5 ft. {@h}6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage.
  - Radiant Flame: r 5, range 60 ft. {@h}11 (2d10) Radiant damage.
  - Spellcasting (conjuros): The priest casts one of the following spells, using Wisdom as the spellcasting ability: Light Thaumaturgy Spirit Guardians
  - Divine Aid (3/Day) (conjuros): The priest casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting. Bless Dispel Magic Healing Word Lesser Restoration

### [quaggoth] Quaggoth — desafío 2, Mediano Monstruosidad
  - Bloodied Fury: While Bloodied, the quaggoth has Advantage on attack rolls.
  - Multiattack: The quaggoth makes two Claw attacks.
  - Claw: m 5, reach 5 ft. {@h}6 (1d6 + 3) Slashing damage, or 13 (3d6 + 3) Slashing damage if the quaggoth is Bloodied.

### [rhinoceros] Rhinoceros — desafío 2, Grande Bestia
  - Gore: m 7, reach 5 ft. {@h}14 (2d8 + 5) Piercing damage. If target is a Large or smaller creature and the rhinoceros moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 (2d8) Piercing damage and has the Prone condition.

### [saber-toothed-tiger] Saber-Toothed Tiger — desafío 2, Grande Bestia
  - Running Leap: With a 10-foot running start, the tiger can Long Jump up to 25 feet.
  - Multiattack: The tiger makes two Rend attacks.
  - Rend: m 6, reach 5 ft. {@h}11 (2d6 + 4) Slashing damage.
  - Nimble Escape: The tiger takes the Disengage or Hide action.

### [sahuagin-priest] Sahuagin Priest — desafío 2, Mediano Infernal
  - Blood Frenzy: The sahuagin has Advantage on attack rolls against any creature that doesn't have all its Hit Points.
  - Limited Amphibiousness: The sahuagin can breathe air and water, but it must be submerged at least once every 4 hours to avoid suffocating outside water.
  - Shark Telepathy: The sahuagin can magically control sharks within 120 feet of itself, using a special telepathy.
  - Multiattack: The sahuagin makes two Spectral Jaws attacks.
  - Spectral Jaws: m,r 4, reach 5 ft. or range 120 ft. {@h}11 (2d8 + 2) Force damage.
  - Spellcasting (conjuros): The sahuagin casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save 12): Thaumaturgy Hold Person Tongues
  - Fiendish Aid (2/Day) (conjuros): The sahuagin casts Bless or Healing Word, using the same spellcasting ability as Spellcasting. Bless Healing Word

### [sea-hag] Sea Hag — desafío 2, Mediano Feérico
Descripción oficial: [Sea Hag] Hag of Despair and the Dismal Deep [Habitat:] Coastal, Underwater [Treasure:] Arcana Sea hags loathe peace and beauty. Bitter, jealous creatures, they spread chaos and undermine joy however they can, undertaking elaborate deceptions to sow discord for its own sake. The hags' true forms are supernaturally vile, and their baleful gazes can strike down creatures frightened by their appearance. Sea hags cloak themselves in illusions to work their schemes. Roll on or choose a result from the Sea Hag Disguises table to inspire a sea hag's illusion and how they might use it to wreak chaos and destruction. Sea Hag Disguises / 1 | Captive and claims nearby villagers bound them and left them to drown. / 2 | Castaway and shares a cursed item's location with would-be rescuers. / 3 | Healer and passes off poisons as medicine. / 4 | Panic-spreading prophesier of doom. / 5 | Ship captain and delivers passengers to the hag's pet sea monster. / 6 | Wounded sailor and claims their ship was destroyed by merfolk or other peaceful people.
  - Amphibious: The hag can breathe air and water.
  - Vile Appearance: wis 11, any Beast or Humanoid that starts its turn within 30 feet of the hag and can see the hag's true form. {@actSaveFail} The target has the Frightened condition until the start of its next turn. {@actSaveSuccess} The target is immune to this hag's Vile Appearance for 24 hours.
  - Claw: m 5, reach 5 ft. {@h}10 (2d6 + 3) Slashing damage.
  - Death Glare (Recarga 5–6): wis 11, one Frightened creature the hag can see within 30 feet. {@actSaveFail} If the target has 20 Hit Points or fewer, it drops to 0 Hit Points. Otherwise, the target takes 13 (3d8) Psychic damage.
  - Coven Magic (conjuros): While within 30 feet of at least two hag allies, the hag can cast one of the following spells, requiring no Material components, using the spell's normal casting time, and using Intelligence as the spellcasting ability (spell save 11): Augury, Find Familiar, Identify, Locate Object, Scrying, or Unseen Servant. The hag must finish a Long Rest before using this trait to cast that spell again.
  - Illusory Appearance (conjuros): The hag casts Disguise Self, using Constitution as the spellcasting ability (spell save 13). The spell's duration is 24 hours. Disguise Self

### [silver-dragon-wyrmling] Silver Dragon Wyrmling — desafío 2, Mediano Dragón
  - Multiattack: The dragon makes two Rend attacks.
  - Rend: m 6, reach 5 ft. {@h}9 (1d10 + 4) Piercing damage.
  - Cold Breath (Recarga 5–6): con 13, each creature in a 15-foot Cone. {@actSaveFail} 18 (4d8) Cold damage. {@actSaveSuccess} Half damage.
  - Paralyzing Breath: con 13, each creature in a 15-foot Cone. 1 The target has the Incapacitated condition until the end of its next turn, when it repeats the save. 2 The target has the Paralyzed condition, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

### [spined-devil] Spined Devil — desafío 2, Pequeño Infernal
Descripción oficial: [Spined Devil] Devil of Intrusion and Suspicion [Habitat:] Planar (Nine Hells) [Treasure:] None Spined devils, also known as spinagons, lurk in the shadows of the Lower Planes, seeking secrets for their infernal lords. They prefer to attack from the air, flinging wicked barbs while staying out of reach of foes. Spined devils collect information to gain leverage over mortals or to entice powerful devils. Roll on or choose a result from the Spined Devil Intelligence table to inspire what information a spined devil seeks or already possesses. Spined Devil Intelligence / 1 | Artifacts, their locations, and their owners. / 2 | Betrayals by infernal allies or other devils. / 3 | Crimes or deceptions by influential leaders. / 4 | The identities of incognito individuals. / 5 | The movements of extraplanar armies. / 6 | Prophecies or secrets hidden by gods.
  - Flyby: The devil doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.
  - Magic Resistance: The devil has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The devil makes two attacks, using Infernal Fork and Tail Spine in any combination.
  - Infernal Fork: m 4, reach 5 ft. {@h}5 (1d6 + 2) Piercing damage plus 3 (1d6) Fire damage.
  - Tail Spine: r 4, range 20/80 ft. {@h}4 (1d4 + 2) Piercing damage plus 3 (1d6) Fire damage.

### [swarm-of-stirges] Swarm of Stirges — desafío 2, Mediano Monstruosidad
  - Swarm: The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.
  - Swarm of Proboscises: m 5, reach 5 ft. {@h}14 (2d10 + 3) Piercing damage, or 8 (1d10 + 3) Piercing damage if the swarm is Bloodied. If the target is a Medium or smaller creature in the swarm's space, the target has the Grappled condition (escape 13). Until the grapple ends, the target takes 7 (2d6) Necrotic damage at the end of each of its turns.

### [swarm-of-venomous-snakes] Swarm of Venomous Snakes — desafío 2, Mediano Bestia
  - Swarm: The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny snake. The swarm can't regain Hit Points or gain Temporary Hit Points.
  - Bites: m 6, reach 5 ft. {@h}8 (1d8 + 4) Piercing damage—or 6 (1d4 + 4) Piercing damage if the swarm is Bloodied—plus 10 (3d6) Poison damage.

### [wererat] Wererat — desafío 2, Pequeño o Mediano Monstruosidad
Descripción oficial: [Wererat] Changed by the Deviousness of the Rat [Habitat:] Forest, Urban [Treasure:] Individual Wererats can shape-shift from their humanoid forms into giant rats or humanoid-rat hybrids. These creatures can transform voluntarily, but some are magically compelled to shape-shift when exposed to complete darkness or during nights of a new moon. Often, wererats' nature results from a divine curse—punishment for their deceitful natures or the crimes of their treacherous families. Wererats frequently work in groups, forming bandit gangs or thieves' guilds.
  - Multiattack: The wererat makes two attacks, using Scratch or Hand Crossbow in any combination. It can replace one attack with a Bite attack.
  - Bite (Rat or Hybrid Form Only): m 5, reach 5 ft. {@h}8 (2d4 + 3) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. con 11. {@actSaveFail} The target is cursed. If the cursed target drops to 0 Hit Points, it instead becomes a Wererat under the DM's control and has 10 Hit Points. {@actSaveSuccess} The target is immune to this wererat's curse for 24 hours.
  - Scratch: m 5, reach 5 ft. {@h}6 (1d6 + 3) Slashing damage.
  - Hand Crossbow (Humanoid or Hybrid Form Only): r 5, range 30/120 ft. {@h}6 (1d6 + 3) Piercing damage.
  - Shape-Shift: The wererat shape-shifts into a Medium rat-humanoid hybrid or a Small rat, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.

### [white-dragon-wyrmling] White Dragon Wyrmling — desafío 2, Mediano Dragón
  - Ice Walk: The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, Difficult Terrain composed of ice or snow doesn't cost it extra movement.
  - Multiattack: The dragon makes two Rend attacks.
  - Rend: m 4, reach 5 ft. {@h}6 (1d8 + 2) Slashing damage plus 2 (1d4) Cold damage.
  - Cold Breath (Recarga 5–6): con 12, each creature in a 15-foot Cone. {@actSaveFail} 22 (5d8) Cold damage. {@actSaveSuccess} Half damage.

### [will-o-wisp] Will-o'-Wisp — desafío 2, Diminuto Muerto viviente
Descripción oficial: [Will-o'-Wisp] Guide on the Path to Doom [Habitat:] Forest, Swamp, Urban [Treasure:] None From a distance, will-o'-wisps look like lanterns bobbing in the dark. Through the windows of abandoned structures or around the bends of treacherous paths, these spirits tempt the curious into peril. Once their prey is vulnerable, will-o'-wisps feed on the life force of those they lay low. Roll on or choose a result from the Will-o'-Wisp Ambushes table to inspire how a will-o'-wisp imperils its victims. Will-o'-Wisp Ambushes / 1 | An abandoned structure ready to collapse. / 2 | An ambush by hungry ghouls or vampires. / 3 | A dreaded ruin that curses those who enter. / 4 | The lair of a predator, like a bear or wyvern. / 5 | Patches of brown mold or green slime. / 6 | Quicksand or pools covered in thin ice.
  - Ephemeral: The wisp can't wear or carry anything.
  - Illumination: The wisp sheds Bright Light in a 20-foot radius and Dim Light for an additional 20 feet.
  - Incorporeal Movement: The wisp can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.
  - Shock: m 4, reach 5 ft. {@h}11 (2d8 + 2) Lightning damage.
  - Consume Life: con 10, one living creature the wisp can see within 5 feet that has 0 Hit Points. {@actSaveFail} The target dies, and the wisp regains 10 (3d6) Hit Points.
  - Vanish: The wisp and its light have the Invisible condition until the wisp's Concentration ends on this effect, which ends early immediately after the wisp makes an attack roll or uses Consume Life.

### [ankylosaurus] Ankylosaurus — desafío 3, Enorme Bestia
  - Multiattack: The ankylosaurus makes two Tail attacks.
  - Tail: m 6, reach 10 ft. {@h}9 (1d10 + 4) Bludgeoning damage. If the target is a Huge or smaller creature, it has the Prone condition.

### [basilisk] Basilisk — desafío 3, Mediano Monstruosidad
Descripción oficial: [Basilisk] Reptilian Guardian with a Petrifying Gaze [Habitat:] Mountain, Underdark [Treasure:] Any Basilisks are ponderous predators with eight clawed legs, crystalline spines, and mighty jaws. Rather than chasing prey, they use their supernatural gaze to turn creatures to stone and then consume these victims at their leisure. While basilisks are most comfortable in subterranean lairs, many are captured and kept by unscrupulous folk seeking guardians for their treasures. The remains of Petrified creatures litter the area where a basilisk hunts. These might be mundane creatures or more unusual beings that had dire encounters with a basilisk. Roll on or choose a result from the Petrified Basilisk Victims table to inspire the statues that might appear in a basilisk's hunting grounds. There is a 50 chance that any of these statues are missing limbs or broken into pieces. Rule 4: No one carves statues of frightened warriors. If you see one, keep your eyes closed and your ears open. Petrified Basilisk Victims / 1 | An adventurer with an ornate key hanging around their neck. / 2 | Animals like bats, bears, deer, or goats. / 3 | A climber clinging to a stalactite. / 4 | Itself using a large mirror or shiny surface. / 5 | A mimic disguised as a chest full of treasure. / 6 | A monster such as an umber hulk or a troglodyte. / 7 | Someone caught in a comic pose or making a regrettable face. / 8 | A victim now being used as a nest for insects or other vermin.
  - Bite: m 5, reach 5 ft. {@h}10 (2d6 + 3) Piercing damage plus 7 (2d6) Poison damage.
  - Petrifying Gaze (Recarga 4–6): con 12, each creature in a 30-foot Cone. If the basilisk sees its reflection within the Cone, the basilisk must make this save. 1 The target has the Restrained condition and repeats the save at the end of its next turn if it is still Restrained, ending the effect on itself on a success. 2 The target has the Petrified condition instead of the Restrained condition.

### [bearded-devil] Bearded Devil — desafío 3, Mediano Infernal
Descripción oficial: [Bearded Devil] Devil of Force and Intimidation [Habitat:] Planar (Nine Hells) [Treasure:] Armaments Bearded devils, also known as barbazus, fill the legions of the Nine Hells. These cruel soldiers follow the orders of diabolical generals as they defend infernal realms, invade Material Plane worlds, and clash against demons in planes-spanning conflicts. Left to their own devices, bearded devils encourage mortals to act callously and abuse their power, inflating their egos and inspiring petty tyrannies. Villains aligned with the Nine Hells call on bearded devils to serve as guardians, enforce their will, or fight in wicked armies. Bearded devils' eponymous beards consist of grotesque, tentacle-like growths. These squirming, barb-riddled beards carry poison capable of preventing magical healing. Bearded devils are also known for their distinctive glaives, through which they channel hellish energy. Those struck by these unnatural weapons suffer infernal wounds that grow worse until stanched or magically healed.
  - Magic Resistance: The devil has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The devil makes one Beard attack and one Infernal Glaive attack.
  - Beard: m 5, reach 5 ft. {@h}7 (1d8 + 3) Piercing damage, and the target has the Poisoned condition until the start of the devil's next turn. Until this poison ends, the target can't regain Hit Points.
  - Infernal Glaive: m 5, reach 10 ft. {@h}8 (1d10 + 3) Slashing damage. If the target is a creature and doesn't already have an infernal wound, it is subjected to the following effect. con 12. {@actSaveFail} The target receives an infernal wound. While wounded, the target loses 5 (1d10) Hit Points at the start of each of its turns. The wound closes after 1 minute, after a spell restores Hit Points to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, doing so by succeeding on a 12 Wisdom (Medicine) check.

### [blue-dragon-wyrmling] Blue Dragon Wyrmling — desafío 3, Mediano Dragón
  - Multiattack: The dragon makes two Rend attacks.
  - Rend: m 5, reach 5 ft. {@h}8 (1d10 + 3) Slashing damage plus 3 (1d6) Lightning damage.
  - Lightning Breath (Recarga 5–6): dex 12, each creature in a 30-foot-long, 5-foot-wide Line. {@actSaveFail} 21 (6d6) Lightning damage. {@actSaveSuccess} Half damage.

### [bugbear-stalker] Bugbear Stalker — desafío 3, Mediano Feérico
  - Abduct: The bugbear needn't spend extra movement to move a creature it is grappling.
  - Multiattack: The bugbear makes two Javelin or Morningstar attacks.
  - Javelin: m,r 5, reach 10 ft. or range 30/120 ft. {@h}13 (3d6 + 3) Piercing damage.
  - Morningstar: m 5 (with Advantage if the target is Grappled by the bugbear), reach 10 ft. {@h}12 (2d8 + 3) Piercing damage.
  - Quick Grapple: dex 13, one Medium or smaller creature the bugbear can see within 10 feet. {@actSaveFail} The target has the Grappled condition (escape 13).

### [displacer-beast] Displacer Beast — desafío 3, Grande Monstruosidad
Descripción oficial: [Displacer Beast] Deceptive Feline Stalker [Habitat:] Forest [Treasure:] None A displacer beast resembles a gaunt, six-legged panther with a barbed tentacle sprouting from each of its shoulders. This predator uses innate magic to displace light so it appears to be several feet away from its actual location. Displacer beasts hunt not just to feed but because they enjoy killing. Once displacer beasts begin stalking prey, they can't be deterred until either they or their quarry is slain. While displacer beasts commonly inhabit dense forests, they might pursue travelers across great distances and even into cities or dungeons. More cunning than mere animals, these predators might set ambushes or lie hidden for days to bring down their prey. Displacer beasts sometimes pursue prey through portals to other planes of existence. As a result, these predators can be found across the multiverse, particularly on the worlds of the Material Plane, in the Shadowfell, and in the Feywild. These restless hunters can destroy a land's natural balance and drive other creatures to extinction. As a result, many druid circles and Fey view displacer beasts as deadly threats. The murderous fury of a displacer beast is fit only for nightmares, of which I've been haunted since narrowly escaping one's ambush. I'm certain that beast stalks me still.
  - Avoidance: If the displacer beast is subjected to an effect that allows it to make a saving throw to take only half damage, it instead takes no damage if it succeeds on the save and half damage if it fails. It can't use this trait if it has the Incapacitated condition.
  - Displacement: Attack rolls against the displacer beast have Disadvantage, since it projects an illusion that makes it appear to be near its actual location. This trait is suppressed while the displacer beast has the Incapacitated condition.
  - Multiattack: The displacer beast makes one Rend attack and one Tentacle attack.
  - Rend: m 6, reach 5 feet. {@h}9 (1d10 + 4) Slashing damage. If target is a Large or smaller creature, it has the Prone condition.
  - Tentacle: m 6, reach 10 feet. {@h}11 (2d6 + 4) Piercing damage.
