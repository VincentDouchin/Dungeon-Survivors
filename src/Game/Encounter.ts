import { ECS, Entity } from "../Globals/ECS";
import ECSEVENTS, { DELETE_ENTITY } from "../Constants/ECSEvents";
import { assets, camera } from "../Globals/Initialize";

import Coroutines from "../Globals/Coroutines";
import EnemyEntity from "../Entities/EnemyEntity";
import { EnemyType } from "../Constants/Enemies";
import Engine from "../Globals/Engine";
import { EventCallBack } from "../Utils/EventBus";
import { GameStates } from "../Constants/GameStates";
import ParticleEntity from "../Entities/ParticleEntitty";
import waitFor from "../Utils/WaitFor";

class Encounter {
	waves: (() => Generator)[] = []
	enemies: string[] = []
	boundary: { x?: number, y?: number } = { x: undefined, y: undefined }
	index = 0
	subscriber: EventCallBack<Entity>
	constructor() {
		this.subscriber = ECS.eventBus.subscribe<DELETE_ENTITY>(ECSEVENTS.DELETE_ENTITY, (entity: Entity) => {
			if (this.enemies.includes(entity.id)) {
				this.enemies.splice(this.enemies.indexOf(entity.id), 1)
			}
		})
	}
	setBoundary(x: number, y: number) {
		this.boundary = { x: x / 2, y: y / 2 }
		return this
	}
	addWave(enemies: Array<[EnemyType, number]>, waves: number, delay?: number) {
		const self = this
		this.waves.push(function* () {
			let counter = 0
			let timer = 0

			while (counter < waves) {
				if (timer === 0) {
					yield* self.spawnEnemies(enemies)
					counter++
				}
				timer = (timer + 1) % (delay ?? 600)
				yield
			}
			yield
		})
		return this
	}
	getDistance(offset: number = 0) {
		const angle = Math.random() * Math.PI * 2

		const distanceX = Math.cos(angle) * (camera.right + camera.position.x) * ((Math.random() * 1.2) + 1)
		const distanceY = Math.sin(angle) * (camera.top + camera.position.y) * ((Math.random() * 1.2) + 1)
		const x = this.boundary.x ? Math.max(-this.boundary.x + offset, Math.min(this.boundary.x - offset, distanceX)) : distanceX
		const y = this.boundary.y ? Math.max(-this.boundary.y + offset, Math.min(this.boundary.y - offset, distanceY)) : distanceY
		return { x, y }
	}
	* spawnEnemies(enemyTypes: Array<[EnemyType, number]>) {
		const enemies: EnemyType[] = enemyTypes.map(([enemyType, nb]) => new Array(nb).fill(enemyType)).flat()
		const nbOfEnemies = enemies.length
		for (let i = 0; i < nbOfEnemies; i++) {
			const { x, y } = this.getDistance()
			const enemy = enemies.splice(Math.floor(Math.random() * enemies.length), 1)
			this.spawnEnemy(enemy[0], x, y)
			yield* waitFor(Math.random() * 10)

		}
	}
	spawnEnemy(enemyType: EnemyType, x: number, y: number) {
		ParticleEntity(x, y, assets.effects.Smoke, { scale: 0.5 }).then(() => {
			const enemy = EnemyEntity(enemyType, { x, y })
			// ECS.eventBus.publish<ADD_TO_BACKGROUND>(ECSEVENTS.ADD_TO_BACKGROUND, enemy)
			this.enemies.push(enemy.id)
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
			yield
			while (self.enemies.length > 0) {
				yield
			}
			return
		})
		return this
	}
	stop() {
		const self = this
		this.waves.push(function* () {

			yield
			yield
			ECS.eventBus.unsubscribe<DELETE_ENTITY>(ECSEVENTS.DELETE_ENTITY, self.subscriber)
			Engine.setState(GameStates.map)

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