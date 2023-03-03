import AssetLoader from "../Utils/AssetLoader"

const SOUNDS_SOURCES = await AssetLoader.loadSounds(import.meta.glob('./../../assets/sounds/*.*', { eager: true }))
export const ALLSOUNDS = {
	Magic: '10_human_special_atk_2',
	SWORD: ['26_sword_hit_1', '26_sword_hit_2', '26_sword_hit_3'],
	Select: 'Select',
	Validate: 'Validate',
	PowerUp: 'PowerUp1',
	Fire: 'Fire',
	Fight: '17 - Fight',
	PLAYER_DAMAGE: ['11_human_damage_1', '11_human_damage_2'],
	BOOST: 'Fx'
} as const
export type SOUNDS = typeof ALLSOUNDS[keyof typeof ALLSOUNDS]
export default SOUNDS_SOURCES as Record<string, HTMLAudioElement>  