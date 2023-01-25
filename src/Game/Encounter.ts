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

class Encounter {
	waves: (() => Generator)[] = []
	enemies: string[] = []
	boundary: { x?: number, y?: number } = { x: undefined, y: undefined }
	index = 0
	constructor() {
		ECS.eventBus.subscribe(ECSEVENTS.DELETEENTITY, (entity: Entity) => {
			if (this.enemies.includes(entity.id)) {
				this.enemies.splice(this.enemies.indexOf(entity.id), 1)
			}
		})
	}
	setBoundary(x: number, y: number) {
		this.boundary = { x: x / 2, y: y / 2 }
		return this
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
		console.log('ok')
		const self = this
		for (let i = 0; i < nb; i++) {
			const angle = Math.random() * Math.PI * 2

			const distanceX = Math.cos(angle) * (camera.right + camera.position.x) * ((Math.random() * 1.2) + 1)
			const distanceY = Math.sin(angle) * (camera.top + camera.position.y) * ((Math.random() * 1.2) + 1)
			const x = this.boundary.x ? Math.max(-this.boundary.x, Math.min(this.boundary.x, distanceX)) : distanceX
			const y = this.boundary.y ? Math.max(-this.boundary.y, Math.min(this.boundary.y, distanceY)) : distanceY
			ParticleEntity(x, y, assets.magic['smoke']).then(() => {
				this.enemies.push(EnemyEntity(self.getType(enemyType), { x, y }).id)
			})
			yield* waitFor(Math.random() * 10)

		}
	}
	waitForEnemiesCleared() {
		const self = this
		this.waves.push(function* () {
			while (self.enemies.length) {
				yield* waitFor(1)
			}
			return
		})
		return this
	}
	stop() {
		this.waves.push(function* () {
			yield
			Engine.setState(State.map)

		})
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