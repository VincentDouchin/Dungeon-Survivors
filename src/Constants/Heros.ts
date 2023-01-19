import { assets } from "../Globals/Initialize"

const HEROS: Record<string, HeroDefinition> = {
	elfFemale: {
		tiles: {
			idle: assets.tiles.elf_f_idle_anim,
			run: assets.tiles.elf_f_idle_anim,
		}
	},
	elfMale: {
		tiles: {
			idle: assets.tiles.elf_m_idle_anim,
			run: assets.tiles.elf_m_run_anim,
		}
	},
	wizardFemale: {
		tiles: {
			idle: assets.tiles.wizzard_f_idle_anim,
			run: assets.tiles.wizzard_f_run_anim,
		}
	},
	wizardMale: {
		tiles: {
			idle: assets.tiles.wizzard_m_idle_anim,
			run: assets.tiles.wizzard_m_run_anim,
		}
	},
	knightFemale: {
		tiles: {
			idle: assets.tiles.knight_f_idle_anim,
			run: assets.tiles.knight_f_run_anim,
		}
	},
	knightMale: {
		tiles: {
			idle: assets.tiles.knight_m_idle_anim,
			run: assets.tiles.knight_m_run_anim,
		}
	},
	lizardFemale: {
		tiles: {
			idle: assets.tiles.lizard_f_idle_anim,
			run: assets.tiles.lizard_f_run_anim,
		}
	},
	lizardMale: {
		tiles: {
			idle: assets.tiles.lizard_m_idle_anim,
			run: assets.tiles.lizard_m_run_anim,
		}
	},
}
export default HEROS