import { ECS, Entity } from "../Globals/ECS"
import ECSEVENTS, { CAMERA_MOVE } from "../Constants/ECSEvents"
import { FieldInstance, LayerInstance } from "../../ldtk"

import { AmbientLight } from "three"
import { Background } from "../Constants/BackGrounds"
import BackgroundElementsComponent from "../Components/BackgroundElementsComponent"
import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import LDTKMap from "../Utils/LDTKMap"
import LightComponent from "../Components/LightComponent"
import ObstableEntity from "./ObstacleEntity"
import PositionComponent from "../Components/PositionComponent"
import SpriteComponent from "../Components/SpriteComponent"
import State from "../Globals/State"
import { assets } from "../Globals/Initialize"

const BackgroundEntity = (backgroundDefinition: Background) => {

	const background = new Entity('background')
	const position = background.addComponent(new PositionComponent(0, 0))
	const tile = LDTKMap.tiles[backgroundDefinition.level]
	const width = tile.width
	const height = tile.height
	const level = assets.arenas.levels.find(level => level.identifier == backgroundDefinition.level)
	const isInfinite = level?.fieldInstances.find((field: FieldInstance) => field.__identifier == 'infinite')?.__value
	if (isInfinite) {

		const sprite = background.addComponent(new SpriteComponent(tile, { renderOrder: 0 }))
		ECS.eventBus.subscribe<CAMERA_MOVE>(ECSEVENTS.CAMERA_MOVE, ({ x, y }: { x: number, y: number }) => {
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
	if (backgroundDefinition?.obstacles?.length) {
		const maxSize = backgroundDefinition.obstacles.reduce((acc, v) => {
			return Math.max(acc, v.width, v.height)
		}, 0)
		background.addComponent(new BackgroundElementsComponent(maxSize, backgroundDefinition?.obstaclesDensity ?? 0.5, backgroundDefinition.obstacles.map(ObstableEntity)))
	}

	// ! WALLS
	level?.layerInstances?.find((layer: LayerInstance) => layer.__identifier == 'Wall_entities')?.entityInstances.forEach(wall => {
		const wallEntity = new Entity('wall')
		wallEntity.addComponent(new BodyComponent(
			{ type: 'fixed' },
			[
				{ width: wall.width, height: wall.height, contact: false, group: COLLISIONGROUPS.WALL, canCollideWith: [COLLISIONGROUPS.PLAYER, COLLISIONGROUPS.ENEMY] }]
		))
		wallEntity.addComponent(new PositionComponent(wall.px[0] - level.pxWid / 2 + wall.width / 2, level.pxHei / 2 - wall.px[1] - wall.height / 2))
		background.addChildren(wallEntity)
	})
	if (backgroundDefinition.lightColor) {
		background.addComponent(new LightComponent(backgroundDefinition.lightColor, 1, AmbientLight))
	}



	return background
}
export default BackgroundEntity