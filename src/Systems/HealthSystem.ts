import BodyComponent from "../Components/BodyComponent";
import DamageComponent from "../Components/DamageComponent";
import HealthComponent from "../Components/HealthComponent";
import MeshComponent from "../Components/MeshComponent";
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
					if (damage.target.includes(health.type)) {
						health.updateHealth(-damage.amount)
						damage.destroyOnHit--
						if (damage.destroyOnHit === 0) otherEntity.destroy()
						if (mesh && damage.amount > 0) mesh.uniforms.uColor.value.x = 0.7
						health.canTakeDamage = false
						Coroutines.add(function* () {
							yield* waitFor(20)
							health.canTakeDamage = true
							if (mesh) mesh.uniforms.uColor.value.x = 0
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