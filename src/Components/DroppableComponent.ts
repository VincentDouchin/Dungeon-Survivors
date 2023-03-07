import { Component, Entity } from "../Globals/ECS";

import PositionComponent from "./PositionComponent";

class DroppableComponent extends Component {
	parentId?: string
	entityContructors: Array<(position: PositionComponent) => Entity>
	constructor(entityContructors: Array<(position: PositionComponent) => Entity>) {
		super()
		this.entityContructors = entityContructors
	}
}
DroppableComponent.register()
export default DroppableComponent