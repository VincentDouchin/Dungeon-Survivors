import Coroutines from "../Globals/Coroutines"
import Encounter from "../Game/Encounter"
import Enemies from "./Enemies"

export type enemyWaveName = 'ORCS' | 'ANIMALS' | 'PRIESTS' | 'ELVES' | 'DEMONS'



const ENEMYWAVE: Partial<Record<enemyWaveName, () => void>> = {
	ORCS: () => {
		const encounter = new Encounter()
		Coroutines.add(function* () {
			yield* encounter.wave(Enemies.goblin, 20, 10)
			yield* encounter.wave(Enemies.orc, 15, 5)
			yield* encounter.wave(Enemies.orcShaman, 10, 4)
			yield* encounter.wave(Enemies.orcMasked, 10, 3)
			yield* encounter.wave(Enemies.zombieBig, 1, 1)
			yield* encounter.waitForEnemiesCleared()
			yield encounter.stop()
		})
	},
	ANIMALS: () => {
		const encounter = new Encounter()
		Coroutines.add(function* () {
			yield* encounter.wave(Enemies.gnoll, 20, 10)
			yield* encounter.wave(Enemies.gnoll, 15, 5)
			yield* encounter.wave(Enemies.gnoll, 10, 4)
			yield* encounter.wave(Enemies.gnoll, 10, 3)
			yield* encounter.wave(Enemies.gnoll, 1, 1)
			yield* encounter.waitForEnemiesCleared()
			yield encounter.stop()
		})
	}
}
export default ENEMYWAVE