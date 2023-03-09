import LOOTABLES, { LootableOptions } from "./Lootables"

import { Color } from "three"
import { Entity } from "../Globals/ECS"
import LeafEntity from "../Entities/LeafEntity"
import RainEntity from "../Entities/RainEntity"
import Tile from "../Utils/Tile"
import assets from "../Globals/Assets"

export type BACKGROUND = keyof typeof BACKGROUNDS

export interface BackgroundOptions {
	level: string
	lightColor?: Color
	obstacles: Tile[]
	lootables: LootableOptions[]
	boundaries?: {
		x: number,
		y: number
	}
	infinite: { x: boolean, y: boolean }
	effect?: () => Entity
	effectDelay?: () => number
}

const BACKGROUNDS: Record<string, BackgroundOptions> = {
	DUNGEON: {
		level: 'DUNGEON',
		lightColor: new Color('hsl(0,0%,6%)'),
		obstacles: [assets.hole.hole],
		lootables: [LOOTABLES.POT],
		infinite: { x: true, y: true }
	},
	FOREST: {
		level: 'FOREST',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: [...new Array(3).fill(assets.nature.tree1), assets.nature.stumpbig, assets.nature.stumpsmall1, assets.nature.trunksmall],
		lootables: [LOOTABLES.FLOWER],
		infinite: { x: true, y: true },
		effect: LeafEntity,
		effectDelay: () => Math.random() * 10 + 50
	},
	CAVE: {
		level: 'CAVE',
		obstacles: [assets.nature.rockbig, assets.nature.rocksmall2, assets.nature.rocksmall1],
		lightColor: new Color('hsl(0,0%,100%)'),
		lootables: [LOOTABLES.ROCK],
		infinite: { x: true, y: true },
	},
	GRAVEYARD: {
		level: 'GRAVEYARD',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: [assets.nature.treedead, assets.elements.grave1, assets.elements.grave2, assets.elements.grave3, assets.elements.grave4],
		lootables: [LOOTABLES.GRAVE],
		infinite: { x: true, y: true },
		effect: RainEntity,
		effectDelay: () => Math.random() * 5

	},
	TOWN: {
		level: 'TOWN',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: [assets.elements.well, assets.elements.cart1, assets.elements.cart2, assets.elements.pile],
		lootables: [LOOTABLES.CRATE],
		infinite: { x: true, y: true }
	},
	CASTLE: {
		level: 'CASTLE',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: [],
		lootables: [],
		infinite: { x: false, y: true }
	},
	SNOW: {
		level: 'SNOW',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: [assets.elements.cart1],
		lootables: [LOOTABLES.HAY],
		infinite: { x: true, y: true }
	},
	LAVA: {
		level: 'LAVA',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: [assets.elements.cart1],
		lootables: [LOOTABLES.HAY],
		infinite: { x: true, y: true }
	}

}
export default BACKGROUNDS