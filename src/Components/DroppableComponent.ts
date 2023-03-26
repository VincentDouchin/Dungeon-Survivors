import type { Entity } from '../Globals/ECS'
import { Component } from '../Globals/ECS'

import type PositionComponent from './PositionComponent'

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
