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
import PositionComponent from "../Components/PositionComponent"
import SpriteComponent from "../Components/SpriteComponent"
import State from "../Globals/State"
import { assets } from "../Globals/Initialize"
import getBuffer from "../Utils/Buffer"

const BackgroundEntity = (backgroundDefinition: Background) => {

	const background = new Entity()
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

	// ! SubLevels
	// const possibleElements: ((x: number, y: number, noise: number) => Entity)[] = []
	// let maxSize = 0
	// if (backgroundDefinition.subLevels?.length) {
	// 	backgroundDefinition.subLevels.forEach(subLevel => {
	// 		const tile = LDTKMap.tiles[subLevel.identifier]
	// 		maxSize = Math.max(tile.width, tile.height, maxSize)

	// 		const elementCreator = (x: number, y: number, noiseValue: number) => {

	// 			const subLevelEntity = new Entity()
	// 			subLevelEntity.addComponent(new PositionComponent(x, y))
	// 			subLevel.layerInstances?.forEach(layer => layer.entityInstances.forEach(wall => {
	// 				const wallEntity = new Entity()
	// 				wallEntity.addComponent(new BodyComponent(
	// 					{ type: 'fixed' },
	// 					[
	// 						{ width: wall.width, height: wall.height, contact: false, group: COLLISIONGROUPS.WALL, canCollideWith: [COLLISIONGROUPS.PLAYER, COLLISIONGROUPS.ENEMY] }]
	// 				))

	// 				const buffer = getBuffer(wall.width, wall.height)
	// 				buffer.fillStyle = 'red'
	// 				buffer.fillRect(0, 0, wall.width, wall.height)
	// 				wallEntity.addComponent(new PositionComponent(wall.px[0] - subLevel.pxWid / 2 + wall.width / 2 + x, subLevel.pxHei / 2 - wall.px[1] - wall.height / 2 + y))
	// 			}))

	// 			subLevelEntity.addComponent(new SpriteComponent(tile, { renderOrder: 0 }))
	// 			return subLevelEntity
	// 		}
	// 		possibleElements.push(elementCreator)
	// 	})
	// }
	// if (possibleElements.length > 0) {
	// 	background.addComponent(new BackgroundElementsComponent(maxSize, possibleElements))
	// }
	// const subLevelEntity = (x: number, y: number) => {
	// 
	// }
	// let left = 0
	// let right = 0
	// let top = 0
	// let bottom = 0
	// const entities: Map<{ x: number, y: number }, Entity> = new Map()
	// ECS.eventBus.subscribe<CAMERA_MOVE>(ECSEVENTS.CAMERA_MOVE, ({ x, y }) => {
	// 	const factor = 64
	// 	const chunkXLeft = Math.floor((camera.left + x) / factor)
	// 	if (chunkXLeft < left) {
	// 		for (let chunkY = camera.top + y; chunkY > camera.bottom + y; chunkY -= factor) {
	// 			if (noise(chunkXLeft, chunkY) > 0.6 && !entities.has({ x: chunkXLeft, y: chunkY })) {
	// 				console.log(noise(chunkXLeft, chunkY))
	// 				entities.set({ x: chunkXLeft, y: chunkY }, subLevelEntity(chunkXLeft * factor, chunkY))
	// 			}
	// 		}
	// 		left = chunkXLeft
	// 	}
	// })

	// ! WALLS
	level?.layerInstances?.find((layer: LayerInstance) => layer.__identifier == 'Wall_entities')?.entityInstances.forEach(wall => {
		const wallEntity = new Entity()
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