import Coroutine from "../Globals/Coroutine";
import EventBus from "../Utils/EventBus";
import INPUTS from "../Constants/InputsNames";
import { InputController } from "../Globals/InputManager";
import waitFor from "../Utils/WaitFor";

class GamepadController implements InputController {
	eventBus: EventBus
	enabled = false
	threshold = 0.4
	gamepad: Gamepad | null = null
	inputs: Map<number, INPUTS> = new Map([
		[9, INPUTS.PAUSE],
		[0, INPUTS.VALIDATE],
		[12, INPUTS.MOVEUP],
		[13, INPUTS.MOVEDOWN],
		[14, INPUTS.MOVELEFT],
		[15, INPUTS.MOVERIGHT],
		[4, INPUTS.SWITCH],
		[5, INPUTS.SWITCH],
		[1, INPUTS.SKILL]
	])
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
		new Coroutine(function* () {
			while (self.enabled) {
				const gamepad = navigator.getGamepads()[0]
				if (!gamepad) return
				if (Math.abs(gamepad.axes[0]) > self.threshold) {
					self.eventBus.publish(INPUTS.AXISX, gamepad?.axes[0])
				} else {
					self.eventBus.publish(INPUTS.AXISX, 0)
				}
				if (Math.abs(gamepad.axes[1]) > self.threshold) {
					self.eventBus.publish(INPUTS.AXISY, gamepad?.axes[1] * -1)
				} else {
					self.eventBus.publish(INPUTS.AXISY, 0)
				}
				gamepad.buttons.forEach((x, i) => {

					if (x.pressed) console.log(i)
				})
				for (let [button, input] of self.inputs) {
					if (gamepad.buttons[button].pressed) {
						self.eventBus.publish(input, true)
						yield* waitFor(10)
						self.eventBus.publish(input, false)
					}
				}

				yield
			}
		})
	}





}
export default GamepadController