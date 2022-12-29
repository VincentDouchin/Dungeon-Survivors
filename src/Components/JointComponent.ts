import { Component, Entity } from "../Globals/ECS";

class JointComponent extends Component {
	type
	distance: number
	parentId: string | null
	jointed: boolean = false
	constructor(type: 'revolute' | 'prismatic', distance: number, parentEntity?: Entity) {
		super()
		this.type = type
		this.distance = distance
		this.parentId = parentEntity?.id ?? null
	}
}
JointComponent.register()
export default JointComponent