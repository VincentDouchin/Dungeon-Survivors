import BODYSIZES, { bodySize } from "./BodySizes"
import WEAPONS, { WeaponDefinition } from "./Weapons"

import Tile from "../Utils/Tile"
import assets from "../Globals/Assets"

export interface EnemyType {
	tiles: Record<string, Tile>
	health: number,
	size: bodySize,
	speed: number,
	berserk?: boolean
	damage: number,
	weapon?: WeaponDefinition,
	charger?: boolean
	boss?: boolean
	xp?: number
	minion?: {
		type: EnemyType,
		delay: number,
		distance: number
	}

}
const Enemies: Record<string, EnemyType> = {
	// ! ORCS
	goblin: {
		tiles: {
			idle: assets.characters.orcSmallWalk,
			run: assets.characters.orcSmallRun
		},
		health: 11,
		size: BODYSIZES.small,
		speed: 1,
		damage: 1,
	},
	orc: {
		tiles: {
			idle: assets.characters.orcWalk,
			run: assets.characters.orcRun
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	orcShaman: {
		tiles: {
			idle: assets.characters.orcShamanWalk,
			run: assets.characters.orcShamanRun
		},
		health: 20,
		size: BODYSIZES.normal,
		speed: 1.5,
		damage: 3,
		weapon: WEAPONS.bone,
		xp: 2
	},
	orcMasked: {
		tiles: {
			idle: assets.characters.orcMaskedWalk,
			run: assets.characters.orcMaskedRun,
		},
		health: 40,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 3,
		charger: true,
		xp: 2
	},
	orcBig: {
		tiles: {
			idle: assets.characters.orcBigWalk,
			run: assets.characters.orcBigRun,
		},
		health: 300,
		size: BODYSIZES.big,
		speed: 20,
		damage: 5,
		charger: true,
		boss: true,
		xp: 10
	},
	orcBigPatch: {
		tiles: {
			idle: assets.characters.orcBigPatchWalk,
			run: assets.characters.orcBigPatchRun,
		},
		health: 300,
		size: BODYSIZES.big,
		speed: 20,
		damage: 5,
		boss: true,
		xp: 10
	},


	// ! DEMONS
	imp: {
		tiles: {
			idle: assets.characters.impWalk,
			run: assets.characters.impRun
		},
		health: 11,
		size: BODYSIZES.small,
		speed: 1,
		damage: 1
	},
	wogol: {
		tiles: {
			idle: assets.characters.wogolWalk,
			run: assets.characters.wogolRun
		},
		health: 20,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2

	},
	chort: {
		tiles: {
			idle: assets.characters.chortWalk,
			run: assets.characters.chortRun
		},
		health: 20,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 3,
		charger: true,
		xp: 2
	},
	demonBig: {
		tiles: {
			idle: assets.characters.demonBigWalk,
			run: assets.characters.demonBigRun
		},
		health: 500,
		size: BODYSIZES.big,
		speed: 10,
		damage: 5,
		charger: true,
		boss: true,
		weapon: WEAPONS.fireball,
		xp: 20,
		get minion() {
			return {
				type: Enemies.imp,
				distance: 50,
				delay: 120,
			}
		}
	},
	// !UNDEAD 
	zombieSmall: {
		tiles: {
			idle: assets.characters.zombieSmallWalk,
			run: assets.characters.zombieSmallRun
		},
		health: 11,
		size: BODYSIZES.small,
		speed: 1,
		damage: 1
	},
	skeleton: {
		tiles: {
			idle: assets.characters.skeletonWalk,
			run: assets.characters.skeletonRun
		},
		health: 20,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 3,
		xp: 2
	},
	muddy: {
		tiles: {
			idle: assets.characters.muddy,
			run: assets.characters.muddy
		},
		health: 30,
		size: BODYSIZES.square,
		speed: 2,
		damage: 2,
		xp: 2
	},
	swampy: {
		tiles: {
			idle: assets.characters.slimy,
			run: assets.characters.slimy
		},
		health: 30,
		size: BODYSIZES.square,
		speed: 2,
		damage: 2,
		xp: 2
	},
	necromancer: {
		tiles: {
			idle: assets.characters.necromancerWalk,
			run: assets.characters.necromancerRun
		},
		health: 20,
		size: BODYSIZES.normal,
		speed: 1.5,
		damage: 3,
		weapon: WEAPONS.fireball,
		xp: 3

	},
	zombie: {
		tiles: {
			idle: assets.characters.zombie,
			run: assets.characters.zombie
		},
		health: 30,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2,

	},
	iceZombie: {
		tiles: {
			idle: assets.characters.icyZombie,
			run: assets.characters.icyZombie
		},
		health: 40,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 4,
		weapon: WEAPONS.iceSpike
	},
	ogre: {
		tiles: {
			idle: assets.characters.zombieBigWalk,
			run: assets.characters.zombieBigRun,
		},
		health: 400,
		size: BODYSIZES.big,
		speed: 10,
		damage: 2,
		charger: true,
		boss: true,
		xp: 20,
		get minion() {
			return {
				type: Enemies.zombieSmall,
				distance: 50,
				delay: 180,
			}
		}
	},
	// ! HUMANS
	bandit: {
		tiles: {
			idle: assets.characters.banditWalk,
			run: assets.characters.banditRun
		},
		health: 40,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	// // ! GNOLL
	// puppy: {
	// 	tiles: {
	// 		idle: assets.characters.puppy_idle_anim,
	// 		run: assets.characters.puppy_run_anim
	// 	},
	// 	health: 11,
	// 	size: BODYSIZES.small,
	// 	speed: 1,
	// 	damage: 1
	// },
	// gnoll: {
	// 	tiles: {
	// 		idle: assets.characters.gnoll_grunt_idle_anim,
	// 		run: assets.characters.gnoll_grunt_run_anim
	// 	},
	// 	health: 20,
	// 	size: BODYSIZES.normal,
	// 	speed: 2,
	// 	damage: 2
	// },
	// gnollBrute: {
	// 	tiles: {
	// 		idle: assets.characters.gnoll_brute_idle_anim,
	// 		run: assets.characters.gnoll_brute_run_anim
	// 	},
	// 	health: 20,
	// 	size: BODYSIZES.normal,
	// 	speed: 1.5,
	// 	damage: 3
	// },
	// gnollMasked: {
	// 	tiles: {
	// 		idle: assets.characters.gnoll_masked_idle_anim,
	// 		run: assets.characters.gnoll_brute_run_anim,
	// 	},
	// 	health: 40,
	// 	size: BODYSIZES.normal,
	// 	speed: 2,
	// 	damage: 3,
	// 	charger: true,
	// 	xp: 2
	// },
	// ! FOREST
	bunny: {
		tiles: {
			idle: assets.characters.bunnyWalk,
			run: assets.characters.bunnyRun
		},
		health: 11,
		size: BODYSIZES.small,
		speed: 1,
		damage: 1
	},
	fox: {
		tiles: {
			idle: assets.characters.foxWalk,
			run: assets.characters.foxRun
		},
		health: 20,
		size: BODYSIZES.wide,
		speed: 3,
		damage: 2
	},
	centaurFemale: {
		tiles: {
			idle: assets.characters.centaurFemaleWalk,
			run: assets.characters.centaurFemaleRun
		},
		health: 25,
		size: BODYSIZES.centaur,
		speed: 4,
		damage: 2
	},
	centaurMale: {
		tiles: {
			idle: assets.characters.centaurMaleWalk,
			run: assets.characters.centaurMaleRun
		},
		health: 25,
		size: BODYSIZES.centaur,
		speed: 4,
		damage: 2
	},
	mushroomSmall: {
		tiles: {
			idle: assets.characters.mushroomSmallWalk,
			run: assets.characters.mushroomSmallRun
		},
		health: 11,
		size: BODYSIZES.small,
		speed: 1,
		damage: 1
	},
	mushroomMedium: {
		tiles: {
			idle: assets.characters.mushroomNormalWalk,
			run: assets.characters.mushroomNormalRun
		},
		health: 20,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	mushroomBig: {
		tiles: {
			idle: assets.characters.mushroomBigWalk,
			run: assets.characters.mushroomBigRun
		},
		health: 300,
		size: BODYSIZES.big,
		speed: 20,
		damage: 5,
		charger: true,
		boss: true,
		xp: 20,
		get minion() {
			return {
				type: Enemies.mushroomSmall,
				distance: 50,
				delay: 180,
			}
		}
	},
	bear: {
		tiles: {
			idle: assets.characters.bearWalk,
			run: assets.characters.bearRun
		},
		health: 60,
		size: BODYSIZES.massive,
		speed: 6,
		damage: 3,
		charger: true,
		xp: 3
	},
	direwolf: {
		tiles: {
			idle: assets.characters.wolfWalk,
			run: assets.characters.wolfRun
		},
		health: 30,
		size: BODYSIZES.wide,
		speed: 3,
		damage: 2
	},
	// golem: {
	// 	tiles: {
	// 		idle: assets.characters.golem_idle_anim,
	// 		run: assets.characters.golem_run_anim
	// 	},
	// 	health: 500,
	// 	size: BODYSIZES.giant,
	// 	speed: 15,
	// 	damage: 8
	// },
	//! ELVES
	woodElfMale: {
		tiles: {
			idle: assets.characters.elfVillagerMaleWalk,
			run: assets.characters.elfVillagerMaleRun
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	woodElfFemale: {
		tiles: {
			idle: assets.characters.elfVillagerFemaleWalk,
			run: assets.characters.elfVillagerFemaleRun
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	elfQueen: {
		tiles: {
			idle: assets.characters.elfQueenWalk,
			run: assets.characters.elfQueenRun
		},
		health: 200,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 5,
		xp: 10
	},
	elfKing: {
		tiles: {
			idle: assets.characters.elfKing,
		},
		health: 200,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 5,
		xp: 10
	},
	leprechaun: {
		tiles: {
			idle: assets.characters.leprechaunWalk,
			run: assets.characters.leprechaunRun
		},
		health: 11,
		size: BODYSIZES.small,
		speed: 1,
		damage: 1
	},
	elfRanger: {
		tiles: {
			idle: assets.characters.elfArcherWalk,
			run: assets.characters.elfArcherRun
		},
		health: 30,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2,
		weapon: WEAPONS.enemyBow,
		xp: 2
	},
	elfKnight: {
		tiles: {
			idle: assets.characters.elfKnightWalk,
			run: assets.characters.elfKnightRun
		},
		health: 30,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 3,
		xp: 2
	},
	goldenKnight: {
		tiles: {
			idle: assets.characters.goldenKnightWalk,
			run: assets.characters.goldenKnightRun
		},
		health: 50,
		size: BODYSIZES.big,
		speed: 4,
		damage: 5,
		xp: 5
	},
	// ! VILLAGERS
	villagerMale: {
		tiles: {
			idle: assets.characters.villagerMaleWalk,
			run: assets.characters.villagerMaleRun
		},
		health: 13,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 1
	},
	villagerFemale: {
		tiles: {
			idle: assets.characters.villagerFemaleWalk,
			run: assets.characters.villagerFemaleRun
		},
		health: 13,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 1
	},
	butcher: {
		tiles: {
			idle: assets.characters.butcherWalk,
			run: assets.characters.butcherRun
		},
		health: 20,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 3,
		xp: 2
	},
	blacksmith: {
		tiles: {
			idle: assets.characters.blacksmithWalk,
			run: assets.characters.blacksmithRun
		},
		health: 25,
		size: BODYSIZES.normal,
		speed: 1.5,
		damage: 3,
		weapon: WEAPONS.hammer,
		xp: 2
	},
	alchemist: {
		tiles: {
			idle: assets.characters.alchemistWalk,
			run: assets.characters.alchemistRun,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 3
	},

	thief: {
		tiles: {
			idle: assets.characters.thiefWalk,
			run: assets.characters.thiefRun,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},

	archer: {
		tiles: {
			idle: assets.characters.scoutWalk,
			run: assets.characters.scoutRun,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 3
	},
	executioner: {
		tiles: {
			idle: assets.characters.executionerWalk,
			run: assets.characters.executionerRun,
		},
		health: 400,
		size: BODYSIZES.normal,
		speed: 5,
		damage: 5,
		charger: true,
		boss: true,
		xp: 30
	},
	// ! KINGSGUARD
	herald: {
		tiles: {
			idle: assets.characters.heralsWalk,
			run: assets.characters.heralsRun,
		},
		health: 11,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	knight: {
		tiles: {
			idle: assets.characters.knightNormalWalk,
			run: assets.characters.knightNormalRun,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	knightFat: {
		tiles: {
			idle: assets.characters.knightFatWalk,
			run: assets.characters.knightFatRun,
		},
		health: 20,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 3,
		xp: 2
	},
	knightElite: {
		tiles: {
			idle: assets.characters.eliteKnightWalk,
			run: assets.characters.eliteKnightRun,
		},
		health: 25,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 4,
		xp: 2
	},
	knightEliteLarge: {
		tiles: {
			idle: assets.characters.largeKnightWalk,
			run: assets.characters.largeKnightRun,
		},
		health: 40,
		size: BODYSIZES.big,
		speed: 5,
		damage: 5,
		xp: 4
	},
	king: {
		tiles: {
			idle: assets.characters.knigYoungWalk,
			run: assets.characters.knigYoungRUn,
		},
		health: 200,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 5,
		xp: 15
	},
	queen: {
		tiles: {
			idle: assets.characters.queenWalk,
			run: assets.characters.queenRun,
		},
		health: 50,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 4,
		xp: 15
	},
	kingOld: {
		tiles: {
			idle: assets.characters.kingOldWalk,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 4
	},
	princess: {
		tiles: {
			idle: assets.characters.princessWalk,
			run: assets.characters.princessRun,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 4
	},
	// ! PRIESTS
	clericFat: {
		tiles: {
			idle: assets.characters.monkFatWalk,
		},
		health: 20,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	clericNormal: {
		tiles: {
			idle: assets.characters.monkNormalWalk,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	clericSkinny: {
		tiles: {
			idle: assets.characters.monkSkinnyWalk,
		},
		health: 11,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	nunFat: {
		tiles: {
			idle: assets.characters.nunFatWalk,
		},
		health: 20,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	nunNormal: {
		tiles: {
			idle: assets.characters.nunNormalWalk,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	nunSkinny: {
		tiles: {
			idle: assets.characters.nunSkinnyWalk,
		},
		health: 11,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	bishop: {
		tiles: {
			idle: assets.characters.bishopWalk,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 4,
		xp: 30
	},
	templar: {
		tiles: {
			idle: assets.characters.templarWalk,
			run: assets.characters.templarRun
		},
		health: 25,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 4,
		xp: 2
	},
	angel: {
		tiles: {
			idle: assets.characters.angelWalk,
			run: assets.characters.angelRun
		},
		health: 11,
		size: BODYSIZES.small,
		speed: 1,
		damage: 1
	},
	archAngel: {
		tiles: {
			idle: assets.characters.archAngelWalk
		},
		health: 300,
		boss: true,
		size: BODYSIZES.normal,
		speed: 5,
		damage: 5,
		get minion() {
			return {
				type: Enemies.angel,
				delay: 180,
				distance: 70
			}
		}
	},
	inquisitor: {
		tiles: {
			idle: assets.characters.inquisitorWalk
		},
		health: 30,
		size: BODYSIZES.normal,
		speed: 1.5,
		damage: 3,
		weapon: WEAPONS.cross
	},
	// ! VAMPIRES
	cultist: {
		tiles: {
			idle: assets.characters.cultistWalk,
			run: assets.characters.cultistRun,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 1
	},
	cultistHooded: {
		tiles: {
			idle: assets.characters.hoodedCultistWalk,
			run: assets.characters.hoodedCultistRun,
		},
		health: 20,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},
	vampireMale: {
		tiles: {
			idle: assets.characters.vampireMaleWalk,
			run: assets.characters.vampireMaleRun,
		},
		health: 30,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 3,
		charger: true
	},
	vampireFemale: {
		tiles: {
			idle: assets.characters.vampireFemaleWalk,
			run: assets.characters.vampireFemaleRun,
		},
		health: 30,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 3,
		weapon: WEAPONS.darkProjectile
	},
	vampireLord: {
		tiles: {
			idle: assets.characters.vampireLordWalk,
			run: assets.characters.vampireLordRun,
		},
		health: 100,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 5,
		boss: true
	},
	bat: {
		tiles: {
			idle: assets.characters.bat,
		},
		health: 15,
		size: BODYSIZES.normal,
		speed: 2,
		damage: 2
	},




} as const
export default Enemies
