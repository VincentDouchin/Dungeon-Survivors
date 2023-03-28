import { Component } from '../Globals/ECS'
import type { Entity } from '../Globals/ECS'
import Tile from '../Utils/Tile'
import getBuffer from '../Utils/Buffer'

class ShadowComponent extends Component {
	entity?: Entity
	tile: Tile
	offset: number
	constructor(width: number, height: number, offset: number) {
		super()
		const buffer = getBuffer(width, height)
		buffer.fillStyle = 'black'
		buffer.ellipse(width / 2, height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI)
		buffer.fill()
		this.tile = new Tile({ buffer })
		this.offset = offset
	}

	destroy(): void {
		this.entity && this.entity.destroy()
	}
}
ShadowComponent.register()
export default ShadowComponent
