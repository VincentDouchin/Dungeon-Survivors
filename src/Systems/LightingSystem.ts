import { AmbientLight, Color, PointLight } from 'three'

import type { Entity } from '../Globals/ECS'
import LightComponent from '../Components/LightComponent'
import PositionComponent from '../Components/PositionComponent'
import { System } from '../Globals/ECS'
import { lightScene } from '../Globals/Initialize'

class LightingSystem extends System {
	constructor() {
		super(LightComponent)
	}

	update(entities: Entity[]): void {
		entities.forEach((entity) => {
			const light = entity.getComponent(LightComponent)
			const position = entity.getComponent(PositionComponent)
			if (!light.lightId && position) {
				const color = new Color(light.color)
				const lightObject = light.type === PointLight
					? new PointLight(color, 1, light.distance, 1)
					: new AmbientLight(color)
				lightScene.add(lightObject)
				light.lightId = lightObject.id
			}
			if (light.lightId && position) {
				lightScene.getObjectById(light.lightId)?.position.set(position.x, position.y, 15)
			}
		})
	}
}
export default LightingSystem
