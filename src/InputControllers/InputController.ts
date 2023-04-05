import type INPUTS from '../Constants/InputsNames'

export class InputController {
	inputs = new Map<INPUTS, number>()
	constructor(inputs: INPUTS[]) {
		inputs.forEach((input) => {
			this.inputs.set(input, 0)
		})
	}
}
export interface InputController {
	name: string
	update(): void
	identify(): void
}
