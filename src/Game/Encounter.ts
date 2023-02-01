import { ECS, Entity } from "../Globals/ECS";
import ECSEVENTS, { DELETE_ENTITY } from "../Constants/ECSEvents";
import { assets, camera } from "../Globals/Initialize";

import Coroutines from "../Globals/Coroutines";
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
		ECS.eventBus.subscribe<DELETE_ENTITY>(ECSEVENTS.DELETE_ENTITY, (entity: Entity) => {
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
	getDistance(offset: number = 0) {
		const angle = Math.random() * Math.PI * 2

		const distanceX = Math.cos(angle) * (camera.right + camera.position.x) * ((Math.random() * 1.2) + 1)
		const distanceY = Math.sin(angle) * (camera.top + camera.position.y) * ((Math.random() * 1.2) + 1)
		const x = this.boundary.x ? Math.max(-this.boundary.x + offset, Math.min(this.boundary.x - offset, distanceX)) : distanceX
		const y = this.boundary.y ? Math.max(-this.boundary.y + offset, Math.min(this.boundary.y - offset, distanceY)) : distanceY
		return { x, y }
	}
	* spawnEnemies(enemyType: EnemyType | EnemyType[] | [EnemyType, number][], nb: number) {
		for (let i = 0; i < nb; i++) {
			const { x, y } = this.getDistance()
			this.spawnEnemy(this.getType(enemyType), x, y)
			yield* waitFor(Math.random() * 10)

		}
	}
	spawnEnemy(enemyType: EnemyType, x: number, y: number) {
		ParticleEntity(x, y, assets.effects.Smoke, { scale: 0.5 }).then(() => {
			this.enemies.push(EnemyEntity(this.getType(enemyType), { x, y }).id)
		})
	}
	addGroup(mainEnemy: EnemyType, guard: EnemyType, nbOfGuards: number = 8, distance: number) {
		const self = this
		this.waves.push(function* () {
			const { x, y } = self.getDistance(distance)
			self.spawnEnemy(mainEnemy, x, y)
			yield* waitFor(Math.random() * 10)
			for (let i = 0; i < nbOfGuards; i++) {
				const angle = Math.PI * 2 * i / nbOfGuards
				const guardX = x + Math.cos(angle) * distance
				const guardY = y + Math.sin(angle) * distance
				self.spawnEnemy(guard, guardX, guardY)
				yield* waitFor(Math.random() * 10)
			}
		})
		return this
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