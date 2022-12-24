import { Entity, System } from "../Globals/ECS";
import PositionComponent from '../Components/PositionComponent'
import PlayerControllerComponent from '../Components/PlayerControllerComponent'
import { inputManager } from "../Globals/Initialize";
import { MOVEDOWN, MOVELEFT, MOVERIGHT, MOVEUP } from "../Constants/InputsNames";
import BodyComponent from "../Components/BodyComponent";
import { Vector2 } from "@dimforge/rapier2d-compat";
class MovementSystem extends System {
	constructor() {
		super(PositionComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const position = entity.getComponent(PositionComponent)
			const playerController = entity.getComponent(PlayerControllerComponent)
			const body = entity.getComponent(BodyComponent)

			if (playerController?.enabled && body) {
				const impulse = new Vector2(0, 0)
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

				body.body.setLinvel(impulse, true)


			}
			if (body) {
				position.x = body.body.translation().x
				position.y = body.body.translation().y
			}
		})
	}
}
export default MovementSystem