import AssetLoader from "../Utils/AssetLoader"

const SOUNDS_SOURCES = await AssetLoader.loadSounds(import.meta.glob('./../../assets/sounds/*.*', { eager: true }))
export const SOUNDS = {
	Magic: '10_human_special_atk_2',
	SWORD: ['26_sword_hit_1', '26_sword_hit_2', '26_sword_hit_3'],
	Select: 'Select',
	Validate: 'Validate',
	PowerUp: 'PowerUp1',
	XP: '68_ATB_4',
	LEVEL_UP: '75_Lvl_up_03',
	Fireball: ['08_Fireball_02', '09_Fireball_03'],
	PLAYER_DAMAGE: '77_flesh_02',
	BOOST: 'Fx',
	THUNDER: '17_Thunder_01',
	GAME_OVER: 'GameOver2',
	UNLOCK: 'winsquare-6993',
} as const
export const MUSICS = {
	Fight: '17 - Fight',
} as const
export type SOUND = typeof SOUNDS[keyof typeof SOUNDS] | typeof MUSICS[keyof typeof MUSICS]

export default SOUNDS_SOURCES as Record<string, HTMLAudioElement>  