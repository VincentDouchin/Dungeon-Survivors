import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import HealthComponent from "../Components/HealthComponent"
import MeshComponent from "../Components/MeshComponent"
import PlayerControllerComponent from "../Components/PlayerControllerComponent"
import PositionComponent from "../Components/PositionComponent"
import AssetManager from "../Globals/AssetManager"
import { Entity } from "../Globals/ECS"

const PlayerEntity = () => {
	const player = new Entity()
	const elf = AssetManager.tiles.elf_f_idle_anim
	player.addComponent(new MeshComponent(elf.buffer, elf.width, elf.height))

	player.addComponent(new AnimationComponent({
		idle: AssetManager.tiles.elf_f_idle_anim,
		hit: AssetManager.tiles.elf_f_hit_anim,
		run: AssetManager.tiles.elf_f_run_anim,
	}))
	player.addComponent(new HealthComponent(1000))
	player.addComponent(new BodyComponent({ moveForce: 100 }, { width: elf.width, height: elf.height, contact: true }))
	player.addComponent(new PositionComponent(0, 0))
	player.addComponent(new PlayerControllerComponent())
	return player
}

export default PlayerEntity