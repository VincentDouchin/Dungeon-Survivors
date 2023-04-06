import SpriteComponent from '../Components/SpriteComponent'
import { UIEVENTS } from '../Constants/Events'
import INPUTS from '../Constants/InputsNames'
import { ECS } from '../Globals/ECS'
import { InputController } from './InputController'

class TouchController extends InputController {
	name = 'Touch'
	constructor(inputs: INPUTS[]) {
		super(inputs)
		ECS.eventBus.subscribe(UIEVENTS.TOUCH, ({ input, amount, entity }) => {
			this.inputs.set(input, amount)
			if (input === INPUTS.MOVEDOWN) {
				this.inputs.set(INPUTS.MOVEUP, 0)
			}
			if (input === INPUTS.MOVEUP) {
				this.inputs.set(INPUTS.MOVEDOWN, 0)
			}
			if (input === INPUTS.MOVELEFT) {
				this.inputs.set(INPUTS.MOVERIGHT, 0)
			}
			if (input === INPUTS.MOVERIGHT) {
				this.inputs.set(INPUTS.MOVELEFT, 0)
			}
			const sub = ECS.eventBus.subscribe('up', ({ uiObjects, objects }) => {
				const meshId = entity.getComponent(SpriteComponent).mesh.id
				if ([...uiObjects, ...objects].includes(meshId)) {
					this.inputs.set(input, 0)
					sub()
				}
			})
		})
	}

	update() {
		// this.inputs.forEach((_, input) => this.inputs.set(input, 0))
	}
}
export default TouchController
