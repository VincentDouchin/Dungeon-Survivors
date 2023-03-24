import { ECS } from './ECS'
import GamepadController from '../InputControllers/GamepadController'
import INPUTS from '../Constants/InputsNames'
import KeyboardController from '../InputControllers/KeyboardController'
import State from './State'

class Input {
	active = 0
	down=false
	get once() {
		if(this.down) return 0
		if (this.active != 0) {
			this.down = true
			this.active = 0
			return 1
		}
		return 0
	}
}
export interface InputController {
	
}
class InputManager {
	
	controllers: InputController[] = []
	inputs= new Map<INPUTS, Input>()
	constructor(inputNames: INPUTS[]) {
		inputNames.forEach(inputName => {
			this.inputs.set(inputName, new Input())
			ECS.eventBus.subscribe(inputName, (state: number ) => {
				console.log(inputName)
				const input = this.inputs.get(inputName)
				if(!input) return
				if(state ===0 ) {
					input.down = false 
				}
				console.log(inputName,state)
				input.active = state
				
			})
		})







	}
	registerControllers(...inputControllers: Constructor<InputController>[]) {
		this.controllers = inputControllers.map(controllerConstructor => {
			return  new controllerConstructor()
		})
	}
	getInput(inputName: INPUTS) {
		return this.inputs.get(inputName)
	}
	enable(inputname: string) {
		ECS.eventBus.publish('enable', inputname)
	}
	disable(inputname: string) {
		ECS.eventBus.publish('disable', inputname)
	}
	getInputMethods() {
		const inputMethods :[string, InputController][] = []
		if (!State.mobile) {
			inputMethods.push(['Keyboard', new KeyboardController()])
		}
		navigator.getGamepads().filter(Boolean).forEach((_, index) => {
			inputMethods.push([`Gamepad ${index}`, new GamepadController(index)])
		})
		return inputMethods
	}

}
export default InputManager