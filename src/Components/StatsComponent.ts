import { Component, ECS } from "../Globals/ECS";
import ECSEVENTS, { LEVEL_UP, SKILL, XP_PERCENT } from "../Constants/ECSEvents";

import Engine from "../Globals/Engine";
import { GameStates } from "../Constants/GameStates";
import { StatModifier } from "../Game/Stat";

class StatsComponent extends Component {
	attackSpeed = new StatModifier()
	speed = new StatModifier()
	damage = new StatModifier()
	critDamage = new StatModifier()
	critChance = new StatModifier()
	knockback = new StatModifier()
	xpModifier = new StatModifier()
	defense = new StatModifier()
	health = new StatModifier()
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

}
StatsComponent.register()
export default StatsComponent