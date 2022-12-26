import ECSEVENTS from "../Constants/ECSEvents";
import { Component, ECS, Entity } from "../Globals/ECS";

class EntityCollectionComponent extends Component {
	entitiesId: string[] = []
	constructor(...entities: Entity[]) {
		super()
		entities.forEach(this.addEntity)
	}
	addEntity(entity: Entity) {
		this.entitiesId.push(entity.id)
		ECS.eventBus.subscribe(ECSEVENTS.DELETEENTITY, (id: string) => {
			if (this.entitiesId.includes(id)) {
				this.entitiesId.splice(this.entitiesId.indexOf(id), 1)
			}
		})
	}
	get entities() {
		return this.entitiesId.map(ECS.getEntityById)
	}
	destroy() {
		this.entitiesId.forEach(entityId => ECS.getEntityById(entityId).destroy())
	}
}
EntityCollectionComponent.register()
export default EntityCollectionComponent