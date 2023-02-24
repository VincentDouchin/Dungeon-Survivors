import { ECS, Entity, System } from "../Globals/ECS";
import ECSEVENTS, { MANA_PERCENT } from "../Constants/ECSEvents";

import BodyComponent from "../Components/BodyComponent";
import COLLISIONGROUPS from "../Constants/CollisionGroups";
import PositionComponent from "../Components/PositionComponent";
import StatsComponent from "../Components/StatsComponent";
import TokenComponent from "../Components/TokenComponent";
import XPComponent from "../Components/XPComponent";
import XPPickerComponent from "../Components/XPPickerComponent";

class XPPickupSystem extends System {
	constructor() {
		super(XPPickerComponent)
	}
	update(entities: Entity[]) {
		entities.forEach((entity) => {
			const body = entity.getComponent(BodyComponent)
			const position = entity.getComponent(PositionComponent)
			const stats = entity.getRecursiveComponent(StatsComponent)
			body.contacts((otherEntity: Entity) => {

				const otherBody = otherEntity.getComponent(BodyComponent)
				const otherPosition = otherEntity.getComponent(PositionComponent)
				const x = position.x - otherPosition.x
				const y = position.y - otherPosition.y
				const orientation = { x: x > 0 ? 1 : -1, y: y > 0 ? 1 : -1 }
				const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
				const force = otherBody.moveForce.value * 1 / distance
				otherBody.body!.applyImpulse({ x: force * orientation.x, y: force * orientation.y }, true)


			}, COLLISIONGROUPS.SENSOR)
			body.contacts((otherEntity: Entity) => {
				const xp = otherEntity.getComponent(XPComponent)
				const token = otherEntity.getComponent(TokenComponent)
				if (xp) {
					otherEntity.destroy()
					stats?.updateXP(xp.amount)
				}
				if (token) {
					otherEntity.destroy()
					if (!stats) return
					stats.mana = Math.min(stats.maxMana, stats.mana + 15)
					ECS.eventBus.publish<MANA_PERCENT>(ECSEVENTS.MANA_PERCENT, stats.mana / stats.maxMana)

				}

			}, COLLISIONGROUPS.PLAYER)
		})
	}
}
export default XPPickupSystem