

import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import DamageComponent from "../Components/DamageComponent"
import DroppableComponent from "../Components/DroppableComponent"
import HealthComponent from "../Components/HealthComponent"
import MeshComponent from "../Components/MeshComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import { Entity } from "../Globals/ECS"
import XPEntity from "./XPEntity"

const EnemyEntity = (type: EnemyType) => {
	const enemy = new Entity()
	const orc = Object.values(type.tiles)[0]
	enemy.addComponent(new MeshComponent(orc))
	enemy.addComponent(new AnimationComponent(type.tiles))
	enemy.addComponent(new DamageComponent(1, COLLISIONGROUPS.ENEMY))
	enemy.addComponent(new HealthComponent(10, COLLISIONGROUPS.ENEMY))
	enemy.addComponent(new DroppableComponent(XPEntity))
	enemy.addComponent(new BodyComponent(
		{ moveForce: 40 },
		[
			{ width: orc.width, height: orc.height, contact: false, group: COLLISIONGROUPS.ENEMY, canCollideWith: [COLLISIONGROUPS.PLAYER, COLLISIONGROUPS.TRAP, COLLISIONGROUPS.WEAPON] }
		]
	))
	return enemy
}


export default EnemyEntity