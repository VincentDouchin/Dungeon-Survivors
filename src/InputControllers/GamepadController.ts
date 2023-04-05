// import Coroutine from '../Globals/Coroutine'
// import EventBus from '../Utils/EventBus'
// import INPUTS from '../Constants/InputsNames'
// import { InputController } from '../Globals/InputManager'

import INPUTS from '../Constants/InputsNames'
import { InputController } from './InputController'
interface CustonGamepad extends GamepadController {
	vibrationActuator?: {
	playEffect: (type: 'dual-rumble', options: { startDelay: number; duration: number; weakMagnitude: number; strongMagnitude: number }) => Promise<void>
	}
}
class GamepadController extends InputController {
	buttonMap = new Map<number, INPUTS>([
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

	axesMap = new Map<number, { positive: INPUTS; negative: INPUTS }>([
		[0, { positive: INPUTS.MOVERIGHT, negative: INPUTS.MOVELEFT }],
		[1, { positive: INPUTS.MOVEDOWN, negative: INPUTS.MOVEUP }],
	])

	identify(): void {
		const gamepad = navigator.getGamepads()[this.index] as CustonGamepad | null
		if (gamepad?.vibrationActuator) {
			gamepad.vibrationActuator.playEffect('dual-rumble', {
				startDelay: 0,
				duration: 100,
				weakMagnitude: 0.5,
				strongMagnitude: 0.5,
			})
		}
	}

	index: number
	threshold = 0.4
	get name() {
		return `Gamepad ${this.index}`
	}

	constructor(inputs: INPUTS[], index: number) {
		super(inputs)
		this.index = index
	}

	update(): void {
		const gamepad = navigator.getGamepads()[this.index]
		for (const [index, { positive, negative }] of this.axesMap) {
			const amount = gamepad?.axes[index] ?? 0
			this.inputs.set(amount > 0 ? positive : negative, Math.abs(amount) > this.threshold ? Math.abs(amount) : 0)
		}
		for (const [index, input] of this.buttonMap) {
			this.inputs.set(input, gamepad?.buttons[index].pressed ? 1 : 0)
		}
	}
}
export default GamepadController
