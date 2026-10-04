# Encargo: Lote 22e (bestiario, desafío 3 a 4) de la app "Mi turno"

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

### [doppelganger] Doppelganger — desafío 3, Mediano Monstruosidad
Descripción oficial: [Doppelganger] Shape-Shifting Infiltrator [Habitat:] Underdark, Urban [Treasure:] Individual Doppelgangers are supernatural beings with the ability to shape-shift into any humanlike form. Their mind-reading abilities aid them in creating near-perfect disguises and plucking secrets from unguarded minds. Occasionally, doppelgangers use their shape-shifting ability in more overt ways, transforming into unsettling forms to frighten foes. A doppelganger's agenda might relate to its mysterious magical origins or to more mercenary goals. Roll on or choose a result from the Doppelganger Deceptions table to inspire a doppelganger's plot. Doppelganger Deceptions / 1 | Cause chaos within the temple of a deity that cursed it to live without a true form. / 2 | Conceal evidence of a vast conspiracy. / 3 | Control a community through fear by posing as a legendary bogeyman. / 4 | Replace a noble to enjoy a decadent lifestyle. / 5 | Spy on wizards to learn how to complete its own botched magical creation. / 6 | Take an influential position, acting as a sleeper agent for a doppelganger invasion. Meeting yourself is the surest way to realize you're not as charming as you think you are.
  - Multiattack: The doppelganger makes two Slam attacks and uses Unsettling Visage if available.
  - Slam: m 6 (with Advantage during the first round of each combat), reach 5 ft. {@h}11 (2d6 + 4) Bludgeoning damage.
  - Unsettling Visage (Recarga 6): wis 12, each creature in a 15-foot Emanation originating from the doppelganger that can see the doppelganger. {@actSaveFail} The target has the Frightened condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.
  - Shape-Shift: The doppelganger shape-shifts into a Medium or Small Humanoid, or it returns to its true form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.
  - Read Thoughts (conjuros): The doppelganger casts Detect Thoughts, requiring no spell components and using Charisma as the spellcasting ability (spell save 12). Detect Thoughts

### [flaming-skeleton] Flaming Skeleton — desafío 3, Mediano Muerto viviente
  - Death Burst: The skeleton explodes when it dies. dex 12, each creature in a 10-foot Emanation originating from the skeleton. {@actSaveFail} 14 (4d6) Fire damage. {@actSaveSuccess} Half damage.
  - Illumination: The skeleton sheds Bright Light in a 15-foot radius and Dim Light for an additional 15 feet.
  - Multiattack: The skeleton makes two attacks, using Flame Scepter or Hurl Flame in any combination.
  - Flame Scepter: m 4, reach 5 ft. {@h}5 (1d6 + 2) Bludgeoning damage plus 3 (1d6) Fire damage.
  - Hurl Flame: r 4, range 60 ft. {@h}7 (1d10 + 2) Fire damage.

### [giant-scorpion] Giant Scorpion — desafío 3, Grande Bestia
  - Multiattack: The scorpion makes two Claw attacks and one Sting attack.
  - Claw: m 5, reach 5 ft. {@h}6 (1d6 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape 13) from one of two claws.
  - Sting: m 5, reach 5 ft. {@h}7 (1d8 + 3) Piercing damage plus 11 (2d10) Poison damage.

### [githyanki-warrior] Githyanki Warrior — desafío 3, Mediano Aberración
  - Multiattack: The githyanki makes two Psi Blade attacks.
  - Psi Blade: m 4, reach 5 ft. {@h}9 (2d6 + 2) Slashing damage plus 7 (2d6) Psychic damage.
  - Spellcasting (conjuros): The githyanki casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability: Mage Hand (the hand is Invisible) Nondetection (self only)
  - Misty Step (2/Day) (conjuros): The githyanki casts Misty Step, requiring no spell components and using the same spellcasting ability as Spellcasting. Misty Step

### [goblin-hexer] Goblin Hexer — desafío 3, Pequeño Feérico
  - Multiattack: The goblin makes two Hex Stick attacks. It can replace one attack with a use of Spellcasting.
  - Hex Stick: m,r 5, reach 5 ft. or range 60 ft. {@h}12 (2d8 + 3) Psychic damage.
  - Jinx: {@actTrigger} A creature the goblin can see hits it with an attack roll. dwis 13, the triggering creature. {@actSaveFail} The attack misses instead.
  - Spellcasting (conjuros): The goblin casts one of the following spells, using Intelligence as the spellcasting ability (spell save 13): Minor Illusion Blindness/Deafness Faerie Fire Grease

### [gold-dragon-wyrmling] Gold Dragon Wyrmling — desafío 3, Mediano Dragón
  - Amphibious: The dragon can breathe air and water.
  - Multiattack: The dragon makes two Rend attacks.
  - Rend: m 6, reach 5 ft. {@h}9 (1d10 + 4) Slashing damage.
  - Fire Breath (Recarga 5–6): dex 13, each creature in a 15-foot Cone. {@actSaveFail} 22 (4d10) Fire damage. {@actSaveSuccess} Half damage.
  - Weakening Breath: str 13, each creature that isn't currently affected by this breath in a 15-foot Cone. {@actSaveFail} The target has Disadvantage on Strength-based D20 Tests and subtracts 2 (1d4) from its damage rolls. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

### [green-hag] Green Hag — desafío 3, Mediano Feérico
Descripción oficial: [Green Hag] Foul Witch of the Wicked Wild [Habitat:] Forest, Hill, Swamp [Treasure:] Arcana Green hags work bitter magic to foul all that is beautiful and pure. Whether alone or in covens of other hags, these ancient witches call on eerie forces, spreading corruption and plotting doom for those who earn their ire. Green hags are adept deceivers, and they use illusions to cloak themselves in unassuming forms, hoping to tempt innocents into peril. These hags often spirit their victims back to surreal lairs where they hold captives prisoner or cook them into monstrous meals. Green hags frequently know strange magic or forgotten secrets, such as the weaknesses of villains, the locations of lost treasures, or the ways to break curses. They might trade such knowledge for rare magic or symbolic treasures. Roll on or choose a result from the Green Hag Bargains table to inspire what a green hag charges for its secrets. Green Hag Bargains / 1 | A bargainer's memories of a loved one. / 2 | The cauldron of a rival hag. / 3 | A favor to be redeemed when the hag wishes. / 4 | A flower from a hidden Feywild garden. / 5 | A gift given freely by a yugoloth. / 6 | A vial filled with a ruler's tears.
  - Amphibious: The hag can breathe air and water.
  - Mimicry: The hag can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful 14 Wisdom (Insight) check.
  - Multiattack: The hag makes two Claw attacks.
  - Claw: m 6, reach 5 ft. {@h}8 (1d8 + 4) Slashing damage plus 3 (1d6) Poison damage.
  - Coven Magic (conjuros): While within 30 feet of at least two hag allies, the hag can cast one of the following spells, requiring no Material components, using the spell's normal casting time, and using Intelligence as the spellcasting ability (spell save 11): Augury, Find Familiar, Identify, Locate Object, Scrying, or Unseen Servant. The hag must finish a Long Rest before using this trait to cast that spell again.
  - Spellcasting (conjuros): The hag casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save 12, 4 to hit with spell attacks): Dancing Lights Disguise Self (24-hour duration) Invisibility (self only, and the hag leaves no tracks while Invisible) Minor Illusion Ray of Sickness (level 3 version)

### [grell] Grell — desafío 3, Mediano Aberración
Descripción oficial: [Grell] Bizarre Hunter That Travels between Worlds [Habitat:] Underdark [Treasure:] None With barbed tentacles sprouting from their brain-shaped bodies, grells hunt the lightless depths. These silent predators defy gravity, allowing them to strike from unexpected places, and they perceive their surroundings via sound and electrical fields. Their tentacles secrete paralytic venom, which prevents most creatures ambushed by grells from crying out before being dragged into the dark and consumed. Grells are sapient beings, but their intellects and motivations are alien to most. They typically cooperate with one another only to defeat more powerful prey. Most demonstrate no interest in creating things or in communicating with other creatures, including their own kind. Many grells pursue methods of traveling between worlds and planes of existence. They sometimes slip onto star-faring vessels or enter portals heedless of their destination. Roll on or choose a result from the Grell Explorations table to inspire why grells seek passage between realms. Grell Explorations / 1 | Advanced viruses, each the clone of all other grell. They exist only to feed and spread. / 2 | The larvae of another creature and require electrically charged environs to reproduce. / 3 | Seeking to escape some catastrophe or terror lurking in the depths. / 4 | Supernaturally connected to ravenous alien beings and serve as their feeding appendages. / 5 | Vestiges of an ancient evil that will return if grells collectively consume enough creatures. / 6 | Without souls, but convinced they can attain souls by eating certain beings. For meal, my hunger grinds within my teeth. For might, my hunger clenches in my grip. But for what we're told we mustn't know, my hunger snaps a raptor's beak and makes my mind a muscle that knows only how to chew.
  - Abduct: The grell needn't spend extra movement to move a creature it is grappling.
  - Multiattack: The grell makes one Beak attack and one Paralyzing Tentacles attack.
  - Beak: m 4, reach 5 ft. {@h}11 (2d8 + 2) Piercing damage.
  - Paralyzing Tentacles: m 4, reach 10 ft. {@h}7 (1d10 + 2) Piercing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape 12) from two of ten tentacles. The target is also subjected to the following effect. con 11. {@actSaveFail} The target has the Poisoned condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. While Poisoned, the target has the Paralyzed condition.

### [hell-hound] Hell Hound — desafío 3, Mediano Infernal
Descripción oficial: [Hell Hound] Unrelenting Warden of the Lower Planes [Habitat:] Mountain, Planar (Lower Planes), Underdark [Treasure:] None Spawned from the pits of Acheron, Gehenna, and the Nine Hells, hell hounds enforce the merciless order of those realms and the whims of tyrannical masters. On their home planes of existence, these grim canines ensure that souls don't escape their bleak afterlives. On the Material Plane, hell hounds typically serve cruel masters—such as fire giants and cultists—who appreciate their viciousness, obedience, and fiery characteristics. Hell hounds serve other creatures so long as they're given opportunities to hunt and kill, but they're quick to turn on those who treat them as mere animals. Hell hounds have greater cunning than normal canines. They're skilled trackers and work together well in packs, often employing tricks and ambushes. Hell hounds enjoy hearing prey scream in their scorching jaws and fiery breath. They often go out of their way to draw out the terror of their victims' final moments.
  - Pack Tactics: The hound has Advantage on an attack roll against a creature if at least one of the hound's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - Multiattack: The hound makes two Bite attacks.
  - Bite: m 5, reach 5 ft. {@h}7 (1d8 + 3) Piercing damage plus 3 (1d6) Fire damage.
  - Fire Breath (Recarga 5–6): dex 12, each creature in a 15-foot Cone. {@actSaveFail} 17 (5d6) Fire damage. {@actSaveSuccess} Half damage.

### [hobgoblin-captain] Hobgoblin Captain — desafío 3, Mediano Feérico
  - Aura of Authority: While in a 10-foot Emanation originating from the hobgoblin, the hobgoblin and its allies have Advantage on attack rolls and saving throws, provided the hobgoblin doesn't have the Incapacitated condition.
  - Multiattack: The hobgoblin makes two attacks, using Greatsword or Longbow in any combination.
  - Greatsword: m 4, reach 5 ft. {@h}9 (2d6 + 2) Slashing damage plus 3 (1d6) Poison damage.
  - Longbow: r 4, range 150/600 ft. {@h}6 (1d8 + 2) Piercing damage plus 5 (2d4) Poison damage.

### [hook-horror] Hook Horror — desafío 3, Grande Monstruosidad
Descripción oficial: [Hook Horror] Echo-Stalking Underdark Hunter [Habitat:] Underdark [Treasure:] None Hook horrors are beaked predators whose forelimbs end in massive, hook-like claws. They flourish in the cavernous mazes of the Underdark, with its miles-deep trenches and stalactite forests suspended over empty darkness, where they barrel through caves and swing across cavern ceilings. Hook horrors feed opportunistically on plants, fungi, and any creatures that come close enough to hook. To perceive their surroundings, hook horrors echolocate via a range of noises, from banging on rocks and their own bodies to vocalizations that sound like strange squawks, screams, or clicks. Only hook horrors know the meaning of these noises, but many people who explore the Underdark or live near deep-reaching caves have sought the sources of such sounds only to fall victim to hungry hook horrors.
  - Multiattack: The hook horror makes two Hook attacks.
  - Hook: m 6, reach 10 ft. {@h}11 (2d6 + 4) Piercing damage. If the target is a Large or smaller creature, the hook horror moves the target 5 feet straight toward or away from itself.

### [killer-whale] Killer Whale — desafío 3, Enorme Bestia
  - Hold Breath: The whale can hold its breath for 30 minutes.
  - Bite: m 6, reach 5 ft. {@h}21 (5d6 + 4) Piercing damage.

### [knight] Knight — desafío 3, Pequeño o Mediano Humanoide
  - Multiattack: The knight makes two attacks, using Greatsword or Heavy Crossbow in any combination.
  - Greatsword: m 5, reach 5 ft. {@h}10 (2d6 + 3) Slashing damage plus 4 (1d8) Radiant damage.
  - Heavy Crossbow: r 2, range 100/400 ft. {@h}11 (2d10) Piercing damage plus 4 (1d8) Radiant damage.
  - Parry: {@actTrigger} The knight is hit by a melee attack roll while holding a weapon. {@actResponse} The knight adds 2 to its AC against that attack, possibly causing it to miss.

### [kuo-toa-monitor] Kuo-toa Monitor — desafío 3, Mediano Aberración
  - Amphibious: The kuo-toa can breathe air and water.
  - Sunlight Sensitivity: While in sunlight, the kuo-toa has Disadvantage on ability checks and attack rolls.
  - Multiattack: The kuo-toa makes two Bone Whip attacks.
  - Bone Whip: m 5, reach 10 ft. {@h}6 (1d6 + 3) Slashing damage plus 7 (2d6) Lightning damage, and the target can't make Opportunity Attacks until the start of the kuo-toa's next turn.

### [manticore] Manticore — desafío 3, Grande Monstruosidad
Descripción oficial: [Manticore] Winged, Leonine People-Eater [Habitat:] Arctic, Coastal, Grassland, Hill, Mountain [Treasure:] Any With lion-like claws, leathery wings, and broad jaws filled with rows of sharp teeth, manticores ambush travelers from above and devour them. Manticores crave the taste of humans, but lacking their favored prey, they eagerly consume other peoples and livestock. Manticores have tails bristling with detachable spikes. These monsters launch their tail spikes at their prey, skewering those on the ground or knocking flying creatures from the air. Despite their ravenous tendencies, manticores enjoy speaking with those they're about to devour. Sometimes they make agreements with their prey. Roll on or choose a result from the Manticore Negotiations table to inspire what a manticore might offer in exchange for a more tempting meal. Manticore Negotiations / 1 | Attack a particular foe. / 2 | Create a distraction. / 3 | Give up a captive or corpse. / 4 | Let a group navigate its territory unharmed. / 5 | Let someone pretend to slay it in battle. / 6 | Scare or threaten someone. / 7 | Serve a creature as a steed until the sun sets. / 8 | Try to locate something from its vantage point in the sky.
  - Multiattack: The manticore makes three attacks, using Rend or Tail Spike in any combination.
  - Rend: m 5, reach 5 ft. {@h}7 (1d8 + 3) Slashing damage.
  - Tail Spike: r 5, range 100/200 ft. {@h}7 (1d8 + 3) Piercing damage.

### [minotaur-of-baphomet] Minotaur of Baphomet — desafío 3, Grande Monstruosidad
Descripción oficial: [Minotaur of Baphomet] Berserker of the Demon Lord of Beasts [Habitat:] Underdark [Treasure:] Armaments Baphomet, Demon Lord of Beasts, claims to have created minotaurs and demands their worship. While most minotaurs live free of the demon lord's bonds, those that serve him become minotaurs of Baphomet. These brutes resemble the hulking, horned demon lord more than others of their kind, and they wreak havoc in that foul immortal's name. Rarely, non-minotaurs cursed by magic-users or spiteful deities might transform into these monsters. Minotaurs of Baphomet often dwell in mazes, leading their allies to hidden destinations and stalking trespassers. Roll on or choose a result from the Minotaur Mazes table to inspire the shape of a minotaur's dwelling. Minotaur Mazes / 1 | A multilevel mine or sewer. / 2 | Multiple mazes connected by magic portals. / 3 | A poisonous swamp with labyrinthine paths. / 4 | The ruins of a buried palace or temple.
  - Abyssal Glaive: m 6, reach 10 ft. {@h}10 (1d12 + 4) Slashing damage plus 10 (3d6) Necrotic damage.
  - Gore (Recarga 5–6): m 6, reach 5 ft. {@h}18 (4d6 + 4) Piercing damage. If the target is a Large or smaller creature and the minotaur moved 10+ feet straight toward it immediately before the hit, the target takes an extra 10 (3d6) Piercing damage and has the Prone condition.

### [mummy] Mummy — desafío 3, Pequeño o Mediano Muerto viviente
  - Multiattack: The mummy makes two Rotting Fist attacks and uses Dreadful Glare.
  - Rotting Fist: m 5, reach 5 ft. {@h}8 (1d10 + 3) Bludgeoning damage plus 10 (3d6) Necrotic damage. If the target is a creature, it is cursed. While cursed, the target can't regain Hit Points, its Hit Point maximum doesn't return to normal when finishing a Long Rest, and its Hit Point maximum decreases by 10 (3d6) every 24 hours that elapse. A creature dies and turns to dust if reduced to 0 Hit Points by this attack.
  - Dreadful Glare: wis 11, one creature the mummy can see within 60 feet. {@actSaveFail} The target has the Frightened condition until the end of the mummy's next turn. {@actSaveSuccess} The target is immune to this mummy's Dreadful Glare for 24 hours.

### [nightmare] Nightmare — desafío 3, Grande Infernal
Descripción oficial: [Nightmare] Dread Steed of the Lower Planes [Habitat:] Planar (Lower Planes) [Treasure:] None Nightmares resemble horses with flaming manes, burning hooves, and smoldering eyes. They terrorize weaker creatures and often ally with denizens of the Lower Planes in committing evil acts. These supernatural horses can innately travel between the Ethereal Plane and the Material Plane, and many know the locations of portals to the Lower Planes, the Shadowfell, and other sinister realms. Nightmares' speed, resilience, and ability to gallop between planes of existence make them steeds coveted by evildoers. Roll on or choose a result from the Nightmare Riders table to inspire what might employ a nightmare steed. Nightmare Riders / 1 | The champion or messenger of an evil deity. / 2 | A group of joyriding imps or quasits. / 3 | An innocent soul trapped on the wild Fiend. / 4 | A lore-hunting mage, cultist, or lich. / 5 | A night hag herding larvae between planes. / 6 | A wicked cavalier, such as a death knight, an erinyes, an incubus, or a vampire.
  - Confer Fire Resistance: The nightmare can grant Resistance to Fire damage to a rider while it is on the nightmare.
  - Illumination: The nightmare sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet.
  - Hooves: m 6, reach 5 ft. {@h}13 (2d8 + 4) Bludgeoning damage plus 10 (3d6) Fire damage.
  - Ethereal Stride: The nightmare and up to three willing creatures within 5 feet of it teleport to the Ethereal Plane from the Material Plane or vice versa.

### [owlbear] Owlbear — desafío 3, Grande Monstruosidad
  - Multiattack: The owlbear makes two Rend attacks.
  - Rend: m 7, reach 5 ft. {@h}14 (2d8 + 5) Slashing damage.

### [phase-spider] Phase Spider — desafío 3, Grande Monstruosidad
Descripción oficial: [Phase Spider] Plane-Shifting Arachnid Ambusher [Habitat:] Desert, Forest, Grassland, Hill, Planar (Ethereal Plane), Underdark, Urban [Treasure:] Any Phase spiders appear out of nowhere to attack, then vanish just as swiftly. These horse-size, magical arachnids are endemic to the Ethereal Plane. From vaporous lairs, they peer through the Border Ethereal into the Material Plane. When they detect prey, phase spiders draw close and then shift or "phase" to the Material Plane to attack. They shift between planes of existence and attack from unexpected directions until they overcome their prey or are forced to retreat. Phase spiders are more intelligent than mundane spiders, but most are cowards. They usually flee if they're outnumbered by creatures capable of seeing them on the Ethereal Plane or pursuing them there. They make exceptions for ghosts and similar spirits, which phase spiders gain sustenance from and pursue as favored prey. Some sages say you unknowingly occupy the same ethereally coterminous point as a phase spider an average of four times each year.
  - Ethereal Sight: The spider can see 60 feet into the Ethereal Plane while on the Material Plane and vice versa.
  - Spider Climb: The spider can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - Web Walker: The spider ignores movement restrictions caused by webs, and the spider knows the location of any other creature in contact with the same web.
  - Multiattack: The spider makes two Bite attacks.
  - Bite: m 5, reach 5 ft. {@h}8 (1d10 + 3) Piercing damage plus 9 (2d8) Poison damage. If this damage reduces the target to 0 Hit Points, the target becomes Stable, and it has the Poisoned condition for 1 hour. While Poisoned, the target also has the Paralyzed condition.
  - Ethereal Jaunt: The spider teleports from the Material Plane to the Ethereal Plane or vice versa.

### [quaggoth-thonot] Quaggoth Thonot — desafío 3, Mediano Monstruosidad
  - Bloodied Fury: While Bloodied, the quaggoth has Advantage on attack rolls.
  - Multiattack: The quaggoth makes two Claw attacks.
  - Claw: m 5, reach 5 ft. {@h}6 (1d6 + 3) Slashing damage plus 5 (2d4) Psychic damage.
  - Spellcasting (conjuros): The quaggoth casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability (spell save 12): Mage Hand (the hand is Invisible) Minor Illusion Mind Spike
  - Psionic Defense (3/Day) (conjuros): The quaggoth casts Feather Fall or Shield in response to the spell's trigger, requiring no spell components and using the same spellcasting ability as Spellcasting. Feather Fall Shield

### [scout-captain] Scout Captain — desafío 3, Pequeño o Mediano Humanoide
  - Multiattack: The scout makes two attacks, using Shortsword or Longbow in any combination.
  - Shortsword: m 5, reach 5 ft. {@h}6 (1d6 + 3) Piercing damage, plus 10 (3d6) Piercing damage if the attack was made with Advantage.
  - Longbow: r 5, range 150/600 ft. {@h}7 (1d8 + 3) Piercing damage, plus 10 (3d6) Piercing damage if the attack was made with Advantage.
  - Aim: The scout has Advantage on the next attack roll it makes during the current turn.
  - Uncanny Dodge: {@actTrigger} The scout is hit by an attack roll. {@actResponse} The scout halves the damage (round down) it takes from that attack.

### [spectator] Spectator — desafío 3, Mediano Aberración
Descripción oficial: [Spectator] Magic-Bound Beholder-Kin [Habitat:] Underdark [Treasure:] Any Invoking mysterious rites involving four beholder eyestalks, a spellcaster can mold aberrant dreams into a beholder-like guardian. Called a spectator, the being summoned by such a ritual resembles a beholder with five magical eyes—a central eye and four on stalks arrayed around the crown of the creature's spherical body. A spectator serves its conjurer for 101 years by guarding something of the spellcaster's choice—typically a treasure or location. The spectator is a reliable guardian and allows only its summoner access to what it protects. A spectator might converse with other creatures, openly discussing its orders and the magic-user who conjured it, but it has no ambitions of its own and won't abandon its post. Should an intruder ignore its warnings, a spectator attempts to drive away the intruder with its magical eye rays. At the end of its service, a spectator might discorporate back into nothingness or wander away, seeking to learn more of the multiverse.
  - Multiattack: The spectator uses Eye Rays twice.
  - Bite: m 4, reach 5 ft. {@h}5 (1d6 + 2) Piercing damage.
  - Eye Rays: The spectator randomly shoots one of the following magical rays at a target it can see within 90 feet of itself (roll 1d4; reroll if the spectator has already used that ray during this turn): [1: Confusion Ray] wis 12. {@actSaveFail} 5 (2d4) Psychic damage, and the target can't take Reactions until the end of its next turn. On its next turn, the target can't move, and it uses its action to make a melee or ranged attack against a randomly determined creature within range. If the target can't attack, it does nothing on that turn. [2: Paralyzing Ray] con 12. {@actSaveFail} The target has the Paralyzed condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. [3: Fear Ray] wis 12. {@actSaveFail} 5 (2d4) Psychic damage, and the target has the Frightened condition until the end of its next turn. [4: Wounding Ray] con 12. {@actSaveFail} 16 (3d10) Necrotic damage. {@actSaveSuccess} Half damage.
  - Spell Reflection: {@actTrigger} The spectator succeeds on a saving throw against a spell, or a spell's attack roll misses it. ddex 12, one creature the spectator can see within 120 feet. {@actSaveFail} 10 (3d6) Force damage.

### [swarm-of-crawling-claws] Swarm of Crawling Claws — desafío 3, Mediano Muerto viviente
  - Swarm: The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.
  - Swarm of Grasping Hands: m 4, reach 5 ft. {@h}20 (4d8 + 2) Necrotic damage, or 11 (2d8 + 2) Necrotic damage if the swarm is Bloodied. If the target is a Medium or smaller creature, it has the Prone condition.

### [swarm-of-lemures] Swarm of Lemures — desafío 3, Grande Infernal
  - Hellish Restoration: If the swarm dies in the Nine Hells, it revives with all its Hit Points in 1d10 days unless it is killed by a creature under the effects of a Bless spell or its remains are sprinkled with Holy Water.
  - Swarm: The swarm can occupy another creature's space and vice versa, and the swarm can move through an opening large enough for a Medium creature. The swarm can't regain Hit Points or gain Temporary Hit Points.
  - Multiattack: The swarm makes two Vile Slime attacks.
  - Vile Slime: m 4, reach 5 ft. {@h}11 (2d8 + 2) Poison damage, or 9 (2d6 + 2) Poison damage if the swarm is Bloodied.

### [vampire-familiar] Vampire Familiar — desafío 3, Pequeño o Mediano Humanoide
  - Vampiric Connection: While the familiar and its vampire master are on the same plane of existence, the vampire can communicate with the familiar telepathically, and the vampire can perceive through the familiar's senses.
  - Multiattack: The familiar makes two Umbral Dagger attacks.
  - Umbral Dagger: m,r 5, reach 5 ft. or range 20/60 ft. {@h}5 (1d4 + 3) Piercing damage plus 7 (3d4) Necrotic damage. If the target is reduced to 0 Hit Points by this attack, the target becomes Stable but has the Poisoned condition for 1 hour. While it has the Poisoned condition, the target has the Paralyzed condition.
  - Deathless Agility: The familiar takes the Dash or Disengage action.

### [warrior-veteran] Warrior Veteran — desafío 3, Pequeño o Mediano Humanoide
  - Multiattack: The warrior makes two Greatsword or Heavy Crossbow attacks.
  - Greatsword: m 5, reach 5 ft. {@h}10 (2d6 + 3) Slashing damage.
  - Heavy Crossbow: r 3, range 100/400 ft. {@h}12 (2d10 + 1) Piercing damage.
  - Parry: {@actTrigger} The warrior is hit by a melee attack roll while holding a weapon. {@actResponse} The warrior adds 2 to its AC against that attack, possibly causing it to miss.

### [water-weird] Water Weird — desafío 3, Grande Elemental
Descripción oficial: [Water Weird] Servant of Primeval Magic [Habitat:] Underdark, Urban [Treasure:] Any Serpentine nature spirits, water weirds protect pools, fountains, and magical bodies of water. In the water, these creatures are indistinguishable from the liquid surrounding them. Should their aquatic territory be disturbed, they rise as animate water spouts with vague snake- or dragon-like features. Often their appearance is enough to drive off foes, but if forced to fight, water weirds crush enemies within their fluid coils. Water weirds might protect a site for generations and learn much about their surroundings. Some gain reputations as oracles and might respond to questions posed to them in Primordial. Since water weirds don't speak, they often communicate using spouts of water or objects submerged in their pools. Rule 2: Before you drink from a fountain or pool, toss a copper coin into it. It's a small price to pay for your life!
  - Invisible in Water: The water weird has the Invisible condition while fully immersed in water.
  - Water Bound: The water weird dies if it leaves the water to which it is bound or if that water is destroyed.
  - Surge: m 5, reach 10 ft. {@h}13 (3d6 + 3) Cold damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape 13), and it has the Restrained condition until the grapple ends.

### [werewolf] Werewolf — desafío 3, Pequeño o Mediano Monstruosidad
Descripción oficial: [Werewolf] Changed by the Ferocity of the Wolf [Habitat:] Forest, Hill [Treasure:] Any Werewolves change from their humanoid forms into fierce wolves or wolf-humanoid hybrids. Werewolves can shape-shift voluntarily, but many can't resist transforming during the nights of a full moon.
  - Pack Tactics: The werewolf has Advantage on an attack roll against a creature if at least one of the werewolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - Multiattack: The werewolf makes two attacks, using Scratch or Longbow in any combination. It can replace one attack with a Bite attack.
  - Bite (Wolf or Hybrid Form Only): m 5, reach 5 ft. {@h}12 (2d8 + 3) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. con 12. {@actSaveFail} The target is cursed. If the cursed target drops to 0 Hit Points, it instead becomes a Werewolf under the DM's control and has 10 Hit Points. {@actSaveSuccess} The target is immune to this werewolf's curse for 24 hours.
  - Scratch: m 5, reach 5 ft. {@h}10 (2d6 + 3) Slashing damage.
  - Longbow (Humanoid or Hybrid Form Only): r 4, range 150/600 ft. {@h}11 (2d8 + 2) Piercing damage.
  - Shape-Shift: The werewolf shape-shifts into a Large wolf-humanoid hybrid or a Medium wolf, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.

### [wight] Wight — desafío 3, Mediano Muerto viviente
Descripción oficial: [Wight] Life-Leeching Corpse Warrior [Habitat:] Desert, Planar (Shadowfell), Swamp, Underdark, Urban [Treasure:] Armaments Wights are the withered corpses of relentless warriors whose wickedness sustains them beyond death. Unlike mere zombies, they retain the memories and evil agendas they harbored in life. After dying and returning from the grave, a wight continues its villainous ways, but it is now driven by a hunger for life. A wight drains living essence through its attacks. Humanoids slain by a wight's life-sapping grip reanimate a day later and serve the wight as obedient zombies. Wights might return from the dead for a multitude of sinister reasons. Roll on or choose a result from the Wight Motives table to inspire why a wight plagues the living. Wight Motives / 1 | Challenge anyone who passes near its grave on a certain cursed night. / 2 | Conquer the land it believes it should rule. / 3 | Continue the crimes it was executed for. / 4 | Follow the foul master it served in life. / 5 | Honor an oath it left unfulfilled in life. / 6 | Obey the cult or deity that gave it unlife. / 7 | Prove it was the greatest warrior to ever live. / 8 | Seek its stolen heart or other treasure.
  - Sunlight Sensitivity: While in sunlight, the wight has Disadvantage on ability checks and attack rolls.
  - Multiattack: The wight makes two attacks, using Necrotic Sword or Necrotic Bow in any combination. It can replace one attack with a use of Life Drain.
  - Necrotic Sword: m 4, reach 5 ft. {@h}6 (1d8 + 2) Slashing damage plus 4 (1d8) Necrotic damage.
  - Necrotic Bow: r 4, range 150/600 ft. {@h}6 (1d8 + 2) Piercing damage plus 4 (1d8) Necrotic damage.
  - Life Drain: con 13, one creature within 5 feet. {@actSaveFail} 6 (1d8 + 2) Necrotic damage, and the target's Hit Point maximum decreases by an amount equal to the damage taken. A Humanoid slain by this attack rises 24 hours later as a Zombie under the wight's control, unless the Humanoid is restored to life or its body is destroyed. The wight can have no more than twelve zombies under its control at a time.

### [winter-wolf] Winter Wolf — desafío 3, Grande Monstruosidad
Descripción oficial: [Winter Wolf] Cold-hearted Pack Hunter [Habitat:] Arctic [Treasure:] None Winter wolves are horse-size, supernatural predators that prowl frigid wildernesses in deadly packs. With their great size and chilling breath, winter wolves pursue megafauna, arctic travelers, and any other creatures they catch on the tundra. Winter wolves are more intelligent than natural wolves and can speak. Most are predominantly concerned with their next meal, and while they might converse with other creatures in exchange for food, few concern themselves with long-term bargains or keeping their word unless they have something to gain. Winter wolves often hunt alongside frost giants that indulge them with frequent hunts and reliable meals. Snowdrifts, driving hail, and wind fierce enough to strip the hairless skin off your bones—you lot have been through it all. But good news, there's a town full of warm hearths right over this rise. You'll never reach it, but at least your last thoughts will be warm.
  - Pack Tactics: The wolf has Advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - Bite: m 6, reach 5 ft. {@h}11 (2d6 + 4) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.
  - Cold Breath (Recarga 5–6): con 12, each creature in a 15-foot Cone. {@actSaveFail} 18 (4d8) Cold damage. {@actSaveSuccess} Half damage.

### [yeti] Yeti — desafío 3, Grande Monstruosidad
  - Fear of Fire: If the yeti takes Fire damage, it has Disadvantage on attack rolls and ability checks until the end of its next turn.
  - Multiattack: The yeti can use its Chilling Gaze and makes two attacks, using Claw or Ice Throw in any combination.
  - Claw: m 6, reach 5 ft. {@h}7 (1d6 + 4) Slashing damage plus 3 (1d6) Cold damage.
  - Ice Throw: r 6, range 30/120 ft. {@h}6 (1d4 + 4) Bludgeoning damage plus 2 (1d4) Cold damage.
  - Chilling Gaze: con 13, one creature the yeti can see within 30 feet. {@actSaveFail} 5 (2d4) Cold damage, and the target has the Paralyzed condition until the start of the yeti's next turn unless the target has Immunity to Cold damage. {@actSaveSuccess} The target is immune to the Chilling Gaze of all yetis (but not abominable yetis) for 1 hour.

### [yuan-ti-malison-type-1] Yuan-ti Malison (Type 1) — desafío 3, Mediano Monstruosidad
  - Magic Resistance: The yuan-ti has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The yuan-ti makes two attacks, using Bite or Poison Ray in any combination, and it can use Spellcasting to cast Suggestion if available.
  - Bite: m 5, reach 5 ft. {@h}5 (1d4 + 3) Piercing damage plus 7 (2d6) Poison damage.
  - Poison Ray (Yuan-ti Form Only): r 5, range 120 ft. {@h}12 (2d8 + 3) Poison damage.
  - Shape-Shift: The yuan-ti shape-shifts into a Medium snake or returns to its true form. If it dies, it stays in its current form. The yuan-ti's game statistics are the same in each form, except where noted. Any equipment it is wearing or carrying isn't transformed.
  - Spellcasting (Yuan-ti Form Only) (conjuros): The yuan-ti casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save 13): Animal Friendship (snakes only) Suggestion

### [yuan-ti-malison-type-2] Yuan-ti Malison (Type 2) — desafío 3, Mediano Monstruosidad
  - Magic Resistance: The yuan-ti has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The yuan-ti makes two Bite attacks, and it can use Spellcasting to cast Suggestion if available.
  - Bite: m 5, reach 10 ft. {@h}7 (1d8 + 3) Piercing damage plus 7 (2d6) Poison damage.
  - Shape-Shift: The yuan-ti shape-shifts into a Medium snake or returns to its true form. If it dies, it stays in its current form. The yuan-ti's game statistics are the same in each form, except where noted. Any equipment it is wearing or carrying isn't transformed.
  - Spellcasting (Yuan-ti Form Only) (conjuros): The yuan-ti casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save 13): Animal Friendship (snakes only) Suggestion

### [yuan-ti-malison-type-3] Yuan-ti Malison (Type 3) — desafío 3, Mediano Monstruosidad
  - Magic Resistance: The yuan-ti has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The yuan-ti makes two Poison Burst attacks, and it can use Spellcasting to cast Suggestion if available.
  - Poison Burst (Yuan-ti Form Only): m,r 5, reach 5 ft. or range 120 ft. {@h}12 (2d8 + 3) Poison damage.
  - Constrict: str 13, one Medium or smaller creature within 5 feet. {@actSaveFail} 21 (4d8 + 3) Bludgeoning damage. The target has the Grappled condition (escape 13), and it has the Restrained condition until the grapple ends.
  - Shape-Shift: The yuan-ti shape-shifts into a Medium snake or returns to its true form. If it dies, it stays in its current form. The yuan-ti's game statistics are the same in each form, except where noted. Any equipment it is wearing or carrying isn't transformed.
  - Spellcasting (Yuan-ti Form Only) (conjuros): The yuan-ti casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save 13): Animal Friendship (snakes only) Suggestion

### [aarakocra-aeromancer] Aarakocra Aeromancer — desafío 4, Mediano Elemental
  - Multiattack: The aarakocra makes two Wind Staff attacks, and it can use Spellcasting to cast Gust of Wind.
  - Wind Staff: m,r 5, reach 5 ft. or range 120 ft. {@h}7 (1d8 + 3) Bludgeoning damage plus 11 (2d10) Lightning damage.
  - Spellcasting (conjuros): The aarakocra casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save 13): Elementalism Gust of Wind Mage Hand Message Lightning Bolt
  - Feather Fall (1/Day) (conjuros): The aarakocra casts Feather Fall in response to that spell's trigger, using the same spellcasting ability as Spellcasting. Feather Fall

### [archelon] Archelon — desafío 4, Enorme Bestia
  - Amphibious: The archelon can breathe air and water.
  - Multiattack: The archelon makes two Bite attacks.
  - Bite: m 6, reach 5 ft. {@h}14 (3d6 + 4) Piercing damage.

### [banshee] Banshee — desafío 4, Mediano Muerto viviente
Descripción oficial: [Banshee] Wailing Harbinger of Death [Habitat:] Any [Treasure:] Relics Heralds of doom and plagues on the living, banshees are spirits obsessed by unresolved bitterness or sorrow. These storied phantoms slay any who glimpse them or hear their baleful wails. Although any tormented soul can arise as a banshee, some elven communities particularly fear them and believe that those who hoard or destroy beauty—natural or otherwise—risk returning as a banshee. All manner of torments might give rise to a banshee. Roll on or choose a result from the Banshee Sorrows table to inspire how a banshee's torment influences its behavior. Banshee Sorrows / 1 | Appear prior to a family member's death. / 2 | Haunt the site where it was executed. / 3 | Lament a lost love and haunt their grave. / 4 | Presage a disaster or tragedy. / 5 | Seek the return of a stolen treasure. / 6 | Slay those more beautiful than it was in life.
  - Detect Life: The banshee magically senses the direction of creatures up to 1 mile away that aren't Constructs or Undead.
  - Incorporeal Movement: The banshee can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.
  - Multiattack: The banshee makes two Corrupting Touch attacks and uses Horrify.
  - Corrupting Touch: m 5, reach 5 ft. {@h}7 (1d8 + 3) Necrotic damage.
  - Horrify: wis 13, one creature the banshee can see within 60 feet that can see the banshee. {@actSaveFail} The target has the Frightened condition until the start of the banshee's next turn. {@actSaveSuccess} The target is immune to this banshee's Horrify for 24 hours.
  - Deathly Wail (1/Day): The banshee releases a mournful wail if it isn't in sunlight. con 13, each creature within 30 feet that can hear the wail and isn't a Construct or an Undead. {@actSaveFail} If the target has 25 Hit Points or fewer, it drops to 0 Hit Points. Otherwise, the target takes 10 (3d6) Psychic damage.

### [black-pudding] Black Pudding — desafío 4, Grande Cieno
Descripción oficial: [Black Pudding] Divisible, Corrosive Blob [Habitat:] Underdark [Treasure:] None Black puddings are shapeless masses of predatory cells. Once a pudding detects organic matter, it oozes toward its prey, dissolving living matter and various objects. If a black pudding is split by lightning or slashing attacks, it divides into two smaller, independent puddings. Various supernatural conditions might bring black puddings into being. Roll on or choose a result from the Black Pudding Sources table to inspire a pudding's origins. Black Pudding Sources / 1 | An ancient black dragon's acidic saliva. / 2 | The blood or extreme emotions of a foul deity. / 3 | Cosmic entropy or ruinous planar forces. / 4 | A curse that transformed a forgotten tyrant. / 5 | Forbidden or industrialized magic. / 6 | Necrotic material animated by aimless spirits.
  - Amorphous: The pudding can move through a space as narrow as 1 inch without expending extra movement to do so.
  - Corrosive Form: A creature that hits the pudding with a melee attack roll takes 4 (1d8) Acid damage. Nonmagical ammunition is destroyed immediately after hitting the pudding and dealing any damage. Any nonmagical weapon takes a cumulative -1 penalty to attack rolls immediately after dealing damage to the pudding and coming into contact with it. The weapon is destroyed if the penalty reaches -5. The penalty can be removed by casting the Mending spell on the weapon. In 1 minute, the pudding can eat through 2 feet of nonmagical wood or metal.
  - Spider Climb: The pudding can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - Dissolving Pseudopod: m 5, reach 10 ft. {@h}17 (4d6 + 3) Acid damage. Nonmagical armor worn by the target takes a -1 penalty to the AC it offers. The armor is destroyed if the penalty reduces its AC to 10. The penalty can be removed by casting the Mending spell on the armor.
  - Split: {@actTrigger} While the pudding is Large or Medium and has 10+ Hit Points, it becomes Bloodied or is subjected to Lightning or Slashing damage. {@actResponse} The pudding splits into two new Black Puddings. Each new pudding is one size smaller than the original pudding and acts on its Initiative. The original pudding's Hit Points are divided evenly between the new puddings (round down).

### [bone-naga] Bone Naga — desafío 4, Grande Muerto viviente
Descripción oficial: [Bone Naga] Deathless Serpentine Mind Bender [Habitat:] Underdark [Treasure:] Relics Nagas are immortal but not invincible, and powerful magic can end their lives. Bone nagas are skeletal terrors raised from the remains of magically slain nagas or nagas that were killed but that hadn't yet rejuvenated. They are granted unlife through rituals practiced by cultists, yuan-ti, and morbid spirit nagas. These Undead nagas possess magical abilities similar to those they had in life, along with an eerie gaze that can beguile other creatures. Bone nagas typically obey those who resurrected them, serving their creators as tireless guards and sharing the lore they collected in life. Undeath disrupts the perfect memory bone nagas enjoyed while alive, leaving them with gaps in their memories or details scrambled into puzzle-like jumbles. In rare cases, bone nagas continue to pursue the goals they had while alive instead of serving other creatures. Most free-willed bone nagas are evil beings raised from spirit naga remains, but in unusual instances, bone nagas created from guardian nagas continue good, albeit confused, existences.
  - Multiattack: The naga makes two Bite attacks. It can replace any attack with a use of Serpentine Gaze.
  - Bite: m 5, reach 10 ft. {@h}10 (2d6 + 3) Piercing damage plus 7 (2d6) Necrotic damage.
  - Serpentine Gaze: wis 13, one creature the naga can see within 60 feet. {@actSaveFail} 13 (3d6 + 3) Psychic damage, and the target has the Charmed condition until the start of the naga's next turn.
  - Spellcasting (conjuros): The naga casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save 13): Mage Hand Thaumaturgy Command Detect Thoughts Lightning Bolt

### [bullywug-bog-sage] Bullywug Bog Sage — desafío 4, Mediano Feérico
  - Amphibious: The bullywug can breathe air and water.
  - Speak with Frogs and Toads: The bullywug can communicate simple concepts to frogs and toads when it speaks in Bullywug.
  - Multiattack: The bullywug makes two Bog Staff attacks. It can replace any attack with a use of Spellcasting to cast Ray of Sickness.
  - Bog Staff: m 5, reach 5 ft. {@h}7 (1d8 + 3) Bludgeoning damage plus 10 (3d6) Poison damage.
  - Leap: The bullywug can jump up to 30 feet by spending 10 feet of movement.
  - Spellcasting (conjuros): The bullywug casts one of the following spells, using Wisdom as the spellcasting ability (spell save 13, 5 to hit with spell attacks): Dancing Lights Druidcraft Ray of Sickness Speak with Plants Vitriolic Sphere

### [chuul] Chuul — desafío 4, Grande Aberración
Descripción oficial: [Chuul] Chitinous Servant of Primeval Powers [Habitat:] Coastal, Swamp, Underdark [Treasure:] Relics Chuuls originated in forgotten ages when aboleths and stranger beings ruled alien empires beneath the waves. The aboleths transformed numerous deep-sea predators into servants that could venture beyond the seas to claim more magic and creatures to exploit. Chuuls are the most enduring of these bizarre servants. Many chuuls serve aboleth overlords, carrying out their whims amid lightless seas and primeval swamps. Other chuuls obey new aberrant masters, such as beholders, grells, or mind flayers. Some chuuls follow their own drives, endlessly collecting ancient magic treasures or interpreting age-old orders to bizarre ends. Regardless of their agendas, chuuls snare creatures in their massive pincers before rendering foes helpless with their paralytic tentacles. Chuuls don't age and can lie dormant in hidden places for millennia before threats, ancient orders, or strange compulsions awaken them.
  - Amphibious: The chuul can breathe air and water.
  - Sense Magic: The chuul senses magic within 120 feet of itself. This trait otherwise works like the Detect Magic spell but isn't itself magical.
  - Multiattack: The chuul makes two Pincer attacks and uses Paralyzing Tentacles.
  - Pincer: m 6, reach 10 ft. {@h}9 (1d10 + 4) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape 14) from one of two pincers.
  - Paralyzing Tentacles: con 13, one creature Grappled by the chuul. {@actSaveFail} The target has the Poisoned condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. While Poisoned, the target has the Paralyzed condition.

### [couatl] Couatl — desafío 4, Mediano Celestial
Descripción oficial: [Couatl] Guardian Manifestation of the Divine [Habitat:] Desert, Forest, Grassland, Urban [Treasure:] Relics Embodiments of prophecy and protectors of divine secrets, couatls ensure fate unfolds as it should. They resemble serpents with rainbow wings, and each is a manifestation of a divine edict, a truth or fate that a righteous god decrees must hold true for all time. Most couatls appear in places of ancient power, where they guard hidden magic or ensure foretold acts do or don't come to pass. Rarely, couatls watch over communities or travel lands in disguise, interpreting omens or manipulating factors to set fate on its proper course. Motivated by eternal mandates, couatls sometimes behave in inscrutable or antagonistic ways. They are inflexible and uncompromising, as their existences are fundamentally tied to their divine directives, but they harm other creatures only when absolutely necessary to achieve divine goals. Each couatl goes through a period of renewal at the end of an age. In a couatl's lifecycle, an age might correspond to a celestial calendar or some divine chronology. Near the age's end, the couatl lays a wondrous, rainbow-hued egg. When the age ends, the couatl dies. For a period—perhaps a single day, perhaps until an annual solar event—the couatl's work is unattended. Once this time passes, the same couatl that laid the egg hatches from it, fully grown and renewed to serve for another age.
  - Shielded Mind: The couatl's thoughts can't be read by any means, and other creatures can communicate with it telepathically only if it allows them.
  - Bite: m 7, reach 5 ft. {@h}11 (1d12 + 5) Piercing damage, and the target has the Poisoned condition until the end of the couatl's next turn.
  - Constrict: str 15, one Medium or smaller creature the couatl can see within 5 feet. {@actSaveFail} 8 (1d6 + 5) Bludgeoning damage. The target has the Grappled condition (escape 13), and it has the Restrained condition until the grapple ends.
  - Spellcasting (conjuros): The couatl casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability (spell save 15): Detect Evil and Good Detect Magic Detect Thoughts Shapechange (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell) Create Food and Water Dream Greater Restoration Scrying Sleep
  - Divine Aid (2/Day) (conjuros): The couatl casts Bless, Lesser Restoration, or Sanctuary, requiring no spell components and using the same spellcasting ability as Spellcasting. Bless Lesser Restoration Sanctuary

### [elephant] Elephant — desafío 4, Enorme Bestia
  - Multiattack: The elephant makes two Gore attacks.
  - Gore: m 8, reach 5 ft. {@h}15 (2d8 + 6) Piercing damage. If the target is a Huge or smaller creature and the elephant moved 20+ feet straight toward it immediately before the hit, the target has the Prone condition.
  - Trample: dex 16, one creature within 5 feet that has the Prone condition. {@actSaveFail} 17 (2d10 + 6) Bludgeoning damage. {@actSaveSuccess} Half damage.

### [ettin] Ettin — desafío 4, Grande Gigante
Descripción oficial: [Ettin] Quarrelsome Two-Headed Giant [Habitat:] Hill, Mountain, Underdark [Treasure:] Individual Ettins are physically powerful Giants with two heads. While many ettins have features similar to hill giants, others have more bestial or unusual traits, such as tusks, short horns, or a single eye on each head. Ettins frequently ally with other Giants or groups that value their strength, such as hill giants, bandits, or ogres. Some ettins possess mystical ties to the lands they inhabit, and they might know or guard secrets valued by druids or Fey. Each ettin head has a distinct personality. While this makes some ettins quarrelsome with themselves and others, many function as a team. An ettin head might have its own name, or both heads might refer to themselves as a single being—either with one name or a portmanteau of two. Roll on or choose a result from the Ettin Interactions table to inspire how an ettin's heads are interacting when the creature is encountered. Ettin Interactions / 1 | Amping up one another in preparation for a conflict or challenge. / 2 | Arguing over plans for battle, dinner, or how to spend the day. / 3 | Criticizing one another as they perform separate tasks. / 4 | Engaged in a staring contest. / 5 | Making polite small talk as if they were meeting for the first time. / 6 | Performatively ignoring one another. / 7 | Talking over an increasingly convoluted plot. / 8 | Trying to keep one another awake. Twice the malice, aggressiveness, and appetite—the ettin demonstrates that two heads aren't necessarily better than one.
  - Multiattack: The ettin makes one Battleaxe attack and one Morningstar attack.
  - Battleaxe: m 7, reach 5 ft. {@h}14 (2d8 + 5) Slashing damage. If the target is a Large or smaller creature, it has the Prone condition.
  - Morningstar: m 7, reach 5 ft. {@h}14 (2d8 + 5) Piercing damage, and the target has Disadvantage on the next attack roll it makes before the end of its next turn.

### [flameskull] Flameskull — desafío 4, Diminuto Muerto viviente
Descripción oficial: [Flameskull] Skull Smoldering with Magical Obsession [Habitat:] Underdark [Treasure:] Arcana Flameskulls are flying skulls that blaze with magical fire and the half-remembered arcana of dead spellcasters. They rise from the remains of dead magic-users who were reanimated by sinister necromancers or whose magical pursuits drive them beyond death. Flameskulls might serve as guardians for their creators or pursue ambitions left unfulfilled in life. They lash out at foes with destructive spells and bursts of fire, wielding magic without the need for most components. Flameskulls take various forms, from skulls with humanlike features to ones with fearsome or bestial alterations. Their flames vary in color and grow more intense when they're angry. Roll on or choose a result from the Flameskull Details table to inspire what makes a flameskull distinctive. Flameskull Details / 1 | Arcane diagrams etched into it. / 2 | Flames like dramatic features, horns, or hair. / 3 | Fractured pieces that fly in unison. / 4 | An iron plate bolted over its mouth. / 5 | Lethal head trauma. / 6 | Mismatched animal teeth. I never cared for warmth. I never needed a body. My will is enough, and my work will be the legacy that makes my every sacrifice worthwhile!
  - Illumination: The flameskull sheds Bright Light in a 15-foot radius and Dim Light for an additional 15 feet.
  - Magic Resistance: The flameskull has Advantage on saving throws against spells and other magical effects.
  - Undead Restoration: If the flameskull is destroyed, it regains all its Hit Points in 1 hour unless Holy Water is sprinkled on its remains or the Dispel Evil and Good spell is cast on them.
  - Multiattack: The flameskull makes two Fire Ray attacks.
  - Fire Ray: m,r 5, reach 5 ft. or range 60 ft. {@h}13 (3d6 + 3) Fire damage.
  - Spellcasting (conjuros): The flameskull casts one of the following spells, requiring no Somatic or Material components and using Intelligence as the spellcasting ability (spell save 13): Mage Hand Fireball Magic Missile (level 2 version)

### [ghost] Ghost — desafío 4, Mediano Muerto viviente
Descripción oficial: [Ghost] Lost Soul and Unquiet Spirit [Habitat:] Underdark, Urban [Treasure:] Any Ghosts arise when living creatures die in a state of extreme emotion or having left an important task undone. These incorporeal spirits haunt locations that are meaningful to them, lingering until their business is complete or they're put to rest. Ghosts typically appear as semitransparent versions of the creatures they were in life, though some bear evidence of the wounds that killed them or have nightmarish distortions to their forms. Many have extreme reactions to actions, objects, or individuals that remind them of emotionally charged aspects of their lives. Particularly desperate or vengeful ghosts might possess the living to fulfill their ends.
  - Ethereal Sight: The ghost can see 60 feet into the Ethereal Plane when it is on the Material Plane.
  - Incorporeal Movement: The ghost can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.
  - Multiattack: The ghost makes two Withering Touch attacks.
  - Withering Touch: m 5, reach 5 ft. {@h}19 (3d10 + 3) Necrotic damage.
  - Horrific Visage: wis 13, each creature in a 60-foot Cone that can see the ghost and isn't an Undead. {@actSaveFail} 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the ghost's next turn. {@actSaveSuccess} The target is immune to this ghost's Horrific Visage for 24 hours.
  - Possession (Recarga 6): cha 13, one Humanoid the ghost can see within 5 feet. {@actSaveFail} The target is possessed by the ghost; the ghost disappears, and the target has the Incapacitated condition and loses control of its body. The ghost now controls the body, but the target retains awareness. The ghost can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The ghost's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers. The possession lasts until the body drops to 0 Hit Points or the ghost leaves as a Bonus Action. When the possession ends, the ghost appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. {@actSaveSuccess} The target is immune to this ghost's Possession for 24 hours.
  - Etherealness (conjuros): The ghost casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The ghost is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane. Etherealness

### [gnoll-fang-of-yeenoghu] Gnoll Fang of Yeenoghu — desafío 4, Mediano Infernal
  - Multiattack: The gnoll makes one Bite attack and two Bone Flail attacks.
  - Bite: m 5, reach 5 ft. {@h}6 (1d6 + 3) Piercing damage plus 7 (2d6) Poison damage, and the target has the Poisoned condition until the start of the gnoll's next turn.
  - Bone Flail: m 5, reach 10 ft. {@h}7 (1d8 + 3) Piercing damage.
  - Rampage (2/Day): Immediately after dealing damage to a creature that is already Bloodied, the gnoll moves up to half its Speed, and it makes one Bite attack.

### [guard-captain] Guard Captain — desafío 4, Pequeño o Mediano Humanoide
  - Multiattack: The guard makes two attacks, using Javelin or Longsword in any combination.
  - Javelin: m,r 6, reach 5 ft. or range 30/120 ft. {@h}14 (3d6 + 4) Piercing damage.
  - Longsword: m 6, reach 5 ft. {@h}15 (2d10 + 4) Slashing damage.

### [helmed-horror] Helmed Horror — desafío 4, Mediano Constructo
Descripción oficial: [Helmed Horror] Armor with a Warrior's Purpose [Habitat:] Any [Treasure:] Armaments Helmed horrors are suits of armor animated by magic. Rather than being unreasoning automatons, these armored shells possess the guile of soldiers and resilience against destructive magic. While their name suggests sinister intentions, these creatures serve their creators loyally. Helmed horrors are also sometimes called doom guards or spirit armors. Most show no evidence of a personality, but exceptions exist. Helmed horrors might perform any number of assignments. Roll on or choose a result from the Helmed Horror Directives table to inspire what tasks helmed horrors perform. Helmed Horror Directives / 1 | Carry its master's palanquin through the air. / 2 | Defend a remarkable treasure or piece of armor by incorporating the item into its being. / 3 | Imitate a dead or imprisoned hero by using their armor and weapons. / 4 | Perform as a laborer or servant. / 5 | Serve in a legion formed from the armors of a land's ancient defenders. / 6 | Stand sentry in a gallery of mundane armors.
  - Magic Resistance: The helmed horror has Advantage on saving throws against spells and other magical effects.
  - Spell Immunity: The helmed horror is immune to three spells chosen by its creator. Typical choices include Heat Metal, Lightning Bolt, and Magic Missile.
  - Multiattack: The helmed horror makes two Arcane Sword attacks.
  - Arcane Sword: m 6, reach 5 ft. {@h}8 (1d8 + 4) Slashing damage plus 5 (1d10) Force damage.

### [hippopotamus] Hippopotamus — desafío 4, Grande Bestia
  - Hold Breath: The hippopotamus can hold its breath for 10 minutes.
  - Multiattack: The hippopotamus makes two Bite attacks.
  - Bite: m 7, reach 5 ft. {@h}16 (2d10 + 5) Piercing damage.

### [incubus] Incubus — desafío 4, Mediano Infernal
Descripción oficial: [Incubus] Life-Leeching Dream Stalker [Habitat:] Planar (Lower Planes) [Treasure:] Any Incubi exploit the vulnerability of mortal dreams. Slipping into the homes of sleepers, incubi feed off dreams and replace them with terrifying nightmares. Incubi visit victims nightly until their prey expires. The incubi then hunt for new victims, preferring the loved ones of past targets. Incubi can transform into succubi and vice versa, taking the forms they need to manipulate foes in dreams or in the flesh. Those visited by an incubus have recurring nightmares. Roll on or choose a result from the Incubus Nightmares table to inspire these night terrors. Incubus Nightmares / 1 | An angry family member or authority figure. / 2 | Being chased through the wilderness. / 3 | Being devoured by animals or monsters. / 4 | Falling, drowning, or suffocating. / 5 | A ruinous public embarrassment. / 6 | A shadowy intruder or monstrous silhouette. / 7 | A traumatic past event. / 8 | A visitor with an eerie or enigmatic message.
  - Succubus Form: When the incubus finishes a Long Rest, it can shape-shift into a Succubus, using that stat block instead of this one. Any equipment it's wearing or carrying isn't transformed.
  - Multiattack: The incubus makes two Restless Touch attacks.
  - Restless Touch: m 7, reach 5 ft. {@h}15 (3d6 + 5) Psychic damage, and the target is cursed for 24 hours or until the incubus dies. Until the curse ends, the target gains no benefit from finishing Short Rests.
  - Nightmare (Recarga 6): wis 15, one creature the incubus can see within 60 feet. {@actSaveFail} If the target has 20 Hit Points or fewer, it has the Unconscious condition for 1 hour, until it takes damage, or until a creature within 5 feet of it takes an action to wake it. Otherwise, the target takes 18 (4d8) Psychic damage.
  - Spellcasting (conjuros): The incubus casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 15): Disguise Self Etherealness Dream Hypnotic Pattern

### [juvenile-shadow-dragon] Juvenile Shadow Dragon — desafío 4, Mediano Dragón
  - Living Shadow: While in Dim Light or Darkness, the dragon has Resistance to damage that isn't Force, Psychic, or Radiant.
  - Sunlight Sensitivity: While in sunlight, the dragon has Disadvantage on ability checks and attack rolls.
  - Multiattack: The dragon makes two Rend attacks.
  - Rend: m 5, reach 10 ft. {@h}7 (1d8 + 3) Slashing damage plus 3 (1d6) Necrotic damage.
  - Shadow Breath (Recarga 5–6): dex 13, each creature in a 30-foot Cone. {@actSaveFail} 17 (5d6) Necrotic damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} A Humanoid reduced to 0 Hit Points by this damage dies, and a Shadow rises from its corpse. The shadow is under the dragon's control and shares the dragon's Initiative count but acts immediately after the dragon.
  - Shadow Stealth: While in Dim Light or Darkness, the dragon takes the Hide action.

### [lamia] Lamia — desafío 4, Grande Infernal
Descripción oficial: [Lamia] Accursed Bargainer and Ruin Raider [Habitat:] Desert [Treasure:] Arcana Legends say the first lamia was an ambitious ruler who made a sinister bargain with the demon lord Graz'zt for everlasting majesty. As a consequence, the ruler was transformed into a lamia, a monster with the body of a lion and an accursed touch. Lamias either are descendants of that first lamia or have made similar deals. They often dwell near ruins, seeking mysterious magic they can use to gain riches and influence. Lamias use magical illusions and enchantments to trick others into serving them. They sometimes work with bandits to abduct travelers, releasing captives only if they accept a dangerous bargain. Roll on or choose a result from the Lamia Pacts table to inspire a lamia's desires. Lamia Pacts / 1 | Bring it a possession from a ruler or noble. / 2 | Create a map of a dungeon or ruin. / 3 | Escort it through a nearby community's gate. / 4 | Place a strange idol in a specific site or home. / 5 | Remove a magic item's curse, then return it. / 6 | Slay a monster and retrieve a specific organ.
  - Multiattack: The lamia makes two Claw attacks. It can replace one attack with a use of Corrupting Touch.
  - Claw: m 5, reach 5 ft. {@h}7 (1d8 + 3) Slashing damage plus 7 (2d6) Psychic damage.
  - Corrupting Touch: wis 13, one creature the lamia can see within 5 feet. {@actSaveFail} 13 (3d8) Psychic damage, and the target is cursed for 1 hour. Until the curse ends, the target has the Charmed and Poisoned conditions.
  - Leap: The lamia jumps up to 30 feet by spending 10 feet of movement.
  - Spellcasting (conjuros): The lamia casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 13): Disguise Self (can appear as a Large or Medium biped) Minor Illusion Geas Major Image Scrying

### [lizardfolk-sovereign] Lizardfolk Sovereign — desafío 4, Mediano Elemental
  - Multiattack: The lizardfolk makes one Bite attack and one Earthen Maul attack.
  - Bite: m 5, reach 5 ft. {@h}8 (1d10 + 3) Piercing damage. If the target is a creature that isn't a Construct or an Undead, the lizardfolk gains Temporary Hit Points equal to the damage dealt.
  - Earthen Maul: m 5, reach 5 ft. {@h}10 (2d6 + 3) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.
  - Charge: The lizardfolk moves up to its Speed or Swim Speed straight toward an enemy it can see.

### [red-dragon-wyrmling] Red Dragon Wyrmling — desafío 4, Mediano Dragón
  - Multiattack: The dragon makes two Rend attacks.
  - Rend: m 6, reach 5 ft. {@h}9 (1d10 + 4) Slashing damage plus 3 (1d6) Fire damage.
  - Fire Breath (Recarga 5–6): dex 13, each creature in a 15-foot Cone. {@actSaveFail} 24 (7d6) Fire damage. {@actSaveSuccess} Half damage.

### [shadow-demon] Shadow Demon — desafío 4, Mediano Infernal
Descripción oficial: [Shadow Demon] Vestige of Evil [Habitat:] Planar (Abyss) [Treasure:] None Shadow demons form when exceptionally wicked demons are destroyed and prevented from reconstituting their physical forms in the Abyss. This might occur due to divine intervention, when a demon is destroyed in the Abyss, or under more unusual circumstances. Shadow demons are the incorporeal remnants of these destroyed demons' evil. They usually vaguely resemble their former shapes, but some take purposefully deceptive shapes. Many lurk in dark places or venture out only at night to hide their true forms from those they manipulate. Shadow demons seek ways to regain their former might and take revenge on those who destroyed them. They often ingratiate themselves with more powerful demons or mortal spellcasters, bargaining with and coercing others into restoring them to power. Many try to claim or corrupt souls to restore their fiendish forms, while some shadow demons seek wicked relics or nexuses of profane magic. It typically takes shadow demons centuries to recover their demonic power, if they ever do. Particularly powerful demons might return as multiple shadow demons after being defeated. These fiendish entities each think they're the true manifestation of their past self and hunt one another to recover their power. In rare cases, Fiends other than demons might adopt forms similar to shadow demons. There are three rules to endings. First, good always wins. Second, evil always returns. Third, the first rule isn't always true.
  - Demonic Restoration: If the demon dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss.
  - Incorporeal Movement: The demon can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.
  - Light Sensitivity: While in Bright Light, the demon has Disadvantage on ability checks and attack rolls.
  - Umbral Claw: m 5, reach 5 ft. {@h}16 (3d8 + 3) Psychic damage.
  - Shadow Stealth: While in Dim Light or Darkness, the demon takes the Hide action.

### [succubus] Succubus — desafío 4, Mediano Infernal
Descripción oficial: [Succubus] Life-Draining Seducer [Habitat:] Planar (Lower Planes), Urban [Treasure:] Implements Succubi prey on mortals physically and exploit their waking desires. They relish corrupting virtuous souls and the pain an individual's downfall can cause. Once their targets are at their lowest, succubi slay their victims with their essence-draining kiss. Through fiendish rites, succubi can transform into incubi to manipulate their prey in dreams as well as the waking world. They can also change shape to torment their victims. These tempters can dominate Humanoids, but they usually do so to reinforce their manipulations or defend themselves rather than controlling others outright. Roll on or choose a result from the Succubus Temptations table to inspire how a succubus toys with its victims. Succubus Temptations / 1 | Adopting the form of a lost loved one. / 2 | Charming someone close to its target. / 3 | Isolating them from their loved ones. / 4 | Manipulating events to bring surprise fortune. / 5 | Posing as a flattering underling. / 6 | Taking the form of one in need of protection.
  - Incubus Form: When the succubus finishes a Long Rest, it can shape-shift into an Incubus, using that stat block instead of this one.
  - Multiattack: The succubus makes one Fiendish Touch attack and uses Charm or Draining Kiss.
  - Fiendish Touch: m 7, reach 5 ft. {@h}16 (2d10 + 5) Psychic damage.
  - Charm: The succubus casts Dominate Person (level 8 version), requiring no spell components and using Charisma as the spellcasting ability (spell save 15).
  - Draining Kiss: con 15, one creature Charmed by the succubus within 5 feet. {@actSaveFail} 13 (3d8) Psychic damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} The target's Hit Point maximum decreases by an amount equal to the damage taken.
  - Shape-Shift: The succubus shape-shifts to resemble a Medium or Small Humanoid or back into its true form. Its game statistics are the same in each form, except its Fly Speed is available only in its true form. Any equipment it's wearing or carrying isn't transformed.

### [swarm-of-dretches] Swarm of Dretches — desafío 4, Grande Infernal
  - Fetid Aura: con 12, any creature that starts its turn in a 10-foot Emanation originating from the swarm. {@actSaveFail} The target has the Poisoned condition until the start of its next turn. While Poisoned, the target can take either an action or a Bonus Action on its turn, not both, and it can't take Reactions.
  - Swarm: The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Small creature. The swarm can't regain Hit Points or gain Temporary Hit Points.
  - Multiattack: The swarm makes two Rend attacks.
  - Rend: m 4, reach 5 ft. {@h}12 (3d6 + 2) Slashing damage, or 9 (3d4 + 2) Slashing damage if the swarm is Bloodied.

### [tough-boss] Tough Boss — desafío 4, Pequeño o Mediano Humanoide
  - Pack Tactics: The tough has Advantage on an attack roll against a creature if at least one of the tough's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - Multiattack: The tough makes two attacks, using Warhammer or Heavy Crossbow in any combination.
  - Warhammer: m 5, reach 5 ft. {@h}12 (2d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, the tough pushes the target up to 10 feet straight away from itself.
  - Heavy Crossbow: r 4, range 100/400 ft. {@h}13 (2d10 + 2) Piercing damage.
