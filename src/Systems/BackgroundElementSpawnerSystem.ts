import { Entity, System } from "../Globals/ECS";

import BackgroundElementsComponent from "../Components/BackgroundElementsComponent";
import LootableEntity from "../Entities/LootableEntity";
import ObstableEntity from "../Entities/ObstacleEntity";
import PositionComponent from "../Components/PositionComponent";
import { camera } from "../Globals/Initialize";

class BackgroundElementSpawnerSystem extends System {
	constructor() {
		super(BackgroundElementsComponent)
	}
	update(entities: Entity[]): void {
		entities.forEach(entity => {
			const backgroundElements = entity.getComponent(BackgroundElementsComponent)
			const { size, obstacles, noise, obstaclesEntities, obstaclesDensity, effect, effectDelay, lootables, } = backgroundElements
			if (effect && effectDelay) {
				if (backgroundElements.effectsTimer < 0) {
					entity.addChildren(effect())
					backgroundElements.effectsTimer = effectDelay()
				}
				backgroundElements.effectsTimer--
			}
			for (const [key, obstacle] of Object.entries(obstaclesEntities)) {
				const position = obstacle.getComponent(PositionComponent)
				if (!position) continue
				if (position.x > camera.position.x + camera.right * 2 || position.x < camera.position.x + camera.left * 2 || position.y > camera.position.y + camera.top * 2 || position.y < camera.position.y + camera.bottom * 2) {
					delete obstaclesEntities[key]
					obstacle.destroy()
				}
			}
			for (let x = camera.left + camera.position.x - size; x < camera.right + camera.position.x + size; x += size) {
				for (let y = camera.bottom + camera.position.y - size; y < camera.top + camera.position.y + size; y += size) {

					const chunkX = Math.floor(x / size)
					const chunkY = Math.floor(y / size)
					const noiseValue = noise(chunkX, chunkY)
					if (Math.abs(noiseValue) > (1 - obstaclesDensity)) {
						const newNoise = noise(chunkX + noiseValue, chunkY + noiseValue)
						const getRandom = (arr: any[]) => arr[Math.floor(Math.abs(newNoise) / 0.84 * arr.length)]
						if (!obstaclesEntities[`${chunkX}|${chunkY}`]) {
							const obstacleEntity = Math.abs(noise(newNoise, obstaclesDensity)) > 0.3 ? ObstableEntity(getRandom(obstacles)) : LootableEntity(getRandom(lootables))
							const obstacle = obstacleEntity(chunkX * size, chunkY * size)
							obstaclesEntities[`${chunkX}|${chunkY}`] = obstacle
							entity.addChildren(obstacle)
						}
					}
				}
			}
		})
	}
}
export default BackgroundElementSpawnerSystem