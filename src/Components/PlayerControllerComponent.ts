import { Component } from '../Globals/ECS'
import type { INPUTNAME } from '../Globals/InputManager'
import type INPUTS from '../Constants/InputsNames'
import { inputManager } from '../Globals/Initialize'

class PlayerControllerComponent extends Component {
	index: number | ''
	enabled = true
	constructor(index?: number) {
		super()
		this.index = index ?? ''
	}

	getInput(inputName: INPUTS) {
		return inputManager.getInput(`${inputName}${this.index}` as INPUTNAME)
	}
}
PlayerControllerComponent.register()
export default PlayerControllerComponent
