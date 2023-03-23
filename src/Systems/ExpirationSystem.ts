import { Entity, System } from '../Globals/ECS'

import { ECSEVENTS } from '../Constants/Events'
import ExpirationComponent from '../Components/ExpirationComponent'

class ExpirationSystem extends System {
	skipEntities = new Set<Entity>()
	constructor() {
		super(ExpirationComponent)
		this.subscribe(ECSEVENTS.DELETE_ENTITY, (entity) => {
			this.skipEntities.add(entity)
		})
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			if (this.skipEntities.has(entity)) return
			const timer = entity.getComponent(ExpirationComponent)
			timer.timer--
			if (timer.timer === 0) {
				entity.destroy()
			}
		})
		this.skipEntities.clear()
	}
}
export default ExpirationSystem