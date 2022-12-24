import { Entity, System } from "../Globals/ECS";
import PositionComponent from '../Components/PositionComponent'
import PlayerControllerComponent from '../Components/PlayerControllerComponent'
import { inputManager } from "../Globals/Initialize";
import { MOVEDOWN, MOVELEFT, MOVERIGHT, MOVEUP } from "../Constants/InputsNames";
class MovementSystem extends System {
	constructor() {
		super(PositionComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const position = entity.getComponent(PositionComponent)
			const playerController = entity.getComponent(PlayerControllerComponent)

			if (playerController?.enabled) {
				if (inputManager.getInput(MOVEUP)?.active) {
					position.y += 10
					console.log(position)
				}
				if (inputManager.getInput(MOVEDOWN)?.active) {
					position.y -= 10
				}
				if (inputManager.getInput(MOVELEFT)?.active) {
					position.x -= 10
				}
				if (inputManager.getInput(MOVERIGHT)?.active) {
					position.x += 10
				}
			}
		})
	}
}
export default MovementSystem