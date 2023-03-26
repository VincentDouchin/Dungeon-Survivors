import { Component, ECS } from '../Globals/ECS'

import type { SOUND } from '../Constants/Sounds'
import { Stat } from '../Game/Stat'
import { STATS } from './StatsComponent'
import SpriteComponent from './SpriteComponent'

class HealthComponent extends Component {
	health: number
	maxHealth: Stat
	type: number
	healthBarId: string | null = null
	canTakeDamage = true
	show: boolean
	defense = new Stat(1, STATS.DEFENSE)
	sound?: SOUND
	lastMaxHealth: number
	constructor(health: number, type: number, show = true, sound?: SOUND) {
		super()

		this.maxHealth = new Stat(health, STATS.MAX_HEALTH)
		this.lastMaxHealth = this.maxHealth.value
		this.health = this.maxHealth.value
		this.type = type
		this.show = show
		this.sound = sound
	}

	updateHealth(amount: number) {
		this.health = Math.max(0, Math.min(this.health + amount, this.maxHealth.value))

		if (this.healthBarId) {
			const healthSprite = ECS.getEntityById(this.healthBarId).getComponent(SpriteComponent)
			healthSprite.uniforms.percent = this.health / this.maxHealth.value
			healthSprite.render()
		}
	}
}
HealthComponent.register()
export default HealthComponent
