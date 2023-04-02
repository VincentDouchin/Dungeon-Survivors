import type { Entity } from '../Globals/ECS'
import { ECS, System } from '../Globals/ECS'

import BodyComponent from '../Components/BodyComponent'
import DamageComponent from '../Components/DamageComponent'
import { ECSEVENTS, UIEVENTS } from '../Constants/Events'
import HealthComponent from '../Components/HealthComponent'
import LevelComponent from '../Components/LevelComponent'
import ManaComponent from '../Components/ManaComponent'
import RotationComponent from '../Components/RotationComponent'
import ShooterComponent from '../Components/ShooterComponent'
import SpellComponent from '../Components/SpellComponent'
import StatsComponent from '../Components/StatsComponent'
import XPPickerComponent from '../Components/XPPickerComponent'

class StatUpdateSystem extends System {
	constructor() {
		super(StatsComponent)
		this.subscribe(ECSEVENTS.XP_UP, ({ entity, amount }) => {
			const level = entity.getComponent(LevelComponent)
			level.xp += amount
			if (level.xp > level.nextLevel()) {
				level.xp = level.xp % level.nextLevel()
				entity.getComponent(LevelComponent).level++
				ECS.eventBus.publish(ECSEVENTS.LEVEL_UP, entity)
			}
		})
	}

	update(entities: Entity[]): void {
		const updatedStats: StatsComponent[] = []
		entities.forEach((entity) => {
			const stats = entity.getComponent(StatsComponent)
			if (!updatedStats.includes(stats)) {
				for (let i = stats.buffs.length - 1; i >= 0; i--) {
					stats.buffs[i].duration--
					if (stats.buffs[i].duration <= 0) {
						stats.buffs.splice(i, 1)
						ECS.eventBus.publish(UIEVENTS.DISPLAY_BOOST, stats)
					}
				}
				updatedStats.push(stats)
			}
			const level = entity.getComponent(LevelComponent)
			const damage = entity.getComponent(DamageComponent)
			const health = entity.getComponent(HealthComponent)
			const rotation = entity.getComponent(RotationComponent)
			const shooter = entity.getComponent(ShooterComponent)
			const body = entity.getComponent(BodyComponent)
			const mana = entity.getComponent(ManaComponent)
			const spell = entity.getComponent(SpellComponent)
			const xpPicker = entity.getComponent(XPPickerComponent)
			if (health) {
				health.maxHealth.setModifiers(stats, level)
				health.defense.setModifiers(stats, level)
				health.regen.setModifiers(stats, level)
			}
			if (damage) {
				damage.amount.setModifiers(stats, level)
				damage.critChance.setModifiers(stats, level)
				damage.critDamage.setModifiers(stats, level)
				damage.knockback.setModifiers(stats, level)
			}
			if (rotation) {
				rotation.angVel.setModifiers(stats, level)
			}
			if (body) {
				body.moveForce.setModifiers(stats, level)
			}
			if (shooter) {
				shooter.delay.setModifiers(stats, level)
			}
			if (mana) {
				mana.maxMana.setModifiers(stats, level)
			}
			if (spell) {
				spell.spellDamage.setModifiers(stats, level)
			}
			if (xpPicker) {
				xpPicker.xpModifier.setModifiers(stats, level)
			}
		})
	}
}
export default StatUpdateSystem
