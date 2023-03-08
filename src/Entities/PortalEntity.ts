import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import DissolveShader from "../Shaders/DissolveShader"
import { Entity } from "../Globals/ECS"
import PortalComponent from "../Components/PortalComponent"
import PositionComponent from "../Components/PositionComponent"
import SpriteComponent from "../Components/SpriteComponent"
import StarShader from "../Shaders/StarShader"
import Tile from "../Utils/Tile"
import assets from "../Globals/Assets"
import { camera } from "../Globals/Initialize"

const PortalEntity = () => {
	const portal = new Entity('portal')
	const scale = 1.5
	portal.addComponent(new SpriteComponent(assets.house.portal, { shaders: [new DissolveShader(180, true, 10)], scale, renderOrder: 100 }))
	portal.addComponent(new PositionComponent(camera.position.x, camera.position.y + camera.top + 100))
	const backPortal = new Entity('back portal')
	backPortal.addComponent(new SpriteComponent(Tile.empty(50, 50), { shaders: [new StarShader(backPortal)], renderOrder: 1, }))
	backPortal.addComponent(new PositionComponent(camera.position.x, camera.position.y + camera.top + 95))

	const stairs = new Entity('stairs')
	const stairsTile = assets.house.stairs
	stairs.addComponent(new BodyComponent(
		{ type: 'fixed' },
		[
			{ group: COLLISIONGROUPS.WALL, canCollideWith: [COLLISIONGROUPS.PLAYER], contact: false, sensor: false, width: 12, height: stairsTile.height * scale, offsetX: -stairsTile.width * scale / 2 + 6 },
			{ group: COLLISIONGROUPS.WALL, canCollideWith: [COLLISIONGROUPS.PLAYER], contact: false, sensor: false, width: 12, height: stairsTile.height * scale, offsetX: stairsTile.width * scale / 2 - 6 },
			{ group: COLLISIONGROUPS.SENSOR, canCollideWith: [COLLISIONGROUPS.WALL], contact: true, sensor: false, width: stairsTile.width * scale, height: stairsTile.height * scale * 1.5, offsetY: stairsTile.height * scale / 2 },
			{ group: COLLISIONGROUPS.PORTAL, canCollideWith: [COLLISIONGROUPS.PLAYER], contact: true, sensor: true, width: 64, height: 16, offsetY: stairsTile.height }

		]
	))
	stairs.addComponent(new PortalComponent())
	stairs.addComponent(new SpriteComponent(stairsTile, { shaders: [new DissolveShader(180, true, 10)], scale, renderOrder: 2 }))
	stairs.addComponent(new PositionComponent(camera.position.x, camera.position.y + camera.top + 40))
	portal.addChildren(stairs)
	portal.addChildren(backPortal)
	return portal
}
export default PortalEntity