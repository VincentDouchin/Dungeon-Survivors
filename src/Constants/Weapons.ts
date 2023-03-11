import { SOUND, SOUNDS } from "./Sounds"

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
	target: number[],
	rotationSpeed?: number
	light?: string,
	scale?: number,
	sound?: SOUND
}
const WEAPONS: Record<string, WeaponDefinition> = {
	swordKnight: {
		tile: assets.weapons.sword,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher],
		group: COLLISIONGROUPS.PLAYER,
		target: [COLLISIONGROUPS.ENEMY, COLLISIONGROUPS.LOOT],
		sound: SOUNDS.SWORD
	},
	sai: {
		tile: assets.weapons.sai,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher],
		group: COLLISIONGROUPS.PLAYER,
		target: [COLLISIONGROUPS.ENEMY, COLLISIONGROUPS.LOOT],
	},
	staff: {
		tile: assets.weapons.staff,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: assets.effects.fireProjectile,
		spread: 0.5,
		projectilesNb: 3,
		speed: 300,
		group: COLLISIONGROUPS.PLAYER,
		target: [COLLISIONGROUPS.ENEMY, COLLISIONGROUPS.LOOT],
		light: 'hsl(39, 30%, 20%)',
		sound: SOUNDS.Fireball
	},

	bow: {
		tile: assets.weapons.bow,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.targeter, WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		group: COLLISIONGROUPS.PLAYER,
		target: [COLLISIONGROUPS.ENEMY, COLLISIONGROUPS.LOOT],
		projectile: assets.weapons.arrow,
		speed: 500,
		delay: 60
	},
	enemyBow: {
		tile: assets.weapons.bow,
		damage: 2,
		behaviors: [WEAPONBEHAVIORS.targeter, WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: assets.weapons.arrow,
		group: COLLISIONGROUPS.ENEMY,
		target: [COLLISIONGROUPS.PLAYER],
		delay: 240,
		range: 200,
		speed: 100
	},
	fireball: {
		tile: Tile.empty(),
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.targeter, WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: assets.effects.fireProjectile,
		group: COLLISIONGROUPS.ENEMY,
		target: [COLLISIONGROUPS.PLAYER],
		delay: 240,
		range: 200,
		speed: 300,
	},
	bone: {
		tile: Tile.empty(),
		damage: 2,
		behaviors: [WEAPONBEHAVIORS.targeter, WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: assets.weapons.bone,
		group: COLLISIONGROUPS.ENEMY,
		target: [COLLISIONGROUPS.PLAYER],
		delay: 240,
		range: 200,
		rotationSpeed: 0.2,
		speed: 200
	},
	hammer: {
		tile: Tile.empty(),
		damage: 5,
		behaviors: [WEAPONBEHAVIORS.targeter, WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: assets.weapons.hammer,
		group: COLLISIONGROUPS.ENEMY,
		target: [COLLISIONGROUPS.PLAYER],
		delay: 240,
		range: 150,
		rotationSpeed: 0.1,
		speed: 150
	},
	iceSpike: {
		tile: Tile.empty(),
		damage: 5,
		behaviors: [WEAPONBEHAVIORS.targeter, WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: assets.effects["IceSpike-sheet"],
		group: COLLISIONGROUPS.ENEMY,
		target: [COLLISIONGROUPS.PLAYER],
		delay: 240,
		range: 150,
		speed: 150,
		scale: 0.5
	}
}
export default WEAPONS