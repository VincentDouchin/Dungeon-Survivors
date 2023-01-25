import Encounter from "../Game/Encounter"
import Enemies from "./Enemies"

export type enemyWaveName = 'ORCS' | 'ANIMALS' | 'PRIESTS' | 'ELVES' | 'DEMONS'



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
}
export default ENENMYENCOUNTERS