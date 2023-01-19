import { assets } from "../Globals/Initialize"

const PROJECTILES: Record<string, ProjectileDefinition> = {
	arrow: {
		tile: assets.tiles.weapon_arrow,
		speed: 5000,
		damage: 10
	},
	fireBall: {
		tile: assets.tiles.flame,
		speed: 3000,
		damage: 20
	}


}
export default PROJECTILES