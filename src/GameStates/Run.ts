import { render, world } from "../Globals/Initialize"
import PositionComponent from "../Components/PositionComponent"
import { ECS, Entity } from "../Globals/ECS"
import MeshComponent from "../Components/MeshComponent"
import AssetManager from "../Globals/AssetManager"
import RenderingSystem from "../Systems/RenderingSystem"
import MovementSystem from "../Systems/MovementSystem"
import PlayerEntity from "../Entities/PlayerEntity"
const Run = new class implements GameState {
	constructor() {
		RenderingSystem.register()
		MovementSystem.register()
		PlayerEntity()
		const knight = AssetManager.tiles.knight_f_idle_anim!
		const npc = new Entity()
		npc.addComponent(new PositionComponent(10, 10))
		npc.addComponent(new MeshComponent(knight.buffer))
	}
	update() {
		world.step()
		ECS.updateSystems()

	}
	render() {
		render()
	}
}
export default Run