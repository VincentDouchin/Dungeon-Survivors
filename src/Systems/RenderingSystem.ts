import BodyComponent from "../Components/BodyComponent";
import LightComponent from "../Components/LightComponent";
import MeshComponent from "../Components/MeshComponent";
import PositionComponent from "../Components/PositionComponent";
import UIPosition from "../Components/UIPosition";
import WeaponControllerComponent from "../Components/WeaponControllerComponent";
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
			const body = entity.getComponent(BodyComponent)
			const weaponController = entity.getComponent(WeaponControllerComponent)
			const light = entity.getComponent(LightComponent)
			const uiPosition = entity.getComponent(UIPosition)
			if (mesh && !mesh?.mesh.parent && uiPosition) {

				UIScene.add(mesh.mesh)
				mesh.mesh.position.set(
					uiPosition.relativePosition.x * UICamera.right - mesh.width / 2 * uiPosition.center.x,
					uiPosition.relativePosition.y * UICamera.bottom + mesh.height / 2 * uiPosition.center.y,
					0
				)

			}
			if (mesh && position) {

				if (!mesh.mesh.parent) {
					scene.add(mesh.mesh)
				}
				mesh.mesh.position.set(position.x, position.y, 0)
			}
			if (weaponController?.owner && body.body) {
				mesh.mesh.rotation.z = body.body.rotation() + Math.PI / 2

			}
			if (light) {

				if (!light?.light.parent && position) {
					scene.add(light.light)
				}
				light.light.position.x = position.x
				light.light.position.y = position.y
				light.light.target = mesh.mesh

			}

			mesh.mesh.renderOrder = mesh.renderOrder
			// mesh.mesh.scale.set(mesh.scale, mesh.scale, 1)
		})
	}
}
export default RenderingSystem