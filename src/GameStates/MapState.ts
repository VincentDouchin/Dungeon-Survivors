import { AmbientLight } from "three";
import CameraTargetComponent from "../Components/CameraTargetComponent";
import PathWalkerComponent from "../Components/PathWalkerComponent";
import PositionComponent from "../Components/PositionComponent";
import SpriteComponent from "../Components/SpriteComponent";
import ECSEVENTS from "../Constants/ECSEvents";
import HEROS from "../Constants/Heros";
import PathEntity from "../Entities/PathEntity";
import { ECS, Entity } from "../Globals/ECS";
import { assets, render, scene, world } from "../Globals/Initialize";
import AnimationSystem from "../Systems/AnimationSystem";
import CameraSystem from "../Systems/CameraSystem";
import MovementSystem from "../Systems/MovementSystem";
import PathSystem from "../Systems/PathSystem";
import RenderSystem from "../Systems/RenderSystem";

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
		RenderSystem.register()
		scene.add(this.light)
		const map = assets.overWorld
		const mapTile = map.tile
		this.map = new Entity()
		this.player = new Entity()
		this.map.addComponent(new SpriteComponent(mapTile))
		this.map.addComponent(new PositionComponent(0, 0))
		const knight = HEROS.knightMale
		this.player.addComponent(new SpriteComponent(knight.tiles.idle, { scale: 0.6, renderOrder: 11 }))
		// this.player.addComponent(new AnimationComponent(knight.tiles))
		this.player.addComponent(new CameraTargetComponent({
			left: -mapTile.width / 2,
			right: mapTile.width / 2,
			bottom: -mapTile.height / 2,
			top: mapTile.height / 2,
		}))
		this.player.addComponent(new PathWalkerComponent())
		ECS.eventBus.subscribe(ECSEVENTS.PATHPOSITION, (position: PositionComponent) => {
			this.lastPosition.x = position.x
			this.lastPosition.y = position.y
		})


		if (!this.lastPosition.x && !this.lastPosition.y) {
			PathEntity(map.objects.get('path'))!
		}
		this.player.addComponent(new PositionComponent(this.lastPosition.x!, this.lastPosition.y!))

		CameraSystem.register()
		AnimationSystem.register()
		MovementSystem.register()
		PathSystem.register()
	}
	unset() {
		ECS.unRegisterSystems()
		this.light?.removeFromParent()
		this.map?.destroy()
		this.player?.destroy()
	}
}
export default MapState