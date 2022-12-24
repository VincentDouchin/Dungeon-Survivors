import { render } from "../Globals/Initialize"
import PositionComponent from "../Components/PositionComponent"
import { ECS, Entity } from "../Globals/ECS"
import MeshComponent from "../Components/MeshComponent"
import AssetManager from "../Globals/AssetManager"
import RenderingSystem from "../Systems/RenderingSystem"
import MovementSystem from "../Systems/MovementSystem"
import PlayerControllerComponent from "../Components/PlayerControllerComponent"
const Run = new class implements GameState {
	constructor() {
		ECS.registerSystem(RenderingSystem)
		ECS.registerSystem(MovementSystem)
		const player = new Entity()
		player.addComponent(new PositionComponent(0, 0))
		player.addComponent(new PlayerControllerComponent())
		const elf = AssetManager.tiles.get('elf_m_idle_anim')!
		const knight = AssetManager.tiles.get('knight_f_idle_anim')!
		player.addComponent(new MeshComponent(elf.buffer, elf.width, elf.height))
		const npc = new Entity()
		npc.addComponent(new PositionComponent(10, 10))
		npc.addComponent(new MeshComponent(knight.buffer))
	}
	update() {
		ECS.updateSystems()
	}
	render() {
		render()
	}
}
export default Run