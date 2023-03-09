import LOOTABLES, { LootableOptions } from "./Lootables"

import { Color } from "three"
import { Entity } from "../Globals/ECS"
import LeafEntity from "../Entities/LeafEntity"
import RainEntity from "../Entities/RainEntity"
import Tile from "../Utils/Tile"
import WeightedList from "../Utils/WeightedList"
import assets from "../Globals/Assets"

export type BACKGROUND = keyof typeof BACKGROUNDS

export interface BackgroundOptions {
	level: string
	lightColor?: Color
	obstacles?: WeightedList<Tile>
	lootables?: LootableOptions[]
	obstacleDensity?: number
	boundaries?: {
		x: number,
		y: number
	}
	infinite: { x: boolean, y: boolean }
	effect?: () => Entity
	effectDelay?: () => number
}

const BACKGROUNDS: Record<string, BackgroundOptions> = {
	CAVE: {
		level: 'CAVE',
		obstacles: new WeightedList<Tile>()
			.add(assets.nature.rockbig, 3)
			.add(assets.nature.rocksmall1, 1)
			.add(assets.nature.rocksmall2, 1)
			.add(assets.nature.rocksmall3, 1),
		lightColor: new Color('hsl(0,0%,100%)'),
		lootables: [LOOTABLES.ROCK],
		infinite: { x: true, y: true },
	},
	DUNGEON: {
		level: 'DUNGEON',
		lightColor: new Color('hsl(0,0%,6%)'),
		obstacles: new WeightedList<Tile>()
			.add(assets.hole.hole),
		obstacleDensity: 0.5,
		lootables: [LOOTABLES.POT],
		infinite: { x: true, y: true }
	},
	FOREST: {
		level: 'FOREST',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: new WeightedList<Tile>()
			.add(assets.nature.tree1, 4)
			.add(assets.nature.stumpbig, 1)
			.add(assets.nature.trunksmall, 1)
			.add(assets.nature.stumpsmall1, 1),
		lootables: [LOOTABLES.FLOWER],
		infinite: { x: true, y: true },
		effect: LeafEntity,
		effectDelay: () => Math.random() * 10 + 50
	},

	GRAVEYARD: {
		level: 'GRAVEYARD',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: new WeightedList<Tile>()
			.add(assets.nature.treedead)
			.add(assets.elements.grave1)
			.add(assets.elements.grave2)
			.add(assets.elements.grave3)
			.add(assets.elements.grave4),
		lootables: [LOOTABLES.GRAVE],
		infinite: { x: true, y: true },
		effect: RainEntity,
		effectDelay: () => Math.random() * 5

	},
	TOWN: {
		level: 'TOWN',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: new WeightedList<Tile>()
			.add(assets.elements.well, 2)
			.add(assets.elements.cart1, 1)
			.add(assets.elements.cart2, 1)
			.add(assets.elements.pile, 2)
			.add(assets.house.stock, 2)
			.add(assets.house.barrel1, 2)
			.add(assets.house.barrel2, 2)
			.add(assets.house.barrel3, 2)
			.add(assets.house.barrel4, 2)
		,
		obstacleDensity: 0.03,
		lootables: [LOOTABLES.CRATE],
		infinite: { x: true, y: true }
	},
	CASTLE: {
		level: 'CASTLE',
		lightColor: new Color('hsl(0,0%,100%)'),
		infinite: { x: false, y: true }
	},
	SNOW: {
		level: 'SNOW',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: new WeightedList<Tile>()
			.add(assets.nature.rocksnowbig, 1)
			.add(assets.nature.treesnow, 3)
			.add(assets.nature.rocksnowsmall1, 1)
			.add(assets.nature.rocksnowsmall2, 1)
			.add(assets.nature.rocksnowsmall3, 1)
		,
		lootables: [LOOTABLES.FLOWER_SNOW],
		infinite: { x: true, y: true }
	},
	LAVA: {
		level: 'LAVA',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: new WeightedList<Tile>()
			.add(assets.nature.rocklavabig, 1)
			.add(assets.nature.rocklavasmall, 3)
		,
		lootables: [LOOTABLES.LAVA_CRYSTAL],
		infinite: { x: true, y: true }
	}

}
export default BACKGROUNDS