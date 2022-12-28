import { JointData } from "@dimforge/rapier2d-compat";
import BodyComponent from "../Components/BodyComponent";
import PositionComponent from "../Components/PositionComponent";
import OrbiterComponent from "../Components/OrbiterComponent";
import { System, Entity } from "../Globals/ECS";
import { world } from "../Globals/Initialize";

class BodyCreationSystem extends System {
	constructor() {
		super(BodyComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const body = entity.getComponent(BodyComponent)
			const position = entity.getComponent(PositionComponent)
			const orbiter = entity.getComponent(OrbiterComponent)
			if (!body.body && position) {
				body.bodyDescription.setTranslation(position.x, position.y)
				body.body = world.createRigidBody(body.bodyDescription)
			}
			if (!body.colliders.length && body.body) {
				body.colliders = body.colliderDescriptions.map(colliderDescription => world.createCollider(colliderDescription, body.body!))
			}
			if (orbiter?.owner && !body.body) {
				const ownerPosition = orbiter.owner.getComponent(PositionComponent)
				entity.addComponent(new PositionComponent(ownerPosition.x, ownerPosition.y))
			}
			if (!orbiter?.joint && body.body && entity.parent) {
				const ownerBody = entity.parent.getComponent(BodyComponent)
				if (!ownerBody.body) return
				const params = JointData.revolute({ x: 0.0, y: 0.0 }, { x: orbiter.distance, y: 0 })
				orbiter.joint = world.createImpulseJoint(params, ownerBody.body, body.body, true)

			}


		})
	}
}
export default BodyCreationSystem