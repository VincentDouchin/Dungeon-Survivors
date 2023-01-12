import { Component, Entity } from "../Globals/ECS";

class PathNodeComponent extends Component {
	nodes: Partial<Record<nodeDirection, Entity>>
	selected: boolean
	walker: Entity
	encounter: boolean
	showingOptions = false
	constructor(nodes: Partial<Record<nodeDirection, Entity>>, walker: Entity, selected: boolean, encounter: boolean) {
		super()
		this.encounter = encounter
		this.nodes = nodes
		this.walker = walker
		this.selected = selected
	}
}
PathNodeComponent.register()
export default PathNodeComponent