import { ECS, Entity, System } from "../Globals/ECS";
import { easeOutBack, easeOutExpo } from "../Utils/Tween";

import BarShader from "../Shaders/BarShader";
import BodyComponent from "../Components/BodyComponent";
import ColorShader from "../Shaders/ColorShader";
import Coroutine from "../Globals/Coroutine";
import DamageComponent from "../Components/DamageComponent";
import DissolveShader from "../Shaders/DissolveShader";
import { ECSEVENTS } from "../Constants/Events";
import ExpirationComponent from "../Components/ExpirationComponent";
import HealthComponent from "../Components/HealthComponent";
import ParticleEntity from "../Entities/ParticleEntitty";
import PositionComponent from "../Components/PositionComponent";
import SpriteComponent from "../Components/SpriteComponent";
import TextComponent from "../Components/TextComponent";
import Tile from "../Utils/Tile";
import assets from "../Globals/Assets";
import { soundManager } from "../Globals/Initialize";
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

						// ! Take damage
						const damageAmount = damage.calculateDamage(health.defense.value)
						health.updateHealth(-damageAmount)
						if (damage.sound) {
							soundManager.play(damage.sound).play()
						}
						if (health.sound) {
							soundManager.play(health.sound).play()
						}
						// ! Knockback
						if (body.body) {
							const knockbackForce = damage.knockback.value * 5000
							const angle = Math.atan2(otherPosition.y - position.y, otherPosition.x - position.x)
							body.body.applyImpulse({ x: -Math.cos(angle) * knockbackForce, y: -Math.sin(angle) * knockbackForce }, true)
						}


						// ! Damage number display
						const damageText = new Entity('damageText')
						ECS.eventBus.publish(ECSEVENTS.ADD_TO_BACKGROUND, damageText)
						const textPosition = damageText.addComponent(new PositionComponent(position.x, position.y))
						damageText.addComponent(new SpriteComponent(Tile.empty()))
						damageText.addComponent(new ExpirationComponent(120))
						const textSprite = damageText.addComponent(new TextComponent(String(Number((damageAmount * -1).toFixed(1))), { size: 8, color: damage?.crit ? 0xff0000 : 0xffffff, outlineWidth: 0.5, }))
						new Coroutine(function* (counter) {
							counter++
							textPosition.y = easeOutBack(counter, textPosition.y, textPosition.y + 1, 120)
							textSprite.mesh.fillOpacity = easeOutExpo(counter, 2, 0, 120)
							textSprite.mesh.outlineOpacity = easeOutExpo(counter, 2, 0, 120)
							yield

						}, 120)
						damage.destroyOnHit--
						if (damage.destroyOnHit === 0) otherEntity.destroy()
						if (sprite && damage.amount.value > 0) {

							new Coroutine(function* () {
								health.canTakeDamage = false
								sprite.addShader(new ColorShader(1, 0, 0, 1))
								yield* waitFor(30)
								if (sprite) {
									sprite.removeShader(ColorShader)
								}
								health.canTakeDamage = true
								return
							})
						}
						if (sprite && damage.amount.value < 0) {
							ParticleEntity(entity, assets.magic.healing, { duration: 3, color: [0.9, 1, 0, 1] })
						}



					}
				})
			}
			if (health.health === 0) {
				const deathAnimation = new Entity('death animation')
				deathAnimation.addComponent(position)
				deathAnimation.addComponent(sprite)
				deathAnimation.addComponent(new ExpirationComponent(120))
				sprite.removeShader(ColorShader)
				sprite.addShader(new ColorShader(1, 1, 1, 1))
				new Coroutine(function* () {
					for (let i = 1; i > 0; i -= 1 / 50) {
						yield
						if (sprite.getUniforms(ColorShader)?.color?.value) {
							sprite.getUniforms(ColorShader).color.value = [1, 1, 1, i]
						} else {
							break
						}
					}
				})


				sprite.addShader(new DissolveShader(120))
				entity.destroy()

			}
		})
		console.log(t)
	}

}
export default HealthSystem