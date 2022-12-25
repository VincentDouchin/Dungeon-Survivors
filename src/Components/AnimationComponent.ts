import { Component } from "../Globals/ECS";

class AnimationComponent extends Component {
	tiles: { [key: string]: Tile }
	lastState: string = ''
	currentState: string = ''
	selectedFrame = 0
	frameRate = 10
	frameCounter = 0
	maxFrames: number
	constructor(tiles: { [key: string]: Tile }) {
		super()
		this.tiles = tiles
		this.maxFrames = Math.max(...Object.values(tiles).map(tile => tile.frames))
		this.currentState = Object.keys(tiles)[0]
	}
	set state(state: string) {
		this.lastState = this.currentState
		this.currentState = state
	}
	get frames() {
		return this.tiles[this.currentState].frames
	}

	get tile() {
		return this.tiles[this.currentState]
	}
}
AnimationComponent.register()
export default AnimationComponent