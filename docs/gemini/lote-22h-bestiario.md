# Encargo: Lote 22h (bestiario, desafío 10 a 17) de la app "Mi turno"

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

### [noble-prodigy] Noble Prodigy — desafío 10, Pequeño o Mediano Humanoide
  - Multiattack: The noble makes three Beguiling Strike attacks.
  - Beguiling Strike: m,r 8, reach 5 ft. or range 60 ft. {@h}18 (4d6 + 4) Psychic damage, and the target has the Charmed condition until the start of the noble's next turn.
  - Spellcasting (conjuros): The noble casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 16): Mage Armor (included in AC) Mage Hand Minor Illusion Befuddlement Detect Thoughts Fly Scrying Shatter (level 7 version)
  - Shield (2/Day) (conjuros): The noble casts Shield in response to that spell's trigger, using the same spellcasting ability as Spellcasting. Shield

### [performer-legend] Performer Legend — desafío 10, Pequeño o Mediano Humanoide
  - Multiattack: The performer makes three Bejeweled Baton attacks.
  - Bejeweled Baton: m 9, reach 5 ft. {@h}10 (2d4 + 5) Bludgeoning damage plus 10 (3d6) Psychic damage.
  - Majestic Song: wis 17, each creature in a 20-foot-radius Sphere centered on a point within 120 feet. {@actSaveFail} 22 (4d8 + 4) Psychic damage, and the target has the Charmed or Frightened condition (performer's choice) until the end of the performer's next turn. {@actSaveSuccess} Half damage only.
  - Warding Charm: {@actTrigger} A creature hits the performer with an attack roll. dwis 17, the triggering creature. {@actSaveFail} The attack roll misses the performer, and the target has the Charmed condition until the end of the performer's next turn.
  - Spellcasting (conjuros): The performer casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 17): Mage Hand Minor Illusion Prestidigitation Major Image Project Image

### [spy-master] Spy Master — desafío 10, Pequeño o Mediano Humanoide
  - Multiattack: The spy makes three attacks, using Rapier or Hand Crossbow in any combination.
  - Rapier: m 9, reach 5 ft. {@h}14 (2d8 + 5) Piercing damage plus 7 (2d6) Poison damage.
  - Hand Crossbow: r 9, range 30/120 ft. {@h}12 (2d6 + 5) Piercing damage plus 9 (2d8) Poison damage.
  - Smoke Bomb (1/Day): The spy throws a bomb to a point it can see within 30 feet of itself. con 16, each creature in a 20-foot-radius Sphere centered on that point. {@actSaveFail} 28 (8d6) Poison damage, and the target has the Blinded condition until the end of the spy's next turn. {@actSaveSuccess} Half damage only.
  - Cunning Action: The spy takes the Dash, Disengage, or Hide action.

### [stone-golem] Stone Golem — desafío 10, Grande Constructo
Descripción oficial: [Stone Golem] Guardian of the Storied and Sacred [Habitat:] Any [Treasure:] None Stone golems take varied forms, such as weathered carvings of ancient deities, lifelike sculptures of heroes, or any other shape their makers imagine. No matter their design or the rock from which they're crafted, these golems are strengthened by the magic that animates them, allowing them to follow their creators' orders for centuries. Stone golems are typically created to protect places of significance to a group, such as a monument to an important event, a leader's tomb, or a faith's sanctuary. Roll on or choose a result from the Stone Golem Orders table to inspire the commands a stone golem follows. Stone Golem Orders / 1 | Allow only those wearing ritual garb to pass. / 2 | Cast Slow on and aid in apprehending anyone who touches a city's prized relic. / 3 | Destroy a dam or bridge at the command of one bearing a ruler's medallion of office. / 4 | Obey whoever places a missing crest in its chest, then deactivate for a year. / 5 | Reveal a hidden passage to those who recite a leader's final words. / 6 | Watch for and do battle with the type of monster that slew the hero it resembles. Exercise discernment when deciding the golem's appearance, as your creation is likely to long outlive its model.
  - Immutable Form: The golem can't shape-shift.
  - Magic Resistance: The golem has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The golem makes two attacks, using Slam or Force Bolt in any combination.
  - Slam: m 10, reach 5 ft. {@h}15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.
  - Force Bolt: r 9, range 120 ft. {@h}22 (4d10) Force damage.
  - Slow {@recharge 5} (conjuros): The golem casts the Slow spell, requiring no spell components and using Constitution as the spellcasting ability (spell save 17).

### [warrior-commander] Warrior Commander — desafío 10, Pequeño o Mediano Humanoide
  - Multiattack: The warrior makes three attacks, using Greatsword or Longbow in any combination.
  - Greatsword: m 9, reach 5 ft. {@h}19 (4d6 + 5) Slashing damage. The warrior also creates one of the following effects: [Sap] The target has Disadvantage on its next attack roll before the start of the warrior's next turn. [Maneuver] One ally who can see or hear the warrior can take a Reaction to move up to half the ally's Speed without provoking Opportunity Attacks.
  - Longbow: r 9, range 150/600 ft. {@h}18 (3d8 + 5) Piercing damage, and the target's Speed decreases by 10 feet until the end of the target's next turn.
  - Tactical Charge: The warrior moves up to half its Speed straight toward an enemy it can see without provoking Opportunity Attacks.
  - Counterattack: {@actTrigger} The warrior is hit by an attack roll. {@actResponse} The warrior adds 4 to its AC against that attack, possibly causing it to miss. On a miss, the warrior can make one Greatsword or Longbow attack against the attacker.

### [yochlol] Yochlol — desafío 10, Mediano Infernal
Descripción oficial: [Yochlol] Demon of Depraved Will [Habitat:] Planar (Abyss) [Treasure:] None Yochlols embody the pernicious will and infectious philosophies of the Abyss. In their rarely seen true forms, these noxious manipulators appear as ever-shifting masses of dripping tentacles and toxic flesh crowned by a single baleful eye. More often, though, yochlols take the form of spiders or zealous cultists. They use manipulative magic and dangerous rhetoric to spread demonic cults, corrupt the righteous, and further the plots of their fiendish overlords. They relish coercing the unwitting into furthering demonic plots and turning mortals against one another. Most yochlols serve Lolth. The Demon Queen of Spiders claims all yochlols as minions and orders any yochlols that disagree destroyed. In rare cases, yochlols might serve other demon lords, particularly manipulative or changeable ones like Graz'zt, Juiblex, and Zuggtmoy. Despite their service to demon lords, yochlols harbor their own vicious whims and ambitions. They might claim to speak for their overlords to further their own ambitions or seek to reveal rivals' selfish goals to gain standing with their demonic masters.
  - Demonic Restoration: If the yochlol dies outside the Abyss, its body dissolves, and it gains a new body instantly, reviving with all its Hit Points in the Abyss.
  - Magic Resistance: The yochlol has Advantage on saving throws against spells and other magical effects.
  - Spider Climb: The yochlol can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - Web Walker: The yochlol ignores movement restrictions caused by webs.
  - Multiattack: The yochlol makes two Caustic Lash attacks, and it can use Spellcasting to cast Web or Dominate Person if available.
  - Caustic Lash: m,r 8, reach 10 ft. or range 120 ft. {@h}25 (6d6 + 4) Acid damage.
  - Shape-Shift: The yochlol shape-shifts into a Medium Humanoid or a Medium spider or back into its true form. Its game statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed.
  - Toxic Escape: {@actTrigger} The yochlol is hit by an attack roll. {@actResponse} The yochlol halves the attack's damage to itself (round down), and it teleports to an unoccupied space it can see within 30 feet of itself. con 15, each creature within 5 feet of the yochlol's destination space. {@actSaveFail} The target has the Poisoned condition until the end of its next turn. While Poisoned, it has the Incapacitated condition.
  - Spellcasting (conjuros): The yochlol casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 15): Detect Thoughts Gaseous Form (self only) Web Dominate Person

### [young-gold-dragon] Young Gold Dragon — desafío 10, Grande Dragón
  - Amphibious: The dragon can breathe air and water.
  - Multiattack: The dragon makes three Rend attacks. It can replace one attack with a use of Weakening Breath.
  - Rend: m 10, reach 10 ft. {@h}17 (2d10 + 6) Slashing damage.
  - Fire Breath (Recarga 5–6): dex 17, each creature in a 30-foot Cone. {@actSaveFail} 55 (10d10) Fire damage. {@actSaveSuccess} Half damage.
  - Weakening Breath: str 17, each creature that isn't currently affected by this breath in a 30-foot Cone. {@actSaveFail} The target has Disadvantage on Strength-based D20 Tests and subtracts 3 (1d6) from its damage rolls. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

### [young-red-dragon] Young Red Dragon — desafío 10, Grande Dragón
  - Multiattack: The dragon makes three Rend attacks.
  - Rend: m 10, reach 10 ft. {@h}13 (2d6 + 6) Slashing damage plus 3 (1d6) Fire damage.
  - Fire Breath (Recarga 5–6): dex 17, each creature in a 30-foot Cone. {@actSaveFail} 56 (16d6) Fire damage. {@actSaveSuccess} Half damage.

### [bandit-crime-lord] Bandit Crime Lord — desafío 11, Pequeño o Mediano Humanoide
  - Evasion: If the bandit is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the bandit instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.
  - Multiattack: The bandit makes three attacks, using Scimitar or Pistol in any combination.
  - Scimitar: m 9, reach 5 ft. {@h}12 (2d6 + 5) Slashing damage plus 14 (4d6) Poison damage.
  - Pistol: r 9, range 30/90 ft. {@h}10 (1d10 + 5) Piercing damage plus 14 (4d6) Poison damage.
  - Deadly Aim: The bandit gives itself Advantage on the next attack roll it makes during the current turn. If that attack hits, the target takes an extra 28 (8d6) Poison damage.

### [behir] Behir — desafío 11, Enorme Monstruosidad
Descripción oficial: [Behir] Lightning-Spewing Glutton [Habitat:] Underdark [Treasure:] Any Twelve-legged, reptilian predators, behirs endlessly hunt for their next meal. Their short legs propel them quickly across floors and walls. Any prey that behirs can't chase down, they blast with breaths of powerful lightning. Legends claim the first behirs were magically created by storm giants during an ancient, multiversal conflict between giants and dragons. The giants used their mastery of weather to alter the essence of blue dragons. The results were the first behirs, which served as hunters with a particular taste for dragon eggs. Behirs live in sprawling cave systems and elaborate ruins where they can make the most of their exceptional mobility. They are mindful of areas where dragons dwell, as most dragons view behirs as dangerous abominations and attack them on sight. Nevertheless, behirs occasionally hunt for dragon lairs in the hope of finding and devouring unhatched dragon eggs. You wouldn't believe all the great stuff I've swallowed! Now just climb on in here, and you can keep whatever you find.
  - Multiattack: The behir makes one Bite attack and uses Constrict.
  - Bite: m 10, reach 10 ft. {@h}19 (2d12 + 6) Piercing damage plus 11 (2d10) Lightning damage.
  - Constrict: str 18, one Large or smaller creature the behir can see within 5 feet. {@actSaveFail} 28 (5d8 + 6) Bludgeoning damage. The target has the Grappled condition (escape 16), and it has the Restrained condition until the grapple ends.
  - Lightning Breath (Recarga 5–6): dex 16, each creature in a 90-foot-long, 5-foot-wide Line. {@actSaveFail} 66 (12d10) Lightning damage. {@actSaveSuccess} Half damage.
  - Swallow: dex 18, one Large or smaller creature Grappled by the behir (the behir can have only one creature swallowed at a time). {@actSaveFail} The behir swallows the target, which is no longer Grappled. While swallowed, a creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the behir, and takes 21 (6d6) Acid damage at the start of each of the behir's turns. If the behir takes 30 damage or more on a single turn from the swallowed creature, the behir must succeed on a 14 Constitution saving throw at the end of that turn or regurgitate the creature, which falls in a space within 10 feet of the behir and has the Prone condition. If the behir dies, a swallowed creature is no longer Restrained and can escape from the corpse by using 15 feet of movement, exiting Prone.

### [dao] Dao — desafío 11, Grande Elemental
Descripción oficial: [Dao] Genie of the Earth [Habitat:] Planar (Elemental Plane of Earth), Underdark [Treasure:] Implements Genies of minerals and gemstones, dao embody the resolve of rock. Using innate magic, they move through the earth unimpeded, exploring depths inaccessible to most. Dao delight in the treasures of the earth, whether raw gemstones, jewelry crafted from pure metals, or wondrous fossils. In exchange for such treasures, dao might reveal underground mysteries, such as paths through the Underdark, buried ruins, or whole subterranean realms. Many dao call the Elemental Plane of Earth home. There, they create cities that glitter with treasure. Among these realms is the labyrinthine expanse called the Great Dismal Delve or the Sevenfold Mazework, which protects the City of Jewels, the Iron Crucible, and the Strait of Magnets. On the Elemental Plane of Earth, galaxies of gemstones twinkle over vaults of treasure. If dao are there, so is wealth worth hunting.
  - Earth Glide: The dao can burrow through nonmagical, unworked earth and stone. While doing so, the dao doesn't disturb the material it moves through.
  - Elemental Restoration: If the dao dies outside the Elemental Plane of Earth, its body dissolves into dirt, and it gains a new body in 1d4 days, reviving with all its Hit Points somewhere on the Plane of Earth.
  - Magic Resistance: The dao has Advantage on saving throws against spells and other magical effects.
  - Wishes: The dao has a 30 percent chance of knowing the Wish spell. If the dao knows it, the dao can cast it only on behalf of a non-genie creature who communicates a wish in a way the dao can understand. If the dao casts the spell for the creature, the dao suffers none of the spell's stress. Once the dao has cast it three times, the dao can't do so again for 365 days.
  - Multiattack: The dao makes three Earthen Maul attacks or two Earth Burst attacks.
  - Earthen Maul: m 10, reach 5 ft. {@h}20 (4d6 + 6) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition.
  - Earth Burst: r 10, range 120 ft. {@h}15 (2d8 + 6) Bludgeoning damage. {@hom}Earth explodes from the target's space, creating the following effect. dex 16, each creature in a 10-foot Emanation originating from and including the target. {@actSaveFail} 10 (3d6) Thunder damage.
  - Spellcasting (conjuros): The dao casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 16): Detect Evil and Good Detect Magic Stone Shape Gaseous Form Invisibility Move Earth Passwall Plane Shift Tongues Wall of Stone

### [death-knight-aspirant] Death Knight Aspirant — desafío 11, Pequeño o Mediano Muerto viviente
  - Magic Resistance: The aspirant has Advantage on saving throws against spells and other magical effects.
  - Marshal Undead: Undead creatures of the aspirant's choice (excluding itself) in a 60-foot Emanation originating from it have Advantage on attack rolls and saving throws. It can't use this trait if it has the Incapacitated condition.
  - Multiattack: The aspirant makes three Dread Blade attacks.
  - Dread Blade: m 9, reach 5 ft. {@h}14 (2d8 + 5) Slashing damage plus 10 (3d6) Necrotic damage.
  - Hellfire Orb (Recarga 5–6): dex 15, each creature in a 20-foot-radius Sphere centered on a point the aspirant can see within 120 feet of itself. {@actSaveFail} 21 (6d6) Fire damage plus 21 (6d6) Necrotic damage. {@actSaveSuccess} Half damage.
  - Parry: {@actTrigger} The aspirant is hit by a melee attack roll while holding a weapon. {@actResponse} The aspirant adds 4 to its AC against that attack, possibly causing it to miss.
  - Spellcasting (conjuros): The aspirant casts one of the following spells, using Charisma as the spellcasting ability (spell save 15): Phantom Steed Destructive Wave (Necrotic) Dispel Magic

### [djinni] Djinni — desafío 11, Grande Elemental
Descripción oficial: [Djinni] Genie of the Air [Habitat:] Coastal, Planar (Elemental Plane of Air) [Treasure:] Arcana As genies of wind and skies, djinn personify freedom and might. They can control wind and travel as swiftly as a breeze. They might be as serene as drifting clouds or as tempestuous as storms, but most djinn relish their freedom and desire to discover the wonders of the multiverse. Djinn often know many stories, and they might share such lore with those who offer their own exciting stories in trade. While many djinn create airy palaces on stormy coasts or high in the clouds, untold numbers dwell on the Elemental Plane of Air. In floating cities, djinn collect tales and experiences from across the planes of existence, sharing them in fabulous forums, libraries, and theaters. The greatest of these cities is the Citadel of Ice and Steel, in which wind-sculpted towers contain a city-size trove of incredible knowledge and treasures that defy belief.
  - Elemental Restoration: If the djinni dies outside the Elemental Plane of Air, its body dissolves into mist, and it gains a new body in 1d4 days, reviving with all its Hit Points somewhere on the Plane of Air.
  - Magic Resistance: The djinni has Advantage on saving throws against spells and other magical effects.
  - Wishes: The djinni has a 30 percent chance of knowing the Wish spell. If the djinni knows it, the djinni can cast it only on behalf of a non-genie creature who communicates a wish in a way the djinni can understand. If the djinni casts the spell for the creature, the djinni suffers none of the spell's stress. Once the djinni has cast it three times, the djinni can't do so again for 365 days.
  - Multiattack: The djinni makes three attacks, using Storm Blade or Storm Bolt in any combination.
  - Storm Blade: m 9, reach 5 feet. {@h}12 (2d6 + 5) Slashing damage plus 7 (2d6) Lightning damage.
  - Storm Bolt: r 9, range 120 feet. {@h}13 (3d8) Thunder damage. If the target is a Large or smaller creature, it has the Prone condition.
  - Create Whirlwind: The djinni conjures a whirlwind at a point it can see within 120 feet. The whirlwind fills a 20-foot-radius, 60-foot-high Cylinder centered on that point. The whirlwind lasts until the djinni's Concentration on it ends. The djinni can move the whirlwind up to 20 feet at the start of each of its turns. Whenever the whirlwind enters a creature's space or a creature enters the whirlwind, that creature is subjected to the following effect. str 17 (a creature makes this save only once per turn, and the djinni is unaffected). {@actSaveFail} While in the whirlwind, the target has the Restrained condition and moves with the whirlwind. At the start of each of its turns, the Restrained target takes 21 (6d6) Thunder damage. At the end of each of its turns, the target repeats the save, ending the effect on itself on a success.
  - Spellcasting (conjuros): The djinni casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 17): Detect Evil and Good Detect Magic Create Food and Water (can create wine instead of water) Tongues Wind Walk Creation Gaseous Form Invisibility Major Image Plane Shift

### [efreeti] Efreeti — desafío 11, Grande Elemental
Descripción oficial: [Efreeti] Genie of Fire [Habitat:] Desert, Planar (Elemental Plane of Fire) [Treasure:] Armaments Efreet burn with the energy and unpredictability of fire. Their innate magic allows them to conjure flames from nothing and shape treasures within magical infernos. Many efreet have wicked reputations, as their fickle natures and love for dramatic conflagrations can be destructive. Other efreet delight in fire's beauty, be it the delicacy of a candle flame or the shared wonder of fireworks. These genies might aid mortals in exchange for treasures or the liberation of captive Elementals. On many worlds, efreet dwell in sweltering deserts and volcanic regions. Those that make their homes on the Elemental Plane of Fire create incredible cities among seas of flame and molten minerals. Eclipsing all of these is the storied City of Brass, a gleaming metropolis that is one of the most wondrous cities in the multiverse. Here, magic tempers the plane's extreme heat, making the City of Brass a hub of trade between planes of existence. Imagine seas of platinum and liquid flame, the Crimson Pillar with fires hot enough to sear the gods, and the infinite delights of the City of Brass. Now imagine what my master offers...
  - Elemental Restoration: If the efreeti dies outside the Elemental Plane of Fire, its body dissolves into ash, and it gains a new body in 1d4 days, reviving with all its Hit Points somewhere on the Plane of Fire.
  - Magic Resistance: The efreeti has Advantage on saving throws against spells and other magical effects.
  - Wishes: The efreeti has a 30 percent chance of knowing the Wish spell. If the efreeti knows it, the efreeti can cast it only on behalf of a non-genie creature who communicates a wish in a way the efreeti can understand. If the efreeti casts the spell for the creature, the efreeti suffers none of the spell's stress. Once the efreeti has cast it three times, the efreeti can't do so again for 365 days.
  - Multiattack: The efreeti makes three attacks, using Heated Blade or Hurl Flame in any combination.
  - Heated Blade: m 10, reach 5 ft. {@h}13 (2d6 + 6) Slashing damage plus 13 (2d12) Fire damage.
  - Hurl Flame: r 8, range 120 ft. {@h}24 (7d6) Fire damage.
  - Spellcasting (conjuros): The efreeti casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 16): Detect Magic Elementalism Gaseous Form Invisibility Major Image Plane Shift Tongues Wall of Fire (level 7 version)

### [horned-devil] Horned Devil — desafío 11, Grande Infernal
Descripción oficial: [Horned Devil] Devil of Hatred and Subjugation [Habitat:] Planar (Nine Hells) [Treasure:] Relics Horned devils, also known as cornugons or malebranche, are infernal warriors that exact the will of diabolical generals and lead other devils in battle. Their bodies and weapons are forged in the Nine Hells, and they torment their foes with diabolical flames and pernicious wounds.
  - Diabolical Restoration: If the devil dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.
  - Magic Resistance: The devil has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The devil makes three attacks, using Searing Fork or Hurl Flame in any combination. It can replace one attack with a use of Infernal Tail.
  - Searing Fork: m 10, reach 10 ft. {@h}15 (2d8 + 6) Piercing damage plus 9 (2d8) Fire damage.
  - Hurl Flame: r 8, range 150 ft. {@h}26 (5d8 + 4) Fire damage. If the target is a flammable object that isn't being worn or carried, it starts burning.
  - Infernal Tail: dex 17, one creature the devil can see within 10 feet. {@actSaveFail} 10 (1d8 + 6) Necrotic damage, and the target receives an infernal wound if it doesn't have one. While wounded, the target loses 10 (3d6) Hit Points at the start of each of its turns. The wound closes after 1 minute, after a spell restores Hit Points to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, doing so by succeeding on a 17 Wisdom (Medicine) check.

### [marid] Marid — desafío 11, Grande Elemental
Descripción oficial: [Marid] Genie of the Water [Habitat:] Coastal, Planar (Elemental Plane of Water), Underwater [Treasure:] Relics Marids surge with the power of the seas, using it to manipulate the waves or create water. These genies typically dwell in or near bodies of water. While gentle marids make homes amid springs, oases, and serene pools, tempestuous marids inhabit sea stacks, whirlpools, and treacherous coasts. Marids vary in appearance, their bodies reflecting the colors of the waves while distinctive fins and scales accent their features. Marids lend their powers and knowledge of the seas to those who defend the marids' watery realms or who offer them pleasing gifts. Marids appreciate rare aquatic treasures, such as colorful pearls, shell instruments, or delicacies from distant seas. Marids hail from the Elemental Plane of Water, where they live in wondrous homes drifting amid the endless ocean. Among these is the Citadel of Ten Thousand Pearls—a coral sphere studded with dozens of domed theaters and libraries—and the air-filled, cosmopolitan City of Glass.
  - Amphibious: The marid can breathe air and water.
  - Elemental Restoration: If the marid dies outside the Elemental Plane of Water, its body dissolves into brine, and it gains a new body in 1d4 days, reviving with all its Hit Points somewhere on the Plane of Water.
  - Wishes: The marid has a 30 percent chance of knowing the Wish spell. If the marid knows it, the marid can cast it only on behalf of a non-genie creature who communicates a wish in a way the marid can understand. If the marid casts the spell for the creature, the marid suffers none of the spell's stress. Once the marid has cast it three times, the marid can't do so again for 365 days.
  - Multiattack: The marid makes three Aquatic Lash attacks.
  - Aquatic Lash: m 10, reach 15 ft. {@h}15 (2d8 + 6) Slashing damage plus 9 (2d8) Cold damage.
  - Water Jet: dex 18, each creature in a 60-foot-long, 10-foot-wide Line. {@actSaveFail} 31 (9d6) Cold damage. If the target is a Huge or smaller creature, it is pushed up to 20 feet straight away from the marid and has the Prone condition. {@actSaveSuccess} Half damage only.
  - Spellcasting (conjuros): The marid casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 16): Create or Destroy Water Detect Evil and Good Detect Magic Purify Food and Drink Control Water Gaseous Form Invisibility Plane Shift Tongues
  - Misty Veil {@recharge 5} (conjuros): The marid casts Fog Cloud, using the same spellcasting ability as Spellcasting.

### [mind-flayer-arcanist] Mind Flayer Arcanist — desafío 11, Mediano Aberración
  - Magic Resistance: The mind flayer has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The mind flayer makes three Arcane Tentacles attacks.
  - Arcane Tentacles: m,r 9, reach 5 ft. or range 120 ft. {@h}27 (4d10 + 5) Psychic damage, and the mind flayer can teleport the target up to 30 feet to an unoccupied space the mind flayer can see on a surface or liquid large enough to support the target. If this damage reduces the target to 0 Hit Points, the mind flayer kills it and magically devours its brain.
  - Mind Burst (Recarga 5–6): int 17, each creature in a 40-foot Emanation originating from the mind flayer. {@actSaveFail} 41 (8d8 + 5) Psychic damage, and the target has the Stunned condition until the end of the mind flayer's next turn. {@actSaveSuccess} Half damage only.
  - Spellcasting (conjuros): The mind flayer casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save 17): Detect Magic Detect Thoughts Disguise Self Mage Hand (the hand is Invisible) Clairvoyance Dimension Door Fireball (level 5 version) Lightning Bolt (level 5 version) Plane Shift (self only) Sending
  - Shield (2/Day) (conjuros): The mind flayer casts Shield in response to that spell's trigger, using the same spellcasting ability as Spellcasting. Shield

### [remorhaz] Remorhaz — desafío 11, Enorme Monstruosidad
  - Heat Aura: At the end of each of the remorhaz's turns, each creature in a 5-foot Emanation originating from the remorhaz takes 16 (3d10) Fire damage.
  - Bite: m 11, reach 10 ft. {@h}18 (2d10 + 7) Piercing damage plus 14 (4d6) Fire damage. If the target is a Large or smaller creature, it has the Grappled condition (escape 17), and it has the Restrained condition until the grapple ends.
  - Swallow: str 19, one Large or smaller creature Grappled by the remorhaz (it can have up to two creatures swallowed at a time). {@actSaveFail} The target is swallowed by the remorhaz, and the Grappled condition ends. A swallowed creature has the Blinded and Restrained conditions, it has Total Cover against attacks and other effects outside the remorhaz, and it takes 10 (3d6) Acid damage plus 10 (3d6) Fire damage at the start of each of the remorhaz's turns. If the remorhaz takes 30 damage or more on a single turn from a creature inside it, the remorhaz must succeed on a 15 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the remorhaz and has the Prone condition. If the remorhaz dies, any swallowed creature no longer has the Restrained condition and can escape from the corpse by using 15 feet of movement, exiting Prone.

### [roc] Roc — desafío 11, Gargantuesco Monstruosidad
Descripción oficial: [Roc] Avian of Unbelievable Size [Habitat:] Arctic, Coastal, Desert, Hill, Mountain [Treasure:] Any Birds of prey of fantastic scale, rocs hunt over vast territories and can snatch whole elephants, whales, or wagons in their talons. They then carry their prey back to their remote nests, journeys that can take days and cover hundreds of miles. Rocs nest amid remote heights. Their nests are typically littered with treasure and uneaten prey. Roll on or choose an option from the Roc Nest Remnants table to inspire what's in a roc's nest. Roc Nest Remnants / 1 | The burial litter of a lost hero. / 2 | A caravan wagon full of trade goods. / 3 | A live elephant. / 4 | 1d4 eggs larger than adult humans. / 5 | Someone marooned in the nest. / 6 | A statue of a knight riding a rearing steed.
  - Multiattack: The roc makes two Beak attacks. It can replace one attack with a Talons attack.
  - Beak: m 13, reach 10 ft. {@h}28 (3d12 + 9) Piercing damage.
  - Talons: m 13, reach 5 ft. {@h}23 (4d6 + 9) Slashing damage. If the target is a Huge or smaller creature, it has the Grappled condition (escape 19) from both talons, and it has the Restrained condition until the grapple ends.
  - Swoop (Recarga 5–6): If the roc has a creature Grappled, the roc flies up to half its Fly Speed without provoking Opportunity Attacks and drops that creature.

### [sphinx-of-lore] Sphinx of Lore — desafío 11, Grande Celestial
  - Inscrutable: No magic can observe the sphinx remotely or detect its thoughts without its permission. Wisdom (Insight) checks made to ascertain its intentions or sincerity are made with Disadvantage.
  - Legendary Resistance (3/Day, or 4/Day in Lair): If the sphinx fails a saving throw, it can choose to succeed instead.
  - Multiattack: The sphinx makes three Claw attacks.
  - Claw: m 8, reach 5 ft. {@h}14 (3d6 + 4) Slashing damage.
  - Mind-Rending Roar (Recarga 5–6): wis 16, each enemy in a 300-foot Emanation originating from the sphinx. {@actSaveFail} 35 (10d6) Psychic damage, and the target has the Incapacitated condition until the start of the sphinx's next turn.
  - Arcane Prowl: The sphinx can teleport up to 30 feet to an unoccupied space it can see, and it makes one Claw attack.
  - Weight of Years: con 16, one creature the sphinx can see within 120 feet. {@actSaveFail} The target gains 1 Exhaustion level. While the target has any Exhaustion levels, it appears 3d10 years older. {@actSaveSuccessOrFail} The sphinx can't take this action again until the start of its next turn.
  - Spellcasting (conjuros): The sphinx casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save 16): Detect Magic Identify Mage Hand Minor Illusion Prestidigitation Dispel Magic Legend Lore Locate Object Plane Shift Remove Curse Tongues

### [arcanaloth] Arcanaloth — desafío 12, Mediano Infernal
Descripción oficial: [Arcanaloth] Yugoloth of Magical Manipulation [Habitat:] Planar (Lower Planes) [Treasure:] Arcana While all yugoloths are fiendish manifestations of wickedness and greed, arcanaloths bend their considerable intellects toward hoarding and exploiting secrets. They then deploy these secrets to ensnare countless victims and lesser villains, beguiling foes with false promises and powerful magic. Arcanaloths possess considerable spellcasting prowess and frequently disguise themselves with magic. While they prefer to let magical servants or other yugoloths do their fighting for them, arcanaloths can defend themselves with arcane might, banishing opponents into the pages of their magic tomes.
  - Fiendish Restoration: If the arcanaloth dies outside Gehenna, its body dissolves into ichor, and it gains a new body instantly and revives with all its Hit Points in Gehenna.
  - Magic Resistance: The arcanaloth has Advantage on saving throws against spells and other magical effects.
  - Soul Tome: The arcanaloth has a magic tome. While holding or carrying the tome, the arcanaloth can use its Banishing Claw action. The tome has AC 17; HP 35; and Immunity to Necrotic, Poison, and Psychic damage. The tome regains all its Hit Points at the end of every turn, but it turns to dust if reduced to 0 Hit Points or when the arcanaloth dies. If the tome is destroyed, the arcanaloth can create a new one when it finishes a Short or Long Rest.
  - Multiattack: The arcanaloth makes three Fiendish Burst attacks. It can replace one attack with a Banishing Claw attack.
  - Fiendish Burst: m,r 9, reach 5 ft. or range 120 ft. {@h}31 (4d12 + 5) Necrotic damage.
  - Banishing Claw (Requires Soul Tome): m 9, reach 5 ft. {@h}10 (2d4 + 5) Slashing damage plus 19 (3d12) Psychic damage. If the target is a creature, it is subjected to the following effect. cha 17. {@actSaveFail} The target is trapped in a demiplane inside the Soul Tome. While trapped there, the target has the Incapacitated condition. At the end of each of its turns, the target repeats the save, escaping the tome on a success. When the target escapes, it appears in the space it left or, if that space is occupied, the nearest unoccupied space. If the target fails three of these saves while in the demiplane, it becomes bound to the tome and can escape only if the tome is reduced to 0 Hit Points.
  - Teleport: The arcanaloth teleports up to 30 feet to an unoccupied space it can see.
  - Spellcasting (conjuros): The arcanaloth casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save 17): Alter Self Detect Magic Identify Mage Hand Prestidigitation Contact Other Plane Detect Thoughts Dimension Door Mind Blank
  - Counterspell (conjuros): The arcanaloth casts Counterspell in response to that spell's trigger, using the same spellcasting ability as Spellcasting. Counterspell

### [archmage] Archmage — desafío 12, Pequeño o Mediano Humanoide
  - Magic Resistance: The archmage has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The archmage makes four Arcane Burst attacks.
  - Arcane Burst: m,r 9, reach 5 ft. or range 150 ft. {@h}27 (4d10 + 5) Force damage.
  - Spellcasting (conjuros): The archmage casts one of the following spells, using Intelligence as the spellcasting ability (spell save 17): Detect Magic Detect Thoughts Disguise Self Invisibility Light Mage Armor (included in AC) Mage Hand Prestidigitation Fly Lightning Bolt (level 7 version) Cone of Cold (level 9 version) Mind Blank (cast before combat) Scrying Teleport
  - Misty Step (3/Day) (conjuros): The mage casts Misty Step, using the same spellcasting ability as Spellcasting. Misty Step
  - Protective Magic (3/Day) (conjuros): The archmage casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting. Counterspell Shield

### [archpriest] Archpriest — desafío 12, Pequeño o Mediano Humanoide
  - Multiattack: The archpriest makes three Radiant Burst attacks.
  - Radiant Burst: m,r 9, reach 5 ft. or range 60 ft. {@h}27 (4d10 + 5) Radiant damage.
  - Holy Word (Recarga 4–6): wis 17, each enemy in a 20-foot Emanation originating from the archpriest. {@actSaveFail} 21 (6d6) Radiant damage, and the target has the Stunned condition until the end of the archpriest's next turn. {@actSaveSuccess} Half damage only.
  - Spellcasting (conjuros): The archpriest casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save 17): Light Thaumaturgy Flame Strike (level 6 version) Greater Restoration Raise Dead Zone of Truth
  - Divine Aid (3/Day) (conjuros): The priest casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting. Bless Dispel Magic Healing Word Lesser Restoration

### [erinyes] Erinyes — desafío 12, Mediano Infernal
Descripción oficial: [Erinyes] Devil of Vengeance and Righteous Wrath [Habitat:] Planar (Nine Hells) [Treasure:] Armaments Erinyes, also known as furies, are winged devils clad in fiendish armor. These fallen angels exact a merciless form of divine justice, hunting down oath breakers and dragging the rightfully damned to the Nine Hells in the grip of their magical ropes. Few ever glimpse what lies within these devils' armored exteriors, and erinyes ensure that those who do can never speak of what they've seen. Erinyes often serve archdevils and guard the order of the Nine Hells against trespassers and escapees. Although they're prone to wrathful outbursts, erinyes cooperate well with other devils. They sometimes hunt in trios with other erinyes, forging infamous reputations for themselves. When not in the service of a diabolical master, erinyes hunt wicked souls. They pursue quarries relentlessly, across the multiverse and for ages if need be. While they might be summoned to serve evil magic-users, erinyes also listen for oaths and curses sworn in their names. In rare cases, wronged mortals who call out with just rage might be heard by an erinyes who appears to take vengeance on their behalf. Once erinyes are so summoned, they won't leave without claiming the soul of either their quarry or the mortal who summoned them.
  - Diabolical Restoration: If the erinyes dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.
  - Magic Resistance: The erinyes has Advantage on saving throws against spells and other magical effects.
  - Magic Rope: The erinyes has a magic rope. While bearing it, the erinyes can use the Entangling Rope action. The rope has AC 20, HP 90, and Immunity to Poison and Psychic damage. The rope turns to dust if reduced to 0 Hit Points, if it is 5+ feet away from the erinyes for 1 hour or more, or if the erinyes dies. If the rope is damaged or destroyed, the erinyes can fully restore it when finishing a Short or Long Rest.
  - Multiattack: The erinyes makes three Withering Sword attacks and can use Entangling Rope.
  - Withering Sword: m 8, reach 5 ft. {@h}13 (2d8 + 4) Slashing damage plus 11 (2d10) Necrotic damage.
  - Entangling Rope (Requires Magic Rope): str 16, one creature the erinyes can see within 120 feet. {@actSaveFail} 14 (4d6) Force damage, and the target has the Restrained condition until the rope is destroyed, the erinyes uses a Bonus Action to release the target, or the erinyes uses Entangling Rope again.
  - Parry: {@actTrigger} The erinyes is hit by a melee attack roll while holding a weapon. {@actResponse} The erinyes adds 4 to its AC against that attack, possibly causing it to miss.

### [githzerai-psion] Githzerai Psion — desafío 12, Mediano Aberración
  - Multiattack: The githzerai makes three Psychic Warp attacks.
  - Psychic Warp: m,r 8, reach 5 ft. or range 120 ft. {@h}26 (4d10 + 4) Psychic damage, and the target has the githzerai's choice of (A) the Charmed condition until the start of the githzerai's next turn or (B) the Prone condition, provided the target is a Large or smaller creature.
  - Spellcasting (conjuros): The githzerai casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save 16): Mage Hand (the hand is Invisible) Plane Shift See Invisibility
  - Psionic Defense (conjuros): The githzerai casts Feather Fall or Shield in response to the spell's trigger, requiring no spell components and using the same spellcasting ability as Spellcasting. Feather Fall Shield

### [pirate-admiral] Pirate Admiral — desafío 12, Pequeño o Mediano Humanoide
  - Multiattack: The pirate makes three attacks, using Scimitar or Pistol in any combination.
  - Scimitar: m 10, reach 5 ft. {@h}16 (3d6 + 6) Slashing damage plus 7 (2d6) Poison damage, and the target suffers one of the following effects of the pirate's choice: [Awestruck] The target has the Charmed condition until the start of the pirate's next turn. [Poison] The target has the Poisoned condition until the start of the pirate's next turn.
  - Pistol: r 10, range 30/90 ft. {@h}28 (4d10 + 6) Piercing damage.
  - Rally (1/Day): The pirate chooses up to three other creatures it can see within 30 feet. Until the start of the pirate's next turn, the targets have Advantage on attack rolls and saving throws.
  - Defensive Stance: {@actTrigger} The pirate is hit by a melee attack roll while holding a weapon. {@actResponse} The pirate adds 4 to its AC against melee attack rolls (including the triggering attack) until the start of its next turn, possibly causing the attacks to miss.

### [questing-knight] Questing Knight — desafío 12, Pequeño o Mediano Humanoide
  - Aura of Bravery: Creatures of the knight's choice in a 30-foot Emanation originating from it have Immunity to the Charmed and Frightened conditions while there.
  - Multiattack: The knight makes three attacks, using Greatsword or Longbow in any combination.
  - Greatsword: m 9, reach 5 ft. {@h}12 (2d6 + 5) Slashing damage plus 22 (5d8) Radiant damage.
  - Longbow: r 7, range 150/600 ft. {@h}12 (2d8 + 3) Piercing damage plus 22 (5d8) Radiant damage.
  - Spellcasting (conjuros): The knight casts one of the following spells, using Charisma as the spellcasting ability (spell save 16): Daylight Dispel Evil and Good Greater Restoration Phantom Steed

### [adult-brass-dragon] Adult Brass Dragon — desafío 13, Enorme Dragón
  - Legendary Resistance (3/Day, or 4/Day in Lair): If the dragon fails a saving throw, it can choose to succeed instead.
  - Multiattack: The dragon makes three Rend attacks. It can replace one attack with a use of (A) Sleep Breath or (B) Spellcasting to cast Scorching Ray.
  - Rend: m 11, reach 10 ft. {@h}17 (2d10 + 6) Slashing damage plus 4 (1d8) Fire damage.
  - Fire Breath (Recarga 5–6): dex 18, each creature in a 60-foot-long, 5-foot-wide Line. {@actSaveFail} 45 (10d8) Fire damage. {@actSaveSuccess} Half damage.
  - Sleep Breath: con 18, each creature in a 60-foot Cone. {@actSaveFail} The target has the Incapacitated condition until the end of its next turn, at which point it repeats the save. 2 The target has the Unconscious condition for 10 minutes. This effect ends for the target if it takes damage or a creature within 5 feet of it takes an action to wake it.
  - Blazing Light: The dragon uses Spellcasting to cast Scorching Ray.
  - Pounce: The dragon moves up to half its Speed, and it makes one Rend attack.
  - Scorching Sands: dex 16, one creature the dragon can see within 120 feet. {@actSaveFail} 27 (6d8) Fire damage, and the target's Speed is halved until the end of its next turn. {@actSaveSuccessOrFail} The dragon can't take this action again until the start of its next turn.
  - Spellcasting (conjuros): The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 16): Detect Magic Minor Illusion Scorching Ray Shapechange (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell) Speak with Animals Detect Thoughts Control Weather

### [adult-white-dragon] Adult White Dragon — desafío 13, Enorme Dragón
  - Ice Walk: The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, Difficult Terrain composed of ice or snow doesn't cost it extra movement.
  - Legendary Resistance (3/Day, or 4/Day in Lair): If the dragon fails a saving throw, it can choose to succeed instead.
  - Multiattack: The dragon makes three Rend attacks.
  - Rend: m 11, reach 10 ft. {@h}13 (2d6 + 6) Slashing damage plus 4 (1d8) Cold damage.
  - Cold Breath (Recarga 5–6): con 19, each creature in a 60-foot Cone. {@actSaveFail} 54 (12d8) Cold damage. {@actSaveSuccess} Half damage.
  - Freezing Burst: con 14, each creature in a 30-foot-radius Sphere centered on a point the dragon can see within 120 feet. {@actSaveFail} 7 (2d6) Cold damage, and the target's Speed is 0 until the end of the target's next turn. {@actSaveSuccessOrFail} The dragon can't take this action again until the start of its next turn.
  - Pounce: The dragon moves up to half its Speed, and it makes one Rend attack.
  - Frightful Presence (conjuros): The dragon casts Fear, requiring no Material components and using Charisma as the spellcasting ability (spell save 14). The dragon can't take this action again until the start of its next turn.

### [beholder] Beholder — desafío 13, Grande Aberración
Descripción oficial: [Beholder] Infamous Many-Eyed Tyrant [Habitat:] Underdark [Treasure:] Arcana Beholders—also known as eye tyrants—number among the most notorious inhabitants of the Underdark. Few creatures in the multiverse are as loathed and feared as these maniacal horrors. A beholder's distinctive, globular body is dominated by an oversize maw and a gigantic central eye. Ten stalks ending in smaller eyes crown its form. From each of these eleven eyes, a beholder can unleash a different magic power. The central eye can deactivate magic, while the smaller eyes emit rays that inflict various dooms—such as petrifying creatures, disintegrating them, slaying them outright, or other effects. Beholders possess utterly alien minds. Most exhibit paranoid, narcissistic, and megalomaniacal tendencies, and they act on agendas beyond human reasoning. While some keep to themselves, others force weaker creatures into their service. Still others cultivate grand ambitions, creating networks of minions to manipulate groups, settlements, and whole nations in the Underdark and sometimes the surface world. Few creatures loathe beholders more than other beholders. Every beholder views itself as the physical and intellectual pinnacle of its species. To them, all other beholders are aberrant rivals to be dominated or destroyed. Conflicts between beholders can last for decades and lay waste to vast subterranean realms. Beholders are a particular threat to adventurers because both gravitate toward mysterious ruins and sites of great magic. Many beholders collect the magic items and petrified bodies of heroes they've defeated, displaying them as trophies. [Beholder Lairs] Beholders lurk in cavern complexes they've carved using their eye rays deep in the Underdark or in lairs created for them by their servants.
  - Legendary Resistance (3/Day, or 4/Day in Lair): If the beholder fails a saving throw, it can choose to succeed instead.
  - Multiattack: The beholder uses Eye Rays three times.
  - Bite: m 8, reach 5 ft. {@h}13 (3d6 + 3) Piercing damage.
  - Eye Rays: The beholder randomly shoots one of the following magical rays at a target it can see within 120 feet of itself (roll 1d10; reroll if the beholder has already used that ray during this turn): [1: Charm Ray] wis 16. {@actSaveFail} 13 (3d8) Psychic damage, and the target has the Charmed condition for 1 hour or until it takes damage. {@actSaveSuccess} Half damage only. [2: Paralyzing Ray] con 16. {@actSaveFail} The target has the Paralyzed condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. [3: Fear Ray] wis 16. {@actSaveFail} 14 (4d6) Psychic damage, and the target has the Frightened condition until the end of its next turn. {@actSaveSuccess} Half damage only. [4: Slowing Ray] con 16. {@actSaveFail} 18 (4d8) Necrotic damage. Until the end of the target's next turn, the target's Speed is halved; the target can't take Reactions; and it can take either an action or a Bonus Action on its turn, not both. {@actSaveSuccess} Half damage only. [5: Enervation Ray] con 16. {@actSaveFail} 13 (3d8) Poison damage, and the target has the Poisoned condition until the end of its next turn. While Poisoned, the target can't regain Hit Points. {@actSaveSuccess} Half damage only. [6: Telekinetic Ray] str 16 (the target succeeds automatically if it is Gargantuan). {@actSaveFail} The beholder moves the target up to 30 feet in any direction. The target has the Restrained condition until the start of the beholder's next turn or until the beholder has the Incapacitated condition. The beholder can also exert fine control on objects with this ray, such as manipulating a tool or opening a door or container. [7: Sleep Ray] wis 16 (the target succeeds automatically if it is a Construct or an Undead). {@actSaveFail} The target has the Unconscious condition for 1 minute. The condition ends if the target takes damage or a creature within 5 feet of it takes an action to wake it. [8: Petrification Ray] con 16. 1 The target has the Restrained condition and repeats the save at the end of its next turn if it is still Restrained, ending the effect on itself on a success. 2 The target has the Petrified condition instead of the Restrained condition. [9: Disintegration Ray] dex 16. {@actSaveFail} 36 (8d8) Force damage. If the target is a nonmagical object or a creation of magical force, a 10-foot Cube of it disintegrates into dust. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} If the target is a creature and this damage reduces it to 0 Hit Points, it disintegrates into dust. [10: Death Ray] dex 16. {@actSaveFail} 55 (10d10) Necrotic damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} The target dies if the ray reduces it to 0 Hit Points.
  - Antimagic Cone: The beholder's central eye emits an antimagic wave in a 150-foot Cone. Until the start of the beholder's next turn, that area acts as an Antimagic Field spell, and that area works against the beholder's own Eye Rays.
  - Chomp: The beholder makes two Bite attacks.
  - Glare: The beholder uses Eye Rays.

### [nalfeshnee] Nalfeshnee — desafío 13, Grande Infernal
Descripción oficial: [Nalfeshnee] Demon of Intimidation and Hopelessness [Habitat:] Planar (Abyss) [Treasure:] Relics Nalfeshnees seek to dominate all they encounter. Hulking and grotesque, these demons combine misshapen, bestial features with ogre-like frames. Through both brute force and cunning, nalfeshnees compel cultists and weaker demons to serve them in the endless conflicts of the Abyss or in plots on the Material Plane. Many nalfeshnees view themselves as prospective demon lords and seek to conquer realms of their own. They often use promises of fiendish magic or Abyssal alliances to tempt ambitious mortals into ruinous pacts. Should they run out of patience, nalfeshnees conjure visions of the Abyss and other nightmares to terrorize others into obeying. The Blood War—that ageless clash between devils and demons—helps ensure the balance of the multiverse. At times it makes unlikely allies, but never delude yourself into believing there's a lesser of two evil. I won't be thanking a demon for every day I'm spared a devil's lash.
  - Demonic Restoration: If the nalfeshnee dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss.
  - Magic Resistance: The nalfeshnee has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The nalfeshnee makes three Rend attacks.
  - Rend: m 10, reach 10 ft. {@h}16 (2d10 + 5) Slashing damage plus 11 (2d10) Force damage.
  - Teleport: The nalfeshnee teleports up to 120 feet to an unoccupied space it can see.
  - Horror Nimbus (Recarga 5–6): wis 15, each creature in a 15-foot Emanation originating from the nalfeshnee. {@actSaveFail} 28 (8d6) Psychic damage, and the target has the Frightened condition for 1 minute, until it takes damage, or until it ends its turn with the nalfeshnee out of line of sight. {@actSaveSuccess} The target is immune to this nalfeshnee's Horror Nimbus for 24 hours.
  - Pursuit: {@actTrigger} Another creature the nalfeshnee can see ends its move within 120 feet of the nalfeshnee. {@actResponse} The nalfeshnee uses Teleport, but its destination space must be within 10 feet of the triggering creature.

### [rakshasa] Rakshasa — desafío 13, Mediano Infernal
Descripción oficial: [Rakshasa] Deceiver Hungry for Power and Flesh [Habitat:] Planar (Nine Hells), Urban [Treasure:] Relics Masters of manipulation, rakshasas infiltrate communities to claim positions of power. While disguising their true natures, they kidnap victims and indulge their insatiable hunger for flesh. Rakshasas can withstand some degree of magic, but legends tell of blessed warriors felling them with crossbow bolts, arrows, or similar weapons. Rakshasas' appearances combine humanlike bodies with the features of animals and monsters. All rakshasas have a physical oddity that remains when they adopt magical disguises, such as palms where the backs of the hands would be on humans.
  - Greater Magic Resistance: The rakshasa automatically succeeds on saving throws against spells and other magical effects, and the attack rolls of spells automatically miss it. Without the rakshasa's permission, no spell can observe the rakshasa remotely or detect its thoughts, creature type, or alignment.
  - Fiendish Restoration: If the rakshasa dies outside the Nine Hells, its body turns to ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.
  - Multiattack: The rakshasa makes three Cursed Touch attacks.
  - Cursed Touch: m 10, reach 5 ft. {@h}12 (2d6 + 5) Slashing damage plus 19 (3d12) Necrotic damage. If the target is a creature, it is cursed. While cursed, the target gains no benefit from finishing a Short or Long Rest.
  - Baleful Command (Recarga 5–6): wis 18, each enemy in a 30-foot Emanation originating from the rakshasa. {@actSaveFail} 28 (8d6) Psychic damage, and the target has the Frightened and Incapacitated conditions until the start of the rakshasa's next turn.
  - Spellcasting (conjuros): The rakshasa casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 18): Detect Magic Detect Thoughts Disguise Self Mage Hand Minor Illusion Fly Invisibility Major Image Plane Shift

### [shadow-dragon] Shadow Dragon — desafío 13, Enorme Dragón
  - Legendary Resistance (3/Day, or 4/Day in Lair): If the dragon fails a saving throw, it can choose to succeed instead.
  - Living Shadow: While in Dim Light or Darkness, the dragon has Resistance to damage that isn't Force, Psychic, or Radiant.
  - Sunlight Sensitivity: While in sunlight, the dragon has Disadvantage on ability checks and attack rolls.
  - Multiattack: The dragon makes three Rend attacks.
  - Rend: m 10, reach 10 ft. {@h}12 (2d6 + 5) Slashing damage plus 3 (1d6) Necrotic damage.
  - Shadow Breath (Recarga 5–6): dex 17, each creature in a 60-foot Cone. {@actSaveFail} 35 (10d6) Necrotic damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} A Humanoid reduced to 0 Hit Points by this damage dies, and a Shadow rises from the corpse. The shadow is under the dragon's control and shares the dragon's Initiative count but acts immediately after the dragon.
  - Shadow Stealth: While in Dim Light or Darkness, the dragon takes the Hide action.
  - Pounce: The dragon moves up to half its Speed, and it makes one Rend attack.
  - Veil of Shadow: The dragon uses Shadow Stealth, and one creature of its choice that it can see within 10 feet of it takes 10 (3d6) Necrotic damage. The dragon can't take this action again until the start of its next turn.

### [storm-giant] Storm Giant — desafío 13, Enorme Gigante
Descripción oficial: [Storm Giant] Giant of Seas and Skies [Habitat:] Coastal, Underwater [Treasure:] Armaments Among the tallest giants, storm giants live amid extreme forces of nature. In palaces at the bottom of the sea and castles floating amid the clouds, they revel in the power of mighty storms. When angered, they can shape the weather and call down devastating lightning. More often, though, these giants watch the rise and fall of nations and interpret supernatural omens, interfering in the world only when they're needed most.
  - Amphibious: The giant can breathe air and water.
  - Multiattack: The giant makes two attacks, using Storm Sword or Thunderbolt in any combination.
  - Storm Sword: m 14, reach 10 ft. {@h}23 (4d6 + 9) Slashing damage plus 13 (3d8) Lightning damage.
  - Thunderbolt: r 14, range 500 ft. {@h}22 (2d12 + 9) Lightning damage, and the target has the Blinded and Deafened conditions until the start of the giant's next turn.
  - Lightning Storm (Recarga 5–6): dex 18, each creature in a 10-foot-radius, 40-foot-high Cylinder originating from a point the giant can see within 500 feet. {@actSaveFail} 55 (10d10) Lightning damage. {@actSaveSuccess} Half damage.
  - Spellcasting (conjuros): The giant casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save 18): Detect Magic Light Control Weather

### [ultroloth] Ultroloth — desafío 13, Mediano Infernal
Descripción oficial: [Ultroloth] Yugoloth of Conspiracy and Control [Habitat:] Planar (Lower Planes) [Treasure:] Armaments With uncanny patience and fiendish cunning, ultroloths manipulate mortals and their fellow yugoloths alike, seeking to hoard power and spread suffering. These sinister masterminds often work with other yugoloths, but they might compel nearly any creature into their service. If coercion doesn't work, ultroloths use their eerie eyes and innate magic to hypnotize or charm targets. Ultroloths strive to achieve planes-spanning plots. Roll on or choose a result from the Ultroloth Conspiracies table to inspire such villainy. Ultroloth Conspiracies / 1 | Convince cultists their god has forsaken them. / 2 | Destabilize a nation and rule the chaos. / 3 | Incite a calamity and hold a world hostage. / 4 | Provoke hostilities between immortal armies and sell magic weapons to both sides. / 5 | Steal an invention and slay all who know of it. / 6 | Unleash fiendish hordes on a foe's homeland.
  - Fiendish Restoration: If the ultroloth dies outside Gehenna, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in Gehenna.
  - Magic Resistance: The ultroloth has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The ultroloth uses Hypnotic Gaze and makes two Mercurial Whip attacks.
  - Mercurial Whip: m 9, reach 15 ft. {@h}25 (6d6 + 4) Force damage, and the ultroloth can teleport the target up to 10 feet to an unoccupied space the ultroloth can see that isn't in the air.
  - Hypnotic Gaze: wis 17, each creature in a 30-foot Cone. {@actSaveFail} 10 (3d6) Psychic damage, and the target has the Stunned condition until the start of the ultroloth's next turn. {@actSaveSuccess} The target is immune to this ultroloth's Hypnotic Gaze for 24 hours.
  - Spellcasting (conjuros): The ultroloth casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save 17): Alter Self Clairvoyance Detect Magic Dimension Door Fireball (level 5 version) Wall of Fire
  - Fiendish Guile {@recharge 4} (conjuros): The ultroloth casts Dispel Magic, Invisibility (self only), Misty Step, or Suggestion, requiring no Material components and using the same spellcasting ability as Spellcasting.

### [vampire] Vampire — desafío 13, Pequeño o Mediano Muerto viviente
  - Legendary Resistance (3/Day, or 4/Day in Lair): If the vampire fails a saving throw, it can choose to succeed instead.
  - Misty Escape: If the vampire drops to 0 Hit Points outside its resting place, the vampire uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed. While it has 0 Hit Points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and has the Paralyzed condition until it regains any Hit Points, and it regains 1 Hit Point after spending 1 hour there.
  - Spider Climb: The vampire can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - Vampire Weakness: The vampire has these weaknesses: [Forbiddance] The vampire can't enter a residence without an invitation from an occupant. [Running Water] The vampire takes 20 Acid damage if it ends its turn in running water. [Stake to the Heart] If a weapon that deals Piercing damage is driven into the vampire's heart while the vampire has the Incapacitated condition in its resting place, the vampire has the Paralyzed condition until the weapon is removed. [Sunlight] The vampire takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.
  - Multiattack (Vampire Form Only): The vampire makes two Grave Strike attacks and uses Bite.
  - Grave Strike (Vampire Form Only): m 9, reach 5 ft. {@h}8 (1d8 + 4) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape 14) from one of two hands.
  - Bite (Bat or Vampire Form Only): con 17, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. {@actSaveFail} 6 (1d4 + 4) Piercing damage plus 13 (3d8) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the vampire regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Vampire Spawn under the vampire's control.
  - Shape-Shift: If the vampire isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it. While in bat form, the vampire can't speak. Its game statistics, other than its size and Speed, are unchanged. While in mist form, the vampire can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.
  - Deathless Strike: The vampire moves up to half its Speed, and it makes one Grave Strike attack.
  - Charm {@recharge 5} (conjuros): The vampire casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save 17), and the duration is 24 hours. The Charmed target is a willing recipient of the vampire's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by the vampire.
  - Beguile (conjuros): The vampire casts Command, requiring no spell components and using Charisma as the spellcasting ability (spell save 17). The vampire can't take this action again until the start of its next turn.

### [adult-black-dragon] Adult Black Dragon — desafío 14, Enorme Dragón
  - Amphibious: The dragon can breathe air and water.
  - Legendary Resistance (3/Day, or 4/Day in Lair): If the dragon fails a saving throw, it can choose to succeed instead.
  - Multiattack: The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Melf's Acid Arrow (level 3 version).
  - Rend: m 11, reach 10 ft. {@h}13 (2d6 + 6) Slashing damage plus 4 (1d8) Acid damage.
  - Acid Breath (Recarga 5–6): dex 18, each creature in a 60-foot-long, 5-foot-wide Line. {@actSaveFail} 54 (12d8) Acid damage. {@actSaveSuccess} Half damage.
  - Cloud of Insects: dex 17, one creature the dragon can see within 120 feet. {@actSaveFail} 22 (4d10) Poison damage, and the target has Disadvantage on saving throws to maintain Concentration until the end of its next turn. {@actSaveSuccessOrFail} The dragon can't take this action again until the start of its next turn.
  - Frightful Presence: The dragon uses Spellcasting to cast Fear. The dragon can't take this action again until the start of its next turn.
  - Pounce: The dragon can move up to half its Speed, and it makes one Rend attack.
  - Spellcasting (conjuros): The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 17, 9 to hit with spell attacks): Detect Magic Fear Melf's Acid Arrow (level 3 version) Speak with Dead Vitriolic Sphere

### [adult-copper-dragon] Adult Copper Dragon — desafío 14, Enorme Dragón
  - Legendary Resistance (3/Day, or 4/Day in Lair): If the dragon fails a saving throw, it can choose to succeed instead.
  - Multiattack: The dragon makes three Rend attacks. It can replace one attack with a use of (A) Slowing Breath or (B) Spellcasting to cast Mind Spike (level 4 version).
  - Rend: m 11, reach 10 ft. {@h}17 (2d10 + 6) Slashing damage plus 4 (1d8) Acid damage.
  - Acid Breath (Recarga 5–6): dex 18, each creature in an 60-foot-long, 5-foot-wide Line. {@actSaveFail} 54 (12d8) Acid damage. {@actSaveSuccess} Half damage.
  - Slowing Breath: con 18, each creature in a 60-foot Cone. {@actSaveFail} The target can't take Reactions; its Speed is halved; and it can take either an action or a Bonus Action on its turn, not both. This effect lasts until the end of its next turn.
  - Giggling Magic: cha 17, one creature the dragon can see within 90 feet. {@actSaveFail} 24 (7d6) Psychic damage. Until the end of its next turn, the target rolls 1d6 whenever it makes an ability check or attack roll and subtracts the number rolled from the D20 Test. {@actSaveSuccessOrFail} The dragon can't take this action again until the start of its next turn.
  - Mind Jolt: The dragon uses Spellcasting to cast Mind Spike (level 4 version). The dragon can't take this action again until the start of its next turn.
  - Pounce: The dragon moves up to half its Speed, and it makes one Rend attack.
  - Spellcasting (conjuros): The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 17): Detect Magic Mind Spike (level 4 version) Minor Illusion Shapechange (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell) Greater Restoration Major Image

### [death-tyrant] Death Tyrant — desafío 14, Grande Muerto viviente
Descripción oficial: [Death Tyrant] Beholder beyond Death [Habitat:] Underdark [Treasure:] Any A death tyrant is a beholder that pursues aberrant goals beyond its death. Ten magical singularities—all that remains of its magical eyes—orbit its floating, cyclopean skull, while the hateful gaze of its central eye socket stifles life and raises the dead. Beholders typically transform into death tyrants over years when their dreams fixate on death, morbid apotheoses, or journeys to realms inhospitable to life. Some death tyrants rise from the corpses of slain beholders or result from exposure to strange magic or Underdark radiation. Sometimes beholders purposefully pursue this undead state, just as depraved magic-users pursue lichdom, although it is rare, as most beholders already believe themselves to be perfect beings. No matter how death tyrants come into being, bizarre impulses drive their deathless existences. Their motivations tend to be extreme or beyond the reason of living creatures. [Death Tyrant Lairs] Death tyrants often lurk deep in the Underdark, in the tunnel-mazes they occupied in life or in the lairs of enemy beholders they conquered. These lairs are devoid of life, as death tyrants change their servants into Undead horrors. A cluster of tiny lights descended from a dark crevice in the ceiling. These motes cast an eerie glow on the great, alien skull that hung beneath them.
  - Legendary Resistance (3/Day, or 4/Day in Lair): If the death tyrant fails a saving throw, it can choose to succeed instead.
  - Multiattack: The death tyrant uses Eye Rays three times.
  - Bite: m 9, reach 5 feet. {@h}13 (2d8 + 4) Piercing damage.
  - Eye Rays: The death tyrant randomly shoots one of the following magical rays at a target it can see within 120 feet of itself (roll 1d10; reroll if the death tyrant has already used that ray during this turn): [1: Charm Ray] wis 17. {@actSaveFail} 13 (3d8) Psychic damage, and the target has the Charmed condition for 1 hour or until it takes damage. {@actSaveSuccess} Half damage only. [2: Paralyzing Ray] con 17. {@actSaveFail} The target has the Paralyzed condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. [3: Fear Ray] wis 17. {@actSaveFail} 10 (3d6) Psychic damage, and the target has the Frightened condition until the end of its next turn. {@actSaveSuccess} Half damage only. [4: Slowing Ray] con 17. {@actSaveFail} 18 (4d8) Necrotic damage. Until the end of the target's next turn, the target can't take Reactions; its Speed is halved; and it can take either an action or a Bonus Action on its turn, not both. {@actSaveSuccess} Half damage only. [5: Enervation Ray] con 17. {@actSaveFail} 16 (3d10) Poison damage, and the target has the Poisoned condition until the end of its next turn. While Poisoned, the target can't regain Hit Points. {@actSaveSuccess} Half damage only. [6: Telekinetic Ray] str 17 (the target succeeds automatically if it is Gargantuan). {@actSaveFail} The death tyrant moves the target up to 30 feet in any direction. The target has the Restrained condition until the start of the death tyrant's next turn or until the death tyrant has the Incapacitated condition. The death tyrant can also exert fine control on objects with this ray, such as manipulating a tool or opening a door or container. [7: Sleep Ray] wis 17 (the target succeeds automatically if it is a Construct or an Undead). {@actSaveFail} The target has the Unconscious condition for 1 minute. The condition ends if the target takes damage or a creature within 5 feet of it takes an action to wake it. [8: Petrification Ray] con 17. 1 The target has the Restrained condition and repeats the save at the end of its next turn if it is still Restrained, ending the effect on itself on a success. 2 The target has the Petrified condition instead of the Restrained condition. [9: Disintegration Ray] dex 17. {@actSaveFail} 36 (8d8) Force damage. If the target is a nonmagical object or a creation of magical force, a 10-foot Cube of it disintegrates into dust. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} If the target is a creature and this damage reduces it to 0 Hit Points, it disintegrates into dust. [10: Death Ray] dex 17. {@actSaveFail} 55 (10d10) Necrotic damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} The target dies if the ray reduces it to 0 Hit Points.
  - Negative Energy Cone: The death tyrant's central eye emits an imperceptible, magical wave of negative energy in a 150-foot Cone. Creatures in that area can't regain Hit Points until the start of the death tyrant's next turn. An intact Humanoid corpse there instantly rises as a Zombie under the death tyrant's control and takes its turn immediately after the death tyrant on the same initiative count.
  - Chomp: The death tyrant makes two Bite attacks.
  - Glare: The death tyrant uses Eye Rays.

### [ice-devil] Ice Devil — desafío 14, Grande Infernal
Descripción oficial: [Ice Devil] Devil of Antipathy and Intellectual Arrogance [Habitat:] Planar (Nine Hells) [Treasure:] Arcana Heartless strategists of the Nine Hells, ice devils—also known as gelugons—forsake emotion to indulge in their own malicious interpretations of logic. For them, the multiverse is a puzzle that must be solved to benefit them, their masters, and the Nine Hells. Ice devils act maliciously, disguising their whims as reason and strategy. In the service of evil masters, these insectile devils patiently plot the movements of infernal armies and scheme ways to fulfill wicked goals. They might also serve as guardians, owing to their martial prowess and ability to reshape battlefields with walls of ice. When indulging their own schemes, ice devils tempt mortals to forsake empathy and social connections to embrace selfish, destructive visions of intellectualism. After isolating victims, these devils drain them of their secrets or send them forth to spread fractious dogmas cloaked as reason. Ice devils usually lurk in frozen realms, particularly the frigid layer of Cania in the Nine Hells. Part of the charm of ice devils is that they always think they're smarter than you. Mmm—there are few pleasures sweeter than proving a devil wrong.
  - Diabolical Restoration: If the devil dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.
  - Magic Resistance: The devil has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The devil makes three Ice Spear attacks. It can replace one attack with a Tail attack.
  - Ice Spear: m,r 10, reach 5 ft. or range 30/120 ft. {@h}14 (2d8 + 5) Piercing damage plus 10 (3d6) Cold damage. Until the end of its next turn, the target can't take a Bonus Action or Reaction, its Speed decreases by 10 feet, and it can move or take one action on its turn, not both. {@hom}The spear magically returns to the devil's hand immediately after a ranged attack.
  - Tail: m 10, reach 10 ft. {@h}15 (3d6 + 5) Bludgeoning damage plus 18 (4d8) Cold damage.
  - Ice Wall {@recharge} (conjuros): The devil casts Wall of Ice (level 8 version), requiring no spell components and using Intelligence as the spellcasting ability (spell save 17).

### [adult-bronze-dragon] Adult Bronze Dragon — desafío 15, Enorme Dragón
  - Amphibious: The dragon can breathe air and water.
  - Legendary Resistance (3/Day, or 4/Day in Lair): If the dragon fails a saving throw, it can choose to succeed instead.
  - Multiattack: The dragon makes three Rend attacks. It can replace one attack with a use of (A) Repulsion Breath or (B) Spellcasting to cast Guiding Bolt (level 2 version).
  - Rend: m 12, reach 10 ft. {@h}16 (2d8 + 7) Slashing damage plus 5 (1d10) Lightning damage.
  - Lightning Breath (Recarga 5–6): dex 19, each creature in a 90-foot-long, 5-foot-wide Line. {@actSaveFail} 55 (10d10) Lightning damage. {@actSaveSuccess} Half damage.
  - Repulsion Breath: str 19, each creature in a 30-foot Cone. {@actSaveFail} The target is pushed up to 60 feet straight away from the dragon and has the Prone condition.
  - Guiding Light: The dragon uses Spellcasting to cast Guiding Bolt (level 2 version).
  - Pounce: The dragon moves up to half its Speed, and it makes one Rend attack.
  - Thunderclap: con 17, each creature in a 20-foot-radius Sphere centered on a point the dragon can see within 90 feet. {@actSaveFail} 10 (3d6) Thunder damage, and the target has the Deafened condition until the end of its next turn.
  - Spellcasting (conjuros): The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 17, 10 to hit with spell attacks): Detect Magic Guiding Bolt (level 2 version) Shapechange (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell) Speak with Animals Thaumaturgy Detect Thoughts Water Breathing

### [adult-green-dragon] Adult Green Dragon — desafío 15, Enorme Dragón
  - Amphibious: The dragon can breathe air and water.
  - Legendary Resistance (3/Day, or 4/Day in Lair): If the dragon fails a saving throw, it can choose to succeed instead.
  - Multiattack: The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Mind Spike (level 3 version).
  - Rend: m 11, reach 10 ft. {@h}15 (2d8 + 6) Slashing damage plus 7 (2d6) Poison damage.
  - Poison Breath (Recarga 5–6): con 18, each creature in a 60-foot Cone. {@actSaveFail} 56 (16d6) Poison damage. {@actSaveSuccess} Half damage.
  - Mind Invasion: The dragon uses Spellcasting to cast Mind Spike (level 3 version).
  - Noxious Miasma: con 17, each creature in a 20-foot-radius Sphere centered on a point the dragon can see within 90 feet. {@actSaveFail} 7 (2d6) Poison damage, and the target takes a -2 penalty to AC until the end of its next turn. {@actSaveSuccessOrFail} The dragon can't take this action again until the start of its next turn.
  - Pounce: The dragon moves up to half its Speed, and it makes one Rend attack.
  - Spellcasting (conjuros): The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 17): Detect Magic Mind Spike (level 3 version) Geas

### [mummy-lord] Mummy Lord — desafío 15, Pequeño o Mediano Muerto viviente
  - Legendary Resistance (3/Day, or 4/Day in Lair): If the mummy fails a saving throw, it can choose to succeed instead.
  - Magic Resistance: The mummy has Advantage on saving throws against spells and other magical effects.
  - Undead Restoration: If destroyed, the mummy gains a new body in 24 hours if its heart is intact, reviving with all its Hit Points. The new body appears in an unoccupied space within the mummy's lair. The heart is a Tiny object that has AC 17, HP 10, and Immunity to all damage except Fire.
  - Multiattack: The mummy makes one Rotting Fist or Channel Negative Energy attack, and it uses Dreadful Glare.
  - Rotting Fist: m 9, reach 5 ft. {@h}15 (2d10 + 4) Bludgeoning damage plus 10 (3d6) Necrotic damage. If the target is a creature, it is cursed. While cursed, the target can't regain Hit Points, it gains no benefit from finishing a Long Rest, and its Hit Point maximum decreases by 10 (3d6) every 24 hours that elapse. A creature dies and turns to dust if reduced to 0 Hit Points by this attack.
  - Channel Negative Energy: r 9, range 60 ft. {@h}25 (6d6 + 4) Necrotic damage.
  - Dreadful Glare: wis 17, one creature the mummy can see within 60 feet. {@actSaveFail} 25 (6d6 + 4) Psychic damage, and the target has the Paralyzed condition until the end of the mummy's next turn.
  - Whirlwind of Sand: {@actTrigger} The mummy is hit by an attack roll. {@actResponse} The mummy adds 2 to its AC against the attack, possibly causing the attack to miss, and the mummy teleports up to 60 feet to an unoccupied space it can see. Each creature of its choice that it can see within 5 feet of its destination space has the Blinded condition until the end of the mummy's next turn.
  - Glare: The mummy uses Dreadful Glare. The mummy can't take this action again until the start of its next turn.
  - Necrotic Strike: The mummy makes one Rotting Fist or Channel Negative Energy attack.
  - Spellcasting (conjuros): The mummy casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save 17, 9 to hit with spell attacks): Dispel Magic Thaumaturgy Animate Dead Harm Insect Plague (level 7 version)
  - Dread Command (conjuros): The mummy casts Command (level 2 version), using the same spellcasting ability as Spellcasting. The mummy can't take this action again until the start of its next turn.

### [purple-worm] Purple Worm — desafío 15, Gargantuesco Monstruosidad
Descripción oficial: [Purple Worm] What Gnaws the Roots of the World [Habitat:] Desert, Underdark [Treasure:] None Titanic purple worms burrow through the earth and sand. Ever ravenous, they devour smaller creatures and ravage entire communities in their aimless burrowing. Purple worms alone are bad enough, but the blasted monsters have a knack for unearthing things that are even worse!
  - Tunneler: The worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.
  - Multiattack: The worm makes one Bite attack and one Tail Stinger attack.
  - Bite: m 14, reach 10 ft. {@h}22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape 19), and it has the Restrained condition until the grapple ends.
  - Tail Stinger: m 14, reach 10 ft. {@h}16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.
  - Swallow: str 19, one Large or smaller creature Grappled by the worm (it can have up to three creatures swallowed at a time). {@actSaveFail} The target is swallowed by the worm, and the Grappled condition ends. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the worm, and takes 17 (5d6) Acid damage at the start of each of the worm's turns. If the worm takes 30 damage or more on a single turn from a creature inside it, the worm must succeed on a 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the worm and has the Prone condition. If the worm dies, any swallowed creature no longer has the Restrained condition and can escape from the corpse using 20 feet of movement, exiting Prone.

### [salamander-inferno-master] Salamander Inferno Master — desafío 15, Grande Elemental
  - Fire Aura: At the end of each of the salamander's turns, each creature of the salamander's choice in a 10-foot Emanation originating from the salamander takes 10 (3d6) Fire damage.
  - Magic Resistance: The salamander has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The salamander makes two Flame Trident attacks.
  - Flame Trident: m,r 12, reach 5 ft. or range 30/90 ft. {@h}16 (2d8 + 7) Piercing damage plus 14 (4d6) Fire damage. {@hom}The trident magically returns to the salamander's hand immediately after a ranged attack.
  - Inferno Blast (Recarga 5–6): dex 18, each creature in a 30-foot-radius Sphere centered on a point the salamander can see within 120 feet. {@actSaveFail} 35 (10d6) Fire damage, and the target starts burning, taking 5 (1d10) Fire damage at the start of each of its turns instead of the normal burning damage. The target gains 1 Exhaustion level whenever it takes this burning damage. {@actSaveSuccess} Half damage only.
  - Blazing Movement: The salamander moves up to its Speed without provoking Opportunity Attacks. During this movement, fire fills a 5-foot Emanation originating from the salamander. When the Emanation enters a creature's space, that creature takes 7 (2d6) Fire damage. A creature can take this damage only once per turn.

### [vampire-umbral-lord] Vampire Umbral Lord — desafío 15, Pequeño o Mediano Muerto viviente
  - Legendary Resistance (3/Day, or 4/Day in Lair): If the vampire fails a saving throw, it can choose to succeed instead.
  - Shadow Escape: If the vampire drops to 0 Hit Points outside its resting place, it teleports into its resting place unless it is in running water or sunlight. If it can't teleport, it is destroyed. Once inside its resting place, it has the Paralyzed condition for 1 hour, after which it regains 1 Hit Point.
  - Vampire Weakness: The vampire has these weaknesses: [Forbiddance] The vampire can't enter a residence without an invitation from an occupant. [Running Water] The vampire takes 20 Acid damage if it ends its turn in running water. [Stake to the Heart] If a weapon that deals Piercing damage is driven into the vampire's heart while the vampire has the Incapacitated condition in its resting place, the vampire has the Paralyzed condition until the weapon is removed. [Sunlight] The vampire takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.
  - Multiattack: The vampire makes two attacks, using Grave Strike or Sickening Ray in any combination.
  - Grave Strike: m 10, reach 5 ft. {@h}9 (1d8 + 5) Slashing damage plus 13 (3d8) Necrotic damage.
  - Sickening Ray: r 10, range 120 ft. {@h}16 (2d10 + 5) Necrotic damage, and the target has the Poisoned condition until the start of the vampire's next turn.
  - Sanguine Drain: con 18, one creature the vampire can see within 30 feet that isn't a Construct or an Undead. {@actSaveFail} 14 (4d6) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the damage taken, and the vampire regains Hit Points equal to that amount.
  - Umbral Strike: The vampire moves up to half its Speed, and it makes one Grave Strike or Sickening Ray attack.
  - Hunger of Hadar {@recharge 5} (conjuros): The vampire casts Hunger of Hadar (level 5 version), requiring no spell components and using Charisma as the spellcasting ability (spell save 18).
  - Beguile (conjuros): The vampire casts Command, requiring no spell components and using Charisma as the spellcasting ability (spell save 18). The vampire can't take this action again until the start of its next turn.

### [adult-blue-dragon] Adult Blue Dragon — desafío 16, Enorme Dragón
  - Legendary Resistance (3/Day, or 4/Day in Lair): If the dragon fails a saving throw, it can choose to succeed instead.
  - Multiattack: The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Shatter.
  - Rend: m 12, reach 10 ft. {@h}16 (2d8 + 7) Slashing damage plus 5 (1d10) Lightning damage.
  - Lightning Breath (Recarga 5–6): dex 19, each creature in a 90-foot-long, 5-foot-wide Line. {@actSaveFail} 60 (11d10) Lightning damage. {@actSaveSuccess} Half damage.
  - Cloaked Flight: The dragon uses Spellcasting to cast Invisibility on itself, and it can fly up to half its Fly Speed. The dragon can't take this action again until the start of its next turn.
  - Sonic Boom: The dragon uses Spellcasting to cast Shatter. The dragon can't take this action again until the start of its next turn.
  - Tail Swipe: The dragon makes one Rend attack.
  - Spellcasting (conjuros): The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 18): Detect Magic Invisibility Mage Hand Shatter Scrying Sending

### [adult-silver-dragon] Adult Silver Dragon — desafío 16, Enorme Dragón
  - Legendary Resistance (3/Day, or 4/Day in Lair): If the dragon fails a saving throw, it can choose to succeed instead.
  - Multiattack: The dragon makes three Rend attacks. It can replace one attack with a use of (A) Paralyzing Breath or (B) Spellcasting to cast Ice Knife.
  - Rend: m 13, reach 10 ft. {@h}17 (2d8 + 8) Slashing damage plus 4 (1d8) Cold damage.
  - Cold Breath (Recarga 5–6): con 20, each creature in a 60-foot Cone. {@actSaveFail} 54 (12d8) Cold damage. {@actSaveSuccess} Half damage.
  - Paralyzing Breath: con 20, each creature in a 60-foot Cone. 1 The target has the Incapacitated condition until the end of its next turn, when it repeats the save. 2 The target has the Paralyzed condition, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.
  - Chill: The dragon uses Spellcasting to cast Hold Monster. The dragon can't take this action again until the start of its next turn.
  - Cold Gale: dex 19, each creature in a 60-foot-long, 10-foot-wide Line. {@actSaveFail} 14 (4d6) Cold damage, and the target is pushed up to 30 feet straight away from the dragon. {@actSaveSuccess} Half damage only. {@actSaveSuccessOrFail} The dragon can't take this action again until the start of its next turn.
  - Pounce: The dragon moves up to half its Speed, and it makes one Rend attack.
  - Spellcasting (conjuros): The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 19, 11 to hit with spell attacks): Detect Magic Hold Monster Ice Knife Shapechange (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell) Ice Storm (level 5 version) Zone of Truth

### [githyanki-dracomancer] Githyanki Dracomancer — desafío 16, Mediano Aberración
  - Multiattack: The githyanki makes three Draconic Strike attacks.
  - Draconic Strike: m,r 10, reach 10 ft. or range 120 ft. {@h}12 (2d6 + 5) Slashing damage plus 17 (5d6) Fire damage, and the target has the Frightened condition until the start of the githyanki's next turn.
  - Conjured Dragon's Breath (Recarga 5–6): dex 18, each creature in a 90-foot Cone. {@actSaveFail} 27 (6d8) Fire damage plus 27 (6d8) Force damage. {@actSaveSuccess} Half damage.
  - Spellcasting (conjuros): The githyanki casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save 18, 10 to hit with spell attacks): Mage Hand (the hand is Invisible) Nondetection (self only) Plane Shift Tongues
  - Misty Step (3/Day) (conjuros): The githyanki casts Misty Step, requiring no spell components and using the same spellcasting ability as Spellcasting. Misty Step

### [gulthias-blight] Gulthias Blight — desafío 16, Gargantuesco Planta
  - Blight Seeds: When it finishes a Long Rest, the blight expels 1d6 seeds into unoccupied spaces on the ground within 30 feet of itself. After 24 hours, the seeds become creatures under the blight's control. Roll 1d8 for each seed to determine the creature it becomes: on 1-4, Twig Blight; on 5-6, Needle Blight; on 7-8, Vine Blight.
  - Multiattack: The blight makes two attacks, using Slam or Thorn Volley in any combination. It also uses Life-Draining Root.
  - Slam: m 12, reach 10 ft. {@h}25 (4d8 + 7) Bludgeoning damage.
  - Thorn Volley: r 12, range 60/180 ft. {@h}20 (3d8 + 7) Piercing damage.
  - Life-Draining Root: con 20, one Huge or smaller creature the blight can see within 30 feet. {@actSaveFail} 14 (2d6 + 7) Necrotic damage, and the target has the Grappled condition (escape 17) from one of six roots. Until the grapple ends, the target has the Restrained condition and takes 14 (4d6) Necrotic damage at the start of each of its turns. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the blight regains Hit Points equal to that amount.

### [iron-golem] Iron Golem — desafío 16, Grande Constructo
Descripción oficial: [Iron Golem] Guardian of That Which Must Endure [Habitat:] Any [Treasure:] Any Their magical cores protected by mighty armor, iron golems defend important sites and objects. These golems are forged in bipedal forms, the details of which are decided by their creators. Many resemble armored guardians or legendary heroes. Iron golems confront their foes with a combination of overwhelming physical force and eruptions from their magical core. These magical blasts take the form of fiery bolts and poisonous emissions. Iron golems preserve and protect their charges for generations. Roll on or choose a result from the Iron Golem Orders table to inspire what commands an iron golem follows. Iron Golem Orders / 1 | Block a door that has never been opened, moving only when a prophecy is fulfilled. / 2 | Exhale poison gas whenever it can, pausing only when someone speaks a passphrase. / 3 | Pose as a statue until a community's hour of greatest need. / 4 | Stand atop the resting place of a powerful magic item.
  - Fire Absorption: Whenever the golem is subjected to Fire damage, it regains a number of Hit Points equal to the Fire damage dealt.
  - Immutable Form: The golem can't shape-shift.
  - Magic Resistance: The golem has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The golem makes two attacks, using Bladed Arm or Fiery Bolt in any combination.
  - Bladed Arm: m 12, reach 10 ft. {@h}20 (3d8 + 7) Slashing damage plus 10 (3d6) Fire damage.
  - Fiery Bolt: r 10, range 120 ft. {@h}36 (8d8) Fire damage.
  - Poison Breath (Recarga 6): con 18, each creature in a 60-foot Cone. {@actSaveFail} 55 (10d10) Poison damage. {@actSaveSuccess} Half damage.

### [marilith] Marilith — desafío 16, Grande Infernal
Descripción oficial: [Marilith] Demon of Cruelty and Viciousness [Habitat:] Planar (Abyss) [Treasure:] Armaments Mariliths are six-armed, serpent-like demons that wield lethal, Abyss-forged blades. With these cursed weapons and experience from countless battles, they lead other demons to slaughter virtuous souls. They often command droves of weaker demons.
  - Demonic Restoration: If the marilith dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss.
  - Magic Resistance: The marilith has Advantage on saving throws against spells and other magical effects.
  - Reactive: The marilith can take one Reaction on every turn of combat.
  - Multiattack: The marilith makes six Pact Blade attacks and uses Constrict.
  - Pact Blade: m 10, reach 5 ft. {@h}10 (1d10 + 5) Slashing damage plus 7 (2d6) Necrotic damage.
  - Constrict: str 17, one Medium or smaller creature the marilith can see within 5 feet. {@actSaveFail} 15 (2d10 + 4) Bludgeoning damage. The target has the Grappled condition (escape 14), and it has the Restrained condition until the grapple ends.
  - Teleport (Recarga 5–6): The marilith teleports up to 120 feet to an unoccupied space it can see.
  - Parry: {@actTrigger} The marilith is hit by a melee attack roll while holding a weapon. {@actResponse} The marilith adds 5 to its AC against that attack, possibly causing it to miss.

### [planetar] Planetar — desafío 16, Grande Celestial
Descripción oficial: [Planetar] Righteously Wrathful Angelic Warrior [Habitat:] Planar (Upper Planes) [Treasure:] Relics Planetars deliver the punishment of righteous gods. These angels innately know truth from lies, and they use magic and blessed weapons to protect the just and root out wickedness across the Multiverse. These angels act where they can against overwhelming evil, but to avoid the attention of the Lower Planes, they prefer to let mortals attend to affairs on the Material Plane. Planetars often choose mortal champions to oppose threats they're loath to face directly, involving themselves only if necessary. Roll on or choose a result from the Planetar Quests table to inspire what evil a planetar might recruit heroes to thwart. Planetar Quests / 1 | Convince a villain to meet with the angel. / 2 | Find a loved one a villain believes is dead. / 3 | Heal the loved one of an evil ruler. / 4 | Inspire the defenders of a besieged holy site. / 5 | Recover and destroy an evil Artifact. / 6 | Reveal the true name of a devil to banish it.
  - Divine Awareness: The planetar knows if it hears a lie.
  - Exalted Restoration: If the planetar dies outside Mount Celestia, its body disappears, and it gains a new body instantly, reviving with all its Hit Points somewhere in Mount Celestia.
  - Magic Resistance: The planetar has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The planetar makes three Radiant Sword attacks or uses Holy Burst twice.
  - Radiant Sword: m 12, reach 10 ft. {@h}14 (2d6 + 7) Slashing damage plus 18 (4d8) Radiant damage.
  - Holy Burst: dex 20, each enemy in a 20-foot-radius Sphere centered on a point the planetar can see within 120 feet. {@actSaveFail} 24 (7d6) Radiant damage. {@actSaveSuccess} Half damage.
  - Spellcasting (conjuros): The planetar casts one of the following spells, requiring no Material components and using Charisma as spellcasting ability (spell save 20): Detect Evil and Good Commune Control Weather Dispel Evil and Good Raise Dead
  - Divine Aid (2/Day) (conjuros): The planetar casts Cure Wounds, Invisibility, Lesser Restoration, or Remove Curse, using the same spellcasting ability as Spellcasting. Cure Wounds Invisibility Lesser Restoration Remove Curse

### [adult-gold-dragon] Adult Gold Dragon — desafío 17, Enorme Dragón
  - Amphibious: The dragon can breathe air and water.
  - Legendary Resistance (3/Day, or 4/Day in Lair): If the dragon fails a saving throw, it can choose to succeed instead.
  - Multiattack: The dragon makes three Rend attacks. It can replace one attack with a use of (A) Spellcasting to cast Guiding Bolt (level 2 version) or (B) Weakening Breath.
  - Rend: m 14, reach 10 ft. {@h}17 (2d8 + 8) Slashing damage plus 4 (1d8) Fire damage.
  - Fire Breath (Recarga 5–6): dex 21, each creature in a 60-foot Cone. {@actSaveFail} 66 (12d10) Fire damage. {@actSaveSuccess} Half damage.
  - Weakening Breath: str 21, each creature that isn't currently affected by this breath in a 60-foot Cone. {@actSaveFail} The target has Disadvantage on Strength-based D20 Tests and subtracts 3 (1d6) from its damage rolls. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.
  - Banish: cha 21, one creature the dragon can see within 120 feet. {@actSaveFail} 10 (3d6) Force damage, and the target has the Incapacitated condition and is transported to a harmless demiplane until the start of the dragon's next turn, at which point it reappears in an unoccupied space of the dragon's choice within 120 feet of the dragon. {@actSaveSuccessOrFail} The dragon can't take this action again until the start of its next turn.
  - Guiding Light: The dragon uses Spellcasting to cast Guiding Bolt (level 2 version).
  - Pounce: The dragon moves up to half its Speed, and it makes one Rend attack.
  - Spellcasting (conjuros): The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 21, 13 to hit with spell attacks): Detect Magic Guiding Bolt (level 2 version) Shapechange (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell) Flame Strike Zone of Truth

### [adult-red-dragon] Adult Red Dragon — desafío 17, Enorme Dragón
  - Legendary Resistance (3/Day, or 4/Day in Lair): If the dragon fails a saving throw, it can choose to succeed instead.
  - Multiattack: The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray.
  - Rend: m 14, reach 10 ft. {@h}13 (1d10 + 8) Slashing damage plus 5 (2d4) Fire damage.
  - Fire Breath (Recarga 5–6): dex 21, each creature in a 60-foot Cone. {@actSaveFail} 59 (17d6) Fire damage. {@actSaveSuccess} Half damage.
  - Commanding Presence: The dragon uses Spellcasting to cast Command (level 2 version). The dragon can't take this action again until the start of its next turn.
  - Fiery Rays: The dragon uses Spellcasting to cast Scorching Ray. The dragon can't take this action again until the start of its next turn.
  - Pounce: The dragon moves up to half its Speed, and it makes one Rend attack.
  - Spellcasting (conjuros): The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 20, 12 to hit with spell attacks): Command (level 2 version) Detect Magic Scorching Ray Fireball

### [death-knight] Death Knight — desafío 17, Pequeño o Mediano Muerto viviente
  - Legendary Resistance (3/Day): If the death knight fails a saving throw, it can choose to succeed instead.
  - Magic Resistance: The death knight has Advantage on saving throws against spells and other magical effects.
  - Marshal Undead: Undead creatures of the death knight's choice (excluding itself) in a 60-foot Emanation originating from it have Advantage on attack rolls and saving throws. It can't use this trait if it has the Incapacitated condition.
  - Undead Restoration: If the death knight is destroyed before it atones for its evil, it gains a new body in 1d10 days, reviving with all its Hit Points. The new body appears in a location significant to the death knight.
  - Multiattack: The death knight makes three Dread Blade attacks.
  - Dread Blade: m 11, reach 5 ft. {@h}12 (2d6 + 5) Slashing damage plus 13 (3d8) Necrotic damage.
  - Hellfire Orb (Recarga 5–6): dex 18, each creature in a 20-foot-radius Sphere centered on a point the death knight can see within 120 feet. {@actSaveFail} 35 (10d6) Fire damage plus 35 (10d6) Necrotic damage. {@actSaveSuccess} Half damage.
  - Parry: {@actTrigger} The death knight is hit by a melee attack roll while holding a weapon. {@actResponse} The death knight adds 6 to its AC against that attack, possibly causing it to miss.
  - Dread Authority: The death knight uses Spellcasting to cast Command. The death knight can't take this action again until the start of its next turn.
  - Fell Word: con 18, one creature the death knight can see within 120 feet. {@actSaveFail} 17 (5d6) Necrotic damage, and the target's Hit Point maximum decreases by an amount equal to the damage taken. {@actSaveSuccessOrFail} The death knight can't take this action again until the start of its next turn.
  - Lunge: The death knight moves up to half its Speed, and it makes one Dread Blade attack.
  - Spellcasting (conjuros): The death knight casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 18): Command Phantom Steed Destructive Wave (Necrotic) Dispel Magic

### [dracolich] Dracolich — desafío 17, Enorme o Gargantuesco Muerto viviente
Descripción oficial: [Dracolich] Draconic Tyrant Reborn [Habitat:] Any [Treasure:] Any The vilest dragons seek to escape the grip of death, employing ageless secrets and blasphemous magic to become horrors called dracoliches. These deathless dragons bind their spirits to gems and magically animate their rotting corpses. Eventually becoming skeletal horrors, dracoliches continue the centuries-spanning plots they pursued in life, seek revenge on those that brought them low, and strive toward vicious goals they couldn't indulge in life. Dracoliches combine the corrupt immortality of the undead with the legendary power of dragons. A dracolich retains a breath weapon, but it is a chilling necrotic blast. These terrors gradually sicken the land near their lairs and attract sinister followers—usually other undead or cultists seeking to revel in their terrible might. Living dragons of all types loathe and seek to destroy dracoliches, viewing them as distortions of draconic magic. There are untold profane routes by which a dragon might become a dracolich. However one is created, a dracolich chooses a gem that becomes the anchor for its spirit and binds the deathless dragon to the world. So long as a dracolich is on the same plane of existence as its soul gem, the dracolich can survive the destruction of its physical body. Its spirit retreats into the gem if the dracolich's body is destroyed, and the monster might one day regain its terrifying form. Dracoliches often sequester their soul gems within meaningful treasure from their hoard or in unassuming baubles. Roll on or choose a result from the Dracolich Soul Gem Vessels table to inspire what holds a dracolich's soul gem. Dracolich Soul Gem Vessels / 1 | Another dragon's treasure hoard. / 2 | The body of a servant or an ancestor. / 3 | The core of a dracolich's melted hoard. / 4 | A corrupted dragon egg. / 5 | A dragon horn a hero took as a trophy. / 6 | A nation's royal or religious treasure. / 7 | A powerful magic item. / 8 | A source of magical wonders, such as a giant tree or mystical pool. / 9 | The vault of an archdevil, a wicked god, or another extraplanar villain. / 10 | The weapon that slew the dracolich. [Dracolich Lairs] A dracolich lurks in a corrupted version of the lair it had in life. And naught will be left save shattered thrones with no rulers. But the dead dragons shall rule the world entire...
  - Legendary Resistance (3/Day, or 4/Day in Lair): If the dracolich fails a saving throw, it can choose to succeed instead.
  - Life Suppression: Creatures within 60 feet of the dracolich can't regain Hit Points.
  - Magic Resistance: The dracolich has Advantage on saving throws against spells and other magical effects.
  - Soul Gem: The dracolich has a magical gem. If the dracolich is destroyed while the gem is on the same plane of existence as it, the dracolich gains a new body in 1d20 days, regaining all its Hit Points and appearing within 5 feet of the gem. The gem is a Tiny object that has AC 20; HP 50; and Immunity to Necrotic, Poison, and Psychic damage. The gem regains all its Hit Points at the end of every turn, but it turns to dust if reduced to 0 Hit Points. If the gem is destroyed, the dracolich can create a new one by completing an 8-hour ritual using a gem worth 1,000+ GP and by expending 5,000 GP, which the ritual consumes.
  - Multiattack: The dracolich makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Ray of Sickness (level 2 version).
  - Rend: m 13, reach 10 ft. {@h}18 (2d10 + 7) Slashing damage plus 4 (1d8) Necrotic damage.
  - Necrotic Breath (Recarga 5–6): con 20, each creature in a 60-foot Cone. {@actSaveFail} 52 (8d12) Necrotic damage. {@actSaveSuccess} Half damage.
  - Pounce: The dracolich moves up to half its Speed, and it makes one Rend attack.
  - Sickening Ray: The dracolich uses Spellcasting to cast Ray of Sickness (level 2 version). The dracolich can't take this action again until the start of its next turn.
  - Terrifying Presence: wis 19, each creature in a 30-foot Emanation originating from the dracolich. {@actSaveFail} 11 (2d10) Psychic damage, and the target has the Frightened condition until the end of its next turn. {@actSaveSuccessOrFail} The dracolich can't take this action again until the start of its next turn.
  - Spellcasting (conjuros): The dracolich casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 19, 11 to hit with spell attacks): Detect Magic Ray of Sickness (level 2 version) Create Undead (level 8 version) Finger of Death

### [dragon-turtle] Dragon Turtle — desafío 17, Gargantuesco Dragón
Descripción oficial: [Dragon Turtle] Ancient Ruler of Undersea Realms [Habitat:] Coastal, Underwater [Treasure:] Any Dragon turtles are mighty creatures with shells large enough to be mistaken for islands and jaws capable of snapping ships like twigs. While some of these aquatic dragons contentedly slumber in the depths, others jealously guard vast territories with their scalding breath and lay claim to anything that sinks into the depths or sails on the waves. Occasionally these dragons agree to aid pirates, aquatic peoples, or oceanic religions in return for contributions to their sunken treasure hoards. Many dragon turtles live in secluded lairs or ruins deep underwater, and they might not be spotted by surface dwellers for generations. Like both their namesakes, dragon turtles can have exceptionally long lives. Some recall the wonders of ages past or remarkable individuals that passed through their realms long ago. Such dragon turtles might be convinced to share their tales or provide guidance through their territories in exchange for treasures they've never glimpsed on the ocean floor.
  - Amphibious: The dragon can breathe air and water.
  - Multiattack: The dragon makes three Bite attacks. It can replace one attack with a Tail attack.
  - Bite: m 13, reach 15 ft. {@h}23 (3d10 + 7) Piercing damage plus 7 (2d6) Fire damage. Being underwater doesn't grant Resistance to this Fire damage.
  - Tail: m 13, reach 15 ft. {@h}18 (2d10 + 7) Bludgeoning damage. If the target is a Huge or smaller creature, it has the Prone condition.
  - Steam Breath (Recarga 5–6): con 19, each creature in a 60-foot Cone. {@actSaveFail} 56 (16d6) Fire damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} Being underwater doesn't grant Resistance to this Fire damage.

### [goristro] Goristro — desafío 17, Enorme Infernal
Descripción oficial: [Goristro] Demon of Disaster [Habitat:] Planar (Abyss) [Treasure:] Armaments Terrifying in scale and overwhelming power, goristros are giant demons capable of bringing cities to ruin. These demons embody senseless anarchy and nihilistic destruction, and they take special offense at creatures or structures that rival them in size. Castles, towers, giants, and beasts of war are all common victims of these monsters' wrath. Goristros resemble hunched, primeval minotaurs bearing the scars of Abyssal wars or wounds from mighty war machines. Their appearance reflects that of their creator, Baphomet, the demon lord worshiped by many evil minotaurs. Goristros stalk Baphomet's Abyssal realm, known as the Endless Maze, and pulp any non-demons they encounter in that massive, magical labyrinth. Plot and strategize, bait and scheme, but hubris is no armor against ruin incarnate, and greater beings than you have fallen under the onslaught of the Abyss.
  - Demonic Restoration: If the goristro dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss.
  - Magic Resistance: The goristro has Advantage on saving throws against spells and other magical effects.
  - Siege Monster: The goristro deals double damage to objects and structures.
  - Multiattack: The goristro makes one Brutal Gore attack and two Slam attacks.
  - Brutal Gore: m 13, reach 10 ft. {@h}40 (6d10 + 7) Piercing damage. If the target is a Huge or smaller creature, it is pushed up to 20 feet straight away from the goristro and has the Prone condition.
  - Slam: m 13, reach 10 ft. {@h}29 (4d10 + 7) Bludgeoning damage.
  - Charge: The goristro moves up to half its Speed straight toward an enemy it can see.

### [sphinx-of-valor] Sphinx of Valor — desafío 17, Grande Celestial
  - Inscrutable: No magic can observe the sphinx remotely or detect its thoughts without its permission. Wisdom (Insight) checks made to ascertain its intentions or sincerity are made with Disadvantage.
  - Legendary Resistance (3/Day, or 4/Day in Lair): If the sphinx fails a saving throw, it can choose to succeed instead.
  - Multiattack: The sphinx makes two Claw attacks and uses Roar.
  - Claw: m 12, reach 5 ft. {@h}20 (4d6 + 6) Slashing damage.
  - Roar (3/Day): The sphinx emits a magical roar. Whenever it roars, the roar has a different effect, as detailed below (the sequence resets when it takes a Long Rest): [First Roar] wis 20, each enemy in a 500-foot Emanation originating from the sphinx. {@actSaveFail} The target has the Frightened condition for 1 minute. [Second Roar] wis 20, each enemy in a 500-foot Emanation originating from the sphinx. {@actSaveFail} The target has the Paralyzed condition, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. [Third Roar] con 20, each enemy in a 500-foot Emanation originating from the sphinx. {@actSaveFail} 44 (8d10) Thunder damage, and the target has the Prone condition. {@actSaveSuccess} Half damage only.
  - Arcane Prowl: The sphinx can teleport up to 30 feet to an unoccupied space it can see, and it makes one Claw attack.
  - Weight of Years: con 16, one creature the sphinx can see within 120 feet. {@actSaveFail} The target gains 1 Exhaustion level. While the target has any Exhaustion levels, it appears 3d10 years older. {@actSaveSuccessOrFail} The sphinx can't take this action again until the start of its next turn.
  - Spellcasting (conjuros): The sphinx casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save 20): Detect Evil and Good Thaumaturgy Detect Magic Dispel Magic Greater Restoration Heroes' Feast Zone of Truth
