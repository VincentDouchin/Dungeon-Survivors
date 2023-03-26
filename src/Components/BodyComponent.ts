import type { Collider, RigidBody } from '@dimforge/rapier2d-compat'
import { ActiveEvents, ColliderDesc, RigidBodyDesc } from '@dimforge/rapier2d-compat'
import { Vector2 } from 'three'
import type { Entity } from '../Globals/ECS'
import { Component, ECS } from '../Globals/ECS'

import { Stat } from '../Game/Stat'
import { world } from '../Globals/Initialize'
import { STATS } from './StatsComponent'

export interface bodyOptions {
	type?: 'dynamic' | 'fixed' | 'kinematicVelocityBased' | 'kinematicPositionBased'
	moveForce?: number
	mass?: number
	lock?: boolean
}
export interface colliderOptions {
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
}
class BodyComponent extends Component {
	body: RigidBody | null = null
	bodyDescription: RigidBodyDesc
	colliders: Collider[] = []
	colliderDescriptions: ColliderDesc[]
	moveForce: Stat
	velocity = new Vector2()
	constructor(bodyOptions: bodyOptions, colliderOptions: colliderOptions[]) {
		super()

		this.moveForce = new Stat(bodyOptions.moveForce ?? 10, STATS.SPEED)
		// !Body
		this.bodyDescription
			= RigidBodyDesc[bodyOptions.type ?? 'dynamic']()
				.setCanSleep(false)
				.setCcdEnabled(true)
				.setLinearDamping(5)
				.setAngularDamping(10)
				.lockRotations()

		// !Collider
		this.colliderDescriptions = colliderOptions.map((colliderOption) => {
			const colliderDescription = ColliderDesc
				.cuboid(colliderOption.width / 2, colliderOption.height / 2)
				.setDensity(colliderOption.mass ?? 0.00000001)
				.setSensor(colliderOption.sensor ?? false)
				.setCollisionGroups(colliderOption.group * 0x10000 + colliderOption.canCollideWith.reduce((acc, group) => acc + group, 0))
				.setTranslation(colliderOption.offsetX ?? 0, (colliderOption.offset ? (colliderOption.height - colliderOption.offset) / 2 : 0) + (colliderOption.offsetY ?? 0))
			if (colliderOption.contact) {
				colliderDescription.setActiveEvents(ActiveEvents.COLLISION_EVENTS)
			}
			return colliderDescription
		})
	}

	contacts(fn: (entity: Entity) => void, group?: number, targets?: number[]) {
		if (this.colliders.length) {
			this.colliders.forEach((collider) => {
				if (group && Math.floor(collider.collisionGroups() / 0x10000) != group) return
				const touchCollider = (otherCollider: Collider) => {
					if (targets?.length && !targets.includes(Math.floor(otherCollider.collisionGroups() / 0x10000))) return
					const entityId = otherCollider?.parent()?.userData as string
					const entity = ECS.getEntityById(entityId)
					return fn(entity)
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
