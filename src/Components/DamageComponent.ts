import { Component } from "../Globals/ECS";
import { SOUND } from "../Globals/Sounds";
import { STATS } from "./StatsComponent";
import { Stat } from "../Game/Stat";

class DamageComponent extends Component {
	amount: Stat
	target: number[]
	destroyOnHit: number
	knockback: Stat
	crit = false
	sound?: SOUND
	critChance = new Stat(0.05, STATS.CRIT_CHANCE)
	critDamage = new Stat(1.5, STATS.CRIT_DAMAGE)
	constructor(amount: number, target: number[], destroyOnHit = -1, knockback = 0, sound?: SOUND) {
		super()
		this.sound = sound
		this.amount = new Stat(amount, STATS.DAMAGE)
		this.knockback = new Stat(knockback, STATS.KNOCKBACK)
		this.target = target
		this.destroyOnHit = destroyOnHit
	}
	calculateDamage(defense: number) {
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