import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import Coroutines from "../Globals/Coroutines"
import DamageComponent from "../Components/DamageComponent"
import { Entity } from "../Globals/ECS"
import ExpirationComponent from "../Components/ExpirationComponent"
import PositionComponent from "../Components/PositionComponent"
import RotationComponent from "../Components/RotationComponent"
import ShooterComponent from "../Components/ShooterComponent"
import SpriteComponent from "../Components/SpriteComponent"

const ProjectileEntity = (projectileDefinition: ShooterComponent, position: { x: number, y: number }, rotation: number) => {
	const projectile = new Entity('projectile')
	const tile = projectileDefinition.projectile
	projectile.addComponent(new SpriteComponent(tile, { scale: projectileDefinition.scale }))
	if (tile.frames > 1) {
		projectile.addComponent(new AnimationComponent({ idle: tile }))
	}
	if (projectileDefinition)
		projectile.addComponent(new BodyComponent(
			{ moveForce: projectileDefinition.speed },
			[
				{ mass: 0.1, group: projectileDefinition.group, contact: true, sensor: true, canCollideWith: [projectileDefinition.target], width: tile.width, height: tile.height }
			]
		))
	projectile.addComponent(new DamageComponent(projectileDefinition.damage.value, [projectileDefinition.target], 1))
	projectile.addComponent(new PositionComponent(position.x, position.y))
	const rotationComponent = projectile.addComponent(new RotationComponent(rotation, 0))
	if (projectileDefinition.rotationSpeed) {
		Coroutines.add(function* () {
			let timer = 0
			while (timer < projectileDefinition.range) {
				timer++
				rotationComponent.centerRotation += (projectileDefinition?.rotationSpeed ?? 0) / 5
				yield
			}
		})
	}
	projectile.addComponent(new ExpirationComponent(projectileDefinition.range))
	return projectile
}
export default ProjectileEntity