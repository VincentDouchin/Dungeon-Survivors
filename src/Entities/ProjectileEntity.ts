import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import DamageComponent from "../Components/DamageComponent"
import MeshComponent from "../Components/MeshComponent"
import PositionComponent from "../Components/PositionComponent"
import RotationComponent from "../Components/RotationComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import Coroutines from "../Globals/Coroutines"
import { Entity } from "../Globals/ECS"
import waitFor from "../Utils/WaitFor"

const ProjectileEntity = (projectileDefinition: ProjectileDefinition, position: { x: number, y: number }, rotation: number, range: number) => {
	const projectile = new Entity()
	projectile.addComponent(new MeshComponent(projectileDefinition.tile))
	if (projectileDefinition.tile.frames > 1) {
		projectile.addComponent(new AnimationComponent({ idle: projectileDefinition.tile }))
	}
	projectile.addComponent(new BodyComponent(
		{ moveForce: projectileDefinition.speed },
		[
			{ mass: 0.1, group: COLLISIONGROUPS.PLAYER, contact: true, sensor: true, canCollideWith: [COLLISIONGROUPS.ENEMY], width: projectileDefinition.tile.width, height: projectileDefinition.tile.height }
		]
	))
	projectile.addComponent(new DamageComponent(projectileDefinition.damage, [COLLISIONGROUPS.ENEMY], 1))
	projectile.addComponent(new PositionComponent(position.x, position.y))
	projectile.addComponent(new RotationComponent(rotation, 0))
	Coroutines.add(function* () {
		yield* waitFor(range)
		projectile.destroy()
	})
	return projectile
}
export default ProjectileEntity