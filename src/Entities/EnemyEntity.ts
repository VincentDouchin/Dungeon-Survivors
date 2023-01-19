

import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import DamageComponent from "../Components/DamageComponent"
import DroppableComponent from "../Components/DroppableComponent"
import HealthComponent from "../Components/HealthComponent"
import MeshComponent from "../Components/MeshComponent"
import PositionComponent from "../Components/PositionComponent"
import TargeterComponent from "../Components/TargeterComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import { Entity } from "../Globals/ECS"
import XPEntity from "./XPEntity"

const EnemyEntity = (type: EnemyType, position: { x: number, y: number }) => {
	const enemy = new Entity()
	const orc = Object.values(type.tiles)[0]
	enemy.addComponent(new MeshComponent(orc))
	enemy.addComponent(new AnimationComponent(type.tiles))
	enemy.addComponent(new DamageComponent(1, [COLLISIONGROUPS.PLAYER], -1, 2))
	enemy.addComponent(new HealthComponent(type.health, COLLISIONGROUPS.ENEMY))
	enemy.addComponent(new DroppableComponent(XPEntity))
	enemy.addComponent(new PositionComponent(position.x, position.y))
	enemy.addComponent(new TargeterComponent(COLLISIONGROUPS.PLAYER))
	enemy.addComponent(new BodyComponent(
		{ moveForce: 100 },
		[
			{ width: orc.width, height: orc.height, contact: false, group: COLLISIONGROUPS.ENEMY, canCollideWith: [COLLISIONGROUPS.ENEMY, COLLISIONGROUPS.PLAYER, COLLISIONGROUPS.TRAP, COLLISIONGROUPS.WEAPON, COLLISIONGROUPS.WALL] }
		]
	))
	return enemy
}


export default EnemyEntity