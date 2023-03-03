import { Component, ECS, Entity } from "../Globals/ECS";

import { ECSEVENTS } from "../Constants/Events";
import PositionComponent from "./PositionComponent";

class DroppableComponent extends Component {
	parentId?: string
	unSubscriber: () => void
	constructor(entityContructors: Array<() => Entity>) {
		super()
		this.unSubscriber = ECS.eventBus.subscribe(ECSEVENTS.DELETE_ENTITY, (entity) => {
			if (this.parentId != entity.id) return

			const position = entity.getComponent(PositionComponent)
			for (const entityContructor of entityContructors) {
				const newEntity = entityContructor()
				ECS.eventBus.publish(ECSEVENTS.ADD_TO_BACKGROUND, newEntity)
				const randomOffset = () => (Math.random() - 0.5) * 2 * 10
				newEntity.addComponent(new PositionComponent(position.x + randomOffset(), position.y + randomOffset()))
			}
		})
	}
	bind(id: string) {
		this.parentId = id
	}
	destroy(): void {
		this.unSubscriber()
	}
}
DroppableComponent.register()
export default DroppableComponent