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
			if (!health.mesh.parent && sprite) {
				sprite.mesh.add(health.mesh)
			}
		})
	}
}
export default HealthSystem