
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
		const detectPointerEvent = (eventName: 'pointerdown' | 'pointerup' | 'pointermove') => domElement.addEventListener(eventName, (event: PointerEvent) => {
			const bounds = domElement.getBoundingClientRect()
			const mouse = {
				x: ((event.clientX - bounds.left) / domElement.clientWidth) * 2 - 1,
				y: - ((event.clientY - bounds.top) / domElement.clientHeight) * 2 + 1
			}
			const raycaster = new Raycaster()
			raycaster.setFromCamera(mouse, UICamera);
			const intersects = raycaster.intersectObjects(UIScene.children, true);
			this.eventBus.publish(eventName, { intersects: intersects.map(intersect => intersect.object.id), ...mouse })

		}, false)
		detectPointerEvent('pointerdown')
		detectPointerEvent('pointerup')
		domElement.addEventListener('pointermove', (event: PointerEvent) => {
			const bounds = domElement.getBoundingClientRect()
			const mouse = {
				x: ((event.clientX - bounds.left) / domElement.clientWidth) * 2 - 1,
				y: - ((event.clientY - bounds.top) / domElement.clientHeight) * 2 + 1
			}
			this.eventBus.publish('pointermove', mouse)
		}, false)

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