import Enemies, { EnemyType } from "./Enemies"

import Encounter from "../Game/Encounter"

const {
	goblin, orc, orcShaman, orcMasked, orcBig, orcBigPatch,
	bunny, mushroomSmall, mushroomMedium, mushroomBig, direwolf, bear, fox,
	leprechaun, woodElfMale, woodElfFemale, elfKnight, elfKing, elfQueen, elfRanger,
	villagerFemale, villagerMale, butcher, blacksmith, executioner,
	angel, clericFat, clericNormal, clericSkinny, bishop, templar, inquisitor, archAngel,
	zombieSmall, muddy, swampy, zombie, iceZombie, ogre, skeleton,
	knight, knightFat, knightElite, knightEliteLarge, king, queen, herald,
	imp, wogol, chort, demonBig, necromancer,
	cultist, cultistHooded, vampireMale, vampireFemale, vampireLord, bat
} = Enemies
export type enemyWaveName = 'ORCS' | 'ANIMALS' | 'PRIESTS' | 'ELVES' | 'DEMONS' | 'VILLAGERS' | 'UNDEAD' | 'KINGSGUARD' | 'VAMPIRES'
const berserk = (enemyType: EnemyType): EnemyType => ({ ...enemyType, berserk: true })


const ENENMYENCOUNTERS: Record<enemyWaveName, () => Encounter> = {
	ORCS: () => new Encounter() // 23 waves 605 enemies
		.addWave([[goblin, 20], [berserk(goblin), 5]], 5) //125
		.waitForEnemiesCleared()
		.addWave([[berserk(orc), 2], [orc, 5], [goblin, 15], [berserk(goblin), 5]], 5) // 135
		.waitForEnemiesCleared()
		.addWave([[orc, 10], [berserk(orc), 5], [goblin, 10]], 5) // 125
		.waitForEnemiesCleared()
		.addWave([[orcShaman, 3], [orc, 10], [goblin, 10]], 4) // 92
		.waitForEnemiesCleared()
		.addWave([[orcMasked, 5], [orcShaman, 3], [orc, 10], [goblin, 10]], 3) //84
		.waitForEnemiesCleared()
		.addWave([[orcBig, 1], [orcBigPatch, 1], [goblin, 20], [orcMasked, 8], [orcShaman, 5], [orc, 10]], 1) // 44
		.waitForEnemiesCleared()
		.stop(),
	ANIMALS: () => new Encounter() // 21 Waves 498 enemies
		.addWave([[berserk(bunny), 5], [bunny, 10], [mushroomSmall, 10], [mushroomMedium, 10]], 5) //175
		.waitForEnemiesCleared()
		.addWave([[fox, 10], [bunny, 10]], 5) //100
		.waitForEnemiesCleared()
		.addWave([[direwolf, 5], [fox, 5], [berserk(fox), 1], [berserk(direwolf), 1]], 4) //48
		.waitForEnemiesCleared()
		.addWave([[bear, 2], [direwolf, 5], [berserk(direwolf), 2], [bunny, 10]], 3) // 57
		.waitForEnemiesCleared()
		.addWave([[berserk(bear), 1], [bear, 3], [direwolf, 5], [bunny, 10], [fox, 4]], 3) //72
		.waitForEnemiesCleared()
		.addWave([[mushroomBig, 1], [mushroomSmall, 30], [mushroomMedium, 10], [berserk(mushroomMedium), 5]], 1) // 46
		.waitForEnemiesCleared()
		.stop(),
	ELVES: () => new Encounter() // 18 waves 512 enemies
		.addWave([[leprechaun, 20], [berserk(leprechaun), 5]], 5) //125
		.waitForEnemiesCleared()
		.addWave([[leprechaun, 10], [berserk(leprechaun), 5], [woodElfMale, 5], [woodElfFemale, 5]], 5) // 125
		.waitForEnemiesCleared()
		.addWave([[leprechaun, 10], [berserk(woodElfMale), 5], [woodElfMale, 5], [woodElfFemale, 5], [berserk(woodElfFemale), 5]], 4) //120
		.waitForEnemiesCleared()
		.addWave([[leprechaun, 10], [elfKnight, 3], [elfRanger, 2], [woodElfMale, 5], [woodElfFemale, 5]], 3) //120
		.waitForEnemiesCleared()
		.addWave([[elfKnight, 5], [elfRanger, 3], [leprechaun, 10], [woodElfMale, 5], [woodElfFemale, 5]], 3) // 84
		.waitForEnemiesCleared()
		.addGroup(elfKing, elfKnight, 8, 50) //9
		.addGroup(elfQueen, elfKnight, 8, 50) //9
		.addWave([[elfRanger, 5], [elfKnight, 10]], 1) // 84
		.waitForEnemiesCleared()
		.stop(),
	VILLAGERS: () => new Encounter() // 21 waves 636 enemies
		.addWave([[villagerFemale, 10], [berserk(villagerFemale), 3], [villagerMale, 10], [berserk(villagerMale), 3]], 5) // 130
		.waitForEnemiesCleared()
		.addWave([[berserk(villagerFemale), 3], [berserk(villagerMale), 3], [villagerFemale, 5], [villagerMale, 5], [butcher, 5]], 5) //115
		.waitForEnemiesCleared()
		.addWave([[blacksmith, 2], [butcher, 5], [berserk(butcher), 5], [villagerFemale, 10], [villagerMale, 10]], 4) //150
		.waitForEnemiesCleared()
		.addWave([[blacksmith, 5], [butcher, 5], [villagerFemale, 15], [villagerMale, 15]], 3) //225
		.waitForEnemiesCleared()
		.addWave([[executioner, 1], [villagerFemale, 10], [villagerMale, 10], [blacksmith, 5], [butcher, 5]], 1) //16
		.waitForEnemiesCleared()
		.stop(),
	PRIESTS: () => new Encounter()
		.addWave([[clericFat, 7], [clericNormal, 7], [clericSkinny, 7]], 5)
		.waitForEnemiesCleared()
		.addWave([[clericFat, 7], [clericNormal, 7], [clericSkinny, 7], [templar, 3]], 4)
		.waitForEnemiesCleared()
		.addWave([[clericFat, 7], [clericNormal, 7], [clericSkinny, 7], [templar, 5], [inquisitor, 3]], 3)
		.waitForEnemiesCleared()
		.addWave([[templar, 10], [inquisitor, 5]])
		.addGroup(bishop, templar, 5, 50)
		.addGroup(bishop, templar, 5, 50)
		.waitForEnemiesCleared()
		.addGroup(archAngel, angel, 12, 50)
		.waitForEnemiesCleared()
		.stop(),
	UNDEAD: () => new Encounter()
		.addWave([[zombieSmall, 20], [berserk(zombieSmall), 5]], 5)
		.waitForEnemiesCleared()
		.addWave([[berserk(muddy), 1], [berserk(swampy), 1], [muddy, 2], [swampy, 2], [zombieSmall, 15], [berserk(zombieSmall), 5]], 5)
		.waitForEnemiesCleared()
		.addWave([[muddy, 2], [swampy, 2], [zombie, 5], [zombieSmall, 10]], 5)
		.waitForEnemiesCleared()
		.addWave([[iceZombie, 3], [zombie, 10]], 4)
		.waitForEnemiesCleared()
		.addWave([[skeleton, 15], [zombie, 5], [zombieSmall, 10]], 3)
		.waitForEnemiesCleared()
		.addWave([[ogre, 1], [iceZombie, 5], [skeleton, 10], [zombie, 10], [zombieSmall, 20]], 1)
		.waitForEnemiesCleared()
		.stop(),
	KINGSGUARD: () => new Encounter()
		.addWave([[knight, 10], [berserk(knight), 5], [herald, 10]], 4)
		.waitForEnemiesCleared()
		.addWave([[knightFat, 10], [berserk(knightFat), 2], [knight, 10], [berserk(knight), 5]], 4)
		.waitForEnemiesCleared()
		.addWave([[knight, 10], [knightFat, 10], [berserk(knightFat), 4], [knightElite, 5]], 4)
		.waitForEnemiesCleared()
		.addWave([[knight, 10], [knightElite, 10], [knightEliteLarge, 2]], 2)
		.waitForEnemiesCleared()
		.addWave([[knightElite, 10], [berserk(knightElite), 5], [knightEliteLarge, 4]], 2)
		.addGroup(king, knightElite, 8, 50)
		.addGroup(queen, knightElite, 8, 50)
		.waitForEnemiesCleared()
		.stop(),
	DEMONS: () => new Encounter()
		.addWave([[imp, 20], [berserk(imp), 5]], 5)
		.waitForEnemiesCleared()
		.addWave([[imp, 20], [berserk(imp), 5], [wogol, 10]], 5)
		.waitForEnemiesCleared()
		.addWave([[chort, 8], [berserk(chort), 2], [wogol, 10], [imp, 20]], 5)
		.waitForEnemiesCleared()
		.addWave([[chort, 5], [berserk(chort), 5], [wogol, 5], [imp, 10], [necromancer, 3]], 3)
		.waitForEnemiesCleared()
		.addWave([[chort, 5], [berserk(chort), 5], [wogol, 5], [imp, 10], [necromancer, 5]], 1)
		.addGroup(demonBig, chort, 12, 100)
		.waitForEnemiesCleared()
		.stop(),
	VAMPIRES: () => new Encounter()
		.addWave([[cultist, 10], [bat, 10]], 5)
		.waitForEnemiesCleared()
		.addWave([[cultist, 5], [bat, 5], [cultistHooded, 5]], 5)
		.waitForEnemiesCleared()
		.addWave([[cultist, 5], [cultistHooded, 5], [bat, 5], [vampireMale, 3], [vampireFemale, 3]], 4)
		.waitForEnemiesCleared()
		.addWave([[cultist, 5], [cultistHooded, 5], [bat, 5], [vampireMale, 6], [vampireFemale, 6]], 3)
		.waitForEnemiesCleared()
		.addWave([[vampireLord, 1]], 1)
		.addWave([[bat, 5], [vampireMale, 5], [vampireFemale, 5]], 1)
		.waitForEnemiesCleared()
		.stop()


}
export default ENENMYENCOUNTERS