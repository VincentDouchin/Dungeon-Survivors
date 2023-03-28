import { ECS, Entity, System } from '../Globals/ECS'

import BarShader from '../Shaders/BarShader'
import BodyComponent from '../Components/BodyComponent'
import ColorShader from '../Shaders/ColorShader'
import Coroutine from '../Globals/Coroutine'
import DamageComponent from '../Components/DamageComponent'
import DamageTextEntity from '../Entities/DamageTextEntity'
import DissolveShader from '../Shaders/DissolveShader'
import { ECSEVENTS } from '../Constants/Events'
import ExpirationComponent from '../Components/ExpirationComponent'
import HealthComponent from '../Components/HealthComponent'
import HealthRegenComponent from '../Components/HealthRegenComponent'
import ParticleEntity from '../Entities/ParticleEntitty'
import PositionComponent from '../Components/PositionComponent'
import { SOUNDS } from '../Constants/Sounds'
import SpriteComponent from '../Components/SpriteComponent'
import assets from '../Globals/Assets'
import { soundManager } from '../Globals/Initialize'
import waitFor from '../Utils/WaitFor'

const empty = assets.UI.healthBar
const full = assets.UI.healthFull
class HealthSystem extends System {
	constructor() {
		super(HealthComponent)
		this.subscribe(ECSEVENTS.TAKE_DAMAGE, ({ entity, amount }) => {
			const sprite = entity.getComponent(SpriteComponent)
			const health = entity.getComponent(HealthComponent)
			health.updateHealth(-amount)
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
			const regen = entity.getComponent(HealthRegenComponent)
			if (regen) {
				regen.timer--
				if (regen.timer <= 0) {
					health.updateHealth(regen.amount)
					regen.timer = regen.time
				}
			}

			const sprite = entity.getComponent(SpriteComponent)
			const body = entity.getComponent(BodyComponent)
			const position = entity.getComponent(PositionComponent)

			if (health.show && !health.healthBar && sprite) {
				const healthBarEntity = new Entity('healthBar')
				const healthMesh = new SpriteComponent(empty, { renderOrder: 20, shaders: [new BarShader(full.texture)] })
				entity.addChildren(healthBarEntity)
				healthBarEntity.addComponent(healthMesh)
				health.healthBar = healthBarEntity
				sprite.mesh.add(healthMesh.mesh)
				healthMesh.mesh.position.y = sprite.height / 2
				health.updateHealth(0)
			}
			if (body && health.canTakeDamage) {
				body.contacts((otherEntity: Entity) => {
					const damage = otherEntity.getComponent(DamageComponent)
					if (damage.target.includes(health.type)) {
						const otherPosition = otherEntity.getComponent(PositionComponent)

						// ! Take damage
						const damageAmount = damage.calculateDamage(health.defense.value)

						if (damage.sound) {
							soundManager.play('effect', damage.sound, { fade: true })
						}

						// ! Knockback
						if (body.body) {
							const knockbackForce = damage.knockback.value * 5000
							const angle = Math.atan2(otherPosition.y - position.y, otherPosition.x - position.x)
							body.body.applyImpulse({ x: -Math.cos(angle) * knockbackForce, y: -Math.sin(angle) * knockbackForce }, true)
						}

						ECS.eventBus.publish(ECSEVENTS.TAKE_DAMAGE, { entity, amount: damageAmount })
						// ! Damage number display
						DamageTextEntity(position, damageAmount, damage.crit)
						damage.destroyOnHit--
						if (damage.destroyOnHit === 0) otherEntity.destroy()
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
