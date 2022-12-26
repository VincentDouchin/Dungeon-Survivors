import AssetManager from "../Globals/AssetManager"
const Enemies: Record<string, EnemyType> = {
	orc: {
		tiles: {
			idle: AssetManager.tiles.orc_warrior_idle_anim,
			run: AssetManager.tiles.orc_warrior_run_anim
		},
		health: 10,
	},
	orcShaman: {
		tiles: {
			idle: AssetManager.tiles.orc_shaman_idle_anim,
			run: AssetManager.tiles.orc_shaman_run_anim
		},
		health: 20,
	},
	orcMasked: {
		tiles: {
			idle: AssetManager.tiles.masked_orc_idle_anim,
			run: AssetManager.tiles.masked_orc_run_anim,
		},
		health: 30
	},
	zombieBig: {
		tiles: {
			idle: AssetManager.tiles.big_zombie_idle_anim,
			run: AssetManager.tiles.big_zombie_run_anim,
		},
		health: 100
	}

}
export default Enemies