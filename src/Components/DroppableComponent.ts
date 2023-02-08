import { Component, ECS, Entity } from "../Globals/ECS";
import ECSEVENTS, { ADD_TO_BACKGROUND, DELETE_ENTITY } from "../Constants/ECSEvents";

import { EventCallBack } from "../Utils/EventBus";
import PositionComponent from "./PositionComponent";

class DroppableComponent extends Component {
	parentId?: string
	subscriber: EventCallBack<Entity>
	constructor(entityContructor: () => Entity, amount: number = 1) {
		super()
		this.subscriber = ECS.eventBus.subscribe<DELETE_ENTITY>(ECSEVENTS.DELETE_ENTITY, (entity: Entity) => {
			if (this.parentId != entity.id) return

			const position = entity.getComponent(PositionComponent)
			for (let i = 0; i < amount; i++) {
				const newEntity = entityContructor()
				ECS.eventBus.publish<ADD_TO_BACKGROUND>(ECSEVENTS.ADD_TO_BACKGROUND, newEntity)
				newEntity.addComponent(new PositionComponent(position.x, position.y))
			}
		})
	}
	bind(id: string) {
		this.parentId = id
	}
	destroy(): void {
		ECS.eventBus.unsubscribe<DELETE_ENTITY>(ECSEVENTS.DELETE_ENTITY, this.subscriber)
	}
}
DroppableComponent.register()
export default DroppableComponent