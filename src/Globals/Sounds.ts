import AssetLoader from "../Utils/AssetLoader"

const SOUNDS_SOURCES = await AssetLoader.loadSounds(import.meta.glob('./../../assets/sounds/*.*', { eager: true }))
export const SOUNDS = {
	Magic: '10_human_special_atk_2',
	SWORD: ['26_sword_hit_1', '26_sword_hit_2', '26_sword_hit_3'],
	Select: 'Select',
	Validate: 'Validate',
	PowerUp: 'PowerUp1',
	Fireball: 'Fire2',
	PLAYER_DAMAGE: ['11_human_damage_1', '11_human_damage_2'],
	BOOST: 'Fx'
} as const
export const MUSICS = {
	Fight: '17 - Fight',
} as const
export type SOUND = typeof SOUNDS[keyof typeof SOUNDS] | typeof MUSICS[keyof typeof MUSICS]

export default SOUNDS_SOURCES as Record<string, HTMLAudioElement>  