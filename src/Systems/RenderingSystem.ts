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

			if (mesh && !mesh?.mesh.parent && uiPosition) {
				const parentMesh = entity.parent?.getComponent(MeshComponent)
				const destination = parentMesh?.mesh ?? UIScene
				const parentWidth = parentMesh ? parentMesh?.width / 2 : UICamera.right
				const parentHeight = parentMesh ? parentMesh?.height / 2 : UICamera.bottom
				destination.add(mesh.mesh)
				mesh.mesh.position.set(
					uiPosition.relativePosition.x * parentWidth - mesh.width / 2 * uiPosition.center.x,
					uiPosition.relativePosition.y * parentHeight + mesh.height / 2 * uiPosition.center.y,
					0
				)
				mesh.renderOrder = 1

				if (text) {
					mesh.mesh.add(text.mesh)
					text.mesh.renderOrder = mesh.renderOrder + 1
				}

			}

			if (mesh && position) {

				if (!mesh.mesh.parent) {
					scene.add(mesh.mesh)
				}
				mesh.mesh.position.set(position.x, position.y, 0)
			}
			if (rotation) {
				mesh.mesh.rotation.z = rotation.rotation + Math.PI / 2
			}


			mesh.mesh.renderOrder = mesh.renderOrder
			// mesh.mesh.scale.set(mesh.scale, mesh.scale, 1)
		})
	}
}
export default RenderingSystem