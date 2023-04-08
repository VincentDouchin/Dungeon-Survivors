import { ECS, Entity, System } from '../Globals/ECS'

import BodyComponent from '../Components/BodyComponent'
import DamageComponent from '../Components/DamageComponent'
import ExpirationComponent from '../Components/ExpirationComponent'
import HealthComponent from '../Components/HealthComponent'
import PositionComponent from '../Components/PositionComponent'
import SpriteComponent from '../Components/SpriteComponent'
import { ECSEVENTS, UIEVENTS } from '../Constants/Events'
import { SOUNDS } from '../Constants/Sounds'
import DamageTextEntity from '../Entities/DamageTextEntity'
import ParticleEntity from '../Entities/ParticleEntitty'
import assets from '../Globals/Assets'
import Coroutine from '../Globals/Coroutine'
import { soundManager } from '../Globals/Initialize'
import ColorShader from '../Shaders/ColorShader'
import DissolveShader from '../Shaders/DissolveShader'
import waitFor from '../Utils/WaitFor'

class HealthSystem extends System {
	constructor() {
		super(HealthComponent)
		this.subscribe(ECSEVENTS.TAKE_DAMAGE, ({ entity, amount }) => {
			const sprite = entity.getComponent(SpriteComponent)
			const health = entity.getComponent(HealthComponent)
			health.updateHealth(-amount)
			ECS.eventBus.publish(UIEVENTS.UPDATE_HEALTH, { entity, percent: health.health / health.maxHealth.value })
			if (sprite && amount > 0) {
				new Coroutine(function* () {
					health.canTakeDamage = false
					sprite.addShader(new ColorShader(1, 0, 0, 1))
					yield * waitFor(30)
					if (sprite) {
						sprite.removeShader(ColorShader)
					}
					health.canTakeDamage = true
				})
			}
			if (sprite && amount < 0) {
				ParticleEntity(entity, assets.effects.healing, { duration: 3, color: [0.9, 1, 0, 1] })
				soundManager.play('effect', SOUNDS.HEAL)
			}
			else if (health.sound) {
				soundManager.play('effect', health.sound, { fade: true })
			}
		})
	}

	update(entities: Entity[]) {
		entities.forEach((entity) => {
			const health = entity.getComponent(HealthComponent)
			if (health.lastMaxHealth !== health.maxHealth.value) {
				health.updateHealth(health.maxHealth.value - health.lastMaxHealth)
				health.lastMaxHealth = health.maxHealth.value
			}
			if (health.regen.value) {
				health.regenTimer--
				if (health.regenTimer <= 0) {
					ECS.eventBus.publish(ECSEVENTS.TAKE_DAMAGE, { entity, amount: health.regen.value })
					health.regenTimer = health.regenTime
				}
			}

			const sprite = entity.getComponent(SpriteComponent)
			const body = entity.getComponent(BodyComponent)
			const position = entity.getComponent(PositionComponent)
			if (body && health.canTakeDamage) {
				body.contacts((otherEntity: Entity) => {
					const damage = otherEntity.getComponent(DamageComponent)
					if (damage.target.includes(health.type)) {
						const otherPosition = otherEntity.getComponent(PositionComponent)

						// ! Take damage
						const damageAmount = damage.calculateDamage(health.defense.value)

						// ! Knockback
						if (body.body) {
							const knockbackForce = damage.knockback.value * 5000
							const angle = Math.atan2(otherPosition.y - position.y, otherPosition.x - position.x)
							body.body.applyImpulse({ x: -Math.cos(angle) * knockbackForce, y: -Math.sin(angle) * knockbackForce }, true)
						}

						damage.destroyOnHit--
						if (damage.destroyOnHit === 0) otherEntity.destroy()
						if (damage.onHit) {
							damage.onHit(entity)
						}
						ECS.eventBus.publish(ECSEVENTS.TAKE_DAMAGE, { entity, amount: damageAmount })
						// ! Damage number display
						DamageTextEntity(position, damageAmount, damage.crit)
						if (damage.sound) {
							soundManager.play('effect', damage.sound, { fade: true })
						}
					}
				}, health.type)
			}
			if (health.health === 0) {
				const deathAnimation = new Entity('death animation')
				deathAnimation.addComponent(position)
				deathAnimation.addComponent(sprite)
				deathAnimation.addComponent(new ExpirationComponent(120))
				sprite.removeShader(ColorShader)
				sprite.addShader(new ColorShader(1, 1, 1, 1))
				entity.destroy()
				sprite.addShader(new DissolveShader(90, false, 10))
			}
		})
	}
}
export default HealthSystem
