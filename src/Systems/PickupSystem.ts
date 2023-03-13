import { ECS, Entity, System } from "../Globals/ECS";

import BodyComponent from "../Components/BodyComponent";
import BoostComponent from "../Components/BoostComponent";
import COLLISIONGROUPS from "../Constants/CollisionGroups";
import { ECSEVENTS } from "../Constants/Events";
import ManaComponent from "../Components/ManaComponent";
import ParticleEntity from "../Entities/ParticleEntitty";
import PositionComponent from "../Components/PositionComponent";
import { SOUNDS } from "../Constants/Sounds";
import StatsComponent from "../Components/StatsComponent";
import TokenComponent from "../Components/TokenComponent";
import XPComponent from "../Components/XPComponent";
import XPPickerComponent from "../Components/XPPickerComponent";
import assets from "../Globals/Assets";
import { soundManager } from "../Globals/Initialize";

class PickupSystem extends System {
	constructor() {
		super(XPPickerComponent)
	}
	update(entities: Entity[]) {
		entities.forEach((entity) => {
			const body = entity.getComponent(BodyComponent)
			const position = entity.getComponent(PositionComponent)
			const stats = entity.getComponent(StatsComponent)
			const mana = entity.getRecursiveComponent(ManaComponent)
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
				const boost = otherEntity.getComponent(BoostComponent)
				if (xp) {
					soundManager.play('effect', SOUNDS.XP, { playbackRate: 2, volume: 0.5 })
					otherEntity.destroy()
					ECS.eventBus.publish(ECSEVENTS.XP_UP, { entity, amount: xp.amount })
				}
				if (token) {
					otherEntity.destroy()
					if (!mana) return
					mana.mana = Math.min(mana.maxMana.value, mana.mana + 15)
					soundManager.play('effect', SOUNDS.PowerUp, { volume: 0.3 })
					ECS.eventBus.publish(ECSEVENTS.MANA_PERCENT, mana.mana / mana.maxMana.value)
					ECS.eventBus.publish(ECSEVENTS.MANA_AMOUNT, mana.mana)
				}
				if (boost) {
					otherEntity.destroy()
					stats?.boosts.push(boost)
					ParticleEntity(entity, assets.effects.healing, { duration: 5, frameRate: 10, color: boost.color })
					soundManager.play('effect', SOUNDS.BOOST)

				}

			}, COLLISIONGROUPS.PLAYER)
		})
	}
}
export default PickupSystem