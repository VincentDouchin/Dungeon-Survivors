import { AmbientLight } from "three";
import AnimationComponent from "../Components/AnimationComponent";
import CameraTargetComponent from "../Components/CameraTargetComponent";
import MeshComponent from "../Components/MeshComponent";
import PositionComponent from "../Components/PositionComponent";
import HEROS from "../Constants/Heros";
import PathEntity from "../Entities/PathEntity";
import AssetManager from "../Globals/AssetManager";
import { ECS, Entity } from "../Globals/ECS";
import { camera, render, scene, world } from "../Globals/Initialize";
import AnimationSystem from "../Systems/AnimationSystem";
import BodyCreationSystem from "../Systems/BodyCreationSystem";
import MovementSystem from "../Systems/MovementSystem";
import PathSystem from "../Systems/PathSystem";
import RenderingSystem from "../Systems/RenderingSystem";

class MapState implements GameState {
	constructor() {
		const map = AssetManager.overworld
		const tile = map.tile
		const overworld = new Entity()

		overworld.addComponent(new MeshComponent(tile))
		overworld.addComponent(new PositionComponent(0, 0))
		scene.add(new AmbientLight(0xffffff))
		const knight = HEROS.knightMale
		const player = new Entity()
		player.addComponent(new MeshComponent(knight.tiles.idle, { scale: 0.6 }))
		player.addComponent(new AnimationComponent(knight.tiles))
		player.addComponent(new CameraTargetComponent())

		const path = PathEntity(map.objects.get('path'), player)!
		const startPosition = path.getComponent(PositionComponent)
		player.addComponent(new PositionComponent(startPosition.x, startPosition.y))

	}
	render() {
		render()
	}
	update() {
		ECS.updateSystems()
		world.step()
	}
	set() {
		AnimationSystem.register()
		MovementSystem.register()
		RenderingSystem.register()
		MovementSystem.register()
		BodyCreationSystem.register()
		PathSystem.register()
	}
	unset() {
		ECS.unRegisterSystems()
	}
}
export default MapState