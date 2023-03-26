import { Vector2 } from 'three'
import { Component } from '../Globals/ECS'

class PositionComponent extends Component {
	x: number
	y: number
	constructor(x: number, y: number) {
		super()
		this.x = x
		this.y = y
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
