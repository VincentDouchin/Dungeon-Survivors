import { Component } from "../Globals/ECS";

interface position {
	x: number
	y: number
}
class UIPosition extends Component {
	relativePosition: position
	center: position
	constructor(relativePosition: position, center: position) {
		super()
		this.relativePosition = relativePosition
		this.center = center

	}

}
UIPosition.register()
export default UIPosition