import { Vector3 } from "three";
import AnimationComponent from "../Components/AnimationComponent";
import BodyComponent from "../Components/BodyComponent";
import CameraTargetComponent from "../Components/CameraTargetComponent";
import PlayerControllerComponent from '../Components/PlayerControllerComponent';
import PositionComponent from '../Components/PositionComponent';
import RotationComponent from "../Components/RotationComponent";
import SkillsComponent from "../Components/SkillsComponent";
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
			const skills = entity.getComponent(SkillsComponent)
			if (body) {

				if (playerController?.enabled) {
					if (inputManager.getInput(MOVEUP)?.active) {
						body.velocity.y = 1
					}
					if (inputManager.getInput(MOVEDOWN)?.active) {
						body.velocity.y = -1
					}
					if (inputManager.getInput(MOVELEFT)?.active) {
						body.velocity.x = -1
					}
					if (inputManager.getInput(MOVERIGHT)?.active) {
						body.velocity.x = 1
					}
				}
				if (animation) {
					if (body.velocity.x != 0) animation.flipped = body.velocity.x < 0
					animation.state = body.velocity.x + body.velocity.y > (body.moveForce * 0.5) ? 'run' : 'idle'
				}

				if (body.body) {
					body.body.setLinvel({ x: body.velocity.x * body.moveForce, y: body.velocity.y * body.moveForce }, true)
					body.velocity.x = 0
					body.velocity.y = 0
					position.x = body.body.translation().x
					position.y = body.body.translation().y
					if (rotation) {
						if (rotation.angVel) {
							body.body.setAngvel(rotation.angVel + (skills?.angVel ?? 0), true)
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