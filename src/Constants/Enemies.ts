import AssetManager from "../Globals/AssetManager"
const Enemies: Record<string, EnemyType> = {
	orc: {
		tiles: {
			idle: AssetManager.tiles.orc_warrior_idle_anim,
			run: AssetManager.tiles.orc_warrior_run_anim
		},
		health: 30,
	},
	orcShaman: {
		tiles: {
			idle: AssetManager.tiles.orc_shaman_idle_anim,
			run: AssetManager.tiles.orc_shaman_run_anim
		},
		health: 50,
	},
	orcMasked: {
		tiles: {
			idle: AssetManager.tiles.masked_orc_idle_anim,
			run: AssetManager.tiles.masked_orc_run_anim,
		},
		health: 80
	},
	goblin: {
		tiles: {
			idle: AssetManager.tiles.goblin_idle_anim,
			run: AssetManager.tiles.goblin_run_anim
		},
		health: 10
	},
	zombieBig: {
		tiles: {
			idle: AssetManager.tiles.big_zombie_idle_anim,
			run: AssetManager.tiles.big_zombie_run_anim,
		},
		health: 300
	}

}
export default Enemies