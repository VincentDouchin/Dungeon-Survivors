import { ActiveEvents, Collider, ColliderDesc, RigidBody, RigidBodyDesc } from "@dimforge/rapier2d-compat";
import { Component, ECS } from "../Globals/ECS";
import { world } from "../Globals/Initialize";

class BodyComponent extends Component {
	body: RigidBody | null = null
	bodyDescription: RigidBodyDesc
	colliders: Collider[] = []
	colliderDescriptions: ColliderDesc[]
	moveForce: number
	constructor(bodyOptions: bodyOptions, colliderOptions: colliderOptions[]) {
		super()

		this.moveForce = bodyOptions.moveForce ?? 10
		//!Body
		this.bodyDescription =
			RigidBodyDesc[bodyOptions.type ?? 'dynamic']()
				.setAdditionalMass(1)
				.setCanSleep(false)
				.setCcdEnabled(true)
				.lockRotations()

		//!Collider
		this.colliderDescriptions = colliderOptions.map(colliderOption => {
			const colliderDescription = ColliderDesc

				.cuboid(colliderOption.width / 2, colliderOption.height / 2)
				.setDensity(colliderOption.mass ?? 1000)
				.setSensor(colliderOption.sensor ?? false)
				.setCollisionGroups(colliderOption.group * 0x10000 + colliderOption.canCollideWith.reduce((acc, group) => acc + group, 0))

			if (colliderOption.contact) {
				colliderDescription.setActiveEvents(ActiveEvents.COLLISION_EVENTS)
			}
			return colliderDescription
		})
	}
	contacts(fn: Function, group?: number) {
		if (Object.keys(this.colliders).length) {
			this.colliders.forEach((collider) => {
				if (group && Math.floor(collider.collisionGroups() / 0x10000) != group) return

				const touchCollider = (otherCollider: Collider) => {
					const entityId = otherCollider?.parent()?.userData as string
					const entity = ECS.getEntityById(entityId)

					fn(entity)
				}
				world.contactsWith(collider, touchCollider)
				world.intersectionsWith(collider, touchCollider)
			})
		}
	}
	bind(id: string) {
		this.bodyDescription.setUserData(id)
	}
	destroy() {
		if (!this.body) return
		world.removeRigidBody(this.body)
		if (this.colliders.length) return
		this.colliders.forEach(collider => {
			world.removeCollider(collider, false)
		})
	}
}
BodyComponent.register()
export default BodyComponent