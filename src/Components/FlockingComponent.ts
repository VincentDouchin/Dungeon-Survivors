import { Component } from '../Globals/ECS'

type flockingGroup = string & { __type: 'flocking group' }
class FlockingComponent extends Component {
	distance: number
	main: boolean
	group: flockingGroup
	constructor(group: flockingGroup, main = false, distance = 50) {
		super()
		this.group = group
		this.main = main
		this.distance = distance
	}
	static getGroup() {
		return window.crypto.randomUUID() as flockingGroup
	}
}
FlockingComponent.register()
export default FlockingComponent