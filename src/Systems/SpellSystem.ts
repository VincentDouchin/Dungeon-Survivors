import { ECS, Entity, System } from "../Globals/ECS";
import ECSEVENTS, { MANA_PERCENT } from "../Constants/ECSEvents";

import PositionComponent from "../Components/PositionComponent";
import { SKILL } from "../Constants/InputsNames";
import SpellComponent from "../Components/SpellComponent";
import StatsComponent from "../Components/StatsComponent";
import SwitchingComponent from "../Components/SwitchingComponent";
import { inputManager } from "../Globals/Initialize";

class SpellSystem extends System {
	constructor() {
		super(SpellComponent)
	}
	update(entities: Entity[]) {
		const attack = inputManager.getInput(SKILL)?.once
		entities
			.forEach(entity => {
				const switcher = entity.getComponent(SwitchingComponent)
				if (attack && switcher && !switcher?.main) {
					const position = entity.getComponent(PositionComponent)
					const spell = entity.getComponent(SpellComponent)
					const stats = entity.getComponent(StatsComponent)
					if (stats.mana > stats.manaCost) {
						spell.spell(position.position)
						stats.mana -= stats.manaCost
						ECS.eventBus.publish<MANA_PERCENT>(ECSEVENTS.MANA_PERCENT, stats.mana / stats.maxMana)
					}

				}
			})
	}
}
export default SpellSystem