import { ActiveEvents, Collider, ColliderDesc, RigidBody, RigidBodyDesc } from "@dimforge/rapier2d-compat";
import { Component, ECS } from "../Globals/ECS";
import { world } from "../Globals/Initialize";

interface bodyOptions {
	type?: 'dynamic' | 'fixed'
	moveForce?: number
}
interface colliderOptions {
	contact: boolean
	width: number
	height: number
	sensor?: boolean
}
class BodyComponent extends Component {
	body: RigidBody
	collider: Collider
	moveForce: number
	sensor: boolean
	constructor(bodyOptions: bodyOptions, colliderOptions: colliderOptions) {
		super()
		this.sensor = colliderOptions.sensor ?? false
		this.moveForce = bodyOptions.moveForce ?? 10
		//!Body
		const bodyDescription = RigidBodyDesc[bodyOptions.type ?? 'dynamic']()
		bodyDescription
			.setAdditionalMass(1)
			.setCanSleep(false)
			.setCcdEnabled(true)
		this.body = world.createRigidBody(bodyDescription)
		//!Collider
		const colliderDescription =
			ColliderDesc
				.cuboid(colliderOptions.width / 2, colliderOptions.height / 2)
				.setDensity(1000)
				.setSensor(this.sensor)
		if (colliderOptions.contact) {
			colliderDescription.setActiveEvents(ActiveEvents.COLLISION_EVENTS)
		}
		// .setActiveCollisionTypes(ActiveCollisionTypes.DEFAULT | ActiveCollisionTypes.KINEMATIC_FIXED)
		this.collider = world.createCollider(colliderDescription, this.body)
	}
	contacts(fn: Function) {
		const touchCollider = (otherCollider: Collider) => {
			const entityId = otherCollider?.parent()?.userData as string
			const entity = ECS.getEntityById(entityId)
			fn(entity)
		}
		world.contactsWith(this.collider, touchCollider)
		world.intersectionsWith(this.collider, touchCollider)
	}
	bind(id: string) {
		this.body.userData = id
	}
}
BodyComponent.register()
export default BodyComponent