import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import DamageComponent from "../Components/DamageComponent"
import { Entity } from "../Globals/ECS"
import PositionComponent from "../Components/PositionComponent"
import SpriteComponent from "../Components/SpriteComponent"
import { assets } from "../Globals/Initialize"

const PotionEntity = ({ x, y }: { x: number, y: number }) => {
	const potion = new Entity('potion')
	const tile = assets.tiles.flask_big_green
	potion.addComponent(new SpriteComponent(tile))
	potion.addComponent(new BodyComponent({ type: 'fixed' }, [
		{ width: tile.width, height: tile.height, sensor: false, contact: true, group: COLLISIONGROUPS.POTION, canCollideWith: [COLLISIONGROUPS.PLAYER] }
	]))
	potion.addComponent(new DamageComponent(-200, [COLLISIONGROUPS.PLAYER], 1))
	potion.addComponent(new PositionComponent(x, y))
	return potion
}
export default PotionEntity