import ECSEVENTS from "../Constants/ECSEvents";
import { Component, ECS, Entity } from "../Globals/ECS";

class AIControllerComponent extends Component {
	enabled = true
	target: Entity | null = null
	constructor(target: Entity) {
		super()
		this.target = target
		ECS.eventBus.subscribe(ECSEVENTS.DELETEENTITY, (entityId: string) => {

			if (entityId == this.target?.id) {
				this.target = null
			}
		})
	}
}
AIControllerComponent.register()
export default AIControllerComponent