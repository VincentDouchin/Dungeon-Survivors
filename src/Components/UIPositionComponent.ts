import { Easing, Tween } from '@tweenjs/tween.js'
import { Component } from '../Globals/ECS'
import { engine } from '../Globals/Initialize'
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
		return new Promise((resolve) => {
			new Tween({ y: this.relativePosition.y })
				.to({ y: endRelativePosition }, delay)
				.onUpdate(({ y }) => this.relativePosition.y = y)
				.easing(Easing.Quadratic.InOut)
				.onComplete(resolve)
				.start(engine.timer)
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
