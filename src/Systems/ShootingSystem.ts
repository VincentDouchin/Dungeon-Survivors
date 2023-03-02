import { Entity, System } from "../Globals/ECS";

import AnimationComponent from "../Components/AnimationComponent";
import PositionComponent from "../Components/PositionComponent";
import ProjectileEntity from "../Entities/ProjectileEntity";
import RotationComponent from "../Components/RotationComponent";
import ShooterComponent from "../Components/ShooterComponent";

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
			if (shooter.delay.value <= shooter.timer) {
				for (let i = 0; i < nb; i++) {
					const position = entity.getComponent(PositionComponent)
					const projectile = ProjectileEntity(
						shooter,
						{ x: position.x, y: position.y },
						rotation.rotation - shooter.spread / 2 + (rotation.rotation * i / shooter.projectilesNb / 2),
					)
					const animation = projectile.getComponent(AnimationComponent)
					if (animation) {
						animation.selectedFrame = Math.floor(Math.random() * animation.frames)
					}
					entity.addChildren(projectile)
				}
				shooter.timer = 0
			}

		})
	}
}

export default ShootingSystem