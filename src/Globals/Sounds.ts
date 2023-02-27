import AssetLoader from "../Utils/AssetLoader"

const SOUNDS_SOURCES = await AssetLoader.loadSounds(import.meta.glob('./../../assets/sounds/*.*', { eager: true }))
export const ALLSOUNDS = {
	Magic: 'Magic1',
	SWORD: ['26_sword_hit_1', '26_sword_hit_2', '26_sword_hit_3'],
	Select: 'Select',
	Validate: 'Validate',
	PowerUp: 'PowerUp1',
	Fire: 'Fire',
	Fight: '17 - Fight'
} as const
export type SOUNDS = typeof ALLSOUNDS[keyof typeof ALLSOUNDS]
export default SOUNDS_SOURCES as Record<string, HTMLAudioElement>  