import { Component } from '../Globals/ECS'

class SwitchingComponent extends Component {
	main: boolean
	initiated = false
	index: number
	constructor(main: boolean, index: number) {
		super()
		this.main = main
		this.index = index
	}
}
SwitchingComponent.register()
export default SwitchingComponent
