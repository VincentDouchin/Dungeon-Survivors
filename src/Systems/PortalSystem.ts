import { ECS, Entity, System } from "../Globals/ECS";

import BodyComponent from "../Components/BodyComponent";
import COLLISIONGROUPS from "../Constants/CollisionGroups";
import { ECSEVENTS } from "../Constants/Events";
import Engine from "../Globals/Engine";
import { GameStates } from "../Constants/GameStates";
import PortalComponent from "../Components/PortalComponent";

class PortalSystem extends System {
	constructor() {
		super(PortalComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const body = entity.getComponent(BodyComponent)
			body.contacts(entity => {
				ECS.eventBus.publish(ECSEVENTS.REMOVE_WALL, entity)
			}, COLLISIONGROUPS.SENSOR, [COLLISIONGROUPS.WALL])
			body.contacts(entity => {
				Engine.setState(GameStates.map)
			}, COLLISIONGROUPS.PORTAL, [COLLISIONGROUPS.PLAYER])
		})
	}
}
export default PortalSystem