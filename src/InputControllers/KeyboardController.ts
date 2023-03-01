import { INTERACT, MOVEDOWN, MOVELEFT, MOVERIGHT, MOVEUP, PAUSE, SKILL, SWITCH, VALIDATE } from "../Constants/InputsNames"

import EventBus from "../Utils/EventBus"
import { InputController } from "../Globals/InputManager"

class KeyboardController implements InputController {
	eventBus: EventBus
	keyMap: { [key: string]: string } = {
		'KeyW': MOVEUP,
		'KeyS': MOVEDOWN,
		'KeyA': MOVELEFT,
		'KeyD': MOVERIGHT,
		'KeyE': INTERACT,
		'Escape': PAUSE,
		'ShiftLeft': SWITCH,
		'Enter': VALIDATE,
		'Space': VALIDATE,
		'KeyP': SKILL

	}
	constructor(eventBus: EventBus) {
		this.eventBus = eventBus
		window.addEventListener('keydown', this.handleKeyUpDown(true))
		window.addEventListener('keyup', this.handleKeyUpDown(false))
	}
	handleKeyUpDown = (state: boolean) => (e: KeyboardEvent) => {
		if (e.repeat) return
		if (e.code in this.keyMap) {
			this.eventBus.publish(this.keyMap[e.code], state)
		}
	}
}

export default KeyboardController