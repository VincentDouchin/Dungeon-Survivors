import { Component } from "../Globals/ECS";

class RotationComponent extends Component {
	rotation: number = 0
	angVel: number = 0
	centerRotation: number = 0
	constructor(rotation: number, angVel: number = 0) {
		super()
		this.rotation = rotation
		this.angVel = angVel
	}
}
RotationComponent.register()
export default RotationComponent