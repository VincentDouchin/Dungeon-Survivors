import { Component, ECS } from "../Globals/ECS";

import ECSEVENTS from "../Constants/ECSEvents";

class SkillsComponent extends Component {
	angVel = 0
	damage = 1
	critDamage = 0.5
	critChance = 0.05
	crit = false
	knockback = 1
	xp = 1
	constructor() {
		super()
		ECS.eventBus.subscribe(ECSEVENTS.SKILL, (skill: Skill) => {
			skill.modifier(this)
		})
	}
	calculateDamage(damageAmount: number) {
		this.crit = this.critChance > Math.random()
		let damage = damageAmount * this.damage

		if (this.crit) {
			damage *= (1 + this.critDamage)
		}
		return damage
	}
}
SkillsComponent.register()
export default SkillsComponent