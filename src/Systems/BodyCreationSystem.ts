import { JointData } from '@dimforge/rapier2d'
import BodyComponent, { createCollider } from '../Components/BodyComponent'
import type { Entity } from '../Globals/ECS'
import JointComponent from '../Components/JointComponent'
import PositionComponent from '../Components/PositionComponent'
import RotationComponent from '../Components/RotationComponent'
import { System } from '../Globals/ECS'
import { world } from '../Globals/Initialize'
import XPPickerComponent from '../Components/XPPickerComponent'
import COLLISIONGROUPS from '../Constants/CollisionGroups'

class BodyCreationSystem extends System {
	constructor() {
		super(BodyComponent)
	}

	update(entities: Entity[]) {
		entities.forEach((entity) => {
			const body = entity.getComponent(BodyComponent)
			const position = entity.getComponent(PositionComponent)
			const joint = entity.getComponent(JointComponent)
			const rotation = entity.getComponent(RotationComponent)
			const xpPicker = entity.getComponent(XPPickerComponent)
			if (!body.body && position) {
				body.bodyDescription.setTranslation(position.x, position.y)
				body.body = world.createRigidBody(body.bodyDescription)
				if (rotation) body.body.setRotation(rotation.rotation, true)
			}
			if (!body.colliders.length && body.body) {
				const parentBody = body.body
				body.colliders = body.colliderDescriptions.map(colliderDescription => world.createCollider(colliderDescription, parentBody))
			}
			if (xpPicker && !xpPicker?.bodyCreated && body.body) {
				const xpPickerCollider = createCollider({ width: 100, height: 100, mass: 0, contact: true, sensor: true, group: COLLISIONGROUPS.SENSOR, canCollideWith: [COLLISIONGROUPS.XP] })
				body.colliders.push(world.createCollider(xpPickerCollider, body.body))
				xpPicker.bodyCreated = true
			}
			if (joint && !joint?.jointed && body.body && joint.parent) {
				const ownerBody = joint.parent.getComponent(BodyComponent)
				if (!ownerBody.body) return
				const getParams = () => {
					switch (joint.type) {
					case 'revolute': {
						return JointData.revolute({ x: 0.0, y: -8 }, joint.distance)
					}
					case 'fixed':{
						return JointData.fixed(joint.distance, 0, { x: 0.0, y: 0.0 }, 0)
					}
					case 'prismatic': {
						const params = JointData.prismatic({ x: 0.0, y: 0.0 }, { x: 0.0, y: 0.0 }, { x: 1.0, y: 1.0 })
						params.limitsEnabled = true
						params.limits = [30, 60]
						return params
					}
					}
				}
				world.createImpulseJoint(getParams(), ownerBody.body, body.body, true)
				joint.jointed = true
			}
		})
	}
}
export default BodyCreationSystem
