import { ImpulseJoint } from "@dimforge/rapier2d-compat";
import { Component } from "../Globals/ECS";

class OrbiterComponent extends Component {
	joint: ImpulseJoint | null = null
	distance: number
	constructor(distance: number = 20) {
		super()
		this.distance = distance
	}
}
OrbiterComponent.register()
export default OrbiterComponent