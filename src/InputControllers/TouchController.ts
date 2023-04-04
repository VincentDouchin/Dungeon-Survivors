import SpriteComponent from '../Components/SpriteComponent'
import { UIEVENTS } from '../Constants/Events'
import type INPUTS from '../Constants/InputsNames'
import { ECS } from '../Globals/ECS'
import type { InputController } from '../Globals/InputManager'
import EventBus from '../Utils/EventBus'

class TouchController implements InputController {
	name = 'Touch'
	eventBus = new EventBus<Record<INPUTS, number>>()
	constructor() {
		ECS.eventBus.subscribe(UIEVENTS.TOUCH, ({ input, amount, entity }) => {
			this.eventBus.publish(input, amount)
			const meshId = entity.getComponent(SpriteComponent).mesh.id
			const reset = ECS.eventBus.subscribe('up', ({ uiObjects, objects }) => {
				if ([...uiObjects, ...objects].includes(meshId)) {
					this.eventBus.publish(input, 0)
					reset()
				}
			})
		})
	}
}
export default TouchController
