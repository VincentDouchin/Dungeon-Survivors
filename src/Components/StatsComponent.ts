import { Component, ECS } from "../Globals/ECS";
import ECSEVENTS, { LEVEL_UP, SKILL, XP, XP_PERCENT } from "../Constants/ECSEvents";

import Engine from "../Globals/Engine";
import { GameStates } from "../Constants/GameStates";

class StatsComponent extends Component {
	angVel = 0
	damage = 1
	critDamage = 0.5
	critChance = 0.05
	crit = false
	knockback = 1
	xpModifier = 1
	defense = 1
	xp = 0
	level = 0
	nextLevel = 20
	constructor() {
		super()
		ECS.eventBus.subscribe<SKILL>(ECSEVENTS.SKILL, (skill: Skill) => {
			skill.modifier(this)
		})
		ECS.eventBus.subscribe<XP>(ECSEVENTS.XP, (amount: number) => this.updateXP(amount))
		ECS.eventBus.publish<LEVEL_UP>(ECSEVENTS.LEVEL_UP, this.level)
	}

	updateXP(amount: number) {
		this.xp += amount
		ECS.eventBus.publish<XP_PERCENT>(ECSEVENTS.XP_PERCENT, this.xp / this.nextLevel)
		const levelUp = Math.floor(this.xp / this.nextLevel)
		if (levelUp > 0) {
			for (let i = 0; i < levelUp; i++) {
				this.xp = this.xp % this.nextLevel
				this.nextLevel *= 1.5
				this.level++
				ECS.eventBus.publish<LEVEL_UP>(ECSEVENTS.LEVEL_UP, this.level)
			}
			Engine.setState(GameStates.levelUp)
		}
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