import { Component } from "../Globals/ECS";

class ExpirationComponent extends Component {
	timer: number
	constructor(timer: number) {
		super()
		this.timer = timer
	}
}
ExpirationComponent.register()
export default ExpirationComponent