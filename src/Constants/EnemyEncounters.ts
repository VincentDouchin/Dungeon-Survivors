import Enemies, { EnemyType } from "./Enemies"

import Encounter from "../Game/Encounter"

export type enemyWaveName = 'ORCS' | 'ANIMALS' | 'PRIESTS' | 'ELVES' | 'DEMONS' | 'VILLAGERS' | 'UNDEAD' | 'KINGSGUARD'
const bersek = (enemyType: EnemyType): EnemyType => ({ ...enemyType, berserk: true })


const ENENMYENCOUNTERS: Partial<Record<enemyWaveName, Encounter>> = {
	ORCS: new Encounter()
		.setBoundary(864, 864)
		.addWave([[Enemies.goblin, 40]], 5)
		.addWave([[Enemies.orc, 10], [Enemies.goblin, 30]], 5)
		.addWave([[Enemies.orc, 20], [Enemies.goblin, 20]], 5)
		.addWave([[Enemies.orcShaman, 10], [Enemies.orc, 20]], 4)
		.addWave([[Enemies.orcMasked, 10], [Enemies.orcShaman, 5], [Enemies.orc, 10]], 3)
		.waitForEnemiesCleared()
		.addWave([[Enemies.orcBig, 1], [Enemies.goblin, 20], [Enemies.orcMasked, 5], [Enemies.orcShaman, 5], [Enemies.orc, 10]], 1)
		.waitForEnemiesCleared()
		.stop()
	,
	ANIMALS: new Encounter()
		.addWave([[bersek(Enemies.bunny), 10], [Enemies.bunny, 10], [Enemies.mushroomSmall, 10], [Enemies.mushroomMedium, 10]], 10)
		.addWave([[Enemies.direwolf, 10], [Enemies.bunny, 10]], 5)
		.addWave([[Enemies.centaurFemale, 10], [Enemies.centaurMale, 10]], 4)
		.addWave([[Enemies.bear, 5], [Enemies.direwolf, 10], [Enemies.centaurFemale, 5], [Enemies.centaurMale, 5]], 3)
		.waitForEnemiesCleared()
		.addWave([[Enemies.mushroomBig, 1], [Enemies.mushroomSmall, 20], [Enemies.mushroomMedium, 10]], 1)
		.waitForEnemiesCleared()
		.stop()
	,
	ELVES: new Encounter()
		.addWave([[Enemies.leprechaun, 40]], 5)
		.addWave([[Enemies.leprechaun, 30], [Enemies.woodElfMale, 10], [Enemies.woodElfFemale, 10]], 5)
		.addWave([[Enemies.leprechaun, 20], [Enemies.woodElfMale, 10], [Enemies.woodElfFemale, 10]], 5)
		.addWave([[Enemies.elfKnight, 10], [Enemies.elfRanger, 10], [Enemies.leprechaun, 10], [Enemies.woodElfMale, 5], [Enemies.woodElfFemale, 5]], 5)
		.addGroup(Enemies.elfKing, Enemies.elfKnight, 8, 50)
		.addGroup(Enemies.elfQueen, Enemies.elfKnight, 8, 50)
		.waitForEnemiesCleared()
		.stop(),
	VILLAGERS: new Encounter()
		.addWave([[Enemies.villagerFemale, 20], [Enemies.villagerMale, 20]], 5)
		.addWave([[Enemies.villagerFemale, 15], [Enemies.villagerMale, 15], [Enemies.herald, 15]], 5)
		.addWave([[Enemies.shopKeeper, 10], [Enemies.mage, 10], [Enemies.villagerFemale, 10], [Enemies.villagerMale, 10]], 5)
		.addWave([[Enemies.alchemist, 10], [Enemies.blacksmith, 10], [Enemies.butcher, 10]], 5)
		.waitForEnemiesCleared()
		.addWave([[Enemies.executioner, 1], [Enemies.alchemist, 5], [Enemies.blacksmith, 5], [Enemies.butcher, 5]], 1)
		.waitForEnemiesCleared()
		.stop(),
	PRIESTS: new Encounter()
		.addWave([[Enemies.angel, 30], [Enemies.clericFat, 5], [Enemies.clericNormal, 5], [Enemies.clericSkinny, 5]], 5)
		.addWave([[Enemies.clericFat, 10], [Enemies.clericNormal, 10], [Enemies.clericSkinny, 10]], 5)
		.addWave([[Enemies.nunFat, 10], [Enemies.nunNormal, 10], [Enemies.nunSkinny, 10]], 5)
		.addGroup(Enemies.bishop, Enemies.angel, 8, 50)
		.waitForEnemiesCleared()
		.stop(),
	UNDEAD: new Encounter()
		.addWave([[Enemies.zombieSmall, 40]], 5)
		.addWave([[Enemies.muddy, 10], [Enemies.swampy, 10], [Enemies.zombieSmall, 20]], 5)
		.addWave([[Enemies.muddy, 10], [Enemies.swampy, 10], [Enemies.zombie, 15], [Enemies.zombieSmall, 10]], 5)
		.addWave([[Enemies.skeleton, 10], [Enemies.iceZombie, 5], [Enemies.zombie, 10]], 5)
		.addWave([[Enemies.skeleton, 15], [Enemies.zombie, 10]], 5)
		.waitForEnemiesCleared()
		.addWave([[Enemies.ogre, 1], [Enemies.skeleton, 10], [Enemies.zombie, 10], [Enemies.zombieSmall, 20]], 1)
		.waitForEnemiesCleared()
		.stop(),
	KINGSGUARD: new Encounter()
		.addWave([[Enemies.knight, 20]], 3)
		.addWave([[Enemies.knightFat, 10], [Enemies.knight, 15]], 4)
		.addWave([[Enemies.knight, 10], [Enemies.knightFat, 10], [Enemies.knightElite, 10]], 4)
		.addWave([[Enemies.knight, 10], [Enemies.knightElite, 10], [Enemies.knightEliteLarge, 2]], 2)
		.addGroup(Enemies.king, Enemies.knightElite, 8, 50)
		.addGroup(Enemies.queen, Enemies.knightElite, 8, 50)
		.waitForEnemiesCleared()
		.stop(),
	DEMONS: new Encounter()
		.addWave([[Enemies.imp, 40]], 5)
		.addWave([[Enemies.imp, 30], [Enemies.wogol, 10]], 5)
		.addWave([[Enemies.chort, 10], [Enemies.wogol, 10], [Enemies.imp, 20]], 5)
		.waitForEnemiesCleared()
		.addGroup(Enemies.demonBig, Enemies.chort, 12, 100)
		.waitForEnemiesCleared()
		.stop()


}
export default ENENMYENCOUNTERS