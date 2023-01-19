import BodyComponent from "../Components/BodyComponent"
import DamageComponent from "../Components/DamageComponent"
import MeshComponent from "../Components/MeshComponent"
import PositionComponent from "../Components/PositionComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import { Entity } from "../Globals/ECS"
import { assets } from "../Globals/Initialize"

const PotionEntity = ({ x, y }: { x: number, y: number }) => {
	const potion = new Entity()
	const tile = assets.tiles.flask_big_green
	potion.addComponent(new MeshComponent(tile))
	potion.addComponent(new BodyComponent({ type: 'fixed' }, [
		{ width: tile.width, height: tile.height, sensor: false, contact: true, group: COLLISIONGROUPS.POTION, canCollideWith: [COLLISIONGROUPS.PLAYER] }
	]))
	potion.addComponent(new DamageComponent(-200, [COLLISIONGROUPS.PLAYER], 1))
	potion.addComponent(new PositionComponent(x, y))
	return potion
}
export default PotionEntity