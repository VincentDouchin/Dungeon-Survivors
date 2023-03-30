import { System } from '../Globals/ECS'

import AnimationComponent from '../Components/AnimationComponent'
import BodyComponent from '../Components/BodyComponent'
import type { Entity } from '../Globals/ECS'
import INPUTS from '../Constants/InputsNames'
import PlayerControllerComponent from '../Components/PlayerControllerComponent'
import PositionComponent from '../Components/PositionComponent'
import RotationComponent from '../Components/RotationComponent'
import SpriteComponent from '../Components/SpriteComponent'

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
			if (position.parent) {
				position.parent.addChildren(entity)
				const parentPosition = position.parent.getComponent(PositionComponent)
				position.x = parentPosition.x + position.offsetX
				position.y = parentPosition.y + position.offsetY
			}
			if (body) {
				if (playerController) {
					const vel = { x: 0, y: 0 }
					vel.y = (playerController.getInput(INPUTS.MOVEUP)?.active ?? 0) - (playerController.getInput(INPUTS.MOVEDOWN)?.active ?? 0)
					vel.x = (playerController.getInput(INPUTS.MOVERIGHT)?.active ?? 0) - (playerController.getInput(INPUTS.MOVELEFT)?.active ?? 0)
					const max = Math.sqrt(vel.x ** 2 + vel.y ** 2)
					if (vel.x !== 0 || vel.y !== 0) {
						body.velocity.x = vel.x / max
						body.velocity.y = vel.y / max
					}
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
		})
	}
}
export default MovementSystem
