import type { Entity } from '../Globals/ECS'
import { ECS, System } from '../Globals/ECS'

import BodyComponent from '../Components/BodyComponent'
import BoostComponent from '../Components/BoostComponent'
import COLLISIONGROUPS from '../Constants/CollisionGroups'
import { ECSEVENTS } from '../Constants/Events'
import ManaComponent from '../Components/ManaComponent'
import ParticleEntity from '../Entities/ParticleEntitty'
import { SOUNDS } from '../Constants/Sounds'
import StatsComponent from '../Components/StatsComponent'
import TokenComponent from '../Components/TokenComponent'
import XPComponent from '../Components/XPComponent'
import XPPickerComponent from '../Components/XPPickerComponent'
import assets from '../Globals/Assets'
import { soundManager } from '../Globals/Initialize'
import PotionComponent from '../Components/PotionComponent'
import HealthComponent from '../Components/HealthComponent'

class PickupSystem extends System {
	constructor() {
		super(XPPickerComponent)
	}

	update(entities: Entity[]) {
		entities.forEach((entity) => {
			const body = entity.getComponent(BodyComponent)
			const stats = entity.getComponent(StatsComponent)
			const xpPicker = entity.getComponent(XPPickerComponent)
			const mana = entity.getComponent(ManaComponent)
			body.contacts((otherEntity: Entity) => {
				const xp = otherEntity.getComponent(XPComponent)
				const token = otherEntity.getComponent(TokenComponent)
				const boost = otherEntity.getComponent(BoostComponent)
				const potion = otherEntity.getComponent(PotionComponent)
				if (xp) {
					otherEntity.destroy()
					soundManager.play('effect', SOUNDS.XP, { playbackRate: 2, volume: 0.5 })
					ECS.eventBus.publish(ECSEVENTS.XP_UP, { entity, amount: xp.amount * xpPicker.xpModifier.value })
				}
				if (token) {
					if (!mana) return
					otherEntity.destroy()
					mana.mana = Math.min(mana.maxMana.value, mana.mana + 15)
					soundManager.play('effect', SOUNDS.PowerUp, { volume: 0.3 })
					ECS.eventBus.publish(ECSEVENTS.MANA_PERCENT, { percent: mana.mana / mana.maxMana.value, entity })
					ECS.eventBus.publish(ECSEVENTS.MANA_AMOUNT, mana.mana)
				}
				if (boost) {
					otherEntity.destroy()
					stats?.addBuff(boost)
					ParticleEntity(entity, assets.effects.healing, { duration: 5, frameRate: 10, color: boost.color })
					soundManager.play('effect', SOUNDS.BOOST)
				}
				if (potion) {
					otherEntity.destroy()
					const health = entity.getComponent(HealthComponent)
					ECS.eventBus.publish(ECSEVENTS.TAKE_DAMAGE, {
						entity,
						amount: -health.maxHealth.value * 0.2,
					})
					if (health.healingGroup) {
						ECS.getEntitiesAndComponents(HealthComponent).forEach(([picker]) => {
							const pickerHealth = picker.getComponent(HealthComponent)
							if (pickerHealth.healingGroup === health.healingGroup && picker !== entity) {
								ECS.eventBus.publish(ECSEVENTS.TAKE_DAMAGE, {
									entity: picker,
									amount: -pickerHealth.maxHealth.value * 0.2,
								})
							}
						})
					}
				}
			}, COLLISIONGROUPS.PLAYER)
		})
	}
}
export default PickupSystem
