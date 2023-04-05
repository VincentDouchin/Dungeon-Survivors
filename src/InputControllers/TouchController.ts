import { UIEVENTS } from '../Constants/Events'
import type INPUTS from '../Constants/InputsNames'
import { ECS } from '../Globals/ECS'
import { InputController } from './InputController'

class TouchController extends InputController {
	name = 'Touch'
	constructor(inputs: INPUTS[]) {
		super(inputs)
		ECS.eventBus.subscribe(UIEVENTS.TOUCH, ({ input, amount }) => {
			this.inputs.set(input, amount)
		})
	}

	update() {
		this.inputs.forEach((_, input) => this.inputs.set(input, 0))
	}
}
export default TouchController
