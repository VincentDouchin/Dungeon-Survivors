import { Color } from "three"
import Tile from "../Utils/Tile"
import assets from "../Globals/Assets"

export type backgroundName = 'FOREST' | 'DUNGEON' | 'CAMP' | 'GRAVEYARD' | 'TOWN' | 'CASTLE' | 'FIELDS'

export interface Background {
	level: string
	lightColor?: Color
	obstacles?: Tile[]
	obstaclesDensity?: number
	leafs?: boolean
	rain?: boolean
	boundaries?: {
		x: number,
		y: number
	}
	infinite: { x: boolean, y: boolean }
}

const BACKGROUNDS: Partial<Record<backgroundName, Background>> = {
	DUNGEON: {
		level: 'DUNGEON',
		lightColor: new Color('hsl(0,0%,6%)'),
		obstacles: [assets.hole.hole],
		obstaclesDensity: 0.25,
		infinite: { x: true, y: true }
	},
	FOREST: {
		level: 'FOREST',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: [...new Array(3).fill(assets.nature.tree1), assets.nature.stumpbig, assets.nature.stumpsmall1, assets.nature.trunksmall],
		obstaclesDensity: 0.3,
		leafs: true,
		infinite: { x: true, y: true }
	},
	CAMP: {
		level: 'CAMP',
		lightColor: new Color('hsl(0,0%,100%)'),
		infinite: { x: false, y: false },
		boundaries: {
			x: 750,
			y: 750
		}
	},
	GRAVEYARD: {
		level: 'GRAVEYARD',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: [assets.elements.grave1, assets.elements.grave2, assets.elements.grave3, assets.elements.grave4],
		obstaclesDensity: 0.3,
		infinite: { x: true, y: true },
		rain: true,
	},
	TOWN: {
		level: 'TOWN',
		lightColor: new Color('hsl(0,0%,100%)'),
		obstacles: [assets.elements.cart1, assets.elements.cart2, assets.elements.pile],
		obstaclesDensity: 0.25,
		infinite: { x: true, y: true }
	},
	CASTLE: {
		level: 'CASTLE',
		lightColor: new Color('hsl(0,0%,100%)'),
		infinite: { x: false, y: true }
	},
	FIELDS: {
		level: 'FIELDS',
		lightColor: new Color('hsl(0,0%,100%)'),
		infinite: { x: true, y: true }
	}

}
export default BACKGROUNDS