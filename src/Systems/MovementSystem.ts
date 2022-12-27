import { ECS, Entity, System } from "../Globals/ECS";
import { MOVEDOWN, MOVELEFT, MOVERIGHT, MOVEUP } from "../Constants/InputsNames";
import { Vector2 } from "@dimforge/rapier2d-compat";
import { camera, inputManager } from "../Globals/Initialize";
import PositionComponent from '../Components/PositionComponent'
import PlayerControllerComponent from '../Components/PlayerControllerComponent'
import BodyComponent from "../Components/BodyComponent";
import AIControllerComponent from "../Components/AIControllerComponent";
import AnimationComponent from "../Components/AnimationComponent";
import WeaponControllerComponent from "../Components/WeaponControllerComponent";
import CameraTargetComponent from "../Components/CameraTargetComponent";
import { Vector3 } from "three";
class MovementSystem extends System {
	constructor() {
		super(PositionComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const position = entity.getComponent(PositionComponent)
			const playerController = entity.getComponent(PlayerControllerComponent)
			const body = entity.getComponent(BodyComponent)
			const aiController = entity.getComponent(AIControllerComponent)
			const animation = entity.getComponent(AnimationComponent)
			const weaponController = entity.getComponent(WeaponControllerComponent)
			const cameraTarget = entity.getComponent(CameraTargetComponent)
			if (body) {
				const impulse = new Vector2(0, 0)
				if (aiController?.enabled && aiController.targetId) {
					const targetPosition = ECS
						.getEntityById(aiController.targetId)
						.getComponent(PositionComponent)

					impulse.x = ((targetPosition.x - position.x) > 0 ? 1 : -1) * Math.min(body.moveForce, Math.abs(targetPosition.x - position.x))
					impulse.y = ((targetPosition.y - position.y) > 0 ? 1 : -1) * Math.min(body.moveForce, Math.abs(targetPosition.y - position.y))


				}
				if (playerController?.enabled) {
					if (inputManager.getInput(MOVEUP)?.active) {
						impulse.y = body.moveForce
					}
					if (inputManager.getInput(MOVEDOWN)?.active) {
						impulse.y = -body.moveForce
					}
					if (inputManager.getInput(MOVELEFT)?.active) {
						impulse.x = -body.moveForce
					}
					if (inputManager.getInput(MOVERIGHT)?.active) {
						impulse.x = body.moveForce
					}
				}
				if (animation) {
					animation.flipped = impulse.x < 0
					animation.state = impulse.x + impulse.y > body.moveForce ? 'run' : 'idle'
				}

				if (body.body) {
					body.body.setLinvel(impulse, true)

					position.x = body.body.translation().x
					position.y = body.body.translation().y
					if (weaponController?.joint) {
						body.body.setAngvel(1, true)


					}
				}
				if (cameraTarget) {
					camera.position.x = position.x
					camera.position.y = position.y
					camera.lookAt(new Vector3(position.x, position.y, 200))
				}
			}

		})
	}
}
export default MovementSystem