import { MultiplyBlending, CanvasTexture, CircleGeometry, Mesh, MeshBasicMaterial } from "three";
import LightComponent from "../Components/LightComponent";
import PositionComponent from "../Components/PositionComponent";
import { Entity, System } from "../Globals/ECS";
import { lightScene } from "../Globals/Initialize";
import getBuffer from "../Utils/Buffer";



class LightingSystem extends System {
	constructor() {
		super(LightComponent)
	}
	update(entities: Entity[]): void {
		entities.forEach(entity => {
			const light = entity.getComponent(LightComponent)
			const position = entity.getComponent(PositionComponent)

			if (!light.lightId && position) {

				const buffer = getBuffer(light.distance, light.distance)
				const center = light.distance / 2
				const gradient = buffer.createRadialGradient(center, center, 50, center, center, 30)
				gradient.addColorStop(0, "white")
				// gradient.addColorStop(0.8, "black")
				gradient.addColorStop(0.9, "black")

				buffer.fillStyle = gradient
				buffer.fillRect(0, 0, light.distance, light.distance)
				const lightMesh = new Mesh(
					new CircleGeometry(light.distance),
					new MeshBasicMaterial({ map: new CanvasTexture(buffer.canvas), transparent: true, blending: MultiplyBlending })
				)
				lightScene.add(lightMesh)
				lightMesh.position.set(position.x, position.y, 0)
				light.lightId = lightMesh.id
			}
			if (light.lightId && position) {
				lightScene.getObjectById(light.lightId)?.position.set(position.x, position.y, 0)
			}
		})
	}
}
export default LightingSystem
