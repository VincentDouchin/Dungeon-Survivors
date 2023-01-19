import { AmbientLight } from "three";
import AnimationComponent from "../Components/AnimationComponent";
import CameraTargetComponent from "../Components/CameraTargetComponent";
import MeshComponent from "../Components/MeshComponent";
import PathWalkerComponent from "../Components/PathWalkerComponent";
import PositionComponent from "../Components/PositionComponent";
import ECSEVENTS from "../Constants/ECSEvents";
import HEROS from "../Constants/Heros";
import PathEntity from "../Entities/PathEntity";
import { ECS, Entity } from "../Globals/ECS";
import { render, scene, world, assets } from "../Globals/Initialize";
import AnimationSystem from "../Systems/AnimationSystem";
import CameraSystem from "../Systems/CameraSystem";
import MovementSystem from "../Systems/MovementSystem";
import PathSystem from "../Systems/PathSystem";
import RenderingSystem from "../Systems/RenderingSystem";

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
		scene.add(this.light)
		const map = assets.overWorld
		const tile = map.tile
		this.map = new Entity()
		this.player = new Entity()
		this.map.addComponent(new MeshComponent(tile))
		this.map.addComponent(new PositionComponent(0, 0))
		const knight = HEROS.knightMale
		this.player.addComponent(new MeshComponent(knight.tiles.idle, { scale: 0.6, renderOrder: 11 }))
		this.player.addComponent(new AnimationComponent(knight.tiles))
		this.player.addComponent(new CameraTargetComponent({ bottom: -tile.height / 2, top: tile.height / 2, right: tile.width / 2, left: -tile.width / 2 }))
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
		RenderingSystem.register()
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