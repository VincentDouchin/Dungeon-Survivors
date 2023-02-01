import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import { Entity } from "../Globals/ECS"
import PositionComponent from "../Components/PositionComponent"
import SpriteComponent from "../Components/SpriteComponent"
import Tile from "../Utils/Tile"

const ObstableEntity = (tile: Tile) => (x: number, y: number) => {
	const entity = new Entity('obstacle')
	entity.addComponent(new BodyComponent(
		{ type: 'fixed' },
		[
			{ width: tile.width, height: tile.height, contact: false, canCollideWith: [COLLISIONGROUPS.PLAYER, COLLISIONGROUPS.ENEMY], group: COLLISIONGROUPS.WALL }
		]
	))
	entity.addComponent(new SpriteComponent(tile, { renderOrder: 0 }))
	entity.addComponent(new PositionComponent(x, y))
	return entity
}
export default ObstableEntity