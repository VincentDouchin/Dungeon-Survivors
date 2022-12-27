import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import CameraTargetComponent from "../Components/CameraTargetComponent"
import HealthComponent from "../Components/HealthComponent"
import LightComponent from "../Components/LightComponent"
import MeshComponent from "../Components/MeshComponent"
import PlayerControllerComponent from "../Components/PlayerControllerComponent"
import PositionComponent from "../Components/PositionComponent"
import XPPickerComponent from "../Components/XPPickerComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
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
	player.addComponent(new HealthComponent(200, COLLISIONGROUPS.PLAYER))
	player.addComponent(new BodyComponent(
		{ moveForce: 100 },
		[
			{ width: elf.width, height: elf.height, contact: true, group: COLLISIONGROUPS.PLAYER, canCollideWith: [COLLISIONGROUPS.ENEMY, COLLISIONGROUPS.TRAP] },
			{ width: 100, height: 100, contact: true, sensor: true, group: COLLISIONGROUPS.SENSOR, canCollideWith: [COLLISIONGROUPS.XP] }
		]

	))
	player.addComponent(new PositionComponent(0, 0))
	player.addComponent(new PlayerControllerComponent())
	player.addComponent(new CameraTargetComponent())
	player.addChildren(WeaponEntity(player))
	player.addComponent(new XPPickerComponent())
	return player
}

export default PlayerEntity