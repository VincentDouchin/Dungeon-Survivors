import { Component } from "../Globals/ECS";

class FlockingComponent extends Component {
	distance: number
	main: boolean
	constructor(main?: boolean, distance?: number) {
		super()
		this.main = main ?? false
		this.distance = distance ?? 50
	}
}
FlockingComponent.register()
export default FlockingComponent