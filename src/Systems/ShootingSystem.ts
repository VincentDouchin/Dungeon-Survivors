import { Vector2 } from "@dimforge/rapier2d-compat";
import BodyComponent from "../Components/BodyComponent";
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
			if (shooter.delay <= shooter.timer) {
				const position = entity.getComponent(PositionComponent)
				const projectile = ProjectileEntity(shooter.projectile, { x: position.x, y: position.y }, rotation.rotation)
				entity.addChildren(projectile)
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