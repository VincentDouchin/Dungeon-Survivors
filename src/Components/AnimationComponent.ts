import { Component } from "../Globals/ECS";
import Tile from "../Utils/Tile";

class AnimationComponent extends Component {
	tiles: { [key: string]: Tile }
	lastState: string = ''
	currentState: string = ''
	selectedFrame = 0
	frameRate = 10
	frameCounter = 0
	maxFrames: number
	modifier: 'buffer' | 'outline' | 'hurt' = 'buffer'
	flipped = false
	constructor(tiles: { [key: string]: Tile }) {
		super()
		this.tiles = tiles
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
}
AnimationComponent.register()
export default AnimationComponent