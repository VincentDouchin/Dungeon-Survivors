import BodyComponent from '../Components/BodyComponent'
import COLLISIONGROUPS from '../Constants/CollisionGroups'
import DamageComponent from '../Components/DamageComponent'
import { Entity } from '../Globals/ECS'
import type PositionComponent from '../Components/PositionComponent'
import SpriteComponent from '../Components/SpriteComponent'
import assets from '../Globals/Assets'

const PotionEntity = (position: PositionComponent) => {
	const potion = new Entity('potion')
	const tile = assets.other.potion
	potion.addComponent(new SpriteComponent(tile))
	potion.addComponent(new BodyComponent({ type: 'fixed' }, [
		{ width: tile.width, height: tile.height, sensor: true, contact: false, group: COLLISIONGROUPS.POTION, canCollideWith: [COLLISIONGROUPS.PLAYER] },
	]))
	potion.addComponent(position)
	potion.addComponent(new DamageComponent(-30, [COLLISIONGROUPS.PLAYER], 1))
	return potion
}
export default PotionEntity
