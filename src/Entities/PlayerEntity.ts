import AnimationComponent from "../Components/AnimationComponent"
import BODYSIZES from "../Constants/BodySizes"
import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import { Color } from "three"
import { Entity } from "../Globals/ECS"
import FlockingComponent from "../Components/FlockingComponent"
import HealthComponent from "../Components/HealthComponent"
import LightComponent from "../Components/LightComponent"
import PositionComponent from "../Components/PositionComponent"
import RangedComponent from "../Components/RangedComponent"
import ShadowComponent from "../Components/ShadowComponent"
import SpriteComponent from "../Components/SpriteComponent"
import StatsComponent from "../Components/StatsComponent"
import SwitchingComponent from "../Components/SwitchingComponent"
import WEAPONBEHAVIORS from "../Constants/WeaponBehaviros"
import { WeaponDefinition } from "../Constants/Weapons"
import WeaponEntity from "./WeaponEntity"
import XPPickerComponent from "../Components/XPPickerComponent"

const PlayerEntity = (hero: HeroDefinition, weapon: WeaponDefinition, main: boolean, stats: StatsComponent) => {
	const player = new Entity('player')

	player.addComponent(new SpriteComponent(hero.tiles.idle,))
	player.addComponent(new LightComponent(new Color('hsl(0,0%,80%)'), 100))
	player.addComponent(new HealthComponent(200, COLLISIONGROUPS.PLAYER))
	player.addComponent(new AnimationComponent(hero.tiles))
	if (!weapon.behaviors.includes(WEAPONBEHAVIORS.toucher)) player.addComponent(new RangedComponent())
	player.addComponent(new SwitchingComponent(main))
	player.addComponent(new FlockingComponent(!main, 50))
	player.addComponent(new BodyComponent(
		{ moveForce: 15000 },
		[
			{ width: BODYSIZES.normal.width, height: BODYSIZES.normal.height, mass: 10, offset: hero.tiles.idle.height, contact: true, group: COLLISIONGROUPS.PLAYER, canCollideWith: [COLLISIONGROUPS.ENEMY, COLLISIONGROUPS.TRAP, COLLISIONGROUPS.POTION, COLLISIONGROUPS.WALL] },
			{ width: 100, height: 100, mass: 0, contact: true, sensor: true, group: COLLISIONGROUPS.SENSOR, canCollideWith: [COLLISIONGROUPS.XP] }
		]

	))
	player.addComponent(new PositionComponent(0, 0))
	player.addComponent(stats)
	player.addComponent(new ShadowComponent(16, 6, 14))
	player.addComponent(new XPPickerComponent())
	player.addChildren(WeaponEntity(weapon, player, stats))
	return player
}

export default PlayerEntity