import { Component } from '../Globals/ECS'
import type { Entity } from '../Globals/ECS'

class JointComponent extends Component {
	type
	distance: { x: number; y: number }
	parent: Entity | null
	jointed = false
	constructor(type: 'revolute' | 'prismatic' | 'fixed', distance: { x: number; y: number }, parentEntity?: Entity) {
		super()
		this.type = type
		this.distance = distance
		this.parent = parentEntity ?? null
	}
}
JointComponent.register()
export default JointComponent
