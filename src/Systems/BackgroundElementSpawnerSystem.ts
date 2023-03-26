import type { Entity } from '../Globals/ECS'
import { System } from '../Globals/ECS'

import BackgroundElementsComponent from '../Components/BackgroundElementsComponent'
import DroppableComponent from '../Components/DroppableComponent'
import { camera } from '../Globals/Initialize'

class BackgroundElementSpawnerSystem extends System {
	constructor() {
		super(BackgroundElementsComponent)
	}

	update(entities: Entity[]): void {
		entities.forEach((entity) => {
			const backgroundElements = entity.getComponent(BackgroundElementsComponent)
			const { size, effect, effectDelay, obstaclesMap } = backgroundElements
			if (effect && effectDelay) {
				if (backgroundElements.effectsTimer < 0) {
					entity.addChildren(effect())
					backgroundElements.effectsTimer = effectDelay()
				}
				backgroundElements.effectsTimer--
			}
			obstaclesMap.forEach((node) => {
				if (node.entity) {
					if (!node.position) return
					if (
						node.position.x > camera.position.x + camera.right * 2
						|| node.position.x < camera.position.x + camera.left * 2
						|| node.position.y > camera.position.y + camera.top * 2
						|| node.position.y < camera.position.y + camera.bottom * 2
					) {
						node.entity.removeComponent(DroppableComponent)
						node.entity.destroy()
						node.position = null
						node.entity = null
					}
				}
			})
			if (!size) return
			for (let x = camera.left + camera.position.x - size; x < camera.right + camera.position.x + size; x += size) {
				for (let y = camera.bottom + camera.position.y - size; y < camera.top + camera.position.y + size; y += size) {
					if (Math.abs(x) < 50 && Math.abs(y) < 50) continue
					const chunkX = Math.floor(x / size)
					const chunkY = Math.floor(y / size)
					const node = backgroundElements.getNode(chunkX, chunkY)
					if (!node) {
						backgroundElements.createNode(chunkX, chunkY)
					}
					if (node && node.obstacle && !node.entity && !node.destroyed) {
						const obstacle = backgroundElements.createEntity(chunkX, chunkY)
						if (obstacle) {
							entity.addChildren(obstacle)
						}
					}
				}
			}
		})
	}
}
export default BackgroundElementSpawnerSystem
