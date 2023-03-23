import { Component, ECS } from '../Globals/ECS'

import Tile from '../Utils/Tile'
import getBuffer from '../Utils/Buffer'

class ShadowComponent extends Component {
	entityId?: string
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
		this.entityId && ECS.getEntityById(this.entityId).destroy()
	}
}
ShadowComponent.register()
export default ShadowComponent