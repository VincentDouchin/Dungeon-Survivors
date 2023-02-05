import BODYSIZES, { bodySize } from "./BodySizes"
import WEAPONS, { WeaponDefinition } from "./Weapons"

import Tile from "../Utils/Tile"
import { assets } from "../Globals/Initialize"

export interface EnemyType {
	tiles: Record<string, Tile>
	health: number,
	size: bodySize,
	speed: number,
	berserk?: boolean
	damage: number,
	weapon?: WeaponDefinition,
	charger?: boolean

}
const Enemies: Record<string, EnemyType> = {
	// ! ORCS
	goblin: {
		tiles: {
			idle: assets.tiles.goblin_idle_anim,
			run: assets.tiles.goblin_run_anim
		},
		health: 10,
		size: BODYSIZES.small,
		speed: 1,
		damage: 1,
	},
	orc: {
		tiles: {
			idle: assets.tiles.orc_warrior_idle_anim,
			run: assets.tiles.orc_warrior_run_anim
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	orcShaman: {
		tiles: {
			idle: assets.tiles.orc_shaman_idle_anim,
			run: assets.tiles.orc_shaman_run_anim
		},
		health: 20,
		size: BODYSIZES.normal,
		speed: 1.5,
		damage: 3,
		weapon: WEAPONS.bone
	},
	orcMasked: {
		tiles: {
			idle: assets.tiles.masked_orc_idle_anim,
			run: assets.tiles.masked_orc_run_anim,
		},
		health: 400,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 3,
		charger: true
	},
	orcBig: {
		tiles: {
			idle: assets.tiles.orc_boss_idle_anim,
			run: assets.tiles.orc_boss_run_anim,
		},
		health: 200,
		size: BODYSIZES.big,
		speed: 10,
		damage: 10,
		charger: true
	},


	// ! DEMONS
	imp: {
		tiles: {
			idle: assets.tiles.imp_idle_anim,
			run: assets.tiles.imp_run_anim
		},
		health: 10,
		size: BODYSIZES.small,
		speed: 1,
		damage: 1
	},
	wogol: {
		tiles: {
			idle: assets.tiles.wogol_idle_anim,
			run: assets.tiles.wogol_run_anim
		},
		health: 20,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2

	},
	chort: {
		tiles: {
			idle: assets.tiles.chort_idle_anim,
			run: assets.tiles.chort_run_anim
		},
		health: 20,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 3,
		charger: true
	},
	demonBig: {
		tiles: {
			idle: assets.tiles.big_demon_idle_anim,
			run: assets.tiles.big_demon_run_anim
		},
		health: 300,
		size: BODYSIZES.big,
		speed: 10,
		damage: 10,
		charger: true
	},
	// !UNDEAD 
	zombieSmall: {
		tiles: {
			idle: assets.tiles.tiny_zombie_idle_anim,
			run: assets.tiles.tiny_zombie_run_anim
		},
		health: 10,
		size: BODYSIZES.small,
		speed: 1,
		damage: 1
	},
	skeleton: {
		tiles: {
			idle: assets.tiles.skelet_idle_anim,
			run: assets.tiles.skelet_run_anim
		},
		health: 20,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 3
	},
	muddy: {
		tiles: {
			idle: assets.tiles.muddy_idle_anim,
			run: assets.tiles.muddy_run_anim
		},
		health: 30,
		size: BODYSIZES.square,
		speed: 2,
		damage: 2
	},
	swampy: {
		tiles: {
			idle: assets.tiles.swampy_idle_anim,
			run: assets.tiles.swampy_run_anim
		},
		health: 30,
		size: BODYSIZES.square,
		speed: 2,
		damage: 2
	},
	necromancer: {
		tiles: {
			idle: assets.tiles.necromancer_idle_anim,
			run: assets.tiles.necromancer_run_anim
		},
		health: 20,
		size: BODYSIZES.normal,
		speed: 1.5,
		damage: 3,
		weapon: WEAPONS.fireball

	},
	zombie: {
		tiles: {
			idle: assets.tiles.zombie_idle_anim,
			run: assets.tiles.zombie_run_anim
		},
		health: 40,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2,

	},
	iceZombie: {
		tiles: {
			idle: assets.tiles.ice_zombie_idle_anim,
			run: assets.tiles.ice_zombie_run_anim
		},
		health: 40,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 4
	},
	ogre: {
		tiles: {
			idle: assets.tiles.big_zombie_idle_anim,
			run: assets.tiles.big_zombie_run_anim,
		},
		health: 300,
		size: BODYSIZES.big,
		speed: 10,
		damage: 10,
		charger: true
	},
	// ! HUMANS
	bandit: {
		tiles: {
			idle: assets.tiles.bandit_idle_anim,
			run: assets.tiles.bandit_run_anim
		},
		health: 40,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	// ! GNOLL
	puppy: {
		tiles: {
			idle: assets.tiles.puppy_idle_anim,
			run: assets.tiles.puppy_run_anim
		},
		health: 10,
		size: BODYSIZES.small,
		speed: 1,
		damage: 1
	},
	gnoll: {
		tiles: {
			idle: assets.tiles.gnoll_grunt_idle_anim,
			run: assets.tiles.gnoll_grunt_run_anim
		},
		health: 20,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	gnollBrute: {
		tiles: {
			idle: assets.tiles.gnoll_brute_idle_anim,
			run: assets.tiles.gnoll_brute_run_anim
		},
		health: 20,
		size: BODYSIZES.normal,
		speed: 1.5,
		damage: 3
	},
	gnollMasked: {
		tiles: {
			idle: assets.tiles.gnoll_masked_idle_anim,
			run: assets.tiles.gnoll_brute_run_anim,
		},
		health: 40,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 3,
		charger: true
	},
	// ! FOREST
	bunny: {
		tiles: {
			idle: assets.tiles.bunny_idle_anim,
			run: assets.tiles.bunny_run_anim
		},
		health: 10,
		size: BODYSIZES.small,
		speed: 1,
		damage: 1
	},
	centaurFemale: {
		tiles: {
			idle: assets.tiles.centaur_f_idle_anim,
			run: assets.tiles.centaur_f_run_anim
		},
		health: 25,
		size: BODYSIZES.centaur,
		speed: 4,
		damage: 2
	},
	centaurMale: {
		tiles: {
			idle: assets.tiles.centaur_m_idle_anim,
			run: assets.tiles.centaur_m_run_anim
		},
		health: 25,
		size: BODYSIZES.centaur,
		speed: 4,
		damage: 2
	},
	mushroomSmall: {
		tiles: {
			idle: assets.tiles.mushroom_small_idle_anim,
			run: assets.tiles.mushroom_small_run_anim
		},
		health: 10,
		size: BODYSIZES.small,
		speed: 1,
		damage: 1
	},
	mushroomMedium: {
		tiles: {
			idle: assets.tiles.mushroom_medium_idle_anim,
			run: assets.tiles.mushroom_medium_run_anim
		},
		health: 20,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	mushroomBig: {
		tiles: {
			idle: assets.tiles.mushroom_big_idle_anim,
			run: assets.tiles.mushroom_big_run_anim
		},
		health: 20,
		size: BODYSIZES.big,
		speed: 10,
		damage: 5
	},
	bear: {
		tiles: {
			idle: assets.tiles.bear_idle_anim,
			run: assets.tiles.bear_run_anim
		},
		health: 60,
		size: BODYSIZES.massive,
		speed: 7,
		damage: 4,
		charger: true
	},
	direwolf: {
		tiles: {
			idle: assets.tiles.direwolf_idle_anim,
			run: assets.tiles.direwolf_run_anim
		},
		health: 30,
		size: BODYSIZES.wide,
		speed: 3,
		damage: 2
	},
	golem: {
		tiles: {
			idle: assets.tiles.golem_idle_anim,
			run: assets.tiles.golem_run_anim
		},
		health: 500,
		size: BODYSIZES.giant,
		speed: 100,
		damage: 8
	},
	//! ELVES
	woodElfMale: {
		tiles: {
			idle: assets.tiles.wood_elf_m_idle_anim,
			run: assets.tiles.wood_elf_m_run_anim
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	woodElfFemale: {
		tiles: {
			idle: assets.tiles.wood_elf_f_idle_anim,
			run: assets.tiles.wood_elf_f_run_anim
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	elfQueen: {
		tiles: {
			idle: assets.tiles.elf_queen_m_idle_anim,
			run: assets.tiles.elf_queen_m_run_anim
		},
		health: 30,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 5
	},
	elfKing: {
		tiles: {
			idle: assets.tiles.elf_king_f_idle_anim,
		},
		health: 10,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 5
	},
	leprechaun: {
		tiles: {
			idle: assets.tiles.leprechaun_idle_anim,
			run: assets.tiles.leprechaun_run_anim
		},
		health: 10,
		size: BODYSIZES.small,
		speed: 1,
		damage: 1
	},
	elfRanger: {
		tiles: {
			idle: assets.tiles.ranger_idle_anim,
			run: assets.tiles.ranger_run_anim
		},
		health: 30,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2,
		weapon: WEAPONS.enemyBow
	},
	elfKnight: {
		tiles: {
			idle: assets.tiles.elf_knight_idle_anim,
			run: assets.tiles.elf_knight_run_anim
		},
		health: 30,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 3
	},
	// ! VILLAGERS
	villagerMale: {
		tiles: {
			idle: assets.npc.Townsfolk_M_Idle,
			run: assets.npc.Townsfolk_M_Walk
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 1
	},
	villagerFemale: {
		tiles: {
			idle: assets.npc.Townsfolk_F_Idle,
			run: assets.npc.Townsfolk_F_Walk
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 1
	},
	butcher: {
		tiles: {
			idle: assets.npc.Butcher_Idle,
			run: assets.npc.Butcher_Walk
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	blacksmith: {
		tiles: {
			idle: assets.npc.Blacksmith_Idle,
			run: assets.npc.Blacksmith_Walk
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	alchemist: {
		tiles: {
			idle: assets.npc.Alchemist_Idle,
			run: assets.npc.Archer_Walk,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 3
	},
	shopKeeper: {
		tiles: {
			idle: assets.npc["MagicShopKeeper_Idle + Walk"],
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	herald: {
		tiles: {
			idle: assets.npc.Herald_Idle,
			run: assets.npc.Herald_Walk,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	thief: {
		tiles: {
			idle: assets.npc.Thief_Idle,
			run: assets.npc.Thief_Walk,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	mage: {
		tiles: {
			idle: assets.npc.Mage_Idle,
			run: assets.npc.Mage_Walk,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 3
	},
	archer: {
		tiles: {
			idle: assets.npc.Archer_Idle,
			run: assets.npc.Archer_Walk,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 3
	},
	executioner: {
		tiles: {
			idle: assets.npc.Executioner_Idle,
			run: assets.npc.Executioner_Walk,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 5
	},
	// ! KINGSGUARD
	knight: {
		tiles: {
			idle: assets.npc.Knight_Idle,
			run: assets.npc.Knight_Walk,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	knightFat: {
		tiles: {
			idle: assets.npc.HeavyKnight_Idle,
			run: assets.npc.HeavyKnight_Walk,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 3
	},
	knightElite: {
		tiles: {
			idle: assets.npc.EliteKnight_Idle,
			run: assets.npc.EliteKnight_Walk,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 4
	},
	knightEliteLarge: {
		tiles: {
			idle: assets.npc.LargeEliteKnight_Idle,
			run: assets.npc.LargeEliteKnight_Walk,
		},
		health: 15,
		size: BODYSIZES.big,
		speed: 5,
		damage: 5
	},
	king: {
		tiles: {
			idle: assets.npc.King_Idle,
			run: assets.npc.King_Walk,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 5
	},
	queen: {
		tiles: {
			idle: assets.npc.Queen_Idle,
			run: assets.npc.Queen_Walk,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 4
	},
	kingOld: {
		tiles: {
			idle: assets.npc["MountainKing_Idle + Walk"],
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 4
	},
	princess: {
		tiles: {
			idle: assets.npc.Princess_Idle,
			run: assets.npc.Princess_Walk,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 4
	},
	// ! PRIESTS
	clericFat: {
		tiles: {
			idle: assets.tiles.cleric_1_idle_anim,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	clericNormal: {
		tiles: {
			idle: assets.tiles.cleric_2_idle_anim,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	clericSkinny: {
		tiles: {
			idle: assets.tiles.cleric_3_idle_anim,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	nunFat: {
		tiles: {
			idle: assets.npc["FatNun_Idle + Walk"],
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	nunNormal: {
		tiles: {
			idle: assets.npc["NormalNun_Idle + Walk"],
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	nunSkinny: {
		tiles: {
			idle: assets.npc["SkinnyNun_Idle + Walk"],
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	bishop: {
		tiles: {
			idle: assets.npc["Bishop_Idle + Walk"],
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 4
	},
	angel: {
		tiles: {
			idle: assets.tiles.angel_idle_anim,
			run: assets.tiles.angel_run_anim
		},
		health: 10,
		size: BODYSIZES.small,
		speed: 1,
		damage: 1
	},



}
export default Enemies