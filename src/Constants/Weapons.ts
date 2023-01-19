import { assets } from "../Globals/Initialize"
import PROJECTILES from "./Projectiles"
import WEAPONBEHAVIORS from "./WeaponBehaviros"

const WEAPONS: Record<string, WeaponDefinition> = {
	knife: {
		tile: assets.tiles.weapon_knife,
		damage: 5,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	swordOld: {
		tile: assets.tiles.weapon_rusty_sword,
		damage: 7,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	sword: {
		tile: assets.tiles.weapon_regular_sword,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	swordGem: {
		tile: assets.tiles.weapon_red_gem_sword,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	hammerLong: {
		tile: assets.tiles.weapon_big_hammer,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	hammer: {
		tile: assets.tiles.weapon_hammer,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	club: {
		tile: assets.tiles.weapon_baton_with_spikes,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	mace: {
		tile: assets.tiles.weapon_mace,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	katana: {
		tile: assets.tiles.weapon_katana,
		damage: 5,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	swordSaw: {
		tile: assets.tiles.weapon_saw_sword,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	swordAnime: {
		tile: assets.tiles.weapon_anime_sword,
		damage: 20,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	hatchet: {
		tile: assets.tiles.weapon_axe,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	machete: {
		tile: assets.tiles.weapon_machete,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	cleaver: {
		tile: assets.tiles.weapon_cleaver,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	rapier: {
		tile: assets.tiles.weapon_duel_sword,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	swordKnight: {
		tile: assets.tiles.weapon_knight_sword,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	swordGolden: {
		tile: assets.tiles.weapon_golden_sword,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	swordGoldenBig: {
		tile: assets.tiles.weapon_lavish_sword,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	staff: {
		tile: assets.tiles.weapon_red_magic_staff,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: PROJECTILES.fireBall,
		spread: 0.5,
		projectilesNb: 3
	},
	staffGem: {
		tile: assets.tiles.weapon_green_magic_staff,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: PROJECTILES.fireBall
	},
	bow: {
		tile: assets.tiles.weapon_bow,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.targeter, WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: PROJECTILES.arrow,
	},
}
export default WEAPONS