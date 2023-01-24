import { ECS, Entity } from "../Globals/ECS";
import { assets, camera } from "../Globals/Initialize";

import Coroutines from "../Globals/Coroutines";
import ECSEVENTS from "../Constants/ECSEvents";
import EnemyEntity from "../Entities/EnemyEntity";
import { EnemyType } from "../Constants/Enemies";
import Engine from "../Globals/Engine";
import ParticleEntity from "../Entities/ParticleEntitty";
import { State } from "../Constants/GameStates";
import waitFor from "../Utils/WaitFor";

// class Encounter {
// 	enemies: string[] = []
// 	constructor() {
// 		ECS.eventBus.subscribe(ECSEVENTS.DELETEENTITY, (entity: Entity) => {
// 			if (this.enemies.includes(entity.id)) {
// 				this.enemies.splice(this.enemies.indexOf(entity.id), 1)
// 			}
// 		})
// 	}
// 	spawnEnemies(enemyType: EnemyType, nb: number) {

// 		for (let i = 0; i < nb; i++) {
// 			const angle = Math.random() * Math.PI * 2
// 			const x = (Math.cos(angle) * camera.right + camera.position.x) * ((Math.random() * 1.2) + 1)
// 			const y = Math.sin(angle) * camera.top + camera.position.y * ((Math.random() * 1.2) + 1)
// 			ParticleEntity(x, y, assets.magic['smoke']).then(() => {
// 				this.enemies.push(EnemyEntity(enemyType, { x, y }).id)

// 			})

// 		}
// 	}
// 	* wave(enemyType: EnemyType, enemiesNb: number, waves: number, delay?: number) {

// 		let counter = 0
// 		let timer = 0

// 		while (counter < waves) {
// 			if (timer === 0) {
// 				this.spawnEnemies(enemyType, enemiesNb)
// 				counter++
// 			}
// 			timer = (timer + 1) % (delay ?? 600)
// 			yield

// 		}
// 		yield

// 	}
// 	* waitForEnemiesCleared() {
// 		while (this.enemies.length) {
// 			yield
// 		}
// 		return
// 	}
// 	stop() {
// 		Engine.setState(State.map)
// 	}


// }
class Encounter {
	waves: (() => Generator)[] = []
	enemies: string[] = []
	constructor() {
		ECS.eventBus.subscribe(ECSEVENTS.DELETEENTITY, (entity: Entity) => {
			if (this.enemies.includes(entity.id)) {
				this.enemies.splice(this.enemies.indexOf(entity.id), 1)
			}
		})
	}
	addWave(enemyType: EnemyType | EnemyType[] | [EnemyType, number][], enemiesNb: number, waves: number, delay?: number) {
		const self = this
		this.waves.push(function* () {
			let counter = 0
			let timer = 0

			while (counter < waves) {
				if (timer === 0) {
					yield* self.spawnEnemies(enemyType, enemiesNb)
					counter++
				}
				timer = (timer + 1) % (delay ?? 600)
				yield

			}
			yield
		})
		return this
	}
	getType(enemyType: EnemyType | EnemyType[] | [EnemyType, number][]) {
		const isWeightedArray = (arg: any) => (arg instanceof Array) && arg.every(type => (type instanceof Array))

		if (!Array.isArray(enemyType)) {
			return enemyType
		} else if (isWeightedArray(enemyType)) {
			const all = enemyType as [EnemyType, number][]
			const allEnenmies = all.flatMap(([enemy, weight]) => new Array(weight).fill(enemy))
			return allEnenmies[Math.floor(Math.random() * allEnenmies.length)]
		} else {
			return enemyType[Math.floor(Math.random() * enemyType.length)]
		}
	}
	* spawnEnemies(enemyType: EnemyType | EnemyType[] | [EnemyType, number][], nb: number) {
		const self = this
		for (let i = 0; i < nb; i++) {
			const angle = Math.random() * Math.PI * 2
			const x = (Math.cos(angle) * camera.right + camera.position.x) * ((Math.random() * 1.2) + 1)
			const y = Math.sin(angle) * camera.top + camera.position.y * ((Math.random() * 1.2) + 1)
			yield* waitFor(Math.random() * 10)
			yield ParticleEntity(x, y, assets.magic['smoke']).then(() => {
				this.enemies.push(EnemyEntity(self.getType(enemyType), { x, y }).id)
			})

		}
	}
	waitForEnemiesCleared() {
		const self = this
		this.waves.push(function* () {
			while (self.enemies.length) {
				yield
			}
			return
		})
		return this
	}
	stop() {
		Engine.setState(State.map)
		return this
	}
	start() {
		const self = this
		Coroutines.add(function* () {
			for (let wave of self.waves) {
				yield* wave()
			}
		})
	}
}
export default Encounter