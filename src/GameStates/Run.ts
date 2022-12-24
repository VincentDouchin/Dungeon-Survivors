import { render, scene } from "../Globals/Initialize"
import PositionComponent from "../Components/PositionComponent"
import { Entity } from "../Globals/ECS"
import MeshComponent from "../Components/MeshComponent"
import AssetManager from "../Globals/AssetManager"
const Run = new class implements GameState {
	constructor() {
		const player = new Entity()
		player.addComponent(new PositionComponent(0, 0))
		const elf = AssetManager.tiles.get('elf_m_idle_anim')!
		player.addComponent(new MeshComponent(elf.buffer, elf.width, elf.height))
		scene.add(player.getComponent(MeshComponent).mesh)
	}
	update() {

	}
	render() {
		render()
	}
}
export default Run