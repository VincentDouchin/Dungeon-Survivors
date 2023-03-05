import AssetLoader from "../Utils/AssetLoader"

const SOUNDS_SOURCES = await AssetLoader.loadSounds(import.meta.glob('./../../assets/sounds/*.*', { eager: true }))
export const SOUNDS = {
	Magic: '10_human_special_atk_2',
	SWORD: ['26_sword_hit_1', '26_sword_hit_2', '26_sword_hit_3'],
	Select: 'Select',
	Validate: 'Validate',
	PowerUp: 'PowerUp1',
	XP: '68_ATB_4',
	Fireball: ['01_Fire_explosion_01_small', '02_Fire_explosion_02_small'],
	PLAYER_DAMAGE: ['14_Impact_flesh_01', '15_Impact_flesh_02', '16_Impact_flesh_03', '17_Impact_flesh_04', '18_Impact_flesh_05'],
	BOOST: 'Fx',
	THUNDER: '17_Thunder_01',
	GAME_OVER: 'GameOver2'
} as const
export const MUSICS = {
	Fight: '17 - Fight',
} as const
export type SOUND = typeof SOUNDS[keyof typeof SOUNDS] | typeof MUSICS[keyof typeof MUSICS]

export default SOUNDS_SOURCES as Record<string, HTMLAudioElement>  