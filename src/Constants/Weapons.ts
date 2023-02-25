import COLLISIONGROUPS from "./CollisionGroups"
import Tile from "../Utils/Tile"
import WEAPONBEHAVIORS from "./WeaponBehaviros"
import assets from "../Globals/Assets"

export interface WeaponDefinition {
	tile: Tile
	damage: number
	behaviors: string[],
	projectile?: Tile
	speed?: number
	spread?: number
	projectilesNb?: number
	delay?: number
	range?: number
	group: number
	target: number,
	rotationSpeed?: number
	light?: string
}
const WEAPONS: Record<string, WeaponDefinition> = {
	swordKnight: {
		tile: assets.tiles.weapon_knight_sword,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher],
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	staff: {
		tile: assets.tiles.weapon_red_magic_staff,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: assets.effects.FireProjectile,
		spread: 0.5,
		projectilesNb: 3,
		speed: 300,
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY,
		light: 'hsl(39, 30%, 20%)'
	},
	staffGem: {
		tile: assets.tiles.weapon_green_magic_staff,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: assets.effects.FireProjectile,
		speed: 300,
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY,

	},
	bow: {
		tile: assets.tiles.weapon_bow,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.targeter, WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY,
		projectile: assets.tiles.weapon_arrow,
		speed: 500,
	},
	enemyBow: {
		tile: assets.tiles.weapon_bow,
		damage: 3,
		behaviors: [WEAPONBEHAVIORS.targeter, WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: assets.tiles.weapon_arrow,
		group: COLLISIONGROUPS.ENEMY,
		target: COLLISIONGROUPS.PLAYER,
		delay: 240,
		range: 200,
		speed: 100
	},
	fireball: {
		tile: assets.UI.empty,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.targeter, WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: assets.effects.FireProjectile,
		group: COLLISIONGROUPS.ENEMY,
		target: COLLISIONGROUPS.PLAYER,
		delay: 240,
		range: 200,
		speed: 300,
	},
	bone: {
		tile: assets.UI.empty,
		damage: 2,
		behaviors: [WEAPONBEHAVIORS.targeter, WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: assets.details.bone,
		group: COLLISIONGROUPS.ENEMY,
		target: COLLISIONGROUPS.PLAYER,
		delay: 240,
		range: 200,
		rotationSpeed: 1,
		speed: 200
	},
	hammer: {
		tile: assets.UI.empty,
		damage: 5,
		behaviors: [WEAPONBEHAVIORS.targeter, WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: assets.tiles.weapon_hammer_projectile,
		group: COLLISIONGROUPS.ENEMY,
		target: COLLISIONGROUPS.PLAYER,
		delay: 240,
		range: 150,
		rotationSpeed: 0.5,
		speed: 150
	}
}
export default WEAPONS