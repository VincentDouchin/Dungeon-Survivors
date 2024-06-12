import { ECSEVENTS, UIEVENTS } from '../Constants/Events'
import StatsComponent from '../Components/StatsComponent'
import { STATS } from '../Constants/Stats'
import ColorShader from '../Shaders/ColorShader'
import Coroutine from '../Globals/Coroutine'
import DIFFICULTY from '../Constants/DIfficulty'
import { ECS, Entity } from '../Globals/ECS'
import EnemyEntity from '../Entities/EnemyEntity'
import type { EnemyType } from '../Constants/Enemies'

import HealthComponent from '../Components/HealthComponent'
import LevelComponent from '../Components/LevelComponent'
import OutlineShader from '../Shaders/OutlineShader'
import ParticleEntity from '../Entities/ParticleEntitty'
import PortalEntity from '../Entities/PortalEntity'
import SpriteComponent from '../Components/SpriteComponent'
import State from '../Globals/State'
import assets from '../Globals/Assets'
import { camera } from '../Globals/Initialize'
import waitFor from '../Utils/WaitFor'
import type WeightedList from '../Utils/WeightedList'

class Encounter {
	waves: (() => Generator)[] = []
	enemies = new Entity('encounter')
	statDifficulty = {
		[DIFFICULTY.EASY]: 0.04,
		[DIFFICULTY.NORMAL]: 0.05,
		[DIFFICULTY.HARD]: 0.06,
	}[State.difficulty ?? DIFFICULTY.EASY]

	amountDifficulty = {
		[DIFFICULTY.EASY]: 1,
		[DIFFICULTY.NORMAL]: 1.2,
		[DIFFICULTY.HARD]: 1.5,
	}[State.difficulty ?? DIFFICULTY.EASY]

	boundary: { x?: number; y?: number } = { x: undefined, y: undefined }
	stats = new StatsComponent().set(STATS.MAX_HEALTH, this.statDifficulty).set(STATS.DAMAGE, this.statDifficulty)
	level = new LevelComponent()
	started = false
	levelSubscriber: () => void
	addEnemySuscriber: () => void
	coroutine?: Coroutine
	constructor() {
		this.addEnemySuscriber = ECS.eventBus.subscribe(ECSEVENTS.ADD_TO_ENCOUNTER, (entity) => {
			this.enemies.addChildren(entity)
		})
		this.levelSubscriber = ECS.eventBus.subscribe(ECSEVENTS.TIMER, (time) => {
			const initialLevel = this.level.level
			this.level.level = Math.floor(time / 60)
			if (this.level.level !== initialLevel) {
				ECS.eventBus.publish(UIEVENTS.ENEMY_LEVEL, this.level.level)
			}
		})
	}

	setBoundary(x: number, y: number) {
		this.boundary = { x: x / 2, y: y / 2 }
		return this
	}

	addWave(enemies: WeightedList<EnemyType>, enemyAmount: number, berserk: number, waves = 1, delay = 600) {
		const self = this
		this.waves.push(function* () {
			for (let i = 0; i < waves; i++) {
				yield * self.spawnEnemies(enemies, enemyAmount * self.amountDifficulty, berserk)
				yield * waitFor(delay)
			}
		})
		return this
	}

	getDistance() {
		const angle = Math.random() * Math.PI * 2
		// const x = Math.cos(angle) * 200 + camera.position.x
		// const y = Math.sin(angle) * 200 + camera.position.y
		const distanceX = Math.cos(angle) * (camera.right + camera.position.x) * ((Math.random() * 1.2) + 1)
		const distanceY = Math.sin(angle) * (camera.top + camera.position.y) * ((Math.random() * 1.2) + 1)
		const x = this.boundary.x ? Math.max(-this.boundary.x, Math.min(this.boundary.x, distanceX)) : distanceX
		const y = this.boundary.y ? Math.max(-this.boundary.y, Math.min(this.boundary.y, distanceY)) : distanceY
		return { x, y }
	}

	addEnemy(type: EnemyType) {
		const self = this
		this.waves.push(function*() {
			yield
			const { x, y } = self.getDistance()
			self.spawnEnemy(type, x, y)
		})
		return this
	}

	* spawnEnemies(enemies: WeightedList<EnemyType>, enemyAmount: number, berserk: number) {
		for (let i = 0; i < enemyAmount; i++) {
			const { x, y } = this.getDistance()
			const enemy = enemies.pick()
			const isBerserk = Math.random() < berserk
			this.spawnEnemy({ ...enemy, berserk: isBerserk }, x, y)
			yield * waitFor(Math.random() * 20)
		}
	}

	async spawnEnemy(enemyType: EnemyType, x: number, y: number) {
		return ParticleEntity({ x, y }, assets.effects.smoke, { scale: 0.5 }).then(() => {
			const enemy = EnemyEntity(enemyType, this.stats, this.level)({ x, y })
			this.enemies.addChildren(enemy)
			return enemy
		})
	}

	addGroup(mainEnemy: EnemyType, guard: EnemyType, nbOfGuards = 8, distance: number) {
		const self = this
		this.waves.push(function* () {
			const guards: Set<Entity> = new Set()
			const { x, y } = self.getDistance()

			self.spawnEnemy(mainEnemy, x, y).then((main) => {
				const mainHealth = main.removeComponent(HealthComponent)
				const mainSprite = main.getComponent(SpriteComponent)
				mainSprite.addShader(new OutlineShader([1, 1, 0, 1]))
				const invicibilitySub = ECS.eventBus.subscribe(ECSEVENTS.DELETE_ENTITY, (entity) => {
					if (guards.has(entity)) {
						guards.delete(entity)

						if (guards.size === 0) {
							invicibilitySub()
							main.addComponent(mainHealth)
							mainSprite.removeShader(OutlineShader)
							mainSprite.removeShader(ColorShader)
						}
					}
				})
			})

			yield * waitFor(Math.random() * 10)
			for (let i = 0; i < nbOfGuards; i++) {
				const angle = Math.PI * 2 * i / nbOfGuards
				const guardX = x + Math.cos(angle) * distance
				const guardY = y + Math.sin(angle) * distance
				self.spawnEnemy(guard, guardX, guardY).then((guardEntity) => {
					guardEntity.getComponent(SpriteComponent).addShader(new OutlineShader([1, 1, 0, 1]))
					guards.add(guardEntity)
				})
				yield * waitFor(Math.random() * 10 + 20)
			}
		})
		return this
	}

	waitForEnemiesCleared() {
		const self = this
		this.waves.push(function* () {
			yield
			while (self.enemies.children.size > 0) {
				yield
			}
		})
		return this
	}

	stop() {
		const self = this
		this.started = false
		this.waves.push(function* () {
			yield
			self.levelSubscriber()
			self.addEnemySuscriber()
			self.enemies.destroy()
			yield * waitFor(60)
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
			for (const wave of self.waves) {
				yield * wave()
			}
		})
		return this
	}
}
export default Encounter
