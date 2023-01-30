import { Color } from "three"
import { Level } from "../../ldtk"
import { assets } from "../Globals/Initialize"

export type backgroundName = 'FOREST' | 'DUNGEON' | 'CAMP' | 'GRAVEYARD' | 'TOWN' | 'CASTLE'

export interface Background {
	level: string
	lightColor?: Color
	subLevels?: Level[]
}
const BACKGROUNDS: Partial<Record<backgroundName, Background>> = {
	DUNGEON: {
		level: 'DUNGEON',
		lightColor: new Color('hsl(0,0%,4%)')
	},
	FOREST: {
		level: 'FOREST',
		lightColor: new Color('hsl(0,0%,100%)'),
		subLevels: assets.arenas.levels.filter(level => level.identifier.includes('FOREST_'))
	},
	CAMP: {
		level: 'CAMP',
		lightColor: new Color('hsl(0,0%,100%)')
	},
	GRAVEYARD: {
		level: 'GRAVEYARD',
		lightColor: new Color('hsl(0,0%,100%)')
	},
	TOWN: {
		level: 'TOWN',
		lightColor: new Color('hsl(0,0%,100%)')
	},
	CASTLE: {
		level: 'CASTLE',
		lightColor: new Color('hsl(0,0%,100%)')
	}

}
export default BACKGROUNDS