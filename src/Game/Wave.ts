import EnemyEntity from "../Entities/EnemyEntity";
import ParticleEntity from "../Entities/ParticleEntitty";
import { camera } from "../Globals/Initialize";
const spawnEnemies = (enemyType: EnemyType, nb: number) => {

	for (let i = 0; i < nb; i++) {
		const angle = Math.random() * Math.PI * 2
		const x = (Math.cos(angle) * camera.right + camera.position.x) * ((Math.random() * 1.2) + 1)
		const y = Math.sin(angle) * camera.top + camera.position.y * ((Math.random() * 1.2) + 1)
		ParticleEntity(x, y).then(() => {
			EnemyEntity(enemyType, { x, y })
		})

	}
}
const wave = function* (enemyType: EnemyType, enemiesNb: number, waves: number, delay?: number) {



	let counter = 0
	let timer = 0

	while (counter < waves) {

		if (timer === 0) {
			spawnEnemies(enemyType, enemiesNb)
			counter++
		}
		timer = (timer + 1) % (delay ?? 300)
		yield

	}
	yield
}


export { wave }