import { Component, ECS, Entity } from "../Globals/ECS";

import DroppableComponent from "./DroppableComponent";
import { ECSEVENTS } from "../Constants/Events";
import LootableEntity from "../Entities/LootableEntity";
import { LootableOptions } from "../Constants/Lootables";
import ObstableEntity from "../Entities/ObstacleEntity";
import PositionComponent from "./PositionComponent";
import Tile from "../Utils/Tile";
import WeightedList from "../Utils/WeightedList";

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
	destroyed?: boolean
}
class BackgroundElementsComponent extends Component {
	obstaclesMap: Map<string, ObstacleNode> = new Map()
	obstacleDensity: number
	wallEntities: Record<string, Entity> = {}

	obstacles: WeightedList<Tile> | null
	size: number | null
	walls: Wall[]
	lootables: LootableOptions[] | null
	effect?: () => Entity
	effectDelay?: () => number
	effectsTimer = 0
	removeWallSub: () => void

	constructor(options: { obstacleDensity?: number, obstacles?: WeightedList<Tile>, effect?: () => Entity, effectDelay?: () => number, lootables?: LootableOptions[] | null, walls?: Wall[] }) {
		super()
		this.obstacles = options.obstacles ?? null
		this.size = options.obstacles?.elements.reduce((acc, v) => {
			return Math.max(acc, v.width, v.height)
		}, 0) ?? null
		this.effect = options.effect
		this.effectDelay = options.effectDelay
		this.obstacleDensity = options.obstacleDensity ?? 0.1
		this.lootables = options.lootables ?? null
		this.walls = options.walls ?? []
		this.removeWallSub = ECS.eventBus.subscribe(ECSEVENTS.REMOVE_WALL, ({ entity, deleteLoot }) => {
			this.obstaclesMap.forEach(node => {
				if (node.entity === entity) {
					if (deleteLoot){
						 entity.getComponent(DroppableComponent)?.destroy()
						}else {
							entity.destroy()
						}
					
					node.destroyed = true
				}
			})
		})

	}
	createNode(x: number, y: number) {
		const key = `${x}|${y}`
		const noiseValue = Math.random()
		if (noiseValue > this.obstacleDensity || !this.lootables || !this.obstacles) {
			this.obstaclesMap.set(key, { obstacle: false })
			return
		} else if (this.lootables && this.obstacles) {
			const loot = Math.random() < 0.05
			const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]

			const entityConstructor = loot ? LootableEntity(getRandom(this.lootables)) : ObstableEntity(this.obstacles.pick())
			this.obstaclesMap.set(key, {
				obstacle: true,
				entityConstructor,
				destroyed: false
			})

		}

	}
	getNode(x: number, y: number) {
		return this.obstaclesMap.get(`${x}|${y}`)
	}
	createEntity(x: number, y: number) {
		const node = this.getNode(x, y)
		if (!node || !node.entityConstructor || !this.size) return

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