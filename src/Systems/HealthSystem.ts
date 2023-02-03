import { Entity, System } from "../Globals/ECS";

import BarShader from "../Shaders/BarShader";
import BodyComponent from "../Components/BodyComponent";
import ColorShader from "../Shaders/ColorShader";
import Coroutines from "../Globals/Coroutines";
import DamageComponent from "../Components/DamageComponent";
import HealthComponent from "../Components/HealthComponent";
import ParticleEntity from "../Entities/ParticleEntitty";
import PositionComponent from "../Components/PositionComponent";
import SpriteComponent from "../Components/SpriteComponent";
import StatsComponent from "../Components/StatsComponent";
import TextComponent from "../Components/TextComponent";
import { assets } from "../Globals/Initialize";
import waitFor from "../Utils/WaitFor";

const empty = assets.UI['healthBar']
const full = assets.UI['healthFull']

class HealthSystem extends System {
	constructor() {
		super(HealthComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const health = entity.getComponent(HealthComponent)
			const sprite = entity.getComponent(SpriteComponent)
			const body = entity.getComponent(BodyComponent)
			const stats = entity.getComponent(StatsComponent)
			const position = entity.getComponent(PositionComponent)

			if (health.show && !health.healthBarId && sprite) {
				const healthBarEntity = new Entity('healthBar')
				const healthMesh = new SpriteComponent(empty, { renderOrder: 20, shaders: [new BarShader(full.texture)] })
				entity.addChildren(healthBarEntity)
				healthBarEntity.addComponent(healthMesh)
				health.healthBarId = healthBarEntity.id
				sprite.mesh.add(healthMesh.mesh)
				healthMesh.mesh.position.y = sprite.height / 2
				health.updateHealth(0)
			}
			if (body && health.canTakeDamage) {
				body.contacts((otherEntity: Entity) => {

					const damage = otherEntity.getComponent(DamageComponent)
					if (damage.target.includes(health.type)) {
						const otherPosition = otherEntity.getComponent(PositionComponent)
						const otherStats = otherEntity.getRecursiveComponent(StatsComponent)

						// ! Take damage
						const damageAmount = otherStats ? otherStats.calculateDamage(damage.amount, stats?.defense) : damage.amount
						health.updateHealth(-damageAmount)
						health.canTakeDamage = false

						// ! Knockback
						if (body.body) {
							const knockbackForce = damage.knockback * (otherStats?.knockback ?? 1) * 5000
							const angle = Math.atan2(otherPosition.y - position.y, otherPosition.x - position.x)
							body.body.applyImpulse({ x: -Math.cos(angle) * knockbackForce, y: -Math.sin(angle) * knockbackForce }, true)
						}


						// ! Damage number display
						const damageText = new Entity('damageText')
						damageText.addComponent(new PositionComponent(position.x, position.y))
						damageText.addComponent(new SpriteComponent(assets.UI.empty))
						damageText.addComponent(new TextComponent(String(Number((damageAmount * -1).toFixed(1))), { size: 8, color: otherStats?.crit ? 0xff0000 : 0xffffff }))

						damage.destroyOnHit--
						if (damage.destroyOnHit === 0) otherEntity.destroy()
						if (sprite && damage.amount > 0) {
							sprite.addShader(new ColorShader(1, 0, 0, 1))
						}

						Coroutines.add(function* () {
							yield* waitFor(20)
							if (sprite) {
								sprite.removeShader(ColorShader)
							}
							health.canTakeDamage = true
							damageText.destroy()
						})

					}
				})
			}
			if (health.health == 0) {
				const blood = Object.values(assets.blood)
				ParticleEntity(position.x, position.y, blood[Math.floor(blood.length * Math.random())], { frameRate: 1 })
				entity.destroy()
			}
		})
	}

}
export default HealthSystem