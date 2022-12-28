import { ImpulseJoint } from "@dimforge/rapier2d-compat";
import { Component, ECS, Entity } from "../Globals/ECS";

class OrbiterComponent extends Component {
	ownerId: null | string = null
	joint: ImpulseJoint | null = null
	distance: number
	constructor(owner: Entity, distance: number = 30) {
		super()
		this.ownerId = owner.id
		this.distance = distance
	}
	get owner() {
		return this.ownerId ? ECS.getEntityById(this.ownerId) : undefined
	}
}
OrbiterComponent.register()
export default OrbiterComponent