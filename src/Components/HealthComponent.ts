import { Component, ECS } from "../Globals/ECS";

import { SOUNDS } from "../Globals/Sounds";
import SpriteComponent from "./SpriteComponent";
import { Stat } from "../Game/Stat";

class HealthComponent extends Component {
	health: number
	maxHealth: Stat
	type: number
	healthBarId: string | null = null
	canTakeDamage: boolean = true
	show: boolean
	defense = new Stat(1)
	sound?: SOUNDS
	constructor(health: number, type: number, show = true, sound?: SOUNDS) {
		super()
		this.health = health
		this.maxHealth = new Stat(health)
		this.type = type
		this.show = show
		this.sound = sound
	}
	updateHealth(amount: number) {

		this.health = Math.max(0, Math.min(this.health + amount, this.maxHealth.value))

		if (this.healthBarId) {
			ECS.getEntityById(this.healthBarId).getComponent(SpriteComponent).uniforms.percent = this.health / this.maxHealth.value
		}
	}


}
HealthComponent.register()
export default HealthComponent