import { Vector2 } from "@dimforge/rapier2d-compat";
import AnimationComponent from "../Components/AnimationComponent";
import BodyComponent from "../Components/BodyComponent";
import MeshComponent from "../Components/MeshComponent";
import PositionComponent from "../Components/PositionComponent";
import RotationComponent from "../Components/RotationComponent";
import ShooterComponent from "../Components/ShooterComponent";
import ProjectileEntity from "../Entities/ProjectileEntity";
import { Entity, System } from "../Globals/ECS";

class ShootingSystem extends System {
	constructor() {
		super(ShooterComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const shooter = entity.getComponent(ShooterComponent)
			const rotation = entity.getComponent(RotationComponent)
			shooter.timer++
			const nb = shooter.projectilesNb
			if (shooter.delay <= shooter.timer) {
				for (let i = 0; i < nb; i++) {
					const position = entity.getComponent(PositionComponent)
					const projectile = ProjectileEntity(
						shooter.projectile,
						{ x: position.x, y: position.y },
						rotation.rotation - shooter.spread / 2 + (rotation.rotation * i / shooter.projectilesNb / 2),
						shooter.range
					)
					const animation = projectile.getComponent(AnimationComponent)
					if (animation) {
						animation.selectedFrame = Math.floor(Math.random() * animation.frames)
					}
					entity.addChildren(projectile)
				}
				shooter.timer = 0
			}
			for (let projectile of entity.children) {
				const projectileBody = projectile.getComponent(BodyComponent)
				const projectileRotation = projectile.getComponent(RotationComponent)
				// debugger
				const x = -Math.cos(projectileRotation.rotation) * projectileBody.moveForce
				const y = -Math.sin(projectileRotation.rotation) * projectileBody.moveForce
				// if (y == 0) debugger
				projectileBody.body?.applyImpulse(new Vector2(x, y), true)

			}
		})
	}
}

export default ShootingSystem