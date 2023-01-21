import { Color } from "three"
import AnimationComponent from "../Components/AnimationComponent"
import LightComponent from "../Components/LightComponent"
import SpriteComponent from "../Components/SpriteComponent"
import PositionComponent from "../Components/PositionComponent"
import { Entity } from "../Globals/ECS"
import { assets } from "../Globals/Initialize"

const BrasierEntity = (position: { x: number, y: number }) => {
	const brasier = new Entity()
	brasier.addComponent(new PositionComponent(position.x, position.y))
	const tile = assets.tiles.flame_brasier
	brasier.addComponent(new SpriteComponent(tile))
	brasier.addComponent(new AnimationComponent({ default: tile }))
	brasier.addComponent(new LightComponent(new Color("hsl(20, 20%, 15%)"), 500))
	return brasier
}
export default BrasierEntity