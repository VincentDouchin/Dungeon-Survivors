interface GameState {
	update: Function
	render: Function
	set: (state?: State, options?: any) => void
	unset: (state?: State) => void
}
type Constructor<T> = new (...args: any[]) => T;

type tileName = "wall_top_left" | "wall_top_mid" | "wall_top_right" | "wall_left" | "wall_mid" | "wall_right" | "wall_fountain_top" | "wall_fountain_mid_red_anim" | "wall_fountain_basin_red_anim" | "wall_fountain_mid_blue_anim" | "wall_fountain_basin_blue_anim" | "wall_hole_1" | "wall_hole_2" | "wall_banner_red" | "wall_banner_blue" | "wall_banner_green" | "wall_banner_yellow" | "column_top" | "column_mid" | "coulmn_base" | "column" | "wall_column_top" | "wall_column_mid" | "wall_coulmn_base" | "wall_goo" | "wall_goo_base" | "floor_1" | "floor_2" | "floor_3" | "floor_4" | "floor_5" | "floor_6" | "floor_7" | "floor_8" | "floor_ladder" | "floor_spikes_anim" | "wall_side_top_left" | "wall_side_top_right" | "wall_side_mid_left" | "wall_side_mid_right" | "wall_side_front_left" | "wall_side_front_right" | "wall_corner_top_left" | "wall_corner_top_right" | "wall_corner_left" | "wall_corner_right" | "wall_corner_bottom_left" | "wall_corner_bottom_right" | "wall_corner_front_left" | "wall_corner_front_right" | "wall_inner_corner_l_top_left" | "wall_inner_corner_l_top_rigth" | "wall_inner_corner_mid_left" | "wall_inner_corner_mid_rigth" | "wall_inner_corner_t_top_left" | "wall_inner_corner_t_top_rigth" | "edge" | "hole" | "doors_all" | "doors_frame_left" | "doors_frame_top" | "doors_frame_righ" | "doors_leaf_closed" | "doors_leaf_open" | "chest_empty_open_anim" | "chest_full_open_anim" | "chest_mimic_open_anim" | "flask_big_red" | "flask_big_blue" | "flask_big_green" | "flask_big_yellow" | "flask_red" | "flask_blue" | "flask_green" | "flask_yellow" | "skull" | "crate" | "coin_anim" | "ui_heart_full" | "ui_heart_half" | "ui_heart_empty" | "weapon_knife" | "weapon_rusty_sword" | "weapon_regular_sword" | "weapon_red_gem_sword" | "weapon_big_hammer" | "weapon_hammer" | "weapon_baton_with_spikes" | "weapon_mace" | "weapon_katana" | "weapon_saw_sword" | "weapon_anime_sword" | "weapon_axe" | "weapon_machete" | "weapon_cleaver" | "weapon_duel_sword" | "weapon_knight_sword" | "weapon_golden_sword" | "weapon_lavish_sword" | "weapon_red_magic_staff" | "weapon_green_magic_staff" | "weapon_spear" | "weapon_arrow" | "weapon_bow" | "tiny_zombie_idle_anim" | "tiny_zombie_run_anim" | "goblin_idle_anim" | "goblin_run_anim" | "imp_idle_anim" | "imp_run_anim" | "skelet_idle_anim" | "skelet_run_anim" | "muddy_idle_anim" | "muddy_run_anim" | "swampy_idle_anim" | "swampy_run_anim" | "zombie_idle_anim" | "zombie_run_anim" | "ice_zombie_idle_anim" | "ice_zombie_run_anim" | "masked_orc_idle_anim" | "masked_orc_run_anim" | "orc_warrior_idle_anim" | "orc_warrior_run_anim" | "orc_shaman_idle_anim" | "orc_shaman_run_anim" | "necromancer_idle_anim" | "necromancer_run_anim" | "wogol_idle_anim" | "wogol_run_anim" | "chort_idle_anim" | "chort_run_anim" | "big_zombie_idle_anim" | "big_zombie_run_anim" | "ogre_run_anim" | "big_demon_idle_anim" | "big_demon_run_anim" | "elf_f_idle_anim" | "elf_f_run_anim" | "elf_f_hit_anim" | "elf_m_idle_anim" | "elf_m_run_anim" | "elf_m_hit_anim" | "knight_f_idle_anim" | "knight_f_run_anim" | "knight_f_hit_anim" | "knight_m_idle_anim" | "knight_m_run_anim" | "knight_m_hit_anim" | "wizzard_f_idle_anim" | "wizzard_f_run_anim" | "wizzard_f_hit_anim" | "wizzard_m_idle_anim" | "wizzard_m_run_anim" | "wizzard_m_hit_anim" | "lizard_f_idle_anim" | "lizard_f_run_anim" | "lizard_f_hit_anim" | "lizard_m_idle_anim" | "lizard_m_run_anim" | "lizard_m_hit_anim" | "flame" | "flame_wall" | "flame_background" | "flame_brasier" | "xp" | 'bandit_idle_anim' | "bandit_run_anim" | "centaur_f_idle_anim" | "centaur_f_run_anim" | "centaur_m_idle_anim" | "centaur_m_run_anim" | "wood_elf_m_idle_anim" | "wood_elf_m_run_anim" | "wood_elf_f_idle_anim" | "wood_elf_f_run_anim" | "elf_queen_m_idle_anim" | "elf_queen_m_run_anim" | "elf_king_f_idle_anim" | "fairy_idle_anim" | "ent_idle_anim" | "ent_run_anim" | "mushroom_small_idle_anim" | "mushroom_small_run_anim" | "mushroom_medium_idle_anim" | "mushroom_medium_run_anim" | "mushroom_big_idle_anim" | "mushroom_big_run_anim" | "bear_idle_anim" | "bear_run_anim" | "golem_idle_anim" | "golem_run_anim" | "gnoll_idle_anim" | "gnoll_run_anim" | "gnoll_masked_idle_anim" | "gnoll_masked_run_anim" | "gnoll_grunt_idle_anim" | "gnoll_grunt_run_anim" | "gnoll_brute_idle_anim" | "gnoll_brute_run_anim" | "knight_elite_idle_anim" | "knight_elite_run_anim" | "orc_boss_idle_anim" | "orc_boss_run_anim" | "cleric_1_idle_anim" | "cleric_2_idle_anim" | "cleric_3_idle_anim" | "wise_wizard_idle_anim" | "ranger_idle_anim" | "ranger_run_anim" | "elf_knight_idle_anim" | "elf_knight_run_anim" | "direwolf_idle_anim" | "direwolf_run_anim" | "grass_1" | "grass_2" | "grass_3" | "grass_4" | "grass_5" | "grass_detail_1" | "grass_detail_2" | "grass_detail_3" | "grass_detail_4" | "grass_detail_5" | "grass_detail_6" | "grass_detail_7" | "grass_detail_8" | "bunny_idle_anim" | "bunny_run_anim" | "leprechaun_idle_anim" | "leprechaun_run_anim" | "puppy_idle_anim" | "puppy_run_anim" | "angel_idle_anim" | "angel_run_anim" | "weapon_hammer_projectile"
type skillName = "attack_boost" | "attack_down" | "attack_speed_boost" | "bleeding" | "blinded" | "blinding_light_spell" | "confused" | "counterspell" | "critical_boost" | "cursed_(disarmed+silenced)" | "defense_boost" | "defense_down" | "disarmed" | "divine_protection_spell" | "element_boost" | "enemy_spawn_down" | "exp_boost" | "fire_spell" | "fire_spell_2" | "fortify_spell" | "frenzy_spell_(critical_booster)" | "frozen" | "ghost_form_(physical_damage_immunity)" | "glow" | "healing_spell" | "hungry" | "ice_spell" | "knockback_boost" | "knockback_resistance" | "lightning_spell" | "lucky_boost" | "magic_amplification" | "mana_replenish" | "negative_status_resistance" | "on_fire_(burning)" | "paralyzed" | "poison_dagger" | "poisoned" | "regeneration" | "silenced" | "sleeping" | "slowed" | "stunned" | "summoning_spell" | "swiftness" | "teleportation_spell" | "thorn_vine_spell" | "water_spell"
type npcTileName = "Alchemist_Idle" | "Alchemist_Walk" | "Archer_Idle" | "Archer_Walk" | "Bishop_Idle + Walk" | "Blacksmith_Idle" | "Blacksmith_Walk" | "Butcher_Idle" | "Butcher_Walk" | "EliteKnight_Idle" | "EliteKnight_Walk" | "Executioner_Idle" | "Executioner_Walk" | "FatNun_Idle + Walk" | "HeavyKnight_Idle" | "HeavyKnight_Walk" | "Herald_Idle" | "Herald_Walk" | "King_Idle" | "King_Walk" | "Knight_Idle" | "Knight_Walk" | "LargeEliteKnight_Idle" | "LargeEliteKnight_Walk" | "LargeKnight_Idle" | "LargeKnight_Walk" | "Mage_Idle" | "Mage_Walk" | "MagicShopKeeper_Idle + Walk" | "Merchant_Idle" | "Merchant_Walk" | "MountainKing_Idle + Walk" | "NormalNun_Idle + Walk" | "Princess_Idle" | "Princess_Walk" | "Queen_Idle" | "Queen_Walk" | "SkinnyNun_Idle + Walk" | "Thief_Idle" | "Thief_Walk" | "Townsfolk_F_Idle" | "Townsfolk_F_Walk" | "Townsfolk_M_Idle" | "Townsfolk_M_Walk" | "Templar_Idle" | "Templar_Walk"
type DamageType = string

type WaveDefinition = Array<EnemyType, number, number>

interface TouchCoord {
	x: number
	y: number
	clientX: number
	clientY: number
	uiObjects: number[]
	objects: number[]
	identifier: number | null
}
interface TiledMapData {
	width: number;
	height: number;
	tilewidth: number;
	tileheight: number;
	layers: TiledLayer[];
	tilesets: Array<{ firstgid: number, source: string }>;
}

interface TiledLayer {
	name: string;
	width?: number;
	height?: number;
	data?: number[];
	id: number
	x: number
	y: number
	visible: boolean
	type: string
	opacity: number
	draworder?: string
	objects?: TiledObject[]
}

interface TiledTileset {
	name: string;
	tilewidth: number;
	tileheight: number;
	spacing: number;
	margin: number;
	image: string;
	imageWidth: number;
	imageHeight: number;
	tilecount: number;
	columns: number
}
interface TiledMapTileset extends TiledTileset {
	firstgid: number
	img: HTMLImageElement
}
interface TiledObject {
	class: string
	height: number
	id: number
	name: string
	properties: TiledProperty[]
	rotation: number
	visible: boolean
	width: number
	x: number
	y: number
}
interface TiledProperty {
	name: string
	type: string
	value: any
}

type nodeDirection = 'left' | 'right' | 'top'
