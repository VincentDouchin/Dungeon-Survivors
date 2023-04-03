import { UIEVENTS } from '../Constants/Events'
import type INPUTS from '../Constants/InputsNames'
import Coroutine from '../Globals/Coroutine'
import { ECS } from '../Globals/ECS'
import type { InputController } from '../Globals/InputManager'
import EventBus from '../Utils/EventBus'
import waitFor from '../Utils/WaitFor'

class TouchController implements InputController {
	name = 'Touch'
	eventBus = new EventBus<Record<INPUTS, number>>()
	wasEnabled: Partial<Record<INPUTS, boolean>> = {}
	constructor() {
		ECS.eventBus.subscribe(UIEVENTS.TOUCH, ({ input, amount }) => {
			if (!this.wasEnabled[input]) {
				const self = this
				this.wasEnabled[input] = true
				new Coroutine(function*() {
					self.eventBus.publish(input, amount)
					if (amount === 0) return
					yield * waitFor(10)
					self.eventBus.publish(input, 0)
					self.wasEnabled[input] = false
				})
			}
		})
	}
}
export default TouchController
