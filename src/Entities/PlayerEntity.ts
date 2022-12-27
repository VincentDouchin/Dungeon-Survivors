import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import CameraTargetComponent from "../Components/CameraTargetComponent"
import EntityCollectionComponent from "../Components/EntityCollectionComponent"
import HealthComponent from "../Components/HealthComponent"
import LightComponent from "../Components/LightComponent"
import MeshComponent from "../Components/MeshComponent"
import PlayerControllerComponent from "../Components/PlayerControllerComponent"
import PositionComponent from "../Components/PositionComponent"
import DAMAGETYPES from "../Constants/DamageTypes"
import AssetManager from "../Globals/AssetManager"
import { Entity } from "../Globals/ECS"
import WeaponEntity from "./WeaponEntity"

const PlayerEntity = () => {
	const player = new Entity()
	const elf = AssetManager.tiles.elf_f_idle_anim
	player.addComponent(new MeshComponent(elf))
	player.addComponent(new LightComponent())
	player.addComponent(new AnimationComponent({
		idle: AssetManager.tiles.elf_f_idle_anim,
		hit: AssetManager.tiles.elf_f_hit_anim,
		run: AssetManager.tiles.elf_f_run_anim,
	}))
	player.addComponent(new HealthComponent(1000, DAMAGETYPES.PLAYER))
	player.addComponent(new BodyComponent(
		{ moveForce: 100 },
		{ width: elf.width, height: elf.height, contact: true }
	))
	player.addComponent(new PositionComponent(0, 0))
	player.addComponent(new PlayerControllerComponent())
	const inventory = new EntityCollectionComponent()
	player.addComponent(new CameraTargetComponent)
	inventory.addEntity(WeaponEntity(player))
	player.addComponent(inventory)
	return player
}

export default PlayerEntity