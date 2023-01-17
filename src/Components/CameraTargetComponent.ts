import { Component } from "../Globals/ECS";

class CameraTargetComponent extends Component {
	top?: number
	bottom?: number
	right?: number
	left?: number
	constructor({ top, bottom, left, right }: { top?: number, bottom?: number, left?: number, right?: number }) {
		super()
		this.top = top
		this.bottom = bottom
		this.left = left
		this.right = right
	}
}
CameraTargetComponent.register()
export default CameraTargetComponent