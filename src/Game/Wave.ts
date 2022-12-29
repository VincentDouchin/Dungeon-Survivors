import EnemyEntity from "../Entities/EnemyEntity";
import Coroutines from "../Globals/Coroutines";
const spawnEnemies = (enemyType: EnemyType, nb: number) => {

	for (let i = 0; i < nb; i++) {
		const distance = Math.random() * 200 + 100
		const angle = Math.random() * Math.PI * 2
		const x = Math.cos(angle) * distance
		const y = Math.sin(angle) * distance
		EnemyEntity(enemyType, { x, y })

	}
}
const runWave = function* ([enemyType, enemies, nb]: WaveDefinition) {



	let counter = 0
	let timer = 0

	while (counter < nb) {

		if (timer === 0) {
			spawnEnemies(enemyType, enemies)
			counter++
		}
		timer = (timer + 1) % 300
		yield

	}
	yield
}
const startWave = (...waves: WaveDefinition[]) => {
	Coroutines.add(function* () {
		for (let wave of waves) {
			yield* runWave(wave)
		}


	})
}

export default startWave