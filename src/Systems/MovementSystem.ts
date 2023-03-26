import type { Entity } from '../Globals/ECS'
import { ECS, System } from '../Globals/ECS'

import AnimationComponent from '../Components/AnimationComponent'
import BodyComponent from '../Components/BodyComponent'
import INPUTS from '../Constants/InputsNames'
import PlayerControllerComponent from '../Components/PlayerControllerComponent'
import PositionComponent from '../Components/PositionComponent'
import RotationComponent from '../Components/RotationComponent'
import ShadowComponent from '../Components/ShadowComponent'
import SpriteComponent from '../Components/SpriteComponent'
import { inputManager } from '../Globals/Initialize'

class MovementSystem extends System {
	constructor() {
		super(PositionComponent)
	}

	update(entities: Entity[]) {
		entities.forEach((entity) => {
			const position = entity.getComponent(PositionComponent)
			const playerController = entity.getComponent(PlayerControllerComponent)
			const body = entity.getComponent(BodyComponent)
			const sprite = entity.getComponent(SpriteComponent)
			const animation = entity.getComponent(AnimationComponent)
			const rotation = entity.getComponent(RotationComponent)
			const shadow = entity.getComponent(ShadowComponent)
			if (body) {
				if (playerController?.enabled) {
					const vel = { x: 0, y: 0 }
					vel.y = (inputManager.getInput(INPUTS.MOVEUP)?.active ?? 0) - (inputManager.getInput(INPUTS.MOVEDOWN)?.active ?? 0)
					vel.x = (inputManager.getInput(INPUTS.MOVERIGHT)?.active ?? 0) - (inputManager.getInput(INPUTS.MOVELEFT)?.active ?? 0)
					console.log(inputManager.getInput(INPUTS.MOVEUP)?.active, inputManager.getInput(INPUTS.MOVEDOWN)?.active, vel.y)
					const max = Math.sqrt(vel.x ** 2 + vel.y ** 2)
					if (vel.x != 0 || vel.y != 0) {
						body.velocity.x = vel.x / max
						body.velocity.y = vel.y / max
					}
					// }
				}
				if (animation) {
					if (Math.abs(body.velocity.x) > 0.1) sprite.flipped = body.velocity.x < 0
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
						if (rotation.rotationVel) {
							rotation.centerRotation += rotation.rotationVel
						}
						rotation.rotation = body.body.rotation()
					}
				}
			}
			if (shadow && shadow.entityId) {
				const shadowPosition = ECS.getEntityById(shadow.entityId)?.getComponent(PositionComponent)
				if (shadowPosition) {
					shadowPosition.x = position.x
					shadowPosition.y = position.y - shadow.offset
				}
			}
		})
	}
}
export default MovementSystem
