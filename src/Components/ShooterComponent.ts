import { Component, Entity } from "../Globals/ECS";

import { ProjectileDefinition } from "../Constants/Weapons";
import { SOUND } from "../Constants/Sounds";
import { STATS } from "./StatsComponent";
import { Stat } from "../Game/Stat";

class ShooterComponent extends Component {
	timer: number
	delay: Stat
	spawn: (parent: Entity) => Entity
	sound?: SOUND
	cooldown: number
	cooldownTimer: number = 0
	trigger: number
	triggerTimer: number = 0
	constructor(shooter: ProjectileDefinition) {
		super()
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