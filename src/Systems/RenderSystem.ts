import SpriteComponent from "../Components/SpriteComponent";
import { Entity, System } from "../Globals/ECS";
import { scene } from "../Globals/Initialize";

class RenderSystem extends System {
	constructor() {
		super(SpriteComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const sprite = entity.getComponent(SpriteComponent)
			sprite.render()
			if (!sprite.mesh.parent) {
				scene.add(sprite.mesh)
			}
		})
	}
}
export default RenderSystem