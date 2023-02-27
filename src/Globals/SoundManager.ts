import SOUNDS_SOURCES, { SOUNDS } from './Sounds'

import State from './State'

class SoundManager {
	sounds: Record<keyof typeof SOUNDS_SOURCES, HTMLAudioElement> = SOUNDS_SOURCES
	ctx = new AudioContext()
	constructor() {
		this.ctx.destination
	}
	play(name: SOUNDS, volume = 1, playbackRate = 1) {
		const selectedSound: keyof typeof SOUNDS_SOURCES = Array.isArray(name) ? name[Math.floor(Math.random() * name.length)] : name
		const sound = this.sounds[selectedSound].cloneNode() as HTMLAudioElement
		sound.volume = volume * State.volume
		sound.playbackRate = playbackRate
		sound.play()
		// const source = this.ctx.createMediaElementSource(sound)
		// const gainNode = this.ctx.createGain()

		// gainNode.gain.setValueAtTime(1, this.ctx.currentTime)
		// source.connect(gainNode)
		// gainNode.connect(this.ctx.destination)
		// gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + sound.duration)
		// sound.play()

	}

}
export default SoundManager