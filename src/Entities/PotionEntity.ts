import BodyComponent from "../Components/BodyComponent"
import DamageComponent from "../Components/DamageComponent"
import HealthComponent from "../Components/HealthComponent"
import MeshComponent from "../Components/MeshComponent"
import PositionComponent from "../Components/PositionComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import AssetManager from "../Globals/AssetManager"
import { Entity } from "../Globals/ECS"

const PotionEntity = ({ x, y }: { x: number, y: number }) => {
	const potion = new Entity()
	const tile = AssetManager.tiles.flask_big_green
	potion.addComponent(new MeshComponent(tile))
	potion.addComponent(new BodyComponent({ type: 'fixed' }, [
		{ width: tile.width, height: tile.height, sensor: false, contact: true, group: COLLISIONGROUPS.POTION, canCollideWith: [COLLISIONGROUPS.PLAYER] }
	]))
	potion.addComponent(new DamageComponent(-50, COLLISIONGROUPS.PLAYER))
	potion.addComponent(new PositionComponent(x, y))
	potion.addComponent(new HealthComponent(1, COLLISIONGROUPS.POTION, false))
	return potion
}
export default PotionEntity