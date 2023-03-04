import { Component } from "../Globals/ECS";
import { STATS } from "./StatsComponent";
import { Stat } from "../Game/Stat";

class RotationComponent extends Component {
	rotation: number
	angVel: Stat
	centerRotation: number
	rotationVel: number
	constructor({ rotation = 0, angVel = 0, centerRotation = 0, rotationVel = 0 }) {
		super()
		this.rotation = rotation
		this.angVel = new Stat(angVel, STATS.ATTACK_SPEED)
		this.centerRotation = centerRotation
		this.rotationVel = rotationVel
	}
}
RotationComponent.register()
export default RotationComponent