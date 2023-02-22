import SPELLS, { Spell } from "./Spells"

import Tile from "../Utils/Tile"
import assets from "../Globals/Assets"

export interface HeroDefinition {
	tiles: Record<string, Tile>
	spell: Spell
}
const HEROS: Record<string, HeroDefinition> = {
	elfFemale: {
		tiles: {
			idle: assets.tiles.elf_f_idle_anim,
			run: assets.tiles.elf_f_idle_anim,
		},
		spell: SPELLS.LIGHTNING
	},
	elfMale: {
		tiles: {
			idle: assets.tiles.elf_m_idle_anim,
			run: assets.tiles.elf_m_run_anim,
		},
		spell: SPELLS.LIGHTNING
	},
	wizardFemale: {
		tiles: {
			idle: assets.tiles.wizzard_f_idle_anim,
			run: assets.tiles.wizzard_f_run_anim,
		},
		spell: SPELLS.LIGHTNING
	},
	wizardMale: {
		tiles: {
			idle: assets.tiles.wizzard_m_idle_anim,
			run: assets.tiles.wizzard_m_run_anim,
		},
		spell: SPELLS.LIGHTNING
	},
	knightFemale: {
		tiles: {
			idle: assets.tiles.knight_f_idle_anim,
			run: assets.tiles.knight_f_run_anim,
		},
		spell: SPELLS.DIVINE_PROTECTION
	},
	knightMale: {
		tiles: {
			idle: assets.tiles.knight_m_idle_anim,
			run: assets.tiles.knight_m_run_anim,
		},
		spell: SPELLS.DIVINE_PROTECTION
	},

}
export default HEROS