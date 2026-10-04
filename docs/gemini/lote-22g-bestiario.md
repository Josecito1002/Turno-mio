# Encargo: Lote 22g (bestiario, desafío 6 a 10) de la app "Mi turno"

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

### [young-white-dragon] Young White Dragon — desafío 6, Grande Dragón
  - Ice Walk: The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, Difficult Terrain composed of ice or snow doesn't cost it extra movement.
  - Multiattack: The dragon makes three Rend attacks.
  - Rend: m 7, reach 10 ft. {@h}9 (2d4 + 4) Slashing damage plus 2 (1d4) Cold damage.
  - Cold Breath (Recarga 5–6): con 15, each creature in a 30-foot Cone. {@actSaveFail} 40 (9d8) Cold damage. {@actSaveSuccess} Half damage.

### [bandit-deceiver] Bandit Deceiver — desafío 7, Pequeño o Mediano Humanoide
  - Multiattack: The bandit makes three Dagger attacks.
  - Dagger: m,r 6, reach 5 ft. or range 20/60 ft. {@h}8 (2d4 + 3) Piercing damage plus 10 (3d6) Poison damage.
  - Blinding Flash (Recarga 4–6): con 14, each creature in a 10-foot-radius Sphere centered on a point the bandit can see within 120 feet. {@actSaveFail} 13 (3d6 + 3) Radiant damage, and the target has the Blinded condition until the start of the bandit's next turn. {@actSaveSuccess} Half damage only.
  - Spellcasting (conjuros): The bandit casts one of the following spells, using Intelligence as the spellcasting ability (spell save 14): Disguise Self Mage Hand Minor Illusion Hold Person (level 4 version) Mage Armor (included in AC) Major Image

### [blue-slaad] Blue Slaad — desafío 7, Grande Aberración
  - Magic Resistance: The slaad has Advantage on saving throws against spells and other magical effects.
  - Regeneration: The slaad regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point.
  - Multiattack: The slaad makes three Mutating Claw attacks.
  - Mutating Claw: m 8, reach 10 ft. {@h}12 (2d6 + 5) Slashing damage plus 3 (1d6) Poison damage. If the target is a Humanoid not cursed by a slaad, it is subjected to the following effect. con 15. {@actSaveFail} The target is cursed. The cursed target can't regain Hit Points, and its Hit Point maximum decreases by 10 (3d6) after every 24 hours and doesn't return to normal after finishing a Long Rest. If the curse reduces the target's Hit Point maximum to 0, the curse ends, and instead of dying, the target instantly transforms into a Red Slaad or, if it can cast spells of level 3 or higher, a Green Slaad. Only a Wish spell can reverse this transformation.

### [centaur-warden] Centaur Warden — desafío 7, Grande Feérico
  - Multiattack: The centaur makes two attacks, using Forest Staff or Sun Ray in any combination.
  - Forest Staff: m 7, reach 5 ft. {@h}13 (2d8 + 4) Bludgeoning damage plus 14 (4d6) Poison damage.
  - Sun Ray: r 7, range 90 ft. {@h}14 (3d6 + 4) Radiant damage, and the target has the Blinded condition until the start of the centaur's next turn.
  - Entangling Trail (Recarga 5–6): The centaur moves up to its Speed without provoking Opportunity Attacks. Each creature within 5 feet of the centaur as it moves is targeted once by the following effect. str 15. {@actSaveFail} 11 (2d6 + 4) Bludgeoning damage, and the target has the Restrained condition until the end of its next turn.
  - Spellcasting (conjuros): The centaur casts one of the following spells, using Wisdom as the spellcasting ability (spell save 15): Druidcraft Speak with Animals

### [giant-ape] Giant Ape — desafío 7, Enorme Bestia
  - Multiattack: The ape makes two Fist attacks.
  - Fist: m 9, reach 10 ft. {@h}22 (3d10 + 6) Bludgeoning damage.
  - Boulder Toss (Recarga 6): The ape hurls a boulder at a point it can see within 90 feet. dex 17, each creature in a 5-foot-radius Sphere centered on that point. {@actSaveFail} 24 (7d6) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition. {@actSaveSuccess} Half damage only.
  - Leap: The ape jumps up to 30 feet by spending 10 feet of movement.

### [graveyard-revenant] Graveyard Revenant — desafío 7, Enorme Muerto viviente
  - Undead Restoration: If the revenant dies, it revives 24 hours later unless Dispel Evil and Good is cast on its remains. If it revives, it animates another group of corpses elsewhere on the same plane of existence; it now looks different but uses the same stat block and returns with all its Hit Points.
  - Multiattack: The revenant makes two Suffocate attacks.
  - Suffocate: m 8, reach 10 ft. {@h}10 (1d10 + 5) Bludgeoning damage plus 10 (3d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape 15). Until the grapple ends, the target is suffocating. The revenant can have up to two targets Grappled in this way at a time.
  - Haunting Glare (Recarga 5–6): wis 15, each creature in a 30-foot Emanation originating from the revenant. {@actSaveFail} The target has the Paralyzed condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

### [grick-ancient] Grick Ancient — desafío 7, Grande Aberración
  - Multiattack: The grick makes one Beak attack, one Slam attack, and one Tentacles attack.
  - Beak: m 7, reach 10 ft. {@h}22 (4d8 + 4) Piercing damage.
  - Slam: m 7, reach 10 ft. {@h}7 (1d6 + 4) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition.
  - Tentacles: m 7, reach 10 ft. {@h}15 (2d10 + 4) Slashing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape 14) from all four tentacles.

### [mind-flayer] Mind Flayer — desafío 7, Mediano Aberración
  - Magic Resistance: The mind flayer has Advantage on saving throws against spells and other magical effects.
  - Tentacles: m 7, reach 5 ft. {@h}22 (4d8 + 4) Psychic damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape 14) from all the mind flayer's tentacles, and the target has the Stunned condition until the grapple ends.
  - Extract Brain: con 15, one creature that is Grappled by the mind flayer's Tentacles. {@actSaveFail} 55 (10d10) Piercing damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} If this damage reduces the target to 0 Hit Points, the mind flayer kills it and devours its brain.
  - Mind Blast (Recarga 5–6): int 15, each creature in a 60-foot Cone. {@actSaveFail} 31 (6d8 + 4) Psychic damage, and the target has the Stunned condition until the end of the mind flayer's next turn. {@actSaveSuccess} Half damage only.
  - Spellcasting (conjuros): The mind flayer casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save 15): Detect Thoughts Dominate Monster Plane Shift (self only)

### [oni] Oni — desafío 7, Grande Infernal
Descripción oficial: [Oni] Wickedness Drawn to the Wicked [Habitat:] Forest, Urban [Treasure:] Armaments Oni are elusive entities that inhabit dark forests and other wildernesses. By shape-shifting into the form of an innocent or moving invisibly, oni encroach on communities and lonely roads. They frequently harass people of faith, testing the limits of their piousness, or torment selfish people, punishing them for their wickedness. Wise communities often have guardian statues, annual rituals, or local superstitions meant to keep oni at bay. In rare cases, an oni might gradually befriend such communities and protect them from other threats for generations. Oni torment villages that don't pay them or other supernatural forces respect. Roll on or choose a result from the Oni Troubles table to inspire how an oni menaces such communities. Oni Troubles / 1 | Charming people to perform nasty tricks. / 2 | Claiming a bridge, gate, shrine, or trail and trying to eat anyone who comes near. / 3 | Luring other monsters to the settlement. / 4 | Playing drums that keep everyone awake.
  - Regeneration: The oni regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point.
  - Multiattack: The oni makes two Claw or Nightmare Ray attacks. It can replace one attack with a use of Spellcasting.
  - Claw: m 7, reach 10 ft. {@h}10 (1d12 + 4) Slashing damage plus 9 (2d8) Necrotic damage.
  - Nightmare Ray: r 5, range 60 ft. {@h}9 (2d6 + 2) Psychic damage, and the target has the Frightened condition until the start of the oni's next turn.
  - Shape-Shift: The oni shape-shifts into a Small or Medium Humanoid or a Large Giant, or it returns to its true form. Other than its size, its game statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed.
  - Spellcasting (conjuros): The oni casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 13): Charm Person (level 2 version) Darkness Gaseous Form Sleep
  - Invisibility (conjuros): The oni casts Invisibility on itself, requiring no spell components and using the same spellcasting ability as Spellcasting. Invisibility

### [primeval-owlbear] Primeval Owlbear — desafío 7, Enorme Monstruosidad
  - Magic Resistance: The owlbear has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The owlbear makes two Ravage attacks.
  - Ravage: m 9, reach 5 ft. {@h}15 (2d8 + 6) Slashing damage. If the target is a Huge or smaller creature and the owlbear moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 (2d8) Slashing damage and has the Prone condition.
  - Screech (Recarga 5–6): con 15, each creature in a 30-foot Emanation originating from the owlbear. {@actSaveFail} 27 (6d8) Thunder damage, and the target has the Incapacitated condition until the end of its next turn. {@actSaveSuccess} Half damage only.

### [shield-guardian] Shield Guardian — desafío 7, Grande Constructo
Descripción oficial: [Shield Guardian] Device-Controlled Magical Bodyguard [Habitat:] Urban [Treasure:] None An intimidating magical automaton, a shield guardian obeys its master's commands and protects its master from danger. When such a guardian is created, the magic that animates it is intertwined with a bonded command amulet. Any creature that has a shield guardian's command amulet can control that Construct and, in the case of magic-users, imbue it with a spell to unleash under predetermined circumstances. Yet a shield guardian's primary goal is to protect its master. It escorts whoever bears its command amulet and intercedes between the bearer and any threat. Although it isn't mindless, a shield guardian has no sense of self preservation and will sacrifice itself to protect its master. Shield guardians are typically constructed of steel, stone, and wood in the shape of watchful soldiers. More fanciful designs exist, reflecting the tastes of their creators. Given their resilience, it's common for shield guardians to eventually serve creatures other than their creators. A shield guardian's command amulet might be passed down through a magic-using society or family for generations.
  - Bound: The guardian is magically bound to an amulet. While the guardian and its amulet are on the same plane of existence, the amulet's wearer can telepathically call the guardian to travel to it, and the guardian knows the distance and direction to the amulet. If the guardian is within 60 feet of the amulet's wearer, half of any damage the wearer takes (round up) is transferred to the guardian.
  - Regeneration: The guardian regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point.
  - Spell Storing: A spellcaster who wears the guardian's amulet can cause the guardian to store one spell of level 4 or lower. To do so, the wearer must cast the spell on the guardian while within 5 feet of it. The spell has no effect but is stored within the guardian. Any previously stored spell is lost when a new spell is stored. The guardian can cast the spell stored with any parameters set by the original caster, requiring no spell components and using the caster's spellcasting ability. The stored spell is then lost.
  - Multiattack: The guardian makes two Fist attacks.
  - Fist: m 7, reach 10 ft. {@h}11 (2d6 + 4) Bludgeoning damage plus 7 (2d6) Force damage.
  - Protection: {@actTrigger} An attack roll hits the wearer of the guardian's amulet while the wearer is within 5 feet of the guardian. {@actResponse} The wearer gains a +5 bonus to AC, including against the triggering attack and possibly causing it to miss, until the start of the guardian's next turn.

### [stone-giant] Stone Giant — desafío 7, Enorme Gigante
Descripción oficial: [Stone Giant] Giant of the Earth [Habitat:] Mountain, Underdark [Treasure:] Armaments In cavernous depths and amid mountain canyons, stone giants contemplate the strength and persistence of the earth. Stone giants have rugged features and skin with patterns and hues similar to the rock common near their homes. This makes them adept at blending in with their stony surroundings despite their size. Stone giants rarely interfere in the affairs of other creatures, whether their smaller neighbors or other Giants. Most are slow to act, preferring to weather hardships or wait out perilous times. When roused to action—particularly when sites of ancient wonder or their homes are threatened—stone giants can unleash the might of mountains and crush foes with the force of an avalanche. Stone giants often ponder the mysteries of natural wonders, such as mountain spires, crystal formations, or mystical petroglyphs. Some know much about the magic and secret messages hidden within the earth. Those who confine themselves to the Underdark often regard the surface world and its inhabitants as dreams imagined into being by slumbering primordials, strange gods, or other entities.
  - Multiattack: The giant makes two attacks, using Stone Club or Boulder in any combination.
  - Stone Club: m 9, reach 15 ft. {@h}22 (3d10 + 6) Bludgeoning damage.
  - Boulder: r 9, range 60/240 ft. {@h}15 (2d8 + 6) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition.
  - Deflect Missile (Recarga 5–6): {@actTrigger} The giant is hit by a ranged attack roll and takes Bludgeoning, Piercing, or Slashing damage from it. {@actResponse} The giant reduces the damage it takes from the attack by 11 (1d10 + 6), and if that damage is reduced to 0, the giant can redirect some of the attack's force. dex 17, one creature the giant can see within 60 feet. {@actSaveFail} 11 (1d10 + 6) Force damage.

### [tree-blight] Tree Blight — desafío 7, Enorme Planta
  - Multiattack: The blight makes two Branch attacks and uses Grasping Root.
  - Branch: m 9, reach 15 ft. {@h}16 (3d6 + 6) Bludgeoning damage.
  - Grasping Root: str 17, one Large or smaller creature the blight can see within 15 feet. {@actSaveFail} The target is pulled up to 10 feet straight toward the blight and has the Grappled condition (escape 16) from one of six roots. Until the grapple ends, the target takes 13 (2d6 + 6) Bludgeoning damage at the start of each of its turns.
  - Gnash: dex 17, one creature Grappled by the blight. {@actSaveFail} 19 (3d8 + 6) Piercing damage. {@actSaveSuccess} Half damage.

### [violet-fungus-necrohulk] Violet Fungus Necrohulk — desafío 7, Grande Planta
  - Multiattack: The necrohulk makes two Rotting Slam attacks.
  - Rotting Slam: m 7, reach 10 ft. {@h}9 (1d10 + 4) Bludgeoning damage plus 7 (2d6) Necrotic damage.
  - Spore Bomb (Recarga 5–6): con 15, each creature in a 20-foot-radius Sphere centered on a point the necrohulk can see within 60 feet. {@actSaveFail} 28 (8d6) Necrotic damage, and the target has the Poisoned condition until the start of the necrohulk's next turn. While Poisoned, the target can't regain Hit Points. {@actSaveSuccess} Half damage only.
  - Absorb Body: str 15, one Medium or Small creature the necrohulk can see within 5 feet. {@actSaveFail} The target is pulled into the necrohulk's space and becomes grafted to its body. The necrohulk can have only one target grafted at a time. While grafted, the target has the Restrained condition and Disadvantage on Constitution saving throws. When the necrohulk moves, the grafted target moves with it. If the target dies while grafted, its body is destroyed, and the necrohulk regains 10 Hit Points. The grafted target or a creature within 5 feet of the necrohulk can take an action to make a 15 Strength (Athletics) check. On a successful check, the target is no longer grafted and moves to an unoccupied space within 5 feet of the necrohulk.

### [young-black-dragon] Young Black Dragon — desafío 7, Grande Dragón
  - Amphibious: The dragon can breathe air and water.
  - Multiattack: The dragon makes three Rend attacks.
  - Rend: m 7, reach 10 ft. {@h}9 (2d4 + 4) Slashing damage plus 3 (1d6) Acid damage.
  - Acid Breath (Recarga 5–6): dex 14, each creature in a 30-foot-long, 5-foot-wide Line. {@actSaveFail} 49 (14d6) Acid damage. {@actSaveSuccess} Half damage.

### [young-copper-dragon] Young Copper Dragon — desafío 7, Grande Dragón
  - Multiattack: The dragon makes three Rend attacks. It can replace one attack with a use of Slowing Breath.
  - Rend: m 7, reach 10 ft. {@h}15 (2d10 + 4) Slashing damage.
  - Acid Breath (Recarga 5–6): dex 14, each creature in a 40-foot-long, 5-foot-wide Line. {@actSaveFail} 40 (9d8) Acid damage. {@actSaveSuccess} Half damage.
  - Slowing Breath: con 14, each creature in a 30-foot Cone. {@actSaveFail} The target can't take Reactions; its Speed is halved; and it can take either an action or a Bonus Action on its turn, not both. This effect lasts until the end of its next turn.

### [yuan-ti-abomination] Yuan-ti Abomination — desafío 7, Grande Monstruosidad
  - Magic Resistance: The yuan-ti has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The yuan-ti makes two Bite attacks, and it can use Spellcasting to cast Suggestion if available.
  - Bite: m 7, reach 5 ft. {@h}11 (2d6 + 4) Piercing damage plus 10 (3d6) Poison damage.
  - Constrict: str 15, one Large or smaller creature within 5 feet. {@actSaveFail} 28 (7d6 + 4) Bludgeoning damage. The target has the Grappled condition (escape 14), and it has the Restrained condition until the grapple ends. {@actSaveSuccess} Half damage only.
  - Poison Spray (Recarga 5–6): con 14, each creature in a 30-foot Cone. {@actSaveFail} 21 (6d6) Poison damage, and the target has the Poisoned condition until the end of the yuan-ti's next turn. While Poisoned, the target has the Blinded condition. {@actSaveSuccess} Half damage only.
  - Shape-Shift: The yuan-ti shape-shifts into a Large snake or returns to its true form. If it dies, it stays in its current form. The yuan-ti's game statistics are the same in each form, except where noted. Any equipment it is wearing or carrying isn't transformed.
  - Spellcasting (Yuan-ti Form Only) (conjuros): The yuan-ti casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save 15): Animal Friendship (snakes only) Suggestion

### [aberrant-cultist] Aberrant Cultist — desafío 8, Pequeño o Mediano Humanoide
  - Multiattack: The cultist makes two Tentacle Lash attacks. It can replace any attack with a use of Mind Rot.
  - Tentacle Lash: m 7, reach 10 ft. {@h}7 (1d6 + 4) Slashing damage plus 14 (4d6) Psychic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape 14) from one of two tentacles, and it has the Restrained condition until the grapple ends.
  - Mind Rot: wis 15, one creature the cultist can see within 90 feet. {@actSaveFail} 27 (6d8) Psychic damage, and the target has the Poisoned condition until the start of the cultist's next turn. {@actSaveSuccess} Half damage only.
  - Spellcasting (conjuros): The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save 15): Detect Thoughts Minor Illusion
  - Counterspell (2/Day) (conjuros): The cultist casts Counterspell in response to that spell's trigger, using the same spellcasting ability as Spellcasting. Counterspell

### [assassin] Assassin — desafío 8, Pequeño o Mediano Humanoide
Descripción oficial: [Assassin] Contract Killer [Habitat:] Any [Treasure:] Implements, Individual Assassins are professional killers skilled at stealthily approaching their victims and striking unseen. Most assassins kill for a reason, perhaps hiring themselves out to wealthy patrons or slaying for an unscrupulous cause. They use poisons and other deadly tools, and they might carry equipment to help them break into secure areas or avoid capture. Many assassins adhere to a professional code or exhibit some signature quirk. Roll on or choose a result from the Assassin Modus Operandi table to inspire an assassin's distinctive habits. Assassin Modus Operandi / 1 | Arranging their victims in artful tableaux. / 2 | Hiding within large objects, such as suits of armor or hollow furnishings. / 3 | Leaving behind a signature item, such as a calling card, flower, seashell, or tooth. / 4 | Posing as celebrities, holy people, or servants. / 5 | Taking trophies from their victims. / 6 | Using poison with a distinctive color or smell.
  - Evasion: If the assassin is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the assassin instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.
  - Multiattack: The assassin makes three attacks, using Shortsword or Light Crossbow in any combination.
  - Shortsword: m 7, reach 5 ft. {@h}7 (1d6 + 4) Piercing damage plus 17 (5d6) Poison damage, and the target has the Poisoned condition until the start of the assassin's next turn.
  - Light Crossbow: r 7, range 80/320 ft. {@h}8 (1d8 + 4) Piercing damage plus 21 (6d6) Poison damage.
  - Cunning Action: The assassin takes the Dash, Disengage, or Hide action.

### [berserker-commander] Berserker Commander — desafío 8, Pequeño o Mediano Humanoide
  - Bloodied Frenzy: While Bloodied, the berserker has Advantage on attack rolls and saving throws.
  - Multiattack: The berserker makes three attacks, using Greataxe or Javelin in any combination.
  - Greataxe: m 7, reach 5 ft. {@h}10 (1d12 + 4) Slashing damage, plus 10 (3d6) Thunder damage to the target or another creature within 5 feet of the target.
  - Javelin: m,r 7, reach 5 ft. or range 30/120 ft. {@h}18 (4d6 + 4) Piercing damage, and the target's Speed decreases by 5 feet until the start of the berserker's next turn.
  - Frenzied Rush: Each ally within 30 feet of the berserker can take a Reaction to move up to half the ally's Speed without provoking Opportunity Attacks. The berserker can also move up to half its Speed without provoking Opportunity Attacks.

### [chain-devil] Chain Devil — desafío 8, Mediano Infernal
Descripción oficial: [Chain Devil] Devil of Pain and Control [Habitat:] Planar (Nine Hells) [Treasure:] Implements Also known as kytons, chain devils consider themselves morbid artisans who use deception, menace, and vicious metal to coerce prisoners into betraying themselves. Many serve powerful devils, wrenching secrets from imprisoned souls using deadly, animate chains. Left to their own devices, chain devils encourage ruthless individuals to pursue forbidden magic, leading their pupils down paths to the Nine Hells. Along with psychological threats and physical harm, a chain devil uses its unnerving gaze to make its victims perceive their worst fear rather than the monster. Roll on or choose a result from the Chain Devil Masks table to inspire a chain devil's fearful appearance. Chain Devil Masks / 1 | The corpse of a loved one. / 2 | A disapproving deity. / 3 | A harsh instructor or superior. / 4 | The viewer at their lowest point in life.
  - Diabolical Restoration: If the devil dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.
  - Magic Resistance: The devil has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The devil makes two Chain attacks and uses Conjure Infernal Chain.
  - Chain: m 7, reach 10 ft. {@h}11 (2d6 + 4) Slashing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape 14) from one of two chains, and it has the Restrained condition until the grapple ends.
  - Conjure Infernal Chain: The devil conjures a fiery chain to bind a creature. dex 15, one creature the devil can see within 60 feet. {@actSaveFail} 9 (2d4 + 4) Fire damage, and the target has the Restrained condition until the end of the devil's next turn, at which point the chain disappears. If the target is Large or smaller, the devil moves the target up to 30 feet straight toward itself. {@actSaveSuccess} The chain disappears.
  - Unnerving Gaze: {@actTrigger} A creature the devil can see starts its turn within 30 feet of the devil and can see the devil. dwis 15, the triggering creature. {@actSaveFail} The target has the Frightened condition until the end of its turn. {@actSaveSuccess} The target is immune to this devil's Unnerving Gaze for 24 hours.

### [cloaker] Cloaker — desafío 8, Grande Aberración
Descripción oficial: [Cloaker] Haunter in the Dark [Habitat:] Underdark [Treasure:] Implements Cloakers are mysterious Underdark predators, named by adventurers for their resemblance to hanging cloaks when they cling to walls. What cloakers call themselves is unknown, if they refer to themselves at all. Though they're undeniably intelligent, their behavior is often inscrutable. Cloakers sometimes gather in Underdark enclaves, but they rarely build settlements or form social structures. Most operate as solitary predators, lurking in dismal subterranean reaches or abandoned dungeons—sometimes for months at a time—as they wait for prey to pass. They use their mottled hides to blend in with their surroundings. When unsuspecting prey nears, cloakers unfurl and attempt to latch on and then smother their victims in their powerful wings. Cloakers delight in frightening foes. In addition to their methods of ambush, cloakers can create illusory duplicates of themselves and emit surreal moans that non-cloakers find terrifying in unexplainable, primal ways. Cloakers might antagonize explorers lost in the Underdark for days, terrorizing and scattering them before attacking. They rarely converse with other beings, except to whisper eerie riddles to those they're about to consume.
  - Light Sensitivity: While in Bright Light, the cloaker has Disadvantage on attack rolls.
  - Multiattack: The cloaker makes one Attach attack and two Tail attacks.
  - Attach: m 6, reach 5 ft. {@h}13 (3d6 + 3) Piercing damage. If the target is a Large or smaller creature, the cloaker attaches to it. While the cloaker is attached, the target has the Blinded condition, and the cloaker can't make Attach attacks against other targets. In addition, the cloaker halves the damage it takes (round down), and the target takes the same amount of damage. The cloaker can detach itself by spending 5 feet of movement. The target or a creature within 5 feet of it can take an action to try to detach the cloaker, doing so by succeeding on a 14 Strength (Athletics) check.
  - Tail: m 6, reach 10 ft. {@h}8 (1d10 + 3) Slashing damage.
  - Moan: wis 13, each creature in a 60-foot Emanation originating from the cloaker. {@actSaveFail} The target has the Frightened condition until the end of the cloaker's next turn. {@actSaveSuccess} The target is immune to this cloaker's Moan for the next 24 hours.
  - Phantasms (Recharge after a Short or Long Rest) (conjuros): The cloaker casts the Mirror Image spell, requiring no spell components and using Wisdom as the spellcasting ability. The spell ends early if the cloaker starts or ends its turn in Bright Light. Mirror Image

### [cockatrice-regent] Cockatrice Regent — desafío 8, Grande Monstruosidad
  - Flyby: The cockatrice doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.
  - Multiattack: The cockatrice makes one Petrifying Bite attack and two Talons attacks.
  - Petrifying Bite: m 7, reach 5 ft. {@h}13 (2d8 + 4) Piercing damage. If the target is a creature, it is subjected to the following effect. con 14. 1 The target has the Restrained condition and repeats the save at the end of its next turn if it is still Restrained, ending the effect on itself on a success. 2 The target has the Petrified condition instead of the Restrained condition.
  - Talons: m 7, reach 5 ft. {@h}18 (4d6 + 4) Slashing damage.
  - Magical Backlash: {@actTrigger} A creature within 120 feet of the cockatrice deals damage to it. ddex 14, the triggering creature. {@actSaveFail} 13 (3d6 + 3) Force damage.

### [death-cultist] Death Cultist — desafío 8, Pequeño o Mediano Humanoide
  - Multiattack: The cultist makes three attacks, using Dread Scythe or Deathly Ray in any combination.
  - Dread Scythe: m 7, reach 10 ft. {@h}9 (1d10 + 4) Slashing damage plus 11 (2d10) Necrotic damage, and the target can't regain Hit Points until the end of its next turn.
  - Deathly Ray: r 6, range 120 ft. {@h}22 (4d10) Necrotic damage.
  - Spirit Wail (Recarga 5–6): wis 14, each creature in a 20-foot Emanation originating from the cultist. {@actSaveFail} 14 (4d6) Psychic damage, and the target has the Frightened condition until the end of its next turn. {@actSaveSuccess} Half damage only.
  - Spellcasting (conjuros): The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save 14): Speak with Dead Thaumaturgy

### [elemental-cultist] Elemental Cultist — desafío 8, Pequeño o Mediano Humanoide
  - Multiattack: The cultist makes three attacks, using Elemental Flail or Elemental Claw in any combination.
  - Elemental Flail: m 7, reach 5 ft. {@h}25 (6d6 + 4) damage of a type chosen by the cultist: Acid, Cold, Fire, Lightning, or Thunder.
  - Elemental Claw: r 7, range 120 ft. {@h}22 (4d10) damage of a type chosen by the cultist: Acid, Cold, Fire, Lightning, or Thunder. If the target is a Medium or smaller creature, the cultist moves the target up to 10 feet straight toward or away from itself.
  - Elemental Absorption (1/Day): {@actTrigger} The cultist takes Acid, Cold, Fire, Lightning, or Thunder damage. {@actResponse} The cultist gives itself Resistance to that instance of damage and gains 10 Temporary Hit Points.
  - Spellcasting (conjuros): The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save 15): Elementalism Mage Hand

### [fiend-cultist] Fiend Cultist — desafío 8, Pequeño o Mediano Humanoide
  - Multiattack: The cultist makes three Pact Axe attacks.
  - Pact Axe: m 7, reach 5 ft. {@h}10 (1d12 + 4) Slashing damage plus 13 (3d8) Fire damage.
  - Spellcasting (conjuros): The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save 15, 7 to hit with spell attacks): Scorching Ray (level 5 version) Thaumaturgy Fireball (level 6 version)
  - Hellish Rebuke (conjuros): The cultist casts Hellish Rebuke in response to that spell's trigger, using the same spellcasting ability as Spellcasting. Hellish Rebuke

### [fomorian] Fomorian — desafío 8, Enorme Gigante
Descripción oficial: [Fomorian] Cursed Giant of the Dark [Habitat:] Underdark [Treasure:] Any Once infamous for their magical aptitude, fomorians are giants afflicted with a fey curse. In their pride, they were tricked into invading the Feywild to claim its magic for their own. When the archfey rulers of that realm united, the fomorians were turned back and cursed with supernatural strangeness to make their bodies match their vile souls. Ever since, fomorians have dwelled in the Underdark amid the ruins of their magical cities. The archfey's curse afflicts them still, tormenting them with wandering cankers, lurching organs, and stranger discomforts. Rather than atoning for their offenses, fomorians harness the magic of their curse and turn it against others. Roll on or choose a result from the Fomorian Warping table to inspire the cosmetic effects a creature undergoes while they're affected by a fomorian's Warping Hex. Fomorian Warping / 1 | Colorful, wandering pustules. / 2 | Excessive sweating of rainbow-hued fluids. / 3 | Patches of wriggling hair. / 4 | Veins that bulge and lurch under the skin. All-Father Annam banished his son, Karontor, for Karontor's part in the fomorian assault on the Feywild. That day, the ordning—the hierarchy of the giants and their gods—changed forever, and the fomorians were part of it no more.
  - Multiattack: The fomorian makes two Stone Club attacks. It can replace one attack with a use of Warping Hex if available.
  - Stone Club: m 9, reach 15 ft. {@h}24 (4d8 + 6) Bludgeoning damage.
  - Warping Hex (Recarga 4–6): wis 16, one creature the fomorian can see within 120 feet. {@actSaveFail} 21 (6d6) Psychic damage, and the target gains 1 Exhaustion level. {@actSaveSuccess} Half damage only.

### [frost-giant] Frost Giant — desafío 8, Enorme Gigante
Descripción oficial: [Frost Giant] Giant of the Ice and Snow [Habitat:] Arctic, Mountain [Treasure:] Armaments From glacial mountain heights and vast tundras rise the homes of frost giants. These giants have skin and hair of icy hues. Their natural immunity to cold allows them to flourish in places inhospitable to most other creatures. They use this resilience to aid them when hunting and in combat, bolstering their allies with chilling war cries. Frost giants often travel far to find food and goods. This leads many to become raiders and earn violent reputations. Others live more peaceably by hunting titanic game or creating sanctuaries from the cold (frequently featuring hot springs or snowy contests). Frost giants sometimes forge partnerships with icy Fey or fire giants dwelling underground, serving as guardians to their realms in exchange for treasure, weapons, and crafts. The small folk have barely anything worth looting, so they shouldn't much mind when we take it from them.
  - Multiattack: The giant makes two attacks, using Frost Axe or Great Bow in any combination.
  - Frost Axe: m 9, reach 10 ft. {@h}19 (2d12 + 6) Slashing damage plus 9 (2d8) Cold damage.
  - Great Bow: r 9, range 150/600 ft. {@h}17 (2d10 + 6) Piercing damage plus 7 (2d6) Cold damage, and the target's Speed decreases by 10 feet until the end of its next turn.
  - War Cry (Recarga 5–6): The giant or one creature of its choice that can see or hear it gains 16 (2d10 + 5) Temporary Hit Points and has Advantage on attack rolls until the start of the giant's next turn.

### [githyanki-knight] Githyanki Knight — desafío 8, Mediano Aberración
  - Multiattack: The githyanki makes three Silver Sword attacks. It can replace one attack with a use of Spellcasting to cast Telekinesis if available.
  - Silver Sword: m 6, reach 5 ft. {@h}10 (2d6 + 3) Slashing damage plus 14 (4d6) Psychic damage. Critical {@h}If the target is in an astral body (as with the Astral Projection spell), the githyanki can cut the silvery cord that tethers the target to its material body instead of dealing damage.
  - Spellcasting (conjuros): The githyanki casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save 13): Mage Hand (the hand is Invisible) Nondetection (self only) Tongues Plane Shift Telekinesis
  - Misty Step (2/Day) (conjuros): The githyanki casts Misty Step, requiring no spell components and using the same spellcasting ability as Spellcasting. Misty Step

### [gnoll-demoniac] Gnoll Demoniac — desafío 8, Mediano Infernal
  - Multiattack: The gnoll makes two Abyssal Strike attacks.
  - Abyssal Strike: m,r 6, reach 5 ft. or range 60 ft. {@h}20 (5d6 + 3) Poison damage.
  - Hunger of Yeenoghu (Recarga 5–6): The gnoll conjures a 30-foot Cube of magical Darkness originating from a point it can see within 60 feet, which lasts for 1 minute or until the gnoll's Concentration ends on it. This area is Difficult Terrain. dex 14, any creature that starts its turn in this area or enters it for the first time on a turn. {@actSaveFail} 28 (8d6) Necrotic damage, and the gnoll or a creature of its choice it can see gains 10 Temporary Hit Points. {@actSaveSuccess} Half damage only.
  - Rampage (2/Day): Immediately after dealing damage to a creature that is already Bloodied, the gnoll moves up to half its Speed, and it makes one Abyssal Strike attack.

### [green-slaad] Green Slaad — desafío 8, Grande Aberración
  - Magic Resistance: The slaad has Advantage on saving throws against spells and other magical effects.
  - Regeneration: The slaad regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point.
  - Multiattack: The slaad makes three Chaos Staff attacks.
  - Chaos Staff: m,r 7, reach 10 ft. or range 60 ft. {@h}8 (1d8 + 4) Force damage. Until the start of the slaad's next turn, the target has a condition determined by rolling 1d4: on a 1, Charmed; on a 2, Frightened; on a 3, Poisoned; or on a 4, Incapacitated.
  - Shape-Shift: The slaad shape-shifts into a Small or Medium Humanoid, or it returns to its true form. Other than its size, its game statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed.
  - Spellcasting (conjuros): The slaad casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 14, 6 to hit with spell attacks): Detect Magic Detect Thoughts Mage Hand Fireball Invisibility (self only)

### [hezrou] Hezrou — desafío 8, Grande Infernal
Descripción oficial: [Hezrou] Demon of Obscenity and Outrage [Habitat:] Planar (Abyss) [Treasure:] Any Hezrous compose the bulk of many demonic hordes. In croaking, reeking throngs, these ogre-size brutes seek to crush and consume foes. Their oozing hides are manifestations of embodied evils. Every few moments, patches of their slimy skins erupt with grotesque transformations such as rows of mismatched fangs, fungal growths, or half-formed features. These unsettling manifestations emerge, then roil away. Hezrous serve more powerful demons, such as nalfeshnees and mariliths. They take the abuse and intimidation of these deadlier demons and pass it on to droves of weaker dretches and manes. This predictable brutality makes hezrous useful links in the chaotic structure of a demonic horde. When on the Material Plane or otherwise left to their own devices, hezrous recklessly indulge in destructive, short-sighted rampages. Only magic and threats from more powerful masters can curb these demons' outrages and compel hezrous to pursue greater plots. Powerful spellcasters often use sinister coercions, spells like Magic Circle and Planar Binding, or other magic to force hezrous to serve them. Roll on or choose a result from the Demonic Undertakings table to inspire how a magic-user might employ a hezrou or similar demon. Demonic Undertakings / 1 | Break open a vault and steal what's within. / 2 | Defile a place using blasphemous symbols and demonic gore. / 3 | Fetch or otherwise provide materials for a profane ritual. / 4 | Guard a site and slay anyone who comes near. / 5 | Hunt down a foe, destroying everything barring the demon's path. / 6 | Intimidate someone into following orders.
  - Demonic Restoration: If the hezrou dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss.
  - Magic Resistance: The hezrou has Advantage on saving throws against spells and other magical effects.
  - Stench: con 16, any creature that starts its turn in a 10-foot Emanation originating from the hezrou. {@actSaveFail} The target has the Poisoned condition until the start of its next turn.
  - Multiattack: The hezrou makes three Rend attacks.
  - Rend: m 7, reach 5 ft. {@h}6 (1d4 + 4) Slashing damage plus 9 (2d8) Poison damage.
  - Leap: The hezrou jumps up to 30 feet by spending 10 feet of movement.

### [hydra] Hydra — desafío 8, Enorme Monstruosidad
Descripción oficial: [Hydra] Multiheaded Serpent of Legend [Habitat:] Coastal, Swamp [Treasure:] Any Hydras are storied hero slayers with vicious, serpentine heads and infamous regenerative powers. Endlessly hungry, they devour any creatures they catch. Hydras that deplete an area of prey often go into a lengthy torpor until new prey arrives. Most hydras have five heads, but some mature or battle-tested hydras have more. Such elder hydras might become local legends, known for their battles with heroes or for the riches lost in their domains. While many hydras claim their own territories, wicked deities might use them to guard treasures or magical sites. Roll on or choose a result from the Hydra Lairs table to inspire why a hydra lurks where it does. Hydra Lairs / 1 | Ensure none claim the weapon of a fallen hero. / 2 | Defend the home of a wise but sinister oracle. / 3 | Guard a magical herb that blooms once a year. / 4 | Protect a font of poison that pollutes a river.
  - Hold Breath: The hydra can hold its breath for 1 hour.
  - Multiple Heads: The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead. At the end of each of its turns when it has at least one living head, the hydra grows two heads for each of its heads that died since its last turn, unless it has taken Fire damage since its last turn. The hydra regains 20 Hit Points when it grows new heads.
  - Reactive Heads: For each head the hydra has beyond one, it gets an extra Reaction that can be used only for Opportunity Attacks.
  - Multiattack: The hydra makes as many Bite attacks as it has heads.
  - Bite: m 8, reach 10 ft. {@h}10 (1d10 + 5) Piercing damage.

### [sphinx-of-secrets] Sphinx of Secrets — desafío 8, Grande Celestial
  - Inscrutable: No magic can observe the sphinx remotely or detect its thoughts without its permission. Wisdom (Insight) checks made to ascertain its intentions or sincerity are made with Disadvantage.
  - Magic Resistance: The sphinx has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The sphinx makes three Claw attacks. It can replace one attack with a use of Curse of the Riddle.
  - Claw: m 7, reach 5 ft. {@h}13 (2d8 + 4) Slashing damage plus 7 (2d6) Radiant damage.
  - Curse of the Riddle: int 15, one creature the sphinx can see within 60 feet. {@actSaveFail} 21 (6d6) Psychic damage, and the target is cursed with a riddle. The cursed target has Disadvantage on ability checks and attack rolls. In addition, if it takes the Magic action, it must succeed on a 15 Intelligence saving throw or that action is wasted. The cursed target can take a Study action to make a 15 Intelligence check, solving the riddle and ending the curse on a success. The curse ends early if the sphinx curses another target.
  - Spellcasting (conjuros): The sphinx casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save 15): Detect Magic Identify Prestidigitation Locate Object Remove Curse

### [spirit-naga] Spirit Naga — desafío 8, Grande Infernal
Descripción oficial: [Spirit Naga] Spiteful Serpentine Grudge Keeper [Habitat:] Planar (Lower Planes), Underdark [Treasure:] Arcana Spirit nagas loathe the world and all creatures. Possessing perfect memories, these venomous, cobra-like creatures recall every slight committed against them during their immortal existences. In their dank, joyless lairs, they create vicious plots to avenge themselves against even petty offenses. Spirit nagas seek to claim what they believe they deserve. Their schemes often involve poisons, vile spells, cursed objects, or magical compulsions, eventually making them wellsprings of diabolical knowledge and evil inspiration. Other villains often seek out spirit nagas as advisers and allies. Roll on or choose a result from the Spirit Naga Grievances table to inspire what motivates a spirit naga's schemes. Spirit Naga Grievances / 1 | A character is to blame for its recent failures. / 2 | It has been evicted from its rightful home. / 3 | Locals have reneged on an age-old bargain. / 4 | Other creatures are mocking it. / 5 | A rival is spying on it. / 6 | Someone's treasure rightfully belongs to it.
  - Fiendish Restoration: If it dies, the naga returns to life in 1d6 days and regains all its Hit Points. Only a Wish spell can prevent this trait from functioning.
  - Multiattack: The naga makes three attacks, using Bite or Necrotic Ray in any combination.
  - Bite: m 7, reach 10 ft. {@h}7 (1d6 + 4) Piercing damage plus 14 (4d6) Poison damage.
  - Necrotic Ray: r 6, range 60 ft. {@h}21 (6d6) Necrotic damage.
  - Spellcasting (conjuros): The naga casts one of the following spells, requiring no Somatic or Material components and using Intelligence as the spellcasting ability (spell save 14): Detect Magic Mage Hand Minor Illusion Water Breathing Detect Thoughts Dimension Door Hold Person (level 3 version) Lightning Bolt (level 4 version)

### [thri-kreen-psion] Thri-kreen Psion — desafío 8, Mediano Monstruosidad
  - Multiattack: The thri-kreen makes three Psionic Lance attacks.
  - Psionic Lance: m,r 7, reach 10 ft. or range 120 ft. {@h}18 (4d6 + 4) Psychic damage.
  - Spellcasting (conjuros): The thri-kreen casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save 15): Mage Hand (the hand is Invisible) Detect Thoughts Sending Synaptic Static

### [tyrannosaurus-rex] Tyrannosaurus Rex — desafío 8, Enorme Bestia
  - Multiattack: The tyrannosaurus makes one Bite attack and one Tail attack.
  - Bite: m 10, reach 10 ft. {@h}33 (4d12 + 7) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape 17). While Grappled, the target has the Restrained condition and can't be targeted by the tyrannosaurus's Tail.
  - Tail: m 10, reach 15 ft. {@h}25 (4d8 + 7) Bludgeoning damage. If the target is a Huge or smaller creature, it has the Prone condition.

### [vampire-nightbringer] Vampire Nightbringer — desafío 8, Pequeño o Mediano Muerto viviente
  - Sunlight Hypersensitivity: The vampire takes 10 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.
  - Multiattack: The vampire makes one Bite attack and one Shadow Strike attack.
  - Bite: m 7, reach 5 ft. {@h}7 (1d6 + 4) Piercing damage plus 10 (3d6) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the vampire regains Hit Points equal to that amount.
  - Shadow Strike: m 7, reach 5 ft. {@h}7 (1d6 + 4) Slashing damage plus 14 (4d6) Cold damage.
  - Shadow Stealth: While in Dim Light or Darkness, the vampire takes the Hide action.

### [young-bronze-dragon] Young Bronze Dragon — desafío 8, Grande Dragón
  - Amphibious: The dragon can breathe air and water.
  - Multiattack: The dragon makes three Rend attacks. It can replace one attack with a use of Repulsion Breath.
  - Rend: m 8, reach 10 ft. {@h}16 (2d10 + 5) Slashing damage.
  - Lightning Breath (Recarga 5–6): dex 15, each creature in a 60-foot-long, 5-foot-wide Line. {@actSaveFail} 49 (9d10) Lightning damage. {@actSaveSuccess} Half damage.
  - Repulsion Breath: str 15, each creature in a 30-foot Cone. {@actSaveFail} The target is pushed up to 40 feet straight away from the dragon and has the Prone condition.

### [young-green-dragon] Young Green Dragon — desafío 8, Grande Dragón
  - Amphibious: The dragon can breathe air and water.
  - Multiattack: The dragon makes three Rend attacks.
  - Rend: m 7, reach 10 ft. {@h}11 (2d6 + 4) Slashing damage plus 7 (2d6) Poison damage.
  - Poison Breath (Recarga 5–6): con 14, each creature in a 30-foot Cone. {@actSaveFail} 42 (12d6) Poison damage. {@actSaveSuccess} Half damage.

### [abominable-yeti] Abominable Yeti — desafío 9, Enorme Monstruosidad
  - Fear of Fire: If the yeti takes Fire damage, it has Disadvantage on attack rolls and ability checks until the end of its next turn.
  - Multiattack: The yeti can use its Chilling Gaze and makes two attacks, using Claw or Ice Throw in any combination.
  - Claw: m 11, reach 5 ft. {@h}14 (2d6 + 7) Slashing damage plus 7 (2d6) Cold damage.
  - Ice Throw: r 11, range 60/240 ft. {@h}12 (2d4 + 7) Bludgeoning damage plus 7 (2d6) Cold damage.
  - Chilling Gaze: con 18, one creature the yeti can see within 30 feet. {@actSaveFail} 21 (6d6) Cold damage, and the target has the Paralyzed condition until the start of the yeti's next turn unless the target has Immunity to Cold damage. {@actSaveSuccess} The target is immune to this yeti's Chilling Gaze for 1 hour.
  - Cold Breath (Recarga 6): con 18, each creature in a 30-foot Cone. {@actSaveFail} 45 (10d8) Cold damage. {@actSaveSuccess} Half damage.

### [bone-devil] Bone Devil — desafío 9, Grande Infernal
Descripción oficial: [Bone Devil] Devil of Dread and Obedience [Habitat:] Planar (Nine Hells) [Treasure:] Implements Bone devils are gaunt, nightmarish Fiends with pallid skin stretched tight over frames that combine human and insectile features. Also known as osyluths, these Fiends command weaker devils and other beings aligned with infernal legions. Bone devils ensure that the commands of hellish sovereigns are exacted efficiently and that non-devils fulfill their commitments to the Nine Hells. They slay those who renege on infernal deals, sending treacherous mortal souls to face unspeakable punishments. When not serving their diabolical masters, bone devils tempt self-obsessed mortals with promises of other creatures' adulation and obedience. These devils prop up petty tyrants, helping them grow increasingly calloused and amoral. Bone devils travel across the multiverse to fulfill diabolical orders. If left with no other choices, they might conscript mortals to aid them in their vicious goals. Roll on or choose a result from the Bone Devil Objectives table to inspire a bone devil's goals. Bone devils are just one of a thousand reasons never to make a deal with a devil, but they're a significant one. Break said deal, and it'll likely be one of these nightmares that drags you down to the Nine Hells. Bone Devil Objectives / 1 | Capture a soul that escaped the Nine Hells. / 2 | Convey a message or make an example of someone in the name of an archdevil. / 3 | Find someone who broke a deal with a devil. / 4 | Slay someone or steal something as part of its pact with a wicked magic-user.
  - Diabolical Restoration: If the devil dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.
  - Magic Resistance: The devil has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The devil makes two Claw attacks and one Infernal Sting attack.
  - Claw: m 8, reach 10 ft. {@h}13 (2d8 + 4) Slashing damage.
  - Infernal Sting: m 8, reach 10 ft. {@h}15 (2d10 + 4) Piercing damage plus 18 (4d8) Poison damage, and the target has the Poisoned condition until the start of the devil's next turn. While Poisoned, the target can't regain Hit Points.

### [brazen-gorgon] Brazen Gorgon — desafío 9, Grande Constructo
  - Flame Aura: At the end of each of the gorgon's turns, each creature in a 5-foot Emanation originating from the gorgon takes 13 (3d8) Fire damage.
  - Illumination: The gorgon sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet.
  - Multiattack: The gorgon makes two Gore attacks.
  - Gore: m 8, reach 5 ft. {@h}11 (2d6 + 4) Piercing damage plus 10 (3d6) Fire damage.
  - Smelting Charge (Recarga 5–6): The gorgon moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each time the gorgon enters a creature's space for the first time during this move, that target is subjected to the following effect. dex 16. {@actSaveFail} 13 (2d8 + 4) Piercing damage plus 13 (3d8) Fire damage, and the target is pulled into the gorgon's space and has the Grappled condition (escape 14); if the gorgon already has a creature Grappled, the target has the Prone condition instead. Until the grapple ends, the target has the Restrained condition. When the gorgon moves, the Grappled target moves with it, costing no extra movement.

### [clay-golem] Clay Golem — desafío 9, Grande Constructo
Descripción oficial: [Clay Golem] Guardian of Home and Heart [Habitat:] Urban [Treasure:] Relics Clay golems are magical defenders made from earth and clay to protect places or communities. The materials used in creating clay golems originate from near the location the golems protect and often have special significance to their creators, such as clay from a holy site or bricks from a magical ruin. While some clay golems are masterfully sculpted to resemble living beings, others have only vaguely humanlike forms. These golems obey their creators' orders and protect what their makers value most. Some still follow these orders long after their creators' deaths. Roll on or choose a result from the Clay Golem Orders table to inspire the commands a clay golem follows. Clay Golem Orders / 1 | Block the path of anyone who enters a site with a weapon drawn. / 2 | Defend any member of their creator's family or community who is threatened in its sight. / 3 | Prevent any Fiend from crossing a bridge. / 4 | Remove any who enter its creator's workshop.
  - Acid Absorption: Whenever the golem is subjected to Acid damage, it takes no damage and instead regains a number of Hit Points equal to the Acid damage dealt.
  - Berserk: Whenever the golem starts its turn Bloodied, roll 1d6. On a 6, the golem goes berserk. On each of its turns while berserk, the golem attacks the nearest creature it can see. If no creature is near enough to move to and attack, the golem attacks an object. Once the golem goes berserk, it continues to be berserk until it is destroyed or it is no longer Bloodied.
  - Immutable Form: The golem can't shape-shift.
  - Magic Resistance: The golem has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The golem makes two Slam attacks, or it makes three Slam attacks if it used Hasten this turn.
  - Slam: m 9, reach 5 ft. {@h}10 (1d10 + 5) Bludgeoning damage plus 6 (1d12) Acid damage, and the target's Hit Point maximum decreases by an amount equal to the Acid damage taken.
  - Hasten (Recarga 5–6): The golem takes the Dash and Disengage actions.

### [cloud-giant] Cloud Giant — desafío 9, Enorme Gigante
Descripción oficial: [Cloud Giant] Giant of the Loftiest Heights [Habitat:] Mountain [Treasure:] Arcana Cloud giants use the power of the skies to observe and subtly influence the world. These giants resemble humans with hair ranging from silver to blue and with skin in cloudlike shades from stark white to twilight hues. Curved canines grow in their upper jaws, extending past their lower lips. In battle, they attack with weapons wreathed in storm clouds and throw roaring thunderheads. Most cloud giants inhabit citadels crowning tremendous mountains or magical palaces that drift amid the clouds. Many of these giants believe they possess similarly lofty status or purpose. Some view themselves as godlike beings who can manipulate and steal from terrestrial beings with impunity. Others claim their long lives and place among the clouds grant them unique perspectives, so they chronicle what they witness in the world below without interfering. In either case, cloud giants often possess fabulous magical treasures, either claimed from across the world or created by (and gigantically sized for) themselves.
  - Multiattack: The giant makes two attacks, using Thunderous Mace or Thundercloud in any combination. It can replace one attack with a use of Spellcasting to cast Fog Cloud.
  - Thunderous Mace: m 12, reach 10 ft. {@h}21 (3d8 + 8) Bludgeoning damage plus 7 (2d6) Thunder damage.
  - Thundercloud: r 12, range 240 ft. {@h}18 (3d6 + 8) Thunder damage, and the target has the Incapacitated condition until the end of its next turn.
  - Spellcasting (conjuros): The giant casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 15): Detect Magic Fog Cloud Light Control Weather Gaseous Form Telekinesis
  - Misty Step (conjuros): The giant casts the Misty Step spell, using the same spellcasting ability as Spellcasting. Misty Step

### [fire-giant] Fire Giant — desafío 9, Enorme Gigante
Descripción oficial: [Fire Giant] Giant of the Smoldering Depths [Habitat:] Mountain, Underdark [Treasure:] Armaments Fire giants inhabit the hollow vaults and molten rivers of mountainous depths. There, they use subterranean heat and riches to craft wonders, from titanic weapons of war to delicate works of art. Fire giants have broad frames, skin tones in a variety of rocklike shades, and hair like flame. Most fire giants dwell in volcanically active mountains or cavernous depths that house their fortress-forges. Evil fire giants tend to be martially minded, and they craft mighty arms to conquer their neighbors and seize valuable resources. More temperate fire giants trade their works for what they need, and they might share the ancient techniques of Giant artisans with other craftspeople. In either case, fire giants are prone to undertaking ambitious designs, and they rarely appreciate interruptions in their titanic workshops.
  - Multiattack: The giant makes two attacks, using Flame Sword or Hammer Throw in any combination.
  - Flame Sword: m 11, reach 10 ft. {@h}21 (4d6 + 7) Slashing damage plus 10 (3d6) Fire damage.
  - Hammer Throw: r 11, range 60/240 ft. {@h}23 (3d10 + 7) Bludgeoning damage plus 4 (1d8) Fire damage, and the target is pushed up to 15 feet straight away from the giant and has Disadvantage on the next attack roll it makes before the end of its next turn.

### [glabrezu] Glabrezu — desafío 9, Grande Infernal
Descripción oficial: [Glabrezu] Demon of Delusion and Entrapment [Habitat:] Planar (Abyss) [Treasure:] Relics Glabrezus embody delusion and predatory guile. These cunning demons know the most effective traps are those that individuals devise for themselves. Despite having massive claws and overwhelming physicality, glabrezus excel at using flattery and misdirection to coerce victims into isolating themselves and harming others. In the Abyss, glabrezus act as lone hunters or deceitful advisers to greater demons. Glabrezus seek routes to the Material Plane and relish being summoned by magic-users. They eagerly serve mortals while tempting them to betray their allies and indulge in hubristic fantasies. A glabrezu strives to murder its summoner once the magic-user has committed irredeemable misdeeds and the mortal's soul is surely condemned to the Abyss. Your companion's life, or what you've journeyed through infinity in search of! Make your choice.
  - Demonic Restoration: If the glabrezu dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss.
  - Magic Resistance: The glabrezu has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The glabrezu makes two Pincer attacks and uses Pummel or Spellcasting.
  - Pincer: m 9, reach 10 ft. {@h}16 (2d10 + 5) Slashing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape 15) from one of two pincers.
  - Pummel: dex 17, one creature Grappled by the glabrezu. {@actSaveFail} 15 (3d6 + 5) Bludgeoning damage. {@actSaveSuccess} Half damage.
  - Spellcasting (conjuros): The glabrezu casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save 16): Darkness Detect Magic Dispel Magic Confusion Fly Power Word Stun

### [gray-slaad] Gray Slaad — desafío 9, Mediano Aberración
  - Magic Resistance: The slaad has Advantage on saving throws against spells and other magical effects.
  - Regeneration: The slaad regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point.
  - Multiattack: The slaad makes two Chaos Claw attacks.
  - Chaos Claw: m 8, reach 10 ft. {@h}9 (1d10 + 4) Slashing damage plus 11 (2d10) Necrotic damage. Until the start of the slaad's next turn, the target has a condition determined by rolling 1d4: on a 1, Charmed; on a 2, Frightened; on a 3, Poisoned; or on a 4, Incapacitated.
  - Shape-Shift: The slaad shape-shifts into a Small or Medium Humanoid, or it returns to its true form. Other than its size, its game statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed.
  - Spellcasting (conjuros): The slaad casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 16): Detect Magic Detect Thoughts Invisibility (self only) Mage Hand Major Image Cloudkill Fly Plane Shift (self only) Tongues

### [nycaloth] Nycaloth — desafío 9, Grande Infernal
Descripción oficial: [Nycaloth] Yugoloth of Strategy and Strife [Habitat:] Planar (Gehenna) [Treasure:] Armaments Fiendish warmongers, nycaloths relish combat and conquest. These tremendous winged yugoloths teleport around battlefields and into the air to bewilder their foes and attack with constantly shifting, Gehenna-forged axes—mercurial weapons similar to those favored by many yugoloths. Nycaloths might command groups of mezzoloths and make pacts to serve arcanaloths, ultroloths, fiendish warlords, or wicked mortals. So long as they can indulge their bloodlust, most nycaloths are willing to obey more powerful or cunning creatures. Some even serve competent leaders past the terms of their agreements to achieve long-pursued victories. But masters that lead nycaloths to defeat should fear these proud yugoloths' retribution. Nycaloths and other yugoloths frequently serve as mercenary forces in extraplanar conflicts that spill onto the Material Plane. Roll on or choose a result from the Yugoloth Incursions table to inspire the plans of a yugoloth war band. Yugoloth Incursions / 1 | Claim a portal with strategic importance. / 2 | Enlist monsters as allies or beasts of war. / 3 | Destroy a city harboring enemy cultists. / 4 | Liberate an imprisoned fiendish ally.
  - Fiendish Restoration: If the nycaloth dies outside Gehenna, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in Gehenna.
  - Magic Resistance: The nycaloth has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The nycaloth makes two Mercurial Axe attacks.
  - Mercurial Axe: m,r 9, reach 10 ft. or range 30/90 ft. {@h}18 (2d12 + 5) Slashing damage plus 10 (3d6) Force damage. {@hom}The axe magically returns to the nycaloth's hand immediately after a ranged attack.
  - Shadowy Teleport: The nycaloth has the Invisible condition for 1 minute, and it teleports up to 30 feet to an unoccupied space it can see. The condition ends early immediately after it deals damage.

### [treant] Treant — desafío 9, Enorme Planta
Descripción oficial: [Treant] Wise and Mighty Animate Tree [Habitat:] Forest [Treasure:] None Ancient inhabitants of the forest, treants are gigantic, animate trees with wizened faces. Most have lived for centuries and know secrets of the natural world. They avoid becoming embroiled in the conflicts of shorter-lived creatures, but they're protective of their forest homes. If roused to anger, treants can animate trees to aid them. Treants defend and are shaped by secrets of the forest. Roll on or choose a result from the Treant Secrets table to inspire what mysteries a treant protects. Treant Secrets / 1 | Blessed by a god and grows magic fruit. / 2 | Growing atop the entrance to a dungeon or portal to the Feywild. / 3 | Home to a community of pixies or sprites. / 4 | The last lore keeper of lost druidic knowledge. / 5 | Rooted on a hero's burial mound and animates trees that look like questing knights. / 6 | Scarred by a fire and holds the bones of the arsonist who started it in a hollow.
  - Siege Monster: The treant deals double damage to objects and structures.
  - Multiattack: The treant makes two Slam attacks.
  - Slam: m 10, reach 5 ft. {@h}16 (3d6 + 6) Bludgeoning damage.
  - Hail of Bark: r 10, range 180 ft. {@h}28 (4d10 + 6) Piercing damage.
  - Animate Trees (1/Day): The treant magically animates up to two trees it can see within 60 feet of itself. Each tree uses the Treant stat block, except it has Intelligence and Charisma scores of 1, it can't speak, and it lacks this action. The tree takes its turn immediately after the treant on the same Initiative count, and it obeys the treant. A tree remains animate for 1 day or until it dies, the treant dies, or it is more than 120 feet from the treant. The tree then takes root if possible.

### [young-blue-dragon] Young Blue Dragon — desafío 9, Grande Dragón
  - Multiattack: The dragon makes three Rend attacks.
  - Rend: m 9, reach 10 ft. {@h}12 (2d6 + 5) Slashing damage plus 5 (1d10) Lightning damage.
  - Lightning Breath (Recarga 5–6): dex 16, each creature in a 60-foot-long, 5-foot-wide Line. {@actSaveFail} 55 (10d10) Lightning damage. {@actSaveSuccess} Half damage.

### [young-silver-dragon] Young Silver Dragon — desafío 9, Grande Dragón
  - Multiattack: The dragon makes three Rend attacks. It can replace one attack with a use of Paralyzing Breath.
  - Rend: m 10, reach 10 ft. {@h}15 (2d8 + 6) Slashing damage.
  - Cold Breath (Recarga 5–6): con 17, each creature in a 30-foot Cone. {@actSaveFail} 49 (11d8) Cold damage. {@actSaveSuccess} Half damage.
  - Paralyzing Breath: con 17, each creature in a 30-foot Cone. 1 The target has the Incapacitated condition until the end of its next turn, when it repeats the save. 2 The target has the Paralyzed condition, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

### [aboleth] Aboleth — desafío 10, Grande Aberración
Descripción oficial: [Aboleth] Ageless Alien Mastermind [Habitat:] Underdark, Underwater [Treasure:] Relics In aquatic abysses, aboleths dream of dead empires and orchestrate plots that unfold across ages. These elusive, amphibious immortals physically and mentally overwhelm their victims and transform creatures with a slimy, aberrant infection, reshaping other beings to serve them beneath the waves. Aboleths possess terrifying intellects and have alien mindsets. These creatures possess perfect memories of proto-worlds and incomprehensible dominions from the multiverse's earliest eons. Their secrets are innumerable and unfathomable. Aboleths lurk in places awash in primordial mysteries: the ruins of aquatic empires, hidden magical nexuses, or weak places between planes of existence. In these lairs, aboleths dream of epochs past, collect throngs of psychically dominated servants, consume the minds of unwitting victims, and prepare for their return to power. Aboleths' alien goals and methods are often mysterious to other creatures. Roll on or choose a result from the Aboleth Schemes table to inspire an aboleth's schemes. The lies we call reason are fragile things, vulnerable and raw on the shores of eons. But in the dream-vaults of dread ancients roil seas of terrifying truth. Our age is an island, and the ebb of primordial tides avows the Stygian wave. Aboleth Schemes / 1 | Accomplish incomprehensible plans that lead it to act in seemingly random ways. / 2 | Learn more of the world by kidnapping people and consuming their minds. / 3 | Manipulate innocents into worshiping it as a god by using its telepathy from hiding. / 4 | Open a gate to the distant past or future, releasing an invasion from another time. / 5 | Rouse a dragon turtle, a kraken, or another sea monster to flood a coastal city. / 6 | Trick treasure hunters into recovering relics from its long-fallen empire. [Aboleth Lairs] Aboleths usually dwell in submerged ruins and caverns. They keep air-filled spaces for their terrestrial servants and to hold treasures that would be damaged by water.
  - Amphibious: The aboleth can breathe air and water.
  - Eldritch Restoration: If destroyed, the aboleth gains a new body in 5d10 days, reviving with all its Hit Points in the Far Realm or another location chosen by the DM.
  - Legendary Resistance (3/Day, or 4/Day in Lair): If the aboleth fails a saving throw, it can choose to succeed instead.
  - Mucus Cloud: While underwater, the aboleth is surrounded by mucus. con 14, each creature in a 5-foot Emanation originating from the aboleth at the end of the aboleth's turn. {@actSaveFail} The target is cursed. Until the curse ends, the target's skin becomes slimy, the target can breathe air and water, and it can't regain Hit Points unless it is underwater. While the cursed creature is outside a body of water, the creature takes 6 (1d12) Acid damage at the end of every 10 minutes unless moisture is applied to its skin before those minutes have passed.
  - Probing Telepathy: If a creature the aboleth can see communicates telepathically with the aboleth, the aboleth learns the creature's greatest desires.
  - Multiattack: The aboleth makes two Tentacle attacks and uses either Consume Memories or Dominate Mind if available.
  - Tentacle: m 9, reach 15 ft. {@h}12 (2d6 + 5) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape 14) from one of four tentacles.
  - Consume Memories: int 16, one creature within 30 feet that is Charmed or Grappled by the aboleth. {@actSaveFail} 10 (3d6) Psychic damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} The aboleth gains the target's memories if the target is a Humanoid and is reduced to 0 Hit Points by this action.
  - Dominate Mind (2/Day): wis 16, one creature the aboleth can see within 30 feet. {@actSaveFail} The target has the Charmed condition until the aboleth dies or is on a different plane of existence from the target. While Charmed, the target acts as an ally to the aboleth and is under its control while within 60 feet of it. In addition, the aboleth and the target can communicate telepathically with each other over any distance. The target repeats the save whenever it takes damage as well as after every 24 hours it spends at least 1 mile away from the aboleth, ending the effect on itself on a success.
  - Lash: The aboleth makes one Tentacle attack.
  - Psychic Drain: If the aboleth has at least one creature Charmed or Grappled, it uses Consume Memories and regains 5 (1d10) Hit Points.

### [cultist-hierophant] Cultist Hierophant — desafío 10, Pequeño o Mediano Humanoide
  - Multiattack: The cultist makes three attacks, using Pact Blade or Radiant Ray in any combination.
  - Pact Blade: m 9, reach 5 ft. {@h}12 (2d6 + 5) Slashing damage plus 18 (4d8) Radiant damage.
  - Radiant Ray: r 9, range 120 ft. {@h}31 (4d12 + 5) Radiant damage.
  - Spellcasting (conjuros): The cultist casts one of the following spells, using Charisma as the spellcasting ability (spell save 17): Thaumaturgy Jallarzi's Storm of Radiance (level 7 version) Mass Suggestion

### [cyclops-oracle] Cyclops Oracle — desafío 10, Enorme Gigante
  - Multiattack: The cyclops makes three attacks, using Radiant Strike or Flash of Light in any combination.
  - Radiant Strike: m 10, reach 10 ft. {@h}22 (3d10 + 6) Radiant damage.
  - Flash of Light: r 10, range 120 ft. {@h}17 (2d10 + 6) Radiant damage, and the target has Disadvantage on attack rolls until the end of the cyclops's next turn.
  - Portent (Recarga 4–6): {@actTrigger} The cyclops or an ally it can see makes a D20 Test. {@actResponse} The cyclops rolls 1d20 and chooses whether to use that roll in place of the d20 rolled for the D20 Test.
  - Spellcasting (conjuros): The cyclops casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save 16): Legend Lore Arcane Eye Detect Magic Locate Object

### [death-slaad] Death Slaad — desafío 10, Mediano Aberración
  - Magic Resistance: The slaad has Advantage on saving throws against spells and other magical effects.
  - Regeneration: The slaad regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point.
  - Multiattack: The slaad makes two Chaos Blade attacks.
  - Chaos Blade: m 9, reach 10 ft. {@h}11 (1d12 + 5) Slashing damage plus 10 (3d6) Necrotic damage. Until the start of the slaad's next turn, the target has a condition determined by rolling 1d4: on a 1, Charmed; on a 2, Frightened; on a 3, Poisoned; or on a 4, Incapacitated.
  - Shape-Shift: The slaad shape-shifts into a Small or Medium Humanoid, or it returns to its true form. Other than its size, its game statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed.
  - Spellcasting (conjuros): The slaad casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 16): Detect Magic Detect Thoughts Invisibility (self only) Mage Hand Major Image Blight (level 8 version) Cloudkill (level 6 version) Fly Plane Shift Tongues

### [deva] Deva — desafío 10, Mediano Celestial
Descripción oficial: [Deva] World-Changing Angelic Messenger [Habitat:] Planar (Upper Planes) [Treasure:] Relics Devas are emissaries of divine will. These immortal messengers adopt the shapes of mystical beasts or idealized, winged mortals. As with all angels, their true forms are known only to the gods they serve. Rather than literal correspondence from a god, a deva conveys an allegory or quest to mortals, tasking them with delivering something to its rightful place. While the angel might be called on in times of need, it encourages mortal heroism. Should a deva's chosen champions carry out their charge, they experience a revelation or the world is changed in line with divine purpose. Roll on or choose a result from the Deva Messages table to inspire a deva's charge. Deva Messages / 1 | The corpse of a hero in need of redemption. / 2 | The cure for a plague in a distant land. / 3 | A holy coffer that must not be opened. / 4 | A magic weapon usable only by a true hero. / 5 | A seedling that wilts if exposed to anger. / 6 | Someone from another world with a prophesied purpose but no memory.
  - Exalted Restoration: If the deva dies outside Mount Celestia, its body disappears, and it gains a new body instantly, reviving with all its Hit Points somewhere in Mount Celestia.
  - Magic Resistance: The deva has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The deva makes two Holy Mace attacks.
  - Holy Mace: m 8, reach 5 ft. {@h}7 (1d6 + 4) Bludgeoning damage plus 18 (4d8) Radiant damage.
  - Spellcasting (conjuros): The deva casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save 17): Detect Evil and Good Shapechange (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell) Commune Raise Dead
  - Divine Aid (2/Day) (conjuros): The deva casts Cure Wounds, Lesser Restoration, or Remove Curse, using the same spellcasting ability as Spellcasting. Cure Wounds Lesser Restoration Remove Curse

### [dire-worg] Dire Worg — desafío 10, Enorme Feérico
  - Magic Resistance: The worg has Advantage on saving throws against spells and other magical effects.
  - Multiattack: The worg makes three Bite attacks.
  - Bite: m 10, reach 5 ft. {@h}15 (2d8 + 6) Piercing damage plus 7 (2d6) Poison damage, and the target has the Poisoned condition until the start of the worg's next turn. While Poisoned, the target can't regain Hit Points.
  - Dreadful Howl (Recarga 5–6): wis 16, each creature within 30 feet that isn't a worg. {@actSaveFail} 36 (8d8) Psychic damage, and the target has the Frightened condition until the start of the worg's next turn. {@actSaveSuccess} Half damage only.
  - Warp Step: The worg teleports, along with a willing creature of its choice within 5 feet of it, up to 30 feet to an unoccupied space it can see.

### [guardian-naga] Guardian Naga — desafío 10, Grande Celestial
Descripción oficial: [Guardian Naga] Enduring Serpentine Lore Keeper [Habitat:] Desert, Forest, Planar (Upper Planes) [Treasure:] Relics Guardian nagas are immortal, serpentine scholars that possess perfect memories. They collect the histories and lore of those they live among, guarding cultures' stories and passing them on to new generations with infallible accuracy. Guardian nagas that outlive their host civilizations might linger in whatever ruins remain, preserving the civilizations' stories so their lost people might live on. Roll on or choose a result from the Guardian Naga Lore table to inspire what a naga knows. Guardian Naga Lore / 1 | The last words of an ancient sage or leader. / 2 | The location of a hidden city or continent. / 3 | A magic word, password, or riddle's answer. / 4 | The names of all who have told it stories. / 5 | An otherwise forgotten ritual or spell. / 6 | Recipes using regional ingredients. / 7 | Stories of forgotten gods and local spirits. / 8 | The vulnerabilities of a legendary monster.
  - Celestial Restoration: If the naga dies, it returns to life in 1d6 days and regains all its Hit Points unless Dispel Evil and Good is cast on its remains.
  - Multiattack: The naga makes two Bite attacks. It can replace any attack with a use of Poisonous Spittle.
  - Bite: m 8, reach 10 ft. {@h}17 (2d12 + 4) Piercing damage plus 22 (4d10) Poison damage.
  - Poisonous Spittle: con 16, one creature the naga can see within 60 feet. {@actSaveFail} 31 (7d8) Poison damage, and the target has the Blinded condition until the start of the naga's next turn. {@actSaveSuccess} Half damage only.
  - Spellcasting (conjuros): The naga casts one of the following spells, requiring no Somatic or Material components and using Wisdom as the spellcasting ability (spell save 16): Thaumaturgy Clairvoyance Cure Wounds (level 6 version) Flame Strike (level 6 version) Geas True Seeing

### [haunting-revenant] Haunting Revenant — desafío 10, Gargantuesco Muerto viviente
  - Haunted Zone: con 17, any creature that casts a spell while inside the revenant's space. {@actSaveFail} The spell fails and is wasted.
  - Undead Restoration: If the revenant dies, it revives 24 hours later unless Dispel Evil and Good is cast on its remains. If it revives, it animates another Gargantuan object or structure elsewhere on the same plane of existence; it now looks different but uses the same stat block and returns with all its Hit Points.
  - Multiattack: The revenant makes two Object Slam attacks and uses Invitation.
  - Object Slam: m,r 9 (with Advantage if the target is inside the revenant's space), reach 10 ft. or range 30/90 ft. {@h}27 (5d8 + 5) Bludgeoning damage.
  - Invitation: cha 17, each creature in a 60-foot Cone. {@actSaveFail} The target is teleported inside the revenant's space and swallowed. A swallowed creature has Total Cover against attacks and other effects outside the revenant. While the revenant has Hit Points, a swallowed creature can leave the revenant's space only by using magic that enables planar travel, such as the Plane Shift spell.
