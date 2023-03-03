import { ECS, Entity, System } from "../Globals/ECS";

import AnimationComponent from "../Components/AnimationComponent";
import BodyComponent from "../Components/BodyComponent";
import INPUTS from "../Constants/InputsNames";
import PlayerControllerComponent from '../Components/PlayerControllerComponent';
import PositionComponent from '../Components/PositionComponent';
import RotationComponent from "../Components/RotationComponent";
import ShadowComponent from "../Components/ShadowComponent";
import SpriteComponent from "../Components/SpriteComponent";
import { inputManager } from "../Globals/Initialize";

class MovementSystem extends System {
	constructor() {
		super(PositionComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const position = entity.getComponent(PositionComponent)
			const playerController = entity.getComponent(PlayerControllerComponent)
			const body = entity.getComponent(BodyComponent)
			const sprite = entity.getComponent(SpriteComponent)
			const animation = entity.getComponent(AnimationComponent)
			const rotation = entity.getComponent(RotationComponent)
			const shadow = entity.getComponent(ShadowComponent)
			if (body) {

				if (playerController?.enabled) {
					const axisX = inputManager.getInput(INPUTS.AXISX)?.active
					const axisY = inputManager.getInput(INPUTS.AXISY)?.active

					if (axisX || axisY) {
						if (axisX && axisX != 0) {
							body.velocity.x = axisX
						}
						if (axisY && axisY != 0) {
							body.velocity.y = axisY
						}
					} else {
						const vel = { x: 0, y: 0 }
						if (inputManager.getInput(INPUTS.MOVEUP)?.active) {
							vel.y = 1
						} else if (inputManager.getInput(INPUTS.MOVEDOWN)?.active) {
							vel.y = -1
						}
						if (inputManager.getInput(INPUTS.MOVELEFT)?.active) {
							vel.x = -1
						} else if (inputManager.getInput(INPUTS.MOVERIGHT)?.active) {
							vel.x = 1
						}
						const max = Math.sqrt(vel.x ** 2 + vel.y ** 2)
						if (vel.x != 0 || vel.y != 0) {
							body.velocity.x = vel.x / max
							body.velocity.y = vel.y / max
						}
					}
				}
				if (animation) {
					if (body.velocity.x != 0) sprite.flipped = body.velocity.x < 0
					animation.setState(Math.abs(body.velocity.x + body.velocity.y) > 0.9 ? 'run' : 'idle')
				}

				if (body.body) {
					const force = body.moveForce.value
					body.body.applyImpulse({ x: body.velocity.x * force, y: body.velocity.y * force }, true)
					body.velocity.x = 0
					body.velocity.y = 0
					position.x = body.body.translation().x
					position.y = body.body.translation().y
					if (rotation) {
						if (rotation.angVel.value) {
							body.body.setAngvel(rotation.angVel.value, true)
						}
						rotation.rotation = body.body.rotation()
					}
				}
			}
			if (shadow && shadow.entityId) {
				const shadowPosition = ECS.getEntityById(shadow.entityId).getComponent(PositionComponent)
				shadowPosition.x = position.x
				shadowPosition.y = position.y - shadow.offset
			}
		})
	}
}
export default MovementSystem