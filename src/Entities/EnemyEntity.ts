import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import DamageComponent from "../Components/DamageComponent"
import DroppableComponent from "../Components/DroppableComponent"
import { EnemyType } from "../Constants/Enemies"
import { Entity } from "../Globals/ECS"
import HealthComponent from "../Components/HealthComponent"
import OutlineShader from "../Shaders/OutlineShader"
import PositionComponent from "../Components/PositionComponent"
import PotionEntity from "./PotionEntity"
import ShadowComponent from "../Components/ShadowComponent"
import SpriteComponent from "../Components/SpriteComponent"
import StatsComponent from "../Components/StatsComponent"
import TargeterComponent from "../Components/TargeterComponent"
import WeaponEntity from "./WeaponEntity"
import XPEntity from "./XPEntity"

const EnemyEntity = (type: EnemyType, stats?: StatsComponent) => (position: { x: number, y: number }) => {
	const enemy = new Entity('enemy')
	const berserk = type.berserk
	const tile = Object.values(type.tiles)[0]
	const sprite = enemy.addComponent(new SpriteComponent(tile))
	if (berserk) {
		sprite.addShader(new OutlineShader([1, 0, 0, 1]))
	}
	enemy.addComponent(new AnimationComponent(type.tiles))
	enemy.addComponent(new DamageComponent((type.damage ?? 1), [COLLISIONGROUPS.PLAYER], -1, 20))
	enemy.addComponent(new HealthComponent(type.health * (berserk ? 1.5 : 1), COLLISIONGROUPS.ENEMY))
	enemy.addComponent(new DroppableComponent(Math.random() < 0.01 ? PotionEntity : XPEntity))
	enemy.addComponent(new PositionComponent(position.x, position.y))
	enemy.addComponent(new TargeterComponent(COLLISIONGROUPS.PLAYER, type.charger ? 100 : 0, type.charger))
	enemy.addComponent(new ShadowComponent(type.size.width, 6, tile.height / 2))
	enemy.addComponent(new BodyComponent(
		{ moveForce: 300 * type.speed * (berserk ? 1.5 : 1) },
		[
			{ width: type.size.width, height: type.size.height, mass: 1, offset: tile.height, contact: false, group: COLLISIONGROUPS.ENEMY, canCollideWith: [COLLISIONGROUPS.ENEMY, COLLISIONGROUPS.PLAYER, COLLISIONGROUPS.TRAP, COLLISIONGROUPS.WEAPON, COLLISIONGROUPS.WALL] }
		]
	))
	if (stats) {
		enemy.addComponent(stats)
	}
	if (type.weapon) {
		enemy.addChildren(WeaponEntity(type.weapon, enemy))
	}
	return enemy
}


export default EnemyEntity