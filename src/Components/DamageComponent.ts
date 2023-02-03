import { Component } from "../Globals/ECS";
import { Stat } from "../Game/Stat";

class DamageComponent extends Component {
	amount: Stat
	target: number[]
	destroyOnHit: number
	knockback: Stat
	crit = false
	critChance = new Stat(0.05)
	critDamage = new Stat(1.5)
	constructor(amount: number, target: number[], destroyOnHit = -1, knockback = 0) {
		super()
		this.amount = new Stat(amount)
		this.knockback = new Stat(knockback)
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