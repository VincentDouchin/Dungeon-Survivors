import BODYSIZES, { bodySize } from "./BodySizes"

import Tile from "../Utils/Tile"
import { assets } from "../Globals/Initialize"

export interface EnemyType {
	tiles: Record<string, Tile>
	health: number,
	size: bodySize,
}
const Enemies: Record<string, EnemyType> = {
	goblin: {
		tiles: {
			idle: assets.tiles.goblin_idle_anim,
			run: assets.tiles.goblin_run_anim
		},
		health: 10,
		size: BODYSIZES.small
	},
	orc: {
		tiles: {
			idle: assets.tiles.orc_warrior_idle_anim,
			run: assets.tiles.orc_warrior_run_anim
		},
		health: 30,
		size: BODYSIZES.normal
	},
	orcShaman: {
		tiles: {
			idle: assets.tiles.orc_shaman_idle_anim,
			run: assets.tiles.orc_shaman_run_anim
		},
		health: 50,
		size: BODYSIZES.normal
	},
	orcMasked: {
		tiles: {
			idle: assets.tiles.masked_orc_idle_anim,
			run: assets.tiles.masked_orc_run_anim,
		},
		health: 80,
		size: BODYSIZES.normal
	},
	orcBig: {
		tiles: {
			idle: assets.tiles.big_zombie_idle_anim,
			run: assets.tiles.big_zombie_run_anim,
		},
		health: 300,
		size: BODYSIZES.big
	},

	ogre: {
		tiles: {
			idle: assets.tiles.big_zombie_idle_anim,
			run: assets.tiles.big_zombie_run_anim,
		},
		health: 300,
		size: BODYSIZES.big
	},
	gnoll: {
		tiles: {
			idle: assets.tiles.gnoll_grunt_idle_anim,
			run: assets.tiles.gnoll_grunt_run_anim
		},
		health: 20,
		size: BODYSIZES.normal
	},
	wogol: {
		tiles: {
			idle: assets.tiles.wogol_idle_anim,
			run: assets.tiles.wogol_run_anim
		},
		health: 20,
		size: BODYSIZES.normal
	},
	chort: {
		tiles: {
			idle: assets.tiles.chort_idle_anim,
			run: assets.tiles.chort_run_anim
		},
		health: 20,
		size: BODYSIZES.normal
	},
	necromancer: {
		tiles: {
			idle: assets.tiles.necromancer_idle_anim,
			run: assets.tiles.necromancer_run_anim
		},
		health: 20,
		size: BODYSIZES.normal
	},
	demonBig: {
		tiles: {
			idle: assets.tiles.big_demon_idle_anim,
			run: assets.tiles.big_demon_run_anim
		},
		health: 300,
		size: BODYSIZES.big
	},
	imp: {
		tiles: {
			idle: assets.tiles.imp_idle_anim,
			run: assets.tiles.imp_run_anim
		},
		health: 10,
		size: BODYSIZES.small
	},
	zombieSmall: {
		tiles: {
			idle: assets.tiles.tiny_zombie_idle_anim,
			run: assets.tiles.tiny_zombie_run_anim
		},
		health: 10,
		size: BODYSIZES.small
	},
	skeleton: {
		tiles: {
			idle: assets.tiles.skelet_idle_anim,
			run: assets.tiles.skelet_run_anim
		},
		health: 20,
		size: BODYSIZES.normal
	},
	muddy: {
		tiles: {
			idle: assets.tiles.muddy_idle_anim,
			run: assets.tiles.muddy_run_anim
		},
		health: 30,
		size: BODYSIZES.square
	},
	swampy: {
		tiles: {
			idle: assets.tiles.swampy_idle_anim,
			run: assets.tiles.swampy_run_anim
		},
		health: 30,
		size: BODYSIZES.square
	},
	zombie: {
		tiles: {
			idle: assets.tiles.zombie_idle_anim,
			run: assets.tiles.zombie_run_anim
		},
		health: 40,
		size: BODYSIZES.normal
	},
	iceZombie: {
		tiles: {
			idle: assets.tiles.ice_zombie_idle_anim,
			run: assets.tiles.ice_zombie_run_anim
		},
		health: 40,
		size: BODYSIZES.normal
	},
	bandit: {
		tiles: {
			idle: assets.tiles.bandit_idle_anim,
			run: assets.tiles.bandit_run_anim
		},
		health: 40,
		size: BODYSIZES.normal
	},
	centaurFemale: {
		tiles: {
			idle: assets.tiles.centaur_f_idle_anim,
			run: assets.tiles.centaur_f_run_anim
		},
		health: 40,
		size: BODYSIZES.centaur
	},
	centaurMale: {
		tiles: {
			idle: assets.tiles.centaur_m_idle_anim,
			run: assets.tiles.centaur_m_run_anim
		},
		health: 40,
		size: BODYSIZES.centaur
	},
	mushroomSmall: {
		tiles: {
			idle: assets.tiles.mushroom_small_idle_anim,
			run: assets.tiles.mushroom_small_run_anim
		},
		health: 10,
		size: BODYSIZES.small
	},
	mushroomMedium: {
		tiles: {
			idle: assets.tiles.mushroom_medium_idle_anim,
			run: assets.tiles.mushroom_medium_run_anim
		},
		health: 20,
		size: BODYSIZES.normal
	},
	mushroomBig: {
		tiles: {
			idle: assets.tiles.mushroom_big_idle_anim,
			run: assets.tiles.mushroom_big_run_anim
		},
		health: 20,
		size: BODYSIZES.big
	},
	bear: {
		tiles: {
			idle: assets.tiles.bear_idle_anim,
			run: assets.tiles.bear_run_anim
		},
		health: 200,
		size: BODYSIZES.massive
	},
	golem: {
		tiles: {
			idle: assets.tiles.golem_idle_anim,
			run: assets.tiles.golem_run_anim
		},
		health: 500,
		size: BODYSIZES.giant
	},
	direwolf: {
		tiles: {
			idle: assets.tiles.direwolf_idle_anim,
			run: assets.tiles.direwolf_run_anim
		},
		health: 30,
		size: BODYSIZES.wide
	},
	bunny: {
		tiles: {
			idle: assets.tiles.bunny_idle_anim,
			run: assets.tiles.bunny_run_anim
		},
		health: 10,
		size: BODYSIZES.small

	}


}
export default Enemies