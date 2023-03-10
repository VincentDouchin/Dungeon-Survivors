import { sounds } from "../../assets/sounds/sounds"

export const SOUNDS :Record<string,sounds[]> = {
	Magic: ['10_human_special_atk_2'],
	SWORD: ['26_sword_hit_1', '26_sword_hit_2', '26_sword_hit_3'],
	Select: ['Select'],
	Validate: ['Validate'],
	PowerUp: ['PowerUp1'],
	XP: ['68_ATB_4'],
	LEVEL_UP: ['75_Lvl_up_03'],
	Fireball: ['08_Fireball_02', '09_Fireball_03'],
	PLAYER_DAMAGE: ['77_flesh_02'],
	BOOST: ['Fx'],
	THUNDER: ['17_Thunder_01'],
	GAME_OVER: ['GameOver2'],
	UNLOCK: ['winsquare-6993'],
} 
export const MUSICS:Record<string,sounds[]> = {
	Fight: ['17 - Fight'],
} 
export type SOUND = typeof SOUNDS[keyof typeof SOUNDS] | typeof MUSICS[keyof typeof MUSICS]