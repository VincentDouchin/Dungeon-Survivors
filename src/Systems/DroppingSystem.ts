import { ECS, System } from '../Globals/ECS'

import DroppableComponent from '../Components/DroppableComponent'
import { ECSEVENTS } from '../Constants/Events'
import PositionComponent from '../Components/PositionComponent'

class DroppingSystem extends System {
	constructor() {
		super(DroppableComponent)
		this.subscribe(ECSEVENTS.DELETE_ENTITY, entity => {
			const drops = entity.getComponent(DroppableComponent)?.entityContructors
			if (drops) {
				const parentPosition = entity.getComponent(PositionComponent)
				drops.forEach(drop => {
					const dropEntity = drop(parentPosition.clone())
					ECS.eventBus.publish(ECSEVENTS.ADD_TO_BACKGROUND, dropEntity)
				})

			}
		})
	}
}
export default DroppingSystem