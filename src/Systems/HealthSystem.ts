import BodyComponent from "../Components/BodyComponent";
import DamageComponent from "../Components/DamageComponent";
import HealthComponent from "../Components/HealthComponent";
import MeshComponent from "../Components/MeshComponent";
import Coroutines from "../Globals/Coroutines";
import { Entity, System } from "../Globals/ECS";
import waitFor from "../Utils/WaitFor";

class HealthSystem extends System {
	constructor() {
		super(HealthComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const health = entity.getComponent(HealthComponent)
			const mesh = entity.getComponent(MeshComponent)
			const body = entity.getComponent(BodyComponent)
			if (!health.mesh.parent && mesh) {
				health.mesh.scale.x = mesh.width / health.width
				mesh.mesh.add(health.mesh)
				health.mesh.position.set(0, mesh.width / 2, 0)
			}
			if (body) {
				body.contacts((otherEntity: Entity) => {
					const damage = otherEntity.getComponent(DamageComponent)
					if (damage.target != health.type) {
						health.updateHealth(-damage.amount)
						if (mesh) {
							mesh.uniforms.uColor.value.x = 0.7
							Coroutines.add(function* () {
								yield* waitFor(10)
								mesh.uniforms.uColor.value.x = 0

							})
						}

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