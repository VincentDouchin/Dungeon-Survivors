import { Entity, System } from "../Globals/ECS";

import ShooterComponent from "../Components/ShooterComponent";

class ShootingSystem extends System {
	constructor() {
		super(ShooterComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const shooter = entity.getComponent(ShooterComponent)
			if (shooter.triggerTimer <= 0) {
				shooter.cooldownTimer = shooter.cooldown
				shooter.triggerTimer = shooter.trigger
			}
			if (shooter.cooldownTimer <= 0) {
				shooter.timer++
				if ((shooter.delay.base * (shooter.delay.base / shooter.delay.value)) <= shooter.timer) {
					shooter.spawn(entity)
					shooter.timer = 0
					shooter.triggerTimer--
				}
			} else {
				shooter.cooldownTimer--
			}

		})
	}
}

export default ShootingSystem