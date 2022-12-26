import { ImpulseJoint } from "@dimforge/rapier2d-compat";
import { Component, ECS, Entity } from "../Globals/ECS";

class WeaponControllerComponent extends Component {
	ownerId: null | string = null
	joint: ImpulseJoint | null = null
	constructor(owner: Entity) {
		super()
		this.ownerId = owner.id
	}
	get owner() {
		return this.ownerId ? ECS.getEntityById(this.ownerId) : undefined
	}
}
WeaponControllerComponent.register()
export default WeaponControllerComponent