import BodyComponent from "../Components/BodyComponent";
import DamageComponent from "../Components/DamageComponent";
import HealthComponent from "../Components/HealthComponent";
import MeshComponent from "../Components/MeshComponent";
import { Entity, System } from "../Globals/ECS";

class HealthSystem extends System {
	constructor() {
		super(HealthComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const health = entity.getComponent(HealthComponent)
			const sprite = entity.getComponent(MeshComponent)
			const body = entity.getComponent(BodyComponent)
			if (!health.mesh.parent && sprite) {
				health.mesh.scale.x = sprite.width / health.width
				sprite.mesh.add(health.mesh)
				health.mesh.position.set(0, sprite.width / 2, 0)
			}
			if (body) {
				body.contacts((otherEntity: Entity) => {
					const damage = otherEntity.getComponent(DamageComponent)
					if (damage.target != health.type) {
						health.updateHealth(-damage.amount)
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