import Coroutines from "../Globals/Coroutines";
import { Component } from "../Globals/ECS";
import Tile from "../Utils/Tile";

class AnimationComponent extends Component {
	tiles: { [key: string]: Tile }
	lastState: string = ''
	currentState: string = ''
	selectedFrame = 0
	frameRate: number
	frameCounter = 0
	maxFrames: number
	flipped = false
	start: boolean
	constructor(tiles: { [key: string]: Tile }, options?: { start?: boolean, frameRate?: number }) {
		super()
		const newOptions = Object.assign({ start: true, frameRate: 10 }, options)
		this.tiles = tiles
		this.frameRate = newOptions.frameRate
		this.start = newOptions.start
		this.maxFrames = Math.max(...Object.values(tiles).map(tile => tile.frames))
		this.currentState = Object.keys(tiles)[0]
		this.lastState = this.currentState
	}
	set state(state: string) {
		this.lastState = this.currentState
		this.currentState = state
	}
	get frames() {
		return this.tile.frames
	}

	get tile() {
		return this.tiles[this.currentState]
	}
	playAnimation(animationsName?: string) {
		this.start = true
		const animation = animationsName ?? Object.keys(this.tiles)[0]
		this.currentState = animation
		const self = this
		return new Promise<void>(resolve => {
			Coroutines.add(function* () {
				while (self.selectedFrame < self.tiles[animation].frames - 1) {
					console.log(self.selectedFrame, self.tiles[animation].frames)
					yield
				}
				console.log('done')
				resolve()
				return
			})
		})

	}
}
AnimationComponent.register()
export default AnimationComponent