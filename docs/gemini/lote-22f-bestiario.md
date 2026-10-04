# Encargo: Lote 22f (bestiario, desafío 4 a 6) de la app "Mi turno"

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

### [wereboar] Wereboar — desafío 4, Pequeño o Mediano Monstruosidad
Descripción oficial: [Wereboar] Changed by the Hunger of the Boar [Habitat:] Forest, Grassland, Hill [Treasure:] Individual Wereboars shape-shift from their humanoid forms into powerful boars or humanoid-boar hybrids. Many wereboars suffer their shape-shifting nature as a curse, with some involuntarily transforming any time they perform a greedy act or indulge their selfish nature.
  - Multiattack: The wereboar makes two attacks, using Javelin or Tusk in any combination. It can replace one attack with a Gore attack.
  - Gore (Boar or Hybrid Form Only): m 5, reach 5 ft. {@h}12 (2d8 + 3) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. con 12. {@actSaveFail} The target is cursed. If the cursed target drops to 0 Hit Points, it instead becomes a Wereboar under the DM's control and has 10 Hit Points. {@actSaveSuccess} The target is immune to this wereboar's curse for 24 hours.
  - Javelin (Humanoid or Hybrid Form Only): m,r 5, reach 5 ft. or range 30/120 ft. {@h}13 (3d6 + 3) Piercing damage.
  - Tusk (Boar or Hybrid Form Only): m 5, reach 5 ft. {@h}10 (2d6 + 3) Piercing damage. If the target is a Medium or smaller creature and the wereboar moved 20+ feet straight toward it immediately before the hit, the target takes an extra 7 (2d6) Piercing damage and has the Prone condition.
  - Shape-Shift: The wereboar shape-shifts into a Medium boar-humanoid hybrid or a Small boar, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.

### [weretiger] Weretiger — desafío 4, Pequeño o Mediano Monstruosidad
Descripción oficial: [Weretiger] Changed by the Power of the Tiger [Habitat:] Desert, Forest, Grassland [Treasure:] Armaments Weretigers shape-shift from humanoid forms into tigers or tiger-humanoid hybrids. Although they can transform at will or when their magical nature demands, many weretigers are nocturnal and transform into their bestial shapes at night. Some weretigers' transformations might also be tied to the crescent moon, seasons, or momentous events. Weretigers often view their abilities as a blessing or a family honor, and they use their shape-shifting abilities to defend something with historic importance. Roll on or choose a result from the Weretiger Wards table to inspire what a weretiger defends. Weretiger Wards / 1 | Legendary weapon or symbol of rulership. / 2 | Proving ground for prophesied heroes. / 3 | Rare species of magical plant or animal. / 4 | Sacred fountain with magical waters. I hunt evil like the great cat hunts its prey, but evil will not long yield to blade alone. It takes strength, honor, and sometimes a little more.
  - Multiattack: The weretiger makes two attacks, using Scratch or Longbow in any combination. It can replace one attack with a Bite attack.
  - Bite (Tiger or Hybrid Form Only): m 5, reach 5 ft. {@h}12 (2d8 + 3) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. con 13. {@actSaveFail} The target is cursed. If the cursed target drops to 0 Hit Points, it instead becomes a Weretiger under the DM's control and has 10 Hit Points. {@actSaveSuccess} The target is immune to this weretiger's curse for 24 hours.
  - Scratch: m 5, reach 5 ft. {@h}10 (2d6 + 3) Slashing damage.
  - Longbow (Humanoid or Hybrid Form Only): r 4, range 150/600 ft. {@h}11 (2d8 + 2) Piercing damage.
  - Prowl (Tiger or Hybrid Form Only): The weretiger moves up to its Speed without provoking Opportunity Attacks. At the end of this movement, the weretiger can take the Hide action.
  - Shape-Shift: The weretiger shape-shifts into a Large tiger-humanoid hybrid or a Large tiger, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.

### [air-elemental] Air Elemental — desafío 5, Grande Elemental
Descripción oficial: [Air Elemental] Primal Spirit of Wind and Storm [Habitat:] Desert, Mountain, Planar (Elemental Plane of Air) [Treasure:] None Energetic spirits from the Elemental Plane of Air, air elementals gather clouds and winds into ever-changing bodies with indistinct limbs and vague features. Beyond their home plane, these elementals might serve magic-users who conjure them, or they might congregate around nexuses of unbridled planar energy, such as wind-scoured mountain peaks or endless storms. In battle, air elementals batter enemies with powerful gusts or transform into whirlwinds to fling away foes. Air elementals often have distinctive compositions. Roll on or choose a result from the Air Elemental Compositions table to inspire the elemental's appearance. What can withstand the storm's scream? The lightning's spear? The want of sweet breath? Air is the mightiest of elements—respect its power. Air Elemental Compositions / 1 | Cumulus or cirrus clouds. / 2 | A mixture of vibrantly colored gases. / 3 | A pungent, sour-looking miasma / 4 | Shifting cloud clusters that resemble animals and simple shapes. / 5 | Sinister features obscured in a misty mass. / 6 | Swirling storm clouds.
  - Air Form: The elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.
  - Multiattack: The elemental makes two Thunderous Slam attacks.
  - Thunderous Slam: m 8, reach 10 ft. {@h}14 (2d8 + 5) Thunder damage.
  - Whirlwind (Recarga 4–6): str 13, one Medium or smaller creature in the elemental's space. {@actSaveFail} 24 (4d10 + 2) Thunder damage, and the target is pushed up to 20 feet straight away from the elemental and has the Prone condition. {@actSaveSuccess} Half damage only.

### [barbed-devil] Barbed Devil — desafío 5, Mediano Infernal
Descripción oficial: [Barbed Devil] Devil of Greed and Obsession [Habitat:] Planar (Nine Hells) [Treasure:] Any Infernal collectors, barbed devils fanatically protect troves of treasure and scour the planes of existence for additions to their hoards. Also known as hamatulas among the ranks of the Nine Hells, these devils bedeck their barbed hides with their most prized possessions and trophies taken from those who failed to steal from them. When threatened, barbed devils strike with their thorny limbs and hurl infernal flame. Barbed devils often serve as guards and accountants for ice devil generals, pit fiend warlords, archdevils, and similarly powerful villains. In return, barbed devils gain protection for their own collections. Many barbed devils also maintain networks of imps that search the planes for treasures of interest or usefully greedy mortals. Barbed devils rarely collect anything as prosaic as coins and gems. Rather, they pride themselves on having the multiverse's greatest collection of one kind of thing—typically items of rare pedigree or emblems of power. Barbed devils refuse to steal what they covet; instead they strike bargains to claim both treasure and mortal souls.
  - Barbed Hide: At the start of each of its turns, the devil deals 5 (1d10) Piercing damage to any creature it is grappling or any creature grappling it.
  - Diabolical Restoration: If the devil dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.
  - Magic Resistance: The devil has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The devil makes one Claws attack and one Tail attack, or it makes two Hurl Flame attacks.
  - Claws: m 6, reach 5 ft. {@h}10 (2d6 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape 13) from both claws.
  - Tail: m 6, reach 10 ft. {@h}14 (2d10 + 3) Slashing damage.
  - Hurl Flame: r 5, range 150 ft. {@h}17 (5d6) Fire damage. If the target is a flammable object that isn't being worn or carried, it starts burning.

### [barlgura] Barlgura — desafío 5, Grande Infernal
Descripción oficial: [Barlgura] Demon of Instinct and Primal Violence [Habitat:] Planar (Abyss) [Treasure:] Any Barlguras are demons that embody brutality and killer instincts. They ruthlessly hunt creatures that enter their territories, whether such places are Abyssal wildernesses or locations where these demons have been conjured by wicked magic-users. Barlguras litter their territories with fiendish icons and terrifying evidence of their kills. Barlguras cooperate with other demons, particularly other barlguras, so long as they have ample prey. Should a region be depleted of creatures to slaughter, these demons turn on one another in frays that can devastate vast expanses. Barlguras vary in appearance, but all have powerful frames and hands capable of climbing swiftly and delivering crushing blows. If brute force isn't enough to overwhelm their foes, barlguras can use demonic magic to conjure terrifying illusions and grasping vines. Most barlguras resemble nightmarish apes, and some bear exaggerated versions of features of predators common to the lands the barlguras inhabit. Many embed trophies from past hunts in their demonic bodies.
  - Demonic Restoration: If the barlgura dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss.
  - Multiattack: The barlgura makes one Tormenting Bite attack and two Thrash attacks.
  - Tormenting Bite: m 7, reach 5 ft. {@h}11 (2d6 + 4) Piercing damage plus 13 (2d12) Psychic damage.
  - Thrash: m 7, reach 5 ft. {@h}9 (1d10 + 4) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition.
  - Leap: The barlgura jumps up to 40 feet by spending 10 feet of movement.
  - Spellcasting (conjuros): The barlgura casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save 13): Disguise Self Invisibility (self only) Entangle Phantasmal Killer (level 6 version)

### [beholder-zombie] Beholder Zombie — desafío 5, Grande Muerto viviente
  - Undead Fortitude: If damage reduces the zombie to 0 Hit Points, it makes a Constitution saving throw (5 plus the damage taken) unless the damage is Radiant or from a Critical Hit. On a successful save, the zombie drops to 1 Hit Point instead.
  - Multiattack: The zombie uses Eye Rays twice.
  - Bite: m 5, reach 5 ft. {@h}16 (4d6 + 2) Piercing damage.
  - Eye Rays: The zombie randomly shoots one of the following magical rays at a target it can see within 120 feet of itself (roll 1d4; reroll if the zombie has already used that ray during this turn): [1: Paralyzing Ray] con 14. {@actSaveFail} The target has the Paralyzed condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. [2: Fear Ray] wis 14. {@actSaveFail} 13 (3d8) Psychic damage, and the target has the Frightened condition until the end of its next turn. [3: Enervation Ray] con 14. {@actSaveFail} 10 (3d6) Necrotic damage, and the target has the Poisoned condition until the end of its next turn. While Poisoned, the target can't regain Hit Points. {@actSaveSuccess} Half damage only. [4: Disintegration Ray] dex 14. {@actSaveFail} 27 (5d10) Force damage. If the target is a nonmagical object or a creation of magical force, a 10-foot Cube of it disintegrates into dust. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} If the target is a creature and this damage reduces it to 0 Hit Points, it disintegrates into dust.

### [bulette] Bulette — desafío 5, Grande Monstruosidad
  - Multiattack: The bulette makes two Bite attacks.
  - Bite: m 7, reach 5 ft. {@h}17 (2d12 + 4) Piercing damage.
  - Deadly Leap: The bulette spends 5 feet of movement to jump to a space within 15 feet that contains one or more Large or smaller creatures. dex 15, each creature in the bulette's destination space. {@actSaveFail} 19 (3d12) Bludgeoning damage, and the target has the Prone condition. {@actSaveSuccess} Half damage, and the target is pushed 5 feet straight away from the bulette.
  - Leap: The bulette jumps up to 30 feet by spending 10 feet of movement.

### [cambion] Cambion — desafío 5, Mediano Infernal
Descripción oficial: [Cambion] Mortal Infused with Fiendish Might [Habitat:] Any [Treasure:] Relics Cambions are former mortals corrupted by fiendish power or possessed by insidious forces. While tieflings are free-willed individuals with a hint of fiendish ancestry, cambions are inherently tied to or remade by the wicked magic of the Lower Planes. Many cambions serve the malevolent forces that are the source of their powers. Others seek to claim the might of whatever created them or to seize otherworldly powers of their own. Among the most notorious of such cambions is Iuz, a villain who became an evil demigod and whose villainous nation threatens the Free City of Greyhawk on Oerth. Cambions come into being in disparate ways. Roll on or choose a result from the Cambion Origins table to determine the source of a cambion's fiendish might. It seems that I must do everything myself, since I have only fools for servants. Clearly disappointment must ever be the price of divinity. Cambion Origins / 1 | Being possessed by a fiendish being. / 2 | Being resurrected by an evil magic-user. / 3 | Lengthy exposure to a Lower Plane. / 4 | Making a bargain with a Fiend. / 5 | Suffering a god's curse. / 6 | Taking part in fiendish rituals.
  - Multiattack: The cambion makes two attacks, using Claw or Fire Ray in any combination.
  - Claw: m 7, reach 5 ft. {@h}8 (1d8 + 4) Slashing damage plus 7 (2d6) Fire damage.
  - Fire Ray: r 7, range 120 ft. {@h}13 (3d6 + 3) Fire damage.
  - Spellcasting (conjuros): The cambion casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 14): Alter Self Command (level 3 version) Detect Magic Dominate Person (level 8 version) Plane Shift (self only)

### [earth-elemental] Earth Elemental — desafío 5, Grande Elemental
Descripción oficial: [Earth Elemental] Primal Spirit of Soil and Stone [Habitat:] Mountain, Planar (Elemental Plane of Earth), Underdark [Treasure:] None Primal spirits from the Elemental Plane of Earth merge with rocks and minerals to form earth elementals. These beings possess powerful limbs and coarse features, sometimes studded with ore, gems, crystals, colorful striations, or living plants. On the Material Plane, earth elementals often serve those who conjure them, or they appear in regions influenced by their home plane, such as crystalline nodes, energetic fault lines, or veins of magical ore. Earth elementals effortlessly move through stone and can bring ruin to whole structures with their mighty fists. Earth elementals are typically made of more than dirt. While an elemental's composition doesn't change its statistics or have monetary value, it makes each elemental distinct. Roll on or choose a result from the Earth Elemental Compositions table to inspire an earth elemental's features. Earth Elemental Compositions / 1 | Colorful mineral formations. / 2 | Cooled magma in melted heaps. / 3 | Grass, moss, or plant roots. / 4 | Heaps of peat or decaying matter. / 5 | Mounds of sand studded with shells. / 6 | Rubble or pieces of a ruined structure. / 7 | Striking striations or bands of color. / 8 | Veins of iron or other ore. The foundations of our homes, the strength of our weapons, the vaults of our greatest secrets—earth is nothing less than the grip of reality itself. It is the mightiest element. This cannot be denied.
  - Earth Glide: The elemental can burrow through nonmagical, unworked earth and stone. While doing so, the elemental doesn't disturb the material it moves through.
  - Siege Monster: The elemental deals double damage to objects and structures.
  - Multiattack: The elemental makes two attacks, using Slam or Rock Launch in any combination.
  - Slam: m 8, reach 10 ft. {@h}14 (2d8 + 5) Bludgeoning damage.
  - Rock Launch: r 8, range 60 ft. {@h}8 (1d6 + 5) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition.

### [fire-elemental] Fire Elemental — desafío 5, Grande Elemental
Descripción oficial: [Fire Elemental] Primal Spirit of Heat and Flame [Habitat:] Desert, Planar (Elemental Plane of Fire) [Treasure:] None Fire elementals arise when spirits of the Elemental Plane of Fire inhabit flames, burning cinders, and heated smoke. These beings are tangible despite largely being made of flames and particles, and they can uses their vague limbs to ignite foes and flammable materials. Fire elementals typically burn in shades of orange and red, but other colors are possible. Most on the Material Plane are summoned by magical means, or they might appear near rifts amid desert depths, volcanoes, wildfires, or magma flows that connect to their home plane. Fire elementals might burn in distinctive ways. Roll on or choose a result from the Fire Elemental Compositions table to inspire a fire elemental's features. Fire Elemental Compositions / 1 | Colorful, superheated gases. / 2 | A column of diabolical or divine flame. / 3 | Crackling shapes that look like animals, fiends, skeletons, sprites, or other beings. / 4 | Flames that are predominantly white, blue, or a more unusual color. / 5 | The form of a calm or tormented humanoid. / 6 | Smoke that forms eerie shapes or symbols. / 7 | Soot that smells like cedar, cloves, incense, or burning meat. / 8 | Swirls of cinders and burning debris. All the elements bow to fire. The strongest earth melts. Water boils. Even air ignites. We are all souls of flame, and we know what it is to burn.
  - Fire Aura: At the end of each of the elemental's turns, each creature in a 10-foot Emanation originating from the elemental takes 5 (1d10) Fire damage. Creatures and flammable objects in the Emanation start burning.
  - Fire Form: The elemental can move through a space as narrow as 1 inch without expending extra movement to do so, and it can enter a creature's space and stop there. The first time it enters a creature's space on a turn, that creature takes 5 (1d10) Fire damage.
  - Illumination: The elemental sheds Bright Light in a 30-foot radius and Dim Light for an additional 30 feet.
  - Water Susceptibility: The elemental takes 3 (1d6) Cold damage for every 5 feet the elemental moves in water or for every gallon of water splashed on it.
  - Multiattack: The elemental makes two Burn attacks.
  - Burn: m 6, reach 5 ft. {@h}10 (2d6 + 3) Fire damage. If the target is a creature or a flammable object, it starts burning.

### [flesh-golem] Flesh Golem — desafío 5, Mediano Constructo
Descripción oficial: [Flesh Golem] Dead Flesh Given New Life [Habitat:] Any [Treasure:] Arcana Flesh golems are roughly human-shaped collections of body parts bound together by misused magic or strange science. They serve their reckless creators, but many possess disjointed memories and instincts from their component parts. If wounded, these golems might go berserk and vent their confusion on anything in their sight, including their creators. Flesh golems appear in varied forms. Roll on or choose a result from the Flesh Golem Characteristics table to inspire a flesh golem's features. Flesh Golem Characteristics / 1 | Animal parts among its humanlike pieces. / 2 | A disguise of makeup and heavy clothing. / 3 | Missing parts and exposed insides. / 4 | Parts serving unintended roles, like a body composed of dozens of hands. / 5 | Perfect features accented by beautiful stitching. / 6 | Visible mechanisms, bellows, and engines. The barrier between the mortal and the divine lies shattered—open is the mold for new gods. It was I who invaded the divine. Not with a spear but with a stitch. Not with my heresies but with my heart.
  - Aversion to Fire: If the golem takes Fire damage, it has Disadvantage on attack rolls and ability checks until the end of its next turn.
  - Berserk: Whenever the golem starts its turn Bloodied, roll 1d6. On a 6, the golem goes berserk. On each of its turns while berserk, the golem attacks the nearest creature it can see. If no creature is near enough to move to and attack, the golem attacks an object. Once the golem goes berserk, it remains so until it is destroyed or it is no longer Bloodied. The golem's creator, if within 60 feet of the berserk golem, can try to calm it by taking an action to make a 15 Charisma (Persuasion) check; the golem must be able to hear its creator. If this check succeeds, the golem ceases being berserk until the start of its next turn, at which point it resumes rolling for the Berserk trait again if it is still Bloodied.
  - Immutable Form: The golem can't shape-shift.
  - Lightning Absorption: Whenever the golem is subjected to Lightning damage, it regains a number of Hit Points equal to the Lightning damage dealt.
  - Magic Resistance: The golem has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The golem makes two Slam attacks.
  - Slam: m 7, reach 5 ft. {@h}13 (2d8 + 4) Bludgeoning damage plus 4 (1d8) Lightning damage.

### [giant-axe-beak] Giant Axe Beak — desafío 5, Enorme Monstruosidad
  - Multiattack: The axe beak makes one Sharpened Beak attack and one Talons attack.
  - Sharpened Beak: m 8, reach 10 ft. {@h}18 (2d12 + 5) Slashing damage, and a creature within 5 feet of the target (axe beak's choice) takes 6 (1d12) Slashing damage.
  - Talons: m 8, reach 5 ft. {@h}14 (2d8 + 5) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

### [giant-crocodile] Giant Crocodile — desafío 5, Enorme Bestia
  - Hold Breath: The crocodile can hold its breath for 1 hour.
  - Multiattack: The crocodile makes one Bite attack and one Tail attack.
  - Bite: m 8, reach 5 ft. {@h}21 (3d10 + 5) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape 15). While Grappled, the target has the Restrained condition and can't be targeted by the crocodile's Tail.
  - Tail: m 8, reach 10 ft. {@h}18 (3d8 + 5) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition.

### [giant-shark] Giant Shark — desafío 5, Enorme Bestia
  - Water Breathing: The shark can breathe only underwater.
  - Multiattack: The shark makes two Bite attacks.
  - Bite: m 9 (with Advantage if the target doesn't have all its Hit Points), reach 5 ft. {@h}22 (3d10 + 6) Piercing damage.

### [gladiator] Gladiator — desafío 5, Pequeño o Mediano Humanoide
Descripción oficial: [Gladiator] Competitor and Prizefighter [Habitat:] Any [Treasure:] Armaments, Individual Gladiators are professional fighters who pit themselves against one another, monsters, and other challenges to entertain audiences. While some compete merely to survive, others love the thrill of performing—and all gladiators know the importance of theatrics in keeping audiences excited. Roll on or choose an option from the Gladiator Theatrics table to inspire the unique flourishes a gladiator uses when competing. Gladiator Theatrics / 1 | Dedicates their impending victory to a deity, ruler, beloved noble, or member of the crowd. / 2 | Dresses in a monster-themed mask and cape. / 3 | Judges whether their foe fights honorably. / 4 | Leads the crowd in a rousing theme song. / 5 | Seeks to claim a trophy from a foe. / 6 | Takes advice from the crowd, omens, or a pet.
  - Multiattack: The gladiator makes three Spear attacks. It can replace one attack with a use of Shield Bash.
  - Spear: m,r 7, reach 5 ft. or range 20/60 ft. {@h}11 (2d6 + 4) Piercing damage.
  - Shield Bash: str 15, one creature within 5 feet that the gladiator can see. {@actSaveFail} 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.
  - Parry: {@actTrigger} The gladiator is hit by a melee attack roll while holding a weapon. {@actResponse} The gladiator adds 3 to its AC against that attack, possibly causing it to miss.

### [gorgon] Gorgon — desafío 5, Grande Constructo
  - Gore: m 8, reach 5 ft. {@h}18 (2d12 + 5) Piercing damage. If the target is a Large or smaller creature and the gorgon moved 20+ feet straight toward it immediately before the hit, the target has the Prone condition.
  - Petrifying Breath (Recarga 5–6): con 15, each creature in a 30-foot Cone. 1 The target has the Restrained condition and repeats the save at the end of its next turn if it is still Restrained, ending the effect on itself on a success. 2 The target has the Petrified condition instead of the Restrained condition.
  - Trample: dex 16, one creature within 5 feet that has the Prone condition. {@actSaveFail} 16 (2d10 + 5) Bludgeoning damage. {@actSaveSuccess} Half damage.

### [half-dragon] Half-Dragon — desafío 5, Mediano Dragón
Descripción oficial: [Half-Dragon] Warrior Created by Dragons [Habitat:] Any [Treasure:] Armaments Born through magical rites involving the essences of dragons, half-dragons serve their creators and their own draconic whims. Most half-dragons are created by chromatic dragons who desire servants with some trace of their own might and grandeur. Half-dragons frequently command other servants of a villainous dragon or act as agents in lands where their draconic master would attract unwanted attention. Half-dragons share personality traits and agendas with the dragon who spawned them. Those resembling chromatic dragons typically loathe their creator even as they seek the same ends. Half-dragons with the traits of metallic dragons are especially rare, but they might arise through magical accidents, the efforts of reckless magic-users, or the last act of a dying dragon. What blessing demands more yet inspires greater works than the blood of Tiamat?
  - Draconic Origin: The half-dragon is related to a type of dragon associated with one of the following damage types (DM's choice): Acid, Cold, Fire, Lightning, or Poison. This choice affects other aspects of the stat block.
  - Multiattack: The half-dragon makes two Claw attacks.
  - Claw: m 7, reach 10 ft. {@h}6 (1d4 + 4) Slashing damage plus 7 (2d6) damage of the type chosen for the Draconic Origin trait.
  - Dragon's Breath (Recarga 5–6): dex 14, each creature in a 30-foot Cone. {@actSaveFail} 28 (8d6) damage of the type chosen for the Draconic Origin trait. {@actSaveSuccess} Half damage.
  - Leap: The half-dragon jumps up to 30 feet by spending 10 feet of movement.

### [hill-giant] Hill Giant — desafío 5, Enorme Gigante
Descripción oficial: [Hill Giant] Giant of Crags and Valleys [Habitat:] Hill [Treasure:] Armaments Hill giants live among rugged bluffs and highlands. Standing three times the size of most humans, these giants exhibit skin and hair in a range of shades, including hues suggestive of the earth and mosses near their dwellings. Among hidden valleys, pristine waterfalls, and game-filled slopes, hill giants usually find their needs met by nature's bounty. What the wilderness doesn't provide, hill giants make, crafting clothes, tools, and weapons from rocks, wood, and hides. When they encounter strangers, hill giants might be suspicious and protective of their territories, but some might be convinced to share their bounties with travelers willing to entertain them. Disaster, invasion, or want might drive hill giants from their homes into other people's lands. Some displaced hill giants might steal what they need or seek revenge for their losses by causing ruin among smaller beings. Others might take up lives of raiding or serve other giants in return for protection.
  - Multiattack: The giant makes two attacks, using Tree Club or Trash Lob in any combination.
  - Tree Club: m 8, reach 10 ft. {@h}18 (3d8 + 5) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition.
  - Trash Lob: r 8, range 60/240 ft. {@h}16 (2d10 + 5) Bludgeoning damage, and the target has the Poisoned condition until the end of its next turn.

### [mezzoloth] Mezzoloth — desafío 5, Mediano Infernal
Descripción oficial: [Mezzoloth] Yugoloth of Tenacity and Want [Habitat:] Planar (Gehenna) [Treasure:] Armaments Mezzoloths are insectile yugoloths that seek power and souls in the service of fiendish lords. These greedy, violent yugoloths are more direct than most of their scheming brethren, but what they lack in guile they make up for in persistence and numbers. Mezzoloths typically form mercenary bands with others of their kind. These forces serve more powerful yugoloths, other fiends, sinister mages, or anyone who provides them with tempting rewards. Mezzoloths obediently adhere to the bargains they strike, potentially serving their patrons for centuries, but once those terms expire, yesterday's client could become today's target. Roll on or choose a result from the Mezzoloth Payments table to inspire a mezzoloth's price for its services. Mezzoloth Payments / 1 | Access to a planar portal. / 2 | Information valued by its true master. / 3 | A lair where it can bring others of its kind. / 4 | Magic weapons or armor. / 5 | The right to loot holy sites in places it conquers. / 6 | Souls, whether as larvae or captured spirits.
  - Fiendish Restoration: If the mezzoloth dies outside Gehenna, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in Gehenna.
  - Magic Resistance: The mezzoloth has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The mezzoloth makes two attacks, using Claws or Mercurial Trident in any combination.
  - Claws: m 7, reach 5 ft. {@h}9 (2d4 + 4) Slashing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape 14) from two of four claws, and it has the Restrained condition until the grapple ends.
  - Mercurial Trident: m,r 7, reach 5 ft. or range 20/60 ft. {@h}8 (1d8 + 4) Piercing damage plus 10 (3d6) Force damage. {@hom}The trident magically returns to the mezzoloth's claw immediately after a ranged attack.
  - Teleport (Recarga 5–6): The mezzoloth teleports up to 60 feet to an unoccupied space it can see. It can teleport one creature it is grappling to an unoccupied space within 5 feet of its destination space.
  - Spellcasting (conjuros): The mezzoloth casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save 13): Cloudkill Darkness Dispel Magic

### [night-hag] Night Hag — desafío 5, Mediano Infernal
Descripción oficial: [Night Hag] Hag of Nightmare and Corruption [Habitat:] Planar (Lower Planes) [Treasure:] Arcana Night hags seek mortals to torment and turn to evil. By day, night hags use supernatural deceptions to plague their victims, shape-shifting to pose as other creatures and make their targets believe the world has turned against them. By night, these hags reinforce their tortures with terrifying dreams. Once they force their targets to desperate limits, night hags claim their victims' tormented spirits, capturing them in sinister traps called soul bags. The hags then slip between planes of existence to barter stolen souls to vile magic-users and fiendish entities. Night hags maintain networks of nefarious customers and collect rumors from across the Lower Planes. These hags might part with their secrets in exchange for magic items and other wicked prices.
  - Magic Resistance: The hag has Advantage on saving throws against spells and other magical effects.
  - Soul Bag: The hag has a soul bag. While holding or carrying the bag, the hag can use its Nightmare Haunting action. The bag has AC 15, HP 20, and Resistance to all damage. The bag turns to dust if reduced to 0 Hit Points. If the bag is destroyed, any souls the bag is holding are released. The hag can create a new bag after 7 days.
  - Multiattack: The hag makes two Claw attacks.
  - Claw: m 7, reach 5 ft. {@h}13 (2d8 + 4) Slashing damage.
  - Shape-Shift: The hag shape-shifts into a Small or Medium Humanoid, or it returns to its true form. Other than its size, its game statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed.
  - Coven Magic (conjuros): While within 30 feet of at least two hag allies, the hag can cast one of the following spells, requiring no Material components, using the spell's normal casting time, and using Intelligence as the spellcasting ability (spell save 14): Augury, Find Familiar, Identify, Locate Object, Scrying, or Unseen Servant. The hag must finish a Long Rest before using this trait to cast that spell again.
  - Spellcasting (conjuros): The hag casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save 14): Detect Magic Etherealness Magic Missile (level 4 version) Phantasmal Killer Plane Shift (self only)
  - Nightmare Haunting (1/Day; Requires Soul Bag) (conjuros): While on the Ethereal Plane, the hag casts Dream, using the same spellcasting ability as Spellcasting. Only the hag can serve as the spell's messenger, and the target must be a creature the hag can see on the Material Plane. The spell fails and is wasted if the target is under the effect of the Protection from Evil and Good spell or within a Magic Circle spell. If the target takes damage from the Dream spell, the target's Hit Point maximum decreases by an amount equal to that damage. If the spell kills the target, its soul is trapped in the hag's soul bag, and the target can't be raised from the dead until its soul is released. Dream Protection from Evil and Good Magic Circle

### [otyugh] Otyugh — desafío 5, Grande Aberración
Descripción oficial: [Otyugh] Garbage-Heap Gourmand [Habitat:] Underdark [Treasure:] Any Otyughs live to eat—the more disgusting the meal, the better. They consider all non-otyughs that come within reach dishes in life's endless buffet. In dumps, sewers, polluted ruins, and similar murky depths, otyughs devour garbage, carcasses, and anything else their tentacles can cram in their expansive maws. Some creatures ply otyughs with trash to recruit them as watchful—if disgusting—guardians. Otyughs often bury themselves amid trash heaps and observe their surroundings with their eye-studded stalk. They use glittery trash and telepathic urgings to coax creatures close, then burst from hiding, attacking with their spiny tentacles and filthy maws. Roll on or choose a result from the Otyugh Lures table to inspire how an otyugh tempts prey close. Otyugh Lures / 1 | Disguises its tentacles with garbage puppets. / 2 | Sings an enticing song in Otyugh. / 3 | Telepathically transmits a message like "Happy good stuff here!" or "Help now! I'm too delicious?" / 4 | Telepathically transmits an image of a large gemstone, crooked weapon, or soggy pastry.
  - Multiattack: The otyugh makes one Bite attack and two Tentacle attacks.
  - Bite: m 6, reach 5 ft. {@h}12 (2d8 + 3) Piercing damage, and the target has the Poisoned condition. Whenever the Poisoned target finishes a Long Rest, it is subjected to the following effect. con 15. {@actSaveFail} The target's Hit Point maximum decreases by 5 (1d10) and doesn't return to normal until the Poisoned condition ends on the target. {@actSaveSuccess} The Poisoned condition ends.
  - Tentacle: m 6, reach 10 ft. {@h}12 (2d8 + 3) Piercing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape 13) from one of two tentacles.
  - Tentacle Slam: con 14, each creature Grappled by the otyugh. {@actSaveFail} 16 (3d8 + 3) Bludgeoning damage, and the target has the Stunned condition until the start of the otyugh's next turn. {@actSaveSuccess} Half damage only.

### [pixie-wonderbringer] Pixie Wonderbringer — desafío 5, Diminuto Feérico
  - Magic Resistance: The pixie has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The pixie makes two Faerie Dust attacks.
  - Faerie Dust: m,r 7, reach 5 ft. or range 60 ft. {@h}15 (2d10 + 4) Radiant damage, and the target has the Charmed or Poisoned condition (pixie's choice) until the start of the pixie's next turn.
  - Spellcasting (conjuros): The pixie casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 15): Dancing Lights Druidcraft Invisibility (self only) Detect Thoughts Fly Major Image
  - Burst of Wonder {@recharge 5} (conjuros): The pixie casts Entangle, Polymorph, or Tasha's Hideous Laughter, requiring no Material components and using the same spellcasting ability as Spellcasting.

### [red-slaad] Red Slaad — desafío 5, Grande Aberración
  - Magic Resistance: The slaad has Advantage on saving throws against spells and other magical effects.
  - Regeneration: The slaad regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point.
  - Multiattack: The slaad makes three Injecting Claw attacks.
  - Injecting Claw: m 6, reach 10 ft. {@h}10 (2d6 + 3) Piercing damage. If the target is a Humanoid not cursed by a slaad, it is subjected to the following effect. con 14. {@actSaveFail} The target is cursed unawares, and a minuscule slaad egg is implanted in it. Removing the curse destroys the egg. Over 2d4 × 10 days, the egg gestates. In the final 24 hours, the cursed target feels unwell; its Speed is halved, and it has Disadvantage on D20 Tests. At the end of this time, the egg turns into a Slaad Tadpole, which chews out of the host and kills it.

### [revenant] Revenant — desafío 5, Mediano Muerto viviente
  - Regeneration: The revenant regains 10 Hit Points at the start of each of its turns. If the revenant takes Fire or Radiant damage, this trait doesn't function at the start of its next turn. Its body is destroyed only if it starts its turn with 0 Hit Points and doesn't regenerate.
  - Undead Restoration: If the revenant dies, it revives 24 hours later in a different body unless Dispel Evil and Good is cast on its corpse. If it revives, it animates a Humanoid corpse elsewhere on the same plane of existence; it now looks different but uses the same stat block and returns with all its Hit Points.
  - Multiattack: The revenant uses Vengeful Glare and makes two Slam attacks.
  - Slam: m 7, reach 5 ft. {@h}11 (2d6 + 4) Necrotic damage.
  - Vengeful Glare: wis 15, one creature the revenant can see within 30 feet. {@actSaveFail} The target has the Frightened condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. If the Frightened target is cursed by the revenant (see Vow of Revenge), the target also has the Paralyzed condition for the duration.
  - Vow of Revenge (1/Day): The revenant curses one creature it can see within 30 feet of itself. The revenant knows the distance to and direction of the cursed target, even if it is on a different plane of existence. The curse ends on the target if the revenant uses this Bonus Action on a different creature.

### [roper] Roper — desafío 5, Grande Aberración
Descripción oficial: [Roper] Tentacled Subterranean Trapper [Habitat:] Underdark [Treasure:] Any Camouflaged as rock formations, ropers are aberrant ambushers that lurk in wait for smaller creatures. These bizarre subterranean hunters extend their rubbery tentacles to explore and prod their surroundings, often reaching beyond their fields of vision. Should they encounter prey, these limbs ensnare victims and drag them close to ropers' toothy maws. If these tentacles are severed, ropers rapidly grow replacements. Ropers can move, albeit slowly. Crawling on the sticky cilia that cover their undersides, ropers can climb walls and suspend themselves from ceilings. These hunters often position themselves in unexpected or treacherous locations, using their surroundings to weaken their prey. Roll on or choose a result from the Roper Hazards table to inspire what dangers ropers employ when ambushing prey. Roper Hazards / 1 | Areas that trigger traps. / 2 | Caverns filled with smoke or gas. / 3 | dead magic zone or Wild Magic zones. / 4 | The lair of a creature it is trying to bait out. / 5 | A nest of rats, insects, or other vermin. / 6 | Patches of brown mold* or green slime*. / 7 | Pools of magma or boiling water. / 8 | 5 or similar dangerous plants. Rule 9: Never trust a stalagmite.
  - Spider Climb: The roper can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - Multiattack: The roper makes two Tentacle attacks, uses Reel, and makes two Bite attacks.
  - Bite: m 7, reach 5 ft. {@h}17 (3d8 + 4) Piercing damage.
  - Tentacle: m 7, reach 60 ft. {@h}The target has the Grappled condition (escape 14) from one of six tentacles, and the target has the Poisoned condition until the grapple ends. The tentacle can be damaged, freeing a creature it has Grappled when destroyed (AC 20, HP 10, Immunity to Poison and Psychic damage). Damaging the tentacle deals no damage to the roper, and a destroyed tentacle regrows at the start of the roper's next turn.
  - Reel: The roper pulls each creature Grappled by it up to 30 feet straight toward it.

### [sahuagin-baron] Sahuagin Baron — desafío 5, Grande Infernal
  - Blood Frenzy: The sahuagin has Advantage on attack rolls against any creature that doesn't have all its Hit Points.
  - Limited Amphibiousness: The sahuagin can breathe air and water, but it must be submerged at least once every 4 hours to avoid suffocating outside water.
  - Shark Telepathy: The sahuagin can magically control sharks within 120 feet of itself, using a special telepathy.
  - Multiattack: The sahuagin makes three Trident attacks.
  - Trident: m,r 7, reach 5 ft. or range 20/60 ft. {@h}13 (2d8 + 4) Piercing damage.
  - Fiendish Blood: {@actTrigger} The sahuagin takes Piercing or Slashing damage. dcon 14, each creature of the sahuagin's choice in a 5-foot Emanation originating from the sahuagin. {@actSaveFail} 10 (3d6) Acid damage, and the target is cursed until it finishes a Short or Long Rest. While cursed, the target can't benefit from the Invisible condition, its Speed decreases by 10 feet, and all Fiends within 120 feet of the target can sense its location regardless of interposing obstacles.

### [salamander] Salamander — desafío 5, Grande Elemental
  - Fire Aura: At the end of each of the salamander's turns, each creature of the salamander's choice in a 5-foot Emanation originating from the salamander takes 7 (2d6) Fire damage.
  - Multiattack: The salamander makes two Flame Spear attacks. It can replace one attack with a use of Constrict.
  - Flame Spear: m,r 7, reach 5 ft. or range 20/60 ft. {@h}13 (2d8 + 4) Piercing damage plus 7 (2d6) Fire damage. {@hom}The spear magically returns to the salamander's hand immediately after a ranged attack.
  - Constrict: str 15, one Large or smaller creature the salamander can see within 10 feet. {@actSaveFail} 11 (2d6 + 4) Bludgeoning damage plus 7 (2d6) Fire damage. The target has the Grappled condition (escape 14), and it has the Restrained condition until the grapple ends.

### [shambling-mound] Shambling Mound — desafío 5, Grande Planta
Descripción oficial: [Shambling Mound] Manifestation of Primeval Power [Habitat:] Forest, Swamp [Treasure:] None Shambling mounds—also known as "shamblers"—embody the tenacity of the wilderness, seeking only to consume and grow. These masses of vegetation rise up to half again as tall as a human and possess thick limbs and a vague head. As they move through bogs and undergrowth, they ensnare creatures that come within reach. Shambling mounds bury those they catch within their own forms as compost. Strange circumstances might give rise to shambling mounds, transforming vegetation into hulks with rudimentary cunning. Such conditions include strikes from magical lightning, nature defending itself, or druidic curses. Roll on or choose a result from the Shambling Mound Cultivation table to inspire a shambling mound's origins and features. Shambling Mound Cultivation / 1 | Covered in vibrant alien or Feywild blooms. / 2 | Hauling a rune-etched menhir in its torso. / 3 | Infested with vermin or fungi. / 4 | Made up of knotty vines entangling skeletons. / 5 | Mutated and leaking glowing pollution. / 6 | The remains of an ancient tree or a treant.
  - Lightning Absorption: Whenever the shambling mound is subjected to Lightning damage, it regains a number of Hit Points equal to the Lightning damage dealt.
  - Multiattack: The shambling mound makes three Charged Tendril attacks. It can replace one attack with a use of Engulf.
  - Charged Tendril: m 7, reach 10 ft. {@h}7 (1d6 + 4) Bludgeoning damage plus 5 (2d4) Lightning damage. If the target is a Medium or smaller creature, the shambling mound pulls the target 5 feet straight toward itself.
  - Engulf: str 15, one Medium or smaller creature within 5 feet. {@actSaveFail} The target is pulled into the shambling mound's space and has the Grappled condition (escape 14). Until the grapple ends, the target has the Blinded and Restrained conditions, and it takes 10 (3d6) Lightning damage at the start of each of its turns. When the shambling mound moves, the Grappled target moves with it, costing it no extra movement. The shambling mound can have only one creature Grappled by this action at a time.

### [triceratops] Triceratops — desafío 5, Enorme Bestia
  - Multiattack: The triceratops makes two Gore attacks.
  - Gore: m 9, reach 5 ft. {@h}19 (2d12 + 6) Piercing damage. If the target is Huge or smaller and the triceratops moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 (2d8) Piercing damage and has the Prone condition.

### [troll] Troll — desafío 5, Grande Gigante
Descripción oficial: [Troll] Loathsome, Regenerating Lurker [Habitat:] Arctic, Forest, Hill, Mountain, Swamp, Underdark [Treasure:] None Trolls creep forth to prey on smaller creatures and drag captives back to festering lairs. These misshapen brutes can regenerate from wounds and regrow severed body parts—including their heads. A troll's severed limbs continue to move and attack. Unless they're burned by flames or acid, trolls can recover from egregious wounds and seek revenge on those who felled them. Trolls typically hunt alone, but small groups occasionally cooperate to ambush prey or raid villages. Creatures such as hags and hill giants might convince trolls to work for them in exchange for disgusting meals.
  - Loathsome Limbs (4/Day): If the troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the troll's limbs is severed, falls into the troll's space, and becomes a Troll Limb. The limb acts immediately after the troll's turn. The troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.
  - Regeneration: The troll regains 15 Hit Points at the start of each of its turns. If the troll takes Acid or Fire damage, this trait doesn't function on the troll's next turn. The troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.
  - Multiattack: The troll makes three Rend attacks.
  - Rend: m 7, reach 10 ft. {@h}11 (2d6 + 4) Slashing damage.
  - Charge: The troll moves up to half its Speed straight toward an enemy it can see.

### [umber-hulk] Umber Hulk — desafío 5, Grande Monstruosidad
Descripción oficial: [Umber Hulk] Burrowing Brute from Below [Habitat:] Underdark [Treasure:] None Lumbering, carapace-armored bipeds, umber hulks burrow through the Underdark, feeding on anything they can crush in their mighty mandibles. These tenacious hunters sense movement through the surrounding earth, then burst through cavern walls to surprise their prey. Those ambushed by umber hulks risk meeting the gaze of the monsters' eerie, multifaceted eyes, which can cause others to act irrationally and even lash out at their allies. Umber hulks typically lurk in tunnels they've burrowed alongside other passages. When they detect creatures moving, they burst through the rock walls between the passages to attack. While these monsters can communicate with one other, they usually hunt alone and avoid each other's territories. Umber hulks focus on finding food and crushing intruders. They have little interest in allying with other creatures, but manipulative inhabitants of the Underdark, such as beholders and mind flayers, sometimes compel umber hulks to serve them.
  - Tunneler: The umber hulk can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.
  - Multiattack: The umber hulk makes three Rend attacks.
  - Rend: m 8, reach 10 ft. {@h}12 (2d6 + 5) Slashing damage.
  - Confusing Gaze (Recarga 5–6): wis 14, each creature in a 30-foot Cone. {@actSaveFail} The target can't take Reactions until the start of the umber hulk's next turn, and the target rolls 1d8 to determine what it does on its next turn: [1-4] The target does nothing. [5-6] The target takes no action or Bonus Action and uses all its movement to move in a random direction. [7-8] The target makes a melee attack against a random creature within its reach or does nothing if it can't make such an attack.

### [unicorn] Unicorn — desafío 5, Grande Celestial
Descripción oficial: [Unicorn] Majestic and Magical Forest Master [Habitat:] Forest, Planar (Feywild) [Treasure:] Any Unicorns are majestic defenders of forests. They are revered by many Fey and other forest dwellers, and they do whatever they can to ensure the peace and health of those who shelter in their wooded realms. [Unicorn Lairs] Unicorns dwell in unspoiled forests, particularly where benevolent Fey creatures live.
  - Legendary Resistance (3/Day): If the unicorn fails a saving throw, it can choose to succeed instead.
  - Magic Resistance: The unicorn has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The unicorn makes one Hooves attack and one Radiant Horn attack.
  - Hooves: m 7, reach 5 ft. {@h}11 (2d6 + 4) Bludgeoning damage.
  - Radiant Horn: m 7, reach 5 ft. {@h}9 (1d10 + 4) Radiant damage.
  - Charging Horn: The unicorn moves up to half its Speed without provoking Opportunity Attacks, and it makes one Radiant Horn attack.
  - Shimmering Shield: The unicorn targets itself or one creature it can see within 60 feet of itself. The target gains 10 (3d6) Temporary Hit Points, and its AC increases by 2 until the end of the unicorn's next turn. The unicorn can't take this action again until the start of its next turn.
  - Spellcasting (conjuros): The unicorn casts one of the following spells, requiring no spell components and using Charisma as the spellcasting ability (spell save 14): Detect Evil and Good Druidcraft Calm Emotions Dispel Evil and Good Entangle Pass without Trace Word of Recall
  - Unicorn's Blessing (3/Day) (conjuros): The unicorn touches another creature with its horn and casts Cure Wounds or Lesser Restoration on that creature, using the same spellcasting ability as Spellcasting. Cure Wounds Lesser Restoration

### [vampire-spawn] Vampire Spawn — desafío 5, Pequeño o Mediano Muerto viviente
  - Spider Climb: The vampire can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - Vampire Weakness: The vampire has these weaknesses: [Forbiddance] The vampire can't enter a residence without an invitation from an occupant. [Running Water] The vampire takes 20 Acid damage if it ends its turn in running water. [Stake to the Heart] The vampire is destroyed if a weapon that deals Piercing damage is driven into the vampire's heart while the vampire has the Incapacitated condition. [Sunlight] The vampire takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.
  - Multiattack: The vampire makes two Claw attacks and uses Bite.
  - Claw: m 6, reach 5 ft. {@h}8 (2d4 + 3) Slashing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape 13) from one of two claws.
  - Bite: con 14, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. {@actSaveFail} 5 (1d4 + 3) Piercing damage plus 10 (3d6) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the vampire regains Hit Points equal to that amount.
  - Deathless Agility: The vampire takes the Dash or Disengage action.

### [water-elemental] Water Elemental — desafío 5, Grande Elemental
Descripción oficial: [Water Elemental] Primal Spirit of Waves and Tides [Habitat:] Coastal, Planar (Elemental Plane of Water), Swamp, Underwater [Treasure:] None Spirits of the Elemental Plane of Water form shapeless liquids into water elementals, aqueous beings with the might of surging waves. Water elementals are as mutable as liquid, allowing them to crash into foes and seep through narrow cracks. They can crush foes with limb-like geysers, or they might flood over creatures, submerging and drowning foes within their whirling forms. Water elementals often appear near nexuses of elemental power, such as aquatic abysses, magical springs, and whirlpools. Water elementals' shapes are influenced by the liquid bodies in which they form. Roll on or choose a result from the Water Elemental Compositions table to inspire a water elemental's features. Water Elemental Compositions / 1 | Chilling or near-boiling temperatures. / 2 | Energetic effervescence. / 3 | Muddy, polluted, or crystal-clear water. / 4 | Seaweed, tiny fish, or other sea life. Water: greatest of the elements in might and form. A tsunami's torrent. A blizzard's claws. A parent's tears. What is not moved by water?
  - Freeze: If the elemental takes Cold damage, its Speed decreases by 20 feet until the end of its next turn.
  - Water Form: The elemental can enter an enemy's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.
  - Multiattack: The elemental makes two Slam attacks.
  - Slam: m 7, reach 5 ft. {@h}13 (2d8 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.
  - Whelm (Recarga 4–6): str 15, each creature in the elemental's space. {@actSaveFail} 22 (4d8 + 4) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape 14). Until the grapple ends, the target has the Restrained condition, is suffocating unless it can breathe water, and takes 9 (2d8) Bludgeoning damage at the start of each of the elemental's turns. The elemental can grapple one Large creature or up to two Medium or smaller creatures at a time with Whelm. As an action, a creature within 5 feet of the elemental can pull a creature out of it by succeeding on a 14 Strength (Athletics) check. {@actSaveSuccess} Half damage only.

### [werebear] Werebear — desafío 5, Pequeño o Mediano Monstruosidad
Descripción oficial: [Werebear] Changed by the Might of the Bear [Habitat:] Arctic, Forest, Hill [Treasure:] Relics When threatened or compelled by magic, werebears shape-shift from their humanoid forms into mighty bears or hybrids of those two forms. They scare off or sabotage those who threaten the wilds, and they frequently aid Fey, druids, or spirits of the wilderness, as many owe their magical nature to such forces. Werebears take the shape of bears common to the regions in which they dwell, with brown and polar bear forms being common.
  - Multiattack: The werebear makes two attacks, using Handaxe or Rend in any combination. It can replace one attack with a Bite attack.
  - Bite (Bear or Hybrid Form Only): m 7, reach 5 ft. {@h}17 (2d12 + 4) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. con 14. {@actSaveFail} The target is cursed. If the cursed target drops to 0 Hit Points, it instead becomes a Werebear under the DM's control and has 10 Hit Points. {@actSaveSuccess} The target is immune to this werebear's curse for 24 hours.
  - Handaxe (Humanoid or Hybrid Form Only): m,r 7, reach 5 ft or range 20/60 ft. {@h}14 (3d6 + 4) Slashing damage.
  - Rend (Bear or Hybrid Form Only): m 7, reach 5 ft. {@h}13 (2d8 + 4) Slashing damage.
  - Shape-Shift: The werebear shape-shifts into a Large bear-humanoid hybrid form or a Large bear, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.

### [wraith] Wraith — desafío 5, Pequeño o Mediano Muerto viviente
Descripción oficial: [Wraith] Essence of Evil [Habitat:] Planar (Shadowfell), Underdark [Treasure:] None Wraiths are spectral evils, life-hungry embodiments of malice and terror. Arising from the souls of tyrants, moments of catastrophic pain, or magical blasphemies, wraiths spread suffering and the torment of undeath. Humanoids that die near a wraith might be entrapped by the foul spirit and rise as specters bound to the wraith's sinister will. Wraiths lurk in forgotten dungeons, accursed ruins, or lands influenced by sinister planes of existence. Such haunted domains might bear hints of the tragedies or foul magic that brought the wraiths into being. Wraiths might arise from a single powerfully evil soul or other baleful forces. Roll on or choose a result from the Wraith Manifestations table to inspire the wickedness a wraith embodies. Wraith Manifestations / 1 | The blasphemous magic of a cursed location. / 2 | The exorcised evil of a redeemed villain. / 3 | A legendary villain who returns once a century. / 4 | Locals' fear of a superstition or legend. / 5 | The memory of a tragedy. / 6 | A profane idea or foul piece of lore. / 7 | The torment of one or more suffering souls. / 8 | The viciousness of a profane Artifact. / 9 | The vile dreams of a slumbering god. / 10 | The voracity of a life-hungry realm, such as the Shadowfell or Negative Plane.
  - Incorporeal Movement: The wraith can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.
  - Sunlight Sensitivity: While in sunlight, the wraith has Disadvantage on ability checks and attack rolls.
  - Life Drain: m 6, reach 5 ft. {@h}21 (4d8 + 3) Necrotic damage. If the target is a creature, its Hit Point maximum decreases by an amount equal to the damage taken.
  - Create Specter: The wraith targets a Humanoid corpse within 10 feet of itself that has been dead for no longer than 1 minute. The target's spirit rises as a Specter in the space of its corpse or in the nearest unoccupied space. The specter is under the wraith's control. The wraith can have no more than seven specters under its control at a time.

### [xorn] Xorn — desafío 5, Mediano Elemental
Descripción oficial: [Xorn] Treasure-Devouring Glutton [Habitat:] Underdark, Planar (Elemental Plane of Earth) [Treasure:] Any On the Elemental Plane of Earth, xorn roam in search of meals they consider delicacies: gems, crystals, and veins of precious metals. For xorn, the Elemental Plane of Earth presents an endless buffet. Those that find their way to the Material Plane discover that most worlds are culinary wastelands. These xorn scour subterranean depths, consuming whatever sparse gems and ores they find. This might bring them into conflict with miners or others who hide their treasures underground. Xorn have three eyes, three arms, and three legs arranged around their trilaterally symmetrical frames. At the top of their bodies is a toothy maw that's equally capable of crushing minerals and dangerous creatures. Xorn move through the earth magically, leaving no tunnel or sign of their passage. Rapt gourmands, xorn focus on their next meals. They care little for living creatures and avoid harming them when possible. They know others also covet the earth's treasures, and they're not above bargaining for their meals. Xorn might share their knowledge of the Underdark in exchange for snacks of gems, coins, or magical metals. If starving or angered, xorn might try to forcibly take their meals. Roll on or choose a result from the Xorn Delicacies table to inspire a xorn's favorite fare. Xorn Delicacies / 1 | Adamantine or mithral. / 2 | Coins minted by a long-dead empire. / 3 | Fossils or petrified wood. / 4 | A gem that's part of a magic item. / 5 | The keystone of a great arch or bridge. / 6 | Parts of a galeb duhr or stone golem. / 7 | A piece of a meteor or moon. / 8 | The stone crowning a mountain peak.
  - Earth Glide: The xorn can burrow through nonmagical, unworked earth and stone. While doing so, the xorn doesn't disturb the material it moves through.
  - Treasure Sense: The xorn can pinpoint the location of precious metals and stones within 60 feet of itself.
  - Multiattack: The xorn makes one Bite attack and three Claw attacks.
  - Bite: m 6, reach 5 ft. {@h}17 (4d6 + 3) Piercing damage.
  - Claw: m 6, reach 5 ft. {@h}8 (1d10 + 3) Slashing damage.
  - Charge: The xorn moves up to its Speed or Burrow Speed straight toward an enemy it can sense.

### [young-remorhaz] Young Remorhaz — desafío 5, Grande Monstruosidad
  - Heat Aura: At the end of each of the remorhaz's turns, each creature in a 5-foot Emanation originating from the remorhaz takes 11 (2d10) Fire damage.
  - Bite: m 7, reach 5 ft. {@h}15 (2d10 + 4) Piercing damage plus 13 (3d8) Fire damage.

### [azer-pyromancer] Azer Pyromancer — desafío 6, Mediano Elemental
  - Fire Aura: At the end of each of the azer's turns, each creature of the azer's choice in a 5-foot Emanation originating from the azer takes 11 (2d10) Fire damage unless the azer has the Incapacitated condition.
  - Illumination: The azer sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet.
  - Multiattack: The azer makes two Flame Burst attacks.
  - Flame Burst: m,r 7, reach 5 ft. or range 120 ft. {@h}15 (2d10 + 4) Fire damage.
  - Spellcasting (conjuros): The azer casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save 15): Elementalism Mage Hand Fireball
  - Hellish Rebuke (2/Day) (conjuros): The azer casts Hellish Rebuke in response to that spell's trigger, using the same spellcasting ability as Spellcasting. Hellish Rebuke

### [chasme] Chasme — desafío 6, Grande Infernal
Descripción oficial: [Chasme] Demon of Betrayal and Sycophancy [Habitat:] Planar (Abyss) [Treasure:] Relics Flying forth from the Abyss, chasmes resemble horse-size flies. They incapacitate foes by producing a mind-numbing droning, then use their proboscises to drain victims of life. In the Abyss, most chasmes obsequiously serve more powerful demons and search for captives to press into demonic hordes.
  - Demonic Restoration: If the chasme dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss.
  - Magic Resistance: The chasme has Advantage on saving throws against spells and other magical effects.
  - Spider Climb: The chasme can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - Proboscis: m 5, reach 5 ft. {@h}16 (4d6 + 2) Piercing damage plus 21 (6d6) Necrotic damage. If the target is a creature, its Hit Point maximum decreases by an amount equal to the Necrotic damage taken.
  - Drone: con 12, each creature in a 30-foot Emanation originating from the chasme (demons automatically succeed on this save). {@actSaveFail} The target has the Unconscious condition and repeats the save at the end of each of its turns. The target succeeds automatically after 10 minutes or if it takes damage or a creature within 5 feet of it takes an action to empty a flask of Holy Water on it. {@actSaveSuccess} The target is immune to this chasme's Drone for 24 hours.

### [chimera] Chimera — desafío 6, Grande Monstruosidad
Descripción oficial: [Chimera] Multiheaded Ravager [Habitat:] Grassland, Hill, Mountain [Treasure:] Any Violent and unpredictable, chimeras combine the deadliest traits of lions, rams, and red dragons. With their fearsome claws, crushing horns, and fiery breath, chimeras are tempests of ferocity, driven by their three heads' conflicting instincts. Their heads agree on little but their desires to feed and to drive competitors from the rugged territories where these monsters make their lairs. When they spot prey, chimeras typically strafe foes with their fire breath before landing to attack with their fangs, horns, and claws. Owing to their draconic instincts, chimeras are greedy creatures that hoard treasures within cavernous lairs. They're undiscerning about what they collect, gathering shiny objects alongside trophies and bones from their recent kills. Brave souls seeking to distract or temporarily appease a chimera can do so by offering it treasure and food.
  - Multiattack: The chimera makes one Ram attack, one Bite attack, and one Claw attack. It can replace the Claw attack with a use of Fire Breath if available.
  - Bite: m 7, reach 5 ft. {@h}11 (2d6 + 4) Piercing damage, or 18 (4d6 + 4) Piercing damage if the chimera had Advantage on the attack roll.
  - Claw: m 7, reach 5 ft. {@h}7 (1d6 + 4) Slashing damage.
  - Ram: m 7, reach 5 ft. {@h}10 (1d12 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.
  - Fire Breath (Recarga 5–6): dex 15, each creature in a 15-foot Cone. {@actSaveFail} 31 (7d8) Fire damage. {@actSaveSuccess} Half damage.

### [cyclops-sentry] Cyclops Sentry — desafío 6, Enorme Gigante
  - Multiattack: The cyclops makes two attacks, using Stone Club or Rock in any combination.
  - Stone Club: m 9, reach 10 ft. {@h}16 (3d6 + 6) Bludgeoning damage. If the target is a Huge or smaller creature, it has the Prone condition.
  - Rock: r 9, range 30/120 ft. {@h}22 (3d10 + 6) Bludgeoning damage.
  - Limited Foresight (Recarga 6): {@actTrigger} A creature the cyclops can see makes an attack roll against it. {@actResponse} The cyclops imposes Disadvantage on the roll, and the cyclops gains Advantage on attack rolls against the target until the end of the cyclops's next turn.

### [drider] Drider — desafío 6, Grande Monstruosidad
Descripción oficial: [Drider] Spiderlike Underdark Hunter [Habitat:] Forest, Underdark [Treasure:] Armaments Driders combine the features of drow and giant spiders. The wicked god Lolth is fond of transforming her drow worshipers into driders, as either a blessing or a curse. These driders often become fanatical servants of their god, or they are overwhelmed by their transformation and live only to indulge their predatory arachnid instincts. Driders also appear when whole communities are transformed by a wicked god's wrath or other magical means, or driders might be part of a world's natural population. Most dwell underground or in dense forests where they can make the most of their spiderlike traits. Driders with non-drow features are uncommon but possible. Roll on or choose a result from the Drider Metamorphoses table to inspire how supernatural driders come into being. Drider Metamorphoses / 1 | A blessing from a deity of assassins, dangerous wildernesses, or the Underdark. / 2 | A curse from a powerful hag, vengeful witch, or strange Artifact. / 3 | An experiment by an aboleth, a mind flayer, or another life-shaping magic-user. / 4 | A magical means of escaping disaster or some worse fate. / 5 | A mutation after exposure to chaotic planar energies or strange Underdark radiations. / 6 | A punishment from a spiteful god, like Lolth or the Queen of Air and Darkness.
  - Spider Climb: The drider can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - Sunlight Sensitivity: While in sunlight, the drider has Disadvantage on ability checks and attack rolls.
  - Web Walker: The drider ignores movement restrictions caused by webs, and the drider knows the location of any other creature in contact with the same web.
  - Multiattack: The drider makes three attacks, using Foreleg or Poison Burst in any combination.
  - Foreleg: m 7, reach 10 ft. {@h}13 (2d8 + 4) Piercing damage.
  - Poison Burst: r 6, range 120 ft. {@h}13 (3d6 + 3) Poison damage.
  - Magic of the Spider Queen {@recharge 5} (conjuros): The drider casts Darkness, Faerie Fire, or Web, requiring no Material components and using Wisdom as the spellcasting ability (spell save 14).

### [galeb-duhr] Galeb Duhr — desafío 6, Mediano Elemental
Descripción oficial: [Galeb Duhr] Eyes and Ears of the Earth [Habitat:] Hill, Mountain [Treasure:] Any Beings of living rock, galeb duhr seek harmony with the earth and give voice to the vibrations of stone. Their rocky bodies have limbs and facial features accented by gems, ores, and other minerals found in the surrounding earth. Galeb duhr are effectively immortal, with lifespans similar in length to mountains. They don't experience time or perceive danger as shorter-lived species do. Galeb duhr avoid danger by hiding from other creatures. When they do reveal themselves, they speak and act ponderously, but they often know much of the surrounding land and secrets within the earth. When motivated to action, galeb duhr slam into foes and animate nearby boulders to do the same. Some mountain dwellers view galeb duhr as aloof allies and might entrust these long-lived beings with secrets or treasures for future generations. Others speak of galeb duhr songs, barely audible harmonizations by groups of galeb duhr that are said to influence earthquakes and volcanic eruptions.
  - Avalanche Slam: m 8, reach 5 ft. {@h}12 (2d6 + 5) Bludgeoning damage. If the target is a Large or smaller creature and the galeb duhr moved 20+ feet straight toward it immediately before the hit, the target takes an extra 7 (2d6) Bludgeoning damage and has the Prone condition.
  - Animate Boulders (1/Day): The galeb duhr magically animates one or two boulders it can see within 60 feet of itself. Each boulder uses the Galeb Duhr stat block, except it has Intelligence and Charisma scores of 1 and lacks this action. The boulder takes its turn immediately after the galeb duhr on the same Initiative count, and it obeys the galeb duhr. A boulder remains animate for 1 minute or until it or the galeb duhr dies.

### [ghast-gravecaller] Ghast Gravecaller — desafío 6, Mediano Muerto viviente
  - Stench: con 13, any creature that starts its turn in a 5-foot Emanation originating from the ghast. {@actSaveFail} The target has the Poisoned condition until the start of its next turn. {@actSaveSuccess} The target is immune to this ghast's Stench for 24 hours.
  - Multiattack: The ghast makes two Horrific Necrosis attacks. It can replace one attack with a Claw attack.
  - Claw: m 6, reach 5 ft. {@h}13 (3d6 + 3) Slashing damage. If the target isn't an Undead, it has the Paralyzed condition until the end of its next turn.
  - Horrific Necrosis: m,r 7, reach 5 ft. or range 120 ft. {@h}15 (2d10 + 4) Necrotic damage, and the target has the Frightened condition until the end of its next turn.
  - Spellcasting (conjuros): The ghast casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability: Speak with Dead Thaumaturgy

### [giant-squid] Giant Squid — desafío 6, Enorme Bestia
  - Water Breathing: The squid can breathe only underwater.
  - Multiattack: The squid makes one Bite attack and one Tentacle attack.
  - Bite: m 9, reach 5 ft. {@h}28 (4d10 + 6) Piercing damage.
  - Tentacle: m 9, reach 15 ft. {@h}19 (3d8 + 6) Bludgeoning damage. If the target is a Huge or smaller creature, it has the Grappled condition (escape 16) from one of two tentacles, and the squid can pull the target up to 10 feet straight toward itself.
  - Ink Cloud (1/Day): {@actTrigger} The squid takes damage while underwater. {@actResponse} The squid releases ink that fills a 15-foot Cube centered on itself, and the squid moves up to its Swim Speed. The Cube is Heavily Obscured for 1 minute or until a strong current or similar effect disperses the ink.

### [githzerai-zerth] Githzerai Zerth — desafío 6, Mediano Aberración
  - Multiattack: The githzerai makes two Psi Strike attacks.
  - Psi Strike: m 7, reach 5 ft. {@h}11 (2d6 + 4) Bludgeoning damage plus 13 (3d8) Psychic damage.
  - Spellcasting (conjuros): The githzerai casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability (spell save 14): Mage Hand (the hand is Invisible) Phantasmal Killer (level 6 version) Plane Shift See Invisibility
  - Psi-Powered Leap (2/Day) (conjuros): The githzerai casts Jump, requiring no spell components and using the same spellcasting ability as Spellcasting. Jump
  - Psionic Defense (2/Day) (conjuros): The githzerai casts Feather Fall or Shield in response to the spell's trigger, requiring no spell components and using the same spellcasting ability as Spellcasting. Feather Fall Shield

### [hobgoblin-warlord] Hobgoblin Warlord — desafío 6, Mediano Feérico
  - Aura of Authority: While in a 30-foot Emanation originating from the hobgoblin, the hobgoblin and its allies have Advantage on attack rolls and saving throws, provided the hobgoblin doesn't have the Incapacitated condition.
  - Multiattack: The hobgoblin makes three attacks, using Javelin or Longsword in any combination.
  - Javelin: m,r 6, reach 5 ft. or range 30/120 ft. {@h}11 (2d6 + 4) Piercing damage, and the target's Speed decreases by 10 feet until the start of the hobgoblin's next turn.
  - Longsword: m 6, reach 5 ft. {@h}12 (2d8 + 3) Slashing damage.
  - Parry: {@actTrigger} The hobgoblin is hit by a melee attack roll while holding a weapon. {@actResponse} The hobgoblin adds 3 to its AC against that attack, possibly causing it to miss.

### [invisible-stalker] Invisible Stalker — desafío 6, Grande Elemental
Descripción oficial: [Invisible Stalker] Unseen Magical Assassin [Habitat:] Urban [Treasure:] None Magic and malice give form to invisible stalkers, bodiless spirits of the air. These elusive beings pass unseen with nothing more than a stirring of air. They control powerful winds capable of moving objects and battering foes. Magic-users conjure these creatures to serve as killers and thieves. Invisible stalkers relentlessly pursue their quarry, and they rarely leave evidence of their crimes. In rare cases, an invisible stalker lingers in the world without a spellcaster controlling it. Roll on or choose a result from the Uncontrolled Invisible Stalkers table to inspire why one of these monsters lurks in an area without a direct command. Uncontrolled Invisible Stalkers / 1 | The breath of an infamous god or monster. / 2 | A guardian of a hidden portal or magical site. / 3 | The lingering violent thoughts of someone killed in a great battle. / 4 | A manifestation of uncontrolled magic. / 5 | A servant of an evil elemental ruler such as Yan-C-Bin (the Elemental Prince of Evil Air). / 6 | Unable to complete its duty and tries to create circumstances allowing it to fulfill its task. As detectives, we seek truth by eliminating the impossible, ever mindful that the impossible might also be seeking to eliminate us.
  - Air Form: The stalker can enter an enemy's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.
  - Invisibility: The stalker has the Invisible condition.
  - Multiattack: The stalker makes three Wind Swipe attacks. It can replace one attack with a use of Vortex.
  - Wind Swipe: m 7, reach 5 ft. {@h}11 (2d6 + 4) Force damage.
  - Vortex: con 14, one Large or smaller creature in the stalker's space. {@actSaveFail} 7 (1d8 + 3) Thunder damage, and the target has the Grappled condition (escape 13). Until the grapple ends, the target can't cast spells with a Verbal component and takes 7 (2d6) Thunder damage at the start of each of the stalker's turns.

### [kuo-toa-archpriest] Kuo-toa Archpriest — desafío 6, Mediano Aberración
  - Amphibious: The kuo-toa can breathe air and water.
  - Sunlight Sensitivity: While in sunlight, the kuo-toa has Disadvantage on ability checks and attack rolls.
  - Multiattack: The kuo-toa makes three Strange Scepter attacks.
  - Strange Scepter: m,r 6, reach 5 ft. or range 120 ft. {@h}20 (5d6 + 3) Lightning damage.
  - Spellcasting (conjuros): The kuo-toa casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save 14): Detect Magic Thaumaturgy Destructive Wave Divination Hold Monster (level 6 version) Scrying Tongues
  - Shield of Faith (2/Day) (conjuros): The kuo-toa casts Shield of Faith, using the same spellcasting ability as Spellcasting. Shield of Faith

### [mage] Mage — desafío 6, Pequeño o Mediano Humanoide
  - Multiattack: The mage makes three Arcane Burst attacks.
  - Arcane Burst: m,r 6, reach 5 ft. or range 120 ft. {@h}16 (3d8 + 3) Force damage.
  - Spellcasting (conjuros): The mage casts one of the following spells, using Intelligence as the spellcasting ability (spell save 14): Detect Magic Light Mage Armor (included in AC) Mage Hand Prestidigitation Fireball (level 4 version) Invisibility Cone of Cold Fly
  - Misty Step (3/Day) (conjuros): The mage casts Misty Step, using the same spellcasting ability as Spellcasting. Misty Step
  - Protective Magic (3/Day) (conjuros): The mage casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting. Counterspell Shield

### [mammoth] Mammoth — desafío 6, Enorme Bestia
  - Multiattack: The mammoth makes two Gore attacks.
  - Gore: m 10, reach 10 ft. {@h}18 (2d10 + 7) Piercing damage. If the target is a Huge or smaller creature and the mammoth moved 20+ feet straight toward it immediately before the hit, the target has the Prone condition.
  - Trample: dex 18, one creature within 5 feet that has the Prone condition. {@actSaveFail} 29 (4d10 + 7) Bludgeoning damage. {@actSaveSuccess} Half damage.

### [medusa] Medusa — desafío 6, Mediano Monstruosidad
Descripción oficial: [Medusa] Snake-Haired Recluse with a Petrifying Gaze [Habitat:] Desert [Treasure:] Any With their hair of living snakes and their infamous petrifying gazes, medusas are hubristic creatures that inhabit sites of fallen glory. They often dwell beyond the fringes of civilization or travel in disguise, leaving trails of petrified victims. Some medusas dominate groups of monsters or criminals, controlling them with threats of petrified doom, while others recruit servants that are immune to being petrified, such as gargoyles and gorgons. Medusas are born or created through preternatural circumstances. Roll on or choose a result from the Medusa Fates table to inspire what led to a medusa's creation. Medusa Fates / 1 | Born a medusa and lives unaware of whatever curse or circumstances afflicted its ancestor. / 2 | Created by a god and tasked with guarding a treasure or secret. / 3 | A cultist who made a fiendish bargain and enjoyed rewards that have since faded. / 4 | An explorer transformed and compelled to defend a cursed ruin. / 5 | A vain noble whose magical attempt to gain eternal beauty backfired. / 6 | The victim of a bite from a magical serpent or reptilian god in disguise.
  - Multiattack: The medusa makes two Claw attacks and one Snake Hair attack, or it makes three Poison Ray attacks.
  - Claw: m 6, reach 5 ft. {@h}10 (2d6 + 3) Slashing damage.
  - Snake Hair: m 6, reach 5 ft. {@h}5 (1d4 + 3) Piercing damage plus 14 (4d6) Poison damage.
  - Poison Ray: r 5, range 150 ft. {@h}11 (2d8 + 2) Poison damage.
  - Petrifying Gaze (Recarga 5–6): con 13, each creature in a 30-foot Cone. If the medusa sees its reflection in the Cone, the medusa must make this save. 1 The target has the Restrained condition and repeats the save at the end of its next turn if it is still Restrained, ending the effect on itself on a success. 2 The target has the Petrified condition instead of the Restrained condition.

### [merfolk-wavebender] Merfolk Wavebender — desafío 6, Mediano Elemental
  - Amphibious: The merfolk can breathe air and water.
  - Multiattack: The merfolk makes two Aquatic Burst attacks.
  - Aquatic Burst: m,r 7, reach 5 ft. or range 60 ft. {@h}20 (3d10 + 4) Cold damage. If the target is a Large or smaller creature, it has the Prone condition.
  - Watery Rebuke: {@actTrigger} An enemy the merfolk can see enters a space within 5 feet of the merfolk. dstr 15, the triggering enemy. {@actSaveFail} 14 (4d6) Cold damage. If the target is Large or smaller, it is pushed up to 30 feet straight away from the merfolk by conjured water.
  - Spellcasting (conjuros): The merfolk casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save 15): Elementalism Light Control Water Create or Destroy Water

### [performer-maestro] Performer Maestro — desafío 6, Pequeño o Mediano Humanoide
  - Multiattack: The performer makes three Rapier attacks.
  - Rapier: m 7, reach 5 ft. {@h}8 (1d8 + 4) Piercing damage plus 7 (2d6) Psychic damage.
  - Beguiling Song: wis 15, each creature in a 20-foot-radius Sphere centered on a point within 120 feet. {@actSaveFail} 20 (3d10 + 4) Psychic damage, and the target has the Charmed condition until the end of the performer's next turn. {@actSaveSuccess} Half damage only.
  - Spellcasting (conjuros): The performer casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 15): Minor Illusion Prestidigitation Tasha's Hideous Laughter (level 3 version)

### [pirate-captain] Pirate Captain — desafío 6, Pequeño o Mediano Humanoide
  - Multiattack: The pirate makes three attacks, using Rapier or Pistol in any combination.
  - Rapier: m 7, reach 5 ft. {@h}13 (2d8 + 4) Piercing damage, and the pirate has Advantage on the next attack roll it makes before the end of this turn.
  - Pistol: r 7, range 30/90 ft. {@h}15 (2d10 + 4) Piercing damage.
  - Captain's Charm: wis 14, one creature the pirate can see within 30 feet. {@actSaveFail} The target has the Charmed condition until the start of the pirate's next turn.
  - Riposte: {@actTrigger} The pirate is hit by a melee attack roll while holding a weapon. {@actResponse} The pirate adds 3 to its AC against that attack, possibly causing it to miss. On a miss, the pirate makes one Rapier attack against the triggering creature if within range.

### [satyr-revelmaster] Satyr Revelmaster — desafío 6, Mediano Feérico
  - Magic Resistance: The satyr has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The satyr makes three Prance attacks.
  - Prance: m 7, reach 5 ft. {@h}13 (2d8 + 4) Bludgeoning damage, and the target has the Charmed condition until the start of the satyr's next turn.
  - Fey Melody (Recarga 4–6): The satyr conjures a charming or frightening song. wis 14, each enemy in a 60-foot Emanation originating from the satyr. {@actSaveFail} The target is subjected to the song's effect: [Charming] The target has the Charmed condition for 1 minute. While Charmed, the target has the Incapacitated condition and uses all its movement to dance in place. The effect ends on the target if it takes any damage. [Frightening] 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition for 1 minute. If the target ends its turn out of line of sight from the satyr, the condition ends on it.

### [vrock] Vrock — desafío 6, Grande Infernal
Descripción oficial: [Vrock] Demon of Carnage and Ruin [Habitat:] Planar (Abyss) [Treasure:] Armaments Screeching, vulturelike demons, vrocks soar from the Abyss to spread ruin and slaughter. Their filthy feathers carry magical toxins from the Lower Planes, creating a noxious cloud capable of killing those who escape the vrocks' vicious beaks and claws. To further terrorize their foes, vrocks unleash an otherworldly screech so terrible it can halt creatures in their tracks.
  - Demonic Restoration: If the vrock dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss.
  - Magic Resistance: The vrock has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The vrock makes two Shred attacks.
  - Shred: m 6, reach 5 ft. {@h}10 (2d6 + 3) Piercing damage plus 10 (3d6) Poison damage.
  - Spores (Recarga 6): con 15, each creature in a 20-foot Emanation originating from the vrock. {@actSaveFail} The target has the Poisoned condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. While Poisoned, the target takes 5 (1d10) Poison damage at the start of each of its turns. Emptying a flask of Holy Water on the target ends the effect early.
  - Stunning Screech (1/Day): con 15, each creature in a 20-foot Emanation originating from the vrock (demons succeed automatically). {@actSaveFail} 10 (3d6) Thunder damage, and the target has the Stunned condition until the end of the vrock's next turn.

### [wyvern] Wyvern — desafío 6, Grande Dragón
Descripción oficial: [Wyvern] Draconic Hunter with a Venomous Sting [Habitat:] Hill, Mountain [Treasure:] Any Opportunistic predators, wyverns are draconic ambushers that strike from above. These territorial hunters attack with their fangs and stinger-tipped tails. Wyvern stingers drip with deadly venom, a painful toxin feared by monster hunters and coveted by alchemists. Wyverns are aggressive and claim sizable territories around the mountains, crags, and ruins where they dwell. Despite their considerable strength, they're opportunistic hunters that target unwitting livestock and groups of encamped travelers. Wyverns usually land only to finish off creatures they've weakened with their poison and strafing attacks. Creatures that fight back or take flight might deter wyverns, convincing them to search for easier prey. Once wyverns overpower a quarry, they carry it to their cavernous lairs to either consume it in safety or trap it to eat later. Most wyverns don't hoard treasure, but their lairs are littered with the possessions of past victims. It isn't uncommon for wyverns to carry off chests, carts, or small boats along with their prey.
  - Multiattack: The wyvern makes one Bite attack and one Sting attack.
  - Bite: m 7, reach 5 ft. {@h}13 (2d8 + 4) Piercing damage.
  - Sting: m 7, reach 10 ft. {@h}11 (2d6 + 4) Piercing damage plus 24 (7d6) Poison damage, and the target has the Poisoned condition until the start of the wyvern's next turn.

### [young-brass-dragon] Young Brass Dragon — desafío 6, Grande Dragón
  - Multiattack: The dragon makes three Rend attacks. It can replace two attacks with a use of Sleep Breath.
  - Rend: m 7, reach 10 ft. {@h}15 (2d10 + 4) Slashing damage.
  - Fire Breath (Recarga 5–6): dex 14, each creature in a 40-foot-long, 5-foot-wide Line. {@actSaveFail} 38 (11d6) Fire damage. {@actSaveSuccess} Half damage.
  - Sleep Breath: con 14, each creature in a 30-foot Cone. {@actSaveFail} The target has the Incapacitated condition until the end of its next turn, at which point it repeats the save. 2 The target has the Unconscious condition for 1 minute. This effect ends for the target if it takes damage or a creature within 5 feet of it takes an action to wake it.
