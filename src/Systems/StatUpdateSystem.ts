import { Entity, System } from "../Globals/ECS";

import BodyComponent from "../Components/BodyComponent";
import DamageComponent from "../Components/DamageComponent";
import HealthComponent from "../Components/HealthComponent";
import ManaComponent from "../Components/ManaComponent";
import RotationComponent from "../Components/RotationComponent";
import ShooterComponent from "../Components/ShooterComponent";
import StatsComponent from "../Components/StatsComponent";

class StatUpdateSystem extends System {
	constructor() {
		super(StatsComponent)
	}
	update(entities: Entity[]): void {
		entities.forEach(entity => {
			const stats = entity.getComponent(StatsComponent)
			for (let i = stats.boosts.length - 1; i >= 0; i--) {
				stats.boosts[i].duration--
				if (stats.boosts[i].duration === 0) {
					stats.boosts.splice(i, 1)
				}
			}
			const damage = entity.getComponent(DamageComponent)
			const health = entity.getComponent(HealthComponent)
			const rotation = entity.getComponent(RotationComponent)
			const shooter = entity.getComponent(ShooterComponent)
			const body = entity.getComponent(BodyComponent)
			const mana = entity.getComponent(ManaComponent)
			if (health) {
				health.maxHealth.modifier ??= stats
				health.defense.modifier ??= stats
			}
			if (damage) {
				damage.amount.modifier ??= stats
				damage.critChance.modifier ??= stats
				damage.critDamage.modifier ??= stats
				damage.knockback.modifier ??= stats
			}
			if (rotation) {
				rotation.angVel.modifier ??= stats
			}
			if (body) {
				body.moveForce.modifier ??= stats
			}
			if (shooter) {
				shooter.delay.modifier ??= stats
				shooter.damage.modifier ??= stats
			}
			if (mana) {
				mana.maxMana.modifier ??= stats
			}
		})
	}
}
export default StatUpdateSystem