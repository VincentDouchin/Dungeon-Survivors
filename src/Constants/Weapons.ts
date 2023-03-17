import { SOUND, SOUNDS } from "./Sounds"

import COLLISIONGROUPS from "./CollisionGroups"
import Tile from "../Utils/Tile"
import WEAPONBEHAVIORS from "./WeaponBehaviros"
import assets from "../Globals/Assets"

export interface WeaponDefinition {
	tile: Tile
	damage: number
	behaviors: string[],
	angle?: number
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
	get sai2() {
		return { ...WEAPONS.sai, angle: Math.PI }
	},
	staff: {
		tile: assets.weapons.staff,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: assets.effects.fireProjectile,
		spread: 0.5,
		projectilesNb: 3,
		speed: 300,
		delay: 60,
		group: COLLISIONGROUPS.PLAYER,
		target: [COLLISIONGROUPS.ENEMY, COLLISIONGROUPS.LOOT],
		light: 'hsl(39, 30%, 20%)',
		sound: SOUNDS.Fireball
	},
	bow: {
		tile: assets.weapons.bow,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.targeter, WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		group: COLLISIONGROUPS.PLAYER,
		target: [COLLISIONGROUPS.ENEMY, COLLISIONGROUPS.LOOT],
		projectile: assets.weapons.arrow,
		speed: 500,
		delay: 40
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
		damage: 4,
		behaviors: [WEAPONBEHAVIORS.targeter, WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: assets.weapons.hammer,
		group: COLLISIONGROUPS.ENEMY,
		target: [COLLISIONGROUPS.PLAYER],
		delay: 240,
		range: 150,
		rotationSpeed: 0.1,
		speed: 100
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
		speed: 100,
		scale: 0.5
	},
	cross: {
		tile: Tile.empty(),
		damage: 3,
		behaviors: [WEAPONBEHAVIORS.targeter, WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: assets.weapons.cross,
		group: COLLISIONGROUPS.ENEMY,
		target: [COLLISIONGROUPS.PLAYER],
		delay: 240,
		range: 150,
		speed: 100,
		scale: 0.8,
		rotationSpeed: 0.1,
	},
	darkProjectile: {
		tile: Tile.empty(),
		damage: 3,
		behaviors: [WEAPONBEHAVIORS.targeter, WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: assets.effects.darkProjectile,
		group: COLLISIONGROUPS.ENEMY,
		target: [COLLISIONGROUPS.PLAYER],
		delay: 240,
		range: 200,
		speed: 100,
	}

}
export default WEAPONS
