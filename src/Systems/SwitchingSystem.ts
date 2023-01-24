import { Entity, System } from "../Globals/ECS";

import COLLISIONGROUPS from "../Constants/CollisionGroups";
import CameraTargetComponent from "../Components/CameraTargetComponent";
import FlockingComponent from "../Components/FlockingComponent";
import OutlineShader from "../Shaders/OutlineShader";
import PlayerControllerComponent from "../Components/PlayerControllerComponent";
import { SWITCH } from "../Constants/InputsNames";
import SpriteComponent from "../Components/SpriteComponent";
import SwitchingComponent from "../Components/SwitchingComponent";
import TargeterComponent from "../Components/TargeterComponent";
import { inputManager } from "../Globals/Initialize";

class SwitchingSystem extends System {
	constructor() {
		super(SwitchingComponent)
	}
	update(entities: Entity[]) {
		const toSwitch = inputManager.getInput(SWITCH)!.once
		entities.forEach(entity => {
			const switcher = entity.getComponent(SwitchingComponent)
			if (toSwitch || !switcher.initiated) {
				if (!switcher.initiated) switcher.initiated = true
				const flocking = entity.getComponent(FlockingComponent)
				if (switcher.main) {
					entity.addComponent(new PlayerControllerComponent())
					entity.removeComponent(TargeterComponent)
					entity.getComponent(SpriteComponent).addShader(new OutlineShader([1, 1, 1, 1]))
					entity.addComponent(new CameraTargetComponent({}))
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