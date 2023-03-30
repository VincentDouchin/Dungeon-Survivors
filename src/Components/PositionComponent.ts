import { Vector2 } from 'three'
import type { Entity } from '../Globals/ECS'
import { Component } from '../Globals/ECS'

class PositionComponent extends Component {
	x: number
	y: number
	parent: Entity | null = null
	offsetX = 0
	offsetY = 0
	constructor(x?: number, y?: number) {
		super()
		this.x = x ?? 0
		this.y = y ?? 0
	}

	fromParent(parent: Entity, offsetX: number, offsetY: number) {
		this.parent = parent
		this.offsetX = offsetX
		this.offsetY = offsetY
		this.parent.onDestroy(() => this.parent = null)
		return this
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
