import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import CameraTargetComponent from "../Components/CameraTargetComponent"
import { Color } from "three"
import { Entity } from "../Globals/ECS"
import FlockingComponent from "../Components/FlockingComponent"
import HealthComponent from "../Components/HealthComponent"
import LightComponent from "../Components/LightComponent"
import OutlineShader from "../Shaders/OutlineShader"
import PlayerControllerComponent from "../Components/PlayerControllerComponent"
import PositionComponent from "../Components/PositionComponent"
import RangedComponent from "../Components/RangedComponent"
import SpriteComponent from "../Components/SpriteComponent"
import TargeterComponent from "../Components/TargeterComponent"
import WEAPONBEHAVIORS from "../Constants/WeaponBehaviros"
import WeaponEntity from "./WeaponEntity"
import XPPickerComponent from "../Components/XPPickerComponent"

const PlayerEntity = (hero: HeroDefinition, weapon: WeaponDefinition, main?: Entity,) => {
	const player = new Entity()

	const sprite = player.addComponent(new SpriteComponent(hero.tiles.idle,))
	player.addComponent(new LightComponent(new Color('hsl(0,0%,5%)'), 1000))
	player.addComponent(new HealthComponent(200, COLLISIONGROUPS.PLAYER))
	player.addComponent(new AnimationComponent(hero.tiles))
	if (!weapon.behaviors.includes(WEAPONBEHAVIORS.toucher)) player.addComponent(new RangedComponent())
	if (!main) {
		sprite.addShader(new OutlineShader([1, 1, 1, 0.8]))
		player.addComponent(new CameraTargetComponent({}))
	} else {
		player.addComponent(new TargeterComponent(COLLISIONGROUPS.ENEMY, 100))
	}
	player.addComponent(new FlockingComponent(!main, 50))
	player.addComponent(new PlayerControllerComponent(!main))
	player.addComponent(new BodyComponent(
		{ moveForce: 5000 },
		[
			{ width: hero.tiles.idle.width, height: hero.tiles.idle.height, contact: true, group: COLLISIONGROUPS.PLAYER, canCollideWith: [COLLISIONGROUPS.ENEMY, COLLISIONGROUPS.TRAP, COLLISIONGROUPS.POTION, COLLISIONGROUPS.WALL] },
			{ width: 100, height: 100, contact: true, sensor: true, group: COLLISIONGROUPS.SENSOR, canCollideWith: [COLLISIONGROUPS.XP] }
		]

	))
	player.addComponent(new PositionComponent(0, 0))


	player.addComponent(new XPPickerComponent())
	player.addChildren(WeaponEntity(weapon, player))
	return player
}

export default PlayerEntity