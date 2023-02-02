import PROJECTILES, { ProjectileDefinition } from "./Projectiles"

import COLLISIONGROUPS from "./CollisionGroups"
import Tile from "../Utils/Tile"
import WEAPONBEHAVIORS from "./WeaponBehaviros"
import { assets } from "../Globals/Initialize"

export interface WeaponDefinition {
	tile: Tile
	damage: number
	behaviors: string[],
	projectile?: ProjectileDefinition
	spread?: number
	projectilesNb?: number
	delay?: number
	range?: number
	group: number
	target: number
}
const WEAPONS: Record<string, WeaponDefinition> = {
	knife: {
		tile: assets.tiles.weapon_knife,
		damage: 5,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher],
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	swordOld: {
		tile: assets.tiles.weapon_rusty_sword,
		damage: 7,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher],
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	sword: {
		tile: assets.tiles.weapon_regular_sword,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher],
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	swordGem: {
		tile: assets.tiles.weapon_red_gem_sword,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher],
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	hammerLong: {
		tile: assets.tiles.weapon_big_hammer,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher],
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	hammer: {
		tile: assets.tiles.weapon_hammer,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher],
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	club: {
		tile: assets.tiles.weapon_baton_with_spikes,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher],
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	mace: {
		tile: assets.tiles.weapon_mace,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher],
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	katana: {
		tile: assets.tiles.weapon_katana,
		damage: 5,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher],
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	swordSaw: {
		tile: assets.tiles.weapon_saw_sword,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher],
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	swordAnime: {
		tile: assets.tiles.weapon_anime_sword,
		damage: 20,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher],
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	hatchet: {
		tile: assets.tiles.weapon_axe,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher],
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	machete: {
		tile: assets.tiles.weapon_machete,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher],
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	cleaver: {
		tile: assets.tiles.weapon_cleaver,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher],
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	rapier: {
		tile: assets.tiles.weapon_duel_sword,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher],
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	swordKnight: {
		tile: assets.tiles.weapon_knight_sword,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher],
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	swordGolden: {
		tile: assets.tiles.weapon_golden_sword,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher],
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	swordGoldenBig: {
		tile: assets.tiles.weapon_lavish_sword,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher],
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	staff: {
		tile: assets.tiles.weapon_red_magic_staff,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: PROJECTILES.fireBall,
		spread: 0.5,
		projectilesNb: 3,
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	staffGem: {
		tile: assets.tiles.weapon_green_magic_staff,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: PROJECTILES.fireBall,
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	bow: {
		tile: assets.tiles.weapon_bow,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.targeter, WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: PROJECTILES.arrow,
		group: COLLISIONGROUPS.PLAYER,
		target: COLLISIONGROUPS.ENEMY
	},
	enemyBow: {
		tile: assets.tiles.weapon_bow,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.targeter, WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: PROJECTILES.arrow,
		group: COLLISIONGROUPS.ENEMY,
		target: COLLISIONGROUPS.PLAYER,
		delay: 240,
		range: 200
	},
	fireball: {
		tile: assets.UI.empty,
		damage: 0,
		behaviors: [WEAPONBEHAVIORS.targeter, WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: PROJECTILES.enemyFire,
		group: COLLISIONGROUPS.ENEMY,
		target: COLLISIONGROUPS.PLAYER,
		delay: 240,
		range: 200
	},
	bone: {
		tile: assets.UI.empty,
		damage: 0,
		behaviors: [WEAPONBEHAVIORS.targeter, WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: PROJECTILES.bone,
		group: COLLISIONGROUPS.ENEMY,
		target: COLLISIONGROUPS.PLAYER,
		delay: 240,
		range: 200
	}
}
export default WEAPONS