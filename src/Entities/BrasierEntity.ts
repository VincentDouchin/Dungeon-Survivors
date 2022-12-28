import AnimationComponent from "../Components/AnimationComponent"
import LightComponent from "../Components/LightComponent"
import MeshComponent from "../Components/MeshComponent"
import PositionComponent from "../Components/PositionComponent"
import AssetManager from "../Globals/AssetManager"
import { Entity } from "../Globals/ECS"

const BrasierEntity = (position: { x: number, y: number }) => {
	const brasier = new Entity()
	brasier.addComponent(new PositionComponent(position.x, position.y))
	const tile = AssetManager.tiles.flame_brasier
	brasier.addComponent(new MeshComponent(tile))
	brasier.addComponent(new AnimationComponent({ default: tile }))
	brasier.addComponent(new LightComponent())
	return brasier
}
export default BrasierEntity