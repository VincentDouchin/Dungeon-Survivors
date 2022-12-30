import { Component } from "../Globals/ECS";

interface position {
	x: number
	y: number
}
class UIPosition extends Component {
	relativePosition: position
	center: position
	constructor(relativePosition?: position, center?: position) {
		super()
		this.relativePosition = relativePosition ?? { x: 0, y: 0 }
		this.center = center ?? { x: 0, y: 0 }

	}

}
UIPosition.register()
export default UIPosition