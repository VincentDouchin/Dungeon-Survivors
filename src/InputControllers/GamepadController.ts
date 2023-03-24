import Coroutine from '../Globals/Coroutine'
import { ECS } from '../Globals/ECS'
import INPUTS from '../Constants/InputsNames'
import { InputController } from '../Globals/InputManager'

class GamepadController implements InputController {
	enabled = false
	threshold = 0.4
	gamepad: Gamepad | null = null
	index:number
	pollCoroutine?:Coroutine
	inputs: Map<number, INPUTS> = new Map([
		[9, INPUTS.PAUSE],
		[0, INPUTS.VALIDATE],
		// [12, INPUTS.MOVEUP],
		// [13, INPUTS.MOVEDOWN],
		// [14, INPUTS.MOVELEFT],
		// [15, INPUTS.MOVERIGHT],
		[4, INPUTS.SWITCH],
		[5, INPUTS.SWITCH],
		[1, INPUTS.SKILL]
	])
	wasEnabled:Partial<Record<INPUTS,boolean>> ={}
	constructor(index=0) {
		this.index = index
	
		window.addEventListener('gamepadconnected', () => {
			this.pollCoroutine = new Coroutine(this.poll.bind(this),Infinity)

		})
		window.addEventListener('gamepaddisconnected', () => {
			this.pollCoroutine?.stop()
		})
	}


	*poll  () {
		const gamepad = navigator.getGamepads()[this.index]
		if (!gamepad) return
		const amountX = gamepad?.axes[0]
		const inputX = amountX >0 ?INPUTS.MOVERIGHT:INPUTS.MOVELEFT
		const absAmoutX = Math.abs(amountX)
		if (absAmoutX > this.threshold) {
			ECS.eventBus?.publish(inputX, absAmoutX)
			this.wasEnabled[inputX] = true
		} else if(this.wasEnabled[inputX]){
			ECS.eventBus?.publish(inputX, 0)
			this.wasEnabled[inputX] = false
		}
			
		const amountY = gamepad?.axes[1]
		const inputY = amountY >0 ?INPUTS.MOVEDOWN:INPUTS.MOVEUP
		const absAmoutY = Math.abs(amountY)
		if (absAmoutY > this.threshold) {
				
			ECS.eventBus?.publish(inputY, absAmoutY)
			this.wasEnabled[inputY] = true
		} else if(this.wasEnabled[inputY]){
			ECS.eventBus?.publish(inputY, 0)
			this.wasEnabled[inputY] = false
		}
		for (const [button, input] of this.inputs) {
			if (gamepad.buttons[button].pressed) {
				ECS.eventBus?.publish(input, 1)
				this.wasEnabled[input] = true
			}else if(this.wasEnabled[input]){
				ECS.eventBus?.publish(input, 0)
				this.wasEnabled[input] = false
			}
				
		}

		yield
		
	}





}
export default GamepadController