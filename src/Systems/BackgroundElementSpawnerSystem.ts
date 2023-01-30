import { Entity, System } from "../Globals/ECS";

import BackgroundElementsComponent from "../Components/BackgroundElementsComponent";
import { camera } from "../Globals/Initialize";

class BackgroundElementSpawnerSystem extends System {
	constructor() {
		super(BackgroundElementsComponent)
	}
	update(entities: Entity[]): void {
		entities.forEach(entity => {
			const { size, elements, noise, entities } = entity.getComponent(BackgroundElementsComponent)
			for (let x = camera.left + camera.position.x - size; x < camera.right + camera.position.x + size; x += size) {
				for (let y = camera.bottom + camera.position.y - size; y < camera.top + camera.position.y + size; y += size) {
					const chunkX = Math.floor(x / size)
					const chunkY = Math.floor(y / size)
					const noiseValue = noise(chunkX, chunkY)
					if (Math.abs(noiseValue) > 0.6) {
						const newNoise = noise(chunkX + noiseValue, chunkY + noiseValue)
						const element = elements[Math.floor((newNoise + 1) / 2 * elements.length)]
						if (!entities[`${chunkX}|${chunkY}`]) {
							entities[`${chunkX}|${chunkY}`] = element(chunkX * size, chunkY * size, newNoise)
						}
					}
				}


			}
		})
	}
}
export default BackgroundElementSpawnerSystem