import { Clock } from "three";
import AIControllerComponent from "../Components/AIControllerComponent";
import PositionComponent from "../Components/PositionComponent";
import EnemyEntity from "../Entities/EnemyEntity";
import Coroutines from "../Globals/Coroutines";
import { Entity } from "../Globals/ECS";
const spawnEnemies = (player: Entity, enemyType: EnemyType, nb: number) => {
	for (let i = 0; i < nb; i++) {
		const distance = Math.random() * 200 + 100
		const angle = Math.random() * Math.PI * 2
		const x = Math.cos(angle) * distance
		const y = Math.sin(angle) * distance
		const enemy = EnemyEntity(enemyType)
		enemy.addComponent(new PositionComponent(x, y))
		enemy.addComponent(new AIControllerComponent(player))
	}
}
const runWave = (player: Entity) => function* ([enemyType, duration, enemies]: WaveDefinition) {

	const clock = new Clock()

	let timer = 0
	spawnEnemies(player, enemyType, enemies)
	while (timer < duration) {
		timer = clock.getElapsedTime()
		yield

	}
	yield
}
const startWave = (player: Entity) => (...waves: WaveDefinition[]) => {
	Coroutines.add(function* () {
		for (let wave of waves) {
			yield* runWave(player)(wave)
		}


	})
}

export default startWave