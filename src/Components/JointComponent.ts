import { Component } from '../Globals/ECS'
import type { Entity } from '../Globals/ECS'

class JointComponent extends Component {
	type
	distance: number
	parent: Entity | null
	jointed = false
	constructor(type: 'revolute' | 'prismatic', distance: number, parentEntity?: Entity) {
		super()
		this.type = type
		this.distance = distance
		this.parent = parentEntity ?? null
	}
}
JointComponent.register()
export default JointComponent
