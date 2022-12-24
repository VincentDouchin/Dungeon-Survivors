import { Component } from "../Globals/ECS";

class PositionComponent extends Component {
	x: number
	y: number
	constructor(x: number, y: number) {
		super()
		this.x = x
		this.y = y
	}
}
PositionComponent.register()
export default PositionComponent