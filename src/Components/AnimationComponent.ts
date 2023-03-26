import { Component } from '../Globals/ECS'
import Coroutine from '../Globals/Coroutine'
import type Tile from '../Utils/Tile'

class AnimationComponent extends Component {
	tiles: { [key: string]: Tile }
	lastState = ''
	currentState = ''
	selectedFrame = 0
	frameRate: number
	frameCounter = 0
	maxFrames: number
	start: boolean
	constructor(tiles: { [key: string]: Tile }, options?: { start?: boolean; frameRate?: number; selectedFrame?: number }) {
		super()
		const newOptions = Object.assign({ start: true, frameRate: 10, selectedFrame: 0 }, options)
		this.tiles = tiles
		this.frameRate = newOptions.frameRate
		this.start = newOptions.start
		this.selectedFrame = newOptions.selectedFrame
		this.maxFrames = Math.max(...Object.values(tiles).map(tile => tile.frames))
		this.currentState = Object.keys(tiles)[0]
		this.lastState = this.currentState
	}

	setState(state: string) {
		if (!this.tiles[state]) return
		this.lastState = this.currentState
		this.currentState = state
	}

	get frames() {
		return this.tile.frames
	}

	get tile() {
		return this.tiles[this.currentState]
	}

	playAnimation(animationsName?: string, duration?: number) {
		this.start = true
		const animation = animationsName ?? Object.keys(this.tiles)[0]
		this.currentState = animation
		const self = this
		return new Promise<void>((resolve) => {
			new Coroutine(function* () {
				let counter: number = (duration ?? 1)
				while (counter > 0) {
					while (self.selectedFrame < self.tiles[animation].frames - 1) {
						yield
					}
					counter--
					yield
				}
				resolve()
			})
		})
	}
}
AnimationComponent.register()
export default AnimationComponent
