import { Raycaster, Vector3 } from 'three'
import type INPUTS from '../Constants/InputsNames'
import GamepadController from '../InputControllers/GamepadController'
import type { InputController } from '../InputControllers/InputController'
import KeyboardController from '../InputControllers/KeyboardController'
import TouchController from '../InputControllers/TouchController'
import Coroutine from './Coroutine'
import { ECS } from './ECS'
import { UICamera, UIScene, camera, renderer, scene } from './Initialize'
import State from './State'

class Input {
	active = 0
	lastState = 0
	get once() {
		return this.lastState === 0 && this.active > 0
	}

	reset() {
		this.lastState = this.active
		this.active = 0
	}
}
export type INPUTNAME = INPUTS | `${INPUTS}${number}`

class InputManager {
	inputNames: INPUTS[]
	inputs: Partial<Record<INPUTNAME, Input>> = {}
	controllers = new Set<InputController>()
	playerController = new Map<number, InputController>()
	constructor(inputNames: INPUTS[]) {
		this.inputNames = inputNames
		this.inputs = this.createInputs()
		const self = this
		new Coroutine(function*() {
			yield self.updateInputs()
		})
		this.inputNames.forEach((inputName) => {
			ECS.eventBus.subscribe(inputName, (amount) => {
				const input = this.inputs[inputName]
				if (input) input.active = amount })
		})
		// ! TOUCH
		const detectPointerEvent = (eventName: 'mousedown' | 'mouseup' | 'mousemove' | 'touchstart' | 'touchend' | 'touchmove', state: 'down' | 'up' | 'move') => {
			renderer.domElement.addEventListener(eventName, (event: MouseEvent | TouchEvent) => {
				const target = event.target as HTMLCanvasElement
				const bounds = renderer.domElement.getBoundingClientRect()
				const sendEvent = (event: MouseEvent | TouchEvent['touches'][number]) => {
					const x = ((event.clientX - bounds.left) / target.clientWidth) * 2 - 1
					const y = 1 - ((event.clientY - bounds.top) / target.clientHeight) * 2
					const mouse = {
						x,
						y,
						clientX: (UICamera.right * x),
						clientY: (UICamera.top * y),
					}
					const vec = new Vector3()
					const pos = new Vector3()

					vec.set(
						(event.clientX / window.innerWidth) * 2 - 1,
						-(event.clientY / window.innerHeight) * 2 + 1,
						200)

					vec.unproject(camera)

					vec.sub(camera.position).normalize()

					const distance = -camera.position.z / vec.z
					pos.copy(camera.position).add(vec.multiplyScalar(distance))
					const raycaster = new Raycaster()
					raycaster.setFromCamera(mouse, UICamera)
					const uiObjects = raycaster.intersectObjects(UIScene.children, true).map(intersect => intersect.object.id)

					const raycasterScene = new Raycaster()
					raycasterScene.setFromCamera(mouse, camera)
					const objects = raycasterScene.intersectObjects(scene.children, true).map(intersect => intersect.object.id)
					ECS.eventBus.publish(state, { uiObjects, objects, ...mouse, identifier: event instanceof MouseEvent ? null : event.identifier })
				}

				if (event instanceof TouchEvent)
					Array.from(event.changedTouches).forEach(touch => sendEvent(touch))

				else
					sendEvent(event)
			})
		}
		detectPointerEvent(State.mobile ? 'touchstart' : 'mousedown', 'down')
		detectPointerEvent(State.mobile ? 'touchend' : 'mouseup', 'up')
		detectPointerEvent(State.mobile ? 'touchmove' : 'mousemove', 'move')
		// ! CONTROLLERS
		if (!State.mobile) {
			this.registerController(new KeyboardController(this.inputNames))
		} else {
			this.registerController(new TouchController(this.inputNames))
		}
		window.addEventListener('gamepadconnected', ({ gamepad }) => {
			this.registerController(new GamepadController(this.inputNames, gamepad.index))
		})
	}

	createInputs(index?: number) {
		return this.inputNames.reduce((acc, input) => {
			const name: INPUTNAME = index !== undefined ? `${input}${index}` : input
			return { ...acc, [name]: new Input() }
		}, {}) as Record<INPUTNAME, Input>
	}

	getInput(inputName: INPUTNAME) {
		return this.inputs[inputName]
	}

	updateInputs() {
		this.inputNames.forEach((inputName) => {
			const input = this.inputs[inputName]!
			input.reset()
			input.active = Math.max(...Array.from(this.controllers).map(controller => controller.inputs.get(inputName) ?? 0))
		})
		this.playerController.forEach((controller, index) => {
			controller.inputs.forEach((state, inputName) => {
				const name: INPUTNAME = `${inputName}${index}`
				const input = this.inputs[name]
				if (input) {
					input.reset()
					input.active = state
				}
			})
		})
		this.controllers.forEach(controller => controller?.update && controller.update())
	}

	registerController(controller: InputController, index?: number) {
		this.controllers.add(controller)
		if (index !== undefined) {
			this.playerController.set(index, controller)
			Object.assign(this.inputs, this.createInputs(index))
		}
	}
}

export default InputManager
