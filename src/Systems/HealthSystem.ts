import AnimationComponent from "../Components/AnimationComponent";
import BodyComponent from "../Components/BodyComponent";
import DamageComponent from "../Components/DamageComponent";
import HealthComponent from "../Components/HealthComponent";
import MeshComponent from "../Components/MeshComponent";
import PositionComponent from "../Components/PositionComponent";
import SkillsComponent from "../Components/SkillsComponent";
import TextComponent from "../Components/TextComponent";
import AssetManager from "../Globals/AssetManager";
import Coroutines from "../Globals/Coroutines";
import { Entity, System } from "../Globals/ECS";
import waitFor from "../Utils/WaitFor";

const empty = AssetManager.UI['healthBar']

class HealthSystem extends System {
	constructor() {
		super(HealthComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const health = entity.getComponent(HealthComponent)
			const mesh = entity.getComponent(MeshComponent)
			const body = entity.getComponent(BodyComponent)
			const animation = entity.getComponent(AnimationComponent)

			if (health.show && !health.healthBarId && mesh) {
				const healthBarEntity = new Entity()
				const healthMesh = new MeshComponent(empty.clone(), { renderOrder: 11 })

				healthBarEntity.addComponent(healthMesh)
				health.healthBarId = healthBarEntity.id
				mesh.mesh.add(healthMesh.mesh)
				healthMesh.mesh.position.y = mesh.height / 2
				health.updateHealth(0)
			}
			if (body && health.canTakeDamage) {
				body.contacts((otherEntity: Entity) => {

					const damage = otherEntity.getComponent(DamageComponent)
					const position = entity.getComponent(PositionComponent)
					if (damage.target.includes(health.type)) {
						const getSkill = (entity: Entity): SkillsComponent => entity.getComponent(SkillsComponent) ?? (entity.parent ? getSkill(entity.parent) : null)
						const skill = getSkill(otherEntity)

						const damageAmount = skill ? skill.calculateDamage(damage.amount) : damage.amount
						health.updateHealth(-damageAmount)
						const damageText = new Entity()

						damageText.addComponent(new PositionComponent(position.x, position.y))
						damageText.addComponent(new MeshComponent(AssetManager.UI.empty))
						damageText.addComponent(new TextComponent(String(damageAmount * -1), { size: 8, color: skill?.crit ? 0xff0000 : 0xffffff }))
						damage.destroyOnHit--
						if (damage.destroyOnHit === 0) otherEntity.destroy()
						if (animation && damage.amount > 0) {
							mesh.modifier = 'hurt'
						}
						health.canTakeDamage = false
						Coroutines.add(function* () {
							yield* waitFor(20)
							health.canTakeDamage = true
							damageText.destroy()
							if (animation) {
								mesh.modifier = 'buffer'

							}
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