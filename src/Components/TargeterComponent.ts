import ECSEVENTS from "../Constants/ECSEvents";
import { Component, ECS, Entity } from "../Globals/ECS";

class TargeterComponent extends Component {
	target: number | null = null
	targetedEnemy: string | null = null
	distanceToTarget: number
	constructor(target: number | string, distanceToTarget?: number) {
		super()
		this.distanceToTarget = distanceToTarget ?? 0
		if (typeof target == 'string') {
			this.targetedEnemy = target
		} else {
			this.target = target
		}
		ECS.eventBus.subscribe(ECSEVENTS.DELETEENTITY, (entity: Entity) => {
			if (entity.id == this.targetedEnemy) {
				this.targetedEnemy = null
			}
		})
	}
}
TargeterComponent.register()
export default TargeterComponent