import PositionComponent from "../Components/PositionComponent";
import RotationComponent from "../Components/RotationComponent";
import SpriteComponent from "../Components/SpriteComponent";
import TextComponent from "../Components/TextComponent";
import UIPosition from "../Components/UIPosition";
import { Entity, System } from "../Globals/ECS";
import { scene, UICamera, UIScene } from "../Globals/Initialize";

class RenderSystem extends System {
	constructor() {
		super(SpriteComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const sprite = entity.getComponent(SpriteComponent)
			const position = entity.getComponent(PositionComponent)
			const rotation = entity.getComponent(RotationComponent)
			const text = entity.getComponent(TextComponent)
			const uiPosition = entity.getComponent(UIPosition)
			if (position) {
				if (!sprite.mesh.parent) {
					scene.add(sprite.mesh)
				}
				sprite.mesh.position.set(position.x, position.y, 0)
			}
			if (uiPosition) {
				const parentSprite = entity.parent?.getComponent(SpriteComponent)

				const parentWidth = parentSprite ? parentSprite?.width / 2 : UICamera.right
				const parentHeight = parentSprite ? parentSprite?.height / 2 : UICamera.top
				const x = uiPosition.relativePosition.x * parentWidth - sprite.width / 2 * uiPosition.center.x
				const y = uiPosition.relativePosition.y * parentHeight - sprite.height / 2 * uiPosition.center.y
				sprite.mesh.position.set(x, y, 0)
				sprite.renderOrder = (parentSprite?.renderOrder ?? 1) + 1


				if (sprite && !sprite?.mesh.parent) {

					const destination = parentSprite?.mesh ?? UIScene
					destination.add(sprite.mesh)
				}

			}
			if (rotation) {
				sprite.mesh.rotation.z = rotation.rotation + Math.PI / 2
			}
			if (sprite && sprite.mesh.parent && text) {
				sprite.mesh.add(text.mesh)
				text.mesh.renderOrder = (sprite.renderOrder ?? 0) + 1
			}
			sprite.mesh.renderOrder = sprite.renderOrder
		})
	}
}
export default RenderSystem