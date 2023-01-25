import { ECS, Entity } from "../Globals/ECS"

import { AmbientLight } from "three"
import { Background } from "../Constants/BackGrounds"
import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import ECSEVENTS from "../Constants/ECSEvents"
import LDTKMap from "../Utils/LDTKMap"
import LightComponent from "../Components/LightComponent"
import PositionComponent from "../Components/PositionComponent"
import SpriteComponent from "../Components/SpriteComponent"
import State from "../Globals/State"
import { assets } from "../Globals/Initialize"

const BackgroundEntity = (backgroundDefinition: Background) => {
	const background = new Entity()
	const position = background.addComponent(new PositionComponent(0, 0))
	const tile = LDTKMap.tiles[backgroundDefinition.level]
	const width = tile.width
	const height = tile.height
	const level = assets.arenas.levels.find(level => level.identifier == backgroundDefinition.level)
	const isInfinite = level?.fieldInstances.find(field => field.__identifier == 'infinite')?.__value
	if (isInfinite) {

		const sprite = background.addComponent(new SpriteComponent(tile, { renderOrder: 0 }))
		ECS.eventBus.subscribe(ECSEVENTS.CAMERAMOVE, ({ x, y }: { x: number, y: number }) => {
			sprite.texture.offset.x = x / width
			sprite.texture.offset.y = y / height
			position.x = x
			position.y = y
		})
		State.cameraBounds = {
			left: undefined,
			right: undefined,
			top: undefined,
			bottom: undefined,
		}
	} else {
		State.cameraBounds = {
			left: -width / 2,
			right: width / 2,
			bottom: -height / 2,
			top: height / 2,
		}
		background.addComponent(new SpriteComponent(tile, { renderOrder: 0 }))

	}

	level?.layerInstances?.find(layer => layer.__identifier == 'Wall_entities')?.entityInstances.forEach(wall => {
		const wallEntity = new Entity()
		wallEntity.addComponent(new BodyComponent(
			{ type: 'fixed' },
			[
				{ width: wall.width, height: wall.height, contact: false, group: COLLISIONGROUPS.WALL, canCollideWith: [COLLISIONGROUPS.PLAYER, COLLISIONGROUPS.ENEMY] }]
		))
		wallEntity.addComponent(new PositionComponent(-wall.px[0] + level.pxWid / 2 - wall.width / 2, level.pxHei / 2 - wall.px[1] - wall.height / 2))
		background.addChildren(wallEntity)
	})
	if (backgroundDefinition.lightColor) {
		background.addComponent(new LightComponent(backgroundDefinition.lightColor, 1, AmbientLight))
	}



	return background
}
export default BackgroundEntity