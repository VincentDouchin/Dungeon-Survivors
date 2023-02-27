import { ECS, Entity, System } from "../Globals/ECS";
import ECSEVENTS, { MANA_AMOUNT, MANA_PERCENT } from "../Constants/ECSEvents";
import { inputManager, soundManager } from "../Globals/Initialize";

import { ALLSOUNDS } from "../Globals/Sounds";
import ManaComponent from "../Components/ManaComponent";
import PositionComponent from "../Components/PositionComponent";
import { SKILL } from "../Constants/InputsNames";
import SpellComponent from "../Components/SpellComponent";
import StatsComponent from "../Components/StatsComponent";
import SwitchingComponent from "../Components/SwitchingComponent";

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
					const mana = entity.getComponent(ManaComponent)
					const stats = entity.getComponent(StatsComponent)
					if (mana.mana >= mana.manaCost) {
						spell.spell(position.position, stats)
						mana.mana -= mana.manaCost
						soundManager.play(ALLSOUNDS.Magic, 1, 0.5)
						ECS.eventBus.publish<MANA_PERCENT>(ECSEVENTS.MANA_PERCENT, mana.mana / mana.maxMana.value)
						ECS.eventBus.publish<MANA_AMOUNT>(ECSEVENTS.MANA_AMOUNT, mana.mana)
					}

				}
			})
	}
}
export default SpellSystem