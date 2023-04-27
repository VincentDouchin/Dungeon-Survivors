import BodyComponent from '../Components/BodyComponent'
import COLLISIONGROUPS from '../Constants/CollisionGroups'
import { Entity } from '../Globals/ECS'
import type PositionComponent from '../Components/PositionComponent'
import SpriteComponent from '../Components/SpriteComponent'
import assets from '../Globals/Assets'
import PotionComponent from '../Components/PotionComponent'
import ShadowEntity from './ShadowEntity'

const PotionEntity = (position: PositionComponent) => {
	const potion = new Entity('potion')
	const tile = assets.other.potion
	potion.addComponent(new SpriteComponent(tile, { renderOrder: 1 }))
	potion.addComponent(new BodyComponent(
		{ type: 'fixed' },
		{ width: tile.width, height: tile.height, sensor: true, contact: false, group: COLLISIONGROUPS.POTION, canCollideWith: [COLLISIONGROUPS.PLAYER] },
	))
	potion.addComponent(position)
	potion.addComponent(new PotionComponent())
	potion.addChildren(ShadowEntity(12, 5, 5, potion))
	return potion
}
export default PotionEntity
