import type { Entity } from '../Globals/ECS'
import { Component } from '../Globals/ECS'

import type { Arenas } from '../../assets/map/Map'
import type { enemyWaveName } from '../Constants/EnemyEncounters'

export interface node {
	id: number
	x: number
	y: number
	top: number
	left: number
	right: number
	start: boolean
	end?: boolean
	encounter: boolean
	BACKGROUND: Arenas
	ENEMIES: enemyWaveName
	flag: boolean
}
class PathNodeComponent extends Component {
	nodes: Map<number, Entity>
	encounter: boolean
	background: Arenas
	enemies: enemyWaveName
	showingOptions = false
	options: node
	constructor(options: node, nodes: Map<number, Entity>) {
		super()
		this.encounter = options.encounter
		this.background = options.BACKGROUND
		this.enemies = options.ENEMIES
		this.nodes = nodes
		this.options = options
	}

	next(direction: nodeDirection) {
		return this.nodes.get(this.options[direction])
	}

	get possibleDirections() {
		const directions = ['left', 'right', 'top'] as nodeDirection[]
		return directions.filter(direction => this.options[direction]).length
	}
}
PathNodeComponent.register()
export default PathNodeComponent
