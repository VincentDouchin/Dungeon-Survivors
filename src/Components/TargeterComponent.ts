import { Component, ECS, Entity } from "../Globals/ECS";
import ECSEVENTS, { DELETE_ENTITY } from "../Constants/ECSEvents";

import { Vector2 } from "three";

class TargeterComponent extends Component {
	target: number | null = null
	targetedEnemy: string | null = null
	charger: boolean
	charging = false
	chargingDirection = new Vector2()
	distanceToTarget: number
	unSubscriber: () => void
	enabled = true
	constructor(target: number | string, distanceToTarget: number = 0, charger: boolean = false) {
		super()
		this.distanceToTarget = distanceToTarget
		this.charger = charger
		if (typeof target == 'string') {
			this.targetedEnemy = target
		} else {
			this.target = target
		}
		this.unSubscriber = ECS.eventBus.subscribe<DELETE_ENTITY>(ECSEVENTS.DELETE_ENTITY, (entity: Entity) => {
			if (entity.id == this.targetedEnemy) {
				this.targetedEnemy = null
			}
		})
	}
	destroy(): void {
		this.unSubscriber()
	}
}
TargeterComponent.register()
export default TargeterComponent