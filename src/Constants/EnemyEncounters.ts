import Encounter from "../Game/Encounter"
import Enemies from "./Enemies"

export type enemyWaveName = 'ORCS' | 'ANIMALS' | 'PRIESTS' | 'ELVES' | 'DEMONS'



const ENENMYENCOUNTERS: Partial<Record<enemyWaveName, Encounter>> = {
	ORCS: new Encounter()
		.addWave(Enemies.goblin, 20, 10)
		.addWave(Enemies.orc, 15, 5)
		.addWave(Enemies.orcShaman, 10, 4)
		.addWave(Enemies.orcMasked, 10, 3)
		.addWave(Enemies.zombieBig, 1, 1)
		.waitForEnemiesCleared()
		.stop()
	,
	ANIMALS: new Encounter()
		.addWave([[Enemies.bunny, 9], [Enemies.mushroomMedium, 1]], 20, 10)
		.addWave(Enemies.direwolf, 15, 5)
		.addWave([Enemies.centaurFemale, Enemies.centaurMale], 10, 4)
		.addWave(Enemies.bear, 10, 3)
		.waitForEnemiesCleared()
		.stop()
}
export default ENENMYENCOUNTERS