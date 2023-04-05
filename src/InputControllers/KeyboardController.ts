import INPUTS from '../Constants/InputsNames'
import { InputController } from './InputController'

class KeyboardController extends InputController {
	name = 'Keyboard'
	constructor(inputNames: INPUTS[]) {
		super(inputNames)
		window.addEventListener('keydown', this.handleKeyUpDown(1))
		window.addEventListener('keyup', this.handleKeyUpDown(0))
	}

	keyMap: Record<string, INPUTS> = {
		KeyW: INPUTS.MOVEUP,
		KeyS: INPUTS.MOVEDOWN,
		KeyA: INPUTS.MOVELEFT,
		KeyD: INPUTS.MOVERIGHT,
		KeyE: INPUTS.INTERACT,
		Escape: INPUTS.PAUSE,
		ShiftLeft: INPUTS.SWITCH,
		Enter: INPUTS.VALIDATE,
		Space: INPUTS.SKILL,
	}

	// constructor() {
	// 	window.addEventListener('keydown', this.handleKeyUpDown(true))
	// 	window.addEventListener('keyup', this.handleKeyUpDown(false))
	// }

	handleKeyUpDown = (state: 1 | 0) => (e: KeyboardEvent) => {
		if (e.repeat) return
		if (e.code in this.keyMap) {
			this.inputs.set(this.keyMap[e.code], state)
		}
	}
}

export default KeyboardController
