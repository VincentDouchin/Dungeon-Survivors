import { Component, Entity } from "../Globals/ECS";

class PathNodeComponent extends Component {
	nodes: Partial<Record<nodeDirection, Entity>>
	selected: boolean
	walker: Entity
	showingOptions = false
	constructor(nodes: Partial<Record<nodeDirection, Entity>>, walker: Entity, selected: boolean) {
		super()
		this.nodes = nodes
		this.walker = walker
		this.selected = selected
	}
}
PathNodeComponent.register()
export default PathNodeComponent