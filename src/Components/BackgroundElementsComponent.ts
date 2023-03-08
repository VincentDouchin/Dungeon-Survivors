import { Component, ECS, Entity } from "../Globals/ECS";

import { ECSEVENTS } from "../Constants/Events";
import LootableEntity from "../Entities/LootableEntity";
import { LootableOptions } from "../Constants/Lootables";
import ObstableEntity from "../Entities/ObstacleEntity";
import PositionComponent from "./PositionComponent";
import Tile from "../Utils/Tile";
import { makeNoise2D } from 'open-simplex-noise';

export interface Wall {
	width: number
	height: number
	x: number
	y: number
}
export interface ObstacleNode {
	obstacle: boolean
	entityConstructor?: (x: number, y: number) => Entity
	entity?: Entity | null
	position?: PositionComponent | null
}
class BackgroundElementsComponent extends Component {
	obstaclesMap: Map<string, ObstacleNode> = new Map()
	wallEntities: Record<string, Entity> = {}
	noise = (x: number, y: number) => (makeNoise2D(Math.random())(x, y) + 1) / 2
	noise2 = (x: number) => ((9 * Math.sin(20 * Math.pow(x, 6 / 7)) * Math.sin(Math.pow(x * 4, 3 / 2))) + 9) / 18
	obstacles: Tile[]
	size: number
	walls: Wall[]
	lootables: LootableOptions[]
	effect?: () => Entity
	effectDelay?: () => number
	effectsTimer = 0
	removeWallSub: () => void
	constructor(options: { obstaclesDensity?: number, obstacles: Tile[], effect?: () => Entity, effectDelay?: () => number, lootables?: LootableOptions[], walls?: Wall[] }) {
		super()
		this.obstacles = options.obstacles
		this.size = options.obstacles.reduce((acc, v) => {
			return Math.max(acc, v.width, v.height)
		}, 0)
		this.effect = options.effect
		this.effectDelay = options.effectDelay
		this.lootables = options.lootables ?? []
		this.walls = options.walls ?? []
		this.removeWallSub = ECS.eventBus.subscribe(ECSEVENTS.REMOVE_WALL, (wall) => {
			this.obstaclesMap.forEach(node => {
				if (node.entity === wall) {
					wall.destroy()
					node.entity = new Entity('blank')
					ECS.eventBus.publish(ECSEVENTS.ADD_TO_BACKGROUND, node.entity)

				}
			})
		})

	}
	createNode(x: number, y: number) {
		const key = `${x}|${y}`
		const noiseValue = Math.random()
		if (noiseValue > 0.1) {
			this.obstaclesMap.set(key, { obstacle: false })
		} else {
			const loot = Math.random() < 0.1
			const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]
			const entityConstructor = loot ? LootableEntity(getRandom(this.lootables)) : ObstableEntity(getRandom(this.obstacles))
			this.obstaclesMap.set(key, {
				obstacle: true,
				entityConstructor,
			})

		}

	}
	getNode(x: number, y: number) {
		return this.obstaclesMap.get(`${x}|${y}`)
	}
	createEntity(x: number, y: number) {
		const node = this.getNode(x, y)
		if (!node || !node.entityConstructor) return

		node.entity = node.entityConstructor(x * this.size, y * this.size)
		node.position = node.entity.getComponent(PositionComponent)
		return node.entity
	}
	destroy(): void {
		this.removeWallSub()
	}

}
BackgroundElementsComponent.register()
export default BackgroundElementsComponent