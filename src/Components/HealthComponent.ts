import { Component } from '../Globals/ECS'
import type { SOUND } from '../Constants/Sounds'
import { Stat } from '../Game/Stat'
import { STATS } from '../Constants/Stats'

class HealthComponent extends Component {
	health: number
	maxHealth: Stat
	type: number
	canTakeDamage = true
	show: boolean
	defense = new Stat(1, STATS.DEFENSE)
	regen = new Stat(0, STATS.REGEN)
	regenTimer = 0
	regenTime = 60
	sound?: SOUND
	lastMaxHealth: number
	healingGroup?: string
	constructor(health: number, type: number, show = true, sound?: SOUND) {
		super()

		this.maxHealth = new Stat(health, STATS.MAX_HEALTH)
		this.lastMaxHealth = this.maxHealth.value
		this.health = this.maxHealth.value
		this.type = type
		this.show = show
		this.sound = sound
	}

	setHealingGroup(group: string) {
		this.healingGroup = group
		return this
	}

	updateHealth(amount: number) {
		this.health = Math.max(0, Math.min(this.health + amount, this.maxHealth.value))
	}
}
HealthComponent.register()
export default HealthComponent
