import { Vector2 } from 'three'
import type { Entity } from '../Globals/ECS'
import { Component } from '../Globals/ECS'

class PositionComponent extends Component {
	x: number
	y: number
	parent: Entity | null = null
	offsetX = 0
	offsetY = 0
	overrideBody = false
	constructor(x: number, y: number) {
		super()
		this.x = x
		this.y = y
	}

	static fromParent(parent: Entity, offsetX: number, offsetY: number) {
		const parentPosition = parent.getComponent(PositionComponent)
		const position = parentPosition.clone()
		position.parent = parent
		position.offsetX = offsetX
		position.offsetY = offsetY
		return position
	}

	get position() {
		return new Vector2(this.x, this.y)
	}

	distanceTo(position: PositionComponent) {
		return this.position.distanceTo(position.position)
	}

	clone() {
		return new PositionComponent(this.x, this.y)
	}
}
PositionComponent.register()
export default PositionComponent
