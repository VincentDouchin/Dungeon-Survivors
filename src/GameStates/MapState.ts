import { ECS, Entity } from "../Globals/ECS";
import LDTKMap, { ldtkNode } from "../Utils/LDTKMap";
import { assets, lightScene, render, world } from "../Globals/Initialize";

import { AmbientLight } from "three";
import AnimationComponent from "../Components/AnimationComponent";
import AnimationSystem from "../Systems/AnimationSystem";
import CameraSystem from "../Systems/CameraSystem";
import CameraTargetComponent from "../Components/CameraTargetComponent";
import ECSEVENTS from "../Constants/ECSEvents";
import HEROS from "../Constants/Heros";
import MovementSystem from "../Systems/MovementSystem";
import PathEntity from "../Entities/PathEntity";
import PathSystem from "../Systems/PathSystem";
import PathWalkerComponent from "../Components/PathWalkerComponent";
import PositionComponent from "../Components/PositionComponent";
import RenderSystem from "../Systems/RenderSystem";
import SpriteComponent from "../Components/SpriteComponent";
import State from "../Globals/State";

class MapState implements GameState {
	map?: Entity
	player?: Entity
	light: AmbientLight
	path?: Entity
	lastPosition: { x?: number, y?: number } = { x: undefined, y: undefined }
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
	set() {
		lightScene.add(this.light)
		if (!assets.map || !assets.map.levels[0]) return
		const level = assets.map.levels[0]
		const mapTile = LDTKMap.tiles[level.identifier]
		this.map = new Entity()
		this.player = new Entity()
		this.map.addComponent(new SpriteComponent(mapTile))
		this.map.addComponent(new PositionComponent(0, 0))
		const knight = HEROS.knightMale
		this.player.addComponent(new SpriteComponent(knight.tiles.idle, { scale: 0.6, renderOrder: 11 }))
		this.player.addComponent(new AnimationComponent(knight.tiles))
		this.player.addComponent(new CameraTargetComponent())
		State.cameraBounds = {
			left: -mapTile.width / 2,
			right: mapTile.width / 2,
			bottom: -mapTile.height / 2,
			top: mapTile.height / 2,
		}
		this.player.addComponent(new PathWalkerComponent())
		ECS.eventBus.subscribe(ECSEVENTS.PATHPOSITION, (position: PositionComponent) => {
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

		CameraSystem.register()
		AnimationSystem.register()
		MovementSystem.register()
		PathSystem.register()
		RenderSystem.register()
	}
	unset() {
		ECS.unRegisterSystems()
		this.light?.removeFromParent()
		this.map?.destroy()
		this.player?.destroy()
	}
}
export default MapState