import { ECS, Entity } from "../Globals/ECS";
import { ECSEVENTS, UIEVENTS } from "../Constants/Events";
import StatsComponent, { STATS } from "../Components/StatsComponent";

import ColorShader from "../Shaders/ColorShader";
import Coroutine from "../Globals/Coroutine";
import DIFFICULTY from "../Constants/DIfficulty";
import EnemyEntity from "../Entities/EnemyEntity";
import { EnemyType } from "../Constants/Enemies";
import FlockingComponent from "../Components/FlockingComponent";
import HealthComponent from "../Components/HealthComponent";
import LevelComponent from "../Components/LevelComponent";
import OutlineShader from "../Shaders/OutlineShader";
import ParticleEntity from "../Entities/ParticleEntitty";
import PortalEntity from "../Entities/PortalEntity";
import SpriteComponent from "../Components/SpriteComponent";
import State from "../Globals/State";
import assets from "../Globals/Assets";
import { camera } from "../Globals/Initialize";
import waitFor from "../Utils/WaitFor";

class Encounter {
	waves: (() => Generator)[] = []
	enemies: Set<Entity> = new Set()
	difficulty = {
		[DIFFICULTY.EASY]: 120,
		[DIFFICULTY.NORMAL]: 90,
		[DIFFICULTY.HARD]: 60,
	}[State.difficulty ?? DIFFICULTY.EASY]
	boundary: { x?: number, y?: number } = { x: undefined, y: undefined }
	stats = new StatsComponent().set(STATS.MAX_HEALTH, 0.1).set(STATS.DAMAGE, 0.1)
	level = new LevelComponent()
	started = false
	subscriber: () => void
	levelSubscriber: () => void
	addEnemySuscriber: () => void
	coroutine?: Coroutine
	constructor() {
		this.subscriber = ECS.eventBus.subscribe(ECSEVENTS.DELETE_ENTITY, (entity: Entity) => {
			if (this.enemies.has(entity)) {
				this.enemies.delete(entity)
			}
		})
		this.addEnemySuscriber = ECS.eventBus.subscribe(ECSEVENTS.ADD_TO_ENCOUNTER, entity => {
			this.enemies.add(entity)
		})
		this.levelSubscriber = ECS.eventBus.subscribe(ECSEVENTS.TIMER, () => {
			const initialLevel = this.level.level
			this.level.level = Math.floor(State.timer / this.difficulty)
			if (this.level.level !== initialLevel) {
				ECS.eventBus.publish(UIEVENTS.ENEMY_LEVEL, this.level.level)
			}
		})


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
	async spawnEnemy(enemyType: EnemyType, x: number, y: number) {
		return ParticleEntity({ x, y }, assets.effects.smoke, { scale: 0.5 }).then(() => {
			const enemy = EnemyEntity(enemyType, this.stats)({ x, y })
			this.enemies.add(enemy)
			return enemy
		})
	}
	addGroup(mainEnemy: EnemyType, guard: EnemyType, nbOfGuards: number = 8, distance: number) {
		const self = this
		this.waves.push(function* () {
			const group = FlockingComponent.getGroup()
			const guards: Set<Entity> = new Set()
			const { x, y } = self.getDistance(distance)

			self.spawnEnemy(mainEnemy, x, y).then(main => {
				main.addComponent(new FlockingComponent(group, false))
				const mainHealth = main.removeComponent(HealthComponent)
				const mainSprite = main.getComponent(SpriteComponent)
				mainSprite.addShader(new OutlineShader([1, 1, 0, 1]))
				let coroutine: Coroutine
				const invicibilitySub = ECS.eventBus.subscribe(ECSEVENTS.DELETE_ENTITY, (entity) => {


					if (guards.has(entity)) {
						guards.delete(entity)
						if (guards.size === 0) {
							invicibilitySub()
							coroutine.stop()
							main.addComponent(mainHealth)
							mainSprite.removeShader(OutlineShader)
							mainSprite.removeShader(ColorShader)
						}
					}
				})

			})

			yield* waitFor(Math.random() * 10)
			for (let i = 0; i < nbOfGuards; i++) {
				const angle = Math.PI * 2 * i / nbOfGuards
				const guardX = x + Math.cos(angle) * distance
				const guardY = y + Math.sin(angle) * distance
				self.spawnEnemy(guard, guardX, guardY).then(guardEntity => {
					guardEntity.getComponent(SpriteComponent).addShader(new OutlineShader([1, 1, 0, 1]))
					guardEntity.addComponent(new FlockingComponent(group, false))
					guards.add(guardEntity)
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
			while (self.enemies.size > 0) {
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
			self.subscriber()
			self.levelSubscriber()
			self.addEnemySuscriber()
			yield* waitFor(60)
			const portal = PortalEntity()
			ECS.eventBus.publish(ECSEVENTS.ADD_TO_BACKGROUND, portal)

		})
		return this
	}
	pause() {
		if (!this.coroutine) return
		this.coroutine.pause()
	}
	resume() {
		if (!this.coroutine) return
		this.coroutine.resume()
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