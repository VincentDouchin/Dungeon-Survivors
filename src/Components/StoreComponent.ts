import { Component, ECS } from "../Globals/ECS";
import ECSEVENTS, { LEVEL_UP, XP, XP_PERCENT } from "../Constants/ECSEvents";

import Engine from "../Globals/Engine";
import { State } from "../Constants/GameStates";

class StoreComponent extends Component {
	xp = 0
	level = 0
	nextLevel = 20
	constructor() {
		super()
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
			Engine.setState(State.levelUp)
		}
	}
}
StoreComponent.register()
export default StoreComponent