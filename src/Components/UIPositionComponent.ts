import { Component } from "../Globals/ECS";
import Coroutine from "../Globals/Coroutine";
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
			new Coroutine(function* () {
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
	left() {
		this.center.x = 1
		this.center.y = 0
		this.relativePosition.x = -1
		this.relativePosition.y = 0
		return this
	}
	right() {
		this.center.x = -1
		this.center.y = 0
		this.relativePosition.x = 1
		this.relativePosition.y = 0
		return this
	}
	top() {
		this.center.x = 0
		this.center.y = -1
		this.relativePosition.x = 0
		this.relativePosition.y = 1
		return this
	}
	bottom() {
		this.center.x = 0
		this.center.y = 1
		this.relativePosition.x = 0
		this.relativePosition.y = -1
		return this
	}

}
UIPositionComponent.register()
export default UIPositionComponent