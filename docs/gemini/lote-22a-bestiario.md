# Encargo: Lote 22a (bestiario, desafío 0 a 1/4) de la app "Mi turno"

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

### [awakened-shrub] Awakened Shrub — desafío 0, Pequeño Planta
  - Rake: m 1, reach 5 ft. {@h}1 Slashing damage.

### [baboon] Baboon — desafío 0, Pequeño Bestia
  - Pack Tactics: The baboon has Advantage on an attack roll against a creature if at least one of the baboon's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - Bite: m 1, reach 5 ft. {@h}1 (1d4 - 1) Piercing damage.

### [badger] Badger — desafío 0, Diminuto Bestia
  - Bite: m 2, reach 5 ft. {@h}1 Piercing damage.

### [bat] Bat — desafío 0, Diminuto Bestia
  - Bite: m 4 to hit, reach 5 ft. {@h}1 Piercing damage.

### [cat] Cat — desafío 0, Diminuto Bestia
  - Jumper: The cat's jump distance is determined using its Dexterity rather than its Strength.
  - Scratch: m 4, reach 5 ft. {@h}1 Slashing damage.

### [commoner] Commoner — desafío 0, Pequeño o Mediano Humanoide
Descripción oficial: [Commoner] Everyday Folk [Habitat:] Any [Treasure:] Individual Commoners constitute the majority of people who don't pursue magical talents, extraordinary training, or a life of adventure. Some are generous, helpful sorts, while others are more cautious in sharing what they have. Use the following list of jobs and roles to introduce commoners in your adventures: Artist Baker Bartender Blacksmith Butcher Captive Carpenter Castaway Cobbler Cook Dyer Farmer Fisher Fletcher Flimflam artist Gossip Hermit Hooligan Hunter Innkeeper Laborer Lamplighter Mason Merchant Miner Mud lark Patient Pilgrim Resurrectionist Rioter Scribe Servant Shepherd Student Tailor Tanner Town crier Weaver Youngster
  - Training: The commoner has proficiency in one skill of the DM's choice and has Advantage whenever it makes an ability check using that skill.
  - Club: m 2, reach 5 ft. {@h}2 (1d4) Bludgeoning damage.

### [crab] Crab — desafío 0, Diminuto Bestia
  - Amphibious: The crab can breathe air and water.
  - Claw: m 2, reach 5 ft. {@h}1 Bludgeoning damage.

### [crawling-claw] Crawling Claw — desafío 0, Diminuto Muerto viviente
  - Slam: m 3, reach 5 ft. {@h}2 Necrotic damage.

### [deer] Deer — desafío 0, Mediano Bestia
  - Agile: The deer doesn't provoke an Opportunity Attack when it moves out of an enemy's reach.
  - Ram: m 2, reach 5 ft. {@h}2 (1d4) Bludgeoning damage.

### [eagle] Eagle — desafío 0, Pequeño Bestia
  - Talons: m 4, reach 5 feet. {@h}4 (1d4 + 2) Slashing damage.

### [frog] Frog — desafío 0, Diminuto Bestia
  - Amphibious: The frog can breathe air and water.
  - Standing Leap: The frog's Long Jump is up to 10 feet and its High Jump is up to 5 feet with or without a running start.
  - Bite: m 3, reach 5 ft. {@h}1 Piercing damage.

### [giant-fire-beetle] Giant Fire Beetle — desafío 0, Pequeño Bestia
  - Illumination: The beetle sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet.
  - Bite: m 1, reach 5 ft. {@h}1 Fire damage.

### [goat] Goat — desafío 0, Mediano Bestia
  - Ram: m 2, reach 5 ft. {@h}1 Bludgeoning damage, or 2 (1d4) Bludgeoning damage if the goat moved 20+ feet straight toward the target immediately before the hit.

### [hawk] Hawk — desafío 0, Diminuto Bestia
  - Talons: m 5, reach 5 ft. {@h}1 Slashing damage.

### [homunculus] Homunculus — desafío 0, Diminuto Constructo
Descripción oficial: [Homunculus] Winged Servant Given Magical Life [Habitat:] Any [Treasure:] None A mage can create a cat-sized, obedient assistant called a homunculus through a ritual that uses the mage's blood. Each homunculus shares a telepathic bond with the mage who created it and loyally serves its creator. A homunculus is reduced to inert material if its creator dies. A homunculus's appearance reflects its creator's tastes. Roll on or choose a result from the Homunculus Features table to inspire a homunculus's form. Homunculus Features / 1 | Bat-like with tattered wings. / 2 | Made of soft metal and delicate gears. / 3 | Marked with its creator's symbol. / 4 | Similar to those of a winged humanoid. / 5 | Sprouting flowers and leaves. / 6 | Suggestive of its creator's appearance. / 7 | Underdeveloped and fleshy with beady eyes. / 8 | Woven and patchwork, like a well-loved toy.
  - Telepathic Bond: While the homunculus is on the same plane of existence as its master, the two of them can communicate telepathically with each other.
  - Bite: m 4, reach 5 ft. {@h}1 Piercing damage, and the target is subjected to the following effect. con 12. {@actSaveFail} The target has the Poisoned condition until the end of the homunculus's next turn. 5 The target has the Poisoned condition for 1 minute. While Poisoned, the target has the Unconscious condition, which ends early if the target takes any damage.

### [hyena] Hyena — desafío 0, Mediano Bestia
  - Pack Tactics: The hyena has Advantage on an attack roll against a creature if at least one of the hyena's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - Bite: m 2, reach 5 ft. {@h}3 (1d6) Piercing damage.

### [jackal] Jackal — desafío 0, Pequeño Bestia
  - Bite: m 1, reach 5 ft. {@h}1 (1d4 - 1) Piercing damage.

### [larva] Larva — desafío 0, Mediano Infernal
  - Bite: m 1, reach 5 ft. {@h}1 (1d4 - 1) Necrotic damage.

### [lemure] Lemure — desafío 0, Mediano Infernal
  - Hellish Restoration: If the lemure dies in the Nine Hells, it revives with all its Hit Points in 1d10 days unless it is killed by a creature under the effects of a Bless spell or its remains are sprinkled with Holy Water.
  - Vile Slime: m 2, reach 5 ft. {@h}2 (1d4) Poison damage.

### [lizard] Lizard — desafío 0, Diminuto Bestia
  - Spider Climb: The lizard can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - Bite: m 2, reach 5 ft. {@h}1 Piercing damage.

### [myconid-sprout] Myconid Sprout — desafío 0, Pequeño Planta
  - Sun Sickness: While in sunlight, the myconid has Disadvantage on D20 Tests. The myconid dies if it spends more than 1 hour in sunlight.
  - Slam: m 1, reach 5 ft. {@h}1 (1d4 - 1) Bludgeoning damage plus 2 (1d4) Poison damage.
  - Rapport Spores: The myconid expels spores in a 30-foot Emanation originating from itself. Creatures in that area with an Intelligence score of 2 or higher that aren't Constructs, Elementals, or Undead gain telepathy with a range of 30 feet for 1 hour.

### [octopus] Octopus — desafío 0, Pequeño Bestia
  - Compression: The octopus can move through a space as narrow as 1 inch without expending extra movement to do so.
  - Water Breathing: The octopus can breathe only underwater.
  - Tentacles: m 4, reach 5 ft. {@h}1 Bludgeoning damage.
  - Ink Cloud (1/Day): {@actTrigger} A creature ends its turn within 5 feet of the octopus while underwater. {@actResponse} The octopus releases ink that fills a 5-foot Cube centered on itself, and the octopus moves up to its Swim Speed. The Cube is Heavily Obscured for 1 minute or until a strong current or similar effect disperses the ink.

### [owl] Owl — desafío 0, Diminuto Bestia
  - Flyby: The owl doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.
  - Talons: m 3, reach 5 ft. {@h}1 Slashing damage.

### [piranha] Piranha — desafío 0, Diminuto Bestia
  - Water Breathing: The piranha can breathe only underwater.
  - Bite: m 5 (with Advantage if the target doesn't have all its Hit Points), reach 5 ft. {@h}1 Piercing damage.

### [rat] Rat — desafío 0, Diminuto Bestia
  - Agile: The rat doesn't provoke Opportunity Attacks when it moves out of an enemy's reach.
  - Bite: m 2, reach 5 ft. {@h}1 Piercing damage.

### [raven] Raven — desafío 0, Diminuto Bestia
  - Mimicry: The raven can mimic simple sounds it has heard, such as a whisper or chitter. A hearer can discern the sounds are imitations with a successful 10 Wisdom (Insight) check.
  - Beak: m 4, reach 5 ft. {@h}1 Piercing damage.

### [scorpion] Scorpion — desafío 0, Diminuto Bestia
  - Sting: m 2, reach 5 ft. {@h}1 Piercing damage plus 3 (1d6) Poison damage.

### [seahorse] Seahorse — desafío 0, Diminuto Bestia
  - Water Breathing: The seahorse can breathe only underwater.
  - Bubble Dash: While underwater, the seahorse moves up to its Swim Speed without provoking Opportunity Attacks.

### [shrieker-fungus] Shrieker Fungus — desafío 0, Mediano Planta
  - Shriek: {@actTrigger} A creature or a source of Bright Light moves within 30 feet of the shrieker. {@actResponse} The shrieker emits a shriek audible within 300 feet of itself for 1 minute or until the shrieker dies.

### [spider] Spider — desafío 0, Diminuto Bestia
  - Spider Climb: The spider can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - Web Walker: The spider ignores movement restrictions caused by webs, and the spider knows the location of any other creature in contact with the same web.
  - Bite: m 4, reach 5 ft. {@h}1 Piercing damage plus 2 (1d4) Poison damage.

### [vulture] Vulture — desafío 0, Mediano Bestia
  - Pack Tactics: The vulture has Advantage on an attack roll against a creature if at least one of the vulture's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - Beak: m 2, reach 5 ft. {@h}2 (1d4) Piercing damage.

### [weasel] Weasel — desafío 0, Diminuto Bestia
  - Bite: m 5, reach 5 ft. {@h}1 Piercing damage.

### [bandit] Bandit — desafío 1/8, Pequeño o Mediano Humanoide
  - Scimitar: m 3, reach 5 ft. {@h}4 (1d6 + 1) Slashing damage.
  - Light Crossbow: r 3, range 80/320 ft. {@h}5 (1d8 + 1) Piercing damage.

### [blood-hawk] Blood Hawk — desafío 1/8, Pequeño Bestia
  - Pack Tactics: The hawk has Advantage on an attack roll against a creature if at least one of the hawk's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - Beak: m 4, reach 5 ft. {@h}4 (1d4 + 2) Piercing damage, or 6 (1d8 + 2) Piercing damage if the target is Bloodied.

### [camel] Camel — desafío 1/8, Grande Bestia
  - Bite: m 4, reach 5 ft. {@h}4 (1d4 + 2) Bludgeoning damage.

### [cultist] Cultist — desafío 1/8, Pequeño o Mediano Humanoide
  - Ritual Sickle: m 3, reach 5 ft. {@h}3 (1d4 + 1) Slashing damage plus 1 Necrotic damage.

### [flumph] Flumph — desafío 1/8, Pequeño Aberración
Descripción oficial: [Flumph] Strange Ally from a Strange Place [Habitat:] Underdark [Treasure:] Arcana Bizarre creatures with aberrant agendas inhabit the Underdark. Flumphs number among the few that are helpful to strangers. These tentacled, telepathic creatures jet through the air in short bursts, venting gases with a sound that gives them their name. Rather than speaking, flumphs communicate telepathically and by changing color to reflect their moods. Flumphs dwell in psychically charged regions or near creatures with psionic magic. They harmlessly feed off psychic energies, but in doing so, they often encounter dangerous beings such as aboleths and mind flayers. While flumphs generally avoid combat, they often help adventurers in peril. Such help might be of doubtful use, but flumphs mean well. Roll on or choose a result from the Flumph Assistance table to inspire what support flumphs provide. Flumph Assistance / 1 | Cooking a meal of Underdark delicacies. / 2 | Performing a psychic song or "smell poem." / 3 | Recovering and nursing fallen adventurers. / 4 | Revealing the location of helpful magic items. / 5 | Serving as a guide to a foe's hidden lair. / 6 | Sharing excessive encouragement and praise. [Flumph Colors] A flumph's extremities change color to reflect its mood. The Flumph Colors and Emotions table summarizes common flumph colors and the human emotions to which they most closely correspond. Flumph Colors and Emotions / Blue, Dark | Sadness / Blue, Light | Happiness / Green | Curiosity / Magenta | Unknown* / Orange | Confusion / Pink | Amusement / Purple | Fear / Red | Anger / Teal | Serenity / Yellow | Excitement
  - Advanced Telepathy: The flumph perceives the content of any telepathic communication within 60 feet of it.
  - Prone Deficiency: If the flumph receives the Prone condition, roll a die. On an odd number, it has the Incapacitated condition. At the end of each of its turns, the flumph makes a 10 Dexterity saving throw, ending the Incapacitated condition on a success.
  - Telepathic Shroud: The flumph's thoughts can't be read by any means, and magic can't detect its location or observe it remotely.
  - Tentacle: m 4, reach 5 feet. {@h}4 (1d4 + 2) Acid damage.
  - Stench Spray (1/Day): dex 10, one creature the flumph can see within 15 feet. {@actSaveFail} The target is coated in a foul-smelling liquid, exudes a stench for 1d4 hours, and has the Poisoned condition while the stench lasts. Other creatures have the Poisoned condition while in a 5-foot Emanation originating from the coated target. The target can remove the stench on itself if it bathes during a Short or Long Rest.

### [flying-snake] Flying Snake — desafío 1/8, Diminuto Monstruosidad
  - Flyby: The snake doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.
  - Bite: m 4, reach 5 ft. {@h}1 Piercing damage plus 5 (2d4) Poison damage.

### [giant-crab] Giant Crab — desafío 1/8, Mediano Bestia
  - Amphibious: The crab can breathe air and water.
  - Claw: m 3, reach 5 ft. {@h}4 (1d6 + 1) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape 11) from one of two claws.

### [giant-rat] Giant Rat — desafío 1/8, Pequeño Bestia
  - Pack Tactics: The rat has Advantage on an attack roll against a creature if at least one of the rat's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - Bite: m 5, reach 5 feet. {@h}5 (1d4 + 3) Piercing damage.

### [giant-weasel] Giant Weasel — desafío 1/8, Mediano Bestia
  - Bite: m 5, reach 5 ft. {@h}5 (1d4 + 3) Piercing damage.

### [goblin-minion] Goblin Minion — desafío 1/8, Pequeño Feérico
  - Dagger: m,r 4, reach 5 ft. or range 20/60 ft. {@h}4 (1d4 + 2) Piercing damage.
  - Nimble Escape: The goblin takes the Disengage or Hide action.

### [guard] Guard — desafío 1/8, Pequeño o Mediano Humanoide
  - Spear: m,r 3, reach 5 ft. or range 20/60 ft. {@h}4 (1d6 + 1) Piercing damage.

### [kobold-warrior] Kobold Warrior — desafío 1/8, Pequeño Dragón
  - Pack Tactics: The kobold has Advantage on an attack roll against a creature if at least one of the kobold's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - Sunlight Sensitivity: While in sunlight, the kobold has Disadvantage on ability checks and attack rolls.
  - Dagger: m,r 4, reach 5 ft. or range 20/60 ft. {@h}4 (1d4 + 2) Piercing damage.

### [manes] Manes — desafío 1/8, Pequeño Infernal
  - Claw: m 2, reach 5 ft. {@h}5 (2d4) Slashing damage.

### [mastiff] Mastiff — desafío 1/8, Mediano Bestia
  - Bite: m 3, reach 5 ft. {@h}4 (1d6 + 1) Piercing damage. If the target is a Medium or smaller creature, it has the Prone condition.

### [merfolk-skirmisher] Merfolk Skirmisher — desafío 1/8, Mediano Elemental
  - Amphibious: The merfolk can breathe air and water.
  - Ocean Spear: m,r 2, reach 5 ft. or range 20/60 ft. {@h}3 (1d6) Piercing damage plus 2 (1d4) Cold damage. If the target is a creature, its Speed decreases by 10 feet until the end of its next turn. {@hom}The spear magically returns to the merfolk's hand immediately after a ranged attack.

### [modron-monodrone] Modron Monodrone — desafío 1/8, Mediano Constructo
  - Disintegration: If the modron dies, it disintegrates into dust, leaving behind anything it was wearing or carrying.
  - Gear: m 4, reach 5 ft. {@h}6 (1d8 + 2) Force damage.
  - Gear Flinger: r 4, range 120 ft. {@h}6 (1d8 + 2) Force damage.

### [mule] Mule — desafío 1/8, Mediano Bestia
  - Beast of Burden: The mule counts as one size larger for the purpose of determining its carrying capacity.
  - Hooves: m 4, reach 5 ft. {@h}4 (1d4 + 2) Bludgeoning damage.

### [noble] Noble — desafío 1/8, Pequeño o Mediano Humanoide
  - Rapier: m 3, reach 5 ft. {@h}5 (1d8 + 1) Piercing damage.
  - Parry: {@actTrigger} The noble is hit by a melee attack roll while holding a weapon. {@actResponse} The noble adds 2 to its AC against that attack, possibly causing it to miss.

### [pony] Pony — desafío 1/8, Mediano Bestia
  - Hooves: m 4, reach 5 ft. {@h}4 (1d4 + 2) Bludgeoning damage.

### [slaad-tadpole] Slaad Tadpole — desafío 1/8, Diminuto Aberración
  - Magic Resistance: The slaad has Advantage on saving throws against spells and other magical effects.
  - Bite: m 4, reach 5 ft. {@h}5 (1d6 + 2) Piercing damage.

### [stirge] Stirge — desafío 1/8, Diminuto Monstruosidad
  - Proboscis: m 5, reach 5 ft. {@h}6 (1d6 + 3) Piercing damage, and the stirge attaches to the target. While attached, the stirge can't make Proboscis attacks, and the target takes 5 (2d4) Necrotic damage at the start of each of the stirge's turns. The stirge can detach itself by spending 5 feet of its movement. The target or a creature within 5 feet of it can detach the stirge as an action.

### [twig-blight] Twig Blight — desafío 1/8, Pequeño Planta
  - Pack Tactics: The blight has Advantage on an attack roll against a creature if at least one of the blight's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - Claw: m 4, reach 5 ft. {@h}4 (1d4 + 2) Slashing damage.

### [venomous-snake] Venomous Snake — desafío 1/8, Diminuto Bestia
  - Bite: m 4, reach 5 ft. {@h}4 (1d4 + 2) Piercing damage plus 3 (1d6) Poison damage.

### [warrior-infantry] Warrior Infantry — desafío 1/8, Pequeño o Mediano Humanoide
  - Pack Tactics: The warrior has Advantage on an attack roll against a creature if at least one of the warrior's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - Spear: m,r 3, reach 5 ft. or range 20/60 ft. {@h}4 (1d6 + 1) Piercing damage.

### [aarakocra-skirmisher] Aarakocra Skirmisher — desafío 1/4, Mediano Elemental
  - Talons: m 4, reach 5 ft. {@h}4 (1d4 + 2) Slashing damage, or 9 (3d4 + 2) Slashing damage if the aarakocra moved 30+ feet straight toward the target immediately before the hit.
  - Wind Javelin: m,r 4, reach 5 ft. or range 30/120 ft. {@h}5 (1d6 + 2) Piercing damage plus 2 (1d4) Thunder damage. {@hom}The javelin magically returns to the aarakocra's hand immediately after a ranged attack.

### [animated-broom] Animated Broom — desafío 1/4, Pequeño Constructo
  - Flyby: The broom doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.
  - Slam: m 5, reach 5 ft. {@h}5 (1d4 + 3) Bludgeoning damage.

### [animated-flying-sword] Animated Flying Sword — desafío 1/4, Pequeño Constructo
  - Slash: m 4, reach 5 ft. {@h}6 (1d8 + 2) Slashing damage.

### [axe-beak] Axe Beak — desafío 1/4, Grande Monstruosidad
  - Beak: m 4, reach 5 ft. {@h}5 (1d6 + 2) Slashing damage.
