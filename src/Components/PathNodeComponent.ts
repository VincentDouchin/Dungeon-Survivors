import { Component, Entity } from "../Globals/ECS";

import { backgroundName } from "../Constants/BackGrounds";
import { enemyWaveName } from "../Constants/EnemyEncounters";

export interface node {
	id: number
	x: number
	y: number
	top: number | string
	left: number | string
	right: number | string
	start: boolean
	end?: boolean
	encounter: boolean
	BACKGROUND: backgroundName
	ENEMIES: enemyWaveName
}
class PathNodeComponent extends Component {
	nodes: Partial<Record<nodeDirection, Entity>>
	selected: boolean
	encounter: boolean
	background: backgroundName
	enemies: enemyWaveName
	showingOptions = false
	constructor(nodes: Partial<Record<nodeDirection, Entity>>, selected: boolean, options: node) {
		super()
		this.encounter = options.encounter
		this.background = options.BACKGROUND
		this.enemies = options.ENEMIES
		this.nodes = nodes
		this.selected = selected
	}
}
PathNodeComponent.register()
export default PathNodeComponent