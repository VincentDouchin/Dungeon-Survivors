import type { Entity } from '../Globals/ECS'
import { ECS, System } from '../Globals/ECS'

import ColorShader from '../Shaders/ColorShader'
import DroppableComponent from '../Components/DroppableComponent'
import { ECSEVENTS } from '../Constants/Events'
import EnemyEntity from '../Entities/EnemyEntity'
import MinionSpawnerComponent from '../Components/MinionSpawnerComponent'
import ParticleEntity from '../Entities/ParticleEntitty'
import PositionComponent from '../Components/PositionComponent'
import SpriteComponent from '../Components/SpriteComponent'
import StatsComponent from '../Components/StatsComponent'
import assets from '../Globals/Assets'

class MinionSpawnerSytem extends System {
	constructor() {
		super(MinionSpawnerComponent)
	}

	update(entities: Entity[]) {
		entities.forEach((entity) => {
			const minion = entity.getComponent(MinionSpawnerComponent)
			minion.timer++
			if (minion.timer === minion.delay) {
				const position = entity.getComponent(PositionComponent)
				const stats = entity.getComponent(StatsComponent)
				const angle = Math.random() * Math.PI * 2
				const minionPosition = { x: position.x + Math.cos(angle) * minion.distance, y: position.y + Math.sin(angle) * minion.distance }
				ParticleEntity(minionPosition, assets.effects.smoke, { scale: 0.5 }).then(() => {
					const minionEntity = EnemyEntity(minion.minion, stats)(minionPosition)
					minionEntity.removeComponent(DroppableComponent)
					minionEntity.getComponent(SpriteComponent).addShader(new ColorShader(0.3, 0.3, 0.3, 0, 'add'))
					ECS.eventBus.publish(ECSEVENTS.ADD_TO_ENCOUNTER, minionEntity)
				})
				minion.timer = 0
			}
		})
	}
}
export default MinionSpawnerSytem
