import { Raycaster, Vector3 } from 'three'

import type EventBus from '../Utils/EventBus'
import GamepadController from '../InputControllers/GamepadController'
import type INPUTS from '../Constants/InputsNames'
import KeyboardController from '../InputControllers/KeyboardController'
import { ECS } from './ECS'
import { UICamera, UIScene, camera, renderer, scene } from './Initialize'
import State from './State'

class Input {
	active = 0
	down = false
	get once() {
		if (this.down)
			return 0
		if (this.active !== 0) {
			this.down = true
			this.active = 0
			return 1
		}
		return 0
	}
}
export type INPUTNAME = INPUTS | `${INPUTS}${number}`
export interface InputController {
  name: string
  unRegister?: () => void
  eventBus: EventBus<Record<INPUTNAME, number>>
}
class InputManager {
	controllers = new Set<InputController>()
	inputNames: INPUTS[]
	inputs: Record<INPUTNAME, Input>
	constructor(inputNames: INPUTS[]) {
		this.inputNames = inputNames
		this.inputs = this.createInputs(this.inputNames)
		inputNames.forEach((inputName) => {
			ECS.eventBus.subscribe(inputName, (state) => {
				const input = this.inputs[inputName]
				if (!input) return
				if (state === 0)
					input.down = false

				input.active = state
			})
		})
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
		const inputsForRegister = this.inputNames.reduce((acc, v) => ({
			...acc,
			[v]: v,
		}), {}) as Record<INPUTS, INPUTNAME>
		if (!State.mobile)
			this.registerController(new KeyboardController(), inputsForRegister)

		window.addEventListener('gamepadconnected', ({ gamepad }) => {
			this.registerController(new GamepadController(gamepad.index), inputsForRegister)
		})
	}

	createInputs(inputs: INPUTNAME[]) {
		return inputs.reduce((acc, v) => ({
			...acc,
			[v]: new Input(),
		}), {}) as Record<INPUTNAME, Input>
	}

	setPlayerController(player: number, controller: InputController) {
		const playerInputs = this.inputNames.reduce((acc, v) => ({
			...acc,
			[v]: `${v}${player}`,
		}), {}) as Record<INPUTS, INPUTNAME>

		Object.assign(this.inputs, this.createInputs(Object.values(playerInputs)))

		this.registerController(controller, playerInputs)
	}

	getInput(inputName: INPUTNAME) {
		return this.inputs[inputName]
	}

	registerController(inputController: InputController, inputNames: Record<INPUTS, INPUTNAME>) {
		this.controllers.add(inputController)
		for (const [input, inputName] of Object.entries(inputNames) as [INPUTS, INPUTNAME][]) {
			inputController.eventBus.subscribe(input, (state) => {
				const input = this.inputs[inputName]
				if (!input) return
				if (state === 0)
					input.down = false

				input.active = state
			})
		}
	}

	enable(inputname: string) {
		ECS.eventBus.publish('enable', inputname)
	}

	disable(inputname: string) {
		ECS.eventBus.publish('disable', inputname)
	}
}
export default InputManager
