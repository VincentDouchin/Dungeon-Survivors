import { assets } from "../Globals/Initialize"

const PROJECTILES: Record<string, ProjectileDefinition> = {
	arrow: {
		tile: assets.tiles.weapon_arrow,
		speed: 500,
		damage: 10
	},
	fireBall: {
		tile: assets.tiles.flame,
		speed: 300,
		damage: 20
	}


}
export default PROJECTILES