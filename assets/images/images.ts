export type UI = "arrow" | "arrowselected" | "bar" | "barempty" | "barfull" | "box" | "button" | "buttondisabled" | "buttonpressed" | "character" | "empty" | "frame1" | "frame2" | "healthBar" | "healthFull" | "mana" | "pause" | "pauseicon" | "selectedframe" | "title" | "touchdpad" | "touchdpadcenter" | "xp"
export type weapons = "arrow" | "bone" | "bow" | "hammer" | "sai" | "staff" | "sword"
export type others = "potion"
export type icons = "arrowVolley" | "attack" | "attack_boost" | "attack_down" | "attack_speed_boost" | "bleed" | "bleeding" | "blinded" | "blinding_light_spell" | "candy" | "claw" | "confused" | "counterspell" | "critdamage" | "critical_boost" | "curse" | "cursed_(disarmed+silenced)" | "damage" | "defense_boost" | "defense_down" | "disarmed" | "divine_protection_spell" | "element_boost" | "enemy_spawn_down" | "exp_boost" | "feather" | "fire_spell" | "fire_spell_2" | "fortify_spell" | "frenzy_spell_(critical_booster)" | "frozen" | "gem" | "ghost_form_(physical_damage_immunity)" | "glow" | "goldenfish" | "healing_spell" | "health_up" | "herbs" | "hungry" | "ice_spell" | "knockback_boost" | "knockback_resistance" | "lightning_spell" | "lock" | "lucky_boost" | "magic_amplification" | "mana_replenish" | "negative_status_resistance" | "on_fire_(burning)" | "paralyzed" | "poison" | "poisoned" | "poison_dagger" | "potato" | "regeneration" | "settings" | "silenced" | "skull" | "sleeping" | "slow" | "slowed" | "stunned" | "summoning_spell" | "swiftness" | "switch" | "teleportation_spell" | "thorn_vine_spell" | "turnSpeed" | "water_spell"
export type Background = "barrel1" | "barrel2" | "barrel3" | "barrel4" | "bushdead" | "cart1" | "cart2" | "crate" | "flower" | "flowersnow" | "grave1" | "grave2" | "grave3" | "grave4" | "graveloot" | "hay" | "hole" | "lavacrystal" | "pile" | "portal" | "pot" | "rockbig" | "rockbreakable" | "rocklavabig" | "rocklavasmall" | "rocksmall1" | "rocksmall2" | "rocksmall3" | "rocksnowbig" | "rocksnowsmall1" | "rocksnowsmall2" | "rocksnowsmall3" | "stairs" | "statue" | "stock" | "stumpbig" | "stumpsmall1" | "tree1" | "tree2" | "treedead" | "treesnow" | "trunksmall" | "well"
export type characters = "alchemistRun" | "alchemistWalk" | "angelRun" | "angelWalk" | "banditRun" | "banditWalk" | "bat" | "bearRun" | "bearWalk" | "bishopWalk" | "blacksmithRun" | "blacksmithWalk" | "bunnyRun" | "bunnyWalk" | "butcherRun" | "butcherWalk" | "centaurFemaleRun" | "centaurFemaleWalk" | "centaurMaleRun" | "centaurMaleWalk" | "chest" | "chortRun" | "chortWalk" | "cultistRun" | "cultistWalk" | "demonBigRun" | "demonBigWalk" | "elfArcherRun" | "elfArcherWalk" | "elfFemaleRun" | "elfFemaleWalk" | "elfKing" | "elfKnightRun" | "elfKnightWalk" | "elfMaleRun" | "elfMaleWalk" | "elfQueenRun" | "elfQueenWalk" | "elfTraderRun" | "elfTraderWalk" | "elfVillagerFemaleRun" | "elfVillagerFemaleWalk" | "elfVillagerMaleRun" | "elfVillagerMaleWalk" | "eliteKnightRun" | "eliteKnightWalk" | "executionerRun" | "executionerWalk" | "foxRun" | "foxWalk" | "gnollBruteRun" | "gnollBruteWalk" | "gnollKnightRun" | "gnollKnightWalk" | "gnollMaskedRun" | "gnollMaskedWalk" | "gnollRun" | "gnollWalk" | "goldenKnightRun" | "goldenKnightSmallRun" | "goldenKnightSmallWalk" | "goldenKnightWalk" | "heralsRun" | "heralsWalk" | "hoodedCultistRun" | "hoodedCultistWalk" | "icyZombie" | "impRun" | "impWalk" | "kingOldWalk" | "kingRun" | "kingWalk" | "knightFatRun" | "knightFatWalk" | "knightFemaleRun" | "knightMaleRun" | "knightMaleWalk" | "knightNormalRun" | "knightNormalWalk" | "knigthFemaleWalk" | "knigYoungRUn" | "knigYoungWalk" | "largeKnightRun" | "largeKnightWalk" | "leprechaunRun" | "leprechaunWalk" | "lizzardFemaleRun" | "lizzardFemaleWalk" | "lizzardMaleRun" | "lizzardMaleWalk" | "monkFatWalk" | "monkNormalWalk" | "monkSkinnyWalk" | "muddy" | "mushroomBigRun" | "mushroomBigWalk" | "mushroomNormalRun" | "mushroomNormalWalk" | "mushroomSmallRun" | "mushroomSmallWalk" | "necromancerRun" | "necromancerWalk" | "ninjaRun" | "ninjaWalk" | "nunFatWalk" | "nunNormalWalk" | "nunSkinnyWalk" | "orcBigPatchRun" | "orcBigPatchWalk" | "orcBigRun" | "orcBigWalk" | "orcMaskedRun" | "orcMaskedWalk" | "orcRun" | "orcShamanRun" | "orcShamanWalk" | "orcSmallRun" | "orcSmallWalk" | "orcWalk" | "orientalTraderRun" | "orientalTraderWalk" | "pirateAltRun" | "pirateAltWalk" | "pirateCaptainRun" | "pirateCaptainWalk" | "pirateRun" | "pirateWalk" | "plagueDoctorRun" | "plagueDoctorWalk" | "princessRun" | "princessWalk" | "queenRun" | "queenWalk" | "scoutRun" | "scoutWalk" | "skeletonAltRun" | "skeletonAltWalk" | "skeletonRun" | "skeletonWalk" | "slimy" | "t8l2ZE" | "templarRun" | "templarWalk" | "thiefRun" | "thiefWalk" | "treeRun" | "treeWalk" | "vampireFemaleRun" | "vampireFemaleWalk" | "vampireLordRun" | "vampireLordWalk" | "vampireMaleRun" | "vampireMaleWalk" | "villagerFemaleRun" | "villagerFemaleWalk" | "wizzardFemaleRun" | "wizzardFemaleWalk" | "wizzardMaleRun" | "wizzardMaleWalk" | "wogolRun" | "wogolWalk" | "wolfRun" | "wolfWalk" | "zombie" | "zombieBigRun" | "zombieBigWalk" | "zombieSmallRun" | "zombieSmallWalk"
export type effects = "auraCircle" | "beam" | "Clouds" | "fireProjectile" | "flag" | "Grass" | "Hay" | "healing" | "IceSpike-sheet" | "Leaf" | "lightning" | "Rain" | "RainOnFloor" | "Rock" | "RockBlue" | "smoke" | "smokeCircular" | "Snow" | "Spark" | "Vase" | "Wood"
