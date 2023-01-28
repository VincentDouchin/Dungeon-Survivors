import { Component, ECS, Entity } from "../Globals/ECS";
import ECSEVENTS, { DELETE_ENTITY } from "../Constants/ECSEvents";

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
		ECS.eventBus.subscribe<DELETE_ENTITY>(ECSEVENTS.DELETE_ENTITY, (entity: Entity) => {
			if (entity.id == this.targetedEnemy) {
				this.targetedEnemy = null
			}
		})
	}
}
TargeterComponent.register()
export default TargeterComponent