import { ActiveEvents, Collider, ColliderDesc, RigidBody, RigidBodyDesc } from "@dimforge/rapier2d-compat";
import { Component, ECS } from "../Globals/ECS";
import { world } from "../Globals/Initialize";

interface bodyOptions {
	type?: 'dynamic' | 'fixed' | 'kinematicVelocityBased'
	moveForce?: number
	mass?: number
}
interface colliderOptions {
	contact: boolean
	width: number
	height: number
	sensor?: boolean
}
class BodyComponent extends Component {
	body: RigidBody | null = null
	bodyDescription: RigidBodyDesc
	collider: Collider | null = null
	colliderDescription: ColliderDesc
	moveForce: number
	sensor: boolean
	angle?: number
	width: number
	height: number
	constructor(bodyOptions: bodyOptions, colliderOptions: colliderOptions) {
		super()
		this.sensor = colliderOptions.sensor ?? false
		this.moveForce = bodyOptions.moveForce ?? 10
		//!Body
		this.bodyDescription =
			RigidBodyDesc[bodyOptions.type ?? 'dynamic']()
				.setAdditionalMass(1)
				.setCanSleep(false)
				.setCcdEnabled(true)
				.lockRotations()
		//!Collider
		this.width = colliderOptions.width
		this.height = colliderOptions.height
		this.colliderDescription =
			ColliderDesc
				.cuboid(colliderOptions.width / 2, colliderOptions.height / 2)
				.setDensity(bodyOptions.mass ?? 1000)
				.setSensor(this.sensor)

		if (colliderOptions.contact) {
			this.colliderDescription.setActiveEvents(ActiveEvents.COLLISION_EVENTS)
		}
	}
	contacts(fn: Function) {
		if (this.collider) {
			const touchCollider = (otherCollider: Collider) => {
				const entityId = otherCollider?.parent()?.userData as string
				const entity = ECS.getEntityById(entityId)
				fn(entity)
			}
			world.contactsWith(this.collider, touchCollider)
			world.intersectionsWith(this.collider, touchCollider)
		}
	}
	bind(id: string) {
		this.bodyDescription.setUserData(id)
	}
	destroy() {
		if (!this.body) return
		world.removeRigidBody(this.body)
	}
}
BodyComponent.register()
export default BodyComponent