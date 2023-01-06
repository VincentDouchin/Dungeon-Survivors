import MeshComponent from "../Components/MeshComponent";
import PositionComponent from "../Components/PositionComponent";
import RotationComponent from "../Components/RotationComponent";
import TextComponent from "../Components/TextComponent";
import UIPosition from "../Components/UIPosition";
import { Entity, System } from "../Globals/ECS";
import { scene, UICamera, UIScene } from "../Globals/Initialize";

class RenderingSystem extends System {
	constructor() {
		super(MeshComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const mesh = entity.getComponent(MeshComponent)
			const position = entity.getComponent(PositionComponent)
			const rotation = entity.getComponent(RotationComponent)
			const text = entity.getComponent(TextComponent)
			const uiPosition = entity.getComponent(UIPosition)

			if (uiPosition) {
				const parentMesh = entity.parent?.getComponent(MeshComponent)

				const parentWidth = parentMesh ? parentMesh?.width / 2 : UICamera.right
				const parentHeight = parentMesh ? parentMesh?.height / 2 : UICamera.top
				const x = uiPosition.relativePosition.x * parentWidth - mesh.width / 2 * uiPosition.center.x
				const y = uiPosition.relativePosition.y * parentHeight - mesh.height / 2 * uiPosition.center.y
				mesh.mesh.position.set(x, y, 0)
				mesh.renderOrder = 1


				if (mesh && !mesh?.mesh.parent) {
					const destination = parentMesh?.mesh ?? UIScene
					destination.add(mesh.mesh)
				}

			}
			if (mesh && position) {

				if (!mesh.mesh.parent) {
					scene.add(mesh.mesh)
				}
				mesh.mesh.position.set(position.x, position.y, 0)
			}
			if (mesh && mesh.mesh.parent && text) {
				mesh.mesh.add(text.mesh)
				text.mesh.renderOrder = (mesh.renderOrder ?? 0) + 1
			}
			if (rotation) {
				mesh.mesh.rotation.z = rotation.rotation + Math.PI / 2
			}
			mesh.mesh.renderOrder = mesh.renderOrder
		})
	}
}
export default RenderingSystem