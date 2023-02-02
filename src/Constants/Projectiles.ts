import Tile from "../Utils/Tile"
import { assets } from "../Globals/Initialize"

export interface ProjectileDefinition {
	tile: Tile
	speed: number
	damage: number
	rotationSpeed?: number
}
const PROJECTILES: Record<string, ProjectileDefinition> = {
	arrow: {
		tile: assets.tiles.weapon_arrow,
		speed: 500,
		damage: 10,
	},
	fireBall: {
		tile: assets.tiles.flame,
		speed: 300,
		damage: 20,
	},
	enemyFire: {
		tile: assets.tiles.flame,
		speed: 100,
		damage: 5,
	},
	enemyArrow: {
		tile: assets.tiles.weapon_arrow,
		speed: 200,
		damage: 5
	},
	bone: {
		tile: assets.details.bone,
		speed: 150,
		damage: 3,
		rotationSpeed: 1,
	}


}
export default PROJECTILES