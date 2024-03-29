import { ECS, System } from '../Globals/ECS'

import { ECSEVENTS } from '../Constants/Events'
import type { Entity } from '../Globals/ECS'
import INPUTS from '../Constants/InputsNames'
import ManaComponent from '../Components/ManaComponent'
import PlayerControllerComponent from '../Components/PlayerControllerComponent'
import SpellComponent from '../Components/SpellComponent'

class SpellSystem extends System {
	constructor() {
		super(SpellComponent)
	}

	update(entities: Entity[]) {
		entities
			.forEach((entity) => {
				const playerController = entity.getComponent(PlayerControllerComponent)
				if (!playerController) return
				const attack = playerController.getInput(INPUTS.SKILL)?.once
				if (attack) {
					const spell = entity.getComponent(SpellComponent)
					const mana = entity.getComponent(ManaComponent)
					if (mana.mana >= mana.manaCost) {
						if (spell.spell(entity)) {
							mana.mana -= mana.manaCost
							ECS.eventBus.publish(ECSEVENTS.MANA_PERCENT, { percent: mana.mana / mana.maxMana.value, entity })
							ECS.eventBus.publish(ECSEVENTS.MANA_AMOUNT, mana.mana) }
					}
				}
			})
	}
}
export default SpellSystem
