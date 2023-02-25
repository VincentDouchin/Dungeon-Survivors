import { Component, ECS } from "../Globals/ECS";
import ECSEVENTS, { SKILL } from "../Constants/ECSEvents";

import { Stat } from "../Game/Stat";

class ManaComponent extends Component {
	mana = 100
	maxMana = new Stat(100)
	manaCost = 20

	skills: Skill[] = []
	constructor() {
		super()
		ECS.eventBus.subscribe<SKILL>(ECSEVENTS.SKILL, (skill: Skill) => {
			this.skills.push(skill)
		})
	}
}
ManaComponent.register()
export default ManaComponent