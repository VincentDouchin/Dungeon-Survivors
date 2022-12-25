import { Component, Entity } from "../Globals/ECS";

class AIControllerComponent extends Component {
	enabled = true
	target: Entity | null = null
	constructor() {
		super()
	}
}
AIControllerComponent.register()
export default AIControllerComponent