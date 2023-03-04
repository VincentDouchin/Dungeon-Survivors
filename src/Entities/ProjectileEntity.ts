import AnimationComponent from "../Components/AnimationComponent";
import BodyComponent from "../Components/BodyComponent";
import Coroutine from "../Globals/Coroutine";
import DamageComponent from "../Components/DamageComponent";
import { Entity } from "../Globals/ECS";
import ExpirationComponent from "../Components/ExpirationComponent";
import PositionComponent from "../Components/PositionComponent";
import RotationComponent from "../Components/RotationComponent";
import ShooterComponent from "../Components/ShooterComponent";
import SpriteComponent from "../Components/SpriteComponent";

const ProjectileEntity = (projectileDefinition: ShooterComponent, position: { x: number, y: number }, rotation: number) => {

	const projectile = new Entity('projectile')
	const tile = projectileDefinition.projectile
	projectile.addComponent(new SpriteComponent(tile, { scale: projectileDefinition.scale }))
	if (tile.frames > 1) {
		projectile.addComponent(new AnimationComponent({ idle: tile }))
	}
	const projectileBody = projectile.addComponent(new BodyComponent(
		{ moveForce: projectileDefinition.speed },
		[
			{ mass: 0.1, group: projectileDefinition.group, contact: false, sensor: true, canCollideWith: [projectileDefinition.target], width: tile.width, height: tile.height }
		]
	))
	projectile.addComponent(new DamageComponent(projectileDefinition.damage.value, [projectileDefinition.target], 1))
	projectile.addComponent(new PositionComponent(position.x, position.y))
	projectile.addComponent(new ExpirationComponent(projectileDefinition.range))
	projectile.addComponent(new RotationComponent({
		rotation,
		rotationVel: projectileDefinition.rotationSpeed
	}))

	const coroutine = new Coroutine(function* () {
		yield
		projectileBody.velocity.x = -Math.cos(rotation)
		projectileBody.velocity.y = -Math.sin(rotation)
	}, Infinity)
	projectile.onDestroy(() => coroutine.stop())
	return projectile
}
export default ProjectileEntity