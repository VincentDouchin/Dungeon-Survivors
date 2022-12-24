import MeshComponent from "../Components/MeshComponent";
import PositionComponent from "../Components/PositionComponent";
import { Entity, System } from "../Globals/ECS";
import { scene } from "../Globals/Initialize";

class RenderingSystem extends System {
	constructor() {
		super(MeshComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const mesh = entity.getComponent(MeshComponent)
			const position = entity.getComponent(PositionComponent)
			if (mesh && position) {

				if (!mesh.mesh.parent) {
					scene.add(mesh.mesh)
				}
				mesh.mesh.position.set(position.x, position.y, 0)
			}
		})
	}
}
export default RenderingSystem