import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import Coroutines from "../Globals/Coroutines"
import DamageComponent from "../Components/DamageComponent"
import { Entity } from "../Globals/ECS"
import PositionComponent from "../Components/PositionComponent"
import { ProjectileDefinition } from "../Constants/Projectiles"
import RotationComponent from "../Components/RotationComponent"
import SpriteComponent from "../Components/SpriteComponent"
import waitFor from "../Utils/WaitFor"

const ProjectileEntity = (projectileDefinition: ProjectileDefinition, position: { x: number, y: number }, rotation: number, range: number, target: number, group: number) => {
	const projectile = new Entity('projectile')
	projectile.addComponent(new SpriteComponent(projectileDefinition.tile))
	if (projectileDefinition.tile.frames > 1) {
		projectile.addComponent(new AnimationComponent({ idle: projectileDefinition.tile }))
	}
	projectile.addComponent(new BodyComponent(
		{ moveForce: projectileDefinition.speed },
		[
			{ mass: 0.1, group: group, contact: true, sensor: true, canCollideWith: [target], width: projectileDefinition.tile.width, height: projectileDefinition.tile.height }
		]
	))
	projectile.addComponent(new DamageComponent(projectileDefinition.damage, [target], 1))
	projectile.addComponent(new PositionComponent(position.x, position.y))
	const rotationComponent = projectile.addComponent(new RotationComponent(rotation, 0))
	if (projectileDefinition.rotationSpeed) {
		Coroutines.add(function* () {
			let timer = 0
			while (timer < range) {
				timer++
				rotationComponent.centerRotation += (projectileDefinition?.rotationSpeed ?? 0) / 5
				yield
			}
		})
	}
	Coroutines.add(function* () {
		yield* waitFor(range)
		projectile.destroy()
	})
	return projectile
}
export default ProjectileEntity