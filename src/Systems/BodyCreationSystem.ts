import { JointData } from "@dimforge/rapier2d-compat";
import BodyComponent from "../Components/BodyComponent";
import PositionComponent from "../Components/PositionComponent";
import { System, Entity, ECS } from "../Globals/ECS";
import { world } from "../Globals/Initialize";
import RotationComponent from "../Components/RotationComponent";
import JointComponent from "../Components/JointComponent";

class BodyCreationSystem extends System {
	constructor() {
		super(BodyComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const body = entity.getComponent(BodyComponent)
			const position = entity.getComponent(PositionComponent)
			const joint = entity.getComponent(JointComponent)
			const rotation = entity.getComponent(RotationComponent)
			if (!body.body && position) {
				body.bodyDescription.setTranslation(position.x, position.y)
				body.body = world.createRigidBody(body.bodyDescription)
				if (rotation) body.body.setRotation(rotation.rotation, true)
			}
			if (!body.colliders.length && body.body) {
				body.colliders = body.colliderDescriptions.map(colliderDescription => world.createCollider(colliderDescription, body.body!))
			}

			if (joint && !joint?.jointed && body.body && joint.parentId) {
				const ownerBody = ECS.getEntityById(joint.parentId).getComponent(BodyComponent)

				if (!ownerBody.body) return
				const getParams = () => {
					switch (joint.type) {
						case 'revolute': {
							return JointData.revolute({ x: 0.0, y: 0.0 }, { x: joint.distance, y: 0 })
						}; break
						case 'prismatic': {
							const params = JointData.prismatic({ x: 0.0, y: 0.0 }, { x: 0.0, y: 0.0 }, { x: 1.0, y: 1.0 })
							params.limitsEnabled = true
							params.limits = [30, 60]
							return params
						}
					}
				}

				// // return joint
				// const params = joint.type == 'revolute' 
				// 	?JointData.revolute({ x: 0.0, y: 0.0 }, { x: 0, y: 0 })
				// 	:JointData.fixed
				world.createImpulseJoint(getParams(), ownerBody.body, body.body, true)
				joint.jointed = true
			}


		})
	}
}
export default BodyCreationSystem