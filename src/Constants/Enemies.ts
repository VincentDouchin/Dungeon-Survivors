import { assets } from "../Globals/Initialize"
const Enemies: Record<string, EnemyType> = {
	orc: {
		tiles: {
			idle: assets.tiles.orc_warrior_idle_anim,
			run: assets.tiles.orc_warrior_run_anim
		},
		health: 30,
	},
	orcShaman: {
		tiles: {
			idle: assets.tiles.orc_shaman_idle_anim,
			run: assets.tiles.orc_shaman_run_anim
		},
		health: 50,
	},
	orcMasked: {
		tiles: {
			idle: assets.tiles.masked_orc_idle_anim,
			run: assets.tiles.masked_orc_run_anim,
		},
		health: 80
	},
	goblin: {
		tiles: {
			idle: assets.tiles.goblin_idle_anim,
			run: assets.tiles.goblin_run_anim
		},
		health: 10
	},
	zombieBig: {
		tiles: {
			idle: assets.tiles.big_zombie_idle_anim,
			run: assets.tiles.big_zombie_run_anim,
		},
		health: 300
	}

}
export default Enemies