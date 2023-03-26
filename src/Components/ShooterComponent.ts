import type { Entity } from '../Globals/ECS'
import { Component } from '../Globals/ECS'

import type { ProjectileDefinition } from '../Constants/Weapons'
import type { SOUND } from '../Constants/Sounds'
import { Stat } from '../Game/Stat'
import { STATS } from './StatsComponent'

class ShooterComponent extends Component {
	timer: number
	delay: Stat
	spawn: (parent: Entity) => Entity
	sound?: SOUND
	cooldown: number
	cooldownTimer = 0
	trigger: number
	triggerTimer = 0
	constructor(shooter: ProjectileDefinition, sound?: SOUND) {
		super()
		this.sound = sound
		this.spawn = shooter.spawn
		this.delay = new Stat(shooter.delay, STATS.ATTACK_SPEED)
		this.timer = Math.random() * this.delay.value
		this.cooldown = shooter.cooldownAmount ?? 0
		this.trigger = shooter.cooldownTrigger ?? 0
	}
}

// constructor(cooldown: number, trigger: number) {
// 	super()
// 	this.cooldown = cooldown
// 	this.trigger = trigger
// }
// tick() {
// 	if (this.triggerTimer <= 0) {
// 		this.cooldownTimer = this.cooldown
// 		this.triggerTimer = this.trigger
// 	}
// 	this.cooldownTimer--
// }
// get canShoot() {
// 	return this.cooldownTimer <= 0
// }
// shot() {
// 	this.triggerTimer--
// }
ShooterComponent.register()
export default ShooterComponent
