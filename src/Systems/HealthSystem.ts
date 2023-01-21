import BodyComponent from "../Components/BodyComponent";
import DamageComponent from "../Components/DamageComponent";
import HealthComponent from "../Components/HealthComponent";
import PositionComponent from "../Components/PositionComponent";
import SkillsComponent from "../Components/SkillsComponent";
import SpriteComponent from "../Components/SpriteComponent";
import TextComponent from "../Components/TextComponent";
import Coroutines from "../Globals/Coroutines";
import { Entity, System } from "../Globals/ECS";
import { assets } from "../Globals/Initialize";
import BarShader from "../Shaders/BarShader";
import ColorShader from "../Shaders/ColorShader";
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
			// const animation = entity.getComponent(AnimationComponent)

			if (health.show && !health.healthBarId && sprite) {
				const healthBarEntity = new Entity()
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
						const position = entity.getComponent(PositionComponent)
						const otherPosition = otherEntity.getComponent(PositionComponent)
						const skill = otherEntity.getRecursiveComponent(SkillsComponent)

						// ! Take damage
						const damageAmount = skill ? skill.calculateDamage(damage.amount) : damage.amount
						health.updateHealth(-damageAmount)
						health.canTakeDamage = false

						// ! Knockback
						if (body.body) {
							const knockbackForce = damage.knockback * (skill?.knockback ?? 1) * 1000
							const angle = Math.atan2(otherPosition.y - position.y, otherPosition.x - position.x)
							body.body.applyImpulse({ x: -Math.cos(angle) * knockbackForce, y: -Math.sin(angle) * knockbackForce }, true)
						}


						// ! Damage number display
						const damageText = new Entity()
						damageText.addComponent(new PositionComponent(position.x, position.y))
						damageText.addComponent(new SpriteComponent(assets.UI.empty))
						damageText.addComponent(new TextComponent(String(damageAmount * -1), { size: 8, color: skill?.crit ? 0xff0000 : 0xffffff }))

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
				entity.destroy()
			}
		})
	}

}
export default HealthSystem