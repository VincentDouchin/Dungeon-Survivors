import Encounter from "../Game/Encounter"
import Enemies from "./Enemies"

export type enemyWaveName = 'ORCS' | 'ANIMALS' | 'PRIESTS' | 'ELVES' | 'DEMONS' | 'VILLAGERS' | 'UNDEAD' | 'KINGSGUARD'



const ENENMYENCOUNTERS: Partial<Record<enemyWaveName, Encounter>> = {
	ORCS: new Encounter()
		.setBoundary(864, 864)
		.addWave(Enemies.goblin, 20, 5)
		.addWave([[Enemies.orc, 2], [Enemies.goblin, 8]], 20, 5)
		.addWave([[Enemies.orc, 8], [Enemies.goblin, 2]], 15, 5)
		.addWave([[Enemies.orcShaman, 3], [Enemies.orc, 5]], 10, 4)
		.addWave(Enemies.orcMasked, 10, 3)
		.addWave(Enemies.orcBig, 1, 1)
		.waitForEnemiesCleared()
		.stop()
	,
	ANIMALS: new Encounter()
		.addWave([[Enemies.bunny, 5], [Enemies.mushroomSmall, 5], [Enemies.mushroomMedium, 1]], 20, 10)
		.addWave(Enemies.direwolf, 10, 2)
		.addWave([Enemies.centaurFemale, Enemies.centaurMale], 10, 4)
		.addWave([[Enemies.bear, 1], [Enemies.direwolf, 5]], 10, 3)
		.addWave(Enemies.mushroomBig, 1, 1)
		.waitForEnemiesCleared()
		.stop()
	,
	ELVES: new Encounter()
		.addWave(Enemies.leprechaun, 20, 5)
		.addWave([[Enemies.leprechaun, 8], [Enemies.woodElfMale, 1], [Enemies.woodElfFemale, 1]], 15, 5)
		.addWave([[Enemies.leprechaun, 2], [Enemies.woodElfMale, 4], [Enemies.woodElfFemale, 4]], 10, 5)
		.addWave([[Enemies.elfKnight, 1], [Enemies.elfRanger, 1]], 10, 5)
		.addGroup(Enemies.elfKing, Enemies.elfKnight, 8, 50)
		.addGroup(Enemies.elfQueen, Enemies.elfKnight, 8, 50)
		.waitForEnemiesCleared()
		.stop(),
	VILLAGERS: new Encounter()
		.addWave([Enemies.villagerFemale, Enemies.villagerMale], 20, 5)
		.addWave([[Enemies.villagerFemale, 1], [Enemies.villagerMale, 1], [Enemies.herald, 2]], 20, 5)
		.addWave([[Enemies.shopKeeper, 1], [Enemies.mage, 1], [Enemies.villagerFemale, 1], [Enemies.villagerMale, 1]], 20, 5)
		.addWave([[Enemies.alchemist, 1], [Enemies.blacksmith, 1], [Enemies.butcher, 2]], 20, 5)
		.addWave(Enemies.executioner, 1, 1)
		.waitForEnemiesCleared()
		.stop(),
	PRIESTS: new Encounter()
		.addWave([[Enemies.angel, 5], [Enemies.clericFat, 1], [Enemies.clericNormal, 1], [Enemies.clericSkinny, 1]], 20, 5)
		.addWave([Enemies.clericFat, Enemies.clericNormal, Enemies.clericSkinny], 20, 5)
		.addWave([Enemies.nunFat, Enemies.nunNormal, Enemies.nunSkinny], 20, 5)
		.addGroup(Enemies.bishop, Enemies.angel, 8, 50)
		.waitForEnemiesCleared()
		.stop(),
	UNDEAD: new Encounter()
		.addWave(Enemies.zombieSmall, 20, 5)
		.addWave([[Enemies.muddy, 1], [Enemies.swampy, 1], [Enemies.zombieSmall, 5]], 20, 5)
		.addWave([[Enemies.muddy, 1], [Enemies.swampy, 1], [Enemies.zombie, 5]], 20, 5)
		.addWave([[Enemies.skeleton, 1], [Enemies.iceZombie, 1], [Enemies.zombie, 5]], 20, 5)
		.addWave([[Enemies.skeleton, 4], [Enemies.zombie, 5]], 20, 5)
		.addWave(Enemies.ogre, 1, 1)
		.waitForEnemiesCleared()
		.stop(),
	KINGSGUARD: new Encounter()
		.addWave(Enemies.knight, 10, 3)
		.addWave([[Enemies.knightFat, 1], [Enemies.knight, 3]], 12, 4)
		.addWave([Enemies.knight, Enemies.knightFat, Enemies.knightElite], 12, 4)
		.addWave(Enemies.knightEliteLarge, 2, 1, 0)
		.addWave(Enemies.knightElite, 10, 2)
		.addGroup(Enemies.king, Enemies.knightElite, 8, 50)
		.addGroup(Enemies.queen, Enemies.knightElite, 8, 50)
		.waitForEnemiesCleared()
		.stop(),
	DEMONS: new Encounter()
		.addWave(Enemies.imp, 20, 5)
		.addWave([[Enemies.imp, 4], [Enemies.wogol, 1]], 20, 5)
		.addWave([Enemies.chort, Enemies.wogol], 15, 5)
		.waitForEnemiesCleared()
		.addGroup(Enemies.demonBig, Enemies.chort, 12, 100)
		.waitForEnemiesCleared()
		.stop()


}
export default ENENMYENCOUNTERS