import type Tile from '../Utils/Tile'
import assets from '../Globals/Assets'

export interface LootableOptions {
	tile: Tile
	particle: Tile
}

const LOOTABLES: Record<string, LootableOptions> = {
	ROCK: {
		tile: assets.background.rockbreakable,
		particle: assets.effects.Rock,
	},
	FLOWER: {
		tile: assets.background.flower,
		particle: assets.effects.Grass,
	},
	GRAVE: {
		tile: assets.background.graveloot,
		particle: assets.effects.RockBlue,
	},
	POT: {
		tile: assets.background.pot,
		particle: assets.effects.Vase,
	},
	CRATE: {
		tile: assets.background.crate,
		particle: assets.effects.Wood,
	},
	HAY: {
		tile: assets.background.hay,
		particle: assets.effects.Hay,
	},
	FLOWER_SNOW: {
		tile: assets.background.flowersnow,
		particle: assets.effects.Grass,
	},
	LAVA_CRYSTAL: {
		tile: assets.background.lavacrystal,
		particle: assets.effects.Rock,
	},
	STATUE: {
		tile: assets.background.statue,
		particle: assets.effects.RockBlue,
	},
	BOOKS: {
		tile: assets.background.books,
		particle: assets.effects.Paper,
	},
}
export default LOOTABLES
