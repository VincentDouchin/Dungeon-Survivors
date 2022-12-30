
import { Raycaster } from "three";
import EventBus from "../Utils/EventBus";
import { UICamera, UIScene } from "./Initialize";

class Input {
	active = false
	down = false
	get once() {
		if (this.active) {
			this.active = false
			return true
		}
		return false
	}
}

class InputManager {
	eventBus = new EventBus()
	controllers: InputController[] = []
	inputs: Map<string, Input> = new Map()
	constructor(domElement: HTMLCanvasElement, inputNames: string[]) {
		inputNames.forEach(inputName => {
			this.inputs.set(inputName, new Input())
			this.eventBus.subscribe(inputName, (state: boolean) => {
				this.inputs.get(inputName)!.down = state
				this.inputs.get(inputName)!.active = state
			})
		})
		const detectPointerEvent = (eventNames: Array<'mousedown' | 'mouseup' | 'mousemove' | 'touchstart' | 'touchend' | 'touchmove'>, state: 'down' | 'up' | 'move') => {
			eventNames.forEach(eventName => {
				domElement.addEventListener(eventName, (event: MouseEvent | TouchEvent) => {
					const target = event.target as HTMLCanvasElement
					const bounds = domElement.getBoundingClientRect()
					const clientX = (event instanceof TouchEvent ? event.touches[0]?.clientX : event.clientX) ?? 0
					const clientY = (event instanceof TouchEvent ? event.touches[0]?.clientY : event.clientY) ?? 0
					const mouse = {
						x: ((clientX - bounds.left) / target.clientWidth) * 2 - 1,
						y: - ((clientY - bounds.top) / target.clientHeight) * 2 + 1
					}
					const raycaster = new Raycaster()
					raycaster.setFromCamera(mouse, UICamera);
					const intersects = raycaster.intersectObjects(UIScene.children, true);
					this.eventBus.publish(state, { intersects: intersects.map(intersect => intersect.object.id), ...mouse })
				})

			}, false)
		}




		detectPointerEvent(['mousedown', 'touchstart'], 'down')
		detectPointerEvent(['mouseup', 'touchend'], 'up')
		detectPointerEvent(['mousemove', 'touchmove'], 'move')


	}
	registerControllers(...inputControllers: Constructor<InputController>[]) {
		this.controllers = inputControllers.map(controller => new controller(this.eventBus))
	}
	getInput(inputName: string) {
		return this.inputs.get(inputName)
	}
	enable(inputname: string) {
		this.eventBus.publish('enable', inputname)
	}
	disable(inputname: string) {
		this.eventBus.publish('disable', inputname)
	}

}
export default InputManager