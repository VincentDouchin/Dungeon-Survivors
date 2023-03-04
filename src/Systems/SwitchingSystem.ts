import { ECS, Entity, System } from "../Globals/ECS";

import COLLISIONGROUPS from "../Constants/CollisionGroups";
import CameraTargetComponent from "../Components/CameraTargetComponent";
import { ECSEVENTS } from "../Constants/Events";
import FlockingComponent from "../Components/FlockingComponent";
import INPUTS from "../Constants/InputsNames";
import OutlineShader from "../Shaders/OutlineShader";
import PlayerControllerComponent from "../Components/PlayerControllerComponent";
import SpellComponent from "../Components/SpellComponent";
import SpriteComponent from "../Components/SpriteComponent";
import SwitchingComponent from "../Components/SwitchingComponent";
import TargeterComponent from "../Components/TargeterComponent";
import { inputManager } from "../Globals/Initialize";

class SwitchingSystem extends System {
	constructor() {
		super(SwitchingComponent)
	}
	update(entities: Entity[]) {
		const toSwitch = inputManager.getInput(INPUTS.SWITCH)!.once
		const canSwitch = entities.length > 1
		const needsSwitch = !entities.some(entity => {
			const switcher = entity.getComponent(SwitchingComponent)
			return switcher.initiated && !switcher.main
		})
		if (!canSwitch && !needsSwitch) return
		entities.forEach(entity => {
			const switcher = entity.getComponent(SwitchingComponent)
			if (toSwitch || !switcher.initiated || (!canSwitch && needsSwitch)) {
				if (!switcher.initiated) switcher.initiated = true
				const flocking = entity.getComponent(FlockingComponent)
				const spell = entity.getComponent(SpellComponent)
				if (switcher.main) {
					ECS.eventBus.publish(ECSEVENTS.SPELL_ICON, spell.icon)
					entity.addComponent(new PlayerControllerComponent())
					entity.removeComponent(TargeterComponent)
					entity.getComponent(SpriteComponent).addShader(new OutlineShader([1, 1, 1, 1]))
					entity.addComponent(new CameraTargetComponent())
				} else {
					entity.getComponent(SpriteComponent).removeShader(OutlineShader)
					entity.removeComponent(CameraTargetComponent)
					entity.removeComponent(PlayerControllerComponent)
					entity.addComponent(new TargeterComponent(COLLISIONGROUPS.ENEMY, 100))

				}
				switcher.main = !switcher.main
				flocking.main = !flocking.main
			}
		})

	}
}
export default SwitchingSystem