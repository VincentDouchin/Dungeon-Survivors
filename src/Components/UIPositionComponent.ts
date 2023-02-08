import { Component } from "../Globals/ECS";
import Coroutines from "../Globals/Coroutines";
import { easeInOutQuad } from "../Utils/Tween";

interface position {
	x: number
	y: number
}
class UIPositionComponent extends Component {
	relativePosition: position
	center: position
	constructor(relativePosition?: position, center?: position) {
		super()
		this.relativePosition = relativePosition ?? { x: 0, y: 0 }
		this.center = center ?? { x: 0, y: 0 }

	}
	moveTo(startPosition: number, endPosition: number, delay: number) {
		const self = this
		return new Promise<void>(resolve => {
			Coroutines.add(function* () {
				let t = 0
				while (self.relativePosition.y != endPosition) {
					self.relativePosition.y = easeInOutQuad(t, startPosition, endPosition, delay)
					t++
					yield

				}
				resolve()
			})
		})
	}

}
UIPositionComponent.register()
export default UIPositionComponent