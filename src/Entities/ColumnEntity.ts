import { Color } from "three"
import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import LightComponent from "../Components/LightComponent"
import MeshComponent from "../Components/MeshComponent"
import PositionComponent from "../Components/PositionComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import AssetManager from "../Globals/AssetManager"
import { Entity } from "../Globals/ECS"

const ColumnEntity = (x: number, y: number) => {
	const column = new Entity()
	column.addComponent(new MeshComponent(AssetManager.tiles.column, { renderOrder: 20 }))
	column.addComponent(new BodyComponent(
		{ type: "fixed" },
		[
			{ width: 16, height: 16, sensor: false, contact: false, group: COLLISIONGROUPS.WALL, canCollideWith: [COLLISIONGROUPS.PLAYER, COLLISIONGROUPS.ENEMY] }
		]
	))
	column.addComponent(new PositionComponent(x, y))
	const torch = new Entity()
	const torchTile = AssetManager.tiles.flame_wall
	torch.addComponent(new MeshComponent(torchTile, { renderOrder: 21 }))
	torch.addComponent(new AnimationComponent({ default: torchTile }))
	torch.addComponent(new PositionComponent(x, y))

	torch.addComponent(new LightComponent(new Color("hsl(20, 20%, 15%)"), 500))
	column.addChildren(torch)
	return column
}
export default ColumnEntity