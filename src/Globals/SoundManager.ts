import type { SOUND } from '../Constants/Sounds'
import type { sounds } from '../../assets/sounds/sounds'
import { renderer } from './Initialize'
import saveData from './SaveManager'

interface soundManagerOptions {
	volume?: number
	playbackRate?: number
	autoplay?: boolean
	loop?: boolean
	fade?: boolean
}
class SoundManager {
	sounds: Record<sounds, HTMLAudioElement>
	availableSounds: Partial<Record<sounds, MediaElementAudioSourceNode[]>> = {}
	ctx = new AudioContext()
	effects: Map<HTMLAudioElement, number> = new Map()
	musics: Map<HTMLAudioElement, number> = new Map()
	constructor(sounds: Record<sounds, HTMLAudioElement>) {
		this.sounds = sounds
		if (this.ctx.state === 'suspended') {
			const listener = () => {
				this.ctx.resume()
				this.musics.forEach((_, element) => {
					element.play()
				})
				renderer.domElement.removeEventListener('click', listener)
			}
			renderer.domElement.addEventListener('click', listener)
		}
	}

	resume(element: HTMLAudioElement | null) {
		if (this.ctx.state === 'running' && element) {
			element.play()
		}
	}

	play(type: 'music' | 'effect', name: SOUND, options?: soundManagerOptions) {
		if (this.ctx.state === 'suspended') return
		const newOptions = { volume: 1, playbackRate: 1, autoplay: true, loop: false, fade: false, ...options }
		const selectedSound = name[Math.floor(Math.random() * name.length)]
		const existingSound = this.availableSounds[selectedSound]?.pop()?.mediaElement
		const audioElement = existingSound ?? this.sounds[selectedSound].cloneNode() as HTMLAudioElement
		const target = type === 'music' ? this.musics : this.effects
		const volume = type === 'music' ? saveData.musicVolume : saveData.effectsVolume

		target.set(audioElement, newOptions.volume)

		audioElement.volume = newOptions.volume * volume
		audioElement.playbackRate = newOptions.playbackRate
		if (newOptions.loop) audioElement.loop = true
		if (!existingSound) {
			const sound = this.ctx.createMediaElementSource(audioElement)
			sound.connect(this.ctx.destination)
			const endListener = () => {
				const available = this.availableSounds[selectedSound]
				if (available) {
					available.push(sound)
				} else {
					this.availableSounds[selectedSound] = [sound]
				}
			}
			audioElement.addEventListener('ended', endListener)
		}

		if (newOptions.autoplay) audioElement.play()
		return audioElement
	}

	updateVolume() {
		const collections: [Map<HTMLAudioElement, number>, number][] = [
			[this.musics, saveData.musicVolume],
			[this.effects, saveData.effectsVolume],
		]
		collections.forEach(([audio, volume]) => {
			for (const [audioElement, elementVolume] of audio) {
				audioElement.volume = elementVolume * volume
			}
		})
		if ((saveData.effectsVolume + saveData.musicVolume) === 0) {
			this.ctx.suspend()
		} else if (this.ctx.state === 'suspended') {
			this.ctx.resume()
		}
	}
}
export default SoundManager
