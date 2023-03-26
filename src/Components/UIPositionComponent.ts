import { Component } from '../Globals/ECS'
import Coroutine from '../Globals/Coroutine'
import { easeInOutQuad } from '../Utils/Tween'

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

	moveTo(endRelativePosition: number, delay: number) {
		const self = this
		const startRelativePosition = this.relativePosition.y
		return new Promise<void>((resolve) => {
			new Coroutine(function* () {
				for (let t = 0; t < delay; t++) {
					self.relativePosition.y = easeInOutQuad(t, startRelativePosition, endRelativePosition, delay)
					yield
				}
				resolve()
			})
		})
	}

	offsetX(length: number, index: number) {
		this.center.x = (index - Math.floor(length / 2)) * 2 + (length % 2 === 0 ? 1 : 0)
		return this
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
