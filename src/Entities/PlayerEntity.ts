import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import CameraTargetComponent from "../Components/CameraTargetComponent"
import DamageComponent from "../Components/DamageComponent"
import HealthComponent from "../Components/HealthComponent"
import LightComponent from "../Components/LightComponent"
import MeshComponent from "../Components/MeshComponent"
import PlayerControllerComponent from "../Components/PlayerControllerComponent"
import PositionComponent from "../Components/PositionComponent"
import XPPickerComponent from "../Components/XPPickerComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import { Entity } from "../Globals/ECS"
import WeaponEntity from "./WeaponEntity"

const PlayerEntity = (hero: HeroDefinition, main = false, weapon: WeaponDefinition) => {
	const player = new Entity()

	player.addComponent(new MeshComponent(hero.tiles.idle))
	player.addComponent(new LightComponent())
	player.addComponent(new AnimationComponent(hero.tiles))
	player.addComponent(new HealthComponent(200, COLLISIONGROUPS.PLAYER))
	player.addComponent(new BodyComponent(
		{ moveForce: 100 },
		[
			{ mass: main ? 100 : 3, width: hero.tiles.idle.width, height: hero.tiles.idle.height, contact: true, group: COLLISIONGROUPS.PLAYER, canCollideWith: [COLLISIONGROUPS.ENEMY, COLLISIONGROUPS.TRAP, COLLISIONGROUPS.POTION] },
			{ mass: main ? 100 : 3, width: 100, height: 100, contact: true, sensor: true, group: COLLISIONGROUPS.SENSOR, canCollideWith: [COLLISIONGROUPS.XP] }
		]

	))
	player.addComponent(new DamageComponent(1, [COLLISIONGROUPS.POTION]))
	player.addComponent(new PositionComponent(0, 0))
	player.addComponent(new PlayerControllerComponent())
	if (main) player.addComponent(new CameraTargetComponent())
	player.addComponent(new XPPickerComponent())
	player.addChildren(WeaponEntity(weapon, player))
	return player
}

export default PlayerEntity