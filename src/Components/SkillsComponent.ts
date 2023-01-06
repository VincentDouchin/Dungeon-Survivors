import ECSEVENTS from "../Constants/ECSEvents";
import { Component, ECS } from "../Globals/ECS";

class SkillsComponent extends Component {
	angVel = 0
	damage = 0
	critDamage = 0.5
	critChance = 0.05
	crit = false
	constructor() {
		super()
		ECS.eventBus.subscribe(ECSEVENTS.SKILL, (skill: Skill) => {
			skill.modifier(this)
		})
	}
	calculateDamage(damageAmount: number) {
		this.crit = this.critChance < Math.random()
		let damage = damageAmount + this.damage

		if (this.crit) {
			damage *= (1 + this.critDamage)
		}
		return damage
	}
}
SkillsComponent.register()
export default SkillsComponent