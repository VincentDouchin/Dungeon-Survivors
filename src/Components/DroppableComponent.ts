import { Component, ECS, Entity } from "../Globals/ECS";
import ECSEVENTS, { DELETE_ENTITY } from "../Constants/ECSEvents";

import PositionComponent from "./PositionComponent";

class DroppableComponent extends Component {
	parentId?: string
	constructor(entityContructor: () => Entity, amount: number = 1) {
		super()
		const callback = (entity: Entity) => {
			if (this.parentId != entity.id) return
			ECS.eventBus.unsubscribe<DELETE_ENTITY>(ECSEVENTS.DELETE_ENTITY, callback)
			const position = entity.getComponent(PositionComponent)
			for (let i = 0; i < amount; i++) {
				const newEntity = entityContructor()
				newEntity.addComponent(new PositionComponent(position.x, position.y))
			}
		}
		ECS.eventBus.subscribe<DELETE_ENTITY>(ECSEVENTS.DELETE_ENTITY, callback)
	}
	bind(id: string) {
		this.parentId = id
	}
}
DroppableComponent.register()
export default DroppableComponent