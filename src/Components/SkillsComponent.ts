import { Component, ECS } from "../Globals/ECS";
import ECSEVENTS, { SKILL } from "../Constants/ECSEvents";

class StatsComponent extends Component {
	angVel = 0
	damage = 1
	critDamage = 0.5
	critChance = 0.05
	crit = false
	knockback = 1
	xp = 1
	defense = 1
	constructor() {
		super()
		ECS.eventBus.subscribe<SKILL>(ECSEVENTS.SKILL, (skill: Skill) => {
			skill.modifier(this)
		})
	}
	calculateDamage(damageAmount: number, defense: number = 1) {
		this.crit = this.critChance > Math.random()
		let damage = (damageAmount * this.damage) * (1 / defense)

		if (this.crit) {
			damage *= (1 + this.critDamage)
		}
		return damage
	}
}
StatsComponent.register()
export default StatsComponent