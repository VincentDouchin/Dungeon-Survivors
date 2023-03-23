import { sounds } from '../../assets/sounds/sounds'

export const SOUNDS: Record<string, sounds[]> = {
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
	CHARM: ['Paladin_Blades_of_Justice_Cast_Effect_Only'],
	HEAL: ['07_Regen_02'],
	CANNON_BALL: ['05_Fire_explosion_05_large'],
	BOW: ['41_bow_draw_01'],
	ARROW_HIT: ['48_Bow_hit_02'],
	GUN: ['02_Fire_explosion_02_small'],
	SHURIKEN: ['29_swoosh_02', '30_swoosh_03'],
	ARROW_VOLLEY: ['60_Special_move_02']

}
export const MUSICS: Record<string, sounds[]> = {
	Fight: ['17 - Fight'],
}
export type SOUND = typeof SOUNDS[keyof typeof SOUNDS] | typeof MUSICS[keyof typeof MUSICS]