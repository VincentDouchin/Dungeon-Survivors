import { ColliderDesc, RigidBody, RigidBodyDesc } from "@dimforge/rapier2d-compat";
import { Component } from "../Globals/ECS";
import { world } from "../Globals/Initialize";

interface bodyOptions {
	type?: 'dynamic' | 'fixed'
	moveForce?: number
}

class BodyComponent extends Component {
	body: RigidBody
	moveForce: number
	constructor(bodyOptions: bodyOptions) {
		super()
		this.moveForce = bodyOptions.moveForce ?? 10
		//!Body

		const bodyDescription = RigidBodyDesc[bodyOptions.type ?? 'dynamic']();
		bodyDescription
			.setAdditionalMass(1)
			.setCanSleep(false)
			.setCcdEnabled(true)
		this.body = world.createRigidBody(bodyDescription)
		//!Collider
		const colliderDescription = ColliderDesc.cuboid(1, 1).setDensity(1)
		world.createCollider(colliderDescription, this.body)
	}
}
BodyComponent.register()
export default BodyComponent