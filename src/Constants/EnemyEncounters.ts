import Enemies, { EnemyType } from "./Enemies"

import Encounter from "../Game/Encounter"

export type enemyWaveName = 'ORCS' | 'ANIMALS' | 'PRIESTS' | 'ELVES' | 'DEMONS' | 'VILLAGERS' | 'UNDEAD' | 'KINGSGUARD'
const bersek = (enemyType: EnemyType): EnemyType => ({ ...enemyType, berserk: true })


const ENENMYENCOUNTERS: Partial<Record<enemyWaveName, Encounter>> = {
	ORCS: new Encounter()
		.setBoundary(864, 864)
		.addWave([[Enemies.goblin, 20]], 5)
		.addWave([[Enemies.orc, 4], [Enemies.goblin, 18]], 5)
		.addWave([[Enemies.orc, 10], [Enemies.goblin, 10]], 5)
		.addWave([[Enemies.orcShaman, 4], [Enemies.orc, 10]], 4)
		.addWave([[Enemies.orcMasked, 10]], 3)
		.addWave([[Enemies.orcBig, 1]], 1)
		.waitForEnemiesCleared()
		.stop()
	,
	ANIMALS: new Encounter()
		.addWave([[bersek(Enemies.bunny), 5], [Enemies.bunny, 5], [Enemies.mushroomSmall, 10], [Enemies.mushroomMedium, 5]], 10)
		.addWave([[Enemies.direwolf, 10]], 2)
		.addWave([[Enemies.centaurFemale, 5], [Enemies.centaurMale, 5]], 4)
		.addWave([[Enemies.bear, 3], [Enemies.direwolf, 10]], 3)
		.addWave([[Enemies.mushroomBig, 1]], 1)
		.waitForEnemiesCleared()
		.stop()
	,
	ELVES: new Encounter()
		.addWave([[Enemies.leprechaun, 20]], 5)
		.addWave([[Enemies.leprechaun, 20], [Enemies.woodElfMale, 5], [Enemies.woodElfFemale, 5]], 5)
		.addWave([[Enemies.leprechaun, 2], [Enemies.woodElfMale, 4], [Enemies.woodElfFemale, 4]], 5)
		.addWave([[Enemies.elfKnight, 5], [Enemies.elfRanger, 5]], 5)
		.addGroup(Enemies.elfKing, Enemies.elfKnight, 8, 50)
		.addGroup(Enemies.elfQueen, Enemies.elfKnight, 8, 50)
		.waitForEnemiesCleared()
		.stop(),
	VILLAGERS: new Encounter()
		.addWave([[Enemies.villagerFemale, 10], [Enemies.villagerMale, 10]], 5)
		.addWave([[Enemies.villagerFemale, 8], [Enemies.villagerMale, 8], [Enemies.herald, 8]], 5)
		.addWave([[Enemies.shopKeeper, 3], [Enemies.mage, 3], [Enemies.villagerFemale, 10], [Enemies.villagerMale, 10]], 5)
		.addWave([[Enemies.alchemist, 5], [Enemies.blacksmith, 5], [Enemies.butcher, 5]], 5)
		.addWave([[Enemies.executioner, 1]], 1)
		.waitForEnemiesCleared()
		.stop(),
	PRIESTS: new Encounter()
		.addWave([[Enemies.angel, 10], [Enemies.clericFat, 5], [Enemies.clericNormal, 5], [Enemies.clericSkinny, 5]], 5)
		.addWave([[Enemies.clericFat, 8], [Enemies.clericNormal, 8], [Enemies.clericSkinny, 8]], 5)
		.addWave([[Enemies.nunFat, 8], [Enemies.nunNormal, 8], [Enemies.nunSkinny, 8]], 5)
		.addGroup(Enemies.bishop, Enemies.angel, 8, 50)
		.waitForEnemiesCleared()
		.stop(),
	UNDEAD: new Encounter()
		.addWave([[Enemies.zombieSmall, 20]], 5)
		.addWave([[Enemies.muddy, 5], [Enemies.swampy, 5], [Enemies.zombieSmall, 15]], 5)
		.addWave([[Enemies.muddy, 8], [Enemies.swampy, 8], [Enemies.zombie, 15]], 5)
		.addWave([[Enemies.skeleton, 10], [Enemies.iceZombie, 5], [Enemies.zombie, 10]], 5)
		.addWave([[Enemies.skeleton, 15], [Enemies.zombie, 10]], 5)
		.addWave([[Enemies.ogre, 1]], 1)
		.waitForEnemiesCleared()
		.stop(),
	KINGSGUARD: new Encounter()
		.addWave([[Enemies.knight, 10]], 3)
		.addWave([[Enemies.knightFat, 4], [Enemies.knight, 10]], 4)
		.addWave([[Enemies.knight, 4], [Enemies.knightFat, 4], [Enemies.knightElite, 4]], 4)
		.addWave([[Enemies.knightElite, 10], [Enemies.knightEliteLarge, 2]], 2)
		.addGroup(Enemies.king, Enemies.knightElite, 8, 50)
		.addGroup(Enemies.queen, Enemies.knightElite, 8, 50)
		.waitForEnemiesCleared()
		.stop(),
	DEMONS: new Encounter()
		.addWave([[Enemies.imp, 20]], 5)
		.addWave([[Enemies.imp, 15], [Enemies.wogol, 5]], 5)
		.addWave([[Enemies.chort, 8], [Enemies.wogol, 8]], 5)
		.waitForEnemiesCleared()
		.addGroup(Enemies.demonBig, Enemies.chort, 12, 100)
		.waitForEnemiesCleared()
		.stop()


}
export default ENENMYENCOUNTERS