import AssetManager from "../Globals/AssetManager"

const HEROS: Record<string, HeroDefinition> = {
	elfFemale: {
		tiles: {
			idle: AssetManager.tiles.elf_f_idle_anim,
			run: AssetManager.tiles.elf_f_idle_anim,
		}
	},
	elfMale: {
		tiles: {
			idle: AssetManager.tiles.elf_m_idle_anim,
			run: AssetManager.tiles.elf_m_run_anim,
		}
	},
	wizardFemale: {
		tiles: {
			idle: AssetManager.tiles.wizzard_f_idle_anim,
			run: AssetManager.tiles.wizzard_f_run_anim,
		}
	},
	wizardMale: {
		tiles: {
			idle: AssetManager.tiles.wizzard_m_idle_anim,
			run: AssetManager.tiles.wizzard_m_run_anim,
		}
	},
	knightFemale: {
		tiles: {
			idle: AssetManager.tiles.knight_f_idle_anim,
			run: AssetManager.tiles.knight_f_run_anim,
		}
	},
	knightMale: {
		tiles: {
			idle: AssetManager.tiles.knight_m_idle_anim,
			run: AssetManager.tiles.knight_m_run_anim,
		}
	},
	lizardFemale: {
		tiles: {
			idle: AssetManager.tiles.lizard_f_idle_anim,
			run: AssetManager.tiles.lizard_f_run_anim,
		}
	},
	lizardMale: {
		tiles: {
			idle: AssetManager.tiles.lizard_m_idle_anim,
			run: AssetManager.tiles.lizard_m_run_anim,
		}
	},
}
export default HEROS