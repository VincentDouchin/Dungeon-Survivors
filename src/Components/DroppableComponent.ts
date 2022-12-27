import ECSEVENTS from "../Constants/ECSEvents";
import { Component, ECS, Entity } from "../Globals/ECS";
import PositionComponent from "./PositionComponent";

class DroppableComponent extends Component {
	parentId?: string
	constructor(entityContructor: () => Entity, amount: number = 1) {
		super()
		const callback = (entity: Entity) => {
			if (this.parentId != entity.id) return
			ECS.eventBus.unsubscribe(ECSEVENTS.DELETEENTITY, callback)
			const position = entity.getComponent(PositionComponent)
			for (let i = 0; i < amount; i++) {
				const newEntity = entityContructor()
				newEntity.addComponent(new PositionComponent(position.x, position.y))
			}
		}
		ECS.eventBus.subscribe(ECSEVENTS.DELETEENTITY, callback)
	}
	bind(id: string) {
		this.parentId = id
	}
}
DroppableComponent.register()
export default DroppableComponent