import type { Entity } from '../Globals/ECS'
import { Component } from '../Globals/ECS'
import type { SOUND } from '../Constants/Sounds'
import { Stat } from '../Game/Stat'
import { STATS } from './StatsComponent'

class DamageComponent extends Component {
	amount: Stat
	target: number[]
	destroyOnHit: number
	knockback: Stat
	crit = false
	sound?: SOUND
	critChance = new Stat(0.05, STATS.CRIT_CHANCE)
	critDamage = new Stat(1.5, STATS.CRIT_DAMAGE)
	onHit?: (entity: Entity) => void
	constructor(amount: number, target: number[], destroyOnHit = -1, knockback = 0, sound?: SOUND, onHit?: (entity: Entity) => void) {
		super()
		this.onHit = onHit
		this.sound = sound
		this.amount = new Stat(amount, STATS.DAMAGE)
		this.knockback = new Stat(knockback, STATS.KNOCKBACK)
		this.target = target
		this.destroyOnHit = destroyOnHit
	}

	calculateDamage(defense: number) {
		if (this.amount.value < 0) return this.amount.value
		this.crit = this.critChance.value > Math.random()
		let damage = (this.amount.value) * (1 / defense)

		if (this.crit) {
			damage *= (this.critDamage.value)
		}
		return damage
	}
}
DamageComponent.register()
export default DamageComponent
