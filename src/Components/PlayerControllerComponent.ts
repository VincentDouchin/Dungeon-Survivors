import { Component } from "../Globals/ECS";

class PlayerControllerComponent extends Component {
	enabled: boolean
	constructor(enabled?: boolean) {
		super()
		this.enabled = enabled ?? true


	}
}
PlayerControllerComponent.register()
export default PlayerControllerComponent