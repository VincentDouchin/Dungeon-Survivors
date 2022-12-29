import ECSEVENTS from "../Constants/ECSEvents";
import { Component, ECS, Entity } from "../Globals/ECS";

class TargeterComponent extends Component {
	target: number
	targetedEnemy: string | null = null
	constructor(target: number) {
		super()
		this.target = target
		ECS.eventBus.subscribe(ECSEVENTS.DELETEENTITY, (entity: Entity) => {
			if (entity.id == this.targetedEnemy) {
				this.targetedEnemy = null
			}
		})
	}
}
TargeterComponent.register()
export default TargeterComponent