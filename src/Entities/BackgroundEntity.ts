import { ECS, Entity } from "../Globals/ECS"
import ECSEVENTS, { CAMERA_MOVE } from "../Constants/ECSEvents"
import { assets, camera } from "../Globals/Initialize"

import { AmbientLight } from "three"
import AnimationComponent from "../Components/AnimationComponent"
import { Background } from "../Constants/BackGrounds"
import BackgroundElementsComponent from "../Components/BackgroundElementsComponent"
import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import Coroutines from "../Globals/Coroutines"
import LDTKMap from "../Utils/LDTKMap"
import { LayerInstance } from "../../ldtk"
import LightComponent from "../Components/LightComponent"
import ObstableEntity from "./ObstacleEntity"
import PositionComponent from "../Components/PositionComponent"
import SpriteComponent from "../Components/SpriteComponent"
import State from "../Globals/State"
import { linear } from "../Utils/Tween"
import waitFor from "../Utils/WaitFor"

const BackgroundEntity = (backgroundDefinition: Background) => {
	const background = new Entity('background')
	const position = background.addComponent(new PositionComponent(0, 0))
	const tile = LDTKMap.tiles[backgroundDefinition.level]
	const width = tile.width
	const height = tile.height
	const level = assets.arenas.levels.find(level => level.identifier == backgroundDefinition.level)
	// const isInfinite = level?.fieldInstances.find((field: FieldInstance) => field.__identifier == 'infinite')?.__value


	const sprite = background.addComponent(new SpriteComponent(tile, { renderOrder: 0 }))
	ECS.eventBus.subscribe<CAMERA_MOVE>(ECSEVENTS.CAMERA_MOVE, ({ x, y }: { x: number, y: number }) => {
		if (backgroundDefinition.infinite.x) {
			sprite.texture.offset.x = x / width
			position.x = x
		}
		if (backgroundDefinition.infinite.y) {
			sprite.texture.offset.y = y / height
			position.y = y
		}
	})
	State.cameraBounds = {
		left: backgroundDefinition.infinite.x ? undefined : -width / 2,
		right: backgroundDefinition.infinite.x ? undefined : width / 2,
		bottom: backgroundDefinition.infinite.y ? undefined : -height / 2,
		top: backgroundDefinition.infinite.y ? undefined : height / 2,
	}

	if (backgroundDefinition?.obstacles?.length) {
		const maxSize = backgroundDefinition.obstacles.reduce((acc, v) => {
			return Math.max(acc, v.width, v.height)
		}, 0)
		background.addComponent(new BackgroundElementsComponent(maxSize, backgroundDefinition?.obstaclesDensity ?? 0.5, backgroundDefinition.obstacles.map(ObstableEntity)))
	}
	// ! LEAFS
	if (backgroundDefinition.leafs) {
		const leafEntity = () => {
			const leaf = new Entity('leaf')
			const sprite = leaf.addComponent(new SpriteComponent(assets.effects.Leaf, { renderOrder: 10, scale: 1.5 }))
			leaf.addComponent(new AnimationComponent({ default: assets.effects.Leaf }))
			const position = leaf.addComponent(new PositionComponent(((Math.random() - 0.5) * 2) * camera.right + camera.position.x, ((Math.random() - 0.5) * 2) * camera.top + camera.position.y))
			Coroutines.add(function* () {
				let counter = 0
				while (counter < 100) {
					position.y += linear(counter, 0, -2, 100)
					sprite.opacity = linear(counter, 1, 0, 100)
					counter++
					yield

				}
				leaf.destroy()
			})


		}
		Coroutines.add(function* () {
			while (background) {
				yield* waitFor(Math.random() * 10 + 50)
				for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
					leafEntity()
				}

			}
		})
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