import ActiveSkillButtonEntity from "./TouchInputs/ActiveSkillButtonEntity"
import DpadInputEntity from "./TouchInputs/DpadInputEntity"
import { Entity } from "../Globals/ECS"
import EventBus from "../Utils/EventBus"
import { InputController } from "../Globals/InputManager"
import PauseButtonEntity from "./TouchInputs/PauseButtonEntity"
import SwitchButtonEntity from "./TouchInputs/SwitchButtonEntity"

class TouchController implements InputController {
	eventBus: EventBus
	inputs: Record<string, (eventBus: EventBus) => Entity> = {
		dpad: DpadInputEntity,
		pauseButton: PauseButtonEntity,
		switchButton: SwitchButtonEntity,
		activeSkillButton: ActiveSkillButtonEntity
	}
	enabledInputs: Map<string, Entity> = new Map()
	constructor(eventBus: EventBus) {
		this.eventBus = eventBus

		this.eventBus.subscribe('enable', (input: string) => {
			if (navigator.userAgentData?.mobile === false) return
			this.enabledInputs.set(input, this.inputs[input](eventBus))
		})
		this.eventBus.subscribe('disable', (input: string) => {
			this.enabledInputs.get(input)?.destroy()
			this.enabledInputs.delete(input)
		})

	}
}
export default TouchController