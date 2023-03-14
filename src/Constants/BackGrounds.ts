import LOOTABLES, { LootableOptions } from "./Lootables"

import { Arenas } from "../../assets/map/Map"
import { Color } from "three"
import { Entity } from "../Globals/ECS"
import LeafEntity from "../Entities/LeafEntity"
import RainEntity from "../Entities/RainEntity"
import Tile from "../Utils/Tile"
import WeightedList from "../Utils/WeightedList"
import assets from "../Globals/Assets"

export interface BackgroundOptions {
	level: Arenas
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
			.add(assets.background.rockbig, 3)
			.add(assets.background.rocksmall1, 1)
			.add(assets.background.rocksmall2, 1)
			.add(assets.background.rocksmall3, 1),
		obstacleDensity: 0.07,
		lightColor: new Color('hsl(0,0%,100%)'),
		lootables: [LOOTABLES.ROCK],
		infinite: { x: true, y: true },
	},
	DUNGEON: {
		level: 'DUNGEON',
		lightColor: new Color('hsl(0,0%,6%)'),
		obstacles: new WeightedList<Tile>()
			.add(assets.background.hole),
		obstacleDensity: 0.05,
		lootables: [LOOTABLES.POT],
		infinite: { x: true, y: true }
	},
	FOREST: {
		level: 'FOREST',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: new WeightedList<Tile>()
			.add(assets.background.tree1, 4)
			.add(assets.background.stumpbig, 1)
			.add(assets.background.trunksmall, 1)
			.add(assets.background.stumpsmall1, 1),
		lootables: [LOOTABLES.FLOWER],
		obstacleDensity: 0.07,
		infinite: { x: true, y: true },
		effect: LeafEntity,
		effectDelay: () => Math.random() * 10 + 50
	},

	GRAVEYARD: {
		level: 'GRAVEYARD',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: new WeightedList<Tile>()
			.add(assets.background.treedead)
			.add(assets.background.grave1)
			.add(assets.background.grave2)
			.add(assets.background.grave3)
			.add(assets.background.grave4),
		lootables: [LOOTABLES.GRAVE],
		infinite: { x: true, y: true },
		effect: RainEntity,
		effectDelay: () => Math.random() * 5

	},
	TOWN: {
		level: 'TOWN',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: new WeightedList<Tile>()
			.add(assets.background.well, 2)
			.add(assets.background.cart1, 1)
			.add(assets.background.cart2, 1)
			.add(assets.background.pile, 2)
			.add(assets.background.stock, 2)
			.add(assets.background.barrel1, 2)
			.add(assets.background.barrel2, 2)
			.add(assets.background.barrel3, 2)
			.add(assets.background.barrel4, 2)
		,
		obstacleDensity: 0.03,
		lootables: [LOOTABLES.CRATE],
		infinite: { x: true, y: true }
	},
	CASTLE: {
		level: 'CASTLE',
		lightColor: new Color('hsl(0,0%,100%)'),
		infinite: { x: false, y: true },
		lootables: [LOOTABLES.STATUE]
	},
	SNOW: {
		level: 'SNOW',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: new WeightedList<Tile>()
			.add(assets.background.rocksnowbig, 1)
			.add(assets.background.treesnow, 3)
			.add(assets.background.rocksnowsmall1, 1)
			.add(assets.background.rocksnowsmall2, 1)
			.add(assets.background.rocksnowsmall3, 1)
		,
		lootables: [LOOTABLES.FLOWER_SNOW],
		infinite: { x: true, y: true }
	},
	LAVA: {
		level: 'LAVA',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: new WeightedList<Tile>()
			.add(assets.background.rocklavabig, 1)
			.add(assets.background.rocklavasmall, 3)
		,
		lootables: [LOOTABLES.LAVA_CRYSTAL],
		infinite: { x: true, y: true }
	},
	DRACULA: {
		level: 'DRACULA',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: new WeightedList<Tile>()
			.add(assets.background.bookshelf1, 1)
			.add(assets.background.bookshelf2, 3)
			.add(assets.background.candelabra, 2)
		,
		lootables: [LOOTABLES.BOOKS],
		infinite: { x: true, y: true }
	}

}
export default BACKGROUNDS