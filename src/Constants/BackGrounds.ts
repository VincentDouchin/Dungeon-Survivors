import { Color } from "three"
import Tile from "../Utils/Tile"
import { assets } from "../Globals/Initialize"

export type backgroundName = 'FOREST' | 'DUNGEON' | 'CAMP' | 'GRAVEYARD' | 'TOWN' | 'CASTLE'

export interface Background {
	level: string
	lightColor?: Color
	obstacles?: Tile[]
	obstaclesDensity?: number
	leafs?: boolean
}

const BACKGROUNDS: Partial<Record<backgroundName, Background>> = {
	DUNGEON: {
		level: 'DUNGEON',
		lightColor: new Color('hsl(0,0%,6%)'),
		obstacles: [assets.hole.hole],
		obstaclesDensity: 0.25,

	},
	FOREST: {
		level: 'FOREST',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: [...new Array(3).fill(assets.nature.tree1), assets.nature.stumpbig, assets.nature.stumpsmall1, assets.nature.trunksmall],
		obstaclesDensity: 0.3,
		leafs: true
	},
	CAMP: {
		level: 'CAMP',
		lightColor: new Color('hsl(0,0%,100%)')
	},
	GRAVEYARD: {
		level: 'GRAVEYARD',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: [assets.elements.grave1, assets.elements.grave2, assets.elements.grave3, assets.elements.grave4],
		obstaclesDensity: 0.3,
	},
	TOWN: {
		level: 'TOWN',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: [assets.elements.cart1, assets.elements.cart2, assets.elements.pile],
		obstaclesDensity: 0.25,
	},
	CASTLE: {
		level: 'CASTLE',
		lightColor: new Color('hsl(0,0%,100%)')
	}

}
export default BACKGROUNDS