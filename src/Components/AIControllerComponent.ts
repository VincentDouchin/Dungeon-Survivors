import ECSEVENTS from "../Constants/ECSEvents";
import { Component, ECS, Entity } from "../Globals/ECS";

class AIControllerComponent extends Component {
	enabled = true
	targetId: string | null = null
	constructor(target: Entity) {
		super()
		this.targetId = target.id
		ECS.eventBus.subscribe(ECSEVENTS.DELETEENTITY, (entity: Entity) => {
			if (entity.id == this.targetId) {
				this.targetId = null
			}
		})
	}
}
AIControllerComponent.register()
export default AIControllerComponent