import { ActiveEvents, ColliderDesc, RigidBodyDesc } from '@dimforge/rapier2d-compat'
import type { Collider, RigidBody } from '@dimforge/rapier2d-compat'
import { Vector2 } from 'three'
import { Component } from '../Globals/ECS'

import type { Entity } from '../Globals/ECS'
import { Stat } from '../Game/Stat'
import { world } from '../Globals/Initialize'
import { STATS } from '../Constants/Stats'

 interface bodyOptions {
	type?: 'dynamic' | 'fixed' | 'kinematicVelocityBased' | 'kinematicPositionBased'
	moveForce?: number
	mass?: number
	lock?: boolean
	ccd?: boolean
	enabled?: boolean
}
 interface colliderOptions {
	contact: boolean
	width: number
	height: number
	offset?: number
	offsetX?: number
	offsetY?: number
	sensor?: boolean
	mass?: number
	group: number
	canCollideWith: number[]
	canBumpWith?: number[]
}
export const createCollider = (colliderOption: colliderOptions) => {
	const colliderDescription = ColliderDesc
		.cuboid(colliderOption.width / 2, colliderOption.height / 2)
		.setDensity(colliderOption.mass ?? 0.00000001)
		.setSensor(colliderOption.sensor ?? false)
		.setCollisionGroups(colliderOption.group * 0x10000 + colliderOption.canCollideWith.reduce((acc, group) => acc + group, 0))
		.setTranslation(colliderOption.offsetX ?? 0, (colliderOption.offset ? (colliderOption.height - colliderOption.offset) / 2 : 0) + (colliderOption.offsetY ?? 0))

	if (colliderOption.canBumpWith) {
		colliderDescription.setSolverGroups(colliderOption.group * 0x10000 + colliderOption.canBumpWith.reduce((acc, group) => acc + group, 0))
	}
	if (colliderOption.contact) {
		colliderDescription.setActiveEvents(ActiveEvents.CONTACT_FORCE_EVENTS)
	}
	return colliderDescription
}
class BodyComponent extends Component {
	body: RigidBody | null = null
	bodyDescription: RigidBodyDesc
	colliders: Collider[] = []
	colliderDescriptions: ColliderDesc[] = []
	moveForce: Stat
	velocity = new Vector2()
	lastVelocity = new Vector2()
	width: number
	height: number
	enabled: boolean
	constructor(bodyOptions: bodyOptions, colliderOption: colliderOptions) {
		super()
		this.enabled = bodyOptions.enabled ?? true
		this.width = colliderOption.width
		this.height = colliderOption.height
		this.moveForce = new Stat(bodyOptions.moveForce ?? 10, STATS.SPEED)
		// !Body
		this.bodyDescription
			= RigidBodyDesc[bodyOptions.type ?? 'dynamic']()
				.setCanSleep(false)
				.setLinearDamping(5)
				.setAngularDamping(10)
				.lockRotations()
		if (bodyOptions.ccd) {
			this.bodyDescription.setCcdEnabled(true)
		}

		// !Collider
		this.colliderDescriptions.push(createCollider(colliderOption))
	}

	contacts(fn: (entity: Entity) => void, group?: number, targets?: number[]) {
		if (this.colliders.length) {
			this.colliders.forEach((collider) => {
				if (group && Math.floor(collider.collisionGroups() / 0x10000) !== group) return
				const touchCollider = (otherCollider: Collider) => {
					if (targets?.length && !targets.includes(Math.floor(otherCollider.collisionGroups() / 0x10000))) return
					const entity = otherCollider?.parent()?.userData as Entity
					if (!entity) return
					return fn(entity)
				}
				world.contactsWith(collider, touchCollider)
				world.intersectionsWith(collider, touchCollider)
			})
		}
	}

	bind(entity: Entity) {
		this.bodyDescription.setUserData(entity)
	}

	destroy() {
		this.colliders.forEach((collider) => {
			world.removeCollider(collider, false)
		})
		this.colliders.length = 0
		if (this.body) {
			world.removeRigidBody(this.body)
			this.body = null
		}
	}
}
BodyComponent.register()
export default BodyComponent
