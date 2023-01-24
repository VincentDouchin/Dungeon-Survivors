import { ECS, Entity } from "../Globals/ECS";
import { assets, camera } from "../Globals/Initialize";

import ECSEVENTS from "../Constants/ECSEvents";
import EnemyEntity from "../Entities/EnemyEntity";
import Engine from "../Globals/Engine";
import ParticleEntity from "../Entities/ParticleEntitty";
import { State } from "../Constants/GameStates";

class Encounter {
	enemies: string[] = []
	constructor() {
		ECS.eventBus.subscribe(ECSEVENTS.DELETEENTITY, (entity: Entity) => {
			if (this.enemies.includes(entity.id)) {
				this.enemies.splice(this.enemies.indexOf(entity.id), 1)
			}
		})
	}
	spawnEnemies(enemyType: EnemyType, nb: number) {

		for (let i = 0; i < nb; i++) {
			const angle = Math.random() * Math.PI * 2
			const x = (Math.cos(angle) * camera.right + camera.position.x) * ((Math.random() * 1.2) + 1)
			const y = Math.sin(angle) * camera.top + camera.position.y * ((Math.random() * 1.2) + 1)
			ParticleEntity(x, y, assets.magic['smoke']).then(() => {
				this.enemies.push(EnemyEntity(enemyType, { x, y }).id)

			})

		}
	}
	* wave(enemyType: EnemyType, enemiesNb: number, waves: number, delay?: number) {

		let counter = 0
		let timer = 0

		while (counter < waves) {
			if (timer === 0) {
				this.spawnEnemies(enemyType, enemiesNb)
				counter++
			}
			timer = (timer + 1) % (delay ?? 600)
			yield

		}
		yield

	}
	* waitForEnemiesCleared() {
		while (this.enemies.length) {
			yield
		}
		return
	}
	stop() {
		Engine.setState(State.map)
	}


}

export default Encounter