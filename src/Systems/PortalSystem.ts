import { ECS, Entity, System } from "../Globals/ECS";

import BodyComponent from "../Components/BodyComponent";
import COLLISIONGROUPS from "../Constants/CollisionGroups";
import { ECSEVENTS } from "../Constants/Events";
import MapState from "../GameStates/MapState";
import PortalComponent from "../Components/PortalComponent";
import TransitionEntity from "../UIEntities/TransitionEntity";
import { engine } from "../Globals/Initialize";

class PortalSystem extends System {
	constructor() {
		super(PortalComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const body = entity.getComponent(BodyComponent)
			body.contacts(entity => {
				ECS.eventBus.publish(ECSEVENTS.REMOVE_WALL, { entity, deleteLoot: true })
			}, COLLISIONGROUPS.SENSOR, [COLLISIONGROUPS.WALL])
			body.contacts(() => {
				TransitionEntity(60, () => {
					engine.setState(MapState)
				})
			}, COLLISIONGROUPS.PORTAL, [COLLISIONGROUPS.PLAYER])
		})
	}
}
export default PortalSystem
