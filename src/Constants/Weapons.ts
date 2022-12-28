import AssetManager from "../Globals/AssetManager"
import Tile from "../Utils/Tile"


const WEAPONS: Record<string, WeaponDefinition> = {
	knife: {
		tile: AssetManager.tiles.weapon_knife,
		damage: 5
	},
	swordOld: {
		tile: AssetManager.tiles.weapon_rusty_sword,
		damage: 7
	},
	sword: {
		tile: AssetManager.tiles.weapon_regular_sword,
		damage: 10
	},
	swordGem: {
		tile: AssetManager.tiles.weapon_red_gem_sword,
		damage: 15
	},
	hammerLong: {
		tile: AssetManager.tiles.weapon_big_hammer,
		damage: 15
	},
	hammer: {
		tile: AssetManager.tiles.weapon_hammer,
		damage: 15
	},
	club: {
		tile: AssetManager.tiles.weapon_baton_with_spikes,
		damage: 10
	},
	mace: {
		tile: AssetManager.tiles.weapon_mace,
		damage: 15
	},
	katana: {
		tile: AssetManager.tiles.weapon_katana,
		damage: 5
	},
	swordSaw: {
		tile: AssetManager.tiles.weapon_saw_sword,
		damage: 10
	},
	swordAnime: {
		tile: AssetManager.tiles.weapon_anime_sword,
		damage: 20
	},
	hatchet: {
		tile: AssetManager.tiles.weapon_axe,
		damage: 10
	},
	machete: {
		tile: AssetManager.tiles.weapon_machete,
		damage: 15
	},
	cleaver: {
		tile: AssetManager.tiles.weapon_cleaver,
		damage: 15
	},
	rapier: {
		tile: AssetManager.tiles.weapon_duel_sword,
		damage: 10
	},
	swordKnight: {
		tile: AssetManager.tiles.weapon_knight_sword,
		damage: 15
	},
	swordGolden: {
		tile: AssetManager.tiles.weapon_golden_sword,
		damage: 15
	},
	swordGoldenBig: {
		tile: AssetManager.tiles.weapon_lavish_sword,
		damage: 15
	},
	staff: {
		tile: AssetManager.tiles.weapon_red_magic_staff,
		damage: 15
	},
	staffGem: {
		tile: AssetManager.tiles.weapon_green_magic_staff,
		damage: 15
	},
	bow: {
		tile: AssetManager.tiles.weapon_bow,
		damage: 15
	},
}
export default WEAPONS