import { Component, ECS } from "../Globals/ECS";
import ECSEVENTS, { LEVEL_UP, SKILL, XP_PERCENT } from "../Constants/ECSEvents";

import Engine from "../Globals/Engine";
import { GameStates } from "../Constants/GameStates";

class Stat {
	base: number
	flat: number = 0
	percent: number = 1
	constructor(base: number = 0) {
		this.base = base
	}
	addPercent(amount: number) {
		this.percent += amount
	}
	addFlat(amount: number) {
		this.flat += amount
	}
	get value() {
		return (this.base + this.flat) * this.percent
	}
}
class StatsComponent extends Component {
	angVel = new Stat(0)
	damage = new Stat(1)
	critDamage = new Stat(0.5)
	critChance = new Stat(0.05)
	crit = false
	knockback = new Stat(1)
	xpModifier = new Stat(0.5)
	defense = new Stat(1)
	xp = 0
	level = 0
	nextLevel = 20
	constructor() {
		super()
		ECS.eventBus.subscribe<SKILL>(ECSEVENTS.SKILL, (skill: Skill) => {
			skill.modifier(this)
		})
		ECS.eventBus.publish<LEVEL_UP>(ECSEVENTS.LEVEL_UP, this.level)
	}

	updateXP(amount: number) {
		console.log(amount)
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
		this.crit = this.critChance.value > Math.random()
		let damage = (damageAmount * this.damage.value) * (1 / defense)

		if (this.crit) {
			damage *= (1 + this.critDamage.value)
		}
		return damage
	}
}
StatsComponent.register()
export default StatsComponent