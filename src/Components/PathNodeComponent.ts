import { Component, Entity } from "../Globals/ECS";

class PathNodeComponent extends Component {
	nodes: Partial<Record<nodeDirection, Entity>>
	selected: boolean
	encounter: boolean
	showingOptions = false
	constructor(nodes: Partial<Record<nodeDirection, Entity>>, selected: boolean, encounter: boolean) {
		super()
		this.encounter = encounter
		this.nodes = nodes
		this.selected = selected
	}
}
PathNodeComponent.register()
export default PathNodeComponent