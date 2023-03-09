import { ECS, Entity } from "../Globals/ECS"

import { AmbientLight } from "three"
import BackgroundElementsComponent from "../Components/BackgroundElementsComponent"
import { BackgroundOptions } from "../Constants/BackGrounds"
import { ECSEVENTS } from "../Constants/Events"
import LightComponent from "../Components/LightComponent"
import PositionComponent from "../Components/PositionComponent"
import SpriteComponent from "../Components/SpriteComponent"
import State from "../Globals/State"
import assets from "../Globals/Assets"

const BackgroundEntity = (backgroundDefinition: BackgroundOptions) => {
	const background = new Entity('background')
	const position = background.addComponent(new PositionComponent(0, 0))
	const level = assets.maps[backgroundDefinition.level]
	const tile = level.tile

	const width = tile.width
	const height = tile.height
	const sprite = background.addComponent(new SpriteComponent(tile, { renderOrder: 0 }))
	const cameraUnSubscriber = ECS.eventBus.subscribe(ECSEVENTS.CAMERA_MOVE, ({ x, y }: { x: number, y: number }) => {
		if (backgroundDefinition.infinite.x) {
			sprite.texture.offset.x = x / width
			position.x = x
		}
		if (backgroundDefinition.infinite.y) {
			sprite.texture.offset.y = y / height
			position.y = y
		}
	})
	const addUnSubscriber = ECS.eventBus.subscribe(ECSEVENTS.ADD_TO_BACKGROUND, (entity) => {
		background.addChildren(entity)
	})

	State.cameraBounds = {
		left: backgroundDefinition.infinite.x ? undefined : -width / 2,
		right: backgroundDefinition.infinite.x ? undefined : width / 2,
		bottom: backgroundDefinition.infinite.y ? undefined : -height / 2,
		top: backgroundDefinition.infinite.y ? undefined : height / 2,
	}

	// if (backgroundDefinition?.obstacles?.length || backgroundDefinition.lootables.length) {
	// 	const walls = level
	// 		?.layerInstances
	// 		?.find((layer: LayerInstance) => layer.__identifier == 'Wall_entities')
	// 		?.entityInstances
	// 		.map(wall => ({
	// 			width: wall.width,
	// 			height: wall.height,
	// 			x: wall.px[0] - level.pxWid / 2 + wall.width / 2,
	// 			y: level.pxHei / 2 - wall.px[1] - wall.height / 2
	// 		}))
	// }
	background.addComponent(new BackgroundElementsComponent({
		obstacles: backgroundDefinition.obstacles,
		effect: backgroundDefinition.effect,
		effectDelay: backgroundDefinition.effectDelay,
		lootables: backgroundDefinition.lootables,
		obstacleDensity: backgroundDefinition.obstacleDensity
	}))
	background.onDestroy(() => {
		cameraUnSubscriber()
		addUnSubscriber()
	})

	// ! WALLS
	// level?.layerInstances?.find((layer: LayerInstance) => layer.__identifier == 'Wall_entities')?.entityInstances.forEach(wall => {
	// 	const wallEntity = new Entity('wall')
	// 	wallEntity.addComponent(new BodyComponent(
	// 		{ type: 'fixed' },
	// 		[
	// 			{ width: wall.width, height: wall.height, contact: false, group: COLLISIONGROUPS.WALL, canCollideWith: [COLLISIONGROUPS.PLAYER, COLLISIONGROUPS.ENEMY] }]
	// 	))
	// 	wallEntity.addComponent(new PositionComponent(wall.px[0] - level.pxWid / 2 + wall.width / 2, level.pxHei / 2 - wall.px[1] - wall.height / 2))
	// 	background.addChildren(wallEntity)
	// })
	if (backgroundDefinition.lightColor) {
		background.addComponent(new LightComponent(backgroundDefinition.lightColor, 1, AmbientLight))
	}



	return background
}
export default BackgroundEntity