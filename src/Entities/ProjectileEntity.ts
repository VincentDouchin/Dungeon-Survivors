import AnimationComponent from "../Components/AnimationComponent";
import BodyComponent from "../Components/BodyComponent";
import Coroutine from "../Globals/Coroutine";
import DamageComponent from "../Components/DamageComponent";
import { Entity } from "../Globals/ECS";
import ExpirationComponent from "../Components/ExpirationComponent";
import PositionComponent from "../Components/PositionComponent";
import RotationComponent from "../Components/RotationComponent";
import SpriteComponent from "../Components/SpriteComponent";
import { TargetGroup } from "../Constants/Weapons";
import Tile from "../Utils/Tile";

// const ProjectileEntity = (projectileDefinition: ShooterComponent, position: { x: number, y: number }, rotation: number) => {
export interface ProjectileOptions {
	tile: Tile
	damage: number
	speed: number
	targetGroup: TargetGroup
	range: number
	nb?: number
	spread?: number
	rotationSpeed?: number
	scale?: number
	piercing?: number
}
const ProjectileEntity = ({ tile, damage, speed, targetGroup, range, nb = 1, spread = 0, scale = 1, rotationSpeed = 0, piercing = 1, }: ProjectileOptions) => (parent: Entity) => {
	debugger
	const projectiles = new Entity('projectiles')
	for (let i = 0; i < nb; i++) {
		const projectile = new Entity('projectile')
		projectiles.addChildren(projectile)
		const position = parent.getComponent(PositionComponent)
		projectile.addComponent(position.clone())

		const rotation = parent.getComponent(RotationComponent)
		const projectileRotation = rotation.rotation - spread / 2 + (rotation.rotation * i / nb / 2)
		projectile.addComponent(new RotationComponent({
			rotation: projectileRotation,
			rotationVel: rotationSpeed
		}))
		projectile.addComponent(new SpriteComponent(tile, { scale }))
		if (tile.frames > 1) {
			projectile.addComponent(new AnimationComponent({ idle: tile }, { selectedFrame: Math.floor(Math.random() * tile.frames) }))
		}
		const projectileBody = projectile.addComponent(new BodyComponent(
			{ moveForce: speed },
			[
				{ group: targetGroup.group, canCollideWith: targetGroup.target, mass: 0.1, contact: false, sensor: true, width: tile.width, height: tile.height }
			]
		))
		const coroutine = new Coroutine(function* () {
			yield
			projectileBody.velocity.x = -Math.cos(projectileRotation)
			projectileBody.velocity.y = -Math.sin(projectileRotation)
		}, Infinity)
		projectile.addComponent(new DamageComponent(damage, targetGroup.target, piercing, 5))
		projectile.onDestroy(() => coroutine.stop())
		projectile.addComponent(new ExpirationComponent(range))
		parent.addChildren(projectile)
	}





	return projectiles
}
export default ProjectileEntity