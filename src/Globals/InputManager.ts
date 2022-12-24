
import EventBus from "../Utils/EventBus";

class Input {
	active = false
	down = false
	get once() {
		if (this.active) {
			this.active = false
			return true
		}
		return false
	}
}

class InputManager {
	eventBus = new EventBus()
	controllers: InputController[] = []
	inputs: Map<string, Input> = new Map()
	constructor(...inputNames: string[]) {
		inputNames.forEach(inputName => {
			this.inputs.set(inputName, new Input())
			this.eventBus.subscribe(inputName, (state: boolean) => {
				this.inputs.get(inputName)!.down = state
				this.inputs.get(inputName)!.active = state
			})
		})
	}
	registerControllers(...inputControllers: Constructor<InputController>[]) {
		this.controllers = inputControllers.map(controller => new controller(this.eventBus))
	}
	getInput(inputName: string) {
		return this.inputs.get(inputName)
	}

}
export default InputManager