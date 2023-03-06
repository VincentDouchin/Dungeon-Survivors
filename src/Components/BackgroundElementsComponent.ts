import { Component, Entity } from "../Globals/ECS";

import { LootableOptions } from "../Constants/Lootables";
import Tile from "../Utils/Tile";
import { makeNoise2D } from 'open-simplex-noise';

export interface Wall {
	width: number
	height: number
	x: number
	y: number
}
class BackgroundElementsComponent extends Component {
	obstaclesEntities: Record<string, Entity> = {}
	wallEntities: Record<string, Entity> = {}
	noise = makeNoise2D(Date.now())
	obstacles: Tile[]
	size: number
	obstaclesDensity: number
	walls: Wall[]
	lootables: LootableOptions[]
	effect?: () => Entity
	effectDelay?: () => number
	effectsTimer = 0
	constructor(options: { obstaclesDensity?: number, obstacles: Tile[], effect?: () => Entity, effectDelay?: () => number, lootables?: LootableOptions[], walls?: Wall[] }) {
		super()
		this.obstacles = options.obstacles
		this.size = options.obstacles.reduce((acc, v) => {
			return Math.max(acc, v.width, v.height)
		}, 0)
		this.obstaclesDensity = options.obstaclesDensity ?? 0.5
		this.effect = options.effect
		this.effectDelay = options.effectDelay
		this.lootables = options.lootables ?? []
		this.walls = options.walls ?? []

	}
}
BackgroundElementsComponent.register()
export default BackgroundElementsComponent