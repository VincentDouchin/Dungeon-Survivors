import { Entity, System } from "../Globals/ECS";
import { UICamera, UIScene, scene } from "../Globals/Initialize";

import PositionComponent from "../Components/PositionComponent";
import RotationComponent from "../Components/RotationComponent";
import ShadowComponent from "../Components/ShadowComponent";
import SpriteComponent from "../Components/SpriteComponent";
import TextComponent from "../Components/TextComponent";
import UIPosition from "../Components/UIPosition";

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
			const shadow = entity.getComponent(ShadowComponent)
			if (position) {
				if (!sprite.mesh.parent) {
					scene.add(sprite.mesh)
				}
				sprite.mesh.position.set(position.x, position.y, 0)
			}
			if (uiPosition) {
				const parentSprite = entity.parent?.getComponent(SpriteComponent)
				const parentWidth = parentSprite ? (parentSprite?.scaledWidth) / 2 : UICamera.right
				const parentHeight = parentSprite ? parentSprite?.scaledHeight / 2 : UICamera.top
				const x = uiPosition.relativePosition.x * parentWidth - sprite.scaledWidth / 2 * uiPosition.center.x
				const y = uiPosition.relativePosition.y * parentHeight - sprite.scaledHeight / 2 * uiPosition.center.y
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
			if (shadow && !shadow.entityId) {
				const shadowEntity = new Entity()
				shadowEntity.addComponent(new PositionComponent(position.x, position.y - shadow.offset))
				shadow.entityId = shadowEntity.id
			}
			sprite.material.opacity = sprite.opacity
			sprite.mesh.renderOrder = sprite.renderOrder
		})
	}
}
export default RenderSystem