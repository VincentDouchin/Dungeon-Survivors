import ECSEVENTS from "../Constants/ECSEvents";
import { Component, ECS, Entity } from "../Globals/ECS";
import PositionComponent from "./PositionComponent";

class DroppableComponent extends Component {
	constructor(entityContructor: () => Entity, amount: number = 1) {
		super()
		ECS.eventBus.subscribe(ECSEVENTS.DELETEENTITY, (id: string) => {
			const entity = ECS.getEntityById(id)
			const position = entity.getComponent(PositionComponent)
			for (let i = 0; i < amount; i++) {
				const newEntity = entityContructor()
				newEntity.addComponent(new PositionComponent(position.x, position.y))
			}
		})
	}
}
DroppableComponent.register()
export default DroppableComponent