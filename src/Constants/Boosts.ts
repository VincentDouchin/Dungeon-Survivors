import { STATS } from '../Constants/Stats'
import type Tile from '../Utils/Tile'
import assets from '../Globals/Assets'

export interface Boost {
	tile: Tile
	stat: STATS
	duration: number
	modifier: number
	color: [number, number, number, number]
}
const BOOSTS: Boost[] = [
	{
		tile: assets.icons.claw,
		stat: STATS.DAMAGE,
		duration: 1800,
		modifier: 0.5,
		color: [1, 0.2, 0, 1],
	},
	{
		tile: assets.icons.feather,
		stat: STATS.SPEED,
		duration: 1800,
		modifier: 0.5,
		color: [0, 0, 0, 1],
	},
	{
		tile: assets.icons.candy,
		stat: STATS.ATTACK_SPEED,
		duration: 1800,
		modifier: 1,
		color: [1, 0.5, 0.5, 1],
	},
	{
		tile: assets.icons.herbs,
		stat: STATS.SPELL_DAMAGE,
		duration: 1800,
		modifier: 1,
		color: [0, 1, 1, 1],
	},
	{
		tile: assets.icons.potato,
		stat: STATS.DEFENSE,
		duration: 1800,
		modifier: 2,
		color: [0.4, 0.4, 0.7, 1],
	},
	{
		tile: assets.icons.goldenfish,
		stat: STATS.CRIT_CHANCE,
		duration: 1800,
		modifier: 3,
		color: [1, 0.9, 0, 1],
	},
]
export default BOOSTS
