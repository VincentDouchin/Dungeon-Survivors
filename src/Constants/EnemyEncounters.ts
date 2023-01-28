import Encounter from "../Game/Encounter"
import Enemies from "./Enemies"

export type enemyWaveName = 'ORCS' | 'ANIMALS' | 'PRIESTS' | 'ELVES' | 'DEMONS' | 'VILLAGERS'



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
		.stop()


}
export default ENENMYENCOUNTERS