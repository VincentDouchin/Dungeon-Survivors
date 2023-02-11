import { AXISX, AXISY, MOVEDOWN, MOVELEFT, MOVERIGHT, MOVEUP, PAUSE, VALIDATE } from "../Constants/InputsNames";

import Coroutines from "../Globals/Coroutines";
import EventBus from "../Utils/EventBus";
import { InputController } from "../Globals/InputManager";
import waitFor from "../Utils/WaitFor";

class GamepadController implements InputController {
	eventBus: EventBus
	enabled = false
	threshold = 0.4
	gamepad: Gamepad | null = null
	inputs: Record<string, number> = {
		[PAUSE]: 9,
		[VALIDATE]: 0,
		[MOVEUP]: 12,
		[MOVEDOWN]: 13,
		[MOVELEFT]: 14,
		[MOVERIGHT]: 15,
	}
	constructor(eventBus: EventBus) {
		this.eventBus = eventBus
		if (navigator.getGamepads()[0] !== null) {
			this.enable()
			return
		}
		window.addEventListener("gamepadconnected", () => {
			this.enable()

		})
		window.addEventListener("gamepaddisconnected", () => {
			this.enabled = false
		})
	}

	enable() {
		this.enabled = true
		const self = this
		Coroutines.add(function* () {
			while (self.enabled) {
				const gamepad = navigator.getGamepads()[0]
				if (!gamepad) return
				if (Math.abs(gamepad.axes[0]) > self.threshold) {
					self.eventBus.publish(AXISX, gamepad?.axes[0])
				} else {
					self.eventBus.publish(AXISX, 0)
				}
				if (Math.abs(gamepad.axes[1]) > self.threshold) {
					self.eventBus.publish(AXISY, gamepad?.axes[1] * -1)
				} else {
					self.eventBus.publish(AXISY, 0)
				}
				for (let [input, button] of Object.entries(self.inputs)) {
					if (gamepad.buttons[button].pressed) {
						self.eventBus.publish(input, true)
						yield* waitFor(10)
						self.eventBus.publish(input, false)
					}
				}

				yield
			}
			console.log('stopped')
		})
	}





}
export default GamepadController