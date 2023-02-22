import { Component, ECS, Entity } from "../Globals/ECS";
import ECSEVENTS, { DELETE_ENTITY } from "../Constants/ECSEvents";

import { EventCallBack } from "../Utils/EventBus";
import { Vector2 } from "three";

class TargeterComponent extends Component {
	target: number | null = null
	targetedEnemy: string | null = null
	charger: boolean
	charging = false
	chargingDirection = new Vector2()
	distanceToTarget: number
	subscriber: EventCallBack<Entity>
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
		this.subscriber = ECS.eventBus.subscribe<DELETE_ENTITY>(ECSEVENTS.DELETE_ENTITY, (entity: Entity) => {
			if (entity.id == this.targetedEnemy) {
				this.targetedEnemy = null
			}
		})
	}
	destroy(): void {
		ECS.eventBus.unsubscribe<DELETE_ENTITY>(ECSEVENTS.DELETE_ENTITY, this.subscriber)
	}
}
TargeterComponent.register()
export default TargeterComponent