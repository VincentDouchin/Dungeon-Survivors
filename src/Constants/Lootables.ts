import Tile from "../Utils/Tile"
import assets from "../Globals/Assets"

export interface LootableOptions {
	tile: Tile
	particle: Tile
}
export type LOOTABLE = keyof typeof LOOTABLES


const LOOTABLES: Record<string, LootableOptions> = {
	ROCK: {
		tile: assets.nature.rockbreakable,
		particle: assets.effects.rockParticle
	},
	FLOWER: {
		tile: assets.nature.flower,
		particle: assets.effects.grassParticle
	},
	GRAVE: {
		tile: assets.elements.graveloot,
		particle: assets.effects.rockBlueParticle
	},
	POT: {
		tile: assets.elements.pot,
		particle: assets.effects.vaseParticle
	},
	CRATE: {
		tile: assets.elements.crate,
		particle: assets.effects.woodParticle
	},
	HAY: {
		tile: assets.nature.hay,
		particle: assets.effects.hayParticle
	},
	FLOWER_SNOW: {
		tile: assets.nature.flowersnow,
		particle: assets.effects.grassParticle
	},
	LAVA_CRYSTAL: {
		tile: assets.nature.lavacrystal,
		particle: assets.effects.grassParticle

	}

}
export default LOOTABLES

