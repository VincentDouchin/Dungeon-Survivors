import AssetManager from "../Globals/AssetManager"
import PROJECTILES from "./Projectiles"
import WEAPONBEHAVIORS from "./WeaponBehaviros"

const WEAPONS: Record<string, WeaponDefinition> = {
	knife: {
		tile: AssetManager.tiles.weapon_knife,
		damage: 5,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	swordOld: {
		tile: AssetManager.tiles.weapon_rusty_sword,
		damage: 7,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	sword: {
		tile: AssetManager.tiles.weapon_regular_sword,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	swordGem: {
		tile: AssetManager.tiles.weapon_red_gem_sword,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	hammerLong: {
		tile: AssetManager.tiles.weapon_big_hammer,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	hammer: {
		tile: AssetManager.tiles.weapon_hammer,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	club: {
		tile: AssetManager.tiles.weapon_baton_with_spikes,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	mace: {
		tile: AssetManager.tiles.weapon_mace,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	katana: {
		tile: AssetManager.tiles.weapon_katana,
		damage: 5,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	swordSaw: {
		tile: AssetManager.tiles.weapon_saw_sword,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	swordAnime: {
		tile: AssetManager.tiles.weapon_anime_sword,
		damage: 20,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	hatchet: {
		tile: AssetManager.tiles.weapon_axe,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	machete: {
		tile: AssetManager.tiles.weapon_machete,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	cleaver: {
		tile: AssetManager.tiles.weapon_cleaver,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	rapier: {
		tile: AssetManager.tiles.weapon_duel_sword,
		damage: 10,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	swordKnight: {
		tile: AssetManager.tiles.weapon_knight_sword,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	swordGolden: {
		tile: AssetManager.tiles.weapon_golden_sword,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	swordGoldenBig: {
		tile: AssetManager.tiles.weapon_lavish_sword,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.toucher]
	},
	staff: {
		tile: AssetManager.tiles.weapon_red_magic_staff,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: PROJECTILES.fireBall
	},
	staffGem: {
		tile: AssetManager.tiles.weapon_green_magic_staff,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: PROJECTILES.fireBall
	},
	bow: {
		tile: AssetManager.tiles.weapon_bow,
		damage: 15,
		behaviors: [WEAPONBEHAVIORS.targeter, WEAPONBEHAVIORS.orbiter, WEAPONBEHAVIORS.shooter],
		projectile: PROJECTILES.arrow,
	},
}
export default WEAPONS