import { ECS, Entity } from "../Globals/ECS";
import ECSEVENTS, { PATH_POSITION } from "../Constants/ECSEvents";
import LDTKMap, { ldtkNode } from "../Utils/LDTKMap";
import { camera, lightScene, render, world } from "../Globals/Initialize";

import { AmbientLight } from "three";
import AnimationComponent from "../Components/AnimationComponent";
import AnimationSystem from "../Systems/AnimationSystem";
import CameraSystem from "../Systems/CameraSystem";
import CameraTargetComponent from "../Components/CameraTargetComponent";
import Coroutines from "../Globals/Coroutines";
import { GameStates } from "../Constants/GameStates";
import HEROS from "../Constants/Heros";
import MovementSystem from "../Systems/MovementSystem";
import PathEntity from "../Entities/PathEntity";
import PathSystem from "../Systems/PathSystem";
import PathWalkerComponent from "../Components/PathWalkerComponent";
import PositionComponent from "../Components/PositionComponent";
import RenderSystem from "../Systems/RenderSystem";
import SelectionSystem from "../Systems/SelectionSystem";
import SpriteComponent from "../Components/SpriteComponent";
import State from "../Globals/State";
import assets from "../Globals/Assets"
import { easeInOutQuart } from "../Utils/Tween";

class MapState implements GameState {
	map?: Entity
	player?: Entity
	light: AmbientLight
	path?: Entity
	lastPosition: { x?: number, y?: number } = { x: 0, y: undefined }
	constructor() {
		this.light = new AmbientLight(0xffffff)



	}
	render() {
		render()
	}
	update() {
		ECS.updateSystems()
		world.step()
	}
	async set(previousState: GameStates) {
		const level = assets.map.levels[0]
		const mapTile = LDTKMap.tiles[level.identifier]
		State.cameraBounds = {
			left: -mapTile.width / 2,
			right: mapTile.width / 2,
			bottom: -mapTile.height / 2,
			top: mapTile.height / 2,
		}
		CameraSystem.register()
		AnimationSystem.register()
		MovementSystem.register()
		PathSystem.register()
		RenderSystem.register()
		SelectionSystem.register()
		this.map = new Entity('map')
		this.map.addComponent(new SpriteComponent(mapTile))
		this.map.addComponent(new PositionComponent(0, 0))
		lightScene.add(this.light)

		await new Promise<void>((resolve) => {
			switch (previousState) {
				case GameStates.none: {
					const title = new Entity('title text')
					title.addComponent(new SpriteComponent(assets.title))
					title.addComponent(new PositionComponent(0, mapTile.height / 2 - camera.top / 2))
					Coroutines.add(function* () {
						yield
						camera.position.x = 0
						let counter = 1
						while (counter < 600) {
							yield camera.position.y = easeInOutQuart(counter, (mapTile.height / 2) - camera.top, -(mapTile.height / 2) + camera.top, 600)
							counter++
						}
						title.destroy()
						resolve()
					})
				}; break
				default: {
					resolve()
				}; break
			}
		})
		if (!assets.map || !assets.map.levels[0]) return
		this.player = new Entity('player')
		const knight = HEROS.knightMale
		this.player.addComponent(new SpriteComponent(knight.tiles.idle, { scale: 0.6, renderOrder: 11 }))
		this.player.addComponent(new AnimationComponent(knight.tiles))
		this.player.addComponent(new CameraTargetComponent())
		this.player.addComponent(new PathWalkerComponent())
		ECS.eventBus.subscribe<PATH_POSITION>(ECSEVENTS.PATH_POSITION, (position: PositionComponent) => {
			this.lastPosition.x = position.x
			this.lastPosition.y = position.y
		})


		if (!this.lastPosition.x && !this.lastPosition.y) {
			const pathEntities = level
				.layerInstances?.find(layer => layer.__identifier == 'Path')
				?.entityInstances.map(node => LDTKMap.getPropertiesOfEntity(level)(node)!) as ldtkNode[]
			PathEntity(pathEntities)
		}


		this.player.addComponent(new PositionComponent(this.lastPosition.x!, this.lastPosition.y!))

	}
	unset() {
		ECS.unRegisterSystems()
		this.light?.removeFromParent()
		this.map?.destroy()
		this.player?.destroy()
	}
}
export default MapState