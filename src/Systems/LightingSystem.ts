import { Color, PointLight } from "three";
import LightComponent from "../Components/LightComponent";
import PositionComponent from "../Components/PositionComponent";
import { Entity, System } from "../Globals/ECS";
import { scene } from "../Globals/Initialize";

class LightingSystem extends System {
	constructor() {
		super(LightComponent)
	}
	update(entities: Entity[]): void {
		entities.forEach(entity => {
			const light = entity.getComponent(LightComponent)
			const position = entity.getComponent(PositionComponent)
			if (!light.lightId && position) {
				const color = new Color(light.color)
				const lightObject = new PointLight(color, 12, light.distance)
				lightObject.position.set(0, 0, 15)
				scene.add(lightObject)

				light.lightId = lightObject.id
			}
			if (light.lightId && position) {
				scene.getObjectById(light.lightId)?.position.set(position.x, position.y, 15)
			}

		})
	}
}
export default LightingSystem
