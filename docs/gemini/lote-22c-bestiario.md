# Encargo: Lote 22c (bestiario, desafío 1/2 a 2) de la app "Mi turno"

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

### [piercer] Piercer — desafío 1/2, Mediano Aberración
Descripción oficial: [Piercer] Aberrant Counterfeit Stalactite [Habitat:] Underdark [Treasure:] Individual Piercers resemble stalactites, but each has a toothy maw and a single eye. They hang from cavern ceilings along routes frequented by denizens of the Underdark. Piercers might lurk for months at a time, waiting for any creature of their approximate size to pass underneath. When potential meals move below, piercers release their grip and plummet, intent on impaling prey in a single strike. If they're successful, piercers consume their meals and then slowly climb to a new ambush position. If they miss or fail to slay their targets, piercers attempt to squirm away, but they're easily dispatched by creatures aware of their presence. Piercers are the larval form of ropers. Young piercers seek to move as far from ropers as they can to avoid ropers' undiscerning hunger. Many piercers migrate vast distances through the Underdark, often to caverns or buried ruins near the surface. Rule 8: Never trust a stalactite
  - Spider Climb: The piercer can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - Bite: m 3, reach 5 ft. {@h}5 (1d8 + 1) Piercing damage.
  - Drop: The piercer falls. dex 11, one creature directly underneath the piercer. {@actSaveFail} 10 (3d6) Piercing damage. {@actSaveSuccessOrFail} The piercer reduces any damage it takes from the fall by 20.

### [reef-shark] Reef Shark — desafío 1/2, Mediano Bestia
  - Pack Tactics: The shark has Advantage on an attack roll against a creature if at least one of the shark's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - Water Breathing: The shark can breathe only underwater.
  - Bite: m 4, reach 5 ft. {@h}7 (2d4 + 2) Piercing damage.

### [rust-monster] Rust Monster — desafío 1/2, Mediano Monstruosidad
Descripción oficial: [Rust Monster] Corrosive, Equipment-Eating Scavenger [Habitat:] Underdark [Treasure:] None Rust monsters roam the Underdark searching for ferrous metal. When they find this material—whether natural veins, subterranean structures, or creatures' equipment—these beetle-like scavengers rush to feed. Using their feathery antennae, rust monsters dissolve metals such as iron and steel into rusted scrap. They easily gnaw through this corroded metal using their mandibles. Rust monsters usually ignore creatures without metal equipment, but they defend themselves if attacked.
  - Iron Scent: The rust monster can pinpoint the location of ferrous metal within 30 feet of itself.
  - Multiattack: The rust monster makes one Bite attack and uses Antennae twice.
  - Bite: m 3, reach 5 ft. {@h}5 (1d8 + 1) Piercing damage.
  - Antennae: The rust monster targets one nonmagical metal object—armor or a weapon—worn or carried by a creature within 5 feet of itself. dex 11, the creature with the object. {@actSaveFail} The object takes a -1 penalty to the AC it offers (armor) or to its attack rolls (weapon). Armor is destroyed if the penalty reduces its AC to 10, and a weapon is destroyed if its penalty reaches -5. The penalty can be removed by casting the Mending spell on the armor or weapon.
  - Destroy Metal: The rust monster touches a nonmagical metal object within 5 feet of itself that isn't being worn or carried. The touch destroys a 1-foot Cube of the object.
  - Reflexive Antennae: {@actTrigger} An attack roll hits the rust monster. {@actResponse} The rust monster uses Antennae.

### [sahuagin-warrior] Sahuagin Warrior — desafío 1/2, Mediano Infernal
  - Blood Frenzy: The sahuagin has Advantage on attack rolls against any creature that doesn't have all its Hit Points.
  - Limited Amphibiousness: The sahuagin can breathe air and water, but it must be submerged at least once every 4 hours to avoid suffocating outside water.
  - Shark Telepathy: The sahuagin can magically control sharks within 120 feet of itself, using a special telepathy.
  - Multiattack: The sahuagin makes two Claw attacks.
  - Claw: m 3, reach 5 ft. {@h}4 (1d6 + 1) Slashing damage.
  - Aquatic Charge: The sahuagin swims up to its Swim Speed straight toward an enemy it can see.

### [satyr] Satyr — desafío 1/2, Mediano Feérico
  - Magic Resistance: The satyr has Advantage on saving throws against spells and other magical effects.
  - Hooves: m 5, reach 5 ft. {@h}5 (1d4 + 3) Bludgeoning damage. If the target is a Medium or smaller creature, the satyr pushes the target up to 10 feet straight away from itself.
  - Mockery: wis 12, one creature the satyr can see within 90 feet. {@actSaveFail} 5 (1d6 + 2) Psychic damage.

### [scout] Scout — desafío 1/2, Pequeño o Mediano Humanoide
  - Multiattack: The scout makes two attacks, using Shortsword and Longbow in any combination.
  - Shortsword: m 4, reach 5 ft. {@h}5 (1d6 + 2) Piercing damage.
  - Longbow: r 4, range 150/600 ft. {@h}6 (1d8 + 2) Piercing damage.

### [shadow] Shadow — desafío 1/2, Mediano Muerto viviente
Descripción oficial: [Shadow] Disembodied, Life-Drinking Shade [Habitat:] Planar (Shadowfell), Underdark, Urban [Treasure:] None Shadows are incorporeal Undead that feed on life. They resent the living for possessing the potential and vitality lost to them. Shadows lurk in dark, lonely places, typically sites that were meaningful to them in life or cursed places with ties to death, sinister magic, or the Shadowfell. Their victims rise as new shadows and prey on the living. Shadows might resemble the silhouettes of who they were in life or take on more menacing forms. Roll on or choose a result from the Shadow Shapes table to inspire a shadow's form and haunting. Shadow Shapes / 1 | A distorted stalker that lurks in the woods. / 2 | A fiend that dwells near a wicked ritual site. / 3 | Grasping hands that haunt a miser's home. / 4 | A grim storybook character that follows those who speak its name. / 5 | Its target, acting in eerie pantomime. / 6 | An ominous priest that haunts a defiled site.
  - Amorphous: The shadow can move through a space as narrow as 1 inch without expending extra movement to do so.
  - Sunlight Weakness: While in sunlight, the shadow has Disadvantage on D20 Tests.
  - Draining Swipe: m 4, reach 5 ft. {@h}5 (1d6 + 2) Necrotic damage, and the target's Strength score decreases by 1d4. The target dies if this reduces that score to 0. If a Humanoid is slain by this attack, a Shadow rises from the corpse 1d4 hours later.
  - Shadow Stealth: While in Dim Light or Darkness, the shadow takes the Hide action.

### [swarm-of-insects] Swarm of Insects — desafío 1/2, Mediano Bestia
  - Spider Climb: If the swarm has a Climb Speed, the swarm can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - Swarm: The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny insect. The swarm can't regain Hit Points or gain Temporary Hit Points.
  - Bites: m 3, reach 5 ft. {@h}6 (2d4 + 1) Poison damage, or 3 (1d4 + 1) Poison damage if the swarm is Bloodied.

### [tough] Tough — desafío 1/2, Pequeño o Mediano Humanoide
  - Pack Tactics: The tough has Advantage on an attack roll against a creature if at least one of the tough's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - Mace: m 4, reach 5 ft. {@h}5 (1d6 + 2) Bludgeoning damage.
  - Heavy Crossbow: r 3, range 100/400 ft. {@h}6 (1d10 + 1) Piercing damage.

### [troll-limb] Troll Limb — desafío 1/2, Pequeño Gigante
  - Regeneration: The limb regains 5 Hit Points at the start of each of its turns. If the limb takes Acid or Fire damage, this trait doesn't function on the limb's next turn. The limb dies only if it starts its turn with 0 Hit Points and doesn't regenerate.
  - Troll Spawn: The limb uncannily has the same senses as a whole troll. If the limb isn't destroyed within 24 hours, roll 1d12. On a 12, the limb turns into a Troll. Otherwise, the limb withers away.
  - Rend: m 6, reach 5 ft. {@h}9 (2d4 + 4) Slashing damage.

### [vine-blight] Vine Blight — desafío 1/2, Mediano Planta
  - Constricting Vine: m 4, reach 10 ft. {@h}6 (1d8 + 2) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape 12). Until the grapple ends, the target takes 4 (1d8) Bludgeoning damage at the start of each of its turns, and the blight can't make Constricting Vine attacks.
  - Entangling Plants {@recharge 5} (conjuros): The blight casts the Entangle spell, using Constitution as the spellcasting ability (spell save 12).

### [warhorse] Warhorse — desafío 1/2, Grande Bestia
  - Hooves: m 6, reach 5 ft. {@h}9 (2d4 + 4) Bludgeoning damage. If the target is a Large or smaller creature and the horse moved 20+ feet straight toward it immediately before the hit, the target takes an extra 5 (2d4) Bludgeoning damage and has the Prone condition.

### [warhorse-skeleton] Warhorse Skeleton — desafío 1/2, Grande Muerto viviente
  - Hooves: m 6, reach 5 ft. {@h}7 (1d6 + 4) Bludgeoning damage. If the target is a Large or smaller creature and the skeleton moved 20+ feet straight toward it immediately before the hit, the target has the Prone condition.

### [worg] Worg — desafío 1/2, Grande Feérico
  - Bite: m 5, reach 5 ft. {@h}7 (1d8 + 3) Piercing damage, and the next attack roll made against the target before the start of the worg's next turn has Advantage.

### [animated-armor] Animated Armor — desafío 1, Mediano Constructo
  - Multiattack: The armor makes two Slam attacks.
  - Slam: m 4, reach 5 ft. {@h}5 (1d6 + 2) Bludgeoning damage.

### [brass-dragon-wyrmling] Brass Dragon Wyrmling — desafío 1, Mediano Dragón
  - Rend: m 4, reach 5 ft. {@h}7 (1d10 + 2) Slashing damage.
  - Fire Breath (Recarga 5–6): dex 11, each creature in a 20-foot-long, 5-foot-wide Line. {@actSaveFail} 14 (4d6) Fire damage. {@actSaveSuccess} Half damage.
  - Sleep Breath: con 11, each creature in a 15-foot Cone. {@actSaveFail} The target has the Incapacitated condition until the end of its next turn, at which point it repeats the save. 2 The target has the Unconscious condition for 1 minute. This effect ends for the target if it takes damage or a creature within 5 feet of it takes an action to wake it.

### [brown-bear] Brown Bear — desafío 1, Grande Bestia
  - Multiattack: The bear makes one Bite attack and one Claw attack.
  - Bite: m 5, reach 5 ft. {@h}7 (1d8 + 3) Piercing damage.
  - Claw: m 5, reach 5 ft. {@h}5 (1d4 + 3) Slashing damage. If the target is a Large or smaller creature, it has the Prone condition.

### [bugbear-warrior] Bugbear Warrior — desafío 1, Mediano Feérico
  - Abduct: The bugbear needn't spend extra movement to move a creature it is grappling.
  - Grab: m 4, reach 10 ft. {@h}9 (2d6 + 2) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape 12).
  - Light Hammer: m,r 4 (with Advantage if the target is Grappled by the bugbear), reach 10 ft. or range 20/60 ft. {@h}9 (3d4 + 2) Bludgeoning damage.

### [copper-dragon-wyrmling] Copper Dragon Wyrmling — desafío 1, Mediano Dragón
  - Rend: m 4, reach 5 ft. {@h}7 (1d10 + 2) Slashing damage.
  - Acid Breath (Recarga 5–6): dex 11, each creature in a 20-foot-long, 5-foot-wide Line. {@actSaveFail} 18 (4d8) Acid damage. {@actSaveSuccess} Half damage.
  - Slowing Breath: con 11, each creature in a 15-foot Cone. {@actSaveFail} The target can't take Reactions; its Speed is halved; and it can take either an action or a Bonus Action on its turn, not both. This effect lasts until the end of its next turn.

### [death-dog] Death Dog — desafío 1, Mediano Monstruosidad
Descripción oficial: [Death Dog] Two-Headed Spreader of Disease [Habitat:] Desert [Treasure:] None Death dogs are plagues on the arid lands they inhabit. These vicious, two-headed canines ambush creatures they perceive as weaker than themselves, favoring the wounded or infirm. They attack recklessly, infecting as many creatures as possible with their diseased jaws. If driven off, death dogs linger close to their victims, letting infection weaken their prey before they attack again. Legends tie death dogs to malicious death gods, the underworld, and cursed rulers. These stories are based on the malady death dogs spread. Roll on or choose a result from the Death Dog Malady Symptoms table to inspire symptoms spread by a death dog's bite. These symptoms are cosmetic and don't alter the effects of the death dog's Bite action. The symptoms vanish when a creature no longer has the Poisoned condition from a death dog's Bite. And his sorrows will stalk your land like hungry dogs until the seas turn to sand and the sun burns to cinders. Death Dog Malady Symptoms / 1 | Marks from canine jaws to appear on the victim's body, as if they were still being mauled. / 2 | The victim's body to wither, as if constantly exposed to desert heat. / 3 | The victim to be distracted by distant howling or vague whispers only they can hear. / 4 | The victim's flesh to rot like a corpse. / 5 | The victim to itch, as if they had fleas or sand beneath their skin. / 6 | Wicked symbols to gradually appear on and spread across the victim's body.
  - Multiattack: The death dog makes two Bite attacks.
  - Bite: m 4, reach 5 ft. {@h}4 (1d4 + 2) Piercing damage. If the target is a creature, it is subjected to the following effect. con 12. 1 The target has the Poisoned condition. While Poisoned, the target's Hit Point maximum doesn't return to normal when finishing a Long Rest, and it repeats the save every 24 hours that elapse, ending the effect on itself on a success. Subsequent Failures: The Poisoned target's Hit Point maximum decreases by 5 (1d10).

### [dire-wolf] Dire Wolf — desafío 1, Grande Bestia
  - Pack Tactics: The wolf has Advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - Bite: m 5, reach 5 ft. {@h}8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

### [dryad] Dryad — desafío 1, Mediano Feérico
Descripción oficial: [Dryad] Tree-Bound Guardian of Nature [Habitat:] Forest [Treasure:] Any Guardians of the woodlands, dryads magically flit from tree to tree and from root to bough, harrying trespassers with tangling vines and thorns. Most of these elusive beings have a special connection with one plant or a natural sanctuary that they protect. Some also share physical similarities with the plants they're most connected to. Dryads might sicken or die if their plant or sanctuary is destroyed, recovering only if it is healed or magically replaced. Roll on or choose an option from the Dryad Sanctuaries table to inspire a dryad's bond. Dryad Sanctuaries / 1 | An acres-large clonal colony—a stand of identical, interconnected trees. / 2 | A fortress-like tree, like a baobab or sequoia. / 3 | A living lock—a plant that seals evil below or blocks the path to a dungeon. / 4 | A lonely tree that stands atop a windswept mountain or amid a petrified forest. / 5 | A plant with magic fruit or remarkable seeds. / 6 | A shambling mound or treant that the dryad lives in or around as a Fey symbiote.
  - Magic Resistance: The dryad has Advantage on saving throws against spells and other magical effects.
  - Speak with Beasts and Plants: The dryad can communicate with Beasts and Plants as if they shared a language.
  - Multiattack: The dryad makes one Vine Lash or Thorn Burst attack, and it can use Spellcasting to cast Charm Monster.
  - Vine Lash: m 6, reach 10 ft. {@h}8 (1d8 + 4) Slashing damage.
  - Thorn Burst: r 6, range 60 ft. {@h}7 (1d6 + 4) Piercing damage.
  - Tree Stride: If within 5 feet of a Large or bigger tree, the dryad teleports to an unoccupied space within 5 feet of a second Large or bigger tree that is within 60 feet of the previous tree.
  - Spellcasting (conjuros): The dryad casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 14): Animal Friendship Charm Monster (lasts 24 hours; ends early if the dryad casts the spell again) Druidcraft Entangle Pass without Trace

### [empyrean-iota] Empyrean Iota — desafío 1, Mediano Celestial o Infernal
  - Incorporeal Movement: The empyrean can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.
  - Magic Resistance: The empyrean has Advantage on saving throws against spells and other magical effects.
  - Otherworldly Strike: m,r 5, reach 5 ft. or range 30 ft. {@h}7 (1d8 + 3) Necrotic or Radiant damage (empyrean's choice).
  - Spellcasting (conjuros): The empyrean casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability: Bless Lesser Restoration (as an action)
  - Healing Word (1/Day) (conjuros): The empyrean casts Healing Word, using the same spellcasting ability as Spellcasting. Healing Word

### [faerie-dragon-youth] Faerie Dragon Youth — desafío 1, Diminuto Dragón
  - Magic Resistance: The dragon has Advantage on saving throws against spells and other magical effects.
  - Bite: m 5, reach 5 ft. {@h}5 (1d4 + 3) Piercing damage plus 2 (1d4) Psychic damage.
  - Euphoria Breath (Recarga 5–6): wis 12, each creature in a 15-foot Cone. {@actSaveFail} The target has the Incapacitated condition until the end of its next turn and uses all its movement on its turn to move in a random direction.
  - Spellcasting (conjuros): The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 12): Dancing Lights Mage Hand Minor Illusion
  - Superior Invisibility (conjuros): The dragon casts Greater Invisibility on itself, requiring no spell components and using the same spellcasting ability as Spellcasting. Greater Invisibility

### [ghoul] Ghoul — desafío 1, Mediano Muerto viviente
  - Multiattack: The ghoul makes two Bite attacks.
  - Bite: m 4, reach 5 ft. {@h}5 (1d6 + 2) Piercing damage plus 3 (1d6) Necrotic damage.
  - Claw: m 4, reach 5 ft. {@h}4 (1d4 + 2) Slashing damage. If the target is a creature that isn't an Undead or elf, it is subjected to the following effect. con 10. {@actSaveFail} The target has the Paralyzed condition until the end of its next turn.

### [giant-eagle] Giant Eagle — desafío 1, Grande Celestial
  - Multiattack: The eagle makes two Rend attacks.
  - Rend: m 5, reach 5 ft. {@h}5 (1d4 + 3) Slashing damage plus 3 (1d6) Radiant damage.

### [giant-hyena] Giant Hyena — desafío 1, Grande Bestia
  - Bite: m 5, reach 5 ft. {@h}10 (2d6 + 3) Piercing damage.
  - Rampage (1/Day): Immediately after dealing damage to a creature that was already Bloodied, the hyena can move up to half its Speed, and it makes one Bite attack.

### [giant-octopus] Giant Octopus — desafío 1, Grande Bestia
  - Water Breathing: The octopus can breathe only underwater. It can hold its breath for 1 hour outside water.
  - Tentacles: m 5, reach 10 ft. {@h}10 (2d6 + 3) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape 13) from all eight tentacles. While Grappled, the target has the Restrained condition.
  - Ink Cloud (1/Day): {@actTrigger} The octopus takes damage while underwater. {@actResponse} The octopus releases ink that fills a 10-foot Cube centered on itself, and the octopus moves up to its Swim Speed. The Cube is Heavily Obscured for 1 minute or until a strong current or similar effect disperses the ink.

### [giant-spider] Giant Spider — desafío 1, Grande Bestia
  - Spider Climb: The spider can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - Web Walker: The spider ignores movement restrictions caused by webs, and it knows the location of any other creature in contact with the same web.
  - Bite: m 5, reach 5 ft. {@h}7 (1d8 + 3) Piercing damage plus 7 (2d6) Poison damage.
  - Web (Recarga 5–6): dex 13, one creature the spider can see within 60 feet. {@actSaveFail} The target has the Restrained condition until the web is destroyed (AC 10; HP 5; Vulnerability to Fire damage; Immunity to Poison and Psychic damage).

### [giant-toad] Giant Toad — desafío 1, Grande Bestia
  - Amphibious: The toad can breathe air and water.
  - Standing Leap: The toad's Long Jump is up to 20 feet and its High Jump is up to 10 feet with or without a running start.
  - Bite: m 4, reach 5 ft. {@h}5 (1d6 + 2) Piercing damage plus 5 (2d4) Poison damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape 12).
  - Swallow: The toad swallows a Medium or smaller target it is grappling. While swallowed, the target isn't Grappled but has the Blinded and Restrained conditions, and it has Total Cover against attacks and other effects outside the toad. In addition, the target takes 10 (3d6) Acid damage at the end of each of the toad's turns. The toad can have only one target swallowed at a time, and it can't use Bite while it has a swallowed target. If the toad dies, a swallowed creature is no longer Restrained and can escape from the corpse using 5 feet of movement, exiting with the Prone condition.

### [giant-vulture] Giant Vulture — desafío 1, Grande Monstruosidad
  - Pack Tactics: The vulture has Advantage on an attack roll against a creature if at least one of the vulture's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - Gouge: m 4, reach 5 ft. {@h}9 (2d6 + 2) Piercing damage, and the target has the Poisoned condition until the end of its next turn.

### [goblin-boss] Goblin Boss — desafío 1, Pequeño Feérico
  - Multiattack: The goblin makes two attacks, using Scimitar or Shortbow in any combination.
  - Scimitar: m 4, reach 5 ft. {@h}5 (1d6 + 2) Slashing damage, plus 2 (1d4) Slashing damage if the attack roll had Advantage.
  - Shortbow: r 4, range 80/320 ft. {@h}5 (1d6 + 2) Piercing damage, plus 2 (1d4) Piercing damage if the attack roll had Advantage.
  - Nimble Escape: The goblin takes the Disengage or Hide action.
  - Redirect Attack: {@actTrigger} A creature the goblin can see makes an attack roll against it. {@actResponse} The goblin chooses a Small or Medium ally within 5 feet of itself. The goblin and that ally swap places, and the ally becomes the target of the attack instead.

### [harpy] Harpy — desafío 1, Mediano Monstruosidad
Descripción oficial: [Harpy] Winged Voice of Doom [Habitat:] Coastal, Forest, Hill, Mountain [Treasure:] Any Hate-filled creatures, harpies strive to cause pain and bring an end to love and life. These monsters combine humanlike features with the talons and wings of avian scavengers. Their notorious songs compel listeners to follow them, heedless of danger. Creatures captivated by a harpy's song frequently meet their deaths on harpies' vicious claws or amid natural perils. Harpies dwell in remote, dismal places tainted by tragedy and despair. Some tales claim harpies offended the gods and were transformed as a punishment; harpies might also be the descendants of such cursed souls. Every harpy sings a distinct song. While some songs are said to be heartbreaking in their beauty, others are wretched squawking and compel only the magically enthralled.
  - Claw: m 3, reach 5 ft. {@h}6 (2d4 + 1) Slashing damage.
  - Luring Song: The harpy sings a magical melody, which lasts until the harpy's Concentration ends on it. wis 11, each Humanoid and Giant in a 300-foot Emanation originating from the harpy when the song starts. {@actSaveFail} The target has the Charmed condition until the song ends and repeats the save at the end of each of its turns. While Charmed, the target has the Incapacitated condition and ignores the Luring Song of other harpies. If the target is more than 5 feet from the harpy, the target moves on its turn toward the harpy by the most direct route, trying to get within 5 feet of the harpy. It doesn't avoid Opportunity Attacks; however, before moving into damaging terrain (such as lava or a pit) and whenever it takes damage from a source other than the harpy, the target repeats the save. {@actSaveSuccess} The target is immune to this harpy's Luring Song for 24 hours.

### [hippogriff] Hippogriff — desafío 1, Grande Monstruosidad
Descripción oficial: [Hippogriff] World-Traveling Hunter and Steed [Habitat:] Grassland, Hill, Mountain [Treasure:] None Part hunting bird, part horse, hippogriffs are majestic creatures that hunt opportunistically as they migrate, often targeting lone travelers and livestock. Hippogriffs might carry riders with them in their travels in return for food or other aid. Hippogriff migrations might take months or years, and sages frequently predict their routes. Roll on or choose a result from the Hippogriff Destination table to inspire where a hippogriff might be en route to. Hippogriff Destination / 1 | Lost ruin hidden by clouds or fog. / 2 | Low-hanging moon, star, or other solar body. / 3 | Magical garden on a floating island. / 4 | Mountaintop with a view of a giant geoglyph. / 5 | Nest full of hippogriff eggs atop a spire. / 6 | Portal to the Feywild or an Upper Plane.
  - Flyby: The hippogriff doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.
  - Multiattack: The hippogriff makes two Rend attacks.
  - Rend: m 5, reach 5 ft. {@h}7 (1d8 + 3) Slashing damage.

### [imp] Imp — desafío 1, Diminuto Infernal
Descripción oficial: [Imp] Devil of Pettiness and Suspicion [Habitat:] Any [Treasure:] None Known for their cowardice and toadying, imps serve devils and wicked magic-users. Their abilities to shape-shift and pass unseen make them skillful spies and adept at fleeing danger. Imps sent to surveil other creatures relate what they discover to their masters, but they frequently omit important details or cast events in the worst possible light to mislead their masters into following the imps' devilish council. Imps without masters delight in manipulating other creatures and inflating their own egos. They might take over bands of weaker monsters, or they might pose as helpful spirits and trick influential individuals into pursuing nefarious ends. I can tell you what I know, but wouldn't you rather I tell you what'll let you do what you know you're going to do anyway?
  - Magic Resistance: The imp has Advantage on saving throws against spells and other magical effects.
  - Sting: m 5, reach 5 ft. {@h}6 (1d6 + 3) Piercing damage plus 7 (2d6) Poison damage.
  - Shape-Shift: The imp shape-shifts to resemble a rat (Speed 20 ft.), a raven (20 ft., Fly 60 ft.), or a spider (20 ft., Climb 20 ft.), or it returns to its true form. Its statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn't transformed.
  - Invisibility (conjuros): The imp casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability. Invisibility

### [kuo-toa-whip] Kuo-toa Whip — desafío 1, Mediano Aberración
  - Amphibious: The kuo-toa can breathe air and water.
  - Sunlight Sensitivity: While in sunlight, the kuo-toa has Disadvantage on ability checks and attack rolls.
  - Pincer Staff: m 4, reach 10 ft. {@h}9 (2d6 + 2) Piercing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape 12). Until the grapple ends, the kuo-toa can't make Pincer Staff attacks.
  - Conjure Slimy Glob: r 4, range 60 ft. {@h}9 (3d4 + 2) Acid damage.
  - Shield of Faith (2/Day) (conjuros): The kuo-toa casts Shield of Faith, using Wisdom as the spellcasting ability. Shield of Faith

### [lacedon-ghoul] Lacedon Ghoul — desafío 1, Mediano Muerto viviente
  - Multiattack: The ghoul makes two Icy Bite attacks.
  - Icy Bite: m 4, reach 5 ft. {@h}9 (2d6 + 2) Cold damage, and the target's Speed decreases by 5 feet until the start of the ghoul's next turn.
  - Claw: m 4, reach 5 ft. {@h}4 (1d4 + 2) Slashing damage. If the target is a creature that isn't an Undead or elf, it is subjected to the following effect. con 10. {@actSaveFail} The target has the Paralyzed condition until the end of its next turn.
  - Watery Rush: While underwater, the ghoul moves up to half its Swim Speed without provoking Opportunity Attacks.

### [lion] Lion — desafío 1, Grande Bestia
  - Pack Tactics: The lion has Advantage on an attack roll against a creature if at least one of the lion's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - Running Leap: With a 10-foot running start, the lion can Long Jump up to 25 feet.
  - Multiattack: The lion makes two Rend attacks. It can replace one attack with a use of Roar.
  - Rend: m 5, reach 5 ft. {@h}7 (1d8 + 3) Slashing damage.
  - Roar: wis 11, one creature within 15 feet. {@actSaveFail} The target has the Frightened condition until the start of the lion's next turn.

### [manes-vaporspawn] Manes Vaporspawn — desafío 1, Mediano Infernal
  - Contortionist: The manes can move through a space as narrow as 1 inch without expending extra movement to do so.
  - Sickening Vapors: con 12, each creature in a 5-foot Emanation originating from the manes at the end of the manes's turn. {@actSaveFail} The target has the Incapacitated condition until the end of its next turn. {@actSaveSuccess} The target is immune to this manes's Sickening Vapors for 24 hours.
  - Claw: m 4, reach 5 ft. {@h}5 (1d6 + 2) Slashing damage plus 5 (2d4) Necrotic damage.
  - Shadow Stealth: While in Dim Light or Darkness, the manes takes the Hide action.

### [modron-quadrone] Modron Quadrone — desafío 1, Mediano Constructo
  - Disintegration: If the modron dies, it disintegrates into dust, leaving behind anything it was wearing or carrying.
  - Multiattack: The modron makes four Slam attacks or four Gears Launcher attacks.
  - Slam: m 4, reach 5 ft. {@h}4 (1d4 + 2) Force damage.
  - Gears Launcher: r 4, range 320 ft. {@h}4 (1d4 + 2) Force damage.

### [myconid-spore-servant] Myconid Spore Servant — desafío 1, Pequeño o Mediano Planta
  - Slam: m 5, reach 5 ft. {@h}6 (1d6 + 3) Bludgeoning damage plus 2 (1d4) Poison damage.

### [ogrillon-ogre] Ogrillon Ogre — desafío 1, Grande Gigante
  - Battleaxe: m 5, reach 5 ft. {@h}7 (1d8 + 3) Slashing damage.
  - Javelin: m,r 5, reach 5 ft. or range 30/120 ft. {@h}6 (1d6 + 3) Piercing damage.

### [pirate] Pirate — desafío 1, Pequeño o Mediano Humanoide
  - Multiattack: The pirate makes two Dagger attacks. It can replace one attack with a use of Enthralling Panache.
  - Dagger: m,r 5, reach 5 ft. or range 20/60 ft. {@h}5 (1d4 + 3) Piercing damage.
  - Enthralling Panache: wis 12, one creature the pirate can see within 30 feet. {@actSaveFail} The target has the Charmed condition until the start of the pirate's next turn.

### [psychic-gray-ooze] Psychic Gray Ooze — desafío 1, Mediano Cieno
  - Amorphous: The ooze can move through a space as narrow as 1 inch without expending extra movement to do so.
  - Pseudopod: m 3, reach 5 ft. {@h}11 (3d6 + 1) Acid damage, and the target has Disadvantage on Intelligence saving throws until the end of the ooze's next turn.
  - Psychic Crush: int 10, one creature the ooze can see within 60 feet. {@actSaveFail} 13 (3d8) Psychic damage.
  - Mind Corrosion: {@actTrigger} The ooze fails a saving throw against a spell or another magical effect created by a creature. {@actResponse} The triggering creature takes 3 (1d6) Psychic damage.

### [quasit] Quasit — desafío 1, Diminuto Infernal
Descripción oficial: [Quasit] Demon of Discord and Disorder [Habitat:] Planar (Abyss) [Treasure:] None Tirelessly destructive, quasits sow discord through nasty pranks, sabotage, and ambushes. These tiny demons use chaos and violence to terrorize others. By shape-shifting into harmless but ill-omened creatures or by turning invisible, quasits sneak into places where they spy for villainous masters or set vicious traps. Quasits delight in hiding in dark places and—when least expected—bursting forth to slash foes with their poisoned claws. Quasits are usually overlooked and underestimated by other demons. This drives them to prove themselves through cruel acts or by seeking paths to the Material Plane. Among mortals, quasits sow senseless chaos, and they might find kindred evil spirits among violent cultists and magic-users. A thing doesn't need to be big to be gut-flippingly dreadful. Just think of all the folks who're squeamish around spiders. Now imagine a spider as big as a cat and that wants to steal your tongue.
  - Magic Resistance: The quasit has Advantage on saving throws against spells and other magical effects.
  - Rend: m 5, reach 5 ft. {@h}5 (1d4 + 3) Slashing damage, and the target has the Poisoned condition until the start of the quasit's next turn.
  - Scare (1/Day): wis 10, one creature within 20 feet. {@actSaveFail} The target has the Frightened condition. At the end of each of its turns, the target repeats the save, ending the effect on itself on a success. After 1 minute, it succeeds automatically.
  - Shape-Shift: The quasit shape-shifts to resemble a bat (Speed 10 ft., Fly 40 ft.), a centipede (40 ft., Climb 40 ft.), or a toad (40 ft., Swim 40 ft.), or it returns to its true form. Its game statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn't transformed.
  - Invisibility (conjuros): The quasit casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability. Invisibility

### [salamander-fire-snake] Salamander Fire Snake — desafío 1, Mediano Elemental
  - Fire Aura: At the end of each of the salamander's turns, each creature of the salamander's choice in a 5-foot Emanation originating from the salamander takes 3 (1d6) Fire damage.
  - Bite: m 4, reach 5 ft. {@h}6 (1d8 + 2) Piercing damage plus 3 (1d6) Fire damage.

### [scarecrow] Scarecrow — desafío 1, Mediano Constructo
Descripción oficial: [Scarecrow] Servant of Superstition [Habitat:] Grassland [Treasure:] None Spirits of vengeance bound to crude frames, scarecrows arise from folk magic, the prayers of desperate commoners, or possession by spirits that died with violent work left undone. Scarecrows might serve those who created them or might defend a place, family, or community from threats—whether physical or to their way of life. Although scarecrows take their name from rural effigies, they might take varied patchwork forms. Roll on or choose a result from the Scarecrow Frames table to inspire a scarecrow's appearance. Scarecrow Frames / 1 | Animal furs, bones, horns, and claws. / 2 | Beehives or wasp nests over a wicker frame. / 3 | A carved pumpkin atop a body of thick vines. / 4 | Nets, flotsam, grapnels, and fishing tackle. / 5 | Oversize stuffed animal or mannequin parts. / 6 | Rusty armor and torture devices. / 7 | A sackcloth head atop straw-stuffed clothes. / 8 | Wedding clothes that were never worn.
  - Fearsome Claw: m 3, reach 5 ft. {@h}6 (2d4 + 1) Slashing damage, and the target has the Frightened condition until the end of the scarecrow's next turn.
  - Terrifying Glare: wis 11, one creature the scarecrow can see within 30 feet. {@actSaveFail} The target has the Frightened condition until the end of the scarecrow's next turn. While Frightened, the target has the Paralyzed condition.

### [specter] Specter — desafío 1, Mediano Muerto viviente
Descripción oficial: [Specter] Spirit of Wrath and Servant of Death [Habitat:] Underdark, Urban [Treasure:] None Specters are bodiless, life-devouring spirits drawn to darkness and negative emotions. Having lost all connection to the beings they once were, these hateful spirits drain mortal essence to steal fleeting tastes of life and warmth. Specters seek creatures and locations that exude evil and feed on the suffering they inspire. Roll on or choose a result from the Specter Haunts table to inspire where a specter lurks. Specter Haunts / 1 | A community afflicted by curses, grudges, plagues, or tragedies. / 2 | An evil Artifact or a deadly magical device. / 3 | The lair of a Fiend or an Undead. / 4 | The place where a villain died or is buried. / 5 | A portal to the Lower Planes, Negative Plane, or Shadowfell. / 6 | The sanctuary of a necromancer or death cult. / 7 | A secluded monument binding wicked souls. / 8 | The site of a disaster or mass death.
  - Incorporeal Movement: The specter can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.
  - Sunlight Sensitivity: While in sunlight, the specter has Disadvantage on ability checks and attack rolls.
  - Life Drain: m 4, reach 5 ft. {@h}7 (2d6) Necrotic damage. If the target is a creature, its Hit Point maximum decreases by an amount equal to the damage taken.

### [sphinx-of-wonder] Sphinx of Wonder — desafío 1, Diminuto Celestial
  - Magic Resistance: The sphinx has Advantage on saving throws against spells and other magical effects.
  - Rend: m 5, reach 5 ft. {@h}5 (1d4 + 3) Slashing damage plus 7 (2d6) Radiant damage.
  - Burst of Ingenuity (2/Day): {@actTrigger} The sphinx or another creature within 30 feet makes an ability check or a saving throw. {@actResponse} The sphinx adds 2 to the roll.

### [spy] Spy — desafío 1, Pequeño o Mediano Humanoide
  - Shortsword: m 4, reach 5 ft. {@h}5 (1d6 + 2) Piercing damage plus 7 (2d6) Poison damage.
  - Hand Crossbow: r 4, range 30/120 ft. {@h}5 (1d6 + 2) Piercing damage plus 7 (2d6) Poison damage.
  - Cunning Action: The spy takes the Dash, Disengage, or Hide action.

### [swarm-of-larvae] Swarm of Larvae — desafío 1, Grande Infernal
  - Swarm: The swarm can occupy another creature's space and vice versa, and the swarm can move through an opening large enough for a Medium creature. The swarm can't regain Hit Points or gain Temporary Hit Points.
  - Bites: m 4, reach 5 ft. {@h}9 (2d6 + 2) Necrotic damage, or 7 (2d4 + 2) Necrotic damage if the swarm is Bloodied.

### [swarm-of-piranhas] Swarm of Piranhas — desafío 1, Mediano Bestia
  - Swarm: The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny piranha. The swarm can't regain Hit Points or gain Temporary Hit Points.
  - Water Breathing: The swarm can breathe only underwater.
  - Bites: m 5 (with Advantage if the target doesn't have all its Hit Points), reach 5 ft. {@h}8 (2d4 + 3) Piercing damage, or 5 (1d4 + 3) Piercing damage if the swarm is Bloodied.

### [thri-kreen-marauder] Thri-kreen Marauder — desafío 1, Mediano Monstruosidad
  - Multiattack: The thri-kreen makes two attacks, using Gythka or Chatkcha in any combination.
  - Gythka: m 3, reach 5 ft. {@h}5 (1d8 + 1) Slashing damage plus 2 (1d4) Poison damage.
  - Chatkcha: r 4, range 30/120 ft. {@h}5 (1d6 + 2) Slashing damage.
  - Leap: The thri-kreen jumps up to 15 feet by spending 5 feet of movement.

### [tiger] Tiger — desafío 1, Grande Bestia
  - Rend: m 5, reach 5 ft. {@h}10 (2d6 + 3) Slashing damage. If the target is a Large or smaller creature, it has the Prone condition.
  - Nimble Escape: The tiger takes the Disengage or Hide action.

### [yuan-ti-infiltrator] Yuan-ti Infiltrator — desafío 1, Mediano Monstruosidad
  - Magic Resistance: The yuan-ti has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The yuan-ti makes two Scimitar attacks.
  - Scimitar: m 3, reach 5 ft. {@h}4 (1d6 + 1) Slashing damage.
  - Poison Ray: r 4, range 120 ft. {@h}9 (2d6 + 2) Poison damage.
  - Spellcasting (conjuros): The yuan-ti casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save 12): Animal Friendship (snakes only) Suggestion

### [allosaurus] Allosaurus — desafío 2, Grande Bestia
  - Bite: m 6, reach 5 ft. {@h}15 (2d10 + 4) Piercing damage.
  - Claws: m 6, reach 5 ft. {@h}8 (1d8 + 4) Slashing damage. If the target is a Large or smaller creature and the allosaurus moved 30+ feet straight toward it immediately before the hit, the target has the Prone condition, and the allosaurus can make one Bite attack against it.

### [animated-rug-of-smothering] Animated Rug of Smothering — desafío 2, Grande Constructo
  - Smother: m 5, reach 5 ft. {@h}10 (2d6 + 3) Bludgeoning damage. If the target is a Medium or smaller creature, the rug can give it the Grappled condition (escape 13) instead of dealing damage. Until the grapple ends, the target has the Blinded and Restrained conditions, is suffocating, and takes 10 (2d6 + 3) Bludgeoning damage at the start of each of its turns. The rug can smother only one creature at a time. While grappling the target, the rug can't take this action, the rug halves the damage it takes (round down), and the target takes the same amount of damage.

### [ankheg] Ankheg — desafío 2, Grande Monstruosidad
Descripción oficial: [Ankheg] Burrowing Insectile Predator [Habitat:] Forest, Grassland [Treasure:] None Oversize insects, ankhegs burrow close to the surface, creating sprawling underground labyrinths. From these tunnels, they burst forth to dissolve and devour smaller creatures using their acid-dripping mandibles and sprays of digestive enzymes. Ankhegs are the bane of farmers whose grazing livestock are easy prey for these monsters. Many ankhegs hunt alone, but those in places with ample food might collect in nests of several dozen and threaten whole towns. Ankheg nests can be challenging to wipe out unless the monsters' tunnels are cleared out and their eggs destroyed. Ankheg tunnels are roughly cylindrical and are often littered with the remains of ankhegs' meals and subterranean treasures. Roll on or choose a result from the Ankheg Tunnel Discoveries table to inspire what might be found in an ankheg's tunnel. Though they feed on things under the soil, ankhegs prefer live meat—your cattle, your dogs, or you. Ankheg Tunnel Discoveries / 1 | Another tunnel (either natural or of worked stone) that extends into the Underdark. / 2 | A buried ruin or grave exposed by the tunnel. / 3 | A cluster of 1d4 fresh ankheg eggs that can be broken and used as vials of Acid. / 4 | A dead ankheg and evidence of a deadlier subterranean predator. / 5 | A piece of ankheg carapace usable as a Shield. / 6 | A pouch with 2d6 GP near a puddle of acid. / 7 | A stray farm or woodland animal. / 8 | A viciously mauled scarecrow.
  - Tunneler: The ankheg can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.
  - Bite: m 5 (with Advantage if the target is Grappled by the ankheg), reach 5 ft. {@h}10 (2d6 + 3) Slashing damage plus 3 (1d6) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape 13).
  - Acid Spray (Recarga 6): dex 12, each creature in a 30-foot-long, 5-foot-wide Line. {@actSaveFail} 14 (4d6) Acid damage. {@actSaveSuccess} Half damage.

### [awakened-tree] Awakened Tree — desafío 2, Enorme Planta
  - Slam: m 6, reach 10 ft. {@h}13 (2d8 + 4) Bludgeoning damage.

### [azer-sentinel] Azer Sentinel — desafío 2, Mediano Elemental
  - Fire Aura: At the end of each of the azer's turns, each creature of the azer's choice in a 5-foot Emanation originating from the azer takes 5 (1d10) Fire damage unless the azer has the Incapacitated condition.
  - Illumination: The azer sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet.
  - Burning Hammer: m 5, reach 5 ft. {@h}8 (1d10 + 3) Bludgeoning damage plus 3 (1d6) Fire damage.
