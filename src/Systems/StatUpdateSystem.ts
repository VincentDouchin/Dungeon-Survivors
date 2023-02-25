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
			const damage = entity.getComponent(DamageComponent)
			const health = entity.getComponent(HealthComponent)
			const rotation = entity.getComponent(RotationComponent)
			const shooter = entity.getComponent(ShooterComponent)
			const body = entity.getComponent(BodyComponent)
			const mana = entity.getComponent(ManaComponent)
			if (health) {
				health.maxHealth.modifier ??= stats.health
				health.defense.modifier ??= stats.health
			}
			if (damage) {
				damage.amount.modifier ??= stats.damage
				damage.critChance.modifier ??= stats.critChance
				damage.critDamage.modifier ??= stats.critDamage
				damage.knockback.modifier ??= stats.knockback
			}
			if (rotation) {
				rotation.angVel.modifier ??= stats.attackSpeed
			}
			if (body) {
				body.moveForce.modifier ??= stats.speed
			}
			if (shooter) {
				shooter.delay.modifier ??= stats.attackSpeed
				shooter.damage.modifier ??= stats.damage
			}
			if (mana) {
				mana.maxMana.modifier ??= stats.manaMax
			}
		})
	}
}
export default StatUpdateSystem