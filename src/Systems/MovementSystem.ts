import { Vector3 } from "three";
import AnimationComponent from "../Components/AnimationComponent";
import BodyComponent from "../Components/BodyComponent";
import CameraTargetComponent from "../Components/CameraTargetComponent";
import PlayerControllerComponent from '../Components/PlayerControllerComponent';
import PositionComponent from '../Components/PositionComponent';
import RotationComponent from "../Components/RotationComponent";
import ECSEVENTS from "../Constants/ECSEvents";
import { MOVEDOWN, MOVELEFT, MOVERIGHT, MOVEUP } from "../Constants/InputsNames";
import { ECS, Entity, System } from "../Globals/ECS";
import { camera, inputManager } from "../Globals/Initialize";
class MovementSystem extends System {
	constructor() {
		super(PositionComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const position = entity.getComponent(PositionComponent)
			const playerController = entity.getComponent(PlayerControllerComponent)
			const body = entity.getComponent(BodyComponent)
			const animation = entity.getComponent(AnimationComponent)
			const cameraTarget = entity.getComponent(CameraTargetComponent)
			const rotation = entity.getComponent(RotationComponent)
			if (body) {

				if (playerController?.enabled) {
					if (inputManager.getInput(MOVEUP)?.active) {
						body.velociy.y = body.moveForce
					}
					if (inputManager.getInput(MOVEDOWN)?.active) {
						body.velociy.y = -body.moveForce
					}
					if (inputManager.getInput(MOVELEFT)?.active) {
						body.velociy.x = -body.moveForce
					}
					if (inputManager.getInput(MOVERIGHT)?.active) {
						body.velociy.x = body.moveForce
					}
				}
				if (animation) {
					if (body.velociy.x != 0) animation.flipped = body.velociy.x < 0
					animation.state = body.velociy.x + body.velociy.y > (body.moveForce * 0.5) ? 'run' : 'idle'
				}

				if (body.body) {
					body.body.setLinvel(body.velociy, true)

					position.x = body.body.translation().x
					position.y = body.body.translation().y
					if (rotation) {
						if (rotation.angVel) {
							body.body.setAngvel(rotation.angVel, true)
						}
						rotation.rotation = body.body.rotation()
					}
				}
				if (cameraTarget) {
					ECS.eventBus.publish(ECSEVENTS.CAMERAMOVE, { x: position.x, y: position.y })
					camera.position.x = position.x
					camera.position.y = position.y
					camera.lookAt(new Vector3(position.x, position.y, 0))
				}
			}

		})
	}
}
export default MovementSystem