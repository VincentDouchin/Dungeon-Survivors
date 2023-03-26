import Coroutine from '../Globals/Coroutine'
import EventBus from '../Utils/EventBus'
import INPUTS from '../Constants/InputsNames'
import type { InputController } from '../Globals/InputManager'

class GamepadController implements InputController {
	eventBus = new EventBus<Record<INPUTS, number>>()
	get name() {
		return `Gamepad ${this.index}`
	}

	enabled = false
	threshold = 0.4
	gamepad: Gamepad | null = null
	index: number
	pollCoroutine?: Coroutine
	inputs: Map<number, INPUTS> = new Map([
		[9, INPUTS.PAUSE],
		[0, INPUTS.VALIDATE],
		// [12, INPUTS.MOVEUP],
		// [13, INPUTS.MOVEDOWN],
		// [14, INPUTS.MOVELEFT],
		// [15, INPUTS.MOVERIGHT],
		[4, INPUTS.SWITCH],
		[5, INPUTS.SWITCH],
		[1, INPUTS.SKILL],
	])

	wasEnabled: Partial<Record<INPUTS, boolean>> = {}
	constructor(index = 0) {
		this.index = index
		this.pollCoroutine = new Coroutine(this.poll.bind(this), Infinity)
	}

	unRegister() {
		this.pollCoroutine?.stop()
	}

	*poll() {
		const gamepad = navigator.getGamepads()[this.index]
		if (!gamepad) return
		const amountX = gamepad?.axes[0]
		const inputX = amountX > 0 ? INPUTS.MOVERIGHT : INPUTS.MOVELEFT
		const absAmoutX = Math.abs(amountX)
		if (absAmoutX > this.threshold) {
			this.eventBus?.publish(inputX, absAmoutX)
			this.wasEnabled[inputX] = true
		}
		else if (this.wasEnabled[inputX]) {
			this.eventBus?.publish(inputX, 0)
			this.wasEnabled[inputX] = false
		}

		const amountY = gamepad?.axes[1]
		const inputY = amountY > 0 ? INPUTS.MOVEDOWN : INPUTS.MOVEUP
		const absAmoutY = Math.abs(amountY)
		if (absAmoutY > this.threshold) {
			this.eventBus?.publish(inputY, absAmoutY)
			this.wasEnabled[inputY] = true
		}
		else if (this.wasEnabled[inputY]) {
			this.eventBus?.publish(inputY, 0)
			this.wasEnabled[inputY] = false
		}
		for (const [button, input] of this.inputs) {
			if (gamepad.buttons[button].pressed) {
				this.eventBus?.publish(input, 1)
				this.wasEnabled[input] = true
			}
			else if (this.wasEnabled[input]) {
				this.eventBus?.publish(input, 0)
				this.wasEnabled[input] = false
			}
		}

		yield
	}
}
export default GamepadController
