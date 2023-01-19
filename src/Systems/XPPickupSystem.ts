import BodyComponent from "../Components/BodyComponent";
import PositionComponent from "../Components/PositionComponent";
import SkillsComponent from "../Components/SkillsComponent";
import XPComponent from "../Components/XPComponent";
import XPPickerComponent from "../Components/XPPickerComponent";
import COLLISIONGROUPS from "../Constants/CollisionGroups";
import ECSEVENTS from "../Constants/ECSEvents";
import { ECS, Entity, System } from "../Globals/ECS";

class XPPickupSystem extends System {
	constructor() {
		super(XPPickerComponent)
	}
	update(entities: Entity[]) {
		entities.forEach((entity) => {
			const body = entity.getComponent(BodyComponent)
			const position = entity.getComponent(PositionComponent)
			const skill = entity.getRecursiveComponent(SkillsComponent)
			body.contacts((otherEntity: Entity) => {
				const xp = otherEntity.getComponent(XPComponent)

				if (xp) {
					const otherBody = otherEntity.getComponent(BodyComponent)
					const otherPosition = otherEntity.getComponent(PositionComponent)
					const x = position.x - otherPosition.x
					const y = position.y - otherPosition.y
					const orientation = { x: x > 0 ? 1 : -1, y: y > 0 ? 1 : -1 }
					const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
					const force = otherBody.moveForce * 1 / distance
					otherBody.body!.applyImpulse({ x: force * orientation.x, y: force * orientation.y }, true)

				}
			},)
			body.contacts((otherEntity: Entity) => {
				const xp = otherEntity.getComponent(XPComponent)
				if (xp) {
					otherEntity.destroy()
					ECS.eventBus.publish(ECSEVENTS.XP, xp.amount * (skill?.xp ?? 1))

				}
			}, COLLISIONGROUPS.PLAYER)
		})
	}
}
export default XPPickupSystem