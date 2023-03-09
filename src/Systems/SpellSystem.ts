import { ECS, Entity, System } from "../Globals/ECS";

import { ECSEVENTS } from "../Constants/Events";
import INPUTS from "../Constants/InputsNames";
import ManaComponent from "../Components/ManaComponent";
import SpellComponent from "../Components/SpellComponent";
import SwitchingComponent from "../Components/SwitchingComponent";
import { inputManager } from "../Globals/Initialize";

class SpellSystem extends System {
	constructor() {
		super(SpellComponent)
	}
	update(entities: Entity[]) {
		const attack = inputManager.getInput(INPUTS.SKILL)?.once
		entities
			.forEach(entity => {
				const switcher = entity.getComponent(SwitchingComponent)
				if (attack && switcher && !switcher?.main) {
					const spell = entity.getComponent(SpellComponent)
					const mana = entity.getComponent(ManaComponent)
					if (mana.mana >= mana.manaCost) {
						spell.spell(entity)
						mana.mana -= mana.manaCost
						ECS.eventBus.publish(ECSEVENTS.MANA_PERCENT, mana.mana / mana.maxMana.value)
						ECS.eventBus.publish(ECSEVENTS.MANA_AMOUNT, mana.mana)
					}

				}
			})
	}
}
export default SpellSystem