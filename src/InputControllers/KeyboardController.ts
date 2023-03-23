import EventBus from "../Utils/EventBus"
import INPUTS from "../Constants/InputsNames";
import { InputController } from "../Globals/InputManager"

class KeyboardController implements InputController {
	eventBus?: EventBus
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
			this.eventBus?.publish(this.keyMap[e.code], state)
		}
	}
}

export default KeyboardController