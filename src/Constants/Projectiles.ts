import AssetManager from "../Globals/AssetManager";

const PROJECTILES: Record<string, ProjectileDefinition> = {
	arrow: {
		tile: AssetManager.tiles.weapon_arrow,
		speed: 5000,
		damage: 10
	},
	fireBall: {
		tile: AssetManager.tiles.flame,
		speed: 3000,
		damage: 20
	}


}
export default PROJECTILES