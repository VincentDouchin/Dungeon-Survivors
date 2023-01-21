
import { Component, ECS } from "../Globals/ECS";
import SpriteComponent from "./SpriteComponent";
class HealthComponent extends Component {
	health: number
	maxHealth: number
	type: number
	healthBarId: string | null = null
	canTakeDamage: boolean = true
	show: boolean
	constructor(health: number, type: number, show = true) {
		super()
		this.health = health
		this.maxHealth = health
		this.type = type
		this.show = show
	}
	updateHealth(amount: number) {

		this.health = Math.max(0, Math.min(this.health + amount, this.maxHealth))

		if (this.healthBarId) {
			ECS.getEntityById(this.healthBarId).getComponent(SpriteComponent).uniforms.percent = this.health / this.maxHealth
		}
	}

}
HealthComponent.register()
export default HealthComponent