import { INTERACT, MOVEDOWN, MOVELEFT, MOVERIGHT, MOVEUP } from "../Constants/InputsNames"
import EventBus from "../Utils/EventBus"

class KeyboardController implements InputController {
	eventBus: EventBus
	keyMap: { [key: string]: string } = {
		'KeyW': MOVEUP,
		'KeyS': MOVEDOWN,
		'KeyA': MOVELEFT,
		'KeyD': MOVERIGHT,
		'KeyE': INTERACT,
	}
	constructor(eventBus: EventBus) {
		this.eventBus = eventBus
		window.addEventListener('keydown', this.handleKeyUpDown(true))
		window.addEventListener('keyup', this.handleKeyUpDown(false))
	}
	handleKeyUpDown = (state: boolean) => (e: KeyboardEvent) => {
		if (this.keyMap.hasOwnProperty(e.code)) {
			this.eventBus.publish(this.keyMap[e.code], state)
		}
	}
}

export default KeyboardController