import { render } from "../Globals/Initialize"
import PositionComponent from "../Components/PositionComponent"
import { ECS, Entity } from "../Globals/ECS"
import MeshComponent from "../Components/MeshComponent"
import AssetManager from "../Globals/AssetManager"
import RenderingSystem from "../Systems/RenderingSystem"
const Run = new class implements GameState {
	constructor() {
		const player = new Entity()
		player.addComponent(new PositionComponent(0, 0))
		const elf = AssetManager.tiles.get('elf_m_idle_anim')!
		player.addComponent(new MeshComponent(elf.buffer, elf.width, elf.height))
		ECS.registerSystem(RenderingSystem)
	}
	update() {
		ECS.updateSystems()
	}
	render() {
		render()
	}
}
export default Run