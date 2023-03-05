import SOUNDS_SOURCES, { SOUND } from '../Constants/Sounds'

import { renderer } from './Initialize'
import saveData from './SaveManager'

interface soundManagerOptions {
	volume?: number,
	playbackRate?: number,
	autoplay?: boolean,
	loop?: boolean,
	fade?: boolean
}
class SoundManager {
	sounds: Record<keyof typeof SOUNDS_SOURCES, HTMLAudioElement> = SOUNDS_SOURCES
	ctx = new AudioContext()
	effects: Map<HTMLAudioElement, number> = new Map()
	musics: Map<HTMLAudioElement, number> = new Map()
	constructor() {
		if (this.ctx.state === 'suspended') {
			const listener = () => {
				this.ctx.resume()
				renderer.domElement.removeEventListener('click', listener)
			}
			renderer.domElement.addEventListener('click', listener)
		}
	}
	play(type: 'music' | 'effect', name: SOUND, options?: soundManagerOptions,) {
		const nodes: AudioNode[] = []
		const newOptions = { volume: 1, playbackRate: 1, autoplay: true, loop: false, fade: false, ...options }
		const selectedSound = Array.isArray(name) ? name[Math.floor(Math.random() * name.length)] : name
		const audioElement = this.sounds[selectedSound].cloneNode() as HTMLAudioElement
		const target = type === 'music' ? this.musics : this.effects
		const volume = type === 'music' ? saveData.musicVolume : saveData.effectsVolume

		target.set(audioElement, newOptions.volume)
		const sound = this.ctx.createMediaElementSource(audioElement)
		nodes.push(sound)
		const endListener = () => {
			target.delete(audioElement)
			audioElement.remove()
			sound.disconnect()
			audioElement.src = ""
			audioElement.srcObject = null
			audioElement.removeEventListener('ended', endListener)
		}
		audioElement.addEventListener('ended', endListener)
		audioElement.volume = newOptions.volume * volume
		audioElement.playbackRate = newOptions.playbackRate
		if (newOptions.loop) audioElement.loop = true

		if (newOptions.fade) {
			const gainNode = this.ctx.createGain()
			gainNode.gain.setValueAtTime(1, this.ctx.currentTime)
			gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + this.sounds[selectedSound].duration)
			nodes.push(gainNode)
		}
		for (let i = 0; i < nodes.length; i++) {
			if (i !== 0) nodes[i - 1].connect(nodes[i])
			if (i === nodes.length - 1) nodes[i].connect(this.ctx.destination)
		}
		if (newOptions.autoplay) audioElement.play()
		return audioElement
	}
	updateVolume() {
		const collections: [Map<HTMLAudioElement, number>, number][] = [
			[this.musics, saveData.musicVolume],
			[this.effects, saveData.effectsVolume]
		]
		collections.forEach(([audio, volume]) => {
			for (let [audioElement, elementVolume] of audio) {
				audioElement.volume = elementVolume * volume
			}
		})
	}

}
export default SoundManager