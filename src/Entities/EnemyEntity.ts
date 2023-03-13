import AIMovementComponent from "../Components/AIMovementComponent"
import AnimationComponent from "../Components/AnimationComponent"
import BOOSTS from "../Constants/Boosts"
import BodyComponent from "../Components/BodyComponent"
import BoostEntity from "./BoostEntity"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import DamageComponent from "../Components/DamageComponent"
import DroppableComponent from "../Components/DroppableComponent"
import { EnemyType } from "../Constants/Enemies"
import { Entity } from "../Globals/ECS"
import HealthComponent from "../Components/HealthComponent"
import LevelComponent from "../Components/LevelComponent"
import ManaDropEntity from "./ManaDropEntity"
import MinionSpawnerComponent from "../Components/MinionSpawnerComponent"
import OutlineShader from "../Shaders/OutlineShader"
import PositionComponent from "../Components/PositionComponent"
import PotionEntity from "./PotionEntity"
import ShadowComponent from "../Components/ShadowComponent"
import SpriteComponent from "../Components/SpriteComponent"
import StatsComponent from "../Components/StatsComponent"
import WeaponEntity from "./WeaponEntity"
import XPEntity from "./XPEntity"

const EnemyEntity = (type: EnemyType, stats?: StatsComponent, level?: LevelComponent) => (position: { x: number, y: number }) => {
	const enemy = new Entity('enemy')
	const scale = type.boss ? 1.5 : 1
	const berserk = type.berserk
	const tile = Object.values(type.tiles)[0]
	const sprite = enemy.addComponent(new SpriteComponent(tile, { scale }))
	if (berserk) {
		sprite.addShader(new OutlineShader([1, 0, 0, 1]))
	}
	enemy.addComponent(new AnimationComponent(type.tiles))
	enemy.addComponent(new DamageComponent((type.damage), [COLLISIONGROUPS.PLAYER], -1, 20))
	enemy.addComponent(new HealthComponent(type.health * (berserk ? 1.5 : 1), COLLISIONGROUPS.ENEMY))
	const drops = [XPEntity(type.xp ?? 1)]
	if (Math.random() < 0.01) {
		drops.push(PotionEntity)
	}
	if (Math.random() < 0.10) {
		drops.push(ManaDropEntity)
	}
	if (Math.random() < 0.02) {
		const randomBoost = BOOSTS[Math.floor(Math.random() * BOOSTS.length)]
		drops.push(BoostEntity(randomBoost))
	}
	enemy.addComponent(new DroppableComponent(drops))
	enemy.addComponent(new PositionComponent(position.x, position.y))
	enemy.addComponent(new AIMovementComponent({ seeking: [COLLISIONGROUPS.PLAYER], seekingDistance: 0, charger: type.charger }))
	enemy.addComponent(new ShadowComponent(type.size.width * scale, 6, tile.height * scale / 2))
	enemy.addComponent(new BodyComponent(
		{ moveForce: 300 * type.speed * (berserk ? 1.3 : 1) },
		[
			{ width: type.size.width * scale, height: type.size.height * scale, mass: 1, offset: tile.height * scale, contact: false, group: COLLISIONGROUPS.ENEMY, canCollideWith: [COLLISIONGROUPS.ENEMY, COLLISIONGROUPS.PLAYER, COLLISIONGROUPS.TRAP, COLLISIONGROUPS.WEAPON, COLLISIONGROUPS.WALL, COLLISIONGROUPS.LOOT] }
		]
	))
	if (stats) {
		enemy.addComponent(stats)
	}
	if (level) {
		enemy.addComponent(level)
	}
	if (type.weapon) {
		enemy.addChildren(WeaponEntity(type.weapon, enemy, type.size.height, stats))
	}
	if (type.minion) {
		enemy.addComponent(new MinionSpawnerComponent(type.minion.type, type.minion.distance, type.minion.delay))
	}
	return enemy
}


export default EnemyEntity