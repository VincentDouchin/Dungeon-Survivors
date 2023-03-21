import { Component } from "../Globals/ECS";
import { STATS } from "./StatsComponent";
import { Stat } from "../Game/Stat";

class RotationComponent extends Component {
	rotation: number
	angVel: Stat
	centerRotation: number
	rotationVel: number
	mirror: boolean
	constructor({ rotation = 0, angVel = 0, centerRotation = 0, rotationVel = 0, mirror = false }) {
		super()
		this.rotation = rotation
		this.angVel = new Stat(angVel, STATS.ATTACK_SPEED)
		this.centerRotation = centerRotation
		this.rotationVel = rotationVel
		this.mirror = mirror
	}
}
RotationComponent.register()
export default RotationComponent