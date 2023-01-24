import { Component } from "../Globals/ECS";

class SwitchingComponent extends Component {
	main: boolean
	initiated = false
	constructor(main: boolean) {
		super()
		this.main = main
	}
}
SwitchingComponent.register()
export default SwitchingComponent