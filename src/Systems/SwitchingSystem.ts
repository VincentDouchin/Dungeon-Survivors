import { Entity, System } from "../Globals/ECS";

import COLLISIONGROUPS from "../Constants/CollisionGroups";
import CameraTargetComponent from "../Components/CameraTargetComponent";
import FlockingComponent from "../Components/FlockingComponent";
import OutlineShader from "../Shaders/OutlineShader";
import PlayerControllerComponent from "../Components/PlayerControllerComponent";
import { SWITCH } from "../Constants/InputsNames";
import SpriteComponent from "../Components/SpriteComponent";
import TargeterComponent from "../Components/TargeterComponent";
import { inputManager } from "../Globals/Initialize";

class SwitchingSystem extends System {
	constructor() {
		super(PlayerControllerComponent)
	}
	update(entities: Entity[]) {
		if (inputManager.getInput(SWITCH)!.once) {
			entities.forEach(entity => {
				const controller = entity.getComponent(PlayerControllerComponent)
				const flocking = entity.getComponent(FlockingComponent)

				if (controller.enabled) {
					entity.getComponent(SpriteComponent).removeShader(OutlineShader)
					entity.removeComponent(CameraTargetComponent)
					entity.addComponent(new TargeterComponent(COLLISIONGROUPS.ENEMY, 100))
				} else {
					entity.removeComponent(TargeterComponent)
					entity.getComponent(SpriteComponent).addShader(new OutlineShader([1, 1, 1, 0.8]))
					entity.addComponent(new CameraTargetComponent({}))

				}
				flocking.main = !flocking.main
				controller.enabled = !controller.enabled
			})

		}
	}
}
export default SwitchingSystem