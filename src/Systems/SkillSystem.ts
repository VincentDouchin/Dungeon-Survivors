import { Entity, System } from "../Globals/ECS";

import DivineProtectionEntity from "../Entities/DivineProtectionEntity";
import PositionComponent from "../Components/PositionComponent";
import { SKILL } from "../Constants/InputsNames";
import StatsComponent from "../Components/StatsComponent";
import SwitchingComponent from "../Components/SwitchingComponent";
import { inputManager } from "../Globals/Initialize";

class SkillSystem extends System {
	constructor() {
		super(StatsComponent)
	}
	update(entities: Entity[]) {
		entities
			.filter(entity => entity.getComponent(SwitchingComponent)?.main)
			.forEach(entity => {
				if (inputManager.getInput(SKILL)?.once) {
					const position = entity.getComponent(PositionComponent)

					DivineProtectionEntity(position.position)
				}
			})
	}
}
export default SkillSystem