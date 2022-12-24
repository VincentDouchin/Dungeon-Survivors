import { Component } from "../Globals/ECS";

class PlayerControllerComponent extends Component {
	enabled = true
	constructor() {
		super()

	}
}
PlayerControllerComponent.register()
export default PlayerControllerComponent