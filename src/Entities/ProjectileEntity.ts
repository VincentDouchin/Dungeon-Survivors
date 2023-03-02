import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import Coroutine from "../Globals/Coroutine";
import DamageComponent from "../Components/DamageComponent"
import { Entity } from "../Globals/ECS"
import ExpirationComponent from "../Components/ExpirationComponent"
import PositionComponent from "../Components/PositionComponent"
import RotationComponent from "../Components/RotationComponent"
import ShooterComponent from "../Components/ShooterComponent"
import SpriteComponent from "../Components/SpriteComponent"
import { Vector2 } from "three";

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
		new Coroutine(function* () {
			rotationComponent.centerRotation += (projectileDefinition?.rotationSpeed ?? 0) / 5
		}, projectileDefinition.range)
	}

	const coroutine = new Coroutine(function* () {
		yield
		const projectileBody = projectile.getComponent(BodyComponent)
		const projectileRotation = projectile.getComponent(RotationComponent)
		const x = -Math.cos(projectileRotation.rotation) * projectileBody.moveForce.value
		const y = -Math.sin(projectileRotation.rotation) * projectileBody.moveForce.value
		projectileBody.body?.applyImpulse(new Vector2(x, y), true)

	}, projectileDefinition.range)
	projectile.onDestroy(() => coroutine.stop())
	projectile.addComponent(new ExpirationComponent(projectileDefinition.range))
	return projectile
}
export default ProjectileEntity