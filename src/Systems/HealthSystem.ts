import BodyComponent from "../Components/BodyComponent";
import DamageComponent from "../Components/DamageComponent";
import HealthComponent from "../Components/HealthComponent";
import MeshComponent from "../Components/MeshComponent";
import PositionComponent from "../Components/PositionComponent";
import SkillsComponent from "../Components/SkillsComponent";
import TextComponent from "../Components/TextComponent";
import Coroutines from "../Globals/Coroutines";
import { Entity, System } from "../Globals/ECS";
import { assets } from "../Globals/Initialize";
import waitFor from "../Utils/WaitFor";

const empty = assets.UI['healthBar']

class HealthSystem extends System {
	constructor() {
		super(HealthComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const health = entity.getComponent(HealthComponent)
			const mesh = entity.getComponent(MeshComponent)
			const body = entity.getComponent(BodyComponent)
			// const animation = entity.getComponent(AnimationComponent)

			if (health.show && !health.healthBarId && mesh) {
				const healthBarEntity = new Entity()
				const healthMesh = new MeshComponent(empty.clone(), { renderOrder: 20 })
				entity.addChildren(healthBarEntity)
				healthBarEntity.addComponent(healthMesh)
				health.healthBarId = healthBarEntity.id
				mesh.mesh.add(healthMesh.mesh)
				healthMesh.mesh.position.y = mesh.height / 2
				health.updateHealth(0)
			}
			if (body && health.canTakeDamage) {
				body.contacts((otherEntity: Entity) => {

					const damage = otherEntity.getComponent(DamageComponent)
					if (damage.target.includes(health.type)) {
						const position = entity.getComponent(PositionComponent)
						const skill = otherEntity.getRecursiveComponent(SkillsComponent)

						const damageAmount = skill ? skill.calculateDamage(damage.amount) : damage.amount
						health.updateHealth(-damageAmount)
						const damageText = new Entity()

						damageText.addComponent(new PositionComponent(position.x, position.y))
						damageText.addComponent(new MeshComponent(assets.UI.empty))
						damageText.addComponent(new TextComponent(String(damageAmount * -1), { size: 8, color: skill?.crit ? 0xff0000 : 0xffffff }))
						damage.destroyOnHit--
						if (damage.destroyOnHit === 0) otherEntity.destroy()
						// if (animation && damage.amount > 0) {
						// 	mesh.material.emissive = new Color(0xff0000)
						// 	mesh.material.emissiveIntensity = 0.5
						// 	mesh.material.combine = MixOperation
						// }
						health.canTakeDamage = false
						Coroutines.add(function* () {
							yield* waitFor(20)
							health.canTakeDamage = true
							damageText.destroy()
							// if (animation) {
							// 	mesh.modifier = 'buffer'

							// }
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