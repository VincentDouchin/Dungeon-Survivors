import BodyComponent from "../Components/BodyComponent"
import DamageComponent from "../Components/DamageComponent"
import MeshComponent from "../Components/MeshComponent"
import PositionComponent from "../Components/PositionComponent"
import RotationComponent from "../Components/RotationComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import { Entity } from "../Globals/ECS"

const ProjectileEntity = (projectileDefinition: ProjectileDefinition, position: { x: number, y: number }, rotation: number) => {
	const projectile = new Entity()
	projectile.addComponent(new MeshComponent(projectileDefinition.tile))
	projectile.addComponent(new BodyComponent(
		{ moveForce: projectileDefinition.speed },
		[
			{ mass: 0.1, group: COLLISIONGROUPS.PLAYER, contact: true, sensor: true, canCollideWith: [COLLISIONGROUPS.ENEMY], width: projectileDefinition.tile.width, height: projectileDefinition.tile.height }
		]
	))
	projectile.addComponent(new DamageComponent(projectileDefinition.damage, [COLLISIONGROUPS.ENEMY], 1))
	projectile.addComponent(new PositionComponent(position.x, position.y))
	projectile.addComponent(new RotationComponent(rotation, 0))
	return projectile
}
export default ProjectileEntity