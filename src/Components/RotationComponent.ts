import { Component } from "../Globals/ECS";
import { Stat } from "../Game/Stat";

class RotationComponent extends Component {
	rotation: number = 0
	angVel: Stat
	centerRotation: number = 0
	constructor(rotation: number, angVel: number = 0) {
		super()
		this.rotation = rotation
		this.angVel = new Stat(angVel)
	}
}
RotationComponent.register()
export default RotationComponent