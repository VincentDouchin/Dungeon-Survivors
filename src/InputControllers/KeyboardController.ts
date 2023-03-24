import { ECS } from '../Globals/ECS'
import INPUTS from '../Constants/InputsNames'
import { InputController } from '../Globals/InputManager'

class KeyboardController implements InputController {
	keyMap: Record<string, INPUTS> = {
		'KeyW': INPUTS.MOVEUP,
		'KeyS': INPUTS.MOVEDOWN,
		'KeyA': INPUTS.MOVELEFT,
		'KeyD': INPUTS.MOVERIGHT,
		'KeyE': INPUTS.INTERACT,
		'Escape': INPUTS.PAUSE,
		'ShiftLeft': INPUTS.SWITCH,
		'Enter': INPUTS.VALIDATE,
		'Space': INPUTS.SKILL,
	}
	constructor() {
		window.addEventListener('keydown', this.handleKeyUpDown(true))
		window.addEventListener('keyup', this.handleKeyUpDown(false))
	}
	handleKeyUpDown = (state: boolean) => (e: KeyboardEvent) => {
		if (e.repeat) return
		if (e.code in this.keyMap) {
			ECS.eventBus?.publish(this.keyMap[e.code], state? 1 : 0)
		}
	}
}

export default KeyboardController