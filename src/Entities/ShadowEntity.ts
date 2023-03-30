import PositionComponent from '../Components/PositionComponent'
import SpriteComponent from '../Components/SpriteComponent'
import { Entity } from '../Globals/ECS'
import getBuffer from '../Utils/Buffer'
import Tile from '../Utils/Tile'

const ShadowEntity = (width: number, height: number, offset: number, parent: Entity) => {
	const shadow = new Entity('shadow')
	const buffer = getBuffer(width, height)
	buffer.fillStyle = 'black'
	buffer.ellipse(width / 2, height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI)
	buffer.fill()
	const tile = new Tile({ buffer })
	shadow.addComponent(new PositionComponent().fromParent(parent, 0, -offset))
	shadow.addComponent(new SpriteComponent(tile, { opacity: 0.3, renderOrder: parent.getComponent(SpriteComponent).renderOrder - 1 }))
	return shadow
}
export default ShadowEntity
