import Coroutines, { Coroutine } from "../Globals/Coroutine";
import { ECS, Entity } from "../Globals/ECS";
import ECSEVENTS, { ADD_TO_ENCOUNTER, DELETE_ENTITY, ENENMY_LEVEL_UP } from "../Constants/ECSEvents";

import EnemyEntity from "../Entities/EnemyEntity";
import { EnemyType } from "../Constants/Enemies";
import Engine from "../Globals/Engine";
import { EventCallBack } from "../Utils/EventBus";
import FlockingComponent from "../Components/FlockingComponent";
import { GameStates } from "../Constants/GameStates";
import ParticleEntity from "../Entities/ParticleEntitty";
import State from "../Globals/State";
import StatsComponent from "../Components/StatsComponent";
import assets from "../Globals/Assets";
import { camera } from "../Globals/Initialize";
import waitFor from "../Utils/WaitFor";

class Encounter {
	waves: (() => Generator)[] = []
	enemies: string[] = []
	boundary: { x?: number, y?: number } = { x: undefined, y: undefined }
	stats: StatsComponent
	started = false
	subscriber: EventCallBack<Entity>
	levelSubscriber: EventCallBack<number>
	addEnemySuscriber: EventCallBack<Entity>
	coroutine?: Coroutine
	constructor() {
		this.subscriber = ECS.eventBus.subscribe<DELETE_ENTITY>(ECSEVENTS.DELETE_ENTITY, (entity: Entity) => {
			if (this.enemies.includes(entity.id)) {
				this.enemies.splice(this.enemies.indexOf(entity.id), 1)
			}
		})
		this.levelSubscriber = ECS.eventBus.subscribe<ENENMY_LEVEL_UP>(ECSEVENTS.ENENMY_LEVEL_UP, (level) => {
			this.stats.updateStats(level)
		})
		this.addEnemySuscriber = ECS.eventBus.subscribe<ADD_TO_ENCOUNTER>(ECSEVENTS.ADD_TO_ENCOUNTER, entity => {
			this.enemies.push(entity.id)
		})
		this.stats = new StatsComponent(State.timer % 120)

	}
	setBoundary(x: number, y: number) {
		this.boundary = { x: x / 2, y: y / 2 }
		return this
	}
	addWave(enemies: Array<[EnemyType, number]>, waves: number = 1, delay: number = 600) {
		const self = this
		this.waves.push(function* () {
			for (let i = 0; i < waves; i++) {
				yield* self.spawnEnemies(enemies)
				yield* waitFor(delay)
			}
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
		return ParticleEntity(x, y, assets.effects.Smoke, { scale: 0.5 }).then(() => {
			const enemy = EnemyEntity(enemyType, this.stats)({ x, y })
			this.enemies.push(enemy.id)
			return enemy
		})
	}
	addGroup(mainEnemy: EnemyType, guard: EnemyType, nbOfGuards: number = 8, distance: number) {
		const self = this
		this.waves.push(function* () {
			const group = FlockingComponent.getGroup()
			const { x, y } = self.getDistance(distance)
			self.spawnEnemy(mainEnemy, x, y).then(main => {
				main.addComponent(new FlockingComponent(group, false))
			})
			yield* waitFor(Math.random() * 10)
			for (let i = 0; i < nbOfGuards; i++) {
				const angle = Math.PI * 2 * i / nbOfGuards
				const guardX = x + Math.cos(angle) * distance
				const guardY = y + Math.sin(angle) * distance
				self.spawnEnemy(guard, guardX, guardY).then(guard => {
					guard.addComponent(new FlockingComponent(group, false))
				})
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
		this.started = false
		this.waves.push(function* () {
			yield
			ECS.eventBus.unsubscribe<DELETE_ENTITY>(ECSEVENTS.DELETE_ENTITY, self.subscriber)
			ECS.eventBus.unsubscribe<ENENMY_LEVEL_UP>(ECSEVENTS.ENENMY_LEVEL_UP, self.levelSubscriber)
			ECS.eventBus.unsubscribe<ADD_TO_ENCOUNTER>(ECSEVENTS.ADD_TO_ENCOUNTER, self.addEnemySuscriber)
			Engine.setState(GameStates.map)

		})
		return this
	}
	pause() {
		if (!this.coroutine) return
		this.coroutine.state = 'stopped'
	}
	resume() {
		if (!this.coroutine) return
		this.coroutine.state = 'running'
	}
	start() {
		this.started = true
		const self = this
		this.coroutine = new Coroutine(function* () {
			for (let wave of self.waves) {
				yield* wave()
			}
		})
		return this
	}
}
export default Encounter