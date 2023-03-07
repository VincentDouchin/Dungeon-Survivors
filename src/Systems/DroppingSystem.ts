import DroppableComponent from "../Components/DroppableComponent";
import { ECSEVENTS } from "../Constants/Events";
import PositionComponent from "../Components/PositionComponent";
import { System } from "../Globals/ECS";

class DroppingSystem extends System {
	constructor() {
		super(DroppableComponent)
		this.subscribe(ECSEVENTS.DELETE_ENTITY, entity => {
			const drops = entity.getComponent(DroppableComponent)?.entityContructors
			if (drops) {
				const parentPosition = entity.getComponent(PositionComponent)
				drops.forEach(drop => drop(parentPosition.clone()))
			}
		})
	}
	update(): void {

	}
}
export default DroppingSystem